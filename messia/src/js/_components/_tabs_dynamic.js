(function () {

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	window.dynamicTabs = function () {

		const startUrl = new URL(window.location);

		const defaults = {
			container: false,
			scrollMargin: 0,
			scrollMarginShift: 0,
			observer: {
				root: null,
				rootMargin: '0px',
				threshold: [0],
				delay: 0,
				trackVisibility: false,
			},
		};

		const
			options = extendDefaults(defaults, arguments[0]),
			container = options.container;

		const
			tabList = container.querySelector('.tab-list'),
			tabsContent = container.querySelectorAll('.tab-content');

		var supported = false;

		if (!window.IntersectionObserver) {
			container.classList.add('not-supported');
			console.error('This browser does not support "Dynamic Tabs".');
		} else {
			supported = true;
		}

		if (container.hasOwnProperty('dynamicTabs')) {
			return;
		}

		if (tabList === null) {
			console.warn('DOM element with "tab-list" not found.');
			return;
		}

		if (tabsContent === null) {
			console.warn('No tab content elements found.');
			return;
		}

		Object.defineProperty(container, 'dynamicTabs', {
			value: {
				options: options,
				destroy: () => {
					if (!container.hasOwnProperty('dynamicTabs')) {
						return;
					}

					if (supported) {
						detachPagination(container);
						detachEvents(container);
						detachObservers(container);
					} else {
						detachSimpleEvents(container);
					}

					delete container.dynamicTabs;
				},
			},
			configurable: true,
		});

		if (supported) {
			attachPagination(container);
			attachEvents(container);
			attachObserver(container);
		} else {
			attachSimpleEvents(container);
		}

		this.instance = container;

		/**
		 * Setup otions.
		 *
		 * @param {object} current Default options.
		 * @param {object} updates User options
		 *
		 * @return {object}
		 */
		function extendDefaults(current, updates) {
			for (key of Object.keys(updates)) {
				if (!current.hasOwnProperty(key) || typeof updates[key] !== 'object' || updates[key] instanceof Element) current[key] = updates[key];
				else extendDefaults(current[key], updates[key]);
			}
			return current;
		}

		/**
		 * Create and fire observer.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function attachObserver(container) {

			const
				tabsContent = container.querySelectorAll('.tab-content'),
				observer = new IntersectionObserver(observerCallback.bind(container), container.dynamicTabs.options.observer);

			Object.defineProperty(container.dynamicTabs, 'observer', {
				value: observer,
				configurable: true,
			});

			tabsContent.forEach(tabContent => {
				observer.observe(tabContent);
			});
		}

		/**
		 * Destroy observer.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function detachObservers(container) {

			const
				tabsContent = container.querySelectorAll('.tab-content'),
				observer = container.dynamicTabs.observer;

			tabsContent.forEach(tabContent => {
				tabContent.removeAttribute('style');
				observer.unobserve(tabContent);
			});

			delete container.dynamicTabs;
		}

		/**
		 * Create and fire event listers handlers.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function attachEvents(container) {

			const
				tabItems = container.querySelectorAll('.tab-item'),
				left = container.querySelector('.list-left'),
				right = container.querySelector('.list-right');

			tabItems.forEach(tabItem => {
				tabItem.addEventListener('click', onClickTabItem);
			});

			left.addEventListener('click', listLeft);
			right.addEventListener('click', listRight);

			window.addEventListener('load', pageLoaded.bind(container), { once: true });
		}

		/**
		 * Remove event handlers.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function detachEvents(container) {

			const tabItems = container.querySelectorAll('.tab-item');

			tabItems.forEach(tabItem => {
				tabItem.removeEventListener('click', onClickTabItem);
			});
		}

		/**
		 * Insert scroll handlers.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function attachPagination(container) {
			const
				left = document.createElement('div'),
				right = document.createElement('div'),
				target = container.querySelector('.tab-list');

			left.classList.add('pagination', 'list-left');
			right.classList.add('pagination', 'list-right');

			target.prepend(left);
			target.appendChild(right);
		}

		/**
		 * Delete scroll handlers.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function detachPagination(container) {
			const target = container.querySelectorAll('.pagination');

			target.forEach(handler => {
				handler.remove();
			});
		}

		/**
		 * Create and fire event listers handlers if IntersectionObserver not supported.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function attachSimpleEvents(container) {
			const tabItems = container.querySelectorAll('.tab-item');

			tabItems.forEach(tabItem => {
				tabItem.addEventListener('click', onClickTabItemSimple);
			});
		}

		/**
		 * Remove event handlers.
		 *
		 * @param {HTMLElement} container Hole tabs container.
		 *
		 * @return void
		 */
		function detachEvents(container) {

			const tabItems = container.querySelectorAll('.tab-item');

			tabItems.forEach(tabItem => {
				tabItem.removeEventListener('click', onClickTabItemSimple);
			});
		}

		/**
		 * Event handler when tab clicked.
		 *
		 * @param {Event} event Pointer event.
		 *
		 * @return void
		 */
		function onClickTabItem(event) {
			event.preventDefault();

			const
				container = this.parentElement.parentElement,
				tabList = this.parentElement,
				tabId = this.getAttribute('href').substring(1),
				tabContent = container.querySelector(`#${tabId}`);

			const
				tabListHeight = tabList.offsetHeight;

			const
				tabContentParentScrollNode = getScrollParent(tabContent),
				tabContentParentScrollNodeTo = tabContent.offsetTop - tabListHeight - container.dynamicTabs.options.scrollMarginShift;

			startUrl.hash = tabId;

			window.history.pushState({
				tabUrl: startUrl.toString(),
			}, '', startUrl);

			scrollTo(tabContentParentScrollNode, tabContentParentScrollNodeTo, 300, 'Top');
		}

		/**
		 * Event handler when tab clicked and IntersectionObserver not supported.
		 *
		 * @param {Event} event Pointer event.
		 *
		 * @return void
		 */
		function onClickTabItemSimple(event) {

			// Clear all active.
			const allActiveTabs = this.parentElement.querySelectorAll('.tab-item.active');

			allActiveTabs.forEach(activeTab => activeTab.classList.remove('active'));

			this.classList.add('active');

			const url = new URL(window.location);
			url.hash = tabId;

			window.history.pushState({
				tabUrl: url.toString(),
			}, '', url);
		}

		/**
		 * Event handler when scroll left clicked.
		 *
		 * @param {Event} event Pointer event.
		 *
		 * @return void
		 */
		function listLeft(event) {
			const
				tabParentScrollNode = this.parentElement,
				tabParentScrollNodeTo = tabParentScrollNode.scrollLeft - tabParentScrollNode.offsetWidth;

			scrollTo(tabParentScrollNode, tabParentScrollNodeTo, 300, 'Left')
				.then((resolve) => {
					togglePagination(newActiveTab);
				});;
		}

		/**
		 * Event handler when scroll right clicked.
		 *
		 * @param {Event} event Pointer event.
		 *
		 * @return void
		 */
		function listRight(event) {
			const
				tabParentScrollNode = this.parentElement,
				tabParentScrollNodeTo = tabParentScrollNode.scrollLeft + tabParentScrollNode.offsetWidth;

			scrollTo(tabParentScrollNode, tabParentScrollNodeTo, 300, 'Left')
				.then((resolve) => {
					togglePagination(newActiveTab);
				});;
		}

		/**
		 * ire once window loaded and scroll to propper tab.
		 * 'this' - is a tab container here.
		 *
		 * @param {Event} event Window loaded
		 *
		 * @return void
		 */
		function pageLoaded(event) {
			const
				url = new URL(window.location),
				hash = url.hash,
				tabs = this.querySelectorAll('.tab-list .tab-item');

			for (let i = 0; i < tabs.length; i++) {
				const
					tab = tabs.item(i),
					href = tab.getAttribute('href');

				if (href === hash) {
					tab.click();
					break;
				}
			}
		}

		/**
		 * Callback for IntersectionObserver
		 *
		 * @param {HTMLElement}               container   Hole tabs container.
		 * @param {IntersectionObserverEntry} tabsContent Observed HTML elements
		 * @param {IntersectionObserver}      observer    Instance of IntersectionObserver
		 *
		 * @return void
		 */
		function observerCallback(tabsContent, observer) {

			// HERE this = container.

			// Clear all active.
			let allActiveTabs = this.querySelectorAll('.tab-item.active');
			const allTabContent = this.querySelectorAll('.tab-content');

			allActiveTabs.forEach(activeTab => activeTab.classList.remove('active'));

			// Set new active tab.
			tabsContent.forEach(tabContent => {

				const
					currentTabId = tabContent.target.getAttribute('id'),
					currentTabTarget = tabContent.target.parentElement.querySelector(`[href="#${currentTabId}"]`);

				currentTabTarget.classList.toggle('active', tabContent.isIntersecting);
			});

			// Check again active tabs.
			allActiveTabs = this.querySelectorAll('.tab-item.active');

			// If no active found we scrolled out of root
			// Find which tab pane close to a tab list (first|last)
			// And make it active.
			if (allActiveTabs.length === 0) {

				const distances = [];

				allTabContent.forEach((tabContent) => {
					distances.push(Math.abs(tabContent.getBoundingClientRect().top));
				});

				const
					min = Math.min(distances[0], distances[distances.length - 1]),
					index = distances.indexOf(min),
					targetTabId = allTabContent[index].getAttribute('id');

				this.querySelector(`[href="#${targetTabId}"]`).classList.add('active');
			}

			// Check again active tabs and scroll it into view if needed.
			newActiveTab = this.querySelector('.tab-item.active');

			if (newActiveTab) {

				const
					newActiveTabParentScrollNode = newActiveTab.closest('.tab-list'),
					newActiveTabParentScrollNodeCoord = newActiveTabParentScrollNode.getBoundingClientRect(),
					newActiveTabCoord = newActiveTab.getBoundingClientRect(),
					newActiveTabLeft = Math.trunc(newActiveTabCoord.left),
					newActiveTabRight = Math.trunc(newActiveTabCoord.right),
					newActiveTabParentLeft = Math.trunc(newActiveTabParentScrollNodeCoord.left),
					newActiveTabParentRight = Math.trunc(newActiveTabParentScrollNodeCoord.right);

				const
					tabsItems = newActiveTabParentScrollNode.querySelectorAll('.tab-item'),
					tabsItemsArr = Array.from(tabsItems),
					prevTabIndex = tabsItemsArr.indexOf(newActiveTab) - 1,
					nextTabIndex = tabsItemsArr.indexOf(newActiveTab) + 1;

				let newActiveTabParentScrollNodeTo = false;

				// Scroll to the right
				if (newActiveTabRight >= newActiveTabParentRight) {

					// This is actually invisible width of current tab + 80% width of next tab.
					const
						nextTabWidth = (typeof tabsItemsArr[nextTabIndex] === 'undefined') ? 0 : tabsItemsArr[nextTabIndex].offsetWidth * 0.8,
						shift = newActiveTabRight - newActiveTabParentRight + nextTabWidth;

					// Get current scroll and add shift (shift is positive).
					newActiveTabParentScrollNodeTo = newActiveTabParentScrollNode.scrollLeft + shift;

				}
				// Scroll to the left
				else if (newActiveTabLeft <= newActiveTabParentLeft) {

					// This is actually invisible width of current tab + 80% width of previous tab.
					const
						prevTabWidth = (typeof tabsItemsArr[prevTabIndex] === 'undefined') ? 0 : tabsItemsArr[prevTabIndex].offsetWidth * 0.8,
						shift = newActiveTabLeft - newActiveTabParentLeft - prevTabWidth;

					// Get current scroll and add shift (shift is negative).
					newActiveTabParentScrollNodeTo = newActiveTabParentScrollNode.scrollLeft + shift;
				}

				if (newActiveTabParentScrollNodeTo !== false) {
					scrollTo(newActiveTabParentScrollNode, newActiveTabParentScrollNodeTo, 300, 'Left')
						.then((resolve) => {
							togglePagination(newActiveTab);
						});
				}
			}
		}

		/**
		 * Show/Hide arrows for scrolling tabs.
		 *
		 * @param {HTMLElement} activeTab Current active tab.
		 *
		 * @return void
		 */
		function togglePagination(activeTab) {
			const
				tabList = activeTab.closest('.tab-list'),
				tabsItems = tabList.querySelectorAll('.tab-item'),
				tabsItemsArr = Array.from(tabsItems),
				tabItemsLength = tabsItemsArr.length;

			const
				tabsListCoord = tabList.getBoundingClientRect(),
				firstTabCoord = tabsItemsArr[0].getBoundingClientRect(),
				lastTabCoord = tabsItemsArr[tabItemsLength - 1].getBoundingClientRect();

			const
				tabsListCoordLeft = Math.trunc(tabsListCoord.left),
				tabsListCoordRight = Math.trunc(tabsListCoord.right);
			firstTabCoordLeft = Math.trunc(firstTabCoord.left);
			lastTabCoordRight = Math.trunc(lastTabCoord.right);

			if (firstTabCoordLeft < tabsListCoordLeft) {
				tabList.querySelector('.list-left').style.display = 'flex';
			} else {
				tabList.querySelector('.list-left').style.display = '';
			}

			if (lastTabCoordRight > tabsListCoordRight) {
				tabList.querySelector('.list-right').style.display = 'flex';
			} else {
				tabList.querySelector('.list-right').style.display = '';
			}
		}

		/**
		 * Custom scroll to.
		 *
		 * @param {HTMLElement} to        DOM Element to scroll to.
		 * @param {number}      duration  Scroll duration.
		 * @param {string}      direction Only Left|Top.
		 *
		 * @return Promise.
		 */
		function scrollTo(element, to, duration, direction) {
			const
				start = element[`scroll${direction}`],
				change = to - start,
				startDate = +new Date(),

				/**
				 * [easeInOutQuad description]
				 *
				 * @param {number} t Timestamp.
				 * @param {number} b Start.
				 * @param {number} c Change.
				 * @param {number} d Duration.
				 *
				 * @return float
				 */
				easeInOutQuad = (t, b, c, d) => {
					t /= d / 2;
					if (t < 1) return c / 2 * t * t + b;
					t--;
					return -c / 2 * (t * (t - 2) - 1) + b;
				},
				animateScrollPromise = new Promise((resolve, reject) => {
					const animateScroll = () => {
						const
							currentDate = +new Date(),
							currentTime = currentDate - startDate;

						element[`scroll${direction}`] = parseInt(easeInOutQuad(currentTime, start, change, duration));

						if (currentTime < duration) {
							requestAnimationFrame(animateScroll);
						}
						else {
							element[`scroll${direction}`] = to;
							resolve('done');
						}
					};
					animateScroll();
				});

			return animateScrollPromise;
		}

		/**
		 * Find closest scrollable DOM element relative to given node.
		 *
		 * @param {HTMLElement} node DOM node.
		 *
		 * @return string DOM selector.
		 */
		function getScrollParent(node) {
			const regex = /(auto|scroll)/;
			const parents = (_node, ps) => {
				if (_node.parentNode === null) { return ps; }
				return parents(_node.parentNode, ps.concat([_node]));
			};

			const
				style = (_node, prop) => getComputedStyle(_node, null).getPropertyValue(prop),
				overflow = _node => style(_node, 'overflow') + style(_node, 'overflow-y') + style(_node, 'overflow-x'),
				scroll = _node => regex.test(overflow(_node));

			const scrollParent = (_node) => {
				if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
					return;
				}

				const ps = parents(_node.parentNode, []);

				for (let i = 0; i < ps.length; i += 1) {
					if (scroll(ps[i])) {
						return ps[i];
					}
				}

				return document.scrollingElement || document.documentElement;
			};

			return scrollParent(node);
		}
	}
}());

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/blocks/tabs-panel.scss":
/*!*****************************************!*\
  !*** ./src/scss/blocks/tabs-panel.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_tabs_dynamic.js":
/*!*********************************************!*\
  !*** ./src/js/_components/_tabs_dynamic.js ***!
  \*********************************************/
/***/ (function() {

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


/***/ }),

/***/ "./src/js/blocks/tabs-panel.js":
/*!*************************************!*\
  !*** ./src/js/blocks/tabs-panel.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tabs_dynamic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_components/_tabs_dynamic.js */ "./src/js/_components/_tabs_dynamic.js");
/* harmony import */ var _components_tabs_dynamic_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_tabs_dynamic_js__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {

	let
		resizeTimer,
		tabInstances = [];

	const
		tabs = document.querySelectorAll('.dynamic-tabs'),
		ab = getComputedStyle(document.body).getPropertyValue('--admin-bar-height'),
		abVal = parseInt(ab) || 0,
		shift = 30;

	function createTabs() {

		tabs.forEach(tab => {
			const
				$tab = $(tab),
				tabList = $tab.find('.tab-list'),

				// Calculate how many percent of 100 is the actual height of the tabList container and take the remainder:
				//  100 - 9.6 = 90.4
				rootMarginBottom = 100 - ((tabList.outerHeight() + abVal + shift) / window.innerHeight * 100),

				// Build Intersection Observer rootMargin value.
				rootMargin = `-${tabList.outerHeight() + abVal + shift}px 0px -${rootMarginBottom}% 0px`,
				dynamicTab = new window.dynamicTabs({
					container: tab,
					scrollMarginShift: abVal,
					observer: {
						rootMargin: rootMargin
					},
				});

			tabInstances = tabInstances.concat(dynamicTab.instance);
		});
	}

	function resizeHandler() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeCallback, 100);
	}

	function resizeCallback() {
		tabInstances.forEach(tabInstance => tabInstance.dynamicTabs.destroy());
		tabInstances.splice(0, tabInstances.length); // Make it empty.

		createTabs();
	}

	createTabs();

	window.addEventListener('resize', resizeHandler, { passive: true });

	$(function () {

	});

})(jQuery);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************************!*\
  !*** ./src/entries/blocks/tabs-panel.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_tabs_panel_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/tabs-panel.scss */ "./src/scss/blocks/tabs-panel.scss");
/* harmony import */ var _js_blocks_tabs_panel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/tabs-panel.js */ "./src/js/blocks/tabs-panel.js");
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay10YWJzLXBhbmVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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O0FBRUEsRUFBRTs7QUFFRixDQUFDOzs7Ozs7O1VDM0REO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMkM7O0FBRTNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL3RhYnMtcGFuZWwuc2Nzcz84MWY3Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fY29tcG9uZW50cy9fdGFic19keW5hbWljLmpzIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3MvdGFicy1wYW5lbC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL3RhYnMtcGFuZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiKGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0d2luZG93LmR5bmFtaWNUYWJzID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3Qgc3RhcnRVcmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbik7XG5cblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGNvbnRhaW5lcjogZmFsc2UsXG5cdFx0XHRzY3JvbGxNYXJnaW46IDAsXG5cdFx0XHRzY3JvbGxNYXJnaW5TaGlmdDogMCxcblx0XHRcdG9ic2VydmVyOiB7XG5cdFx0XHRcdHJvb3Q6IG51bGwsXG5cdFx0XHRcdHJvb3RNYXJnaW46ICcwcHgnLFxuXHRcdFx0XHR0aHJlc2hvbGQ6IFswXSxcblx0XHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHRcdHRyYWNrVmlzaWJpbGl0eTogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRjb25zdFxuXHRcdFx0b3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pLFxuXHRcdFx0Y29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG5cblx0XHRjb25zdFxuXHRcdFx0dGFiTGlzdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGFiLWxpc3QnKSxcblx0XHRcdHRhYnNDb250ZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xuXG5cdFx0dmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG5cdFx0aWYgKCF3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcblx0XHRcdGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdub3Qtc3VwcG9ydGVkJyk7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBcIkR5bmFtaWMgVGFic1wiLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdXBwb3J0ZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChjb250YWluZXIuaGFzT3duUHJvcGVydHkoJ2R5bmFtaWNUYWJzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGFiTGlzdCA9PT0gbnVsbCkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdET00gZWxlbWVudCB3aXRoIFwidGFiLWxpc3RcIiBub3QgZm91bmQuJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRhYnNDb250ZW50ID09PSBudWxsKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ05vIHRhYiBjb250ZW50IGVsZW1lbnRzIGZvdW5kLicpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb250YWluZXIsICdkeW5hbWljVGFicycsIHtcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdG9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0XHRpZiAoIWNvbnRhaW5lci5oYXNPd25Qcm9wZXJ0eSgnZHluYW1pY1RhYnMnKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdGRldGFjaFBhZ2luYXRpb24oY29udGFpbmVyKTtcblx0XHRcdFx0XHRcdGRldGFjaEV2ZW50cyhjb250YWluZXIpO1xuXHRcdFx0XHRcdFx0ZGV0YWNoT2JzZXJ2ZXJzKGNvbnRhaW5lcik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRldGFjaFNpbXBsZUV2ZW50cyhjb250YWluZXIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRlbGV0ZSBjb250YWluZXIuZHluYW1pY1RhYnM7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0aWYgKHN1cHBvcnRlZCkge1xuXHRcdFx0YXR0YWNoUGFnaW5hdGlvbihjb250YWluZXIpO1xuXHRcdFx0YXR0YWNoRXZlbnRzKGNvbnRhaW5lcik7XG5cdFx0XHRhdHRhY2hPYnNlcnZlcihjb250YWluZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhdHRhY2hTaW1wbGVFdmVudHMoY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHR0aGlzLmluc3RhbmNlID0gY29udGFpbmVyO1xuXG5cdFx0LyoqXG5cdFx0ICogU2V0dXAgb3Rpb25zLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnQgRGVmYXVsdCBvcHRpb25zLlxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSB1cGRhdGVzIFVzZXIgb3B0aW9uc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7b2JqZWN0fVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGV4dGVuZERlZmF1bHRzKGN1cnJlbnQsIHVwZGF0ZXMpIHtcblx0XHRcdGZvciAoa2V5IG9mIE9iamVjdC5rZXlzKHVwZGF0ZXMpKSB7XG5cdFx0XHRcdGlmICghY3VycmVudC5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IHR5cGVvZiB1cGRhdGVzW2tleV0gIT09ICdvYmplY3QnIHx8IHVwZGF0ZXNba2V5XSBpbnN0YW5jZW9mIEVsZW1lbnQpIGN1cnJlbnRba2V5XSA9IHVwZGF0ZXNba2V5XTtcblx0XHRcdFx0ZWxzZSBleHRlbmREZWZhdWx0cyhjdXJyZW50W2tleV0sIHVwZGF0ZXNba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY3VycmVudDtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGUgYW5kIGZpcmUgb2JzZXJ2ZXIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgSG9sZSB0YWJzIGNvbnRhaW5lci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGF0dGFjaE9ic2VydmVyKGNvbnRhaW5lcikge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJzQ29udGVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKSxcblx0XHRcdFx0b2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIob2JzZXJ2ZXJDYWxsYmFjay5iaW5kKGNvbnRhaW5lciksIGNvbnRhaW5lci5keW5hbWljVGFicy5vcHRpb25zLm9ic2VydmVyKTtcblxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRhaW5lci5keW5hbWljVGFicywgJ29ic2VydmVyJywge1xuXHRcdFx0XHR2YWx1ZTogb2JzZXJ2ZXIsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdH0pO1xuXG5cdFx0XHR0YWJzQ29udGVudC5mb3JFYWNoKHRhYkNvbnRlbnQgPT4ge1xuXHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKHRhYkNvbnRlbnQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRGVzdHJveSBvYnNlcnZlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciBIb2xlIHRhYnMgY29udGFpbmVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZGV0YWNoT2JzZXJ2ZXJzKGNvbnRhaW5lcikge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJzQ29udGVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKSxcblx0XHRcdFx0b2JzZXJ2ZXIgPSBjb250YWluZXIuZHluYW1pY1RhYnMub2JzZXJ2ZXI7XG5cblx0XHRcdHRhYnNDb250ZW50LmZvckVhY2godGFiQ29udGVudCA9PiB7XG5cdFx0XHRcdHRhYkNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXHRcdFx0XHRvYnNlcnZlci51bm9ic2VydmUodGFiQ29udGVudCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZGVsZXRlIGNvbnRhaW5lci5keW5hbWljVGFicztcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGUgYW5kIGZpcmUgZXZlbnQgbGlzdGVycyBoYW5kbGVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciBIb2xlIHRhYnMgY29udGFpbmVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gYXR0YWNoRXZlbnRzKGNvbnRhaW5lcikge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJJdGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWl0ZW0nKSxcblx0XHRcdFx0bGVmdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlzdC1sZWZ0JyksXG5cdFx0XHRcdHJpZ2h0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXJpZ2h0Jyk7XG5cblx0XHRcdHRhYkl0ZW1zLmZvckVhY2godGFiSXRlbSA9PiB7XG5cdFx0XHRcdHRhYkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrVGFiSXRlbSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RMZWZ0KTtcblx0XHRcdHJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdFJpZ2h0KTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZGVkLmJpbmQoY29udGFpbmVyKSwgeyBvbmNlOiB0cnVlIH0pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBldmVudCBoYW5kbGVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciBIb2xlIHRhYnMgY29udGFpbmVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZGV0YWNoRXZlbnRzKGNvbnRhaW5lcikge1xuXG5cdFx0XHRjb25zdCB0YWJJdGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWl0ZW0nKTtcblxuXHRcdFx0dGFiSXRlbXMuZm9yRWFjaCh0YWJJdGVtID0+IHtcblx0XHRcdFx0dGFiSXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tUYWJJdGVtKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydCBzY3JvbGwgaGFuZGxlcnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgSG9sZSB0YWJzIGNvbnRhaW5lci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGF0dGFjaFBhZ2luYXRpb24oY29udGFpbmVyKSB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHRsZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdHJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdHRhcmdldCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGFiLWxpc3QnKTtcblxuXHRcdFx0bGVmdC5jbGFzc0xpc3QuYWRkKCdwYWdpbmF0aW9uJywgJ2xpc3QtbGVmdCcpO1xuXHRcdFx0cmlnaHQuY2xhc3NMaXN0LmFkZCgncGFnaW5hdGlvbicsICdsaXN0LXJpZ2h0Jyk7XG5cblx0XHRcdHRhcmdldC5wcmVwZW5kKGxlZnQpO1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHJpZ2h0KTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBEZWxldGUgc2Nyb2xsIGhhbmRsZXJzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIEhvbGUgdGFicyBjb250YWluZXIuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBkZXRhY2hQYWdpbmF0aW9uKGNvbnRhaW5lcikge1xuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uJyk7XG5cblx0XHRcdHRhcmdldC5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuXHRcdFx0XHRoYW5kbGVyLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlIGFuZCBmaXJlIGV2ZW50IGxpc3RlcnMgaGFuZGxlcnMgaWYgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgbm90IHN1cHBvcnRlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciBIb2xlIHRhYnMgY29udGFpbmVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gYXR0YWNoU2ltcGxlRXZlbnRzKGNvbnRhaW5lcikge1xuXHRcdFx0Y29uc3QgdGFiSXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1pdGVtJyk7XG5cblx0XHRcdHRhYkl0ZW1zLmZvckVhY2godGFiSXRlbSA9PiB7XG5cdFx0XHRcdHRhYkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrVGFiSXRlbVNpbXBsZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgZXZlbnQgaGFuZGxlcnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgSG9sZSB0YWJzIGNvbnRhaW5lci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGRldGFjaEV2ZW50cyhjb250YWluZXIpIHtcblxuXHRcdFx0Y29uc3QgdGFiSXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1pdGVtJyk7XG5cblx0XHRcdHRhYkl0ZW1zLmZvckVhY2godGFiSXRlbSA9PiB7XG5cdFx0XHRcdHRhYkl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrVGFiSXRlbVNpbXBsZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBFdmVudCBoYW5kbGVyIHdoZW4gdGFiIGNsaWNrZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBQb2ludGVyIGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gb25DbGlja1RhYkl0ZW0oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdGNvbnRhaW5lciA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LFxuXHRcdFx0XHR0YWJMaXN0ID0gdGhpcy5wYXJlbnRFbGVtZW50LFxuXHRcdFx0XHR0YWJJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykuc3Vic3RyaW5nKDEpLFxuXHRcdFx0XHR0YWJDb250ZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYCMke3RhYklkfWApO1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJMaXN0SGVpZ2h0ID0gdGFiTGlzdC5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdHRhYkNvbnRlbnRQYXJlbnRTY3JvbGxOb2RlID0gZ2V0U2Nyb2xsUGFyZW50KHRhYkNvbnRlbnQpLFxuXHRcdFx0XHR0YWJDb250ZW50UGFyZW50U2Nyb2xsTm9kZVRvID0gdGFiQ29udGVudC5vZmZzZXRUb3AgLSB0YWJMaXN0SGVpZ2h0IC0gY29udGFpbmVyLmR5bmFtaWNUYWJzLm9wdGlvbnMuc2Nyb2xsTWFyZ2luU2hpZnQ7XG5cblx0XHRcdHN0YXJ0VXJsLmhhc2ggPSB0YWJJZDtcblxuXHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcblx0XHRcdFx0dGFiVXJsOiBzdGFydFVybC50b1N0cmluZygpLFxuXHRcdFx0fSwgJycsIHN0YXJ0VXJsKTtcblxuXHRcdFx0c2Nyb2xsVG8odGFiQ29udGVudFBhcmVudFNjcm9sbE5vZGUsIHRhYkNvbnRlbnRQYXJlbnRTY3JvbGxOb2RlVG8sIDMwMCwgJ1RvcCcpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgd2hlbiB0YWIgY2xpY2tlZCBhbmQgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgbm90IHN1cHBvcnRlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFBvaW50ZXIgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBvbkNsaWNrVGFiSXRlbVNpbXBsZShldmVudCkge1xuXG5cdFx0XHQvLyBDbGVhciBhbGwgYWN0aXZlLlxuXHRcdFx0Y29uc3QgYWxsQWN0aXZlVGFicyA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWl0ZW0uYWN0aXZlJyk7XG5cblx0XHRcdGFsbEFjdGl2ZVRhYnMuZm9yRWFjaChhY3RpdmVUYWIgPT4gYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuXHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuXHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24pO1xuXHRcdFx0dXJsLmhhc2ggPSB0YWJJZDtcblxuXHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcblx0XHRcdFx0dGFiVXJsOiB1cmwudG9TdHJpbmcoKSxcblx0XHRcdH0sICcnLCB1cmwpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgd2hlbiBzY3JvbGwgbGVmdCBjbGlja2VkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgUG9pbnRlciBldmVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGxpc3RMZWZ0KGV2ZW50KSB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJQYXJlbnRTY3JvbGxOb2RlID0gdGhpcy5wYXJlbnRFbGVtZW50LFxuXHRcdFx0XHR0YWJQYXJlbnRTY3JvbGxOb2RlVG8gPSB0YWJQYXJlbnRTY3JvbGxOb2RlLnNjcm9sbExlZnQgLSB0YWJQYXJlbnRTY3JvbGxOb2RlLm9mZnNldFdpZHRoO1xuXG5cdFx0XHRzY3JvbGxUbyh0YWJQYXJlbnRTY3JvbGxOb2RlLCB0YWJQYXJlbnRTY3JvbGxOb2RlVG8sIDMwMCwgJ0xlZnQnKVxuXHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdHRvZ2dsZVBhZ2luYXRpb24obmV3QWN0aXZlVGFiKTtcblx0XHRcdFx0fSk7O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgd2hlbiBzY3JvbGwgcmlnaHQgY2xpY2tlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFBvaW50ZXIgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBsaXN0UmlnaHQoZXZlbnQpIHtcblx0XHRcdGNvbnN0XG5cdFx0XHRcdHRhYlBhcmVudFNjcm9sbE5vZGUgPSB0aGlzLnBhcmVudEVsZW1lbnQsXG5cdFx0XHRcdHRhYlBhcmVudFNjcm9sbE5vZGVUbyA9IHRhYlBhcmVudFNjcm9sbE5vZGUuc2Nyb2xsTGVmdCArIHRhYlBhcmVudFNjcm9sbE5vZGUub2Zmc2V0V2lkdGg7XG5cblx0XHRcdHNjcm9sbFRvKHRhYlBhcmVudFNjcm9sbE5vZGUsIHRhYlBhcmVudFNjcm9sbE5vZGVUbywgMzAwLCAnTGVmdCcpXG5cdFx0XHRcdC50aGVuKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdFx0dG9nZ2xlUGFnaW5hdGlvbihuZXdBY3RpdmVUYWIpO1xuXHRcdFx0XHR9KTs7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogaXJlIG9uY2Ugd2luZG93IGxvYWRlZCBhbmQgc2Nyb2xsIHRvIHByb3BwZXIgdGFiLlxuXHRcdCAqICd0aGlzJyAtIGlzIGEgdGFiIGNvbnRhaW5lciBoZXJlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgV2luZG93IGxvYWRlZFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcGFnZUxvYWRlZChldmVudCkge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0dXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24pLFxuXHRcdFx0XHRoYXNoID0gdXJsLmhhc2gsXG5cdFx0XHRcdHRhYnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItbGlzdCAudGFiLWl0ZW0nKTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0dGFiID0gdGFicy5pdGVtKGkpLFxuXHRcdFx0XHRcdGhyZWYgPSB0YWIuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cblx0XHRcdFx0aWYgKGhyZWYgPT09IGhhc2gpIHtcblx0XHRcdFx0XHR0YWIuY2xpY2soKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENhbGxiYWNrIGZvciBJbnRlcnNlY3Rpb25PYnNlcnZlclxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gICAgICAgICAgICAgICBjb250YWluZXIgICBIb2xlIHRhYnMgY29udGFpbmVyLlxuXHRcdCAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeX0gdGFic0NvbnRlbnQgT2JzZXJ2ZWQgSFRNTCBlbGVtZW50c1xuXHRcdCAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJ9ICAgICAgb2JzZXJ2ZXIgICAgSW5zdGFuY2Ugb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIG9ic2VydmVyQ2FsbGJhY2sodGFic0NvbnRlbnQsIG9ic2VydmVyKSB7XG5cblx0XHRcdC8vIEhFUkUgdGhpcyA9IGNvbnRhaW5lci5cblxuXHRcdFx0Ly8gQ2xlYXIgYWxsIGFjdGl2ZS5cblx0XHRcdGxldCBhbGxBY3RpdmVUYWJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWl0ZW0uYWN0aXZlJyk7XG5cdFx0XHRjb25zdCBhbGxUYWJDb250ZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcblxuXHRcdFx0YWxsQWN0aXZlVGFicy5mb3JFYWNoKGFjdGl2ZVRhYiA9PiBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG5cdFx0XHQvLyBTZXQgbmV3IGFjdGl2ZSB0YWIuXG5cdFx0XHR0YWJzQ29udGVudC5mb3JFYWNoKHRhYkNvbnRlbnQgPT4ge1xuXG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0Y3VycmVudFRhYklkID0gdGFiQ29udGVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpLFxuXHRcdFx0XHRcdGN1cnJlbnRUYWJUYXJnZXQgPSB0YWJDb250ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtocmVmPVwiIyR7Y3VycmVudFRhYklkfVwiXWApO1xuXG5cdFx0XHRcdGN1cnJlbnRUYWJUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgdGFiQ29udGVudC5pc0ludGVyc2VjdGluZyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQ2hlY2sgYWdhaW4gYWN0aXZlIHRhYnMuXG5cdFx0XHRhbGxBY3RpdmVUYWJzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWl0ZW0uYWN0aXZlJyk7XG5cblx0XHRcdC8vIElmIG5vIGFjdGl2ZSBmb3VuZCB3ZSBzY3JvbGxlZCBvdXQgb2Ygcm9vdFxuXHRcdFx0Ly8gRmluZCB3aGljaCB0YWIgcGFuZSBjbG9zZSB0byBhIHRhYiBsaXN0IChmaXJzdHxsYXN0KVxuXHRcdFx0Ly8gQW5kIG1ha2UgaXQgYWN0aXZlLlxuXHRcdFx0aWYgKGFsbEFjdGl2ZVRhYnMubGVuZ3RoID09PSAwKSB7XG5cblx0XHRcdFx0Y29uc3QgZGlzdGFuY2VzID0gW107XG5cblx0XHRcdFx0YWxsVGFiQ29udGVudC5mb3JFYWNoKCh0YWJDb250ZW50KSA9PiB7XG5cdFx0XHRcdFx0ZGlzdGFuY2VzLnB1c2goTWF0aC5hYnModGFiQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRtaW4gPSBNYXRoLm1pbihkaXN0YW5jZXNbMF0sIGRpc3RhbmNlc1tkaXN0YW5jZXMubGVuZ3RoIC0gMV0pLFxuXHRcdFx0XHRcdGluZGV4ID0gZGlzdGFuY2VzLmluZGV4T2YobWluKSxcblx0XHRcdFx0XHR0YXJnZXRUYWJJZCA9IGFsbFRhYkNvbnRlbnRbaW5kZXhdLmdldEF0dHJpYnV0ZSgnaWQnKTtcblxuXHRcdFx0XHR0aGlzLnF1ZXJ5U2VsZWN0b3IoYFtocmVmPVwiIyR7dGFyZ2V0VGFiSWR9XCJdYCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGFnYWluIGFjdGl2ZSB0YWJzIGFuZCBzY3JvbGwgaXQgaW50byB2aWV3IGlmIG5lZWRlZC5cblx0XHRcdG5ld0FjdGl2ZVRhYiA9IHRoaXMucXVlcnlTZWxlY3RvcignLnRhYi1pdGVtLmFjdGl2ZScpO1xuXG5cdFx0XHRpZiAobmV3QWN0aXZlVGFiKSB7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlID0gbmV3QWN0aXZlVGFiLmNsb3Nlc3QoJy50YWItbGlzdCcpLFxuXHRcdFx0XHRcdG5ld0FjdGl2ZVRhYlBhcmVudFNjcm9sbE5vZGVDb29yZCA9IG5ld0FjdGl2ZVRhYlBhcmVudFNjcm9sbE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdFx0bmV3QWN0aXZlVGFiQ29vcmQgPSBuZXdBY3RpdmVUYWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdFx0bmV3QWN0aXZlVGFiTGVmdCA9IE1hdGgudHJ1bmMobmV3QWN0aXZlVGFiQ29vcmQubGVmdCksXG5cdFx0XHRcdFx0bmV3QWN0aXZlVGFiUmlnaHQgPSBNYXRoLnRydW5jKG5ld0FjdGl2ZVRhYkNvb3JkLnJpZ2h0KSxcblx0XHRcdFx0XHRuZXdBY3RpdmVUYWJQYXJlbnRMZWZ0ID0gTWF0aC50cnVuYyhuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlQ29vcmQubGVmdCksXG5cdFx0XHRcdFx0bmV3QWN0aXZlVGFiUGFyZW50UmlnaHQgPSBNYXRoLnRydW5jKG5ld0FjdGl2ZVRhYlBhcmVudFNjcm9sbE5vZGVDb29yZC5yaWdodCk7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHR0YWJzSXRlbXMgPSBuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItaXRlbScpLFxuXHRcdFx0XHRcdHRhYnNJdGVtc0FyciA9IEFycmF5LmZyb20odGFic0l0ZW1zKSxcblx0XHRcdFx0XHRwcmV2VGFiSW5kZXggPSB0YWJzSXRlbXNBcnIuaW5kZXhPZihuZXdBY3RpdmVUYWIpIC0gMSxcblx0XHRcdFx0XHRuZXh0VGFiSW5kZXggPSB0YWJzSXRlbXNBcnIuaW5kZXhPZihuZXdBY3RpdmVUYWIpICsgMTtcblxuXHRcdFx0XHRsZXQgbmV3QWN0aXZlVGFiUGFyZW50U2Nyb2xsTm9kZVRvID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gU2Nyb2xsIHRvIHRoZSByaWdodFxuXHRcdFx0XHRpZiAobmV3QWN0aXZlVGFiUmlnaHQgPj0gbmV3QWN0aXZlVGFiUGFyZW50UmlnaHQpIHtcblxuXHRcdFx0XHRcdC8vIFRoaXMgaXMgYWN0dWFsbHkgaW52aXNpYmxlIHdpZHRoIG9mIGN1cnJlbnQgdGFiICsgODAlIHdpZHRoIG9mIG5leHQgdGFiLlxuXHRcdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0XHRuZXh0VGFiV2lkdGggPSAodHlwZW9mIHRhYnNJdGVtc0FycltuZXh0VGFiSW5kZXhdID09PSAndW5kZWZpbmVkJykgPyAwIDogdGFic0l0ZW1zQXJyW25leHRUYWJJbmRleF0ub2Zmc2V0V2lkdGggKiAwLjgsXG5cdFx0XHRcdFx0XHRzaGlmdCA9IG5ld0FjdGl2ZVRhYlJpZ2h0IC0gbmV3QWN0aXZlVGFiUGFyZW50UmlnaHQgKyBuZXh0VGFiV2lkdGg7XG5cblx0XHRcdFx0XHQvLyBHZXQgY3VycmVudCBzY3JvbGwgYW5kIGFkZCBzaGlmdCAoc2hpZnQgaXMgcG9zaXRpdmUpLlxuXHRcdFx0XHRcdG5ld0FjdGl2ZVRhYlBhcmVudFNjcm9sbE5vZGVUbyA9IG5ld0FjdGl2ZVRhYlBhcmVudFNjcm9sbE5vZGUuc2Nyb2xsTGVmdCArIHNoaWZ0O1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gU2Nyb2xsIHRvIHRoZSBsZWZ0XG5cdFx0XHRcdGVsc2UgaWYgKG5ld0FjdGl2ZVRhYkxlZnQgPD0gbmV3QWN0aXZlVGFiUGFyZW50TGVmdCkge1xuXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBhY3R1YWxseSBpbnZpc2libGUgd2lkdGggb2YgY3VycmVudCB0YWIgKyA4MCUgd2lkdGggb2YgcHJldmlvdXMgdGFiLlxuXHRcdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0XHRwcmV2VGFiV2lkdGggPSAodHlwZW9mIHRhYnNJdGVtc0FycltwcmV2VGFiSW5kZXhdID09PSAndW5kZWZpbmVkJykgPyAwIDogdGFic0l0ZW1zQXJyW3ByZXZUYWJJbmRleF0ub2Zmc2V0V2lkdGggKiAwLjgsXG5cdFx0XHRcdFx0XHRzaGlmdCA9IG5ld0FjdGl2ZVRhYkxlZnQgLSBuZXdBY3RpdmVUYWJQYXJlbnRMZWZ0IC0gcHJldlRhYldpZHRoO1xuXG5cdFx0XHRcdFx0Ly8gR2V0IGN1cnJlbnQgc2Nyb2xsIGFuZCBhZGQgc2hpZnQgKHNoaWZ0IGlzIG5lZ2F0aXZlKS5cblx0XHRcdFx0XHRuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlVG8gPSBuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlLnNjcm9sbExlZnQgKyBzaGlmdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChuZXdBY3RpdmVUYWJQYXJlbnRTY3JvbGxOb2RlVG8gIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0c2Nyb2xsVG8obmV3QWN0aXZlVGFiUGFyZW50U2Nyb2xsTm9kZSwgbmV3QWN0aXZlVGFiUGFyZW50U2Nyb2xsTm9kZVRvLCAzMDAsICdMZWZ0Jylcblx0XHRcdFx0XHRcdC50aGVuKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRvZ2dsZVBhZ2luYXRpb24obmV3QWN0aXZlVGFiKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2hvdy9IaWRlIGFycm93cyBmb3Igc2Nyb2xsaW5nIHRhYnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY3RpdmVUYWIgQ3VycmVudCBhY3RpdmUgdGFiLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB2b2lkXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlUGFnaW5hdGlvbihhY3RpdmVUYWIpIHtcblx0XHRcdGNvbnN0XG5cdFx0XHRcdHRhYkxpc3QgPSBhY3RpdmVUYWIuY2xvc2VzdCgnLnRhYi1saXN0JyksXG5cdFx0XHRcdHRhYnNJdGVtcyA9IHRhYkxpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1pdGVtJyksXG5cdFx0XHRcdHRhYnNJdGVtc0FyciA9IEFycmF5LmZyb20odGFic0l0ZW1zKSxcblx0XHRcdFx0dGFiSXRlbXNMZW5ndGggPSB0YWJzSXRlbXNBcnIubGVuZ3RoO1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJzTGlzdENvb3JkID0gdGFiTGlzdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdFx0Zmlyc3RUYWJDb29yZCA9IHRhYnNJdGVtc0FyclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdFx0bGFzdFRhYkNvb3JkID0gdGFic0l0ZW1zQXJyW3RhYkl0ZW1zTGVuZ3RoIC0gMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdHRhYnNMaXN0Q29vcmRMZWZ0ID0gTWF0aC50cnVuYyh0YWJzTGlzdENvb3JkLmxlZnQpLFxuXHRcdFx0XHR0YWJzTGlzdENvb3JkUmlnaHQgPSBNYXRoLnRydW5jKHRhYnNMaXN0Q29vcmQucmlnaHQpO1xuXHRcdFx0Zmlyc3RUYWJDb29yZExlZnQgPSBNYXRoLnRydW5jKGZpcnN0VGFiQ29vcmQubGVmdCk7XG5cdFx0XHRsYXN0VGFiQ29vcmRSaWdodCA9IE1hdGgudHJ1bmMobGFzdFRhYkNvb3JkLnJpZ2h0KTtcblxuXHRcdFx0aWYgKGZpcnN0VGFiQ29vcmRMZWZ0IDwgdGFic0xpc3RDb29yZExlZnQpIHtcblx0XHRcdFx0dGFiTGlzdC5xdWVyeVNlbGVjdG9yKCcubGlzdC1sZWZ0Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhYkxpc3QucXVlcnlTZWxlY3RvcignLmxpc3QtbGVmdCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGxhc3RUYWJDb29yZFJpZ2h0ID4gdGFic0xpc3RDb29yZFJpZ2h0KSB7XG5cdFx0XHRcdHRhYkxpc3QucXVlcnlTZWxlY3RvcignLmxpc3QtcmlnaHQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFiTGlzdC5xdWVyeVNlbGVjdG9yKCcubGlzdC1yaWdodCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDdXN0b20gc2Nyb2xsIHRvLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG8gICAgICAgIERPTSBFbGVtZW50IHRvIHNjcm9sbCB0by5cblx0XHQgKiBAcGFyYW0ge251bWJlcn0gICAgICBkdXJhdGlvbiAgU2Nyb2xsIGR1cmF0aW9uLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIGRpcmVjdGlvbiBPbmx5IExlZnR8VG9wLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiBQcm9taXNlLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHNjcm9sbFRvKGVsZW1lbnQsIHRvLCBkdXJhdGlvbiwgZGlyZWN0aW9uKSB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHRzdGFydCA9IGVsZW1lbnRbYHNjcm9sbCR7ZGlyZWN0aW9ufWBdLFxuXHRcdFx0XHRjaGFuZ2UgPSB0byAtIHN0YXJ0LFxuXHRcdFx0XHRzdGFydERhdGUgPSArbmV3IERhdGUoKSxcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogW2Vhc2VJbk91dFF1YWQgZGVzY3JpcHRpb25dXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEBwYXJhbSB7bnVtYmVyfSB0IFRpbWVzdGFtcC5cblx0XHRcdFx0ICogQHBhcmFtIHtudW1iZXJ9IGIgU3RhcnQuXG5cdFx0XHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBjIENoYW5nZS5cblx0XHRcdFx0ICogQHBhcmFtIHtudW1iZXJ9IGQgRHVyYXRpb24uXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEByZXR1cm4gZmxvYXRcblx0XHRcdFx0ICovXG5cdFx0XHRcdGVhc2VJbk91dFF1YWQgPSAodCwgYiwgYywgZCkgPT4ge1xuXHRcdFx0XHRcdHQgLz0gZCAvIDI7XG5cdFx0XHRcdFx0aWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG5cdFx0XHRcdFx0dC0tO1xuXHRcdFx0XHRcdHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGI7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFuaW1hdGVTY3JvbGxQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFuaW1hdGVTY3JvbGwgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50RGF0ZSA9ICtuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IGN1cnJlbnREYXRlIC0gc3RhcnREYXRlO1xuXG5cdFx0XHRcdFx0XHRlbGVtZW50W2BzY3JvbGwke2RpcmVjdGlvbn1gXSA9IHBhcnNlSW50KGVhc2VJbk91dFF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKSk7XG5cblx0XHRcdFx0XHRcdGlmIChjdXJyZW50VGltZSA8IGR1cmF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50W2BzY3JvbGwke2RpcmVjdGlvbn1gXSA9IHRvO1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRhbmltYXRlU2Nyb2xsKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gYW5pbWF0ZVNjcm9sbFByb21pc2U7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRmluZCBjbG9zZXN0IHNjcm9sbGFibGUgRE9NIGVsZW1lbnQgcmVsYXRpdmUgdG8gZ2l2ZW4gbm9kZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgRE9NIG5vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHN0cmluZyBET00gc2VsZWN0b3IuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcblx0XHRcdGNvbnN0IHJlZ2V4ID0gLyhhdXRvfHNjcm9sbCkvO1xuXHRcdFx0Y29uc3QgcGFyZW50cyA9IChfbm9kZSwgcHMpID0+IHtcblx0XHRcdFx0aWYgKF9ub2RlLnBhcmVudE5vZGUgPT09IG51bGwpIHsgcmV0dXJuIHBzOyB9XG5cdFx0XHRcdHJldHVybiBwYXJlbnRzKF9ub2RlLnBhcmVudE5vZGUsIHBzLmNvbmNhdChbX25vZGVdKSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRzdHlsZSA9IChfbm9kZSwgcHJvcCkgPT4gZ2V0Q29tcHV0ZWRTdHlsZShfbm9kZSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSxcblx0XHRcdFx0b3ZlcmZsb3cgPSBfbm9kZSA9PiBzdHlsZShfbm9kZSwgJ292ZXJmbG93JykgKyBzdHlsZShfbm9kZSwgJ292ZXJmbG93LXknKSArIHN0eWxlKF9ub2RlLCAnb3ZlcmZsb3cteCcpLFxuXHRcdFx0XHRzY3JvbGwgPSBfbm9kZSA9PiByZWdleC50ZXN0KG92ZXJmbG93KF9ub2RlKSk7XG5cblx0XHRcdGNvbnN0IHNjcm9sbFBhcmVudCA9IChfbm9kZSkgPT4ge1xuXHRcdFx0XHRpZiAoIShfbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IF9ub2RlIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBwcyA9IHBhcmVudHMoX25vZGUucGFyZW50Tm9kZSwgW10pO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRpZiAoc2Nyb2xsKHBzW2ldKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBzW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBzY3JvbGxQYXJlbnQobm9kZSk7XG5cdFx0fVxuXHR9XG59KCkpO1xuIiwiaW1wb3J0ICcuLi9fY29tcG9uZW50cy9fdGFic19keW5hbWljLmpzJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cblx0bGV0XG5cdFx0cmVzaXplVGltZXIsXG5cdFx0dGFiSW5zdGFuY2VzID0gW107XG5cblx0Y29uc3Rcblx0XHR0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmR5bmFtaWMtdGFicycpLFxuXHRcdGFiID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWFkbWluLWJhci1oZWlnaHQnKSxcblx0XHRhYlZhbCA9IHBhcnNlSW50KGFiKSB8fCAwLFxuXHRcdHNoaWZ0ID0gMzA7XG5cblx0ZnVuY3Rpb24gY3JlYXRlVGFicygpIHtcblxuXHRcdHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0JHRhYiA9ICQodGFiKSxcblx0XHRcdFx0dGFiTGlzdCA9ICR0YWIuZmluZCgnLnRhYi1saXN0JyksXG5cblx0XHRcdFx0Ly8gQ2FsY3VsYXRlIGhvdyBtYW55IHBlcmNlbnQgb2YgMTAwIGlzIHRoZSBhY3R1YWwgaGVpZ2h0IG9mIHRoZSB0YWJMaXN0IGNvbnRhaW5lciBhbmQgdGFrZSB0aGUgcmVtYWluZGVyOlxuXHRcdFx0XHQvLyAgMTAwIC0gOS42ID0gOTAuNFxuXHRcdFx0XHRyb290TWFyZ2luQm90dG9tID0gMTAwIC0gKCh0YWJMaXN0Lm91dGVySGVpZ2h0KCkgKyBhYlZhbCArIHNoaWZ0KSAvIHdpbmRvdy5pbm5lckhlaWdodCAqIDEwMCksXG5cblx0XHRcdFx0Ly8gQnVpbGQgSW50ZXJzZWN0aW9uIE9ic2VydmVyIHJvb3RNYXJnaW4gdmFsdWUuXG5cdFx0XHRcdHJvb3RNYXJnaW4gPSBgLSR7dGFiTGlzdC5vdXRlckhlaWdodCgpICsgYWJWYWwgKyBzaGlmdH1weCAwcHggLSR7cm9vdE1hcmdpbkJvdHRvbX0lIDBweGAsXG5cdFx0XHRcdGR5bmFtaWNUYWIgPSBuZXcgd2luZG93LmR5bmFtaWNUYWJzKHtcblx0XHRcdFx0XHRjb250YWluZXI6IHRhYixcblx0XHRcdFx0XHRzY3JvbGxNYXJnaW5TaGlmdDogYWJWYWwsXG5cdFx0XHRcdFx0b2JzZXJ2ZXI6IHtcblx0XHRcdFx0XHRcdHJvb3RNYXJnaW46IHJvb3RNYXJnaW5cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0dGFiSW5zdGFuY2VzID0gdGFiSW5zdGFuY2VzLmNvbmNhdChkeW5hbWljVGFiLmluc3RhbmNlKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcblx0XHRyZXNpemVUaW1lciA9IHNldFRpbWVvdXQocmVzaXplQ2FsbGJhY2ssIDEwMCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXNpemVDYWxsYmFjaygpIHtcblx0XHR0YWJJbnN0YW5jZXMuZm9yRWFjaCh0YWJJbnN0YW5jZSA9PiB0YWJJbnN0YW5jZS5keW5hbWljVGFicy5kZXN0cm95KCkpO1xuXHRcdHRhYkluc3RhbmNlcy5zcGxpY2UoMCwgdGFiSW5zdGFuY2VzLmxlbmd0aCk7IC8vIE1ha2UgaXQgZW1wdHkuXG5cblx0XHRjcmVhdGVUYWJzKCk7XG5cdH1cblxuXHRjcmVhdGVUYWJzKCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuXHQkKGZ1bmN0aW9uICgpIHtcblxuXHR9KTtcblxufSkoalF1ZXJ5KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3RhYnMtcGFuZWwuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvdGFicy1wYW5lbC5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
document.addEventListener('DOMContentLoaded', () => {
	window.messiaVars = window.messiaVars || {};
	window.messiaVars.dialog = {
		dialog: false,
		init: function (config) {
			if (this.dialog !== false) return this.dialog;

			this.dialog = this.createDialog(config);
			this.initDragging(this.dialog);
			this.initResizing(this.dialog);

			return this.dialog;
		},
		createDialog: function (config) {

			const
				dialog = document.createElement('div'),
				buttons = config.buttons.reverse();

			dialog.setAttribute('id', config.dialogId);
			dialog.setAttribute('class', 'messia-dialog');

			dialog.innerHTML =
				`<div class="titlebar">
					<span class="title">${config.dialogTitle}</span>
					<span class="close-dialog">✖</span>
				</div>
				<div class="content">${config.dialogContent}</div>
				<div class="buttonpane">
					<div class="buttonset"></div>
				</div>`;

			dialog.querySelector('.close-dialog').addEventListener('click', window.messiaVars.dialog.initActions.close.bind(dialog), false);

			for (let i = 0; i < buttons.length; i++) {
				const
					button = config.buttons[i],
					buttonEl = document.createElement('button');

				buttonEl.setAttribute('type', 'button');
				buttonEl.setAttribute('id', button.id);
				buttonEl.textContent = button.text;
				buttonEl.addEventListener('click', button.click.bind(dialog), false);

				dialog.querySelector('.buttonpane .buttonset').appendChild(buttonEl);
			}

			Object.defineProperty(dialog, 'messiaDialog', {
				value: {
					open: window.messiaVars.dialog.initActions.open.bind(dialog),
					close: window.messiaVars.dialog.initActions.close.bind(dialog),
					setContent: window.messiaVars.dialog.initActions.setContent.bind(dialog),
				},
			});

			return dialog;
		},
		initDragging: (dialog) => {

			const dragMouseDown = (e) => {

				e = e || window.event;

				const
					base = (e.type === 'touchstart') ? e.touches[0] : e
					rect = e.target.getBoundingClientRect();

				viewPort = {
					height: window.innerHeight,
					width: document.body.clientWidth,
				};

				// get the mouse cursor position at startup relative to viewport:
				cursorX = base.clientX;
				cursorY = base.clientY;

				// get the mouse cursor position at startup relative to handler:
				dragStartX = (Touch === base.constructor) ? base.pageX - rect.left : base.offsetX;
				dragStartY = (Touch === base.constructor) ? base.pageY - rect.top : base.offsetY;

				document.addEventListener('mouseup', dragMouseUp, false);
				document.addEventListener('touchend', dragMouseUp, false);

				document.addEventListener('mousemove', dragMouseMove, false);
				document.addEventListener('touchmove', dragMouseMove, false);
			}

			const dragMouseMove = (e) => {
				if (!elmnt) {
					return;
				}

				e = e || window.event;

				let
					top,
					left,
					right,
					bottom;

				const
					base = (e.type === 'touchmove') ? e.touches[0] : e,
					dialogPositionCurr = elmnt.getBoundingClientRect(),
					cursorShiftX = Math.round(cursorX - base.clientX), // Cursor shift X
					cursorShiftY = Math.round(cursorY - base.clientY); // Cursor shift Y

				// get the mouse cursor position at move relative to viewport:
				cursorX = base.clientX;
				cursorY = base.clientY;

				if (dragStartX >= cursorX) {
					left = 0; // out of a viewport to left.
				} else if ((cursorX + dialogPositionCurr.width - dragStartX) > viewPort.width) {
					left = viewPort.width - dialogPositionCurr.width; // out of a viewport to right.
				} else {
					left = dialogPositionCurr.left - cursorShiftX; // inside viewport.
				}

				if (dragStartY >= cursorY) {
					top = 0; // out of a viewport to top.
				} else if ((cursorY + dialogPositionCurr.height - dragStartY) > viewPort.height) {
					top = viewPort.height - dialogPositionCurr.height; // out of a viewport to bottom.
				} else {
					top = dialogPositionCurr.top - cursorShiftY; // inside viewport.
				}

				right = viewPort.width - (left + dialogPositionCurr.width);
				bottom = viewPort.height - (top + dialogPositionCurr.height);

				// set the element's new position:
				elmnt.style.inset = `${top}px ${right}px ${bottom}px ${left}px`;
			}

			const dragMouseUp = () => {
				document.removeEventListener('mouseup', dragMouseUp, false);
				document.removeEventListener('touchend', dragMouseUp, false);

				document.removeEventListener('mousemove', dragMouseMove, false);
				document.removeEventListener('touchmove', dragMouseMove, false);
			}

			const resizeThrottler = function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(resize, 200);
			}

			const resize = function () {
				elmnt.style.inset = '';
			}

			const getHeader = (element) => {
				var headerItems = element.getElementsByClassName('titlebar');

				if (headerItems.length === 1) {
					return headerItems[0];
				}

				return null;
			}

			let
				cursorX,
				cursorY,
				resizeTimer,
				header = getHeader(dialog),
				elmnt = dialog,
				viewPort;

			if (header) {
				header.addEventListener('mousedown', dragMouseDown, false);
				header.addEventListener('touchstart', dragMouseDown, false);
				window.addEventListener('resize', resizeThrottler, false);
			}
		},
		initResizing: function (dialog) {

			const dragMouseDown = function (e) {

				const
					base = (e.type === 'touchstart') ? e.touches[0] : e,
					targetClasses = e.target.className,
					dialogPositionCurr = element.getBoundingClientRect();

				viewPort = {
					height: window.innerHeight,
					width: document.body.clientWidth,
				};

				cursorX = base.clientX;
				cursorY = base.clientY;

				if (targetClasses.indexOf('resizer-top') !== -1) {
					currentResizer = 'top';
				} else if (targetClasses.indexOf('resizer-right') !== -1) {
					currentResizer = 'right';
				} else if (targetClasses.indexOf('resizer-bottom') !== -1) {
					currentResizer = 'bottom';
				} else if (targetClasses.indexOf('resizer-left') !== -1) {
					currentResizer = 'left';
				} else if (targetClasses.indexOf('resizer-both') !== -1) {
					currentResizer = 'both';
				}

				/**
				 * Compensation for thickness
				 * of HTML handler.
				 */
				delta = {
					top: dialogPositionCurr.top - cursorY,
					right: dialogPositionCurr.right - cursorX,
					bottom: dialogPositionCurr.bottom - cursorY,
					left: dialogPositionCurr.left - cursorX,
				}

				document.documentElement.addEventListener('mousemove', dragMouseMove, false);
				document.documentElement.addEventListener('touchmove', dragMouseMove, false);
				document.documentElement.addEventListener('mouseup', dragMouseUp, false);
				document.documentElement.addEventListener('touchend', dragMouseUp, false);
			}

			const dragMouseMove = function (e) {
				const
					base = (e.type === 'touchmove') ? e.touches[0] : e,
					dialogPositionCurr = element.getBoundingClientRect();

				let
					clientX = base.clientX,
					clientY = base.clientY,
					top,
					right,
					bottom,
					left;

				if (currentResizer === 'top') {

					top = clientY + delta.top;
					right = viewPort.width - dialogPositionCurr.right;
					bottom = viewPort.height - dialogPositionCurr.bottom;
					left = dialogPositionCurr.left;

				} else if (currentResizer === 'right') {

					top = dialogPositionCurr.top;
					right = viewPort.width - (clientX + delta.right);
					bottom = viewPort.height - dialogPositionCurr.bottom;
					left = dialogPositionCurr.left;

				} else if (currentResizer === 'bottom') {

					top = dialogPositionCurr.top;
					right = viewPort.width - dialogPositionCurr.right;
					bottom = viewPort.height - (clientY + delta.bottom);
					left = dialogPositionCurr.left;

				} else if (currentResizer === 'left') {

					top = dialogPositionCurr.top;
					right = viewPort.width - dialogPositionCurr.right;
					bottom = viewPort.height - dialogPositionCurr.bottom;
					left = clientX + delta.left;

				} else if (currentResizer === 'both') {

					top = dialogPositionCurr.top;
					right = viewPort.width - (clientX + delta.right);
					bottom = viewPort.height - (clientY + delta.bottom);
					left = dialogPositionCurr.left;
				}

				/**
				 * Prevent resize over
				 * viewport limits.
				 */

				if (top < 0) top = 0;
				if (right < 0) right = 0;
				if (left < 0) left = 0;
				if (bottom < 0) bottom = 0;

				if (top + dialogPositionCurr.height > viewPort.height) top = viewPort.height - dialogPositionCurr.height;
				if (left + dialogPositionCurr.width > viewPort.width) left = viewPort.width - dialogPositionCurr.width;

				element.style.inset = `${Math.round(top)}px ${Math.round(right)}px ${Math.round(bottom)}px ${Math.round(left)}px`;
			}

			const dragMouseUp = function () {
				document.documentElement.removeEventListener('mousemove', dragMouseMove, false);
				document.documentElement.removeEventListener('touchmove', dragMouseMove, false);
				document.documentElement.removeEventListener('mouseup', dragMouseUp, false);
				document.documentElement.removeEventListener('touchend', dragMouseUp, false);
			}

			const
				element = dialog,
				top = document.createElement('div'),
				right = document.createElement('div'),
				bottom = document.createElement('div'),
				left = document.createElement('div'),
				both = document.createElement('div');

			let
				cursorX,
				cursorY,
				viewPort,
				currentResizer,
				delta;

			top.className = 'resizer-top';
			right.className = 'resizer-right';
			bottom.className = 'resizer-bottom';
			left.className = 'resizer-left';
			both.className = 'resizer-both';

			dialog.appendChild(top);
			dialog.appendChild(right);
			dialog.appendChild(bottom);
			dialog.appendChild(left);
			dialog.appendChild(both);

			top.addEventListener('mousedown', dragMouseDown, false);
			top.addEventListener('touchstart', dragMouseDown, false);

			right.addEventListener('mousedown', dragMouseDown, false);
			right.addEventListener('touchstart', dragMouseDown, false);

			bottom.addEventListener('mousedown', dragMouseDown, false);
			bottom.addEventListener('touchstart', dragMouseDown, false);

			left.addEventListener('mousedown', dragMouseDown, false);
			left.addEventListener('touchstart', dragMouseDown, false);

			both.addEventListener('mousedown', dragMouseDown, false);
			both.addEventListener('touchstart', dragMouseDown, false);
		},
		initActions: {
			/**
			 * Open dialog container. this = container.
			 *
			 * @return void
			 */
			open: function () {
				const
					dur = 300,
					overlay = document.createElement('div');

				const show = (time) => {
					overlay.style.opacity = '';
					this.style.transform = '';
					this.style.opacity = '';

					setTimeout(() => this.removeAttribute('style'), dur);
				};

				overlay.setAttribute('id', 'messia-dialog-overlay');
				overlay.appendChild(this);

				overlay.style.transition = `all ${dur}ms`;
				overlay.style.opacity = 0;

				this.style.transition = `all ${dur}ms`;
				this.style.opacity = 0;
				this.style.transform = 'translateY(-50%)';

				document.body.appendChild(overlay);
				document.body.classList.add('overflow-y-hidden', 'touch-action-none');

				let requestId = requestAnimationFrame(show);
			},
			/**
			 * Close dialog container. this = container.
			 *
			 * @return void
			 */
			close: function () {
				const
					dur = 300,
					overlay = this.closest('#messia-dialog-overlay'),
					event = new Event('dialogClosed');

				overlay.style.transition = `all ${dur}ms`;
				overlay.style.opacity = 0;

				this.style.transition = `all ${dur}ms`;
				this.style.opacity = 0;
				this.style.transform = 'translateY(50%)';

				setTimeout(() => {
					overlay.style.opacity = '';
					this.style.opacity = '';
					this.dispatchEvent(event);
					overlay.remove();
					document.body.classList.remove('overflow-y-hidden', 'touch-action-none');
				}, dur);
			},
			/**
			 * Set new dialog HTML data. this = container.
			 *
			 * @return void
			 */
			setContent: function (content) {
				const container = this.querySelector('.content');
				container.innerHTML = null;
				container.insertAdjacentHTML('afterbegin', content);
			},
		}
	}
});
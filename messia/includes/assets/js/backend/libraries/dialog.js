/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_components/_dialog.scss":
/*!*******************************************!*\
  !*** ./src/scss/_components/_dialog.scss ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_dialog.js":
/*!***************************************!*\
  !*** ./src/js/_components/_dialog.js ***!
  \***************************************/
/***/ (function() {

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
/*!*******************************************************!*\
  !*** ./src/entries/backend/libraries/entry-dialog.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_components_dialog_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../scss/_components/_dialog.scss */ "./src/scss/_components/_dialog.scss");
/* harmony import */ var _js_components_dialog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/_components/_dialog.js */ "./src/js/_components/_dialog.js");
/* harmony import */ var _js_components_dialog_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_components_dialog_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvbGlicmFyaWVzL2RpYWxvZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJOztBQUVKO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7O0FBRXhEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZixNQUFNO0FBQ04sdURBQXVEO0FBQ3ZELE1BQU07QUFDTixvREFBb0Q7QUFDcEQ7O0FBRUE7QUFDQSxjQUFjO0FBQ2QsTUFBTTtBQUNOLHdEQUF3RDtBQUN4RCxNQUFNO0FBQ04sa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsSUFBSSxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssS0FBSztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2QkFBNkIsZ0JBQWdCLEtBQUssa0JBQWtCLEtBQUssbUJBQW1CLEtBQUssaUJBQWlCO0FBQ2xIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLElBQUk7QUFDMUM7O0FBRUEsbUNBQW1DLElBQUk7QUFDdkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQyxJQUFJO0FBQzFDOztBQUVBLG1DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7Ozs7OztVQ3RaRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNnRDs7QUFFaEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9fY29tcG9uZW50cy9fZGlhbG9nLnNjc3M/MDNmYyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2NvbXBvbmVudHMvX2RpYWxvZy5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9saWJyYXJpZXMvZW50cnktZGlhbG9nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG5cdHdpbmRvdy5tZXNzaWFWYXJzID0gd2luZG93Lm1lc3NpYVZhcnMgfHwge307XG5cdHdpbmRvdy5tZXNzaWFWYXJzLmRpYWxvZyA9IHtcblx0XHRkaWFsb2c6IGZhbHNlLFxuXHRcdGluaXQ6IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHRcdGlmICh0aGlzLmRpYWxvZyAhPT0gZmFsc2UpIHJldHVybiB0aGlzLmRpYWxvZztcblxuXHRcdFx0dGhpcy5kaWFsb2cgPSB0aGlzLmNyZWF0ZURpYWxvZyhjb25maWcpO1xuXHRcdFx0dGhpcy5pbml0RHJhZ2dpbmcodGhpcy5kaWFsb2cpO1xuXHRcdFx0dGhpcy5pbml0UmVzaXppbmcodGhpcy5kaWFsb2cpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFsb2c7XG5cdFx0fSxcblx0XHRjcmVhdGVEaWFsb2c6IGZ1bmN0aW9uIChjb25maWcpIHtcblxuXHRcdFx0Y29uc3Rcblx0XHRcdFx0ZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdGJ1dHRvbnMgPSBjb25maWcuYnV0dG9ucy5yZXZlcnNlKCk7XG5cblx0XHRcdGRpYWxvZy5zZXRBdHRyaWJ1dGUoJ2lkJywgY29uZmlnLmRpYWxvZ0lkKTtcblx0XHRcdGRpYWxvZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lc3NpYS1kaWFsb2cnKTtcblxuXHRcdFx0ZGlhbG9nLmlubmVySFRNTCA9XG5cdFx0XHRcdGA8ZGl2IGNsYXNzPVwidGl0bGViYXJcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHtjb25maWcuZGlhbG9nVGl0bGV9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2xvc2UtZGlhbG9nXCI+4pyWPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbnRlbnRcIj4ke2NvbmZpZy5kaWFsb2dDb250ZW50fTwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnV0dG9ucGFuZVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJidXR0b25zZXRcIj48L2Rpdj5cblx0XHRcdFx0PC9kaXY+YDtcblxuXHRcdFx0ZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1kaWFsb2cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHdpbmRvdy5tZXNzaWFWYXJzLmRpYWxvZy5pbml0QWN0aW9ucy5jbG9zZS5iaW5kKGRpYWxvZyksIGZhbHNlKTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0YnV0dG9uID0gY29uZmlnLmJ1dHRvbnNbaV0sXG5cdFx0XHRcdFx0YnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuXHRcdFx0XHRidXR0b25FbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG5cdFx0XHRcdGJ1dHRvbkVsLnNldEF0dHJpYnV0ZSgnaWQnLCBidXR0b24uaWQpO1xuXHRcdFx0XHRidXR0b25FbC50ZXh0Q29udGVudCA9IGJ1dHRvbi50ZXh0O1xuXHRcdFx0XHRidXR0b25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1dHRvbi5jbGljay5iaW5kKGRpYWxvZyksIGZhbHNlKTtcblxuXHRcdFx0XHRkaWFsb2cucXVlcnlTZWxlY3RvcignLmJ1dHRvbnBhbmUgLmJ1dHRvbnNldCcpLmFwcGVuZENoaWxkKGJ1dHRvbkVsKTtcblx0XHRcdH1cblxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRpYWxvZywgJ21lc3NpYURpYWxvZycsIHtcblx0XHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0XHRvcGVuOiB3aW5kb3cubWVzc2lhVmFycy5kaWFsb2cuaW5pdEFjdGlvbnMub3Blbi5iaW5kKGRpYWxvZyksXG5cdFx0XHRcdFx0Y2xvc2U6IHdpbmRvdy5tZXNzaWFWYXJzLmRpYWxvZy5pbml0QWN0aW9ucy5jbG9zZS5iaW5kKGRpYWxvZyksXG5cdFx0XHRcdFx0c2V0Q29udGVudDogd2luZG93Lm1lc3NpYVZhcnMuZGlhbG9nLmluaXRBY3Rpb25zLnNldENvbnRlbnQuYmluZChkaWFsb2cpLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkaWFsb2c7XG5cdFx0fSxcblx0XHRpbml0RHJhZ2dpbmc6IChkaWFsb2cpID0+IHtcblxuXHRcdFx0Y29uc3QgZHJhZ01vdXNlRG93biA9IChlKSA9PiB7XG5cblx0XHRcdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0YmFzZSA9IChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JykgPyBlLnRvdWNoZXNbMF0gOiBlXG5cdFx0XHRcdFx0cmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdHZpZXdQb3J0ID0ge1xuXHRcdFx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdFx0XHRcdHdpZHRoOiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIGdldCB0aGUgbW91c2UgY3Vyc29yIHBvc2l0aW9uIGF0IHN0YXJ0dXAgcmVsYXRpdmUgdG8gdmlld3BvcnQ6XG5cdFx0XHRcdGN1cnNvclggPSBiYXNlLmNsaWVudFg7XG5cdFx0XHRcdGN1cnNvclkgPSBiYXNlLmNsaWVudFk7XG5cblx0XHRcdFx0Ly8gZ2V0IHRoZSBtb3VzZSBjdXJzb3IgcG9zaXRpb24gYXQgc3RhcnR1cCByZWxhdGl2ZSB0byBoYW5kbGVyOlxuXHRcdFx0XHRkcmFnU3RhcnRYID0gKFRvdWNoID09PSBiYXNlLmNvbnN0cnVjdG9yKSA/IGJhc2UucGFnZVggLSByZWN0LmxlZnQgOiBiYXNlLm9mZnNldFg7XG5cdFx0XHRcdGRyYWdTdGFydFkgPSAoVG91Y2ggPT09IGJhc2UuY29uc3RydWN0b3IpID8gYmFzZS5wYWdlWSAtIHJlY3QudG9wIDogYmFzZS5vZmZzZXRZO1xuXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBkcmFnTW91c2VVcCwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGRyYWdNb3VzZVVwLCBmYWxzZSk7XG5cblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ01vdXNlTW92ZSwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkcmFnTW91c2VNb3ZlLCBmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGRyYWdNb3VzZU1vdmUgPSAoZSkgPT4ge1xuXHRcdFx0XHRpZiAoIWVsbW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0XHRcdGxldFxuXHRcdFx0XHRcdHRvcCxcblx0XHRcdFx0XHRsZWZ0LFxuXHRcdFx0XHRcdHJpZ2h0LFxuXHRcdFx0XHRcdGJvdHRvbTtcblxuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGJhc2UgPSAoZS50eXBlID09PSAndG91Y2htb3ZlJykgPyBlLnRvdWNoZXNbMF0gOiBlLFxuXHRcdFx0XHRcdGRpYWxvZ1Bvc2l0aW9uQ3VyciA9IGVsbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHRcdGN1cnNvclNoaWZ0WCA9IE1hdGgucm91bmQoY3Vyc29yWCAtIGJhc2UuY2xpZW50WCksIC8vIEN1cnNvciBzaGlmdCBYXG5cdFx0XHRcdFx0Y3Vyc29yU2hpZnRZID0gTWF0aC5yb3VuZChjdXJzb3JZIC0gYmFzZS5jbGllbnRZKTsgLy8gQ3Vyc29yIHNoaWZ0IFlcblxuXHRcdFx0XHQvLyBnZXQgdGhlIG1vdXNlIGN1cnNvciBwb3NpdGlvbiBhdCBtb3ZlIHJlbGF0aXZlIHRvIHZpZXdwb3J0OlxuXHRcdFx0XHRjdXJzb3JYID0gYmFzZS5jbGllbnRYO1xuXHRcdFx0XHRjdXJzb3JZID0gYmFzZS5jbGllbnRZO1xuXG5cdFx0XHRcdGlmIChkcmFnU3RhcnRYID49IGN1cnNvclgpIHtcblx0XHRcdFx0XHRsZWZ0ID0gMDsgLy8gb3V0IG9mIGEgdmlld3BvcnQgdG8gbGVmdC5cblx0XHRcdFx0fSBlbHNlIGlmICgoY3Vyc29yWCArIGRpYWxvZ1Bvc2l0aW9uQ3Vyci53aWR0aCAtIGRyYWdTdGFydFgpID4gdmlld1BvcnQud2lkdGgpIHtcblx0XHRcdFx0XHRsZWZ0ID0gdmlld1BvcnQud2lkdGggLSBkaWFsb2dQb3NpdGlvbkN1cnIud2lkdGg7IC8vIG91dCBvZiBhIHZpZXdwb3J0IHRvIHJpZ2h0LlxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxlZnQgPSBkaWFsb2dQb3NpdGlvbkN1cnIubGVmdCAtIGN1cnNvclNoaWZ0WDsgLy8gaW5zaWRlIHZpZXdwb3J0LlxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGRyYWdTdGFydFkgPj0gY3Vyc29yWSkge1xuXHRcdFx0XHRcdHRvcCA9IDA7IC8vIG91dCBvZiBhIHZpZXdwb3J0IHRvIHRvcC5cblx0XHRcdFx0fSBlbHNlIGlmICgoY3Vyc29yWSArIGRpYWxvZ1Bvc2l0aW9uQ3Vyci5oZWlnaHQgLSBkcmFnU3RhcnRZKSA+IHZpZXdQb3J0LmhlaWdodCkge1xuXHRcdFx0XHRcdHRvcCA9IHZpZXdQb3J0LmhlaWdodCAtIGRpYWxvZ1Bvc2l0aW9uQ3Vyci5oZWlnaHQ7IC8vIG91dCBvZiBhIHZpZXdwb3J0IHRvIGJvdHRvbS5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0b3AgPSBkaWFsb2dQb3NpdGlvbkN1cnIudG9wIC0gY3Vyc29yU2hpZnRZOyAvLyBpbnNpZGUgdmlld3BvcnQuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyaWdodCA9IHZpZXdQb3J0LndpZHRoIC0gKGxlZnQgKyBkaWFsb2dQb3NpdGlvbkN1cnIud2lkdGgpO1xuXHRcdFx0XHRib3R0b20gPSB2aWV3UG9ydC5oZWlnaHQgLSAodG9wICsgZGlhbG9nUG9zaXRpb25DdXJyLmhlaWdodCk7XG5cblx0XHRcdFx0Ly8gc2V0IHRoZSBlbGVtZW50J3MgbmV3IHBvc2l0aW9uOlxuXHRcdFx0XHRlbG1udC5zdHlsZS5pbnNldCA9IGAke3RvcH1weCAke3JpZ2h0fXB4ICR7Ym90dG9tfXB4ICR7bGVmdH1weGA7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGRyYWdNb3VzZVVwID0gKCkgPT4ge1xuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZHJhZ01vdXNlVXAsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkcmFnTW91c2VVcCwgZmFsc2UpO1xuXG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdNb3VzZU1vdmUsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZHJhZ01vdXNlTW92ZSwgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZXNpemVUaHJvdHRsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG5cdFx0XHRcdHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChyZXNpemUsIDIwMCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZWxtbnQuc3R5bGUuaW5zZXQgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZ2V0SGVhZGVyID0gKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0dmFyIGhlYWRlckl0ZW1zID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aXRsZWJhcicpO1xuXG5cdFx0XHRcdGlmIChoZWFkZXJJdGVtcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRyZXR1cm4gaGVhZGVySXRlbXNbMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0bGV0XG5cdFx0XHRcdGN1cnNvclgsXG5cdFx0XHRcdGN1cnNvclksXG5cdFx0XHRcdHJlc2l6ZVRpbWVyLFxuXHRcdFx0XHRoZWFkZXIgPSBnZXRIZWFkZXIoZGlhbG9nKSxcblx0XHRcdFx0ZWxtbnQgPSBkaWFsb2csXG5cdFx0XHRcdHZpZXdQb3J0O1xuXG5cdFx0XHRpZiAoaGVhZGVyKSB7XG5cdFx0XHRcdGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBkcmFnTW91c2VEb3duLCBmYWxzZSk7XG5cdFx0XHRcdGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplVGhyb3R0bGVyLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpbml0UmVzaXppbmc6IGZ1bmN0aW9uIChkaWFsb2cpIHtcblxuXHRcdFx0Y29uc3QgZHJhZ01vdXNlRG93biA9IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRiYXNlID0gKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSA/IGUudG91Y2hlc1swXSA6IGUsXG5cdFx0XHRcdFx0dGFyZ2V0Q2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTmFtZSxcblx0XHRcdFx0XHRkaWFsb2dQb3NpdGlvbkN1cnIgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdHZpZXdQb3J0ID0ge1xuXHRcdFx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdFx0XHRcdHdpZHRoOiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGN1cnNvclggPSBiYXNlLmNsaWVudFg7XG5cdFx0XHRcdGN1cnNvclkgPSBiYXNlLmNsaWVudFk7XG5cblx0XHRcdFx0aWYgKHRhcmdldENsYXNzZXMuaW5kZXhPZigncmVzaXplci10b3AnKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRjdXJyZW50UmVzaXplciA9ICd0b3AnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuaW5kZXhPZigncmVzaXplci1yaWdodCcpICE9PSAtMSkge1xuXHRcdFx0XHRcdGN1cnJlbnRSZXNpemVyID0gJ3JpZ2h0Jztcblx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXRDbGFzc2VzLmluZGV4T2YoJ3Jlc2l6ZXItYm90dG9tJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0Y3VycmVudFJlc2l6ZXIgPSAnYm90dG9tJztcblx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXRDbGFzc2VzLmluZGV4T2YoJ3Jlc2l6ZXItbGVmdCcpICE9PSAtMSkge1xuXHRcdFx0XHRcdGN1cnJlbnRSZXNpemVyID0gJ2xlZnQnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldENsYXNzZXMuaW5kZXhPZigncmVzaXplci1ib3RoJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0Y3VycmVudFJlc2l6ZXIgPSAnYm90aCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogQ29tcGVuc2F0aW9uIGZvciB0aGlja25lc3Ncblx0XHRcdFx0ICogb2YgSFRNTCBoYW5kbGVyLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZGVsdGEgPSB7XG5cdFx0XHRcdFx0dG9wOiBkaWFsb2dQb3NpdGlvbkN1cnIudG9wIC0gY3Vyc29yWSxcblx0XHRcdFx0XHRyaWdodDogZGlhbG9nUG9zaXRpb25DdXJyLnJpZ2h0IC0gY3Vyc29yWCxcblx0XHRcdFx0XHRib3R0b206IGRpYWxvZ1Bvc2l0aW9uQ3Vyci5ib3R0b20gLSBjdXJzb3JZLFxuXHRcdFx0XHRcdGxlZnQ6IGRpYWxvZ1Bvc2l0aW9uQ3Vyci5sZWZ0IC0gY3Vyc29yWCxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnTW91c2VNb3ZlLCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkcmFnTW91c2VNb3ZlLCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZHJhZ01vdXNlVXAsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZHJhZ01vdXNlVXAsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZHJhZ01vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0YmFzZSA9IChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudG91Y2hlc1swXSA6IGUsXG5cdFx0XHRcdFx0ZGlhbG9nUG9zaXRpb25DdXJyID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRsZXRcblx0XHRcdFx0XHRjbGllbnRYID0gYmFzZS5jbGllbnRYLFxuXHRcdFx0XHRcdGNsaWVudFkgPSBiYXNlLmNsaWVudFksXG5cdFx0XHRcdFx0dG9wLFxuXHRcdFx0XHRcdHJpZ2h0LFxuXHRcdFx0XHRcdGJvdHRvbSxcblx0XHRcdFx0XHRsZWZ0O1xuXG5cdFx0XHRcdGlmIChjdXJyZW50UmVzaXplciA9PT0gJ3RvcCcpIHtcblxuXHRcdFx0XHRcdHRvcCA9IGNsaWVudFkgKyBkZWx0YS50b3A7XG5cdFx0XHRcdFx0cmlnaHQgPSB2aWV3UG9ydC53aWR0aCAtIGRpYWxvZ1Bvc2l0aW9uQ3Vyci5yaWdodDtcblx0XHRcdFx0XHRib3R0b20gPSB2aWV3UG9ydC5oZWlnaHQgLSBkaWFsb2dQb3NpdGlvbkN1cnIuYm90dG9tO1xuXHRcdFx0XHRcdGxlZnQgPSBkaWFsb2dQb3NpdGlvbkN1cnIubGVmdDtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnRSZXNpemVyID09PSAncmlnaHQnKSB7XG5cblx0XHRcdFx0XHR0b3AgPSBkaWFsb2dQb3NpdGlvbkN1cnIudG9wO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdmlld1BvcnQud2lkdGggLSAoY2xpZW50WCArIGRlbHRhLnJpZ2h0KTtcblx0XHRcdFx0XHRib3R0b20gPSB2aWV3UG9ydC5oZWlnaHQgLSBkaWFsb2dQb3NpdGlvbkN1cnIuYm90dG9tO1xuXHRcdFx0XHRcdGxlZnQgPSBkaWFsb2dQb3NpdGlvbkN1cnIubGVmdDtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnRSZXNpemVyID09PSAnYm90dG9tJykge1xuXG5cdFx0XHRcdFx0dG9wID0gZGlhbG9nUG9zaXRpb25DdXJyLnRvcDtcblx0XHRcdFx0XHRyaWdodCA9IHZpZXdQb3J0LndpZHRoIC0gZGlhbG9nUG9zaXRpb25DdXJyLnJpZ2h0O1xuXHRcdFx0XHRcdGJvdHRvbSA9IHZpZXdQb3J0LmhlaWdodCAtIChjbGllbnRZICsgZGVsdGEuYm90dG9tKTtcblx0XHRcdFx0XHRsZWZ0ID0gZGlhbG9nUG9zaXRpb25DdXJyLmxlZnQ7XG5cblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyZW50UmVzaXplciA9PT0gJ2xlZnQnKSB7XG5cblx0XHRcdFx0XHR0b3AgPSBkaWFsb2dQb3NpdGlvbkN1cnIudG9wO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdmlld1BvcnQud2lkdGggLSBkaWFsb2dQb3NpdGlvbkN1cnIucmlnaHQ7XG5cdFx0XHRcdFx0Ym90dG9tID0gdmlld1BvcnQuaGVpZ2h0IC0gZGlhbG9nUG9zaXRpb25DdXJyLmJvdHRvbTtcblx0XHRcdFx0XHRsZWZ0ID0gY2xpZW50WCArIGRlbHRhLmxlZnQ7XG5cblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyZW50UmVzaXplciA9PT0gJ2JvdGgnKSB7XG5cblx0XHRcdFx0XHR0b3AgPSBkaWFsb2dQb3NpdGlvbkN1cnIudG9wO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdmlld1BvcnQud2lkdGggLSAoY2xpZW50WCArIGRlbHRhLnJpZ2h0KTtcblx0XHRcdFx0XHRib3R0b20gPSB2aWV3UG9ydC5oZWlnaHQgLSAoY2xpZW50WSArIGRlbHRhLmJvdHRvbSk7XG5cdFx0XHRcdFx0bGVmdCA9IGRpYWxvZ1Bvc2l0aW9uQ3Vyci5sZWZ0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFByZXZlbnQgcmVzaXplIG92ZXJcblx0XHRcdFx0ICogdmlld3BvcnQgbGltaXRzLlxuXHRcdFx0XHQgKi9cblxuXHRcdFx0XHRpZiAodG9wIDwgMCkgdG9wID0gMDtcblx0XHRcdFx0aWYgKHJpZ2h0IDwgMCkgcmlnaHQgPSAwO1xuXHRcdFx0XHRpZiAobGVmdCA8IDApIGxlZnQgPSAwO1xuXHRcdFx0XHRpZiAoYm90dG9tIDwgMCkgYm90dG9tID0gMDtcblxuXHRcdFx0XHRpZiAodG9wICsgZGlhbG9nUG9zaXRpb25DdXJyLmhlaWdodCA+IHZpZXdQb3J0LmhlaWdodCkgdG9wID0gdmlld1BvcnQuaGVpZ2h0IC0gZGlhbG9nUG9zaXRpb25DdXJyLmhlaWdodDtcblx0XHRcdFx0aWYgKGxlZnQgKyBkaWFsb2dQb3NpdGlvbkN1cnIud2lkdGggPiB2aWV3UG9ydC53aWR0aCkgbGVmdCA9IHZpZXdQb3J0LndpZHRoIC0gZGlhbG9nUG9zaXRpb25DdXJyLndpZHRoO1xuXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuaW5zZXQgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHggJHtNYXRoLnJvdW5kKHJpZ2h0KX1weCAke01hdGgucm91bmQoYm90dG9tKX1weCAke01hdGgucm91bmQobGVmdCl9cHhgO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBkcmFnTW91c2VVcCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdNb3VzZU1vdmUsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGRyYWdNb3VzZU1vdmUsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBkcmFnTW91c2VVcCwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkcmFnTW91c2VVcCwgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRlbGVtZW50ID0gZGlhbG9nLFxuXHRcdFx0XHR0b3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0Ym90dG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0Ym90aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRsZXRcblx0XHRcdFx0Y3Vyc29yWCxcblx0XHRcdFx0Y3Vyc29yWSxcblx0XHRcdFx0dmlld1BvcnQsXG5cdFx0XHRcdGN1cnJlbnRSZXNpemVyLFxuXHRcdFx0XHRkZWx0YTtcblxuXHRcdFx0dG9wLmNsYXNzTmFtZSA9ICdyZXNpemVyLXRvcCc7XG5cdFx0XHRyaWdodC5jbGFzc05hbWUgPSAncmVzaXplci1yaWdodCc7XG5cdFx0XHRib3R0b20uY2xhc3NOYW1lID0gJ3Jlc2l6ZXItYm90dG9tJztcblx0XHRcdGxlZnQuY2xhc3NOYW1lID0gJ3Jlc2l6ZXItbGVmdCc7XG5cdFx0XHRib3RoLmNsYXNzTmFtZSA9ICdyZXNpemVyLWJvdGgnO1xuXG5cdFx0XHRkaWFsb2cuYXBwZW5kQ2hpbGQodG9wKTtcblx0XHRcdGRpYWxvZy5hcHBlbmRDaGlsZChyaWdodCk7XG5cdFx0XHRkaWFsb2cuYXBwZW5kQ2hpbGQoYm90dG9tKTtcblx0XHRcdGRpYWxvZy5hcHBlbmRDaGlsZChsZWZ0KTtcblx0XHRcdGRpYWxvZy5hcHBlbmRDaGlsZChib3RoKTtcblxuXHRcdFx0dG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGRyYWdNb3VzZURvd24sIGZhbHNlKTtcblx0XHRcdHRvcC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXG5cdFx0XHRyaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBkcmFnTW91c2VEb3duLCBmYWxzZSk7XG5cdFx0XHRyaWdodC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXG5cdFx0XHRib3R0b20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXHRcdFx0Ym90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBkcmFnTW91c2VEb3duLCBmYWxzZSk7XG5cblx0XHRcdGxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXHRcdFx0bGVmdC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZHJhZ01vdXNlRG93biwgZmFsc2UpO1xuXG5cdFx0XHRib3RoLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGRyYWdNb3VzZURvd24sIGZhbHNlKTtcblx0XHRcdGJvdGguYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGRyYWdNb3VzZURvd24sIGZhbHNlKTtcblx0XHR9LFxuXHRcdGluaXRBY3Rpb25zOiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIE9wZW4gZGlhbG9nIGNvbnRhaW5lci4gdGhpcyA9IGNvbnRhaW5lci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0b3BlbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGR1ciA9IDMwMCxcblx0XHRcdFx0XHRvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdFx0Y29uc3Qgc2hvdyA9ICh0aW1lKSA9PiB7XG5cdFx0XHRcdFx0b3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAnJztcblx0XHRcdFx0XHR0aGlzLnN0eWxlLm9wYWNpdHkgPSAnJztcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyksIGR1cik7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0b3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21lc3NpYS1kaWFsb2ctb3ZlcmxheScpO1xuXHRcdFx0XHRvdmVybGF5LmFwcGVuZENoaWxkKHRoaXMpO1xuXG5cdFx0XHRcdG92ZXJsYXkuc3R5bGUudHJhbnNpdGlvbiA9IGBhbGwgJHtkdXJ9bXNgO1xuXHRcdFx0XHRvdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAwO1xuXG5cdFx0XHRcdHRoaXMuc3R5bGUudHJhbnNpdGlvbiA9IGBhbGwgJHtkdXJ9bXNgO1xuXHRcdFx0XHR0aGlzLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdFx0XHR0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC01MCUpJztcblxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LXktaGlkZGVuJywgJ3RvdWNoLWFjdGlvbi1ub25lJyk7XG5cblx0XHRcdFx0bGV0IHJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KTtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIENsb3NlIGRpYWxvZyBjb250YWluZXIuIHRoaXMgPSBjb250YWluZXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdGNsb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0ZHVyID0gMzAwLFxuXHRcdFx0XHRcdG92ZXJsYXkgPSB0aGlzLmNsb3Nlc3QoJyNtZXNzaWEtZGlhbG9nLW92ZXJsYXknKSxcblx0XHRcdFx0XHRldmVudCA9IG5ldyBFdmVudCgnZGlhbG9nQ2xvc2VkJyk7XG5cblx0XHRcdFx0b3ZlcmxheS5zdHlsZS50cmFuc2l0aW9uID0gYGFsbCAke2R1cn1tc2A7XG5cdFx0XHRcdG92ZXJsYXkuc3R5bGUub3BhY2l0eSA9IDA7XG5cblx0XHRcdFx0dGhpcy5zdHlsZS50cmFuc2l0aW9uID0gYGFsbCAke2R1cn1tc2A7XG5cdFx0XHRcdHRoaXMuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0XHRcdHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoNTAlKSc7XG5cblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0b3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5zdHlsZS5vcGFjaXR5ID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRcdFx0XHRvdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3cteS1oaWRkZW4nLCAndG91Y2gtYWN0aW9uLW5vbmUnKTtcblx0XHRcdFx0fSwgZHVyKTtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBuZXcgZGlhbG9nIEhUTUwgZGF0YS4gdGhpcyA9IGNvbnRhaW5lci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0c2V0Q29udGVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcblx0XHRcdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gbnVsbDtcblx0XHRcdFx0Y29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGNvbnRlbnQpO1xuXHRcdFx0fSxcblx0XHR9XG5cdH1cbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZVxuaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy9fY29tcG9uZW50cy9fZGlhbG9nLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vLi4vanMvX2NvbXBvbmVudHMvX2RpYWxvZy5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
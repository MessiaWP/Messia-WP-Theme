/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/object/default/object.scss":
/*!*********************************************!*\
  !*** ./src/scss/object/default/object.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_loader.js":
/*!***************************************!*\
  !*** ./src/js/_components/_loader.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/**
 * Animated spinner.
 *
 * @param {string} showHide Show or hide.
 * @param {string} selector JQ element to append loader to.
 *
 * @return Promise.
 */
const loaderFn = (showHide, selector) => {
	const $ = jQuery;

	if (showHide === 'show') {
		return new Promise(
			resolve => {
				if ($(`${selector} > .messia-spinner`).length > 0) {
					resolve('done');
				}
				$(selector).append('<div class="messia-spinner"><div class="loading"><i></i><i></i><i></i><i></i></div></div>');
				$('.overlay').addClass('overlay-show');
				resolve('done');
			}
		);

	} else if (showHide === 'hide') {

		return new Promise(
			resolve => {
				$(selector).find('.messia-spinner').animate({
					opacity: 0,
				}, 100, "swing", function () {
					$(this).remove();
					$('.overlay').removeClass('overlay-show');
					resolve('done');
				});
			}
		);
	}
};

__webpack_require__.g.MessiaExt = __webpack_require__.g.MessiaExt || {};
__webpack_require__.g.MessiaExt = {
	...__webpack_require__.g.MessiaExt,
	...{ loader: loaderFn }
};

/***/ }),

/***/ "./src/js/object-default.js":
/*!**********************************!*\
  !*** ./src/js/object-default.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components/_loader.js */ "./src/js/_components/_loader.js");
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_loader_js__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {

	$(function () {

		var Messia = {
			tooltipConfig: {
				placement: 'top',
			},
			makeTooltip: function () {
				$('.object-card [title], .cross-propertires [title], .cross-categories [title]').tooltip(Messia.tooltipConfig);
			},
			showCommentTab: function () {
				if (location.hash == "#comments") {

					const commentsContainer = $('.comments-nav-links').parents('.comment-items');

					$(window).on('load', () => {
						MessiaExt.scrollTo(commentsContainer.get(0).offsetTop - 150);
					});
				}
			},
			rewindComments: function (e) {

				var target = $(this);
				var url = target.attr('href');

				if (url) {
					MessiaExt.loader('show', '.comment-items');
					e.preventDefault();

					$.get(url)
						.done(function (data, textStatus, jqXHR) {

							var replaces = [];
							var post = $($.parseHTML(data));
							var map = [
								{
									'source': post.find('.comment-items'),
									'target': $('.comment-items'),
								},
							];

							window.history.pushState({
								singleUrl: url,
							}, '', url);

							$(window).off('popstate', Messia.refreshUrl);
							$(window).one('popstate', Messia.refreshUrl);

							MessiaExt
								.loader('hide', '.comment-items')
								.then((resolve) => {
									for (var i = 0; i < map.length; i++) {
										let replace = Messia.replaceHtml(map[i]['source'], map[i]['target']);
										replaces.push(replace);
									}

									Promise.allSettled(replaces).then((results) => {
										// ...code
									});
								});
						})
						.fail(function () {
							MessiaExt.loader('hide', '.comment-items');
						});
				}
			},
			replaceHtml: function (source, target) {

				var dur = 600;
				return Messia.delay(0)
					.then((resolve) => {
						target.css({
							'transition': 'all ' + dur + 'ms',
							'filter': 'blur(10px)',
							'opacity': '0',
						});
						return Messia.delay(dur);
					})
					.then((resolve) => {
						target.html(source.html());
						target.css({
							'filter': 'blur(0px)',
							'opacity': '1',
						});
						return Messia.delay(dur);
					})
					.then((resolve) => {
						target.removeAttr('style')
						return Messia.delay(0);
					})
					.then((resolve) => {
						return Promise.resolve('done');
					});
			},
			refreshUrl: function (event) {
				document.location.reload();
			},
			delay: function (ms) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(ms);
					}, ms);
				});
			},
		}

		$('.comment-items').on('click', '.comments-nav-links .comments-next a', Messia.rewindComments);
		$('.comment-items').on('click', '.comments-nav-links .comments-previous a', Messia.rewindComments);

		Messia.showCommentTab();
		Messia.makeTooltip();
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!*********************************************!*\
  !*** ./src/entries/entry-object-default.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_object_default_object_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/object/default/object.scss */ "./src/scss/object/default/object.scss");
/* harmony import */ var _js_object_default_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/object-default.js */ "./src/js/object-default.js");
//Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL29iamVjdC1kZWZhdWx0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBTSxhQUFhLHFCQUFNO0FBQ3pCLHFCQUFNO0FBQ04sSUFBSSxxQkFBTTtBQUNWLE1BQU07QUFDTjs7Ozs7Ozs7Ozs7Ozs7QUMzQ2tDOztBQUVsQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7Ozs7OztVQ25IRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzRDOztBQUU1QyIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL29iamVjdC9kZWZhdWx0L29iamVjdC5zY3NzP2UxZWIiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL29iamVjdC1kZWZhdWx0LmpzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9lbnRyeS1vYmplY3QtZGVmYXVsdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKipcbiAqIEFuaW1hdGVkIHNwaW5uZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dIaWRlIFNob3cgb3IgaGlkZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBKUSBlbGVtZW50IHRvIGFwcGVuZCBsb2FkZXIgdG8uXG4gKlxuICogQHJldHVybiBQcm9taXNlLlxuICovXG5jb25zdCBsb2FkZXJGbiA9IChzaG93SGlkZSwgc2VsZWN0b3IpID0+IHtcblx0Y29uc3QgJCA9IGpRdWVyeTtcblxuXHRpZiAoc2hvd0hpZGUgPT09ICdzaG93Jykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHRpZiAoJChgJHtzZWxlY3Rvcn0gPiAubWVzc2lhLXNwaW5uZXJgKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoc2VsZWN0b3IpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lc3NpYS1zcGlubmVyXCI+PGRpdiBjbGFzcz1cImxvYWRpbmdcIj48aT48L2k+PGk+PC9pPjxpPjwvaT48aT48L2k+PC9kaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdCQoJy5vdmVybGF5JykuYWRkQ2xhc3MoJ292ZXJsYXktc2hvdycpO1xuXHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHR9IGVsc2UgaWYgKHNob3dIaWRlID09PSAnaGlkZScpIHtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHQkKHNlbGVjdG9yKS5maW5kKCcubWVzc2lhLXNwaW5uZXInKS5hbmltYXRlKHtcblx0XHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHR9LCAxMDAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCgnLm92ZXJsYXknKS5yZW1vdmVDbGFzcygnb3ZlcmxheS1zaG93Jyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG59O1xuXG5nbG9iYWwuTWVzc2lhRXh0ID0gZ2xvYmFsLk1lc3NpYUV4dCB8fCB7fTtcbmdsb2JhbC5NZXNzaWFFeHQgPSB7XG5cdC4uLmdsb2JhbC5NZXNzaWFFeHQsXG5cdC4uLnsgbG9hZGVyOiBsb2FkZXJGbiB9XG59OyIsImltcG9ydCAnLi9fY29tcG9uZW50cy9fbG9hZGVyLmpzJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgTWVzc2lhID0ge1xuXHRcdFx0dG9vbHRpcENvbmZpZzoge1xuXHRcdFx0XHRwbGFjZW1lbnQ6ICd0b3AnLFxuXHRcdFx0fSxcblx0XHRcdG1ha2VUb29sdGlwOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJy5vYmplY3QtY2FyZCBbdGl0bGVdLCAuY3Jvc3MtcHJvcGVydGlyZXMgW3RpdGxlXSwgLmNyb3NzLWNhdGVnb3JpZXMgW3RpdGxlXScpLnRvb2x0aXAoTWVzc2lhLnRvb2x0aXBDb25maWcpO1xuXHRcdFx0fSxcblx0XHRcdHNob3dDb21tZW50VGFiOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChsb2NhdGlvbi5oYXNoID09IFwiI2NvbW1lbnRzXCIpIHtcblxuXHRcdFx0XHRcdGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gJCgnLmNvbW1lbnRzLW5hdi1saW5rcycpLnBhcmVudHMoJy5jb21tZW50LWl0ZW1zJyk7XG5cblx0XHRcdFx0XHQkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRNZXNzaWFFeHQuc2Nyb2xsVG8oY29tbWVudHNDb250YWluZXIuZ2V0KDApLm9mZnNldFRvcCAtIDE1MCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRyZXdpbmRDb21tZW50czogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIHVybCA9IHRhcmdldC5hdHRyKCdocmVmJyk7XG5cblx0XHRcdFx0aWYgKHVybCkge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2FkZXIoJ3Nob3cnLCAnLmNvbW1lbnQtaXRlbXMnKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHQkLmdldCh1cmwpXG5cdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpIHtcblxuXHRcdFx0XHRcdFx0XHR2YXIgcmVwbGFjZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0dmFyIHBvc3QgPSAkKCQucGFyc2VIVE1MKGRhdGEpKTtcblx0XHRcdFx0XHRcdFx0dmFyIG1hcCA9IFtcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHQnc291cmNlJzogcG9zdC5maW5kKCcuY29tbWVudC1pdGVtcycpLFxuXHRcdFx0XHRcdFx0XHRcdFx0J3RhcmdldCc6ICQoJy5jb21tZW50LWl0ZW1zJyksXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRcdHNpbmdsZVVybDogdXJsLFxuXHRcdFx0XHRcdFx0XHR9LCAnJywgdXJsKTtcblxuXHRcdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIE1lc3NpYS5yZWZyZXNoVXJsKTtcblx0XHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgncG9wc3RhdGUnLCBNZXNzaWEucmVmcmVzaFVybCk7XG5cblx0XHRcdFx0XHRcdFx0TWVzc2lhRXh0XG5cdFx0XHRcdFx0XHRcdFx0LmxvYWRlcignaGlkZScsICcuY29tbWVudC1pdGVtcycpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCByZXBsYWNlID0gTWVzc2lhLnJlcGxhY2VIdG1sKG1hcFtpXVsnc291cmNlJ10sIG1hcFtpXVsndGFyZ2V0J10pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBsYWNlcy5wdXNoKHJlcGxhY2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRQcm9taXNlLmFsbFNldHRsZWQocmVwbGFjZXMpLnRoZW4oKHJlc3VsdHMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gLi4uY29kZVxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9hZGVyKCdoaWRlJywgJy5jb21tZW50LWl0ZW1zJyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlcGxhY2VIdG1sOiBmdW5jdGlvbiAoc291cmNlLCB0YXJnZXQpIHtcblxuXHRcdFx0XHR2YXIgZHVyID0gNjAwO1xuXHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KDApXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHRhcmdldC5jc3Moe1xuXHRcdFx0XHRcdFx0XHQndHJhbnNpdGlvbic6ICdhbGwgJyArIGR1ciArICdtcycsXG5cdFx0XHRcdFx0XHRcdCdmaWx0ZXInOiAnYmx1cigxMHB4KScsXG5cdFx0XHRcdFx0XHRcdCdvcGFjaXR5JzogJzAnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KGR1cik7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGFyZ2V0Lmh0bWwoc291cmNlLmh0bWwoKSk7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY3NzKHtcblx0XHRcdFx0XHRcdFx0J2ZpbHRlcic6ICdibHVyKDBweCknLFxuXHRcdFx0XHRcdFx0XHQnb3BhY2l0eSc6ICcxJyxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheShkdXIpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHRhcmdldC5yZW1vdmVBdHRyKCdzdHlsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KDApO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2RvbmUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRyZWZyZXNoVXJsOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsYXk6IGZ1bmN0aW9uIChtcykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShtcyk7XG5cdFx0XHRcdFx0fSwgbXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0JCgnLmNvbW1lbnQtaXRlbXMnKS5vbignY2xpY2snLCAnLmNvbW1lbnRzLW5hdi1saW5rcyAuY29tbWVudHMtbmV4dCBhJywgTWVzc2lhLnJld2luZENvbW1lbnRzKTtcblx0XHQkKCcuY29tbWVudC1pdGVtcycpLm9uKCdjbGljaycsICcuY29tbWVudHMtbmF2LWxpbmtzIC5jb21tZW50cy1wcmV2aW91cyBhJywgTWVzc2lhLnJld2luZENvbW1lbnRzKTtcblxuXHRcdE1lc3NpYS5zaG93Q29tbWVudFRhYigpO1xuXHRcdE1lc3NpYS5tYWtlVG9vbHRpcCgpO1xuXHR9KTtcbn0pKGpRdWVyeSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9TdHlsZVxuaW1wb3J0IFwiLi4vc2Nzcy9vYmplY3QvZGVmYXVsdC9vYmplY3Quc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi9qcy9vYmplY3QtZGVmYXVsdC5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
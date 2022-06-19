/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/single/single.scss":
/*!*************************************!*\
  !*** ./src/scss/single/single.scss ***!
  \*************************************/
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

/***/ "./src/js/single.js":
/*!**************************!*\
  !*** ./src/js/single.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components/_loader.js */ "./src/js/_components/_loader.js");
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_loader_js__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
	$(function () {
		var Messia = {
			smoothScroll: function (e) {
				if ('undefined' === typeof event.target.href || 0 === $(event.target.hash).length) {
					return;
				}
				event.preventDefault();
				MessiaExt.scrollTo($(e.target.hash).offset().top);
			},
			updatePost: function (e) {

				var target = $(this);
				var url = target.attr('href');

				if (url) {
					MessiaExt.loader('show', '.post');
					e.preventDefault();

					$.get(url)
						.done(function (data, textStatus, jqXHR) {

							var replaces = [];
							var post = $($.parseHTML(data));
							var map = [
								{
									'source': post.find('.col.content.post'),
									'target': $('main .col.content.post'),
								},
								{
									'source': post.nextAll('.header-title').find('.container'),
									'target': $('.header-title .container'),
								},
							];

							window.history.pushState({
								singleUrl: url,
							}, '', url);

							$(window).off('popstate', Messia.refreshUrl);
							$(window).one('popstate', Messia.refreshUrl);

							MessiaExt
								.loader('hide', '.post')
								.then((resolve) => {
									MessiaExt.scrollTo($('body').get(0).offsetTop);
									for (var i = 0; i < map.length; i++) {
										let replace = Messia.replaceHtml(map[i]['source'], map[i]['target']);
										replaces.push(replace);
									}

									Promise.allSettled(replaces).then((results) => {
										//...code
									});
								});
						})
						.fail(function () {
							MessiaExt.loader('hide', '.post');
						});
				}
			},
			replaceHtml: function (source, target) {

				var dur = 300;
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

		$('.col.content').on('click', 'nav[role="navigation"][data-smooth="true"] .pagination-single-inner .previous-post', Messia.updatePost);
		$('.col.content').on('click', 'nav[role="navigation"][data-smooth="true"] .pagination-single-inner .next-post', Messia.updatePost);
		$('body').on('click', '.characteristics-post .meta-data.comments a', Messia.smoothScroll);
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
/*!*************************************!*\
  !*** ./src/entries/entry-single.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_single_single_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/single/single.scss */ "./src/scss/single/single.scss");
/* harmony import */ var _js_single_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/single.js */ "./src/js/single.js");
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL3NpbmdsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQU0sYUFBYSxxQkFBTTtBQUN6QixxQkFBTTtBQUNOLElBQUkscUJBQU07QUFDVixNQUFNO0FBQ047Ozs7Ozs7Ozs7Ozs7O0FDM0NrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7Ozs7O1VDNUdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDb0M7O0FBRXBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3Mvc2luZ2xlL3NpbmdsZS5zY3NzP2U0MzEiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL3NpbmdsZS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvZW50cnktc2luZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQW5pbWF0ZWQgc3Bpbm5lci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hvd0hpZGUgU2hvdyBvciBoaWRlLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIEpRIGVsZW1lbnQgdG8gYXBwZW5kIGxvYWRlciB0by5cbiAqXG4gKiBAcmV0dXJuIFByb21pc2UuXG4gKi9cbmNvbnN0IGxvYWRlckZuID0gKHNob3dIaWRlLCBzZWxlY3RvcikgPT4ge1xuXHRjb25zdCAkID0galF1ZXJ5O1xuXG5cdGlmIChzaG93SGlkZSA9PT0gJ3Nob3cnKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKFxuXHRcdFx0cmVzb2x2ZSA9PiB7XG5cdFx0XHRcdGlmICgkKGAke3NlbGVjdG9yfSA+IC5tZXNzaWEtc3Bpbm5lcmApLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JChzZWxlY3RvcikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVzc2lhLXNwaW5uZXJcIj48ZGl2IGNsYXNzPVwibG9hZGluZ1wiPjxpPjwvaT48aT48L2k+PGk+PC9pPjxpPjwvaT48L2Rpdj48L2Rpdj4nKTtcblx0XHRcdFx0JCgnLm92ZXJsYXknKS5hZGRDbGFzcygnb3ZlcmxheS1zaG93Jyk7XG5cdFx0XHRcdHJlc29sdmUoJ2RvbmUnKTtcblx0XHRcdH1cblx0XHQpO1xuXG5cdH0gZWxzZSBpZiAoc2hvd0hpZGUgPT09ICdoaWRlJykge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKFxuXHRcdFx0cmVzb2x2ZSA9PiB7XG5cdFx0XHRcdCQoc2VsZWN0b3IpLmZpbmQoJy5tZXNzaWEtc3Bpbm5lcicpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHRcdH0sIDEwMCwgXCJzd2luZ1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmUoKTtcblx0XHRcdFx0XHQkKCcub3ZlcmxheScpLnJlbW92ZUNsYXNzKCdvdmVybGF5LXNob3cnKTtcblx0XHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cbn07XG5cbmdsb2JhbC5NZXNzaWFFeHQgPSBnbG9iYWwuTWVzc2lhRXh0IHx8IHt9O1xuZ2xvYmFsLk1lc3NpYUV4dCA9IHtcblx0Li4uZ2xvYmFsLk1lc3NpYUV4dCxcblx0Li4ueyBsb2FkZXI6IGxvYWRlckZuIH1cbn07IiwiaW1wb3J0ICcuL19jb21wb25lbnRzL19sb2FkZXIuanMnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIE1lc3NpYSA9IHtcblx0XHRcdHNtb290aFNjcm9sbDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgZXZlbnQudGFyZ2V0LmhyZWYgfHwgMCA9PT0gJChldmVudC50YXJnZXQuaGFzaCkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdE1lc3NpYUV4dC5zY3JvbGxUbygkKGUudGFyZ2V0Lmhhc2gpLm9mZnNldCgpLnRvcCk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlUG9zdDogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIHVybCA9IHRhcmdldC5hdHRyKCdocmVmJyk7XG5cblx0XHRcdFx0aWYgKHVybCkge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2FkZXIoJ3Nob3cnLCAnLnBvc3QnKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHQkLmdldCh1cmwpXG5cdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpIHtcblxuXHRcdFx0XHRcdFx0XHR2YXIgcmVwbGFjZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0dmFyIHBvc3QgPSAkKCQucGFyc2VIVE1MKGRhdGEpKTtcblx0XHRcdFx0XHRcdFx0dmFyIG1hcCA9IFtcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHQnc291cmNlJzogcG9zdC5maW5kKCcuY29sLmNvbnRlbnQucG9zdCcpLFxuXHRcdFx0XHRcdFx0XHRcdFx0J3RhcmdldCc6ICQoJ21haW4gLmNvbC5jb250ZW50LnBvc3QnKSxcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdCdzb3VyY2UnOiBwb3N0Lm5leHRBbGwoJy5oZWFkZXItdGl0bGUnKS5maW5kKCcuY29udGFpbmVyJyksXG5cdFx0XHRcdFx0XHRcdFx0XHQndGFyZ2V0JzogJCgnLmhlYWRlci10aXRsZSAuY29udGFpbmVyJyksXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRcdHNpbmdsZVVybDogdXJsLFxuXHRcdFx0XHRcdFx0XHR9LCAnJywgdXJsKTtcblxuXHRcdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIE1lc3NpYS5yZWZyZXNoVXJsKTtcblx0XHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgncG9wc3RhdGUnLCBNZXNzaWEucmVmcmVzaFVybCk7XG5cblx0XHRcdFx0XHRcdFx0TWVzc2lhRXh0XG5cdFx0XHRcdFx0XHRcdFx0LmxvYWRlcignaGlkZScsICcucG9zdCcpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdE1lc3NpYUV4dC5zY3JvbGxUbygkKCdib2R5JykuZ2V0KDApLm9mZnNldFRvcCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmVwbGFjZSA9IE1lc3NpYS5yZXBsYWNlSHRtbChtYXBbaV1bJ3NvdXJjZSddLCBtYXBbaV1bJ3RhcmdldCddKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwbGFjZXMucHVzaChyZXBsYWNlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0UHJvbWlzZS5hbGxTZXR0bGVkKHJlcGxhY2VzKS50aGVuKChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vLi4uY29kZVxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9hZGVyKCdoaWRlJywgJy5wb3N0Jyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlcGxhY2VIdG1sOiBmdW5jdGlvbiAoc291cmNlLCB0YXJnZXQpIHtcblxuXHRcdFx0XHR2YXIgZHVyID0gMzAwO1xuXHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KDApXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHRhcmdldC5jc3Moe1xuXHRcdFx0XHRcdFx0XHQndHJhbnNpdGlvbic6ICdhbGwgJyArIGR1ciArICdtcycsXG5cdFx0XHRcdFx0XHRcdCdmaWx0ZXInOiAnYmx1cigxMHB4KScsXG5cdFx0XHRcdFx0XHRcdCdvcGFjaXR5JzogJzAnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KGR1cik7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGFyZ2V0Lmh0bWwoc291cmNlLmh0bWwoKSk7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY3NzKHtcblx0XHRcdFx0XHRcdFx0J2ZpbHRlcic6ICdibHVyKDBweCknLFxuXHRcdFx0XHRcdFx0XHQnb3BhY2l0eSc6ICcxJyxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheShkdXIpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHRhcmdldC5yZW1vdmVBdHRyKCdzdHlsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KDApO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2RvbmUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRyZWZyZXNoVXJsOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsYXk6IGZ1bmN0aW9uIChtcykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShtcyk7XG5cdFx0XHRcdFx0fSwgbXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0JCgnLmNvbC5jb250ZW50Jykub24oJ2NsaWNrJywgJ25hdltyb2xlPVwibmF2aWdhdGlvblwiXVtkYXRhLXNtb290aD1cInRydWVcIl0gLnBhZ2luYXRpb24tc2luZ2xlLWlubmVyIC5wcmV2aW91cy1wb3N0JywgTWVzc2lhLnVwZGF0ZVBvc3QpO1xuXHRcdCQoJy5jb2wuY29udGVudCcpLm9uKCdjbGljaycsICduYXZbcm9sZT1cIm5hdmlnYXRpb25cIl1bZGF0YS1zbW9vdGg9XCJ0cnVlXCJdIC5wYWdpbmF0aW9uLXNpbmdsZS1pbm5lciAubmV4dC1wb3N0JywgTWVzc2lhLnVwZGF0ZVBvc3QpO1xuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLmNoYXJhY3RlcmlzdGljcy1wb3N0IC5tZXRhLWRhdGEuY29tbWVudHMgYScsIE1lc3NpYS5zbW9vdGhTY3JvbGwpO1xuXHR9KTtcblxufSkoalF1ZXJ5KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uL3Njc3Mvc2luZ2xlL3NpbmdsZS5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uL2pzL3NpbmdsZS5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
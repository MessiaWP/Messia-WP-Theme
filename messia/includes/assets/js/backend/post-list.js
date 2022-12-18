/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/post-list.scss":
/*!******************************************!*\
  !*** ./src/scss/_backend/post-list.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/post-list.js":
/*!**************************************!*\
  !*** ./src/js/_backend/post-list.js ***!
  \**************************************/
/***/ (function() {

(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			xhr: null,
			setSiteRating: function (e) {
				$(this).addClass('set');
				$('<span class="dashicons dashicons-admin-generic"></span>').insertAfter($(this));
				Messia.doAjax($(this), 'object_site_rating_get', { 'post_id': $(this).data('id') });
			},
			doAjax: function (caller, action, data) {

				Messia.xhr = $.ajax({
					type: 'POST',
					url: messiaVars.ajaxUrl,
					data: {
						action: action,
						messiaNonce: messiaVars.messiaNonce,
						data: {
							AJAX_Marker: messiaVars.AJAX_Marker,
							data: data,
						},
					},
					beforeSend: function () {

						if (Messia.xhr != null) {
							Messia.xhr.abort();
							Messia.xhr = null;
						}
					},
					success: function (server) {
						if (action === 'object_site_rating_get') {
							if (server.data.code !== 200) {
								$.fn.messiaModalWarning(server.data.dialogTitle, server.data.dialogHtml);
								caller.removeClass('set').next('.dashicons').remove();
							}
							else {
								var editSiteRating = $.fn.messiaModalWarning(server.data.dialogTitle, server.data.dialogHtml, []);
								editSiteRating.element.one('dialogClosed', { 'caller': caller }, Messia.editedSiteRating);
							}
						}
						if (action === 'object_site_rating_set') {
							caller.html(server.data.site_rating).removeClass('set').next('.dashicons').remove();
						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (Messia.xhr.status === 0 && Messia.xhr.statusText == 'abort') {
							$(event.target).removeClass('calculating');
							return;
						}
					}
				});
			},
			focusCriteriaValue: function (e) {
				$(this).data('prevVal', $(this).val());
			},
			changeCriteriaValue: function (e) {

				var value = $(this).val();

				if (value == '') {
					Messia.calcSegmentSiteRating($(this));
					return;
				}
				else {
					var min = parseFloat($(this).attr('min'));
					var max = parseFloat($(this).attr('max'));
					value = parseFloat(value);
				}

				if (isNaN(value)) {
					$(this).val($(this).data('prevVal'));
				}
				else if ((value < min || value > max)) {
					$(this).val($(this).data('prevVal'));
				}
				else {
					$(this).val(Math.round(value * 100) / 100);
				}

				Messia.calcSegmentSiteRating($(this));

			},
			calcSegmentSiteRating: function (target) {

				var summ = 0;
				var amount = 0;
				var table = target.parents('#site-rating-setting');
				var termId = target.data('termId');
				var values = table.find('.criteria.data input[data-term-id="' + termId + '"]');
				var average = table.find('.criteria.average-values td[data-term-id="' + termId + '"]');

				for (var i = 0; i < values.length; i++) {

					var value = $(values[i]).val();

					if (value != '') {

						amount++;
						summ = summ + parseFloat(value);
					}
				}
				if (amount === 0) {
					average.text('X');
				}
				else {
					var sr = summ / amount;
					average.text((Math.round(sr * 100) / 100).toFixed(2));
				}
			},
			editedSiteRating: function (event, action) {
				if (action === 'ok') {

					var to_save = {
						'criterias': {},
						'avg': {},
						'post_id': event.data.caller.data('id'),
					};

					var rating = $(event.target).find('.criteria.data input[data-term-id]');
					var avg = $(event.target).find('.criteria.average-values td[data-term-id]');

					for (var i = 0; i < rating.length; i++) {
						if (typeof to_save['criterias'][$(rating[i]).data('termId')] === 'undefined') {
							to_save['criterias'][$(rating[i]).data('termId')] = {};
						}
						to_save['criterias'][$(rating[i]).data('termId')][$(rating[i]).attr('name')] = $(rating[i]).val();
					}

					for (var q = 0; q < avg.length; q++) {
						if (typeof to_save['avg'][$(avg[i]).data('termId')] === 'undefined') {
							to_save['avg'][$(avg[q]).data('termId')] = {};
						}
						to_save['avg'][$(avg[q]).data('termId')] = $(avg[q]).text();
					}
					Messia.doAjax(event.data.caller, 'object_site_rating_set', { 'to_save': to_save });
				}
				else {
					event.data.caller.removeClass('set').next('.dashicons').remove();
				}
			}
		}

		$('.column-messia_site_rating span.set_site_rating').on('click', Messia.setSiteRating);
		$('#messia_modal_warning').on('input', '#site-rating-setting .criteria.data .value', Messia.changeCriteriaValue);
		$('#messia_modal_warning').on('focus', '#site-rating-setting .criteria.data .value', Messia.focusCriteriaValue);

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
/*!************************************************!*\
  !*** ./src/entries/backend/entry-post-list.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_post_list_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/post-list.scss */ "./src/scss/_backend/post-list.scss");
/* harmony import */ var _js_backend_post_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/post-list.js */ "./src/js/_backend/post-list.js");
/* harmony import */ var _js_backend_post_list_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_post_list_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvcG9zdC1saXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELCtCQUErQjtBQUN0RixJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGtCQUFrQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7O0FBRXZDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0Usb0JBQW9CO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGLENBQUM7Ozs7OztVQ3pKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUM0Qzs7QUFFNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9fYmFja2VuZC9wb3N0LWxpc3Quc2Nzcz9kODI4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fYmFja2VuZC9wb3N0LWxpc3QuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2JhY2tlbmQvZW50cnktcG9zdC1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIihmdW5jdGlvbiAoJCkge1xuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdHZhciBNZXNzaWE7XG5cblx0XHRNZXNzaWEgPSB7XG5cdFx0XHR4aHI6IG51bGwsXG5cdFx0XHRzZXRTaXRlUmF0aW5nOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdzZXQnKTtcblx0XHRcdFx0JCgnPHNwYW4gY2xhc3M9XCJkYXNoaWNvbnMgZGFzaGljb25zLWFkbWluLWdlbmVyaWNcIj48L3NwYW4+JykuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSk7XG5cdFx0XHRcdE1lc3NpYS5kb0FqYXgoJCh0aGlzKSwgJ29iamVjdF9zaXRlX3JhdGluZ19nZXQnLCB7ICdwb3N0X2lkJzogJCh0aGlzKS5kYXRhKCdpZCcpIH0pO1xuXHRcdFx0fSxcblx0XHRcdGRvQWpheDogZnVuY3Rpb24gKGNhbGxlciwgYWN0aW9uLCBkYXRhKSB7XG5cblx0XHRcdFx0TWVzc2lhLnhociA9ICQuYWpheCh7XG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdHVybDogbWVzc2lhVmFycy5hamF4VXJsLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxuXHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IG1lc3NpYVZhcnMubWVzc2lhTm9uY2UsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdEFKQVhfTWFya2VyOiBtZXNzaWFWYXJzLkFKQVhfTWFya2VyLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0aWYgKE1lc3NpYS54aHIgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWEueGhyLmFib3J0KCk7XG5cdFx0XHRcdFx0XHRcdE1lc3NpYS54aHIgPSBudWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0aWYgKGFjdGlvbiA9PT0gJ29iamVjdF9zaXRlX3JhdGluZ19nZXQnKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlICE9PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0XHQkLmZuLm1lc3NpYU1vZGFsV2FybmluZyhzZXJ2ZXIuZGF0YS5kaWFsb2dUaXRsZSwgc2VydmVyLmRhdGEuZGlhbG9nSHRtbCk7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGVyLnJlbW92ZUNsYXNzKCdzZXQnKS5uZXh0KCcuZGFzaGljb25zJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVkaXRTaXRlUmF0aW5nID0gJC5mbi5tZXNzaWFNb2RhbFdhcm5pbmcoc2VydmVyLmRhdGEuZGlhbG9nVGl0bGUsIHNlcnZlci5kYXRhLmRpYWxvZ0h0bWwsIFtdKTtcblx0XHRcdFx0XHRcdFx0XHRlZGl0U2l0ZVJhdGluZy5lbGVtZW50Lm9uZSgnZGlhbG9nQ2xvc2VkJywgeyAnY2FsbGVyJzogY2FsbGVyIH0sIE1lc3NpYS5lZGl0ZWRTaXRlUmF0aW5nKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGFjdGlvbiA9PT0gJ29iamVjdF9zaXRlX3JhdGluZ19zZXQnKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxlci5odG1sKHNlcnZlci5kYXRhLnNpdGVfcmF0aW5nKS5yZW1vdmVDbGFzcygnc2V0JykubmV4dCgnLmRhc2hpY29ucycpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXG5cdFx0XHRcdFx0XHRpZiAoTWVzc2lhLnhoci5zdGF0dXMgPT09IDAgJiYgTWVzc2lhLnhoci5zdGF0dXNUZXh0ID09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdFx0JChldmVudC50YXJnZXQpLnJlbW92ZUNsYXNzKCdjYWxjdWxhdGluZycpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRmb2N1c0NyaXRlcmlhVmFsdWU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCQodGhpcykuZGF0YSgncHJldlZhbCcsICQodGhpcykudmFsKCkpO1xuXHRcdFx0fSxcblx0XHRcdGNoYW5nZUNyaXRlcmlhVmFsdWU6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT0gJycpIHtcblx0XHRcdFx0XHRNZXNzaWEuY2FsY1NlZ21lbnRTaXRlUmF0aW5nKCQodGhpcykpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2YXIgbWluID0gcGFyc2VGbG9hdCgkKHRoaXMpLmF0dHIoJ21pbicpKTtcblx0XHRcdFx0XHR2YXIgbWF4ID0gcGFyc2VGbG9hdCgkKHRoaXMpLmF0dHIoJ21heCcpKTtcblx0XHRcdFx0XHR2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzTmFOKHZhbHVlKSkge1xuXHRcdFx0XHRcdCQodGhpcykudmFsKCQodGhpcykuZGF0YSgncHJldlZhbCcpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICgodmFsdWUgPCBtaW4gfHwgdmFsdWUgPiBtYXgpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS52YWwoJCh0aGlzKS5kYXRhKCdwcmV2VmFsJykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykudmFsKE1hdGgucm91bmQodmFsdWUgKiAxMDApIC8gMTAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdE1lc3NpYS5jYWxjU2VnbWVudFNpdGVSYXRpbmcoJCh0aGlzKSk7XG5cblx0XHRcdH0sXG5cdFx0XHRjYWxjU2VnbWVudFNpdGVSYXRpbmc6IGZ1bmN0aW9uICh0YXJnZXQpIHtcblxuXHRcdFx0XHR2YXIgc3VtbSA9IDA7XG5cdFx0XHRcdHZhciBhbW91bnQgPSAwO1xuXHRcdFx0XHR2YXIgdGFibGUgPSB0YXJnZXQucGFyZW50cygnI3NpdGUtcmF0aW5nLXNldHRpbmcnKTtcblx0XHRcdFx0dmFyIHRlcm1JZCA9IHRhcmdldC5kYXRhKCd0ZXJtSWQnKTtcblx0XHRcdFx0dmFyIHZhbHVlcyA9IHRhYmxlLmZpbmQoJy5jcml0ZXJpYS5kYXRhIGlucHV0W2RhdGEtdGVybS1pZD1cIicgKyB0ZXJtSWQgKyAnXCJdJyk7XG5cdFx0XHRcdHZhciBhdmVyYWdlID0gdGFibGUuZmluZCgnLmNyaXRlcmlhLmF2ZXJhZ2UtdmFsdWVzIHRkW2RhdGEtdGVybS1pZD1cIicgKyB0ZXJtSWQgKyAnXCJdJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdHZhciB2YWx1ZSA9ICQodmFsdWVzW2ldKS52YWwoKTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSAhPSAnJykge1xuXG5cdFx0XHRcdFx0XHRhbW91bnQrKztcblx0XHRcdFx0XHRcdHN1bW0gPSBzdW1tICsgcGFyc2VGbG9hdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChhbW91bnQgPT09IDApIHtcblx0XHRcdFx0XHRhdmVyYWdlLnRleHQoJ1gnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2YXIgc3IgPSBzdW1tIC8gYW1vdW50O1xuXHRcdFx0XHRcdGF2ZXJhZ2UudGV4dCgoTWF0aC5yb3VuZChzciAqIDEwMCkgLyAxMDApLnRvRml4ZWQoMikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZWRpdGVkU2l0ZVJhdGluZzogZnVuY3Rpb24gKGV2ZW50LCBhY3Rpb24pIHtcblx0XHRcdFx0aWYgKGFjdGlvbiA9PT0gJ29rJykge1xuXG5cdFx0XHRcdFx0dmFyIHRvX3NhdmUgPSB7XG5cdFx0XHRcdFx0XHQnY3JpdGVyaWFzJzoge30sXG5cdFx0XHRcdFx0XHQnYXZnJzoge30sXG5cdFx0XHRcdFx0XHQncG9zdF9pZCc6IGV2ZW50LmRhdGEuY2FsbGVyLmRhdGEoJ2lkJyksXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHZhciByYXRpbmcgPSAkKGV2ZW50LnRhcmdldCkuZmluZCgnLmNyaXRlcmlhLmRhdGEgaW5wdXRbZGF0YS10ZXJtLWlkXScpO1xuXHRcdFx0XHRcdHZhciBhdmcgPSAkKGV2ZW50LnRhcmdldCkuZmluZCgnLmNyaXRlcmlhLmF2ZXJhZ2UtdmFsdWVzIHRkW2RhdGEtdGVybS1pZF0nKTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmF0aW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRvX3NhdmVbJ2NyaXRlcmlhcyddWyQocmF0aW5nW2ldKS5kYXRhKCd0ZXJtSWQnKV0gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdHRvX3NhdmVbJ2NyaXRlcmlhcyddWyQocmF0aW5nW2ldKS5kYXRhKCd0ZXJtSWQnKV0gPSB7fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRvX3NhdmVbJ2NyaXRlcmlhcyddWyQocmF0aW5nW2ldKS5kYXRhKCd0ZXJtSWQnKV1bJChyYXRpbmdbaV0pLmF0dHIoJ25hbWUnKV0gPSAkKHJhdGluZ1tpXSkudmFsKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yICh2YXIgcSA9IDA7IHEgPCBhdmcubGVuZ3RoOyBxKyspIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdG9fc2F2ZVsnYXZnJ11bJChhdmdbaV0pLmRhdGEoJ3Rlcm1JZCcpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0dG9fc2F2ZVsnYXZnJ11bJChhdmdbcV0pLmRhdGEoJ3Rlcm1JZCcpXSA9IHt9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dG9fc2F2ZVsnYXZnJ11bJChhdmdbcV0pLmRhdGEoJ3Rlcm1JZCcpXSA9ICQoYXZnW3FdKS50ZXh0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdE1lc3NpYS5kb0FqYXgoZXZlbnQuZGF0YS5jYWxsZXIsICdvYmplY3Rfc2l0ZV9yYXRpbmdfc2V0JywgeyAndG9fc2F2ZSc6IHRvX3NhdmUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YS5jYWxsZXIucmVtb3ZlQ2xhc3MoJ3NldCcpLm5leHQoJy5kYXNoaWNvbnMnKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoJy5jb2x1bW4tbWVzc2lhX3NpdGVfcmF0aW5nIHNwYW4uc2V0X3NpdGVfcmF0aW5nJykub24oJ2NsaWNrJywgTWVzc2lhLnNldFNpdGVSYXRpbmcpO1xuXHRcdCQoJyNtZXNzaWFfbW9kYWxfd2FybmluZycpLm9uKCdpbnB1dCcsICcjc2l0ZS1yYXRpbmctc2V0dGluZyAuY3JpdGVyaWEuZGF0YSAudmFsdWUnLCBNZXNzaWEuY2hhbmdlQ3JpdGVyaWFWYWx1ZSk7XG5cdFx0JCgnI21lc3NpYV9tb2RhbF93YXJuaW5nJykub24oJ2ZvY3VzJywgJyNzaXRlLXJhdGluZy1zZXR0aW5nIC5jcml0ZXJpYS5kYXRhIC52YWx1ZScsIE1lc3NpYS5mb2N1c0NyaXRlcmlhVmFsdWUpO1xuXG5cdH0pO1xufSkoalF1ZXJ5KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVcbmltcG9ydCBcIi4uLy4uL3Njc3MvX2JhY2tlbmQvcG9zdC1saXN0LnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvX2JhY2tlbmQvcG9zdC1saXN0LmpzXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
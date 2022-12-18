/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_backend/widgets-tabs-panel.js":
/*!***********************************************!*\
  !*** ./src/js/_backend/widgets-tabs-panel.js ***!
  \***********************************************/
/***/ (function() {

(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			sibebarSortableObject: $('.messia-widget-tabs-panel .tab-fields'),
			sortableConfig: {
				revert: true,
				forceHelperSize: true,
				forcePlaceholderSize: true,
				opacity: 0.5,
				distance: 10,
				tolerance: 'intersect',
				scroll: false,
				containment: 'parent',
				placeholder: 'sortable-placeholder',
				beforeStop: function (event, ui) {
					ui.helper.css({
						'height': '',
						'width': '',
					});
				},
				stop: function (event, ui) {
					var target = $(event.target);

					ui.item.css('opacity', '');
					target.parents('.widget-inside').triggerHandler('change');
				},
			},
			makeNewWidgetSortable: function (event) {
				var sortable = $(event.target).find('.tab-fields').sortable(Messia.sortableConfig);

				Messia.toggleSortable(sortable);
			},
			toggleTab: function (event) {

				var tab = $(this).parents('.tab');

				tab.find('.content').toggle('blind', {
					direction: 'up',
					duration: 300
				});

				if (tab.hasClass('collapsed')) {
					tab.removeClass('collapsed').addClass('expanded');
				}
				else {
					tab.removeClass('expanded').addClass('collapsed');
				}
			},
			setActivity: function (event) {
				if ($(this).is(':checked')) {
					$(this).parents('.tab').removeClass('inactive').addClass('active');
				}
				else {
					$(this).parents('.tab').removeClass('active').addClass('inactive');
				}
			},
			createTab: function (event) {

				var template = $(this).nextAll('#tab-template').clone().removeAttr('id').addClass('tab inactive').css('display', 'none');
				var target = $(this).nextAll('.tab-fields');

				target.prepend(template).children(':first').show('highlight', {
					duration: 700
				}, function () {
					$(this).find('.title').focus();
				});

				$(this).parents('.widget-inside').triggerHandler('change');
			},
			removeTab: function (event) {

				var tab_fields = $(this).parents('.tab-fields');

				$(this).parents('.tab').hide('highlight', {
					duration: 200
				}, function () {
					$(this).parents('.widget-inside').triggerHandler('change');
					$(this).remove();
				});
			},
			sortModeToggle: function (event) {

				var sortable = $(this).nextAll('.tab-fields').toggleClass('sort-mode-active');

				$(this).toggleClass('active');
				Messia.toggleSortable(sortable);
			},
			toggleSortable: function (sortable) {

				if (sortable.hasClass('sort-mode-active')) {
					sortable.sortable('enable');
				}
				else {
					sortable.sortable('disable');
				}
			},
			save: function (event) {

				event.preventDefault();
				var forms = $(this).parents('form').find('.messia-widget-tabs-panel .tab-fields');

				for (var f = 0; f < forms.length; f++) {

					var toSave = [];
					var tabs = $(forms[f]).find('.tab');

					for (var i = 0; i < tabs.length; i++) {

						var tab = $(tabs[i]);
						toSave.push({
							'title': tab.find('.header .title').text(),
							'content': tab.find('.content textarea.tab-content').val(),
							'active': tab.hasClass('active'),
						});
					}
					$(forms[f]).next('.data').val(JSON.stringify(toSave));
				}
				$(this).triggerHandler('click');
			}
		}

		$('.widget-liquid-right').on('click', '.messia-widget-tabs-panel input[type="checkbox"]', Messia.setActivity);
		$('.widget-liquid-right').on('click', '.messia-widget-tabs-panel #new-tab', Messia.createTab);
		$('.widget-liquid-right').on('click', '.messia-widget-tabs-panel #sort-mode', Messia.sortModeToggle);
		$('.widget-liquid-right').on('click', '.messia-widget-tabs-panel .toggle-tab', Messia.toggleTab);
		$('.widget-liquid-right').on('click', '.messia-widget-tabs-panel .remove-tab', Messia.removeTab);
		$('.widget-liquid-right').on('click', '[id*="messia_widget_tabs_panel"] input[name="savewidget"]', Messia.save);
		$('.widget-liquid-right').on('DOMNodeInserted', '.widget', Messia.makeNewWidgetSortable);

		Messia.sibebarSortableObject.sortable(Messia.sortableConfig);
		Messia.toggleSortable(Messia.sibebarSortableObject);

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
/*!*********************************************************!*\
  !*** ./src/entries/backend/entry-widgets-tabs-panel.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_backend_widgets_tabs_panel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/_backend/widgets-tabs-panel.js */ "./src/js/_backend/widgets-tabs-panel.js");
/* harmony import */ var _js_backend_widgets_tabs_panel_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_backend_widgets_tabs_panel_js__WEBPACK_IMPORTED_MODULE_0__);
// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvd2lkZ2V0cy10YWJzLXBhbmVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0Isa0JBQWtCOztBQUV0QztBQUNBOztBQUVBLHFCQUFxQixpQkFBaUI7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGLENBQUM7Ozs7OztVQzFJRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL3dpZGdldHMtdGFicy1wYW5lbC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9lbnRyeS13aWRnZXRzLXRhYnMtcGFuZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0dmFyIE1lc3NpYTtcblxuXHRcdE1lc3NpYSA9IHtcblx0XHRcdHNpYmViYXJTb3J0YWJsZU9iamVjdDogJCgnLm1lc3NpYS13aWRnZXQtdGFicy1wYW5lbCAudGFiLWZpZWxkcycpLFxuXHRcdFx0c29ydGFibGVDb25maWc6IHtcblx0XHRcdFx0cmV2ZXJ0OiB0cnVlLFxuXHRcdFx0XHRmb3JjZUhlbHBlclNpemU6IHRydWUsXG5cdFx0XHRcdGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRvcGFjaXR5OiAwLjUsXG5cdFx0XHRcdGRpc3RhbmNlOiAxMCxcblx0XHRcdFx0dG9sZXJhbmNlOiAnaW50ZXJzZWN0Jyxcblx0XHRcdFx0c2Nyb2xsOiBmYWxzZSxcblx0XHRcdFx0Y29udGFpbm1lbnQ6ICdwYXJlbnQnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ3NvcnRhYmxlLXBsYWNlaG9sZGVyJyxcblx0XHRcdFx0YmVmb3JlU3RvcDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRcdHVpLmhlbHBlci5jc3Moe1xuXHRcdFx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3A6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuXG5cdFx0XHRcdFx0dWkuaXRlbS5jc3MoJ29wYWNpdHknLCAnJyk7XG5cdFx0XHRcdFx0dGFyZ2V0LnBhcmVudHMoJy53aWRnZXQtaW5zaWRlJykudHJpZ2dlckhhbmRsZXIoJ2NoYW5nZScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdG1ha2VOZXdXaWRnZXRTb3J0YWJsZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBzb3J0YWJsZSA9ICQoZXZlbnQudGFyZ2V0KS5maW5kKCcudGFiLWZpZWxkcycpLnNvcnRhYmxlKE1lc3NpYS5zb3J0YWJsZUNvbmZpZyk7XG5cblx0XHRcdFx0TWVzc2lhLnRvZ2dsZVNvcnRhYmxlKHNvcnRhYmxlKTtcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVUYWI6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdHZhciB0YWIgPSAkKHRoaXMpLnBhcmVudHMoJy50YWInKTtcblxuXHRcdFx0XHR0YWIuZmluZCgnLmNvbnRlbnQnKS50b2dnbGUoJ2JsaW5kJywge1xuXHRcdFx0XHRcdGRpcmVjdGlvbjogJ3VwJyxcblx0XHRcdFx0XHRkdXJhdGlvbjogMzAwXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICh0YWIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0dGFiLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0YWIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2V0QWN0aXZpdHk6IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50cygnLnRhYicpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy50YWInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcmVhdGVUYWI6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdHZhciB0ZW1wbGF0ZSA9ICQodGhpcykubmV4dEFsbCgnI3RhYi10ZW1wbGF0ZScpLmNsb25lKCkucmVtb3ZlQXR0cignaWQnKS5hZGRDbGFzcygndGFiIGluYWN0aXZlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0dmFyIHRhcmdldCA9ICQodGhpcykubmV4dEFsbCgnLnRhYi1maWVsZHMnKTtcblxuXHRcdFx0XHR0YXJnZXQucHJlcGVuZCh0ZW1wbGF0ZSkuY2hpbGRyZW4oJzpmaXJzdCcpLnNob3coJ2hpZ2hsaWdodCcsIHtcblx0XHRcdFx0XHRkdXJhdGlvbjogNzAwXG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy50aXRsZScpLmZvY3VzKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQodGhpcykucGFyZW50cygnLndpZGdldC1pbnNpZGUnKS50cmlnZ2VySGFuZGxlcignY2hhbmdlJyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlVGFiOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHR2YXIgdGFiX2ZpZWxkcyA9ICQodGhpcykucGFyZW50cygnLnRhYi1maWVsZHMnKTtcblxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy50YWInKS5oaWRlKCdoaWdobGlnaHQnLCB7XG5cdFx0XHRcdFx0ZHVyYXRpb246IDIwMFxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcud2lkZ2V0LWluc2lkZScpLnRyaWdnZXJIYW5kbGVyKCdjaGFuZ2UnKTtcblx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRzb3J0TW9kZVRvZ2dsZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0dmFyIHNvcnRhYmxlID0gJCh0aGlzKS5uZXh0QWxsKCcudGFiLWZpZWxkcycpLnRvZ2dsZUNsYXNzKCdzb3J0LW1vZGUtYWN0aXZlJyk7XG5cblx0XHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdE1lc3NpYS50b2dnbGVTb3J0YWJsZShzb3J0YWJsZSk7XG5cdFx0XHR9LFxuXHRcdFx0dG9nZ2xlU29ydGFibGU6IGZ1bmN0aW9uIChzb3J0YWJsZSkge1xuXG5cdFx0XHRcdGlmIChzb3J0YWJsZS5oYXNDbGFzcygnc29ydC1tb2RlLWFjdGl2ZScpKSB7XG5cdFx0XHRcdFx0c29ydGFibGUuc29ydGFibGUoJ2VuYWJsZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHNvcnRhYmxlLnNvcnRhYmxlKCdkaXNhYmxlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzYXZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgZm9ybXMgPSAkKHRoaXMpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcubWVzc2lhLXdpZGdldC10YWJzLXBhbmVsIC50YWItZmllbGRzJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgZiA9IDA7IGYgPCBmb3Jtcy5sZW5ndGg7IGYrKykge1xuXG5cdFx0XHRcdFx0dmFyIHRvU2F2ZSA9IFtdO1xuXHRcdFx0XHRcdHZhciB0YWJzID0gJChmb3Jtc1tmXSkuZmluZCgnLnRhYicpO1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRcdHZhciB0YWIgPSAkKHRhYnNbaV0pO1xuXHRcdFx0XHRcdFx0dG9TYXZlLnB1c2goe1xuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiB0YWIuZmluZCgnLmhlYWRlciAudGl0bGUnKS50ZXh0KCksXG5cdFx0XHRcdFx0XHRcdCdjb250ZW50JzogdGFiLmZpbmQoJy5jb250ZW50IHRleHRhcmVhLnRhYi1jb250ZW50JykudmFsKCksXG5cdFx0XHRcdFx0XHRcdCdhY3RpdmUnOiB0YWIuaGFzQ2xhc3MoJ2FjdGl2ZScpLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQoZm9ybXNbZl0pLm5leHQoJy5kYXRhJykudmFsKEpTT04uc3RyaW5naWZ5KHRvU2F2ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQodGhpcykudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JCgnLndpZGdldC1saXF1aWQtcmlnaHQnKS5vbignY2xpY2snLCAnLm1lc3NpYS13aWRnZXQtdGFicy1wYW5lbCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCBNZXNzaWEuc2V0QWN0aXZpdHkpO1xuXHRcdCQoJy53aWRnZXQtbGlxdWlkLXJpZ2h0Jykub24oJ2NsaWNrJywgJy5tZXNzaWEtd2lkZ2V0LXRhYnMtcGFuZWwgI25ldy10YWInLCBNZXNzaWEuY3JlYXRlVGFiKTtcblx0XHQkKCcud2lkZ2V0LWxpcXVpZC1yaWdodCcpLm9uKCdjbGljaycsICcubWVzc2lhLXdpZGdldC10YWJzLXBhbmVsICNzb3J0LW1vZGUnLCBNZXNzaWEuc29ydE1vZGVUb2dnbGUpO1xuXHRcdCQoJy53aWRnZXQtbGlxdWlkLXJpZ2h0Jykub24oJ2NsaWNrJywgJy5tZXNzaWEtd2lkZ2V0LXRhYnMtcGFuZWwgLnRvZ2dsZS10YWInLCBNZXNzaWEudG9nZ2xlVGFiKTtcblx0XHQkKCcud2lkZ2V0LWxpcXVpZC1yaWdodCcpLm9uKCdjbGljaycsICcubWVzc2lhLXdpZGdldC10YWJzLXBhbmVsIC5yZW1vdmUtdGFiJywgTWVzc2lhLnJlbW92ZVRhYik7XG5cdFx0JCgnLndpZGdldC1saXF1aWQtcmlnaHQnKS5vbignY2xpY2snLCAnW2lkKj1cIm1lc3NpYV93aWRnZXRfdGFic19wYW5lbFwiXSBpbnB1dFtuYW1lPVwic2F2ZXdpZGdldFwiXScsIE1lc3NpYS5zYXZlKTtcblx0XHQkKCcud2lkZ2V0LWxpcXVpZC1yaWdodCcpLm9uKCdET01Ob2RlSW5zZXJ0ZWQnLCAnLndpZGdldCcsIE1lc3NpYS5tYWtlTmV3V2lkZ2V0U29ydGFibGUpO1xuXG5cdFx0TWVzc2lhLnNpYmViYXJTb3J0YWJsZU9iamVjdC5zb3J0YWJsZShNZXNzaWEuc29ydGFibGVDb25maWcpO1xuXHRcdE1lc3NpYS50b2dnbGVTb3J0YWJsZShNZXNzaWEuc2liZWJhclNvcnRhYmxlT2JqZWN0KTtcblxuXHR9KTtcbn0pKGpRdWVyeSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL19iYWNrZW5kL3dpZGdldHMtdGFicy1wYW5lbC5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/term-edit.scss":
/*!******************************************!*\
  !*** ./src/scss/_backend/term-edit.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/term-edit.js":
/*!**************************************!*\
  !*** ./src/js/_backend/term-edit.js ***!
  \**************************************/
/***/ (function() {

(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			select2Multiple: '',
			select2Async: '',
			selectTermMedia: function (event) {
				$(this).messiaMediaSelector(Messia.imageSelectedTermThumbnail);
			},
			selectConstructorMedia: function () {
				$(this).messiaMediaSelector(Messia.imageSelectedConstructor);
			},
			imageSelectedTermThumbnail: function (caller, selection) {
				$.fn.messiaAppendMediaSelection(caller, selection);

				var images = [];
				var icons = caller.parent().find('.icon');
				var dataGetter = caller.parents('.term_thumbnail, .term_icon').find('input[type="hidden"]');

				for (var i = 0; i < icons.length; i++) {
					if ($(icons[i]).find('.placeholder-image').length === 0) {
						images.push($(icons[i]).data('imageinfo'));
					}
				}
				let imageSet = images.filter(image => {
					delete image.url;
					return image;
				});
				dataGetter.val(JSON.stringify(imageSet));
			},
			imageSelectedConstructor: function (caller, selection) {
				$.fn.messiaAppendMediaSelection(caller, selection);

				var images = [];
				var icons = caller.parent().find('.icon');
				var dataGetter = caller.parents('.titles-wrapper').find('[m-name="icon"]');

				for (var i = 0; i < icons.length; i++) {
					if ($(icons[i]).find('.placeholder-image').length === 0) {
						images.push($(icons[i]).data('imageinfo'));
					}
				}
				let imageSet = images.filter(image => {
					delete image.url;
					return image;
				});
				dataGetter.val(JSON.stringify(imageSet));
				Messia.setDirty();
			},
			removeTermMedia: function (event) {

				event.stopPropagation();
				$(this).removeClass('remove-image').addClass('placeholder-image').parent().removeAttr('id').find('.image').remove();
				$(this).parents('.form-field.messia.term_icon, .form-field.messia.term_thumbnail').find('input[type="hidden"][name="term_icon"], input[type="hidden"][name="term_thumbnail"]').val('');
			},
			removeConstructorMedia: function (event) {

				event.stopPropagation();
				$(this).removeClass('remove-image').addClass('placeholder-image').parent().removeAttr('id').find('.image').remove();
				$(this).parents('.titles-wrapper').find('[m-name="icon"]').val('');
			},
			closeAdd: function (target) {
				target.find('.field-title').append('<span class="remove"></span>');
			},
			deleteSlot: function (e) {
				$(e.target).parents('.constructor-field').animate({
					opacity: 0,
				}, 400, function () {
					$(this).remove();
				});
			},
			showSlotSettings: function (ui) {
				var settings = ui.item.find('.settings');

				if (ui.item.data('visible') === true) {
					return;
				};
				if (settings.children().length === 0) {
					return;
				}

				const targets = settings.find('input, select');

				for (let i = 0; i < targets.length; i++) {
					const
						input = $(targets[i]),
						input_id = input.attr('id'),
						input_name = input.attr('name'),
						labels = settings.find(`label[for="${input_id}"]`),
						inputs = settings.find(`input[name="${input_name}"]`),
						name_rnd = Math.random().toString(36).substring(2).split('.')[0],
						id_rnd = Math.random().toString(36).substring(2).split('.')[0];

					input.attr('id', id_rnd);
					labels.attr('for', id_rnd);
					inputs.attr('name', name_rnd);
				}

				if (settings.css('display') != 'none') {
					return;
				}

				var w_from = ui.item.outerWidth();

				ui.item.css({
					'height': '',
					'width': '',
				}).find('.field-title').append('<span class="remove"></span>');

				var w_to = ui.item.outerWidth();

				ui.item.css({
					'width': w_from,
				});

				//Card div
				ui.item.animate({
					width: w_to + 'px',
				}, 200, function () {
					$(this).css({
						'width': '',
					});

					settings.css('display', 'block');
					var h = settings.outerHeight();
					var w = settings.outerWidth();
					settings.css({
						'height': 0,
						'width': 0,
					});
					settings.animate(
						{
							height: h + 'px',
							width: w + 'px',
						},
						{
							duration: 400,
							start: Messia.adjustIcon.call($(this)),
							complete: function () {
								$(this).css({
									'height': '',
									'width': '',
								});
								ui.item.data('visible', true);
							},
						}
					);
				});
			},
			adjustIcon: function (object) {
				var fileds_title = $(this).find('.titles-wrapper [m-name="title"]');
				var fileds_slug = $(this).find('.titles-wrapper [m-name="slug"]');
				var icon = $(this).find('.titles-wrapper .icon');

				var fileds_height = fileds_title.outerHeight() + parseInt(fileds_title.css('margin-top')) + parseInt(fileds_title.css('margin-bottom')) +
					fileds_slug.outerHeight() + parseInt(fileds_slug.css('margin-top')) + parseInt(fileds_slug.css('margin-bottom'));
				var icon_height = fileds_height -
					parseInt(icon.css('padding-top')) -
					parseInt(icon.css('padding-bottom')) -
					parseInt(icon.css('margin-top')) -
					parseInt(icon.css('margin-bottom')) -
					parseInt(icon.css('border-top-width')) -
					parseInt(icon.css('border-bottom-width'));

				icon.css('width', icon_height);
				icon.css('height', icon_height);
			},
			save: function (e) {

				var toSave = Messia.prepare();

				if (toSave === false) {
					return false;
				}
				else {
					$('input#constructor_cf').val(JSON.stringify(toSave));
				}
			},
			prepare: function () {

				var took = false;
				var slugs = [];
				var err = [];
				var save = [];

				var constructedFields = $('#constructed-wrapper').find('div.constructor-field');

				for (var q = 0; q < constructedFields.length; q++) {

					var constructed = $(constructedFields[q])
					var inputs = constructed.find('.settings input, .settings select');
					var field = {
						'field_type': constructed.attr('type'),
						'caps': [],
					};

					for (var w = 0; w < inputs.length; w++) {

						var input = $(inputs[w]);

						// Errors
						if (input.attr('m-required') == 'true' && input.val() === '') {
							input.addClass('required');
							err.push(messiaVars.messages.fillRequiredFields);
						}

						if (input.attr('m-name') == 'slug') {

							let take = slugs.includes(input.val());

							if (take && input.val() != '') {
								err.push(messiaVars.messages.removeDuplicatedSlugs);
							}
							else {
								slugs.push(input.val());
							}
						}

						// Data to save
						if (input.attr('type') === 'checkbox') {
							var val = Number(input.prop('checked'));
						}
						else if (input.attr('type') === 'radio') {
							const name = input.attr('name');
							var val = input.parent().find(`[name="${name}"]:checked`).val();
						}
						else {
							var val = input.val();
						}
						const mname = input.attr('m-name');

						if (input.parents('.caps').length === 1) {
							if (input.prop('checked')) {
								field['caps'].push(mname);
							}
						}
						else {
							field[mname] = val;
						}
					}

					save.push(field);
				}
				if (err.length > 0) {
					save = false;
					alert(Array.from(new Set(err)).join("\n"));
				}

				return save;
			},
			openSlugForEdit(event) {

				var target = $(event.target);

				if (!target.hasClass('locked') || target.parents('.saved').length === 0) {
					return;
				}

				event.preventDefault();
				var confirm = $.fn.messiaModalWarning(false, messiaVars.messages.constructorSlugEdit, []);
				confirm.element.one('dialogClosed', { 'caller': target }, Messia.onConfirmSlugEdit);
			},
			showSchema(event) {

				event.preventDefault();
				var content = $(this).next('.modal-content').prop('outerHTML');
				$.fn.messiaModalWarning(false, content, false);
			},
			setDefaultSegmentTip: function (event) {
				$('tbody#the-list #tag-' + messiaVars.defaultSegmentTermId + ' th.check-column').empty().append('<span class="messia-help-tip" title="' + messiaVars.messages.segmentTermIsReadOnly + '"></span>');
			},
			setDirty: function (e) {
				$(document).trigger('messiaContentIsDirty');
			},
			clearDirty: function (e) {
				$(document).trigger('messiaContentIsSaved');
			},
			quickEdit: function (event) {

				var term_as_filter = $(this).closest('tr').find('td.term_as_filter').find('.value').data('checked')
				var term_on_card = $(this).closest('tr').find('td.term_on_card').find('.value').data('checked')

				$(':input[name="term_as_filter"]', '.inline-edit-row').prop('checked', term_as_filter);
				$(':input[name="term_on_card"]', '.inline-edit-row').prop('checked', term_on_card);
			},
			onConfirmSlugEdit: function (event, action) {
				if (action === 'ok') {
					event.data.caller.removeClass('locked');
				}
				else {
					event.data.caller.addClass('locked');
				}
			},
			initSelect2EditInline: function () {
				if (true === $.fn.messiaIsMobile()) {
					Messia.select2Multiple = '[multiple]';
				}
				var set = [
					{	// termin page
						selector: $(this).parents('.wp-list-table').find(`.inline-edit-row.inline-editor select[name="term_order_target_id"]${Messia.select2Multiple}, .inline-edit-row.inline-editor select[name="term_order_target_id"]${Messia.select2Async}`),
						arguments: {
							minimumResultsForSearch: 3,
							width: '300px',
							ajax: {
								type: 'POST',
								delay: 450,
								url: messiaVars.ajaxUrl,
								dataType: 'json',
								data: function (params) {

									let edit = this.parents('.inline-edit-row.inline-editor');
									let parts = edit.attr('id').split('-');
									let tax = edit.find('.inline-edit-save.submit input[name="taxonomy"]').val();

									return {
										action: 'get_term_neighbors',
										AJAX_Marker: messiaVars.AJAX_Marker,
										messiaNonce: messiaVars.messiaNonce,
										taxonomy: tax,
										neighbor: parts[parts.length - 1],
										search: 'undefined' === typeof params.term ? null : params.term,
										page: params.page,
									};
								},
								processResults: function (server) {
									return {
										results: server.data.terms
									};
								},
								cache: true,
							}
						},
					},
				];
				$.fn.messiaInitSelect2(set);
			},
			toggleDisableTargetSelector: function () {

				var select = $(this).parents('.inline-edit-row.inline-editor').find('select[name="term_order_target_id"]');
				if ($(this).val() === 'reset') {
					select.prop('disabled', true);
				}
				else {
					select.prop('disabled', false);
				}
			},
		};

		const sortable = $('#constructed-wrapper').sortable({
			forceHelperSize: true,
			forcePlaceholderSize: true,
			//cursor: 'grabbig',
			opacity: 1,
			//distance: 10,
			tolerance: 'intersect',
			scroll: true,
			scrollSensitivity: 20,
			containment: '#wpwrap',
			placeholder: 'sortable-placeholder',
			handle: '.move',
			//zIndex: 10000,
			start: (event, ui) => {
				ui.helper.addClass('is-elevated');
				$('body').addClass('cursor-grabbing');
			},
			beforeStop: (event, ui) => {
				$('body').removeClass('cursor-grabbing');
			},
			stop: (event, ui) => {
				ui.item.removeClass('is-elevated');
				Messia.showSlotSettings(ui);
				Messia.setDirty();
			},
		});

		const draggable = $('#constructor-wrapper .constructor-field').draggable({
			connectToSortable: '#constructed-wrapper',
			//cursor: 'grabbig',
			helper: 'clone',
			revert: 'invalid',
			scroll: false,
			revertDuration: 200,
			handle: '.move',
			start: (event, ui) => {
				ui.helper.addClass('is-elevated');
				sortable.addClass('dragging');
				$('body').addClass('cursor-grabbing');
			},
			beforeStop: (event, ui) => {
				$('body').removeClass('cursor-grabbing');
			},
			stop: (event, ui) => {
				ui.helper.removeClass('is-elevated');
				sortable.removeClass('dragging');
			},
		});

		$('body').on('click', '.form-field.messia.term_icon .icon .edit-image, .form-field.messia.term_thumbnail .icon .edit-image', Messia.selectTermMedia);
		$('body').on('click touchstart', '.form-field.messia.term_icon .icon .remove-image, .form-field.messia.term_thumbnail .icon .remove-image', Messia.removeTermMedia);

		$('#constructed-wrapper').on('click', '.field-title .remove', Messia.deleteSlot);
		$('#constructed-wrapper').on('click touchstart', '.titles-wrapper .icon .edit-image', Messia.selectConstructorMedia);
		$('#constructed-wrapper').on('click touchstart', '.titles-wrapper .icon .remove-image', Messia.removeConstructorMedia);
		$('#constructed-wrapper').on('keydown', '.titles-wrapper .titles input[m-name="slug"]', Messia.openSlugForEdit);
		$('#the-list').on('click', '.editinline', Messia.quickEdit);

		$('body').on('input', '#edittag input, #edittag textarea, #edittag select', Messia.setDirty);
		$('form#edittag').on('submit', Messia.clearDirty);

		$('#constructed-wrapper .constructor-field .settings').each(function () {
			Messia.adjustIcon.call($(this));
		});

		$('.areas-warning').on('click', '.schema.popup', Messia.showSchema);

		$('#the-list').on('click', '.editinline', Messia.initSelect2EditInline);
		$('.wp-list-table').on('click', 'input[name="term_order_position_type"]', Messia.toggleDisableTargetSelector);

		$('#edittag input[type="submit"]').on('click', Messia.save);
		Messia.setDefaultSegmentTip();

		$('.macs tbody#the-list .messia-help-tip').tooltip();
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
  !*** ./src/entries/backend/entry-term-edit.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_term_edit_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/term-edit.scss */ "./src/scss/_backend/term-edit.scss");
/* harmony import */ var _js_backend_term_edit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/term-edit.js */ "./src/js/_backend/term-edit.js");
/* harmony import */ var _js_backend_term_edit_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_term_edit_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvdGVybS1lZGl0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BELDRDQUE0QyxXQUFXO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLDhCQUE4Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixtQkFBbUI7O0FBRXhDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDRIQUE0SCx1QkFBdUIsc0VBQXNFLG9CQUFvQjtBQUM3TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7Ozs7O1VDM2FEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzRDOztBQUU1QyIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL19iYWNrZW5kL3Rlcm0tZWRpdC5zY3NzP2YwMzYiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL3Rlcm0tZWRpdC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9lbnRyeS10ZXJtLWVkaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0dmFyIE1lc3NpYTtcblxuXHRcdE1lc3NpYSA9IHtcblx0XHRcdHNlbGVjdDJNdWx0aXBsZTogJycsXG5cdFx0XHRzZWxlY3QyQXN5bmM6ICcnLFxuXHRcdFx0c2VsZWN0VGVybU1lZGlhOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0JCh0aGlzKS5tZXNzaWFNZWRpYVNlbGVjdG9yKE1lc3NpYS5pbWFnZVNlbGVjdGVkVGVybVRodW1ibmFpbCk7XG5cdFx0XHR9LFxuXHRcdFx0c2VsZWN0Q29uc3RydWN0b3JNZWRpYTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLm1lc3NpYU1lZGlhU2VsZWN0b3IoTWVzc2lhLmltYWdlU2VsZWN0ZWRDb25zdHJ1Y3Rvcik7XG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VTZWxlY3RlZFRlcm1UaHVtYm5haWw6IGZ1bmN0aW9uIChjYWxsZXIsIHNlbGVjdGlvbikge1xuXHRcdFx0XHQkLmZuLm1lc3NpYUFwcGVuZE1lZGlhU2VsZWN0aW9uKGNhbGxlciwgc2VsZWN0aW9uKTtcblxuXHRcdFx0XHR2YXIgaW1hZ2VzID0gW107XG5cdFx0XHRcdHZhciBpY29ucyA9IGNhbGxlci5wYXJlbnQoKS5maW5kKCcuaWNvbicpO1xuXHRcdFx0XHR2YXIgZGF0YUdldHRlciA9IGNhbGxlci5wYXJlbnRzKCcudGVybV90aHVtYm5haWwsIC50ZXJtX2ljb24nKS5maW5kKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICgkKGljb25zW2ldKS5maW5kKCcucGxhY2Vob2xkZXItaW1hZ2UnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGltYWdlcy5wdXNoKCQoaWNvbnNbaV0pLmRhdGEoJ2ltYWdlaW5mbycpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IGltYWdlU2V0ID0gaW1hZ2VzLmZpbHRlcihpbWFnZSA9PiB7XG5cdFx0XHRcdFx0ZGVsZXRlIGltYWdlLnVybDtcblx0XHRcdFx0XHRyZXR1cm4gaW1hZ2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRkYXRhR2V0dGVyLnZhbChKU09OLnN0cmluZ2lmeShpbWFnZVNldCkpO1xuXHRcdFx0fSxcblx0XHRcdGltYWdlU2VsZWN0ZWRDb25zdHJ1Y3RvcjogZnVuY3Rpb24gKGNhbGxlciwgc2VsZWN0aW9uKSB7XG5cdFx0XHRcdCQuZm4ubWVzc2lhQXBwZW5kTWVkaWFTZWxlY3Rpb24oY2FsbGVyLCBzZWxlY3Rpb24pO1xuXG5cdFx0XHRcdHZhciBpbWFnZXMgPSBbXTtcblx0XHRcdFx0dmFyIGljb25zID0gY2FsbGVyLnBhcmVudCgpLmZpbmQoJy5pY29uJyk7XG5cdFx0XHRcdHZhciBkYXRhR2V0dGVyID0gY2FsbGVyLnBhcmVudHMoJy50aXRsZXMtd3JhcHBlcicpLmZpbmQoJ1ttLW5hbWU9XCJpY29uXCJdJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICgkKGljb25zW2ldKS5maW5kKCcucGxhY2Vob2xkZXItaW1hZ2UnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGltYWdlcy5wdXNoKCQoaWNvbnNbaV0pLmRhdGEoJ2ltYWdlaW5mbycpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IGltYWdlU2V0ID0gaW1hZ2VzLmZpbHRlcihpbWFnZSA9PiB7XG5cdFx0XHRcdFx0ZGVsZXRlIGltYWdlLnVybDtcblx0XHRcdFx0XHRyZXR1cm4gaW1hZ2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRkYXRhR2V0dGVyLnZhbChKU09OLnN0cmluZ2lmeShpbWFnZVNldCkpO1xuXHRcdFx0XHRNZXNzaWEuc2V0RGlydHkoKTtcblx0XHRcdH0sXG5cdFx0XHRyZW1vdmVUZXJtTWVkaWE6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdyZW1vdmUtaW1hZ2UnKS5hZGRDbGFzcygncGxhY2Vob2xkZXItaW1hZ2UnKS5wYXJlbnQoKS5yZW1vdmVBdHRyKCdpZCcpLmZpbmQoJy5pbWFnZScpLnJlbW92ZSgpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy5mb3JtLWZpZWxkLm1lc3NpYS50ZXJtX2ljb24sIC5mb3JtLWZpZWxkLm1lc3NpYS50ZXJtX3RodW1ibmFpbCcpLmZpbmQoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl1bbmFtZT1cInRlcm1faWNvblwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXVtuYW1lPVwidGVybV90aHVtYm5haWxcIl0nKS52YWwoJycpO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZUNvbnN0cnVjdG9yTWVkaWE6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdyZW1vdmUtaW1hZ2UnKS5hZGRDbGFzcygncGxhY2Vob2xkZXItaW1hZ2UnKS5wYXJlbnQoKS5yZW1vdmVBdHRyKCdpZCcpLmZpbmQoJy5pbWFnZScpLnJlbW92ZSgpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy50aXRsZXMtd3JhcHBlcicpLmZpbmQoJ1ttLW5hbWU9XCJpY29uXCJdJykudmFsKCcnKTtcblx0XHRcdH0sXG5cdFx0XHRjbG9zZUFkZDogZnVuY3Rpb24gKHRhcmdldCkge1xuXHRcdFx0XHR0YXJnZXQuZmluZCgnLmZpZWxkLXRpdGxlJykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInJlbW92ZVwiPjwvc3Bhbj4nKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGVTbG90OiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKGUudGFyZ2V0KS5wYXJlbnRzKCcuY29uc3RydWN0b3ItZmllbGQnKS5hbmltYXRlKHtcblx0XHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHR9LCA0MDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRzaG93U2xvdFNldHRpbmdzOiBmdW5jdGlvbiAodWkpIHtcblx0XHRcdFx0dmFyIHNldHRpbmdzID0gdWkuaXRlbS5maW5kKCcuc2V0dGluZ3MnKTtcblxuXHRcdFx0XHRpZiAodWkuaXRlbS5kYXRhKCd2aXNpYmxlJykgPT09IHRydWUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHRhcmdldHMgPSBzZXR0aW5ncy5maW5kKCdpbnB1dCwgc2VsZWN0Jyk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdGlucHV0ID0gJCh0YXJnZXRzW2ldKSxcblx0XHRcdFx0XHRcdGlucHV0X2lkID0gaW5wdXQuYXR0cignaWQnKSxcblx0XHRcdFx0XHRcdGlucHV0X25hbWUgPSBpbnB1dC5hdHRyKCduYW1lJyksXG5cdFx0XHRcdFx0XHRsYWJlbHMgPSBzZXR0aW5ncy5maW5kKGBsYWJlbFtmb3I9XCIke2lucHV0X2lkfVwiXWApLFxuXHRcdFx0XHRcdFx0aW5wdXRzID0gc2V0dGluZ3MuZmluZChgaW5wdXRbbmFtZT1cIiR7aW5wdXRfbmFtZX1cIl1gKSxcblx0XHRcdFx0XHRcdG5hbWVfcm5kID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpLnNwbGl0KCcuJylbMF0sXG5cdFx0XHRcdFx0XHRpZF9ybmQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMikuc3BsaXQoJy4nKVswXTtcblxuXHRcdFx0XHRcdGlucHV0LmF0dHIoJ2lkJywgaWRfcm5kKTtcblx0XHRcdFx0XHRsYWJlbHMuYXR0cignZm9yJywgaWRfcm5kKTtcblx0XHRcdFx0XHRpbnB1dHMuYXR0cignbmFtZScsIG5hbWVfcm5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5jc3MoJ2Rpc3BsYXknKSAhPSAnbm9uZScpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgd19mcm9tID0gdWkuaXRlbS5vdXRlcldpZHRoKCk7XG5cblx0XHRcdFx0dWkuaXRlbS5jc3Moe1xuXHRcdFx0XHRcdCdoZWlnaHQnOiAnJyxcblx0XHRcdFx0XHQnd2lkdGgnOiAnJyxcblx0XHRcdFx0fSkuZmluZCgnLmZpZWxkLXRpdGxlJykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInJlbW92ZVwiPjwvc3Bhbj4nKTtcblxuXHRcdFx0XHR2YXIgd190byA9IHVpLml0ZW0ub3V0ZXJXaWR0aCgpO1xuXG5cdFx0XHRcdHVpLml0ZW0uY3NzKHtcblx0XHRcdFx0XHQnd2lkdGgnOiB3X2Zyb20sXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vQ2FyZCBkaXZcblx0XHRcdFx0dWkuaXRlbS5hbmltYXRlKHtcblx0XHRcdFx0XHR3aWR0aDogd190byArICdweCcsXG5cdFx0XHRcdH0sIDIwMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6ICcnLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c2V0dGluZ3MuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0XHRcdFx0dmFyIGggPSBzZXR0aW5ncy5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdHZhciB3ID0gc2V0dGluZ3Mub3V0ZXJXaWR0aCgpO1xuXHRcdFx0XHRcdHNldHRpbmdzLmNzcyh7XG5cdFx0XHRcdFx0XHQnaGVpZ2h0JzogMCxcblx0XHRcdFx0XHRcdCd3aWR0aCc6IDAsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0dGluZ3MuYW5pbWF0ZShcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBoICsgJ3B4Jyxcblx0XHRcdFx0XHRcdFx0d2lkdGg6IHcgKyAncHgnLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcblx0XHRcdFx0XHRcdFx0c3RhcnQ6IE1lc3NpYS5hZGp1c3RJY29uLmNhbGwoJCh0aGlzKSksXG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xuXHRcdFx0XHRcdFx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0dWkuaXRlbS5kYXRhKCd2aXNpYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0YWRqdXN0SWNvbjogZnVuY3Rpb24gKG9iamVjdCkge1xuXHRcdFx0XHR2YXIgZmlsZWRzX3RpdGxlID0gJCh0aGlzKS5maW5kKCcudGl0bGVzLXdyYXBwZXIgW20tbmFtZT1cInRpdGxlXCJdJyk7XG5cdFx0XHRcdHZhciBmaWxlZHNfc2x1ZyA9ICQodGhpcykuZmluZCgnLnRpdGxlcy13cmFwcGVyIFttLW5hbWU9XCJzbHVnXCJdJyk7XG5cdFx0XHRcdHZhciBpY29uID0gJCh0aGlzKS5maW5kKCcudGl0bGVzLXdyYXBwZXIgLmljb24nKTtcblxuXHRcdFx0XHR2YXIgZmlsZWRzX2hlaWdodCA9IGZpbGVkc190aXRsZS5vdXRlckhlaWdodCgpICsgcGFyc2VJbnQoZmlsZWRzX3RpdGxlLmNzcygnbWFyZ2luLXRvcCcpKSArIHBhcnNlSW50KGZpbGVkc190aXRsZS5jc3MoJ21hcmdpbi1ib3R0b20nKSkgK1xuXHRcdFx0XHRcdGZpbGVkc19zbHVnLm91dGVySGVpZ2h0KCkgKyBwYXJzZUludChmaWxlZHNfc2x1Zy5jc3MoJ21hcmdpbi10b3AnKSkgKyBwYXJzZUludChmaWxlZHNfc2x1Zy5jc3MoJ21hcmdpbi1ib3R0b20nKSk7XG5cdFx0XHRcdHZhciBpY29uX2hlaWdodCA9IGZpbGVkc19oZWlnaHQgLVxuXHRcdFx0XHRcdHBhcnNlSW50KGljb24uY3NzKCdwYWRkaW5nLXRvcCcpKSAtXG5cdFx0XHRcdFx0cGFyc2VJbnQoaWNvbi5jc3MoJ3BhZGRpbmctYm90dG9tJykpIC1cblx0XHRcdFx0XHRwYXJzZUludChpY29uLmNzcygnbWFyZ2luLXRvcCcpKSAtXG5cdFx0XHRcdFx0cGFyc2VJbnQoaWNvbi5jc3MoJ21hcmdpbi1ib3R0b20nKSkgLVxuXHRcdFx0XHRcdHBhcnNlSW50KGljb24uY3NzKCdib3JkZXItdG9wLXdpZHRoJykpIC1cblx0XHRcdFx0XHRwYXJzZUludChpY29uLmNzcygnYm9yZGVyLWJvdHRvbS13aWR0aCcpKTtcblxuXHRcdFx0XHRpY29uLmNzcygnd2lkdGgnLCBpY29uX2hlaWdodCk7XG5cdFx0XHRcdGljb24uY3NzKCdoZWlnaHQnLCBpY29uX2hlaWdodCk7XG5cdFx0XHR9LFxuXHRcdFx0c2F2ZTogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdG9TYXZlID0gTWVzc2lhLnByZXBhcmUoKTtcblxuXHRcdFx0XHRpZiAodG9TYXZlID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQkKCdpbnB1dCNjb25zdHJ1Y3Rvcl9jZicpLnZhbChKU09OLnN0cmluZ2lmeSh0b1NhdmUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHByZXBhcmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgdG9vayA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc2x1Z3MgPSBbXTtcblx0XHRcdFx0dmFyIGVyciA9IFtdO1xuXHRcdFx0XHR2YXIgc2F2ZSA9IFtdO1xuXG5cdFx0XHRcdHZhciBjb25zdHJ1Y3RlZEZpZWxkcyA9ICQoJyNjb25zdHJ1Y3RlZC13cmFwcGVyJykuZmluZCgnZGl2LmNvbnN0cnVjdG9yLWZpZWxkJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgcSA9IDA7IHEgPCBjb25zdHJ1Y3RlZEZpZWxkcy5sZW5ndGg7IHErKykge1xuXG5cdFx0XHRcdFx0dmFyIGNvbnN0cnVjdGVkID0gJChjb25zdHJ1Y3RlZEZpZWxkc1txXSlcblx0XHRcdFx0XHR2YXIgaW5wdXRzID0gY29uc3RydWN0ZWQuZmluZCgnLnNldHRpbmdzIGlucHV0LCAuc2V0dGluZ3Mgc2VsZWN0Jyk7XG5cdFx0XHRcdFx0dmFyIGZpZWxkID0ge1xuXHRcdFx0XHRcdFx0J2ZpZWxkX3R5cGUnOiBjb25zdHJ1Y3RlZC5hdHRyKCd0eXBlJyksXG5cdFx0XHRcdFx0XHQnY2Fwcyc6IFtdLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRmb3IgKHZhciB3ID0gMDsgdyA8IGlucHV0cy5sZW5ndGg7IHcrKykge1xuXG5cdFx0XHRcdFx0XHR2YXIgaW5wdXQgPSAkKGlucHV0c1t3XSk7XG5cblx0XHRcdFx0XHRcdC8vIEVycm9yc1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LmF0dHIoJ20tcmVxdWlyZWQnKSA9PSAndHJ1ZScgJiYgaW5wdXQudmFsKCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdGlucHV0LmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuXHRcdFx0XHRcdFx0XHRlcnIucHVzaChtZXNzaWFWYXJzLm1lc3NhZ2VzLmZpbGxSZXF1aXJlZEZpZWxkcyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChpbnB1dC5hdHRyKCdtLW5hbWUnKSA9PSAnc2x1ZycpIHtcblxuXHRcdFx0XHRcdFx0XHRsZXQgdGFrZSA9IHNsdWdzLmluY2x1ZGVzKGlucHV0LnZhbCgpKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAodGFrZSAmJiBpbnB1dC52YWwoKSAhPSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdGVyci5wdXNoKG1lc3NpYVZhcnMubWVzc2FnZXMucmVtb3ZlRHVwbGljYXRlZFNsdWdzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRzbHVncy5wdXNoKGlucHV0LnZhbCgpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEYXRhIHRvIHNhdmVcblx0XHRcdFx0XHRcdGlmIChpbnB1dC5hdHRyKCd0eXBlJykgPT09ICdjaGVja2JveCcpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9IE51bWJlcihpbnB1dC5wcm9wKCdjaGVja2VkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAoaW5wdXQuYXR0cigndHlwZScpID09PSAncmFkaW8nKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBpbnB1dC5hdHRyKCduYW1lJyk7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSBpbnB1dC5wYXJlbnQoKS5maW5kKGBbbmFtZT1cIiR7bmFtZX1cIl06Y2hlY2tlZGApLnZhbCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSBpbnB1dC52YWwoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IG1uYW1lID0gaW5wdXQuYXR0cignbS1uYW1lJyk7XG5cblx0XHRcdFx0XHRcdGlmIChpbnB1dC5wYXJlbnRzKCcuY2FwcycpLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZmllbGRbJ2NhcHMnXS5wdXNoKG1uYW1lKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZpZWxkW21uYW1lXSA9IHZhbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzYXZlLnB1c2goZmllbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlcnIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHNhdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRhbGVydChBcnJheS5mcm9tKG5ldyBTZXQoZXJyKSkuam9pbihcIlxcblwiKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gc2F2ZTtcblx0XHRcdH0sXG5cdFx0XHRvcGVuU2x1Z0ZvckVkaXQoZXZlbnQpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuXG5cdFx0XHRcdGlmICghdGFyZ2V0Lmhhc0NsYXNzKCdsb2NrZWQnKSB8fCB0YXJnZXQucGFyZW50cygnLnNhdmVkJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dmFyIGNvbmZpcm0gPSAkLmZuLm1lc3NpYU1vZGFsV2FybmluZyhmYWxzZSwgbWVzc2lhVmFycy5tZXNzYWdlcy5jb25zdHJ1Y3RvclNsdWdFZGl0LCBbXSk7XG5cdFx0XHRcdGNvbmZpcm0uZWxlbWVudC5vbmUoJ2RpYWxvZ0Nsb3NlZCcsIHsgJ2NhbGxlcic6IHRhcmdldCB9LCBNZXNzaWEub25Db25maXJtU2x1Z0VkaXQpO1xuXHRcdFx0fSxcblx0XHRcdHNob3dTY2hlbWEoZXZlbnQpIHtcblxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgY29udGVudCA9ICQodGhpcykubmV4dCgnLm1vZGFsLWNvbnRlbnQnKS5wcm9wKCdvdXRlckhUTUwnKTtcblx0XHRcdFx0JC5mbi5tZXNzaWFNb2RhbFdhcm5pbmcoZmFsc2UsIGNvbnRlbnQsIGZhbHNlKTtcblx0XHRcdH0sXG5cdFx0XHRzZXREZWZhdWx0U2VnbWVudFRpcDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdCQoJ3Rib2R5I3RoZS1saXN0ICN0YWctJyArIG1lc3NpYVZhcnMuZGVmYXVsdFNlZ21lbnRUZXJtSWQgKyAnIHRoLmNoZWNrLWNvbHVtbicpLmVtcHR5KCkuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIm1lc3NpYS1oZWxwLXRpcFwiIHRpdGxlPVwiJyArIG1lc3NpYVZhcnMubWVzc2FnZXMuc2VnbWVudFRlcm1Jc1JlYWRPbmx5ICsgJ1wiPjwvc3Bhbj4nKTtcblx0XHRcdH0sXG5cdFx0XHRzZXREaXJ0eTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbWVzc2lhQ29udGVudElzRGlydHknKTtcblx0XHRcdH0sXG5cdFx0XHRjbGVhckRpcnR5OiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdtZXNzaWFDb250ZW50SXNTYXZlZCcpO1xuXHRcdFx0fSxcblx0XHRcdHF1aWNrRWRpdDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0dmFyIHRlcm1fYXNfZmlsdGVyID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpLmZpbmQoJ3RkLnRlcm1fYXNfZmlsdGVyJykuZmluZCgnLnZhbHVlJykuZGF0YSgnY2hlY2tlZCcpXG5cdFx0XHRcdHZhciB0ZXJtX29uX2NhcmQgPSAkKHRoaXMpLmNsb3Nlc3QoJ3RyJykuZmluZCgndGQudGVybV9vbl9jYXJkJykuZmluZCgnLnZhbHVlJykuZGF0YSgnY2hlY2tlZCcpXG5cblx0XHRcdFx0JCgnOmlucHV0W25hbWU9XCJ0ZXJtX2FzX2ZpbHRlclwiXScsICcuaW5saW5lLWVkaXQtcm93JykucHJvcCgnY2hlY2tlZCcsIHRlcm1fYXNfZmlsdGVyKTtcblx0XHRcdFx0JCgnOmlucHV0W25hbWU9XCJ0ZXJtX29uX2NhcmRcIl0nLCAnLmlubGluZS1lZGl0LXJvdycpLnByb3AoJ2NoZWNrZWQnLCB0ZXJtX29uX2NhcmQpO1xuXHRcdFx0fSxcblx0XHRcdG9uQ29uZmlybVNsdWdFZGl0OiBmdW5jdGlvbiAoZXZlbnQsIGFjdGlvbikge1xuXHRcdFx0XHRpZiAoYWN0aW9uID09PSAnb2snKSB7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YS5jYWxsZXIucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGV2ZW50LmRhdGEuY2FsbGVyLmFkZENsYXNzKCdsb2NrZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGluaXRTZWxlY3QyRWRpdElubGluZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAodHJ1ZSA9PT0gJC5mbi5tZXNzaWFJc01vYmlsZSgpKSB7XG5cdFx0XHRcdFx0TWVzc2lhLnNlbGVjdDJNdWx0aXBsZSA9ICdbbXVsdGlwbGVdJztcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgc2V0ID0gW1xuXHRcdFx0XHRcdHtcdC8vIHRlcm1pbiBwYWdlXG5cdFx0XHRcdFx0XHRzZWxlY3RvcjogJCh0aGlzKS5wYXJlbnRzKCcud3AtbGlzdC10YWJsZScpLmZpbmQoYC5pbmxpbmUtZWRpdC1yb3cuaW5saW5lLWVkaXRvciBzZWxlY3RbbmFtZT1cInRlcm1fb3JkZXJfdGFyZ2V0X2lkXCJdJHtNZXNzaWEuc2VsZWN0Mk11bHRpcGxlfSwgLmlubGluZS1lZGl0LXJvdy5pbmxpbmUtZWRpdG9yIHNlbGVjdFtuYW1lPVwidGVybV9vcmRlcl90YXJnZXRfaWRcIl0ke01lc3NpYS5zZWxlY3QyQXN5bmN9YCksXG5cdFx0XHRcdFx0XHRhcmd1bWVudHM6IHtcblx0XHRcdFx0XHRcdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IDMsXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiAnMzAwcHgnLFxuXHRcdFx0XHRcdFx0XHRhamF4OiB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdFx0XHRcdGRlbGF5OiA0NTAsXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBtZXNzaWFWYXJzLmFqYXhVcmwsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGxldCBlZGl0ID0gdGhpcy5wYXJlbnRzKCcuaW5saW5lLWVkaXQtcm93LmlubGluZS1lZGl0b3InKTtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBwYXJ0cyA9IGVkaXQuYXR0cignaWQnKS5zcGxpdCgnLScpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHRheCA9IGVkaXQuZmluZCgnLmlubGluZS1lZGl0LXNhdmUuc3VibWl0IGlucHV0W25hbWU9XCJ0YXhvbm9teVwiXScpLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhY3Rpb246ICdnZXRfdGVybV9uZWlnaGJvcnMnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRBSkFYX01hcmtlcjogbWVzc2lhVmFycy5BSkFYX01hcmtlcixcblx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IG1lc3NpYVZhcnMubWVzc2lhTm9uY2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRheG9ub215OiB0YXgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5laWdoYm9yOiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhcmNoOiAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHBhcmFtcy50ZXJtID8gbnVsbCA6IHBhcmFtcy50ZXJtLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYWdlOiBwYXJhbXMucGFnZSxcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0czogc2VydmVyLmRhdGEudGVybXNcblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdO1xuXHRcdFx0XHQkLmZuLm1lc3NpYUluaXRTZWxlY3QyKHNldCk7XG5cdFx0XHR9LFxuXHRcdFx0dG9nZ2xlRGlzYWJsZVRhcmdldFNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dmFyIHNlbGVjdCA9ICQodGhpcykucGFyZW50cygnLmlubGluZS1lZGl0LXJvdy5pbmxpbmUtZWRpdG9yJykuZmluZCgnc2VsZWN0W25hbWU9XCJ0ZXJtX29yZGVyX3RhcmdldF9pZFwiXScpO1xuXHRcdFx0XHRpZiAoJCh0aGlzKS52YWwoKSA9PT0gJ3Jlc2V0Jykge1xuXHRcdFx0XHRcdHNlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHNlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9O1xuXG5cdFx0Y29uc3Qgc29ydGFibGUgPSAkKCcjY29uc3RydWN0ZWQtd3JhcHBlcicpLnNvcnRhYmxlKHtcblx0XHRcdGZvcmNlSGVscGVyU2l6ZTogdHJ1ZSxcblx0XHRcdGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxuXHRcdFx0Ly9jdXJzb3I6ICdncmFiYmlnJyxcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHQvL2Rpc3RhbmNlOiAxMCxcblx0XHRcdHRvbGVyYW5jZTogJ2ludGVyc2VjdCcsXG5cdFx0XHRzY3JvbGw6IHRydWUsXG5cdFx0XHRzY3JvbGxTZW5zaXRpdml0eTogMjAsXG5cdFx0XHRjb250YWlubWVudDogJyN3cHdyYXAnLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdzb3J0YWJsZS1wbGFjZWhvbGRlcicsXG5cdFx0XHRoYW5kbGU6ICcubW92ZScsXG5cdFx0XHQvL3pJbmRleDogMTAwMDAsXG5cdFx0XHRzdGFydDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHR1aS5oZWxwZXIuYWRkQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHR9LFxuXHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0dWkuaXRlbS5yZW1vdmVDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0TWVzc2lhLnNob3dTbG90U2V0dGluZ3ModWkpO1xuXHRcdFx0XHRNZXNzaWEuc2V0RGlydHkoKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkcmFnZ2FibGUgPSAkKCcjY29uc3RydWN0b3Itd3JhcHBlciAuY29uc3RydWN0b3ItZmllbGQnKS5kcmFnZ2FibGUoe1xuXHRcdFx0Y29ubmVjdFRvU29ydGFibGU6ICcjY29uc3RydWN0ZWQtd3JhcHBlcicsXG5cdFx0XHQvL2N1cnNvcjogJ2dyYWJiaWcnLFxuXHRcdFx0aGVscGVyOiAnY2xvbmUnLFxuXHRcdFx0cmV2ZXJ0OiAnaW52YWxpZCcsXG5cdFx0XHRzY3JvbGw6IGZhbHNlLFxuXHRcdFx0cmV2ZXJ0RHVyYXRpb246IDIwMCxcblx0XHRcdGhhbmRsZTogJy5tb3ZlJyxcblx0XHRcdHN0YXJ0OiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdHVpLmhlbHBlci5hZGRDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0c29ydGFibGUuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHR9LFxuXHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0dWkuaGVscGVyLnJlbW92ZUNsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRzb3J0YWJsZS5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5mb3JtLWZpZWxkLm1lc3NpYS50ZXJtX2ljb24gLmljb24gLmVkaXQtaW1hZ2UsIC5mb3JtLWZpZWxkLm1lc3NpYS50ZXJtX3RodW1ibmFpbCAuaWNvbiAuZWRpdC1pbWFnZScsIE1lc3NpYS5zZWxlY3RUZXJtTWVkaWEpO1xuXHRcdCQoJ2JvZHknKS5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuZm9ybS1maWVsZC5tZXNzaWEudGVybV9pY29uIC5pY29uIC5yZW1vdmUtaW1hZ2UsIC5mb3JtLWZpZWxkLm1lc3NpYS50ZXJtX3RodW1ibmFpbCAuaWNvbiAucmVtb3ZlLWltYWdlJywgTWVzc2lhLnJlbW92ZVRlcm1NZWRpYSk7XG5cblx0XHQkKCcjY29uc3RydWN0ZWQtd3JhcHBlcicpLm9uKCdjbGljaycsICcuZmllbGQtdGl0bGUgLnJlbW92ZScsIE1lc3NpYS5kZWxldGVTbG90KTtcblx0XHQkKCcjY29uc3RydWN0ZWQtd3JhcHBlcicpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy50aXRsZXMtd3JhcHBlciAuaWNvbiAuZWRpdC1pbWFnZScsIE1lc3NpYS5zZWxlY3RDb25zdHJ1Y3Rvck1lZGlhKTtcblx0XHQkKCcjY29uc3RydWN0ZWQtd3JhcHBlcicpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy50aXRsZXMtd3JhcHBlciAuaWNvbiAucmVtb3ZlLWltYWdlJywgTWVzc2lhLnJlbW92ZUNvbnN0cnVjdG9yTWVkaWEpO1xuXHRcdCQoJyNjb25zdHJ1Y3RlZC13cmFwcGVyJykub24oJ2tleWRvd24nLCAnLnRpdGxlcy13cmFwcGVyIC50aXRsZXMgaW5wdXRbbS1uYW1lPVwic2x1Z1wiXScsIE1lc3NpYS5vcGVuU2x1Z0ZvckVkaXQpO1xuXHRcdCQoJyN0aGUtbGlzdCcpLm9uKCdjbGljaycsICcuZWRpdGlubGluZScsIE1lc3NpYS5xdWlja0VkaXQpO1xuXG5cdFx0JCgnYm9keScpLm9uKCdpbnB1dCcsICcjZWRpdHRhZyBpbnB1dCwgI2VkaXR0YWcgdGV4dGFyZWEsICNlZGl0dGFnIHNlbGVjdCcsIE1lc3NpYS5zZXREaXJ0eSk7XG5cdFx0JCgnZm9ybSNlZGl0dGFnJykub24oJ3N1Ym1pdCcsIE1lc3NpYS5jbGVhckRpcnR5KTtcblxuXHRcdCQoJyNjb25zdHJ1Y3RlZC13cmFwcGVyIC5jb25zdHJ1Y3Rvci1maWVsZCAuc2V0dGluZ3MnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdE1lc3NpYS5hZGp1c3RJY29uLmNhbGwoJCh0aGlzKSk7XG5cdFx0fSk7XG5cblx0XHQkKCcuYXJlYXMtd2FybmluZycpLm9uKCdjbGljaycsICcuc2NoZW1hLnBvcHVwJywgTWVzc2lhLnNob3dTY2hlbWEpO1xuXG5cdFx0JCgnI3RoZS1saXN0Jykub24oJ2NsaWNrJywgJy5lZGl0aW5saW5lJywgTWVzc2lhLmluaXRTZWxlY3QyRWRpdElubGluZSk7XG5cdFx0JCgnLndwLWxpc3QtdGFibGUnKS5vbignY2xpY2snLCAnaW5wdXRbbmFtZT1cInRlcm1fb3JkZXJfcG9zaXRpb25fdHlwZVwiXScsIE1lc3NpYS50b2dnbGVEaXNhYmxlVGFyZ2V0U2VsZWN0b3IpO1xuXG5cdFx0JCgnI2VkaXR0YWcgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLm9uKCdjbGljaycsIE1lc3NpYS5zYXZlKTtcblx0XHRNZXNzaWEuc2V0RGVmYXVsdFNlZ21lbnRUaXAoKTtcblxuXHRcdCQoJy5tYWNzIHRib2R5I3RoZS1saXN0IC5tZXNzaWEtaGVscC10aXAnKS50b29sdGlwKCk7XG5cdH0pO1xufSkoalF1ZXJ5KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVcbmltcG9ydCBcIi4uLy4uL3Njc3MvX2JhY2tlbmQvdGVybS1lZGl0LnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvX2JhY2tlbmQvdGVybS1lZGl0LmpzXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/settings.scss":
/*!*****************************************!*\
  !*** ./src/scss/_backend/settings.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/settings-access.js":
/*!********************************************!*\
  !*** ./src/js/_backend/settings-access.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Module for actions with support team access.
 */
module.exports = function (Messia, $) {

	let abortController = null;

	const
		selectors = {
			form: '.messia-theme-access-form-holder',
			accessHandler: '#messia-support-status-togle',
			revokeHandler: '#messia-support-status-revoke',
			accessDuration: 'input#access_duration',
			accessDurationUnits: 'select#access_duration_units',
			accessValue: 'input[name="theme_support_access"]',
		},
		forms = $(selectors.form);

	let accessData = {
		'duration': false,
		'units': false,
	};

	let accessState = {};

	const setAccessState = (form, value = {}) => {

		accessData = {
			...accessData,
			...{
				duration: parseFloat(form.find(selectors.accessDuration).val()),
				units: form.find(selectors.accessDurationUnits).val(),
			}
		};

		accessState = { ...accessState, ...value };
		form.find(selectors.accessValue).val(JSON.stringify(accessState));
		form.trigger('access-state-change');

		return accessState;
	}

	const getAccessState = () => {
		return accessState;
	}

	const onAccessStateChange = (event) => {
		const
			accessState = getAccessState(),
			accessDuration = $(event.target).find(selectors.accessDuration),
			revokeHandler = $(event.target).find(selectors.revokeHandler),
			accessHandler = $(event.target).find(selectors.accessHandler);

		// Revoke.
		if (accessState.access_valid_until === false) {
			revokeHandler
				.prop('disabled', true)
				.off('click', accessAction);
		} else {
			revokeHandler
				.prop('disabled', false)
				.off('click', accessAction)
				.on('click', accessAction);
		}

		// Grant
		if (accessDurationValidate(accessDuration)) {
			accessHandler
				.prop('disabled', false)
				.off('click', accessAction)
				.on('click', accessAction);
		} else {
			accessHandler
				.prop('disabled', true)
				.off('click', accessAction);
		}
	}

	const onAccessDurationChange = (event) => {

		const
			target = $(event.target),
			form = target.parents(selectors.form);

		setAccessState(form);
	};

	const accessDurationUnitsChange = (event) => {
		const
			target = $(event.target),
			units = target.val(),
			durationEl = target.prev(selectors.accessDuration),
			map = durationEl.data('map');

		durationEl.attr({
			'min': map[units].min,
			'max': map[units].max,
		});
		durationEl.val(map[units].min).trigger('input');
	};

	const accessDurationValidate = (elem) => {
		const
			map = elem.data('map'),
			duration = parseFloat(elem.val()),
			units = elem.next(selectors.accessDurationUnits).val();

		if (isNaN(duration)) {
			return false;
		}

		return (duration >= map[units].min && duration <= map[units].max);
	};

	const accessAction = async function (event) {

		const
			target = $(event.target),
			form = target.parents(selectors.form),
			tabsData = Messia.tabs_selector.data('general'),
			actions = form.find('.actions'),
			formData = new FormData();

		formData.append('action', 'messia_access_action');
		formData.append('messiaNonce', tabsData.settingFormNonce);

		formData.append(
			'data',
			JSON.stringify({
				AJAX_Marker: messiaVars.AJAX_Marker,
				access_data: accessData,
				operation: $(this).data('operation'),
			})
		);

		const startAction = () => {
			if (actions.find('#loader_holder').find('.spinner').length > 0) return;
			const spinner = '<div class="spinner is-active"></div>';
			actions.find('#loader_holder').append(spinner);
		}

		const finishAction = (server) => {
			actions.find('#loader_holder .spinner').remove();

			switch (server.data.status_code) {
				case 'm200':
					$.fn.TabsPluginFrameWork('showMessage', server.data.user.message, 'success');

					form.attr('data-access-granted', server.data.access_granted);
					form.find('.status-title .status-value').text(server.data.status_title);
					form.find(selectors.accessHandler).val(server.data.btn_text);
					form.find(selectors.accessDuration).val('');

					setAccessState(form, {
						access_valid_until: server.data.access_valid_until,
					});

					$(document).trigger('messiaContentIsSaved');
					Messia.tabs_selector.trigger('resetSaveState');
					break;

				default:
					$.fn.TabsPluginFrameWork('showMessage', server.data.user.message, 'error');
					break;
			}
		}

		try {

			if (abortController != null) {
				abortController.abort();
				abortController = null;
			}

			abortController = new AbortController();
			startAction();
			const
				response = await fetch(messiaVars.ajaxUrl, {
					method: 'POST',
					body: formData,
					signal: abortController.signal,
				}),
				server = await response.json();
			finishAction(server);
		} catch (error) {
			if (error.name !== 'AbortError') {
				$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
				MessiaExt.logger.error(error);
			}
		} finally {
			abortController = null;
		}
	};

	forms.each(function () {
		$('body').on('input', `#${$(this).find(selectors.accessDuration).attr('id')}`, onAccessDurationChange);
		$('body').on('input', `#${$(this).find(selectors.accessDurationUnits).attr('id')}`, accessDurationUnitsChange);
		$('body').on('access-state-change', selectors.form, onAccessStateChange);
		setAccessState($(this), JSON.parse(forms.find(selectors.accessValue).val()));
	});
};

/***/ }),

/***/ "./src/js/_backend/settings-licence.js":
/*!*********************************************!*\
  !*** ./src/js/_backend/settings-licence.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Module for actions with licence.
 */
module.exports = function (Messia, $) {

	let abortController = null;

	const selectors = {
		licenceHandler: '.messia-theme-licence-form-holder #messia-licence-status-togle',
		licenceFields: '.messia-theme-licence-form-holder input#licence_key, .messia-theme-licence-form-holder input#licence_status',
	};

	const licenceStatusToggle = function (e) {
		licenceAction.call(this, 'toggleStatus');
	};

	const saveLicenceData = (e) => {
		const
			to_save = {},
			licence_fields = $(selectors.licenceFields);

		for (var i = 0; i < licence_fields.length; i++) {

			var key = $(licence_fields[i]).attr('id');
			var value = $(licence_fields[i]).val();

			to_save[key] = value.trim();
		}
		$('.messia-theme-licence-form-holder input[name="theme_licence_data"]').val(JSON.stringify(to_save));
	};

	const licenceAction = async function (action) {

		const
			tabsData = Messia.tabs_selector.data('general'),
			formData = new FormData(),
			form = $(this).parents('.messia-theme-licence-form-holder'),
			actions = form.find('.actions'),
			licenceKey = form.find('input[id="licence_key"]'),
			licenceStatus = form.find('input[id="licence_status"]');

		// In multisite env these data shown at network admin page only.
		if (form.length === 0 && actions.length === 0 && licenceKey.length === 0 && licenceStatus.length === 0) {
			return;
		}

		formData.append('action', 'messia_licence_action');
		formData.append('messiaNonce', tabsData.settingFormNonce);

		formData.append(
			'data',
			JSON.stringify({
				AJAX_Marker: messiaVars.AJAX_Marker,
				licence_action: action,
				licence_key: licenceKey.val().trim(),
				licence_status: licenceStatus.val(),
				is_network_admin: tabsData.isNetworkAdmin,
			})
		);

		const startAction = () => {
			if (actions.find('#loader_holder').find('.spinner').length > 0) return;
			const spinner = '<div class="spinner is-active"></div>';
			actions.find('#loader_holder').append(spinner);
		}

		const finishAction = (server) => {
			actions.find('#loader_holder .spinner').remove();

			switch (server.data.status_code) {
				case 'm200':
					const
						statusTitle = form.find('.status-title .status-value'),
						statusHandler = form.find('input#licence_status'),
						type = (server.data.response.status_code.startsWith('s')) ? 'success' : 'error';

					const draggable = $.fn.TabsPluginFrameWork('showMessage', server.data.response.message, type);

					form.attr('data-status', server.data.response.licence_status);
					statusHandler.val(server.data.response.licence_status);
					statusTitle.text(server.data.response.licence_status);
					licenceKey.val(server.data.key_val);
					$(this).val(server.data.btn_text);

					if (server.data.readonly) {
						licenceKey.attr('readonly', 'readonly');
					} else {
						licenceKey.removeAttr('readonly');
					}

					if (type === 'success' && server.data.reload) {

						draggable.then(result => {
							const reload = confirm(messiaVars.messages.reloadConfirm);
							if (reload) {
								window.location.reload();
							}
						});
					}

					saveLicenceData();
					$(document).trigger('messiaContentIsSaved');
					Messia.tabs_selector.trigger('resetSaveState');
					break;

				default:
					$.fn.TabsPluginFrameWork('showMessage', server.data.response.message, 'error');
					break;
			}
		}

		try {

			if (abortController != null) {
				abortController.abort();
				abortController = null;
			}

			abortController = new AbortController();
			startAction();
			const
				response = await fetch(messiaVars.ajaxUrl, {
					method: 'POST',
					body: formData,
					signal: abortController.signal,
				}),
				server = await response.json();
			finishAction(server);
		} catch (error) {
			if (error.name !== 'AbortError') {
				$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
				MessiaExt.logger.error(error);
			}
		}
	};

	const licenceDataSaved = function (e) {

		const
			saved_fields = JSON.parse($(this).val()),
			getters = $(this).parents('.data');

		for (let key in saved_fields) {
			getters.find(`#${key}`).val(saved_fields[key]);
		}
	};

	$('body').on('beforeSave', saveLicenceData);
	$('body').on('click', selectors.licenceHandler, licenceStatusToggle);
	$('.callback .messia-theme-licence-form-holder input[name="theme_licence_data"]').on('updated', licenceDataSaved);
	licenceAction.call(document.querySelector(selectors.licenceHandler), 'updateStatus');
};

/***/ }),

/***/ "./src/js/_backend/settings.js":
/*!*************************************!*\
  !*** ./src/js/_backend/settings.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			xhr: null,
			objects_search_slots: '.callback .objects_search_order_fileds .object_order:not(.template) input',
			criteria_fields: '.callback .rating_fileds .rating_criteria:not(.template) input',
			groups_fields: '.callback .groups_fields .property_group:not(.template) input',
			font_options: $('.callback .font-option-wrapper'),
			tabs_selector: $('#tabs'),
			font_family_selectors: $('select.font-family'),
			font_variant_selectors: $('select.font-variant'),
			font_subset_selectors: $('select.font-subset'),
			presetSaved: function (settings, extra_data) {

				if (extra_data != false) {
					for (var i = 0; i < extra_data.length; i++) {
						if (extra_data[i].statusCode === 500) {
							$.fn.TabsPluginFrameWork('showMessage', extra_data[i].messia_core, 'error');
						}
						else if (extra_data[i].statusCode === 300) {
							$.fn.TabsPluginFrameWork('showMessage', extra_data[i].messia_core, 'warning');
						}
						else {
							$.fn.TabsPluginFrameWork('showMessage', extra_data[i].messia_core, 'success');
						}
						$.fn.TabsPluginFrameWork('playSound', 0.3);
					}
				}
			},
			criteriaTmplInput: function (event) {
				var criteria_field = $(this).parents('.rating_criteria').removeClass('template');
				criteria_field.clone(true).addClass('template').insertBefore(criteria_field).find('input').val('');
				criteria_field.find('input').attr('id', Messia.getGUID());
			},
			serachOrderTmplInput: function (event) {
				Messia.bindAutocomplete($(this));
			},
			propertyGroupTmplInput: function (event) {
				var group_field = $(this).parents('.property_group').removeClass('template');
				group_field.clone(true).addClass('template').insertBefore(group_field).find('input').val('');
				group_field.find('input').attr('id', Messia.getGUID());
			},
			criteriaInput: function (event) {
				$(this).removeClass('empty');
			},
			serachOrderInput: function (event) {
				$(this).removeClass('empty');
			},
			propertyGroupInput: function (event) {
				$(this).removeClass('empty');
			},
			criteriaDelete: function (event) {
				$(this).parents('.rating_fileds').find('input[type="hidden"][name]').trigger('change');
				$(this).parents('.rating_criteria').remove();
			},
			serachOrderDelete: function (event) {
				$(this).parents('.objects_search_order_fileds').find('input[type="hidden"][name]').trigger('change');
				$(this).parents('.object_order').remove();
			},
			propertyGroupDelete: function (event) {
				$(this).parents('.groups_fields').find('input[type="hidden"][name]').trigger('change');
				$(this).parents('.property_group').remove();
			},
			getGUID: function () {
				return Math.random().toString(36).substr(2, 10);
			},
			makeElementsSortable: function (target) {
				target.sortable({
					items: '.rating_criteria:not(.template), .object_order:not(.template), .property_group:not(.template)',
					revert: 200,
					forceHelperSize: true,
					forcePlaceholderSize: true,
					opacity: 1,
					distance: 10,
					tolerance: 'intersect',
					scroll: true,
					scrollSensitivity: 20,
					containment: '#wpwrap',
					placeholder: 'sortable-placeholder',
					handle: '.handler.move',
					beforeStop: function (event, ui) { },
					start: function (event, ui) {
						ui.item.addClass('sorting');
					},
					stop: function (event, ui) {
						ui.item.removeClass('sorting');
						$(this).find('input[type="hidden"][name]').trigger('change');
					},
				});
			},
			saveCriterias: function (e) {

				var to_save = {};
				var criteria_fields = $(Messia.criteria_fields);

				for (var i = 0; i < criteria_fields.length; i++) {

					var value = $(criteria_fields[i]).val();

					if (value == '') {
						$(this).data('messiaProceedSaving').push(false);
						$(criteria_fields[i]).addClass('empty');
					}
					to_save[$(criteria_fields[i]).attr('id')] = $(criteria_fields[i]).val();
				}
				$('.callback .rating_fileds input[name="site_rating_terms"]').val(JSON.stringify(to_save));
			},
			saveSearchOrder: function (e) {

				var to_save = [];
				var objects_search_slots = $(Messia.objects_search_slots);

				for (var i = 0; i < objects_search_slots.length; i++) {

					var value = $(objects_search_slots[i]).val();

					if (value == '') {
						$(this).data('messiaProceedSaving').push(false);
						$(objects_search_slots[i]).addClass('empty');
					}
					var postid = $(objects_search_slots[i]).attr('postid');
					to_save.push({
						'postid': parseInt($(objects_search_slots[i]).attr('postid')),
						'title': $(objects_search_slots[i]).val()
					});
				}

				$('.callback .objects_search_order_fileds input[name="objects_search_order"]').val(JSON.stringify(to_save));
			},
			savePropertyGroups: function (e) {

				var to_save = {};
				var groups_fields = $(Messia.groups_fields);

				for (var i = 0; i < groups_fields.length; i++) {

					var id = $(groups_fields[i]).attr('id');
					var name = $(groups_fields[i]).data('name');
					var value = $(groups_fields[i]).val();

					if (value == '') {
						$(this).data('messiaProceedSaving').push(false);
						$(groups_fields[i]).addClass('empty');
					}
					if ('undefined' === typeof to_save[id]) {
						to_save[id] = {};
					}
					to_save[id][name] = value;
				}
				$('.callback .groups_fields input[name="property_groups"]').val(JSON.stringify(to_save));
			},
			saveFontOptions: function (e) {

				var font_option_slots = Messia.font_options;

				for (var i = 0; i < font_option_slots.length; i++) {

					var to_save = {};
					var option_slot = $(font_option_slots[i]);
					var font_options = option_slot.find('select.font-option, input.font-option');

					for (var q = 0; q < font_options.length; q++) {

						var font_option = $(font_options[q]);
						var key = font_option.data('key');
						var selected_option = ($(font_options[q]).is('select')) ? $(font_options[q]).find(':selected') : $(font_options[q]).is('input');

						if (font_option.hasClass('font-family')) {
							to_save['collection'] = selected_option.parent().data('collection');
						}

						var val = $(font_options[q]).val();
						var isNubmer = /^[-1-9]+$/.test(val);

						if (isNubmer) {
							to_save[$(font_options[q]).data('key')] = parseInt(val);
						}
						else {
							to_save[$(font_options[q]).data('key')] = val;
						}
					}

					option_slot.find('input[type="hidden"]#' + option_slot.data('dataHolderId')).val(JSON.stringify(to_save));
				}
			},
			criteriaSaved: function (e) {

				var saved_fields = JSON.parse($(this).val());
				var template = $('.callback .rating_fileds .rating_criteria.template');

				$('.callback .rating_fileds .rating_criteria:not(.template)').remove();

				for (let key in saved_fields) {

					var insert = template.clone(true).removeClass('template');
					insert.find('input').attr('id', key).val(saved_fields[key])
					insert.insertBefore($(this));
				}
			},
			serachOrderSaved: function (e) {

				var saved_fields = JSON.parse($(this).val());
				var template = $('.callback .objects_search_order_fileds .object_order.template');

				$('.callback .objects_search_order_fileds .object_order:not(.template)').remove();

				for (var i = 0; i < saved_fields.length; i++) {
					var insert = template.clone(true).removeClass('template');
					insert.find('input').attr('postid', saved_fields[i].postid).val(saved_fields[i].title)
					insert.insertBefore($(this));
				}
			},
			propertyGroupSaved: function (e) {

				var saved_fields = JSON.parse($(this).val());
				var template = $('.callback .groups_fields .property_group.template');

				$('.callback .groups_fields .property_group:not(.template)').remove();

				for (let key in saved_fields) {

					var insert = template.clone(true).removeClass('template');
					insert.find('input').attr('id', key).val(saved_fields[key]);
					insert.find('input[data-name="group_name"').attr('id', key).val(saved_fields[key]['group_name']);
					insert.insertBefore($(this));
				}
			},
			fontSaved: function (e) {

				var saved_fields = JSON.parse($(this).val());
				var font = $(this).parents('.font-option-wrapper');

				var family = font.find('select.font-family');
				var category = font.find('input.font-category');
				var variant = font.find('select.font-variant');
				var subset = font.find('select.font-subset');
				var size = font.find('input.font-size');
				var lineheight = font.find('input.line-height');
				var color = font.find('input.color');

				family.val(saved_fields.family);
				category.val(saved_fields.category);
				variant.val(saved_fields.variant);
				subset.val(saved_fields.subset);
				size.val(saved_fields.size);
				lineheight.val(saved_fields.line_height);
				color.val(saved_fields.color);
			},
			bindAutocomplete: function (element) {

				element.autocomplete({
					delay: 500,
					minLength: 3,
					position: { my: "left top", at: "left bottom-1" },
					source: function (request, response) {

						var exclude_ids = [0];
						var inputs = $(Messia.objects_search_slots);

						for (var i = 0; i < inputs.length; i++) {
							exclude_ids.push($(inputs[i]).attr('postid'));
						}

						Messia.xhr = $.ajax({
							type: 'POST',
							url: messiaVars.ajaxUrl,
							data: {
								action: 'search_objects',
								messiaNonce: messiaVars.messiaNonce,
								data: {
									AJAX_Marker: messiaVars.AJAX_Marker,
									try_name: request['term'],
									exclude_ids: exclude_ids,
								},
							},
							beforeSend: function () {

								if (Messia.xhr != null) {
									Messia.xhr.abort();
									Messia.xhr = null;
								}
							},
							success: function (server) {
								response(server.data.objects);
							},
							error: function (MLHttpRequest, textStatus, errorThrown) {

								if (Messia.xhr.status === 0 && Messia.xhr.statusText == 'abort') {
									return;
								}
							},
						});
					},
					select: function (event, ui) {

						var object_field = $(event.target).parents('.object_order');
						if (object_field.hasClass('template')) {

							var object_field = $(event.target).parents('.object_order').removeClass('template');
							object_field.clone().addClass('template').insertBefore(object_field).find('input').val('').on('input', Messia.serachOrderTmplInput);
						}
						$(event.target).attr('postid', ui.item.postid);
					},
					search(event, ui) {
						//nothing
					},
					open: function (event, ui) {
						$(event.target).autocomplete('widget').css('z-index', 101);
					},
					close: function (event, ui) {
						//nothing
					},
					change: function (event, ui) {

						var prev = $(event.target).data('uiAutocomplete').previous;

						if (typeof prev !== 'undefined' && prev !== '') {
							$(event.target).val(prev);
						}
					},
				});
			},
			updateFontCategory: function (e) {

				var category_data = $(this).find(':selected').data('category');
				var category_selector = $(this).parents('.font-option-wrapper').find('input.font-category');

				category_selector.val(category_data);

			},
			updateFontVariants: function (e) {

				var variants_data = $(this).find(':selected').data('variants');
				var subsets_data = $(this).find(':selected').attr('data-subsets');

				var variants_selector = $(this).parents('.font-option-wrapper').find('select.font-variant');

				var current_variant = variants_selector.val();
				var defVariant = 0;
				var newOptions = [];
				var newOption;
				var selected;

				variants_selector.val(null).empty();

				for (var i = 0; i < variants_data.length; i++) {

					selected = false;

					if (variants_data[i].id === current_variant) {
						// if variant exists in new variants set it as selected.
						selected = true;
					}
					if (variants_data[i].id === 'regular') {
						// if variant does not exists detect index of 'regular' variant.
						defVariant = i;
					}

					newOption = new Option(variants_data[i].text, variants_data[i].id, false, selected);
					newOption.setAttribute("data-subsets", subsets_data);

					newOptions.push(newOption);
				}

				if (selected === false) {
					newOptions[defVariant].selected = true;
				}

				variants_selector.append(newOptions);
				variants_selector.trigger('change');
				$(Messia.font_variant_selectors).trigger('select2:select');
			},
			updateFontSubsets: function (e) {

				var subsets_data = $(this).find(':selected').data('subsets');
				var subsets_selector = $(this).parents('.font-option-wrapper').find('select.font-subset');

				var current_subset = subsets_selector.val();
				var defSubset = 0;
				var newOptions = [];
				var newOption;
				var selected;

				subsets_selector.val(null).empty();

				for (var i = 0; i < subsets_data.length; i++) {

					selected = false;

					if (subsets_data[i].id === current_subset) {
						// if subset exists in new subsets set it as selected.
						selected = true;
					}
					if (subsets_data[i].id === 'latin') {
						// if subset does not exists detect index of 'latin' variant.
						defSubset = i;
					}

					newOption = new Option(subsets_data[i].text, subsets_data[i].id, false, selected);
					newOptions.push(newOption);
				}

				subsets_selector.append(newOptions);
				subsets_selector.trigger('change');
			},
			updateFontSizes: function (e) {

				var def = $(this).find(':selected').data('fontSize');

				if (typeof def === 'undefined') {
					return;
				}

				$(this).parents('.font-option-wrapper').find('input.font-size').val(def);
			},
			updateLineHeight: function (e) {

				var def = $(this).find(':selected').data('lineHeight');

				if (typeof def === 'undefined') {
					return;
				}

				$(this).parents('.font-option-wrapper').find('input.line-height').val(def);
			},
			selectMedia: function () {
				$(this).messiaMediaSelector(Messia.imageSelected);
			},
			removeMedia: function (event) {

				event.stopPropagation();
				var images = $(this).parents('.images');
				var multipleTemplate = images.find('.template.multiple');

				if (multipleTemplate.length > 0) {
					$(this).parents('.icon').remove();
				}
				else {
					$(this).removeClass('remove-image').addClass('placeholder-image').parent().removeAttr('id').find('.image').remove();
				}
				Messia.updateImagesInput(images);
				Messia.imagesSlotsSortableAbility(images);
			},
			imageSelected: function (caller, selection) {
				$.fn.messiaAppendMediaSelection(caller, selection);

				var images = caller.parents('.images');
				Messia.updateImagesInput(images);
				Messia.imagesSlotsSortableAbility(caller);
			},
			updateImagesInput: function (container) {
				var images = [];
				var icons = container.find('.icon');
				var dataGetter = container.find('input[type="hidden"]');

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
				dataGetter.trigger('change');
			},
			imagesSlotsSortableAbility: function (caller) {
				var container = caller.parents('.images');
				var slot = container.find('.images-slot');
				var icons = slot.find('.icon');

				if (icons.length <= 2) { // 1 image + 1 placeholder
					slot.sortable('disable');
				}
				else {
					slot.sortable('enable');
				}
			},
			imagesSlotsSortableInit: function () {

				var slots = $('.callback .images-slot');

				for (var i = 0; i < slots.length; i++) {

					var slot = $(slots[i]);

					slots.sortable({
						revert: 200,
						forceHelperSize: true,
						forcePlaceholderSize: true,
						opacity: 0.5,
						items: "> .icon[id]",
						distance: 10,
						tolerance: 'pointer',
						scroll: false,
						//handle: '.tmpl',
						//containment: '.icon-wrapper',
						placeholder: 'sortable-placeholder',
						beforeStop: function (event, ui) {
							ui.helper.css({
								'height': '',
								'width': '',
							});

							Messia.updateImagesInput(ui.item.parents('.images'));
						}
					});

					var container = slot.parents('.images');
					Messia.imagesSlotsSortableAbility(container);
				}
			},
		};

		__webpack_require__(/*! ./settings-licence.js */ "./src/js/_backend/settings-licence.js")(Messia, $);
		__webpack_require__(/*! ./settings-access.js */ "./src/js/_backend/settings-access.js")(Messia, $);

		$('.color-picker').spectrum({
			type: 'component',
			showInput: 'true',
			showInitial: 'true',
			allowEmpty: 'false',
		});

		Messia.imagesSlotsSortableInit();

		// Критерии оценка сайта
		Messia.makeElementsSortable($('.callback .rating_fileds'));
		$('.callback .rating_fileds').on('input', '.rating_criteria.template input', Messia.criteriaTmplInput);
		$('.callback .rating_fileds').on('input', '.rating_criteria:not(.template) input', Messia.criteriaInput);
		$('.callback .rating_fileds').on('click', '.rating_criteria:not(.template) .handler.remove', Messia.criteriaDelete);
		$('.callback .rating_fileds input[name="site_rating_terms"]').on('updated', Messia.criteriaSaved);

		// Порядок объектов в поисковой выдаче
		Messia.makeElementsSortable($('.callback .objects_search_order_fileds'));
		$('.callback .objects_search_order_fileds').on('input', '.object_order.template input', Messia.serachOrderTmplInput);
		$('.callback .objects_search_order_fileds').on('input', '.object_order:not(.template) input', Messia.serachOrderInput);
		$('.callback .objects_search_order_fileds').on('click', '.object_order:not(.template) .handler.remove', Messia.serachOrderDelete);
		$('.callback .objects_search_order_fileds input[name="objects_search_order"]').on('updated', Messia.serachOrderSaved);

		// Группы для таксономии Свойства
		Messia.makeElementsSortable($('.callback .groups_fields'));
		$('.callback .groups_fields').on('input', '.property_group.template input', Messia.propertyGroupTmplInput);
		$('.callback .groups_fields').on('input', '.property_group:not(.template) input', Messia.propertyGroupInput);
		$('.callback .groups_fields').on('click', '.property_group:not(.template) .handler.remove', Messia.propertyGroupDelete);
		$('.callback .groups_fields input[name="property_groups"]').on('updated', Messia.propertyGroupSaved);

		// Шрифты
		$('.callback .font-option-wrapper input.font-setting-holder').on('updated', Messia.fontSaved);

		// Медиа
		$('body').on('click touchstart', '.callback .images-slot .icon .edit-image', Messia.selectMedia);
		$('body').on('click touchstart', '.callback .images-slot .icon .remove-image', Messia.removeMedia);

		$('body').on('beforeSave', Messia.saveCriterias);
		$('body').on('beforeSave', Messia.savePropertyGroups);
		$('body').on('beforeSave', Messia.saveSearchOrder);
		$('body').on('beforeSave', Messia.saveFontOptions);
		$('body').on('beforeSave', Messia.saveLicenсeData);
		Messia.tabs_selector.on('presetSaved', function (e, settings, extra_data) {
			Messia.presetSaved(settings, extra_data);
		});

		for (var i = 0; i < $(Messia.objects_search_slots).length; i++) {
			Messia.bindAutocomplete($($(Messia.objects_search_slots)[i]));
		}

		if (false === $.fn.messiaIsMobile()) {
			$('select.font-option').select2({
				placeholder: messiaVars.messages.selectOptions,
				//width: '100%',
			});
		}

		$(Messia.font_family_selectors).on('select2:select', Messia.updateFontCategory);
		$(Messia.font_family_selectors).on('select2:select', Messia.updateFontVariants);
		$(Messia.font_family_selectors).on('select2:select', Messia.updateFontSizes);
		$(Messia.font_family_selectors).on('select2:select', Messia.updateLineHeight);

		$(Messia.font_variant_selectors).on('select2:select', Messia.updateFontSubsets);
		$(window).on("load", function (event) { });
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
/*!***********************************************!*\
  !*** ./src/entries/backend/entry-settings.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_settings_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/settings.scss */ "./src/scss/_backend/settings.scss");
/* harmony import */ var _js_backend_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/settings.js */ "./src/js/_backend/settings.js");
/* harmony import */ var _js_backend_settings_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_settings_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvc2V0dGluZ3MuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixrREFBa0Q7QUFDOUUsNEJBQTRCLHVEQUF1RDtBQUNuRjtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBLGtCQUFrQiwyQkFBMkI7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixJQUFJO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZKQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0Qjs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsaUNBQWlDOztBQUVyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLDBCQUEwQjs7QUFFOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBLG9CQUFvQiw4QkFBOEI7O0FBRWxEO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIseUJBQXlCOztBQUU5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIscUNBQXFDO0FBQ3REOztBQUVBO0FBQ0E7O0FBRUEsc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixPQUFPO0FBQ1AsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQiwwQkFBMEI7O0FBRTlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQix5QkFBeUI7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQSxvQkFBb0Isa0JBQWtCOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBLEVBQUUsbUJBQU8sQ0FBQyxvRUFBdUI7QUFDakMsRUFBRSxtQkFBTyxDQUFDLGtFQUFzQjs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILGtCQUFrQiwyQ0FBMkM7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQztBQUMzQyxFQUFFO0FBQ0YsQ0FBQzs7Ozs7O1VDNWtCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUMyQzs7QUFFM0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9fYmFja2VuZC9zZXR0aW5ncy5zY3NzP2RhMDMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL3NldHRpbmdzLWFjY2Vzcy5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2JhY2tlbmQvc2V0dGluZ3MtbGljZW5jZS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2JhY2tlbmQvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2JhY2tlbmQvZW50cnktc2V0dGluZ3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBNb2R1bGUgZm9yIGFjdGlvbnMgd2l0aCBzdXBwb3J0IHRlYW0gYWNjZXNzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNZXNzaWEsICQpIHtcblxuXHRsZXQgYWJvcnRDb250cm9sbGVyID0gbnVsbDtcblxuXHRjb25zdFxuXHRcdHNlbGVjdG9ycyA9IHtcblx0XHRcdGZvcm06ICcubWVzc2lhLXRoZW1lLWFjY2Vzcy1mb3JtLWhvbGRlcicsXG5cdFx0XHRhY2Nlc3NIYW5kbGVyOiAnI21lc3NpYS1zdXBwb3J0LXN0YXR1cy10b2dsZScsXG5cdFx0XHRyZXZva2VIYW5kbGVyOiAnI21lc3NpYS1zdXBwb3J0LXN0YXR1cy1yZXZva2UnLFxuXHRcdFx0YWNjZXNzRHVyYXRpb246ICdpbnB1dCNhY2Nlc3NfZHVyYXRpb24nLFxuXHRcdFx0YWNjZXNzRHVyYXRpb25Vbml0czogJ3NlbGVjdCNhY2Nlc3NfZHVyYXRpb25fdW5pdHMnLFxuXHRcdFx0YWNjZXNzVmFsdWU6ICdpbnB1dFtuYW1lPVwidGhlbWVfc3VwcG9ydF9hY2Nlc3NcIl0nLFxuXHRcdH0sXG5cdFx0Zm9ybXMgPSAkKHNlbGVjdG9ycy5mb3JtKTtcblxuXHRsZXQgYWNjZXNzRGF0YSA9IHtcblx0XHQnZHVyYXRpb24nOiBmYWxzZSxcblx0XHQndW5pdHMnOiBmYWxzZSxcblx0fTtcblxuXHRsZXQgYWNjZXNzU3RhdGUgPSB7fTtcblxuXHRjb25zdCBzZXRBY2Nlc3NTdGF0ZSA9IChmb3JtLCB2YWx1ZSA9IHt9KSA9PiB7XG5cblx0XHRhY2Nlc3NEYXRhID0ge1xuXHRcdFx0Li4uYWNjZXNzRGF0YSxcblx0XHRcdC4uLntcblx0XHRcdFx0ZHVyYXRpb246IHBhcnNlRmxvYXQoZm9ybS5maW5kKHNlbGVjdG9ycy5hY2Nlc3NEdXJhdGlvbikudmFsKCkpLFxuXHRcdFx0XHR1bml0czogZm9ybS5maW5kKHNlbGVjdG9ycy5hY2Nlc3NEdXJhdGlvblVuaXRzKS52YWwoKSxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWNjZXNzU3RhdGUgPSB7IC4uLmFjY2Vzc1N0YXRlLCAuLi52YWx1ZSB9O1xuXHRcdGZvcm0uZmluZChzZWxlY3RvcnMuYWNjZXNzVmFsdWUpLnZhbChKU09OLnN0cmluZ2lmeShhY2Nlc3NTdGF0ZSkpO1xuXHRcdGZvcm0udHJpZ2dlcignYWNjZXNzLXN0YXRlLWNoYW5nZScpO1xuXG5cdFx0cmV0dXJuIGFjY2Vzc1N0YXRlO1xuXHR9XG5cblx0Y29uc3QgZ2V0QWNjZXNzU3RhdGUgPSAoKSA9PiB7XG5cdFx0cmV0dXJuIGFjY2Vzc1N0YXRlO1xuXHR9XG5cblx0Y29uc3Qgb25BY2Nlc3NTdGF0ZUNoYW5nZSA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0XG5cdFx0XHRhY2Nlc3NTdGF0ZSA9IGdldEFjY2Vzc1N0YXRlKCksXG5cdFx0XHRhY2Nlc3NEdXJhdGlvbiA9ICQoZXZlbnQudGFyZ2V0KS5maW5kKHNlbGVjdG9ycy5hY2Nlc3NEdXJhdGlvbiksXG5cdFx0XHRyZXZva2VIYW5kbGVyID0gJChldmVudC50YXJnZXQpLmZpbmQoc2VsZWN0b3JzLnJldm9rZUhhbmRsZXIpLFxuXHRcdFx0YWNjZXNzSGFuZGxlciA9ICQoZXZlbnQudGFyZ2V0KS5maW5kKHNlbGVjdG9ycy5hY2Nlc3NIYW5kbGVyKTtcblxuXHRcdC8vIFJldm9rZS5cblx0XHRpZiAoYWNjZXNzU3RhdGUuYWNjZXNzX3ZhbGlkX3VudGlsID09PSBmYWxzZSkge1xuXHRcdFx0cmV2b2tlSGFuZGxlclxuXHRcdFx0XHQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0XHQub2ZmKCdjbGljaycsIGFjY2Vzc0FjdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldm9rZUhhbmRsZXJcblx0XHRcdFx0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJywgYWNjZXNzQWN0aW9uKVxuXHRcdFx0XHQub24oJ2NsaWNrJywgYWNjZXNzQWN0aW9uKTtcblx0XHR9XG5cblx0XHQvLyBHcmFudFxuXHRcdGlmIChhY2Nlc3NEdXJhdGlvblZhbGlkYXRlKGFjY2Vzc0R1cmF0aW9uKSkge1xuXHRcdFx0YWNjZXNzSGFuZGxlclxuXHRcdFx0XHQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcblx0XHRcdFx0Lm9mZignY2xpY2snLCBhY2Nlc3NBY3Rpb24pXG5cdFx0XHRcdC5vbignY2xpY2snLCBhY2Nlc3NBY3Rpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhY2Nlc3NIYW5kbGVyXG5cdFx0XHRcdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJywgYWNjZXNzQWN0aW9uKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBvbkFjY2Vzc0R1cmF0aW9uQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG5cblx0XHRjb25zdFxuXHRcdFx0dGFyZ2V0ID0gJChldmVudC50YXJnZXQpLFxuXHRcdFx0Zm9ybSA9IHRhcmdldC5wYXJlbnRzKHNlbGVjdG9ycy5mb3JtKTtcblxuXHRcdHNldEFjY2Vzc1N0YXRlKGZvcm0pO1xuXHR9O1xuXG5cdGNvbnN0IGFjY2Vzc0R1cmF0aW9uVW5pdHNDaGFuZ2UgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdFxuXHRcdFx0dGFyZ2V0ID0gJChldmVudC50YXJnZXQpLFxuXHRcdFx0dW5pdHMgPSB0YXJnZXQudmFsKCksXG5cdFx0XHRkdXJhdGlvbkVsID0gdGFyZ2V0LnByZXYoc2VsZWN0b3JzLmFjY2Vzc0R1cmF0aW9uKSxcblx0XHRcdG1hcCA9IGR1cmF0aW9uRWwuZGF0YSgnbWFwJyk7XG5cblx0XHRkdXJhdGlvbkVsLmF0dHIoe1xuXHRcdFx0J21pbic6IG1hcFt1bml0c10ubWluLFxuXHRcdFx0J21heCc6IG1hcFt1bml0c10ubWF4LFxuXHRcdH0pO1xuXHRcdGR1cmF0aW9uRWwudmFsKG1hcFt1bml0c10ubWluKS50cmlnZ2VyKCdpbnB1dCcpO1xuXHR9O1xuXG5cdGNvbnN0IGFjY2Vzc0R1cmF0aW9uVmFsaWRhdGUgPSAoZWxlbSkgPT4ge1xuXHRcdGNvbnN0XG5cdFx0XHRtYXAgPSBlbGVtLmRhdGEoJ21hcCcpLFxuXHRcdFx0ZHVyYXRpb24gPSBwYXJzZUZsb2F0KGVsZW0udmFsKCkpLFxuXHRcdFx0dW5pdHMgPSBlbGVtLm5leHQoc2VsZWN0b3JzLmFjY2Vzc0R1cmF0aW9uVW5pdHMpLnZhbCgpO1xuXG5cdFx0aWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiAoZHVyYXRpb24gPj0gbWFwW3VuaXRzXS5taW4gJiYgZHVyYXRpb24gPD0gbWFwW3VuaXRzXS5tYXgpO1xuXHR9O1xuXG5cdGNvbnN0IGFjY2Vzc0FjdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0Y29uc3Rcblx0XHRcdHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KSxcblx0XHRcdGZvcm0gPSB0YXJnZXQucGFyZW50cyhzZWxlY3RvcnMuZm9ybSksXG5cdFx0XHR0YWJzRGF0YSA9IE1lc3NpYS50YWJzX3NlbGVjdG9yLmRhdGEoJ2dlbmVyYWwnKSxcblx0XHRcdGFjdGlvbnMgPSBmb3JtLmZpbmQoJy5hY3Rpb25zJyksXG5cdFx0XHRmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdhY3Rpb24nLCAnbWVzc2lhX2FjY2Vzc19hY3Rpb24nKTtcblx0XHRmb3JtRGF0YS5hcHBlbmQoJ21lc3NpYU5vbmNlJywgdGFic0RhdGEuc2V0dGluZ0Zvcm1Ob25jZSk7XG5cblx0XHRmb3JtRGF0YS5hcHBlbmQoXG5cdFx0XHQnZGF0YScsXG5cdFx0XHRKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdEFKQVhfTWFya2VyOiBtZXNzaWFWYXJzLkFKQVhfTWFya2VyLFxuXHRcdFx0XHRhY2Nlc3NfZGF0YTogYWNjZXNzRGF0YSxcblx0XHRcdFx0b3BlcmF0aW9uOiAkKHRoaXMpLmRhdGEoJ29wZXJhdGlvbicpLFxuXHRcdFx0fSlcblx0XHQpO1xuXG5cdFx0Y29uc3Qgc3RhcnRBY3Rpb24gPSAoKSA9PiB7XG5cdFx0XHRpZiAoYWN0aW9ucy5maW5kKCcjbG9hZGVyX2hvbGRlcicpLmZpbmQoJy5zcGlubmVyJykubGVuZ3RoID4gMCkgcmV0dXJuO1xuXHRcdFx0Y29uc3Qgc3Bpbm5lciA9ICc8ZGl2IGNsYXNzPVwic3Bpbm5lciBpcy1hY3RpdmVcIj48L2Rpdj4nO1xuXHRcdFx0YWN0aW9ucy5maW5kKCcjbG9hZGVyX2hvbGRlcicpLmFwcGVuZChzcGlubmVyKTtcblx0XHR9XG5cblx0XHRjb25zdCBmaW5pc2hBY3Rpb24gPSAoc2VydmVyKSA9PiB7XG5cdFx0XHRhY3Rpb25zLmZpbmQoJyNsb2FkZXJfaG9sZGVyIC5zcGlubmVyJykucmVtb3ZlKCk7XG5cblx0XHRcdHN3aXRjaCAoc2VydmVyLmRhdGEuc3RhdHVzX2NvZGUpIHtcblx0XHRcdFx0Y2FzZSAnbTIwMCc6XG5cdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIHNlcnZlci5kYXRhLnVzZXIubWVzc2FnZSwgJ3N1Y2Nlc3MnKTtcblxuXHRcdFx0XHRcdGZvcm0uYXR0cignZGF0YS1hY2Nlc3MtZ3JhbnRlZCcsIHNlcnZlci5kYXRhLmFjY2Vzc19ncmFudGVkKTtcblx0XHRcdFx0XHRmb3JtLmZpbmQoJy5zdGF0dXMtdGl0bGUgLnN0YXR1cy12YWx1ZScpLnRleHQoc2VydmVyLmRhdGEuc3RhdHVzX3RpdGxlKTtcblx0XHRcdFx0XHRmb3JtLmZpbmQoc2VsZWN0b3JzLmFjY2Vzc0hhbmRsZXIpLnZhbChzZXJ2ZXIuZGF0YS5idG5fdGV4dCk7XG5cdFx0XHRcdFx0Zm9ybS5maW5kKHNlbGVjdG9ycy5hY2Nlc3NEdXJhdGlvbikudmFsKCcnKTtcblxuXHRcdFx0XHRcdHNldEFjY2Vzc1N0YXRlKGZvcm0sIHtcblx0XHRcdFx0XHRcdGFjY2Vzc192YWxpZF91bnRpbDogc2VydmVyLmRhdGEuYWNjZXNzX3ZhbGlkX3VudGlsLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbWVzc2lhQ29udGVudElzU2F2ZWQnKTtcblx0XHRcdFx0XHRNZXNzaWEudGFic19zZWxlY3Rvci50cmlnZ2VyKCdyZXNldFNhdmVTdGF0ZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIHNlcnZlci5kYXRhLnVzZXIubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblxuXHRcdFx0aWYgKGFib3J0Q29udHJvbGxlciAhPSBudWxsKSB7XG5cdFx0XHRcdGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHRcdFx0XHRhYm9ydENvbnRyb2xsZXIgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdFx0XHRzdGFydEFjdGlvbigpO1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0cmVzcG9uc2UgPSBhd2FpdCBmZXRjaChtZXNzaWFWYXJzLmFqYXhVcmwsIHtcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRib2R5OiBmb3JtRGF0YSxcblx0XHRcdFx0XHRzaWduYWw6IGFib3J0Q29udHJvbGxlci5zaWduYWwsXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRzZXJ2ZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRmaW5pc2hBY3Rpb24oc2VydmVyKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0aWYgKGVycm9yLm5hbWUgIT09ICdBYm9ydEVycm9yJykge1xuXHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRhYm9ydENvbnRyb2xsZXIgPSBudWxsO1xuXHRcdH1cblx0fTtcblxuXHRmb3Jtcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQkKCdib2R5Jykub24oJ2lucHV0JywgYCMkeyQodGhpcykuZmluZChzZWxlY3RvcnMuYWNjZXNzRHVyYXRpb24pLmF0dHIoJ2lkJyl9YCwgb25BY2Nlc3NEdXJhdGlvbkNoYW5nZSk7XG5cdFx0JCgnYm9keScpLm9uKCdpbnB1dCcsIGAjJHskKHRoaXMpLmZpbmQoc2VsZWN0b3JzLmFjY2Vzc0R1cmF0aW9uVW5pdHMpLmF0dHIoJ2lkJyl9YCwgYWNjZXNzRHVyYXRpb25Vbml0c0NoYW5nZSk7XG5cdFx0JCgnYm9keScpLm9uKCdhY2Nlc3Mtc3RhdGUtY2hhbmdlJywgc2VsZWN0b3JzLmZvcm0sIG9uQWNjZXNzU3RhdGVDaGFuZ2UpO1xuXHRcdHNldEFjY2Vzc1N0YXRlKCQodGhpcyksIEpTT04ucGFyc2UoZm9ybXMuZmluZChzZWxlY3RvcnMuYWNjZXNzVmFsdWUpLnZhbCgpKSk7XG5cdH0pO1xufTsiLCIvKipcbiAqIE1vZHVsZSBmb3IgYWN0aW9ucyB3aXRoIGxpY2VuY2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1lc3NpYSwgJCkge1xuXG5cdGxldCBhYm9ydENvbnRyb2xsZXIgPSBudWxsO1xuXG5cdGNvbnN0IHNlbGVjdG9ycyA9IHtcblx0XHRsaWNlbmNlSGFuZGxlcjogJy5tZXNzaWEtdGhlbWUtbGljZW5jZS1mb3JtLWhvbGRlciAjbWVzc2lhLWxpY2VuY2Utc3RhdHVzLXRvZ2xlJyxcblx0XHRsaWNlbmNlRmllbGRzOiAnLm1lc3NpYS10aGVtZS1saWNlbmNlLWZvcm0taG9sZGVyIGlucHV0I2xpY2VuY2Vfa2V5LCAubWVzc2lhLXRoZW1lLWxpY2VuY2UtZm9ybS1ob2xkZXIgaW5wdXQjbGljZW5jZV9zdGF0dXMnLFxuXHR9O1xuXG5cdGNvbnN0IGxpY2VuY2VTdGF0dXNUb2dnbGUgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGxpY2VuY2VBY3Rpb24uY2FsbCh0aGlzLCAndG9nZ2xlU3RhdHVzJyk7XG5cdH07XG5cblx0Y29uc3Qgc2F2ZUxpY2VuY2VEYXRhID0gKGUpID0+IHtcblx0XHRjb25zdFxuXHRcdFx0dG9fc2F2ZSA9IHt9LFxuXHRcdFx0bGljZW5jZV9maWVsZHMgPSAkKHNlbGVjdG9ycy5saWNlbmNlRmllbGRzKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGljZW5jZV9maWVsZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0dmFyIGtleSA9ICQobGljZW5jZV9maWVsZHNbaV0pLmF0dHIoJ2lkJyk7XG5cdFx0XHR2YXIgdmFsdWUgPSAkKGxpY2VuY2VfZmllbGRzW2ldKS52YWwoKTtcblxuXHRcdFx0dG9fc2F2ZVtrZXldID0gdmFsdWUudHJpbSgpO1xuXHRcdH1cblx0XHQkKCcubWVzc2lhLXRoZW1lLWxpY2VuY2UtZm9ybS1ob2xkZXIgaW5wdXRbbmFtZT1cInRoZW1lX2xpY2VuY2VfZGF0YVwiXScpLnZhbChKU09OLnN0cmluZ2lmeSh0b19zYXZlKSk7XG5cdH07XG5cblx0Y29uc3QgbGljZW5jZUFjdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChhY3Rpb24pIHtcblxuXHRcdGNvbnN0XG5cdFx0XHR0YWJzRGF0YSA9IE1lc3NpYS50YWJzX3NlbGVjdG9yLmRhdGEoJ2dlbmVyYWwnKSxcblx0XHRcdGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCksXG5cdFx0XHRmb3JtID0gJCh0aGlzKS5wYXJlbnRzKCcubWVzc2lhLXRoZW1lLWxpY2VuY2UtZm9ybS1ob2xkZXInKSxcblx0XHRcdGFjdGlvbnMgPSBmb3JtLmZpbmQoJy5hY3Rpb25zJyksXG5cdFx0XHRsaWNlbmNlS2V5ID0gZm9ybS5maW5kKCdpbnB1dFtpZD1cImxpY2VuY2Vfa2V5XCJdJyksXG5cdFx0XHRsaWNlbmNlU3RhdHVzID0gZm9ybS5maW5kKCdpbnB1dFtpZD1cImxpY2VuY2Vfc3RhdHVzXCJdJyk7XG5cblx0XHQvLyBJbiBtdWx0aXNpdGUgZW52IHRoZXNlIGRhdGEgc2hvd24gYXQgbmV0d29yayBhZG1pbiBwYWdlIG9ubHkuXG5cdFx0aWYgKGZvcm0ubGVuZ3RoID09PSAwICYmIGFjdGlvbnMubGVuZ3RoID09PSAwICYmIGxpY2VuY2VLZXkubGVuZ3RoID09PSAwICYmIGxpY2VuY2VTdGF0dXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdhY3Rpb24nLCAnbWVzc2lhX2xpY2VuY2VfYWN0aW9uJyk7XG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdtZXNzaWFOb25jZScsIHRhYnNEYXRhLnNldHRpbmdGb3JtTm9uY2UpO1xuXG5cdFx0Zm9ybURhdGEuYXBwZW5kKFxuXHRcdFx0J2RhdGEnLFxuXHRcdFx0SlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRBSkFYX01hcmtlcjogbWVzc2lhVmFycy5BSkFYX01hcmtlcixcblx0XHRcdFx0bGljZW5jZV9hY3Rpb246IGFjdGlvbixcblx0XHRcdFx0bGljZW5jZV9rZXk6IGxpY2VuY2VLZXkudmFsKCkudHJpbSgpLFxuXHRcdFx0XHRsaWNlbmNlX3N0YXR1czogbGljZW5jZVN0YXR1cy52YWwoKSxcblx0XHRcdFx0aXNfbmV0d29ya19hZG1pbjogdGFic0RhdGEuaXNOZXR3b3JrQWRtaW4sXG5cdFx0XHR9KVxuXHRcdCk7XG5cblx0XHRjb25zdCBzdGFydEFjdGlvbiA9ICgpID0+IHtcblx0XHRcdGlmIChhY3Rpb25zLmZpbmQoJyNsb2FkZXJfaG9sZGVyJykuZmluZCgnLnNwaW5uZXInKS5sZW5ndGggPiAwKSByZXR1cm47XG5cdFx0XHRjb25zdCBzcGlubmVyID0gJzxkaXYgY2xhc3M9XCJzcGlubmVyIGlzLWFjdGl2ZVwiPjwvZGl2Pic7XG5cdFx0XHRhY3Rpb25zLmZpbmQoJyNsb2FkZXJfaG9sZGVyJykuYXBwZW5kKHNwaW5uZXIpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZpbmlzaEFjdGlvbiA9IChzZXJ2ZXIpID0+IHtcblx0XHRcdGFjdGlvbnMuZmluZCgnI2xvYWRlcl9ob2xkZXIgLnNwaW5uZXInKS5yZW1vdmUoKTtcblxuXHRcdFx0c3dpdGNoIChzZXJ2ZXIuZGF0YS5zdGF0dXNfY29kZSkge1xuXHRcdFx0XHRjYXNlICdtMjAwJzpcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0c3RhdHVzVGl0bGUgPSBmb3JtLmZpbmQoJy5zdGF0dXMtdGl0bGUgLnN0YXR1cy12YWx1ZScpLFxuXHRcdFx0XHRcdFx0c3RhdHVzSGFuZGxlciA9IGZvcm0uZmluZCgnaW5wdXQjbGljZW5jZV9zdGF0dXMnKSxcblx0XHRcdFx0XHRcdHR5cGUgPSAoc2VydmVyLmRhdGEucmVzcG9uc2Uuc3RhdHVzX2NvZGUuc3RhcnRzV2l0aCgncycpKSA/ICdzdWNjZXNzJyA6ICdlcnJvcic7XG5cblx0XHRcdFx0XHRjb25zdCBkcmFnZ2FibGUgPSAkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgc2VydmVyLmRhdGEucmVzcG9uc2UubWVzc2FnZSwgdHlwZSk7XG5cblx0XHRcdFx0XHRmb3JtLmF0dHIoJ2RhdGEtc3RhdHVzJywgc2VydmVyLmRhdGEucmVzcG9uc2UubGljZW5jZV9zdGF0dXMpO1xuXHRcdFx0XHRcdHN0YXR1c0hhbmRsZXIudmFsKHNlcnZlci5kYXRhLnJlc3BvbnNlLmxpY2VuY2Vfc3RhdHVzKTtcblx0XHRcdFx0XHRzdGF0dXNUaXRsZS50ZXh0KHNlcnZlci5kYXRhLnJlc3BvbnNlLmxpY2VuY2Vfc3RhdHVzKTtcblx0XHRcdFx0XHRsaWNlbmNlS2V5LnZhbChzZXJ2ZXIuZGF0YS5rZXlfdmFsKTtcblx0XHRcdFx0XHQkKHRoaXMpLnZhbChzZXJ2ZXIuZGF0YS5idG5fdGV4dCk7XG5cblx0XHRcdFx0XHRpZiAoc2VydmVyLmRhdGEucmVhZG9ubHkpIHtcblx0XHRcdFx0XHRcdGxpY2VuY2VLZXkuYXR0cigncmVhZG9ubHknLCAncmVhZG9ubHknKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGljZW5jZUtleS5yZW1vdmVBdHRyKCdyZWFkb25seScpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlID09PSAnc3VjY2VzcycgJiYgc2VydmVyLmRhdGEucmVsb2FkKSB7XG5cblx0XHRcdFx0XHRcdGRyYWdnYWJsZS50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlbG9hZCA9IGNvbmZpcm0obWVzc2lhVmFycy5tZXNzYWdlcy5yZWxvYWRDb25maXJtKTtcblx0XHRcdFx0XHRcdFx0aWYgKHJlbG9hZCkge1xuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2F2ZUxpY2VuY2VEYXRhKCk7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbWVzc2lhQ29udGVudElzU2F2ZWQnKTtcblx0XHRcdFx0XHRNZXNzaWEudGFic19zZWxlY3Rvci50cmlnZ2VyKCdyZXNldFNhdmVTdGF0ZScpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIHNlcnZlci5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UsICdlcnJvcicpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cblx0XHRcdGlmIChhYm9ydENvbnRyb2xsZXIgIT0gbnVsbCkge1xuXHRcdFx0XHRhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcblx0XHRcdFx0YWJvcnRDb250cm9sbGVyID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0YWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRcdFx0c3RhcnRBY3Rpb24oKTtcblx0XHRcdGNvbnN0XG5cdFx0XHRcdHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobWVzc2lhVmFycy5hamF4VXJsLCB7XG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0Ym9keTogZm9ybURhdGEsXG5cdFx0XHRcdFx0c2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuXHRcdFx0XHR9KSxcblx0XHRcdFx0c2VydmVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0ZmluaXNoQWN0aW9uKHNlcnZlcik7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChlcnJvci5uYW1lICE9PSAnQWJvcnRFcnJvcicpIHtcblx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIGVycm9yLm1lc3NhZ2UsICdlcnJvcicpO1xuXHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKGVycm9yKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Y29uc3QgbGljZW5jZURhdGFTYXZlZCA9IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRjb25zdFxuXHRcdFx0c2F2ZWRfZmllbGRzID0gSlNPTi5wYXJzZSgkKHRoaXMpLnZhbCgpKSxcblx0XHRcdGdldHRlcnMgPSAkKHRoaXMpLnBhcmVudHMoJy5kYXRhJyk7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gc2F2ZWRfZmllbGRzKSB7XG5cdFx0XHRnZXR0ZXJzLmZpbmQoYCMke2tleX1gKS52YWwoc2F2ZWRfZmllbGRzW2tleV0pO1xuXHRcdH1cblx0fTtcblxuXHQkKCdib2R5Jykub24oJ2JlZm9yZVNhdmUnLCBzYXZlTGljZW5jZURhdGEpO1xuXHQkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZWN0b3JzLmxpY2VuY2VIYW5kbGVyLCBsaWNlbmNlU3RhdHVzVG9nZ2xlKTtcblx0JCgnLmNhbGxiYWNrIC5tZXNzaWEtdGhlbWUtbGljZW5jZS1mb3JtLWhvbGRlciBpbnB1dFtuYW1lPVwidGhlbWVfbGljZW5jZV9kYXRhXCJdJykub24oJ3VwZGF0ZWQnLCBsaWNlbmNlRGF0YVNhdmVkKTtcblx0bGljZW5jZUFjdGlvbi5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmxpY2VuY2VIYW5kbGVyKSwgJ3VwZGF0ZVN0YXR1cycpO1xufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHR2YXIgTWVzc2lhO1xuXG5cdFx0TWVzc2lhID0ge1xuXHRcdFx0eGhyOiBudWxsLFxuXHRcdFx0b2JqZWN0c19zZWFyY2hfc2xvdHM6ICcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcyAub2JqZWN0X29yZGVyOm5vdCgudGVtcGxhdGUpIGlucHV0Jyxcblx0XHRcdGNyaXRlcmlhX2ZpZWxkczogJy5jYWxsYmFjayAucmF0aW5nX2ZpbGVkcyAucmF0aW5nX2NyaXRlcmlhOm5vdCgudGVtcGxhdGUpIGlucHV0Jyxcblx0XHRcdGdyb3Vwc19maWVsZHM6ICcuY2FsbGJhY2sgLmdyb3Vwc19maWVsZHMgLnByb3BlcnR5X2dyb3VwOm5vdCgudGVtcGxhdGUpIGlucHV0Jyxcblx0XHRcdGZvbnRfb3B0aW9uczogJCgnLmNhbGxiYWNrIC5mb250LW9wdGlvbi13cmFwcGVyJyksXG5cdFx0XHR0YWJzX3NlbGVjdG9yOiAkKCcjdGFicycpLFxuXHRcdFx0Zm9udF9mYW1pbHlfc2VsZWN0b3JzOiAkKCdzZWxlY3QuZm9udC1mYW1pbHknKSxcblx0XHRcdGZvbnRfdmFyaWFudF9zZWxlY3RvcnM6ICQoJ3NlbGVjdC5mb250LXZhcmlhbnQnKSxcblx0XHRcdGZvbnRfc3Vic2V0X3NlbGVjdG9yczogJCgnc2VsZWN0LmZvbnQtc3Vic2V0JyksXG5cdFx0XHRwcmVzZXRTYXZlZDogZnVuY3Rpb24gKHNldHRpbmdzLCBleHRyYV9kYXRhKSB7XG5cblx0XHRcdFx0aWYgKGV4dHJhX2RhdGEgIT0gZmFsc2UpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV4dHJhX2RhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChleHRyYV9kYXRhW2ldLnN0YXR1c0NvZGUgPT09IDUwMCkge1xuXHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXh0cmFfZGF0YVtpXS5tZXNzaWFfY29yZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChleHRyYV9kYXRhW2ldLnN0YXR1c0NvZGUgPT09IDMwMCkge1xuXHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXh0cmFfZGF0YVtpXS5tZXNzaWFfY29yZSwgJ3dhcm5pbmcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXh0cmFfZGF0YVtpXS5tZXNzaWFfY29yZSwgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygncGxheVNvdW5kJywgMC4zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcml0ZXJpYVRtcGxJbnB1dDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBjcml0ZXJpYV9maWVsZCA9ICQodGhpcykucGFyZW50cygnLnJhdGluZ19jcml0ZXJpYScpLnJlbW92ZUNsYXNzKCd0ZW1wbGF0ZScpO1xuXHRcdFx0XHRjcml0ZXJpYV9maWVsZC5jbG9uZSh0cnVlKS5hZGRDbGFzcygndGVtcGxhdGUnKS5pbnNlcnRCZWZvcmUoY3JpdGVyaWFfZmllbGQpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcblx0XHRcdFx0Y3JpdGVyaWFfZmllbGQuZmluZCgnaW5wdXQnKS5hdHRyKCdpZCcsIE1lc3NpYS5nZXRHVUlEKCkpO1xuXHRcdFx0fSxcblx0XHRcdHNlcmFjaE9yZGVyVG1wbElucHV0OiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0TWVzc2lhLmJpbmRBdXRvY29tcGxldGUoJCh0aGlzKSk7XG5cdFx0XHR9LFxuXHRcdFx0cHJvcGVydHlHcm91cFRtcGxJbnB1dDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBncm91cF9maWVsZCA9ICQodGhpcykucGFyZW50cygnLnByb3BlcnR5X2dyb3VwJykucmVtb3ZlQ2xhc3MoJ3RlbXBsYXRlJyk7XG5cdFx0XHRcdGdyb3VwX2ZpZWxkLmNsb25lKHRydWUpLmFkZENsYXNzKCd0ZW1wbGF0ZScpLmluc2VydEJlZm9yZShncm91cF9maWVsZCkuZmluZCgnaW5wdXQnKS52YWwoJycpO1xuXHRcdFx0XHRncm91cF9maWVsZC5maW5kKCdpbnB1dCcpLmF0dHIoJ2lkJywgTWVzc2lhLmdldEdVSUQoKSk7XG5cdFx0XHR9LFxuXHRcdFx0Y3JpdGVyaWFJbnB1dDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2VtcHR5Jyk7XG5cdFx0XHR9LFxuXHRcdFx0c2VyYWNoT3JkZXJJbnB1dDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2VtcHR5Jyk7XG5cdFx0XHR9LFxuXHRcdFx0cHJvcGVydHlHcm91cElucHV0OiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnZW1wdHknKTtcblx0XHRcdH0sXG5cdFx0XHRjcml0ZXJpYURlbGV0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdCQodGhpcykucGFyZW50cygnLnJhdGluZ19maWxlZHMnKS5maW5kKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdW25hbWVdJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdCQodGhpcykucGFyZW50cygnLnJhdGluZ19jcml0ZXJpYScpLnJlbW92ZSgpO1xuXHRcdFx0fSxcblx0XHRcdHNlcmFjaE9yZGVyRGVsZXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcub2JqZWN0c19zZWFyY2hfb3JkZXJfZmlsZWRzJykuZmluZCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXVtuYW1lXScpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy5vYmplY3Rfb3JkZXInKS5yZW1vdmUoKTtcblx0XHRcdH0sXG5cdFx0XHRwcm9wZXJ0eUdyb3VwRGVsZXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcuZ3JvdXBzX2ZpZWxkcycpLmZpbmQoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl1bbmFtZV0nKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcucHJvcGVydHlfZ3JvdXAnKS5yZW1vdmUoKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRHVUlEOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xuXHRcdFx0fSxcblx0XHRcdG1ha2VFbGVtZW50c1NvcnRhYmxlOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdFx0XHRcdHRhcmdldC5zb3J0YWJsZSh7XG5cdFx0XHRcdFx0aXRlbXM6ICcucmF0aW5nX2NyaXRlcmlhOm5vdCgudGVtcGxhdGUpLCAub2JqZWN0X29yZGVyOm5vdCgudGVtcGxhdGUpLCAucHJvcGVydHlfZ3JvdXA6bm90KC50ZW1wbGF0ZSknLFxuXHRcdFx0XHRcdHJldmVydDogMjAwLFxuXHRcdFx0XHRcdGZvcmNlSGVscGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0XHRmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0XHRcdGRpc3RhbmNlOiAxMCxcblx0XHRcdFx0XHR0b2xlcmFuY2U6ICdpbnRlcnNlY3QnLFxuXHRcdFx0XHRcdHNjcm9sbDogdHJ1ZSxcblx0XHRcdFx0XHRzY3JvbGxTZW5zaXRpdml0eTogMjAsXG5cdFx0XHRcdFx0Y29udGFpbm1lbnQ6ICcjd3B3cmFwJyxcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJ3NvcnRhYmxlLXBsYWNlaG9sZGVyJyxcblx0XHRcdFx0XHRoYW5kbGU6ICcuaGFuZGxlci5tb3ZlJyxcblx0XHRcdFx0XHRiZWZvcmVTdG9wOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7IH0sXG5cdFx0XHRcdFx0c3RhcnQ6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ3NvcnRpbmcnKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN0b3A6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHRcdHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ3NvcnRpbmcnKTtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXVtuYW1lXScpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHNhdmVDcml0ZXJpYXM6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHRvX3NhdmUgPSB7fTtcblx0XHRcdFx0dmFyIGNyaXRlcmlhX2ZpZWxkcyA9ICQoTWVzc2lhLmNyaXRlcmlhX2ZpZWxkcyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjcml0ZXJpYV9maWVsZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdHZhciB2YWx1ZSA9ICQoY3JpdGVyaWFfZmllbGRzW2ldKS52YWwoKTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PSAnJykge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtZXNzaWFQcm9jZWVkU2F2aW5nJykucHVzaChmYWxzZSk7XG5cdFx0XHRcdFx0XHQkKGNyaXRlcmlhX2ZpZWxkc1tpXSkuYWRkQ2xhc3MoJ2VtcHR5Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRvX3NhdmVbJChjcml0ZXJpYV9maWVsZHNbaV0pLmF0dHIoJ2lkJyldID0gJChjcml0ZXJpYV9maWVsZHNbaV0pLnZhbCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoJy5jYWxsYmFjayAucmF0aW5nX2ZpbGVkcyBpbnB1dFtuYW1lPVwic2l0ZV9yYXRpbmdfdGVybXNcIl0nKS52YWwoSlNPTi5zdHJpbmdpZnkodG9fc2F2ZSkpO1xuXHRcdFx0fSxcblx0XHRcdHNhdmVTZWFyY2hPcmRlcjogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdG9fc2F2ZSA9IFtdO1xuXHRcdFx0XHR2YXIgb2JqZWN0c19zZWFyY2hfc2xvdHMgPSAkKE1lc3NpYS5vYmplY3RzX3NlYXJjaF9zbG90cyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzX3NlYXJjaF9zbG90cy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gJChvYmplY3RzX3NlYXJjaF9zbG90c1tpXSkudmFsKCk7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgPT0gJycpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZGF0YSgnbWVzc2lhUHJvY2VlZFNhdmluZycpLnB1c2goZmFsc2UpO1xuXHRcdFx0XHRcdFx0JChvYmplY3RzX3NlYXJjaF9zbG90c1tpXSkuYWRkQ2xhc3MoJ2VtcHR5Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBwb3N0aWQgPSAkKG9iamVjdHNfc2VhcmNoX3Nsb3RzW2ldKS5hdHRyKCdwb3N0aWQnKTtcblx0XHRcdFx0XHR0b19zYXZlLnB1c2goe1xuXHRcdFx0XHRcdFx0J3Bvc3RpZCc6IHBhcnNlSW50KCQob2JqZWN0c19zZWFyY2hfc2xvdHNbaV0pLmF0dHIoJ3Bvc3RpZCcpKSxcblx0XHRcdFx0XHRcdCd0aXRsZSc6ICQob2JqZWN0c19zZWFyY2hfc2xvdHNbaV0pLnZhbCgpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcyBpbnB1dFtuYW1lPVwib2JqZWN0c19zZWFyY2hfb3JkZXJcIl0nKS52YWwoSlNPTi5zdHJpbmdpZnkodG9fc2F2ZSkpO1xuXHRcdFx0fSxcblx0XHRcdHNhdmVQcm9wZXJ0eUdyb3VwczogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdG9fc2F2ZSA9IHt9O1xuXHRcdFx0XHR2YXIgZ3JvdXBzX2ZpZWxkcyA9ICQoTWVzc2lhLmdyb3Vwc19maWVsZHMpO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGlkID0gJChncm91cHNfZmllbGRzW2ldKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRcdHZhciBuYW1lID0gJChncm91cHNfZmllbGRzW2ldKS5kYXRhKCduYW1lJyk7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gJChncm91cHNfZmllbGRzW2ldKS52YWwoKTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PSAnJykge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtZXNzaWFQcm9jZWVkU2F2aW5nJykucHVzaChmYWxzZSk7XG5cdFx0XHRcdFx0XHQkKGdyb3Vwc19maWVsZHNbaV0pLmFkZENsYXNzKCdlbXB0eScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB0b19zYXZlW2lkXSkge1xuXHRcdFx0XHRcdFx0dG9fc2F2ZVtpZF0gPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dG9fc2F2ZVtpZF1bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKCcuY2FsbGJhY2sgLmdyb3Vwc19maWVsZHMgaW5wdXRbbmFtZT1cInByb3BlcnR5X2dyb3Vwc1wiXScpLnZhbChKU09OLnN0cmluZ2lmeSh0b19zYXZlKSk7XG5cdFx0XHR9LFxuXHRcdFx0c2F2ZUZvbnRPcHRpb25zOiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdHZhciBmb250X29wdGlvbl9zbG90cyA9IE1lc3NpYS5mb250X29wdGlvbnM7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmb250X29wdGlvbl9zbG90cy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIHRvX3NhdmUgPSB7fTtcblx0XHRcdFx0XHR2YXIgb3B0aW9uX3Nsb3QgPSAkKGZvbnRfb3B0aW9uX3Nsb3RzW2ldKTtcblx0XHRcdFx0XHR2YXIgZm9udF9vcHRpb25zID0gb3B0aW9uX3Nsb3QuZmluZCgnc2VsZWN0LmZvbnQtb3B0aW9uLCBpbnB1dC5mb250LW9wdGlvbicpO1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIgcSA9IDA7IHEgPCBmb250X29wdGlvbnMubGVuZ3RoOyBxKyspIHtcblxuXHRcdFx0XHRcdFx0dmFyIGZvbnRfb3B0aW9uID0gJChmb250X29wdGlvbnNbcV0pO1xuXHRcdFx0XHRcdFx0dmFyIGtleSA9IGZvbnRfb3B0aW9uLmRhdGEoJ2tleScpO1xuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkX29wdGlvbiA9ICgkKGZvbnRfb3B0aW9uc1txXSkuaXMoJ3NlbGVjdCcpKSA/ICQoZm9udF9vcHRpb25zW3FdKS5maW5kKCc6c2VsZWN0ZWQnKSA6ICQoZm9udF9vcHRpb25zW3FdKS5pcygnaW5wdXQnKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZvbnRfb3B0aW9uLmhhc0NsYXNzKCdmb250LWZhbWlseScpKSB7XG5cdFx0XHRcdFx0XHRcdHRvX3NhdmVbJ2NvbGxlY3Rpb24nXSA9IHNlbGVjdGVkX29wdGlvbi5wYXJlbnQoKS5kYXRhKCdjb2xsZWN0aW9uJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKGZvbnRfb3B0aW9uc1txXSkudmFsKCk7XG5cdFx0XHRcdFx0XHR2YXIgaXNOdWJtZXIgPSAvXlstMS05XSskLy50ZXN0KHZhbCk7XG5cblx0XHRcdFx0XHRcdGlmIChpc051Ym1lcikge1xuXHRcdFx0XHRcdFx0XHR0b19zYXZlWyQoZm9udF9vcHRpb25zW3FdKS5kYXRhKCdrZXknKV0gPSBwYXJzZUludCh2YWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRvX3NhdmVbJChmb250X29wdGlvbnNbcV0pLmRhdGEoJ2tleScpXSA9IHZhbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvcHRpb25fc2xvdC5maW5kKCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdIycgKyBvcHRpb25fc2xvdC5kYXRhKCdkYXRhSG9sZGVySWQnKSkudmFsKEpTT04uc3RyaW5naWZ5KHRvX3NhdmUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyaXRlcmlhU2F2ZWQ6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHNhdmVkX2ZpZWxkcyA9IEpTT04ucGFyc2UoJCh0aGlzKS52YWwoKSk7XG5cdFx0XHRcdHZhciB0ZW1wbGF0ZSA9ICQoJy5jYWxsYmFjayAucmF0aW5nX2ZpbGVkcyAucmF0aW5nX2NyaXRlcmlhLnRlbXBsYXRlJyk7XG5cblx0XHRcdFx0JCgnLmNhbGxiYWNrIC5yYXRpbmdfZmlsZWRzIC5yYXRpbmdfY3JpdGVyaWE6bm90KC50ZW1wbGF0ZSknKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRmb3IgKGxldCBrZXkgaW4gc2F2ZWRfZmllbGRzKSB7XG5cblx0XHRcdFx0XHR2YXIgaW5zZXJ0ID0gdGVtcGxhdGUuY2xvbmUodHJ1ZSkucmVtb3ZlQ2xhc3MoJ3RlbXBsYXRlJyk7XG5cdFx0XHRcdFx0aW5zZXJ0LmZpbmQoJ2lucHV0JykuYXR0cignaWQnLCBrZXkpLnZhbChzYXZlZF9maWVsZHNba2V5XSlcblx0XHRcdFx0XHRpbnNlcnQuaW5zZXJ0QmVmb3JlKCQodGhpcykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2VyYWNoT3JkZXJTYXZlZDogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgc2F2ZWRfZmllbGRzID0gSlNPTi5wYXJzZSgkKHRoaXMpLnZhbCgpKTtcblx0XHRcdFx0dmFyIHRlbXBsYXRlID0gJCgnLmNhbGxiYWNrIC5vYmplY3RzX3NlYXJjaF9vcmRlcl9maWxlZHMgLm9iamVjdF9vcmRlci50ZW1wbGF0ZScpO1xuXG5cdFx0XHRcdCQoJy5jYWxsYmFjayAub2JqZWN0c19zZWFyY2hfb3JkZXJfZmlsZWRzIC5vYmplY3Rfb3JkZXI6bm90KC50ZW1wbGF0ZSknKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNhdmVkX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBpbnNlcnQgPSB0ZW1wbGF0ZS5jbG9uZSh0cnVlKS5yZW1vdmVDbGFzcygndGVtcGxhdGUnKTtcblx0XHRcdFx0XHRpbnNlcnQuZmluZCgnaW5wdXQnKS5hdHRyKCdwb3N0aWQnLCBzYXZlZF9maWVsZHNbaV0ucG9zdGlkKS52YWwoc2F2ZWRfZmllbGRzW2ldLnRpdGxlKVxuXHRcdFx0XHRcdGluc2VydC5pbnNlcnRCZWZvcmUoJCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwcm9wZXJ0eUdyb3VwU2F2ZWQ6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHNhdmVkX2ZpZWxkcyA9IEpTT04ucGFyc2UoJCh0aGlzKS52YWwoKSk7XG5cdFx0XHRcdHZhciB0ZW1wbGF0ZSA9ICQoJy5jYWxsYmFjayAuZ3JvdXBzX2ZpZWxkcyAucHJvcGVydHlfZ3JvdXAudGVtcGxhdGUnKTtcblxuXHRcdFx0XHQkKCcuY2FsbGJhY2sgLmdyb3Vwc19maWVsZHMgLnByb3BlcnR5X2dyb3VwOm5vdCgudGVtcGxhdGUpJykucmVtb3ZlKCk7XG5cblx0XHRcdFx0Zm9yIChsZXQga2V5IGluIHNhdmVkX2ZpZWxkcykge1xuXG5cdFx0XHRcdFx0dmFyIGluc2VydCA9IHRlbXBsYXRlLmNsb25lKHRydWUpLnJlbW92ZUNsYXNzKCd0ZW1wbGF0ZScpO1xuXHRcdFx0XHRcdGluc2VydC5maW5kKCdpbnB1dCcpLmF0dHIoJ2lkJywga2V5KS52YWwoc2F2ZWRfZmllbGRzW2tleV0pO1xuXHRcdFx0XHRcdGluc2VydC5maW5kKCdpbnB1dFtkYXRhLW5hbWU9XCJncm91cF9uYW1lXCInKS5hdHRyKCdpZCcsIGtleSkudmFsKHNhdmVkX2ZpZWxkc1trZXldWydncm91cF9uYW1lJ10pO1xuXHRcdFx0XHRcdGluc2VydC5pbnNlcnRCZWZvcmUoJCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmb250U2F2ZWQ6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHNhdmVkX2ZpZWxkcyA9IEpTT04ucGFyc2UoJCh0aGlzKS52YWwoKSk7XG5cdFx0XHRcdHZhciBmb250ID0gJCh0aGlzKS5wYXJlbnRzKCcuZm9udC1vcHRpb24td3JhcHBlcicpO1xuXG5cdFx0XHRcdHZhciBmYW1pbHkgPSBmb250LmZpbmQoJ3NlbGVjdC5mb250LWZhbWlseScpO1xuXHRcdFx0XHR2YXIgY2F0ZWdvcnkgPSBmb250LmZpbmQoJ2lucHV0LmZvbnQtY2F0ZWdvcnknKTtcblx0XHRcdFx0dmFyIHZhcmlhbnQgPSBmb250LmZpbmQoJ3NlbGVjdC5mb250LXZhcmlhbnQnKTtcblx0XHRcdFx0dmFyIHN1YnNldCA9IGZvbnQuZmluZCgnc2VsZWN0LmZvbnQtc3Vic2V0Jyk7XG5cdFx0XHRcdHZhciBzaXplID0gZm9udC5maW5kKCdpbnB1dC5mb250LXNpemUnKTtcblx0XHRcdFx0dmFyIGxpbmVoZWlnaHQgPSBmb250LmZpbmQoJ2lucHV0LmxpbmUtaGVpZ2h0Jyk7XG5cdFx0XHRcdHZhciBjb2xvciA9IGZvbnQuZmluZCgnaW5wdXQuY29sb3InKTtcblxuXHRcdFx0XHRmYW1pbHkudmFsKHNhdmVkX2ZpZWxkcy5mYW1pbHkpO1xuXHRcdFx0XHRjYXRlZ29yeS52YWwoc2F2ZWRfZmllbGRzLmNhdGVnb3J5KTtcblx0XHRcdFx0dmFyaWFudC52YWwoc2F2ZWRfZmllbGRzLnZhcmlhbnQpO1xuXHRcdFx0XHRzdWJzZXQudmFsKHNhdmVkX2ZpZWxkcy5zdWJzZXQpO1xuXHRcdFx0XHRzaXplLnZhbChzYXZlZF9maWVsZHMuc2l6ZSk7XG5cdFx0XHRcdGxpbmVoZWlnaHQudmFsKHNhdmVkX2ZpZWxkcy5saW5lX2hlaWdodCk7XG5cdFx0XHRcdGNvbG9yLnZhbChzYXZlZF9maWVsZHMuY29sb3IpO1xuXHRcdFx0fSxcblx0XHRcdGJpbmRBdXRvY29tcGxldGU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cblx0XHRcdFx0ZWxlbWVudC5hdXRvY29tcGxldGUoe1xuXHRcdFx0XHRcdGRlbGF5OiA1MDAsXG5cdFx0XHRcdFx0bWluTGVuZ3RoOiAzLFxuXHRcdFx0XHRcdHBvc2l0aW9uOiB7IG15OiBcImxlZnQgdG9wXCIsIGF0OiBcImxlZnQgYm90dG9tLTFcIiB9LFxuXHRcdFx0XHRcdHNvdXJjZTogZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG5cblx0XHRcdFx0XHRcdHZhciBleGNsdWRlX2lkcyA9IFswXTtcblx0XHRcdFx0XHRcdHZhciBpbnB1dHMgPSAkKE1lc3NpYS5vYmplY3RzX3NlYXJjaF9zbG90cyk7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGV4Y2x1ZGVfaWRzLnB1c2goJChpbnB1dHNbaV0pLmF0dHIoJ3Bvc3RpZCcpKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0TWVzc2lhLnhociA9ICQuYWpheCh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiBtZXNzaWFWYXJzLmFqYXhVcmwsXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb246ICdzZWFyY2hfb2JqZWN0cycsXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IG1lc3NpYVZhcnMubWVzc2lhTm9uY2UsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0QUpBWF9NYXJrZXI6IG1lc3NpYVZhcnMuQUpBWF9NYXJrZXIsXG5cdFx0XHRcdFx0XHRcdFx0XHR0cnlfbmFtZTogcmVxdWVzdFsndGVybSddLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXhjbHVkZV9pZHM6IGV4Y2x1ZGVfaWRzLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChNZXNzaWEueGhyICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRcdE1lc3NpYS54aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdE1lc3NpYS54aHIgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlKHNlcnZlci5kYXRhLm9iamVjdHMpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoTWVzc2lhLnhoci5zdGF0dXMgPT09IDAgJiYgTWVzc2lhLnhoci5zdGF0dXNUZXh0ID09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlbGVjdDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXG5cdFx0XHRcdFx0XHR2YXIgb2JqZWN0X2ZpZWxkID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5vYmplY3Rfb3JkZXInKTtcblx0XHRcdFx0XHRcdGlmIChvYmplY3RfZmllbGQuaGFzQ2xhc3MoJ3RlbXBsYXRlJykpIHtcblxuXHRcdFx0XHRcdFx0XHR2YXIgb2JqZWN0X2ZpZWxkID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5vYmplY3Rfb3JkZXInKS5yZW1vdmVDbGFzcygndGVtcGxhdGUnKTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0X2ZpZWxkLmNsb25lKCkuYWRkQ2xhc3MoJ3RlbXBsYXRlJykuaW5zZXJ0QmVmb3JlKG9iamVjdF9maWVsZCkuZmluZCgnaW5wdXQnKS52YWwoJycpLm9uKCdpbnB1dCcsIE1lc3NpYS5zZXJhY2hPcmRlclRtcGxJbnB1dCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkuYXR0cigncG9zdGlkJywgdWkuaXRlbS5wb3N0aWQpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VhcmNoKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRcdFx0Ly9ub3RoaW5nXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvcGVuOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkuYXV0b2NvbXBsZXRlKCd3aWRnZXQnKS5jc3MoJ3otaW5kZXgnLCAxMDEpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHRcdC8vbm90aGluZ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cblx0XHRcdFx0XHRcdHZhciBwcmV2ID0gJChldmVudC50YXJnZXQpLmRhdGEoJ3VpQXV0b2NvbXBsZXRlJykucHJldmlvdXM7XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgcHJldiAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJldiAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0JChldmVudC50YXJnZXQpLnZhbChwcmV2KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVGb250Q2F0ZWdvcnk6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIGNhdGVnb3J5X2RhdGEgPSAkKHRoaXMpLmZpbmQoJzpzZWxlY3RlZCcpLmRhdGEoJ2NhdGVnb3J5Jyk7XG5cdFx0XHRcdHZhciBjYXRlZ29yeV9zZWxlY3RvciA9ICQodGhpcykucGFyZW50cygnLmZvbnQtb3B0aW9uLXdyYXBwZXInKS5maW5kKCdpbnB1dC5mb250LWNhdGVnb3J5Jyk7XG5cblx0XHRcdFx0Y2F0ZWdvcnlfc2VsZWN0b3IudmFsKGNhdGVnb3J5X2RhdGEpO1xuXG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlRm9udFZhcmlhbnRzOiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdHZhciB2YXJpYW50c19kYXRhID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS5kYXRhKCd2YXJpYW50cycpO1xuXHRcdFx0XHR2YXIgc3Vic2V0c19kYXRhID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS5hdHRyKCdkYXRhLXN1YnNldHMnKTtcblxuXHRcdFx0XHR2YXIgdmFyaWFudHNfc2VsZWN0b3IgPSAkKHRoaXMpLnBhcmVudHMoJy5mb250LW9wdGlvbi13cmFwcGVyJykuZmluZCgnc2VsZWN0LmZvbnQtdmFyaWFudCcpO1xuXG5cdFx0XHRcdHZhciBjdXJyZW50X3ZhcmlhbnQgPSB2YXJpYW50c19zZWxlY3Rvci52YWwoKTtcblx0XHRcdFx0dmFyIGRlZlZhcmlhbnQgPSAwO1xuXHRcdFx0XHR2YXIgbmV3T3B0aW9ucyA9IFtdO1xuXHRcdFx0XHR2YXIgbmV3T3B0aW9uO1xuXHRcdFx0XHR2YXIgc2VsZWN0ZWQ7XG5cblx0XHRcdFx0dmFyaWFudHNfc2VsZWN0b3IudmFsKG51bGwpLmVtcHR5KCk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJpYW50c19kYXRhLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRzZWxlY3RlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHZhcmlhbnRzX2RhdGFbaV0uaWQgPT09IGN1cnJlbnRfdmFyaWFudCkge1xuXHRcdFx0XHRcdFx0Ly8gaWYgdmFyaWFudCBleGlzdHMgaW4gbmV3IHZhcmlhbnRzIHNldCBpdCBhcyBzZWxlY3RlZC5cblx0XHRcdFx0XHRcdHNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHZhcmlhbnRzX2RhdGFbaV0uaWQgPT09ICdyZWd1bGFyJykge1xuXHRcdFx0XHRcdFx0Ly8gaWYgdmFyaWFudCBkb2VzIG5vdCBleGlzdHMgZGV0ZWN0IGluZGV4IG9mICdyZWd1bGFyJyB2YXJpYW50LlxuXHRcdFx0XHRcdFx0ZGVmVmFyaWFudCA9IGk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bmV3T3B0aW9uID0gbmV3IE9wdGlvbih2YXJpYW50c19kYXRhW2ldLnRleHQsIHZhcmlhbnRzX2RhdGFbaV0uaWQsIGZhbHNlLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0bmV3T3B0aW9uLnNldEF0dHJpYnV0ZShcImRhdGEtc3Vic2V0c1wiLCBzdWJzZXRzX2RhdGEpO1xuXG5cdFx0XHRcdFx0bmV3T3B0aW9ucy5wdXNoKG5ld09wdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc2VsZWN0ZWQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bmV3T3B0aW9uc1tkZWZWYXJpYW50XS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXJpYW50c19zZWxlY3Rvci5hcHBlbmQobmV3T3B0aW9ucyk7XG5cdFx0XHRcdHZhcmlhbnRzX3NlbGVjdG9yLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0XHQkKE1lc3NpYS5mb250X3ZhcmlhbnRfc2VsZWN0b3JzKS50cmlnZ2VyKCdzZWxlY3QyOnNlbGVjdCcpO1xuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZUZvbnRTdWJzZXRzOiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdHZhciBzdWJzZXRzX2RhdGEgPSAkKHRoaXMpLmZpbmQoJzpzZWxlY3RlZCcpLmRhdGEoJ3N1YnNldHMnKTtcblx0XHRcdFx0dmFyIHN1YnNldHNfc2VsZWN0b3IgPSAkKHRoaXMpLnBhcmVudHMoJy5mb250LW9wdGlvbi13cmFwcGVyJykuZmluZCgnc2VsZWN0LmZvbnQtc3Vic2V0Jyk7XG5cblx0XHRcdFx0dmFyIGN1cnJlbnRfc3Vic2V0ID0gc3Vic2V0c19zZWxlY3Rvci52YWwoKTtcblx0XHRcdFx0dmFyIGRlZlN1YnNldCA9IDA7XG5cdFx0XHRcdHZhciBuZXdPcHRpb25zID0gW107XG5cdFx0XHRcdHZhciBuZXdPcHRpb247XG5cdFx0XHRcdHZhciBzZWxlY3RlZDtcblxuXHRcdFx0XHRzdWJzZXRzX3NlbGVjdG9yLnZhbChudWxsKS5lbXB0eSgpO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2V0c19kYXRhLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRzZWxlY3RlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHN1YnNldHNfZGF0YVtpXS5pZCA9PT0gY3VycmVudF9zdWJzZXQpIHtcblx0XHRcdFx0XHRcdC8vIGlmIHN1YnNldCBleGlzdHMgaW4gbmV3IHN1YnNldHMgc2V0IGl0IGFzIHNlbGVjdGVkLlxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoc3Vic2V0c19kYXRhW2ldLmlkID09PSAnbGF0aW4nKSB7XG5cdFx0XHRcdFx0XHQvLyBpZiBzdWJzZXQgZG9lcyBub3QgZXhpc3RzIGRldGVjdCBpbmRleCBvZiAnbGF0aW4nIHZhcmlhbnQuXG5cdFx0XHRcdFx0XHRkZWZTdWJzZXQgPSBpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5ld09wdGlvbiA9IG5ldyBPcHRpb24oc3Vic2V0c19kYXRhW2ldLnRleHQsIHN1YnNldHNfZGF0YVtpXS5pZCwgZmFsc2UsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRuZXdPcHRpb25zLnB1c2gobmV3T3B0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN1YnNldHNfc2VsZWN0b3IuYXBwZW5kKG5ld09wdGlvbnMpO1xuXHRcdFx0XHRzdWJzZXRzX3NlbGVjdG9yLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZUZvbnRTaXplczogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgZGVmID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS5kYXRhKCdmb250U2l6ZScpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgZGVmID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQodGhpcykucGFyZW50cygnLmZvbnQtb3B0aW9uLXdyYXBwZXInKS5maW5kKCdpbnB1dC5mb250LXNpemUnKS52YWwoZGVmKTtcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVMaW5lSGVpZ2h0OiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdHZhciBkZWYgPSAkKHRoaXMpLmZpbmQoJzpzZWxlY3RlZCcpLmRhdGEoJ2xpbmVIZWlnaHQnKTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGRlZiA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy5mb250LW9wdGlvbi13cmFwcGVyJykuZmluZCgnaW5wdXQubGluZS1oZWlnaHQnKS52YWwoZGVmKTtcblx0XHRcdH0sXG5cdFx0XHRzZWxlY3RNZWRpYTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLm1lc3NpYU1lZGlhU2VsZWN0b3IoTWVzc2lhLmltYWdlU2VsZWN0ZWQpO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZU1lZGlhOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0dmFyIGltYWdlcyA9ICQodGhpcykucGFyZW50cygnLmltYWdlcycpO1xuXHRcdFx0XHR2YXIgbXVsdGlwbGVUZW1wbGF0ZSA9IGltYWdlcy5maW5kKCcudGVtcGxhdGUubXVsdGlwbGUnKTtcblxuXHRcdFx0XHRpZiAobXVsdGlwbGVUZW1wbGF0ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcuaWNvbicpLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ3JlbW92ZS1pbWFnZScpLmFkZENsYXNzKCdwbGFjZWhvbGRlci1pbWFnZScpLnBhcmVudCgpLnJlbW92ZUF0dHIoJ2lkJykuZmluZCgnLmltYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0TWVzc2lhLnVwZGF0ZUltYWdlc0lucHV0KGltYWdlcyk7XG5cdFx0XHRcdE1lc3NpYS5pbWFnZXNTbG90c1NvcnRhYmxlQWJpbGl0eShpbWFnZXMpO1xuXHRcdFx0fSxcblx0XHRcdGltYWdlU2VsZWN0ZWQ6IGZ1bmN0aW9uIChjYWxsZXIsIHNlbGVjdGlvbikge1xuXHRcdFx0XHQkLmZuLm1lc3NpYUFwcGVuZE1lZGlhU2VsZWN0aW9uKGNhbGxlciwgc2VsZWN0aW9uKTtcblxuXHRcdFx0XHR2YXIgaW1hZ2VzID0gY2FsbGVyLnBhcmVudHMoJy5pbWFnZXMnKTtcblx0XHRcdFx0TWVzc2lhLnVwZGF0ZUltYWdlc0lucHV0KGltYWdlcyk7XG5cdFx0XHRcdE1lc3NpYS5pbWFnZXNTbG90c1NvcnRhYmxlQWJpbGl0eShjYWxsZXIpO1xuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZUltYWdlc0lucHV0OiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0XHRcdHZhciBpbWFnZXMgPSBbXTtcblx0XHRcdFx0dmFyIGljb25zID0gY29udGFpbmVyLmZpbmQoJy5pY29uJyk7XG5cdFx0XHRcdHZhciBkYXRhR2V0dGVyID0gY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKCQoaWNvbnNbaV0pLmZpbmQoJy5wbGFjZWhvbGRlci1pbWFnZScpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0aW1hZ2VzLnB1c2goJChpY29uc1tpXSkuZGF0YSgnaW1hZ2VpbmZvJykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgaW1hZ2VTZXQgPSBpbWFnZXMuZmlsdGVyKGltYWdlID0+IHtcblx0XHRcdFx0XHRkZWxldGUgaW1hZ2UudXJsO1xuXHRcdFx0XHRcdHJldHVybiBpbWFnZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRhdGFHZXR0ZXIudmFsKEpTT04uc3RyaW5naWZ5KGltYWdlU2V0KSk7XG5cdFx0XHRcdGRhdGFHZXR0ZXIudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VzU2xvdHNTb3J0YWJsZUFiaWxpdHk6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGNhbGxlci5wYXJlbnRzKCcuaW1hZ2VzJyk7XG5cdFx0XHRcdHZhciBzbG90ID0gY29udGFpbmVyLmZpbmQoJy5pbWFnZXMtc2xvdCcpO1xuXHRcdFx0XHR2YXIgaWNvbnMgPSBzbG90LmZpbmQoJy5pY29uJyk7XG5cblx0XHRcdFx0aWYgKGljb25zLmxlbmd0aCA8PSAyKSB7IC8vIDEgaW1hZ2UgKyAxIHBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0c2xvdC5zb3J0YWJsZSgnZGlzYWJsZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHNsb3Quc29ydGFibGUoJ2VuYWJsZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VzU2xvdHNTb3J0YWJsZUluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgc2xvdHMgPSAkKCcuY2FsbGJhY2sgLmltYWdlcy1zbG90Jyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzbG90cy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIHNsb3QgPSAkKHNsb3RzW2ldKTtcblxuXHRcdFx0XHRcdHNsb3RzLnNvcnRhYmxlKHtcblx0XHRcdFx0XHRcdHJldmVydDogMjAwLFxuXHRcdFx0XHRcdFx0Zm9yY2VIZWxwZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRcdFx0Zm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiAwLjUsXG5cdFx0XHRcdFx0XHRpdGVtczogXCI+IC5pY29uW2lkXVwiLFxuXHRcdFx0XHRcdFx0ZGlzdGFuY2U6IDEwLFxuXHRcdFx0XHRcdFx0dG9sZXJhbmNlOiAncG9pbnRlcicsXG5cdFx0XHRcdFx0XHRzY3JvbGw6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Ly9oYW5kbGU6ICcudG1wbCcsXG5cdFx0XHRcdFx0XHQvL2NvbnRhaW5tZW50OiAnLmljb24td3JhcHBlcicsXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJ3NvcnRhYmxlLXBsYWNlaG9sZGVyJyxcblx0XHRcdFx0XHRcdGJlZm9yZVN0b3A6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHRcdFx0dWkuaGVscGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdCd3aWR0aCc6ICcnLFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHRNZXNzaWEudXBkYXRlSW1hZ2VzSW5wdXQodWkuaXRlbS5wYXJlbnRzKCcuaW1hZ2VzJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IHNsb3QucGFyZW50cygnLmltYWdlcycpO1xuXHRcdFx0XHRcdE1lc3NpYS5pbWFnZXNTbG90c1NvcnRhYmxlQWJpbGl0eShjb250YWluZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRyZXF1aXJlKCcuL3NldHRpbmdzLWxpY2VuY2UuanMnKShNZXNzaWEsICQpO1xuXHRcdHJlcXVpcmUoJy4vc2V0dGluZ3MtYWNjZXNzLmpzJykoTWVzc2lhLCAkKTtcblxuXHRcdCQoJy5jb2xvci1waWNrZXInKS5zcGVjdHJ1bSh7XG5cdFx0XHR0eXBlOiAnY29tcG9uZW50Jyxcblx0XHRcdHNob3dJbnB1dDogJ3RydWUnLFxuXHRcdFx0c2hvd0luaXRpYWw6ICd0cnVlJyxcblx0XHRcdGFsbG93RW1wdHk6ICdmYWxzZScsXG5cdFx0fSk7XG5cblx0XHRNZXNzaWEuaW1hZ2VzU2xvdHNTb3J0YWJsZUluaXQoKTtcblxuXHRcdC8vINCa0YDQuNGC0LXRgNC40Lgg0L7RhtC10L3QutCwINGB0LDQudGC0LBcblx0XHRNZXNzaWEubWFrZUVsZW1lbnRzU29ydGFibGUoJCgnLmNhbGxiYWNrIC5yYXRpbmdfZmlsZWRzJykpO1xuXHRcdCQoJy5jYWxsYmFjayAucmF0aW5nX2ZpbGVkcycpLm9uKCdpbnB1dCcsICcucmF0aW5nX2NyaXRlcmlhLnRlbXBsYXRlIGlucHV0JywgTWVzc2lhLmNyaXRlcmlhVG1wbElucHV0KTtcblx0XHQkKCcuY2FsbGJhY2sgLnJhdGluZ19maWxlZHMnKS5vbignaW5wdXQnLCAnLnJhdGluZ19jcml0ZXJpYTpub3QoLnRlbXBsYXRlKSBpbnB1dCcsIE1lc3NpYS5jcml0ZXJpYUlucHV0KTtcblx0XHQkKCcuY2FsbGJhY2sgLnJhdGluZ19maWxlZHMnKS5vbignY2xpY2snLCAnLnJhdGluZ19jcml0ZXJpYTpub3QoLnRlbXBsYXRlKSAuaGFuZGxlci5yZW1vdmUnLCBNZXNzaWEuY3JpdGVyaWFEZWxldGUpO1xuXHRcdCQoJy5jYWxsYmFjayAucmF0aW5nX2ZpbGVkcyBpbnB1dFtuYW1lPVwic2l0ZV9yYXRpbmdfdGVybXNcIl0nKS5vbigndXBkYXRlZCcsIE1lc3NpYS5jcml0ZXJpYVNhdmVkKTtcblxuXHRcdC8vINCf0L7RgNGP0LTQvtC6INC+0LHRitC10LrRgtC+0LIg0LIg0L/QvtC40YHQutC+0LLQvtC5INCy0YvQtNCw0YfQtVxuXHRcdE1lc3NpYS5tYWtlRWxlbWVudHNTb3J0YWJsZSgkKCcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcycpKTtcblx0XHQkKCcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcycpLm9uKCdpbnB1dCcsICcub2JqZWN0X29yZGVyLnRlbXBsYXRlIGlucHV0JywgTWVzc2lhLnNlcmFjaE9yZGVyVG1wbElucHV0KTtcblx0XHQkKCcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcycpLm9uKCdpbnB1dCcsICcub2JqZWN0X29yZGVyOm5vdCgudGVtcGxhdGUpIGlucHV0JywgTWVzc2lhLnNlcmFjaE9yZGVySW5wdXQpO1xuXHRcdCQoJy5jYWxsYmFjayAub2JqZWN0c19zZWFyY2hfb3JkZXJfZmlsZWRzJykub24oJ2NsaWNrJywgJy5vYmplY3Rfb3JkZXI6bm90KC50ZW1wbGF0ZSkgLmhhbmRsZXIucmVtb3ZlJywgTWVzc2lhLnNlcmFjaE9yZGVyRGVsZXRlKTtcblx0XHQkKCcuY2FsbGJhY2sgLm9iamVjdHNfc2VhcmNoX29yZGVyX2ZpbGVkcyBpbnB1dFtuYW1lPVwib2JqZWN0c19zZWFyY2hfb3JkZXJcIl0nKS5vbigndXBkYXRlZCcsIE1lc3NpYS5zZXJhY2hPcmRlclNhdmVkKTtcblxuXHRcdC8vINCT0YDRg9C/0L/RiyDQtNC70Y8g0YLQsNC60YHQvtC90L7QvNC40Lgg0KHQstC+0LnRgdGC0LLQsFxuXHRcdE1lc3NpYS5tYWtlRWxlbWVudHNTb3J0YWJsZSgkKCcuY2FsbGJhY2sgLmdyb3Vwc19maWVsZHMnKSk7XG5cdFx0JCgnLmNhbGxiYWNrIC5ncm91cHNfZmllbGRzJykub24oJ2lucHV0JywgJy5wcm9wZXJ0eV9ncm91cC50ZW1wbGF0ZSBpbnB1dCcsIE1lc3NpYS5wcm9wZXJ0eUdyb3VwVG1wbElucHV0KTtcblx0XHQkKCcuY2FsbGJhY2sgLmdyb3Vwc19maWVsZHMnKS5vbignaW5wdXQnLCAnLnByb3BlcnR5X2dyb3VwOm5vdCgudGVtcGxhdGUpIGlucHV0JywgTWVzc2lhLnByb3BlcnR5R3JvdXBJbnB1dCk7XG5cdFx0JCgnLmNhbGxiYWNrIC5ncm91cHNfZmllbGRzJykub24oJ2NsaWNrJywgJy5wcm9wZXJ0eV9ncm91cDpub3QoLnRlbXBsYXRlKSAuaGFuZGxlci5yZW1vdmUnLCBNZXNzaWEucHJvcGVydHlHcm91cERlbGV0ZSk7XG5cdFx0JCgnLmNhbGxiYWNrIC5ncm91cHNfZmllbGRzIGlucHV0W25hbWU9XCJwcm9wZXJ0eV9ncm91cHNcIl0nKS5vbigndXBkYXRlZCcsIE1lc3NpYS5wcm9wZXJ0eUdyb3VwU2F2ZWQpO1xuXG5cdFx0Ly8g0KjRgNC40YTRgtGLXG5cdFx0JCgnLmNhbGxiYWNrIC5mb250LW9wdGlvbi13cmFwcGVyIGlucHV0LmZvbnQtc2V0dGluZy1ob2xkZXInKS5vbigndXBkYXRlZCcsIE1lc3NpYS5mb250U2F2ZWQpO1xuXG5cdFx0Ly8g0JzQtdC00LjQsFxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuY2FsbGJhY2sgLmltYWdlcy1zbG90IC5pY29uIC5lZGl0LWltYWdlJywgTWVzc2lhLnNlbGVjdE1lZGlhKTtcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmNhbGxiYWNrIC5pbWFnZXMtc2xvdCAuaWNvbiAucmVtb3ZlLWltYWdlJywgTWVzc2lhLnJlbW92ZU1lZGlhKTtcblxuXHRcdCQoJ2JvZHknKS5vbignYmVmb3JlU2F2ZScsIE1lc3NpYS5zYXZlQ3JpdGVyaWFzKTtcblx0XHQkKCdib2R5Jykub24oJ2JlZm9yZVNhdmUnLCBNZXNzaWEuc2F2ZVByb3BlcnR5R3JvdXBzKTtcblx0XHQkKCdib2R5Jykub24oJ2JlZm9yZVNhdmUnLCBNZXNzaWEuc2F2ZVNlYXJjaE9yZGVyKTtcblx0XHQkKCdib2R5Jykub24oJ2JlZm9yZVNhdmUnLCBNZXNzaWEuc2F2ZUZvbnRPcHRpb25zKTtcblx0XHQkKCdib2R5Jykub24oJ2JlZm9yZVNhdmUnLCBNZXNzaWEuc2F2ZUxpY2Vu0YFlRGF0YSk7XG5cdFx0TWVzc2lhLnRhYnNfc2VsZWN0b3Iub24oJ3ByZXNldFNhdmVkJywgZnVuY3Rpb24gKGUsIHNldHRpbmdzLCBleHRyYV9kYXRhKSB7XG5cdFx0XHRNZXNzaWEucHJlc2V0U2F2ZWQoc2V0dGluZ3MsIGV4dHJhX2RhdGEpO1xuXHRcdH0pO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkKE1lc3NpYS5vYmplY3RzX3NlYXJjaF9zbG90cykubGVuZ3RoOyBpKyspIHtcblx0XHRcdE1lc3NpYS5iaW5kQXV0b2NvbXBsZXRlKCQoJChNZXNzaWEub2JqZWN0c19zZWFyY2hfc2xvdHMpW2ldKSk7XG5cdFx0fVxuXG5cdFx0aWYgKGZhbHNlID09PSAkLmZuLm1lc3NpYUlzTW9iaWxlKCkpIHtcblx0XHRcdCQoJ3NlbGVjdC5mb250LW9wdGlvbicpLnNlbGVjdDIoe1xuXHRcdFx0XHRwbGFjZWhvbGRlcjogbWVzc2lhVmFycy5tZXNzYWdlcy5zZWxlY3RPcHRpb25zLFxuXHRcdFx0XHQvL3dpZHRoOiAnMTAwJScsXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKE1lc3NpYS5mb250X2ZhbWlseV9zZWxlY3RvcnMpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIE1lc3NpYS51cGRhdGVGb250Q2F0ZWdvcnkpO1xuXHRcdCQoTWVzc2lhLmZvbnRfZmFtaWx5X3NlbGVjdG9ycykub24oJ3NlbGVjdDI6c2VsZWN0JywgTWVzc2lhLnVwZGF0ZUZvbnRWYXJpYW50cyk7XG5cdFx0JChNZXNzaWEuZm9udF9mYW1pbHlfc2VsZWN0b3JzKS5vbignc2VsZWN0MjpzZWxlY3QnLCBNZXNzaWEudXBkYXRlRm9udFNpemVzKTtcblx0XHQkKE1lc3NpYS5mb250X2ZhbWlseV9zZWxlY3RvcnMpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIE1lc3NpYS51cGRhdGVMaW5lSGVpZ2h0KTtcblxuXHRcdCQoTWVzc2lhLmZvbnRfdmFyaWFudF9zZWxlY3RvcnMpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIE1lc3NpYS51cGRhdGVGb250U3Vic2V0cyk7XG5cdFx0JCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHsgfSk7XG5cdH0pO1xufSkoalF1ZXJ5KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVcbmltcG9ydCBcIi4uLy4uL3Njc3MvX2JhY2tlbmQvc2V0dGluZ3Muc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9fYmFja2VuZC9zZXR0aW5ncy5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
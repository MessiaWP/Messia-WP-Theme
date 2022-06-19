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

		require('./settings-licence.js')(Messia, $);
		require('./settings-access.js')(Messia, $);

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
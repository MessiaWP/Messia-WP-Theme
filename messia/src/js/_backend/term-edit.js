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
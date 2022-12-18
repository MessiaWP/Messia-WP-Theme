(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			sibebarSortableObject: $('.messia-widget-constructor-fields .term-fields'),
			sortableConfig: {
				//revert: true,
				forceHelperSize: true,
				forcePlaceholderSize: true,
				opacity: 1,
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

					ui.item.css('opacity', '');
					var target = $(event.target);
					Messia.saveFields(target);
				},
			},
			setActivity: function (event) {
				if ($(this).is(':checked')) {
					$(this).parents('.termin').removeClass('inactive').addClass('active');
				}
				else {
					$(this).parents('.termin').removeClass('active').addClass('inactive');
				}

				Messia.saveFields($(this).parents('.term-fields'));
			},
			makeNewWidgetSortable: function (event) {
				$(event.target).find('.term-fields').sortable(Messia.sortableConfig);
			},
			saveFields: function (form) {

				var toSave = {};
				var termins = form.find('.termin');

				for (var i = 0; i < termins.length; i++) {

					var termin = $(termins[i]);
					var slug = termin.data('fieldSlug');
					var options = termin.find('.option');

					toSave[slug] = {};

					for (var z = 0; z < options.length; z++) {
						var option = $(options[z]);
						var value = option.find('input').prop('checked');
						toSave[slug][option.data('optionName')] = value;
					}
				}
				form.next('.data').val(JSON.stringify(toSave));
				form.parents('.widget-inside').triggerHandler('change');
			}
		}

		$('.widget-liquid-right').on('click', '.messia-widget-constructor-fields input[type="checkbox"]', Messia.setActivity);
		$('.widget-liquid-right').on('DOMNodeInserted', '.widget', Messia.makeNewWidgetSortable);

		Messia.sibebarSortableObject.sortable(Messia.sortableConfig);

	});
})(jQuery);
(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			sibebarSortableObject: $('.messia-widget-listing-filters .filters-order-drop-zone'),
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
				start: (event, ui) => {
					ui.item.addClass('is-elevated');
					$('body').addClass('cursor-grabbing');
				},
				beforeStop: (event, ui) => {
					$('body').removeClass('cursor-grabbing');
				},
				stop: (event, ui) => {
					ui.item.removeClass('is-elevated');
					var target = $(event.target);

					ui.item.css('opacity', '');
					target.parents('.widget-inside').triggerHandler('change');
				},
			},
			makeNewWidgetSortable: function (event) {
				$(event.target).find('.filters-order-drop-zone').sortable(Messia.sortableConfig);
			},
		}

		$('.widget-liquid-right').on('DOMNodeInserted', '.widget', Messia.makeNewWidgetSortable);

		Messia.sibebarSortableObject.sortable(Messia.sortableConfig);
	});
})(jQuery);
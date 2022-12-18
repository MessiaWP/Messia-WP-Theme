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
(function ($) {

	$(function () {

		var Messia = {
			// Крослинк раскрытие ссылок
			toggle_crossling_group: function (e) {
				e.preventDefault()
				var p = $(this).text();
				var s = $(this).data('shown');
				$(this).parents('.group-holder').find('ul li:nth-child(n+' + (s + 1) + ')').toggle(200);
				$(this).text($(this).data('prevText')).data('prevText', p);
			},
		};

		$('.groups-crosslinks-wrapper .group-holder .toggle').on('click', Messia.toggle_crossling_group);
	});
})(jQuery);
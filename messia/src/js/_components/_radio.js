(function ($) {
	$(function () {
		var Messia = {
			doRadio: function (e) {
				$(this).parents(".messia-radio").addClass("is-clicked");
				$(this).focus();
				$('body').one('focusout',$(this), Messia.removeIsClicked);
			},
			removeIsClicked: function (e) {
				$(".messia-radio").removeClass("is-clicked");
			},
		};
		$('body').on('click', '.messia-radio input:not([disabled])', Messia.doRadio);
	});
})(jQuery);
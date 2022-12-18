(function ($) {
	$(function () {
		var Messia = {
			doCheckbox: function (e) {
				$(this).parent(".messia-checkbox").addClass("is-clicked");
				$(this).focus();
				$('body').one('focusout',$(this), Messia.removeIsClicked);
			},
			removeIsClicked: function (e) {
				$(".messia-checkbox").removeClass("is-clicked");
			},
		};
		$('body').on('click', '.messia-checkbox input:not([disabled])', Messia.doCheckbox);
	});
})(jQuery);
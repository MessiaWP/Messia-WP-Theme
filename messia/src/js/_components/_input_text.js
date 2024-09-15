(function ($) {
	$(function () {
		var Messia = {
			doTextfield: function (e) {
				$(this).find('input, textarea').trigger("focus");
				$(this).addClass('is-focused');
				$(this).one('focusout',$(this).find('> label input, > label textarea'), Messia.removeIsFocused);
			},
			removeIsFocused: function (e) {
				const input = $(this).find(' input,  textarea');
				if (input.val() === '' ){
					$(this).removeClass('is-focused');
				}
			},
		};
		$('body').on('click', '.messia-textfield', Messia.doTextfield);
	});
})(jQuery);

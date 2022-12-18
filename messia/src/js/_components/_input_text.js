(function ($) {
	$(function () {
		var Messia = {
			doTextfield: function (e) {
				$(this).find('input, textarea').focus();
				$(this).addClass('is-focused');
				$(this).one('focusout',$(this).find('> label input, > label textarea'), Messia.removeIsFocused);
			},
			removeIsFocused: function (e) {
				if ($(this).find(' input,  textarea').val().length === 0 ){
					$('.messia-textfield').removeClass('is-focused');
				}
			},
		};
		$('body').on('click', '.messia-textfield', Messia.doTextfield);
	});
})(jQuery);

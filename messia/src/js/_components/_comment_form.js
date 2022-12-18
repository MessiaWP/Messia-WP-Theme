import './_comment-reply.js';

(function ($) {
	$(function () {
		var Messia = {
			selectRating : function(e){
				Messia.doRating( $(this), e.pageX );
			},
			setRating : function(e){
				var number = Messia.doRating( $(this), e.pageX );
				$(this).addClass('fixed').next('.rating_ball').find('.points').css('color', '#d72020');
				$(this).parents('#commentform').find('.form-submit input#comment_rating').val(number);
			},
			resetRating : function(e){
				if(e.type == 'mouseenter'){
					$(this).removeClass('fixed').next('.rating_ball').find('.points').css('color', '');
					$(this).parents('#commentform').find('.form-submit input#comment_rating').val(null);
				}
				else if(e.type == 'mouseleave'){
					if( !$(this).hasClass('fixed') ){
						$(this).find('.bg-active').css('width', '0%');
						$(this).parents('.rating').find('.points').text('0.00');
					}
				}
			},
			moveForm : function(){
				var respond = $(this);
				var comment_parent = respond.find('input[type="hidden"]#comment_parent').val();

				if(comment_parent === '0'){
					respond.find('.eval').css('display', '');
				}
				else{
					respond.find('.eval').css('display', 'none');
				}
			},
			doRating : function(target, pageX){
				
				var lag = -2; // положительный - отставание, отрицательный - опережение
				var step = 10; // 10 - по пол балла, 20 - по одному
				var rel_position = pageX - target.parent().offset().left;

				// Звезда окрасится после прохождения ее курсором
				// var rating_percentage = Math.round( ( ( rel_position + lag ) / target.width() * 100) / step) * step;

				// Звезда окрасится в момент вхождения в нее курсора
				var rating_percentage = Math.ceil( ( ( rel_position + lag ) / target.width() * 100) / step) * step;

				var number = parseFloat(rating_percentage / 20).toFixed(2);

				target.find('.bg-active').css('width', rating_percentage + '%');

				var points = target.parents('.rating').find('.points');
				if(points.length === 0){
					return;
				}
				points.text(number);
				return number;
			},
		};

		$('body').on('mouseenter', '.rating .stars.editable', Messia.resetRating);
		$('body').on('mouseleave', '.rating .stars.editable', Messia.resetRating);
		$('body').on('mousemove', '.rating .stars.editable:not(.fixed)', Messia.selectRating);
		$('body').on('click', '.rating .stars.editable', Messia.setRating);

		$(document).on('DOMNodeInserted', '#respond.comment-respond', Messia.moveForm);
	});
})(jQuery);

// recaptcha
if( document.getElementById('commentform') != null && typeof grecaptcha != 'undefined' ){
	
	grecaptcha.ready(function () {
		
		var action = document.getElementById('recaptchaAction');
		
		if(action == null){
			return;
		}
		
		grecaptcha.execute(messiaVars.gCaptchaV3, { action: action.value }).then(function (token) {
			var recaptchaResponse = document.getElementById('recaptchaResponse');
			recaptchaResponse.value = token;
		});
	});
}
(function ($) {

	$(function () {

		var Messia = {
			resizeTimeoutId: false,
			adjustThumnails: function () {

				var mainImages = $('.full-container .gallery-item');

				for (var i = 0; i < mainImages.length; i++) {

					var mainImage = $(mainImages[i]);
					var thumbHeight = 0;
					var countHideThumb = 0;
					var mainImageHeight = mainImage.outerHeight();
					var container = mainImage.closest('.custom_type-container.gallery');

					container.find('.thumb-container .gallery-item').each(function () {
						thumbHeight += $(this).outerHeight();
						if (thumbHeight <= mainImageHeight) {
							$(this).addClass('visible');
						} else {
							$(this).removeClass('visible');
							countHideThumb += 1;
						}
					});

					if (countHideThumb > 0){
						$('.thumb-container').addClass('thumb-container-full')
						container.find('.thumb-container .gallery-item.visible:visible a').find('.count-hide').remove();
						container.find('.thumb-container .gallery-item.visible:visible a').last().append('<span class="count-hide">+' + countHideThumb + '</span>');
					}
				}
			},
			prepareResize: function () {
				if (Messia.resizeTimeoutId) {
					clearTimeout(Messia.resizeTimeoutId);
				}
				Messia.resizeTimeoutId = setTimeout(Messia.adjustThumnails, 100);
			},
		};

		Messia.adjustThumnails();
		$(window).on('resize', Messia.prepareResize);
	});

})(jQuery);
import 'nodeModules/slick-carousel/slick/slick.js';

(function ($) {
	$(function () {
		$('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
			var idActiveTab = $(this)[0]['hash'];
			$(idActiveTab).find('.slick-initialized').slick('setPosition');
		});
	});
})(jQuery);
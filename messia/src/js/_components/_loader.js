/**
 * Animated spinner.
 *
 * @param {string} showHide Show or hide.
 * @param {string} selector JQ element to append loader to.
 *
 * @return Promise.
 */
const loaderFn = (showHide, selector) => {
	const $ = jQuery;

	if (showHide === 'show') {
		return new Promise(
			resolve => {
				if ($(`${selector} > .messia-spinner`).length > 0) {
					resolve('done');
				}
				$(selector).append('<div class="messia-spinner"><div class="loading"><i></i><i></i><i></i><i></i></div></div>');
				$('.overlay').addClass('overlay-show');
				resolve('done');
			}
		);

	} else if (showHide === 'hide') {

		return new Promise(
			resolve => {
				$(selector).find('.messia-spinner').animate({
					opacity: 0,
				}, 100, "swing", function () {
					$(this).remove();
					$('.overlay').removeClass('overlay-show');
					resolve('done');
				});
			}
		);
	}
};

global.MessiaExt = global.MessiaExt || {};
global.MessiaExt = {
	...global.MessiaExt,
	...{ loader: loaderFn }
};
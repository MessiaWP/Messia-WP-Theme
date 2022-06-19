import './_components/_logger.js';
import './_components/_worker_dispatcher.js';
import './_components/_ripple.js';
import './_components/_checkbox.js';
import './_components/_radio.js';
import './_components/_input_text.js';

(function ($) {

	/**
	 * Mobile scenario handler. Perfom a set of operation
	 * if page is on mobile view.
	 *
	 * @return void.
	 */
	const isMobile = async () => {
		const
			$ = jQuery,
			mobilePlatform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		/**
		 * Count selected options in Select2 and print X items selected.
		 *
		 * @param HTML select  Select HTML tag
		 *
		 * @return void
		 */
		const countSelected = (select) => {
			let widget = $(select).data('select2'),
				options = widget.$dropdown.find('li'),
				selection = widget.$selection,
				selected = $(select).select2('data'),
				selectedIds = selected.map(index => index.id),
				selectAll = selectedIds.includes('-1'),
				result = selection.find('ul'),
				count = selected.length;

			options.map((index, value) => {
				let option = $(value).find('.option'),
					check = option.find('.checkbox-select2'),
					optionId = check.data('optionId'); // setted in templateResult().

				(selectAll && optionId !== -1) ? option.addClass('opacity-6') : option.removeClass('opacity-6');
				(!selectAll && optionId === -1) ? check.addClass('checked-semi') : check.removeClass('checked-semi');
				(selectedIds.includes(optionId.toString())) ? check.addClass('checked') : check.removeClass('checked');
			});

			if (count > 1) {
				result.html(`<li class="select2-selection__choice">${messiaVars.messages.itemsSelected.plural.replace('%n', count)}</li>`);
			}
		}

		// Проверка - мобильное устроиство или PC
		if (!mobilePlatform) {

			const
				themeUrl = messiaVars.themeUrl,
				min = (messiaVars.scriptDebug === false) ? '.min' : '';

			$('<link/>', {
				rel: 'stylesheet',
				type: 'text/css',
				href: `${themeUrl}/includes/assets/css/libraries/select2${min}.css`
			}).prependTo('head');

			try {
				await getScript(`${themeUrl}/includes/assets/js/libraries/select2${min}.js`);

				$('select:not(.messia-filter-select)').select2({
					dropdownParent: $('main'),
					width: '100%',
					minimumResultsForSearch: Infinity,
				});
				$('select.messia-filter-select:not([multiple])').select2({
					width: '100%',
					dropdownParent: $('main'),
					escapeMarkup: function (markup, r) {
						return markup.replace(/\[(\d+)\]/g, '<sup>$1</sup>');
					},
					closeOnSelect: true,
					//allowClear: true, //buggy
				});
				$('select.messia-filter-select[multiple]').select2({
					width: '100%',
					dropdownParent: $('main'),
					escapeMarkup: function (markup, r) {
						return markup.replace(/\[(\d+)\]/g, '<sup>$1</sup>');
					},
					closeOnSelect: false,
					//allowClear: true, //buggy
					templateResult: function (tag, container) {
						var checked = '',
							opacity_6 = '',
							checked_semi = '',
							select = $(tag.element).parent('select'),
							selected = select.select2('data');

						if (select.prop('multiple') === false) return tag.text;
						if (typeof selected !== 'object') return tag.text;

						var selectedIds = selected.map(index => index.id),
							selectAll = selectedIds.includes('-1');

						opacity_6 = (selectAll && tag.id !== '-1') ? ' opacity-6' : '';
						checked_semi = (!selectAll && tag.id === '-1') ? ' checked-semi' : '';
						checked = (selectedIds.includes(tag.id)) ? ' checked' : '';

						return $(`<div class="d-flex align-items-center fade show option${opacity_6}">
							<span class="flex-grow-1">${tag.text}</span>
							<span data-option-id="${tag.id}" class="checkbox-select2 flex-shrink-0${checked}${checked_semi}"></span>
						</div>`);
					},
					templateSelection: function (tag, container) {
						if ('locked' === $(tag.element).attr('locked')) {
							$(container).addClass('locked-tag');
							tag.locked = true;
						}
						return tag.text;
					},
				});

				$('select.messia-filter-select[multiple]').each(function () {
					countSelected(this);
				});
				$('.select2.select2-container').find('.select2-search__field:not([placeholder=""])').css('width', '');

				$('select.messia-filter-select[multiple]').on('change', function () {
					countSelected(this);
				});
			} catch (error) {
				const body = {
					message: 'Error loading Select2 assets',
					error: error,
				}
				MessiaExt.logger.error(body);
			}
		}
	};

	/**
	 * Cookie getter.
	 *
	 * @param {string} name Cookie name.
	 *
	 * @return object|string
	 */
	const getCookie = (name) => {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
	}

	/**
	 * Cookie setter.
	 *
	 * @param {string} name    Cookie name.
	 * @param {string} value   Cookie value.
	 * @param {object} options Cookie extar data.
	 *
	 * @return void.
	 */
	const setCookie = (name, value, options = {}) => {

		options = {
			path: '/',
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}

		document.cookie = updatedCookie;
	}

	/**
	 * Custom smooth scroller.
	 *
	 * @param {number} offsetTop Position to scroll to.
	 *
	 * @return void.
	 */
	const scrollTo = (offsetTop) => {
		const $ = jQuery,
			currentOffsetTop = window.pageYOffset || document.documentElement.scrollTop,
			speed = Math.abs((offsetTop - currentOffsetTop) / 3); // 3px per second

		$('body,html').animate({
			scrollTop: offsetTop
		}, speed);
	};

	/**
	 * Instantiate range plugin on nodes.
	 *
	 * @param {object} elements jQuery elements set to creat range from.
	 *
	 * @return void.
	 */
	const doRange = (elements) => {

		elements.ionRangeSlider({
			skin: 'round',
			//prettify_enabled: true,
			//prettify_separator: '',
			force_edges: true,
			extra_classes: 'forced-edges-true',
			onFinish: function (range) {
				let event = new Event('changeFinish');
				range.input.get(0).dispatchEvent(event);
			},
			onUpdate: function (range) {
				let event = new Event('updateFinish');
				range.input.get(0).dispatchEvent(event);
			}
		});

		for (let i = 0; i < elements.length; i++) {
			const
				range = $(elements[i]),
				data = range.data(),
				slider = data.ionRangeSlider;

			slider.update({
				prettify: function (number) {
					if (!data.prettifyEnabled) {
						return number;
					}
					let n = number.toFixed(data.precision).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${data.prettifySeparator}`);
					if (data.precision > 0) n = n.replace(/\.(\d+)$/g, `${data.decimalSeparatop}$1`);

					return n;
				},
			});
			slider.prev_value = range.val();
		}
	};

	/**
	 * Load remote src, append to DOM.
	 *
	 * @param {string} url Source URL.
	 *
	 * @return Promise.
	 */
	const getScript = (url) => {
		return new Promise((resolve, reject) => {
			let newScript = document.createElement('script');
			newScript.onerror = reject;
			newScript.onload = resolve;
			document.head.appendChild(newScript);
			newScript.src = url;
		});
	}

	/**
	 * Actions on document.ready event.
	 *
	 * @return void
	 */
	const initActions = () => {

		const toggleItemsMenu = function (e) {
			if ($(window).width() <= '767') {
				e.preventDefault()
				$(this).siblings(".sub-menu").slideToggle(300);
				$(this).toggleClass("active");
			}
		};

		const setupNavigation = function () {
			$('.navigation.pagination .page-numbers').addClass('messia-ripple-click messia-btn');
		};

		const updateSelectDrop = function () {
			var select = $('.select2.select2-container--open .select2-selection');

			if (select.length === 0) return;

			var selectId = $('.select2.select2-container--open .select2-selection').attr('aria-owns').replace('select2-', '').replace('-results', '');
			var select = $(`select[data-select2-id='${selectId}']`);

			select.select2('close');
			select.select2('open');
		};

		$('.messia-nav-menu .menu-item.menu-item-has-children > .menu-item-expand-collapse').on('click', toggleItemsMenu);
		$('.listing').on('listingUpdated', updateSelectDrop);

		setupNavigation();
		isMobile();
	}

	global.MessiaExt = global.MessiaExt || {};
	global.MessiaExt = {
		...global.MessiaExt,
		...{
			isMobile: isMobile,
			getCookie: getCookie,
			setCookie: setCookie,
			scrollTo: scrollTo,
			doRange: doRange,
			isMobile: isMobile,
			getScript: getScript,
		}
	};

	$(function () {
		initActions();
	});

})(jQuery);
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/listing/default/listing.scss":
/*!***********************************************!*\
  !*** ./src/scss/listing/default/listing.scss ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_loader.js":
/*!***************************************!*\
  !*** ./src/js/_components/_loader.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

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

__webpack_require__.g.MessiaExt = __webpack_require__.g.MessiaExt || {};
__webpack_require__.g.MessiaExt = {
	...__webpack_require__.g.MessiaExt,
	...{ loader: loaderFn }
};

/***/ }),

/***/ "./src/js/listing-default.js":
/*!***********************************!*\
  !*** ./src/js/listing-default.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components/_loader.js */ "./src/js/_components/_loader.js");
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_loader_js__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {

	$(function () {

		const Messia = {

			xhr: null,
			map: false,
			animationInProgress: false,
			mapViewer: '.view-toggle[data-view="map"]',
			title: $('head title'),
			description: $('head meta[name="description"]'),
			objects_geo: {},
			listing: $('.listing'),
			load_more: $('.listing a.load'),
			all_text_filters: $('.listing .sidebar input[type="text"].messia-filter-text, .listing .content .panel-top-content input[type="text"].messia-filter-text'),
			all_select_filters: $('.listing .sidebar select.messia-filter-select, .listing .content .panel-top-content select.messia-filter-select'),
			all_multi_select_filters: $('select[multiple].messia-filter-select'),
			all_checkbox_filters: $('.listing .sidebar input[type="checkbox"].messia-filter-checkbox, .listing .content .panel-top-content input[type="checkbox"].messia-filter-checkbox'),
			all_range_filters: $('.listing .sidebar input[type="text"].messia-filter-range'),
			all_radio_filters: $('.listing .sidebar input[type="radio"].messia-filter-radio'),
			all_property_groups: $('.listing .sidebar .property-group'),
			listing_resolver: $('.listing .sidebar input#listing-resolver'),
			allFilters: function () {
				return Messia.all_select_filters.add(Messia.all_text_filters).add(Messia.all_checkbox_filters).add(Messia.all_range_filters).add(Messia.all_radio_filters).add(Messia.load_more);
			},
			allPropertyFilters: function () {
				return Messia.all_checkbox_filters.filter('[data-taxonomy="messia_object_property"]');
			},
			tooltipConfig: {
				placement: 'top',
			},
			toggleObjectsViewMode: function (e) {

				var cookie = window.MessiaExt.getCookie('messia');

				switch ($(this).data('view')) {

					case 'grid':
						$('.content-items').show();
						$('.content-map').hide();
						$('#objects').removeClass('list-container').addClass('grid-container');
						cookie.listing_view_mode = 'grid';

						Messia.initTooltip();

						// Let WOW animate cards
						$(window).triggerHandler('scroll');
						break;

					case 'list':
						$('.content-items').show();
						$('.content-map').hide();
						$('#objects').removeClass('grid-container').addClass('list-container');
						cookie.listing_view_mode = 'list';

						Messia.initTooltip();

						// Let WOW animate cards
						$(window).triggerHandler('scroll');
						break;

					case 'map':
						$('.content-items').hide();
						$('.content-map').show();
						cookie.listing_view_mode = 'map';

						Messia.initTooltip();
						break;
				}

				$(".list-map-button").attr("data-view", $(this).attr("data-view"));
				$(".view-toggle").removeClass("active");
				$(this).addClass("active");

				var now = new Date();
				window.MessiaExt.setCookie('messia', JSON.stringify(cookie), { expires: new Date(now.setFullYear(now.getFullYear() + 1)) }); // 1 year plus from now
			},
			/**
			 * Initial map load (map view clicked)
			 */
			loadMap: async function (event) {

				// Prevent potentail multiple map including.
				$(Messia.mapViewer).off('click', Messia.loadMap);

				var mapApiKey = $('body').data('key');
				Messia.updateMapStart();

				try {
					await MessiaExt.getScript('https://unpkg.com/@google/markerclustererplus@5.0.3/dist/markerclustererplus.min.js'),
					await MessiaExt.getScript(`https://maps.googleapis.com/maps/api/js?key=${mapApiKey}`);

					$(Messia.mapViewer).on('click', Messia._updateMap);
					Messia.initMap();
					$(Messia.mapViewer).triggerHandler('click', [false]);

					return Promise.resolve('done');

				} catch (error) {
					Messia.updateMapFinish();

					// Get back handler on error loading map.
					$(Messia.mapViewer).on('click', Messia.loadMap);

					const body = {
						message: 'Error loading Google map.',
						error: error,
					}
					MessiaExt.logger.error(body);

					return Promise.reject('fail');
				}
			},
			/**
			 * Map successfully loaded - instantiate it
			 */
			initMap: function () {

				var infoWindow;

				var mapStyles = [{
					stylers: [
						{ hue: "#324156" },
						{ saturation: "-100" },
						{ lightness: "3" },
						{ gamma: 1.51 }
					]
				}
				];
				var messiaMapType = new google.maps.StyledMapType(mapStyles, {
					name: "Messia",
				});
				var mapConfig = {
					zoom: 4,
					center: { lat: 50.0958745, lng: 14.4255231 },
					mapTypeControl: false,
					//scrollwheel: false,
					gestureHandling: 'cooperative',
					streetViewControl: false,
					mapTypeId: 'messia_style',
					mapTypeControlOptions: {
						mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'messia_style'],
						style: google.maps.MapTypeControlStyle.DEFAULT,
					},
				}

				Messia.map = new google.maps.Map(document.getElementById('objects-map'), mapConfig);

				// Add Messia properties into map object
				Messia.map.messia = {
					markers: [],
					markerClusterer: false,
				}

				infoWindow = new google.maps.InfoWindow;

				// Try to find user position
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(

						// Success
						function (position) {

							var pos = {
								lat: position.coords.latitude,
								lng: position.coords.longitude
							};

							// Do not add it to messia markers
							// to let this marker stay forever
							var client = new google.maps.Marker({
								position: new google.maps.LatLng(pos.lat, pos.lng),
								map: Messia.map,
								icon: '/wp-content/themes/messia/includes/assets/images/svg/marker-you.svg',
							});

							var infoWindow = new google.maps.InfoWindow({
								content: 'You are here'
							});

							client.addListener('mouseover', function () {
								infoWindow.open(Messia.map, client);
							});
							client.addListener('mouseout', function () {
								infoWindow.close(Messia.map, client);
							});

							Messia.map.setCenter(pos);

						},
						// Fail
						function () {
							// nothing for now
						}
					);
				}

				Messia.map.mapTypes.set('messia_style', messiaMapType);
				Messia.map.bounds = new google.maps.LatLngBounds();
			},
			/**
			 * Wrapper for real map update
			 * triggers on listing update
			 */
			updateMap: function (event, url, append, keepList) {

				var mapViewer = $(Messia.mapViewer);
				mapViewer.data('mapIsUpToDate', false);

				// Continue only if we are in map view mode
				if (mapViewer.hasClass('active')) {
					$(Messia.mapViewer).triggerHandler('click', [append]);
				}
			},
			_updateMap: function (event, append) {

				var mapIsUpToDate = $(this).data('mapIsUpToDate');

				// Allready up to date
				if (mapIsUpToDate === true) {
					return;
				}

				// Flush preset of shown markers
				// and clear markers & clusters & bounds
				if (append === false) {

					for (var i = 0; i < Messia.map.messia.markers.length; i++) {
						Messia.map.messia.markers[i].setMap(null);
					}
					if (Messia.map.messia.markerClusterer) {
						Messia.map.messia.markerClusterer.clearMarkers();
					}
					Messia.map.messia.markers = [];
					Messia.objects_geo = {};
					Messia.map.bounds = new google.maps.LatLngBounds();
				}

				// Only newely added object's data
				var coords = Messia.getObjectsGeoData();

				$.extend(Messia.objects_geo, coords);

				// Nothing to show
				if (Object.keys(coords).length === 0) {
					$(this).data('mapIsUpToDate', true);
					Messia.updateMapFinish();
					return;
				}

				// Start update
				Messia.updateMapStart();

				for (var id in coords) {
					for (var i = 0; i < coords[id].length; i++) {

						var pin = new google.maps.LatLng(coords[id][i]['lat'], coords[id][i]['lng']);

						let infowindow = new google.maps.InfoWindow({
							content: coords[id][i]['address']
						});
						let marker = new google.maps.Marker({
							position: pin,
							map: Messia.map,
							icon: '/wp-content/themes/messia/includes/assets/images/svg/marker.svg',
						});

						Messia.map.messia.markers.push(marker);
						Messia.map.bounds.extend(pin);

						marker.addListener('mouseover', function () {
							infowindow.open(Messia.map, marker);
						});
						marker.addListener('mouseout', function () {
							infowindow.close(Messia.map, marker);
						});
					}
				}

				Messia.map.messia.markerClusterer = new MarkerClusterer(Messia.map, Messia.map.messia.markers, {
					imagePath: '/wp-content/themes/messia/includes/assets/images/svg/m',
					imageExtension: 'svg'
				});
				Messia.map.fitBounds(Messia.map.bounds);

				$(this).data('mapIsUpToDate', true);
				Messia.updateMapFinish();

			},
			/**
			 * Return object's coords that
			 * are not in Messia.objects_geo
			 */
			getObjectsGeoData: function () {

				var geoset = {};
				var cards = $('.listing .content-items .object-card');

				for (var i = 0; i < cards.length; i++) {

					var card_id = $(cards[i]).data('id');
					var geo_data = $(cards[i]).data('geoData');

					if (typeof Messia.objects_geo[card_id] !== 'undefined') {
						continue;
					}

					for (var q = 0; q < geo_data.length; q++) {

						var address = geo_data[q].info;
						var lat = geo_data[q].lat;
						var lng = geo_data[q].lng;

						if (typeof lat === 'undefined' || typeof lng === 'undefined') {
							delete geoset[card_id];
							continue;
						}

						if (typeof geoset[card_id] === 'undefined') {
							geoset[card_id] = [];
						}

						geoset[card_id].push({
							'address': address,
							'lat': lat,
							'lng': lng,
						});
					}
				}
				return geoset;
			},
			getListing: function (event, url, append, keepList) {

				if (Messia.xhr != null) {
					Messia.xhr.abort();
					Messia.xhr = null;
				}

				Messia.xhr = $.ajax({
					type: 'POST',
					url: messiaVars.ajaxUrl,
					data: {
						action: 'get_listing',
						messiaNonce: messiaVars.messiaNonce,
						data: {
							AJAX_Marker: messiaVars.AJAX_Marker,
							query: url,
							postid: $('body').data('postid'),
							keepList: keepList,
							config: Messia.listing.find('#objects').data('config'),
						},
					},
					beforeSend: function () {
						Messia.searchStart();
					},
					success: function (server) {

						if (server.data.code === 301) {

							var url = new URL(server.data.location);

							window.history.pushState({
								listingUrl: url.toString(),
							}, '', url);

							Messia.listing.triggerHandler('query_url_builded', [url.toString(), append, keepList]);

							const body = {
								message: 'Incorrect listing URL.',
								error: server.data.message,
							}
							MessiaExt.logger.warn(body);
						}

						Messia.searchFinish();
						Messia.updateStart();

						if (server.data.code === 200) {

							var dur = 400;
							var object_container = Messia.listing.find('#objects');
							Messia.load_more.attr('data-lists', server.data.lists);
							Messia.toggleLoadVisibility(server.data.lists, dur);
							Messia.updateFound(server.data.found);

							if (append) {
								object_container.find('.not-found').remove();
								object_container.append(server.data.cards).find('[title]').tooltip(Messia.tooltipConfig);
								Messia.updateSeo(server.data.seo);
								Messia.updateBreadcrumbs(server.data.breadcrumbs);

								Messia.listing.triggerHandler('listingUpdated', [url, append, keepList]);
							}
							else {

								object_container.fadeOut(dur, function () {

									$(this).empty().append(server.data.cards).fadeIn(dur, function () {
										object_container.find('[title]').tooltip(Messia.tooltipConfig);
										Messia.updateSeo(server.data.seo);
										Messia.updateBreadcrumbs(server.data.breadcrumbs);
									});

								}).promise().done(function () {
									Messia.listing.triggerHandler('listingUpdated', [url, append, keepList]);
								});
							}

							if (typeof server.data.properties != 'undefined') {
								Messia.toggleCheckboxDisability(server.data.properties);
							}

							if (typeof server.data.categories != 'undefined') {
								// TODO - fine tune logic
								Messia.toggleOptionsDisability(server.data.categories);
							}

						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (Messia.xhr.status === 0 && Messia.xhr.statusText == 'abort') {
							return;
						}
						else {
							Messia.searchFinish();
						}
					},
					complete: function (server, textStatus, MLHttpRequest) {
						Messia.xhr = null;
					},
				});
			},
			toggleLoadVisibility: function (lists, dur) {

				// lists is undefined when it is wrong url and server response Invalid URL
				if (Messia.load_more.data('list') >= lists || 'undefined' === typeof lists) {
					Messia.load_more.fadeOut(dur).promise().done(function () {
						this.removeAttr('href');
						this.attr('rel', 'nofollow');
						Messia.updateFinish('updating-loadmore');
					});
				}
				else {
					Messia.load_more.fadeIn(dur).promise().done(function () {
						Messia.updateFinish('updating-loadmore');
						this.removeAttr('rel');
					});
				}
			},
			toggleOptionsDisability: function (available_categories) {
				for (let i = 0; i < Messia.all_select_filters.length; i++) {

					var filter = $(Messia.all_select_filters[i]);

					if (filter.data('taxonomy') === 'messia_object_category' && filter.prop('multiple') === true) {
						var options = filter.find('option');

						for (let z = 0; z < options.length; z++) {

							var option = $(options[z]);

							if (
								available_categories.includes(option.data('term')) || // is inside of available categories.
								filter.val().includes(option.val()) || // or selected now.
								option.val() === '-1' // os select all.
							) {
								option.prop('disabled', false);
							}
							else {
								option.prop('disabled', true);
							}
						};
					}
				}
			},
			toggleCheckboxDisability: function (available_properties) {
				for (let i = 0; i < Messia.all_checkbox_filters.length; i++) {

					var filter = $(Messia.all_checkbox_filters[i]);

					if (filter.data('url') !== 'query' && filter.data('url') !== 'hash') {
						continue;
					}

					if (available_properties.includes(filter.attr('name'))) {
						filter.prop('disabled', false);
					}
					else if (false === filter.prop('checked')) {
						filter.prop('disabled', true);
					}
				}
			},
			showHideFilters: function (filter, all_filters) {

				var all_filters_parents = all_filters.parents('.filter');

				var categoryFiltersShow = Messia.getCategoryFiltersToShow(filter, all_filters_parents);
				var categoryFiltersHide = Messia.getCategoryFiltersToHide(filter, all_filters_parents);

				var propertyFiltersShow = Messia.getPropertyFiltersToShow(filter, all_filters_parents);
				var propertyFiltersHide = Messia.getPropertyFiltersToHide(propertyFiltersShow, all_filters_parents);

				var propertyGroupsVisibility = Messia.getPropertyGroupsVisibility(propertyFiltersShow, propertyFiltersHide);

				var group_title_show = propertyGroupsVisibility.to_show.find('.property-group-heading');
				var group_title_hide = propertyGroupsVisibility.to_hide.find('.property-group-heading');

				var dependent_filters_show = categoryFiltersShow.add(propertyFiltersShow).parents('.filter');
				var dependent_filters_hide = categoryFiltersHide.add(propertyFiltersHide).parents('.filter');

				Messia.toggleFiltersVisibility(
					group_title_show,
					group_title_hide,
					dependent_filters_show,
					dependent_filters_hide
				);

			},
			toggleFiltersVisibility: function (group_title_show, group_title_hide, dependent_filters_show, dependent_filters_hide) {

				if (true === Messia.animationInProgress) {
					return;
				}

				let timingShow = parseInt($('.messia-widget-listing-filters').css('--messia-filters-show-timing'));
				let timingHide = parseInt($('.messia-widget-listing-filters').css('--messia-filters-hide-timing'));

				group_title_show.add(dependent_filters_show);//.removeClass('collapsed');
				group_title_show.parent('.property-group');//.removeClass('collapsed');

				group_title_show = group_title_show.not(':not(.off):not(.shown)');
				group_title_hide = group_title_hide.not('.hidden, .off');

				dependent_filters_show = dependent_filters_show.not(':not(.off):not(.shown)');
				dependent_filters_hide = dependent_filters_hide.not('.hidden, .off');

				dependent_filters_show.addClass('to-show');
				dependent_filters_hide.addClass('to-hide');

				Messia.setMaxHeight(group_title_show);
				Messia.setMaxHeight(group_title_hide);
				Messia.setMaxHeight(dependent_filters_show);
				Messia.setMaxHeight(dependent_filters_hide);

				// SHOW
				let showPromise = Messia.delay(0)
					.then((resolve) => {
						Messia.animationInProgress = true;
						return Messia.delay(0);
					})
					// Groups
					.then((resolve) => {
						group_title_show.addClass('shown').removeClass('hidden off');
						return Messia.delay((group_title_show.length > 0) ? timingShow / 2 : 0);
					})
					// Filters
					.then((resolve) => {
						dependent_filters_show.addClass('shown').removeClass('hidden off');
						return Messia.delay(timingShow);
					})
					// Shown
					.then((resolve) => {
						return Promise.resolve('shown');
					});

				// HIDE
				let hidePromise = Messia.delay(0)
					.then((resolve) => {
						Messia.animationInProgress = true;
						return Messia.delay(0);
					})
					// Filters
					.then((resolve) => {
						dependent_filters_hide.addClass('hidden').removeClass('shown');
						return Messia.delay(timingHide / 2);
					})
					// Groups
					.then((resolve) => {
						group_title_hide.addClass('hidden').removeClass('shown');
						return Messia.delay(timingHide);
					})
					// Hidden
					.then((resolve) => {
						return Promise.resolve('hidden');
					});

				return new Promise((resolve, reject) => {
					Promise.allSettled([showPromise, hidePromise]).then((results) => {
						Messia.animationInProgress = false;
						return resolve('done');
					});
				});
			},
			toggleGroup: async function (e, force = false) {

				let timing;
				var group = $(this).parent('.property-group');
				var filters = group.find('.filter');

				if (force === 'close' && group.hasClass('collapsed')) return;
				if (force === 'open' && !group.hasClass('collapsed')) return;

				return Messia.delay(0)
					.then((resolve) => {
						return Messia.delay(0);
					})
					.then((resolve) => {
						if (group.hasClass('collapsed')) {
							timing = parseInt($('.messia-widget-listing-filters').css('--messia-filter-show-timing'));
							filters = filters.not(':not(.collapsed)');

							Messia.setMaxHeight(filters);

							group.removeClass('collapsed');
							filters.addClass('shown').removeClass('hidden off collapsed');
						}
						else {
							timing = parseInt($('.messia-widget-listing-filters').css('--messia-filter-hide-timing'));
							filters = filters.not('.hidden, .off');

							Messia.setMaxHeight(filters);

							group.addClass('collapsed');
							filters.addClass('hidden collapsed').removeClass('shown');
						}
						return Messia.delay(timing);
					})
					// Toggled
					.then((resolve) => {
						return Promise.resolve('done');
					});
			},
			setMaxHeight: function (elements) {

				for (let i = 0; i < elements.length; i++) {
					const element = $(elements[i]);
					element.addClass('get-scroll-height').css('--max-height', `${elements[i].scrollHeight}px`).removeClass('get-scroll-height');
				}
			},
			onFiltersAnmated: function (e) {
				let target = $(e.target);
				if (e.originalEvent.animationName.indexOf('Hide') > 0) {
					target.addClass('off');
				}
				target.removeClass('hidden shown to-show to-hide');
				target.removeAttr('style');
			},
			getCategoryFiltersToShow: function (selected, all_filters, dependent_filters = $()) {

				var to_show;
				var selected_val;
				var filter_tax = selected.attr('data-taxonomy');

				selected_val = selected.val();
				to_show = all_filters.find('[data-parent-term="' + selected_val + '"][data-taxonomy="' + filter_tax + '"]').not(selected);

				if (to_show.length > 0) {

					// показать фильтр, активируемый значением текущего фильтра
					dependent_filters = dependent_filters.add(to_show);

					for (let i = 0; i < to_show.length; i++) {
						dependent_filters = Messia.getCategoryFiltersToShow($(to_show[i]), all_filters, dependent_filters);
					}
				}

				return dependent_filters;
			},
			getCategoryFiltersToHide: function (selected, all_filters, dependent_filters = $()) {

				var unselected_options = [];
				var selected_val = selected.val();
				var filter_tax = selected.attr('data-taxonomy');

				if (dependent_filters.length == 0) {
					unselected_options = selected.find('option[value!="' + selected_val + '"][value!="-1"]');
				}
				else {
					unselected_options = selected.find('option[value!="-1"]');
				}

				if (unselected_options.length > 0) {
					for (let i = 0; i < unselected_options.length; i++) {

						var to_hide = all_filters.find('[data-parent-term="' + unselected_options[i].value + '"][data-taxonomy="' + filter_tax + '"]').not('[data-parent-term="0"]');

						if (to_hide.length > 0) {

							// скрыть фильтр, активируемый значением текущего фильтра
							dependent_filters = dependent_filters.add(to_hide);

							for (let q = 0; q < to_hide.length; q++) {
								dependent_filters = Messia.getCategoryFiltersToHide($(to_hide[q]), all_filters, dependent_filters);
							}
						}
					}
				}

				return dependent_filters;
			},
			getPropertyFiltersToShow: function (selected, all_filters) {

				var to_show = $();
				var selected_term = selected.find(':selected');

				if ('object' === typeof selected_term || 'array' === typeof selected_term) {
					for (let i = 0; i < selected_term.length; i++) {
						const term = $(selected_term[i]).data('term');
						const filter = all_filters.find('[data-category-parent-terms*="<' + term + '>"][data-taxonomy="messia_object_property"]').not('[data-category-parent-terms="0"]');
						to_show = to_show.add(filter);
					}
				}
				else {
					to_show = all_filters.find('[data-category-parent-terms*="<' + selected_term.data('term') + '>"][data-taxonomy="messia_object_property"]').not('[data-category-parent-terms="0"]');
				}

				return to_show;
			},
			getPropertyFiltersToHide: function (to_show, all_filters) {

				var filters = all_filters.not('.hidden').find('[data-taxonomy="messia_object_property"]').not(to_show).not('[data-category-parent-terms="0"]');
				return filters;
			},
			getPropertyGroupsVisibility: function (propertyFiltersToShow, propertyFiltersToHide) {

				var groups = Messia.all_property_groups;
				var filtersToShow = propertyFiltersToShow.parents('.filter');
				var filtersToHide = propertyFiltersToHide.parents('.filter');
				var visibility = {
					'to_show': $(),
					'to_hide': $(),
				}

				for (let i = 0; i < groups.length; i++) {

					var group = $(groups[i]);
					var filters = group.find('.filter'); // all filters
					var visible = filters.not(filtersToHide).not('.hidden'); // will be visible
					var hidden = filters.not(filtersToShow).add('hidden'); // will be hidden
					var result = filters.not(hidden).add(visible); // what we will see

					if (result.length > 0) {
						visibility.to_show = visibility.to_show.add(group);
					} else {
						visibility.to_hide = visibility.to_hide.add(group);
					}
				}

				return visibility;

			},
			generateListingUrl: function (event) {

				if ($(this).hasClass('load')) {
					event.preventDefault();
				}
				if ($(this).hasClass('messia-filter-range')) {

					const
						range = Messia.getIonRangeSliderInstance($(this)),
						rangeVal = $(this).val();

					if (typeof range.prev_value === 'undefined') {
						range.prev_value = rangeVal;
					} else if (rangeVal === range.prev_value) {
						return;
					} else {
						range.prev_value = rangeVal;
					}
				}

				//селект не успевает закрыться
				setTimeout(function (target) {

					var all_filters = Messia.allFilters();

					if (target.data('taxonomy') == 'messia_object_category') {
						Messia.showHideFilters(target, all_filters);
					}

					Messia._generateListingUrl(target, all_filters);
				}, 50, $(this));

			},
			_generateListingUrl: function (target, all_filters) {

				var
					path = '',
					query = '',
					hash = '',
					append = false,
					keepList = false,
					pathPrefix = '',
					queryOrder = messiaVars.queryOrder;

				var values = {
					path: [$('.listing input[type="hidden"][name="segment"]').val()],
					query: {},
					hash: {},
				};

				if (target.prop('nodeName') == 'A' && target.hasClass('load')) {

					var list_now = target.data('list');

					// Аппенд отдельно. Т.к. смена фильтра сбрасывает
					// пагинацию, а Загурзить еще - нет. При этом в
					// обоих случаях keepList = false
					append = true;
					target.data('list', list_now + 1);
				}
				// Это приводит с сбросу пагинации в начало
				// Поиск по подстроке и сортировка должны
				// происходить без сброса пагинации
				else {
					keepList = target.data('keepList');

					if (keepList === false) {
						Messia.load_more.data('list', 1);
					}
				}

				for (let i = 0; i < all_filters.length; i++) {

					var value;
					var term_order;
					var filter = $(all_filters[i]);
					var wrapper = filter.parents('.filter');
					var by_default = filter.data('default');
					var list = filter.data('list');

					switch (filter.data('url')) {
						case 'path':

							if ((
								true === wrapper.hasClass('to-hide')
								|| true === wrapper.hasClass('hidden')
								|| true === wrapper.hasClass('off')
							) && false === wrapper.hasClass('to-show')) {
								continue;
							}

							value = filter.val();

							if (filter.prop('nodeName') == 'SELECT') {
								if (filter.prop('multiple')) {
									for (let i = 0; i < value.length; i++) {
										if (value[i] != -1) {
											term_order = $(filter.prop('selectedOptions')[i]).data('order');
											values['path'][term_order] = value[i];
										}
									}
								}
								else {
									if (value != -1) {
										term_order = $(filter.prop('selectedOptions')).data('order');
										values['path'][term_order] = value;
									}
								}
							}

							break;

						case 'query':

							value = filter.val();

							if (filter.prop('nodeName') == 'INPUT') {

								// Чекбоксы в таксономии Property в сайдбаре
								if (
									false === wrapper.hasClass('to-show')
									&& 'checkbox' === filter.prop('type')
									&& filter.prop('checked')
								) {

									term_order = filter.data('order');
									('undefined' === typeof values['query'][filter.data('var')]) ? values['query'][filter.data('var')] = [] : '';
									values['query'][filter.data('var')][term_order] = filter.attr('name');
								}
								// интервальные фильтры (Custom fields)
								else if ('messia_constructor' === filter.data('taxonomy')) {
									const
										name = filter.attr('name'),
										term_order = filter.data('order');

									let range = [];

									if (filter.hasClass('messia-filter-range')) {

										const ion = Messia.getIonRangeSliderInstance(filter);

										if (ion.result.from !== ion.result.min || ion.result.to !== ion.result.max) {
											range = value.split(';');
										}
									}

									if (filter.hasClass('messia-filter-radio')) {
										const val = filter.parents('.toggle-filters-wrapper').find(`[name="${name}"]:checked`).val();

										if (val !== 'any') {
											range[0] = range[1] = Number(val);
										}
									}

									if (range.length > 0) {
										('undefined' === typeof values['query'][filter.data('var')]) ? values['query'][filter.data('var')] = [] : '';
										values['query'][filter.data('var')][term_order] = { [name]: { 'a': range[0], 'b': range[1] } };
									}
								}
								// поле поиска
								else if (filter.prop('type') == 'text' && filter.attr('name') == 'search') {

									if (typeof by_default == 'undefined' || value != by_default) {
										values['query'][filter.attr('name')] = [value];
									}
								}
							}
							// кнопка Загрузить еще
							else if (filter.prop('nodeName') == 'A' && filter.attr('name') == 'list') {
								if (typeof by_default == 'undefined' || list != by_default) {
									values['query'][filter.attr('name')] = [list];
								}
							}
							// Сортировка
							else if (filter.prop('nodeName') == 'SELECT' && filter.attr('name') == 'sort') {
								if (typeof by_default == 'undefined' || value != by_default) {
									values['query'][filter.attr('name')] = [value];
								}
							}
							break;

						case 'hash':
							value = filter.val();

							if (filter.prop('nodeName') == 'INPUT') {

								// Чекбоксы в таксономии Property в сайдбаре
								if (
									false === wrapper.hasClass('to-show')
									&& 'checkbox' === filter.prop('type')
									&& filter.prop('checked')
								) {

									term_order = filter.data('order');
									('undefined' === typeof values['hash'][filter.data('var')]) ? values['hash'][filter.data('var')] = [] : '';
									values['hash'][filter.data('var')][term_order] = filter.attr('name');
								}
								// интервальные фильтры
								else if ('messia_constructor' === filter.data('taxonomy')) {

									const
										name = filter.attr('name'),
										term_order = filter.data('order');

									let range = [];

									if (filter.hasClass('messia-filter-range')) {

										const ion = Messia.getIonRangeSliderInstance(filter);

										if (ion.result.from !== ion.result.min || ion.result.to !== ion.result.max) {
											range = value.split(';');
										}
									}

									if (filter.hasClass('messia-filter-radio')) {
										const val = filter.parents('.toggle-filters-wrapper').find(`[name="${name}"]:checked`).val();

										if (val !== 'any') {
											range[0] = range[1] = Number(val);
										}
									}

									if (range.length > 0) {
										('undefined' === typeof values['hash'][filter.data('var')]) ? values['hash'][filter.data('var')] = [] : '';
										values['hash'][filter.data('var')][term_order] = { [name]: { 'a': range[0], 'b': range[1] } };
									}
								}
							}
							break;
					}
				}

				values.path = values.path.filter(function (val) { return val });

				for (var term in values.query) {
					values.query[term] = values.query[term].filter(function (val) { return val });
				}
				for (var term in values.hash) {
					values.hash[term] = values.hash[term].filter(function (val) { return val });
				}

				if (typeof values.query['cf'] !== 'undefined') {
					values.query['cf'] = btoa(JSON.stringify(values.query['cf']));
				}

				if (typeof values.hash['cf'] !== 'undefined') {
					values.hash['cf'] = btoa(JSON.stringify(values.hash['cf']));
				}

				(values.path.length > 0) ? path = '/' + values.path.join('/') + '/' : '';

				if (false === $.isEmptyObject(values.query)) {

					const queryArr = Object.entries(values.query);
					queryArr.sort((a, b) => queryOrder.indexOf(a[0]) - queryOrder.indexOf(b[0]));

					query = new URLSearchParams(queryArr).toString();
					// query = new URLSearchParams(values.query).toString(); For testing only - build wrong ordered URL
				}

				if (false === $.isEmptyObject(values.hash)) {
					const hashArr = Object.entries(values.hash);
					hashArr.sort((a, b) => queryOrder.indexOf(a[0]) - queryOrder.indexOf(b[0]));

					hash = new URLSearchParams(hashArr).toString();
					// hash = new URLSearchParams(values.hash).toString(); For testing only - build wrong ordered URL
				}

				if ('' !== Messia.listing.data('pathPrefix')) {
					pathPrefix = '/' + Messia.listing.data('pathPrefix');
				}

				var url = new URL(window.location.href);
				url.pathname = pathPrefix + path;
				url.search = query;
				url.hash = hash;

				var load_more_url = new URL(url.origin + url.pathname);
				load_more_url.searchParams.append('list', Messia.load_more.data('list'));

				window.history.pushState({
					listingUrl: url.toString(),
				}, '', url);

				Messia.load_more.attr('href', load_more_url.toString());
				Messia.listing.triggerHandler('query_url_builded', [url.toString(), append, keepList]);
			},
			refreshUrl: function (event) {
				document.location.reload();
			},
			updateSeo: function (data) {

				var title = $('body .header-title .container h1');
				var description = $('body .header-title .container .seo-description');

				try {
					Messia.title.text(data.title);
					Messia.description.attr('content', data.description);

					Messia.replaceHtml(title, data.seo_title, false);
					Messia.replaceHtml(description, data.seo_description, 'updating-seo');
				} catch (error) {
					MessiaExt.logger.error(error);
				}
			},
			updateBreadcrumbs: function (breadcrumbsNew) {

				var breadcrumbsCurrent = $('body .header-title .breadcrumb');

				try {
					Messia.replaceHtml(breadcrumbsCurrent, $(breadcrumbsNew).html(), false);
				} catch (error) {
					MessiaExt.logger.error(error);
				}
			},
			updateFound: function (data) {

				const item = $('body .listing .items-found');
				Messia.replaceHtml(item, data, 'updating-found');
			},
			replaceHtml: function (elements, html, class_name) {
				elements.each(function (index) {

					const
						dur = 300,
						element = $(this);

					element.animate({
						opacity: 0,
					}, dur, function () {

						const current = {
							width: element.outerWidth() + 'px',
							height: element.outerHeight() + 'px',
						};

						const next = {
							width: element.outerWidth() + 'px',
							height: element.outerHeight() + 'px',
						};

						element.css(current).html(html).animate(next, dur, function () {
							$(this).css({
								width: '',
								height: '',
							});
						}).delay(dur / 2).animate({
							opacity: 1,
						}, dur, function () {
							$(this).removeAttr('style');
							const is_last = (index == (elements.length - 1));
							if (is_last && class_name) {
								Messia.updateFinish(class_name);
							}
						});
					});
				});
			},
			resolveHash: async function () {

				const url = new URL(document.location);

				if (!url.hash) {
					return;
				}

				const
					groups = $(),
					hashPropertyTerms = new URLSearchParams(url.hash.slice(1)).get('prop'),
					hashConstructorTerms = new URLSearchParams(url.hash.slice(1)).get('cf');

				if (hashPropertyTerms !== null) {
					hashPropertyTerms = hashPropertyTerms.split(',');

					for (let i = 0; i < hashPropertyTerms.length; i++) {
						const propertyFilter = Messia.all_checkbox_filters.filter(`[data-taxonomy="messia_object_property"][name="${hashPropertyTerms[i]}"]`);

						if (
							propertyFilter.prop('type') == 'checkbox'
							&& propertyFilter.prop('disabled') == false
						) {
							// All updates executes directly (not via event)
							propertyFilter.prop('checked', true);
							groups = groups.add(propertyFilter.parents('.property-group').find('.property-group-heading'));
						}
					}

					if (groups.length > 0) {
						groups = $.uniqueSort(groups);
						for (let i = 0; i < groups.length; i++) {
							const group = $(groups[i]);
							await Messia.toggleGroup.call(group, new Event('click'), 'open');
						}
					}
				}

				if (hashConstructorTerms !== null) {

					try {
						var constructor = JSON.parse(atob(hashConstructorTerms));
					} catch (error) {
						MessiaExt.logger.error(new Error('Invalid constructor hash value.'));
					}

					if (typeof constructor === 'object') {

						for (let i = 0; i < constructor.length; i++) {
							const slot = constructor[i];

							for (const term in slot) {
								const
									condition = slot[term],
									rangeFilters = Messia.all_range_filters.filter(`[name="${term}"]`),
									toggleFilters = Messia.all_radio_filters.filter(`[name="${term}"][value="${condition.a}"], [name="${term}"][value="${condition.b}"]`);

								for (let i = 0; i < rangeFilters.length; i++) {
									const
										range = $(rangeFilters[i]),
										rengeObject = Messia.getIonRangeSliderInstance(range);

									// We do not listen to onUpdate event
									rengeObject.update({
										from: condition.a,
										to: condition.b,
									})
									rengeObject.prev_value = range.val();
								}

								for (let i = 0; i < toggleFilters.length; i++) {
									const toggle = $(toggleFilters[i]);
									toggle.prop('checked', true);

								}
							}
						}
					}
				}

				/*
				 * Call listing directly to prevent cumulative requests
				 * for each filter change in resolveHash runtime. It will just
				 * load server with cancelled requests in ajax query.
				 */
				Messia.invokeListingDirectly();
			},
			/**
			 * Fire hidden event to get listing update.
			 *
			 * @return void
			 */
			invokeListingDirectly: function name() {

				const
					event = new Event('change'),
					target = Messia.listing_resolver;

				target.get(0).dispatchEvent(event, false);
			},
			checkViewMode: function () {
				var switcher = $('.list-map-button');
				if (switcher.data('view') === 'map') {
					$('.panel-top-content .view-toggle[data-view="map"]').trigger('click');
				}
			},
			searchStart: function () {
				MessiaExt
					.loader('show', 'body')
					.then((result) => $('body .listing').addClass('searching'));
			},
			searchFinish: function () {
				MessiaExt
					.loader('hide', 'body')
					.then((result) => $('body .listing').removeClass('searching'));
			},
			updateStart: function () {
				$('body .listing').addClass(['updating', 'updating-loadmore', 'updating-found', 'updating-seo']);
			},
			updateFinish: function (class_name) {
				var target = $('body .listing');

				target.removeClass(class_name);

				if (!target.hasClass('updating-loadmore') && !target.hasClass('updating-found') && !target.hasClass('updating-seo')) {
					target.removeClass('updating');
				}
			},
			updateMapStart: function () {
				MessiaExt.loader('show', '.content-map');
			},
			updateMapFinish: function () {
				setTimeout(function () {
					MessiaExt.loader('hide', '.content-map');
				}, 400);
			},
			showFilters: function (e) {
				e.preventDefault();
				$('.messia-widget-listing-filters:first-of-type').toggleClass('open_filters');
				$('.apply-filter').toggleClass('open_filters');
				$('body').toggleClass('overflow-hidden');
			},
			applyFilters: function () {
				$('.messia-widget-listing-filters:first-of-type').toggleClass('open_filters');
				$('.apply-filter').toggleClass('open_filters');
				$('body').removeClass('overflow-hidden');
				$('body,html').animate({ scrollTop: $('.count-items-title').offset().top }, 1100);
			},
			resetListing: function name(e) {
				e.preventDefault();

				const allFilters = Messia.allFilters();

				const listDef = Messia.load_more.data('default');
				Messia.load_more.data('list', listDef);

				for (let i = 0; i < Messia.all_text_filters.length; i++) {
					const
						text = $(Messia.all_text_filters[i]),
						textDef = text.data('default');

					text.val(textDef);
				}

				for (let i = 0; i < Messia.all_select_filters.length; i++) {
					const selectSingle = $(Messia.all_select_filters[i]);
					var selectDef = selectSingle.find('option[value="-1"]').val();

					if (selectSingle.attr('name') == 'sort') {
						selectDef = selectSingle.data('default');
					}

					selectSingle.val(selectDef).trigger('change.select2');

					if (selectSingle.data('taxonomy') == 'messia_object_category') {
						Messia.showHideFilters(selectSingle, allFilters);
					}
				}

				for (let i = 0; i < Messia.all_multi_select_filters.length; i++) {
					const
						selectMulti = $(Messia.all_multi_select_filters[i]),
						selectDef = selectMulti.find('option[value="-1"]').val();

					selectMulti.val(selectDef).trigger('change.select2');

					if (selectMulti.data('taxonomy') == 'messia_object_category') {
						Messia.showHideFilters(selectMulti, allFilters);
					}
				}

				for (let i = 0; i < Messia.all_checkbox_filters.length; i++) {
					const checkbox = $(Messia.all_checkbox_filters[i]);
					checkbox.prop({
						'disabled': false,
						'checked': false,
					});
				}

				for (let i = 0; i < Messia.all_range_filters.length; i++) {
					const
						range = $(Messia.all_range_filters[i])
					rangeObject = Messia.getIonRangeSliderInstance(range),
						from = rangeObject.options.min,
						to = rangeObject.options.max;

					// We do not listen to onUpdate event
					rangeObject.update({
						from: from,
						to: to,
					})
					rangeObject.prev_value = range.val();
				}

				/*
				 * Call listing directly to prevent cumulative requests
				 * for each filter change in resolveHash runtime. It will just
				 * load server with cancelled requests in ajax query.
				 */
				Messia.invokeListingDirectly();
			},
			toggleFilterButton: function (e) {

				if (this.scrollY > this.oldScroll) {
					const requestId = requestAnimationFrame((time) => $('.object-filter-container').css('top', '-45px'));
				}
				else {
					const requestId = requestAnimationFrame((time) => $('.object-filter-container').css('top', '0'));
				}

				this.oldScroll = this.scrollY;
			},
			delay: function (ms) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(ms);
					}, ms);
				});
			},
			multiSelectFocus: function (e) {
				$(this).data('lastValue', $(this).val());
			},
			multiSelectChange: function (e) {

				var value = $(this).val();
				var lastValue = $(this).data('lastValue');
				var changed = false;

				if (value.length === 0) {
					value = ['-1'];
					$(this).val(value);
					changed = true;
				}
				else if (value.length > 1) {
					var selectAllNow = value.indexOf('-1');
					var selectAllNowPrev = lastValue.indexOf('-1');

					// Now selected Select All, previously it was not.
					if (selectAllNow >= 0 && selectAllNowPrev < 0) {
						value = ['-1'];
						$(this).val(value);
						changed = true;
					}
					// Something else selected besides Select All, previously it was.
					else if (selectAllNow >= 0 && selectAllNowPrev >= 0) {
						delete value[selectAllNow];
						$(this).val(value);
						changed = true;
					}
				}

				this.blur();

				if (true === changed) {

					e.stopImmediatePropagation(); // Event handler for all select filters should not start after this again.

					if (JSON.stringify(value) === JSON.stringify(lastValue)) {
						$(this).trigger('change', [true]);
					}
					else {
						$(this).trigger('change', [false]);
					}
				}
			},
			initTooltip: function () {

				$('#objects [title]').tooltip(Messia.tooltipConfig);
				var cardTitles = $('#objects .card-title [title]');

				for (let i = 0; i < cardTitles.length; i++) {
					const title = cardTitles[i];

					if (title.offsetWidth >= title.scrollWidth) {
						$(title).tooltip('disable');
					}
					else {
						$(title).tooltip('enable');
					}
				}
			},
			/**
			 * Check that IonRangeSlider instantiated on element.
			 * If not - create one and return instance.
			 *
			 * @param {HTMLElement} element Dom node.
			 *
			 * @return object.
			 */
			getIonRangeSliderInstance: function (element) {
				if (typeof element.data("ionRangeSlider") === 'undefined') {
					MessiaExt.doRange(element);
				}

				return element.data('ionRangeSlider');
			},
			/**
			 * Callback for IntersectionObserver
			 *
			 * @param {IntersectionObserverEntry} cards    Observed HTML elements
			 * @param {IntersectionObserver}      observer Instance of IntersectionObserver
			 *
			 * @return void
			 */
			cardVisible: function (cards, observer) {

				for (let i = 0; i < cards.length; i++) {

					const cardContainer = cards[i];
					if (cardContainer.intersectionRatio > 0.1) {

						const
							delay = Math.random() * 2 * 100,
							fadeClass = (cardContainer.boundingClientRect.top > 0) ? /* scroll down */ 'fade-in-down' : /* scroll up */ 'fade-in-up';

						setTimeout(() => {
							const show = (time) => {
								cardContainer.target.classList.add('animate', fadeClass);
							};

							const requestId = requestAnimationFrame(show);
						}, delay);

						observer.unobserve(cardContainer.target);
					}
				}
			},
			/**
			 * Create IntersectionObserver for cards visibility tracking.
			 *
			 * @return void
			 */
			observeCardContainers: function () {

				var cards = $('#objects .item-card.wow');

				if (cards.length === 0 || typeof cards === 'undefined') {
					return;
				}

				if (!window.IntersectionObserver) {
					cards.removeClass('wow');
					return;
				}

				let options = {
					root: null,
					rootMargin: '0px',
					threshold: [0.2],
					// delay: 100,
					// trackVisibility: true,
				}

				let observer = new IntersectionObserver(Messia.cardVisible, options);

				for (let i = 0; i < cards.length; i++) {

					const card = cards[i];
					observer.observe(card);
				}
			},
			/**
			 * Callback for IntersectionObserver
			 *
			 * @param {IntersectionObserverEntry} ranges   Observed HTML elements
			 * @param {IntersectionObserver}      observer Instance of IntersectionObserver
			 *
			 * @return void
			 */
			rangeVisible: function (ranges, observer) {

				for (let i = 0; i < ranges.length; i++) {

					const range = ranges[i];

					if (range.isIntersecting) {
						observer.unobserve(range.target);
						MessiaExt.doRange($(range.target));
					}
				}
			},
			/**
			 * Create IntersectionObserver for input range visibility filters.
			 *
			 * @return void
			 */
			observeRangeInputs: function () {

				var ranges = $('.messia-filter-range');

				if (ranges.length === 0 || typeof ranges === 'undefined') {
					return;
				}

				if (!window.IntersectionObserver) {
					MessiaExt.doRange(ranges);
					return;
				}

				let options = {
					root: null,
					rootMargin: '0px',
					threshold: [0],
					// delay: 100,
					// trackVisibility: true,
				}

				let observer = new IntersectionObserver(Messia.rangeVisible, options);

				for (let i = 0; i < ranges.length; i++) {

					const range = ranges[i];
					observer.observe(range);
				}
			},
		};

		Messia.all_multi_select_filters.on('focus select2:selecting select2:unselecting', Messia.multiSelectFocus);
		Messia.all_multi_select_filters.on('change', Messia.multiSelectChange); // should be BEFORE change handlers on filters

		Messia.all_select_filters.on('change', Messia.generateListingUrl);
		Messia.all_checkbox_filters.on('change', Messia.generateListingUrl);
		Messia.all_radio_filters.on('change', Messia.generateListingUrl);
		Messia.all_range_filters.on('changeFinish', Messia.generateListingUrl);
		Messia.all_text_filters.on('input', Messia.generateListingUrl);
		Messia.listing_resolver.on('change', Messia.generateListingUrl);
		Messia.load_more.on('click', Messia.generateListingUrl);

		$('.listing .panel-top-content .view-toggle').on('click', Messia.toggleObjectsViewMode);
		$('.object-filter, .close-filters').on('click', Messia.showFilters);
		$('.property-group-heading').on('click', Messia.toggleGroup);
		$('.sidebar .messia-widget-listing-filters').on('animationend', Messia.onFiltersAnmated);
		$('.apply-filter ').on('click', Messia.applyFilters);
		$('.listing .reset_listing').on('click', Messia.resetListing);
		$(`.listing .panel-top-content ${Messia.mapViewer}`).on('click', Messia.loadMap);
		$(window).on('scroll', Messia.toggleFilterButton);

		Messia.listing.on('query_url_builded', Messia.getListing);
		Messia.listing.on('listingUpdated', Messia.updateMap);
		Messia.listing.on('listingUpdated', Messia.observeCardContainers);
		Messia.listing.on('listingUpdated', Messia.initTooltip);
		$(window).on('popstate', Messia.refreshUrl);

		Messia.resolveHash();
		Messia.checkViewMode();
		Messia.initTooltip();
		Messia.observeCardContainers();
		Messia.observeRangeInputs();

		$('#objects [title]').on('show.bs.tooltip', function (e) {
			Bootstrap.Tooltip.getInstance(this)._config.container = $(this).closest('.object-card').get(0);
		});
	});
})(jQuery);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************************************!*\
  !*** ./src/entries/entry-listing-default.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_listing_default_listing_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/listing/default/listing.scss */ "./src/scss/listing/default/listing.scss");
/* harmony import */ var _js_listing_default_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/listing-default.js */ "./src/js/listing-default.js");
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2xpc3RpbmctZGVmYXVsdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQU0sYUFBYSxxQkFBTTtBQUN6QixxQkFBTTtBQUNOLElBQUkscUJBQU07QUFDVixNQUFNO0FBQ047Ozs7Ozs7Ozs7Ozs7O0FDM0NrQzs7QUFFbEM7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRSwyREFBMkQsR0FBRztBQUNqSSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4RUFBOEUsVUFBVTs7QUFFeEY7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQU07QUFDTjs7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Q0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDOEM7O0FBRTlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvbGlzdGluZy9kZWZhdWx0L2xpc3Rpbmcuc2Nzcz8wNzEyIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fY29tcG9uZW50cy9fbG9hZGVyLmpzIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9saXN0aW5nLWRlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2VudHJ5LWxpc3RpbmctZGVmYXVsdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKipcbiAqIEFuaW1hdGVkIHNwaW5uZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dIaWRlIFNob3cgb3IgaGlkZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBKUSBlbGVtZW50IHRvIGFwcGVuZCBsb2FkZXIgdG8uXG4gKlxuICogQHJldHVybiBQcm9taXNlLlxuICovXG5jb25zdCBsb2FkZXJGbiA9IChzaG93SGlkZSwgc2VsZWN0b3IpID0+IHtcblx0Y29uc3QgJCA9IGpRdWVyeTtcblxuXHRpZiAoc2hvd0hpZGUgPT09ICdzaG93Jykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHRpZiAoJChgJHtzZWxlY3Rvcn0gPiAubWVzc2lhLXNwaW5uZXJgKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoc2VsZWN0b3IpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lc3NpYS1zcGlubmVyXCI+PGRpdiBjbGFzcz1cImxvYWRpbmdcIj48aT48L2k+PGk+PC9pPjxpPjwvaT48aT48L2k+PC9kaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdCQoJy5vdmVybGF5JykuYWRkQ2xhc3MoJ292ZXJsYXktc2hvdycpO1xuXHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHR9IGVsc2UgaWYgKHNob3dIaWRlID09PSAnaGlkZScpIHtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHQkKHNlbGVjdG9yKS5maW5kKCcubWVzc2lhLXNwaW5uZXInKS5hbmltYXRlKHtcblx0XHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHR9LCAxMDAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCgnLm92ZXJsYXknKS5yZW1vdmVDbGFzcygnb3ZlcmxheS1zaG93Jyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG59O1xuXG5nbG9iYWwuTWVzc2lhRXh0ID0gZ2xvYmFsLk1lc3NpYUV4dCB8fCB7fTtcbmdsb2JhbC5NZXNzaWFFeHQgPSB7XG5cdC4uLmdsb2JhbC5NZXNzaWFFeHQsXG5cdC4uLnsgbG9hZGVyOiBsb2FkZXJGbiB9XG59OyIsImltcG9ydCAnLi9fY29tcG9uZW50cy9fbG9hZGVyLmpzJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBNZXNzaWEgPSB7XG5cblx0XHRcdHhocjogbnVsbCxcblx0XHRcdG1hcDogZmFsc2UsXG5cdFx0XHRhbmltYXRpb25JblByb2dyZXNzOiBmYWxzZSxcblx0XHRcdG1hcFZpZXdlcjogJy52aWV3LXRvZ2dsZVtkYXRhLXZpZXc9XCJtYXBcIl0nLFxuXHRcdFx0dGl0bGU6ICQoJ2hlYWQgdGl0bGUnKSxcblx0XHRcdGRlc2NyaXB0aW9uOiAkKCdoZWFkIG1ldGFbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyksXG5cdFx0XHRvYmplY3RzX2dlbzoge30sXG5cdFx0XHRsaXN0aW5nOiAkKCcubGlzdGluZycpLFxuXHRcdFx0bG9hZF9tb3JlOiAkKCcubGlzdGluZyBhLmxvYWQnKSxcblx0XHRcdGFsbF90ZXh0X2ZpbHRlcnM6ICQoJy5saXN0aW5nIC5zaWRlYmFyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdLm1lc3NpYS1maWx0ZXItdGV4dCwgLmxpc3RpbmcgLmNvbnRlbnQgLnBhbmVsLXRvcC1jb250ZW50IGlucHV0W3R5cGU9XCJ0ZXh0XCJdLm1lc3NpYS1maWx0ZXItdGV4dCcpLFxuXHRcdFx0YWxsX3NlbGVjdF9maWx0ZXJzOiAkKCcubGlzdGluZyAuc2lkZWJhciBzZWxlY3QubWVzc2lhLWZpbHRlci1zZWxlY3QsIC5saXN0aW5nIC5jb250ZW50IC5wYW5lbC10b3AtY29udGVudCBzZWxlY3QubWVzc2lhLWZpbHRlci1zZWxlY3QnKSxcblx0XHRcdGFsbF9tdWx0aV9zZWxlY3RfZmlsdGVyczogJCgnc2VsZWN0W211bHRpcGxlXS5tZXNzaWEtZmlsdGVyLXNlbGVjdCcpLFxuXHRcdFx0YWxsX2NoZWNrYm94X2ZpbHRlcnM6ICQoJy5saXN0aW5nIC5zaWRlYmFyIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXS5tZXNzaWEtZmlsdGVyLWNoZWNrYm94LCAubGlzdGluZyAuY29udGVudCAucGFuZWwtdG9wLWNvbnRlbnQgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLm1lc3NpYS1maWx0ZXItY2hlY2tib3gnKSxcblx0XHRcdGFsbF9yYW5nZV9maWx0ZXJzOiAkKCcubGlzdGluZyAuc2lkZWJhciBpbnB1dFt0eXBlPVwidGV4dFwiXS5tZXNzaWEtZmlsdGVyLXJhbmdlJyksXG5cdFx0XHRhbGxfcmFkaW9fZmlsdGVyczogJCgnLmxpc3RpbmcgLnNpZGViYXIgaW5wdXRbdHlwZT1cInJhZGlvXCJdLm1lc3NpYS1maWx0ZXItcmFkaW8nKSxcblx0XHRcdGFsbF9wcm9wZXJ0eV9ncm91cHM6ICQoJy5saXN0aW5nIC5zaWRlYmFyIC5wcm9wZXJ0eS1ncm91cCcpLFxuXHRcdFx0bGlzdGluZ19yZXNvbHZlcjogJCgnLmxpc3RpbmcgLnNpZGViYXIgaW5wdXQjbGlzdGluZy1yZXNvbHZlcicpLFxuXHRcdFx0YWxsRmlsdGVyczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gTWVzc2lhLmFsbF9zZWxlY3RfZmlsdGVycy5hZGQoTWVzc2lhLmFsbF90ZXh0X2ZpbHRlcnMpLmFkZChNZXNzaWEuYWxsX2NoZWNrYm94X2ZpbHRlcnMpLmFkZChNZXNzaWEuYWxsX3JhbmdlX2ZpbHRlcnMpLmFkZChNZXNzaWEuYWxsX3JhZGlvX2ZpbHRlcnMpLmFkZChNZXNzaWEubG9hZF9tb3JlKTtcblx0XHRcdH0sXG5cdFx0XHRhbGxQcm9wZXJ0eUZpbHRlcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIE1lc3NpYS5hbGxfY2hlY2tib3hfZmlsdGVycy5maWx0ZXIoJ1tkYXRhLXRheG9ub215PVwibWVzc2lhX29iamVjdF9wcm9wZXJ0eVwiXScpO1xuXHRcdFx0fSxcblx0XHRcdHRvb2x0aXBDb25maWc6IHtcblx0XHRcdFx0cGxhY2VtZW50OiAndG9wJyxcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVPYmplY3RzVmlld01vZGU6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIGNvb2tpZSA9IHdpbmRvdy5NZXNzaWFFeHQuZ2V0Q29va2llKCdtZXNzaWEnKTtcblxuXHRcdFx0XHRzd2l0Y2ggKCQodGhpcykuZGF0YSgndmlldycpKSB7XG5cblx0XHRcdFx0XHRjYXNlICdncmlkJzpcblx0XHRcdFx0XHRcdCQoJy5jb250ZW50LWl0ZW1zJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JCgnLmNvbnRlbnQtbWFwJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCgnI29iamVjdHMnKS5yZW1vdmVDbGFzcygnbGlzdC1jb250YWluZXInKS5hZGRDbGFzcygnZ3JpZC1jb250YWluZXInKTtcblx0XHRcdFx0XHRcdGNvb2tpZS5saXN0aW5nX3ZpZXdfbW9kZSA9ICdncmlkJztcblxuXHRcdFx0XHRcdFx0TWVzc2lhLmluaXRUb29sdGlwKCk7XG5cblx0XHRcdFx0XHRcdC8vIExldCBXT1cgYW5pbWF0ZSBjYXJkc1xuXHRcdFx0XHRcdFx0JCh3aW5kb3cpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnbGlzdCc6XG5cdFx0XHRcdFx0XHQkKCcuY29udGVudC1pdGVtcycpLnNob3coKTtcblx0XHRcdFx0XHRcdCQoJy5jb250ZW50LW1hcCcpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQoJyNvYmplY3RzJykucmVtb3ZlQ2xhc3MoJ2dyaWQtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xpc3QtY29udGFpbmVyJyk7XG5cdFx0XHRcdFx0XHRjb29raWUubGlzdGluZ192aWV3X21vZGUgPSAnbGlzdCc7XG5cblx0XHRcdFx0XHRcdE1lc3NpYS5pbml0VG9vbHRpcCgpO1xuXG5cdFx0XHRcdFx0XHQvLyBMZXQgV09XIGFuaW1hdGUgY2FyZHNcblx0XHRcdFx0XHRcdCQod2luZG93KS50cmlnZ2VySGFuZGxlcignc2Nyb2xsJyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ21hcCc6XG5cdFx0XHRcdFx0XHQkKCcuY29udGVudC1pdGVtcycpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQoJy5jb250ZW50LW1hcCcpLnNob3coKTtcblx0XHRcdFx0XHRcdGNvb2tpZS5saXN0aW5nX3ZpZXdfbW9kZSA9ICdtYXAnO1xuXG5cdFx0XHRcdFx0XHRNZXNzaWEuaW5pdFRvb2x0aXAoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JChcIi5saXN0LW1hcC1idXR0b25cIikuYXR0cihcImRhdGEtdmlld1wiLCAkKHRoaXMpLmF0dHIoXCJkYXRhLXZpZXdcIikpO1xuXHRcdFx0XHQkKFwiLnZpZXctdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0XHRcdHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHR3aW5kb3cuTWVzc2lhRXh0LnNldENvb2tpZSgnbWVzc2lhJywgSlNPTi5zdHJpbmdpZnkoY29va2llKSwgeyBleHBpcmVzOiBuZXcgRGF0ZShub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKSkgfSk7IC8vIDEgeWVhciBwbHVzIGZyb20gbm93XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0aWFsIG1hcCBsb2FkIChtYXAgdmlldyBjbGlja2VkKVxuXHRcdFx0ICovXG5cdFx0XHRsb2FkTWFwOiBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IHBvdGVudGFpbCBtdWx0aXBsZSBtYXAgaW5jbHVkaW5nLlxuXHRcdFx0XHQkKE1lc3NpYS5tYXBWaWV3ZXIpLm9mZignY2xpY2snLCBNZXNzaWEubG9hZE1hcCk7XG5cblx0XHRcdFx0dmFyIG1hcEFwaUtleSA9ICQoJ2JvZHknKS5kYXRhKCdrZXknKTtcblx0XHRcdFx0TWVzc2lhLnVwZGF0ZU1hcFN0YXJ0KCk7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBNZXNzaWFFeHQuZ2V0U2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9AZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXNANS4wLjMvZGlzdC9tYXJrZXJjbHVzdGVyZXJwbHVzLm1pbi5qcycpLFxuXHRcdFx0XHRcdGF3YWl0IE1lc3NpYUV4dC5nZXRTY3JpcHQoYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9JHttYXBBcGlLZXl9YCk7XG5cblx0XHRcdFx0XHQkKE1lc3NpYS5tYXBWaWV3ZXIpLm9uKCdjbGljaycsIE1lc3NpYS5fdXBkYXRlTWFwKTtcblx0XHRcdFx0XHRNZXNzaWEuaW5pdE1hcCgpO1xuXHRcdFx0XHRcdCQoTWVzc2lhLm1hcFZpZXdlcikudHJpZ2dlckhhbmRsZXIoJ2NsaWNrJywgW2ZhbHNlXSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdkb25lJyk7XG5cblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRNZXNzaWEudXBkYXRlTWFwRmluaXNoKCk7XG5cblx0XHRcdFx0XHQvLyBHZXQgYmFjayBoYW5kbGVyIG9uIGVycm9yIGxvYWRpbmcgbWFwLlxuXHRcdFx0XHRcdCQoTWVzc2lhLm1hcFZpZXdlcikub24oJ2NsaWNrJywgTWVzc2lhLmxvYWRNYXApO1xuXG5cdFx0XHRcdFx0Y29uc3QgYm9keSA9IHtcblx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdFcnJvciBsb2FkaW5nIEdvb2dsZSBtYXAuJyxcblx0XHRcdFx0XHRcdGVycm9yOiBlcnJvcixcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci5lcnJvcihib2R5KTtcblxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnZmFpbCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBNYXAgc3VjY2Vzc2Z1bGx5IGxvYWRlZCAtIGluc3RhbnRpYXRlIGl0XG5cdFx0XHQgKi9cblx0XHRcdGluaXRNYXA6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgaW5mb1dpbmRvdztcblxuXHRcdFx0XHR2YXIgbWFwU3R5bGVzID0gW3tcblx0XHRcdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdFx0XHR7IGh1ZTogXCIjMzI0MTU2XCIgfSxcblx0XHRcdFx0XHRcdHsgc2F0dXJhdGlvbjogXCItMTAwXCIgfSxcblx0XHRcdFx0XHRcdHsgbGlnaHRuZXNzOiBcIjNcIiB9LFxuXHRcdFx0XHRcdFx0eyBnYW1tYTogMS41MSB9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRcdF07XG5cdFx0XHRcdHZhciBtZXNzaWFNYXBUeXBlID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUobWFwU3R5bGVzLCB7XG5cdFx0XHRcdFx0bmFtZTogXCJNZXNzaWFcIixcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciBtYXBDb25maWcgPSB7XG5cdFx0XHRcdFx0em9vbTogNCxcblx0XHRcdFx0XHRjZW50ZXI6IHsgbGF0OiA1MC4wOTU4NzQ1LCBsbmc6IDE0LjQyNTUyMzEgfSxcblx0XHRcdFx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdFx0Ly9zY3JvbGx3aGVlbDogZmFsc2UsXG5cdFx0XHRcdFx0Z2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnLFxuXHRcdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0XHRtYXBUeXBlSWQ6ICdtZXNzaWFfc3R5bGUnLFxuXHRcdFx0XHRcdG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0bWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWVzc2lhX3N0eWxlJ10sXG5cdFx0XHRcdFx0XHRzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5ERUZBVUxULFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRNZXNzaWEubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JqZWN0cy1tYXAnKSwgbWFwQ29uZmlnKTtcblxuXHRcdFx0XHQvLyBBZGQgTWVzc2lhIHByb3BlcnRpZXMgaW50byBtYXAgb2JqZWN0XG5cdFx0XHRcdE1lc3NpYS5tYXAubWVzc2lhID0ge1xuXHRcdFx0XHRcdG1hcmtlcnM6IFtdLFxuXHRcdFx0XHRcdG1hcmtlckNsdXN0ZXJlcjogZmFsc2UsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3c7XG5cblx0XHRcdFx0Ly8gVHJ5IHRvIGZpbmQgdXNlciBwb3NpdGlvblxuXHRcdFx0XHRpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG5cdFx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcblxuXHRcdFx0XHRcdFx0Ly8gU3VjY2Vzc1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHBvcyA9IHtcblx0XHRcdFx0XHRcdFx0XHRsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcblx0XHRcdFx0XHRcdFx0XHRsbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHQvLyBEbyBub3QgYWRkIGl0IHRvIG1lc3NpYSBtYXJrZXJzXG5cdFx0XHRcdFx0XHRcdC8vIHRvIGxldCB0aGlzIG1hcmtlciBzdGF5IGZvcmV2ZXJcblx0XHRcdFx0XHRcdFx0dmFyIGNsaWVudCA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvcy5sYXQsIHBvcy5sbmcpLFxuXHRcdFx0XHRcdFx0XHRcdG1hcDogTWVzc2lhLm1hcCxcblx0XHRcdFx0XHRcdFx0XHRpY29uOiAnL3dwLWNvbnRlbnQvdGhlbWVzL21lc3NpYS9pbmNsdWRlcy9hc3NldHMvaW1hZ2VzL3N2Zy9tYXJrZXIteW91LnN2ZycsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuXHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ6ICdZb3UgYXJlIGhlcmUnXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdGNsaWVudC5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGluZm9XaW5kb3cub3BlbihNZXNzaWEubWFwLCBjbGllbnQpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0Y2xpZW50LmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKE1lc3NpYS5tYXAsIGNsaWVudCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdE1lc3NpYS5tYXAuc2V0Q2VudGVyKHBvcyk7XG5cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQvLyBGYWlsXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdC8vIG5vdGhpbmcgZm9yIG5vd1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRNZXNzaWEubWFwLm1hcFR5cGVzLnNldCgnbWVzc2lhX3N0eWxlJywgbWVzc2lhTWFwVHlwZSk7XG5cdFx0XHRcdE1lc3NpYS5tYXAuYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogV3JhcHBlciBmb3IgcmVhbCBtYXAgdXBkYXRlXG5cdFx0XHQgKiB0cmlnZ2VycyBvbiBsaXN0aW5nIHVwZGF0ZVxuXHRcdFx0ICovXG5cdFx0XHR1cGRhdGVNYXA6IGZ1bmN0aW9uIChldmVudCwgdXJsLCBhcHBlbmQsIGtlZXBMaXN0KSB7XG5cblx0XHRcdFx0dmFyIG1hcFZpZXdlciA9ICQoTWVzc2lhLm1hcFZpZXdlcik7XG5cdFx0XHRcdG1hcFZpZXdlci5kYXRhKCdtYXBJc1VwVG9EYXRlJywgZmFsc2UpO1xuXG5cdFx0XHRcdC8vIENvbnRpbnVlIG9ubHkgaWYgd2UgYXJlIGluIG1hcCB2aWV3IG1vZGVcblx0XHRcdFx0aWYgKG1hcFZpZXdlci5oYXNDbGFzcygnYWN0aXZlJykpIHtcblx0XHRcdFx0XHQkKE1lc3NpYS5tYXBWaWV3ZXIpLnRyaWdnZXJIYW5kbGVyKCdjbGljaycsIFthcHBlbmRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdF91cGRhdGVNYXA6IGZ1bmN0aW9uIChldmVudCwgYXBwZW5kKSB7XG5cblx0XHRcdFx0dmFyIG1hcElzVXBUb0RhdGUgPSAkKHRoaXMpLmRhdGEoJ21hcElzVXBUb0RhdGUnKTtcblxuXHRcdFx0XHQvLyBBbGxyZWFkeSB1cCB0byBkYXRlXG5cdFx0XHRcdGlmIChtYXBJc1VwVG9EYXRlID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRmx1c2ggcHJlc2V0IG9mIHNob3duIG1hcmtlcnNcblx0XHRcdFx0Ly8gYW5kIGNsZWFyIG1hcmtlcnMgJiBjbHVzdGVycyAmIGJvdW5kc1xuXHRcdFx0XHRpZiAoYXBwZW5kID09PSBmYWxzZSkge1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBNZXNzaWEubWFwLm1lc3NpYS5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRNZXNzaWEubWFwLm1lc3NpYS5tYXJrZXJzW2ldLnNldE1hcChudWxsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKE1lc3NpYS5tYXAubWVzc2lhLm1hcmtlckNsdXN0ZXJlcikge1xuXHRcdFx0XHRcdFx0TWVzc2lhLm1hcC5tZXNzaWEubWFya2VyQ2x1c3RlcmVyLmNsZWFyTWFya2VycygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRNZXNzaWEubWFwLm1lc3NpYS5tYXJrZXJzID0gW107XG5cdFx0XHRcdFx0TWVzc2lhLm9iamVjdHNfZ2VvID0ge307XG5cdFx0XHRcdFx0TWVzc2lhLm1hcC5ib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPbmx5IG5ld2VseSBhZGRlZCBvYmplY3QncyBkYXRhXG5cdFx0XHRcdHZhciBjb29yZHMgPSBNZXNzaWEuZ2V0T2JqZWN0c0dlb0RhdGEoKTtcblxuXHRcdFx0XHQkLmV4dGVuZChNZXNzaWEub2JqZWN0c19nZW8sIGNvb3Jkcyk7XG5cblx0XHRcdFx0Ly8gTm90aGluZyB0byBzaG93XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyhjb29yZHMpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgnbWFwSXNVcFRvRGF0ZScsIHRydWUpO1xuXHRcdFx0XHRcdE1lc3NpYS51cGRhdGVNYXBGaW5pc2goKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdGFydCB1cGRhdGVcblx0XHRcdFx0TWVzc2lhLnVwZGF0ZU1hcFN0YXJ0KCk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaWQgaW4gY29vcmRzKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb29yZHNbaWRdLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRcdHZhciBwaW4gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvb3Jkc1tpZF1baV1bJ2xhdCddLCBjb29yZHNbaWRdW2ldWydsbmcnXSk7XG5cblx0XHRcdFx0XHRcdGxldCBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBjb29yZHNbaWRdW2ldWydhZGRyZXNzJ11cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogcGluLFxuXHRcdFx0XHRcdFx0XHRtYXA6IE1lc3NpYS5tYXAsXG5cdFx0XHRcdFx0XHRcdGljb246ICcvd3AtY29udGVudC90aGVtZXMvbWVzc2lhL2luY2x1ZGVzL2Fzc2V0cy9pbWFnZXMvc3ZnL21hcmtlci5zdmcnLFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdE1lc3NpYS5tYXAubWVzc2lhLm1hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0XHRcdFx0TWVzc2lhLm1hcC5ib3VuZHMuZXh0ZW5kKHBpbik7XG5cblx0XHRcdFx0XHRcdG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRpbmZvd2luZG93Lm9wZW4oTWVzc2lhLm1hcCwgbWFya2VyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aW5mb3dpbmRvdy5jbG9zZShNZXNzaWEubWFwLCBtYXJrZXIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0TWVzc2lhLm1hcC5tZXNzaWEubWFya2VyQ2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihNZXNzaWEubWFwLCBNZXNzaWEubWFwLm1lc3NpYS5tYXJrZXJzLCB7XG5cdFx0XHRcdFx0aW1hZ2VQYXRoOiAnL3dwLWNvbnRlbnQvdGhlbWVzL21lc3NpYS9pbmNsdWRlcy9hc3NldHMvaW1hZ2VzL3N2Zy9tJyxcblx0XHRcdFx0XHRpbWFnZUV4dGVuc2lvbjogJ3N2Zydcblx0XHRcdFx0fSk7XG5cdFx0XHRcdE1lc3NpYS5tYXAuZml0Qm91bmRzKE1lc3NpYS5tYXAuYm91bmRzKTtcblxuXHRcdFx0XHQkKHRoaXMpLmRhdGEoJ21hcElzVXBUb0RhdGUnLCB0cnVlKTtcblx0XHRcdFx0TWVzc2lhLnVwZGF0ZU1hcEZpbmlzaCgpO1xuXG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm4gb2JqZWN0J3MgY29vcmRzIHRoYXRcblx0XHRcdCAqIGFyZSBub3QgaW4gTWVzc2lhLm9iamVjdHNfZ2VvXG5cdFx0XHQgKi9cblx0XHRcdGdldE9iamVjdHNHZW9EYXRhOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dmFyIGdlb3NldCA9IHt9O1xuXHRcdFx0XHR2YXIgY2FyZHMgPSAkKCcubGlzdGluZyAuY29udGVudC1pdGVtcyAub2JqZWN0LWNhcmQnKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgY2FyZF9pZCA9ICQoY2FyZHNbaV0pLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdFx0dmFyIGdlb19kYXRhID0gJChjYXJkc1tpXSkuZGF0YSgnZ2VvRGF0YScpO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBNZXNzaWEub2JqZWN0c19nZW9bY2FyZF9pZF0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKHZhciBxID0gMDsgcSA8IGdlb19kYXRhLmxlbmd0aDsgcSsrKSB7XG5cblx0XHRcdFx0XHRcdHZhciBhZGRyZXNzID0gZ2VvX2RhdGFbcV0uaW5mbztcblx0XHRcdFx0XHRcdHZhciBsYXQgPSBnZW9fZGF0YVtxXS5sYXQ7XG5cdFx0XHRcdFx0XHR2YXIgbG5nID0gZ2VvX2RhdGFbcV0ubG5nO1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGxhdCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGxuZyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGdlb3NldFtjYXJkX2lkXTtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZ2Vvc2V0W2NhcmRfaWRdID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHRnZW9zZXRbY2FyZF9pZF0gPSBbXTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Z2Vvc2V0W2NhcmRfaWRdLnB1c2goe1xuXHRcdFx0XHRcdFx0XHQnYWRkcmVzcyc6IGFkZHJlc3MsXG5cdFx0XHRcdFx0XHRcdCdsYXQnOiBsYXQsXG5cdFx0XHRcdFx0XHRcdCdsbmcnOiBsbmcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGdlb3NldDtcblx0XHRcdH0sXG5cdFx0XHRnZXRMaXN0aW5nOiBmdW5jdGlvbiAoZXZlbnQsIHVybCwgYXBwZW5kLCBrZWVwTGlzdCkge1xuXG5cdFx0XHRcdGlmIChNZXNzaWEueGhyICE9IG51bGwpIHtcblx0XHRcdFx0XHRNZXNzaWEueGhyLmFib3J0KCk7XG5cdFx0XHRcdFx0TWVzc2lhLnhociA9IG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRNZXNzaWEueGhyID0gJC5hamF4KHtcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0dXJsOiBtZXNzaWFWYXJzLmFqYXhVcmwsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiAnZ2V0X2xpc3RpbmcnLFxuXHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IG1lc3NpYVZhcnMubWVzc2lhTm9uY2UsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdEFKQVhfTWFya2VyOiBtZXNzaWFWYXJzLkFKQVhfTWFya2VyLFxuXHRcdFx0XHRcdFx0XHRxdWVyeTogdXJsLFxuXHRcdFx0XHRcdFx0XHRwb3N0aWQ6ICQoJ2JvZHknKS5kYXRhKCdwb3N0aWQnKSxcblx0XHRcdFx0XHRcdFx0a2VlcExpc3Q6IGtlZXBMaXN0LFxuXHRcdFx0XHRcdFx0XHRjb25maWc6IE1lc3NpYS5saXN0aW5nLmZpbmQoJyNvYmplY3RzJykuZGF0YSgnY29uZmlnJyksXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0TWVzc2lhLnNlYXJjaFN0YXJ0KCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoc2VydmVyKSB7XG5cblx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlID09PSAzMDEpIHtcblxuXHRcdFx0XHRcdFx0XHR2YXIgdXJsID0gbmV3IFVSTChzZXJ2ZXIuZGF0YS5sb2NhdGlvbik7XG5cblx0XHRcdFx0XHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0XHRsaXN0aW5nVXJsOiB1cmwudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcdFx0fSwgJycsIHVybCk7XG5cblx0XHRcdFx0XHRcdFx0TWVzc2lhLmxpc3RpbmcudHJpZ2dlckhhbmRsZXIoJ3F1ZXJ5X3VybF9idWlsZGVkJywgW3VybC50b1N0cmluZygpLCBhcHBlbmQsIGtlZXBMaXN0XSk7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IHtcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnSW5jb3JyZWN0IGxpc3RpbmcgVVJMLicsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IHNlcnZlci5kYXRhLm1lc3NhZ2UsXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci53YXJuKGJvZHkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRNZXNzaWEuc2VhcmNoRmluaXNoKCk7XG5cdFx0XHRcdFx0XHRNZXNzaWEudXBkYXRlU3RhcnQoKTtcblxuXHRcdFx0XHRcdFx0aWYgKHNlcnZlci5kYXRhLmNvZGUgPT09IDIwMCkge1xuXG5cdFx0XHRcdFx0XHRcdHZhciBkdXIgPSA0MDA7XG5cdFx0XHRcdFx0XHRcdHZhciBvYmplY3RfY29udGFpbmVyID0gTWVzc2lhLmxpc3RpbmcuZmluZCgnI29iamVjdHMnKTtcblx0XHRcdFx0XHRcdFx0TWVzc2lhLmxvYWRfbW9yZS5hdHRyKCdkYXRhLWxpc3RzJywgc2VydmVyLmRhdGEubGlzdHMpO1xuXHRcdFx0XHRcdFx0XHRNZXNzaWEudG9nZ2xlTG9hZFZpc2liaWxpdHkoc2VydmVyLmRhdGEubGlzdHMsIGR1cik7XG5cdFx0XHRcdFx0XHRcdE1lc3NpYS51cGRhdGVGb3VuZChzZXJ2ZXIuZGF0YS5mb3VuZCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGFwcGVuZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9iamVjdF9jb250YWluZXIuZmluZCgnLm5vdC1mb3VuZCcpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdG9iamVjdF9jb250YWluZXIuYXBwZW5kKHNlcnZlci5kYXRhLmNhcmRzKS5maW5kKCdbdGl0bGVdJykudG9vbHRpcChNZXNzaWEudG9vbHRpcENvbmZpZyk7XG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhLnVwZGF0ZVNlbyhzZXJ2ZXIuZGF0YS5zZW8pO1xuXHRcdFx0XHRcdFx0XHRcdE1lc3NpYS51cGRhdGVCcmVhZGNydW1icyhzZXJ2ZXIuZGF0YS5icmVhZGNydW1icyk7XG5cblx0XHRcdFx0XHRcdFx0XHRNZXNzaWEubGlzdGluZy50cmlnZ2VySGFuZGxlcignbGlzdGluZ1VwZGF0ZWQnLCBbdXJsLCBhcHBlbmQsIGtlZXBMaXN0XSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRvYmplY3RfY29udGFpbmVyLmZhZGVPdXQoZHVyLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuZW1wdHkoKS5hcHBlbmQoc2VydmVyLmRhdGEuY2FyZHMpLmZhZGVJbihkdXIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b2JqZWN0X2NvbnRhaW5lci5maW5kKCdbdGl0bGVdJykudG9vbHRpcChNZXNzaWEudG9vbHRpcENvbmZpZyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdE1lc3NpYS51cGRhdGVTZW8oc2VydmVyLmRhdGEuc2VvKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0TWVzc2lhLnVwZGF0ZUJyZWFkY3J1bWJzKHNlcnZlci5kYXRhLmJyZWFkY3J1bWJzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0fSkucHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0TWVzc2lhLmxpc3RpbmcudHJpZ2dlckhhbmRsZXIoJ2xpc3RpbmdVcGRhdGVkJywgW3VybCwgYXBwZW5kLCBrZWVwTGlzdF0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBzZXJ2ZXIuZGF0YS5wcm9wZXJ0aWVzICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhLnRvZ2dsZUNoZWNrYm94RGlzYWJpbGl0eShzZXJ2ZXIuZGF0YS5wcm9wZXJ0aWVzKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygc2VydmVyLmRhdGEuY2F0ZWdvcmllcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFRPRE8gLSBmaW5lIHR1bmUgbG9naWNcblx0XHRcdFx0XHRcdFx0XHRNZXNzaWEudG9nZ2xlT3B0aW9uc0Rpc2FiaWxpdHkoc2VydmVyLmRhdGEuY2F0ZWdvcmllcyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXG5cdFx0XHRcdFx0XHRpZiAoTWVzc2lhLnhoci5zdGF0dXMgPT09IDAgJiYgTWVzc2lhLnhoci5zdGF0dXNUZXh0ID09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdE1lc3NpYS5zZWFyY2hGaW5pc2goKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoc2VydmVyLCB0ZXh0U3RhdHVzLCBNTEh0dHBSZXF1ZXN0KSB7XG5cdFx0XHRcdFx0XHRNZXNzaWEueGhyID0gbnVsbDtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVMb2FkVmlzaWJpbGl0eTogZnVuY3Rpb24gKGxpc3RzLCBkdXIpIHtcblxuXHRcdFx0XHQvLyBsaXN0cyBpcyB1bmRlZmluZWQgd2hlbiBpdCBpcyB3cm9uZyB1cmwgYW5kIHNlcnZlciByZXNwb25zZSBJbnZhbGlkIFVSTFxuXHRcdFx0XHRpZiAoTWVzc2lhLmxvYWRfbW9yZS5kYXRhKCdsaXN0JykgPj0gbGlzdHMgfHwgJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBsaXN0cykge1xuXHRcdFx0XHRcdE1lc3NpYS5sb2FkX21vcmUuZmFkZU91dChkdXIpLnByb21pc2UoKS5kb25lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQXR0cignaHJlZicpO1xuXHRcdFx0XHRcdFx0dGhpcy5hdHRyKCdyZWwnLCAnbm9mb2xsb3cnKTtcblx0XHRcdFx0XHRcdE1lc3NpYS51cGRhdGVGaW5pc2goJ3VwZGF0aW5nLWxvYWRtb3JlJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0TWVzc2lhLmxvYWRfbW9yZS5mYWRlSW4oZHVyKS5wcm9taXNlKCkuZG9uZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRNZXNzaWEudXBkYXRlRmluaXNoKCd1cGRhdGluZy1sb2FkbW9yZScpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVBdHRyKCdyZWwnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRvZ2dsZU9wdGlvbnNEaXNhYmlsaXR5OiBmdW5jdGlvbiAoYXZhaWxhYmxlX2NhdGVnb3JpZXMpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBNZXNzaWEuYWxsX3NlbGVjdF9maWx0ZXJzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgZmlsdGVyID0gJChNZXNzaWEuYWxsX3NlbGVjdF9maWx0ZXJzW2ldKTtcblxuXHRcdFx0XHRcdGlmIChmaWx0ZXIuZGF0YSgndGF4b25vbXknKSA9PT0gJ21lc3NpYV9vYmplY3RfY2F0ZWdvcnknICYmIGZpbHRlci5wcm9wKCdtdWx0aXBsZScpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IGZpbHRlci5maW5kKCdvcHRpb24nKTtcblxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBvcHRpb25zLmxlbmd0aDsgeisrKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9ICQob3B0aW9uc1t6XSk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdGF2YWlsYWJsZV9jYXRlZ29yaWVzLmluY2x1ZGVzKG9wdGlvbi5kYXRhKCd0ZXJtJykpIHx8IC8vIGlzIGluc2lkZSBvZiBhdmFpbGFibGUgY2F0ZWdvcmllcy5cblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXIudmFsKCkuaW5jbHVkZXMob3B0aW9uLnZhbCgpKSB8fCAvLyBvciBzZWxlY3RlZCBub3cuXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uLnZhbCgpID09PSAnLTEnIC8vIG9zIHNlbGVjdCBhbGwuXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVDaGVja2JveERpc2FiaWxpdHk6IGZ1bmN0aW9uIChhdmFpbGFibGVfcHJvcGVydGllcykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE1lc3NpYS5hbGxfY2hlY2tib3hfZmlsdGVycy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGZpbHRlciA9ICQoTWVzc2lhLmFsbF9jaGVja2JveF9maWx0ZXJzW2ldKTtcblxuXHRcdFx0XHRcdGlmIChmaWx0ZXIuZGF0YSgndXJsJykgIT09ICdxdWVyeScgJiYgZmlsdGVyLmRhdGEoJ3VybCcpICE9PSAnaGFzaCcpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChhdmFpbGFibGVfcHJvcGVydGllcy5pbmNsdWRlcyhmaWx0ZXIuYXR0cignbmFtZScpKSkge1xuXHRcdFx0XHRcdFx0ZmlsdGVyLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChmYWxzZSA9PT0gZmlsdGVyLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0XHRcdFx0ZmlsdGVyLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2hvd0hpZGVGaWx0ZXJzOiBmdW5jdGlvbiAoZmlsdGVyLCBhbGxfZmlsdGVycykge1xuXG5cdFx0XHRcdHZhciBhbGxfZmlsdGVyc19wYXJlbnRzID0gYWxsX2ZpbHRlcnMucGFyZW50cygnLmZpbHRlcicpO1xuXG5cdFx0XHRcdHZhciBjYXRlZ29yeUZpbHRlcnNTaG93ID0gTWVzc2lhLmdldENhdGVnb3J5RmlsdGVyc1RvU2hvdyhmaWx0ZXIsIGFsbF9maWx0ZXJzX3BhcmVudHMpO1xuXHRcdFx0XHR2YXIgY2F0ZWdvcnlGaWx0ZXJzSGlkZSA9IE1lc3NpYS5nZXRDYXRlZ29yeUZpbHRlcnNUb0hpZGUoZmlsdGVyLCBhbGxfZmlsdGVyc19wYXJlbnRzKTtcblxuXHRcdFx0XHR2YXIgcHJvcGVydHlGaWx0ZXJzU2hvdyA9IE1lc3NpYS5nZXRQcm9wZXJ0eUZpbHRlcnNUb1Nob3coZmlsdGVyLCBhbGxfZmlsdGVyc19wYXJlbnRzKTtcblx0XHRcdFx0dmFyIHByb3BlcnR5RmlsdGVyc0hpZGUgPSBNZXNzaWEuZ2V0UHJvcGVydHlGaWx0ZXJzVG9IaWRlKHByb3BlcnR5RmlsdGVyc1Nob3csIGFsbF9maWx0ZXJzX3BhcmVudHMpO1xuXG5cdFx0XHRcdHZhciBwcm9wZXJ0eUdyb3Vwc1Zpc2liaWxpdHkgPSBNZXNzaWEuZ2V0UHJvcGVydHlHcm91cHNWaXNpYmlsaXR5KHByb3BlcnR5RmlsdGVyc1Nob3csIHByb3BlcnR5RmlsdGVyc0hpZGUpO1xuXG5cdFx0XHRcdHZhciBncm91cF90aXRsZV9zaG93ID0gcHJvcGVydHlHcm91cHNWaXNpYmlsaXR5LnRvX3Nob3cuZmluZCgnLnByb3BlcnR5LWdyb3VwLWhlYWRpbmcnKTtcblx0XHRcdFx0dmFyIGdyb3VwX3RpdGxlX2hpZGUgPSBwcm9wZXJ0eUdyb3Vwc1Zpc2liaWxpdHkudG9faGlkZS5maW5kKCcucHJvcGVydHktZ3JvdXAtaGVhZGluZycpO1xuXG5cdFx0XHRcdHZhciBkZXBlbmRlbnRfZmlsdGVyc19zaG93ID0gY2F0ZWdvcnlGaWx0ZXJzU2hvdy5hZGQocHJvcGVydHlGaWx0ZXJzU2hvdykucGFyZW50cygnLmZpbHRlcicpO1xuXHRcdFx0XHR2YXIgZGVwZW5kZW50X2ZpbHRlcnNfaGlkZSA9IGNhdGVnb3J5RmlsdGVyc0hpZGUuYWRkKHByb3BlcnR5RmlsdGVyc0hpZGUpLnBhcmVudHMoJy5maWx0ZXInKTtcblxuXHRcdFx0XHRNZXNzaWEudG9nZ2xlRmlsdGVyc1Zpc2liaWxpdHkoXG5cdFx0XHRcdFx0Z3JvdXBfdGl0bGVfc2hvdyxcblx0XHRcdFx0XHRncm91cF90aXRsZV9oaWRlLFxuXHRcdFx0XHRcdGRlcGVuZGVudF9maWx0ZXJzX3Nob3csXG5cdFx0XHRcdFx0ZGVwZW5kZW50X2ZpbHRlcnNfaGlkZVxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LFxuXHRcdFx0dG9nZ2xlRmlsdGVyc1Zpc2liaWxpdHk6IGZ1bmN0aW9uIChncm91cF90aXRsZV9zaG93LCBncm91cF90aXRsZV9oaWRlLCBkZXBlbmRlbnRfZmlsdGVyc19zaG93LCBkZXBlbmRlbnRfZmlsdGVyc19oaWRlKSB7XG5cblx0XHRcdFx0aWYgKHRydWUgPT09IE1lc3NpYS5hbmltYXRpb25JblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHRpbWluZ1Nob3cgPSBwYXJzZUludCgkKCcubWVzc2lhLXdpZGdldC1saXN0aW5nLWZpbHRlcnMnKS5jc3MoJy0tbWVzc2lhLWZpbHRlcnMtc2hvdy10aW1pbmcnKSk7XG5cdFx0XHRcdGxldCB0aW1pbmdIaWRlID0gcGFyc2VJbnQoJCgnLm1lc3NpYS13aWRnZXQtbGlzdGluZy1maWx0ZXJzJykuY3NzKCctLW1lc3NpYS1maWx0ZXJzLWhpZGUtdGltaW5nJykpO1xuXG5cdFx0XHRcdGdyb3VwX3RpdGxlX3Nob3cuYWRkKGRlcGVuZGVudF9maWx0ZXJzX3Nob3cpOy8vLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblx0XHRcdFx0Z3JvdXBfdGl0bGVfc2hvdy5wYXJlbnQoJy5wcm9wZXJ0eS1ncm91cCcpOy8vLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblxuXHRcdFx0XHRncm91cF90aXRsZV9zaG93ID0gZ3JvdXBfdGl0bGVfc2hvdy5ub3QoJzpub3QoLm9mZik6bm90KC5zaG93biknKTtcblx0XHRcdFx0Z3JvdXBfdGl0bGVfaGlkZSA9IGdyb3VwX3RpdGxlX2hpZGUubm90KCcuaGlkZGVuLCAub2ZmJyk7XG5cblx0XHRcdFx0ZGVwZW5kZW50X2ZpbHRlcnNfc2hvdyA9IGRlcGVuZGVudF9maWx0ZXJzX3Nob3cubm90KCc6bm90KC5vZmYpOm5vdCguc2hvd24pJyk7XG5cdFx0XHRcdGRlcGVuZGVudF9maWx0ZXJzX2hpZGUgPSBkZXBlbmRlbnRfZmlsdGVyc19oaWRlLm5vdCgnLmhpZGRlbiwgLm9mZicpO1xuXG5cdFx0XHRcdGRlcGVuZGVudF9maWx0ZXJzX3Nob3cuYWRkQ2xhc3MoJ3RvLXNob3cnKTtcblx0XHRcdFx0ZGVwZW5kZW50X2ZpbHRlcnNfaGlkZS5hZGRDbGFzcygndG8taGlkZScpO1xuXG5cdFx0XHRcdE1lc3NpYS5zZXRNYXhIZWlnaHQoZ3JvdXBfdGl0bGVfc2hvdyk7XG5cdFx0XHRcdE1lc3NpYS5zZXRNYXhIZWlnaHQoZ3JvdXBfdGl0bGVfaGlkZSk7XG5cdFx0XHRcdE1lc3NpYS5zZXRNYXhIZWlnaHQoZGVwZW5kZW50X2ZpbHRlcnNfc2hvdyk7XG5cdFx0XHRcdE1lc3NpYS5zZXRNYXhIZWlnaHQoZGVwZW5kZW50X2ZpbHRlcnNfaGlkZSk7XG5cblx0XHRcdFx0Ly8gU0hPV1xuXHRcdFx0XHRsZXQgc2hvd1Byb21pc2UgPSBNZXNzaWEuZGVsYXkoMClcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0TWVzc2lhLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheSgwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIEdyb3Vwc1xuXHRcdFx0XHRcdC50aGVuKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdFx0XHRncm91cF90aXRsZV9zaG93LmFkZENsYXNzKCdzaG93bicpLnJlbW92ZUNsYXNzKCdoaWRkZW4gb2ZmJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KChncm91cF90aXRsZV9zaG93Lmxlbmd0aCA+IDApID8gdGltaW5nU2hvdyAvIDIgOiAwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIEZpbHRlcnNcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0ZGVwZW5kZW50X2ZpbHRlcnNfc2hvdy5hZGRDbGFzcygnc2hvd24nKS5yZW1vdmVDbGFzcygnaGlkZGVuIG9mZicpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheSh0aW1pbmdTaG93KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIFNob3duXG5cdFx0XHRcdFx0LnRoZW4oKHJlc29sdmUpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ3Nob3duJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gSElERVxuXHRcdFx0XHRsZXQgaGlkZVByb21pc2UgPSBNZXNzaWEuZGVsYXkoMClcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0TWVzc2lhLmFuaW1hdGlvbkluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheSgwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIEZpbHRlcnNcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0ZGVwZW5kZW50X2ZpbHRlcnNfaGlkZS5hZGRDbGFzcygnaGlkZGVuJykucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTWVzc2lhLmRlbGF5KHRpbWluZ0hpZGUgLyAyKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIEdyb3Vwc1xuXHRcdFx0XHRcdC50aGVuKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdFx0XHRncm91cF90aXRsZV9oaWRlLmFkZENsYXNzKCdoaWRkZW4nKS5yZW1vdmVDbGFzcygnc2hvd24nKTtcblx0XHRcdFx0XHRcdHJldHVybiBNZXNzaWEuZGVsYXkodGltaW5nSGlkZSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQvLyBIaWRkZW5cblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnaGlkZGVuJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHRQcm9taXNlLmFsbFNldHRsZWQoW3Nob3dQcm9taXNlLCBoaWRlUHJvbWlzZV0pLnRoZW4oKHJlc3VsdHMpID0+IHtcblx0XHRcdFx0XHRcdE1lc3NpYS5hbmltYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVHcm91cDogYXN5bmMgZnVuY3Rpb24gKGUsIGZvcmNlID0gZmFsc2UpIHtcblxuXHRcdFx0XHRsZXQgdGltaW5nO1xuXHRcdFx0XHR2YXIgZ3JvdXAgPSAkKHRoaXMpLnBhcmVudCgnLnByb3BlcnR5LWdyb3VwJyk7XG5cdFx0XHRcdHZhciBmaWx0ZXJzID0gZ3JvdXAuZmluZCgnLmZpbHRlcicpO1xuXG5cdFx0XHRcdGlmIChmb3JjZSA9PT0gJ2Nsb3NlJyAmJiBncm91cC5oYXNDbGFzcygnY29sbGFwc2VkJykpIHJldHVybjtcblx0XHRcdFx0aWYgKGZvcmNlID09PSAnb3BlbicgJiYgIWdyb3VwLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSkgcmV0dXJuO1xuXG5cdFx0XHRcdHJldHVybiBNZXNzaWEuZGVsYXkoMClcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1lc3NpYS5kZWxheSgwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZ3JvdXAuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWluZyA9IHBhcnNlSW50KCQoJy5tZXNzaWEtd2lkZ2V0LWxpc3RpbmctZmlsdGVycycpLmNzcygnLS1tZXNzaWEtZmlsdGVyLXNob3ctdGltaW5nJykpO1xuXHRcdFx0XHRcdFx0XHRmaWx0ZXJzID0gZmlsdGVycy5ub3QoJzpub3QoLmNvbGxhcHNlZCknKTtcblxuXHRcdFx0XHRcdFx0XHRNZXNzaWEuc2V0TWF4SGVpZ2h0KGZpbHRlcnMpO1xuXG5cdFx0XHRcdFx0XHRcdGdyb3VwLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblx0XHRcdFx0XHRcdFx0ZmlsdGVycy5hZGRDbGFzcygnc2hvd24nKS5yZW1vdmVDbGFzcygnaGlkZGVuIG9mZiBjb2xsYXBzZWQnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aW1pbmcgPSBwYXJzZUludCgkKCcubWVzc2lhLXdpZGdldC1saXN0aW5nLWZpbHRlcnMnKS5jc3MoJy0tbWVzc2lhLWZpbHRlci1oaWRlLXRpbWluZycpKTtcblx0XHRcdFx0XHRcdFx0ZmlsdGVycyA9IGZpbHRlcnMubm90KCcuaGlkZGVuLCAub2ZmJyk7XG5cblx0XHRcdFx0XHRcdFx0TWVzc2lhLnNldE1heEhlaWdodChmaWx0ZXJzKTtcblxuXHRcdFx0XHRcdFx0XHRncm91cC5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG5cdFx0XHRcdFx0XHRcdGZpbHRlcnMuYWRkQ2xhc3MoJ2hpZGRlbiBjb2xsYXBzZWQnKS5yZW1vdmVDbGFzcygnc2hvd24nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBNZXNzaWEuZGVsYXkodGltaW5nKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIFRvZ2dsZWRcblx0XHRcdFx0XHQudGhlbigocmVzb2x2ZSkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHNldE1heEhlaWdodDogZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcblx0XHRcdFx0XHRlbGVtZW50LmFkZENsYXNzKCdnZXQtc2Nyb2xsLWhlaWdodCcpLmNzcygnLS1tYXgtaGVpZ2h0JywgYCR7ZWxlbWVudHNbaV0uc2Nyb2xsSGVpZ2h0fXB4YCkucmVtb3ZlQ2xhc3MoJ2dldC1zY3JvbGwtaGVpZ2h0Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRvbkZpbHRlcnNBbm1hdGVkOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG5cdFx0XHRcdGlmIChlLm9yaWdpbmFsRXZlbnQuYW5pbWF0aW9uTmFtZS5pbmRleE9mKCdIaWRlJykgPiAwKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmFkZENsYXNzKCdvZmYnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXQucmVtb3ZlQ2xhc3MoJ2hpZGRlbiBzaG93biB0by1zaG93IHRvLWhpZGUnKTtcblx0XHRcdFx0dGFyZ2V0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0Q2F0ZWdvcnlGaWx0ZXJzVG9TaG93OiBmdW5jdGlvbiAoc2VsZWN0ZWQsIGFsbF9maWx0ZXJzLCBkZXBlbmRlbnRfZmlsdGVycyA9ICQoKSkge1xuXG5cdFx0XHRcdHZhciB0b19zaG93O1xuXHRcdFx0XHR2YXIgc2VsZWN0ZWRfdmFsO1xuXHRcdFx0XHR2YXIgZmlsdGVyX3RheCA9IHNlbGVjdGVkLmF0dHIoJ2RhdGEtdGF4b25vbXknKTtcblxuXHRcdFx0XHRzZWxlY3RlZF92YWwgPSBzZWxlY3RlZC52YWwoKTtcblx0XHRcdFx0dG9fc2hvdyA9IGFsbF9maWx0ZXJzLmZpbmQoJ1tkYXRhLXBhcmVudC10ZXJtPVwiJyArIHNlbGVjdGVkX3ZhbCArICdcIl1bZGF0YS10YXhvbm9teT1cIicgKyBmaWx0ZXJfdGF4ICsgJ1wiXScpLm5vdChzZWxlY3RlZCk7XG5cblx0XHRcdFx0aWYgKHRvX3Nob3cubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdFx0Ly8g0L/QvtC60LDQt9Cw0YLRjCDRhNC40LvRjNGC0YAsINCw0LrRgtC40LLQuNGA0YPQtdC80YvQuSDQt9C90LDRh9C10L3QuNC10Lwg0YLQtdC60YPRidC10LPQviDRhNC40LvRjNGC0YDQsFxuXHRcdFx0XHRcdGRlcGVuZGVudF9maWx0ZXJzID0gZGVwZW5kZW50X2ZpbHRlcnMuYWRkKHRvX3Nob3cpO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0b19zaG93Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRkZXBlbmRlbnRfZmlsdGVycyA9IE1lc3NpYS5nZXRDYXRlZ29yeUZpbHRlcnNUb1Nob3coJCh0b19zaG93W2ldKSwgYWxsX2ZpbHRlcnMsIGRlcGVuZGVudF9maWx0ZXJzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZGVwZW5kZW50X2ZpbHRlcnM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0Q2F0ZWdvcnlGaWx0ZXJzVG9IaWRlOiBmdW5jdGlvbiAoc2VsZWN0ZWQsIGFsbF9maWx0ZXJzLCBkZXBlbmRlbnRfZmlsdGVycyA9ICQoKSkge1xuXG5cdFx0XHRcdHZhciB1bnNlbGVjdGVkX29wdGlvbnMgPSBbXTtcblx0XHRcdFx0dmFyIHNlbGVjdGVkX3ZhbCA9IHNlbGVjdGVkLnZhbCgpO1xuXHRcdFx0XHR2YXIgZmlsdGVyX3RheCA9IHNlbGVjdGVkLmF0dHIoJ2RhdGEtdGF4b25vbXknKTtcblxuXHRcdFx0XHRpZiAoZGVwZW5kZW50X2ZpbHRlcnMubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHR1bnNlbGVjdGVkX29wdGlvbnMgPSBzZWxlY3RlZC5maW5kKCdvcHRpb25bdmFsdWUhPVwiJyArIHNlbGVjdGVkX3ZhbCArICdcIl1bdmFsdWUhPVwiLTFcIl0nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR1bnNlbGVjdGVkX29wdGlvbnMgPSBzZWxlY3RlZC5maW5kKCdvcHRpb25bdmFsdWUhPVwiLTFcIl0nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh1bnNlbGVjdGVkX29wdGlvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdW5zZWxlY3RlZF9vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRcdHZhciB0b19oaWRlID0gYWxsX2ZpbHRlcnMuZmluZCgnW2RhdGEtcGFyZW50LXRlcm09XCInICsgdW5zZWxlY3RlZF9vcHRpb25zW2ldLnZhbHVlICsgJ1wiXVtkYXRhLXRheG9ub215PVwiJyArIGZpbHRlcl90YXggKyAnXCJdJykubm90KCdbZGF0YS1wYXJlbnQtdGVybT1cIjBcIl0nKTtcblxuXHRcdFx0XHRcdFx0aWYgKHRvX2hpZGUubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdFx0XHRcdC8vINGB0LrRgNGL0YLRjCDRhNC40LvRjNGC0YAsINCw0LrRgtC40LLQuNGA0YPQtdC80YvQuSDQt9C90LDRh9C10L3QuNC10Lwg0YLQtdC60YPRidC10LPQviDRhNC40LvRjNGC0YDQsFxuXHRcdFx0XHRcdFx0XHRkZXBlbmRlbnRfZmlsdGVycyA9IGRlcGVuZGVudF9maWx0ZXJzLmFkZCh0b19oaWRlKTtcblxuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBxID0gMDsgcSA8IHRvX2hpZGUubGVuZ3RoOyBxKyspIHtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbnRfZmlsdGVycyA9IE1lc3NpYS5nZXRDYXRlZ29yeUZpbHRlcnNUb0hpZGUoJCh0b19oaWRlW3FdKSwgYWxsX2ZpbHRlcnMsIGRlcGVuZGVudF9maWx0ZXJzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBkZXBlbmRlbnRfZmlsdGVycztcblx0XHRcdH0sXG5cdFx0XHRnZXRQcm9wZXJ0eUZpbHRlcnNUb1Nob3c6IGZ1bmN0aW9uIChzZWxlY3RlZCwgYWxsX2ZpbHRlcnMpIHtcblxuXHRcdFx0XHR2YXIgdG9fc2hvdyA9ICQoKTtcblx0XHRcdFx0dmFyIHNlbGVjdGVkX3Rlcm0gPSBzZWxlY3RlZC5maW5kKCc6c2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBzZWxlY3RlZF90ZXJtIHx8ICdhcnJheScgPT09IHR5cGVvZiBzZWxlY3RlZF90ZXJtKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZF90ZXJtLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB0ZXJtID0gJChzZWxlY3RlZF90ZXJtW2ldKS5kYXRhKCd0ZXJtJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBmaWx0ZXIgPSBhbGxfZmlsdGVycy5maW5kKCdbZGF0YS1jYXRlZ29yeS1wYXJlbnQtdGVybXMqPVwiPCcgKyB0ZXJtICsgJz5cIl1bZGF0YS10YXhvbm9teT1cIm1lc3NpYV9vYmplY3RfcHJvcGVydHlcIl0nKS5ub3QoJ1tkYXRhLWNhdGVnb3J5LXBhcmVudC10ZXJtcz1cIjBcIl0nKTtcblx0XHRcdFx0XHRcdHRvX3Nob3cgPSB0b19zaG93LmFkZChmaWx0ZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0b19zaG93ID0gYWxsX2ZpbHRlcnMuZmluZCgnW2RhdGEtY2F0ZWdvcnktcGFyZW50LXRlcm1zKj1cIjwnICsgc2VsZWN0ZWRfdGVybS5kYXRhKCd0ZXJtJykgKyAnPlwiXVtkYXRhLXRheG9ub215PVwibWVzc2lhX29iamVjdF9wcm9wZXJ0eVwiXScpLm5vdCgnW2RhdGEtY2F0ZWdvcnktcGFyZW50LXRlcm1zPVwiMFwiXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRvX3Nob3c7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0UHJvcGVydHlGaWx0ZXJzVG9IaWRlOiBmdW5jdGlvbiAodG9fc2hvdywgYWxsX2ZpbHRlcnMpIHtcblxuXHRcdFx0XHR2YXIgZmlsdGVycyA9IGFsbF9maWx0ZXJzLm5vdCgnLmhpZGRlbicpLmZpbmQoJ1tkYXRhLXRheG9ub215PVwibWVzc2lhX29iamVjdF9wcm9wZXJ0eVwiXScpLm5vdCh0b19zaG93KS5ub3QoJ1tkYXRhLWNhdGVnb3J5LXBhcmVudC10ZXJtcz1cIjBcIl0nKTtcblx0XHRcdFx0cmV0dXJuIGZpbHRlcnM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0UHJvcGVydHlHcm91cHNWaXNpYmlsaXR5OiBmdW5jdGlvbiAocHJvcGVydHlGaWx0ZXJzVG9TaG93LCBwcm9wZXJ0eUZpbHRlcnNUb0hpZGUpIHtcblxuXHRcdFx0XHR2YXIgZ3JvdXBzID0gTWVzc2lhLmFsbF9wcm9wZXJ0eV9ncm91cHM7XG5cdFx0XHRcdHZhciBmaWx0ZXJzVG9TaG93ID0gcHJvcGVydHlGaWx0ZXJzVG9TaG93LnBhcmVudHMoJy5maWx0ZXInKTtcblx0XHRcdFx0dmFyIGZpbHRlcnNUb0hpZGUgPSBwcm9wZXJ0eUZpbHRlcnNUb0hpZGUucGFyZW50cygnLmZpbHRlcicpO1xuXHRcdFx0XHR2YXIgdmlzaWJpbGl0eSA9IHtcblx0XHRcdFx0XHQndG9fc2hvdyc6ICQoKSxcblx0XHRcdFx0XHQndG9faGlkZSc6ICQoKSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgZ3JvdXAgPSAkKGdyb3Vwc1tpXSk7XG5cdFx0XHRcdFx0dmFyIGZpbHRlcnMgPSBncm91cC5maW5kKCcuZmlsdGVyJyk7IC8vIGFsbCBmaWx0ZXJzXG5cdFx0XHRcdFx0dmFyIHZpc2libGUgPSBmaWx0ZXJzLm5vdChmaWx0ZXJzVG9IaWRlKS5ub3QoJy5oaWRkZW4nKTsgLy8gd2lsbCBiZSB2aXNpYmxlXG5cdFx0XHRcdFx0dmFyIGhpZGRlbiA9IGZpbHRlcnMubm90KGZpbHRlcnNUb1Nob3cpLmFkZCgnaGlkZGVuJyk7IC8vIHdpbGwgYmUgaGlkZGVuXG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IGZpbHRlcnMubm90KGhpZGRlbikuYWRkKHZpc2libGUpOyAvLyB3aGF0IHdlIHdpbGwgc2VlXG5cblx0XHRcdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdHZpc2liaWxpdHkudG9fc2hvdyA9IHZpc2liaWxpdHkudG9fc2hvdy5hZGQoZ3JvdXApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2aXNpYmlsaXR5LnRvX2hpZGUgPSB2aXNpYmlsaXR5LnRvX2hpZGUuYWRkKGdyb3VwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmlzaWJpbGl0eTtcblxuXHRcdFx0fSxcblx0XHRcdGdlbmVyYXRlTGlzdGluZ1VybDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2xvYWQnKSkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ21lc3NpYS1maWx0ZXItcmFuZ2UnKSkge1xuXG5cdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdHJhbmdlID0gTWVzc2lhLmdldElvblJhbmdlU2xpZGVySW5zdGFuY2UoJCh0aGlzKSksXG5cdFx0XHRcdFx0XHRyYW5nZVZhbCA9ICQodGhpcykudmFsKCk7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHJhbmdlLnByZXZfdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRyYW5nZS5wcmV2X3ZhbHVlID0gcmFuZ2VWYWw7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbCA9PT0gcmFuZ2UucHJldl92YWx1ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyYW5nZS5wcmV2X3ZhbHVlID0gcmFuZ2VWYWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly/RgdC10LvQtdC60YIg0L3QtSDRg9GB0L/QtdCy0LDQtdGCINC30LDQutGA0YvRgtGM0YHRj1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICh0YXJnZXQpIHtcblxuXHRcdFx0XHRcdHZhciBhbGxfZmlsdGVycyA9IE1lc3NpYS5hbGxGaWx0ZXJzKCk7XG5cblx0XHRcdFx0XHRpZiAodGFyZ2V0LmRhdGEoJ3RheG9ub215JykgPT0gJ21lc3NpYV9vYmplY3RfY2F0ZWdvcnknKSB7XG5cdFx0XHRcdFx0XHRNZXNzaWEuc2hvd0hpZGVGaWx0ZXJzKHRhcmdldCwgYWxsX2ZpbHRlcnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdE1lc3NpYS5fZ2VuZXJhdGVMaXN0aW5nVXJsKHRhcmdldCwgYWxsX2ZpbHRlcnMpO1xuXHRcdFx0XHR9LCA1MCwgJCh0aGlzKSk7XG5cblx0XHRcdH0sXG5cdFx0XHRfZ2VuZXJhdGVMaXN0aW5nVXJsOiBmdW5jdGlvbiAodGFyZ2V0LCBhbGxfZmlsdGVycykge1xuXG5cdFx0XHRcdHZhclxuXHRcdFx0XHRcdHBhdGggPSAnJyxcblx0XHRcdFx0XHRxdWVyeSA9ICcnLFxuXHRcdFx0XHRcdGhhc2ggPSAnJyxcblx0XHRcdFx0XHRhcHBlbmQgPSBmYWxzZSxcblx0XHRcdFx0XHRrZWVwTGlzdCA9IGZhbHNlLFxuXHRcdFx0XHRcdHBhdGhQcmVmaXggPSAnJyxcblx0XHRcdFx0XHRxdWVyeU9yZGVyID0gbWVzc2lhVmFycy5xdWVyeU9yZGVyO1xuXG5cdFx0XHRcdHZhciB2YWx1ZXMgPSB7XG5cdFx0XHRcdFx0cGF0aDogWyQoJy5saXN0aW5nIGlucHV0W3R5cGU9XCJoaWRkZW5cIl1bbmFtZT1cInNlZ21lbnRcIl0nKS52YWwoKV0sXG5cdFx0XHRcdFx0cXVlcnk6IHt9LFxuXHRcdFx0XHRcdGhhc2g6IHt9LFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQucHJvcCgnbm9kZU5hbWUnKSA9PSAnQScgJiYgdGFyZ2V0Lmhhc0NsYXNzKCdsb2FkJykpIHtcblxuXHRcdFx0XHRcdHZhciBsaXN0X25vdyA9IHRhcmdldC5kYXRhKCdsaXN0Jyk7XG5cblx0XHRcdFx0XHQvLyDQkNC/0L/QtdC90LQg0L7RgtC00LXQu9GM0L3Qvi4g0KIu0LouINGB0LzQtdC90LAg0YTQuNC70YzRgtGA0LAg0YHQsdGA0LDRgdGL0LLQsNC10YJcblx0XHRcdFx0XHQvLyDQv9Cw0LPQuNC90LDRhtC40Y4sINCwINCX0LDQs9GD0YDQt9C40YLRjCDQtdGJ0LUgLSDQvdC10YIuINCf0YDQuCDRjdGC0L7QvCDQslxuXHRcdFx0XHRcdC8vINC+0LHQvtC40YUg0YHQu9GD0YfQsNGP0YUga2VlcExpc3QgPSBmYWxzZVxuXHRcdFx0XHRcdGFwcGVuZCA9IHRydWU7XG5cdFx0XHRcdFx0dGFyZ2V0LmRhdGEoJ2xpc3QnLCBsaXN0X25vdyArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vINCt0YLQviDQv9GA0LjQstC+0LTQuNGCINGBINGB0LHRgNC+0YHRgyDQv9Cw0LPQuNC90LDRhtC40Lgg0LIg0L3QsNGH0LDQu9C+XG5cdFx0XHRcdC8vINCf0L7QuNGB0Log0L/QviDQv9C+0LTRgdGC0YDQvtC60LUg0Lgg0YHQvtGA0YLQuNGA0L7QstC60LAg0LTQvtC70LbQvdGLXG5cdFx0XHRcdC8vINC/0YDQvtC40YHRhdC+0LTQuNGC0Ywg0LHQtdC3INGB0LHRgNC+0YHQsCDQv9Cw0LPQuNC90LDRhtC40Lhcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2VlcExpc3QgPSB0YXJnZXQuZGF0YSgna2VlcExpc3QnKTtcblxuXHRcdFx0XHRcdGlmIChrZWVwTGlzdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdE1lc3NpYS5sb2FkX21vcmUuZGF0YSgnbGlzdCcsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWxsX2ZpbHRlcnMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdHZhciB2YWx1ZTtcblx0XHRcdFx0XHR2YXIgdGVybV9vcmRlcjtcblx0XHRcdFx0XHR2YXIgZmlsdGVyID0gJChhbGxfZmlsdGVyc1tpXSk7XG5cdFx0XHRcdFx0dmFyIHdyYXBwZXIgPSBmaWx0ZXIucGFyZW50cygnLmZpbHRlcicpO1xuXHRcdFx0XHRcdHZhciBieV9kZWZhdWx0ID0gZmlsdGVyLmRhdGEoJ2RlZmF1bHQnKTtcblx0XHRcdFx0XHR2YXIgbGlzdCA9IGZpbHRlci5kYXRhKCdsaXN0Jyk7XG5cblx0XHRcdFx0XHRzd2l0Y2ggKGZpbHRlci5kYXRhKCd1cmwnKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAncGF0aCc6XG5cblx0XHRcdFx0XHRcdFx0aWYgKChcblx0XHRcdFx0XHRcdFx0XHR0cnVlID09PSB3cmFwcGVyLmhhc0NsYXNzKCd0by1oaWRlJylcblx0XHRcdFx0XHRcdFx0XHR8fCB0cnVlID09PSB3cmFwcGVyLmhhc0NsYXNzKCdoaWRkZW4nKVxuXHRcdFx0XHRcdFx0XHRcdHx8IHRydWUgPT09IHdyYXBwZXIuaGFzQ2xhc3MoJ29mZicpXG5cdFx0XHRcdFx0XHRcdCkgJiYgZmFsc2UgPT09IHdyYXBwZXIuaGFzQ2xhc3MoJ3RvLXNob3cnKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBmaWx0ZXIudmFsKCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpbHRlci5wcm9wKCdub2RlTmFtZScpID09ICdTRUxFQ1QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZpbHRlci5wcm9wKCdtdWx0aXBsZScpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh2YWx1ZVtpXSAhPSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlcm1fb3JkZXIgPSAkKGZpbHRlci5wcm9wKCdzZWxlY3RlZE9wdGlvbnMnKVtpXSkuZGF0YSgnb3JkZXInKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZXNbJ3BhdGgnXVt0ZXJtX29yZGVyXSA9IHZhbHVlW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHZhbHVlICE9IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRlcm1fb3JkZXIgPSAkKGZpbHRlci5wcm9wKCdzZWxlY3RlZE9wdGlvbnMnKSkuZGF0YSgnb3JkZXInKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVzWydwYXRoJ11bdGVybV9vcmRlcl0gPSB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0Y2FzZSAncXVlcnknOlxuXG5cdFx0XHRcdFx0XHRcdHZhbHVlID0gZmlsdGVyLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWx0ZXIucHJvcCgnbm9kZU5hbWUnKSA9PSAnSU5QVVQnKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyDQp9C10LrQsdC+0LrRgdGLINCyINGC0LDQutGB0L7QvdC+0LzQuNC4IFByb3BlcnR5INCyINGB0LDQudC00LHQsNGA0LVcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRmYWxzZSA9PT0gd3JhcHBlci5oYXNDbGFzcygndG8tc2hvdycpXG5cdFx0XHRcdFx0XHRcdFx0XHQmJiAnY2hlY2tib3gnID09PSBmaWx0ZXIucHJvcCgndHlwZScpXG5cdFx0XHRcdFx0XHRcdFx0XHQmJiBmaWx0ZXIucHJvcCgnY2hlY2tlZCcpXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRlcm1fb3JkZXIgPSBmaWx0ZXIuZGF0YSgnb3JkZXInKTtcblx0XHRcdFx0XHRcdFx0XHRcdCgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHZhbHVlc1sncXVlcnknXVtmaWx0ZXIuZGF0YSgndmFyJyldKSA/IHZhbHVlc1sncXVlcnknXVtmaWx0ZXIuZGF0YSgndmFyJyldID0gW10gOiAnJztcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlc1sncXVlcnknXVtmaWx0ZXIuZGF0YSgndmFyJyldW3Rlcm1fb3JkZXJdID0gZmlsdGVyLmF0dHIoJ25hbWUnKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly8g0LjQvdGC0LXRgNCy0LDQu9GM0L3Ri9C1INGE0LjQu9GM0YLRgNGLIChDdXN0b20gZmllbGRzKVxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKCdtZXNzaWFfY29uc3RydWN0b3InID09PSBmaWx0ZXIuZGF0YSgndGF4b25vbXknKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmFtZSA9IGZpbHRlci5hdHRyKCduYW1lJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRlcm1fb3JkZXIgPSBmaWx0ZXIuZGF0YSgnb3JkZXInKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHJhbmdlID0gW107XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChmaWx0ZXIuaGFzQ2xhc3MoJ21lc3NpYS1maWx0ZXItcmFuZ2UnKSkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlvbiA9IE1lc3NpYS5nZXRJb25SYW5nZVNsaWRlckluc3RhbmNlKGZpbHRlcik7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlvbi5yZXN1bHQuZnJvbSAhPT0gaW9uLnJlc3VsdC5taW4gfHwgaW9uLnJlc3VsdC50byAhPT0gaW9uLnJlc3VsdC5tYXgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyYW5nZSA9IHZhbHVlLnNwbGl0KCc7Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZpbHRlci5oYXNDbGFzcygnbWVzc2lhLWZpbHRlci1yYWRpbycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHZhbCA9IGZpbHRlci5wYXJlbnRzKCcudG9nZ2xlLWZpbHRlcnMtd3JhcHBlcicpLmZpbmQoYFtuYW1lPVwiJHtuYW1lfVwiXTpjaGVja2VkYCkudmFsKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJ2FueScpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyYW5nZVswXSA9IHJhbmdlWzFdID0gTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJhbmdlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCd1bmRlZmluZWQnID09PSB0eXBlb2YgdmFsdWVzWydxdWVyeSddW2ZpbHRlci5kYXRhKCd2YXInKV0pID8gdmFsdWVzWydxdWVyeSddW2ZpbHRlci5kYXRhKCd2YXInKV0gPSBbXSA6ICcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZXNbJ3F1ZXJ5J11bZmlsdGVyLmRhdGEoJ3ZhcicpXVt0ZXJtX29yZGVyXSA9IHsgW25hbWVdOiB7ICdhJzogcmFuZ2VbMF0sICdiJzogcmFuZ2VbMV0gfSB9O1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyDQv9C+0LvQtSDQv9C+0LjRgdC60LBcblx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChmaWx0ZXIucHJvcCgndHlwZScpID09ICd0ZXh0JyAmJiBmaWx0ZXIuYXR0cignbmFtZScpID09ICdzZWFyY2gnKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYnlfZGVmYXVsdCA9PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSAhPSBieV9kZWZhdWx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlc1sncXVlcnknXVtmaWx0ZXIuYXR0cignbmFtZScpXSA9IFt2YWx1ZV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vINC60L3QvtC/0LrQsCDQl9Cw0LPRgNGD0LfQuNGC0Ywg0LXRidC1XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZpbHRlci5wcm9wKCdub2RlTmFtZScpID09ICdBJyAmJiBmaWx0ZXIuYXR0cignbmFtZScpID09ICdsaXN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYnlfZGVmYXVsdCA9PSAndW5kZWZpbmVkJyB8fCBsaXN0ICE9IGJ5X2RlZmF1bHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlc1sncXVlcnknXVtmaWx0ZXIuYXR0cignbmFtZScpXSA9IFtsaXN0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Ly8g0KHQvtGA0YLQuNGA0L7QstC60LBcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoZmlsdGVyLnByb3AoJ25vZGVOYW1lJykgPT0gJ1NFTEVDVCcgJiYgZmlsdGVyLmF0dHIoJ25hbWUnKSA9PSAnc29ydCcpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGJ5X2RlZmF1bHQgPT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgIT0gYnlfZGVmYXVsdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVzWydxdWVyeSddW2ZpbHRlci5hdHRyKCduYW1lJyldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdGNhc2UgJ2hhc2gnOlxuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IGZpbHRlci52YWwoKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZmlsdGVyLnByb3AoJ25vZGVOYW1lJykgPT0gJ0lOUFVUJykge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0KfQtdC60LHQvtC60YHRiyDQsiDRgtCw0LrRgdC+0L3QvtC80LjQuCBQcm9wZXJ0eSDQsiDRgdCw0LnQtNCx0LDRgNC1XG5cdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0ZmFsc2UgPT09IHdyYXBwZXIuaGFzQ2xhc3MoJ3RvLXNob3cnKVxuXHRcdFx0XHRcdFx0XHRcdFx0JiYgJ2NoZWNrYm94JyA9PT0gZmlsdGVyLnByb3AoJ3R5cGUnKVxuXHRcdFx0XHRcdFx0XHRcdFx0JiYgZmlsdGVyLnByb3AoJ2NoZWNrZWQnKVxuXHRcdFx0XHRcdFx0XHRcdCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXJtX29yZGVyID0gZmlsdGVyLmRhdGEoJ29yZGVyJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB2YWx1ZXNbJ2hhc2gnXVtmaWx0ZXIuZGF0YSgndmFyJyldKSA/IHZhbHVlc1snaGFzaCddW2ZpbHRlci5kYXRhKCd2YXInKV0gPSBbXSA6ICcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVzWydoYXNoJ11bZmlsdGVyLmRhdGEoJ3ZhcicpXVt0ZXJtX29yZGVyXSA9IGZpbHRlci5hdHRyKCduYW1lJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdC8vINC40L3RgtC10YDQstCw0LvRjNC90YvQtSDRhNC40LvRjNGC0YDRi1xuXHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKCdtZXNzaWFfY29uc3RydWN0b3InID09PSBmaWx0ZXIuZGF0YSgndGF4b25vbXknKSkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRuYW1lID0gZmlsdGVyLmF0dHIoJ25hbWUnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGVybV9vcmRlciA9IGZpbHRlci5kYXRhKCdvcmRlcicpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmFuZ2UgPSBbXTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZpbHRlci5oYXNDbGFzcygnbWVzc2lhLWZpbHRlci1yYW5nZScpKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW9uID0gTWVzc2lhLmdldElvblJhbmdlU2xpZGVySW5zdGFuY2UoZmlsdGVyKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaW9uLnJlc3VsdC5mcm9tICE9PSBpb24ucmVzdWx0Lm1pbiB8fCBpb24ucmVzdWx0LnRvICE9PSBpb24ucmVzdWx0Lm1heCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhbmdlID0gdmFsdWUuc3BsaXQoJzsnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsdGVyLmhhc0NsYXNzKCdtZXNzaWEtZmlsdGVyLXJhZGlvJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsID0gZmlsdGVyLnBhcmVudHMoJy50b2dnbGUtZmlsdGVycy13cmFwcGVyJykuZmluZChgW25hbWU9XCIke25hbWV9XCJdOmNoZWNrZWRgKS52YWwoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnYW55Jykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhbmdlWzBdID0gcmFuZ2VbMV0gPSBOdW1iZXIodmFsKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocmFuZ2UubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB2YWx1ZXNbJ2hhc2gnXVtmaWx0ZXIuZGF0YSgndmFyJyldKSA/IHZhbHVlc1snaGFzaCddW2ZpbHRlci5kYXRhKCd2YXInKV0gPSBbXSA6ICcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZXNbJ2hhc2gnXVtmaWx0ZXIuZGF0YSgndmFyJyldW3Rlcm1fb3JkZXJdID0geyBbbmFtZV06IHsgJ2EnOiByYW5nZVswXSwgJ2InOiByYW5nZVsxXSB9IH07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhbHVlcy5wYXRoID0gdmFsdWVzLnBhdGguZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbCB9KTtcblxuXHRcdFx0XHRmb3IgKHZhciB0ZXJtIGluIHZhbHVlcy5xdWVyeSkge1xuXHRcdFx0XHRcdHZhbHVlcy5xdWVyeVt0ZXJtXSA9IHZhbHVlcy5xdWVyeVt0ZXJtXS5maWx0ZXIoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gdmFsIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAodmFyIHRlcm0gaW4gdmFsdWVzLmhhc2gpIHtcblx0XHRcdFx0XHR2YWx1ZXMuaGFzaFt0ZXJtXSA9IHZhbHVlcy5oYXNoW3Rlcm1dLmZpbHRlcihmdW5jdGlvbiAodmFsKSB7IHJldHVybiB2YWwgfSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlcy5xdWVyeVsnY2YnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR2YWx1ZXMucXVlcnlbJ2NmJ10gPSBidG9hKEpTT04uc3RyaW5naWZ5KHZhbHVlcy5xdWVyeVsnY2YnXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZXMuaGFzaFsnY2YnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR2YWx1ZXMuaGFzaFsnY2YnXSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkodmFsdWVzLmhhc2hbJ2NmJ10pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCh2YWx1ZXMucGF0aC5sZW5ndGggPiAwKSA/IHBhdGggPSAnLycgKyB2YWx1ZXMucGF0aC5qb2luKCcvJykgKyAnLycgOiAnJztcblxuXHRcdFx0XHRpZiAoZmFsc2UgPT09ICQuaXNFbXB0eU9iamVjdCh2YWx1ZXMucXVlcnkpKSB7XG5cblx0XHRcdFx0XHRjb25zdCBxdWVyeUFyciA9IE9iamVjdC5lbnRyaWVzKHZhbHVlcy5xdWVyeSk7XG5cdFx0XHRcdFx0cXVlcnlBcnIuc29ydCgoYSwgYikgPT4gcXVlcnlPcmRlci5pbmRleE9mKGFbMF0pIC0gcXVlcnlPcmRlci5pbmRleE9mKGJbMF0pKTtcblxuXHRcdFx0XHRcdHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeUFycikudG9TdHJpbmcoKTtcblx0XHRcdFx0XHQvLyBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModmFsdWVzLnF1ZXJ5KS50b1N0cmluZygpOyBGb3IgdGVzdGluZyBvbmx5IC0gYnVpbGQgd3Jvbmcgb3JkZXJlZCBVUkxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChmYWxzZSA9PT0gJC5pc0VtcHR5T2JqZWN0KHZhbHVlcy5oYXNoKSkge1xuXHRcdFx0XHRcdGNvbnN0IGhhc2hBcnIgPSBPYmplY3QuZW50cmllcyh2YWx1ZXMuaGFzaCk7XG5cdFx0XHRcdFx0aGFzaEFyci5zb3J0KChhLCBiKSA9PiBxdWVyeU9yZGVyLmluZGV4T2YoYVswXSkgLSBxdWVyeU9yZGVyLmluZGV4T2YoYlswXSkpO1xuXG5cdFx0XHRcdFx0aGFzaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoaGFzaEFycikudG9TdHJpbmcoKTtcblx0XHRcdFx0XHQvLyBoYXNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh2YWx1ZXMuaGFzaCkudG9TdHJpbmcoKTsgRm9yIHRlc3Rpbmcgb25seSAtIGJ1aWxkIHdyb25nIG9yZGVyZWQgVVJMXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJycgIT09IE1lc3NpYS5saXN0aW5nLmRhdGEoJ3BhdGhQcmVmaXgnKSkge1xuXHRcdFx0XHRcdHBhdGhQcmVmaXggPSAnLycgKyBNZXNzaWEubGlzdGluZy5kYXRhKCdwYXRoUHJlZml4Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cdFx0XHRcdHVybC5wYXRobmFtZSA9IHBhdGhQcmVmaXggKyBwYXRoO1xuXHRcdFx0XHR1cmwuc2VhcmNoID0gcXVlcnk7XG5cdFx0XHRcdHVybC5oYXNoID0gaGFzaDtcblxuXHRcdFx0XHR2YXIgbG9hZF9tb3JlX3VybCA9IG5ldyBVUkwodXJsLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG5cdFx0XHRcdGxvYWRfbW9yZV91cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbGlzdCcsIE1lc3NpYS5sb2FkX21vcmUuZGF0YSgnbGlzdCcpKTtcblxuXHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1xuXHRcdFx0XHRcdGxpc3RpbmdVcmw6IHVybC50b1N0cmluZygpLFxuXHRcdFx0XHR9LCAnJywgdXJsKTtcblxuXHRcdFx0XHRNZXNzaWEubG9hZF9tb3JlLmF0dHIoJ2hyZWYnLCBsb2FkX21vcmVfdXJsLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRNZXNzaWEubGlzdGluZy50cmlnZ2VySGFuZGxlcigncXVlcnlfdXJsX2J1aWxkZWQnLCBbdXJsLnRvU3RyaW5nKCksIGFwcGVuZCwga2VlcExpc3RdKTtcblx0XHRcdH0sXG5cdFx0XHRyZWZyZXNoVXJsOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlU2VvOiBmdW5jdGlvbiAoZGF0YSkge1xuXG5cdFx0XHRcdHZhciB0aXRsZSA9ICQoJ2JvZHkgLmhlYWRlci10aXRsZSAuY29udGFpbmVyIGgxJyk7XG5cdFx0XHRcdHZhciBkZXNjcmlwdGlvbiA9ICQoJ2JvZHkgLmhlYWRlci10aXRsZSAuY29udGFpbmVyIC5zZW8tZGVzY3JpcHRpb24nKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdE1lc3NpYS50aXRsZS50ZXh0KGRhdGEudGl0bGUpO1xuXHRcdFx0XHRcdE1lc3NpYS5kZXNjcmlwdGlvbi5hdHRyKCdjb250ZW50JywgZGF0YS5kZXNjcmlwdGlvbik7XG5cblx0XHRcdFx0XHRNZXNzaWEucmVwbGFjZUh0bWwodGl0bGUsIGRhdGEuc2VvX3RpdGxlLCBmYWxzZSk7XG5cdFx0XHRcdFx0TWVzc2lhLnJlcGxhY2VIdG1sKGRlc2NyaXB0aW9uLCBkYXRhLnNlb19kZXNjcmlwdGlvbiwgJ3VwZGF0aW5nLXNlbycpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlQnJlYWRjcnVtYnM6IGZ1bmN0aW9uIChicmVhZGNydW1ic05ldykge1xuXG5cdFx0XHRcdHZhciBicmVhZGNydW1ic0N1cnJlbnQgPSAkKCdib2R5IC5oZWFkZXItdGl0bGUgLmJyZWFkY3J1bWInKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdE1lc3NpYS5yZXBsYWNlSHRtbChicmVhZGNydW1ic0N1cnJlbnQsICQoYnJlYWRjcnVtYnNOZXcpLmh0bWwoKSwgZmFsc2UpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlRm91bmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cblx0XHRcdFx0Y29uc3QgaXRlbSA9ICQoJ2JvZHkgLmxpc3RpbmcgLml0ZW1zLWZvdW5kJyk7XG5cdFx0XHRcdE1lc3NpYS5yZXBsYWNlSHRtbChpdGVtLCBkYXRhLCAndXBkYXRpbmctZm91bmQnKTtcblx0XHRcdH0sXG5cdFx0XHRyZXBsYWNlSHRtbDogZnVuY3Rpb24gKGVsZW1lbnRzLCBodG1sLCBjbGFzc19uYW1lKSB7XG5cdFx0XHRcdGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG5cblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0ZHVyID0gMzAwLFxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcyk7XG5cblx0XHRcdFx0XHRlbGVtZW50LmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdFx0XHR9LCBkdXIsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgY3VycmVudCA9IHtcblx0XHRcdFx0XHRcdFx0d2lkdGg6IGVsZW1lbnQub3V0ZXJXaWR0aCgpICsgJ3B4Jyxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBlbGVtZW50Lm91dGVySGVpZ2h0KCkgKyAncHgnLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbmV4dCA9IHtcblx0XHRcdFx0XHRcdFx0d2lkdGg6IGVsZW1lbnQub3V0ZXJXaWR0aCgpICsgJ3B4Jyxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBlbGVtZW50Lm91dGVySGVpZ2h0KCkgKyAncHgnLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0ZWxlbWVudC5jc3MoY3VycmVudCkuaHRtbChodG1sKS5hbmltYXRlKG5leHQsIGR1ciwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdGhlaWdodDogJycsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSkuZGVsYXkoZHVyIC8gMikuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHRcdFx0XHR9LCBkdXIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBpc19sYXN0ID0gKGluZGV4ID09IChlbGVtZW50cy5sZW5ndGggLSAxKSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpc19sYXN0ICYmIGNsYXNzX25hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRNZXNzaWEudXBkYXRlRmluaXNoKGNsYXNzX25hbWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0cmVzb2x2ZUhhc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKTtcblxuXHRcdFx0XHRpZiAoIXVybC5oYXNoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRncm91cHMgPSAkKCksXG5cdFx0XHRcdFx0aGFzaFByb3BlcnR5VGVybXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5oYXNoLnNsaWNlKDEpKS5nZXQoJ3Byb3AnKSxcblx0XHRcdFx0XHRoYXNoQ29uc3RydWN0b3JUZXJtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLmhhc2guc2xpY2UoMSkpLmdldCgnY2YnKTtcblxuXHRcdFx0XHRpZiAoaGFzaFByb3BlcnR5VGVybXMgIT09IG51bGwpIHtcblx0XHRcdFx0XHRoYXNoUHJvcGVydHlUZXJtcyA9IGhhc2hQcm9wZXJ0eVRlcm1zLnNwbGl0KCcsJyk7XG5cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhhc2hQcm9wZXJ0eVRlcm1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwcm9wZXJ0eUZpbHRlciA9IE1lc3NpYS5hbGxfY2hlY2tib3hfZmlsdGVycy5maWx0ZXIoYFtkYXRhLXRheG9ub215PVwibWVzc2lhX29iamVjdF9wcm9wZXJ0eVwiXVtuYW1lPVwiJHtoYXNoUHJvcGVydHlUZXJtc1tpXX1cIl1gKTtcblxuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eUZpbHRlci5wcm9wKCd0eXBlJykgPT0gJ2NoZWNrYm94J1xuXHRcdFx0XHRcdFx0XHQmJiBwcm9wZXJ0eUZpbHRlci5wcm9wKCdkaXNhYmxlZCcpID09IGZhbHNlXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQWxsIHVwZGF0ZXMgZXhlY3V0ZXMgZGlyZWN0bHkgKG5vdCB2aWEgZXZlbnQpXG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5RmlsdGVyLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0Z3JvdXBzID0gZ3JvdXBzLmFkZChwcm9wZXJ0eUZpbHRlci5wYXJlbnRzKCcucHJvcGVydHktZ3JvdXAnKS5maW5kKCcucHJvcGVydHktZ3JvdXAtaGVhZGluZycpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZ3JvdXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGdyb3VwcyA9ICQudW5pcXVlU29ydChncm91cHMpO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZ3JvdXAgPSAkKGdyb3Vwc1tpXSk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IE1lc3NpYS50b2dnbGVHcm91cC5jYWxsKGdyb3VwLCBuZXcgRXZlbnQoJ2NsaWNrJyksICdvcGVuJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGhhc2hDb25zdHJ1Y3RvclRlcm1zICE9PSBudWxsKSB7XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gSlNPTi5wYXJzZShhdG9iKGhhc2hDb25zdHJ1Y3RvclRlcm1zKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIuZXJyb3IobmV3IEVycm9yKCdJbnZhbGlkIGNvbnN0cnVjdG9yIGhhc2ggdmFsdWUuJykpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgPT09ICdvYmplY3QnKSB7XG5cblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29uc3RydWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2xvdCA9IGNvbnN0cnVjdG9yW2ldO1xuXG5cdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgdGVybSBpbiBzbG90KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbiA9IHNsb3RbdGVybV0sXG5cdFx0XHRcdFx0XHRcdFx0XHRyYW5nZUZpbHRlcnMgPSBNZXNzaWEuYWxsX3JhbmdlX2ZpbHRlcnMuZmlsdGVyKGBbbmFtZT1cIiR7dGVybX1cIl1gKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRvZ2dsZUZpbHRlcnMgPSBNZXNzaWEuYWxsX3JhZGlvX2ZpbHRlcnMuZmlsdGVyKGBbbmFtZT1cIiR7dGVybX1cIl1bdmFsdWU9XCIke2NvbmRpdGlvbi5hfVwiXSwgW25hbWU9XCIke3Rlcm19XCJdW3ZhbHVlPVwiJHtjb25kaXRpb24uYn1cIl1gKTtcblxuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VGaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyYW5nZSA9ICQocmFuZ2VGaWx0ZXJzW2ldKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVuZ2VPYmplY3QgPSBNZXNzaWEuZ2V0SW9uUmFuZ2VTbGlkZXJJbnN0YW5jZShyYW5nZSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFdlIGRvIG5vdCBsaXN0ZW4gdG8gb25VcGRhdGUgZXZlbnRcblx0XHRcdFx0XHRcdFx0XHRcdHJlbmdlT2JqZWN0LnVwZGF0ZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZyb206IGNvbmRpdGlvbi5hLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bzogY29uZGl0aW9uLmIsXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZ2VPYmplY3QucHJldl92YWx1ZSA9IHJhbmdlLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG9nZ2xlRmlsdGVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdG9nZ2xlID0gJCh0b2dnbGVGaWx0ZXJzW2ldKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRvZ2dsZS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBDYWxsIGxpc3RpbmcgZGlyZWN0bHkgdG8gcHJldmVudCBjdW11bGF0aXZlIHJlcXVlc3RzXG5cdFx0XHRcdCAqIGZvciBlYWNoIGZpbHRlciBjaGFuZ2UgaW4gcmVzb2x2ZUhhc2ggcnVudGltZS4gSXQgd2lsbCBqdXN0XG5cdFx0XHRcdCAqIGxvYWQgc2VydmVyIHdpdGggY2FuY2VsbGVkIHJlcXVlc3RzIGluIGFqYXggcXVlcnkuXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRNZXNzaWEuaW52b2tlTGlzdGluZ0RpcmVjdGx5KCk7XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBGaXJlIGhpZGRlbiBldmVudCB0byBnZXQgbGlzdGluZyB1cGRhdGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdGludm9rZUxpc3RpbmdEaXJlY3RseTogZnVuY3Rpb24gbmFtZSgpIHtcblxuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGV2ZW50ID0gbmV3IEV2ZW50KCdjaGFuZ2UnKSxcblx0XHRcdFx0XHR0YXJnZXQgPSBNZXNzaWEubGlzdGluZ19yZXNvbHZlcjtcblxuXHRcdFx0XHR0YXJnZXQuZ2V0KDApLmRpc3BhdGNoRXZlbnQoZXZlbnQsIGZhbHNlKTtcblx0XHRcdH0sXG5cdFx0XHRjaGVja1ZpZXdNb2RlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBzd2l0Y2hlciA9ICQoJy5saXN0LW1hcC1idXR0b24nKTtcblx0XHRcdFx0aWYgKHN3aXRjaGVyLmRhdGEoJ3ZpZXcnKSA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHQkKCcucGFuZWwtdG9wLWNvbnRlbnQgLnZpZXctdG9nZ2xlW2RhdGEtdmlldz1cIm1hcFwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZWFyY2hTdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRNZXNzaWFFeHRcblx0XHRcdFx0XHQubG9hZGVyKCdzaG93JywgJ2JvZHknKVxuXHRcdFx0XHRcdC50aGVuKChyZXN1bHQpID0+ICQoJ2JvZHkgLmxpc3RpbmcnKS5hZGRDbGFzcygnc2VhcmNoaW5nJykpO1xuXHRcdFx0fSxcblx0XHRcdHNlYXJjaEZpbmlzaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRNZXNzaWFFeHRcblx0XHRcdFx0XHQubG9hZGVyKCdoaWRlJywgJ2JvZHknKVxuXHRcdFx0XHRcdC50aGVuKChyZXN1bHQpID0+ICQoJ2JvZHkgLmxpc3RpbmcnKS5yZW1vdmVDbGFzcygnc2VhcmNoaW5nJykpO1xuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZVN0YXJ0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJ2JvZHkgLmxpc3RpbmcnKS5hZGRDbGFzcyhbJ3VwZGF0aW5nJywgJ3VwZGF0aW5nLWxvYWRtb3JlJywgJ3VwZGF0aW5nLWZvdW5kJywgJ3VwZGF0aW5nLXNlbyddKTtcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVGaW5pc2g6IGZ1bmN0aW9uIChjbGFzc19uYW1lKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKCdib2R5IC5saXN0aW5nJyk7XG5cblx0XHRcdFx0dGFyZ2V0LnJlbW92ZUNsYXNzKGNsYXNzX25hbWUpO1xuXG5cdFx0XHRcdGlmICghdGFyZ2V0Lmhhc0NsYXNzKCd1cGRhdGluZy1sb2FkbW9yZScpICYmICF0YXJnZXQuaGFzQ2xhc3MoJ3VwZGF0aW5nLWZvdW5kJykgJiYgIXRhcmdldC5oYXNDbGFzcygndXBkYXRpbmctc2VvJykpIHtcblx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlQ2xhc3MoJ3VwZGF0aW5nJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR1cGRhdGVNYXBTdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRNZXNzaWFFeHQubG9hZGVyKCdzaG93JywgJy5jb250ZW50LW1hcCcpO1xuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZU1hcEZpbmlzaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRNZXNzaWFFeHQubG9hZGVyKCdoaWRlJywgJy5jb250ZW50LW1hcCcpO1xuXHRcdFx0XHR9LCA0MDApO1xuXHRcdFx0fSxcblx0XHRcdHNob3dGaWx0ZXJzOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQoJy5tZXNzaWEtd2lkZ2V0LWxpc3RpbmctZmlsdGVyczpmaXJzdC1vZi10eXBlJykudG9nZ2xlQ2xhc3MoJ29wZW5fZmlsdGVycycpO1xuXHRcdFx0XHQkKCcuYXBwbHktZmlsdGVyJykudG9nZ2xlQ2xhc3MoJ29wZW5fZmlsdGVycycpO1xuXHRcdFx0XHQkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5RmlsdGVyczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcubWVzc2lhLXdpZGdldC1saXN0aW5nLWZpbHRlcnM6Zmlyc3Qtb2YtdHlwZScpLnRvZ2dsZUNsYXNzKCdvcGVuX2ZpbHRlcnMnKTtcblx0XHRcdFx0JCgnLmFwcGx5LWZpbHRlcicpLnRvZ2dsZUNsYXNzKCdvcGVuX2ZpbHRlcnMnKTtcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcblx0XHRcdFx0JCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJCgnLmNvdW50LWl0ZW1zLXRpdGxlJykub2Zmc2V0KCkudG9wIH0sIDExMDApO1xuXHRcdFx0fSxcblx0XHRcdHJlc2V0TGlzdGluZzogZnVuY3Rpb24gbmFtZShlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRjb25zdCBhbGxGaWx0ZXJzID0gTWVzc2lhLmFsbEZpbHRlcnMoKTtcblxuXHRcdFx0XHRjb25zdCBsaXN0RGVmID0gTWVzc2lhLmxvYWRfbW9yZS5kYXRhKCdkZWZhdWx0Jyk7XG5cdFx0XHRcdE1lc3NpYS5sb2FkX21vcmUuZGF0YSgnbGlzdCcsIGxpc3REZWYpO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgTWVzc2lhLmFsbF90ZXh0X2ZpbHRlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0dGV4dCA9ICQoTWVzc2lhLmFsbF90ZXh0X2ZpbHRlcnNbaV0pLFxuXHRcdFx0XHRcdFx0dGV4dERlZiA9IHRleHQuZGF0YSgnZGVmYXVsdCcpO1xuXG5cdFx0XHRcdFx0dGV4dC52YWwodGV4dERlZik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE1lc3NpYS5hbGxfc2VsZWN0X2ZpbHRlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBzZWxlY3RTaW5nbGUgPSAkKE1lc3NpYS5hbGxfc2VsZWN0X2ZpbHRlcnNbaV0pO1xuXHRcdFx0XHRcdHZhciBzZWxlY3REZWYgPSBzZWxlY3RTaW5nbGUuZmluZCgnb3B0aW9uW3ZhbHVlPVwiLTFcIl0nKS52YWwoKTtcblxuXHRcdFx0XHRcdGlmIChzZWxlY3RTaW5nbGUuYXR0cignbmFtZScpID09ICdzb3J0Jykge1xuXHRcdFx0XHRcdFx0c2VsZWN0RGVmID0gc2VsZWN0U2luZ2xlLmRhdGEoJ2RlZmF1bHQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxlY3RTaW5nbGUudmFsKHNlbGVjdERlZikudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcblxuXHRcdFx0XHRcdGlmIChzZWxlY3RTaW5nbGUuZGF0YSgndGF4b25vbXknKSA9PSAnbWVzc2lhX29iamVjdF9jYXRlZ29yeScpIHtcblx0XHRcdFx0XHRcdE1lc3NpYS5zaG93SGlkZUZpbHRlcnMoc2VsZWN0U2luZ2xlLCBhbGxGaWx0ZXJzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE1lc3NpYS5hbGxfbXVsdGlfc2VsZWN0X2ZpbHRlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0c2VsZWN0TXVsdGkgPSAkKE1lc3NpYS5hbGxfbXVsdGlfc2VsZWN0X2ZpbHRlcnNbaV0pLFxuXHRcdFx0XHRcdFx0c2VsZWN0RGVmID0gc2VsZWN0TXVsdGkuZmluZCgnb3B0aW9uW3ZhbHVlPVwiLTFcIl0nKS52YWwoKTtcblxuXHRcdFx0XHRcdHNlbGVjdE11bHRpLnZhbChzZWxlY3REZWYpLnRyaWdnZXIoJ2NoYW5nZS5zZWxlY3QyJyk7XG5cblx0XHRcdFx0XHRpZiAoc2VsZWN0TXVsdGkuZGF0YSgndGF4b25vbXknKSA9PSAnbWVzc2lhX29iamVjdF9jYXRlZ29yeScpIHtcblx0XHRcdFx0XHRcdE1lc3NpYS5zaG93SGlkZUZpbHRlcnMoc2VsZWN0TXVsdGksIGFsbEZpbHRlcnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgTWVzc2lhLmFsbF9jaGVja2JveF9maWx0ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2hlY2tib3ggPSAkKE1lc3NpYS5hbGxfY2hlY2tib3hfZmlsdGVyc1tpXSk7XG5cdFx0XHRcdFx0Y2hlY2tib3gucHJvcCh7XG5cdFx0XHRcdFx0XHQnZGlzYWJsZWQnOiBmYWxzZSxcblx0XHRcdFx0XHRcdCdjaGVja2VkJzogZmFsc2UsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE1lc3NpYS5hbGxfcmFuZ2VfZmlsdGVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0XHRyYW5nZSA9ICQoTWVzc2lhLmFsbF9yYW5nZV9maWx0ZXJzW2ldKVxuXHRcdFx0XHRcdHJhbmdlT2JqZWN0ID0gTWVzc2lhLmdldElvblJhbmdlU2xpZGVySW5zdGFuY2UocmFuZ2UpLFxuXHRcdFx0XHRcdFx0ZnJvbSA9IHJhbmdlT2JqZWN0Lm9wdGlvbnMubWluLFxuXHRcdFx0XHRcdFx0dG8gPSByYW5nZU9iamVjdC5vcHRpb25zLm1heDtcblxuXHRcdFx0XHRcdC8vIFdlIGRvIG5vdCBsaXN0ZW4gdG8gb25VcGRhdGUgZXZlbnRcblx0XHRcdFx0XHRyYW5nZU9iamVjdC51cGRhdGUoe1xuXHRcdFx0XHRcdFx0ZnJvbTogZnJvbSxcblx0XHRcdFx0XHRcdHRvOiB0byxcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJhbmdlT2JqZWN0LnByZXZfdmFsdWUgPSByYW5nZS52YWwoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIENhbGwgbGlzdGluZyBkaXJlY3RseSB0byBwcmV2ZW50IGN1bXVsYXRpdmUgcmVxdWVzdHNcblx0XHRcdFx0ICogZm9yIGVhY2ggZmlsdGVyIGNoYW5nZSBpbiByZXNvbHZlSGFzaCBydW50aW1lLiBJdCB3aWxsIGp1c3Rcblx0XHRcdFx0ICogbG9hZCBzZXJ2ZXIgd2l0aCBjYW5jZWxsZWQgcmVxdWVzdHMgaW4gYWpheCBxdWVyeS5cblx0XHRcdFx0ICovXG5cdFx0XHRcdE1lc3NpYS5pbnZva2VMaXN0aW5nRGlyZWN0bHkoKTtcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVGaWx0ZXJCdXR0b246IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuc2Nyb2xsWSA+IHRoaXMub2xkU2Nyb2xsKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiAkKCcub2JqZWN0LWZpbHRlci1jb250YWluZXInKS5jc3MoJ3RvcCcsICctNDVweCcpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+ICQoJy5vYmplY3QtZmlsdGVyLWNvbnRhaW5lcicpLmNzcygndG9wJywgJzAnKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLm9sZFNjcm9sbCA9IHRoaXMuc2Nyb2xsWTtcblx0XHRcdH0sXG5cdFx0XHRkZWxheTogZnVuY3Rpb24gKG1zKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKG1zKTtcblx0XHRcdFx0XHR9LCBtcyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG11bHRpU2VsZWN0Rm9jdXM6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCQodGhpcykuZGF0YSgnbGFzdFZhbHVlJywgJCh0aGlzKS52YWwoKSk7XG5cdFx0XHR9LFxuXHRcdFx0bXVsdGlTZWxlY3RDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0dmFyIGxhc3RWYWx1ZSA9ICQodGhpcykuZGF0YSgnbGFzdFZhbHVlJyk7XG5cdFx0XHRcdHZhciBjaGFuZ2VkID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHZhbHVlID0gWyctMSddO1xuXHRcdFx0XHRcdCQodGhpcykudmFsKHZhbHVlKTtcblx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0dmFyIHNlbGVjdEFsbE5vdyA9IHZhbHVlLmluZGV4T2YoJy0xJyk7XG5cdFx0XHRcdFx0dmFyIHNlbGVjdEFsbE5vd1ByZXYgPSBsYXN0VmFsdWUuaW5kZXhPZignLTEnKTtcblxuXHRcdFx0XHRcdC8vIE5vdyBzZWxlY3RlZCBTZWxlY3QgQWxsLCBwcmV2aW91c2x5IGl0IHdhcyBub3QuXG5cdFx0XHRcdFx0aWYgKHNlbGVjdEFsbE5vdyA+PSAwICYmIHNlbGVjdEFsbE5vd1ByZXYgPCAwKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IFsnLTEnXTtcblx0XHRcdFx0XHRcdCQodGhpcykudmFsKHZhbHVlKTtcblx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBTb21ldGhpbmcgZWxzZSBzZWxlY3RlZCBiZXNpZGVzIFNlbGVjdCBBbGwsIHByZXZpb3VzbHkgaXQgd2FzLlxuXHRcdFx0XHRcdGVsc2UgaWYgKHNlbGVjdEFsbE5vdyA+PSAwICYmIHNlbGVjdEFsbE5vd1ByZXYgPj0gMCkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHZhbHVlW3NlbGVjdEFsbE5vd107XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnZhbCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmJsdXIoKTtcblxuXHRcdFx0XHRpZiAodHJ1ZSA9PT0gY2hhbmdlZCkge1xuXG5cdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgLy8gRXZlbnQgaGFuZGxlciBmb3IgYWxsIHNlbGVjdCBmaWx0ZXJzIHNob3VsZCBub3Qgc3RhcnQgYWZ0ZXIgdGhpcyBhZ2Fpbi5cblxuXHRcdFx0XHRcdGlmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgPT09IEpTT04uc3RyaW5naWZ5KGxhc3RWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdCQodGhpcykudHJpZ2dlcignY2hhbmdlJywgW3RydWVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScsIFtmYWxzZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGluaXRUb29sdGlwOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0JCgnI29iamVjdHMgW3RpdGxlXScpLnRvb2x0aXAoTWVzc2lhLnRvb2x0aXBDb25maWcpO1xuXHRcdFx0XHR2YXIgY2FyZFRpdGxlcyA9ICQoJyNvYmplY3RzIC5jYXJkLXRpdGxlIFt0aXRsZV0nKTtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRUaXRsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCB0aXRsZSA9IGNhcmRUaXRsZXNbaV07XG5cblx0XHRcdFx0XHRpZiAodGl0bGUub2Zmc2V0V2lkdGggPj0gdGl0bGUuc2Nyb2xsV2lkdGgpIHtcblx0XHRcdFx0XHRcdCQodGl0bGUpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRpdGxlKS50b29sdGlwKCdlbmFibGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIENoZWNrIHRoYXQgSW9uUmFuZ2VTbGlkZXIgaW5zdGFudGlhdGVkIG9uIGVsZW1lbnQuXG5cdFx0XHQgKiBJZiBub3QgLSBjcmVhdGUgb25lIGFuZCByZXR1cm4gaW5zdGFuY2UuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBEb20gbm9kZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIG9iamVjdC5cblx0XHRcdCAqL1xuXHRcdFx0Z2V0SW9uUmFuZ2VTbGlkZXJJbnN0YW5jZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBlbGVtZW50LmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRNZXNzaWFFeHQuZG9SYW5nZShlbGVtZW50KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbGVtZW50LmRhdGEoJ2lvblJhbmdlU2xpZGVyJyk7XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDYWxsYmFjayBmb3IgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnl9IGNhcmRzICAgIE9ic2VydmVkIEhUTUwgZWxlbWVudHNcblx0XHRcdCAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJ9ICAgICAgb2JzZXJ2ZXIgSW5zdGFuY2Ugb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0Y2FyZFZpc2libGU6IGZ1bmN0aW9uIChjYXJkcywgb2JzZXJ2ZXIpIHtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRjb25zdCBjYXJkQ29udGFpbmVyID0gY2FyZHNbaV07XG5cdFx0XHRcdFx0aWYgKGNhcmRDb250YWluZXIuaW50ZXJzZWN0aW9uUmF0aW8gPiAwLjEpIHtcblxuXHRcdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdFx0ZGVsYXkgPSBNYXRoLnJhbmRvbSgpICogMiAqIDEwMCxcblx0XHRcdFx0XHRcdFx0ZmFkZUNsYXNzID0gKGNhcmRDb250YWluZXIuYm91bmRpbmdDbGllbnRSZWN0LnRvcCA+IDApID8gLyogc2Nyb2xsIGRvd24gKi8gJ2ZhZGUtaW4tZG93bicgOiAvKiBzY3JvbGwgdXAgKi8gJ2ZhZGUtaW4tdXAnO1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2hvdyA9ICh0aW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FyZENvbnRhaW5lci50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZScsIGZhZGVDbGFzcyk7XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpO1xuXHRcdFx0XHRcdFx0fSwgZGVsYXkpO1xuXG5cdFx0XHRcdFx0XHRvYnNlcnZlci51bm9ic2VydmUoY2FyZENvbnRhaW5lci50YXJnZXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlIEludGVyc2VjdGlvbk9ic2VydmVyIGZvciBjYXJkcyB2aXNpYmlsaXR5IHRyYWNraW5nLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdFx0ICovXG5cdFx0XHRvYnNlcnZlQ2FyZENvbnRhaW5lcnM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgY2FyZHMgPSAkKCcjb2JqZWN0cyAuaXRlbS1jYXJkLndvdycpO1xuXG5cdFx0XHRcdGlmIChjYXJkcy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIGNhcmRzID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKSB7XG5cdFx0XHRcdFx0Y2FyZHMucmVtb3ZlQ2xhc3MoJ3dvdycpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0XHRcdHJvb3Q6IG51bGwsXG5cdFx0XHRcdFx0cm9vdE1hcmdpbjogJzBweCcsXG5cdFx0XHRcdFx0dGhyZXNob2xkOiBbMC4yXSxcblx0XHRcdFx0XHQvLyBkZWxheTogMTAwLFxuXHRcdFx0XHRcdC8vIHRyYWNrVmlzaWJpbGl0eTogdHJ1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihNZXNzaWEuY2FyZFZpc2libGUsIG9wdGlvbnMpO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdGNvbnN0IGNhcmQgPSBjYXJkc1tpXTtcblx0XHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKGNhcmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDYWxsYmFjayBmb3IgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnl9IHJhbmdlcyAgIE9ic2VydmVkIEhUTUwgZWxlbWVudHNcblx0XHRcdCAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJ9ICAgICAgb2JzZXJ2ZXIgSW5zdGFuY2Ugb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0cmFuZ2VWaXNpYmxlOiBmdW5jdGlvbiAocmFuZ2VzLCBvYnNlcnZlcikge1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHRjb25zdCByYW5nZSA9IHJhbmdlc1tpXTtcblxuXHRcdFx0XHRcdGlmIChyYW5nZS5pc0ludGVyc2VjdGluZykge1xuXHRcdFx0XHRcdFx0b2JzZXJ2ZXIudW5vYnNlcnZlKHJhbmdlLnRhcmdldCk7XG5cdFx0XHRcdFx0XHRNZXNzaWFFeHQuZG9SYW5nZSgkKHJhbmdlLnRhcmdldCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlIEludGVyc2VjdGlvbk9ic2VydmVyIGZvciBpbnB1dCByYW5nZSB2aXNpYmlsaXR5IGZpbHRlcnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdG9ic2VydmVSYW5nZUlucHV0czogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciByYW5nZXMgPSAkKCcubWVzc2lhLWZpbHRlci1yYW5nZScpO1xuXG5cdFx0XHRcdGlmIChyYW5nZXMubGVuZ3RoID09PSAwIHx8IHR5cGVvZiByYW5nZXMgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcblx0XHRcdFx0XHRNZXNzaWFFeHQuZG9SYW5nZShyYW5nZXMpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0XHRcdHJvb3Q6IG51bGwsXG5cdFx0XHRcdFx0cm9vdE1hcmdpbjogJzBweCcsXG5cdFx0XHRcdFx0dGhyZXNob2xkOiBbMF0sXG5cdFx0XHRcdFx0Ly8gZGVsYXk6IDEwMCxcblx0XHRcdFx0XHQvLyB0cmFja1Zpc2liaWxpdHk6IHRydWUsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoTWVzc2lhLnJhbmdlVmlzaWJsZSwgb3B0aW9ucyk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdGNvbnN0IHJhbmdlID0gcmFuZ2VzW2ldO1xuXHRcdFx0XHRcdG9ic2VydmVyLm9ic2VydmUocmFuZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRNZXNzaWEuYWxsX211bHRpX3NlbGVjdF9maWx0ZXJzLm9uKCdmb2N1cyBzZWxlY3QyOnNlbGVjdGluZyBzZWxlY3QyOnVuc2VsZWN0aW5nJywgTWVzc2lhLm11bHRpU2VsZWN0Rm9jdXMpO1xuXHRcdE1lc3NpYS5hbGxfbXVsdGlfc2VsZWN0X2ZpbHRlcnMub24oJ2NoYW5nZScsIE1lc3NpYS5tdWx0aVNlbGVjdENoYW5nZSk7IC8vIHNob3VsZCBiZSBCRUZPUkUgY2hhbmdlIGhhbmRsZXJzIG9uIGZpbHRlcnNcblxuXHRcdE1lc3NpYS5hbGxfc2VsZWN0X2ZpbHRlcnMub24oJ2NoYW5nZScsIE1lc3NpYS5nZW5lcmF0ZUxpc3RpbmdVcmwpO1xuXHRcdE1lc3NpYS5hbGxfY2hlY2tib3hfZmlsdGVycy5vbignY2hhbmdlJywgTWVzc2lhLmdlbmVyYXRlTGlzdGluZ1VybCk7XG5cdFx0TWVzc2lhLmFsbF9yYWRpb19maWx0ZXJzLm9uKCdjaGFuZ2UnLCBNZXNzaWEuZ2VuZXJhdGVMaXN0aW5nVXJsKTtcblx0XHRNZXNzaWEuYWxsX3JhbmdlX2ZpbHRlcnMub24oJ2NoYW5nZUZpbmlzaCcsIE1lc3NpYS5nZW5lcmF0ZUxpc3RpbmdVcmwpO1xuXHRcdE1lc3NpYS5hbGxfdGV4dF9maWx0ZXJzLm9uKCdpbnB1dCcsIE1lc3NpYS5nZW5lcmF0ZUxpc3RpbmdVcmwpO1xuXHRcdE1lc3NpYS5saXN0aW5nX3Jlc29sdmVyLm9uKCdjaGFuZ2UnLCBNZXNzaWEuZ2VuZXJhdGVMaXN0aW5nVXJsKTtcblx0XHRNZXNzaWEubG9hZF9tb3JlLm9uKCdjbGljaycsIE1lc3NpYS5nZW5lcmF0ZUxpc3RpbmdVcmwpO1xuXG5cdFx0JCgnLmxpc3RpbmcgLnBhbmVsLXRvcC1jb250ZW50IC52aWV3LXRvZ2dsZScpLm9uKCdjbGljaycsIE1lc3NpYS50b2dnbGVPYmplY3RzVmlld01vZGUpO1xuXHRcdCQoJy5vYmplY3QtZmlsdGVyLCAuY2xvc2UtZmlsdGVycycpLm9uKCdjbGljaycsIE1lc3NpYS5zaG93RmlsdGVycyk7XG5cdFx0JCgnLnByb3BlcnR5LWdyb3VwLWhlYWRpbmcnKS5vbignY2xpY2snLCBNZXNzaWEudG9nZ2xlR3JvdXApO1xuXHRcdCQoJy5zaWRlYmFyIC5tZXNzaWEtd2lkZ2V0LWxpc3RpbmctZmlsdGVycycpLm9uKCdhbmltYXRpb25lbmQnLCBNZXNzaWEub25GaWx0ZXJzQW5tYXRlZCk7XG5cdFx0JCgnLmFwcGx5LWZpbHRlciAnKS5vbignY2xpY2snLCBNZXNzaWEuYXBwbHlGaWx0ZXJzKTtcblx0XHQkKCcubGlzdGluZyAucmVzZXRfbGlzdGluZycpLm9uKCdjbGljaycsIE1lc3NpYS5yZXNldExpc3RpbmcpO1xuXHRcdCQoYC5saXN0aW5nIC5wYW5lbC10b3AtY29udGVudCAke01lc3NpYS5tYXBWaWV3ZXJ9YCkub24oJ2NsaWNrJywgTWVzc2lhLmxvYWRNYXApO1xuXHRcdCQod2luZG93KS5vbignc2Nyb2xsJywgTWVzc2lhLnRvZ2dsZUZpbHRlckJ1dHRvbik7XG5cblx0XHRNZXNzaWEubGlzdGluZy5vbigncXVlcnlfdXJsX2J1aWxkZWQnLCBNZXNzaWEuZ2V0TGlzdGluZyk7XG5cdFx0TWVzc2lhLmxpc3Rpbmcub24oJ2xpc3RpbmdVcGRhdGVkJywgTWVzc2lhLnVwZGF0ZU1hcCk7XG5cdFx0TWVzc2lhLmxpc3Rpbmcub24oJ2xpc3RpbmdVcGRhdGVkJywgTWVzc2lhLm9ic2VydmVDYXJkQ29udGFpbmVycyk7XG5cdFx0TWVzc2lhLmxpc3Rpbmcub24oJ2xpc3RpbmdVcGRhdGVkJywgTWVzc2lhLmluaXRUb29sdGlwKTtcblx0XHQkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgTWVzc2lhLnJlZnJlc2hVcmwpO1xuXG5cdFx0TWVzc2lhLnJlc29sdmVIYXNoKCk7XG5cdFx0TWVzc2lhLmNoZWNrVmlld01vZGUoKTtcblx0XHRNZXNzaWEuaW5pdFRvb2x0aXAoKTtcblx0XHRNZXNzaWEub2JzZXJ2ZUNhcmRDb250YWluZXJzKCk7XG5cdFx0TWVzc2lhLm9ic2VydmVSYW5nZUlucHV0cygpO1xuXG5cdFx0JCgnI29iamVjdHMgW3RpdGxlXScpLm9uKCdzaG93LmJzLnRvb2x0aXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Qm9vdHN0cmFwLlRvb2x0aXAuZ2V0SW5zdGFuY2UodGhpcykuX2NvbmZpZy5jb250YWluZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5vYmplY3QtY2FyZCcpLmdldCgwKTtcblx0XHR9KTtcblx0fSk7XG59KShqUXVlcnkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi9zY3NzL2xpc3RpbmcvZGVmYXVsdC9saXN0aW5nLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vanMvbGlzdGluZy1kZWZhdWx0LmpzXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
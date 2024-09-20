import './_components/_loader.js';

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

					Messia.searchFinish();
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
				if (e.originalEvent.animationName === 'filter-hide') {
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

				Messia.listing.triggerHandler('messia_listing_query', [values]);

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
						range = $(Messia.all_range_filters[i]),
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

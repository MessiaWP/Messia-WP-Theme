(function ($) {

	$(function () {

		var Messia = {
			observer: false,
			mapApiLoaded: false,
			mapApiKey: $('body').data('key'),
			/**
			 * Create all maps at once.
			 *
			 * @return  void
			 */
			makeMaps: function () {

				var mapContainers = $('.input_address .map');
				if (mapContainers.length === 0 || typeof Messia.mapApiKey === 'undefined') {
					return;
				}

				Messia.loadMap()
					.then(function () {
						mapContainers.each(function (index, container) {
							Messia.makeMap(container);
						});
					});
			},
			/**
			 * Create single map.
			 *
			 * @param  {object}  container  jQuery container for map insertion.
			 *
			 * @return void
			 */
			makeMap: function (container) {
				var map = Messia.initMap(container);
				Messia.updateMap(map, container);
			},
			/**
			 * Callback for IntersectionObserver
			 *
			 * @param   {[IntersectionObserverEntry]}  mapContainers  Observing HTML elements
			 * @param   {IntersectionObserver}         observer       Instance of IntersectionObserver
			 *
			 * @return  void
			 */
			mapCantainerVisible: function (mapContainers, observer) {

				let visibleContainers = [];

				for (let i = 0; i < mapContainers.length; i++) {

					const mapContainer = mapContainers[i];
					if (true === mapContainer.isIntersecting) {
						Messia.observer.unobserve(mapContainer.target);
						visibleContainers.push(mapContainer);
					}
				}

				if (visibleContainers.length === 0) return;

				Messia.loadMap()
					.then(() => {
						for (let i = 0; i < visibleContainers.length; i++) {

							const mapContainer = visibleContainers[i];
							if (true === mapContainer.isIntersecting) {
								Messia.observer.unobserve(mapContainer.target);
								Messia.makeMap($(mapContainer.target));
							}
						}
					});
			},
			/**
			 * Load Google maps script
			 *
			 * @return  {Promise}
			 */
			loadMap: async function () {

				if (true === Messia.mapApiLoaded) {
					return Promise.resolve();
				}

				try {
					await MessiaExt.getScript(`https://maps.googleapis.com/maps/api/js?key=${Messia.mapApiKey}`);
					Messia.mapApiLoaded = true;

					return Promise.resolve('done');
				} catch (error) {
					const body = {
						message: 'Error loading Google map.',
						error: error,
					}
					MessiaExt.logger.error(body);

					return Promise.reject('fail');
				}
			},
			/**
			 * Instantiate single map.
			 *
			 * @param   {object}  container  jQuery container for map instance.
			 *
			 * @return  {object}             Google map
			 */
			initMap: function (container) {

				var map;

				var mapStyles = [{
					stylers: [
						{ hue: "#324156" },
						{ saturation: "-100" },
						{ lightness: "3" },
						{ gamma: 1.51 }
					]
				}];

				var messiaMapType = new google.maps.StyledMapType(mapStyles, {
					name: "Messia",
				});

				var mapConfig = {
					zoom: 10,
					center: { lat: container.data('lat'), lng: container.data('lng') },
					mapTypeControl: false,
					scrollwheel: false,
					streetViewControl: false,
					mapTypeId: 'messia_style',
					mapTypeControlOptions: {
						mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'messia_style'],
						style: google.maps.MapTypeControlStyle.DEFAULT,
					},
				}

				map = new google.maps.Map(container.get(0), mapConfig);

				// Add Messia properties into map object
				map.messia = {
					markers: [],
				}

				map.mapTypes.set('messia_style', messiaMapType);
				map.bounds = new google.maps.LatLngBounds();

				return map;
			},
			/**
			 * Set markers on map and popups.
			 *
			 * @param   {object}  map        Google map instance
			 * @param   {object}  container  jQuery container for map instance.
			 *
			 * @return  void
			 */
			updateMap: function (map, container) {

				var address = $(container).data('address');
				var lat = $(container).data('lat');
				var lng = $(container).data('lng');

				var pin = new google.maps.LatLng(lat, lng);

				let infowindow = new google.maps.InfoWindow({
					content: address
				});
				let marker = new google.maps.Marker({
					position: pin,
					map: map,
					icon: '/wp-content/themes/messia/includes/assets/images/svg/marker.svg',
				});

				map.messia.markers.push(marker);
				map.bounds.extend(pin);
				infowindow.open(map, marker);

				marker.addListener('mouseover', function () {
					infowindow.open(map, marker);
				});
				marker.addListener('mouseout', function () {
					infowindow.close(map, marker);
				});
			},
			/**
			 * Init Fancybox for maps in popups.
			 *
			 * @return  void
			 */
			makePopupsForMap: function () {

				var selector = $('.map-popup-trigger');
				if (selector.length === 0) {
					return;
				}

				$().fancybox({
					selector: '.map-popup-trigger',
					src: $(this).data('src'), // Source of the content
					type: 'inline', // Content type: image|inline|ajax|iframe|html (optional)
					baseClass: 'map-modal',
					clickOutside: 'close',
					toolbar: false,
					smallBtn: true, // close btn
					parentEl: 'body',
					opts: {
						buttons: [
							'zoom',
							'share',
							'slideShow',
							'fullScreen',
							'download',
							'thumbs',
							'close',
						],
					},
					beforeLoad: function (instance, slide) {
						var mapPopupTrigger = instance.current.opts.$orig;
						var mapContainer = $(mapPopupTrigger.data('src')).find('.map');
						Messia.loadMap(Messia.mapApiKey)
							.then(function () {
								Messia.makeMap(mapContainer);
							});
					}
				});
			},
			/**
			 * Create IntersectionObserver for containers with maps.
			 *
			 * @return  void
			 */
			observeMapContainers: function () {

				var mapContainers = $('.input_address .map');

				if (mapContainers.length === 0 || typeof Messia.mapApiKey === 'undefined') {
					return;
				}

				let options = {
					root: document.querySelector('body'),
					rootMargin: '0px',
					threshold: 1.0,
					// delay: 100,
					// trackVisibility: true,
				}

				Messia.observer = new IntersectionObserver(Messia.mapCantainerVisible, options);
				for (let i = 0; i < mapContainers.length; i++) {
					const mapContainer = mapContainers[i];
					Messia.observer.observe(mapContainer);
				}
			},
		}

		if (window.IntersectionObserver) {
			Messia.observeMapContainers();
		} else {
			Messia.makeMaps();
		}
		Messia.makePopupsForMap();

	});
})(jQuery);

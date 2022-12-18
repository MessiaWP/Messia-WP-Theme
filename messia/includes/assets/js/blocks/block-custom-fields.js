/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/blocks/custom-fields.scss":
/*!********************************************!*\
  !*** ./src/scss/blocks/custom-fields.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_custom_fields/_type_address.js":
/*!************************************************************!*\
  !*** ./src/js/_components/_custom_fields/_type_address.js ***!
  \************************************************************/
/***/ (function() {

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


/***/ }),

/***/ "./src/js/_components/_custom_fields/_type_images.js":
/*!***********************************************************!*\
  !*** ./src/js/_components/_custom_fields/_type_images.js ***!
  \***********************************************************/
/***/ (function() {

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

/***/ }),

/***/ "./src/js/blocks/custom-fields.js":
/*!****************************************!*\
  !*** ./src/js/blocks/custom-fields.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_custom_fields_type_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_components/_custom_fields/_type_address */ "./src/js/_components/_custom_fields/_type_address.js");
/* harmony import */ var _components_custom_fields_type_address__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_custom_fields_type_address__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_custom_fields_type_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_components/_custom_fields/_type_images */ "./src/js/_components/_custom_fields/_type_images.js");
/* harmony import */ var _components_custom_fields_type_images__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_custom_fields_type_images__WEBPACK_IMPORTED_MODULE_1__);
// Uncomment required (source files exists)
// import '../_components/_custom_fields/_type_text';
// import '../_components/_custom_fields/_type_textarea';
// import '../_components/_custom_fields/_type_checkbox';
// import '../_components/_custom_fields/_type_number';
// import '../_components/_custom_fields/_type_link';


// import '../_components/_custom_fields/_type_external_media';
// import '../_components/_custom_fields/_type_html';
// import '../_components/_custom_fields/_type_select_post';

(function ($) {

	$(function () {

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
/*!*********************************************!*\
  !*** ./src/entries/blocks/custom-fields.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_custom_fields_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/custom-fields.scss */ "./src/scss/blocks/custom-fields.scss");
/* harmony import */ var _js_blocks_custom_fields_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/custom-fields.js */ "./src/js/blocks/custom-fields.js");
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1jdXN0b20tZmllbGRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4QkFBOEI7QUFDOUMsZ0JBQWdCLDhCQUE4QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsMEJBQTBCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQiw4QkFBOEI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEVBQThFLGlCQUFpQjtBQUMvRjs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVEsZ0JBQWdCO0FBQ3hCLFFBQVEsb0JBQW9CO0FBQzVCLFFBQVEsZ0JBQWdCO0FBQ3hCLFFBQVE7QUFDUjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGVBQWUsd0RBQXdEO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7QUN2UUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQix1QkFBdUI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0NEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxRDtBQUNEO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGLENBQUM7Ozs7Ozs7VUNsQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUM4Qzs7QUFFOUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3MvY3VzdG9tLWZpZWxkcy5zY3NzP2QwMzAiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX2FkZHJlc3MuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX2ltYWdlcy5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL2N1c3RvbS1maWVsZHMuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9jdXN0b20tZmllbGRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIihmdW5jdGlvbiAoJCkge1xuXG5cdCQoZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIE1lc3NpYSA9IHtcblx0XHRcdG9ic2VydmVyOiBmYWxzZSxcblx0XHRcdG1hcEFwaUxvYWRlZDogZmFsc2UsXG5cdFx0XHRtYXBBcGlLZXk6ICQoJ2JvZHknKS5kYXRhKCdrZXknKSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlIGFsbCBtYXBzIGF0IG9uY2UuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiAgdm9pZFxuXHRcdFx0ICovXG5cdFx0XHRtYWtlTWFwczogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBtYXBDb250YWluZXJzID0gJCgnLmlucHV0X2FkZHJlc3MgLm1hcCcpO1xuXHRcdFx0XHRpZiAobWFwQ29udGFpbmVycy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIE1lc3NpYS5tYXBBcGlLZXkgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0TWVzc2lhLmxvYWRNYXAoKVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdG1hcENvbnRhaW5lcnMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGNvbnRhaW5lcikge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWEubWFrZU1hcChjb250YWluZXIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGUgc2luZ2xlIG1hcC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIHtvYmplY3R9ICBjb250YWluZXIgIGpRdWVyeSBjb250YWluZXIgZm9yIG1hcCBpbnNlcnRpb24uXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdG1ha2VNYXA6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHRcdFx0dmFyIG1hcCA9IE1lc3NpYS5pbml0TWFwKGNvbnRhaW5lcik7XG5cdFx0XHRcdE1lc3NpYS51cGRhdGVNYXAobWFwLCBjb250YWluZXIpO1xuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQ2FsbGJhY2sgZm9yIEludGVyc2VjdGlvbk9ic2VydmVyXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtICAge1tJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XX0gIG1hcENvbnRhaW5lcnMgIE9ic2VydmluZyBIVE1MIGVsZW1lbnRzXG5cdFx0XHQgKiBAcGFyYW0gICB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJ9ICAgICAgICAgb2JzZXJ2ZXIgICAgICAgSW5zdGFuY2Ugb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuICB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdG1hcENhbnRhaW5lclZpc2libGU6IGZ1bmN0aW9uIChtYXBDb250YWluZXJzLCBvYnNlcnZlcikge1xuXG5cdFx0XHRcdGxldCB2aXNpYmxlQ29udGFpbmVycyA9IFtdO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0Y29uc3QgbWFwQ29udGFpbmVyID0gbWFwQ29udGFpbmVyc1tpXTtcblx0XHRcdFx0XHRpZiAodHJ1ZSA9PT0gbWFwQ29udGFpbmVyLmlzSW50ZXJzZWN0aW5nKSB7XG5cdFx0XHRcdFx0XHRNZXNzaWEub2JzZXJ2ZXIudW5vYnNlcnZlKG1hcENvbnRhaW5lci50YXJnZXQpO1xuXHRcdFx0XHRcdFx0dmlzaWJsZUNvbnRhaW5lcnMucHVzaChtYXBDb250YWluZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2aXNpYmxlQ29udGFpbmVycy5sZW5ndGggPT09IDApIHJldHVybjtcblxuXHRcdFx0XHRNZXNzaWEubG9hZE1hcCgpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2aXNpYmxlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IG1hcENvbnRhaW5lciA9IHZpc2libGVDb250YWluZXJzW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAodHJ1ZSA9PT0gbWFwQ29udGFpbmVyLmlzSW50ZXJzZWN0aW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhLm9ic2VydmVyLnVub2JzZXJ2ZShtYXBDb250YWluZXIudGFyZ2V0KTtcblx0XHRcdFx0XHRcdFx0XHRNZXNzaWEubWFrZU1hcCgkKG1hcENvbnRhaW5lci50YXJnZXQpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogTG9hZCBHb29nbGUgbWFwcyBzY3JpcHRcblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuICB7UHJvbWlzZX1cblx0XHRcdCAqL1xuXHRcdFx0bG9hZE1hcDogYXN5bmMgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0cnVlID09PSBNZXNzaWEubWFwQXBpTG9hZGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBNZXNzaWFFeHQuZ2V0U2NyaXB0KGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PSR7TWVzc2lhLm1hcEFwaUtleX1gKTtcblx0XHRcdFx0XHRNZXNzaWEubWFwQXBpTG9hZGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2RvbmUnKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRjb25zdCBib2R5ID0ge1xuXHRcdFx0XHRcdFx0bWVzc2FnZTogJ0Vycm9yIGxvYWRpbmcgR29vZ2xlIG1hcC4nLFxuXHRcdFx0XHRcdFx0ZXJyb3I6IGVycm9yLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKGJvZHkpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdmYWlsJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc3RhbnRpYXRlIHNpbmdsZSBtYXAuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtICAge29iamVjdH0gIGNvbnRhaW5lciAgalF1ZXJ5IGNvbnRhaW5lciBmb3IgbWFwIGluc3RhbmNlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4gIHtvYmplY3R9ICAgICAgICAgICAgIEdvb2dsZSBtYXBcblx0XHRcdCAqL1xuXHRcdFx0aW5pdE1hcDogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuXG5cdFx0XHRcdHZhciBtYXA7XG5cblx0XHRcdFx0dmFyIG1hcFN0eWxlcyA9IFt7XG5cdFx0XHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHRcdFx0eyBodWU6IFwiIzMyNDE1NlwiIH0sXG5cdFx0XHRcdFx0XHR7IHNhdHVyYXRpb246IFwiLTEwMFwiIH0sXG5cdFx0XHRcdFx0XHR7IGxpZ2h0bmVzczogXCIzXCIgfSxcblx0XHRcdFx0XHRcdHsgZ2FtbWE6IDEuNTEgfVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fV07XG5cblx0XHRcdFx0dmFyIG1lc3NpYU1hcFR5cGUgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShtYXBTdHlsZXMsIHtcblx0XHRcdFx0XHRuYW1lOiBcIk1lc3NpYVwiLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgbWFwQ29uZmlnID0ge1xuXHRcdFx0XHRcdHpvb206IDEwLFxuXHRcdFx0XHRcdGNlbnRlcjogeyBsYXQ6IGNvbnRhaW5lci5kYXRhKCdsYXQnKSwgbG5nOiBjb250YWluZXIuZGF0YSgnbG5nJykgfSxcblx0XHRcdFx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxuXHRcdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0XHRtYXBUeXBlSWQ6ICdtZXNzaWFfc3R5bGUnLFxuXHRcdFx0XHRcdG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0bWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWVzc2lhX3N0eWxlJ10sXG5cdFx0XHRcdFx0XHRzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5ERUZBVUxULFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGNvbnRhaW5lci5nZXQoMCksIG1hcENvbmZpZyk7XG5cblx0XHRcdFx0Ly8gQWRkIE1lc3NpYSBwcm9wZXJ0aWVzIGludG8gbWFwIG9iamVjdFxuXHRcdFx0XHRtYXAubWVzc2lhID0ge1xuXHRcdFx0XHRcdG1hcmtlcnM6IFtdLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bWFwLm1hcFR5cGVzLnNldCgnbWVzc2lhX3N0eWxlJywgbWVzc2lhTWFwVHlwZSk7XG5cdFx0XHRcdG1hcC5ib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBtYXJrZXJzIG9uIG1hcCBhbmQgcG9wdXBzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAgIHtvYmplY3R9ICBtYXAgICAgICAgIEdvb2dsZSBtYXAgaW5zdGFuY2Vcblx0XHRcdCAqIEBwYXJhbSAgIHtvYmplY3R9ICBjb250YWluZXIgIGpRdWVyeSBjb250YWluZXIgZm9yIG1hcCBpbnN0YW5jZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuICB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdHVwZGF0ZU1hcDogZnVuY3Rpb24gKG1hcCwgY29udGFpbmVyKSB7XG5cblx0XHRcdFx0dmFyIGFkZHJlc3MgPSAkKGNvbnRhaW5lcikuZGF0YSgnYWRkcmVzcycpO1xuXHRcdFx0XHR2YXIgbGF0ID0gJChjb250YWluZXIpLmRhdGEoJ2xhdCcpO1xuXHRcdFx0XHR2YXIgbG5nID0gJChjb250YWluZXIpLmRhdGEoJ2xuZycpO1xuXG5cdFx0XHRcdHZhciBwaW4gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcblxuXHRcdFx0XHRsZXQgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcblx0XHRcdFx0XHRjb250ZW50OiBhZGRyZXNzXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdFx0cG9zaXRpb246IHBpbixcblx0XHRcdFx0XHRtYXA6IG1hcCxcblx0XHRcdFx0XHRpY29uOiAnL3dwLWNvbnRlbnQvdGhlbWVzL21lc3NpYS9pbmNsdWRlcy9hc3NldHMvaW1hZ2VzL3N2Zy9tYXJrZXIuc3ZnJyxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0bWFwLm1lc3NpYS5tYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHRcdFx0bWFwLmJvdW5kcy5leHRlbmQocGluKTtcblx0XHRcdFx0aW5mb3dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcblxuXHRcdFx0XHRtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvd2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKG1hcCwgbWFya2VyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0IEZhbmN5Ym94IGZvciBtYXBzIGluIHBvcHVwcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuICB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdG1ha2VQb3B1cHNGb3JNYXA6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgc2VsZWN0b3IgPSAkKCcubWFwLXBvcHVwLXRyaWdnZXInKTtcblx0XHRcdFx0aWYgKHNlbGVjdG9yLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQoKS5mYW5jeWJveCh7XG5cdFx0XHRcdFx0c2VsZWN0b3I6ICcubWFwLXBvcHVwLXRyaWdnZXInLFxuXHRcdFx0XHRcdHNyYzogJCh0aGlzKS5kYXRhKCdzcmMnKSwgLy8gU291cmNlIG9mIHRoZSBjb250ZW50XG5cdFx0XHRcdFx0dHlwZTogJ2lubGluZScsIC8vIENvbnRlbnQgdHlwZTogaW1hZ2V8aW5saW5lfGFqYXh8aWZyYW1lfGh0bWwgKG9wdGlvbmFsKVxuXHRcdFx0XHRcdGJhc2VDbGFzczogJ21hcC1tb2RhbCcsXG5cdFx0XHRcdFx0Y2xpY2tPdXRzaWRlOiAnY2xvc2UnLFxuXHRcdFx0XHRcdHRvb2xiYXI6IGZhbHNlLFxuXHRcdFx0XHRcdHNtYWxsQnRuOiB0cnVlLCAvLyBjbG9zZSBidG5cblx0XHRcdFx0XHRwYXJlbnRFbDogJ2JvZHknLFxuXHRcdFx0XHRcdG9wdHM6IHtcblx0XHRcdFx0XHRcdGJ1dHRvbnM6IFtcblx0XHRcdFx0XHRcdFx0J3pvb20nLFxuXHRcdFx0XHRcdFx0XHQnc2hhcmUnLFxuXHRcdFx0XHRcdFx0XHQnc2xpZGVTaG93Jyxcblx0XHRcdFx0XHRcdFx0J2Z1bGxTY3JlZW4nLFxuXHRcdFx0XHRcdFx0XHQnZG93bmxvYWQnLFxuXHRcdFx0XHRcdFx0XHQndGh1bWJzJyxcblx0XHRcdFx0XHRcdFx0J2Nsb3NlJyxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRiZWZvcmVMb2FkOiBmdW5jdGlvbiAoaW5zdGFuY2UsIHNsaWRlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbWFwUG9wdXBUcmlnZ2VyID0gaW5zdGFuY2UuY3VycmVudC5vcHRzLiRvcmlnO1xuXHRcdFx0XHRcdFx0dmFyIG1hcENvbnRhaW5lciA9ICQobWFwUG9wdXBUcmlnZ2VyLmRhdGEoJ3NyYycpKS5maW5kKCcubWFwJyk7XG5cdFx0XHRcdFx0XHRNZXNzaWEubG9hZE1hcChNZXNzaWEubWFwQXBpS2V5KVxuXHRcdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhLm1ha2VNYXAobWFwQ29udGFpbmVyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIENyZWF0ZSBJbnRlcnNlY3Rpb25PYnNlcnZlciBmb3IgY29udGFpbmVycyB3aXRoIG1hcHMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiAgdm9pZFxuXHRcdFx0ICovXG5cdFx0XHRvYnNlcnZlTWFwQ29udGFpbmVyczogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBtYXBDb250YWluZXJzID0gJCgnLmlucHV0X2FkZHJlc3MgLm1hcCcpO1xuXG5cdFx0XHRcdGlmIChtYXBDb250YWluZXJzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgTWVzc2lhLm1hcEFwaUtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdFx0XHRyb290OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG5cdFx0XHRcdFx0cm9vdE1hcmdpbjogJzBweCcsXG5cdFx0XHRcdFx0dGhyZXNob2xkOiAxLjAsXG5cdFx0XHRcdFx0Ly8gZGVsYXk6IDEwMCxcblx0XHRcdFx0XHQvLyB0cmFja1Zpc2liaWxpdHk6IHRydWUsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRNZXNzaWEub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoTWVzc2lhLm1hcENhbnRhaW5lclZpc2libGUsIG9wdGlvbnMpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcENvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBtYXBDb250YWluZXIgPSBtYXBDb250YWluZXJzW2ldO1xuXHRcdFx0XHRcdE1lc3NpYS5vYnNlcnZlci5vYnNlcnZlKG1hcENvbnRhaW5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0aWYgKHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuXHRcdFx0TWVzc2lhLm9ic2VydmVNYXBDb250YWluZXJzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdE1lc3NpYS5tYWtlTWFwcygpO1xuXHRcdH1cblx0XHRNZXNzaWEubWFrZVBvcHVwc0Zvck1hcCgpO1xuXG5cdH0pO1xufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG5cdCQoZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIE1lc3NpYSA9IHtcblx0XHRcdHJlc2l6ZVRpbWVvdXRJZDogZmFsc2UsXG5cdFx0XHRhZGp1c3RUaHVtbmFpbHM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgbWFpbkltYWdlcyA9ICQoJy5mdWxsLWNvbnRhaW5lciAuZ2FsbGVyeS1pdGVtJyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYWluSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgbWFpbkltYWdlID0gJChtYWluSW1hZ2VzW2ldKTtcblx0XHRcdFx0XHR2YXIgdGh1bWJIZWlnaHQgPSAwO1xuXHRcdFx0XHRcdHZhciBjb3VudEhpZGVUaHVtYiA9IDA7XG5cdFx0XHRcdFx0dmFyIG1haW5JbWFnZUhlaWdodCA9IG1haW5JbWFnZS5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBtYWluSW1hZ2UuY2xvc2VzdCgnLmN1c3RvbV90eXBlLWNvbnRhaW5lci5nYWxsZXJ5Jyk7XG5cblx0XHRcdFx0XHRjb250YWluZXIuZmluZCgnLnRodW1iLWNvbnRhaW5lciAuZ2FsbGVyeS1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0aHVtYkhlaWdodCArPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcdFx0XHRpZiAodGh1bWJIZWlnaHQgPD0gbWFpbkltYWdlSGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcblx0XHRcdFx0XHRcdFx0Y291bnRIaWRlVGh1bWIgKz0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmIChjb3VudEhpZGVUaHVtYiA+IDApe1xuXHRcdFx0XHRcdFx0JCgnLnRodW1iLWNvbnRhaW5lcicpLmFkZENsYXNzKCd0aHVtYi1jb250YWluZXItZnVsbCcpXG5cdFx0XHRcdFx0XHRjb250YWluZXIuZmluZCgnLnRodW1iLWNvbnRhaW5lciAuZ2FsbGVyeS1pdGVtLnZpc2libGU6dmlzaWJsZSBhJykuZmluZCgnLmNvdW50LWhpZGUnKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5maW5kKCcudGh1bWItY29udGFpbmVyIC5nYWxsZXJ5LWl0ZW0udmlzaWJsZTp2aXNpYmxlIGEnKS5sYXN0KCkuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImNvdW50LWhpZGVcIj4rJyArIGNvdW50SGlkZVRodW1iICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwcmVwYXJlUmVzaXplOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChNZXNzaWEucmVzaXplVGltZW91dElkKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KE1lc3NpYS5yZXNpemVUaW1lb3V0SWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdE1lc3NpYS5yZXNpemVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KE1lc3NpYS5hZGp1c3RUaHVtbmFpbHMsIDEwMCk7XG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRNZXNzaWEuYWRqdXN0VGh1bW5haWxzKCk7XG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBNZXNzaWEucHJlcGFyZVJlc2l6ZSk7XG5cdH0pO1xuXG59KShqUXVlcnkpOyIsIi8vIFVuY29tbWVudCByZXF1aXJlZCAoc291cmNlIGZpbGVzIGV4aXN0cylcbi8vIGltcG9ydCAnLi4vX2NvbXBvbmVudHMvX2N1c3RvbV9maWVsZHMvX3R5cGVfdGV4dCc7XG4vLyBpbXBvcnQgJy4uL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX3RleHRhcmVhJztcbi8vIGltcG9ydCAnLi4vX2NvbXBvbmVudHMvX2N1c3RvbV9maWVsZHMvX3R5cGVfY2hlY2tib3gnO1xuLy8gaW1wb3J0ICcuLi9fY29tcG9uZW50cy9fY3VzdG9tX2ZpZWxkcy9fdHlwZV9udW1iZXInO1xuLy8gaW1wb3J0ICcuLi9fY29tcG9uZW50cy9fY3VzdG9tX2ZpZWxkcy9fdHlwZV9saW5rJztcbmltcG9ydCAnLi4vX2NvbXBvbmVudHMvX2N1c3RvbV9maWVsZHMvX3R5cGVfYWRkcmVzcyc7XG5pbXBvcnQgJy4uL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX2ltYWdlcyc7XG4vLyBpbXBvcnQgJy4uL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX2V4dGVybmFsX21lZGlhJztcbi8vIGltcG9ydCAnLi4vX2NvbXBvbmVudHMvX2N1c3RvbV9maWVsZHMvX3R5cGVfaHRtbCc7XG4vLyBpbXBvcnQgJy4uL19jb21wb25lbnRzL19jdXN0b21fZmllbGRzL190eXBlX3NlbGVjdF9wb3N0JztcblxuKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cblx0fSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy9jdXN0b20tZmllbGRzLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL2N1c3RvbS1maWVsZHMuanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
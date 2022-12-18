/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/post-edit.scss":
/*!******************************************!*\
  !*** ./src/scss/_backend/post-edit.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/post-edit.js":
/*!**************************************!*\
  !*** ./src/js/_backend/post-edit.js ***!
  \**************************************/
/***/ (function() {

(function ($) {

	$(function () {
		'use strict';

		var Messia;

		wp.apiFetch.use(function (options, next) {

			var result = next(options);
			result.then(function (response) {
				Messia.proccessResponse(response);
			}).catch(function (response) {
				Messia.proccessResponse(response);
			});
			return result;
		});

		Messia = {
			selectMedia: function () {
				$(this).messiaMediaSelector(Messia.imageSelected);
			},
			removeMedia: function (event) {

				event.stopPropagation();
				var images = $(this).parents('.field');
				$(this).parents('.icon').remove();
				Messia.updateImagesInput(images);
				Messia.gallerySortableAbility(images);
			},
			imageSelected: function (caller, selection) {
				$.fn.messiaAppendMediaSelection(caller, selection);

				var images = caller.parents('.field');
				Messia.updateImagesInput(images);
				Messia.gallerySortableAbility(images);
			},
			updateImagesInput: function (container) {

				var images = [];
				var icons = container.find('.icon');
				var dataGetter = container.find('.storage');

				dataGetter.empty();

				for (var i = 0; i < icons.length; i++) {
					if ($(icons[i]).find('.placeholder-image').length === 0) {
						var imageinfo = $(icons[i]).data('imageinfo');

						if (typeof imageinfo.userLink === 'undefined') {
							imageinfo.userLink = '';
						}
						delete imageinfo.url;

						for (const key in imageinfo) {
							dataGetter.append(`<input type="hidden" name="${dataGetter.data('name')}[${i}][${key}]" value="${imageinfo[key]}">`);
						}
						images.push($(icons[i]).data('imageinfo'));
					}
				}
			},
			editLinkImage: function (event) {

				event.stopPropagation();

				var link_wrapper = $(this).parents('.field').find('.link-wrapper');
				var caller = $(this).parent('.icon');

				$(this).addClass('on-edit');

				link_wrapper.hide({
					effect: 'drop',
					direction: 'down',
					duration: 300,
					complete: function () {
						$(this).show({
							effect: 'drop',
							direction: 'down',
							duration: 300
						}).data('caller', caller).find('input.data').val(caller.data('imageinfo').userLink);
					}
				});
			},
			commitLinkImage: function (event) {

				var link_wrapper = $(this).parent('.link-wrapper');
				var caller = link_wrapper.data('caller');
				var image_link = $(this).parent('.link-wrapper').find('input.data').val();

				if (caller.hasClass('icon')) {
					caller.data('imageinfo').userLink = image_link;
					Messia.updateImagesInput(link_wrapper.parent('.field'));
					if (image_link === '') {
						caller.find('.edit-link').removeClass('linked');
					} else {
						caller.find('.edit-link').addClass('linked');
					}
					caller.find('.edit-link').removeClass('on-edit');
				}

				link_wrapper.hide({
					effect: 'drop',
					direction: 'down',
					duration: 300
				});
			},
			editLinkUrl: function (event) {

				event.stopPropagation();

				var field = $(this).parents('.field');
				var link_wrapper = field.find('.link-wrapper');
				field.find('.edit-link').addClass('on-edit');

				link_wrapper.show({
					effect: 'drop',
					direction: 'down',
					duration: 300,
				});
			},
			commitLinkUrl: function (event) {

				var
					link_wrapper = $(this).parent('.link-wrapper'),
					url = link_wrapper.find('input[type="url"]').val(),
					icon = link_wrapper.prev('.input-link').find('.edit-link');

				if (url === '') {
					icon.removeClass('linked');
				} else {
					icon.addClass('linked');
				}
				icon.removeClass('on-edit');

				link_wrapper.hide({
					effect: 'drop',
					direction: 'down',
					duration: 300
				});
			},
			makeRadioButtons: function () {
				$("#messia_object_segmentchecklist input").each(function () {
					this.type = 'radio';
				});
			},
			newSegmentObserver: function () {

				var targetNode = document.getElementById('messia_object_segmentchecklist');

				if (targetNode === null) {
					return;
				}

				var config = { attributes: true, childList: true, subtree: true };
				var callback = function (mutationsList) {
					for (var mutation of mutationsList) {
						if (mutation.type == 'childList') {
							Messia.makeRadioButtons();
						}
					}
				};
				var observer = new MutationObserver(callback);
				observer.observe(targetNode, config);
			},
			proccessResponse: function (response) {
				Messia.googleGeoResponse(response);
				Messia.messiaResponse(response);
			},
			messiaResponse: function (response) {

				if (typeof response.messiaData !== 'undefined') {
					if (typeof response.messiaData.saved !== 'undefined') {
						if (response.messiaData.saved === false) {

							wp.data.dispatch('core/notices').createNotice(
								'error', // Can be one of: success, info, warning, error.
								response.messiaData.comment, // Text string to display.
								{ id: 'messia/page-undeletable', isDismissible: true }
							);
						}
					}
					if (typeof response.messiaData.reload !== 'undefined') {
						if (response.messiaData.reload === true) {

							var warned = false;
							var unSubscribe = wp.data.subscribe(function () {
								var saving = wp.data.select('core/editor').isSavingPost();
								if (!saving) {
									unSubscribe();
									if (warned === false) {
										alert(messiaVars.messages.postReloadPending);
										window.location.reload();
										warned = true;
									}
								}
							});
						}
					}
				}
			},
			googleGeoResponse: function (response) {

				if (typeof response.headers !== 'undefined') {

					var googleGeoWarn = response.headers.get('Google-Geo-Coder');

					if ('' !== googleGeoWarn && null !== googleGeoWarn) {

						if ('OK' === googleGeoWarn) {

							response.text().then(function (page) {
								var $ = jQuery;
								var html = $.parseHTML(page);
								var constructor_metabox_response = $(html).find('div[id^="segment-constructor-term-id"]');
								var constructor_metabox_current = $('div[id^="segment-constructor-term-id"]');

								for (var i = 0; i < constructor_metabox_current.length; i++) {

									var current_addresses = $(constructor_metabox_current[i]).find('.address-field');
									var response_addresses = $(constructor_metabox_response[i]).find('.address-field')

									for (var q = 0; q < current_addresses.length; q++) {
										$(current_addresses[q]).replaceWith($(response_addresses[q]));
									}
								}
							});
						}
						else {

							wp.data.dispatch('core/notices').createNotice(
								'warning', // Can be one of: success, info, warning, error.
								googleGeoWarn, // Text string to display.
								{ id: 'messia/google-geocoder-info', isDismissible: true }
							);
						}
					}
				}
			},
			forceSetSegment: function () {

				let locked = false;

				const unsubscribe = wp.data.subscribe(() => {

					const postSegment = wp.data.select('core/editor').getEditedPostAttribute('messia_object_segment');

					if (typeof postSegment === 'undefined') {
						return;
					}
					// Lock the post if the no segment selected.
					if (postSegment.length === 0) {
						if (!locked) {
							locked = true;
							wp.data.dispatch('core/editor').lockPostSaving('messia/segment-lock-saving');
							wp.data.dispatch('core/notices').createNotice(
								'warning',
								messiaVars.messages.segmentIsEmpty,
								{ id: 'messia/segment-lock-saving-notice', isDismissible: false }
							);
						}
					}
					else if (locked) {
						locked = false;
						wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock-saving');
						wp.data.dispatch('core/notices').removeNotice('messia/segment-lock-saving-notice');
					}
				});
				return unsubscribe;
			},
			gallerySortableAbility: function (container) {

				var slot = container.find('.icon-wrapper');
				var icons = slot.find('.icon');

				if (icons.length <= 2) { // 1 image + 1 placeholder
					slot.sortable('disable');
				}
				else {
					slot.sortable('enable');
				}
			},
			initGallery: function (e) {

				var slots = $('.metabox-constructor-fields .icon-wrapper');

				for (var i = 0; i < slots.length; i++) {

					var slot = $(slots[i]);

					slots.sortable({
						//revert: 200, //Breaks with Gutenberg On
						forceHelperSize: true,
						forcePlaceholderSize: true,
						opacity: 0.5,
						items: "> .icon",
						distance: 10,
						tolerance: 'pointer',
						scroll: false,
						//handle: '.tmpl',
						//containment: '.icon-wrapper',
						placeholder: 'sortable-placeholder',
						beforeStop: function (event, ui) {
							ui.helper.css({
								'height': '',
								'width': '',
							});

							Messia.updateImagesInput(ui.item.parents('.field'));
						},
						stop: function (event, ui) {
							this.dispatchEvent(new Event('sortableChange', { bubbles: true }));
						},
					});

					var container = slot.parents('.field');
					Messia.gallerySortableAbility(container);
				}
			},
			createEvents: function () {
				var flagOne = true;
				var flagTwo = false;
				const unSubscribeOne = wp.data.subscribe(() => {
					var isSavingPost = wp.data.select('core/editor').isSavingPost();
					var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

					if (isSavingPost && flagOne && !isAutosavingPost) {
						flagOne = false;
						flagTwo = true;
						document.dispatchEvent(
							new Event('savePostStart', {
								bubbles: false,
							})
						);
						const unSubscribeTwo = wp.data.subscribe(() => {
							var isSavingPost = wp.data.select('core/editor').isSavingPost();
							var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

							if (!isSavingPost && flagTwo && !isAutosavingPost) {
								flagOne = true;
								flagTwo = false;
								document.dispatchEvent(
									new Event('savePostFinish', {
										bubbles: false,
									})
								);
							}
						});
					}
				});
			},
			reinitFragments: function (e) {
				Messia.initGallery();
				$(e.target).find('textarea.messia').messiaStickyTextarea();
			},
			setDirty: function (e) {
				$(document).trigger('messiaContentIsDirty');
			},
			clearDirty: function (e) {
				$(document).trigger('messiaContentIsSaved');
			},
			removeNoticesOnSavePost: function (e) {
				wp.data.dispatch('core/notices').removeNotice('messia/page-undeletable');
				wp.data.dispatch('core/notices').removeNotice('messia/google-geocoder-info');
			}
		}

		$('body').on('objectMetaboxUpdated', Messia.reinitFragments);
		$('body').on('click touchstart', '.metabox-constructor-fields .icon .edit-image', Messia.selectMedia);
		$('body').on('click touchstart', '.metabox-constructor-fields .icon .remove-image', Messia.removeMedia);
		$('body').on('click', '.metabox-constructor-fields .icon .edit-link', Messia.editLinkImage);
		$('body').on('focus', '.metabox-constructor-fields .input-link input', Messia.editLinkUrl);
		$('body').on('click', '.metabox-constructor-fields .field .link-wrapper #commit-image-link', Messia.commitLinkImage);
		$('body').on('click', '.metabox-constructor-fields .field .link-wrapper #commit-url-link', Messia.commitLinkUrl);

		$('textarea.messia').messiaStickyTextarea();
		$('.macs .metabox-constructor-fields .field .messia-help-tip').tooltip();
		$('.macs .metabox-comment-fields .field .messia-help-tip').tooltip();

		$('body').on('input', 'div[id^="segment-constructor-term-id"] input, div[id^="segment-constructor-term-id"] textarea, div[id^="segment-constructor-term-id"] select', Messia.setDirty);
		$('body').on('input', 'div[id^="segment-stuff-term-id"] input, div[id^="segment-stuff-term-id"] textarea, div[id^="segment-stuff-term-id"] select', Messia.setDirty);

		$('form#post').on('submit', Messia.clearDirty);
		$(document).on('savePostStart', Messia.removeNoticesOnSavePost);
		$(document).on('savePostFinish', Messia.clearDirty);

		Messia.initGallery();
		Messia.newSegmentObserver();
		Messia.makeRadioButtons();
		Messia.forceSetSegment();
		Messia.createEvents();
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
/*!************************************************!*\
  !*** ./src/entries/backend/entry-post-edit.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_post_edit_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/post-edit.scss */ "./src/scss/_backend/post-edit.scss");
/* harmony import */ var _js_backend_post_edit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/post-edit.js */ "./src/js/_backend/post-edit.js");
/* harmony import */ var _js_backend_post_edit_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_post_edit_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvcG9zdC1lZGl0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQsd0JBQXdCLEdBQUcsRUFBRSxJQUFJLElBQUksWUFBWSxlQUFlO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLHdDQUF3Qzs7QUFFaEU7QUFDQTs7QUFFQSx5QkFBeUIsOEJBQThCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQSxvQkFBb0Isa0JBQWtCOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQSxPQUFPO0FBQ1A7QUFDQSx3REFBd0QsZUFBZTtBQUN2RSxPQUFPO0FBQ1AsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7Ozs7OztVQ3ZZRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUM0Qzs7QUFFNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9fYmFja2VuZC9wb3N0LWVkaXQuc2Nzcz9hOTlkIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fYmFja2VuZC9wb3N0LWVkaXQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2JhY2tlbmQvZW50cnktcG9zdC1lZGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIihmdW5jdGlvbiAoJCkge1xuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdHZhciBNZXNzaWE7XG5cblx0XHR3cC5hcGlGZXRjaC51c2UoZnVuY3Rpb24gKG9wdGlvbnMsIG5leHQpIHtcblxuXHRcdFx0dmFyIHJlc3VsdCA9IG5leHQob3B0aW9ucyk7XG5cdFx0XHRyZXN1bHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdFx0TWVzc2lhLnByb2NjZXNzUmVzcG9uc2UocmVzcG9uc2UpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHRcdE1lc3NpYS5wcm9jY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblxuXHRcdE1lc3NpYSA9IHtcblx0XHRcdHNlbGVjdE1lZGlhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQodGhpcykubWVzc2lhTWVkaWFTZWxlY3RvcihNZXNzaWEuaW1hZ2VTZWxlY3RlZCk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlTWVkaWE6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR2YXIgaW1hZ2VzID0gJCh0aGlzKS5wYXJlbnRzKCcuZmllbGQnKTtcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcuaWNvbicpLnJlbW92ZSgpO1xuXHRcdFx0XHRNZXNzaWEudXBkYXRlSW1hZ2VzSW5wdXQoaW1hZ2VzKTtcblx0XHRcdFx0TWVzc2lhLmdhbGxlcnlTb3J0YWJsZUFiaWxpdHkoaW1hZ2VzKTtcblx0XHRcdH0sXG5cdFx0XHRpbWFnZVNlbGVjdGVkOiBmdW5jdGlvbiAoY2FsbGVyLCBzZWxlY3Rpb24pIHtcblx0XHRcdFx0JC5mbi5tZXNzaWFBcHBlbmRNZWRpYVNlbGVjdGlvbihjYWxsZXIsIHNlbGVjdGlvbik7XG5cblx0XHRcdFx0dmFyIGltYWdlcyA9IGNhbGxlci5wYXJlbnRzKCcuZmllbGQnKTtcblx0XHRcdFx0TWVzc2lhLnVwZGF0ZUltYWdlc0lucHV0KGltYWdlcyk7XG5cdFx0XHRcdE1lc3NpYS5nYWxsZXJ5U29ydGFibGVBYmlsaXR5KGltYWdlcyk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlSW1hZ2VzSW5wdXQ6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblxuXHRcdFx0XHR2YXIgaW1hZ2VzID0gW107XG5cdFx0XHRcdHZhciBpY29ucyA9IGNvbnRhaW5lci5maW5kKCcuaWNvbicpO1xuXHRcdFx0XHR2YXIgZGF0YUdldHRlciA9IGNvbnRhaW5lci5maW5kKCcuc3RvcmFnZScpO1xuXG5cdFx0XHRcdGRhdGFHZXR0ZXIuZW1wdHkoKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKCQoaWNvbnNbaV0pLmZpbmQoJy5wbGFjZWhvbGRlci1pbWFnZScpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dmFyIGltYWdlaW5mbyA9ICQoaWNvbnNbaV0pLmRhdGEoJ2ltYWdlaW5mbycpO1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGltYWdlaW5mby51c2VyTGluayA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0aW1hZ2VpbmZvLnVzZXJMaW5rID0gJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxldGUgaW1hZ2VpbmZvLnVybDtcblxuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gaW1hZ2VpbmZvKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFHZXR0ZXIuYXBwZW5kKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke2RhdGFHZXR0ZXIuZGF0YSgnbmFtZScpfVske2l9XVske2tleX1dXCIgdmFsdWU9XCIke2ltYWdlaW5mb1trZXldfVwiPmApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aW1hZ2VzLnB1c2goJChpY29uc1tpXSkuZGF0YSgnaW1hZ2VpbmZvJykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVkaXRMaW5rSW1hZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdHZhciBsaW5rX3dyYXBwZXIgPSAkKHRoaXMpLnBhcmVudHMoJy5maWVsZCcpLmZpbmQoJy5saW5rLXdyYXBwZXInKTtcblx0XHRcdFx0dmFyIGNhbGxlciA9ICQodGhpcykucGFyZW50KCcuaWNvbicpO1xuXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ29uLWVkaXQnKTtcblxuXHRcdFx0XHRsaW5rX3dyYXBwZXIuaGlkZSh7XG5cdFx0XHRcdFx0ZWZmZWN0OiAnZHJvcCcsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiAnZG93bicsXG5cdFx0XHRcdFx0ZHVyYXRpb246IDMwMCxcblx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5zaG93KHtcblx0XHRcdFx0XHRcdFx0ZWZmZWN0OiAnZHJvcCcsXG5cdFx0XHRcdFx0XHRcdGRpcmVjdGlvbjogJ2Rvd24nLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMzAwXG5cdFx0XHRcdFx0XHR9KS5kYXRhKCdjYWxsZXInLCBjYWxsZXIpLmZpbmQoJ2lucHV0LmRhdGEnKS52YWwoY2FsbGVyLmRhdGEoJ2ltYWdlaW5mbycpLnVzZXJMaW5rKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGNvbW1pdExpbmtJbWFnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0dmFyIGxpbmtfd3JhcHBlciA9ICQodGhpcykucGFyZW50KCcubGluay13cmFwcGVyJyk7XG5cdFx0XHRcdHZhciBjYWxsZXIgPSBsaW5rX3dyYXBwZXIuZGF0YSgnY2FsbGVyJyk7XG5cdFx0XHRcdHZhciBpbWFnZV9saW5rID0gJCh0aGlzKS5wYXJlbnQoJy5saW5rLXdyYXBwZXInKS5maW5kKCdpbnB1dC5kYXRhJykudmFsKCk7XG5cblx0XHRcdFx0aWYgKGNhbGxlci5oYXNDbGFzcygnaWNvbicpKSB7XG5cdFx0XHRcdFx0Y2FsbGVyLmRhdGEoJ2ltYWdlaW5mbycpLnVzZXJMaW5rID0gaW1hZ2VfbGluaztcblx0XHRcdFx0XHRNZXNzaWEudXBkYXRlSW1hZ2VzSW5wdXQobGlua193cmFwcGVyLnBhcmVudCgnLmZpZWxkJykpO1xuXHRcdFx0XHRcdGlmIChpbWFnZV9saW5rID09PSAnJykge1xuXHRcdFx0XHRcdFx0Y2FsbGVyLmZpbmQoJy5lZGl0LWxpbmsnKS5yZW1vdmVDbGFzcygnbGlua2VkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNhbGxlci5maW5kKCcuZWRpdC1saW5rJykuYWRkQ2xhc3MoJ2xpbmtlZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsZXIuZmluZCgnLmVkaXQtbGluaycpLnJlbW92ZUNsYXNzKCdvbi1lZGl0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsaW5rX3dyYXBwZXIuaGlkZSh7XG5cdFx0XHRcdFx0ZWZmZWN0OiAnZHJvcCcsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiAnZG93bicsXG5cdFx0XHRcdFx0ZHVyYXRpb246IDMwMFxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRlZGl0TGlua1VybDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0dmFyIGZpZWxkID0gJCh0aGlzKS5wYXJlbnRzKCcuZmllbGQnKTtcblx0XHRcdFx0dmFyIGxpbmtfd3JhcHBlciA9IGZpZWxkLmZpbmQoJy5saW5rLXdyYXBwZXInKTtcblx0XHRcdFx0ZmllbGQuZmluZCgnLmVkaXQtbGluaycpLmFkZENsYXNzKCdvbi1lZGl0Jyk7XG5cblx0XHRcdFx0bGlua193cmFwcGVyLnNob3coe1xuXHRcdFx0XHRcdGVmZmVjdDogJ2Ryb3AnLFxuXHRcdFx0XHRcdGRpcmVjdGlvbjogJ2Rvd24nLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiAzMDAsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGNvbW1pdExpbmtVcmw6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdHZhclxuXHRcdFx0XHRcdGxpbmtfd3JhcHBlciA9ICQodGhpcykucGFyZW50KCcubGluay13cmFwcGVyJyksXG5cdFx0XHRcdFx0dXJsID0gbGlua193cmFwcGVyLmZpbmQoJ2lucHV0W3R5cGU9XCJ1cmxcIl0nKS52YWwoKSxcblx0XHRcdFx0XHRpY29uID0gbGlua193cmFwcGVyLnByZXYoJy5pbnB1dC1saW5rJykuZmluZCgnLmVkaXQtbGluaycpO1xuXG5cdFx0XHRcdGlmICh1cmwgPT09ICcnKSB7XG5cdFx0XHRcdFx0aWNvbi5yZW1vdmVDbGFzcygnbGlua2VkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWNvbi5hZGRDbGFzcygnbGlua2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWNvbi5yZW1vdmVDbGFzcygnb24tZWRpdCcpO1xuXG5cdFx0XHRcdGxpbmtfd3JhcHBlci5oaWRlKHtcblx0XHRcdFx0XHRlZmZlY3Q6ICdkcm9wJyxcblx0XHRcdFx0XHRkaXJlY3Rpb246ICdkb3duJyxcblx0XHRcdFx0XHRkdXJhdGlvbjogMzAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG1ha2VSYWRpb0J1dHRvbnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JChcIiNtZXNzaWFfb2JqZWN0X3NlZ21lbnRjaGVja2xpc3QgaW5wdXRcIikuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy50eXBlID0gJ3JhZGlvJztcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0bmV3U2VnbWVudE9ic2VydmVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dmFyIHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2lhX29iamVjdF9zZWdtZW50Y2hlY2tsaXN0Jyk7XG5cblx0XHRcdFx0aWYgKHRhcmdldE5vZGUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcblx0XHRcdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKG11dGF0aW9uc0xpc3QpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBtdXRhdGlvbiBvZiBtdXRhdGlvbnNMaXN0KSB7XG5cdFx0XHRcdFx0XHRpZiAobXV0YXRpb24udHlwZSA9PSAnY2hpbGRMaXN0Jykge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWEubWFrZVJhZGlvQnV0dG9ucygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuXHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG5cdFx0XHR9LFxuXHRcdFx0cHJvY2Nlc3NSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHRcdE1lc3NpYS5nb29nbGVHZW9SZXNwb25zZShyZXNwb25zZSk7XG5cdFx0XHRcdE1lc3NpYS5tZXNzaWFSZXNwb25zZShyZXNwb25zZSk7XG5cdFx0XHR9LFxuXHRcdFx0bWVzc2lhUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgcmVzcG9uc2UubWVzc2lhRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHJlc3BvbnNlLm1lc3NpYURhdGEuc2F2ZWQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UubWVzc2lhRGF0YS5zYXZlZCA9PT0gZmFsc2UpIHtcblxuXHRcdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UubWVzc2lhRGF0YS5jb21tZW50LCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0XHRcdHsgaWQ6ICdtZXNzaWEvcGFnZS11bmRlbGV0YWJsZScsIGlzRGlzbWlzc2libGU6IHRydWUgfVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodHlwZW9mIHJlc3BvbnNlLm1lc3NpYURhdGEucmVsb2FkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLm1lc3NpYURhdGEucmVsb2FkID09PSB0cnVlKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHdhcm5lZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR2YXIgdW5TdWJzY3JpYmUgPSB3cC5kYXRhLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHNhdmluZyA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzU2F2aW5nUG9zdCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghc2F2aW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1blN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHdhcm5lZCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQobWVzc2lhVmFycy5tZXNzYWdlcy5wb3N0UmVsb2FkUGVuZGluZyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGdvb2dsZUdlb1Jlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXHRcdFx0XHRpZiAodHlwZW9mIHJlc3BvbnNlLmhlYWRlcnMgIT09ICd1bmRlZmluZWQnKSB7XG5cblx0XHRcdFx0XHR2YXIgZ29vZ2xlR2VvV2FybiA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdHb29nbGUtR2VvLUNvZGVyJyk7XG5cblx0XHRcdFx0XHRpZiAoJycgIT09IGdvb2dsZUdlb1dhcm4gJiYgbnVsbCAhPT0gZ29vZ2xlR2VvV2Fybikge1xuXG5cdFx0XHRcdFx0XHRpZiAoJ09LJyA9PT0gZ29vZ2xlR2VvV2Fybikge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLnRleHQoKS50aGVuKGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyICQgPSBqUXVlcnk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSAkLnBhcnNlSFRNTChwYWdlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgY29uc3RydWN0b3JfbWV0YWJveF9yZXNwb25zZSA9ICQoaHRtbCkuZmluZCgnZGl2W2lkXj1cInNlZ21lbnQtY29uc3RydWN0b3ItdGVybS1pZFwiXScpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjb25zdHJ1Y3Rvcl9tZXRhYm94X2N1cnJlbnQgPSAkKCdkaXZbaWRePVwic2VnbWVudC1jb25zdHJ1Y3Rvci10ZXJtLWlkXCJdJyk7XG5cblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cnVjdG9yX21ldGFib3hfY3VycmVudC5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudF9hZGRyZXNzZXMgPSAkKGNvbnN0cnVjdG9yX21ldGFib3hfY3VycmVudFtpXSkuZmluZCgnLmFkZHJlc3MtZmllbGQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXNwb25zZV9hZGRyZXNzZXMgPSAkKGNvbnN0cnVjdG9yX21ldGFib3hfcmVzcG9uc2VbaV0pLmZpbmQoJy5hZGRyZXNzLWZpZWxkJylcblxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgcSA9IDA7IHEgPCBjdXJyZW50X2FkZHJlc3Nlcy5sZW5ndGg7IHErKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKGN1cnJlbnRfYWRkcmVzc2VzW3FdKS5yZXBsYWNlV2l0aCgkKHJlc3BvbnNlX2FkZHJlc3Nlc1txXSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHRcdFx0J3dhcm5pbmcnLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdFx0XHRnb29nbGVHZW9XYXJuLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0XHRcdHsgaWQ6ICdtZXNzaWEvZ29vZ2xlLWdlb2NvZGVyLWluZm8nLCBpc0Rpc21pc3NpYmxlOiB0cnVlIH1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmb3JjZVNldFNlZ21lbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRsZXQgbG9ja2VkID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc3QgdW5zdWJzY3JpYmUgPSB3cC5kYXRhLnN1YnNjcmliZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRjb25zdCBwb3N0U2VnbWVudCA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmdldEVkaXRlZFBvc3RBdHRyaWJ1dGUoJ21lc3NpYV9vYmplY3Rfc2VnbWVudCcpO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwb3N0U2VnbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gTG9jayB0aGUgcG9zdCBpZiB0aGUgbm8gc2VnbWVudCBzZWxlY3RlZC5cblx0XHRcdFx0XHRpZiAocG9zdFNlZ21lbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWxvY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRsb2NrZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL2VkaXRvcicpLmxvY2tQb3N0U2F2aW5nKCdtZXNzaWEvc2VnbWVudC1sb2NrLXNhdmluZycpO1xuXHRcdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHRcdFx0J3dhcm5pbmcnLFxuXHRcdFx0XHRcdFx0XHRcdG1lc3NpYVZhcnMubWVzc2FnZXMuc2VnbWVudElzRW1wdHksXG5cdFx0XHRcdFx0XHRcdFx0eyBpZDogJ21lc3NpYS9zZWdtZW50LWxvY2stc2F2aW5nLW5vdGljZScsIGlzRGlzbWlzc2libGU6IGZhbHNlIH1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAobG9ja2VkKSB7XG5cdFx0XHRcdFx0XHRsb2NrZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvZWRpdG9yJykudW5sb2NrUG9zdFNhdmluZygnbWVzc2lhL3NlZ21lbnQtbG9jay1zYXZpbmcnKTtcblx0XHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLnJlbW92ZU5vdGljZSgnbWVzc2lhL3NlZ21lbnQtbG9jay1zYXZpbmctbm90aWNlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlO1xuXHRcdFx0fSxcblx0XHRcdGdhbGxlcnlTb3J0YWJsZUFiaWxpdHk6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblxuXHRcdFx0XHR2YXIgc2xvdCA9IGNvbnRhaW5lci5maW5kKCcuaWNvbi13cmFwcGVyJyk7XG5cdFx0XHRcdHZhciBpY29ucyA9IHNsb3QuZmluZCgnLmljb24nKTtcblxuXHRcdFx0XHRpZiAoaWNvbnMubGVuZ3RoIDw9IDIpIHsgLy8gMSBpbWFnZSArIDEgcGxhY2Vob2xkZXJcblx0XHRcdFx0XHRzbG90LnNvcnRhYmxlKCdkaXNhYmxlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2xvdC5zb3J0YWJsZSgnZW5hYmxlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbml0R2FsbGVyeTogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgc2xvdHMgPSAkKCcubWV0YWJveC1jb25zdHJ1Y3Rvci1maWVsZHMgLmljb24td3JhcHBlcicpO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2xvdHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdHZhciBzbG90ID0gJChzbG90c1tpXSk7XG5cblx0XHRcdFx0XHRzbG90cy5zb3J0YWJsZSh7XG5cdFx0XHRcdFx0XHQvL3JldmVydDogMjAwLCAvL0JyZWFrcyB3aXRoIEd1dGVuYmVyZyBPblxuXHRcdFx0XHRcdFx0Zm9yY2VIZWxwZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRcdFx0Zm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiAwLjUsXG5cdFx0XHRcdFx0XHRpdGVtczogXCI+IC5pY29uXCIsXG5cdFx0XHRcdFx0XHRkaXN0YW5jZTogMTAsXG5cdFx0XHRcdFx0XHR0b2xlcmFuY2U6ICdwb2ludGVyJyxcblx0XHRcdFx0XHRcdHNjcm9sbDogZmFsc2UsXG5cdFx0XHRcdFx0XHQvL2hhbmRsZTogJy50bXBsJyxcblx0XHRcdFx0XHRcdC8vY29udGFpbm1lbnQ6ICcuaWNvbi13cmFwcGVyJyxcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiAnc29ydGFibGUtcGxhY2Vob2xkZXInLFxuXHRcdFx0XHRcdFx0YmVmb3JlU3RvcDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRcdFx0XHR1aS5oZWxwZXIuY3NzKHtcblx0XHRcdFx0XHRcdFx0XHQnaGVpZ2h0JzogJycsXG5cdFx0XHRcdFx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdE1lc3NpYS51cGRhdGVJbWFnZXNJbnB1dCh1aS5pdGVtLnBhcmVudHMoJy5maWVsZCcpKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdG9wOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3NvcnRhYmxlQ2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gc2xvdC5wYXJlbnRzKCcuZmllbGQnKTtcblx0XHRcdFx0XHRNZXNzaWEuZ2FsbGVyeVNvcnRhYmxlQWJpbGl0eShjb250YWluZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3JlYXRlRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBmbGFnT25lID0gdHJ1ZTtcblx0XHRcdFx0dmFyIGZsYWdUd28gPSBmYWxzZTtcblx0XHRcdFx0Y29uc3QgdW5TdWJzY3JpYmVPbmUgPSB3cC5kYXRhLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGlzU2F2aW5nUG9zdCA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzU2F2aW5nUG9zdCgpO1xuXHRcdFx0XHRcdHZhciBpc0F1dG9zYXZpbmdQb3N0ID0gd3AuZGF0YS5zZWxlY3QoJ2NvcmUvZWRpdG9yJykuaXNBdXRvc2F2aW5nUG9zdCgpO1xuXG5cdFx0XHRcdFx0aWYgKGlzU2F2aW5nUG9zdCAmJiBmbGFnT25lICYmICFpc0F1dG9zYXZpbmdQb3N0KSB7XG5cdFx0XHRcdFx0XHRmbGFnT25lID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRmbGFnVHdvID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG5cdFx0XHRcdFx0XHRcdG5ldyBFdmVudCgnc2F2ZVBvc3RTdGFydCcsIHtcblx0XHRcdFx0XHRcdFx0XHRidWJibGVzOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRjb25zdCB1blN1YnNjcmliZVR3byA9IHdwLmRhdGEuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFyIGlzU2F2aW5nUG9zdCA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzU2F2aW5nUG9zdCgpO1xuXHRcdFx0XHRcdFx0XHR2YXIgaXNBdXRvc2F2aW5nUG9zdCA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzQXV0b3NhdmluZ1Bvc3QoKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIWlzU2F2aW5nUG9zdCAmJiBmbGFnVHdvICYmICFpc0F1dG9zYXZpbmdQb3N0KSB7XG5cdFx0XHRcdFx0XHRcdFx0ZmxhZ09uZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0ZmxhZ1R3byA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRuZXcgRXZlbnQoJ3NhdmVQb3N0RmluaXNoJywge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRidWJibGVzOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRyZWluaXRGcmFnbWVudHM6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdE1lc3NpYS5pbml0R2FsbGVyeSgpO1xuXHRcdFx0XHQkKGUudGFyZ2V0KS5maW5kKCd0ZXh0YXJlYS5tZXNzaWEnKS5tZXNzaWFTdGlja3lUZXh0YXJlYSgpO1xuXHRcdFx0fSxcblx0XHRcdHNldERpcnR5OiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdtZXNzaWFDb250ZW50SXNEaXJ0eScpO1xuXHRcdFx0fSxcblx0XHRcdGNsZWFyRGlydHk6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ21lc3NpYUNvbnRlbnRJc1NhdmVkJyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlTm90aWNlc09uU2F2ZVBvc3Q6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLnJlbW92ZU5vdGljZSgnbWVzc2lhL3BhZ2UtdW5kZWxldGFibGUnKTtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykucmVtb3ZlTm90aWNlKCdtZXNzaWEvZ29vZ2xlLWdlb2NvZGVyLWluZm8nKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ29iamVjdE1ldGFib3hVcGRhdGVkJywgTWVzc2lhLnJlaW5pdEZyYWdtZW50cyk7XG5cdFx0JCgnYm9keScpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyAuaWNvbiAuZWRpdC1pbWFnZScsIE1lc3NpYS5zZWxlY3RNZWRpYSk7XG5cdFx0JCgnYm9keScpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyAuaWNvbiAucmVtb3ZlLWltYWdlJywgTWVzc2lhLnJlbW92ZU1lZGlhKTtcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyAuaWNvbiAuZWRpdC1saW5rJywgTWVzc2lhLmVkaXRMaW5rSW1hZ2UpO1xuXHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCAnLm1ldGFib3gtY29uc3RydWN0b3ItZmllbGRzIC5pbnB1dC1saW5rIGlucHV0JywgTWVzc2lhLmVkaXRMaW5rVXJsKTtcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyAuZmllbGQgLmxpbmstd3JhcHBlciAjY29tbWl0LWltYWdlLWxpbmsnLCBNZXNzaWEuY29tbWl0TGlua0ltYWdlKTtcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyAuZmllbGQgLmxpbmstd3JhcHBlciAjY29tbWl0LXVybC1saW5rJywgTWVzc2lhLmNvbW1pdExpbmtVcmwpO1xuXG5cdFx0JCgndGV4dGFyZWEubWVzc2lhJykubWVzc2lhU3RpY2t5VGV4dGFyZWEoKTtcblx0XHQkKCcubWFjcyAubWV0YWJveC1jb25zdHJ1Y3Rvci1maWVsZHMgLmZpZWxkIC5tZXNzaWEtaGVscC10aXAnKS50b29sdGlwKCk7XG5cdFx0JCgnLm1hY3MgLm1ldGFib3gtY29tbWVudC1maWVsZHMgLmZpZWxkIC5tZXNzaWEtaGVscC10aXAnKS50b29sdGlwKCk7XG5cblx0XHQkKCdib2R5Jykub24oJ2lucHV0JywgJ2RpdltpZF49XCJzZWdtZW50LWNvbnN0cnVjdG9yLXRlcm0taWRcIl0gaW5wdXQsIGRpdltpZF49XCJzZWdtZW50LWNvbnN0cnVjdG9yLXRlcm0taWRcIl0gdGV4dGFyZWEsIGRpdltpZF49XCJzZWdtZW50LWNvbnN0cnVjdG9yLXRlcm0taWRcIl0gc2VsZWN0JywgTWVzc2lhLnNldERpcnR5KTtcblx0XHQkKCdib2R5Jykub24oJ2lucHV0JywgJ2RpdltpZF49XCJzZWdtZW50LXN0dWZmLXRlcm0taWRcIl0gaW5wdXQsIGRpdltpZF49XCJzZWdtZW50LXN0dWZmLXRlcm0taWRcIl0gdGV4dGFyZWEsIGRpdltpZF49XCJzZWdtZW50LXN0dWZmLXRlcm0taWRcIl0gc2VsZWN0JywgTWVzc2lhLnNldERpcnR5KTtcblxuXHRcdCQoJ2Zvcm0jcG9zdCcpLm9uKCdzdWJtaXQnLCBNZXNzaWEuY2xlYXJEaXJ0eSk7XG5cdFx0JChkb2N1bWVudCkub24oJ3NhdmVQb3N0U3RhcnQnLCBNZXNzaWEucmVtb3ZlTm90aWNlc09uU2F2ZVBvc3QpO1xuXHRcdCQoZG9jdW1lbnQpLm9uKCdzYXZlUG9zdEZpbmlzaCcsIE1lc3NpYS5jbGVhckRpcnR5KTtcblxuXHRcdE1lc3NpYS5pbml0R2FsbGVyeSgpO1xuXHRcdE1lc3NpYS5uZXdTZWdtZW50T2JzZXJ2ZXIoKTtcblx0XHRNZXNzaWEubWFrZVJhZGlvQnV0dG9ucygpO1xuXHRcdE1lc3NpYS5mb3JjZVNldFNlZ21lbnQoKTtcblx0XHRNZXNzaWEuY3JlYXRlRXZlbnRzKCk7XG5cdH0pO1xufSkoalF1ZXJ5KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVcbmltcG9ydCBcIi4uLy4uL3Njc3MvX2JhY2tlbmQvcG9zdC1lZGl0LnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvX2JhY2tlbmQvcG9zdC1lZGl0LmpzXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
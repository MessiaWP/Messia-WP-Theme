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
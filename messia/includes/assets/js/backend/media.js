/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/media.scss":
/*!**************************************!*\
  !*** ./src/scss/_backend/media.scss ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/media.js":
/*!**********************************!*\
  !*** ./src/js/_backend/media.js ***!
  \**********************************/
/***/ (function() {

jQuery.fn.messiaMediaSelector = function (onSelect) {

	document.activeElement.blur();

	var $ = jQuery.noConflict(),
		xhr = null,
		frame = messiaVars.mediaFrame,
		currentMediaFrame = wp.media.view.MediaFrame.Select,
		iconCollectionView,
		iconSetView;

	const getCaller = function (target) {
		return target.parents('.icon');
	}

	if (false !== frame.model) {
		frame.model.open();
		return;
	}

	const comparator = function (a, b) {

		var aInQuery = !!this.mirroring.get(a.cid),
			bInQuery = !!this.mirroring.get(b.cid);

		if (!aInQuery && bInQuery) {
			return -1;
		}
		else if (aInQuery && !bInQuery) {
			return 1;
		}
		else {
			return 0;
		}
	};

	var appIcons = {
		init: function () {

			if (this.options.iconFonts === false) return;

			wp.media.controller.iconContent = appIcons.controllers.iconContent;
			wp.media.view.Toolbar.Icons = appIcons.views.iconsToolbar;

			this.states.add([
				new wp.media.controller.iconContent({
					id: 'fontCollection',
					title: messiaVars.messages.mediaFrame.iconsTitle,
					content: 'fontCollection',
					fontCollection: appIcons.models.icons,
					menu: 'default', // menu event = menu:render:default
					// router: 'browse',
					toolbar: 'icons-select', // toolbar event = toolbar:create:icons-select
					priority: 20,
					type: 'link',
					// searchable: true,
					// filterable: false,
					// sortable: true,
					// autoSelect: true,
					// describe: false,
					// contentUserSetting: true,
					// syncSelection: true,
					selection: this.options.selection, // required just for backward compatibility with WP.
				}),
			]);
			this.on('content:render:fontCollection', this.renderFontCollection, this);
			this.on('content:render:iconSet', this.renderIconSet, this);
			this.on('toolbar:create:icons-select', this.createIconsToolbar, this);
			this.on('toolbar:create:select', this.createWPToolbar, this);
		},
		models: {
			/**
			 * id: iInner identificator.
			 * name: Tab title.
			 * fonts:
			 *    id: <link> attribute to search font in DOM by.
			 *    url: <link> attribute to load font by.
			 * ajaxAction: WP hook name to get icons from.
			 * icons: icons collection that will be filled by ajax call.
			 */
			icons: new Backbone.Model(
				{
					iconSet: [
						{
							id: 'google-material',
							name: messiaVars.messages.mediaFrame.materialTab,
							variants: [
								{
									id: '01',
									fontId: 'google-material-icons',
									cssClass: ['material-icons'],
									title: 'Filled',
								},
								{
									id: '02',
									fontId: 'google-material-icons-outlined',
									cssClass: ['material-icons-outlined'],
									title: 'Outlined',
								},
								{
									id: '03',
									fontId: 'google-material-icons-rounded',
									cssClass: ['material-icons-round'],
									title: 'Rounded',
								},
								{
									id: '04',
									fontId: 'google-material-icons-two-tone',
									cssClass: ['material-icons-two-tone'],
									title: 'Two Tone',
								},
								{
									id: '05',
									fontId: 'google-material-icons-sharp',
									cssClass: ['material-icons-sharp'],
									title: 'Sharp',
								},
							],
							variantCallback: 'setVariantMaterialIcons',
							ajaxAction: 'get_material_icons',
							icons: {},
						},
					],
					/**
					 * id:   iconSet.variants.fontId - each fontId shoud be setted in fonts,
					 *       it will be ID attr of DOM element, to search font by. Under this same name
					 *       styles expected to be registered in backend.
					 * name: public name used in browser.
					 * url:  remote font host.
					 */
					fonts: [
						{
							id: 'google-material-icons',
							name: 'Material Icons',
							url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
						},
						{
							id: 'google-material-icons-outlined',
							name: 'Material Icons Outlined',
							url: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
						},
						{
							id: 'google-material-icons-rounded',
							name: 'Material Icons Round',
							url: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
						},
						{
							id: 'google-material-icons-two-tone',
							name: 'Material Icons Two Tone',
							url: 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone',
						},
						{
							id: 'google-material-icons-sharp',
							name: 'Material Icons Sharp',
							url: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp',
						},
					],
					activeSet: 'google-material',
					// iconSet ID => variant ID
					activeVariant: {
						'google-material': '02',
						'test_variant': '01',
					},
					selectedIcons: [],
				},
			),
		},
		views: {
			iconCollection: wp.media.View.extend({
				tagName: 'div',
				className: 'icons-collection-wrapper',
				template: wp.template('icon-collection'),
				initialize: function () {
					this.options.iconSet = this.model.get('iconSet');
					this.options.activeSet = this.model.get('activeSet');
					this.options.activeVariant = this.model.get('activeVariant');
				},
				events: {
					'click .toggle-iconset': 'toggleIconSet',
					'click .icons-variants .variant': 'toggleIconVariant',
				},
				ready: function () {
					// Give browser a chance to render tabs.
					setTimeout(() => { this.controller.trigger('content:render:iconSet') }, 10);
				},
				toggleIconSet: function (event) {
					const newSetId = $(event.target).data('setid')
					this.model.set('activeSet', newSetId);
				},
				toggleIconVariant: function (event) {

					const
						target = $(event.currentTarget),
						currentSetId = target.parents('#icon-set').data('setid'),
						iconSet = this.model.get('iconSet'),
						activeVariant = this.model.get('activeVariant'),
						currentSet = iconSet.find((element) => element.id === currentSetId);

					// Click on currently active variant.
					if (activeVariant[currentSetId] === target.data('variantid')) return;

					// Only one variant can be active in a moment.
					target.parents('.icons-variants').find('.variant').removeClass(['button-primary', 'active', 'loading']);
					target.toggleClass(['button-primary', 'active', 'loading']);

					appIcons.helpers[currentSet.variantCallback].call(this, target, currentSet)
					appIcons.helpers.setSelection.call(this);
				}
			}),
			iconSet: wp.media.View.extend({
				tagName: 'div',
				className: 'icons-grid',
				initialize: async function () {

					this.fontToLoad = false;
					this.options.fonts = fonts = this.model.get('fonts');
					this.options.iconSet = iconSet = this.model.get('iconSet');
					this.options.activeSet = activeSet = this.model.get('activeSet');
					this.options.activeVariant = activeVariant = this.model.get('activeVariant');
					this.options.selectedIcons = selectedIcons = this.model.get('selectedIcons');

					this.options.assetsReady = Promise
						.all([
							appIcons.helpers.loadFonts.call(this, iconSet, activeSet, activeVariant, fonts),
							appIcons.helpers.loadIcons.call(this, iconSet, activeSet),
						])
						.then((result) => {
							iconSet.map((element) => {
								if (element.id === activeSet) element.icons = result[1]; // loadIcons() promise result.
							});

							this.options.template = 'icon-set-items';
							return Promise.resolve(true);
						})
						.catch((error) => {
							this.options = {
								message: error.message,
							};
							MessiaExt.logger.error(error);
							this.options.template = 'icon-error';
							return Promise.resolve(false);
						});

					return await this.options.assetsReady;
				},
				events: {
					'click .icon-placeholder': 'toggleIconSelection',
				},
				render: function () {

					if (document && document.fonts && window['FontFace']) {

						let waitFonts = false;
						const
							activeSetData = this.options.iconSet.find((element) => element.id === activeSet),
							activeVariantData = activeSetData.variants.find((element) => element.id === this.options.activeVariant[activeSet]),
							fontData = this.options.fonts.find((element) => element.id === activeVariantData.fontId);

						this.fontToLoad = fontData.name;
						waitFonts = !document.fonts.check(`1px ${this.fontToLoad}`);// Chrome unloads non-used fonts and i don't know for now why.

						if (waitFonts) {
							this.$el.addClass('applying-fonts');
						}
					} else {
						this.$el.addClass('applying-fonts');
					}

					let template = wp.template(this.options.template);
					this.$el.html(template(this.options));
				},
				ready: function () {
					document.fonts.ready.then(() => {
						this.$el.removeClass('applying-fonts');
						this.$el.parents('#icon-set').find('.icons-variants .variant').removeClass('loading');
						appIcons.helpers.observeIconContainers();
					});
				},
				toggleIconSelection: function (event) {
					const
						target = $(event.currentTarget),
						isMultiple = this.controller.states.get('library').get('selection').multiple;

					if (isMultiple === false) {
						this.$el.find('.icon-placeholder.selected').removeClass('selected');
					}
					// All this logic should work only if icon are being seleted now.
					else if (event.shiftKey === true && !target.hasClass('selected')) {
						target.attr('marker', '');
						let start = this.$el.find('.icon-placeholder.selected');
						let forward = this.$el.find('.icon-placeholder.selected').nextAll('[marker]');
						let backward = this.$el.find('.icon-placeholder.selected').prevAll('[marker]');

						if (forward.length > 0) {
							start.nextUntil(forward).addBack(start).addClass('selected');
						}
						if (backward.length > 0) {
							start.prevUntil(backward).addBack(start).addClass('selected');
						}

						target.removeAttr('marker', '');
					}

					target.toggleClass('selected');
					appIcons.helpers.setSelection.call(this);
				},
			}),
			iconLoader: wp.media.View.extend({
				tagName: 'div',
				className: 'icon-loader',
				template: wp.template('icon-loader'),
			}),
			iconsToolbar: wp.media.view.Toolbar.extend({
				initialize: function () {
					_.defaults(this.options, {
						event: 'selectIcon',
						close: false,
						items: {
							selectIcon: {
								text: messiaVars.messages.mediaFrame.iconsButton.text,
								style: 'primary',
								priority: 80,
								requires: false,
								click: (() => this.controller.state().getSelection()),
							}
						}
					});

					wp.media.view.Toolbar.prototype.initialize.apply(this, arguments);
				},
				// called each time the model changes
				refresh: function () {
					var selection = this.controller.state().props.get('selectedIcons');
					this.get('selectIcon').model.set('disabled', selection.length === 0);

					wp.media.view.Toolbar.prototype.refresh.apply(this, arguments);
				},
			}),
		},
		controllers: {
			iconContent: wp.media.controller.State.extend({
				initialize: function () {
					this.props = appIcons.models.icons;
					this.props.on('change:activeSet', this.refreshFontCollection, this);
					this.props.on('change:activeVariant', this.refreshIconSet, this);
					this.props.on('change:selectedIcons', this.refreshToolbar, this);
					this.props.on('reset', this.resetFontCollection, this);
				},
				refreshFontCollection: function () {
					this.trigger('content:render:fontCollection');
				},
				refreshIconSet: function () {
					// Give browser a chance to apply animation.
					setTimeout(() => this.trigger('content:render:iconSet'), 10);
				},
				refreshToolbar: function () {
					this.frame.toolbar.get().refresh();
				},
				getSelection: function () {
					this.frame.trigger('select');
				},
				resetFontCollection: function () {
					this.props.set('selectedIcons', []);
					this.trigger('content:render:iconSet');
				},
			}),
		},
		helpers: {
			/**
			 * Build a new array of selected elements,
			 * keeping the order of iconSet in it.
			 *
			 * @return void
			 */
			setSelection() {

				const
					iconSet = this.model.get('iconSet'),
					activeSet = this.model.get('activeSet'),
					activeVariant = this.model.get('activeVariant'),
					selection = this.model.get('selectedIcons'),
					activeSetData = iconSet.find((element) => element.id === activeSet),
					activeVariantData = activeSetData.variants.find((element) => element.id === activeVariant[activeSet]),
					selectedElements = this.$el.find('.icon-placeholder.selected'),
					selectedPerSet = {};

				// Build selection in same order as fonts set config to save seleсtion order.
				for (let i = 0; i < iconSet.length; i++) {
					if (iconSet[i].id === activeSet) {
						// current set initially empty
						selectedPerSet[iconSet[i].id] = [];
					} else {
						selectedPerSet[iconSet[i].id] = selection.filter(slot => slot.iconSetId === iconSet[i].id);
					}
				}

				let selectedVariant = {
					fontId: activeVariantData.fontId,
					cssClass: activeVariantData.cssClass,
				};

				for (let i = 0; i < selectedElements.length; i++) {
					let el = {
						type: 'icon',
						iconSetId: activeSet,
						icon: $(selectedElements[i]).find('.icon-asset').data('iconid'),
						variant: selectedVariant,
					}
					selectedPerSet[activeSet].push(el);
				}

				let selected = [];

				// Join current selection with other sets.
				for (let fontId in selectedPerSet) {
					selected = selected.concat(selectedPerSet[fontId]);
				}
				this.model.set('selectedIcons', selected);
			},
			/**
			 * Add and remove propper CSS classes on icons,
			 * according to currently active font variants.
			 *
			 * @param object jQuery clicked element.
			 * @param object Current font set.
			 *
			 * @return void
			 */
			setVariantMaterialIcons: function (target, currentSet) {

				const
					activeVariantCurr = this.model.get('activeVariant'),
					activeVariantNew = target.parents('.icons-variants').find('.variant.active').first().data('variantid').toString(), // Only one variant can be active in a moment.
					variants = {};

				for (let variantId in activeVariantCurr) {
					variants[variantId] = activeVariantCurr[variantId];

					if (currentSet.id === variantId) {
						variants[variantId] = activeVariantNew;
					}
				}

				this.model.set('activeVariant', variants);
			},
			loadFonts: async function (iconSet, activeSet, activeVariant, fonts) {

				let fontToLoad = false;

				const
					activeSetData = iconSet.find((element) => element.id === activeSet),
					activeVariantData = activeSetData.variants.find((element) => element.id === activeVariant[activeSet]),
					fontData = fonts.find((element) => element.id === activeVariantData.fontId);

				let load = new Promise((resolve, reject) => {

					let fontSelector = `#${fontData.id}-css`;// ID should match WP assets naming convention.
					if ($(fontSelector).length > 0) {
						return resolve(true);
					}
					fontToLoad = fontData;

					if (fontToLoad) {

						let iconLoaderView = new appIcons.views.iconLoader({
							controller: this.options.controller,
							model: this.options.model,
						});
						iconCollectionView.views.set('#icon-set-items', [iconLoaderView]);

						let stylesheet = $('<link>').attr({ type: 'text/css', rel: 'stylesheet', id: `${fontToLoad.id}-css`, href: fontToLoad.url });// ID should match WP assets naming convention.
						stylesheet.on('load', () => {
							return resolve(true);
						});
						stylesheet.appendTo('body');
					}
					else {
						return resolve(true);
					}
				});

				return load;
			},
			loadIcons: async function (iconSet, activeSet) {

				const activeSetData = iconSet.find((element) => element.id === activeSet);

				if (Object.keys(activeSetData.icons).length > 0) {
					return Promise.resolve(activeSetData.icons);
				}

				let icons = new Promise((resolve, reject) => {

					if (xhr != null) {
						xhr.abort();
						xhr = null;
					}

					xhr = wp.media.ajax({
						type: 'POST',
						url: messiaVars.ajaxUrl,
						data: {
							action: activeSetData.ajaxAction,
							messiaNonce: messiaVars.messiaNonce,
							data: {},
						},
						beforeSend: (jqAjax, Request) => {
							let iconLoaderView = new appIcons.views.iconLoader({
								controller: this.options.controller,
								model: this.options.model,
							});
							iconCollectionView.views.set('#icon-set-items', [iconLoaderView]);
						},
						success: (server) => {
							if (server.code === 200) {
								return resolve(server.icons);
							} else {
								return reject(new Error(server.message));
							}
						},
						error: (MLHttpRequest, textStatus, errorThrown) => {
							if (MLHttpRequest.status === 0 && textStatus == 'abort') {
								return;
							}
							return reject(new Error(messiaVars.messages.mediaFrame.errorSetLoad));
						},
						complete: function (server, textStatus, MLHttpRequest) {
							xhr = null;
						},
					});
				});

				return icons;
			},
			/**
			 * Create IntersectionObserver for containers with icons.
			 *
			 * @return void
			 */
			observeIconContainers: function () {

				var icons = $('.icons-collection #icon-set .icons-grid .icon-placeholder.wow');

				if (icons.length === 0 || typeof icons === 'undefined') {
					return;
				}

				if (!window.IntersectionObserver) {
					icons.removeClass('wow');
					return;
				}

				let options = {
					root: null,
					rootMargin: '0px',
					threshold: [0.2],
					// delay: 100,
					// trackVisibility: true, // very expensive
				}

				let observer = new IntersectionObserver(appIcons.helpers.iconVisible, options);

				for (let i = 0; i < icons.length; i++) {

					const icon = icons[i];

					if (icon.classList.contains('animate')) {
						continue;
					}
					observer.observe(icon);
				}
			},
			/**
			 * Callback for IntersectionObserver
			 *
			 * @param {[IntersectionObserverEntry]} cards    Observing HTML elements
			 * @param {IntersectionObserver}        observer Instance of IntersectionObserver
			 *
			 * @return void
			 */
			iconVisible: function (icons, observer) {

				for (let i = 0; i < icons.length; i++) {

					const cardContainer = icons[i];

					if (cardContainer.intersectionRatio > 0) {

						var delay = Math.random() * 2 * 100;
						// scroll down
						setTimeout(() => {
							cardContainer.target.classList.add('animate', 'scale');
						}, delay);

						observer.unobserve(cardContainer.target);
					}
				}
			},
		}
	};

	wp.media.view.MediaFrame.Select = currentMediaFrame.extend({
		initialize: function (frame) {

			_.defaults(this.options, {
				state: 'library'
			});

			currentMediaFrame.prototype.initialize.apply(this, arguments);
			appIcons.init.call(this);
		},
		renderFontCollection: function () {
			// this view has no router
			this.$el.addClass('hide-router');

			iconCollectionView = new appIcons.views.iconCollection({
				controller: this,
				model: this.states.get('fontCollection').props,
			});
			this.content.set([iconCollectionView]);
		},
		renderIconSet: function () {
			iconSetView = new appIcons.views.iconSet({
				controller: this,
				model: this.states.get('fontCollection').props,
			});
			iconSetView.options.assetsReady.then((state) => iconCollectionView.views.set('#icon-set-items', [iconSetView]));
		},
		createIconsToolbar: function (toolbar) {
			toolbar.view = new wp.media.view.Toolbar.Icons({
				controller: this
			});
		},
		createWPToolbar: function (toolbar) {
			// otherwis WP lost title on a button in toolbar.
			delete this.options.button.items;
		},
	});

	// Accepts an optional object hash to override default values.
	frame = new wp.media({
		// Modal title
		frame: 'select',
		title: messiaVars.messages.mediaFrame.imagesTitle,
		button: {
			text: messiaVars.messages.mediaFrame.imagesButton.text
		},
		// Enable/disable icon fonts controller
		iconFonts: messiaVars.mediaFrame.iconFonts,
		// Enable/disable multiple select
		multiple: getCaller($(this)).hasClass('multiple'),
		// Library WordPress query arguments.
		library: {
			order: 'DESC',

			// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
			// 'id', 'post__in', 'menuOrder' ]
			orderby: 'date',

			// mime type. e.g. 'image', 'image/jpeg'
			type: 'image',

			// Searches the attachment title.
			search: null,

			// Attached to a specific post (ID).
			uploadedTo: null
		},
	});

	// Fires when the modal opens (becomes visible).
	// @see media.view.Modal.open()
	frame.on('open', function () {

		const
			target = $(event.target),
			caller = getCaller(target),
			imageinfo = caller.data('imageinfo');

		$(this).data('caller', caller);
		frame.states.get('library').get('selection').multiple = caller.hasClass('multiple');
		//frame.state().get('selection').multiple = caller.hasClass('multiple');

		// library.comparator = comparator; not clear how it works

		if ('undefined' !== typeof imageinfo) {
			switch (imageinfo.type) {
				case 'wp-image':
					frame.setState('library');

					const
						library = frame.state().get('library'),
						selection = frame.state().get('selection');

					let attachment = wp.media.attachment(imageinfo.id);
					attachment.fetch();
					library.add(attachment);
					selection.add(attachment);
					break;

				case 'icon':

					switch (imageinfo.iconSetId) {
						case 'google-material':
							frame.setState('fontCollection');

							let model = frame.state().get('fontCollection');
							let activeVariant = Object.assign(model.get('activeVariant')); // clone it.

							let activeSetData = model.get('iconSet').find((element) => element.id === imageinfo.iconSetId);
							let activeVariantData = activeSetData.variants.find((element) => element.fontId === imageinfo.variant.fontId);

							activeVariant[imageinfo.iconSetId] = activeVariantData.id;

							model.set('activeSet', imageinfo.iconSetId, { silent: true });
							model.set('activeVariant', activeVariant, { silent: true });
							model.set('selectedIcons', [imageinfo], { silent: true });
							model.trigger('change:selectedIcons');
							frame.trigger('content:render:fontCollection');
							break;

						default:
							console.error(new Error(`Unknown icon set id: ${imageinfo.fontId}`));
							break;
					}
					break;

				default:
					console.error(new Error(`Unknown image type: ${imageinfo.type}`));
			}
		}
	});

	// Fires when a user has selected attachment(s) and clicked the select button.
	// @see media.view.MediaFrame.Post.mainInsertToolbar()
	frame.on('select', function () {

		var stateId = frame.state().get('id');

		if (stateId === 'fontCollection') {

			let selectionCollection = this.get('fontCollection').props.get('selectedIcons'); // setted in 'appIcons.helpers.setSelection'

			this.get('fontCollection').props.trigger('reset');
			this.get('library').frame.close();

			onSelect($(this).data('caller'), selectionCollection);
		} else {

			let selectionCollection = frame.state().get('selection');

			let selected = selectionCollection.models.map((model) => {
				return {
					type: 'wp-image',
					id: model.attributes.id,
					url: model.attributes.url,
				}
			});

			onSelect($(this).data('caller'), selected);
		}
	});

	// Fires after the frame markup has been built, but not appended to the DOM.
	// @see wp.media.view.Modal.attach()
	// frame.on( 'ready', function() {} );

	// Fires when the frame's $el is appended to its DOM container.
	// @see media.view.Modal.attach()
	// frame.on( 'attach', function() {} );

	// Fires when the modal closes via the escape key.
	// @see media.view.Modal.close()
	// frame.on( 'escape', function() {} );

	// Fires when the modal closes.
	// @see media.view.Modal.close()
	// frame.on( 'close', function() { } );

	// Fires when a state activates.
	// frame.on( 'activate', function() {} );

	// Fires when a mode is deactivated on a region.
	// frame.on( '{region}:deactivate', function() {} );

	// and a more specific event including the mode.
	// frame.on( '{region}:deactivate:{mode}', function() {} );

	// Fires when a region is ready for its view to be created.
	// frame.on( '{region}:create', function() {} );

	// and a more specific event including the mode.
	// frame.on( '{region}:create:{mode}', function() {} );

	// Fires when a region is ready for its view to be rendered.
	// frame.on( '{region}:render', function() {} );

	// and a more specific event including the mode.
	// frame.on( '{region}:render:{mode}', function() {} );

	// Fires when a new mode is activated (after it has been rendered) on a region.
	// frame.on( '{region}:activate', function() {} );

	// and a more specific event including the mode.
	// frame.on( '{region}:activate:{mode}', function() {} );

	// Get an object representing the current state.
	// frame.state();

	// Get an object representing the previous state.
	// frame.lastState();

	// Open the modal.
	messiaVars.mediaFrame.model = frame;
	frame.open();
};

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
/*!********************************************!*\
  !*** ./src/entries/backend/entry-media.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_media_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/media.scss */ "./src/scss/_backend/media.scss");
/* harmony import */ var _js_backend_media_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/media.js */ "./src/js/_backend/media.js");
/* harmony import */ var _js_backend_media_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_media_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxnQkFBZ0IsT0FBTyxTQUFTLEtBQUssaUJBQWlCOztBQUV0RDtBQUNBLGdCQUFnQixPQUFPLDBCQUEwQjs7QUFFakQ7QUFDQSxnQkFBZ0IsT0FBTyxXQUFXLEtBQUssaUJBQWlCOztBQUV4RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQy95QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDd0M7O0FBRXhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvX2JhY2tlbmQvbWVkaWEuc2Nzcz9iMjkxIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fYmFja2VuZC9tZWRpYS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9lbnRyeS1tZWRpYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJqUXVlcnkuZm4ubWVzc2lhTWVkaWFTZWxlY3RvciA9IGZ1bmN0aW9uIChvblNlbGVjdCkge1xuXG5cdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG5cdHZhciAkID0galF1ZXJ5Lm5vQ29uZmxpY3QoKSxcblx0XHR4aHIgPSBudWxsLFxuXHRcdGZyYW1lID0gbWVzc2lhVmFycy5tZWRpYUZyYW1lLFxuXHRcdGN1cnJlbnRNZWRpYUZyYW1lID0gd3AubWVkaWEudmlldy5NZWRpYUZyYW1lLlNlbGVjdCxcblx0XHRpY29uQ29sbGVjdGlvblZpZXcsXG5cdFx0aWNvblNldFZpZXc7XG5cblx0Y29uc3QgZ2V0Q2FsbGVyID0gZnVuY3Rpb24gKHRhcmdldCkge1xuXHRcdHJldHVybiB0YXJnZXQucGFyZW50cygnLmljb24nKTtcblx0fVxuXG5cdGlmIChmYWxzZSAhPT0gZnJhbWUubW9kZWwpIHtcblx0XHRmcmFtZS5tb2RlbC5vcGVuKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgY29tcGFyYXRvciA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cblx0XHR2YXIgYUluUXVlcnkgPSAhIXRoaXMubWlycm9yaW5nLmdldChhLmNpZCksXG5cdFx0XHRiSW5RdWVyeSA9ICEhdGhpcy5taXJyb3JpbmcuZ2V0KGIuY2lkKTtcblxuXHRcdGlmICghYUluUXVlcnkgJiYgYkluUXVlcnkpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoYUluUXVlcnkgJiYgIWJJblF1ZXJ5KSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdH07XG5cblx0dmFyIGFwcEljb25zID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pY29uRm9udHMgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdHdwLm1lZGlhLmNvbnRyb2xsZXIuaWNvbkNvbnRlbnQgPSBhcHBJY29ucy5jb250cm9sbGVycy5pY29uQ29udGVudDtcblx0XHRcdHdwLm1lZGlhLnZpZXcuVG9vbGJhci5JY29ucyA9IGFwcEljb25zLnZpZXdzLmljb25zVG9vbGJhcjtcblxuXHRcdFx0dGhpcy5zdGF0ZXMuYWRkKFtcblx0XHRcdFx0bmV3IHdwLm1lZGlhLmNvbnRyb2xsZXIuaWNvbkNvbnRlbnQoe1xuXHRcdFx0XHRcdGlkOiAnZm9udENvbGxlY3Rpb24nLFxuXHRcdFx0XHRcdHRpdGxlOiBtZXNzaWFWYXJzLm1lc3NhZ2VzLm1lZGlhRnJhbWUuaWNvbnNUaXRsZSxcblx0XHRcdFx0XHRjb250ZW50OiAnZm9udENvbGxlY3Rpb24nLFxuXHRcdFx0XHRcdGZvbnRDb2xsZWN0aW9uOiBhcHBJY29ucy5tb2RlbHMuaWNvbnMsXG5cdFx0XHRcdFx0bWVudTogJ2RlZmF1bHQnLCAvLyBtZW51IGV2ZW50ID0gbWVudTpyZW5kZXI6ZGVmYXVsdFxuXHRcdFx0XHRcdC8vIHJvdXRlcjogJ2Jyb3dzZScsXG5cdFx0XHRcdFx0dG9vbGJhcjogJ2ljb25zLXNlbGVjdCcsIC8vIHRvb2xiYXIgZXZlbnQgPSB0b29sYmFyOmNyZWF0ZTppY29ucy1zZWxlY3Rcblx0XHRcdFx0XHRwcmlvcml0eTogMjAsXG5cdFx0XHRcdFx0dHlwZTogJ2xpbmsnLFxuXHRcdFx0XHRcdC8vIHNlYXJjaGFibGU6IHRydWUsXG5cdFx0XHRcdFx0Ly8gZmlsdGVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0Ly8gc29ydGFibGU6IHRydWUsXG5cdFx0XHRcdFx0Ly8gYXV0b1NlbGVjdDogdHJ1ZSxcblx0XHRcdFx0XHQvLyBkZXNjcmliZTogZmFsc2UsXG5cdFx0XHRcdFx0Ly8gY29udGVudFVzZXJTZXR0aW5nOiB0cnVlLFxuXHRcdFx0XHRcdC8vIHN5bmNTZWxlY3Rpb246IHRydWUsXG5cdFx0XHRcdFx0c2VsZWN0aW9uOiB0aGlzLm9wdGlvbnMuc2VsZWN0aW9uLCAvLyByZXF1aXJlZCBqdXN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggV1AuXG5cdFx0XHRcdH0pLFxuXHRcdFx0XSk7XG5cdFx0XHR0aGlzLm9uKCdjb250ZW50OnJlbmRlcjpmb250Q29sbGVjdGlvbicsIHRoaXMucmVuZGVyRm9udENvbGxlY3Rpb24sIHRoaXMpO1xuXHRcdFx0dGhpcy5vbignY29udGVudDpyZW5kZXI6aWNvblNldCcsIHRoaXMucmVuZGVySWNvblNldCwgdGhpcyk7XG5cdFx0XHR0aGlzLm9uKCd0b29sYmFyOmNyZWF0ZTppY29ucy1zZWxlY3QnLCB0aGlzLmNyZWF0ZUljb25zVG9vbGJhciwgdGhpcyk7XG5cdFx0XHR0aGlzLm9uKCd0b29sYmFyOmNyZWF0ZTpzZWxlY3QnLCB0aGlzLmNyZWF0ZVdQVG9vbGJhciwgdGhpcyk7XG5cdFx0fSxcblx0XHRtb2RlbHM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogaWQ6IGlJbm5lciBpZGVudGlmaWNhdG9yLlxuXHRcdFx0ICogbmFtZTogVGFiIHRpdGxlLlxuXHRcdFx0ICogZm9udHM6XG5cdFx0XHQgKiAgICBpZDogPGxpbms+IGF0dHJpYnV0ZSB0byBzZWFyY2ggZm9udCBpbiBET00gYnkuXG5cdFx0XHQgKiAgICB1cmw6IDxsaW5rPiBhdHRyaWJ1dGUgdG8gbG9hZCBmb250IGJ5LlxuXHRcdFx0ICogYWpheEFjdGlvbjogV1AgaG9vayBuYW1lIHRvIGdldCBpY29ucyBmcm9tLlxuXHRcdFx0ICogaWNvbnM6IGljb25zIGNvbGxlY3Rpb24gdGhhdCB3aWxsIGJlIGZpbGxlZCBieSBhamF4IGNhbGwuXG5cdFx0XHQgKi9cblx0XHRcdGljb25zOiBuZXcgQmFja2JvbmUuTW9kZWwoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpY29uU2V0OiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkOiAnZ29vZ2xlLW1hdGVyaWFsJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogbWVzc2lhVmFycy5tZXNzYWdlcy5tZWRpYUZyYW1lLm1hdGVyaWFsVGFiLFxuXHRcdFx0XHRcdFx0XHR2YXJpYW50czogW1xuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGlkOiAnMDEnLFxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9udElkOiAnZ29vZ2xlLW1hdGVyaWFsLWljb25zJyxcblx0XHRcdFx0XHRcdFx0XHRcdGNzc0NsYXNzOiBbJ21hdGVyaWFsLWljb25zJ10sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogJ0ZpbGxlZCcsXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZDogJzAyJyxcblx0XHRcdFx0XHRcdFx0XHRcdGZvbnRJZDogJ2dvb2dsZS1tYXRlcmlhbC1pY29ucy1vdXRsaW5lZCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRjc3NDbGFzczogWydtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCddLFxuXHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6ICdPdXRsaW5lZCcsXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZDogJzAzJyxcblx0XHRcdFx0XHRcdFx0XHRcdGZvbnRJZDogJ2dvb2dsZS1tYXRlcmlhbC1pY29ucy1yb3VuZGVkJyxcblx0XHRcdFx0XHRcdFx0XHRcdGNzc0NsYXNzOiBbJ21hdGVyaWFsLWljb25zLXJvdW5kJ10sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogJ1JvdW5kZWQnLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0aWQ6ICcwNCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRmb250SWQ6ICdnb29nbGUtbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUnLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3NzQ2xhc3M6IFsnbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUnXSxcblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiAnVHdvIFRvbmUnLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0aWQ6ICcwNScsXG5cdFx0XHRcdFx0XHRcdFx0XHRmb250SWQ6ICdnb29nbGUtbWF0ZXJpYWwtaWNvbnMtc2hhcnAnLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3NzQ2xhc3M6IFsnbWF0ZXJpYWwtaWNvbnMtc2hhcnAnXSxcblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiAnU2hhcnAnLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRDYWxsYmFjazogJ3NldFZhcmlhbnRNYXRlcmlhbEljb25zJyxcblx0XHRcdFx0XHRcdFx0YWpheEFjdGlvbjogJ2dldF9tYXRlcmlhbF9pY29ucycsXG5cdFx0XHRcdFx0XHRcdGljb25zOiB7fSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBpZDogICBpY29uU2V0LnZhcmlhbnRzLmZvbnRJZCAtIGVhY2ggZm9udElkIHNob3VkIGJlIHNldHRlZCBpbiBmb250cyxcblx0XHRcdFx0XHQgKiAgICAgICBpdCB3aWxsIGJlIElEIGF0dHIgb2YgRE9NIGVsZW1lbnQsIHRvIHNlYXJjaCBmb250IGJ5LiBVbmRlciB0aGlzIHNhbWUgbmFtZVxuXHRcdFx0XHRcdCAqICAgICAgIHN0eWxlcyBleHBlY3RlZCB0byBiZSByZWdpc3RlcmVkIGluIGJhY2tlbmQuXG5cdFx0XHRcdFx0ICogbmFtZTogcHVibGljIG5hbWUgdXNlZCBpbiBicm93c2VyLlxuXHRcdFx0XHRcdCAqIHVybDogIHJlbW90ZSBmb250IGhvc3QuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm9udHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQ6ICdnb29nbGUtbWF0ZXJpYWwtaWNvbnMnLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiAnTWF0ZXJpYWwgSWNvbnMnLFxuXHRcdFx0XHRcdFx0XHR1cmw6ICdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zJyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkOiAnZ29vZ2xlLW1hdGVyaWFsLWljb25zLW91dGxpbmVkJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogJ01hdGVyaWFsIEljb25zIE91dGxpbmVkJyxcblx0XHRcdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucytPdXRsaW5lZCcsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZDogJ2dvb2dsZS1tYXRlcmlhbC1pY29ucy1yb3VuZGVkJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogJ01hdGVyaWFsIEljb25zIFJvdW5kJyxcblx0XHRcdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucytSb3VuZCcsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZDogJ2dvb2dsZS1tYXRlcmlhbC1pY29ucy10d28tdG9uZScsXG5cdFx0XHRcdFx0XHRcdG5hbWU6ICdNYXRlcmlhbCBJY29ucyBUd28gVG9uZScsXG5cdFx0XHRcdFx0XHRcdHVybDogJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMrVHdvK1RvbmUnLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQ6ICdnb29nbGUtbWF0ZXJpYWwtaWNvbnMtc2hhcnAnLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiAnTWF0ZXJpYWwgSWNvbnMgU2hhcnAnLFxuXHRcdFx0XHRcdFx0XHR1cmw6ICdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zK1NoYXJwJyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRhY3RpdmVTZXQ6ICdnb29nbGUtbWF0ZXJpYWwnLFxuXHRcdFx0XHRcdC8vIGljb25TZXQgSUQgPT4gdmFyaWFudCBJRFxuXHRcdFx0XHRcdGFjdGl2ZVZhcmlhbnQ6IHtcblx0XHRcdFx0XHRcdCdnb29nbGUtbWF0ZXJpYWwnOiAnMDInLFxuXHRcdFx0XHRcdFx0J3Rlc3RfdmFyaWFudCc6ICcwMScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZWxlY3RlZEljb25zOiBbXSxcblx0XHRcdFx0fSxcblx0XHRcdCksXG5cdFx0fSxcblx0XHR2aWV3czoge1xuXHRcdFx0aWNvbkNvbGxlY3Rpb246IHdwLm1lZGlhLlZpZXcuZXh0ZW5kKHtcblx0XHRcdFx0dGFnTmFtZTogJ2RpdicsXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2ljb25zLWNvbGxlY3Rpb24td3JhcHBlcicsXG5cdFx0XHRcdHRlbXBsYXRlOiB3cC50ZW1wbGF0ZSgnaWNvbi1jb2xsZWN0aW9uJyksXG5cdFx0XHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuaWNvblNldCA9IHRoaXMubW9kZWwuZ2V0KCdpY29uU2V0Jyk7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmFjdGl2ZVNldCA9IHRoaXMubW9kZWwuZ2V0KCdhY3RpdmVTZXQnKTtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuYWN0aXZlVmFyaWFudCA9IHRoaXMubW9kZWwuZ2V0KCdhY3RpdmVWYXJpYW50Jyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRcdCdjbGljayAudG9nZ2xlLWljb25zZXQnOiAndG9nZ2xlSWNvblNldCcsXG5cdFx0XHRcdFx0J2NsaWNrIC5pY29ucy12YXJpYW50cyAudmFyaWFudCc6ICd0b2dnbGVJY29uVmFyaWFudCcsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gR2l2ZSBicm93c2VyIGEgY2hhbmNlIHRvIHJlbmRlciB0YWJzLlxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmNvbnRyb2xsZXIudHJpZ2dlcignY29udGVudDpyZW5kZXI6aWNvblNldCcpIH0sIDEwKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0dG9nZ2xlSWNvblNldDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgbmV3U2V0SWQgPSAkKGV2ZW50LnRhcmdldCkuZGF0YSgnc2V0aWQnKVxuXHRcdFx0XHRcdHRoaXMubW9kZWwuc2V0KCdhY3RpdmVTZXQnLCBuZXdTZXRJZCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRvZ2dsZUljb25WYXJpYW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuXHRcdFx0XHRcdFx0Y3VycmVudFNldElkID0gdGFyZ2V0LnBhcmVudHMoJyNpY29uLXNldCcpLmRhdGEoJ3NldGlkJyksXG5cdFx0XHRcdFx0XHRpY29uU2V0ID0gdGhpcy5tb2RlbC5nZXQoJ2ljb25TZXQnKSxcblx0XHRcdFx0XHRcdGFjdGl2ZVZhcmlhbnQgPSB0aGlzLm1vZGVsLmdldCgnYWN0aXZlVmFyaWFudCcpLFxuXHRcdFx0XHRcdFx0Y3VycmVudFNldCA9IGljb25TZXQuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gY3VycmVudFNldElkKTtcblxuXHRcdFx0XHRcdC8vIENsaWNrIG9uIGN1cnJlbnRseSBhY3RpdmUgdmFyaWFudC5cblx0XHRcdFx0XHRpZiAoYWN0aXZlVmFyaWFudFtjdXJyZW50U2V0SWRdID09PSB0YXJnZXQuZGF0YSgndmFyaWFudGlkJykpIHJldHVybjtcblxuXHRcdFx0XHRcdC8vIE9ubHkgb25lIHZhcmlhbnQgY2FuIGJlIGFjdGl2ZSBpbiBhIG1vbWVudC5cblx0XHRcdFx0XHR0YXJnZXQucGFyZW50cygnLmljb25zLXZhcmlhbnRzJykuZmluZCgnLnZhcmlhbnQnKS5yZW1vdmVDbGFzcyhbJ2J1dHRvbi1wcmltYXJ5JywgJ2FjdGl2ZScsICdsb2FkaW5nJ10pO1xuXHRcdFx0XHRcdHRhcmdldC50b2dnbGVDbGFzcyhbJ2J1dHRvbi1wcmltYXJ5JywgJ2FjdGl2ZScsICdsb2FkaW5nJ10pO1xuXG5cdFx0XHRcdFx0YXBwSWNvbnMuaGVscGVyc1tjdXJyZW50U2V0LnZhcmlhbnRDYWxsYmFja10uY2FsbCh0aGlzLCB0YXJnZXQsIGN1cnJlbnRTZXQpXG5cdFx0XHRcdFx0YXBwSWNvbnMuaGVscGVycy5zZXRTZWxlY3Rpb24uY2FsbCh0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSksXG5cdFx0XHRpY29uU2V0OiB3cC5tZWRpYS5WaWV3LmV4dGVuZCh7XG5cdFx0XHRcdHRhZ05hbWU6ICdkaXYnLFxuXHRcdFx0XHRjbGFzc05hbWU6ICdpY29ucy1ncmlkJyxcblx0XHRcdFx0aW5pdGlhbGl6ZTogYXN5bmMgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0dGhpcy5mb250VG9Mb2FkID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmZvbnRzID0gZm9udHMgPSB0aGlzLm1vZGVsLmdldCgnZm9udHMnKTtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuaWNvblNldCA9IGljb25TZXQgPSB0aGlzLm1vZGVsLmdldCgnaWNvblNldCcpO1xuXHRcdFx0XHRcdHRoaXMub3B0aW9ucy5hY3RpdmVTZXQgPSBhY3RpdmVTZXQgPSB0aGlzLm1vZGVsLmdldCgnYWN0aXZlU2V0Jyk7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmFjdGl2ZVZhcmlhbnQgPSBhY3RpdmVWYXJpYW50ID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZVZhcmlhbnQnKTtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuc2VsZWN0ZWRJY29ucyA9IHNlbGVjdGVkSWNvbnMgPSB0aGlzLm1vZGVsLmdldCgnc2VsZWN0ZWRJY29ucycpO1xuXG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmFzc2V0c1JlYWR5ID0gUHJvbWlzZVxuXHRcdFx0XHRcdFx0LmFsbChbXG5cdFx0XHRcdFx0XHRcdGFwcEljb25zLmhlbHBlcnMubG9hZEZvbnRzLmNhbGwodGhpcywgaWNvblNldCwgYWN0aXZlU2V0LCBhY3RpdmVWYXJpYW50LCBmb250cyksXG5cdFx0XHRcdFx0XHRcdGFwcEljb25zLmhlbHBlcnMubG9hZEljb25zLmNhbGwodGhpcywgaWNvblNldCwgYWN0aXZlU2V0KSxcblx0XHRcdFx0XHRcdF0pXG5cdFx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGljb25TZXQubWFwKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQuaWQgPT09IGFjdGl2ZVNldCkgZWxlbWVudC5pY29ucyA9IHJlc3VsdFsxXTsgLy8gbG9hZEljb25zKCkgcHJvbWlzZSByZXN1bHQuXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy50ZW1wbGF0ZSA9ICdpY29uLXNldC1pdGVtcyc7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogZXJyb3IubWVzc2FnZSxcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci5lcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy50ZW1wbGF0ZSA9ICdpY29uLWVycm9yJztcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBhd2FpdCB0aGlzLm9wdGlvbnMuYXNzZXRzUmVhZHk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRcdCdjbGljayAuaWNvbi1wbGFjZWhvbGRlcic6ICd0b2dnbGVJY29uU2VsZWN0aW9uJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuZm9udHMgJiYgd2luZG93WydGb250RmFjZSddKSB7XG5cblx0XHRcdFx0XHRcdGxldCB3YWl0Rm9udHMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZVNldERhdGEgPSB0aGlzLm9wdGlvbnMuaWNvblNldC5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50LmlkID09PSBhY3RpdmVTZXQpLFxuXHRcdFx0XHRcdFx0XHRhY3RpdmVWYXJpYW50RGF0YSA9IGFjdGl2ZVNldERhdGEudmFyaWFudHMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gdGhpcy5vcHRpb25zLmFjdGl2ZVZhcmlhbnRbYWN0aXZlU2V0XSksXG5cdFx0XHRcdFx0XHRcdGZvbnREYXRhID0gdGhpcy5vcHRpb25zLmZvbnRzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQuaWQgPT09IGFjdGl2ZVZhcmlhbnREYXRhLmZvbnRJZCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9udFRvTG9hZCA9IGZvbnREYXRhLm5hbWU7XG5cdFx0XHRcdFx0XHR3YWl0Rm9udHMgPSAhZG9jdW1lbnQuZm9udHMuY2hlY2soYDFweCAke3RoaXMuZm9udFRvTG9hZH1gKTsvLyBDaHJvbWUgdW5sb2FkcyBub24tdXNlZCBmb250cyBhbmQgaSBkb24ndCBrbm93IGZvciBub3cgd2h5LlxuXG5cdFx0XHRcdFx0XHRpZiAod2FpdEZvbnRzKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuJGVsLmFkZENsYXNzKCdhcHBseWluZy1mb250cycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbC5hZGRDbGFzcygnYXBwbHlpbmctZm9udHMnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZXQgdGVtcGxhdGUgPSB3cC50ZW1wbGF0ZSh0aGlzLm9wdGlvbnMudGVtcGxhdGUpO1xuXHRcdFx0XHRcdHRoaXMuJGVsLmh0bWwodGVtcGxhdGUodGhpcy5vcHRpb25zKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuZm9udHMucmVhZHkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbC5yZW1vdmVDbGFzcygnYXBwbHlpbmctZm9udHMnKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsLnBhcmVudHMoJyNpY29uLXNldCcpLmZpbmQoJy5pY29ucy12YXJpYW50cyAudmFyaWFudCcpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHRcdFx0XHRhcHBJY29ucy5oZWxwZXJzLm9ic2VydmVJY29uQ29udGFpbmVycygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0b2dnbGVJY29uU2VsZWN0aW9uOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0dGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KSxcblx0XHRcdFx0XHRcdGlzTXVsdGlwbGUgPSB0aGlzLmNvbnRyb2xsZXIuc3RhdGVzLmdldCgnbGlicmFyeScpLmdldCgnc2VsZWN0aW9uJykubXVsdGlwbGU7XG5cblx0XHRcdFx0XHRpZiAoaXNNdWx0aXBsZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHRoaXMuJGVsLmZpbmQoJy5pY29uLXBsYWNlaG9sZGVyLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIEFsbCB0aGlzIGxvZ2ljIHNob3VsZCB3b3JrIG9ubHkgaWYgaWNvbiBhcmUgYmVpbmcgc2VsZXRlZCBub3cuXG5cdFx0XHRcdFx0ZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkgPT09IHRydWUgJiYgIXRhcmdldC5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmF0dHIoJ21hcmtlcicsICcnKTtcblx0XHRcdFx0XHRcdGxldCBzdGFydCA9IHRoaXMuJGVsLmZpbmQoJy5pY29uLXBsYWNlaG9sZGVyLnNlbGVjdGVkJyk7XG5cdFx0XHRcdFx0XHRsZXQgZm9yd2FyZCA9IHRoaXMuJGVsLmZpbmQoJy5pY29uLXBsYWNlaG9sZGVyLnNlbGVjdGVkJykubmV4dEFsbCgnW21hcmtlcl0nKTtcblx0XHRcdFx0XHRcdGxldCBiYWNrd2FyZCA9IHRoaXMuJGVsLmZpbmQoJy5pY29uLXBsYWNlaG9sZGVyLnNlbGVjdGVkJykucHJldkFsbCgnW21hcmtlcl0nKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZvcndhcmQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRzdGFydC5uZXh0VW50aWwoZm9yd2FyZCkuYWRkQmFjayhzdGFydCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoYmFja3dhcmQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRzdGFydC5wcmV2VW50aWwoYmFja3dhcmQpLmFkZEJhY2soc3RhcnQpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlQXR0cignbWFya2VyJywgJycpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRhcmdldC50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcblx0XHRcdFx0XHRhcHBJY29ucy5oZWxwZXJzLnNldFNlbGVjdGlvbi5jYWxsKHRoaXMpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0XHRpY29uTG9hZGVyOiB3cC5tZWRpYS5WaWV3LmV4dGVuZCh7XG5cdFx0XHRcdHRhZ05hbWU6ICdkaXYnLFxuXHRcdFx0XHRjbGFzc05hbWU6ICdpY29uLWxvYWRlcicsXG5cdFx0XHRcdHRlbXBsYXRlOiB3cC50ZW1wbGF0ZSgnaWNvbi1sb2FkZXInKSxcblx0XHRcdH0pLFxuXHRcdFx0aWNvbnNUb29sYmFyOiB3cC5tZWRpYS52aWV3LlRvb2xiYXIuZXh0ZW5kKHtcblx0XHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF8uZGVmYXVsdHModGhpcy5vcHRpb25zLCB7XG5cdFx0XHRcdFx0XHRldmVudDogJ3NlbGVjdEljb24nLFxuXHRcdFx0XHRcdFx0Y2xvc2U6IGZhbHNlLFxuXHRcdFx0XHRcdFx0aXRlbXM6IHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0SWNvbjoge1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6IG1lc3NpYVZhcnMubWVzc2FnZXMubWVkaWFGcmFtZS5pY29uc0J1dHRvbi50ZXh0LFxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlOiAncHJpbWFyeScsXG5cdFx0XHRcdFx0XHRcdFx0cHJpb3JpdHk6IDgwLFxuXHRcdFx0XHRcdFx0XHRcdHJlcXVpcmVzOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRjbGljazogKCgpID0+IHRoaXMuY29udHJvbGxlci5zdGF0ZSgpLmdldFNlbGVjdGlvbigpKSxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0d3AubWVkaWEudmlldy5Ub29sYmFyLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIGNhbGxlZCBlYWNoIHRpbWUgdGhlIG1vZGVsIGNoYW5nZXNcblx0XHRcdFx0cmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBzZWxlY3Rpb24gPSB0aGlzLmNvbnRyb2xsZXIuc3RhdGUoKS5wcm9wcy5nZXQoJ3NlbGVjdGVkSWNvbnMnKTtcblx0XHRcdFx0XHR0aGlzLmdldCgnc2VsZWN0SWNvbicpLm1vZGVsLnNldCgnZGlzYWJsZWQnLCBzZWxlY3Rpb24ubGVuZ3RoID09PSAwKTtcblxuXHRcdFx0XHRcdHdwLm1lZGlhLnZpZXcuVG9vbGJhci5wcm90b3R5cGUucmVmcmVzaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0fSxcblx0XHRjb250cm9sbGVyczoge1xuXHRcdFx0aWNvbkNvbnRlbnQ6IHdwLm1lZGlhLmNvbnRyb2xsZXIuU3RhdGUuZXh0ZW5kKHtcblx0XHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMucHJvcHMgPSBhcHBJY29ucy5tb2RlbHMuaWNvbnM7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbignY2hhbmdlOmFjdGl2ZVNldCcsIHRoaXMucmVmcmVzaEZvbnRDb2xsZWN0aW9uLCB0aGlzKTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uKCdjaGFuZ2U6YWN0aXZlVmFyaWFudCcsIHRoaXMucmVmcmVzaEljb25TZXQsIHRoaXMpO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMub24oJ2NoYW5nZTpzZWxlY3RlZEljb25zJywgdGhpcy5yZWZyZXNoVG9vbGJhciwgdGhpcyk7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbigncmVzZXQnLCB0aGlzLnJlc2V0Rm9udENvbGxlY3Rpb24sIHRoaXMpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZWZyZXNoRm9udENvbGxlY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NvbnRlbnQ6cmVuZGVyOmZvbnRDb2xsZWN0aW9uJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlZnJlc2hJY29uU2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gR2l2ZSBicm93c2VyIGEgY2hhbmNlIHRvIGFwcGx5IGFuaW1hdGlvbi5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJpZ2dlcignY29udGVudDpyZW5kZXI6aWNvblNldCcpLCAxMCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlZnJlc2hUb29sYmFyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy5mcmFtZS50b29sYmFyLmdldCgpLnJlZnJlc2goKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Z2V0U2VsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy5mcmFtZS50cmlnZ2VyKCdzZWxlY3QnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVzZXRGb250Q29sbGVjdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuc2V0KCdzZWxlY3RlZEljb25zJywgW10pO1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignY29udGVudDpyZW5kZXI6aWNvblNldCcpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0fSxcblx0XHRoZWxwZXJzOiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEJ1aWxkIGEgbmV3IGFycmF5IG9mIHNlbGVjdGVkIGVsZW1lbnRzLFxuXHRcdFx0ICoga2VlcGluZyB0aGUgb3JkZXIgb2YgaWNvblNldCBpbiBpdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0c2V0U2VsZWN0aW9uKCkge1xuXG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0aWNvblNldCA9IHRoaXMubW9kZWwuZ2V0KCdpY29uU2V0JyksXG5cdFx0XHRcdFx0YWN0aXZlU2V0ID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZVNldCcpLFxuXHRcdFx0XHRcdGFjdGl2ZVZhcmlhbnQgPSB0aGlzLm1vZGVsLmdldCgnYWN0aXZlVmFyaWFudCcpLFxuXHRcdFx0XHRcdHNlbGVjdGlvbiA9IHRoaXMubW9kZWwuZ2V0KCdzZWxlY3RlZEljb25zJyksXG5cdFx0XHRcdFx0YWN0aXZlU2V0RGF0YSA9IGljb25TZXQuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gYWN0aXZlU2V0KSxcblx0XHRcdFx0XHRhY3RpdmVWYXJpYW50RGF0YSA9IGFjdGl2ZVNldERhdGEudmFyaWFudHMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gYWN0aXZlVmFyaWFudFthY3RpdmVTZXRdKSxcblx0XHRcdFx0XHRzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy4kZWwuZmluZCgnLmljb24tcGxhY2Vob2xkZXIuc2VsZWN0ZWQnKSxcblx0XHRcdFx0XHRzZWxlY3RlZFBlclNldCA9IHt9O1xuXG5cdFx0XHRcdC8vIEJ1aWxkIHNlbGVjdGlvbiBpbiBzYW1lIG9yZGVyIGFzIGZvbnRzIHNldCBjb25maWcgdG8gc2F2ZSBzZWxl0YF0aW9uIG9yZGVyLlxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGljb25TZXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaWNvblNldFtpXS5pZCA9PT0gYWN0aXZlU2V0KSB7XG5cdFx0XHRcdFx0XHQvLyBjdXJyZW50IHNldCBpbml0aWFsbHkgZW1wdHlcblx0XHRcdFx0XHRcdHNlbGVjdGVkUGVyU2V0W2ljb25TZXRbaV0uaWRdID0gW107XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGVjdGVkUGVyU2V0W2ljb25TZXRbaV0uaWRdID0gc2VsZWN0aW9uLmZpbHRlcihzbG90ID0+IHNsb3QuaWNvblNldElkID09PSBpY29uU2V0W2ldLmlkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc2VsZWN0ZWRWYXJpYW50ID0ge1xuXHRcdFx0XHRcdGZvbnRJZDogYWN0aXZlVmFyaWFudERhdGEuZm9udElkLFxuXHRcdFx0XHRcdGNzc0NsYXNzOiBhY3RpdmVWYXJpYW50RGF0YS5jc3NDbGFzcyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgZWwgPSB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnaWNvbicsXG5cdFx0XHRcdFx0XHRpY29uU2V0SWQ6IGFjdGl2ZVNldCxcblx0XHRcdFx0XHRcdGljb246ICQoc2VsZWN0ZWRFbGVtZW50c1tpXSkuZmluZCgnLmljb24tYXNzZXQnKS5kYXRhKCdpY29uaWQnKSxcblx0XHRcdFx0XHRcdHZhcmlhbnQ6IHNlbGVjdGVkVmFyaWFudCxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2VsZWN0ZWRQZXJTZXRbYWN0aXZlU2V0XS5wdXNoKGVsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdO1xuXG5cdFx0XHRcdC8vIEpvaW4gY3VycmVudCBzZWxlY3Rpb24gd2l0aCBvdGhlciBzZXRzLlxuXHRcdFx0XHRmb3IgKGxldCBmb250SWQgaW4gc2VsZWN0ZWRQZXJTZXQpIHtcblx0XHRcdFx0XHRzZWxlY3RlZCA9IHNlbGVjdGVkLmNvbmNhdChzZWxlY3RlZFBlclNldFtmb250SWRdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm1vZGVsLnNldCgnc2VsZWN0ZWRJY29ucycsIHNlbGVjdGVkKTtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIEFkZCBhbmQgcmVtb3ZlIHByb3BwZXIgQ1NTIGNsYXNzZXMgb24gaWNvbnMsXG5cdFx0XHQgKiBhY2NvcmRpbmcgdG8gY3VycmVudGx5IGFjdGl2ZSBmb250IHZhcmlhbnRzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvYmplY3QgalF1ZXJ5IGNsaWNrZWQgZWxlbWVudC5cblx0XHRcdCAqIEBwYXJhbSBvYmplY3QgQ3VycmVudCBmb250IHNldC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0c2V0VmFyaWFudE1hdGVyaWFsSWNvbnM6IGZ1bmN0aW9uICh0YXJnZXQsIGN1cnJlbnRTZXQpIHtcblxuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGFjdGl2ZVZhcmlhbnRDdXJyID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZVZhcmlhbnQnKSxcblx0XHRcdFx0XHRhY3RpdmVWYXJpYW50TmV3ID0gdGFyZ2V0LnBhcmVudHMoJy5pY29ucy12YXJpYW50cycpLmZpbmQoJy52YXJpYW50LmFjdGl2ZScpLmZpcnN0KCkuZGF0YSgndmFyaWFudGlkJykudG9TdHJpbmcoKSwgLy8gT25seSBvbmUgdmFyaWFudCBjYW4gYmUgYWN0aXZlIGluIGEgbW9tZW50LlxuXHRcdFx0XHRcdHZhcmlhbnRzID0ge307XG5cblx0XHRcdFx0Zm9yIChsZXQgdmFyaWFudElkIGluIGFjdGl2ZVZhcmlhbnRDdXJyKSB7XG5cdFx0XHRcdFx0dmFyaWFudHNbdmFyaWFudElkXSA9IGFjdGl2ZVZhcmlhbnRDdXJyW3ZhcmlhbnRJZF07XG5cblx0XHRcdFx0XHRpZiAoY3VycmVudFNldC5pZCA9PT0gdmFyaWFudElkKSB7XG5cdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50SWRdID0gYWN0aXZlVmFyaWFudE5ldztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLm1vZGVsLnNldCgnYWN0aXZlVmFyaWFudCcsIHZhcmlhbnRzKTtcblx0XHRcdH0sXG5cdFx0XHRsb2FkRm9udHM6IGFzeW5jIGZ1bmN0aW9uIChpY29uU2V0LCBhY3RpdmVTZXQsIGFjdGl2ZVZhcmlhbnQsIGZvbnRzKSB7XG5cblx0XHRcdFx0bGV0IGZvbnRUb0xvYWQgPSBmYWxzZTtcblxuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGFjdGl2ZVNldERhdGEgPSBpY29uU2V0LmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQuaWQgPT09IGFjdGl2ZVNldCksXG5cdFx0XHRcdFx0YWN0aXZlVmFyaWFudERhdGEgPSBhY3RpdmVTZXREYXRhLnZhcmlhbnRzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQuaWQgPT09IGFjdGl2ZVZhcmlhbnRbYWN0aXZlU2V0XSksXG5cdFx0XHRcdFx0Zm9udERhdGEgPSBmb250cy5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50LmlkID09PSBhY3RpdmVWYXJpYW50RGF0YS5mb250SWQpO1xuXG5cdFx0XHRcdGxldCBsb2FkID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cdFx0XHRcdFx0bGV0IGZvbnRTZWxlY3RvciA9IGAjJHtmb250RGF0YS5pZH0tY3NzYDsvLyBJRCBzaG91bGQgbWF0Y2ggV1AgYXNzZXRzIG5hbWluZyBjb252ZW50aW9uLlxuXHRcdFx0XHRcdGlmICgkKGZvbnRTZWxlY3RvcikubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvbnRUb0xvYWQgPSBmb250RGF0YTtcblxuXHRcdFx0XHRcdGlmIChmb250VG9Mb2FkKSB7XG5cblx0XHRcdFx0XHRcdGxldCBpY29uTG9hZGVyVmlldyA9IG5ldyBhcHBJY29ucy52aWV3cy5pY29uTG9hZGVyKHtcblx0XHRcdFx0XHRcdFx0Y29udHJvbGxlcjogdGhpcy5vcHRpb25zLmNvbnRyb2xsZXIsXG5cdFx0XHRcdFx0XHRcdG1vZGVsOiB0aGlzLm9wdGlvbnMubW9kZWwsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGljb25Db2xsZWN0aW9uVmlldy52aWV3cy5zZXQoJyNpY29uLXNldC1pdGVtcycsIFtpY29uTG9hZGVyVmlld10pO1xuXG5cdFx0XHRcdFx0XHRsZXQgc3R5bGVzaGVldCA9ICQoJzxsaW5rPicpLmF0dHIoeyB0eXBlOiAndGV4dC9jc3MnLCByZWw6ICdzdHlsZXNoZWV0JywgaWQ6IGAke2ZvbnRUb0xvYWQuaWR9LWNzc2AsIGhyZWY6IGZvbnRUb0xvYWQudXJsIH0pOy8vIElEIHNob3VsZCBtYXRjaCBXUCBhc3NldHMgbmFtaW5nIGNvbnZlbnRpb24uXG5cdFx0XHRcdFx0XHRzdHlsZXNoZWV0Lm9uKCdsb2FkJywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c3R5bGVzaGVldC5hcHBlbmRUbygnYm9keScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGxvYWQ7XG5cdFx0XHR9LFxuXHRcdFx0bG9hZEljb25zOiBhc3luYyBmdW5jdGlvbiAoaWNvblNldCwgYWN0aXZlU2V0KSB7XG5cblx0XHRcdFx0Y29uc3QgYWN0aXZlU2V0RGF0YSA9IGljb25TZXQuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gYWN0aXZlU2V0KTtcblxuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoYWN0aXZlU2V0RGF0YS5pY29ucykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYWN0aXZlU2V0RGF0YS5pY29ucyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgaWNvbnMgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRcdFx0XHRpZiAoeGhyICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0eGhyID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR4aHIgPSB3cC5tZWRpYS5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogbWVzc2lhVmFycy5hamF4VXJsLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRhY3Rpb246IGFjdGl2ZVNldERhdGEuYWpheEFjdGlvbixcblx0XHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IG1lc3NpYVZhcnMubWVzc2lhTm9uY2UsXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGJlZm9yZVNlbmQ6IChqcUFqYXgsIFJlcXVlc3QpID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IGljb25Mb2FkZXJWaWV3ID0gbmV3IGFwcEljb25zLnZpZXdzLmljb25Mb2FkZXIoe1xuXHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IHRoaXMub3B0aW9ucy5jb250cm9sbGVyLFxuXHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB0aGlzLm9wdGlvbnMubW9kZWwsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRpY29uQ29sbGVjdGlvblZpZXcudmlld3Muc2V0KCcjaWNvbi1zZXQtaXRlbXMnLCBbaWNvbkxvYWRlclZpZXddKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiAoc2VydmVyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuY29kZSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoc2VydmVyLmljb25zKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihzZXJ2ZXIubWVzc2FnZSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZXJyb3I6IChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoTUxIdHRwUmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgdGV4dFN0YXR1cyA9PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKG1lc3NpYVZhcnMubWVzc2FnZXMubWVkaWFGcmFtZS5lcnJvclNldExvYWQpKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gKHNlcnZlciwgdGV4dFN0YXR1cywgTUxIdHRwUmVxdWVzdCkge1xuXHRcdFx0XHRcdFx0XHR4aHIgPSBudWxsO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGljb25zO1xuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlIEludGVyc2VjdGlvbk9ic2VydmVyIGZvciBjb250YWluZXJzIHdpdGggaWNvbnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdG9ic2VydmVJY29uQ29udGFpbmVyczogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBpY29ucyA9ICQoJy5pY29ucy1jb2xsZWN0aW9uICNpY29uLXNldCAuaWNvbnMtZ3JpZCAuaWNvbi1wbGFjZWhvbGRlci53b3cnKTtcblxuXHRcdFx0XHRpZiAoaWNvbnMubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBpY29ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuXHRcdFx0XHRcdGljb25zLnJlbW92ZUNsYXNzKCd3b3cnKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdFx0XHRyb290OiBudWxsLFxuXHRcdFx0XHRcdHJvb3RNYXJnaW46ICcwcHgnLFxuXHRcdFx0XHRcdHRocmVzaG9sZDogWzAuMl0sXG5cdFx0XHRcdFx0Ly8gZGVsYXk6IDEwMCxcblx0XHRcdFx0XHQvLyB0cmFja1Zpc2liaWxpdHk6IHRydWUsIC8vIHZlcnkgZXhwZW5zaXZlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoYXBwSWNvbnMuaGVscGVycy5pY29uVmlzaWJsZSwgb3B0aW9ucyk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdFx0Y29uc3QgaWNvbiA9IGljb25zW2ldO1xuXG5cdFx0XHRcdFx0aWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRlJykpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKGljb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDYWxsYmFjayBmb3IgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1tJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XX0gY2FyZHMgICAgT2JzZXJ2aW5nIEhUTUwgZWxlbWVudHNcblx0XHRcdCAqIEBwYXJhbSB7SW50ZXJzZWN0aW9uT2JzZXJ2ZXJ9ICAgICAgICBvYnNlcnZlciBJbnN0YW5jZSBvZiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdFx0ICovXG5cdFx0XHRpY29uVmlzaWJsZTogZnVuY3Rpb24gKGljb25zLCBvYnNlcnZlcikge1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdGNvbnN0IGNhcmRDb250YWluZXIgPSBpY29uc1tpXTtcblxuXHRcdFx0XHRcdGlmIChjYXJkQ29udGFpbmVyLmludGVyc2VjdGlvblJhdGlvID4gMCkge1xuXG5cdFx0XHRcdFx0XHR2YXIgZGVsYXkgPSBNYXRoLnJhbmRvbSgpICogMiAqIDEwMDtcblx0XHRcdFx0XHRcdC8vIHNjcm9sbCBkb3duXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y2FyZENvbnRhaW5lci50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZScsICdzY2FsZScpO1xuXHRcdFx0XHRcdFx0fSwgZGVsYXkpO1xuXG5cdFx0XHRcdFx0XHRvYnNlcnZlci51bm9ic2VydmUoY2FyZENvbnRhaW5lci50YXJnZXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9XG5cdH07XG5cblx0d3AubWVkaWEudmlldy5NZWRpYUZyYW1lLlNlbGVjdCA9IGN1cnJlbnRNZWRpYUZyYW1lLmV4dGVuZCh7XG5cdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGZyYW1lKSB7XG5cblx0XHRcdF8uZGVmYXVsdHModGhpcy5vcHRpb25zLCB7XG5cdFx0XHRcdHN0YXRlOiAnbGlicmFyeSdcblx0XHRcdH0pO1xuXG5cdFx0XHRjdXJyZW50TWVkaWFGcmFtZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0YXBwSWNvbnMuaW5pdC5jYWxsKHRoaXMpO1xuXHRcdH0sXG5cdFx0cmVuZGVyRm9udENvbGxlY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIHRoaXMgdmlldyBoYXMgbm8gcm91dGVyXG5cdFx0XHR0aGlzLiRlbC5hZGRDbGFzcygnaGlkZS1yb3V0ZXInKTtcblxuXHRcdFx0aWNvbkNvbGxlY3Rpb25WaWV3ID0gbmV3IGFwcEljb25zLnZpZXdzLmljb25Db2xsZWN0aW9uKHtcblx0XHRcdFx0Y29udHJvbGxlcjogdGhpcyxcblx0XHRcdFx0bW9kZWw6IHRoaXMuc3RhdGVzLmdldCgnZm9udENvbGxlY3Rpb24nKS5wcm9wcyxcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5jb250ZW50LnNldChbaWNvbkNvbGxlY3Rpb25WaWV3XSk7XG5cdFx0fSxcblx0XHRyZW5kZXJJY29uU2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpY29uU2V0VmlldyA9IG5ldyBhcHBJY29ucy52aWV3cy5pY29uU2V0KHtcblx0XHRcdFx0Y29udHJvbGxlcjogdGhpcyxcblx0XHRcdFx0bW9kZWw6IHRoaXMuc3RhdGVzLmdldCgnZm9udENvbGxlY3Rpb24nKS5wcm9wcyxcblx0XHRcdH0pO1xuXHRcdFx0aWNvblNldFZpZXcub3B0aW9ucy5hc3NldHNSZWFkeS50aGVuKChzdGF0ZSkgPT4gaWNvbkNvbGxlY3Rpb25WaWV3LnZpZXdzLnNldCgnI2ljb24tc2V0LWl0ZW1zJywgW2ljb25TZXRWaWV3XSkpO1xuXHRcdH0sXG5cdFx0Y3JlYXRlSWNvbnNUb29sYmFyOiBmdW5jdGlvbiAodG9vbGJhcikge1xuXHRcdFx0dG9vbGJhci52aWV3ID0gbmV3IHdwLm1lZGlhLnZpZXcuVG9vbGJhci5JY29ucyh7XG5cdFx0XHRcdGNvbnRyb2xsZXI6IHRoaXNcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Y3JlYXRlV1BUb29sYmFyOiBmdW5jdGlvbiAodG9vbGJhcikge1xuXHRcdFx0Ly8gb3RoZXJ3aXMgV1AgbG9zdCB0aXRsZSBvbiBhIGJ1dHRvbiBpbiB0b29sYmFyLlxuXHRcdFx0ZGVsZXRlIHRoaXMub3B0aW9ucy5idXR0b24uaXRlbXM7XG5cdFx0fSxcblx0fSk7XG5cblx0Ly8gQWNjZXB0cyBhbiBvcHRpb25hbCBvYmplY3QgaGFzaCB0byBvdmVycmlkZSBkZWZhdWx0IHZhbHVlcy5cblx0ZnJhbWUgPSBuZXcgd3AubWVkaWEoe1xuXHRcdC8vIE1vZGFsIHRpdGxlXG5cdFx0ZnJhbWU6ICdzZWxlY3QnLFxuXHRcdHRpdGxlOiBtZXNzaWFWYXJzLm1lc3NhZ2VzLm1lZGlhRnJhbWUuaW1hZ2VzVGl0bGUsXG5cdFx0YnV0dG9uOiB7XG5cdFx0XHR0ZXh0OiBtZXNzaWFWYXJzLm1lc3NhZ2VzLm1lZGlhRnJhbWUuaW1hZ2VzQnV0dG9uLnRleHRcblx0XHR9LFxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGljb24gZm9udHMgY29udHJvbGxlclxuXHRcdGljb25Gb250czogbWVzc2lhVmFycy5tZWRpYUZyYW1lLmljb25Gb250cyxcblx0XHQvLyBFbmFibGUvZGlzYWJsZSBtdWx0aXBsZSBzZWxlY3Rcblx0XHRtdWx0aXBsZTogZ2V0Q2FsbGVyKCQodGhpcykpLmhhc0NsYXNzKCdtdWx0aXBsZScpLFxuXHRcdC8vIExpYnJhcnkgV29yZFByZXNzIHF1ZXJ5IGFyZ3VtZW50cy5cblx0XHRsaWJyYXJ5OiB7XG5cdFx0XHRvcmRlcjogJ0RFU0MnLFxuXG5cdFx0XHQvLyBbICduYW1lJywgJ2F1dGhvcicsICdkYXRlJywgJ3RpdGxlJywgJ21vZGlmaWVkJywgJ3VwbG9hZGVkVG8nLFxuXHRcdFx0Ly8gJ2lkJywgJ3Bvc3RfX2luJywgJ21lbnVPcmRlcicgXVxuXHRcdFx0b3JkZXJieTogJ2RhdGUnLFxuXG5cdFx0XHQvLyBtaW1lIHR5cGUuIGUuZy4gJ2ltYWdlJywgJ2ltYWdlL2pwZWcnXG5cdFx0XHR0eXBlOiAnaW1hZ2UnLFxuXG5cdFx0XHQvLyBTZWFyY2hlcyB0aGUgYXR0YWNobWVudCB0aXRsZS5cblx0XHRcdHNlYXJjaDogbnVsbCxcblxuXHRcdFx0Ly8gQXR0YWNoZWQgdG8gYSBzcGVjaWZpYyBwb3N0IChJRCkuXG5cdFx0XHR1cGxvYWRlZFRvOiBudWxsXG5cdFx0fSxcblx0fSk7XG5cblx0Ly8gRmlyZXMgd2hlbiB0aGUgbW9kYWwgb3BlbnMgKGJlY29tZXMgdmlzaWJsZSkuXG5cdC8vIEBzZWUgbWVkaWEudmlldy5Nb2RhbC5vcGVuKClcblx0ZnJhbWUub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdFxuXHRcdFx0dGFyZ2V0ID0gJChldmVudC50YXJnZXQpLFxuXHRcdFx0Y2FsbGVyID0gZ2V0Q2FsbGVyKHRhcmdldCksXG5cdFx0XHRpbWFnZWluZm8gPSBjYWxsZXIuZGF0YSgnaW1hZ2VpbmZvJyk7XG5cblx0XHQkKHRoaXMpLmRhdGEoJ2NhbGxlcicsIGNhbGxlcik7XG5cdFx0ZnJhbWUuc3RhdGVzLmdldCgnbGlicmFyeScpLmdldCgnc2VsZWN0aW9uJykubXVsdGlwbGUgPSBjYWxsZXIuaGFzQ2xhc3MoJ211bHRpcGxlJyk7XG5cdFx0Ly9mcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJykubXVsdGlwbGUgPSBjYWxsZXIuaGFzQ2xhc3MoJ211bHRpcGxlJyk7XG5cblx0XHQvLyBsaWJyYXJ5LmNvbXBhcmF0b3IgPSBjb21wYXJhdG9yOyBub3QgY2xlYXIgaG93IGl0IHdvcmtzXG5cblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBpbWFnZWluZm8pIHtcblx0XHRcdHN3aXRjaCAoaW1hZ2VpbmZvLnR5cGUpIHtcblx0XHRcdFx0Y2FzZSAnd3AtaW1hZ2UnOlxuXHRcdFx0XHRcdGZyYW1lLnNldFN0YXRlKCdsaWJyYXJ5Jyk7XG5cblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0bGlicmFyeSA9IGZyYW1lLnN0YXRlKCkuZ2V0KCdsaWJyYXJ5JyksXG5cdFx0XHRcdFx0XHRzZWxlY3Rpb24gPSBmcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJyk7XG5cblx0XHRcdFx0XHRsZXQgYXR0YWNobWVudCA9IHdwLm1lZGlhLmF0dGFjaG1lbnQoaW1hZ2VpbmZvLmlkKTtcblx0XHRcdFx0XHRhdHRhY2htZW50LmZldGNoKCk7XG5cdFx0XHRcdFx0bGlicmFyeS5hZGQoYXR0YWNobWVudCk7XG5cdFx0XHRcdFx0c2VsZWN0aW9uLmFkZChhdHRhY2htZW50KTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdpY29uJzpcblxuXHRcdFx0XHRcdHN3aXRjaCAoaW1hZ2VpbmZvLmljb25TZXRJZCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnZ29vZ2xlLW1hdGVyaWFsJzpcblx0XHRcdFx0XHRcdFx0ZnJhbWUuc2V0U3RhdGUoJ2ZvbnRDb2xsZWN0aW9uJyk7XG5cblx0XHRcdFx0XHRcdFx0bGV0IG1vZGVsID0gZnJhbWUuc3RhdGUoKS5nZXQoJ2ZvbnRDb2xsZWN0aW9uJyk7XG5cdFx0XHRcdFx0XHRcdGxldCBhY3RpdmVWYXJpYW50ID0gT2JqZWN0LmFzc2lnbihtb2RlbC5nZXQoJ2FjdGl2ZVZhcmlhbnQnKSk7IC8vIGNsb25lIGl0LlxuXG5cdFx0XHRcdFx0XHRcdGxldCBhY3RpdmVTZXREYXRhID0gbW9kZWwuZ2V0KCdpY29uU2V0JykuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gaW1hZ2VpbmZvLmljb25TZXRJZCk7XG5cdFx0XHRcdFx0XHRcdGxldCBhY3RpdmVWYXJpYW50RGF0YSA9IGFjdGl2ZVNldERhdGEudmFyaWFudHMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5mb250SWQgPT09IGltYWdlaW5mby52YXJpYW50LmZvbnRJZCk7XG5cblx0XHRcdFx0XHRcdFx0YWN0aXZlVmFyaWFudFtpbWFnZWluZm8uaWNvblNldElkXSA9IGFjdGl2ZVZhcmlhbnREYXRhLmlkO1xuXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnYWN0aXZlU2V0JywgaW1hZ2VpbmZvLmljb25TZXRJZCwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnYWN0aXZlVmFyaWFudCcsIGFjdGl2ZVZhcmlhbnQsIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ3NlbGVjdGVkSWNvbnMnLCBbaW1hZ2VpbmZvXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0XHRcdFx0XHRcdG1vZGVsLnRyaWdnZXIoJ2NoYW5nZTpzZWxlY3RlZEljb25zJyk7XG5cdFx0XHRcdFx0XHRcdGZyYW1lLnRyaWdnZXIoJ2NvbnRlbnQ6cmVuZGVyOmZvbnRDb2xsZWN0aW9uJyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcihgVW5rbm93biBpY29uIHNldCBpZDogJHtpbWFnZWluZm8uZm9udElkfWApKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoYFVua25vd24gaW1hZ2UgdHlwZTogJHtpbWFnZWluZm8udHlwZX1gKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBGaXJlcyB3aGVuIGEgdXNlciBoYXMgc2VsZWN0ZWQgYXR0YWNobWVudChzKSBhbmQgY2xpY2tlZCB0aGUgc2VsZWN0IGJ1dHRvbi5cblx0Ly8gQHNlZSBtZWRpYS52aWV3Lk1lZGlhRnJhbWUuUG9zdC5tYWluSW5zZXJ0VG9vbGJhcigpXG5cdGZyYW1lLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgc3RhdGVJZCA9IGZyYW1lLnN0YXRlKCkuZ2V0KCdpZCcpO1xuXG5cdFx0aWYgKHN0YXRlSWQgPT09ICdmb250Q29sbGVjdGlvbicpIHtcblxuXHRcdFx0bGV0IHNlbGVjdGlvbkNvbGxlY3Rpb24gPSB0aGlzLmdldCgnZm9udENvbGxlY3Rpb24nKS5wcm9wcy5nZXQoJ3NlbGVjdGVkSWNvbnMnKTsgLy8gc2V0dGVkIGluICdhcHBJY29ucy5oZWxwZXJzLnNldFNlbGVjdGlvbidcblxuXHRcdFx0dGhpcy5nZXQoJ2ZvbnRDb2xsZWN0aW9uJykucHJvcHMudHJpZ2dlcigncmVzZXQnKTtcblx0XHRcdHRoaXMuZ2V0KCdsaWJyYXJ5JykuZnJhbWUuY2xvc2UoKTtcblxuXHRcdFx0b25TZWxlY3QoJCh0aGlzKS5kYXRhKCdjYWxsZXInKSwgc2VsZWN0aW9uQ29sbGVjdGlvbik7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bGV0IHNlbGVjdGlvbkNvbGxlY3Rpb24gPSBmcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJyk7XG5cblx0XHRcdGxldCBzZWxlY3RlZCA9IHNlbGVjdGlvbkNvbGxlY3Rpb24ubW9kZWxzLm1hcCgobW9kZWwpID0+IHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiAnd3AtaW1hZ2UnLFxuXHRcdFx0XHRcdGlkOiBtb2RlbC5hdHRyaWJ1dGVzLmlkLFxuXHRcdFx0XHRcdHVybDogbW9kZWwuYXR0cmlidXRlcy51cmwsXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRvblNlbGVjdCgkKHRoaXMpLmRhdGEoJ2NhbGxlcicpLCBzZWxlY3RlZCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBGaXJlcyBhZnRlciB0aGUgZnJhbWUgbWFya3VwIGhhcyBiZWVuIGJ1aWx0LCBidXQgbm90IGFwcGVuZGVkIHRvIHRoZSBET00uXG5cdC8vIEBzZWUgd3AubWVkaWEudmlldy5Nb2RhbC5hdHRhY2goKVxuXHQvLyBmcmFtZS5vbiggJ3JlYWR5JywgZnVuY3Rpb24oKSB7fSApO1xuXG5cdC8vIEZpcmVzIHdoZW4gdGhlIGZyYW1lJ3MgJGVsIGlzIGFwcGVuZGVkIHRvIGl0cyBET00gY29udGFpbmVyLlxuXHQvLyBAc2VlIG1lZGlhLnZpZXcuTW9kYWwuYXR0YWNoKClcblx0Ly8gZnJhbWUub24oICdhdHRhY2gnLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gRmlyZXMgd2hlbiB0aGUgbW9kYWwgY2xvc2VzIHZpYSB0aGUgZXNjYXBlIGtleS5cblx0Ly8gQHNlZSBtZWRpYS52aWV3Lk1vZGFsLmNsb3NlKClcblx0Ly8gZnJhbWUub24oICdlc2NhcGUnLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gRmlyZXMgd2hlbiB0aGUgbW9kYWwgY2xvc2VzLlxuXHQvLyBAc2VlIG1lZGlhLnZpZXcuTW9kYWwuY2xvc2UoKVxuXHQvLyBmcmFtZS5vbiggJ2Nsb3NlJywgZnVuY3Rpb24oKSB7IH0gKTtcblxuXHQvLyBGaXJlcyB3aGVuIGEgc3RhdGUgYWN0aXZhdGVzLlxuXHQvLyBmcmFtZS5vbiggJ2FjdGl2YXRlJywgZnVuY3Rpb24oKSB7fSApO1xuXG5cdC8vIEZpcmVzIHdoZW4gYSBtb2RlIGlzIGRlYWN0aXZhdGVkIG9uIGEgcmVnaW9uLlxuXHQvLyBmcmFtZS5vbiggJ3tyZWdpb259OmRlYWN0aXZhdGUnLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gYW5kIGEgbW9yZSBzcGVjaWZpYyBldmVudCBpbmNsdWRpbmcgdGhlIG1vZGUuXG5cdC8vIGZyYW1lLm9uKCAne3JlZ2lvbn06ZGVhY3RpdmF0ZTp7bW9kZX0nLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gRmlyZXMgd2hlbiBhIHJlZ2lvbiBpcyByZWFkeSBmb3IgaXRzIHZpZXcgdG8gYmUgY3JlYXRlZC5cblx0Ly8gZnJhbWUub24oICd7cmVnaW9ufTpjcmVhdGUnLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gYW5kIGEgbW9yZSBzcGVjaWZpYyBldmVudCBpbmNsdWRpbmcgdGhlIG1vZGUuXG5cdC8vIGZyYW1lLm9uKCAne3JlZ2lvbn06Y3JlYXRlOnttb2RlfScsIGZ1bmN0aW9uKCkge30gKTtcblxuXHQvLyBGaXJlcyB3aGVuIGEgcmVnaW9uIGlzIHJlYWR5IGZvciBpdHMgdmlldyB0byBiZSByZW5kZXJlZC5cblx0Ly8gZnJhbWUub24oICd7cmVnaW9ufTpyZW5kZXInLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gYW5kIGEgbW9yZSBzcGVjaWZpYyBldmVudCBpbmNsdWRpbmcgdGhlIG1vZGUuXG5cdC8vIGZyYW1lLm9uKCAne3JlZ2lvbn06cmVuZGVyOnttb2RlfScsIGZ1bmN0aW9uKCkge30gKTtcblxuXHQvLyBGaXJlcyB3aGVuIGEgbmV3IG1vZGUgaXMgYWN0aXZhdGVkIChhZnRlciBpdCBoYXMgYmVlbiByZW5kZXJlZCkgb24gYSByZWdpb24uXG5cdC8vIGZyYW1lLm9uKCAne3JlZ2lvbn06YWN0aXZhdGUnLCBmdW5jdGlvbigpIHt9ICk7XG5cblx0Ly8gYW5kIGEgbW9yZSBzcGVjaWZpYyBldmVudCBpbmNsdWRpbmcgdGhlIG1vZGUuXG5cdC8vIGZyYW1lLm9uKCAne3JlZ2lvbn06YWN0aXZhdGU6e21vZGV9JywgZnVuY3Rpb24oKSB7fSApO1xuXG5cdC8vIEdldCBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlLlxuXHQvLyBmcmFtZS5zdGF0ZSgpO1xuXG5cdC8vIEdldCBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwcmV2aW91cyBzdGF0ZS5cblx0Ly8gZnJhbWUubGFzdFN0YXRlKCk7XG5cblx0Ly8gT3BlbiB0aGUgbW9kYWwuXG5cdG1lc3NpYVZhcnMubWVkaWFGcmFtZS5tb2RlbCA9IGZyYW1lO1xuXHRmcmFtZS5vcGVuKCk7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZVxuaW1wb3J0IFwiLi4vLi4vc2Nzcy9fYmFja2VuZC9tZWRpYS5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL19iYWNrZW5kL21lZGlhLmpzXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
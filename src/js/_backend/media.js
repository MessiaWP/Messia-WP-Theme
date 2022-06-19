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
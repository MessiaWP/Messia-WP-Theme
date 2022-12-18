(function (wp, $) {

	const { apiFetch } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { InspectorControls, BlockControls } = wp.blockEditor;
	const { ToggleControl, Flex, FlexItem, PanelBody, Notice, SelectControl, ToolbarGroup, ToolbarButton, Placeholder, Disabled, Card, Spinner, TabPanel } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 87" xmlns="http://www.w3.org/2000/svg">
		<g className="layer">
			<g id="svg_33">
				<g id="svg_19">
					<rect fill="#000000" fillOpacity="0" height="77.12392" id="svg_10" rx="2" ry="2" stroke="#7f7f7f" strokeWidth="2" width="77.12392" x="4.65838" y="5.08211" />
					<rect fill="#7f7f7f" height="8.18963" id="svg_12" rx="1" ry="1" width="57.87731" x="14.28169" y="59.71144" />
					<path d="m14.7842,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z" fill="#7f7f7f" id="svg_11" />
				</g>
				<g id="svg_20">
					<rect fill="#000000" fillOpacity="0" height="77.12392" id="svg_21" rx="2" ry="2" stroke="#7f7f7f" strokeWidth="2" width="77.12392" x="98.09058" y="5.08211" />
					<rect fill="#7f7f7f" height="8.18963" id="svg_24" rx="1" ry="1" width="57.87731" x="107.71389" y="59.71144" />
					<path d="m108.2164,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z" fill="#7f7f7f" id="svg_25" />
				</g>
				<g id="svg_26">
					<rect fill="#000000" fillOpacity="0" height="77.12392" id="svg_27" rx="2" ry="2" stroke="#7f7f7f" strokeWidth="2" width="77.12392" x="191.73465" y="5.08211" />
					<rect fill="#7f7f7f" height="8.18963" id="svg_29" rx="1" ry="1" width="57.87731" x="201.35795" y="59.71144" />
					<path d="m201.86046,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z" fill="#7f7f7f" id="svg_30" />
				</g>
			</g>
		</g>
	</svg>;
	const shortid = require('shortid');

	let lastPreview = false;

	function CategoryTermsFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [filterDropped, setFilterDropped] = useState($());
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState({
			segment: [],
			category: []
		});

		let blockRef = useRef();
		const slotTitle = __('Category term slot', 'messia');
		const dragTitle = __('Add Category term', 'messia');

		const handlerRemove = (event) => {

			$(event.target).parents('.category-slot').animate({
				opacity: 0,
			}, 400, function () {
				$(this).addClass('removed').css('display', 'none');
				const categories = $(blockRef.current).find('.category-constructed .category-slot');
				saveSlots(categories);
			});
		}

		const dragSortInit = () => {

			const sortable = $(blockRef.current).find('.category-constructed').not('ui-sortable').sortable({
				forceHelperSize: true,
				forcePlaceholderSize: true,
				opacity: 1,
				//distance: 10,
				tolerance: 'intersect',
				//cursor: 'grabbig',
				scroll: true,
				scrollSensitivity: 20,
				containment: '.edit-post-visual-editor',
				placeholder: 'sortable-placeholder',
				handle: '.move',
				//zIndex: 10000,
				start: (event, ui) => {
					ui.item.addClass('is-elevated');
					$('body').addClass('cursor-grabbing');
				},
				beforeStop: (event, ui) => {
					$('body').removeClass('cursor-grabbing');
				},
				stop: (event, ui) => {
					ui.item.removeClass('is-elevated');
					ui.item.find('.title .text').text(slotTitle);
					showSlotSettings(ui).then((ui) => {
						setFilterDropped(ui.item);
					});
				},
			});

			const draggable = $(blockRef.current).find('.category-templates .category-slot').not('.ui-draggable').draggable({
				connectToSortable: '.category-constructed',
				//cursor: 'grabbig',
				helper: 'clone',
				revert: 'invalid',
				scroll: false,
				revertDuration: 200,
				handle: '.move',
				zIndex: 10,
				start: (event, ui) => {
					ui.helper.addClass('is-elevated');
					$('body').addClass('cursor-grabbing');
					sortable.addClass('dragging');
				},
				beforeStop: (event, ui) => {
					$('body').removeClass('cursor-grabbing');
				},
				stop: (event, ui) => {
					ui.helper.removeClass('is-elevated');
					sortable.removeClass('dragging');
				},
			});
		}

		const saveSlots = (categories) => {

			let store = [];
			const segmentSlug = categories.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

			for (let i = 0; i < attributes.categoriesConstructed.length; i++) {
				if (attributes.categoriesConstructed[i].segmentSlug === segmentSlug) {
					continue;
				}
				// add other tabs categories
				store.push(attributes.categoriesConstructed[i]);
			}

			for (let i = 0; i < categories.length; i++) {
				let key;
				if ($(categories[i]).hasClass('removed')) {
					continue;
				}

				if ('undefined' === typeof $(categories[i]).data('key')) {
					key = shortid.generate();
				}
				else {
					key = $(categories[i]).data('key');
				}

				const type = $(categories[i]).data('type');
				switch (type) {
					case 'category':

						store.push({
							id: key,
							'segmentSlug': segmentSlug,
							'categorySlug': $(categories[i]).find('.settings select').val(),
						});
						break;
				}
			}

			if (filterDropped.hasClass('ui-draggable')) {
				filterDropped.addClass('remove-before-render');
			}

			setAttributes({ categoriesConstructed: store });
		}

		const showSlotSettings = async (ui) => {

			if (ui.item.hasClass('saved')) {
				return Promise.resolve(ui);
			}

			const w_from = ui.item.outerWidth();

			ui.item.css({
				'height': '',
				'width': '',
			});

			const w_to = ui.item.outerWidth();

			ui.item.css({
				'width': w_from,
			}).addClass('dropped');;

			return await new Promise((resolve, reject) => {
				//Card div
				ui.item.animate({
					width: w_to + 'px',
				}, 200, function () {
					$(this).css({
						'width': '',
					});

					//Setting div
					const settings = ui.item.find('.settings');

					if (settings.length === 0) {
						ui.item.addClass('saved');
						resolve(ui);
					}
					else {

						settings.css('display', 'block');

						const h = settings.outerHeight();
						const w = settings.outerWidth();

						settings.css({
							'height': 0,
							'width': 0,
						});
						settings.animate({
							height: h + 'px',
							width: w + 'px',
						}, 300, function () {
							$(this).css({
								'height': '',
								'width': '',
							});
							ui.item.addClass('saved');
							resolve(ui);
						});
					}
				});
			});
		}

		const getExample = () => {
			return exampleImageData;
		}

		const templates = () => {

			const block = wp.blocks.getBlockType(name);
			const templatesHtml = [
				<Fragment key='tip'>
					<h4>{block.title}</h4>
					<Notice
						isDismissible={false}
						status="warning">
						<p>{__('The list of terms is subordinate to the value of the "Empty category terms" option. Each list contains all terms of taxonomy Category. In frontend selected term will be shown as a link to the search page by this value.', 'messia')}</p>
					</Notice>
				</Fragment>
			];

			if (terms.category.length > 0) {

				templatesHtml.push(
					<Card
						className="messia-card category-slot"
						key="tmpl-by-category"
						data-type="category"
						size="small">
						<div className="messia-card-content">
							<Flex
								gap={2}>
								<FlexItem className="move">&equiv;</FlexItem>
								<FlexItem className='heading'>{dragTitle}</FlexItem>
								<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
							</Flex>
							<div className="settings">
								<SelectControl
									value={terms.category[0].value}
									options={terms.category}
								/>
							</div>
						</div>
					</Card>
				);
			}

			return templatesHtml;
		}

		const slots = (tab) => {

			const categoriesConstructedHtml = [];

			for (const [index, filter] of attributes.categoriesConstructed.entries()) {

				if (tab.segmentSlug != filter.segmentSlug) {
					continue;
				}

				categoriesConstructedHtml.push(
					<Card
						className="messia-card category-slot dropped saved"
						key={`${filter.categorySlug}-${filter.id}`}
						data-type="category"
						size="small">
						<div className="messia-card-content">
							<Flex
								gap={2}>
								<FlexItem className="move">&equiv;</FlexItem>
								<FlexItem className='heading'>{slotTitle}</FlexItem>
								<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
							</Flex>
							<div className="settings">
								<SelectControl
									value={attributes.categoriesConstructed[index].categorySlug}
									onChange={(termSlug) => {
										let attr = attributes.categoriesConstructed;
										delete attributes.categoriesConstructed;
										attr[index].categorySlug = termSlug;
										setAttributes({ categoriesConstructed: attr });
									}}
									options={terms.category}
								/>
							</div>
						</div>
					</Card>
				);
			}

			return categoriesConstructedHtml;
		}

		const getInspectorControls = () => {

			return (
				<InspectorControls key='inspector'>
					<PanelBody title={__('Settings', 'messia')} >
						<ToggleControl
							label={__('Show on front number of objects per term.', 'messia')}
							checked={attributes.withCount}
							onChange={(checked) => {
								setAttributes({ withCount: checked });
							}}
						/>
						<ToggleControl
							//className="criteria-item"
							label={__('Show in slider', 'messia')}
							checked={attributes.slider.active}
							onChange={(checked) => {
								let slider = Object.assign({}, attributes.slider);
								slider.active = Boolean(checked);
								setAttributes({ slider: slider });
							}}
						/>
					</PanelBody>
				</InspectorControls>
			);
		}

		const getBlockControls = () => {

			return (
				<BlockControls key="block">
					<ToolbarGroup
						label={__('Options', 'messia')}>
						<ToolbarButton
							label={editMode ? __('Preview', 'messia') : __('Edit', 'messia')}
							icon={editMode ? "visibility" : "edit"}
							onClick={() => {
								setEditMode(!editMode);
							}}
						/>
					</ToolbarGroup>
				</BlockControls>
			);
		}

		const getBlockEdit = () => {

			if (termsFetched) {
				if (terms.segment.length > 0) {
					const tabsHtml = [];

					for (const [indexSegment, segment] of terms.segment.entries()) {
						tabsHtml.push({
							name: `segment-${segment.value}-slug`,
							title: segment.label,
							className: 'tab',
							segmentSlug: segment.value
						});
					}
					const tabs = <TabPanel
						className="messia-tabs-panel"
						activeClass="active-tab"
						orientation="horizontal"
						initialTabName={tabsHtml[0].name}
						tabs={tabsHtml}>
						{
							(tab) => <div data-title={__('Drop item here.', 'messia')} className="messia-drop-zone category-constructed">{slots(tab)}</div>
						}
					</TabPanel>

					return (
						<Placeholder key="messia-block-placeholder">
							<div className="messia-block" key="messia-block" ref={blockRef}>
								<div className="category-templates">{templates()}</div>
								{tabs}
							</div>
						</Placeholder>
					);
				}
				else {
					return (
						<Placeholder key="messia-block-placeholder" label={__("You have no segments. Create one.", 'messia')}>
							<div className="messia-block" key="messia-block" ref={blockRef}></div>
						</Placeholder >
					);
				}
			}
			else {
				return (
					<Placeholder key="messia-block-placeholder">
						<div className="messia-block" key="messia-block" ref={blockRef}>
							<Spinner />
						</div>
					</Placeholder>
				)
			}
		}

		const getBlockPreview = () => {

			return (
				<div className="messia-block" key="messia-block" ref={blockRef}>
					<Disabled key="block-preview">
						<ServerSideRender
							block={name}
							attributes={attributes}
							urlQueryArgs={{ isPreview: true }}
						/>
					</Disabled>
				</div>
			);
		}

		const getTerms = async () => {

			return await apiFetch({
				path: 'messia/v1/block-category-terms',
				method: 'POST',
				data: { currentAttrs: attributes }
			}).then(response => {

				if (response.terms.segment.length === 0) {
					wp.data.dispatch('core/notices').createNotice(
						'error', // Can be one of: success, info, warning, error.
						__('Messia Category Terms: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'), // Text string to display.
						{
							isDismissible: true,
						}
					);
				}
				else {
					if (response.terms.category.length === 0) {
						wp.data.dispatch('core/notices').createNotice(
							'error', // Can be one of: success, info, warning, error.
							__('Messia Category Terms: No terms were found in taxonomy Category. Add some to use block.', 'messia'), // Text string to display.
							{
								isDismissible: true,
							}
						);
					}
				}
				return response;

			}).catch((e) => {
				wp.data.dispatch('core/notices').createNotice(
					'error', // Can be one of: success, info, warning, error.
					__('An error occurred while receiving data from the server for Category Terms block', 'messia'), // Text string to display.
					{
						isDismissible: true,
					}
				);
			});
		}

		const render = () => {

			if (attributes.isExample) {
				return getExample();
			}
			else {

				if (filterDropped.hasClass('remove-before-render')) {
					filterDropped.remove();
				}

				let classes = [className];
				const render = [
					getInspectorControls(),
					getBlockControls(),
				];

				if (editMode) {
					render.push(getBlockEdit());
					lastPreview = false;
				}
				else if (!lastPreview) {
					lastPreview = getBlockPreview();
					render.push(lastPreview);
				}
				else {
					render.push(lastPreview);
				}

				return <div className={classes.join(' ')}>{render}</div>;
			}
		}

		useEffect(() => {

			let isMounted = true;
			if (!termsFetched && !attributes.isExample) {

				getTerms().then((response) => {

					if (isMounted) {

						setAttributes({
							categoriesConstructed: response.validAttrs.categoriesConstructed
						});
						setTerms(response.terms);
						setTermsFetched(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		useEffect(() => {

			if (!editMode && !attributes.isExample) {
				$(blockRef.current).find('.category-constructed').sortable('destroy');
			}

		}, [editMode]);

		useEffect(() => {

			if (filterDropped.length === 0) {
				return;
			}
			const categories = $(blockRef.current).find('.category-constructed .category-slot');
			saveSlots(categories);
		}, [filterDropped]);

		useEffect(() => {

			let observer = new MutationObserver((mutationsList, observer) => {

				for (const mutation of mutationsList) {
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length >= 1) {
							for (let i = 0; i < mutation.addedNodes.length; i++) {
								const tabArea = $(mutation.addedNodes[i]).find('.category-constructed');
								if (tabArea.length > 0) {
									dragSortInit();
								}
							}
						}
					}
				}
			});

			observer.observe(
				document.querySelector('body'),
				{
					attributes: false,
					childList: true,
					subtree: true
				}
			);

			// Later, we can stop observing
			// observer.disconnect();

		}, []);

		return render();
	}

	registerBlockType('messia/block-category-terms', {
		title: __('Category\'s terms', 'messia'),
		description: __('Terms of taxonomy Category by parameters', 'messia'),
		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 21c0 1.657-1.344 3-3 3-1.657 0-3-1.343-3-3s1.343-3 3-3c1.656 0 3 1.343 3 3zm6-3c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm0-18c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm9 18c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-1.577-1.721l-6.423-5.028v-3.352c-.323.066-.658.101-1 .101s-.677-.035-1-.101v3.352l-6.423 5.028c.694.233 1.323.602 1.844 1.093l5.579-4.372 5.579 4.373c.522-.492 1.15-.861 1.844-1.094z" /></svg>,
		category: 'messia',
		keywords: ['category'],
		styles: [],
		variations: [],
		attributes: {
			categoriesConstructed: {
				type: 'array',
				default: [],
			},
			isExample: {
				type: 'boolean',
				default: false,
			},
			withCount: {
				type: 'boolean',
				default: true,
			},
			slider: {
				type: 'object',
				default: {
					active: true,
				}
			},
		},
		example: {
			attributes: {
				isExample: true,
			},
		},
		supports: {
			multiple: true,

		},
		edit: CategoryTermsFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
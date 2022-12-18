(function (wp, $) {

	const { apiFetch } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { InspectorControls, BlockControls } = wp.blockEditor;
	const { ToggleControl, Flex, FlexItem, PanelBody, Notice, CheckboxControl, SelectControl, ToolbarGroup, ToolbarButton, Placeholder, Disabled, Card, Spinner, TabPanel, TextControl } = wp.components;
	const { __ } = wp.i18n;
	const shortid = require('shortid');
	const exampleImageData = <svg viewBox="0 0 274 37" xmlns="http://www.w3.org/2000/svg">
		<g className="layer">
			<g id="svg_17">
				<g id="svg_11">
					<rect fill="#ffffff" height="27.828067" id="svg_8" rx="2" ry="2" stroke="#c2c2c2" width="118.736076" x="4.439902" y="4.654716" />
					<path d="m105.198331,21.787673l3.678772,-6.437851l3.678772,6.437851l-7.357544,0z" fill="#000000" id="svg_1" stroke="#000000" transform="rotate(-180 108.877 18.5687)" />
				</g>
				<g id="svg_12">
					<rect fill="#ffffff" height="27.828067" id="svg_2" rx="2" ry="2" stroke="#c2c2c2" width="63.505948" x="132.682586" y="4.654716" />
					<text fill="#000000" fontFamily="Monospace" fontSize="18" fontStyle="normal" fontWeight="normal" id="svg_6" stroke="#000000" textAnchor="middle" transform="matrix(0.911025 0 0 0.944903 4.59916 6.87916)" x="198.875684" y="18.342526">I</text>
				</g>
				<g id="svg_15">
					<rect fill="black" height="27.828067" id="svg_9" rx="2" ry="2" width="63.505948" x="206.531949" y="4.654717" />
					<text fill="#ffffff" fontFamily="Cursive" fontSize="24" id="svg_10" stroke="#000000" strokeWidth="0" textAnchor="middle" transform="matrix(0.547485 0 0 0.500406 46.8212 52.8191)" x="351.239178" y="-63">Search</text>
				</g>
			</g>
		</g >
	</svg>;

	let lastPreview = false;

	function SnippetEditFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [filterDropped, setFilterDropped] = useState($());
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState({
			segment: [],
			category: [],
			property: [],
		});

		let blockRef = useRef();

		const handlerRemove = (event) => {

			$(event.target).parents('.messia-filter').animate({
				opacity: 0,
			}, 400, function () {
				$(this).addClass('removed').css('display', 'none');
				const categories = $(blockRef.current).find('.filters-constructed .messia-filter');
				saveSlots(categories);
			});
		}

		const dragSortInit = () => {

			const sortable = $(blockRef.current).find('.filters-constructed').not('ui-sortable').sortable({
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
					showSlotSettings(ui).then((ui) => {
						setFilterDropped(ui.item);
					});
				},
			});

			const draggable = $(blockRef.current).find('.filters-templates .messia-filter').not('.ui-draggable').draggable({
				connectToSortable: '.filters-constructed',
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

		const saveSlots = (filters) => {

			let store = [];
			const segmentSlug = filters.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

			for (let i = 0; i < attributes.filtersConstructed.length; i++) {
				if (attributes.filtersConstructed[i].segmentSlug === segmentSlug) {
					continue;
				}
				// add other tabs filters
				store.push(attributes.filtersConstructed[i]);
			}

			for (let i = 0; i < filters.length; i++) {
				let key;
				if ($(filters[i]).hasClass('removed')) {
					continue;
				}

				if ('undefined' === typeof $(filters[i]).data('key')) {
					key = shortid.generate();
				}
				else {
					key = $(filters[i]).data('key');
				}

				const type = $(filters[i]).data('type');
				switch (type) {
					case 'string':
						store.push({
							id: key,
							'segmentSlug': segmentSlug,
							by: 'string',
						});
						break;

					case 'category':

						store.push({
							id: key,
							'segmentSlug': segmentSlug,
							selectAllCatAlias: $(filters[i]).find('.settings .select-all-alias input').val(),
							by: 'category',
							value: $(filters[i]).find('.settings select').val(),
						});
						break;

					case 'property':
						let val = [];
						let prop = $(filters[i]).find('.settings input[type="checkbox"]');

						for (var q = 0; q < prop.length; q++) {
							if ($(prop[q]).prop('checked')) {
								val.push($(prop[q]).val());
							}
						}
						store.push({
							id: key,
							'segmentSlug': segmentSlug,
							selectAllPropAlias: $(filters[i]).find('.settings .select-all-alias input').val(),
							by: 'property',
							value: val,
						});
						break;
				}
			}

			if (filterDropped.hasClass('ui-draggable')) {
				filterDropped.addClass('remove-before-render');
			}

			setAttributes({ filtersConstructed: store });
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
						<p>{__('The list of terms is subordinate to the value of the "Empty category/property terms" option. This list of categories contains all the key terms of the Category taxonomy, i.e. terms that have descendants. In the frontend, this list will show all the descendants of the term selected here.', 'messia')}</p>
					</Notice>
				</Fragment>
			];

			// TEMPLATES
			templatesHtml.push(
				<Card
					className="messia-card messia-filter"
					key="tmpl-by-string"
					data-type="string"
					size="small">
					<div className="messia-card-content">
						<Flex
							gap={2}>
							<FlexItem className="move">&equiv;</FlexItem>
							<FlexItem className='heading'>{__('by String', 'messia')}</FlexItem>
							<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
						</Flex>
					</div>
				</Card>
			);

			if (terms.category.length > 0) {

				templatesHtml.push(
					<Card
						className="messia-card messia-filter category"
						key="tmpl-by-category"
						data-type="category"
						size="small">
						<div className="messia-card-content">
							<Flex
								gap={2}>
								<FlexItem className="move">&equiv;</FlexItem>
								<FlexItem className='heading'>{__('by Category', 'messia')}</FlexItem>
								<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
							</Flex>
							<div className="settings">
								<div className="settings-inner">
									<div className="select-all-alias">
										<TextControl
											label={__('Set name for Select All option', 'messia')}
											className="alias"
											type='text'
											value={attributes.selectAllCatAlias}
										/>
									</div>
									<SelectControl
										value={terms.category[0].value}
										options={terms.category}
									/>
								</div>
							</div>
						</div>
					</Card>
				);
			}

			if (terms.property.length > 0) {

				const propertyCheckboxes = [];

				for (const [indexProperty, property] of terms.property.entries()) {
					propertyCheckboxes.push(
						<CheckboxControl
							key={property.value}
							value={property.value}
							label={property.label}
							onChange={(checked) => {

								let attr = attributes.filtersConstructed;
								delete attributes.filtersConstructed;

								if (checked) {
									attr[index].value.push(event.target.value);
								}
								else {
									const position = attr[index].value.indexOf(event.target.value);
									delete attr[index].value[position];
								}

								setAttributes({ filtersConstructed: attr });
							}}
						/>
					);
				}

				templatesHtml.push(
					<Card
						className="messia-card messia-filter property"
						key="tmpl-by-property"
						data-type="property"
						size="small">
						<div className="messia-card-content">
							<Flex
								gap={2}>
								<FlexItem className="move">&equiv;</FlexItem>
								<FlexItem className='heading'>{__('by Property', 'messia')}</FlexItem>
								<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
							</Flex>
							<div className="settings">
								<div className="select-all-alias">
									<TextControl
										label={__('Set name for Select All option', 'messia')}
										type='text'
										value={attributes.selectAllPropAlias}
									/>
								</div>
								<div className="properties">{propertyCheckboxes}</div>
							</div>
						</div>
					</Card>
				);
			}

			return templatesHtml;
		}

		const slots = (tab) => {

			const filtersConstructedHtml = [];

			for (const [index, filter] of attributes.filtersConstructed.entries()) {

				if (tab.segmentSlug != filter.segmentSlug) {
					continue;
				}

				switch (filter.by) {
					case 'string':
						filtersConstructedHtml.push(
							<Card
								className="messia-card messia-filter dropped saved"
								key={`${filter.by}-${filter.id}`}
								data-type="string"
								size="small">
								<div className="messia-card-content">
									<Flex
										gap={2}>
										<FlexItem className="move">&equiv;</FlexItem>
										<FlexItem className='heading'>{__('by String', 'messia')}</FlexItem>
										<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
									</Flex>
								</div>
							</Card>
						);
						break;

					case 'category':

						var alias = attributes.selectAllCatAlias;

						if (typeof attributes.filtersConstructed[index].selectAllCatAlias !== 'undefined') {
							alias = attributes.filtersConstructed[index].selectAllCatAlias;
						}

						const card =
							<Card
								className="messia-card messia-filter category dropped saved"
								key={`${filter.by}-${filter.id}`}
								data-type="category"
								size="small">
								<div className="messia-card-content">
									<Flex
										gap={2}>
										<FlexItem className="move">&equiv;</FlexItem>
										<FlexItem className='heading'>{__('by Category', 'messia')}</FlexItem>
										<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
									</Flex>
									<div className="settings">
										<div className="settings-inner">
											<div className="select-all-alias">
												<TextControl
													label={__('Set name for Select All option', 'messia')}
													className="alias"
													type='text'
													value={alias}
													onChange={(alias) => {
														let attr = attributes.filtersConstructed;
														delete attributes.filtersConstructed;
														attr[index].selectAllCatAlias = alias;
														setAttributes({ filtersConstructed: attr });
													}}
												/>
											</div>
											<SelectControl
												value={attributes.filtersConstructed[index].value}
												onChange={(termSlug) => {
													let attr = attributes.filtersConstructed;
													delete attributes.filtersConstructed;
													attr[index].value = termSlug;
													setAttributes({ filtersConstructed: attr });
												}}
												options={terms.category}
											/>
										</div>
									</div>
								</div>
							</Card>

						filtersConstructedHtml.push(card);

						break;

					case 'property':

						const propertyCheckboxes = [];

						for (const [indexProperty, property] of terms.property.entries()) {

							const checkbox =
								<CheckboxControl
									key={property.value}
									value={property.value}
									label={property.label}
									checked={attributes.filtersConstructed[index].value.includes(property.value)}
									onChange={(checked) => {

										let attr = attributes.filtersConstructed;
										delete attributes.filtersConstructed;

										// Rewrite all array with checked
										attr[index].value = [];
										var checked = $(event.target).parents('.settings').find('input[type="checkbox"]:checked');

										for (var i = 0; i < checked.length; i++) {
											attr[index].value.push($(checked[i]).val());
										}

										/* Another approach - change only changed element
										if (checked) {
											attr[index].value.push(event.target.value);
										}
										else {
											const position = attr[index].value.indexOf(event.target.value);
											attr[index].value.splice(position,1);
											//delete attr[index].value[position];
										} */

										setAttributes({ filtersConstructed: attr });
									}}
								/>
							propertyCheckboxes.push(checkbox);
						}

						var alias = attributes.selectAllCatAlias;

						if (typeof attributes.filtersConstructed[index].selectAllPropAlias !== 'undefined') {
							alias = attributes.filtersConstructed[index].selectAllPropAlias;
						}

						filtersConstructedHtml.push(
							<Card
								className="messia-card messia-filter property dropped saved"
								key={`${filter.by}-${filter.id}`}
								data-type="property"
								size="small">
								<div className="messia-card-content">
									<Flex
										gap={2}>
										<FlexItem className="move">&equiv;</FlexItem>
										<FlexItem className='heading'>{__('by Property', 'messia')}</FlexItem>
										<FlexItem className="remove" onClick={handlerRemove}></FlexItem>
									</Flex>
									<div className="settings">
										<div className="select-all-alias">
											<TextControl
												label={__('Set name for Select All option', 'messia')}
												className="alias"
												type='text'
												value={alias}
												onChange={(alias) => {
													let attr = attributes.filtersConstructed;
													delete attributes.filtersConstructed;
													attr[index].selectAllPropAlias = alias;
													setAttributes({ filtersConstructed: attr });
												}}
											/>
										</div>
										<div className="properties">{propertyCheckboxes}</div>
									</div>
								</div>
							</Card>
						);

						break;
				}
			}

			return filtersConstructedHtml;
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
							(tab) => <div data-title={__('Drop item here.', 'messia')} className="messia-drop-zone filters-constructed">{slots(tab)}</div>
						}
					</TabPanel>

					return (
						<Placeholder key="messia-block-placeholder">
							<div className="messia-block" key="messia-block" ref={blockRef}>
								<div className="filters-templates">{templates()}</div>
								{tabs}
							</div >
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
				path: 'messia/v1/block-search-snippet',
				method: 'POST',
				data: { currentAttrs: attributes }
			}).then(response => {

				if (response.terms.segment.length === 0) {
					wp.data.dispatch('core/notices').createNotice(
						'error', // Can be one of: success, info, warning, error.
						__('Messia Search Snippet: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'), // Text string to display.
						{
							isDismissible: true,
						}
					);
				}
				else {
					if (response.terms.category.length === 0) {
						wp.data.dispatch('core/notices').createNotice(
							'error', // Can be one of: success, info, warning, error.
							__('Messia Search Snippet Terms: No terms were found in taxonomy Category. Add some to use filter.', 'messia'), // Text string to display.
							{
								isDismissible: true,
							}
						);
					}
					if (response.terms.property.length === 0) {
						wp.data.dispatch('core/notices').createNotice(
							'error', // Can be one of: success, info, warning, error.
							__('Messia Search Snippet Terms: No terms were found in taxonomy Property. Add some to use filter.', 'messia'), // Text string to display.
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
					__('An error occurred while receiving data from the server for Search snippet block', 'messia'), // Text string to display.
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
							filtersConstructed: response.validAttrs.filtersConstructed
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
				$(blockRef.current).find('.filters-constructed').sortable('destroy');
			}

		}, [editMode]);

		useEffect(() => {

			if (filterDropped.length === 0) {
				return;
			}
			const categories = $(blockRef.current).find('.filters-constructed .messia-filter');
			saveSlots(categories);
		}, [filterDropped]);

		useEffect(() => {

			let observer = new MutationObserver((mutationsList, observer) => {

				for (const mutation of mutationsList) {
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length >= 1) {
							for (let i = 0; i < mutation.addedNodes.length; i++) {
								const tabArea = $(mutation.addedNodes[i]).find('.filters-constructed');
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

	registerBlockType('messia/block-search-snippet', {
		title: __('Search snippet', 'messia'),
		description: __('Constructor of search filters', 'messia'),
		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 8h-8v-1h8v1zm0 2h-8v-1h8v1zm-3 2h-5v-1h5v1zm11.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" /></svg>,
		category: 'messia',
		keywords: ['search'],
		styles: [],
		variations: [],
		attributes: {
			filtersConstructed: {
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
			selectAllCatAlias: {
				type: 'string',
				default: __('Select Category', 'messia'),
			},
			selectAllPropAlias: {
				type: 'string',
				default: __('Select Property', 'messia'),
			},

		},
		example: {
			attributes: {
				isExample: true,
			},
		},
		supports: {
			multiple: false,

		},
		edit: SnippetEditFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
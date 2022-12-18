(function (wp, $) {

	const { apiFetch } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { SelectControl, Notice, ToolbarGroup, ToolbarButton, Placeholder, Disabled, TextControl, Spinner, Flex, FlexItem, FlexBlock, RadioControl, __experimentalRadioGroup: RadioGroup, __experimentalRadio: Radio } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<rect fill="url(#svg_19)" height="136" id="svg_1" rx="4" ry="4" width="76" x="12.17499" y="14.5" />
		<circle cx="21.62499" cy="24.2" fill="#ffffff" id="svg_2" r="5.51153" />
		<rect fill="url(#svg_19)" height="136" id="svg_12" rx="4" ry="4" width="76" x="99.02499" y="14.5" />
		<circle cx="108.47499" cy="24.2" fill="#ffffff" id="svg_13" r="5.51153" />
		<rect fill="url(#svg_19)" height="136" id="svg_15" rx="4" ry="4" width="76" x="185.82499" y="14.5" />
		<circle cx="195.27499" cy="24.2" fill="#ffffff" id="svg_16" r="5.51153" />
		<defs>
			<linearGradient id="svg_19" x1="0.00262" x2="1" y1="0" y2="1">
				<stop offset="0" stopColor="#e8e8e8" stopOpacity="0.99609" />
				<stop offset="1" stopColor="#e0e0e0" stopOpacity="0.99609" />
			</linearGradient>
		</defs>
	</svg>;

	let lastPreview = false;

	function ObjectsFilteredFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState(false);

		let [rendered, setRendered] = useState(false);
		let blockRef = useRef();
		let selectCatRef = useRef();
		let selectPropRef = useRef();

		const getExample = () => {
			return exampleImageData;
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

				const block = wp.blocks.getBlockType(name);

				return (
					<Placeholder key="messia-block-placeholder">
						<div className="messia-block" key="messia-block" ref={blockRef}>
							<h4>{block.title}</h4>
							<Notice
								isDismissible={false}
								status="warning">
								<div>
									<div>{__('Build Your conditions for searching objects to find ones.', 'messia')}</div>
									<div>{__('Notes:', 'messia')}</div>
									<ul>
										<li>{__('the list of terms is subordinate to the value of the "Empty category terms" option.', 'messia')}</li>
										<li>{__('sorting by reviews could be disabled if theme option Site rating are On.', 'messia')}</li>
										<li>{__('set parameter Limit to 0 to unlimit number of objects.', 'messia')}</li>
									</ul>
								</div>
							</Notice>
							<Flex
								className="criteria"
								gap={5}>
								<FlexItem>
									<TextControl
										className="criteria-item"
										label={__('Number of objects', 'messia')}
										min='0'
										step='1'
										type='number'
										value={attributes.limit}
										onChange={(value) => {
											setAttributes({ limit: Number(value) });
										}}
									/>
								</FlexItem>
							</Flex>
							<Flex
								className="criteria"
								gap={5}>
								<FlexItem>
									<SelectControl
										className="criteria-item"
										label={__('Sort by:', 'messia')}
										value={attributes.orderBy}
										onChange={(slug) => {
											setAttributes({ orderBy: slug });
										}}
										options={terms.orderBy}
									/>
								</FlexItem>
								<FlexItem>
									<RadioGroup
										className="criteria-item"
										accessibilitylabel="Width"
										onChange={(value) => {
											setAttributes({ orderDir: value });
										}}
										checked={attributes.orderDir}>
										<div>{__('Sort direction:', 'messia')}</div>
										<Radio value="ASC">{__('Ascending', 'messia')}</Radio>
										<Radio value="DESC">{__('Descending', 'messia')}</Radio>
										<Radio value="RND">{__('Random', 'messia')}</Radio>
									</RadioGroup>
								</FlexItem>
							</Flex>
							<Flex
								className="conditions"
								justify="start"
								align="left"
								gap={0}>
								<SelectControl
									className="condition-item"
									label={__('Belongs to Segment:', 'messia')}
									value={attributes.segment}
									onChange={(slug) => {
										setAttributes({ segment: slug });
									}}
									options={terms.segment}
								/>
								<FlexBlock>
									<div ref={selectCatRef}>
										<SelectControl
											multiple
											className="condition-item"
											label={__('AND Belongs to Categories:', 'messia')}
											value={attributes.category}
											onChange={(slug) => {
												setAttributes({ category: slug });
											}}
											options={terms.category}
										/>
									</div>
								</FlexBlock>
								<FlexBlock>
									<div ref={selectPropRef}>
										<SelectControl
											multiple
											className="condition-item"
											label={__('AND Having Properties:', 'messia')}
											value={attributes.property}
											onChange={(slug) => {
												setAttributes({ property: slug });
											}}
											options={terms.property}
										/>
									</div>
								</FlexBlock>
								<Flex>
									<FlexItem>
										<RadioGroup
											className="condition-item"
											accessibilitylabel="Width"
											onChange={(value) => {
												setAttributes({ isFeatured: parseInt(value) });
											}}
											checked={attributes.isFeatured.toString()}>
											<div>{__('Marked as featured:', 'messia')}</div>
											<Radio value="1">{__('Yes', 'messia')}</Radio>
											<Radio value="-1">{__('No', 'messia')}</Radio>
											<Radio value="0">{__('Any', 'messia')}</Radio>
										</RadioGroup>
									</FlexItem>
									<FlexItem>
										<RadioControl
											label={__('Split cards to columns by:', 'messia')}
											selected={attributes.columns}
											options={[
												{ label: __('Three', 'messia'), value: 3 },
												{ label: __('Four', 'messia'), value: 4 },
											]}
											onChange={(value) => {
												setAttributes({ columns: parseInt(value) });
											}}
										/>
									</FlexItem>
								</Flex>
							</Flex>
						</div>
					</Placeholder>
				);
			}
			else {
				return (
					<Placeholder key="messia-block-placeholder">
						<div className="messia-block" tabIndex="0" key="messia-block" ref={blockRef}>
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
							block={props.name}
							attributes={attributes}
							urlQueryArgs={{ isPreview: true }}
						/>
					</Disabled>
				</div>
			);
		}

		const getTerms = async () => {

			return await apiFetch({
				path: 'messia/v1/block-objects-filtered',
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

				return response;

			}).catch((e) => {
				wp.data.dispatch('core/notices').createNotice(
					'error', // Can be one of: success, info, warning, error.
					__('An error occurred while receiving data from the server for Object Filtered block', 'messia'), // Text string to display.
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

				let classes = [className];
				const render = [
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

						if (attributes.segment === '') {
							attributes.segment = response.terms.segment[0].value;
						}

						setTerms(response.terms);
						setTermsFetched(true);
						setRendered(true);

						setAttributes(attributes);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		useEffect(() => {
			if (rendered || editMode) {
				$(selectCatRef.current).find('select').select2({
					placeholder: __('Any / None category', 'messia'),
				}).on('change', (event) => {
					let slug = $(event.currentTarget).val();
					if (slug === null) {
						slug = [];
					}
					setAttributes({ category: slug });
				});
				$(selectPropRef.current).find('select').select2({
					placeholder: __('Any / None property', 'messia'),
				}).on('change', (event) => {
					let slug = $(event.currentTarget).val();
					if (slug === null) {
						slug = [];
					}
					setAttributes({ property: slug });
				});;
			}

		}, [rendered, editMode]);

		return render();
	}

	registerBlockType('messia/block-objects-filtered', {
		title: __('Objects by filters', 'messia'),
		description: __('Terms of taxonomy Category by parameters', 'messia'),
		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z" /></svg>,
		category: 'messia',
		keywords: ['object'],
		styles: [],
		variations: [],
		attributes: {
			segment: {
				type: 'string',
				default: '',
			},
			category: {
				type: 'array',
				default: [],
			},
			property: {
				type: 'array',
				default: [],
			},
			isFeatured: {
				type: 'integer',
				default: 0,
				enum: [-1, 0, 1]
			},
			isExample: {
				type: 'boolean',
				default: false,
			},
			limit: {
				type: 'integer',
				default: 4,
			},
			columns: {
				type: 'integer',
				default: 4,
				enum: [3, 4],
			},
			orderBy: {
				type: 'string',
				default: 'post_date',
				enum: ['post_date', 'post_title', 'rating', 'reviews'],
			},
			orderDir: {
				type: 'string',
				default: 'ASC',
				enum: ['ASC', 'DESC', 'RND'],
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
		edit: ObjectsFilteredFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
(function (wp, $) {

	const { apiFetch, apiRequest } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls, InnerBlocks, useBlockProps } = wp.blockEditor;
	const { SelectControl, ToggleControl, Notice, ToolbarGroup, ToolbarButton, Placeholder, Disabled, TextControl, Spinner, RangeControl, Flex, FlexItem, FlexBlock, __experimentalRadioGroup: RadioGroup, __experimentalRadio: Radio } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<ellipse cx="137" cy="82.5" fill="#cccccc" id="svg_3" rx="49.5" ry="49.5" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="null" />
		<text fill="#000000" fontFamily="serif" fontSize="24" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="0" textAnchor="middle" transform="matrix(2.17559 0 0 2.17559 -137.872 -97.7079)" x="126.497" y="89.41434">{`{S}`}</text>
	</svg>

	let lastPreview = false;

	function SegmentWrapperFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [rendered, setRendered] = useState(false);
		const [terms, setTerms] = useState({
			segment: [],
		});

		let blockRef = useRef();
		let selectSegmentsRef = useRef();

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
				if (terms.segment.length > 0) {
					const block = wp.blocks.getBlockType(name);

					return (
						<Placeholder key="messia-block-placeholder">
							<div className="messia-block" key="messia-block" ref={blockRef}>
								<Fragment key='tip'>
									<h4>{block.title}</h4>
									<Notice
										isDismissible={false}
										status="warning">
										<p>{__('Add any inner blocks and specify the segments. The content of the block will be displayed only if the currently viewed object or listing page belongs to the segments specified in the settings.', 'messia')}</p>
									</Notice>
								</Fragment>
								<div ref={selectSegmentsRef}>
									<SelectControl
										multiple
										className="criteria-item"
										label={__('Wrap in segments:', 'messia')}
										value={attributes.forSegments}
										onChange={(value) => {
											setAttributes({ forSegments: value });
										}}
										options={terms.segment}
									/>
									<InnerBlocks />
								</div>
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
				path: 'messia/v1/block-segment-wrapper',
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

						setAttributes({
							forSegments: response.validAttrs.forSegments
						});
						setTerms(response.terms);
						setTermsFetched(true);
						setRendered(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		useEffect(() => {

			if (!rendered || !editMode) return;

			$(selectSegmentsRef.current).find('select').select2({
				width: '100%',
				placeholder: __('Any', 'messia'),
				closeOnSelect: false,
			}).on('change', (event) => {
				let slug = $(event.currentTarget).val();
				if (slug === null) {
					slug = [];
				}
				setAttributes({ forSegments: slug });
			});
		}, [rendered, editMode]);

		return render();
	}

	registerBlockType('messia/block-segment-wrapper', {
		title: __('Segment wrapper', 'messia'),
		description: __('Show block content only for certain segment', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="m0,0l24,0l0,24l-24,0l0,-24z" /><path d="m4,19l6,0l0,-2l-6,0l0,2zm16,-14l-16,0l0,2l16,0l0,-2zm-3,6l-13,0l0,2l13.25,0c1.1,0 2,0.9 2,2s-0.9,2 -2,2l-2.25,0l0,-2l-3,3l3,3l0,-2l2,0c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4z" /></svg>,
		category: 'messia',
		keywords: ['wrapper'],
		styles: [],
		variations: [],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
			},
			forSegments: {
				type: 'array',
				default: [],
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
		edit: SegmentWrapperFn,
		save: function (props) {
			const blockProps = useBlockProps.save();

			return <InnerBlocks.Content />;
			return null;
		},
	});

}(window.wp, jQuery));
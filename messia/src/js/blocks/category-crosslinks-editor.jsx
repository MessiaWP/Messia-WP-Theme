(function (wp, $) {

	const { apiFetch } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { InspectorControls, BlockControls } = wp.blockEditor;
	const { ToggleControl, Notice, ToolbarGroup, ToolbarButton, Placeholder, Disabled, Spinner, CheckboxControl, TextControl, PanelBody } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<g className="layer">
			<g id="svg_101">
				<g id="svg_62">
					<g id="svg_60"><rect fill="#b4b4b4" height="10.04621" id="svg_61" rx="1" ry="1" width="70.99803" x="189.41868" y="11.72411" /></g>
					<g id="svg_58"><rect fill="#cccccc" height="7.09031" id="svg_59" rx="1" ry="1" width="60.81659" x="199.60011" y="26.97224" /></g>
					<g id="svg_56"><rect fill="#cccccc" height="7.09031" id="svg_57" rx="1" ry="1" width="60.81659" x="199.60011" y="38.47713" /></g>
				</g>
				<g id="svg_64">
					<g id="svg_9"><rect fill="#b4b4b4" height="10.04621" id="svg_12" rx="1" ry="1" width="70.99803" x="12.12814" y="11.72411" /></g>
					<g id="svg_34"><rect fill="#cccccc" height="7.09031" id="svg_35" rx="1" ry="1" width="60.81659" x="22.30957" y="26.1909" /></g>
					<g id="svg_36"><rect fill="#cccccc" height="7.09031" id="svg_37" rx="1" ry="1" width="60.81659" x="22.30957" y="37.52457" /></g>
					<g id="svg_38"><rect fill="#cccccc" height="7.09031" id="svg_39" rx="1" ry="1" width="60.81659" x="22.30957" y="48.90706" /></g>
				</g>
				<g id="svg_98">
					<g id="svg_46"><rect fill="#b4b4b4" height="10.04621" id="svg_47" rx="1" ry="1" width="70.99803" x="100.43124" y="11.72411" /></g>
					<g id="svg_44"><rect fill="#cccccc" height="7.09031" id="svg_45" rx="1" ry="1" width="60.81659" x="110.61267" y="27.19169" /></g>
					<g id="svg_42"><rect fill="#cccccc" height="7.09031" id="svg_43" rx="1" ry="1" width="60.81659" x="110.61267" y="39.08724" /></g>
					<g id="svg_40"><rect fill="#cccccc" height="7.09031" id="svg_41" rx="1" ry="1" width="60.81659" x="110.61267" y="50.8604" /></g>
					<g id="svg_50"><rect fill="#cccccc" height="7.09031" id="svg_51" rx="1" ry="1" width="60.81659" x="110.61267" y="62.70368" /></g>
				</g>
				<g id="svg_67">
					<g id="svg_68"><rect fill="#b4b4b4" height="10.04621" id="svg_69" rx="1" ry="1" width="70.99803" x="12.12814" y="93.93662" /></g>
					<g id="svg_70"><rect fill="#cccccc" height="7.09031" id="svg_71" rx="1" ry="1" width="60.81659" x="22.30957" y="109.18475" /></g>
					<g id="svg_72"><rect fill="#cccccc" height="7.09031" id="svg_73" rx="1" ry="1" width="60.81659" x="22.30957" y="120.68963" /></g>
				</g>
				<g id="svg_87">
					<g id="svg_88"><rect fill="#b4b4b4" height="10.04621" id="svg_89" rx="1" ry="1" width="70.99803" x="189.41869" y="93.93662" /></g>
					<g id="svg_90"><rect fill="#cccccc" height="7.09031" id="svg_91" rx="1" ry="1" width="60.81659" x="199.60012" y="108.40341" /></g>
					<g id="svg_92"><rect fill="#cccccc" height="7.09031" id="svg_93" rx="1" ry="1" width="60.81659" x="199.60012" y="119.73707" /></g>
					<g id="svg_94"><rect fill="#cccccc" height="7.09031" id="svg_95" rx="1" ry="1" width="60.81659" x="199.60012" y="131.11957" /></g>
				</g>
				<g id="svg_96">
					<g id="svg_75"><rect fill="#b4b4b4" height="10.04621" id="svg_76" rx="1" ry="1" width="70.99803" x="101.4928" y="93.93662" /></g>
					<g id="svg_77"><rect fill="#cccccc" height="7.09031" id="svg_78" rx="1" ry="1" width="60.81659" x="111.67424" y="109.40419" /></g>
					<g id="svg_79"><rect fill="#cccccc" height="7.09031" id="svg_80" rx="1" ry="1" width="60.81659" x="111.67424" y="121.29974" /></g>
					<g id="svg_81"><rect fill="#cccccc" height="7.09031" id="svg_82" rx="1" ry="1" width="60.81659" x="111.67424" y="133.07291" /></g>
					<g id="svg_83"><rect fill="#cccccc" height="7.09031" id="svg_84" rx="1" ry="1" width="60.81659" x="111.67424" y="144.91618" /></g>
				</g>
			</g>
		</g>
	</svg>;

	let lastPreview = false;

	function CategoryCrosslinksFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState({
			segment: []
		});

		let blockRef = useRef();

		const getInspectorControls = () => {

			return (
				<InspectorControls key='inspector'>
					<PanelBody title={__('Settings', 'messia')} >
						<TextControl
							label={__('Visible', 'messia')}
							min='0'
							step='1'
							type='number'
							value={attributes.initVisibleInGroup}
							help={__('Initially visible numbers of items per group. Set 0 for unlimited.', 'messia')}
							onChange={(value) => {
								setAttributes({ initVisibleInGroup: parseInt(value) });
							}}
						/>
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
								setAttributes({ isPreview: editMode });
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
				const segmentCheckboxes = [];

				for (const [indexSegment, segment] of terms.segment.entries()) {
					segmentCheckboxes.push(

						<CheckboxControl
							key={segment.value}
							value={segment.value}
							label={segment.label}
							checked={attributes.segmentTerms.includes(segment.value)}
							onChange={(checked) => {

								let attr = attributes.segmentTerms;
								delete attributes.segmentTerms;

								// Rewrite all array with checked
								attr = [];
								var checked = $(event.target).parents('.settings').find('input[type="checkbox"]:checked');

								for (var i = 0; i < checked.length; i++) {
									attr.push($(checked[i]).val());
								}

								/* Another approach - change only changed element
								if (checked) {
									attr.push(event.target);
								}
								else {
									const position = attr.indexOf(event.target);
									attr.splice(position,1);
									//delete attr[position];
								} */

								setAttributes({ segmentTerms: attr });
							}}
						/>

					);
				}

				return (
					<Placeholder key="messia-block-placeholder">
						<div className="messia-block" key="messia-block" ref={blockRef}>
							<h4>{block.title}</h4>
							<Notice
								isDismissible={false}
								status="warning">
								<p>{__('Specify the segment of the category, terms for which will be displayed as links to the search page for them. The set will contain only top-level terms (that have no parent) and their direct descendants. The list of terms is subordinate to the value of the "Empty category terms" option. Certain terms can be excluded from the set on term edit page.', 'messia')}</p>
							</Notice>
							<div className="settings">{segmentCheckboxes}</div>
						</div>
					</Placeholder>
				);
			}
			else {
				return (
					<div className="messia-block" tabIndex="0" key="messia-block" ref={blockRef}>
						<Spinner />
					</div>
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
				path: 'messia/v1/block-category-crosslinks',
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

		const getExample = () => {
			return exampleImageData;
		}

		const render = () => {

			if (attributes.isExample) {
				return getExample();
			}
			else {

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
							segmentTerms: response.validAttrs.segmentTerms,
							initVisibleInGroup: response.validAttrs.initVisibleInGroup
						});
						setTerms(response.terms);
						setTermsFetched(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		return render();
	}

	registerBlockType('messia/block-category-crosslinks', {
		title: __('Category crosslinks', 'messia'),
		description: __('Taxonomy term reference cloud Categories that include all zero-level terms and their direct descendants', 'messia'),
		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 2c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm15 9c.552 0 1 .448 1 1s-.448 1-1 1-1-.449-1-1c0-.552.448-1 1-1zm-15 9c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-20c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm15 9c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-15 9c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm4.588-16.979l.412-.021c4.281 0 7.981 2.45 9.8 6.021-.717.029-1.39.21-1.998.511-1.555-2.703-4.466-4.532-7.802-4.532 0-.703-.149-1.372-.412-1.979zm10.212 15.958c-1.819 3.571-5.519 6.021-9.8 6.021l-.412-.021c.263-.607.412-1.276.412-1.979 3.336 0 6.247-1.829 7.802-4.532.608.302 1.281.483 1.998.511zm-18.91 1.186c-1.193-1.759-1.89-3.88-1.89-6.165s.697-4.406 1.89-6.165c.392.566.901 1.039 1.487 1.403-.867 1.383-1.377 3.012-1.377 4.762s.51 3.379 1.377 4.762c-.586.364-1.096.837-1.487 1.403z" /></svg>,
		category: 'messia',
		keywords: ['crosslink'],
		styles: [],
		variations: [],
		attributes: {
			segmentTerms: {
				type: 'array',
				default: [],
			},
			isExample: {
				type: 'boolean',
				default: false,
			},
			initVisibleInGroup: {
				type: 'integer',
				default: 4,
			},
			withCount: {
				type: 'boolean',
				default: true,
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
		edit: CategoryCrosslinksFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
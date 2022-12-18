(function (wp, $) {

	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup, ToolbarButton, Placeholder, Disabled, Notice, __experimentalInputControl: InputControl } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<path d="m127.03842,33.42546c-20.95784,0 -37.99545,17.03761 -37.99545,37.99545c0,20.95784 17.03761,37.99545 37.99545,37.99545c8.29727,0 15.95619,-2.70197 22.21057,-7.2289l29.38711,29.38709l6.32092,-6.32092l-29.11645,-29.11647c5.71456,-6.65052 9.19329,-15.27632 9.19329,-24.71624c0,-20.95784 -17.03761,-37.99545 -37.99545,-37.99545zm0,4.47005c18.54205,0 33.5254,14.98335 33.5254,33.5254c0,18.54205 -14.98335,33.5254 -33.5254,33.5254c-18.54205,0 -33.5254,-14.98335 -33.5254,-33.5254c0,-18.54205 14.98335,-33.5254 33.5254,-33.5254zm-17.88021,29.05534a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005zm17.88021,0a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005zm17.88021,0a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005z" fill="black" id="svg_1" />
	</svg>;

	let lastPreview = false;

	function SiteWideSearchFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);

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

			const block = wp.blocks.getBlockType(name);

			return (
				<Placeholder key="messia-block-placeholder">
					<div className="messia-block" key="messia-block">
						<h4>{block.title}</h4>
						<div>
							<InputControl
								label={__('Title:', 'messia')}
								labelPosition='top'
								value={attributes.title}
								onChange={(nextValue) => {
									return setAttributes({ title: nextValue });
								}}
							/>
						</div>
					</div>
				</Placeholder>
			);
		}

		const getBlockPreview = () => {

			return (
				<div className="messia-block" key="messia-block">
					<Disabled key="block-preview">
						<ServerSideRender
							block={props.name}
							attributes={attributes}
							urlQueryArgs={{
								isPreview: wp.data.select("core/edit-widgets").getWidgetAreaForWidgetId(attributes.__internalWidgetId).id,
							}}
						/>
					</Disabled>
				</div>
			);
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

		return render();
	}

	registerBlockType('messia/block-sitewide-search', {
		title: __('Sitewide search', 'messia'),
		description: __('Search form that provides search accross hole site.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m2.19892,1.45842c-0.81653,0 -1.48101,0.66448 -1.48101,1.48101l0,14.81009c0,0.81653 0.66448,1.48101 1.48101,1.48101l9.51182,0c-0.22215,-0.30854 -0.41519,-0.63831 -0.57563,-0.98734l-8.93619,0c-0.27251,0 -0.49367,-0.22166 -0.49367,-0.49367l0,-12.34174l18.75945,0l0,5.96068c0.3742,0.3357 0.70842,0.71378 0.98734,1.1339l0,-9.56292c0,-0.81653 -0.66448,-1.48101 -1.48101,-1.48101l-17.77211,0zm0.49367,1.48101c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm1.48101,0c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm1.48101,0c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm10.86073,7.89871c-2.72061,0 -4.9367,2.21608 -4.9367,4.9367c0,2.72061 2.21608,4.9367 4.9367,4.9367c1.18308,0 2.26959,-0.42012 3.12111,-1.11751l2.94755,2.94755l0.69808,-0.69808l-2.94755,-2.94755c0.69739,-0.85152 1.11751,-1.93803 1.11751,-3.12111c0,-2.72061 -2.21608,-4.9367 -4.9367,-4.9367zm0,0.98734c2.18702,0 3.94936,1.76234 3.94936,3.94936c0,2.18702 -1.76234,3.94936 -3.94936,3.94936c-2.18702,0 -3.94936,-1.76234 -3.94936,-3.94936c0,-2.18702 1.76234,-3.94936 3.94936,-3.94936z" fill="black" /></g></svg>,
		category: 'messia',
		keywords: ['object'],
		styles: [],
		variations: [],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
			},
			title: {
				type: 'string',
				default: '',
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
		edit: SiteWideSearchFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
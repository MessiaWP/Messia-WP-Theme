(function (wp, $) {

	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup, ToolbarButton, Placeholder, Disabled, Notice, __experimentalInputControl: InputControl } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<g>
			<rect fill="#7f7f7f" height="28" id="svg_2" rx="2" ry="2" width="28" x="29.375" y="20.32813"/>
			<rect fill="#7f7f7f" height="10.5" id="svg_3" rx="4" ry="4" width="175.5" x="68.625" y="29.07813"/>
			<rect fill="#cccccc" height="20" id="svg_4" rx="2" ry="2" width="20" x="70.5" y="62.67188"/>
			<rect fill="#cccccc" height="10.5" id="svg_5" rx="4" ry="4" width="139" x="105.625" y="67.42188"/>
			<rect fill="#cccccc" height="20" id="svg_6" rx="2" ry="2" width="20" x="70.5" y="93.17188"/>
			<rect fill="#cccccc" height="10.5" id="svg_7" rx="4" ry="4" width="139" x="105.625" y="97.92188"/>
			<rect fill="#cccccc" height="20" id="svg_8" rx="2" ry="2" width="20" x="70.5" y="124.67188"/>
			<rect fill="#cccccc" height="10.5" id="svg_9" rx="4" ry="4" width="139" x="105.625" y="129.42188"/>
		</g>
	</svg>;

	let lastPreview = false;

	function ObjectPropertiesFn(props) {

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
						<Notice
							isDismissible={false}
							status="warning">
							<p>{__('Notes: Block works only at valid object page.', 'messia')}</p>
						</Notice>
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
							urlQueryArgs={{ isPreview: true }}
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

	registerBlockType('messia/block-object-properties', {
		title: __('Object Properties', 'messia'),
		description: __('The list of properties that object belongs to.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 12.0001 12)"><rect fill="black" height="6.58042" rx="1" ry="1" width="6.58042" x="3.93162" y="3.93631" /><rect fill="black" height="6.58042" rx="1" ry="1" width="6.58042" x="13.488" y="13.48335" /><rect fill="black" height="6.58042" id="svg_16" rx="1" ry="1" width="6.58042" x="13.35202" y="3.94675" /><rect fill="black" height="6.58042" rx="1" ry="1" width="6.58042" x="3.99645" y="13.45616" /></g></svg>,
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
		edit: ObjectPropertiesFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
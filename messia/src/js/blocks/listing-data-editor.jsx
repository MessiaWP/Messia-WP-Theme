(function (wp, $) {

	const { registerBlockType } = wp.blocks;
	const { Component } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { InspectorControls, BlockControls } = wp.blockEditor;
	const { Notice, ToolbarGroup, ToolbarButton, Placeholder, Disabled, RadioControl, PanelBody, __experimentalInputControl: InputControl, __experimentalSpacer: Spacer } = wp.components;
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

	class Listing extends Component {
		constructor(props) {
			super(props);

			this.state = {
				editMode: true,
				terms: {
					segment: [],
				},
				termsFetched: false,
			}

			this.lastPreview = false;
			this.blockRef = React.createRef();
		}

		getInspectorControls() {
			const { attributes, setAttributes } = this.props;

			return (
				<InspectorControls key='inspector'>
					<PanelBody title={__('Settings', 'messia')} >
						<RadioControl
							label={__('Split cards to columns in grid view mode by:', 'messia')}
							selected={attributes.columns}
							options={[
								{ label: __('Two', 'messia'), value: 2 },
								{ label: __('Three', 'messia'), value: 3 },
							]}
							onChange={(value) => {
								setAttributes({ columns: parseInt(value) });
							}}
						/>
					</PanelBody>
				</InspectorControls>
			);
		}

		getBlockControls() {

			return (
				<BlockControls key="block">
					<ToolbarGroup
						label={__('Options', 'messia')}>
						<ToolbarButton
							label={this.state.editMode ? __('Preview', 'messia') : __('Edit', 'messia')}
							icon={this.state.editMode ? "visibility" : "edit"}
							onClick={() => {
								this.setState({
									editMode: !this.state.editMode,
								})
							}}
						/>
					</ToolbarGroup>
				</BlockControls>
			);
		}

		getBlockEdit() {

			const block = wp.blocks.getBlockType(this.props.name);
			const { attributes, setAttributes } = this.props;

			return (
				<Placeholder key="messia-block-placeholder">
					<div className="messia-block" key="messia-block" ref={this.blockRef}>
						<h4>{block.title}</h4>
						<Notice
							isDismissible={false}
							status="warning">
							<p>{__('The block creates the main content of the search page and handles search queries.', 'messia')}</p>
						</Notice>
						<Spacer>
							<InputControl
								label={__('Block title:', 'messia')}
								labelPosition='top'
								value={attributes.blockTitle}
								onChange={(nextValue) => {
									setAttributes({ blockTitle: nextValue });
								}}
							/>
						</Spacer>
					</div>
				</Placeholder>
			);
		}

		getBlockPreview() {

			return (
				<Disabled key="block-preview">
					<div className="messia-block" tabIndex="0" key="messia-block" ref={this.blockRef}>
						<Notice
							isDismissible={false}
							status="warning">
							<p>{__('Preview is too complex and too big to show here. Open the page in front to see results.', 'messia')}</p>
						</Notice>
					</div>
				</Disabled>
			);
		}

		render() {
			const { attributes } = this.props;
			const { className } = this.props;
			const { isExample } = attributes;

			if (isExample) {
				return exampleImageData;
			}
			else {

				let classes = [className];
				const render = [
					this.getInspectorControls(),
					this.getBlockControls(),
				];

				if (this.state.editMode) {
					render.push(this.getBlockEdit());
					this.lastPreview = false;
				}
				else if (!this.lastPreview) {
					this.lastPreview = this.getBlockPreview();
					render.push(this.lastPreview);
				}
				else {
					render.push(this.lastPreview);
				}

				return <div className={classes.join(' ')}>{render}</div>;
			}
		}
	}

	registerBlockType('messia/block-listing-data', {
		title: __('Listing data', 'messia'),
		description: __('Creates the main content of the search page and handles search queries.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" /></svg>,
		category: 'messia',
		keywords: ['listing'],
		styles: [],
		variations: [],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
			},
			blockTitle: {
				type: 'string',
				default: '',
			},
			columns: {
				type: 'integer',
				default: 3,
				enum: [2, 3],
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
		edit: Listing,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
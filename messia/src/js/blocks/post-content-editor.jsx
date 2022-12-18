(function (wp, $) {

	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup, ToolbarButton, Placeholder, Disabled, Notice, __experimentalInputControl: InputControl } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<text fill="#666666" fontFamily="serif" fontSize="84" id="svg_1" stroke="#666666" strokeWidth="0" textAnchor="middle" x="57.87239" y="81.27083">T</text>
		<line fill="none" id="svg_2" stroke="#666666" strokeLinecap="round" strokeWidth="5" x1="107.45704" x2="241.79557" y1="28.53125" y2="28.53125" />
		<line fill="none" id="svg_6" stroke="#666666" strokeLinecap="round" strokeWidth="5" x1="36.45704" x2="241.79557" y1="103.53125" y2="103.53125" />
		<line fill="none" id="svg_11" stroke="#666666" strokeLinecap="round" strokeWidth="5" x1="107.45704" x2="241.79557" y1="66.06511" y2="66.06511" />
		<line fill="none" id="svg_12" stroke="#666666" strokeLinecap="round" strokeWidth="5" x1="36.45704" x2="241.79557" y1="140.0651" y2="140.0651" />
	</svg>;

	let lastPreview = false;

	function PostContentFn(props) {

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
							<p>{__('Notes: Block will display the content of the current post.', 'messia')}</p>
						</Notice>
					</div>
				</Placeholder>
			);
		}

		const getBlockPreview = () => {

			return (
				<Disabled key="block-preview">
					<div className="messia-block" tabIndex="0" key="messia-block" ref={this.blockRef}>
						<Notice
							isDismissible={false}
							status="warning">
							<p>{__('Preview is impossible from admin side.', 'messia')}</p>
						</Notice>
					</div>
				</Disabled>
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

	registerBlockType('messia/block-post-content', {
		title: __('Post content', 'messia'),
		description: __('Outputs the content of the currently viewed post/page/object.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m2.93333,0.41481l0,23.17037l18.13333,0l0,-16.82685l-0.14167,-0.15741l-6.04444,-6.04444l-0.15741,-0.14167l-11.78982,0zm1.00741,1.00741l10.07407,0l0,4.02963l-7.05185,0l0,1.00741l7.05185,0l0,1.00741l6.04444,0l0,15.11111l-16.11852,0l0,-21.15556zm11.08148,0.72407l4.31296,4.31296l-4.31296,0l0,-4.31296zm-8.05926,8.34259l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0zm-3.52593,3.02222l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0zm-3.52593,3.02222l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0z" fill="black" /></svg>,
		category: 'messia',
		keywords: ['object'],
		styles: [],
		variations: [],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
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
		edit: PostContentFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
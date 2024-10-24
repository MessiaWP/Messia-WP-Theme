(function (wp, $) {

	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup, ToolbarButton, Placeholder, Disabled, Notice, __experimentalInputControl: InputControl, __experimentalSpacer: Spacer } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<g>
			<path d="m118.9118,36.05693c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-20.19264,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.05521 -1.97983,1.00174 -1.9246,2.11393c0.05521,1.11217 1.00174,1.97981 2.11391,1.9246l20.19264,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l50.4816,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-50.4816,0zm24.23117,24.23117c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-56.53939,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.05521 -1.97983,1.00174 -1.9246,2.11393c0.05521,1.11217 1.00174,1.97981 2.11391,1.9246l56.53939,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l14.13485,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-14.13485,0zm-54.52013,24.23117c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-14.13485,0c-0.0631,0 -0.1262,0 -0.18931,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.10254 -1.9325,1.0964 -1.82996,2.20857c0.10254,1.11217 1.0964,1.9325 2.20857,1.82996l14.13485,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l56.53939,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-56.53939,0z" fill="black" />
		</g>
	</svg>;

	let lastPreview = false;

	function SearchFiltersFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);

		let filtersRef = useRef();

		const idNameMap = {
			'messia_reset': __('Reset', 'messia'),
			'messia_search': __('Search', 'messia'),
			'messia_constructor': __('Custom fields', 'messia'),
			'messia_object_category': __('Categories', 'messia'),
			'messia_object_property': __('Properties', 'messia'),
		}

		const getExample = () => {
			return exampleImageData;
		}

		const sortableInit = () => {

			$(filtersRef.current).not('ui-sortable').sortable({
				forceHelperSize: true,
				forcePlaceholderSize: true,
				opacity: 1,
				//distance: 10,
				tolerance: 'intersect',
				//cursor: 'grabbig',
				scroll: true,
				scrollSensitivity: 20,
				containment: '.edit-widgets-block-editor',
				placeholder: 'sortable-placeholder',
				handle: '.reorder-filter',
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
					saveOrder();
				},
			});
		}

		const saveOrder = () => {

			const
				store = [],
				filters = $(filtersRef.current).find('.search-filter');

			for (let i = 0; i < filters.length; i++) {
				const
					filter = $(filters[i]),
					filterAttr = attributes.filtersOrder.find((item) => item.id === filter.attr('id'));

				store.push(filterAttr);
			}

			setAttributes({ filtersOrder: store });
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
							<p>{__('Notes: Block works only at valid segment page.', 'messia')}</p>
						</Notice>
						<div>
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
						<div className="filters-order-wrapper">
							<h3>{__('Order of filter groups:', 'messia')}</h3>
							<div className="filters-order-drop-zone" ref={filtersRef}>
								{attributes.filtersOrder.map((item, index) => (
									<div key={item.id} id={item.id} className="search-filter">
										<div className="search-filter-inner">
											<div className="reorder-filter">&equiv;</div>
											<div>{idNameMap[item.id]}</div>
											<InputControl
												label={__('Title:', 'messia')}
												labelPosition='left'
												value={item.title}
												onChange={(nextValue) => {
													let nextAttr = attributes.filtersOrder.map((filter) => {
														if (filter.id === item.id) {
															filter.title = nextValue;
														}
														return filter;
													});
													setAttributes({ filtersOrder: nextAttr });
												}}
											/>
										</div>
									</div>
								))}
							</div>
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

		useEffect(() => {
			sortableInit();
		}, [editMode]);

		return render();
	}

	registerBlockType('messia/block-listing-filters', {
		title: __('Listing filters', 'messia'),
		description: __('Set of filters coordinated on the basis of data categories and properties of the site', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m10.26818,0.68033c-0.23253,0 -0.43057,0.16886 -0.46806,0.39855l-0.45323,2.77778c-0.56851,0.16324 -1.11543,0.38776 -1.63126,0.67012l-2.29211,-1.63775c-0.1884,-0.13477 -0.448,-0.11367 -0.61172,0.05005l-1.84537,1.84444c-0.16277,0.16277 -0.18523,0.41962 -0.05283,0.60802l1.61273,2.30694c-0.28663,0.51963 -0.5156,1.06915 -0.68216,1.64146l-2.76666,0.46157c-0.22873,0.03796 -0.39669,0.23508 -0.39669,0.46714l0,2.61002c0,0.23016 0.16477,0.42727 0.39113,0.46713l2.76759,0.49123c0.16562,0.57041 0.39364,1.1204 0.68216,1.64146l-1.63311,2.28377c-0.13477,0.18887 -0.11274,0.44753 0.05098,0.61173l1.84444,1.84722c0.16324,0.16324 0.42104,0.18476 0.60802,0.05283l2.31157,-1.61828c0.51963,0.28568 1.06696,0.51148 1.63404,0.67567l0.46343,2.78149c0.03796,0.22873 0.23508,0.39669 0.46714,0.39669l2.61002,0c0.22968,0 0.4268,-0.16477 0.46713,-0.39113l0.1242,-0.70163c-0.30086,-0.21972 -0.57893,-0.46677 -0.83139,-0.73963l-0.15756,0.88329l-1.80922,0l-0.44767,-2.68695c-0.03085,-0.18745 -0.16994,-0.33723 -0.35406,-0.38279c-0.68383,-0.16847 -1.33895,-0.43913 -1.94732,-0.80358c-0.16135,-0.09681 -0.36345,-0.08964 -0.51626,0.01761l-2.23187,1.5636l-1.27906,-1.27998l1.57658,-2.20591c0.1101,-0.15423 0.11862,-0.35952 0.02039,-0.52182c-0.36778,-0.6079 -0.64156,-1.26526 -0.81193,-1.95288c-0.04556,-0.18175 -0.19356,-0.31994 -0.37816,-0.35221l-2.67212,-0.47362l0,-1.81014l2.67027,-0.44489c0.1865,-0.03085 0.33676,-0.16996 0.38279,-0.35313c0.17321,-0.69142 0.44557,-1.34783 0.81192,-1.95288c0.09728,-0.16087 0.09057,-0.36435 -0.01668,-0.51811l-1.55897,-2.22909l1.27999,-1.27906l2.2124,1.58121c0.15328,0.1101 0.35767,0.11955 0.51996,0.02132c0.60315,-0.36208 1.25873,-0.63094 1.94825,-0.79988c0.18507,-0.04556 0.32414,-0.19672 0.35499,-0.38464l0.43747,-2.68324l1.80829,0l0.47177,2.69807c0.03227,0.18507 0.16998,0.33352 0.35221,0.37908c0.68383,0.17036 1.33765,0.44329 1.94176,0.80821c0.16277,0.09871 0.36804,0.08973 0.52275,-0.02132l2.21981,-1.59604l1.27906,1.27813l-1.58121,2.25411c-0.1082,0.15328 -0.11487,0.35539 -0.01854,0.51626c0.36018,0.59936 0.62856,1.25011 0.79988,1.93156c0.04603,0.18413 0.19719,0.32276 0.38464,0.35313l2.70827,0.44303l0,1.80829l-0.88514,0.15478c0.27381,0.25293 0.52177,0.53188 0.74148,0.83417l0.69978,-0.12327c0.22731,-0.03986 0.39206,-0.23698 0.39206,-0.46714l0,-2.61002c0,-0.23253 -0.16886,-0.43057 -0.39855,-0.46806l-2.80374,-0.45879c-0.16467,-0.56282 -0.38871,-1.10347 -0.67012,-1.61551l1.63683,-2.33289c0.1324,-0.1884 0.10994,-0.44525 -0.05283,-0.60802l-1.84629,-1.84537c-0.16419,-0.1642 -0.42378,-0.18532 -0.61265,-0.04913l-2.29767,1.65165c-0.51678,-0.28568 -1.0628,-0.51146 -1.62941,-0.6766l-0.48845,-2.79446c-0.04034,-0.22731 -0.23791,-0.39299 -0.46806,-0.39299l-2.61002,0zm1.32633,7.11824c-2.09324,0 -3.79639,1.70316 -3.79639,3.79639c0,1.99738 1.55149,3.63585 3.51185,3.78249c0.08447,-0.32459 0.19605,-0.63853 0.33367,-0.93798c-0.01661,0 -0.03252,0.00278 -0.04913,0.00278c-1.57028,0 -2.8473,-1.27701 -2.8473,-2.8473c0,-1.57028 1.27701,-2.8473 2.8473,-2.8473c1.57028,0 2.8473,1.27701 2.8473,2.8473c0,0.01661 -0.00278,0.03252 -0.00278,0.04913c0.29944,-0.13762 0.61338,-0.2492 0.93798,-0.33367c-0.14664,-1.96036 -1.78511,-3.51185 -3.78249,-3.51185zm5.22004,4.27094c-2.61524,0 -4.74549,2.13025 -4.74549,4.74549c0,2.61524 2.13025,4.74549 4.74549,4.74549c1.13726,0 2.18169,-0.40385 3.00023,-1.07422l2.83339,2.83339l0.67104,-0.67104l-2.83339,-2.83339c0.67038,-0.81854 1.07422,-1.86297 1.07422,-3.00023c0,-2.61524 -2.13025,-4.74549 -4.74549,-4.74549zm0,0.9491c2.10231,0 3.79639,1.69408 3.79639,3.79639c0,2.10231 -1.69408,3.79639 -3.79639,3.79639c-2.10231,0 -3.79639,-1.69408 -3.79639,-3.79639c0,-2.10231 1.69408,-3.79639 3.79639,-3.79639z" fill="black" id="svg_1" /></g></svg>,
		category: 'messia',
		keywords: ['object'],
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
			filtersOrder: {
				type: 'array',
				default: [
					{
						id: 'messia_reset',
						title: '',
					},
					{
						id: 'messia_search',
						title: '',
					},
					{
						id: 'messia_constructor',
						title: '',
					},
					{
						id: 'messia_object_category',
						title: '',
					},
					{
						id: 'messia_object_property',
						title: '',
					},
				],
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
		edit: SearchFiltersFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
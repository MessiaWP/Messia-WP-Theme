(function (wp, $) {

	const { apiFetch } = wp;
	const { addFilter } = wp.hooks;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { InspectorControls, BlockControls } = wp.blockEditor;
	const { Button, Notice, Flex, FlexItem, Card, ToolbarGroup, ToolbarButton, Placeholder, Disabled, ToggleControl, Spinner, TabPanel, __experimentalSpacer: Spacer, __experimentalInputControl: InputControl } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<g>
			<path d="m87.28121,29.13782c-3.99871,0 -7.27731,3.28806 -7.27731,7.27731l0,14.54513l0.00949,0l0,63.06999c0,2.65318 2.19835,4.85154 4.85154,4.85154l61.74338,0c3.10802,9.81679 12.31837,16.98038 23.1301,16.98038c13.34172,0 24.25768,-10.91596 24.25768,-24.25769c0,-6.74667 -2.79531,-12.85847 -7.2773,-17.27412l0,-43.3701c0,-2.65318 -2.19836,-4.85154 -4.85154,-4.85154l-9.70308,0l0,-9.69359c0,-3.98925 -3.28805,-7.27731 -7.2773,-7.27731l-19.40615,0c-1.8667,0 -3.55337,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98484,-1.9046 -4.85154,-1.9046l-19.40615,0c-1.8667,0 -3.55336,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98483,-1.9046 -4.85153,-1.9046l-19.38721,0zm0,4.85154l19.38721,0c1.37398,0 2.42576,1.05179 2.42576,2.42577l0,14.54513l72.77307,0l0,39.68407c-3.0701,-1.79092 -6.54768,-2.91851 -10.26214,-3.20279c-0.6159,-0.05683 -1.23183,-0.09475 -1.8667,-0.09475c-1.66772,0 -3.29752,0.17056 -4.87049,0.49275c-0.78648,0.16107 -1.56348,0.36954 -2.32153,0.60644c-7.5995,2.35943 -13.60706,8.36699 -15.96648,15.96648c-0.2369,0.75806 -0.44538,1.52557 -0.60645,2.31205c0,0 0,0.00949 0,0.00949c-0.32219,1.57296 -0.49274,3.20276 -0.49274,4.87048c0,0.81491 0.04737,1.62983 0.12318,2.42577l-60.73897,0l0,-67.92153l-0.00949,0l0,-9.69359c0,-1.37398 1.05181,-2.42577 2.42577,-2.42577zm29.09028,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm29.10923,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm24.25769,58.20897c0.65381,0 1.29817,0.03792 1.93304,0.10424c0.12318,0.00948 0.24636,0.02843 0.37903,0.04737c0.51167,0.06632 1.02336,0.13267 1.5161,0.2369c0.14213,0.02843 0.2748,0.06632 0.40744,0.09475c0.46431,0.10424 0.91914,0.21793 1.37398,0.3506c0.18952,0.06632 0.37902,0.13266 0.56855,0.19898c0.39797,0.13267 0.78646,0.2748 1.17497,0.43589c0.19898,0.07581 0.40745,0.17056 0.60644,0.26531c0.34114,0.15161 0.67276,0.3127 1.00441,0.49274c0.21796,0.1137 0.43589,0.2369 0.64436,0.3506c0.31268,0.18952 0.62539,0.37903 0.92861,0.56855c0.22742,0.15161 0.43589,0.29374 0.65382,0.45483c0.25584,0.17056 0.5022,0.36006 0.74859,0.54959c0.23688,0.1895 0.47378,0.37902 0.71065,0.58749c4.12192,3.56285 6.75616,8.82182 6.75616,14.66831c0,10.6696 -8.73656,19.40615 -19.40615,19.40615c-9.21982,0 -16.98039,-6.51925 -18.92289,-15.17054c-0.14213,-0.62539 -0.24636,-1.25077 -0.33165,-1.88565c0,-0.06632 -0.01895,-0.13266 -0.02843,-0.19898c-0.07581,-0.71068 -0.12318,-1.43082 -0.12318,-2.15098c0,-0.6633 0.03791,-1.32658 0.10423,-1.97094c0,-0.00948 -0.00948,-0.01894 0,-0.01894c0.92861,-9.09663 8.2154,-16.38343 17.31203,-17.31203c0,-0.00949 0.00946,0 0.01895,0c0.64436,-0.07581 1.30763,-0.10424 1.97094,-0.10424z" fill="black" />
			<line fill="none" id="svg_2" stroke="#000000" strokeLinecap="round" strokeWidth="5" x1="170.16668" x2="170.16668" y1="100.16667" y2="122.85538" />
			<line fill="none" id="svg_4" stroke="#000000" strokeLinecap="round" strokeWidth="5" transform="rotate(90 170.167 111.511)" x1="170.16667" x2="170.16667" y1="100.16664" y2="122.85535" />
		</g>
	</svg>;
	const shortid = require('shortid');

	let lastPreview = false;

	function TabsPanelFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState({
			segment: [],
		});

		let activeSegment;
		let blockRef = useRef();

		const sortableInit = () => {

			$(blockRef.current).find('.tab-constructed').not('ui-sortable').sortable({
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
					saveTabs();
				},
			});
		}

		const removeTab = (event) => {
			const
				tabsSegmentOther = [],
				tabsSegmentCurrent = [],
				// Find shown tabs in current segment
				tabs = event.target.closest('.tab-constructed').querySelectorAll('.tab-fields'),
				// Define tab being removed
				remove = event.target.closest('.tab-fields');

			for (let i = 0; i < attributes.tabsConstructed.length; i++) {
				if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
					// Find saved tabs in current segment
					tabsSegmentCurrent.push(attributes.tabsConstructed[i]);
				} else {
					tabsSegmentOther.push(attributes.tabsConstructed[i]);
				}
			}

			for (let i = 0; i < tabs.length; i++) {
				const tab = tabs[i];
				if (remove === tab) {
					// Found terget tab to remove.
					// It's index is the same as in saved tabs within segment
					tabsSegmentCurrent.splice(i, 1);
				}
			}

			let store = tabsSegmentCurrent.concat(tabsSegmentOther);

			$(remove).animate({
				opacity: 0,
			}, 400, () => {
				setAttributes({
					tabsConstructed: store
				});
			});
		}

		const toggleTab = (event) => {
			var tab = $(event.target).parents('.tab');

			tab.find('.content').toggle('blind', {
				direction: 'up',
				duration: 300
			});

			if (tab.hasClass('collapsed')) {
				tab.removeClass('collapsed').addClass('expanded');
			}
			else {
				tab.removeClass('expanded').addClass('collapsed');
			}
		}

		const addTab = () => {

			const
				store = [],
				newTab = {
					id: shortid.generate(),
					segmentSlug: activeSegment,
					title: __('Tab name', 'messia'),
					content: '',
					active: false,
				}

			for (let i = 0; i < attributes.tabsConstructed.length; i++) {
				// add other tabs segments
				store.push(attributes.tabsConstructed[i]);
			}

			store.push(newTab);

			setAttributes({
				tabsConstructed: store
			});
		};

		const saveTabs = () => {

			const
				store = [],
				tabs = $(blockRef.current).find('.tab-fields'),
				activeSegment = tabs.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

			for (let i = 0; i < attributes.tabsConstructed.length; i++) {
				if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
					continue;
				}
				// add other tabs segments
				store.push(attributes.tabsConstructed[i]);
			}

			for (let q = 0; q < tabs.length; q++) {
				store.push({
					id: $(tabs[q]).attr('id'),
					segmentSlug: activeSegment,
					title: $(tabs[q]).find('.tab-title input').val(),
					content: $(tabs[q]).find('.tab-content textarea').val(),
					active: $(tabs[q]).find('.tab-status input').prop('checked'),
				});
			}

			setAttributes({ tabsConstructed: store });
		}

		const getExample = () => {
			return exampleImageData;
		}

		const tabsContent = (tab) => {

			activeSegment = tab.segmentSlug;
			const tabsConstructedHtml = [];

			for (const [index, tabConstructed] of attributes.tabsConstructed.entries()) {

				if (tab.segmentSlug != tabConstructed.segmentSlug) {
					continue;
				}

				let tabClasses = ['tab', 'collapsed'];
				if (!tabConstructed.active) tabClasses.push('inactive');

				tabsConstructedHtml.push(
					<Card
						className="messia-card tab-fields"
						size="small"
						id={tabConstructed.id}
						key={`${tabConstructed.segmentSlug}-${tabConstructed.id}`}>
						<div className="messia-card-content">
							<div
								className={tabClasses.join(' ')}>
								<Flex
									gap={2}>
									<FlexItem className="move">&equiv;</FlexItem>
									<FlexItem
										className="header">
										<InputControl
											className="tab-title"
											value={tabConstructed.title}
											onChange={(value) => saveTabs()}
										/>
									</FlexItem>
									<FlexItem
										title={__('The tab is active and will be displayed', 'messia')}>
										<ToggleControl
											className="tab-status"
											checked={tabConstructed.active}
											onChange={(value) => saveTabs()}
										/>
									</FlexItem>
									<FlexItem className="toggle" onClick={toggleTab}></FlexItem>
									<FlexItem className="remove" onClick={removeTab}></FlexItem>
								</Flex>
								<Spacer
									className="content"
									margin={0}
									paddingTop={2}>
									<div className="tab-content">
										<textarea
											value={tabConstructed.content}
											onChange={(value) => saveTabs()}>
										</textarea>
									</div>
								</Spacer>
							</div>
						</div>
					</Card>
				);
			}

			return tabsConstructedHtml;
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
					const tabsHtml = [];

					for (const [indexSegment, segment] of terms.segment.entries()) {
						tabsHtml.push({
							name: `segment-${segment.value}-slug`,
							title: segment.label,
							className: 'tab',
							segmentSlug: segment.value
						});
					}
					const heading =
						<Fragment key='tip'>
							<h4>{block.title}</h4>
							<Notice
								isDismissible={false}
								status="warning">
								<p>{__('Add tab into segments, set it\'s content, activity status and reorder them if needed.', 'messia')}</p>
							</Notice>
							<Spacer
								marginTop={5}>
								<Button isPrimary onClick={addTab}>
									{__('Add a tab', 'messia')}
								</Button>
							</Spacer>
						</Fragment>

					const tabs = <TabPanel
						className="messia-tabs-panel"
						activeClass="active-tab"
						orientation="horizontal"
						initialTabName={tabsHtml[0].name}
						onSelect={(tabName) => { }}
						tabs={tabsHtml}>
						{
							(tab) => {
								return <div data-title={__('Drop item here.', 'messia')} className="tab-constructed">{tabsContent(tab)}</div>
							}
						}
					</TabPanel>

					return (
						<Placeholder key="messia-block-placeholder">
							<div className="messia-block" key="messia-block" ref={blockRef}>
								{heading}
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
				path: 'messia/v1/block-tabs-panel',
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
							tabsConstructed: response.validAttrs.tabsConstructed
						});
						setTerms(response.terms);
						setTermsFetched(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		useEffect(() => {

			if (!editMode) return;

			let observer = new MutationObserver((mutationsList, observer) => {

				for (const mutation of mutationsList) {
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length >= 1) {
							for (let i = 0; i < mutation.addedNodes.length; i++) {
								const tabArea = $(mutation.addedNodes[i]).find('.tab-constructed');
								if (tabArea.length > 0) {
									sortableInit();
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
		}, [editMode]);

		return render();
	}

	registerBlockType('messia/block-tabs-panel', {
		title: __('Tabs panel', 'messia'),
		description: __('Customisable tabs with objects custom fields data or any content.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m2.34001,1.85554c-0.79516,-0.00072 -1.45015,0.65428 -1.45015,1.44921l0.00283,17.87359c0,0.52802 0.43812,0.96614 0.96614,0.96614l11.10778,0c0.52802,0 0.96614,-0.43812 0.96614,-0.96614l0,-0.48307l0,-1.44921l0,-1.88982l-0.96614,1.07936l0,0.81046l0,1.44921l0,0.48307l-11.10778,0l-0.00283,-17.87359c0,-0.27266 0.21065,-0.48332 0.48307,-0.48307l3.38149,0.00189c0.27266,0 0.48307,0.21106 0.48307,0.48401l0,2.41441l6.76298,-0.00189l0,1.93228l0,0.41231l0.96614,1.0803l0,-1.97568l0,-1.44921c0,-0.52802 -0.43812,-0.96614 -0.96614,-0.96614l-5.79684,0.00189l0,-1.44827c0,-0.79463 -0.65428,-1.45015 -1.44921,-1.45015l-3.38055,-0.00189zm12.54944,0l-3.38055,0.02076c-0.79525,0.00432 -1.44575,0.66287 -1.44072,1.4577l0.00283,0.45665l0.96614,-0.00566l-0.00283,-0.45665c-0.00174,-0.27276 0.20791,-0.48536 0.48024,-0.48684l3.38055,-0.01982c0.27328,-0.00148 0.48511,0.20738 0.48684,0.48024l0,2.41818l6.76109,0l0.00095,0l-0.00566,15.45635l0,0.00189l-7.23944,0l0,0.96614l7.24416,0l0.00189,0c0.52729,-0.00382 0.96336,-0.44458 0.95954,-0.97274l0.00566,-15.45635l0,-0.00188c-0.00382,-0.52729 -0.44458,-0.96336 -0.97274,-0.95954l-5.78929,0l0,-1.45676l0,-0.00095c-0.00503,-0.79473 -0.6634,-1.44503 -1.4577,-1.44072l-0.00094,0zm-3.97778,8.37352l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108zm2.89842,0l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108z" fill="black" /></g></svg>,
		category: 'messia',
		keywords: ['object'],
		styles: [],
		variations: [],
		attributes: {
			tabsConstructed: {
				type: 'array',
				default: [],
			},
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
		edit: TabsPanelFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
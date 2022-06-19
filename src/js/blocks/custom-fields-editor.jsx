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
			<path d="m82.68583,10.64605a3.19383,3.19383 0 0 0 -3.19351,3.19351l0,121.35334a3.19383,3.19383 0 0 0 3.19351,3.19351l35.1286,0l3.19351,0l6.71135,0c-0.93889,-2.04065 -1.6925,-4.17392 -2.26413,-6.38702l-4.44722,0l-3.19351,0l-31.93509,0l0,-114.96632l57.48316,0l0,15.43113a3.19383,3.19383 0 0 0 0,1.04163l0,50.59093l0,5.16451c2.02149,-1.16882 4.15476,-2.14578 6.38702,-2.93777l0,-5.42025l0,-44.70912l33.80629,0l-10.51613,10.51613a3.19383,3.19383 0 1 0 4.51581,4.51581l15.51221,-15.51221a3.19383,3.19383 0 0 0 1.35973,-3.38062a3.19383,3.19383 0 0 0 -1.26616,-1.95229l-15.60578,-15.60578a3.19383,3.19383 0 0 0 -2.28911,-0.9668a3.19383,3.19383 0 0 0 -2.22671,5.48262l10.51613,10.51613l-33.80629,0l0,-15.96754a3.19383,3.19383 0 0 0 -3.19351,-3.19351l-63.87018,0zm79.83772,79.83772c-17.5643,0 -31.93509,14.37079 -31.93509,31.93509c0,17.5643 14.37079,31.93509 31.93509,31.93509c17.5643,0 31.93509,-14.37079 31.93509,-31.93509c0,-17.5643 -14.37079,-31.93509 -31.93509,-31.93509zm0,6.38702c14.05144,0 25.54807,11.49663 25.54807,25.54807c0,14.05144 -11.49663,25.54807 -25.54807,25.54807c-14.05144,0 -25.54807,-11.49663 -25.54807,-25.54807c0,-14.05144 11.49663,-25.54807 25.54807,-25.54807zm0,6.70512c-1.91611,0 -3.19351,1.2774 -3.19351,3.19351l0,12.45593l-12.45593,0c-1.91611,0 -3.19351,1.2774 -3.19351,3.19351c0,1.91611 1.2774,3.19351 3.19351,3.19351l12.45593,0l0,12.45593c0,1.91611 1.2774,3.19351 3.19351,3.19351c1.91611,0 3.19351,-1.2774 3.19351,-3.19351l0,-12.45593l12.45593,0c1.91611,0 3.19351,-1.2774 3.19351,-3.19351c0,-1.91611 -1.2774,-3.19351 -3.19351,-3.19351l-12.45593,0l0,-12.45593c0,-1.91611 -1.2774,-3.19351 -3.19351,-3.19351z" />
		</g>
	</svg>;
	const shortid = require('shortid');

	let lastPreview = false;

	function ConstructorFieldsFn(props) {

		const { attributes, setAttributes, className, name } = props;
		const [editMode, setEditMode] = useState(true);
		const [termsFetched, setTermsFetched] = useState(false);
		const [terms, setTerms] = useState({
			segment: [],
		});

		let activeSegment;
		let blockRef = useRef();

		const sortableInit = () => {

			$(blockRef.current).find('.custom-fields').not('ui-sortable').sortable({
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

		const saveTabs = () => {

			const
				store = [],
				fields = $(blockRef.current).find('.custom-field'),
				activeSegment = fields.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

			for (let i = 0; i < attributes.constructedFields.length; i++) {
				if (attributes.constructedFields[i].segmentSlug === activeSegment) {
					continue;
				}
				// add other fields segments
				store.push(attributes.constructedFields[i]);
			}

			for (let q = 0; q < fields.length; q++) {

				const fieldOpts = {};
				const opts = $(fields[q]).find('.field-opt');

				for (let z = 0; z < opts.length; z++) {
					const
						opt = $(opts[z]),
						key = opt.data('optionName'),
						value = $(opts[z]).find('input[type="checkbox"]').prop('checked');

					fieldOpts[key] = value;
				}

				store.push({
					id: $(fields[q]).attr('id'),
					segmentSlug: activeSegment,
					fieldSlug: $(fields[q]).data('fieldSlug'),
					fieldOpts: fieldOpts,
				});
			}

			setAttributes({ constructedFields: store });
		}

		const getExample = () => {
			return exampleImageData;
		}

		const tabsContent = (tab) => {

			activeSegment = tab.segmentSlug;
			const constructedFieldsHtml = [];

			for (const [index, fieldConstructed] of attributes.constructedFields.entries()) {

				if (tab.segmentSlug != fieldConstructed.segmentSlug) {
					continue;
				}

				if ('undefined' === typeof fieldConstructed.id) {
					fieldConstructed.id = shortid.generate();
				}

				const fieldsOptions = [];
				const constructorFieldConfig = getConstructorFieldConfig(fieldConstructed);

				for (const [index, fieldConfig] of constructorFieldConfig.options.entries()) {

					switch (fieldConfig['tag']) {
						case 'input':
							if ('checkbox' === fieldConfig['type']) {
								fieldsOptions.push(
									<Fragment
										key={index}>
										<FlexItem>
											<span>{fieldConfig.label}</span>
										</FlexItem>
										<FlexItem
											className="field-opt"
											title={fieldConfig.title}
											data-option-name={fieldConfig.id}>
											<ToggleControl
												checked={fieldConstructed.fieldOpts[fieldConfig.id]}
												onChange={(value) => saveTabs()}
											/>

										</FlexItem>
									</Fragment>
								);
							}
							break;
					}
				}

				constructedFieldsHtml.push(
					<Card
						id={fieldConstructed.id}
						key={`${fieldConstructed.segmentSlug}-${fieldConstructed.id}`}
						className="messia-card custom-field"
						size="small"
						data-field-slug={fieldConstructed.fieldSlug}>
						<div className="messia-card-content">
							<div className="field-item">
								<Flex
									gap={2}>
									<FlexItem className="move">&equiv;</FlexItem>
									<FlexItem
										className="header">
										<div className="tab-title">{constructorFieldConfig.title}</div>
									</FlexItem>
									<FlexItem>
										<Flex gap={2}>
											{fieldsOptions}
										</Flex>
									</FlexItem>
								</Flex>
							</div>
						</div>
					</Card >
				);
			}

			return constructedFieldsHtml;
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
								<p>{__('These are a custom fields created via constructor per segment term.', 'messia')}</p>
							</Notice>
							<Spacer marginTop={5} />
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
								return <div data-title={__('Constructor for this segment are empty', 'messia')} className="custom-fields">{tabsContent(tab)}</div>
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
				path: 'messia/v1/block-custom-fields',
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

		const getConstructorFieldConfig = (fieldData) => {
			const segment = terms.segment.find((singleSegment) => singleSegment.value === fieldData.segmentSlug);
			const field = segment.constructorFields[fieldData.fieldSlug];

			return field;
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
							constructedFields: response.validAttrs.constructedFields
						});
						setTerms(response.terms);
						setTermsFetched(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [termsFetched]);

		useEffect(() => {

			let observer = new MutationObserver((mutationsList, observer) => {

				for (const mutation of mutationsList) {
					if (mutation.type === 'childList') {
						if (mutation.addedNodes.length >= 1) {
							for (let i = 0; i < mutation.addedNodes.length; i++) {
								const fieldsArea = $(mutation.addedNodes[i]).find('.custom-fields');
								if (fieldsArea.length > 0) {
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
		}, []);

		return render();
	}

	registerBlockType('messia/block-custom-fields', {
		title: __('Custom fields', 'messia'),
		description: __('Output custom field value for current viewed object.', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m2.40039,2c-0.76729,0 -1.40039,0.6331 -1.40039,1.40039l0,18.09961a0.50005,0.50005 0 0 0 0.5,0.5l21,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-18.09961c0,-0.76729 -0.6331,-1.40039 -1.40039,-1.40039l-19.19922,0zm0,1l19.19922,0c0.22671,0 0.40039,0.17368 0.40039,0.40039l0,2.09961l-20,0l0,-2.09961c0,-0.22671 0.17368,-0.40039 0.40039,-0.40039zm-0.40039,3.5l20,0l0,14.5l-20,0l0,-14.5zm3,2.5l0,2.5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,4l1,0l0,-4l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-2.5l-1,0zm6.5,0l0,5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,1.5l1,0l0,-1.5l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-5l-1,0zm6.5,0l0,2.5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,4l1,0l0,-4l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-2.5l-1,0zm-13.5,3.5l2,0l0,1l-2,0l0,-1zm13,0l2,0l0,1l-2,0l0,-1zm-6.5,2.5l2,0l0,1l-2,0l0,-1z" fill="black" /></svg>,
		category: 'messia',
		keywords: ['object'],
		styles: [],
		variations: [],
		attributes: {
			constructedFields: {
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
		edit: ConstructorFieldsFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
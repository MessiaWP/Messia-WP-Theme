(function (wp, $) {

	const { apiFetch, apiRequest } = wp;
	const { registerBlockType } = wp.blocks;
	const { Component, Fragment, useState, useEffect, useRef } = wp.element;
	const { serverSideRender: ServerSideRender } = wp;
	const { BlockControls } = wp.blockEditor;
	const { SelectControl, ToggleControl, Notice, ToolbarGroup, ToolbarButton, Placeholder, Disabled, TextControl, Spinner, RangeControl, Flex, FlexItem, FlexBlock, __experimentalRadioGroup: RadioGroup, __experimentalRadio: Radio } = wp.components;
	const { __ } = wp.i18n;
	const exampleImageData = <svg viewBox="0 0 274 165" xmlns="http://www.w3.org/2000/svg">
		<title>Layer 1</title>
		<circle cx="45.05725" cy="37.11686" fill="#cccccc" id="svg_3" r="17.76122" />
		<circle cx="45.05725" cy="31.10835" fill="#ffffff" id="svg_7" r="6.55574" />
		<path d="m32.44604,49.58966c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z" fill="#ffffff" id="svg_26" />
		<rect fill="#cccccc" height="6.00851" id="svg_29" rx="1" ry="1" width="72.99225" x="71.10958" y="23.6448" />
		<rect fill="#cccccc" height="18.4706" id="svg_30" rx="2" ry="2" width="175.18435" x="71.33211" y="33.08893" />
		<g id="svg_93">
			<path d="m209.71379,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_32" />
			<path d="m217.40507,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_34" />
			<path d="m225.41641,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_35" />
			<path d="m240.36741,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_36" />
			<path d="m233.02719,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_37" />
		</g>
		<circle cx="45.05725" cy="84.7264" fill="#cccccc" id="svg_97" r="17.76122" />
		<circle cx="45.05725" cy="78.71789" fill="#ffffff" id="svg_98" r="6.55574" />
		<path d="m32.38214,97.26131c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z" fill="#ffffff" id="svg_99" />
		<rect fill="#cccccc" height="6.00851" id="svg_100" rx="1" ry="1" width="72.99225" x="71.10958" y="71.25435" />
		<rect fill="#cccccc" height="18.4706" id="svg_101" rx="2" ry="2" width="175.18435" x="71.33211" y="80.69847" />
		<g id="svg_102">
			<path d="m209.71379,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_103" />
			<path d="m217.40507,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_104" />
			<path d="m225.41641,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_105" />
			<path d="m240.36741,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_106" />
			<path d="m233.02719,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_107" />
		</g>
		<circle cx="45.05725" cy="131.72641" fill="#cccccc" id="svg_110" r="17.76122" />
		<circle cx="45.05725" cy="125.7179" fill="#ffffff" id="svg_111" r="6.55574" />
		<path d="m32.52134,144.40417c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z" fill="#ffffff" id="svg_112" />
		<rect fill="#cccccc" height="6.00851" id="svg_113" rx="1" ry="1" width="72.99225" x="71.10958" y="118.25435" />
		<rect fill="#cccccc" height="18.4706" id="svg_114" rx="2" ry="2" width="175.18435" x="71.33211" y="127.69848" />
		<g id="svg_115">
			<path d="m209.71379,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_116" />
			<path d="m217.40507,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_117" />
			<path d="m225.41641,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_118" />
			<path d="m240.36741,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_119" />
			<path d="m233.02719,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z" fill="#ff6c6c" id="svg_120" />
		</g>
	</svg>;

	let lastPreview = false;

	function TestimonialsFn(props) {

		const { attributes, setAttributes, className, name } = props;

		const [editMode, setEditMode] = useState(true);
		const [attrPostsFetched, setAttrPostsFetched] = useState(false);
		const [attrPosts, setAttrPosts] = useState(false);
		const [rendered, setRendered] = useState(false);

		let blockRef = useRef();
		let selectPostsRef = useRef();
		let selectPostTypeRef = useRef();

		const creatWarningMsg = () => {
			wp.data.dispatch('core/notices').createNotice(
				'error', // Can be one of: success, info, warning, error.
				__('An error occurred while receiving data from the server for Testimonials block', 'messia'), // Text string to display.
				{
					isDismissible: true,
				}
			);
		}

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

			if (attrPostsFetched) {
				const block = wp.blocks.getBlockType(name);

				return (
					<Placeholder key="messia-block-placeholder">
						<div className="messia-block" key="messia-block" ref={blockRef}>
							<h4>{block.title}</h4>
							<Notice
								isDismissible={false}
								status="warning">
								<div>
									<div>{__('Build Your conditions for searching testimonials.', 'messia')}</div>
									<div>{__('Notes:', 'messia')}</div>
									<ul>
										<li>{__('all conditions joint by AND operator.', 'messia')}</li>
										<li>{__('set parameter Limit to 0 to unlimit number of comments.', 'messia')}</li>
									</ul>
								</div>
							</Notice>
							<Flex
								className="criteria"
								gap={5}>
								<FlexItem>
									<TextControl
										className="criteria-item"
										label={__('Number of testimonials', 'messia')}
										min='0'
										step='1'
										type='number'
										value={attributes.limit}
										onChange={(value) => {
											setAttributes({ limit: Number(value) });
										}}
									/>
								</FlexItem>
								<FlexItem>
									<TextControl
										className="criteria-item"
										label={__('Text limit', 'messia')}
										min='0'
										step='1'
										type='number'
										value={attributes.shrinkTo}
										onChange={(value) => {
											setAttributes({ shrinkTo: Number(value) });
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
										onChange={(value) => {
											setAttributes({ orderBy: value });
										}}
										options={[
											{
												label: __('Date published', 'messia'),
												value: 'comment_date',
												disabled: false,
											},
											{
												label: __('Rating value', 'messia'),
												value: 'rating',
												disabled: false,
											}
										]}
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
								<FlexBlock>
									<div ref={selectPostTypeRef}>
										<SelectControl
											multiple
											className="condition-item"
											label={__('In response to post of type:', 'messia')}
											value={attributes.forPostType}
											onChange={(slug) => {
												setAttributes({ forPostType: slug });
											}}
											options={[
												{ value: 'post', label: __('Post', 'messia') },
												{ value: 'page', label: __('Page', 'messia') },
												{ value: 'messia_object', label: __('Object', 'messia') },
											]}
										/>
									</div>
								</FlexBlock>
								<FlexBlock>
									<div ref={selectPostsRef}>
										<SelectControl
											multiple
											className="condition-item"
											label={__('In response to Posts/Pages/Objects:', 'messia')}
											value={attributes.inResponseTo}
											onChange={(slug) => {
												setAttributes({ inResponseTo: slug });
											}}
											options={(attrPosts.length === 0) ? [{ value: -1, label: __('Any', 'messia') }] : attrPosts}
										/>
									</div>
								</FlexBlock>
								<FlexBlock>
									<Flex
										className="criteria"
										gap={5}>
										<FlexItem
											className="ratingRange">
											<RangeControl
												className="rating-min"
												label={__('Min rating:', 'messia')}
												value={attributes.ratingMin}
												onChange={(ratingMin) => {
													setAttributes({ ratingMin: ratingMin });
												}}
												min={0}
												max={5}
												step={0.5}
												type='slider'
												separatorType='none'
												withInputField={true}
												trackColor='red'
												railColor='green'
											/>
										</FlexItem>
										<FlexItem
											className="ratingRange">
											<RangeControl
												className="rating-max"
												label={__('Max rating:', 'messia')}
												value={attributes.ratingMax}
												onChange={(ratingMax) => {
													setAttributes({ ratingMax: ratingMax });
												}}
												min={0}
												max={5}
												step={0.5}
												type='slider'
												separatorType='none'
												withInputField={true}
												trackColor='green'
												railColor='red'
											/>
										</FlexItem>
									</Flex>
								</FlexBlock>
							</Flex>
							<FlexBlock>
								<Flex
									className="depth-non-rated"
									gap={5}>
									<FlexItem>
										<ToggleControl
											label={__('Show in slider', 'messia')}
											checked={attributes.slider.active}
											onChange={(checked) => {
												let slider = Object.assign({}, attributes.slider);
												slider.active = Boolean(checked),
													setAttributes({ slider: slider });
											}}
										/>
									</FlexItem>
									<FlexItem>
										<ToggleControl
											label={__('Exclude objects or posts that never been rated.', 'messia')}
											checked={attributes.excludeNoRating}
											onChange={(checked) => {
												setAttributes({ excludeNoRating: Boolean(checked) });
											}}
										/>
									</FlexItem>
								</Flex>
							</FlexBlock>
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

		const getAttrPosts = async () => {
			return await new Promise((resolve, reject) => {
				apiFetch({
					path: 'messia/v1/testimonials',
					method: 'POST',
					data: { currentAttrs: attributes }
				}).then(response => {
					return resolve(response);
				}).catch((e) => {
					creatWarningMsg();
				});
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
				else if (lastPreview === false) {
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
			if (!attrPostsFetched && !attributes.isExample) {

				getAttrPosts().then((response) => {

					if (isMounted) {

						setAttrPosts(response);
						setAttrPostsFetched(true);
						setRendered(true);
					}
				});
			}
			return () => { isMounted = false };

		}, [attrPostsFetched]);

		useEffect(() => {

			if (!rendered || !editMode) return;

			const request = apiRequest.buildAjaxOptions({
				namespace: 'messia',
				endpoint: 'v1/testimonials/',
				type: 'POST',
				delay: 250,
				data: (params) => {
					var query = {
						search: (typeof params.term === 'undefined') ? null : params.term,
					}
					return query;
				},
				error: (MLHttpRequest, textStatus, errorThrown) => {
					if (textStatus === 'abort') {
						return;
					}
					creatWarningMsg();
				},
				cache: true
			});

			$(selectPostsRef.current).find('select').select2({
				width: '100%',
				placeholder: __('Any', 'messia'),
				minimumInputLength: 3,
				closeOnSelect: false,
				ajax: request,
			}).on('change', (event) => {
				let slug = $(event.currentTarget).val();
				if (slug === null) {
					slug = [];
				}
				setAttributes({ inResponseTo: slug });
			});

			$(selectPostTypeRef.current).find('select').select2({
				width: '100%',
				placeholder: __('Any', 'messia'),
			}).on('change', (event) => {
				let slug = $(event.currentTarget).val();
				if (slug === null) {
					slug = [];
				}
				setAttributes({ forPostType: slug });
			});

		}, [rendered, editMode]);

		return render();
	}

	registerBlockType('messia/block-testimonials', {
		title: __('Testimonials', 'messia'),
		description: __('Testimonials by parameters', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>,
		category: 'messia',
		keywords: ['testimonial'],
		styles: [],
		variations: [],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
			},
			forPostType: {
				type: 'array',
				default: [],
			},
			inResponseTo: {
				type: 'array',
				default: [],
			},
			ratingMin: {
				type: 'integer',
				default: 3,
			},
			ratingMax: {
				type: 'integer',
				default: 5,
			},
			excludeNoRating: {
				type: 'boolean',
				default: true,
			},
			limit: {
				type: 'integer',
				default: 5,
			},
			shrinkTo: {
				type: 'integer',
				default: 200,
			},
			slider: {
				type: 'object',
				default: {
					active: true,
				}
			},
			orderBy: {
				type: 'string',
				default: 'comment_date',
				enum: ['comment_date', 'rating'],
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
		edit: TestimonialsFn,
		save: function (props) { return null },
	});

}(window.wp, jQuery));
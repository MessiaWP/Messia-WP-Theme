import { MDCTabBar } from '@material/tab-bar';

(function (wp, $) {

	const { __ } = wp.i18n;
	const { registerBlockType } = wp.blocks;
	const { useState, useEffect } = wp.element;
	const { InnerBlocks, useBlockProps, RichText } = wp.blockEditor;
	const { Placeholder, Button, TabPanel } = wp.components;
	const { useDispatch, useSelect } = wp.data;
	const { createBlock } = wp.blocks;

	const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map(block => block.name).filter(blockName => blockName !== 'messia/block-tabs-wrapper');

	const exampleImageData = <svg viewBox="0 0 390 110" xmlns="http://www.w3.org/2000/svg">
		<g>
			<g>
				<rect fill="#b2b2b2" height="27.82807" id="svg_5" rx="2" ry="2" stroke="#4c4c4c" width="118.73608" x="260.72799" y="7.60706" />
				<rect fill="#e5e5e5" height="27.82807" id="svg_8" rx="2" ry="2" stroke="#c2c2c2" width="118.73608" x="10.53593" y="7.60706" />
				<rect fill="#b2b2b2" height="27.82807" id="svg_4" rx="2" ry="2" stroke="#4c4c4c" width="118.73608" x="136.72799" y="7.60706" />
				<rect fill="#ffffff" height="55.82807" id="svg_6" rx="2" ry="2" stroke="#c2c2c2" strokeDasharray="5,5" width="367.93608" x="10.53593" y="46.56487" />
			</g>
		</g>
	</svg>;

	const TabsWrapperFnEdit = function (props) {
		const { attributes, setAttributes, clientId } = props;
		const { tabs = [], templates = [] } = attributes;

		const blockProps = useBlockProps();

		const [tabCounter, setTabCounter] = useState(0);
		const [activeTabIndex, setActiveTabIndex] = useState(0);

		const { replaceInnerBlocks } = useDispatch("core/block-editor");
		const { inner_blocks } = useSelect(select => ({
			inner_blocks: select("core/block-editor").getBlocks(clientId)
		}));

		let classes = [blockProps.className];

		/**
		 * Add a new tab on button click.
		 */
		const handleAddTab = () => {
			setTabCounter(tabCounter => tabCounter + 1);
			let tabId = `tab${tabCounter}`;
			setAttributes({
				tabs: [...tabs, {
					tabId,
					index: tabs.length,
					title: `Tab ${tabs.length} title`,
					description: '',
				}],
			});

			let attr = { 'tabScreenIndex': tabs.length, tabId, index: tabs.length, className: 'brand-tab-screen', };
			let blocks = [...inner_blocks, ...[createBlock('messia/block-tabs-tab', attr)]];

			setActiveTab(tabs.length, blocks)
		};

		/**
		 * Set active tab.
		 *
		 * @param {number} tabIndex 
		 * @param {array} blocks 
		 */
		const setActiveTab = (tabIndex, blocks = [...inner_blocks]) => {
			setActiveTabIndex(tabIndex);

			// Scroll tab bar.
			let tab = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
			tab.scrollIntoView(tabIndex)

			const inner_blocks_new = blocks.map((innerBlock, index) => {
				let block = innerBlock;
				block.attributes.style = { display: 'none' }
				if (tabIndex == index) {
					block.attributes.style = { display: 'block' }
				}
				return block;
			});

			replaceInnerBlocks(clientId, inner_blocks_new, false);
		};

		/**
		 * Action to remove a tab.
		 *
		 * @param {object} tab 
		 */
		const handleRemoveTab = (tab) => {

			const newTemplates = templates.filter(item => item[1].index != tab.index)
				.map(i => {
					if (i[1].index > tab.index) {
						i[1].index -= 1;
					}
					return i;
				});
			const newTabs = tabs.filter(item => item.index != tab.index).map(i => {
				if (i.index > tab.index) {
					i.index -= 1;
				}
				return i;
			});

			/**
			 * update all state variables.
			 */
			setAttributes({
				tabs: newTabs,
				templates: newTemplates
			});

			/**
			 * By default wordpress does not allow to update InnerBock compoment with new changes
			 * To delete all iteam under a tab we have to find client id of tab and remove it using
			 * dispatch method.
			 */
			let blocks = [...inner_blocks];
			blocks.splice(tab.index, 1);

			/**
			 * Set active tab and update blocks.
			 */
			const previousTabIndex = tab.index == 0 ? 0 : tab.index - 1;
			setActiveTab(previousTabIndex, blocks)
		}

		const tabBar = (value) => {
			return (
				value.sort((a, b) => a.index - b.index).map(tab => {
					return (
						<div key={tab.index} className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabIndex={tab.index} onClick={() => setActiveTab(tab.index)}>
							<span className="mdc-tab__content">
								<RichText
									tagName="span"
									className="mdc-tab__text-label"
									placeholder={`Tab title`}
									allowedFormats={['core/bold', 'core/italic']}
									value={tab.title}
									onChange={title => {
										const newObject = Object.assign({}, tab, {
											title: title
										});
										setAttributes({
											tabs: [...tabs.filter(
												item => item.index != tab.index
											), newObject]
										});
									}}
								/>
							</span>
							<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
								<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
							</span>
							<span className="mdc-tab__ripplex"></span>
							<Button
								isSmall={true}
								className="components-button block-editor-inserter__toggle has-icon"
								iconSize={24}
								onClick={() => handleRemoveTab(tab)}
							>&times;</Button>
						</div>
					)
				})
			)
		}

		const getExample = () => {
			return exampleImageData;
		}

		useEffect(() => {

			if (attributes.isExample) {
				return;
			}

			/**
			 * set active tab and tab mdc tab instance 
			 */
			new MDCTabBar(document.querySelector('.mdc-tab-bar'));
			setActiveTab(0)

			/**
			 * initialize atleaset one tab
			 */
			if (tabs.length == 0) {
				handleAddTab()
			}
		}, []);

		if (attributes.isExample) {
			return getExample();
		}

		return (
			<div className={classes.join(' ')}>
				<div className="messia-block tab-wrap">
					<Placeholder>
						<div className="messia-tabs-panel">
							<div className="mdc-tab-bar" role="tablist">
								<div className="mdc-tab-scroller">
									<div className="mdc-tab-scroller__scroll-area">
										<div className="mdc-tab-scroller__scroll-content">
											{tabBar(tabs)}
										</div>
									</div>
									<div className="mdc-tab" role="tab" aria-selected="true" onClick={handleAddTab}>
										<span className="mdc-tab__content">
											<span className="dashicons dashicons-plus" aria-hidden="true"></span>
										</span>
										<span className="mdc-tab-indicator">
											<span className="mdc-tab-indicator__content"></span>
										</span>
										<span className="mdc-tab__ripple"></span>
									</div>
								</div>
							</div>
						</div>
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							templateLock="all"
						/>
					</Placeholder>
				</div>
			</div>
		);
	};

	const TabsWrapperFnSave = function (props) {
		const { attributes } = props;
		let activeTabIndex = 0;
		const tabBar = (tabs) => {
			return (
				tabs.sort((a, b) => a.index - b.index).map(tab => {
					return (
						<div key={tab.index} className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex={tab.index}>
							<span className="mdc-tab__content">
								<RichText.Content
									tagName="span"
									className="mdc-tab__text-label"
									value={tab.title}
								/>
							</span>
							<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
								<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
							</span>
							<span className="mdc-tab__ripple"></span>
						</div>
					)
				})
			)
		}

		const blockProps = useBlockProps.save();
		return (
			<div  {...blockProps} className="tab-wrap">
				<div className="mdc-tab-bar" role="tablist">
					<div className="mdc-tab-scroller">
						<div className="mdc-tab-scroller__scroll-area">
							<div className="mdc-tab-scroller__scroll-content">
								{tabBar(attributes.tabs)}
							</div>
						</div>
					</div>
				</div>
				<InnerBlocks.Content />
			</div>

		);
	};

	registerBlockType('messia/block-tabs-wrapper', {
		$schema: "https://schemas.wp.org/trunk/block.json",
		apiVersion: 3,
		title: __('Tabs', 'messia'),
		icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.8 488.8">
			<polygon fill="#bdbdbd" points="476.4,105.6 214.8,109.6 162,4 476.4,4" />
			<g>
				<path fill="#323838" d="M464.4,488h-440c-14.131,0-24-8.882-24-21.6v-440C0.4,13.938,10.664,0,24.4,0h440 c13.736,0,24,13.938,24,26.4v440C488.4,479.118,478.531,488,464.4,488z M24.4,16c-3.813,0-8,5.443-8,10.4v440 c0,5.054,5.595,5.6,8,5.6h440c2.405,0,8-0.546,8-5.6v-440c0-4.957-4.187-10.4-8-10.4C464.4,16,24.4,16,24.4,16z" />
				<path fill="#323838" d="M464.4,488.8h-440c-14.58,0-24-7.223-24-18.399V36h16v434.4c0,1.301,3.664,2.399,8,2.399h440 c4.337,0,8-1.099,8-2.399V121.6c0-0.074-0.003-0.132-0.007-0.178c-0.587-0.447-2.915-1.422-7.993-1.422H207.305L154.75,7.383 l14.499-6.766L217.495,104H464.4c22.27,0,24,13.471,24,17.6v348.8C488.4,481.577,478.979,488.8,464.4,488.8z" />
				<rect x="328.4" y="3" fill="#323838" width="16" height="114" />
			</g>
		</svg>,
		category: 'messia',
		description: "Example static block scaffolded with Create Block tool.",
		supports: {
			html: false
		},
		styles: [
			{ "name": "default", "label": "Default", "isDefault": true },
			{ "name": "other", "label": "Other" }
		],
		attributes: {
			isExample: {
				type: 'boolean',
				default: false,
			},
			content: {
				type: "string",
				source: "html",
				selector: "div"
			},
			tabs: {
				type: "array",
				selector: "div",
				default: []
			},
			style: {
				type: "string",
				default: "none"
			}
		},
		example: {
			attributes: {
				isExample: true,
			},
		},
		edit: TabsWrapperFnEdit,
		save: TabsWrapperFnSave,
	});

}(window.wp, jQuery));
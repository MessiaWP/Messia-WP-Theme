import classnames from 'classnames';

(function (wp, $) {

	const { __, sprintf } = wp.i18n;
	const { registerBlockType } = wp.blocks;
	const { useSelect, useDispatch } = wp.data;
	const { __experimentalUseCustomUnits: useCustomUnits, PanelBody, __experimentalUnitControl: UnitControl, } = wp.components;
	const { InnerBlocks, useInnerBlocksProps, useBlockProps, useSetting, store: blockEditorStore, BlockControls, BlockVerticalAlignmentToolbar, InspectorControls } = wp.blockEditor;

	const TabsWrapperTabFnEdit = function ({
		attributes: {
			verticalAlignment,
			width,
			templateLock = false,
			allowedBlocks,
			style,
			tabScreenIndex
		},
		setAttributes,
		clientId,
	}) {

		const classes = classnames('block-core-columns', {
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		});

		const units = useCustomUnits({
			availableUnits: useSetting('spacing.units') || [
				'%',
				'px',
				'em',
				'rem',
				'vw',
			],
		});

		const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
			(select) => {
				const { getBlockOrder, getBlockRootClientId } = select(
					blockEditorStore
				);

				const rootId = getBlockRootClientId(clientId);

				return {
					hasChildBlocks: getBlockOrder(clientId).length > 0,
					rootClientId: rootId,
					columnsIds: getBlockOrder(rootId),
				};
			},
			[clientId]
		);

		const { updateBlockAttributes } = useDispatch(blockEditorStore);

		const updateAlignment = (value) => {
			// Update own alignment.
			setAttributes({ verticalAlignment: value });
			// Reset parent Columns block.
			updateBlockAttributes(rootClientId, {
				verticalAlignment: null,
			});
		};

		const widthWithUnit = Number.isFinite(width) ? width + '%' : width;
		const blockProps = useBlockProps({
			className: classes,
			style: style,
			tabscreenindex: tabScreenIndex,
		});

		const columnsCount = columnsIds.length;
		const currentColumnPosition = columnsIds.indexOf(clientId) + 1;

		const label = sprintf(
			/* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
			__('%1$s (%2$d of %3$d)'),
			blockProps['aria-label'],
			currentColumnPosition,
			columnsCount
		);

		const innerBlocksProps = useInnerBlocksProps(
			{ ...blockProps, 'aria-label': label, style },
			{
				templateLock,
				allowedBlocks,
				renderAppender: hasChildBlocks
					? undefined
					: InnerBlocks.ButtonBlockAppender,
			}
		);

		return (
			<>
				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={updateAlignment}
						value={verticalAlignment}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__('Column settings')}>
						<UnitControl
							label={__('Width')}
							labelPosition="edge"
							__unstableInputWidth="80px"
							value={width || ''}
							onChange={(nextWidth) => {
								nextWidth =
									0 > parseFloat(nextWidth) ? '0' : nextWidth;
								setAttributes({ width: nextWidth });
							}}
							units={units}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...innerBlocksProps} />
			</>
		);
	};

	const TabsWrapperTabFnSave = function (props) {
		const { attributes } = props;
		const { verticalAlignment, width } = attributes;

		const wrapperClasses = classnames({
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		});

		let style;

		if (width && /\d/.test(width)) {
			// Numbers are handled for backward compatibility as they can be still provided with templates.
			let flexBasis = Number.isFinite(width) ? width + '%' : width;
			// In some cases we need to round the width to a shorter float.
			if (!Number.isFinite(width) && width?.endsWith('%')) {
				const multiplier = 1000000000000;
				// Shrink the number back to a reasonable float.
				flexBasis =
					Math.round(Number.parseFloat(width) * multiplier) /
					multiplier +
					'%';
			}
			style = { flexBasis };
		}

		const blockProps = useBlockProps.save({
			className: wrapperClasses,
			style,
		});
		const innerBlocksProps = useInnerBlocksProps.save(blockProps);

		return <div {...innerBlocksProps} />;
	};

	registerBlockType('messia/block-tabs-tab', {
		$schema: "https://schemas.wp.org/trunk/block.json",
		apiVersion: 3,
		parent: ['messia/block-tabs-wrapper'],
		title: __('Tab', 'messia'),
		category: 'messia',
		description: "Example static block scaffolded with Create Block tool.",
		supports: {
			html: false
		},
		attributes: {
			verticalAlignment: {
				type: "string"
			},
			width: {
				type: "string"
			},
			allowedBlocks: {
				type: "array"
			},
			templateLock: {
				type: ["string", "boolean"],
				enum: ["all", "insert", false]
			},
			style: {
				type: "string"
			},
			tabId: {
				type: "string"
			},
			tabScreenIndex: {
				type: "number"
			}
		},
		edit: TabsWrapperTabFnEdit,
		save: TabsWrapperTabFnSave,

	});

}(window.wp, jQuery));
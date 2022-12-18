import RadioTermSelector from '../../js/_components/_radio_term_selector.jsx';

function CustomizeTaxonomySelector(OriginalComponent) {
	return function (props) {

		if (props.slug === 'messia_object_segment') {

			return wp.element.createElement(
				RadioTermSelector,
				props
			);
		}
		else {
			return wp.element.createElement(
				OriginalComponent,
				props
			);
		}
	}
};

wp.hooks.addFilter(
	'editor.PostTaxonomyType',
	'messia',
	CustomizeTaxonomySelector
);
const { __, _x, _n, sprintf } = wp.i18n;
const { Component } = wp.element;
const { TreeSelect, withSpokenMessages, withFilters, Button } = wp.components;
const { withSelect, withDispatch, select, subscribe } = wp.data;
const { withInstanceId, compose } = wp.compose;
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { groupBy, get, unescape, find, some, invoke } = lodash;

const DEFAULT_QUERY = {
	per_page: -1,
	orderby: 'name',
	order: 'asc',
	_fields: 'id,name,parent',
};

const MIN_TERMS_COUNT_FOR_FILTER = 8;

let metaboxChanged = false;

class RadioTermSelector extends Component {

	constructor() {
		super(...arguments);
		this.findTerm = this.findTerm.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeFormName = this.onChangeFormName.bind(this);
		this.onChangeFormParent = this.onChangeFormParent.bind(this);
		this.onAddTerm = this.onAddTerm.bind(this);
		this.onToggleForm = this.onToggleForm.bind(this);
		this.setFilterValue = this.setFilterValue.bind(this);
		this.sortBySelected = this.sortBySelected.bind(this);
		this.state = {
			loading: true,
			availableTermsTree: [],
			availableTerms: [],
			adding: false,
			formName: '',
			formParent: '',
			showForm: false,
			filterValue: '',
			filteredTermsTree: [],
			disabled: false,
		};

		this.onChangeMetaboxes();
		this.onSavingPost();
	}

	/**
	 * Track saving post event
	 */
	onSavingPost() {
		wp.apiFetch.use(function (options, next) {

			var result = next(options);
			result.then(function (response) {

				var unSubscribe = subscribe(function () {
					var saving = select('core/editor').isSavingPost();
					var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();
					if (!saving && !isAutosavingPost) {
						unSubscribe();
						if (metaboxChanged === true) {
							metaboxChanged = false;
						}
						document.dispatchEvent(new Event('messiaContentIsSaved', { bubbles: false }));
					}
				});

			});
			return result;
		});
	}

	/**
	 * Add events to switch metaboxChanged flag to true
	 * once some elementdata inside metabox got new content
	 */
	onChangeMetaboxes() {

		let metaboxes = document.querySelector('.postbox-container [id^="segment-constructor-term-id"]');

		if (null === metaboxes || 0 === metaboxes.length) {
			return;
		}

		metaboxes.addEventListener('select2Change', this.handleMetaboxChange.bind(this), false);
		metaboxes.addEventListener('codeMirrorChange', this.handleMetaboxChange.bind(this), false);
		metaboxes.addEventListener('input', this.handleMetaboxChange.bind(this), false);
		metaboxes.addEventListener('sortableChange', this.handleMetaboxChange.bind(this), false);
	}

	handleMetaboxChange() {
		metaboxChanged = true;
	}

	buildTermsTree(flatTerms) {
		const flatTermsWithParentAndChildren = flatTerms.map((term) => {
			return {
				children: [],
				parent: null,
				...term,
			};
		});

		const termsByParent = groupBy(flatTermsWithParentAndChildren, 'parent');
		if (termsByParent.null && termsByParent.null.length) {
			return flatTermsWithParentAndChildren;
		}
		const fillWithChildren = (terms) => {
			return terms.map((term) => {
				const children = termsByParent[term.id];
				return {
					...term,
					children: children && children.length ?
						fillWithChildren(children) :
						[],
				};
			});
		};

		return fillWithChildren(termsByParent['0'] || []);
	}

	onChange(event) { // @helgatheviking
		const go = this.shouldChangeSegment();
		if (!go) {
			return;
		}
		const { onUpdateTerms, taxonomy } = this.props;
		const termId = parseInt(event.target.value, 10);
		onUpdateTerms([termId], taxonomy.rest_base);
	}

	/**
	 * Will trigger warning if segment changed
	 * but metabox has unsaved changes
	 */
	shouldChangeSegment() {

		let isPostDirty = wp.data.select('core/editor').isEditedPostDirty();

		if (metaboxChanged || isPostDirty) {
			let go = confirm(__( 'Metaboxes will be updated. You have unsaved changes that could be lost. Proceed?', 'messia' ));
			if (!go) {
				return false;
			}
		}
		return true;
	}
	onChangeFormName(event) {
		const newValue = event.target.value.trim() === '' ? '' : event.target.value;
		this.setState({ formName: newValue });
	}

	onChangeFormParent(newParent) {
		this.setState({ formParent: newParent });
	}

	onToggleForm() {
		this.setState((state) => ({
			showForm: !state.showForm,
		}));
	}

	findTerm(terms, parent, name) {
		return find(terms, (term) => {
			return ((!term.parent && !parent) || parseInt(term.parent) === parseInt(parent)) &&
				term.name.toLowerCase() === name.toLowerCase();
		});
	}

	onAddTerm(event) {
		event.preventDefault();

		const go = this.shouldChangeSegment();
		if (!go) {
			return;
		}

		const { onUpdateTerms, taxonomy, terms, slug } = this.props;
		const { formName, formParent, adding, availableTerms } = this.state;
		if (formName === '' || adding) {
			return;
		}

		// check if the term we are adding already exists
		const existingTerm = this.findTerm(availableTerms, formParent, formName);
		if (existingTerm) {
			// if the term we are adding exists but is not selected select it
			if (!some(terms, (term) => term === existingTerm.id)) {
				onUpdateTerms([existingTerm.id], taxonomy.rest_base); // @helgatheviking
			}
			this.setState({
				formName: '',
				formParent: '',
			});
			return;
		}

		this.setState({
			adding: true,
		});
		this.addRequest = apiFetch({
			path: `/wp/v2/${taxonomy.rest_base}`,
			method: 'POST',
			data: {
				name: formName,
				parent: formParent ? formParent : undefined,
			},
		});
		// Tries to create a term or fetch it if it already exists
		const findOrCreatePromise = this.addRequest
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === 'term_exists') {
					// search the new category created since last fetch
					this.addRequest = apiFetch({
						path: addQueryArgs(
							`/wp/v2/${taxonomy.rest_base}`,
							{ ...DEFAULT_QUERY, parent: formParent || 0, search: formName }
						),
					});
					return this.addRequest
						.then((searchResult) => {
							return this.findTerm(searchResult, formParent, formName);
						});
				}
				return Promise.reject(error);
			});
		findOrCreatePromise
			.then((term) => {
				const hasTerm = !!find(this.state.availableTerms, (availableTerm) => availableTerm.id === term.id);
				const newAvailableTerms = hasTerm ? this.state.availableTerms : [term, ...this.state.availableTerms];
				const termAddedMessage = sprintf(
					_x('%s added', 'term', 'messia'),
					get(
						this.props.taxonomy,
						['labels', 'singular_name'],
						slug === 'category' ? __('Category', 'messia') : __('Term', 'messia')
					)
				);
				this.props.speak(termAddedMessage, 'assertive');
				this.addRequest = null;
				this.setState({
					adding: false,
					formName: '',
					formParent: '',
					availableTerms: newAvailableTerms,
					availableTermsTree: this.sortBySelected(this.buildTermsTree(newAvailableTerms)),
				});
				onUpdateTerms([term.id], taxonomy.rest_base); // @helgatheviking
			}, (xhr) => {
				if (xhr.statusText === 'abort') {
					return;
				}
				this.addRequest = null;
				this.setState({
					adding: false,
				});
			});
	}

	componentDidMount() {
		this.fetchTerms();
	}

	componentWillUnmount() {
		invoke(this.fetchRequest, ['abort']);
		invoke(this.addRequest, ['abort']);
	}

	componentDidUpdate(prevProps) {
		if (this.props.taxonomy !== prevProps.taxonomy) {
			this.fetchTerms();
		}

		if (this.props.terms !== prevProps.terms) {
			this.updateMetaboxes(prevProps.terms[0], this.props.terms[0]);
		}
	}

	fetchTerms() {
		const { taxonomy } = this.props;
		if (!taxonomy) {
			return;
		}
		this.fetchRequest = apiFetch({
			path: addQueryArgs(`/wp/v2/${taxonomy.rest_base}`, DEFAULT_QUERY),
		});
		this.fetchRequest.then(
			(terms) => { // resolve
				const availableTermsTree = this.sortBySelected(this.buildTermsTree(terms));

				this.fetchRequest = null;
				this.setState({
					loading: false,
					availableTermsTree,
					availableTerms: terms,
				});
			},
			(xhr) => { // reject
				if (xhr.statusText === 'abort') {
					return;
				}
				this.fetchRequest = null;
				this.setState({
					loading: false,
				});
			}
		);
	}

	updateMetaboxes(prevSegment = 0, currentSegment) {

		this.setState({
			disabled: true,
		});
		wp.data.dispatch('core/editor').lockPostSaving('messia/segment-lock');

		this.fetchMetaboxes(prevSegment, currentSegment).then(
			(result) => {

				let newId = result.metaboxHtml.getAttribute('id');
				let prevId = newId.replace(/(\d+)/g, result.prevTerm);
				let postType = wp.data.select('core/editor').getCurrentPostType();

				document.getElementById(prevId).replaceWith(result.metaboxHtml);
				window.postboxes.add_postbox_toggles(postType);
				wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');

				this.setState({
					disabled: false,
				});

				this.onChangeMetaboxes();
				metaboxChanged = false;

				document.getElementById(newId).dispatchEvent(new Event('objectMetaboxUpdated', { bubbles: true }));
			},
			(reject) => {
				// nonce did not verified or other unexpected err
				document.querySelector('#segment-constructor-term-id-' + prevSegment).remove();
				wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');
				metaboxChanged = false;

				this.setState({
					disabled: false,
				});
			}
		);
	}

	async fetchMetaboxes(prevTerm = 0, termId) {

		return await new Promise((resolve, reject) => {

			apiFetch({
				url: addQueryArgs(document.location.href, {
					'fetch-metabox-for-term': termId,
					'messia_nonce': document.querySelector('#segment-constructor-term-id-' + prevTerm).querySelector('#messia_nonce').value,
				}),
				method: 'POST',
				parse: false,
			}).then(response => {
				return response.text();
			}).then(body => {
				var el = document.createElement('metaboxes');
				el.innerHTML = body;
				let metabox = el.querySelector('#segment-constructor-term-id-' + termId);
				el.remove();

				if (metabox === null) {
					reject();
				}

				resolve({
					prevTerm: prevTerm,
					metaboxHtml: metabox,
				});

			}).catch((e) => {
				wp.data.dispatch('core/notices').createNotice(
					'error', // Can be one of: success, info, warning, error.
					__('An error occurred while fetching metabox.', 'messia'), // Text string to display.
					{
						isDismissible: true,
					}
				);
			});
		});
	}

	sortBySelected(termsTree) {
		const { terms } = this.props;
		const treeHasSelection = (termTree) => {
			if (terms.indexOf(termTree.id) !== -1) {
				return true;
			}
			if (undefined === termTree.children) {
				return false;
			}
			const anyChildIsSelected = termTree.children.map(treeHasSelection).filter((child) => child).length > 0;
			if (anyChildIsSelected) {
				return true;
			}
			return false;
		};
		const termOrChildIsSelected = (termA, termB) => {
			const termASelected = treeHasSelection(termA);
			const termBSelected = treeHasSelection(termB);

			if (termASelected === termBSelected) {
				return 0;
			}

			if (termASelected && !termBSelected) {
				return -1;
			}

			if (!termASelected && termBSelected) {
				return 1;
			}

			return 0;
		};
		termsTree.sort(termOrChildIsSelected);
		return termsTree;
	}

	setFilterValue(event) {
		const { availableTermsTree } = this.state;
		const filterValue = event.target.value;
		const filteredTermsTree = availableTermsTree.map(this.getFilterMatcher(filterValue)).filter((term) => term);
		const getResultCount = (terms) => {
			let count = 0;
			for (let i = 0; i < terms.length; i++) {
				count++;
				if (undefined !== terms[i].children) {
					count += getResultCount(terms[i].children);
				}
			}
			return count;
		};
		this.setState(
			{
				filterValue,
				filteredTermsTree,
			}
		);

		const resultCount = getResultCount(filteredTermsTree);
		const resultsFoundMessage = sprintf(
			_n('%d result found.', '%d results found.', resultCount, 'messia'),
			resultCount
		);
		this.props.debouncedSpeak(resultsFoundMessage, 'assertive');
	}

	getFilterMatcher(filterValue) {
		const matchTermsForFilter = (originalTerm) => {
			if ('' === filterValue) {
				return originalTerm;
			}

			// Shallow clone, because we'll be filtering the term's children and
			// don't want to modify the original term.
			const term = { ...originalTerm };

			// Map and filter the children, recursive so we deal with grandchildren
			// and any deeper levels.
			if (term.children.length > 0) {
				term.children = term.children.map(matchTermsForFilter).filter((child) => child);
			}

			// If the term's name contains the filterValue, or it has children
			// (i.e. some child matched at some point in the tree) then return it.
			if (-1 !== term.name.toLowerCase().indexOf(filterValue.toLowerCase()) || term.children.length > 0) {
				return term;
			}

			// Otherwise, return false. After mapping, the list of terms will need
			// to have false values filtered out.
			return false;
		};
		return matchTermsForFilter;
	}

	renderTerms(renderedTerms) {
		const { terms = [], taxonomy } = this.props; // @helgatheviking
		const klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

		return renderedTerms.map((term) => {
			const id = `editor-post-taxonomies-${klass}-term-${term.id}`; // @helgatheviking
			return (
				<div key={term.id} className={'editor-post-taxonomies__' + klass + '-terms-choice '}>
					<input
						id={id}
						className={'editor-post-taxonomies__' + klass + '-terms-input '}
						type="radio" // @helgatheviking
						checked={terms.indexOf(term.id) !== -1}
						value={term.id}
						onChange={this.onChange}
						name={'radio_tax_input-' + this.props.slug} // @helgatheviking
						disabled={this.state.disabled} // @helgatheviking
					/>
					<label htmlFor={id}>{unescape(term.name)}</label>
					{!!term.children.length && (
						<div className={'editor-post-taxonomies__' + klass + '-terms-subchoices '}>
							{this.renderTerms(term.children)}
						</div>
					)}
				</div>
			);
		});
	}

	render() {
		const { slug, taxonomy, instanceId, hasCreateAction, hasAssignAction } = this.props;
		const klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

		if (!hasAssignAction) {
			return null;
		}

		const { availableTermsTree, availableTerms, filteredTermsTree, formName, formParent, loading, showForm, filterValue } = this.state;
		const labelWithFallback = (labelProperty, fallbackIsCategory, fallbackIsNotCategory) => get(
			taxonomy,
			['labels', labelProperty],
			slug === 'category' ? fallbackIsCategory : fallbackIsNotCategory
		);
		const newTermButtonLabel = labelWithFallback(
			'add_new_item',
			__('Add new category', 'messia'),
			__('Add new term', 'messia')
		);
		const newTermLabel = labelWithFallback(
			'new_item_name',
			__('Add new category', 'messia'),
			__('Add new term', 'messia')
		);
		const parentSelectLabel = labelWithFallback(
			'parent_item',
			__('Parent Category', 'messia'),
			__('Parent Term', 'messia')
		);
		const noParentOption = `— ${parentSelectLabel} —`;
		const newTermSubmitLabel = newTermButtonLabel;
		const inputId = `editor-post-taxonomies__${klass}-terms-input-${instanceId}`; // @helgatheviking
		const filterInputId = `editor-post-taxonomies__${klass}-terms-filter-${instanceId}`; // @helgatheviking
		const filterLabel = get(
			this.props.taxonomy,
			['labels', 'search_items'],
			__('Search Terms', 'messia')
		);
		const groupLabel = get(
			this.props.taxonomy,
			['name'],
			__('Terms', 'messia')
		);
		const showFilter = availableTerms.length >= MIN_TERMS_COUNT_FOR_FILTER;

		return [
			showFilter && <label
				key="filter-label"
				htmlFor={filterInputId}>
				{filterLabel}
			</label>,
			showFilter && <input
				type="search"
				id={filterInputId}
				value={filterValue}
				onChange={this.setFilterValue}
				className="editor-post-taxonomies__hierarchical-terms-filter"
				key="term-filter-input"
			/>,
			<div
				className="editor-post-taxonomies__hierarchical-terms-list"
				key="term-list"
				tabIndex="0"
				role="group"
				aria-label={groupLabel}
			>
				{this.renderTerms('' !== filterValue ? filteredTermsTree : availableTermsTree)}
			</div>,
			!loading && hasCreateAction && (
				<Button
					key="term-add-button"
					onClick={this.onToggleForm}
					className="editor-post-taxonomies__hierarchical-terms-add"
					aria-expanded={showForm}
					isLink
				>
					{newTermButtonLabel}
				</Button>
			),
			showForm && (
				<form onSubmit={this.onAddTerm} key={klass + '-terms-form'}>
					<label
						htmlFor={inputId}
						className="editor-post-taxonomies__hierarchical-terms-label"
					>
						{newTermLabel}
					</label>
					<input
						type="text"
						id={inputId}
						className="editor-post-taxonomies__hierarchical-terms-input"
						value={formName}
						onChange={this.onChangeFormName}
						required
					/>
					{taxonomy.hierarchical && !!availableTerms.length && // @helgatheviking
						<TreeSelect
							label={parentSelectLabel}
							noOptionLabel={noParentOption}
							onChange={this.onChangeFormParent}
							selectedId={formParent}
							tree={availableTermsTree}
						/>
					}
					<Button
						isSecondary
						type="submit"
						className="editor-post-taxonomies__hierarchical-terms-submit"
					>
						{newTermSubmitLabel}
					</Button>
				</form>
			),
		];
	}
}

export default compose([
	withSelect((select, { slug }) => {
		const { getCurrentPost } = select('core/editor');
		const { getTaxonomy } = select('core');
		const taxonomy = getTaxonomy(slug);
		return {
			hasCreateAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-create-' + taxonomy.rest_base], false) : false,
			hasAssignAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-assign-' + taxonomy.rest_base], false) : false,
			terms: taxonomy ? select('core/editor').getEditedPostAttribute(taxonomy.rest_base) : [],
			taxonomy,
		};
	}),
	withDispatch((dispatch) => ({
		onUpdateTerms(terms, restBase) {
			dispatch('core/editor').editPost({ [restBase]: terms });
		},
	})),
	withSpokenMessages,
	withInstanceId,
	//withFilters( 'editor.PostTaxonomyType' ), // Intentionally commented out.
])(RadioTermSelector);

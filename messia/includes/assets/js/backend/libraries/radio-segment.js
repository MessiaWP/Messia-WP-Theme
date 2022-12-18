/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components/_radio_term_selector.jsx":
/*!*****************************************************!*\
  !*** ./src/js/_components/_radio_term_selector.jsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const {
  __,
  _x,
  _n,
  sprintf
} = wp.i18n;
const {
  Component
} = wp.element;
const {
  TreeSelect,
  withSpokenMessages,
  withFilters,
  Button
} = wp.components;
const {
  withSelect,
  withDispatch,
  select,
  subscribe
} = wp.data;
const {
  withInstanceId,
  compose
} = wp.compose;
const {
  apiFetch
} = wp;
const {
  addQueryArgs
} = wp.url;
const {
  groupBy,
  get,
  unescape,
  find,
  some,
  invoke
} = lodash;
const DEFAULT_QUERY = {
  per_page: -1,
  orderby: 'name',
  order: 'asc',
  _fields: 'id,name,parent'
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
      disabled: false
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
            document.dispatchEvent(new Event('messiaContentIsSaved', {
              bubbles: false
            }));
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
    const flatTermsWithParentAndChildren = flatTerms.map(term => {
      return {
        children: [],
        parent: null,
        ...term
      };
    });
    const termsByParent = groupBy(flatTermsWithParentAndChildren, 'parent');
    if (termsByParent.null && termsByParent.null.length) {
      return flatTermsWithParentAndChildren;
    }
    const fillWithChildren = terms => {
      return terms.map(term => {
        const children = termsByParent[term.id];
        return {
          ...term,
          children: children && children.length ? fillWithChildren(children) : []
        };
      });
    };
    return fillWithChildren(termsByParent['0'] || []);
  }
  onChange(event) {
    // @helgatheviking
    const go = this.shouldChangeSegment();
    if (!go) {
      return;
    }
    const {
      onUpdateTerms,
      taxonomy
    } = this.props;
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
      let go = confirm(__('Metaboxes will be updated. You have unsaved changes that could be lost. Proceed?', 'messia'));
      if (!go) {
        return false;
      }
    }
    return true;
  }
  onChangeFormName(event) {
    const newValue = event.target.value.trim() === '' ? '' : event.target.value;
    this.setState({
      formName: newValue
    });
  }
  onChangeFormParent(newParent) {
    this.setState({
      formParent: newParent
    });
  }
  onToggleForm() {
    this.setState(state => ({
      showForm: !state.showForm
    }));
  }
  findTerm(terms, parent, name) {
    return find(terms, term => {
      return (!term.parent && !parent || parseInt(term.parent) === parseInt(parent)) && term.name.toLowerCase() === name.toLowerCase();
    });
  }
  onAddTerm(event) {
    event.preventDefault();
    const go = this.shouldChangeSegment();
    if (!go) {
      return;
    }
    const {
      onUpdateTerms,
      taxonomy,
      terms,
      slug
    } = this.props;
    const {
      formName,
      formParent,
      adding,
      availableTerms
    } = this.state;
    if (formName === '' || adding) {
      return;
    }

    // check if the term we are adding already exists
    const existingTerm = this.findTerm(availableTerms, formParent, formName);
    if (existingTerm) {
      // if the term we are adding exists but is not selected select it
      if (!some(terms, term => term === existingTerm.id)) {
        onUpdateTerms([existingTerm.id], taxonomy.rest_base); // @helgatheviking
      }

      this.setState({
        formName: '',
        formParent: ''
      });
      return;
    }
    this.setState({
      adding: true
    });
    this.addRequest = apiFetch({
      path: `/wp/v2/${taxonomy.rest_base}`,
      method: 'POST',
      data: {
        name: formName,
        parent: formParent ? formParent : undefined
      }
    });
    // Tries to create a term or fetch it if it already exists
    const findOrCreatePromise = this.addRequest.catch(error => {
      const errorCode = error.code;
      if (errorCode === 'term_exists') {
        // search the new category created since last fetch
        this.addRequest = apiFetch({
          path: addQueryArgs(`/wp/v2/${taxonomy.rest_base}`, {
            ...DEFAULT_QUERY,
            parent: formParent || 0,
            search: formName
          })
        });
        return this.addRequest.then(searchResult => {
          return this.findTerm(searchResult, formParent, formName);
        });
      }
      return Promise.reject(error);
    });
    findOrCreatePromise.then(term => {
      const hasTerm = !!find(this.state.availableTerms, availableTerm => availableTerm.id === term.id);
      const newAvailableTerms = hasTerm ? this.state.availableTerms : [term, ...this.state.availableTerms];
      const termAddedMessage = sprintf(_x('%s added', 'term', 'messia'), get(this.props.taxonomy, ['labels', 'singular_name'], slug === 'category' ? __('Category', 'messia') : __('Term', 'messia')));
      this.props.speak(termAddedMessage, 'assertive');
      this.addRequest = null;
      this.setState({
        adding: false,
        formName: '',
        formParent: '',
        availableTerms: newAvailableTerms,
        availableTermsTree: this.sortBySelected(this.buildTermsTree(newAvailableTerms))
      });
      onUpdateTerms([term.id], taxonomy.rest_base); // @helgatheviking
    }, xhr => {
      if (xhr.statusText === 'abort') {
        return;
      }
      this.addRequest = null;
      this.setState({
        adding: false
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
    const {
      taxonomy
    } = this.props;
    if (!taxonomy) {
      return;
    }
    this.fetchRequest = apiFetch({
      path: addQueryArgs(`/wp/v2/${taxonomy.rest_base}`, DEFAULT_QUERY)
    });
    this.fetchRequest.then(terms => {
      // resolve
      const availableTermsTree = this.sortBySelected(this.buildTermsTree(terms));
      this.fetchRequest = null;
      this.setState({
        loading: false,
        availableTermsTree,
        availableTerms: terms
      });
    }, xhr => {
      // reject
      if (xhr.statusText === 'abort') {
        return;
      }
      this.fetchRequest = null;
      this.setState({
        loading: false
      });
    });
  }
  updateMetaboxes() {
    let prevSegment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let currentSegment = arguments.length > 1 ? arguments[1] : undefined;
    this.setState({
      disabled: true
    });
    wp.data.dispatch('core/editor').lockPostSaving('messia/segment-lock');
    this.fetchMetaboxes(prevSegment, currentSegment).then(result => {
      let newId = result.metaboxHtml.getAttribute('id');
      let prevId = newId.replace(/(\d+)/g, result.prevTerm);
      let postType = wp.data.select('core/editor').getCurrentPostType();
      document.getElementById(prevId).replaceWith(result.metaboxHtml);
      window.postboxes.add_postbox_toggles(postType);
      wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');
      this.setState({
        disabled: false
      });
      this.onChangeMetaboxes();
      metaboxChanged = false;
      document.getElementById(newId).dispatchEvent(new Event('objectMetaboxUpdated', {
        bubbles: true
      }));
    }, reject => {
      // nonce did not verified or other unexpected err
      document.querySelector('#segment-constructor-term-id-' + prevSegment).remove();
      wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');
      metaboxChanged = false;
      this.setState({
        disabled: false
      });
    });
  }
  async fetchMetaboxes() {
    let prevTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let termId = arguments.length > 1 ? arguments[1] : undefined;
    return await new Promise((resolve, reject) => {
      apiFetch({
        url: addQueryArgs(document.location.href, {
          'fetch-metabox-for-term': termId,
          'messia_nonce': document.querySelector('#segment-constructor-term-id-' + prevTerm).querySelector('#messia_nonce').value
        }),
        method: 'POST',
        parse: false
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
          metaboxHtml: metabox
        });
      }).catch(e => {
        wp.data.dispatch('core/notices').createNotice('error',
        // Can be one of: success, info, warning, error.
        __('An error occurred while fetching metabox.', 'messia'),
        // Text string to display.
        {
          isDismissible: true
        });
      });
    });
  }
  sortBySelected(termsTree) {
    const {
      terms
    } = this.props;
    const treeHasSelection = termTree => {
      if (terms.indexOf(termTree.id) !== -1) {
        return true;
      }
      if (undefined === termTree.children) {
        return false;
      }
      const anyChildIsSelected = termTree.children.map(treeHasSelection).filter(child => child).length > 0;
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
    const {
      availableTermsTree
    } = this.state;
    const filterValue = event.target.value;
    const filteredTermsTree = availableTermsTree.map(this.getFilterMatcher(filterValue)).filter(term => term);
    const getResultCount = terms => {
      let count = 0;
      for (let i = 0; i < terms.length; i++) {
        count++;
        if (undefined !== terms[i].children) {
          count += getResultCount(terms[i].children);
        }
      }
      return count;
    };
    this.setState({
      filterValue,
      filteredTermsTree
    });
    const resultCount = getResultCount(filteredTermsTree);
    const resultsFoundMessage = sprintf(_n('%d result found.', '%d results found.', resultCount, 'messia'), resultCount);
    this.props.debouncedSpeak(resultsFoundMessage, 'assertive');
  }
  getFilterMatcher(filterValue) {
    const matchTermsForFilter = originalTerm => {
      if ('' === filterValue) {
        return originalTerm;
      }

      // Shallow clone, because we'll be filtering the term's children and
      // don't want to modify the original term.
      const term = {
        ...originalTerm
      };

      // Map and filter the children, recursive so we deal with grandchildren
      // and any deeper levels.
      if (term.children.length > 0) {
        term.children = term.children.map(matchTermsForFilter).filter(child => child);
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
    const {
      terms = [],
      taxonomy
    } = this.props; // @helgatheviking
    const klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

    return renderedTerms.map(term => {
      const id = `editor-post-taxonomies-${klass}-term-${term.id}`; // @helgatheviking
      return /*#__PURE__*/React.createElement("div", {
        key: term.id,
        className: 'editor-post-taxonomies__' + klass + '-terms-choice '
      }, /*#__PURE__*/React.createElement("input", {
        id: id,
        className: 'editor-post-taxonomies__' + klass + '-terms-input ',
        type: "radio" // @helgatheviking
        ,
        checked: terms.indexOf(term.id) !== -1,
        value: term.id,
        onChange: this.onChange,
        name: 'radio_tax_input-' + this.props.slug // @helgatheviking
        ,
        disabled: this.state.disabled // @helgatheviking
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: id
      }, unescape(term.name)), !!term.children.length && /*#__PURE__*/React.createElement("div", {
        className: 'editor-post-taxonomies__' + klass + '-terms-subchoices '
      }, this.renderTerms(term.children)));
    });
  }
  render() {
    const {
      slug,
      taxonomy,
      instanceId,
      hasCreateAction,
      hasAssignAction
    } = this.props;
    const klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

    if (!hasAssignAction) {
      return null;
    }
    const {
      availableTermsTree,
      availableTerms,
      filteredTermsTree,
      formName,
      formParent,
      loading,
      showForm,
      filterValue
    } = this.state;
    const labelWithFallback = (labelProperty, fallbackIsCategory, fallbackIsNotCategory) => get(taxonomy, ['labels', labelProperty], slug === 'category' ? fallbackIsCategory : fallbackIsNotCategory);
    const newTermButtonLabel = labelWithFallback('add_new_item', __('Add new category', 'messia'), __('Add new term', 'messia'));
    const newTermLabel = labelWithFallback('new_item_name', __('Add new category', 'messia'), __('Add new term', 'messia'));
    const parentSelectLabel = labelWithFallback('parent_item', __('Parent Category', 'messia'), __('Parent Term', 'messia'));
    const noParentOption = `— ${parentSelectLabel} —`;
    const newTermSubmitLabel = newTermButtonLabel;
    const inputId = `editor-post-taxonomies__${klass}-terms-input-${instanceId}`; // @helgatheviking
    const filterInputId = `editor-post-taxonomies__${klass}-terms-filter-${instanceId}`; // @helgatheviking
    const filterLabel = get(this.props.taxonomy, ['labels', 'search_items'], __('Search Terms', 'messia'));
    const groupLabel = get(this.props.taxonomy, ['name'], __('Terms', 'messia'));
    const showFilter = availableTerms.length >= MIN_TERMS_COUNT_FOR_FILTER;
    return [showFilter && /*#__PURE__*/React.createElement("label", {
      key: "filter-label",
      htmlFor: filterInputId
    }, filterLabel), showFilter && /*#__PURE__*/React.createElement("input", {
      type: "search",
      id: filterInputId,
      value: filterValue,
      onChange: this.setFilterValue,
      className: "editor-post-taxonomies__hierarchical-terms-filter",
      key: "term-filter-input"
    }), /*#__PURE__*/React.createElement("div", {
      className: "editor-post-taxonomies__hierarchical-terms-list",
      key: "term-list",
      tabIndex: "0",
      role: "group",
      "aria-label": groupLabel
    }, this.renderTerms('' !== filterValue ? filteredTermsTree : availableTermsTree)), !loading && hasCreateAction && /*#__PURE__*/React.createElement(Button, {
      key: "term-add-button",
      onClick: this.onToggleForm,
      className: "editor-post-taxonomies__hierarchical-terms-add",
      "aria-expanded": showForm,
      isLink: true
    }, newTermButtonLabel), showForm && /*#__PURE__*/React.createElement("form", {
      onSubmit: this.onAddTerm,
      key: klass + '-terms-form'
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: inputId,
      className: "editor-post-taxonomies__hierarchical-terms-label"
    }, newTermLabel), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: inputId,
      className: "editor-post-taxonomies__hierarchical-terms-input",
      value: formName,
      onChange: this.onChangeFormName,
      required: true
    }), taxonomy.hierarchical && !!availableTerms.length &&
    /*#__PURE__*/
    // @helgatheviking
    React.createElement(TreeSelect, {
      label: parentSelectLabel,
      noOptionLabel: noParentOption,
      onChange: this.onChangeFormParent,
      selectedId: formParent,
      tree: availableTermsTree
    }), /*#__PURE__*/React.createElement(Button, {
      isSecondary: true,
      type: "submit",
      className: "editor-post-taxonomies__hierarchical-terms-submit"
    }, newTermSubmitLabel))];
  }
}
/* harmony default export */ __webpack_exports__["default"] = (compose([withSelect((select, _ref) => {
  let {
    slug
  } = _ref;
  const {
    getCurrentPost
  } = select('core/editor');
  const {
    getTaxonomy
  } = select('core');
  const taxonomy = getTaxonomy(slug);
  return {
    hasCreateAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-create-' + taxonomy.rest_base], false) : false,
    hasAssignAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-assign-' + taxonomy.rest_base], false) : false,
    terms: taxonomy ? select('core/editor').getEditedPostAttribute(taxonomy.rest_base) : [],
    taxonomy
  };
}), withDispatch(dispatch => ({
  onUpdateTerms(terms, restBase) {
    dispatch('core/editor').editPost({
      [restBase]: terms
    });
  }
})), withSpokenMessages, withInstanceId
//withFilters( 'editor.PostTaxonomyType' ), // Intentionally commented out.
])(RadioTermSelector));

/***/ }),

/***/ "./src/js/_backend/radio-segment.js":
/*!******************************************!*\
  !*** ./src/js/_backend/radio-segment.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_components_radio_term_selector_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/_components/_radio_term_selector.jsx */ "./src/js/_components/_radio_term_selector.jsx");


function CustomizeTaxonomySelector(OriginalComponent) {
	return function (props) {

		if (props.slug === 'messia_object_segment') {

			return wp.element.createElement(
				_js_components_radio_term_selector_jsx__WEBPACK_IMPORTED_MODULE_0__["default"],
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************************************************!*\
  !*** ./src/entries/backend/libraries/entry-radio-segment.js ***!
  \**************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_backend_radio_segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/_backend/radio-segment.js */ "./src/js/_backend/radio-segment.js");
// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvbGlicmFyaWVzL3JhZGlvLXNlZ21lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0VBQUVBLEVBQUU7RUFBRUMsRUFBRTtFQUFFQyxFQUFFO0VBQUVDO0FBQVEsQ0FBQyxHQUFHQyxFQUFFLENBQUNDLElBQUk7QUFDdkMsTUFBTTtFQUFFQztBQUFVLENBQUMsR0FBR0YsRUFBRSxDQUFDRyxPQUFPO0FBQ2hDLE1BQU07RUFBRUMsVUFBVTtFQUFFQyxrQkFBa0I7RUFBRUMsV0FBVztFQUFFQztBQUFPLENBQUMsR0FBR1AsRUFBRSxDQUFDUSxVQUFVO0FBQzdFLE1BQU07RUFBRUMsVUFBVTtFQUFFQyxZQUFZO0VBQUVDLE1BQU07RUFBRUM7QUFBVSxDQUFDLEdBQUdaLEVBQUUsQ0FBQ2EsSUFBSTtBQUMvRCxNQUFNO0VBQUVDLGNBQWM7RUFBRUM7QUFBUSxDQUFDLEdBQUdmLEVBQUUsQ0FBQ2UsT0FBTztBQUM5QyxNQUFNO0VBQUVDO0FBQVMsQ0FBQyxHQUFHaEIsRUFBRTtBQUN2QixNQUFNO0VBQUVpQjtBQUFhLENBQUMsR0FBR2pCLEVBQUUsQ0FBQ2tCLEdBQUc7QUFDL0IsTUFBTTtFQUFFQyxPQUFPO0VBQUVDLEdBQUc7RUFBRUMsUUFBUTtFQUFFQyxJQUFJO0VBQUVDLElBQUk7RUFBRUM7QUFBTyxDQUFDLEdBQUdDLE1BQU07QUFFN0QsTUFBTUMsYUFBYSxHQUFHO0VBQ3JCQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0VBQ1pDLE9BQU8sRUFBRSxNQUFNO0VBQ2ZDLEtBQUssRUFBRSxLQUFLO0VBQ1pDLE9BQU8sRUFBRTtBQUNWLENBQUM7QUFFRCxNQUFNQywwQkFBMEIsR0FBRyxDQUFDO0FBRXBDLElBQUlDLGNBQWMsR0FBRyxLQUFLO0FBRTFCLE1BQU1DLGlCQUFpQixTQUFTL0IsU0FBUyxDQUFDO0VBRXpDZ0MsV0FBVyxHQUFHO0lBQ2IsS0FBSyxDQUFDLEdBQUdDLFNBQVMsQ0FBQztJQUNu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QUFDO0FBQ0YsQ0FBQyxDQUFDLEVBQ0ZuRixZQUFZLENBQUVtSSxRQUFRLEtBQU07RUFDM0JqRCxhQUFhLENBQUNMLEtBQUssRUFBRW9JLFFBQVEsRUFBRTtJQUM5QjlFLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQytFLFFBQVEsQ0FBQztNQUFFLENBQUNELFFBQVEsR0FBR3BJO0lBQU0sQ0FBQyxDQUFDO0VBQ3hEO0FBQ0QsQ0FBQyxDQUFDLENBQUMsRUFDSGxGLGtCQUFrQixFQUNsQlM7QUFDQTtBQUFBLENBQ0EsQ0FBQyxDQUFDbUIsaUJBQWlCLENBQUM7Ozs7Ozs7Ozs7OztBQy9vQnlEOztBQUU5RTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSw4RUFBaUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUN6QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fY29tcG9uZW50cy9fcmFkaW9fdGVybV9zZWxlY3Rvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL3JhZGlvLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2JhY2tlbmQvbGlicmFyaWVzL2VudHJ5LXJhZGlvLXNlZ21lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBfXywgX3gsIF9uLCBzcHJpbnRmIH0gPSB3cC5pMThuO1xuY29uc3QgeyBDb21wb25lbnQgfSA9IHdwLmVsZW1lbnQ7XG5jb25zdCB7IFRyZWVTZWxlY3QsIHdpdGhTcG9rZW5NZXNzYWdlcywgd2l0aEZpbHRlcnMsIEJ1dHRvbiB9ID0gd3AuY29tcG9uZW50cztcbmNvbnN0IHsgd2l0aFNlbGVjdCwgd2l0aERpc3BhdGNoLCBzZWxlY3QsIHN1YnNjcmliZSB9ID0gd3AuZGF0YTtcbmNvbnN0IHsgd2l0aEluc3RhbmNlSWQsIGNvbXBvc2UgfSA9IHdwLmNvbXBvc2U7XG5jb25zdCB7IGFwaUZldGNoIH0gPSB3cDtcbmNvbnN0IHsgYWRkUXVlcnlBcmdzIH0gPSB3cC51cmw7XG5jb25zdCB7IGdyb3VwQnksIGdldCwgdW5lc2NhcGUsIGZpbmQsIHNvbWUsIGludm9rZSB9ID0gbG9kYXNoO1xuXG5jb25zdCBERUZBVUxUX1FVRVJZID0ge1xuXHRwZXJfcGFnZTogLTEsXG5cdG9yZGVyYnk6ICduYW1lJyxcblx0b3JkZXI6ICdhc2MnLFxuXHRfZmllbGRzOiAnaWQsbmFtZSxwYXJlbnQnLFxufTtcblxuY29uc3QgTUlOX1RFUk1TX0NPVU5UX0ZPUl9GSUxURVIgPSA4O1xuXG5sZXQgbWV0YWJveENoYW5nZWQgPSBmYWxzZTtcblxuY2xhc3MgUmFkaW9UZXJtU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0dGhpcy5maW5kVGVybSA9IHRoaXMuZmluZFRlcm0uYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2VGb3JtTmFtZSA9IHRoaXMub25DaGFuZ2VGb3JtTmFtZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2VGb3JtUGFyZW50ID0gdGhpcy5vbkNoYW5nZUZvcm1QYXJlbnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQWRkVGVybSA9IHRoaXMub25BZGRUZXJtLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblRvZ2dsZUZvcm0gPSB0aGlzLm9uVG9nZ2xlRm9ybS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc2V0RmlsdGVyVmFsdWUgPSB0aGlzLnNldEZpbHRlclZhbHVlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb3J0QnlTZWxlY3RlZCA9IHRoaXMuc29ydEJ5U2VsZWN0ZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0bG9hZGluZzogdHJ1ZSxcblx0XHRcdGF2YWlsYWJsZVRlcm1zVHJlZTogW10sXG5cdFx0XHRhdmFpbGFibGVUZXJtczogW10sXG5cdFx0XHRhZGRpbmc6IGZhbHNlLFxuXHRcdFx0Zm9ybU5hbWU6ICcnLFxuXHRcdFx0Zm9ybVBhcmVudDogJycsXG5cdFx0XHRzaG93Rm9ybTogZmFsc2UsXG5cdFx0XHRmaWx0ZXJWYWx1ZTogJycsXG5cdFx0XHRmaWx0ZXJlZFRlcm1zVHJlZTogW10sXG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0fTtcblxuXHRcdHRoaXMub25DaGFuZ2VNZXRhYm94ZXMoKTtcblx0XHR0aGlzLm9uU2F2aW5nUG9zdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyYWNrIHNhdmluZyBwb3N0IGV2ZW50XG5cdCAqL1xuXHRvblNhdmluZ1Bvc3QoKSB7XG5cdFx0d3AuYXBpRmV0Y2gudXNlKGZ1bmN0aW9uIChvcHRpb25zLCBuZXh0KSB7XG5cblx0XHRcdHZhciByZXN1bHQgPSBuZXh0KG9wdGlvbnMpO1xuXHRcdFx0cmVzdWx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblx0XHRcdFx0dmFyIHVuU3Vic2NyaWJlID0gc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgc2F2aW5nID0gc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzU2F2aW5nUG9zdCgpO1xuXHRcdFx0XHRcdHZhciBpc0F1dG9zYXZpbmdQb3N0ID0gd3AuZGF0YS5zZWxlY3QoJ2NvcmUvZWRpdG9yJykuaXNBdXRvc2F2aW5nUG9zdCgpO1xuXHRcdFx0XHRcdGlmICghc2F2aW5nICYmICFpc0F1dG9zYXZpbmdQb3N0KSB7XG5cdFx0XHRcdFx0XHR1blN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdFx0aWYgKG1ldGFib3hDaGFuZ2VkID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGFib3hDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbWVzc2lhQ29udGVudElzU2F2ZWQnLCB7IGJ1YmJsZXM6IGZhbHNlIH0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGV2ZW50cyB0byBzd2l0Y2ggbWV0YWJveENoYW5nZWQgZmxhZyB0byB0cnVlXG5cdCAqIG9uY2Ugc29tZSBlbGVtZW50ZGF0YSBpbnNpZGUgbWV0YWJveCBnb3QgbmV3IGNvbnRlbnRcblx0ICovXG5cdG9uQ2hhbmdlTWV0YWJveGVzKCkge1xuXG5cdFx0bGV0IG1ldGFib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0Ym94LWNvbnRhaW5lciBbaWRePVwic2VnbWVudC1jb25zdHJ1Y3Rvci10ZXJtLWlkXCJdJyk7XG5cblx0XHRpZiAobnVsbCA9PT0gbWV0YWJveGVzIHx8IDAgPT09IG1ldGFib3hlcy5sZW5ndGgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRtZXRhYm94ZXMuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0MkNoYW5nZScsIHRoaXMuaGFuZGxlTWV0YWJveENoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0bWV0YWJveGVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvZGVNaXJyb3JDaGFuZ2UnLCB0aGlzLmhhbmRsZU1ldGFib3hDaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdG1ldGFib3hlcy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaGFuZGxlTWV0YWJveENoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0bWV0YWJveGVzLmFkZEV2ZW50TGlzdGVuZXIoJ3NvcnRhYmxlQ2hhbmdlJywgdGhpcy5oYW5kbGVNZXRhYm94Q2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcblx0fVxuXG5cdGhhbmRsZU1ldGFib3hDaGFuZ2UoKSB7XG5cdFx0bWV0YWJveENoYW5nZWQgPSB0cnVlO1xuXHR9XG5cblx0YnVpbGRUZXJtc1RyZWUoZmxhdFRlcm1zKSB7XG5cdFx0Y29uc3QgZmxhdFRlcm1zV2l0aFBhcmVudEFuZENoaWxkcmVuID0gZmxhdFRlcm1zLm1hcCgodGVybSkgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0XHRwYXJlbnQ6IG51bGwsXG5cdFx0XHRcdC4uLnRlcm0sXG5cdFx0XHR9O1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdGVybXNCeVBhcmVudCA9IGdyb3VwQnkoZmxhdFRlcm1zV2l0aFBhcmVudEFuZENoaWxkcmVuLCAncGFyZW50Jyk7XG5cdFx0aWYgKHRlcm1zQnlQYXJlbnQubnVsbCAmJiB0ZXJtc0J5UGFyZW50Lm51bGwubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmxhdFRlcm1zV2l0aFBhcmVudEFuZENoaWxkcmVuO1xuXHRcdH1cblx0XHRjb25zdCBmaWxsV2l0aENoaWxkcmVuID0gKHRlcm1zKSA9PiB7XG5cdFx0XHRyZXR1cm4gdGVybXMubWFwKCh0ZXJtKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gdGVybXNCeVBhcmVudFt0ZXJtLmlkXTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHQuLi50ZXJtLFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggP1xuXHRcdFx0XHRcdFx0ZmlsbFdpdGhDaGlsZHJlbihjaGlsZHJlbikgOlxuXHRcdFx0XHRcdFx0W10sXG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZpbGxXaXRoQ2hpbGRyZW4odGVybXNCeVBhcmVudFsnMCddIHx8IFtdKTtcblx0fVxuXG5cdG9uQ2hhbmdlKGV2ZW50KSB7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdGNvbnN0IGdvID0gdGhpcy5zaG91bGRDaGFuZ2VTZWdtZW50KCk7XG5cdFx0aWYgKCFnbykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCB7IG9uVXBkYXRlVGVybXMsIHRheG9ub215IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHRlcm1JZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuXHRcdG9uVXBkYXRlVGVybXMoW3Rlcm1JZF0sIHRheG9ub215LnJlc3RfYmFzZSk7XG5cdH1cblxuXHQvKipcblx0ICogV2lsbCB0cmlnZ2VyIHdhcm5pbmcgaWYgc2VnbWVudCBjaGFuZ2VkXG5cdCAqIGJ1dCBtZXRhYm94IGhhcyB1bnNhdmVkIGNoYW5nZXNcblx0ICovXG5cdHNob3VsZENoYW5nZVNlZ21lbnQoKSB7XG5cblx0XHRsZXQgaXNQb3N0RGlydHkgPSB3cC5kYXRhLnNlbGVjdCgnY29yZS9lZGl0b3InKS5pc0VkaXRlZFBvc3REaXJ0eSgpO1xuXG5cdFx0aWYgKG1ldGFib3hDaGFuZ2VkIHx8IGlzUG9zdERpcnR5KSB7XG5cdFx0XHRsZXQgZ28gPSBjb25maXJtKF9fKCAnTWV0YWJveGVzIHdpbGwgYmUgdXBkYXRlZC4gWW91IGhhdmUgdW5zYXZlZCBjaGFuZ2VzIHRoYXQgY291bGQgYmUgbG9zdC4gUHJvY2VlZD8nLCAnbWVzc2lhJyApKTtcblx0XHRcdGlmICghZ28pIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRvbkNoYW5nZUZvcm1OYW1lKGV2ZW50KSB7XG5cdFx0Y29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpID09PSAnJyA/ICcnIDogZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBmb3JtTmFtZTogbmV3VmFsdWUgfSk7XG5cdH1cblxuXHRvbkNoYW5nZUZvcm1QYXJlbnQobmV3UGFyZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGZvcm1QYXJlbnQ6IG5ld1BhcmVudCB9KTtcblx0fVxuXG5cdG9uVG9nZ2xlRm9ybSgpIHtcblx0XHR0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHtcblx0XHRcdHNob3dGb3JtOiAhc3RhdGUuc2hvd0Zvcm0sXG5cdFx0fSkpO1xuXHR9XG5cblx0ZmluZFRlcm0odGVybXMsIHBhcmVudCwgbmFtZSkge1xuXHRcdHJldHVybiBmaW5kKHRlcm1zLCAodGVybSkgPT4ge1xuXHRcdFx0cmV0dXJuICgoIXRlcm0ucGFyZW50ICYmICFwYXJlbnQpIHx8IHBhcnNlSW50KHRlcm0ucGFyZW50KSA9PT0gcGFyc2VJbnQocGFyZW50KSkgJiZcblx0XHRcdFx0dGVybS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHR9KTtcblx0fVxuXG5cdG9uQWRkVGVybShldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCBnbyA9IHRoaXMuc2hvdWxkQ2hhbmdlU2VnbWVudCgpO1xuXHRcdGlmICghZ28pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB7IG9uVXBkYXRlVGVybXMsIHRheG9ub215LCB0ZXJtcywgc2x1ZyB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGZvcm1OYW1lLCBmb3JtUGFyZW50LCBhZGRpbmcsIGF2YWlsYWJsZVRlcm1zIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmIChmb3JtTmFtZSA9PT0gJycgfHwgYWRkaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIHRlcm0gd2UgYXJlIGFkZGluZyBhbHJlYWR5IGV4aXN0c1xuXHRcdGNvbnN0IGV4aXN0aW5nVGVybSA9IHRoaXMuZmluZFRlcm0oYXZhaWxhYmxlVGVybXMsIGZvcm1QYXJlbnQsIGZvcm1OYW1lKTtcblx0XHRpZiAoZXhpc3RpbmdUZXJtKSB7XG5cdFx0XHQvLyBpZiB0aGUgdGVybSB3ZSBhcmUgYWRkaW5nIGV4aXN0cyBidXQgaXMgbm90IHNlbGVjdGVkIHNlbGVjdCBpdFxuXHRcdFx0aWYgKCFzb21lKHRlcm1zLCAodGVybSkgPT4gdGVybSA9PT0gZXhpc3RpbmdUZXJtLmlkKSkge1xuXHRcdFx0XHRvblVwZGF0ZVRlcm1zKFtleGlzdGluZ1Rlcm0uaWRdLCB0YXhvbm9teS5yZXN0X2Jhc2UpOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRmb3JtTmFtZTogJycsXG5cdFx0XHRcdGZvcm1QYXJlbnQ6ICcnLFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRhZGRpbmc6IHRydWUsXG5cdFx0fSk7XG5cdFx0dGhpcy5hZGRSZXF1ZXN0ID0gYXBpRmV0Y2goe1xuXHRcdFx0cGF0aDogYC93cC92Mi8ke3RheG9ub215LnJlc3RfYmFzZX1gLFxuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdG5hbWU6IGZvcm1OYW1lLFxuXHRcdFx0XHRwYXJlbnQ6IGZvcm1QYXJlbnQgPyBmb3JtUGFyZW50IDogdW5kZWZpbmVkLFxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHQvLyBUcmllcyB0byBjcmVhdGUgYSB0ZXJtIG9yIGZldGNoIGl0IGlmIGl0IGFscmVhZHkgZXhpc3RzXG5cdFx0Y29uc3QgZmluZE9yQ3JlYXRlUHJvbWlzZSA9IHRoaXMuYWRkUmVxdWVzdFxuXHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xuXHRcdFx0XHRpZiAoZXJyb3JDb2RlID09PSAndGVybV9leGlzdHMnKSB7XG5cdFx0XHRcdFx0Ly8gc2VhcmNoIHRoZSBuZXcgY2F0ZWdvcnkgY3JlYXRlZCBzaW5jZSBsYXN0IGZldGNoXG5cdFx0XHRcdFx0dGhpcy5hZGRSZXF1ZXN0ID0gYXBpRmV0Y2goe1xuXHRcdFx0XHRcdFx0cGF0aDogYWRkUXVlcnlBcmdzKFxuXHRcdFx0XHRcdFx0XHRgL3dwL3YyLyR7dGF4b25vbXkucmVzdF9iYXNlfWAsXG5cdFx0XHRcdFx0XHRcdHsgLi4uREVGQVVMVF9RVUVSWSwgcGFyZW50OiBmb3JtUGFyZW50IHx8IDAsIHNlYXJjaDogZm9ybU5hbWUgfVxuXHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5hZGRSZXF1ZXN0XG5cdFx0XHRcdFx0XHQudGhlbigoc2VhcmNoUmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbmRUZXJtKHNlYXJjaFJlc3VsdCwgZm9ybVBhcmVudCwgZm9ybU5hbWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcblx0XHRcdH0pO1xuXHRcdGZpbmRPckNyZWF0ZVByb21pc2Vcblx0XHRcdC50aGVuKCh0ZXJtKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGhhc1Rlcm0gPSAhIWZpbmQodGhpcy5zdGF0ZS5hdmFpbGFibGVUZXJtcywgKGF2YWlsYWJsZVRlcm0pID0+IGF2YWlsYWJsZVRlcm0uaWQgPT09IHRlcm0uaWQpO1xuXHRcdFx0XHRjb25zdCBuZXdBdmFpbGFibGVUZXJtcyA9IGhhc1Rlcm0gPyB0aGlzLnN0YXRlLmF2YWlsYWJsZVRlcm1zIDogW3Rlcm0sIC4uLnRoaXMuc3RhdGUuYXZhaWxhYmxlVGVybXNdO1xuXHRcdFx0XHRjb25zdCB0ZXJtQWRkZWRNZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdFx0XHRfeCgnJXMgYWRkZWQnLCAndGVybScsICdtZXNzaWEnKSxcblx0XHRcdFx0XHRnZXQoXG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLnRheG9ub215LFxuXHRcdFx0XHRcdFx0WydsYWJlbHMnLCAnc2luZ3VsYXJfbmFtZSddLFxuXHRcdFx0XHRcdFx0c2x1ZyA9PT0gJ2NhdGVnb3J5JyA/IF9fKCdDYXRlZ29yeScsICdtZXNzaWEnKSA6IF9fKCdUZXJtJywgJ21lc3NpYScpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLnByb3BzLnNwZWFrKHRlcm1BZGRlZE1lc3NhZ2UsICdhc3NlcnRpdmUnKTtcblx0XHRcdFx0dGhpcy5hZGRSZXF1ZXN0ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0YWRkaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRmb3JtTmFtZTogJycsXG5cdFx0XHRcdFx0Zm9ybVBhcmVudDogJycsXG5cdFx0XHRcdFx0YXZhaWxhYmxlVGVybXM6IG5ld0F2YWlsYWJsZVRlcm1zLFxuXHRcdFx0XHRcdGF2YWlsYWJsZVRlcm1zVHJlZTogdGhpcy5zb3J0QnlTZWxlY3RlZCh0aGlzLmJ1aWxkVGVybXNUcmVlKG5ld0F2YWlsYWJsZVRlcm1zKSksXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRvblVwZGF0ZVRlcm1zKFt0ZXJtLmlkXSwgdGF4b25vbXkucmVzdF9iYXNlKTsgLy8gQGhlbGdhdGhldmlraW5nXG5cdFx0XHR9LCAoeGhyKSA9PiB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzVGV4dCA9PT0gJ2Fib3J0Jykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmFkZFJlcXVlc3QgPSBudWxsO1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRhZGRpbmc6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy5mZXRjaFRlcm1zKCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRpbnZva2UodGhpcy5mZXRjaFJlcXVlc3QsIFsnYWJvcnQnXSk7XG5cdFx0aW52b2tlKHRoaXMuYWRkUmVxdWVzdCwgWydhYm9ydCddKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcblx0XHRpZiAodGhpcy5wcm9wcy50YXhvbm9teSAhPT0gcHJldlByb3BzLnRheG9ub215KSB7XG5cdFx0XHR0aGlzLmZldGNoVGVybXMoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy50ZXJtcyAhPT0gcHJldlByb3BzLnRlcm1zKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZU1ldGFib3hlcyhwcmV2UHJvcHMudGVybXNbMF0sIHRoaXMucHJvcHMudGVybXNbMF0pO1xuXHRcdH1cblx0fVxuXG5cdGZldGNoVGVybXMoKSB7XG5cdFx0Y29uc3QgeyB0YXhvbm9teSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAoIXRheG9ub215KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZmV0Y2hSZXF1ZXN0ID0gYXBpRmV0Y2goe1xuXHRcdFx0cGF0aDogYWRkUXVlcnlBcmdzKGAvd3AvdjIvJHt0YXhvbm9teS5yZXN0X2Jhc2V9YCwgREVGQVVMVF9RVUVSWSksXG5cdFx0fSk7XG5cdFx0dGhpcy5mZXRjaFJlcXVlc3QudGhlbihcblx0XHRcdCh0ZXJtcykgPT4geyAvLyByZXNvbHZlXG5cdFx0XHRcdGNvbnN0IGF2YWlsYWJsZVRlcm1zVHJlZSA9IHRoaXMuc29ydEJ5U2VsZWN0ZWQodGhpcy5idWlsZFRlcm1zVHJlZSh0ZXJtcykpO1xuXG5cdFx0XHRcdHRoaXMuZmV0Y2hSZXF1ZXN0ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0bG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdFx0YXZhaWxhYmxlVGVybXNUcmVlLFxuXHRcdFx0XHRcdGF2YWlsYWJsZVRlcm1zOiB0ZXJtcyxcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0KHhocikgPT4geyAvLyByZWplY3Rcblx0XHRcdFx0aWYgKHhoci5zdGF0dXNUZXh0ID09PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZmV0Y2hSZXF1ZXN0ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0bG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHR1cGRhdGVNZXRhYm94ZXMocHJldlNlZ21lbnQgPSAwLCBjdXJyZW50U2VnbWVudCkge1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkaXNhYmxlZDogdHJ1ZSxcblx0XHR9KTtcblx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL2VkaXRvcicpLmxvY2tQb3N0U2F2aW5nKCdtZXNzaWEvc2VnbWVudC1sb2NrJyk7XG5cblx0XHR0aGlzLmZldGNoTWV0YWJveGVzKHByZXZTZWdtZW50LCBjdXJyZW50U2VnbWVudCkudGhlbihcblx0XHRcdChyZXN1bHQpID0+IHtcblxuXHRcdFx0XHRsZXQgbmV3SWQgPSByZXN1bHQubWV0YWJveEh0bWwuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXHRcdFx0XHRsZXQgcHJldklkID0gbmV3SWQucmVwbGFjZSgvKFxcZCspL2csIHJlc3VsdC5wcmV2VGVybSk7XG5cdFx0XHRcdGxldCBwb3N0VHlwZSA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmdldEN1cnJlbnRQb3N0VHlwZSgpO1xuXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZXZJZCkucmVwbGFjZVdpdGgocmVzdWx0Lm1ldGFib3hIdG1sKTtcblx0XHRcdFx0d2luZG93LnBvc3Rib3hlcy5hZGRfcG9zdGJveF90b2dnbGVzKHBvc3RUeXBlKTtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9lZGl0b3InKS51bmxvY2tQb3N0U2F2aW5nKCdtZXNzaWEvc2VnbWVudC1sb2NrJyk7XG5cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLm9uQ2hhbmdlTWV0YWJveGVzKCk7XG5cdFx0XHRcdG1ldGFib3hDaGFuZ2VkID0gZmFsc2U7XG5cblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmV3SWQpLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdvYmplY3RNZXRhYm94VXBkYXRlZCcsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG5cdFx0XHR9LFxuXHRcdFx0KHJlamVjdCkgPT4ge1xuXHRcdFx0XHQvLyBub25jZSBkaWQgbm90IHZlcmlmaWVkIG9yIG90aGVyIHVuZXhwZWN0ZWQgZXJyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWdtZW50LWNvbnN0cnVjdG9yLXRlcm0taWQtJyArIHByZXZTZWdtZW50KS5yZW1vdmUoKTtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9lZGl0b3InKS51bmxvY2tQb3N0U2F2aW5nKCdtZXNzaWEvc2VnbWVudC1sb2NrJyk7XG5cdFx0XHRcdG1ldGFib3hDaGFuZ2VkID0gZmFsc2U7XG5cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0YXN5bmMgZmV0Y2hNZXRhYm94ZXMocHJldlRlcm0gPSAwLCB0ZXJtSWQpIHtcblxuXHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRcdGFwaUZldGNoKHtcblx0XHRcdFx0dXJsOiBhZGRRdWVyeUFyZ3MoZG9jdW1lbnQubG9jYXRpb24uaHJlZiwge1xuXHRcdFx0XHRcdCdmZXRjaC1tZXRhYm94LWZvci10ZXJtJzogdGVybUlkLFxuXHRcdFx0XHRcdCdtZXNzaWFfbm9uY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VnbWVudC1jb25zdHJ1Y3Rvci10ZXJtLWlkLScgKyBwcmV2VGVybSkucXVlcnlTZWxlY3RvcignI21lc3NpYV9ub25jZScpLnZhbHVlLFxuXHRcdFx0XHR9KSxcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHBhcnNlOiBmYWxzZSxcblx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuXHRcdFx0fSkudGhlbihib2R5ID0+IHtcblx0XHRcdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YWJveGVzJyk7XG5cdFx0XHRcdGVsLmlubmVySFRNTCA9IGJvZHk7XG5cdFx0XHRcdGxldCBtZXRhYm94ID0gZWwucXVlcnlTZWxlY3RvcignI3NlZ21lbnQtY29uc3RydWN0b3ItdGVybS1pZC0nICsgdGVybUlkKTtcblx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cblx0XHRcdFx0aWYgKG1ldGFib3ggPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZWplY3QoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdHByZXZUZXJtOiBwcmV2VGVybSxcblx0XHRcdFx0XHRtZXRhYm94SHRtbDogbWV0YWJveCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRfXygnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgbWV0YWJveC4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHNvcnRCeVNlbGVjdGVkKHRlcm1zVHJlZSkge1xuXHRcdGNvbnN0IHsgdGVybXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgdHJlZUhhc1NlbGVjdGlvbiA9ICh0ZXJtVHJlZSkgPT4ge1xuXHRcdFx0aWYgKHRlcm1zLmluZGV4T2YodGVybVRyZWUuaWQpICE9PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmICh1bmRlZmluZWQgPT09IHRlcm1UcmVlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGFueUNoaWxkSXNTZWxlY3RlZCA9IHRlcm1UcmVlLmNoaWxkcmVuLm1hcCh0cmVlSGFzU2VsZWN0aW9uKS5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCkubGVuZ3RoID4gMDtcblx0XHRcdGlmIChhbnlDaGlsZElzU2VsZWN0ZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblx0XHRjb25zdCB0ZXJtT3JDaGlsZElzU2VsZWN0ZWQgPSAodGVybUEsIHRlcm1CKSA9PiB7XG5cdFx0XHRjb25zdCB0ZXJtQVNlbGVjdGVkID0gdHJlZUhhc1NlbGVjdGlvbih0ZXJtQSk7XG5cdFx0XHRjb25zdCB0ZXJtQlNlbGVjdGVkID0gdHJlZUhhc1NlbGVjdGlvbih0ZXJtQik7XG5cblx0XHRcdGlmICh0ZXJtQVNlbGVjdGVkID09PSB0ZXJtQlNlbGVjdGVkKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGVybUFTZWxlY3RlZCAmJiAhdGVybUJTZWxlY3RlZCkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGVybUFTZWxlY3RlZCAmJiB0ZXJtQlNlbGVjdGVkKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9O1xuXHRcdHRlcm1zVHJlZS5zb3J0KHRlcm1PckNoaWxkSXNTZWxlY3RlZCk7XG5cdFx0cmV0dXJuIHRlcm1zVHJlZTtcblx0fVxuXG5cdHNldEZpbHRlclZhbHVlKGV2ZW50KSB7XG5cdFx0Y29uc3QgeyBhdmFpbGFibGVUZXJtc1RyZWUgfSA9IHRoaXMuc3RhdGU7XG5cdFx0Y29uc3QgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cdFx0Y29uc3QgZmlsdGVyZWRUZXJtc1RyZWUgPSBhdmFpbGFibGVUZXJtc1RyZWUubWFwKHRoaXMuZ2V0RmlsdGVyTWF0Y2hlcihmaWx0ZXJWYWx1ZSkpLmZpbHRlcigodGVybSkgPT4gdGVybSk7XG5cdFx0Y29uc3QgZ2V0UmVzdWx0Q291bnQgPSAodGVybXMpID0+IHtcblx0XHRcdGxldCBjb3VudCA9IDA7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRlcm1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdGlmICh1bmRlZmluZWQgIT09IHRlcm1zW2ldLmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0Y291bnQgKz0gZ2V0UmVzdWx0Q291bnQodGVybXNbaV0uY2hpbGRyZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fTtcblx0XHR0aGlzLnNldFN0YXRlKFxuXHRcdFx0e1xuXHRcdFx0XHRmaWx0ZXJWYWx1ZSxcblx0XHRcdFx0ZmlsdGVyZWRUZXJtc1RyZWUsXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGNvbnN0IHJlc3VsdENvdW50ID0gZ2V0UmVzdWx0Q291bnQoZmlsdGVyZWRUZXJtc1RyZWUpO1xuXHRcdGNvbnN0IHJlc3VsdHNGb3VuZE1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X24oJyVkIHJlc3VsdCBmb3VuZC4nLCAnJWQgcmVzdWx0cyBmb3VuZC4nLCByZXN1bHRDb3VudCwgJ21lc3NpYScpLFxuXHRcdFx0cmVzdWx0Q291bnRcblx0XHQpO1xuXHRcdHRoaXMucHJvcHMuZGVib3VuY2VkU3BlYWsocmVzdWx0c0ZvdW5kTWVzc2FnZSwgJ2Fzc2VydGl2ZScpO1xuXHR9XG5cblx0Z2V0RmlsdGVyTWF0Y2hlcihmaWx0ZXJWYWx1ZSkge1xuXHRcdGNvbnN0IG1hdGNoVGVybXNGb3JGaWx0ZXIgPSAob3JpZ2luYWxUZXJtKSA9PiB7XG5cdFx0XHRpZiAoJycgPT09IGZpbHRlclZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbFRlcm07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNoYWxsb3cgY2xvbmUsIGJlY2F1c2Ugd2UnbGwgYmUgZmlsdGVyaW5nIHRoZSB0ZXJtJ3MgY2hpbGRyZW4gYW5kXG5cdFx0XHQvLyBkb24ndCB3YW50IHRvIG1vZGlmeSB0aGUgb3JpZ2luYWwgdGVybS5cblx0XHRcdGNvbnN0IHRlcm0gPSB7IC4uLm9yaWdpbmFsVGVybSB9O1xuXG5cdFx0XHQvLyBNYXAgYW5kIGZpbHRlciB0aGUgY2hpbGRyZW4sIHJlY3Vyc2l2ZSBzbyB3ZSBkZWFsIHdpdGggZ3JhbmRjaGlsZHJlblxuXHRcdFx0Ly8gYW5kIGFueSBkZWVwZXIgbGV2ZWxzLlxuXHRcdFx0aWYgKHRlcm0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0ZXJtLmNoaWxkcmVuID0gdGVybS5jaGlsZHJlbi5tYXAobWF0Y2hUZXJtc0ZvckZpbHRlcikuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB0aGUgdGVybSdzIG5hbWUgY29udGFpbnMgdGhlIGZpbHRlclZhbHVlLCBvciBpdCBoYXMgY2hpbGRyZW5cblx0XHRcdC8vIChpLmUuIHNvbWUgY2hpbGQgbWF0Y2hlZCBhdCBzb21lIHBvaW50IGluIHRoZSB0cmVlKSB0aGVuIHJldHVybiBpdC5cblx0XHRcdGlmICgtMSAhPT0gdGVybS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpKSB8fCB0ZXJtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0cmV0dXJuIHRlcm07XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSwgcmV0dXJuIGZhbHNlLiBBZnRlciBtYXBwaW5nLCB0aGUgbGlzdCBvZiB0ZXJtcyB3aWxsIG5lZWRcblx0XHRcdC8vIHRvIGhhdmUgZmFsc2UgdmFsdWVzIGZpbHRlcmVkIG91dC5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXHRcdHJldHVybiBtYXRjaFRlcm1zRm9yRmlsdGVyO1xuXHR9XG5cblx0cmVuZGVyVGVybXMocmVuZGVyZWRUZXJtcykge1xuXHRcdGNvbnN0IHsgdGVybXMgPSBbXSwgdGF4b25vbXkgfSA9IHRoaXMucHJvcHM7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdGNvbnN0IGtsYXNzID0gdGF4b25vbXkuaGllcmFyY2hpY2FsID8gJ2hpZXJhcmNoaWNhbCcgOiAnbm9uLWhpZXJhcmNoaWNhbCc7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXG5cdFx0cmV0dXJuIHJlbmRlcmVkVGVybXMubWFwKCh0ZXJtKSA9PiB7XG5cdFx0XHRjb25zdCBpZCA9IGBlZGl0b3ItcG9zdC10YXhvbm9taWVzLSR7a2xhc3N9LXRlcm0tJHt0ZXJtLmlkfWA7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBrZXk9e3Rlcm0uaWR9IGNsYXNzTmFtZT17J2VkaXRvci1wb3N0LXRheG9ub21pZXNfXycgKyBrbGFzcyArICctdGVybXMtY2hvaWNlICd9PlxuXHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0aWQ9e2lkfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXsnZWRpdG9yLXBvc3QtdGF4b25vbWllc19fJyArIGtsYXNzICsgJy10ZXJtcy1pbnB1dCAnfVxuXHRcdFx0XHRcdFx0dHlwZT1cInJhZGlvXCIgLy8gQGhlbGdhdGhldmlraW5nXG5cdFx0XHRcdFx0XHRjaGVja2VkPXt0ZXJtcy5pbmRleE9mKHRlcm0uaWQpICE9PSAtMX1cblx0XHRcdFx0XHRcdHZhbHVlPXt0ZXJtLmlkfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRuYW1lPXsncmFkaW9fdGF4X2lucHV0LScgKyB0aGlzLnByb3BzLnNsdWd9IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PGxhYmVsIGh0bWxGb3I9e2lkfT57dW5lc2NhcGUodGVybS5uYW1lKX08L2xhYmVsPlxuXHRcdFx0XHRcdHshIXRlcm0uY2hpbGRyZW4ubGVuZ3RoICYmIChcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnZWRpdG9yLXBvc3QtdGF4b25vbWllc19fJyArIGtsYXNzICsgJy10ZXJtcy1zdWJjaG9pY2VzICd9PlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJUZXJtcyh0ZXJtLmNoaWxkcmVuKX1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7IHNsdWcsIHRheG9ub215LCBpbnN0YW5jZUlkLCBoYXNDcmVhdGVBY3Rpb24sIGhhc0Fzc2lnbkFjdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBrbGFzcyA9IHRheG9ub215LmhpZXJhcmNoaWNhbCA/ICdoaWVyYXJjaGljYWwnIDogJ25vbi1oaWVyYXJjaGljYWwnOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblxuXHRcdGlmICghaGFzQXNzaWduQWN0aW9uKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCB7IGF2YWlsYWJsZVRlcm1zVHJlZSwgYXZhaWxhYmxlVGVybXMsIGZpbHRlcmVkVGVybXNUcmVlLCBmb3JtTmFtZSwgZm9ybVBhcmVudCwgbG9hZGluZywgc2hvd0Zvcm0sIGZpbHRlclZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGNvbnN0IGxhYmVsV2l0aEZhbGxiYWNrID0gKGxhYmVsUHJvcGVydHksIGZhbGxiYWNrSXNDYXRlZ29yeSwgZmFsbGJhY2tJc05vdENhdGVnb3J5KSA9PiBnZXQoXG5cdFx0XHR0YXhvbm9teSxcblx0XHRcdFsnbGFiZWxzJywgbGFiZWxQcm9wZXJ0eV0sXG5cdFx0XHRzbHVnID09PSAnY2F0ZWdvcnknID8gZmFsbGJhY2tJc0NhdGVnb3J5IDogZmFsbGJhY2tJc05vdENhdGVnb3J5XG5cdFx0KTtcblx0XHRjb25zdCBuZXdUZXJtQnV0dG9uTGFiZWwgPSBsYWJlbFdpdGhGYWxsYmFjayhcblx0XHRcdCdhZGRfbmV3X2l0ZW0nLFxuXHRcdFx0X18oJ0FkZCBuZXcgY2F0ZWdvcnknLCAnbWVzc2lhJyksXG5cdFx0XHRfXygnQWRkIG5ldyB0ZXJtJywgJ21lc3NpYScpXG5cdFx0KTtcblx0XHRjb25zdCBuZXdUZXJtTGFiZWwgPSBsYWJlbFdpdGhGYWxsYmFjayhcblx0XHRcdCduZXdfaXRlbV9uYW1lJyxcblx0XHRcdF9fKCdBZGQgbmV3IGNhdGVnb3J5JywgJ21lc3NpYScpLFxuXHRcdFx0X18oJ0FkZCBuZXcgdGVybScsICdtZXNzaWEnKVxuXHRcdCk7XG5cdFx0Y29uc3QgcGFyZW50U2VsZWN0TGFiZWwgPSBsYWJlbFdpdGhGYWxsYmFjayhcblx0XHRcdCdwYXJlbnRfaXRlbScsXG5cdFx0XHRfXygnUGFyZW50IENhdGVnb3J5JywgJ21lc3NpYScpLFxuXHRcdFx0X18oJ1BhcmVudCBUZXJtJywgJ21lc3NpYScpXG5cdFx0KTtcblx0XHRjb25zdCBub1BhcmVudE9wdGlvbiA9IGDigJQgJHtwYXJlbnRTZWxlY3RMYWJlbH0g4oCUYDtcblx0XHRjb25zdCBuZXdUZXJtU3VibWl0TGFiZWwgPSBuZXdUZXJtQnV0dG9uTGFiZWw7XG5cdFx0Y29uc3QgaW5wdXRJZCA9IGBlZGl0b3ItcG9zdC10YXhvbm9taWVzX18ke2tsYXNzfS10ZXJtcy1pbnB1dC0ke2luc3RhbmNlSWR9YDsgLy8gQGhlbGdhdGhldmlraW5nXG5cdFx0Y29uc3QgZmlsdGVySW5wdXRJZCA9IGBlZGl0b3ItcG9zdC10YXhvbm9taWVzX18ke2tsYXNzfS10ZXJtcy1maWx0ZXItJHtpbnN0YW5jZUlkfWA7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdGNvbnN0IGZpbHRlckxhYmVsID0gZ2V0KFxuXHRcdFx0dGhpcy5wcm9wcy50YXhvbm9teSxcblx0XHRcdFsnbGFiZWxzJywgJ3NlYXJjaF9pdGVtcyddLFxuXHRcdFx0X18oJ1NlYXJjaCBUZXJtcycsICdtZXNzaWEnKVxuXHRcdCk7XG5cdFx0Y29uc3QgZ3JvdXBMYWJlbCA9IGdldChcblx0XHRcdHRoaXMucHJvcHMudGF4b25vbXksXG5cdFx0XHRbJ25hbWUnXSxcblx0XHRcdF9fKCdUZXJtcycsICdtZXNzaWEnKVxuXHRcdCk7XG5cdFx0Y29uc3Qgc2hvd0ZpbHRlciA9IGF2YWlsYWJsZVRlcm1zLmxlbmd0aCA+PSBNSU5fVEVSTVNfQ09VTlRfRk9SX0ZJTFRFUjtcblxuXHRcdHJldHVybiBbXG5cdFx0XHRzaG93RmlsdGVyICYmIDxsYWJlbFxuXHRcdFx0XHRrZXk9XCJmaWx0ZXItbGFiZWxcIlxuXHRcdFx0XHRodG1sRm9yPXtmaWx0ZXJJbnB1dElkfT5cblx0XHRcdFx0e2ZpbHRlckxhYmVsfVxuXHRcdFx0PC9sYWJlbD4sXG5cdFx0XHRzaG93RmlsdGVyICYmIDxpbnB1dFxuXHRcdFx0XHR0eXBlPVwic2VhcmNoXCJcblx0XHRcdFx0aWQ9e2ZpbHRlcklucHV0SWR9XG5cdFx0XHRcdHZhbHVlPXtmaWx0ZXJWYWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0RmlsdGVyVmFsdWV9XG5cdFx0XHRcdGNsYXNzTmFtZT1cImVkaXRvci1wb3N0LXRheG9ub21pZXNfX2hpZXJhcmNoaWNhbC10ZXJtcy1maWx0ZXJcIlxuXHRcdFx0XHRrZXk9XCJ0ZXJtLWZpbHRlci1pbnB1dFwiXG5cdFx0XHQvPixcblx0XHRcdDxkaXZcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZWRpdG9yLXBvc3QtdGF4b25vbWllc19faGllcmFyY2hpY2FsLXRlcm1zLWxpc3RcIlxuXHRcdFx0XHRrZXk9XCJ0ZXJtLWxpc3RcIlxuXHRcdFx0XHR0YWJJbmRleD1cIjBcIlxuXHRcdFx0XHRyb2xlPVwiZ3JvdXBcIlxuXHRcdFx0XHRhcmlhLWxhYmVsPXtncm91cExhYmVsfVxuXHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJUZXJtcygnJyAhPT0gZmlsdGVyVmFsdWUgPyBmaWx0ZXJlZFRlcm1zVHJlZSA6IGF2YWlsYWJsZVRlcm1zVHJlZSl9XG5cdFx0XHQ8L2Rpdj4sXG5cdFx0XHQhbG9hZGluZyAmJiBoYXNDcmVhdGVBY3Rpb24gJiYgKFxuXHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0a2V5PVwidGVybS1hZGQtYnV0dG9uXCJcblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm9uVG9nZ2xlRm9ybX1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZGl0b3ItcG9zdC10YXhvbm9taWVzX19oaWVyYXJjaGljYWwtdGVybXMtYWRkXCJcblx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPXtzaG93Rm9ybX1cblx0XHRcdFx0XHRpc0xpbmtcblx0XHRcdFx0PlxuXHRcdFx0XHRcdHtuZXdUZXJtQnV0dG9uTGFiZWx9XG5cdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0KSxcblx0XHRcdHNob3dGb3JtICYmIChcblx0XHRcdFx0PGZvcm0gb25TdWJtaXQ9e3RoaXMub25BZGRUZXJtfSBrZXk9e2tsYXNzICsgJy10ZXJtcy1mb3JtJ30+XG5cdFx0XHRcdFx0PGxhYmVsXG5cdFx0XHRcdFx0XHRodG1sRm9yPXtpbnB1dElkfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWRpdG9yLXBvc3QtdGF4b25vbWllc19faGllcmFyY2hpY2FsLXRlcm1zLWxhYmVsXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7bmV3VGVybUxhYmVsfVxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRpZD17aW5wdXRJZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVkaXRvci1wb3N0LXRheG9ub21pZXNfX2hpZXJhcmNoaWNhbC10ZXJtcy1pbnB1dFwiXG5cdFx0XHRcdFx0XHR2YWx1ZT17Zm9ybU5hbWV9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZUZvcm1OYW1lfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWRcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdHt0YXhvbm9teS5oaWVyYXJjaGljYWwgJiYgISFhdmFpbGFibGVUZXJtcy5sZW5ndGggJiYgLy8gQGhlbGdhdGhldmlraW5nXG5cdFx0XHRcdFx0XHQ8VHJlZVNlbGVjdFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17cGFyZW50U2VsZWN0TGFiZWx9XG5cdFx0XHRcdFx0XHRcdG5vT3B0aW9uTGFiZWw9e25vUGFyZW50T3B0aW9ufVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZUZvcm1QYXJlbnR9XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkSWQ9e2Zvcm1QYXJlbnR9XG5cdFx0XHRcdFx0XHRcdHRyZWU9e2F2YWlsYWJsZVRlcm1zVHJlZX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGlzU2Vjb25kYXJ5XG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVkaXRvci1wb3N0LXRheG9ub21pZXNfX2hpZXJhcmNoaWNhbC10ZXJtcy1zdWJtaXRcIlxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtuZXdUZXJtU3VibWl0TGFiZWx9XG5cdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdCksXG5cdFx0XTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlKFtcblx0d2l0aFNlbGVjdCgoc2VsZWN0LCB7IHNsdWcgfSkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0Q3VycmVudFBvc3QgfSA9IHNlbGVjdCgnY29yZS9lZGl0b3InKTtcblx0XHRjb25zdCB7IGdldFRheG9ub215IH0gPSBzZWxlY3QoJ2NvcmUnKTtcblx0XHRjb25zdCB0YXhvbm9teSA9IGdldFRheG9ub215KHNsdWcpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYXNDcmVhdGVBY3Rpb246IHRheG9ub215ID8gZ2V0KGdldEN1cnJlbnRQb3N0KCksIFsnX2xpbmtzJywgJ3dwOmFjdGlvbi1jcmVhdGUtJyArIHRheG9ub215LnJlc3RfYmFzZV0sIGZhbHNlKSA6IGZhbHNlLFxuXHRcdFx0aGFzQXNzaWduQWN0aW9uOiB0YXhvbm9teSA/IGdldChnZXRDdXJyZW50UG9zdCgpLCBbJ19saW5rcycsICd3cDphY3Rpb24tYXNzaWduLScgKyB0YXhvbm9teS5yZXN0X2Jhc2VdLCBmYWxzZSkgOiBmYWxzZSxcblx0XHRcdHRlcm1zOiB0YXhvbm9teSA/IHNlbGVjdCgnY29yZS9lZGl0b3InKS5nZXRFZGl0ZWRQb3N0QXR0cmlidXRlKHRheG9ub215LnJlc3RfYmFzZSkgOiBbXSxcblx0XHRcdHRheG9ub215LFxuXHRcdH07XG5cdH0pLFxuXHR3aXRoRGlzcGF0Y2goKGRpc3BhdGNoKSA9PiAoe1xuXHRcdG9uVXBkYXRlVGVybXModGVybXMsIHJlc3RCYXNlKSB7XG5cdFx0XHRkaXNwYXRjaCgnY29yZS9lZGl0b3InKS5lZGl0UG9zdCh7IFtyZXN0QmFzZV06IHRlcm1zIH0pO1xuXHRcdH0sXG5cdH0pKSxcblx0d2l0aFNwb2tlbk1lc3NhZ2VzLFxuXHR3aXRoSW5zdGFuY2VJZCxcblx0Ly93aXRoRmlsdGVycyggJ2VkaXRvci5Qb3N0VGF4b25vbXlUeXBlJyApLCAvLyBJbnRlbnRpb25hbGx5IGNvbW1lbnRlZCBvdXQuXG5dKShSYWRpb1Rlcm1TZWxlY3Rvcik7XG4iLCJpbXBvcnQgUmFkaW9UZXJtU2VsZWN0b3IgZnJvbSAnLi4vLi4vanMvX2NvbXBvbmVudHMvX3JhZGlvX3Rlcm1fc2VsZWN0b3IuanN4JztcblxuZnVuY3Rpb24gQ3VzdG9taXplVGF4b25vbXlTZWxlY3RvcihPcmlnaW5hbENvbXBvbmVudCkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHByb3BzKSB7XG5cblx0XHRpZiAocHJvcHMuc2x1ZyA9PT0gJ21lc3NpYV9vYmplY3Rfc2VnbWVudCcpIHtcblxuXHRcdFx0cmV0dXJuIHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0UmFkaW9UZXJtU2VsZWN0b3IsXG5cdFx0XHRcdHByb3BzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdE9yaWdpbmFsQ29tcG9uZW50LFxuXHRcdFx0XHRwcm9wc1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn07XG5cbndwLmhvb2tzLmFkZEZpbHRlcihcblx0J2VkaXRvci5Qb3N0VGF4b25vbXlUeXBlJyxcblx0J21lc3NpYScsXG5cdEN1c3RvbWl6ZVRheG9ub215U2VsZWN0b3Jcbik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vLi4vanMvX2JhY2tlbmQvcmFkaW8tc2VnbWVudC5qc1wiOyJdLCJuYW1lcyI6WyJfXyIsIl94IiwiX24iLCJzcHJpbnRmIiwid3AiLCJpMThuIiwiQ29tcG9uZW50IiwiZWxlbWVudCIsIlRyZWVTZWxlY3QiLCJ3aXRoU3Bva2VuTWVzc2FnZXMiLCJ3aXRoRmlsdGVycyIsIkJ1dHRvbiIsImNvbXBvbmVudHMiLCJ3aXRoU2VsZWN0Iiwid2l0aERpc3BhdGNoIiwic2VsZWN0Iiwic3Vic2NyaWJlIiwiZGF0YSIsIndpdGhJbnN0YW5jZUlkIiwiY29tcG9zZSIsImFwaUZldGNoIiwiYWRkUXVlcnlBcmdzIiwidXJsIiwiZ3JvdXBCeSIsImdldCIsInVuZXNjYXBlIiwiZmluZCIsInNvbWUiLCJpbnZva2UiLCJsb2Rhc2giLCJERUZBVUxUX1FVRVJZIiwicGVyX3BhZ2UiLCJvcmRlcmJ5Iiwib3JkZXIiLCJfZmllbGRzIiwiTUlOX1RFUk1TX0NPVU5UX0ZPUl9GSUxURVIiLCJtZXRhYm94Q2hhbmdlZCIsIlJhZGlvVGVybVNlbGVjdG9yIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJmaW5kVGVybSIsImJpbmQiLCJvbkNoYW5nZSIsIm9uQ2hhbmdlRm9ybU5hbWUiLCJvbkNoYW5nZUZvcm1QYXJlbnQiLCJvbkFkZFRlcm0iLCJvblRvZ2dsZUZvcm0iLCJzZXRGaWx0ZXJWYWx1ZSIsInNvcnRCeVNlbGVjdGVkIiwic3RhdGUiLCJsb2FkaW5nIiwiYXZhaWxhYmxlVGVybXNUcmVlIiwiYXZhaWxhYmxlVGVybXMiLCJhZGRpbmciLCJmb3JtTmFtZSIsImZvcm1QYXJlbnQiLCJzaG93Rm9ybSIsImZpbHRlclZhbHVlIiwiZmlsdGVyZWRUZXJtc1RyZWUiLCJkaXNhYmxlZCIsIm9uQ2hhbmdlTWV0YWJveGVzIiwib25TYXZpbmdQb3N0IiwidXNlIiwib3B0aW9ucyIsIm5leHQiLCJyZXN1bHQiLCJ0aGVuIiwicmVzcG9uc2UiLCJ1blN1YnNjcmliZSIsInNhdmluZyIsImlzU2F2aW5nUG9zdCIsImlzQXV0b3NhdmluZ1Bvc3QiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJtZXRhYm94ZXMiLCJxdWVyeVNlbGVjdG9yIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1ldGFib3hDaGFuZ2UiLCJidWlsZFRlcm1zVHJlZSIsImZsYXRUZXJtcyIsImZsYXRUZXJtc1dpdGhQYXJlbnRBbmRDaGlsZHJlbiIsIm1hcCIsInRlcm0iLCJjaGlsZHJlbiIsInBhcmVudCIsInRlcm1zQnlQYXJlbnQiLCJudWxsIiwiZmlsbFdpdGhDaGlsZHJlbiIsInRlcm1zIiwiaWQiLCJldmVudCIsImdvIiwic2hvdWxkQ2hhbmdlU2VnbWVudCIsIm9uVXBkYXRlVGVybXMiLCJ0YXhvbm9teSIsInByb3BzIiwidGVybUlkIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlc3RfYmFzZSIsImlzUG9zdERpcnR5IiwiaXNFZGl0ZWRQb3N0RGlydHkiLCJjb25maXJtIiwibmV3VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJuZXdQYXJlbnQiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJwcmV2ZW50RGVmYXVsdCIsInNsdWciLCJleGlzdGluZ1Rlcm0iLCJhZGRSZXF1ZXN0IiwicGF0aCIsIm1ldGhvZCIsInVuZGVmaW5lZCIsImZpbmRPckNyZWF0ZVByb21pc2UiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsInNlYXJjaCIsInNlYXJjaFJlc3VsdCIsIlByb21pc2UiLCJyZWplY3QiLCJoYXNUZXJtIiwiYXZhaWxhYmxlVGVybSIsIm5ld0F2YWlsYWJsZVRlcm1zIiwidGVybUFkZGVkTWVzc2FnZSIsInNwZWFrIiwieGhyIiwic3RhdHVzVGV4dCIsImNvbXBvbmVudERpZE1vdW50IiwiZmV0Y2hUZXJtcyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZmV0Y2hSZXF1ZXN0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwidXBkYXRlTWV0YWJveGVzIiwicHJldlNlZ21lbnQiLCJjdXJyZW50U2VnbWVudCIsImRpc3BhdGNoIiwibG9ja1Bvc3RTYXZpbmciLCJmZXRjaE1ldGFib3hlcyIsIm5ld0lkIiwibWV0YWJveEh0bWwiLCJnZXRBdHRyaWJ1dGUiLCJwcmV2SWQiLCJyZXBsYWNlIiwicHJldlRlcm0iLCJwb3N0VHlwZSIsImdldEN1cnJlbnRQb3N0VHlwZSIsImdldEVsZW1lbnRCeUlkIiwicmVwbGFjZVdpdGgiLCJ3aW5kb3ciLCJwb3N0Ym94ZXMiLCJhZGRfcG9zdGJveF90b2dnbGVzIiwidW5sb2NrUG9zdFNhdmluZyIsInJlbW92ZSIsInJlc29sdmUiLCJsb2NhdGlvbiIsImhyZWYiLCJwYXJzZSIsInRleHQiLCJib2R5IiwiZWwiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwibWV0YWJveCIsImUiLCJjcmVhdGVOb3RpY2UiLCJpc0Rpc21pc3NpYmxlIiwidGVybXNUcmVlIiwidHJlZUhhc1NlbGVjdGlvbiIsInRlcm1UcmVlIiwiaW5kZXhPZiIsImFueUNoaWxkSXNTZWxlY3RlZCIsImZpbHRlciIsImNoaWxkIiwidGVybU9yQ2hpbGRJc1NlbGVjdGVkIiwidGVybUEiLCJ0ZXJtQiIsInRlcm1BU2VsZWN0ZWQiLCJ0ZXJtQlNlbGVjdGVkIiwic29ydCIsImdldEZpbHRlck1hdGNoZXIiLCJnZXRSZXN1bHRDb3VudCIsImNvdW50IiwiaSIsInJlc3VsdENvdW50IiwicmVzdWx0c0ZvdW5kTWVzc2FnZSIsImRlYm91bmNlZFNwZWFrIiwibWF0Y2hUZXJtc0ZvckZpbHRlciIsIm9yaWdpbmFsVGVybSIsInJlbmRlclRlcm1zIiwicmVuZGVyZWRUZXJtcyIsImtsYXNzIiwiaGllcmFyY2hpY2FsIiwicmVuZGVyIiwiaW5zdGFuY2VJZCIsImhhc0NyZWF0ZUFjdGlvbiIsImhhc0Fzc2lnbkFjdGlvbiIsImxhYmVsV2l0aEZhbGxiYWNrIiwibGFiZWxQcm9wZXJ0eSIsImZhbGxiYWNrSXNDYXRlZ29yeSIsImZhbGxiYWNrSXNOb3RDYXRlZ29yeSIsIm5ld1Rlcm1CdXR0b25MYWJlbCIsIm5ld1Rlcm1MYWJlbCIsInBhcmVudFNlbGVjdExhYmVsIiwibm9QYXJlbnRPcHRpb24iLCJuZXdUZXJtU3VibWl0TGFiZWwiLCJpbnB1dElkIiwiZmlsdGVySW5wdXRJZCIsImZpbHRlckxhYmVsIiwiZ3JvdXBMYWJlbCIsInNob3dGaWx0ZXIiLCJnZXRDdXJyZW50UG9zdCIsImdldFRheG9ub215IiwiZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSIsInJlc3RCYXNlIiwiZWRpdFBvc3QiXSwic291cmNlUm9vdCI6IiJ9
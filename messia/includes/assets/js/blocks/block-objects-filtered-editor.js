/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/objects-filtered-editor.jsx":
/*!***************************************************!*\
  !*** ./src/js/blocks/objects-filtered-editor.jsx ***!
  \***************************************************/
/***/ (function() {

(function (wp, $) {
  const {
    apiFetch
  } = wp;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Component,
    Fragment,
    useState,
    useEffect,
    useRef
  } = wp.element;
  const {
    serverSideRender: ServerSideRender
  } = wp;
  const {
    BlockControls
  } = wp.blockEditor;
  const {
    SelectControl,
    Notice,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    TextControl,
    Spinner,
    Flex,
    FlexItem,
    FlexBlock,
    RadioControl,
    __experimentalRadioGroup: RadioGroup,
    __experimentalRadio: Radio
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "url(#svg_19)",
    height: "136",
    id: "svg_1",
    rx: "4",
    ry: "4",
    width: "76",
    x: "12.17499",
    y: "14.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "21.62499",
    cy: "24.2",
    fill: "#ffffff",
    id: "svg_2",
    r: "5.51153"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "url(#svg_19)",
    height: "136",
    id: "svg_12",
    rx: "4",
    ry: "4",
    width: "76",
    x: "99.02499",
    y: "14.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "108.47499",
    cy: "24.2",
    fill: "#ffffff",
    id: "svg_13",
    r: "5.51153"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "url(#svg_19)",
    height: "136",
    id: "svg_15",
    rx: "4",
    ry: "4",
    width: "76",
    x: "185.82499",
    y: "14.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "195.27499",
    cy: "24.2",
    fill: "#ffffff",
    id: "svg_16",
    r: "5.51153"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "svg_19",
    x1: "0.00262",
    x2: "1",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#e8e8e8",
    stopOpacity: "0.99609"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#e0e0e0",
    stopOpacity: "0.99609"
  }))));
  let lastPreview = false;
  function ObjectsFilteredFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [editMode, setEditMode] = useState(true);
    const [termsFetched, setTermsFetched] = useState(false);
    const [terms, setTerms] = useState(false);
    let [rendered, setRendered] = useState(false);
    let blockRef = useRef();
    let selectCatRef = useRef();
    let selectPropRef = useRef();
    const getExample = () => {
      return exampleImageData;
    };
    const getBlockControls = () => {
      return /*#__PURE__*/React.createElement(BlockControls, {
        key: "block"
      }, /*#__PURE__*/React.createElement(ToolbarGroup, {
        label: __('Options', 'messia')
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        label: editMode ? __('Preview', 'messia') : __('Edit', 'messia'),
        icon: editMode ? "visibility" : "edit",
        onClick: () => {
          setEditMode(!editMode);
        }
      })));
    };
    const getBlockEdit = () => {
      if (termsFetched) {
        const block = wp.blocks.getBlockType(name);
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
          isDismissible: false,
          status: "warning"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, __('Build Your conditions for searching objects to find ones.', 'messia')), /*#__PURE__*/React.createElement("div", null, __('Notes:', 'messia')), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, __('the list of terms is subordinate to the value of the "Empty category terms" option.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('sorting by reviews could be disabled if theme option Site rating are On.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('set parameter Limit to 0 to unlimit number of objects.', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Number of objects', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.limit,
          onChange: value => {
            setAttributes({
              limit: Number(value)
            });
          }
        }))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(SelectControl, {
          className: "criteria-item",
          label: __('Sort by:', 'messia'),
          value: attributes.orderBy,
          onChange: slug => {
            setAttributes({
              orderBy: slug
            });
          },
          options: terms.orderBy
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioGroup, {
          className: "criteria-item",
          accessibilitylabel: "Width",
          onChange: value => {
            setAttributes({
              orderDir: value
            });
          },
          checked: attributes.orderDir
        }, /*#__PURE__*/React.createElement("div", null, __('Sort direction:', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "ASC"
        }, __('Ascending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "DESC"
        }, __('Descending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "RND"
        }, __('Random', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "conditions",
          justify: "start",
          align: "left",
          gap: 0
        }, /*#__PURE__*/React.createElement(SelectControl, {
          className: "condition-item",
          label: __('Belongs to Segment:', 'messia'),
          value: attributes.segment,
          onChange: slug => {
            setAttributes({
              segment: slug
            });
          },
          options: terms.segment
        }), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectCatRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('AND Belongs to Categories:', 'messia'),
          value: attributes.category,
          onChange: slug => {
            setAttributes({
              category: slug
            });
          },
          options: terms.category
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPropRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('AND Having Properties:', 'messia'),
          value: attributes.property,
          onChange: slug => {
            setAttributes({
              property: slug
            });
          },
          options: terms.property
        }))), /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioGroup, {
          className: "condition-item",
          accessibilitylabel: "Width",
          onChange: value => {
            setAttributes({
              isFeatured: parseInt(value)
            });
          },
          checked: attributes.isFeatured.toString()
        }, /*#__PURE__*/React.createElement("div", null, __('Marked as featured:', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "1"
        }, __('Yes', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "-1"
        }, __('No', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "0"
        }, __('Any', 'messia')))), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioControl, {
          label: __('Split cards to columns by:', 'messia'),
          selected: attributes.columns,
          options: [{
            label: __('Three', 'messia'),
            value: 3
          }, {
            label: __('Four', 'messia'),
            value: 4
          }],
          onChange: value => {
            setAttributes({
              columns: parseInt(value)
            });
          }
        }))))));
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          tabIndex: "0",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement(Spinner, null)));
      }
    };
    const getBlockPreview = () => {
      return /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block",
        ref: blockRef
      }, /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement(ServerSideRender, {
        block: props.name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: true
        }
      })));
    };
    const getTerms = async () => {
      return await apiFetch({
        path: 'messia/v1/block-objects-filtered',
        method: 'POST',
        data: {
          currentAttrs: attributes
        }
      }).then(response => {
        if (response.terms.segment.length === 0) {
          wp.data.dispatch('core/notices').createNotice('error',
          // Can be one of: success, info, warning, error.
          __('Messia Category Terms: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'),
          // Text string to display.
          {
            isDismissible: true
          });
        }
        return response;
      }).catch(e => {
        wp.data.dispatch('core/notices').createNotice('error',
        // Can be one of: success, info, warning, error.
        __('An error occurred while receiving data from the server for Object Filtered block', 'messia'),
        // Text string to display.
        {
          isDismissible: true
        });
      });
    };
    const render = () => {
      if (attributes.isExample) {
        return getExample();
      } else {
        let classes = [className];
        const render = [getBlockControls()];
        if (editMode) {
          render.push(getBlockEdit());
          lastPreview = false;
        } else if (!lastPreview) {
          lastPreview = getBlockPreview();
          render.push(lastPreview);
        } else {
          render.push(lastPreview);
        }
        return /*#__PURE__*/React.createElement("div", {
          className: classes.join(' ')
        }, render);
      }
    };
    useEffect(() => {
      let isMounted = true;
      if (!termsFetched && !attributes.isExample) {
        getTerms().then(response => {
          if (isMounted) {
            if (attributes.segment === '') {
              attributes.segment = response.terms.segment[0].value;
            }
            setTerms(response.terms);
            setTermsFetched(true);
            setRendered(true);
            setAttributes(attributes);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(() => {
      if (rendered || editMode) {
        $(selectCatRef.current).find('select').select2({
          placeholder: __('Any / None category', 'messia')
        }).on('change', event => {
          let slug = $(event.currentTarget).val();
          if (slug === null) {
            slug = [];
          }
          setAttributes({
            category: slug
          });
        });
        $(selectPropRef.current).find('select').select2({
          placeholder: __('Any / None property', 'messia')
        }).on('change', event => {
          let slug = $(event.currentTarget).val();
          if (slug === null) {
            slug = [];
          }
          setAttributes({
            property: slug
          });
        });
        ;
      }
    }, [rendered, editMode]);
    return render();
  }
  registerBlockType('messia/block-objects-filtered', {
    title: __('Objects by filters', 'messia'),
    description: __('Terms of taxonomy Category by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"
    })),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      segment: {
        type: 'string',
        default: ''
      },
      category: {
        type: 'array',
        default: []
      },
      property: {
        type: 'array',
        default: []
      },
      isFeatured: {
        type: 'integer',
        default: 0,
        enum: [-1, 0, 1]
      },
      isExample: {
        type: 'boolean',
        default: false
      },
      limit: {
        type: 'integer',
        default: 4
      },
      columns: {
        type: 'integer',
        default: 4,
        enum: [3, 4]
      },
      orderBy: {
        type: 'string',
        default: 'post_date',
        enum: ['post_date', 'post_title', 'rating', 'reviews']
      },
      orderDir: {
        type: 'string',
        default: 'ASC',
        enum: ['ASC', 'DESC', 'RND']
      }
    },
    example: {
      attributes: {
        isExample: true
      }
    },
    supports: {
      multiple: true
    },
    edit: ObjectsFilteredFn,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/objects-filtered-editor.scss":
/*!******************************************************!*\
  !*** ./src/scss/blocks/objects-filtered-editor.scss ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*******************************************************!*\
  !*** ./src/entries/blocks/objects-filtered-editor.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_objects_filtered_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/objects-filtered-editor.scss */ "./src/scss/blocks/objects-filtered-editor.scss");
/* harmony import */ var _js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/objects-filtered-editor.jsx */ "./src/js/blocks/objects-filtered-editor.jsx");
/* harmony import */ var _js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQyxXQUFVQSxFQUFFLEVBQUVDLENBQUMsRUFBRTtFQUVqQixNQUFNO0lBQUVDO0VBQVMsQ0FBQyxHQUFHRixFQUFFO0VBQ3ZCLE1BQU07SUFBRUc7RUFBa0IsQ0FBQyxHQUFHSCxFQUFFLENBQUNJLE1BQU07RUFDdkMsTUFBTTtJQUFFQyxTQUFTO0lBQUVDLFFBQVE7SUFBRUMsUUFBUTtJQUFFQyxTQUFTO0lBQUVDO0VBQU8sQ0FBQyxHQUFHVCxFQUFFLENBQUNVLE9BQU87RUFDdkUsTUFBTTtJQUFFQyxnQkFBZ0IsRUFBRUM7RUFBaUIsQ0FBQyxHQUFHWixFQUFFO0VBQ2pELE1BQU07SUFBRWE7RUFBYyxDQUFDLEdBQUdiLEVBQUUsQ0FBQ2MsV0FBVztFQUN4QyxNQUFNO0lBQUVDLGFBQWE7SUFBRUMsTUFBTTtJQUFFQyxZQUFZO0lBQUVDLGFBQWE7SUFBRUMsV0FBVztJQUFFQyxRQUFRO0lBQUVDLFdBQVc7SUFBRUMsT0FBTztJQUFFQyxJQUFJO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQyxZQUFZO0lBQUVDLHdCQUF3QixFQUFFQyxVQUFVO0lBQUVDLG1CQUFtQixFQUFFQztFQUFNLENBQUMsR0FBRzlCLEVBQUUsQ0FBQytCLFVBQVU7RUFDcE8sTUFBTTtJQUFFQztFQUFHLENBQUMsR0FBR2hDLEVBQUUsQ0FBQ2lDLElBQUk7RUFDdEIsTUFBTUMsZ0JBQWdCLGdCQUFHO0lBQUssT0FBTyxFQUFDLGFBQWE7SUFBQyxLQUFLLEVBQUM7RUFBNEIsZ0JBQ3JGO0lBQU0sSUFBSSxFQUFDLGNBQWM7SUFBQyxNQUFNLEVBQUMsS0FBSztJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLFVBQVU7SUFBQyxDQUFDLEVBQUM7RUFBTSxFQUFHLGVBQ25HO0lBQVEsRUFBRSxFQUFDLFVBQVU7SUFBQyxFQUFFLEVBQUMsTUFBTTtJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLE9BQU87SUFBQyxDQUFDLEVBQUM7RUFBUyxFQUFHLGVBQ3hFO0lBQU0sSUFBSSxFQUFDLGNBQWM7SUFBQyxNQUFNLEVBQUMsS0FBSztJQUFDLEVBQUUsRUFBQyxRQUFRO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLFVBQVU7SUFBQyxDQUFDLEVBQUM7RUFBTSxFQUFHLGVBQ3BHO0lBQVEsRUFBRSxFQUFDLFdBQVc7SUFBQyxFQUFFLEVBQUMsTUFBTTtJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBUyxFQUFHLGVBQzFFO0lBQU0sSUFBSSxFQUFDLGNBQWM7SUFBQyxNQUFNLEVBQUMsS0FBSztJQUFDLEVBQUUsRUFBQyxRQUFRO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLFdBQVc7SUFBQyxDQUFDLEVBQUM7RUFBTSxFQUFHLGVBQ3JHO0lBQVEsRUFBRSxFQUFDLFdBQVc7SUFBQyxFQUFFLEVBQUMsTUFBTTtJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBUyxFQUFHLGVBQzFFLCtDQUNDO0lBQWdCLEVBQUUsRUFBQyxRQUFRO0lBQUMsRUFBRSxFQUFDLFNBQVM7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsRUFBRSxFQUFDO0VBQUcsZ0JBQzVEO0lBQU0sTUFBTSxFQUFDLEdBQUc7SUFBQyxTQUFTLEVBQUMsU0FBUztJQUFDLFdBQVcsRUFBQztFQUFTLEVBQUcsZUFDN0Q7SUFBTSxNQUFN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LFFBQVE7UUFDZEMsT0FBTyxFQUFFLEtBQUs7UUFDZEMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLO01BQzVCO0lBQ0QsQ0FBQztJQUNEQyxPQUFPLEVBQUU7TUFDUnhFLFVBQVUsRUFBRTtRQUNYbUQsU0FBUyxFQUFFO01BQ1o7SUFDRCxDQUFDO0lBQ0RzQixRQUFRLEVBQUU7TUFDVEMsUUFBUSxFQUFFO0lBRVgsQ0FBQztJQUNEQyxJQUFJLEVBQUU3RSxpQkFBaUI7SUFDdkI4RSxJQUFJLEVBQUUsVUFBVTdFLEtBQUssRUFBRTtNQUFFLE9BQU8sSUFBSTtJQUFDO0VBQ3RDLENBQUMsQ0FBQztBQUVILENBQUMsRUFBQzhFLE1BQU0sQ0FBQ25ILEVBQUUsRUFBRW9ILE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7O0FDclpwQjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3dEOztBQUV4RCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy9vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5zY3NzPzRlYjQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgU2VsZWN0Q29udHJvbCwgTm90aWNlLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgVGV4dENvbnRyb2wsIFNwaW5uZXIsIEZsZXgsIEZsZXhJdGVtLCBGbGV4QmxvY2ssIFJhZGlvQ29udHJvbCwgX19leHBlcmltZW50YWxSYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBfX2V4cGVyaW1lbnRhbFJhZGlvOiBSYWRpbyB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxyZWN0IGZpbGw9XCJ1cmwoI3N2Z18xOSlcIiBoZWlnaHQ9XCIxMzZcIiBpZD1cInN2Z18xXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCIxMi4xNzQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMjEuNjI0OTlcIiBjeT1cIjI0LjJcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzJcIiByPVwiNS41MTE1M1wiIC8+XG5cdFx0PHJlY3QgZmlsbD1cInVybCgjc3ZnXzE5KVwiIGhlaWdodD1cIjEzNlwiIGlkPVwic3ZnXzEyXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCI5OS4wMjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTA4LjQ3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xM1wiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwidXJsKCNzdmdfMTkpXCIgaGVpZ2h0PVwiMTM2XCIgaWQ9XCJzdmdfMTVcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjc2XCIgeD1cIjE4NS44MjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTk1LjI3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xNlwiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8ZGVmcz5cblx0XHRcdDxsaW5lYXJHcmFkaWVudCBpZD1cInN2Z18xOVwiIHgxPVwiMC4wMDI2MlwiIHgyPVwiMVwiIHkxPVwiMFwiIHkyPVwiMVwiPlxuXHRcdFx0XHQ8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2U4ZThlOFwiIHN0b3BPcGFjaXR5PVwiMC45OTYwOVwiIC8+XG5cdFx0XHRcdDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZTBlMGUwXCIgc3RvcE9wYWNpdHk9XCIwLjk5NjA5XCIgLz5cblx0XHRcdDwvbGluZWFyR3JhZGllbnQ+XG5cdFx0PC9kZWZzPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gT2JqZWN0c0ZpbHRlcmVkRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblx0XHRjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXHRcdGNvbnN0IFt0ZXJtc0ZldGNoZWQsIHNldFRlcm1zRmV0Y2hlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0Y29uc3QgW3Rlcm1zLCBzZXRUZXJtc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cblx0XHRsZXQgW3JlbmRlcmVkLCBzZXRSZW5kZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0bGV0IGJsb2NrUmVmID0gdXNlUmVmKCk7XG5cdFx0bGV0IHNlbGVjdENhdFJlZiA9IHVzZVJlZigpO1xuXHRcdGxldCBzZWxlY3RQcm9wUmVmID0gdXNlUmVmKCk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGVybXNGZXRjaGVkKSB7XG5cblx0XHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PntfXygnQnVpbGQgWW91ciBjb25kaXRpb25zIGZvciBzZWFyY2hpbmcgb2JqZWN0cyB0byBmaW5kIG9uZXMuJywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdj57X18oJ05vdGVzOicsICdtZXNzaWEnKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDx1bD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygndGhlIGxpc3Qgb2YgdGVybXMgaXMgc3Vib3JkaW5hdGUgdG8gdGhlIHZhbHVlIG9mIHRoZSBcIkVtcHR5IGNhdGVnb3J5IHRlcm1zXCIgb3B0aW9uLicsICdtZXNzaWEnKX08L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGk+e19fKCdzb3J0aW5nIGJ5IHJldmlld3MgY291bGQgYmUgZGlzYWJsZWQgaWYgdGhlbWUgb3B0aW9uIFNpdGUgcmF0aW5nIGFyZSBPbi4nLCAnbWVzc2lhJyl9PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygnc2V0IHBhcmFtZXRlciBMaW1pdCB0byAwIHRvIHVubGltaXQgbnVtYmVyIG9mIG9iamVjdHMuJywgJ21lc3NpYScpfTwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYVwiXG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXs1fT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnTnVtYmVyIG9mIG9iamVjdHMnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1pbj0nMCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RlcD0nMSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0nbnVtYmVyJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5saW1pdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBsaW1pdDogTnVtYmVyKHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhXCJcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezV9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1NvcnQgYnk6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5vcmRlckJ5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgb3JkZXJCeTogc2x1ZyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMub3JkZXJCeX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW9Hcm91cFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYS1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWNjZXNzaWJpbGl0eWxhYmVsPVwiV2lkdGhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IG9yZGVyRGlyOiB2YWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5vcmRlckRpcn0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdTb3J0IGRpcmVjdGlvbjonLCAnbWVzc2lhJyl9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIkFTQ1wiPntfXygnQXNjZW5kaW5nJywgJ21lc3NpYScpfTwvUmFkaW8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIkRFU0NcIj57X18oJ0Rlc2NlbmRpbmcnLCAnbWVzc2lhJyl9PC9SYWRpbz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFJhZGlvIHZhbHVlPVwiUk5EXCI+e19fKCdSYW5kb20nLCAnbWVzc2lhJyl9PC9SYWRpbz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvUmFkaW9Hcm91cD5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uc1wiXG5cdFx0XHRcdFx0XHRcdFx0anVzdGlmeT1cInN0YXJ0XCJcblx0XHRcdFx0XHRcdFx0XHRhbGlnbj1cImxlZnRcIlxuXHRcdFx0XHRcdFx0XHRcdGdhcD17MH0+XG5cdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQmVsb25ncyB0byBTZWdtZW50OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLnNlZ21lbnR9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHNlZ21lbnQ6IHNsdWcgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuc2VnbWVudH1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHJlZj17c2VsZWN0Q2F0UmVmfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtdWx0aXBsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0FORCBCZWxvbmdzIHRvIENhdGVnb3JpZXM6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmNhdGVnb3J5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoc2x1ZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNhdGVnb3J5OiBzbHVnIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiByZWY9e3NlbGVjdFByb3BSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG11bHRpcGxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQU5EIEhhdmluZyBQcm9wZXJ0aWVzOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5wcm9wZXJ0eX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBwcm9wZXJ0eTogc2x1ZyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3Rlcm1zLnByb3BlcnR5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXg+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpb0dyb3VwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFjY2Vzc2liaWxpdHlsYWJlbD1cIldpZHRoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgaXNGZWF0dXJlZDogcGFyc2VJbnQodmFsdWUpIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5pc0ZlYXR1cmVkLnRvU3RyaW5nKCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdNYXJrZWQgYXMgZmVhdHVyZWQ6JywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIjFcIj57X18oJ1llcycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIi0xXCI+e19fKCdObycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIjBcIj57X18oJ0FueScsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L1JhZGlvR3JvdXA+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW9Db250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTcGxpdCBjYXJkcyB0byBjb2x1bW5zIGJ5OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17YXR0cmlidXRlcy5jb2x1bW5zfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbGFiZWw6IF9fKCdUaHJlZScsICdtZXNzaWEnKSwgdmFsdWU6IDMgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbGFiZWw6IF9fKCdGb3VyJywgJ21lc3NpYScpLCB2YWx1ZTogNCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNvbHVtbnM6IHBhcnNlSW50KHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIHRhYkluZGV4PVwiMFwiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e3Byb3BzLm5hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFRlcm1zID0gYXN5bmMgKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgYXBpRmV0Y2goe1xuXHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL2Jsb2NrLW9iamVjdHMtZmlsdGVyZWQnLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0ZGF0YTogeyBjdXJyZW50QXR0cnM6IGF0dHJpYnV0ZXMgfVxuXHRcdFx0fSkudGhlbihyZXNwb25zZSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3BvbnNlLnRlcm1zLnNlZ21lbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRfXygnTWVzc2lhIENhdGVnb3J5IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IFNlZ21lbnQuIFVuaXQgb3BlcmF0aW9uIGlzIG5vdCBwb3NzaWJsZS4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXNwb25zZTtcblxuXHRcdFx0fSkuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdF9fKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZWNlaXZpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgZm9yIE9iamVjdCBGaWx0ZXJlZCBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoYXR0cmlidXRlcy5zZWdtZW50ID09PSAnJykge1xuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLnNlZ21lbnQgPSByZXNwb25zZS50ZXJtcy5zZWdtZW50WzBdLnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0XHRzZXRSZW5kZXJlZCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFt0ZXJtc0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0XHRpZiAocmVuZGVyZWQgfHwgZWRpdE1vZGUpIHtcblx0XHRcdFx0JChzZWxlY3RDYXRSZWYuY3VycmVudCkuZmluZCgnc2VsZWN0Jykuc2VsZWN0Mih7XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6IF9fKCdBbnkgLyBOb25lIGNhdGVnb3J5JywgJ21lc3NpYScpLFxuXHRcdFx0XHR9KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bGV0IHNsdWcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXHRcdFx0XHRcdGlmIChzbHVnID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRzbHVnID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBjYXRlZ29yeTogc2x1ZyB9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCQoc2VsZWN0UHJvcFJlZi5jdXJyZW50KS5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHtcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogX18oJ0FueSAvIE5vbmUgcHJvcGVydHknLCAnbWVzc2lhJyksXG5cdFx0XHRcdH0pLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRsZXQgc2x1ZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cdFx0XHRcdFx0aWYgKHNsdWcgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHNsdWcgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHByb3BlcnR5OiBzbHVnIH0pO1xuXHRcdFx0XHR9KTs7XG5cdFx0XHR9XG5cblx0XHR9LCBbcmVuZGVyZWQsIGVkaXRNb2RlXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLW9iamVjdHMtZmlsdGVyZWQnLCB7XG5cdFx0dGl0bGU6IF9fKCdPYmplY3RzIGJ5IGZpbHRlcnMnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdUZXJtcyBvZiB0YXhvbm9teSBDYXRlZ29yeSBieSBwYXJhbWV0ZXJzJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEgMGw5IDE1LjA5NHY1LjkwNmw0IDN2LTguOTA2bDktMTUuMDk0aC0yMnptMTguNDc5IDJsLTIuOTgxIDVoLTguOTk2bC0yLjk4MS01aDE0Ljk1OHpcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnb2JqZWN0J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRzZWdtZW50OiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdH0sXG5cdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRpc0ZlYXR1cmVkOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogMCxcblx0XHRcdFx0ZW51bTogWy0xLCAwLCAxXVxuXHRcdFx0fSxcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGxpbWl0OiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogNCxcblx0XHRcdH0sXG5cdFx0XHRjb2x1bW5zOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogNCxcblx0XHRcdFx0ZW51bTogWzMsIDRdLFxuXHRcdFx0fSxcblx0XHRcdG9yZGVyQnk6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICdwb3N0X2RhdGUnLFxuXHRcdFx0XHRlbnVtOiBbJ3Bvc3RfZGF0ZScsICdwb3N0X3RpdGxlJywgJ3JhdGluZycsICdyZXZpZXdzJ10sXG5cdFx0XHR9LFxuXHRcdFx0b3JkZXJEaXI6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICdBU0MnLFxuXHRcdFx0XHRlbnVtOiBbJ0FTQycsICdERVNDJywgJ1JORCddLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogT2JqZWN0c0ZpbHRlcmVkRm4sXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiZWxlbWVudCIsInNlcnZlclNpZGVSZW5kZXIiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiU2VsZWN0Q29udHJvbCIsIk5vdGljZSIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiVGV4dENvbnRyb2wiLCJTcGlubmVyIiwiRmxleCIsIkZsZXhJdGVtIiwiRmxleEJsb2NrIiwiUmFkaW9Db250cm9sIiwiX19leHBlcmltZW50YWxSYWRpb0dyb3VwIiwiUmFkaW9Hcm91cCIsIl9fZXhwZXJpbWVudGFsUmFkaW8iLCJSYWRpbyIsImNvbXBvbmVudHMiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwibGFzdFByZXZpZXciLCJPYmplY3RzRmlsdGVyZWRGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsInRlcm1zRmV0Y2hlZCIsInNldFRlcm1zRmV0Y2hlZCIsInRlcm1zIiwic2V0VGVybXMiLCJyZW5kZXJlZCIsInNldFJlbmRlcmVkIiwiYmxvY2tSZWYiLCJzZWxlY3RDYXRSZWYiLCJzZWxlY3RQcm9wUmVmIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwibGltaXQiLCJ2YWx1ZSIsIk51bWJlciIsIm9yZGVyQnkiLCJzbHVnIiwib3JkZXJEaXIiLCJzZWdtZW50IiwiY2F0ZWdvcnkiLCJwcm9wZXJ0eSIsImlzRmVhdHVyZWQiLCJwYXJzZUludCIsInRvU3RyaW5nIiwiY29sdW1ucyIsImxhYmVsIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwiZ2V0VGVybXMiLCJwYXRoIiwibWV0aG9kIiwiZGF0YSIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImxlbmd0aCIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImlzTW91bnRlZCIsImN1cnJlbnQiLCJmaW5kIiwic2VsZWN0MiIsInBsYWNlaG9sZGVyIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ2YWwiLCJkZXNjcmlwdGlvbiIsImljb24iLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJ0eXBlIiwiZGVmYXVsdCIsImVudW0iLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
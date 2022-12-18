/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/segment-wrapper-editor.jsx":
/*!**************************************************!*\
  !*** ./src/js/blocks/segment-wrapper-editor.jsx ***!
  \**************************************************/
/***/ (function() {

(function (wp, $) {
  const {
    apiFetch,
    apiRequest
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
    BlockControls,
    InnerBlocks,
    useBlockProps
  } = wp.blockEditor;
  const {
    SelectControl,
    ToggleControl,
    Notice,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    TextControl,
    Spinner,
    RangeControl,
    Flex,
    FlexItem,
    FlexBlock,
    __experimentalRadioGroup: RadioGroup,
    __experimentalRadio: Radio
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "137",
    cy: "82.5",
    fill: "#cccccc",
    id: "svg_3",
    rx: "49.5",
    ry: "49.5",
    strokeDasharray: "null",
    strokeLinecap: "null",
    strokeLinejoin: "null",
    strokeWidth: "null"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "#000000",
    fontFamily: "serif",
    fontSize: "24",
    strokeDasharray: "null",
    strokeLinecap: "null",
    strokeLinejoin: "null",
    strokeWidth: "0",
    textAnchor: "middle",
    transform: "matrix(2.17559 0 0 2.17559 -137.872 -97.7079)",
    x: "126.497",
    y: "89.41434"
  }, `{S}`));
  let lastPreview = false;
  function SegmentWrapperFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [editMode, setEditMode] = useState(true);
    const [termsFetched, setTermsFetched] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [terms, setTerms] = useState({
      segment: []
    });
    let blockRef = useRef();
    let selectSegmentsRef = useRef();
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
        if (terms.segment.length > 0) {
          const block = wp.blocks.getBlockType(name);
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, /*#__PURE__*/React.createElement(Fragment, {
            key: "tip"
          }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
            isDismissible: false,
            status: "warning"
          }, /*#__PURE__*/React.createElement("p", null, __('Add any inner blocks and specify the segments. The content of the block will be displayed only if the currently viewed object or listing page belongs to the segments specified in the settings.', 'messia')))), /*#__PURE__*/React.createElement("div", {
            ref: selectSegmentsRef
          }, /*#__PURE__*/React.createElement(SelectControl, {
            multiple: true,
            className: "criteria-item",
            label: __('Wrap in segments:', 'messia'),
            value: attributes.forSegments,
            onChange: value => {
              setAttributes({
                forSegments: value
              });
            },
            options: terms.segment
          }), /*#__PURE__*/React.createElement(InnerBlocks, null))));
        } else {
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder",
            label: __("You have no segments. Create one.", 'messia')
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }));
        }
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
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
        block: name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: true
        }
      })));
    };
    const getTerms = async () => {
      return await apiFetch({
        path: 'messia/v1/block-segment-wrapper',
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
        __('An error occurred while receiving data from the server for Category Terms block', 'messia'),
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
            setAttributes({
              tabsConstructed: response.validAttrs.tabsConstructed
            });
            setTerms(response.terms);
            setTermsFetched(true);
            setRendered(true);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(() => {
      if (!rendered || !editMode) return;
      $(selectSegmentsRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia'),
        closeOnSelect: false
      }).on('change', event => {
        let slug = $(event.currentTarget).val();
        if (slug === null) {
          slug = [];
        }
        setAttributes({
          forSegments: slug
        });
      });
    }, [rendered, editMode]);
    return render();
  }
  registerBlockType('messia/block-segment-wrapper', {
    title: __('Segment wrapper', 'messia'),
    description: __('Show block content only for certain segment', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "none",
      d: "m0,0l24,0l0,24l-24,0l0,-24z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m4,19l6,0l0,-2l-6,0l0,2zm16,-14l-16,0l0,2l16,0l0,-2zm-3,6l-13,0l0,2l13.25,0c1.1,0 2,0.9 2,2s-0.9,2 -2,2l-2.25,0l0,-2l-3,3l3,3l0,-2l2,0c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4z"
    })),
    category: 'messia',
    keywords: ['wrapper'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      forSegments: {
        type: 'array',
        default: []
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
    edit: SegmentWrapperFn,
    save: function (props) {
      const blockProps = useBlockProps.save();
      return /*#__PURE__*/React.createElement(InnerBlocks.Content, null);
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/segment-wrapper-editor.scss":
/*!*****************************************************!*\
  !*** ./src/scss/blocks/segment-wrapper-editor.scss ***!
  \*****************************************************/
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
/*!******************************************************!*\
  !*** ./src/entries/blocks/segment-wrapper-editor.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_segment_wrapper_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/segment-wrapper-editor.scss */ "./src/scss/blocks/segment-wrapper-editor.scss");
/* harmony import */ var _js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/segment-wrapper-editor.jsx */ "./src/js/blocks/segment-wrapper-editor.jsx");
/* harmony import */ var _js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1zZWdtZW50LXdyYXBwZXItZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQUUsRUFBRUMsQ0FBQyxFQUFFO0VBRWpCLE1BQU07SUFBRUMsUUFBUTtJQUFFQztFQUFXLENBQUMsR0FBR0gsRUFBRTtFQUNuQyxNQUFNO0lBQUVJO0VBQWtCLENBQUMsR0FBR0osRUFBRSxDQUFDSyxNQUFNO0VBQ3ZDLE1BQU07SUFBRUMsU0FBUztJQUFFQyxRQUFRO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQztFQUFPLENBQUMsR0FBR1YsRUFBRSxDQUFDVyxPQUFPO0VBQ3ZFLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR2IsRUFBRTtFQUNqRCxNQUFNO0lBQUVjLGFBQWE7SUFBRUMsV0FBVztJQUFFQztFQUFjLENBQUMsR0FBR2hCLEVBQUUsQ0FBQ2lCLFdBQVc7RUFDcEUsTUFBTTtJQUFFQyxhQUFhO0lBQUVDLGFBQWE7SUFBRUMsTUFBTTtJQUFFQyxZQUFZO0lBQUVDLGFBQWE7SUFBRUMsV0FBVztJQUFFQyxRQUFRO0lBQUVDLFdBQVc7SUFBRUMsT0FBTztJQUFFQyxZQUFZO0lBQUVDLElBQUk7SUFBRUMsUUFBUTtJQUFFQyxTQUFTO0lBQUVDLHdCQUF3QixFQUFFQyxVQUFVO0lBQUVDLG1CQUFtQixFQUFFQztFQUFNLENBQUMsR0FBR2xDLEVBQUUsQ0FBQ21DLFVBQVU7RUFDblAsTUFBTTtJQUFFQztFQUFHLENBQUMsR0FBR3BDLEVBQUUsQ0FBQ3FDLElBQUk7RUFDdEIsTUFBTUMsZ0JBQWdCLGdCQUFHO0lBQUssT0FBTyxFQUFDLGFBQWE7SUFBQyxLQUFLLEVBQUM7RUFBNEIsZ0JBQ3JGO0lBQVMsRUFBRSxFQUFDLEtBQUs7SUFBQyxFQUFFLEVBQUMsTUFBTTtJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLE9BQU87SUFBQyxFQUFFLEVBQUMs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LEVBQUU7TUFDVixDQUFDO01BQ0QxQyxXQUFXLEVBQUU7UUFDWnlDLElBQUksRUFBRSxPQUFPO1FBQ2JDLE9BQU8sRUFBRTtNQUNWO0lBQ0QsQ0FBQztJQUNEQyxPQUFPLEVBQUU7TUFDUmpFLFVBQVUsRUFBRTtRQUNYdUMsU0FBUyxFQUFFO01BQ1o7SUFDRCxDQUFDO0lBQ0QyQixRQUFRLEVBQUU7TUFDVEMsUUFBUSxFQUFFO0lBRVgsQ0FBQztJQUNEQyxJQUFJLEVBQUV0RSxnQkFBZ0I7SUFDdEJ1RSxJQUFJLEVBQUUsVUFBVXRFLEtBQUssRUFBRTtNQUN0QixNQUFNdUUsVUFBVSxHQUFHaEcsYUFBYSxDQUFDK0YsSUFBSSxFQUFFO01BRXZDLG9CQUFPLG9CQUFDLFdBQVcsQ0FBQyxPQUFPLE9BQUc7TUFDOUIsT0FBTyxJQUFJO0lBQ1o7RUFDRCxDQUFDLENBQUM7QUFFSCxDQUFDLEVBQUNFLE1BQU0sQ0FBQ2pILEVBQUUsRUFBRWtILE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7O0FDaFFwQjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3VEOztBQUV2RCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3Mvc2VnbWVudC13cmFwcGVyLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL3NlZ21lbnQtd3JhcHBlci1lZGl0b3Iuc2Nzcz8zMDZlIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9ibG9ja3Mvc2VnbWVudC13cmFwcGVyLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCwgYXBpUmVxdWVzdCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scywgSW5uZXJCbG9ja3MsIHVzZUJsb2NrUHJvcHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFNlbGVjdENvbnRyb2wsIFRvZ2dsZUNvbnRyb2wsIE5vdGljZSwgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIFRleHRDb250cm9sLCBTcGlubmVyLCBSYW5nZUNvbnRyb2wsIEZsZXgsIEZsZXhJdGVtLCBGbGV4QmxvY2ssIF9fZXhwZXJpbWVudGFsUmFkaW9Hcm91cDogUmFkaW9Hcm91cCwgX19leHBlcmltZW50YWxSYWRpbzogUmFkaW8gfSA9IHdwLmNvbXBvbmVudHM7XG5cdGNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5cdGNvbnN0IGV4YW1wbGVJbWFnZURhdGEgPSA8c3ZnIHZpZXdCb3g9XCIwIDAgMjc0IDE2NVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8ZWxsaXBzZSBjeD1cIjEzN1wiIGN5PVwiODIuNVwiIGZpbGw9XCIjY2NjY2NjXCIgaWQ9XCJzdmdfM1wiIHJ4PVwiNDkuNVwiIHJ5PVwiNDkuNVwiIHN0cm9rZURhc2hhcnJheT1cIm51bGxcIiBzdHJva2VMaW5lY2FwPVwibnVsbFwiIHN0cm9rZUxpbmVqb2luPVwibnVsbFwiIHN0cm9rZVdpZHRoPVwibnVsbFwiIC8+XG5cdFx0PHRleHQgZmlsbD1cIiMwMDAwMDBcIiBmb250RmFtaWx5PVwic2VyaWZcIiBmb250U2l6ZT1cIjI0XCIgc3Ryb2tlRGFzaGFycmF5PVwibnVsbFwiIHN0cm9rZUxpbmVjYXA9XCJudWxsXCIgc3Ryb2tlTGluZWpvaW49XCJudWxsXCIgc3Ryb2tlV2lkdGg9XCIwXCIgdGV4dEFuY2hvcj1cIm1pZGRsZVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgyLjE3NTU5IDAgMCAyLjE3NTU5IC0xMzcuODcyIC05Ny43MDc5KVwiIHg9XCIxMjYuNDk3XCIgeT1cIjg5LjQxNDM0XCI+e2B7U31gfTwvdGV4dD5cblx0PC9zdmc+XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gU2VnbWVudFdyYXBwZXJGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW3Rlcm1zRmV0Y2hlZCwgc2V0VGVybXNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbcmVuZGVyZWQsIHNldFJlbmRlcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbdGVybXMsIHNldFRlcm1zXSA9IHVzZVN0YXRlKHtcblx0XHRcdHNlZ21lbnQ6IFtdLFxuXHRcdH0pO1xuXG5cdFx0bGV0IGJsb2NrUmVmID0gdXNlUmVmKCk7XG5cdFx0bGV0IHNlbGVjdFNlZ21lbnRzUmVmID0gdXNlUmVmKCk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGVybXNGZXRjaGVkKSB7XG5cdFx0XHRcdGlmICh0ZXJtcy5zZWdtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdDxGcmFnbWVudCBrZXk9J3RpcCc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxwPntfXygnQWRkIGFueSBpbm5lciBibG9ja3MgYW5kIHNwZWNpZnkgdGhlIHNlZ21lbnRzLiBUaGUgY29udGVudCBvZiB0aGUgYmxvY2sgd2lsbCBiZSBkaXNwbGF5ZWQgb25seSBpZiB0aGUgY3VycmVudGx5IHZpZXdlZCBvYmplY3Qgb3IgbGlzdGluZyBwYWdlIGJlbG9uZ3MgdG8gdGhlIHNlZ21lbnRzIHNwZWNpZmllZCBpbiB0aGUgc2V0dGluZ3MuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiByZWY9e3NlbGVjdFNlZ21lbnRzUmVmfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG11bHRpcGxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1dyYXAgaW4gc2VnbWVudHM6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5mb3JTZWdtZW50c31cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBmb3JTZWdtZW50czogdmFsdWUgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3Rlcm1zLnNlZ21lbnR9XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PElubmVyQmxvY2tzIC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCIgbGFiZWw9e19fKFwiWW91IGhhdmUgbm8gc2VnbWVudHMuIENyZWF0ZSBvbmUuXCIsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyID5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e25hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFRlcm1zID0gYXN5bmMgKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgYXBpRmV0Y2goe1xuXHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL2Jsb2NrLXNlZ21lbnQtd3JhcHBlcicsXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRkYXRhOiB7IGN1cnJlbnRBdHRyczogYXR0cmlidXRlcyB9XG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuXHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMuc2VnbWVudC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdF9fKCdNZXNzaWEgQ2F0ZWdvcnkgVGVybXM6IE5vIHRlcm1zIHdlcmUgZm91bmQgaW4gdGF4b25vbXkgU2VnbWVudC4gVW5pdCBvcGVyYXRpb24gaXMgbm90IHBvc3NpYmxlLicsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgQ2F0ZWdvcnkgVGVybXMgYmxvY2snLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEJsb2NrQ29udHJvbHMoKSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRpZiAoZWRpdE1vZGUpIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChnZXRCbG9ja0VkaXQoKSk7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICghbGFzdFByZXZpZXcpIHtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGdldEJsb2NrUHJldmlldygpO1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT57cmVuZGVyfTwvZGl2Pjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRsZXQgaXNNb3VudGVkID0gdHJ1ZTtcblx0XHRcdGlmICghdGVybXNGZXRjaGVkICYmICFhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXG5cdFx0XHRcdGdldFRlcm1zKCkudGhlbigocmVzcG9uc2UpID0+IHtcblxuXHRcdFx0XHRcdGlmIChpc01vdW50ZWQpIHtcblxuXHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7XG5cdFx0XHRcdFx0XHRcdHRhYnNDb25zdHJ1Y3RlZDogcmVzcG9uc2UudmFsaWRBdHRycy50YWJzQ29uc3RydWN0ZWRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c2V0VGVybXMocmVzcG9uc2UudGVybXMpO1xuXHRcdFx0XHRcdFx0c2V0VGVybXNGZXRjaGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0c2V0UmVuZGVyZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoKSA9PiB7IGlzTW91bnRlZCA9IGZhbHNlIH07XG5cblx0XHR9LCBbdGVybXNGZXRjaGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRpZiAoIXJlbmRlcmVkIHx8ICFlZGl0TW9kZSkgcmV0dXJuO1xuXG5cdFx0XHQkKHNlbGVjdFNlZ21lbnRzUmVmLmN1cnJlbnQpLmZpbmQoJ3NlbGVjdCcpLnNlbGVjdDIoe1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogX18oJ0FueScsICdtZXNzaWEnKSxcblx0XHRcdFx0Y2xvc2VPblNlbGVjdDogZmFsc2UsXG5cdFx0XHR9KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBzbHVnID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblx0XHRcdFx0aWYgKHNsdWcgPT09IG51bGwpIHtcblx0XHRcdFx0XHRzbHVnID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZvclNlZ21lbnRzOiBzbHVnIH0pO1xuXHRcdFx0fSk7XG5cdFx0fSwgW3JlbmRlcmVkLCBlZGl0TW9kZV0pO1xuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1zZWdtZW50LXdyYXBwZXInLCB7XG5cdFx0dGl0bGU6IF9fKCdTZWdtZW50IHdyYXBwZXInLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdTaG93IGJsb2NrIGNvbnRlbnQgb25seSBmb3IgY2VydGFpbiBzZWdtZW50JywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGw9XCJub25lXCIgZD1cIm0wLDBsMjQsMGwwLDI0bC0yNCwwbDAsLTI0elwiIC8+PHBhdGggZD1cIm00LDE5bDYsMGwwLC0ybC02LDBsMCwyem0xNiwtMTRsLTE2LDBsMCwybDE2LDBsMCwtMnptLTMsNmwtMTMsMGwwLDJsMTMuMjUsMGMxLjEsMCAyLDAuOSAyLDJzLTAuOSwyIC0yLDJsLTIuMjUsMGwwLC0ybC0zLDNsMywzbDAsLTJsMiwwYzIuMjEsMCA0LC0xLjc5IDQsLTRzLTEuNzksLTQgLTQsLTR6XCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ3dyYXBwZXInXSxcblx0XHRzdHlsZXM6IFtdLFxuXHRcdHZhcmlhdGlvbnM6IFtdLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGZvclNlZ21lbnRzOiB7XG5cdFx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRcdGRlZmF1bHQ6IFtdLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogU2VnbWVudFdyYXBwZXJGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHtcblx0XHRcdGNvbnN0IGJsb2NrUHJvcHMgPSB1c2VCbG9ja1Byb3BzLnNhdmUoKTtcblxuXHRcdFx0cmV0dXJuIDxJbm5lckJsb2Nrcy5Db250ZW50IC8+O1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy9zZWdtZW50LXdyYXBwZXItZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL3NlZ21lbnQtd3JhcHBlci1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwiYXBpUmVxdWVzdCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsImVsZW1lbnQiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiU2VydmVyU2lkZVJlbmRlciIsIkJsb2NrQ29udHJvbHMiLCJJbm5lckJsb2NrcyIsInVzZUJsb2NrUHJvcHMiLCJibG9ja0VkaXRvciIsIlNlbGVjdENvbnRyb2wiLCJUb2dnbGVDb250cm9sIiwiTm90aWNlIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJUZXh0Q29udHJvbCIsIlNwaW5uZXIiLCJSYW5nZUNvbnRyb2wiLCJGbGV4IiwiRmxleEl0ZW0iLCJGbGV4QmxvY2siLCJfX2V4cGVyaW1lbnRhbFJhZGlvR3JvdXAiLCJSYWRpb0dyb3VwIiwiX19leHBlcmltZW50YWxSYWRpbyIsIlJhZGlvIiwiY29tcG9uZW50cyIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIlNlZ21lbnRXcmFwcGVyRm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImVkaXRNb2RlIiwic2V0RWRpdE1vZGUiLCJ0ZXJtc0ZldGNoZWQiLCJzZXRUZXJtc0ZldGNoZWQiLCJyZW5kZXJlZCIsInNldFJlbmRlcmVkIiwidGVybXMiLCJzZXRUZXJtcyIsInNlZ21lbnQiLCJibG9ja1JlZiIsInNlbGVjdFNlZ21lbnRzUmVmIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJsZW5ndGgiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwiZm9yU2VnbWVudHMiLCJ2YWx1ZSIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsImdldFRlcm1zIiwicGF0aCIsIm1ldGhvZCIsImRhdGEiLCJjdXJyZW50QXR0cnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJkaXNwYXRjaCIsImNyZWF0ZU5vdGljZSIsImlzRGlzbWlzc2libGUiLCJjYXRjaCIsImUiLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwicHVzaCIsImpvaW4iLCJpc01vdW50ZWQiLCJ0YWJzQ29uc3RydWN0ZWQiLCJ2YWxpZEF0dHJzIiwiY3VycmVudCIsImZpbmQiLCJzZWxlY3QyIiwid2lkdGgiLCJwbGFjZWhvbGRlciIsImNsb3NlT25TZWxlY3QiLCJvbiIsImV2ZW50Iiwic2x1ZyIsImN1cnJlbnRUYXJnZXQiLCJ2YWwiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsImJsb2NrUHJvcHMiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
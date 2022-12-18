/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/listing-data-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/listing-data-editor.jsx ***!
  \***********************************************/
/***/ (function() {

(function (wp, $) {
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Component
  } = wp.element;
  const {
    serverSideRender: ServerSideRender
  } = wp;
  const {
    InspectorControls,
    BlockControls
  } = wp.blockEditor;
  const {
    Notice,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    RadioControl,
    PanelBody,
    __experimentalInputControl: InputControl,
    __experimentalSpacer: Spacer
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
  class Listing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editMode: true,
        terms: {
          segment: []
        },
        termsFetched: false
      };
      this.lastPreview = false;
      this.blockRef = React.createRef();
    }
    getInspectorControls() {
      const {
        attributes,
        setAttributes
      } = this.props;
      return /*#__PURE__*/React.createElement(InspectorControls, {
        key: "inspector"
      }, /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Settings', 'messia')
      }, /*#__PURE__*/React.createElement(RadioControl, {
        label: __('Split cards to columns in grid view mode by:', 'messia'),
        selected: attributes.columns,
        options: [{
          label: __('Two', 'messia'),
          value: 2
        }, {
          label: __('Three', 'messia'),
          value: 3
        }],
        onChange: value => {
          setAttributes({
            columns: parseInt(value)
          });
        }
      })));
    }
    getBlockControls() {
      return /*#__PURE__*/React.createElement(BlockControls, {
        key: "block"
      }, /*#__PURE__*/React.createElement(ToolbarGroup, {
        label: __('Options', 'messia')
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        label: this.state.editMode ? __('Preview', 'messia') : __('Edit', 'messia'),
        icon: this.state.editMode ? "visibility" : "edit",
        onClick: () => {
          this.setState({
            editMode: !this.state.editMode
          });
        }
      })));
    }
    getBlockEdit() {
      const block = wp.blocks.getBlockType(this.props.name);
      const {
        attributes,
        setAttributes
      } = this.props;
      return /*#__PURE__*/React.createElement(Placeholder, {
        key: "messia-block-placeholder"
      }, /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block",
        ref: this.blockRef
      }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('The block creates the main content of the search page and handles search queries.', 'messia'))), /*#__PURE__*/React.createElement(Spacer, null, /*#__PURE__*/React.createElement(InputControl, {
        label: __('Block title:', 'messia'),
        labelPosition: "top",
        value: attributes.blockTitle,
        onChange: nextValue => {
          setAttributes({
            blockTitle: nextValue
          });
        }
      }))));
    }
    getBlockPreview() {
      return /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        tabIndex: "0",
        key: "messia-block",
        ref: this.blockRef
      }, /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('Preview is too complex and too big to show here. Open the page in front to see results.', 'messia')))));
    }
    render() {
      const {
        attributes
      } = this.props;
      const {
        className
      } = this.props;
      const {
        isExample
      } = attributes;
      if (isExample) {
        return exampleImageData;
      } else {
        let classes = [className];
        const render = [this.getInspectorControls(), this.getBlockControls()];
        if (this.state.editMode) {
          render.push(this.getBlockEdit());
          this.lastPreview = false;
        } else if (!this.lastPreview) {
          this.lastPreview = this.getBlockPreview();
          render.push(this.lastPreview);
        } else {
          render.push(this.lastPreview);
        }
        return /*#__PURE__*/React.createElement("div", {
          className: classes.join(' ')
        }, render);
      }
    }
  }
  registerBlockType('messia/block-listing-data', {
    title: __('Listing data', 'messia'),
    description: __('Creates the main content of the search page and handles search queries.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg",
      fillRule: "evenodd",
      clipRule: "evenodd"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
    })),
    category: 'messia',
    keywords: ['listing'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      blockTitle: {
        type: 'string',
        default: ''
      },
      columns: {
        type: 'integer',
        default: 3,
        enum: [2, 3]
      }
    },
    example: {
      attributes: {
        isExample: true
      }
    },
    supports: {
      multiple: false
    },
    edit: Listing,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/listing-data-editor.scss":
/*!**************************************************!*\
  !*** ./src/scss/blocks/listing-data-editor.scss ***!
  \**************************************************/
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
/*!***************************************************!*\
  !*** ./src/entries/blocks/listing-data-editor.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_listing_data_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/listing-data-editor.scss */ "./src/scss/blocks/listing-data-editor.scss");
/* harmony import */ var _js_blocks_listing_data_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/listing-data-editor.jsx */ "./src/js/blocks/listing-data-editor.jsx");
/* harmony import */ var _js_blocks_listing_data_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_listing_data_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1saXN0aW5nLWRhdGEtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQUUsRUFBRUMsQ0FBQyxFQUFFO0VBRWpCLE1BQU07SUFBRUM7RUFBa0IsQ0FBQyxHQUFHRixFQUFFLENBQUNHLE1BQU07RUFDdkMsTUFBTTtJQUFFQztFQUFVLENBQUMsR0FBR0osRUFBRSxDQUFDSyxPQUFPO0VBQ2hDLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR1AsRUFBRTtFQUNqRCxNQUFNO0lBQUVRLGlCQUFpQjtJQUFFQztFQUFjLENBQUMsR0FBR1QsRUFBRSxDQUFDVSxXQUFXO0VBQzNELE1BQU07SUFBRUMsTUFBTTtJQUFFQyxZQUFZO0lBQUVDLGFBQWE7SUFBRUMsV0FBVztJQUFFQyxRQUFRO0lBQUVDLFlBQVk7SUFBRUMsU0FBUztJQUFFQywwQkFBMEIsRUFBRUMsWUFBWTtJQUFFQyxvQkFBb0IsRUFBRUM7RUFBTyxDQUFDLEdBQUdyQixFQUFFLENBQUNzQixVQUFVO0VBQ3JMLE1BQU07SUFBRUM7RUFBRyxDQUFDLEdBQUd2QixFQUFFLENBQUN3QixJQUFJO0VBQ3RCLE1BQU1DLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxhQUFhO0lBQUMsS0FBSyxFQUFDO0VBQTRCLGdCQUNyRjtJQUFNLElBQUksRUFBQyxjQUFjO0lBQUMsTUFBTSxFQUFDLEtBQUs7SUFBQyxFQUFFLEVBQUMsT0FBTztJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxLQUFLLEVBQUMsSUFBSTtJQUFDLENBQUMsRUFBQyxVQUFVO0lBQUMsQ0FBQyxFQUFDO0VBQU0sRUFBRyxlQUNuRztJQUFRLEVBQUUsRUFBQyxVQUFVO0lBQUMsRUFBRSxFQUFDLE1BQU07SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsQ0FBQyxFQUFDO0VBQVMsRUFBRyxlQUN4RTtJQUFNLElBQUksRUFBQyxjQUFjO0lBQUMsTUFBTSxFQUFDLEtBQUs7SUFBQyxFQUFFLEVBQUMsUUFBUTtJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxLQUFLLEVBQUMsSUFBSTtJQUFDLENBQUMsRUFBQyxVQUFVO0lBQUMsQ0FBQyxFQUFDO0VBQU0sRUFBRyxlQUNwRztJQUFRLEVBQUUsRUFBQyxXQUFXO0lBQUMsRUFBRSxFQUFDLE1BQU07SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQyxRQUFRO0lBQUMsQ0FBQyxFQUFDO0VBQVMsRUFBRyxlQUMxRTtJQUFNLElBQUksRUFBQyxjQUFjO0lBQUMsTUFBTSxFQUFDLEtBQUs7SUFBQyxFQUFFLEVBQUMsUUFBUTtJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxLQUFLLEVBQUMsSUFBSTtJQUFDLENBQUMsRUFBQyxXQUFXO0lBQUMsQ0FBQyxFQUFDO0VBQU0sRUFBRyxlQUNyRztJQUFRLEVBQUUsRUFBQyxXQUFXO0lBQUMsRUFBRSxFQUFDLE1BQU07SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQyxRQUFRO0lBQUMsQ0FBQyxFQUFDO0VBQVMsRUFBRyxlQUMxRSwrQ0FDQztJQUFnQixFQUFFLEVBQUMsUUFBUTtJQUFDLEVBQUUsRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEVBQUUsRUFBQztFQUFHLGdCQUM1RDtJQUFNLE1BQU0sRUFBQyxHQUFHO0lBQUMsU0FBUyxFQUFDLFNBQVM7SUFBQyxXQUFXLEVBQUM7RUFBUyxFQUFHLGVBQzdEO0lBQU0sTUFBTSxFQUFDLEdBQUc7SUFBQyxTQUFTLEVBQUMsU0FBUztJQUFDLFdBQVcsRUFBQztFQUFTLEVBQUcsQ0FDN0MsQ0FDWCxDQUNGO0VBRU4sTUFBTUMsT0FBTyxTQUFTdEIsU0FBUyxDQUFDO0lBQy9CdUIsV0FBVyxDQUFDQyxLQUFLLEVBQUU7TUFDbEIsS0FBSyxDQUFDQSxLQUFLLENBQUM7TUFFWixJQUFJLENBQUNDLEtBQUssR0FBRztRQUNaQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxLQUFLLEVBQUU7VUFDTkMsT0FBTyxFQUFFO1FBQ1YsQ0FBQztRQUNEQyxZQUFZLEVBQUU7TUFDZixDQUFDO01BRUQsSUFBSSxDQUFDQyxXQUFXLEdBQUcsS0FBSztNQUN4QixJQUFJLENBQUNDLFFBQVEsR0FBR0MsS0FBSyxDQUFDQyxTQUFTLEVBQUU7SUFDbEM7SUFFQUMsb0JBQW9CLEdBQUc7TUFDdEIsTUFBTTtRQUFFQyxVQUFVO1FBQUVDO01BQWMsQ0FBQyxHQUFHLElBQUksQ0FBQ1osS0FBSztNQUVoRCxvQkFDQyxvQkFBQyxpQkFBaUI7UUFBQyxHQUFHLEVBQUM7TUFBVyxnQkFDakMsb0JBQUMsU0FBUztRQUFDLEtBQUssRUFBRUwsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRO01BQUUsZ0JBQzFDLG9CQUFDLFlBQVk7UUFDWixLQUFLLEVBQUVBLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxRQUFRLENBQUU7UUFDcEUsUUFBUSxFQUFFZ0IsVUFBVSxDQUFDRSxPQUFRO1FBQzdCLE9BQU8sRUFBRSxDQUNSO1VBQUVDLEtBQUssRUFBRW5CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1VBQUVvQixLQUFLLEVBQUU7UUFBRSxDQUFDLEVBQ3hDO1VBQUVELEtBQUssRUFBRW5CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO1VBQUVvQixLQUFLLEVBQUU7UUFBRSxDQUFDLENBQ3pDO1FBQ0YsUUFBUSxFQUFHQSxLQUFLLElBQUs7VUFDcEJILGFBQWEsQ0FBQztZQUFFQyxPQUFPLEVBQUVHLFFBQVEsQ0FBQ0QsS0FBSztVQUFFLENBQUMsQ0FBQztRQUM1QztNQUFFLEVBQ0QsQ0FDUyxDQUNPO0lBRXRCO0lBRUFFLGdCQUFnQixHQUFHO01BRWxCLG9CQUNDLG9CQUFDLGFBQWE7UUFBQyxHQUFHLEVBQUM7TUFBTyxnQkFDekIsb0JBQUMsWUFBWTtRQUNaLEtBQUssRUFBRXRCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUTtNQUFFLGdCQUMvQixvQkFBQyxhQUFhO1FBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQ00sS0FBSyxDQUFDQyxRQUFRLEdBQUdQLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUdBLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFFO1FBQzVFLElBQUksRUFBRSxJQUFJLENBQUNNLEtBQUssQ0FBQ0MsUUFBUSxHQUFHLFlBQVksR0FBRyxNQUFPO1FBQ2xELE9BQU8sRUFBRSxNQUFNO1VBQ2QsSUFBSSxDQUFDZ0IsUUFBUSxDQUFDO1lBQ2JoQixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUNELEtBQUssQ0FBQ0M7VUFDdkIsQ0FBQyxDQUFDO1FBQ0g7TUFBRSxFQUNELENBQ1ksQ0FDQTtJQUVsQjtJQUVBaUIsWUFBWSxHQUFHO01BRWQsTUFBTUMsS0FBSyxHQUFHaEQsRUFBRSxDQUFDRyxNQUFNLENBQUM4QyxZQUFZLENBQUMsSUFBSSxDQUFDckIsS0FBSyxDQUFDc0IsSUFBSSxDQUFDO01BQ3JELE1BQU07UUFBRVgsVUFBVTtRQUFFQztNQUFjLENBQUMsR0FBRyxJQUFJLENBQUNaLEtBQUs7TUFFaEQsb0JBQ0Msb0JBQUMsV0FBVztRQUFDLEdBQUcsRUFBQztNQUEwQixnQkFDMUM7UUFBSyxTQUFTLEVBQUMsY0FBYztRQUFDLEdBQUcsRUFBQyxjQUFjO1FBQUMsR0FBRyxFQUFFLElBQUksQ0FBQ087TUFBUyxnQkFDbkUsZ0NBQUthLEtBQUssQ0FBQ0csS0FBSyxDQUFNLGVBQ3RCLG9CQUFDLE1BQU07UUFDTixhQUFhLEVBQUUsS0FBTTtRQUNyQixNQUFNLEVBQUM7TUFBUyxnQkFDaEIsK0JBQUk1QixFQUFFLENBQUMsbUZBQW1GLEVBQUUsUUFBUSxDQUFDLENBQUssQ0FDbEcsZUFDVCxvQkFBQyxNQUFNLHFCQUNOLG9CQUFDLFlBQVk7UUFDWixLQUFLLEVBQUVBLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFFO1FBQ3BDLGFBQWEsRUFBQyxLQUFLO1FBQ25CLEtBQUssRUFBRWdCLFVBQVUsQ0FBQ2EsVUFBVztRQUM3QixRQUFRLEVBQUdDLFNBQVMsSUFBSztVQUN4QmIsYUFBYSxDQUFDO1lBQUVZLFVBQVUsRUFBRUM7VUFBVSxDQUFDLENBQUM7UUFDekM7TUFBRSxFQUNELENBQ00sQ0FDSixDQUNPO0lBRWhCO0lBRUFDLGVBQWUsR0FBRztNQUVqQixvQkFDQyxvQkFBQyxRQUFRO1FBQUMsR0FBRyxFQUFDO01BQWUsZ0JBQzVCO1FBQUssU0FBUyxFQUFDLGNBQWM7UUFBQyxRQUFRLEVBQUMsR0FBRztRQUFDLEdBQUcsRUFBQyxjQUFjO1FBQUMsR0FBRyxFQUFFLElBQUksQ0FBQ25CO01BQVMsZ0JBQ2hGLG9CQUFDLE1BQU07UUFDTixhQUFhLEVBQUUsS0FBTTtRQUNyQixNQUFNLEVBQUM7TUFBUyxnQkFDaEIsK0JBQUlaLEVBQUUsQ0FBQyx5RkFBeUYsRUFBRSxRQUFRLENBQUMsQ0FBSyxDQUN4RyxDQUNKLENBQ0k7SUFFYjtJQUVBZ0MsTUFBTSxHQUFHO01BQ1IsTUFBTTtRQUFFaEI7TUFBVyxDQUFDLEdBQUcsSUFBSSxDQUFDWCxLQUFLO01BQ2pDLE1BQU07UUFBRTRCO01BQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzVCLEtBQUs7TUFDaEMsTUFBTTtRQUFFNkI7TUFBVSxDQUFDLEdBQUdsQixVQUFVO01BRWhDLElBQUlrQixTQUFTLEVBQUU7UUFDZCxPQUFPaEMsZ0JBQWdCO01BQ3hCLENBQUMsTUFDSTtRQUVKLElBQUlpQyxPQUFPLEdBQUcsQ0FBQ0YsU0FBUyxDQUFDO1FBQ3pCLE1BQU1ELE1BQU0sR0FBRyxDQUNkLElBQUksQ0FBQ2pCLG9CQUFvQixFQUFFLEVBQzNCLElBQUksQ0FBQ08sZ0JBQWdCLEVBQUUsQ0FDdkI7UUFFRCxJQUFJLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0MsUUFBUSxFQUFFO1VBQ3hCeUIsTUFBTSxDQUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDWixZQUFZLEVBQUUsQ0FBQztVQUNoQyxJQUFJLENBQUNiLFdBQVcsR0FBRyxLQUFLO1FBQ3pCLENBQUMsTUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDQSxXQUFXLEVBQUU7VUFDM0IsSUFBSSxDQUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDb0IsZUFBZSxFQUFFO1VBQ3pDQyxNQUFNLENBQUNJLElBQUksQ0FBQyxJQUFJLENBQUN6QixXQUFXLENBQUM7UUFDOUIsQ0FBQyxNQUNJO1VBQ0pxQixNQUFNLENBQUNJLElBQUksQ0FBQyxJQUFJLENBQUN6QixXQUFXLENBQUM7UUFDOUI7UUFFQSxvQkFBTztVQUFLLFNBQVMsRUFBRXdCLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDLEdBQUc7UUFBRSxHQUFFTCxNQUFNLENBQU87TUFDekQ7SUFDRDtFQUNEO0VBRUFyRCxpQkFBaUIsQ0FBQywyQkFBMkIsRUFBRTtJQUM5Q2lELEtBQUssRUFBRTVCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO0lBQ25Dc0MsV0FBVyxFQUFFdEMsRUFBRSxDQUFDLHlFQUF5RSxFQUFFLFFBQVEsQ0FBQztJQUNwR3VDLElBQUksZUFBRTtNQUFLLEtBQUssRUFBQyxJQUFJO01BQUMsTUFBTSxFQUFDLElBQUk7TUFBQyxLQUFLLEVBQUMsNEJBQTRCO01BQUMsUUFBUSxFQUFDLFNBQVM7TUFBQyxRQUFRLEVBQUM7SUFBUyxnQkFBQztNQUFNLENBQUMsRUFBQztJQUE0VyxFQUFHLENBQU07SUFDeGVDLFFBQVEsRUFBRSxRQUFRO0lBQ2xCQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDckJDLE1BQU0sRUFBRSxFQUFFO0lBQ1ZDLFVBQVUsRUFBRSxFQUFFO0lBQ2QzQixVQUFVLEVBQUU7TUFDWGtCLFNBQVMsRUFBRTtRQUNWVSxJQUFJLEVBQUUsU0FBUztRQUNmQyxPQUFPLEVBQUU7TUFDVixDQUFDO01BQ0RoQixVQUFVLEVBQUU7UUFDWGUsSUFBSSxFQUFFLFFBQVE7UUFDZEMsT0FBTyxFQUFFO01BQ1YsQ0FBQztNQUNEM0IsT0FBTyxFQUFFO1FBQ1IwQixJQUFJLEVBQUUsU0FBUztRQUNmQyxPQUFPLEVBQUUsQ0FBQztRQUNWQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUNaO0lBQ0QsQ0FBQztJQUNEQyxPQUFPLEVBQUU7TUFDUi9CLFVBQVUsRUFBRTtRQUNYa0IsU0FBUyxFQUFFO01BQ1o7SUFDRCxDQUFDO0lBQ0RjLFFBQVEsRUFBRTtNQUNUQyxRQUFRLEVBQUU7SUFFWCxDQUFDO0lBQ0RDLElBQUksRUFBRS9DLE9BQU87SUFDYmdELElBQUksRUFBRSxVQUFVOUMsS0FBSyxFQUFFO01BQUUsT0FBTyxJQUFJO0lBQUM7RUFDdEMsQ0FBQyxDQUFDO0FBRUgsQ0FBQyxFQUFDK0MsTUFBTSxDQUFDM0UsRUFBRSxFQUFFNEUsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7QUNsTXBCOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDb0Q7O0FBRXBEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9saXN0aW5nLWRhdGEtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3MvbGlzdGluZy1kYXRhLWVkaXRvci5zY3NzPzM1ODAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9saXN0aW5nLWRhdGEtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50IH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEluc3BlY3RvckNvbnRyb2xzLCBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBOb3RpY2UsIFRvb2xiYXJHcm91cCwgVG9vbGJhckJ1dHRvbiwgUGxhY2Vob2xkZXIsIERpc2FibGVkLCBSYWRpb0NvbnRyb2wsIFBhbmVsQm9keSwgX19leHBlcmltZW50YWxJbnB1dENvbnRyb2w6IElucHV0Q29udHJvbCwgX19leHBlcmltZW50YWxTcGFjZXI6IFNwYWNlciB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxyZWN0IGZpbGw9XCJ1cmwoI3N2Z18xOSlcIiBoZWlnaHQ9XCIxMzZcIiBpZD1cInN2Z18xXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCIxMi4xNzQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMjEuNjI0OTlcIiBjeT1cIjI0LjJcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzJcIiByPVwiNS41MTE1M1wiIC8+XG5cdFx0PHJlY3QgZmlsbD1cInVybCgjc3ZnXzE5KVwiIGhlaWdodD1cIjEzNlwiIGlkPVwic3ZnXzEyXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCI5OS4wMjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTA4LjQ3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xM1wiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwidXJsKCNzdmdfMTkpXCIgaGVpZ2h0PVwiMTM2XCIgaWQ9XCJzdmdfMTVcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjc2XCIgeD1cIjE4NS44MjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTk1LjI3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xNlwiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8ZGVmcz5cblx0XHRcdDxsaW5lYXJHcmFkaWVudCBpZD1cInN2Z18xOVwiIHgxPVwiMC4wMDI2MlwiIHgyPVwiMVwiIHkxPVwiMFwiIHkyPVwiMVwiPlxuXHRcdFx0XHQ8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2U4ZThlOFwiIHN0b3BPcGFjaXR5PVwiMC45OTYwOVwiIC8+XG5cdFx0XHRcdDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZTBlMGUwXCIgc3RvcE9wYWNpdHk9XCIwLjk5NjA5XCIgLz5cblx0XHRcdDwvbGluZWFyR3JhZGllbnQ+XG5cdFx0PC9kZWZzPlxuXHQ8L3N2Zz47XG5cblx0Y2xhc3MgTGlzdGluZyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0ZWRpdE1vZGU6IHRydWUsXG5cdFx0XHRcdHRlcm1zOiB7XG5cdFx0XHRcdFx0c2VnbWVudDogW10sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlcm1zRmV0Y2hlZDogZmFsc2UsXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMubGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdHRoaXMuYmxvY2tSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblx0XHR9XG5cblx0XHRnZXRJbnNwZWN0b3JDb250cm9scygpIHtcblx0XHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcyB9ID0gdGhpcy5wcm9wcztcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEluc3BlY3RvckNvbnRyb2xzIGtleT0naW5zcGVjdG9yJz5cblx0XHRcdFx0XHQ8UGFuZWxCb2R5IHRpdGxlPXtfXygnU2V0dGluZ3MnLCAnbWVzc2lhJyl9ID5cblx0XHRcdFx0XHRcdDxSYWRpb0NvbnRyb2xcblx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTcGxpdCBjYXJkcyB0byBjb2x1bW5zIGluIGdyaWQgdmlldyBtb2RlIGJ5OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e2F0dHJpYnV0ZXMuY29sdW1uc31cblx0XHRcdFx0XHRcdFx0b3B0aW9ucz17W1xuXHRcdFx0XHRcdFx0XHRcdHsgbGFiZWw6IF9fKCdUd28nLCAnbWVzc2lhJyksIHZhbHVlOiAyIH0sXG5cdFx0XHRcdFx0XHRcdFx0eyBsYWJlbDogX18oJ1RocmVlJywgJ21lc3NpYScpLCB2YWx1ZTogMyB9LFxuXHRcdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNvbHVtbnM6IHBhcnNlSW50KHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDwvSW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGdldEJsb2NrQ29udHJvbHMoKSB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXt0aGlzLnN0YXRlLmVkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17dGhpcy5zdGF0ZS5lZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0XHRcdGVkaXRNb2RlOiAhdGhpcy5zdGF0ZS5lZGl0TW9kZSxcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRnZXRCbG9ja0VkaXQoKSB7XG5cblx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZSh0aGlzLnByb3BzLm5hbWUpO1xuXHRcdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e3RoaXMuYmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8cD57X18oJ1RoZSBibG9jayBjcmVhdGVzIHRoZSBtYWluIGNvbnRlbnQgb2YgdGhlIHNlYXJjaCBwYWdlIGFuZCBoYW5kbGVzIHNlYXJjaCBxdWVyaWVzLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdDxTcGFjZXI+XG5cdFx0XHRcdFx0XHRcdDxJbnB1dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0Jsb2NrIHRpdGxlOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRsYWJlbFBvc2l0aW9uPSd0b3AnXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuYmxvY2tUaXRsZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGJsb2NrVGl0bGU6IG5leHRWYWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9TcGFjZXI+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGdldEJsb2NrUHJldmlldygpIHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PERpc2FibGVkIGtleT1cImJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIHRhYkluZGV4PVwiMFwiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17dGhpcy5ibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnUHJldmlldyBpcyB0b28gY29tcGxleCBhbmQgdG9vIGJpZyB0byBzaG93IGhlcmUuIE9wZW4gdGhlIHBhZ2UgaW4gZnJvbnQgdG8gc2VlIHJlc3VsdHMuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZW5kZXIoKSB7XG5cdFx0XHRjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0XHRjb25zdCB7IGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcblx0XHRcdGNvbnN0IHsgaXNFeGFtcGxlIH0gPSBhdHRyaWJ1dGVzO1xuXG5cdFx0XHRpZiAoaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdHRoaXMuZ2V0SW5zcGVjdG9yQ29udHJvbHMoKSxcblx0XHRcdFx0XHR0aGlzLmdldEJsb2NrQ29udHJvbHMoKSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5lZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKHRoaXMuZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdHRoaXMubGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICghdGhpcy5sYXN0UHJldmlldykge1xuXHRcdFx0XHRcdHRoaXMubGFzdFByZXZpZXcgPSB0aGlzLmdldEJsb2NrUHJldmlldygpO1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKHRoaXMubGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKHRoaXMubGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1saXN0aW5nLWRhdGEnLCB7XG5cdFx0dGl0bGU6IF9fKCdMaXN0aW5nIGRhdGEnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdDcmVhdGVzIHRoZSBtYWluIGNvbnRlbnQgb2YgdGhlIHNlYXJjaCBwYWdlIGFuZCBoYW5kbGVzIHNlYXJjaCBxdWVyaWVzLicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsUnVsZT1cImV2ZW5vZGRcIiBjbGlwUnVsZT1cImV2ZW5vZGRcIj48cGF0aCBkPVwiTTEyIDE2YzEuNjU2IDAgMyAxLjM0NCAzIDNzLTEuMzQ0IDMtMyAzLTMtMS4zNDQtMy0zIDEuMzQ0LTMgMy0zem0wIDFjMS4xMDQgMCAyIC44OTYgMiAycy0uODk2IDItMiAyLTItLjg5Ni0yLTIgLjg5Ni0yIDItMnptMC04YzEuNjU2IDAgMyAxLjM0NCAzIDNzLTEuMzQ0IDMtMyAzLTMtMS4zNDQtMy0zIDEuMzQ0LTMgMy0zem0wIDFjMS4xMDQgMCAyIC44OTYgMiAycy0uODk2IDItMiAyLTItLjg5Ni0yLTIgLjg5Ni0yIDItMnptMC04YzEuNjU2IDAgMyAxLjM0NCAzIDNzLTEuMzQ0IDMtMyAzLTMtMS4zNDQtMy0zIDEuMzQ0LTMgMy0zem0wIDFjMS4xMDQgMCAyIC44OTYgMiAycy0uODk2IDItMiAyLTItLjg5Ni0yLTIgLjg5Ni0yIDItMnpcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnbGlzdGluZyddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0YmxvY2tUaXRsZToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHR9LFxuXHRcdFx0Y29sdW1uczoge1xuXHRcdFx0XHR0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdGRlZmF1bHQ6IDMsXG5cdFx0XHRcdGVudW06IFsyLCAzXSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IGZhbHNlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBMaXN0aW5nLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL2xpc3RpbmctZGF0YS1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvbGlzdGluZy1kYXRhLWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJlbGVtZW50Iiwic2VydmVyU2lkZVJlbmRlciIsIlNlcnZlclNpZGVSZW5kZXIiLCJJbnNwZWN0b3JDb250cm9scyIsIkJsb2NrQ29udHJvbHMiLCJibG9ja0VkaXRvciIsIk5vdGljZSIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiUmFkaW9Db250cm9sIiwiUGFuZWxCb2R5IiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJJbnB1dENvbnRyb2wiLCJfX2V4cGVyaW1lbnRhbFNwYWNlciIsIlNwYWNlciIsImNvbXBvbmVudHMiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwiTGlzdGluZyIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJzdGF0ZSIsImVkaXRNb2RlIiwidGVybXMiLCJzZWdtZW50IiwidGVybXNGZXRjaGVkIiwibGFzdFByZXZpZXciLCJibG9ja1JlZiIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiZ2V0SW5zcGVjdG9yQ29udHJvbHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNvbHVtbnMiLCJsYWJlbCIsInZhbHVlIiwicGFyc2VJbnQiLCJnZXRCbG9ja0NvbnRyb2xzIiwic2V0U3RhdGUiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsIm5hbWUiLCJ0aXRsZSIsImJsb2NrVGl0bGUiLCJuZXh0VmFsdWUiLCJnZXRCbG9ja1ByZXZpZXciLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwicHVzaCIsImpvaW4iLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZW51bSIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
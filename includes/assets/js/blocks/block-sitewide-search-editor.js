/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/sitewide-search-editor.jsx":
/*!**************************************************!*\
  !*** ./src/js/blocks/sitewide-search-editor.jsx ***!
  \**************************************************/
/***/ (function() {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function (wp, $) {
  var registerBlockType = wp.blocks.registerBlockType;
  var _wp$element = wp.element,
      Component = _wp$element.Component,
      Fragment = _wp$element.Fragment,
      useState = _wp$element.useState,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef;
  var ServerSideRender = wp.serverSideRender;
  var BlockControls = wp.blockEditor.BlockControls;
  var _wp$components = wp.components,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      Notice = _wp$components.Notice,
      InputControl = _wp$components.__experimentalInputControl;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m127.03842,33.42546c-20.95784,0 -37.99545,17.03761 -37.99545,37.99545c0,20.95784 17.03761,37.99545 37.99545,37.99545c8.29727,0 15.95619,-2.70197 22.21057,-7.2289l29.38711,29.38709l6.32092,-6.32092l-29.11645,-29.11647c5.71456,-6.65052 9.19329,-15.27632 9.19329,-24.71624c0,-20.95784 -17.03761,-37.99545 -37.99545,-37.99545zm0,4.47005c18.54205,0 33.5254,14.98335 33.5254,33.5254c0,18.54205 -14.98335,33.5254 -33.5254,33.5254c-18.54205,0 -33.5254,-14.98335 -33.5254,-33.5254c0,-18.54205 14.98335,-33.5254 33.5254,-33.5254zm-17.88021,29.05534a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005zm17.88021,0a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005zm17.88021,0a4.47005,4.47005 0 0 0 -4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,4.47005a4.47005,4.47005 0 0 0 4.47005,-4.47005a4.47005,4.47005 0 0 0 -4.47005,-4.47005z",
    fill: "black",
    id: "svg_1"
  }));
  var lastPreview = false;

  function SiteWideSearchFn(props) {
    var attributes = props.attributes,
        setAttributes = props.setAttributes,
        className = props.className,
        name = props.name;

    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        editMode = _useState2[0],
        setEditMode = _useState2[1];

    var getExample = function getExample() {
      return exampleImageData;
    };

    var getBlockControls = function getBlockControls() {
      return /*#__PURE__*/React.createElement(BlockControls, {
        key: "block"
      }, /*#__PURE__*/React.createElement(ToolbarGroup, {
        label: __('Options', 'messia')
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        label: editMode ? __('Preview', 'messia') : __('Edit', 'messia'),
        icon: editMode ? "visibility" : "edit",
        onClick: function onClick() {
          setEditMode(!editMode);
        }
      })));
    };

    var getBlockEdit = function getBlockEdit() {
      var block = wp.blocks.getBlockType(name);
      return /*#__PURE__*/React.createElement(Placeholder, {
        key: "messia-block-placeholder"
      }, /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block"
      }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputControl, {
        label: __('Title:', 'messia'),
        labelPosition: "top",
        value: attributes.title,
        onChange: function onChange(nextValue) {
          return setAttributes({
            title: nextValue
          });
        }
      }))));
    };

    var getBlockPreview = function getBlockPreview() {
      return /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block"
      }, /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement(ServerSideRender, {
        block: props.name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: wp.data.select("core/edit-widgets").getWidgetAreaForWidgetId(attributes.__internalWidgetId).id
        }
      })));
    };

    var render = function render() {
      if (attributes.isExample) {
        return getExample();
      } else {
        var classes = [className];
        var _render = [getBlockControls()];

        if (editMode) {
          _render.push(getBlockEdit());

          lastPreview = false;
        } else if (!lastPreview) {
          lastPreview = getBlockPreview();

          _render.push(lastPreview);
        } else {
          _render.push(lastPreview);
        }

        return /*#__PURE__*/React.createElement("div", {
          className: classes.join(' ')
        }, _render);
      }
    };

    return render();
  }

  registerBlockType('messia/block-sitewide-search', {
    title: __('Sitewide search', 'messia'),
    description: __('Search form that provides search accross hole site.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m2.19892,1.45842c-0.81653,0 -1.48101,0.66448 -1.48101,1.48101l0,14.81009c0,0.81653 0.66448,1.48101 1.48101,1.48101l9.51182,0c-0.22215,-0.30854 -0.41519,-0.63831 -0.57563,-0.98734l-8.93619,0c-0.27251,0 -0.49367,-0.22166 -0.49367,-0.49367l0,-12.34174l18.75945,0l0,5.96068c0.3742,0.3357 0.70842,0.71378 0.98734,1.1339l0,-9.56292c0,-0.81653 -0.66448,-1.48101 -1.48101,-1.48101l-17.77211,0zm0.49367,1.48101c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm1.48101,0c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm1.48101,0c0.27251,0 0.49367,0.22116 0.49367,0.49367c0,0.27251 -0.22116,0.49367 -0.49367,0.49367c-0.27251,0 -0.49367,-0.22116 -0.49367,-0.49367c0,-0.27251 0.22116,-0.49367 0.49367,-0.49367zm10.86073,7.89871c-2.72061,0 -4.9367,2.21608 -4.9367,4.9367c0,2.72061 2.21608,4.9367 4.9367,4.9367c1.18308,0 2.26959,-0.42012 3.12111,-1.11751l2.94755,2.94755l0.69808,-0.69808l-2.94755,-2.94755c0.69739,-0.85152 1.11751,-1.93803 1.11751,-3.12111c0,-2.72061 -2.21608,-4.9367 -4.9367,-4.9367zm0,0.98734c2.18702,0 3.94936,1.76234 3.94936,3.94936c0,2.18702 -1.76234,3.94936 -3.94936,3.94936c-2.18702,0 -3.94936,-1.76234 -3.94936,-3.94936c0,-2.18702 1.76234,-3.94936 3.94936,-3.94936z",
      fill: "black"
    }))),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      title: {
        type: 'string',
        default: ''
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
    edit: SiteWideSearchFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/sitewide-search-editor.scss":
/*!*****************************************************!*\
  !*** ./src/scss/blocks/sitewide-search-editor.scss ***!
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
  !*** ./src/entries/blocks/sitewide-search-editor.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_sitewide_search_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/sitewide-search-editor.scss */ "./src/scss/blocks/sitewide-search-editor.scss");
/* harmony import */ var _js_blocks_sitewide_search_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/sitewide-search-editor.jsx */ "./src/js/blocks/sitewide-search-editor.jsx");
/* harmony import */ var _js_blocks_sitewide_search_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_sitewide_search_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1zaXRld2lkZS1zZWFyY2gtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQVYsRUFBY0MsQ0FBZCxFQUFpQjtFQUVqQixJQUFRQyxpQkFBUixHQUE4QkYsRUFBRSxDQUFDRyxNQUFqQyxDQUFRRCxpQkFBUjtFQUNBLGtCQUE2REYsRUFBRSxDQUFDSSxPQUFoRTtFQUFBLElBQVFDLFNBQVIsZUFBUUEsU0FBUjtFQUFBLElBQW1CQyxRQUFuQixlQUFtQkEsUUFBbkI7RUFBQSxJQUE2QkMsUUFBN0IsZUFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGVBQXVDQSxTQUF2QztFQUFBLElBQWtEQyxNQUFsRCxlQUFrREEsTUFBbEQ7RUFDQSxJQUEwQkMsZ0JBQTFCLEdBQStDVixFQUEvQyxDQUFRVyxnQkFBUjtFQUNBLElBQVFDLGFBQVIsR0FBMEJaLEVBQUUsQ0FBQ2EsV0FBN0IsQ0FBUUQsYUFBUjtFQUNBLHFCQUFpSFosRUFBRSxDQUFDYyxVQUFwSDtFQUFBLElBQVFDLFlBQVIsa0JBQVFBLFlBQVI7RUFBQSxJQUFzQkMsYUFBdEIsa0JBQXNCQSxhQUF0QjtFQUFBLElBQXFDQyxXQUFyQyxrQkFBcUNBLFdBQXJDO0VBQUEsSUFBa0RDLFFBQWxELGtCQUFrREEsUUFBbEQ7RUFBQSxJQUE0REMsTUFBNUQsa0JBQTREQSxNQUE1RDtFQUFBLElBQWdHQyxZQUFoRyxrQkFBb0VDLDBCQUFwRTtFQUNBLElBQVFDLEVBQVIsR0FBZXRCLEVBQUUsQ0FBQ3VCLElBQWxCLENBQVFELEVBQVI7RUFDQSxJQUFNRSxnQkFBZ0IsZ0JBQUc7SUFBSyxPQUFPLEVBQUMsYUFBYjtJQUEyQixLQUFLLEVBQUM7RUFBakMsZ0JBQ3hCO0lBQU0sQ0FBQyxFQUFDLHlnQ0FBUjtJQUFraEMsSUFBSSxFQUFDLE9BQXZoQztJQUEraEMsRUFBRSxFQUFDO0VBQWxpQyxFQUR3QixDQUF6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O1FBRU5DLE9BQU8sRUFBRTtNQUZIO0lBTEksQ0FScUM7SUFrQmpEQyxPQUFPLEVBQUU7TUFDUmpDLFVBQVUsRUFBRTtRQUNYcUIsU0FBUyxFQUFFO01BREE7SUFESixDQWxCd0M7SUF1QmpEYSxRQUFRLEVBQUU7TUFDVEMsUUFBUSxFQUFFO0lBREQsQ0F2QnVDO0lBMkJqREMsSUFBSSxFQUFFdEMsZ0JBM0IyQztJQTRCakR1QyxJQUFJLEVBQUUsY0FBVXRDLEtBQVYsRUFBaUI7TUFBRSxPQUFPLElBQVA7SUFBYTtFQTVCVyxDQUFqQyxDQUFqQjtBQStCQSxDQS9JQSxFQStJQ3VDLE1BQU0sQ0FBQ2xFLEVBL0lSLEVBK0lZbUUsTUEvSVosQ0FBRDs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN1RDs7QUFFdkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL3NpdGV3aWRlLXNlYXJjaC1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy9zaXRld2lkZS1zZWFyY2gtZWRpdG9yLnNjc3M/MTI1ZSIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL3NpdGV3aWRlLXNlYXJjaC1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIE5vdGljZSwgX19leHBlcmltZW50YWxJbnB1dENvbnRyb2w6IElucHV0Q29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxwYXRoIGQ9XCJtMTI3LjAzODQyLDMzLjQyNTQ2Yy0yMC45NTc4NCwwIC0zNy45OTU0NSwxNy4wMzc2MSAtMzcuOTk1NDUsMzcuOTk1NDVjMCwyMC45NTc4NCAxNy4wMzc2MSwzNy45OTU0NSAzNy45OTU0NSwzNy45OTU0NWM4LjI5NzI3LDAgMTUuOTU2MTksLTIuNzAxOTcgMjIuMjEwNTcsLTcuMjI4OWwyOS4zODcxMSwyOS4zODcwOWw2LjMyMDkyLC02LjMyMDkybC0yOS4xMTY0NSwtMjkuMTE2NDdjNS43MTQ1NiwtNi42NTA1MiA5LjE5MzI5LC0xNS4yNzYzMiA5LjE5MzI5LC0yNC43MTYyNGMwLC0yMC45NTc4NCAtMTcuMDM3NjEsLTM3Ljk5NTQ1IC0zNy45OTU0NSwtMzcuOTk1NDV6bTAsNC40NzAwNWMxOC41NDIwNSwwIDMzLjUyNTQsMTQuOTgzMzUgMzMuNTI1NCwzMy41MjU0YzAsMTguNTQyMDUgLTE0Ljk4MzM1LDMzLjUyNTQgLTMzLjUyNTQsMzMuNTI1NGMtMTguNTQyMDUsMCAtMzMuNTI1NCwtMTQuOTgzMzUgLTMzLjUyNTQsLTMzLjUyNTRjMCwtMTguNTQyMDUgMTQuOTgzMzUsLTMzLjUyNTQgMzMuNTI1NCwtMzMuNTI1NHptLTE3Ljg4MDIxLDI5LjA1NTM0YTQuNDcwMDUsNC40NzAwNSAwIDAgMCAtNC40NzAwNSw0LjQ3MDA1YTQuNDcwMDUsNC40NzAwNSAwIDAgMCA0LjQ3MDA1LDQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIDQuNDcwMDUsLTQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIC00LjQ3MDA1LC00LjQ3MDA1em0xNy44ODAyMSwwYTQuNDcwMDUsNC40NzAwNSAwIDAgMCAtNC40NzAwNSw0LjQ3MDA1YTQuNDcwMDUsNC40NzAwNSAwIDAgMCA0LjQ3MDA1LDQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIDQuNDcwMDUsLTQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIC00LjQ3MDA1LC00LjQ3MDA1em0xNy44ODAyMSwwYTQuNDcwMDUsNC40NzAwNSAwIDAgMCAtNC40NzAwNSw0LjQ3MDA1YTQuNDcwMDUsNC40NzAwNSAwIDAgMCA0LjQ3MDA1LDQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIDQuNDcwMDUsLTQuNDcwMDVhNC40NzAwNSw0LjQ3MDA1IDAgMCAwIC00LjQ3MDA1LC00LjQ3MDA1elwiIGZpbGw9XCJibGFja1wiIGlkPVwic3ZnXzFcIiAvPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gU2l0ZVdpZGVTZWFyY2hGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0PElucHV0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsUG9zaXRpb249J3RvcCdcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy50aXRsZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyB0aXRsZTogbmV4dFZhbHVlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7XG5cdFx0XHRcdFx0XHRcdFx0aXNQcmV2aWV3OiB3cC5kYXRhLnNlbGVjdChcImNvcmUvZWRpdC13aWRnZXRzXCIpLmdldFdpZGdldEFyZWFGb3JXaWRnZXRJZChhdHRyaWJ1dGVzLl9faW50ZXJuYWxXaWRnZXRJZCkuaWQsXG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEJsb2NrQ29udHJvbHMoKSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRpZiAoZWRpdE1vZGUpIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChnZXRCbG9ja0VkaXQoKSk7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICghbGFzdFByZXZpZXcpIHtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGdldEJsb2NrUHJldmlldygpO1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT57cmVuZGVyfTwvZGl2Pjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLXNpdGV3aWRlLXNlYXJjaCcsIHtcblx0XHR0aXRsZTogX18oJ1NpdGV3aWRlIHNlYXJjaCcsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ1NlYXJjaCBmb3JtIHRoYXQgcHJvdmlkZXMgc2VhcmNoIGFjY3Jvc3MgaG9sZSBzaXRlLicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Zz48cGF0aCBkPVwibTIuMTk4OTIsMS40NTg0MmMtMC44MTY1MywwIC0xLjQ4MTAxLDAuNjY0NDggLTEuNDgxMDEsMS40ODEwMWwwLDE0LjgxMDA5YzAsMC44MTY1MyAwLjY2NDQ4LDEuNDgxMDEgMS40ODEwMSwxLjQ4MTAxbDkuNTExODIsMGMtMC4yMjIxNSwtMC4zMDg1NCAtMC40MTUxOSwtMC42MzgzMSAtMC41NzU2MywtMC45ODczNGwtOC45MzYxOSwwYy0wLjI3MjUxLDAgLTAuNDkzNjcsLTAuMjIxNjYgLTAuNDkzNjcsLTAuNDkzNjdsMCwtMTIuMzQxNzRsMTguNzU5NDUsMGwwLDUuOTYwNjhjMC4zNzQyLDAuMzM1NyAwLjcwODQyLDAuNzEzNzggMC45ODczNCwxLjEzMzlsMCwtOS41NjI5MmMwLC0wLjgxNjUzIC0wLjY2NDQ4LC0xLjQ4MTAxIC0xLjQ4MTAxLC0xLjQ4MTAxbC0xNy43NzIxMSwwem0wLjQ5MzY3LDEuNDgxMDFjMC4yNzI1MSwwIDAuNDkzNjcsMC4yMjExNiAwLjQ5MzY3LDAuNDkzNjdjMCwwLjI3MjUxIC0wLjIyMTE2LDAuNDkzNjcgLTAuNDkzNjcsMC40OTM2N2MtMC4yNzI1MSwwIC0wLjQ5MzY3LC0wLjIyMTE2IC0wLjQ5MzY3LC0wLjQ5MzY3YzAsLTAuMjcyNTEgMC4yMjExNiwtMC40OTM2NyAwLjQ5MzY3LC0wLjQ5MzY3em0xLjQ4MTAxLDBjMC4yNzI1MSwwIDAuNDkzNjcsMC4yMjExNiAwLjQ5MzY3LDAuNDkzNjdjMCwwLjI3MjUxIC0wLjIyMTE2LDAuNDkzNjcgLTAuNDkzNjcsMC40OTM2N2MtMC4yNzI1MSwwIC0wLjQ5MzY3LC0wLjIyMTE2IC0wLjQ5MzY3LC0wLjQ5MzY3YzAsLTAuMjcyNTEgMC4yMjExNiwtMC40OTM2NyAwLjQ5MzY3LC0wLjQ5MzY3em0xLjQ4MTAxLDBjMC4yNzI1MSwwIDAuNDkzNjcsMC4yMjExNiAwLjQ5MzY3LDAuNDkzNjdjMCwwLjI3MjUxIC0wLjIyMTE2LDAuNDkzNjcgLTAuNDkzNjcsMC40OTM2N2MtMC4yNzI1MSwwIC0wLjQ5MzY3LC0wLjIyMTE2IC0wLjQ5MzY3LC0wLjQ5MzY3YzAsLTAuMjcyNTEgMC4yMjExNiwtMC40OTM2NyAwLjQ5MzY3LC0wLjQ5MzY3em0xMC44NjA3Myw3Ljg5ODcxYy0yLjcyMDYxLDAgLTQuOTM2NywyLjIxNjA4IC00LjkzNjcsNC45MzY3YzAsMi43MjA2MSAyLjIxNjA4LDQuOTM2NyA0LjkzNjcsNC45MzY3YzEuMTgzMDgsMCAyLjI2OTU5LC0wLjQyMDEyIDMuMTIxMTEsLTEuMTE3NTFsMi45NDc1NSwyLjk0NzU1bDAuNjk4MDgsLTAuNjk4MDhsLTIuOTQ3NTUsLTIuOTQ3NTVjMC42OTczOSwtMC44NTE1MiAxLjExNzUxLC0xLjkzODAzIDEuMTE3NTEsLTMuMTIxMTFjMCwtMi43MjA2MSAtMi4yMTYwOCwtNC45MzY3IC00LjkzNjcsLTQuOTM2N3ptMCwwLjk4NzM0YzIuMTg3MDIsMCAzLjk0OTM2LDEuNzYyMzQgMy45NDkzNiwzLjk0OTM2YzAsMi4xODcwMiAtMS43NjIzNCwzLjk0OTM2IC0zLjk0OTM2LDMuOTQ5MzZjLTIuMTg3MDIsMCAtMy45NDkzNiwtMS43NjIzNCAtMy45NDkzNiwtMy45NDkzNmMwLC0yLjE4NzAyIDEuNzYyMzQsLTMuOTQ5MzYgMy45NDkzNiwtMy45NDkzNnpcIiBmaWxsPVwiYmxhY2tcIiAvPjwvZz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ29iamVjdCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogU2l0ZVdpZGVTZWFyY2hGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy9zaXRld2lkZS1zZWFyY2gtZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL3NpdGV3aWRlLXNlYXJjaC1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsIkJsb2NrQ29udHJvbHMiLCJibG9ja0VkaXRvciIsImNvbXBvbmVudHMiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIk5vdGljZSIsIklucHV0Q29udHJvbCIsIl9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiU2l0ZVdpZGVTZWFyY2hGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsImdldEV4YW1wbGUiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0aXRsZSIsIm5leHRWYWx1ZSIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsImRhdGEiLCJzZWxlY3QiLCJnZXRXaWRnZXRBcmVhRm9yV2lkZ2V0SWQiLCJfX2ludGVybmFsV2lkZ2V0SWQiLCJpZCIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwidHlwZSIsImRlZmF1bHQiLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/post-content-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/post-content-editor.jsx ***!
  \***********************************************/
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
  }, /*#__PURE__*/React.createElement("text", {
    fill: "#666666",
    fontFamily: "serif",
    fontSize: "84",
    id: "svg_1",
    stroke: "#666666",
    strokeWidth: "0",
    textAnchor: "middle",
    x: "57.87239",
    y: "81.27083"
  }, "T"), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_2",
    stroke: "#666666",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "107.45704",
    x2: "241.79557",
    y1: "28.53125",
    y2: "28.53125"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_6",
    stroke: "#666666",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "36.45704",
    x2: "241.79557",
    y1: "103.53125",
    y2: "103.53125"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_11",
    stroke: "#666666",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "107.45704",
    x2: "241.79557",
    y1: "66.06511",
    y2: "66.06511"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_12",
    stroke: "#666666",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "36.45704",
    x2: "241.79557",
    y1: "140.0651",
    y2: "140.0651"
  }));
  var lastPreview = false;

  function PostContentFn(props) {
    var _this = this;

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
      }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('Notes: Block will display the content of the current post.', 'messia')))));
    };

    var getBlockPreview = function getBlockPreview() {
      return /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        tabIndex: "0",
        key: "messia-block",
        ref: _this.blockRef
      }, /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('Preview is impossible from admin side.', 'messia')))));
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

  registerBlockType('messia/block-post-content', {
    title: __('Post content', 'messia'),
    description: __('Outputs the content of the currently viewed post/page/object.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m2.93333,0.41481l0,23.17037l18.13333,0l0,-16.82685l-0.14167,-0.15741l-6.04444,-6.04444l-0.15741,-0.14167l-11.78982,0zm1.00741,1.00741l10.07407,0l0,4.02963l-7.05185,0l0,1.00741l7.05185,0l0,1.00741l6.04444,0l0,15.11111l-16.11852,0l0,-21.15556zm11.08148,0.72407l4.31296,4.31296l-4.31296,0l0,-4.31296zm-8.05926,8.34259l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0zm-3.52593,3.02222l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0zm-3.52593,3.02222l0,1.00741l1.51111,0l0,-1.00741l-1.51111,0zm3.52593,0l0,1.00741l6.54815,0l0,-1.00741l-6.54815,0z",
      fill: "black"
    })),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
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
    edit: PostContentFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/post-content-editor.scss":
/*!**************************************************!*\
  !*** ./src/scss/blocks/post-content-editor.scss ***!
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
  !*** ./src/entries/blocks/post-content-editor.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_post_content_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/post-content-editor.scss */ "./src/scss/blocks/post-content-editor.scss");
/* harmony import */ var _js_blocks_post_content_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/post-content-editor.jsx */ "./src/js/blocks/post-content-editor.jsx");
/* harmony import */ var _js_blocks_post_content_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_post_content_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1wb3N0LWNvbnRlbnQtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQVYsRUFBY0MsQ0FBZCxFQUFpQjtFQUVqQixJQUFRQyxpQkFBUixHQUE4QkYsRUFBRSxDQUFDRyxNQUFqQyxDQUFRRCxpQkFBUjtFQUNBLGtCQUE2REYsRUFBRSxDQUFDSSxPQUFoRTtFQUFBLElBQVFDLFNBQVIsZUFBUUEsU0FBUjtFQUFBLElBQW1CQyxRQUFuQixlQUFtQkEsUUFBbkI7RUFBQSxJQUE2QkMsUUFBN0IsZUFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGVBQXVDQSxTQUF2QztFQUFBLElBQWtEQyxNQUFsRCxlQUFrREEsTUFBbEQ7RUFDQSxJQUEwQkMsZ0JBQTFCLEdBQStDVixFQUEvQyxDQUFRVyxnQkFBUjtFQUNBLElBQVFDLGFBQVIsR0FBMEJaLEVBQUUsQ0FBQ2EsV0FBN0IsQ0FBUUQsYUFBUjtFQUNBLHFCQUFpSFosRUFBRSxDQUFDYyxVQUFwSDtFQUFBLElBQVFDLFlBQVIsa0JBQVFBLFlBQVI7RUFBQSxJQUFzQkMsYUFBdEIsa0JBQXNCQSxhQUF0QjtFQUFBLElBQXFDQyxXQUFyQyxrQkFBcUNBLFdBQXJDO0VBQUEsSUFBa0RDLFFBQWxELGtCQUFrREEsUUFBbEQ7RUFBQSxJQUE0REMsTUFBNUQsa0JBQTREQSxNQUE1RDtFQUFBLElBQWdHQyxZQUFoRyxrQkFBb0VDLDBCQUFwRTtFQUNBLElBQVFDLEVBQVIsR0FBZXRCLEVBQUUsQ0FBQ3VCLElBQWxCLENBQVFELEVBQVI7RUFDQSxJQUFNRSxnQkFBZ0IsZ0JBQUc7SUFBSyxPQUFPLEVBQUMsYUFBYjtJQUEyQixLQUFLLEVBQUM7RUFBakMsZ0JBQ3hCO0lBQU0sSUFBSSxFQUFDLFNBQVg7SUFBcUIsVUFBVSxFQUFDLE9BQWhDO0lBQXdDLFFBQVEsRUFBQyxJQUFqRDtJQUFzRCxFQUFFLEVBQUMsT0FB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Q2lDLElBQUksRUFBRSxjQUFVaEMsS0FBVixFQUFpQjtNQUFFLE9BQU8sSUFBUDtJQUFhO0VBeEJRLENBQTlCLENBQWpCO0FBMkJBLENBeElBLEVBd0lDaUMsTUFBTSxDQUFDNUQsRUF4SVIsRUF3SVk2RCxNQXhJWixDQUFEOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ29EOztBQUVwRCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3MvcG9zdC1jb250ZW50LWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL3Bvc3QtY29udGVudC1lZGl0b3Iuc2Nzcz9kMGQxIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9ibG9ja3MvcG9zdC1jb250ZW50LWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgTm90aWNlLCBfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbDogSW5wdXRDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PHRleHQgZmlsbD1cIiM2NjY2NjZcIiBmb250RmFtaWx5PVwic2VyaWZcIiBmb250U2l6ZT1cIjg0XCIgaWQ9XCJzdmdfMVwiIHN0cm9rZT1cIiM2NjY2NjZcIiBzdHJva2VXaWR0aD1cIjBcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCIgeD1cIjU3Ljg3MjM5XCIgeT1cIjgxLjI3MDgzXCI+VDwvdGV4dD5cblx0XHQ8bGluZSBmaWxsPVwibm9uZVwiIGlkPVwic3ZnXzJcIiBzdHJva2U9XCIjNjY2NjY2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCI1XCIgeDE9XCIxMDcuNDU3MDRcIiB4Mj1cIjI0MS43OTU1N1wiIHkxPVwiMjguNTMxMjVcIiB5Mj1cIjI4LjUzMTI1XCIgLz5cblx0XHQ8bGluZSBmaWxsPVwibm9uZVwiIGlkPVwic3ZnXzZcIiBzdHJva2U9XCIjNjY2NjY2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCI1XCIgeDE9XCIzNi40NTcwNFwiIHgyPVwiMjQxLjc5NTU3XCIgeTE9XCIxMDMuNTMxMjVcIiB5Mj1cIjEwMy41MzEyNVwiIC8+XG5cdFx0PGxpbmUgZmlsbD1cIm5vbmVcIiBpZD1cInN2Z18xMVwiIHN0cm9rZT1cIiM2NjY2NjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjVcIiB4MT1cIjEwNy40NTcwNFwiIHgyPVwiMjQxLjc5NTU3XCIgeTE9XCI2Ni4wNjUxMVwiIHkyPVwiNjYuMDY1MTFcIiAvPlxuXHRcdDxsaW5lIGZpbGw9XCJub25lXCIgaWQ9XCJzdmdfMTJcIiBzdHJva2U9XCIjNjY2NjY2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCI1XCIgeDE9XCIzNi40NTcwNFwiIHgyPVwiMjQxLjc5NTU3XCIgeTE9XCIxNDAuMDY1MVwiIHkyPVwiMTQwLjA2NTFcIiAvPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gUG9zdENvbnRlbnRGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8cD57X18oJ05vdGVzOiBCbG9jayB3aWxsIGRpc3BsYXkgdGhlIGNvbnRlbnQgb2YgdGhlIGN1cnJlbnQgcG9zdC4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PERpc2FibGVkIGtleT1cImJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIHRhYkluZGV4PVwiMFwiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17dGhpcy5ibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnUHJldmlldyBpcyBpbXBvc3NpYmxlIGZyb20gYWRtaW4gc2lkZS4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZW5kZXIoKTtcblx0fVxuXG5cdHJlZ2lzdGVyQmxvY2tUeXBlKCdtZXNzaWEvYmxvY2stcG9zdC1jb250ZW50Jywge1xuXHRcdHRpdGxlOiBfXygnUG9zdCBjb250ZW50JywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnT3V0cHV0cyB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudGx5IHZpZXdlZCBwb3N0L3BhZ2Uvb2JqZWN0LicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwibTIuOTMzMzMsMC40MTQ4MWwwLDIzLjE3MDM3bDE4LjEzMzMzLDBsMCwtMTYuODI2ODVsLTAuMTQxNjcsLTAuMTU3NDFsLTYuMDQ0NDQsLTYuMDQ0NDRsLTAuMTU3NDEsLTAuMTQxNjdsLTExLjc4OTgyLDB6bTEuMDA3NDEsMS4wMDc0MWwxMC4wNzQwNywwbDAsNC4wMjk2M2wtNy4wNTE4NSwwbDAsMS4wMDc0MWw3LjA1MTg1LDBsMCwxLjAwNzQxbDYuMDQ0NDQsMGwwLDE1LjExMTExbC0xNi4xMTg1MiwwbDAsLTIxLjE1NTU2em0xMS4wODE0OCwwLjcyNDA3bDQuMzEyOTYsNC4zMTI5NmwtNC4zMTI5NiwwbDAsLTQuMzEyOTZ6bS04LjA1OTI2LDguMzQyNTlsMCwxLjAwNzQxbDEuNTExMTEsMGwwLC0xLjAwNzQxbC0xLjUxMTExLDB6bTMuNTI1OTMsMGwwLDEuMDA3NDFsNi41NDgxNSwwbDAsLTEuMDA3NDFsLTYuNTQ4MTUsMHptLTMuNTI1OTMsMy4wMjIyMmwwLDEuMDA3NDFsMS41MTExMSwwbDAsLTEuMDA3NDFsLTEuNTExMTEsMHptMy41MjU5MywwbDAsMS4wMDc0MWw2LjU0ODE1LDBsMCwtMS4wMDc0MWwtNi41NDgxNSwwem0tMy41MjU5MywzLjAyMjIybDAsMS4wMDc0MWwxLjUxMTExLDBsMCwtMS4wMDc0MWwtMS41MTExMSwwem0zLjUyNTkzLDBsMCwxLjAwNzQxbDYuNTQ4MTUsMGwwLC0xLjAwNzQxbC02LjU0ODE1LDB6XCIgZmlsbD1cImJsYWNrXCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ29iamVjdCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBQb3N0Q29udGVudEZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3Bvc3QtY29udGVudC1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvcG9zdC1jb250ZW50LWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJlbGVtZW50IiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNlcnZlclNpZGVSZW5kZXIiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiY29tcG9uZW50cyIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiTm90aWNlIiwiSW5wdXRDb250cm9sIiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwibGFzdFByZXZpZXciLCJQb3N0Q29udGVudEZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwiZ2V0QmxvY2tQcmV2aWV3IiwiYmxvY2tSZWYiLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwicHVzaCIsImpvaW4iLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/object-properties-editor.jsx":
/*!****************************************************!*\
  !*** ./src/js/blocks/object-properties-editor.jsx ***!
  \****************************************************/
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
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "28",
    id: "svg_2",
    rx: "2",
    ry: "2",
    width: "28",
    x: "29.375",
    y: "20.32813"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "10.5",
    id: "svg_3",
    rx: "4",
    ry: "4",
    width: "175.5",
    x: "68.625",
    y: "29.07813"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "20",
    id: "svg_4",
    rx: "2",
    ry: "2",
    width: "20",
    x: "70.5",
    y: "62.67188"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "10.5",
    id: "svg_5",
    rx: "4",
    ry: "4",
    width: "139",
    x: "105.625",
    y: "67.42188"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "20",
    id: "svg_6",
    rx: "2",
    ry: "2",
    width: "20",
    x: "70.5",
    y: "93.17188"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "10.5",
    id: "svg_7",
    rx: "4",
    ry: "4",
    width: "139",
    x: "105.625",
    y: "97.92188"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "20",
    id: "svg_8",
    rx: "2",
    ry: "2",
    width: "20",
    x: "70.5",
    y: "124.67188"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "10.5",
    id: "svg_9",
    rx: "4",
    ry: "4",
    width: "139",
    x: "105.625",
    y: "129.42188"
  })));
  var lastPreview = false;

  function ObjectPropertiesFn(props) {
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
      }, /*#__PURE__*/React.createElement("p", null, __('Notes: Block works only at valid object page.', 'messia'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputControl, {
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
          isPreview: true
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

  registerBlockType('messia/block-object-properties', {
    title: __('Object Properties', 'messia'),
    description: __('The list of properties that object belongs to.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", {
      transform: "rotate(45 12.0001 12)"
    }, /*#__PURE__*/React.createElement("rect", {
      fill: "black",
      height: "6.58042",
      rx: "1",
      ry: "1",
      width: "6.58042",
      x: "3.93162",
      y: "3.93631"
    }), /*#__PURE__*/React.createElement("rect", {
      fill: "black",
      height: "6.58042",
      rx: "1",
      ry: "1",
      width: "6.58042",
      x: "13.488",
      y: "13.48335"
    }), /*#__PURE__*/React.createElement("rect", {
      fill: "black",
      height: "6.58042",
      id: "svg_16",
      rx: "1",
      ry: "1",
      width: "6.58042",
      x: "13.35202",
      y: "3.94675"
    }), /*#__PURE__*/React.createElement("rect", {
      fill: "black",
      height: "6.58042",
      rx: "1",
      ry: "1",
      width: "6.58042",
      x: "3.99645",
      y: "13.45616"
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
    edit: ObjectPropertiesFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/object-properties-editor.scss":
/*!*******************************************************!*\
  !*** ./src/scss/blocks/object-properties-editor.scss ***!
  \*******************************************************/
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
/*!********************************************************!*\
  !*** ./src/entries/blocks/object-properties-editor.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_object_properties_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/object-properties-editor.scss */ "./src/scss/blocks/object-properties-editor.scss");
/* harmony import */ var _js_blocks_object_properties_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/object-properties-editor.jsx */ "./src/js/blocks/object-properties-editor.jsx");
/* harmony import */ var _js_blocks_object_properties_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_object_properties_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3QtcHJvcGVydGllcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBVixFQUFjQyxDQUFkLEVBQWlCO0VBRWpCLElBQVFDLGlCQUFSLEdBQThCRixFQUFFLENBQUNHLE1BQWpDLENBQVFELGlCQUFSO0VBQ0Esa0JBQTZERixFQUFFLENBQUNJLE9BQWhFO0VBQUEsSUFBUUMsU0FBUixlQUFRQSxTQUFSO0VBQUEsSUFBbUJDLFFBQW5CLGVBQW1CQSxRQUFuQjtFQUFBLElBQTZCQyxRQUE3QixlQUE2QkEsUUFBN0I7RUFBQSxJQUF1Q0MsU0FBdkMsZUFBdUNBLFNBQXZDO0VBQUEsSUFBa0RDLE1BQWxELGVBQWtEQSxNQUFsRDtFQUNBLElBQTBCQyxnQkFBMUIsR0FBK0NWLEVBQS9DLENBQVFXLGdCQUFSO0VBQ0EsSUFBUUMsYUFBUixHQUEwQlosRUFBRSxDQUFDYSxXQUE3QixDQUFRRCxhQUFSO0VBQ0EscUJBQWlIWixFQUFFLENBQUNjLFVBQXBIO0VBQUEsSUFBUUMsWUFBUixrQkFBUUEsWUFBUjtFQUFBLElBQXNCQyxhQUF0QixrQkFBc0JBLGFBQXRCO0VBQUEsSUFBcUNDLFdBQXJDLGtCQUFxQ0EsV0FBckM7RUFBQSxJQUFrREMsUUFBbEQsa0JBQWtEQSxRQUFsRDtFQUFBLElBQTREQyxNQUE1RCxrQkFBNERBLE1BQTVEO0VBQUEsSUFBZ0dDLFlBQWhHLGtCQUFvRUMsMEJBQXBFO0VBQ0EsSUFBUUMsRUFBUixHQUFldEIsRUFBRSxDQUFDdUIsSUFBbEIsQ0FBUUQsRUFBUjtFQUNBLElBQU1FLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxhQUFiO0lBQTJCLEtBQUssRUFBQztFQUFqQyxnQkFDeEIsNENBQ0M7SUFBTSxJQUFJLEVBQUMsU0FBWDtJQUFxQixNQUFNLEVBQUMsSUFBNUI7SUFBaUMsRUFBRSxFQUFDLE9BQXBDO0lBQTRDLEVB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QWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3lEOztBQUV6RCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3Mvb2JqZWN0LXByb3BlcnRpZXMtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3Mvb2JqZWN0LXByb3BlcnRpZXMtZWRpdG9yLnNjc3M/NzIxMSIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL29iamVjdC1wcm9wZXJ0aWVzLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgTm90aWNlLCBfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbDogSW5wdXRDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PGc+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiIzdmN2Y3ZlwiIGhlaWdodD1cIjI4XCIgaWQ9XCJzdmdfMlwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjhcIiB4PVwiMjkuMzc1XCIgeT1cIjIwLjMyODEzXCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiM3ZjdmN2ZcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfM1wiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTc1LjVcIiB4PVwiNjguNjI1XCIgeT1cIjI5LjA3ODEzXCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIyMFwiIGlkPVwic3ZnXzRcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjIwXCIgeD1cIjcwLjVcIiB5PVwiNjIuNjcxODhcIi8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjEwLjVcIiBpZD1cInN2Z181XCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCIxMzlcIiB4PVwiMTA1LjYyNVwiIHk9XCI2Ny40MjE4OFwiLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMjBcIiBpZD1cInN2Z182XCIgcng9XCIyXCIgcnk9XCIyXCIgd2lkdGg9XCIyMFwiIHg9XCI3MC41XCIgeT1cIjkzLjE3MTg4XCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfN1wiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiOTcuOTIxODhcIi8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjIwXCIgaWQ9XCJzdmdfOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjBcIiB4PVwiNzAuNVwiIHk9XCIxMjQuNjcxODhcIi8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjEwLjVcIiBpZD1cInN2Z185XCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCIxMzlcIiB4PVwiMTA1LjYyNVwiIHk9XCIxMjkuNDIxODhcIi8+XG5cdFx0PC9nPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gT2JqZWN0UHJvcGVydGllc0ZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0NvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QmxvY2tDb250cm9scyBrZXk9XCJibG9ja1wiPlxuXHRcdFx0XHRcdDxUb29sYmFyR3JvdXBcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3B0aW9ucycsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHQ8VG9vbGJhckJ1dHRvblxuXHRcdFx0XHRcdFx0XHRsYWJlbD17ZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXtlZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRFZGl0TW9kZSghZWRpdE1vZGUpO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0VkaXQgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCI+XG5cdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnTm90ZXM6IEJsb2NrIHdvcmtzIG9ubHkgYXQgdmFsaWQgb2JqZWN0IHBhZ2UuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0PElucHV0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsUG9zaXRpb249J3RvcCdcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy50aXRsZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyB0aXRsZTogbmV4dFZhbHVlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1vYmplY3QtcHJvcGVydGllcycsIHtcblx0XHR0aXRsZTogX18oJ09iamVjdCBQcm9wZXJ0aWVzJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnVGhlIGxpc3Qgb2YgcHJvcGVydGllcyB0aGF0IG9iamVjdCBiZWxvbmdzIHRvLicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoNDUgMTIuMDAwMSAxMilcIj48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjMuOTMxNjJcIiB5PVwiMy45MzYzMVwiIC8+PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiNi41ODA0MlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIxMy40ODhcIiB5PVwiMTMuNDgzMzVcIiAvPjxyZWN0IGZpbGw9XCJibGFja1wiIGhlaWdodD1cIjYuNTgwNDJcIiBpZD1cInN2Z18xNlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIxMy4zNTIwMlwiIHk9XCIzLjk0Njc1XCIgLz48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjMuOTk2NDVcIiB5PVwiMTMuNDU2MTZcIiAvPjwvZz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ29iamVjdCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogT2JqZWN0UHJvcGVydGllc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL29iamVjdC1wcm9wZXJ0aWVzLWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9vYmplY3QtcHJvcGVydGllcy1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsIkJsb2NrQ29udHJvbHMiLCJibG9ja0VkaXRvciIsImNvbXBvbmVudHMiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIk5vdGljZSIsIklucHV0Q29udHJvbCIsIl9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiT2JqZWN0UHJvcGVydGllc0ZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwibmV4dFZhbHVlIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJ0eXBlIiwiZGVmYXVsdCIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
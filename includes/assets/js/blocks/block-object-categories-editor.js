/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/object-categories-editor.jsx":
/*!****************************************************!*\
  !*** ./src/js/blocks/object-categories-editor.jsx ***!
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

  function ObjectCategoriesFn(props) {
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

  registerBlockType('messia/block-object-categories', {
    title: __('Object Categories', 'messia'),
    description: __('The list of categories that object belongs to.', 'messia'),
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
    edit: ObjectCategoriesFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/object-categories-editor.scss":
/*!*******************************************************!*\
  !*** ./src/scss/blocks/object-categories-editor.scss ***!
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
  !*** ./src/entries/blocks/object-categories-editor.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_object_categories_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/object-categories-editor.scss */ "./src/scss/blocks/object-categories-editor.scss");
/* harmony import */ var _js_blocks_object_categories_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/object-categories-editor.jsx */ "./src/js/blocks/object-categories-editor.jsx");
/* harmony import */ var _js_blocks_object_categories_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_object_categories_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3QtY2F0ZWdvcmllcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBVixFQUFjQyxDQUFkLEVBQWlCO0VBRWpCLElBQVFDLGlCQUFSLEdBQThCRixFQUFFLENBQUNHLE1BQWpDLENBQVFELGlCQUFSO0VBQ0Esa0JBQTZERixFQUFFLENBQUNJLE9BQWhFO0VBQUEsSUFBUUMsU0FBUixlQUFRQSxTQUFSO0VBQUEsSUFBbUJDLFFBQW5CLGVBQW1CQSxRQUFuQjtFQUFBLElBQTZCQyxRQUE3QixlQUE2QkEsUUFBN0I7RUFBQSxJQUF1Q0MsU0FBdkMsZUFBdUNBLFNBQXZDO0VBQUEsSUFBa0RDLE1BQWxELGVBQWtEQSxNQUFsRDtFQUNBLElBQTBCQyxnQkFBMUIsR0FBK0NWLEVBQS9DLENBQVFXLGdCQUFSO0VBQ0EsSUFBUUMsYUFBUixHQUEwQlosRUFBRSxDQUFDYSxXQUE3QixDQUFRRCxhQUFSO0VBQ0EscUJBQWlIWixFQUFFLENBQUNjLFVBQXBIO0VBQUEsSUFBUUMsWUFBUixrQkFBUUEsWUFBUjtFQUFBLElBQXNCQyxhQUF0QixrQkFBc0JBLGFBQXRCO0VBQUEsSUFBcUNDLFdBQXJDLGtCQUFxQ0EsV0FBckM7RUFBQSxJQUFrREMsUUFBbEQsa0JBQWtEQSxRQUFsRDtFQUFBLElBQTREQyxNQUE1RCxrQkFBNERBLE1BQTVEO0VBQUEsSUFBZ0dDLFlBQWhHLGtCQUFvRUMsMEJBQXBFO0VBQ0EsSUFBUUMsRUFBUixHQUFldEIsRUFBRSxDQUFDdUIsSUFBbEIsQ0FBUUQsRUFBUjtFQUNBLElBQU1FLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxhQUFiO0lBQTJCLEtBQUssRUFBQztFQUFqQyxnQkFDeEIsNENBQ0M7SUFBTSxJQUFJLEVBQUMsU0FBWDtJQUFxQixNQUFNLEVBQUMsSUFBNUI7SUFBaUMsRUFBRSxFQUFDLE9BQXBDO0lBQTRDLEVB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QWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3lEOztBQUV6RCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3Mvb2JqZWN0LWNhdGVnb3JpZXMtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3Mvb2JqZWN0LWNhdGVnb3JpZXMtZWRpdG9yLnNjc3M/YjliMSIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL29iamVjdC1jYXRlZ29yaWVzLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgTm90aWNlLCBfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbDogSW5wdXRDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PGc+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiIzdmN2Y3ZlwiIGhlaWdodD1cIjI4XCIgaWQ9XCJzdmdfMlwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjhcIiB4PVwiMjkuMzc1XCIgeT1cIjIwLjMyODEzXCIgLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjN2Y3ZjdmXCIgaGVpZ2h0PVwiMTAuNVwiIGlkPVwic3ZnXzNcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjE3NS41XCIgeD1cIjY4LjYyNVwiIHk9XCIyOS4wNzgxM1wiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjIwXCIgaWQ9XCJzdmdfNFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjBcIiB4PVwiNzAuNVwiIHk9XCI2Mi42NzE4OFwiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjEwLjVcIiBpZD1cInN2Z181XCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCIxMzlcIiB4PVwiMTA1LjYyNVwiIHk9XCI2Ny40MjE4OFwiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjIwXCIgaWQ9XCJzdmdfNlwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjBcIiB4PVwiNzAuNVwiIHk9XCI5My4xNzE4OFwiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjEwLjVcIiBpZD1cInN2Z183XCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCIxMzlcIiB4PVwiMTA1LjYyNVwiIHk9XCI5Ny45MjE4OFwiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjIwXCIgaWQ9XCJzdmdfOFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjBcIiB4PVwiNzAuNVwiIHk9XCIxMjQuNjcxODhcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfOVwiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiMTI5LjQyMTg4XCIgLz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBPYmplY3RDYXRlZ29yaWVzRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblx0XHRjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXG5cdFx0Y29uc3QgZ2V0RXhhbXBsZSA9ICgpID0+IHtcblx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIj5cblx0XHRcdFx0XHRcdDxoND57YmxvY2sudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdFx0PHA+e19fKCdOb3RlczogQmxvY2sgd29ya3Mgb25seSBhdCB2YWxpZCBvYmplY3QgcGFnZS4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHQ8SW5wdXRDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdUaXRsZTonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj0ndG9wJ1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLnRpdGxlfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0QXR0cmlidXRlcyh7IHRpdGxlOiBuZXh0VmFsdWUgfSk7XG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja1ByZXZpZXcgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCI+XG5cdFx0XHRcdFx0PERpc2FibGVkIGtleT1cImJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHRcdDxTZXJ2ZXJTaWRlUmVuZGVyXG5cdFx0XHRcdFx0XHRcdGJsb2NrPXtwcm9wcy5uYW1lfVxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzPXthdHRyaWJ1dGVzfVxuXHRcdFx0XHRcdFx0XHR1cmxRdWVyeUFyZ3M9e3sgaXNQcmV2aWV3OiB0cnVlIH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEJsb2NrQ29udHJvbHMoKSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRpZiAoZWRpdE1vZGUpIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChnZXRCbG9ja0VkaXQoKSk7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICghbGFzdFByZXZpZXcpIHtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGdldEJsb2NrUHJldmlldygpO1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT57cmVuZGVyfTwvZGl2Pjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLW9iamVjdC1jYXRlZ29yaWVzJywge1xuXHRcdHRpdGxlOiBfXygnT2JqZWN0IENhdGVnb3JpZXMnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdUaGUgbGlzdCBvZiBjYXRlZ29yaWVzIHRoYXQgb2JqZWN0IGJlbG9uZ3MgdG8uJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnIHRyYW5zZm9ybT1cInJvdGF0ZSg0NSAxMi4wMDAxIDEyKVwiPjxyZWN0IGZpbGw9XCJibGFja1wiIGhlaWdodD1cIjYuNTgwNDJcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYuNTgwNDJcIiB4PVwiMy45MzE2MlwiIHk9XCIzLjkzNjMxXCIgLz48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjEzLjQ4OFwiIHk9XCIxMy40ODMzNVwiIC8+PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiNi41ODA0MlwiIGlkPVwic3ZnXzE2XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjEzLjM1MjAyXCIgeT1cIjMuOTQ2NzVcIiAvPjxyZWN0IGZpbGw9XCJibGFja1wiIGhlaWdodD1cIjYuNTgwNDJcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYuNTgwNDJcIiB4PVwiMy45OTY0NVwiIHk9XCIxMy40NTYxNlwiIC8+PC9nPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnb2JqZWN0J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRpc0V4YW1wbGU6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBPYmplY3RDYXRlZ29yaWVzRm4sXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3Mvb2JqZWN0LWNhdGVnb3JpZXMtZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL29iamVjdC1jYXRlZ29yaWVzLWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJlbGVtZW50IiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNlcnZlclNpZGVSZW5kZXIiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiY29tcG9uZW50cyIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiTm90aWNlIiwiSW5wdXRDb250cm9sIiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwibGFzdFByZXZpZXciLCJPYmplY3RDYXRlZ29yaWVzRm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImVkaXRNb2RlIiwic2V0RWRpdE1vZGUiLCJnZXRFeGFtcGxlIiwiZ2V0QmxvY2tDb250cm9scyIsImdldEJsb2NrRWRpdCIsImJsb2NrIiwiZ2V0QmxvY2tUeXBlIiwidGl0bGUiLCJuZXh0VmFsdWUiLCJnZXRCbG9ja1ByZXZpZXciLCJpc1ByZXZpZXciLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwicHVzaCIsImpvaW4iLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
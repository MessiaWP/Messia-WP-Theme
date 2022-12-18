/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/object-properties-editor.jsx":
/*!****************************************************!*\
  !*** ./src/js/blocks/object-properties-editor.jsx ***!
  \****************************************************/
/***/ (function() {

(function (wp, $) {
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
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    Notice,
    __experimentalInputControl: InputControl
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
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
  let lastPreview = false;
  function ObjectPropertiesFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [editMode, setEditMode] = useState(true);
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
      const block = wp.blocks.getBlockType(name);
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
        onChange: nextValue => {
          return setAttributes({
            title: nextValue
          });
        }
      }))));
    };
    const getBlockPreview = () => {
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
    save: function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3QtcHJvcGVydGllcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBRSxFQUFFQyxDQUFDLEVBQUU7RUFFakIsTUFBTTtJQUFFQztFQUFrQixDQUFDLEdBQUdGLEVBQUUsQ0FBQ0csTUFBTTtFQUN2QyxNQUFNO0lBQUVDLFNBQVM7SUFBRUMsUUFBUTtJQUFFQyxRQUFRO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdSLEVBQUUsQ0FBQ1MsT0FBTztFQUN2RSxNQUFNO0lBQUVDLGdCQUFnQixFQUFFQztFQUFpQixDQUFDLEdBQUdYLEVBQUU7RUFDakQsTUFBTTtJQUFFWTtFQUFjLENBQUMsR0FBR1osRUFBRSxDQUFDYSxXQUFXO0VBQ3hDLE1BQU07SUFBRUMsWUFBWTtJQUFFQyxhQUFhO0lBQUVDLFdBQVc7SUFBRUMsUUFBUTtJQUFFQyxNQUFNO0lBQUVDLDBCQUEwQixFQUFFQztFQUFhLENBQUMsR0FBR3BCLEVBQUUsQ0FBQ3FCLFVBQVU7RUFDOUgsTUFBTTtJQUFFQztFQUFHLENBQUMsR0FBR3RCLEVBQUUsQ0FBQ3VCLElBQUk7RUFDdEIsTUFBTUMsZ0JBQWdCLGdCQUFHO0lBQUssT0FBTyxFQUFDLGFBQWE7SUFBQyxLQUFLLEVBQUM7RUFBNEIsZ0JBQ3JGLDRDQUNDO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQzlGO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxPQUFPO0lBQUMsQ0FBQyxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQ25HO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQzVGO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxLQUFLO0lBQUMsQ0FBQyxFQUFDLFNBQVM7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQ2xHO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQzVGO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxLQUFLO0lBQUMsQ0FBQyxFQUFDLFNBQVM7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFFLGVBQ2xHO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxD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cEI7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN5RDs7QUFFekQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL29iamVjdC1wcm9wZXJ0aWVzLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL29iamVjdC1wcm9wZXJ0aWVzLWVkaXRvci5zY3NzPzcyMTEiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9vYmplY3QtcHJvcGVydGllcy1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIE5vdGljZSwgX19leHBlcmltZW50YWxJbnB1dENvbnRyb2w6IElucHV0Q29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxnPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiM3ZjdmN2ZcIiBoZWlnaHQ9XCIyOFwiIGlkPVwic3ZnXzJcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjI4XCIgeD1cIjI5LjM3NVwiIHk9XCIyMC4zMjgxM1wiLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjN2Y3ZjdmXCIgaGVpZ2h0PVwiMTAuNVwiIGlkPVwic3ZnXzNcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjE3NS41XCIgeD1cIjY4LjYyNVwiIHk9XCIyOS4wNzgxM1wiLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMjBcIiBpZD1cInN2Z180XCIgcng9XCIyXCIgcnk9XCIyXCIgd2lkdGg9XCIyMFwiIHg9XCI3MC41XCIgeT1cIjYyLjY3MTg4XCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfNVwiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiNjcuNDIxODhcIi8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjIwXCIgaWQ9XCJzdmdfNlwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMjBcIiB4PVwiNzAuNVwiIHk9XCI5My4xNzE4OFwiLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMTAuNVwiIGlkPVwic3ZnXzdcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjEzOVwiIHg9XCIxMDUuNjI1XCIgeT1cIjk3LjkyMTg4XCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIyMFwiIGlkPVwic3ZnXzhcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjIwXCIgeD1cIjcwLjVcIiB5PVwiMTI0LjY3MTg4XCIvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfOVwiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiMTI5LjQyMTg4XCIvPlxuXHRcdDwvZz5cblx0PC9zdmc+O1xuXG5cdGxldCBsYXN0UHJldmlldyA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIE9iamVjdFByb3BlcnRpZXNGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8cD57X18oJ05vdGVzOiBCbG9jayB3b3JrcyBvbmx5IGF0IHZhbGlkIG9iamVjdCBwYWdlLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdDxJbnB1dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1RpdGxlOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRsYWJlbFBvc2l0aW9uPSd0b3AnXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMudGl0bGV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBzZXRBdHRyaWJ1dGVzKHsgdGl0bGU6IG5leHRWYWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIj5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e3Byb3BzLm5hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZW5kZXIoKTtcblx0fVxuXG5cdHJlZ2lzdGVyQmxvY2tUeXBlKCdtZXNzaWEvYmxvY2stb2JqZWN0LXByb3BlcnRpZXMnLCB7XG5cdFx0dGl0bGU6IF9fKCdPYmplY3QgUHJvcGVydGllcycsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ1RoZSBsaXN0IG9mIHByb3BlcnRpZXMgdGhhdCBvYmplY3QgYmVsb25ncyB0by4nLCAnbWVzc2lhJyksXG5cdFx0aWNvbjogPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgdHJhbnNmb3JtPVwicm90YXRlKDQ1IDEyLjAwMDEgMTIpXCI+PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiNi41ODA0MlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIzLjkzMTYyXCIgeT1cIjMuOTM2MzFcIiAvPjxyZWN0IGZpbGw9XCJibGFja1wiIGhlaWdodD1cIjYuNTgwNDJcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYuNTgwNDJcIiB4PVwiMTMuNDg4XCIgeT1cIjEzLjQ4MzM1XCIgLz48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgaWQ9XCJzdmdfMTZcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYuNTgwNDJcIiB4PVwiMTMuMzUyMDJcIiB5PVwiMy45NDY3NVwiIC8+PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiNi41ODA0MlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIzLjk5NjQ1XCIgeT1cIjEzLjQ1NjE2XCIgLz48L2c+PC9zdmc+LFxuXHRcdGNhdGVnb3J5OiAnbWVzc2lhJyxcblx0XHRrZXl3b3JkczogWydvYmplY3QnXSxcblx0XHRzdHlsZXM6IFtdLFxuXHRcdHZhcmlhdGlvbnM6IFtdLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IE9iamVjdFByb3BlcnRpZXNGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy9vYmplY3QtcHJvcGVydGllcy1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3Mvb2JqZWN0LXByb3BlcnRpZXMtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJlbGVtZW50Iiwic2VydmVyU2lkZVJlbmRlciIsIlNlcnZlclNpZGVSZW5kZXIiLCJCbG9ja0NvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIk5vdGljZSIsIl9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sIiwiSW5wdXRDb250cm9sIiwiY29tcG9uZW50cyIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIk9iamVjdFByb3BlcnRpZXNGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsImdldEV4YW1wbGUiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0aXRsZSIsIm5leHRWYWx1ZSIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwidHlwZSIsImRlZmF1bHQiLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/object-categories-editor.jsx":
/*!****************************************************!*\
  !*** ./src/js/blocks/object-categories-editor.jsx ***!
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
  function ObjectCategoriesFn(props) {
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
    save: function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3QtY2F0ZWdvcmllcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBRSxFQUFFQyxDQUFDLEVBQUU7RUFFakIsTUFBTTtJQUFFQztFQUFrQixDQUFDLEdBQUdGLEVBQUUsQ0FBQ0csTUFBTTtFQUN2QyxNQUFNO0lBQUVDLFNBQVM7SUFBRUMsUUFBUTtJQUFFQyxRQUFRO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdSLEVBQUUsQ0FBQ1MsT0FBTztFQUN2RSxNQUFNO0lBQUVDLGdCQUFnQixFQUFFQztFQUFpQixDQUFDLEdBQUdYLEVBQUU7RUFDakQsTUFBTTtJQUFFWTtFQUFjLENBQUMsR0FBR1osRUFBRSxDQUFDYSxXQUFXO0VBQ3hDLE1BQU07SUFBRUMsWUFBWTtJQUFFQyxhQUFhO0lBQUVDLFdBQVc7SUFBRUMsUUFBUTtJQUFFQyxNQUFNO0lBQUVDLDBCQUEwQixFQUFFQztFQUFhLENBQUMsR0FBR3BCLEVBQUUsQ0FBQ3FCLFVBQVU7RUFDOUgsTUFBTTtJQUFFQztFQUFHLENBQUMsR0FBR3RCLEVBQUUsQ0FBQ3VCLElBQUk7RUFDdEIsTUFBTUMsZ0JBQWdCLGdCQUFHO0lBQUssT0FBTyxFQUFDLGFBQWE7SUFBQyxLQUFLLEVBQUM7RUFBNEIsZ0JBQ3JGLDRDQUNDO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQy9GO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxPQUFPO0lBQUMsQ0FBQyxFQUFDLFFBQVE7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQ3BHO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQzdGO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxLQUFLO0lBQUMsQ0FBQyxFQUFDLFNBQVM7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQ25HO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQzdGO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsTUFBTTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxLQUFLO0lBQUMsQ0FBQyxFQUFDLFNBQVM7SUFBQyxDQUFDLEVBQUM7RUFBVSxFQUFHLGVBQ25HO0lBQU0sSUFBSSxFQUFDLFNBQVM7SUFBQyxNQUFNLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDLEdBQUc7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsQ0FBQyxFQUFDLE1BQU07SUFBQyxD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cEI7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN5RDs7QUFFekQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL29iamVjdC1jYXRlZ29yaWVzLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL29iamVjdC1jYXRlZ29yaWVzLWVkaXRvci5zY3NzP2I5YjEiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9vYmplY3QtY2F0ZWdvcmllcy1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIE5vdGljZSwgX19leHBlcmltZW50YWxJbnB1dENvbnRyb2w6IElucHV0Q29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxnPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiM3ZjdmN2ZcIiBoZWlnaHQ9XCIyOFwiIGlkPVwic3ZnXzJcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjI4XCIgeD1cIjI5LjM3NVwiIHk9XCIyMC4zMjgxM1wiIC8+XG5cdFx0XHQ8cmVjdCBmaWxsPVwiIzdmN2Y3ZlwiIGhlaWdodD1cIjEwLjVcIiBpZD1cInN2Z18zXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCIxNzUuNVwiIHg9XCI2OC42MjVcIiB5PVwiMjkuMDc4MTNcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIyMFwiIGlkPVwic3ZnXzRcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjIwXCIgeD1cIjcwLjVcIiB5PVwiNjIuNjcxODhcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfNVwiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiNjcuNDIxODhcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIyMFwiIGlkPVwic3ZnXzZcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjIwXCIgeD1cIjcwLjVcIiB5PVwiOTMuMTcxODhcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxMC41XCIgaWQ9XCJzdmdfN1wiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiMTM5XCIgeD1cIjEwNS42MjVcIiB5PVwiOTcuOTIxODhcIiAvPlxuXHRcdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIyMFwiIGlkPVwic3ZnXzhcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjIwXCIgeD1cIjcwLjVcIiB5PVwiMTI0LjY3MTg4XCIgLz5cblx0XHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMTAuNVwiIGlkPVwic3ZnXzlcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjEzOVwiIHg9XCIxMDUuNjI1XCIgeT1cIjEyOS40MjE4OFwiIC8+XG5cdFx0PC9nPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gT2JqZWN0Q2F0ZWdvcmllc0ZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0NvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QmxvY2tDb250cm9scyBrZXk9XCJibG9ja1wiPlxuXHRcdFx0XHRcdDxUb29sYmFyR3JvdXBcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3B0aW9ucycsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHQ8VG9vbGJhckJ1dHRvblxuXHRcdFx0XHRcdFx0XHRsYWJlbD17ZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXtlZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRFZGl0TW9kZSghZWRpdE1vZGUpO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0VkaXQgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCI+XG5cdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnTm90ZXM6IEJsb2NrIHdvcmtzIG9ubHkgYXQgdmFsaWQgb2JqZWN0IHBhZ2UuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0PElucHV0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsUG9zaXRpb249J3RvcCdcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy50aXRsZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyB0aXRsZTogbmV4dFZhbHVlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1vYmplY3QtY2F0ZWdvcmllcycsIHtcblx0XHR0aXRsZTogX18oJ09iamVjdCBDYXRlZ29yaWVzJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnVGhlIGxpc3Qgb2YgY2F0ZWdvcmllcyB0aGF0IG9iamVjdCBiZWxvbmdzIHRvLicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyB0cmFuc2Zvcm09XCJyb3RhdGUoNDUgMTIuMDAwMSAxMilcIj48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjMuOTMxNjJcIiB5PVwiMy45MzYzMVwiIC8+PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiNi41ODA0MlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIxMy40ODhcIiB5PVwiMTMuNDgzMzVcIiAvPjxyZWN0IGZpbGw9XCJibGFja1wiIGhlaWdodD1cIjYuNTgwNDJcIiBpZD1cInN2Z18xNlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNi41ODA0MlwiIHg9XCIxMy4zNTIwMlwiIHk9XCIzLjk0Njc1XCIgLz48cmVjdCBmaWxsPVwiYmxhY2tcIiBoZWlnaHQ9XCI2LjU4MDQyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2LjU4MDQyXCIgeD1cIjMuOTk2NDVcIiB5PVwiMTMuNDU2MTZcIiAvPjwvZz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ29iamVjdCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogT2JqZWN0Q2F0ZWdvcmllc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL29iamVjdC1jYXRlZ29yaWVzLWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9vYmplY3QtY2F0ZWdvcmllcy1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsImVsZW1lbnQiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiU2VydmVyU2lkZVJlbmRlciIsIkJsb2NrQ29udHJvbHMiLCJibG9ja0VkaXRvciIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiTm90aWNlIiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJJbnB1dENvbnRyb2wiLCJjb21wb25lbnRzIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiT2JqZWN0Q2F0ZWdvcmllc0ZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwibmV4dFZhbHVlIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJ0eXBlIiwiZGVmYXVsdCIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
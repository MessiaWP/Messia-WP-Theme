/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/post-content-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/post-content-editor.jsx ***!
  \***********************************************/
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
  let lastPreview = false;
  function PostContentFn(props) {
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
      }, /*#__PURE__*/React.createElement("p", null, __('Notes: Block will display the content of the current post.', 'messia')))));
    };
    const getBlockPreview = () => {
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
      }, /*#__PURE__*/React.createElement("p", null, __('Preview is impossible from admin side.', 'messia')))));
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
    save: function (props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1wb3N0LWNvbnRlbnQtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQUUsRUFBRUMsQ0FBQyxFQUFFO0VBRWpCLE1BQU07SUFBRUM7RUFBa0IsQ0FBQyxHQUFHRixFQUFFLENBQUNHLE1BQU07RUFDdkMsTUFBTTtJQUFFQyxTQUFTO0lBQUVDLFFBQVE7SUFBRUMsUUFBUTtJQUFFQyxTQUFTO0lBQUVDO0VBQU8sQ0FBQyxHQUFHUixFQUFFLENBQUNTLE9BQU87RUFDdkUsTUFBTTtJQUFFQyxnQkFBZ0IsRUFBRUM7RUFBaUIsQ0FBQyxHQUFHWCxFQUFFO0VBQ2pELE1BQU07SUFBRVk7RUFBYyxDQUFDLEdBQUdaLEVBQUUsQ0FBQ2EsV0FBVztFQUN4QyxNQUFNO0lBQUVDLFlBQVk7SUFBRUMsYUFBYTtJQUFFQyxXQUFXO0lBQUVDLFFBQVE7SUFBRUMsTUFBTTtJQUFFQywwQkFBMEIsRUFBRUM7RUFBYSxDQUFDLEdBQUdwQixFQUFFLENBQUNxQixVQUFVO0VBQzlILE1BQU07SUFBRUM7RUFBRyxDQUFDLEdBQUd0QixFQUFFLENBQUN1QixJQUFJO0VBQ3RCLE1BQU1DLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxhQUFhO0lBQUMsS0FBSyxFQUFDO0VBQTRCLGdCQUNyRjtJQUFNLElBQUksRUFBQyxTQUFTO0lBQUMsVUFBVSxFQUFDLE9BQU87SUFBQyxRQUFRLEVBQUMsSUFBSTtJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsTUFBTSxFQUFDLFNBQVM7SUFBQyxXQUFXLEVBQUMsR0FBRztJQUFDLFVBQVUsRUFBQyxRQUFRO0lBQUMsQ0FBQyxFQUFDLFVBQVU7SUFBQyxDQUFDLEVBQUM7RUFBVSxPQUFTLGVBQ3hKO0lBQU0sSUFBSSxFQUFDLE1BQU07SUFBQyxFQUFFLEVBQUMsT0FBTztJQUFDLE1BQU0sRUFBQyxTQUFTO0lBQUMsYUFBYSxFQUFDLE9BQU87SUFBQyxXQUFXLEVB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Iiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9wb3N0LWNvbnRlbnQtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3MvcG9zdC1jb250ZW50LWVkaXRvci5zY3NzP2QwZDEiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9wb3N0LWNvbnRlbnQtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50LCBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFRvb2xiYXJHcm91cCwgVG9vbGJhckJ1dHRvbiwgUGxhY2Vob2xkZXIsIERpc2FibGVkLCBOb3RpY2UsIF9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sOiBJbnB1dENvbnRyb2wgfSA9IHdwLmNvbXBvbmVudHM7XG5cdGNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5cdGNvbnN0IGV4YW1wbGVJbWFnZURhdGEgPSA8c3ZnIHZpZXdCb3g9XCIwIDAgMjc0IDE2NVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8dGV4dCBmaWxsPVwiIzY2NjY2NlwiIGZvbnRGYW1pbHk9XCJzZXJpZlwiIGZvbnRTaXplPVwiODRcIiBpZD1cInN2Z18xXCIgc3Ryb2tlPVwiIzY2NjY2NlwiIHN0cm9rZVdpZHRoPVwiMFwiIHRleHRBbmNob3I9XCJtaWRkbGVcIiB4PVwiNTcuODcyMzlcIiB5PVwiODEuMjcwODNcIj5UPC90ZXh0PlxuXHRcdDxsaW5lIGZpbGw9XCJub25lXCIgaWQ9XCJzdmdfMlwiIHN0cm9rZT1cIiM2NjY2NjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjVcIiB4MT1cIjEwNy40NTcwNFwiIHgyPVwiMjQxLjc5NTU3XCIgeTE9XCIyOC41MzEyNVwiIHkyPVwiMjguNTMxMjVcIiAvPlxuXHRcdDxsaW5lIGZpbGw9XCJub25lXCIgaWQ9XCJzdmdfNlwiIHN0cm9rZT1cIiM2NjY2NjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjVcIiB4MT1cIjM2LjQ1NzA0XCIgeDI9XCIyNDEuNzk1NTdcIiB5MT1cIjEwMy41MzEyNVwiIHkyPVwiMTAzLjUzMTI1XCIgLz5cblx0XHQ8bGluZSBmaWxsPVwibm9uZVwiIGlkPVwic3ZnXzExXCIgc3Ryb2tlPVwiIzY2NjY2NlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiNVwiIHgxPVwiMTA3LjQ1NzA0XCIgeDI9XCIyNDEuNzk1NTdcIiB5MT1cIjY2LjA2NTExXCIgeTI9XCI2Ni4wNjUxMVwiIC8+XG5cdFx0PGxpbmUgZmlsbD1cIm5vbmVcIiBpZD1cInN2Z18xMlwiIHN0cm9rZT1cIiM2NjY2NjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjVcIiB4MT1cIjM2LjQ1NzA0XCIgeDI9XCIyNDEuNzk1NTdcIiB5MT1cIjE0MC4wNjUxXCIgeTI9XCIxNDAuMDY1MVwiIC8+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBQb3N0Q29udGVudEZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0NvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QmxvY2tDb250cm9scyBrZXk9XCJibG9ja1wiPlxuXHRcdFx0XHRcdDxUb29sYmFyR3JvdXBcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3B0aW9ucycsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHQ8VG9vbGJhckJ1dHRvblxuXHRcdFx0XHRcdFx0XHRsYWJlbD17ZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXtlZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRFZGl0TW9kZSghZWRpdE1vZGUpO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0VkaXQgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCI+XG5cdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnTm90ZXM6IEJsb2NrIHdpbGwgZGlzcGxheSB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudCBwb3N0LicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIgdGFiSW5kZXg9XCIwXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXt0aGlzLmJsb2NrUmVmfT5cblx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdFx0PHA+e19fKCdQcmV2aWV3IGlzIGltcG9zc2libGUgZnJvbSBhZG1pbiBzaWRlLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1wb3N0LWNvbnRlbnQnLCB7XG5cdFx0dGl0bGU6IF9fKCdQb3N0IGNvbnRlbnQnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdPdXRwdXRzIHRoZSBjb250ZW50IG9mIHRoZSBjdXJyZW50bHkgdmlld2VkIHBvc3QvcGFnZS9vYmplY3QuJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJtMi45MzMzMywwLjQxNDgxbDAsMjMuMTcwMzdsMTguMTMzMzMsMGwwLC0xNi44MjY4NWwtMC4xNDE2NywtMC4xNTc0MWwtNi4wNDQ0NCwtNi4wNDQ0NGwtMC4xNTc0MSwtMC4xNDE2N2wtMTEuNzg5ODIsMHptMS4wMDc0MSwxLjAwNzQxbDEwLjA3NDA3LDBsMCw0LjAyOTYzbC03LjA1MTg1LDBsMCwxLjAwNzQxbDcuMDUxODUsMGwwLDEuMDA3NDFsNi4wNDQ0NCwwbDAsMTUuMTExMTFsLTE2LjExODUyLDBsMCwtMjEuMTU1NTZ6bTExLjA4MTQ4LDAuNzI0MDdsNC4zMTI5Niw0LjMxMjk2bC00LjMxMjk2LDBsMCwtNC4zMTI5NnptLTguMDU5MjYsOC4zNDI1OWwwLDEuMDA3NDFsMS41MTExMSwwbDAsLTEuMDA3NDFsLTEuNTExMTEsMHptMy41MjU5MywwbDAsMS4wMDc0MWw2LjU0ODE1LDBsMCwtMS4wMDc0MWwtNi41NDgxNSwwem0tMy41MjU5MywzLjAyMjIybDAsMS4wMDc0MWwxLjUxMTExLDBsMCwtMS4wMDc0MWwtMS41MTExMSwwem0zLjUyNTkzLDBsMCwxLjAwNzQxbDYuNTQ4MTUsMGwwLC0xLjAwNzQxbC02LjU0ODE1LDB6bS0zLjUyNTkzLDMuMDIyMjJsMCwxLjAwNzQxbDEuNTExMTEsMGwwLC0xLjAwNzQxbC0xLjUxMTExLDB6bTMuNTI1OTMsMGwwLDEuMDA3NDFsNi41NDgxNSwwbDAsLTEuMDA3NDFsLTYuNTQ4MTUsMHpcIiBmaWxsPVwiYmxhY2tcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnb2JqZWN0J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRpc0V4YW1wbGU6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IFBvc3RDb250ZW50Rm4sXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3MvcG9zdC1jb250ZW50LWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9wb3N0LWNvbnRlbnQtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJlbGVtZW50Iiwic2VydmVyU2lkZVJlbmRlciIsIlNlcnZlclNpZGVSZW5kZXIiLCJCbG9ja0NvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIk5vdGljZSIsIl9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sIiwiSW5wdXRDb250cm9sIiwiY29tcG9uZW50cyIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIlBvc3RDb250ZW50Rm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImVkaXRNb2RlIiwic2V0RWRpdE1vZGUiLCJnZXRFeGFtcGxlIiwiZ2V0QmxvY2tDb250cm9scyIsImdldEJsb2NrRWRpdCIsImJsb2NrIiwiZ2V0QmxvY2tUeXBlIiwidGl0bGUiLCJnZXRCbG9ja1ByZXZpZXciLCJibG9ja1JlZiIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwidHlwZSIsImRlZmF1bHQiLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
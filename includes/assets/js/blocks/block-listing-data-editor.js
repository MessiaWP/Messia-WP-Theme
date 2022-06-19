/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/listing-data-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/listing-data-editor.jsx ***!
  \***********************************************/
/***/ (function() {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function (wp, $) {
  var registerBlockType = wp.blocks.registerBlockType;
  var Component = wp.element.Component;
  var ServerSideRender = wp.serverSideRender;
  var _wp$blockEditor = wp.blockEditor,
      InspectorControls = _wp$blockEditor.InspectorControls,
      BlockControls = _wp$blockEditor.BlockControls;
  var _wp$components = wp.components,
      Notice = _wp$components.Notice,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      RadioControl = _wp$components.RadioControl,
      PanelBody = _wp$components.PanelBody,
      InputControl = _wp$components.__experimentalInputControl,
      Spacer = _wp$components.__experimentalSpacer;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
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

  var Listing = /*#__PURE__*/function (_Component) {
    _inherits(Listing, _Component);

    var _super = _createSuper(Listing);

    function Listing(props) {
      var _this;

      _classCallCheck(this, Listing);

      _this = _super.call(this, props);
      _this.state = {
        editMode: true,
        terms: {
          segment: []
        },
        termsFetched: false
      };
      _this.lastPreview = false;
      _this.blockRef = React.createRef();
      return _this;
    }

    _createClass(Listing, [{
      key: "getInspectorControls",
      value: function getInspectorControls() {
        var _this$props = this.props,
            attributes = _this$props.attributes,
            setAttributes = _this$props.setAttributes;
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
          onChange: function onChange(value) {
            setAttributes({
              columns: parseInt(value)
            });
          }
        })));
      }
    }, {
      key: "getBlockControls",
      value: function getBlockControls() {
        var _this2 = this;

        return /*#__PURE__*/React.createElement(BlockControls, {
          key: "block"
        }, /*#__PURE__*/React.createElement(ToolbarGroup, {
          label: __('Options', 'messia')
        }, /*#__PURE__*/React.createElement(ToolbarButton, {
          label: this.state.editMode ? __('Preview', 'messia') : __('Edit', 'messia'),
          icon: this.state.editMode ? "visibility" : "edit",
          onClick: function onClick() {
            _this2.setState({
              editMode: !_this2.state.editMode
            });
          }
        })));
      }
    }, {
      key: "getBlockEdit",
      value: function getBlockEdit() {
        var block = wp.blocks.getBlockType(this.props.name);
        var _this$props2 = this.props,
            attributes = _this$props2.attributes,
            setAttributes = _this$props2.setAttributes;
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
          onChange: function onChange(nextValue) {
            setAttributes({
              blockTitle: nextValue
            });
          }
        }))));
      }
    }, {
      key: "getBlockPreview",
      value: function getBlockPreview() {
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
    }, {
      key: "render",
      value: function render() {
        var attributes = this.props.attributes;
        var className = this.props.className;
        var isExample = attributes.isExample;

        if (isExample) {
          return exampleImageData;
        } else {
          var classes = [className];
          var render = [this.getInspectorControls(), this.getBlockControls()];

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
    }]);

    return Listing;
  }(Component);

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
    save: function save(props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1saXN0aW5nLWRhdGEtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsaUJBQVIsR0FBOEJGLEVBQUUsQ0FBQ0csTUFBakMsQ0FBUUQsaUJBQVI7RUFDQSxJQUFRRSxTQUFSLEdBQXNCSixFQUFFLENBQUNLLE9BQXpCLENBQVFELFNBQVI7RUFDQSxJQUEwQkUsZ0JBQTFCLEdBQStDTixFQUEvQyxDQUFRTyxnQkFBUjtFQUNBLHNCQUE2Q1AsRUFBRSxDQUFDUSxXQUFoRDtFQUFBLElBQVFDLGlCQUFSLG1CQUFRQSxpQkFBUjtFQUFBLElBQTJCQyxhQUEzQixtQkFBMkJBLGFBQTNCO0VBQ0EscUJBQXdLVixFQUFFLENBQUNXLFVBQTNLO0VBQUEsSUFBUUMsTUFBUixrQkFBUUEsTUFBUjtFQUFBLElBQWdCQyxZQUFoQixrQkFBZ0JBLFlBQWhCO0VBQUEsSUFBOEJDLGFBQTlCLGtCQUE4QkEsYUFBOUI7RUFBQSxJQUE2Q0MsV0FBN0Msa0JBQTZDQSxXQUE3QztFQUFBLElBQTBEQyxRQUExRCxrQkFBMERBLFFBQTFEO0VBQUEsSUFBb0VDLFlBQXBFLGtCQUFvRUEsWUFBcEU7RUFBQSxJQUFrRkMsU0FBbEYsa0JBQWtGQSxTQUFsRjtFQUFBLElBQXlIQyxZQUF6SCxrQkFBNkZDLDBCQUE3RjtFQUFBLElBQTZKQyxNQUE3SixrQkFBdUlDLG9CQUF2STtFQUNBLElBQVFDLEVBQVIsR0FBZXZCLEVBQUUsQ0FBQ3dCLElBQWxCLENBQVFELEVBQVI7RUFDQSxJQUFNRSxnQkFBZ0IsZ0JBQUc7SUFBSyxPQUFPLEVBQUMsYUFBYjtJQUEyQixLQUFLLEVBQUM7RUFBakMsZ0JBQ3hCO0lBQU0sSUFBSSxFQUFDLGNBQVg7SUFBMEIsTUFBTSxFQUFDLEtBQWpDO0lBQXVDLEVBQUUsRUFBQyxPQUExQztJQUFrRCxFQUFFLEVBQUMsR0FBckQ7SUFBeUQsRUFBRSxFQUFDLEdBQTVEO0lBQWdFLEtBQUssRUFBQyxJQUF0RTtJQUEyRSxDQUFDLEVBQUMsVUFBN0U7SUFBd0YsQ0FBQyxFQUFDO0VBQTFGLEVBRHdCLGVBRXhCO0lBQVEsRUFBRSxFQUFDLFVBQVg7SUFBc0IsRUFBRSxFQUFDLE1BQXpCO0lBQWdDLElBQUksRUFBQyxTQUFyQztJQUErQyxFQUFFLEVBQUMsT0FBbEQ7SUFBMEQsQ0FBQyxFQUFDO0VBQTVELEVBRndCLGVBR3hCO0lBQU0sSUFBSSxFQUFDLGNBQVg7SUFBMEIsTUFBTSxFQUFDLEtBQWpDO0lBQXVDLEVBQUUsRUFBQyxRQUExQztJQUFtRCxFQUFFLEVBQUMsR0FBdEQ7SUFBMEQsRUFBRSxFQUFDLEdBQTdEO0lBQWlFLEtBQUssRUFBQyxJQUF2RTtJQUE0RSxDQUFDLEVBQUMsVUFBOUU7SUFBeUYsQ0FBQyxFQUFDO0VBQTNGLEVBSHdCLGVBSXhCO0lBQVEsRUFBRSxFQUFDLFdBQVg7SUFBdUIsRUFBRSxFQUFDLE1BQTFCO0lBQWlDLElBQUksRUFBQyxTQUF0QztJQUFnRCxFQUFFLEVBQUMsUUFBbkQ7SUFBNEQsQ0FBQyxFQUFDO0VBQTlELEVBSndCLGVBS3hCO0lBQU0sSUFBSSxFQUFDLGNBQVg7SUFBMEIsTUFBTSxFQUFDLEtBQWpDO0lBQXVDLEVBQUUsRUFBQyxRQUExQztJQUFtRCxFQUFFLEVBQUMsR0FBdEQ7SUFBMEQsRUFBRSxFQUFDLEdBQTdEO0lBQWlFLEtBQUssRUFBQyxJQUF2RTtJQUE0RSxDQUFDLEVBQUMsV0FBOUU7SUFBMEYsQ0FBQyxFQUFDO0VBQTVGLEVBTHdCLGVBTXhCO0lBQVEsRUFBRSxFQUFDLFdBQVg7SUFBdUIsRUFBRSxFQUFDLE1BQTFCO0lBQWlDLElBQUksRUFBQyxTQUF0QztJQUFnRCxFQUFFLEVBQUMsUUFBbkQ7SUFBNEQsQ0FBQyxFQUFDO0VBQTlELEVBTndCLGVBT3hCLCtDQUNDO0lBQWdCLEVBQUUsRUFBQyxRQUFuQjtJQUE0QixFQUFFLEVBQUMsU0FBL0I7SUFBeUMsRUFBRSxFQUFDLEdBQTVDO0lBQWdELEVBQUUsRUFBQyxHQUFuRDtJQUF1RCxFQUFFLEVBQUM7RUFBMUQsZ0JBQ0M7SUFBTSxNQUFNLEVBQUMsR0FBYjtJQUFpQixTQUFTLEVBQUMsU0FBM0I7SUFBcUMsV0FBVyxFQUFDO0VBQWpELEVBREQsZUFFQztJQUFNLE1BQU0sRUFBQyxHQUFiO0lBQWlCLFNBQVMsRUFBQyxTQUEzQjtJQUFxQyxXQUFXLEVBQUM7RUFBakQsRUFGRCxDQURELENBUHdCLENBQXpCOztFQVJpQixJQXVCWEMsT0F2Qlc7SUFBQTs7SUFBQTs7SUF3QmhCLGlCQUFZQyxLQUFaLEVBQW1CO01BQUE7O01BQUE7O01BQ2xCLDBCQUFNQSxLQUFOO01BRUEsTUFBS0MsS0FBTCxHQUFhO1FBQ1pDLFFBQVEsRUFBRSxJQURFO1FBRVpDLEtBQUssRUFBRTtVQUNOQyxPQUFPLEVBQUU7UUFESCxDQUZLO1FBS1pDLFlBQVksRUFBRTtNQUxGLENBQWI7TUFRQSxNQUFLQyxXQUFMLEdBQW1CLEtBQW5CO01BQ0EsTUFBS0MsUUFBTCxHQUFnQkMsS0FBSyxDQUFDQyxTQUFOLEVBQWhCO01BWmtCO0lBYWxCOztJQXJDZTtNQUFBO01BQUEsT0F1Q2hCLGdDQUF1QjtRQUN0QixrQkFBc0MsS0FBS1QsS0FBM0M7UUFBQSxJQUFRVSxVQUFSLGVBQVFBLFVBQVI7UUFBQSxJQUFvQkMsYUFBcEIsZUFBb0JBLGFBQXBCO1FBRUEsb0JBQ0Msb0JBQUMsaUJBQUQ7VUFBbUIsR0FBRyxFQUFDO1FBQXZCLGdCQUNDLG9CQUFDLFNBQUQ7VUFBVyxLQUFLLEVBQUVmLEVBQUUsQ0FBQyxVQUFELEVBQWEsUUFBYjtRQUFwQixnQkFDQyxvQkFBQyxZQUFEO1VBQ0MsS0FBSyxFQUFFQSxFQUFFLENBQUMsOENBQUQsRUFBaUQsUUFBakQsQ0FEVjtVQUVDLFFBQVEsRUFBRWMsVUFBVSxDQUFDRSxPQUZ0QjtVQUdDLE9BQU8sRUFBRSxDQUNSO1lBQUVDLEtBQUssRUFBRWpCLEVBQUUsQ0FBQyxLQUFELEVBQVEsUUFBUixDQUFYO1lBQThCa0IsS0FBSyxFQUFFO1VBQXJDLENBRFEsRUFFUjtZQUFFRCxLQUFLLEVBQUVqQixFQUFFLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FBWDtZQUFnQ2tCLEtBQUssRUFBRTtVQUF2QyxDQUZRLENBSFY7VUFPQyxRQUFRLEVBQUUsa0JBQUNBLEtBQUQsRUFBVztZQUNwQkgsYUFBYSxDQUFDO2NBQUVDLE9BQU8sRUFBRUcsUUFBUSxDQUFDRCxLQUFEO1lBQW5CLENBQUQsQ0FBYjtVQUNBO1FBVEYsRUFERCxDQURELENBREQ7TUFpQkE7SUEzRGU7TUFBQTtNQUFBLE9BNkRoQiw0QkFBbUI7UUFBQTs7UUFFbEIsb0JBQ0Msb0JBQUMsYUFBRDtVQUFlLEdBQUcsRUFBQztRQUFuQixnQkFDQyxvQkFBQyxZQUFEO1VBQ0MsS0FBSyxFQUFFbEIsRUFBRSxDQUFDLFNBQUQsRUFBWSxRQUFaO1FBRFYsZ0JBRUMsb0JBQUMsYUFBRDtVQUNDLEtBQUssRUFBRSxLQUFLSyxLQUFMLENBQVdDLFFBQVgsR0FBc0JOLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWixDQUF4QixHQUFnREEsRUFBRSxDQUFDLE1BQUQsRUFBUyxRQUFULENBRDFEO1VBRUMsSUFBSSxFQUFFLEtBQUtLLEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixZQUF0QixHQUFxQyxNQUY1QztVQUdDLE9BQU8sRUFBRSxtQkFBTTtZQUNkLE1BQUksQ0FBQ2MsUUFBTCxDQUFjO2NBQ2JkLFFBQVEsRUFBRSxDQUFDLE1BQUksQ0FBQ0QsS0FBTCxDQUFXQztZQURULENBQWQ7VUFHQTtRQVBGLEVBRkQsQ0FERCxDQUREO01BZ0JBO0lBL0VlO01BQUE7TUFBQSxPQWlGaEIsd0JBQWU7UUFFZCxJQUFNZSxLQUFLLEdBQUc1QyxFQUFFLENBQUNHLE1BQUgsQ0FBVTBDLFlBQVYsQ0FBdUIsS0FBS2xCLEtBQUwsQ0FBV21CLElBQWxDLENBQWQ7UUFDQSxtQkFBc0MsS0FBS25CLEtBQTNDO1FBQUEsSUFBUVUsVUFBUixnQkFBUUEsVUFBUjtRQUFBLElBQW9CQyxhQUFwQixnQkFBb0JBLGFBQXBCO1FBRUEsb0JBQ0Msb0JBQUMsV0FBRDtVQUFhLEdBQUcsRUFBQztRQUFqQixnQkFDQztVQUFLLFNBQVMsRUFBQyxjQUFmO1VBQThCLEdBQUcsRUFBQyxjQUFsQztVQUFpRCxHQUFHLEVBQUUsS0FBS0o7UUFBM0QsZ0JBQ0MsZ0NBQUtVLEtBQUssQ0FBQ0csS0FBWCxDQURELGVBRUMsb0JBQUMsTUFBRDtVQUNDLGFBQWEsRUFBRSxLQURoQjtVQUVDLE1BQU0sRUFBQztRQUZSLGdCQUdDLCtCQUFJeEIsRUFBRSxDQUFDLG1GQUFELEVBQXNGLFFBQXRGLENBQU4sQ0FIRCxDQUZELGVBT0Msb0JBQUMsTUFBRCxxQkFDQyxvQkFBQyxZQUFEO1VBQ0MsS0FBSyxFQUFFQSxFQUFFLENBQUMsY0FBRCxFQUFpQixRQUFqQixDQURWO1VBRUMsYUFBYSxFQUFDLEtBRmY7VUFHQyxLQUFLLEVBQUVjLFVBQVUsQ0FBQ1csVUFIbkI7VUFJQyxRQUFRLEVBQUUsa0JBQUNDLFNBQUQsRUFBZTtZQUN4QlgsYUFBYSxDQUFDO2NBQUVVLFVBQVUsRUFBRUM7WUFBZCxDQUFELENBQWI7VUFDQTtRQU5GLEVBREQsQ0FQRCxDQURELENBREQ7TUFzQkE7SUE1R2U7TUFBQTtNQUFBLE9BOEdoQiwyQkFBa0I7UUFFakIsb0JBQ0Msb0JBQUMsUUFBRDtVQUFVLEdBQUcsRUFBQztRQUFkLGdCQUNDO1VBQUssU0FBUyxFQUFDLGNBQWY7VUFBOEIsUUFBUSxFQUFDLEdBQXZDO1VBQTJDLEdBQUcsRUFBQyxjQUEvQztVQUE4RCxHQUFHLEVBQUUsS0FBS2Y7UUFBeEUsZ0JBQ0Msb0JBQUMsTUFBRDtVQUNDLGFBQWEsRUFBRSxLQURoQjtVQUVDLE1BQU0sRUFBQztRQUZSLGdCQUdDLCtCQUFJWCxFQUFFLENBQUMseUZBQUQsRUFBNEYsUUFBNUYsQ0FBTixDQUhELENBREQsQ0FERCxDQUREO01BV0E7SUEzSGU7TUFBQTtNQUFBLE9BNkhoQixrQkFBUztRQUNSLElBQVFjLFVBQVIsR0FBdUIsS0FBS1YsS0FBNUIsQ0FBUVUsVUFBUjtRQUNBLElBQVFhLFNBQVIsR0FBc0IsS0FBS3ZCLEtBQTNCLENBQVF1QixTQUFSO1FBQ0EsSUFBUUMsU0FBUixHQUFzQmQsVUFBdEIsQ0FBUWMsU0FBUjs7UUFFQSxJQUFJQSxTQUFKLEVBQWU7VUFDZCxPQUFPMUIsZ0JBQVA7UUFDQSxDQUZELE1BR0s7VUFFSixJQUFJMkIsT0FBTyxHQUFHLENBQUNGLFNBQUQsQ0FBZDtVQUNBLElBQU1HLE1BQU0sR0FBRyxDQUNkLEtBQUtDLG9CQUFMLEVBRGMsRUFFZCxLQUFLQyxnQkFBTCxFQUZjLENBQWY7O1VBS0EsSUFBSSxLQUFLM0IsS0FBTCxDQUFXQyxRQUFmLEVBQXlCO1lBQ3hCd0IsTUFBTSxDQUFDRyxJQUFQLENBQVksS0FBS0MsWUFBTCxFQUFaO1lBQ0EsS0FBS3hCLFdBQUwsR0FBbUIsS0FBbkI7VUFDQSxDQUhELE1BSUssSUFBSSxDQUFDLEtBQUtBLFdBQVYsRUFBdUI7WUFDM0IsS0FBS0EsV0FBTCxHQUFtQixLQUFLeUIsZUFBTCxFQUFuQjtZQUNBTCxNQUFNLENBQUNHLElBQVAsQ0FBWSxLQUFLdkIsV0FBakI7VUFDQSxDQUhJLE1BSUE7WUFDSm9CLE1BQU0sQ0FBQ0csSUFBUCxDQUFZLEtBQUt2QixXQUFqQjtVQUNBOztVQUVELG9CQUFPO1lBQUssU0FBUyxFQUFFbUIsT0FBTyxDQUFDTyxJQUFSLENBQWEsR0FBYjtVQUFoQixHQUFvQ04sTUFBcEMsQ0FBUDtRQUNBO01BQ0Q7SUEzSmU7O0lBQUE7RUFBQSxFQXVCS2pELFNBdkJMOztFQThKakJGLGlCQUFpQixDQUFDLDJCQUFELEVBQThCO0lBQzlDNkMsS0FBSyxFQUFFeEIsRUFBRSxDQUFDLGNBQUQsRUFBaUIsUUFBakIsQ0FEcUM7SUFFOUNxQyxXQUFXLEVBQUVyQyxFQUFFLENBQUMseUVBQUQsRUFBNEUsUUFBNUUsQ0FGK0I7SUFHOUNzQyxJQUFJLGVBQUU7TUFBSyxLQUFLLEVBQUMsSUFBWDtNQUFnQixNQUFNLEVBQUMsSUFBdkI7TUFBNEIsS0FBSyxFQUFDLDRCQUFsQztNQUErRCxRQUFRLEVBQUMsU0FBeEU7TUFBa0YsUUFBUSxFQUFDO0lBQTNGLGdCQUFxRztNQUFNLENBQUMsRUFBQztJQUFSLEVBQXJHLENBSHdDO0lBSTlDQyxRQUFRLEVBQUUsUUFKb0M7SUFLOUNDLFFBQVEsRUFBRSxDQUFDLFNBQUQsQ0FMb0M7SUFNOUNDLE1BQU0sRUFBRSxFQU5zQztJQU85Q0MsVUFBVSxFQUFFLEVBUGtDO0lBUTlDNUIsVUFBVSxFQUFFO01BQ1hjLFNBQVMsRUFBRTtRQUNWZSxJQUFJLEVBQUUsU0FESTtRQUVWQyxPQUFPLEVBQUU7TUFGQyxDQURBO01BS1huQixVQUFVLEVBQUU7UUFDWGtCLElBQUksRUFBRSxRQURLO1FBRVhDLE9BQU8sRUFBRTtNQUZFLENBTEQ7TUFTWDVCLE9BQU8sRUFBRTtRQUNSMkIsSUFBSSxFQUFFLFNBREU7UUFFUkMsT0FBTyxFQUFFLENBRkQ7UUFHUkMsSUFBSSxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7TUFIRTtJQVRFLENBUmtDO0lBdUI5Q0MsT0FBTyxFQUFFO01BQ1JoQyxVQUFVLEVBQUU7UUFDWGMsU0FBUyxFQUFFO01BREE7SUFESixDQXZCcUM7SUE0QjlDbUIsUUFBUSxFQUFFO01BQ1RDLFFBQVEsRUFBRTtJQURELENBNUJvQztJQWdDOUNDLElBQUksRUFBRTlDLE9BaEN3QztJQWlDOUMrQyxJQUFJLEVBQUUsY0FBVTlDLEtBQVYsRUFBaUI7TUFBRSxPQUFPLElBQVA7SUFBYTtFQWpDUSxDQUE5QixDQUFqQjtBQW9DQSxDQWxNQSxFQWtNQytDLE1BQU0sQ0FBQzFFLEVBbE1SLEVBa01ZMkUsTUFsTVosQ0FBRDs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNvRDs7QUFFcEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL2xpc3RpbmctZGF0YS1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy9saXN0aW5nLWRhdGEtZWRpdG9yLnNjc3M/MzU4MCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL2xpc3RpbmctZGF0YS1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgSW5zcGVjdG9yQ29udHJvbHMsIEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IE5vdGljZSwgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIFJhZGlvQ29udHJvbCwgUGFuZWxCb2R5LCBfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbDogSW5wdXRDb250cm9sLCBfX2V4cGVyaW1lbnRhbFNwYWNlcjogU3BhY2VyIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PHJlY3QgZmlsbD1cInVybCgjc3ZnXzE5KVwiIGhlaWdodD1cIjEzNlwiIGlkPVwic3ZnXzFcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjc2XCIgeD1cIjEyLjE3NDk5XCIgeT1cIjE0LjVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCIyMS42MjQ5OVwiIGN5PVwiMjQuMlwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfMlwiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwidXJsKCNzdmdfMTkpXCIgaGVpZ2h0PVwiMTM2XCIgaWQ9XCJzdmdfMTJcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjc2XCIgeD1cIjk5LjAyNDk5XCIgeT1cIjE0LjVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCIxMDguNDc0OTlcIiBjeT1cIjI0LjJcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzEzXCIgcj1cIjUuNTExNTNcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCJ1cmwoI3N2Z18xOSlcIiBoZWlnaHQ9XCIxMzZcIiBpZD1cInN2Z18xNVwiIHJ4PVwiNFwiIHJ5PVwiNFwiIHdpZHRoPVwiNzZcIiB4PVwiMTg1LjgyNDk5XCIgeT1cIjE0LjVcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCIxOTUuMjc0OTlcIiBjeT1cIjI0LjJcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzE2XCIgcj1cIjUuNTExNTNcIiAvPlxuXHRcdDxkZWZzPlxuXHRcdFx0PGxpbmVhckdyYWRpZW50IGlkPVwic3ZnXzE5XCIgeDE9XCIwLjAwMjYyXCIgeDI9XCIxXCIgeTE9XCIwXCIgeTI9XCIxXCI+XG5cdFx0XHRcdDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZThlOGU4XCIgc3RvcE9wYWNpdHk9XCIwLjk5NjA5XCIgLz5cblx0XHRcdFx0PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNlMGUwZTBcIiBzdG9wT3BhY2l0eT1cIjAuOTk2MDlcIiAvPlxuXHRcdFx0PC9saW5lYXJHcmFkaWVudD5cblx0XHQ8L2RlZnM+XG5cdDwvc3ZnPjtcblxuXHRjbGFzcyBMaXN0aW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0XHRlZGl0TW9kZTogdHJ1ZSxcblx0XHRcdFx0dGVybXM6IHtcblx0XHRcdFx0XHRzZWdtZW50OiBbXSxcblx0XHRcdFx0fSxcblx0XHRcdFx0dGVybXNGZXRjaGVkOiBmYWxzZSxcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5sYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5ibG9ja1JlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXHRcdH1cblxuXHRcdGdldEluc3BlY3RvckNvbnRyb2xzKCkge1xuXHRcdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHMga2V5PSdpbnNwZWN0b3InPlxuXHRcdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9e19fKCdTZXR0aW5ncycsICdtZXNzaWEnKX0gPlxuXHRcdFx0XHRcdFx0PFJhZGlvQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1NwbGl0IGNhcmRzIHRvIGNvbHVtbnMgaW4gZ3JpZCB2aWV3IG1vZGUgYnk6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17YXR0cmlidXRlcy5jb2x1bW5zfVxuXHRcdFx0XHRcdFx0XHRvcHRpb25zPXtbXG5cdFx0XHRcdFx0XHRcdFx0eyBsYWJlbDogX18oJ1R3bycsICdtZXNzaWEnKSwgdmFsdWU6IDIgfSxcblx0XHRcdFx0XHRcdFx0XHR7IGxhYmVsOiBfXygnVGhyZWUnLCAnbWVzc2lhJyksIHZhbHVlOiAzIH0sXG5cdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgY29sdW1uczogcGFyc2VJbnQodmFsdWUpIH0pO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PC9JbnNwZWN0b3JDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Z2V0QmxvY2tDb250cm9scygpIHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e3RoaXMuc3RhdGUuZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXt0aGlzLnN0YXRlLmVkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWRpdE1vZGU6ICF0aGlzLnN0YXRlLmVkaXRNb2RlLFxuXHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGdldEJsb2NrRWRpdCgpIHtcblxuXHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKHRoaXMucHJvcHMubmFtZSk7XG5cdFx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17dGhpcy5ibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxwPntfXygnVGhlIGJsb2NrIGNyZWF0ZXMgdGhlIG1haW4gY29udGVudCBvZiB0aGUgc2VhcmNoIHBhZ2UgYW5kIGhhbmRsZXMgc2VhcmNoIHF1ZXJpZXMuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0PFNwYWNlcj5cblx0XHRcdFx0XHRcdFx0PElucHV0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQmxvY2sgdGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsUG9zaXRpb249J3RvcCdcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5ibG9ja1RpdGxlfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgYmxvY2tUaXRsZTogbmV4dFZhbHVlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L1NwYWNlcj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Z2V0QmxvY2tQcmV2aWV3KCkge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIgdGFiSW5kZXg9XCIwXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXt0aGlzLmJsb2NrUmVmfT5cblx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdFx0PHA+e19fKCdQcmV2aWV3IGlzIHRvbyBjb21wbGV4IGFuZCB0b28gYmlnIHRvIHNob3cgaGVyZS4gT3BlbiB0aGUgcGFnZSBpbiBmcm9udCB0byBzZWUgcmVzdWx0cy4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJlbmRlcigpIHtcblx0XHRcdGNvbnN0IHsgYXR0cmlidXRlcyB9ID0gdGhpcy5wcm9wcztcblx0XHRcdGNvbnN0IHsgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuXHRcdFx0Y29uc3QgeyBpc0V4YW1wbGUgfSA9IGF0dHJpYnV0ZXM7XG5cblx0XHRcdGlmIChpc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnNwZWN0b3JDb250cm9scygpLFxuXHRcdFx0XHRcdHRoaXMuZ2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlLmVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2godGhpcy5nZXRCbG9ja0VkaXQoKSk7XG5cdFx0XHRcdFx0dGhpcy5sYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCF0aGlzLmxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0dGhpcy5sYXN0UHJldmlldyA9IHRoaXMuZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2godGhpcy5sYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2godGhpcy5sYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT57cmVuZGVyfTwvZGl2Pjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLWxpc3RpbmctZGF0YScsIHtcblx0XHR0aXRsZTogX18oJ0xpc3RpbmcgZGF0YScsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ0NyZWF0ZXMgdGhlIG1haW4gY29udGVudCBvZiB0aGUgc2VhcmNoIHBhZ2UgYW5kIGhhbmRsZXMgc2VhcmNoIHF1ZXJpZXMuJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGxSdWxlPVwiZXZlbm9kZFwiIGNsaXBSdWxlPVwiZXZlbm9kZFwiPjxwYXRoIGQ9XCJNMTIgMTZjMS42NTYgMCAzIDEuMzQ0IDMgM3MtMS4zNDQgMy0zIDMtMy0xLjM0NC0zLTMgMS4zNDQtMyAzLTN6bTAgMWMxLjEwNCAwIDIgLjg5NiAyIDJzLS44OTYgMi0yIDItMi0uODk2LTItMiAuODk2LTIgMi0yem0wLThjMS42NTYgMCAzIDEuMzQ0IDMgM3MtMS4zNDQgMy0zIDMtMy0xLjM0NC0zLTMgMS4zNDQtMyAzLTN6bTAgMWMxLjEwNCAwIDIgLjg5NiAyIDJzLS44OTYgMi0yIDItMi0uODk2LTItMiAuODk2LTIgMi0yem0wLThjMS42NTYgMCAzIDEuMzQ0IDMgM3MtMS4zNDQgMy0zIDMtMy0xLjM0NC0zLTMgMS4zNDQtMyAzLTN6bTAgMWMxLjEwNCAwIDIgLjg5NiAyIDJzLS44OTYgMi0yIDItMi0uODk2LTItMiAuODk2LTIgMi0yelwiIC8+PC9zdmc+LFxuXHRcdGNhdGVnb3J5OiAnbWVzc2lhJyxcblx0XHRrZXl3b3JkczogWydsaXN0aW5nJ10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRpc0V4YW1wbGU6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRibG9ja1RpdGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdH0sXG5cdFx0XHRjb2x1bW5zOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogMyxcblx0XHRcdFx0ZW51bTogWzIsIDNdLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogZmFsc2UsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IExpc3RpbmcsXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3MvbGlzdGluZy1kYXRhLWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9saXN0aW5nLWRhdGEtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsIkNvbXBvbmVudCIsImVsZW1lbnQiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsImJsb2NrRWRpdG9yIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiY29tcG9uZW50cyIsIk5vdGljZSIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiUmFkaW9Db250cm9sIiwiUGFuZWxCb2R5IiwiSW5wdXRDb250cm9sIiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJTcGFjZXIiLCJfX2V4cGVyaW1lbnRhbFNwYWNlciIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJMaXN0aW5nIiwicHJvcHMiLCJzdGF0ZSIsImVkaXRNb2RlIiwidGVybXMiLCJzZWdtZW50IiwidGVybXNGZXRjaGVkIiwibGFzdFByZXZpZXciLCJibG9ja1JlZiIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjb2x1bW5zIiwibGFiZWwiLCJ2YWx1ZSIsInBhcnNlSW50Iiwic2V0U3RhdGUiLCJibG9jayIsImdldEJsb2NrVHlwZSIsIm5hbWUiLCJ0aXRsZSIsImJsb2NrVGl0bGUiLCJuZXh0VmFsdWUiLCJjbGFzc05hbWUiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwicmVuZGVyIiwiZ2V0SW5zcGVjdG9yQ29udHJvbHMiLCJnZXRCbG9ja0NvbnRyb2xzIiwicHVzaCIsImdldEJsb2NrRWRpdCIsImdldEJsb2NrUHJldmlldyIsImpvaW4iLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZW51bSIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
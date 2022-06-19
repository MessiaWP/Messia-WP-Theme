/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/listing-filters-editor.jsx":
/*!**************************************************!*\
  !*** ./src/js/blocks/listing-filters-editor.jsx ***!
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
      InputControl = _wp$components.__experimentalInputControl,
      Spacer = _wp$components.__experimentalSpacer;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "m118.9118,36.05693c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-20.19264,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.05521 -1.97983,1.00174 -1.9246,2.11393c0.05521,1.11217 1.00174,1.97981 2.11391,1.9246l20.19264,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l50.4816,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-50.4816,0zm24.23117,24.23117c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-56.53939,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.05521 -1.97983,1.00174 -1.9246,2.11393c0.05521,1.11217 1.00174,1.97981 2.11391,1.9246l56.53939,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l14.13485,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-14.13485,0zm-54.52013,24.23117c-3.32074,0 -6.05779,2.73705 -6.05779,6.05779l0,4.03853l-14.13485,0c-0.0631,0 -0.1262,0 -0.18931,0c-0.0631,0 -0.1262,0 -0.18931,0c-1.11217,0.10254 -1.9325,1.0964 -1.82996,2.20857c0.10254,1.11217 1.0964,1.9325 2.20857,1.82996l14.13485,0l0,4.03853c0,3.32074 2.73705,6.05779 6.05779,6.05779l4.03853,0c3.32074,0 6.05779,-2.73705 6.05779,-6.05779l0,-12.11558c0,-3.32074 -2.73705,-6.05779 -6.05779,-6.05779l-4.03853,0zm0,4.03853l4.03853,0c1.14373,0 2.01926,0.87553 2.01926,2.01926l0,12.11558c0,1.14373 -0.87553,2.01926 -2.01926,2.01926l-4.03853,0c-1.14373,0 -2.01926,-0.87553 -2.01926,-2.01926l0,-5.67918c0.05521,-0.26818 0.05521,-0.55215 0,-0.82033l0,-5.61608c0,-1.14373 0.87553,-2.01926 2.01926,-2.01926zm12.11558,6.05779l0,4.03853l56.53939,0c0.72568,0.0079 1.40401,-0.37072 1.77475,-1.00174c0.36282,-0.63102 0.36282,-1.40403 0,-2.03505c-0.37074,-0.63102 -1.04907,-1.00963 -1.77475,-1.00174l-56.53939,0z",
    fill: "black"
  })));
  var lastPreview = false;

  function SearchFiltersFn(props) {
    var attributes = props.attributes,
        setAttributes = props.setAttributes,
        className = props.className,
        name = props.name;

    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        editMode = _useState2[0],
        setEditMode = _useState2[1];

    var filtersRef = useRef();
    var idNameMap = {
      'messia_reset': __('Reset', 'messia'),
      'messia_search': __('Search', 'messia'),
      'messia_constructor': __('Custom fields', 'messia'),
      'messia_object_category': __('Categories', 'messia'),
      'messia_object_property': __('Properties', 'messia')
    };

    var getExample = function getExample() {
      return exampleImageData;
    };

    var sortableInit = function sortableInit() {
      $(filtersRef.current).not('ui-sortable').sortable({
        forceHelperSize: true,
        forcePlaceholderSize: true,
        opacity: 1,
        //distance: 10,
        tolerance: 'intersect',
        //cursor: 'grabbig',
        scroll: true,
        scrollSensitivity: 20,
        containment: '.edit-widgets-block-editor',
        placeholder: 'sortable-placeholder',
        handle: '.reorder-filter',
        //zIndex: 10000,
        start: function start(event, ui) {
          ui.item.addClass('is-elevated');
          $('body').addClass('cursor-grabbing');
        },
        beforeStop: function beforeStop(event, ui) {
          $('body').removeClass('cursor-grabbing');
        },
        stop: function stop(event, ui) {
          ui.item.removeClass('is-elevated');
          saveOrder();
        }
      });
    };

    var saveOrder = function saveOrder() {
      var store = [],
          filters = $(filtersRef.current).find('.search-filter');

      var _loop = function _loop(i) {
        var filter = $(filters[i]),
            filterAttr = attributes.filtersOrder.find(function (item) {
          return item.id === filter.attr('id');
        });
        store.push(filterAttr);
      };

      for (var i = 0; i < filters.length; i++) {
        _loop(i);
      }

      setAttributes({
        filtersOrder: store
      });
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
      }, /*#__PURE__*/React.createElement("p", null, __('Notes: Block works only at valid segment page.', 'messia'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spacer, null, /*#__PURE__*/React.createElement(InputControl, {
        label: __('Block title:', 'messia'),
        labelPosition: "top",
        value: attributes.blockTitle,
        onChange: function onChange(nextValue) {
          setAttributes({
            blockTitle: nextValue
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "filters-order-wrapper"
      }, /*#__PURE__*/React.createElement("h3", null, __('Order of filter groups:', 'messia')), /*#__PURE__*/React.createElement("div", {
        className: "filters-order-drop-zone",
        ref: filtersRef
      }, attributes.filtersOrder.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          key: item.id,
          id: item.id,
          className: "search-filter"
        }, /*#__PURE__*/React.createElement("div", {
          className: "search-filter-inner"
        }, /*#__PURE__*/React.createElement("div", {
          className: "reorder-filter"
        }, "\u2261"), /*#__PURE__*/React.createElement("div", null, idNameMap[item.id]), /*#__PURE__*/React.createElement(InputControl, {
          label: __('Title:', 'messia'),
          labelPosition: "left",
          value: item.title,
          onChange: function onChange(nextValue) {
            var nextAttr = attributes.filtersOrder.map(function (filter) {
              if (filter.id === item.id) {
                filter.title = nextValue;
              }

              return filter;
            });
            setAttributes({
              filtersOrder: nextAttr
            });
          }
        })));
      })))));
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

    useEffect(function () {
      sortableInit();
    }, [editMode]);
    return render();
  }

  registerBlockType('messia/block-listing-filters', {
    title: __('Listing filters', 'messia'),
    description: __('Set of filters coordinated on the basis of data categories and properties of the site', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m10.26818,0.68033c-0.23253,0 -0.43057,0.16886 -0.46806,0.39855l-0.45323,2.77778c-0.56851,0.16324 -1.11543,0.38776 -1.63126,0.67012l-2.29211,-1.63775c-0.1884,-0.13477 -0.448,-0.11367 -0.61172,0.05005l-1.84537,1.84444c-0.16277,0.16277 -0.18523,0.41962 -0.05283,0.60802l1.61273,2.30694c-0.28663,0.51963 -0.5156,1.06915 -0.68216,1.64146l-2.76666,0.46157c-0.22873,0.03796 -0.39669,0.23508 -0.39669,0.46714l0,2.61002c0,0.23016 0.16477,0.42727 0.39113,0.46713l2.76759,0.49123c0.16562,0.57041 0.39364,1.1204 0.68216,1.64146l-1.63311,2.28377c-0.13477,0.18887 -0.11274,0.44753 0.05098,0.61173l1.84444,1.84722c0.16324,0.16324 0.42104,0.18476 0.60802,0.05283l2.31157,-1.61828c0.51963,0.28568 1.06696,0.51148 1.63404,0.67567l0.46343,2.78149c0.03796,0.22873 0.23508,0.39669 0.46714,0.39669l2.61002,0c0.22968,0 0.4268,-0.16477 0.46713,-0.39113l0.1242,-0.70163c-0.30086,-0.21972 -0.57893,-0.46677 -0.83139,-0.73963l-0.15756,0.88329l-1.80922,0l-0.44767,-2.68695c-0.03085,-0.18745 -0.16994,-0.33723 -0.35406,-0.38279c-0.68383,-0.16847 -1.33895,-0.43913 -1.94732,-0.80358c-0.16135,-0.09681 -0.36345,-0.08964 -0.51626,0.01761l-2.23187,1.5636l-1.27906,-1.27998l1.57658,-2.20591c0.1101,-0.15423 0.11862,-0.35952 0.02039,-0.52182c-0.36778,-0.6079 -0.64156,-1.26526 -0.81193,-1.95288c-0.04556,-0.18175 -0.19356,-0.31994 -0.37816,-0.35221l-2.67212,-0.47362l0,-1.81014l2.67027,-0.44489c0.1865,-0.03085 0.33676,-0.16996 0.38279,-0.35313c0.17321,-0.69142 0.44557,-1.34783 0.81192,-1.95288c0.09728,-0.16087 0.09057,-0.36435 -0.01668,-0.51811l-1.55897,-2.22909l1.27999,-1.27906l2.2124,1.58121c0.15328,0.1101 0.35767,0.11955 0.51996,0.02132c0.60315,-0.36208 1.25873,-0.63094 1.94825,-0.79988c0.18507,-0.04556 0.32414,-0.19672 0.35499,-0.38464l0.43747,-2.68324l1.80829,0l0.47177,2.69807c0.03227,0.18507 0.16998,0.33352 0.35221,0.37908c0.68383,0.17036 1.33765,0.44329 1.94176,0.80821c0.16277,0.09871 0.36804,0.08973 0.52275,-0.02132l2.21981,-1.59604l1.27906,1.27813l-1.58121,2.25411c-0.1082,0.15328 -0.11487,0.35539 -0.01854,0.51626c0.36018,0.59936 0.62856,1.25011 0.79988,1.93156c0.04603,0.18413 0.19719,0.32276 0.38464,0.35313l2.70827,0.44303l0,1.80829l-0.88514,0.15478c0.27381,0.25293 0.52177,0.53188 0.74148,0.83417l0.69978,-0.12327c0.22731,-0.03986 0.39206,-0.23698 0.39206,-0.46714l0,-2.61002c0,-0.23253 -0.16886,-0.43057 -0.39855,-0.46806l-2.80374,-0.45879c-0.16467,-0.56282 -0.38871,-1.10347 -0.67012,-1.61551l1.63683,-2.33289c0.1324,-0.1884 0.10994,-0.44525 -0.05283,-0.60802l-1.84629,-1.84537c-0.16419,-0.1642 -0.42378,-0.18532 -0.61265,-0.04913l-2.29767,1.65165c-0.51678,-0.28568 -1.0628,-0.51146 -1.62941,-0.6766l-0.48845,-2.79446c-0.04034,-0.22731 -0.23791,-0.39299 -0.46806,-0.39299l-2.61002,0zm1.32633,7.11824c-2.09324,0 -3.79639,1.70316 -3.79639,3.79639c0,1.99738 1.55149,3.63585 3.51185,3.78249c0.08447,-0.32459 0.19605,-0.63853 0.33367,-0.93798c-0.01661,0 -0.03252,0.00278 -0.04913,0.00278c-1.57028,0 -2.8473,-1.27701 -2.8473,-2.8473c0,-1.57028 1.27701,-2.8473 2.8473,-2.8473c1.57028,0 2.8473,1.27701 2.8473,2.8473c0,0.01661 -0.00278,0.03252 -0.00278,0.04913c0.29944,-0.13762 0.61338,-0.2492 0.93798,-0.33367c-0.14664,-1.96036 -1.78511,-3.51185 -3.78249,-3.51185zm5.22004,4.27094c-2.61524,0 -4.74549,2.13025 -4.74549,4.74549c0,2.61524 2.13025,4.74549 4.74549,4.74549c1.13726,0 2.18169,-0.40385 3.00023,-1.07422l2.83339,2.83339l0.67104,-0.67104l-2.83339,-2.83339c0.67038,-0.81854 1.07422,-1.86297 1.07422,-3.00023c0,-2.61524 -2.13025,-4.74549 -4.74549,-4.74549zm0,0.9491c2.10231,0 3.79639,1.69408 3.79639,3.79639c0,2.10231 -1.69408,3.79639 -3.79639,3.79639c-2.10231,0 -3.79639,-1.69408 -3.79639,-3.79639c0,-2.10231 1.69408,-3.79639 3.79639,-3.79639z",
      fill: "black",
      id: "svg_1"
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
      blockTitle: {
        type: 'string',
        default: ''
      },
      filtersOrder: {
        type: 'array',
        default: [{
          id: 'messia_reset',
          title: ''
        }, {
          id: 'messia_search',
          title: ''
        }, {
          id: 'messia_constructor',
          title: ''
        }, {
          id: 'messia_object_category',
          title: ''
        }, {
          id: 'messia_object_property',
          title: ''
        }]
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
    edit: SearchFiltersFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/listing-filters-editor.scss":
/*!*****************************************************!*\
  !*** ./src/scss/blocks/listing-filters-editor.scss ***!
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
  !*** ./src/entries/blocks/listing-filters-editor.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_listing_filters_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/listing-filters-editor.scss */ "./src/scss/blocks/listing-filters-editor.scss");
/* harmony import */ var _js_blocks_listing_filters_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/listing-filters-editor.jsx */ "./src/js/blocks/listing-filters-editor.jsx");
/* harmony import */ var _js_blocks_listing_filters_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_listing_filters_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1saXN0aW5nLWZpbHRlcnMtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQVYsRUFBY0MsQ0FBZCxFQUFpQjtFQUVqQixJQUFRQyxpQkFBUixHQUE4QkYsRUFBRSxDQUFDRyxNQUFqQyxDQUFRRCxpQkFBUjtFQUNBLGtCQUE2REYsRUFBRSxDQUFDSSxPQUFoRTtFQUFBLElBQVFDLFNBQVIsZUFBUUEsU0FBUjtFQUFBLElBQW1CQyxRQUFuQixlQUFtQkEsUUFBbkI7RUFBQSxJQUE2QkMsUUFBN0IsZUFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGVBQXVDQSxTQUF2QztFQUFBLElBQWtEQyxNQUFsRCxlQUFrREEsTUFBbEQ7RUFDQSxJQUEwQkMsZ0JBQTFCLEdBQStDVixFQUEvQyxDQUFRVyxnQkFBUjtFQUNBLElBQVFDLGFBQVIsR0FBMEJaLEVBQUUsQ0FBQ2EsV0FBN0IsQ0FBUUQsYUFBUjtFQUNBLHFCQUErSVosRUFBRSxDQUFDYyxVQUFsSjtFQUFBLElBQVFDLFlBQVIsa0JBQVFBLFlBQVI7RUFBQSxJQUFzQkMsYUFBdEIsa0JBQXNCQSxhQUF0QjtFQUFBLElBQXFDQyxXQUFyQyxrQkFBcUNBLFdBQXJDO0VBQUEsSUFBa0RDLFFBQWxELGtCQUFrREEsUUFBbEQ7RUFBQSxJQUE0REMsTUFBNUQsa0JBQTREQSxNQUE1RDtFQUFBLElBQWdHQyxZQUFoRyxrQkFBb0VDLDBCQUFwRTtFQUFBLElBQW9JQyxNQUFwSSxrQkFBOEdDLG9CQUE5RztFQUNBLElBQVFDLEVBQVIsR0FBZXhCLEVBQUUsQ0FBQ3lCLElBQWxCLENBQVFELEVBQVI7RUFDQSxJQUFNRSxnQkFBZ0IsZ0JBQUc7SUFBSyxPQUFPLEVBQUMsYUFBYjtJQUEyQixLQUFLLEVBQUM7RUFBakMsZ0JBQ3hCLDRDQUNDO0lBQU0sQ0FBQyxFQUFDLHNvRkFBUjtJQUErb0YsSUFBSSxFQUFDO0VB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QUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDdUQ7O0FBRXZEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9saXN0aW5nLWZpbHRlcnMtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3MvbGlzdGluZy1maWx0ZXJzLWVkaXRvci5zY3NzPzBjMDQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9saXN0aW5nLWZpbHRlcnMtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50LCBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFRvb2xiYXJHcm91cCwgVG9vbGJhckJ1dHRvbiwgUGxhY2Vob2xkZXIsIERpc2FibGVkLCBOb3RpY2UsIF9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sOiBJbnB1dENvbnRyb2wsIF9fZXhwZXJpbWVudGFsU3BhY2VyOiBTcGFjZXIgfSA9IHdwLmNvbXBvbmVudHM7XG5cdGNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5cdGNvbnN0IGV4YW1wbGVJbWFnZURhdGEgPSA8c3ZnIHZpZXdCb3g9XCIwIDAgMjc0IDE2NVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8Zz5cblx0XHRcdDxwYXRoIGQ9XCJtMTE4LjkxMTgsMzYuMDU2OTNjLTMuMzIwNzQsMCAtNi4wNTc3OSwyLjczNzA1IC02LjA1Nzc5LDYuMDU3NzlsMCw0LjAzODUzbC0yMC4xOTI2NCwwYy0wLjA2MzEsMCAtMC4xMjYyLDAgLTAuMTg5MzEsMGMtMS4xMTIxNywwLjA1NTIxIC0xLjk3OTgzLDEuMDAxNzQgLTEuOTI0NiwyLjExMzkzYzAuMDU1MjEsMS4xMTIxNyAxLjAwMTc0LDEuOTc5ODEgMi4xMTM5MSwxLjkyNDZsMjAuMTkyNjQsMGwwLDQuMDM4NTNjMCwzLjMyMDc0IDIuNzM3MDUsNi4wNTc3OSA2LjA1Nzc5LDYuMDU3NzlsNC4wMzg1MywwYzMuMzIwNzQsMCA2LjA1Nzc5LC0yLjczNzA1IDYuMDU3NzksLTYuMDU3NzlsMCwtMTIuMTE1NThjMCwtMy4zMjA3NCAtMi43MzcwNSwtNi4wNTc3OSAtNi4wNTc3OSwtNi4wNTc3OWwtNC4wMzg1Mywwem0wLDQuMDM4NTNsNC4wMzg1MywwYzEuMTQzNzMsMCAyLjAxOTI2LDAuODc1NTMgMi4wMTkyNiwyLjAxOTI2bDAsMTIuMTE1NThjMCwxLjE0MzczIC0wLjg3NTUzLDIuMDE5MjYgLTIuMDE5MjYsMi4wMTkyNmwtNC4wMzg1MywwYy0xLjE0MzczLDAgLTIuMDE5MjYsLTAuODc1NTMgLTIuMDE5MjYsLTIuMDE5MjZsMCwtNS42NzkxOGMwLjA1NTIxLC0wLjI2ODE4IDAuMDU1MjEsLTAuNTUyMTUgMCwtMC44MjAzM2wwLC01LjYxNjA4YzAsLTEuMTQzNzMgMC44NzU1MywtMi4wMTkyNiAyLjAxOTI2LC0yLjAxOTI2em0xMi4xMTU1OCw2LjA1Nzc5bDAsNC4wMzg1M2w1MC40ODE2LDBjMC43MjU2OCwwLjAwNzkgMS40MDQwMSwtMC4zNzA3MiAxLjc3NDc1LC0xLjAwMTc0YzAuMzYyODIsLTAuNjMxMDIgMC4zNjI4MiwtMS40MDQwMyAwLC0yLjAzNTA1Yy0wLjM3MDc0LC0wLjYzMTAyIC0xLjA0OTA3LC0xLjAwOTYzIC0xLjc3NDc1LC0xLjAwMTc0bC01MC40ODE2LDB6bTI0LjIzMTE3LDI0LjIzMTE3Yy0zLjMyMDc0LDAgLTYuMDU3NzksMi43MzcwNSAtNi4wNTc3OSw2LjA1Nzc5bDAsNC4wMzg1M2wtNTYuNTM5MzksMGMtMC4wNjMxLDAgLTAuMTI2MiwwIC0wLjE4OTMxLDBjLTEuMTEyMTcsMC4wNTUyMSAtMS45Nzk4MywxLjAwMTc0IC0xLjkyNDYsMi4xMTM5M2MwLjA1NTIxLDEuMTEyMTcgMS4wMDE3NCwxLjk3OTgxIDIuMTEzOTEsMS45MjQ2bDU2LjUzOTM5LDBsMCw0LjAzODUzYzAsMy4zMjA3NCAyLjczNzA1LDYuMDU3NzkgNi4wNTc3OSw2LjA1Nzc5bDQuMDM4NTMsMGMzLjMyMDc0LDAgNi4wNTc3OSwtMi43MzcwNSA2LjA1Nzc5LC02LjA1Nzc5bDAsLTEyLjExNTU4YzAsLTMuMzIwNzQgLTIuNzM3MDUsLTYuMDU3NzkgLTYuMDU3NzksLTYuMDU3NzlsLTQuMDM4NTMsMHptMCw0LjAzODUzbDQuMDM4NTMsMGMxLjE0MzczLDAgMi4wMTkyNiwwLjg3NTUzIDIuMDE5MjYsMi4wMTkyNmwwLDEyLjExNTU4YzAsMS4xNDM3MyAtMC44NzU1MywyLjAxOTI2IC0yLjAxOTI2LDIuMDE5MjZsLTQuMDM4NTMsMGMtMS4xNDM3MywwIC0yLjAxOTI2LC0wLjg3NTUzIC0yLjAxOTI2LC0yLjAxOTI2bDAsLTUuNjc5MThjMC4wNTUyMSwtMC4yNjgxOCAwLjA1NTIxLC0wLjU1MjE1IDAsLTAuODIwMzNsMCwtNS42MTYwOGMwLC0xLjE0MzczIDAuODc1NTMsLTIuMDE5MjYgMi4wMTkyNiwtMi4wMTkyNnptMTIuMTE1NTgsNi4wNTc3OWwwLDQuMDM4NTNsMTQuMTM0ODUsMGMwLjcyNTY4LDAuMDA3OSAxLjQwNDAxLC0wLjM3MDcyIDEuNzc0NzUsLTEuMDAxNzRjMC4zNjI4MiwtMC42MzEwMiAwLjM2MjgyLC0xLjQwNDAzIDAsLTIuMDM1MDVjLTAuMzcwNzQsLTAuNjMxMDIgLTEuMDQ5MDcsLTEuMDA5NjMgLTEuNzc0NzUsLTEuMDAxNzRsLTE0LjEzNDg1LDB6bS01NC41MjAxMywyNC4yMzExN2MtMy4zMjA3NCwwIC02LjA1Nzc5LDIuNzM3MDUgLTYuMDU3NzksNi4wNTc3OWwwLDQuMDM4NTNsLTE0LjEzNDg1LDBjLTAuMDYzMSwwIC0wLjEyNjIsMCAtMC4xODkzMSwwYy0wLjA2MzEsMCAtMC4xMjYyLDAgLTAuMTg5MzEsMGMtMS4xMTIxNywwLjEwMjU0IC0xLjkzMjUsMS4wOTY0IC0xLjgyOTk2LDIuMjA4NTdjMC4xMDI1NCwxLjExMjE3IDEuMDk2NCwxLjkzMjUgMi4yMDg1NywxLjgyOTk2bDE0LjEzNDg1LDBsMCw0LjAzODUzYzAsMy4zMjA3NCAyLjczNzA1LDYuMDU3NzkgNi4wNTc3OSw2LjA1Nzc5bDQuMDM4NTMsMGMzLjMyMDc0LDAgNi4wNTc3OSwtMi43MzcwNSA2LjA1Nzc5LC02LjA1Nzc5bDAsLTEyLjExNTU4YzAsLTMuMzIwNzQgLTIuNzM3MDUsLTYuMDU3NzkgLTYuMDU3NzksLTYuMDU3NzlsLTQuMDM4NTMsMHptMCw0LjAzODUzbDQuMDM4NTMsMGMxLjE0MzczLDAgMi4wMTkyNiwwLjg3NTUzIDIuMDE5MjYsMi4wMTkyNmwwLDEyLjExNTU4YzAsMS4xNDM3MyAtMC44NzU1MywyLjAxOTI2IC0yLjAxOTI2LDIuMDE5MjZsLTQuMDM4NTMsMGMtMS4xNDM3MywwIC0yLjAxOTI2LC0wLjg3NTUzIC0yLjAxOTI2LC0yLjAxOTI2bDAsLTUuNjc5MThjMC4wNTUyMSwtMC4yNjgxOCAwLjA1NTIxLC0wLjU1MjE1IDAsLTAuODIwMzNsMCwtNS42MTYwOGMwLC0xLjE0MzczIDAuODc1NTMsLTIuMDE5MjYgMi4wMTkyNiwtMi4wMTkyNnptMTIuMTE1NTgsNi4wNTc3OWwwLDQuMDM4NTNsNTYuNTM5MzksMGMwLjcyNTY4LDAuMDA3OSAxLjQwNDAxLC0wLjM3MDcyIDEuNzc0NzUsLTEuMDAxNzRjMC4zNjI4MiwtMC42MzEwMiAwLjM2MjgyLC0xLjQwNDAzIDAsLTIuMDM1MDVjLTAuMzcwNzQsLTAuNjMxMDIgLTEuMDQ5MDcsLTEuMDA5NjMgLTEuNzc0NzUsLTEuMDAxNzRsLTU2LjUzOTM5LDB6XCIgZmlsbD1cImJsYWNrXCIgLz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBTZWFyY2hGaWx0ZXJzRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblx0XHRjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXG5cdFx0bGV0IGZpbHRlcnNSZWYgPSB1c2VSZWYoKTtcblxuXHRcdGNvbnN0IGlkTmFtZU1hcCA9IHtcblx0XHRcdCdtZXNzaWFfcmVzZXQnOiBfXygnUmVzZXQnLCAnbWVzc2lhJyksXG5cdFx0XHQnbWVzc2lhX3NlYXJjaCc6IF9fKCdTZWFyY2gnLCAnbWVzc2lhJyksXG5cdFx0XHQnbWVzc2lhX2NvbnN0cnVjdG9yJzogX18oJ0N1c3RvbSBmaWVsZHMnLCAnbWVzc2lhJyksXG5cdFx0XHQnbWVzc2lhX29iamVjdF9jYXRlZ29yeSc6IF9fKCdDYXRlZ29yaWVzJywgJ21lc3NpYScpLFxuXHRcdFx0J21lc3NpYV9vYmplY3RfcHJvcGVydHknOiBfXygnUHJvcGVydGllcycsICdtZXNzaWEnKSxcblx0XHR9XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc29ydGFibGVJbml0ID0gKCkgPT4ge1xuXG5cdFx0XHQkKGZpbHRlcnNSZWYuY3VycmVudCkubm90KCd1aS1zb3J0YWJsZScpLnNvcnRhYmxlKHtcblx0XHRcdFx0Zm9yY2VIZWxwZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdFx0Ly9kaXN0YW5jZTogMTAsXG5cdFx0XHRcdHRvbGVyYW5jZTogJ2ludGVyc2VjdCcsXG5cdFx0XHRcdC8vY3Vyc29yOiAnZ3JhYmJpZycsXG5cdFx0XHRcdHNjcm9sbDogdHJ1ZSxcblx0XHRcdFx0c2Nyb2xsU2Vuc2l0aXZpdHk6IDIwLFxuXHRcdFx0XHRjb250YWlubWVudDogJy5lZGl0LXdpZGdldHMtYmxvY2stZWRpdG9yJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdzb3J0YWJsZS1wbGFjZWhvbGRlcicsXG5cdFx0XHRcdGhhbmRsZTogJy5yZW9yZGVyLWZpbHRlcicsXG5cdFx0XHRcdC8vekluZGV4OiAxMDAwMCxcblx0XHRcdFx0c3RhcnQ6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5pdGVtLmFkZENsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJlZm9yZVN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaXRlbS5yZW1vdmVDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHRzYXZlT3JkZXIoKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNhdmVPcmRlciA9ICgpID0+IHtcblxuXHRcdFx0Y29uc3Rcblx0XHRcdFx0c3RvcmUgPSBbXSxcblx0XHRcdFx0ZmlsdGVycyA9ICQoZmlsdGVyc1JlZi5jdXJyZW50KS5maW5kKCcuc2VhcmNoLWZpbHRlcicpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRmaWx0ZXIgPSAkKGZpbHRlcnNbaV0pLFxuXHRcdFx0XHRcdGZpbHRlckF0dHIgPSBhdHRyaWJ1dGVzLmZpbHRlcnNPcmRlci5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBmaWx0ZXIuYXR0cignaWQnKSk7XG5cblx0XHRcdFx0c3RvcmUucHVzaChmaWx0ZXJBdHRyKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0QXR0cmlidXRlcyh7IGZpbHRlcnNPcmRlcjogc3RvcmUgfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8cD57X18oJ05vdGVzOiBCbG9jayB3b3JrcyBvbmx5IGF0IHZhbGlkIHNlZ21lbnQgcGFnZS4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHQ8U3BhY2VyPlxuXHRcdFx0XHRcdFx0XHRcdDxJbnB1dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQmxvY2sgdGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj0ndG9wJ1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuYmxvY2tUaXRsZX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBibG9ja1RpdGxlOiBuZXh0VmFsdWUgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvU3BhY2VyPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbHRlcnMtb3JkZXItd3JhcHBlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDM+e19fKCdPcmRlciBvZiBmaWx0ZXIgZ3JvdXBzOicsICdtZXNzaWEnKX08L2gzPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpbHRlcnMtb3JkZXItZHJvcC16b25lXCIgcmVmPXtmaWx0ZXJzUmVmfT5cblx0XHRcdFx0XHRcdFx0XHR7YXR0cmlidXRlcy5maWx0ZXJzT3JkZXIubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l0ZW0uaWR9IGlkPXtpdGVtLmlkfSBjbGFzc05hbWU9XCJzZWFyY2gtZmlsdGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWZpbHRlci1pbm5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVvcmRlci1maWx0ZXJcIj4mZXF1aXY7PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj57aWROYW1lTWFwW2l0ZW0uaWRdfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxJbnB1dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVGl0bGU6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj0nbGVmdCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtpdGVtLnRpdGxlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IG5leHRBdHRyID0gYXR0cmlidXRlcy5maWx0ZXJzT3JkZXIubWFwKChmaWx0ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsdGVyLmlkID09PSBpdGVtLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWx0ZXIudGl0bGUgPSBuZXh0VmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXI7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZmlsdGVyc09yZGVyOiBuZXh0QXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiPlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblx0XHRcdHNvcnRhYmxlSW5pdCgpO1xuXHRcdH0sIFtlZGl0TW9kZV0pO1xuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1saXN0aW5nLWZpbHRlcnMnLCB7XG5cdFx0dGl0bGU6IF9fKCdMaXN0aW5nIGZpbHRlcnMnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdTZXQgb2YgZmlsdGVycyBjb29yZGluYXRlZCBvbiB0aGUgYmFzaXMgb2YgZGF0YSBjYXRlZ29yaWVzIGFuZCBwcm9wZXJ0aWVzIG9mIHRoZSBzaXRlJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnPjxwYXRoIGQ9XCJtMTAuMjY4MTgsMC42ODAzM2MtMC4yMzI1MywwIC0wLjQzMDU3LDAuMTY4ODYgLTAuNDY4MDYsMC4zOTg1NWwtMC40NTMyMywyLjc3Nzc4Yy0wLjU2ODUxLDAuMTYzMjQgLTEuMTE1NDMsMC4zODc3NiAtMS42MzEyNiwwLjY3MDEybC0yLjI5MjExLC0xLjYzNzc1Yy0wLjE4ODQsLTAuMTM0NzcgLTAuNDQ4LC0wLjExMzY3IC0wLjYxMTcyLDAuMDUwMDVsLTEuODQ1MzcsMS44NDQ0NGMtMC4xNjI3NywwLjE2Mjc3IC0wLjE4NTIzLDAuNDE5NjIgLTAuMDUyODMsMC42MDgwMmwxLjYxMjczLDIuMzA2OTRjLTAuMjg2NjMsMC41MTk2MyAtMC41MTU2LDEuMDY5MTUgLTAuNjgyMTYsMS42NDE0NmwtMi43NjY2NiwwLjQ2MTU3Yy0wLjIyODczLDAuMDM3OTYgLTAuMzk2NjksMC4yMzUwOCAtMC4zOTY2OSwwLjQ2NzE0bDAsMi42MTAwMmMwLDAuMjMwMTYgMC4xNjQ3NywwLjQyNzI3IDAuMzkxMTMsMC40NjcxM2wyLjc2NzU5LDAuNDkxMjNjMC4xNjU2MiwwLjU3MDQxIDAuMzkzNjQsMS4xMjA0IDAuNjgyMTYsMS42NDE0NmwtMS42MzMxMSwyLjI4Mzc3Yy0wLjEzNDc3LDAuMTg4ODcgLTAuMTEyNzQsMC40NDc1MyAwLjA1MDk4LDAuNjExNzNsMS44NDQ0NCwxLjg0NzIyYzAuMTYzMjQsMC4xNjMyNCAwLjQyMTA0LDAuMTg0NzYgMC42MDgwMiwwLjA1MjgzbDIuMzExNTcsLTEuNjE4MjhjMC41MTk2MywwLjI4NTY4IDEuMDY2OTYsMC41MTE0OCAxLjYzNDA0LDAuNjc1NjdsMC40NjM0MywyLjc4MTQ5YzAuMDM3OTYsMC4yMjg3MyAwLjIzNTA4LDAuMzk2NjkgMC40NjcxNCwwLjM5NjY5bDIuNjEwMDIsMGMwLjIyOTY4LDAgMC40MjY4LC0wLjE2NDc3IDAuNDY3MTMsLTAuMzkxMTNsMC4xMjQyLC0wLjcwMTYzYy0wLjMwMDg2LC0wLjIxOTcyIC0wLjU3ODkzLC0wLjQ2Njc3IC0wLjgzMTM5LC0wLjczOTYzbC0wLjE1NzU2LDAuODgzMjlsLTEuODA5MjIsMGwtMC40NDc2NywtMi42ODY5NWMtMC4wMzA4NSwtMC4xODc0NSAtMC4xNjk5NCwtMC4zMzcyMyAtMC4zNTQwNiwtMC4zODI3OWMtMC42ODM4MywtMC4xNjg0NyAtMS4zMzg5NSwtMC40MzkxMyAtMS45NDczMiwtMC44MDM1OGMtMC4xNjEzNSwtMC4wOTY4MSAtMC4zNjM0NSwtMC4wODk2NCAtMC41MTYyNiwwLjAxNzYxbC0yLjIzMTg3LDEuNTYzNmwtMS4yNzkwNiwtMS4yNzk5OGwxLjU3NjU4LC0yLjIwNTkxYzAuMTEwMSwtMC4xNTQyMyAwLjExODYyLC0wLjM1OTUyIDAuMDIwMzksLTAuNTIxODJjLTAuMzY3NzgsLTAuNjA3OSAtMC42NDE1NiwtMS4yNjUyNiAtMC44MTE5MywtMS45NTI4OGMtMC4wNDU1NiwtMC4xODE3NSAtMC4xOTM1NiwtMC4zMTk5NCAtMC4zNzgxNiwtMC4zNTIyMWwtMi42NzIxMiwtMC40NzM2MmwwLC0xLjgxMDE0bDIuNjcwMjcsLTAuNDQ0ODljMC4xODY1LC0wLjAzMDg1IDAuMzM2NzYsLTAuMTY5OTYgMC4zODI3OSwtMC4zNTMxM2MwLjE3MzIxLC0wLjY5MTQyIDAuNDQ1NTcsLTEuMzQ3ODMgMC44MTE5MiwtMS45NTI4OGMwLjA5NzI4LC0wLjE2MDg3IDAuMDkwNTcsLTAuMzY0MzUgLTAuMDE2NjgsLTAuNTE4MTFsLTEuNTU4OTcsLTIuMjI5MDlsMS4yNzk5OSwtMS4yNzkwNmwyLjIxMjQsMS41ODEyMWMwLjE1MzI4LDAuMTEwMSAwLjM1NzY3LDAuMTE5NTUgMC41MTk5NiwwLjAyMTMyYzAuNjAzMTUsLTAuMzYyMDggMS4yNTg3MywtMC42MzA5NCAxLjk0ODI1LC0wLjc5OTg4YzAuMTg1MDcsLTAuMDQ1NTYgMC4zMjQxNCwtMC4xOTY3MiAwLjM1NDk5LC0wLjM4NDY0bDAuNDM3NDcsLTIuNjgzMjRsMS44MDgyOSwwbDAuNDcxNzcsMi42OTgwN2MwLjAzMjI3LDAuMTg1MDcgMC4xNjk5OCwwLjMzMzUyIDAuMzUyMjEsMC4zNzkwOGMwLjY4MzgzLDAuMTcwMzYgMS4zMzc2NSwwLjQ0MzI5IDEuOTQxNzYsMC44MDgyMWMwLjE2Mjc3LDAuMDk4NzEgMC4zNjgwNCwwLjA4OTczIDAuNTIyNzUsLTAuMDIxMzJsMi4yMTk4MSwtMS41OTYwNGwxLjI3OTA2LDEuMjc4MTNsLTEuNTgxMjEsMi4yNTQxMWMtMC4xMDgyLDAuMTUzMjggLTAuMTE0ODcsMC4zNTUzOSAtMC4wMTg1NCwwLjUxNjI2YzAuMzYwMTgsMC41OTkzNiAwLjYyODU2LDEuMjUwMTEgMC43OTk4OCwxLjkzMTU2YzAuMDQ2MDMsMC4xODQxMyAwLjE5NzE5LDAuMzIyNzYgMC4zODQ2NCwwLjM1MzEzbDIuNzA4MjcsMC40NDMwM2wwLDEuODA4MjlsLTAuODg1MTQsMC4xNTQ3OGMwLjI3MzgxLDAuMjUyOTMgMC41MjE3NywwLjUzMTg4IDAuNzQxNDgsMC44MzQxN2wwLjY5OTc4LC0wLjEyMzI3YzAuMjI3MzEsLTAuMDM5ODYgMC4zOTIwNiwtMC4yMzY5OCAwLjM5MjA2LC0wLjQ2NzE0bDAsLTIuNjEwMDJjMCwtMC4yMzI1MyAtMC4xNjg4NiwtMC40MzA1NyAtMC4zOTg1NSwtMC40NjgwNmwtMi44MDM3NCwtMC40NTg3OWMtMC4xNjQ2NywtMC41NjI4MiAtMC4zODg3MSwtMS4xMDM0NyAtMC42NzAxMiwtMS42MTU1MWwxLjYzNjgzLC0yLjMzMjg5YzAuMTMyNCwtMC4xODg0IDAuMTA5OTQsLTAuNDQ1MjUgLTAuMDUyODMsLTAuNjA4MDJsLTEuODQ2MjksLTEuODQ1MzdjLTAuMTY0MTksLTAuMTY0MiAtMC40MjM3OCwtMC4xODUzMiAtMC42MTI2NSwtMC4wNDkxM2wtMi4yOTc2NywxLjY1MTY1Yy0wLjUxNjc4LC0wLjI4NTY4IC0xLjA2MjgsLTAuNTExNDYgLTEuNjI5NDEsLTAuNjc2NmwtMC40ODg0NSwtMi43OTQ0NmMtMC4wNDAzNCwtMC4yMjczMSAtMC4yMzc5MSwtMC4zOTI5OSAtMC40NjgwNiwtMC4zOTI5OWwtMi42MTAwMiwwem0xLjMyNjMzLDcuMTE4MjRjLTIuMDkzMjQsMCAtMy43OTYzOSwxLjcwMzE2IC0zLjc5NjM5LDMuNzk2MzljMCwxLjk5NzM4IDEuNTUxNDksMy42MzU4NSAzLjUxMTg1LDMuNzgyNDljMC4wODQ0NywtMC4zMjQ1OSAwLjE5NjA1LC0wLjYzODUzIDAuMzMzNjcsLTAuOTM3OThjLTAuMDE2NjEsMCAtMC4wMzI1MiwwLjAwMjc4IC0wLjA0OTEzLDAuMDAyNzhjLTEuNTcwMjgsMCAtMi44NDczLC0xLjI3NzAxIC0yLjg0NzMsLTIuODQ3M2MwLC0xLjU3MDI4IDEuMjc3MDEsLTIuODQ3MyAyLjg0NzMsLTIuODQ3M2MxLjU3MDI4LDAgMi44NDczLDEuMjc3MDEgMi44NDczLDIuODQ3M2MwLDAuMDE2NjEgLTAuMDAyNzgsMC4wMzI1MiAtMC4wMDI3OCwwLjA0OTEzYzAuMjk5NDQsLTAuMTM3NjIgMC42MTMzOCwtMC4yNDkyIDAuOTM3OTgsLTAuMzMzNjdjLTAuMTQ2NjQsLTEuOTYwMzYgLTEuNzg1MTEsLTMuNTExODUgLTMuNzgyNDksLTMuNTExODV6bTUuMjIwMDQsNC4yNzA5NGMtMi42MTUyNCwwIC00Ljc0NTQ5LDIuMTMwMjUgLTQuNzQ1NDksNC43NDU0OWMwLDIuNjE1MjQgMi4xMzAyNSw0Ljc0NTQ5IDQuNzQ1NDksNC43NDU0OWMxLjEzNzI2LDAgMi4xODE2OSwtMC40MDM4NSAzLjAwMDIzLC0xLjA3NDIybDIuODMzMzksMi44MzMzOWwwLjY3MTA0LC0wLjY3MTA0bC0yLjgzMzM5LC0yLjgzMzM5YzAuNjcwMzgsLTAuODE4NTQgMS4wNzQyMiwtMS44NjI5NyAxLjA3NDIyLC0zLjAwMDIzYzAsLTIuNjE1MjQgLTIuMTMwMjUsLTQuNzQ1NDkgLTQuNzQ1NDksLTQuNzQ1NDl6bTAsMC45NDkxYzIuMTAyMzEsMCAzLjc5NjM5LDEuNjk0MDggMy43OTYzOSwzLjc5NjM5YzAsMi4xMDIzMSAtMS42OTQwOCwzLjc5NjM5IC0zLjc5NjM5LDMuNzk2MzljLTIuMTAyMzEsMCAtMy43OTYzOSwtMS42OTQwOCAtMy43OTYzOSwtMy43OTYzOWMwLC0yLjEwMjMxIDEuNjk0MDgsLTMuNzk2MzkgMy43OTYzOSwtMy43OTYzOXpcIiBmaWxsPVwiYmxhY2tcIiBpZD1cInN2Z18xXCIgLz48L2c+PC9zdmc+LFxuXHRcdGNhdGVnb3J5OiAnbWVzc2lhJyxcblx0XHRrZXl3b3JkczogWydvYmplY3QnXSxcblx0XHRzdHlsZXM6IFtdLFxuXHRcdHZhcmlhdGlvbnM6IFtdLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGJsb2NrVGl0bGU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0fSxcblx0XHRcdGZpbHRlcnNPcmRlcjoge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWQ6ICdtZXNzaWFfcmVzZXQnLFxuXHRcdFx0XHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWQ6ICdtZXNzaWFfc2VhcmNoJyxcblx0XHRcdFx0XHRcdHRpdGxlOiAnJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlkOiAnbWVzc2lhX2NvbnN0cnVjdG9yJyxcblx0XHRcdFx0XHRcdHRpdGxlOiAnJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlkOiAnbWVzc2lhX29iamVjdF9jYXRlZ29yeScsXG5cdFx0XHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZDogJ21lc3NpYV9vYmplY3RfcHJvcGVydHknLFxuXHRcdFx0XHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiBmYWxzZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogU2VhcmNoRmlsdGVyc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL2xpc3RpbmctZmlsdGVycy1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvbGlzdGluZy1maWx0ZXJzLWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJlbGVtZW50IiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNlcnZlclNpZGVSZW5kZXIiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiY29tcG9uZW50cyIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiTm90aWNlIiwiSW5wdXRDb250cm9sIiwiX19leHBlcmltZW50YWxJbnB1dENvbnRyb2wiLCJTcGFjZXIiLCJfX2V4cGVyaW1lbnRhbFNwYWNlciIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIlNlYXJjaEZpbHRlcnNGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsImZpbHRlcnNSZWYiLCJpZE5hbWVNYXAiLCJnZXRFeGFtcGxlIiwic29ydGFibGVJbml0IiwiY3VycmVudCIsIm5vdCIsInNvcnRhYmxlIiwiZm9yY2VIZWxwZXJTaXplIiwiZm9yY2VQbGFjZWhvbGRlclNpemUiLCJvcGFjaXR5IiwidG9sZXJhbmNlIiwic2Nyb2xsIiwic2Nyb2xsU2Vuc2l0aXZpdHkiLCJjb250YWlubWVudCIsInBsYWNlaG9sZGVyIiwiaGFuZGxlIiwic3RhcnQiLCJldmVudCIsInVpIiwiaXRlbSIsImFkZENsYXNzIiwiYmVmb3JlU3RvcCIsInJlbW92ZUNsYXNzIiwic3RvcCIsInNhdmVPcmRlciIsInN0b3JlIiwiZmlsdGVycyIsImZpbmQiLCJpIiwiZmlsdGVyIiwiZmlsdGVyQXR0ciIsImZpbHRlcnNPcmRlciIsImlkIiwiYXR0ciIsInB1c2giLCJsZW5ndGgiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0aXRsZSIsImJsb2NrVGl0bGUiLCJuZXh0VmFsdWUiLCJtYXAiLCJpbmRleCIsIm5leHRBdHRyIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsImpvaW4iLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/segment-wrapper-editor.jsx":
/*!**************************************************!*\
  !*** ./src/js/blocks/segment-wrapper-editor.jsx ***!
  \**************************************************/
/***/ (function() {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function (wp, $) {
  var apiFetch = wp.apiFetch,
      apiRequest = wp.apiRequest;
  var registerBlockType = wp.blocks.registerBlockType;
  var _wp$element = wp.element,
      Component = _wp$element.Component,
      Fragment = _wp$element.Fragment,
      useState = _wp$element.useState,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef;
  var ServerSideRender = wp.serverSideRender;
  var _wp$blockEditor = wp.blockEditor,
      BlockControls = _wp$blockEditor.BlockControls,
      InnerBlocks = _wp$blockEditor.InnerBlocks,
      useBlockProps = _wp$blockEditor.useBlockProps;
  var _wp$components = wp.components,
      SelectControl = _wp$components.SelectControl,
      ToggleControl = _wp$components.ToggleControl,
      Notice = _wp$components.Notice,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      TextControl = _wp$components.TextControl,
      Spinner = _wp$components.Spinner,
      RangeControl = _wp$components.RangeControl,
      Flex = _wp$components.Flex,
      FlexItem = _wp$components.FlexItem,
      FlexBlock = _wp$components.FlexBlock,
      RadioGroup = _wp$components.__experimentalRadioGroup,
      Radio = _wp$components.__experimentalRadio;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "137",
    cy: "82.5",
    fill: "#cccccc",
    id: "svg_3",
    rx: "49.5",
    ry: "49.5",
    strokeDasharray: "null",
    strokeLinecap: "null",
    strokeLinejoin: "null",
    strokeWidth: "null"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "#000000",
    fontFamily: "serif",
    fontSize: "24",
    strokeDasharray: "null",
    strokeLinecap: "null",
    strokeLinejoin: "null",
    strokeWidth: "0",
    textAnchor: "middle",
    transform: "matrix(2.17559 0 0 2.17559 -137.872 -97.7079)",
    x: "126.497",
    y: "89.41434"
  }, "{S}"));
  var lastPreview = false;

  function SegmentWrapperFn(props) {
    var attributes = props.attributes,
        setAttributes = props.setAttributes,
        className = props.className,
        name = props.name;

    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        editMode = _useState2[0],
        setEditMode = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        termsFetched = _useState4[0],
        setTermsFetched = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        rendered = _useState6[0],
        setRendered = _useState6[1];

    var _useState7 = useState({
      segment: []
    }),
        _useState8 = _slicedToArray(_useState7, 2),
        terms = _useState8[0],
        setTerms = _useState8[1];

    var blockRef = useRef();
    var selectSegmentsRef = useRef();

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
      if (termsFetched) {
        if (terms.segment.length > 0) {
          var block = wp.blocks.getBlockType(name);
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, /*#__PURE__*/React.createElement(Fragment, {
            key: "tip"
          }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
            isDismissible: false,
            status: "warning"
          }, /*#__PURE__*/React.createElement("p", null, __('Add any inner blocks and specify the segments. The content of the block will be displayed only if the currently viewed object or listing page belongs to the segments specified in the settings.', 'messia')))), /*#__PURE__*/React.createElement("div", {
            ref: selectSegmentsRef
          }, /*#__PURE__*/React.createElement(SelectControl, {
            multiple: true,
            className: "criteria-item",
            label: __('Wrap in segments:', 'messia'),
            value: attributes.forSegments,
            onChange: function onChange(value) {
              setAttributes({
                forSegments: value
              });
            },
            options: terms.segment
          }), /*#__PURE__*/React.createElement(InnerBlocks, null))));
        } else {
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder",
            label: __("You have no segments. Create one.", 'messia')
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }));
        }
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement(Spinner, null)));
      }
    };

    var getBlockPreview = function getBlockPreview() {
      return /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block",
        ref: blockRef
      }, /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement(ServerSideRender, {
        block: name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: true
        }
      })));
    };

    var getTerms = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return apiFetch({
                  path: 'messia/v1/block-segment-wrapper',
                  method: 'POST',
                  data: {
                    currentAttrs: attributes
                  }
                }).then(function (response) {
                  if (response.terms.segment.length === 0) {
                    wp.data.dispatch('core/notices').createNotice('error', // Can be one of: success, info, warning, error.
                    __('Messia Category Terms: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'), // Text string to display.
                    {
                      isDismissible: true
                    });
                  }

                  return response;
                }).catch(function (e) {
                  wp.data.dispatch('core/notices').createNotice('error', // Can be one of: success, info, warning, error.
                  __('An error occurred while receiving data from the server for Category Terms block', 'messia'), // Text string to display.
                  {
                    isDismissible: true
                  });
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getTerms() {
        return _ref.apply(this, arguments);
      };
    }();

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
      var isMounted = true;

      if (!termsFetched && !attributes.isExample) {
        getTerms().then(function (response) {
          if (isMounted) {
            setAttributes({
              tabsConstructed: response.validAttrs.tabsConstructed
            });
            setTerms(response.terms);
            setTermsFetched(true);
            setRendered(true);
          }
        });
      }

      return function () {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(function () {
      if (!rendered || !editMode) return;
      $(selectSegmentsRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia'),
        closeOnSelect: false
      }).on('change', function (event) {
        var slug = $(event.currentTarget).val();

        if (slug === null) {
          slug = [];
        }

        setAttributes({
          forSegments: slug
        });
      });
    }, [rendered, editMode]);
    return render();
  }

  registerBlockType('messia/block-segment-wrapper', {
    title: __('Segment wrapper', 'messia'),
    description: __('Show block content only for certain segment', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "none",
      d: "m0,0l24,0l0,24l-24,0l0,-24z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m4,19l6,0l0,-2l-6,0l0,2zm16,-14l-16,0l0,2l16,0l0,-2zm-3,6l-13,0l0,2l13.25,0c1.1,0 2,0.9 2,2s-0.9,2 -2,2l-2.25,0l0,-2l-3,3l3,3l0,-2l2,0c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4z"
    })),
    category: 'messia',
    keywords: ['wrapper'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      forSegments: {
        type: 'array',
        default: []
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
    edit: SegmentWrapperFn,
    save: function save(props) {
      var blockProps = useBlockProps.save();
      return /*#__PURE__*/React.createElement(InnerBlocks.Content, null);
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/segment-wrapper-editor.scss":
/*!*****************************************************!*\
  !*** ./src/scss/blocks/segment-wrapper-editor.scss ***!
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
  !*** ./src/entries/blocks/segment-wrapper-editor.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_segment_wrapper_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/segment-wrapper-editor.scss */ "./src/scss/blocks/segment-wrapper-editor.scss");
/* harmony import */ var _js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/segment-wrapper-editor.jsx */ "./src/js/blocks/segment-wrapper-editor.jsx");
/* harmony import */ var _js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_segment_wrapper_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1zZWdtZW50LXdyYXBwZXItZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OytDQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsUUFBUixHQUFpQ0YsRUFBakMsQ0FBUUUsUUFBUjtFQUFBLElBQWtCQyxVQUFsQixHQUFpQ0gsRUFBakMsQ0FBa0JHLFVBQWxCO0VBQ0EsSUFBUUMsaUJBQVIsR0FBOEJKLEVBQUUsQ0FBQ0ssTUFBakMsQ0FBUUQsaUJBQVI7RUFDQSxrQkFBNkRKLEVBQUUsQ0FBQ00sT0FBaEU7RUFBQSxJQUFRQyxTQUFSLGVBQVFBLFNBQVI7RUFBQSxJQUFtQkMsUUFBbkIsZUFBbUJBLFFBQW5CO0VBQUEsSUFBNkJDLFFBQTdCLGVBQTZCQSxRQUE3QjtFQUFBLElBQXVDQyxTQUF2QyxlQUF1Q0EsU0FBdkM7RUFBQSxJQUFrREMsTUFBbEQsZUFBa0RBLE1BQWxEO0VBQ0EsSUFBMEJDLGdCQUExQixHQUErQ1osRUFBL0MsQ0FBUWEsZ0JBQVI7RUFDQSxzQkFBc0RiLEVBQUUsQ0FBQ2MsV0FBekQ7RUFBQSxJQUFRQyxhQUFSLG1CQUFRQSxhQUFSO0VBQUEsSUFBdUJDLFdBQXZCLG1CQUF1QkEsV0FBdkI7RUFBQSxJQUFvQ0MsYUFBcEMsbUJBQW9DQSxhQUFwQztFQUNBLHFCQUFzT2pCLEVBQUUsQ0FBQ2tCLFVBQXpPO0VBQUEsSUFBUUMsYUFBUixrQkFBUUEsYUFBUjtFQUFBLElBQXVCQyxhQUF2QixrQkFBdUJBLGFBQXZCO0VBQUEsSUFBc0NDLE1BQXRDLGtCQUFzQ0EsTUFBdEM7RUFBQSxJQUE4Q0MsWUFBOUMsa0JBQThDQSxZQUE5QztFQUFBLElBQTREQyxhQUE1RCxrQkFBNERBLGFBQTVEO0VBQUEsSUFBMkVDLFdBQTNFLGtCQUEyRUEsV0FBM0U7RUFBQSxJQUF3RkMsUUFBeEYsa0JBQXdGQSxRQUF4RjtFQUFB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LENBREE7TUFLWDFDLFdBQVcsRUFBRTtRQUNaeUMsSUFBSSxFQUFFLE9BRE07UUFFWkMsT0FBTyxFQUFFO01BRkc7SUFMRixDQVJxQztJQWtCakRDLE9BQU8sRUFBRTtNQUNSakUsVUFBVSxFQUFFO1FBQ1h1QyxTQUFTLEVBQUU7TUFEQTtJQURKLENBbEJ3QztJQXVCakQyQixRQUFRLEVBQUU7TUFDVEMsUUFBUSxFQUFFO0lBREQsQ0F2QnVDO0lBMkJqREMsSUFBSSxFQUFFdEUsZ0JBM0IyQztJQTRCakR1RSxJQUFJLEVBQUUsY0FBVXRFLEtBQVYsRUFBaUI7TUFDdEIsSUFBTXVFLFVBQVUsR0FBRy9GLGFBQWEsQ0FBQzhGLElBQWQsRUFBbkI7TUFFQSxvQkFBTyxvQkFBQyxXQUFELENBQWEsT0FBYixPQUFQO01BQ0EsT0FBTyxJQUFQO0lBQ0E7RUFqQ2dELENBQWpDLENBQWpCO0FBb0NBLENBaFFBLEVBZ1FDRSxNQUFNLENBQUNqSCxFQWhRUixFQWdRWWtILE1BaFFaLENBQUQ7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDdUQ7O0FBRXZEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9zZWdtZW50LXdyYXBwZXItZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3Mvc2VnbWVudC13cmFwcGVyLWVkaXRvci5zY3NzPzMwNmUiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9zZWdtZW50LXdyYXBwZXItZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IGFwaUZldGNoLCBhcGlSZXF1ZXN0IH0gPSB3cDtcblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBCbG9ja0NvbnRyb2xzLCBJbm5lckJsb2NrcywgdXNlQmxvY2tQcm9wcyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgU2VsZWN0Q29udHJvbCwgVG9nZ2xlQ29udHJvbCwgTm90aWNlLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgVGV4dENvbnRyb2wsIFNwaW5uZXIsIFJhbmdlQ29udHJvbCwgRmxleCwgRmxleEl0ZW0sIEZsZXhCbG9jaywgX19leHBlcmltZW50YWxSYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBfX2V4cGVyaW1lbnRhbFJhZGlvOiBSYWRpbyB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxlbGxpcHNlIGN4PVwiMTM3XCIgY3k9XCI4Mi41XCIgZmlsbD1cIiNjY2NjY2NcIiBpZD1cInN2Z18zXCIgcng9XCI0OS41XCIgcnk9XCI0OS41XCIgc3Ryb2tlRGFzaGFycmF5PVwibnVsbFwiIHN0cm9rZUxpbmVjYXA9XCJudWxsXCIgc3Ryb2tlTGluZWpvaW49XCJudWxsXCIgc3Ryb2tlV2lkdGg9XCJudWxsXCIgLz5cblx0XHQ8dGV4dCBmaWxsPVwiIzAwMDAwMFwiIGZvbnRGYW1pbHk9XCJzZXJpZlwiIGZvbnRTaXplPVwiMjRcIiBzdHJva2VEYXNoYXJyYXk9XCJudWxsXCIgc3Ryb2tlTGluZWNhcD1cIm51bGxcIiBzdHJva2VMaW5lam9pbj1cIm51bGxcIiBzdHJva2VXaWR0aD1cIjBcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCIgdHJhbnNmb3JtPVwibWF0cml4KDIuMTc1NTkgMCAwIDIuMTc1NTkgLTEzNy44NzIgLTk3LjcwNzkpXCIgeD1cIjEyNi40OTdcIiB5PVwiODkuNDE0MzRcIj57YHtTfWB9PC90ZXh0PlxuXHQ8L3N2Zz5cblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBTZWdtZW50V3JhcHBlckZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblx0XHRjb25zdCBbdGVybXNGZXRjaGVkLCBzZXRUZXJtc0ZldGNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRcdGNvbnN0IFtyZW5kZXJlZCwgc2V0UmVuZGVyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRcdGNvbnN0IFt0ZXJtcywgc2V0VGVybXNdID0gdXNlU3RhdGUoe1xuXHRcdFx0c2VnbWVudDogW10sXG5cdFx0fSk7XG5cblx0XHRsZXQgYmxvY2tSZWYgPSB1c2VSZWYoKTtcblx0XHRsZXQgc2VsZWN0U2VnbWVudHNSZWYgPSB1c2VSZWYoKTtcblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0NvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QmxvY2tDb250cm9scyBrZXk9XCJibG9ja1wiPlxuXHRcdFx0XHRcdDxUb29sYmFyR3JvdXBcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3B0aW9ucycsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHQ8VG9vbGJhckJ1dHRvblxuXHRcdFx0XHRcdFx0XHRsYWJlbD17ZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXtlZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRFZGl0TW9kZSghZWRpdE1vZGUpO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0VkaXQgPSAoKSA9PiB7XG5cblx0XHRcdGlmICh0ZXJtc0ZldGNoZWQpIHtcblx0XHRcdFx0aWYgKHRlcm1zLnNlZ21lbnQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdFx0PEZyYWdtZW50IGtleT0ndGlwJz5cblx0XHRcdFx0XHRcdFx0XHRcdDxoND57YmxvY2sudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHA+e19fKCdBZGQgYW55IGlubmVyIGJsb2NrcyBhbmQgc3BlY2lmeSB0aGUgc2VnbWVudHMuIFRoZSBjb250ZW50IG9mIHRoZSBibG9jayB3aWxsIGJlIGRpc3BsYXllZCBvbmx5IGlmIHRoZSBjdXJyZW50bHkgdmlld2VkIG9iamVjdCBvciBsaXN0aW5nIHBhZ2UgYmVsb25ncyB0byB0aGUgc2VnbWVudHMgc3BlY2lmaWVkIGluIHRoZSBzZXR0aW5ncy4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHJlZj17c2VsZWN0U2VnbWVudHNSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0bXVsdGlwbGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnV3JhcCBpbiBzZWdtZW50czonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmZvclNlZ21lbnRzfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZvclNlZ21lbnRzOiB2YWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuc2VnbWVudH1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8SW5uZXJCbG9ja3MgLz5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIiBsYWJlbD17X18oXCJZb3UgaGF2ZSBubyBzZWdtZW50cy4gQ3JlYXRlIG9uZS5cIiwgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT48L2Rpdj5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXIgPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdDxTcGlubmVyIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17bmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VGVybXMgPSBhc3luYyAoKSA9PiB7XG5cblx0XHRcdHJldHVybiBhd2FpdCBhcGlGZXRjaCh7XG5cdFx0XHRcdHBhdGg6ICdtZXNzaWEvdjEvYmxvY2stc2VnbWVudC13cmFwcGVyJyxcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGE6IHsgY3VycmVudEF0dHJzOiBhdHRyaWJ1dGVzIH1cblx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG5cdFx0XHRcdGlmIChyZXNwb25zZS50ZXJtcy5zZWdtZW50Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdFx0X18oJ01lc3NpYSBDYXRlZ29yeSBUZXJtczogTm8gdGVybXMgd2VyZSBmb3VuZCBpbiB0YXhvbm9teSBTZWdtZW50LiBVbml0IG9wZXJhdGlvbiBpcyBub3QgcG9zc2libGUuJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cblx0XHRcdH0pLmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRfXygnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVjZWl2aW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyIGZvciBDYXRlZ29yeSBUZXJtcyBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0dGFic0NvbnN0cnVjdGVkOiByZXNwb25zZS52YWxpZEF0dHJzLnRhYnNDb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0XHRzZXRSZW5kZXJlZCh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFt0ZXJtc0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGlmICghcmVuZGVyZWQgfHwgIWVkaXRNb2RlKSByZXR1cm47XG5cblx0XHRcdCQoc2VsZWN0U2VnbWVudHNSZWYuY3VycmVudCkuZmluZCgnc2VsZWN0Jykuc2VsZWN0Mih7XG5cdFx0XHRcdHdpZHRoOiAnMTAwJScsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBfXygnQW55JywgJ21lc3NpYScpLFxuXHRcdFx0XHRjbG9zZU9uU2VsZWN0OiBmYWxzZSxcblx0XHRcdH0pLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0bGV0IHNsdWcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXHRcdFx0XHRpZiAoc2x1ZyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHNsdWcgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZm9yU2VnbWVudHM6IHNsdWcgfSk7XG5cdFx0XHR9KTtcblx0XHR9LCBbcmVuZGVyZWQsIGVkaXRNb2RlXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLXNlZ21lbnQtd3JhcHBlcicsIHtcblx0XHR0aXRsZTogX18oJ1NlZ21lbnQgd3JhcHBlcicsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ1Nob3cgYmxvY2sgY29udGVudCBvbmx5IGZvciBjZXJ0YWluIHNlZ21lbnQnLCAnbWVzc2lhJyksXG5cdFx0aWNvbjogPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbD1cIm5vbmVcIiBkPVwibTAsMGwyNCwwbDAsMjRsLTI0LDBsMCwtMjR6XCIgLz48cGF0aCBkPVwibTQsMTlsNiwwbDAsLTJsLTYsMGwwLDJ6bTE2LC0xNGwtMTYsMGwwLDJsMTYsMGwwLC0yem0tMyw2bC0xMywwbDAsMmwxMy4yNSwwYzEuMSwwIDIsMC45IDIsMnMtMC45LDIgLTIsMmwtMi4yNSwwbDAsLTJsLTMsM2wzLDNsMCwtMmwyLDBjMi4yMSwwIDQsLTEuNzkgNCwtNHMtMS43OSwtNCAtNCwtNHpcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnd3JhcHBlciddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0Zm9yU2VnbWVudHM6IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBTZWdtZW50V3JhcHBlckZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykge1xuXHRcdFx0Y29uc3QgYmxvY2tQcm9wcyA9IHVzZUJsb2NrUHJvcHMuc2F2ZSgpO1xuXG5cdFx0XHRyZXR1cm4gPElubmVyQmxvY2tzLkNvbnRlbnQgLz47XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3NlZ21lbnQtd3JhcHBlci1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3Mvc2VnbWVudC13cmFwcGVyLWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwiYXBpRmV0Y2giLCJhcGlSZXF1ZXN0IiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJlbGVtZW50IiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNlcnZlclNpZGVSZW5kZXIiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiYmxvY2tFZGl0b3IiLCJCbG9ja0NvbnRyb2xzIiwiSW5uZXJCbG9ja3MiLCJ1c2VCbG9ja1Byb3BzIiwiY29tcG9uZW50cyIsIlNlbGVjdENvbnRyb2wiLCJUb2dnbGVDb250cm9sIiwiTm90aWNlIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJUZXh0Q29udHJvbCIsIlNwaW5uZXIiLCJSYW5nZUNvbnRyb2wiLCJGbGV4IiwiRmxleEl0ZW0iLCJGbGV4QmxvY2siLCJSYWRpb0dyb3VwIiwiX19leHBlcmltZW50YWxSYWRpb0dyb3VwIiwiUmFkaW8iLCJfX2V4cGVyaW1lbnRhbFJhZGlvIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiU2VnbWVudFdyYXBwZXJGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsInRlcm1zRmV0Y2hlZCIsInNldFRlcm1zRmV0Y2hlZCIsInJlbmRlcmVkIiwic2V0UmVuZGVyZWQiLCJzZWdtZW50IiwidGVybXMiLCJzZXRUZXJtcyIsImJsb2NrUmVmIiwic2VsZWN0U2VnbWVudHNSZWYiLCJnZXRFeGFtcGxlIiwiZ2V0QmxvY2tDb250cm9scyIsImdldEJsb2NrRWRpdCIsImxlbmd0aCIsImJsb2NrIiwiZ2V0QmxvY2tUeXBlIiwidGl0bGUiLCJmb3JTZWdtZW50cyIsInZhbHVlIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwiZ2V0VGVybXMiLCJwYXRoIiwibWV0aG9kIiwiZGF0YSIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImlzTW91bnRlZCIsInRhYnNDb25zdHJ1Y3RlZCIsInZhbGlkQXR0cnMiLCJjdXJyZW50IiwiZmluZCIsInNlbGVjdDIiLCJ3aWR0aCIsInBsYWNlaG9sZGVyIiwiY2xvc2VPblNlbGVjdCIsIm9uIiwiZXZlbnQiLCJzbHVnIiwiY3VycmVudFRhcmdldCIsInZhbCIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwidHlwZSIsImRlZmF1bHQiLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwiYmxvY2tQcm9wcyIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
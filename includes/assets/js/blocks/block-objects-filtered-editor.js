/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/objects-filtered-editor.jsx":
/*!***************************************************!*\
  !*** ./src/js/blocks/objects-filtered-editor.jsx ***!
  \***************************************************/
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
  var apiFetch = wp.apiFetch;
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
      SelectControl = _wp$components.SelectControl,
      Notice = _wp$components.Notice,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      TextControl = _wp$components.TextControl,
      Spinner = _wp$components.Spinner,
      Flex = _wp$components.Flex,
      FlexItem = _wp$components.FlexItem,
      FlexBlock = _wp$components.FlexBlock,
      RadioControl = _wp$components.RadioControl,
      RadioGroup = _wp$components.__experimentalRadioGroup,
      Radio = _wp$components.__experimentalRadio;
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
  var lastPreview = false;

  function ObjectsFilteredFn(props) {
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
        terms = _useState6[0],
        setTerms = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        rendered = _useState8[0],
        setRendered = _useState8[1];

    var blockRef = useRef();
    var selectCatRef = useRef();
    var selectPropRef = useRef();

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
        var block = wp.blocks.getBlockType(name);
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
          isDismissible: false,
          status: "warning"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, __('Build Your conditions for searching objects to find ones.', 'messia')), /*#__PURE__*/React.createElement("div", null, __('Notes:', 'messia')), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, __('the list of terms is subordinate to the value of the "Empty category terms" option.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('sorting by reviews could be disabled if theme option Site rating are On.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('set parameter Limit to 0 to unlimit number of objects.', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Number of objects', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.limit,
          onChange: function onChange(value) {
            setAttributes({
              limit: Number(value)
            });
          }
        }))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(SelectControl, {
          className: "criteria-item",
          label: __('Sort by:', 'messia'),
          value: attributes.orderBy,
          onChange: function onChange(slug) {
            setAttributes({
              orderBy: slug
            });
          },
          options: terms.orderBy
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioGroup, {
          className: "criteria-item",
          accessibilitylabel: "Width",
          onChange: function onChange(value) {
            setAttributes({
              orderDir: value
            });
          },
          checked: attributes.orderDir
        }, /*#__PURE__*/React.createElement("div", null, __('Sort direction:', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "ASC"
        }, __('Ascending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "DESC"
        }, __('Descending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "RND"
        }, __('Random', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "conditions",
          justify: "start",
          align: "left",
          gap: 0
        }, /*#__PURE__*/React.createElement(SelectControl, {
          className: "condition-item",
          label: __('Belongs to Segment:', 'messia'),
          value: attributes.segment,
          onChange: function onChange(slug) {
            setAttributes({
              segment: slug
            });
          },
          options: terms.segment
        }), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectCatRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('AND Belongs to Categories:', 'messia'),
          value: attributes.category,
          onChange: function onChange(slug) {
            setAttributes({
              category: slug
            });
          },
          options: terms.category
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPropRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('AND Having Properties:', 'messia'),
          value: attributes.property,
          onChange: function onChange(slug) {
            setAttributes({
              property: slug
            });
          },
          options: terms.property
        }))), /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioGroup, {
          className: "condition-item",
          accessibilitylabel: "Width",
          onChange: function onChange(value) {
            setAttributes({
              isFeatured: parseInt(value)
            });
          },
          checked: attributes.isFeatured.toString()
        }, /*#__PURE__*/React.createElement("div", null, __('Marked as featured:', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "1"
        }, __('Yes', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "-1"
        }, __('No', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "0"
        }, __('Any', 'messia')))), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioControl, {
          label: __('Split cards to columns by:', 'messia'),
          selected: attributes.columns,
          options: [{
            label: __('Three', 'messia'),
            value: 3
          }, {
            label: __('Four', 'messia'),
            value: 4
          }],
          onChange: function onChange(value) {
            setAttributes({
              columns: parseInt(value)
            });
          }
        }))))));
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          tabIndex: "0",
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
        block: props.name,
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
                  path: 'messia/v1/block-objects-filtered',
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
                  __('An error occurred while receiving data from the server for Object Filtered block', 'messia'), // Text string to display.
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
            if (attributes.segment === '') {
              attributes.segment = response.terms.segment[0].value;
            }

            setTerms(response.terms);
            setTermsFetched(true);
            setRendered(true);
            setAttributes(attributes);
          }
        });
      }

      return function () {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(function () {
      if (rendered || editMode) {
        $(selectCatRef.current).find('select').select2({
          placeholder: __('Any / None category', 'messia')
        }).on('change', function (event) {
          var slug = $(event.currentTarget).val();

          if (slug === null) {
            slug = [];
          }

          setAttributes({
            category: slug
          });
        });
        $(selectPropRef.current).find('select').select2({
          placeholder: __('Any / None property', 'messia')
        }).on('change', function (event) {
          var slug = $(event.currentTarget).val();

          if (slug === null) {
            slug = [];
          }

          setAttributes({
            property: slug
          });
        });
        ;
      }
    }, [rendered, editMode]);
    return render();
  }

  registerBlockType('messia/block-objects-filtered', {
    title: __('Objects by filters', 'messia'),
    description: __('Terms of taxonomy Category by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"
    })),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      segment: {
        type: 'string',
        default: ''
      },
      category: {
        type: 'array',
        default: []
      },
      property: {
        type: 'array',
        default: []
      },
      isFeatured: {
        type: 'integer',
        default: 0,
        enum: [-1, 0, 1]
      },
      isExample: {
        type: 'boolean',
        default: false
      },
      limit: {
        type: 'integer',
        default: 4
      },
      columns: {
        type: 'integer',
        default: 4,
        enum: [3, 4]
      },
      orderBy: {
        type: 'string',
        default: 'post_date',
        enum: ['post_date', 'post_title', 'rating', 'reviews']
      },
      orderDir: {
        type: 'string',
        default: 'ASC',
        enum: ['ASC', 'DESC', 'RND']
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
    edit: ObjectsFilteredFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/objects-filtered-editor.scss":
/*!******************************************************!*\
  !*** ./src/scss/blocks/objects-filtered-editor.scss ***!
  \******************************************************/
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
/*!*******************************************************!*\
  !*** ./src/entries/blocks/objects-filtered-editor.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_objects_filtered_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/objects-filtered-editor.scss */ "./src/scss/blocks/objects-filtered-editor.scss");
/* harmony import */ var _js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/objects-filtered-editor.jsx */ "./src/js/blocks/objects-filtered-editor.jsx");
/* harmony import */ var _js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_objects_filtered_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREMsV0FBVUEsRUFBVixFQUFjQyxDQUFkLEVBQWlCO0VBRWpCLElBQVFDLFFBQVIsR0FBcUJGLEVBQXJCLENBQVFFLFFBQVI7RUFDQSxJQUFRQyxpQkFBUixHQUE4QkgsRUFBRSxDQUFDSSxNQUFqQyxDQUFRRCxpQkFBUjtFQUNBLGtCQUE2REgsRUFBRSxDQUFDSyxPQUFoRTtFQUFBLElBQVFDLFNBQVIsZUFBUUEsU0FBUjtFQUFBLElBQW1CQyxRQUFuQixlQUFtQkEsUUFBbkI7RUFBQSxJQUE2QkMsUUFBN0IsZUFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGVBQXVDQSxTQUF2QztFQUFBLElBQWtEQyxNQUFsRCxlQUFrREEsTUFBbEQ7RUFDQSxJQUEwQkMsZ0JBQTFCLEdBQStDWCxFQUEvQyxDQUFRWSxnQkFBUjtFQUNBLElBQVFDLGFBQVIsR0FBMEJiLEVBQUUsQ0FBQ2MsV0FBN0IsQ0FBUUQsYUFBUjtFQUNBLHFCQUF1TmIsRUFBRSxDQUFDZSxVQUExTjtFQUFBLElBQVFDLGFBQVIsa0JBQVFBLGFBQVI7RUFBQSxJQUF1QkMsTUFBdkIsa0JBQXVCQSxNQUF2QjtFQUFBLElBQStCQyxZQUEvQixrQkFBK0JBLFlBQS9CO0VBQUEsSUFBNkNDLGFBQTdDLGtCQUE2Q0EsYUFBN0M7RUFBQSxJQUE0REMsV0FBNUQsa0JBQTREQSxXQUE1RDtFQUFBLElBQXlFQyxRQUF6RSxrQkFBeUVBLFFBQXpFO0VBQUEsSUFBbUZDLFdBQW5GLGtCQUFtRkEsV0FBbkY7RUFBQSxJQUFnR0MsT0FBaEcsa0JBQWdHQSxPQUFoRztFQUFBLElBQXlHQyxJQUF6RyxrQkFBeUdBLElBQXpHO0VBQUEsSUFBK0dDLFFBQS9HLGtCQUErR0EsUUFBL0c7RUFBQSxJQUF5SEMsU0FBekgsa0JBQXlI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QUFPLEVBQUUsS0FGQTtRQUdUQyxJQUFJLEVBQUUsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixLQUFoQjtNQUhHO0lBcENDLENBUnNDO0lBa0RsREMsT0FBTyxFQUFFO01BQ1J4RSxVQUFVLEVBQUU7UUFDWG1ELFNBQVMsRUFBRTtNQURBO0lBREosQ0FsRHlDO0lBdURsRHNCLFFBQVEsRUFBRTtNQUNUQyxRQUFRLEVBQUU7SUFERCxDQXZEd0M7SUEyRGxEQyxJQUFJLEVBQUU3RSxpQkEzRDRDO0lBNERsRDhFLElBQUksRUFBRSxjQUFVN0UsS0FBVixFQUFpQjtNQUFFLE9BQU8sSUFBUDtJQUFhO0VBNURZLENBQWxDLENBQWpCO0FBK0RBLENBclpBLEVBcVpDOEUsTUFBTSxDQUFDbkgsRUFyWlIsRUFxWllvSCxNQXJaWixDQUFEOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3dEOztBQUV4RCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy9vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5zY3NzPzRlYjQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9vYmplY3RzLWZpbHRlcmVkLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgU2VsZWN0Q29udHJvbCwgTm90aWNlLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgVGV4dENvbnRyb2wsIFNwaW5uZXIsIEZsZXgsIEZsZXhJdGVtLCBGbGV4QmxvY2ssIFJhZGlvQ29udHJvbCwgX19leHBlcmltZW50YWxSYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBfX2V4cGVyaW1lbnRhbFJhZGlvOiBSYWRpbyB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxyZWN0IGZpbGw9XCJ1cmwoI3N2Z18xOSlcIiBoZWlnaHQ9XCIxMzZcIiBpZD1cInN2Z18xXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCIxMi4xNzQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMjEuNjI0OTlcIiBjeT1cIjI0LjJcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzJcIiByPVwiNS41MTE1M1wiIC8+XG5cdFx0PHJlY3QgZmlsbD1cInVybCgjc3ZnXzE5KVwiIGhlaWdodD1cIjEzNlwiIGlkPVwic3ZnXzEyXCIgcng9XCI0XCIgcnk9XCI0XCIgd2lkdGg9XCI3NlwiIHg9XCI5OS4wMjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTA4LjQ3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xM1wiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwidXJsKCNzdmdfMTkpXCIgaGVpZ2h0PVwiMTM2XCIgaWQ9XCJzdmdfMTVcIiByeD1cIjRcIiByeT1cIjRcIiB3aWR0aD1cIjc2XCIgeD1cIjE4NS44MjQ5OVwiIHk9XCIxNC41XCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiMTk1LjI3NDk5XCIgY3k9XCIyNC4yXCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xNlwiIHI9XCI1LjUxMTUzXCIgLz5cblx0XHQ8ZGVmcz5cblx0XHRcdDxsaW5lYXJHcmFkaWVudCBpZD1cInN2Z18xOVwiIHgxPVwiMC4wMDI2MlwiIHgyPVwiMVwiIHkxPVwiMFwiIHkyPVwiMVwiPlxuXHRcdFx0XHQ8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2U4ZThlOFwiIHN0b3BPcGFjaXR5PVwiMC45OTYwOVwiIC8+XG5cdFx0XHRcdDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZTBlMGUwXCIgc3RvcE9wYWNpdHk9XCIwLjk5NjA5XCIgLz5cblx0XHRcdDwvbGluZWFyR3JhZGllbnQ+XG5cdFx0PC9kZWZzPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gT2JqZWN0c0ZpbHRlcmVkRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblx0XHRjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXHRcdGNvbnN0IFt0ZXJtc0ZldGNoZWQsIHNldFRlcm1zRmV0Y2hlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0Y29uc3QgW3Rlcm1zLCBzZXRUZXJtc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cblx0XHRsZXQgW3JlbmRlcmVkLCBzZXRSZW5kZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0bGV0IGJsb2NrUmVmID0gdXNlUmVmKCk7XG5cdFx0bGV0IHNlbGVjdENhdFJlZiA9IHVzZVJlZigpO1xuXHRcdGxldCBzZWxlY3RQcm9wUmVmID0gdXNlUmVmKCk7XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGVybXNGZXRjaGVkKSB7XG5cblx0XHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PntfXygnQnVpbGQgWW91ciBjb25kaXRpb25zIGZvciBzZWFyY2hpbmcgb2JqZWN0cyB0byBmaW5kIG9uZXMuJywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdj57X18oJ05vdGVzOicsICdtZXNzaWEnKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDx1bD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygndGhlIGxpc3Qgb2YgdGVybXMgaXMgc3Vib3JkaW5hdGUgdG8gdGhlIHZhbHVlIG9mIHRoZSBcIkVtcHR5IGNhdGVnb3J5IHRlcm1zXCIgb3B0aW9uLicsICdtZXNzaWEnKX08L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGk+e19fKCdzb3J0aW5nIGJ5IHJldmlld3MgY291bGQgYmUgZGlzYWJsZWQgaWYgdGhlbWUgb3B0aW9uIFNpdGUgcmF0aW5nIGFyZSBPbi4nLCAnbWVzc2lhJyl9PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygnc2V0IHBhcmFtZXRlciBMaW1pdCB0byAwIHRvIHVubGltaXQgbnVtYmVyIG9mIG9iamVjdHMuJywgJ21lc3NpYScpfTwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYVwiXG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXs1fT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnTnVtYmVyIG9mIG9iamVjdHMnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1pbj0nMCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RlcD0nMSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0nbnVtYmVyJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5saW1pdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBsaW1pdDogTnVtYmVyKHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhXCJcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezV9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1NvcnQgYnk6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5vcmRlckJ5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgb3JkZXJCeTogc2x1ZyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMub3JkZXJCeX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW9Hcm91cFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYS1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWNjZXNzaWJpbGl0eWxhYmVsPVwiV2lkdGhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IG9yZGVyRGlyOiB2YWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5vcmRlckRpcn0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdTb3J0IGRpcmVjdGlvbjonLCAnbWVzc2lhJyl9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIkFTQ1wiPntfXygnQXNjZW5kaW5nJywgJ21lc3NpYScpfTwvUmFkaW8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIkRFU0NcIj57X18oJ0Rlc2NlbmRpbmcnLCAnbWVzc2lhJyl9PC9SYWRpbz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFJhZGlvIHZhbHVlPVwiUk5EXCI+e19fKCdSYW5kb20nLCAnbWVzc2lhJyl9PC9SYWRpbz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvUmFkaW9Hcm91cD5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uc1wiXG5cdFx0XHRcdFx0XHRcdFx0anVzdGlmeT1cInN0YXJ0XCJcblx0XHRcdFx0XHRcdFx0XHRhbGlnbj1cImxlZnRcIlxuXHRcdFx0XHRcdFx0XHRcdGdhcD17MH0+XG5cdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQmVsb25ncyB0byBTZWdtZW50OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLnNlZ21lbnR9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHNlZ21lbnQ6IHNsdWcgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuc2VnbWVudH1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHJlZj17c2VsZWN0Q2F0UmVmfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtdWx0aXBsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0FORCBCZWxvbmdzIHRvIENhdGVnb3JpZXM6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmNhdGVnb3J5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoc2x1ZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNhdGVnb3J5OiBzbHVnIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiByZWY9e3NlbGVjdFByb3BSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG11bHRpcGxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnQU5EIEhhdmluZyBQcm9wZXJ0aWVzOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5wcm9wZXJ0eX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBwcm9wZXJ0eTogc2x1ZyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3Rlcm1zLnByb3BlcnR5fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXg+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpb0dyb3VwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFjY2Vzc2liaWxpdHlsYWJlbD1cIldpZHRoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgaXNGZWF0dXJlZDogcGFyc2VJbnQodmFsdWUpIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5pc0ZlYXR1cmVkLnRvU3RyaW5nKCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdNYXJrZWQgYXMgZmVhdHVyZWQ6JywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIjFcIj57X18oJ1llcycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIi0xXCI+e19fKCdObycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIjBcIj57X18oJ0FueScsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L1JhZGlvR3JvdXA+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW9Db250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTcGxpdCBjYXJkcyB0byBjb2x1bW5zIGJ5OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17YXR0cmlidXRlcy5jb2x1bW5zfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbGFiZWw6IF9fKCdUaHJlZScsICdtZXNzaWEnKSwgdmFsdWU6IDMgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgbGFiZWw6IF9fKCdGb3VyJywgJ21lc3NpYScpLCB2YWx1ZTogNCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNvbHVtbnM6IHBhcnNlSW50KHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIHRhYkluZGV4PVwiMFwiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e3Byb3BzLm5hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFRlcm1zID0gYXN5bmMgKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgYXBpRmV0Y2goe1xuXHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL2Jsb2NrLW9iamVjdHMtZmlsdGVyZWQnLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0ZGF0YTogeyBjdXJyZW50QXR0cnM6IGF0dHJpYnV0ZXMgfVxuXHRcdFx0fSkudGhlbihyZXNwb25zZSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3BvbnNlLnRlcm1zLnNlZ21lbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRfXygnTWVzc2lhIENhdGVnb3J5IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IFNlZ21lbnQuIFVuaXQgb3BlcmF0aW9uIGlzIG5vdCBwb3NzaWJsZS4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXNwb25zZTtcblxuXHRcdFx0fSkuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdF9fKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZWNlaXZpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgZm9yIE9iamVjdCBGaWx0ZXJlZCBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoYXR0cmlidXRlcy5zZWdtZW50ID09PSAnJykge1xuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLnNlZ21lbnQgPSByZXNwb25zZS50ZXJtcy5zZWdtZW50WzBdLnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0XHRzZXRSZW5kZXJlZCh0cnVlKTtcblxuXHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFt0ZXJtc0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0XHRpZiAocmVuZGVyZWQgfHwgZWRpdE1vZGUpIHtcblx0XHRcdFx0JChzZWxlY3RDYXRSZWYuY3VycmVudCkuZmluZCgnc2VsZWN0Jykuc2VsZWN0Mih7XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6IF9fKCdBbnkgLyBOb25lIGNhdGVnb3J5JywgJ21lc3NpYScpLFxuXHRcdFx0XHR9KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0bGV0IHNsdWcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXHRcdFx0XHRcdGlmIChzbHVnID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRzbHVnID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBjYXRlZ29yeTogc2x1ZyB9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCQoc2VsZWN0UHJvcFJlZi5jdXJyZW50KS5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHtcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogX18oJ0FueSAvIE5vbmUgcHJvcGVydHknLCAnbWVzc2lhJyksXG5cdFx0XHRcdH0pLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRsZXQgc2x1ZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cdFx0XHRcdFx0aWYgKHNsdWcgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHNsdWcgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHByb3BlcnR5OiBzbHVnIH0pO1xuXHRcdFx0XHR9KTs7XG5cdFx0XHR9XG5cblx0XHR9LCBbcmVuZGVyZWQsIGVkaXRNb2RlXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLW9iamVjdHMtZmlsdGVyZWQnLCB7XG5cdFx0dGl0bGU6IF9fKCdPYmplY3RzIGJ5IGZpbHRlcnMnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdUZXJtcyBvZiB0YXhvbm9teSBDYXRlZ29yeSBieSBwYXJhbWV0ZXJzJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEgMGw5IDE1LjA5NHY1LjkwNmw0IDN2LTguOTA2bDktMTUuMDk0aC0yMnptMTguNDc5IDJsLTIuOTgxIDVoLTguOTk2bC0yLjk4MS01aDE0Ljk1OHpcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnb2JqZWN0J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRzZWdtZW50OiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdH0sXG5cdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRpc0ZlYXR1cmVkOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogMCxcblx0XHRcdFx0ZW51bTogWy0xLCAwLCAxXVxuXHRcdFx0fSxcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGxpbWl0OiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogNCxcblx0XHRcdH0sXG5cdFx0XHRjb2x1bW5zOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogNCxcblx0XHRcdFx0ZW51bTogWzMsIDRdLFxuXHRcdFx0fSxcblx0XHRcdG9yZGVyQnk6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICdwb3N0X2RhdGUnLFxuXHRcdFx0XHRlbnVtOiBbJ3Bvc3RfZGF0ZScsICdwb3N0X3RpdGxlJywgJ3JhdGluZycsICdyZXZpZXdzJ10sXG5cdFx0XHR9LFxuXHRcdFx0b3JkZXJEaXI6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICdBU0MnLFxuXHRcdFx0XHRlbnVtOiBbJ0FTQycsICdERVNDJywgJ1JORCddLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogT2JqZWN0c0ZpbHRlcmVkRm4sXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3Mvb2JqZWN0cy1maWx0ZXJlZC1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJlbGVtZW50IiwiQ29tcG9uZW50IiwiRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNlcnZlclNpZGVSZW5kZXIiLCJzZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiY29tcG9uZW50cyIsIlNlbGVjdENvbnRyb2wiLCJOb3RpY2UiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIlRleHRDb250cm9sIiwiU3Bpbm5lciIsIkZsZXgiLCJGbGV4SXRlbSIsIkZsZXhCbG9jayIsIlJhZGlvQ29udHJvbCIsIlJhZGlvR3JvdXAiLCJfX2V4cGVyaW1lbnRhbFJhZGlvR3JvdXAiLCJSYWRpbyIsIl9fZXhwZXJpbWVudGFsUmFkaW8iLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwibGFzdFByZXZpZXciLCJPYmplY3RzRmlsdGVyZWRGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsInRlcm1zRmV0Y2hlZCIsInNldFRlcm1zRmV0Y2hlZCIsInRlcm1zIiwic2V0VGVybXMiLCJyZW5kZXJlZCIsInNldFJlbmRlcmVkIiwiYmxvY2tSZWYiLCJzZWxlY3RDYXRSZWYiLCJzZWxlY3RQcm9wUmVmIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwibGltaXQiLCJ2YWx1ZSIsIk51bWJlciIsIm9yZGVyQnkiLCJzbHVnIiwib3JkZXJEaXIiLCJzZWdtZW50IiwiY2F0ZWdvcnkiLCJwcm9wZXJ0eSIsImlzRmVhdHVyZWQiLCJwYXJzZUludCIsInRvU3RyaW5nIiwiY29sdW1ucyIsImxhYmVsIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwiZ2V0VGVybXMiLCJwYXRoIiwibWV0aG9kIiwiZGF0YSIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImxlbmd0aCIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImlzTW91bnRlZCIsImN1cnJlbnQiLCJmaW5kIiwic2VsZWN0MiIsInBsYWNlaG9sZGVyIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ2YWwiLCJkZXNjcmlwdGlvbiIsImljb24iLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJ0eXBlIiwiZGVmYXVsdCIsImVudW0iLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
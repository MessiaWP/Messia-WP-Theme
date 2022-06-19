/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/tabs-panel-editor.jsx":
/*!*********************************************!*\
  !*** ./src/js/blocks/tabs-panel-editor.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function (wp, $) {
  var apiFetch = wp.apiFetch;
  var addFilter = wp.hooks.addFilter;
  var registerBlockType = wp.blocks.registerBlockType;
  var _wp$element = wp.element,
      Component = _wp$element.Component,
      Fragment = _wp$element.Fragment,
      useState = _wp$element.useState,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef;
  var ServerSideRender = wp.serverSideRender;
  var _wp$blockEditor = wp.blockEditor,
      InspectorControls = _wp$blockEditor.InspectorControls,
      BlockControls = _wp$blockEditor.BlockControls;
  var _wp$components = wp.components,
      Button = _wp$components.Button,
      Notice = _wp$components.Notice,
      Flex = _wp$components.Flex,
      FlexItem = _wp$components.FlexItem,
      Card = _wp$components.Card,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      ToggleControl = _wp$components.ToggleControl,
      Spinner = _wp$components.Spinner,
      TabPanel = _wp$components.TabPanel,
      Spacer = _wp$components.__experimentalSpacer,
      InputControl = _wp$components.__experimentalInputControl;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "m87.28121,29.13782c-3.99871,0 -7.27731,3.28806 -7.27731,7.27731l0,14.54513l0.00949,0l0,63.06999c0,2.65318 2.19835,4.85154 4.85154,4.85154l61.74338,0c3.10802,9.81679 12.31837,16.98038 23.1301,16.98038c13.34172,0 24.25768,-10.91596 24.25768,-24.25769c0,-6.74667 -2.79531,-12.85847 -7.2773,-17.27412l0,-43.3701c0,-2.65318 -2.19836,-4.85154 -4.85154,-4.85154l-9.70308,0l0,-9.69359c0,-3.98925 -3.28805,-7.27731 -7.2773,-7.27731l-19.40615,0c-1.8667,0 -3.55337,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98484,-1.9046 -4.85154,-1.9046l-19.40615,0c-1.8667,0 -3.55336,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98483,-1.9046 -4.85153,-1.9046l-19.38721,0zm0,4.85154l19.38721,0c1.37398,0 2.42576,1.05179 2.42576,2.42577l0,14.54513l72.77307,0l0,39.68407c-3.0701,-1.79092 -6.54768,-2.91851 -10.26214,-3.20279c-0.6159,-0.05683 -1.23183,-0.09475 -1.8667,-0.09475c-1.66772,0 -3.29752,0.17056 -4.87049,0.49275c-0.78648,0.16107 -1.56348,0.36954 -2.32153,0.60644c-7.5995,2.35943 -13.60706,8.36699 -15.96648,15.96648c-0.2369,0.75806 -0.44538,1.52557 -0.60645,2.31205c0,0 0,0.00949 0,0.00949c-0.32219,1.57296 -0.49274,3.20276 -0.49274,4.87048c0,0.81491 0.04737,1.62983 0.12318,2.42577l-60.73897,0l0,-67.92153l-0.00949,0l0,-9.69359c0,-1.37398 1.05181,-2.42577 2.42577,-2.42577zm29.09028,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm29.10923,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm24.25769,58.20897c0.65381,0 1.29817,0.03792 1.93304,0.10424c0.12318,0.00948 0.24636,0.02843 0.37903,0.04737c0.51167,0.06632 1.02336,0.13267 1.5161,0.2369c0.14213,0.02843 0.2748,0.06632 0.40744,0.09475c0.46431,0.10424 0.91914,0.21793 1.37398,0.3506c0.18952,0.06632 0.37902,0.13266 0.56855,0.19898c0.39797,0.13267 0.78646,0.2748 1.17497,0.43589c0.19898,0.07581 0.40745,0.17056 0.60644,0.26531c0.34114,0.15161 0.67276,0.3127 1.00441,0.49274c0.21796,0.1137 0.43589,0.2369 0.64436,0.3506c0.31268,0.18952 0.62539,0.37903 0.92861,0.56855c0.22742,0.15161 0.43589,0.29374 0.65382,0.45483c0.25584,0.17056 0.5022,0.36006 0.74859,0.54959c0.23688,0.1895 0.47378,0.37902 0.71065,0.58749c4.12192,3.56285 6.75616,8.82182 6.75616,14.66831c0,10.6696 -8.73656,19.40615 -19.40615,19.40615c-9.21982,0 -16.98039,-6.51925 -18.92289,-15.17054c-0.14213,-0.62539 -0.24636,-1.25077 -0.33165,-1.88565c0,-0.06632 -0.01895,-0.13266 -0.02843,-0.19898c-0.07581,-0.71068 -0.12318,-1.43082 -0.12318,-2.15098c0,-0.6633 0.03791,-1.32658 0.10423,-1.97094c0,-0.00948 -0.00948,-0.01894 0,-0.01894c0.92861,-9.09663 8.2154,-16.38343 17.31203,-17.31203c0,-0.00949 0.00946,0 0.01895,0c0.64436,-0.07581 1.30763,-0.10424 1.97094,-0.10424z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_2",
    stroke: "#000000",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "170.16668",
    x2: "170.16668",
    y1: "100.16667",
    y2: "122.85538"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_4",
    stroke: "#000000",
    strokeLinecap: "round",
    strokeWidth: "5",
    transform: "rotate(90 170.167 111.511)",
    x1: "170.16667",
    x2: "170.16667",
    y1: "100.16664",
    y2: "122.85535"
  })));

  var shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");

  var lastPreview = false;

  function TabsPanelFn(props) {
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

    var _useState5 = useState({
      segment: []
    }),
        _useState6 = _slicedToArray(_useState5, 2),
        terms = _useState6[0],
        setTerms = _useState6[1];

    var activeSegment;
    var blockRef = useRef();

    var sortableInit = function sortableInit() {
      $(blockRef.current).find('.tab-constructed').not('ui-sortable').sortable({
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
        handle: '.move',
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
          saveTabs();
        }
      });
    };

    var removeTab = function removeTab(event) {
      var tabsSegmentOther = [],
          tabsSegmentCurrent = [],
          // Find shown tabs in current segment
      tabs = event.target.closest('.tab-constructed').querySelectorAll('.tab-fields'),
          // Define tab being removed
      remove = event.target.closest('.tab-fields');

      for (var i = 0; i < attributes.tabsConstructed.length; i++) {
        if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
          // Find saved tabs in current segment
          tabsSegmentCurrent.push(attributes.tabsConstructed[i]);
        } else {
          tabsSegmentOther.push(attributes.tabsConstructed[i]);
        }
      }

      for (var _i2 = 0; _i2 < tabs.length; _i2++) {
        var tab = tabs[_i2];

        if (remove === tab) {
          // Found terget tab to remove.
          // It's index is the same as in saved tabs within segment
          tabsSegmentCurrent.splice(_i2, 1);
        }
      }

      var store = tabsSegmentCurrent.concat(tabsSegmentOther);
      $(remove).animate({
        opacity: 0
      }, 400, function () {
        setAttributes({
          tabsConstructed: store
        });
      });
    };

    var toggleTab = function toggleTab(event) {
      var tab = $(event.target).parents('.tab');
      tab.find('.content').toggle('blind', {
        direction: 'up',
        duration: 300
      });

      if (tab.hasClass('collapsed')) {
        tab.removeClass('collapsed').addClass('expanded');
      } else {
        tab.removeClass('expanded').addClass('collapsed');
      }
    };

    var addTab = function addTab() {
      var store = [],
          newTab = {
        id: shortid.generate(),
        segmentSlug: activeSegment,
        title: __('Tab name', 'messia'),
        content: '',
        active: false
      };

      for (var i = 0; i < attributes.tabsConstructed.length; i++) {
        // add other tabs segments
        store.push(attributes.tabsConstructed[i]);
      }

      store.push(newTab);
      setAttributes({
        tabsConstructed: store
      });
    };

    var saveTabs = function saveTabs() {
      var store = [],
          tabs = $(blockRef.current).find('.tab-fields'),
          activeSegment = tabs.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

      for (var i = 0; i < attributes.tabsConstructed.length; i++) {
        if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
          continue;
        } // add other tabs segments


        store.push(attributes.tabsConstructed[i]);
      }

      for (var q = 0; q < tabs.length; q++) {
        store.push({
          id: $(tabs[q]).attr('id'),
          segmentSlug: activeSegment,
          title: $(tabs[q]).find('.tab-title input').val(),
          content: $(tabs[q]).find('.tab-content textarea').val(),
          active: $(tabs[q]).find('.tab-status input').prop('checked')
        });
      }

      setAttributes({
        tabsConstructed: store
      });
    };

    var getExample = function getExample() {
      return exampleImageData;
    };

    var tabsContent = function tabsContent(tab) {
      activeSegment = tab.segmentSlug;
      var tabsConstructedHtml = [];

      var _iterator = _createForOfIteratorHelper(attributes.tabsConstructed.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              tabConstructed = _step$value[1];

          if (tab.segmentSlug != tabConstructed.segmentSlug) {
            continue;
          }

          var tabClasses = ['tab', 'collapsed'];
          if (!tabConstructed.active) tabClasses.push('inactive');
          tabsConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
            className: "messia-card tab-fields",
            size: "small",
            id: tabConstructed.id,
            key: "".concat(tabConstructed.segmentSlug, "-").concat(tabConstructed.id)
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-card-content"
          }, /*#__PURE__*/React.createElement("div", {
            className: tabClasses.join(' ')
          }, /*#__PURE__*/React.createElement(Flex, {
            gap: 2
          }, /*#__PURE__*/React.createElement(FlexItem, {
            className: "move"
          }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
            className: "header"
          }, /*#__PURE__*/React.createElement(InputControl, {
            className: "tab-title",
            value: tabConstructed.title,
            onChange: function onChange(value) {
              return saveTabs();
            }
          })), /*#__PURE__*/React.createElement(FlexItem, {
            title: __('The tab is active and will be displayed', 'messia')
          }, /*#__PURE__*/React.createElement(ToggleControl, {
            className: "tab-status",
            checked: tabConstructed.active,
            onChange: function onChange(value) {
              return saveTabs();
            }
          })), /*#__PURE__*/React.createElement(FlexItem, {
            className: "toggle",
            onClick: toggleTab
          }), /*#__PURE__*/React.createElement(FlexItem, {
            className: "remove",
            onClick: removeTab
          })), /*#__PURE__*/React.createElement(Spacer, {
            className: "content",
            margin: 0,
            paddingTop: 2
          }, /*#__PURE__*/React.createElement("div", {
            className: "tab-content"
          }, /*#__PURE__*/React.createElement("textarea", {
            value: tabConstructed.content,
            onChange: function onChange(value) {
              return saveTabs();
            }
          })))))));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return tabsConstructedHtml;
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
          var tabsHtml = [];

          var _iterator2 = _createForOfIteratorHelper(terms.segment.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  indexSegment = _step2$value[0],
                  segment = _step2$value[1];

              tabsHtml.push({
                name: "segment-".concat(segment.value, "-slug"),
                title: segment.label,
                className: 'tab',
                segmentSlug: segment.value
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          var heading = /*#__PURE__*/React.createElement(Fragment, {
            key: "tip"
          }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
            isDismissible: false,
            status: "warning"
          }, /*#__PURE__*/React.createElement("p", null, __('Add tab into segments, set it\'s content, activity status and reorder them if needed.', 'messia'))), /*#__PURE__*/React.createElement(Spacer, {
            marginTop: 5
          }, /*#__PURE__*/React.createElement(Button, {
            isPrimary: true,
            onClick: addTab
          }, __('Add a tab', 'messia'))));
          var tabs = /*#__PURE__*/React.createElement(TabPanel, {
            className: "messia-tabs-panel",
            activeClass: "active-tab",
            orientation: "horizontal",
            initialTabName: tabsHtml[0].name,
            onSelect: function onSelect(tabName) {},
            tabs: tabsHtml
          }, function (tab) {
            return /*#__PURE__*/React.createElement("div", {
              "data-title": __('Drop item here.', 'messia'),
              className: "tab-constructed"
            }, tabsContent(tab));
          });
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, heading, tabs));
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
                  path: 'messia/v1/block-tabs-panel',
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
          }
        });
      }

      return function () {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(function () {
      if (!editMode) return;
      var observer = new MutationObserver(function (mutationsList, observer) {
        var _iterator3 = _createForOfIteratorHelper(mutationsList),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var mutation = _step3.value;

            if (mutation.type === 'childList') {
              if (mutation.addedNodes.length >= 1) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                  var tabArea = $(mutation.addedNodes[i]).find('.tab-constructed');

                  if (tabArea.length > 0) {
                    sortableInit();
                  }
                }
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
      observer.observe(document.querySelector('body'), {
        attributes: false,
        childList: true,
        subtree: true
      }); // Later, we can stop observing
      // observer.disconnect();
    }, [editMode]);
    return render();
  }

  registerBlockType('messia/block-tabs-panel', {
    title: __('Tabs panel', 'messia'),
    description: __('Customisable tabs with objects custom fields data or any content.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m2.34001,1.85554c-0.79516,-0.00072 -1.45015,0.65428 -1.45015,1.44921l0.00283,17.87359c0,0.52802 0.43812,0.96614 0.96614,0.96614l11.10778,0c0.52802,0 0.96614,-0.43812 0.96614,-0.96614l0,-0.48307l0,-1.44921l0,-1.88982l-0.96614,1.07936l0,0.81046l0,1.44921l0,0.48307l-11.10778,0l-0.00283,-17.87359c0,-0.27266 0.21065,-0.48332 0.48307,-0.48307l3.38149,0.00189c0.27266,0 0.48307,0.21106 0.48307,0.48401l0,2.41441l6.76298,-0.00189l0,1.93228l0,0.41231l0.96614,1.0803l0,-1.97568l0,-1.44921c0,-0.52802 -0.43812,-0.96614 -0.96614,-0.96614l-5.79684,0.00189l0,-1.44827c0,-0.79463 -0.65428,-1.45015 -1.44921,-1.45015l-3.38055,-0.00189zm12.54944,0l-3.38055,0.02076c-0.79525,0.00432 -1.44575,0.66287 -1.44072,1.4577l0.00283,0.45665l0.96614,-0.00566l-0.00283,-0.45665c-0.00174,-0.27276 0.20791,-0.48536 0.48024,-0.48684l3.38055,-0.01982c0.27328,-0.00148 0.48511,0.20738 0.48684,0.48024l0,2.41818l6.76109,0l0.00095,0l-0.00566,15.45635l0,0.00189l-7.23944,0l0,0.96614l7.24416,0l0.00189,0c0.52729,-0.00382 0.96336,-0.44458 0.95954,-0.97274l0.00566,-15.45635l0,-0.00188c-0.00382,-0.52729 -0.44458,-0.96336 -0.97274,-0.95954l-5.78929,0l0,-1.45676l0,-0.00095c-0.00503,-0.79473 -0.6634,-1.44503 -1.4577,-1.44072l-0.00094,0zm-3.97778,8.37352l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108zm2.89842,0l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108z",
      fill: "black"
    }))),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      tabsConstructed: {
        type: 'array',
        default: []
      },
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
    edit: TabsPanelFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/tabs-panel-editor.scss":
/*!************************************************!*\
  !*** ./src/scss/blocks/tabs-panel-editor.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/shortid/index.js":
/*!***************************************!*\
  !*** ./node_modules/shortid/index.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/shortid/lib/index.js");


/***/ }),

/***/ "./node_modules/shortid/lib/alphabet.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/alphabet.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ "./node_modules/shortid/lib/random/random-from-seed.js");

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),

/***/ "./node_modules/shortid/lib/build.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/build.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var generate = __webpack_require__(/*! ./generate */ "./node_modules/shortid/lib/generate.js");
var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1567752802062;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 7;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;


/***/ }),

/***/ "./node_modules/shortid/lib/generate.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/generate.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");
var random = __webpack_require__(/*! ./random/random-byte */ "./node_modules/shortid/lib/random/random-byte-browser.js");
var format = __webpack_require__(/*! nanoid/format */ "./node_modules/shortid/node_modules/nanoid/format.browser.js");

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;


/***/ }),

/***/ "./node_modules/shortid/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/index.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");
var build = __webpack_require__(/*! ./build */ "./node_modules/shortid/lib/build.js");
var isValid = __webpack_require__(/*! ./is-valid */ "./node_modules/shortid/lib/is-valid.js");

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js") || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;


/***/ }),

/***/ "./node_modules/shortid/lib/is-valid.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/is-valid.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-byte-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-byte-browser.js ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-from-seed.js":
/*!*************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-from-seed.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),

/***/ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/lib/util/cluster-worker-id-browser.js ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";


module.exports = 0;


/***/ }),

/***/ "./node_modules/shortid/node_modules/nanoid/format.browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/node_modules/nanoid/format.browser.js ***!
  \********************************************************************/
/***/ (function(module) {

// This file replaces `format.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

module.exports = function (random, alphabet, size) {
  // We can’t use bytes bigger than the alphabet. To make bytes values closer
  // to the alphabet, we apply bitmask on them. We look for the closest
  // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
  // 30 symbols in the alphabet, we will take 31 (00011111).
  // We do not use faster Math.clz32, because it is not available in browsers.
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
  // which is bigger than the alphabet). As a result, we will need more bytes,
  // than ID size, because we will refuse bytes bigger than the alphabet.

  // Every hardware random generator call is costly,
  // because we need to wait for entropy collection. This is why often it will
  // be faster to ask for few extra bytes in advance, to avoid additional calls.

  // Here we calculate how many random bytes should we call in advance.
  // It depends on ID length, mask / alphabet size and magic number 1.6
  // (which was selected according benchmarks).

  // -~f => Math.ceil(f) if n is float number
  // -~i => i + 1 if n is integer number
  var step = -~(1.6 * mask * size / alphabet.length)
  var id = ''

  while (true) {
    var bytes = random(step)
    // Compact alternative for `for (var i = 0; i < step; i++)`
    var i = step
    while (i--) {
      // If random byte is bigger than alphabet even after bitmask,
      // we refuse it by `|| ''`.
      id += alphabet[bytes[i] & mask] || ''
      // More compact than `id.length + 1 === size`
      if (id.length === +size) return id
    }
  }
}


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
/*!*************************************************!*\
  !*** ./src/entries/blocks/tabs-panel-editor.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_tabs_panel_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/tabs-panel-editor.scss */ "./src/scss/blocks/tabs-panel-editor.scss");
/* harmony import */ var _js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/tabs-panel-editor.jsx */ "./src/js/blocks/tabs-panel-editor.jsx");
/* harmony import */ var _js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay10YWJzLXBhbmVsLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsUUFBUixHQUFxQkYsRUFBckIsQ0FBUUUsUUFBUjtFQUNBLElBQVFDLFNBQVIsR0FBc0JILEVBQUUsQ0FBQ0ksS0FBekIsQ0FBUUQsU0FBUjtFQUNBLElBQVFFLGlCQUFSLEdBQThCTCxFQUFFLENBQUNNLE1BQWpDLENBQVFELGlCQUFSO0VBQ0Esa0JBQTZETCxFQUFFLENBQUNPLE9BQWhFO0VBQUEsSUFBUUMsU0FBUixlQUFRQSxTQUFSO0VBQUEsSUFBbUJDLFFBQW5CLGVBQW1CQSxRQUFuQjtFQUFBLElBQTZCQyxRQUE3QixlQUE2QkEsUUFBN0I7RUFBQSxJQUF1Q0MsU0FBdkMsZUFBdUNBLFNBQXZDO0VBQUEsSUFBa0RDLE1BQWxELGVBQWtEQSxNQUFsRDtFQUNBLElBQTBCQyxnQkFBMUIsR0FBK0NiLEVBQS9DLENBQVFjLGdCQUFSO0VBQ0Esc0JBQTZDZCxFQUFFLENBQUNlLFdBQWhEO0VBQUEsSUFBUUMsaUJBQVIsbUJBQVFBLGlCQUFSO0VBQUEsSUFBMkJDLGFBQTNCLG1CQUEyQkEsYUFBM0I7RUFDQSxxQkFBK01qQixFQUFFLENBQUNrQixVQUFsTjtFQUFBLElBQVFDLE1BQVIsa0JBQVFBLE1BQVI7RUFBQSxJQUFnQkMsTUFBaEIsa0JBQWdCQSxNQUFoQjtFQUFBLElBQXdCQyxJQUF4QixrQkFBd0JBLElBQXhCO0VBQUEsSUFBOEJDLFFBQTlCLGtCQUE4QkEsUUFBOUI7RUFBQSxJQUF3Q0MsSUFBeEMsa0JBQXdDQSxJQUF4QztFQUFBLElBQThDQyxZQUE5QyxrQkFBOENBLFlBQTlDO0VBQUEsSUFBNERDLGFBQTVELGtCQUE0REEsYUFBNUQ7RUFBQSxJQUEyRUMsV0FBM0Usa0JBQTJFQSxXQUEz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O1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2tEOztBQUVsRCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3MvdGFicy1wYW5lbC1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy90YWJzLXBhbmVsLWVkaXRvci5zY3NzPzJlNzkiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbm9kZV9tb2R1bGVzL25hbm9pZC9mb3JtYXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL3RhYnMtcGFuZWwtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IGFwaUZldGNoIH0gPSB3cDtcblx0Y29uc3QgeyBhZGRGaWx0ZXIgfSA9IHdwLmhvb2tzO1xuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50LCBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEluc3BlY3RvckNvbnRyb2xzLCBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBCdXR0b24sIE5vdGljZSwgRmxleCwgRmxleEl0ZW0sIENhcmQsIFRvb2xiYXJHcm91cCwgVG9vbGJhckJ1dHRvbiwgUGxhY2Vob2xkZXIsIERpc2FibGVkLCBUb2dnbGVDb250cm9sLCBTcGlubmVyLCBUYWJQYW5lbCwgX19leHBlcmltZW50YWxTcGFjZXI6IFNwYWNlciwgX19leHBlcmltZW50YWxJbnB1dENvbnRyb2w6IElucHV0Q29udHJvbCB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDxnPlxuXHRcdFx0PHBhdGggZD1cIm04Ny4yODEyMSwyOS4xMzc4MmMtMy45OTg3MSwwIC03LjI3NzMxLDMuMjg4MDYgLTcuMjc3MzEsNy4yNzczMWwwLDE0LjU0NTEzbDAuMDA5NDksMGwwLDYzLjA2OTk5YzAsMi42NTMxOCAyLjE5ODM1LDQuODUxNTQgNC44NTE1NCw0Ljg1MTU0bDYxLjc0MzM4LDBjMy4xMDgwMiw5LjgxNjc5IDEyLjMxODM3LDE2Ljk4MDM4IDIzLjEzMDEsMTYuOTgwMzhjMTMuMzQxNzIsMCAyNC4yNTc2OCwtMTAuOTE1OTYgMjQuMjU3NjgsLTI0LjI1NzY5YzAsLTYuNzQ2NjcgLTIuNzk1MzEsLTEyLjg1ODQ3IC03LjI3NzMsLTE3LjI3NDEybDAsLTQzLjM3MDFjMCwtMi42NTMxOCAtMi4xOTgzNiwtNC44NTE1NCAtNC44NTE1NCwtNC44NTE1NGwtOS43MDMwOCwwbDAsLTkuNjkzNTljMCwtMy45ODkyNSAtMy4yODgwNSwtNy4yNzczMSAtNy4yNzczLC03LjI3NzMxbC0xOS40MDYxNSwwYy0xLjg2NjcsMCAtMy41NTMzNywwLjczOTA5IC00Ljg1MTU0LDEuOTA0NmMtMS4yOTgxNywtMS4xNjU1MSAtMi45ODQ4NCwtMS45MDQ2IC00Ljg1MTU0LC0xLjkwNDZsLTE5LjQwNjE1LDBjLTEuODY2NywwIC0zLjU1MzM2LDAuNzM5MDkgLTQuODUxNTQsMS45MDQ2Yy0xLjI5ODE3LC0xLjE2NTUxIC0yLjk4NDgzLC0xLjkwNDYgLTQuODUxNTMsLTEuOTA0NmwtMTkuMzg3MjEsMHptMCw0Ljg1MTU0bDE5LjM4NzIxLDBjMS4zNzM5OCwwIDIuNDI1NzYsMS4wNTE3OSAyLjQyNTc2LDIuNDI1NzdsMCwxNC41NDUxM2w3Mi43NzMwNywwbDAsMzkuNjg0MDdjLTMuMDcwMSwtMS43OTA5MiAtNi41NDc2OCwtMi45MTg1MSAtMTAuMjYyMTQsLTMuMjAyNzljLTAuNjE1OSwtMC4wNTY4MyAtMS4yMzE4MywtMC4wOTQ3NSAtMS44NjY3LC0wLjA5NDc1Yy0xLjY2NzcyLDAgLTMuMjk3NTIsMC4xNzA1NiAtNC44NzA0OSwwLjQ5Mjc1Yy0wLjc4NjQ4LDAuMTYxMDcgLTEuNTYzNDgsMC4zNjk1NCAtMi4zMjE1MywwLjYwNjQ0Yy03LjU5OTUsMi4zNTk0MyAtMTMuNjA3MDYsOC4zNjY5OSAtMTUuOTY2NDgsMTUuOTY2NDhjLTAuMjM2OSwwLjc1ODA2IC0wLjQ0NTM4LDEuNTI1NTcgLTAuNjA2NDUsMi4zMTIwNWMwLDAgMCwwLjAwOTQ5IDAsMC4wMDk0OWMtMC4zMjIxOSwxLjU3Mjk2IC0wLjQ5Mjc0LDMuMjAyNzYgLTAuNDkyNzQsNC44NzA0OGMwLDAuODE0OTEgMC4wNDczNywxLjYyOTgzIDAuMTIzMTgsMi40MjU3N2wtNjAuNzM4OTcsMGwwLC02Ny45MjE1M2wtMC4wMDk0OSwwbDAsLTkuNjkzNTljMCwtMS4zNzM5OCAxLjA1MTgxLC0yLjQyNTc3IDIuNDI1NzcsLTIuNDI1Nzd6bTI5LjA5MDI4LDBsMTkuNDA2MTUsMGMxLjM3Mzk4LDAgMi40MjU3NywxLjA1MTc5IDIuNDI1NzcsMi40MjU3N2wwLDkuNjkzNTlsLTI0LjI1NzY5LDBsMCwtOS42OTM1OWMwLC0xLjM3Mzk4IDEuMDUxNzksLTIuNDI1NzcgMi40MjU3NywtMi40MjU3N3ptMjkuMTA5MjMsMGwxOS40MDYxNSwwYzEuMzczOTgsMCAyLjQyNTc3LDEuMDUxNzkgMi40MjU3NywyLjQyNTc3bDAsOS42OTM1OWwtMjQuMjU3NjksMGwwLC05LjY5MzU5YzAsLTEuMzczOTggMS4wNTE3OSwtMi40MjU3NyAyLjQyNTc3LC0yLjQyNTc3em0yNC4yNTc2OSw1OC4yMDg5N2MwLjY1MzgxLDAgMS4yOTgxNywwLjAzNzkyIDEuOTMzMDQsMC4xMDQyNGMwLjEyMzE4LDAuMDA5NDggMC4yNDYzNiwwLjAyODQzIDAuMzc5MDMsMC4wNDczN2MwLjUxMTY3LDAuMDY2MzIgMS4wMjMzNiwwLjEzMjY3IDEuNTE2MSwwLjIzNjljMC4xNDIxMywwLjAyODQzIDAuMjc0OCwwLjA2NjMyIDAuNDA3NDQsMC4wOTQ3NWMwLjQ2NDMxLDAuMTA0MjQgMC45MTkxNCwwLjIxNzkzIDEuMzczOTgsMC4zNTA2YzAuMTg5NTIsMC4wNjYzMiAwLjM3OTAyLDAuMTMyNjYgMC41Njg1NSwwLjE5ODk4YzAuMzk3OTcsMC4xMzI2NyAwLjc4NjQ2LDAuMjc0OCAxLjE3NDk3LDAuNDM1ODljMC4xOTg5OCwwLjA3NTgxIDAuNDA3NDUsMC4xNzA1NiAwLjYwNjQ0LDAuMjY1MzFjMC4zNDExNCwwLjE1MTYxIDAuNjcyNzYsMC4zMTI3IDEuMDA0NDEsMC40OTI3NGMwLjIxNzk2LDAuMTEzNyAwLjQzNTg5LDAuMjM2OSAwLjY0NDM2LDAuMzUwNmMwLjMxMjY4LDAuMTg5NTIgMC42MjUzOSwwLjM3OTAzIDAuOTI4NjEsMC41Njg1NWMwLjIyNzQyLDAuMTUxNjEgMC40MzU4OSwwLjI5Mzc0IDAuNjUzODIsMC40NTQ4M2MwLjI1NTg0LDAuMTcwNTYgMC41MDIyLDAuMzYwMDYgMC43NDg1OSwwLjU0OTU5YzAuMjM2ODgsMC4xODk1IDAuNDczNzgsMC4zNzkwMiAwLjcxMDY1LDAuNTg3NDljNC4xMjE5MiwzLjU2Mjg1IDYuNzU2MTYsOC44MjE4MiA2Ljc1NjE2LDE0LjY2ODMxYzAsMTAuNjY5NiAtOC43MzY1NiwxOS40MDYxNSAtMTkuNDA2MTUsMTkuNDA2MTVjLTkuMjE5ODIsMCAtMTYuOTgwMzksLTYuNTE5MjUgLTE4LjkyMjg5LC0xNS4xNzA1NGMtMC4xNDIxMywtMC42MjUzOSAtMC4yNDYzNiwtMS4yNTA3NyAtMC4zMzE2NSwtMS44ODU2NWMwLC0wLjA2NjMyIC0wLjAxODk1LC0wLjEzMjY2IC0wLjAyODQzLC0wLjE5ODk4Yy0wLjA3NTgxLC0wLjcxMDY4IC0wLjEyMzE4LC0xLjQzMDgyIC0wLjEyMzE4LC0yLjE1MDk4YzAsLTAuNjYzMyAwLjAzNzkxLC0xLjMyNjU4IDAuMTA0MjMsLTEuOTcwOTRjMCwtMC4wMDk0OCAtMC4wMDk0OCwtMC4wMTg5NCAwLC0wLjAxODk0YzAuOTI4NjEsLTkuMDk2NjMgOC4yMTU0LC0xNi4zODM0MyAxNy4zMTIwMywtMTcuMzEyMDNjMCwtMC4wMDk0OSAwLjAwOTQ2LDAgMC4wMTg5NSwwYzAuNjQ0MzYsLTAuMDc1ODEgMS4zMDc2MywtMC4xMDQyNCAxLjk3MDk0LC0wLjEwNDI0elwiIGZpbGw9XCJibGFja1wiIC8+XG5cdFx0XHQ8bGluZSBmaWxsPVwibm9uZVwiIGlkPVwic3ZnXzJcIiBzdHJva2U9XCIjMDAwMDAwXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCI1XCIgeDE9XCIxNzAuMTY2NjhcIiB4Mj1cIjE3MC4xNjY2OFwiIHkxPVwiMTAwLjE2NjY3XCIgeTI9XCIxMjIuODU1MzhcIiAvPlxuXHRcdFx0PGxpbmUgZmlsbD1cIm5vbmVcIiBpZD1cInN2Z180XCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiNVwiIHRyYW5zZm9ybT1cInJvdGF0ZSg5MCAxNzAuMTY3IDExMS41MTEpXCIgeDE9XCIxNzAuMTY2NjdcIiB4Mj1cIjE3MC4xNjY2N1wiIHkxPVwiMTAwLjE2NjY0XCIgeTI9XCIxMjIuODU1MzVcIiAvPlxuXHRcdDwvZz5cblx0PC9zdmc+O1xuXHRjb25zdCBzaG9ydGlkID0gcmVxdWlyZSgnc2hvcnRpZCcpO1xuXG5cdGxldCBsYXN0UHJldmlldyA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIFRhYnNQYW5lbEZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblx0XHRjb25zdCBbdGVybXNGZXRjaGVkLCBzZXRUZXJtc0ZldGNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRcdGNvbnN0IFt0ZXJtcywgc2V0VGVybXNdID0gdXNlU3RhdGUoe1xuXHRcdFx0c2VnbWVudDogW10sXG5cdFx0fSk7XG5cblx0XHRsZXQgYWN0aXZlU2VnbWVudDtcblx0XHRsZXQgYmxvY2tSZWYgPSB1c2VSZWYoKTtcblxuXHRcdGNvbnN0IHNvcnRhYmxlSW5pdCA9ICgpID0+IHtcblxuXHRcdFx0JChibG9ja1JlZi5jdXJyZW50KS5maW5kKCcudGFiLWNvbnN0cnVjdGVkJykubm90KCd1aS1zb3J0YWJsZScpLnNvcnRhYmxlKHtcblx0XHRcdFx0Zm9yY2VIZWxwZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdFx0Ly9kaXN0YW5jZTogMTAsXG5cdFx0XHRcdHRvbGVyYW5jZTogJ2ludGVyc2VjdCcsXG5cdFx0XHRcdC8vY3Vyc29yOiAnZ3JhYmJpZycsXG5cdFx0XHRcdHNjcm9sbDogdHJ1ZSxcblx0XHRcdFx0c2Nyb2xsU2Vuc2l0aXZpdHk6IDIwLFxuXHRcdFx0XHRjb250YWlubWVudDogJy5lZGl0LXdpZGdldHMtYmxvY2stZWRpdG9yJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdzb3J0YWJsZS1wbGFjZWhvbGRlcicsXG5cdFx0XHRcdGhhbmRsZTogJy5tb3ZlJyxcblx0XHRcdFx0Ly96SW5kZXg6IDEwMDAwLFxuXHRcdFx0XHRzdGFydDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5pdGVtLnJlbW92ZUNsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdHNhdmVUYWJzKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW1vdmVUYWIgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0XG5cdFx0XHRcdHRhYnNTZWdtZW50T3RoZXIgPSBbXSxcblx0XHRcdFx0dGFic1NlZ21lbnRDdXJyZW50ID0gW10sXG5cdFx0XHRcdC8vIEZpbmQgc2hvd24gdGFicyBpbiBjdXJyZW50IHNlZ21lbnRcblx0XHRcdFx0dGFicyA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFiLWNvbnN0cnVjdGVkJykucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1maWVsZHMnKSxcblx0XHRcdFx0Ly8gRGVmaW5lIHRhYiBiZWluZyByZW1vdmVkXG5cdFx0XHRcdHJlbW92ZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFiLWZpZWxkcycpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZFtpXS5zZWdtZW50U2x1ZyA9PT0gYWN0aXZlU2VnbWVudCkge1xuXHRcdFx0XHRcdC8vIEZpbmQgc2F2ZWQgdGFicyBpbiBjdXJyZW50IHNlZ21lbnRcblx0XHRcdFx0XHR0YWJzU2VnbWVudEN1cnJlbnQucHVzaChhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZFtpXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFic1NlZ21lbnRPdGhlci5wdXNoKGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgdGFiID0gdGFic1tpXTtcblx0XHRcdFx0aWYgKHJlbW92ZSA9PT0gdGFiKSB7XG5cdFx0XHRcdFx0Ly8gRm91bmQgdGVyZ2V0IHRhYiB0byByZW1vdmUuXG5cdFx0XHRcdFx0Ly8gSXQncyBpbmRleCBpcyB0aGUgc2FtZSBhcyBpbiBzYXZlZCB0YWJzIHdpdGhpbiBzZWdtZW50XG5cdFx0XHRcdFx0dGFic1NlZ21lbnRDdXJyZW50LnNwbGljZShpLCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgc3RvcmUgPSB0YWJzU2VnbWVudEN1cnJlbnQuY29uY2F0KHRhYnNTZWdtZW50T3RoZXIpO1xuXG5cdFx0XHQkKHJlbW92ZSkuYW5pbWF0ZSh7XG5cdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHR9LCA0MDAsICgpID0+IHtcblx0XHRcdFx0c2V0QXR0cmlidXRlcyh7XG5cdFx0XHRcdFx0dGFic0NvbnN0cnVjdGVkOiBzdG9yZVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRvZ2dsZVRhYiA9IChldmVudCkgPT4ge1xuXHRcdFx0dmFyIHRhYiA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcudGFiJyk7XG5cblx0XHRcdHRhYi5maW5kKCcuY29udGVudCcpLnRvZ2dsZSgnYmxpbmQnLCB7XG5cdFx0XHRcdGRpcmVjdGlvbjogJ3VwJyxcblx0XHRcdFx0ZHVyYXRpb246IDMwMFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh0YWIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdHRhYi5yZW1vdmVDbGFzcygnY29sbGFwc2VkJykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGFiLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBhZGRUYWIgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdHN0b3JlID0gW10sXG5cdFx0XHRcdG5ld1RhYiA9IHtcblx0XHRcdFx0XHRpZDogc2hvcnRpZC5nZW5lcmF0ZSgpLFxuXHRcdFx0XHRcdHNlZ21lbnRTbHVnOiBhY3RpdmVTZWdtZW50LFxuXHRcdFx0XHRcdHRpdGxlOiBfXygnVGFiIG5hbWUnLCAnbWVzc2lhJyksXG5cdFx0XHRcdFx0Y29udGVudDogJycsXG5cdFx0XHRcdFx0YWN0aXZlOiBmYWxzZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdC8vIGFkZCBvdGhlciB0YWJzIHNlZ21lbnRzXG5cdFx0XHRcdHN0b3JlLnB1c2goYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWRbaV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRzdG9yZS5wdXNoKG5ld1RhYik7XG5cblx0XHRcdHNldEF0dHJpYnV0ZXMoe1xuXHRcdFx0XHR0YWJzQ29uc3RydWN0ZWQ6IHN0b3JlXG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3Qgc2F2ZVRhYnMgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdHN0b3JlID0gW10sXG5cdFx0XHRcdHRhYnMgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy50YWItZmllbGRzJyksXG5cdFx0XHRcdGFjdGl2ZVNlZ21lbnQgPSB0YWJzLnBhcmVudHMoJy5tZXNzaWEtdGFicy1wYW5lbCcpLmZpbmQoJ1tyb2xlPVwidGFicGFuZWxcIl0nKS5hdHRyKCdpZCcpLm1hdGNoKC9zZWdtZW50LSguKyktc2x1Zy8pWzFdO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZFtpXS5zZWdtZW50U2x1ZyA9PT0gYWN0aXZlU2VnbWVudCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFkZCBvdGhlciB0YWJzIHNlZ21lbnRzXG5cdFx0XHRcdHN0b3JlLnB1c2goYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWRbaV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBxID0gMDsgcSA8IHRhYnMubGVuZ3RoOyBxKyspIHtcblx0XHRcdFx0c3RvcmUucHVzaCh7XG5cdFx0XHRcdFx0aWQ6ICQodGFic1txXSkuYXR0cignaWQnKSxcblx0XHRcdFx0XHRzZWdtZW50U2x1ZzogYWN0aXZlU2VnbWVudCxcblx0XHRcdFx0XHR0aXRsZTogJCh0YWJzW3FdKS5maW5kKCcudGFiLXRpdGxlIGlucHV0JykudmFsKCksXG5cdFx0XHRcdFx0Y29udGVudDogJCh0YWJzW3FdKS5maW5kKCcudGFiLWNvbnRlbnQgdGV4dGFyZWEnKS52YWwoKSxcblx0XHRcdFx0XHRhY3RpdmU6ICQodGFic1txXSkuZmluZCgnLnRhYi1zdGF0dXMgaW5wdXQnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKHsgdGFic0NvbnN0cnVjdGVkOiBzdG9yZSB9KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFic0NvbnRlbnQgPSAodGFiKSA9PiB7XG5cblx0XHRcdGFjdGl2ZVNlZ21lbnQgPSB0YWIuc2VnbWVudFNsdWc7XG5cdFx0XHRjb25zdCB0YWJzQ29uc3RydWN0ZWRIdG1sID0gW107XG5cblx0XHRcdGZvciAoY29uc3QgW2luZGV4LCB0YWJDb25zdHJ1Y3RlZF0gb2YgYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWQuZW50cmllcygpKSB7XG5cblx0XHRcdFx0aWYgKHRhYi5zZWdtZW50U2x1ZyAhPSB0YWJDb25zdHJ1Y3RlZC5zZWdtZW50U2x1Zykge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHRhYkNsYXNzZXMgPSBbJ3RhYicsICdjb2xsYXBzZWQnXTtcblx0XHRcdFx0aWYgKCF0YWJDb25zdHJ1Y3RlZC5hY3RpdmUpIHRhYkNsYXNzZXMucHVzaCgnaW5hY3RpdmUnKTtcblxuXHRcdFx0XHR0YWJzQ29uc3RydWN0ZWRIdG1sLnB1c2goXG5cdFx0XHRcdFx0PENhcmRcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkIHRhYi1maWVsZHNcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0XHRcdGlkPXt0YWJDb25zdHJ1Y3RlZC5pZH1cblx0XHRcdFx0XHRcdGtleT17YCR7dGFiQ29uc3RydWN0ZWQuc2VnbWVudFNsdWd9LSR7dGFiQ29uc3RydWN0ZWQuaWR9YH0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17dGFiQ2xhc3Nlcy5qb2luKCcgJyl9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cIm1vdmVcIj4mZXF1aXY7PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJoZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PElucHV0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInRhYi10aXRsZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RhYkNvbnN0cnVjdGVkLnRpdGxlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHNhdmVUYWJzKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtfXygnVGhlIHRhYiBpcyBhY3RpdmUgYW5kIHdpbGwgYmUgZGlzcGxheWVkJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJ0YWItc3RhdHVzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGVja2VkPXt0YWJDb25zdHJ1Y3RlZC5hY3RpdmV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4gc2F2ZVRhYnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwidG9nZ2xlXCIgb25DbGljaz17dG9nZ2xlVGFifT48L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cInJlbW92ZVwiIG9uQ2xpY2s9e3JlbW92ZVRhYn0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdFx0PFNwYWNlclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29udGVudFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJnaW49ezB9XG5cdFx0XHRcdFx0XHRcdFx0XHRwYWRkaW5nVG9wPXsyfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHRleHRhcmVhXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RhYkNvbnN0cnVjdGVkLmNvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4gc2F2ZVRhYnMoKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGV4dGFyZWE+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L1NwYWNlcj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L0NhcmQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0YWJzQ29uc3RydWN0ZWRIdG1sO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRlcm1zRmV0Y2hlZCkge1xuXHRcdFx0XHRpZiAodGVybXMuc2VnbWVudC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXHRcdFx0XHRcdGNvbnN0IHRhYnNIdG1sID0gW107XG5cblx0XHRcdFx0XHRmb3IgKGNvbnN0IFtpbmRleFNlZ21lbnQsIHNlZ21lbnRdIG9mIHRlcm1zLnNlZ21lbnQuZW50cmllcygpKSB7XG5cdFx0XHRcdFx0XHR0YWJzSHRtbC5wdXNoKHtcblx0XHRcdFx0XHRcdFx0bmFtZTogYHNlZ21lbnQtJHtzZWdtZW50LnZhbHVlfS1zbHVnYCxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHNlZ21lbnQubGFiZWwsXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3RhYicsXG5cdFx0XHRcdFx0XHRcdHNlZ21lbnRTbHVnOiBzZWdtZW50LnZhbHVlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgaGVhZGluZyA9XG5cdFx0XHRcdFx0XHQ8RnJhZ21lbnQga2V5PSd0aXAnPlxuXHRcdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHA+e19fKCdBZGQgdGFiIGludG8gc2VnbWVudHMsIHNldCBpdFxcJ3MgY29udGVudCwgYWN0aXZpdHkgc3RhdHVzIGFuZCByZW9yZGVyIHRoZW0gaWYgbmVlZGVkLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0XHQ8U3BhY2VyXG5cdFx0XHRcdFx0XHRcdFx0bWFyZ2luVG9wPXs1fT5cblx0XHRcdFx0XHRcdFx0XHQ8QnV0dG9uIGlzUHJpbWFyeSBvbkNsaWNrPXthZGRUYWJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0e19fKCdBZGQgYSB0YWInLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvU3BhY2VyPlxuXHRcdFx0XHRcdFx0PC9GcmFnbWVudD5cblxuXHRcdFx0XHRcdGNvbnN0IHRhYnMgPSA8VGFiUGFuZWxcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS10YWJzLXBhbmVsXCJcblx0XHRcdFx0XHRcdGFjdGl2ZUNsYXNzPVwiYWN0aXZlLXRhYlwiXG5cdFx0XHRcdFx0XHRvcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0aW5pdGlhbFRhYk5hbWU9e3RhYnNIdG1sWzBdLm5hbWV9XG5cdFx0XHRcdFx0XHRvblNlbGVjdD17KHRhYk5hbWUpID0+IHsgfX1cblx0XHRcdFx0XHRcdHRhYnM9e3RhYnNIdG1sfT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0KHRhYikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiA8ZGl2IGRhdGEtdGl0bGU9e19fKCdEcm9wIGl0ZW0gaGVyZS4nLCAnbWVzc2lhJyl9IGNsYXNzTmFtZT1cInRhYi1jb25zdHJ1Y3RlZFwiPnt0YWJzQ29udGVudCh0YWIpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC9UYWJQYW5lbD5cblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdFx0e2hlYWRpbmd9XG5cdFx0XHRcdFx0XHRcdFx0e3RhYnN9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCIgbGFiZWw9e19fKFwiWW91IGhhdmUgbm8gc2VnbWVudHMuIENyZWF0ZSBvbmUuXCIsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyID5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e25hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFRlcm1zID0gYXN5bmMgKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgYXBpRmV0Y2goe1xuXHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL2Jsb2NrLXRhYnMtcGFuZWwnLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0ZGF0YTogeyBjdXJyZW50QXR0cnM6IGF0dHJpYnV0ZXMgfVxuXHRcdFx0fSkudGhlbihyZXNwb25zZSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3BvbnNlLnRlcm1zLnNlZ21lbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRfXygnTWVzc2lhIENhdGVnb3J5IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IFNlZ21lbnQuIFVuaXQgb3BlcmF0aW9uIGlzIG5vdCBwb3NzaWJsZS4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXNwb25zZTtcblxuXHRcdFx0fSkuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdF9fKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZWNlaXZpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgZm9yIENhdGVnb3J5IFRlcm1zIGJsb2NrJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0bGV0IGlzTW91bnRlZCA9IHRydWU7XG5cdFx0XHRpZiAoIXRlcm1zRmV0Y2hlZCAmJiAhYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblxuXHRcdFx0XHRnZXRUZXJtcygpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cblx0XHRcdFx0XHRpZiAoaXNNb3VudGVkKSB7XG5cblx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoe1xuXHRcdFx0XHRcdFx0XHR0YWJzQ29uc3RydWN0ZWQ6IHJlc3BvbnNlLnZhbGlkQXR0cnMudGFic0NvbnN0cnVjdGVkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHNldFRlcm1zKHJlc3BvbnNlLnRlcm1zKTtcblx0XHRcdFx0XHRcdHNldFRlcm1zRmV0Y2hlZCh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFt0ZXJtc0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGlmICghZWRpdE1vZGUpIHJldHVybjtcblxuXHRcdFx0bGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnNMaXN0KSB7XG5cdFx0XHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG5cdFx0XHRcdFx0XHRpZiAobXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YWJBcmVhID0gJChtdXRhdGlvbi5hZGRlZE5vZGVzW2ldKS5maW5kKCcudGFiLWNvbnN0cnVjdGVkJyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRhYkFyZWEubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c29ydGFibGVJbml0KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXR0cmlidXRlczogZmFsc2UsXG5cdFx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gTGF0ZXIsIHdlIGNhbiBzdG9wIG9ic2VydmluZ1xuXHRcdFx0Ly8gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuXHRcdH0sIFtlZGl0TW9kZV0pO1xuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay10YWJzLXBhbmVsJywge1xuXHRcdHRpdGxlOiBfXygnVGFicyBwYW5lbCcsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ0N1c3RvbWlzYWJsZSB0YWJzIHdpdGggb2JqZWN0cyBjdXN0b20gZmllbGRzIGRhdGEgb3IgYW55IGNvbnRlbnQuJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnPjxwYXRoIGQ9XCJtMi4zNDAwMSwxLjg1NTU0Yy0wLjc5NTE2LC0wLjAwMDcyIC0xLjQ1MDE1LDAuNjU0MjggLTEuNDUwMTUsMS40NDkyMWwwLjAwMjgzLDE3Ljg3MzU5YzAsMC41MjgwMiAwLjQzODEyLDAuOTY2MTQgMC45NjYxNCwwLjk2NjE0bDExLjEwNzc4LDBjMC41MjgwMiwwIDAuOTY2MTQsLTAuNDM4MTIgMC45NjYxNCwtMC45NjYxNGwwLC0wLjQ4MzA3bDAsLTEuNDQ5MjFsMCwtMS44ODk4MmwtMC45NjYxNCwxLjA3OTM2bDAsMC44MTA0NmwwLDEuNDQ5MjFsMCwwLjQ4MzA3bC0xMS4xMDc3OCwwbC0wLjAwMjgzLC0xNy44NzM1OWMwLC0wLjI3MjY2IDAuMjEwNjUsLTAuNDgzMzIgMC40ODMwNywtMC40ODMwN2wzLjM4MTQ5LDAuMDAxODljMC4yNzI2NiwwIDAuNDgzMDcsMC4yMTEwNiAwLjQ4MzA3LDAuNDg0MDFsMCwyLjQxNDQxbDYuNzYyOTgsLTAuMDAxODlsMCwxLjkzMjI4bDAsMC40MTIzMWwwLjk2NjE0LDEuMDgwM2wwLC0xLjk3NTY4bDAsLTEuNDQ5MjFjMCwtMC41MjgwMiAtMC40MzgxMiwtMC45NjYxNCAtMC45NjYxNCwtMC45NjYxNGwtNS43OTY4NCwwLjAwMTg5bDAsLTEuNDQ4MjdjMCwtMC43OTQ2MyAtMC42NTQyOCwtMS40NTAxNSAtMS40NDkyMSwtMS40NTAxNWwtMy4zODA1NSwtMC4wMDE4OXptMTIuNTQ5NDQsMGwtMy4zODA1NSwwLjAyMDc2Yy0wLjc5NTI1LDAuMDA0MzIgLTEuNDQ1NzUsMC42NjI4NyAtMS40NDA3MiwxLjQ1NzdsMC4wMDI4MywwLjQ1NjY1bDAuOTY2MTQsLTAuMDA1NjZsLTAuMDAyODMsLTAuNDU2NjVjLTAuMDAxNzQsLTAuMjcyNzYgMC4yMDc5MSwtMC40ODUzNiAwLjQ4MDI0LC0wLjQ4Njg0bDMuMzgwNTUsLTAuMDE5ODJjMC4yNzMyOCwtMC4wMDE0OCAwLjQ4NTExLDAuMjA3MzggMC40ODY4NCwwLjQ4MDI0bDAsMi40MTgxOGw2Ljc2MTA5LDBsMC4wMDA5NSwwbC0wLjAwNTY2LDE1LjQ1NjM1bDAsMC4wMDE4OWwtNy4yMzk0NCwwbDAsMC45NjYxNGw3LjI0NDE2LDBsMC4wMDE4OSwwYzAuNTI3MjksLTAuMDAzODIgMC45NjMzNiwtMC40NDQ1OCAwLjk1OTU0LC0wLjk3Mjc0bDAuMDA1NjYsLTE1LjQ1NjM1bDAsLTAuMDAxODhjLTAuMDAzODIsLTAuNTI3MjkgLTAuNDQ0NTgsLTAuOTYzMzYgLTAuOTcyNzQsLTAuOTU5NTRsLTUuNzg5MjksMGwwLC0xLjQ1Njc2bDAsLTAuMDAwOTVjLTAuMDA1MDMsLTAuNzk0NzMgLTAuNjYzNCwtMS40NDUwMyAtMS40NTc3LC0xLjQ0MDcybC0wLjAwMDk0LDB6bS0zLjk3Nzc4LDguMzczNTJsLTAuNzIwODMsMC42NDM0N2wyLjEyNzU4LDIuMzc3NjFsLTIuMTI3NTgsMi4zNzc2MWwwLjcyMDgzLDAuNjQ0NDFsMi43MDMxMiwtMy4wMjIwMmwtMi43MDMxMiwtMy4wMjEwOHptMi44OTg0MiwwbC0wLjcyMDgzLDAuNjQzNDdsMi4xMjc1OCwyLjM3NzYxbC0yLjEyNzU4LDIuMzc3NjFsMC43MjA4MywwLjY0NDQxbDIuNzAzMTIsLTMuMDIyMDJsLTIuNzAzMTIsLTMuMDIxMDh6XCIgZmlsbD1cImJsYWNrXCIgLz48L2c+PC9zdmc+LFxuXHRcdGNhdGVnb3J5OiAnbWVzc2lhJyxcblx0XHRrZXl3b3JkczogWydvYmplY3QnXSxcblx0XHRzdHlsZXM6IFtdLFxuXHRcdHZhcmlhdGlvbnM6IFtdLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdHRhYnNDb25zdHJ1Y3RlZDoge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRpc0V4YW1wbGU6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IFRhYnNQYW5lbEZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcmV0dXJuIGFscGhhYmV0IHx8IE9SSUdJTkFMO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXQ6IGdldCxcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNTY3NzUyODAyMDYyO1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDc7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBidWlsZChjbHVzdGVyV29ya2VySWQpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZSh2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoc2Vjb25kcyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnbmFub2lkL2Zvcm1hdCcpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGZvcm1hdChyYW5kb20sIGFscGhhYmV0LmdldCgpLCAxKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICByZXR1cm4gYnVpbGQoY2x1c3RlcldvcmtlcklkKTtcbn1cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBub25BbHBoYWJldGljID0gbmV3IFJlZ0V4cCgnW14nICtcbiAgICAgIGFscGhhYmV0LmdldCgpLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpICtcbiAgICAnXScpO1xuICAgIHJldHVybiAhbm9uQWxwaGFiZXRpYy50ZXN0KGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG52YXIgcmFuZG9tQnl0ZTtcblxuaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcbiIsIi8vIFRoaXMgZmlsZSByZXBsYWNlcyBgZm9ybWF0LmpzYCBpbiBidW5kbGVycyBsaWtlIHdlYnBhY2sgb3IgUm9sbHVwLFxuLy8gYWNjb3JkaW5nIHRvIGBicm93c2VyYCBjb25maWcgaW4gYHBhY2thZ2UuanNvbmAuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJhbmRvbSwgYWxwaGFiZXQsIHNpemUpIHtcbiAgLy8gV2UgY2Fu4oCZdCB1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LiBUbyBtYWtlIGJ5dGVzIHZhbHVlcyBjbG9zZXJcbiAgLy8gdG8gdGhlIGFscGhhYmV0LCB3ZSBhcHBseSBiaXRtYXNrIG9uIHRoZW0uIFdlIGxvb2sgZm9yIHRoZSBjbG9zZXN0XG4gIC8vIGAyICoqIHggLSAxYCBudW1iZXIsIHdoaWNoIHdpbGwgYmUgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgc2l6ZS4gSWYgd2UgaGF2ZVxuICAvLyAzMCBzeW1ib2xzIGluIHRoZSBhbHBoYWJldCwgd2Ugd2lsbCB0YWtlIDMxICgwMDAxMTExMSkuXG4gIC8vIFdlIGRvIG5vdCB1c2UgZmFzdGVyIE1hdGguY2x6MzIsIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBicm93c2Vycy5cbiAgdmFyIG1hc2sgPSAoMiA8PCBNYXRoLmxvZyhhbHBoYWJldC5sZW5ndGggLSAxKSAvIE1hdGguTE4yKSAtIDFcbiAgLy8gQml0bWFzayBpcyBub3QgYSBwZXJmZWN0IHNvbHV0aW9uIChpbiBvdXIgZXhhbXBsZSBpdCB3aWxsIHBhc3MgMzEgYnl0ZXMsXG4gIC8vIHdoaWNoIGlzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldCkuIEFzIGEgcmVzdWx0LCB3ZSB3aWxsIG5lZWQgbW9yZSBieXRlcyxcbiAgLy8gdGhhbiBJRCBzaXplLCBiZWNhdXNlIHdlIHdpbGwgcmVmdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC5cblxuICAvLyBFdmVyeSBoYXJkd2FyZSByYW5kb20gZ2VuZXJhdG9yIGNhbGwgaXMgY29zdGx5LFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gd2FpdCBmb3IgZW50cm9weSBjb2xsZWN0aW9uLiBUaGlzIGlzIHdoeSBvZnRlbiBpdCB3aWxsXG4gIC8vIGJlIGZhc3RlciB0byBhc2sgZm9yIGZldyBleHRyYSBieXRlcyBpbiBhZHZhbmNlLCB0byBhdm9pZCBhZGRpdGlvbmFsIGNhbGxzLlxuXG4gIC8vIEhlcmUgd2UgY2FsY3VsYXRlIGhvdyBtYW55IHJhbmRvbSBieXRlcyBzaG91bGQgd2UgY2FsbCBpbiBhZHZhbmNlLlxuICAvLyBJdCBkZXBlbmRzIG9uIElEIGxlbmd0aCwgbWFzayAvIGFscGhhYmV0IHNpemUgYW5kIG1hZ2ljIG51bWJlciAxLjZcbiAgLy8gKHdoaWNoIHdhcyBzZWxlY3RlZCBhY2NvcmRpbmcgYmVuY2htYXJrcykuXG5cbiAgLy8gLX5mID0+IE1hdGguY2VpbChmKSBpZiBuIGlzIGZsb2F0IG51bWJlclxuICAvLyAtfmkgPT4gaSArIDEgaWYgbiBpcyBpbnRlZ2VyIG51bWJlclxuICB2YXIgc3RlcCA9IC1+KDEuNiAqIG1hc2sgKiBzaXplIC8gYWxwaGFiZXQubGVuZ3RoKVxuICB2YXIgaWQgPSAnJ1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGJ5dGVzID0gcmFuZG9tKHN0ZXApXG4gICAgLy8gQ29tcGFjdCBhbHRlcm5hdGl2ZSBmb3IgYGZvciAodmFyIGkgPSAwOyBpIDwgc3RlcDsgaSsrKWBcbiAgICB2YXIgaSA9IHN0ZXBcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAvLyBJZiByYW5kb20gYnl0ZSBpcyBiaWdnZXIgdGhhbiBhbHBoYWJldCBldmVuIGFmdGVyIGJpdG1hc2ssXG4gICAgICAvLyB3ZSByZWZ1c2UgaXQgYnkgYHx8ICcnYC5cbiAgICAgIGlkICs9IGFscGhhYmV0W2J5dGVzW2ldICYgbWFza10gfHwgJydcbiAgICAgIC8vIE1vcmUgY29tcGFjdCB0aGFuIGBpZC5sZW5ndGggKyAxID09PSBzaXplYFxuICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gK3NpemUpIHJldHVybiBpZFxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3MvdGFicy1wYW5lbC1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvdGFicy1wYW5lbC1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwiYWRkRmlsdGVyIiwiaG9va3MiLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsImVsZW1lbnQiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiU2VydmVyU2lkZVJlbmRlciIsInNlcnZlclNpZGVSZW5kZXIiLCJibG9ja0VkaXRvciIsIkluc3BlY3RvckNvbnRyb2xzIiwiQmxvY2tDb250cm9scyIsImNvbXBvbmVudHMiLCJCdXR0b24iLCJOb3RpY2UiLCJGbGV4IiwiRmxleEl0ZW0iLCJDYXJkIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJUb2dnbGVDb250cm9sIiwiU3Bpbm5lciIsIlRhYlBhbmVsIiwiU3BhY2VyIiwiX19leHBlcmltZW50YWxTcGFjZXIiLCJJbnB1dENvbnRyb2wiLCJfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbCIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJzaG9ydGlkIiwicmVxdWlyZSIsImxhc3RQcmV2aWV3IiwiVGFic1BhbmVsRm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImVkaXRNb2RlIiwic2V0RWRpdE1vZGUiLCJ0ZXJtc0ZldGNoZWQiLCJzZXRUZXJtc0ZldGNoZWQiLCJzZWdtZW50IiwidGVybXMiLCJzZXRUZXJtcyIsImFjdGl2ZVNlZ21lbnQiLCJibG9ja1JlZiIsInNvcnRhYmxlSW5pdCIsImN1cnJlbnQiLCJmaW5kIiwibm90Iiwic29ydGFibGUiLCJmb3JjZUhlbHBlclNpemUiLCJmb3JjZVBsYWNlaG9sZGVyU2l6ZSIsIm9wYWNpdHkiLCJ0b2xlcmFuY2UiLCJzY3JvbGwiLCJzY3JvbGxTZW5zaXRpdml0eSIsImNvbnRhaW5tZW50IiwicGxhY2Vob2xkZXIiLCJoYW5kbGUiLCJzdGFydCIsImV2ZW50IiwidWkiLCJpdGVtIiwiYWRkQ2xhc3MiLCJiZWZvcmVTdG9wIiwicmVtb3ZlQ2xhc3MiLCJzdG9wIiwic2F2ZVRhYnMiLCJyZW1vdmVUYWIiLCJ0YWJzU2VnbWVudE90aGVyIiwidGFic1NlZ21lbnRDdXJyZW50IiwidGFicyIsInRhcmdldCIsImNsb3Nlc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiaSIsInRhYnNDb25zdHJ1Y3RlZCIsImxlbmd0aCIsInNlZ21lbnRTbHVnIiwicHVzaCIsInRhYiIsInNwbGljZSIsInN0b3JlIiwiY29uY2F0IiwiYW5pbWF0ZSIsInRvZ2dsZVRhYiIsInBhcmVudHMiLCJ0b2dnbGUiLCJkaXJlY3Rpb24iLCJkdXJhdGlvbiIsImhhc0NsYXNzIiwiYWRkVGFiIiwibmV3VGFiIiwiaWQiLCJnZW5lcmF0ZSIsInRpdGxlIiwiY29udGVudCIsImFjdGl2ZSIsImF0dHIiLCJtYXRjaCIsInEiLCJ2YWwiLCJwcm9wIiwiZ2V0RXhhbXBsZSIsInRhYnNDb250ZW50IiwidGFic0NvbnN0cnVjdGVkSHRtbCIsImVudHJpZXMiLCJpbmRleCIsInRhYkNvbnN0cnVjdGVkIiwidGFiQ2xhc3NlcyIsImpvaW4iLCJ2YWx1ZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRhYnNIdG1sIiwiaW5kZXhTZWdtZW50IiwibGFiZWwiLCJoZWFkaW5nIiwidGFiTmFtZSIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsImdldFRlcm1zIiwicGF0aCIsIm1ldGhvZCIsImRhdGEiLCJjdXJyZW50QXR0cnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJkaXNwYXRjaCIsImNyZWF0ZU5vdGljZSIsImlzRGlzbWlzc2libGUiLCJjYXRjaCIsImUiLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwiaXNNb3VudGVkIiwidmFsaWRBdHRycyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uc0xpc3QiLCJtdXRhdGlvbiIsInR5cGUiLCJhZGRlZE5vZGVzIiwidGFiQXJlYSIsIm9ic2VydmUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/testimonials-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/testimonials-editor.jsx ***!
  \***********************************************/
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
  var BlockControls = wp.blockEditor.BlockControls;
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
  }, /*#__PURE__*/React.createElement("title", null, "Layer 1"), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "37.11686",
    fill: "#cccccc",
    id: "svg_3",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "31.10835",
    fill: "#ffffff",
    id: "svg_7",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.44604,49.58966c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_26"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_29",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "23.6448"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_30",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "33.08893"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_93"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_34"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_35"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_36"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_37"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "84.7264",
    fill: "#cccccc",
    id: "svg_97",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "78.71789",
    fill: "#ffffff",
    id: "svg_98",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.38214,97.26131c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_99"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_100",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "71.25435"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_101",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "80.69847"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_102"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_103"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_104"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_105"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_106"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_107"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "131.72641",
    fill: "#cccccc",
    id: "svg_110",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "125.7179",
    fill: "#ffffff",
    id: "svg_111",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.52134,144.40417c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_112"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_113",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "118.25435"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_114",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "127.69848"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_115"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_116"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_117"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_118"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_119"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_120"
  })));
  var lastPreview = false;

  function TestimonialsFn(props) {
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
        attrPostsFetched = _useState4[0],
        setAttrPostsFetched = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        attrPosts = _useState6[0],
        setAttrPosts = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        rendered = _useState8[0],
        setRendered = _useState8[1];

    var blockRef = useRef();
    var selectPostsRef = useRef();
    var selectPostTypeRef = useRef();

    var creatWarningMsg = function creatWarningMsg() {
      wp.data.dispatch('core/notices').createNotice('error', // Can be one of: success, info, warning, error.
      __('An error occurred while receiving data from the server for Testimonials block', 'messia'), // Text string to display.
      {
        isDismissible: true
      });
    };

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
      if (attrPostsFetched) {
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
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, __('Build Your conditions for searching testimonials.', 'messia')), /*#__PURE__*/React.createElement("div", null, __('Notes:', 'messia')), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, __('all conditions joint by AND operator.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('set parameter Limit to 0 to unlimit number of comments.', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Number of testimonials', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.limit,
          onChange: function onChange(value) {
            setAttributes({
              limit: Number(value)
            });
          }
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Text limit', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.shrinkTo,
          onChange: function onChange(value) {
            setAttributes({
              shrinkTo: Number(value)
            });
          }
        }))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(SelectControl, {
          className: "criteria-item",
          label: __('Sort by:', 'messia'),
          value: attributes.orderBy,
          onChange: function onChange(value) {
            setAttributes({
              orderBy: value
            });
          },
          options: [{
            label: __('Date published', 'messia'),
            value: 'comment_date',
            disabled: false
          }, {
            label: __('Rating value', 'messia'),
            value: 'rating',
            disabled: false
          }]
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
        }, /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPostTypeRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('In response to post of type:', 'messia'),
          value: attributes.forPostType,
          onChange: function onChange(slug) {
            setAttributes({
              forPostType: slug
            });
          },
          options: [{
            value: 'post',
            label: __('Post', 'messia')
          }, {
            value: 'page',
            label: __('Page', 'messia')
          }, {
            value: 'messia_object',
            label: __('Object', 'messia')
          }]
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPostsRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('In response to Posts/Pages/Objects:', 'messia'),
          value: attributes.inResponseTo,
          onChange: function onChange(slug) {
            setAttributes({
              inResponseTo: slug
            });
          },
          options: attrPosts.length === 0 ? [{
            value: -1,
            label: __('Any', 'messia')
          }] : attrPosts
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "ratingRange"
        }, /*#__PURE__*/React.createElement(RangeControl, {
          className: "rating-min",
          label: __('Min rating:', 'messia'),
          value: attributes.ratingMin,
          onChange: function onChange(ratingMin) {
            setAttributes({
              ratingMin: ratingMin
            });
          },
          min: 0,
          max: 5,
          step: 0.5,
          type: "slider",
          separatorType: "none",
          withInputField: true,
          trackColor: "red",
          railColor: "green"
        })), /*#__PURE__*/React.createElement(FlexItem, {
          className: "ratingRange"
        }, /*#__PURE__*/React.createElement(RangeControl, {
          className: "rating-max",
          label: __('Max rating:', 'messia'),
          value: attributes.ratingMax,
          onChange: function onChange(ratingMax) {
            setAttributes({
              ratingMax: ratingMax
            });
          },
          min: 0,
          max: 5,
          step: 0.5,
          type: "slider",
          separatorType: "none",
          withInputField: true,
          trackColor: "green",
          railColor: "red"
        }))))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement(Flex, {
          className: "depth-non-rated",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ToggleControl, {
          label: __('Show in slider', 'messia'),
          checked: attributes.slider.active,
          onChange: function onChange(checked) {
            var slider = Object.assign({}, attributes.slider);
            slider.active = Boolean(checked), setAttributes({
              slider: slider
            });
          }
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ToggleControl, {
          label: __('Exclude objects or posts that never been rated.', 'messia'),
          checked: attributes.excludeNoRating,
          onChange: function onChange(checked) {
            setAttributes({
              excludeNoRating: Boolean(checked)
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

    var getAttrPosts = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve, reject) {
                  apiFetch({
                    path: 'messia/v1/testimonials',
                    method: 'POST',
                    data: {
                      currentAttrs: attributes
                    }
                  }).then(function (response) {
                    return resolve(response);
                  }).catch(function (e) {
                    creatWarningMsg();
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

      return function getAttrPosts() {
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
        } else if (lastPreview === false) {
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

      if (!attrPostsFetched && !attributes.isExample) {
        getAttrPosts().then(function (response) {
          if (isMounted) {
            setAttrPosts(response);
            setAttrPostsFetched(true);
            setRendered(true);
          }
        });
      }

      return function () {
        isMounted = false;
      };
    }, [attrPostsFetched]);
    useEffect(function () {
      if (!rendered || !editMode) return;
      var request = apiRequest.buildAjaxOptions({
        namespace: 'messia',
        endpoint: 'v1/testimonials/',
        type: 'POST',
        delay: 250,
        data: function data(params) {
          var query = {
            search: typeof params.term === 'undefined' ? null : params.term
          };
          return query;
        },
        error: function error(MLHttpRequest, textStatus, errorThrown) {
          if (textStatus === 'abort') {
            return;
          }

          creatWarningMsg();
        },
        cache: true
      });
      $(selectPostsRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia'),
        minimumInputLength: 3,
        closeOnSelect: false,
        ajax: request
      }).on('change', function (event) {
        var slug = $(event.currentTarget).val();

        if (slug === null) {
          slug = [];
        }

        setAttributes({
          inResponseTo: slug
        });
      });
      $(selectPostTypeRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia')
      }).on('change', function (event) {
        var slug = $(event.currentTarget).val();

        if (slug === null) {
          slug = [];
        }

        setAttributes({
          forPostType: slug
        });
      });
    }, [rendered, editMode]);
    return render();
  }

  registerBlockType('messia/block-testimonials', {
    title: __('Testimonials', 'messia'),
    description: __('Testimonials by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg",
      fillRule: "evenodd",
      clipRule: "evenodd"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
    })),
    category: 'messia',
    keywords: ['testimonial'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      forPostType: {
        type: 'array',
        default: []
      },
      inResponseTo: {
        type: 'array',
        default: []
      },
      ratingMin: {
        type: 'integer',
        default: 3
      },
      ratingMax: {
        type: 'integer',
        default: 5
      },
      excludeNoRating: {
        type: 'boolean',
        default: true
      },
      limit: {
        type: 'integer',
        default: 5
      },
      shrinkTo: {
        type: 'integer',
        default: 200
      },
      slider: {
        type: 'object',
        default: {
          active: true
        }
      },
      orderBy: {
        type: 'string',
        default: 'comment_date',
        enum: ['comment_date', 'rating']
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
    edit: TestimonialsFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/testimonials-editor.scss":
/*!**************************************************!*\
  !*** ./src/scss/blocks/testimonials-editor.scss ***!
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
  !*** ./src/entries/blocks/testimonials-editor.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_testimonials_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/testimonials-editor.scss */ "./src/scss/blocks/testimonials-editor.scss");
/* harmony import */ var _js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/testimonials-editor.jsx */ "./src/js/blocks/testimonials-editor.jsx");
/* harmony import */ var _js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay10ZXN0aW1vbmlhbHMtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OytDQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsUUFBUixHQUFpQ0YsRUFBakMsQ0FBUUUsUUFBUjtFQUFBLElBQWtCQyxVQUFsQixHQUFpQ0gsRUFBakMsQ0FBa0JHLFVBQWxCO0VBQ0EsSUFBUUMsaUJBQVIsR0FBOEJKLEVBQUUsQ0FBQ0ssTUFBakMsQ0FBUUQsaUJBQVI7RUFDQSxrQkFBNkRKLEVBQUUsQ0FBQ00sT0FBaEU7RUFBQSxJQUFRQyxTQUFSLGVBQVFBLFNBQVI7RUFBQSxJQUFtQkMsUUFBbkIsZUFBbUJBLFFBQW5CO0VBQUEsSUFBNkJDLFFBQTdCLGVBQTZCQSxRQUE3QjtFQUFBLElBQXVDQyxTQUF2QyxlQUF1Q0EsU0FBdkM7RUFBQSxJQUFrREMsTUFBbEQsZUFBa0RBLE1BQWxEO0VBQ0EsSUFBMEJDLGdCQUExQixHQUErQ1osRUFBL0MsQ0FBUWEsZ0JBQVI7RUFDQSxJQUFRQyxhQUFSLEdBQTBCZCxFQUFFLENBQUNlLFdBQTdCLENBQVFELGFBQVI7RUFDQSxxQkFBc09kLEVBQUUsQ0FBQ2dCLFVBQXpPO0VBQUEsSUFBUUMsYUFBUixrQkFBUUEsYUFBUjtFQUFBLElBQXVCQyxhQUF2QixrQkFBdUJBLGFBQXZCO0VBQUEsSUFBc0NDLE1BQXRDLGtCQUFzQ0EsTUFBdEM7RUFBQSxJQUE4Q0MsWUFBOUMsa0JBQThDQSxZQUE5QztFQUFBLElBQTREQyxhQUE1RCxrQkFBNERBLGFBQTVEO0VBQUEsSUFBMkVDLFdBQTNFLGtCQUEyRUEsV0FBM0U7RUFBQSxJQUF3RkMsUUFBeEYsa0JBQXdGQSxRQUF4RjtFQUFBLElBQWtHQyxXQUFsRyxrQkFBa0dBLFdBQWxHO0VBQUEsSUFBK0dDLE9BQS9HLGtCQUErR0EsT0FBL0c7RUFBQSxJQUF3SEMsWUFB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Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNvRDs7QUFFcEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL3Rlc3RpbW9uaWFscy1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy90ZXN0aW1vbmlhbHMtZWRpdG9yLnNjc3M/NTQxNiIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL3Rlc3RpbW9uaWFscy1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgYXBpRmV0Y2gsIGFwaVJlcXVlc3QgfSA9IHdwO1xuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50LCBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFNlbGVjdENvbnRyb2wsIFRvZ2dsZUNvbnRyb2wsIE5vdGljZSwgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIFRleHRDb250cm9sLCBTcGlubmVyLCBSYW5nZUNvbnRyb2wsIEZsZXgsIEZsZXhJdGVtLCBGbGV4QmxvY2ssIF9fZXhwZXJpbWVudGFsUmFkaW9Hcm91cDogUmFkaW9Hcm91cCwgX19leHBlcmltZW50YWxSYWRpbzogUmFkaW8gfSA9IHdwLmNvbXBvbmVudHM7XG5cdGNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5cdGNvbnN0IGV4YW1wbGVJbWFnZURhdGEgPSA8c3ZnIHZpZXdCb3g9XCIwIDAgMjc0IDE2NVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCIzNy4xMTY4NlwiIGZpbGw9XCIjY2NjY2NjXCIgaWQ9XCJzdmdfM1wiIHI9XCIxNy43NjEyMlwiIC8+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCIzMS4xMDgzNVwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfN1wiIHI9XCI2LjU1NTc0XCIgLz5cblx0XHQ8cGF0aCBkPVwibTMyLjQ0NjA0LDQ5LjU4OTY2YzAuNjIzMSwtMy44MzQ5MSA0LjI3MjcyLC0xMi43ODMwNCAxMi42NDAxMiwtMTIuNjkxNzNjOC4zNjc0LDAuMDkxMyAxMi4yODQwNiwxMC4wNDM4MiAxMi41OTU2MSwxMy4yODUyM2MtOS4xMjQwMyw5LjI4MDQxIC0yMS45MTE4Nyw1LjQ4MzU4IC0yNS4yMzU3NCwtMC41OTM1bDAuMDAwMDEsMHpcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzI2XCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjYuMDA4NTFcIiBpZD1cInN2Z18yOVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNzIuOTkyMjVcIiB4PVwiNzEuMTA5NThcIiB5PVwiMjMuNjQ0OFwiIC8+XG5cdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxOC40NzA2XCIgaWQ9XCJzdmdfMzBcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjE3NS4xODQzNVwiIHg9XCI3MS4zMzIxMVwiIHk9XCIzMy4wODg5M1wiIC8+XG5cdFx0PGcgaWQ9XCJzdmdfOTNcIj5cblx0XHRcdDxwYXRoIGQ9XCJtMjA5LjcxMzc5LDI1Ljk1OTU2bDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMzJcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMTcuNDA1MDcsMjUuOTU5NTZsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18zNFwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIyNS40MTY0MSwyNS45NTk1NmwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzM1XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjQwLjM2NzQxLDI1Ljk1OTU2bDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMzZcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMzMuMDI3MTksMjUuOTU5NTZsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18zN1wiIC8+XG5cdFx0PC9nPlxuXHRcdDxjaXJjbGUgY3g9XCI0NS4wNTcyNVwiIGN5PVwiODQuNzI2NFwiIGZpbGw9XCIjY2NjY2NjXCIgaWQ9XCJzdmdfOTdcIiByPVwiMTcuNzYxMjJcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCI0NS4wNTcyNVwiIGN5PVwiNzguNzE3ODlcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzk4XCIgcj1cIjYuNTU1NzRcIiAvPlxuXHRcdDxwYXRoIGQ9XCJtMzIuMzgyMTQsOTcuMjYxMzFjMC42MjMxLC0zLjgzNDkxIDQuMjcyNzIsLTEyLjc4MzA0IDEyLjY0MDEyLC0xMi42OTE3M2M4LjM2NzQsMC4wOTEzIDEyLjI4NDA2LDEwLjA0MzgyIDEyLjU5NTYxLDEzLjI4NTIzYy05LjEyNDAzLDkuMjgwNDEgLTIxLjkxMTg3LDUuNDgzNTggLTI1LjIzNTc0LC0wLjU5MzVsMC4wMDAwMSwwelwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfOTlcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNi4wMDg1MVwiIGlkPVwic3ZnXzEwMFwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNzIuOTkyMjVcIiB4PVwiNzEuMTA5NThcIiB5PVwiNzEuMjU0MzVcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMTguNDcwNlwiIGlkPVwic3ZnXzEwMVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMTc1LjE4NDM1XCIgeD1cIjcxLjMzMjExXCIgeT1cIjgwLjY5ODQ3XCIgLz5cblx0XHQ8ZyBpZD1cInN2Z18xMDJcIj5cblx0XHRcdDxwYXRoIGQ9XCJtMjA5LjcxMzc5LDczLjU2OTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMDNcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMTcuNDA1MDcsNzMuNTY5MWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzEwNFwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIyNS40MTY0MSw3My41NjkxbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTA1XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjQwLjM2NzQxLDczLjU2OTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMDZcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMzMuMDI3MTksNzMuNTY5MWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzEwN1wiIC8+XG5cdFx0PC9nPlxuXHRcdDxjaXJjbGUgY3g9XCI0NS4wNTcyNVwiIGN5PVwiMTMxLjcyNjQxXCIgZmlsbD1cIiNjY2NjY2NcIiBpZD1cInN2Z18xMTBcIiByPVwiMTcuNzYxMjJcIiAvPlxuXHRcdDxjaXJjbGUgY3g9XCI0NS4wNTcyNVwiIGN5PVwiMTI1LjcxNzlcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzExMVwiIHI9XCI2LjU1NTc0XCIgLz5cblx0XHQ8cGF0aCBkPVwibTMyLjUyMTM0LDE0NC40MDQxN2MwLjYyMzEsLTMuODM0OTEgNC4yNzI3MiwtMTIuNzgzMDQgMTIuNjQwMTIsLTEyLjY5MTczYzguMzY3NCwwLjA5MTMgMTIuMjg0MDYsMTAuMDQzODIgMTIuNTk1NjEsMTMuMjg1MjNjLTkuMTI0MDMsOS4yODA0MSAtMjEuOTExODcsNS40ODM1OCAtMjUuMjM1NzQsLTAuNTkzNWwwLjAwMDAxLDB6XCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z18xMTJcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNi4wMDg1MVwiIGlkPVwic3ZnXzExM1wiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNzIuOTkyMjVcIiB4PVwiNzEuMTA5NThcIiB5PVwiMTE4LjI1NDM1XCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjE4LjQ3MDZcIiBpZD1cInN2Z18xMTRcIiByeD1cIjJcIiByeT1cIjJcIiB3aWR0aD1cIjE3NS4xODQzNVwiIHg9XCI3MS4zMzIxMVwiIHk9XCIxMjcuNjk4NDhcIiAvPlxuXHRcdDxnIGlkPVwic3ZnXzExNVwiPlxuXHRcdFx0PHBhdGggZD1cIm0yMDkuNzEzNzksMTIwLjU2OTExbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTE2XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjE3LjQwNTA3LDEyMC41NjkxMWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzExN1wiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIyNS40MTY0MSwxMjAuNTY5MTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMThcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yNDAuMzY3NDEsMTIwLjU2OTExbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTE5XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjMzLjAyNzE5LDEyMC41NjkxMWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzEyMFwiIC8+XG5cdFx0PC9nPlxuXHQ8L3N2Zz47XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gVGVzdGltb25pYWxzRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblxuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW2F0dHJQb3N0c0ZldGNoZWQsIHNldEF0dHJQb3N0c0ZldGNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRcdGNvbnN0IFthdHRyUG9zdHMsIHNldEF0dHJQb3N0c10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0Y29uc3QgW3JlbmRlcmVkLCBzZXRSZW5kZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cblx0XHRsZXQgYmxvY2tSZWYgPSB1c2VSZWYoKTtcblx0XHRsZXQgc2VsZWN0UG9zdHNSZWYgPSB1c2VSZWYoKTtcblx0XHRsZXQgc2VsZWN0UG9zdFR5cGVSZWYgPSB1c2VSZWYoKTtcblxuXHRcdGNvbnN0IGNyZWF0V2FybmluZ01zZyA9ICgpID0+IHtcblx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdF9fKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZWNlaXZpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgZm9yIFRlc3RpbW9uaWFscyBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0RXhhbXBsZSA9ICgpID0+IHtcblx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJQb3N0c0ZldGNoZWQpIHtcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PntfXygnQnVpbGQgWW91ciBjb25kaXRpb25zIGZvciBzZWFyY2hpbmcgdGVzdGltb25pYWxzLicsICdtZXNzaWEnKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdOb3RlczonLCAnbWVzc2lhJyl9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxsaT57X18oJ2FsbCBjb25kaXRpb25zIGpvaW50IGJ5IEFORCBvcGVyYXRvci4nLCAnbWVzc2lhJyl9PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygnc2V0IHBhcmFtZXRlciBMaW1pdCB0byAwIHRvIHVubGltaXQgbnVtYmVyIG9mIGNvbW1lbnRzLicsICdtZXNzaWEnKX08L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWFcIlxuXHRcdFx0XHRcdFx0XHRcdGdhcD17NX0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PFRleHRDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ051bWJlciBvZiB0ZXN0aW1vbmlhbHMnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1pbj0nMCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RlcD0nMSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0nbnVtYmVyJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5saW1pdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBsaW1pdDogTnVtYmVyKHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVGV4dCBsaW1pdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0bWluPScwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGVwPScxJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlPSdudW1iZXInXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLnNocmlua1RvfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHNocmlua1RvOiBOdW1iZXIodmFsdWUpIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWFcIlxuXHRcdFx0XHRcdFx0XHRcdGdhcD17NX0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnU29ydCBieTonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLm9yZGVyQnl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgb3JkZXJCeTogdmFsdWUgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oJ0RhdGUgcHVibGlzaGVkJywgJ21lc3NpYScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU6ICdjb21tZW50X2RhdGUnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKCdSYXRpbmcgdmFsdWUnLCAnbWVzc2lhJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ3JhdGluZycsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpb0dyb3VwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhY2Nlc3NpYmlsaXR5bGFiZWw9XCJXaWR0aFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgb3JkZXJEaXI6IHZhbHVlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLm9yZGVyRGlyfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj57X18oJ1NvcnQgZGlyZWN0aW9uOicsICdtZXNzaWEnKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFJhZGlvIHZhbHVlPVwiQVNDXCI+e19fKCdBc2NlbmRpbmcnLCAnbWVzc2lhJyl9PC9SYWRpbz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFJhZGlvIHZhbHVlPVwiREVTQ1wiPntfXygnRGVzY2VuZGluZycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW8gdmFsdWU9XCJSTkRcIj57X18oJ1JhbmRvbScsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9SYWRpb0dyb3VwPlxuXHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjb25kaXRpb25zXCJcblx0XHRcdFx0XHRcdFx0XHRqdXN0aWZ5PVwic3RhcnRcIlxuXHRcdFx0XHRcdFx0XHRcdGFsaWduPVwibGVmdFwiXG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXswfT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiByZWY9e3NlbGVjdFBvc3RUeXBlUmVmfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtdWx0aXBsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0luIHJlc3BvbnNlIHRvIHBvc3Qgb2YgdHlwZTonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuZm9yUG9zdFR5cGV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhzbHVnKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZm9yUG9zdFR5cGU6IHNsdWcgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXtbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiAncG9zdCcsIGxhYmVsOiBfXygnUG9zdCcsICdtZXNzaWEnKSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogJ3BhZ2UnLCBsYWJlbDogX18oJ1BhZ2UnLCAnbWVzc2lhJykgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6ICdtZXNzaWFfb2JqZWN0JywgbGFiZWw6IF9fKCdPYmplY3QnLCAnbWVzc2lhJykgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgcmVmPXtzZWxlY3RQb3N0c1JlZn0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bXVsdGlwbGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjb25kaXRpb24taXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdJbiByZXNwb25zZSB0byBQb3N0cy9QYWdlcy9PYmplY3RzOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5pblJlc3BvbnNlVG99XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhzbHVnKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgaW5SZXNwb25zZVRvOiBzbHVnIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17KGF0dHJQb3N0cy5sZW5ndGggPT09IDApID8gW3sgdmFsdWU6IC0xLCBsYWJlbDogX18oJ0FueScsICdtZXNzaWEnKSB9XSA6IGF0dHJQb3N0c31cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvRmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdhcD17NX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInJhdGluZ1JhbmdlXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFJhbmdlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicmF0aW5nLW1pblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ01pbiByYXRpbmc6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMucmF0aW5nTWlufVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhyYXRpbmdNaW4pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHJhdGluZ01pbjogcmF0aW5nTWluIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1pbj17MH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1heD17NX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0ZXA9ezAuNX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9J3NsaWRlcidcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlcGFyYXRvclR5cGU9J25vbmUnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aXRoSW5wdXRGaWVsZD17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRyYWNrQ29sb3I9J3JlZCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhaWxDb2xvcj0nZ3JlZW4nXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicmF0aW5nUmFuZ2VcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFuZ2VDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJyYXRpbmctbWF4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnTWF4IHJhdGluZzonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5yYXRpbmdNYXh9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHJhdGluZ01heCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgcmF0aW5nTWF4OiByYXRpbmdNYXggfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWluPXswfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4PXs1fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RlcD17MC41fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0nc2xpZGVyJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VwYXJhdG9yVHlwZT0nbm9uZSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpdGhJbnB1dEZpZWxkPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHJhY2tDb2xvcj0nZ3JlZW4nXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyYWlsQ29sb3I9J3JlZCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHRcdDwvRmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxGbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImRlcHRoLW5vbi1yYXRlZFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRnYXA9ezV9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnU2hvdyBpbiBzbGlkZXInLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5zbGlkZXIuYWN0aXZlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHNsaWRlciA9IE9iamVjdC5hc3NpZ24oe30sIGF0dHJpYnV0ZXMuc2xpZGVyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNsaWRlci5hY3RpdmUgPSBCb29sZWFuKGNoZWNrZWQpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgc2xpZGVyOiBzbGlkZXIgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxUb2dnbGVDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdFeGNsdWRlIG9iamVjdHMgb3IgcG9zdHMgdGhhdCBuZXZlciBiZWVuIHJhdGVkLicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLmV4Y2x1ZGVOb1JhdGluZ31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KGNoZWNrZWQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBleGNsdWRlTm9SYXRpbmc6IEJvb2xlYW4oY2hlY2tlZCkgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIHRhYkluZGV4PVwiMFwiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrUHJldmlldyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e3Byb3BzLm5hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEF0dHJQb3N0cyA9IGFzeW5jICgpID0+IHtcblx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdGFwaUZldGNoKHtcblx0XHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL3Rlc3RpbW9uaWFscycsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YTogeyBjdXJyZW50QXR0cnM6IGF0dHJpYnV0ZXMgfVxuXHRcdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRXYXJuaW5nTXNnKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEV4YW1wbGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdGxldCBjbGFzc2VzID0gW2NsYXNzTmFtZV07XG5cdFx0XHRcdGNvbnN0IHJlbmRlciA9IFtcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAobGFzdFByZXZpZXcgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0bGV0IGlzTW91bnRlZCA9IHRydWU7XG5cdFx0XHRpZiAoIWF0dHJQb3N0c0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0QXR0clBvc3RzKCkudGhlbigocmVzcG9uc2UpID0+IHtcblxuXHRcdFx0XHRcdGlmIChpc01vdW50ZWQpIHtcblxuXHRcdFx0XHRcdFx0c2V0QXR0clBvc3RzKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdHNldEF0dHJQb3N0c0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0XHRzZXRSZW5kZXJlZCh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFthdHRyUG9zdHNGZXRjaGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRpZiAoIXJlbmRlcmVkIHx8ICFlZGl0TW9kZSkgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0gYXBpUmVxdWVzdC5idWlsZEFqYXhPcHRpb25zKHtcblx0XHRcdFx0bmFtZXNwYWNlOiAnbWVzc2lhJyxcblx0XHRcdFx0ZW5kcG9pbnQ6ICd2MS90ZXN0aW1vbmlhbHMvJyxcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRkZWxheTogMjUwLFxuXHRcdFx0XHRkYXRhOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHF1ZXJ5ID0ge1xuXHRcdFx0XHRcdFx0c2VhcmNoOiAodHlwZW9mIHBhcmFtcy50ZXJtID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogcGFyYW1zLnRlcm0sXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBxdWVyeTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xuXHRcdFx0XHRcdGlmICh0ZXh0U3RhdHVzID09PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNyZWF0V2FybmluZ01zZygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjYWNoZTogdHJ1ZVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoc2VsZWN0UG9zdHNSZWYuY3VycmVudCkuZmluZCgnc2VsZWN0Jykuc2VsZWN0Mih7XG5cdFx0XHRcdHdpZHRoOiAnMTAwJScsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBfXygnQW55JywgJ21lc3NpYScpLFxuXHRcdFx0XHRtaW5pbXVtSW5wdXRMZW5ndGg6IDMsXG5cdFx0XHRcdGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxuXHRcdFx0XHRhamF4OiByZXF1ZXN0LFxuXHRcdFx0fSkub24oJ2NoYW5nZScsIChldmVudCkgPT4ge1xuXHRcdFx0XHRsZXQgc2x1ZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cdFx0XHRcdGlmIChzbHVnID09PSBudWxsKSB7XG5cdFx0XHRcdFx0c2x1ZyA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBpblJlc3BvbnNlVG86IHNsdWcgfSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JChzZWxlY3RQb3N0VHlwZVJlZi5jdXJyZW50KS5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHtcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IF9fKCdBbnknLCAnbWVzc2lhJyksXG5cdFx0XHR9KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBzbHVnID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblx0XHRcdFx0aWYgKHNsdWcgPT09IG51bGwpIHtcblx0XHRcdFx0XHRzbHVnID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZvclBvc3RUeXBlOiBzbHVnIH0pO1xuXHRcdFx0fSk7XG5cblx0XHR9LCBbcmVuZGVyZWQsIGVkaXRNb2RlXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLXRlc3RpbW9uaWFscycsIHtcblx0XHR0aXRsZTogX18oJ1Rlc3RpbW9uaWFscycsICdtZXNzaWEnKSxcblx0XHRkZXNjcmlwdGlvbjogX18oJ1Rlc3RpbW9uaWFscyBieSBwYXJhbWV0ZXJzJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGxSdWxlPVwiZXZlbm9kZFwiIGNsaXBSdWxlPVwiZXZlbm9kZFwiPjxwYXRoIGQ9XCJNMTIgMWMtNi4zMzggMC0xMiA0LjIyNi0xMiAxMC4wMDcgMCAyLjA1LjczOSA0LjA2MyAyLjA0NyA1LjYyNWwtMS45OTMgNi4zNjggNi45NDYtM2MxLjcwNS40MzkgMy4zMzQuNjQxIDQuODY0LjY0MSA3LjE3NCAwIDEyLjEzNi00LjQzOSAxMi4xMzYtOS42MzQgMC01LjgxMi01LjcwMS0xMC4wMDctMTItMTAuMDA3em0wIDFjNi4wNjUgMCAxMSA0LjA0MSAxMSA5LjAwNyAwIDQuOTIyLTQuNzg3IDguNjM0LTExLjEzNiA4LjYzNC0xLjg4MSAwLTMuNDAxLS4yOTktNC45NDYtLjY5NWwtNS4yNTggMi4yNzEgMS41MDUtNC44MDhjLTEuMzA4LTEuNTY0LTIuMTY1LTMuMTI4LTIuMTY1LTUuNDAyIDAtNC45NjYgNC45MzUtOS4wMDcgMTEtOS4wMDd6bS01IDcuNWMuODI4IDAgMS41LjY3MiAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcyLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em01IDBjLjgyOCAwIDEuNS42NzIgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3Mi0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXptNSAwYy44MjggMCAxLjUuNjcyIDEuNSAxLjVzLS42NzIgMS41LTEuNSAxLjUtMS41LS42NzItMS41LTEuNS42NzItMS41IDEuNS0xLjV6XCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ3Rlc3RpbW9uaWFsJ10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRpc0V4YW1wbGU6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRmb3JQb3N0VHlwZToge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRpblJlc3BvbnNlVG86IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdFx0cmF0aW5nTWluOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogMyxcblx0XHRcdH0sXG5cdFx0XHRyYXRpbmdNYXg6IHtcblx0XHRcdFx0dHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRkZWZhdWx0OiA1LFxuXHRcdFx0fSxcblx0XHRcdGV4Y2x1ZGVOb1JhdGluZzoge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0bGltaXQ6IHtcblx0XHRcdFx0dHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRkZWZhdWx0OiA1LFxuXHRcdFx0fSxcblx0XHRcdHNocmlua1RvOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogMjAwLFxuXHRcdFx0fSxcblx0XHRcdHNsaWRlcjoge1xuXHRcdFx0XHR0eXBlOiAnb2JqZWN0Jyxcblx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG9yZGVyQnk6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6ICdjb21tZW50X2RhdGUnLFxuXHRcdFx0XHRlbnVtOiBbJ2NvbW1lbnRfZGF0ZScsICdyYXRpbmcnXSxcblx0XHRcdH0sXG5cdFx0XHRvcmRlckRpcjoge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGVmYXVsdDogJ0FTQycsXG5cdFx0XHRcdGVudW06IFsnQVNDJywgJ0RFU0MnLCAnUk5EJ10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBUZXN0aW1vbmlhbHNGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy90ZXN0aW1vbmlhbHMtZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL3Rlc3RpbW9uaWFscy1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwiYXBpUmVxdWVzdCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsIkJsb2NrQ29udHJvbHMiLCJibG9ja0VkaXRvciIsImNvbXBvbmVudHMiLCJTZWxlY3RDb250cm9sIiwiVG9nZ2xlQ29udHJvbCIsIk5vdGljZSIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiVGV4dENvbnRyb2wiLCJTcGlubmVyIiwiUmFuZ2VDb250cm9sIiwiRmxleCIsIkZsZXhJdGVtIiwiRmxleEJsb2NrIiwiUmFkaW9Hcm91cCIsIl9fZXhwZXJpbWVudGFsUmFkaW9Hcm91cCIsIlJhZGlvIiwiX19leHBlcmltZW50YWxSYWRpbyIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIlRlc3RpbW9uaWFsc0ZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwiYXR0clBvc3RzRmV0Y2hlZCIsInNldEF0dHJQb3N0c0ZldGNoZWQiLCJhdHRyUG9zdHMiLCJzZXRBdHRyUG9zdHMiLCJyZW5kZXJlZCIsInNldFJlbmRlcmVkIiwiYmxvY2tSZWYiLCJzZWxlY3RQb3N0c1JlZiIsInNlbGVjdFBvc3RUeXBlUmVmIiwiY3JlYXRXYXJuaW5nTXNnIiwiZGF0YSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImdldEV4YW1wbGUiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0aXRsZSIsImxpbWl0IiwidmFsdWUiLCJOdW1iZXIiLCJzaHJpbmtUbyIsIm9yZGVyQnkiLCJsYWJlbCIsImRpc2FibGVkIiwib3JkZXJEaXIiLCJmb3JQb3N0VHlwZSIsInNsdWciLCJpblJlc3BvbnNlVG8iLCJsZW5ndGgiLCJyYXRpbmdNaW4iLCJyYXRpbmdNYXgiLCJzbGlkZXIiLCJhY3RpdmUiLCJjaGVja2VkIiwiT2JqZWN0IiwiYXNzaWduIiwiQm9vbGVhbiIsImV4Y2x1ZGVOb1JhdGluZyIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsImdldEF0dHJQb3N0cyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGF0aCIsIm1ldGhvZCIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsImNsYXNzZXMiLCJwdXNoIiwiam9pbiIsImlzTW91bnRlZCIsInJlcXVlc3QiLCJidWlsZEFqYXhPcHRpb25zIiwibmFtZXNwYWNlIiwiZW5kcG9pbnQiLCJ0eXBlIiwiZGVsYXkiLCJwYXJhbXMiLCJxdWVyeSIsInNlYXJjaCIsInRlcm0iLCJlcnJvciIsIk1MSHR0cFJlcXVlc3QiLCJ0ZXh0U3RhdHVzIiwiZXJyb3JUaHJvd24iLCJjYWNoZSIsImN1cnJlbnQiLCJmaW5kIiwic2VsZWN0MiIsIndpZHRoIiwicGxhY2Vob2xkZXIiLCJtaW5pbXVtSW5wdXRMZW5ndGgiLCJjbG9zZU9uU2VsZWN0IiwiYWpheCIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidmFsIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJkZWZhdWx0IiwiZW51bSIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
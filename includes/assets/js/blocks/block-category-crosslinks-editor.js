/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/category-crosslinks-editor.jsx":
/*!******************************************************!*\
  !*** ./src/js/blocks/category-crosslinks-editor.jsx ***!
  \******************************************************/
/***/ (function() {

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
      ToggleControl = _wp$components.ToggleControl,
      Notice = _wp$components.Notice,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      Spinner = _wp$components.Spinner,
      CheckboxControl = _wp$components.CheckboxControl,
      TextControl = _wp$components.TextControl,
      PanelBody = _wp$components.PanelBody;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    className: "layer"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_101"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_62"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_60"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_61",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "189.41868",
    y: "11.72411"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_58"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_59",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "199.60011",
    y: "26.97224"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_56"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_57",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "199.60011",
    y: "38.47713"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "svg_64"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_9"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_12",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "12.12814",
    y: "11.72411"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_34"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_35",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "22.30957",
    y: "26.1909"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_36"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_37",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "22.30957",
    y: "37.52457"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_38"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_39",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "22.30957",
    y: "48.90706"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "svg_98"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_46"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_47",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "100.43124",
    y: "11.72411"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_44"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_45",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "110.61267",
    y: "27.19169"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_42"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_43",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "110.61267",
    y: "39.08724"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_40"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_41",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "110.61267",
    y: "50.8604"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_50"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_51",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "110.61267",
    y: "62.70368"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "svg_67"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_68"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_69",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "12.12814",
    y: "93.93662"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_70"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_71",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "22.30957",
    y: "109.18475"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_72"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_73",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "22.30957",
    y: "120.68963"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "svg_87"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_88"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_89",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "189.41869",
    y: "93.93662"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_90"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_91",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "199.60012",
    y: "108.40341"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_92"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_93",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "199.60012",
    y: "119.73707"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_94"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_95",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "199.60012",
    y: "131.11957"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "svg_96"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_75"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#b4b4b4",
    height: "10.04621",
    id: "svg_76",
    rx: "1",
    ry: "1",
    width: "70.99803",
    x: "101.4928",
    y: "93.93662"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_77"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_78",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "111.67424",
    y: "109.40419"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_79"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_80",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "111.67424",
    y: "121.29974"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_81"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_82",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "111.67424",
    y: "133.07291"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_83"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "7.09031",
    id: "svg_84",
    rx: "1",
    ry: "1",
    width: "60.81659",
    x: "111.67424",
    y: "144.91618"
  }))))));
  var lastPreview = false;

  function CategoryCrosslinksFn(props) {
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

    var blockRef = useRef();

    var getInspectorControls = function getInspectorControls() {
      return /*#__PURE__*/React.createElement(InspectorControls, {
        key: "inspector"
      }, /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Settings', 'messia')
      }, /*#__PURE__*/React.createElement(TextControl, {
        label: __('Visible', 'messia'),
        min: "0",
        step: "1",
        type: "number",
        value: attributes.initVisibleInGroup,
        help: __('Initially visible numbers of items per group. Set 0 for unlimited.', 'messia'),
        onChange: function onChange(value) {
          setAttributes({
            initVisibleInGroup: parseInt(value)
          });
        }
      }), /*#__PURE__*/React.createElement(ToggleControl, {
        label: __('Show on front number of objects per term.', 'messia'),
        checked: attributes.withCount,
        onChange: function onChange(checked) {
          setAttributes({
            withCount: checked
          });
        }
      })));
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
          setAttributes({
            isPreview: editMode
          });
          setEditMode(!editMode);
        }
      })));
    };

    var getBlockEdit = function getBlockEdit() {
      if (termsFetched) {
        var block = wp.blocks.getBlockType(name);
        var segmentCheckboxes = [];

        var _iterator = _createForOfIteratorHelper(terms.segment.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                indexSegment = _step$value[0],
                segment = _step$value[1];

            segmentCheckboxes.push( /*#__PURE__*/React.createElement(CheckboxControl, {
              key: segment.value,
              value: segment.value,
              label: segment.label,
              checked: attributes.segmentTerms.includes(segment.value),
              onChange: function onChange(checked) {
                var attr = attributes.segmentTerms;
                delete attributes.segmentTerms; // Rewrite all array with checked

                attr = [];
                var checked = $(event.target).parents('.settings').find('input[type="checkbox"]:checked');

                for (var i = 0; i < checked.length; i++) {
                  attr.push($(checked[i]).val());
                }
                /* Another approach - change only changed element
                if (checked) {
                	attr.push(event.target);
                }
                else {
                	const position = attr.indexOf(event.target);
                	attr.splice(position,1);
                	//delete attr[position];
                } */


                setAttributes({
                  segmentTerms: attr
                });
              }
            }));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
          isDismissible: false,
          status: "warning"
        }, /*#__PURE__*/React.createElement("p", null, __('Specify the segment of the category, terms for which will be displayed as links to the search page for them. The set will contain only top-level terms (that have no parent) and their direct descendants. The list of terms is subordinate to the value of the "Empty category terms" option. Certain terms can be excluded from the set on term edit page.', 'messia'))), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, segmentCheckboxes)));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          tabIndex: "0",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement(Spinner, null));
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
                  path: 'messia/v1/block-category-crosslinks',
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

    var getExample = function getExample() {
      return exampleImageData;
    };

    var render = function render() {
      if (attributes.isExample) {
        return getExample();
      } else {
        var classes = [className];
        var _render = [getInspectorControls(), getBlockControls()];

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
              segmentTerms: response.validAttrs.segmentTerms,
              initVisibleInGroup: response.validAttrs.initVisibleInGroup
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
    return render();
  }

  registerBlockType('messia/block-category-crosslinks', {
    title: __('Category crosslinks', 'messia'),
    description: __('Taxonomy term reference cloud Categories that include all zero-level terms and their direct descendants', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 2c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm15 9c.552 0 1 .448 1 1s-.448 1-1 1-1-.449-1-1c0-.552.448-1 1-1zm-15 9c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-20c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm15 9c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-15 9c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm4.588-16.979l.412-.021c4.281 0 7.981 2.45 9.8 6.021-.717.029-1.39.21-1.998.511-1.555-2.703-4.466-4.532-7.802-4.532 0-.703-.149-1.372-.412-1.979zm10.212 15.958c-1.819 3.571-5.519 6.021-9.8 6.021l-.412-.021c.263-.607.412-1.276.412-1.979 3.336 0 6.247-1.829 7.802-4.532.608.302 1.281.483 1.998.511zm-18.91 1.186c-1.193-1.759-1.89-3.88-1.89-6.165s.697-4.406 1.89-6.165c.392.566.901 1.039 1.487 1.403-.867 1.383-1.377 3.012-1.377 4.762s.51 3.379 1.377 4.762c-.586.364-1.096.837-1.487 1.403z"
    })),
    category: 'messia',
    keywords: ['crosslink'],
    styles: [],
    variations: [],
    attributes: {
      segmentTerms: {
        type: 'array',
        default: []
      },
      isExample: {
        type: 'boolean',
        default: false
      },
      initVisibleInGroup: {
        type: 'integer',
        default: 4
      },
      withCount: {
        type: 'boolean',
        default: true
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
    edit: CategoryCrosslinksFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/category-crosslinks-editor.scss":
/*!*********************************************************!*\
  !*** ./src/scss/blocks/category-crosslinks-editor.scss ***!
  \*********************************************************/
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
/*!**********************************************************!*\
  !*** ./src/entries/blocks/category-crosslinks-editor.js ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_category_crosslinks_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/category-crosslinks-editor.scss */ "./src/scss/blocks/category-crosslinks-editor.scss");
/* harmony import */ var _js_blocks_category_crosslinks_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/category-crosslinks-editor.jsx */ "./src/js/blocks/category-crosslinks-editor.jsx");
/* harmony import */ var _js_blocks_category_crosslinks_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_category_crosslinks_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1jYXRlZ29yeS1jcm9zc2xpbmtzLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsUUFBUixHQUFxQkYsRUFBckIsQ0FBUUUsUUFBUjtFQUNBLElBQVFDLGlCQUFSLEdBQThCSCxFQUFFLENBQUNJLE1BQWpDLENBQVFELGlCQUFSO0VBQ0Esa0JBQTZESCxFQUFFLENBQUNLLE9BQWhFO0VBQUEsSUFBUUMsU0FBUixlQUFRQSxTQUFSO0VBQUEsSUFBbUJDLFFBQW5CLGVBQW1CQSxRQUFuQjtFQUFBLElBQTZCQyxRQUE3QixlQUE2QkEsUUFBN0I7RUFBQSxJQUF1Q0MsU0FBdkMsZUFBdUNBLFNBQXZDO0VBQUEsSUFBa0RDLE1BQWxELGVBQWtEQSxNQUFsRDtFQUNBLElBQTBCQyxnQkFBMUIsR0FBK0NYLEVBQS9DLENBQVFZLGdCQUFSO0VBQ0Esc0JBQTZDWixFQUFFLENBQUNhLFdBQWhEO0VBQUEsSUFBUUMsaUJBQVIsbUJBQVFBLGlCQUFSO0VBQUEsSUFBMkJDLGFBQTNCLG1CQUEyQkEsYUFBM0I7RUFDQSxxQkFBd0lmLEVBQUUsQ0FBQ2dCLFVBQTNJO0VBQUEsSUFBUUMsYUFBUixrQkFBUUEsYUFBUjtFQUFBLElBQXVCQyxNQUF2QixrQkFBdUJBLE1BQXZCO0VBQUEsSUFBK0JDLFlBQS9CLGtCQUErQkEsWUFBL0I7RUFBQSxJQUE2Q0MsYUFBN0Msa0JBQTZDQSxhQUE3QztFQUFBLElBQTREQyxXQUE1RCxrQkFBNERBLFdBQTVEO0VBQUEsSUFBeUVDLFFBQXpFLGtCQUF5RUEsUUFBekU7RUFBQSxJQUFtRkMsT0FBbkYsa0JBQW1GQSxPQUFuRjtFQUFBLElBQTRGQyxlQUE1RixrQkFBNEZBLGVBQTVGO0VBQUEsSUFBNkdDLFdBQTdHLGtCQUE2R0EsV0FBN0c7RUFBQSxJQUEw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TyxFQUFFO01BQ1JuRSxVQUFVLEVBQUU7UUFDWHNELFNBQVMsRUFBRTtNQURBO0lBREosQ0ExQjRDO0lBK0JyRGMsUUFBUSxFQUFFO01BQ1RDLFFBQVEsRUFBRTtJQURELENBL0IyQztJQWtDckRDLElBQUksRUFBRXhFLG9CQWxDK0M7SUFtQ3JEeUUsSUFBSSxFQUFFLGNBQVV4RSxLQUFWLEVBQWlCO01BQUUsT0FBTyxJQUFQO0lBQWE7RUFuQ2UsQ0FBckMsQ0FBakI7QUFzQ0EsQ0FuVUEsRUFtVUN5RSxNQUFNLENBQUN6RyxFQW5VUixFQW1VWTBHLE1BblVaLENBQUQ7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMkQ7O0FBRTNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9jYXRlZ29yeS1jcm9zc2xpbmtzLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL2NhdGVnb3J5LWNyb3NzbGlua3MtZWRpdG9yLnNjc3M/NDhkNSIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL2NhdGVnb3J5LWNyb3NzbGlua3MtZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAod3AsICQpIHtcblxuXHRjb25zdCB7IGFwaUZldGNoIH0gPSB3cDtcblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBJbnNwZWN0b3JDb250cm9scywgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgVG9nZ2xlQ29udHJvbCwgTm90aWNlLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgU3Bpbm5lciwgQ2hlY2tib3hDb250cm9sLCBUZXh0Q29udHJvbCwgUGFuZWxCb2R5IH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PGcgY2xhc3NOYW1lPVwibGF5ZXJcIj5cblx0XHRcdDxnIGlkPVwic3ZnXzEwMVwiPlxuXHRcdFx0XHQ8ZyBpZD1cInN2Z182MlwiPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzYwXCI+PHJlY3QgZmlsbD1cIiNiNGI0YjRcIiBoZWlnaHQ9XCIxMC4wNDYyMVwiIGlkPVwic3ZnXzYxXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI3MC45OTgwM1wiIHg9XCIxODkuNDE4NjhcIiB5PVwiMTEuNzI0MTFcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z181OFwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzU5XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxOTkuNjAwMTFcIiB5PVwiMjYuOTcyMjRcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z181NlwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzU3XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxOTkuNjAwMTFcIiB5PVwiMzguNDc3MTNcIiAvPjwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8ZyBpZD1cInN2Z182NFwiPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzlcIj48cmVjdCBmaWxsPVwiI2I0YjRiNFwiIGhlaWdodD1cIjEwLjA0NjIxXCIgaWQ9XCJzdmdfMTJcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjcwLjk5ODAzXCIgeD1cIjEyLjEyODE0XCIgeT1cIjExLjcyNDExXCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfMzRcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z18zNVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMjIuMzA5NTdcIiB5PVwiMjYuMTkwOVwiIC8+PC9nPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzM2XCI+PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI3LjA5MDMxXCIgaWQ9XCJzdmdfMzdcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYwLjgxNjU5XCIgeD1cIjIyLjMwOTU3XCIgeT1cIjM3LjUyNDU3XCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfMzhcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z18zOVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMjIuMzA5NTdcIiB5PVwiNDguOTA3MDZcIiAvPjwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8ZyBpZD1cInN2Z185OFwiPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzQ2XCI+PHJlY3QgZmlsbD1cIiNiNGI0YjRcIiBoZWlnaHQ9XCIxMC4wNDYyMVwiIGlkPVwic3ZnXzQ3XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI3MC45OTgwM1wiIHg9XCIxMDAuNDMxMjRcIiB5PVwiMTEuNzI0MTFcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z180NFwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzQ1XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxMTAuNjEyNjdcIiB5PVwiMjcuMTkxNjlcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z180MlwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzQzXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxMTAuNjEyNjdcIiB5PVwiMzkuMDg3MjRcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z180MFwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzQxXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxMTAuNjEyNjdcIiB5PVwiNTAuODYwNFwiIC8+PC9nPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzUwXCI+PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI3LjA5MDMxXCIgaWQ9XCJzdmdfNTFcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYwLjgxNjU5XCIgeD1cIjExMC42MTI2N1wiIHk9XCI2Mi43MDM2OFwiIC8+PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDxnIGlkPVwic3ZnXzY3XCI+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfNjhcIj48cmVjdCBmaWxsPVwiI2I0YjRiNFwiIGhlaWdodD1cIjEwLjA0NjIxXCIgaWQ9XCJzdmdfNjlcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjcwLjk5ODAzXCIgeD1cIjEyLjEyODE0XCIgeT1cIjkzLjkzNjYyXCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfNzBcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z183MVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMjIuMzA5NTdcIiB5PVwiMTA5LjE4NDc1XCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfNzJcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z183M1wiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMjIuMzA5NTdcIiB5PVwiMTIwLjY4OTYzXCIgLz48L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfODdcIj5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z184OFwiPjxyZWN0IGZpbGw9XCIjYjRiNGI0XCIgaGVpZ2h0PVwiMTAuMDQ2MjFcIiBpZD1cInN2Z184OVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNzAuOTk4MDNcIiB4PVwiMTg5LjQxODY5XCIgeT1cIjkzLjkzNjYyXCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfOTBcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z185MVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMTk5LjYwMDEyXCIgeT1cIjEwOC40MDM0MVwiIC8+PC9nPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzkyXCI+PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI3LjA5MDMxXCIgaWQ9XCJzdmdfOTNcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYwLjgxNjU5XCIgeD1cIjE5OS42MDAxMlwiIHk9XCIxMTkuNzM3MDdcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z185NFwiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzk1XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxOTkuNjAwMTJcIiB5PVwiMTMxLjExOTU3XCIgLz48L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfOTZcIj5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z183NVwiPjxyZWN0IGZpbGw9XCIjYjRiNGI0XCIgaGVpZ2h0PVwiMTAuMDQ2MjFcIiBpZD1cInN2Z183NlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNzAuOTk4MDNcIiB4PVwiMTAxLjQ5MjhcIiB5PVwiOTMuOTM2NjJcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z183N1wiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzc4XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxMTEuNjc0MjRcIiB5PVwiMTA5LjQwNDE5XCIgLz48L2c+XG5cdFx0XHRcdFx0PGcgaWQ9XCJzdmdfNzlcIj48cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjcuMDkwMzFcIiBpZD1cInN2Z184MFwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNjAuODE2NTlcIiB4PVwiMTExLjY3NDI0XCIgeT1cIjEyMS4yOTk3NFwiIC8+PC9nPlxuXHRcdFx0XHRcdDxnIGlkPVwic3ZnXzgxXCI+PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI3LjA5MDMxXCIgaWQ9XCJzdmdfODJcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjYwLjgxNjU5XCIgeD1cIjExMS42NzQyNFwiIHk9XCIxMzMuMDcyOTFcIiAvPjwvZz5cblx0XHRcdFx0XHQ8ZyBpZD1cInN2Z184M1wiPjxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNy4wOTAzMVwiIGlkPVwic3ZnXzg0XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI2MC44MTY1OVwiIHg9XCIxMTEuNjc0MjRcIiB5PVwiMTQ0LjkxNjE4XCIgLz48L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBDYXRlZ29yeUNyb3NzbGlua3NGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW3Rlcm1zRmV0Y2hlZCwgc2V0VGVybXNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbdGVybXMsIHNldFRlcm1zXSA9IHVzZVN0YXRlKHtcblx0XHRcdHNlZ21lbnQ6IFtdXG5cdFx0fSk7XG5cblx0XHRsZXQgYmxvY2tSZWYgPSB1c2VSZWYoKTtcblxuXHRcdGNvbnN0IGdldEluc3BlY3RvckNvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHMga2V5PSdpbnNwZWN0b3InPlxuXHRcdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9e19fKCdTZXR0aW5ncycsICdtZXNzaWEnKX0gPlxuXHRcdFx0XHRcdFx0PFRleHRDb250cm9sXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnVmlzaWJsZScsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0bWluPScwJ1xuXHRcdFx0XHRcdFx0XHRzdGVwPScxJ1xuXHRcdFx0XHRcdFx0XHR0eXBlPSdudW1iZXInXG5cdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmluaXRWaXNpYmxlSW5Hcm91cH1cblx0XHRcdFx0XHRcdFx0aGVscD17X18oJ0luaXRpYWxseSB2aXNpYmxlIG51bWJlcnMgb2YgaXRlbXMgcGVyIGdyb3VwLiBTZXQgMCBmb3IgdW5saW1pdGVkLicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBpbml0VmlzaWJsZUluR3JvdXA6IHBhcnNlSW50KHZhbHVlKSB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1Nob3cgb24gZnJvbnQgbnVtYmVyIG9mIG9iamVjdHMgcGVyIHRlcm0uJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLndpdGhDb3VudH1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhjaGVja2VkKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHdpdGhDb3VudDogY2hlY2tlZCB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDwvSW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBpc1ByZXZpZXc6IGVkaXRNb2RlIH0pO1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRlcm1zRmV0Y2hlZCkge1xuXG5cdFx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblx0XHRcdFx0Y29uc3Qgc2VnbWVudENoZWNrYm94ZXMgPSBbXTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IFtpbmRleFNlZ21lbnQsIHNlZ21lbnRdIG9mIHRlcm1zLnNlZ21lbnQuZW50cmllcygpKSB7XG5cdFx0XHRcdFx0c2VnbWVudENoZWNrYm94ZXMucHVzaChcblxuXHRcdFx0XHRcdFx0PENoZWNrYm94Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRrZXk9e3NlZ21lbnQudmFsdWV9XG5cdFx0XHRcdFx0XHRcdHZhbHVlPXtzZWdtZW50LnZhbHVlfVxuXHRcdFx0XHRcdFx0XHRsYWJlbD17c2VnbWVudC5sYWJlbH1cblx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5zZWdtZW50VGVybXMuaW5jbHVkZXMoc2VnbWVudC52YWx1ZSl9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGF0dHIgPSBhdHRyaWJ1dGVzLnNlZ21lbnRUZXJtcztcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgYXR0cmlidXRlcy5zZWdtZW50VGVybXM7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXdyaXRlIGFsbCBhcnJheSB3aXRoIGNoZWNrZWRcblx0XHRcdFx0XHRcdFx0XHRhdHRyID0gW107XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNoZWNrZWQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLnNldHRpbmdzJykuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQnKTtcblxuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hlY2tlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXR0ci5wdXNoKCQoY2hlY2tlZFtpXSkudmFsKCkpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8qIEFub3RoZXIgYXBwcm9hY2ggLSBjaGFuZ2Ugb25seSBjaGFuZ2VkIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXR0ci5wdXNoKGV2ZW50LnRhcmdldCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcG9zaXRpb24gPSBhdHRyLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGF0dHIuc3BsaWNlKHBvc2l0aW9uLDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9kZWxldGUgYXR0cltwb3NpdGlvbl07XG5cdFx0XHRcdFx0XHRcdFx0fSAqL1xuXG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHNlZ21lbnRUZXJtczogYXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHA+e19fKCdTcGVjaWZ5IHRoZSBzZWdtZW50IG9mIHRoZSBjYXRlZ29yeSwgdGVybXMgZm9yIHdoaWNoIHdpbGwgYmUgZGlzcGxheWVkIGFzIGxpbmtzIHRvIHRoZSBzZWFyY2ggcGFnZSBmb3IgdGhlbS4gVGhlIHNldCB3aWxsIGNvbnRhaW4gb25seSB0b3AtbGV2ZWwgdGVybXMgKHRoYXQgaGF2ZSBubyBwYXJlbnQpIGFuZCB0aGVpciBkaXJlY3QgZGVzY2VuZGFudHMuIFRoZSBsaXN0IG9mIHRlcm1zIGlzIHN1Ym9yZGluYXRlIHRvIHRoZSB2YWx1ZSBvZiB0aGUgXCJFbXB0eSBjYXRlZ29yeSB0ZXJtc1wiIG9wdGlvbi4gQ2VydGFpbiB0ZXJtcyBjYW4gYmUgZXhjbHVkZWQgZnJvbSB0aGUgc2V0IG9uIHRlcm0gZWRpdCBwYWdlLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNldHRpbmdzXCI+e3NlZ21lbnRDaGVja2JveGVzfTwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIgdGFiSW5kZXg9XCIwXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VGVybXMgPSBhc3luYyAoKSA9PiB7XG5cblx0XHRcdHJldHVybiBhd2FpdCBhcGlGZXRjaCh7XG5cdFx0XHRcdHBhdGg6ICdtZXNzaWEvdjEvYmxvY2stY2F0ZWdvcnktY3Jvc3NsaW5rcycsXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRkYXRhOiB7IGN1cnJlbnRBdHRyczogYXR0cmlidXRlcyB9XG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuXHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMuc2VnbWVudC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdF9fKCdNZXNzaWEgQ2F0ZWdvcnkgVGVybXM6IE5vIHRlcm1zIHdlcmUgZm91bmQgaW4gdGF4b25vbXkgU2VnbWVudC4gVW5pdCBvcGVyYXRpb24gaXMgbm90IHBvc3NpYmxlLicsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgQ2F0ZWdvcnkgVGVybXMgYmxvY2snLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdH1cblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEluc3BlY3RvckNvbnRyb2xzKCksXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0c2VnbWVudFRlcm1zOiByZXNwb25zZS52YWxpZEF0dHJzLnNlZ21lbnRUZXJtcyxcblx0XHRcdFx0XHRcdFx0aW5pdFZpc2libGVJbkdyb3VwOiByZXNwb25zZS52YWxpZEF0dHJzLmluaXRWaXNpYmxlSW5Hcm91cFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoKSA9PiB7IGlzTW91bnRlZCA9IGZhbHNlIH07XG5cblx0XHR9LCBbdGVybXNGZXRjaGVkXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLWNhdGVnb3J5LWNyb3NzbGlua3MnLCB7XG5cdFx0dGl0bGU6IF9fKCdDYXRlZ29yeSBjcm9zc2xpbmtzJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnVGF4b25vbXkgdGVybSByZWZlcmVuY2UgY2xvdWQgQ2F0ZWdvcmllcyB0aGF0IGluY2x1ZGUgYWxsIHplcm8tbGV2ZWwgdGVybXMgYW5kIHRoZWlyIGRpcmVjdCBkZXNjZW5kYW50cycsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk02IDJjLjU1MiAwIDEgLjQ0OSAxIDFzLS40NDggMS0xIDEtMS0uNDQ5LTEtMSAuNDQ4LTEgMS0xem0xNSA5Yy41NTIgMCAxIC40NDggMSAxcy0uNDQ4IDEtMSAxLTEtLjQ0OS0xLTFjMC0uNTUyLjQ0OC0xIDEtMXptLTE1IDljLjU1MiAwIDEgLjQ0OSAxIDFzLS40NDggMS0xIDEtMS0uNDQ5LTEtMSAuNDQ4LTEgMS0xem0wLTIwYy0xLjY1NiAwLTMgMS4zNDMtMyAzczEuMzQ0IDMgMyAzIDMtMS4zNDMgMy0zLTEuMzQ0LTMtMy0zem0xNSA5Yy0xLjY1NiAwLTMgMS4zNDMtMyAzczEuMzQ0IDMgMyAzIDMtMS4zNDMgMy0zLTEuMzQ0LTMtMy0zem0tMTUgOWMtMS42NTcgMC0zIDEuMzQzLTMgM3MxLjM0MyAzIDMgM2MxLjY1NiAwIDMtMS4zNDMgMy0zcy0xLjM0NC0zLTMtM3ptNC41ODgtMTYuOTc5bC40MTItLjAyMWM0LjI4MSAwIDcuOTgxIDIuNDUgOS44IDYuMDIxLS43MTcuMDI5LTEuMzkuMjEtMS45OTguNTExLTEuNTU1LTIuNzAzLTQuNDY2LTQuNTMyLTcuODAyLTQuNTMyIDAtLjcwMy0uMTQ5LTEuMzcyLS40MTItMS45Nzl6bTEwLjIxMiAxNS45NThjLTEuODE5IDMuNTcxLTUuNTE5IDYuMDIxLTkuOCA2LjAyMWwtLjQxMi0uMDIxYy4yNjMtLjYwNy40MTItMS4yNzYuNDEyLTEuOTc5IDMuMzM2IDAgNi4yNDctMS44MjkgNy44MDItNC41MzIuNjA4LjMwMiAxLjI4MS40ODMgMS45OTguNTExem0tMTguOTEgMS4xODZjLTEuMTkzLTEuNzU5LTEuODktMy44OC0xLjg5LTYuMTY1cy42OTctNC40MDYgMS44OS02LjE2NWMuMzkyLjU2Ni45MDEgMS4wMzkgMS40ODcgMS40MDMtLjg2NyAxLjM4My0xLjM3NyAzLjAxMi0xLjM3NyA0Ljc2MnMuNTEgMy4zNzkgMS4zNzcgNC43NjJjLS41ODYuMzY0LTEuMDk2LjgzNy0xLjQ4NyAxLjQwM3pcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnY3Jvc3NsaW5rJ10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRzZWdtZW50VGVybXM6IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0aW5pdFZpc2libGVJbkdyb3VwOiB7XG5cdFx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0ZGVmYXVsdDogNCxcblx0XHRcdH0sXG5cdFx0XHR3aXRoQ291bnQ6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkZWZhdWx0OiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGV4YW1wbGU6IHtcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0aXNFeGFtcGxlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHN1cHBvcnRzOiB7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblx0XHR9LFxuXHRcdGVkaXQ6IENhdGVnb3J5Q3Jvc3NsaW5rc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL2NhdGVnb3J5LWNyb3NzbGlua3MtZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL2NhdGVnb3J5LWNyb3NzbGlua3MtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJhcGlGZXRjaCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsImJsb2NrRWRpdG9yIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiY29tcG9uZW50cyIsIlRvZ2dsZUNvbnRyb2wiLCJOb3RpY2UiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIlNwaW5uZXIiLCJDaGVja2JveENvbnRyb2wiLCJUZXh0Q29udHJvbCIsIlBhbmVsQm9keSIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJsYXN0UHJldmlldyIsIkNhdGVnb3J5Q3Jvc3NsaW5rc0ZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwidGVybXNGZXRjaGVkIiwic2V0VGVybXNGZXRjaGVkIiwic2VnbWVudCIsInRlcm1zIiwic2V0VGVybXMiLCJibG9ja1JlZiIsImdldEluc3BlY3RvckNvbnRyb2xzIiwiaW5pdFZpc2libGVJbkdyb3VwIiwidmFsdWUiLCJwYXJzZUludCIsIndpdGhDb3VudCIsImNoZWNrZWQiLCJnZXRCbG9ja0NvbnRyb2xzIiwiaXNQcmV2aWV3IiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJzZWdtZW50Q2hlY2tib3hlcyIsImVudHJpZXMiLCJpbmRleFNlZ21lbnQiLCJwdXNoIiwibGFiZWwiLCJzZWdtZW50VGVybXMiLCJpbmNsdWRlcyIsImF0dHIiLCJldmVudCIsInRhcmdldCIsInBhcmVudHMiLCJmaW5kIiwiaSIsImxlbmd0aCIsInZhbCIsInRpdGxlIiwiZ2V0QmxvY2tQcmV2aWV3IiwiZ2V0VGVybXMiLCJwYXRoIiwibWV0aG9kIiwiZGF0YSIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsImdldEV4YW1wbGUiLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJjbGFzc2VzIiwiam9pbiIsImlzTW91bnRlZCIsInZhbGlkQXR0cnMiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsInR5cGUiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/custom-fields-editor.jsx":
/*!************************************************!*\
  !*** ./src/js/blocks/custom-fields-editor.jsx ***!
  \************************************************/
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
    d: "m82.68583,10.64605a3.19383,3.19383 0 0 0 -3.19351,3.19351l0,121.35334a3.19383,3.19383 0 0 0 3.19351,3.19351l35.1286,0l3.19351,0l6.71135,0c-0.93889,-2.04065 -1.6925,-4.17392 -2.26413,-6.38702l-4.44722,0l-3.19351,0l-31.93509,0l0,-114.96632l57.48316,0l0,15.43113a3.19383,3.19383 0 0 0 0,1.04163l0,50.59093l0,5.16451c2.02149,-1.16882 4.15476,-2.14578 6.38702,-2.93777l0,-5.42025l0,-44.70912l33.80629,0l-10.51613,10.51613a3.19383,3.19383 0 1 0 4.51581,4.51581l15.51221,-15.51221a3.19383,3.19383 0 0 0 1.35973,-3.38062a3.19383,3.19383 0 0 0 -1.26616,-1.95229l-15.60578,-15.60578a3.19383,3.19383 0 0 0 -2.28911,-0.9668a3.19383,3.19383 0 0 0 -2.22671,5.48262l10.51613,10.51613l-33.80629,0l0,-15.96754a3.19383,3.19383 0 0 0 -3.19351,-3.19351l-63.87018,0zm79.83772,79.83772c-17.5643,0 -31.93509,14.37079 -31.93509,31.93509c0,17.5643 14.37079,31.93509 31.93509,31.93509c17.5643,0 31.93509,-14.37079 31.93509,-31.93509c0,-17.5643 -14.37079,-31.93509 -31.93509,-31.93509zm0,6.38702c14.05144,0 25.54807,11.49663 25.54807,25.54807c0,14.05144 -11.49663,25.54807 -25.54807,25.54807c-14.05144,0 -25.54807,-11.49663 -25.54807,-25.54807c0,-14.05144 11.49663,-25.54807 25.54807,-25.54807zm0,6.70512c-1.91611,0 -3.19351,1.2774 -3.19351,3.19351l0,12.45593l-12.45593,0c-1.91611,0 -3.19351,1.2774 -3.19351,3.19351c0,1.91611 1.2774,3.19351 3.19351,3.19351l12.45593,0l0,12.45593c0,1.91611 1.2774,3.19351 3.19351,3.19351c1.91611,0 3.19351,-1.2774 3.19351,-3.19351l0,-12.45593l12.45593,0c1.91611,0 3.19351,-1.2774 3.19351,-3.19351c0,-1.91611 -1.2774,-3.19351 -3.19351,-3.19351l-12.45593,0l0,-12.45593c0,-1.91611 -1.2774,-3.19351 -3.19351,-3.19351z"
  })));

  var shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");

  var lastPreview = false;

  function ConstructorFieldsFn(props) {
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
      $(blockRef.current).find('.custom-fields').not('ui-sortable').sortable({
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

    var saveTabs = function saveTabs() {
      var store = [],
          fields = $(blockRef.current).find('.custom-field'),
          activeSegment = fields.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

      for (var i = 0; i < attributes.constructedFields.length; i++) {
        if (attributes.constructedFields[i].segmentSlug === activeSegment) {
          continue;
        } // add other fields segments


        store.push(attributes.constructedFields[i]);
      }

      for (var q = 0; q < fields.length; q++) {
        var fieldOpts = {};
        var opts = $(fields[q]).find('.field-opt');

        for (var z = 0; z < opts.length; z++) {
          var opt = $(opts[z]),
              key = opt.data('optionName'),
              value = $(opts[z]).find('input[type="checkbox"]').prop('checked');
          fieldOpts[key] = value;
        }

        store.push({
          id: $(fields[q]).attr('id'),
          segmentSlug: activeSegment,
          fieldSlug: $(fields[q]).data('fieldSlug'),
          fieldOpts: fieldOpts
        });
      }

      setAttributes({
        constructedFields: store
      });
    };

    var getExample = function getExample() {
      return exampleImageData;
    };

    var tabsContent = function tabsContent(tab) {
      activeSegment = tab.segmentSlug;
      var constructedFieldsHtml = [];

      var _iterator = _createForOfIteratorHelper(attributes.constructedFields.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              fieldConstructed = _step$value[1];

          if (tab.segmentSlug != fieldConstructed.segmentSlug) {
            continue;
          }

          if ('undefined' === typeof fieldConstructed.id) {
            fieldConstructed.id = shortid.generate();
          }

          var fieldsOptions = [];
          var constructorFieldConfig = getConstructorFieldConfig(fieldConstructed);

          var _iterator2 = _createForOfIteratorHelper(constructorFieldConfig.options.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  _index = _step2$value[0],
                  fieldConfig = _step2$value[1];

              switch (fieldConfig['tag']) {
                case 'input':
                  if ('checkbox' === fieldConfig['type']) {
                    fieldsOptions.push( /*#__PURE__*/React.createElement(Fragment, {
                      key: _index
                    }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement("span", null, fieldConfig.label)), /*#__PURE__*/React.createElement(FlexItem, {
                      className: "field-opt",
                      title: fieldConfig.title,
                      "data-option-name": fieldConfig.id
                    }, /*#__PURE__*/React.createElement(ToggleControl, {
                      checked: fieldConstructed.fieldOpts[fieldConfig.id],
                      onChange: function onChange(value) {
                        return saveTabs();
                      }
                    }))));
                  }

                  break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          constructedFieldsHtml.push( /*#__PURE__*/React.createElement(Card, {
            id: fieldConstructed.id,
            key: "".concat(fieldConstructed.segmentSlug, "-").concat(fieldConstructed.id),
            className: "messia-card custom-field",
            size: "small",
            "data-field-slug": fieldConstructed.fieldSlug
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-card-content"
          }, /*#__PURE__*/React.createElement("div", {
            className: "field-item"
          }, /*#__PURE__*/React.createElement(Flex, {
            gap: 2
          }, /*#__PURE__*/React.createElement(FlexItem, {
            className: "move"
          }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
            className: "header"
          }, /*#__PURE__*/React.createElement("div", {
            className: "tab-title"
          }, constructorFieldConfig.title)), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(Flex, {
            gap: 2
          }, fieldsOptions)))))));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return constructedFieldsHtml;
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

          var _iterator3 = _createForOfIteratorHelper(terms.segment.entries()),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _step3$value = _slicedToArray(_step3.value, 2),
                  indexSegment = _step3$value[0],
                  segment = _step3$value[1];

              tabsHtml.push({
                name: "segment-".concat(segment.value, "-slug"),
                title: segment.label,
                className: 'tab',
                segmentSlug: segment.value
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          var heading = /*#__PURE__*/React.createElement(Fragment, {
            key: "tip"
          }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
            isDismissible: false,
            status: "warning"
          }, /*#__PURE__*/React.createElement("p", null, __('These are a custom fields created via constructor per segment term.', 'messia'))), /*#__PURE__*/React.createElement(Spacer, {
            marginTop: 5
          }));
          var tabs = /*#__PURE__*/React.createElement(TabPanel, {
            className: "messia-tabs-panel",
            activeClass: "active-tab",
            orientation: "horizontal",
            initialTabName: tabsHtml[0].name,
            onSelect: function onSelect(tabName) {},
            tabs: tabsHtml
          }, function (tab) {
            return /*#__PURE__*/React.createElement("div", {
              "data-title": __('Constructor for this segment are empty', 'messia'),
              className: "custom-fields"
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
                  path: 'messia/v1/block-custom-fields',
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

    var getConstructorFieldConfig = function getConstructorFieldConfig(fieldData) {
      var segment = terms.segment.find(function (singleSegment) {
        return singleSegment.value === fieldData.segmentSlug;
      });
      var field = segment.constructorFields[fieldData.fieldSlug];
      return field;
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
      var isMounted = true;

      if (!termsFetched && !attributes.isExample) {
        getTerms().then(function (response) {
          if (isMounted) {
            setAttributes({
              constructedFields: response.validAttrs.constructedFields
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
      var observer = new MutationObserver(function (mutationsList, observer) {
        var _iterator4 = _createForOfIteratorHelper(mutationsList),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var mutation = _step4.value;

            if (mutation.type === 'childList') {
              if (mutation.addedNodes.length >= 1) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                  var fieldsArea = $(mutation.addedNodes[i]).find('.custom-fields');

                  if (fieldsArea.length > 0) {
                    sortableInit();
                  }
                }
              }
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      });
      observer.observe(document.querySelector('body'), {
        attributes: false,
        childList: true,
        subtree: true
      }); // Later, we can stop observing
      // observer.disconnect();
    }, []);
    return render();
  }

  registerBlockType('messia/block-custom-fields', {
    title: __('Custom fields', 'messia'),
    description: __('Output custom field value for current viewed object.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m2.40039,2c-0.76729,0 -1.40039,0.6331 -1.40039,1.40039l0,18.09961a0.50005,0.50005 0 0 0 0.5,0.5l21,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-18.09961c0,-0.76729 -0.6331,-1.40039 -1.40039,-1.40039l-19.19922,0zm0,1l19.19922,0c0.22671,0 0.40039,0.17368 0.40039,0.40039l0,2.09961l-20,0l0,-2.09961c0,-0.22671 0.17368,-0.40039 0.40039,-0.40039zm-0.40039,3.5l20,0l0,14.5l-20,0l0,-14.5zm3,2.5l0,2.5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,4l1,0l0,-4l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-2.5l-1,0zm6.5,0l0,5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,1.5l1,0l0,-1.5l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-5l-1,0zm6.5,0l0,2.5l-1,0a0.50005,0.50005 0 0 0 -0.5,0.5l0,2a0.50005,0.50005 0 0 0 0.5,0.5l1,0l0,4l1,0l0,-4l1,0a0.50005,0.50005 0 0 0 0.5,-0.5l0,-2a0.50005,0.50005 0 0 0 -0.5,-0.5l-1,0l0,-2.5l-1,0zm-13.5,3.5l2,0l0,1l-2,0l0,-1zm13,0l2,0l0,1l-2,0l0,-1zm-6.5,2.5l2,0l0,1l-2,0l0,-1z",
      fill: "black"
    })),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      constructedFields: {
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
    edit: ConstructorFieldsFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/custom-fields-editor.scss":
/*!***************************************************!*\
  !*** ./src/scss/blocks/custom-fields-editor.scss ***!
  \***************************************************/
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
/*!****************************************************!*\
  !*** ./src/entries/blocks/custom-fields-editor.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_custom_fields_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/custom-fields-editor.scss */ "./src/scss/blocks/custom-fields-editor.scss");
/* harmony import */ var _js_blocks_custom_fields_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/custom-fields-editor.jsx */ "./src/js/blocks/custom-fields-editor.jsx");
/* harmony import */ var _js_blocks_custom_fields_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_custom_fields_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1jdXN0b20tZmllbGRzLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQyxXQUFVQSxFQUFWLEVBQWNDLENBQWQsRUFBaUI7RUFFakIsSUFBUUMsUUFBUixHQUFxQkYsRUFBckIsQ0FBUUUsUUFBUjtFQUNBLElBQVFDLFNBQVIsR0FBc0JILEVBQUUsQ0FBQ0ksS0FBekIsQ0FBUUQsU0FBUjtFQUNBLElBQVFFLGlCQUFSLEdBQThCTCxFQUFFLENBQUNNLE1BQWpDLENBQVFELGlCQUFSO0VBQ0Esa0JBQTZETCxFQUFFLENBQUNPLE9BQWhFO0VBQUEsSUFBUUMsU0FBUixlQUFRQSxTQUFSO0VBQUEsSUFBbUJDLFFBQW5CLGVBQW1CQSxRQUFuQjtFQUFBLElBQTZCQyxRQUE3QixlQUE2QkEsUUFBN0I7RUFBQSxJQUF1Q0MsU0FBdkMsZUFBdUNBLFNBQXZDO0VBQUEsSUFBa0RDLE1BQWxELGVBQWtEQSxNQUFsRDtFQUNBLElBQTBCQyxnQkFBMUIsR0FBK0NiLEVBQS9DLENBQVFjLGdCQUFSO0VBQ0Esc0JBQTZDZCxFQUFFLENBQUNlLFdBQWhEO0VBQUEsSUFBUUMsaUJBQVIsbUJBQVFBLGlCQUFSO0VBQUEsSUFBMkJDLGFBQTNCLG1CQUEyQkEsYUFBM0I7RUFDQSxxQkFBK01qQixFQUFFLENBQUNrQixVQUFsTjtFQUFBLElBQVFDLE1BQVIsa0JBQVFBLE1BQVI7RUFBQSxJQUFnQkMsTUFBaEIsa0JBQWdCQSxNQUFoQjtFQUFBLElBQXdCQyxJQUF4QixrQkFBd0JBLElBQXhCO0VBQUEsSUFBOEJDLFFBQTlCLGtCQUE4QkEsUUFBOUI7RUFBQSxJQUF3Q0MsSUFBeEMsa0JBQXdDQSxJQUF4QztFQUFBLElBQThDQyxZQUE5QyxrQkFBOENBLFlBQTlDO0VBQUEsSUFBNERDLGFBQTVELGtCQUE0REEsYUFBNUQ7RUFBQSxJQUEyRUMsV0FBM0Usa0JBQTJFQSxX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QUViLCtFQUErRTs7QUFFL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3BCYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEJhOztBQUViOzs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELFVBQVU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDcUQ7O0FBRXJEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9jdXN0b20tZmllbGRzLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL2N1c3RvbS1maWVsZHMtZWRpdG9yLnNjc3M/NjYxZiIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvYWxwaGFiZXQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2J1aWxkLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2lzLXZhbGlkLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3V0aWwvY2x1c3Rlci13b3JrZXItaWQtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9ub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9ibG9ja3MvY3VzdG9tLWZpZWxkcy1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgYXBpRmV0Y2ggfSA9IHdwO1xuXHRjb25zdCB7IGFkZEZpbHRlciB9ID0gd3AuaG9va3M7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgSW5zcGVjdG9yQ29udHJvbHMsIEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IEJ1dHRvbiwgTm90aWNlLCBGbGV4LCBGbGV4SXRlbSwgQ2FyZCwgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIFRvZ2dsZUNvbnRyb2wsIFNwaW5uZXIsIFRhYlBhbmVsLCBfX2V4cGVyaW1lbnRhbFNwYWNlcjogU3BhY2VyLCBfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbDogSW5wdXRDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAxNjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PGc+XG5cdFx0XHQ8cGF0aCBkPVwibTgyLjY4NTgzLDEwLjY0NjA1YTMuMTkzODMsMy4xOTM4MyAwIDAgMCAtMy4xOTM1MSwzLjE5MzUxbDAsMTIxLjM1MzM0YTMuMTkzODMsMy4xOTM4MyAwIDAgMCAzLjE5MzUxLDMuMTkzNTFsMzUuMTI4NiwwbDMuMTkzNTEsMGw2LjcxMTM1LDBjLTAuOTM4ODksLTIuMDQwNjUgLTEuNjkyNSwtNC4xNzM5MiAtMi4yNjQxMywtNi4zODcwMmwtNC40NDcyMiwwbC0zLjE5MzUxLDBsLTMxLjkzNTA5LDBsMCwtMTE0Ljk2NjMybDU3LjQ4MzE2LDBsMCwxNS40MzExM2EzLjE5MzgzLDMuMTkzODMgMCAwIDAgMCwxLjA0MTYzbDAsNTAuNTkwOTNsMCw1LjE2NDUxYzIuMDIxNDksLTEuMTY4ODIgNC4xNTQ3NiwtMi4xNDU3OCA2LjM4NzAyLC0yLjkzNzc3bDAsLTUuNDIwMjVsMCwtNDQuNzA5MTJsMzMuODA2MjksMGwtMTAuNTE2MTMsMTAuNTE2MTNhMy4xOTM4MywzLjE5MzgzIDAgMSAwIDQuNTE1ODEsNC41MTU4MWwxNS41MTIyMSwtMTUuNTEyMjFhMy4xOTM4MywzLjE5MzgzIDAgMCAwIDEuMzU5NzMsLTMuMzgwNjJhMy4xOTM4MywzLjE5MzgzIDAgMCAwIC0xLjI2NjE2LC0xLjk1MjI5bC0xNS42MDU3OCwtMTUuNjA1NzhhMy4xOTM4MywzLjE5MzgzIDAgMCAwIC0yLjI4OTExLC0wLjk2NjhhMy4xOTM4MywzLjE5MzgzIDAgMCAwIC0yLjIyNjcxLDUuNDgyNjJsMTAuNTE2MTMsMTAuNTE2MTNsLTMzLjgwNjI5LDBsMCwtMTUuOTY3NTRhMy4xOTM4MywzLjE5MzgzIDAgMCAwIC0zLjE5MzUxLC0zLjE5MzUxbC02My44NzAxOCwwem03OS44Mzc3Miw3OS44Mzc3MmMtMTcuNTY0MywwIC0zMS45MzUwOSwxNC4zNzA3OSAtMzEuOTM1MDksMzEuOTM1MDljMCwxNy41NjQzIDE0LjM3MDc5LDMxLjkzNTA5IDMxLjkzNTA5LDMxLjkzNTA5YzE3LjU2NDMsMCAzMS45MzUwOSwtMTQuMzcwNzkgMzEuOTM1MDksLTMxLjkzNTA5YzAsLTE3LjU2NDMgLTE0LjM3MDc5LC0zMS45MzUwOSAtMzEuOTM1MDksLTMxLjkzNTA5em0wLDYuMzg3MDJjMTQuMDUxNDQsMCAyNS41NDgwNywxMS40OTY2MyAyNS41NDgwNywyNS41NDgwN2MwLDE0LjA1MTQ0IC0xMS40OTY2MywyNS41NDgwNyAtMjUuNTQ4MDcsMjUuNTQ4MDdjLTE0LjA1MTQ0LDAgLTI1LjU0ODA3LC0xMS40OTY2MyAtMjUuNTQ4MDcsLTI1LjU0ODA3YzAsLTE0LjA1MTQ0IDExLjQ5NjYzLC0yNS41NDgwNyAyNS41NDgwNywtMjUuNTQ4MDd6bTAsNi43MDUxMmMtMS45MTYxMSwwIC0zLjE5MzUxLDEuMjc3NCAtMy4xOTM1MSwzLjE5MzUxbDAsMTIuNDU1OTNsLTEyLjQ1NTkzLDBjLTEuOTE2MTEsMCAtMy4xOTM1MSwxLjI3NzQgLTMuMTkzNTEsMy4xOTM1MWMwLDEuOTE2MTEgMS4yNzc0LDMuMTkzNTEgMy4xOTM1MSwzLjE5MzUxbDEyLjQ1NTkzLDBsMCwxMi40NTU5M2MwLDEuOTE2MTEgMS4yNzc0LDMuMTkzNTEgMy4xOTM1MSwzLjE5MzUxYzEuOTE2MTEsMCAzLjE5MzUxLC0xLjI3NzQgMy4xOTM1MSwtMy4xOTM1MWwwLC0xMi40NTU5M2wxMi40NTU5MywwYzEuOTE2MTEsMCAzLjE5MzUxLC0xLjI3NzQgMy4xOTM1MSwtMy4xOTM1MWMwLC0xLjkxNjExIC0xLjI3NzQsLTMuMTkzNTEgLTMuMTkzNTEsLTMuMTkzNTFsLTEyLjQ1NTkzLDBsMCwtMTIuNDU1OTNjMCwtMS45MTYxMSAtMS4yNzc0LC0zLjE5MzUxIC0zLjE5MzUxLC0zLjE5MzUxelwiIC8+XG5cdFx0PC9nPlxuXHQ8L3N2Zz47XG5cdGNvbnN0IHNob3J0aWQgPSByZXF1aXJlKCdzaG9ydGlkJyk7XG5cblx0bGV0IGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gQ29uc3RydWN0b3JGaWVsZHNGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW3Rlcm1zRmV0Y2hlZCwgc2V0VGVybXNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbdGVybXMsIHNldFRlcm1zXSA9IHVzZVN0YXRlKHtcblx0XHRcdHNlZ21lbnQ6IFtdLFxuXHRcdH0pO1xuXG5cdFx0bGV0IGFjdGl2ZVNlZ21lbnQ7XG5cdFx0bGV0IGJsb2NrUmVmID0gdXNlUmVmKCk7XG5cblx0XHRjb25zdCBzb3J0YWJsZUluaXQgPSAoKSA9PiB7XG5cblx0XHRcdCQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmN1c3RvbS1maWVsZHMnKS5ub3QoJ3VpLXNvcnRhYmxlJykuc29ydGFibGUoe1xuXHRcdFx0XHRmb3JjZUhlbHBlclNpemU6IHRydWUsXG5cdFx0XHRcdGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0XHQvL2Rpc3RhbmNlOiAxMCxcblx0XHRcdFx0dG9sZXJhbmNlOiAnaW50ZXJzZWN0Jyxcblx0XHRcdFx0Ly9jdXJzb3I6ICdncmFiYmlnJyxcblx0XHRcdFx0c2Nyb2xsOiB0cnVlLFxuXHRcdFx0XHRzY3JvbGxTZW5zaXRpdml0eTogMjAsXG5cdFx0XHRcdGNvbnRhaW5tZW50OiAnLmVkaXQtd2lkZ2V0cy1ibG9jay1lZGl0b3InLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ3NvcnRhYmxlLXBsYWNlaG9sZGVyJyxcblx0XHRcdFx0aGFuZGxlOiAnLm1vdmUnLFxuXHRcdFx0XHQvL3pJbmRleDogMTAwMDAsXG5cdFx0XHRcdHN0YXJ0OiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaXRlbS5hZGRDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVTdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0c2F2ZVRhYnMoKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNhdmVUYWJzID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRzdG9yZSA9IFtdLFxuXHRcdFx0XHRmaWVsZHMgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5jdXN0b20tZmllbGQnKSxcblx0XHRcdFx0YWN0aXZlU2VnbWVudCA9IGZpZWxkcy5wYXJlbnRzKCcubWVzc2lhLXRhYnMtcGFuZWwnKS5maW5kKCdbcm9sZT1cInRhYnBhbmVsXCJdJykuYXR0cignaWQnKS5tYXRjaCgvc2VnbWVudC0oLispLXNsdWcvKVsxXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmNvbnN0cnVjdGVkRmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzLmNvbnN0cnVjdGVkRmllbGRzW2ldLnNlZ21lbnRTbHVnID09PSBhY3RpdmVTZWdtZW50KSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYWRkIG90aGVyIGZpZWxkcyBzZWdtZW50c1xuXHRcdFx0XHRzdG9yZS5wdXNoKGF0dHJpYnV0ZXMuY29uc3RydWN0ZWRGaWVsZHNbaV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBxID0gMDsgcSA8IGZpZWxkcy5sZW5ndGg7IHErKykge1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkT3B0cyA9IHt9O1xuXHRcdFx0XHRjb25zdCBvcHRzID0gJChmaWVsZHNbcV0pLmZpbmQoJy5maWVsZC1vcHQnKTtcblxuXHRcdFx0XHRmb3IgKGxldCB6ID0gMDsgeiA8IG9wdHMubGVuZ3RoOyB6KyspIHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0b3B0ID0gJChvcHRzW3pdKSxcblx0XHRcdFx0XHRcdGtleSA9IG9wdC5kYXRhKCdvcHRpb25OYW1lJyksXG5cdFx0XHRcdFx0XHR2YWx1ZSA9ICQob3B0c1t6XSkuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0XHRcdFx0ZmllbGRPcHRzW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN0b3JlLnB1c2goe1xuXHRcdFx0XHRcdGlkOiAkKGZpZWxkc1txXSkuYXR0cignaWQnKSxcblx0XHRcdFx0XHRzZWdtZW50U2x1ZzogYWN0aXZlU2VnbWVudCxcblx0XHRcdFx0XHRmaWVsZFNsdWc6ICQoZmllbGRzW3FdKS5kYXRhKCdmaWVsZFNsdWcnKSxcblx0XHRcdFx0XHRmaWVsZE9wdHM6IGZpZWxkT3B0cyxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHNldEF0dHJpYnV0ZXMoeyBjb25zdHJ1Y3RlZEZpZWxkczogc3RvcmUgfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0RXhhbXBsZSA9ICgpID0+IHtcblx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYnNDb250ZW50ID0gKHRhYikgPT4ge1xuXG5cdFx0XHRhY3RpdmVTZWdtZW50ID0gdGFiLnNlZ21lbnRTbHVnO1xuXHRcdFx0Y29uc3QgY29uc3RydWN0ZWRGaWVsZHNIdG1sID0gW107XG5cblx0XHRcdGZvciAoY29uc3QgW2luZGV4LCBmaWVsZENvbnN0cnVjdGVkXSBvZiBhdHRyaWJ1dGVzLmNvbnN0cnVjdGVkRmllbGRzLmVudHJpZXMoKSkge1xuXG5cdFx0XHRcdGlmICh0YWIuc2VnbWVudFNsdWcgIT0gZmllbGRDb25zdHJ1Y3RlZC5zZWdtZW50U2x1Zykge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgZmllbGRDb25zdHJ1Y3RlZC5pZCkge1xuXHRcdFx0XHRcdGZpZWxkQ29uc3RydWN0ZWQuaWQgPSBzaG9ydGlkLmdlbmVyYXRlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBmaWVsZHNPcHRpb25zID0gW107XG5cdFx0XHRcdGNvbnN0IGNvbnN0cnVjdG9yRmllbGRDb25maWcgPSBnZXRDb25zdHJ1Y3RvckZpZWxkQ29uZmlnKGZpZWxkQ29uc3RydWN0ZWQpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgW2luZGV4LCBmaWVsZENvbmZpZ10gb2YgY29uc3RydWN0b3JGaWVsZENvbmZpZy5vcHRpb25zLmVudHJpZXMoKSkge1xuXG5cdFx0XHRcdFx0c3dpdGNoIChmaWVsZENvbmZpZ1sndGFnJ10pIHtcblx0XHRcdFx0XHRcdGNhc2UgJ2lucHV0Jzpcblx0XHRcdFx0XHRcdFx0aWYgKCdjaGVja2JveCcgPT09IGZpZWxkQ29uZmlnWyd0eXBlJ10pIHtcblx0XHRcdFx0XHRcdFx0XHRmaWVsZHNPcHRpb25zLnB1c2goXG5cdFx0XHRcdFx0XHRcdFx0XHQ8RnJhZ21lbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5PXtpbmRleH0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj57ZmllbGRDb25maWcubGFiZWx9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmaWVsZC1vcHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtmaWVsZENvbmZpZy50aXRsZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLW9wdGlvbi1uYW1lPXtmaWVsZENvbmZpZy5pZH0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ9e2ZpZWxkQ29uc3RydWN0ZWQuZmllbGRPcHRzW2ZpZWxkQ29uZmlnLmlkXX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHNhdmVUYWJzKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0cnVjdGVkRmllbGRzSHRtbC5wdXNoKFxuXHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRpZD17ZmllbGRDb25zdHJ1Y3RlZC5pZH1cblx0XHRcdFx0XHRcdGtleT17YCR7ZmllbGRDb25zdHJ1Y3RlZC5zZWdtZW50U2x1Z30tJHtmaWVsZENvbnN0cnVjdGVkLmlkfWB9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCBjdXN0b20tZmllbGRcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0XHRcdGRhdGEtZmllbGQtc2x1Zz17ZmllbGRDb25zdHJ1Y3RlZC5maWVsZFNsdWd9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmllbGQtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cIm1vdmVcIj4mZXF1aXY7PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJoZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0YWItdGl0bGVcIj57Y29uc3RydWN0b3JGaWVsZENvbmZpZy50aXRsZX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4IGdhcD17Mn0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e2ZpZWxkc09wdGlvbnN9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvQ2FyZCA+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjb25zdHJ1Y3RlZEZpZWxkc0h0bWw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGVybXNGZXRjaGVkKSB7XG5cdFx0XHRcdGlmICh0ZXJtcy5zZWdtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cdFx0XHRcdFx0Y29uc3QgdGFic0h0bWwgPSBbXTtcblxuXHRcdFx0XHRcdGZvciAoY29uc3QgW2luZGV4U2VnbWVudCwgc2VnbWVudF0gb2YgdGVybXMuc2VnbWVudC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0XHRcdHRhYnNIdG1sLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBgc2VnbWVudC0ke3NlZ21lbnQudmFsdWV9LXNsdWdgLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogc2VnbWVudC5sYWJlbCxcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAndGFiJyxcblx0XHRcdFx0XHRcdFx0c2VnbWVudFNsdWc6IHNlZ21lbnQudmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCBoZWFkaW5nID1cblx0XHRcdFx0XHRcdDxGcmFnbWVudCBrZXk9J3RpcCc+XG5cdFx0XHRcdFx0XHRcdDxoND57YmxvY2sudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cD57X18oJ1RoZXNlIGFyZSBhIGN1c3RvbSBmaWVsZHMgY3JlYXRlZCB2aWEgY29uc3RydWN0b3IgcGVyIHNlZ21lbnQgdGVybS4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdFx0PFNwYWNlciBtYXJnaW5Ub3A9ezV9IC8+XG5cdFx0XHRcdFx0XHQ8L0ZyYWdtZW50PlxuXG5cdFx0XHRcdFx0Y29uc3QgdGFicyA9IDxUYWJQYW5lbFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibWVzc2lhLXRhYnMtcGFuZWxcIlxuXHRcdFx0XHRcdFx0YWN0aXZlQ2xhc3M9XCJhY3RpdmUtdGFiXCJcblx0XHRcdFx0XHRcdG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRpbml0aWFsVGFiTmFtZT17dGFic0h0bWxbMF0ubmFtZX1cblx0XHRcdFx0XHRcdG9uU2VsZWN0PXsodGFiTmFtZSkgPT4geyB9fVxuXHRcdFx0XHRcdFx0dGFicz17dGFic0h0bWx9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQodGFiKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxkaXYgZGF0YS10aXRsZT17X18oJ0NvbnN0cnVjdG9yIGZvciB0aGlzIHNlZ21lbnQgYXJlIGVtcHR5JywgJ21lc3NpYScpfSBjbGFzc05hbWU9XCJjdXN0b20tZmllbGRzXCI+e3RhYnNDb250ZW50KHRhYil9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L1RhYlBhbmVsPlxuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0XHR7aGVhZGluZ31cblx0XHRcdFx0XHRcdFx0XHR7dGFic31cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIiBsYWJlbD17X18oXCJZb3UgaGF2ZSBubyBzZWdtZW50cy4gQ3JlYXRlIG9uZS5cIiwgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT48L2Rpdj5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXIgPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdDxTcGlubmVyIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17bmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VGVybXMgPSBhc3luYyAoKSA9PiB7XG5cblx0XHRcdHJldHVybiBhd2FpdCBhcGlGZXRjaCh7XG5cdFx0XHRcdHBhdGg6ICdtZXNzaWEvdjEvYmxvY2stY3VzdG9tLWZpZWxkcycsXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRkYXRhOiB7IGN1cnJlbnRBdHRyczogYXR0cmlidXRlcyB9XG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuXHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMuc2VnbWVudC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdF9fKCdNZXNzaWEgQ2F0ZWdvcnkgVGVybXM6IE5vIHRlcm1zIHdlcmUgZm91bmQgaW4gdGF4b25vbXkgU2VnbWVudC4gVW5pdCBvcGVyYXRpb24gaXMgbm90IHBvc3NpYmxlLicsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgQ2F0ZWdvcnkgVGVybXMgYmxvY2snLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRDb25zdHJ1Y3RvckZpZWxkQ29uZmlnID0gKGZpZWxkRGF0YSkgPT4ge1xuXHRcdFx0Y29uc3Qgc2VnbWVudCA9IHRlcm1zLnNlZ21lbnQuZmluZCgoc2luZ2xlU2VnbWVudCkgPT4gc2luZ2xlU2VnbWVudC52YWx1ZSA9PT0gZmllbGREYXRhLnNlZ21lbnRTbHVnKTtcblx0XHRcdGNvbnN0IGZpZWxkID0gc2VnbWVudC5jb25zdHJ1Y3RvckZpZWxkc1tmaWVsZERhdGEuZmllbGRTbHVnXTtcblxuXHRcdFx0cmV0dXJuIGZpZWxkO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0Y29uc3RydWN0ZWRGaWVsZHM6IHJlc3BvbnNlLnZhbGlkQXR0cnMuY29uc3RydWN0ZWRGaWVsZHNcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c2V0VGVybXMocmVzcG9uc2UudGVybXMpO1xuXHRcdFx0XHRcdFx0c2V0VGVybXNGZXRjaGVkKHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBpc01vdW50ZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSwgW3Rlcm1zRmV0Y2hlZF0pO1xuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0bGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnNMaXN0KSB7XG5cdFx0XHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG5cdFx0XHRcdFx0XHRpZiAobXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBmaWVsZHNBcmVhID0gJChtdXRhdGlvbi5hZGRlZE5vZGVzW2ldKS5maW5kKCcuY3VzdG9tLWZpZWxkcycpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWVsZHNBcmVhLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNvcnRhYmxlSW5pdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdG9ic2VydmVyLm9ic2VydmUoXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdC8vIExhdGVyLCB3ZSBjYW4gc3RvcCBvYnNlcnZpbmdcblx0XHRcdC8vIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHR9LCBbXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLWN1c3RvbS1maWVsZHMnLCB7XG5cdFx0dGl0bGU6IF9fKCdDdXN0b20gZmllbGRzJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnT3V0cHV0IGN1c3RvbSBmaWVsZCB2YWx1ZSBmb3IgY3VycmVudCB2aWV3ZWQgb2JqZWN0LicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwibTIuNDAwMzksMmMtMC43NjcyOSwwIC0xLjQwMDM5LDAuNjMzMSAtMS40MDAzOSwxLjQwMDM5bDAsMTguMDk5NjFhMC41MDAwNSwwLjUwMDA1IDAgMCAwIDAuNSwwLjVsMjEsMGEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgMC41LC0wLjVsMCwtMTguMDk5NjFjMCwtMC43NjcyOSAtMC42MzMxLC0xLjQwMDM5IC0xLjQwMDM5LC0xLjQwMDM5bC0xOS4xOTkyMiwwem0wLDFsMTkuMTk5MjIsMGMwLjIyNjcxLDAgMC40MDAzOSwwLjE3MzY4IDAuNDAwMzksMC40MDAzOWwwLDIuMDk5NjFsLTIwLDBsMCwtMi4wOTk2MWMwLC0wLjIyNjcxIDAuMTczNjgsLTAuNDAwMzkgMC40MDAzOSwtMC40MDAzOXptLTAuNDAwMzksMy41bDIwLDBsMCwxNC41bC0yMCwwbDAsLTE0LjV6bTMsMi41bDAsMi41bC0xLDBhMC41MDAwNSwwLjUwMDA1IDAgMCAwIC0wLjUsMC41bDAsMmEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgMC41LDAuNWwxLDBsMCw0bDEsMGwwLC00bDEsMGEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgMC41LC0wLjVsMCwtMmEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgLTAuNSwtMC41bC0xLDBsMCwtMi41bC0xLDB6bTYuNSwwbDAsNWwtMSwwYTAuNTAwMDUsMC41MDAwNSAwIDAgMCAtMC41LDAuNWwwLDJhMC41MDAwNSwwLjUwMDA1IDAgMCAwIDAuNSwwLjVsMSwwbDAsMS41bDEsMGwwLC0xLjVsMSwwYTAuNTAwMDUsMC41MDAwNSAwIDAgMCAwLjUsLTAuNWwwLC0yYTAuNTAwMDUsMC41MDAwNSAwIDAgMCAtMC41LC0wLjVsLTEsMGwwLC01bC0xLDB6bTYuNSwwbDAsMi41bC0xLDBhMC41MDAwNSwwLjUwMDA1IDAgMCAwIC0wLjUsMC41bDAsMmEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgMC41LDAuNWwxLDBsMCw0bDEsMGwwLC00bDEsMGEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgMC41LC0wLjVsMCwtMmEwLjUwMDA1LDAuNTAwMDUgMCAwIDAgLTAuNSwtMC41bC0xLDBsMCwtMi41bC0xLDB6bS0xMy41LDMuNWwyLDBsMCwxbC0yLDBsMCwtMXptMTMsMGwyLDBsMCwxbC0yLDBsMCwtMXptLTYuNSwyLjVsMiwwbDAsMWwtMiwwbDAsLTF6XCIgZmlsbD1cImJsYWNrXCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ29iamVjdCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0Y29uc3RydWN0ZWRGaWVsZHM6IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBDb25zdHJ1Y3RvckZpZWxkc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcmV0dXJuIGFscGhhYmV0IHx8IE9SSUdJTkFMO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXQ6IGdldCxcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNTY3NzUyODAyMDYyO1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDc7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBidWlsZChjbHVzdGVyV29ya2VySWQpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZSh2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoc2Vjb25kcyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnbmFub2lkL2Zvcm1hdCcpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGZvcm1hdChyYW5kb20sIGFscGhhYmV0LmdldCgpLCAxKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICByZXR1cm4gYnVpbGQoY2x1c3RlcldvcmtlcklkKTtcbn1cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBub25BbHBoYWJldGljID0gbmV3IFJlZ0V4cCgnW14nICtcbiAgICAgIGFscGhhYmV0LmdldCgpLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpICtcbiAgICAnXScpO1xuICAgIHJldHVybiAhbm9uQWxwaGFiZXRpYy50ZXN0KGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG52YXIgcmFuZG9tQnl0ZTtcblxuaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcbiIsIi8vIFRoaXMgZmlsZSByZXBsYWNlcyBgZm9ybWF0LmpzYCBpbiBidW5kbGVycyBsaWtlIHdlYnBhY2sgb3IgUm9sbHVwLFxuLy8gYWNjb3JkaW5nIHRvIGBicm93c2VyYCBjb25maWcgaW4gYHBhY2thZ2UuanNvbmAuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJhbmRvbSwgYWxwaGFiZXQsIHNpemUpIHtcbiAgLy8gV2UgY2Fu4oCZdCB1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LiBUbyBtYWtlIGJ5dGVzIHZhbHVlcyBjbG9zZXJcbiAgLy8gdG8gdGhlIGFscGhhYmV0LCB3ZSBhcHBseSBiaXRtYXNrIG9uIHRoZW0uIFdlIGxvb2sgZm9yIHRoZSBjbG9zZXN0XG4gIC8vIGAyICoqIHggLSAxYCBudW1iZXIsIHdoaWNoIHdpbGwgYmUgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgc2l6ZS4gSWYgd2UgaGF2ZVxuICAvLyAzMCBzeW1ib2xzIGluIHRoZSBhbHBoYWJldCwgd2Ugd2lsbCB0YWtlIDMxICgwMDAxMTExMSkuXG4gIC8vIFdlIGRvIG5vdCB1c2UgZmFzdGVyIE1hdGguY2x6MzIsIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBicm93c2Vycy5cbiAgdmFyIG1hc2sgPSAoMiA8PCBNYXRoLmxvZyhhbHBoYWJldC5sZW5ndGggLSAxKSAvIE1hdGguTE4yKSAtIDFcbiAgLy8gQml0bWFzayBpcyBub3QgYSBwZXJmZWN0IHNvbHV0aW9uIChpbiBvdXIgZXhhbXBsZSBpdCB3aWxsIHBhc3MgMzEgYnl0ZXMsXG4gIC8vIHdoaWNoIGlzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldCkuIEFzIGEgcmVzdWx0LCB3ZSB3aWxsIG5lZWQgbW9yZSBieXRlcyxcbiAgLy8gdGhhbiBJRCBzaXplLCBiZWNhdXNlIHdlIHdpbGwgcmVmdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC5cblxuICAvLyBFdmVyeSBoYXJkd2FyZSByYW5kb20gZ2VuZXJhdG9yIGNhbGwgaXMgY29zdGx5LFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gd2FpdCBmb3IgZW50cm9weSBjb2xsZWN0aW9uLiBUaGlzIGlzIHdoeSBvZnRlbiBpdCB3aWxsXG4gIC8vIGJlIGZhc3RlciB0byBhc2sgZm9yIGZldyBleHRyYSBieXRlcyBpbiBhZHZhbmNlLCB0byBhdm9pZCBhZGRpdGlvbmFsIGNhbGxzLlxuXG4gIC8vIEhlcmUgd2UgY2FsY3VsYXRlIGhvdyBtYW55IHJhbmRvbSBieXRlcyBzaG91bGQgd2UgY2FsbCBpbiBhZHZhbmNlLlxuICAvLyBJdCBkZXBlbmRzIG9uIElEIGxlbmd0aCwgbWFzayAvIGFscGhhYmV0IHNpemUgYW5kIG1hZ2ljIG51bWJlciAxLjZcbiAgLy8gKHdoaWNoIHdhcyBzZWxlY3RlZCBhY2NvcmRpbmcgYmVuY2htYXJrcykuXG5cbiAgLy8gLX5mID0+IE1hdGguY2VpbChmKSBpZiBuIGlzIGZsb2F0IG51bWJlclxuICAvLyAtfmkgPT4gaSArIDEgaWYgbiBpcyBpbnRlZ2VyIG51bWJlclxuICB2YXIgc3RlcCA9IC1+KDEuNiAqIG1hc2sgKiBzaXplIC8gYWxwaGFiZXQubGVuZ3RoKVxuICB2YXIgaWQgPSAnJ1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGJ5dGVzID0gcmFuZG9tKHN0ZXApXG4gICAgLy8gQ29tcGFjdCBhbHRlcm5hdGl2ZSBmb3IgYGZvciAodmFyIGkgPSAwOyBpIDwgc3RlcDsgaSsrKWBcbiAgICB2YXIgaSA9IHN0ZXBcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAvLyBJZiByYW5kb20gYnl0ZSBpcyBiaWdnZXIgdGhhbiBhbHBoYWJldCBldmVuIGFmdGVyIGJpdG1hc2ssXG4gICAgICAvLyB3ZSByZWZ1c2UgaXQgYnkgYHx8ICcnYC5cbiAgICAgIGlkICs9IGFscGhhYmV0W2J5dGVzW2ldICYgbWFza10gfHwgJydcbiAgICAgIC8vIE1vcmUgY29tcGFjdCB0aGFuIGBpZC5sZW5ndGggKyAxID09PSBzaXplYFxuICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gK3NpemUpIHJldHVybiBpZFxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vLi4vc2Nzcy9ibG9ja3MvY3VzdG9tLWZpZWxkcy1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvY3VzdG9tLWZpZWxkcy1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwiYWRkRmlsdGVyIiwiaG9va3MiLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsImVsZW1lbnQiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiU2VydmVyU2lkZVJlbmRlciIsInNlcnZlclNpZGVSZW5kZXIiLCJibG9ja0VkaXRvciIsIkluc3BlY3RvckNvbnRyb2xzIiwiQmxvY2tDb250cm9scyIsImNvbXBvbmVudHMiLCJCdXR0b24iLCJOb3RpY2UiLCJGbGV4IiwiRmxleEl0ZW0iLCJDYXJkIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJUb2dnbGVDb250cm9sIiwiU3Bpbm5lciIsIlRhYlBhbmVsIiwiU3BhY2VyIiwiX19leHBlcmltZW50YWxTcGFjZXIiLCJJbnB1dENvbnRyb2wiLCJfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbCIsIl9fIiwiaTE4biIsImV4YW1wbGVJbWFnZURhdGEiLCJzaG9ydGlkIiwicmVxdWlyZSIsImxhc3RQcmV2aWV3IiwiQ29uc3RydWN0b3JGaWVsZHNGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsInRlcm1zRmV0Y2hlZCIsInNldFRlcm1zRmV0Y2hlZCIsInNlZ21lbnQiLCJ0ZXJtcyIsInNldFRlcm1zIiwiYWN0aXZlU2VnbWVudCIsImJsb2NrUmVmIiwic29ydGFibGVJbml0IiwiY3VycmVudCIsImZpbmQiLCJub3QiLCJzb3J0YWJsZSIsImZvcmNlSGVscGVyU2l6ZSIsImZvcmNlUGxhY2Vob2xkZXJTaXplIiwib3BhY2l0eSIsInRvbGVyYW5jZSIsInNjcm9sbCIsInNjcm9sbFNlbnNpdGl2aXR5IiwiY29udGFpbm1lbnQiLCJwbGFjZWhvbGRlciIsImhhbmRsZSIsInN0YXJ0IiwiZXZlbnQiLCJ1aSIsIml0ZW0iLCJhZGRDbGFzcyIsImJlZm9yZVN0b3AiLCJyZW1vdmVDbGFzcyIsInN0b3AiLCJzYXZlVGFicyIsInN0b3JlIiwiZmllbGRzIiwicGFyZW50cyIsImF0dHIiLCJtYXRjaCIsImkiLCJjb25zdHJ1Y3RlZEZpZWxkcyIsImxlbmd0aCIsInNlZ21lbnRTbHVnIiwicHVzaCIsInEiLCJmaWVsZE9wdHMiLCJvcHRzIiwieiIsIm9wdCIsImtleSIsImRhdGEiLCJ2YWx1ZSIsInByb3AiLCJpZCIsImZpZWxkU2x1ZyIsImdldEV4YW1wbGUiLCJ0YWJzQ29udGVudCIsInRhYiIsImNvbnN0cnVjdGVkRmllbGRzSHRtbCIsImVudHJpZXMiLCJpbmRleCIsImZpZWxkQ29uc3RydWN0ZWQiLCJnZW5lcmF0ZSIsImZpZWxkc09wdGlvbnMiLCJjb25zdHJ1Y3RvckZpZWxkQ29uZmlnIiwiZ2V0Q29uc3RydWN0b3JGaWVsZENvbmZpZyIsIm9wdGlvbnMiLCJmaWVsZENvbmZpZyIsImxhYmVsIiwidGl0bGUiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0YWJzSHRtbCIsImluZGV4U2VnbWVudCIsImhlYWRpbmciLCJ0YWJzIiwidGFiTmFtZSIsImdldEJsb2NrUHJldmlldyIsImlzUHJldmlldyIsImdldFRlcm1zIiwicGF0aCIsIm1ldGhvZCIsImN1cnJlbnRBdHRycyIsInRoZW4iLCJyZXNwb25zZSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsImZpZWxkRGF0YSIsInNpbmdsZVNlZ21lbnQiLCJmaWVsZCIsImNvbnN0cnVjdG9yRmllbGRzIiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsImpvaW4iLCJpc01vdW50ZWQiLCJ2YWxpZEF0dHJzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zTGlzdCIsIm11dGF0aW9uIiwidHlwZSIsImFkZGVkTm9kZXMiLCJmaWVsZHNBcmVhIiwib2JzZXJ2ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsImRlZmF1bHQiLCJleGFtcGxlIiwic3VwcG9ydHMiLCJtdWx0aXBsZSIsImVkaXQiLCJzYXZlIiwid2luZG93IiwialF1ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==
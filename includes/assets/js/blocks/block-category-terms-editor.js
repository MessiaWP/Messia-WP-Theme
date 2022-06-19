/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/category-terms-editor.jsx":
/*!*************************************************!*\
  !*** ./src/js/blocks/category-terms-editor.jsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
  var _wp$blockEditor = wp.blockEditor,
      InspectorControls = _wp$blockEditor.InspectorControls,
      BlockControls = _wp$blockEditor.BlockControls;
  var _wp$components = wp.components,
      ToggleControl = _wp$components.ToggleControl,
      Flex = _wp$components.Flex,
      FlexItem = _wp$components.FlexItem,
      PanelBody = _wp$components.PanelBody,
      Notice = _wp$components.Notice,
      SelectControl = _wp$components.SelectControl,
      ToolbarGroup = _wp$components.ToolbarGroup,
      ToolbarButton = _wp$components.ToolbarButton,
      Placeholder = _wp$components.Placeholder,
      Disabled = _wp$components.Disabled,
      Card = _wp$components.Card,
      Spinner = _wp$components.Spinner,
      TabPanel = _wp$components.TabPanel;
  var __ = wp.i18n.__;
  var exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 87",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    className: "layer"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_33"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_19"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_10",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "4.65838",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_12",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "14.28169",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m14.7842,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_11"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_20"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_21",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "98.09058",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_24",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "107.71389",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m108.2164,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_25"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_26"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_27",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "191.73465",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_29",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "201.35795",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m201.86046,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_30"
  })))));

  var shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");

  var lastPreview = false;

  function CategoryTermsFn(props) {
    var attributes = props.attributes,
        setAttributes = props.setAttributes,
        className = props.className,
        name = props.name;

    var _useState = useState($()),
        _useState2 = _slicedToArray(_useState, 2),
        filterDropped = _useState2[0],
        setFilterDropped = _useState2[1];

    var _useState3 = useState(true),
        _useState4 = _slicedToArray(_useState3, 2),
        editMode = _useState4[0],
        setEditMode = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        termsFetched = _useState6[0],
        setTermsFetched = _useState6[1];

    var _useState7 = useState({
      segment: [],
      category: []
    }),
        _useState8 = _slicedToArray(_useState7, 2),
        terms = _useState8[0],
        setTerms = _useState8[1];

    var blockRef = useRef();

    var slotTitle = __('Category term slot', 'messia');

    var dragTitle = __('Add Category term', 'messia');

    var handlerRemove = function handlerRemove(event) {
      $(event.target).parents('.category-slot').animate({
        opacity: 0
      }, 400, function () {
        $(this).addClass('removed').css('display', 'none');
        var categories = $(blockRef.current).find('.category-constructed .category-slot');
        saveSlots(categories);
      });
    };

    var dragSortInit = function dragSortInit() {
      var sortable = $(blockRef.current).find('.category-constructed').not('ui-sortable').sortable({
        forceHelperSize: true,
        forcePlaceholderSize: true,
        opacity: 1,
        //distance: 10,
        tolerance: 'intersect',
        //cursor: 'grabbig',
        scroll: true,
        scrollSensitivity: 20,
        containment: '.edit-post-visual-editor',
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
          ui.item.find('.title .text').text(slotTitle);
          showSlotSettings(ui).then(function (ui) {
            setFilterDropped(ui.item);
          });
        }
      });
      var draggable = $(blockRef.current).find('.category-templates .category-slot').not('.ui-draggable').draggable({
        connectToSortable: '.category-constructed',
        //cursor: 'grabbig',
        helper: 'clone',
        revert: 'invalid',
        scroll: false,
        revertDuration: 200,
        handle: '.move',
        zIndex: 10,
        start: function start(event, ui) {
          ui.helper.addClass('is-elevated');
          $('body').addClass('cursor-grabbing');
          sortable.addClass('dragging');
        },
        beforeStop: function beforeStop(event, ui) {
          $('body').removeClass('cursor-grabbing');
        },
        stop: function stop(event, ui) {
          ui.helper.removeClass('is-elevated');
          sortable.removeClass('dragging');
        }
      });
    };

    var saveSlots = function saveSlots(categories) {
      var store = [];
      var segmentSlug = categories.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];

      for (var i = 0; i < attributes.categoriesConstructed.length; i++) {
        if (attributes.categoriesConstructed[i].segmentSlug === segmentSlug) {
          continue;
        } // add other tabs categories


        store.push(attributes.categoriesConstructed[i]);
      }

      for (var _i2 = 0; _i2 < categories.length; _i2++) {
        var key = void 0;

        if ($(categories[_i2]).hasClass('removed')) {
          continue;
        }

        if ('undefined' === typeof $(categories[_i2]).data('key')) {
          key = shortid.generate();
        } else {
          key = $(categories[_i2]).data('key');
        }

        var type = $(categories[_i2]).data('type');

        switch (type) {
          case 'category':
            store.push({
              id: key,
              'segmentSlug': segmentSlug,
              'categorySlug': $(categories[_i2]).find('.settings select').val()
            });
            break;
        }
      }

      if (filterDropped.hasClass('ui-draggable')) {
        filterDropped.addClass('remove-before-render');
      }

      setAttributes({
        categoriesConstructed: store
      });
    };

    var showSlotSettings = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ui) {
        var w_from, w_to;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!ui.item.hasClass('saved')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(ui));

              case 2:
                w_from = ui.item.outerWidth();
                ui.item.css({
                  'height': '',
                  'width': ''
                });
                w_to = ui.item.outerWidth();
                ui.item.css({
                  'width': w_from
                }).addClass('dropped');
                ;
                _context.next = 9;
                return new Promise(function (resolve, reject) {
                  //Card div
                  ui.item.animate({
                    width: w_to + 'px'
                  }, 200, function () {
                    $(this).css({
                      'width': ''
                    }); //Setting div

                    var settings = ui.item.find('.settings');

                    if (settings.length === 0) {
                      ui.item.addClass('saved');
                      resolve(ui);
                    } else {
                      settings.css('display', 'block');
                      var h = settings.outerHeight();
                      var w = settings.outerWidth();
                      settings.css({
                        'height': 0,
                        'width': 0
                      });
                      settings.animate({
                        height: h + 'px',
                        width: w + 'px'
                      }, 300, function () {
                        $(this).css({
                          'height': '',
                          'width': ''
                        });
                        ui.item.addClass('saved');
                        resolve(ui);
                      });
                    }
                  });
                });

              case 9:
                return _context.abrupt("return", _context.sent);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function showSlotSettings(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var getExample = function getExample() {
      return exampleImageData;
    };

    var templates = function templates() {
      var block = wp.blocks.getBlockType(name);
      var templatesHtml = [/*#__PURE__*/React.createElement(Fragment, {
        key: "tip"
      }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('The list of terms is subordinate to the value of the "Empty category terms" option. Each list contains all terms of taxonomy Category. In frontend selected term will be shown as a link to the search page by this value.', 'messia'))))];

      if (terms.category.length > 0) {
        templatesHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card category-slot",
          key: "tmpl-by-category",
          "data-type": "category",
          size: "small"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-card-content"
        }, /*#__PURE__*/React.createElement(Flex, {
          gap: 2
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "move"
        }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
          className: "heading"
        }, dragTitle), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: handlerRemove
        })), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, /*#__PURE__*/React.createElement(SelectControl, {
          value: terms.category[0].value,
          options: terms.category
        })))));
      }

      return templatesHtml;
    };

    var slots = function slots(tab) {
      var categoriesConstructedHtml = [];

      var _iterator = _createForOfIteratorHelper(attributes.categoriesConstructed.entries()),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              filter = _step$value[1];

          if (tab.segmentSlug != filter.segmentSlug) {
            return "continue";
          }

          categoriesConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
            className: "messia-card category-slot dropped saved",
            key: "".concat(filter.categorySlug, "-").concat(filter.id),
            "data-type": "category",
            size: "small"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-card-content"
          }, /*#__PURE__*/React.createElement(Flex, {
            gap: 2
          }, /*#__PURE__*/React.createElement(FlexItem, {
            className: "move"
          }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
            className: "heading"
          }, slotTitle), /*#__PURE__*/React.createElement(FlexItem, {
            className: "remove",
            onClick: handlerRemove
          })), /*#__PURE__*/React.createElement("div", {
            className: "settings"
          }, /*#__PURE__*/React.createElement(SelectControl, {
            value: attributes.categoriesConstructed[index].categorySlug,
            onChange: function onChange(termSlug) {
              var attr = attributes.categoriesConstructed;
              delete attributes.categoriesConstructed;
              attr[index].categorySlug = termSlug;
              setAttributes({
                categoriesConstructed: attr
              });
            },
            options: terms.category
          })))));
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return categoriesConstructedHtml;
    };

    var getInspectorControls = function getInspectorControls() {
      return /*#__PURE__*/React.createElement(InspectorControls, {
        key: "inspector"
      }, /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Settings', 'messia')
      }, /*#__PURE__*/React.createElement(ToggleControl, {
        label: __('Show on front number of objects per term.', 'messia'),
        checked: attributes.withCount,
        onChange: function onChange(checked) {
          setAttributes({
            withCount: checked
          });
        }
      }), /*#__PURE__*/React.createElement(ToggleControl //className="criteria-item"
      , {
        label: __('Show in slider', 'messia'),
        checked: attributes.slider.active,
        onChange: function onChange(checked) {
          var slider = Object.assign({}, attributes.slider);
          slider.active = Boolean(checked);
          setAttributes({
            slider: slider
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
          setEditMode(!editMode);
        }
      })));
    };

    var getBlockEdit = function getBlockEdit() {
      if (termsFetched) {
        if (terms.segment.length > 0) {
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

          var tabs = /*#__PURE__*/React.createElement(TabPanel, {
            className: "messia-tabs-panel",
            activeClass: "active-tab",
            orientation: "horizontal",
            initialTabName: tabsHtml[0].name,
            tabs: tabsHtml
          }, function (tab) {
            return /*#__PURE__*/React.createElement("div", {
              "data-title": __('Drop item here.', 'messia'),
              className: "messia-drop-zone category-constructed"
            }, slots(tab));
          });
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, /*#__PURE__*/React.createElement("div", {
            className: "category-templates"
          }, templates()), tabs));
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return apiFetch({
                  path: 'messia/v1/block-category-terms',
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
                  } else {
                    if (response.terms.category.length === 0) {
                      wp.data.dispatch('core/notices').createNotice('error', // Can be one of: success, info, warning, error.
                      __('Messia Category Terms: No terms were found in taxonomy Category. Add some to use block.', 'messia'), // Text string to display.
                      {
                        isDismissible: true
                      });
                    }
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
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function getTerms() {
        return _ref2.apply(this, arguments);
      };
    }();

    var render = function render() {
      if (attributes.isExample) {
        return getExample();
      } else {
        if (filterDropped.hasClass('remove-before-render')) {
          filterDropped.remove();
        }

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
              categoriesConstructed: response.validAttrs.categoriesConstructed
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
      if (!editMode && !attributes.isExample) {
        $(blockRef.current).find('.category-constructed').sortable('destroy');
      }
    }, [editMode]);
    useEffect(function () {
      if (filterDropped.length === 0) {
        return;
      }

      var categories = $(blockRef.current).find('.category-constructed .category-slot');
      saveSlots(categories);
    }, [filterDropped]);
    useEffect(function () {
      var observer = new MutationObserver(function (mutationsList, observer) {
        var _iterator3 = _createForOfIteratorHelper(mutationsList),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var mutation = _step3.value;

            if (mutation.type === 'childList') {
              if (mutation.addedNodes.length >= 1) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                  var tabArea = $(mutation.addedNodes[i]).find('.category-constructed');

                  if (tabArea.length > 0) {
                    dragSortInit();
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
    }, []);
    return render();
  }

  registerBlockType('messia/block-category-terms', {
    title: __('Category\'s terms', 'messia'),
    description: __('Terms of taxonomy Category by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 21c0 1.657-1.344 3-3 3-1.657 0-3-1.343-3-3s1.343-3 3-3c1.656 0 3 1.343 3 3zm6-3c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm0-18c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm9 18c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-1.577-1.721l-6.423-5.028v-3.352c-.323.066-.658.101-1 .101s-.677-.035-1-.101v3.352l-6.423 5.028c.694.233 1.323.602 1.844 1.093l5.579-4.372 5.579 4.373c.522-.492 1.15-.861 1.844-1.094z"
    })),
    category: 'messia',
    keywords: ['category'],
    styles: [],
    variations: [],
    attributes: {
      categoriesConstructed: {
        type: 'array',
        default: []
      },
      isExample: {
        type: 'boolean',
        default: false
      },
      withCount: {
        type: 'boolean',
        default: true
      },
      slider: {
        type: 'object',
        default: {
          active: true
        }
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
    edit: CategoryTermsFn,
    save: function save(props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/category-terms-editor.scss":
/*!****************************************************!*\
  !*** ./src/scss/blocks/category-terms-editor.scss ***!
  \****************************************************/
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
/*!*****************************************************!*\
  !*** ./src/entries/blocks/category-terms-editor.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_category_terms_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/category-terms-editor.scss */ "./src/scss/blocks/category-terms-editor.scss");
/* harmony import */ var _js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/category-terms-editor.jsx */ "./src/js/blocks/category-terms-editor.jsx");
/* harmony import */ var _js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1jYXRlZ29yeS10ZXJtcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREMsV0FBVUEsRUFBVixFQUFjQyxDQUFkLEVBQWlCO0VBRWpCLElBQVFDLFFBQVIsR0FBcUJGLEVBQXJCLENBQVFFLFFBQVI7RUFDQSxJQUFRQyxpQkFBUixHQUE4QkgsRUFBRSxDQUFDSSxNQUFqQyxDQUFRRCxpQkFBUjtFQUNBLGtCQUE2REgsRUFBRSxDQUFDSyxPQUFoRTtFQUFBLElBQVFDLFNBQVIsZUFBUUEsU0FBUjtFQUFBLElBQW1CQyxRQUFuQixlQUFtQkEsUUFBbkI7RUFBQSxJQUE2QkMsUUFBN0IsZUFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGVBQXVDQSxTQUF2QztFQUFBLElBQWtEQyxNQUFsRCxlQUFrREEsTUFBbEQ7RUFDQSxJQUEwQkMsZ0JBQTFCLEdBQStDWCxFQUEvQyxDQUFRWSxnQkFBUjtFQUNBLHNCQUE2Q1osRUFBRSxDQUFDYSxXQUFoRDtFQUFBLElBQVFDLGlCQUFSLG1CQUFRQSxpQkFBUjtFQUFBLElBQTJCQyxhQUEzQixtQkFBMkJBLGFBQTNCO0VBQ0EscUJBQXlKZixFQUFFLENBQUNnQixVQUE1SjtFQUFBLElBQVFDLGFBQVIsa0JBQVFBLGFBQVI7RUFBQSxJQUF1QkMsSUFBdkIsa0JBQXVCQSxJQUF2QjtFQUFBLElBQTZCQyxRQUE3QixrQkFBNkJBLFFBQTdCO0VBQUEsSUFBdUNDLFNBQXZDLGtCQUF1Q0EsU0FBdkM7RUFBQSxJQUFrREMsTUFBbEQsa0JBQWtEQSxNQUFsRDtFQUFBLElBQTBEQyxhQUExRCxrQkFBMERBLGFBQTFEO0VBQUEsSUFBeUVDLFlBQXpFLGtCQUF5RUEsWUFBekU7RUFBQSxJQUF1RkMsYUFBdkYsa0JBQXVGQSxhQUF2RjtFQUFBLElBQXNHQyxXQUF0RyxrQkFBc0dBLFdBQXRHO0VBQUEsSUFBbUhDLFFB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O0FDeEJhOztBQUViOzs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELFVBQVU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDc0Q7O0FBRXREIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL2Jsb2Nrcy9jYXRlZ29yeS10ZXJtcy1lZGl0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL2Jsb2Nrcy9jYXRlZ29yeS10ZXJtcy1lZGl0b3Iuc2Nzcz9lNGQ1Iiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2luZGV4LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2dlbmVyYXRlLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvaXMtdmFsaWQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL25vZGVfbW9kdWxlcy9uYW5vaWQvZm9ybWF0LmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy9jYXRlZ29yeS10ZXJtcy1lZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3cCwgJCkge1xuXG5cdGNvbnN0IHsgYXBpRmV0Y2ggfSA9IHdwO1xuXHRjb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7XG5cdGNvbnN0IHsgQ29tcG9uZW50LCBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gPSB3cC5lbGVtZW50O1xuXHRjb25zdCB7IHNlcnZlclNpZGVSZW5kZXI6IFNlcnZlclNpZGVSZW5kZXIgfSA9IHdwO1xuXHRjb25zdCB7IEluc3BlY3RvckNvbnRyb2xzLCBCbG9ja0NvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcblx0Y29uc3QgeyBUb2dnbGVDb250cm9sLCBGbGV4LCBGbGV4SXRlbSwgUGFuZWxCb2R5LCBOb3RpY2UsIFNlbGVjdENvbnRyb2wsIFRvb2xiYXJHcm91cCwgVG9vbGJhckJ1dHRvbiwgUGxhY2Vob2xkZXIsIERpc2FibGVkLCBDYXJkLCBTcGlubmVyLCBUYWJQYW5lbCB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgODdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0PGcgY2xhc3NOYW1lPVwibGF5ZXJcIj5cblx0XHRcdDxnIGlkPVwic3ZnXzMzXCI+XG5cdFx0XHRcdDxnIGlkPVwic3ZnXzE5XCI+XG5cdFx0XHRcdFx0PHJlY3QgZmlsbD1cIiMwMDAwMDBcIiBmaWxsT3BhY2l0eT1cIjBcIiBoZWlnaHQ9XCI3Ny4xMjM5MlwiIGlkPVwic3ZnXzEwXCIgcng9XCIyXCIgcnk9XCIyXCIgc3Ryb2tlPVwiIzdmN2Y3ZlwiIHN0cm9rZVdpZHRoPVwiMlwiIHdpZHRoPVwiNzcuMTIzOTJcIiB4PVwiNC42NTgzOFwiIHk9XCI1LjA4MjExXCIgLz5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiIzdmN2Y3ZlwiIGhlaWdodD1cIjguMTg5NjNcIiBpZD1cInN2Z18xMlwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNTcuODc3MzFcIiB4PVwiMTQuMjgxNjlcIiB5PVwiNTkuNzExNDRcIiAvPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJtMTQuNzg0Miw1My42NzA2M2wxNC40NTEwNCwtMTkuODgyMjlsMTAuMTAzNyw2LjU4NzM0bDE2LjI3NjcyLC0yMy4wNzUxbDE2LjA0MDg0LDM2LjQ2MjM5bC01Ni44NzIyOSwtMC4wOTIzNHpcIiBmaWxsPVwiIzdmN2Y3ZlwiIGlkPVwic3ZnXzExXCIgLz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8ZyBpZD1cInN2Z18yMFwiPlxuXHRcdFx0XHRcdDxyZWN0IGZpbGw9XCIjMDAwMDAwXCIgZmlsbE9wYWNpdHk9XCIwXCIgaGVpZ2h0PVwiNzcuMTIzOTJcIiBpZD1cInN2Z18yMVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHN0cm9rZT1cIiM3ZjdmN2ZcIiBzdHJva2VXaWR0aD1cIjJcIiB3aWR0aD1cIjc3LjEyMzkyXCIgeD1cIjk4LjA5MDU4XCIgeT1cIjUuMDgyMTFcIiAvPlxuXHRcdFx0XHRcdDxyZWN0IGZpbGw9XCIjN2Y3ZjdmXCIgaGVpZ2h0PVwiOC4xODk2M1wiIGlkPVwic3ZnXzI0XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI1Ny44NzczMVwiIHg9XCIxMDcuNzEzODlcIiB5PVwiNTkuNzExNDRcIiAvPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJtMTA4LjIxNjQsNTMuNjcwNjNsMTQuNDUxMDQsLTE5Ljg4MjI5bDEwLjEwMzcsNi41ODczNGwxNi4yNzY3MiwtMjMuMDc1MWwxNi4wNDA4NCwzNi40NjIzOWwtNTYuODcyMjksLTAuMDkyMzR6XCIgZmlsbD1cIiM3ZjdmN2ZcIiBpZD1cInN2Z18yNVwiIC8+XG5cdFx0XHRcdDwvZz5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfMjZcIj5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiIzAwMDAwMFwiIGZpbGxPcGFjaXR5PVwiMFwiIGhlaWdodD1cIjc3LjEyMzkyXCIgaWQ9XCJzdmdfMjdcIiByeD1cIjJcIiByeT1cIjJcIiBzdHJva2U9XCIjN2Y3ZjdmXCIgc3Ryb2tlV2lkdGg9XCIyXCIgd2lkdGg9XCI3Ny4xMjM5MlwiIHg9XCIxOTEuNzM0NjVcIiB5PVwiNS4wODIxMVwiIC8+XG5cdFx0XHRcdFx0PHJlY3QgZmlsbD1cIiM3ZjdmN2ZcIiBoZWlnaHQ9XCI4LjE4OTYzXCIgaWQ9XCJzdmdfMjlcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjU3Ljg3NzMxXCIgeD1cIjIwMS4zNTc5NVwiIHk9XCI1OS43MTE0NFwiIC8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIm0yMDEuODYwNDYsNTMuNjcwNjNsMTQuNDUxMDQsLTE5Ljg4MjI5bDEwLjEwMzcsNi41ODczNGwxNi4yNzY3MiwtMjMuMDc1MWwxNi4wNDA4NCwzNi40NjIzOWwtNTYuODcyMjksLTAuMDkyMzR6XCIgZmlsbD1cIiM3ZjdmN2ZcIiBpZD1cInN2Z18zMFwiIC8+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblx0Y29uc3Qgc2hvcnRpZCA9IHJlcXVpcmUoJ3Nob3J0aWQnKTtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBDYXRlZ29yeVRlcm1zRm4ocHJvcHMpIHtcblxuXHRcdGNvbnN0IHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlcywgY2xhc3NOYW1lLCBuYW1lIH0gPSBwcm9wcztcblx0XHRjb25zdCBbZmlsdGVyRHJvcHBlZCwgc2V0RmlsdGVyRHJvcHBlZF0gPSB1c2VTdGF0ZSgkKCkpO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW3Rlcm1zRmV0Y2hlZCwgc2V0VGVybXNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbdGVybXMsIHNldFRlcm1zXSA9IHVzZVN0YXRlKHtcblx0XHRcdHNlZ21lbnQ6IFtdLFxuXHRcdFx0Y2F0ZWdvcnk6IFtdXG5cdFx0fSk7XG5cblx0XHRsZXQgYmxvY2tSZWYgPSB1c2VSZWYoKTtcblx0XHRjb25zdCBzbG90VGl0bGUgPSBfXygnQ2F0ZWdvcnkgdGVybSBzbG90JywgJ21lc3NpYScpO1xuXHRcdGNvbnN0IGRyYWdUaXRsZSA9IF9fKCdBZGQgQ2F0ZWdvcnkgdGVybScsICdtZXNzaWEnKTtcblxuXHRcdGNvbnN0IGhhbmRsZXJSZW1vdmUgPSAoZXZlbnQpID0+IHtcblxuXHRcdFx0JChldmVudC50YXJnZXQpLnBhcmVudHMoJy5jYXRlZ29yeS1zbG90JykuYW5pbWF0ZSh7XG5cdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHR9LCA0MDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygncmVtb3ZlZCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0XHRcdGNvbnN0IGNhdGVnb3JpZXMgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5jYXRlZ29yeS1jb25zdHJ1Y3RlZCAuY2F0ZWdvcnktc2xvdCcpO1xuXHRcdFx0XHRzYXZlU2xvdHMoY2F0ZWdvcmllcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBkcmFnU29ydEluaXQgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0IHNvcnRhYmxlID0gJChibG9ja1JlZi5jdXJyZW50KS5maW5kKCcuY2F0ZWdvcnktY29uc3RydWN0ZWQnKS5ub3QoJ3VpLXNvcnRhYmxlJykuc29ydGFibGUoe1xuXHRcdFx0XHRmb3JjZUhlbHBlclNpemU6IHRydWUsXG5cdFx0XHRcdGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0XHQvL2Rpc3RhbmNlOiAxMCxcblx0XHRcdFx0dG9sZXJhbmNlOiAnaW50ZXJzZWN0Jyxcblx0XHRcdFx0Ly9jdXJzb3I6ICdncmFiYmlnJyxcblx0XHRcdFx0c2Nyb2xsOiB0cnVlLFxuXHRcdFx0XHRzY3JvbGxTZW5zaXRpdml0eTogMjAsXG5cdFx0XHRcdGNvbnRhaW5tZW50OiAnLmVkaXQtcG9zdC12aXN1YWwtZWRpdG9yJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdzb3J0YWJsZS1wbGFjZWhvbGRlcicsXG5cdFx0XHRcdGhhbmRsZTogJy5tb3ZlJyxcblx0XHRcdFx0Ly96SW5kZXg6IDEwMDAwLFxuXHRcdFx0XHRzdGFydDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5pdGVtLnJlbW92ZUNsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdHVpLml0ZW0uZmluZCgnLnRpdGxlIC50ZXh0JykudGV4dChzbG90VGl0bGUpO1xuXHRcdFx0XHRcdHNob3dTbG90U2V0dGluZ3ModWkpLnRoZW4oKHVpKSA9PiB7XG5cdFx0XHRcdFx0XHRzZXRGaWx0ZXJEcm9wcGVkKHVpLml0ZW0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IGRyYWdnYWJsZSA9ICQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmNhdGVnb3J5LXRlbXBsYXRlcyAuY2F0ZWdvcnktc2xvdCcpLm5vdCgnLnVpLWRyYWdnYWJsZScpLmRyYWdnYWJsZSh7XG5cdFx0XHRcdGNvbm5lY3RUb1NvcnRhYmxlOiAnLmNhdGVnb3J5LWNvbnN0cnVjdGVkJyxcblx0XHRcdFx0Ly9jdXJzb3I6ICdncmFiYmlnJyxcblx0XHRcdFx0aGVscGVyOiAnY2xvbmUnLFxuXHRcdFx0XHRyZXZlcnQ6ICdpbnZhbGlkJyxcblx0XHRcdFx0c2Nyb2xsOiBmYWxzZSxcblx0XHRcdFx0cmV2ZXJ0RHVyYXRpb246IDIwMCxcblx0XHRcdFx0aGFuZGxlOiAnLm1vdmUnLFxuXHRcdFx0XHR6SW5kZXg6IDEwLFxuXHRcdFx0XHRzdGFydDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLmhlbHBlci5hZGRDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHRcdHNvcnRhYmxlLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVTdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLmhlbHBlci5yZW1vdmVDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHRzb3J0YWJsZS5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNhdmVTbG90cyA9IChjYXRlZ29yaWVzKSA9PiB7XG5cblx0XHRcdGxldCBzdG9yZSA9IFtdO1xuXHRcdFx0Y29uc3Qgc2VnbWVudFNsdWcgPSBjYXRlZ29yaWVzLnBhcmVudHMoJy5tZXNzaWEtdGFicy1wYW5lbCcpLmZpbmQoJ1tyb2xlPVwidGFicGFuZWxcIl0nKS5hdHRyKCdpZCcpLm1hdGNoKC9zZWdtZW50LSguKyktc2x1Zy8pWzFdO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZFtpXS5zZWdtZW50U2x1ZyA9PT0gc2VnbWVudFNsdWcpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBhZGQgb3RoZXIgdGFicyBjYXRlZ29yaWVzXG5cdFx0XHRcdHN0b3JlLnB1c2goYXR0cmlidXRlcy5jYXRlZ29yaWVzQ29uc3RydWN0ZWRbaV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNhdGVnb3JpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGtleTtcblx0XHRcdFx0aWYgKCQoY2F0ZWdvcmllc1tpXSkuaGFzQ2xhc3MoJ3JlbW92ZWQnKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgJChjYXRlZ29yaWVzW2ldKS5kYXRhKCdrZXknKSkge1xuXHRcdFx0XHRcdGtleSA9IHNob3J0aWQuZ2VuZXJhdGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZXkgPSAkKGNhdGVnb3JpZXNbaV0pLmRhdGEoJ2tleScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdHlwZSA9ICQoY2F0ZWdvcmllc1tpXSkuZGF0YSgndHlwZScpO1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjYXRlZ29yeSc6XG5cblx0XHRcdFx0XHRcdHN0b3JlLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZDoga2V5LFxuXHRcdFx0XHRcdFx0XHQnc2VnbWVudFNsdWcnOiBzZWdtZW50U2x1Zyxcblx0XHRcdFx0XHRcdFx0J2NhdGVnb3J5U2x1Zyc6ICQoY2F0ZWdvcmllc1tpXSkuZmluZCgnLnNldHRpbmdzIHNlbGVjdCcpLnZhbCgpLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmlsdGVyRHJvcHBlZC5oYXNDbGFzcygndWktZHJhZ2dhYmxlJykpIHtcblx0XHRcdFx0ZmlsdGVyRHJvcHBlZC5hZGRDbGFzcygncmVtb3ZlLWJlZm9yZS1yZW5kZXInKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0QXR0cmlidXRlcyh7IGNhdGVnb3JpZXNDb25zdHJ1Y3RlZDogc3RvcmUgfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2hvd1Nsb3RTZXR0aW5ncyA9IGFzeW5jICh1aSkgPT4ge1xuXG5cdFx0XHRpZiAodWkuaXRlbS5oYXNDbGFzcygnc2F2ZWQnKSkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgd19mcm9tID0gdWkuaXRlbS5vdXRlcldpZHRoKCk7XG5cblx0XHRcdHVpLml0ZW0uY3NzKHtcblx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHQnd2lkdGgnOiAnJyxcblx0XHRcdH0pO1xuXG5cdFx0XHRjb25zdCB3X3RvID0gdWkuaXRlbS5vdXRlcldpZHRoKCk7XG5cblx0XHRcdHVpLml0ZW0uY3NzKHtcblx0XHRcdFx0J3dpZHRoJzogd19mcm9tLFxuXHRcdFx0fSkuYWRkQ2xhc3MoJ2Ryb3BwZWQnKTs7XG5cblx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdC8vQ2FyZCBkaXZcblx0XHRcdFx0dWkuaXRlbS5hbmltYXRlKHtcblx0XHRcdFx0XHR3aWR0aDogd190byArICdweCcsXG5cdFx0XHRcdH0sIDIwMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6ICcnLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly9TZXR0aW5nIGRpdlxuXHRcdFx0XHRcdGNvbnN0IHNldHRpbmdzID0gdWkuaXRlbS5maW5kKCcuc2V0dGluZ3MnKTtcblxuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ3NhdmVkJyk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHVpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0XHRcdHNldHRpbmdzLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBoID0gc2V0dGluZ3Mub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0XHRcdGNvbnN0IHcgPSBzZXR0aW5ncy5vdXRlcldpZHRoKCk7XG5cblx0XHRcdFx0XHRcdHNldHRpbmdzLmNzcyh7XG5cdFx0XHRcdFx0XHRcdCdoZWlnaHQnOiAwLFxuXHRcdFx0XHRcdFx0XHQnd2lkdGgnOiAwLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5hbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBoICsgJ3B4Jyxcblx0XHRcdFx0XHRcdFx0d2lkdGg6IHcgKyAncHgnLFxuXHRcdFx0XHRcdFx0fSwgMzAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdFx0XHQnaGVpZ2h0JzogJycsXG5cdFx0XHRcdFx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR1aS5pdGVtLmFkZENsYXNzKCdzYXZlZCcpO1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHVpKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGVtcGxhdGVzID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cdFx0XHRjb25zdCB0ZW1wbGF0ZXNIdG1sID0gW1xuXHRcdFx0XHQ8RnJhZ21lbnQga2V5PSd0aXAnPlxuXHRcdFx0XHRcdDxoND57YmxvY2sudGl0bGV9PC9oND5cblx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdHN0YXR1cz1cIndhcm5pbmdcIj5cblx0XHRcdFx0XHRcdDxwPntfXygnVGhlIGxpc3Qgb2YgdGVybXMgaXMgc3Vib3JkaW5hdGUgdG8gdGhlIHZhbHVlIG9mIHRoZSBcIkVtcHR5IGNhdGVnb3J5IHRlcm1zXCIgb3B0aW9uLiBFYWNoIGxpc3QgY29udGFpbnMgYWxsIHRlcm1zIG9mIHRheG9ub215IENhdGVnb3J5LiBJbiBmcm9udGVuZCBzZWxlY3RlZCB0ZXJtIHdpbGwgYmUgc2hvd24gYXMgYSBsaW5rIHRvIHRoZSBzZWFyY2ggcGFnZSBieSB0aGlzIHZhbHVlLicsICdtZXNzaWEnKX08L3A+XG5cdFx0XHRcdFx0PC9Ob3RpY2U+XG5cdFx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0XHRdO1xuXG5cdFx0XHRpZiAodGVybXMuY2F0ZWdvcnkubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdHRlbXBsYXRlc0h0bWwucHVzaChcblx0XHRcdFx0XHQ8Q2FyZFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibWVzc2lhLWNhcmQgY2F0ZWdvcnktc2xvdFwiXG5cdFx0XHRcdFx0XHRrZXk9XCJ0bXBsLWJ5LWNhdGVnb3J5XCJcblx0XHRcdFx0XHRcdGRhdGEtdHlwZT1cImNhdGVnb3J5XCJcblx0XHRcdFx0XHRcdHNpemU9XCJzbWFsbFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXsyfT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwibW92ZVwiPiZlcXVpdjs8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9J2hlYWRpbmcnPntkcmFnVGl0bGV9PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwicmVtb3ZlXCIgb25DbGljaz17aGFuZGxlclJlbW92ZX0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNldHRpbmdzXCI+XG5cdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0ZXJtcy5jYXRlZ29yeVswXS52YWx1ZX1cblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3Rlcm1zLmNhdGVnb3J5fVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGVzSHRtbDtcblx0XHR9XG5cblx0XHRjb25zdCBzbG90cyA9ICh0YWIpID0+IHtcblxuXHRcdFx0Y29uc3QgY2F0ZWdvcmllc0NvbnN0cnVjdGVkSHRtbCA9IFtdO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFtpbmRleCwgZmlsdGVyXSBvZiBhdHRyaWJ1dGVzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZC5lbnRyaWVzKCkpIHtcblxuXHRcdFx0XHRpZiAodGFiLnNlZ21lbnRTbHVnICE9IGZpbHRlci5zZWdtZW50U2x1Zykge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2F0ZWdvcmllc0NvbnN0cnVjdGVkSHRtbC5wdXNoKFxuXHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCBjYXRlZ29yeS1zbG90IGRyb3BwZWQgc2F2ZWRcIlxuXHRcdFx0XHRcdFx0a2V5PXtgJHtmaWx0ZXIuY2F0ZWdvcnlTbHVnfS0ke2ZpbHRlci5pZH1gfVxuXHRcdFx0XHRcdFx0ZGF0YS10eXBlPVwiY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJtb3ZlXCI+JmVxdWl2OzwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT0naGVhZGluZyc+e3Nsb3RUaXRsZX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJyZW1vdmVcIiBvbkNsaWNrPXtoYW5kbGVyUmVtb3ZlfT48L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3NcIj5cblx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkW2luZGV4XS5jYXRlZ29yeVNsdWd9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHRlcm1TbHVnKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBhdHRyID0gYXR0cmlidXRlcy5jYXRlZ29yaWVzQ29uc3RydWN0ZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBhdHRyaWJ1dGVzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cltpbmRleF0uY2F0ZWdvcnlTbHVnID0gdGVybVNsdWc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBjYXRlZ29yaWVzQ29uc3RydWN0ZWQ6IGF0dHIgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L0NhcmQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjYXRlZ29yaWVzQ29uc3RydWN0ZWRIdG1sO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEluc3BlY3RvckNvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHMga2V5PSdpbnNwZWN0b3InPlxuXHRcdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9e19fKCdTZXR0aW5ncycsICdtZXNzaWEnKX0gPlxuXHRcdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTaG93IG9uIGZyb250IG51bWJlciBvZiBvYmplY3RzIHBlciB0ZXJtLicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy53aXRoQ291bnR9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyB3aXRoQ291bnQ6IGNoZWNrZWQgfSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0Ly9jbGFzc05hbWU9XCJjcml0ZXJpYS1pdGVtXCJcblx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTaG93IGluIHNsaWRlcicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5zbGlkZXIuYWN0aXZlfVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KGNoZWNrZWQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgc2xpZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgYXR0cmlidXRlcy5zbGlkZXIpO1xuXHRcdFx0XHRcdFx0XHRcdHNsaWRlci5hY3RpdmUgPSBCb29sZWFuKGNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBzbGlkZXI6IHNsaWRlciB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDwvSW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRlcm1zRmV0Y2hlZCkge1xuXHRcdFx0XHRpZiAodGVybXMuc2VnbWVudC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGFic0h0bWwgPSBbXTtcblxuXHRcdFx0XHRcdGZvciAoY29uc3QgW2luZGV4U2VnbWVudCwgc2VnbWVudF0gb2YgdGVybXMuc2VnbWVudC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0XHRcdHRhYnNIdG1sLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBgc2VnbWVudC0ke3NlZ21lbnQudmFsdWV9LXNsdWdgLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogc2VnbWVudC5sYWJlbCxcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAndGFiJyxcblx0XHRcdFx0XHRcdFx0c2VnbWVudFNsdWc6IHNlZ21lbnQudmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCB0YWJzID0gPFRhYlBhbmVsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtdGFicy1wYW5lbFwiXG5cdFx0XHRcdFx0XHRhY3RpdmVDbGFzcz1cImFjdGl2ZS10YWJcIlxuXHRcdFx0XHRcdFx0b3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGluaXRpYWxUYWJOYW1lPXt0YWJzSHRtbFswXS5uYW1lfVxuXHRcdFx0XHRcdFx0dGFicz17dGFic0h0bWx9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQodGFiKSA9PiA8ZGl2IGRhdGEtdGl0bGU9e19fKCdEcm9wIGl0ZW0gaGVyZS4nLCAnbWVzc2lhJyl9IGNsYXNzTmFtZT1cIm1lc3NpYS1kcm9wLXpvbmUgY2F0ZWdvcnktY29uc3RydWN0ZWRcIj57c2xvdHModGFiKX08L2Rpdj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L1RhYlBhbmVsPlxuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhdGVnb3J5LXRlbXBsYXRlc1wiPnt0ZW1wbGF0ZXMoKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHR7dGFic31cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIiBsYWJlbD17X18oXCJZb3UgaGF2ZSBubyBzZWdtZW50cy4gQ3JlYXRlIG9uZS5cIiwgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT48L2Rpdj5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXIgPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdDxTcGlubmVyIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17bmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VGVybXMgPSBhc3luYyAoKSA9PiB7XG5cblx0XHRcdHJldHVybiBhd2FpdCBhcGlGZXRjaCh7XG5cdFx0XHRcdHBhdGg6ICdtZXNzaWEvdjEvYmxvY2stY2F0ZWdvcnktdGVybXMnLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0ZGF0YTogeyBjdXJyZW50QXR0cnM6IGF0dHJpYnV0ZXMgfVxuXHRcdFx0fSkudGhlbihyZXNwb25zZSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3BvbnNlLnRlcm1zLnNlZ21lbnQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRfXygnTWVzc2lhIENhdGVnb3J5IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IFNlZ21lbnQuIFVuaXQgb3BlcmF0aW9uIGlzIG5vdCBwb3NzaWJsZS4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMuY2F0ZWdvcnkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdFx0XHRfXygnTWVzc2lhIENhdGVnb3J5IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IENhdGVnb3J5LiBBZGQgc29tZSB0byB1c2UgYmxvY2suJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgQ2F0ZWdvcnkgVGVybXMgYmxvY2snLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0aWYgKGZpbHRlckRyb3BwZWQuaGFzQ2xhc3MoJ3JlbW92ZS1iZWZvcmUtcmVuZGVyJykpIHtcblx0XHRcdFx0XHRmaWx0ZXJEcm9wcGVkLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEluc3BlY3RvckNvbnRyb2xzKCksXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcmllc0NvbnN0cnVjdGVkOiByZXNwb25zZS52YWxpZEF0dHJzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoKSA9PiB7IGlzTW91bnRlZCA9IGZhbHNlIH07XG5cblx0XHR9LCBbdGVybXNGZXRjaGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRpZiAoIWVkaXRNb2RlICYmICFhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHQkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5jYXRlZ29yeS1jb25zdHJ1Y3RlZCcpLnNvcnRhYmxlKCdkZXN0cm95Jyk7XG5cdFx0XHR9XG5cblx0XHR9LCBbZWRpdE1vZGVdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGlmIChmaWx0ZXJEcm9wcGVkLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBjYXRlZ29yaWVzID0gJChibG9ja1JlZi5jdXJyZW50KS5maW5kKCcuY2F0ZWdvcnktY29uc3RydWN0ZWQgLmNhdGVnb3J5LXNsb3QnKTtcblx0XHRcdHNhdmVTbG90cyhjYXRlZ29yaWVzKTtcblx0XHR9LCBbZmlsdGVyRHJvcHBlZF0pO1xuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0bGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnNMaXN0KSB7XG5cdFx0XHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG5cdFx0XHRcdFx0XHRpZiAobXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YWJBcmVhID0gJChtdXRhdGlvbi5hZGRlZE5vZGVzW2ldKS5maW5kKCcuY2F0ZWdvcnktY29uc3RydWN0ZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGFiQXJlYS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkcmFnU29ydEluaXQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKFxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcblx0XHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRcdFx0c3VidHJlZTogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBMYXRlciwgd2UgY2FuIHN0b3Agb2JzZXJ2aW5nXG5cdFx0XHQvLyBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cblx0XHR9LCBbXSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyKCk7XG5cdH1cblxuXHRyZWdpc3RlckJsb2NrVHlwZSgnbWVzc2lhL2Jsb2NrLWNhdGVnb3J5LXRlcm1zJywge1xuXHRcdHRpdGxlOiBfXygnQ2F0ZWdvcnlcXCdzIHRlcm1zJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnVGVybXMgb2YgdGF4b25vbXkgQ2F0ZWdvcnkgYnkgcGFyYW1ldGVycycsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk02IDIxYzAgMS42NTctMS4zNDQgMy0zIDMtMS42NTcgMC0zLTEuMzQzLTMtM3MxLjM0My0zIDMtM2MxLjY1NiAwIDMgMS4zNDMgMyAzem02LTNjLTEuNjU3IDAtMyAxLjM0My0zIDNzMS4zNDMgMyAzIDNjMS42NTYgMCAzLTEuMzQzIDMtM3MtMS4zNDQtMy0zLTN6bTAtMThjLTEuNjU3IDAtMyAxLjM0My0zIDNzMS4zNDMgMyAzIDNjMS42NTYgMCAzLTEuMzQzIDMtM3MtMS4zNDQtMy0zLTN6bTkgMThjLTEuNjU2IDAtMyAxLjM0My0zIDNzMS4zNDQgMyAzIDMgMy0xLjM0MyAzLTMtMS4zNDQtMy0zLTN6bS0xLjU3Ny0xLjcyMWwtNi40MjMtNS4wMjh2LTMuMzUyYy0uMzIzLjA2Ni0uNjU4LjEwMS0xIC4xMDFzLS42NzctLjAzNS0xLS4xMDF2My4zNTJsLTYuNDIzIDUuMDI4Yy42OTQuMjMzIDEuMzIzLjYwMiAxLjg0NCAxLjA5M2w1LjU3OS00LjM3MiA1LjU3OSA0LjM3M2MuNTIyLS40OTIgMS4xNS0uODYxIDEuODQ0LTEuMDk0elwiIC8+PC9zdmc+LFxuXHRcdGNhdGVnb3J5OiAnbWVzc2lhJyxcblx0XHRrZXl3b3JkczogWydjYXRlZ29yeSddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0Y2F0ZWdvcmllc0NvbnN0cnVjdGVkOiB7XG5cdFx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRcdGRlZmF1bHQ6IFtdLFxuXHRcdFx0fSxcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdHdpdGhDb3VudDoge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0c2xpZGVyOiB7XG5cdFx0XHRcdHR5cGU6ICdvYmplY3QnLFxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0YWN0aXZlOiB0cnVlLFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBDYXRlZ29yeVRlcm1zRm4sXG5cdFx0c2F2ZTogZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsIH0sXG5cdH0pO1xuXG59KHdpbmRvdy53cCwgalF1ZXJ5KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tRnJvbVNlZWQgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkJyk7XG5cbnZhciBPUklHSU5BTCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8tJztcbnZhciBhbHBoYWJldDtcbnZhciBwcmV2aW91c1NlZWQ7XG5cbnZhciBzaHVmZmxlZDtcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc2h1ZmZsZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgaWYgKCFfYWxwaGFiZXRfKSB7XG4gICAgICAgIGlmIChhbHBoYWJldCAhPT0gT1JJR0lOQUwpIHtcbiAgICAgICAgICAgIGFscGhhYmV0ID0gT1JJR0lOQUw7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0XyA9PT0gYWxwaGFiZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfLmxlbmd0aCAhPT0gT1JJR0lOQUwubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFlvdSBzdWJtaXR0ZWQgJyArIF9hbHBoYWJldF8ubGVuZ3RoICsgJyBjaGFyYWN0ZXJzOiAnICsgX2FscGhhYmV0Xyk7XG4gICAgfVxuXG4gICAgdmFyIHVuaXF1ZSA9IF9hbHBoYWJldF8uc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmQsIGFycil7XG4gICAgICAgcmV0dXJuIGluZCAhPT0gYXJyLmxhc3RJbmRleE9mKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHVuaXF1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gVGhlc2UgY2hhcmFjdGVycyB3ZXJlIG5vdCB1bmlxdWU6ICcgKyB1bmlxdWUuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgYWxwaGFiZXQgPSBfYWxwaGFiZXRfO1xuICAgIHJlc2V0KCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xyk7XG4gICAgcmV0dXJuIGFscGhhYmV0O1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICByYW5kb21Gcm9tU2VlZC5zZWVkKHNlZWQpO1xuICAgIGlmIChwcmV2aW91c1NlZWQgIT09IHNlZWQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJldmlvdXNTZWVkID0gc2VlZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgaWYgKCFhbHBoYWJldCkge1xuICAgICAgICBzZXRDaGFyYWN0ZXJzKE9SSUdJTkFMKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG4gICAgdmFyIHRhcmdldEFycmF5ID0gW107XG4gICAgdmFyIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICB2YXIgY2hhcmFjdGVySW5kZXg7XG5cbiAgICB3aGlsZSAoc291cmNlQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgICAgIGNoYXJhY3RlckluZGV4ID0gTWF0aC5mbG9vcihyICogc291cmNlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChzb3VyY2VBcnJheS5zcGxpY2UoY2hhcmFjdGVySW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldEFycmF5LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTaHVmZmxlZCgpIHtcbiAgICBpZiAoc2h1ZmZsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNodWZmbGVkO1xuICAgIH1cbiAgICBzaHVmZmxlZCA9IHNodWZmbGUoKTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG59XG5cbi8qKlxuICogbG9va3VwIHNodWZmbGVkIGxldHRlclxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBsb29rdXAoaW5kZXgpIHtcbiAgICB2YXIgYWxwaGFiZXRTaHVmZmxlZCA9IGdldFNodWZmbGVkKCk7XG4gICAgcmV0dXJuIGFscGhhYmV0U2h1ZmZsZWRbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBnZXQgKCkge1xuICByZXR1cm4gYWxwaGFiZXQgfHwgT1JJR0lOQUw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldDogZ2V0LFxuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoJy4vZ2VuZXJhdGUnKTtcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE1Njc3NTI4MDIwNjI7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNztcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCkge1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShzZWNvbmRzKTtcbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKCduYW5vaWQvZm9ybWF0Jyk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlKG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgZm9ybWF0KHJhbmRvbSwgYWxwaGFiZXQuZ2V0KCksIDEpO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgYnVpbGQgPSByZXF1aXJlKCcuL2J1aWxkJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gIHJldHVybiBidWlsZChjbHVzdGVyV29ya2VySWQpO1xufVxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG5vbkFscGhhYmV0aWMgPSBuZXcgUmVnRXhwKCdbXicgK1xuICAgICAgYWxwaGFiZXQuZ2V0KCkucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy4tXS9nLCAnXFxcXCQmJykgK1xuICAgICddJyk7XG4gICAgcmV0dXJuICFub25BbHBoYWJldGljLnRlc3QoaWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyeXB0byA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0byk7IC8vIElFIDExIHVzZXMgd2luZG93Lm1zQ3J5cHRvXG5cbnZhciByYW5kb21CeXRlO1xuXG5pZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHZhciBieXRlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgYnl0ZXMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuIiwiLy8gVGhpcyBmaWxlIHJlcGxhY2VzIGBmb3JtYXQuanNgIGluIGJ1bmRsZXJzIGxpa2Ugd2VicGFjayBvciBSb2xsdXAsXG4vLyBhY2NvcmRpbmcgdG8gYGJyb3dzZXJgIGNvbmZpZyBpbiBgcGFja2FnZS5qc29uYC5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmFuZG9tLCBhbHBoYWJldCwgc2l6ZSkge1xuICAvLyBXZSBjYW7igJl0IHVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuIFRvIG1ha2UgYnl0ZXMgdmFsdWVzIGNsb3NlclxuICAvLyB0byB0aGUgYWxwaGFiZXQsIHdlIGFwcGx5IGJpdG1hc2sgb24gdGhlbS4gV2UgbG9vayBmb3IgdGhlIGNsb3Nlc3RcbiAgLy8gYDIgKiogeCAtIDFgIG51bWJlciwgd2hpY2ggd2lsbCBiZSBiaWdnZXIgdGhhbiBhbHBoYWJldCBzaXplLiBJZiB3ZSBoYXZlXG4gIC8vIDMwIHN5bWJvbHMgaW4gdGhlIGFscGhhYmV0LCB3ZSB3aWxsIHRha2UgMzEgKDAwMDExMTExKS5cbiAgLy8gV2UgZG8gbm90IHVzZSBmYXN0ZXIgTWF0aC5jbHozMiwgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlIGluIGJyb3dzZXJzLlxuICB2YXIgbWFzayA9ICgyIDw8IE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpIC0gMVxuICAvLyBCaXRtYXNrIGlzIG5vdCBhIHBlcmZlY3Qgc29sdXRpb24gKGluIG91ciBleGFtcGxlIGl0IHdpbGwgcGFzcyAzMSBieXRlcyxcbiAgLy8gd2hpY2ggaXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0KS4gQXMgYSByZXN1bHQsIHdlIHdpbGwgbmVlZCBtb3JlIGJ5dGVzLFxuICAvLyB0aGFuIElEIHNpemUsIGJlY2F1c2Ugd2Ugd2lsbCByZWZ1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LlxuXG4gIC8vIEV2ZXJ5IGhhcmR3YXJlIHJhbmRvbSBnZW5lcmF0b3IgY2FsbCBpcyBjb3N0bHksXG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IGZvciBlbnRyb3B5IGNvbGxlY3Rpb24uIFRoaXMgaXMgd2h5IG9mdGVuIGl0IHdpbGxcbiAgLy8gYmUgZmFzdGVyIHRvIGFzayBmb3IgZmV3IGV4dHJhIGJ5dGVzIGluIGFkdmFuY2UsIHRvIGF2b2lkIGFkZGl0aW9uYWwgY2FsbHMuXG5cbiAgLy8gSGVyZSB3ZSBjYWxjdWxhdGUgaG93IG1hbnkgcmFuZG9tIGJ5dGVzIHNob3VsZCB3ZSBjYWxsIGluIGFkdmFuY2UuXG4gIC8vIEl0IGRlcGVuZHMgb24gSUQgbGVuZ3RoLCBtYXNrIC8gYWxwaGFiZXQgc2l6ZSBhbmQgbWFnaWMgbnVtYmVyIDEuNlxuICAvLyAod2hpY2ggd2FzIHNlbGVjdGVkIGFjY29yZGluZyBiZW5jaG1hcmtzKS5cblxuICAvLyAtfmYgPT4gTWF0aC5jZWlsKGYpIGlmIG4gaXMgZmxvYXQgbnVtYmVyXG4gIC8vIC1+aSA9PiBpICsgMSBpZiBuIGlzIGludGVnZXIgbnVtYmVyXG4gIHZhciBzdGVwID0gLX4oMS42ICogbWFzayAqIHNpemUgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHZhciBpZCA9ICcnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYnl0ZXMgPSByYW5kb20oc3RlcClcbiAgICAvLyBDb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYFxuICAgIHZhciBpID0gc3RlcFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIElmIHJhbmRvbSBieXRlIGlzIGJpZ2dlciB0aGFuIGFscGhhYmV0IGV2ZW4gYWZ0ZXIgYml0bWFzayxcbiAgICAgIC8vIHdlIHJlZnVzZSBpdCBieSBgfHwgJydgLlxuICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbaV0gJiBtYXNrXSB8fCAnJ1xuICAgICAgLy8gTW9yZSBjb21wYWN0IHRoYW4gYGlkLmxlbmd0aCArIDEgPT09IHNpemVgXG4gICAgICBpZiAoaWQubGVuZ3RoID09PSArc2l6ZSkgcmV0dXJuIGlkXG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVzXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2Jsb2Nrcy9jYXRlZ29yeS10ZXJtcy1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvY2F0ZWdvcnktdGVybXMtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJhcGlGZXRjaCIsInJlZ2lzdGVyQmxvY2tUeXBlIiwiYmxvY2tzIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIkZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsImJsb2NrRWRpdG9yIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiY29tcG9uZW50cyIsIlRvZ2dsZUNvbnRyb2wiLCJGbGV4IiwiRmxleEl0ZW0iLCJQYW5lbEJvZHkiLCJOb3RpY2UiLCJTZWxlY3RDb250cm9sIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJDYXJkIiwiU3Bpbm5lciIsIlRhYlBhbmVsIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsInNob3J0aWQiLCJyZXF1aXJlIiwibGFzdFByZXZpZXciLCJDYXRlZ29yeVRlcm1zRm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImZpbHRlckRyb3BwZWQiLCJzZXRGaWx0ZXJEcm9wcGVkIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsInRlcm1zRmV0Y2hlZCIsInNldFRlcm1zRmV0Y2hlZCIsInNlZ21lbnQiLCJjYXRlZ29yeSIsInRlcm1zIiwic2V0VGVybXMiLCJibG9ja1JlZiIsInNsb3RUaXRsZSIsImRyYWdUaXRsZSIsImhhbmRsZXJSZW1vdmUiLCJldmVudCIsInRhcmdldCIsInBhcmVudHMiLCJhbmltYXRlIiwib3BhY2l0eSIsImFkZENsYXNzIiwiY3NzIiwiY2F0ZWdvcmllcyIsImN1cnJlbnQiLCJmaW5kIiwic2F2ZVNsb3RzIiwiZHJhZ1NvcnRJbml0Iiwic29ydGFibGUiLCJub3QiLCJmb3JjZUhlbHBlclNpemUiLCJmb3JjZVBsYWNlaG9sZGVyU2l6ZSIsInRvbGVyYW5jZSIsInNjcm9sbCIsInNjcm9sbFNlbnNpdGl2aXR5IiwiY29udGFpbm1lbnQiLCJwbGFjZWhvbGRlciIsImhhbmRsZSIsInN0YXJ0IiwidWkiLCJpdGVtIiwiYmVmb3JlU3RvcCIsInJlbW92ZUNsYXNzIiwic3RvcCIsInRleHQiLCJzaG93U2xvdFNldHRpbmdzIiwidGhlbiIsImRyYWdnYWJsZSIsImNvbm5lY3RUb1NvcnRhYmxlIiwiaGVscGVyIiwicmV2ZXJ0IiwicmV2ZXJ0RHVyYXRpb24iLCJ6SW5kZXgiLCJzdG9yZSIsInNlZ21lbnRTbHVnIiwiYXR0ciIsIm1hdGNoIiwiaSIsImNhdGVnb3JpZXNDb25zdHJ1Y3RlZCIsImxlbmd0aCIsInB1c2giLCJrZXkiLCJoYXNDbGFzcyIsImRhdGEiLCJnZW5lcmF0ZSIsInR5cGUiLCJpZCIsInZhbCIsIlByb21pc2UiLCJyZXNvbHZlIiwid19mcm9tIiwib3V0ZXJXaWR0aCIsIndfdG8iLCJyZWplY3QiLCJ3aWR0aCIsInNldHRpbmdzIiwiaCIsIm91dGVySGVpZ2h0IiwidyIsImhlaWdodCIsImdldEV4YW1wbGUiLCJ0ZW1wbGF0ZXMiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRlbXBsYXRlc0h0bWwiLCJ0aXRsZSIsInZhbHVlIiwic2xvdHMiLCJ0YWIiLCJjYXRlZ29yaWVzQ29uc3RydWN0ZWRIdG1sIiwiZW50cmllcyIsImluZGV4IiwiZmlsdGVyIiwiY2F0ZWdvcnlTbHVnIiwidGVybVNsdWciLCJnZXRJbnNwZWN0b3JDb250cm9scyIsIndpdGhDb3VudCIsImNoZWNrZWQiLCJzbGlkZXIiLCJhY3RpdmUiLCJPYmplY3QiLCJhc3NpZ24iLCJCb29sZWFuIiwiZ2V0QmxvY2tDb250cm9scyIsImdldEJsb2NrRWRpdCIsInRhYnNIdG1sIiwiaW5kZXhTZWdtZW50IiwibGFiZWwiLCJ0YWJzIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwiZ2V0VGVybXMiLCJwYXRoIiwibWV0aG9kIiwiY3VycmVudEF0dHJzIiwicmVzcG9uc2UiLCJkaXNwYXRjaCIsImNyZWF0ZU5vdGljZSIsImlzRGlzbWlzc2libGUiLCJjYXRjaCIsImUiLCJyZW5kZXIiLCJpc0V4YW1wbGUiLCJyZW1vdmUiLCJjbGFzc2VzIiwiam9pbiIsImlzTW91bnRlZCIsInZhbGlkQXR0cnMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnNMaXN0IiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidGFiQXJlYSIsIm9ic2VydmUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZGVzY3JpcHRpb24iLCJpY29uIiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwiZGVmYXVsdCIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
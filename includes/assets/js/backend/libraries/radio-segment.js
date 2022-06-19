/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components/_radio_term_selector.jsx":
/*!*****************************************************!*\
  !*** ./src/js/_components/_radio_term_selector.jsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    _x = _wp$i18n._x,
    _n = _wp$i18n._n,
    sprintf = _wp$i18n.sprintf;
var Component = wp.element.Component;
var _wp$components = wp.components,
    TreeSelect = _wp$components.TreeSelect,
    withSpokenMessages = _wp$components.withSpokenMessages,
    withFilters = _wp$components.withFilters,
    Button = _wp$components.Button;
var _wp$data = wp.data,
    withSelect = _wp$data.withSelect,
    withDispatch = _wp$data.withDispatch,
    select = _wp$data.select,
    subscribe = _wp$data.subscribe;
var _wp$compose = wp.compose,
    withInstanceId = _wp$compose.withInstanceId,
    compose = _wp$compose.compose;
var _wp = wp,
    apiFetch = _wp.apiFetch;
var addQueryArgs = wp.url.addQueryArgs;
var _lodash = lodash,
    groupBy = _lodash.groupBy,
    get = _lodash.get,
    unescape = _lodash.unescape,
    find = _lodash.find,
    some = _lodash.some,
    invoke = _lodash.invoke;
var DEFAULT_QUERY = {
  per_page: -1,
  orderby: 'name',
  order: 'asc',
  _fields: 'id,name,parent'
};
var MIN_TERMS_COUNT_FOR_FILTER = 8;
var metaboxChanged = false;

var RadioTermSelector = /*#__PURE__*/function (_Component) {
  _inherits(RadioTermSelector, _Component);

  var _super = _createSuper(RadioTermSelector);

  function RadioTermSelector() {
    var _this;

    _classCallCheck(this, RadioTermSelector);

    _this = _super.apply(this, arguments);
    _this.findTerm = _this.findTerm.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onChangeFormName = _this.onChangeFormName.bind(_assertThisInitialized(_this));
    _this.onChangeFormParent = _this.onChangeFormParent.bind(_assertThisInitialized(_this));
    _this.onAddTerm = _this.onAddTerm.bind(_assertThisInitialized(_this));
    _this.onToggleForm = _this.onToggleForm.bind(_assertThisInitialized(_this));
    _this.setFilterValue = _this.setFilterValue.bind(_assertThisInitialized(_this));
    _this.sortBySelected = _this.sortBySelected.bind(_assertThisInitialized(_this));
    _this.state = {
      loading: true,
      availableTermsTree: [],
      availableTerms: [],
      adding: false,
      formName: '',
      formParent: '',
      showForm: false,
      filterValue: '',
      filteredTermsTree: [],
      disabled: false
    };

    _this.onChangeMetaboxes();

    _this.onSavingPost();

    return _this;
  }
  /**
   * Track saving post event
   */


  _createClass(RadioTermSelector, [{
    key: "onSavingPost",
    value: function onSavingPost() {
      wp.apiFetch.use(function (options, next) {
        var result = next(options);
        result.then(function (response) {
          var unSubscribe = subscribe(function () {
            var saving = select('core/editor').isSavingPost();
            var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

            if (!saving && !isAutosavingPost) {
              unSubscribe();

              if (metaboxChanged === true) {
                metaboxChanged = false;
              }

              document.dispatchEvent(new Event('messiaContentIsSaved', {
                bubbles: false
              }));
            }
          });
        });
        return result;
      });
    }
    /**
     * Add events to switch metaboxChanged flag to true
     * once some elementdata inside metabox got new content
     */

  }, {
    key: "onChangeMetaboxes",
    value: function onChangeMetaboxes() {
      var metaboxes = document.querySelector('.postbox-container [id^="segment-constructor-term-id"]');

      if (null === metaboxes || 0 === metaboxes.length) {
        return;
      }

      metaboxes.addEventListener('select2Change', this.handleMetaboxChange.bind(this), false);
      metaboxes.addEventListener('codeMirrorChange', this.handleMetaboxChange.bind(this), false);
      metaboxes.addEventListener('input', this.handleMetaboxChange.bind(this), false);
      metaboxes.addEventListener('sortableChange', this.handleMetaboxChange.bind(this), false);
    }
  }, {
    key: "handleMetaboxChange",
    value: function handleMetaboxChange() {
      metaboxChanged = true;
    }
  }, {
    key: "buildTermsTree",
    value: function buildTermsTree(flatTerms) {
      var flatTermsWithParentAndChildren = flatTerms.map(function (term) {
        return _objectSpread({
          children: [],
          parent: null
        }, term);
      });
      var termsByParent = groupBy(flatTermsWithParentAndChildren, 'parent');

      if (termsByParent.null && termsByParent.null.length) {
        return flatTermsWithParentAndChildren;
      }

      var fillWithChildren = function fillWithChildren(terms) {
        return terms.map(function (term) {
          var children = termsByParent[term.id];
          return _objectSpread(_objectSpread({}, term), {}, {
            children: children && children.length ? fillWithChildren(children) : []
          });
        });
      };

      return fillWithChildren(termsByParent['0'] || []);
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      // @helgatheviking
      var go = this.shouldChangeSegment();

      if (!go) {
        return;
      }

      var _this$props = this.props,
          onUpdateTerms = _this$props.onUpdateTerms,
          taxonomy = _this$props.taxonomy;
      var termId = parseInt(event.target.value, 10);
      onUpdateTerms([termId], taxonomy.rest_base);
    }
    /**
     * Will trigger warning if segment changed
     * but metabox has unsaved changes
     */

  }, {
    key: "shouldChangeSegment",
    value: function shouldChangeSegment() {
      var isPostDirty = wp.data.select('core/editor').isEditedPostDirty();

      if (metaboxChanged || isPostDirty) {
        var go = confirm(__('Metaboxes will be updated. You have unsaved changes that could be lost. Proceed?', 'messia'));

        if (!go) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "onChangeFormName",
    value: function onChangeFormName(event) {
      var newValue = event.target.value.trim() === '' ? '' : event.target.value;
      this.setState({
        formName: newValue
      });
    }
  }, {
    key: "onChangeFormParent",
    value: function onChangeFormParent(newParent) {
      this.setState({
        formParent: newParent
      });
    }
  }, {
    key: "onToggleForm",
    value: function onToggleForm() {
      this.setState(function (state) {
        return {
          showForm: !state.showForm
        };
      });
    }
  }, {
    key: "findTerm",
    value: function findTerm(terms, parent, name) {
      return find(terms, function (term) {
        return (!term.parent && !parent || parseInt(term.parent) === parseInt(parent)) && term.name.toLowerCase() === name.toLowerCase();
      });
    }
  }, {
    key: "onAddTerm",
    value: function onAddTerm(event) {
      var _this2 = this;

      event.preventDefault();
      var go = this.shouldChangeSegment();

      if (!go) {
        return;
      }

      var _this$props2 = this.props,
          onUpdateTerms = _this$props2.onUpdateTerms,
          taxonomy = _this$props2.taxonomy,
          terms = _this$props2.terms,
          slug = _this$props2.slug;
      var _this$state = this.state,
          formName = _this$state.formName,
          formParent = _this$state.formParent,
          adding = _this$state.adding,
          availableTerms = _this$state.availableTerms;

      if (formName === '' || adding) {
        return;
      } // check if the term we are adding already exists


      var existingTerm = this.findTerm(availableTerms, formParent, formName);

      if (existingTerm) {
        // if the term we are adding exists but is not selected select it
        if (!some(terms, function (term) {
          return term === existingTerm.id;
        })) {
          onUpdateTerms([existingTerm.id], taxonomy.rest_base); // @helgatheviking
        }

        this.setState({
          formName: '',
          formParent: ''
        });
        return;
      }

      this.setState({
        adding: true
      });
      this.addRequest = apiFetch({
        path: "/wp/v2/".concat(taxonomy.rest_base),
        method: 'POST',
        data: {
          name: formName,
          parent: formParent ? formParent : undefined
        }
      }); // Tries to create a term or fetch it if it already exists

      var findOrCreatePromise = this.addRequest.catch(function (error) {
        var errorCode = error.code;

        if (errorCode === 'term_exists') {
          // search the new category created since last fetch
          _this2.addRequest = apiFetch({
            path: addQueryArgs("/wp/v2/".concat(taxonomy.rest_base), _objectSpread(_objectSpread({}, DEFAULT_QUERY), {}, {
              parent: formParent || 0,
              search: formName
            }))
          });
          return _this2.addRequest.then(function (searchResult) {
            return _this2.findTerm(searchResult, formParent, formName);
          });
        }

        return Promise.reject(error);
      });
      findOrCreatePromise.then(function (term) {
        var hasTerm = !!find(_this2.state.availableTerms, function (availableTerm) {
          return availableTerm.id === term.id;
        });
        var newAvailableTerms = hasTerm ? _this2.state.availableTerms : [term].concat(_toConsumableArray(_this2.state.availableTerms));
        var termAddedMessage = sprintf(_x('%s added', 'term', 'messia'), get(_this2.props.taxonomy, ['labels', 'singular_name'], slug === 'category' ? __('Category', 'messia') : __('Term', 'messia')));

        _this2.props.speak(termAddedMessage, 'assertive');

        _this2.addRequest = null;

        _this2.setState({
          adding: false,
          formName: '',
          formParent: '',
          availableTerms: newAvailableTerms,
          availableTermsTree: _this2.sortBySelected(_this2.buildTermsTree(newAvailableTerms))
        });

        onUpdateTerms([term.id], taxonomy.rest_base); // @helgatheviking
      }, function (xhr) {
        if (xhr.statusText === 'abort') {
          return;
        }

        _this2.addRequest = null;

        _this2.setState({
          adding: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTerms();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      invoke(this.fetchRequest, ['abort']);
      invoke(this.addRequest, ['abort']);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.taxonomy !== prevProps.taxonomy) {
        this.fetchTerms();
      }

      if (this.props.terms !== prevProps.terms) {
        this.updateMetaboxes(prevProps.terms[0], this.props.terms[0]);
      }
    }
  }, {
    key: "fetchTerms",
    value: function fetchTerms() {
      var _this3 = this;

      var taxonomy = this.props.taxonomy;

      if (!taxonomy) {
        return;
      }

      this.fetchRequest = apiFetch({
        path: addQueryArgs("/wp/v2/".concat(taxonomy.rest_base), DEFAULT_QUERY)
      });
      this.fetchRequest.then(function (terms) {
        // resolve
        var availableTermsTree = _this3.sortBySelected(_this3.buildTermsTree(terms));

        _this3.fetchRequest = null;

        _this3.setState({
          loading: false,
          availableTermsTree: availableTermsTree,
          availableTerms: terms
        });
      }, function (xhr) {
        // reject
        if (xhr.statusText === 'abort') {
          return;
        }

        _this3.fetchRequest = null;

        _this3.setState({
          loading: false
        });
      });
    }
  }, {
    key: "updateMetaboxes",
    value: function updateMetaboxes() {
      var _this4 = this;

      var prevSegment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var currentSegment = arguments.length > 1 ? arguments[1] : undefined;
      this.setState({
        disabled: true
      });
      wp.data.dispatch('core/editor').lockPostSaving('messia/segment-lock');
      this.fetchMetaboxes(prevSegment, currentSegment).then(function (result) {
        var newId = result.metaboxHtml.getAttribute('id');
        var prevId = newId.replace(/(\d+)/g, result.prevTerm);
        var postType = wp.data.select('core/editor').getCurrentPostType();
        document.getElementById(prevId).replaceWith(result.metaboxHtml);
        window.postboxes.add_postbox_toggles(postType);
        wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');

        _this4.setState({
          disabled: false
        });

        _this4.onChangeMetaboxes();

        metaboxChanged = false;
        document.getElementById(newId).dispatchEvent(new Event('objectMetaboxUpdated', {
          bubbles: true
        }));
      }, function (reject) {
        // nonce did not verified or other unexpected err
        document.querySelector('#segment-constructor-term-id-' + prevSegment).remove();
        wp.data.dispatch('core/editor').unlockPostSaving('messia/segment-lock');
        metaboxChanged = false;

        _this4.setState({
          disabled: false
        });
      });
    }
  }, {
    key: "fetchMetaboxes",
    value: function () {
      var _fetchMetaboxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var prevTerm,
            termId,
            _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prevTerm = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                termId = _args.length > 1 ? _args[1] : undefined;
                _context.next = 4;
                return new Promise(function (resolve, reject) {
                  apiFetch({
                    url: addQueryArgs(document.location.href, {
                      'fetch-metabox-for-term': termId,
                      'messia_nonce': document.querySelector('#segment-constructor-term-id-' + prevTerm).querySelector('#messia_nonce').value
                    }),
                    method: 'POST',
                    parse: false
                  }).then(function (response) {
                    return response.text();
                  }).then(function (body) {
                    var el = document.createElement('metaboxes');
                    el.innerHTML = body;
                    var metabox = el.querySelector('#segment-constructor-term-id-' + termId);
                    el.remove();

                    if (metabox === null) {
                      reject();
                    }

                    resolve({
                      prevTerm: prevTerm,
                      metaboxHtml: metabox
                    });
                  }).catch(function (e) {
                    wp.data.dispatch('core/notices').createNotice('error', // Can be one of: success, info, warning, error.
                    __('An error occurred while fetching metabox.', 'messia'), // Text string to display.
                    {
                      isDismissible: true
                    });
                  });
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fetchMetaboxes() {
        return _fetchMetaboxes.apply(this, arguments);
      }

      return fetchMetaboxes;
    }()
  }, {
    key: "sortBySelected",
    value: function sortBySelected(termsTree) {
      var terms = this.props.terms;

      var treeHasSelection = function treeHasSelection(termTree) {
        if (terms.indexOf(termTree.id) !== -1) {
          return true;
        }

        if (undefined === termTree.children) {
          return false;
        }

        var anyChildIsSelected = termTree.children.map(treeHasSelection).filter(function (child) {
          return child;
        }).length > 0;

        if (anyChildIsSelected) {
          return true;
        }

        return false;
      };

      var termOrChildIsSelected = function termOrChildIsSelected(termA, termB) {
        var termASelected = treeHasSelection(termA);
        var termBSelected = treeHasSelection(termB);

        if (termASelected === termBSelected) {
          return 0;
        }

        if (termASelected && !termBSelected) {
          return -1;
        }

        if (!termASelected && termBSelected) {
          return 1;
        }

        return 0;
      };

      termsTree.sort(termOrChildIsSelected);
      return termsTree;
    }
  }, {
    key: "setFilterValue",
    value: function setFilterValue(event) {
      var availableTermsTree = this.state.availableTermsTree;
      var filterValue = event.target.value;
      var filteredTermsTree = availableTermsTree.map(this.getFilterMatcher(filterValue)).filter(function (term) {
        return term;
      });

      var getResultCount = function getResultCount(terms) {
        var count = 0;

        for (var i = 0; i < terms.length; i++) {
          count++;

          if (undefined !== terms[i].children) {
            count += getResultCount(terms[i].children);
          }
        }

        return count;
      };

      this.setState({
        filterValue: filterValue,
        filteredTermsTree: filteredTermsTree
      });
      var resultCount = getResultCount(filteredTermsTree);
      var resultsFoundMessage = sprintf(_n('%d result found.', '%d results found.', resultCount, 'messia'), resultCount);
      this.props.debouncedSpeak(resultsFoundMessage, 'assertive');
    }
  }, {
    key: "getFilterMatcher",
    value: function getFilterMatcher(filterValue) {
      var matchTermsForFilter = function matchTermsForFilter(originalTerm) {
        if ('' === filterValue) {
          return originalTerm;
        } // Shallow clone, because we'll be filtering the term's children and
        // don't want to modify the original term.


        var term = _objectSpread({}, originalTerm); // Map and filter the children, recursive so we deal with grandchildren
        // and any deeper levels.


        if (term.children.length > 0) {
          term.children = term.children.map(matchTermsForFilter).filter(function (child) {
            return child;
          });
        } // If the term's name contains the filterValue, or it has children
        // (i.e. some child matched at some point in the tree) then return it.


        if (-1 !== term.name.toLowerCase().indexOf(filterValue.toLowerCase()) || term.children.length > 0) {
          return term;
        } // Otherwise, return false. After mapping, the list of terms will need
        // to have false values filtered out.


        return false;
      };

      return matchTermsForFilter;
    }
  }, {
    key: "renderTerms",
    value: function renderTerms(renderedTerms) {
      var _this5 = this;

      var _this$props3 = this.props,
          _this$props3$terms = _this$props3.terms,
          terms = _this$props3$terms === void 0 ? [] : _this$props3$terms,
          taxonomy = _this$props3.taxonomy; // @helgatheviking

      var klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

      return renderedTerms.map(function (term) {
        var id = "editor-post-taxonomies-".concat(klass, "-term-").concat(term.id); // @helgatheviking

        return /*#__PURE__*/React.createElement("div", {
          key: term.id,
          className: 'editor-post-taxonomies__' + klass + '-terms-choice '
        }, /*#__PURE__*/React.createElement("input", {
          id: id,
          className: 'editor-post-taxonomies__' + klass + '-terms-input ',
          type: "radio" // @helgatheviking
          ,
          checked: terms.indexOf(term.id) !== -1,
          value: term.id,
          onChange: _this5.onChange,
          name: 'radio_tax_input-' + _this5.props.slug // @helgatheviking
          ,
          disabled: _this5.state.disabled // @helgatheviking

        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: id
        }, unescape(term.name)), !!term.children.length && /*#__PURE__*/React.createElement("div", {
          className: 'editor-post-taxonomies__' + klass + '-terms-subchoices '
        }, _this5.renderTerms(term.children)));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          slug = _this$props4.slug,
          taxonomy = _this$props4.taxonomy,
          instanceId = _this$props4.instanceId,
          hasCreateAction = _this$props4.hasCreateAction,
          hasAssignAction = _this$props4.hasAssignAction;
      var klass = taxonomy.hierarchical ? 'hierarchical' : 'non-hierarchical'; // @helgatheviking

      if (!hasAssignAction) {
        return null;
      }

      var _this$state2 = this.state,
          availableTermsTree = _this$state2.availableTermsTree,
          availableTerms = _this$state2.availableTerms,
          filteredTermsTree = _this$state2.filteredTermsTree,
          formName = _this$state2.formName,
          formParent = _this$state2.formParent,
          loading = _this$state2.loading,
          showForm = _this$state2.showForm,
          filterValue = _this$state2.filterValue;

      var labelWithFallback = function labelWithFallback(labelProperty, fallbackIsCategory, fallbackIsNotCategory) {
        return get(taxonomy, ['labels', labelProperty], slug === 'category' ? fallbackIsCategory : fallbackIsNotCategory);
      };

      var newTermButtonLabel = labelWithFallback('add_new_item', __('Add new category', 'messia'), __('Add new term', 'messia'));
      var newTermLabel = labelWithFallback('new_item_name', __('Add new category', 'messia'), __('Add new term', 'messia'));
      var parentSelectLabel = labelWithFallback('parent_item', __('Parent Category', 'messia'), __('Parent Term', 'messia'));
      var noParentOption = "\u2014 ".concat(parentSelectLabel, " \u2014");
      var newTermSubmitLabel = newTermButtonLabel;
      var inputId = "editor-post-taxonomies__".concat(klass, "-terms-input-").concat(instanceId); // @helgatheviking

      var filterInputId = "editor-post-taxonomies__".concat(klass, "-terms-filter-").concat(instanceId); // @helgatheviking

      var filterLabel = get(this.props.taxonomy, ['labels', 'search_items'], __('Search Terms', 'messia'));
      var groupLabel = get(this.props.taxonomy, ['name'], __('Terms', 'messia'));
      var showFilter = availableTerms.length >= MIN_TERMS_COUNT_FOR_FILTER;
      return [showFilter && /*#__PURE__*/React.createElement("label", {
        key: "filter-label",
        htmlFor: filterInputId
      }, filterLabel), showFilter && /*#__PURE__*/React.createElement("input", {
        type: "search",
        id: filterInputId,
        value: filterValue,
        onChange: this.setFilterValue,
        className: "editor-post-taxonomies__hierarchical-terms-filter",
        key: "term-filter-input"
      }), /*#__PURE__*/React.createElement("div", {
        className: "editor-post-taxonomies__hierarchical-terms-list",
        key: "term-list",
        tabIndex: "0",
        role: "group",
        "aria-label": groupLabel
      }, this.renderTerms('' !== filterValue ? filteredTermsTree : availableTermsTree)), !loading && hasCreateAction && /*#__PURE__*/React.createElement(Button, {
        key: "term-add-button",
        onClick: this.onToggleForm,
        className: "editor-post-taxonomies__hierarchical-terms-add",
        "aria-expanded": showForm,
        isLink: true
      }, newTermButtonLabel), showForm && /*#__PURE__*/React.createElement("form", {
        onSubmit: this.onAddTerm,
        key: klass + '-terms-form'
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: inputId,
        className: "editor-post-taxonomies__hierarchical-terms-label"
      }, newTermLabel), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: inputId,
        className: "editor-post-taxonomies__hierarchical-terms-input",
        value: formName,
        onChange: this.onChangeFormName,
        required: true
      }), taxonomy.hierarchical && !!availableTerms.length &&
      /*#__PURE__*/
      // @helgatheviking
      React.createElement(TreeSelect, {
        label: parentSelectLabel,
        noOptionLabel: noParentOption,
        onChange: this.onChangeFormParent,
        selectedId: formParent,
        tree: availableTermsTree
      }), /*#__PURE__*/React.createElement(Button, {
        isSecondary: true,
        type: "submit",
        className: "editor-post-taxonomies__hierarchical-terms-submit"
      }, newTermSubmitLabel))];
    }
  }]);

  return RadioTermSelector;
}(Component);

/* harmony default export */ __webpack_exports__["default"] = (compose([withSelect(function (select, _ref) {
  var slug = _ref.slug;

  var _select = select('core/editor'),
      getCurrentPost = _select.getCurrentPost;

  var _select2 = select('core'),
      getTaxonomy = _select2.getTaxonomy;

  var taxonomy = getTaxonomy(slug);
  return {
    hasCreateAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-create-' + taxonomy.rest_base], false) : false,
    hasAssignAction: taxonomy ? get(getCurrentPost(), ['_links', 'wp:action-assign-' + taxonomy.rest_base], false) : false,
    terms: taxonomy ? select('core/editor').getEditedPostAttribute(taxonomy.rest_base) : [],
    taxonomy: taxonomy
  };
}), withDispatch(function (dispatch) {
  return {
    onUpdateTerms: function onUpdateTerms(terms, restBase) {
      dispatch('core/editor').editPost(_defineProperty({}, restBase, terms));
    }
  };
}), withSpokenMessages, withInstanceId //withFilters( 'editor.PostTaxonomyType' ), // Intentionally commented out.
])(RadioTermSelector));

/***/ }),

/***/ "./src/js/_backend/radio-segment.js":
/*!******************************************!*\
  !*** ./src/js/_backend/radio-segment.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_components_radio_term_selector_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/_components/_radio_term_selector.jsx */ "./src/js/_components/_radio_term_selector.jsx");


function CustomizeTaxonomySelector(OriginalComponent) {
	return function (props) {

		if (props.slug === 'messia_object_segment') {

			return wp.element.createElement(
				_js_components_radio_term_selector_jsx__WEBPACK_IMPORTED_MODULE_0__["default"],
				props
			);
		}
		else {
			return wp.element.createElement(
				OriginalComponent,
				props
			);
		}
	}
};

wp.hooks.addFilter(
	'editor.PostTaxonomyType',
	'messia',
	CustomizeTaxonomySelector
);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************************************************!*\
  !*** ./src/entries/backend/libraries/entry-radio-segment.js ***!
  \**************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_backend_radio_segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/_backend/radio-segment.js */ "./src/js/_backend/radio-segment.js");
// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvbGlicmFyaWVzL3JhZGlvLXNlZ21lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxlQUFnQ0EsRUFBRSxDQUFDQyxJQUFuQztBQUFBLElBQVFDLEVBQVIsWUFBUUEsRUFBUjtBQUFBLElBQVlDLEVBQVosWUFBWUEsRUFBWjtBQUFBLElBQWdCQyxFQUFoQixZQUFnQkEsRUFBaEI7QUFBQSxJQUFvQkMsT0FBcEIsWUFBb0JBLE9BQXBCO0FBQ0EsSUFBUUMsU0FBUixHQUFzQk4sRUFBRSxDQUFDTyxPQUF6QixDQUFRRCxTQUFSO0FBQ0EscUJBQWdFTixFQUFFLENBQUNRLFVBQW5FO0FBQUEsSUFBUUMsVUFBUixrQkFBUUEsVUFBUjtBQUFBLElBQW9CQyxrQkFBcEIsa0JBQW9CQSxrQkFBcEI7QUFBQSxJQUF3Q0MsV0FBeEMsa0JBQXdDQSxXQUF4QztBQUFBLElBQXFEQyxNQUFyRCxrQkFBcURBLE1BQXJEO0FBQ0EsZUFBd0RaLEVBQUUsQ0FBQ2EsSUFBM0Q7QUFBQSxJQUFRQyxVQUFSLFlBQVFBLFVBQVI7QUFBQSxJQUFvQkMsWUFBcEIsWUFBb0JBLFlBQXBCO0FBQUEsSUFBa0NDLE1BQWxDLFlBQWtDQSxNQUFsQztBQUFBLElBQTBDQyxTQUExQyxZQUEwQ0EsU0FBMUM7QUFDQSxrQkFBb0NqQixFQUFFLENBQUNrQixPQUF2QztBQUFBLElBQVFDLGNBQVIsZUFBUUEsY0FBUjtBQUFBLElBQXdCRCxPQUF4QixlQUF3QkEsT0FBeEI7QUFDQSxVQUFxQmxCLEVBQXJCO0FBQUEsSUFBUW9CLFFBQVIsT0FBUUEsUUFBUjtBQUNBLElBQVFDLFlBQVIsR0FBeUJyQixFQUFFLENBQUNzQixHQUE1QixDQUFRRCxZQUFSO0FBQ0EsY0FBdURFLE1BQXZEO0FBQUEsSUFBUUMsT0FBUixXQUFRQSxPQUFSO0FBQUEsSUFBaUJDLEdBQWpCLFdBQWlCQSxHQUFqQjtBQUFBLElBQXNCQyxRQUF0QixXQUFzQkEsUUFBdEI7QUFBQSxJQUFnQ0MsSUFBaEMsV0FBZ0NBLElBQWhDO0FBQUEsSUFBc0NDLElBQXRDLFdBQXNDQSxJQUF0QztBQUFBLElBQTRDQyxNQUE1QyxXQUE0Q0EsTUFBNUM7QUFFQSxJQUFNQyxhQUFhLEdBQUc7RUFDckJDLFFBQVEsRUFBRSxDQUFDLENBRFU7RUFFckJDLE9BQU8sRUFBRSxNQUZZO0VBR3JCQyxLQUFLLEVBQUUsS0FIYztFQUlyQkMsT0FBTyxFQUFFO0FBSlksQ0FBdEI7QUFPQSxJQUFNQywwQkFBMEIsR0FBRyxDQUFuQztBQUVBLElBQUlDLGNBQWMsR0FBRyxLQUFyQjs7SUFFTUM7Ozs7O0VBRUwsNkJBQWM7SUFBQTs7SUFBQTs7SUFDYiwyQkFBU0MsU0FBVDtJQUNBLE1BQUtDLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLCtCQUFoQjtJQUNBLE1BQUtDLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjRCxJQUFkLCtCQUFoQjtJQUNBLE1BQUtFLGdCQUFMLEdBQXdCLE1BQUtBLGdCQUFMLENBQXNCRixJQUF0QiwrQkFBeEI7SUFDQSxNQUFLRyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkgsSUFBeEIsK0JBQTFCO0lBQ0EsTUFBS0ksU0FBTCxHQUFpQixNQUFLQSxTQUFMLENBQWVKLElBQWYsK0JBQWpCO0lBQ0EsTUFBS0ssWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCTCxJQUFsQiwrQkFBcEI7SUFDQSxNQUFLTSxjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0JOLElBQXBCLCtCQUF0QjtJQUNBLE1BQUtPLGNBQUwsR0FBc0IsTUFBS0EsY0FBTCxDQUFvQlAsSUFBcEIsK0JBQXRCO0lBQ0EsTUFBS1EsS0FBTCxHQUFhO01BQ1pDLE9BQU8sRUFBRSxJQURHO01BRVpDLGtCQUFrQixFQUFFLEVBRlI7TUFHWkMsY0FBYyxFQUFFLEVBSEo7TUFJWkMsTUFBTSxFQUFFLEtBSkk7TUFLWkMsUUFBUSxFQUFFLEVBTEU7TUFNWkMsVUFBVSxFQUFFLEVBTkE7TUFPWkMsUUFBUSxFQUFFLEtBUEU7TUFRWkMsV0FBVyxFQUFFLEVBUkQ7TUFTWkMsaUJBQWlCLEVBQUUsRUFUUDtNQVVaQyxRQUFRLEVBQUU7SUFWRSxDQUFiOztJQWFBLE1BQUtDLGlCQUFMOztJQUNBLE1BQUtDLFlBQUw7O0lBeEJhO0VBeUJiO0VBRUQ7QUFDRDtBQUNBOzs7OztXQUNDLHdCQUFlO01BQ2Q1RCxFQUFFLENBQUNvQixRQUFILENBQVl5QyxHQUFaLENBQWdCLFVBQVVDLE9BQVYsRUFBbUJDLElBQW5CLEVBQXlCO1FBRXhDLElBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRCxPQUFELENBQWpCO1FBQ0FFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFVBQVVDLFFBQVYsRUFBb0I7VUFFL0IsSUFBSUMsV0FBVyxHQUFHbEQsU0FBUyxDQUFDLFlBQVk7WUFDdkMsSUFBSW1ELE1BQU0sR0FBR3BELE1BQU0sQ0FBQyxhQUFELENBQU4sQ0FBc0JxRCxZQUF0QixFQUFiO1lBQ0EsSUFBSUMsZ0JBQWdCLEdBQUd0RSxFQUFFLENBQUNhLElBQUgsQ0FBUUcsTUFBUixDQUFlLGFBQWYsRUFBOEJzRCxnQkFBOUIsRUFBdkI7O1lBQ0EsSUFBSSxDQUFDRixNQUFELElBQVcsQ0FBQ0UsZ0JBQWhCLEVBQWtDO2NBQ2pDSCxXQUFXOztjQUNYLElBQUkvQixjQUFjLEtBQUssSUFBdkIsRUFBNkI7Z0JBQzVCQSxjQUFjLEdBQUcsS0FBakI7Y0FDQTs7Y0FDRG1DLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUFJQyxLQUFKLENBQVUsc0JBQVYsRUFBa0M7Z0JBQUVDLE9BQU8sRUFBRTtjQUFYLENBQWxDLENBQXZCO1lBQ0E7VUFDRCxDQVYwQixDQUEzQjtRQVlBLENBZEQ7UUFlQSxPQUFPVixNQUFQO01BQ0EsQ0FuQkQ7SUFvQkE7SUFFRDtBQUNEO0FBQ0E7QUFDQTs7OztXQUNDLDZCQUFvQjtNQUVuQixJQUFJVyxTQUFTLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1Qix3REFBdkIsQ0FBaEI7O01BRUEsSUFBSSxTQUFTRCxTQUFULElBQXNCLE1BQU1BLFNBQVMsQ0FBQ0UsTUFBMUMsRUFBa0Q7UUFDakQ7TUFDQTs7TUFFREYsU0FBUyxDQUFDRyxnQkFBVixDQUEyQixlQUEzQixFQUE0QyxLQUFLQyxtQkFBTCxDQUF5QnZDLElBQXpCLENBQThCLElBQTlCLENBQTVDLEVBQWlGLEtBQWpGO01BQ0FtQyxTQUFTLENBQUNHLGdCQUFWLENBQTJCLGtCQUEzQixFQUErQyxLQUFLQyxtQkFBTCxDQUF5QnZDLElBQXpCLENBQThCLElBQTlCLENBQS9DLEVBQW9GLEtBQXBGO01BQ0FtQyxTQUFTLENBQUNHLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLEtBQUtDLG1CQUFMLENBQXlCdkMsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBcEMsRUFBeUUsS0FBekU7TUFDQW1DLFNBQVMsQ0FBQ0csZ0JBQVYsQ0FBMkIsZ0JBQTNCLEVBQTZDLEtBQUtDLG1CQUFMLENBQXlCdkMsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBN0MsRUFBa0YsS0FBbEY7SUFDQTs7O1dBRUQsK0JBQXNCO01BQ3JCSixjQUFjLEdBQUcsSUFBakI7SUFDQTs7O1dBRUQsd0JBQWU0QyxTQUFmLEVBQTBCO01BQ3pCLElBQU1DLDhCQUE4QixHQUFHRCxTQUFTLENBQUNFLEdBQVYsQ0FBYyxVQUFDQyxJQUFELEVBQVU7UUFDOUQ7VUFDQ0MsUUFBUSxFQUFFLEVBRFg7VUFFQ0MsTUFBTSxFQUFFO1FBRlQsR0FHSUYsSUFISjtNQUtBLENBTnNDLENBQXZDO01BUUEsSUFBTUcsYUFBYSxHQUFHOUQsT0FBTyxDQUFDeUQsOEJBQUQsRUFBaUMsUUFBakMsQ0FBN0I7O01BQ0EsSUFBSUssYUFBYSxDQUFDQyxJQUFkLElBQXNCRCxhQUFhLENBQUNDLElBQWQsQ0FBbUJWLE1BQTdDLEVBQXFEO1FBQ3BELE9BQU9JLDhCQUFQO01BQ0E7O01BQ0QsSUFBTU8sZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDQyxLQUFELEVBQVc7UUFDbkMsT0FBT0EsS0FBSyxDQUFDUCxHQUFOLENBQVUsVUFBQ0MsSUFBRCxFQUFVO1VBQzFCLElBQU1DLFFBQVEsR0FBR0UsYUFBYSxDQUFDSCxJQUFJLENBQUNPLEVBQU4sQ0FBOUI7VUFDQSx1Q0FDSVAsSUFESjtZQUVDQyxRQUFRLEVBQUVBLFFBQVEsSUFBSUEsUUFBUSxDQUFDUCxNQUFyQixHQUNUVyxnQkFBZ0IsQ0FBQ0osUUFBRCxDQURQLEdBRVQ7VUFKRjtRQU1BLENBUk0sQ0FBUDtNQVNBLENBVkQ7O01BWUEsT0FBT0ksZ0JBQWdCLENBQUNGLGFBQWEsQ0FBQyxHQUFELENBQWIsSUFBc0IsRUFBdkIsQ0FBdkI7SUFDQTs7O1dBRUQsa0JBQVNLLEtBQVQsRUFBZ0I7TUFBRTtNQUNqQixJQUFNQyxFQUFFLEdBQUcsS0FBS0MsbUJBQUwsRUFBWDs7TUFDQSxJQUFJLENBQUNELEVBQUwsRUFBUztRQUNSO01BQ0E7O01BQ0Qsa0JBQW9DLEtBQUtFLEtBQXpDO01BQUEsSUFBUUMsYUFBUixlQUFRQSxhQUFSO01BQUEsSUFBdUJDLFFBQXZCLGVBQXVCQSxRQUF2QjtNQUNBLElBQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDUCxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsS0FBZCxFQUFxQixFQUFyQixDQUF2QjtNQUNBTCxhQUFhLENBQUMsQ0FBQ0UsTUFBRCxDQUFELEVBQVdELFFBQVEsQ0FBQ0ssU0FBcEIsQ0FBYjtJQUNBO0lBRUQ7QUFDRDtBQUNBO0FBQ0E7Ozs7V0FDQywrQkFBc0I7TUFFckIsSUFBSUMsV0FBVyxHQUFHdEcsRUFBRSxDQUFDYSxJQUFILENBQVFHLE1BQVIsQ0FBZSxhQUFmLEVBQThCdUYsaUJBQTlCLEVBQWxCOztNQUVBLElBQUluRSxjQUFjLElBQUlrRSxXQUF0QixFQUFtQztRQUNsQyxJQUFJVixFQUFFLEdBQUdZLE9BQU8sQ0FBQ3RHLEVBQUUsQ0FBRSxrRkFBRixFQUFzRixRQUF0RixDQUFILENBQWhCOztRQUNBLElBQUksQ0FBQzBGLEVBQUwsRUFBUztVQUNSLE9BQU8sS0FBUDtRQUNBO01BQ0Q7O01BQ0QsT0FBTyxJQUFQO0lBQ0E7OztXQUNELDBCQUFpQkQsS0FBakIsRUFBd0I7TUFDdkIsSUFBTWMsUUFBUSxHQUFHZCxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsS0FBYixDQUFtQk0sSUFBbkIsT0FBOEIsRUFBOUIsR0FBbUMsRUFBbkMsR0FBd0NmLEtBQUssQ0FBQ1EsTUFBTixDQUFhQyxLQUF0RTtNQUNBLEtBQUtPLFFBQUwsQ0FBYztRQUFFdEQsUUFBUSxFQUFFb0Q7TUFBWixDQUFkO0lBQ0E7OztXQUVELDRCQUFtQkcsU0FBbkIsRUFBOEI7TUFDN0IsS0FBS0QsUUFBTCxDQUFjO1FBQUVyRCxVQUFVLEVBQUVzRDtNQUFkLENBQWQ7SUFDQTs7O1dBRUQsd0JBQWU7TUFDZCxLQUFLRCxRQUFMLENBQWMsVUFBQzNELEtBQUQ7UUFBQSxPQUFZO1VBQ3pCTyxRQUFRLEVBQUUsQ0FBQ1AsS0FBSyxDQUFDTztRQURRLENBQVo7TUFBQSxDQUFkO0lBR0E7OztXQUVELGtCQUFTa0MsS0FBVCxFQUFnQkosTUFBaEIsRUFBd0J3QixJQUF4QixFQUE4QjtNQUM3QixPQUFPbEYsSUFBSSxDQUFDOEQsS0FBRCxFQUFRLFVBQUNOLElBQUQsRUFBVTtRQUM1QixPQUFPLENBQUUsQ0FBQ0EsSUFBSSxDQUFDRSxNQUFOLElBQWdCLENBQUNBLE1BQWxCLElBQTZCYSxRQUFRLENBQUNmLElBQUksQ0FBQ0UsTUFBTixDQUFSLEtBQTBCYSxRQUFRLENBQUNiLE1BQUQsQ0FBaEUsS0FDTkYsSUFBSSxDQUFDMEIsSUFBTCxDQUFVQyxXQUFWLE9BQTRCRCxJQUFJLENBQUNDLFdBQUwsRUFEN0I7TUFFQSxDQUhVLENBQVg7SUFJQTs7O1dBRUQsbUJBQVVuQixLQUFWLEVBQWlCO01BQUE7O01BQ2hCQSxLQUFLLENBQUNvQixjQUFOO01BRUEsSUFBTW5CLEVBQUUsR0FBRyxLQUFLQyxtQkFBTCxFQUFYOztNQUNBLElBQUksQ0FBQ0QsRUFBTCxFQUFTO1FBQ1I7TUFDQTs7TUFFRCxtQkFBaUQsS0FBS0UsS0FBdEQ7TUFBQSxJQUFRQyxhQUFSLGdCQUFRQSxhQUFSO01BQUEsSUFBdUJDLFFBQXZCLGdCQUF1QkEsUUFBdkI7TUFBQSxJQUFpQ1AsS0FBakMsZ0JBQWlDQSxLQUFqQztNQUFBLElBQXdDdUIsSUFBeEMsZ0JBQXdDQSxJQUF4QztNQUNBLGtCQUF5RCxLQUFLaEUsS0FBOUQ7TUFBQSxJQUFRSyxRQUFSLGVBQVFBLFFBQVI7TUFBQSxJQUFrQkMsVUFBbEIsZUFBa0JBLFVBQWxCO01BQUEsSUFBOEJGLE1BQTlCLGVBQThCQSxNQUE5QjtNQUFBLElBQXNDRCxjQUF0QyxlQUFzQ0EsY0FBdEM7O01BQ0EsSUFBSUUsUUFBUSxLQUFLLEVBQWIsSUFBbUJELE1BQXZCLEVBQStCO1FBQzlCO01BQ0EsQ0FaZSxDQWNoQjs7O01BQ0EsSUFBTTZELFlBQVksR0FBRyxLQUFLMUUsUUFBTCxDQUFjWSxjQUFkLEVBQThCRyxVQUE5QixFQUEwQ0QsUUFBMUMsQ0FBckI7O01BQ0EsSUFBSTRELFlBQUosRUFBa0I7UUFDakI7UUFDQSxJQUFJLENBQUNyRixJQUFJLENBQUM2RCxLQUFELEVBQVEsVUFBQ04sSUFBRDtVQUFBLE9BQVVBLElBQUksS0FBSzhCLFlBQVksQ0FBQ3ZCLEVBQWhDO1FBQUEsQ0FBUixDQUFULEVBQXNEO1VBQ3JESyxhQUFhLENBQUMsQ0FBQ2tCLFlBQVksQ0FBQ3ZCLEVBQWQsQ0FBRCxFQUFvQk0sUUFBUSxDQUFDSyxTQUE3QixDQUFiLENBRHFELENBQ0M7UUFDdEQ7O1FBQ0QsS0FBS00sUUFBTCxDQUFjO1VBQ2J0RCxRQUFRLEVBQUUsRUFERztVQUViQyxVQUFVLEVBQUU7UUFGQyxDQUFkO1FBSUE7TUFDQTs7TUFFRCxLQUFLcUQsUUFBTCxDQUFjO1FBQ2J2RCxNQUFNLEVBQUU7TUFESyxDQUFkO01BR0EsS0FBSzhELFVBQUwsR0FBa0I5RixRQUFRLENBQUM7UUFDMUIrRixJQUFJLG1CQUFZbkIsUUFBUSxDQUFDSyxTQUFyQixDQURzQjtRQUUxQmUsTUFBTSxFQUFFLE1BRmtCO1FBRzFCdkcsSUFBSSxFQUFFO1VBQ0xnRyxJQUFJLEVBQUV4RCxRQUREO1VBRUxnQyxNQUFNLEVBQUUvQixVQUFVLEdBQUdBLFVBQUgsR0FBZ0IrRDtRQUY3QjtNQUhvQixDQUFELENBQTFCLENBL0JnQixDQXVDaEI7O01BQ0EsSUFBTUMsbUJBQW1CLEdBQUcsS0FBS0osVUFBTCxDQUMxQkssS0FEMEIsQ0FDcEIsVUFBQ0MsS0FBRCxFQUFXO1FBQ2pCLElBQU1DLFNBQVMsR0FBR0QsS0FBSyxDQUFDRSxJQUF4Qjs7UUFDQSxJQUFJRCxTQUFTLEtBQUssYUFBbEIsRUFBaUM7VUFDaEM7VUFDQSxNQUFJLENBQUNQLFVBQUwsR0FBa0I5RixRQUFRLENBQUM7WUFDMUIrRixJQUFJLEVBQUU5RixZQUFZLGtCQUNQMkUsUUFBUSxDQUFDSyxTQURGLG1DQUVadkUsYUFGWTtjQUVHdUQsTUFBTSxFQUFFL0IsVUFBVSxJQUFJLENBRnpCO2NBRTRCcUUsTUFBTSxFQUFFdEU7WUFGcEM7VUFEUSxDQUFELENBQTFCO1VBTUEsT0FBTyxNQUFJLENBQUM2RCxVQUFMLENBQ0xqRCxJQURLLENBQ0EsVUFBQzJELFlBQUQsRUFBa0I7WUFDdkIsT0FBTyxNQUFJLENBQUNyRixRQUFMLENBQWNxRixZQUFkLEVBQTRCdEUsVUFBNUIsRUFBd0NELFFBQXhDLENBQVA7VUFDQSxDQUhLLENBQVA7UUFJQTs7UUFDRCxPQUFPd0UsT0FBTyxDQUFDQyxNQUFSLENBQWVOLEtBQWYsQ0FBUDtNQUNBLENBakIwQixDQUE1QjtNQWtCQUYsbUJBQW1CLENBQ2pCckQsSUFERixDQUNPLFVBQUNrQixJQUFELEVBQVU7UUFDZixJQUFNNEMsT0FBTyxHQUFHLENBQUMsQ0FBQ3BHLElBQUksQ0FBQyxNQUFJLENBQUNxQixLQUFMLENBQVdHLGNBQVosRUFBNEIsVUFBQzZFLGFBQUQ7VUFBQSxPQUFtQkEsYUFBYSxDQUFDdEMsRUFBZCxLQUFxQlAsSUFBSSxDQUFDTyxFQUE3QztRQUFBLENBQTVCLENBQXRCO1FBQ0EsSUFBTXVDLGlCQUFpQixHQUFHRixPQUFPLEdBQUcsTUFBSSxDQUFDL0UsS0FBTCxDQUFXRyxjQUFkLElBQWdDZ0MsSUFBaEMsNEJBQXlDLE1BQUksQ0FBQ25DLEtBQUwsQ0FBV0csY0FBcEQsRUFBakM7UUFDQSxJQUFNK0UsZ0JBQWdCLEdBQUc3SCxPQUFPLENBQy9CRixFQUFFLENBQUMsVUFBRCxFQUFhLE1BQWIsRUFBcUIsUUFBckIsQ0FENkIsRUFFL0JzQixHQUFHLENBQ0YsTUFBSSxDQUFDcUUsS0FBTCxDQUFXRSxRQURULEVBRUYsQ0FBQyxRQUFELEVBQVcsZUFBWCxDQUZFLEVBR0ZnQixJQUFJLEtBQUssVUFBVCxHQUFzQjlHLEVBQUUsQ0FBQyxVQUFELEVBQWEsUUFBYixDQUF4QixHQUFpREEsRUFBRSxDQUFDLE1BQUQsRUFBUyxRQUFULENBSGpELENBRjRCLENBQWhDOztRQVFBLE1BQUksQ0FBQzRGLEtBQUwsQ0FBV3FDLEtBQVgsQ0FBaUJELGdCQUFqQixFQUFtQyxXQUFuQzs7UUFDQSxNQUFJLENBQUNoQixVQUFMLEdBQWtCLElBQWxCOztRQUNBLE1BQUksQ0FBQ1AsUUFBTCxDQUFjO1VBQ2J2RCxNQUFNLEVBQUUsS0FESztVQUViQyxRQUFRLEVBQUUsRUFGRztVQUdiQyxVQUFVLEVBQUUsRUFIQztVQUliSCxjQUFjLEVBQUU4RSxpQkFKSDtVQUtiL0Usa0JBQWtCLEVBQUUsTUFBSSxDQUFDSCxjQUFMLENBQW9CLE1BQUksQ0FBQ3FGLGNBQUwsQ0FBb0JILGlCQUFwQixDQUFwQjtRQUxQLENBQWQ7O1FBT0FsQyxhQUFhLENBQUMsQ0FBQ1osSUFBSSxDQUFDTyxFQUFOLENBQUQsRUFBWU0sUUFBUSxDQUFDSyxTQUFyQixDQUFiLENBcEJlLENBb0IrQjtNQUM5QyxDQXRCRixFQXNCSSxVQUFDZ0MsR0FBRCxFQUFTO1FBQ1gsSUFBSUEsR0FBRyxDQUFDQyxVQUFKLEtBQW1CLE9BQXZCLEVBQWdDO1VBQy9CO1FBQ0E7O1FBQ0QsTUFBSSxDQUFDcEIsVUFBTCxHQUFrQixJQUFsQjs7UUFDQSxNQUFJLENBQUNQLFFBQUwsQ0FBYztVQUNidkQsTUFBTSxFQUFFO1FBREssQ0FBZDtNQUdBLENBOUJGO0lBK0JBOzs7V0FFRCw2QkFBb0I7TUFDbkIsS0FBS21GLFVBQUw7SUFDQTs7O1dBRUQsZ0NBQXVCO01BQ3RCMUcsTUFBTSxDQUFDLEtBQUsyRyxZQUFOLEVBQW9CLENBQUMsT0FBRCxDQUFwQixDQUFOO01BQ0EzRyxNQUFNLENBQUMsS0FBS3FGLFVBQU4sRUFBa0IsQ0FBQyxPQUFELENBQWxCLENBQU47SUFDQTs7O1dBRUQsNEJBQW1CdUIsU0FBbkIsRUFBOEI7TUFDN0IsSUFBSSxLQUFLM0MsS0FBTCxDQUFXRSxRQUFYLEtBQXdCeUMsU0FBUyxDQUFDekMsUUFBdEMsRUFBZ0Q7UUFDL0MsS0FBS3VDLFVBQUw7TUFDQTs7TUFFRCxJQUFJLEtBQUt6QyxLQUFMLENBQVdMLEtBQVgsS0FBcUJnRCxTQUFTLENBQUNoRCxLQUFuQyxFQUEwQztRQUN6QyxLQUFLaUQsZUFBTCxDQUFxQkQsU0FBUyxDQUFDaEQsS0FBVixDQUFnQixDQUFoQixDQUFyQixFQUF5QyxLQUFLSyxLQUFMLENBQVdMLEtBQVgsQ0FBaUIsQ0FBakIsQ0FBekM7TUFDQTtJQUNEOzs7V0FFRCxzQkFBYTtNQUFBOztNQUNaLElBQVFPLFFBQVIsR0FBcUIsS0FBS0YsS0FBMUIsQ0FBUUUsUUFBUjs7TUFDQSxJQUFJLENBQUNBLFFBQUwsRUFBZTtRQUNkO01BQ0E7O01BQ0QsS0FBS3dDLFlBQUwsR0FBb0JwSCxRQUFRLENBQUM7UUFDNUIrRixJQUFJLEVBQUU5RixZQUFZLGtCQUFXMkUsUUFBUSxDQUFDSyxTQUFwQixHQUFpQ3ZFLGFBQWpDO01BRFUsQ0FBRCxDQUE1QjtNQUdBLEtBQUswRyxZQUFMLENBQWtCdkUsSUFBbEIsQ0FDQyxVQUFDd0IsS0FBRCxFQUFXO1FBQUU7UUFDWixJQUFNdkMsa0JBQWtCLEdBQUcsTUFBSSxDQUFDSCxjQUFMLENBQW9CLE1BQUksQ0FBQ3FGLGNBQUwsQ0FBb0IzQyxLQUFwQixDQUFwQixDQUEzQjs7UUFFQSxNQUFJLENBQUMrQyxZQUFMLEdBQW9CLElBQXBCOztRQUNBLE1BQUksQ0FBQzdCLFFBQUwsQ0FBYztVQUNiMUQsT0FBTyxFQUFFLEtBREk7VUFFYkMsa0JBQWtCLEVBQWxCQSxrQkFGYTtVQUdiQyxjQUFjLEVBQUVzQztRQUhILENBQWQ7TUFLQSxDQVZGLEVBV0MsVUFBQzRDLEdBQUQsRUFBUztRQUFFO1FBQ1YsSUFBSUEsR0FBRyxDQUFDQyxVQUFKLEtBQW1CLE9BQXZCLEVBQWdDO1VBQy9CO1FBQ0E7O1FBQ0QsTUFBSSxDQUFDRSxZQUFMLEdBQW9CLElBQXBCOztRQUNBLE1BQUksQ0FBQzdCLFFBQUwsQ0FBYztVQUNiMUQsT0FBTyxFQUFFO1FBREksQ0FBZDtNQUdBLENBbkJGO0lBcUJBOzs7V0FFRCwyQkFBaUQ7TUFBQTs7TUFBQSxJQUFqQzBGLFdBQWlDLHVFQUFuQixDQUFtQjtNQUFBLElBQWhCQyxjQUFnQjtNQUVoRCxLQUFLakMsUUFBTCxDQUFjO1FBQ2JqRCxRQUFRLEVBQUU7TUFERyxDQUFkO01BR0ExRCxFQUFFLENBQUNhLElBQUgsQ0FBUWdJLFFBQVIsQ0FBaUIsYUFBakIsRUFBZ0NDLGNBQWhDLENBQStDLHFCQUEvQztNQUVBLEtBQUtDLGNBQUwsQ0FBb0JKLFdBQXBCLEVBQWlDQyxjQUFqQyxFQUFpRDNFLElBQWpELENBQ0MsVUFBQ0QsTUFBRCxFQUFZO1FBRVgsSUFBSWdGLEtBQUssR0FBR2hGLE1BQU0sQ0FBQ2lGLFdBQVAsQ0FBbUJDLFlBQW5CLENBQWdDLElBQWhDLENBQVo7UUFDQSxJQUFJQyxNQUFNLEdBQUdILEtBQUssQ0FBQ0ksT0FBTixDQUFjLFFBQWQsRUFBd0JwRixNQUFNLENBQUNxRixRQUEvQixDQUFiO1FBQ0EsSUFBSUMsUUFBUSxHQUFHdEosRUFBRSxDQUFDYSxJQUFILENBQVFHLE1BQVIsQ0FBZSxhQUFmLEVBQThCdUksa0JBQTlCLEVBQWY7UUFFQWhGLFFBQVEsQ0FBQ2lGLGNBQVQsQ0FBd0JMLE1BQXhCLEVBQWdDTSxXQUFoQyxDQUE0Q3pGLE1BQU0sQ0FBQ2lGLFdBQW5EO1FBQ0FTLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsbUJBQWpCLENBQXFDTixRQUFyQztRQUNBdEosRUFBRSxDQUFDYSxJQUFILENBQVFnSSxRQUFSLENBQWlCLGFBQWpCLEVBQWdDZ0IsZ0JBQWhDLENBQWlELHFCQUFqRDs7UUFFQSxNQUFJLENBQUNsRCxRQUFMLENBQWM7VUFDYmpELFFBQVEsRUFBRTtRQURHLENBQWQ7O1FBSUEsTUFBSSxDQUFDQyxpQkFBTDs7UUFDQXZCLGNBQWMsR0FBRyxLQUFqQjtRQUVBbUMsUUFBUSxDQUFDaUYsY0FBVCxDQUF3QlIsS0FBeEIsRUFBK0J4RSxhQUEvQixDQUE2QyxJQUFJQyxLQUFKLENBQVUsc0JBQVYsRUFBa0M7VUFBRUMsT0FBTyxFQUFFO1FBQVgsQ0FBbEMsQ0FBN0M7TUFDQSxDQW5CRixFQW9CQyxVQUFDb0QsTUFBRCxFQUFZO1FBQ1g7UUFDQXZELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixrQ0FBa0MrRCxXQUF6RCxFQUFzRW1CLE1BQXRFO1FBQ0E5SixFQUFFLENBQUNhLElBQUgsQ0FBUWdJLFFBQVIsQ0FBaUIsYUFBakIsRUFBZ0NnQixnQkFBaEMsQ0FBaUQscUJBQWpEO1FBQ0F6SCxjQUFjLEdBQUcsS0FBakI7O1FBRUEsTUFBSSxDQUFDdUUsUUFBTCxDQUFjO1VBQ2JqRCxRQUFRLEVBQUU7UUFERyxDQUFkO01BR0EsQ0E3QkY7SUErQkE7Ozs7dUZBRUQ7UUFBQTtRQUFBO1FBQUE7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBcUIyRixRQUFyQiwyREFBZ0MsQ0FBaEM7Z0JBQW1DcEQsTUFBbkM7Z0JBQUE7Z0JBQUEsT0FFYyxJQUFJNEIsT0FBSixDQUFZLFVBQUNrQyxPQUFELEVBQVVqQyxNQUFWLEVBQXFCO2tCQUU3QzFHLFFBQVEsQ0FBQztvQkFDUkUsR0FBRyxFQUFFRCxZQUFZLENBQUNrRCxRQUFRLENBQUN5RixRQUFULENBQWtCQyxJQUFuQixFQUF5QjtzQkFDekMsMEJBQTBCaEUsTUFEZTtzQkFFekMsZ0JBQWdCMUIsUUFBUSxDQUFDSyxhQUFULENBQXVCLGtDQUFrQ3lFLFFBQXpELEVBQW1FekUsYUFBbkUsQ0FBaUYsZUFBakYsRUFBa0d3QjtvQkFGekUsQ0FBekIsQ0FEVDtvQkFLUmdCLE1BQU0sRUFBRSxNQUxBO29CQU1SOEMsS0FBSyxFQUFFO2tCQU5DLENBQUQsQ0FBUixDQU9HakcsSUFQSCxDQU9RLFVBQUFDLFFBQVEsRUFBSTtvQkFDbkIsT0FBT0EsUUFBUSxDQUFDaUcsSUFBVCxFQUFQO2tCQUNBLENBVEQsRUFTR2xHLElBVEgsQ0FTUSxVQUFBbUcsSUFBSSxFQUFJO29CQUNmLElBQUlDLEVBQUUsR0FBRzlGLFFBQVEsQ0FBQytGLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVDtvQkFDQUQsRUFBRSxDQUFDRSxTQUFILEdBQWVILElBQWY7b0JBQ0EsSUFBSUksT0FBTyxHQUFHSCxFQUFFLENBQUN6RixhQUFILENBQWlCLGtDQUFrQ3FCLE1BQW5ELENBQWQ7b0JBQ0FvRSxFQUFFLENBQUNQLE1BQUg7O29CQUVBLElBQUlVLE9BQU8sS0FBSyxJQUFoQixFQUFzQjtzQkFDckIxQyxNQUFNO29CQUNOOztvQkFFRGlDLE9BQU8sQ0FBQztzQkFDUFYsUUFBUSxFQUFFQSxRQURIO3NCQUVQSixXQUFXLEVBQUV1QjtvQkFGTixDQUFELENBQVA7a0JBS0EsQ0F4QkQsRUF3QkdqRCxLQXhCSCxDQXdCUyxVQUFDa0QsQ0FBRCxFQUFPO29CQUNmekssRUFBRSxDQUFDYSxJQUFILENBQVFnSSxRQUFSLENBQWlCLGNBQWpCLEVBQWlDNkIsWUFBakMsQ0FDQyxPQURELEVBQ1U7b0JBQ1R4SyxFQUFFLENBQUMsMkNBQUQsRUFBOEMsUUFBOUMsQ0FGSCxFQUU0RDtvQkFDM0Q7c0JBQ0N5SyxhQUFhLEVBQUU7b0JBRGhCLENBSEQ7a0JBT0EsQ0FoQ0Q7Z0JBaUNBLENBbkNZLENBRmQ7O2NBQUE7Z0JBQUE7O2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBOzs7Ozs7Ozs7O1dBd0NBLHdCQUFlQyxTQUFmLEVBQTBCO01BQ3pCLElBQVFuRixLQUFSLEdBQWtCLEtBQUtLLEtBQXZCLENBQVFMLEtBQVI7O01BQ0EsSUFBTW9GLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsUUFBRCxFQUFjO1FBQ3RDLElBQUlyRixLQUFLLENBQUNzRixPQUFOLENBQWNELFFBQVEsQ0FBQ3BGLEVBQXZCLE1BQStCLENBQUMsQ0FBcEMsRUFBdUM7VUFDdEMsT0FBTyxJQUFQO1FBQ0E7O1FBQ0QsSUFBSTJCLFNBQVMsS0FBS3lELFFBQVEsQ0FBQzFGLFFBQTNCLEVBQXFDO1VBQ3BDLE9BQU8sS0FBUDtRQUNBOztRQUNELElBQU00RixrQkFBa0IsR0FBR0YsUUFBUSxDQUFDMUYsUUFBVCxDQUFrQkYsR0FBbEIsQ0FBc0IyRixnQkFBdEIsRUFBd0NJLE1BQXhDLENBQStDLFVBQUNDLEtBQUQ7VUFBQSxPQUFXQSxLQUFYO1FBQUEsQ0FBL0MsRUFBaUVyRyxNQUFqRSxHQUEwRSxDQUFyRzs7UUFDQSxJQUFJbUcsa0JBQUosRUFBd0I7VUFDdkIsT0FBTyxJQUFQO1FBQ0E7O1FBQ0QsT0FBTyxLQUFQO01BQ0EsQ0FaRDs7TUFhQSxJQUFNRyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtRQUMvQyxJQUFNQyxhQUFhLEdBQUdULGdCQUFnQixDQUFDTyxLQUFELENBQXRDO1FBQ0EsSUFBTUcsYUFBYSxHQUFHVixnQkFBZ0IsQ0FBQ1EsS0FBRCxDQUF0Qzs7UUFFQSxJQUFJQyxhQUFhLEtBQUtDLGFBQXRCLEVBQXFDO1VBQ3BDLE9BQU8sQ0FBUDtRQUNBOztRQUVELElBQUlELGFBQWEsSUFBSSxDQUFDQyxhQUF0QixFQUFxQztVQUNwQyxPQUFPLENBQUMsQ0FBUjtRQUNBOztRQUVELElBQUksQ0FBQ0QsYUFBRCxJQUFrQkMsYUFBdEIsRUFBcUM7VUFDcEMsT0FBTyxDQUFQO1FBQ0E7O1FBRUQsT0FBTyxDQUFQO01BQ0EsQ0FqQkQ7O01Ba0JBWCxTQUFTLENBQUNZLElBQVYsQ0FBZUwscUJBQWY7TUFDQSxPQUFPUCxTQUFQO0lBQ0E7OztXQUVELHdCQUFlakYsS0FBZixFQUFzQjtNQUNyQixJQUFRekMsa0JBQVIsR0FBK0IsS0FBS0YsS0FBcEMsQ0FBUUUsa0JBQVI7TUFDQSxJQUFNTSxXQUFXLEdBQUdtQyxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsS0FBakM7TUFDQSxJQUFNM0MsaUJBQWlCLEdBQUdQLGtCQUFrQixDQUFDZ0MsR0FBbkIsQ0FBdUIsS0FBS3VHLGdCQUFMLENBQXNCakksV0FBdEIsQ0FBdkIsRUFBMkR5SCxNQUEzRCxDQUFrRSxVQUFDOUYsSUFBRDtRQUFBLE9BQVVBLElBQVY7TUFBQSxDQUFsRSxDQUExQjs7TUFDQSxJQUFNdUcsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDakcsS0FBRCxFQUFXO1FBQ2pDLElBQUlrRyxLQUFLLEdBQUcsQ0FBWjs7UUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduRyxLQUFLLENBQUNaLE1BQTFCLEVBQWtDK0csQ0FBQyxFQUFuQyxFQUF1QztVQUN0Q0QsS0FBSzs7VUFDTCxJQUFJdEUsU0FBUyxLQUFLNUIsS0FBSyxDQUFDbUcsQ0FBRCxDQUFMLENBQVN4RyxRQUEzQixFQUFxQztZQUNwQ3VHLEtBQUssSUFBSUQsY0FBYyxDQUFDakcsS0FBSyxDQUFDbUcsQ0FBRCxDQUFMLENBQVN4RyxRQUFWLENBQXZCO1VBQ0E7UUFDRDs7UUFDRCxPQUFPdUcsS0FBUDtNQUNBLENBVEQ7O01BVUEsS0FBS2hGLFFBQUwsQ0FDQztRQUNDbkQsV0FBVyxFQUFYQSxXQUREO1FBRUNDLGlCQUFpQixFQUFqQkE7TUFGRCxDQUREO01BT0EsSUFBTW9JLFdBQVcsR0FBR0gsY0FBYyxDQUFDakksaUJBQUQsQ0FBbEM7TUFDQSxJQUFNcUksbUJBQW1CLEdBQUd6TCxPQUFPLENBQ2xDRCxFQUFFLENBQUMsa0JBQUQsRUFBcUIsbUJBQXJCLEVBQTBDeUwsV0FBMUMsRUFBdUQsUUFBdkQsQ0FEZ0MsRUFFbENBLFdBRmtDLENBQW5DO01BSUEsS0FBSy9GLEtBQUwsQ0FBV2lHLGNBQVgsQ0FBMEJELG1CQUExQixFQUErQyxXQUEvQztJQUNBOzs7V0FFRCwwQkFBaUJ0SSxXQUFqQixFQUE4QjtNQUM3QixJQUFNd0ksbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDQyxZQUFELEVBQWtCO1FBQzdDLElBQUksT0FBT3pJLFdBQVgsRUFBd0I7VUFDdkIsT0FBT3lJLFlBQVA7UUFDQSxDQUg0QyxDQUs3QztRQUNBOzs7UUFDQSxJQUFNOUcsSUFBSSxxQkFBUThHLFlBQVIsQ0FBVixDQVA2QyxDQVM3QztRQUNBOzs7UUFDQSxJQUFJOUcsSUFBSSxDQUFDQyxRQUFMLENBQWNQLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7VUFDN0JNLElBQUksQ0FBQ0MsUUFBTCxHQUFnQkQsSUFBSSxDQUFDQyxRQUFMLENBQWNGLEdBQWQsQ0FBa0I4RyxtQkFBbEIsRUFBdUNmLE1BQXZDLENBQThDLFVBQUNDLEtBQUQ7WUFBQSxPQUFXQSxLQUFYO1VBQUEsQ0FBOUMsQ0FBaEI7UUFDQSxDQWI0QyxDQWU3QztRQUNBOzs7UUFDQSxJQUFJLENBQUMsQ0FBRCxLQUFPL0YsSUFBSSxDQUFDMEIsSUFBTCxDQUFVQyxXQUFWLEdBQXdCaUUsT0FBeEIsQ0FBZ0N2SCxXQUFXLENBQUNzRCxXQUFaLEVBQWhDLENBQVAsSUFBcUUzQixJQUFJLENBQUNDLFFBQUwsQ0FBY1AsTUFBZCxHQUF1QixDQUFoRyxFQUFtRztVQUNsRyxPQUFPTSxJQUFQO1FBQ0EsQ0FuQjRDLENBcUI3QztRQUNBOzs7UUFDQSxPQUFPLEtBQVA7TUFDQSxDQXhCRDs7TUF5QkEsT0FBTzZHLG1CQUFQO0lBQ0E7OztXQUVELHFCQUFZRSxhQUFaLEVBQTJCO01BQUE7O01BQzFCLG1CQUFpQyxLQUFLcEcsS0FBdEM7TUFBQSxzQ0FBUUwsS0FBUjtNQUFBLElBQVFBLEtBQVIsbUNBQWdCLEVBQWhCO01BQUEsSUFBb0JPLFFBQXBCLGdCQUFvQkEsUUFBcEIsQ0FEMEIsQ0FDbUI7O01BQzdDLElBQU1tRyxLQUFLLEdBQUduRyxRQUFRLENBQUNvRyxZQUFULEdBQXdCLGNBQXhCLEdBQXlDLGtCQUF2RCxDQUYwQixDQUVpRDs7TUFFM0UsT0FBT0YsYUFBYSxDQUFDaEgsR0FBZCxDQUFrQixVQUFDQyxJQUFELEVBQVU7UUFDbEMsSUFBTU8sRUFBRSxvQ0FBNkJ5RyxLQUE3QixtQkFBMkNoSCxJQUFJLENBQUNPLEVBQWhELENBQVIsQ0FEa0MsQ0FDNEI7O1FBQzlELG9CQUNDO1VBQUssR0FBRyxFQUFFUCxJQUFJLENBQUNPLEVBQWY7VUFBbUIsU0FBUyxFQUFFLDZCQUE2QnlHLEtBQTdCLEdBQXFDO1FBQW5FLGdCQUNDO1VBQ0MsRUFBRSxFQUFFekcsRUFETDtVQUVDLFNBQVMsRUFBRSw2QkFBNkJ5RyxLQUE3QixHQUFxQyxlQUZqRDtVQUdDLElBQUksRUFBQyxPQUhOLENBR2M7VUFIZDtVQUlDLE9BQU8sRUFBRTFHLEtBQUssQ0FBQ3NGLE9BQU4sQ0FBYzVGLElBQUksQ0FBQ08sRUFBbkIsTUFBMkIsQ0FBQyxDQUp0QztVQUtDLEtBQUssRUFBRVAsSUFBSSxDQUFDTyxFQUxiO1VBTUMsUUFBUSxFQUFFLE1BQUksQ0FBQ2pELFFBTmhCO1VBT0MsSUFBSSxFQUFFLHFCQUFxQixNQUFJLENBQUNxRCxLQUFMLENBQVdrQixJQVB2QyxDQU82QztVQVA3QztVQVFDLFFBQVEsRUFBRSxNQUFJLENBQUNoRSxLQUFMLENBQVdVLFFBUnRCLENBUWdDOztRQVJoQyxFQURELGVBV0M7VUFBTyxPQUFPLEVBQUVnQztRQUFoQixHQUFxQmhFLFFBQVEsQ0FBQ3lELElBQUksQ0FBQzBCLElBQU4sQ0FBN0IsQ0FYRCxFQVlFLENBQUMsQ0FBQzFCLElBQUksQ0FBQ0MsUUFBTCxDQUFjUCxNQUFoQixpQkFDQTtVQUFLLFNBQVMsRUFBRSw2QkFBNkJzSCxLQUE3QixHQUFxQztRQUFyRCxHQUNFLE1BQUksQ0FBQ0UsV0FBTCxDQUFpQmxILElBQUksQ0FBQ0MsUUFBdEIsQ0FERixDQWJGLENBREQ7TUFvQkEsQ0F0Qk0sQ0FBUDtJQXVCQTs7O1dBRUQsa0JBQVM7TUFDUixtQkFBeUUsS0FBS1UsS0FBOUU7TUFBQSxJQUFRa0IsSUFBUixnQkFBUUEsSUFBUjtNQUFBLElBQWNoQixRQUFkLGdCQUFjQSxRQUFkO01BQUEsSUFBd0JzRyxVQUF4QixnQkFBd0JBLFVBQXhCO01BQUEsSUFBb0NDLGVBQXBDLGdCQUFvQ0EsZUFBcEM7TUFBQSxJQUFxREMsZUFBckQsZ0JBQXFEQSxlQUFyRDtNQUNBLElBQU1MLEtBQUssR0FBR25HLFFBQVEsQ0FBQ29HLFlBQVQsR0FBd0IsY0FBeEIsR0FBeUMsa0JBQXZELENBRlEsQ0FFbUU7O01BRTNFLElBQUksQ0FBQ0ksZUFBTCxFQUFzQjtRQUNyQixPQUFPLElBQVA7TUFDQTs7TUFFRCxtQkFBd0gsS0FBS3hKLEtBQTdIO01BQUEsSUFBUUUsa0JBQVIsZ0JBQVFBLGtCQUFSO01BQUEsSUFBNEJDLGNBQTVCLGdCQUE0QkEsY0FBNUI7TUFBQSxJQUE0Q00saUJBQTVDLGdCQUE0Q0EsaUJBQTVDO01BQUEsSUFBK0RKLFFBQS9ELGdCQUErREEsUUFBL0Q7TUFBQSxJQUF5RUMsVUFBekUsZ0JBQXlFQSxVQUF6RTtNQUFBLElBQXFGTCxPQUFyRixnQkFBcUZBLE9BQXJGO01BQUEsSUFBOEZNLFFBQTlGLGdCQUE4RkEsUUFBOUY7TUFBQSxJQUF3R0MsV0FBeEcsZ0JBQXdHQSxXQUF4Rzs7TUFDQSxJQUFNaUosaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxhQUFELEVBQWdCQyxrQkFBaEIsRUFBb0NDLHFCQUFwQztRQUFBLE9BQThEbkwsR0FBRyxDQUMxRnVFLFFBRDBGLEVBRTFGLENBQUMsUUFBRCxFQUFXMEcsYUFBWCxDQUYwRixFQUcxRjFGLElBQUksS0FBSyxVQUFULEdBQXNCMkYsa0JBQXRCLEdBQTJDQyxxQkFIK0MsQ0FBakU7TUFBQSxDQUExQjs7TUFLQSxJQUFNQyxrQkFBa0IsR0FBR0osaUJBQWlCLENBQzNDLGNBRDJDLEVBRTNDdk0sRUFBRSxDQUFDLGtCQUFELEVBQXFCLFFBQXJCLENBRnlDLEVBRzNDQSxFQUFFLENBQUMsY0FBRCxFQUFpQixRQUFqQixDQUh5QyxDQUE1QztNQUtBLElBQU00TSxZQUFZLEdBQUdMLGlCQUFpQixDQUNyQyxlQURxQyxFQUVyQ3ZNLEVBQUUsQ0FBQyxrQkFBRCxFQUFxQixRQUFyQixDQUZtQyxFQUdyQ0EsRUFBRSxDQUFDLGNBQUQsRUFBaUIsUUFBakIsQ0FIbUMsQ0FBdEM7TUFLQSxJQUFNNk0saUJBQWlCLEdBQUdOLGlCQUFpQixDQUMxQyxhQUQwQyxFQUUxQ3ZNLEVBQUUsQ0FBQyxpQkFBRCxFQUFvQixRQUFwQixDQUZ3QyxFQUcxQ0EsRUFBRSxDQUFDLGFBQUQsRUFBZ0IsUUFBaEIsQ0FId0MsQ0FBM0M7TUFLQSxJQUFNOE0sY0FBYyxvQkFBUUQsaUJBQVIsWUFBcEI7TUFDQSxJQUFNRSxrQkFBa0IsR0FBR0osa0JBQTNCO01BQ0EsSUFBTUssT0FBTyxxQ0FBOEJmLEtBQTlCLDBCQUFtREcsVUFBbkQsQ0FBYixDQS9CUSxDQStCc0U7O01BQzlFLElBQU1hLGFBQWEscUNBQThCaEIsS0FBOUIsMkJBQW9ERyxVQUFwRCxDQUFuQixDQWhDUSxDQWdDNkU7O01BQ3JGLElBQU1jLFdBQVcsR0FBRzNMLEdBQUcsQ0FDdEIsS0FBS3FFLEtBQUwsQ0FBV0UsUUFEVyxFQUV0QixDQUFDLFFBQUQsRUFBVyxjQUFYLENBRnNCLEVBR3RCOUYsRUFBRSxDQUFDLGNBQUQsRUFBaUIsUUFBakIsQ0FIb0IsQ0FBdkI7TUFLQSxJQUFNbU4sVUFBVSxHQUFHNUwsR0FBRyxDQUNyQixLQUFLcUUsS0FBTCxDQUFXRSxRQURVLEVBRXJCLENBQUMsTUFBRCxDQUZxQixFQUdyQjlGLEVBQUUsQ0FBQyxPQUFELEVBQVUsUUFBVixDQUhtQixDQUF0QjtNQUtBLElBQU1vTixVQUFVLEdBQUduSyxjQUFjLENBQUMwQixNQUFmLElBQXlCMUMsMEJBQTVDO01BRUEsT0FBTyxDQUNObUwsVUFBVSxpQkFBSTtRQUNiLEdBQUcsRUFBQyxjQURTO1FBRWIsT0FBTyxFQUFFSDtNQUZJLEdBR1pDLFdBSFksQ0FEUixFQU1ORSxVQUFVLGlCQUFJO1FBQ2IsSUFBSSxFQUFDLFFBRFE7UUFFYixFQUFFLEVBQUVILGFBRlM7UUFHYixLQUFLLEVBQUUzSixXQUhNO1FBSWIsUUFBUSxFQUFFLEtBQUtWLGNBSkY7UUFLYixTQUFTLEVBQUMsbURBTEc7UUFNYixHQUFHLEVBQUM7TUFOUyxFQU5SLGVBY047UUFDQyxTQUFTLEVBQUMsaURBRFg7UUFFQyxHQUFHLEVBQUMsV0FGTDtRQUdDLFFBQVEsRUFBQyxHQUhWO1FBSUMsSUFBSSxFQUFDLE9BSk47UUFLQyxjQUFZdUs7TUFMYixHQU9FLEtBQUtoQixXQUFMLENBQWlCLE9BQU83SSxXQUFQLEdBQXFCQyxpQkFBckIsR0FBeUNQLGtCQUExRCxDQVBGLENBZE0sRUF1Qk4sQ0FBQ0QsT0FBRCxJQUFZc0osZUFBWixpQkFDQyxvQkFBQyxNQUFEO1FBQ0MsR0FBRyxFQUFDLGlCQURMO1FBRUMsT0FBTyxFQUFFLEtBQUsxSixZQUZmO1FBR0MsU0FBUyxFQUFDLGdEQUhYO1FBSUMsaUJBQWVVLFFBSmhCO1FBS0MsTUFBTTtNQUxQLEdBT0VzSixrQkFQRixDQXhCSyxFQWtDTnRKLFFBQVEsaUJBQ1A7UUFBTSxRQUFRLEVBQUUsS0FBS1gsU0FBckI7UUFBZ0MsR0FBRyxFQUFFdUosS0FBSyxHQUFHO01BQTdDLGdCQUNDO1FBQ0MsT0FBTyxFQUFFZSxPQURWO1FBRUMsU0FBUyxFQUFDO01BRlgsR0FJRUosWUFKRixDQURELGVBT0M7UUFDQyxJQUFJLEVBQUMsTUFETjtRQUVDLEVBQUUsRUFBRUksT0FGTDtRQUdDLFNBQVMsRUFBQyxrREFIWDtRQUlDLEtBQUssRUFBRTdKLFFBSlI7UUFLQyxRQUFRLEVBQUUsS0FBS1gsZ0JBTGhCO1FBTUMsUUFBUTtNQU5ULEVBUEQsRUFlRXNELFFBQVEsQ0FBQ29HLFlBQVQsSUFBeUIsQ0FBQyxDQUFDakosY0FBYyxDQUFDMEIsTUFBMUM7TUFBQTtNQUFvRDtNQUNwRCxvQkFBQyxVQUFEO1FBQ0MsS0FBSyxFQUFFa0ksaUJBRFI7UUFFQyxhQUFhLEVBQUVDLGNBRmhCO1FBR0MsUUFBUSxFQUFFLEtBQUtySyxrQkFIaEI7UUFJQyxVQUFVLEVBQUVXLFVBSmI7UUFLQyxJQUFJLEVBQUVKO01BTFAsRUFoQkYsZUF3QkMsb0JBQUMsTUFBRDtRQUNDLFdBQVcsTUFEWjtRQUVDLElBQUksRUFBQyxRQUZOO1FBR0MsU0FBUyxFQUFDO01BSFgsR0FLRStKLGtCQUxGLENBeEJELENBbkNLLENBQVA7SUFxRUE7Ozs7RUFwbUI4QjNNOztBQXVtQmhDLCtEQUFlWSxPQUFPLENBQUMsQ0FDdEJKLFVBQVUsQ0FBQyxVQUFDRSxNQUFELFFBQXNCO0VBQUEsSUFBWGdHLElBQVcsUUFBWEEsSUFBVzs7RUFDaEMsY0FBMkJoRyxNQUFNLENBQUMsYUFBRCxDQUFqQztFQUFBLElBQVF1TSxjQUFSLFdBQVFBLGNBQVI7O0VBQ0EsZUFBd0J2TSxNQUFNLENBQUMsTUFBRCxDQUE5QjtFQUFBLElBQVF3TSxXQUFSLFlBQVFBLFdBQVI7O0VBQ0EsSUFBTXhILFFBQVEsR0FBR3dILFdBQVcsQ0FBQ3hHLElBQUQsQ0FBNUI7RUFDQSxPQUFPO0lBQ051RixlQUFlLEVBQUV2RyxRQUFRLEdBQUd2RSxHQUFHLENBQUM4TCxjQUFjLEVBQWYsRUFBbUIsQ0FBQyxRQUFELEVBQVcsc0JBQXNCdkgsUUFBUSxDQUFDSyxTQUExQyxDQUFuQixFQUF5RSxLQUF6RSxDQUFOLEdBQXdGLEtBRDNHO0lBRU5tRyxlQUFlLEVBQUV4RyxRQUFRLEdBQUd2RSxHQUFHLENBQUM4TCxjQUFjLEVBQWYsRUFBbUIsQ0FBQyxRQUFELEVBQVcsc0JBQXNCdkgsUUFBUSxDQUFDSyxTQUExQyxDQUFuQixFQUF5RSxLQUF6RSxDQUFOLEdBQXdGLEtBRjNHO0lBR05aLEtBQUssRUFBRU8sUUFBUSxHQUFHaEYsTUFBTSxDQUFDLGFBQUQsQ0FBTixDQUFzQnlNLHNCQUF0QixDQUE2Q3pILFFBQVEsQ0FBQ0ssU0FBdEQsQ0FBSCxHQUFzRSxFQUgvRTtJQUlOTCxRQUFRLEVBQVJBO0VBSk0sQ0FBUDtBQU1BLENBVlMsQ0FEWSxFQVl0QmpGLFlBQVksQ0FBQyxVQUFDOEgsUUFBRDtFQUFBLE9BQWU7SUFDM0I5QyxhQUQyQix5QkFDYk4sS0FEYSxFQUNOaUksUUFETSxFQUNJO01BQzlCN0UsUUFBUSxDQUFDLGFBQUQsQ0FBUixDQUF3QjhFLFFBQXhCLHFCQUFvQ0QsUUFBcEMsRUFBK0NqSSxLQUEvQztJQUNBO0VBSDBCLENBQWY7QUFBQSxDQUFELENBWlUsRUFpQnRCL0Usa0JBakJzQixFQWtCdEJTLGNBbEJzQixDQW1CdEI7QUFuQnNCLENBQUQsQ0FBUCxDQW9CWmtCLGlCQXBCWSxDQUFmOzs7Ozs7Ozs7Ozs7QUMzbkI4RTs7QUFFOUU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksOEVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2NvbXBvbmVudHMvX3JhZGlvX3Rlcm1fc2VsZWN0b3IuanN4Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fYmFja2VuZC9yYWRpby1zZWdtZW50LmpzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9iYWNrZW5kL2xpYnJhcmllcy9lbnRyeS1yYWRpby1zZWdtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgX18sIF94LCBfbiwgc3ByaW50ZiB9ID0gd3AuaTE4bjtcbmNvbnN0IHsgQ29tcG9uZW50IH0gPSB3cC5lbGVtZW50O1xuY29uc3QgeyBUcmVlU2VsZWN0LCB3aXRoU3Bva2VuTWVzc2FnZXMsIHdpdGhGaWx0ZXJzLCBCdXR0b24gfSA9IHdwLmNvbXBvbmVudHM7XG5jb25zdCB7IHdpdGhTZWxlY3QsIHdpdGhEaXNwYXRjaCwgc2VsZWN0LCBzdWJzY3JpYmUgfSA9IHdwLmRhdGE7XG5jb25zdCB7IHdpdGhJbnN0YW5jZUlkLCBjb21wb3NlIH0gPSB3cC5jb21wb3NlO1xuY29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5jb25zdCB7IGFkZFF1ZXJ5QXJncyB9ID0gd3AudXJsO1xuY29uc3QgeyBncm91cEJ5LCBnZXQsIHVuZXNjYXBlLCBmaW5kLCBzb21lLCBpbnZva2UgfSA9IGxvZGFzaDtcblxuY29uc3QgREVGQVVMVF9RVUVSWSA9IHtcblx0cGVyX3BhZ2U6IC0xLFxuXHRvcmRlcmJ5OiAnbmFtZScsXG5cdG9yZGVyOiAnYXNjJyxcblx0X2ZpZWxkczogJ2lkLG5hbWUscGFyZW50Jyxcbn07XG5cbmNvbnN0IE1JTl9URVJNU19DT1VOVF9GT1JfRklMVEVSID0gODtcblxubGV0IG1ldGFib3hDaGFuZ2VkID0gZmFsc2U7XG5cbmNsYXNzIFJhZGlvVGVybVNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpO1xuXHRcdHRoaXMuZmluZFRlcm0gPSB0aGlzLmZpbmRUZXJtLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlRm9ybU5hbWUgPSB0aGlzLm9uQ2hhbmdlRm9ybU5hbWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlRm9ybVBhcmVudCA9IHRoaXMub25DaGFuZ2VGb3JtUGFyZW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkFkZFRlcm0gPSB0aGlzLm9uQWRkVGVybS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25Ub2dnbGVGb3JtID0gdGhpcy5vblRvZ2dsZUZvcm0uYmluZCh0aGlzKTtcblx0XHR0aGlzLnNldEZpbHRlclZhbHVlID0gdGhpcy5zZXRGaWx0ZXJWYWx1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc29ydEJ5U2VsZWN0ZWQgPSB0aGlzLnNvcnRCeVNlbGVjdGVkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGxvYWRpbmc6IHRydWUsXG5cdFx0XHRhdmFpbGFibGVUZXJtc1RyZWU6IFtdLFxuXHRcdFx0YXZhaWxhYmxlVGVybXM6IFtdLFxuXHRcdFx0YWRkaW5nOiBmYWxzZSxcblx0XHRcdGZvcm1OYW1lOiAnJyxcblx0XHRcdGZvcm1QYXJlbnQ6ICcnLFxuXHRcdFx0c2hvd0Zvcm06IGZhbHNlLFxuXHRcdFx0ZmlsdGVyVmFsdWU6ICcnLFxuXHRcdFx0ZmlsdGVyZWRUZXJtc1RyZWU6IFtdLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdH07XG5cblx0XHR0aGlzLm9uQ2hhbmdlTWV0YWJveGVzKCk7XG5cdFx0dGhpcy5vblNhdmluZ1Bvc3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcmFjayBzYXZpbmcgcG9zdCBldmVudFxuXHQgKi9cblx0b25TYXZpbmdQb3N0KCkge1xuXHRcdHdwLmFwaUZldGNoLnVzZShmdW5jdGlvbiAob3B0aW9ucywgbmV4dCkge1xuXG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV4dChvcHRpb25zKTtcblx0XHRcdHJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cdFx0XHRcdHZhciB1blN1YnNjcmliZSA9IHN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHNhdmluZyA9IHNlbGVjdCgnY29yZS9lZGl0b3InKS5pc1NhdmluZ1Bvc3QoKTtcblx0XHRcdFx0XHR2YXIgaXNBdXRvc2F2aW5nUG9zdCA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2VkaXRvcicpLmlzQXV0b3NhdmluZ1Bvc3QoKTtcblx0XHRcdFx0XHRpZiAoIXNhdmluZyAmJiAhaXNBdXRvc2F2aW5nUG9zdCkge1xuXHRcdFx0XHRcdFx0dW5TdWJzY3JpYmUoKTtcblx0XHRcdFx0XHRcdGlmIChtZXRhYm94Q2hhbmdlZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRtZXRhYm94Q2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ21lc3NpYUNvbnRlbnRJc1NhdmVkJywgeyBidWJibGVzOiBmYWxzZSB9KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBldmVudHMgdG8gc3dpdGNoIG1ldGFib3hDaGFuZ2VkIGZsYWcgdG8gdHJ1ZVxuXHQgKiBvbmNlIHNvbWUgZWxlbWVudGRhdGEgaW5zaWRlIG1ldGFib3ggZ290IG5ldyBjb250ZW50XG5cdCAqL1xuXHRvbkNoYW5nZU1ldGFib3hlcygpIHtcblxuXHRcdGxldCBtZXRhYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdGJveC1jb250YWluZXIgW2lkXj1cInNlZ21lbnQtY29uc3RydWN0b3ItdGVybS1pZFwiXScpO1xuXG5cdFx0aWYgKG51bGwgPT09IG1ldGFib3hlcyB8fCAwID09PSBtZXRhYm94ZXMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bWV0YWJveGVzLmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdDJDaGFuZ2UnLCB0aGlzLmhhbmRsZU1ldGFib3hDaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdG1ldGFib3hlcy5hZGRFdmVudExpc3RlbmVyKCdjb2RlTWlycm9yQ2hhbmdlJywgdGhpcy5oYW5kbGVNZXRhYm94Q2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRtZXRhYm94ZXMuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmhhbmRsZU1ldGFib3hDaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdG1ldGFib3hlcy5hZGRFdmVudExpc3RlbmVyKCdzb3J0YWJsZUNoYW5nZScsIHRoaXMuaGFuZGxlTWV0YWJveENoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdH1cblxuXHRoYW5kbGVNZXRhYm94Q2hhbmdlKCkge1xuXHRcdG1ldGFib3hDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdGJ1aWxkVGVybXNUcmVlKGZsYXRUZXJtcykge1xuXHRcdGNvbnN0IGZsYXRUZXJtc1dpdGhQYXJlbnRBbmRDaGlsZHJlbiA9IGZsYXRUZXJtcy5tYXAoKHRlcm0pID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHRcdFx0cGFyZW50OiBudWxsLFxuXHRcdFx0XHQuLi50ZXJtLFxuXHRcdFx0fTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHRlcm1zQnlQYXJlbnQgPSBncm91cEJ5KGZsYXRUZXJtc1dpdGhQYXJlbnRBbmRDaGlsZHJlbiwgJ3BhcmVudCcpO1xuXHRcdGlmICh0ZXJtc0J5UGFyZW50Lm51bGwgJiYgdGVybXNCeVBhcmVudC5udWxsLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZsYXRUZXJtc1dpdGhQYXJlbnRBbmRDaGlsZHJlbjtcblx0XHR9XG5cdFx0Y29uc3QgZmlsbFdpdGhDaGlsZHJlbiA9ICh0ZXJtcykgPT4ge1xuXHRcdFx0cmV0dXJuIHRlcm1zLm1hcCgodGVybSkgPT4ge1xuXHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IHRlcm1zQnlQYXJlbnRbdGVybS5pZF07XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Li4udGVybSxcblx0XHRcdFx0XHRjaGlsZHJlbjogY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID9cblx0XHRcdFx0XHRcdGZpbGxXaXRoQ2hpbGRyZW4oY2hpbGRyZW4pIDpcblx0XHRcdFx0XHRcdFtdLFxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBmaWxsV2l0aENoaWxkcmVuKHRlcm1zQnlQYXJlbnRbJzAnXSB8fCBbXSk7XG5cdH1cblxuXHRvbkNoYW5nZShldmVudCkgeyAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRjb25zdCBnbyA9IHRoaXMuc2hvdWxkQ2hhbmdlU2VnbWVudCgpO1xuXHRcdGlmICghZ28pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgeyBvblVwZGF0ZVRlcm1zLCB0YXhvbm9teSB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB0ZXJtSWQgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKTtcblx0XHRvblVwZGF0ZVRlcm1zKFt0ZXJtSWRdLCB0YXhvbm9teS5yZXN0X2Jhc2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdpbGwgdHJpZ2dlciB3YXJuaW5nIGlmIHNlZ21lbnQgY2hhbmdlZFxuXHQgKiBidXQgbWV0YWJveCBoYXMgdW5zYXZlZCBjaGFuZ2VzXG5cdCAqL1xuXHRzaG91bGRDaGFuZ2VTZWdtZW50KCkge1xuXG5cdFx0bGV0IGlzUG9zdERpcnR5ID0gd3AuZGF0YS5zZWxlY3QoJ2NvcmUvZWRpdG9yJykuaXNFZGl0ZWRQb3N0RGlydHkoKTtcblxuXHRcdGlmIChtZXRhYm94Q2hhbmdlZCB8fCBpc1Bvc3REaXJ0eSkge1xuXHRcdFx0bGV0IGdvID0gY29uZmlybShfXyggJ01ldGFib3hlcyB3aWxsIGJlIHVwZGF0ZWQuIFlvdSBoYXZlIHVuc2F2ZWQgY2hhbmdlcyB0aGF0IGNvdWxkIGJlIGxvc3QuIFByb2NlZWQ/JywgJ21lc3NpYScgKSk7XG5cdFx0XHRpZiAoIWdvKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0b25DaGFuZ2VGb3JtTmFtZShldmVudCkge1xuXHRcdGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKSA9PT0gJycgPyAnJyA6IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZm9ybU5hbWU6IG5ld1ZhbHVlIH0pO1xuXHR9XG5cblx0b25DaGFuZ2VGb3JtUGFyZW50KG5ld1BhcmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBmb3JtUGFyZW50OiBuZXdQYXJlbnQgfSk7XG5cdH1cblxuXHRvblRvZ2dsZUZvcm0oKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7XG5cdFx0XHRzaG93Rm9ybTogIXN0YXRlLnNob3dGb3JtLFxuXHRcdH0pKTtcblx0fVxuXG5cdGZpbmRUZXJtKHRlcm1zLCBwYXJlbnQsIG5hbWUpIHtcblx0XHRyZXR1cm4gZmluZCh0ZXJtcywgKHRlcm0pID0+IHtcblx0XHRcdHJldHVybiAoKCF0ZXJtLnBhcmVudCAmJiAhcGFyZW50KSB8fCBwYXJzZUludCh0ZXJtLnBhcmVudCkgPT09IHBhcnNlSW50KHBhcmVudCkpICYmXG5cdFx0XHRcdHRlcm0ubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRvbkFkZFRlcm0oZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgZ28gPSB0aGlzLnNob3VsZENoYW5nZVNlZ21lbnQoKTtcblx0XHRpZiAoIWdvKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgeyBvblVwZGF0ZVRlcm1zLCB0YXhvbm9teSwgdGVybXMsIHNsdWcgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgeyBmb3JtTmFtZSwgZm9ybVBhcmVudCwgYWRkaW5nLCBhdmFpbGFibGVUZXJtcyB9ID0gdGhpcy5zdGF0ZTtcblx0XHRpZiAoZm9ybU5hbWUgPT09ICcnIHx8IGFkZGluZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGNoZWNrIGlmIHRoZSB0ZXJtIHdlIGFyZSBhZGRpbmcgYWxyZWFkeSBleGlzdHNcblx0XHRjb25zdCBleGlzdGluZ1Rlcm0gPSB0aGlzLmZpbmRUZXJtKGF2YWlsYWJsZVRlcm1zLCBmb3JtUGFyZW50LCBmb3JtTmFtZSk7XG5cdFx0aWYgKGV4aXN0aW5nVGVybSkge1xuXHRcdFx0Ly8gaWYgdGhlIHRlcm0gd2UgYXJlIGFkZGluZyBleGlzdHMgYnV0IGlzIG5vdCBzZWxlY3RlZCBzZWxlY3QgaXRcblx0XHRcdGlmICghc29tZSh0ZXJtcywgKHRlcm0pID0+IHRlcm0gPT09IGV4aXN0aW5nVGVybS5pZCkpIHtcblx0XHRcdFx0b25VcGRhdGVUZXJtcyhbZXhpc3RpbmdUZXJtLmlkXSwgdGF4b25vbXkucmVzdF9iYXNlKTsgLy8gQGhlbGdhdGhldmlraW5nXG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Zm9ybU5hbWU6ICcnLFxuXHRcdFx0XHRmb3JtUGFyZW50OiAnJyxcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0YWRkaW5nOiB0cnVlLFxuXHRcdH0pO1xuXHRcdHRoaXMuYWRkUmVxdWVzdCA9IGFwaUZldGNoKHtcblx0XHRcdHBhdGg6IGAvd3AvdjIvJHt0YXhvbm9teS5yZXN0X2Jhc2V9YCxcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRuYW1lOiBmb3JtTmFtZSxcblx0XHRcdFx0cGFyZW50OiBmb3JtUGFyZW50ID8gZm9ybVBhcmVudCA6IHVuZGVmaW5lZCxcblx0XHRcdH0sXG5cdFx0fSk7XG5cdFx0Ly8gVHJpZXMgdG8gY3JlYXRlIGEgdGVybSBvciBmZXRjaCBpdCBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuXHRcdGNvbnN0IGZpbmRPckNyZWF0ZVByb21pc2UgPSB0aGlzLmFkZFJlcXVlc3Rcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0Y29uc3QgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcblx0XHRcdFx0aWYgKGVycm9yQ29kZSA9PT0gJ3Rlcm1fZXhpc3RzJykge1xuXHRcdFx0XHRcdC8vIHNlYXJjaCB0aGUgbmV3IGNhdGVnb3J5IGNyZWF0ZWQgc2luY2UgbGFzdCBmZXRjaFxuXHRcdFx0XHRcdHRoaXMuYWRkUmVxdWVzdCA9IGFwaUZldGNoKHtcblx0XHRcdFx0XHRcdHBhdGg6IGFkZFF1ZXJ5QXJncyhcblx0XHRcdFx0XHRcdFx0YC93cC92Mi8ke3RheG9ub215LnJlc3RfYmFzZX1gLFxuXHRcdFx0XHRcdFx0XHR7IC4uLkRFRkFVTFRfUVVFUlksIHBhcmVudDogZm9ybVBhcmVudCB8fCAwLCBzZWFyY2g6IGZvcm1OYW1lIH1cblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYWRkUmVxdWVzdFxuXHRcdFx0XHRcdFx0LnRoZW4oKHNlYXJjaFJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maW5kVGVybShzZWFyY2hSZXN1bHQsIGZvcm1QYXJlbnQsIGZvcm1OYW1lKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG5cdFx0XHR9KTtcblx0XHRmaW5kT3JDcmVhdGVQcm9taXNlXG5cdFx0XHQudGhlbigodGVybSkgPT4ge1xuXHRcdFx0XHRjb25zdCBoYXNUZXJtID0gISFmaW5kKHRoaXMuc3RhdGUuYXZhaWxhYmxlVGVybXMsIChhdmFpbGFibGVUZXJtKSA9PiBhdmFpbGFibGVUZXJtLmlkID09PSB0ZXJtLmlkKTtcblx0XHRcdFx0Y29uc3QgbmV3QXZhaWxhYmxlVGVybXMgPSBoYXNUZXJtID8gdGhpcy5zdGF0ZS5hdmFpbGFibGVUZXJtcyA6IFt0ZXJtLCAuLi50aGlzLnN0YXRlLmF2YWlsYWJsZVRlcm1zXTtcblx0XHRcdFx0Y29uc3QgdGVybUFkZGVkTWVzc2FnZSA9IHNwcmludGYoXG5cdFx0XHRcdFx0X3goJyVzIGFkZGVkJywgJ3Rlcm0nLCAnbWVzc2lhJyksXG5cdFx0XHRcdFx0Z2V0KFxuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy50YXhvbm9teSxcblx0XHRcdFx0XHRcdFsnbGFiZWxzJywgJ3Npbmd1bGFyX25hbWUnXSxcblx0XHRcdFx0XHRcdHNsdWcgPT09ICdjYXRlZ29yeScgPyBfXygnQ2F0ZWdvcnknLCAnbWVzc2lhJykgOiBfXygnVGVybScsICdtZXNzaWEnKVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5wcm9wcy5zcGVhayh0ZXJtQWRkZWRNZXNzYWdlLCAnYXNzZXJ0aXZlJyk7XG5cdFx0XHRcdHRoaXMuYWRkUmVxdWVzdCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGFkZGluZzogZmFsc2UsXG5cdFx0XHRcdFx0Zm9ybU5hbWU6ICcnLFxuXHRcdFx0XHRcdGZvcm1QYXJlbnQ6ICcnLFxuXHRcdFx0XHRcdGF2YWlsYWJsZVRlcm1zOiBuZXdBdmFpbGFibGVUZXJtcyxcblx0XHRcdFx0XHRhdmFpbGFibGVUZXJtc1RyZWU6IHRoaXMuc29ydEJ5U2VsZWN0ZWQodGhpcy5idWlsZFRlcm1zVHJlZShuZXdBdmFpbGFibGVUZXJtcykpLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0b25VcGRhdGVUZXJtcyhbdGVybS5pZF0sIHRheG9ub215LnJlc3RfYmFzZSk7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0fSwgKHhocikgPT4ge1xuXHRcdFx0XHRpZiAoeGhyLnN0YXR1c1RleHQgPT09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hZGRSZXF1ZXN0ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0YWRkaW5nOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMuZmV0Y2hUZXJtcygpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0aW52b2tlKHRoaXMuZmV0Y2hSZXF1ZXN0LCBbJ2Fib3J0J10pO1xuXHRcdGludm9rZSh0aGlzLmFkZFJlcXVlc3QsIFsnYWJvcnQnXSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMudGF4b25vbXkgIT09IHByZXZQcm9wcy50YXhvbm9teSkge1xuXHRcdFx0dGhpcy5mZXRjaFRlcm1zKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcHMudGVybXMgIT09IHByZXZQcm9wcy50ZXJtcykge1xuXHRcdFx0dGhpcy51cGRhdGVNZXRhYm94ZXMocHJldlByb3BzLnRlcm1zWzBdLCB0aGlzLnByb3BzLnRlcm1zWzBdKTtcblx0XHR9XG5cdH1cblxuXHRmZXRjaFRlcm1zKCkge1xuXHRcdGNvbnN0IHsgdGF4b25vbXkgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKCF0YXhvbm9teSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmZldGNoUmVxdWVzdCA9IGFwaUZldGNoKHtcblx0XHRcdHBhdGg6IGFkZFF1ZXJ5QXJncyhgL3dwL3YyLyR7dGF4b25vbXkucmVzdF9iYXNlfWAsIERFRkFVTFRfUVVFUlkpLFxuXHRcdH0pO1xuXHRcdHRoaXMuZmV0Y2hSZXF1ZXN0LnRoZW4oXG5cdFx0XHQodGVybXMpID0+IHsgLy8gcmVzb2x2ZVxuXHRcdFx0XHRjb25zdCBhdmFpbGFibGVUZXJtc1RyZWUgPSB0aGlzLnNvcnRCeVNlbGVjdGVkKHRoaXMuYnVpbGRUZXJtc1RyZWUodGVybXMpKTtcblxuXHRcdFx0XHR0aGlzLmZldGNoUmVxdWVzdCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdGF2YWlsYWJsZVRlcm1zVHJlZSxcblx0XHRcdFx0XHRhdmFpbGFibGVUZXJtczogdGVybXMsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdCh4aHIpID0+IHsgLy8gcmVqZWN0XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzVGV4dCA9PT0gJ2Fib3J0Jykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZldGNoUmVxdWVzdCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0dXBkYXRlTWV0YWJveGVzKHByZXZTZWdtZW50ID0gMCwgY3VycmVudFNlZ21lbnQpIHtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZGlzYWJsZWQ6IHRydWUsXG5cdFx0fSk7XG5cdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9lZGl0b3InKS5sb2NrUG9zdFNhdmluZygnbWVzc2lhL3NlZ21lbnQtbG9jaycpO1xuXG5cdFx0dGhpcy5mZXRjaE1ldGFib3hlcyhwcmV2U2VnbWVudCwgY3VycmVudFNlZ21lbnQpLnRoZW4oXG5cdFx0XHQocmVzdWx0KSA9PiB7XG5cblx0XHRcdFx0bGV0IG5ld0lkID0gcmVzdWx0Lm1ldGFib3hIdG1sLmdldEF0dHJpYnV0ZSgnaWQnKTtcblx0XHRcdFx0bGV0IHByZXZJZCA9IG5ld0lkLnJlcGxhY2UoLyhcXGQrKS9nLCByZXN1bHQucHJldlRlcm0pO1xuXHRcdFx0XHRsZXQgcG9zdFR5cGUgPSB3cC5kYXRhLnNlbGVjdCgnY29yZS9lZGl0b3InKS5nZXRDdXJyZW50UG9zdFR5cGUoKTtcblxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmV2SWQpLnJlcGxhY2VXaXRoKHJlc3VsdC5tZXRhYm94SHRtbCk7XG5cdFx0XHRcdHdpbmRvdy5wb3N0Ym94ZXMuYWRkX3Bvc3Rib3hfdG9nZ2xlcyhwb3N0VHlwZSk7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvZWRpdG9yJykudW5sb2NrUG9zdFNhdmluZygnbWVzc2lhL3NlZ21lbnQtbG9jaycpO1xuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5vbkNoYW5nZU1ldGFib3hlcygpO1xuXHRcdFx0XHRtZXRhYm94Q2hhbmdlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5ld0lkKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnb2JqZWN0TWV0YWJveFVwZGF0ZWQnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuXHRcdFx0fSxcblx0XHRcdChyZWplY3QpID0+IHtcblx0XHRcdFx0Ly8gbm9uY2UgZGlkIG5vdCB2ZXJpZmllZCBvciBvdGhlciB1bmV4cGVjdGVkIGVyclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VnbWVudC1jb25zdHJ1Y3Rvci10ZXJtLWlkLScgKyBwcmV2U2VnbWVudCkucmVtb3ZlKCk7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvZWRpdG9yJykudW5sb2NrUG9zdFNhdmluZygnbWVzc2lhL3NlZ21lbnQtbG9jaycpO1xuXHRcdFx0XHRtZXRhYm94Q2hhbmdlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIGZldGNoTWV0YWJveGVzKHByZXZUZXJtID0gMCwgdGVybUlkKSB7XG5cblx0XHRyZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cdFx0XHRhcGlGZXRjaCh7XG5cdFx0XHRcdHVybDogYWRkUXVlcnlBcmdzKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsIHtcblx0XHRcdFx0XHQnZmV0Y2gtbWV0YWJveC1mb3ItdGVybSc6IHRlcm1JZCxcblx0XHRcdFx0XHQnbWVzc2lhX25vbmNlJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlZ21lbnQtY29uc3RydWN0b3ItdGVybS1pZC0nICsgcHJldlRlcm0pLnF1ZXJ5U2VsZWN0b3IoJyNtZXNzaWFfbm9uY2UnKS52YWx1ZSxcblx0XHRcdFx0fSksXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRwYXJzZTogZmFsc2UsXG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcblx0XHRcdH0pLnRoZW4oYm9keSA9PiB7XG5cdFx0XHRcdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGFib3hlcycpO1xuXHRcdFx0XHRlbC5pbm5lckhUTUwgPSBib2R5O1xuXHRcdFx0XHRsZXQgbWV0YWJveCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJyNzZWdtZW50LWNvbnN0cnVjdG9yLXRlcm0taWQtJyArIHRlcm1JZCk7XG5cdFx0XHRcdGVsLnJlbW92ZSgpO1xuXG5cdFx0XHRcdGlmIChtZXRhYm94ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0XHRwcmV2VGVybTogcHJldlRlcm0sXG5cdFx0XHRcdFx0bWV0YWJveEh0bWw6IG1ldGFib3gsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIG1ldGFib3guJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzb3J0QnlTZWxlY3RlZCh0ZXJtc1RyZWUpIHtcblx0XHRjb25zdCB7IHRlcm1zIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHRyZWVIYXNTZWxlY3Rpb24gPSAodGVybVRyZWUpID0+IHtcblx0XHRcdGlmICh0ZXJtcy5pbmRleE9mKHRlcm1UcmVlLmlkKSAhPT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAodW5kZWZpbmVkID09PSB0ZXJtVHJlZS5jaGlsZHJlbikge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBhbnlDaGlsZElzU2VsZWN0ZWQgPSB0ZXJtVHJlZS5jaGlsZHJlbi5tYXAodHJlZUhhc1NlbGVjdGlvbikuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQpLmxlbmd0aCA+IDA7XG5cdFx0XHRpZiAoYW55Q2hpbGRJc1NlbGVjdGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cdFx0Y29uc3QgdGVybU9yQ2hpbGRJc1NlbGVjdGVkID0gKHRlcm1BLCB0ZXJtQikgPT4ge1xuXHRcdFx0Y29uc3QgdGVybUFTZWxlY3RlZCA9IHRyZWVIYXNTZWxlY3Rpb24odGVybUEpO1xuXHRcdFx0Y29uc3QgdGVybUJTZWxlY3RlZCA9IHRyZWVIYXNTZWxlY3Rpb24odGVybUIpO1xuXG5cdFx0XHRpZiAodGVybUFTZWxlY3RlZCA9PT0gdGVybUJTZWxlY3RlZCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRlcm1BU2VsZWN0ZWQgJiYgIXRlcm1CU2VsZWN0ZWQpIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRlcm1BU2VsZWN0ZWQgJiYgdGVybUJTZWxlY3RlZCkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fTtcblx0XHR0ZXJtc1RyZWUuc29ydCh0ZXJtT3JDaGlsZElzU2VsZWN0ZWQpO1xuXHRcdHJldHVybiB0ZXJtc1RyZWU7XG5cdH1cblxuXHRzZXRGaWx0ZXJWYWx1ZShldmVudCkge1xuXHRcdGNvbnN0IHsgYXZhaWxhYmxlVGVybXNUcmVlIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGNvbnN0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRcdGNvbnN0IGZpbHRlcmVkVGVybXNUcmVlID0gYXZhaWxhYmxlVGVybXNUcmVlLm1hcCh0aGlzLmdldEZpbHRlck1hdGNoZXIoZmlsdGVyVmFsdWUpKS5maWx0ZXIoKHRlcm0pID0+IHRlcm0pO1xuXHRcdGNvbnN0IGdldFJlc3VsdENvdW50ID0gKHRlcm1zKSA9PiB7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0ZXJtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHRpZiAodW5kZWZpbmVkICE9PSB0ZXJtc1tpXS5jaGlsZHJlbikge1xuXHRcdFx0XHRcdGNvdW50ICs9IGdldFJlc3VsdENvdW50KHRlcm1zW2ldLmNoaWxkcmVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH07XG5cdFx0dGhpcy5zZXRTdGF0ZShcblx0XHRcdHtcblx0XHRcdFx0ZmlsdGVyVmFsdWUsXG5cdFx0XHRcdGZpbHRlcmVkVGVybXNUcmVlLFxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRjb25zdCByZXN1bHRDb3VudCA9IGdldFJlc3VsdENvdW50KGZpbHRlcmVkVGVybXNUcmVlKTtcblx0XHRjb25zdCByZXN1bHRzRm91bmRNZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9uKCclZCByZXN1bHQgZm91bmQuJywgJyVkIHJlc3VsdHMgZm91bmQuJywgcmVzdWx0Q291bnQsICdtZXNzaWEnKSxcblx0XHRcdHJlc3VsdENvdW50XG5cdFx0KTtcblx0XHR0aGlzLnByb3BzLmRlYm91bmNlZFNwZWFrKHJlc3VsdHNGb3VuZE1lc3NhZ2UsICdhc3NlcnRpdmUnKTtcblx0fVxuXG5cdGdldEZpbHRlck1hdGNoZXIoZmlsdGVyVmFsdWUpIHtcblx0XHRjb25zdCBtYXRjaFRlcm1zRm9yRmlsdGVyID0gKG9yaWdpbmFsVGVybSkgPT4ge1xuXHRcdFx0aWYgKCcnID09PSBmaWx0ZXJWYWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxUZXJtO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTaGFsbG93IGNsb25lLCBiZWNhdXNlIHdlJ2xsIGJlIGZpbHRlcmluZyB0aGUgdGVybSdzIGNoaWxkcmVuIGFuZFxuXHRcdFx0Ly8gZG9uJ3Qgd2FudCB0byBtb2RpZnkgdGhlIG9yaWdpbmFsIHRlcm0uXG5cdFx0XHRjb25zdCB0ZXJtID0geyAuLi5vcmlnaW5hbFRlcm0gfTtcblxuXHRcdFx0Ly8gTWFwIGFuZCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCByZWN1cnNpdmUgc28gd2UgZGVhbCB3aXRoIGdyYW5kY2hpbGRyZW5cblx0XHRcdC8vIGFuZCBhbnkgZGVlcGVyIGxldmVscy5cblx0XHRcdGlmICh0ZXJtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGVybS5jaGlsZHJlbiA9IHRlcm0uY2hpbGRyZW4ubWFwKG1hdGNoVGVybXNGb3JGaWx0ZXIpLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgdGhlIHRlcm0ncyBuYW1lIGNvbnRhaW5zIHRoZSBmaWx0ZXJWYWx1ZSwgb3IgaXQgaGFzIGNoaWxkcmVuXG5cdFx0XHQvLyAoaS5lLiBzb21lIGNoaWxkIG1hdGNoZWQgYXQgc29tZSBwb2ludCBpbiB0aGUgdHJlZSkgdGhlbiByZXR1cm4gaXQuXG5cdFx0XHRpZiAoLTEgIT09IHRlcm0ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUudG9Mb3dlckNhc2UoKSkgfHwgdGVybS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHJldHVybiB0ZXJtO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIHJldHVybiBmYWxzZS4gQWZ0ZXIgbWFwcGluZywgdGhlIGxpc3Qgb2YgdGVybXMgd2lsbCBuZWVkXG5cdFx0XHQvLyB0byBoYXZlIGZhbHNlIHZhbHVlcyBmaWx0ZXJlZCBvdXQuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblx0XHRyZXR1cm4gbWF0Y2hUZXJtc0ZvckZpbHRlcjtcblx0fVxuXG5cdHJlbmRlclRlcm1zKHJlbmRlcmVkVGVybXMpIHtcblx0XHRjb25zdCB7IHRlcm1zID0gW10sIHRheG9ub215IH0gPSB0aGlzLnByb3BzOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRjb25zdCBrbGFzcyA9IHRheG9ub215LmhpZXJhcmNoaWNhbCA/ICdoaWVyYXJjaGljYWwnIDogJ25vbi1oaWVyYXJjaGljYWwnOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblxuXHRcdHJldHVybiByZW5kZXJlZFRlcm1zLm1hcCgodGVybSkgPT4ge1xuXHRcdFx0Y29uc3QgaWQgPSBgZWRpdG9yLXBvc3QtdGF4b25vbWllcy0ke2tsYXNzfS10ZXJtLSR7dGVybS5pZH1gOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYga2V5PXt0ZXJtLmlkfSBjbGFzc05hbWU9eydlZGl0b3ItcG9zdC10YXhvbm9taWVzX18nICsga2xhc3MgKyAnLXRlcm1zLWNob2ljZSAnfT5cblx0XHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRcdGlkPXtpZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17J2VkaXRvci1wb3N0LXRheG9ub21pZXNfXycgKyBrbGFzcyArICctdGVybXMtaW5wdXQgJ31cblx0XHRcdFx0XHRcdHR5cGU9XCJyYWRpb1wiIC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0XHRcdFx0Y2hlY2tlZD17dGVybXMuaW5kZXhPZih0ZXJtLmlkKSAhPT0gLTF9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dGVybS5pZH1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0bmFtZT17J3JhZGlvX3RheF9pbnB1dC0nICsgdGhpcy5wcm9wcy5zbHVnfSAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxsYWJlbCBodG1sRm9yPXtpZH0+e3VuZXNjYXBlKHRlcm0ubmFtZSl9PC9sYWJlbD5cblx0XHRcdFx0XHR7ISF0ZXJtLmNoaWxkcmVuLmxlbmd0aCAmJiAoXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J2VkaXRvci1wb3N0LXRheG9ub21pZXNfXycgKyBrbGFzcyArICctdGVybXMtc3ViY2hvaWNlcyAnfT5cblx0XHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyVGVybXModGVybS5jaGlsZHJlbil9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3QgeyBzbHVnLCB0YXhvbm9teSwgaW5zdGFuY2VJZCwgaGFzQ3JlYXRlQWN0aW9uLCBoYXNBc3NpZ25BY3Rpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3Qga2xhc3MgPSB0YXhvbm9teS5oaWVyYXJjaGljYWwgPyAnaGllcmFyY2hpY2FsJyA6ICdub24taGllcmFyY2hpY2FsJzsgLy8gQGhlbGdhdGhldmlraW5nXG5cblx0XHRpZiAoIWhhc0Fzc2lnbkFjdGlvbikge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeyBhdmFpbGFibGVUZXJtc1RyZWUsIGF2YWlsYWJsZVRlcm1zLCBmaWx0ZXJlZFRlcm1zVHJlZSwgZm9ybU5hbWUsIGZvcm1QYXJlbnQsIGxvYWRpbmcsIHNob3dGb3JtLCBmaWx0ZXJWYWx1ZSB9ID0gdGhpcy5zdGF0ZTtcblx0XHRjb25zdCBsYWJlbFdpdGhGYWxsYmFjayA9IChsYWJlbFByb3BlcnR5LCBmYWxsYmFja0lzQ2F0ZWdvcnksIGZhbGxiYWNrSXNOb3RDYXRlZ29yeSkgPT4gZ2V0KFxuXHRcdFx0dGF4b25vbXksXG5cdFx0XHRbJ2xhYmVscycsIGxhYmVsUHJvcGVydHldLFxuXHRcdFx0c2x1ZyA9PT0gJ2NhdGVnb3J5JyA/IGZhbGxiYWNrSXNDYXRlZ29yeSA6IGZhbGxiYWNrSXNOb3RDYXRlZ29yeVxuXHRcdCk7XG5cdFx0Y29uc3QgbmV3VGVybUJ1dHRvbkxhYmVsID0gbGFiZWxXaXRoRmFsbGJhY2soXG5cdFx0XHQnYWRkX25ld19pdGVtJyxcblx0XHRcdF9fKCdBZGQgbmV3IGNhdGVnb3J5JywgJ21lc3NpYScpLFxuXHRcdFx0X18oJ0FkZCBuZXcgdGVybScsICdtZXNzaWEnKVxuXHRcdCk7XG5cdFx0Y29uc3QgbmV3VGVybUxhYmVsID0gbGFiZWxXaXRoRmFsbGJhY2soXG5cdFx0XHQnbmV3X2l0ZW1fbmFtZScsXG5cdFx0XHRfXygnQWRkIG5ldyBjYXRlZ29yeScsICdtZXNzaWEnKSxcblx0XHRcdF9fKCdBZGQgbmV3IHRlcm0nLCAnbWVzc2lhJylcblx0XHQpO1xuXHRcdGNvbnN0IHBhcmVudFNlbGVjdExhYmVsID0gbGFiZWxXaXRoRmFsbGJhY2soXG5cdFx0XHQncGFyZW50X2l0ZW0nLFxuXHRcdFx0X18oJ1BhcmVudCBDYXRlZ29yeScsICdtZXNzaWEnKSxcblx0XHRcdF9fKCdQYXJlbnQgVGVybScsICdtZXNzaWEnKVxuXHRcdCk7XG5cdFx0Y29uc3Qgbm9QYXJlbnRPcHRpb24gPSBg4oCUICR7cGFyZW50U2VsZWN0TGFiZWx9IOKAlGA7XG5cdFx0Y29uc3QgbmV3VGVybVN1Ym1pdExhYmVsID0gbmV3VGVybUJ1dHRvbkxhYmVsO1xuXHRcdGNvbnN0IGlucHV0SWQgPSBgZWRpdG9yLXBvc3QtdGF4b25vbWllc19fJHtrbGFzc30tdGVybXMtaW5wdXQtJHtpbnN0YW5jZUlkfWA7IC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdGNvbnN0IGZpbHRlcklucHV0SWQgPSBgZWRpdG9yLXBvc3QtdGF4b25vbWllc19fJHtrbGFzc30tdGVybXMtZmlsdGVyLSR7aW5zdGFuY2VJZH1gOyAvLyBAaGVsZ2F0aGV2aWtpbmdcblx0XHRjb25zdCBmaWx0ZXJMYWJlbCA9IGdldChcblx0XHRcdHRoaXMucHJvcHMudGF4b25vbXksXG5cdFx0XHRbJ2xhYmVscycsICdzZWFyY2hfaXRlbXMnXSxcblx0XHRcdF9fKCdTZWFyY2ggVGVybXMnLCAnbWVzc2lhJylcblx0XHQpO1xuXHRcdGNvbnN0IGdyb3VwTGFiZWwgPSBnZXQoXG5cdFx0XHR0aGlzLnByb3BzLnRheG9ub215LFxuXHRcdFx0WyduYW1lJ10sXG5cdFx0XHRfXygnVGVybXMnLCAnbWVzc2lhJylcblx0XHQpO1xuXHRcdGNvbnN0IHNob3dGaWx0ZXIgPSBhdmFpbGFibGVUZXJtcy5sZW5ndGggPj0gTUlOX1RFUk1TX0NPVU5UX0ZPUl9GSUxURVI7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0c2hvd0ZpbHRlciAmJiA8bGFiZWxcblx0XHRcdFx0a2V5PVwiZmlsdGVyLWxhYmVsXCJcblx0XHRcdFx0aHRtbEZvcj17ZmlsdGVySW5wdXRJZH0+XG5cdFx0XHRcdHtmaWx0ZXJMYWJlbH1cblx0XHRcdDwvbGFiZWw+LFxuXHRcdFx0c2hvd0ZpbHRlciAmJiA8aW5wdXRcblx0XHRcdFx0dHlwZT1cInNlYXJjaFwiXG5cdFx0XHRcdGlkPXtmaWx0ZXJJbnB1dElkfVxuXHRcdFx0XHR2YWx1ZT17ZmlsdGVyVmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNldEZpbHRlclZhbHVlfVxuXHRcdFx0XHRjbGFzc05hbWU9XCJlZGl0b3ItcG9zdC10YXhvbm9taWVzX19oaWVyYXJjaGljYWwtdGVybXMtZmlsdGVyXCJcblx0XHRcdFx0a2V5PVwidGVybS1maWx0ZXItaW5wdXRcIlxuXHRcdFx0Lz4sXG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdGNsYXNzTmFtZT1cImVkaXRvci1wb3N0LXRheG9ub21pZXNfX2hpZXJhcmNoaWNhbC10ZXJtcy1saXN0XCJcblx0XHRcdFx0a2V5PVwidGVybS1saXN0XCJcblx0XHRcdFx0dGFiSW5kZXg9XCIwXCJcblx0XHRcdFx0cm9sZT1cImdyb3VwXCJcblx0XHRcdFx0YXJpYS1sYWJlbD17Z3JvdXBMYWJlbH1cblx0XHRcdD5cblx0XHRcdFx0e3RoaXMucmVuZGVyVGVybXMoJycgIT09IGZpbHRlclZhbHVlID8gZmlsdGVyZWRUZXJtc1RyZWUgOiBhdmFpbGFibGVUZXJtc1RyZWUpfVxuXHRcdFx0PC9kaXY+LFxuXHRcdFx0IWxvYWRpbmcgJiYgaGFzQ3JlYXRlQWN0aW9uICYmIChcblx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdGtleT1cInRlcm0tYWRkLWJ1dHRvblwiXG5cdFx0XHRcdFx0b25DbGljaz17dGhpcy5vblRvZ2dsZUZvcm19XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWRpdG9yLXBvc3QtdGF4b25vbWllc19faGllcmFyY2hpY2FsLXRlcm1zLWFkZFwiXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17c2hvd0Zvcm19XG5cdFx0XHRcdFx0aXNMaW5rXG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7bmV3VGVybUJ1dHRvbkxhYmVsfVxuXHRcdFx0XHQ8L0J1dHRvbj5cblx0XHRcdCksXG5cdFx0XHRzaG93Rm9ybSAmJiAoXG5cdFx0XHRcdDxmb3JtIG9uU3VibWl0PXt0aGlzLm9uQWRkVGVybX0ga2V5PXtrbGFzcyArICctdGVybXMtZm9ybSd9PlxuXHRcdFx0XHRcdDxsYWJlbFxuXHRcdFx0XHRcdFx0aHRtbEZvcj17aW5wdXRJZH1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVkaXRvci1wb3N0LXRheG9ub21pZXNfX2hpZXJhcmNoaWNhbC10ZXJtcy1sYWJlbFwiXG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e25ld1Rlcm1MYWJlbH1cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRcdFx0aWQ9e2lucHV0SWR9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZGl0b3ItcG9zdC10YXhvbm9taWVzX19oaWVyYXJjaGljYWwtdGVybXMtaW5wdXRcIlxuXHRcdFx0XHRcdFx0dmFsdWU9e2Zvcm1OYW1lfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2VGb3JtTmFtZX1cblx0XHRcdFx0XHRcdHJlcXVpcmVkXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7dGF4b25vbXkuaGllcmFyY2hpY2FsICYmICEhYXZhaWxhYmxlVGVybXMubGVuZ3RoICYmIC8vIEBoZWxnYXRoZXZpa2luZ1xuXHRcdFx0XHRcdFx0PFRyZWVTZWxlY3Rcblx0XHRcdFx0XHRcdFx0bGFiZWw9e3BhcmVudFNlbGVjdExhYmVsfVxuXHRcdFx0XHRcdFx0XHRub09wdGlvbkxhYmVsPXtub1BhcmVudE9wdGlvbn1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2VGb3JtUGFyZW50fVxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZElkPXtmb3JtUGFyZW50fVxuXHRcdFx0XHRcdFx0XHR0cmVlPXthdmFpbGFibGVUZXJtc1RyZWV9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRpc1NlY29uZGFyeVxuXHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZGl0b3ItcG9zdC10YXhvbm9taWVzX19oaWVyYXJjaGljYWwtdGVybXMtc3VibWl0XCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7bmV3VGVybVN1Ym1pdExhYmVsfVxuXHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHQpLFxuXHRcdF07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZShbXG5cdHdpdGhTZWxlY3QoKHNlbGVjdCwgeyBzbHVnIH0pID0+IHtcblx0XHRjb25zdCB7IGdldEN1cnJlbnRQb3N0IH0gPSBzZWxlY3QoJ2NvcmUvZWRpdG9yJyk7XG5cdFx0Y29uc3QgeyBnZXRUYXhvbm9teSB9ID0gc2VsZWN0KCdjb3JlJyk7XG5cdFx0Y29uc3QgdGF4b25vbXkgPSBnZXRUYXhvbm9teShzbHVnKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFzQ3JlYXRlQWN0aW9uOiB0YXhvbm9teSA/IGdldChnZXRDdXJyZW50UG9zdCgpLCBbJ19saW5rcycsICd3cDphY3Rpb24tY3JlYXRlLScgKyB0YXhvbm9teS5yZXN0X2Jhc2VdLCBmYWxzZSkgOiBmYWxzZSxcblx0XHRcdGhhc0Fzc2lnbkFjdGlvbjogdGF4b25vbXkgPyBnZXQoZ2V0Q3VycmVudFBvc3QoKSwgWydfbGlua3MnLCAnd3A6YWN0aW9uLWFzc2lnbi0nICsgdGF4b25vbXkucmVzdF9iYXNlXSwgZmFsc2UpIDogZmFsc2UsXG5cdFx0XHR0ZXJtczogdGF4b25vbXkgPyBzZWxlY3QoJ2NvcmUvZWRpdG9yJykuZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSh0YXhvbm9teS5yZXN0X2Jhc2UpIDogW10sXG5cdFx0XHR0YXhvbm9teSxcblx0XHR9O1xuXHR9KSxcblx0d2l0aERpc3BhdGNoKChkaXNwYXRjaCkgPT4gKHtcblx0XHRvblVwZGF0ZVRlcm1zKHRlcm1zLCByZXN0QmFzZSkge1xuXHRcdFx0ZGlzcGF0Y2goJ2NvcmUvZWRpdG9yJykuZWRpdFBvc3QoeyBbcmVzdEJhc2VdOiB0ZXJtcyB9KTtcblx0XHR9LFxuXHR9KSksXG5cdHdpdGhTcG9rZW5NZXNzYWdlcyxcblx0d2l0aEluc3RhbmNlSWQsXG5cdC8vd2l0aEZpbHRlcnMoICdlZGl0b3IuUG9zdFRheG9ub215VHlwZScgKSwgLy8gSW50ZW50aW9uYWxseSBjb21tZW50ZWQgb3V0LlxuXSkoUmFkaW9UZXJtU2VsZWN0b3IpO1xuIiwiaW1wb3J0IFJhZGlvVGVybVNlbGVjdG9yIGZyb20gJy4uLy4uL2pzL19jb21wb25lbnRzL19yYWRpb190ZXJtX3NlbGVjdG9yLmpzeCc7XG5cbmZ1bmN0aW9uIEN1c3RvbWl6ZVRheG9ub215U2VsZWN0b3IoT3JpZ2luYWxDb21wb25lbnQpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChwcm9wcykge1xuXG5cdFx0aWYgKHByb3BzLnNsdWcgPT09ICdtZXNzaWFfb2JqZWN0X3NlZ21lbnQnKSB7XG5cblx0XHRcdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFJhZGlvVGVybVNlbGVjdG9yLFxuXHRcdFx0XHRwcm9wc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRPcmlnaW5hbENvbXBvbmVudCxcblx0XHRcdFx0cHJvcHNcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG53cC5ob29rcy5hZGRGaWx0ZXIoXG5cdCdlZGl0b3IuUG9zdFRheG9ub215VHlwZScsXG5cdCdtZXNzaWEnLFxuXHRDdXN0b21pemVUYXhvbm9teVNlbGVjdG9yXG4pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uLy4uL2pzL19iYWNrZW5kL3JhZGlvLXNlZ21lbnQuanNcIjsiXSwibmFtZXMiOlsid3AiLCJpMThuIiwiX18iLCJfeCIsIl9uIiwic3ByaW50ZiIsIkNvbXBvbmVudCIsImVsZW1lbnQiLCJjb21wb25lbnRzIiwiVHJlZVNlbGVjdCIsIndpdGhTcG9rZW5NZXNzYWdlcyIsIndpdGhGaWx0ZXJzIiwiQnV0dG9uIiwiZGF0YSIsIndpdGhTZWxlY3QiLCJ3aXRoRGlzcGF0Y2giLCJzZWxlY3QiLCJzdWJzY3JpYmUiLCJjb21wb3NlIiwid2l0aEluc3RhbmNlSWQiLCJhcGlGZXRjaCIsImFkZFF1ZXJ5QXJncyIsInVybCIsImxvZGFzaCIsImdyb3VwQnkiLCJnZXQiLCJ1bmVzY2FwZSIsImZpbmQiLCJzb21lIiwiaW52b2tlIiwiREVGQVVMVF9RVUVSWSIsInBlcl9wYWdlIiwib3JkZXJieSIsIm9yZGVyIiwiX2ZpZWxkcyIsIk1JTl9URVJNU19DT1VOVF9GT1JfRklMVEVSIiwibWV0YWJveENoYW5nZWQiLCJSYWRpb1Rlcm1TZWxlY3RvciIsImFyZ3VtZW50cyIsImZpbmRUZXJtIiwiYmluZCIsIm9uQ2hhbmdlIiwib25DaGFuZ2VGb3JtTmFtZSIsIm9uQ2hhbmdlRm9ybVBhcmVudCIsIm9uQWRkVGVybSIsIm9uVG9nZ2xlRm9ybSIsInNldEZpbHRlclZhbHVlIiwic29ydEJ5U2VsZWN0ZWQiLCJzdGF0ZSIsImxvYWRpbmciLCJhdmFpbGFibGVUZXJtc1RyZWUiLCJhdmFpbGFibGVUZXJtcyIsImFkZGluZyIsImZvcm1OYW1lIiwiZm9ybVBhcmVudCIsInNob3dGb3JtIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJlZFRlcm1zVHJlZSIsImRpc2FibGVkIiwib25DaGFuZ2VNZXRhYm94ZXMiLCJvblNhdmluZ1Bvc3QiLCJ1c2UiLCJvcHRpb25zIiwibmV4dCIsInJlc3VsdCIsInRoZW4iLCJyZXNwb25zZSIsInVuU3Vic2NyaWJlIiwic2F2aW5nIiwiaXNTYXZpbmdQb3N0IiwiaXNBdXRvc2F2aW5nUG9zdCIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsIm1ldGFib3hlcyIsInF1ZXJ5U2VsZWN0b3IiLCJsZW5ndGgiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlTWV0YWJveENoYW5nZSIsImZsYXRUZXJtcyIsImZsYXRUZXJtc1dpdGhQYXJlbnRBbmRDaGlsZHJlbiIsIm1hcCIsInRlcm0iLCJjaGlsZHJlbiIsInBhcmVudCIsInRlcm1zQnlQYXJlbnQiLCJudWxsIiwiZmlsbFdpdGhDaGlsZHJlbiIsInRlcm1zIiwiaWQiLCJldmVudCIsImdvIiwic2hvdWxkQ2hhbmdlU2VnbWVudCIsInByb3BzIiwib25VcGRhdGVUZXJtcyIsInRheG9ub215IiwidGVybUlkIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlc3RfYmFzZSIsImlzUG9zdERpcnR5IiwiaXNFZGl0ZWRQb3N0RGlydHkiLCJjb25maXJtIiwibmV3VmFsdWUiLCJ0cmltIiwic2V0U3RhdGUiLCJuZXdQYXJlbnQiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJwcmV2ZW50RGVmYXVsdCIsInNsdWciLCJleGlzdGluZ1Rlcm0iLCJhZGRSZXF1ZXN0IiwicGF0aCIsIm1ldGhvZCIsInVuZGVmaW5lZCIsImZpbmRPckNyZWF0ZVByb21pc2UiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsInNlYXJjaCIsInNlYXJjaFJlc3VsdCIsIlByb21pc2UiLCJyZWplY3QiLCJoYXNUZXJtIiwiYXZhaWxhYmxlVGVybSIsIm5ld0F2YWlsYWJsZVRlcm1zIiwidGVybUFkZGVkTWVzc2FnZSIsInNwZWFrIiwiYnVpbGRUZXJtc1RyZWUiLCJ4aHIiLCJzdGF0dXNUZXh0IiwiZmV0Y2hUZXJtcyIsImZldGNoUmVxdWVzdCIsInByZXZQcm9wcyIsInVwZGF0ZU1ldGFib3hlcyIsInByZXZTZWdtZW50IiwiY3VycmVudFNlZ21lbnQiLCJkaXNwYXRjaCIsImxvY2tQb3N0U2F2aW5nIiwiZmV0Y2hNZXRhYm94ZXMiLCJuZXdJZCIsIm1ldGFib3hIdG1sIiwiZ2V0QXR0cmlidXRlIiwicHJldklkIiwicmVwbGFjZSIsInByZXZUZXJtIiwicG9zdFR5cGUiLCJnZXRDdXJyZW50UG9zdFR5cGUiLCJnZXRFbGVtZW50QnlJZCIsInJlcGxhY2VXaXRoIiwid2luZG93IiwicG9zdGJveGVzIiwiYWRkX3Bvc3Rib3hfdG9nZ2xlcyIsInVubG9ja1Bvc3RTYXZpbmciLCJyZW1vdmUiLCJyZXNvbHZlIiwibG9jYXRpb24iLCJocmVmIiwicGFyc2UiLCJ0ZXh0IiwiYm9keSIsImVsIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIm1ldGFib3giLCJlIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsInRlcm1zVHJlZSIsInRyZWVIYXNTZWxlY3Rpb24iLCJ0ZXJtVHJlZSIsImluZGV4T2YiLCJhbnlDaGlsZElzU2VsZWN0ZWQiLCJmaWx0ZXIiLCJjaGlsZCIsInRlcm1PckNoaWxkSXNTZWxlY3RlZCIsInRlcm1BIiwidGVybUIiLCJ0ZXJtQVNlbGVjdGVkIiwidGVybUJTZWxlY3RlZCIsInNvcnQiLCJnZXRGaWx0ZXJNYXRjaGVyIiwiZ2V0UmVzdWx0Q291bnQiLCJjb3VudCIsImkiLCJyZXN1bHRDb3VudCIsInJlc3VsdHNGb3VuZE1lc3NhZ2UiLCJkZWJvdW5jZWRTcGVhayIsIm1hdGNoVGVybXNGb3JGaWx0ZXIiLCJvcmlnaW5hbFRlcm0iLCJyZW5kZXJlZFRlcm1zIiwia2xhc3MiLCJoaWVyYXJjaGljYWwiLCJyZW5kZXJUZXJtcyIsImluc3RhbmNlSWQiLCJoYXNDcmVhdGVBY3Rpb24iLCJoYXNBc3NpZ25BY3Rpb24iLCJsYWJlbFdpdGhGYWxsYmFjayIsImxhYmVsUHJvcGVydHkiLCJmYWxsYmFja0lzQ2F0ZWdvcnkiLCJmYWxsYmFja0lzTm90Q2F0ZWdvcnkiLCJuZXdUZXJtQnV0dG9uTGFiZWwiLCJuZXdUZXJtTGFiZWwiLCJwYXJlbnRTZWxlY3RMYWJlbCIsIm5vUGFyZW50T3B0aW9uIiwibmV3VGVybVN1Ym1pdExhYmVsIiwiaW5wdXRJZCIsImZpbHRlcklucHV0SWQiLCJmaWx0ZXJMYWJlbCIsImdyb3VwTGFiZWwiLCJzaG93RmlsdGVyIiwiZ2V0Q3VycmVudFBvc3QiLCJnZXRUYXhvbm9teSIsImdldEVkaXRlZFBvc3RBdHRyaWJ1dGUiLCJyZXN0QmFzZSIsImVkaXRQb3N0Il0sInNvdXJjZVJvb3QiOiIifQ==
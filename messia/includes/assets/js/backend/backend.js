/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/backend.scss":
/*!****************************************!*\
  !*** ./src/scss/_backend/backend.scss ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/backend.js":
/*!************************************!*\
  !*** ./src/js/_backend/backend.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_components/_logger.js */ "./src/js/_components/_logger.js");
/* harmony import */ var _components_logger_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_logger_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_components/_loader.js */ "./src/js/_components/_loader.js");
/* harmony import */ var _components_loader_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_loader_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_worker_dispatcher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_components/_worker_dispatcher.js */ "./src/js/_components/_worker_dispatcher.js");




(function ($) {

	$(function () {
		'use strict';

		var Messia;

		$.fn.messiaStickyTextarea = function () {
			if (typeof this != 'undefined') {
				Messia.stickyTextarea(this);
			}
		};

		$.fn.messiaStickyCodeMirror = function (codeMirrors) {
			for (var i = 0; i < codeMirrors.length; i++) {
				Messia.stickyCodeMirror(codeMirrors[i]);
			}
		};

		$.fn.messiaAppendMediaSelection = function (caller, selection) {
			for (let i = 0; i < selection.length; i++) {

				let append;
				let tmpl = caller.clone();

				switch (selection[i].type) {
					case 'wp-image':
						append = `<img class="image" src="${selection[i].url}"/>`;
						break;

					case 'icon':
						switch (selection[i].iconSetId) {
							case 'google-material':
								let classes = selection[i].variant.cssClass.join(' ');
								append = `<span class="image ${classes}">${selection[i].icon}</span>`;
								break;

							default:
								console.error(new Error(`Unknown icon set id: ${selection[i].iconSetId}`));
								break;
						}
						break;

					default:
						console.error(new Error(`Unknown image type: ${selection[i].type}`));
				}

				if (caller.hasClass('multiple')) {
					tmpl.removeClass(['multiple', 'template']).find('.image').remove();
					tmpl.data('imageinfo', selection[i]).append(append);
					tmpl.find('.placeholder-image').removeClass('placeholder-image').addClass('remove-image').after('<span class="edit-link"></span>');
					tmpl.insertBefore(caller);
				} else {
					caller.find('.image').remove();
					caller.data('imageinfo', selection[i]).append(append);
					caller.find('.placeholder-image').removeClass('placeholder-image').addClass('remove-image');
				}
			}
		};

		/**
		 * Show custom popup.
		 *
		 * @param  {string} title   Popup title text.
		 * @param  {string} content Inner HTML.
		 * @param  {bool}   confirm With confirm or not.
		 *
		 * @return {object} jQUI widget instance.
		 */
		$.fn.messiaModalWarning = function (title, content, buttons = false) {
			return Messia.dialogOpen(Messia.dialog_object, title, content, buttons);
		};

		$.fn.messiaIsMobile = function () {

			var mobile_platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			if (mobile_platform) {
				return true;
			}
			return false;
		};

		$.fn.messiaInitSelect2 = function (selectors) {
			for (var i = 0; i < selectors.length; i++) {
				if (selectors[i].selector.hasClass('select2-hidden-accessible')) {
					continue;
				}
				selectors[i].selector.select2(selectors[i].arguments);
				selectors[i].selector.on('change', function (e) {
					this.dispatchEvent(new Event('select2Change', { bubbles: true }));
				});
			}
		};

		Messia = {
			select2Multiple: '',
			select2Async: '',
			stickyTransition: 600,
			dialog_object: $('#messia_modal_warning'),
			dialog_arg: {
				autoOpen: false,
				modal: true,
				appendTo: 'body',
				show: {
					effect: "drop",
					direction: 'up',
					duration: 250
				},
				hide: {
					effect: "drop",
					direction: 'down',
					duration: 250
				},
				beforeClose: function (event, ui) { },
				open: function (event, ui) { },
				close: function (event, ui) {
					$(this).dialog('destroy');
				},
				position: {
					my: 'center center',
					at: 'center center',
					of: window
				},
				//maxHeight: $(window).height() - 100,
				//maxWidth: $(window).width() - 100,
				minWidth: $(window).width() / 2,
				minHeight: $(window).height() / 3,
				//height	: 'auto',
				//width		: 'auto',
			},
			dialogOpen: function (dialogObject, dialogTitle, dialogContent, buttons = false) {

				dialogObject.dialog(Messia.dialog_arg);
				dialogObject.dialog('instance').element.empty().html(dialogContent);

				if (dialogTitle !== false) {
					dialogObject.dialog('instance').uiDialogTitlebar.find('.ui-dialog-title').text(dialogTitle);
				}

				if (buttons === false) {
					var dialogClass = 'messia-core-dialog-warning';
					var buttons = [{
						text: $(this).get(0).dialog_object.data('settings').button_Text,
						click: function () {
							$(this).dialog("close");
						},
					}];
				} else if (buttons.length === 0) {
					var dialogClass = 'messia-core-dialog-warning no-close';
					var _buttons = {
						'Cancel': function (event) {
							$(this).trigger('dialogClosed', ['cancel']);
							$(this).dialog("close");
						},
						'OK': function (event) {
							$(this).trigger('dialogClosed', ['ok']);
							$(this).dialog("close");
						}
					};
				} else {
					var dialogClass = 'messia-core-dialog-warning no-close';
					var _buttons = buttons;
				}
				dialogObject.dialog('option', {
					dialogClass: dialogClass,
					buttons: _buttons,
				});

				dialogObject.dialog('widget').draggable('option', {
					'scroll': false,
					'containment': 'window',
				});

				dialogObject.dialog('open');
				$('.custom-scope .ui-widget-overlay').css({
					'background': '#000000',
				});

				return dialogObject.dialog('instance');
			},
			ajaxResponseFill: function (content) {
				var target = $('#ajax-response');

				if (false === target.prev().hasClass('wp-header-end')) {
					var position = $('#wpbody .wrap .wp-header-end');
					if (position.length >= 1) {
						position = position.first();
						target.detach().insertAfter(position);
					}
				}
				target.find('.messia').remove();

				if (target.length === 1) {
					target.append(content);
				}
				// for common.js
				$(document).trigger('wp-updates-notice-added');
			},
			ajaxSuccess: function (event, xhr, settings) {

				if (typeof settings.data != 'undefined') {
					Messia.inlineSaveSuccess(event, xhr, settings);
				}
			},
			inlineSaveSuccess: function (event, xhr, settings) {

				var content;
				var data = new URLSearchParams(settings.data);

				if (Messia.dialog_object.length === 0) {
					//return;
				}

				if (data.get('taxonomy') == 'messia_object_segment') {
					if (data.get('action') == 'inline-save-tax') {
						content = '<div class="messia notice notice-success is-dismissible"><p>' + messiaVars.messages.segmentPageUpdated + '</p></div>';
					}
					else if (data.get('action') == 'add-tag') {
						content = '<div class="messia notice notice-success is-dismissible"><p>' + messiaVars.messages.segmentPageAdded + '</p></div>';

						if (data.get('slug') == data.get('alias') && '' !== data.get('slug')) {
							content = content + '<div class="messia notice notice-error is-dismissible"><p>' + messiaVars.messages.segmentAliasSlug + '</p></div>';
						}
					}
					else if (data.get('action') == 'delete-tag') {
						content = '<div class="messia notice notice-warning is-dismissible"><p>' + messiaVars.messages.segmentPageDeleted + '</p></div>';
					}
				}
				else if (data.get('taxonomy') == 'messia_object_category') {
					if (data.get('action') == 'inline-save-tax') {
						if (data.get('term_order_position_type') !== 'reset' || data.get('term_order_position_type') !== 'before' || data.get('term_order_position_type') !== 'after') {
							content = '<div class="messia notice notice-success is-dismissible"><p>' + messiaVars.messages.termsReordered + '</p></div>';
						}
					}
				}

				if (data.get('taxonomy') == 'messia_object_property') {
					if ((data.get('action') == 'inline-save-tax' || data.get('action') == 'add-tag') && messiaVars.reservedTerms.messia_object_property.includes(data.get('slug'))) {
						content = '<div class="messia notice notice-error is-dismissible"><p>' + messiaVars.messages.propertySlugReserved + '</p></div>';
					}
					if (data.get('action') == 'inline-save-tax') {
						if (data.get('term_order_position_type') !== 'reset' || data.get('term_order_position_type') !== 'before' || data.get('term_order_position_type') !== 'after') {
							content += '<div class="messia notice notice-success is-dismissible"><p>' + messiaVars.messages.termsReordered + '</p></div>';
						}
					}
				}

				if (data.get('post_type') == 'page') {
					if (data.get('action') == 'inline-save') {
						var locked = Boolean(xhr.getResponseHeader('Messia-Page-Edit-Forbidden'));
						if (true === locked) {
							content = '<div class="messia notice notice-error is-dismissible"><p>' + messiaVars.messages.dependantPageUpdWarn + '</p></div>';
						}
					}
				}

				if (typeof content != 'undefined') {
					//Messia.dialogOpen(Messia.dialog_object, content);
					Messia.ajaxResponseFill(content);
				}
			},
			stickyTextarea: function (textarea) {

				textarea.on('keyup keypress', Messia.textareaKeyup);
				textarea.on('focusin', Messia.textareaFocusin);
				textarea.on('focusout', Messia.textareaFocusout);
			},
			stickyCodeMirror: function (codemirror) {

				var target = $(codemirror.getWrapperElement());

				codemirror.on('keyup', Messia.codemirrorKeyup);
				codemirror.on('focus', Messia.codemirrorFocusin);
				codemirror.on('blur', Messia.codemirrorsFocusout);
				codemirror.on('refresh', Messia.codeMirrorRefresh);
			},
			textareaKeyup: function (e) {

				var target = $(this);

				if (target.outerHeight() <= target.prop('scrollHeight')) {

					var borders = parseInt(target.css('borderTopWidth')) + parseInt(target.css('borderBottomWidth'));

					target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');
					target.css('height', target.prop('scrollHeight') + borders);

					setTimeout(function () {
						target.css('transition', '');
					}, Messia.stickyTransition);
				}
			},
			textareaFocusin: function (e) {

				var target = $(this);
				target.data('init_height', target.outerHeight());

				target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');

				clearTimeout(target.data('focusOutInt_1'));
				clearTimeout(target.data('focusOutInt_2'));

				target.css('width', '100%');

				var int = setTimeout(function () {

					var scrollHeight = target.prop('scrollHeight');
					var realHeight = target.data('init_height');
					var borders = parseInt(target.css('borderTopWidth')) + parseInt(target.css('borderBottomWidth'));

					target.css('height', target.data('init_height'));

					if (scrollHeight <= realHeight) {
						return;
					};

					target.css('height', target.prop('scrollHeight') + borders);

					setTimeout(function () {
						target.css('transition', '');
					}, Messia.stickyTransition);

				}, Messia.stickyTransition / 2);

				target.data('focusInInt', int);
			},
			textareaFocusout: function (e) {

				var target = $(this);

				clearTimeout(target.data('focusInInt'));

				target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');
				target.css('height', target.data('init_height'));

				var int_1 = setTimeout(function () {
					target.css('width', '');
				}, Messia.stickyTransition / 4);

				var int_2 = setTimeout(function () {
					target.css('transition', '');
					target.css('height', '');
				}, Messia.stickyTransition + Messia.stickyTransition / 4);

				target.data('focusOutInt_1', int_1);
				target.data('focusOutInt_2', int_2);
			},
			codemirrorKeyup: function (codeMirror, event) {

				var target = $(codeMirror.getWrapperElement());

				var blockHeight = target.outerHeight();
				var codeHeight = codeMirror.getScrollerElement().scrollHeight;
				var borders = parseInt(target.css('borderTopWidth')) + parseInt(target.css('borderBottomWidth'));

				if (blockHeight <= codeHeight) {

					target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');
					target.css('height', target.find('.CodeMirror-sizer').prop('scrollHeight') + borders);
					setTimeout(function () {
						target.css('transition', '');
					}, Messia.stickyTransition);
				}
			},
			codemirrorFocusin: function (codeMirror, event) {

				var target = $(codeMirror.getWrapperElement());
				target.data('init_height', target.outerHeight());

				target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');

				clearTimeout(target.data('focusOutInt_1'));
				clearTimeout(target.data('focusOutInt_2'));
				target.css('width', '100%');

				codeMirror.refresh();
			},
			codemirrorsFocusout: function (codeMirror, event) {

				var target = $(codeMirror.getWrapperElement());

				target.css('transition', 'all ' + Messia.stickyTransition + 'ms cubic-bezier(0.71, -0.01, 0.26, 0.98)');
				clearTimeout(target.data('focusInInt_1'));
				clearTimeout(target.data('focusInInt_2'));

				target.css('height', target.data('init_height'));

				var int_1 = setTimeout(function () {
					target.css('width', '');
				}, Messia.stickyTransition / 4);

				var int_2 = setTimeout(function () {
					target.css('transition', '');
					target.css('height', '');
				}, Messia.stickyTransition + Messia.stickyTransition / 4);

				target.data('focusOutInt_1', int_1);
				target.data('focusOutInt_2', int_2);
			},
			codeMirrorRefresh: function (codeMirror) {

				var K = 2;
				var target = $(codeMirror.getWrapperElement());
				var sizer = target.find('.CodeMirror-sizer').prop('scrollHeight');

				var int_1 = setTimeout(function () {

					var borders = parseInt(target.css('borderTopWidth')) + parseInt(target.css('borderBottomWidth'));
					var blockHeight = target.prop('scrollHeight');
					var codeHeight = codeMirror.getScrollerElement().scrollHeight;

					if (codeHeight <= blockHeight) {
						return;
					};

					target.css('height', target.data('init_height'));
					target.css('height', sizer + borders);

				}, Messia.stickyTransition / K);

				var int_2 = setTimeout(function () {
					target.css('transition', '');
				}, Messia.stickyTransition * K);

				target.data('focusInInt_1', int_1);
				target.data('focusInInt_2', int_2);
			},
			requireNameOption: function () {
				var option = $('form[action="options.php"] #require_name_email');
				if (option.length === 0) {
					return;
				}

				var cloned = option.attr('type', 'radio').parent('label').clone(true).attr('for', 'require_name').insertAfter(option.parent('label'));
				cloned.get(0).childNodes[1].textContent = ' ' + messiaVars.messages.requireName;
				cloned.find('input').attr({
					'value': '',
					'id': 'require_name',
				});
				$('<br>').insertBefore(cloned);

				if (cloned.find('input').prop('checked') === true) {
					cloned.find('input').prop('checked', false);
					option.prop('checked', true);
				}
				else {
					cloned.find('input').prop('checked', true);
				}
			},
			reinitFragments: function (e) {
				$.fn.messiaInitSelect2([
					{
						selector: $(e.target).find('select'),
						arguments: {
							placeholder: messiaVars.messages.selectOptions,
							minimumResultsForSearch: Infinity,
							width: '100%',
						},
					},
				]);
			},
			setDirtyActions: function (e) {
				$(window).off('beforeunload', Messia.beforeunload);
				$(window).on('beforeunload', Messia.beforeunload);
				$(document).data('messiaDirty', true);
			},
			clearDirtyActions: function (e) {
				$(window).off('beforeunload', Messia.beforeunload);
				$(document).data('messiaDirty', false);
			},
			beforeunload: function (e) {
				return true;
			},
		}

		$(document).ajaxSuccess(Messia.ajaxSuccess);

		Messia.requireNameOption();

		if (true === $.fn.messiaIsMobile()) {
			Messia.select2Multiple = '[multiple]';
			Messia.select2Async = '.async';
		}
		$.fn.messiaInitSelect2([
			{	// termin page
				selector: $(`select[id="category_parent"]${Messia.select2Multiple}, select[id="category_parent"]${Messia.select2Async}`),
				arguments: {
					placeholder: messiaVars.messages.selectOptions,
					minimumResultsForSearch: Infinity,
				},
			},
			{	// termin page
				selector: $(`select[id="property_group"]${Messia.select2Multiple}, select[id="property_group"]${Messia.select2Async}`),
				arguments: {
					minimumResultsForSearch: Infinity,
				},
			},
			{	// object page
				selector: $(`.metabox-constructor-fields select${Messia.select2Multiple}, .metabox-constructor-fields select${Messia.select2Async}`),
				arguments: {
					placeholder: messiaVars.messages.selectOptions,
					minimumResultsForSearch: Infinity,
					width: '100%',
				},
			},
		]);

		$('body').on('objectMetaboxUpdated', Messia.reinitFragments);
		$(document).on('messiaContentIsDirty', Messia.setDirtyActions);
		$(document).on('messiaContentIsSaved', Messia.clearDirtyActions);
	});
})(jQuery);

/***/ }),

/***/ "./src/js/_components/_loader.js":
/*!***************************************!*\
  !*** ./src/js/_components/_loader.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/**
 * Animated spinner.
 *
 * @param {string} showHide Show or hide.
 * @param {string} selector JQ element to append loader to.
 *
 * @return Promise.
 */
const loaderFn = (showHide, selector) => {
	const $ = jQuery;

	if (showHide === 'show') {
		return new Promise(
			resolve => {
				if ($(`${selector} > .messia-spinner`).length > 0) {
					resolve('done');
				}
				$(selector).append('<div class="messia-spinner"><div class="loading"><i></i><i></i><i></i><i></i></div></div>');
				$('.overlay').addClass('overlay-show');
				resolve('done');
			}
		);

	} else if (showHide === 'hide') {

		return new Promise(
			resolve => {
				$(selector).find('.messia-spinner').animate({
					opacity: 0,
				}, 100, "swing", function () {
					$(this).remove();
					$('.overlay').removeClass('overlay-show');
					resolve('done');
				});
			}
		);
	}
};

__webpack_require__.g.MessiaExt = __webpack_require__.g.MessiaExt || {};
__webpack_require__.g.MessiaExt = {
	...__webpack_require__.g.MessiaExt,
	...{ loader: loaderFn }
};

/***/ }),

/***/ "./src/js/_components/_logger.js":
/*!***************************************!*\
  !*** ./src/js/_components/_logger.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/**
 * Console logger. Self invoked.
 *
 * @return {object} Callbacks.
 */
const loggerFn = (() => {

	const methodToColorMap = {
		debug: '#7f8c8d',
		log: '#2ecc71',
		warn: '#f39c12',
		error: '#c0392b',
		table: '#c0392b',
	};

	const print = function (method, args) {
		const
			styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.3em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`],
			logPrefix = ['%cmessia', styles.join(';')];

		if (messiaVars.scriptDebug === false) {
			return;
		}

		console[method](...logPrefix, ...args);
	}

	const api = {};
	const loggerMethods = Object.keys(methodToColorMap);

	for (const key of loggerMethods) {
		const method = key;

		api[method] = (...args) => {
			print(method, args);
		};
	}

	return api;
})();

__webpack_require__.g.MessiaExt = __webpack_require__.g.MessiaExt || {};
__webpack_require__.g.MessiaExt = {
	...__webpack_require__.g.MessiaExt,
	...{logger: loggerFn}
};

/***/ }),

/***/ "./src/js/_components/_worker_dispatcher.js":
/*!**************************************************!*\
  !*** ./src/js/_components/_worker_dispatcher.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Register and start web workers.
 *
 * @return void.
 */
const workerDispatcher = (() => {
	if ('serviceWorker' in navigator) {

		navigator.serviceWorker.addEventListener('message', (message) => {
			const info = message.data;

			if (info.type === 'logger') {
				MessiaExt.logger[info.method](info.body);
			}
		});

		if (messiaVars.pwaEnable === 1) {

			const
				cacheAvailable = 'caches' in self,
				indexedDbAvailable = 'indexedDB' in self;

			const promptUpdate = (registration) => {
				const choice = window.confirm(messiaVars.messages.workerUpdate);

				if (choice) {
					navigator.serviceWorker.addEventListener('controllerchange', () => {
						// nothing for now.
					});
				}

				if (registration && registration.waiting) {
					registration.waiting.postMessage({ command: 'messiaSkipWaiting' });
				}
			};

			navigator
				.serviceWorker
				.register(messiaVars.workerUrl, { scope: '/' })
				.then((registration) => {
					MessiaExt.logger.log(`Worker registration succeeded. Scope is ${registration.scope}`);

					if (false === indexedDbAvailable) {
						MessiaExt.logger.warn('Worker will skip caching cause the browser does not support indexedDB.');
					} else if (false === cacheAvailable) {
						MessiaExt.logger.warn('Worker will skip caching cause the browser does not support cache storage.');
					}

					if (registration.waiting) {
						promptUpdate(registration);
					}
				})
				.catch((error) => {
					MessiaExt.logger.error('Worker registration failed with ' + error);
				});

		} else {
			navigator
				.serviceWorker
				.getRegistrations().then((registrations) => {

					if (registrations.length) {
						for (let registration of registrations) {
							registration.active.postMessage({ command: 'messiaUnregisterSelf' });
						}
					}
				});
		}
	}
})();

/* harmony default export */ __webpack_exports__["default"] = (workerDispatcher);

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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!**********************************************!*\
  !*** ./src/entries/backend/entry-backend.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_backend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/backend.scss */ "./src/scss/_backend/backend.scss");
/* harmony import */ var _js_backend_backend_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/backend.js */ "./src/js/_backend/backend.js");
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvYmFja2VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbUM7QUFDQTtBQUNXOztBQUU5Qzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixzQkFBc0I7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxpQkFBaUI7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUSxJQUFJLGtCQUFrQjtBQUNyRTs7QUFFQTtBQUNBLHdEQUF3RCx1QkFBdUI7QUFDL0U7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFELGtCQUFrQjtBQUN2RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QjtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZUFBZTtBQUNwRSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx5Q0FBeUM7QUFDekMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ04sTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07O0FBRU4sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwrQ0FBK0MsdUJBQXVCLGdDQUFnQyxvQkFBb0I7QUFDMUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixLQUFLO0FBQ0wsOENBQThDLHVCQUF1QiwrQkFBK0Isb0JBQW9CO0FBQ3hIO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKLEtBQUs7QUFDTCxxREFBcUQsdUJBQXVCLHNDQUFzQyxvQkFBb0I7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOzs7Ozs7Ozs7O0FDbmdCRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFNLGFBQWEscUJBQU07QUFDekIscUJBQU07QUFDTixJQUFJLHFCQUFNO0FBQ1YsTUFBTTtBQUNOOzs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIseUJBQXlCO0FBQ3JELDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxxQkFBTSxhQUFhLHFCQUFNO0FBQ3pCLHFCQUFNO0FBQ04sSUFBSSxxQkFBTTtBQUNWLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQSx3Q0FBd0MsOEJBQThCO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xEO0FBQ0EscUVBQXFFLG1CQUFtQjs7QUFFeEY7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsaUNBQWlDO0FBQzFFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7O0FBRUQsK0RBQWUsZ0JBQWdCOzs7Ozs7VUN2RS9CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMEM7O0FBRTFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvX2JhY2tlbmQvYmFja2VuZC5zY3NzPzhiOTQiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL2JhY2tlbmQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL193b3JrZXJfZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9lbnRyeS1iYWNrZW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vX2NvbXBvbmVudHMvX2xvZ2dlci5qcyc7XG5pbXBvcnQgJy4uL19jb21wb25lbnRzL19sb2FkZXIuanMnO1xuaW1wb3J0ICcuLi9fY29tcG9uZW50cy9fd29ya2VyX2Rpc3BhdGNoZXIuanMnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHR2YXIgTWVzc2lhO1xuXG5cdFx0JC5mbi5tZXNzaWFTdGlja3lUZXh0YXJlYSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgdGhpcyAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRNZXNzaWEuc3RpY2t5VGV4dGFyZWEodGhpcyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCQuZm4ubWVzc2lhU3RpY2t5Q29kZU1pcnJvciA9IGZ1bmN0aW9uIChjb2RlTWlycm9ycykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlTWlycm9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRNZXNzaWEuc3RpY2t5Q29kZU1pcnJvcihjb2RlTWlycm9yc1tpXSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCQuZm4ubWVzc2lhQXBwZW5kTWVkaWFTZWxlY3Rpb24gPSBmdW5jdGlvbiAoY2FsbGVyLCBzZWxlY3Rpb24pIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0bGV0IGFwcGVuZDtcblx0XHRcdFx0bGV0IHRtcGwgPSBjYWxsZXIuY2xvbmUoKTtcblxuXHRcdFx0XHRzd2l0Y2ggKHNlbGVjdGlvbltpXS50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnd3AtaW1hZ2UnOlxuXHRcdFx0XHRcdFx0YXBwZW5kID0gYDxpbWcgY2xhc3M9XCJpbWFnZVwiIHNyYz1cIiR7c2VsZWN0aW9uW2ldLnVybH1cIi8+YDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnaWNvbic6XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKHNlbGVjdGlvbltpXS5pY29uU2V0SWQpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAnZ29vZ2xlLW1hdGVyaWFsJzpcblx0XHRcdFx0XHRcdFx0XHRsZXQgY2xhc3NlcyA9IHNlbGVjdGlvbltpXS52YXJpYW50LmNzc0NsYXNzLmpvaW4oJyAnKTtcblx0XHRcdFx0XHRcdFx0XHRhcHBlbmQgPSBgPHNwYW4gY2xhc3M9XCJpbWFnZSAke2NsYXNzZXN9XCI+JHtzZWxlY3Rpb25baV0uaWNvbn08L3NwYW4+YDtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKGBVbmtub3duIGljb24gc2V0IGlkOiAke3NlbGVjdGlvbltpXS5pY29uU2V0SWR9YCkpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoYFVua25vd24gaW1hZ2UgdHlwZTogJHtzZWxlY3Rpb25baV0udHlwZX1gKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY2FsbGVyLmhhc0NsYXNzKCdtdWx0aXBsZScpKSB7XG5cdFx0XHRcdFx0dG1wbC5yZW1vdmVDbGFzcyhbJ211bHRpcGxlJywgJ3RlbXBsYXRlJ10pLmZpbmQoJy5pbWFnZScpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdHRtcGwuZGF0YSgnaW1hZ2VpbmZvJywgc2VsZWN0aW9uW2ldKS5hcHBlbmQoYXBwZW5kKTtcblx0XHRcdFx0XHR0bXBsLmZpbmQoJy5wbGFjZWhvbGRlci1pbWFnZScpLnJlbW92ZUNsYXNzKCdwbGFjZWhvbGRlci1pbWFnZScpLmFkZENsYXNzKCdyZW1vdmUtaW1hZ2UnKS5hZnRlcignPHNwYW4gY2xhc3M9XCJlZGl0LWxpbmtcIj48L3NwYW4+Jyk7XG5cdFx0XHRcdFx0dG1wbC5pbnNlcnRCZWZvcmUoY2FsbGVyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjYWxsZXIuZmluZCgnLmltYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0Y2FsbGVyLmRhdGEoJ2ltYWdlaW5mbycsIHNlbGVjdGlvbltpXSkuYXBwZW5kKGFwcGVuZCk7XG5cdFx0XHRcdFx0Y2FsbGVyLmZpbmQoJy5wbGFjZWhvbGRlci1pbWFnZScpLnJlbW92ZUNsYXNzKCdwbGFjZWhvbGRlci1pbWFnZScpLmFkZENsYXNzKCdyZW1vdmUtaW1hZ2UnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG93IGN1c3RvbSBwb3B1cC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gdGl0bGUgICBQb3B1cCB0aXRsZSB0ZXh0LlxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gY29udGVudCBJbm5lciBIVE1MLlxuXHRcdCAqIEBwYXJhbSAge2Jvb2x9ICAgY29uZmlybSBXaXRoIGNvbmZpcm0gb3Igbm90LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7b2JqZWN0fSBqUVVJIHdpZGdldCBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHQkLmZuLm1lc3NpYU1vZGFsV2FybmluZyA9IGZ1bmN0aW9uICh0aXRsZSwgY29udGVudCwgYnV0dG9ucyA9IGZhbHNlKSB7XG5cdFx0XHRyZXR1cm4gTWVzc2lhLmRpYWxvZ09wZW4oTWVzc2lhLmRpYWxvZ19vYmplY3QsIHRpdGxlLCBjb250ZW50LCBidXR0b25zKTtcblx0XHR9O1xuXG5cdFx0JC5mbi5tZXNzaWFJc01vYmlsZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIG1vYmlsZV9wbGF0Zm9ybSA9IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblx0XHRcdGlmIChtb2JpbGVfcGxhdGZvcm0pIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdCQuZm4ubWVzc2lhSW5pdFNlbGVjdDIgPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoc2VsZWN0b3JzW2ldLnNlbGVjdG9yLmhhc0NsYXNzKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJykpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxlY3RvcnNbaV0uc2VsZWN0b3Iuc2VsZWN0MihzZWxlY3RvcnNbaV0uYXJndW1lbnRzKTtcblx0XHRcdFx0c2VsZWN0b3JzW2ldLnNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3NlbGVjdDJDaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0TWVzc2lhID0ge1xuXHRcdFx0c2VsZWN0Mk11bHRpcGxlOiAnJyxcblx0XHRcdHNlbGVjdDJBc3luYzogJycsXG5cdFx0XHRzdGlja3lUcmFuc2l0aW9uOiA2MDAsXG5cdFx0XHRkaWFsb2dfb2JqZWN0OiAkKCcjbWVzc2lhX21vZGFsX3dhcm5pbmcnKSxcblx0XHRcdGRpYWxvZ19hcmc6IHtcblx0XHRcdFx0YXV0b09wZW46IGZhbHNlLFxuXHRcdFx0XHRtb2RhbDogdHJ1ZSxcblx0XHRcdFx0YXBwZW5kVG86ICdib2R5Jyxcblx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdGVmZmVjdDogXCJkcm9wXCIsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiAndXAnLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiAyNTBcblx0XHRcdFx0fSxcblx0XHRcdFx0aGlkZToge1xuXHRcdFx0XHRcdGVmZmVjdDogXCJkcm9wXCIsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiAnZG93bicsXG5cdFx0XHRcdFx0ZHVyYXRpb246IDI1MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkgeyB9LFxuXHRcdFx0XHRvcGVuOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7IH0sXG5cdFx0XHRcdGNsb3NlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5kaWFsb2coJ2Rlc3Ryb3knKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRteTogJ2NlbnRlciBjZW50ZXInLFxuXHRcdFx0XHRcdGF0OiAnY2VudGVyIGNlbnRlcicsXG5cdFx0XHRcdFx0b2Y6IHdpbmRvd1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQvL21heEhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIC0gMTAwLFxuXHRcdFx0XHQvL21heFdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSAtIDEwMCxcblx0XHRcdFx0bWluV2lkdGg6ICQod2luZG93KS53aWR0aCgpIC8gMixcblx0XHRcdFx0bWluSGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgLyAzLFxuXHRcdFx0XHQvL2hlaWdodFx0OiAnYXV0bycsXG5cdFx0XHRcdC8vd2lkdGhcdFx0OiAnYXV0bycsXG5cdFx0XHR9LFxuXHRcdFx0ZGlhbG9nT3BlbjogZnVuY3Rpb24gKGRpYWxvZ09iamVjdCwgZGlhbG9nVGl0bGUsIGRpYWxvZ0NvbnRlbnQsIGJ1dHRvbnMgPSBmYWxzZSkge1xuXG5cdFx0XHRcdGRpYWxvZ09iamVjdC5kaWFsb2coTWVzc2lhLmRpYWxvZ19hcmcpO1xuXHRcdFx0XHRkaWFsb2dPYmplY3QuZGlhbG9nKCdpbnN0YW5jZScpLmVsZW1lbnQuZW1wdHkoKS5odG1sKGRpYWxvZ0NvbnRlbnQpO1xuXG5cdFx0XHRcdGlmIChkaWFsb2dUaXRsZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRkaWFsb2dPYmplY3QuZGlhbG9nKCdpbnN0YW5jZScpLnVpRGlhbG9nVGl0bGViYXIuZmluZCgnLnVpLWRpYWxvZy10aXRsZScpLnRleHQoZGlhbG9nVGl0bGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGJ1dHRvbnMgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dmFyIGRpYWxvZ0NsYXNzID0gJ21lc3NpYS1jb3JlLWRpYWxvZy13YXJuaW5nJztcblx0XHRcdFx0XHR2YXIgYnV0dG9ucyA9IFt7XG5cdFx0XHRcdFx0XHR0ZXh0OiAkKHRoaXMpLmdldCgwKS5kaWFsb2dfb2JqZWN0LmRhdGEoJ3NldHRpbmdzJykuYnV0dG9uX1RleHQsXG5cdFx0XHRcdFx0XHRjbGljazogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9XTtcblx0XHRcdFx0fSBlbHNlIGlmIChidXR0b25zLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHZhciBkaWFsb2dDbGFzcyA9ICdtZXNzaWEtY29yZS1kaWFsb2ctd2FybmluZyBuby1jbG9zZSc7XG5cdFx0XHRcdFx0dmFyIF9idXR0b25zID0ge1xuXHRcdFx0XHRcdFx0J0NhbmNlbCc6IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnRyaWdnZXIoJ2RpYWxvZ0Nsb3NlZCcsIFsnY2FuY2VsJ10pO1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCdPSyc6IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnRyaWdnZXIoJ2RpYWxvZ0Nsb3NlZCcsIFsnb2snXSk7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZGlhbG9nQ2xhc3MgPSAnbWVzc2lhLWNvcmUtZGlhbG9nLXdhcm5pbmcgbm8tY2xvc2UnO1xuXHRcdFx0XHRcdHZhciBfYnV0dG9ucyA9IGJ1dHRvbnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGlhbG9nT2JqZWN0LmRpYWxvZygnb3B0aW9uJywge1xuXHRcdFx0XHRcdGRpYWxvZ0NsYXNzOiBkaWFsb2dDbGFzcyxcblx0XHRcdFx0XHRidXR0b25zOiBfYnV0dG9ucyxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0ZGlhbG9nT2JqZWN0LmRpYWxvZygnd2lkZ2V0JykuZHJhZ2dhYmxlKCdvcHRpb24nLCB7XG5cdFx0XHRcdFx0J3Njcm9sbCc6IGZhbHNlLFxuXHRcdFx0XHRcdCdjb250YWlubWVudCc6ICd3aW5kb3cnLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRkaWFsb2dPYmplY3QuZGlhbG9nKCdvcGVuJyk7XG5cdFx0XHRcdCQoJy5jdXN0b20tc2NvcGUgLnVpLXdpZGdldC1vdmVybGF5JykuY3NzKHtcblx0XHRcdFx0XHQnYmFja2dyb3VuZCc6ICcjMDAwMDAwJyxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGRpYWxvZ09iamVjdC5kaWFsb2coJ2luc3RhbmNlJyk7XG5cdFx0XHR9LFxuXHRcdFx0YWpheFJlc3BvbnNlRmlsbDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9ICQoJyNhamF4LXJlc3BvbnNlJyk7XG5cblx0XHRcdFx0aWYgKGZhbHNlID09PSB0YXJnZXQucHJldigpLmhhc0NsYXNzKCd3cC1oZWFkZXItZW5kJykpIHtcblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSAkKCcjd3Bib2R5IC53cmFwIC53cC1oZWFkZXItZW5kJyk7XG5cdFx0XHRcdFx0aWYgKHBvc2l0aW9uLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9IHBvc2l0aW9uLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHR0YXJnZXQuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIocG9zaXRpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXQuZmluZCgnLm1lc3NpYScpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmFwcGVuZChjb250ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBmb3IgY29tbW9uLmpzXG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ3dwLXVwZGF0ZXMtbm90aWNlLWFkZGVkJyk7XG5cdFx0XHR9LFxuXHRcdFx0YWpheFN1Y2Nlc3M6IGZ1bmN0aW9uIChldmVudCwgeGhyLCBzZXR0aW5ncykge1xuXG5cdFx0XHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MuZGF0YSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdE1lc3NpYS5pbmxpbmVTYXZlU3VjY2VzcyhldmVudCwgeGhyLCBzZXR0aW5ncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbmxpbmVTYXZlU3VjY2VzczogZnVuY3Rpb24gKGV2ZW50LCB4aHIsIHNldHRpbmdzKSB7XG5cblx0XHRcdFx0dmFyIGNvbnRlbnQ7XG5cdFx0XHRcdHZhciBkYXRhID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhzZXR0aW5ncy5kYXRhKTtcblxuXHRcdFx0XHRpZiAoTWVzc2lhLmRpYWxvZ19vYmplY3QubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9yZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZGF0YS5nZXQoJ3RheG9ub215JykgPT0gJ21lc3NpYV9vYmplY3Rfc2VnbWVudCcpIHtcblx0XHRcdFx0XHRpZiAoZGF0YS5nZXQoJ2FjdGlvbicpID09ICdpbmxpbmUtc2F2ZS10YXgnKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJtZXNzaWEgbm90aWNlIG5vdGljZS1zdWNjZXNzIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMuc2VnbWVudFBhZ2VVcGRhdGVkICsgJzwvcD48L2Rpdj4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChkYXRhLmdldCgnYWN0aW9uJykgPT0gJ2FkZC10YWcnKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJtZXNzaWEgbm90aWNlIG5vdGljZS1zdWNjZXNzIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMuc2VnbWVudFBhZ2VBZGRlZCArICc8L3A+PC9kaXY+JztcblxuXHRcdFx0XHRcdFx0aWYgKGRhdGEuZ2V0KCdzbHVnJykgPT0gZGF0YS5nZXQoJ2FsaWFzJykgJiYgJycgIT09IGRhdGEuZ2V0KCdzbHVnJykpIHtcblx0XHRcdFx0XHRcdFx0Y29udGVudCA9IGNvbnRlbnQgKyAnPGRpdiBjbGFzcz1cIm1lc3NpYSBub3RpY2Ugbm90aWNlLWVycm9yIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMuc2VnbWVudEFsaWFzU2x1ZyArICc8L3A+PC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoZGF0YS5nZXQoJ2FjdGlvbicpID09ICdkZWxldGUtdGFnJykge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9ICc8ZGl2IGNsYXNzPVwibWVzc2lhIG5vdGljZSBub3RpY2Utd2FybmluZyBpcy1kaXNtaXNzaWJsZVwiPjxwPicgKyBtZXNzaWFWYXJzLm1lc3NhZ2VzLnNlZ21lbnRQYWdlRGVsZXRlZCArICc8L3A+PC9kaXY+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoZGF0YS5nZXQoJ3RheG9ub215JykgPT0gJ21lc3NpYV9vYmplY3RfY2F0ZWdvcnknKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGEuZ2V0KCdhY3Rpb24nKSA9PSAnaW5saW5lLXNhdmUtdGF4Jykge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEuZ2V0KCd0ZXJtX29yZGVyX3Bvc2l0aW9uX3R5cGUnKSAhPT0gJ3Jlc2V0JyB8fCBkYXRhLmdldCgndGVybV9vcmRlcl9wb3NpdGlvbl90eXBlJykgIT09ICdiZWZvcmUnIHx8IGRhdGEuZ2V0KCd0ZXJtX29yZGVyX3Bvc2l0aW9uX3R5cGUnKSAhPT0gJ2FmdGVyJykge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJtZXNzaWEgbm90aWNlIG5vdGljZS1zdWNjZXNzIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMudGVybXNSZW9yZGVyZWQgKyAnPC9wPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGRhdGEuZ2V0KCd0YXhvbm9teScpID09ICdtZXNzaWFfb2JqZWN0X3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdGlmICgoZGF0YS5nZXQoJ2FjdGlvbicpID09ICdpbmxpbmUtc2F2ZS10YXgnIHx8IGRhdGEuZ2V0KCdhY3Rpb24nKSA9PSAnYWRkLXRhZycpICYmIG1lc3NpYVZhcnMucmVzZXJ2ZWRUZXJtcy5tZXNzaWFfb2JqZWN0X3Byb3BlcnR5LmluY2x1ZGVzKGRhdGEuZ2V0KCdzbHVnJykpKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJtZXNzaWEgbm90aWNlIG5vdGljZS1lcnJvciBpcy1kaXNtaXNzaWJsZVwiPjxwPicgKyBtZXNzaWFWYXJzLm1lc3NhZ2VzLnByb3BlcnR5U2x1Z1Jlc2VydmVkICsgJzwvcD48L2Rpdj4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXQoJ2FjdGlvbicpID09ICdpbmxpbmUtc2F2ZS10YXgnKSB7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5nZXQoJ3Rlcm1fb3JkZXJfcG9zaXRpb25fdHlwZScpICE9PSAncmVzZXQnIHx8IGRhdGEuZ2V0KCd0ZXJtX29yZGVyX3Bvc2l0aW9uX3R5cGUnKSAhPT0gJ2JlZm9yZScgfHwgZGF0YS5nZXQoJ3Rlcm1fb3JkZXJfcG9zaXRpb25fdHlwZScpICE9PSAnYWZ0ZXInKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gJzxkaXYgY2xhc3M9XCJtZXNzaWEgbm90aWNlIG5vdGljZS1zdWNjZXNzIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMudGVybXNSZW9yZGVyZWQgKyAnPC9wPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGRhdGEuZ2V0KCdwb3N0X3R5cGUnKSA9PSAncGFnZScpIHtcblx0XHRcdFx0XHRpZiAoZGF0YS5nZXQoJ2FjdGlvbicpID09ICdpbmxpbmUtc2F2ZScpIHtcblx0XHRcdFx0XHRcdHZhciBsb2NrZWQgPSBCb29sZWFuKHhoci5nZXRSZXNwb25zZUhlYWRlcignTWVzc2lhLVBhZ2UtRWRpdC1Gb3JiaWRkZW4nKSk7XG5cdFx0XHRcdFx0XHRpZiAodHJ1ZSA9PT0gbG9ja2VkKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cIm1lc3NpYSBub3RpY2Ugbm90aWNlLWVycm9yIGlzLWRpc21pc3NpYmxlXCI+PHA+JyArIG1lc3NpYVZhcnMubWVzc2FnZXMuZGVwZW5kYW50UGFnZVVwZFdhcm4gKyAnPC9wPjwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBjb250ZW50ICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0Ly9NZXNzaWEuZGlhbG9nT3BlbihNZXNzaWEuZGlhbG9nX29iamVjdCwgY29udGVudCk7XG5cdFx0XHRcdFx0TWVzc2lhLmFqYXhSZXNwb25zZUZpbGwoY29udGVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzdGlja3lUZXh0YXJlYTogZnVuY3Rpb24gKHRleHRhcmVhKSB7XG5cblx0XHRcdFx0dGV4dGFyZWEub24oJ2tleXVwIGtleXByZXNzJywgTWVzc2lhLnRleHRhcmVhS2V5dXApO1xuXHRcdFx0XHR0ZXh0YXJlYS5vbignZm9jdXNpbicsIE1lc3NpYS50ZXh0YXJlYUZvY3VzaW4pO1xuXHRcdFx0XHR0ZXh0YXJlYS5vbignZm9jdXNvdXQnLCBNZXNzaWEudGV4dGFyZWFGb2N1c291dCk7XG5cdFx0XHR9LFxuXHRcdFx0c3RpY2t5Q29kZU1pcnJvcjogZnVuY3Rpb24gKGNvZGVtaXJyb3IpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChjb2RlbWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkpO1xuXG5cdFx0XHRcdGNvZGVtaXJyb3Iub24oJ2tleXVwJywgTWVzc2lhLmNvZGVtaXJyb3JLZXl1cCk7XG5cdFx0XHRcdGNvZGVtaXJyb3Iub24oJ2ZvY3VzJywgTWVzc2lhLmNvZGVtaXJyb3JGb2N1c2luKTtcblx0XHRcdFx0Y29kZW1pcnJvci5vbignYmx1cicsIE1lc3NpYS5jb2RlbWlycm9yc0ZvY3Vzb3V0KTtcblx0XHRcdFx0Y29kZW1pcnJvci5vbigncmVmcmVzaCcsIE1lc3NpYS5jb2RlTWlycm9yUmVmcmVzaCk7XG5cdFx0XHR9LFxuXHRcdFx0dGV4dGFyZWFLZXl1cDogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKTtcblxuXHRcdFx0XHRpZiAodGFyZ2V0Lm91dGVySGVpZ2h0KCkgPD0gdGFyZ2V0LnByb3AoJ3Njcm9sbEhlaWdodCcpKSB7XG5cblx0XHRcdFx0XHR2YXIgYm9yZGVycyA9IHBhcnNlSW50KHRhcmdldC5jc3MoJ2JvcmRlclRvcFdpZHRoJykpICsgcGFyc2VJbnQodGFyZ2V0LmNzcygnYm9yZGVyQm90dG9tV2lkdGgnKSk7XG5cblx0XHRcdFx0XHR0YXJnZXQuY3NzKCd0cmFuc2l0aW9uJywgJ2FsbCAnICsgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24gKyAnbXMgY3ViaWMtYmV6aWVyKDAuNzEsIC0wLjAxLCAwLjI2LCAwLjk4KScpO1xuXHRcdFx0XHRcdHRhcmdldC5jc3MoJ2hlaWdodCcsIHRhcmdldC5wcm9wKCdzY3JvbGxIZWlnaHQnKSArIGJvcmRlcnMpO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY3NzKCd0cmFuc2l0aW9uJywgJycpO1xuXHRcdFx0XHRcdH0sIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRleHRhcmVhRm9jdXNpbjogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKTtcblx0XHRcdFx0dGFyZ2V0LmRhdGEoJ2luaXRfaGVpZ2h0JywgdGFyZ2V0Lm91dGVySGVpZ2h0KCkpO1xuXG5cdFx0XHRcdHRhcmdldC5jc3MoJ3RyYW5zaXRpb24nLCAnYWxsICcgKyBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbiArICdtcyBjdWJpYy1iZXppZXIoMC43MSwgLTAuMDEsIDAuMjYsIDAuOTgpJyk7XG5cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRhcmdldC5kYXRhKCdmb2N1c091dEludF8xJykpO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGFyZ2V0LmRhdGEoJ2ZvY3VzT3V0SW50XzInKSk7XG5cblx0XHRcdFx0dGFyZ2V0LmNzcygnd2lkdGgnLCAnMTAwJScpO1xuXG5cdFx0XHRcdHZhciBpbnQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdHZhciBzY3JvbGxIZWlnaHQgPSB0YXJnZXQucHJvcCgnc2Nyb2xsSGVpZ2h0Jyk7XG5cdFx0XHRcdFx0dmFyIHJlYWxIZWlnaHQgPSB0YXJnZXQuZGF0YSgnaW5pdF9oZWlnaHQnKTtcblx0XHRcdFx0XHR2YXIgYm9yZGVycyA9IHBhcnNlSW50KHRhcmdldC5jc3MoJ2JvcmRlclRvcFdpZHRoJykpICsgcGFyc2VJbnQodGFyZ2V0LmNzcygnYm9yZGVyQm90dG9tV2lkdGgnKSk7XG5cblx0XHRcdFx0XHR0YXJnZXQuY3NzKCdoZWlnaHQnLCB0YXJnZXQuZGF0YSgnaW5pdF9oZWlnaHQnKSk7XG5cblx0XHRcdFx0XHRpZiAoc2Nyb2xsSGVpZ2h0IDw9IHJlYWxIZWlnaHQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dGFyZ2V0LmNzcygnaGVpZ2h0JywgdGFyZ2V0LnByb3AoJ3Njcm9sbEhlaWdodCcpICsgYm9yZGVycyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jc3MoJ3RyYW5zaXRpb24nLCAnJyk7XG5cdFx0XHRcdFx0fSwgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24pO1xuXG5cdFx0XHRcdH0sIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uIC8gMik7XG5cblx0XHRcdFx0dGFyZ2V0LmRhdGEoJ2ZvY3VzSW5JbnQnLCBpbnQpO1xuXHRcdFx0fSxcblx0XHRcdHRleHRhcmVhRm9jdXNvdXQ6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9ICQodGhpcyk7XG5cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRhcmdldC5kYXRhKCdmb2N1c0luSW50JykpO1xuXG5cdFx0XHRcdHRhcmdldC5jc3MoJ3RyYW5zaXRpb24nLCAnYWxsICcgKyBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbiArICdtcyBjdWJpYy1iZXppZXIoMC43MSwgLTAuMDEsIDAuMjYsIDAuOTgpJyk7XG5cdFx0XHRcdHRhcmdldC5jc3MoJ2hlaWdodCcsIHRhcmdldC5kYXRhKCdpbml0X2hlaWdodCcpKTtcblxuXHRcdFx0XHR2YXIgaW50XzEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0YXJnZXQuY3NzKCd3aWR0aCcsICcnKTtcblx0XHRcdFx0fSwgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24gLyA0KTtcblxuXHRcdFx0XHR2YXIgaW50XzIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0YXJnZXQuY3NzKCd0cmFuc2l0aW9uJywgJycpO1xuXHRcdFx0XHRcdHRhcmdldC5jc3MoJ2hlaWdodCcsICcnKTtcblx0XHRcdFx0fSwgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24gKyBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbiAvIDQpO1xuXG5cdFx0XHRcdHRhcmdldC5kYXRhKCdmb2N1c091dEludF8xJywgaW50XzEpO1xuXHRcdFx0XHR0YXJnZXQuZGF0YSgnZm9jdXNPdXRJbnRfMicsIGludF8yKTtcblx0XHRcdH0sXG5cdFx0XHRjb2RlbWlycm9yS2V5dXA6IGZ1bmN0aW9uIChjb2RlTWlycm9yLCBldmVudCkge1xuXG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKGNvZGVNaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKSk7XG5cblx0XHRcdFx0dmFyIGJsb2NrSGVpZ2h0ID0gdGFyZ2V0Lm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcdHZhciBjb2RlSGVpZ2h0ID0gY29kZU1pcnJvci5nZXRTY3JvbGxlckVsZW1lbnQoKS5zY3JvbGxIZWlnaHQ7XG5cdFx0XHRcdHZhciBib3JkZXJzID0gcGFyc2VJbnQodGFyZ2V0LmNzcygnYm9yZGVyVG9wV2lkdGgnKSkgKyBwYXJzZUludCh0YXJnZXQuY3NzKCdib3JkZXJCb3R0b21XaWR0aCcpKTtcblxuXHRcdFx0XHRpZiAoYmxvY2tIZWlnaHQgPD0gY29kZUhlaWdodCkge1xuXG5cdFx0XHRcdFx0dGFyZ2V0LmNzcygndHJhbnNpdGlvbicsICdhbGwgJyArIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uICsgJ21zIGN1YmljLWJlemllcigwLjcxLCAtMC4wMSwgMC4yNiwgMC45OCknKTtcblx0XHRcdFx0XHR0YXJnZXQuY3NzKCdoZWlnaHQnLCB0YXJnZXQuZmluZCgnLkNvZGVNaXJyb3Itc2l6ZXInKS5wcm9wKCdzY3JvbGxIZWlnaHQnKSArIGJvcmRlcnMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNzcygndHJhbnNpdGlvbicsICcnKTtcblx0XHRcdFx0XHR9LCBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjb2RlbWlycm9yRm9jdXNpbjogZnVuY3Rpb24gKGNvZGVNaXJyb3IsIGV2ZW50KSB7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9ICQoY29kZU1pcnJvci5nZXRXcmFwcGVyRWxlbWVudCgpKTtcblx0XHRcdFx0dGFyZ2V0LmRhdGEoJ2luaXRfaGVpZ2h0JywgdGFyZ2V0Lm91dGVySGVpZ2h0KCkpO1xuXG5cdFx0XHRcdHRhcmdldC5jc3MoJ3RyYW5zaXRpb24nLCAnYWxsICcgKyBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbiArICdtcyBjdWJpYy1iZXppZXIoMC43MSwgLTAuMDEsIDAuMjYsIDAuOTgpJyk7XG5cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRhcmdldC5kYXRhKCdmb2N1c091dEludF8xJykpO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGFyZ2V0LmRhdGEoJ2ZvY3VzT3V0SW50XzInKSk7XG5cdFx0XHRcdHRhcmdldC5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcblxuXHRcdFx0XHRjb2RlTWlycm9yLnJlZnJlc2goKTtcblx0XHRcdH0sXG5cdFx0XHRjb2RlbWlycm9yc0ZvY3Vzb3V0OiBmdW5jdGlvbiAoY29kZU1pcnJvciwgZXZlbnQpIHtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChjb2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkpO1xuXG5cdFx0XHRcdHRhcmdldC5jc3MoJ3RyYW5zaXRpb24nLCAnYWxsICcgKyBNZXNzaWEuc3RpY2t5VHJhbnNpdGlvbiArICdtcyBjdWJpYy1iZXppZXIoMC43MSwgLTAuMDEsIDAuMjYsIDAuOTgpJyk7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0YXJnZXQuZGF0YSgnZm9jdXNJbkludF8xJykpO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGFyZ2V0LmRhdGEoJ2ZvY3VzSW5JbnRfMicpKTtcblxuXHRcdFx0XHR0YXJnZXQuY3NzKCdoZWlnaHQnLCB0YXJnZXQuZGF0YSgnaW5pdF9oZWlnaHQnKSk7XG5cblx0XHRcdFx0dmFyIGludF8xID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNzcygnd2lkdGgnLCAnJyk7XG5cdFx0XHRcdH0sIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uIC8gNCk7XG5cblx0XHRcdFx0dmFyIGludF8yID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNzcygndHJhbnNpdGlvbicsICcnKTtcblx0XHRcdFx0XHR0YXJnZXQuY3NzKCdoZWlnaHQnLCAnJyk7XG5cdFx0XHRcdH0sIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uICsgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24gLyA0KTtcblxuXHRcdFx0XHR0YXJnZXQuZGF0YSgnZm9jdXNPdXRJbnRfMScsIGludF8xKTtcblx0XHRcdFx0dGFyZ2V0LmRhdGEoJ2ZvY3VzT3V0SW50XzInLCBpbnRfMik7XG5cdFx0XHR9LFxuXHRcdFx0Y29kZU1pcnJvclJlZnJlc2g6IGZ1bmN0aW9uIChjb2RlTWlycm9yKSB7XG5cblx0XHRcdFx0dmFyIEsgPSAyO1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChjb2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkpO1xuXHRcdFx0XHR2YXIgc2l6ZXIgPSB0YXJnZXQuZmluZCgnLkNvZGVNaXJyb3Itc2l6ZXInKS5wcm9wKCdzY3JvbGxIZWlnaHQnKTtcblxuXHRcdFx0XHR2YXIgaW50XzEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdHZhciBib3JkZXJzID0gcGFyc2VJbnQodGFyZ2V0LmNzcygnYm9yZGVyVG9wV2lkdGgnKSkgKyBwYXJzZUludCh0YXJnZXQuY3NzKCdib3JkZXJCb3R0b21XaWR0aCcpKTtcblx0XHRcdFx0XHR2YXIgYmxvY2tIZWlnaHQgPSB0YXJnZXQucHJvcCgnc2Nyb2xsSGVpZ2h0Jyk7XG5cdFx0XHRcdFx0dmFyIGNvZGVIZWlnaHQgPSBjb2RlTWlycm9yLmdldFNjcm9sbGVyRWxlbWVudCgpLnNjcm9sbEhlaWdodDtcblxuXHRcdFx0XHRcdGlmIChjb2RlSGVpZ2h0IDw9IGJsb2NrSGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHRhcmdldC5jc3MoJ2hlaWdodCcsIHRhcmdldC5kYXRhKCdpbml0X2hlaWdodCcpKTtcblx0XHRcdFx0XHR0YXJnZXQuY3NzKCdoZWlnaHQnLCBzaXplciArIGJvcmRlcnMpO1xuXG5cdFx0XHRcdH0sIE1lc3NpYS5zdGlja3lUcmFuc2l0aW9uIC8gSyk7XG5cblx0XHRcdFx0dmFyIGludF8yID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNzcygndHJhbnNpdGlvbicsICcnKTtcblx0XHRcdFx0fSwgTWVzc2lhLnN0aWNreVRyYW5zaXRpb24gKiBLKTtcblxuXHRcdFx0XHR0YXJnZXQuZGF0YSgnZm9jdXNJbkludF8xJywgaW50XzEpO1xuXHRcdFx0XHR0YXJnZXQuZGF0YSgnZm9jdXNJbkludF8yJywgaW50XzIpO1xuXHRcdFx0fSxcblx0XHRcdHJlcXVpcmVOYW1lT3B0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBvcHRpb24gPSAkKCdmb3JtW2FjdGlvbj1cIm9wdGlvbnMucGhwXCJdICNyZXF1aXJlX25hbWVfZW1haWwnKTtcblx0XHRcdFx0aWYgKG9wdGlvbi5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2xvbmVkID0gb3B0aW9uLmF0dHIoJ3R5cGUnLCAncmFkaW8nKS5wYXJlbnQoJ2xhYmVsJykuY2xvbmUodHJ1ZSkuYXR0cignZm9yJywgJ3JlcXVpcmVfbmFtZScpLmluc2VydEFmdGVyKG9wdGlvbi5wYXJlbnQoJ2xhYmVsJykpO1xuXHRcdFx0XHRjbG9uZWQuZ2V0KDApLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSAnICcgKyBtZXNzaWFWYXJzLm1lc3NhZ2VzLnJlcXVpcmVOYW1lO1xuXHRcdFx0XHRjbG9uZWQuZmluZCgnaW5wdXQnKS5hdHRyKHtcblx0XHRcdFx0XHQndmFsdWUnOiAnJyxcblx0XHRcdFx0XHQnaWQnOiAncmVxdWlyZV9uYW1lJyxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCQoJzxicj4nKS5pbnNlcnRCZWZvcmUoY2xvbmVkKTtcblxuXHRcdFx0XHRpZiAoY2xvbmVkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y2xvbmVkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHRcdFx0XHRvcHRpb24ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNsb25lZC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlaW5pdEZyYWdtZW50czogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0JC5mbi5tZXNzaWFJbml0U2VsZWN0MihbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2VsZWN0b3I6ICQoZS50YXJnZXQpLmZpbmQoJ3NlbGVjdCcpLFxuXHRcdFx0XHRcdFx0YXJndW1lbnRzOiB7XG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiBtZXNzaWFWYXJzLm1lc3NhZ2VzLnNlbGVjdE9wdGlvbnMsXG5cdFx0XHRcdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBJbmZpbml0eSxcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSk7XG5cdFx0XHR9LFxuXHRcdFx0c2V0RGlydHlBY3Rpb25zOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKHdpbmRvdykub2ZmKCdiZWZvcmV1bmxvYWQnLCBNZXNzaWEuYmVmb3JldW5sb2FkKTtcblx0XHRcdFx0JCh3aW5kb3cpLm9uKCdiZWZvcmV1bmxvYWQnLCBNZXNzaWEuYmVmb3JldW5sb2FkKTtcblx0XHRcdFx0JChkb2N1bWVudCkuZGF0YSgnbWVzc2lhRGlydHknLCB0cnVlKTtcblx0XHRcdH0sXG5cdFx0XHRjbGVhckRpcnR5QWN0aW9uczogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0JCh3aW5kb3cpLm9mZignYmVmb3JldW5sb2FkJywgTWVzc2lhLmJlZm9yZXVubG9hZCk7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLmRhdGEoJ21lc3NpYURpcnR5JywgZmFsc2UpO1xuXHRcdFx0fSxcblx0XHRcdGJlZm9yZXVubG9hZDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdCQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzKE1lc3NpYS5hamF4U3VjY2Vzcyk7XG5cblx0XHRNZXNzaWEucmVxdWlyZU5hbWVPcHRpb24oKTtcblxuXHRcdGlmICh0cnVlID09PSAkLmZuLm1lc3NpYUlzTW9iaWxlKCkpIHtcblx0XHRcdE1lc3NpYS5zZWxlY3QyTXVsdGlwbGUgPSAnW211bHRpcGxlXSc7XG5cdFx0XHRNZXNzaWEuc2VsZWN0MkFzeW5jID0gJy5hc3luYyc7XG5cdFx0fVxuXHRcdCQuZm4ubWVzc2lhSW5pdFNlbGVjdDIoW1xuXHRcdFx0e1x0Ly8gdGVybWluIHBhZ2Vcblx0XHRcdFx0c2VsZWN0b3I6ICQoYHNlbGVjdFtpZD1cImNhdGVnb3J5X3BhcmVudFwiXSR7TWVzc2lhLnNlbGVjdDJNdWx0aXBsZX0sIHNlbGVjdFtpZD1cImNhdGVnb3J5X3BhcmVudFwiXSR7TWVzc2lhLnNlbGVjdDJBc3luY31gKSxcblx0XHRcdFx0YXJndW1lbnRzOiB7XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6IG1lc3NpYVZhcnMubWVzc2FnZXMuc2VsZWN0T3B0aW9ucyxcblx0XHRcdFx0XHRtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogSW5maW5pdHksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1x0Ly8gdGVybWluIHBhZ2Vcblx0XHRcdFx0c2VsZWN0b3I6ICQoYHNlbGVjdFtpZD1cInByb3BlcnR5X2dyb3VwXCJdJHtNZXNzaWEuc2VsZWN0Mk11bHRpcGxlfSwgc2VsZWN0W2lkPVwicHJvcGVydHlfZ3JvdXBcIl0ke01lc3NpYS5zZWxlY3QyQXN5bmN9YCksXG5cdFx0XHRcdGFyZ3VtZW50czoge1xuXHRcdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBJbmZpbml0eSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XHQvLyBvYmplY3QgcGFnZVxuXHRcdFx0XHRzZWxlY3RvcjogJChgLm1ldGFib3gtY29uc3RydWN0b3ItZmllbGRzIHNlbGVjdCR7TWVzc2lhLnNlbGVjdDJNdWx0aXBsZX0sIC5tZXRhYm94LWNvbnN0cnVjdG9yLWZpZWxkcyBzZWxlY3Qke01lc3NpYS5zZWxlY3QyQXN5bmN9YCksXG5cdFx0XHRcdGFyZ3VtZW50czoge1xuXHRcdFx0XHRcdHBsYWNlaG9sZGVyOiBtZXNzaWFWYXJzLm1lc3NhZ2VzLnNlbGVjdE9wdGlvbnMsXG5cdFx0XHRcdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IEluZmluaXR5LFxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdF0pO1xuXG5cdFx0JCgnYm9keScpLm9uKCdvYmplY3RNZXRhYm94VXBkYXRlZCcsIE1lc3NpYS5yZWluaXRGcmFnbWVudHMpO1xuXHRcdCQoZG9jdW1lbnQpLm9uKCdtZXNzaWFDb250ZW50SXNEaXJ0eScsIE1lc3NpYS5zZXREaXJ0eUFjdGlvbnMpO1xuXHRcdCQoZG9jdW1lbnQpLm9uKCdtZXNzaWFDb250ZW50SXNTYXZlZCcsIE1lc3NpYS5jbGVhckRpcnR5QWN0aW9ucyk7XG5cdH0pO1xufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEFuaW1hdGVkIHNwaW5uZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dIaWRlIFNob3cgb3IgaGlkZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBKUSBlbGVtZW50IHRvIGFwcGVuZCBsb2FkZXIgdG8uXG4gKlxuICogQHJldHVybiBQcm9taXNlLlxuICovXG5jb25zdCBsb2FkZXJGbiA9IChzaG93SGlkZSwgc2VsZWN0b3IpID0+IHtcblx0Y29uc3QgJCA9IGpRdWVyeTtcblxuXHRpZiAoc2hvd0hpZGUgPT09ICdzaG93Jykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHRpZiAoJChgJHtzZWxlY3Rvcn0gPiAubWVzc2lhLXNwaW5uZXJgKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoc2VsZWN0b3IpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lc3NpYS1zcGlubmVyXCI+PGRpdiBjbGFzcz1cImxvYWRpbmdcIj48aT48L2k+PGk+PC9pPjxpPjwvaT48aT48L2k+PC9kaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdCQoJy5vdmVybGF5JykuYWRkQ2xhc3MoJ292ZXJsYXktc2hvdycpO1xuXHRcdFx0XHRyZXNvbHZlKCdkb25lJyk7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHR9IGVsc2UgaWYgKHNob3dIaWRlID09PSAnaGlkZScpIHtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShcblx0XHRcdHJlc29sdmUgPT4ge1xuXHRcdFx0XHQkKHNlbGVjdG9yKS5maW5kKCcubWVzc2lhLXNwaW5uZXInKS5hbmltYXRlKHtcblx0XHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHR9LCAxMDAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCgnLm92ZXJsYXknKS5yZW1vdmVDbGFzcygnb3ZlcmxheS1zaG93Jyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnZG9uZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG59O1xuXG5nbG9iYWwuTWVzc2lhRXh0ID0gZ2xvYmFsLk1lc3NpYUV4dCB8fCB7fTtcbmdsb2JhbC5NZXNzaWFFeHQgPSB7XG5cdC4uLmdsb2JhbC5NZXNzaWFFeHQsXG5cdC4uLnsgbG9hZGVyOiBsb2FkZXJGbiB9XG59OyIsIi8qKlxuICogQ29uc29sZSBsb2dnZXIuIFNlbGYgaW52b2tlZC5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IENhbGxiYWNrcy5cbiAqL1xuY29uc3QgbG9nZ2VyRm4gPSAoKCkgPT4ge1xuXG5cdGNvbnN0IG1ldGhvZFRvQ29sb3JNYXAgPSB7XG5cdFx0ZGVidWc6ICcjN2Y4YzhkJyxcblx0XHRsb2c6ICcjMmVjYzcxJyxcblx0XHR3YXJuOiAnI2YzOWMxMicsXG5cdFx0ZXJyb3I6ICcjYzAzOTJiJyxcblx0XHR0YWJsZTogJyNjMDM5MmInLFxuXHR9O1xuXG5cdGNvbnN0IHByaW50ID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuXHRcdGNvbnN0XG5cdFx0XHRzdHlsZXMgPSBbYGJhY2tncm91bmQ6ICR7bWV0aG9kVG9Db2xvck1hcFttZXRob2RdfWAsIGBib3JkZXItcmFkaXVzOiAwLjNlbWAsIGBjb2xvcjogd2hpdGVgLCBgZm9udC13ZWlnaHQ6IGJvbGRgLCBgcGFkZGluZzogMnB4IDAuNWVtYF0sXG5cdFx0XHRsb2dQcmVmaXggPSBbJyVjbWVzc2lhJywgc3R5bGVzLmpvaW4oJzsnKV07XG5cblx0XHRpZiAobWVzc2lhVmFycy5zY3JpcHREZWJ1ZyA9PT0gZmFsc2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zb2xlW21ldGhvZF0oLi4ubG9nUHJlZml4LCAuLi5hcmdzKTtcblx0fVxuXG5cdGNvbnN0IGFwaSA9IHt9O1xuXHRjb25zdCBsb2dnZXJNZXRob2RzID0gT2JqZWN0LmtleXMobWV0aG9kVG9Db2xvck1hcCk7XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgbG9nZ2VyTWV0aG9kcykge1xuXHRcdGNvbnN0IG1ldGhvZCA9IGtleTtcblxuXHRcdGFwaVttZXRob2RdID0gKC4uLmFyZ3MpID0+IHtcblx0XHRcdHByaW50KG1ldGhvZCwgYXJncyk7XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBhcGk7XG59KSgpO1xuXG5nbG9iYWwuTWVzc2lhRXh0ID0gZ2xvYmFsLk1lc3NpYUV4dCB8fCB7fTtcbmdsb2JhbC5NZXNzaWFFeHQgPSB7XG5cdC4uLmdsb2JhbC5NZXNzaWFFeHQsXG5cdC4uLntsb2dnZXI6IGxvZ2dlckZufVxufTsiLCIvKipcbiAqIFJlZ2lzdGVyIGFuZCBzdGFydCB3ZWIgd29ya2Vycy5cbiAqXG4gKiBAcmV0dXJuIHZvaWQuXG4gKi9cbmNvbnN0IHdvcmtlckRpc3BhdGNoZXIgPSAoKCkgPT4ge1xuXHRpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXG5cdFx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG5cdFx0XHRjb25zdCBpbmZvID0gbWVzc2FnZS5kYXRhO1xuXG5cdFx0XHRpZiAoaW5mby50eXBlID09PSAnbG9nZ2VyJykge1xuXHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyW2luZm8ubWV0aG9kXShpbmZvLmJvZHkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKG1lc3NpYVZhcnMucHdhRW5hYmxlID09PSAxKSB7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdGNhY2hlQXZhaWxhYmxlID0gJ2NhY2hlcycgaW4gc2VsZixcblx0XHRcdFx0aW5kZXhlZERiQXZhaWxhYmxlID0gJ2luZGV4ZWREQicgaW4gc2VsZjtcblxuXHRcdFx0Y29uc3QgcHJvbXB0VXBkYXRlID0gKHJlZ2lzdHJhdGlvbikgPT4ge1xuXHRcdFx0XHRjb25zdCBjaG9pY2UgPSB3aW5kb3cuY29uZmlybShtZXNzaWFWYXJzLm1lc3NhZ2VzLndvcmtlclVwZGF0ZSk7XG5cblx0XHRcdFx0aWYgKGNob2ljZSkge1xuXHRcdFx0XHRcdG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRyb2xsZXJjaGFuZ2UnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBub3RoaW5nIGZvciBub3cuXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi53YWl0aW5nKSB7XG5cdFx0XHRcdFx0cmVnaXN0cmF0aW9uLndhaXRpbmcucG9zdE1lc3NhZ2UoeyBjb21tYW5kOiAnbWVzc2lhU2tpcFdhaXRpbmcnIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRuYXZpZ2F0b3Jcblx0XHRcdFx0LnNlcnZpY2VXb3JrZXJcblx0XHRcdFx0LnJlZ2lzdGVyKG1lc3NpYVZhcnMud29ya2VyVXJsLCB7IHNjb3BlOiAnLycgfSlcblx0XHRcdFx0LnRoZW4oKHJlZ2lzdHJhdGlvbikgPT4ge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIubG9nKGBXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2NlZWRlZC4gU2NvcGUgaXMgJHtyZWdpc3RyYXRpb24uc2NvcGV9YCk7XG5cblx0XHRcdFx0XHRpZiAoZmFsc2UgPT09IGluZGV4ZWREYkF2YWlsYWJsZSkge1xuXHRcdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci53YXJuKCdXb3JrZXIgd2lsbCBza2lwIGNhY2hpbmcgY2F1c2UgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBpbmRleGVkREIuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChmYWxzZSA9PT0gY2FjaGVBdmFpbGFibGUpIHtcblx0XHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIud2FybignV29ya2VyIHdpbGwgc2tpcCBjYWNoaW5nIGNhdXNlIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgY2FjaGUgc3RvcmFnZS4nKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVnaXN0cmF0aW9uLndhaXRpbmcpIHtcblx0XHRcdFx0XHRcdHByb21wdFVwZGF0ZShyZWdpc3RyYXRpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdE1lc3NpYUV4dC5sb2dnZXIuZXJyb3IoJ1dvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkIHdpdGggJyArIGVycm9yKTtcblx0XHRcdFx0fSk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0bmF2aWdhdG9yXG5cdFx0XHRcdC5zZXJ2aWNlV29ya2VyXG5cdFx0XHRcdC5nZXRSZWdpc3RyYXRpb25zKCkudGhlbigocmVnaXN0cmF0aW9ucykgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKHJlZ2lzdHJhdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCByZWdpc3RyYXRpb24gb2YgcmVnaXN0cmF0aW9ucykge1xuXHRcdFx0XHRcdFx0XHRyZWdpc3RyYXRpb24uYWN0aXZlLnBvc3RNZXNzYWdlKHsgY29tbWFuZDogJ21lc3NpYVVucmVnaXN0ZXJTZWxmJyB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgd29ya2VyRGlzcGF0Y2hlcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZVxuaW1wb3J0IFwiLi4vLi4vc2Nzcy9fYmFja2VuZC9iYWNrZW5kLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvX2JhY2tlbmQvYmFja2VuZC5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
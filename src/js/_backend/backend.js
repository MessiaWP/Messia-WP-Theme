import '../_components/_logger.js';
import '../_components/_loader.js';
import '../_components/_worker_dispatcher.js';

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
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_backend/menu-page.scss":
/*!******************************************!*\
  !*** ./src/scss/_backend/menu-page.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_backend/demo.js":
/*!*********************************!*\
  !*** ./src/js/_backend/demo.js ***!
  \*********************************/
/***/ (function(module) {

/**
 * Micro App for demo packages management.
 */

module.exports = function (Messia, $) {

	var
		demo_xhr_install = null,
		demo_xhr_get_list = null,
		demo_xhr_remove = null;

	const demoApp = {
		dialog: false,
		dialogEl: false,
		demoData: false,
		themeLicenceActive: false,
		selected: [],
		actionsState: {
			demoClose: true,
			demoAdd: false,
			demoRemove: false,
			demoInstall: false,
		},
		template: wp.template('demo-manage'),
		init: function (e) {
			let
				tmpl = demoApp.template,
				title = $('#tabs').data('general').demo.demoManageDialogTitle,
				buttonsDialog = [
					{
						text: 'Close',
						id: 'demo-close',
						click: function (event) {
							demoApp.events.remove();
							this.messiaDialog.close();
						},
					},
					{
						text: 'Add',
						id: 'demo-add',
						click: demoApp.events.buttons.demoAdd,
					},
					{
						text: 'Remove',
						id: 'demo-remove',
						click: demoApp.events.buttons.demoRemove,
					},
					{
						text: 'Install',
						id: 'demo-install',
						click: demoApp.events.buttons.demoInstall,
					},
				];

			demoApp.dialogEl = window.messiaVars.dialog.init({
				dialogId: 'messia-dialog',
				dialogTitle: title,
				dialogContent: tmpl({
					demoList: demoApp.demoData,
					selected: demoApp.selected,
					themeLicenceActive: demoApp.themeLicenceActive,
				}),
				buttons: buttonsDialog,
			});

			demoApp.events.add();
			$(demoApp.dialogEl).trigger('messiaChangeActionsState');
			demoApp.updateDemoState(false);

			demoApp.dialogEl.messiaDialog.open();
		},
		render: function () {
			demoApp.dialogEl.messiaDialog.setContent(
				demoApp.template({
					demoList: demoApp.demoData,
					selected: demoApp.selected,
					themeLicenceActive: demoApp.themeLicenceActive,
				})
			);
		},
		actionsToggle: function () {

			for (var state of Object.keys(demoApp.actionsState)) {

				//let buttons = demoApp.dialog.uiDialogButtonPane;
				const buttons = $(demoApp.dialogEl).find('.buttonpane .buttonset');

				switch (state) {
					case 'demoClose':
						const close = buttons.find('#demo-close');
						break;

					case 'demoAdd':
						const add = buttons.find('#demo-add');

						if (demoApp.actionsState[state] === true) {
							add.prop('disabled', false).removeClass(['ui-button-disabled', 'ui-state-disabled']);
						} else {
							add.prop('disabled', true).addClass(['ui-button-disabled', 'ui-state-disabled']);
						}
						break;

					case 'demoRemove':
						const remove = buttons.find('#demo-remove');

						if (demoApp.actionsState[state] === true) {
							remove.prop('disabled', false).removeClass(['ui-button-disabled', 'ui-state-disabled']);
						} else {
							remove.prop('disabled', true).addClass(['ui-button-disabled', 'ui-state-disabled']);
						}
						break;

					case 'demoInstall':
						const install = buttons.find('#demo-install');

						if (demoApp.actionsState[state] === true) {
							install.prop('disabled', false).removeClass(['ui-button-disabled', 'ui-state-disabled']);
						} else {
							install.prop('disabled', true).addClass(['ui-button-disabled', 'ui-state-disabled']);
						}
						break;
				}
			}
		},
		/**
		 * Get list of available demo on server.
		 *
		 * @return {Promise} Promise result.
		 */
		doAjaxDemoGetList: async function () {

			let demo = await new Promise((resolve, reject) => {

				const data = Messia.tabsData;

				demo_xhr_get_list = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionDemoGetList,
						messiaNonce: data.settingFormNonce,
					},
					beforeSend: function () {

						if (demo_xhr_get_list != null) {
							demo_xhr_get_list.abort();
							demo_xhr_get_list = null;
						}
					},
					success: function (server) {
						if (server.success === true) {
							return resolve(server.data);
						} else {
							return reject(new Error(data.unexpectedErr));
						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (MLHttpRequest.status === 0 && textStatus == 'abort') {
							return;
						}
						return reject(new Error(data.ajaxError));
					},
					complete: function (MLHttpRequest, textStatus) {
						demo_xhr_get_list = null;
					},
				});
			});
			return demo;
		},
		/**
		 * Deploy demo package.
		 *
		 * @param {string} template Demo file names.
		 *
		 * @return {Promise} Promise result.
		 */
		doAjaxDemoInstall: async function (template) {

			let install = await new Promise((resolve, reject) => {
				const data = Messia.tabsData;

				demo_xhr_install = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionDemoInstall,
						messiaNonce: data.settingFormNonce,
						templateFile: template,
					},
					beforeSend: function () {

						if (demo_xhr_install != null) {
							demo_xhr_install.abort();
							demo_xhr_install = null;
						}

						demoApp.setActionsStates({
							demoRemove: false,
							demoInstall: false,
						});
					},
					success: function (server) {
						if (server.success === true) {
							return resolve(server.data);
						} else {
							return reject(new Error(data.unexpectedErr));
						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (MLHttpRequest.status === 0 && textStatus == 'abort') {
							return;
						}
						return reject(new Error(data.ajaxError));
					},
					complete: function (MLHttpRequest, textStatus) {
						demo_xhr_install = null;
						$.fn.TabsPluginFrameWork('playSound', 0.3);
					},
				});
			});
			return install;
		},
		/**
		 * Add files to server.
		 *
		 * @param {File} file Demo file object.
		 * @param {Function} onProgress Function to execute on upload progress.
		 *
		 * @return {Promise} Promise result.
		 */
		doAjaxDemoAdd: async function (file, onProgress) {

			let add = await new Promise(async (resolve, reject) => {
				const
					data = Messia.tabsData,
					formData = new FormData();

				formData.set('action', data.actionDemoAdd);
				formData.set('messiaNonce', data.settingFormNonce);
				formData.set('demo[]', new Blob([0]), file.name);
				formData.set('demoData', JSON.stringify([
					{
						name: file.name,
						size: file.size,
						start: true,
						finish: false,
					}
				]));

				/**
				 * Here is an example of what browser will send:
				 *
				 * ------WebKitFormBoundary0N94BErD5WH8ci5c
				 *	Content-Disposition: form-data; name="action"
				 *
				 *	messia_demo_add
				 *	------WebKitFormBoundary0N94BErD5WH8ci5c
				 *	Content-Disposition: form-data; name="messiaNonce"
				 *
				 *	869c6fb2ef
				 *	------WebKitFormBoundary0N94BErD5WH8ci5c
				 *	Content-Disposition: form-data; name="demoData"
				 *
				 *	[{"name":"vh159121_demo_messiawp_dump_(16-09-2021_13-00-55).zip","size":33088002,"start":true,"finish":false}]
				 *	------WebKitFormBoundary0N94BErD5WH8ci5c
				 */
				const ln = Array.from(formData.entries(), ([key, prop]) => {
					return typeof prop === "string"
						? (key.length + 100) + (prop.length + 50)
						: (key.length + 100) + (prop.size + 50);
				});

				const
					chunkSize = data.postMaxSize - ln.reduce((a, b) => a + b), // current size of FormsData.
					steps = Math.trunc(file.size / chunkSize);

				for (let start = 0, step = 0; start < file.size; start += chunkSize, step++) {
					const
						trStart = step === 0,
						trFinish = Math.trunc(steps) === step,
						chunk = file.slice(start, start + chunkSize);

					formData.set('demo[]', chunk, file.name);
					formData.set('demoData', JSON.stringify([
						{
							name: file.name,
							size: file.size,
							start: trStart,
							finish: trFinish,
						}
					]));

					await $.ajax({
						type: 'POST',
						url: data.ajaxUrl,
						data: formData,
						enctype: 'multipart/form-data',
						contentType: false,
						processData: false,
						// cache: false,
						// dataType: 'JSON',
						// async: true,
						beforeSend: function (XMLHttpRequest, RequestData) {

							demoApp.setActionsStates({
								demoRemove: false,
								demoInstall: false,
							});

							//patch ajax settings to call a progress callback
							var currXHR = RequestData.xhr;
							RequestData.xhr = function () {
								var xhr = currXHR.apply(this, arguments);

								if (xhr.upload) {
									xhr.upload.addEventListener('progress', (evt) => onProgress(evt, step, steps), false);
								}

								return xhr;
							};
						},
						success: function (server) {
							if (!trFinish) return;

							if (server.success === true) {
								return resolve(server.data);
							} else {
								return reject(new Error(data.unexpectedErr));
							}
						},
						error: function (MLHttpRequest, textStatus, errorThrown) {

							if (MLHttpRequest.status === 0 && textStatus == 'abort') {
								return;
							}
							return reject(new Error(data.ajaxError));
						},
					});

					formData.delete('demo[]');
					formData.delete('demoData');
				}
			});
			return add;
		},
		/**
		 * Remove files from server.
		 *
		 * @param {Array<string>} demos Demo file names.
		 *
		 * @return {Promise} Promise result.
		 */
		doAjaxDemoRemove: async function (demos) {

			let add = await new Promise((resolve, reject) => {
				const data = Messia.tabsData;

				demo_xhr_remove = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionDemoRemove,
						messiaNonce: data.settingFormNonce,
						demos: demos,
					},
					beforeSend: function () {

						if (demo_xhr_remove != null) {
							demo_xhr_remove.abort();
							demo_xhr_remove = null;
						}

						demoApp.setActionsStates({
							demoRemove: false,
							demoInstall: false,
						});
					},
					success: function (server) {
						if (server.success === true) {
							return resolve(server.data);
						} else {
							return reject(new Error(data.unexpectedErr));
						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (MLHttpRequest.status === 0 && textStatus == 'abort') {
							return;
						}
						return reject(new Error(data.ajaxError));
					},
					complete: function (MLHttpRequest, textStatus) {
						demo_xhr_remove = null;
						$.fn.TabsPluginFrameWork('playSound', 0.3);
					},
				});
			});
			return add;
		},
		events: {

			/**
			 * Add events to a dialog object.
			 *
			 * @return void
			 */
			add: () => {
				$(demoApp.dialogEl).on('click', '.package-item', demoApp.events.demoItemSelectHandler);
				$(demoApp.dialogEl).on('messiaChangeDemoData', demoApp.render);
				$(demoApp.dialogEl).on('messiaChangeActionsState', demoApp.actionsToggle);
			},

			/**
			 * Remove events from a dialog object.
			 * JQ really strange - after removing element from DOM
			 * (dialog destroy) and re-creating same new one
			 * it still track old events.
			 *
			 * @return void
			 */
			remove: () => {
				$(demoApp.dialogEl).off('click messiaChangeDemoData messiaChangeActionsState');
			},
			/**
			 * Handlers for dialog buttons events.
			 */
			buttons: {

				/**
				 * On close dialog object.
				 *
				 * @return void
				 */
				close: function (event) {
					demoApp.events.remove();
					$(this).trigger('dialogClosed', ['close']);
					$(this).dialog("close");
				},

				/**
				 * On uploading files.
				 *
				 * @return void
				 */
				demoAdd: function (event) {

					if (!window.FormData) {
						alert(Messia.tabsData.formDataErr);
						return;
					}

					let
						files_size_total = 0,
						files_size_loaded = 0,
						prev_step = 0,
						prev_loaded = 0;

					const
						allowed_mime_types = Messia.tabsData.demo.allowedMimeTypes,
						input = document.createElement('input');

					let onProgress = (evt, step, steps) => {
						if (evt.lengthComputable) {

							/**
							 * Onprogress triggers every time something was passed to server.
							 * But we send multiple files where each one splitted into chunks which
							 * size depends on server settings, so we do not know size of the chunk.
							 *
							 * Event.loaded contains running sum of passed data starting from the beginning
							 * of chunk transmitting and NOT the amount of data passed inside single transmit.
							 *
							 * So within single chunk we have to reduce loaded by loaded at prev step.
							 * Otherwise we will get this:
							 * Lets say the size of chunk is 5Mb.
							 * We could get here loaded at 1st step 1Mb, at 2nd 3Mb, at 3rd 5Mb.
							 * And if to 1+3+5 = 9 -> it will be wrong sum agains 5MB.
							 *
							 */
							if (prev_step === step) {// Same chunk as prev.
								files_size_loaded += evt.loaded - prev_loaded;
							} else {// New chunk.
								files_size_loaded += evt.loaded;
							}

							prev_step = step;
							prev_loaded = evt.loaded;

							let
								percentComplete = files_size_loaded / files_size_total * 100,
								progressEl = $(demoApp.dialogEl).find('#demo-upload-progress').css('transition', 'background-size .3s');

							if (percentComplete > 100) percentComplete = 100;
							progressEl = progressEl.css('background-size', `${percentComplete}%`);
						}
					}

					input.type = 'file';
					input.multiple = 'true';
					input.accept = allowed_mime_types.mimes.join(',');

					// Handler for file(s) selection.
					$(input).on('change', function () {

						let filesValid = [];

						if ($(this).prop('files').length > 0) {

							let files = $(this).prop('files');

							for (let i = 0; i < files.length; i++) {
								const file = files[i];

								// validate file type
								if (allowed_mime_types.mimes.indexOf(file.type) == -1) {
									const msg = allowed_mime_types.warning.replace(/%fileType%/gi, file.type);
									$.fn.TabsPluginFrameWork('showMessage', msg, 'error');
									return;
								}
								files_size_total = files_size_total + file.size;
								filesValid.push(file);
							}
						}

						Messia.confirm(Messia.tabsData.demo.confirmDemoAdd)
							.then((confirmed) => {
								const uploads = [];
								for (let i = 0; i < filesValid.length; i++) {

									const file = filesValid[i];
									const action = demoApp
										.doAjaxDemoAdd(file, onProgress)
										.then((data) => {

											if (data.code === 200) {
												$.fn.TabsPluginFrameWork('showMessage', data.msg, 'success');
											} else {
												$.fn.TabsPluginFrameWork('showMessage', data.msg, 'error');
											}
											return Promise.resolve(data);
										})
										.catch((error) => {
											$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
											MessiaExt.logger.error(error);
											return Promise.reject(error);
										});
									uploads.push(action);
								}

								Promise
									.allSettled(uploads)
									.then((results) => {
										$.fn.TabsPluginFrameWork('playSound', 0.3);
										$(demoApp.dialogEl)
											.find('#demo-upload-progress')
											.css('transition', '')
											.css('background-size', '');

										const demoDataCurr = demoApp.demoData;
										let
											fulfilled = false,
											demoDataNew = [];

										for (let i = 0; i < results.length; i++) {
											const result = results[i];
											if (result.status !== 'fulfilled') continue;
											demoDataNew = demoDataNew.concat(result.value.demoData);
											fulfilled = true;
										}
										if (!fulfilled) return; // No one request was successful.
										demoDataNew = [...new Set(demoDataNew)];

										demoApp.selected = demoDataNew.filter(x => !demoDataCurr.includes(x));
										demoApp.setDemoState(demoDataNew);

										demoApp.setActionsStates({
											demoRemove: demoApp.selected.length > 0,
											demoInstall: demoApp.selected.length === 1,
										});
									});
							});
					});
					input.click();
				},

				/**
				 * On deleting demo packages.
				 *
				 * @return void
				 */
				demoRemove: function (event) {

					if (!demoApp.isActionAllowed('demoRemove')) {
						return;
					}

					Messia.confirm(Messia.tabsData.demo.confirmDemoRemove)
						.then((confirmed) => {
							$(this).find('.selected').addClass('is-busy');
							demoApp
								.doAjaxDemoRemove(demoApp.selected)
								.then((data) => {
									demoApp.selected = [];
									demoApp.setDemoState(data.demoData);

									demoApp.setActionsStates({
										demoRemove: demoApp.selected.length > 0,
										demoInstall: demoApp.selected.length === 1,
									});

									if (data.code === 200) {
										$.fn.TabsPluginFrameWork('showMessage', data.msg, 'success');
									} else {
										$.fn.TabsPluginFrameWork('showMessage', data.msg, 'error');
									}
								})
								.catch((error) => {
									$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
									MessiaExt.logger.error(error);
								})
								.finally(() => {
									$(this).find('.selected').removeClass('is-busy');
								});;
						});
				},

				/**
				 * On click to install demo package.
				 *
				 * @return void
				 */
				demoInstall: function (event) {

					if (!demoApp.isActionAllowed('demoInstall')) {
						return;
					}

					Messia.confirm(Messia.tabsData.demo.confirmDemoInstall)
						.then((confirmed) => {

							$(this).find('.selected').addClass('is-busy');
							demoApp
								.doAjaxDemoInstall(demoApp.selected[0])
								.then((data) => {
									if (data.code === 200) {
										$.fn.TabsPluginFrameWork('showMessage', data.msg, 'success');
									} else {
										$.fn.TabsPluginFrameWork('showMessage', data.msg, 'error');
									}

									if (data.reload === true) {
										window.location.reload();
									}
								})
								.catch((error) => {
									$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
									MessiaExt.logger.error(error);
								})
								.finally(() => {
									$(this).find('.selected').removeClass('is-busy');
								});;
						})
				},
			},

			/**
			 * Handlers for click on demo item.
			 *
			 * @return void
			 */
			demoItemSelectHandler: function name(event) {

				if (demo_xhr_install !== null) {
					return;
				}
				let items = $(this).parents('.demo-package-items');

				$(this).toggleClass('selected');
				let selected = items.find('selected');

				let selectedCurr = demoApp.demoData;
				let selectedNew = items.find('.selected');

				if (JSON.stringify(selectedCurr) !== JSON.stringify(selectedNew)) {

					demoApp.selected = selectedNew.toArray().map((element, index) => element.id);

					demoApp.setActionsStates({
						demoRemove: demoApp.selected.length > 0,
						demoInstall: demoApp.selected.length === 1,
					});
				}
			},
		},
		setDemoState: (demoData) => {

			const
				demoDataCurr = demoApp.demoData,
				demoDataNew = demoData;

			if (JSON.stringify(demoDataCurr) !== JSON.stringify(demoDataNew)) {
				demoApp.demoData = demoData;
				$(demoApp.dialogEl).trigger('messiaChangeDemoData');
			}
		},
		updateDemoState: (silent = true) => {

			return demoApp.doAjaxDemoGetList()
				.then((data) => {
					const
						demoDataCurr = demoApp.demoData,
						licenceActiveCurr = demoApp.themeLicenceActive,
						demoDataNew = data.demoData,
						licenceActiveNew = data.themeLicenceActive,
						goOn = JSON.stringify(demoDataCurr) !== JSON.stringify(demoDataNew) || licenceActiveCurr !== licenceActiveNew;

					demoApp.setActionsStates({
						demoAdd: licenceActiveNew === true,
					});

					if (goOn) {

						demoApp.demoData = data.demoData;
						demoApp.themeLicenceActive = data.themeLicenceActive;
						$(demoApp.dialogEl).trigger('messiaChangeDemoData');

						if (!silent) {
							if (data.code === 200) {
								$.fn.TabsPluginFrameWork('showMessage', data.msg, 'success');
							} else {
								$.fn.TabsPluginFrameWork('showMessage', data.msg, 'error');
							}
							$.fn.TabsPluginFrameWork('playSound', 0.3);
						}
					}
				})
				.catch((error) => {
					$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
					MessiaExt.logger.error(error);
				})
				.finally(() => Promise.resolve('refreshed'));
		},
		setActionsStates: (states) => {
			let stateCurr = demoApp.actionsState;
			let stateNew = Object.assign({}, stateCurr, states);

			if ('undefined' !== states['demoInstall'] && states['demoInstall'] === true && demo_xhr_install !== null) {
				stateNew['demoInstall'] = false;
			}

			if (JSON.stringify(stateCurr) !== JSON.stringify(stateNew)) {

				demoApp.actionsState = stateNew;
				$(demoApp.dialogEl).trigger('messiaChangeActionsState');
			}
		},
		isActionAllowed: (action) => {
			return demoApp.actionsState[action];
		},
	};

	$('.wrap #install-demo').on('click', demoApp.init);
};

/***/ }),

/***/ "./src/js/_backend/menu-page.js":
/*!**************************************!*\
  !*** ./src/js/_backend/menu-page.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function ($) {
	$(function () {

		var xhr = null;

		$.fn.TabsPluginFrameWork = function (method) {

			if (TabsPluginFrameWorkMethods[method]) {
				return TabsPluginFrameWorkMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			}
			else if (typeof method === 'object' || !method) {
				$.error('Argument "Method" required for jQuery.TabsPluginFrameWork');
			}
			else {
				$.error('Method ' + method + ' does not exist for jQuery.TabsPluginFrameWork');
			}
		}

		const TabsPluginFrameWorkMethods = {

			showMessage: function (data, type, caption = 'Notification') {

				var append_content = '';

				if ('object' === typeof data) {
					for (var key in data) {
						append_content = append_content + '<div>' + key + ": " + data[key] + '</div>';
					}
				}
				else if ('error' === typeof data) {
					append_content = append_content + '<div>' + data.toString() + '</div>';
				}
				else if ('array' === typeof data) {
					for (var i = 0; i < data.length; i++) {
						append_content = append_content + '<div>' + data[i] + '</div>';
					}
				}
				else if ('string' === typeof data) {
					append_content = '<div>' + data + '</div>';
				}
				else {
					return;
				}

				var right = undefined;
				var bottom = undefined;
				var active_messages = $('.message-wrapper');
				var message = $(`<div class="message-wrapper" style="display: none;">
									<div class="menu-page-message rc-${type}">
										<div class="menu-inner">
											<div class="menu-operate">
												<div class="caption">${caption}</div>
												<div class="close"></div>
											</div>
											<div class="content">${append_content}</div>
										</div>
									</div>
								</div>`);

				if (active_messages.length === 0) {
					message = message.appendTo('body');
				}
				else {

					var closest_message = active_messages.last();
					message = message.insertAfter(closest_message);
					bottom = parseInt(closest_message.css('bottom')) + 4;
					right = parseInt(closest_message.css('right')) + 4;
				}

				const promise = new Promise((resolve, reject) => {
					message
						.draggable({
							containment: 'window',
							cursor: 'move',
							scroll: false,
							//snap: 'html',
							//snapTolerance: 10,
							handle: '.menu-operate', // does not work with position 'fixed'
							start: function (event, ui) {
								ui.helper.css({
									bottom: 'auto',
									right: 'auto',
								});
							},
						})
						.css({
							'right': `${right}px`,
							'bottom': `${bottom}px`,
						})
						.show({
							effect: "fade",
							direction: 'in',
						}, 200, () => {
							return resolve('shown');
						})
						.resizable({
							start: function (event, ui) { }
						});
				});

				var closeTimer = setTimeout(function (e) {
					message.find('.menu-operate .close').triggerHandler('click', [1200]);
				}, 3500);

				this.TabsPluginFrameWork('closeMessage', message);
				this.TabsPluginFrameWork('stopCloseMessage', message, closeTimer);

				return promise;
			},
			closeMessage: function (message, duration) {
				if (typeof (duration) == 'undefined') {
					duration = 200;
				}
				message.find('.menu-operate .close').on('click touchstart', function (e, duration) {
					if (typeof (e.isTrigger) == 'undefined') {
						message.off('mouseover');
					}
					message.hide({
						effect: "fade",
						direction: 'out',
					}, duration, function () {
						message.draggable('destroy').remove();
					});
				});
			},
			stopCloseMessage: function (message, closeTimer) {
				message.on('mouseover', { timerId: closeTimer }, function (e) {
					clearTimeout(e.data.timerId);
					message.stop(true).animate({
						'opacity': '1',
					}, 300, function () {
						message.css('opacity', '');
					});
				});
			},
			updateControls: function (newSettings) {

				Messia.toggle_save_operate('off', Messia.allInputs);

				for (var key in newSettings) {
					if (typeof (newSettings[key]) == 'string') {
						newSettings[key] = newSettings[key].replace(/\\"/g, '"');
						newSettings[key] = newSettings[key].replace(/\\'/g, '\'');
					}
				}

				formControls = Messia.get_form_controls();

				for (var i = 0; i < formControls.length; i++) {

					var controlName = formControls[i].name;
					var controlVal = newSettings[controlName];

					switch (formControls[i].nodeName) {
						case 'INPUT':
							if (formControls[i].type == 'checkbox') {
								$(formControls[i]).prop('checked', parseInt(controlVal));
							}
							else if (formControls[i].type == 'radio') {
								$(formControls[i]).prop('checked', $(formControls[i]).val() === controlVal);
							}
							else {
								$(formControls[i]).val(controlVal);
							}
							$(formControls[i]).trigger('updated');
							break;

						case 'TEXTAREA':
							$(formControls[i]).val(controlVal);
							$(formControls[i]).trigger('updated');
							break;

						case 'SELECT':
							if (formControls[i].multiple == true) {

								if (controlVal.length > 0) {
									for (var z = 0; z < controlVal.length; z++) {
										$(formControls[i]).find('option[value="' + controlVal[z] + '"]').prop('selected', 'selected');
									}
								}
							}
							else {
								$(formControls[i]).find('option[value="' + controlVal + '"]').prop('selected', 'selected');
							}
							$(formControls[i]).val(controlVal);
							$(formControls[i]).trigger('updated');
							break;
					}

					if (formControls[i].nodeName == 'INPUT' || formControls[i].nodeName == 'SELECT') {
						if (typeof ($(formControls[i]).data('tagsinput')) != 'undefined') {
							$(formControls[i]).off();
							$(formControls[i]).tagsinput('removeAll');
							$(formControls[i]).tagsinput('add', controlVal);
							$(formControls[i]).on('itemAdded itemRemoved', Messia.saveOperate);
						}
					}
				}
				Messia.toggle_save_operate('on', Messia.allInputs);
			},
			playSound: function (volume) {

				var audio = $('.menu-beep');

				audio.get(0).volume = volume;
				audio.get(0).play();
			},
		}

		const Messia = {

			multiple: '',
			tabsData: $('#tabs').data('general'),
			allInputs: $('#tabs input:not(.isolated), #tabs select:not(.isolated), #tabs textarea:not(.isolated)'),
			activeTab: function (event, ui) {

				ui.newTab.get(0).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'nearest',
				});
			},
			openHelpTab: function (event) {

				var data = $(this).data('sectionId');
				window.scrollTo({ top: 0, behavior: 'smooth' });

				if ('none' === $('#contextual-help-wrap').css('display')) {
					$('#contextual-help-link').trigger('click');
				}

				if (typeof data === 'undefined') {
					return;
				}

				$(`.contextual-help-tabs a[href="#tab-panel-${data}"]`).trigger('click');
			},
			toggleSection: function (event) {

				$(this).toggleClass("arrow-transform");

				var R = 10;
				var el = $(this).next('.section-content-wrapper');

				el.stop(true);

				if (el.hasClass('collapsed')) {
					var height = el.addClass('showing').removeClass('collapsed').height();
					var dur = Math.sqrt(height) * R;
					el.css('height', 0);
					el.animate({
						height: height + 'px',
					}, {
						duration: dur,
						progress: function () {
							$('#tabs').trigger('scroll');
						},
						done: function () {

							$(this).css('height', '100%').removeClass('showing');
							$('#tabs').trigger('scroll');
						},
					});
				}
				else if (el.hasClass('hiding')) {
					var curr_height = el.css('height');
					var height = el.css('height', '').height();
					var dur = Math.sqrt(height) * R;

					el.css('height', curr_height);
					el.addClass('showing').removeClass('hiding').animate(
						{
							height: height + 'px',
						},
						{
							duration: dur,
							progress: function () {
								$('#tabs').trigger('scroll');
							},
							done: function () {

								$(this).css('height', '100%').removeClass('showing');
								$('#tabs').trigger('scroll');
							},
						});
				}
				else if (el.hasClass('showing')) {
					var height = el.height();
					var dur = Math.sqrt(height) * R;
					el.addClass('hiding').removeClass('showing').animate({
						height: 0,
					}, {
						duration: dur,
						progress: function () {
							$('#tabs').trigger('scroll');
						},
						done: function () {

							$(this).addClass('collapsed').removeClass('hiding').css('height', '');
							$('#tabs').trigger('scroll');
						},
					});
				}
				else {
					var height = el.height();
					var dur = Math.sqrt(height) * R;
					el.addClass('hiding').animate({
						height: 0,
					}, {
						duration: dur,
						progress: function () {
							$('#tabs').trigger('scroll');
						},
						done: function () {

							$(this).addClass('collapsed').removeClass('hiding').css('height', '');
							$('#tabs').trigger('scroll');
						},
					});
				}
			},
			screen_lock: async function (event, operator) {

				return await new Promise((resolve, reject) => {

					$(operator).prop('disabled', true);
					$(operator).val($('#tabs').data('general').statusBetweenRequests).removeClass();

					$('body').prepend(`<div id="spinner_saving" style="z-index: 99999;"><div id="spinner_saving_inner"><svg class="lds-curve-bars" width="120px" height="120px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(50,50)"><circle cx="0" cy="0" r="8.333333333333334" fill="none" stroke="#4658ac" stroke-width="2" stroke-dasharray="26.179938779914945 26.179938779914945" transform="rotate(2.58798)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="0" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="16.666666666666668" fill="none" stroke="#e7008a" stroke-width="2" stroke-dasharray="52.35987755982989 52.35987755982989" transform="rotate(64.3712)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.2" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="25" fill="none" stroke="#ff003a" stroke-width="2" stroke-dasharray="78.53981633974483 78.53981633974483" transform="rotate(149.659)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.4" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="33.333333333333336" fill="none" stroke="#ff6d00" stroke-width="2" stroke-dasharray="104.71975511965978 104.71975511965978" transform="rotate(239.03)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.6" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="41.666666666666664" fill="none" stroke="#ffc53f" stroke-width="2" stroke-dasharray="130.89969389957471 130.89969389957471" transform="rotate(320.012)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.8" repeatCount="indefinite"></animateTransform></circle></g></svg></div></div>`);
					$('body').addClass('setting-saving');

					$('body #spinner_saving').animate({
						opacity: 1,
					}, 150, "swing", function () {

						setTimeout(function () {
							$('body #spinner_saving_inner').animate({
								opacity: 1,
							}, 200, "swing", function () {
								resolve([event, operator]);
							});
						}, 200);
					});
				});
			},
			screen_unlock_success: async function () {

				return await new Promise((resolve, reject) => {

					$('body #spinner_saving_inner').animate({
						opacity: 0,
					}, 250, "swing", function () {

						setTimeout(function () {
							resolve();
						}, 500);
					});
				});
			},
			screen_unlock_error: async function (operator) {

				return await new Promise((resolve, reject) => {

					$(operator).off('click');
					$(operator).val($('#tabs').data('general').ajaxError).prop('disabled', false).css({
						'color': '#f00',
						'border': '2px solid #ff0404',
					}).on('click', function () {
						location.reload();
					});

					$('body #spinner_saving_inner').animate({
						opacity: 0,
					}, 250, "swing", function () {

						setTimeout(function () {
							$('body #spinner_saving').animate({
								opacity: 0,
							}, 100, "swing", function () {

								$('body #spinner_saving').remove();
								resolve();
							});
						}, 500);
					});
				});
			},
			saveOperate: function (e) {

				$('.wrap #save').val($('#tabs').data('general').onchangeBtnText).removeClass().addClass('active');
				$('.wrap #save').prop('disabled', false);
				$(document).trigger('messiaContentIsDirty');
			},
			resetSaveState: function name(e) {
				const saveBtn = $('.wrap #save');

				saveBtn
					.prop('disabled', true)
					.removeAttr('class')
					.text(saveBtn.data('init'));
			},
			save: function (e) {

				$('body').data('messiaProceedSaving', []);
				$('body').trigger('beforeSave');

				if ($('body').data('messiaProceedSaving').includes(false)) {
					return;
				}

				Messia.screen_lock(e, this).then(Messia.doAjaxSaveSettings);
			},
			doAjaxSaveSettings: function (args) {

				const
					data = Messia.tabsData,
					settings = Messia.get_form_controls().not('input[type="radio"]:not(:checked)'),
					preset = data.settingPreset,
					event = args[0],
					operator = args[1];

				var setting_arr = {};

				for (var i = 0; i < settings.length; i++) {

					var save_value;

					if (settings[i].type == 'checkbox') {
						if (typeof ($(settings[i]).data('save-val')) != 'undefined') {
							save_value = $(settings[i]).data('save-val');
						}
						else {
							(settings[i].checked) ? save_value = 1 : save_value = 0;
						}
					}
					else {
						if (typeof ($(settings[i]).data('save-val')) != 'undefined') {
							save_value = $(settings[i]).data('save-val');
						}
						else if (settings[i].type == 'select-multiple') {

							var val = $(settings[i]).val();

							if (val === null) {
								save_value = -1;
							}
							else if (val.length === 0) {
								save_value = -1;
							}
							else {
								save_value = $(settings[i]).val();
							}
						}
						else if (settings[i].type == 'radio' && $(settings[i]).prop('checked')) {
							save_value = $(settings[i]).val();
						}
						else {
							save_value = $(settings[i]).val();
						}
					}

					setting_arr[settings[i].name] = save_value;
				}

				xhr = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionSave,
						messiaNonce: data.settingFormNonce,
						data: {
							AJAX_Marker: messiaVars.AJAX_Marker,
							menu_type: data.menuType,
							preset: preset,
							settings: setting_arr,
						},
					},
					beforeSend: function () {

						if (xhr != null) {
							xhr.abort();
							xhr = null;
						}
					},
					success: function (server) {

						Messia
							.screen_unlock_success()
							.then(function () {

								Messia.remove_spinner();

								if (server.data.code === 200) {

									$.fn.TabsPluginFrameWork('updateControls', server.data.new_preset);

									if (typeof (server.data.extra_data) != 'undefined' && Object.keys(server.data.extra_data).length > 0) {
										var extra_data = server.data.extra_data;
									}
									else {
										var extra_data = false;
									}

									$('#tabs').triggerHandler('presetSaved', [server.data.new_preset, extra_data]);
									$(operator).val(server.data.btn_text).removeClass().addClass('_200');
								}

								if (server.data.code === 400) {
									$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('_400');
								}

								if (server.data.code === 403) {

									$(operator).off('click');
									$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('_403').on('click', function () {
										location.reload();
									});
								}

								$(document).trigger('messiaContentIsSaved');

								if (server.data.reload === true) {
									window.location.reload();
								}
							});
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (xhr.status === 0 && xhr.statusText == 'abort') {
							return;
						}
						else {

							Messia.screen_unlock_error(operator);
						}
					}
				});
			},
			reset: function (e) {

				var to_continue = confirm($('#tabs').data('general').demo.confirmResetSettings);

				if (true === to_continue) {
					Messia
						.screen_lock(e, this)
						.then(Messia.do_ajax_reset_settings);
				}
			},
			export: function (e) {

				var to_continue = confirm($('#tabs').data('general').demo.confirmDemoExport);

				if (true === to_continue) {
					Messia.screen_lock(e, this).then(Messia.do_ajax_export_blog);
				}
			},
			do_ajax_reset_settings: function (args) {

				const
					data = Messia.tabsData,
					preset = data.settingPreset,
					event = args[0],
					operator = args[1];

				xhr = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionReset,
						messiaNonce: data.settingFormNonce,
						data: {
							AJAX_Marker: messiaVars.AJAX_Marker,
							menu_type: data.menuType,
							preset: preset,
						},
					},
					beforeSend: function () {

						if (xhr != null) {
							xhr.abort();
							xhr = null;
						}
					},
					success: function (server) {

						Messia
							.screen_unlock_success()
							.then(function () {

								$.fn.TabsPluginFrameWork('playSound', 0.3);
								Messia.remove_spinner();

								try {

									if (server.data.code === 200) {
										$.fn.TabsPluginFrameWork('showMessage', server.data.msg, 'success');
										$(operator).val(server.data.btn_text);

										if (server.data.reload === true) {
											window.location.reload();
										}
									}

									if (server.data.code === 403) {

										$(operator).off('click');
										$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('_403').on('click', function () {
											location.reload();
										});
									}
								}
								catch (e) {
									MessiaExt.logger.error(server);
									$.fn.TabsPluginFrameWork('showMessage', data.unexpectedErr, 'error');
								}
							});
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (xhr.status === 0 && xhr.statusText == 'abort') {
							return;
						}
						else {
							Messia.screen_unlock_error(operator);
						}
					},
					done: function (data) { }
				});
			},
			do_ajax_export_blog: function (args) {

				const
					data = Messia.tabsData,
					event = args[0],
					operator = args[1];

				xhr = $.ajax({
					type: 'POST',
					url: data.ajaxUrl,
					data: {
						action: data.actionExport,
						messiaNonce: data.settingFormNonce,
					},
					beforeSend: function () {

						if (xhr != null) {
							xhr.abort();
							xhr = null;
						}
					},
					success: function (server) {

						Messia.screen_unlock_success().then(function () {

							$.fn.TabsPluginFrameWork('playSound', 0.3);
							Messia.remove_spinner();

							try {

								if (server.data.code === 200) {
									$.fn.TabsPluginFrameWork('showMessage', server.data.msg, 'success');
									$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('active');
								}

								if (server.data.code === 400) {
									$.fn.TabsPluginFrameWork('showMessage', server.data.msg, 'error');
									$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('_400');
								}

								if (server.data.code === 403) {

									$(operator).off('click');
									$(operator).val(server.data.btn_text).prop('disabled', false).removeClass().addClass('_403').on('click', function () {
										location.reload();
									});
								}
							}
							catch (e) {
								MessiaExt.logger.error(server);
								$.fn.TabsPluginFrameWork('showMessage', data.unexpectedErr, 'error');
							}
						});
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (xhr.status === 0 && xhr.statusText == 'abort') {
							return;
						}
						else {

							Messia.screen_unlock_error(operator);
						}
					}
				});
			},
			get_form_controls: function () {

				return $('#tabs input:not(.chosen-search-input), #tabs select, #tabs textarea').not('hidden').filter(function (index) {

					var name = $(this).attr('name');

					if (name == null) {
						return false;
					}
					else {
						return $(this).parents('.bootstrap-tagsinput').length === 0;
					}
				});
			},
			toggle_save_operate: function (mode, target) {

				target.each(function (index) {

					if ((this.nodeName == 'INPUT' || this.nodeName == 'SELECT') && $(this).data('taged') === true) {
						if (mode === 'on') {
							$(this).on('itemAdded itemRemoved', Messia.saveOperate);
						}
						else if (mode === 'off') {
							$(this).off('itemAdded itemRemoved', Messia.saveOperate);
						}
					}
					else {
						if (mode === 'on') {
							$(this).on('input change', Messia.saveOperate);
						}
						else if (mode === 'off') {
							$(this).off('input change', Messia.saveOperate);
						}
					}
				});
			},
			remove_loader() {
				$('#wpbody-content .settings-loader').remove();
				$('.wrap.settings-loading').removeClass('settings-loading');
			},
			remove_spinner() {
				$('body #spinner_saving, body #spinner_saving_inner').remove();
			},
			confirm: async (message) => {
				let result = await new Promise((resolve, reject) => {
					let prompt = confirm(message);
					if (prompt === true) {
						resolve(true);
					} else {
						reject(false);
					}
				});

				return result;
			}
		}

		if (true === $.fn.messiaIsMobile()) {
			Messia.multiple = '[multiple]';
		}

		try {
			$('#tabs').tabs({
				active: $('#tabs').data('general').active,
				hide: { 'effect': 'fade', 'direction': 'out', 'duration': 200 },
				show: { 'effect': 'fade', 'direction': 'in', 'duration': 200 },
				collapsible: false,
				//'heightStyle' => 'content',
				create: function (event, ui) {
					Messia.remove_loader();
				}
			});

			$('select:not(.font-option)' + Messia.multiple).select2({
				placeholder: messiaVars.messages.selectOptions,
				minimumResultsForSearch: Infinity,
				//width: '100%',
			});
		}
		catch (error) {
			MessiaExt.logger.error(error);
		} finally {
			Messia.remove_loader();
		}

		__webpack_require__(/*! ./demo.js */ "./src/js/_backend/demo.js")(Messia, $);

		$('.wrap #save').trigger('uiInited');

		$('#tabs textarea').messiaStickyTextarea();
		Messia.toggle_save_operate('on', Messia.allInputs);

		$('body').on('click', '#tabs .messia-wp-help', Messia.openHelpTab);
		$('body').on('click', '#tabs .section', Messia.toggleSection);
		$('.wrap #save').on('click', Messia.save);
		$('.wrap #reset-settings').on('click', Messia.reset);
		$('.wrap #create-demo').on('click', Messia.export);
		$('#tabs').on('tabsactivate tabscreate', Messia.activeTab);
		$('#tabs').on('resetSaveState', Messia.resetSaveState);
		$(window).on('scroll', Messia.scroll);
	});
})(jQuery);

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
/*!************************************************!*\
  !*** ./src/entries/backend/entry-menu-page.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_backend_menu_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/_backend/menu-page.scss */ "./src/scss/_backend/menu-page.scss");
/* harmony import */ var _js_backend_menu_page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_backend/menu-page.js */ "./src/js/_backend/menu-page.js");
/* harmony import */ var _js_backend_menu_page_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_backend_menu_page_js__WEBPACK_IMPORTED_MODULE_1__);
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2JhY2tlbmQvbWVudS1wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsU0FBUywyR0FBMkc7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Sjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVEQUF1RDtBQUNuRSxZQUFZLHNEQUFzRDtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSxFQUFFLG1CQUFPLENBQUMsNENBQVc7O0FBRXJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOzs7Ozs7VUM3eEJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzRDOztBQUU1QyIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL19iYWNrZW5kL21lbnUtcGFnZS5zY3NzP2RmYTIiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL2RlbW8uanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19iYWNrZW5kL21lbnUtcGFnZS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmFja2VuZC9lbnRyeS1tZW51LXBhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBNaWNybyBBcHAgZm9yIGRlbW8gcGFja2FnZXMgbWFuYWdlbWVudC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNZXNzaWEsICQpIHtcblxuXHR2YXJcblx0XHRkZW1vX3hocl9pbnN0YWxsID0gbnVsbCxcblx0XHRkZW1vX3hocl9nZXRfbGlzdCA9IG51bGwsXG5cdFx0ZGVtb194aHJfcmVtb3ZlID0gbnVsbDtcblxuXHRjb25zdCBkZW1vQXBwID0ge1xuXHRcdGRpYWxvZzogZmFsc2UsXG5cdFx0ZGlhbG9nRWw6IGZhbHNlLFxuXHRcdGRlbW9EYXRhOiBmYWxzZSxcblx0XHR0aGVtZUxpY2VuY2VBY3RpdmU6IGZhbHNlLFxuXHRcdHNlbGVjdGVkOiBbXSxcblx0XHRhY3Rpb25zU3RhdGU6IHtcblx0XHRcdGRlbW9DbG9zZTogdHJ1ZSxcblx0XHRcdGRlbW9BZGQ6IGZhbHNlLFxuXHRcdFx0ZGVtb1JlbW92ZTogZmFsc2UsXG5cdFx0XHRkZW1vSW5zdGFsbDogZmFsc2UsXG5cdFx0fSxcblx0XHR0ZW1wbGF0ZTogd3AudGVtcGxhdGUoJ2RlbW8tbWFuYWdlJyksXG5cdFx0aW5pdDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGxldFxuXHRcdFx0XHR0bXBsID0gZGVtb0FwcC50ZW1wbGF0ZSxcblx0XHRcdFx0dGl0bGUgPSAkKCcjdGFicycpLmRhdGEoJ2dlbmVyYWwnKS5kZW1vLmRlbW9NYW5hZ2VEaWFsb2dUaXRsZSxcblx0XHRcdFx0YnV0dG9uc0RpYWxvZyA9IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnQ2xvc2UnLFxuXHRcdFx0XHRcdFx0aWQ6ICdkZW1vLWNsb3NlJyxcblx0XHRcdFx0XHRcdGNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0ZGVtb0FwcC5ldmVudHMucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMubWVzc2lhRGlhbG9nLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGV4dDogJ0FkZCcsXG5cdFx0XHRcdFx0XHRpZDogJ2RlbW8tYWRkJyxcblx0XHRcdFx0XHRcdGNsaWNrOiBkZW1vQXBwLmV2ZW50cy5idXR0b25zLmRlbW9BZGQsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnUmVtb3ZlJyxcblx0XHRcdFx0XHRcdGlkOiAnZGVtby1yZW1vdmUnLFxuXHRcdFx0XHRcdFx0Y2xpY2s6IGRlbW9BcHAuZXZlbnRzLmJ1dHRvbnMuZGVtb1JlbW92ZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRleHQ6ICdJbnN0YWxsJyxcblx0XHRcdFx0XHRcdGlkOiAnZGVtby1pbnN0YWxsJyxcblx0XHRcdFx0XHRcdGNsaWNrOiBkZW1vQXBwLmV2ZW50cy5idXR0b25zLmRlbW9JbnN0YWxsLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF07XG5cblx0XHRcdGRlbW9BcHAuZGlhbG9nRWwgPSB3aW5kb3cubWVzc2lhVmFycy5kaWFsb2cuaW5pdCh7XG5cdFx0XHRcdGRpYWxvZ0lkOiAnbWVzc2lhLWRpYWxvZycsXG5cdFx0XHRcdGRpYWxvZ1RpdGxlOiB0aXRsZSxcblx0XHRcdFx0ZGlhbG9nQ29udGVudDogdG1wbCh7XG5cdFx0XHRcdFx0ZGVtb0xpc3Q6IGRlbW9BcHAuZGVtb0RhdGEsXG5cdFx0XHRcdFx0c2VsZWN0ZWQ6IGRlbW9BcHAuc2VsZWN0ZWQsXG5cdFx0XHRcdFx0dGhlbWVMaWNlbmNlQWN0aXZlOiBkZW1vQXBwLnRoZW1lTGljZW5jZUFjdGl2ZSxcblx0XHRcdFx0fSksXG5cdFx0XHRcdGJ1dHRvbnM6IGJ1dHRvbnNEaWFsb2csXG5cdFx0XHR9KTtcblxuXHRcdFx0ZGVtb0FwcC5ldmVudHMuYWRkKCk7XG5cdFx0XHQkKGRlbW9BcHAuZGlhbG9nRWwpLnRyaWdnZXIoJ21lc3NpYUNoYW5nZUFjdGlvbnNTdGF0ZScpO1xuXHRcdFx0ZGVtb0FwcC51cGRhdGVEZW1vU3RhdGUoZmFsc2UpO1xuXG5cdFx0XHRkZW1vQXBwLmRpYWxvZ0VsLm1lc3NpYURpYWxvZy5vcGVuKCk7XG5cdFx0fSxcblx0XHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGRlbW9BcHAuZGlhbG9nRWwubWVzc2lhRGlhbG9nLnNldENvbnRlbnQoXG5cdFx0XHRcdGRlbW9BcHAudGVtcGxhdGUoe1xuXHRcdFx0XHRcdGRlbW9MaXN0OiBkZW1vQXBwLmRlbW9EYXRhLFxuXHRcdFx0XHRcdHNlbGVjdGVkOiBkZW1vQXBwLnNlbGVjdGVkLFxuXHRcdFx0XHRcdHRoZW1lTGljZW5jZUFjdGl2ZTogZGVtb0FwcC50aGVtZUxpY2VuY2VBY3RpdmUsXG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0YWN0aW9uc1RvZ2dsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRmb3IgKHZhciBzdGF0ZSBvZiBPYmplY3Qua2V5cyhkZW1vQXBwLmFjdGlvbnNTdGF0ZSkpIHtcblxuXHRcdFx0XHQvL2xldCBidXR0b25zID0gZGVtb0FwcC5kaWFsb2cudWlEaWFsb2dCdXR0b25QYW5lO1xuXHRcdFx0XHRjb25zdCBidXR0b25zID0gJChkZW1vQXBwLmRpYWxvZ0VsKS5maW5kKCcuYnV0dG9ucGFuZSAuYnV0dG9uc2V0Jyk7XG5cblx0XHRcdFx0c3dpdGNoIChzdGF0ZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2RlbW9DbG9zZSc6XG5cdFx0XHRcdFx0XHRjb25zdCBjbG9zZSA9IGJ1dHRvbnMuZmluZCgnI2RlbW8tY2xvc2UnKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnZGVtb0FkZCc6XG5cdFx0XHRcdFx0XHRjb25zdCBhZGQgPSBidXR0b25zLmZpbmQoJyNkZW1vLWFkZCcpO1xuXG5cdFx0XHRcdFx0XHRpZiAoZGVtb0FwcC5hY3Rpb25zU3RhdGVbc3RhdGVdID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdGFkZC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcyhbJ3VpLWJ1dHRvbi1kaXNhYmxlZCcsICd1aS1zdGF0ZS1kaXNhYmxlZCddKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGFkZC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKFsndWktYnV0dG9uLWRpc2FibGVkJywgJ3VpLXN0YXRlLWRpc2FibGVkJ10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdkZW1vUmVtb3ZlJzpcblx0XHRcdFx0XHRcdGNvbnN0IHJlbW92ZSA9IGJ1dHRvbnMuZmluZCgnI2RlbW8tcmVtb3ZlJyk7XG5cblx0XHRcdFx0XHRcdGlmIChkZW1vQXBwLmFjdGlvbnNTdGF0ZVtzdGF0ZV0gPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnJlbW92ZUNsYXNzKFsndWktYnV0dG9uLWRpc2FibGVkJywgJ3VpLXN0YXRlLWRpc2FibGVkJ10pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkuYWRkQ2xhc3MoWyd1aS1idXR0b24tZGlzYWJsZWQnLCAndWktc3RhdGUtZGlzYWJsZWQnXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2RlbW9JbnN0YWxsJzpcblx0XHRcdFx0XHRcdGNvbnN0IGluc3RhbGwgPSBidXR0b25zLmZpbmQoJyNkZW1vLWluc3RhbGwnKTtcblxuXHRcdFx0XHRcdFx0aWYgKGRlbW9BcHAuYWN0aW9uc1N0YXRlW3N0YXRlXSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnJlbW92ZUNsYXNzKFsndWktYnV0dG9uLWRpc2FibGVkJywgJ3VpLXN0YXRlLWRpc2FibGVkJ10pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKFsndWktYnV0dG9uLWRpc2FibGVkJywgJ3VpLXN0YXRlLWRpc2FibGVkJ10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIEdldCBsaXN0IG9mIGF2YWlsYWJsZSBkZW1vIG9uIHNlcnZlci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgcmVzdWx0LlxuXHRcdCAqL1xuXHRcdGRvQWpheERlbW9HZXRMaXN0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGxldCBkZW1vID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBNZXNzaWEudGFic0RhdGE7XG5cblx0XHRcdFx0ZGVtb194aHJfZ2V0X2xpc3QgPSAkLmFqYXgoe1xuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHR1cmw6IGRhdGEuYWpheFVybCxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IGRhdGEuYWN0aW9uRGVtb0dldExpc3QsXG5cdFx0XHRcdFx0XHRtZXNzaWFOb25jZTogZGF0YS5zZXR0aW5nRm9ybU5vbmNlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoZGVtb194aHJfZ2V0X2xpc3QgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRkZW1vX3hocl9nZXRfbGlzdC5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHRkZW1vX3hocl9nZXRfbGlzdCA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0XHRpZiAoc2VydmVyLnN1Y2Nlc3MgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoc2VydmVyLmRhdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoZGF0YS51bmV4cGVjdGVkRXJyKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cblx0XHRcdFx0XHRcdGlmIChNTEh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiB0ZXh0U3RhdHVzID09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoZGF0YS5hamF4RXJyb3IpKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cykge1xuXHRcdFx0XHRcdFx0ZGVtb194aHJfZ2V0X2xpc3QgPSBudWxsO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZGVtbztcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIERlcGxveSBkZW1vIHBhY2thZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGUgRGVtbyBmaWxlIG5hbWVzLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSByZXN1bHQuXG5cdFx0ICovXG5cdFx0ZG9BamF4RGVtb0luc3RhbGw6IGFzeW5jIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuXG5cdFx0XHRsZXQgaW5zdGFsbCA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IE1lc3NpYS50YWJzRGF0YTtcblxuXHRcdFx0XHRkZW1vX3hocl9pbnN0YWxsID0gJC5hamF4KHtcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0dXJsOiBkYXRhLmFqYXhVcmwsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiBkYXRhLmFjdGlvbkRlbW9JbnN0YWxsLFxuXHRcdFx0XHRcdFx0bWVzc2lhTm9uY2U6IGRhdGEuc2V0dGluZ0Zvcm1Ob25jZSxcblx0XHRcdFx0XHRcdHRlbXBsYXRlRmlsZTogdGVtcGxhdGUsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdGlmIChkZW1vX3hocl9pbnN0YWxsICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0ZGVtb194aHJfaW5zdGFsbC5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHRkZW1vX3hocl9pbnN0YWxsID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0ZGVtb0FwcC5zZXRBY3Rpb25zU3RhdGVzKHtcblx0XHRcdFx0XHRcdFx0ZGVtb1JlbW92ZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGRlbW9JbnN0YWxsOiBmYWxzZSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0aWYgKHNlcnZlci5zdWNjZXNzID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHNlcnZlci5kYXRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKGRhdGEudW5leHBlY3RlZEVycikpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXG5cdFx0XHRcdFx0XHRpZiAoTUxIdHRwUmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgdGV4dFN0YXR1cyA9PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKGRhdGEuYWpheEVycm9yKSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gKE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMpIHtcblx0XHRcdFx0XHRcdGRlbW9feGhyX2luc3RhbGwgPSBudWxsO1xuXHRcdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdwbGF5U291bmQnLCAwLjMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gaW5zdGFsbDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIEFkZCBmaWxlcyB0byBzZXJ2ZXIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0ZpbGV9IGZpbGUgRGVtbyBmaWxlIG9iamVjdC5cblx0XHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblByb2dyZXNzIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdXBsb2FkIHByb2dyZXNzLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSByZXN1bHQuXG5cdFx0ICovXG5cdFx0ZG9BamF4RGVtb0FkZDogYXN5bmMgZnVuY3Rpb24gKGZpbGUsIG9uUHJvZ3Jlc3MpIHtcblxuXHRcdFx0bGV0IGFkZCA9IGF3YWl0IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRkYXRhID0gTWVzc2lhLnRhYnNEYXRhLFxuXHRcdFx0XHRcdGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cblx0XHRcdFx0Zm9ybURhdGEuc2V0KCdhY3Rpb24nLCBkYXRhLmFjdGlvbkRlbW9BZGQpO1xuXHRcdFx0XHRmb3JtRGF0YS5zZXQoJ21lc3NpYU5vbmNlJywgZGF0YS5zZXR0aW5nRm9ybU5vbmNlKTtcblx0XHRcdFx0Zm9ybURhdGEuc2V0KCdkZW1vW10nLCBuZXcgQmxvYihbMF0pLCBmaWxlLm5hbWUpO1xuXHRcdFx0XHRmb3JtRGF0YS5zZXQoJ2RlbW9EYXRhJywgSlNPTi5zdHJpbmdpZnkoW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0XHRcdHN0YXJ0OiB0cnVlLFxuXHRcdFx0XHRcdFx0ZmluaXNoOiBmYWxzZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF0pKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogSGVyZSBpcyBhbiBleGFtcGxlIG9mIHdoYXQgYnJvd3NlciB3aWxsIHNlbmQ6XG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIC0tLS0tLVdlYktpdEZvcm1Cb3VuZGFyeTBOOTRCRXJENVdIOGNpNWNcblx0XHRcdFx0ICpcdENvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cImFjdGlvblwiXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqXHRtZXNzaWFfZGVtb19hZGRcblx0XHRcdFx0ICpcdC0tLS0tLVdlYktpdEZvcm1Cb3VuZGFyeTBOOTRCRXJENVdIOGNpNWNcblx0XHRcdFx0ICpcdENvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cIm1lc3NpYU5vbmNlXCJcblx0XHRcdFx0ICpcblx0XHRcdFx0ICpcdDg2OWM2ZmIyZWZcblx0XHRcdFx0ICpcdC0tLS0tLVdlYktpdEZvcm1Cb3VuZGFyeTBOOTRCRXJENVdIOGNpNWNcblx0XHRcdFx0ICpcdENvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cImRlbW9EYXRhXCJcblx0XHRcdFx0ICpcblx0XHRcdFx0ICpcdFt7XCJuYW1lXCI6XCJ2aDE1OTEyMV9kZW1vX21lc3NpYXdwX2R1bXBfKDE2LTA5LTIwMjFfMTMtMDAtNTUpLnppcFwiLFwic2l6ZVwiOjMzMDg4MDAyLFwic3RhcnRcIjp0cnVlLFwiZmluaXNoXCI6ZmFsc2V9XVxuXHRcdFx0XHQgKlx0LS0tLS0tV2ViS2l0Rm9ybUJvdW5kYXJ5ME45NEJFckQ1V0g4Y2k1Y1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0Y29uc3QgbG4gPSBBcnJheS5mcm9tKGZvcm1EYXRhLmVudHJpZXMoKSwgKFtrZXksIHByb3BdKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiBwcm9wID09PSBcInN0cmluZ1wiXG5cdFx0XHRcdFx0XHQ/IChrZXkubGVuZ3RoICsgMTAwKSArIChwcm9wLmxlbmd0aCArIDUwKVxuXHRcdFx0XHRcdFx0OiAoa2V5Lmxlbmd0aCArIDEwMCkgKyAocHJvcC5zaXplICsgNTApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdGNodW5rU2l6ZSA9IGRhdGEucG9zdE1heFNpemUgLSBsbi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSwgLy8gY3VycmVudCBzaXplIG9mIEZvcm1zRGF0YS5cblx0XHRcdFx0XHRzdGVwcyA9IE1hdGgudHJ1bmMoZmlsZS5zaXplIC8gY2h1bmtTaXplKTtcblxuXHRcdFx0XHRmb3IgKGxldCBzdGFydCA9IDAsIHN0ZXAgPSAwOyBzdGFydCA8IGZpbGUuc2l6ZTsgc3RhcnQgKz0gY2h1bmtTaXplLCBzdGVwKyspIHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0dHJTdGFydCA9IHN0ZXAgPT09IDAsXG5cdFx0XHRcdFx0XHR0ckZpbmlzaCA9IE1hdGgudHJ1bmMoc3RlcHMpID09PSBzdGVwLFxuXHRcdFx0XHRcdFx0Y2h1bmsgPSBmaWxlLnNsaWNlKHN0YXJ0LCBzdGFydCArIGNodW5rU2l6ZSk7XG5cblx0XHRcdFx0XHRmb3JtRGF0YS5zZXQoJ2RlbW9bXScsIGNodW5rLCBmaWxlLm5hbWUpO1xuXHRcdFx0XHRcdGZvcm1EYXRhLnNldCgnZGVtb0RhdGEnLCBKU09OLnN0cmluZ2lmeShbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0XHRcdFx0c2l6ZTogZmlsZS5zaXplLFxuXHRcdFx0XHRcdFx0XHRzdGFydDogdHJTdGFydCxcblx0XHRcdFx0XHRcdFx0ZmluaXNoOiB0ckZpbmlzaCxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdKSk7XG5cblx0XHRcdFx0XHRhd2FpdCAkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdFx0dXJsOiBkYXRhLmFqYXhVcmwsXG5cdFx0XHRcdFx0XHRkYXRhOiBmb3JtRGF0YSxcblx0XHRcdFx0XHRcdGVuY3R5cGU6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcblx0XHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRcdC8vIGNhY2hlOiBmYWxzZSxcblx0XHRcdFx0XHRcdC8vIGRhdGFUeXBlOiAnSlNPTicsXG5cdFx0XHRcdFx0XHQvLyBhc3luYzogdHJ1ZSxcblx0XHRcdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChYTUxIdHRwUmVxdWVzdCwgUmVxdWVzdERhdGEpIHtcblxuXHRcdFx0XHRcdFx0XHRkZW1vQXBwLnNldEFjdGlvbnNTdGF0ZXMoe1xuXHRcdFx0XHRcdFx0XHRcdGRlbW9SZW1vdmU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdGRlbW9JbnN0YWxsOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly9wYXRjaCBhamF4IHNldHRpbmdzIHRvIGNhbGwgYSBwcm9ncmVzcyBjYWxsYmFja1xuXHRcdFx0XHRcdFx0XHR2YXIgY3VyclhIUiA9IFJlcXVlc3REYXRhLnhocjtcblx0XHRcdFx0XHRcdFx0UmVxdWVzdERhdGEueGhyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciB4aHIgPSBjdXJyWEhSLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChldnQpID0+IG9uUHJvZ3Jlc3MoZXZ0LCBzdGVwLCBzdGVwcyksIGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geGhyO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0ckZpbmlzaCkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHNlcnZlci5kYXRhKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihkYXRhLnVuZXhwZWN0ZWRFcnIpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoTUxIdHRwUmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgdGV4dFN0YXR1cyA9PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKGRhdGEuYWpheEVycm9yKSk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Zm9ybURhdGEuZGVsZXRlKCdkZW1vW10nKTtcblx0XHRcdFx0XHRmb3JtRGF0YS5kZWxldGUoJ2RlbW9EYXRhJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGFkZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBmaWxlcyBmcm9tIHNlcnZlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGVtb3MgRGVtbyBmaWxlIG5hbWVzLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSByZXN1bHQuXG5cdFx0ICovXG5cdFx0ZG9BamF4RGVtb1JlbW92ZTogYXN5bmMgZnVuY3Rpb24gKGRlbW9zKSB7XG5cblx0XHRcdGxldCBhZGQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBNZXNzaWEudGFic0RhdGE7XG5cblx0XHRcdFx0ZGVtb194aHJfcmVtb3ZlID0gJC5hamF4KHtcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0dXJsOiBkYXRhLmFqYXhVcmwsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiBkYXRhLmFjdGlvbkRlbW9SZW1vdmUsXG5cdFx0XHRcdFx0XHRtZXNzaWFOb25jZTogZGF0YS5zZXR0aW5nRm9ybU5vbmNlLFxuXHRcdFx0XHRcdFx0ZGVtb3M6IGRlbW9zLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoZGVtb194aHJfcmVtb3ZlICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0ZGVtb194aHJfcmVtb3ZlLmFib3J0KCk7XG5cdFx0XHRcdFx0XHRcdGRlbW9feGhyX3JlbW92ZSA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGRlbW9BcHAuc2V0QWN0aW9uc1N0YXRlcyh7XG5cdFx0XHRcdFx0XHRcdGRlbW9SZW1vdmU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRkZW1vSW5zdGFsbDogZmFsc2UsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShzZXJ2ZXIuZGF0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihkYXRhLnVuZXhwZWN0ZWRFcnIpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblxuXHRcdFx0XHRcdFx0aWYgKE1MSHR0cFJlcXVlc3Quc3RhdHVzID09PSAwICYmIHRleHRTdGF0dXMgPT0gJ2Fib3J0Jykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihkYXRhLmFqYXhFcnJvcikpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRkZW1vX3hocl9yZW1vdmUgPSBudWxsO1xuXHRcdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdwbGF5U291bmQnLCAwLjMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gYWRkO1xuXHRcdH0sXG5cdFx0ZXZlbnRzOiB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkIGV2ZW50cyB0byBhIGRpYWxvZyBvYmplY3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHQgKi9cblx0XHRcdGFkZDogKCkgPT4ge1xuXHRcdFx0XHQkKGRlbW9BcHAuZGlhbG9nRWwpLm9uKCdjbGljaycsICcucGFja2FnZS1pdGVtJywgZGVtb0FwcC5ldmVudHMuZGVtb0l0ZW1TZWxlY3RIYW5kbGVyKTtcblx0XHRcdFx0JChkZW1vQXBwLmRpYWxvZ0VsKS5vbignbWVzc2lhQ2hhbmdlRGVtb0RhdGEnLCBkZW1vQXBwLnJlbmRlcik7XG5cdFx0XHRcdCQoZGVtb0FwcC5kaWFsb2dFbCkub24oJ21lc3NpYUNoYW5nZUFjdGlvbnNTdGF0ZScsIGRlbW9BcHAuYWN0aW9uc1RvZ2dsZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJlbW92ZSBldmVudHMgZnJvbSBhIGRpYWxvZyBvYmplY3QuXG5cdFx0XHQgKiBKUSByZWFsbHkgc3RyYW5nZSAtIGFmdGVyIHJlbW92aW5nIGVsZW1lbnQgZnJvbSBET01cblx0XHRcdCAqIChkaWFsb2cgZGVzdHJveSkgYW5kIHJlLWNyZWF0aW5nIHNhbWUgbmV3IG9uZVxuXHRcdFx0ICogaXQgc3RpbGwgdHJhY2sgb2xkIGV2ZW50cy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHZvaWRcblx0XHRcdCAqL1xuXHRcdFx0cmVtb3ZlOiAoKSA9PiB7XG5cdFx0XHRcdCQoZGVtb0FwcC5kaWFsb2dFbCkub2ZmKCdjbGljayBtZXNzaWFDaGFuZ2VEZW1vRGF0YSBtZXNzaWFDaGFuZ2VBY3Rpb25zU3RhdGUnKTtcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZXJzIGZvciBkaWFsb2cgYnV0dG9ucyBldmVudHMuXG5cdFx0XHQgKi9cblx0XHRcdGJ1dHRvbnM6IHtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogT24gY2xvc2UgZGlhbG9nIG9iamVjdC5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRjbG9zZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZGVtb0FwcC5ldmVudHMucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JCh0aGlzKS50cmlnZ2VyKCdkaWFsb2dDbG9zZWQnLCBbJ2Nsb3NlJ10pO1xuXHRcdFx0XHRcdCQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIE9uIHVwbG9hZGluZyBmaWxlcy5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRkZW1vQWRkOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRcdGlmICghd2luZG93LkZvcm1EYXRhKSB7XG5cdFx0XHRcdFx0XHRhbGVydChNZXNzaWEudGFic0RhdGEuZm9ybURhdGFFcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxldFxuXHRcdFx0XHRcdFx0ZmlsZXNfc2l6ZV90b3RhbCA9IDAsXG5cdFx0XHRcdFx0XHRmaWxlc19zaXplX2xvYWRlZCA9IDAsXG5cdFx0XHRcdFx0XHRwcmV2X3N0ZXAgPSAwLFxuXHRcdFx0XHRcdFx0cHJldl9sb2FkZWQgPSAwO1xuXG5cdFx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRcdGFsbG93ZWRfbWltZV90eXBlcyA9IE1lc3NpYS50YWJzRGF0YS5kZW1vLmFsbG93ZWRNaW1lVHlwZXMsXG5cdFx0XHRcdFx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cblx0XHRcdFx0XHRsZXQgb25Qcm9ncmVzcyA9IChldnQsIHN0ZXAsIHN0ZXBzKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICogT25wcm9ncmVzcyB0cmlnZ2VycyBldmVyeSB0aW1lIHNvbWV0aGluZyB3YXMgcGFzc2VkIHRvIHNlcnZlci5cblx0XHRcdFx0XHRcdFx0ICogQnV0IHdlIHNlbmQgbXVsdGlwbGUgZmlsZXMgd2hlcmUgZWFjaCBvbmUgc3BsaXR0ZWQgaW50byBjaHVua3Mgd2hpY2hcblx0XHRcdFx0XHRcdFx0ICogc2l6ZSBkZXBlbmRzIG9uIHNlcnZlciBzZXR0aW5ncywgc28gd2UgZG8gbm90IGtub3cgc2l6ZSBvZiB0aGUgY2h1bmsuXG5cdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdCAqIEV2ZW50LmxvYWRlZCBjb250YWlucyBydW5uaW5nIHN1bSBvZiBwYXNzZWQgZGF0YSBzdGFydGluZyBmcm9tIHRoZSBiZWdpbm5pbmdcblx0XHRcdFx0XHRcdFx0ICogb2YgY2h1bmsgdHJhbnNtaXR0aW5nIGFuZCBOT1QgdGhlIGFtb3VudCBvZiBkYXRhIHBhc3NlZCBpbnNpZGUgc2luZ2xlIHRyYW5zbWl0LlxuXHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHQgKiBTbyB3aXRoaW4gc2luZ2xlIGNodW5rIHdlIGhhdmUgdG8gcmVkdWNlIGxvYWRlZCBieSBsb2FkZWQgYXQgcHJldiBzdGVwLlxuXHRcdFx0XHRcdFx0XHQgKiBPdGhlcndpc2Ugd2Ugd2lsbCBnZXQgdGhpczpcblx0XHRcdFx0XHRcdFx0ICogTGV0cyBzYXkgdGhlIHNpemUgb2YgY2h1bmsgaXMgNU1iLlxuXHRcdFx0XHRcdFx0XHQgKiBXZSBjb3VsZCBnZXQgaGVyZSBsb2FkZWQgYXQgMXN0IHN0ZXAgMU1iLCBhdCAybmQgM01iLCBhdCAzcmQgNU1iLlxuXHRcdFx0XHRcdFx0XHQgKiBBbmQgaWYgdG8gMSszKzUgPSA5IC0+IGl0IHdpbGwgYmUgd3Jvbmcgc3VtIGFnYWlucyA1TUIuXG5cdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRpZiAocHJldl9zdGVwID09PSBzdGVwKSB7Ly8gU2FtZSBjaHVuayBhcyBwcmV2LlxuXHRcdFx0XHRcdFx0XHRcdGZpbGVzX3NpemVfbG9hZGVkICs9IGV2dC5sb2FkZWQgLSBwcmV2X2xvYWRlZDtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHsvLyBOZXcgY2h1bmsuXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNfc2l6ZV9sb2FkZWQgKz0gZXZ0LmxvYWRlZDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHByZXZfc3RlcCA9IHN0ZXA7XG5cdFx0XHRcdFx0XHRcdHByZXZfbG9hZGVkID0gZXZ0LmxvYWRlZDtcblxuXHRcdFx0XHRcdFx0XHRsZXRcblx0XHRcdFx0XHRcdFx0XHRwZXJjZW50Q29tcGxldGUgPSBmaWxlc19zaXplX2xvYWRlZCAvIGZpbGVzX3NpemVfdG90YWwgKiAxMDAsXG5cdFx0XHRcdFx0XHRcdFx0cHJvZ3Jlc3NFbCA9ICQoZGVtb0FwcC5kaWFsb2dFbCkuZmluZCgnI2RlbW8tdXBsb2FkLXByb2dyZXNzJykuY3NzKCd0cmFuc2l0aW9uJywgJ2JhY2tncm91bmQtc2l6ZSAuM3MnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAocGVyY2VudENvbXBsZXRlID4gMTAwKSBwZXJjZW50Q29tcGxldGUgPSAxMDA7XG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzRWwgPSBwcm9ncmVzc0VsLmNzcygnYmFja2dyb3VuZC1zaXplJywgYCR7cGVyY2VudENvbXBsZXRlfSVgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbnB1dC50eXBlID0gJ2ZpbGUnO1xuXHRcdFx0XHRcdGlucHV0Lm11bHRpcGxlID0gJ3RydWUnO1xuXHRcdFx0XHRcdGlucHV0LmFjY2VwdCA9IGFsbG93ZWRfbWltZV90eXBlcy5taW1lcy5qb2luKCcsJyk7XG5cblx0XHRcdFx0XHQvLyBIYW5kbGVyIGZvciBmaWxlKHMpIHNlbGVjdGlvbi5cblx0XHRcdFx0XHQkKGlucHV0KS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRsZXQgZmlsZXNWYWxpZCA9IFtdO1xuXG5cdFx0XHRcdFx0XHRpZiAoJCh0aGlzKS5wcm9wKCdmaWxlcycpLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSAkKHRoaXMpLnByb3AoJ2ZpbGVzJyk7XG5cblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGZpbGUgPSBmaWxlc1tpXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIHZhbGlkYXRlIGZpbGUgdHlwZVxuXHRcdFx0XHRcdFx0XHRcdGlmIChhbGxvd2VkX21pbWVfdHlwZXMubWltZXMuaW5kZXhPZihmaWxlLnR5cGUpID09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBtc2cgPSBhbGxvd2VkX21pbWVfdHlwZXMud2FybmluZy5yZXBsYWNlKC8lZmlsZVR5cGUlL2dpLCBmaWxlLnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIG1zZywgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGZpbGVzX3NpemVfdG90YWwgPSBmaWxlc19zaXplX3RvdGFsICsgZmlsZS5zaXplO1xuXHRcdFx0XHRcdFx0XHRcdGZpbGVzVmFsaWQucHVzaChmaWxlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRNZXNzaWEuY29uZmlybShNZXNzaWEudGFic0RhdGEuZGVtby5jb25maXJtRGVtb0FkZClcblx0XHRcdFx0XHRcdFx0LnRoZW4oKGNvbmZpcm1lZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHVwbG9hZHMgPSBbXTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVmFsaWQubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVzVmFsaWRbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBhY3Rpb24gPSBkZW1vQXBwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb0FqYXhEZW1vQWRkKGZpbGUsIG9uUHJvZ3Jlc3MpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YS5jb2RlID09PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIGRhdGEubXNnLCAnZXJyb3InKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBlcnJvci5tZXNzYWdlLCAnZXJyb3InKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdHVwbG9hZHMucHVzaChhY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFByb21pc2Vcblx0XHRcdFx0XHRcdFx0XHRcdC5hbGxTZXR0bGVkKHVwbG9hZHMpXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbigocmVzdWx0cykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3BsYXlTb3VuZCcsIDAuMyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoZGVtb0FwcC5kaWFsb2dFbClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnI2RlbW8tdXBsb2FkLXByb2dyZXNzJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuY3NzKCd0cmFuc2l0aW9uJywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmNzcygnYmFja2dyb3VuZC1zaXplJywgJycpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGRlbW9EYXRhQ3VyciA9IGRlbW9BcHAuZGVtb0RhdGE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlbW9EYXRhTmV3ID0gW107XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0LnN0YXR1cyAhPT0gJ2Z1bGZpbGxlZCcpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlbW9EYXRhTmV3ID0gZGVtb0RhdGFOZXcuY29uY2F0KHJlc3VsdC52YWx1ZS5kZW1vRGF0YSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWZ1bGZpbGxlZCkgcmV0dXJuOyAvLyBObyBvbmUgcmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVtb0RhdGFOZXcgPSBbLi4ubmV3IFNldChkZW1vRGF0YU5ldyldO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlbW9BcHAuc2VsZWN0ZWQgPSBkZW1vRGF0YU5ldy5maWx0ZXIoeCA9PiAhZGVtb0RhdGFDdXJyLmluY2x1ZGVzKHgpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVtb0FwcC5zZXREZW1vU3RhdGUoZGVtb0RhdGFOZXcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlbW9BcHAuc2V0QWN0aW9uc1N0YXRlcyh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVtb1JlbW92ZTogZGVtb0FwcC5zZWxlY3RlZC5sZW5ndGggPiAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlbW9JbnN0YWxsOiBkZW1vQXBwLnNlbGVjdGVkLmxlbmd0aCA9PT0gMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aW5wdXQuY2xpY2soKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogT24gZGVsZXRpbmcgZGVtbyBwYWNrYWdlcy5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQHJldHVybiB2b2lkXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRkZW1vUmVtb3ZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRcdGlmICghZGVtb0FwcC5pc0FjdGlvbkFsbG93ZWQoJ2RlbW9SZW1vdmUnKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdE1lc3NpYS5jb25maXJtKE1lc3NpYS50YWJzRGF0YS5kZW1vLmNvbmZpcm1EZW1vUmVtb3ZlKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGNvbmZpcm1lZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5zZWxlY3RlZCcpLmFkZENsYXNzKCdpcy1idXN5Jyk7XG5cdFx0XHRcdFx0XHRcdGRlbW9BcHBcblx0XHRcdFx0XHRcdFx0XHQuZG9BamF4RGVtb1JlbW92ZShkZW1vQXBwLnNlbGVjdGVkKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZW1vQXBwLnNlbGVjdGVkID0gW107XG5cdFx0XHRcdFx0XHRcdFx0XHRkZW1vQXBwLnNldERlbW9TdGF0ZShkYXRhLmRlbW9EYXRhKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVtb0FwcC5zZXRBY3Rpb25zU3RhdGVzKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVtb1JlbW92ZTogZGVtb0FwcC5zZWxlY3RlZC5sZW5ndGggPiAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZW1vSW5zdGFsbDogZGVtb0FwcC5zZWxlY3RlZC5sZW5ndGggPT09IDEsXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEuY29kZSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdC5maW5hbGx5KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ2lzLWJ1c3knKTtcblx0XHRcdFx0XHRcdFx0XHR9KTs7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogT24gY2xpY2sgdG8gaW5zdGFsbCBkZW1vIHBhY2thZ2UuXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZGVtb0luc3RhbGw6IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdFx0aWYgKCFkZW1vQXBwLmlzQWN0aW9uQWxsb3dlZCgnZGVtb0luc3RhbGwnKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdE1lc3NpYS5jb25maXJtKE1lc3NpYS50YWJzRGF0YS5kZW1vLmNvbmZpcm1EZW1vSW5zdGFsbClcblx0XHRcdFx0XHRcdC50aGVuKChjb25maXJtZWQpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5zZWxlY3RlZCcpLmFkZENsYXNzKCdpcy1idXN5Jyk7XG5cdFx0XHRcdFx0XHRcdGRlbW9BcHBcblx0XHRcdFx0XHRcdFx0XHQuZG9BamF4RGVtb0luc3RhbGwoZGVtb0FwcC5zZWxlY3RlZFswXSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEuY29kZSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChkYXRhLnJlbG9hZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdC5maW5hbGx5KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ2lzLWJ1c3knKTtcblx0XHRcdFx0XHRcdFx0XHR9KTs7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBIYW5kbGVycyBmb3IgY2xpY2sgb24gZGVtbyBpdGVtLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4gdm9pZFxuXHRcdFx0ICovXG5cdFx0XHRkZW1vSXRlbVNlbGVjdEhhbmRsZXI6IGZ1bmN0aW9uIG5hbWUoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZGVtb194aHJfaW5zdGFsbCAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgaXRlbXMgPSAkKHRoaXMpLnBhcmVudHMoJy5kZW1vLXBhY2thZ2UtaXRlbXMnKTtcblxuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBpdGVtcy5maW5kKCdzZWxlY3RlZCcpO1xuXG5cdFx0XHRcdGxldCBzZWxlY3RlZEN1cnIgPSBkZW1vQXBwLmRlbW9EYXRhO1xuXHRcdFx0XHRsZXQgc2VsZWN0ZWROZXcgPSBpdGVtcy5maW5kKCcuc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRpZiAoSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRDdXJyKSAhPT0gSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWROZXcpKSB7XG5cblx0XHRcdFx0XHRkZW1vQXBwLnNlbGVjdGVkID0gc2VsZWN0ZWROZXcudG9BcnJheSgpLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IGVsZW1lbnQuaWQpO1xuXG5cdFx0XHRcdFx0ZGVtb0FwcC5zZXRBY3Rpb25zU3RhdGVzKHtcblx0XHRcdFx0XHRcdGRlbW9SZW1vdmU6IGRlbW9BcHAuc2VsZWN0ZWQubGVuZ3RoID4gMCxcblx0XHRcdFx0XHRcdGRlbW9JbnN0YWxsOiBkZW1vQXBwLnNlbGVjdGVkLmxlbmd0aCA9PT0gMSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHNldERlbW9TdGF0ZTogKGRlbW9EYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdGRlbW9EYXRhQ3VyciA9IGRlbW9BcHAuZGVtb0RhdGEsXG5cdFx0XHRcdGRlbW9EYXRhTmV3ID0gZGVtb0RhdGE7XG5cblx0XHRcdGlmIChKU09OLnN0cmluZ2lmeShkZW1vRGF0YUN1cnIpICE9PSBKU09OLnN0cmluZ2lmeShkZW1vRGF0YU5ldykpIHtcblx0XHRcdFx0ZGVtb0FwcC5kZW1vRGF0YSA9IGRlbW9EYXRhO1xuXHRcdFx0XHQkKGRlbW9BcHAuZGlhbG9nRWwpLnRyaWdnZXIoJ21lc3NpYUNoYW5nZURlbW9EYXRhJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1cGRhdGVEZW1vU3RhdGU6IChzaWxlbnQgPSB0cnVlKSA9PiB7XG5cblx0XHRcdHJldHVybiBkZW1vQXBwLmRvQWpheERlbW9HZXRMaXN0KClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0ZGVtb0RhdGFDdXJyID0gZGVtb0FwcC5kZW1vRGF0YSxcblx0XHRcdFx0XHRcdGxpY2VuY2VBY3RpdmVDdXJyID0gZGVtb0FwcC50aGVtZUxpY2VuY2VBY3RpdmUsXG5cdFx0XHRcdFx0XHRkZW1vRGF0YU5ldyA9IGRhdGEuZGVtb0RhdGEsXG5cdFx0XHRcdFx0XHRsaWNlbmNlQWN0aXZlTmV3ID0gZGF0YS50aGVtZUxpY2VuY2VBY3RpdmUsXG5cdFx0XHRcdFx0XHRnb09uID0gSlNPTi5zdHJpbmdpZnkoZGVtb0RhdGFDdXJyKSAhPT0gSlNPTi5zdHJpbmdpZnkoZGVtb0RhdGFOZXcpIHx8IGxpY2VuY2VBY3RpdmVDdXJyICE9PSBsaWNlbmNlQWN0aXZlTmV3O1xuXG5cdFx0XHRcdFx0ZGVtb0FwcC5zZXRBY3Rpb25zU3RhdGVzKHtcblx0XHRcdFx0XHRcdGRlbW9BZGQ6IGxpY2VuY2VBY3RpdmVOZXcgPT09IHRydWUsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRpZiAoZ29Pbikge1xuXG5cdFx0XHRcdFx0XHRkZW1vQXBwLmRlbW9EYXRhID0gZGF0YS5kZW1vRGF0YTtcblx0XHRcdFx0XHRcdGRlbW9BcHAudGhlbWVMaWNlbmNlQWN0aXZlID0gZGF0YS50aGVtZUxpY2VuY2VBY3RpdmU7XG5cdFx0XHRcdFx0XHQkKGRlbW9BcHAuZGlhbG9nRWwpLnRyaWdnZXIoJ21lc3NpYUNoYW5nZURlbW9EYXRhJyk7XG5cblx0XHRcdFx0XHRcdGlmICghc2lsZW50KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChkYXRhLmNvZGUgPT09IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLm1zZywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZGF0YS5tc2csICdlcnJvcicpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygncGxheVNvdW5kJywgMC4zKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5maW5hbGx5KCgpID0+IFByb21pc2UucmVzb2x2ZSgncmVmcmVzaGVkJykpO1xuXHRcdH0sXG5cdFx0c2V0QWN0aW9uc1N0YXRlczogKHN0YXRlcykgPT4ge1xuXHRcdFx0bGV0IHN0YXRlQ3VyciA9IGRlbW9BcHAuYWN0aW9uc1N0YXRlO1xuXHRcdFx0bGV0IHN0YXRlTmV3ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVDdXJyLCBzdGF0ZXMpO1xuXG5cdFx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHN0YXRlc1snZGVtb0luc3RhbGwnXSAmJiBzdGF0ZXNbJ2RlbW9JbnN0YWxsJ10gPT09IHRydWUgJiYgZGVtb194aHJfaW5zdGFsbCAhPT0gbnVsbCkge1xuXHRcdFx0XHRzdGF0ZU5ld1snZGVtb0luc3RhbGwnXSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoSlNPTi5zdHJpbmdpZnkoc3RhdGVDdXJyKSAhPT0gSlNPTi5zdHJpbmdpZnkoc3RhdGVOZXcpKSB7XG5cblx0XHRcdFx0ZGVtb0FwcC5hY3Rpb25zU3RhdGUgPSBzdGF0ZU5ldztcblx0XHRcdFx0JChkZW1vQXBwLmRpYWxvZ0VsKS50cmlnZ2VyKCdtZXNzaWFDaGFuZ2VBY3Rpb25zU3RhdGUnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGlzQWN0aW9uQWxsb3dlZDogKGFjdGlvbikgPT4ge1xuXHRcdFx0cmV0dXJuIGRlbW9BcHAuYWN0aW9uc1N0YXRlW2FjdGlvbl07XG5cdFx0fSxcblx0fTtcblxuXHQkKCcud3JhcCAjaW5zdGFsbC1kZW1vJykub24oJ2NsaWNrJywgZGVtb0FwcC5pbml0KTtcbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHhociA9IG51bGw7XG5cblx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG5cblx0XHRcdGlmIChUYWJzUGx1Z2luRnJhbWVXb3JrTWV0aG9kc1ttZXRob2RdKSB7XG5cdFx0XHRcdHJldHVybiBUYWJzUGx1Z2luRnJhbWVXb3JrTWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0XHQkLmVycm9yKCdBcmd1bWVudCBcIk1ldGhvZFwiIHJlcXVpcmVkIGZvciBqUXVlcnkuVGFic1BsdWdpbkZyYW1lV29yaycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgalF1ZXJ5LlRhYnNQbHVnaW5GcmFtZVdvcmsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBUYWJzUGx1Z2luRnJhbWVXb3JrTWV0aG9kcyA9IHtcblxuXHRcdFx0c2hvd01lc3NhZ2U6IGZ1bmN0aW9uIChkYXRhLCB0eXBlLCBjYXB0aW9uID0gJ05vdGlmaWNhdGlvbicpIHtcblxuXHRcdFx0XHR2YXIgYXBwZW5kX2NvbnRlbnQgPSAnJztcblxuXHRcdFx0XHRpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBkYXRhKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRcdGFwcGVuZF9jb250ZW50ID0gYXBwZW5kX2NvbnRlbnQgKyAnPGRpdj4nICsga2V5ICsgXCI6IFwiICsgZGF0YVtrZXldICsgJzwvZGl2Pic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCdlcnJvcicgPT09IHR5cGVvZiBkYXRhKSB7XG5cdFx0XHRcdFx0YXBwZW5kX2NvbnRlbnQgPSBhcHBlbmRfY29udGVudCArICc8ZGl2PicgKyBkYXRhLnRvU3RyaW5nKCkgKyAnPC9kaXY+Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICgnYXJyYXknID09PSB0eXBlb2YgZGF0YSkge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0YXBwZW5kX2NvbnRlbnQgPSBhcHBlbmRfY29udGVudCArICc8ZGl2PicgKyBkYXRhW2ldICsgJzwvZGl2Pic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgZGF0YSkge1xuXHRcdFx0XHRcdGFwcGVuZF9jb250ZW50ID0gJzxkaXY+JyArIGRhdGEgKyAnPC9kaXY+Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmlnaHQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBib3R0b20gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBhY3RpdmVfbWVzc2FnZXMgPSAkKCcubWVzc2FnZS13cmFwcGVyJyk7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gJChgPGRpdiBjbGFzcz1cIm1lc3NhZ2Utd3JhcHBlclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtZW51LXBhZ2UtbWVzc2FnZSByYy0ke3R5cGV9XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtZW51LWlubmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1lbnUtb3BlcmF0ZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcHRpb25cIj4ke2NhcHRpb259PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2xvc2VcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29udGVudFwiPiR7YXBwZW5kX2NvbnRlbnR9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+YCk7XG5cblx0XHRcdFx0aWYgKGFjdGl2ZV9tZXNzYWdlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5hcHBlbmRUbygnYm9keScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdFx0dmFyIGNsb3Nlc3RfbWVzc2FnZSA9IGFjdGl2ZV9tZXNzYWdlcy5sYXN0KCk7XG5cdFx0XHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2UuaW5zZXJ0QWZ0ZXIoY2xvc2VzdF9tZXNzYWdlKTtcblx0XHRcdFx0XHRib3R0b20gPSBwYXJzZUludChjbG9zZXN0X21lc3NhZ2UuY3NzKCdib3R0b20nKSkgKyA0O1xuXHRcdFx0XHRcdHJpZ2h0ID0gcGFyc2VJbnQoY2xvc2VzdF9tZXNzYWdlLmNzcygncmlnaHQnKSkgKyA0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHRtZXNzYWdlXG5cdFx0XHRcdFx0XHQuZHJhZ2dhYmxlKHtcblx0XHRcdFx0XHRcdFx0Y29udGFpbm1lbnQ6ICd3aW5kb3cnLFxuXHRcdFx0XHRcdFx0XHRjdXJzb3I6ICdtb3ZlJyxcblx0XHRcdFx0XHRcdFx0c2Nyb2xsOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Ly9zbmFwOiAnaHRtbCcsXG5cdFx0XHRcdFx0XHRcdC8vc25hcFRvbGVyYW5jZTogMTAsXG5cdFx0XHRcdFx0XHRcdGhhbmRsZTogJy5tZW51LW9wZXJhdGUnLCAvLyBkb2VzIG5vdCB3b3JrIHdpdGggcG9zaXRpb24gJ2ZpeGVkJ1xuXHRcdFx0XHRcdFx0XHRzdGFydDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRcdFx0XHRcdHVpLmhlbHBlci5jc3Moe1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym90dG9tOiAnYXV0bycsXG5cdFx0XHRcdFx0XHRcdFx0XHRyaWdodDogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jc3Moe1xuXHRcdFx0XHRcdFx0XHQncmlnaHQnOiBgJHtyaWdodH1weGAsXG5cdFx0XHRcdFx0XHRcdCdib3R0b20nOiBgJHtib3R0b219cHhgLFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5zaG93KHtcblx0XHRcdFx0XHRcdFx0ZWZmZWN0OiBcImZhZGVcIixcblx0XHRcdFx0XHRcdFx0ZGlyZWN0aW9uOiAnaW4nLFxuXHRcdFx0XHRcdFx0fSwgMjAwLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKCdzaG93bicpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5yZXNpemFibGUoe1xuXHRcdFx0XHRcdFx0XHRzdGFydDogZnVuY3Rpb24gKGV2ZW50LCB1aSkgeyB9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dmFyIGNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0bWVzc2FnZS5maW5kKCcubWVudS1vcGVyYXRlIC5jbG9zZScpLnRyaWdnZXJIYW5kbGVyKCdjbGljaycsIFsxMjAwXSk7XG5cdFx0XHRcdH0sIDM1MDApO1xuXG5cdFx0XHRcdHRoaXMuVGFic1BsdWdpbkZyYW1lV29yaygnY2xvc2VNZXNzYWdlJywgbWVzc2FnZSk7XG5cdFx0XHRcdHRoaXMuVGFic1BsdWdpbkZyYW1lV29yaygnc3RvcENsb3NlTWVzc2FnZScsIG1lc3NhZ2UsIGNsb3NlVGltZXIpO1xuXG5cdFx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdFx0fSxcblx0XHRcdGNsb3NlTWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UsIGR1cmF0aW9uKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgKGR1cmF0aW9uKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdGR1cmF0aW9uID0gMjAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG1lc3NhZ2UuZmluZCgnLm1lbnUtb3BlcmF0ZSAuY2xvc2UnKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlLCBkdXJhdGlvbikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGUuaXNUcmlnZ2VyKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0bWVzc2FnZS5vZmYoJ21vdXNlb3ZlcicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtZXNzYWdlLmhpZGUoe1xuXHRcdFx0XHRcdFx0ZWZmZWN0OiBcImZhZGVcIixcblx0XHRcdFx0XHRcdGRpcmVjdGlvbjogJ291dCcsXG5cdFx0XHRcdFx0fSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UuZHJhZ2dhYmxlKCdkZXN0cm95JykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHN0b3BDbG9zZU1lc3NhZ2U6IGZ1bmN0aW9uIChtZXNzYWdlLCBjbG9zZVRpbWVyKSB7XG5cdFx0XHRcdG1lc3NhZ2Uub24oJ21vdXNlb3ZlcicsIHsgdGltZXJJZDogY2xvc2VUaW1lciB9LCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChlLmRhdGEudGltZXJJZCk7XG5cdFx0XHRcdFx0bWVzc2FnZS5zdG9wKHRydWUpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0J29wYWNpdHknOiAnMScsXG5cdFx0XHRcdFx0fSwgMzAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlLmNzcygnb3BhY2l0eScsICcnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlQ29udHJvbHM6IGZ1bmN0aW9uIChuZXdTZXR0aW5ncykge1xuXG5cdFx0XHRcdE1lc3NpYS50b2dnbGVfc2F2ZV9vcGVyYXRlKCdvZmYnLCBNZXNzaWEuYWxsSW5wdXRzKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbmV3U2V0dGluZ3MpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIChuZXdTZXR0aW5nc1trZXldKSA9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0bmV3U2V0dGluZ3Nba2V5XSA9IG5ld1NldHRpbmdzW2tleV0ucmVwbGFjZSgvXFxcXFwiL2csICdcIicpO1xuXHRcdFx0XHRcdFx0bmV3U2V0dGluZ3Nba2V5XSA9IG5ld1NldHRpbmdzW2tleV0ucmVwbGFjZSgvXFxcXCcvZywgJ1xcJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcm1Db250cm9scyA9IE1lc3NpYS5nZXRfZm9ybV9jb250cm9scygpO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybUNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgY29udHJvbE5hbWUgPSBmb3JtQ29udHJvbHNbaV0ubmFtZTtcblx0XHRcdFx0XHR2YXIgY29udHJvbFZhbCA9IG5ld1NldHRpbmdzW2NvbnRyb2xOYW1lXTtcblxuXHRcdFx0XHRcdHN3aXRjaCAoZm9ybUNvbnRyb2xzW2ldLm5vZGVOYW1lKSB7XG5cdFx0XHRcdFx0XHRjYXNlICdJTlBVVCc6XG5cdFx0XHRcdFx0XHRcdGlmIChmb3JtQ29udHJvbHNbaV0udHlwZSA9PSAnY2hlY2tib3gnKSB7XG5cdFx0XHRcdFx0XHRcdFx0JChmb3JtQ29udHJvbHNbaV0pLnByb3AoJ2NoZWNrZWQnLCBwYXJzZUludChjb250cm9sVmFsKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoZm9ybUNvbnRyb2xzW2ldLnR5cGUgPT0gJ3JhZGlvJykge1xuXHRcdFx0XHRcdFx0XHRcdCQoZm9ybUNvbnRyb2xzW2ldKS5wcm9wKCdjaGVja2VkJywgJChmb3JtQ29udHJvbHNbaV0pLnZhbCgpID09PSBjb250cm9sVmFsKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHQkKGZvcm1Db250cm9sc1tpXSkudmFsKGNvbnRyb2xWYWwpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCQoZm9ybUNvbnRyb2xzW2ldKS50cmlnZ2VyKCd1cGRhdGVkJyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlICdURVhUQVJFQSc6XG5cdFx0XHRcdFx0XHRcdCQoZm9ybUNvbnRyb2xzW2ldKS52YWwoY29udHJvbFZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZm9ybUNvbnRyb2xzW2ldKS50cmlnZ2VyKCd1cGRhdGVkJyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlICdTRUxFQ1QnOlxuXHRcdFx0XHRcdFx0XHRpZiAoZm9ybUNvbnRyb2xzW2ldLm11bHRpcGxlID09IHRydWUpIHtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChjb250cm9sVmFsLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIHogPSAwOyB6IDwgY29udHJvbFZhbC5sZW5ndGg7IHorKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKGZvcm1Db250cm9sc1tpXSkuZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIGNvbnRyb2xWYWxbel0gKyAnXCJdJykucHJvcCgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0JChmb3JtQ29udHJvbHNbaV0pLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyBjb250cm9sVmFsICsgJ1wiXScpLnByb3AoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JChmb3JtQ29udHJvbHNbaV0pLnZhbChjb250cm9sVmFsKTtcblx0XHRcdFx0XHRcdFx0JChmb3JtQ29udHJvbHNbaV0pLnRyaWdnZXIoJ3VwZGF0ZWQnKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGZvcm1Db250cm9sc1tpXS5ub2RlTmFtZSA9PSAnSU5QVVQnIHx8IGZvcm1Db250cm9sc1tpXS5ub2RlTmFtZSA9PSAnU0VMRUNUJykge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiAoJChmb3JtQ29udHJvbHNbaV0pLmRhdGEoJ3RhZ3NpbnB1dCcpKSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHQkKGZvcm1Db250cm9sc1tpXSkub2ZmKCk7XG5cdFx0XHRcdFx0XHRcdCQoZm9ybUNvbnRyb2xzW2ldKS50YWdzaW5wdXQoJ3JlbW92ZUFsbCcpO1xuXHRcdFx0XHRcdFx0XHQkKGZvcm1Db250cm9sc1tpXSkudGFnc2lucHV0KCdhZGQnLCBjb250cm9sVmFsKTtcblx0XHRcdFx0XHRcdFx0JChmb3JtQ29udHJvbHNbaV0pLm9uKCdpdGVtQWRkZWQgaXRlbVJlbW92ZWQnLCBNZXNzaWEuc2F2ZU9wZXJhdGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRNZXNzaWEudG9nZ2xlX3NhdmVfb3BlcmF0ZSgnb24nLCBNZXNzaWEuYWxsSW5wdXRzKTtcblx0XHRcdH0sXG5cdFx0XHRwbGF5U291bmQ6IGZ1bmN0aW9uICh2b2x1bWUpIHtcblxuXHRcdFx0XHR2YXIgYXVkaW8gPSAkKCcubWVudS1iZWVwJyk7XG5cblx0XHRcdFx0YXVkaW8uZ2V0KDApLnZvbHVtZSA9IHZvbHVtZTtcblx0XHRcdFx0YXVkaW8uZ2V0KDApLnBsYXkoKTtcblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0Y29uc3QgTWVzc2lhID0ge1xuXG5cdFx0XHRtdWx0aXBsZTogJycsXG5cdFx0XHR0YWJzRGF0YTogJCgnI3RhYnMnKS5kYXRhKCdnZW5lcmFsJyksXG5cdFx0XHRhbGxJbnB1dHM6ICQoJyN0YWJzIGlucHV0Om5vdCguaXNvbGF0ZWQpLCAjdGFicyBzZWxlY3Q6bm90KC5pc29sYXRlZCksICN0YWJzIHRleHRhcmVhOm5vdCguaXNvbGF0ZWQpJyksXG5cdFx0XHRhY3RpdmVUYWI6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblxuXHRcdFx0XHR1aS5uZXdUYWIuZ2V0KDApLnNjcm9sbEludG9WaWV3KHtcblx0XHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXG5cdFx0XHRcdFx0YmxvY2s6ICdzdGFydCcsXG5cdFx0XHRcdFx0aW5saW5lOiAnbmVhcmVzdCcsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG9wZW5IZWxwVGFiOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHR2YXIgZGF0YSA9ICQodGhpcykuZGF0YSgnc2VjdGlvbklkJyk7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuXG5cdFx0XHRcdGlmICgnbm9uZScgPT09ICQoJyNjb250ZXh0dWFsLWhlbHAtd3JhcCcpLmNzcygnZGlzcGxheScpKSB7XG5cdFx0XHRcdFx0JCgnI2NvbnRleHR1YWwtaGVscC1saW5rJykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKGAuY29udGV4dHVhbC1oZWxwLXRhYnMgYVtocmVmPVwiI3RhYi1wYW5lbC0ke2RhdGF9XCJdYCkudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdH0sXG5cdFx0XHR0b2dnbGVTZWN0aW9uOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYXJyb3ctdHJhbnNmb3JtXCIpO1xuXG5cdFx0XHRcdHZhciBSID0gMTA7XG5cdFx0XHRcdHZhciBlbCA9ICQodGhpcykubmV4dCgnLnNlY3Rpb24tY29udGVudC13cmFwcGVyJyk7XG5cblx0XHRcdFx0ZWwuc3RvcCh0cnVlKTtcblxuXHRcdFx0XHRpZiAoZWwuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0dmFyIGhlaWdodCA9IGVsLmFkZENsYXNzKCdzaG93aW5nJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpLmhlaWdodCgpO1xuXHRcdFx0XHRcdHZhciBkdXIgPSBNYXRoLnNxcnQoaGVpZ2h0KSAqIFI7XG5cdFx0XHRcdFx0ZWwuY3NzKCdoZWlnaHQnLCAwKTtcblx0XHRcdFx0XHRlbC5hbmltYXRlKHtcblx0XHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0ICsgJ3B4Jyxcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogZHVyLFxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCgnI3RhYnMnKS50cmlnZ2VyKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRkb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3MoJ2hlaWdodCcsICcxMDAlJykucmVtb3ZlQ2xhc3MoJ3Nob3dpbmcnKTtcblx0XHRcdFx0XHRcdFx0JCgnI3RhYnMnKS50cmlnZ2VyKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoZWwuaGFzQ2xhc3MoJ2hpZGluZycpKSB7XG5cdFx0XHRcdFx0dmFyIGN1cnJfaGVpZ2h0ID0gZWwuY3NzKCdoZWlnaHQnKTtcblx0XHRcdFx0XHR2YXIgaGVpZ2h0ID0gZWwuY3NzKCdoZWlnaHQnLCAnJykuaGVpZ2h0KCk7XG5cdFx0XHRcdFx0dmFyIGR1ciA9IE1hdGguc3FydChoZWlnaHQpICogUjtcblxuXHRcdFx0XHRcdGVsLmNzcygnaGVpZ2h0JywgY3Vycl9oZWlnaHQpO1xuXHRcdFx0XHRcdGVsLmFkZENsYXNzKCdzaG93aW5nJykucmVtb3ZlQ2xhc3MoJ2hpZGluZycpLmFuaW1hdGUoXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0ICsgJ3B4Jyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiBkdXIsXG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCgnI3RhYnMnKS50cmlnZ2VyKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3MoJ2hlaWdodCcsICcxMDAlJykucmVtb3ZlQ2xhc3MoJ3Nob3dpbmcnKTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjdGFicycpLnRyaWdnZXIoJ3Njcm9sbCcpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoZWwuaGFzQ2xhc3MoJ3Nob3dpbmcnKSkge1xuXHRcdFx0XHRcdHZhciBoZWlnaHQgPSBlbC5oZWlnaHQoKTtcblx0XHRcdFx0XHR2YXIgZHVyID0gTWF0aC5zcXJ0KGhlaWdodCkgKiBSO1xuXHRcdFx0XHRcdGVsLmFkZENsYXNzKCdoaWRpbmcnKS5yZW1vdmVDbGFzcygnc2hvd2luZycpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0aGVpZ2h0OiAwLFxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBkdXIsXG5cdFx0XHRcdFx0XHRwcm9ncmVzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkKCcjdGFicycpLnRyaWdnZXIoJ3Njcm9sbCcpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGRvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdjb2xsYXBzZWQnKS5yZW1vdmVDbGFzcygnaGlkaW5nJykuY3NzKCdoZWlnaHQnLCAnJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyN0YWJzJykudHJpZ2dlcignc2Nyb2xsJyk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHZhciBoZWlnaHQgPSBlbC5oZWlnaHQoKTtcblx0XHRcdFx0XHR2YXIgZHVyID0gTWF0aC5zcXJ0KGhlaWdodCkgKiBSO1xuXHRcdFx0XHRcdGVsLmFkZENsYXNzKCdoaWRpbmcnKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdGhlaWdodDogMCxcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogZHVyLFxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCgnI3RhYnMnKS50cmlnZ2VyKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRkb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnY29sbGFwc2VkJykucmVtb3ZlQ2xhc3MoJ2hpZGluZycpLmNzcygnaGVpZ2h0JywgJycpO1xuXHRcdFx0XHRcdFx0XHQkKCcjdGFicycpLnRyaWdnZXIoJ3Njcm9sbCcpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNjcmVlbl9sb2NrOiBhc3luYyBmdW5jdGlvbiAoZXZlbnQsIG9wZXJhdG9yKSB7XG5cblx0XHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXHRcdFx0XHRcdCQob3BlcmF0b3IpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0JChvcGVyYXRvcikudmFsKCQoJyN0YWJzJykuZGF0YSgnZ2VuZXJhbCcpLnN0YXR1c0JldHdlZW5SZXF1ZXN0cykucmVtb3ZlQ2xhc3MoKTtcblxuXHRcdFx0XHRcdCQoJ2JvZHknKS5wcmVwZW5kKGA8ZGl2IGlkPVwic3Bpbm5lcl9zYXZpbmdcIiBzdHlsZT1cInotaW5kZXg6IDk5OTk5O1wiPjxkaXYgaWQ9XCJzcGlubmVyX3NhdmluZ19pbm5lclwiPjxzdmcgY2xhc3M9XCJsZHMtY3VydmUtYmFyc1wiIHdpZHRoPVwiMTIwcHhcIiBoZWlnaHQ9XCIxMjBweFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj48ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNTAsNTApXCI+PGNpcmNsZSBjeD1cIjBcIiBjeT1cIjBcIiByPVwiOC4zMzMzMzMzMzMzMzMzMzRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiM0NjU4YWNcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWRhc2hhcnJheT1cIjI2LjE3OTkzODc3OTkxNDk0NSAyNi4xNzk5Mzg3Nzk5MTQ5NDVcIiB0cmFuc2Zvcm09XCJyb3RhdGUoMi41ODc5OClcIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIHZhbHVlcz1cIjAgMCAwOzM2MCAwIDBcIiB0aW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlTcGxpbmVzPVwiMC4yIDAgMC44IDFcIiBiZWdpbj1cIjBcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PGNpcmNsZSBjeD1cIjBcIiBjeT1cIjBcIiByPVwiMTYuNjY2NjY2NjY2NjY2NjY4XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZTcwMDhhXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1kYXNoYXJyYXk9XCI1Mi4zNTk4Nzc1NTk4Mjk4OSA1Mi4zNTk4Nzc1NTk4Mjk4OVwiIHRyYW5zZm9ybT1cInJvdGF0ZSg2NC4zNzEyKVwiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9XCJ0cmFuc2Zvcm1cIiB0eXBlPVwicm90YXRlXCIgdmFsdWVzPVwiMCAwIDA7MzYwIDAgMFwiIHRpbWVzPVwiMDsxXCIgZHVyPVwiMXNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVNwbGluZXM9XCIwLjIgMCAwLjggMVwiIGJlZ2luPVwiLTAuMlwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48Y2lyY2xlIGN4PVwiMFwiIGN5PVwiMFwiIHI9XCIyNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2ZmMDAzYVwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtZGFzaGFycmF5PVwiNzguNTM5ODE2MzM5NzQ0ODMgNzguNTM5ODE2MzM5NzQ0ODNcIiB0cmFuc2Zvcm09XCJyb3RhdGUoMTQ5LjY1OSlcIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIHZhbHVlcz1cIjAgMCAwOzM2MCAwIDBcIiB0aW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlTcGxpbmVzPVwiMC4yIDAgMC44IDFcIiBiZWdpbj1cIi0wLjRcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PGNpcmNsZSBjeD1cIjBcIiBjeT1cIjBcIiByPVwiMzMuMzMzMzMzMzMzMzMzMzM2XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZmY2ZDAwXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1kYXNoYXJyYXk9XCIxMDQuNzE5NzU1MTE5NjU5NzggMTA0LjcxOTc1NTExOTY1OTc4XCIgdHJhbnNmb3JtPVwicm90YXRlKDIzOS4wMylcIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIHZhbHVlcz1cIjAgMCAwOzM2MCAwIDBcIiB0aW1lcz1cIjA7MVwiIGR1cj1cIjFzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlTcGxpbmVzPVwiMC4yIDAgMC44IDFcIiBiZWdpbj1cIi0wLjZcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PGNpcmNsZSBjeD1cIjBcIiBjeT1cIjBcIiByPVwiNDEuNjY2NjY2NjY2NjY2NjY0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZmZjNTNmXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1kYXNoYXJyYXk9XCIxMzAuODk5NjkzODk5NTc0NzEgMTMwLjg5OTY5Mzg5OTU3NDcxXCIgdHJhbnNmb3JtPVwicm90YXRlKDMyMC4wMTIpXCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT1cInRyYW5zZm9ybVwiIHR5cGU9XCJyb3RhdGVcIiB2YWx1ZXM9XCIwIDAgMDszNjAgMCAwXCIgdGltZXM9XCIwOzFcIiBkdXI9XCIxc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5U3BsaW5lcz1cIjAuMiAwIDAuOCAxXCIgYmVnaW49XCItMC44XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48L3N2Zz48L2Rpdj48L2Rpdj5gKTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ3NldHRpbmctc2F2aW5nJyk7XG5cblx0XHRcdFx0XHQkKCdib2R5ICNzcGlubmVyX3NhdmluZycpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdFx0XHR9LCAxNTAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCgnYm9keSAjc3Bpbm5lcl9zYXZpbmdfaW5uZXInKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0XHRcdFx0XHR9LCAyMDAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoW2V2ZW50LCBvcGVyYXRvcl0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0sIDIwMCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHNjcmVlbl91bmxvY2tfc3VjY2VzczogYXN5bmMgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRcdFx0XHQkKCdib2R5ICNzcGlubmVyX3NhdmluZ19pbm5lcicpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdFx0XHR9LCAyNTAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0c2NyZWVuX3VubG9ja19lcnJvcjogYXN5bmMgZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG5cblx0XHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXHRcdFx0XHRcdCQob3BlcmF0b3IpLm9mZignY2xpY2snKTtcblx0XHRcdFx0XHQkKG9wZXJhdG9yKS52YWwoJCgnI3RhYnMnKS5kYXRhKCdnZW5lcmFsJykuYWpheEVycm9yKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5jc3Moe1xuXHRcdFx0XHRcdFx0J2NvbG9yJzogJyNmMDAnLFxuXHRcdFx0XHRcdFx0J2JvcmRlcic6ICcycHggc29saWQgI2ZmMDQwNCcsXG5cdFx0XHRcdFx0fSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCdib2R5ICNzcGlubmVyX3NhdmluZ19pbm5lcicpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdFx0XHR9LCAyNTAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCgnYm9keSAjc3Bpbm5lcl9zYXZpbmcnKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHRcdFx0XHR9LCAxMDAsIFwic3dpbmdcIiwgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0JCgnYm9keSAjc3Bpbm5lcl9zYXZpbmcnKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0c2F2ZU9wZXJhdGU6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0JCgnLndyYXAgI3NhdmUnKS52YWwoJCgnI3RhYnMnKS5kYXRhKCdnZW5lcmFsJykub25jaGFuZ2VCdG5UZXh0KS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLndyYXAgI3NhdmUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbWVzc2lhQ29udGVudElzRGlydHknKTtcblx0XHRcdH0sXG5cdFx0XHRyZXNldFNhdmVTdGF0ZTogZnVuY3Rpb24gbmFtZShlKSB7XG5cdFx0XHRcdGNvbnN0IHNhdmVCdG4gPSAkKCcud3JhcCAjc2F2ZScpO1xuXG5cdFx0XHRcdHNhdmVCdG5cblx0XHRcdFx0XHQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdjbGFzcycpXG5cdFx0XHRcdFx0LnRleHQoc2F2ZUJ0bi5kYXRhKCdpbml0JykpO1xuXHRcdFx0fSxcblx0XHRcdHNhdmU6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0JCgnYm9keScpLmRhdGEoJ21lc3NpYVByb2NlZWRTYXZpbmcnLCBbXSk7XG5cdFx0XHRcdCQoJ2JvZHknKS50cmlnZ2VyKCdiZWZvcmVTYXZlJyk7XG5cblx0XHRcdFx0aWYgKCQoJ2JvZHknKS5kYXRhKCdtZXNzaWFQcm9jZWVkU2F2aW5nJykuaW5jbHVkZXMoZmFsc2UpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0TWVzc2lhLnNjcmVlbl9sb2NrKGUsIHRoaXMpLnRoZW4oTWVzc2lhLmRvQWpheFNhdmVTZXR0aW5ncyk7XG5cdFx0XHR9LFxuXHRcdFx0ZG9BamF4U2F2ZVNldHRpbmdzOiBmdW5jdGlvbiAoYXJncykge1xuXG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0ZGF0YSA9IE1lc3NpYS50YWJzRGF0YSxcblx0XHRcdFx0XHRzZXR0aW5ncyA9IE1lc3NpYS5nZXRfZm9ybV9jb250cm9scygpLm5vdCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOm5vdCg6Y2hlY2tlZCknKSxcblx0XHRcdFx0XHRwcmVzZXQgPSBkYXRhLnNldHRpbmdQcmVzZXQsXG5cdFx0XHRcdFx0ZXZlbnQgPSBhcmdzWzBdLFxuXHRcdFx0XHRcdG9wZXJhdG9yID0gYXJnc1sxXTtcblxuXHRcdFx0XHR2YXIgc2V0dGluZ19hcnIgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNldHRpbmdzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgc2F2ZV92YWx1ZTtcblxuXHRcdFx0XHRcdGlmIChzZXR0aW5nc1tpXS50eXBlID09ICdjaGVja2JveCcpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgKCQoc2V0dGluZ3NbaV0pLmRhdGEoJ3NhdmUtdmFsJykpICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdHNhdmVfdmFsdWUgPSAkKHNldHRpbmdzW2ldKS5kYXRhKCdzYXZlLXZhbCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdChzZXR0aW5nc1tpXS5jaGVja2VkKSA/IHNhdmVfdmFsdWUgPSAxIDogc2F2ZV92YWx1ZSA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiAoJChzZXR0aW5nc1tpXSkuZGF0YSgnc2F2ZS12YWwnKSkgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0c2F2ZV92YWx1ZSA9ICQoc2V0dGluZ3NbaV0pLmRhdGEoJ3NhdmUtdmFsJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChzZXR0aW5nc1tpXS50eXBlID09ICdzZWxlY3QtbXVsdGlwbGUnKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQoc2V0dGluZ3NbaV0pLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHRcdGlmICh2YWwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRzYXZlX3ZhbHVlID0gLTE7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHNhdmVfdmFsdWUgPSAtMTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRzYXZlX3ZhbHVlID0gJChzZXR0aW5nc1tpXSkudmFsKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKHNldHRpbmdzW2ldLnR5cGUgPT0gJ3JhZGlvJyAmJiAkKHNldHRpbmdzW2ldKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdFx0XHRcdFx0c2F2ZV92YWx1ZSA9ICQoc2V0dGluZ3NbaV0pLnZhbCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNhdmVfdmFsdWUgPSAkKHNldHRpbmdzW2ldKS52YWwoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZXR0aW5nX2FycltzZXR0aW5nc1tpXS5uYW1lXSA9IHNhdmVfdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR4aHIgPSAkLmFqYXgoe1xuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHR1cmw6IGRhdGEuYWpheFVybCxcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IGRhdGEuYWN0aW9uU2F2ZSxcblx0XHRcdFx0XHRcdG1lc3NpYU5vbmNlOiBkYXRhLnNldHRpbmdGb3JtTm9uY2UsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdEFKQVhfTWFya2VyOiBtZXNzaWFWYXJzLkFKQVhfTWFya2VyLFxuXHRcdFx0XHRcdFx0XHRtZW51X3R5cGU6IGRhdGEubWVudVR5cGUsXG5cdFx0XHRcdFx0XHRcdHByZXNldDogcHJlc2V0LFxuXHRcdFx0XHRcdFx0XHRzZXR0aW5nczogc2V0dGluZ19hcnIsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoeGhyICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0eGhyLmFib3J0KCk7XG5cdFx0XHRcdFx0XHRcdHhociA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoc2VydmVyKSB7XG5cblx0XHRcdFx0XHRcdE1lc3NpYVxuXHRcdFx0XHRcdFx0XHQuc2NyZWVuX3VubG9ja19zdWNjZXNzKClcblx0XHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhLnJlbW92ZV9zcGlubmVyKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VydmVyLmRhdGEuY29kZSA9PT0gMjAwKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygndXBkYXRlQ29udHJvbHMnLCBzZXJ2ZXIuZGF0YS5uZXdfcHJlc2V0KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiAoc2VydmVyLmRhdGEuZXh0cmFfZGF0YSkgIT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmtleXMoc2VydmVyLmRhdGEuZXh0cmFfZGF0YSkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgZXh0cmFfZGF0YSA9IHNlcnZlci5kYXRhLmV4dHJhX2RhdGE7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGV4dHJhX2RhdGEgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0JCgnI3RhYnMnKS50cmlnZ2VySGFuZGxlcigncHJlc2V0U2F2ZWQnLCBbc2VydmVyLmRhdGEubmV3X3ByZXNldCwgZXh0cmFfZGF0YV0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0JChvcGVyYXRvcikudmFsKHNlcnZlci5kYXRhLmJ0bl90ZXh0KS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdfMjAwJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlcnZlci5kYXRhLmNvZGUgPT09IDQwMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JChvcGVyYXRvcikudmFsKHNlcnZlci5kYXRhLmJ0bl90ZXh0KS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdfNDAwJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlcnZlci5kYXRhLmNvZGUgPT09IDQwMykge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS5vZmYoJ2NsaWNrJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS52YWwoc2VydmVyLmRhdGEuYnRuX3RleHQpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ180MDMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbWVzc2lhQ29udGVudElzU2F2ZWQnKTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5yZWxvYWQgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PT0gMCAmJiB4aHIuc3RhdHVzVGV4dCA9PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdE1lc3NpYS5zY3JlZW5fdW5sb2NrX2Vycm9yKG9wZXJhdG9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHJlc2V0OiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdHZhciB0b19jb250aW51ZSA9IGNvbmZpcm0oJCgnI3RhYnMnKS5kYXRhKCdnZW5lcmFsJykuZGVtby5jb25maXJtUmVzZXRTZXR0aW5ncyk7XG5cblx0XHRcdFx0aWYgKHRydWUgPT09IHRvX2NvbnRpbnVlKSB7XG5cdFx0XHRcdFx0TWVzc2lhXG5cdFx0XHRcdFx0XHQuc2NyZWVuX2xvY2soZSwgdGhpcylcblx0XHRcdFx0XHRcdC50aGVuKE1lc3NpYS5kb19hamF4X3Jlc2V0X3NldHRpbmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGV4cG9ydDogZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHR2YXIgdG9fY29udGludWUgPSBjb25maXJtKCQoJyN0YWJzJykuZGF0YSgnZ2VuZXJhbCcpLmRlbW8uY29uZmlybURlbW9FeHBvcnQpO1xuXG5cdFx0XHRcdGlmICh0cnVlID09PSB0b19jb250aW51ZSkge1xuXHRcdFx0XHRcdE1lc3NpYS5zY3JlZW5fbG9jayhlLCB0aGlzKS50aGVuKE1lc3NpYS5kb19hamF4X2V4cG9ydF9ibG9nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRvX2FqYXhfcmVzZXRfc2V0dGluZ3M6IGZ1bmN0aW9uIChhcmdzKSB7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRkYXRhID0gTWVzc2lhLnRhYnNEYXRhLFxuXHRcdFx0XHRcdHByZXNldCA9IGRhdGEuc2V0dGluZ1ByZXNldCxcblx0XHRcdFx0XHRldmVudCA9IGFyZ3NbMF0sXG5cdFx0XHRcdFx0b3BlcmF0b3IgPSBhcmdzWzFdO1xuXG5cdFx0XHRcdHhociA9ICQuYWpheCh7XG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdHVybDogZGF0YS5hamF4VXJsLFxuXHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogZGF0YS5hY3Rpb25SZXNldCxcblx0XHRcdFx0XHRcdG1lc3NpYU5vbmNlOiBkYXRhLnNldHRpbmdGb3JtTm9uY2UsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdEFKQVhfTWFya2VyOiBtZXNzaWFWYXJzLkFKQVhfTWFya2VyLFxuXHRcdFx0XHRcdFx0XHRtZW51X3R5cGU6IGRhdGEubWVudVR5cGUsXG5cdFx0XHRcdFx0XHRcdHByZXNldDogcHJlc2V0LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0aWYgKHhociAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR4aHIgPSBudWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHNlcnZlcikge1xuXG5cdFx0XHRcdFx0XHRNZXNzaWFcblx0XHRcdFx0XHRcdFx0LnNjcmVlbl91bmxvY2tfc3VjY2VzcygpXG5cdFx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygncGxheVNvdW5kJywgMC4zKTtcblx0XHRcdFx0XHRcdFx0XHRNZXNzaWEucmVtb3ZlX3NwaW5uZXIoKTtcblxuXHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlID09PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JC5mbi5UYWJzUGx1Z2luRnJhbWVXb3JrKCdzaG93TWVzc2FnZScsIHNlcnZlci5kYXRhLm1zZywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JChvcGVyYXRvcikudmFsKHNlcnZlci5kYXRhLmJ0bl90ZXh0KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2VydmVyLmRhdGEucmVsb2FkID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlID09PSA0MDMpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS5vZmYoJ2NsaWNrJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQob3BlcmF0b3IpLnZhbChzZXJ2ZXIuZGF0YS5idG5fdGV4dCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcygnXzQwMycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRNZXNzaWFFeHQubG9nZ2VyLmVycm9yKHNlcnZlcik7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmZuLlRhYnNQbHVnaW5GcmFtZVdvcmsoJ3Nob3dNZXNzYWdlJywgZGF0YS51bmV4cGVjdGVkRXJyLCAnZXJyb3InKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PT0gMCAmJiB4aHIuc3RhdHVzVGV4dCA9PSAnYWJvcnQnKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRNZXNzaWEuc2NyZWVuX3VubG9ja19lcnJvcihvcGVyYXRvcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkb25lOiBmdW5jdGlvbiAoZGF0YSkgeyB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGRvX2FqYXhfZXhwb3J0X2Jsb2c6IGZ1bmN0aW9uIChhcmdzKSB7XG5cblx0XHRcdFx0Y29uc3Rcblx0XHRcdFx0XHRkYXRhID0gTWVzc2lhLnRhYnNEYXRhLFxuXHRcdFx0XHRcdGV2ZW50ID0gYXJnc1swXSxcblx0XHRcdFx0XHRvcGVyYXRvciA9IGFyZ3NbMV07XG5cblx0XHRcdFx0eGhyID0gJC5hamF4KHtcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0dXJsOiBkYXRhLmFqYXhVcmwsXG5cdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiBkYXRhLmFjdGlvbkV4cG9ydCxcblx0XHRcdFx0XHRcdG1lc3NpYU5vbmNlOiBkYXRhLnNldHRpbmdGb3JtTm9uY2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdGlmICh4aHIgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0eGhyID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChzZXJ2ZXIpIHtcblxuXHRcdFx0XHRcdFx0TWVzc2lhLnNjcmVlbl91bmxvY2tfc3VjY2VzcygpLnRoZW4oZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygncGxheVNvdW5kJywgMC4zKTtcblx0XHRcdFx0XHRcdFx0TWVzc2lhLnJlbW92ZV9zcGlubmVyKCk7XG5cblx0XHRcdFx0XHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlID09PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBzZXJ2ZXIuZGF0YS5tc2csICdzdWNjZXNzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS52YWwoc2VydmVyLmRhdGEuYnRuX3RleHQpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGlmIChzZXJ2ZXIuZGF0YS5jb2RlID09PSA0MDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBzZXJ2ZXIuZGF0YS5tc2csICdlcnJvcicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JChvcGVyYXRvcikudmFsKHNlcnZlci5kYXRhLmJ0bl90ZXh0KS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdfNDAwJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlcnZlci5kYXRhLmNvZGUgPT09IDQwMykge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS5vZmYoJ2NsaWNrJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKG9wZXJhdG9yKS52YWwoc2VydmVyLmRhdGEuYnRuX3RleHQpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ180MDMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0TWVzc2lhRXh0LmxvZ2dlci5lcnJvcihzZXJ2ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdCQuZm4uVGFic1BsdWdpbkZyYW1lV29yaygnc2hvd01lc3NhZ2UnLCBkYXRhLnVuZXhwZWN0ZWRFcnIsICdlcnJvcicpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblxuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT09IDAgJiYgeGhyLnN0YXR1c1RleHQgPT0gJ2Fib3J0Jykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRNZXNzaWEuc2NyZWVuX3VubG9ja19lcnJvcihvcGVyYXRvcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRnZXRfZm9ybV9jb250cm9sczogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiAkKCcjdGFicyBpbnB1dDpub3QoLmNob3Nlbi1zZWFyY2gtaW5wdXQpLCAjdGFicyBzZWxlY3QsICN0YWJzIHRleHRhcmVhJykubm90KCdoaWRkZW4nKS5maWx0ZXIoZnVuY3Rpb24gKGluZGV4KSB7XG5cblx0XHRcdFx0XHR2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuXG5cdFx0XHRcdFx0aWYgKG5hbWUgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLnBhcmVudHMoJy5ib290c3RyYXAtdGFnc2lucHV0JykubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0dG9nZ2xlX3NhdmVfb3BlcmF0ZTogZnVuY3Rpb24gKG1vZGUsIHRhcmdldCkge1xuXG5cdFx0XHRcdHRhcmdldC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuXG5cdFx0XHRcdFx0aWYgKCh0aGlzLm5vZGVOYW1lID09ICdJTlBVVCcgfHwgdGhpcy5ub2RlTmFtZSA9PSAnU0VMRUNUJykgJiYgJCh0aGlzKS5kYXRhKCd0YWdlZCcpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRpZiAobW9kZSA9PT0gJ29uJykge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLm9uKCdpdGVtQWRkZWQgaXRlbVJlbW92ZWQnLCBNZXNzaWEuc2F2ZU9wZXJhdGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAobW9kZSA9PT0gJ29mZicpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5vZmYoJ2l0ZW1BZGRlZCBpdGVtUmVtb3ZlZCcsIE1lc3NpYS5zYXZlT3BlcmF0ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKG1vZGUgPT09ICdvbicpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5vbignaW5wdXQgY2hhbmdlJywgTWVzc2lhLnNhdmVPcGVyYXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG1vZGUgPT09ICdvZmYnKSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykub2ZmKCdpbnB1dCBjaGFuZ2UnLCBNZXNzaWEuc2F2ZU9wZXJhdGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlX2xvYWRlcigpIHtcblx0XHRcdFx0JCgnI3dwYm9keS1jb250ZW50IC5zZXR0aW5ncy1sb2FkZXInKS5yZW1vdmUoKTtcblx0XHRcdFx0JCgnLndyYXAuc2V0dGluZ3MtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdzZXR0aW5ncy1sb2FkaW5nJyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlX3NwaW5uZXIoKSB7XG5cdFx0XHRcdCQoJ2JvZHkgI3NwaW5uZXJfc2F2aW5nLCBib2R5ICNzcGlubmVyX3NhdmluZ19pbm5lcicpLnJlbW92ZSgpO1xuXHRcdFx0fSxcblx0XHRcdGNvbmZpcm06IGFzeW5jIChtZXNzYWdlKSA9PiB7XG5cdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0bGV0IHByb21wdCA9IGNvbmZpcm0obWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKHByb21wdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRydWUgPT09ICQuZm4ubWVzc2lhSXNNb2JpbGUoKSkge1xuXHRcdFx0TWVzc2lhLm11bHRpcGxlID0gJ1ttdWx0aXBsZV0nO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQkKCcjdGFicycpLnRhYnMoe1xuXHRcdFx0XHRhY3RpdmU6ICQoJyN0YWJzJykuZGF0YSgnZ2VuZXJhbCcpLmFjdGl2ZSxcblx0XHRcdFx0aGlkZTogeyAnZWZmZWN0JzogJ2ZhZGUnLCAnZGlyZWN0aW9uJzogJ291dCcsICdkdXJhdGlvbic6IDIwMCB9LFxuXHRcdFx0XHRzaG93OiB7ICdlZmZlY3QnOiAnZmFkZScsICdkaXJlY3Rpb24nOiAnaW4nLCAnZHVyYXRpb24nOiAyMDAgfSxcblx0XHRcdFx0Y29sbGFwc2libGU6IGZhbHNlLFxuXHRcdFx0XHQvLydoZWlnaHRTdHlsZScgPT4gJ2NvbnRlbnQnLFxuXHRcdFx0XHRjcmVhdGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0XHRNZXNzaWEucmVtb3ZlX2xvYWRlcigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JCgnc2VsZWN0Om5vdCguZm9udC1vcHRpb24pJyArIE1lc3NpYS5tdWx0aXBsZSkuc2VsZWN0Mih7XG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBtZXNzaWFWYXJzLm1lc3NhZ2VzLnNlbGVjdE9wdGlvbnMsXG5cdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBJbmZpbml0eSxcblx0XHRcdFx0Ly93aWR0aDogJzEwMCUnLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXHRcdFx0TWVzc2lhRXh0LmxvZ2dlci5lcnJvcihlcnJvcik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdE1lc3NpYS5yZW1vdmVfbG9hZGVyKCk7XG5cdFx0fVxuXG5cdFx0cmVxdWlyZSgnLi9kZW1vLmpzJykoTWVzc2lhLCAkKTtcblxuXHRcdCQoJy53cmFwICNzYXZlJykudHJpZ2dlcigndWlJbml0ZWQnKTtcblxuXHRcdCQoJyN0YWJzIHRleHRhcmVhJykubWVzc2lhU3RpY2t5VGV4dGFyZWEoKTtcblx0XHRNZXNzaWEudG9nZ2xlX3NhdmVfb3BlcmF0ZSgnb24nLCBNZXNzaWEuYWxsSW5wdXRzKTtcblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnI3RhYnMgLm1lc3NpYS13cC1oZWxwJywgTWVzc2lhLm9wZW5IZWxwVGFiKTtcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJyN0YWJzIC5zZWN0aW9uJywgTWVzc2lhLnRvZ2dsZVNlY3Rpb24pO1xuXHRcdCQoJy53cmFwICNzYXZlJykub24oJ2NsaWNrJywgTWVzc2lhLnNhdmUpO1xuXHRcdCQoJy53cmFwICNyZXNldC1zZXR0aW5ncycpLm9uKCdjbGljaycsIE1lc3NpYS5yZXNldCk7XG5cdFx0JCgnLndyYXAgI2NyZWF0ZS1kZW1vJykub24oJ2NsaWNrJywgTWVzc2lhLmV4cG9ydCk7XG5cdFx0JCgnI3RhYnMnKS5vbigndGFic2FjdGl2YXRlIHRhYnNjcmVhdGUnLCBNZXNzaWEuYWN0aXZlVGFiKTtcblx0XHQkKCcjdGFicycpLm9uKCdyZXNldFNhdmVTdGF0ZScsIE1lc3NpYS5yZXNldFNhdmVTdGF0ZSk7XG5cdFx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBNZXNzaWEuc2Nyb2xsKTtcblx0fSk7XG59KShqUXVlcnkpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZVxuaW1wb3J0IFwiLi4vLi4vc2Nzcy9fYmFja2VuZC9tZW51LXBhZ2Uuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9fYmFja2VuZC9tZW51LXBhZ2UuanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
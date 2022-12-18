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
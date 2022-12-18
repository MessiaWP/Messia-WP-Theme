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

		require('./demo.js')(Messia, $);

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
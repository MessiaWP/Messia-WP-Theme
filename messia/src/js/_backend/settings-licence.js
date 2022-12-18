/**
 * Module for actions with licence.
 */
module.exports = function (Messia, $) {

	let abortController = null;

	const selectors = {
		licenceHandler: '.messia-theme-licence-form-holder #messia-licence-status-togle',
		licenceFields: '.messia-theme-licence-form-holder input#licence_key, .messia-theme-licence-form-holder input#licence_status',
	};

	const licenceStatusToggle = function (e) {
		licenceAction.call(this, 'toggleStatus');
	};

	const saveLicenceData = (e) => {
		const
			to_save = {},
			licence_fields = $(selectors.licenceFields);

		for (var i = 0; i < licence_fields.length; i++) {

			var key = $(licence_fields[i]).attr('id');
			var value = $(licence_fields[i]).val();

			to_save[key] = value.trim();
		}
		$('.messia-theme-licence-form-holder input[name="theme_licence_data"]').val(JSON.stringify(to_save));
	};

	const licenceAction = async function (action) {

		const
			tabsData = Messia.tabs_selector.data('general'),
			formData = new FormData(),
			form = $(this).parents('.messia-theme-licence-form-holder'),
			actions = form.find('.actions'),
			licenceKey = form.find('input[id="licence_key"]'),
			licenceStatus = form.find('input[id="licence_status"]');

		// In multisite env these data shown at network admin page only.
		if (form.length === 0 && actions.length === 0 && licenceKey.length === 0 && licenceStatus.length === 0) {
			return;
		}

		formData.append('action', 'messia_licence_action');
		formData.append('messiaNonce', tabsData.settingFormNonce);

		formData.append(
			'data',
			JSON.stringify({
				AJAX_Marker: messiaVars.AJAX_Marker,
				licence_action: action,
				licence_key: licenceKey.val().trim(),
				licence_status: licenceStatus.val(),
				is_network_admin: tabsData.isNetworkAdmin,
			})
		);

		const startAction = () => {
			if (actions.find('#loader_holder').find('.spinner').length > 0) return;
			const spinner = '<div class="spinner is-active"></div>';
			actions.find('#loader_holder').append(spinner);
		}

		const finishAction = (server) => {
			actions.find('#loader_holder .spinner').remove();

			switch (server.data.status_code) {
				case 'm200':
					const
						statusTitle = form.find('.status-title .status-value'),
						statusHandler = form.find('input#licence_status'),
						type = (server.data.response.status_code.startsWith('s')) ? 'success' : 'error';

					const draggable = $.fn.TabsPluginFrameWork('showMessage', server.data.response.message, type);

					form.attr('data-status', server.data.response.licence_status);
					statusHandler.val(server.data.response.licence_status);
					statusTitle.text(server.data.response.licence_status);
					licenceKey.val(server.data.key_val);
					$(this).val(server.data.btn_text);

					if (server.data.readonly) {
						licenceKey.attr('readonly', 'readonly');
					} else {
						licenceKey.removeAttr('readonly');
					}

					if (type === 'success' && server.data.reload) {

						draggable.then(result => {
							const reload = confirm(messiaVars.messages.reloadConfirm);
							if (reload) {
								window.location.reload();
							}
						});
					}

					saveLicenceData();
					$(document).trigger('messiaContentIsSaved');
					Messia.tabs_selector.trigger('resetSaveState');
					break;

				default:
					$.fn.TabsPluginFrameWork('showMessage', server.data.response.message, 'error');
					break;
			}
		}

		try {

			if (abortController != null) {
				abortController.abort();
				abortController = null;
			}

			abortController = new AbortController();
			startAction();
			const
				response = await fetch(messiaVars.ajaxUrl, {
					method: 'POST',
					body: formData,
					signal: abortController.signal,
				}),
				server = await response.json();
			finishAction(server);
		} catch (error) {
			if (error.name !== 'AbortError') {
				$.fn.TabsPluginFrameWork('showMessage', error.message, 'error');
				MessiaExt.logger.error(error);
			}
		}
	};

	const licenceDataSaved = function (e) {

		const
			saved_fields = JSON.parse($(this).val()),
			getters = $(this).parents('.data');

		for (let key in saved_fields) {
			getters.find(`#${key}`).val(saved_fields[key]);
		}
	};

	$('body').on('beforeSave', saveLicenceData);
	$('body').on('click', selectors.licenceHandler, licenceStatusToggle);
	$('.callback .messia-theme-licence-form-holder input[name="theme_licence_data"]').on('updated', licenceDataSaved);
	licenceAction.call(document.querySelector(selectors.licenceHandler), 'updateStatus');
};
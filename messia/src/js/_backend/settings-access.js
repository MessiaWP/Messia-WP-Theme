/**
 * Module for actions with support team access.
 */
module.exports = function (Messia, $) {

	let abortController = null;

	const
		selectors = {
			form: '.messia-theme-access-form-holder',
			accessHandler: '#messia-support-status-togle',
			revokeHandler: '#messia-support-status-revoke',
			accessDuration: 'input#access_duration',
			accessDurationUnits: 'select#access_duration_units',
			accessValue: 'input[name="theme_support_access"]',
		},
		forms = $(selectors.form);

	let accessData = {
		'duration': false,
		'units': false,
	};

	let accessState = {};

	const setAccessState = (form, value = {}) => {

		accessData = {
			...accessData,
			...{
				duration: parseFloat(form.find(selectors.accessDuration).val()),
				units: form.find(selectors.accessDurationUnits).val(),
			}
		};

		accessState = { ...accessState, ...value };
		form.find(selectors.accessValue).val(JSON.stringify(accessState));
		form.trigger('access-state-change');

		return accessState;
	}

	const getAccessState = () => {
		return accessState;
	}

	const onAccessStateChange = (event) => {
		const
			accessState = getAccessState(),
			accessDuration = $(event.target).find(selectors.accessDuration),
			revokeHandler = $(event.target).find(selectors.revokeHandler),
			accessHandler = $(event.target).find(selectors.accessHandler);

		// Revoke.
		if (accessState.access_valid_until === false) {
			revokeHandler
				.prop('disabled', true)
				.off('click', accessAction);
		} else {
			revokeHandler
				.prop('disabled', false)
				.off('click', accessAction)
				.on('click', accessAction);
		}

		// Grant
		if (accessDurationValidate(accessDuration)) {
			accessHandler
				.prop('disabled', false)
				.off('click', accessAction)
				.on('click', accessAction);
		} else {
			accessHandler
				.prop('disabled', true)
				.off('click', accessAction);
		}
	}

	const onAccessDurationChange = (event) => {

		const
			target = $(event.target),
			form = target.parents(selectors.form);

		setAccessState(form);
	};

	const accessDurationUnitsChange = (event) => {
		const
			target = $(event.target),
			units = target.val(),
			durationEl = target.prev(selectors.accessDuration),
			map = durationEl.data('map');

		durationEl.attr({
			'min': map[units].min,
			'max': map[units].max,
		});
		durationEl.val(map[units].min).trigger('input');
	};

	const accessDurationValidate = (elem) => {
		const
			map = elem.data('map'),
			duration = parseFloat(elem.val()),
			units = elem.next(selectors.accessDurationUnits).val();

		if (isNaN(duration)) {
			return false;
		}

		return (duration >= map[units].min && duration <= map[units].max);
	};

	const accessAction = async function (event) {

		const
			target = $(event.target),
			form = target.parents(selectors.form),
			tabsData = Messia.tabs_selector.data('general'),
			actions = form.find('.actions'),
			formData = new FormData();

		formData.append('action', 'messia_access_action');
		formData.append('messiaNonce', tabsData.settingFormNonce);

		formData.append(
			'data',
			JSON.stringify({
				AJAX_Marker: messiaVars.AJAX_Marker,
				access_data: accessData,
				operation: $(this).data('operation'),
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
					$.fn.TabsPluginFrameWork('showMessage', server.data.user.message, 'success');

					form.attr('data-access-granted', server.data.access_granted);
					form.find('.status-title .status-value').text(server.data.status_title);
					form.find(selectors.accessHandler).val(server.data.btn_text);
					form.find(selectors.accessDuration).val('');

					setAccessState(form, {
						access_valid_until: server.data.access_valid_until,
					});

					$(document).trigger('messiaContentIsSaved');
					Messia.tabs_selector.trigger('resetSaveState');
					break;

				default:
					$.fn.TabsPluginFrameWork('showMessage', server.data.user.message, 'error');
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
		} finally {
			abortController = null;
		}
	};

	forms.each(function () {
		$('body').on('input', `#${$(this).find(selectors.accessDuration).attr('id')}`, onAccessDurationChange);
		$('body').on('input', `#${$(this).find(selectors.accessDurationUnits).attr('id')}`, accessDurationUnitsChange);
		$('body').on('access-state-change', selectors.form, onAccessStateChange);
		setAccessState($(this), JSON.parse(forms.find(selectors.accessValue).val()));
	});
};
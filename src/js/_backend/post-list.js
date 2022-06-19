(function ($) {

	$(function () {
		'use strict';

		var Messia;

		Messia = {
			xhr: null,
			setSiteRating: function (e) {
				$(this).addClass('set');
				$('<span class="dashicons dashicons-admin-generic"></span>').insertAfter($(this));
				Messia.doAjax($(this), 'object_site_rating_get', { 'post_id': $(this).data('id') });
			},
			doAjax: function (caller, action, data) {

				Messia.xhr = $.ajax({
					type: 'POST',
					url: messiaVars.ajaxUrl,
					data: {
						action: action,
						messiaNonce: messiaVars.messiaNonce,
						data: {
							AJAX_Marker: messiaVars.AJAX_Marker,
							data: data,
						},
					},
					beforeSend: function () {

						if (Messia.xhr != null) {
							Messia.xhr.abort();
							Messia.xhr = null;
						}
					},
					success: function (server) {
						if (action === 'object_site_rating_get') {
							if (server.data.code !== 200) {
								$.fn.messiaModalWarning(server.data.dialogTitle, server.data.dialogHtml);
								caller.removeClass('set').next('.dashicons').remove();
							}
							else {
								var editSiteRating = $.fn.messiaModalWarning(server.data.dialogTitle, server.data.dialogHtml, []);
								editSiteRating.element.one('dialogClosed', { 'caller': caller }, Messia.editedSiteRating);
							}
						}
						if (action === 'object_site_rating_set') {
							caller.html(server.data.site_rating).removeClass('set').next('.dashicons').remove();
						}
					},
					error: function (MLHttpRequest, textStatus, errorThrown) {

						if (Messia.xhr.status === 0 && Messia.xhr.statusText == 'abort') {
							$(event.target).removeClass('calculating');
							return;
						}
					}
				});
			},
			focusCriteriaValue: function (e) {
				$(this).data('prevVal', $(this).val());
			},
			changeCriteriaValue: function (e) {

				var value = $(this).val();

				if (value == '') {
					Messia.calcSegmentSiteRating($(this));
					return;
				}
				else {
					var min = parseFloat($(this).attr('min'));
					var max = parseFloat($(this).attr('max'));
					value = parseFloat(value);
				}

				if (isNaN(value)) {
					$(this).val($(this).data('prevVal'));
				}
				else if ((value < min || value > max)) {
					$(this).val($(this).data('prevVal'));
				}
				else {
					$(this).val(Math.round(value * 100) / 100);
				}

				Messia.calcSegmentSiteRating($(this));

			},
			calcSegmentSiteRating: function (target) {

				var summ = 0;
				var amount = 0;
				var table = target.parents('#site-rating-setting');
				var termId = target.data('termId');
				var values = table.find('.criteria.data input[data-term-id="' + termId + '"]');
				var average = table.find('.criteria.average-values td[data-term-id="' + termId + '"]');

				for (var i = 0; i < values.length; i++) {

					var value = $(values[i]).val();

					if (value != '') {

						amount++;
						summ = summ + parseFloat(value);
					}
				}
				if (amount === 0) {
					average.text('X');
				}
				else {
					var sr = summ / amount;
					average.text((Math.round(sr * 100) / 100).toFixed(2));
				}
			},
			editedSiteRating: function (event, action) {
				if (action === 'ok') {

					var to_save = {
						'criterias': {},
						'avg': {},
						'post_id': event.data.caller.data('id'),
					};

					var rating = $(event.target).find('.criteria.data input[data-term-id]');
					var avg = $(event.target).find('.criteria.average-values td[data-term-id]');

					for (var i = 0; i < rating.length; i++) {
						if (typeof to_save['criterias'][$(rating[i]).data('termId')] === 'undefined') {
							to_save['criterias'][$(rating[i]).data('termId')] = {};
						}
						to_save['criterias'][$(rating[i]).data('termId')][$(rating[i]).attr('name')] = $(rating[i]).val();
					}

					for (var q = 0; q < avg.length; q++) {
						if (typeof to_save['avg'][$(avg[i]).data('termId')] === 'undefined') {
							to_save['avg'][$(avg[q]).data('termId')] = {};
						}
						to_save['avg'][$(avg[q]).data('termId')] = $(avg[q]).text();
					}
					Messia.doAjax(event.data.caller, 'object_site_rating_set', { 'to_save': to_save });
				}
				else {
					event.data.caller.removeClass('set').next('.dashicons').remove();
				}
			}
		}

		$('.column-messia_site_rating span.set_site_rating').on('click', Messia.setSiteRating);
		$('#messia_modal_warning').on('input', '#site-rating-setting .criteria.data .value', Messia.changeCriteriaValue);
		$('#messia_modal_warning').on('focus', '#site-rating-setting .criteria.data .value', Messia.focusCriteriaValue);

	});
})(jQuery);
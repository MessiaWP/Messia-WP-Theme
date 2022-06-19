import './_components/_loader.js';

(function ($) {

	$(function () {

		var Messia = {
			tooltipConfig: {
				placement: 'top',
			},
			makeTooltip: function () {
				$('.object-card [title], .cross-propertires [title], .cross-categories [title]').tooltip(Messia.tooltipConfig);
			},
			showCommentTab: function () {
				if (location.hash == "#comments") {

					const commentsContainer = $('.comments-nav-links').parents('.comment-items');

					$(window).on('load', () => {
						MessiaExt.scrollTo(commentsContainer.get(0).offsetTop - 150);
					});
				}
			},
			rewindComments: function (e) {

				var target = $(this);
				var url = target.attr('href');

				if (url) {
					MessiaExt.loader('show', '.comment-items');
					e.preventDefault();

					$.get(url)
						.done(function (data, textStatus, jqXHR) {

							var replaces = [];
							var post = $($.parseHTML(data));
							var map = [
								{
									'source': post.find('.comment-items'),
									'target': $('.comment-items'),
								},
							];

							window.history.pushState({
								singleUrl: url,
							}, '', url);

							$(window).off('popstate', Messia.refreshUrl);
							$(window).one('popstate', Messia.refreshUrl);

							MessiaExt
								.loader('hide', '.comment-items')
								.then((resolve) => {
									for (var i = 0; i < map.length; i++) {
										let replace = Messia.replaceHtml(map[i]['source'], map[i]['target']);
										replaces.push(replace);
									}

									Promise.allSettled(replaces).then((results) => {
										// ...code
									});
								});
						})
						.fail(function () {
							MessiaExt.loader('hide', '.comment-items');
						});
				}
			},
			replaceHtml: function (source, target) {

				var dur = 600;
				return Messia.delay(0)
					.then((resolve) => {
						target.css({
							'transition': 'all ' + dur + 'ms',
							'filter': 'blur(10px)',
							'opacity': '0',
						});
						return Messia.delay(dur);
					})
					.then((resolve) => {
						target.html(source.html());
						target.css({
							'filter': 'blur(0px)',
							'opacity': '1',
						});
						return Messia.delay(dur);
					})
					.then((resolve) => {
						target.removeAttr('style')
						return Messia.delay(0);
					})
					.then((resolve) => {
						return Promise.resolve('done');
					});
			},
			refreshUrl: function (event) {
				document.location.reload();
			},
			delay: function (ms) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(ms);
					}, ms);
				});
			},
		}

		$('.comment-items').on('click', '.comments-nav-links .comments-next a', Messia.rewindComments);
		$('.comment-items').on('click', '.comments-nav-links .comments-previous a', Messia.rewindComments);

		Messia.showCommentTab();
		Messia.makeTooltip();
	});
})(jQuery);
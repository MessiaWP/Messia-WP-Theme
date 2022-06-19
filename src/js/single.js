import './_components/_loader.js';

(function ($) {
	$(function () {
		var Messia = {
			smoothScroll: function (e) {
				if ('undefined' === typeof event.target.href || 0 === $(event.target.hash).length) {
					return;
				}
				event.preventDefault();
				MessiaExt.scrollTo($(e.target.hash).offset().top);
			},
			updatePost: function (e) {

				var target = $(this);
				var url = target.attr('href');

				if (url) {
					MessiaExt.loader('show', '.post');
					e.preventDefault();

					$.get(url)
						.done(function (data, textStatus, jqXHR) {

							var replaces = [];
							var post = $($.parseHTML(data));
							var map = [
								{
									'source': post.find('.col.content.post'),
									'target': $('main .col.content.post'),
								},
								{
									'source': post.nextAll('.header-title').find('.container'),
									'target': $('.header-title .container'),
								},
							];

							window.history.pushState({
								singleUrl: url,
							}, '', url);

							$(window).off('popstate', Messia.refreshUrl);
							$(window).one('popstate', Messia.refreshUrl);

							MessiaExt
								.loader('hide', '.post')
								.then((resolve) => {
									MessiaExt.scrollTo($('body').get(0).offsetTop);
									for (var i = 0; i < map.length; i++) {
										let replace = Messia.replaceHtml(map[i]['source'], map[i]['target']);
										replaces.push(replace);
									}

									Promise.allSettled(replaces).then((results) => {
										//...code
									});
								});
						})
						.fail(function () {
							MessiaExt.loader('hide', '.post');
						});
				}
			},
			replaceHtml: function (source, target) {

				var dur = 300;
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

		$('.col.content').on('click', 'nav[role="navigation"][data-smooth="true"] .pagination-single-inner .previous-post', Messia.updatePost);
		$('.col.content').on('click', 'nav[role="navigation"][data-smooth="true"] .pagination-single-inner .next-post', Messia.updatePost);
		$('body').on('click', '.characteristics-post .meta-data.comments a', Messia.smoothScroll);
	});

})(jQuery);
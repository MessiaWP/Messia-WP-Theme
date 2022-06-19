(function ($) {

	$(function () {

		var Messia = {
			prepareRipple: function (e, target) {

				// Get width and height that will 100% cover target on ripple.
				var client = target.get(0).getBoundingClientRect(),
					x = e.clientX,
					y = e.clientY,
					toLeft = x - client.left,
					toRight = client.right - x,
					toTop = y - client.top,
					toBottom = client.bottom - y,
					maxX = Math.max(toLeft, toRight),
					maxY = Math.max(toTop, toBottom),
					buttonWidth = Math.max(maxX, maxY);

				var deltaRadius = Math.hypot(maxX, maxY) - Math.max(maxX, maxY);
				buttonWidth = (buttonWidth + deltaRadius) * 2;
				buttonHeight = buttonWidth;

				return {
					height: buttonHeight,
					width: buttonWidth,
					left: e.pageX - target.offset().left - buttonWidth / 2,
					top: e.pageY - target.offset().top - buttonHeight / 2,
				};
			},
			doRippleClick: async function (e, target) {

				target.data('messiaDoRipleClick', true);
				target.find('.ripple').remove();

				const rippleData = Messia.prepareRipple(e, target);
				let ripple = $('<span class="ripple"></span>');

				ripple
					.css({
						height: rippleData.height,
						width: rippleData.width,
						left: rippleData.left + 'px',
						top: rippleData.top + 'px',
					})
					.appendTo(target).addClass('ripple-effect-click');

				return await new Promise((resolve, reject) => {

					let transition = ripple.css('transition-duration');
					let delay = Math.max.apply(Math, transition.split(',').map(parseFloat)) * 1000;

					setTimeout(function (target) {
						target.data('messiaDoRipleClick', false);
						ripple.remove();
						resolve([e, target]);
					}, delay, target, ripple);
				});
			},
			doRippleHoverIn: async function (e) {

				const target = $(this);

				clearTimeout(target.data('rippleHoverOutTimer'));

				let ripple = $('<span class="ripple"></span>');
				const currentRipple = target.find('.ripple');
				const rippleData = Messia.prepareRipple(e, target);

				ripple.css({
					height: rippleData.height,
					width: rippleData.width,
					left: rippleData.left + 'px',
					top: rippleData.top + 'px',
				})

				if (currentRipple.length === 0) {
					ripple.appendTo(target).addClass('ripple-effect-hover-in');
				}
				else {
					currentRipple.css({
						height: rippleData.height,
						width: rippleData.width,
						left: rippleData.left + 'px',
						top: rippleData.top + 'px',
					}).removeClass('ripple-effect-hover-out').addClass('ripple-effect-hover-in');
					ripple = currentRipple;
				}

				return Promise.resolve([e, target]);
			},
			doRippleHoverOut: async function (e) {

				const target = $(this);
				let ripple = $('<span class="ripple"></span>');
				const currentRipple = target.find('.ripple');
				const rippleData = Messia.prepareRipple(e, target);

				ripple.css({
					height: rippleData.height,
					width: rippleData.width,
					left: rippleData.left + 'px',
					top: rippleData.top + 'px',
				});

				if (currentRipple.length === 0) {
					ripple.appendTo(target).addClass('ripple-effect-hover-out');
				}
				else {
					currentRipple.css({
						height: rippleData.height,
						width: rippleData.width,
						left: rippleData.left + 'px',
						top: rippleData.top + 'px',
					}).removeClass('ripple-effect-hover-in').addClass('ripple-effect-hover-out');
					ripple = currentRipple;
				}

				return await new Promise((resolve, reject) => {

					let transition = ripple.css('animation-duration');
					let delay = Math.max.apply(Math, transition.split(',').map(parseFloat)) * 1000;

					let rippleHoverOutTimer = setTimeout(function (target) {
						ripple.remove();
						resolve([e, target]);
					}, delay, target, ripple);

					target.data('rippleHoverOutTimer', rippleHoverOutTimer);
				});
			},
			rippleClick: function (e) {

				if (true === $(this).data('messiaDoRipleClick')) {
					return;
				}

				var event_args = Array.from(e.handleObj.handler.arguments);
				event_args.shift();

				Messia.doRippleClick(e, $(this))
					.then(function (args) {
						let event = new Event('messiaClickRipleDone');
						args[1].get(0).dispatchEvent(event);
					});
					return;
			},
		};
		$('body').on('click', '.messia-ripple-click', Messia.rippleClick);

		if ('ontouchstart' in window === false) {
			$('body').on('mouseenter', '.messia-ripple-hover', Messia.doRippleHoverIn);
			$('body').on('mouseleave', '.messia-ripple-hover', Messia.doRippleHoverOut);
		}
	});
})(jQuery);
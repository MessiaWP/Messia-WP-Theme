import '../_components/_tabs_dynamic.js';

(function ($) {

	let
		resizeTimer,
		tabInstances = [];

	const
		tabs = document.querySelectorAll('.dynamic-tabs'),
		ab = getComputedStyle(document.body).getPropertyValue('--admin-bar-height'),
		abVal = parseInt(ab) || 0,
		shift = 30;

	function createTabs() {

		tabs.forEach(tab => {
			const
				$tab = $(tab),
				tabList = $tab.find('.tab-list'),

				// Calculate how many percent of 100 is the actual height of the tabList container and take the remainder:
				//  100 - 9.6 = 90.4
				rootMarginBottom = 100 - ((tabList.outerHeight() + abVal + shift) / window.innerHeight * 100),

				// Build Intersection Observer rootMargin value.
				rootMargin = `-${tabList.outerHeight() + abVal + shift}px 0px -${rootMarginBottom}% 0px`,
				dynamicTab = new window.dynamicTabs({
					container: tab,
					scrollMarginShift: abVal,
					observer: {
						rootMargin: rootMargin
					},
				});

			tabInstances = tabInstances.concat(dynamicTab.instance);
		});
	}

	function resizeHandler() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeCallback, 100);
	}

	function resizeCallback() {
		tabInstances.forEach(tabInstance => tabInstance.dynamicTabs.destroy());
		tabInstances.splice(0, tabInstances.length); // Make it empty.

		createTabs();
	}

	createTabs();

	window.addEventListener('resize', resizeHandler, { passive: true });

	$(function () {

	});

})(jQuery);

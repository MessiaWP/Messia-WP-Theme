<?php
/**
 *
 * Messia_Update
 *
 * @package Messia\Modules\Theme
 */

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

?>
<script type="text/html" id="tmpl-demo-manage">
	<# let demoList = data.demoList; #>
	<# let selected = data.selected; #>
	<# let themeLicenceActive = data.themeLicenceActive; #>
	<# if( demoList === false ) { #>
		<div class="demo-load">
			<svg class="lds-curve-bars" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<g transform="translate(50,50)">
					<circle cx="0" cy="0" r="8.333333333333334" fill="none" stroke="#4658ac" stroke-width="2" stroke-dasharray="26.179938779914945 26.179938779914945" transform="rotate(2.58798)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="0" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="16.666666666666668" fill="none" stroke="#e7008a" stroke-width="2" stroke-dasharray="52.35987755982989 52.35987755982989" transform="rotate(64.3712)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.2" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="25" fill="none" stroke="#ff003a" stroke-width="2" stroke-dasharray="78.53981633974483 78.53981633974483" transform="rotate(149.659)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.4" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="33.333333333333336" fill="none" stroke="#ff6d00" stroke-width="2" stroke-dasharray="104.71975511965978 104.71975511965978" transform="rotate(239.03)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.6" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="41.666666666666664" fill="none" stroke="#ffc53f" stroke-width="2" stroke-dasharray="130.89969389957471 130.89969389957471" transform="rotate(320.012)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.8" repeatCount="indefinite"></animateTransform></circle>
				</g>
			</svg>
		</div>
	<# } else if( themeLicenceActive === false ) { #>
		<div class="demo-load">
			<?php // translators: %s - html tag a. ?>
			<div><?php echo sprintf( esc_html__( 'A valid license is required to work with demo packages. You can purchase a license in %s.', 'messia' ), '<a href="' . MESSIA_SHOP_URL . '" target="_blank">Messia store</a>' ); ?></div>
		</div>
	<# } else { #>
			<# if ( demoList.length > 0 ) { #>
				<div class="demo-package-items">
					<# for ( var i = 0; i < demoList.length; i++ ) { #>
						<# let itemClasses = ['package-item']; #>
						<# if ( selected.includes( demoList[i] ) ) itemClasses.push( 'selected' ); #>
						<div class="{{ itemClasses.join(' ') }}" id="{{ demoList[i] }}" title="{{ demoList[i] }}">
							<div class="package-icon">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="#e70">
									<path d="M 7 2 C 5.895 2 5 2.895 5 4 L 5 26 C 5 27.105 5.895 28 7 28 L 23 28 C 24.105 28 25 27.105 25 26 L 25 9.5 C 25 9.235 24.895031 8.9809688 24.707031 8.7929688 L 18.207031 2.2929688 C 18.019031 2.1049688 17.765 2 17.5 2 L 7 2 z M 17 3.9042969 L 23.095703 10 L 18 10 C 17.448 10 17 9.552 17 9 L 17 3.9042969 z M 18.613281 14.232422 C 19.440281 14.232422 20.098687 14.350156 20.554688 14.785156 C 20.978687 15.156156 21.169922 15.749516 21.169922 16.353516 C 21.170922 17.127516 20.936453 17.679266 20.564453 18.072266 C 20.119453 18.549266 19.409172 18.761719 18.826172 18.761719 C 18.730172 18.761719 18.645781 18.761953 18.550781 18.751953 L 18.550781 21.412109 L 17.160156 21.412109 L 17.160156 14.371094 C 17.553156 14.286094 18.083281 14.232422 18.613281 14.232422 z M 9.0839844 14.265625 L 12.699219 14.265625 L 12.699219 15.292969 L 10.535156 20.171875 L 10.535156 20.203125 L 12.689453 20.203125 L 12.689453 21.412109 L 8.8710938 21.412109 L 8.8710938 20.595703 L 11.140625 15.505859 L 11.140625 15.474609 L 9.0839844 15.474609 L 9.0839844 14.265625 z M 14.001953 14.265625 L 15.390625 14.265625 L 15.390625 21.412109 L 14.001953 21.412109 L 14.001953 14.265625 z M 18.890625 15.357422 C 18.763625 15.357422 18.635781 15.378156 18.550781 15.410156 L 18.550781 17.626953 C 18.624781 17.637953 18.698203 17.636719 18.783203 17.636719 C 19.483203 17.636719 19.791016 17.138703 19.791016 16.470703 C 19.791016 15.845703 19.536625 15.357422 18.890625 15.357422 z"></path>
								</svg>
							</div>
							<span class="package-name">{{ demoList[i] }}</span>
						</div>
					<# } #>
				</div>
			<# } else {#>
				<div class="empty-list">
					<svg xmlns="http://www.w3.org/2000/svg" height="60px" width="60px" viewBox="0 0 24 24"  fill="#e70">
						<path d="M0 0h24v24H0z" fill="none"></path>
						<path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
					</svg>
					<?php // translators: %s - html tag a. ?>
					<div><?php echo sprintf( esc_html__( 'You can download demo packages from %s page.', 'messia' ), '<a href="' . MESSIA_SHOP_MY_ACCOUNT_URL . '" target="_blank">My Account</a>' ); ?></div>
				</div>
			<# } #>
		<div id="demo-upload-progress"></div>
	<# } #>
</script>

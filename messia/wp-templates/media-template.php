<script type="text/html" id="tmpl-icon-collection">
	<# let iconSet = data.iconSet; #>
	<# let activeSet = data.activeSet; #>
	<# let activeVariant = data.activeVariant; #>
	<# let iconsetClass = ['iconset-tabs']; #>
	<# let activeSetData = iconSet.find((element) => element.id === activeSet); #>

	<# if( iconSet.length <= 1 ) iconsetClass.push( 'hidden' ); #>
	<div class="icons-collection">
		<div class="{{ iconsetClass.join( ' ' ) }}">
			<# _.each( data.iconSet, function ( tab, index ) { #>
				<# let navClass = ['toggle-iconset']; #>
				<# if( tab.id === activeSet ) navClass.push( 'active' ); #>
				<label data-setid="{{ tab.id }}" class="{{ navClass.join( ' ' ) }}">{{ tab.name }}</label>
			<# } ) #>
		</div>
		<div data-setid="{{ activeSetData.id }}" id="icon-set">
			<div class="icons-variants">
				<# _.each( activeSetData.variants, function ( variant, index ) { #>
					<# let variantClass = [ 'variant button chip-text' ]; #>
					<# if( variant.id === activeVariant[activeSet] ) variantClass.push( 'button-primary active fetching' ); #>
					<label data-variantId="{{ variant.id }}" class="{{ variantClass.join(' ') }}">
						<span>{{ variant.title }}</span>
						<div class="ld"></div>
					</label>
				<# } ) #>
			</div>
			<div id="icon-set-items"></div>
		</div>
	</div>
</script>

<script type="text/html" id="tmpl-icon-set-items">
	<# let iconSet = data.iconSet; #>
	<# let activeSet = data.activeSet; #>
	<# let activeVariant = data.activeVariant; #>
	<# let selectedIcons = data.selectedIcons; #>
	<# let activeSetData = iconSet.find((element) => element.id === activeSet); #>
	<# let activeVariantData = activeSetData.variants.find((element) => element.id === activeVariant[activeSet]); #>
	<# let assetsClass = activeVariantData.cssClass; #>
	<# let selectedIconInSet = selectedIcons.map((element) => { #>
		<# if ( element.iconSetId === activeSet ) return element.icon; #>
	<# } ); #>

	<div class="icons-groups">
		<# _.each( activeSetData.icons, function ( categoryIcons, category ) { #>
		<icons-group>
			<h2>{{ category }}</h2>
			<div class="icons-container">
			<# _.each( categoryIcons, function ( icon, index ) { #>
				<# let iconClass = ['icon-placeholder']; #>
				<# if( messiaVars.mediaFrame.wowEffect === true ) iconClass.push( 'wow' ); #>
				<# if( selectedIconInSet.includes( icon.name ) ) iconClass.push( 'selected' ); #>
				<button class="{{ iconClass.join(' ') }}">
					<span data-iconid="{{ icon.id }}" class="icon-asset {{ assetsClass.join(' ') }}">{{ icon.name }}</span>
					<span class="icon-name">{{ icon.title }}</span>
				</button>
			<# } ) #>
			</div>
		</icons-group>
		<# } ) #>
	</div>
</script>

<script type="text/html" id="tmpl-icon-loader">
	<div class="icon-loader">
		<span class="spinner is-active"></span>
	</div>
</script>

<script type="text/html" id="tmpl-icon-error">
	<div class="icon-message"><span>{{ data.message }}</span></div>
</script>
(function ($) {
    "use strict";
    
	 // Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(350).fadeOut("slow");
    });
	
    var listingApp = {
        /* ---------------------------------------------
         Click Events
        --------------------------------------------- */
        click_event:function() {
            var navToggler = $('.page-header .header-top .navbar-toggler');
            navToggler.on('click', function() {
                $(this).find('i').toggleClass('fa-cog fa-close');
            });

            var navMenuToggle = $('.page-header .header-menu .navbar-toggler');
            navMenuToggle.on('click', function() {
                $(this).find('i').toggleClass('fa-bars fa-close');
            });
        },
        /* ---------------------------------------------
         Scroll Events
        --------------------------------------------- */
        scroll_event:function() {
            var returnTop =  $('#return_to_top');           
            $(window).scroll(function() {
                if ($(this).scrollTop() >= 500) {
                    returnTop.fadeIn(200);
                } else {
                    returnTop.fadeOut(200);
                }
            });

            returnTop.on('click', function() {
                $('body, html').animate({
                    scrollTop: 0
                }, 500);
            });

            var siteInfo = $('.site-info');
            siteInfo.each(function() {
                if (isScrolledIntoView($(this))) {
                    var headerBg = $('.main-header .background-image');
                    headerBg.css('filter', 'blur(4.4px)');
                } else {
                    var headerBg = $('.main-header .background-image');
                    headerBg.css('filter', 'none');
                }
            });
        },
        /* ---------------------------------------------
         Counter Events
        --------------------------------------------- */
        counter_event:function() {
            var infovalue = $('.site-info .info-item .info-value');
            infovalue.each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function(now) {
                        let value = Math.ceil(now).toLocaleString('en');
                        if (Math.ceil(now) > 95546) {
                            value = value + "+";
                        }
                        $(this).text(value);
                    }
                });
            });
        },
        /* ---------------------------------------------
         Hover Events
        --------------------------------------------- */
        hover_events:function() {
            var $map_view = $('.page-blog .image-map .map-view');
            $map_view.on('hover', function() {
                $(this).parent().addClass('full-map');
            }, function() {
                $(this).parent().removeClass('full-map');
            });

            var selectField = $('select.form-control');
            if( selectField.length ) {
                tail.select("select.form-control");
            }
        },
        /* ---------------------------------------------
         Background Image
        --------------------------------------------- */
        background_image: function() {
            $("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function() {
                var $this = $(this);

                if( $this.hasClass("pt-separate-bg-element") ){
                    $this.append('<div class="pt-background">');

                    // Background Color

                    if( $("[data-bg-color]") ){
                        $this.find(".pt-background").css("background-color", $this.attr("data-bg-color") );
                    }

                    // Particles

                    if( $this.attr("data-bg-particles-line-color") || $this.attr("data-bg-particles-dot-color") ){
                        $this.find(".pt-background").append('<div class="pt-background-particles">');
                        $(".pt-background-particles").each(function () {
                            var lineColor = $this.attr("data-bg-particles-line-color");
                            var dotColor = $this.attr("data-bg-particles-dot-color");
                            var parallax = $this.attr("data-bg-particles-parallax");
                            $(this).particleground({
                                density: 15000,
                                lineWidth: 0.2,
                                lineColor: lineColor,
                                dotColor: dotColor,
                                parallax: parallax,
                                proximity: 200
                            });
                        });
                    }

                    // Background Image

                    if( $this.attr("data-bg-image") !== undefined ){
                        $this.find(".pt-background").append('<div class="pt-background-image">');
                        $this.find(".pt-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
                        $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
                        $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
                        $this.find(".pt-background-image").css("opacity", $this.attr("data-bg-image-opacity") );

                        $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
                        $this.find(".pt-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
                        $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
                        $this.find(".pt-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                    }

                    // Parallax effect

                    if( $this.attr("data-bg-parallax") !== undefined ){
                        $this.find(".pt-background-image").addClass("pt-parallax-element");
                    }
                }
                else {

                    if(  $this.attr("data-bg-color") !== undefined ){
                        $this.css("background-color", $this.attr("data-bg-color") );
                        if( $this.hasClass("btn") ) {
                            $this.css("border-color", $this.attr("data-bg-color"));
                        }
                    }

                    if( $this.attr("data-bg-image") !== undefined ){
                        $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );

                        $this.css("background-size", $this.attr("data-bg-size") );
                        $this.css("background-repeat", $this.attr("data-bg-repeat") );
                        $this.css("background-position", $this.attr("data-bg-position") );
                        $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                    }

                }
            });
        },  
        /* ---------------------------------------------
         Date Picker & UI Slider
        --------------------------------------------- */
        date_picker_ui_slider:function() {
            var $datepicker_start = $('.search-bar .date-range .date-start');
            if ($datepicker_start.length) {
                $datepicker_start.datepicker({
                    format: 'dd.mm.yyyy'
                });
                var $datepicker_end = $('.search-bar .date-range .date-end');
                $datepicker_end.datepicker({
                    format: 'dd.mm.yyyy'
                });
                $('.datepicker-dropdown thead .prev i').attr('class', 'fa fa-angle-left');
                $('.datepicker-dropdown thead .next i').attr('class', 'fa fa-angle-right');
            }

            var $datepicker_start2 = $('.sidebar .date-from');
            if ($datepicker_start2.length) {
                $datepicker_start2.datepicker({
                    format: 'dd.mm.yyyy'
                });
                var $datepicker_end2 = $('.sidebar .date-to');
                $datepicker_end2.datepicker({
                    format: 'dd.mm.yyyy'
                });
                $('.datepicker-dropdown thead .prev i').attr('class', 'fa fa-angle-left');
                $('.datepicker-dropdown thead .next i').attr('class', 'fa fa-angle-right');
            }

            var $hotelPriceRange = $('.search-bar #hotel .price-range .price-range-input');
            if ($hotelPriceRange.length) {
                var hotelPriceRange = $hotelPriceRange.slider();
                var prices = hotelPriceRange.slider('getValue');
                $('.search-bar #hotel .price-range .value-min').html(prices[0]);
                $('.search-bar #hotel .price-range .value-max').html(prices[1]);
                hotelPriceRange.on('change', function() {
                    prices = hotelPriceRange.slider('getValue');
                    $('.search-bar #hotel .price-range .value-min').html(prices[0]);
                    $('.search-bar #hotel .price-range .value-max').html(prices[1]);
                });
            }

            var $travelPriceRange = $('.search-bar #travel .price-range .price-range-input');
            if ($travelPriceRange.length) {
                var travelPriceRange = $travelPriceRange.slider();
                var prices = travelPriceRange.slider('getValue');
                $('.search-bar #travel .price-range .value-min').html(prices[0]);
                $('.search-bar #travel .price-range .value-max').html(prices[1]);
                travelPriceRange.on('change', function() {
                    prices = travelPriceRange.slider('getValue');
                    $('.search-bar #travel .price-range .value-min').html(prices[0]);
                    $('.search-bar #travel .price-range .value-max').html(prices[1]);
                });
            }

            var $hotelPriceRange2 = $('.sidebar #hotels .price-range .price-range-input');
            if ($hotelPriceRange2.length) {
                var hotelPriceRange2 = $hotelPriceRange2.slider();
                var prices = hotelPriceRange2.slider('getValue');
                $('.sidebar #hotels .price-range .value-min').html(prices[0]);
                $('.sidebar #hotels .price-range .value-max').html(prices[1]);
                hotelPriceRange2.on('change', function() {
                    prices = hotelPriceRange2.slider('getValue');
                    $('.sidebar #hotels .price-range .value-min').html(prices[0]);
                    $('.sidebar #hotels .price-range .value-max').html(prices[1]);
                });
            }

            var $travelPriceRange2 = $('.sidebar #tours .price-range .price-range-input');
            if ($travelPriceRange2.length) {
                var travelPriceRange2 = $travelPriceRange2.slider();
                var prices = travelPriceRange2.slider('getValue');
                $('.sidebar #tours .price-range .value-min').html(prices[0]);
                $('.sidebar #tours .price-range .value-max').html(prices[1]);
                travelPriceRange2.on('change', function() {
                    prices = travelPriceRange2.slider('getValue');
                    $('.sidebar #tours .price-range .value-min').html(prices[0]);
                    $('.sidebar #tours .price-range .value-max').html(prices[1]);
                });
            }
        },
        /* ---------------------------------------------
         Search & UI Slider
        --------------------------------------------- */
        search_price_range: function () {
            let $searchPriceRange1 = $('.search_bar #bar_tab_one .price_range .price_range_input');
            if ($searchPriceRange1.length) {
                let searchPriceRange1 = $searchPriceRange1.slider();
                let prices = searchPriceRange1.slider('getValue');
                $('.search_bar #bar_tab_one .price_range .value_min').html(prices[0]);
                $('.search_bar #bar_tab_one .price_range .value_max').html(prices[1]);
                searchPriceRange1.on('change', function() {
                    prices = searchPriceRange1.slider('getValue');
                    $('.search_bar #bar_tab_one .price_range .value_min').html(prices[0]);
                    $('.search_bar #bar_tab_one .price_range .value_max').html(prices[1]);
                });
            }
            let $searchPriceRange2 = $('.search_bar #bar_tab_two .price_range .price_range_input');
            if ($searchPriceRange2.length) {
                let searchPriceRange2 = $searchPriceRange2.slider();
                let prices = searchPriceRange2.slider('getValue');
                $('.search_bar #bar_tab_two .price_range .value_min').html(prices[0]);
                $('.search_bar #bar_tab_two .price_range .value_max').html(prices[1]);
                searchPriceRange2.on('change', function() {
                    prices = searchPriceRange2.slider('getValue');
                    $('.search_bar #bar_tab_two .price_range .value_min').html(prices[0]);
                    $('.search_bar #bar_tab_two .price_range .value_max').html(prices[1]);
                });
            }
            
            let $searchPriceRange3 = $('.widget_find_search #filter_tab_one .price_range .price_range_input');
            if ($searchPriceRange3.length) {
                let searchPriceRange3 = $searchPriceRange3.slider();
                let prices = searchPriceRange3.slider('getValue');
                $('.widget_find_search #filter_tab_one .price_range .value_min').html(prices[0]);
                $('.widget_find_search #filter_tab_one .price_range .value_max').html(prices[1]);
                searchPriceRange3.on('change', function() {
                    prices = searchPriceRange3.slider('getValue');
                    $('.widget_find_search #filter_tab_one .price_range .value_min').html(prices[0]);
                    $('.widget_find_search #filter_tab_one .price_range .value_max').html(prices[1]);
                });
            }
            
            let $searchPriceRange4 = $('.widget_find_search #filter_tab_two .price_range .price_range_input');
            if ($searchPriceRange4.length) {
                let searchPriceRange4 = $searchPriceRange4.slider();
                let prices = searchPriceRange4.slider('getValue');
                $('.widget_find_search #filter_tab_two .price_range .value_min').html(prices[0]);
                $('.widget_find_search #filter_tab_two .price_range .value_max').html(prices[1]);
                searchPriceRange4.on('change', function() {
                    prices = searchPriceRange4.slider('getValue');
                    $('.widget_find_search #filter_tab_two .price_range .value_min').html(prices[0]);
                    $('.widget_find_search #filter_tab_two .price_range .value_max').html(prices[1]);
                });
            }
        },
        /* ---------------------------------------------
         Video
        --------------------------------------------- */
        video:function() {
            var $videoSrc;

            var videoPlay = $('.video-play-button');
            videoPlay.on('click',function() {
                $videoSrc = $(this).attr("data-src");
            });

            var Modal = $('#myModal');
            Modal.on('shown.bs.modal', function() {
                $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
            });
            Modal.on('hide.bs.modal', function() {
                $("#video").attr('src', $videoSrc);
            });

            var MoldaTour = $('#modal-tour');
            MoldaTour.on('shown.bs.modal', function() {
                $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
            });
            MoldaTour.on('hide.bs.modal', function() {
                $("#video").attr('src', $videoSrc);
            });

            var $post_video = $('.post-video');
            if ($post_video.length) {
                var options = {
                    id: 59777392,
                    loop: true
                }
                var player = new Vimeo.Player($post_video, options);
            }

            if ($('#post_audio').length) {
                var ap = new APlayer({
                    element: document.getElementById('post_audio'),
                    music: {
                        title: 'Preparation',
                        author: 'Hans Zimmer/Richard Harvey',
                        url: 'img/others/simple.wav',
                    }
                });
            }
        },
        /* ---------------------------------------------
         Scrollbar
        --------------------------------------------- */
        scrollbar:function() {
            var $hotel_list_view = $('.map-search .hotel-list-view');
            if ($hotel_list_view.length) {
                $hotel_list_view.TrackpadScrollEmulator();
                $(window).resize(function() {
                    setTimeout(function() {
                        $hotel_list_view.TrackpadScrollEmulator('recalculate');
                    }, 250);
                });
            }
        },
        /* ---------------------------------------------
         Others
        --------------------------------------------- */
        others:function() {
            var $btn_toggler = $('.map-search .map-view .btn-toggler');
            if ($btn_toggler.length) {
                $btn_toggler.on('click', function() {
                    $('.hotel-list-view').toggleClass('collapsed-hotel-list-view');
                    $('.map-view').toggleClass('full-map-view', 'collapsed-map-view');
                });
            }

            var checkobx = $('.sidebar .filter-item .checkbox');
            checkobx.on('click', function() {
                $(this).toggleClass('fa-check-square fa-square-o');
            });

            var categoryLink = $('.categories .link-item');
            categoryLink.on('click', function() {
                $(this).parent().toggleClass('expanded');
            });


            var wow = new WOW({
                boxClass: 'wow', // default
                animateClass: 'animated', // default
                offset: 0, // default
                mobile: true, // default
                live: true // default
            });
            wow.init();
        },
        /* ---------------------------------------------
         Owl Carousel
        --------------------------------------------- */
        owlcarousel:function() {
            function owl_carousel() {    
                var $owlCarousel = $(".owl-carousel");
                if( $owlCarousel.length ){
                    $owlCarousel.each(function() {

                        var items = parseInt( $(this).attr("data-owl-items"), 10);
                        if( !items ) items = 1;

                        var nav = parseInt( $(this).attr("data-owl-nav"), 2);
                        if( !nav ) nav = 0;

                        var dots = parseInt( $(this).attr("data-owl-dots"), 2);
                        if( !dots ) dots = 0;            

                        var indicator = parseInt( $(this).attr("data-owl-indicator"), 2);
                        if( !indicator ) indicator = 0;       

                        var extraNav = parseInt( $(this).attr("data-owl-extranav"), 2);
                        if( !extraNav ) extraNav = 0;

                        var center = parseInt( $(this).attr("data-owl-center"), 2);
                        if( !center ) center = 0;

                        var loop = parseInt( $(this).attr("data-owl-loop"), 2);
                        if( !loop ) loop = 0;

                        var margin = parseInt( $(this).attr("data-owl-margin"));
                        if( !margin ) margin = 0;

                        var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
                        if( !autoWidth ) autoWidth = 0;

                        var navContainer = $(this).attr("data-owl-nav-container");
                        if( !navContainer ) navContainer = 0;

                        var autoplay = parseInt( $(this).attr("data-owl-autoplay"), 2);
                        if( !autoplay ) autoplay = 0;

                        var autoplayTimeOut = parseInt( $(this).attr("data-owl-autoplay-timeout"), 10);
                        if( !autoplayTimeOut ) autoplayTimeOut = 5000;

                        var autoHeight = parseInt( $(this).attr("data-owl-auto-height"), 2);
                        if( !autoHeight ) autoHeight = 0;

                        var animationIn = $(this).attr("data-owl-anim-in");
                        if( !animationIn ) animationIn = 0;
                        else animationIn = $(this).attr("data-owl-anim-in");            

                        var animationOut = $(this).attr("data-owl-anim-out");
                        if( !animationOut ) animationOut = 0;
                        else animationOut = $(this).attr("data-owl-anim-out");

                        if( $("body").hasClass("rtl") ) var rtl = true;
                        else rtl = false;

                        if(nav == 1) {
                            var navigation = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] 
                        } else {
                            var navigation = []
                        }

                        var $this = $(this);

                        if( items === 1 ){
                            $this.owlCarousel({
                                navContainer: navContainer,
                                animateOut: animationOut,
                                animateIn: animationIn,
                                autoplayTimeout: autoplayTimeOut,
                                autoplay: autoplay,
                                autoHeight: autoHeight,
                                center: center,
                                loop: loop,
                                margin: margin,
                                autoWidth: autoWidth,
                                items: 1,
                                nav: nav,
                                dots: dots,
                                rtl: rtl,
                                navText: navigation
                            });
                        } else {
                            $this.owlCarousel({
                                navContainer: navContainer,
                                animateOut: animationOut,
                                animateIn: animationIn,
                                autoplayTimeout: autoplayTimeOut,
                                autoplay: autoplay,
                                autoHeight: autoHeight,
                                center: center,
                                loop: loop,
                                margin: margin,
                                autoWidth: autoWidth,
                                items: 1,
                                nav: nav,
                                dots: dots,
                                rtl: rtl,
                                navText: navigation,
                                responsive: {
                                    1199: {
                                        items: items
                                    },
                                    992: {
                                        items: 2
                                    },
                                    768: {
                                        items: 1
                                    },
                                    0: {
                                        items: 1
                                    }
                                }
                            });
                        }

                        if( indicator == 1 ) {
                            $this.trigger('to.owl.carousel', [1, 0]);
                            $this.on('changed.owl.carousel', function(event) {
                                if( loop == 1 ) {
                                    var currentItem = event.relatedTarget.current() - 2;
                                } else {
                                    var currentItem = event.relatedTarget.current();
                                }
                                var indicator = $('.slide-indicators').children().eq(currentItem);
                                indicator.parent().children().removeClass('active');
                                indicator.addClass('active');
                            });
                            $this.parent().find('.indicator').on('click', function() {
                                $(this).parent().children().removeClass('active');
                                $(this).addClass('active');

                                var position = $(this).find('.indicator-number').html() - 1;
                                $this.trigger('to.owl.carousel', position);
                            });
                        }

                        if( extraNav == 1 ) {
                            $this.parent().find('.btn_links .btn-prev').on('click',function() {
                                $this.trigger('prev.owl.carousel');
                            });
                            $this.parent().find('.btn_links .btn-next').on('click',function() {
                                $this.trigger('next.owl.carousel');
                            });
                        }

                        if( $(this).find(".owl-item").length === 1 ){
                            $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
                        }

                    });
                }
            }
            owl_carousel();
        },
        /* ---------------------------------------------
         Masonry Script
         --------------------------------------------- */
        masonry_script:function() {
            var $hotels_grid = $('.popular-hotels-rooms .masonry-grid');
            if ($hotels_grid.length) {
                var hotels_grid = $hotels_grid.isotope({
                    itemSelector: '.grid-item'
                });
                var popularHotel = $('.popular-hotels-rooms');
                popularHotel.on('click', '.filter-tabs .tab, .btn-red', function() {
                    var filterValue = $(this).attr('data-filter');
                    hotels_grid.isotope({
                        filter: filterValue
                    });
                });

                var tab = $('.tab');
                tab.on('click', function() {
                    $(this).parent().find('.tab').removeClass('selected');
                    $(this).addClass('selected');
                });
            }

            if ($('.masonry_grid').length > 0) {
                var container = $('.masonry_grid');
                container.isotope({
                    itemSelector: '.grid'
                });
            }

            var IsoGriddoload = $('.featured_isotope');
            IsoGriddoload.isotope({
                itemSelector: '.grid',
                masonryHorizontal: {
                    rowHeight: 100
                }
            });

            var ProjMli = $('.featured_isotope_filter .tab');
            var ProjGrid = $('.featured_isotope');
            ProjMli.on('click', function(e) {
                e.preventDefault();
                ProjMli.removeClass("active");
                $(this).addClass("active");
                var selector = $(this).data('filter');
                console.log(selector);
                ProjGrid.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
            });
        },
        /* ---------------------------------------------
         function initializ
         --------------------------------------------- */
        initializ: function() {
            listingApp.click_event();
            listingApp.counter_event();
            listingApp.background_image();
            listingApp.hover_events();
            listingApp.date_picker_ui_slider();
            listingApp.search_price_range();
            listingApp.video();
            listingApp.scrollbar();
            listingApp.scroll_event();
            listingApp.owlcarousel();
            listingApp.others();
        }
    };

    /* ---------------------------------------------
     Document ready function
     --------------------------------------------- */
    $(function() {
        listingApp.initializ();
    });

    $(window).on('load', function() {
        listingApp.masonry_script();
    });



    /* ---------------------------------------------
     Others function
     --------------------------------------------- */
    function isScrolledIntoView(elem) {
        var $elem = $(elem);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.outerHeight();

        return (elemBottom >= docViewTop) && (elemTop <= docViewBottom);
    }

})(jQuery);

/* ---------------------------------------------
 Google Map Callback Functions
 --------------------------------------------- */
function googleMapContact() {
    var pt_center = new google.maps.LatLng(-33.9198, 151.2504);
    var mapCanvas = document.getElementById('map_contact');
    var styles = [{
        stylers: [{
            saturation: -100
        }]
    }];
    var mapOptions = {
        center: pt_center,
        zoom: 18,
        styles: styles
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: pt_center,
        icon: 'images/icons/map-pin.png'
    });
    marker.setMap(map);

    google.maps.event.addDomListener(window, 'resize', function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter(pt_center);
    });
}

function googleMap() {
    let pt_center = new google.maps.LatLng(-33.9198, 151.2504);
    let mapCanvas = document.getElementById('google_map');
    let styles = [{
        stylers: [{
            saturation: -100
        }]
    }];
    let mapOptions = {
        center: pt_center,
        zoom: 18,
        styles: styles
    };
    let map = new google.maps.Map(mapCanvas, mapOptions);
    let locations = [
        [ pt_center.lat(), pt_center.lng() ],
        [ pt_center.lat() + 0.00066, pt_center.lng() - 0.0006 ],
        [ pt_center.lat() - 0.00055, pt_center.lng() - 0.0014 ],
        [ pt_center.lat() - 0.0007, pt_center.lng() + 0.001 ],
        [ pt_center.lat() + 0.005, pt_center.lng() ],
        [ pt_center.lat() + 0.0055, pt_center.lng() - 0.0007 ],
        [ pt_center.lat() + 0.0055, pt_center.lng() + 0.0007 ]
    ];
    let hotel_package = '<div class="card card_hotel_package">' +
                        '<div class="card_image">' + 
                            '<img src="images/hotel-tour/10.png" alt="">' +
                            '<div class="price"><span>$50 / Month</span></div>' +
                        '</div>' +
                        '<div class="card_body">' +
                            '<a href="" class="card_title">Name Of Hotel</a>' +
                            '<div class="rating_review">' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star-o"></i>' +
                                '<i class="fa fa-star-o"></i>' +
                            '</div>' +
                            '<div class="review">1+ Review</div>' + 
                        '</div>' +
                    '</div>';

    let infowindow = new google.maps.InfoWindow({
        content: hotel_package,
        maxWidth: 250
    });

    let markers = [];

    for (var i = 0; i < locations.length; i++) {

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            icon: 'images/icons/map-pin.png',
            map: map
        });

        marker.addListener('click', function() {
            for (var j = 0; j < markers.length; j++) {
               markers[j].setIcon('images/icons/map-pin.png');
            }

            marker.setIcon('images/icons/map-pin1.png');
            infowindow.open(map, marker);
        });

        google.maps.event.addListener(infowindow, 'domready', function() {
            
            var iwOuter = jQuery('.gm-style-iw');

            var iwBackground = iwOuter.prev();

            iwOuter.addClass('map-unnecessary-el');

            var btnClose = iwOuter.next();

            setTimeout(function() {
                iwOuter.parent().css({
                    'height': '0'
                });
            }, 300);

            iwOuter.css({
                'top': '249px',
                'left': '100px'
            });
            iwOuter.children(':nth-child(1)').css({
                'overflow': 'unset'
            });
            iwOuter.children(':nth-child(1)').children(':nth-child(1)').css({
                'overflow': 'unset',
                'padding': '5px'
            });

            btnClose.children(':nth-child(1)').hide();
            btnClose.addClass('fa fa-close btn btn-red btn-close');
            btnClose.css({
                'width': '38px',
                'height': '33px',
                'top': '-3px',
                'right': '-42px',
                'background': 'rgba(0,0,0,0.45)'
            });

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});

            iwBackground.children(':nth-child(3)').children(':nth-child(1)').css({'top': '5px'});
            iwBackground.children(':nth-child(3)').children(':nth-child(1)').children().css({'transform': 'skewX(32.6deg)', 'width': '10px', 'height': '15px'});

            iwBackground.children(':nth-child(3)').children(':nth-child(2)').css({'top': '5px'});
            iwBackground.children(':nth-child(3)').children(':nth-child(2)').children().css({'transform': 'skewX(-32.6deg)', 'width': '10px', 'height': '15px'});

            iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        });
        markers.push(marker);
    }

    map.addListener('click', function() {
        infowindow.close();
    });
}

function googleMapLocation() {
    var pt_center = new google.maps.LatLng(-33.9198, 151.2504);
    var mapCanvas = document.getElementById('map_location');
    var styles = [{
        stylers: [{
            saturation: -100
        }]
    }];
    var mapOptions = {
        center: pt_center,
        zoom: 18,
        styles: styles
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: pt_center,
        icon: 'images/icons/map-pin2.png',
        map: map
    });
}

//-----------Search box jquery------------//

			$( ".searchd" ).on( "click", function() {
			  $( ".searchbox" ).addClass( "open", 1000);
			});

			$( ".close" ).on( "click", function() {
			  $( ".searchbox" ).removeClass( "open", 1000);
			});
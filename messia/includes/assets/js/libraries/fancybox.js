/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@fancyapps/fancybox/src/js/core.js":
/*!*********************************************************!*\
  !*** ./node_modules/@fancyapps/fancybox/src/js/core.js ***!
  \*********************************************************/
/***/ (function() {

(function (window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function (stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Close existing modals
    // Set this to false if you do not need to stack multiple instances
    closeExisting: false,

    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should allow caption to overlap the content
    preventCaptionOverlap: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      "slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // For HTML5 video only
    video: {
      tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
        '<source src="{{src}}" type="{{format}}" />' +
        'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
        "</video>",
      format: "", // custom video format
      autoStart: true
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
        "</a>",

      zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
        "</button>",

      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
        "</button>",

      // Arrows
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
        "</button>",

      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
        "</button>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Hide browser vertical scrollbars; use at your own risk
    hideScrollbar: true,

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: true,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable panning/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
      media : {
        youtube : {
          params : {
            autoplay : 0
          }
        }
      }
    */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 3000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
      afterShow: function( instance, current ) {
        console.info( 'Clicked element:' );
        console.info( current.opts.$orig );
      }
    */

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function (current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      preventCaptionOverlap: false,
      idleTime: false,
      clickContent: function (current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function (current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schlie&szlig;en",
        NEXT: "Weiter",
        PREV: "Zur&uuml;ck",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Vergr&ouml;&szlig;ern"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function (obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function (id) {
        window.clearTimeout(id);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function () {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function ($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function (opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function (key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // How much of an element is visible in viewport
  // =============================================

  var inViewport = function (elem) {
    var elemCenter, rez;

    if (!elem || elem.ownerDocument !== document) {
      return false;
    }

    $(".fancybox-container").css("pointer-events", "none");

    elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };

    rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem;

    $(".fancybox-container").css("pointer-events", "");

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function (content, opts, index) {
    var self = this;

    self.opts = mergeOpts({
      index: index
    }, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function () {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        $container,
        buttonStr;

      if (firstItemOpts.closeExisting) {
        $.fancybox.close(true);
      }

      // Hide scrollbars
      // ===============

      $("body").addClass("fancybox-active");

      if (
        !$.fancybox.getInstance() &&
        firstItemOpts.hideScrollbar !== false &&
        !$.fancybox.isMobile &&
        document.body.scrollHeight > window.innerHeight
      ) {
        $("head").append(
          '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
          (window.innerWidth - document.documentElement.clientWidth) +
          "px;}</style>"
        );

        $("body").addClass("compensate-for-scrollbar");
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function (index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
          self.translate(
            self,
            firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
          )
        )
        .attr("id", "fancybox-container-" + self.id)
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function (obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;

      return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
        return arr[n] === undefined ? match : arr[n];
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function (content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function (i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        if ($.fancybox.isMobile && obj.opts.mobile) {
          obj.opts = mergeOpts(obj.opts, obj.opts.mobile);
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.video.format) {
              obj.opts.video.format = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
            obj = $.extend(true, obj, {
              contentType: "pdf",
              opts: {
                iframe: {
                  preload: false
                }
              }
            });
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image, check if exists and if is in the viewport
        obj.$thumb = obj.opts.$thumb || null;

        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.$thumb = obj.opts.$trigger.find("img:first");

          if (obj.$thumb.length) {
            obj.opts.$orig = obj.opts.$trigger;
          }
        }

        if (!(obj.$thumb && obj.$thumb.length) && obj.opts.$orig) {
          obj.$thumb = obj.opts.$orig.find("img:first");
        }

        if (obj.$thumb && !obj.$thumb.length) {
          obj.$thumb = null;
        }

        obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null);

        // "caption" is a "special" option, it can be used to customize caption per gallery item
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            trapFocus: true,
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detecting inactivity
    // ======================================

    addEvents: function () {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      // ==================================

      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function (e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      // ==========================================

      $W.on("orientationchange.fb resize.fb", function (e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          if (self.requestId) {
            cancelAFrame(self.requestId);
          }

          self.requestId = requestAFrame(function () {
            self.update(e);
          });
        } else {
          if (self.current && self.current.type === "iframe") {
            self.$refs.stage.hide();
          }

          setTimeout(
            function () {
              self.$refs.stage.show();

              self.update(e);
            },
            $.fancybox.isMobile ? 600 : 250
          );
        }
      });

      $D.on("keydown.fb", function (e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null,
          current = instance.current,
          keycode = e.keyCode || e.which;

        // Trap keyboard focus inside of the modal
        // =======================================

        if (keycode == 9) {
          if (current.opts.trapFocus) {
            self.focus(e);
          }

          return;
        }

        // Enable keyboard navigation
        // ==========================

        if (!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function (e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function () {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function () {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function (duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function (duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function (pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        isMoved,
        loop,
        current,
        previous,
        slidePos,
        stagePos,
        prop,
        diff;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      // Should loop?
      pos = parseInt(pos, 10);
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      // Check if opening for the first time; this helps to speed things up
      firstRun = self.firstRun = !Object.keys(self.slides).length;

      // Create slides
      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }

        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Check if user has swiped the slides or if still animating
      isMoved = self.isMoved(current);

      // Make sure current slide is visible
      current.$slide.addClass("fancybox-slide--current");

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.addClass("fancybox-is-open").trigger("focus");

        // Attempt to load content into slide
        // This will later call `afterLoad` -> `revealContent`
        self.loadSlide(current);

        self.preload("image");

        return;
      }

      // Get actual slide/stage positions (before cleaning up)
      slidePos = $.fancybox.getTranslate(previous.$slide);
      stagePos = $.fancybox.getTranslate(self.$refs.stage);

      // Clean up all slides
      $.each(self.slides, function (index, slide) {
        $.fancybox.stop(slide.$slide, true);
      });

      if (previous.pos !== current.pos) {
        previous.isComplete = false;
      }

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current");

      // If slides are out of place, then animate them to correct position
      if (isMoved) {
        // Calculate horizontal swipe distance
        diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter);

        $.each(self.slides, function (index, slide) {
          slide.$slide.removeClass("fancybox-animated").removeClass(function (index, className) {
            return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
          });

          // Make sure that each slide is in equal distance
          // This is mostly needed for freshly added slides, because they are not yet positioned
          var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter;

          $.fancybox.setTranslate(slide.$slide, {
            top: 0,
            left: leftPos - stagePos.left + diff
          });

          if (slide.pos !== current.pos) {
            slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous"));
          }

          // Redraw to make sure that transition will start
          forceRedraw(slide.$slide);

          // Animate the slide
          $.fancybox.animate(
            slide.$slide, {
              top: 0,
              left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter
            },
            duration,
            function () {
              slide.$slide
                .css({
                  transform: "",
                  opacity: ""
                })
                .removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                self.complete();
              }
            }
          );
        });
      } else if (duration && current.opts.transitionEffect) {
        // Set transition effect for previously active slide
        prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect;

        previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous"));

        $.fancybox.animate(
          previous.$slide,
          prop,
          duration,
          function () {
            previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous");
          },
          false
        );
      }

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function (pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function (x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;

      $.fancybox.stop($content);

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content, {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 366,
        function () {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function (duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;

      $.fancybox.stop($content);

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content, {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 366,
        function () {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function (slide) {
      var self = this,
        $content = slide.$content,
        $slide = slide.$slide,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      maxWidth = $.fancybox.getTranslate(self.$refs.stage).width;
      maxHeight = $.fancybox.getTranslate(self.$refs.stage).height;

      maxWidth -=
        parseFloat($slide.css("paddingLeft")) +
        parseFloat($slide.css("paddingRight")) +
        parseFloat($content.css("marginLeft")) +
        parseFloat($content.css("marginRight"));

      maxHeight -=
        parseFloat($slide.css("paddingTop")) +
        parseFloat($slide.css("paddingBottom")) +
        parseFloat($content.css("marginTop")) +
        parseFloat($content.css("marginBottom"));

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      width = minRatio * width;
      height = minRatio * height;

      // Adjust width/height to precisely fit into container
      if (width > maxWidth - 0.5) {
        width = maxWidth;
      }

      if (height > maxHeight - 0.5) {
        height = maxHeight;
      }

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + parseFloat($slide.css("paddingTop"));
        rez.left = Math.floor((maxWidth - width) * 0.5) + parseFloat($slide.css("paddingLeft"));
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function (e) {
      var self = this;

      $.each(self.slides, function (key, slide) {
        self.updateSlide(slide, e);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function (slide, e) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        $slide = slide.$slide;

      // First, prevent caption overlap, if needed
      self.adjustCaption(slide);

      // Then resize content to fit inside the slide
      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      // Then some adjustments
      self.adjustLayout(slide);

      if ($slide.length) {
        $slide.trigger("refresh");

        if (slide.pos === self.currPos) {
          self.$refs.toolbar
            .add(self.$refs.navigation.find(".fancybox-button--arrow_right"))
            .toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight);
        }
      }

      self.trigger("onUpdate", slide, e);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function (duration) {
      var self = this,
        current = self.current,
        $slide = current.$slide;

      if (self.isClosing || !current) {
        return;
      }

      $slide.siblings().css({
        transform: "",
        opacity: ""
      });

      $slide
        .parent()
        .children()
        .removeClass("fancybox-slide--previous fancybox-slide--next");

      $.fancybox.animate(
        $slide, {
          top: 0,
          left: 0,
          opacity: 1
        },
        duration === undefined ? 0 : duration,
        function () {
          // Clean up
          $slide.css({
            transform: "",
            opacity: ""
          });

          if (!current.isComplete) {
            self.complete();
          }
        },
        false
      );
    },

    // Check if current slide is moved (swiped)
    // ========================================

    isMoved: function (slide) {
      var current = slide || this.current,
        slidePos,
        stagePos;

      if (!current) {
        return false;
      }

      stagePos = $.fancybox.getTranslate(this.$refs.stage);
      slidePos = $.fancybox.getTranslate(current.$slide);

      return (
        !current.$slide.hasClass("fancybox-animated") &&
        (Math.abs(slidePos.top - stagePos.top) > 0.5 || Math.abs(slidePos.left - stagePos.left) > 0.5)
      );
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function (nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container,
        canPan,
        isZoomable;

      if (!current || self.isClosing || !self.Guestures) {
        return;
      }

      $container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan");

      canPan = self.canPan(nextWidth, nextHeight);

      isZoomable = canPan ? true : self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      if (canPan) {
        $container.addClass("fancybox-can-pan");
      } else if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) == "zoom"))
      ) {
        $container.addClass("fancybox-can-zoomIn");
      } else if (current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && current.contentType !== "video") {
        $container.addClass("fancybox-can-swipe");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function () {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (fitPos && (current.width > fitPos.width || current.height > fitPos.height)) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function (nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function (nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        pos = null,
        rez = false;

      if (current.type === "image" && (current.isComplete || (nextWidth && nextHeight)) && !current.hasError) {
        rez = self.getFitPos(current);

        if (nextWidth !== undefined && nextHeight !== undefined) {
          pos = {
            width: nextWidth,
            height: nextHeight
          };
        } else if (current.isComplete) {
          pos = $.fancybox.getTranslate(current.$content);
        }

        if (pos && rez) {
          rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5;
        }
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function (slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      if (self.trigger("beforeLoad", slide) === false) {
        slide.isLoading = false;

        return false;
      }

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            slide.opts.video.tpl
            .replace(/\{\{src\}\}/gi, slide.src)
            .replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "")
            .replace("{{poster}}", slide.thumb || "")
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function (data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function (jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function () {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function (slide) {
      var self = this,
        ghost;

      // Check if need to show loading icon
      setTimeout(function () {
        var $img = slide.$image;

        if (!self.isClosing && slide.isLoading && (!$img || !$img.length || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 50);

      //Check if image has srcset
      self.checkSrcset(slide);

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && slide.thumb) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        ghost = document.createElement("img");

        ghost.onerror = function () {
          $(this).remove();

          slide.$ghost = null;
        };

        ghost.onload = function () {
          self.afterLoad(slide);
        };

        slide.$ghost = $(ghost)
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", slide.thumb);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Check if image has srcset and get the source
    // ============================================
    checkSrcset: function (slide) {
      var srcset = slide.opts.srcset || slide.opts.image.srcset,
        found,
        temp,
        pxRatio,
        windowWidth;

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function (el) {
          var ret = {};

          el.trim()
            .split(/\s+/)
            .forEach(function (el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function (a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = (slide.width / slide.height) * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }
    },

    // Create full-size image
    // ======================

    setBigImage: function (slide) {
      var self = this,
        img = document.createElement("img"),
        $img = $(img);

      slide.$image = $img
        .one("error", function () {
          self.setError(slide);
        })
        .one("load", function () {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round((slide.width / slide.height) * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function () {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if ((img.complete || img.readyState == "complete") && $img.naturalWidth && $img.naturalHeight) {
        $img.trigger("load");
      } else if (img.error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function (slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor((maxWidth * imgHeight) / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor((maxHeight * imgWidth) / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function (slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function (e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function () {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate content dimensions, if it is accessible
          if ($body && $body.length && $body.children().length) {
            // Avoid scrolling to top (if multiple instances)
            $slide.css("overflow", "visible");

            $content.css({
              width: "100%",
              "max-width": "100%",
              height: "9999px"
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            $content.css("width", frameWidth ? frameWidth : "").css("max-width", "");

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            $content.css("height", frameHeight ? frameHeight : "");

            $slide.css("overflow", "auto");
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        self.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function () {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
        slide.isRevealed = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function (slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        if (content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) {
          content.parents(".fancybox-slide").trigger("onReset");
        }

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function () {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
          slide.isRevealed = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio,article,.fancybox-content")
        .first();

      slide.$content.siblings().hide();

      // Re-check if there is a valid content
      // (in some cases, ajax response can contain various elements or plain text)
      if (!slide.$content.length) {
        slide.$content = slide.$slide
          .wrapInner("<div></div>")
          .children()
          .first();
      }

      slide.$content.addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      self.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function (slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function (slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl))
          .appendTo(slide.$slide)
          .hide()
          .fadeIn("fast");
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function (slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.stop().remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function (slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      // Add small close button
      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content);
      }

      // Disable right click
      if (slide.opts.protect && slide.$content && !slide.hasError) {
        slide.$content.on("contextmenu.fb", function (e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.adjustCaption(slide);

      self.adjustLayout(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      self.revealContent(slide);
    },

    // Prevent caption overlap,
    // fix css inconsistency across browsers
    // =====================================

    adjustCaption: function (slide) {
      var self = this,
        current = slide || self.current,
        caption = current.opts.caption,
        preventOverlap = current.opts.preventCaptionOverlap,
        $caption = self.$refs.caption,
        $clone,
        captionH = false;

      $caption.toggleClass("fancybox-caption--separate", preventOverlap);

      if (preventOverlap && caption && caption.length) {
        if (current.pos !== self.currPos) {
          $clone = $caption.clone().appendTo($caption.parent());

          $clone
            .children()
            .eq(0)
            .empty()
            .html(caption);

          captionH = $clone.outerHeight(true);

          $clone.empty().remove();
        } else if (self.$caption) {
          captionH = self.$caption.outerHeight(true);
        }

        current.$slide.css("padding-bottom", captionH || "");
      }
    },

    // Simple hack to fix inconsistency across browsers, described here (affects Edge, too):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=748518
    // ====================================================================================

    adjustLayout: function (slide) {
      var self = this,
        current = slide || self.current,
        scrollHeight,
        marginBottom,
        inlinePadding,
        actualPadding;

      if (current.isLoaded && current.opts.disableLayoutFix !== true) {
        current.$content.css("margin-bottom", "");

        // If we would always set margin-bottom for the content,
        // then it would potentially break vertical align
        if (current.$content.outerHeight() > current.$slide.height() + 0.5) {
          inlinePadding = current.$slide[0].style["padding-bottom"];
          actualPadding = current.$slide.css("padding-bottom");

          if (parseFloat(actualPadding) > 0) {
            scrollHeight = current.$slide[0].scrollHeight;

            current.$slide.css("padding-bottom", 0);

            if (Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1) {
              marginBottom = actualPadding;
            }

            current.$slide.css("padding-bottom", inlinePadding);
          }
        }

        current.$content.css("margin-bottom", marginBottom);
      }
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function (slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        isMoved = self.isMoved(slide),
        isRevealed = slide.isRevealed,
        effect,
        effectClassName,
        duration,
        opacity;

      slide.isRevealed = true;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      if (isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        self.isAnimating = true;

        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function () {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content if no effect
      // ================================
      if (!effect) {
        slide.$content.removeClass("fancybox-is-hidden");

        if (!isRevealed && isMoved && slide.type === "image" && !slide.hasError) {
          slide.$content.hide().fadeIn("fast");
        }

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      // Prepare for CSS transiton
      // =========================
      $.fancybox.stop($slide);

      //effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;
      effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect;

      $slide.addClass(effectClassName).removeClass("fancybox-slide--current"); //.addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow
      forceRedraw($slide);

      if (slide.type !== "image") {
        slide.$content.hide().show(0);
      }

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function () {
          $slide.removeClass(effectClassName).css({
            transform: "",
            opacity: ""
          });

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function (slide) {
      var rez = false,
        $thumb = slide.$thumb,
        thumbPos,
        btw,
        brw,
        bbw,
        blw;

      if (!$thumb || !inViewport($thumb[0])) {
        return false;
      }

      thumbPos = $.fancybox.getTranslate($thumb);

      btw = parseFloat($thumb.css("border-top-width") || 0);
      brw = parseFloat($thumb.css("border-right-width") || 0);
      bbw = parseFloat($thumb.css("border-bottom-width") || 0);
      blw = parseFloat($thumb.css("border-left-width") || 0);

      rez = {
        top: thumbPos.top + btw,
        left: thumbPos.left + blw,
        width: thumbPos.width - brw - blw,
        height: thumbPos.height - btw - bbw,
        scaleX: 1,
        scaleY: 1
      };

      return thumbPos.width > 0 && thumbPos.height > 0 ? rez : false;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function () {
      var self = this,
        current = self.current,
        slides = {},
        $el;

      if (self.isMoved() || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function (key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Autoplay first html5 video/audio
      if (!!current.opts.video.autoStart) {
        current.$slide
          .find("video,audio")
          .filter(":visible:first")
          .trigger("play")
          .one("ended", function () {
            if (Document.exitFullscreen) {
              Document.exitFullscreen();
            } else if (this.webkitExitFullscreen) {
              this.webkitExitFullscreen();
            }

            self.next();
          });
      }

      // Try to focus on the first focusable element
      if (current.opts.autoFocus && current.contentType === "html") {
        // Look for the first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if ($el.length) {
          $el.trigger("focus");
        } else {
          self.focus(null, true);
        }
      }

      // Avoid jumping
      current.$slide.scrollTop(0).scrollLeft(0);
    },

    // Preload next and previous slides
    // ================================

    preload: function (type) {
      var self = this,
        prev,
        next;

      if (self.group.length < 2) {
        return;
      }

      next = self.slides[self.currPos + 1];
      prev = self.slides[self.currPos - 1];

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }

      if (next && next.type === type) {
        self.loadSlide(next);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function (e, firstRun) {
      var self = this,
        focusableStr = [
          "a[href]",
          "area[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "button:not([disabled]):not([aria-hidden])",
          "iframe",
          "object",
          "embed",
          "video",
          "audio",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])'
        ].join(","),
        focusableItems,
        focusedItemIndex;

      if (self.isClosing) {
        return;
      }

      if (e || !self.current || !self.current.isComplete) {
        // Focus on any element inside fancybox
        focusableItems = self.$refs.container.find("*:visible");
      } else {
        // Focus inside current slide
        focusableItems = self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : ""));
      }

      focusableItems = focusableItems.filter(focusableStr).filter(function () {
        return $(this).css("visibility") !== "hidden" && !$(this).hasClass("disabled");
      });

      if (focusableItems.length) {
        focusedItemIndex = focusableItems.index(document.activeElement);

        if (e && e.shiftKey) {
          // Back tab
          if (focusedItemIndex < 0 || focusedItemIndex == 0) {
            e.preventDefault();

            focusableItems.eq(focusableItems.length - 1).trigger("focus");
          }
        } else {
          // Outside or Forward tab
          if (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) {
            if (e) {
              e.preventDefault();
            }

            focusableItems.eq(0).trigger("focus");
          }
        }
      } else {
        self.$refs.container.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function () {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function () {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function (e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function () {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function () {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      if (e !== true) {
        $.fancybox.stop(current.$slide);
      } else {
        effect = false;
      }

      // Remove other slides
      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container
          .removeClass("fancybox-is-open")
          .addClass("fancybox-is-closing")
          .css("transition-duration", duration + "ms");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls(true);

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !($content && duration && current.type === "image" && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        $.fancybox.animate(
          current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),
          "fancybox-animated fancybox-fx-" + effect,
          duration,
          done
        );
      } else {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          done();
        }
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function (e) {
      var self = this,
        instance,
        $focus = self.current.opts.$orig,
        x,
        y;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (!!self.current.opts.backFocus) {
        if (!$focus || !$focus.length || !$focus.is(":visible")) {
          $focus = self.$trigger;
        }

        if ($focus && $focus.length) {
          x = window.scrollX;
          y = window.scrollY;

          $focus.trigger("focus");

          $("html, body")
            .scrollTop(y)
            .scrollLeft(x);
        }
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $("body").removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function (name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function () {
      var self = this,
        current = self.current,
        index = current.index,
        $container = self.$refs.container,
        $caption = self.$refs.caption,
        caption = current.opts.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      // Set caption
      if (caption && caption.length) {
        self.$caption = $caption;

        $caption
          .children()
          .eq(0)
          .html(caption);
      } else {
        self.$caption = null;
      }

      if (!self.hasHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }

      // Make sure focus is not on disabled button/element
      if ($(document.activeElement).is(":hidden,[disabled]")) {
        self.$refs.container.trigger("focus");
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function (andCaption) {
      var self = this,
        arr = ["infobar", "toolbar", "nav"];

      if (andCaption || !self.current.opts.preventCaptionOverlap) {
        arr.push("caption");
      }

      this.$refs.container.removeClass(
        arr
        .map(function (i) {
          return "fancybox-show-" + i;
        })
        .join(" ")
      );

      this.hasHiddenControls = true;
    },

    showControls: function () {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.hasHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-caption", !!self.$caption)
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function () {
      if (this.hasHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "{fancybox-version}",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function (command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function (items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function (all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance
        if (all === true) {
          this.close(all);
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function () {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function () {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function ($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function ($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str += " scale(" + props.scaleX + ", " + props.scaleY + ")";
      } else if (props.scaleX !== undefined) {
        str += " scaleX(" + props.scaleX + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function ($el, to, duration, callback, leaveAnimationName) {
      var self = this,
        from;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      self.stop($el);

      from = self.getTranslate($el);

      $el.on(transitionEnd, function (e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        self.stop($el);

        if ($.isNumeric(duration)) {
          $el.css("transition-duration", "");
        }

        if ($.isPlainObject(to)) {
          if (to.scaleX !== undefined && to.scaleY !== undefined) {
            self.setTranslate($el, {
              top: to.top,
              left: to.left,
              width: from.width * to.scaleX,
              height: from.height * to.scaleY,
              scaleX: 1,
              scaleY: 1
            });
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function () {
          $el.trigger(transitionEnd);
        }, duration + 33)
      );
    },

    stop: function ($el, callCallback) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        if (callCallback) {
          $el.trigger(transitionEnd);
        }

        $el.off(transitionEnd).css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value,
      instance;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = opts || {};

    if (e && e.data) {
      opts = mergeOpts(e.data.options, opts);
    }

    $target = opts.$target || $(e.currentTarget).trigger("blur");
    instance = $.fancybox.getInstance();

    if (instance && instance.$trigger && instance.$trigger.is($target)) {
      return;
    }

    if (opts.selector) {
      items = $(opts.selector);
    } else {
      // Get all related items and find index for clicked one
      value = $target.attr("data-fancybox") || "";

      if (value) {
        items = e.data ? e.data.items : [];
        items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
      } else {
        items = [$target];
      }
    }

    index = $(items).index($target);

    // Sometimes current item can not be found
    if (index < 0) {
      index = 0;
    }

    instance = $.fancybox.open(items, opts, index);

    // Save last active element
    instance.$trigger = $target;
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function (options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {
          options: options
        }, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start", {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-fancybox-trigger]", function (e) {
    $('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]')
      .eq($(this).attr("data-fancybox-index") || 0)
      .trigger("click.fb-start", {
        $trigger: $(this)
      });
  });

  // Track focus event for better accessibility styling
  // ==================================================
  (function () {
    var buttonStr = ".fancybox-button",
      focusStr = "fancybox-focus",
      $pressed = null;

    $D.on("mousedown mouseup focus blur", buttonStr, function (e) {
      switch (e.type) {
        case "mousedown":
          $pressed = $(this);
          break;
        case "mouseup":
          $pressed = null;
          break;
        case "focusin":
          $(buttonStr).removeClass(focusStr);

          if (!$(this).is($pressed) && !$(this).is("[disabled]")) {
            $(this).addClass(focusStr);
          }
          break;
        case "focusout":
          $(buttonStr).removeClass(focusStr);
          break;
      }
    });
  })();
})(window, document, jQuery);

/***/ }),

/***/ "./node_modules/@fancyapps/fancybox/src/js/slideshow.js":
/*!**************************************************************!*\
  !*** ./node_modules/@fancyapps/fancybox/src/js/slideshow.js ***!
  \**************************************************************/
/***/ (function() {

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function (document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000,
      progress: true
    }
  });

  var SlideShow = function (instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function () {
      var self = this,
        instance = self.instance,
        opts = instance.group[instance.currIndex].opts.slideShow;

      self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        self.toggle();
      });

      if (instance.group.length < 2 || !opts) {
        self.$button.hide();
      } else if (opts.progress) {
        self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner);
      }
    },

    set: function (force) {
      var self = this,
        instance = self.instance,
        current = instance.current;

      // Check if reached last element
      if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
        if (self.isActive && current.contentType !== "video") {
          if (self.$progress) {
            $.fancybox.animate(self.$progress.show(), {
              scaleX: 1
            }, current.opts.slideShow.speed);
          }

          self.timer = setTimeout(function () {
            if (!instance.current.opts.loop && instance.current.index == instance.group.length - 1) {
              instance.jumpTo(0);
            } else {
              instance.next();
            }
          }, current.opts.slideShow.speed);
        }
      } else {
        self.stop();
        instance.idleSecondsCounter = 0;
        instance.showControls();
      }
    },

    clear: function () {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },

    start: function () {
      var self = this,
        current = self.instance.current;

      if (current) {
        self.$button
          .attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.isActive = true;

        if (current.isComplete) {
          self.set(true);
        }

        self.instance.trigger("onSlideShowChange", true);
      }
    },

    stop: function () {
      var self = this,
        current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;

      self.instance.trigger("onSlideShowChange", false);

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },

    toggle: function () {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function (e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function (e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function (e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function (e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function () {
    var instance = $.fancybox.getInstance(),
      SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, jQuery);

/***/ }),

/***/ "./src/scss/_components/_fancybox.scss":
/*!*********************************************!*\
  !*** ./src/scss/_components/_fancybox.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_fancybox.js":
/*!*****************************************!*\
  !*** ./src/js/_components/_fancybox.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodeModules_fancyapps_fancybox_src_js_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodeModules/@fancyapps/fancybox/src/js/core.js */ "./node_modules/@fancyapps/fancybox/src/js/core.js");
/* harmony import */ var nodeModules_fancyapps_fancybox_src_js_core_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodeModules_fancyapps_fancybox_src_js_core_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nodeModules_fancyapps_fancybox_src_js_slideshow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nodeModules/@fancyapps/fancybox/src/js/slideshow.js */ "./node_modules/@fancyapps/fancybox/src/js/slideshow.js");
/* harmony import */ var nodeModules_fancyapps_fancybox_src_js_slideshow_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nodeModules_fancyapps_fancybox_src_js_slideshow_js__WEBPACK_IMPORTED_MODULE_1__);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***************************************!*\
  !*** ./src/entries/entry-fancybox.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_components_fancybox_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/_components/_fancybox.scss */ "./src/scss/_components/_fancybox.scss");
/* harmony import */ var _js_components_fancybox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/_components/_fancybox.js */ "./src/js/_components/_fancybox.js");
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2xpYnJhcmllcy9mYW5jeWJveC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLElBQUksdUJBQXVCLElBQUksNkVBQTZFO0FBQ25KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx1RkFBdUYsUUFBUTtBQUMvRix3QkFBd0IsS0FBSyxVQUFVLFFBQVE7QUFDL0MsMEVBQTBFLEtBQUs7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLE9BQU87QUFDbkYsdUNBQXVDLFNBQVM7QUFDaEQsMENBQTBDLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBLCtHQUErRyxVQUFVLG9CQUFvQjtBQUM3STtBQUNBO0FBQ0E7QUFDQSwrRkFBK0YsTUFBTTtBQUNyRztBQUNBO0FBQ0E7QUFDQSxrR0FBa0csT0FBTztBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBHQUEwRyxNQUFNO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBLDRHQUE0RyxNQUFNO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSEFBaUgsT0FBTztBQUN4SDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx3QkFBd0I7QUFDeEIsMkdBQTJHO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixPQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RjtBQUN6RjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQztBQUN0RTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjtBQUNyRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFLEtBQUssRUFBRTtBQUNqQyx3QkFBd0IsUUFBUTtBQUNoQyx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELEtBQUs7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOzs7Ozs7Ozs7O0FDaDJHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0dBQW9HLFlBQVk7QUFDaEg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7Ozs7Ozs7Ozs7OztBQzVNRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBd0Q7Ozs7Ozs7VUNBeEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUM0Qzs7QUFFNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvQGZhbmN5YXBwcy9mYW5jeWJveC9zcmMvanMvY29yZS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvQGZhbmN5YXBwcy9mYW5jeWJveC9zcmMvanMvc2xpZGVzaG93LmpzIiwid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL19jb21wb25lbnRzL19mYW5jeWJveC5zY3NzP2IxMWQiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2pzL19jb21wb25lbnRzL19mYW5jeWJveC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvZW50cnktZmFuY3lib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50LCAkLCB1bmRlZmluZWQpIHtcclxuICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgd2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7XHJcbiAgICBpbmZvOiBmdW5jdGlvbiAoc3R1ZmYpIHt9XHJcbiAgfTtcclxuXHJcbiAgLy8gSWYgdGhlcmUncyBubyBqUXVlcnksIGZhbmN5Qm94IGNhbid0IHdvcmtcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBpZiAoISQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIGZhbmN5Qm94IGlzIGFscmVhZHkgaW5pdGlhbGl6ZWRcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGlmICgkLmZuLmZhbmN5Ym94KSB7XHJcbiAgICBjb25zb2xlLmluZm8oXCJmYW5jeUJveCBhbHJlYWR5IGluaXRpYWxpemVkXCIpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIFByaXZhdGUgZGVmYXVsdCBzZXR0aW5nc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAvLyBDbG9zZSBleGlzdGluZyBtb2RhbHNcclxuICAgIC8vIFNldCB0aGlzIHRvIGZhbHNlIGlmIHlvdSBkbyBub3QgbmVlZCB0byBzdGFjayBtdWx0aXBsZSBpbnN0YW5jZXNcclxuICAgIGNsb3NlRXhpc3Rpbmc6IGZhbHNlLFxyXG5cclxuICAgIC8vIEVuYWJsZSBpbmZpbml0ZSBnYWxsZXJ5IG5hdmlnYXRpb25cclxuICAgIGxvb3A6IGZhbHNlLFxyXG5cclxuICAgIC8vIEhvcml6b250YWwgc3BhY2UgYmV0d2VlbiBzbGlkZXNcclxuICAgIGd1dHRlcjogNTAsXHJcblxyXG4gICAgLy8gRW5hYmxlIGtleWJvYXJkIG5hdmlnYXRpb25cclxuICAgIGtleWJvYXJkOiB0cnVlLFxyXG5cclxuICAgIC8vIFNob3VsZCBhbGxvdyBjYXB0aW9uIHRvIG92ZXJsYXAgdGhlIGNvbnRlbnRcclxuICAgIHByZXZlbnRDYXB0aW9uT3ZlcmxhcDogdHJ1ZSxcclxuXHJcbiAgICAvLyBTaG91bGQgZGlzcGxheSBuYXZpZ2F0aW9uIGFycm93cyBhdCB0aGUgc2NyZWVuIGVkZ2VzXHJcbiAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgLy8gU2hvdWxkIGRpc3BsYXkgY291bnRlciBhdCB0aGUgdG9wIGxlZnQgY29ybmVyXHJcbiAgICBpbmZvYmFyOiB0cnVlLFxyXG5cclxuICAgIC8vIFNob3VsZCBkaXNwbGF5IGNsb3NlIGJ1dHRvbiAodXNpbmcgYGJ0blRwbC5zbWFsbEJ0bmAgdGVtcGxhdGUpIG92ZXIgdGhlIGNvbnRlbnRcclxuICAgIC8vIENhbiBiZSB0cnVlLCBmYWxzZSwgXCJhdXRvXCJcclxuICAgIC8vIElmIFwiYXV0b1wiIC0gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgZm9yIFwiaHRtbFwiLCBcImlubGluZVwiIG9yIFwiYWpheFwiIGl0ZW1zXHJcbiAgICBzbWFsbEJ0bjogXCJhdXRvXCIsXHJcblxyXG4gICAgLy8gU2hvdWxkIGRpc3BsYXkgdG9vbGJhciAoYnV0dG9ucyBhdCB0aGUgdG9wKVxyXG4gICAgLy8gQ2FuIGJlIHRydWUsIGZhbHNlLCBcImF1dG9cIlxyXG4gICAgLy8gSWYgXCJhdXRvXCIgLSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgaGlkZGVuIGlmIFwic21hbGxCdG5cIiBpcyBlbmFibGVkXHJcbiAgICB0b29sYmFyOiBcImF1dG9cIixcclxuXHJcbiAgICAvLyBXaGF0IGJ1dHRvbnMgc2hvdWxkIGFwcGVhciBpbiB0aGUgdG9wIHJpZ2h0IGNvcm5lci5cclxuICAgIC8vIEJ1dHRvbnMgd2lsbCBiZSBjcmVhdGVkIHVzaW5nIHRlbXBsYXRlcyBmcm9tIGBidG5UcGxgIG9wdGlvblxyXG4gICAgLy8gYW5kIHRoZXkgd2lsbCBiZSBwbGFjZWQgaW50byB0b29sYmFyIChjbGFzcz1cImZhbmN5Ym94LXRvb2xiYXJcImAgZWxlbWVudClcclxuICAgIGJ1dHRvbnM6IFtcclxuICAgICAgXCJ6b29tXCIsXHJcbiAgICAgIC8vXCJzaGFyZVwiLFxyXG4gICAgICBcInNsaWRlU2hvd1wiLFxyXG4gICAgICAvL1wiZnVsbFNjcmVlblwiLFxyXG4gICAgICAvL1wiZG93bmxvYWRcIixcclxuICAgICAgXCJ0aHVtYnNcIixcclxuICAgICAgXCJjbG9zZVwiXHJcbiAgICBdLFxyXG5cclxuICAgIC8vIERldGVjdCBcImlkbGVcIiB0aW1lIGluIHNlY29uZHNcclxuICAgIGlkbGVUaW1lOiAzLFxyXG5cclxuICAgIC8vIERpc2FibGUgcmlnaHQtY2xpY2sgYW5kIHVzZSBzaW1wbGUgaW1hZ2UgcHJvdGVjdGlvbiBmb3IgaW1hZ2VzXHJcbiAgICBwcm90ZWN0OiBmYWxzZSxcclxuXHJcbiAgICAvLyBTaG9ydGN1dCB0byBtYWtlIGNvbnRlbnQgXCJtb2RhbFwiIC0gZGlzYWJsZSBrZXlib2FyZCBuYXZpZ3Rpb24sIGhpZGUgYnV0dG9ucywgZXRjXHJcbiAgICBtb2RhbDogZmFsc2UsXHJcblxyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgLy8gV2FpdCBmb3IgaW1hZ2VzIHRvIGxvYWQgYmVmb3JlIGRpc3BsYXlpbmdcclxuICAgICAgLy8gICB0cnVlICAtIHdhaXQgZm9yIGltYWdlIHRvIGxvYWQgYW5kIHRoZW4gZGlzcGxheTtcclxuICAgICAgLy8gICBmYWxzZSAtIGRpc3BsYXkgdGh1bWJuYWlsIGFuZCBsb2FkIHRoZSBmdWxsLXNpemVkIGltYWdlIG92ZXIgdG9wLFxyXG4gICAgICAvLyAgICAgICAgICAgcmVxdWlyZXMgcHJlZGVmaW5lZCBpbWFnZSBkaW1lbnNpb25zIChgZGF0YS13aWR0aGAgYW5kIGBkYXRhLWhlaWdodGAgYXR0cmlidXRlcylcclxuICAgICAgcHJlbG9hZDogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgYWpheDoge1xyXG4gICAgICAvLyBPYmplY3QgY29udGFpbmluZyBzZXR0aW5ncyBmb3IgYWpheCByZXF1ZXN0XHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgLy8gVGhpcyBoZWxwcyB0byBpbmRpY2F0ZSB0aGF0IHJlcXVlc3QgY29tZXMgZnJvbSB0aGUgbW9kYWxcclxuICAgICAgICAvLyBGZWVsIGZyZWUgdG8gY2hhbmdlIG5hbWluZ1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGZhbmN5Ym94OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlmcmFtZToge1xyXG4gICAgICAvLyBJZnJhbWUgdGVtcGxhdGVcclxuICAgICAgdHBsOiAnPGlmcmFtZSBpZD1cImZhbmN5Ym94LWZyYW1le3JuZH1cIiBuYW1lPVwiZmFuY3lib3gtZnJhbWV7cm5kfVwiIGNsYXNzPVwiZmFuY3lib3gtaWZyYW1lXCIgYWxsb3dmdWxsc2NyZWVuPVwiYWxsb3dmdWxsc2NyZWVuXCIgYWxsb3c9XCJhdXRvcGxheTsgZnVsbHNjcmVlblwiIHNyYz1cIlwiPjwvaWZyYW1lPicsXHJcblxyXG4gICAgICAvLyBQcmVsb2FkIGlmcmFtZSBiZWZvcmUgZGlzcGxheWluZyBpdFxyXG4gICAgICAvLyBUaGlzIGFsbG93cyB0byBjYWxjdWxhdGUgaWZyYW1lIGNvbnRlbnQgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICAvLyAobm90ZTogRHVlIHRvIFwiU2FtZSBPcmlnaW4gUG9saWN5XCIsIHlvdSBjYW4ndCBnZXQgY3Jvc3MgZG9tYWluIGRhdGEpLlxyXG4gICAgICBwcmVsb2FkOiB0cnVlLFxyXG5cclxuICAgICAgLy8gQ3VzdG9tIENTUyBzdHlsaW5nIGZvciBpZnJhbWUgd3JhcHBpbmcgZWxlbWVudFxyXG4gICAgICAvLyBZb3UgY2FuIHVzZSB0aGlzIHRvIHNldCBjdXN0b20gaWZyYW1lIGRpbWVuc2lvbnNcclxuICAgICAgY3NzOiB7fSxcclxuXHJcbiAgICAgIC8vIElmcmFtZSB0YWcgYXR0cmlidXRlc1xyXG4gICAgICBhdHRyOiB7XHJcbiAgICAgICAgc2Nyb2xsaW5nOiBcImF1dG9cIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEZvciBIVE1MNSB2aWRlbyBvbmx5XHJcbiAgICB2aWRlbzoge1xyXG4gICAgICB0cGw6ICc8dmlkZW8gY2xhc3M9XCJmYW5jeWJveC12aWRlb1wiIGNvbnRyb2xzIGNvbnRyb2xzTGlzdD1cIm5vZG93bmxvYWRcIiBwb3N0ZXI9XCJ7e3Bvc3Rlcn19XCI+JyArXHJcbiAgICAgICAgJzxzb3VyY2Ugc3JjPVwie3tzcmN9fVwiIHR5cGU9XCJ7e2Zvcm1hdH19XCIgLz4nICtcclxuICAgICAgICAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhIGhyZWY9XCJ7e3NyY319XCI+ZG93bmxvYWQ8L2E+IGFuZCB3YXRjaCB3aXRoIHlvdXIgZmF2b3JpdGUgdmlkZW8gcGxheWVyIScgK1xyXG4gICAgICAgIFwiPC92aWRlbz5cIixcclxuICAgICAgZm9ybWF0OiBcIlwiLCAvLyBjdXN0b20gdmlkZW8gZm9ybWF0XHJcbiAgICAgIGF1dG9TdGFydDogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBEZWZhdWx0IGNvbnRlbnQgdHlwZSBpZiBjYW5ub3QgYmUgZGV0ZWN0ZWQgYXV0b21hdGljYWxseVxyXG4gICAgZGVmYXVsdFR5cGU6IFwiaW1hZ2VcIixcclxuXHJcbiAgICAvLyBPcGVuL2Nsb3NlIGFuaW1hdGlvbiB0eXBlXHJcbiAgICAvLyBQb3NzaWJsZSB2YWx1ZXM6XHJcbiAgICAvLyAgIGZhbHNlICAgICAgICAgICAgLSBkaXNhYmxlXHJcbiAgICAvLyAgIFwiem9vbVwiICAgICAgICAgICAtIHpvb20gaW1hZ2VzIGZyb20vdG8gdGh1bWJuYWlsXHJcbiAgICAvLyAgIFwiZmFkZVwiXHJcbiAgICAvLyAgIFwiem9vbS1pbi1vdXRcIlxyXG4gICAgLy9cclxuICAgIGFuaW1hdGlvbkVmZmVjdDogXCJ6b29tXCIsXHJcblxyXG4gICAgLy8gRHVyYXRpb24gaW4gbXMgZm9yIG9wZW4vY2xvc2UgYW5pbWF0aW9uXHJcbiAgICBhbmltYXRpb25EdXJhdGlvbjogMzY2LFxyXG5cclxuICAgIC8vIFNob3VsZCBpbWFnZSBjaGFuZ2Ugb3BhY2l0eSB3aGlsZSB6b29taW5nXHJcbiAgICAvLyBJZiBvcGFjaXR5IGlzIFwiYXV0b1wiLCB0aGVuIG9wYWNpdHkgd2lsbCBiZSBjaGFuZ2VkIGlmIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgYXNwZWN0IHJhdGlvc1xyXG4gICAgem9vbU9wYWNpdHk6IFwiYXV0b1wiLFxyXG5cclxuICAgIC8vIFRyYW5zaXRpb24gZWZmZWN0IGJldHdlZW4gc2xpZGVzXHJcbiAgICAvL1xyXG4gICAgLy8gUG9zc2libGUgdmFsdWVzOlxyXG4gICAgLy8gICBmYWxzZSAgICAgICAgICAgIC0gZGlzYWJsZVxyXG4gICAgLy8gICBcImZhZGUnXHJcbiAgICAvLyAgIFwic2xpZGUnXHJcbiAgICAvLyAgIFwiY2lyY3VsYXInXHJcbiAgICAvLyAgIFwidHViZSdcclxuICAgIC8vICAgXCJ6b29tLWluLW91dCdcclxuICAgIC8vICAgXCJyb3RhdGUnXHJcbiAgICAvL1xyXG4gICAgdHJhbnNpdGlvbkVmZmVjdDogXCJmYWRlXCIsXHJcblxyXG4gICAgLy8gRHVyYXRpb24gaW4gbXMgZm9yIHRyYW5zaXRpb24gYW5pbWF0aW9uXHJcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IDM2NixcclxuXHJcbiAgICAvLyBDdXN0b20gQ1NTIGNsYXNzIGZvciBzbGlkZSBlbGVtZW50XHJcbiAgICBzbGlkZUNsYXNzOiBcIlwiLFxyXG5cclxuICAgIC8vIEN1c3RvbSBDU1MgY2xhc3MgZm9yIGxheW91dFxyXG4gICAgYmFzZUNsYXNzOiBcIlwiLFxyXG5cclxuICAgIC8vIEJhc2UgdGVtcGxhdGUgZm9yIGxheW91dFxyXG4gICAgYmFzZVRwbDogJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1jb250YWluZXJcIiByb2xlPVwiZGlhbG9nXCIgdGFiaW5kZXg9XCItMVwiPicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LWJnXCI+PC9kaXY+JyArXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtaW5uZXJcIj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1pbmZvYmFyXCI+PHNwYW4gZGF0YS1mYW5jeWJveC1pbmRleD48L3NwYW4+Jm5ic3A7LyZuYnNwOzxzcGFuIGRhdGEtZmFuY3lib3gtY291bnQ+PC9zcGFuPjwvZGl2PicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LXRvb2xiYXJcIj57e2J1dHRvbnN9fTwvZGl2PicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LW5hdmlnYXRpb25cIj57e2Fycm93c319PC9kaXY+JyArXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtc3RhZ2VcIj48L2Rpdj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1jYXB0aW9uXCI+PGRpdiBjbGFzcz1cImZhbmN5Ym94LWNhcHRpb25fX2JvZHlcIj48L2Rpdj48L2Rpdj4nICtcclxuICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgIFwiPC9kaXY+XCIsXHJcblxyXG4gICAgLy8gTG9hZGluZyBpbmRpY2F0b3IgdGVtcGxhdGVcclxuICAgIHNwaW5uZXJUcGw6ICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtbG9hZGluZ1wiPjwvZGl2PicsXHJcblxyXG4gICAgLy8gRXJyb3IgbWVzc2FnZSB0ZW1wbGF0ZVxyXG4gICAgZXJyb3JUcGw6ICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtZXJyb3JcIj48cD57e0VSUk9SfX08L3A+PC9kaXY+JyxcclxuXHJcbiAgICBidG5UcGw6IHtcclxuICAgICAgZG93bmxvYWQ6ICc8YSBkb3dubG9hZCBkYXRhLWZhbmN5Ym94LWRvd25sb2FkIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tZG93bmxvYWRcIiB0aXRsZT1cInt7RE9XTkxPQUR9fVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj4nICtcclxuICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTguNjIgMTcuMDlWMTlINS4zOHYtMS45MXptLTIuOTctNi45NkwxNyAxMS40NWwtNSA0Ljg3LTUtNC44NyAxLjM2LTEuMzIgMi42OCAyLjY0VjVoMS45MnY3Ljc3elwiLz48L3N2Zz4nICtcclxuICAgICAgICBcIjwvYT5cIixcclxuXHJcbiAgICAgIHpvb206ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtem9vbSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLXpvb21cIiB0aXRsZT1cInt7Wk9PTX19XCI+JyArXHJcbiAgICAgICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE4LjcgMTcuM2wtMy0zYTUuOSA1LjkgMCAwIDAtLjYtNy42IDUuOSA1LjkgMCAwIDAtOC40IDAgNS45IDUuOSAwIDAgMCAwIDguNCA1LjkgNS45IDAgMCAwIDcuNy43bDMgM2ExIDEgMCAwIDAgMS4zIDBjLjQtLjUuNC0xIDAtMS41ek04LjEgMTMuOGE0IDQgMCAwIDEgMC01LjcgNCA0IDAgMCAxIDUuNyAwIDQgNCAwIDAgMSAwIDUuNyA0IDQgMCAwIDEtNS43IDB6XCIvPjwvc3ZnPicgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCIsXHJcblxyXG4gICAgICBjbG9zZTogJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLWNsb3NlXCIgdGl0bGU9XCJ7e0NMT1NFfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTIgMTAuNkw2LjYgNS4yIDUuMiA2LjZsNS40IDUuNC01LjQgNS40IDEuNCAxLjQgNS40LTUuNCA1LjQgNS40IDEuNC0xLjQtNS40LTUuNCA1LjQtNS40LTEuNC0xLjQtNS40IDUuNHpcIi8+PC9zdmc+JyArXHJcbiAgICAgICAgXCI8L2J1dHRvbj5cIixcclxuXHJcbiAgICAgIC8vIEFycm93c1xyXG4gICAgICBhcnJvd0xlZnQ6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtcHJldiBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLWFycm93X2xlZnRcIiB0aXRsZT1cInt7UFJFVn19XCI+JyArXHJcbiAgICAgICAgJzxkaXY+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTEuMjggMTUuN2wtMS4zNCAxLjM3TDUgMTJsNC45NC01LjA3IDEuMzQgMS4zOC0yLjY4IDIuNzJIMTl2MS45NEg4LjZ6XCIvPjwvc3ZnPjwvZGl2PicgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCIsXHJcblxyXG4gICAgICBhcnJvd1JpZ2h0OiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LW5leHQgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1hcnJvd19yaWdodFwiIHRpdGxlPVwie3tORVhUfX1cIj4nICtcclxuICAgICAgICAnPGRpdj48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xNS40IDEyLjk3bC0yLjY4IDIuNzIgMS4zNCAxLjM4TDE5IDEybC00Ljk0LTUuMDctMS4zNCAxLjM4IDIuNjggMi43Mkg1djEuOTR6XCIvPjwvc3ZnPjwvZGl2PicgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCIsXHJcblxyXG4gICAgICAvLyBUaGlzIHNtYWxsIGNsb3NlIGJ1dHRvbiB3aWxsIGJlIGFwcGVuZGVkIHRvIHlvdXIgaHRtbC9pbmxpbmUvYWpheCBjb250ZW50IGJ5IGRlZmF1bHQsXHJcbiAgICAgIC8vIGlmIFwic21hbGxCdG5cIiBvcHRpb24gaXMgbm90IHNldCB0byBmYWxzZVxyXG4gICAgICBzbWFsbEJ0bjogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtY2xvc2Utc21hbGxcIiB0aXRsZT1cInt7Q0xPU0V9fVwiPicgK1xyXG4gICAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEzIDEybDUtNS0xLTEtNSA1LTUtNS0xIDEgNSA1LTUgNSAxIDEgNS01IDUgNSAxLTF6XCIvPjwvc3ZnPicgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCJcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ29udGFpbmVyIGlzIGluamVjdGVkIGludG8gdGhpcyBlbGVtZW50XHJcbiAgICBwYXJlbnRFbDogXCJib2R5XCIsXHJcblxyXG4gICAgLy8gSGlkZSBicm93c2VyIHZlcnRpY2FsIHNjcm9sbGJhcnM7IHVzZSBhdCB5b3VyIG93biByaXNrXHJcbiAgICBoaWRlU2Nyb2xsYmFyOiB0cnVlLFxyXG5cclxuICAgIC8vIEZvY3VzIGhhbmRsaW5nXHJcbiAgICAvLyA9PT09PT09PT09PT09PVxyXG5cclxuICAgIC8vIFRyeSB0byBmb2N1cyBvbiB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgYWZ0ZXIgb3BlbmluZ1xyXG4gICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG5cclxuICAgIC8vIFB1dCBmb2N1cyBiYWNrIHRvIGFjdGl2ZSBlbGVtZW50IGFmdGVyIGNsb3NpbmdcclxuICAgIGJhY2tGb2N1czogdHJ1ZSxcclxuXHJcbiAgICAvLyBEbyBub3QgbGV0IHVzZXIgdG8gZm9jdXMgb24gZWxlbWVudCBvdXRzaWRlIG1vZGFsIGNvbnRlbnRcclxuICAgIHRyYXBGb2N1czogdHJ1ZSxcclxuXHJcbiAgICAvLyBNb2R1bGUgc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBmdWxsU2NyZWVuOiB7XHJcbiAgICAgIGF1dG9TdGFydDogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU2V0IGB0b3VjaDogZmFsc2VgIHRvIGRpc2FibGUgcGFubmluZy9zd2lwaW5nXHJcbiAgICB0b3VjaDoge1xyXG4gICAgICB2ZXJ0aWNhbDogdHJ1ZSwgLy8gQWxsb3cgdG8gZHJhZyBjb250ZW50IHZlcnRpY2FsbHlcclxuICAgICAgbW9tZW50dW06IHRydWUgLy8gQ29udGludWUgbW92ZW1lbnQgYWZ0ZXIgcmVsZWFzaW5nIG1vdXNlL3RvdWNoIHdoZW4gcGFubmluZ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBIYXNoIHZhbHVlIHdoZW4gaW5pdGlhbGl6aW5nIG1hbnVhbGx5LFxyXG4gICAgLy8gc2V0IGBmYWxzZWAgdG8gZGlzYWJsZSBoYXNoIGNoYW5nZVxyXG4gICAgaGFzaDogbnVsbCxcclxuXHJcbiAgICAvLyBDdXN0b21pemUgb3IgYWRkIG5ldyBtZWRpYSB0eXBlc1xyXG4gICAgLy8gRXhhbXBsZTpcclxuICAgIC8qXHJcbiAgICAgIG1lZGlhIDoge1xyXG4gICAgICAgIHlvdXR1YmUgOiB7XHJcbiAgICAgICAgICBwYXJhbXMgOiB7XHJcbiAgICAgICAgICAgIGF1dG9wbGF5IDogMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKi9cclxuICAgIG1lZGlhOiB7fSxcclxuXHJcbiAgICBzbGlkZVNob3c6IHtcclxuICAgICAgYXV0b1N0YXJ0OiBmYWxzZSxcclxuICAgICAgc3BlZWQ6IDMwMDBcclxuICAgIH0sXHJcblxyXG4gICAgdGh1bWJzOiB7XHJcbiAgICAgIGF1dG9TdGFydDogZmFsc2UsIC8vIERpc3BsYXkgdGh1bWJuYWlscyBvbiBvcGVuaW5nXHJcbiAgICAgIGhpZGVPbkNsb3NlOiB0cnVlLCAvLyBIaWRlIHRodW1ibmFpbCBncmlkIHdoZW4gY2xvc2luZyBhbmltYXRpb24gc3RhcnRzXHJcbiAgICAgIHBhcmVudEVsOiBcIi5mYW5jeWJveC1jb250YWluZXJcIiwgLy8gQ29udGFpbmVyIGlzIGluamVjdGVkIGludG8gdGhpcyBlbGVtZW50XHJcbiAgICAgIGF4aXM6IFwieVwiIC8vIFZlcnRpY2FsICh5KSBvciBob3Jpem9udGFsICh4KSBzY3JvbGxpbmdcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXNlIG1vdXNld2hlZWwgdG8gbmF2aWdhdGUgZ2FsbGVyeVxyXG4gICAgLy8gSWYgJ2F1dG8nIC0gZW5hYmxlZCBmb3IgaW1hZ2VzIG9ubHlcclxuICAgIHdoZWVsOiBcImF1dG9cIixcclxuXHJcbiAgICAvLyBDYWxsYmFja3NcclxuICAgIC8vPT09PT09PT09PVxyXG5cclxuICAgIC8vIFNlZSBEb2N1bWVudGF0aW9uL0FQSS9FdmVudHMgZm9yIG1vcmUgaW5mb3JtYXRpb25cclxuICAgIC8vIEV4YW1wbGU6XHJcbiAgICAvKlxyXG4gICAgICBhZnRlclNob3c6IGZ1bmN0aW9uKCBpbnN0YW5jZSwgY3VycmVudCApIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oICdDbGlja2VkIGVsZW1lbnQ6JyApO1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbyggY3VycmVudC5vcHRzLiRvcmlnICk7XHJcbiAgICAgIH1cclxuICAgICovXHJcblxyXG4gICAgb25Jbml0OiAkLm5vb3AsIC8vIFdoZW4gaW5zdGFuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcclxuXHJcbiAgICBiZWZvcmVMb2FkOiAkLm5vb3AsIC8vIEJlZm9yZSB0aGUgY29udGVudCBvZiBhIHNsaWRlIGlzIGJlaW5nIGxvYWRlZFxyXG4gICAgYWZ0ZXJMb2FkOiAkLm5vb3AsIC8vIFdoZW4gdGhlIGNvbnRlbnQgb2YgYSBzbGlkZSBpcyBkb25lIGxvYWRpbmdcclxuXHJcbiAgICBiZWZvcmVTaG93OiAkLm5vb3AsIC8vIEJlZm9yZSBvcGVuIGFuaW1hdGlvbiBzdGFydHNcclxuICAgIGFmdGVyU2hvdzogJC5ub29wLCAvLyBXaGVuIGNvbnRlbnQgaXMgZG9uZSBsb2FkaW5nIGFuZCBhbmltYXRpbmdcclxuXHJcbiAgICBiZWZvcmVDbG9zZTogJC5ub29wLCAvLyBCZWZvcmUgdGhlIGluc3RhbmNlIGF0dGVtcHRzIHRvIGNsb3NlLiBSZXR1cm4gZmFsc2UgdG8gY2FuY2VsIHRoZSBjbG9zZS5cclxuICAgIGFmdGVyQ2xvc2U6ICQubm9vcCwgLy8gQWZ0ZXIgaW5zdGFuY2UgaGFzIGJlZW4gY2xvc2VkXHJcblxyXG4gICAgb25BY3RpdmF0ZTogJC5ub29wLCAvLyBXaGVuIGluc3RhbmNlIGlzIGJyb3VnaHQgdG8gZnJvbnRcclxuICAgIG9uRGVhY3RpdmF0ZTogJC5ub29wLCAvLyBXaGVuIG90aGVyIGluc3RhbmNlIGhhcyBiZWVuIGFjdGl2YXRlZFxyXG5cclxuICAgIC8vIEludGVyYWN0aW9uXHJcbiAgICAvLyA9PT09PT09PT09PVxyXG5cclxuICAgIC8vIFVzZSBvcHRpb25zIGJlbG93IHRvIGN1c3RvbWl6ZSB0YWtlbiBhY3Rpb24gd2hlbiB1c2VyIGNsaWNrcyBvciBkb3VibGUgY2xpY2tzIG9uIHRoZSBmYW5jeUJveCBhcmVhLFxyXG4gICAgLy8gZWFjaCBvcHRpb24gY2FuIGJlIHN0cmluZyBvciBtZXRob2QgdGhhdCByZXR1cm5zIHZhbHVlLlxyXG4gICAgLy9cclxuICAgIC8vIFBvc3NpYmxlIHZhbHVlczpcclxuICAgIC8vICAgXCJjbG9zZVwiICAgICAgICAgICAtIGNsb3NlIGluc3RhbmNlXHJcbiAgICAvLyAgIFwibmV4dFwiICAgICAgICAgICAgLSBtb3ZlIHRvIG5leHQgZ2FsbGVyeSBpdGVtXHJcbiAgICAvLyAgIFwibmV4dE9yQ2xvc2VcIiAgICAgLSBtb3ZlIHRvIG5leHQgZ2FsbGVyeSBpdGVtIG9yIGNsb3NlIGlmIGdhbGxlcnkgaGFzIG9ubHkgb25lIGl0ZW1cclxuICAgIC8vICAgXCJ0b2dnbGVDb250cm9sc1wiICAtIHNob3cvaGlkZSBjb250cm9sc1xyXG4gICAgLy8gICBcInpvb21cIiAgICAgICAgICAgIC0gem9vbSBpbWFnZSAoaWYgbG9hZGVkKVxyXG4gICAgLy8gICBmYWxzZSAgICAgICAgICAgICAtIGRvIG5vdGhpbmdcclxuXHJcbiAgICAvLyBDbGlja2VkIG9uIHRoZSBjb250ZW50XHJcbiAgICBjbGlja0NvbnRlbnQ6IGZ1bmN0aW9uIChjdXJyZW50LCBldmVudCkge1xyXG4gICAgICByZXR1cm4gY3VycmVudC50eXBlID09PSBcImltYWdlXCIgPyBcInpvb21cIiA6IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDbGlja2VkIG9uIHRoZSBzbGlkZVxyXG4gICAgY2xpY2tTbGlkZTogXCJjbG9zZVwiLFxyXG5cclxuICAgIC8vIENsaWNrZWQgb24gdGhlIGJhY2tncm91bmQgKGJhY2tkcm9wKSBlbGVtZW50O1xyXG4gICAgLy8gaWYgeW91IGhhdmUgbm90IGNoYW5nZWQgdGhlIGxheW91dCwgdGhlbiBtb3N0IGxpa2VseSB5b3UgbmVlZCB0byB1c2UgYGNsaWNrU2xpZGVgIG9wdGlvblxyXG4gICAgY2xpY2tPdXRzaWRlOiBcImNsb3NlXCIsXHJcblxyXG4gICAgLy8gU2FtZSBhcyBwcmV2aW91cyB0d28sIGJ1dCBmb3IgZG91YmxlIGNsaWNrXHJcbiAgICBkYmxjbGlja0NvbnRlbnQ6IGZhbHNlLFxyXG4gICAgZGJsY2xpY2tTbGlkZTogZmFsc2UsXHJcbiAgICBkYmxjbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgIC8vIEN1c3RvbSBvcHRpb25zIHdoZW4gbW9iaWxlIGRldmljZSBpcyBkZXRlY3RlZFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgbW9iaWxlOiB7XHJcbiAgICAgIHByZXZlbnRDYXB0aW9uT3ZlcmxhcDogZmFsc2UsXHJcbiAgICAgIGlkbGVUaW1lOiBmYWxzZSxcclxuICAgICAgY2xpY2tDb250ZW50OiBmdW5jdGlvbiAoY3VycmVudCwgZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudC50eXBlID09PSBcImltYWdlXCIgPyBcInRvZ2dsZUNvbnRyb2xzXCIgOiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgY2xpY2tTbGlkZTogZnVuY3Rpb24gKGN1cnJlbnQsIGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiID8gXCJ0b2dnbGVDb250cm9sc1wiIDogXCJjbG9zZVwiO1xyXG4gICAgICB9LFxyXG4gICAgICBkYmxjbGlja0NvbnRlbnQ6IGZ1bmN0aW9uIChjdXJyZW50LCBldmVudCkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiA/IFwiem9vbVwiIDogZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRibGNsaWNrU2xpZGU6IGZ1bmN0aW9uIChjdXJyZW50LCBldmVudCkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiA/IFwiem9vbVwiIDogZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSW50ZXJuYXRpb25hbGl6YXRpb25cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgbGFuZzogXCJlblwiLFxyXG4gICAgaTE4bjoge1xyXG4gICAgICBlbjoge1xyXG4gICAgICAgIENMT1NFOiBcIkNsb3NlXCIsXHJcbiAgICAgICAgTkVYVDogXCJOZXh0XCIsXHJcbiAgICAgICAgUFJFVjogXCJQcmV2aW91c1wiLFxyXG4gICAgICAgIEVSUk9SOiBcIlRoZSByZXF1ZXN0ZWQgY29udGVudCBjYW5ub3QgYmUgbG9hZGVkLiA8YnIvPiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiLFxyXG4gICAgICAgIFBMQVlfU1RBUlQ6IFwiU3RhcnQgc2xpZGVzaG93XCIsXHJcbiAgICAgICAgUExBWV9TVE9QOiBcIlBhdXNlIHNsaWRlc2hvd1wiLFxyXG4gICAgICAgIEZVTExfU0NSRUVOOiBcIkZ1bGwgc2NyZWVuXCIsXHJcbiAgICAgICAgVEhVTUJTOiBcIlRodW1ibmFpbHNcIixcclxuICAgICAgICBET1dOTE9BRDogXCJEb3dubG9hZFwiLFxyXG4gICAgICAgIFNIQVJFOiBcIlNoYXJlXCIsXHJcbiAgICAgICAgWk9PTTogXCJab29tXCJcclxuICAgICAgfSxcclxuICAgICAgZGU6IHtcclxuICAgICAgICBDTE9TRTogXCJTY2hsaWUmc3psaWc7ZW5cIixcclxuICAgICAgICBORVhUOiBcIldlaXRlclwiLFxyXG4gICAgICAgIFBSRVY6IFwiWnVyJnV1bWw7Y2tcIixcclxuICAgICAgICBFUlJPUjogXCJEaWUgYW5nZWZvcmRlcnRlbiBEYXRlbiBrb25udGVuIG5pY2h0IGdlbGFkZW4gd2VyZGVuLiA8YnIvPiBCaXR0ZSB2ZXJzdWNoZW4gU2llIGVzIHNwJmF1bWw7dGVyIG5vY2htYWwuXCIsXHJcbiAgICAgICAgUExBWV9TVEFSVDogXCJEaWFzY2hhdSBzdGFydGVuXCIsXHJcbiAgICAgICAgUExBWV9TVE9QOiBcIkRpYXNjaGF1IGJlZW5kZW5cIixcclxuICAgICAgICBGVUxMX1NDUkVFTjogXCJWb2xsYmlsZFwiLFxyXG4gICAgICAgIFRIVU1CUzogXCJWb3JzY2hhdWJpbGRlclwiLFxyXG4gICAgICAgIERPV05MT0FEOiBcIkhlcnVudGVybGFkZW5cIixcclxuICAgICAgICBTSEFSRTogXCJUZWlsZW5cIixcclxuICAgICAgICBaT09NOiBcIlZlcmdyJm91bWw7JnN6bGlnO2VyblwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBGZXcgdXNlZnVsIHZhcmlhYmxlcyBhbmQgbWV0aG9kc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIHZhciAkVyA9ICQod2luZG93KTtcclxuICB2YXIgJEQgPSAkKGRvY3VtZW50KTtcclxuXHJcbiAgdmFyIGNhbGxlZCA9IDA7XHJcblxyXG4gIC8vIENoZWNrIGlmIGFuIG9iamVjdCBpcyBhIGpRdWVyeSBvYmplY3QgYW5kIG5vdCBhIG5hdGl2ZSBKYXZhU2NyaXB0IG9iamVjdFxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIHZhciBpc1F1ZXJ5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkgJiYgb2JqIGluc3RhbmNlb2YgJDtcclxuICB9O1xyXG5cclxuICAvLyBIYW5kbGUgbXVsdGlwbGUgYnJvd3NlcnMgZm9yIFwicmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIgYW5kIFwiY2FuY2VsQW5pbWF0aW9uRnJhbWVcIlxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgcmVxdWVzdEFGcmFtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAvLyBpZiBhbGwgZWxzZSBmYWlscywgdXNlIHNldFRpbWVvdXRcclxuICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBjYW5jZWxBRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgd2luZG93Lm9DYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9KSgpO1xyXG5cclxuICAvLyBEZXRlY3QgdGhlIHN1cHBvcnRlZCB0cmFuc2l0aW9uLWVuZCBldmVudCBwcm9wZXJ0eSBuYW1lXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIHZhciB0cmFuc2l0aW9uRW5kID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKSxcclxuICAgICAgdDtcclxuXHJcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgIHRyYW5zaXRpb246IFwidHJhbnNpdGlvbmVuZFwiLFxyXG4gICAgICBPVHJhbnNpdGlvbjogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG4gICAgICBNb3pUcmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuICAgIH07XHJcblxyXG4gICAgZm9yICh0IGluIHRyYW5zaXRpb25zKSB7XHJcbiAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwidHJhbnNpdGlvbmVuZFwiO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIEZvcmNlIHJlZHJhdyBvbiBhbiBlbGVtZW50LlxyXG4gIC8vIFRoaXMgaGVscHMgaW4gY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIgZG9lc24ndCByZWRyYXcgYW4gdXBkYXRlZCBlbGVtZW50IHByb3Blcmx5XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgZm9yY2VSZWRyYXcgPSBmdW5jdGlvbiAoJGVsKSB7XHJcbiAgICByZXR1cm4gJGVsICYmICRlbC5sZW5ndGggJiYgJGVsWzBdLm9mZnNldEhlaWdodDtcclxuICB9O1xyXG5cclxuICAvLyBFeGNsdWRlIGFycmF5IChgYnV0dG9uc2ApIG9wdGlvbnMgZnJvbSBkZWVwIG1lcmdpbmdcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgbWVyZ2VPcHRzID0gZnVuY3Rpb24gKG9wdHMxLCBvcHRzMikge1xyXG4gICAgdmFyIHJleiA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRzMSwgb3B0czIpO1xyXG5cclxuICAgICQuZWFjaChvcHRzMiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgaWYgKCQuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICByZXpba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmV6O1xyXG4gIH07XHJcblxyXG4gIC8vIEhvdyBtdWNoIG9mIGFuIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiB2aWV3cG9ydFxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICB2YXIgaW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICB2YXIgZWxlbUNlbnRlciwgcmV6O1xyXG5cclxuICAgIGlmICghZWxlbSB8fCBlbGVtLm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiLmZhbmN5Ym94LWNvbnRhaW5lclwiKS5jc3MoXCJwb2ludGVyLWV2ZW50c1wiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgZWxlbUNlbnRlciA9IHtcclxuICAgICAgeDogZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZWxlbS5vZmZzZXRXaWR0aCAvIDIsXHJcbiAgICAgIHk6IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZWxlbS5vZmZzZXRIZWlnaHQgLyAyXHJcbiAgICB9O1xyXG5cclxuICAgIHJleiA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZWxlbUNlbnRlci54LCBlbGVtQ2VudGVyLnkpID09PSBlbGVtO1xyXG5cclxuICAgICQoXCIuZmFuY3lib3gtY29udGFpbmVyXCIpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsIFwiXCIpO1xyXG5cclxuICAgIHJldHVybiByZXo7XHJcbiAgfTtcclxuXHJcbiAgLy8gQ2xhc3MgZGVmaW5pdGlvblxyXG4gIC8vID09PT09PT09PT09PT09PT1cclxuXHJcbiAgdmFyIEZhbmN5Qm94ID0gZnVuY3Rpb24gKGNvbnRlbnQsIG9wdHMsIGluZGV4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgc2VsZi5vcHRzID0gbWVyZ2VPcHRzKHtcclxuICAgICAgaW5kZXg6IGluZGV4XHJcbiAgICB9LCAkLmZhbmN5Ym94LmRlZmF1bHRzKTtcclxuXHJcbiAgICBpZiAoJC5pc1BsYWluT2JqZWN0KG9wdHMpKSB7XHJcbiAgICAgIHNlbGYub3B0cyA9IG1lcmdlT3B0cyhzZWxmLm9wdHMsIG9wdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkLmZhbmN5Ym94LmlzTW9iaWxlKSB7XHJcbiAgICAgIHNlbGYub3B0cyA9IG1lcmdlT3B0cyhzZWxmLm9wdHMsIHNlbGYub3B0cy5tb2JpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuaWQgPSBzZWxmLm9wdHMuaWQgfHwgKytjYWxsZWQ7XHJcblxyXG4gICAgc2VsZi5jdXJySW5kZXggPSBwYXJzZUludChzZWxmLm9wdHMuaW5kZXgsIDEwKSB8fCAwO1xyXG4gICAgc2VsZi5wcmV2SW5kZXggPSBudWxsO1xyXG5cclxuICAgIHNlbGYucHJldlBvcyA9IG51bGw7XHJcbiAgICBzZWxmLmN1cnJQb3MgPSAwO1xyXG5cclxuICAgIHNlbGYuZmlyc3RSdW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIEFsbCBncm91cCBpdGVtc1xyXG4gICAgc2VsZi5ncm91cCA9IFtdO1xyXG5cclxuICAgIC8vIEV4aXN0aW5nIHNsaWRlcyAoZm9yIGN1cnJlbnQsIG5leHQgYW5kIHByZXZpb3VzIGdhbGxlcnkgaXRlbXMpXHJcbiAgICBzZWxmLnNsaWRlcyA9IHt9O1xyXG5cclxuICAgIC8vIENyZWF0ZSBncm91cCBlbGVtZW50c1xyXG4gICAgc2VsZi5hZGRDb250ZW50KGNvbnRlbnQpO1xyXG5cclxuICAgIGlmICghc2VsZi5ncm91cC5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuaW5pdCgpO1xyXG4gIH07XHJcblxyXG4gICQuZXh0ZW5kKEZhbmN5Qm94LnByb3RvdHlwZSwge1xyXG4gICAgLy8gQ3JlYXRlIERPTSBzdHJ1Y3R1cmVcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZmlyc3RJdGVtID0gc2VsZi5ncm91cFtzZWxmLmN1cnJJbmRleF0sXHJcbiAgICAgICAgZmlyc3RJdGVtT3B0cyA9IGZpcnN0SXRlbS5vcHRzLFxyXG4gICAgICAgICRjb250YWluZXIsXHJcbiAgICAgICAgYnV0dG9uU3RyO1xyXG5cclxuICAgICAgaWYgKGZpcnN0SXRlbU9wdHMuY2xvc2VFeGlzdGluZykge1xyXG4gICAgICAgICQuZmFuY3lib3guY2xvc2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhpZGUgc2Nyb2xsYmFyc1xyXG4gICAgICAvLyA9PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiZmFuY3lib3gtYWN0aXZlXCIpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgICEkLmZhbmN5Ym94LmdldEluc3RhbmNlKCkgJiZcclxuICAgICAgICBmaXJzdEl0ZW1PcHRzLmhpZGVTY3JvbGxiYXIgIT09IGZhbHNlICYmXHJcbiAgICAgICAgISQuZmFuY3lib3guaXNNb2JpbGUgJiZcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICApIHtcclxuICAgICAgICAkKFwiaGVhZFwiKS5hcHBlbmQoXHJcbiAgICAgICAgICAnPHN0eWxlIGlkPVwiZmFuY3lib3gtc3R5bGUtbm9zY3JvbGxcIiB0eXBlPVwidGV4dC9jc3NcIj4uY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFye21hcmdpbi1yaWdodDonICtcclxuICAgICAgICAgICh3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgK1xyXG4gICAgICAgICAgXCJweDt9PC9zdHlsZT5cIlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBCdWlsZCBodG1sIG1hcmt1cCBhbmQgc2V0IHJlZmVyZW5jZXNcclxuICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAvLyBCdWlsZCBodG1sIGNvZGUgZm9yIGJ1dHRvbnMgYW5kIGluc2VydCBpbnRvIG1haW4gdGVtcGxhdGVcclxuICAgICAgYnV0dG9uU3RyID0gXCJcIjtcclxuXHJcbiAgICAgICQuZWFjaChmaXJzdEl0ZW1PcHRzLmJ1dHRvbnMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICBidXR0b25TdHIgKz0gZmlyc3RJdGVtT3B0cy5idG5UcGxbdmFsdWVdIHx8IFwiXCI7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ3JlYXRlIG1hcmt1cCBmcm9tIGJhc2UgdGVtcGxhdGUsIGl0IHdpbGwgYmUgaW5pdGlhbGx5IGhpZGRlbiB0b1xyXG4gICAgICAvLyBhdm9pZCB1bm5lY2Vzc2FyeSB3b3JrIGxpa2UgcGFpbnRpbmcgd2hpbGUgaW5pdGlhbGl6aW5nIGlzIG5vdCBjb21wbGV0ZVxyXG4gICAgICAkY29udGFpbmVyID0gJChcclxuICAgICAgICAgIHNlbGYudHJhbnNsYXRlKFxyXG4gICAgICAgICAgICBzZWxmLFxyXG4gICAgICAgICAgICBmaXJzdEl0ZW1PcHRzLmJhc2VUcGxcclxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e2J1dHRvbnN9fVwiLCBidXR0b25TdHIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie3thcnJvd3N9fVwiLCBmaXJzdEl0ZW1PcHRzLmJ0blRwbC5hcnJvd0xlZnQgKyBmaXJzdEl0ZW1PcHRzLmJ0blRwbC5hcnJvd1JpZ2h0KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgICAuYXR0cihcImlkXCIsIFwiZmFuY3lib3gtY29udGFpbmVyLVwiICsgc2VsZi5pZClcclxuICAgICAgICAuYWRkQ2xhc3MoZmlyc3RJdGVtT3B0cy5iYXNlQ2xhc3MpXHJcbiAgICAgICAgLmRhdGEoXCJGYW5jeUJveFwiLCBzZWxmKVxyXG4gICAgICAgIC5hcHBlbmRUbyhmaXJzdEl0ZW1PcHRzLnBhcmVudEVsKTtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBvYmplY3QgaG9sZGluZyByZWZlcmVuY2VzIHRvIGpRdWVyeSB3cmFwcGVkIG5vZGVzXHJcbiAgICAgIHNlbGYuJHJlZnMgPSB7XHJcbiAgICAgICAgY29udGFpbmVyOiAkY29udGFpbmVyXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBbXCJiZ1wiLCBcImlubmVyXCIsIFwiaW5mb2JhclwiLCBcInRvb2xiYXJcIiwgXCJzdGFnZVwiLCBcImNhcHRpb25cIiwgXCJuYXZpZ2F0aW9uXCJdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBzZWxmLiRyZWZzW2l0ZW1dID0gJGNvbnRhaW5lci5maW5kKFwiLmZhbmN5Ym94LVwiICsgaXRlbSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2VsZi50cmlnZ2VyKFwib25Jbml0XCIpO1xyXG5cclxuICAgICAgLy8gRW5hYmxlIGV2ZW50cywgZGVhY3RpdmUgcHJldmlvdXMgaW5zdGFuY2VzXHJcbiAgICAgIHNlbGYuYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgIC8vIEJ1aWxkIHNsaWRlcywgbG9hZCBhbmQgcmV2ZWFsIGNvbnRlbnRcclxuICAgICAgc2VsZi5qdW1wVG8oc2VsZi5jdXJySW5kZXgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTaW1wbGUgaTE4biBzdXBwb3J0IC0gcmVwbGFjZXMgb2JqZWN0IGtleXMgZm91bmQgaW4gdGVtcGxhdGVcclxuICAgIC8vIHdpdGggY29ycmVzcG9uZGluZyB2YWx1ZXNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gKG9iaiwgc3RyKSB7XHJcbiAgICAgIHZhciBhcnIgPSBvYmoub3B0cy5pMThuW29iai5vcHRzLmxhbmddIHx8IG9iai5vcHRzLmkxOG4uZW47XHJcblxyXG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xce1xceyhcXHcrKVxcfVxcfS9nLCBmdW5jdGlvbiAobWF0Y2gsIG4pIHtcclxuICAgICAgICByZXR1cm4gYXJyW25dID09PSB1bmRlZmluZWQgPyBtYXRjaCA6IGFycltuXTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFBvcHVsYXRlIGN1cnJlbnQgZ3JvdXAgd2l0aCBmcmVzaCBjb250ZW50XHJcbiAgICAvLyBDaGVjayBpZiBlYWNoIG9iamVjdCBoYXMgdmFsaWQgdHlwZSBhbmQgY29udGVudFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBhZGRDb250ZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaXRlbXMgPSAkLm1ha2VBcnJheShjb250ZW50KSxcclxuICAgICAgICB0aHVtYnM7XHJcblxyXG4gICAgICAkLmVhY2goaXRlbXMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9LFxyXG4gICAgICAgICAgb3B0cyA9IHt9LFxyXG4gICAgICAgICAgJGl0ZW0sXHJcbiAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgZm91bmQsXHJcbiAgICAgICAgICBzcmMsXHJcbiAgICAgICAgICBzcmNQYXJ0cztcclxuXHJcbiAgICAgICAgLy8gU3RlcCAxIC0gTWFrZSBzdXJlIHdlIGhhdmUgYW4gb2JqZWN0XHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QoaXRlbSkpIHtcclxuICAgICAgICAgIC8vIFdlIHByb2JhYmx5IGhhdmUgbWFudWFsIHVzYWdlIGhlcmUsIHNvbWV0aGluZyBsaWtlXHJcbiAgICAgICAgICAvLyAkLmZhbmN5Ym94Lm9wZW4oIFsgeyBzcmMgOiBcImltYWdlLmpwZ1wiLCB0eXBlIDogXCJpbWFnZVwiIH0gXSApXHJcblxyXG4gICAgICAgICAgb2JqID0gaXRlbTtcclxuICAgICAgICAgIG9wdHMgPSBpdGVtLm9wdHMgfHwgaXRlbTtcclxuICAgICAgICB9IGVsc2UgaWYgKCQudHlwZShpdGVtKSA9PT0gXCJvYmplY3RcIiAmJiAkKGl0ZW0pLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gSGVyZSB3ZSBwcm9iYWJseSBoYXZlIGpRdWVyeSBjb2xsZWN0aW9uIHJldHVybmVkIGJ5IHNvbWUgc2VsZWN0b3JcclxuICAgICAgICAgICRpdGVtID0gJChpdGVtKTtcclxuXHJcbiAgICAgICAgICAvLyBTdXBwb3J0IGF0dHJpYnV0ZXMgbGlrZSBgZGF0YS1vcHRpb25zPSd7XCJ0b3VjaFwiIDogZmFsc2V9J2AgYW5kIGBkYXRhLXRvdWNoPSdmYWxzZSdgXHJcbiAgICAgICAgICBvcHRzID0gJGl0ZW0uZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRzLCBvcHRzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIC8vIEhlcmUgd2Ugc3RvcmUgY2xpY2tlZCBlbGVtZW50XHJcbiAgICAgICAgICBvcHRzLiRvcmlnID0gJGl0ZW07XHJcblxyXG4gICAgICAgICAgb2JqLnNyYyA9IHNlbGYub3B0cy5zcmMgfHwgb3B0cy5zcmMgfHwgJGl0ZW0uYXR0cihcImhyZWZcIik7XHJcblxyXG4gICAgICAgICAgLy8gQXNzdW1lIHRoYXQgc2ltcGxlIHN5bnRheCBpcyB1c2VkLCBmb3IgZXhhbXBsZTpcclxuICAgICAgICAgIC8vICAgYCQuZmFuY3lib3gub3BlbiggJChcIiN0ZXN0XCIpLCB7fSApO2BcclxuICAgICAgICAgIGlmICghb2JqLnR5cGUgJiYgIW9iai5zcmMpIHtcclxuICAgICAgICAgICAgb2JqLnR5cGUgPSBcImlubGluZVwiO1xyXG4gICAgICAgICAgICBvYmouc3JjID0gaXRlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQXNzdW1lIHdlIGhhdmUgYSBzaW1wbGUgaHRtbCBjb2RlLCBmb3IgZXhhbXBsZTpcclxuICAgICAgICAgIC8vICAgJC5mYW5jeWJveC5vcGVuKCAnPGRpdj48aDE+SGkhPC9oMT48L2Rpdj4nICk7XHJcbiAgICAgICAgICBvYmogPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiaHRtbFwiLFxyXG4gICAgICAgICAgICBzcmM6IGl0ZW0gKyBcIlwiXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWFjaCBnYWxsZXJ5IG9iamVjdCBoYXMgZnVsbCBjb2xsZWN0aW9uIG9mIG9wdGlvbnNcclxuICAgICAgICBvYmoub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzZWxmLm9wdHMsIG9wdHMpO1xyXG5cclxuICAgICAgICAvLyBEbyBub3QgbWVyZ2UgYnV0dG9ucyBhcnJheVxyXG4gICAgICAgIGlmICgkLmlzQXJyYXkob3B0cy5idXR0b25zKSkge1xyXG4gICAgICAgICAgb2JqLm9wdHMuYnV0dG9ucyA9IG9wdHMuYnV0dG9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkLmZhbmN5Ym94LmlzTW9iaWxlICYmIG9iai5vcHRzLm1vYmlsZSkge1xyXG4gICAgICAgICAgb2JqLm9wdHMgPSBtZXJnZU9wdHMob2JqLm9wdHMsIG9iai5vcHRzLm1vYmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdGVwIDIgLSBNYWtlIHN1cmUgd2UgaGF2ZSBjb250ZW50IHR5cGUsIGlmIG5vdCAtIHRyeSB0byBndWVzc1xyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgIHR5cGUgPSBvYmoudHlwZSB8fCBvYmoub3B0cy50eXBlO1xyXG4gICAgICAgIHNyYyA9IG9iai5zcmMgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKCF0eXBlICYmIHNyYykge1xyXG4gICAgICAgICAgaWYgKChmb3VuZCA9IHNyYy5tYXRjaCgvXFwuKG1wNHxtb3Z8b2d2fHdlYm0pKChcXD98IykuKik/JC9pKSkpIHtcclxuICAgICAgICAgICAgdHlwZSA9IFwidmlkZW9cIjtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2JqLm9wdHMudmlkZW8uZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgb2JqLm9wdHMudmlkZW8uZm9ybWF0ID0gXCJ2aWRlby9cIiArIChmb3VuZFsxXSA9PT0gXCJvZ3ZcIiA/IFwib2dnXCIgOiBmb3VuZFsxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoc3JjLm1hdGNoKC8oXmRhdGE6aW1hZ2VcXC9bYS16MC05K1xcLz1dKiwpfChcXC4oanAoZXxnfGVnKXxnaWZ8cG5nfGJtcHx3ZWJwfHN2Z3xpY28pKChcXD98IykuKik/JCkvaSkpIHtcclxuICAgICAgICAgICAgdHlwZSA9IFwiaW1hZ2VcIjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoc3JjLm1hdGNoKC9cXC4ocGRmKSgoXFw/fCMpLiopPyQvaSkpIHtcclxuICAgICAgICAgICAgdHlwZSA9IFwiaWZyYW1lXCI7XHJcbiAgICAgICAgICAgIG9iaiA9ICQuZXh0ZW5kKHRydWUsIG9iaiwge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcInBkZlwiLFxyXG4gICAgICAgICAgICAgIG9wdHM6IHtcclxuICAgICAgICAgICAgICAgIGlmcmFtZToge1xyXG4gICAgICAgICAgICAgICAgICBwcmVsb2FkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHNyYy5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBcImlubGluZVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgIG9iai50eXBlID0gdHlwZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VsZi50cmlnZ2VyKFwib2JqZWN0TmVlZHNUeXBlXCIsIG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW9iai5jb250ZW50VHlwZSkge1xyXG4gICAgICAgICAgb2JqLmNvbnRlbnRUeXBlID0gJC5pbkFycmF5KG9iai50eXBlLCBbXCJodG1sXCIsIFwiaW5saW5lXCIsIFwiYWpheFwiXSkgPiAtMSA/IFwiaHRtbFwiIDogb2JqLnR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdGVwIDMgLSBTb21lIGFkanVzdG1lbnRzXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICBvYmouaW5kZXggPSBzZWxmLmdyb3VwLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKG9iai5vcHRzLnNtYWxsQnRuID09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICBvYmoub3B0cy5zbWFsbEJ0biA9ICQuaW5BcnJheShvYmoudHlwZSwgW1wiaHRtbFwiLCBcImlubGluZVwiLCBcImFqYXhcIl0pID4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqLm9wdHMudG9vbGJhciA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgIG9iai5vcHRzLnRvb2xiYXIgPSAhb2JqLm9wdHMuc21hbGxCdG47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5kIHRodW1ibmFpbCBpbWFnZSwgY2hlY2sgaWYgZXhpc3RzIGFuZCBpZiBpcyBpbiB0aGUgdmlld3BvcnRcclxuICAgICAgICBvYmouJHRodW1iID0gb2JqLm9wdHMuJHRodW1iIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChvYmoub3B0cy4kdHJpZ2dlciAmJiBvYmouaW5kZXggPT09IHNlbGYub3B0cy5pbmRleCkge1xyXG4gICAgICAgICAgb2JqLiR0aHVtYiA9IG9iai5vcHRzLiR0cmlnZ2VyLmZpbmQoXCJpbWc6Zmlyc3RcIik7XHJcblxyXG4gICAgICAgICAgaWYgKG9iai4kdGh1bWIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG9iai5vcHRzLiRvcmlnID0gb2JqLm9wdHMuJHRyaWdnZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIShvYmouJHRodW1iICYmIG9iai4kdGh1bWIubGVuZ3RoKSAmJiBvYmoub3B0cy4kb3JpZykge1xyXG4gICAgICAgICAgb2JqLiR0aHVtYiA9IG9iai5vcHRzLiRvcmlnLmZpbmQoXCJpbWc6Zmlyc3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqLiR0aHVtYiAmJiAhb2JqLiR0aHVtYi5sZW5ndGgpIHtcclxuICAgICAgICAgIG9iai4kdGh1bWIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JqLnRodW1iID0gb2JqLm9wdHMudGh1bWIgfHwgKG9iai4kdGh1bWIgPyBvYmouJHRodW1iWzBdLnNyYyA6IG51bGwpO1xyXG5cclxuICAgICAgICAvLyBcImNhcHRpb25cIiBpcyBhIFwic3BlY2lhbFwiIG9wdGlvbiwgaXQgY2FuIGJlIHVzZWQgdG8gY3VzdG9taXplIGNhcHRpb24gcGVyIGdhbGxlcnkgaXRlbVxyXG4gICAgICAgIGlmICgkLnR5cGUob2JqLm9wdHMuY2FwdGlvbikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgb2JqLm9wdHMuY2FwdGlvbiA9IG9iai5vcHRzLmNhcHRpb24uYXBwbHkoaXRlbSwgW3NlbGYsIG9ial0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCQudHlwZShzZWxmLm9wdHMuY2FwdGlvbikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgb2JqLm9wdHMuY2FwdGlvbiA9IHNlbGYub3B0cy5jYXB0aW9uLmFwcGx5KGl0ZW0sIFtzZWxmLCBvYmpdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGNhcHRpb24gYXMgYSBzdHJpbmcgb3IgalF1ZXJ5IG9iamVjdFxyXG4gICAgICAgIGlmICghKG9iai5vcHRzLmNhcHRpb24gaW5zdGFuY2VvZiAkKSkge1xyXG4gICAgICAgICAgb2JqLm9wdHMuY2FwdGlvbiA9IG9iai5vcHRzLmNhcHRpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBvYmoub3B0cy5jYXB0aW9uICsgXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHVybCBjb250YWlucyBcImZpbHRlclwiIHVzZWQgdG8gZmlsdGVyIHRoZSBjb250ZW50XHJcbiAgICAgICAgLy8gRXhhbXBsZTogXCJhamF4Lmh0bWwgI3NvbWV0aGluZ1wiXHJcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBcImFqYXhcIikge1xyXG4gICAgICAgICAgc3JjUGFydHMgPSBzcmMuc3BsaXQoL1xccysvLCAyKTtcclxuXHJcbiAgICAgICAgICBpZiAoc3JjUGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBvYmouc3JjID0gc3JjUGFydHMuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIG9iai5vcHRzLmZpbHRlciA9IHNyY1BhcnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWRlIGFsbCBidXR0b25zIGFuZCBkaXNhYmxlIGludGVyYWN0aXZpdHkgZm9yIG1vZGFsIGl0ZW1zXHJcbiAgICAgICAgaWYgKG9iai5vcHRzLm1vZGFsKSB7XHJcbiAgICAgICAgICBvYmoub3B0cyA9ICQuZXh0ZW5kKHRydWUsIG9iai5vcHRzLCB7XHJcbiAgICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvbnNcclxuICAgICAgICAgICAgaW5mb2JhcjogMCxcclxuICAgICAgICAgICAgdG9vbGJhcjogMCxcclxuXHJcbiAgICAgICAgICAgIHNtYWxsQnRuOiAwLFxyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBrZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICAgIGtleWJvYXJkOiAwLFxyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBzb21lIG1vZHVsZXNcclxuICAgICAgICAgICAgc2xpZGVTaG93OiAwLFxyXG4gICAgICAgICAgICBmdWxsU2NyZWVuOiAwLFxyXG4gICAgICAgICAgICB0aHVtYnM6IDAsXHJcbiAgICAgICAgICAgIHRvdWNoOiAwLFxyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBjbGljayBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgICAgICBjbGlja0NvbnRlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGlja1NsaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGJsY2xpY2tDb250ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgZGJsY2xpY2tTbGlkZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRibGNsaWNrT3V0c2lkZTogZmFsc2VcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3RlcCA0IC0gQWRkIHByb2Nlc3NlZCBvYmplY3QgdG8gZ3JvdXBcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICBzZWxmLmdyb3VwLnB1c2gob2JqKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBVcGRhdGUgY29udHJvbHMgaWYgZ2FsbGVyeSBpcyBhbHJlYWR5IG9wZW5lZFxyXG4gICAgICBpZiAoT2JqZWN0LmtleXMoc2VsZi5zbGlkZXMpLmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGYudXBkYXRlQ29udHJvbHMoKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRodW1ibmFpbHMsIGlmIG5lZWRlZFxyXG4gICAgICAgIHRodW1icyA9IHNlbGYuVGh1bWJzO1xyXG5cclxuICAgICAgICBpZiAodGh1bWJzICYmIHRodW1icy5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgdGh1bWJzLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgICAgIHRodW1icy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBBdHRhY2ggYW4gZXZlbnQgaGFuZGxlciBmdW5jdGlvbnMgZm9yOlxyXG4gICAgLy8gICAtIG5hdmlnYXRpb24gYnV0dG9uc1xyXG4gICAgLy8gICAtIGJyb3dzZXIgc2Nyb2xsaW5nLCByZXNpemluZztcclxuICAgIC8vICAgLSBmb2N1c2luZ1xyXG4gICAgLy8gICAtIGtleWJvYXJkXHJcbiAgICAvLyAgIC0gZGV0ZWN0aW5nIGluYWN0aXZpdHlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgYWRkRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIHNlbGYucmVtb3ZlRXZlbnRzKCk7XHJcblxyXG4gICAgICAvLyBNYWtlIG5hdmlnYXRpb24gZWxlbWVudHMgY2xpY2thYmxlXHJcbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyXHJcbiAgICAgICAgLm9uKFwiY2xpY2suZmItY2xvc2VcIiwgXCJbZGF0YS1mYW5jeWJveC1jbG9zZV1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5jbG9zZShlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbihcInRvdWNoc3RhcnQuZmItcHJldiBjbGljay5mYi1wcmV2XCIsIFwiW2RhdGEtZmFuY3lib3gtcHJldl1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5wcmV2aW91cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKFwidG91Y2hzdGFydC5mYi1uZXh0IGNsaWNrLmZiLW5leHRcIiwgXCJbZGF0YS1mYW5jeWJveC1uZXh0XVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICBzZWxmLm5leHQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbihcImNsaWNrLmZiXCIsIFwiW2RhdGEtZmFuY3lib3gtem9vbV1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIC8vIENsaWNrIGhhbmRsZXIgZm9yIHpvb20gYnV0dG9uXHJcbiAgICAgICAgICBzZWxmW3NlbGYuaXNTY2FsZWREb3duKCkgPyBcInNjYWxlVG9BY3R1YWxcIiA6IFwic2NhbGVUb0ZpdFwiXSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSGFuZGxlIHBhZ2Ugc2Nyb2xsaW5nIGFuZCBicm93c2VyIHJlc2l6aW5nXHJcbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgJFcub24oXCJvcmllbnRhdGlvbmNoYW5nZS5mYiByZXNpemUuZmJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZSAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwicmVzaXplXCIpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICBjYW5jZWxBRnJhbWUoc2VsZi5yZXF1ZXN0SWQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNlbGYucmVxdWVzdElkID0gcmVxdWVzdEFGcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlKGUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChzZWxmLmN1cnJlbnQgJiYgc2VsZi5jdXJyZW50LnR5cGUgPT09IFwiaWZyYW1lXCIpIHtcclxuICAgICAgICAgICAgc2VsZi4kcmVmcy5zdGFnZS5oaWRlKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHNlbGYuJHJlZnMuc3RhZ2Uuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZShlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJC5mYW5jeWJveC5pc01vYmlsZSA/IDYwMCA6IDI1MFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJEQub24oXCJrZXlkb3duLmZiXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJC5mYW5jeWJveCA/ICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKSA6IG51bGwsXHJcbiAgICAgICAgICBjdXJyZW50ID0gaW5zdGFuY2UuY3VycmVudCxcclxuICAgICAgICAgIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuXHJcbiAgICAgICAgLy8gVHJhcCBrZXlib2FyZCBmb2N1cyBpbnNpZGUgb2YgdGhlIG1vZGFsXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgIGlmIChrZXljb2RlID09IDkpIHtcclxuICAgICAgICAgIGlmIChjdXJyZW50Lm9wdHMudHJhcEZvY3VzKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZm9jdXMoZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5hYmxlIGtleWJvYXJkIG5hdmlnYXRpb25cclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnQub3B0cy5rZXlib2FyZCB8fCBlLmN0cmxLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSB8fCAkKGUudGFyZ2V0KS5pcyhcImlucHV0LHRleHRhcmVhLHZpZGVvLGF1ZGlvLHNlbGVjdFwiKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQmFja3NwYWNlIGFuZCBFc2Mga2V5c1xyXG4gICAgICAgIGlmIChrZXljb2RlID09PSA4IHx8IGtleWNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMZWZ0IGFycm93IGFuZCBVcCBhcnJvd1xyXG4gICAgICAgIGlmIChrZXljb2RlID09PSAzNyB8fCBrZXljb2RlID09PSAzOCkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIHNlbGYucHJldmlvdXMoKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSaWdoIGFycm93IGFuZCBEb3duIGFycm93XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT09IDM5IHx8IGtleWNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5uZXh0KCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi50cmlnZ2VyKFwiYWZ0ZXJLZXlkb3duXCIsIGUsIGtleWNvZGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEhpZGUgY29udHJvbHMgYWZ0ZXIgc29tZSBpbmFjdGl2aXR5IHBlcmlvZFxyXG4gICAgICBpZiAoc2VsZi5ncm91cFtzZWxmLmN1cnJJbmRleF0ub3B0cy5pZGxlVGltZSkge1xyXG4gICAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgJEQub24oXHJcbiAgICAgICAgICBcIm1vdXNlbW92ZS5mYi1pZGxlIG1vdXNlbGVhdmUuZmItaWRsZSBtb3VzZWRvd24uZmItaWRsZSB0b3VjaHN0YXJ0LmZiLWlkbGUgdG91Y2htb3ZlLmZiLWlkbGUgc2Nyb2xsLmZiLWlkbGUga2V5ZG93bi5mYi1pZGxlXCIsXHJcbiAgICAgICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBzZWxmLmlkbGVTZWNvbmRzQ291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5pc0lkbGUpIHtcclxuICAgICAgICAgICAgICBzZWxmLnNob3dDb250cm9scygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmlzSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHNlbGYuaWRsZUludGVydmFsID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID49IHNlbGYuZ3JvdXBbc2VsZi5jdXJySW5kZXhdLm9wdHMuaWRsZVRpbWUgJiYgIXNlbGYuaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICBzZWxmLmlzSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaGlkZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gUmVtb3ZlIGV2ZW50cyBhZGRlZCBieSB0aGUgY29yZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHJlbW92ZUV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAkVy5vZmYoXCJvcmllbnRhdGlvbmNoYW5nZS5mYiByZXNpemUuZmJcIik7XHJcbiAgICAgICRELm9mZihcImtleWRvd24uZmIgLmZiLWlkbGVcIik7XHJcblxyXG4gICAgICB0aGlzLiRyZWZzLmNvbnRhaW5lci5vZmYoXCIuZmItY2xvc2UgLmZiLXByZXYgLmZiLW5leHRcIik7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pZGxlSW50ZXJ2YWwpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChzZWxmLmlkbGVJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgIHNlbGYuaWRsZUludGVydmFsID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGFuZ2UgdG8gcHJldmlvdXMgZ2FsbGVyeSBpdGVtXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgcHJldmlvdXM6IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5qdW1wVG8odGhpcy5jdXJyUG9zIC0gMSwgZHVyYXRpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGFuZ2UgdG8gbmV4dCBnYWxsZXJ5IGl0ZW1cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIG5leHQ6IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5qdW1wVG8odGhpcy5jdXJyUG9zICsgMSwgZHVyYXRpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTd2l0Y2ggdG8gc2VsZWN0ZWQgZ2FsbGVyeSBpdGVtXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAganVtcFRvOiBmdW5jdGlvbiAocG9zLCBkdXJhdGlvbikge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZ3JvdXBMZW4gPSBzZWxmLmdyb3VwLmxlbmd0aCxcclxuICAgICAgICBmaXJzdFJ1bixcclxuICAgICAgICBpc01vdmVkLFxyXG4gICAgICAgIGxvb3AsXHJcbiAgICAgICAgY3VycmVudCxcclxuICAgICAgICBwcmV2aW91cyxcclxuICAgICAgICBzbGlkZVBvcyxcclxuICAgICAgICBzdGFnZVBvcyxcclxuICAgICAgICBwcm9wLFxyXG4gICAgICAgIGRpZmY7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0RyYWdnaW5nIHx8IHNlbGYuaXNDbG9zaW5nIHx8IChzZWxmLmlzQW5pbWF0aW5nICYmIHNlbGYuZmlyc3RSdW4pKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTaG91bGQgbG9vcD9cclxuICAgICAgcG9zID0gcGFyc2VJbnQocG9zLCAxMCk7XHJcbiAgICAgIGxvb3AgPSBzZWxmLmN1cnJlbnQgPyBzZWxmLmN1cnJlbnQub3B0cy5sb29wIDogc2VsZi5vcHRzLmxvb3A7XHJcblxyXG4gICAgICBpZiAoIWxvb3AgJiYgKHBvcyA8IDAgfHwgcG9zID49IGdyb3VwTGVuKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgb3BlbmluZyBmb3IgdGhlIGZpcnN0IHRpbWU7IHRoaXMgaGVscHMgdG8gc3BlZWQgdGhpbmdzIHVwXHJcbiAgICAgIGZpcnN0UnVuID0gc2VsZi5maXJzdFJ1biA9ICFPYmplY3Qua2V5cyhzZWxmLnNsaWRlcykubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gQ3JlYXRlIHNsaWRlc1xyXG4gICAgICBwcmV2aW91cyA9IHNlbGYuY3VycmVudDtcclxuXHJcbiAgICAgIHNlbGYucHJldkluZGV4ID0gc2VsZi5jdXJySW5kZXg7XHJcbiAgICAgIHNlbGYucHJldlBvcyA9IHNlbGYuY3VyclBvcztcclxuXHJcbiAgICAgIGN1cnJlbnQgPSBzZWxmLmNyZWF0ZVNsaWRlKHBvcyk7XHJcblxyXG4gICAgICBpZiAoZ3JvdXBMZW4gPiAxKSB7XHJcbiAgICAgICAgaWYgKGxvb3AgfHwgY3VycmVudC5pbmRleCA8IGdyb3VwTGVuIC0gMSkge1xyXG4gICAgICAgICAgc2VsZi5jcmVhdGVTbGlkZShwb3MgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsb29wIHx8IGN1cnJlbnQuaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICBzZWxmLmNyZWF0ZVNsaWRlKHBvcyAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5jdXJyZW50ID0gY3VycmVudDtcclxuICAgICAgc2VsZi5jdXJySW5kZXggPSBjdXJyZW50LmluZGV4O1xyXG4gICAgICBzZWxmLmN1cnJQb3MgPSBjdXJyZW50LnBvcztcclxuXHJcbiAgICAgIHNlbGYudHJpZ2dlcihcImJlZm9yZVNob3dcIiwgZmlyc3RSdW4pO1xyXG5cclxuICAgICAgc2VsZi51cGRhdGVDb250cm9scygpO1xyXG5cclxuICAgICAgLy8gVmFsaWRhdGUgZHVyYXRpb24gbGVuZ3RoXHJcbiAgICAgIGN1cnJlbnQuZm9yY2VkRHVyYXRpb24gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBpZiAoJC5pc051bWVyaWMoZHVyYXRpb24pKSB7XHJcbiAgICAgICAgY3VycmVudC5mb3JjZWREdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGR1cmF0aW9uID0gY3VycmVudC5vcHRzW2ZpcnN0UnVuID8gXCJhbmltYXRpb25EdXJhdGlvblwiIDogXCJ0cmFuc2l0aW9uRHVyYXRpb25cIl07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGR1cmF0aW9uID0gcGFyc2VJbnQoZHVyYXRpb24sIDEwKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIHN3aXBlZCB0aGUgc2xpZGVzIG9yIGlmIHN0aWxsIGFuaW1hdGluZ1xyXG4gICAgICBpc01vdmVkID0gc2VsZi5pc01vdmVkKGN1cnJlbnQpO1xyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIGN1cnJlbnQgc2xpZGUgaXMgdmlzaWJsZVxyXG4gICAgICBjdXJyZW50LiRzbGlkZS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jdXJyZW50XCIpO1xyXG5cclxuICAgICAgLy8gRnJlc2ggc3RhcnQgLSByZXZlYWwgY29udGFpbmVyLCBjdXJyZW50IHNsaWRlIGFuZCBzdGFydCBsb2FkaW5nIGNvbnRlbnRcclxuICAgICAgaWYgKGZpcnN0UnVuKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQub3B0cy5hbmltYXRpb25FZmZlY3QgJiYgZHVyYXRpb24pIHtcclxuICAgICAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgZHVyYXRpb24gKyBcIm1zXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1vcGVuXCIpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuXHJcbiAgICAgICAgLy8gQXR0ZW1wdCB0byBsb2FkIGNvbnRlbnQgaW50byBzbGlkZVxyXG4gICAgICAgIC8vIFRoaXMgd2lsbCBsYXRlciBjYWxsIGBhZnRlckxvYWRgIC0+IGByZXZlYWxDb250ZW50YFxyXG4gICAgICAgIHNlbGYubG9hZFNsaWRlKGN1cnJlbnQpO1xyXG5cclxuICAgICAgICBzZWxmLnByZWxvYWQoXCJpbWFnZVwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZXQgYWN0dWFsIHNsaWRlL3N0YWdlIHBvc2l0aW9ucyAoYmVmb3JlIGNsZWFuaW5nIHVwKVxyXG4gICAgICBzbGlkZVBvcyA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKHByZXZpb3VzLiRzbGlkZSk7XHJcbiAgICAgIHN0YWdlUG9zID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoc2VsZi4kcmVmcy5zdGFnZSk7XHJcblxyXG4gICAgICAvLyBDbGVhbiB1cCBhbGwgc2xpZGVzXHJcbiAgICAgICQuZWFjaChzZWxmLnNsaWRlcywgZnVuY3Rpb24gKGluZGV4LCBzbGlkZSkge1xyXG4gICAgICAgICQuZmFuY3lib3guc3RvcChzbGlkZS4kc2xpZGUsIHRydWUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChwcmV2aW91cy5wb3MgIT09IGN1cnJlbnQucG9zKSB7XHJcbiAgICAgICAgcHJldmlvdXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91cy4kc2xpZGUucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tY29tcGxldGUgZmFuY3lib3gtc2xpZGUtLWN1cnJlbnRcIik7XHJcblxyXG4gICAgICAvLyBJZiBzbGlkZXMgYXJlIG91dCBvZiBwbGFjZSwgdGhlbiBhbmltYXRlIHRoZW0gdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICBpZiAoaXNNb3ZlZCkge1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBob3Jpem9udGFsIHN3aXBlIGRpc3RhbmNlXHJcbiAgICAgICAgZGlmZiA9IHNsaWRlUG9zLmxlZnQgLSAocHJldmlvdXMucG9zICogc2xpZGVQb3Mud2lkdGggKyBwcmV2aW91cy5wb3MgKiBwcmV2aW91cy5vcHRzLmd1dHRlcik7XHJcblxyXG4gICAgICAgICQuZWFjaChzZWxmLnNsaWRlcywgZnVuY3Rpb24gKGluZGV4LCBzbGlkZSkge1xyXG4gICAgICAgICAgc2xpZGUuJHNsaWRlLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtYW5pbWF0ZWRcIikucmVtb3ZlQ2xhc3MoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylmYW5jeWJveC1meC1cXFMrL2cpIHx8IFtdKS5qb2luKFwiIFwiKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGVhY2ggc2xpZGUgaXMgaW4gZXF1YWwgZGlzdGFuY2VcclxuICAgICAgICAgIC8vIFRoaXMgaXMgbW9zdGx5IG5lZWRlZCBmb3IgZnJlc2hseSBhZGRlZCBzbGlkZXMsIGJlY2F1c2UgdGhleSBhcmUgbm90IHlldCBwb3NpdGlvbmVkXHJcbiAgICAgICAgICB2YXIgbGVmdFBvcyA9IHNsaWRlLnBvcyAqIHNsaWRlUG9zLndpZHRoICsgc2xpZGUucG9zICogc2xpZGUub3B0cy5ndXR0ZXI7XHJcblxyXG4gICAgICAgICAgJC5mYW5jeWJveC5zZXRUcmFuc2xhdGUoc2xpZGUuJHNsaWRlLCB7XHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgbGVmdDogbGVmdFBvcyAtIHN0YWdlUG9zLmxlZnQgKyBkaWZmXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2xpZGUucG9zICE9PSBjdXJyZW50LnBvcykge1xyXG4gICAgICAgICAgICBzbGlkZS4kc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tXCIgKyAoc2xpZGUucG9zID4gY3VycmVudC5wb3MgPyBcIm5leHRcIiA6IFwicHJldmlvdXNcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJlZHJhdyB0byBtYWtlIHN1cmUgdGhhdCB0cmFuc2l0aW9uIHdpbGwgc3RhcnRcclxuICAgICAgICAgIGZvcmNlUmVkcmF3KHNsaWRlLiRzbGlkZSk7XHJcblxyXG4gICAgICAgICAgLy8gQW5pbWF0ZSB0aGUgc2xpZGVcclxuICAgICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAgICAgc2xpZGUuJHNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgIGxlZnQ6IChzbGlkZS5wb3MgLSBjdXJyZW50LnBvcykgKiBzbGlkZVBvcy53aWR0aCArIChzbGlkZS5wb3MgLSBjdXJyZW50LnBvcykgKiBzbGlkZS5vcHRzLmd1dHRlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHNsaWRlLiRzbGlkZVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgb3BhY2l0eTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1uZXh0IGZhbmN5Ym94LXNsaWRlLS1wcmV2aW91c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uICYmIGN1cnJlbnQub3B0cy50cmFuc2l0aW9uRWZmZWN0KSB7XHJcbiAgICAgICAgLy8gU2V0IHRyYW5zaXRpb24gZWZmZWN0IGZvciBwcmV2aW91c2x5IGFjdGl2ZSBzbGlkZVxyXG4gICAgICAgIHByb3AgPSBcImZhbmN5Ym94LWFuaW1hdGVkIGZhbmN5Ym94LWZ4LVwiICsgY3VycmVudC5vcHRzLnRyYW5zaXRpb25FZmZlY3Q7XHJcblxyXG4gICAgICAgIHByZXZpb3VzLiRzbGlkZS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1cIiArIChwcmV2aW91cy5wb3MgPiBjdXJyZW50LnBvcyA/IFwibmV4dFwiIDogXCJwcmV2aW91c1wiKSk7XHJcblxyXG4gICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAgIHByZXZpb3VzLiRzbGlkZSxcclxuICAgICAgICAgIHByb3AsXHJcbiAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHJldmlvdXMuJHNsaWRlLnJlbW92ZUNsYXNzKHByb3ApLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtc2xpZGUtLW5leHQgZmFuY3lib3gtc2xpZGUtLXByZXZpb3VzXCIpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGN1cnJlbnQuaXNMb2FkZWQpIHtcclxuICAgICAgICBzZWxmLnJldmVhbENvbnRlbnQoY3VycmVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi5sb2FkU2xpZGUoY3VycmVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYucHJlbG9hZChcImltYWdlXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDcmVhdGUgbmV3IFwic2xpZGVcIiBlbGVtZW50XHJcbiAgICAvLyBUaGVzZSBhcmUgZ2FsbGVyeSBpdGVtcyAgdGhhdCBhcmUgYWN0dWFsbHkgYWRkZWQgdG8gRE9NXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgY3JlYXRlU2xpZGU6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICRzbGlkZSxcclxuICAgICAgICBpbmRleDtcclxuXHJcbiAgICAgIGluZGV4ID0gcG9zICUgc2VsZi5ncm91cC5sZW5ndGg7XHJcbiAgICAgIGluZGV4ID0gaW5kZXggPCAwID8gc2VsZi5ncm91cC5sZW5ndGggKyBpbmRleCA6IGluZGV4O1xyXG5cclxuICAgICAgaWYgKCFzZWxmLnNsaWRlc1twb3NdICYmIHNlbGYuZ3JvdXBbaW5kZXhdKSB7XHJcbiAgICAgICAgJHNsaWRlID0gJCgnPGRpdiBjbGFzcz1cImZhbmN5Ym94LXNsaWRlXCI+PC9kaXY+JykuYXBwZW5kVG8oc2VsZi4kcmVmcy5zdGFnZSk7XHJcblxyXG4gICAgICAgIHNlbGYuc2xpZGVzW3Bvc10gPSAkLmV4dGVuZCh0cnVlLCB7fSwgc2VsZi5ncm91cFtpbmRleF0sIHtcclxuICAgICAgICAgIHBvczogcG9zLFxyXG4gICAgICAgICAgJHNsaWRlOiAkc2xpZGUsXHJcbiAgICAgICAgICBpc0xvYWRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi51cGRhdGVTbGlkZShzZWxmLnNsaWRlc1twb3NdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHNlbGYuc2xpZGVzW3Bvc107XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNjYWxlIGltYWdlIHRvIHRoZSBhY3R1YWwgc2l6ZSBvZiB0aGUgaW1hZ2U7XHJcbiAgICAvLyB4IGFuZCB5IHZhbHVlcyBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIHNsaWRlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2NhbGVUb0FjdHVhbDogZnVuY3Rpb24gKHgsIHksIGR1cmF0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgICRjb250ZW50ID0gY3VycmVudC4kY29udGVudCxcclxuICAgICAgICBjYW52YXNXaWR0aCA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKGN1cnJlbnQuJHNsaWRlKS53aWR0aCxcclxuICAgICAgICBjYW52YXNIZWlnaHQgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShjdXJyZW50LiRzbGlkZSkuaGVpZ2h0LFxyXG4gICAgICAgIG5ld0ltZ1dpZHRoID0gY3VycmVudC53aWR0aCxcclxuICAgICAgICBuZXdJbWdIZWlnaHQgPSBjdXJyZW50LmhlaWdodCxcclxuICAgICAgICBpbWdQb3MsXHJcbiAgICAgICAgcG9zWCxcclxuICAgICAgICBwb3NZLFxyXG4gICAgICAgIHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0FuaW1hdGluZyB8fCBzZWxmLmlzTW92ZWQoKSB8fCAhJGNvbnRlbnQgfHwgIShjdXJyZW50LnR5cGUgPT0gXCJpbWFnZVwiICYmIGN1cnJlbnQuaXNMb2FkZWQgJiYgIWN1cnJlbnQuaGFzRXJyb3IpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICQuZmFuY3lib3guc3RvcCgkY29udGVudCk7XHJcblxyXG4gICAgICB4ID0geCA9PT0gdW5kZWZpbmVkID8gY2FudmFzV2lkdGggKiAwLjUgOiB4O1xyXG4gICAgICB5ID0geSA9PT0gdW5kZWZpbmVkID8gY2FudmFzSGVpZ2h0ICogMC41IDogeTtcclxuXHJcbiAgICAgIGltZ1BvcyA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKCRjb250ZW50KTtcclxuXHJcbiAgICAgIGltZ1Bvcy50b3AgLT0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoY3VycmVudC4kc2xpZGUpLnRvcDtcclxuICAgICAgaW1nUG9zLmxlZnQgLT0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoY3VycmVudC4kc2xpZGUpLmxlZnQ7XHJcblxyXG4gICAgICBzY2FsZVggPSBuZXdJbWdXaWR0aCAvIGltZ1Bvcy53aWR0aDtcclxuICAgICAgc2NhbGVZID0gbmV3SW1nSGVpZ2h0IC8gaW1nUG9zLmhlaWdodDtcclxuXHJcbiAgICAgIC8vIEdldCBjZW50ZXIgcG9zaXRpb24gZm9yIG9yaWdpbmFsIGltYWdlXHJcbiAgICAgIHBvc1ggPSBjYW52YXNXaWR0aCAqIDAuNSAtIG5ld0ltZ1dpZHRoICogMC41O1xyXG4gICAgICBwb3NZID0gY2FudmFzSGVpZ2h0ICogMC41IC0gbmV3SW1nSGVpZ2h0ICogMC41O1xyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIGltYWdlIGRvZXMgbm90IG1vdmUgYXdheSBmcm9tIGVkZ2VzXHJcbiAgICAgIGlmIChuZXdJbWdXaWR0aCA+IGNhbnZhc1dpZHRoKSB7XHJcbiAgICAgICAgcG9zWCA9IGltZ1Bvcy5sZWZ0ICogc2NhbGVYIC0gKHggKiBzY2FsZVggLSB4KTtcclxuXHJcbiAgICAgICAgaWYgKHBvc1ggPiAwKSB7XHJcbiAgICAgICAgICBwb3NYID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3NYIDwgY2FudmFzV2lkdGggLSBuZXdJbWdXaWR0aCkge1xyXG4gICAgICAgICAgcG9zWCA9IGNhbnZhc1dpZHRoIC0gbmV3SW1nV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV3SW1nSGVpZ2h0ID4gY2FudmFzSGVpZ2h0KSB7XHJcbiAgICAgICAgcG9zWSA9IGltZ1Bvcy50b3AgKiBzY2FsZVkgLSAoeSAqIHNjYWxlWSAtIHkpO1xyXG5cclxuICAgICAgICBpZiAocG9zWSA+IDApIHtcclxuICAgICAgICAgIHBvc1kgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc1kgPCBjYW52YXNIZWlnaHQgLSBuZXdJbWdIZWlnaHQpIHtcclxuICAgICAgICAgIHBvc1kgPSBjYW52YXNIZWlnaHQgLSBuZXdJbWdIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZUN1cnNvcihuZXdJbWdXaWR0aCwgbmV3SW1nSGVpZ2h0KTtcclxuXHJcbiAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAkY29udGVudCwge1xyXG4gICAgICAgICAgdG9wOiBwb3NZLFxyXG4gICAgICAgICAgbGVmdDogcG9zWCxcclxuICAgICAgICAgIHNjYWxlWDogc2NhbGVYLFxyXG4gICAgICAgICAgc2NhbGVZOiBzY2FsZVlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGR1cmF0aW9uIHx8IDM2NixcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gU3RvcCBzbGlkZXNob3dcclxuICAgICAgaWYgKHNlbGYuU2xpZGVTaG93ICYmIHNlbGYuU2xpZGVTaG93LmlzQWN0aXZlKSB7XHJcbiAgICAgICAgc2VsZi5TbGlkZVNob3cuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNjYWxlIGltYWdlIHRvIGZpdCBpbnNpZGUgcGFyZW50IGVsZW1lbnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzY2FsZVRvRml0OiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICAgIGlmIChzZWxmLmlzQW5pbWF0aW5nIHx8IHNlbGYuaXNNb3ZlZCgpIHx8ICEkY29udGVudCB8fCAhKGN1cnJlbnQudHlwZSA9PSBcImltYWdlXCIgJiYgY3VycmVudC5pc0xvYWRlZCAmJiAhY3VycmVudC5oYXNFcnJvcikpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgJC5mYW5jeWJveC5zdG9wKCRjb250ZW50KTtcclxuXHJcbiAgICAgIGVuZCA9IHNlbGYuZ2V0Rml0UG9zKGN1cnJlbnQpO1xyXG5cclxuICAgICAgc2VsZi51cGRhdGVDdXJzb3IoZW5kLndpZHRoLCBlbmQuaGVpZ2h0KTtcclxuXHJcbiAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAkY29udGVudCwge1xyXG4gICAgICAgICAgdG9wOiBlbmQudG9wLFxyXG4gICAgICAgICAgbGVmdDogZW5kLmxlZnQsXHJcbiAgICAgICAgICBzY2FsZVg6IGVuZC53aWR0aCAvICRjb250ZW50LndpZHRoKCksXHJcbiAgICAgICAgICBzY2FsZVk6IGVuZC5oZWlnaHQgLyAkY29udGVudC5oZWlnaHQoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHVyYXRpb24gfHwgMzY2LFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBpbWFnZSBzaXplIHRvIGZpdCBpbnNpZGUgdmlld3BvcnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBnZXRGaXRQb3M6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBzbGlkZS4kY29udGVudCxcclxuICAgICAgICAkc2xpZGUgPSBzbGlkZS4kc2xpZGUsXHJcbiAgICAgICAgd2lkdGggPSBzbGlkZS53aWR0aCB8fCBzbGlkZS5vcHRzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodCA9IHNsaWRlLmhlaWdodCB8fCBzbGlkZS5vcHRzLmhlaWdodCxcclxuICAgICAgICBtYXhXaWR0aCxcclxuICAgICAgICBtYXhIZWlnaHQsXHJcbiAgICAgICAgbWluUmF0aW8sXHJcbiAgICAgICAgYXNwZWN0UmF0aW8sXHJcbiAgICAgICAgcmV6ID0ge307XHJcblxyXG4gICAgICBpZiAoIXNsaWRlLmlzTG9hZGVkIHx8ICEkY29udGVudCB8fCAhJGNvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYXhXaWR0aCA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKHNlbGYuJHJlZnMuc3RhZ2UpLndpZHRoO1xyXG4gICAgICBtYXhIZWlnaHQgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShzZWxmLiRyZWZzLnN0YWdlKS5oZWlnaHQ7XHJcblxyXG4gICAgICBtYXhXaWR0aCAtPVxyXG4gICAgICAgIHBhcnNlRmxvYXQoJHNsaWRlLmNzcyhcInBhZGRpbmdMZWZ0XCIpKSArXHJcbiAgICAgICAgcGFyc2VGbG9hdCgkc2xpZGUuY3NzKFwicGFkZGluZ1JpZ2h0XCIpKSArXHJcbiAgICAgICAgcGFyc2VGbG9hdCgkY29udGVudC5jc3MoXCJtYXJnaW5MZWZ0XCIpKSArXHJcbiAgICAgICAgcGFyc2VGbG9hdCgkY29udGVudC5jc3MoXCJtYXJnaW5SaWdodFwiKSk7XHJcblxyXG4gICAgICBtYXhIZWlnaHQgLT1cclxuICAgICAgICBwYXJzZUZsb2F0KCRzbGlkZS5jc3MoXCJwYWRkaW5nVG9wXCIpKSArXHJcbiAgICAgICAgcGFyc2VGbG9hdCgkc2xpZGUuY3NzKFwicGFkZGluZ0JvdHRvbVwiKSkgK1xyXG4gICAgICAgIHBhcnNlRmxvYXQoJGNvbnRlbnQuY3NzKFwibWFyZ2luVG9wXCIpKSArXHJcbiAgICAgICAgcGFyc2VGbG9hdCgkY29udGVudC5jc3MoXCJtYXJnaW5Cb3R0b21cIikpO1xyXG5cclxuICAgICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XHJcbiAgICAgICAgd2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICBoZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1pblJhdGlvID0gTWF0aC5taW4oMSwgbWF4V2lkdGggLyB3aWR0aCwgbWF4SGVpZ2h0IC8gaGVpZ2h0KTtcclxuXHJcbiAgICAgIHdpZHRoID0gbWluUmF0aW8gKiB3aWR0aDtcclxuICAgICAgaGVpZ2h0ID0gbWluUmF0aW8gKiBoZWlnaHQ7XHJcblxyXG4gICAgICAvLyBBZGp1c3Qgd2lkdGgvaGVpZ2h0IHRvIHByZWNpc2VseSBmaXQgaW50byBjb250YWluZXJcclxuICAgICAgaWYgKHdpZHRoID4gbWF4V2lkdGggLSAwLjUpIHtcclxuICAgICAgICB3aWR0aCA9IG1heFdpZHRoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaGVpZ2h0ID4gbWF4SGVpZ2h0IC0gMC41KSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2xpZGUudHlwZSA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgICAgcmV6LnRvcCA9IE1hdGguZmxvb3IoKG1heEhlaWdodCAtIGhlaWdodCkgKiAwLjUpICsgcGFyc2VGbG9hdCgkc2xpZGUuY3NzKFwicGFkZGluZ1RvcFwiKSk7XHJcbiAgICAgICAgcmV6LmxlZnQgPSBNYXRoLmZsb29yKChtYXhXaWR0aCAtIHdpZHRoKSAqIDAuNSkgKyBwYXJzZUZsb2F0KCRzbGlkZS5jc3MoXCJwYWRkaW5nTGVmdFwiKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGUuY29udGVudFR5cGUgPT09IFwidmlkZW9cIikge1xyXG4gICAgICAgIC8vIEZvcmNlIGFzcGVjdCByYXRpbyBmb3IgdGhlIHZpZGVvXHJcbiAgICAgICAgLy8gXCJJIHNheSB0aGUgd2hvbGUgd29ybGQgbXVzdCBsZWFybiBvZiBvdXIgcGVhY2VmdWwgd2F5c+KApiBieSBmb3JjZSFcIlxyXG4gICAgICAgIGFzcGVjdFJhdGlvID0gc2xpZGUub3B0cy53aWR0aCAmJiBzbGlkZS5vcHRzLmhlaWdodCA/IHdpZHRoIC8gaGVpZ2h0IDogc2xpZGUub3B0cy5yYXRpbyB8fCAxNiAvIDk7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgPiB3aWR0aCAvIGFzcGVjdFJhdGlvKSB7XHJcbiAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPiBoZWlnaHQgKiBhc3BlY3RSYXRpbykge1xyXG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlei53aWR0aCA9IHdpZHRoO1xyXG4gICAgICByZXouaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgcmV0dXJuIHJlejtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRlbnQgc2l6ZSBhbmQgcG9zaXRpb24gZm9yIGFsbCBzbGlkZXNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICQuZWFjaChzZWxmLnNsaWRlcywgZnVuY3Rpb24gKGtleSwgc2xpZGUpIHtcclxuICAgICAgICBzZWxmLnVwZGF0ZVNsaWRlKHNsaWRlLCBlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVwZGF0ZSBzbGlkZSBjb250ZW50IHBvc2l0aW9uIGFuZCBzaXplXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHVwZGF0ZVNsaWRlOiBmdW5jdGlvbiAoc2xpZGUsIGUpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICRjb250ZW50ID0gc2xpZGUgJiYgc2xpZGUuJGNvbnRlbnQsXHJcbiAgICAgICAgd2lkdGggPSBzbGlkZS53aWR0aCB8fCBzbGlkZS5vcHRzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodCA9IHNsaWRlLmhlaWdodCB8fCBzbGlkZS5vcHRzLmhlaWdodCxcclxuICAgICAgICAkc2xpZGUgPSBzbGlkZS4kc2xpZGU7XHJcblxyXG4gICAgICAvLyBGaXJzdCwgcHJldmVudCBjYXB0aW9uIG92ZXJsYXAsIGlmIG5lZWRlZFxyXG4gICAgICBzZWxmLmFkanVzdENhcHRpb24oc2xpZGUpO1xyXG5cclxuICAgICAgLy8gVGhlbiByZXNpemUgY29udGVudCB0byBmaXQgaW5zaWRlIHRoZSBzbGlkZVxyXG4gICAgICBpZiAoJGNvbnRlbnQgJiYgKHdpZHRoIHx8IGhlaWdodCB8fCBzbGlkZS5jb250ZW50VHlwZSA9PT0gXCJ2aWRlb1wiKSAmJiAhc2xpZGUuaGFzRXJyb3IpIHtcclxuICAgICAgICAkLmZhbmN5Ym94LnN0b3AoJGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZSgkY29udGVudCwgc2VsZi5nZXRGaXRQb3Moc2xpZGUpKTtcclxuXHJcbiAgICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgICBzZWxmLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgc2VsZi51cGRhdGVDdXJzb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRoZW4gc29tZSBhZGp1c3RtZW50c1xyXG4gICAgICBzZWxmLmFkanVzdExheW91dChzbGlkZSk7XHJcblxyXG4gICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICRzbGlkZS50cmlnZ2VyKFwicmVmcmVzaFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgICBzZWxmLiRyZWZzLnRvb2xiYXJcclxuICAgICAgICAgICAgLmFkZChzZWxmLiRyZWZzLm5hdmlnYXRpb24uZmluZChcIi5mYW5jeWJveC1idXR0b24tLWFycm93X3JpZ2h0XCIpKVxyXG4gICAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJjb21wZW5zYXRlLWZvci1zY3JvbGxiYXJcIiwgJHNsaWRlLmdldCgwKS5zY3JvbGxIZWlnaHQgPiAkc2xpZGUuZ2V0KDApLmNsaWVudEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJvblVwZGF0ZVwiLCBzbGlkZSwgZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEhvcml6b250YWxseSBjZW50ZXIgc2xpZGVcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjZW50ZXJTbGlkZTogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgICRzbGlkZSA9IGN1cnJlbnQuJHNsaWRlO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaXNDbG9zaW5nIHx8ICFjdXJyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkc2xpZGUuc2libGluZ3MoKS5jc3Moe1xyXG4gICAgICAgIHRyYW5zZm9ybTogXCJcIixcclxuICAgICAgICBvcGFjaXR5OiBcIlwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJHNsaWRlXHJcbiAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgLmNoaWxkcmVuKClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tcHJldmlvdXMgZmFuY3lib3gtc2xpZGUtLW5leHRcIik7XHJcblxyXG4gICAgICAkLmZhbmN5Ym94LmFuaW1hdGUoXHJcbiAgICAgICAgJHNsaWRlLCB7XHJcbiAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHVyYXRpb24gPT09IHVuZGVmaW5lZCA/IDAgOiBkdXJhdGlvbixcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvLyBDbGVhbiB1cFxyXG4gICAgICAgICAgJHNsaWRlLmNzcyh7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogXCJcIixcclxuICAgICAgICAgICAgb3BhY2l0eTogXCJcIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKCFjdXJyZW50LmlzQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgc2VsZi5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgY3VycmVudCBzbGlkZSBpcyBtb3ZlZCAoc3dpcGVkKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGlzTW92ZWQ6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgY3VycmVudCA9IHNsaWRlIHx8IHRoaXMuY3VycmVudCxcclxuICAgICAgICBzbGlkZVBvcyxcclxuICAgICAgICBzdGFnZVBvcztcclxuXHJcbiAgICAgIGlmICghY3VycmVudCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RhZ2VQb3MgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZSh0aGlzLiRyZWZzLnN0YWdlKTtcclxuICAgICAgc2xpZGVQb3MgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShjdXJyZW50LiRzbGlkZSk7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgICFjdXJyZW50LiRzbGlkZS5oYXNDbGFzcyhcImZhbmN5Ym94LWFuaW1hdGVkXCIpICYmXHJcbiAgICAgICAgKE1hdGguYWJzKHNsaWRlUG9zLnRvcCAtIHN0YWdlUG9zLnRvcCkgPiAwLjUgfHwgTWF0aC5hYnMoc2xpZGVQb3MubGVmdCAtIHN0YWdlUG9zLmxlZnQpID4gMC41KVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBVcGRhdGUgY3Vyc29yIHN0eWxlIGRlcGVuZGluZyBpZiBjb250ZW50IGNhbiBiZSB6b29tZWRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHVwZGF0ZUN1cnNvcjogZnVuY3Rpb24gKG5leHRXaWR0aCwgbmV4dEhlaWdodCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY3VycmVudCA9IHNlbGYuY3VycmVudCxcclxuICAgICAgICAkY29udGFpbmVyID0gc2VsZi4kcmVmcy5jb250YWluZXIsXHJcbiAgICAgICAgY2FuUGFuLFxyXG4gICAgICAgIGlzWm9vbWFibGU7XHJcblxyXG4gICAgICBpZiAoIWN1cnJlbnQgfHwgc2VsZi5pc0Nsb3NpbmcgfHwgIXNlbGYuR3Vlc3R1cmVzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkY29udGFpbmVyLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtem9vbWFibGUgZmFuY3lib3gtY2FuLXpvb21JbiBmYW5jeWJveC1jYW4tem9vbU91dCBmYW5jeWJveC1jYW4tc3dpcGUgZmFuY3lib3gtY2FuLXBhblwiKTtcclxuXHJcbiAgICAgIGNhblBhbiA9IHNlbGYuY2FuUGFuKG5leHRXaWR0aCwgbmV4dEhlaWdodCk7XHJcblxyXG4gICAgICBpc1pvb21hYmxlID0gY2FuUGFuID8gdHJ1ZSA6IHNlbGYuaXNab29tYWJsZSgpO1xyXG5cclxuICAgICAgJGNvbnRhaW5lci50b2dnbGVDbGFzcyhcImZhbmN5Ym94LWlzLXpvb21hYmxlXCIsIGlzWm9vbWFibGUpO1xyXG5cclxuICAgICAgJChcIltkYXRhLWZhbmN5Ym94LXpvb21dXCIpLnByb3AoXCJkaXNhYmxlZFwiLCAhaXNab29tYWJsZSk7XHJcblxyXG4gICAgICBpZiAoY2FuUGFuKSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyhcImZhbmN5Ym94LWNhbi1wYW5cIik7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgaXNab29tYWJsZSAmJlxyXG4gICAgICAgIChjdXJyZW50Lm9wdHMuY2xpY2tDb250ZW50ID09PSBcInpvb21cIiB8fCAoJC5pc0Z1bmN0aW9uKGN1cnJlbnQub3B0cy5jbGlja0NvbnRlbnQpICYmIGN1cnJlbnQub3B0cy5jbGlja0NvbnRlbnQoY3VycmVudCkgPT0gXCJ6b29tXCIpKVxyXG4gICAgICApIHtcclxuICAgICAgICAkY29udGFpbmVyLmFkZENsYXNzKFwiZmFuY3lib3gtY2FuLXpvb21JblwiKTtcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50Lm9wdHMudG91Y2ggJiYgKGN1cnJlbnQub3B0cy50b3VjaC52ZXJ0aWNhbCB8fCBzZWxmLmdyb3VwLmxlbmd0aCA+IDEpICYmIGN1cnJlbnQuY29udGVudFR5cGUgIT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1jYW4tc3dpcGVcIik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgY3VycmVudCBzbGlkZSBpcyB6b29tYWJsZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGlzWm9vbWFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgZml0UG9zO1xyXG5cclxuICAgICAgLy8gQXNzdW1lIHRoYXQgc2xpZGUgaXMgem9vbWFibGUgaWY6XHJcbiAgICAgIC8vICAgLSBpbWFnZSBpcyBzdGlsbCBsb2FkaW5nXHJcbiAgICAgIC8vICAgLSBhY3R1YWwgc2l6ZSBvZiB0aGUgaW1hZ2UgaXMgc21hbGxlciB0aGFuIGF2YWlsYWJsZSBhcmVhXHJcbiAgICAgIGlmIChjdXJyZW50ICYmICFzZWxmLmlzQ2xvc2luZyAmJiBjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiAmJiAhY3VycmVudC5oYXNFcnJvcikge1xyXG4gICAgICAgIGlmICghY3VycmVudC5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXRQb3MgPSBzZWxmLmdldEZpdFBvcyhjdXJyZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGZpdFBvcyAmJiAoY3VycmVudC53aWR0aCA+IGZpdFBvcy53aWR0aCB8fCBjdXJyZW50LmhlaWdodCA+IGZpdFBvcy5oZWlnaHQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgY3VycmVudCBpbWFnZSBkaW1lbnNpb25zIGFyZSBzbWFsbGVyIHRoYW4gYWN0dWFsXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBpc1NjYWxlZERvd246IGZ1bmN0aW9uIChuZXh0V2lkdGgsIG5leHRIZWlnaHQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJleiA9IGZhbHNlLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50O1xyXG5cclxuICAgICAgaWYgKG5leHRXaWR0aCAhPT0gdW5kZWZpbmVkICYmIG5leHRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJleiA9IG5leHRXaWR0aCA8IGN1cnJlbnQud2lkdGggJiYgbmV4dEhlaWdodCA8IGN1cnJlbnQuaGVpZ2h0O1xyXG4gICAgICB9IGVsc2UgaWYgKCRjb250ZW50KSB7XHJcbiAgICAgICAgcmV6ID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoJGNvbnRlbnQpO1xyXG4gICAgICAgIHJleiA9IHJlei53aWR0aCA8IGN1cnJlbnQud2lkdGggJiYgcmV6LmhlaWdodCA8IGN1cnJlbnQuaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmV6O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbWFnZSBkaW1lbnNpb25zIGV4Y2VlZCBwYXJlbnQgZWxlbWVudFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjYW5QYW46IGZ1bmN0aW9uIChuZXh0V2lkdGgsIG5leHRIZWlnaHQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgcG9zID0gbnVsbCxcclxuICAgICAgICByZXogPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiAmJiAoY3VycmVudC5pc0NvbXBsZXRlIHx8IChuZXh0V2lkdGggJiYgbmV4dEhlaWdodCkpICYmICFjdXJyZW50Lmhhc0Vycm9yKSB7XHJcbiAgICAgICAgcmV6ID0gc2VsZi5nZXRGaXRQb3MoY3VycmVudCk7XHJcblxyXG4gICAgICAgIGlmIChuZXh0V2lkdGggIT09IHVuZGVmaW5lZCAmJiBuZXh0SGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IG5leHRXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBuZXh0SGVpZ2h0XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5pc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICBwb3MgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShjdXJyZW50LiRjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3MgJiYgcmV6KSB7XHJcbiAgICAgICAgICByZXogPSBNYXRoLmFicyhwb3Mud2lkdGggLSByZXoud2lkdGgpID4gMS41IHx8IE1hdGguYWJzKHBvcy5oZWlnaHQgLSByZXouaGVpZ2h0KSA+IDEuNTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXo7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExvYWQgY29udGVudCBpbnRvIHRoZSBzbGlkZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgbG9hZFNsaWRlOiBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgJHNsaWRlLFxyXG4gICAgICAgIGFqYXhMb2FkO1xyXG5cclxuICAgICAgaWYgKHNsaWRlLmlzTG9hZGluZyB8fCBzbGlkZS5pc0xvYWRlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuaXNMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChzZWxmLnRyaWdnZXIoXCJiZWZvcmVMb2FkXCIsIHNsaWRlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzbGlkZS5pc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0eXBlID0gc2xpZGUudHlwZTtcclxuICAgICAgJHNsaWRlID0gc2xpZGUuJHNsaWRlO1xyXG5cclxuICAgICAgJHNsaWRlXHJcbiAgICAgICAgLm9mZihcInJlZnJlc2hcIilcclxuICAgICAgICAudHJpZ2dlcihcIm9uUmVzZXRcIilcclxuICAgICAgICAuYWRkQ2xhc3Moc2xpZGUub3B0cy5zbGlkZUNsYXNzKTtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBjb250ZW50IGRlcGVuZGluZyBvbiB0aGUgdHlwZVxyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiaW1hZ2VcIjpcclxuICAgICAgICAgIHNlbGYuc2V0SW1hZ2Uoc2xpZGUpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIFwiaWZyYW1lXCI6XHJcbiAgICAgICAgICBzZWxmLnNldElmcmFtZShzbGlkZSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJodG1sXCI6XHJcbiAgICAgICAgICBzZWxmLnNldENvbnRlbnQoc2xpZGUsIHNsaWRlLnNyYyB8fCBzbGlkZS5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcInZpZGVvXCI6XHJcbiAgICAgICAgICBzZWxmLnNldENvbnRlbnQoXHJcbiAgICAgICAgICAgIHNsaWRlLFxyXG4gICAgICAgICAgICBzbGlkZS5vcHRzLnZpZGVvLnRwbFxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx7XFx7c3JjXFx9XFx9L2dpLCBzbGlkZS5zcmMpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie3tmb3JtYXR9fVwiLCBzbGlkZS5vcHRzLnZpZGVvRm9ybWF0IHx8IHNsaWRlLm9wdHMudmlkZW8uZm9ybWF0IHx8IFwiXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie3twb3N0ZXJ9fVwiLCBzbGlkZS50aHVtYiB8fCBcIlwiKVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcImlubGluZVwiOlxyXG4gICAgICAgICAgaWYgKCQoc2xpZGUuc3JjKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRDb250ZW50KHNsaWRlLCAkKHNsaWRlLnNyYykpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRFcnJvcihzbGlkZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJhamF4XCI6XHJcbiAgICAgICAgICBzZWxmLnNob3dMb2FkaW5nKHNsaWRlKTtcclxuXHJcbiAgICAgICAgICBhamF4TG9hZCA9ICQuYWpheChcclxuICAgICAgICAgICAgJC5leHRlbmQoe30sIHNsaWRlLm9wdHMuYWpheC5zZXR0aW5ncywge1xyXG4gICAgICAgICAgICAgIHVybDogc2xpZGUuc3JjLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDb250ZW50KHNsaWRlLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqcVhIUiAmJiB0ZXh0U3RhdHVzICE9PSBcImFib3J0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFcnJvcihzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAkc2xpZGUub25lKFwib25SZXNldFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFqYXhMb2FkLmFib3J0KCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHNlbGYuc2V0RXJyb3Ioc2xpZGUpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXNlIHRodW1ibmFpbCBpbWFnZSwgaWYgcG9zc2libGVcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2V0SW1hZ2U6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZ2hvc3Q7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBuZWVkIHRvIHNob3cgbG9hZGluZyBpY29uXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkaW1nID0gc2xpZGUuJGltYWdlO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGYuaXNDbG9zaW5nICYmIHNsaWRlLmlzTG9hZGluZyAmJiAoISRpbWcgfHwgISRpbWcubGVuZ3RoIHx8ICEkaW1nWzBdLmNvbXBsZXRlKSAmJiAhc2xpZGUuaGFzRXJyb3IpIHtcclxuICAgICAgICAgIHNlbGYuc2hvd0xvYWRpbmcoc2xpZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgNTApO1xyXG5cclxuICAgICAgLy9DaGVjayBpZiBpbWFnZSBoYXMgc3Jjc2V0XHJcbiAgICAgIHNlbGYuY2hlY2tTcmNzZXQoc2xpZGUpO1xyXG5cclxuICAgICAgLy8gVGhpcyB3aWxsIGJlIHdyYXBwZXIgY29udGFpbmluZyBib3RoIGdob3N0IGFuZCBhY3R1YWwgaW1hZ2VcclxuICAgICAgc2xpZGUuJGNvbnRlbnQgPSAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtY29udGVudFwiPjwvZGl2PicpXHJcbiAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtaXMtaGlkZGVuXCIpXHJcbiAgICAgICAgLmFwcGVuZFRvKHNsaWRlLiRzbGlkZS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1pbWFnZVwiKSk7XHJcblxyXG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgdGh1bWJuYWlsLCB3ZSBjYW4gZGlzcGxheSBpdCB3aGlsZSBhY3R1YWwgaW1hZ2UgaXMgbG9hZGluZ1xyXG4gICAgICAvLyBVc2VycyB3aWxsIG5vdCBzdGFyZSBhdCBibGFjayBzY3JlZW4gYW5kIGFjdHVhbCBpbWFnZSB3aWxsIGFwcGVhciBncmFkdWFsbHlcclxuICAgICAgaWYgKHNsaWRlLm9wdHMucHJlbG9hZCAhPT0gZmFsc2UgJiYgc2xpZGUub3B0cy53aWR0aCAmJiBzbGlkZS5vcHRzLmhlaWdodCAmJiBzbGlkZS50aHVtYikge1xyXG4gICAgICAgIHNsaWRlLndpZHRoID0gc2xpZGUub3B0cy53aWR0aDtcclxuICAgICAgICBzbGlkZS5oZWlnaHQgPSBzbGlkZS5vcHRzLmhlaWdodDtcclxuXHJcbiAgICAgICAgZ2hvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG5cclxuICAgICAgICBnaG9zdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICBzbGlkZS4kZ2hvc3QgPSBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdob3N0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuYWZ0ZXJMb2FkKHNsaWRlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzbGlkZS4kZ2hvc3QgPSAkKGdob3N0KVxyXG4gICAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtaW1hZ2VcIilcclxuICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZS4kY29udGVudClcclxuICAgICAgICAgIC5hdHRyKFwic3JjXCIsIHNsaWRlLnRodW1iKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU3RhcnQgbG9hZGluZyBhY3R1YWwgaW1hZ2VcclxuICAgICAgc2VsZi5zZXRCaWdJbWFnZShzbGlkZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENoZWNrIGlmIGltYWdlIGhhcyBzcmNzZXQgYW5kIGdldCB0aGUgc291cmNlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY2hlY2tTcmNzZXQ6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgc3Jjc2V0ID0gc2xpZGUub3B0cy5zcmNzZXQgfHwgc2xpZGUub3B0cy5pbWFnZS5zcmNzZXQsXHJcbiAgICAgICAgZm91bmQsXHJcbiAgICAgICAgdGVtcCxcclxuICAgICAgICBweFJhdGlvLFxyXG4gICAgICAgIHdpbmRvd1dpZHRoO1xyXG5cclxuICAgICAgLy8gSWYgd2UgaGF2ZSBcInNyY3NldFwiLCB0aGVuIHdlIG5lZWQgdG8gZmluZCBmaXJzdCBtYXRjaGluZyBcInNyY1wiIHZhbHVlLlxyXG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSwgYmVjYXVzZSB3aGVuIHlvdSBzZXQgYW4gc3JjIGF0dHJpYnV0ZSwgdGhlIGJyb3dzZXIgd2lsbCBwcmVsb2FkIHRoZSBpbWFnZVxyXG4gICAgICAvLyBiZWZvcmUgYW55IGphdmFzY3JpcHQgb3IgZXZlbiBDU1MgaXMgYXBwbGllZC5cclxuICAgICAgaWYgKHNyY3NldCkge1xyXG4gICAgICAgIHB4UmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xyXG4gICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiBweFJhdGlvO1xyXG5cclxuICAgICAgICB0ZW1wID0gc3Jjc2V0LnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICB2YXIgcmV0ID0ge307XHJcblxyXG4gICAgICAgICAgZWwudHJpbSgpXHJcbiAgICAgICAgICAgIC5zcGxpdCgvXFxzKy8pXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xyXG4gICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsLnN1YnN0cmluZygwLCBlbC5sZW5ndGggLSAxKSwgMTApO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyZXQudXJsID0gZWwpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldC5wb3N0Zml4ID0gZWxbZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTb3J0IGJ5IHZhbHVlXHJcbiAgICAgICAgdGVtcC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICByZXR1cm4gYS52YWx1ZSAtIGIudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE9rLCBub3cgd2UgaGF2ZSBhbiBhcnJheSBvZiBhbGwgc3Jjc2V0IHZhbHVlc1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgdmFyIGVsID0gdGVtcFtqXTtcclxuXHJcbiAgICAgICAgICBpZiAoKGVsLnBvc3RmaXggPT09IFwid1wiICYmIGVsLnZhbHVlID49IHdpbmRvd1dpZHRoKSB8fCAoZWwucG9zdGZpeCA9PT0gXCJ4XCIgJiYgZWwudmFsdWUgPj0gcHhSYXRpbykpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBlbDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBub3QgZm91bmQsIHRha2UgdGhlIGxhc3Qgb25lXHJcbiAgICAgICAgaWYgKCFmb3VuZCAmJiB0ZW1wLmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB0ZW1wW3RlbXAubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICAgIHNsaWRlLnNyYyA9IGZvdW5kLnVybDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGRlZmF1bHQgd2lkdGgvaGVpZ2h0IHZhbHVlcywgd2UgY2FuIGNhbGN1bGF0ZSBoZWlnaHQgZm9yIG1hdGNoaW5nIHNvdXJjZVxyXG4gICAgICAgICAgaWYgKHNsaWRlLndpZHRoICYmIHNsaWRlLmhlaWdodCAmJiBmb3VuZC5wb3N0Zml4ID09IFwid1wiKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmhlaWdodCA9IChzbGlkZS53aWR0aCAvIHNsaWRlLmhlaWdodCkgKiBmb3VuZC52YWx1ZTtcclxuICAgICAgICAgICAgc2xpZGUud2lkdGggPSBmb3VuZC52YWx1ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzbGlkZS5vcHRzLnNyY3NldCA9IHNyY3NldDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ3JlYXRlIGZ1bGwtc2l6ZSBpbWFnZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHNldEJpZ0ltYWdlOiBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksXHJcbiAgICAgICAgJGltZyA9ICQoaW1nKTtcclxuXHJcbiAgICAgIHNsaWRlLiRpbWFnZSA9ICRpbWdcclxuICAgICAgICAub25lKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5zZXRFcnJvcihzbGlkZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub25lKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgc2l6ZXM7XHJcblxyXG4gICAgICAgICAgaWYgKCFzbGlkZS4kZ2hvc3QpIHtcclxuICAgICAgICAgICAgc2VsZi5yZXNvbHZlSW1hZ2VTbGlkZVNpemUoc2xpZGUsIHRoaXMubmF0dXJhbFdpZHRoLCB0aGlzLm5hdHVyYWxIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5hZnRlckxvYWQoc2xpZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNsaWRlLm9wdHMuc3Jjc2V0KSB7XHJcbiAgICAgICAgICAgIHNpemVzID0gc2xpZGUub3B0cy5zaXplcztcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZXMgfHwgc2l6ZXMgPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgICAgc2l6ZXMgPVxyXG4gICAgICAgICAgICAgICAgKHNsaWRlLndpZHRoIC8gc2xpZGUuaGVpZ2h0ID4gMSAmJiAkVy53aWR0aCgpIC8gJFcuaGVpZ2h0KCkgPiAxID8gXCIxMDBcIiA6IE1hdGgucm91bmQoKHNsaWRlLndpZHRoIC8gc2xpZGUuaGVpZ2h0KSAqIDEwMCkpICtcclxuICAgICAgICAgICAgICAgIFwidndcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGltZy5hdHRyKFwic2l6ZXNcIiwgc2l6ZXMpLmF0dHIoXCJzcmNzZXRcIiwgc2xpZGUub3B0cy5zcmNzZXQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhpZGUgdGVtcG9yYXJ5IGltYWdlIGFmdGVyIHNvbWUgZGVsYXlcclxuICAgICAgICAgIGlmIChzbGlkZS4kZ2hvc3QpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNsaWRlLiRnaG9zdCAmJiAhc2VsZi5pc0Nsb3NpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLiRnaG9zdC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBNYXRoLm1pbigzMDAsIE1hdGgubWF4KDEwMDAsIHNsaWRlLmhlaWdodCAvIDE2MDApKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi5oaWRlTG9hZGluZyhzbGlkZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkQ2xhc3MoXCJmYW5jeWJveC1pbWFnZVwiKVxyXG4gICAgICAgIC5hdHRyKFwic3JjXCIsIHNsaWRlLnNyYylcclxuICAgICAgICAuYXBwZW5kVG8oc2xpZGUuJGNvbnRlbnQpO1xyXG5cclxuICAgICAgaWYgKChpbWcuY29tcGxldGUgfHwgaW1nLnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKSAmJiAkaW1nLm5hdHVyYWxXaWR0aCAmJiAkaW1nLm5hdHVyYWxIZWlnaHQpIHtcclxuICAgICAgICAkaW1nLnRyaWdnZXIoXCJsb2FkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKGltZy5lcnJvcikge1xyXG4gICAgICAgICRpbWcudHJpZ2dlcihcImVycm9yXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENvbXB1dGVzIHRoZSBzbGlkZSBzaXplIGZyb20gaW1hZ2Ugc2l6ZSBhbmQgbWF4V2lkdGgvbWF4SGVpZ2h0XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHJlc29sdmVJbWFnZVNsaWRlU2l6ZTogZnVuY3Rpb24gKHNsaWRlLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KSB7XHJcbiAgICAgIHZhciBtYXhXaWR0aCA9IHBhcnNlSW50KHNsaWRlLm9wdHMud2lkdGgsIDEwKSxcclxuICAgICAgICBtYXhIZWlnaHQgPSBwYXJzZUludChzbGlkZS5vcHRzLmhlaWdodCwgMTApO1xyXG5cclxuICAgICAgLy8gU2V0cyB0aGUgZGVmYXVsdCB2YWx1ZXMgZnJvbSB0aGUgaW1hZ2VcclxuICAgICAgc2xpZGUud2lkdGggPSBpbWdXaWR0aDtcclxuICAgICAgc2xpZGUuaGVpZ2h0ID0gaW1nSGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKG1heFdpZHRoID4gMCkge1xyXG4gICAgICAgIHNsaWRlLndpZHRoID0gbWF4V2lkdGg7XHJcbiAgICAgICAgc2xpZGUuaGVpZ2h0ID0gTWF0aC5mbG9vcigobWF4V2lkdGggKiBpbWdIZWlnaHQpIC8gaW1nV2lkdGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobWF4SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgIHNsaWRlLndpZHRoID0gTWF0aC5mbG9vcigobWF4SGVpZ2h0ICogaW1nV2lkdGgpIC8gaW1nSGVpZ2h0KTtcclxuICAgICAgICBzbGlkZS5oZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ3JlYXRlIGlmcmFtZSB3cmFwcGVyLCBpZnJhbWUgYW5kIGJpbmRpbmdzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRJZnJhbWU6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb3B0cyA9IHNsaWRlLm9wdHMuaWZyYW1lLFxyXG4gICAgICAgICRzbGlkZSA9IHNsaWRlLiRzbGlkZSxcclxuICAgICAgICAkaWZyYW1lO1xyXG5cclxuICAgICAgc2xpZGUuJGNvbnRlbnQgPSAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtY29udGVudCcgKyAob3B0cy5wcmVsb2FkID8gXCIgZmFuY3lib3gtaXMtaGlkZGVuXCIgOiBcIlwiKSArICdcIj48L2Rpdj4nKVxyXG4gICAgICAgIC5jc3Mob3B0cy5jc3MpXHJcbiAgICAgICAgLmFwcGVuZFRvKCRzbGlkZSk7XHJcblxyXG4gICAgICAkc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tXCIgKyBzbGlkZS5jb250ZW50VHlwZSk7XHJcblxyXG4gICAgICBzbGlkZS4kaWZyYW1lID0gJGlmcmFtZSA9ICQob3B0cy50cGwucmVwbGFjZSgvXFx7cm5kXFx9L2csIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSlcclxuICAgICAgICAuYXR0cihvcHRzLmF0dHIpXHJcbiAgICAgICAgLmFwcGVuZFRvKHNsaWRlLiRjb250ZW50KTtcclxuXHJcbiAgICAgIGlmIChvcHRzLnByZWxvYWQpIHtcclxuICAgICAgICBzZWxmLnNob3dMb2FkaW5nKHNsaWRlKTtcclxuXHJcbiAgICAgICAgLy8gVW5mb3J0dW5hdGVseSwgaXQgaXMgbm90IGFsd2F5cyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgaWYgaWZyYW1lIGlzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcclxuICAgICAgICAvLyAoZHVlIHRvIGJyb3dzZXIgc2VjdXJpdHkgcG9saWN5KVxyXG5cclxuICAgICAgICAkaWZyYW1lLm9uKFwibG9hZC5mYiBlcnJvci5mYlwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgdGhpcy5pc1JlYWR5ID0gMTtcclxuXHJcbiAgICAgICAgICBzbGlkZS4kc2xpZGUudHJpZ2dlcihcInJlZnJlc2hcIik7XHJcblxyXG4gICAgICAgICAgc2VsZi5hZnRlckxvYWQoc2xpZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZWNhbGN1bGF0ZSBpZnJhbWUgY29udGVudCBzaXplXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICAkc2xpZGUub24oXCJyZWZyZXNoLmZiXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciAkY29udGVudCA9IHNsaWRlLiRjb250ZW50LFxyXG4gICAgICAgICAgICBmcmFtZVdpZHRoID0gb3B0cy5jc3Mud2lkdGgsXHJcbiAgICAgICAgICAgIGZyYW1lSGVpZ2h0ID0gb3B0cy5jc3MuaGVpZ2h0LFxyXG4gICAgICAgICAgICAkY29udGVudHMsXHJcbiAgICAgICAgICAgICRib2R5O1xyXG5cclxuICAgICAgICAgIGlmICgkaWZyYW1lWzBdLmlzUmVhZHkgIT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICRjb250ZW50cyA9ICRpZnJhbWUuY29udGVudHMoKTtcclxuICAgICAgICAgICAgJGJvZHkgPSAkY29udGVudHMuZmluZChcImJvZHlcIik7XHJcbiAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcblxyXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIGNvbnRlbnQgZGltZW5zaW9ucywgaWYgaXQgaXMgYWNjZXNzaWJsZVxyXG4gICAgICAgICAgaWYgKCRib2R5ICYmICRib2R5Lmxlbmd0aCAmJiAkYm9keS5jaGlsZHJlbigpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gdG9wIChpZiBtdWx0aXBsZSBpbnN0YW5jZXMpXHJcbiAgICAgICAgICAgICRzbGlkZS5jc3MoXCJvdmVyZmxvd1wiLCBcInZpc2libGVcIik7XHJcblxyXG4gICAgICAgICAgICAkY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICBcIm1heC13aWR0aFwiOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiOTk5OXB4XCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZnJhbWVXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZnJhbWVXaWR0aCA9IE1hdGguY2VpbChNYXRoLm1heCgkYm9keVswXS5jbGllbnRXaWR0aCwgJGJvZHkub3V0ZXJXaWR0aCh0cnVlKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY29udGVudC5jc3MoXCJ3aWR0aFwiLCBmcmFtZVdpZHRoID8gZnJhbWVXaWR0aCA6IFwiXCIpLmNzcyhcIm1heC13aWR0aFwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmcmFtZUhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZnJhbWVIZWlnaHQgPSBNYXRoLmNlaWwoTWF0aC5tYXgoJGJvZHlbMF0uY2xpZW50SGVpZ2h0LCAkYm9keS5vdXRlckhlaWdodCh0cnVlKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY29udGVudC5jc3MoXCJoZWlnaHRcIiwgZnJhbWVIZWlnaHQgPyBmcmFtZUhlaWdodCA6IFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlLmNzcyhcIm92ZXJmbG93XCIsIFwiYXV0b1wiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWlzLWhpZGRlblwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLmFmdGVyTG9hZChzbGlkZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRpZnJhbWUuYXR0cihcInNyY1wiLCBzbGlkZS5zcmMpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGlmcmFtZSBpZiBjbG9zaW5nIG9yIGNoYW5naW5nIGdhbGxlcnkgaXRlbVxyXG4gICAgICAkc2xpZGUub25lKFwib25SZXNldFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBoZWxwcyBJRSBub3QgdG8gdGhyb3cgZXJyb3JzIHdoZW4gY2xvc2luZ1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5maW5kKFwiaWZyYW1lXCIpXHJcbiAgICAgICAgICAgIC5oaWRlKClcclxuICAgICAgICAgICAgLnVuYmluZCgpXHJcbiAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiLy9hYm91dDpibGFua1wiKTtcclxuICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcblxyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgIC5vZmYoXCJyZWZyZXNoLmZiXCIpXHJcbiAgICAgICAgICAuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgc2xpZGUuaXNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc1JldmVhbGVkID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBXcmFwIGFuZCBhcHBlbmQgY29udGVudCB0byB0aGUgc2xpZGVcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2V0Q29udGVudDogZnVuY3Rpb24gKHNsaWRlLCBjb250ZW50KSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5oaWRlTG9hZGluZyhzbGlkZSk7XHJcblxyXG4gICAgICBpZiAoc2xpZGUuJGNvbnRlbnQpIHtcclxuICAgICAgICAkLmZhbmN5Ym94LnN0b3Aoc2xpZGUuJGNvbnRlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzbGlkZS4kc2xpZGUuZW1wdHkoKTtcclxuXHJcbiAgICAgIC8vIElmIGNvbnRlbnQgaXMgYSBqUXVlcnkgb2JqZWN0LCB0aGVuIGl0IHdpbGwgYmUgbW92ZWQgdG8gdGhlIHNsaWRlLlxyXG4gICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgaXMgY3JlYXRlZCBzbyB3ZSB3aWxsIGtub3cgd2hlcmUgdG8gcHV0IGl0IGJhY2suXHJcbiAgICAgIGlmIChpc1F1ZXJ5KGNvbnRlbnQpICYmIGNvbnRlbnQucGFyZW50KCkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGNvbnRlbnQgaXMgbm90IGFscmVhZHkgbW92ZWQgdG8gZmFuY3lCb3hcclxuICAgICAgICBpZiAoY29udGVudC5oYXNDbGFzcyhcImZhbmN5Ym94LWNvbnRlbnRcIikgfHwgY29udGVudC5wYXJlbnQoKS5oYXNDbGFzcyhcImZhbmN5Ym94LWNvbnRlbnRcIikpIHtcclxuICAgICAgICAgIGNvbnRlbnQucGFyZW50cyhcIi5mYW5jeWJveC1zbGlkZVwiKS50cmlnZ2VyKFwib25SZXNldFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0ZW1wb3JhcnkgZWxlbWVudCBtYXJraW5nIG9yaWdpbmFsIHBsYWNlIG9mIHRoZSBjb250ZW50XHJcbiAgICAgICAgc2xpZGUuJHBsYWNlaG9sZGVyID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAuaGlkZSgpXHJcbiAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoY29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjb250ZW50IGlzIHZpc2libGVcclxuICAgICAgICBjb250ZW50LmNzcyhcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXNsaWRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgLy8gSWYgY29udGVudCBpcyBqdXN0IGEgcGxhaW4gdGV4dCwgdHJ5IHRvIGNvbnZlcnQgaXQgdG8gaHRtbFxyXG4gICAgICAgIGlmICgkLnR5cGUoY29udGVudCkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIGNvbnRlbnQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLmFwcGVuZCgkLnRyaW0oY29udGVudCkpXHJcbiAgICAgICAgICAgIC5jb250ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgXCJmaWx0ZXJcIiBvcHRpb24gaXMgcHJvdmlkZWQsIHRoZW4gZmlsdGVyIGNvbnRlbnRcclxuICAgICAgICBpZiAoc2xpZGUub3B0cy5maWx0ZXIpIHtcclxuICAgICAgICAgIGNvbnRlbnQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLmh0bWwoY29udGVudClcclxuICAgICAgICAgICAgLmZpbmQoc2xpZGUub3B0cy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuJHNsaWRlLm9uZShcIm9uUmVzZXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFBhdXNlIGFsbCBodG1sNSB2aWRlby9hdWRpb1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgIC5maW5kKFwidmlkZW8sYXVkaW9cIilcclxuICAgICAgICAgIC50cmlnZ2VyKFwicGF1c2VcIik7XHJcblxyXG4gICAgICAgIC8vIFB1dCBjb250ZW50IGJhY2tcclxuICAgICAgICBpZiAoc2xpZGUuJHBsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICBzbGlkZS4kcGxhY2Vob2xkZXIuYWZ0ZXIoY29udGVudC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWNvbnRlbnRcIikuaGlkZSgpKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICBzbGlkZS4kcGxhY2Vob2xkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1c3RvbSBjbG9zZSBidXR0b25cclxuICAgICAgICBpZiAoc2xpZGUuJHNtYWxsQnRuKSB7XHJcbiAgICAgICAgICBzbGlkZS4kc21hbGxCdG4ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgc2xpZGUuJHNtYWxsQnRuID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjb250ZW50IGFuZCBtYXJrIHNsaWRlIGFzIG5vdCBsb2FkZWRcclxuICAgICAgICBpZiAoIXNsaWRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgc2xpZGUuaXNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHNsaWRlLmlzUmV2ZWFsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChjb250ZW50KS5hcHBlbmRUbyhzbGlkZS4kc2xpZGUpO1xyXG5cclxuICAgICAgaWYgKCQoY29udGVudCkuaXMoXCJ2aWRlbyxhdWRpb1wiKSkge1xyXG4gICAgICAgICQoY29udGVudCkuYWRkQ2xhc3MoXCJmYW5jeWJveC12aWRlb1wiKTtcclxuXHJcbiAgICAgICAgJChjb250ZW50KS53cmFwKFwiPGRpdj48L2Rpdj5cIik7XHJcblxyXG4gICAgICAgIHNsaWRlLmNvbnRlbnRUeXBlID0gXCJ2aWRlb1wiO1xyXG5cclxuICAgICAgICBzbGlkZS5vcHRzLndpZHRoID0gc2xpZGUub3B0cy53aWR0aCB8fCAkKGNvbnRlbnQpLmF0dHIoXCJ3aWR0aFwiKTtcclxuICAgICAgICBzbGlkZS5vcHRzLmhlaWdodCA9IHNsaWRlLm9wdHMuaGVpZ2h0IHx8ICQoY29udGVudCkuYXR0cihcImhlaWdodFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuJGNvbnRlbnQgPSBzbGlkZS4kc2xpZGVcclxuICAgICAgICAuY2hpbGRyZW4oKVxyXG4gICAgICAgIC5maWx0ZXIoXCJkaXYsZm9ybSxtYWluLHZpZGVvLGF1ZGlvLGFydGljbGUsLmZhbmN5Ym94LWNvbnRlbnRcIilcclxuICAgICAgICAuZmlyc3QoKTtcclxuXHJcbiAgICAgIHNsaWRlLiRjb250ZW50LnNpYmxpbmdzKCkuaGlkZSgpO1xyXG5cclxuICAgICAgLy8gUmUtY2hlY2sgaWYgdGhlcmUgaXMgYSB2YWxpZCBjb250ZW50XHJcbiAgICAgIC8vIChpbiBzb21lIGNhc2VzLCBhamF4IHJlc3BvbnNlIGNhbiBjb250YWluIHZhcmlvdXMgZWxlbWVudHMgb3IgcGxhaW4gdGV4dClcclxuICAgICAgaWYgKCFzbGlkZS4kY29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICBzbGlkZS4kY29udGVudCA9IHNsaWRlLiRzbGlkZVxyXG4gICAgICAgICAgLndyYXBJbm5lcihcIjxkaXY+PC9kaXY+XCIpXHJcbiAgICAgICAgICAuY2hpbGRyZW4oKVxyXG4gICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNsaWRlLiRjb250ZW50LmFkZENsYXNzKFwiZmFuY3lib3gtY29udGVudFwiKTtcclxuXHJcbiAgICAgIHNsaWRlLiRzbGlkZS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1cIiArIHNsaWRlLmNvbnRlbnRUeXBlKTtcclxuXHJcbiAgICAgIHNlbGYuYWZ0ZXJMb2FkKHNsaWRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRFcnJvcjogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHNsaWRlLmhhc0Vycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgIHNsaWRlLiRzbGlkZVxyXG4gICAgICAgIC50cmlnZ2VyKFwib25SZXNldFwiKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1cIiArIHNsaWRlLmNvbnRlbnRUeXBlKVxyXG4gICAgICAgIC5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1lcnJvclwiKTtcclxuXHJcbiAgICAgIHNsaWRlLmNvbnRlbnRUeXBlID0gXCJodG1sXCI7XHJcblxyXG4gICAgICB0aGlzLnNldENvbnRlbnQoc2xpZGUsIHRoaXMudHJhbnNsYXRlKHNsaWRlLCBzbGlkZS5vcHRzLmVycm9yVHBsKSk7XHJcblxyXG4gICAgICBpZiAoc2xpZGUucG9zID09PSB0aGlzLmN1cnJQb3MpIHtcclxuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU2hvdyBsb2FkaW5nIGljb24gaW5zaWRlIHRoZSBzbGlkZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHNob3dMb2FkaW5nOiBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgc2xpZGUgPSBzbGlkZSB8fCBzZWxmLmN1cnJlbnQ7XHJcblxyXG4gICAgICBpZiAoc2xpZGUgJiYgIXNsaWRlLiRzcGlubmVyKSB7XHJcbiAgICAgICAgc2xpZGUuJHNwaW5uZXIgPSAkKHNlbGYudHJhbnNsYXRlKHNlbGYsIHNlbGYub3B0cy5zcGlubmVyVHBsKSlcclxuICAgICAgICAgIC5hcHBlbmRUbyhzbGlkZS4kc2xpZGUpXHJcbiAgICAgICAgICAuaGlkZSgpXHJcbiAgICAgICAgICAuZmFkZUluKFwiZmFzdFwiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBSZW1vdmUgbG9hZGluZyBpY29uIGZyb20gdGhlIHNsaWRlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaGlkZUxvYWRpbmc6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBzbGlkZSA9IHNsaWRlIHx8IHNlbGYuY3VycmVudDtcclxuXHJcbiAgICAgIGlmIChzbGlkZSAmJiBzbGlkZS4kc3Bpbm5lcikge1xyXG4gICAgICAgIHNsaWRlLiRzcGlubmVyLnN0b3AoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIHNsaWRlLiRzcGlubmVyO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEFkanVzdG1lbnRzIGFmdGVyIHNsaWRlIGNvbnRlbnQgaGFzIGJlZW4gbG9hZGVkXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGFmdGVyTG9hZDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHNsaWRlLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHNlbGYudHJpZ2dlcihcImFmdGVyTG9hZFwiLCBzbGlkZSk7XHJcblxyXG4gICAgICBzZWxmLmhpZGVMb2FkaW5nKHNsaWRlKTtcclxuXHJcbiAgICAgIC8vIEFkZCBzbWFsbCBjbG9zZSBidXR0b25cclxuICAgICAgaWYgKHNsaWRlLm9wdHMuc21hbGxCdG4gJiYgKCFzbGlkZS4kc21hbGxCdG4gfHwgIXNsaWRlLiRzbWFsbEJ0bi5sZW5ndGgpKSB7XHJcbiAgICAgICAgc2xpZGUuJHNtYWxsQnRuID0gJChzZWxmLnRyYW5zbGF0ZShzbGlkZSwgc2xpZGUub3B0cy5idG5UcGwuc21hbGxCdG4pKS5hcHBlbmRUbyhzbGlkZS4kY29udGVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERpc2FibGUgcmlnaHQgY2xpY2tcclxuICAgICAgaWYgKHNsaWRlLm9wdHMucHJvdGVjdCAmJiBzbGlkZS4kY29udGVudCAmJiAhc2xpZGUuaGFzRXJyb3IpIHtcclxuICAgICAgICBzbGlkZS4kY29udGVudC5vbihcImNvbnRleHRtZW51LmZiXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBpZiAoZS5idXR0b24gPT0gMikge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBmYWtlIGVsZW1lbnQgb24gdG9wIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgIC8vIFRoaXMgbWFrZXMgYSBiaXQgaGFyZGVyIGZvciB1c2VyIHRvIHNlbGVjdCBpbWFnZVxyXG4gICAgICAgIGlmIChzbGlkZS50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1zcGFjZWJhbGxcIj48L2Rpdj4nKS5hcHBlbmRUbyhzbGlkZS4kY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmFkanVzdENhcHRpb24oc2xpZGUpO1xyXG5cclxuICAgICAgc2VsZi5hZGp1c3RMYXlvdXQoc2xpZGUpO1xyXG5cclxuICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgc2VsZi51cGRhdGVDdXJzb3IoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5yZXZlYWxDb250ZW50KHNsaWRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gUHJldmVudCBjYXB0aW9uIG92ZXJsYXAsXHJcbiAgICAvLyBmaXggY3NzIGluY29uc2lzdGVuY3kgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgYWRqdXN0Q2FwdGlvbjogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2xpZGUgfHwgc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIGNhcHRpb24gPSBjdXJyZW50Lm9wdHMuY2FwdGlvbixcclxuICAgICAgICBwcmV2ZW50T3ZlcmxhcCA9IGN1cnJlbnQub3B0cy5wcmV2ZW50Q2FwdGlvbk92ZXJsYXAsXHJcbiAgICAgICAgJGNhcHRpb24gPSBzZWxmLiRyZWZzLmNhcHRpb24sXHJcbiAgICAgICAgJGNsb25lLFxyXG4gICAgICAgIGNhcHRpb25IID0gZmFsc2U7XHJcblxyXG4gICAgICAkY2FwdGlvbi50b2dnbGVDbGFzcyhcImZhbmN5Ym94LWNhcHRpb24tLXNlcGFyYXRlXCIsIHByZXZlbnRPdmVybGFwKTtcclxuXHJcbiAgICAgIGlmIChwcmV2ZW50T3ZlcmxhcCAmJiBjYXB0aW9uICYmIGNhcHRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQucG9zICE9PSBzZWxmLmN1cnJQb3MpIHtcclxuICAgICAgICAgICRjbG9uZSA9ICRjYXB0aW9uLmNsb25lKCkuYXBwZW5kVG8oJGNhcHRpb24ucGFyZW50KCkpO1xyXG5cclxuICAgICAgICAgICRjbG9uZVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oKVxyXG4gICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgLmVtcHR5KClcclxuICAgICAgICAgICAgLmh0bWwoY2FwdGlvbik7XHJcblxyXG4gICAgICAgICAgY2FwdGlvbkggPSAkY2xvbmUub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgJGNsb25lLmVtcHR5KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLiRjYXB0aW9uKSB7XHJcbiAgICAgICAgICBjYXB0aW9uSCA9IHNlbGYuJGNhcHRpb24ub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50LiRzbGlkZS5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiLCBjYXB0aW9uSCB8fCBcIlwiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTaW1wbGUgaGFjayB0byBmaXggaW5jb25zaXN0ZW5jeSBhY3Jvc3MgYnJvd3NlcnMsIGRlc2NyaWJlZCBoZXJlIChhZmZlY3RzIEVkZ2UsIHRvbyk6XHJcbiAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NDg1MThcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGFkanVzdExheW91dDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2xpZGUgfHwgc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIHNjcm9sbEhlaWdodCxcclxuICAgICAgICBtYXJnaW5Cb3R0b20sXHJcbiAgICAgICAgaW5saW5lUGFkZGluZyxcclxuICAgICAgICBhY3R1YWxQYWRkaW5nO1xyXG5cclxuICAgICAgaWYgKGN1cnJlbnQuaXNMb2FkZWQgJiYgY3VycmVudC5vcHRzLmRpc2FibGVMYXlvdXRGaXggIT09IHRydWUpIHtcclxuICAgICAgICBjdXJyZW50LiRjb250ZW50LmNzcyhcIm1hcmdpbi1ib3R0b21cIiwgXCJcIik7XHJcblxyXG4gICAgICAgIC8vIElmIHdlIHdvdWxkIGFsd2F5cyBzZXQgbWFyZ2luLWJvdHRvbSBmb3IgdGhlIGNvbnRlbnQsXHJcbiAgICAgICAgLy8gdGhlbiBpdCB3b3VsZCBwb3RlbnRpYWxseSBicmVhayB2ZXJ0aWNhbCBhbGlnblxyXG4gICAgICAgIGlmIChjdXJyZW50LiRjb250ZW50Lm91dGVySGVpZ2h0KCkgPiBjdXJyZW50LiRzbGlkZS5oZWlnaHQoKSArIDAuNSkge1xyXG4gICAgICAgICAgaW5saW5lUGFkZGluZyA9IGN1cnJlbnQuJHNsaWRlWzBdLnN0eWxlW1wicGFkZGluZy1ib3R0b21cIl07XHJcbiAgICAgICAgICBhY3R1YWxQYWRkaW5nID0gY3VycmVudC4kc2xpZGUuY3NzKFwicGFkZGluZy1ib3R0b21cIik7XHJcblxyXG4gICAgICAgICAgaWYgKHBhcnNlRmxvYXQoYWN0dWFsUGFkZGluZykgPiAwKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IGN1cnJlbnQuJHNsaWRlWzBdLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnQuJHNsaWRlLmNzcyhcInBhZGRpbmctYm90dG9tXCIsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHNjcm9sbEhlaWdodCAtIGN1cnJlbnQuJHNsaWRlWzBdLnNjcm9sbEhlaWdodCkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tID0gYWN0dWFsUGFkZGluZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudC4kc2xpZGUuY3NzKFwicGFkZGluZy1ib3R0b21cIiwgaW5saW5lUGFkZGluZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50LiRjb250ZW50LmNzcyhcIm1hcmdpbi1ib3R0b21cIiwgbWFyZ2luQm90dG9tKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBNYWtlIGNvbnRlbnQgdmlzaWJsZVxyXG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIHJpZ2h0IGFmdGVyIGNvbnRlbnQgaGFzIGJlZW4gbG9hZGVkIG9yXHJcbiAgICAvLyB1c2VyIG5hdmlnYXRlcyBnYWxsZXJ5IGFuZCB0cmFuc2l0aW9uIHNob3VsZCBzdGFydFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgcmV2ZWFsQ29udGVudDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAkc2xpZGUgPSBzbGlkZS4kc2xpZGUsXHJcbiAgICAgICAgZW5kID0gZmFsc2UsXHJcbiAgICAgICAgc3RhcnQgPSBmYWxzZSxcclxuICAgICAgICBpc01vdmVkID0gc2VsZi5pc01vdmVkKHNsaWRlKSxcclxuICAgICAgICBpc1JldmVhbGVkID0gc2xpZGUuaXNSZXZlYWxlZCxcclxuICAgICAgICBlZmZlY3QsXHJcbiAgICAgICAgZWZmZWN0Q2xhc3NOYW1lLFxyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICAgIG9wYWNpdHk7XHJcblxyXG4gICAgICBzbGlkZS5pc1JldmVhbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGVmZmVjdCA9IHNsaWRlLm9wdHNbc2VsZi5maXJzdFJ1biA/IFwiYW5pbWF0aW9uRWZmZWN0XCIgOiBcInRyYW5zaXRpb25FZmZlY3RcIl07XHJcbiAgICAgIGR1cmF0aW9uID0gc2xpZGUub3B0c1tzZWxmLmZpcnN0UnVuID8gXCJhbmltYXRpb25EdXJhdGlvblwiIDogXCJ0cmFuc2l0aW9uRHVyYXRpb25cIl07XHJcblxyXG4gICAgICBkdXJhdGlvbiA9IHBhcnNlSW50KHNsaWRlLmZvcmNlZER1cmF0aW9uID09PSB1bmRlZmluZWQgPyBkdXJhdGlvbiA6IHNsaWRlLmZvcmNlZER1cmF0aW9uLCAxMCk7XHJcblxyXG4gICAgICBpZiAoaXNNb3ZlZCB8fCBzbGlkZS5wb3MgIT09IHNlbGYuY3VyclBvcyB8fCAhZHVyYXRpb24pIHtcclxuICAgICAgICBlZmZlY3QgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgY2FuIHpvb21cclxuICAgICAgaWYgKGVmZmVjdCA9PT0gXCJ6b29tXCIpIHtcclxuICAgICAgICBpZiAoc2xpZGUucG9zID09PSBzZWxmLmN1cnJQb3MgJiYgZHVyYXRpb24gJiYgc2xpZGUudHlwZSA9PT0gXCJpbWFnZVwiICYmICFzbGlkZS5oYXNFcnJvciAmJiAoc3RhcnQgPSBzZWxmLmdldFRodW1iUG9zKHNsaWRlKSkpIHtcclxuICAgICAgICAgIGVuZCA9IHNlbGYuZ2V0Rml0UG9zKHNsaWRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWZmZWN0ID0gXCJmYWRlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBab29tIGFuaW1hdGlvblxyXG4gICAgICAvLyA9PT09PT09PT09PT09PVxyXG4gICAgICBpZiAoZWZmZWN0ID09PSBcInpvb21cIikge1xyXG4gICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBlbmQuc2NhbGVYID0gZW5kLndpZHRoIC8gc3RhcnQud2lkdGg7XHJcbiAgICAgICAgZW5kLnNjYWxlWSA9IGVuZC5oZWlnaHQgLyBzdGFydC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gYW5pbWF0ZSBvcGFjaXR5XHJcbiAgICAgICAgb3BhY2l0eSA9IHNsaWRlLm9wdHMuem9vbU9wYWNpdHk7XHJcblxyXG4gICAgICAgIGlmIChvcGFjaXR5ID09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICBvcGFjaXR5ID0gTWF0aC5hYnMoc2xpZGUud2lkdGggLyBzbGlkZS5oZWlnaHQgLSBzdGFydC53aWR0aCAvIHN0YXJ0LmhlaWdodCkgPiAwLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3BhY2l0eSkge1xyXG4gICAgICAgICAgc3RhcnQub3BhY2l0eSA9IDAuMTtcclxuICAgICAgICAgIGVuZC5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERyYXcgaW1hZ2UgYXQgc3RhcnQgcG9zaXRpb25cclxuICAgICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZShzbGlkZS4kY29udGVudC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWlzLWhpZGRlblwiKSwgc3RhcnQpO1xyXG5cclxuICAgICAgICBmb3JjZVJlZHJhdyhzbGlkZS4kY29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IGFuaW1hdGlvblxyXG4gICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShzbGlkZS4kY29udGVudCwgZW5kLCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIHNlbGYuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZVNsaWRlKHNsaWRlKTtcclxuXHJcbiAgICAgIC8vIFNpbXBseSBzaG93IGNvbnRlbnQgaWYgbm8gZWZmZWN0XHJcbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgIGlmICghZWZmZWN0KSB7XHJcbiAgICAgICAgc2xpZGUuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAgIGlmICghaXNSZXZlYWxlZCAmJiBpc01vdmVkICYmIHNsaWRlLnR5cGUgPT09IFwiaW1hZ2VcIiAmJiAhc2xpZGUuaGFzRXJyb3IpIHtcclxuICAgICAgICAgIHNsaWRlLiRjb250ZW50LmhpZGUoKS5mYWRlSW4oXCJmYXN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgICBzZWxmLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBhcmUgZm9yIENTUyB0cmFuc2l0b25cclxuICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAkLmZhbmN5Ym94LnN0b3AoJHNsaWRlKTtcclxuXHJcbiAgICAgIC8vZWZmZWN0Q2xhc3NOYW1lID0gXCJmYW5jeWJveC1hbmltYXRlZCBmYW5jeWJveC1zbGlkZS0tXCIgKyAoc2xpZGUucG9zID49IHNlbGYucHJldlBvcyA/IFwibmV4dFwiIDogXCJwcmV2aW91c1wiKSArIFwiIGZhbmN5Ym94LWZ4LVwiICsgZWZmZWN0O1xyXG4gICAgICBlZmZlY3RDbGFzc05hbWUgPSBcImZhbmN5Ym94LXNsaWRlLS1cIiArIChzbGlkZS5wb3MgPj0gc2VsZi5wcmV2UG9zID8gXCJuZXh0XCIgOiBcInByZXZpb3VzXCIpICsgXCIgZmFuY3lib3gtYW5pbWF0ZWQgZmFuY3lib3gtZngtXCIgKyBlZmZlY3Q7XHJcblxyXG4gICAgICAkc2xpZGUuYWRkQ2xhc3MoZWZmZWN0Q2xhc3NOYW1lKS5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jdXJyZW50XCIpOyAvLy5hZGRDbGFzcyhlZmZlY3RDbGFzc05hbWUpO1xyXG5cclxuICAgICAgc2xpZGUuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAvLyBGb3JjZSByZWZsb3dcclxuICAgICAgZm9yY2VSZWRyYXcoJHNsaWRlKTtcclxuXHJcbiAgICAgIGlmIChzbGlkZS50eXBlICE9PSBcImltYWdlXCIpIHtcclxuICAgICAgICBzbGlkZS4kY29udGVudC5oaWRlKCkuc2hvdygwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJC5mYW5jeWJveC5hbmltYXRlKFxyXG4gICAgICAgICRzbGlkZSxcclxuICAgICAgICBcImZhbmN5Ym94LXNsaWRlLS1jdXJyZW50XCIsXHJcbiAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHNsaWRlLnJlbW92ZUNsYXNzKGVmZmVjdENsYXNzTmFtZSkuY3NzKHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBcIlwiLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiBcIlwiXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2xpZGUucG9zID09PSBzZWxmLmN1cnJQb3MpIHtcclxuICAgICAgICAgICAgc2VsZi5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGVjayBpZiB3ZSBjYW4gYW5kIGhhdmUgdG8gem9vbSBmcm9tIHRodW1ibmFpbFxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBnZXRUaHVtYlBvczogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgIHZhciByZXogPSBmYWxzZSxcclxuICAgICAgICAkdGh1bWIgPSBzbGlkZS4kdGh1bWIsXHJcbiAgICAgICAgdGh1bWJQb3MsXHJcbiAgICAgICAgYnR3LFxyXG4gICAgICAgIGJydyxcclxuICAgICAgICBiYncsXHJcbiAgICAgICAgYmx3O1xyXG5cclxuICAgICAgaWYgKCEkdGh1bWIgfHwgIWluVmlld3BvcnQoJHRodW1iWzBdKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGh1bWJQb3MgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZSgkdGh1bWIpO1xyXG5cclxuICAgICAgYnR3ID0gcGFyc2VGbG9hdCgkdGh1bWIuY3NzKFwiYm9yZGVyLXRvcC13aWR0aFwiKSB8fCAwKTtcclxuICAgICAgYnJ3ID0gcGFyc2VGbG9hdCgkdGh1bWIuY3NzKFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIpIHx8IDApO1xyXG4gICAgICBiYncgPSBwYXJzZUZsb2F0KCR0aHVtYi5jc3MoXCJib3JkZXItYm90dG9tLXdpZHRoXCIpIHx8IDApO1xyXG4gICAgICBibHcgPSBwYXJzZUZsb2F0KCR0aHVtYi5jc3MoXCJib3JkZXItbGVmdC13aWR0aFwiKSB8fCAwKTtcclxuXHJcbiAgICAgIHJleiA9IHtcclxuICAgICAgICB0b3A6IHRodW1iUG9zLnRvcCArIGJ0dyxcclxuICAgICAgICBsZWZ0OiB0aHVtYlBvcy5sZWZ0ICsgYmx3LFxyXG4gICAgICAgIHdpZHRoOiB0aHVtYlBvcy53aWR0aCAtIGJydyAtIGJsdyxcclxuICAgICAgICBoZWlnaHQ6IHRodW1iUG9zLmhlaWdodCAtIGJ0dyAtIGJidyxcclxuICAgICAgICBzY2FsZVg6IDEsXHJcbiAgICAgICAgc2NhbGVZOiAxXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gdGh1bWJQb3Mud2lkdGggPiAwICYmIHRodW1iUG9zLmhlaWdodCA+IDAgPyByZXogOiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRmluYWwgYWRqdXN0bWVudHMgYWZ0ZXIgY3VycmVudCBnYWxsZXJ5IGl0ZW0gaXMgbW92ZWQgdG8gcG9zaXRpb25cclxuICAgIC8vIGFuZCBpdGBzIGNvbnRlbnQgaXMgbG9hZGVkXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY3VycmVudCA9IHNlbGYuY3VycmVudCxcclxuICAgICAgICBzbGlkZXMgPSB7fSxcclxuICAgICAgICAkZWw7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc01vdmVkKCkgfHwgIWN1cnJlbnQuaXNMb2FkZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY3VycmVudC5pc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgY3VycmVudC5pc0NvbXBsZXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY3VycmVudC4kc2xpZGUuc2libGluZ3MoKS50cmlnZ2VyKFwib25SZXNldFwiKTtcclxuXHJcbiAgICAgICAgc2VsZi5wcmVsb2FkKFwiaW5saW5lXCIpO1xyXG5cclxuICAgICAgICAvLyBUcmlnZ2VyIGFueSBDU1MgdHJhbnNpdG9uIGluc2lkZSB0aGUgc2xpZGVcclxuICAgICAgICBmb3JjZVJlZHJhdyhjdXJyZW50LiRzbGlkZSk7XHJcblxyXG4gICAgICAgIGN1cnJlbnQuJHNsaWRlLmFkZENsYXNzKFwiZmFuY3lib3gtc2xpZGUtLWNvbXBsZXRlXCIpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdW5uZWNlc3Nhcnkgc2xpZGVzXHJcbiAgICAgICAgJC5lYWNoKHNlbGYuc2xpZGVzLCBmdW5jdGlvbiAoa2V5LCBzbGlkZSkge1xyXG4gICAgICAgICAgaWYgKHNsaWRlLnBvcyA+PSBzZWxmLmN1cnJQb3MgLSAxICYmIHNsaWRlLnBvcyA8PSBzZWxmLmN1cnJQb3MgKyAxKSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1tzbGlkZS5wb3NdID0gc2xpZGU7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlKSB7XHJcbiAgICAgICAgICAgICQuZmFuY3lib3guc3RvcChzbGlkZS4kc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgc2xpZGUuJHNsaWRlLm9mZigpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLnNsaWRlcyA9IHNsaWRlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgc2VsZi51cGRhdGVDdXJzb3IoKTtcclxuXHJcbiAgICAgIHNlbGYudHJpZ2dlcihcImFmdGVyU2hvd1wiKTtcclxuXHJcbiAgICAgIC8vIEF1dG9wbGF5IGZpcnN0IGh0bWw1IHZpZGVvL2F1ZGlvXHJcbiAgICAgIGlmICghIWN1cnJlbnQub3B0cy52aWRlby5hdXRvU3RhcnQpIHtcclxuICAgICAgICBjdXJyZW50LiRzbGlkZVxyXG4gICAgICAgICAgLmZpbmQoXCJ2aWRlbyxhdWRpb1wiKVxyXG4gICAgICAgICAgLmZpbHRlcihcIjp2aXNpYmxlOmZpcnN0XCIpXHJcbiAgICAgICAgICAudHJpZ2dlcihcInBsYXlcIilcclxuICAgICAgICAgIC5vbmUoXCJlbmRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChEb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAgIERvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAgIHRoaXMud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5uZXh0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVHJ5IHRvIGZvY3VzIG9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudFxyXG4gICAgICBpZiAoY3VycmVudC5vcHRzLmF1dG9Gb2N1cyAmJiBjdXJyZW50LmNvbnRlbnRUeXBlID09PSBcImh0bWxcIikge1xyXG4gICAgICAgIC8vIExvb2sgZm9yIHRoZSBmaXJzdCBpbnB1dCB3aXRoIGF1dG9mb2N1cyBhdHRyaWJ1dGVcclxuICAgICAgICAkZWwgPSBjdXJyZW50LiRjb250ZW50LmZpbmQoXCJpbnB1dFthdXRvZm9jdXNdOmVuYWJsZWQ6dmlzaWJsZTpmaXJzdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCRlbC5sZW5ndGgpIHtcclxuICAgICAgICAgICRlbC50cmlnZ2VyKFwiZm9jdXNcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGYuZm9jdXMobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBdm9pZCBqdW1waW5nXHJcbiAgICAgIGN1cnJlbnQuJHNsaWRlLnNjcm9sbFRvcCgwKS5zY3JvbGxMZWZ0KDApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBQcmVsb2FkIG5leHQgYW5kIHByZXZpb3VzIHNsaWRlc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBwcmVsb2FkOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcHJldixcclxuICAgICAgICBuZXh0O1xyXG5cclxuICAgICAgaWYgKHNlbGYuZ3JvdXAubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmV4dCA9IHNlbGYuc2xpZGVzW3NlbGYuY3VyclBvcyArIDFdO1xyXG4gICAgICBwcmV2ID0gc2VsZi5zbGlkZXNbc2VsZi5jdXJyUG9zIC0gMV07XHJcblxyXG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICBzZWxmLmxvYWRTbGlkZShwcmV2KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5leHQgJiYgbmV4dC50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgc2VsZi5sb2FkU2xpZGUobmV4dCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gVHJ5IHRvIGZpbmQgYW5kIGZvY3VzIG9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGZvY3VzOiBmdW5jdGlvbiAoZSwgZmlyc3RSdW4pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGZvY3VzYWJsZVN0ciA9IFtcclxuICAgICAgICAgIFwiYVtocmVmXVwiLFxyXG4gICAgICAgICAgXCJhcmVhW2hyZWZdXCIsXHJcbiAgICAgICAgICAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcclxuICAgICAgICAgIFwic2VsZWN0Om5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSlcIixcclxuICAgICAgICAgIFwidGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKVwiLFxyXG4gICAgICAgICAgXCJidXR0b246bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKVwiLFxyXG4gICAgICAgICAgXCJpZnJhbWVcIixcclxuICAgICAgICAgIFwib2JqZWN0XCIsXHJcbiAgICAgICAgICBcImVtYmVkXCIsXHJcbiAgICAgICAgICBcInZpZGVvXCIsXHJcbiAgICAgICAgICBcImF1ZGlvXCIsXHJcbiAgICAgICAgICBcIltjb250ZW50ZWRpdGFibGVdXCIsXHJcbiAgICAgICAgICAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJ1xyXG4gICAgICAgIF0uam9pbihcIixcIiksXHJcbiAgICAgICAgZm9jdXNhYmxlSXRlbXMsXHJcbiAgICAgICAgZm9jdXNlZEl0ZW1JbmRleDtcclxuXHJcbiAgICAgIGlmIChzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGUgfHwgIXNlbGYuY3VycmVudCB8fCAhc2VsZi5jdXJyZW50LmlzQ29tcGxldGUpIHtcclxuICAgICAgICAvLyBGb2N1cyBvbiBhbnkgZWxlbWVudCBpbnNpZGUgZmFuY3lib3hcclxuICAgICAgICBmb2N1c2FibGVJdGVtcyA9IHNlbGYuJHJlZnMuY29udGFpbmVyLmZpbmQoXCIqOnZpc2libGVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRm9jdXMgaW5zaWRlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICBmb2N1c2FibGVJdGVtcyA9IHNlbGYuY3VycmVudC4kc2xpZGUuZmluZChcIio6dmlzaWJsZVwiICsgKGZpcnN0UnVuID8gXCI6bm90KC5mYW5jeWJveC1jbG9zZS1zbWFsbClcIiA6IFwiXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9jdXNhYmxlSXRlbXMgPSBmb2N1c2FibGVJdGVtcy5maWx0ZXIoZm9jdXNhYmxlU3RyKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAkKHRoaXMpLmNzcyhcInZpc2liaWxpdHlcIikgIT09IFwiaGlkZGVuXCIgJiYgISQodGhpcykuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZm9jdXNhYmxlSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9jdXNlZEl0ZW1JbmRleCA9IGZvY3VzYWJsZUl0ZW1zLmluZGV4KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoZSAmJiBlLnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAvLyBCYWNrIHRhYlxyXG4gICAgICAgICAgaWYgKGZvY3VzZWRJdGVtSW5kZXggPCAwIHx8IGZvY3VzZWRJdGVtSW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBmb2N1c2FibGVJdGVtcy5lcShmb2N1c2FibGVJdGVtcy5sZW5ndGggLSAxKS50cmlnZ2VyKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIE91dHNpZGUgb3IgRm9yd2FyZCB0YWJcclxuICAgICAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4IDwgMCB8fCBmb2N1c2VkSXRlbUluZGV4ID09IGZvY3VzYWJsZUl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvY3VzYWJsZUl0ZW1zLmVxKDApLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIudHJpZ2dlcihcImZvY3VzXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEFjdGl2YXRlcyBjdXJyZW50IGluc3RhbmNlIC0gYnJpbmdzIGNvbnRhaW5lciB0byB0aGUgZnJvbnQgYW5kIGVuYWJsZXMga2V5Ym9hcmQsXHJcbiAgICAvLyBub3RpZmllcyBvdGhlciBpbnN0YW5jZXMgYWJvdXQgZGVhY3RpdmF0aW5nXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBEZWFjdGl2YXRlIGFsbCBpbnN0YW5jZXNcclxuICAgICAgJChcIi5mYW5jeWJveC1jb250YWluZXJcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJCh0aGlzKS5kYXRhKFwiRmFuY3lCb3hcIik7XHJcblxyXG4gICAgICAgIC8vIFNraXAgc2VsZiBhbmQgY2xvc2luZyBpbnN0YW5jZXNcclxuICAgICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UuaWQgIT09IHNlbGYuaWQgJiYgIWluc3RhbmNlLmlzQ2xvc2luZykge1xyXG4gICAgICAgICAgaW5zdGFuY2UudHJpZ2dlcihcIm9uRGVhY3RpdmF0ZVwiKTtcclxuXHJcbiAgICAgICAgICBpbnN0YW5jZS5yZW1vdmVFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICBpbnN0YW5jZS5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2VsZi5pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHNlbGYuY3VycmVudCB8fCBzZWxmLmlzSWRsZSkge1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIHNlbGYudXBkYXRlQ29udHJvbHMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi50cmlnZ2VyKFwib25BY3RpdmF0ZVwiKTtcclxuXHJcbiAgICAgIHNlbGYuYWRkRXZlbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFN0YXJ0IGNsb3NpbmcgcHJvY2VkdXJlXHJcbiAgICAvLyBUaGlzIHdpbGwgc3RhcnQgXCJ6b29tLW91dFwiIGFuaW1hdGlvbiBpZiBuZWVkZWQgYW5kIGNsZWFuIGV2ZXJ5dGhpbmcgdXAgYWZ0ZXJ3YXJkc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uIChlLCBkKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIGVmZmVjdCxcclxuICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAkY29udGVudCxcclxuICAgICAgICBkb21SZWN0LFxyXG4gICAgICAgIG9wYWNpdHksXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgZW5kO1xyXG5cclxuICAgICAgdmFyIGRvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5jbGVhblVwKGUpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHNlbGYuaXNDbG9zaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmlzQ2xvc2luZyA9IHRydWU7XHJcblxyXG4gICAgICAvLyBJZiBiZWZvcmVDbG9zZSBjYWxsYmFjayBwcmV2ZW50cyBjbG9zaW5nLCBtYWtlIHN1cmUgY29udGVudCBpcyBjZW50ZXJlZFxyXG4gICAgICBpZiAoc2VsZi50cmlnZ2VyKFwiYmVmb3JlQ2xvc2VcIiwgZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2VsZi5pc0Nsb3NpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmVxdWVzdEFGcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzXHJcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBpbnN0YW5jZXMsIHRoZXkgd2lsbCBiZSBzZXQgYWdhaW4gYnkgXCJhY3RpdmF0ZVwiIG1ldGhvZFxyXG4gICAgICBzZWxmLnJlbW92ZUV2ZW50cygpO1xyXG5cclxuICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50O1xyXG4gICAgICBlZmZlY3QgPSBjdXJyZW50Lm9wdHMuYW5pbWF0aW9uRWZmZWN0O1xyXG4gICAgICBkdXJhdGlvbiA9ICQuaXNOdW1lcmljKGQpID8gZCA6IGVmZmVjdCA/IGN1cnJlbnQub3B0cy5hbmltYXRpb25EdXJhdGlvbiA6IDA7XHJcblxyXG4gICAgICBjdXJyZW50LiRzbGlkZS5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jb21wbGV0ZSBmYW5jeWJveC1zbGlkZS0tbmV4dCBmYW5jeWJveC1zbGlkZS0tcHJldmlvdXMgZmFuY3lib3gtYW5pbWF0ZWRcIik7XHJcblxyXG4gICAgICBpZiAoZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICQuZmFuY3lib3guc3RvcChjdXJyZW50LiRzbGlkZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWZmZWN0ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBvdGhlciBzbGlkZXNcclxuICAgICAgY3VycmVudC4kc2xpZGVcclxuICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgIC50cmlnZ2VyKFwib25SZXNldFwiKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgIC8vIFRyaWdnZXIgYW5pbWF0aW9uc1xyXG4gICAgICBpZiAoZHVyYXRpb24pIHtcclxuICAgICAgICBzZWxmLiRyZWZzLmNvbnRhaW5lclxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtb3BlblwiKVxyXG4gICAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtaXMtY2xvc2luZ1wiKVxyXG4gICAgICAgICAgLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgZHVyYXRpb24gKyBcIm1zXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDbGVhbiB1cFxyXG4gICAgICBzZWxmLmhpZGVMb2FkaW5nKGN1cnJlbnQpO1xyXG5cclxuICAgICAgc2VsZi5oaWRlQ29udHJvbHModHJ1ZSk7XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZUN1cnNvcigpO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgcG9zc2libGUgdG8gem9vbS1vdXRcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGVmZmVjdCA9PT0gXCJ6b29tXCIgJiZcclxuICAgICAgICAhKCRjb250ZW50ICYmIGR1cmF0aW9uICYmIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiICYmICFzZWxmLmlzTW92ZWQoKSAmJiAhY3VycmVudC5oYXNFcnJvciAmJiAoZW5kID0gc2VsZi5nZXRUaHVtYlBvcyhjdXJyZW50KSkpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGVmZmVjdCA9IFwiZmFkZVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWZmZWN0ID09PSBcInpvb21cIikge1xyXG4gICAgICAgICQuZmFuY3lib3guc3RvcCgkY29udGVudCk7XHJcblxyXG4gICAgICAgIGRvbVJlY3QgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZSgkY29udGVudCk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0ge1xyXG4gICAgICAgICAgdG9wOiBkb21SZWN0LnRvcCxcclxuICAgICAgICAgIGxlZnQ6IGRvbVJlY3QubGVmdCxcclxuICAgICAgICAgIHNjYWxlWDogZG9tUmVjdC53aWR0aCAvIGVuZC53aWR0aCxcclxuICAgICAgICAgIHNjYWxlWTogZG9tUmVjdC5oZWlnaHQgLyBlbmQuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6IGVuZC53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogZW5kLmhlaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gYW5pbWF0ZSBvcGFjaXR5XHJcbiAgICAgICAgb3BhY2l0eSA9IGN1cnJlbnQub3B0cy56b29tT3BhY2l0eTtcclxuXHJcbiAgICAgICAgaWYgKG9wYWNpdHkgPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgIG9wYWNpdHkgPSBNYXRoLmFicyhjdXJyZW50LndpZHRoIC8gY3VycmVudC5oZWlnaHQgLSBlbmQud2lkdGggLyBlbmQuaGVpZ2h0KSA+IDAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcGFjaXR5KSB7XHJcbiAgICAgICAgICBlbmQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZSgkY29udGVudCwgc3RhcnQpO1xyXG5cclxuICAgICAgICBmb3JjZVJlZHJhdygkY29udGVudCk7XHJcblxyXG4gICAgICAgICQuZmFuY3lib3guYW5pbWF0ZSgkY29udGVudCwgZW5kLCBkdXJhdGlvbiwgZG9uZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWZmZWN0ICYmIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgJC5mYW5jeWJveC5hbmltYXRlKFxyXG4gICAgICAgICAgY3VycmVudC4kc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tcHJldmlvdXNcIikucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tY3VycmVudFwiKSxcclxuICAgICAgICAgIFwiZmFuY3lib3gtYW5pbWF0ZWQgZmFuY3lib3gtZngtXCIgKyBlZmZlY3QsXHJcbiAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgIGRvbmVcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHNraXAgYW5pbWF0aW9uXHJcbiAgICAgICAgaWYgKGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZG9uZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRmluYWwgYWRqdXN0bWVudHMgYWZ0ZXIgcmVtb3ZpbmcgdGhlIGluc3RhbmNlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjbGVhblVwOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaW5zdGFuY2UsXHJcbiAgICAgICAgJGZvY3VzID0gc2VsZi5jdXJyZW50Lm9wdHMuJG9yaWcsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5O1xyXG5cclxuICAgICAgc2VsZi5jdXJyZW50LiRzbGlkZS50cmlnZ2VyKFwib25SZXNldFwiKTtcclxuXHJcbiAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLmVtcHR5KCkucmVtb3ZlKCk7XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJhZnRlckNsb3NlXCIsIGUpO1xyXG5cclxuICAgICAgLy8gUGxhY2UgYmFjayBmb2N1c1xyXG4gICAgICBpZiAoISFzZWxmLmN1cnJlbnQub3B0cy5iYWNrRm9jdXMpIHtcclxuICAgICAgICBpZiAoISRmb2N1cyB8fCAhJGZvY3VzLmxlbmd0aCB8fCAhJGZvY3VzLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAgICRmb2N1cyA9IHNlbGYuJHRyaWdnZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGZvY3VzICYmICRmb2N1cy5sZW5ndGgpIHtcclxuICAgICAgICAgIHggPSB3aW5kb3cuc2Nyb2xsWDtcclxuICAgICAgICAgIHkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICAgICAgICAkZm9jdXMudHJpZ2dlcihcImZvY3VzXCIpO1xyXG5cclxuICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpXHJcbiAgICAgICAgICAgIC5zY3JvbGxUb3AoeSlcclxuICAgICAgICAgICAgLnNjcm9sbExlZnQoeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmN1cnJlbnQgPSBudWxsO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIG90aGVyIGluc3RhbmNlc1xyXG4gICAgICBpbnN0YW5jZSA9ICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgIGluc3RhbmNlLmFjdGl2YXRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1hY3RpdmUgY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFyXCIpO1xyXG5cclxuICAgICAgICAkKFwiI2ZhbmN5Ym94LXN0eWxlLW5vc2Nyb2xsXCIpLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENhbGwgY2FsbGJhY2sgYW5kIHRyaWdnZXIgYW4gZXZlbnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB0cmlnZ2VyOiBmdW5jdGlvbiAobmFtZSwgc2xpZGUpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxyXG4gICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9iaiA9IHNsaWRlICYmIHNsaWRlLm9wdHMgPyBzbGlkZSA6IHNlbGYuY3VycmVudCxcclxuICAgICAgICByZXo7XHJcblxyXG4gICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgYXJncy51bnNoaWZ0KG9iaik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqID0gc2VsZjtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXJncy51bnNoaWZ0KHNlbGYpO1xyXG5cclxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihvYmoub3B0c1tuYW1lXSkpIHtcclxuICAgICAgICByZXogPSBvYmoub3B0c1tuYW1lXS5hcHBseShvYmosIGFyZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmV6ID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiByZXo7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChuYW1lID09PSBcImFmdGVyQ2xvc2VcIiB8fCAhc2VsZi4kcmVmcykge1xyXG4gICAgICAgICRELnRyaWdnZXIobmFtZSArIFwiLmZiXCIsIGFyZ3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLnRyaWdnZXIobmFtZSArIFwiLmZiXCIsIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVwZGF0ZSBpbmZvYmFyIHZhbHVlcywgbmF2aWdhdGlvbiBidXR0b24gc3RhdGVzIGFuZCByZXZlYWwgY2FwdGlvblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdXBkYXRlQ29udHJvbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgaW5kZXggPSBjdXJyZW50LmluZGV4LFxyXG4gICAgICAgICRjb250YWluZXIgPSBzZWxmLiRyZWZzLmNvbnRhaW5lcixcclxuICAgICAgICAkY2FwdGlvbiA9IHNlbGYuJHJlZnMuY2FwdGlvbixcclxuICAgICAgICBjYXB0aW9uID0gY3VycmVudC5vcHRzLmNhcHRpb247XHJcblxyXG4gICAgICAvLyBSZWNhbGN1bGF0ZSBjb250ZW50IGRpbWVuc2lvbnNcclxuICAgICAgY3VycmVudC4kc2xpZGUudHJpZ2dlcihcInJlZnJlc2hcIik7XHJcblxyXG4gICAgICAvLyBTZXQgY2FwdGlvblxyXG4gICAgICBpZiAoY2FwdGlvbiAmJiBjYXB0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGYuJGNhcHRpb24gPSAkY2FwdGlvbjtcclxuXHJcbiAgICAgICAgJGNhcHRpb25cclxuICAgICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgIC5odG1sKGNhcHRpb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuJGNhcHRpb24gPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlbGYuaGFzSGlkZGVuQ29udHJvbHMgJiYgIXNlbGYuaXNJZGxlKSB7XHJcbiAgICAgICAgc2VsZi5zaG93Q29udHJvbHMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIGluZm8gYW5kIG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtY291bnRdXCIpLmh0bWwoc2VsZi5ncm91cC5sZW5ndGgpO1xyXG4gICAgICAkY29udGFpbmVyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC1pbmRleF1cIikuaHRtbChpbmRleCArIDEpO1xyXG5cclxuICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtcHJldl1cIikucHJvcChcImRpc2FibGVkXCIsICFjdXJyZW50Lm9wdHMubG9vcCAmJiBpbmRleCA8PSAwKTtcclxuICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtbmV4dF1cIikucHJvcChcImRpc2FibGVkXCIsICFjdXJyZW50Lm9wdHMubG9vcCAmJiBpbmRleCA+PSBzZWxmLmdyb3VwLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgICAgaWYgKGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgICAgLy8gUmUtZW5hYmxlIGJ1dHRvbnM7IHVwZGF0ZSBkb3dubG9hZCBidXR0b24gc291cmNlXHJcbiAgICAgICAgJGNvbnRhaW5lclxyXG4gICAgICAgICAgLmZpbmQoXCJbZGF0YS1mYW5jeWJveC16b29tXVwiKVxyXG4gICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAuZmluZChcIltkYXRhLWZhbmN5Ym94LWRvd25sb2FkXVwiKVxyXG4gICAgICAgICAgLmF0dHIoXCJocmVmXCIsIGN1cnJlbnQub3B0cy5pbWFnZS5zcmMgfHwgY3VycmVudC5zcmMpXHJcbiAgICAgICAgICAuc2hvdygpO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnQub3B0cy50b29sYmFyKSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtZG93bmxvYWRdLFtkYXRhLWZhbmN5Ym94LXpvb21dXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIGZvY3VzIGlzIG5vdCBvbiBkaXNhYmxlZCBidXR0b24vZWxlbWVudFxyXG4gICAgICBpZiAoJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyhcIjpoaWRkZW4sW2Rpc2FibGVkXVwiKSkge1xyXG4gICAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBIaWRlIHRvb2xiYXIgYW5kIGNhcHRpb25cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGhpZGVDb250cm9sczogZnVuY3Rpb24gKGFuZENhcHRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGFyciA9IFtcImluZm9iYXJcIiwgXCJ0b29sYmFyXCIsIFwibmF2XCJdO1xyXG5cclxuICAgICAgaWYgKGFuZENhcHRpb24gfHwgIXNlbGYuY3VycmVudC5vcHRzLnByZXZlbnRDYXB0aW9uT3ZlcmxhcCkge1xyXG4gICAgICAgIGFyci5wdXNoKFwiY2FwdGlvblwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kcmVmcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXHJcbiAgICAgICAgYXJyXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgcmV0dXJuIFwiZmFuY3lib3gtc2hvdy1cIiArIGk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbihcIiBcIilcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuaGFzSGlkZGVuQ29udHJvbHMgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93Q29udHJvbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG9wdHMgPSBzZWxmLmN1cnJlbnQgPyBzZWxmLmN1cnJlbnQub3B0cyA6IHNlbGYub3B0cyxcclxuICAgICAgICAkY29udGFpbmVyID0gc2VsZi4kcmVmcy5jb250YWluZXI7XHJcblxyXG4gICAgICBzZWxmLmhhc0hpZGRlbkNvbnRyb2xzID0gZmFsc2U7XHJcbiAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICRjb250YWluZXJcclxuICAgICAgICAudG9nZ2xlQ2xhc3MoXCJmYW5jeWJveC1zaG93LXRvb2xiYXJcIiwgISEob3B0cy50b29sYmFyICYmIG9wdHMuYnV0dG9ucykpXHJcbiAgICAgICAgLnRvZ2dsZUNsYXNzKFwiZmFuY3lib3gtc2hvdy1pbmZvYmFyXCIsICEhKG9wdHMuaW5mb2JhciAmJiBzZWxmLmdyb3VwLmxlbmd0aCA+IDEpKVxyXG4gICAgICAgIC50b2dnbGVDbGFzcyhcImZhbmN5Ym94LXNob3ctY2FwdGlvblwiLCAhIXNlbGYuJGNhcHRpb24pXHJcbiAgICAgICAgLnRvZ2dsZUNsYXNzKFwiZmFuY3lib3gtc2hvdy1uYXZcIiwgISEob3B0cy5hcnJvd3MgJiYgc2VsZi5ncm91cC5sZW5ndGggPiAxKSlcclxuICAgICAgICAudG9nZ2xlQ2xhc3MoXCJmYW5jeWJveC1pcy1tb2RhbFwiLCAhIW9wdHMubW9kYWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBUb2dnbGUgdG9vbGJhciBhbmQgY2FwdGlvblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB0b2dnbGVDb250cm9sczogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNIaWRkZW5Db250cm9scykge1xyXG4gICAgICAgIHRoaXMuc2hvd0NvbnRyb2xzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkLmZhbmN5Ym94ID0ge1xyXG4gICAgdmVyc2lvbjogXCJ7ZmFuY3lib3gtdmVyc2lvbn1cIixcclxuICAgIGRlZmF1bHRzOiBkZWZhdWx0cyxcclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBpbnN0YW5jZSBhbmQgZXhlY3V0ZSBhIGNvbW1hbmQuXHJcbiAgICAvL1xyXG4gICAgLy8gRXhhbXBsZXMgb2YgdXNhZ2U6XHJcbiAgICAvL1xyXG4gICAgLy8gICAkaW5zdGFuY2UgPSAkLmZhbmN5Ym94LmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKS5qdW1wVG8oIDEgKTtcclxuICAgIC8vICAgJC5mYW5jeWJveC5nZXRJbnN0YW5jZSggJ2p1bXBUbycsIDEgKTtcclxuICAgIC8vICAgJC5mYW5jeWJveC5nZXRJbnN0YW5jZSggZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmluZm8oIHRoaXMuY3VyckluZGV4ICk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIChjb21tYW5kKSB7XHJcbiAgICAgIHZhciBpbnN0YW5jZSA9ICQoJy5mYW5jeWJveC1jb250YWluZXI6bm90KFwiLmZhbmN5Ym94LWlzLWNsb3NpbmdcIik6bGFzdCcpLmRhdGEoXCJGYW5jeUJveFwiKSxcclxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIEZhbmN5Qm94KSB7XHJcbiAgICAgICAgaWYgKCQudHlwZShjb21tYW5kKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0uYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJC50eXBlKGNvbW1hbmQpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIGNvbW1hbmQuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENyZWF0ZSBuZXcgaW5zdGFuY2VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBvcGVuOiBmdW5jdGlvbiAoaXRlbXMsIG9wdHMsIGluZGV4KSB7XHJcbiAgICAgIHJldHVybiBuZXcgRmFuY3lCb3goaXRlbXMsIG9wdHMsIGluZGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2xvc2UgY3VycmVudCBvciBhbGwgaW5zdGFuY2VzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjbG9zZTogZnVuY3Rpb24gKGFsbCkge1xyXG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG5cclxuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbmQgY2xvc2UgbmV4dCBpbnN0YW5jZVxyXG4gICAgICAgIGlmIChhbGwgPT09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoYWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2xvc2UgYWxsIGluc3RhbmNlcyBhbmQgdW5iaW5kIGFsbCBldmVudHNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmNsb3NlKHRydWUpO1xyXG5cclxuICAgICAgJEQuYWRkKFwiYm9keVwiKS5vZmYoXCJjbGljay5mYi1zdGFydFwiLCBcIioqXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBUcnkgdG8gZGV0ZWN0IG1vYmlsZSBkZXZpY2VzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaXNNb2JpbGU6IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcclxuXHJcbiAgICAvLyBEZXRlY3QgaWYgJ3RyYW5zbGF0ZTNkJyBzdXBwb3J0IGlzIGF2YWlsYWJsZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB1c2UzZDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICYmXHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZGl2KSAmJlxyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKSAmJlxyXG4gICAgICAgICEoZG9jdW1lbnQuZG9jdW1lbnRNb2RlICYmIGRvY3VtZW50LmRvY3VtZW50TW9kZSA8IDExKVxyXG4gICAgICApO1xyXG4gICAgfSkoKSxcclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IGN1cnJlbnQgdmlzdWFsIHN0YXRlIG9mIGFuIGVsZW1lbnRcclxuICAgIC8vIHJldHVybnMgYXJyYXlbIHRvcCwgbGVmdCwgaG9yaXpvbnRhbC1zY2FsZSwgdmVydGljYWwtc2NhbGUsIG9wYWNpdHkgXVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZ2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoJGVsKSB7XHJcbiAgICAgIHZhciBkb21SZWN0O1xyXG5cclxuICAgICAgaWYgKCEkZWwgfHwgISRlbC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvbVJlY3QgPSAkZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogZG9tUmVjdC50b3AgfHwgMCxcclxuICAgICAgICBsZWZ0OiBkb21SZWN0LmxlZnQgfHwgMCxcclxuICAgICAgICB3aWR0aDogZG9tUmVjdC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGRvbVJlY3QuaGVpZ2h0LFxyXG4gICAgICAgIG9wYWNpdHk6IHBhcnNlRmxvYXQoJGVsLmNzcyhcIm9wYWNpdHlcIikpXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNob3J0Y3V0IGZvciBzZXR0aW5nIFwidHJhbnNsYXRlM2RcIiBwcm9wZXJ0aWVzIGZvciBlbGVtZW50XHJcbiAgICAvLyBDYW4gc2V0IGJlIHVzZWQgdG8gc2V0IG9wYWNpdHksIHRvb1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uICgkZWwsIHByb3BzKSB7XHJcbiAgICAgIHZhciBzdHIgPSBcIlwiLFxyXG4gICAgICAgIGNzcyA9IHt9O1xyXG5cclxuICAgICAgaWYgKCEkZWwgfHwgIXByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJvcHMubGVmdCAhPT0gdW5kZWZpbmVkIHx8IHByb3BzLnRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyID1cclxuICAgICAgICAgIChwcm9wcy5sZWZ0ID09PSB1bmRlZmluZWQgPyAkZWwucG9zaXRpb24oKS5sZWZ0IDogcHJvcHMubGVmdCkgK1xyXG4gICAgICAgICAgXCJweCwgXCIgK1xyXG4gICAgICAgICAgKHByb3BzLnRvcCA9PT0gdW5kZWZpbmVkID8gJGVsLnBvc2l0aW9uKCkudG9wIDogcHJvcHMudG9wKSArXHJcbiAgICAgICAgICBcInB4XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnVzZTNkKSB7XHJcbiAgICAgICAgICBzdHIgPSBcInRyYW5zbGF0ZTNkKFwiICsgc3RyICsgXCIsIDBweClcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RyID0gXCJ0cmFuc2xhdGUoXCIgKyBzdHIgKyBcIilcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5zY2FsZVggIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5zY2FsZVkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0ciArPSBcIiBzY2FsZShcIiArIHByb3BzLnNjYWxlWCArIFwiLCBcIiArIHByb3BzLnNjYWxlWSArIFwiKVwiO1xyXG4gICAgICB9IGVsc2UgaWYgKHByb3BzLnNjYWxlWCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyICs9IFwiIHNjYWxlWChcIiArIHByb3BzLnNjYWxlWCArIFwiKVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgIGNzcy50cmFuc2Zvcm0gPSBzdHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjc3Mub3BhY2l0eSA9IHByb3BzLm9wYWNpdHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY3NzLndpZHRoID0gcHJvcHMud2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNzcy5oZWlnaHQgPSBwcm9wcy5oZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkZWwuY3NzKGNzcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNpbXBsZSBDU1MgdHJhbnNpdGlvbiBoYW5kbGVyXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGFuaW1hdGU6IGZ1bmN0aW9uICgkZWwsIHRvLCBkdXJhdGlvbiwgY2FsbGJhY2ssIGxlYXZlQW5pbWF0aW9uTmFtZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZnJvbTtcclxuXHJcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24oZHVyYXRpb24pKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkdXJhdGlvbjtcclxuICAgICAgICBkdXJhdGlvbiA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuc3RvcCgkZWwpO1xyXG5cclxuICAgICAgZnJvbSA9IHNlbGYuZ2V0VHJhbnNsYXRlKCRlbCk7XHJcblxyXG4gICAgICAkZWwub24odHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBTa2lwIGV2ZW50cyBmcm9tIGNoaWxkIGVsZW1lbnRzIGFuZCB6LWluZGV4IGNoYW5nZVxyXG4gICAgICAgIGlmIChlICYmIGUub3JpZ2luYWxFdmVudCAmJiAoISRlbC5pcyhlLm9yaWdpbmFsRXZlbnQudGFyZ2V0KSB8fCBlLm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lID09IFwiei1pbmRleFwiKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zdG9wKCRlbCk7XHJcblxyXG4gICAgICAgIGlmICgkLmlzTnVtZXJpYyhkdXJhdGlvbikpIHtcclxuICAgICAgICAgICRlbC5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCQuaXNQbGFpbk9iamVjdCh0bykpIHtcclxuICAgICAgICAgIGlmICh0by5zY2FsZVggIT09IHVuZGVmaW5lZCAmJiB0by5zY2FsZVkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxmLnNldFRyYW5zbGF0ZSgkZWwsIHtcclxuICAgICAgICAgICAgICB0b3A6IHRvLnRvcCxcclxuICAgICAgICAgICAgICBsZWZ0OiB0by5sZWZ0LFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBmcm9tLndpZHRoICogdG8uc2NhbGVYLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogZnJvbS5oZWlnaHQgKiB0by5zY2FsZVksXHJcbiAgICAgICAgICAgICAgc2NhbGVYOiAxLFxyXG4gICAgICAgICAgICAgIHNjYWxlWTogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGxlYXZlQW5pbWF0aW9uTmFtZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKHRvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCQuaXNOdW1lcmljKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICRlbC5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIGR1cmF0aW9uICsgXCJtc1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU3RhcnQgYW5pbWF0aW9uIGJ5IGNoYW5naW5nIENTUyBwcm9wZXJ0aWVzIG9yIGNsYXNzIG5hbWVcclxuICAgICAgaWYgKCQuaXNQbGFpbk9iamVjdCh0bykpIHtcclxuICAgICAgICBpZiAodG8uc2NhbGVYICE9PSB1bmRlZmluZWQgJiYgdG8uc2NhbGVZICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0by53aWR0aDtcclxuICAgICAgICAgIGRlbGV0ZSB0by5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgaWYgKCRlbC5wYXJlbnQoKS5oYXNDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1pbWFnZVwiKSkge1xyXG4gICAgICAgICAgICAkZWwucGFyZW50KCkuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1zY2FsaW5nXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5mYW5jeWJveC5zZXRUcmFuc2xhdGUoJGVsLCB0byk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKHRvKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgYHRyYW5zaXRpb25lbmRgIGNhbGxiYWNrIGdldHMgZmlyZWRcclxuICAgICAgJGVsLmRhdGEoXHJcbiAgICAgICAgXCJ0aW1lclwiLFxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJGVsLnRyaWdnZXIodHJhbnNpdGlvbkVuZCk7XHJcbiAgICAgICAgfSwgZHVyYXRpb24gKyAzMylcclxuICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCRlbCwgY2FsbENhbGxiYWNrKSB7XHJcbiAgICAgIGlmICgkZWwgJiYgJGVsLmxlbmd0aCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCgkZWwuZGF0YShcInRpbWVyXCIpKTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxDYWxsYmFjaykge1xyXG4gICAgICAgICAgJGVsLnRyaWdnZXIodHJhbnNpdGlvbkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWwub2ZmKHRyYW5zaXRpb25FbmQpLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgXCJcIik7XHJcblxyXG4gICAgICAgICRlbC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWlzLXNjYWxpbmdcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBEZWZhdWx0IGNsaWNrIGhhbmRsZXIgZm9yIFwiZmFuY3lib3hlZFwiIGxpbmtzXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgZnVuY3Rpb24gX3J1bihlLCBvcHRzKSB7XHJcbiAgICB2YXIgaXRlbXMgPSBbXSxcclxuICAgICAgaW5kZXggPSAwLFxyXG4gICAgICAkdGFyZ2V0LFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgaW5zdGFuY2U7XHJcblxyXG4gICAgLy8gQXZvaWQgb3BlbmluZyBtdWx0aXBsZSB0aW1lc1xyXG4gICAgaWYgKGUgJiYgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG5cclxuICAgIGlmIChlICYmIGUuZGF0YSkge1xyXG4gICAgICBvcHRzID0gbWVyZ2VPcHRzKGUuZGF0YS5vcHRpb25zLCBvcHRzKTtcclxuICAgIH1cclxuXHJcbiAgICAkdGFyZ2V0ID0gb3B0cy4kdGFyZ2V0IHx8ICQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKFwiYmx1clwiKTtcclxuICAgIGluc3RhbmNlID0gJC5mYW5jeWJveC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZS4kdHJpZ2dlciAmJiBpbnN0YW5jZS4kdHJpZ2dlci5pcygkdGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMuc2VsZWN0b3IpIHtcclxuICAgICAgaXRlbXMgPSAkKG9wdHMuc2VsZWN0b3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gR2V0IGFsbCByZWxhdGVkIGl0ZW1zIGFuZCBmaW5kIGluZGV4IGZvciBjbGlja2VkIG9uZVxyXG4gICAgICB2YWx1ZSA9ICR0YXJnZXQuYXR0cihcImRhdGEtZmFuY3lib3hcIikgfHwgXCJcIjtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIGl0ZW1zID0gZS5kYXRhID8gZS5kYXRhLml0ZW1zIDogW107XHJcbiAgICAgICAgaXRlbXMgPSBpdGVtcy5sZW5ndGggPyBpdGVtcy5maWx0ZXIoJ1tkYXRhLWZhbmN5Ym94PVwiJyArIHZhbHVlICsgJ1wiXScpIDogJCgnW2RhdGEtZmFuY3lib3g9XCInICsgdmFsdWUgKyAnXCJdJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbXMgPSBbJHRhcmdldF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9ICQoaXRlbXMpLmluZGV4KCR0YXJnZXQpO1xyXG5cclxuICAgIC8vIFNvbWV0aW1lcyBjdXJyZW50IGl0ZW0gY2FuIG5vdCBiZSBmb3VuZFxyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICBpbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5zdGFuY2UgPSAkLmZhbmN5Ym94Lm9wZW4oaXRlbXMsIG9wdHMsIGluZGV4KTtcclxuXHJcbiAgICAvLyBTYXZlIGxhc3QgYWN0aXZlIGVsZW1lbnRcclxuICAgIGluc3RhbmNlLiR0cmlnZ2VyID0gJHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSBhIGpRdWVyeSBwbHVnaW5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICQuZm4uZmFuY3lib3ggPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgdmFyIHNlbGVjdG9yO1xyXG5cclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgc2VsZWN0b3IgPSBvcHRpb25zLnNlbGVjdG9yIHx8IGZhbHNlO1xyXG5cclxuICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAvLyBVc2UgYm9keSBlbGVtZW50IGluc3RlYWQgb2YgZG9jdW1lbnQgc28gaXQgZXhlY3V0ZXMgZmlyc3RcclxuICAgICAgJChcImJvZHlcIilcclxuICAgICAgICAub2ZmKFwiY2xpY2suZmItc3RhcnRcIiwgc2VsZWN0b3IpXHJcbiAgICAgICAgLm9uKFwiY2xpY2suZmItc3RhcnRcIiwgc2VsZWN0b3IsIHtcclxuICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgICAgICB9LCBfcnVuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2ZmKFwiY2xpY2suZmItc3RhcnRcIikub24oXHJcbiAgICAgICAgXCJjbGljay5mYi1zdGFydFwiLCB7XHJcbiAgICAgICAgICBpdGVtczogdGhpcyxcclxuICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9ydW5cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBTZWxmIGluaXRpYWxpemluZyBwbHVnaW4gZm9yIGFsbCBlbGVtZW50cyBoYXZpbmcgYGRhdGEtZmFuY3lib3hgIGF0dHJpYnV0ZVxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICRELm9uKFwiY2xpY2suZmItc3RhcnRcIiwgXCJbZGF0YS1mYW5jeWJveF1cIiwgX3J1bik7XHJcblxyXG4gIC8vIEVuYWJsZSBcInRyaWdnZXIgZWxlbWVudHNcIlxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgJEQub24oXCJjbGljay5mYi1zdGFydFwiLCBcIltkYXRhLWZhbmN5Ym94LXRyaWdnZXJdXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAkKCdbZGF0YS1mYW5jeWJveD1cIicgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLWZhbmN5Ym94LXRyaWdnZXJcIikgKyAnXCJdJylcclxuICAgICAgLmVxKCQodGhpcykuYXR0cihcImRhdGEtZmFuY3lib3gtaW5kZXhcIikgfHwgMClcclxuICAgICAgLnRyaWdnZXIoXCJjbGljay5mYi1zdGFydFwiLCB7XHJcbiAgICAgICAgJHRyaWdnZXI6ICQodGhpcylcclxuICAgICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFRyYWNrIGZvY3VzIGV2ZW50IGZvciBiZXR0ZXIgYWNjZXNzaWJpbGl0eSBzdHlsaW5nXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJ1dHRvblN0ciA9IFwiLmZhbmN5Ym94LWJ1dHRvblwiLFxyXG4gICAgICBmb2N1c1N0ciA9IFwiZmFuY3lib3gtZm9jdXNcIixcclxuICAgICAgJHByZXNzZWQgPSBudWxsO1xyXG5cclxuICAgICRELm9uKFwibW91c2Vkb3duIG1vdXNldXAgZm9jdXMgYmx1clwiLCBidXR0b25TdHIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHN3aXRjaCAoZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxyXG4gICAgICAgICAgJHByZXNzZWQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIm1vdXNldXBcIjpcclxuICAgICAgICAgICRwcmVzc2VkID0gbnVsbDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmb2N1c2luXCI6XHJcbiAgICAgICAgICAkKGJ1dHRvblN0cikucmVtb3ZlQ2xhc3MoZm9jdXNTdHIpO1xyXG5cclxuICAgICAgICAgIGlmICghJCh0aGlzKS5pcygkcHJlc3NlZCkgJiYgISQodGhpcykuaXMoXCJbZGlzYWJsZWRdXCIpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoZm9jdXNTdHIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZvY3Vzb3V0XCI6XHJcbiAgICAgICAgICAkKGJ1dHRvblN0cikucmVtb3ZlQ2xhc3MoZm9jdXNTdHIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pKCk7XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQsIGpRdWVyeSk7IiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gU2xpZGVTaG93XHJcbi8vIEVuYWJsZXMgc2xpZGVzaG93IGZ1bmN0aW9uYWxpdHlcclxuLy9cclxuLy8gRXhhbXBsZSBvZiB1c2FnZTpcclxuLy8gJC5mYW5jeWJveC5nZXRJbnN0YW5jZSgpLlNsaWRlU2hvdy5zdGFydCgpXHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbiAoZG9jdW1lbnQsICQpIHtcclxuICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgJC5leHRlbmQodHJ1ZSwgJC5mYW5jeWJveC5kZWZhdWx0cywge1xyXG4gICAgYnRuVHBsOiB7XHJcbiAgICAgIHNsaWRlU2hvdzogJzxidXR0b24gZGF0YS1mYW5jeWJveC1wbGF5IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tcGxheVwiIHRpdGxlPVwie3tQTEFZX1NUQVJUfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNNi41IDUuNHYxMy4ybDExLTYuNnpcIi8+PC9zdmc+JyArXHJcbiAgICAgICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTguMzMgNS43NWgyLjJ2MTIuNWgtMi4yVjUuNzV6bTUuMTUgMGgyLjJ2MTIuNWgtMi4yVjUuNzV6XCIvPjwvc3ZnPicgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCJcclxuICAgIH0sXHJcbiAgICBzbGlkZVNob3c6IHtcclxuICAgICAgYXV0b1N0YXJ0OiBmYWxzZSxcclxuICAgICAgc3BlZWQ6IDMwMDAsXHJcbiAgICAgIHByb2dyZXNzOiB0cnVlXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciBTbGlkZVNob3cgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH07XHJcblxyXG4gICQuZXh0ZW5kKFNsaWRlU2hvdy5wcm90b3R5cGUsIHtcclxuICAgIHRpbWVyOiBudWxsLFxyXG4gICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgJGJ1dHRvbjogbnVsbCxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBpbnN0YW5jZSA9IHNlbGYuaW5zdGFuY2UsXHJcbiAgICAgICAgb3B0cyA9IGluc3RhbmNlLmdyb3VwW2luc3RhbmNlLmN1cnJJbmRleF0ub3B0cy5zbGlkZVNob3c7XHJcblxyXG4gICAgICBzZWxmLiRidXR0b24gPSBpbnN0YW5jZS4kcmVmcy50b29sYmFyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC1wbGF5XVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLnRvZ2dsZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZS5ncm91cC5sZW5ndGggPCAyIHx8ICFvcHRzKSB7XHJcbiAgICAgICAgc2VsZi4kYnV0dG9uLmhpZGUoKTtcclxuICAgICAgfSBlbHNlIGlmIChvcHRzLnByb2dyZXNzKSB7XHJcbiAgICAgICAgc2VsZi4kcHJvZ3Jlc3MgPSAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtcHJvZ3Jlc3NcIj48L2Rpdj4nKS5hcHBlbmRUbyhpbnN0YW5jZS4kcmVmcy5pbm5lcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAoZm9yY2UpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGluc3RhbmNlID0gc2VsZi5pbnN0YW5jZSxcclxuICAgICAgICBjdXJyZW50ID0gaW5zdGFuY2UuY3VycmVudDtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHJlYWNoZWQgbGFzdCBlbGVtZW50XHJcbiAgICAgIGlmIChjdXJyZW50ICYmIChmb3JjZSA9PT0gdHJ1ZSB8fCBjdXJyZW50Lm9wdHMubG9vcCB8fCBpbnN0YW5jZS5jdXJySW5kZXggPCBpbnN0YW5jZS5ncm91cC5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgIGlmIChzZWxmLmlzQWN0aXZlICYmIGN1cnJlbnQuY29udGVudFR5cGUgIT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgaWYgKHNlbGYuJHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShzZWxmLiRwcm9ncmVzcy5zaG93KCksIHtcclxuICAgICAgICAgICAgICBzY2FsZVg6IDFcclxuICAgICAgICAgICAgfSwgY3VycmVudC5vcHRzLnNsaWRlU2hvdy5zcGVlZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlLmN1cnJlbnQub3B0cy5sb29wICYmIGluc3RhbmNlLmN1cnJlbnQuaW5kZXggPT0gaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLmp1bXBUbygwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpbnN0YW5jZS5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIGN1cnJlbnQub3B0cy5zbGlkZVNob3cuc3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnN0b3AoKTtcclxuICAgICAgICBpbnN0YW5jZS5pZGxlU2Vjb25kc0NvdW50ZXIgPSAwO1xyXG4gICAgICAgIGluc3RhbmNlLnNob3dDb250cm9scygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVyKTtcclxuXHJcbiAgICAgIHNlbGYudGltZXIgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHNlbGYuJHByb2dyZXNzKSB7XHJcbiAgICAgICAgc2VsZi4kcHJvZ3Jlc3MucmVtb3ZlQXR0cihcInN0eWxlXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY3VycmVudCA9IHNlbGYuaW5zdGFuY2UuY3VycmVudDtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50KSB7XHJcbiAgICAgICAgc2VsZi4kYnV0dG9uXHJcbiAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIChjdXJyZW50Lm9wdHMuaTE4bltjdXJyZW50Lm9wdHMubGFuZ10gfHwgY3VycmVudC5vcHRzLmkxOG4uZW4pLlBMQVlfU1RPUClcclxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWJ1dHRvbi0tcGxheVwiKVxyXG4gICAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtYnV0dG9uLS1wYXVzZVwiKTtcclxuXHJcbiAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50LmlzQ29tcGxldGUpIHtcclxuICAgICAgICAgIHNlbGYuc2V0KHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5pbnN0YW5jZS50cmlnZ2VyKFwib25TbGlkZVNob3dDaGFuZ2VcIiwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY3VycmVudCA9IHNlbGYuaW5zdGFuY2UuY3VycmVudDtcclxuXHJcbiAgICAgIHNlbGYuY2xlYXIoKTtcclxuXHJcbiAgICAgIHNlbGYuJGJ1dHRvblxyXG4gICAgICAgIC5hdHRyKFwidGl0bGVcIiwgKGN1cnJlbnQub3B0cy5pMThuW2N1cnJlbnQub3B0cy5sYW5nXSB8fCBjdXJyZW50Lm9wdHMuaTE4bi5lbikuUExBWV9TVEFSVClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1idXR0b24tLXBhdXNlXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtYnV0dG9uLS1wbGF5XCIpO1xyXG5cclxuICAgICAgc2VsZi5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgc2VsZi5pbnN0YW5jZS50cmlnZ2VyKFwib25TbGlkZVNob3dDaGFuZ2VcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHNlbGYuJHByb2dyZXNzKSB7XHJcbiAgICAgICAgc2VsZi4kcHJvZ3Jlc3MucmVtb3ZlQXR0cihcInN0eWxlXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaXNBY3RpdmUpIHtcclxuICAgICAgICBzZWxmLnN0b3AoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oe1xyXG4gICAgXCJvbkluaXQuZmJcIjogZnVuY3Rpb24gKGUsIGluc3RhbmNlKSB7XHJcbiAgICAgIGlmIChpbnN0YW5jZSAmJiAhaW5zdGFuY2UuU2xpZGVTaG93KSB7XHJcbiAgICAgICAgaW5zdGFuY2UuU2xpZGVTaG93ID0gbmV3IFNsaWRlU2hvdyhpbnN0YW5jZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXCJiZWZvcmVTaG93LmZiXCI6IGZ1bmN0aW9uIChlLCBpbnN0YW5jZSwgY3VycmVudCwgZmlyc3RSdW4pIHtcclxuICAgICAgdmFyIFNsaWRlU2hvdyA9IGluc3RhbmNlICYmIGluc3RhbmNlLlNsaWRlU2hvdztcclxuXHJcbiAgICAgIGlmIChmaXJzdFJ1bikge1xyXG4gICAgICAgIGlmIChTbGlkZVNob3cgJiYgY3VycmVudC5vcHRzLnNsaWRlU2hvdy5hdXRvU3RhcnQpIHtcclxuICAgICAgICAgIFNsaWRlU2hvdy5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChTbGlkZVNob3cgJiYgU2xpZGVTaG93LmlzQWN0aXZlKSB7XHJcbiAgICAgICAgU2xpZGVTaG93LmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXCJhZnRlclNob3cuZmJcIjogZnVuY3Rpb24gKGUsIGluc3RhbmNlLCBjdXJyZW50KSB7XHJcbiAgICAgIHZhciBTbGlkZVNob3cgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5TbGlkZVNob3c7XHJcblxyXG4gICAgICBpZiAoU2xpZGVTaG93ICYmIFNsaWRlU2hvdy5pc0FjdGl2ZSkge1xyXG4gICAgICAgIFNsaWRlU2hvdy5zZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBcImFmdGVyS2V5ZG93bi5mYlwiOiBmdW5jdGlvbiAoZSwgaW5zdGFuY2UsIGN1cnJlbnQsIGtleXByZXNzLCBrZXljb2RlKSB7XHJcbiAgICAgIHZhciBTbGlkZVNob3cgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5TbGlkZVNob3c7XHJcblxyXG4gICAgICAvLyBcIlBcIiBvciBTcGFjZWJhclxyXG4gICAgICBpZiAoU2xpZGVTaG93ICYmIGN1cnJlbnQub3B0cy5zbGlkZVNob3cgJiYgKGtleWNvZGUgPT09IDgwIHx8IGtleWNvZGUgPT09IDMyKSAmJiAhJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyhcImJ1dHRvbixhLGlucHV0XCIpKSB7XHJcbiAgICAgICAga2V5cHJlc3MucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgU2xpZGVTaG93LnRvZ2dsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwiYmVmb3JlQ2xvc2UuZmIgb25EZWFjdGl2YXRlLmZiXCI6IGZ1bmN0aW9uIChlLCBpbnN0YW5jZSkge1xyXG4gICAgICB2YXIgU2xpZGVTaG93ID0gaW5zdGFuY2UgJiYgaW5zdGFuY2UuU2xpZGVTaG93O1xyXG5cclxuICAgICAgaWYgKFNsaWRlU2hvdykge1xyXG4gICAgICAgIFNsaWRlU2hvdy5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gUGFnZSBWaXNpYmlsaXR5IEFQSSB0byBwYXVzZSBzbGlkZXNob3cgd2hlbiB3aW5kb3cgaXMgbm90IGFjdGl2ZVxyXG4gICQoZG9jdW1lbnQpLm9uKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSAkLmZhbmN5Ym94LmdldEluc3RhbmNlKCksXHJcbiAgICAgIFNsaWRlU2hvdyA9IGluc3RhbmNlICYmIGluc3RhbmNlLlNsaWRlU2hvdztcclxuXHJcbiAgICBpZiAoU2xpZGVTaG93ICYmIFNsaWRlU2hvdy5pc0FjdGl2ZSkge1xyXG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgU2xpZGVTaG93LmNsZWFyKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU2xpZGVTaG93LnNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKGRvY3VtZW50LCBqUXVlcnkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnbm9kZU1vZHVsZXMvQGZhbmN5YXBwcy9mYW5jeWJveC9zcmMvanMvY29yZS5qcyc7XG5pbXBvcnQgJ25vZGVNb2R1bGVzL0BmYW5jeWFwcHMvZmFuY3lib3gvc3JjL2pzL3NsaWRlc2hvdy5qcyc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFN0eWxlc1xuaW1wb3J0IFwiLi4vc2Nzcy9fY29tcG9uZW50cy9fZmFuY3lib3guc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi9qcy9fY29tcG9uZW50cy9fZmFuY3lib3guanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
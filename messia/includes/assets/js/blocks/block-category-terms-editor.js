/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/category-terms-editor.jsx":
/*!*************************************************!*\
  !*** ./src/js/blocks/category-terms-editor.jsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function (wp, $) {
  const {
    apiFetch
  } = wp;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Component,
    Fragment,
    useState,
    useEffect,
    useRef
  } = wp.element;
  const {
    serverSideRender: ServerSideRender
  } = wp;
  const {
    InspectorControls,
    BlockControls
  } = wp.blockEditor;
  const {
    ToggleControl,
    Flex,
    FlexItem,
    PanelBody,
    Notice,
    SelectControl,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    Card,
    Spinner,
    TabPanel
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 87",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    className: "layer"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_33"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_19"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_10",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "4.65838",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_12",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "14.28169",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m14.7842,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_11"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_20"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_21",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "98.09058",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_24",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "107.71389",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m108.2164,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_25"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_26"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#000000",
    fillOpacity: "0",
    height: "77.12392",
    id: "svg_27",
    rx: "2",
    ry: "2",
    stroke: "#7f7f7f",
    strokeWidth: "2",
    width: "77.12392",
    x: "191.73465",
    y: "5.08211"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#7f7f7f",
    height: "8.18963",
    id: "svg_29",
    rx: "1",
    ry: "1",
    width: "57.87731",
    x: "201.35795",
    y: "59.71144"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m201.86046,53.67063l14.45104,-19.88229l10.1037,6.58734l16.27672,-23.0751l16.04084,36.46239l-56.87229,-0.09234z",
    fill: "#7f7f7f",
    id: "svg_30"
  })))));
  const shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
  let lastPreview = false;
  function CategoryTermsFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [filterDropped, setFilterDropped] = useState($());
    const [editMode, setEditMode] = useState(true);
    const [termsFetched, setTermsFetched] = useState(false);
    const [terms, setTerms] = useState({
      segment: [],
      category: []
    });
    let blockRef = useRef();
    const slotTitle = __('Category term slot', 'messia');
    const dragTitle = __('Add Category term', 'messia');
    const handlerRemove = event => {
      $(event.target).parents('.category-slot').animate({
        opacity: 0
      }, 400, function () {
        $(this).addClass('removed').css('display', 'none');
        const categories = $(blockRef.current).find('.category-constructed .category-slot');
        saveSlots(categories);
      });
    };
    const dragSortInit = () => {
      const sortable = $(blockRef.current).find('.category-constructed').not('ui-sortable').sortable({
        forceHelperSize: true,
        forcePlaceholderSize: true,
        opacity: 1,
        //distance: 10,
        tolerance: 'intersect',
        //cursor: 'grabbig',
        scroll: true,
        scrollSensitivity: 20,
        containment: '.edit-post-visual-editor',
        placeholder: 'sortable-placeholder',
        handle: '.move',
        //zIndex: 10000,
        start: (event, ui) => {
          ui.item.addClass('is-elevated');
          $('body').addClass('cursor-grabbing');
        },
        beforeStop: (event, ui) => {
          $('body').removeClass('cursor-grabbing');
        },
        stop: (event, ui) => {
          ui.item.removeClass('is-elevated');
          ui.item.find('.title .text').text(slotTitle);
          showSlotSettings(ui).then(ui => {
            setFilterDropped(ui.item);
          });
        }
      });
      const draggable = $(blockRef.current).find('.category-templates .category-slot').not('.ui-draggable').draggable({
        connectToSortable: '.category-constructed',
        //cursor: 'grabbig',
        helper: 'clone',
        revert: 'invalid',
        scroll: false,
        revertDuration: 200,
        handle: '.move',
        zIndex: 10,
        start: (event, ui) => {
          ui.helper.addClass('is-elevated');
          $('body').addClass('cursor-grabbing');
          sortable.addClass('dragging');
        },
        beforeStop: (event, ui) => {
          $('body').removeClass('cursor-grabbing');
        },
        stop: (event, ui) => {
          ui.helper.removeClass('is-elevated');
          sortable.removeClass('dragging');
        }
      });
    };
    const saveSlots = categories => {
      let store = [];
      const segmentSlug = categories.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];
      for (let i = 0; i < attributes.categoriesConstructed.length; i++) {
        if (attributes.categoriesConstructed[i].segmentSlug === segmentSlug) {
          continue;
        }
        // add other tabs categories
        store.push(attributes.categoriesConstructed[i]);
      }
      for (let i = 0; i < categories.length; i++) {
        let key;
        if ($(categories[i]).hasClass('removed')) {
          continue;
        }
        if ('undefined' === typeof $(categories[i]).data('key')) {
          key = shortid.generate();
        } else {
          key = $(categories[i]).data('key');
        }
        const type = $(categories[i]).data('type');
        switch (type) {
          case 'category':
            store.push({
              id: key,
              'segmentSlug': segmentSlug,
              'categorySlug': $(categories[i]).find('.settings select').val()
            });
            break;
        }
      }
      if (filterDropped.hasClass('ui-draggable')) {
        filterDropped.addClass('remove-before-render');
      }
      setAttributes({
        categoriesConstructed: store
      });
    };
    const showSlotSettings = async ui => {
      if (ui.item.hasClass('saved')) {
        return Promise.resolve(ui);
      }
      const w_from = ui.item.outerWidth();
      ui.item.css({
        'height': '',
        'width': ''
      });
      const w_to = ui.item.outerWidth();
      ui.item.css({
        'width': w_from
      }).addClass('dropped');
      ;
      return await new Promise((resolve, reject) => {
        //Card div
        ui.item.animate({
          width: w_to + 'px'
        }, 200, function () {
          $(this).css({
            'width': ''
          });

          //Setting div
          const settings = ui.item.find('.settings');
          if (settings.length === 0) {
            ui.item.addClass('saved');
            resolve(ui);
          } else {
            settings.css('display', 'block');
            const h = settings.outerHeight();
            const w = settings.outerWidth();
            settings.css({
              'height': 0,
              'width': 0
            });
            settings.animate({
              height: h + 'px',
              width: w + 'px'
            }, 300, function () {
              $(this).css({
                'height': '',
                'width': ''
              });
              ui.item.addClass('saved');
              resolve(ui);
            });
          }
        });
      });
    };
    const getExample = () => {
      return exampleImageData;
    };
    const templates = () => {
      const block = wp.blocks.getBlockType(name);
      const templatesHtml = [/*#__PURE__*/React.createElement(Fragment, {
        key: "tip"
      }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
        isDismissible: false,
        status: "warning"
      }, /*#__PURE__*/React.createElement("p", null, __('The list of terms is subordinate to the value of the "Empty category terms" option. Each list contains all terms of taxonomy Category. In frontend selected term will be shown as a link to the search page by this value.', 'messia'))))];
      if (terms.category.length > 0) {
        templatesHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card category-slot",
          key: "tmpl-by-category",
          "data-type": "category",
          size: "small"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-card-content"
        }, /*#__PURE__*/React.createElement(Flex, {
          gap: 2
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "move"
        }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
          className: "heading"
        }, dragTitle), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: handlerRemove
        })), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, /*#__PURE__*/React.createElement(SelectControl, {
          value: terms.category[0].value,
          options: terms.category
        })))));
      }
      return templatesHtml;
    };
    const slots = tab => {
      const categoriesConstructedHtml = [];
      for (const [index, filter] of attributes.categoriesConstructed.entries()) {
        if (tab.segmentSlug != filter.segmentSlug) {
          continue;
        }
        categoriesConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card category-slot dropped saved",
          key: `${filter.categorySlug}-${filter.id}`,
          "data-type": "category",
          size: "small"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-card-content"
        }, /*#__PURE__*/React.createElement(Flex, {
          gap: 2
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "move"
        }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
          className: "heading"
        }, slotTitle), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: handlerRemove
        })), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, /*#__PURE__*/React.createElement(SelectControl, {
          value: attributes.categoriesConstructed[index].categorySlug,
          onChange: termSlug => {
            let attr = attributes.categoriesConstructed;
            delete attributes.categoriesConstructed;
            attr[index].categorySlug = termSlug;
            setAttributes({
              categoriesConstructed: attr
            });
          },
          options: terms.category
        })))));
      }
      return categoriesConstructedHtml;
    };
    const getInspectorControls = () => {
      return /*#__PURE__*/React.createElement(InspectorControls, {
        key: "inspector"
      }, /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Settings', 'messia')
      }, /*#__PURE__*/React.createElement(ToggleControl, {
        label: __('Show on front number of objects per term.', 'messia'),
        checked: attributes.withCount,
        onChange: checked => {
          setAttributes({
            withCount: checked
          });
        }
      }), /*#__PURE__*/React.createElement(ToggleControl
      //className="criteria-item"
      , {
        label: __('Show in slider', 'messia'),
        checked: attributes.slider.active,
        onChange: checked => {
          let slider = Object.assign({}, attributes.slider);
          slider.active = Boolean(checked);
          setAttributes({
            slider: slider
          });
        }
      })));
    };
    const getBlockControls = () => {
      return /*#__PURE__*/React.createElement(BlockControls, {
        key: "block"
      }, /*#__PURE__*/React.createElement(ToolbarGroup, {
        label: __('Options', 'messia')
      }, /*#__PURE__*/React.createElement(ToolbarButton, {
        label: editMode ? __('Preview', 'messia') : __('Edit', 'messia'),
        icon: editMode ? "visibility" : "edit",
        onClick: () => {
          setEditMode(!editMode);
        }
      })));
    };
    const getBlockEdit = () => {
      if (termsFetched) {
        if (terms.segment.length > 0) {
          const tabsHtml = [];
          for (const [indexSegment, segment] of terms.segment.entries()) {
            tabsHtml.push({
              name: `segment-${segment.value}-slug`,
              title: segment.label,
              className: 'tab',
              segmentSlug: segment.value
            });
          }
          const tabs = /*#__PURE__*/React.createElement(TabPanel, {
            className: "messia-tabs-panel",
            activeClass: "active-tab",
            orientation: "horizontal",
            initialTabName: tabsHtml[0].name,
            tabs: tabsHtml
          }, tab => /*#__PURE__*/React.createElement("div", {
            "data-title": __('Drop item here.', 'messia'),
            className: "messia-drop-zone category-constructed"
          }, slots(tab)));
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, /*#__PURE__*/React.createElement("div", {
            className: "category-templates"
          }, templates()), tabs));
        } else {
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder",
            label: __("You have no segments. Create one.", 'messia')
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }));
        }
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement(Spinner, null)));
      }
    };
    const getBlockPreview = () => {
      return /*#__PURE__*/React.createElement("div", {
        className: "messia-block",
        key: "messia-block",
        ref: blockRef
      }, /*#__PURE__*/React.createElement(Disabled, {
        key: "block-preview"
      }, /*#__PURE__*/React.createElement(ServerSideRender, {
        block: name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: true
        }
      })));
    };
    const getTerms = async () => {
      return await apiFetch({
        path: 'messia/v1/block-category-terms',
        method: 'POST',
        data: {
          currentAttrs: attributes
        }
      }).then(response => {
        if (response.terms.segment.length === 0) {
          wp.data.dispatch('core/notices').createNotice('error',
          // Can be one of: success, info, warning, error.
          __('Messia Category Terms: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'),
          // Text string to display.
          {
            isDismissible: true
          });
        } else {
          if (response.terms.category.length === 0) {
            wp.data.dispatch('core/notices').createNotice('error',
            // Can be one of: success, info, warning, error.
            __('Messia Category Terms: No terms were found in taxonomy Category. Add some to use block.', 'messia'),
            // Text string to display.
            {
              isDismissible: true
            });
          }
        }
        return response;
      }).catch(e => {
        wp.data.dispatch('core/notices').createNotice('error',
        // Can be one of: success, info, warning, error.
        __('An error occurred while receiving data from the server for Category Terms block', 'messia'),
        // Text string to display.
        {
          isDismissible: true
        });
      });
    };
    const render = () => {
      if (attributes.isExample) {
        return getExample();
      } else {
        if (filterDropped.hasClass('remove-before-render')) {
          filterDropped.remove();
        }
        let classes = [className];
        const render = [getInspectorControls(), getBlockControls()];
        if (editMode) {
          render.push(getBlockEdit());
          lastPreview = false;
        } else if (!lastPreview) {
          lastPreview = getBlockPreview();
          render.push(lastPreview);
        } else {
          render.push(lastPreview);
        }
        return /*#__PURE__*/React.createElement("div", {
          className: classes.join(' ')
        }, render);
      }
    };
    useEffect(() => {
      let isMounted = true;
      if (!termsFetched && !attributes.isExample) {
        getTerms().then(response => {
          if (isMounted) {
            setAttributes({
              categoriesConstructed: response.validAttrs.categoriesConstructed
            });
            setTerms(response.terms);
            setTermsFetched(true);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, [termsFetched]);
    useEffect(() => {
      if (!editMode && !attributes.isExample) {
        $(blockRef.current).find('.category-constructed').sortable('destroy');
      }
    }, [editMode]);
    useEffect(() => {
      if (filterDropped.length === 0) {
        return;
      }
      const categories = $(blockRef.current).find('.category-constructed .category-slot');
      saveSlots(categories);
    }, [filterDropped]);
    useEffect(() => {
      let observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length >= 1) {
              for (let i = 0; i < mutation.addedNodes.length; i++) {
                const tabArea = $(mutation.addedNodes[i]).find('.category-constructed');
                if (tabArea.length > 0) {
                  dragSortInit();
                }
              }
            }
          }
        }
      });
      observer.observe(document.querySelector('body'), {
        attributes: false,
        childList: true,
        subtree: true
      });

      // Later, we can stop observing
      // observer.disconnect();
    }, []);
    return render();
  }
  registerBlockType('messia/block-category-terms', {
    title: __('Category\'s terms', 'messia'),
    description: __('Terms of taxonomy Category by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 21c0 1.657-1.344 3-3 3-1.657 0-3-1.343-3-3s1.343-3 3-3c1.656 0 3 1.343 3 3zm6-3c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm0-18c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm9 18c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3zm-1.577-1.721l-6.423-5.028v-3.352c-.323.066-.658.101-1 .101s-.677-.035-1-.101v3.352l-6.423 5.028c.694.233 1.323.602 1.844 1.093l5.579-4.372 5.579 4.373c.522-.492 1.15-.861 1.844-1.094z"
    })),
    category: 'messia',
    keywords: ['category'],
    styles: [],
    variations: [],
    attributes: {
      categoriesConstructed: {
        type: 'array',
        default: []
      },
      isExample: {
        type: 'boolean',
        default: false
      },
      withCount: {
        type: 'boolean',
        default: true
      },
      slider: {
        type: 'object',
        default: {
          active: true
        }
      }
    },
    example: {
      attributes: {
        isExample: true
      }
    },
    supports: {
      multiple: true
    },
    edit: CategoryTermsFn,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/category-terms-editor.scss":
/*!****************************************************!*\
  !*** ./src/scss/blocks/category-terms-editor.scss ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/shortid/index.js":
/*!***************************************!*\
  !*** ./node_modules/shortid/index.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/shortid/lib/index.js");


/***/ }),

/***/ "./node_modules/shortid/lib/alphabet.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/alphabet.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ "./node_modules/shortid/lib/random/random-from-seed.js");

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),

/***/ "./node_modules/shortid/lib/build.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/build.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var generate = __webpack_require__(/*! ./generate */ "./node_modules/shortid/lib/generate.js");
var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1567752802062;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 7;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;


/***/ }),

/***/ "./node_modules/shortid/lib/generate.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/generate.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");
var random = __webpack_require__(/*! ./random/random-byte */ "./node_modules/shortid/lib/random/random-byte-browser.js");
var format = __webpack_require__(/*! nanoid/format */ "./node_modules/shortid/node_modules/nanoid/format.browser.js");

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;


/***/ }),

/***/ "./node_modules/shortid/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/index.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");
var build = __webpack_require__(/*! ./build */ "./node_modules/shortid/lib/build.js");
var isValid = __webpack_require__(/*! ./is-valid */ "./node_modules/shortid/lib/is-valid.js");

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js") || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;


/***/ }),

/***/ "./node_modules/shortid/lib/is-valid.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/is-valid.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(/*! ./alphabet */ "./node_modules/shortid/lib/alphabet.js");

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-byte-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-byte-browser.js ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;


/***/ }),

/***/ "./node_modules/shortid/lib/random/random-from-seed.js":
/*!*************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-from-seed.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),

/***/ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/lib/util/cluster-worker-id-browser.js ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";


module.exports = 0;


/***/ }),

/***/ "./node_modules/shortid/node_modules/nanoid/format.browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/node_modules/nanoid/format.browser.js ***!
  \********************************************************************/
/***/ (function(module) {

// This file replaces `format.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

module.exports = function (random, alphabet, size) {
  // We can’t use bytes bigger than the alphabet. To make bytes values closer
  // to the alphabet, we apply bitmask on them. We look for the closest
  // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
  // 30 symbols in the alphabet, we will take 31 (00011111).
  // We do not use faster Math.clz32, because it is not available in browsers.
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
  // which is bigger than the alphabet). As a result, we will need more bytes,
  // than ID size, because we will refuse bytes bigger than the alphabet.

  // Every hardware random generator call is costly,
  // because we need to wait for entropy collection. This is why often it will
  // be faster to ask for few extra bytes in advance, to avoid additional calls.

  // Here we calculate how many random bytes should we call in advance.
  // It depends on ID length, mask / alphabet size and magic number 1.6
  // (which was selected according benchmarks).

  // -~f => Math.ceil(f) if n is float number
  // -~i => i + 1 if n is integer number
  var step = -~(1.6 * mask * size / alphabet.length)
  var id = ''

  while (true) {
    var bytes = random(step)
    // Compact alternative for `for (var i = 0; i < step; i++)`
    var i = step
    while (i--) {
      // If random byte is bigger than alphabet even after bitmask,
      // we refuse it by `|| ''`.
      id += alphabet[bytes[i] & mask] || ''
      // More compact than `id.length + 1 === size`
      if (id.length === +size) return id
    }
  }
}


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
/*!*****************************************************!*\
  !*** ./src/entries/blocks/category-terms-editor.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_category_terms_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/category-terms-editor.scss */ "./src/scss/blocks/category-terms-editor.scss");
/* harmony import */ var _js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/category-terms-editor.jsx */ "./src/js/blocks/category-terms-editor.jsx");
/* harmony import */ var _js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_category_terms_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1jYXRlZ29yeS10ZXJtcy1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBRSxFQUFFQyxDQUFDLEVBQUU7RUFFakIsTUFBTTtJQUFFQztFQUFTLENBQUMsR0FBR0YsRUFBRTtFQUN2QixNQUFNO0lBQUVHO0VBQWtCLENBQUMsR0FBR0gsRUFBRSxDQUFDSSxNQUFNO0VBQ3ZDLE1BQU07SUFBRUMsU0FBUztJQUFFQyxRQUFRO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQztFQUFPLENBQUMsR0FBR1QsRUFBRSxDQUFDVSxPQUFPO0VBQ3ZFLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR1osRUFBRTtFQUNqRCxNQUFNO0lBQUVhLGlCQUFpQjtJQUFFQztFQUFjLENBQUMsR0FBR2QsRUFBRSxDQUFDZSxXQUFXO0VBQzNELE1BQU07SUFBRUMsYUFBYTtJQUFFQyxJQUFJO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQyxNQUFNO0lBQUVDLGFBQWE7SUFBRUMsWUFBWTtJQUFFQyxhQUFhO0lBQUVDLFdBQVc7SUFBRUMsUUFBUTtJQUFFQyxJQUFJO0lBQUVDLE9BQU87SUFBRUM7RUFBUyxDQUFDLEdBQUc1QixFQUFFLENBQUM2QixVQUFVO0VBQ3RLLE1BQU07SUFBRUM7RUFBRyxDQUFDLEdBQUc5QixFQUFFLENBQUMrQixJQUFJO0VBQ3RCLE1BQU1DLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxZQUFZO0lBQUMsS0FBSyxFQUFDO0VBQTRCLGdCQUNwRjtJQUFHLFNBQVMsRUFBQztFQUFPLGdCQUNuQjtJQUFHLEVBQUUsRUFBQztFQUFRLGdCQUNiO0lBQUcsRUFBRSxFQUFDO0VBQVEsZ0JBQ2I7SUFBTSxJQUFJLEVBQUMsU0FBUztJQUFDLFdBQVcsRUFBQyxHQUFHO0lBQUMsTUFBTSxFQUFDLFVBQVU7SUFBQyxFQUFFLEVBQUMsUUFBUTtJQUFDLEVB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Q1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNzRDs7QUFFdEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL2NhdGVnb3J5LXRlcm1zLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL2NhdGVnb3J5LXRlcm1zLWVkaXRvci5zY3NzP2U0ZDUiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbm9kZV9tb2R1bGVzL25hbm9pZC9mb3JtYXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL2NhdGVnb3J5LXRlcm1zLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgSW5zcGVjdG9yQ29udHJvbHMsIEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFRvZ2dsZUNvbnRyb2wsIEZsZXgsIEZsZXhJdGVtLCBQYW5lbEJvZHksIE5vdGljZSwgU2VsZWN0Q29udHJvbCwgVG9vbGJhckdyb3VwLCBUb29sYmFyQnV0dG9uLCBQbGFjZWhvbGRlciwgRGlzYWJsZWQsIENhcmQsIFNwaW5uZXIsIFRhYlBhbmVsIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCA4N1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8ZyBjbGFzc05hbWU9XCJsYXllclwiPlxuXHRcdFx0PGcgaWQ9XCJzdmdfMzNcIj5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfMTlcIj5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiIzAwMDAwMFwiIGZpbGxPcGFjaXR5PVwiMFwiIGhlaWdodD1cIjc3LjEyMzkyXCIgaWQ9XCJzdmdfMTBcIiByeD1cIjJcIiByeT1cIjJcIiBzdHJva2U9XCIjN2Y3ZjdmXCIgc3Ryb2tlV2lkdGg9XCIyXCIgd2lkdGg9XCI3Ny4xMjM5MlwiIHg9XCI0LjY1ODM4XCIgeT1cIjUuMDgyMTFcIiAvPlxuXHRcdFx0XHRcdDxyZWN0IGZpbGw9XCIjN2Y3ZjdmXCIgaGVpZ2h0PVwiOC4xODk2M1wiIGlkPVwic3ZnXzEyXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI1Ny44NzczMVwiIHg9XCIxNC4yODE2OVwiIHk9XCI1OS43MTE0NFwiIC8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIm0xNC43ODQyLDUzLjY3MDYzbDE0LjQ1MTA0LC0xOS44ODIyOWwxMC4xMDM3LDYuNTg3MzRsMTYuMjc2NzIsLTIzLjA3NTFsMTYuMDQwODQsMzYuNDYyMzlsLTU2Ljg3MjI5LC0wLjA5MjM0elwiIGZpbGw9XCIjN2Y3ZjdmXCIgaWQ9XCJzdmdfMTFcIiAvPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDxnIGlkPVwic3ZnXzIwXCI+XG5cdFx0XHRcdFx0PHJlY3QgZmlsbD1cIiMwMDAwMDBcIiBmaWxsT3BhY2l0eT1cIjBcIiBoZWlnaHQ9XCI3Ny4xMjM5MlwiIGlkPVwic3ZnXzIxXCIgcng9XCIyXCIgcnk9XCIyXCIgc3Ryb2tlPVwiIzdmN2Y3ZlwiIHN0cm9rZVdpZHRoPVwiMlwiIHdpZHRoPVwiNzcuMTIzOTJcIiB4PVwiOTguMDkwNThcIiB5PVwiNS4wODIxMVwiIC8+XG5cdFx0XHRcdFx0PHJlY3QgZmlsbD1cIiM3ZjdmN2ZcIiBoZWlnaHQ9XCI4LjE4OTYzXCIgaWQ9XCJzdmdfMjRcIiByeD1cIjFcIiByeT1cIjFcIiB3aWR0aD1cIjU3Ljg3NzMxXCIgeD1cIjEwNy43MTM4OVwiIHk9XCI1OS43MTE0NFwiIC8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIm0xMDguMjE2NCw1My42NzA2M2wxNC40NTEwNCwtMTkuODgyMjlsMTAuMTAzNyw2LjU4NzM0bDE2LjI3NjcyLC0yMy4wNzUxbDE2LjA0MDg0LDM2LjQ2MjM5bC01Ni44NzIyOSwtMC4wOTIzNHpcIiBmaWxsPVwiIzdmN2Y3ZlwiIGlkPVwic3ZnXzI1XCIgLz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8ZyBpZD1cInN2Z18yNlwiPlxuXHRcdFx0XHRcdDxyZWN0IGZpbGw9XCIjMDAwMDAwXCIgZmlsbE9wYWNpdHk9XCIwXCIgaGVpZ2h0PVwiNzcuMTIzOTJcIiBpZD1cInN2Z18yN1wiIHJ4PVwiMlwiIHJ5PVwiMlwiIHN0cm9rZT1cIiM3ZjdmN2ZcIiBzdHJva2VXaWR0aD1cIjJcIiB3aWR0aD1cIjc3LjEyMzkyXCIgeD1cIjE5MS43MzQ2NVwiIHk9XCI1LjA4MjExXCIgLz5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiIzdmN2Y3ZlwiIGhlaWdodD1cIjguMTg5NjNcIiBpZD1cInN2Z18yOVwiIHJ4PVwiMVwiIHJ5PVwiMVwiIHdpZHRoPVwiNTcuODc3MzFcIiB4PVwiMjAxLjM1Nzk1XCIgeT1cIjU5LjcxMTQ0XCIgLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwibTIwMS44NjA0Niw1My42NzA2M2wxNC40NTEwNCwtMTkuODgyMjlsMTAuMTAzNyw2LjU4NzM0bDE2LjI3NjcyLC0yMy4wNzUxbDE2LjA0MDg0LDM2LjQ2MjM5bC01Ni44NzIyOSwtMC4wOTIzNHpcIiBmaWxsPVwiIzdmN2Y3ZlwiIGlkPVwic3ZnXzMwXCIgLz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+O1xuXHRjb25zdCBzaG9ydGlkID0gcmVxdWlyZSgnc2hvcnRpZCcpO1xuXG5cdGxldCBsYXN0UHJldmlldyA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIENhdGVnb3J5VGVybXNGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtmaWx0ZXJEcm9wcGVkLCBzZXRGaWx0ZXJEcm9wcGVkXSA9IHVzZVN0YXRlKCQoKSk7XG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblx0XHRjb25zdCBbdGVybXNGZXRjaGVkLCBzZXRUZXJtc0ZldGNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRcdGNvbnN0IFt0ZXJtcywgc2V0VGVybXNdID0gdXNlU3RhdGUoe1xuXHRcdFx0c2VnbWVudDogW10sXG5cdFx0XHRjYXRlZ29yeTogW11cblx0XHR9KTtcblxuXHRcdGxldCBibG9ja1JlZiA9IHVzZVJlZigpO1xuXHRcdGNvbnN0IHNsb3RUaXRsZSA9IF9fKCdDYXRlZ29yeSB0ZXJtIHNsb3QnLCAnbWVzc2lhJyk7XG5cdFx0Y29uc3QgZHJhZ1RpdGxlID0gX18oJ0FkZCBDYXRlZ29yeSB0ZXJtJywgJ21lc3NpYScpO1xuXG5cdFx0Y29uc3QgaGFuZGxlclJlbW92ZSA9IChldmVudCkgPT4ge1xuXG5cdFx0XHQkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmNhdGVnb3J5LXNsb3QnKS5hbmltYXRlKHtcblx0XHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdH0sIDQwMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdyZW1vdmVkJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0Y29uc3QgY2F0ZWdvcmllcyA9ICQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmNhdGVnb3J5LWNvbnN0cnVjdGVkIC5jYXRlZ29yeS1zbG90Jyk7XG5cdFx0XHRcdHNhdmVTbG90cyhjYXRlZ29yaWVzKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRyYWdTb3J0SW5pdCA9ICgpID0+IHtcblxuXHRcdFx0Y29uc3Qgc29ydGFibGUgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5jYXRlZ29yeS1jb25zdHJ1Y3RlZCcpLm5vdCgndWktc29ydGFibGUnKS5zb3J0YWJsZSh7XG5cdFx0XHRcdGZvcmNlSGVscGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0Zm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXG5cdFx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHRcdC8vZGlzdGFuY2U6IDEwLFxuXHRcdFx0XHR0b2xlcmFuY2U6ICdpbnRlcnNlY3QnLFxuXHRcdFx0XHQvL2N1cnNvcjogJ2dyYWJiaWcnLFxuXHRcdFx0XHRzY3JvbGw6IHRydWUsXG5cdFx0XHRcdHNjcm9sbFNlbnNpdGl2aXR5OiAyMCxcblx0XHRcdFx0Y29udGFpbm1lbnQ6ICcuZWRpdC1wb3N0LXZpc3VhbC1lZGl0b3InLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ3NvcnRhYmxlLXBsYWNlaG9sZGVyJyxcblx0XHRcdFx0aGFuZGxlOiAnLm1vdmUnLFxuXHRcdFx0XHQvL3pJbmRleDogMTAwMDAsXG5cdFx0XHRcdHN0YXJ0OiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaXRlbS5hZGRDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRiZWZvcmVTdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0dWkuaXRlbS5maW5kKCcudGl0bGUgLnRleHQnKS50ZXh0KHNsb3RUaXRsZSk7XG5cdFx0XHRcdFx0c2hvd1Nsb3RTZXR0aW5ncyh1aSkudGhlbigodWkpID0+IHtcblx0XHRcdFx0XHRcdHNldEZpbHRlckRyb3BwZWQodWkuaXRlbSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgZHJhZ2dhYmxlID0gJChibG9ja1JlZi5jdXJyZW50KS5maW5kKCcuY2F0ZWdvcnktdGVtcGxhdGVzIC5jYXRlZ29yeS1zbG90Jykubm90KCcudWktZHJhZ2dhYmxlJykuZHJhZ2dhYmxlKHtcblx0XHRcdFx0Y29ubmVjdFRvU29ydGFibGU6ICcuY2F0ZWdvcnktY29uc3RydWN0ZWQnLFxuXHRcdFx0XHQvL2N1cnNvcjogJ2dyYWJiaWcnLFxuXHRcdFx0XHRoZWxwZXI6ICdjbG9uZScsXG5cdFx0XHRcdHJldmVydDogJ2ludmFsaWQnLFxuXHRcdFx0XHRzY3JvbGw6IGZhbHNlLFxuXHRcdFx0XHRyZXZlcnREdXJhdGlvbjogMjAwLFxuXHRcdFx0XHRoYW5kbGU6ICcubW92ZScsXG5cdFx0XHRcdHpJbmRleDogMTAsXG5cdFx0XHRcdHN0YXJ0OiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaGVscGVyLmFkZENsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdFx0c29ydGFibGUuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJlZm9yZVN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaGVscGVyLnJlbW92ZUNsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdHNvcnRhYmxlLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2F2ZVNsb3RzID0gKGNhdGVnb3JpZXMpID0+IHtcblxuXHRcdFx0bGV0IHN0b3JlID0gW107XG5cdFx0XHRjb25zdCBzZWdtZW50U2x1ZyA9IGNhdGVnb3JpZXMucGFyZW50cygnLm1lc3NpYS10YWJzLXBhbmVsJykuZmluZCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpLmF0dHIoJ2lkJykubWF0Y2goL3NlZ21lbnQtKC4rKS1zbHVnLylbMV07XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5jYXRlZ29yaWVzQ29uc3RydWN0ZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHJpYnV0ZXMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkW2ldLnNlZ21lbnRTbHVnID09PSBzZWdtZW50U2x1Zykge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFkZCBvdGhlciB0YWJzIGNhdGVnb3JpZXNcblx0XHRcdFx0c3RvcmUucHVzaChhdHRyaWJ1dGVzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZFtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQga2V5O1xuXHRcdFx0XHRpZiAoJChjYXRlZ29yaWVzW2ldKS5oYXNDbGFzcygncmVtb3ZlZCcpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiAkKGNhdGVnb3JpZXNbaV0pLmRhdGEoJ2tleScpKSB7XG5cdFx0XHRcdFx0a2V5ID0gc2hvcnRpZC5nZW5lcmF0ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGtleSA9ICQoY2F0ZWdvcmllc1tpXSkuZGF0YSgna2V5Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB0eXBlID0gJChjYXRlZ29yaWVzW2ldKS5kYXRhKCd0eXBlJyk7XG5cdFx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2NhdGVnb3J5JzpcblxuXHRcdFx0XHRcdFx0c3RvcmUucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBrZXksXG5cdFx0XHRcdFx0XHRcdCdzZWdtZW50U2x1Zyc6IHNlZ21lbnRTbHVnLFxuXHRcdFx0XHRcdFx0XHQnY2F0ZWdvcnlTbHVnJzogJChjYXRlZ29yaWVzW2ldKS5maW5kKCcuc2V0dGluZ3Mgc2VsZWN0JykudmFsKCksXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWx0ZXJEcm9wcGVkLmhhc0NsYXNzKCd1aS1kcmFnZ2FibGUnKSkge1xuXHRcdFx0XHRmaWx0ZXJEcm9wcGVkLmFkZENsYXNzKCdyZW1vdmUtYmVmb3JlLXJlbmRlcicpO1xuXHRcdFx0fVxuXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKHsgY2F0ZWdvcmllc0NvbnN0cnVjdGVkOiBzdG9yZSB9KTtcblx0XHR9XG5cblx0XHRjb25zdCBzaG93U2xvdFNldHRpbmdzID0gYXN5bmMgKHVpKSA9PiB7XG5cblx0XHRcdGlmICh1aS5pdGVtLmhhc0NsYXNzKCdzYXZlZCcpKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodWkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB3X2Zyb20gPSB1aS5pdGVtLm91dGVyV2lkdGgoKTtcblxuXHRcdFx0dWkuaXRlbS5jc3Moe1xuXHRcdFx0XHQnaGVpZ2h0JzogJycsXG5cdFx0XHRcdCd3aWR0aCc6ICcnLFxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHdfdG8gPSB1aS5pdGVtLm91dGVyV2lkdGgoKTtcblxuXHRcdFx0dWkuaXRlbS5jc3Moe1xuXHRcdFx0XHQnd2lkdGgnOiB3X2Zyb20sXG5cdFx0XHR9KS5hZGRDbGFzcygnZHJvcHBlZCcpOztcblxuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0Ly9DYXJkIGRpdlxuXHRcdFx0XHR1aS5pdGVtLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHdpZHRoOiB3X3RvICsgJ3B4Jyxcblx0XHRcdFx0fSwgMjAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xuXHRcdFx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvL1NldHRpbmcgZGl2XG5cdFx0XHRcdFx0Y29uc3Qgc2V0dGluZ3MgPSB1aS5pdGVtLmZpbmQoJy5zZXR0aW5ncycpO1xuXG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dWkuaXRlbS5hZGRDbGFzcygnc2F2ZWQnKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodWkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRcdFx0c2V0dGluZ3MuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGggPSBzZXR0aW5ncy5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgdyA9IHNldHRpbmdzLm91dGVyV2lkdGgoKTtcblxuXHRcdFx0XHRcdFx0c2V0dGluZ3MuY3NzKHtcblx0XHRcdFx0XHRcdFx0J2hlaWdodCc6IDAsXG5cdFx0XHRcdFx0XHRcdCd3aWR0aCc6IDAsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHNldHRpbmdzLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IGggKyAncHgnLFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogdyArICdweCcsXG5cdFx0XHRcdFx0XHR9LCAzMDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xuXHRcdFx0XHRcdFx0XHRcdCdoZWlnaHQnOiAnJyxcblx0XHRcdFx0XHRcdFx0XHQnd2lkdGgnOiAnJyxcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ3NhdmVkJyk7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUodWkpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEV4YW1wbGUgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gZXhhbXBsZUltYWdlRGF0YTtcblx0XHR9XG5cblx0XHRjb25zdCB0ZW1wbGF0ZXMgPSAoKSA9PiB7XG5cblx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblx0XHRcdGNvbnN0IHRlbXBsYXRlc0h0bWwgPSBbXG5cdFx0XHRcdDxGcmFnbWVudCBrZXk9J3RpcCc+XG5cdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU9e2ZhbHNlfVxuXHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0PHA+e19fKCdUaGUgbGlzdCBvZiB0ZXJtcyBpcyBzdWJvcmRpbmF0ZSB0byB0aGUgdmFsdWUgb2YgdGhlIFwiRW1wdHkgY2F0ZWdvcnkgdGVybXNcIiBvcHRpb24uIEVhY2ggbGlzdCBjb250YWlucyBhbGwgdGVybXMgb2YgdGF4b25vbXkgQ2F0ZWdvcnkuIEluIGZyb250ZW5kIHNlbGVjdGVkIHRlcm0gd2lsbCBiZSBzaG93biBhcyBhIGxpbmsgdG8gdGhlIHNlYXJjaCBwYWdlIGJ5IHRoaXMgdmFsdWUuJywgJ21lc3NpYScpfTwvcD5cblx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdF07XG5cblx0XHRcdGlmICh0ZXJtcy5jYXRlZ29yeS5sZW5ndGggPiAwKSB7XG5cblx0XHRcdFx0dGVtcGxhdGVzSHRtbC5wdXNoKFxuXHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCBjYXRlZ29yeS1zbG90XCJcblx0XHRcdFx0XHRcdGtleT1cInRtcGwtYnktY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdFx0ZGF0YS10eXBlPVwiY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJtb3ZlXCI+JmVxdWl2OzwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT0naGVhZGluZyc+e2RyYWdUaXRsZX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJyZW1vdmVcIiBvbkNsaWNrPXtoYW5kbGVyUmVtb3ZlfT48L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3NcIj5cblx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3Rlcm1zLmNhdGVnb3J5WzBdLnZhbHVlfVxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGVybXMuY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L0NhcmQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wbGF0ZXNIdG1sO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNsb3RzID0gKHRhYikgPT4ge1xuXG5cdFx0XHRjb25zdCBjYXRlZ29yaWVzQ29uc3RydWN0ZWRIdG1sID0gW107XG5cblx0XHRcdGZvciAoY29uc3QgW2luZGV4LCBmaWx0ZXJdIG9mIGF0dHJpYnV0ZXMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkLmVudHJpZXMoKSkge1xuXG5cdFx0XHRcdGlmICh0YWIuc2VnbWVudFNsdWcgIT0gZmlsdGVyLnNlZ21lbnRTbHVnKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYXRlZ29yaWVzQ29uc3RydWN0ZWRIdG1sLnB1c2goXG5cdFx0XHRcdFx0PENhcmRcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkIGNhdGVnb3J5LXNsb3QgZHJvcHBlZCBzYXZlZFwiXG5cdFx0XHRcdFx0XHRrZXk9e2Ake2ZpbHRlci5jYXRlZ29yeVNsdWd9LSR7ZmlsdGVyLmlkfWB9XG5cdFx0XHRcdFx0XHRkYXRhLXR5cGU9XCJjYXRlZ29yeVwiXG5cdFx0XHRcdFx0XHRzaXplPVwic21hbGxcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWNhcmQtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdGdhcD17Mn0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cIm1vdmVcIj4mZXF1aXY7PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPSdoZWFkaW5nJz57c2xvdFRpdGxlfTwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cInJlbW92ZVwiIG9uQ2xpY2s9e2hhbmRsZXJSZW1vdmV9PjwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZXR0aW5nc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5jYXRlZ29yaWVzQ29uc3RydWN0ZWRbaW5kZXhdLmNhdGVnb3J5U2x1Z31cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodGVybVNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGF0dHIgPSBhdHRyaWJ1dGVzLmNhdGVnb3JpZXNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGF0dHJpYnV0ZXMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhdHRyW2luZGV4XS5jYXRlZ29yeVNsdWcgPSB0ZXJtU2x1Zztcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGNhdGVnb3JpZXNDb25zdHJ1Y3RlZDogYXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0ZXJtcy5jYXRlZ29yeX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvQ2FyZD5cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNhdGVnb3JpZXNDb25zdHJ1Y3RlZEh0bWw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0SW5zcGVjdG9yQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxJbnNwZWN0b3JDb250cm9scyBrZXk9J2luc3BlY3Rvcic+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSB0aXRsZT17X18oJ1NldHRpbmdzJywgJ21lc3NpYScpfSA+XG5cdFx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1Nob3cgb24gZnJvbnQgbnVtYmVyIG9mIG9iamVjdHMgcGVyIHRlcm0uJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLndpdGhDb3VudH1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhjaGVja2VkKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHdpdGhDb3VudDogY2hlY2tlZCB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHQvL2NsYXNzTmFtZT1cImNyaXRlcmlhLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1Nob3cgaW4gc2xpZGVyJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLnNsaWRlci5hY3RpdmV9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBzbGlkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBhdHRyaWJ1dGVzLnNsaWRlcik7XG5cdFx0XHRcdFx0XHRcdFx0c2xpZGVyLmFjdGl2ZSA9IEJvb2xlYW4oY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHNsaWRlcjogc2xpZGVyIH0pO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PC9JbnNwZWN0b3JDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGVybXNGZXRjaGVkKSB7XG5cdFx0XHRcdGlmICh0ZXJtcy5zZWdtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb25zdCB0YWJzSHRtbCA9IFtdO1xuXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBbaW5kZXhTZWdtZW50LCBzZWdtZW50XSBvZiB0ZXJtcy5zZWdtZW50LmVudHJpZXMoKSkge1xuXHRcdFx0XHRcdFx0dGFic0h0bWwucHVzaCh7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGBzZWdtZW50LSR7c2VnbWVudC52YWx1ZX0tc2x1Z2AsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBzZWdtZW50LmxhYmVsLFxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6ICd0YWInLFxuXHRcdFx0XHRcdFx0XHRzZWdtZW50U2x1Zzogc2VnbWVudC52YWx1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IHRhYnMgPSA8VGFiUGFuZWxcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS10YWJzLXBhbmVsXCJcblx0XHRcdFx0XHRcdGFjdGl2ZUNsYXNzPVwiYWN0aXZlLXRhYlwiXG5cdFx0XHRcdFx0XHRvcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0aW5pdGlhbFRhYk5hbWU9e3RhYnNIdG1sWzBdLm5hbWV9XG5cdFx0XHRcdFx0XHR0YWJzPXt0YWJzSHRtbH0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdCh0YWIpID0+IDxkaXYgZGF0YS10aXRsZT17X18oJ0Ryb3AgaXRlbSBoZXJlLicsICdtZXNzaWEnKX0gY2xhc3NOYW1lPVwibWVzc2lhLWRyb3Atem9uZSBjYXRlZ29yeS1jb25zdHJ1Y3RlZFwiPntzbG90cyh0YWIpfTwvZGl2PlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvVGFiUGFuZWw+XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2F0ZWdvcnktdGVtcGxhdGVzXCI+e3RlbXBsYXRlcygpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdHt0YWJzfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiIGxhYmVsPXtfXyhcIllvdSBoYXZlIG5vIHNlZ21lbnRzLiBDcmVhdGUgb25lLlwiLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PjwvZGl2PlxuXHRcdFx0XHRcdFx0PC9QbGFjZWhvbGRlciA+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PFNwaW5uZXIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja1ByZXZpZXcgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0PERpc2FibGVkIGtleT1cImJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHRcdDxTZXJ2ZXJTaWRlUmVuZGVyXG5cdFx0XHRcdFx0XHRcdGJsb2NrPXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzPXthdHRyaWJ1dGVzfVxuXHRcdFx0XHRcdFx0XHR1cmxRdWVyeUFyZ3M9e3sgaXNQcmV2aWV3OiB0cnVlIH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRUZXJtcyA9IGFzeW5jICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IGFwaUZldGNoKHtcblx0XHRcdFx0cGF0aDogJ21lc3NpYS92MS9ibG9jay1jYXRlZ29yeS10ZXJtcycsXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRkYXRhOiB7IGN1cnJlbnRBdHRyczogYXR0cmlidXRlcyB9XG5cdFx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuXHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMuc2VnbWVudC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdF9fKCdNZXNzaWEgQ2F0ZWdvcnkgVGVybXM6IE5vIHRlcm1zIHdlcmUgZm91bmQgaW4gdGF4b25vbXkgU2VnbWVudC4gVW5pdCBvcGVyYXRpb24gaXMgbm90IHBvc3NpYmxlLicsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZS50ZXJtcy5jYXRlZ29yeS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0XHRcdF9fKCdNZXNzaWEgQ2F0ZWdvcnkgVGVybXM6IE5vIHRlcm1zIHdlcmUgZm91bmQgaW4gdGF4b25vbXkgQ2F0ZWdvcnkuIEFkZCBzb21lIHRvIHVzZSBibG9jay4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cblx0XHRcdH0pLmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRfXygnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVjZWl2aW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyIGZvciBDYXRlZ29yeSBUZXJtcyBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRpZiAoZmlsdGVyRHJvcHBlZC5oYXNDbGFzcygncmVtb3ZlLWJlZm9yZS1yZW5kZXInKSkge1xuXHRcdFx0XHRcdGZpbHRlckRyb3BwZWQucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0SW5zcGVjdG9yQ29udHJvbHMoKSxcblx0XHRcdFx0XHRnZXRCbG9ja0NvbnRyb2xzKCksXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0aWYgKGVkaXRNb2RlKSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2goZ2V0QmxvY2tFZGl0KCkpO1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoIWxhc3RQcmV2aWV3KSB7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBnZXRCbG9ja1ByZXZpZXcoKTtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX0+e3JlbmRlcn08L2Rpdj47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0bGV0IGlzTW91bnRlZCA9IHRydWU7XG5cdFx0XHRpZiAoIXRlcm1zRmV0Y2hlZCAmJiAhYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblxuXHRcdFx0XHRnZXRUZXJtcygpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cblx0XHRcdFx0XHRpZiAoaXNNb3VudGVkKSB7XG5cblx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoe1xuXHRcdFx0XHRcdFx0XHRjYXRlZ29yaWVzQ29uc3RydWN0ZWQ6IHJlc3BvbnNlLnZhbGlkQXR0cnMuY2F0ZWdvcmllc0NvbnN0cnVjdGVkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHNldFRlcm1zKHJlc3BvbnNlLnRlcm1zKTtcblx0XHRcdFx0XHRcdHNldFRlcm1zRmV0Y2hlZCh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICgpID0+IHsgaXNNb3VudGVkID0gZmFsc2UgfTtcblxuXHRcdH0sIFt0ZXJtc0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGlmICghZWRpdE1vZGUgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdCQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmNhdGVnb3J5LWNvbnN0cnVjdGVkJykuc29ydGFibGUoJ2Rlc3Ryb3knKTtcblx0XHRcdH1cblxuXHRcdH0sIFtlZGl0TW9kZV0pO1xuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0aWYgKGZpbHRlckRyb3BwZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGNhdGVnb3JpZXMgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5jYXRlZ29yeS1jb25zdHJ1Y3RlZCAuY2F0ZWdvcnktc2xvdCcpO1xuXHRcdFx0c2F2ZVNsb3RzKGNhdGVnb3JpZXMpO1xuXHRcdH0sIFtmaWx0ZXJEcm9wcGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpID0+IHtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uc0xpc3QpIHtcblx0XHRcdFx0XHRpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcblx0XHRcdFx0XHRcdGlmIChtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRhYkFyZWEgPSAkKG11dGF0aW9uLmFkZGVkTm9kZXNbaV0pLmZpbmQoJy5jYXRlZ29yeS1jb25zdHJ1Y3RlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0YWJBcmVhLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRyYWdTb3J0SW5pdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdG9ic2VydmVyLm9ic2VydmUoXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdC8vIExhdGVyLCB3ZSBjYW4gc3RvcCBvYnNlcnZpbmdcblx0XHRcdC8vIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblxuXHRcdH0sIFtdKTtcblxuXHRcdHJldHVybiByZW5kZXIoKTtcblx0fVxuXG5cdHJlZ2lzdGVyQmxvY2tUeXBlKCdtZXNzaWEvYmxvY2stY2F0ZWdvcnktdGVybXMnLCB7XG5cdFx0dGl0bGU6IF9fKCdDYXRlZ29yeVxcJ3MgdGVybXMnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdUZXJtcyBvZiB0YXhvbm9teSBDYXRlZ29yeSBieSBwYXJhbWV0ZXJzJywgJ21lc3NpYScpLFxuXHRcdGljb246IDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTYgMjFjMCAxLjY1Ny0xLjM0NCAzLTMgMy0xLjY1NyAwLTMtMS4zNDMtMy0zczEuMzQzLTMgMy0zYzEuNjU2IDAgMyAxLjM0MyAzIDN6bTYtM2MtMS42NTcgMC0zIDEuMzQzLTMgM3MxLjM0MyAzIDMgM2MxLjY1NiAwIDMtMS4zNDMgMy0zcy0xLjM0NC0zLTMtM3ptMC0xOGMtMS42NTcgMC0zIDEuMzQzLTMgM3MxLjM0MyAzIDMgM2MxLjY1NiAwIDMtMS4zNDMgMy0zcy0xLjM0NC0zLTMtM3ptOSAxOGMtMS42NTYgMC0zIDEuMzQzLTMgM3MxLjM0NCAzIDMgMyAzLTEuMzQzIDMtMy0xLjM0NC0zLTMtM3ptLTEuNTc3LTEuNzIxbC02LjQyMy01LjAyOHYtMy4zNTJjLS4zMjMuMDY2LS42NTguMTAxLTEgLjEwMXMtLjY3Ny0uMDM1LTEtLjEwMXYzLjM1MmwtNi40MjMgNS4wMjhjLjY5NC4yMzMgMS4zMjMuNjAyIDEuODQ0IDEuMDkzbDUuNTc5LTQuMzcyIDUuNTc5IDQuMzczYy41MjItLjQ5MiAxLjE1LS44NjEgMS44NDQtMS4wOTR6XCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ2NhdGVnb3J5J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRjYXRlZ29yaWVzQ29uc3RydWN0ZWQ6IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0d2l0aENvdW50OiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRzbGlkZXI6IHtcblx0XHRcdFx0dHlwZTogJ29iamVjdCcsXG5cdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRhY3RpdmU6IHRydWUsXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IENhdGVnb3J5VGVybXNGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbmZ1bmN0aW9uIGdldCAoKSB7XG4gIHJldHVybiBhbHBoYWJldCB8fCBPUklHSU5BTDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0OiBnZXQsXG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdlbmVyYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTU2Nzc1MjgwMjA2MjtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA3O1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gYnVpbGQoY2x1c3RlcldvcmtlcklkKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUodmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHNlY29uZHMpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xudmFyIGZvcm1hdCA9IHJlcXVpcmUoJ25hbm9pZC9mb3JtYXQnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUobnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBmb3JtYXQocmFuZG9tLCBhbHBoYWJldC5nZXQoKSwgMSk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgcmV0dXJuIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCk7XG59XG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbm9uQWxwaGFiZXRpYyA9IG5ldyBSZWdFeHAoJ1teJyArXG4gICAgICBhbHBoYWJldC5nZXQoKS5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKSArXG4gICAgJ10nKTtcbiAgICByZXR1cm4gIW5vbkFscGhhYmV0aWMudGVzdChpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxudmFyIHJhbmRvbUJ5dGU7XG5cbmlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xufSBlbHNlIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG4iLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGZvcm1hdC5qc2AgaW4gYnVuZGxlcnMgbGlrZSB3ZWJwYWNrIG9yIFJvbGx1cCxcbi8vIGFjY29yZGluZyB0byBgYnJvd3NlcmAgY29uZmlnIGluIGBwYWNrYWdlLmpzb25gLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyYW5kb20sIGFscGhhYmV0LCBzaXplKSB7XG4gIC8vIFdlIGNhbuKAmXQgdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC4gVG8gbWFrZSBieXRlcyB2YWx1ZXMgY2xvc2VyXG4gIC8vIHRvIHRoZSBhbHBoYWJldCwgd2UgYXBwbHkgYml0bWFzayBvbiB0aGVtLiBXZSBsb29rIGZvciB0aGUgY2xvc2VzdFxuICAvLyBgMiAqKiB4IC0gMWAgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGJpZ2dlciB0aGFuIGFscGhhYmV0IHNpemUuIElmIHdlIGhhdmVcbiAgLy8gMzAgc3ltYm9scyBpbiB0aGUgYWxwaGFiZXQsIHdlIHdpbGwgdGFrZSAzMSAoMDAwMTExMTEpLlxuICAvLyBXZSBkbyBub3QgdXNlIGZhc3RlciBNYXRoLmNsejMyLCBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGUgaW4gYnJvd3NlcnMuXG4gIHZhciBtYXNrID0gKDIgPDwgTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikgLSAxXG4gIC8vIEJpdG1hc2sgaXMgbm90IGEgcGVyZmVjdCBzb2x1dGlvbiAoaW4gb3VyIGV4YW1wbGUgaXQgd2lsbCBwYXNzIDMxIGJ5dGVzLFxuICAvLyB3aGljaCBpcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQpLiBBcyBhIHJlc3VsdCwgd2Ugd2lsbCBuZWVkIG1vcmUgYnl0ZXMsXG4gIC8vIHRoYW4gSUQgc2l6ZSwgYmVjYXVzZSB3ZSB3aWxsIHJlZnVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuXG5cbiAgLy8gRXZlcnkgaGFyZHdhcmUgcmFuZG9tIGdlbmVyYXRvciBjYWxsIGlzIGNvc3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgZm9yIGVudHJvcHkgY29sbGVjdGlvbi4gVGhpcyBpcyB3aHkgb2Z0ZW4gaXQgd2lsbFxuICAvLyBiZSBmYXN0ZXIgdG8gYXNrIGZvciBmZXcgZXh0cmEgYnl0ZXMgaW4gYWR2YW5jZSwgdG8gYXZvaWQgYWRkaXRpb25hbCBjYWxscy5cblxuICAvLyBIZXJlIHdlIGNhbGN1bGF0ZSBob3cgbWFueSByYW5kb20gYnl0ZXMgc2hvdWxkIHdlIGNhbGwgaW4gYWR2YW5jZS5cbiAgLy8gSXQgZGVwZW5kcyBvbiBJRCBsZW5ndGgsIG1hc2sgLyBhbHBoYWJldCBzaXplIGFuZCBtYWdpYyBudW1iZXIgMS42XG4gIC8vICh3aGljaCB3YXMgc2VsZWN0ZWQgYWNjb3JkaW5nIGJlbmNobWFya3MpLlxuXG4gIC8vIC1+ZiA9PiBNYXRoLmNlaWwoZikgaWYgbiBpcyBmbG9hdCBudW1iZXJcbiAgLy8gLX5pID0+IGkgKyAxIGlmIG4gaXMgaW50ZWdlciBudW1iZXJcbiAgdmFyIHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgdmFyIGlkID0gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBieXRlcyA9IHJhbmRvbShzdGVwKVxuICAgIC8vIENvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgXG4gICAgdmFyIGkgPSBzdGVwXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gSWYgcmFuZG9tIGJ5dGUgaXMgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgZXZlbiBhZnRlciBiaXRtYXNrLFxuICAgICAgLy8gd2UgcmVmdXNlIGl0IGJ5IGB8fCAnJ2AuXG4gICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnXG4gICAgICAvLyBNb3JlIGNvbXBhY3QgdGhhbiBgaWQubGVuZ3RoICsgMSA9PT0gc2l6ZWBcbiAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL2NhdGVnb3J5LXRlcm1zLWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9jYXRlZ29yeS10ZXJtcy1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiZWxlbWVudCIsInNlcnZlclNpZGVSZW5kZXIiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJUb2dnbGVDb250cm9sIiwiRmxleCIsIkZsZXhJdGVtIiwiUGFuZWxCb2R5IiwiTm90aWNlIiwiU2VsZWN0Q29udHJvbCIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiQ2FyZCIsIlNwaW5uZXIiLCJUYWJQYW5lbCIsImNvbXBvbmVudHMiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwic2hvcnRpZCIsInJlcXVpcmUiLCJsYXN0UHJldmlldyIsIkNhdGVnb3J5VGVybXNGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZmlsdGVyRHJvcHBlZCIsInNldEZpbHRlckRyb3BwZWQiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwidGVybXNGZXRjaGVkIiwic2V0VGVybXNGZXRjaGVkIiwidGVybXMiLCJzZXRUZXJtcyIsInNlZ21lbnQiLCJjYXRlZ29yeSIsImJsb2NrUmVmIiwic2xvdFRpdGxlIiwiZHJhZ1RpdGxlIiwiaGFuZGxlclJlbW92ZSIsImV2ZW50IiwidGFyZ2V0IiwicGFyZW50cyIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYWRkQ2xhc3MiLCJjc3MiLCJjYXRlZ29yaWVzIiwiY3VycmVudCIsImZpbmQiLCJzYXZlU2xvdHMiLCJkcmFnU29ydEluaXQiLCJzb3J0YWJsZSIsIm5vdCIsImZvcmNlSGVscGVyU2l6ZSIsImZvcmNlUGxhY2Vob2xkZXJTaXplIiwidG9sZXJhbmNlIiwic2Nyb2xsIiwic2Nyb2xsU2Vuc2l0aXZpdHkiLCJjb250YWlubWVudCIsInBsYWNlaG9sZGVyIiwiaGFuZGxlIiwic3RhcnQiLCJ1aSIsIml0ZW0iLCJiZWZvcmVTdG9wIiwicmVtb3ZlQ2xhc3MiLCJzdG9wIiwidGV4dCIsInNob3dTbG90U2V0dGluZ3MiLCJ0aGVuIiwiZHJhZ2dhYmxlIiwiY29ubmVjdFRvU29ydGFibGUiLCJoZWxwZXIiLCJyZXZlcnQiLCJyZXZlcnREdXJhdGlvbiIsInpJbmRleCIsInN0b3JlIiwic2VnbWVudFNsdWciLCJhdHRyIiwibWF0Y2giLCJpIiwiY2F0ZWdvcmllc0NvbnN0cnVjdGVkIiwibGVuZ3RoIiwicHVzaCIsImtleSIsImhhc0NsYXNzIiwiZGF0YSIsImdlbmVyYXRlIiwidHlwZSIsImlkIiwidmFsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ3X2Zyb20iLCJvdXRlcldpZHRoIiwid190byIsInJlamVjdCIsIndpZHRoIiwic2V0dGluZ3MiLCJoIiwib3V0ZXJIZWlnaHQiLCJ3IiwiaGVpZ2h0IiwiZ2V0RXhhbXBsZSIsInRlbXBsYXRlcyIsImJsb2NrIiwiZ2V0QmxvY2tUeXBlIiwidGVtcGxhdGVzSHRtbCIsInRpdGxlIiwidmFsdWUiLCJzbG90cyIsInRhYiIsImNhdGVnb3JpZXNDb25zdHJ1Y3RlZEh0bWwiLCJpbmRleCIsImZpbHRlciIsImVudHJpZXMiLCJjYXRlZ29yeVNsdWciLCJ0ZXJtU2x1ZyIsImdldEluc3BlY3RvckNvbnRyb2xzIiwid2l0aENvdW50IiwiY2hlY2tlZCIsInNsaWRlciIsImFjdGl2ZSIsIk9iamVjdCIsImFzc2lnbiIsIkJvb2xlYW4iLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwidGFic0h0bWwiLCJpbmRleFNlZ21lbnQiLCJsYWJlbCIsInRhYnMiLCJnZXRCbG9ja1ByZXZpZXciLCJpc1ByZXZpZXciLCJnZXRUZXJtcyIsInBhdGgiLCJtZXRob2QiLCJjdXJyZW50QXR0cnMiLCJyZXNwb25zZSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsInJlbW92ZSIsImNsYXNzZXMiLCJqb2luIiwiaXNNb3VudGVkIiwidmFsaWRBdHRycyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uc0xpc3QiLCJtdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJ0YWJBcmVhIiwib2JzZXJ2ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJkZXNjcmlwdGlvbiIsImljb24iLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
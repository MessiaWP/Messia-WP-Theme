/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/tabs-panel-editor.jsx":
/*!*********************************************!*\
  !*** ./src/js/blocks/tabs-panel-editor.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function (wp, $) {
  const {
    apiFetch
  } = wp;
  const {
    addFilter
  } = wp.hooks;
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
    Button,
    Notice,
    Flex,
    FlexItem,
    Card,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    ToggleControl,
    Spinner,
    TabPanel,
    __experimentalSpacer: Spacer,
    __experimentalInputControl: InputControl
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "m87.28121,29.13782c-3.99871,0 -7.27731,3.28806 -7.27731,7.27731l0,14.54513l0.00949,0l0,63.06999c0,2.65318 2.19835,4.85154 4.85154,4.85154l61.74338,0c3.10802,9.81679 12.31837,16.98038 23.1301,16.98038c13.34172,0 24.25768,-10.91596 24.25768,-24.25769c0,-6.74667 -2.79531,-12.85847 -7.2773,-17.27412l0,-43.3701c0,-2.65318 -2.19836,-4.85154 -4.85154,-4.85154l-9.70308,0l0,-9.69359c0,-3.98925 -3.28805,-7.27731 -7.2773,-7.27731l-19.40615,0c-1.8667,0 -3.55337,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98484,-1.9046 -4.85154,-1.9046l-19.40615,0c-1.8667,0 -3.55336,0.73909 -4.85154,1.9046c-1.29817,-1.16551 -2.98483,-1.9046 -4.85153,-1.9046l-19.38721,0zm0,4.85154l19.38721,0c1.37398,0 2.42576,1.05179 2.42576,2.42577l0,14.54513l72.77307,0l0,39.68407c-3.0701,-1.79092 -6.54768,-2.91851 -10.26214,-3.20279c-0.6159,-0.05683 -1.23183,-0.09475 -1.8667,-0.09475c-1.66772,0 -3.29752,0.17056 -4.87049,0.49275c-0.78648,0.16107 -1.56348,0.36954 -2.32153,0.60644c-7.5995,2.35943 -13.60706,8.36699 -15.96648,15.96648c-0.2369,0.75806 -0.44538,1.52557 -0.60645,2.31205c0,0 0,0.00949 0,0.00949c-0.32219,1.57296 -0.49274,3.20276 -0.49274,4.87048c0,0.81491 0.04737,1.62983 0.12318,2.42577l-60.73897,0l0,-67.92153l-0.00949,0l0,-9.69359c0,-1.37398 1.05181,-2.42577 2.42577,-2.42577zm29.09028,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm29.10923,0l19.40615,0c1.37398,0 2.42577,1.05179 2.42577,2.42577l0,9.69359l-24.25769,0l0,-9.69359c0,-1.37398 1.05179,-2.42577 2.42577,-2.42577zm24.25769,58.20897c0.65381,0 1.29817,0.03792 1.93304,0.10424c0.12318,0.00948 0.24636,0.02843 0.37903,0.04737c0.51167,0.06632 1.02336,0.13267 1.5161,0.2369c0.14213,0.02843 0.2748,0.06632 0.40744,0.09475c0.46431,0.10424 0.91914,0.21793 1.37398,0.3506c0.18952,0.06632 0.37902,0.13266 0.56855,0.19898c0.39797,0.13267 0.78646,0.2748 1.17497,0.43589c0.19898,0.07581 0.40745,0.17056 0.60644,0.26531c0.34114,0.15161 0.67276,0.3127 1.00441,0.49274c0.21796,0.1137 0.43589,0.2369 0.64436,0.3506c0.31268,0.18952 0.62539,0.37903 0.92861,0.56855c0.22742,0.15161 0.43589,0.29374 0.65382,0.45483c0.25584,0.17056 0.5022,0.36006 0.74859,0.54959c0.23688,0.1895 0.47378,0.37902 0.71065,0.58749c4.12192,3.56285 6.75616,8.82182 6.75616,14.66831c0,10.6696 -8.73656,19.40615 -19.40615,19.40615c-9.21982,0 -16.98039,-6.51925 -18.92289,-15.17054c-0.14213,-0.62539 -0.24636,-1.25077 -0.33165,-1.88565c0,-0.06632 -0.01895,-0.13266 -0.02843,-0.19898c-0.07581,-0.71068 -0.12318,-1.43082 -0.12318,-2.15098c0,-0.6633 0.03791,-1.32658 0.10423,-1.97094c0,-0.00948 -0.00948,-0.01894 0,-0.01894c0.92861,-9.09663 8.2154,-16.38343 17.31203,-17.31203c0,-0.00949 0.00946,0 0.01895,0c0.64436,-0.07581 1.30763,-0.10424 1.97094,-0.10424z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_2",
    stroke: "#000000",
    strokeLinecap: "round",
    strokeWidth: "5",
    x1: "170.16668",
    x2: "170.16668",
    y1: "100.16667",
    y2: "122.85538"
  }), /*#__PURE__*/React.createElement("line", {
    fill: "none",
    id: "svg_4",
    stroke: "#000000",
    strokeLinecap: "round",
    strokeWidth: "5",
    transform: "rotate(90 170.167 111.511)",
    x1: "170.16667",
    x2: "170.16667",
    y1: "100.16664",
    y2: "122.85535"
  })));
  const shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
  let lastPreview = false;
  function TabsPanelFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [editMode, setEditMode] = useState(true);
    const [termsFetched, setTermsFetched] = useState(false);
    const [terms, setTerms] = useState({
      segment: []
    });
    let activeSegment;
    let blockRef = useRef();
    const sortableInit = () => {
      $(blockRef.current).find('.tab-constructed').not('ui-sortable').sortable({
        forceHelperSize: true,
        forcePlaceholderSize: true,
        opacity: 1,
        //distance: 10,
        tolerance: 'intersect',
        //cursor: 'grabbig',
        scroll: true,
        scrollSensitivity: 20,
        containment: '.edit-widgets-block-editor',
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
          saveTabs();
        }
      });
    };
    const removeTab = event => {
      const tabsSegmentOther = [],
        tabsSegmentCurrent = [],
        // Find shown tabs in current segment
        tabs = event.target.closest('.tab-constructed').querySelectorAll('.tab-fields'),
        // Define tab being removed
        remove = event.target.closest('.tab-fields');
      for (let i = 0; i < attributes.tabsConstructed.length; i++) {
        if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
          // Find saved tabs in current segment
          tabsSegmentCurrent.push(attributes.tabsConstructed[i]);
        } else {
          tabsSegmentOther.push(attributes.tabsConstructed[i]);
        }
      }
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (remove === tab) {
          // Found terget tab to remove.
          // It's index is the same as in saved tabs within segment
          tabsSegmentCurrent.splice(i, 1);
        }
      }
      let store = tabsSegmentCurrent.concat(tabsSegmentOther);
      $(remove).animate({
        opacity: 0
      }, 400, () => {
        setAttributes({
          tabsConstructed: store
        });
      });
    };
    const toggleTab = event => {
      var tab = $(event.target).parents('.tab');
      tab.find('.content').toggle('blind', {
        direction: 'up',
        duration: 300
      });
      if (tab.hasClass('collapsed')) {
        tab.removeClass('collapsed').addClass('expanded');
      } else {
        tab.removeClass('expanded').addClass('collapsed');
      }
    };
    const addTab = () => {
      const store = [],
        newTab = {
          id: shortid.generate(),
          segmentSlug: activeSegment,
          title: __('Tab name', 'messia'),
          content: '',
          active: false
        };
      for (let i = 0; i < attributes.tabsConstructed.length; i++) {
        // add other tabs segments
        store.push(attributes.tabsConstructed[i]);
      }
      store.push(newTab);
      setAttributes({
        tabsConstructed: store
      });
    };
    const saveTabs = () => {
      const store = [],
        tabs = $(blockRef.current).find('.tab-fields'),
        activeSegment = tabs.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];
      for (let i = 0; i < attributes.tabsConstructed.length; i++) {
        if (attributes.tabsConstructed[i].segmentSlug === activeSegment) {
          continue;
        }
        // add other tabs segments
        store.push(attributes.tabsConstructed[i]);
      }
      for (let q = 0; q < tabs.length; q++) {
        store.push({
          id: $(tabs[q]).attr('id'),
          segmentSlug: activeSegment,
          title: $(tabs[q]).find('.tab-title input').val(),
          content: $(tabs[q]).find('.tab-content textarea').val(),
          active: $(tabs[q]).find('.tab-status input').prop('checked')
        });
      }
      setAttributes({
        tabsConstructed: store
      });
    };
    const getExample = () => {
      return exampleImageData;
    };
    const tabsContent = tab => {
      activeSegment = tab.segmentSlug;
      const tabsConstructedHtml = [];
      for (const [index, tabConstructed] of attributes.tabsConstructed.entries()) {
        if (tab.segmentSlug != tabConstructed.segmentSlug) {
          continue;
        }
        let tabClasses = ['tab', 'collapsed'];
        if (!tabConstructed.active) tabClasses.push('inactive');
        tabsConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card tab-fields",
          size: "small",
          id: tabConstructed.id,
          key: `${tabConstructed.segmentSlug}-${tabConstructed.id}`
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-card-content"
        }, /*#__PURE__*/React.createElement("div", {
          className: tabClasses.join(' ')
        }, /*#__PURE__*/React.createElement(Flex, {
          gap: 2
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "move"
        }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
          className: "header"
        }, /*#__PURE__*/React.createElement(InputControl, {
          className: "tab-title",
          value: tabConstructed.title,
          onChange: value => saveTabs()
        })), /*#__PURE__*/React.createElement(FlexItem, {
          title: __('The tab is active and will be displayed', 'messia')
        }, /*#__PURE__*/React.createElement(ToggleControl, {
          className: "tab-status",
          checked: tabConstructed.active,
          onChange: value => saveTabs()
        })), /*#__PURE__*/React.createElement(FlexItem, {
          className: "toggle",
          onClick: toggleTab
        }), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: removeTab
        })), /*#__PURE__*/React.createElement(Spacer, {
          className: "content",
          margin: 0,
          paddingTop: 2
        }, /*#__PURE__*/React.createElement("div", {
          className: "tab-content"
        }, /*#__PURE__*/React.createElement("textarea", {
          value: tabConstructed.content,
          onChange: value => saveTabs()
        })))))));
      }
      return tabsConstructedHtml;
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
          const block = wp.blocks.getBlockType(name);
          const tabsHtml = [];
          for (const [indexSegment, segment] of terms.segment.entries()) {
            tabsHtml.push({
              name: `segment-${segment.value}-slug`,
              title: segment.label,
              className: 'tab',
              segmentSlug: segment.value
            });
          }
          const heading = /*#__PURE__*/React.createElement(Fragment, {
            key: "tip"
          }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
            isDismissible: false,
            status: "warning"
          }, /*#__PURE__*/React.createElement("p", null, __('Add tab into segments, set it\'s content, activity status and reorder them if needed.', 'messia'))), /*#__PURE__*/React.createElement(Spacer, {
            marginTop: 5
          }, /*#__PURE__*/React.createElement(Button, {
            isPrimary: true,
            onClick: addTab
          }, __('Add a tab', 'messia'))));
          const tabs = /*#__PURE__*/React.createElement(TabPanel, {
            className: "messia-tabs-panel",
            activeClass: "active-tab",
            orientation: "horizontal",
            initialTabName: tabsHtml[0].name,
            onSelect: tabName => {},
            tabs: tabsHtml
          }, tab => {
            return /*#__PURE__*/React.createElement("div", {
              "data-title": __('Drop item here.', 'messia'),
              className: "tab-constructed"
            }, tabsContent(tab));
          });
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, heading, tabs));
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
        path: 'messia/v1/block-tabs-panel',
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
        let classes = [className];
        const render = [getBlockControls()];
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
              tabsConstructed: response.validAttrs.tabsConstructed
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
      if (!editMode) return;
      let observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length >= 1) {
              for (let i = 0; i < mutation.addedNodes.length; i++) {
                const tabArea = $(mutation.addedNodes[i]).find('.tab-constructed');
                if (tabArea.length > 0) {
                  sortableInit();
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
    }, [editMode]);
    return render();
  }
  registerBlockType('messia/block-tabs-panel', {
    title: __('Tabs panel', 'messia'),
    description: __('Customisable tabs with objects custom fields data or any content.', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m2.34001,1.85554c-0.79516,-0.00072 -1.45015,0.65428 -1.45015,1.44921l0.00283,17.87359c0,0.52802 0.43812,0.96614 0.96614,0.96614l11.10778,0c0.52802,0 0.96614,-0.43812 0.96614,-0.96614l0,-0.48307l0,-1.44921l0,-1.88982l-0.96614,1.07936l0,0.81046l0,1.44921l0,0.48307l-11.10778,0l-0.00283,-17.87359c0,-0.27266 0.21065,-0.48332 0.48307,-0.48307l3.38149,0.00189c0.27266,0 0.48307,0.21106 0.48307,0.48401l0,2.41441l6.76298,-0.00189l0,1.93228l0,0.41231l0.96614,1.0803l0,-1.97568l0,-1.44921c0,-0.52802 -0.43812,-0.96614 -0.96614,-0.96614l-5.79684,0.00189l0,-1.44827c0,-0.79463 -0.65428,-1.45015 -1.44921,-1.45015l-3.38055,-0.00189zm12.54944,0l-3.38055,0.02076c-0.79525,0.00432 -1.44575,0.66287 -1.44072,1.4577l0.00283,0.45665l0.96614,-0.00566l-0.00283,-0.45665c-0.00174,-0.27276 0.20791,-0.48536 0.48024,-0.48684l3.38055,-0.01982c0.27328,-0.00148 0.48511,0.20738 0.48684,0.48024l0,2.41818l6.76109,0l0.00095,0l-0.00566,15.45635l0,0.00189l-7.23944,0l0,0.96614l7.24416,0l0.00189,0c0.52729,-0.00382 0.96336,-0.44458 0.95954,-0.97274l0.00566,-15.45635l0,-0.00188c-0.00382,-0.52729 -0.44458,-0.96336 -0.97274,-0.95954l-5.78929,0l0,-1.45676l0,-0.00095c-0.00503,-0.79473 -0.6634,-1.44503 -1.4577,-1.44072l-0.00094,0zm-3.97778,8.37352l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108zm2.89842,0l-0.72083,0.64347l2.12758,2.37761l-2.12758,2.37761l0.72083,0.64441l2.70312,-3.02202l-2.70312,-3.02108z",
      fill: "black"
    }))),
    category: 'messia',
    keywords: ['object'],
    styles: [],
    variations: [],
    attributes: {
      tabsConstructed: {
        type: 'array',
        default: []
      },
      isExample: {
        type: 'boolean',
        default: false
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
    edit: TabsPanelFn,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/tabs-panel-editor.scss":
/*!************************************************!*\
  !*** ./src/scss/blocks/tabs-panel-editor.scss ***!
  \************************************************/
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
/*!*************************************************!*\
  !*** ./src/entries/blocks/tabs-panel-editor.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_tabs_panel_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/tabs-panel-editor.scss */ "./src/scss/blocks/tabs-panel-editor.scss");
/* harmony import */ var _js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/tabs-panel-editor.jsx */ "./src/js/blocks/tabs-panel-editor.jsx");
/* harmony import */ var _js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_tabs_panel_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay10YWJzLXBhbmVsLWVkaXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQyxXQUFVQSxFQUFFLEVBQUVDLENBQUMsRUFBRTtFQUVqQixNQUFNO0lBQUVDO0VBQVMsQ0FBQyxHQUFHRixFQUFFO0VBQ3ZCLE1BQU07SUFBRUc7RUFBVSxDQUFDLEdBQUdILEVBQUUsQ0FBQ0ksS0FBSztFQUM5QixNQUFNO0lBQUVDO0VBQWtCLENBQUMsR0FBR0wsRUFBRSxDQUFDTSxNQUFNO0VBQ3ZDLE1BQU07SUFBRUMsU0FBUztJQUFFQyxRQUFRO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQztFQUFPLENBQUMsR0FBR1gsRUFBRSxDQUFDWSxPQUFPO0VBQ3ZFLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR2QsRUFBRTtFQUNqRCxNQUFNO0lBQUVlLGlCQUFpQjtJQUFFQztFQUFjLENBQUMsR0FBR2hCLEVBQUUsQ0FBQ2lCLFdBQVc7RUFDM0QsTUFBTTtJQUFFQyxNQUFNO0lBQUVDLE1BQU07SUFBRUMsSUFBSTtJQUFFQyxRQUFRO0lBQUVDLElBQUk7SUFBRUMsWUFBWTtJQUFFQyxhQUFhO0lBQUVDLFdBQVc7SUFBRUMsUUFBUTtJQUFFQyxhQUFhO0lBQUVDLE9BQU87SUFBRUMsUUFBUTtJQUFFQyxvQkFBb0IsRUFBRUMsTUFBTTtJQUFFQywwQkFBMEIsRUFBRUM7RUFBYSxDQUFDLEdBQUdqQyxFQUFFLENBQUNrQyxVQUFVO0VBQzVOLE1BQU07SUFBRUM7RUFBRyxDQUFDLEdBQUduQyxFQUFFLENBQUNvQyxJQUFJO0VBQ3RCLE1BQU1DLGdCQUFnQixnQkFBRztJQUFLLE9BQU8sRUFBQyxhQUFhO0lBQUMsS0FBSyxFQUFDO0VBQTRCLGdCQUNyRiw0Q0FDQztJQUFNLENBQUMsRUFBQyxxckZBQXFyRjtJQUFDLElBQUksRUFBQztFQUFPLEVBQUcsZUFDN3NGO0lBQU0sSUFBSSxFQUFDLE1BQU07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YUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QmE7O0FBRWI7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNrRDs7QUFFbEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL3RhYnMtcGFuZWwtZWRpdG9yLmpzeCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9ibG9ja3MvdGFicy1wYW5lbC1lZGl0b3Iuc2Nzcz8yZTc5Iiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2luZGV4LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2dlbmVyYXRlLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvaXMtdmFsaWQuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tYnl0ZS1icm93c2VyLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvdXRpbC9jbHVzdGVyLXdvcmtlci1pZC1icm93c2VyLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL25vZGVfbW9kdWxlcy9uYW5vaWQvZm9ybWF0LmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2Jsb2Nrcy90YWJzLXBhbmVsLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5cdGNvbnN0IHsgYWRkRmlsdGVyIH0gPSB3cC5ob29rcztcblx0Y29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuXHRjb25zdCB7IENvbXBvbmVudCwgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9ID0gd3AuZWxlbWVudDtcblx0Y29uc3QgeyBzZXJ2ZXJTaWRlUmVuZGVyOiBTZXJ2ZXJTaWRlUmVuZGVyIH0gPSB3cDtcblx0Y29uc3QgeyBJbnNwZWN0b3JDb250cm9scywgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgQnV0dG9uLCBOb3RpY2UsIEZsZXgsIEZsZXhJdGVtLCBDYXJkLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgVG9nZ2xlQ29udHJvbCwgU3Bpbm5lciwgVGFiUGFuZWwsIF9fZXhwZXJpbWVudGFsU3BhY2VyOiBTcGFjZXIsIF9fZXhwZXJpbWVudGFsSW5wdXRDb250cm9sOiBJbnB1dENvbnRyb2wgfSA9IHdwLmNvbXBvbmVudHM7XG5cdGNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5cdGNvbnN0IGV4YW1wbGVJbWFnZURhdGEgPSA8c3ZnIHZpZXdCb3g9XCIwIDAgMjc0IDE2NVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8Zz5cblx0XHRcdDxwYXRoIGQ9XCJtODcuMjgxMjEsMjkuMTM3ODJjLTMuOTk4NzEsMCAtNy4yNzczMSwzLjI4ODA2IC03LjI3NzMxLDcuMjc3MzFsMCwxNC41NDUxM2wwLjAwOTQ5LDBsMCw2My4wNjk5OWMwLDIuNjUzMTggMi4xOTgzNSw0Ljg1MTU0IDQuODUxNTQsNC44NTE1NGw2MS43NDMzOCwwYzMuMTA4MDIsOS44MTY3OSAxMi4zMTgzNywxNi45ODAzOCAyMy4xMzAxLDE2Ljk4MDM4YzEzLjM0MTcyLDAgMjQuMjU3NjgsLTEwLjkxNTk2IDI0LjI1NzY4LC0yNC4yNTc2OWMwLC02Ljc0NjY3IC0yLjc5NTMxLC0xMi44NTg0NyAtNy4yNzczLC0xNy4yNzQxMmwwLC00My4zNzAxYzAsLTIuNjUzMTggLTIuMTk4MzYsLTQuODUxNTQgLTQuODUxNTQsLTQuODUxNTRsLTkuNzAzMDgsMGwwLC05LjY5MzU5YzAsLTMuOTg5MjUgLTMuMjg4MDUsLTcuMjc3MzEgLTcuMjc3MywtNy4yNzczMWwtMTkuNDA2MTUsMGMtMS44NjY3LDAgLTMuNTUzMzcsMC43MzkwOSAtNC44NTE1NCwxLjkwNDZjLTEuMjk4MTcsLTEuMTY1NTEgLTIuOTg0ODQsLTEuOTA0NiAtNC44NTE1NCwtMS45MDQ2bC0xOS40MDYxNSwwYy0xLjg2NjcsMCAtMy41NTMzNiwwLjczOTA5IC00Ljg1MTU0LDEuOTA0NmMtMS4yOTgxNywtMS4xNjU1MSAtMi45ODQ4MywtMS45MDQ2IC00Ljg1MTUzLC0xLjkwNDZsLTE5LjM4NzIxLDB6bTAsNC44NTE1NGwxOS4zODcyMSwwYzEuMzczOTgsMCAyLjQyNTc2LDEuMDUxNzkgMi40MjU3NiwyLjQyNTc3bDAsMTQuNTQ1MTNsNzIuNzczMDcsMGwwLDM5LjY4NDA3Yy0zLjA3MDEsLTEuNzkwOTIgLTYuNTQ3NjgsLTIuOTE4NTEgLTEwLjI2MjE0LC0zLjIwMjc5Yy0wLjYxNTksLTAuMDU2ODMgLTEuMjMxODMsLTAuMDk0NzUgLTEuODY2NywtMC4wOTQ3NWMtMS42Njc3MiwwIC0zLjI5NzUyLDAuMTcwNTYgLTQuODcwNDksMC40OTI3NWMtMC43ODY0OCwwLjE2MTA3IC0xLjU2MzQ4LDAuMzY5NTQgLTIuMzIxNTMsMC42MDY0NGMtNy41OTk1LDIuMzU5NDMgLTEzLjYwNzA2LDguMzY2OTkgLTE1Ljk2NjQ4LDE1Ljk2NjQ4Yy0wLjIzNjksMC43NTgwNiAtMC40NDUzOCwxLjUyNTU3IC0wLjYwNjQ1LDIuMzEyMDVjMCwwIDAsMC4wMDk0OSAwLDAuMDA5NDljLTAuMzIyMTksMS41NzI5NiAtMC40OTI3NCwzLjIwMjc2IC0wLjQ5Mjc0LDQuODcwNDhjMCwwLjgxNDkxIDAuMDQ3MzcsMS42Mjk4MyAwLjEyMzE4LDIuNDI1NzdsLTYwLjczODk3LDBsMCwtNjcuOTIxNTNsLTAuMDA5NDksMGwwLC05LjY5MzU5YzAsLTEuMzczOTggMS4wNTE4MSwtMi40MjU3NyAyLjQyNTc3LC0yLjQyNTc3em0yOS4wOTAyOCwwbDE5LjQwNjE1LDBjMS4zNzM5OCwwIDIuNDI1NzcsMS4wNTE3OSAyLjQyNTc3LDIuNDI1NzdsMCw5LjY5MzU5bC0yNC4yNTc2OSwwbDAsLTkuNjkzNTljMCwtMS4zNzM5OCAxLjA1MTc5LC0yLjQyNTc3IDIuNDI1NzcsLTIuNDI1Nzd6bTI5LjEwOTIzLDBsMTkuNDA2MTUsMGMxLjM3Mzk4LDAgMi40MjU3NywxLjA1MTc5IDIuNDI1NzcsMi40MjU3N2wwLDkuNjkzNTlsLTI0LjI1NzY5LDBsMCwtOS42OTM1OWMwLC0xLjM3Mzk4IDEuMDUxNzksLTIuNDI1NzcgMi40MjU3NywtMi40MjU3N3ptMjQuMjU3NjksNTguMjA4OTdjMC42NTM4MSwwIDEuMjk4MTcsMC4wMzc5MiAxLjkzMzA0LDAuMTA0MjRjMC4xMjMxOCwwLjAwOTQ4IDAuMjQ2MzYsMC4wMjg0MyAwLjM3OTAzLDAuMDQ3MzdjMC41MTE2NywwLjA2NjMyIDEuMDIzMzYsMC4xMzI2NyAxLjUxNjEsMC4yMzY5YzAuMTQyMTMsMC4wMjg0MyAwLjI3NDgsMC4wNjYzMiAwLjQwNzQ0LDAuMDk0NzVjMC40NjQzMSwwLjEwNDI0IDAuOTE5MTQsMC4yMTc5MyAxLjM3Mzk4LDAuMzUwNmMwLjE4OTUyLDAuMDY2MzIgMC4zNzkwMiwwLjEzMjY2IDAuNTY4NTUsMC4xOTg5OGMwLjM5Nzk3LDAuMTMyNjcgMC43ODY0NiwwLjI3NDggMS4xNzQ5NywwLjQzNTg5YzAuMTk4OTgsMC4wNzU4MSAwLjQwNzQ1LDAuMTcwNTYgMC42MDY0NCwwLjI2NTMxYzAuMzQxMTQsMC4xNTE2MSAwLjY3Mjc2LDAuMzEyNyAxLjAwNDQxLDAuNDkyNzRjMC4yMTc5NiwwLjExMzcgMC40MzU4OSwwLjIzNjkgMC42NDQzNiwwLjM1MDZjMC4zMTI2OCwwLjE4OTUyIDAuNjI1MzksMC4zNzkwMyAwLjkyODYxLDAuNTY4NTVjMC4yMjc0MiwwLjE1MTYxIDAuNDM1ODksMC4yOTM3NCAwLjY1MzgyLDAuNDU0ODNjMC4yNTU4NCwwLjE3MDU2IDAuNTAyMiwwLjM2MDA2IDAuNzQ4NTksMC41NDk1OWMwLjIzNjg4LDAuMTg5NSAwLjQ3Mzc4LDAuMzc5MDIgMC43MTA2NSwwLjU4NzQ5YzQuMTIxOTIsMy41NjI4NSA2Ljc1NjE2LDguODIxODIgNi43NTYxNiwxNC42NjgzMWMwLDEwLjY2OTYgLTguNzM2NTYsMTkuNDA2MTUgLTE5LjQwNjE1LDE5LjQwNjE1Yy05LjIxOTgyLDAgLTE2Ljk4MDM5LC02LjUxOTI1IC0xOC45MjI4OSwtMTUuMTcwNTRjLTAuMTQyMTMsLTAuNjI1MzkgLTAuMjQ2MzYsLTEuMjUwNzcgLTAuMzMxNjUsLTEuODg1NjVjMCwtMC4wNjYzMiAtMC4wMTg5NSwtMC4xMzI2NiAtMC4wMjg0MywtMC4xOTg5OGMtMC4wNzU4MSwtMC43MTA2OCAtMC4xMjMxOCwtMS40MzA4MiAtMC4xMjMxOCwtMi4xNTA5OGMwLC0wLjY2MzMgMC4wMzc5MSwtMS4zMjY1OCAwLjEwNDIzLC0xLjk3MDk0YzAsLTAuMDA5NDggLTAuMDA5NDgsLTAuMDE4OTQgMCwtMC4wMTg5NGMwLjkyODYxLC05LjA5NjYzIDguMjE1NCwtMTYuMzgzNDMgMTcuMzEyMDMsLTE3LjMxMjAzYzAsLTAuMDA5NDkgMC4wMDk0NiwwIDAuMDE4OTUsMGMwLjY0NDM2LC0wLjA3NTgxIDEuMzA3NjMsLTAuMTA0MjQgMS45NzA5NCwtMC4xMDQyNHpcIiBmaWxsPVwiYmxhY2tcIiAvPlxuXHRcdFx0PGxpbmUgZmlsbD1cIm5vbmVcIiBpZD1cInN2Z18yXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiNVwiIHgxPVwiMTcwLjE2NjY4XCIgeDI9XCIxNzAuMTY2NjhcIiB5MT1cIjEwMC4xNjY2N1wiIHkyPVwiMTIyLjg1NTM4XCIgLz5cblx0XHRcdDxsaW5lIGZpbGw9XCJub25lXCIgaWQ9XCJzdmdfNFwiIHN0cm9rZT1cIiMwMDAwMDBcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjVcIiB0cmFuc2Zvcm09XCJyb3RhdGUoOTAgMTcwLjE2NyAxMTEuNTExKVwiIHgxPVwiMTcwLjE2NjY3XCIgeDI9XCIxNzAuMTY2NjdcIiB5MT1cIjEwMC4xNjY2NFwiIHkyPVwiMTIyLjg1NTM1XCIgLz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblx0Y29uc3Qgc2hvcnRpZCA9IHJlcXVpcmUoJ3Nob3J0aWQnKTtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBUYWJzUGFuZWxGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXHRcdGNvbnN0IFtlZGl0TW9kZSwgc2V0RWRpdE1vZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdFx0Y29uc3QgW3Rlcm1zRmV0Y2hlZCwgc2V0VGVybXNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbdGVybXMsIHNldFRlcm1zXSA9IHVzZVN0YXRlKHtcblx0XHRcdHNlZ21lbnQ6IFtdLFxuXHRcdH0pO1xuXG5cdFx0bGV0IGFjdGl2ZVNlZ21lbnQ7XG5cdFx0bGV0IGJsb2NrUmVmID0gdXNlUmVmKCk7XG5cblx0XHRjb25zdCBzb3J0YWJsZUluaXQgPSAoKSA9PiB7XG5cblx0XHRcdCQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLnRhYi1jb25zdHJ1Y3RlZCcpLm5vdCgndWktc29ydGFibGUnKS5zb3J0YWJsZSh7XG5cdFx0XHRcdGZvcmNlSGVscGVyU2l6ZTogdHJ1ZSxcblx0XHRcdFx0Zm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXG5cdFx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHRcdC8vZGlzdGFuY2U6IDEwLFxuXHRcdFx0XHR0b2xlcmFuY2U6ICdpbnRlcnNlY3QnLFxuXHRcdFx0XHQvL2N1cnNvcjogJ2dyYWJiaWcnLFxuXHRcdFx0XHRzY3JvbGw6IHRydWUsXG5cdFx0XHRcdHNjcm9sbFNlbnNpdGl2aXR5OiAyMCxcblx0XHRcdFx0Y29udGFpbm1lbnQ6ICcuZWRpdC13aWRnZXRzLWJsb2NrLWVkaXRvcicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnc29ydGFibGUtcGxhY2Vob2xkZXInLFxuXHRcdFx0XHRoYW5kbGU6ICcubW92ZScsXG5cdFx0XHRcdC8vekluZGV4OiAxMDAwMCxcblx0XHRcdFx0c3RhcnQ6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5pdGVtLmFkZENsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJlZm9yZVN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2N1cnNvci1ncmFiYmluZycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0XHRcdFx0dWkuaXRlbS5yZW1vdmVDbGFzcygnaXMtZWxldmF0ZWQnKTtcblx0XHRcdFx0XHRzYXZlVGFicygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVtb3ZlVGFiID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHR0YWJzU2VnbWVudE90aGVyID0gW10sXG5cdFx0XHRcdHRhYnNTZWdtZW50Q3VycmVudCA9IFtdLFxuXHRcdFx0XHQvLyBGaW5kIHNob3duIHRhYnMgaW4gY3VycmVudCBzZWdtZW50XG5cdFx0XHRcdHRhYnMgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhYi1jb25zdHJ1Y3RlZCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItZmllbGRzJyksXG5cdFx0XHRcdC8vIERlZmluZSB0YWIgYmVpbmcgcmVtb3ZlZFxuXHRcdFx0XHRyZW1vdmUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhYi1maWVsZHMnKTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWRbaV0uc2VnbWVudFNsdWcgPT09IGFjdGl2ZVNlZ21lbnQpIHtcblx0XHRcdFx0XHQvLyBGaW5kIHNhdmVkIHRhYnMgaW4gY3VycmVudCBzZWdtZW50XG5cdFx0XHRcdFx0dGFic1NlZ21lbnRDdXJyZW50LnB1c2goYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWRbaV0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRhYnNTZWdtZW50T3RoZXIucHVzaChhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHRhYiA9IHRhYnNbaV07XG5cdFx0XHRcdGlmIChyZW1vdmUgPT09IHRhYikge1xuXHRcdFx0XHRcdC8vIEZvdW5kIHRlcmdldCB0YWIgdG8gcmVtb3ZlLlxuXHRcdFx0XHRcdC8vIEl0J3MgaW5kZXggaXMgdGhlIHNhbWUgYXMgaW4gc2F2ZWQgdGFicyB3aXRoaW4gc2VnbWVudFxuXHRcdFx0XHRcdHRhYnNTZWdtZW50Q3VycmVudC5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHN0b3JlID0gdGFic1NlZ21lbnRDdXJyZW50LmNvbmNhdCh0YWJzU2VnbWVudE90aGVyKTtcblxuXHRcdFx0JChyZW1vdmUpLmFuaW1hdGUoe1xuXHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0fSwgNDAwLCAoKSA9PiB7XG5cdFx0XHRcdHNldEF0dHJpYnV0ZXMoe1xuXHRcdFx0XHRcdHRhYnNDb25zdHJ1Y3RlZDogc3RvcmVcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCB0b2dnbGVUYWIgPSAoZXZlbnQpID0+IHtcblx0XHRcdHZhciB0YWIgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLnRhYicpO1xuXG5cdFx0XHR0YWIuZmluZCgnLmNvbnRlbnQnKS50b2dnbGUoJ2JsaW5kJywge1xuXHRcdFx0XHRkaXJlY3Rpb246ICd1cCcsXG5cdFx0XHRcdGR1cmF0aW9uOiAzMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAodGFiLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSkge1xuXHRcdFx0XHR0YWIucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRhYi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKS5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWRkVGFiID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRzdG9yZSA9IFtdLFxuXHRcdFx0XHRuZXdUYWIgPSB7XG5cdFx0XHRcdFx0aWQ6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdFx0XHRzZWdtZW50U2x1ZzogYWN0aXZlU2VnbWVudCxcblx0XHRcdFx0XHR0aXRsZTogX18oJ1RhYiBuYW1lJywgJ21lc3NpYScpLFxuXHRcdFx0XHRcdGNvbnRlbnQ6ICcnLFxuXHRcdFx0XHRcdGFjdGl2ZTogZmFsc2UsXG5cdFx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQvLyBhZGQgb3RoZXIgdGFicyBzZWdtZW50c1xuXHRcdFx0XHRzdG9yZS5wdXNoKGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0c3RvcmUucHVzaChuZXdUYWIpO1xuXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0dGFic0NvbnN0cnVjdGVkOiBzdG9yZVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IHNhdmVUYWJzID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRzdG9yZSA9IFtdLFxuXHRcdFx0XHR0YWJzID0gJChibG9ja1JlZi5jdXJyZW50KS5maW5kKCcudGFiLWZpZWxkcycpLFxuXHRcdFx0XHRhY3RpdmVTZWdtZW50ID0gdGFicy5wYXJlbnRzKCcubWVzc2lhLXRhYnMtcGFuZWwnKS5maW5kKCdbcm9sZT1cInRhYnBhbmVsXCJdJykuYXR0cignaWQnKS5tYXRjaCgvc2VnbWVudC0oLispLXNsdWcvKVsxXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLnRhYnNDb25zdHJ1Y3RlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0cmlidXRlcy50YWJzQ29uc3RydWN0ZWRbaV0uc2VnbWVudFNsdWcgPT09IGFjdGl2ZVNlZ21lbnQpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBhZGQgb3RoZXIgdGFicyBzZWdtZW50c1xuXHRcdFx0XHRzdG9yZS5wdXNoKGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgcSA9IDA7IHEgPCB0YWJzLmxlbmd0aDsgcSsrKSB7XG5cdFx0XHRcdHN0b3JlLnB1c2goe1xuXHRcdFx0XHRcdGlkOiAkKHRhYnNbcV0pLmF0dHIoJ2lkJyksXG5cdFx0XHRcdFx0c2VnbWVudFNsdWc6IGFjdGl2ZVNlZ21lbnQsXG5cdFx0XHRcdFx0dGl0bGU6ICQodGFic1txXSkuZmluZCgnLnRhYi10aXRsZSBpbnB1dCcpLnZhbCgpLFxuXHRcdFx0XHRcdGNvbnRlbnQ6ICQodGFic1txXSkuZmluZCgnLnRhYi1jb250ZW50IHRleHRhcmVhJykudmFsKCksXG5cdFx0XHRcdFx0YWN0aXZlOiAkKHRhYnNbcV0pLmZpbmQoJy50YWItc3RhdHVzIGlucHV0JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0c2V0QXR0cmlidXRlcyh7IHRhYnNDb25zdHJ1Y3RlZDogc3RvcmUgfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0RXhhbXBsZSA9ICgpID0+IHtcblx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYnNDb250ZW50ID0gKHRhYikgPT4ge1xuXG5cdFx0XHRhY3RpdmVTZWdtZW50ID0gdGFiLnNlZ21lbnRTbHVnO1xuXHRcdFx0Y29uc3QgdGFic0NvbnN0cnVjdGVkSHRtbCA9IFtdO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFtpbmRleCwgdGFiQ29uc3RydWN0ZWRdIG9mIGF0dHJpYnV0ZXMudGFic0NvbnN0cnVjdGVkLmVudHJpZXMoKSkge1xuXG5cdFx0XHRcdGlmICh0YWIuc2VnbWVudFNsdWcgIT0gdGFiQ29uc3RydWN0ZWQuc2VnbWVudFNsdWcpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCB0YWJDbGFzc2VzID0gWyd0YWInLCAnY29sbGFwc2VkJ107XG5cdFx0XHRcdGlmICghdGFiQ29uc3RydWN0ZWQuYWN0aXZlKSB0YWJDbGFzc2VzLnB1c2goJ2luYWN0aXZlJyk7XG5cblx0XHRcdFx0dGFic0NvbnN0cnVjdGVkSHRtbC5wdXNoKFxuXHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCB0YWItZmllbGRzXCJcblx0XHRcdFx0XHRcdHNpemU9XCJzbWFsbFwiXG5cdFx0XHRcdFx0XHRpZD17dGFiQ29uc3RydWN0ZWQuaWR9XG5cdFx0XHRcdFx0XHRrZXk9e2Ake3RhYkNvbnN0cnVjdGVkLnNlZ21lbnRTbHVnfS0ke3RhYkNvbnN0cnVjdGVkLmlkfWB9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RhYkNsYXNzZXMuam9pbignICcpfT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdFx0Z2FwPXsyfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJtb3ZlXCI+JmVxdWl2OzwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJbnB1dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJ0YWItdGl0bGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0YWJDb25zdHJ1Y3RlZC50aXRsZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiBzYXZlVGFicygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZT17X18oJ1RoZSB0YWIgaXMgYWN0aXZlIGFuZCB3aWxsIGJlIGRpc3BsYXllZCcsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxUb2dnbGVDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwidGFiLXN0YXR1c1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17dGFiQ29uc3RydWN0ZWQuYWN0aXZlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHNhdmVUYWJzKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RvZ2dsZVRhYn0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJyZW1vdmVcIiBvbkNsaWNrPXtyZW1vdmVUYWJ9PjwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHRcdDxTcGFjZXJcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0bWFyZ2luPXswfVxuXHRcdFx0XHRcdFx0XHRcdFx0cGFkZGluZ1RvcD17Mn0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0YXJlYVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0YWJDb25zdHJ1Y3RlZC5jb250ZW50fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHNhdmVUYWJzKCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RleHRhcmVhPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9TcGFjZXI+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGFic0NvbnN0cnVjdGVkSHRtbDtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0NvbnRyb2xzID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QmxvY2tDb250cm9scyBrZXk9XCJibG9ja1wiPlxuXHRcdFx0XHRcdDxUb29sYmFyR3JvdXBcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3B0aW9ucycsICdtZXNzaWEnKX0+XG5cdFx0XHRcdFx0XHQ8VG9vbGJhckJ1dHRvblxuXHRcdFx0XHRcdFx0XHRsYWJlbD17ZWRpdE1vZGUgPyBfXygnUHJldmlldycsICdtZXNzaWEnKSA6IF9fKCdFZGl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRpY29uPXtlZGl0TW9kZSA/IFwidmlzaWJpbGl0eVwiIDogXCJlZGl0XCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRFZGl0TW9kZSghZWRpdE1vZGUpO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cblx0XHRcdFx0PC9CbG9ja0NvbnRyb2xzPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja0VkaXQgPSAoKSA9PiB7XG5cblx0XHRcdGlmICh0ZXJtc0ZldGNoZWQpIHtcblx0XHRcdFx0aWYgKHRlcm1zLnNlZ21lbnQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IGJsb2NrID0gd3AuYmxvY2tzLmdldEJsb2NrVHlwZShuYW1lKTtcblx0XHRcdFx0XHRjb25zdCB0YWJzSHRtbCA9IFtdO1xuXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBbaW5kZXhTZWdtZW50LCBzZWdtZW50XSBvZiB0ZXJtcy5zZWdtZW50LmVudHJpZXMoKSkge1xuXHRcdFx0XHRcdFx0dGFic0h0bWwucHVzaCh7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IGBzZWdtZW50LSR7c2VnbWVudC52YWx1ZX0tc2x1Z2AsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBzZWdtZW50LmxhYmVsLFxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6ICd0YWInLFxuXHRcdFx0XHRcdFx0XHRzZWdtZW50U2x1Zzogc2VnbWVudC52YWx1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IGhlYWRpbmcgPVxuXHRcdFx0XHRcdFx0PEZyYWdtZW50IGtleT0ndGlwJz5cblx0XHRcdFx0XHRcdFx0PGg0PntibG9jay50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8Tm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzPVwid2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxwPntfXygnQWRkIHRhYiBpbnRvIHNlZ21lbnRzLCBzZXQgaXRcXCdzIGNvbnRlbnQsIGFjdGl2aXR5IHN0YXR1cyBhbmQgcmVvcmRlciB0aGVtIGlmIG5lZWRlZC4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdFx0PFNwYWNlclxuXHRcdFx0XHRcdFx0XHRcdG1hcmdpblRvcD17NX0+XG5cdFx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBpc1ByaW1hcnkgb25DbGljaz17YWRkVGFifT5cblx0XHRcdFx0XHRcdFx0XHRcdHtfXygnQWRkIGEgdGFiJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L1NwYWNlcj5cblx0XHRcdFx0XHRcdDwvRnJhZ21lbnQ+XG5cblx0XHRcdFx0XHRjb25zdCB0YWJzID0gPFRhYlBhbmVsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtdGFicy1wYW5lbFwiXG5cdFx0XHRcdFx0XHRhY3RpdmVDbGFzcz1cImFjdGl2ZS10YWJcIlxuXHRcdFx0XHRcdFx0b3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGluaXRpYWxUYWJOYW1lPXt0YWJzSHRtbFswXS5uYW1lfVxuXHRcdFx0XHRcdFx0b25TZWxlY3Q9eyh0YWJOYW1lKSA9PiB7IH19XG5cdFx0XHRcdFx0XHR0YWJzPXt0YWJzSHRtbH0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdCh0YWIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPGRpdiBkYXRhLXRpdGxlPXtfXygnRHJvcCBpdGVtIGhlcmUuJywgJ21lc3NpYScpfSBjbGFzc05hbWU9XCJ0YWItY29uc3RydWN0ZWRcIj57dGFic0NvbnRlbnQodGFiKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvVGFiUGFuZWw+XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdHtoZWFkaW5nfVxuXHRcdFx0XHRcdFx0XHRcdHt0YWJzfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiIGxhYmVsPXtfXyhcIllvdSBoYXZlIG5vIHNlZ21lbnRzLiBDcmVhdGUgb25lLlwiLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PjwvZGl2PlxuXHRcdFx0XHRcdFx0PC9QbGFjZWhvbGRlciA+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PFNwaW5uZXIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja1ByZXZpZXcgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0PERpc2FibGVkIGtleT1cImJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHRcdDxTZXJ2ZXJTaWRlUmVuZGVyXG5cdFx0XHRcdFx0XHRcdGJsb2NrPXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzPXthdHRyaWJ1dGVzfVxuXHRcdFx0XHRcdFx0XHR1cmxRdWVyeUFyZ3M9e3sgaXNQcmV2aWV3OiB0cnVlIH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvRGlzYWJsZWQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRUZXJtcyA9IGFzeW5jICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IGFwaUZldGNoKHtcblx0XHRcdFx0cGF0aDogJ21lc3NpYS92MS9ibG9jay10YWJzLXBhbmVsJyxcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGE6IHsgY3VycmVudEF0dHJzOiBhdHRyaWJ1dGVzIH1cblx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG5cdFx0XHRcdGlmIChyZXNwb25zZS50ZXJtcy5zZWdtZW50Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdFx0X18oJ01lc3NpYSBDYXRlZ29yeSBUZXJtczogTm8gdGVybXMgd2VyZSBmb3VuZCBpbiB0YXhvbm9teSBTZWdtZW50LiBVbml0IG9wZXJhdGlvbiBpcyBub3QgcG9zc2libGUuJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cblx0XHRcdH0pLmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRfXygnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVjZWl2aW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyIGZvciBDYXRlZ29yeSBUZXJtcyBibG9jaycsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKGF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cdFx0XHRcdHJldHVybiBnZXRFeGFtcGxlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblxuXHRcdFx0XHRsZXQgY2xhc3NlcyA9IFtjbGFzc05hbWVdO1xuXHRcdFx0XHRjb25zdCByZW5kZXIgPSBbXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0dGFic0NvbnN0cnVjdGVkOiByZXNwb25zZS52YWxpZEF0dHJzLnRhYnNDb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoKSA9PiB7IGlzTW91bnRlZCA9IGZhbHNlIH07XG5cblx0XHR9LCBbdGVybXNGZXRjaGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRpZiAoIWVkaXRNb2RlKSByZXR1cm47XG5cblx0XHRcdGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuXG5cdFx0XHRcdGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xuXHRcdFx0XHRcdGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuXHRcdFx0XHRcdFx0aWYgKG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFiQXJlYSA9ICQobXV0YXRpb24uYWRkZWROb2Rlc1tpXSkuZmluZCgnLnRhYi1jb25zdHJ1Y3RlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0YWJBcmVhLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNvcnRhYmxlSW5pdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdG9ic2VydmVyLm9ic2VydmUoXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdC8vIExhdGVyLCB3ZSBjYW4gc3RvcCBvYnNlcnZpbmdcblx0XHRcdC8vIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHR9LCBbZWRpdE1vZGVdKTtcblxuXHRcdHJldHVybiByZW5kZXIoKTtcblx0fVxuXG5cdHJlZ2lzdGVyQmxvY2tUeXBlKCdtZXNzaWEvYmxvY2stdGFicy1wYW5lbCcsIHtcblx0XHR0aXRsZTogX18oJ1RhYnMgcGFuZWwnLCAnbWVzc2lhJyksXG5cdFx0ZGVzY3JpcHRpb246IF9fKCdDdXN0b21pc2FibGUgdGFicyB3aXRoIG9iamVjdHMgY3VzdG9tIGZpZWxkcyBkYXRhIG9yIGFueSBjb250ZW50LicsICdtZXNzaWEnKSxcblx0XHRpY29uOiA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Zz48cGF0aCBkPVwibTIuMzQwMDEsMS44NTU1NGMtMC43OTUxNiwtMC4wMDA3MiAtMS40NTAxNSwwLjY1NDI4IC0xLjQ1MDE1LDEuNDQ5MjFsMC4wMDI4MywxNy44NzM1OWMwLDAuNTI4MDIgMC40MzgxMiwwLjk2NjE0IDAuOTY2MTQsMC45NjYxNGwxMS4xMDc3OCwwYzAuNTI4MDIsMCAwLjk2NjE0LC0wLjQzODEyIDAuOTY2MTQsLTAuOTY2MTRsMCwtMC40ODMwN2wwLC0xLjQ0OTIxbDAsLTEuODg5ODJsLTAuOTY2MTQsMS4wNzkzNmwwLDAuODEwNDZsMCwxLjQ0OTIxbDAsMC40ODMwN2wtMTEuMTA3NzgsMGwtMC4wMDI4MywtMTcuODczNTljMCwtMC4yNzI2NiAwLjIxMDY1LC0wLjQ4MzMyIDAuNDgzMDcsLTAuNDgzMDdsMy4zODE0OSwwLjAwMTg5YzAuMjcyNjYsMCAwLjQ4MzA3LDAuMjExMDYgMC40ODMwNywwLjQ4NDAxbDAsMi40MTQ0MWw2Ljc2Mjk4LC0wLjAwMTg5bDAsMS45MzIyOGwwLDAuNDEyMzFsMC45NjYxNCwxLjA4MDNsMCwtMS45NzU2OGwwLC0xLjQ0OTIxYzAsLTAuNTI4MDIgLTAuNDM4MTIsLTAuOTY2MTQgLTAuOTY2MTQsLTAuOTY2MTRsLTUuNzk2ODQsMC4wMDE4OWwwLC0xLjQ0ODI3YzAsLTAuNzk0NjMgLTAuNjU0MjgsLTEuNDUwMTUgLTEuNDQ5MjEsLTEuNDUwMTVsLTMuMzgwNTUsLTAuMDAxODl6bTEyLjU0OTQ0LDBsLTMuMzgwNTUsMC4wMjA3NmMtMC43OTUyNSwwLjAwNDMyIC0xLjQ0NTc1LDAuNjYyODcgLTEuNDQwNzIsMS40NTc3bDAuMDAyODMsMC40NTY2NWwwLjk2NjE0LC0wLjAwNTY2bC0wLjAwMjgzLC0wLjQ1NjY1Yy0wLjAwMTc0LC0wLjI3Mjc2IDAuMjA3OTEsLTAuNDg1MzYgMC40ODAyNCwtMC40ODY4NGwzLjM4MDU1LC0wLjAxOTgyYzAuMjczMjgsLTAuMDAxNDggMC40ODUxMSwwLjIwNzM4IDAuNDg2ODQsMC40ODAyNGwwLDIuNDE4MThsNi43NjEwOSwwbDAuMDAwOTUsMGwtMC4wMDU2NiwxNS40NTYzNWwwLDAuMDAxODlsLTcuMjM5NDQsMGwwLDAuOTY2MTRsNy4yNDQxNiwwbDAuMDAxODksMGMwLjUyNzI5LC0wLjAwMzgyIDAuOTYzMzYsLTAuNDQ0NTggMC45NTk1NCwtMC45NzI3NGwwLjAwNTY2LC0xNS40NTYzNWwwLC0wLjAwMTg4Yy0wLjAwMzgyLC0wLjUyNzI5IC0wLjQ0NDU4LC0wLjk2MzM2IC0wLjk3Mjc0LC0wLjk1OTU0bC01Ljc4OTI5LDBsMCwtMS40NTY3NmwwLC0wLjAwMDk1Yy0wLjAwNTAzLC0wLjc5NDczIC0wLjY2MzQsLTEuNDQ1MDMgLTEuNDU3NywtMS40NDA3MmwtMC4wMDA5NCwwem0tMy45Nzc3OCw4LjM3MzUybC0wLjcyMDgzLDAuNjQzNDdsMi4xMjc1OCwyLjM3NzYxbC0yLjEyNzU4LDIuMzc3NjFsMC43MjA4MywwLjY0NDQxbDIuNzAzMTIsLTMuMDIyMDJsLTIuNzAzMTIsLTMuMDIxMDh6bTIuODk4NDIsMGwtMC43MjA4MywwLjY0MzQ3bDIuMTI3NTgsMi4zNzc2MWwtMi4xMjc1OCwyLjM3NzYxbDAuNzIwODMsMC42NDQ0MWwyLjcwMzEyLC0zLjAyMjAybC0yLjcwMzEyLC0zLjAyMTA4elwiIGZpbGw9XCJibGFja1wiIC8+PC9nPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsnb2JqZWN0J10sXG5cdFx0c3R5bGVzOiBbXSxcblx0XHR2YXJpYXRpb25zOiBbXSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHR0YWJzQ29uc3RydWN0ZWQ6IHtcblx0XHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdFx0ZGVmYXVsdDogW10sXG5cdFx0XHR9LFxuXHRcdFx0aXNFeGFtcGxlOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiB0cnVlLFxuXG5cdFx0fSxcblx0XHRlZGl0OiBUYWJzUGFuZWxGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbmZ1bmN0aW9uIGdldCAoKSB7XG4gIHJldHVybiBhbHBoYWJldCB8fCBPUklHSU5BTDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0OiBnZXQsXG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdlbmVyYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTU2Nzc1MjgwMjA2MjtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA3O1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gYnVpbGQoY2x1c3RlcldvcmtlcklkKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUodmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHNlY29uZHMpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xudmFyIGZvcm1hdCA9IHJlcXVpcmUoJ25hbm9pZC9mb3JtYXQnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUobnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBmb3JtYXQocmFuZG9tLCBhbHBoYWJldC5nZXQoKSwgMSk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgcmV0dXJuIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCk7XG59XG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbm9uQWxwaGFiZXRpYyA9IG5ldyBSZWdFeHAoJ1teJyArXG4gICAgICBhbHBoYWJldC5nZXQoKS5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKSArXG4gICAgJ10nKTtcbiAgICByZXR1cm4gIW5vbkFscGhhYmV0aWMudGVzdChpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxudmFyIHJhbmRvbUJ5dGU7XG5cbmlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xufSBlbHNlIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG4iLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGZvcm1hdC5qc2AgaW4gYnVuZGxlcnMgbGlrZSB3ZWJwYWNrIG9yIFJvbGx1cCxcbi8vIGFjY29yZGluZyB0byBgYnJvd3NlcmAgY29uZmlnIGluIGBwYWNrYWdlLmpzb25gLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyYW5kb20sIGFscGhhYmV0LCBzaXplKSB7XG4gIC8vIFdlIGNhbuKAmXQgdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC4gVG8gbWFrZSBieXRlcyB2YWx1ZXMgY2xvc2VyXG4gIC8vIHRvIHRoZSBhbHBoYWJldCwgd2UgYXBwbHkgYml0bWFzayBvbiB0aGVtLiBXZSBsb29rIGZvciB0aGUgY2xvc2VzdFxuICAvLyBgMiAqKiB4IC0gMWAgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGJpZ2dlciB0aGFuIGFscGhhYmV0IHNpemUuIElmIHdlIGhhdmVcbiAgLy8gMzAgc3ltYm9scyBpbiB0aGUgYWxwaGFiZXQsIHdlIHdpbGwgdGFrZSAzMSAoMDAwMTExMTEpLlxuICAvLyBXZSBkbyBub3QgdXNlIGZhc3RlciBNYXRoLmNsejMyLCBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGUgaW4gYnJvd3NlcnMuXG4gIHZhciBtYXNrID0gKDIgPDwgTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikgLSAxXG4gIC8vIEJpdG1hc2sgaXMgbm90IGEgcGVyZmVjdCBzb2x1dGlvbiAoaW4gb3VyIGV4YW1wbGUgaXQgd2lsbCBwYXNzIDMxIGJ5dGVzLFxuICAvLyB3aGljaCBpcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQpLiBBcyBhIHJlc3VsdCwgd2Ugd2lsbCBuZWVkIG1vcmUgYnl0ZXMsXG4gIC8vIHRoYW4gSUQgc2l6ZSwgYmVjYXVzZSB3ZSB3aWxsIHJlZnVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuXG5cbiAgLy8gRXZlcnkgaGFyZHdhcmUgcmFuZG9tIGdlbmVyYXRvciBjYWxsIGlzIGNvc3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgZm9yIGVudHJvcHkgY29sbGVjdGlvbi4gVGhpcyBpcyB3aHkgb2Z0ZW4gaXQgd2lsbFxuICAvLyBiZSBmYXN0ZXIgdG8gYXNrIGZvciBmZXcgZXh0cmEgYnl0ZXMgaW4gYWR2YW5jZSwgdG8gYXZvaWQgYWRkaXRpb25hbCBjYWxscy5cblxuICAvLyBIZXJlIHdlIGNhbGN1bGF0ZSBob3cgbWFueSByYW5kb20gYnl0ZXMgc2hvdWxkIHdlIGNhbGwgaW4gYWR2YW5jZS5cbiAgLy8gSXQgZGVwZW5kcyBvbiBJRCBsZW5ndGgsIG1hc2sgLyBhbHBoYWJldCBzaXplIGFuZCBtYWdpYyBudW1iZXIgMS42XG4gIC8vICh3aGljaCB3YXMgc2VsZWN0ZWQgYWNjb3JkaW5nIGJlbmNobWFya3MpLlxuXG4gIC8vIC1+ZiA9PiBNYXRoLmNlaWwoZikgaWYgbiBpcyBmbG9hdCBudW1iZXJcbiAgLy8gLX5pID0+IGkgKyAxIGlmIG4gaXMgaW50ZWdlciBudW1iZXJcbiAgdmFyIHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgdmFyIGlkID0gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBieXRlcyA9IHJhbmRvbShzdGVwKVxuICAgIC8vIENvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgXG4gICAgdmFyIGkgPSBzdGVwXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gSWYgcmFuZG9tIGJ5dGUgaXMgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgZXZlbiBhZnRlciBiaXRtYXNrLFxuICAgICAgLy8gd2UgcmVmdXNlIGl0IGJ5IGB8fCAnJ2AuXG4gICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnXG4gICAgICAvLyBNb3JlIGNvbXBhY3QgdGhhbiBgaWQubGVuZ3RoICsgMSA9PT0gc2l6ZWBcbiAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3RhYnMtcGFuZWwtZWRpdG9yLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vLi4vanMvYmxvY2tzL3RhYnMtcGFuZWwtZWRpdG9yLmpzeFwiOyJdLCJuYW1lcyI6WyJ3cCIsIiQiLCJhcGlGZXRjaCIsImFkZEZpbHRlciIsImhvb2tzIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiZWxlbWVudCIsInNlcnZlclNpZGVSZW5kZXIiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJCdXR0b24iLCJOb3RpY2UiLCJGbGV4IiwiRmxleEl0ZW0iLCJDYXJkIiwiVG9vbGJhckdyb3VwIiwiVG9vbGJhckJ1dHRvbiIsIlBsYWNlaG9sZGVyIiwiRGlzYWJsZWQiLCJUb2dnbGVDb250cm9sIiwiU3Bpbm5lciIsIlRhYlBhbmVsIiwiX19leHBlcmltZW50YWxTcGFjZXIiLCJTcGFjZXIiLCJfX2V4cGVyaW1lbnRhbElucHV0Q29udHJvbCIsIklucHV0Q29udHJvbCIsImNvbXBvbmVudHMiLCJfXyIsImkxOG4iLCJleGFtcGxlSW1hZ2VEYXRhIiwic2hvcnRpZCIsInJlcXVpcmUiLCJsYXN0UHJldmlldyIsIlRhYnNQYW5lbEZuIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlcyIsImNsYXNzTmFtZSIsIm5hbWUiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwidGVybXNGZXRjaGVkIiwic2V0VGVybXNGZXRjaGVkIiwidGVybXMiLCJzZXRUZXJtcyIsInNlZ21lbnQiLCJhY3RpdmVTZWdtZW50IiwiYmxvY2tSZWYiLCJzb3J0YWJsZUluaXQiLCJjdXJyZW50IiwiZmluZCIsIm5vdCIsInNvcnRhYmxlIiwiZm9yY2VIZWxwZXJTaXplIiwiZm9yY2VQbGFjZWhvbGRlclNpemUiLCJvcGFjaXR5IiwidG9sZXJhbmNlIiwic2Nyb2xsIiwic2Nyb2xsU2Vuc2l0aXZpdHkiLCJjb250YWlubWVudCIsInBsYWNlaG9sZGVyIiwiaGFuZGxlIiwic3RhcnQiLCJldmVudCIsInVpIiwiaXRlbSIsImFkZENsYXNzIiwiYmVmb3JlU3RvcCIsInJlbW92ZUNsYXNzIiwic3RvcCIsInNhdmVUYWJzIiwicmVtb3ZlVGFiIiwidGFic1NlZ21lbnRPdGhlciIsInRhYnNTZWdtZW50Q3VycmVudCIsInRhYnMiLCJ0YXJnZXQiLCJjbG9zZXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImkiLCJ0YWJzQ29uc3RydWN0ZWQiLCJsZW5ndGgiLCJzZWdtZW50U2x1ZyIsInB1c2giLCJ0YWIiLCJzcGxpY2UiLCJzdG9yZSIsImNvbmNhdCIsImFuaW1hdGUiLCJ0b2dnbGVUYWIiLCJwYXJlbnRzIiwidG9nZ2xlIiwiZGlyZWN0aW9uIiwiZHVyYXRpb24iLCJoYXNDbGFzcyIsImFkZFRhYiIsIm5ld1RhYiIsImlkIiwiZ2VuZXJhdGUiLCJ0aXRsZSIsImNvbnRlbnQiLCJhY3RpdmUiLCJhdHRyIiwibWF0Y2giLCJxIiwidmFsIiwicHJvcCIsImdldEV4YW1wbGUiLCJ0YWJzQ29udGVudCIsInRhYnNDb25zdHJ1Y3RlZEh0bWwiLCJpbmRleCIsInRhYkNvbnN0cnVjdGVkIiwiZW50cmllcyIsInRhYkNsYXNzZXMiLCJqb2luIiwidmFsdWUiLCJnZXRCbG9ja0NvbnRyb2xzIiwiZ2V0QmxvY2tFZGl0IiwiYmxvY2siLCJnZXRCbG9ja1R5cGUiLCJ0YWJzSHRtbCIsImluZGV4U2VnbWVudCIsImxhYmVsIiwiaGVhZGluZyIsInRhYk5hbWUiLCJnZXRCbG9ja1ByZXZpZXciLCJpc1ByZXZpZXciLCJnZXRUZXJtcyIsInBhdGgiLCJtZXRob2QiLCJkYXRhIiwiY3VycmVudEF0dHJzIiwidGhlbiIsInJlc3BvbnNlIiwiZGlzcGF0Y2giLCJjcmVhdGVOb3RpY2UiLCJpc0Rpc21pc3NpYmxlIiwiY2F0Y2giLCJlIiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsImlzTW91bnRlZCIsInZhbGlkQXR0cnMiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnNMaXN0IiwibXV0YXRpb24iLCJ0eXBlIiwiYWRkZWROb2RlcyIsInRhYkFyZWEiLCJvYnNlcnZlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdHlsZXMiLCJ2YXJpYXRpb25zIiwiZGVmYXVsdCIsImV4YW1wbGUiLCJzdXBwb3J0cyIsIm11bHRpcGxlIiwiZWRpdCIsInNhdmUiLCJ3aW5kb3ciLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9
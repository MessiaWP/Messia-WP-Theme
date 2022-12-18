/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/search-snippet-editor.jsx":
/*!*************************************************!*\
  !*** ./src/js/blocks/search-snippet-editor.jsx ***!
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
    CheckboxControl,
    SelectControl,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    Card,
    Spinner,
    TabPanel,
    TextControl
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 37",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    className: "layer"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_17"
  }, /*#__PURE__*/React.createElement("g", {
    id: "svg_11"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#ffffff",
    height: "27.828067",
    id: "svg_8",
    rx: "2",
    ry: "2",
    stroke: "#c2c2c2",
    width: "118.736076",
    x: "4.439902",
    y: "4.654716"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m105.198331,21.787673l3.678772,-6.437851l3.678772,6.437851l-7.357544,0z",
    fill: "#000000",
    id: "svg_1",
    stroke: "#000000",
    transform: "rotate(-180 108.877 18.5687)"
  })), /*#__PURE__*/React.createElement("g", {
    id: "svg_12"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "#ffffff",
    height: "27.828067",
    id: "svg_2",
    rx: "2",
    ry: "2",
    stroke: "#c2c2c2",
    width: "63.505948",
    x: "132.682586",
    y: "4.654716"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "#000000",
    fontFamily: "Monospace",
    fontSize: "18",
    fontStyle: "normal",
    fontWeight: "normal",
    id: "svg_6",
    stroke: "#000000",
    textAnchor: "middle",
    transform: "matrix(0.911025 0 0 0.944903 4.59916 6.87916)",
    x: "198.875684",
    y: "18.342526"
  }, "I")), /*#__PURE__*/React.createElement("g", {
    id: "svg_15"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "black",
    height: "27.828067",
    id: "svg_9",
    rx: "2",
    ry: "2",
    width: "63.505948",
    x: "206.531949",
    y: "4.654717"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "#ffffff",
    fontFamily: "Cursive",
    fontSize: "24",
    id: "svg_10",
    stroke: "#000000",
    strokeWidth: "0",
    textAnchor: "middle",
    transform: "matrix(0.547485 0 0 0.500406 46.8212 52.8191)",
    x: "351.239178",
    y: "-63"
  }, "Search")))));
  let lastPreview = false;
  function SnippetEditFn(props) {
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
      category: [],
      property: []
    });
    let blockRef = useRef();
    const handlerRemove = event => {
      $(event.target).parents('.messia-filter').animate({
        opacity: 0
      }, 400, function () {
        $(this).addClass('removed').css('display', 'none');
        const categories = $(blockRef.current).find('.filters-constructed .messia-filter');
        saveSlots(categories);
      });
    };
    const dragSortInit = () => {
      const sortable = $(blockRef.current).find('.filters-constructed').not('ui-sortable').sortable({
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
          showSlotSettings(ui).then(ui => {
            setFilterDropped(ui.item);
          });
        }
      });
      const draggable = $(blockRef.current).find('.filters-templates .messia-filter').not('.ui-draggable').draggable({
        connectToSortable: '.filters-constructed',
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
    const saveSlots = filters => {
      let store = [];
      const segmentSlug = filters.parents('.messia-tabs-panel').find('[role="tabpanel"]').attr('id').match(/segment-(.+)-slug/)[1];
      for (let i = 0; i < attributes.filtersConstructed.length; i++) {
        if (attributes.filtersConstructed[i].segmentSlug === segmentSlug) {
          continue;
        }
        // add other tabs filters
        store.push(attributes.filtersConstructed[i]);
      }
      for (let i = 0; i < filters.length; i++) {
        let key;
        if ($(filters[i]).hasClass('removed')) {
          continue;
        }
        if ('undefined' === typeof $(filters[i]).data('key')) {
          key = shortid.generate();
        } else {
          key = $(filters[i]).data('key');
        }
        const type = $(filters[i]).data('type');
        switch (type) {
          case 'string':
            store.push({
              id: key,
              'segmentSlug': segmentSlug,
              by: 'string'
            });
            break;
          case 'category':
            store.push({
              id: key,
              'segmentSlug': segmentSlug,
              selectAllCatAlias: $(filters[i]).find('.settings .select-all-alias input').val(),
              by: 'category',
              value: $(filters[i]).find('.settings select').val()
            });
            break;
          case 'property':
            let val = [];
            let prop = $(filters[i]).find('.settings input[type="checkbox"]');
            for (var q = 0; q < prop.length; q++) {
              if ($(prop[q]).prop('checked')) {
                val.push($(prop[q]).val());
              }
            }
            store.push({
              id: key,
              'segmentSlug': segmentSlug,
              selectAllPropAlias: $(filters[i]).find('.settings .select-all-alias input').val(),
              by: 'property',
              value: val
            });
            break;
        }
      }
      if (filterDropped.hasClass('ui-draggable')) {
        filterDropped.addClass('remove-before-render');
      }
      setAttributes({
        filtersConstructed: store
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
      }, /*#__PURE__*/React.createElement("p", null, __('The list of terms is subordinate to the value of the "Empty category/property terms" option. This list of categories contains all the key terms of the Category taxonomy, i.e. terms that have descendants. In the frontend, this list will show all the descendants of the term selected here.', 'messia'))))];

      // TEMPLATES
      templatesHtml.push( /*#__PURE__*/React.createElement(Card, {
        className: "messia-card messia-filter",
        key: "tmpl-by-string",
        "data-type": "string",
        size: "small"
      }, /*#__PURE__*/React.createElement("div", {
        className: "messia-card-content"
      }, /*#__PURE__*/React.createElement(Flex, {
        gap: 2
      }, /*#__PURE__*/React.createElement(FlexItem, {
        className: "move"
      }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
        className: "heading"
      }, __('by String', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
        className: "remove",
        onClick: handlerRemove
      })))));
      if (terms.category.length > 0) {
        templatesHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card messia-filter category",
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
        }, __('by Category', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: handlerRemove
        })), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, /*#__PURE__*/React.createElement("div", {
          className: "settings-inner"
        }, /*#__PURE__*/React.createElement("div", {
          className: "select-all-alias"
        }, /*#__PURE__*/React.createElement(TextControl, {
          label: __('Set name for Select All option', 'messia'),
          className: "alias",
          type: "text",
          value: attributes.selectAllCatAlias
        })), /*#__PURE__*/React.createElement(SelectControl, {
          value: terms.category[0].value,
          options: terms.category
        }))))));
      }
      if (terms.property.length > 0) {
        const propertyCheckboxes = [];
        for (const [indexProperty, property] of terms.property.entries()) {
          propertyCheckboxes.push( /*#__PURE__*/React.createElement(CheckboxControl, {
            key: property.value,
            value: property.value,
            label: property.label,
            onChange: checked => {
              let attr = attributes.filtersConstructed;
              delete attributes.filtersConstructed;
              if (checked) {
                attr[index].value.push(event.target.value);
              } else {
                const position = attr[index].value.indexOf(event.target.value);
                delete attr[index].value[position];
              }
              setAttributes({
                filtersConstructed: attr
              });
            }
          }));
        }
        templatesHtml.push( /*#__PURE__*/React.createElement(Card, {
          className: "messia-card messia-filter property",
          key: "tmpl-by-property",
          "data-type": "property",
          size: "small"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-card-content"
        }, /*#__PURE__*/React.createElement(Flex, {
          gap: 2
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "move"
        }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
          className: "heading"
        }, __('by Property', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
          className: "remove",
          onClick: handlerRemove
        })), /*#__PURE__*/React.createElement("div", {
          className: "settings"
        }, /*#__PURE__*/React.createElement("div", {
          className: "select-all-alias"
        }, /*#__PURE__*/React.createElement(TextControl, {
          label: __('Set name for Select All option', 'messia'),
          type: "text",
          value: attributes.selectAllPropAlias
        })), /*#__PURE__*/React.createElement("div", {
          className: "properties"
        }, propertyCheckboxes)))));
      }
      return templatesHtml;
    };
    const slots = tab => {
      const filtersConstructedHtml = [];
      for (const [index, filter] of attributes.filtersConstructed.entries()) {
        if (tab.segmentSlug != filter.segmentSlug) {
          continue;
        }
        switch (filter.by) {
          case 'string':
            filtersConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
              className: "messia-card messia-filter dropped saved",
              key: `${filter.by}-${filter.id}`,
              "data-type": "string",
              size: "small"
            }, /*#__PURE__*/React.createElement("div", {
              className: "messia-card-content"
            }, /*#__PURE__*/React.createElement(Flex, {
              gap: 2
            }, /*#__PURE__*/React.createElement(FlexItem, {
              className: "move"
            }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
              className: "heading"
            }, __('by String', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
              className: "remove",
              onClick: handlerRemove
            })))));
            break;
          case 'category':
            var alias = attributes.selectAllCatAlias;
            if (typeof attributes.filtersConstructed[index].selectAllCatAlias !== 'undefined') {
              alias = attributes.filtersConstructed[index].selectAllCatAlias;
            }
            const card = /*#__PURE__*/React.createElement(Card, {
              className: "messia-card messia-filter category dropped saved",
              key: `${filter.by}-${filter.id}`,
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
            }, __('by Category', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
              className: "remove",
              onClick: handlerRemove
            })), /*#__PURE__*/React.createElement("div", {
              className: "settings"
            }, /*#__PURE__*/React.createElement("div", {
              className: "settings-inner"
            }, /*#__PURE__*/React.createElement("div", {
              className: "select-all-alias"
            }, /*#__PURE__*/React.createElement(TextControl, {
              label: __('Set name for Select All option', 'messia'),
              className: "alias",
              type: "text",
              value: alias,
              onChange: alias => {
                let attr = attributes.filtersConstructed;
                delete attributes.filtersConstructed;
                attr[index].selectAllCatAlias = alias;
                setAttributes({
                  filtersConstructed: attr
                });
              }
            })), /*#__PURE__*/React.createElement(SelectControl, {
              value: attributes.filtersConstructed[index].value,
              onChange: termSlug => {
                let attr = attributes.filtersConstructed;
                delete attributes.filtersConstructed;
                attr[index].value = termSlug;
                setAttributes({
                  filtersConstructed: attr
                });
              },
              options: terms.category
            })))));
            filtersConstructedHtml.push(card);
            break;
          case 'property':
            const propertyCheckboxes = [];
            for (const [indexProperty, property] of terms.property.entries()) {
              const checkbox = /*#__PURE__*/React.createElement(CheckboxControl, {
                key: property.value,
                value: property.value,
                label: property.label,
                checked: attributes.filtersConstructed[index].value.includes(property.value),
                onChange: checked => {
                  let attr = attributes.filtersConstructed;
                  delete attributes.filtersConstructed;

                  // Rewrite all array with checked
                  attr[index].value = [];
                  var checked = $(event.target).parents('.settings').find('input[type="checkbox"]:checked');
                  for (var i = 0; i < checked.length; i++) {
                    attr[index].value.push($(checked[i]).val());
                  }

                  /* Another approach - change only changed element
                  if (checked) {
                  	attr[index].value.push(event.target.value);
                  }
                  else {
                  	const position = attr[index].value.indexOf(event.target.value);
                  	attr[index].value.splice(position,1);
                  	//delete attr[index].value[position];
                  } */

                  setAttributes({
                    filtersConstructed: attr
                  });
                }
              });
              propertyCheckboxes.push(checkbox);
            }
            var alias = attributes.selectAllCatAlias;
            if (typeof attributes.filtersConstructed[index].selectAllPropAlias !== 'undefined') {
              alias = attributes.filtersConstructed[index].selectAllPropAlias;
            }
            filtersConstructedHtml.push( /*#__PURE__*/React.createElement(Card, {
              className: "messia-card messia-filter property dropped saved",
              key: `${filter.by}-${filter.id}`,
              "data-type": "property",
              size: "small"
            }, /*#__PURE__*/React.createElement("div", {
              className: "messia-card-content"
            }, /*#__PURE__*/React.createElement(Flex, {
              gap: 2
            }, /*#__PURE__*/React.createElement(FlexItem, {
              className: "move"
            }, "\u2261"), /*#__PURE__*/React.createElement(FlexItem, {
              className: "heading"
            }, __('by Property', 'messia')), /*#__PURE__*/React.createElement(FlexItem, {
              className: "remove",
              onClick: handlerRemove
            })), /*#__PURE__*/React.createElement("div", {
              className: "settings"
            }, /*#__PURE__*/React.createElement("div", {
              className: "select-all-alias"
            }, /*#__PURE__*/React.createElement(TextControl, {
              label: __('Set name for Select All option', 'messia'),
              className: "alias",
              type: "text",
              value: alias,
              onChange: alias => {
                let attr = attributes.filtersConstructed;
                delete attributes.filtersConstructed;
                attr[index].selectAllPropAlias = alias;
                setAttributes({
                  filtersConstructed: attr
                });
              }
            })), /*#__PURE__*/React.createElement("div", {
              className: "properties"
            }, propertyCheckboxes)))));
            break;
        }
      }
      return filtersConstructedHtml;
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
            className: "messia-drop-zone filters-constructed"
          }, slots(tab)));
          return /*#__PURE__*/React.createElement(Placeholder, {
            key: "messia-block-placeholder"
          }, /*#__PURE__*/React.createElement("div", {
            className: "messia-block",
            key: "messia-block",
            ref: blockRef
          }, /*#__PURE__*/React.createElement("div", {
            className: "filters-templates"
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
        path: 'messia/v1/block-search-snippet',
        method: 'POST',
        data: {
          currentAttrs: attributes
        }
      }).then(response => {
        if (response.terms.segment.length === 0) {
          wp.data.dispatch('core/notices').createNotice('error',
          // Can be one of: success, info, warning, error.
          __('Messia Search Snippet: No terms were found in taxonomy Segment. Unit operation is not possible.', 'messia'),
          // Text string to display.
          {
            isDismissible: true
          });
        } else {
          if (response.terms.category.length === 0) {
            wp.data.dispatch('core/notices').createNotice('error',
            // Can be one of: success, info, warning, error.
            __('Messia Search Snippet Terms: No terms were found in taxonomy Category. Add some to use filter.', 'messia'),
            // Text string to display.
            {
              isDismissible: true
            });
          }
          if (response.terms.property.length === 0) {
            wp.data.dispatch('core/notices').createNotice('error',
            // Can be one of: success, info, warning, error.
            __('Messia Search Snippet Terms: No terms were found in taxonomy Property. Add some to use filter.', 'messia'),
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
        __('An error occurred while receiving data from the server for Search snippet block', 'messia'),
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
              filtersConstructed: response.validAttrs.filtersConstructed
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
        $(blockRef.current).find('.filters-constructed').sortable('destroy');
      }
    }, [editMode]);
    useEffect(() => {
      if (filterDropped.length === 0) {
        return;
      }
      const categories = $(blockRef.current).find('.filters-constructed .messia-filter');
      saveSlots(categories);
    }, [filterDropped]);
    useEffect(() => {
      let observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length >= 1) {
              for (let i = 0; i < mutation.addedNodes.length; i++) {
                const tabArea = $(mutation.addedNodes[i]).find('.filters-constructed');
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
  registerBlockType('messia/block-search-snippet', {
    title: __('Search snippet', 'messia'),
    description: __('Constructor of search filters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13 8h-8v-1h8v1zm0 2h-8v-1h8v1zm-3 2h-5v-1h5v1zm11.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"
    })),
    category: 'messia',
    keywords: ['search'],
    styles: [],
    variations: [],
    attributes: {
      filtersConstructed: {
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
      selectAllCatAlias: {
        type: 'string',
        default: __('Select Category', 'messia')
      },
      selectAllPropAlias: {
        type: 'string',
        default: __('Select Property', 'messia')
      }
    },
    example: {
      attributes: {
        isExample: true
      }
    },
    supports: {
      multiple: false
    },
    edit: SnippetEditFn,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/search-snippet-editor.scss":
/*!****************************************************!*\
  !*** ./src/scss/blocks/search-snippet-editor.scss ***!
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
  !*** ./src/entries/blocks/search-snippet-editor.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_search_snippet_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/search-snippet-editor.scss */ "./src/scss/blocks/search-snippet-editor.scss");
/* harmony import */ var _js_blocks_search_snippet_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/search-snippet-editor.jsx */ "./src/js/blocks/search-snippet-editor.jsx");
/* harmony import */ var _js_blocks_search_snippet_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_search_snippet_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay1zZWFyY2gtc25pcHBldC1lZGl0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUMsV0FBVUEsRUFBRSxFQUFFQyxDQUFDLEVBQUU7RUFFakIsTUFBTTtJQUFFQztFQUFTLENBQUMsR0FBR0YsRUFBRTtFQUN2QixNQUFNO0lBQUVHO0VBQWtCLENBQUMsR0FBR0gsRUFBRSxDQUFDSSxNQUFNO0VBQ3ZDLE1BQU07SUFBRUMsU0FBUztJQUFFQyxRQUFRO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQztFQUFPLENBQUMsR0FBR1QsRUFBRSxDQUFDVSxPQUFPO0VBQ3ZFLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR1osRUFBRTtFQUNqRCxNQUFNO0lBQUVhLGlCQUFpQjtJQUFFQztFQUFjLENBQUMsR0FBR2QsRUFBRSxDQUFDZSxXQUFXO0VBQzNELE1BQU07SUFBRUMsYUFBYTtJQUFFQyxJQUFJO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQyxNQUFNO0lBQUVDLGVBQWU7SUFBRUMsYUFBYTtJQUFFQyxZQUFZO0lBQUVDLGFBQWE7SUFBRUMsV0FBVztJQUFFQyxRQUFRO0lBQUVDLElBQUk7SUFBRUMsT0FBTztJQUFFQyxRQUFRO0lBQUVDO0VBQVksQ0FBQyxHQUFHOUIsRUFBRSxDQUFDK0IsVUFBVTtFQUNwTSxNQUFNO0lBQUVDO0VBQUcsQ0FBQyxHQUFHaEMsRUFBRSxDQUFDaUMsSUFBSTtFQUN0QixNQUFNQyxPQUFPLEdBQUdDLG1CQUFPLENBQUMsZ0RBQVMsQ0FBQztFQUNsQyxNQUFNQyxnQkFBZ0IsZ0JBQUc7SUFBSyxPQUFPLEVBQUMsWUFBWTtJQUFDLEtBQUssRUFBQztFQUE0QixnQkFDcEY7SUFBRyxTQUFTLEVBQUM7RUFBTyxnQkFDbkI7SUFBRyxFQUFFLEVBQUM7RUFBUSxnQkFDYjtJQUFHLEVBQUUsRUFBQztFQUFRLGdCQUNiO0lBQU0sSUFBSSxFQUFDLFNBQVM7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QTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QmE7O0FBRWI7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNzRDs7QUFFdEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvYmxvY2tzL3NlYXJjaC1zbmlwcGV0LWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL3NlYXJjaC1zbmlwcGV0LWVkaXRvci5zY3NzPzdhODciLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2FscGhhYmV0LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9ub2RlX21vZHVsZXMvc2hvcnRpZC9saWIvcmFuZG9tL3JhbmRvbS1ieXRlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbGliL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkLmpzIiwid2VicGFjazovL21lc3NpYS8uL25vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vbm9kZV9tb2R1bGVzL3Nob3J0aWQvbm9kZV9tb2R1bGVzL25hbm9pZC9mb3JtYXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvYmxvY2tzL3NlYXJjaC1zbmlwcGV0LWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgSW5zcGVjdG9yQ29udHJvbHMsIEJsb2NrQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuXHRjb25zdCB7IFRvZ2dsZUNvbnRyb2wsIEZsZXgsIEZsZXhJdGVtLCBQYW5lbEJvZHksIE5vdGljZSwgQ2hlY2tib3hDb250cm9sLCBTZWxlY3RDb250cm9sLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgQ2FyZCwgU3Bpbm5lciwgVGFiUGFuZWwsIFRleHRDb250cm9sIH0gPSB3cC5jb21wb25lbnRzO1xuXHRjb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuXHRjb25zdCBzaG9ydGlkID0gcmVxdWlyZSgnc2hvcnRpZCcpO1xuXHRjb25zdCBleGFtcGxlSW1hZ2VEYXRhID0gPHN2ZyB2aWV3Qm94PVwiMCAwIDI3NCAzN1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHQ8ZyBjbGFzc05hbWU9XCJsYXllclwiPlxuXHRcdFx0PGcgaWQ9XCJzdmdfMTdcIj5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfMTFcIj5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiI2ZmZmZmZlwiIGhlaWdodD1cIjI3LjgyODA2N1wiIGlkPVwic3ZnXzhcIiByeD1cIjJcIiByeT1cIjJcIiBzdHJva2U9XCIjYzJjMmMyXCIgd2lkdGg9XCIxMTguNzM2MDc2XCIgeD1cIjQuNDM5OTAyXCIgeT1cIjQuNjU0NzE2XCIgLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwibTEwNS4xOTgzMzEsMjEuNzg3NjczbDMuNjc4NzcyLC02LjQzNzg1MWwzLjY3ODc3Miw2LjQzNzg1MWwtNy4zNTc1NDQsMHpcIiBmaWxsPVwiIzAwMDAwMFwiIGlkPVwic3ZnXzFcIiBzdHJva2U9XCIjMDAwMDAwXCIgdHJhbnNmb3JtPVwicm90YXRlKC0xODAgMTA4Ljg3NyAxOC41Njg3KVwiIC8+XG5cdFx0XHRcdDwvZz5cblx0XHRcdFx0PGcgaWQ9XCJzdmdfMTJcIj5cblx0XHRcdFx0XHQ8cmVjdCBmaWxsPVwiI2ZmZmZmZlwiIGhlaWdodD1cIjI3LjgyODA2N1wiIGlkPVwic3ZnXzJcIiByeD1cIjJcIiByeT1cIjJcIiBzdHJva2U9XCIjYzJjMmMyXCIgd2lkdGg9XCI2My41MDU5NDhcIiB4PVwiMTMyLjY4MjU4NlwiIHk9XCI0LjY1NDcxNlwiIC8+XG5cdFx0XHRcdFx0PHRleHQgZmlsbD1cIiMwMDAwMDBcIiBmb250RmFtaWx5PVwiTW9ub3NwYWNlXCIgZm9udFNpemU9XCIxOFwiIGZvbnRTdHlsZT1cIm5vcm1hbFwiIGZvbnRXZWlnaHQ9XCJub3JtYWxcIiBpZD1cInN2Z182XCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHRleHRBbmNob3I9XCJtaWRkbGVcIiB0cmFuc2Zvcm09XCJtYXRyaXgoMC45MTEwMjUgMCAwIDAuOTQ0OTAzIDQuNTk5MTYgNi44NzkxNilcIiB4PVwiMTk4Ljg3NTY4NFwiIHk9XCIxOC4zNDI1MjZcIj5JPC90ZXh0PlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDxnIGlkPVwic3ZnXzE1XCI+XG5cdFx0XHRcdFx0PHJlY3QgZmlsbD1cImJsYWNrXCIgaGVpZ2h0PVwiMjcuODI4MDY3XCIgaWQ9XCJzdmdfOVwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiNjMuNTA1OTQ4XCIgeD1cIjIwNi41MzE5NDlcIiB5PVwiNC42NTQ3MTdcIiAvPlxuXHRcdFx0XHRcdDx0ZXh0IGZpbGw9XCIjZmZmZmZmXCIgZm9udEZhbWlseT1cIkN1cnNpdmVcIiBmb250U2l6ZT1cIjI0XCIgaWQ9XCJzdmdfMTBcIiBzdHJva2U9XCIjMDAwMDAwXCIgc3Ryb2tlV2lkdGg9XCIwXCIgdGV4dEFuY2hvcj1cIm1pZGRsZVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjU0NzQ4NSAwIDAgMC41MDA0MDYgNDYuODIxMiA1Mi44MTkxKVwiIHg9XCIzNTEuMjM5MTc4XCIgeT1cIi02M1wiPlNlYXJjaDwvdGV4dD5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvZyA+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBTbmlwcGV0RWRpdEZuKHByb3BzKSB7XG5cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXMsIHNldEF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgbmFtZSB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgW2ZpbHRlckRyb3BwZWQsIHNldEZpbHRlckRyb3BwZWRdID0gdXNlU3RhdGUoJCgpKTtcblx0XHRjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXHRcdGNvbnN0IFt0ZXJtc0ZldGNoZWQsIHNldFRlcm1zRmV0Y2hlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0Y29uc3QgW3Rlcm1zLCBzZXRUZXJtc10gPSB1c2VTdGF0ZSh7XG5cdFx0XHRzZWdtZW50OiBbXSxcblx0XHRcdGNhdGVnb3J5OiBbXSxcblx0XHRcdHByb3BlcnR5OiBbXSxcblx0XHR9KTtcblxuXHRcdGxldCBibG9ja1JlZiA9IHVzZVJlZigpO1xuXG5cdFx0Y29uc3QgaGFuZGxlclJlbW92ZSA9IChldmVudCkgPT4ge1xuXG5cdFx0XHQkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLm1lc3NpYS1maWx0ZXInKS5hbmltYXRlKHtcblx0XHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdH0sIDQwMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdyZW1vdmVkJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0Y29uc3QgY2F0ZWdvcmllcyA9ICQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmZpbHRlcnMtY29uc3RydWN0ZWQgLm1lc3NpYS1maWx0ZXInKTtcblx0XHRcdFx0c2F2ZVNsb3RzKGNhdGVnb3JpZXMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZHJhZ1NvcnRJbml0ID0gKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBzb3J0YWJsZSA9ICQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmZpbHRlcnMtY29uc3RydWN0ZWQnKS5ub3QoJ3VpLXNvcnRhYmxlJykuc29ydGFibGUoe1xuXHRcdFx0XHRmb3JjZUhlbHBlclNpemU6IHRydWUsXG5cdFx0XHRcdGZvcmNlUGxhY2Vob2xkZXJTaXplOiB0cnVlLFxuXHRcdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0XHQvL2Rpc3RhbmNlOiAxMCxcblx0XHRcdFx0dG9sZXJhbmNlOiAnaW50ZXJzZWN0Jyxcblx0XHRcdFx0Ly9jdXJzb3I6ICdncmFiYmlnJyxcblx0XHRcdFx0c2Nyb2xsOiB0cnVlLFxuXHRcdFx0XHRzY3JvbGxTZW5zaXRpdml0eTogMjAsXG5cdFx0XHRcdGNvbnRhaW5tZW50OiAnLmVkaXQtcG9zdC12aXN1YWwtZWRpdG9yJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdzb3J0YWJsZS1wbGFjZWhvbGRlcicsXG5cdFx0XHRcdGhhbmRsZTogJy5tb3ZlJyxcblx0XHRcdFx0Ly96SW5kZXg6IDEwMDAwLFxuXHRcdFx0XHRzdGFydDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdHVpLml0ZW0uYWRkQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5pdGVtLnJlbW92ZUNsYXNzKCdpcy1lbGV2YXRlZCcpO1xuXHRcdFx0XHRcdHNob3dTbG90U2V0dGluZ3ModWkpLnRoZW4oKHVpKSA9PiB7XG5cdFx0XHRcdFx0XHRzZXRGaWx0ZXJEcm9wcGVkKHVpLml0ZW0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IGRyYWdnYWJsZSA9ICQoYmxvY2tSZWYuY3VycmVudCkuZmluZCgnLmZpbHRlcnMtdGVtcGxhdGVzIC5tZXNzaWEtZmlsdGVyJykubm90KCcudWktZHJhZ2dhYmxlJykuZHJhZ2dhYmxlKHtcblx0XHRcdFx0Y29ubmVjdFRvU29ydGFibGU6ICcuZmlsdGVycy1jb25zdHJ1Y3RlZCcsXG5cdFx0XHRcdC8vY3Vyc29yOiAnZ3JhYmJpZycsXG5cdFx0XHRcdGhlbHBlcjogJ2Nsb25lJyxcblx0XHRcdFx0cmV2ZXJ0OiAnaW52YWxpZCcsXG5cdFx0XHRcdHNjcm9sbDogZmFsc2UsXG5cdFx0XHRcdHJldmVydER1cmF0aW9uOiAyMDAsXG5cdFx0XHRcdGhhbmRsZTogJy5tb3ZlJyxcblx0XHRcdFx0ekluZGV4OiAxMCxcblx0XHRcdFx0c3RhcnQ6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5oZWxwZXIuYWRkQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdjdXJzb3ItZ3JhYmJpbmcnKTtcblx0XHRcdFx0XHRzb3J0YWJsZS5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YmVmb3JlU3RvcDogKGV2ZW50LCB1aSkgPT4ge1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnY3Vyc29yLWdyYWJiaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHRcdFx0XHR1aS5oZWxwZXIucmVtb3ZlQ2xhc3MoJ2lzLWVsZXZhdGVkJyk7XG5cdFx0XHRcdFx0c29ydGFibGUucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCBzYXZlU2xvdHMgPSAoZmlsdGVycykgPT4ge1xuXG5cdFx0XHRsZXQgc3RvcmUgPSBbXTtcblx0XHRcdGNvbnN0IHNlZ21lbnRTbHVnID0gZmlsdGVycy5wYXJlbnRzKCcubWVzc2lhLXRhYnMtcGFuZWwnKS5maW5kKCdbcm9sZT1cInRhYnBhbmVsXCJdJykuYXR0cignaWQnKS5tYXRjaCgvc2VnbWVudC0oLispLXNsdWcvKVsxXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWRbaV0uc2VnbWVudFNsdWcgPT09IHNlZ21lbnRTbHVnKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYWRkIG90aGVyIHRhYnMgZmlsdGVyc1xuXHRcdFx0XHRzdG9yZS5wdXNoKGF0dHJpYnV0ZXMuZmlsdGVyc0NvbnN0cnVjdGVkW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBrZXk7XG5cdFx0XHRcdGlmICgkKGZpbHRlcnNbaV0pLmhhc0NsYXNzKCdyZW1vdmVkJykpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mICQoZmlsdGVyc1tpXSkuZGF0YSgna2V5JykpIHtcblx0XHRcdFx0XHRrZXkgPSBzaG9ydGlkLmdlbmVyYXRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2V5ID0gJChmaWx0ZXJzW2ldKS5kYXRhKCdrZXknKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHR5cGUgPSAkKGZpbHRlcnNbaV0pLmRhdGEoJ3R5cGUnKTtcblx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRcdHN0b3JlLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZDoga2V5LFxuXHRcdFx0XHRcdFx0XHQnc2VnbWVudFNsdWcnOiBzZWdtZW50U2x1Zyxcblx0XHRcdFx0XHRcdFx0Ynk6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2NhdGVnb3J5JzpcblxuXHRcdFx0XHRcdFx0c3RvcmUucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkOiBrZXksXG5cdFx0XHRcdFx0XHRcdCdzZWdtZW50U2x1Zyc6IHNlZ21lbnRTbHVnLFxuXHRcdFx0XHRcdFx0XHRzZWxlY3RBbGxDYXRBbGlhczogJChmaWx0ZXJzW2ldKS5maW5kKCcuc2V0dGluZ3MgLnNlbGVjdC1hbGwtYWxpYXMgaW5wdXQnKS52YWwoKSxcblx0XHRcdFx0XHRcdFx0Ynk6ICdjYXRlZ29yeScsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiAkKGZpbHRlcnNbaV0pLmZpbmQoJy5zZXR0aW5ncyBzZWxlY3QnKS52YWwoKSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdwcm9wZXJ0eSc6XG5cdFx0XHRcdFx0XHRsZXQgdmFsID0gW107XG5cdFx0XHRcdFx0XHRsZXQgcHJvcCA9ICQoZmlsdGVyc1tpXSkuZmluZCgnLnNldHRpbmdzIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBxID0gMDsgcSA8IHByb3AubGVuZ3RoOyBxKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKCQocHJvcFtxXSkucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFsLnB1c2goJChwcm9wW3FdKS52YWwoKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHN0b3JlLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZDoga2V5LFxuXHRcdFx0XHRcdFx0XHQnc2VnbWVudFNsdWcnOiBzZWdtZW50U2x1Zyxcblx0XHRcdFx0XHRcdFx0c2VsZWN0QWxsUHJvcEFsaWFzOiAkKGZpbHRlcnNbaV0pLmZpbmQoJy5zZXR0aW5ncyAuc2VsZWN0LWFsbC1hbGlhcyBpbnB1dCcpLnZhbCgpLFxuXHRcdFx0XHRcdFx0XHRieTogJ3Byb3BlcnR5Jyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpbHRlckRyb3BwZWQuaGFzQ2xhc3MoJ3VpLWRyYWdnYWJsZScpKSB7XG5cdFx0XHRcdGZpbHRlckRyb3BwZWQuYWRkQ2xhc3MoJ3JlbW92ZS1iZWZvcmUtcmVuZGVyJyk7XG5cdFx0XHR9XG5cblx0XHRcdHNldEF0dHJpYnV0ZXMoeyBmaWx0ZXJzQ29uc3RydWN0ZWQ6IHN0b3JlIH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNob3dTbG90U2V0dGluZ3MgPSBhc3luYyAodWkpID0+IHtcblxuXHRcdFx0aWYgKHVpLml0ZW0uaGFzQ2xhc3MoJ3NhdmVkJykpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1aSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdfZnJvbSA9IHVpLml0ZW0ub3V0ZXJXaWR0aCgpO1xuXG5cdFx0XHR1aS5pdGVtLmNzcyh7XG5cdFx0XHRcdCdoZWlnaHQnOiAnJyxcblx0XHRcdFx0J3dpZHRoJzogJycsXG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3Qgd190byA9IHVpLml0ZW0ub3V0ZXJXaWR0aCgpO1xuXG5cdFx0XHR1aS5pdGVtLmNzcyh7XG5cdFx0XHRcdCd3aWR0aCc6IHdfZnJvbSxcblx0XHRcdH0pLmFkZENsYXNzKCdkcm9wcGVkJyk7O1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHQvL0NhcmQgZGl2XG5cdFx0XHRcdHVpLml0ZW0uYW5pbWF0ZSh7XG5cdFx0XHRcdFx0d2lkdGg6IHdfdG8gKyAncHgnLFxuXHRcdFx0XHR9LCAyMDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHQnd2lkdGgnOiAnJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vU2V0dGluZyBkaXZcblx0XHRcdFx0XHRjb25zdCBzZXR0aW5ncyA9IHVpLml0ZW0uZmluZCgnLnNldHRpbmdzJyk7XG5cblx0XHRcdFx0XHRpZiAoc2V0dGluZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHR1aS5pdGVtLmFkZENsYXNzKCdzYXZlZCcpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh1aSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgaCA9IHNldHRpbmdzLm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcdFx0XHRjb25zdCB3ID0gc2V0dGluZ3Mub3V0ZXJXaWR0aCgpO1xuXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5jc3Moe1xuXHRcdFx0XHRcdFx0XHQnaGVpZ2h0JzogMCxcblx0XHRcdFx0XHRcdFx0J3dpZHRoJzogMCxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdGhlaWdodDogaCArICdweCcsXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiB3ICsgJ3B4Jyxcblx0XHRcdFx0XHRcdH0sIDMwMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdCd3aWR0aCc6ICcnLFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0dWkuaXRlbS5hZGRDbGFzcygnc2F2ZWQnKTtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh1aSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0RXhhbXBsZSA9ICgpID0+IHtcblx0XHRcdHJldHVybiBleGFtcGxlSW1hZ2VEYXRhO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRlbXBsYXRlcyA9ICgpID0+IHtcblxuXHRcdFx0Y29uc3QgYmxvY2sgPSB3cC5ibG9ja3MuZ2V0QmxvY2tUeXBlKG5hbWUpO1xuXHRcdFx0Y29uc3QgdGVtcGxhdGVzSHRtbCA9IFtcblx0XHRcdFx0PEZyYWdtZW50IGtleT0ndGlwJz5cblx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0PE5vdGljZVxuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHQ8cD57X18oJ1RoZSBsaXN0IG9mIHRlcm1zIGlzIHN1Ym9yZGluYXRlIHRvIHRoZSB2YWx1ZSBvZiB0aGUgXCJFbXB0eSBjYXRlZ29yeS9wcm9wZXJ0eSB0ZXJtc1wiIG9wdGlvbi4gVGhpcyBsaXN0IG9mIGNhdGVnb3JpZXMgY29udGFpbnMgYWxsIHRoZSBrZXkgdGVybXMgb2YgdGhlIENhdGVnb3J5IHRheG9ub215LCBpLmUuIHRlcm1zIHRoYXQgaGF2ZSBkZXNjZW5kYW50cy4gSW4gdGhlIGZyb250ZW5kLCB0aGlzIGxpc3Qgd2lsbCBzaG93IGFsbCB0aGUgZGVzY2VuZGFudHMgb2YgdGhlIHRlcm0gc2VsZWN0ZWQgaGVyZS4nLCAnbWVzc2lhJyl9PC9wPlxuXHRcdFx0XHRcdDwvTm90aWNlPlxuXHRcdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdFx0XTtcblxuXHRcdFx0Ly8gVEVNUExBVEVTXG5cdFx0XHR0ZW1wbGF0ZXNIdG1sLnB1c2goXG5cdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwibWVzc2lhLWNhcmQgbWVzc2lhLWZpbHRlclwiXG5cdFx0XHRcdFx0a2V5PVwidG1wbC1ieS1zdHJpbmdcIlxuXHRcdFx0XHRcdGRhdGEtdHlwZT1cInN0cmluZ1wiXG5cdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwibW92ZVwiPiZlcXVpdjs8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPSdoZWFkaW5nJz57X18oJ2J5IFN0cmluZycsICdtZXNzaWEnKX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwicmVtb3ZlXCIgb25DbGljaz17aGFuZGxlclJlbW92ZX0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRlcm1zLmNhdGVnb3J5Lmxlbmd0aCA+IDApIHtcblxuXHRcdFx0XHR0ZW1wbGF0ZXNIdG1sLnB1c2goXG5cdFx0XHRcdFx0PENhcmRcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkIG1lc3NpYS1maWx0ZXIgY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdFx0a2V5PVwidG1wbC1ieS1jYXRlZ29yeVwiXG5cdFx0XHRcdFx0XHRkYXRhLXR5cGU9XCJjYXRlZ29yeVwiXG5cdFx0XHRcdFx0XHRzaXplPVwic21hbGxcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWNhcmQtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdGdhcD17Mn0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cIm1vdmVcIj4mZXF1aXY7PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPSdoZWFkaW5nJz57X18oJ2J5IENhdGVnb3J5JywgJ21lc3NpYScpfTwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cInJlbW92ZVwiIG9uQ2xpY2s9e2hhbmRsZXJSZW1vdmV9PjwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZXR0aW5nc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3MtaW5uZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWFsbC1hbGlhc1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1NldCBuYW1lIGZvciBTZWxlY3QgQWxsIG9wdGlvbicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJhbGlhc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0ndGV4dCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5zZWxlY3RBbGxDYXRBbGlhc31cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3Rlcm1zLmNhdGVnb3J5WzBdLnZhbHVlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0ZXJtcy5jYXRlZ29yeX1cblx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGVybXMucHJvcGVydHkubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdGNvbnN0IHByb3BlcnR5Q2hlY2tib3hlcyA9IFtdO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgW2luZGV4UHJvcGVydHksIHByb3BlcnR5XSBvZiB0ZXJtcy5wcm9wZXJ0eS5lbnRyaWVzKCkpIHtcblx0XHRcdFx0XHRwcm9wZXJ0eUNoZWNrYm94ZXMucHVzaChcblx0XHRcdFx0XHRcdDxDaGVja2JveENvbnRyb2xcblx0XHRcdFx0XHRcdFx0a2V5PXtwcm9wZXJ0eS52YWx1ZX1cblx0XHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BlcnR5LnZhbHVlfVxuXHRcdFx0XHRcdFx0XHRsYWJlbD17cHJvcGVydHkubGFiZWx9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGF0dHIgPSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWQ7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXR0cltpbmRleF0udmFsdWUucHVzaChldmVudC50YXJnZXQudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHBvc2l0aW9uID0gYXR0cltpbmRleF0udmFsdWUuaW5kZXhPZihldmVudC50YXJnZXQudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGF0dHJbaW5kZXhdLnZhbHVlW3Bvc2l0aW9uXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZmlsdGVyc0NvbnN0cnVjdGVkOiBhdHRyIH0pO1xuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGVtcGxhdGVzSHRtbC5wdXNoKFxuXHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCBtZXNzaWEtZmlsdGVyIHByb3BlcnR5XCJcblx0XHRcdFx0XHRcdGtleT1cInRtcGwtYnktcHJvcGVydHlcIlxuXHRcdFx0XHRcdFx0ZGF0YS10eXBlPVwicHJvcGVydHlcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJtb3ZlXCI+JmVxdWl2OzwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT0naGVhZGluZyc+e19fKCdieSBQcm9wZXJ0eScsICdtZXNzaWEnKX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJyZW1vdmVcIiBvbkNsaWNrPXtoYW5kbGVyUmVtb3ZlfT48L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3NcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1hbGwtYWxpYXNcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxUZXh0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1NldCBuYW1lIGZvciBTZWxlY3QgQWxsIG9wdGlvbicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0ndGV4dCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuc2VsZWN0QWxsUHJvcEFsaWFzfVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByb3BlcnRpZXNcIj57cHJvcGVydHlDaGVja2JveGVzfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvQ2FyZD5cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlc0h0bWw7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2xvdHMgPSAodGFiKSA9PiB7XG5cblx0XHRcdGNvbnN0IGZpbHRlcnNDb25zdHJ1Y3RlZEh0bWwgPSBbXTtcblxuXHRcdFx0Zm9yIChjb25zdCBbaW5kZXgsIGZpbHRlcl0gb2YgYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWQuZW50cmllcygpKSB7XG5cblx0XHRcdFx0aWYgKHRhYi5zZWdtZW50U2x1ZyAhPSBmaWx0ZXIuc2VnbWVudFNsdWcpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN3aXRjaCAoZmlsdGVyLmJ5KSB7XG5cdFx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRcdGZpbHRlcnNDb25zdHJ1Y3RlZEh0bWwucHVzaChcblx0XHRcdFx0XHRcdFx0PENhcmRcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtY2FyZCBtZXNzaWEtZmlsdGVyIGRyb3BwZWQgc2F2ZWRcIlxuXHRcdFx0XHRcdFx0XHRcdGtleT17YCR7ZmlsdGVyLmJ5fS0ke2ZpbHRlci5pZH1gfVxuXHRcdFx0XHRcdFx0XHRcdGRhdGEtdHlwZT1cInN0cmluZ1wiXG5cdFx0XHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwibW92ZVwiPiZlcXVpdjs8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPSdoZWFkaW5nJz57X18oJ2J5IFN0cmluZycsICdtZXNzaWEnKX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwicmVtb3ZlXCIgb25DbGljaz17aGFuZGxlclJlbW92ZX0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnY2F0ZWdvcnknOlxuXG5cdFx0XHRcdFx0XHR2YXIgYWxpYXMgPSBhdHRyaWJ1dGVzLnNlbGVjdEFsbENhdEFsaWFzO1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMuZmlsdGVyc0NvbnN0cnVjdGVkW2luZGV4XS5zZWxlY3RBbGxDYXRBbGlhcyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0YWxpYXMgPSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZFtpbmRleF0uc2VsZWN0QWxsQ2F0QWxpYXM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IGNhcmQgPVxuXHRcdFx0XHRcdFx0XHQ8Q2FyZFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lc3NpYS1jYXJkIG1lc3NpYS1maWx0ZXIgY2F0ZWdvcnkgZHJvcHBlZCBzYXZlZFwiXG5cdFx0XHRcdFx0XHRcdFx0a2V5PXtgJHtmaWx0ZXIuYnl9LSR7ZmlsdGVyLmlkfWB9XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YS10eXBlPVwiY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdFx0XHRcdHNpemU9XCJzbWFsbFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWNhcmQtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRcdFx0Z2FwPXsyfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT1cIm1vdmVcIj4mZXF1aXY7PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtIGNsYXNzTmFtZT0naGVhZGluZyc+e19fKCdieSBDYXRlZ29yeScsICdtZXNzaWEnKX08L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwicmVtb3ZlXCIgb25DbGljaz17aGFuZGxlclJlbW92ZX0+PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3NcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZXR0aW5ncy1pbm5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWFsbC1hbGlhc1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRleHRDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnU2V0IG5hbWUgZm9yIFNlbGVjdCBBbGwgb3B0aW9uJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJhbGlhc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9J3RleHQnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthbGlhc31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhhbGlhcykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBhdHRyID0gYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGF0dHJpYnV0ZXMuZmlsdGVyc0NvbnN0cnVjdGVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF0dHJbaW5kZXhdLnNlbGVjdEFsbENhdEFsaWFzID0gYWxpYXM7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZpbHRlcnNDb25zdHJ1Y3RlZDogYXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZFtpbmRleF0udmFsdWV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHRlcm1TbHVnKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBhdHRyID0gYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cltpbmRleF0udmFsdWUgPSB0ZXJtU2x1Zztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZpbHRlcnNDb25zdHJ1Y3RlZDogYXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0ZXJtcy5jYXRlZ29yeX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L0NhcmQ+XG5cblx0XHRcdFx0XHRcdGZpbHRlcnNDb25zdHJ1Y3RlZEh0bWwucHVzaChjYXJkKTtcblxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdwcm9wZXJ0eSc6XG5cblx0XHRcdFx0XHRcdGNvbnN0IHByb3BlcnR5Q2hlY2tib3hlcyA9IFtdO1xuXG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IFtpbmRleFByb3BlcnR5LCBwcm9wZXJ0eV0gb2YgdGVybXMucHJvcGVydHkuZW50cmllcygpKSB7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgY2hlY2tib3ggPVxuXHRcdFx0XHRcdFx0XHRcdDxDaGVja2JveENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdGtleT17cHJvcGVydHkudmFsdWV9XG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17cHJvcGVydHkudmFsdWV9XG5cdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17cHJvcGVydHkubGFiZWx9XG5cdFx0XHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZFtpbmRleF0udmFsdWUuaW5jbHVkZXMocHJvcGVydHkudmFsdWUpfVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhjaGVja2VkKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGF0dHIgPSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGF0dHJpYnV0ZXMuZmlsdGVyc0NvbnN0cnVjdGVkO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJld3JpdGUgYWxsIGFycmF5IHdpdGggY2hlY2tlZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhdHRyW2luZGV4XS52YWx1ZSA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgY2hlY2tlZCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuc2V0dGluZ3MnKS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hlY2tlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF0dHJbaW5kZXhdLnZhbHVlLnB1c2goJChjaGVja2VkW2ldKS52YWwoKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKiBBbm90aGVyIGFwcHJvYWNoIC0gY2hhbmdlIG9ubHkgY2hhbmdlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cltpbmRleF0udmFsdWUucHVzaChldmVudC50YXJnZXQudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHBvc2l0aW9uID0gYXR0cltpbmRleF0udmFsdWUuaW5kZXhPZihldmVudC50YXJnZXQudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGF0dHJbaW5kZXhdLnZhbHVlLnNwbGljZShwb3NpdGlvbiwxKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2RlbGV0ZSBhdHRyW2luZGV4XS52YWx1ZVtwb3NpdGlvbl07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gKi9cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZmlsdGVyc0NvbnN0cnVjdGVkOiBhdHRyIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eUNoZWNrYm94ZXMucHVzaChjaGVja2JveCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBhbGlhcyA9IGF0dHJpYnV0ZXMuc2VsZWN0QWxsQ2F0QWxpYXM7XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5maWx0ZXJzQ29uc3RydWN0ZWRbaW5kZXhdLnNlbGVjdEFsbFByb3BBbGlhcyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0YWxpYXMgPSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZFtpbmRleF0uc2VsZWN0QWxsUHJvcEFsaWFzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRmaWx0ZXJzQ29uc3RydWN0ZWRIdG1sLnB1c2goXG5cdFx0XHRcdFx0XHRcdDxDYXJkXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibWVzc2lhLWNhcmQgbWVzc2lhLWZpbHRlciBwcm9wZXJ0eSBkcm9wcGVkIHNhdmVkXCJcblx0XHRcdFx0XHRcdFx0XHRrZXk9e2Ake2ZpbHRlci5ieX0tJHtmaWx0ZXIuaWR9YH1cblx0XHRcdFx0XHRcdFx0XHRkYXRhLXR5cGU9XCJwcm9wZXJ0eVwiXG5cdFx0XHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtY2FyZC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRnYXA9ezJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPVwibW92ZVwiPiZlcXVpdjs8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0gY2xhc3NOYW1lPSdoZWFkaW5nJz57X18oJ2J5IFByb3BlcnR5JywgJ21lc3NpYScpfTwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbSBjbGFzc05hbWU9XCJyZW1vdmVcIiBvbkNsaWNrPXtoYW5kbGVyUmVtb3ZlfT48L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZXR0aW5nc1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1hbGwtYWxpYXNcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnU2V0IG5hbWUgZm9yIFNlbGVjdCBBbGwgb3B0aW9uJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYWxpYXNcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0ndGV4dCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthbGlhc31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoYWxpYXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGF0dHIgPSBhdHRyaWJ1dGVzLmZpbHRlcnNDb25zdHJ1Y3RlZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGF0dHJpYnV0ZXMuZmlsdGVyc0NvbnN0cnVjdGVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhdHRyW2luZGV4XS5zZWxlY3RBbGxQcm9wQWxpYXMgPSBhbGlhcztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGZpbHRlcnNDb25zdHJ1Y3RlZDogYXR0ciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHJvcGVydGllc1wiPntwcm9wZXJ0eUNoZWNrYm94ZXN9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9DYXJkPlxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZpbHRlcnNDb25zdHJ1Y3RlZEh0bWw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0SW5zcGVjdG9yQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxJbnNwZWN0b3JDb250cm9scyBrZXk9J2luc3BlY3Rvcic+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSB0aXRsZT17X18oJ1NldHRpbmdzJywgJ21lc3NpYScpfSA+XG5cdFx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ1Nob3cgb24gZnJvbnQgbnVtYmVyIG9mIG9iamVjdHMgcGVyIHRlcm0uJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLndpdGhDb3VudH1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhjaGVja2VkKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IHdpdGhDb3VudDogY2hlY2tlZCB9KTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDwvSW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrQ29udHJvbHMgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxCbG9ja0NvbnRyb2xzIGtleT1cImJsb2NrXCI+XG5cdFx0XHRcdFx0PFRvb2xiYXJHcm91cFxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKCdPcHRpb25zJywgJ21lc3NpYScpfT5cblx0XHRcdFx0XHRcdDxUb29sYmFyQnV0dG9uXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtlZGl0TW9kZSA/IF9fKCdQcmV2aWV3JywgJ21lc3NpYScpIDogX18oJ0VkaXQnLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdGljb249e2VkaXRNb2RlID8gXCJ2aXNpYmlsaXR5XCIgOiBcImVkaXRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNldEVkaXRNb2RlKCFlZGl0TW9kZSk7XG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxuXHRcdFx0XHQ8L0Jsb2NrQ29udHJvbHM+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldEJsb2NrRWRpdCA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRlcm1zRmV0Y2hlZCkge1xuXHRcdFx0XHRpZiAodGVybXMuc2VnbWVudC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGFic0h0bWwgPSBbXTtcblxuXHRcdFx0XHRcdGZvciAoY29uc3QgW2luZGV4U2VnbWVudCwgc2VnbWVudF0gb2YgdGVybXMuc2VnbWVudC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0XHRcdHRhYnNIdG1sLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBgc2VnbWVudC0ke3NlZ21lbnQudmFsdWV9LXNsdWdgLFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogc2VnbWVudC5sYWJlbCxcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAndGFiJyxcblx0XHRcdFx0XHRcdFx0c2VnbWVudFNsdWc6IHNlZ21lbnQudmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCB0YWJzID0gPFRhYlBhbmVsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZXNzaWEtdGFicy1wYW5lbFwiXG5cdFx0XHRcdFx0XHRhY3RpdmVDbGFzcz1cImFjdGl2ZS10YWJcIlxuXHRcdFx0XHRcdFx0b3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGluaXRpYWxUYWJOYW1lPXt0YWJzSHRtbFswXS5uYW1lfVxuXHRcdFx0XHRcdFx0dGFicz17dGFic0h0bWx9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQodGFiKSA9PiA8ZGl2IGRhdGEtdGl0bGU9e19fKCdEcm9wIGl0ZW0gaGVyZS4nLCAnbWVzc2lhJyl9IGNsYXNzTmFtZT1cIm1lc3NpYS1kcm9wLXpvbmUgZmlsdGVycy1jb25zdHJ1Y3RlZFwiPntzbG90cyh0YWIpfTwvZGl2PlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvVGFiUGFuZWw+XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVycy10ZW1wbGF0ZXNcIj57dGVtcGxhdGVzKCl9PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0e3RhYnN9XG5cdFx0XHRcdFx0XHRcdDwvZGl2ID5cblx0XHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiIGxhYmVsPXtfXyhcIllvdSBoYXZlIG5vIHNlZ21lbnRzLiBDcmVhdGUgb25lLlwiLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PjwvZGl2PlxuXHRcdFx0XHRcdFx0PC9QbGFjZWhvbGRlciA+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFBsYWNlaG9sZGVyIGtleT1cIm1lc3NpYS1ibG9jay1wbGFjZWhvbGRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHRcdFx0PFNwaW5uZXIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBnZXRCbG9ja1ByZXZpZXcgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybiAoXG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZXNzaWEtYmxvY2tcIiBrZXk9XCJtZXNzaWEtYmxvY2tcIiByZWY9e2Jsb2NrUmVmfT5cblx0XHRcdFx0XHQ8RGlzYWJsZWQga2V5PVwiYmxvY2stcHJldmlld1wiPlxuXHRcdFx0XHRcdFx0PFNlcnZlclNpZGVSZW5kZXJcblx0XHRcdFx0XHRcdFx0YmxvY2s9e25hbWV9XG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXM9e2F0dHJpYnV0ZXN9XG5cdFx0XHRcdFx0XHRcdHVybFF1ZXJ5QXJncz17eyBpc1ByZXZpZXc6IHRydWUgfX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9EaXNhYmxlZD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFRlcm1zID0gYXN5bmMgKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgYXBpRmV0Y2goe1xuXHRcdFx0XHRwYXRoOiAnbWVzc2lhL3YxL2Jsb2NrLXNlYXJjaC1zbmlwcGV0Jyxcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGE6IHsgY3VycmVudEF0dHJzOiBhdHRyaWJ1dGVzIH1cblx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG5cdFx0XHRcdGlmIChyZXNwb25zZS50ZXJtcy5zZWdtZW50Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvbm90aWNlcycpLmNyZWF0ZU5vdGljZShcblx0XHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdFx0X18oJ01lc3NpYSBTZWFyY2ggU25pcHBldDogTm8gdGVybXMgd2VyZSBmb3VuZCBpbiB0YXhvbm9teSBTZWdtZW50LiBVbml0IG9wZXJhdGlvbiBpcyBub3QgcG9zc2libGUuJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnRlcm1zLmNhdGVnb3J5Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0XHRcdFx0X18oJ01lc3NpYSBTZWFyY2ggU25pcHBldCBUZXJtczogTm8gdGVybXMgd2VyZSBmb3VuZCBpbiB0YXhvbm9teSBDYXRlZ29yeS4gQWRkIHNvbWUgdG8gdXNlIGZpbHRlci4nLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmVzcG9uc2UudGVybXMucHJvcGVydHkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0XHRcdCdlcnJvcicsIC8vIENhbiBiZSBvbmUgb2Y6IHN1Y2Nlc3MsIGluZm8sIHdhcm5pbmcsIGVycm9yLlxuXHRcdFx0XHRcdFx0XHRfXygnTWVzc2lhIFNlYXJjaCBTbmlwcGV0IFRlcm1zOiBObyB0ZXJtcyB3ZXJlIGZvdW5kIGluIHRheG9ub215IFByb3BlcnR5LiBBZGQgc29tZSB0byB1c2UgZmlsdGVyLicsICdtZXNzaWEnKSwgLy8gVGV4dCBzdHJpbmcgdG8gZGlzcGxheS5cblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGlzRGlzbWlzc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCdjb3JlL25vdGljZXMnKS5jcmVhdGVOb3RpY2UoXG5cdFx0XHRcdFx0J2Vycm9yJywgLy8gQ2FuIGJlIG9uZSBvZjogc3VjY2VzcywgaW5mbywgd2FybmluZywgZXJyb3IuXG5cdFx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgU2VhcmNoIHNuaXBwZXQgYmxvY2snLCAnbWVzc2lhJyksIC8vIFRleHQgc3RyaW5nIHRvIGRpc3BsYXkuXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0aWYgKGZpbHRlckRyb3BwZWQuaGFzQ2xhc3MoJ3JlbW92ZS1iZWZvcmUtcmVuZGVyJykpIHtcblx0XHRcdFx0XHRmaWx0ZXJEcm9wcGVkLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEluc3BlY3RvckNvbnRyb2xzKCksXG5cdFx0XHRcdFx0Z2V0QmxvY2tDb250cm9scygpLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGlmIChlZGl0TW9kZSkge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGdldEJsb2NrRWRpdCgpKTtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCFsYXN0UHJldmlldykge1xuXHRcdFx0XHRcdGxhc3RQcmV2aWV3ID0gZ2V0QmxvY2tQcmV2aWV3KCk7XG5cdFx0XHRcdFx0cmVuZGVyLnB1c2gobGFzdFByZXZpZXcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9PntyZW5kZXJ9PC9kaXY+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCF0ZXJtc0ZldGNoZWQgJiYgIWF0dHJpYnV0ZXMuaXNFeGFtcGxlKSB7XG5cblx0XHRcdFx0Z2V0VGVybXMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdFx0ZmlsdGVyc0NvbnN0cnVjdGVkOiByZXNwb25zZS52YWxpZEF0dHJzLmZpbHRlcnNDb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtcyhyZXNwb25zZS50ZXJtcyk7XG5cdFx0XHRcdFx0XHRzZXRUZXJtc0ZldGNoZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoKSA9PiB7IGlzTW91bnRlZCA9IGZhbHNlIH07XG5cblx0XHR9LCBbdGVybXNGZXRjaGVkXSk7XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRpZiAoIWVkaXRNb2RlICYmICFhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHQkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5maWx0ZXJzLWNvbnN0cnVjdGVkJykuc29ydGFibGUoJ2Rlc3Ryb3knKTtcblx0XHRcdH1cblxuXHRcdH0sIFtlZGl0TW9kZV0pO1xuXG5cdFx0dXNlRWZmZWN0KCgpID0+IHtcblxuXHRcdFx0aWYgKGZpbHRlckRyb3BwZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGNhdGVnb3JpZXMgPSAkKGJsb2NrUmVmLmN1cnJlbnQpLmZpbmQoJy5maWx0ZXJzLWNvbnN0cnVjdGVkIC5tZXNzaWEtZmlsdGVyJyk7XG5cdFx0XHRzYXZlU2xvdHMoY2F0ZWdvcmllcyk7XG5cdFx0fSwgW2ZpbHRlckRyb3BwZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuXG5cdFx0XHRcdGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xuXHRcdFx0XHRcdGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuXHRcdFx0XHRcdFx0aWYgKG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFiQXJlYSA9ICQobXV0YXRpb24uYWRkZWROb2Rlc1tpXSkuZmluZCgnLmZpbHRlcnMtY29uc3RydWN0ZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGFiQXJlYS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkcmFnU29ydEluaXQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKFxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcblx0XHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRcdFx0c3VidHJlZTogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBMYXRlciwgd2UgY2FuIHN0b3Agb2JzZXJ2aW5nXG5cdFx0XHQvLyBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0fSwgW10pO1xuXG5cdFx0cmV0dXJuIHJlbmRlcigpO1xuXHR9XG5cblx0cmVnaXN0ZXJCbG9ja1R5cGUoJ21lc3NpYS9ibG9jay1zZWFyY2gtc25pcHBldCcsIHtcblx0XHR0aXRsZTogX18oJ1NlYXJjaCBzbmlwcGV0JywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnQ29uc3RydWN0b3Igb2Ygc2VhcmNoIGZpbHRlcnMnLCAnbWVzc2lhJyksXG5cdFx0aWNvbjogPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTMgOGgtOHYtMWg4djF6bTAgMmgtOHYtMWg4djF6bS0zIDJoLTV2LTFoNXYxem0xMS4xNzIgMTJsLTcuMzg3LTcuMzg3Yy0xLjM4OC44NzQtMy4wMjQgMS4zODctNC43ODUgMS4zODctNC45NzEgMC05LTQuMDI5LTktOXM0LjAyOS05IDktOSA5IDQuMDI5IDkgOWMwIDEuNzYxLS41MTQgMy4zOTgtMS4zODcgNC43ODVsNy4zODcgNy4zODctMi44MjggMi44Mjh6bS0xMi4xNzItOGMzLjg1OSAwIDctMy4xNCA3LTdzLTMuMTQxLTctNy03LTcgMy4xNC03IDcgMy4xNDEgNyA3IDd6XCIgLz48L3N2Zz4sXG5cdFx0Y2F0ZWdvcnk6ICdtZXNzaWEnLFxuXHRcdGtleXdvcmRzOiBbJ3NlYXJjaCddLFxuXHRcdHN0eWxlczogW10sXG5cdFx0dmFyaWF0aW9uczogW10sXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0ZmlsdGVyc0NvbnN0cnVjdGVkOiB7XG5cdFx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRcdGRlZmF1bHQ6IFtdLFxuXHRcdFx0fSxcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdHdpdGhDb3VudDoge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0c2VsZWN0QWxsQ2F0QWxpYXM6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRlZmF1bHQ6IF9fKCdTZWxlY3QgQ2F0ZWdvcnknLCAnbWVzc2lhJyksXG5cdFx0XHR9LFxuXHRcdFx0c2VsZWN0QWxsUHJvcEFsaWFzOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiBfXygnU2VsZWN0IFByb3BlcnR5JywgJ21lc3NpYScpLFxuXHRcdFx0fSxcblxuXHRcdH0sXG5cdFx0ZXhhbXBsZToge1xuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRpc0V4YW1wbGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c3VwcG9ydHM6IHtcblx0XHRcdG11bHRpcGxlOiBmYWxzZSxcblxuXHRcdH0sXG5cdFx0ZWRpdDogU25pcHBldEVkaXRGbixcblx0XHRzYXZlOiBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGwgfSxcblx0fSk7XG5cbn0od2luZG93LndwLCBqUXVlcnkpKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbmZ1bmN0aW9uIGdldCAoKSB7XG4gIHJldHVybiBhbHBoYWJldCB8fCBPUklHSU5BTDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0OiBnZXQsXG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdlbmVyYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTU2Nzc1MjgwMjA2MjtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA3O1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gYnVpbGQoY2x1c3RlcldvcmtlcklkKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUodmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHNlY29uZHMpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xudmFyIGZvcm1hdCA9IHJlcXVpcmUoJ25hbm9pZC9mb3JtYXQnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUobnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBmb3JtYXQocmFuZG9tLCBhbHBoYWJldC5nZXQoKSwgMSk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgcmV0dXJuIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCk7XG59XG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbm9uQWxwaGFiZXRpYyA9IG5ldyBSZWdFeHAoJ1teJyArXG4gICAgICBhbHBoYWJldC5nZXQoKS5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKSArXG4gICAgJ10nKTtcbiAgICByZXR1cm4gIW5vbkFscGhhYmV0aWMudGVzdChpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxudmFyIHJhbmRvbUJ5dGU7XG5cbmlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xufSBlbHNlIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG4iLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGZvcm1hdC5qc2AgaW4gYnVuZGxlcnMgbGlrZSB3ZWJwYWNrIG9yIFJvbGx1cCxcbi8vIGFjY29yZGluZyB0byBgYnJvd3NlcmAgY29uZmlnIGluIGBwYWNrYWdlLmpzb25gLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyYW5kb20sIGFscGhhYmV0LCBzaXplKSB7XG4gIC8vIFdlIGNhbuKAmXQgdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC4gVG8gbWFrZSBieXRlcyB2YWx1ZXMgY2xvc2VyXG4gIC8vIHRvIHRoZSBhbHBoYWJldCwgd2UgYXBwbHkgYml0bWFzayBvbiB0aGVtLiBXZSBsb29rIGZvciB0aGUgY2xvc2VzdFxuICAvLyBgMiAqKiB4IC0gMWAgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGJpZ2dlciB0aGFuIGFscGhhYmV0IHNpemUuIElmIHdlIGhhdmVcbiAgLy8gMzAgc3ltYm9scyBpbiB0aGUgYWxwaGFiZXQsIHdlIHdpbGwgdGFrZSAzMSAoMDAwMTExMTEpLlxuICAvLyBXZSBkbyBub3QgdXNlIGZhc3RlciBNYXRoLmNsejMyLCBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGUgaW4gYnJvd3NlcnMuXG4gIHZhciBtYXNrID0gKDIgPDwgTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikgLSAxXG4gIC8vIEJpdG1hc2sgaXMgbm90IGEgcGVyZmVjdCBzb2x1dGlvbiAoaW4gb3VyIGV4YW1wbGUgaXQgd2lsbCBwYXNzIDMxIGJ5dGVzLFxuICAvLyB3aGljaCBpcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQpLiBBcyBhIHJlc3VsdCwgd2Ugd2lsbCBuZWVkIG1vcmUgYnl0ZXMsXG4gIC8vIHRoYW4gSUQgc2l6ZSwgYmVjYXVzZSB3ZSB3aWxsIHJlZnVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuXG5cbiAgLy8gRXZlcnkgaGFyZHdhcmUgcmFuZG9tIGdlbmVyYXRvciBjYWxsIGlzIGNvc3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgZm9yIGVudHJvcHkgY29sbGVjdGlvbi4gVGhpcyBpcyB3aHkgb2Z0ZW4gaXQgd2lsbFxuICAvLyBiZSBmYXN0ZXIgdG8gYXNrIGZvciBmZXcgZXh0cmEgYnl0ZXMgaW4gYWR2YW5jZSwgdG8gYXZvaWQgYWRkaXRpb25hbCBjYWxscy5cblxuICAvLyBIZXJlIHdlIGNhbGN1bGF0ZSBob3cgbWFueSByYW5kb20gYnl0ZXMgc2hvdWxkIHdlIGNhbGwgaW4gYWR2YW5jZS5cbiAgLy8gSXQgZGVwZW5kcyBvbiBJRCBsZW5ndGgsIG1hc2sgLyBhbHBoYWJldCBzaXplIGFuZCBtYWdpYyBudW1iZXIgMS42XG4gIC8vICh3aGljaCB3YXMgc2VsZWN0ZWQgYWNjb3JkaW5nIGJlbmNobWFya3MpLlxuXG4gIC8vIC1+ZiA9PiBNYXRoLmNlaWwoZikgaWYgbiBpcyBmbG9hdCBudW1iZXJcbiAgLy8gLX5pID0+IGkgKyAxIGlmIG4gaXMgaW50ZWdlciBudW1iZXJcbiAgdmFyIHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgdmFyIGlkID0gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBieXRlcyA9IHJhbmRvbShzdGVwKVxuICAgIC8vIENvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgXG4gICAgdmFyIGkgPSBzdGVwXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gSWYgcmFuZG9tIGJ5dGUgaXMgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgZXZlbiBhZnRlciBiaXRtYXNrLFxuICAgICAgLy8gd2UgcmVmdXNlIGl0IGJ5IGB8fCAnJ2AuXG4gICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnXG4gICAgICAvLyBNb3JlIGNvbXBhY3QgdGhhbiBgaWQubGVuZ3RoICsgMSA9PT0gc2l6ZWBcbiAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3NlYXJjaC1zbmlwcGV0LWVkaXRvci5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uLy4uL2pzL2Jsb2Nrcy9zZWFyY2gtc25pcHBldC1lZGl0b3IuanN4XCI7Il0sIm5hbWVzIjpbIndwIiwiJCIsImFwaUZldGNoIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiZWxlbWVudCIsInNlcnZlclNpZGVSZW5kZXIiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0NvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJUb2dnbGVDb250cm9sIiwiRmxleCIsIkZsZXhJdGVtIiwiUGFuZWxCb2R5IiwiTm90aWNlIiwiQ2hlY2tib3hDb250cm9sIiwiU2VsZWN0Q29udHJvbCIsIlRvb2xiYXJHcm91cCIsIlRvb2xiYXJCdXR0b24iLCJQbGFjZWhvbGRlciIsIkRpc2FibGVkIiwiQ2FyZCIsIlNwaW5uZXIiLCJUYWJQYW5lbCIsIlRleHRDb250cm9sIiwiY29tcG9uZW50cyIsIl9fIiwiaTE4biIsInNob3J0aWQiLCJyZXF1aXJlIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiU25pcHBldEVkaXRGbiIsInByb3BzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGFzc05hbWUiLCJuYW1lIiwiZmlsdGVyRHJvcHBlZCIsInNldEZpbHRlckRyb3BwZWQiLCJlZGl0TW9kZSIsInNldEVkaXRNb2RlIiwidGVybXNGZXRjaGVkIiwic2V0VGVybXNGZXRjaGVkIiwidGVybXMiLCJzZXRUZXJtcyIsInNlZ21lbnQiLCJjYXRlZ29yeSIsInByb3BlcnR5IiwiYmxvY2tSZWYiLCJoYW5kbGVyUmVtb3ZlIiwiZXZlbnQiLCJ0YXJnZXQiLCJwYXJlbnRzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJhZGRDbGFzcyIsImNzcyIsImNhdGVnb3JpZXMiLCJjdXJyZW50IiwiZmluZCIsInNhdmVTbG90cyIsImRyYWdTb3J0SW5pdCIsInNvcnRhYmxlIiwibm90IiwiZm9yY2VIZWxwZXJTaXplIiwiZm9yY2VQbGFjZWhvbGRlclNpemUiLCJ0b2xlcmFuY2UiLCJzY3JvbGwiLCJzY3JvbGxTZW5zaXRpdml0eSIsImNvbnRhaW5tZW50IiwicGxhY2Vob2xkZXIiLCJoYW5kbGUiLCJzdGFydCIsInVpIiwiaXRlbSIsImJlZm9yZVN0b3AiLCJyZW1vdmVDbGFzcyIsInN0b3AiLCJzaG93U2xvdFNldHRpbmdzIiwidGhlbiIsImRyYWdnYWJsZSIsImNvbm5lY3RUb1NvcnRhYmxlIiwiaGVscGVyIiwicmV2ZXJ0IiwicmV2ZXJ0RHVyYXRpb24iLCJ6SW5kZXgiLCJmaWx0ZXJzIiwic3RvcmUiLCJzZWdtZW50U2x1ZyIsImF0dHIiLCJtYXRjaCIsImkiLCJmaWx0ZXJzQ29uc3RydWN0ZWQiLCJsZW5ndGgiLCJwdXNoIiwia2V5IiwiaGFzQ2xhc3MiLCJkYXRhIiwiZ2VuZXJhdGUiLCJ0eXBlIiwiaWQiLCJieSIsInNlbGVjdEFsbENhdEFsaWFzIiwidmFsIiwidmFsdWUiLCJwcm9wIiwicSIsInNlbGVjdEFsbFByb3BBbGlhcyIsIlByb21pc2UiLCJyZXNvbHZlIiwid19mcm9tIiwib3V0ZXJXaWR0aCIsIndfdG8iLCJyZWplY3QiLCJ3aWR0aCIsInNldHRpbmdzIiwiaCIsIm91dGVySGVpZ2h0IiwidyIsImhlaWdodCIsImdldEV4YW1wbGUiLCJ0ZW1wbGF0ZXMiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRlbXBsYXRlc0h0bWwiLCJ0aXRsZSIsInByb3BlcnR5Q2hlY2tib3hlcyIsImluZGV4UHJvcGVydHkiLCJlbnRyaWVzIiwibGFiZWwiLCJjaGVja2VkIiwiaW5kZXgiLCJwb3NpdGlvbiIsImluZGV4T2YiLCJzbG90cyIsInRhYiIsImZpbHRlcnNDb25zdHJ1Y3RlZEh0bWwiLCJmaWx0ZXIiLCJhbGlhcyIsImNhcmQiLCJ0ZXJtU2x1ZyIsImNoZWNrYm94IiwiaW5jbHVkZXMiLCJnZXRJbnNwZWN0b3JDb250cm9scyIsIndpdGhDb3VudCIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJ0YWJzSHRtbCIsImluZGV4U2VnbWVudCIsInRhYnMiLCJnZXRCbG9ja1ByZXZpZXciLCJpc1ByZXZpZXciLCJnZXRUZXJtcyIsInBhdGgiLCJtZXRob2QiLCJjdXJyZW50QXR0cnMiLCJyZXNwb25zZSIsImRpc3BhdGNoIiwiY3JlYXRlTm90aWNlIiwiaXNEaXNtaXNzaWJsZSIsImNhdGNoIiwiZSIsInJlbmRlciIsImlzRXhhbXBsZSIsInJlbW92ZSIsImNsYXNzZXMiLCJqb2luIiwiaXNNb3VudGVkIiwidmFsaWRBdHRycyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uc0xpc3QiLCJtdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJ0YWJBcmVhIiwib2JzZXJ2ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJkZXNjcmlwdGlvbiIsImljb24iLCJrZXl3b3JkcyIsInN0eWxlcyIsInZhcmlhdGlvbnMiLCJkZWZhdWx0IiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/testimonials-editor.jsx":
/*!***********************************************!*\
  !*** ./src/js/blocks/testimonials-editor.jsx ***!
  \***********************************************/
/***/ (function() {

(function (wp, $) {
  const {
    apiFetch,
    apiRequest
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
    BlockControls
  } = wp.blockEditor;
  const {
    SelectControl,
    ToggleControl,
    Notice,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
    Disabled,
    TextControl,
    Spinner,
    RangeControl,
    Flex,
    FlexItem,
    FlexBlock,
    __experimentalRadioGroup: RadioGroup,
    __experimentalRadio: Radio
  } = wp.components;
  const {
    __
  } = wp.i18n;
  const exampleImageData = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 274 165",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("title", null, "Layer 1"), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "37.11686",
    fill: "#cccccc",
    id: "svg_3",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "31.10835",
    fill: "#ffffff",
    id: "svg_7",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.44604,49.58966c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_26"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_29",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "23.6448"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_30",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "33.08893"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_93"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_34"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_35"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_36"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,25.95956l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_37"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "84.7264",
    fill: "#cccccc",
    id: "svg_97",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "78.71789",
    fill: "#ffffff",
    id: "svg_98",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.38214,97.26131c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_99"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_100",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "71.25435"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_101",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "80.69847"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_102"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_103"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_104"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_105"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_106"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,73.5691l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_107"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "131.72641",
    fill: "#cccccc",
    id: "svg_110",
    r: "17.76122"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45.05725",
    cy: "125.7179",
    fill: "#ffffff",
    id: "svg_111",
    r: "6.55574"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m32.52134,144.40417c0.6231,-3.83491 4.27272,-12.78304 12.64012,-12.69173c8.3674,0.0913 12.28406,10.04382 12.59561,13.28523c-9.12403,9.28041 -21.91187,5.48358 -25.23574,-0.5935l0.00001,0z",
    fill: "#ffffff",
    id: "svg_112"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "6.00851",
    id: "svg_113",
    rx: "1",
    ry: "1",
    width: "72.99225",
    x: "71.10958",
    y: "118.25435"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#cccccc",
    height: "18.4706",
    id: "svg_114",
    rx: "2",
    ry: "2",
    width: "175.18435",
    x: "71.33211",
    y: "127.69848"
  }), /*#__PURE__*/React.createElement("g", {
    id: "svg_115"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m209.71379,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_116"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m217.40507,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_117"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m225.41641,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_118"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m240.36741,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_119"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m233.02719,120.56911l2.34875,0l0.72578,-2.2313l0.72578,2.2313l2.34875,0l-1.90017,1.379l0.72582,2.2313l-1.90017,-1.37904l-1.90017,1.37904l0.72582,-2.2313l-1.90017,-1.379l-0.00002,0z",
    fill: "#ff6c6c",
    id: "svg_120"
  })));
  let lastPreview = false;
  function TestimonialsFn(props) {
    const {
      attributes,
      setAttributes,
      className,
      name
    } = props;
    const [editMode, setEditMode] = useState(true);
    const [attrPostsFetched, setAttrPostsFetched] = useState(false);
    const [attrPosts, setAttrPosts] = useState(false);
    const [rendered, setRendered] = useState(false);
    let blockRef = useRef();
    let selectPostsRef = useRef();
    let selectPostTypeRef = useRef();
    const creatWarningMsg = () => {
      wp.data.dispatch('core/notices').createNotice('error',
      // Can be one of: success, info, warning, error.
      __('An error occurred while receiving data from the server for Testimonials block', 'messia'),
      // Text string to display.
      {
        isDismissible: true
      });
    };
    const getExample = () => {
      return exampleImageData;
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
      if (attrPostsFetched) {
        const block = wp.blocks.getBlockType(name);
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          key: "messia-block",
          ref: blockRef
        }, /*#__PURE__*/React.createElement("h4", null, block.title), /*#__PURE__*/React.createElement(Notice, {
          isDismissible: false,
          status: "warning"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, __('Build Your conditions for searching testimonials.', 'messia')), /*#__PURE__*/React.createElement("div", null, __('Notes:', 'messia')), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, __('all conditions joint by AND operator.', 'messia')), /*#__PURE__*/React.createElement("li", null, __('set parameter Limit to 0 to unlimit number of comments.', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Number of testimonials', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.limit,
          onChange: value => {
            setAttributes({
              limit: Number(value)
            });
          }
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(TextControl, {
          className: "criteria-item",
          label: __('Text limit', 'messia'),
          min: "0",
          step: "1",
          type: "number",
          value: attributes.shrinkTo,
          onChange: value => {
            setAttributes({
              shrinkTo: Number(value)
            });
          }
        }))), /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(SelectControl, {
          className: "criteria-item",
          label: __('Sort by:', 'messia'),
          value: attributes.orderBy,
          onChange: value => {
            setAttributes({
              orderBy: value
            });
          },
          options: [{
            label: __('Date published', 'messia'),
            value: 'comment_date',
            disabled: false
          }, {
            label: __('Rating value', 'messia'),
            value: 'rating',
            disabled: false
          }]
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(RadioGroup, {
          className: "criteria-item",
          accessibilitylabel: "Width",
          onChange: value => {
            setAttributes({
              orderDir: value
            });
          },
          checked: attributes.orderDir
        }, /*#__PURE__*/React.createElement("div", null, __('Sort direction:', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "ASC"
        }, __('Ascending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "DESC"
        }, __('Descending', 'messia')), /*#__PURE__*/React.createElement(Radio, {
          value: "RND"
        }, __('Random', 'messia'))))), /*#__PURE__*/React.createElement(Flex, {
          className: "conditions",
          justify: "start",
          align: "left",
          gap: 0
        }, /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPostTypeRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('In response to post of type:', 'messia'),
          value: attributes.forPostType,
          onChange: slug => {
            setAttributes({
              forPostType: slug
            });
          },
          options: [{
            value: 'post',
            label: __('Post', 'messia')
          }, {
            value: 'page',
            label: __('Page', 'messia')
          }, {
            value: 'messia_object',
            label: __('Object', 'messia')
          }]
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement("div", {
          ref: selectPostsRef
        }, /*#__PURE__*/React.createElement(SelectControl, {
          multiple: true,
          className: "condition-item",
          label: __('In response to Posts/Pages/Objects:', 'messia'),
          value: attributes.inResponseTo,
          onChange: slug => {
            setAttributes({
              inResponseTo: slug
            });
          },
          options: attrPosts.length === 0 ? [{
            value: -1,
            label: __('Any', 'messia')
          }] : attrPosts
        }))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement(Flex, {
          className: "criteria",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, {
          className: "ratingRange"
        }, /*#__PURE__*/React.createElement(RangeControl, {
          className: "rating-min",
          label: __('Min rating:', 'messia'),
          value: attributes.ratingMin,
          onChange: ratingMin => {
            setAttributes({
              ratingMin: ratingMin
            });
          },
          min: 0,
          max: 5,
          step: 0.5,
          type: "slider",
          separatorType: "none",
          withInputField: true,
          trackColor: "red",
          railColor: "green"
        })), /*#__PURE__*/React.createElement(FlexItem, {
          className: "ratingRange"
        }, /*#__PURE__*/React.createElement(RangeControl, {
          className: "rating-max",
          label: __('Max rating:', 'messia'),
          value: attributes.ratingMax,
          onChange: ratingMax => {
            setAttributes({
              ratingMax: ratingMax
            });
          },
          min: 0,
          max: 5,
          step: 0.5,
          type: "slider",
          separatorType: "none",
          withInputField: true,
          trackColor: "green",
          railColor: "red"
        }))))), /*#__PURE__*/React.createElement(FlexBlock, null, /*#__PURE__*/React.createElement(Flex, {
          className: "depth-non-rated",
          gap: 5
        }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ToggleControl, {
          label: __('Show in slider', 'messia'),
          checked: attributes.slider.active,
          onChange: checked => {
            let slider = Object.assign({}, attributes.slider);
            slider.active = Boolean(checked), setAttributes({
              slider: slider
            });
          }
        })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ToggleControl, {
          label: __('Exclude objects or posts that never been rated.', 'messia'),
          checked: attributes.excludeNoRating,
          onChange: checked => {
            setAttributes({
              excludeNoRating: Boolean(checked)
            });
          }
        }))))));
      } else {
        return /*#__PURE__*/React.createElement(Placeholder, {
          key: "messia-block-placeholder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "messia-block",
          tabIndex: "0",
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
        block: props.name,
        attributes: attributes,
        urlQueryArgs: {
          isPreview: true
        }
      })));
    };
    const getAttrPosts = async () => {
      return await new Promise((resolve, reject) => {
        apiFetch({
          path: 'messia/v1/testimonials',
          method: 'POST',
          data: {
            currentAttrs: attributes
          }
        }).then(response => {
          return resolve(response);
        }).catch(e => {
          creatWarningMsg();
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
        } else if (lastPreview === false) {
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
      if (!attrPostsFetched && !attributes.isExample) {
        getAttrPosts().then(response => {
          if (isMounted) {
            setAttrPosts(response);
            setAttrPostsFetched(true);
            setRendered(true);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, [attrPostsFetched]);
    useEffect(() => {
      if (!rendered || !editMode) return;
      const request = apiRequest.buildAjaxOptions({
        namespace: 'messia',
        endpoint: 'v1/testimonials/',
        type: 'POST',
        delay: 250,
        data: params => {
          var query = {
            search: typeof params.term === 'undefined' ? null : params.term
          };
          return query;
        },
        error: (MLHttpRequest, textStatus, errorThrown) => {
          if (textStatus === 'abort') {
            return;
          }
          creatWarningMsg();
        },
        cache: true
      });
      $(selectPostsRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia'),
        minimumInputLength: 3,
        closeOnSelect: false,
        ajax: request
      }).on('change', event => {
        let slug = $(event.currentTarget).val();
        if (slug === null) {
          slug = [];
        }
        setAttributes({
          inResponseTo: slug
        });
      });
      $(selectPostTypeRef.current).find('select').select2({
        width: '100%',
        placeholder: __('Any', 'messia')
      }).on('change', event => {
        let slug = $(event.currentTarget).val();
        if (slug === null) {
          slug = [];
        }
        setAttributes({
          forPostType: slug
        });
      });
    }, [rendered, editMode]);
    return render();
  }
  registerBlockType('messia/block-testimonials', {
    title: __('Testimonials', 'messia'),
    description: __('Testimonials by parameters', 'messia'),
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg",
      fillRule: "evenodd",
      clipRule: "evenodd"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
    })),
    category: 'messia',
    keywords: ['testimonial'],
    styles: [],
    variations: [],
    attributes: {
      isExample: {
        type: 'boolean',
        default: false
      },
      forPostType: {
        type: 'array',
        default: []
      },
      inResponseTo: {
        type: 'array',
        default: []
      },
      ratingMin: {
        type: 'integer',
        default: 3
      },
      ratingMax: {
        type: 'integer',
        default: 5
      },
      excludeNoRating: {
        type: 'boolean',
        default: true
      },
      limit: {
        type: 'integer',
        default: 5
      },
      shrinkTo: {
        type: 'integer',
        default: 200
      },
      slider: {
        type: 'object',
        default: {
          active: true
        }
      },
      orderBy: {
        type: 'string',
        default: 'comment_date',
        enum: ['comment_date', 'rating']
      },
      orderDir: {
        type: 'string',
        default: 'ASC',
        enum: ['ASC', 'DESC', 'RND']
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
    edit: TestimonialsFn,
    save: function (props) {
      return null;
    }
  });
})(window.wp, jQuery);

/***/ }),

/***/ "./src/scss/blocks/testimonials-editor.scss":
/*!**************************************************!*\
  !*** ./src/scss/blocks/testimonials-editor.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!***************************************************!*\
  !*** ./src/entries/blocks/testimonials-editor.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_testimonials_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/testimonials-editor.scss */ "./src/scss/blocks/testimonials-editor.scss");
/* harmony import */ var _js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/blocks/testimonials-editor.jsx */ "./src/js/blocks/testimonials-editor.jsx");
/* harmony import */ var _js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_blocks_testimonials_editor_jsx__WEBPACK_IMPORTED_MODULE_1__);
// Styles


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMvYXNzZXRzL2pzL2Jsb2Nrcy9ibG9jay10ZXN0aW1vbmlhbHMtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFDLFdBQVVBLEVBQUUsRUFBRUMsQ0FBQyxFQUFFO0VBRWpCLE1BQU07SUFBRUMsUUFBUTtJQUFFQztFQUFXLENBQUMsR0FBR0gsRUFBRTtFQUNuQyxNQUFNO0lBQUVJO0VBQWtCLENBQUMsR0FBR0osRUFBRSxDQUFDSyxNQUFNO0VBQ3ZDLE1BQU07SUFBRUMsU0FBUztJQUFFQyxRQUFRO0lBQUVDLFFBQVE7SUFBRUMsU0FBUztJQUFFQztFQUFPLENBQUMsR0FBR1YsRUFBRSxDQUFDVyxPQUFPO0VBQ3ZFLE1BQU07SUFBRUMsZ0JBQWdCLEVBQUVDO0VBQWlCLENBQUMsR0FBR2IsRUFBRTtFQUNqRCxNQUFNO0lBQUVjO0VBQWMsQ0FBQyxHQUFHZCxFQUFFLENBQUNlLFdBQVc7RUFDeEMsTUFBTTtJQUFFQyxhQUFhO0lBQUVDLGFBQWE7SUFBRUMsTUFBTTtJQUFFQyxZQUFZO0lBQUVDLGFBQWE7SUFBRUMsV0FBVztJQUFFQyxRQUFRO0lBQUVDLFdBQVc7SUFBRUMsT0FBTztJQUFFQyxZQUFZO0lBQUVDLElBQUk7SUFBRUMsUUFBUTtJQUFFQyxTQUFTO0lBQUVDLHdCQUF3QixFQUFFQyxVQUFVO0lBQUVDLG1CQUFtQixFQUFFQztFQUFNLENBQUMsR0FBR2hDLEVBQUUsQ0FBQ2lDLFVBQVU7RUFDblAsTUFBTTtJQUFFQztFQUFHLENBQUMsR0FBR2xDLEVBQUUsQ0FBQ21DLElBQUk7RUFDdEIsTUFBTUMsZ0JBQWdCLGdCQUFHO0lBQUssT0FBTyxFQUFDLGFBQWE7SUFBQyxLQUFLLEVBQUM7RUFBNEIsZ0JBQ3JGLDZDQUFzQixlQUN0QjtJQUFRLEVBQUUsRUFBQyxVQUFVO0lBQUMsRUFBRSxFQUFDLFVBQVU7SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsQ0FBQyxFQUFDO0VBQVUsRUFBRyxlQUM3RTtJQUFRLEVBQUUsRUFBQyxVQUFVO0lBQUMsRUFBRSxFQUFDLFVBQVU7SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsQ0FBQyxFQUFDO0VBQVMsRUFBRyxlQUM1RTtJQUFNLENBQUMsRUFBQywyTEFBMkw7SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQztFQUFRLEVBQUcsZUFDak87SUFBTSxJQUFJLEVBQUMsU0FBUztJQUFDLE1BQU0sRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLFFBQVE7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsS0FBSyxFQUFDLFVBQVU7SUFBQyxDQUFDLEVBQUMsVUFBVTtJQUFDLENBQUMsRUFBQztFQUFTLEVBQUcsZUFDNUc7SUFBTSxJQUFJLEVBQUMsU0FBUztJQUFDLE1BQU0sRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDLFFBQVE7SUFBQyxFQUFFLEVBQUMsR0FBRztJQUFDLEVBQUUsRUFBQyxHQUFHO0lBQUMsS0FBSyxFQUFDLFdBQVc7SUFBQyxDQUFDLEVBQUMsVUFBVTtJQUFDLENBQUMsRUFBQztFQUFVLEVBQUcsZUFDOUc7SUFBRyxFQUFFLEVBQUM7RUFBUSxnQkFDYjtJQUFNLENBQUMsRUFBQyxxTEFBcUw7SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQztFQUFRLEVBQUcsZUFDM047SUFBTSxDQUFDLEVBQUMscUxBQXFMO0lBQUMsSUFBSSxFQUFDLFNBQVM7SUFBQyxFQUFFLEVBQUM7RUFBUSxFQUFHLGVBQzNOO0lBQU0sQ0FBQyxFQUFDLHFMQUFxTDtJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsRUFBRSxFQUFDO0VBQVEsRUFBRyxlQUMzTjtJQUFNLENBQUMsRUFBQyxxTEFBcUw7SUFBQyxJQUFJLEVBQUMsU0FBUztJQUFDLEVBQUUsRUFBQztFQUFRLEVBQUcsZUFDM047SUFBTSxDQUFDLEVBQUMscUxBQXFMO0lBQUMsSUFBSSxFQUFDLFNBQVM7SUFBQyxFQUFFLEVB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QUUsS0FBSztRQUNkQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUs7TUFDNUI7SUFDRCxDQUFDO0lBQ0RDLE9BQU8sRUFBRTtNQUNSckcsVUFBVSxFQUFFO1FBQ1g2RCxTQUFTLEVBQUU7TUFDWjtJQUNELENBQUM7SUFDRHlDLFFBQVEsRUFBRTtNQUNUQyxRQUFRLEVBQUU7SUFFWCxDQUFDO0lBQ0RDLElBQUksRUFBRTFHLGNBQWM7SUFDcEIyRyxJQUFJLEVBQUUsVUFBVTFHLEtBQUssRUFBRTtNQUFFLE9BQU8sSUFBSTtJQUFDO0VBQ3RDLENBQUMsQ0FBQztBQUVILENBQUMsRUFBQzJHLE1BQU0sQ0FBQ2xKLEVBQUUsRUFBRW1KLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7O0FDL2ZwQjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ29EOztBQUVwRCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9ibG9ja3MvdGVzdGltb25pYWxzLWVkaXRvci5qc3giLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL3Njc3MvYmxvY2tzL3Rlc3RpbW9uaWFscy1lZGl0b3Iuc2Nzcz81NDE2Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvZW50cmllcy9ibG9ja3MvdGVzdGltb25pYWxzLWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdwLCAkKSB7XG5cblx0Y29uc3QgeyBhcGlGZXRjaCwgYXBpUmVxdWVzdCB9ID0gd3A7XG5cdGNvbnN0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSA9IHdwLmJsb2Nrcztcblx0Y29uc3QgeyBDb21wb25lbnQsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSA9IHdwLmVsZW1lbnQ7XG5cdGNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5cdGNvbnN0IHsgQmxvY2tDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5cdGNvbnN0IHsgU2VsZWN0Q29udHJvbCwgVG9nZ2xlQ29udHJvbCwgTm90aWNlLCBUb29sYmFyR3JvdXAsIFRvb2xiYXJCdXR0b24sIFBsYWNlaG9sZGVyLCBEaXNhYmxlZCwgVGV4dENvbnRyb2wsIFNwaW5uZXIsIFJhbmdlQ29udHJvbCwgRmxleCwgRmxleEl0ZW0sIEZsZXhCbG9jaywgX19leHBlcmltZW50YWxSYWRpb0dyb3VwOiBSYWRpb0dyb3VwLCBfX2V4cGVyaW1lbnRhbFJhZGlvOiBSYWRpbyB9ID0gd3AuY29tcG9uZW50cztcblx0Y29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblx0Y29uc3QgZXhhbXBsZUltYWdlRGF0YSA9IDxzdmcgdmlld0JveD1cIjAgMCAyNzQgMTY1XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdDx0aXRsZT5MYXllciAxPC90aXRsZT5cblx0XHQ8Y2lyY2xlIGN4PVwiNDUuMDU3MjVcIiBjeT1cIjM3LjExNjg2XCIgZmlsbD1cIiNjY2NjY2NcIiBpZD1cInN2Z18zXCIgcj1cIjE3Ljc2MTIyXCIgLz5cblx0XHQ8Y2lyY2xlIGN4PVwiNDUuMDU3MjVcIiBjeT1cIjMxLjEwODM1XCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z183XCIgcj1cIjYuNTU1NzRcIiAvPlxuXHRcdDxwYXRoIGQ9XCJtMzIuNDQ2MDQsNDkuNTg5NjZjMC42MjMxLC0zLjgzNDkxIDQuMjcyNzIsLTEyLjc4MzA0IDEyLjY0MDEyLC0xMi42OTE3M2M4LjM2NzQsMC4wOTEzIDEyLjI4NDA2LDEwLjA0MzgyIDEyLjU5NTYxLDEzLjI4NTIzYy05LjEyNDAzLDkuMjgwNDEgLTIxLjkxMTg3LDUuNDgzNTggLTI1LjIzNTc0LC0wLjU5MzVsMC4wMDAwMSwwelwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfMjZcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiNi4wMDg1MVwiIGlkPVwic3ZnXzI5XCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI3Mi45OTIyNVwiIHg9XCI3MS4xMDk1OFwiIHk9XCIyMy42NDQ4XCIgLz5cblx0XHQ8cmVjdCBmaWxsPVwiI2NjY2NjY1wiIGhlaWdodD1cIjE4LjQ3MDZcIiBpZD1cInN2Z18zMFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMTc1LjE4NDM1XCIgeD1cIjcxLjMzMjExXCIgeT1cIjMzLjA4ODkzXCIgLz5cblx0XHQ8ZyBpZD1cInN2Z185M1wiPlxuXHRcdFx0PHBhdGggZD1cIm0yMDkuNzEzNzksMjUuOTU5NTZsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18zMlwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIxNy40MDUwNywyNS45NTk1NmwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzM0XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjI1LjQxNjQxLDI1Ljk1OTU2bDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMzVcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yNDAuMzY3NDEsMjUuOTU5NTZsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18zNlwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIzMy4wMjcxOSwyNS45NTk1NmwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzM3XCIgLz5cblx0XHQ8L2c+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCI4NC43MjY0XCIgZmlsbD1cIiNjY2NjY2NcIiBpZD1cInN2Z185N1wiIHI9XCIxNy43NjEyMlwiIC8+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCI3OC43MTc4OVwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfOThcIiByPVwiNi41NTU3NFwiIC8+XG5cdFx0PHBhdGggZD1cIm0zMi4zODIxNCw5Ny4yNjEzMWMwLjYyMzEsLTMuODM0OTEgNC4yNzI3MiwtMTIuNzgzMDQgMTIuNjQwMTIsLTEyLjY5MTczYzguMzY3NCwwLjA5MTMgMTIuMjg0MDYsMTAuMDQzODIgMTIuNTk1NjEsMTMuMjg1MjNjLTkuMTI0MDMsOS4yODA0MSAtMjEuOTExODcsNS40ODM1OCAtMjUuMjM1NzQsLTAuNTkzNWwwLjAwMDAxLDB6XCIgZmlsbD1cIiNmZmZmZmZcIiBpZD1cInN2Z185OVwiIC8+XG5cdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI2LjAwODUxXCIgaWQ9XCJzdmdfMTAwXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI3Mi45OTIyNVwiIHg9XCI3MS4xMDk1OFwiIHk9XCI3MS4yNTQzNVwiIC8+XG5cdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCIxOC40NzA2XCIgaWQ9XCJzdmdfMTAxXCIgcng9XCIyXCIgcnk9XCIyXCIgd2lkdGg9XCIxNzUuMTg0MzVcIiB4PVwiNzEuMzMyMTFcIiB5PVwiODAuNjk4NDdcIiAvPlxuXHRcdDxnIGlkPVwic3ZnXzEwMlwiPlxuXHRcdFx0PHBhdGggZD1cIm0yMDkuNzEzNzksNzMuNTY5MWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzEwM1wiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIxNy40MDUwNyw3My41NjkxbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTA0XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjI1LjQxNjQxLDczLjU2OTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMDVcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yNDAuMzY3NDEsNzMuNTY5MWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzEwNlwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTIzMy4wMjcxOSw3My41NjkxbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTA3XCIgLz5cblx0XHQ8L2c+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCIxMzEuNzI2NDFcIiBmaWxsPVwiI2NjY2NjY1wiIGlkPVwic3ZnXzExMFwiIHI9XCIxNy43NjEyMlwiIC8+XG5cdFx0PGNpcmNsZSBjeD1cIjQ1LjA1NzI1XCIgY3k9XCIxMjUuNzE3OVwiIGZpbGw9XCIjZmZmZmZmXCIgaWQ9XCJzdmdfMTExXCIgcj1cIjYuNTU1NzRcIiAvPlxuXHRcdDxwYXRoIGQ9XCJtMzIuNTIxMzQsMTQ0LjQwNDE3YzAuNjIzMSwtMy44MzQ5MSA0LjI3MjcyLC0xMi43ODMwNCAxMi42NDAxMiwtMTIuNjkxNzNjOC4zNjc0LDAuMDkxMyAxMi4yODQwNiwxMC4wNDM4MiAxMi41OTU2MSwxMy4yODUyM2MtOS4xMjQwMyw5LjI4MDQxIC0yMS45MTE4Nyw1LjQ4MzU4IC0yNS4yMzU3NCwtMC41OTM1bDAuMDAwMDEsMHpcIiBmaWxsPVwiI2ZmZmZmZlwiIGlkPVwic3ZnXzExMlwiIC8+XG5cdFx0PHJlY3QgZmlsbD1cIiNjY2NjY2NcIiBoZWlnaHQ9XCI2LjAwODUxXCIgaWQ9XCJzdmdfMTEzXCIgcng9XCIxXCIgcnk9XCIxXCIgd2lkdGg9XCI3Mi45OTIyNVwiIHg9XCI3MS4xMDk1OFwiIHk9XCIxMTguMjU0MzVcIiAvPlxuXHRcdDxyZWN0IGZpbGw9XCIjY2NjY2NjXCIgaGVpZ2h0PVwiMTguNDcwNlwiIGlkPVwic3ZnXzExNFwiIHJ4PVwiMlwiIHJ5PVwiMlwiIHdpZHRoPVwiMTc1LjE4NDM1XCIgeD1cIjcxLjMzMjExXCIgeT1cIjEyNy42OTg0OFwiIC8+XG5cdFx0PGcgaWQ9XCJzdmdfMTE1XCI+XG5cdFx0XHQ8cGF0aCBkPVwibTIwOS43MTM3OSwxMjAuNTY5MTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMTZcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMTcuNDA1MDcsMTIwLjU2OTExbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTE3XCIgLz5cblx0XHRcdDxwYXRoIGQ9XCJtMjI1LjQxNjQxLDEyMC41NjkxMWwyLjM0ODc1LDBsMC43MjU3OCwtMi4yMzEzbDAuNzI1NzgsMi4yMzEzbDIuMzQ4NzUsMGwtMS45MDAxNywxLjM3OWwwLjcyNTgyLDIuMjMxM2wtMS45MDAxNywtMS4zNzkwNGwtMS45MDAxNywxLjM3OTA0bDAuNzI1ODIsLTIuMjMxM2wtMS45MDAxNywtMS4zNzlsLTAuMDAwMDIsMHpcIiBmaWxsPVwiI2ZmNmM2Y1wiIGlkPVwic3ZnXzExOFwiIC8+XG5cdFx0XHQ8cGF0aCBkPVwibTI0MC4zNjc0MSwxMjAuNTY5MTFsMi4zNDg3NSwwbDAuNzI1NzgsLTIuMjMxM2wwLjcyNTc4LDIuMjMxM2wyLjM0ODc1LDBsLTEuOTAwMTcsMS4zNzlsMC43MjU4MiwyLjIzMTNsLTEuOTAwMTcsLTEuMzc5MDRsLTEuOTAwMTcsMS4zNzkwNGwwLjcyNTgyLC0yLjIzMTNsLTEuOTAwMTcsLTEuMzc5bC0wLjAwMDAyLDB6XCIgZmlsbD1cIiNmZjZjNmNcIiBpZD1cInN2Z18xMTlcIiAvPlxuXHRcdFx0PHBhdGggZD1cIm0yMzMuMDI3MTksMTIwLjU2OTExbDIuMzQ4NzUsMGwwLjcyNTc4LC0yLjIzMTNsMC43MjU3OCwyLjIzMTNsMi4zNDg3NSwwbC0xLjkwMDE3LDEuMzc5bDAuNzI1ODIsMi4yMzEzbC0xLjkwMDE3LC0xLjM3OTA0bC0xLjkwMDE3LDEuMzc5MDRsMC43MjU4MiwtMi4yMzEzbC0xLjkwMDE3LC0xLjM3OWwtMC4wMDAwMiwwelwiIGZpbGw9XCIjZmY2YzZjXCIgaWQ9XCJzdmdfMTIwXCIgLz5cblx0XHQ8L2c+XG5cdDwvc3ZnPjtcblxuXHRsZXQgbGFzdFByZXZpZXcgPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBUZXN0aW1vbmlhbHNGbihwcm9wcykge1xuXG5cdFx0Y29uc3QgeyBhdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGFzc05hbWUsIG5hbWUgfSA9IHByb3BzO1xuXG5cdFx0Y29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblx0XHRjb25zdCBbYXR0clBvc3RzRmV0Y2hlZCwgc2V0QXR0clBvc3RzRmV0Y2hlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cdFx0Y29uc3QgW2F0dHJQb3N0cywgc2V0QXR0clBvc3RzXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0XHRjb25zdCBbcmVuZGVyZWQsIHNldFJlbmRlcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuXHRcdGxldCBibG9ja1JlZiA9IHVzZVJlZigpO1xuXHRcdGxldCBzZWxlY3RQb3N0c1JlZiA9IHVzZVJlZigpO1xuXHRcdGxldCBzZWxlY3RQb3N0VHlwZVJlZiA9IHVzZVJlZigpO1xuXG5cdFx0Y29uc3QgY3JlYXRXYXJuaW5nTXNnID0gKCkgPT4ge1xuXHRcdFx0d3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ub3RpY2VzJykuY3JlYXRlTm90aWNlKFxuXHRcdFx0XHQnZXJyb3InLCAvLyBDYW4gYmUgb25lIG9mOiBzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvci5cblx0XHRcdFx0X18oJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlY2VpdmluZyBkYXRhIGZyb20gdGhlIHNlcnZlciBmb3IgVGVzdGltb25pYWxzIGJsb2NrJywgJ21lc3NpYScpLCAvLyBUZXh0IHN0cmluZyB0byBkaXNwbGF5LlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXNEaXNtaXNzaWJsZTogdHJ1ZSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRFeGFtcGxlID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4YW1wbGVJbWFnZURhdGE7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tDb250cm9scyA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJsb2NrQ29udHJvbHMga2V5PVwiYmxvY2tcIj5cblx0XHRcdFx0XHQ8VG9vbGJhckdyb3VwXG5cdFx0XHRcdFx0XHRsYWJlbD17X18oJ09wdGlvbnMnLCAnbWVzc2lhJyl9PlxuXHRcdFx0XHRcdFx0PFRvb2xiYXJCdXR0b25cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2VkaXRNb2RlID8gX18oJ1ByZXZpZXcnLCAnbWVzc2lhJykgOiBfXygnRWRpdCcsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0aWNvbj17ZWRpdE1vZGUgPyBcInZpc2liaWxpdHlcIiA6IFwiZWRpdFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0RWRpdE1vZGUoIWVkaXRNb2RlKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XG5cdFx0XHRcdDwvQmxvY2tDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tFZGl0ID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAoYXR0clBvc3RzRmV0Y2hlZCkge1xuXHRcdFx0XHRjb25zdCBibG9jayA9IHdwLmJsb2Nrcy5nZXRCbG9ja1R5cGUobmFtZSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8UGxhY2Vob2xkZXIga2V5PVwibWVzc2lhLWJsb2NrLXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdFx0XHQ8aDQ+e2Jsb2NrLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxOb3RpY2Vcblx0XHRcdFx0XHRcdFx0XHRpc0Rpc21pc3NpYmxlPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM9XCJ3YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+e19fKCdCdWlsZCBZb3VyIGNvbmRpdGlvbnMgZm9yIHNlYXJjaGluZyB0ZXN0aW1vbmlhbHMuJywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdj57X18oJ05vdGVzOicsICdtZXNzaWEnKX08L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDx1bD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpPntfXygnYWxsIGNvbmRpdGlvbnMgam9pbnQgYnkgQU5EIG9wZXJhdG9yLicsICdtZXNzaWEnKX08L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGk+e19fKCdzZXQgcGFyYW1ldGVyIExpbWl0IHRvIDAgdG8gdW5saW1pdCBudW1iZXIgb2YgY29tbWVudHMuJywgJ21lc3NpYScpfTwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L05vdGljZT5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYVwiXG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXs1fT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnTnVtYmVyIG9mIHRlc3RpbW9uaWFscycsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0bWluPScwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGVwPScxJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlPSdudW1iZXInXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmxpbWl0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGxpbWl0OiBOdW1iZXIodmFsdWUpIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxUZXh0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYS1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdUZXh0IGxpbWl0JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtaW49JzAnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0ZXA9JzEnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9J251bWJlcidcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMuc2hyaW5rVG99XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgc2hyaW5rVG86IE51bWJlcih2YWx1ZSkgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0PEZsZXhcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYVwiXG5cdFx0XHRcdFx0XHRcdFx0Z2FwPXs1fT5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJjcml0ZXJpYS1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTb3J0IGJ5OicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMub3JkZXJCeX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBvcmRlckJ5OiB2YWx1ZSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17W1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBfXygnRGF0ZSBwdWJsaXNoZWQnLCAnbWVzc2lhJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2NvbW1lbnRfZGF0ZScsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oJ1JhdGluZyB2YWx1ZScsICdtZXNzaWEnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAncmF0aW5nJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0PFJhZGlvR3JvdXBcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY3JpdGVyaWEtaXRlbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFjY2Vzc2liaWxpdHlsYWJlbD1cIldpZHRoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBvcmRlckRpcjogdmFsdWUgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ9e2F0dHJpYnV0ZXMub3JkZXJEaXJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PntfXygnU29ydCBkaXJlY3Rpb246JywgJ21lc3NpYScpfTwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW8gdmFsdWU9XCJBU0NcIj57X18oJ0FzY2VuZGluZycsICdtZXNzaWEnKX08L1JhZGlvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFkaW8gdmFsdWU9XCJERVNDXCI+e19fKCdEZXNjZW5kaW5nJywgJ21lc3NpYScpfTwvUmFkaW8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxSYWRpbyB2YWx1ZT1cIlJORFwiPntfXygnUmFuZG9tJywgJ21lc3NpYScpfTwvUmFkaW8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L1JhZGlvR3JvdXA+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0PC9GbGV4PlxuXHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbnNcIlxuXHRcdFx0XHRcdFx0XHRcdGp1c3RpZnk9XCJzdGFydFwiXG5cdFx0XHRcdFx0XHRcdFx0YWxpZ249XCJsZWZ0XCJcblx0XHRcdFx0XHRcdFx0XHRnYXA9ezB9PlxuXHRcdFx0XHRcdFx0XHRcdDxGbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IHJlZj17c2VsZWN0UG9zdFR5cGVSZWZ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG11bHRpcGxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29uZGl0aW9uLWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnSW4gcmVzcG9uc2UgdG8gcG9zdCBvZiB0eXBlOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5mb3JQb3N0VHlwZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBmb3JQb3N0VHlwZTogc2x1ZyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e1tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6ICdwb3N0JywgbGFiZWw6IF9fKCdQb3N0JywgJ21lc3NpYScpIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiAncGFnZScsIGxhYmVsOiBfXygnUGFnZScsICdtZXNzaWEnKSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogJ21lc3NpYV9vYmplY3QnLCBsYWJlbDogX18oJ09iamVjdCcsICdtZXNzaWEnKSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiByZWY9e3NlbGVjdFBvc3RzUmVmfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtdWx0aXBsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNvbmRpdGlvbi1pdGVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0luIHJlc3BvbnNlIHRvIFBvc3RzL1BhZ2VzL09iamVjdHM6JywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmluUmVzcG9uc2VUb31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHNsdWcpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBpblJlc3BvbnNlVG86IHNsdWcgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXsoYXR0clBvc3RzLmxlbmd0aCA9PT0gMCkgPyBbeyB2YWx1ZTogLTEsIGxhYmVsOiBfXygnQW55JywgJ21lc3NpYScpIH1dIDogYXR0clBvc3RzfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdFx0PEZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNyaXRlcmlhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Z2FwPXs1fT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PEZsZXhJdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicmF0aW5nUmFuZ2VcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8UmFuZ2VDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJyYXRpbmctbWluXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnTWluIHJhdGluZzonLCAnbWVzc2lhJyl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17YXR0cmlidXRlcy5yYXRpbmdNaW59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17KHJhdGluZ01pbikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgcmF0aW5nTWluOiByYXRpbmdNaW4gfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWluPXswfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4PXs1fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RlcD17MC41fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT0nc2xpZGVyJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VwYXJhdG9yVHlwZT0nbm9uZSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpdGhJbnB1dEZpZWxkPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHJhY2tDb2xvcj0ncmVkJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmFpbENvbG9yPSdncmVlbidcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXhJdGVtPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJyYXRpbmdSYW5nZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxSYW5nZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInJhdGluZy1tYXhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdNYXggcmF0aW5nOicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLnJhdGluZ01heH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsocmF0aW5nTWF4KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyByYXRpbmdNYXg6IHJhdGluZ01heCB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtaW49ezB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYXg9ezV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdGVwPXswLjV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlPSdzbGlkZXInXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXBhcmF0b3JUeXBlPSdub25lJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2l0aElucHV0RmllbGQ9e3RydWV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0cmFja0NvbG9yPSdncmVlbidcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhaWxDb2xvcj0ncmVkJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvRmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdFx0PC9GbGV4QmxvY2s+XG5cdFx0XHRcdFx0XHRcdDwvRmxleD5cblx0XHRcdFx0XHRcdFx0PEZsZXhCbG9jaz5cblx0XHRcdFx0XHRcdFx0XHQ8RmxleFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZGVwdGgtbm9uLXJhdGVkXCJcblx0XHRcdFx0XHRcdFx0XHRcdGdhcD17NX0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8RmxleEl0ZW0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxUb2dnbGVDb250cm9sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTaG93IGluIHNsaWRlcicsICdtZXNzaWEnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLnNsaWRlci5hY3RpdmV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhjaGVja2VkKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgc2xpZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgYXR0cmlidXRlcy5zbGlkZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2xpZGVyLmFjdGl2ZSA9IEJvb2xlYW4oY2hlY2tlZCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoeyBzbGlkZXI6IHNsaWRlciB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxGbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbD17X18oJ0V4Y2x1ZGUgb2JqZWN0cyBvciBwb3N0cyB0aGF0IG5ldmVyIGJlZW4gcmF0ZWQuJywgJ21lc3NpYScpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ9e2F0dHJpYnV0ZXMuZXhjbHVkZU5vUmF0aW5nfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoY2hlY2tlZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGV4Y2x1ZGVOb1JhdGluZzogQm9vbGVhbihjaGVja2VkKSB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9GbGV4SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8L0ZsZXg+XG5cdFx0XHRcdFx0XHRcdDwvRmxleEJsb2NrPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxQbGFjZWhvbGRlciBrZXk9XCJtZXNzaWEtYmxvY2stcGxhY2Vob2xkZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2lhLWJsb2NrXCIgdGFiSW5kZXg9XCIwXCIga2V5PVwibWVzc2lhLWJsb2NrXCIgcmVmPXtibG9ja1JlZn0+XG5cdFx0XHRcdFx0XHRcdDxTcGlubmVyIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QmxvY2tQcmV2aWV3ID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lc3NpYS1ibG9ja1wiIGtleT1cIm1lc3NpYS1ibG9ja1wiIHJlZj17YmxvY2tSZWZ9PlxuXHRcdFx0XHRcdDxEaXNhYmxlZCBrZXk9XCJibG9jay1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8U2VydmVyU2lkZVJlbmRlclxuXHRcdFx0XHRcdFx0XHRibG9jaz17cHJvcHMubmFtZX1cblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcz17YXR0cmlidXRlc31cblx0XHRcdFx0XHRcdFx0dXJsUXVlcnlBcmdzPXt7IGlzUHJldmlldzogdHJ1ZSB9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0Rpc2FibGVkPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0QXR0clBvc3RzID0gYXN5bmMgKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0YXBpRmV0Y2goe1xuXHRcdFx0XHRcdHBhdGg6ICdtZXNzaWEvdjEvdGVzdGltb25pYWxzJyxcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiB7IGN1cnJlbnRBdHRyczogYXR0cmlidXRlcyB9XG5cdFx0XHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRjcmVhdFdhcm5pbmdNc2coKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cblx0XHRcdGlmIChhdHRyaWJ1dGVzLmlzRXhhbXBsZSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0RXhhbXBsZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0bGV0IGNsYXNzZXMgPSBbY2xhc3NOYW1lXTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyID0gW1xuXHRcdFx0XHRcdGdldEJsb2NrQ29udHJvbHMoKSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRpZiAoZWRpdE1vZGUpIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChnZXRCbG9ja0VkaXQoKSk7XG5cdFx0XHRcdFx0bGFzdFByZXZpZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChsYXN0UHJldmlldyA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRsYXN0UHJldmlldyA9IGdldEJsb2NrUHJldmlldygpO1xuXHRcdFx0XHRcdHJlbmRlci5wdXNoKGxhc3RQcmV2aWV3KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZW5kZXIucHVzaChsYXN0UHJldmlldyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT57cmVuZGVyfTwvZGl2Pjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR1c2VFZmZlY3QoKCkgPT4ge1xuXG5cdFx0XHRsZXQgaXNNb3VudGVkID0gdHJ1ZTtcblx0XHRcdGlmICghYXR0clBvc3RzRmV0Y2hlZCAmJiAhYXR0cmlidXRlcy5pc0V4YW1wbGUpIHtcblxuXHRcdFx0XHRnZXRBdHRyUG9zdHMoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXG5cdFx0XHRcdFx0aWYgKGlzTW91bnRlZCkge1xuXG5cdFx0XHRcdFx0XHRzZXRBdHRyUG9zdHMocmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0c2V0QXR0clBvc3RzRmV0Y2hlZCh0cnVlKTtcblx0XHRcdFx0XHRcdHNldFJlbmRlcmVkKHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBpc01vdW50ZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSwgW2F0dHJQb3N0c0ZldGNoZWRdKTtcblxuXHRcdHVzZUVmZmVjdCgoKSA9PiB7XG5cblx0XHRcdGlmICghcmVuZGVyZWQgfHwgIWVkaXRNb2RlKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHJlcXVlc3QgPSBhcGlSZXF1ZXN0LmJ1aWxkQWpheE9wdGlvbnMoe1xuXHRcdFx0XHRuYW1lc3BhY2U6ICdtZXNzaWEnLFxuXHRcdFx0XHRlbmRwb2ludDogJ3YxL3Rlc3RpbW9uaWFscy8nLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdGRlbGF5OiAyNTAsXG5cdFx0XHRcdGRhdGE6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHR2YXIgcXVlcnkgPSB7XG5cdFx0XHRcdFx0XHRzZWFyY2g6ICh0eXBlb2YgcGFyYW1zLnRlcm0gPT09ICd1bmRlZmluZWQnKSA/IG51bGwgOiBwYXJhbXMudGVybSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHF1ZXJ5O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRleHRTdGF0dXMgPT09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3JlYXRXYXJuaW5nTXNnKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNhY2hlOiB0cnVlXG5cdFx0XHR9KTtcblxuXHRcdFx0JChzZWxlY3RQb3N0c1JlZi5jdXJyZW50KS5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHtcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IF9fKCdBbnknLCAnbWVzc2lhJyksXG5cdFx0XHRcdG1pbmltdW1JbnB1dExlbmd0aDogMyxcblx0XHRcdFx0Y2xvc2VPblNlbGVjdDogZmFsc2UsXG5cdFx0XHRcdGFqYXg6IHJlcXVlc3QsXG5cdFx0XHR9KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBzbHVnID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblx0XHRcdFx0aWYgKHNsdWcgPT09IG51bGwpIHtcblx0XHRcdFx0XHRzbHVnID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0QXR0cmlidXRlcyh7IGluUmVzcG9uc2VUbzogc2x1ZyB9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHNlbGVjdFBvc3RUeXBlUmVmLmN1cnJlbnQpLmZpbmQoJ3NlbGVjdCcpLnNlbGVjdDIoe1xuXHRcdFx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogX18oJ0FueScsICdtZXNzaWEnKSxcblx0XHRcdH0pLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0bGV0IHNsdWcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXHRcdFx0XHRpZiAoc2x1ZyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHNsdWcgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZXRBdHRyaWJ1dGVzKHsgZm9yUG9zdFR5cGU6IHNsdWcgfSk7XG5cdFx0XHR9KTtcblxuXHRcdH0sIFtyZW5kZXJlZCwgZWRpdE1vZGVdKTtcblxuXHRcdHJldHVybiByZW5kZXIoKTtcblx0fVxuXG5cdHJlZ2lzdGVyQmxvY2tUeXBlKCdtZXNzaWEvYmxvY2stdGVzdGltb25pYWxzJywge1xuXHRcdHRpdGxlOiBfXygnVGVzdGltb25pYWxzJywgJ21lc3NpYScpLFxuXHRcdGRlc2NyaXB0aW9uOiBfXygnVGVzdGltb25pYWxzIGJ5IHBhcmFtZXRlcnMnLCAnbWVzc2lhJyksXG5cdFx0aWNvbjogPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbFJ1bGU9XCJldmVub2RkXCIgY2xpcFJ1bGU9XCJldmVub2RkXCI+PHBhdGggZD1cIk0xMiAxYy02LjMzOCAwLTEyIDQuMjI2LTEyIDEwLjAwNyAwIDIuMDUuNzM5IDQuMDYzIDIuMDQ3IDUuNjI1bC0xLjk5MyA2LjM2OCA2Ljk0Ni0zYzEuNzA1LjQzOSAzLjMzNC42NDEgNC44NjQuNjQxIDcuMTc0IDAgMTIuMTM2LTQuNDM5IDEyLjEzNi05LjYzNCAwLTUuODEyLTUuNzAxLTEwLjAwNy0xMi0xMC4wMDd6bTAgMWM2LjA2NSAwIDExIDQuMDQxIDExIDkuMDA3IDAgNC45MjItNC43ODcgOC42MzQtMTEuMTM2IDguNjM0LTEuODgxIDAtMy40MDEtLjI5OS00Ljk0Ni0uNjk1bC01LjI1OCAyLjI3MSAxLjUwNS00LjgwOGMtMS4zMDgtMS41NjQtMi4xNjUtMy4xMjgtMi4xNjUtNS40MDIgMC00Ljk2NiA0LjkzNS05LjAwNyAxMS05LjAwN3ptLTUgNy41Yy44MjggMCAxLjUuNjcyIDEuNSAxLjVzLS42NzIgMS41LTEuNSAxLjUtMS41LS42NzItMS41LTEuNS42NzItMS41IDEuNS0xLjV6bTUgMGMuODI4IDAgMS41LjY3MiAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcyLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em01IDBjLjgyOCAwIDEuNS42NzIgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3Mi0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXpcIiAvPjwvc3ZnPixcblx0XHRjYXRlZ29yeTogJ21lc3NpYScsXG5cdFx0a2V5d29yZHM6IFsndGVzdGltb25pYWwnXSxcblx0XHRzdHlsZXM6IFtdLFxuXHRcdHZhcmlhdGlvbnM6IFtdLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGlzRXhhbXBsZToge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGZvclBvc3RUeXBlOiB7XG5cdFx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRcdGRlZmF1bHQ6IFtdLFxuXHRcdFx0fSxcblx0XHRcdGluUmVzcG9uc2VUbzoge1xuXHRcdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0XHRkZWZhdWx0OiBbXSxcblx0XHRcdH0sXG5cdFx0XHRyYXRpbmdNaW46IHtcblx0XHRcdFx0dHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRkZWZhdWx0OiAzLFxuXHRcdFx0fSxcblx0XHRcdHJhdGluZ01heDoge1xuXHRcdFx0XHR0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdGRlZmF1bHQ6IDUsXG5cdFx0XHR9LFxuXHRcdFx0ZXhjbHVkZU5vUmF0aW5nOiB7XG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGVmYXVsdDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRsaW1pdDoge1xuXHRcdFx0XHR0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdGRlZmF1bHQ6IDUsXG5cdFx0XHR9LFxuXHRcdFx0c2hyaW5rVG86IHtcblx0XHRcdFx0dHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRkZWZhdWx0OiAyMDAsXG5cdFx0XHR9LFxuXHRcdFx0c2xpZGVyOiB7XG5cdFx0XHRcdHR5cGU6ICdvYmplY3QnLFxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0YWN0aXZlOiB0cnVlLFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0b3JkZXJCeToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGVmYXVsdDogJ2NvbW1lbnRfZGF0ZScsXG5cdFx0XHRcdGVudW06IFsnY29tbWVudF9kYXRlJywgJ3JhdGluZyddLFxuXHRcdFx0fSxcblx0XHRcdG9yZGVyRGlyOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkZWZhdWx0OiAnQVNDJyxcblx0XHRcdFx0ZW51bTogWydBU0MnLCAnREVTQycsICdSTkQnXSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRleGFtcGxlOiB7XG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGlzRXhhbXBsZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRzdXBwb3J0czoge1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cblx0XHR9LFxuXHRcdGVkaXQ6IFRlc3RpbW9uaWFsc0ZuLFxuXHRcdHNhdmU6IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbCB9LFxuXHR9KTtcblxufSh3aW5kb3cud3AsIGpRdWVyeSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZXNcbmltcG9ydCBcIi4uLy4uL3Njc3MvYmxvY2tzL3Rlc3RpbW9uaWFscy1lZGl0b3Iuc2Nzc1wiO1xuXG4vLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi8uLi9qcy9ibG9ja3MvdGVzdGltb25pYWxzLWVkaXRvci5qc3hcIjsiXSwibmFtZXMiOlsid3AiLCIkIiwiYXBpRmV0Y2giLCJhcGlSZXF1ZXN0IiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiZWxlbWVudCIsInNlcnZlclNpZGVSZW5kZXIiLCJTZXJ2ZXJTaWRlUmVuZGVyIiwiQmxvY2tDb250cm9scyIsImJsb2NrRWRpdG9yIiwiU2VsZWN0Q29udHJvbCIsIlRvZ2dsZUNvbnRyb2wiLCJOb3RpY2UiLCJUb29sYmFyR3JvdXAiLCJUb29sYmFyQnV0dG9uIiwiUGxhY2Vob2xkZXIiLCJEaXNhYmxlZCIsIlRleHRDb250cm9sIiwiU3Bpbm5lciIsIlJhbmdlQ29udHJvbCIsIkZsZXgiLCJGbGV4SXRlbSIsIkZsZXhCbG9jayIsIl9fZXhwZXJpbWVudGFsUmFkaW9Hcm91cCIsIlJhZGlvR3JvdXAiLCJfX2V4cGVyaW1lbnRhbFJhZGlvIiwiUmFkaW8iLCJjb21wb25lbnRzIiwiX18iLCJpMThuIiwiZXhhbXBsZUltYWdlRGF0YSIsImxhc3RQcmV2aWV3IiwiVGVzdGltb25pYWxzRm4iLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwibmFtZSIsImVkaXRNb2RlIiwic2V0RWRpdE1vZGUiLCJhdHRyUG9zdHNGZXRjaGVkIiwic2V0QXR0clBvc3RzRmV0Y2hlZCIsImF0dHJQb3N0cyIsInNldEF0dHJQb3N0cyIsInJlbmRlcmVkIiwic2V0UmVuZGVyZWQiLCJibG9ja1JlZiIsInNlbGVjdFBvc3RzUmVmIiwic2VsZWN0UG9zdFR5cGVSZWYiLCJjcmVhdFdhcm5pbmdNc2ciLCJkYXRhIiwiZGlzcGF0Y2giLCJjcmVhdGVOb3RpY2UiLCJpc0Rpc21pc3NpYmxlIiwiZ2V0RXhhbXBsZSIsImdldEJsb2NrQ29udHJvbHMiLCJnZXRCbG9ja0VkaXQiLCJibG9jayIsImdldEJsb2NrVHlwZSIsInRpdGxlIiwibGltaXQiLCJ2YWx1ZSIsIk51bWJlciIsInNocmlua1RvIiwib3JkZXJCeSIsImxhYmVsIiwiZGlzYWJsZWQiLCJvcmRlckRpciIsImZvclBvc3RUeXBlIiwic2x1ZyIsImluUmVzcG9uc2VUbyIsImxlbmd0aCIsInJhdGluZ01pbiIsInJhdGluZ01heCIsInNsaWRlciIsImFjdGl2ZSIsImNoZWNrZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJCb29sZWFuIiwiZXhjbHVkZU5vUmF0aW5nIiwiZ2V0QmxvY2tQcmV2aWV3IiwiaXNQcmV2aWV3IiwiZ2V0QXR0clBvc3RzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYXRoIiwibWV0aG9kIiwiY3VycmVudEF0dHJzIiwidGhlbiIsInJlc3BvbnNlIiwiY2F0Y2giLCJlIiwicmVuZGVyIiwiaXNFeGFtcGxlIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiaXNNb3VudGVkIiwicmVxdWVzdCIsImJ1aWxkQWpheE9wdGlvbnMiLCJuYW1lc3BhY2UiLCJlbmRwb2ludCIsInR5cGUiLCJkZWxheSIsInBhcmFtcyIsInF1ZXJ5Iiwic2VhcmNoIiwidGVybSIsImVycm9yIiwiTUxIdHRwUmVxdWVzdCIsInRleHRTdGF0dXMiLCJlcnJvclRocm93biIsImNhY2hlIiwiY3VycmVudCIsImZpbmQiLCJzZWxlY3QyIiwid2lkdGgiLCJwbGFjZWhvbGRlciIsIm1pbmltdW1JbnB1dExlbmd0aCIsImNsb3NlT25TZWxlY3QiLCJhamF4Iiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ2YWwiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwic3R5bGVzIiwidmFyaWF0aW9ucyIsImRlZmF1bHQiLCJlbnVtIiwiZXhhbXBsZSIsInN1cHBvcnRzIiwibXVsdGlwbGUiLCJlZGl0Iiwic2F2ZSIsIndpbmRvdyIsImpRdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=
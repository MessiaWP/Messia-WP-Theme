/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/_components/_comment_form.scss":
/*!*************************************************!*\
  !*** ./src/scss/_components/_comment_form.scss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/_components/_comment_form.js":
/*!*********************************************!*\
  !*** ./src/js/_components/_comment_form.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wp_includes_js_comment_reply_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../wp-includes/js/comment-reply.js */ "../../../wp-includes/js/comment-reply.js");
/* harmony import */ var _wp_includes_js_comment_reply_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wp_includes_js_comment_reply_js__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
	$(function () {
		var Messia = {
			selectRating : function(e){
				Messia.doRating( $(this), e.pageX );
			},
			setRating : function(e){
				var number = Messia.doRating( $(this), e.pageX );
				$(this).addClass('fixed').next('.rating_ball').find('.points').css('color', '#d72020');
				$(this).parents('#commentform').find('.form-submit input#comment_rating').val(number);
			},
			resetRating : function(e){
				if(e.type == 'mouseenter'){
					$(this).removeClass('fixed').next('.rating_ball').find('.points').css('color', '');
					$(this).parents('#commentform').find('.form-submit input#comment_rating').val(null);
				}
				else if(e.type == 'mouseleave'){
					if( !$(this).hasClass('fixed') ){
						$(this).find('.bg-active').css('width', '0%');
						$(this).parents('.rating').find('.points').text('0.00');
					}
				}
			},
			moveForm : function(){
				var respond = $(this);
				var comment_parent = respond.find('input[type="hidden"]#comment_parent').val();

				if(comment_parent === '0'){
					respond.find('.eval').css('display', '');
				}
				else{
					respond.find('.eval').css('display', 'none');
				}
			},
			doRating : function(target, pageX){
				
				var lag = -2; // положительный - отставание, отрицательный - опережение
				var step = 10; // 10 - по пол балла, 20 - по одному
				var rel_position = pageX - target.parent().offset().left;

				// Звезда окрасится после прохождения ее курсором
				// var rating_percentage = Math.round( ( ( rel_position + lag ) / target.width() * 100) / step) * step;

				// Звезда окрасится в момент вхождения в нее курсора
				var rating_percentage = Math.ceil( ( ( rel_position + lag ) / target.width() * 100) / step) * step;

				var number = parseFloat(rating_percentage / 20).toFixed(2);

				target.find('.bg-active').css('width', rating_percentage + '%');

				var points = target.parents('.rating').find('.points');
				if(points.length === 0){
					return;
				}
				points.text(number);
				return number;
			},
		};

		$('body').on('mouseenter', '.rating .stars.editable', Messia.resetRating);
		$('body').on('mouseleave', '.rating .stars.editable', Messia.resetRating);
		$('body').on('mousemove', '.rating .stars.editable:not(.fixed)', Messia.selectRating);
		$('body').on('click', '.rating .stars.editable', Messia.setRating);

		$(document).on('DOMNodeInserted', '#respond.comment-respond', Messia.moveForm);
	});
})(jQuery);

// recaptcha
if( document.getElementById('commentform') != null && typeof grecaptcha != 'undefined' ){
	
	grecaptcha.ready(function () {
		
		var action = document.getElementById('recaptchaAction');
		
		if(action == null){
			return;
		}
		
		grecaptcha.execute(messiaVars.gCaptchaV3, { action: action.value }).then(function (token) {
			var recaptchaResponse = document.getElementById('recaptchaResponse');
			recaptchaResponse.value = token;
		});
	});
}

/***/ }),

/***/ "../../../wp-includes/js/comment-reply.js":
/*!************************************************!*\
  !*** ../../../wp-includes/js/comment-reply.js ***!
  \************************************************/
/***/ (function() {

/**
 * Handles the addition of the comment form.
 *
 * @since 2.7.0
 * @output wp-includes/js/comment-reply.js
 *
 * @namespace addComment
 *
 * @type {Object}
 */
window.addComment = ( function( window ) {
	// Avoid scope lookups on commonly used variables.
	var document = window.document;

	// Settings.
	var config = {
		commentReplyClass   : 'comment-reply-link',
		commentReplyTitleId : 'reply-title',
		cancelReplyId       : 'cancel-comment-reply-link',
		commentFormId       : 'commentform',
		temporaryFormId     : 'wp-temp-form-div',
		parentIdFieldId     : 'comment_parent',
		postIdFieldId       : 'comment_post_ID'
	};

	// Cross browser MutationObserver.
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	// Check browser cuts the mustard.
	var cutsTheMustard = 'querySelector' in document && 'addEventListener' in window;

	/*
	 * Check browser supports dataset.
	 * !! sets the variable to true if the property exists.
	 */
	var supportsDataset = !! document.documentElement.dataset;

	// For holding the cancel element.
	var cancelElement;

	// For holding the comment form element.
	var commentFormElement;

	// The respond element.
	var respondElement;

	// The mutation observer.
	var observer;

	if ( cutsTheMustard && document.readyState !== 'loading' ) {
		ready();
	} else if ( cutsTheMustard ) {
		window.addEventListener( 'DOMContentLoaded', ready, false );
	}

	/**
	 * Sets up object variables after the DOM is ready.
	 *
	 * @since 5.1.1
	 */
	function ready() {
		// Initialise the events.
		init();

		// Set up a MutationObserver to check for comments loaded late.
		observeChanges();
	}

	/**
	 * Add events to links classed .comment-reply-link.
	 *
	 * Searches the context for reply links and adds the JavaScript events
	 * required to move the comment form. To allow for lazy loading of
	 * comments this method is exposed as window.commentReply.init().
	 *
	 * @since 5.1.0
	 *
	 * @memberOf addComment
	 *
	 * @param {HTMLElement} context The parent DOM element to search for links.
	 */
	function init( context ) {
		if ( ! cutsTheMustard ) {
			return;
		}

		// Get required elements.
		cancelElement = getElementById( config.cancelReplyId );
		commentFormElement = getElementById( config.commentFormId );

		// No cancel element, no replies.
		if ( ! cancelElement ) {
			return;
		}

		cancelElement.addEventListener( 'touchstart', cancelEvent );
		cancelElement.addEventListener( 'click',      cancelEvent );

		// Submit the comment form when the user types [Ctrl] or [Cmd] + [Enter].
		var submitFormHandler = function( e ) {
			if ( ( e.metaKey || e.ctrlKey ) && e.keyCode === 13 ) {
				commentFormElement.removeEventListener( 'keydown', submitFormHandler );
				e.preventDefault();
				// The submit button ID is 'submit' so we can't call commentFormElement.submit(). Click it instead.
				commentFormElement.submit.click();
				return false;
			}
		};

		if ( commentFormElement ) {
			commentFormElement.addEventListener( 'keydown', submitFormHandler );
		}

		var links = replyLinks( context );
		var element;

		for ( var i = 0, l = links.length; i < l; i++ ) {
			element = links[i];

			element.addEventListener( 'touchstart', clickEvent );
			element.addEventListener( 'click',      clickEvent );
		}
	}

	/**
	 * Return all links classed .comment-reply-link.
	 *
	 * @since 5.1.0
	 *
	 * @param {HTMLElement} context The parent DOM element to search for links.
	 *
	 * @return {HTMLCollection|NodeList|Array}
	 */
	function replyLinks( context ) {
		var selectorClass = config.commentReplyClass;
		var allReplyLinks;

		// childNodes is a handy check to ensure the context is a HTMLElement.
		if ( ! context || ! context.childNodes ) {
			context = document;
		}

		if ( document.getElementsByClassName ) {
			// Fastest.
			allReplyLinks = context.getElementsByClassName( selectorClass );
		}
		else {
			// Fast.
			allReplyLinks = context.querySelectorAll( '.' + selectorClass );
		}

		return allReplyLinks;
	}

	/**
	 * Cancel event handler.
	 *
	 * @since 5.1.0
	 *
	 * @param {Event} event The calling event.
	 */
	function cancelEvent( event ) {
		var cancelLink = this;
		var temporaryFormId  = config.temporaryFormId;
		var temporaryElement = getElementById( temporaryFormId );

		if ( ! temporaryElement || ! respondElement ) {
			// Conditions for cancel link fail.
			return;
		}

		getElementById( config.parentIdFieldId ).value = '0';

		// Move the respond form back in place of the temporary element.
		var headingText = temporaryElement.textContent;
		temporaryElement.parentNode.replaceChild( respondElement, temporaryElement );
		cancelLink.style.display = 'none';

		var replyHeadingElement  = getElementById( config.commentReplyTitleId );
		var replyHeadingTextNode = replyHeadingElement && replyHeadingElement.firstChild;
		var replyLinkToParent    = replyHeadingTextNode && replyHeadingTextNode.nextSibling;

		if ( replyHeadingTextNode && replyHeadingTextNode.nodeType === Node.TEXT_NODE && headingText ) {
			if ( replyLinkToParent && 'A' === replyLinkToParent.nodeName && replyLinkToParent.id !== config.cancelReplyId ) {
				replyLinkToParent.style.display = '';
			}

			replyHeadingTextNode.textContent = headingText;
		}

		event.preventDefault();
	}

	/**
	 * Click event handler.
	 *
	 * @since 5.1.0
	 *
	 * @param {Event} event The calling event.
	 */
	function clickEvent( event ) {
		var replyNode = getElementById( config.commentReplyTitleId );
		var defaultReplyHeading = replyNode && replyNode.firstChild.textContent;
		var replyLink = this,
			commId    = getDataAttribute( replyLink, 'belowelement' ),
			parentId  = getDataAttribute( replyLink, 'commentid' ),
			respondId = getDataAttribute( replyLink, 'respondelement' ),
			postId    = getDataAttribute( replyLink, 'postid' ),
			replyTo   = getDataAttribute( replyLink, 'replyto' ) || defaultReplyHeading,
			follow;

		if ( ! commId || ! parentId || ! respondId || ! postId ) {
			/*
			 * Theme or plugin defines own link via custom `wp_list_comments()` callback
			 * and calls `moveForm()` either directly or via a custom event hook.
			 */
			return;
		}

		/*
		 * Third party comments systems can hook into this function via the global scope,
		 * therefore the click event needs to reference the global scope.
		 */
		follow = window.addComment.moveForm( commId, parentId, respondId, postId, replyTo );
		if ( false === follow ) {
			event.preventDefault();
		}
	}

	/**
	 * Creates a mutation observer to check for newly inserted comments.
	 *
	 * @since 5.1.0
	 */
	function observeChanges() {
		if ( ! MutationObserver ) {
			return;
		}

		var observerOptions = {
			childList: true,
			subtree: true
		};

		observer = new MutationObserver( handleChanges );
		observer.observe( document.body, observerOptions );
	}

	/**
	 * Handles DOM changes, calling init() if any new nodes are added.
	 *
	 * @since 5.1.0
	 *
	 * @param {Array} mutationRecords Array of MutationRecord objects.
	 */
	function handleChanges( mutationRecords ) {
		var i = mutationRecords.length;

		while ( i-- ) {
			// Call init() once if any record in this set adds nodes.
			if ( mutationRecords[ i ].addedNodes.length ) {
				init();
				return;
			}
		}
	}

	/**
	 * Backward compatible getter of data-* attribute.
	 *
	 * Uses element.dataset if it exists, otherwise uses getAttribute.
	 *
	 * @since 5.1.0
	 *
	 * @param {HTMLElement} Element DOM element with the attribute.
	 * @param {string}      Attribute the attribute to get.
	 *
	 * @return {string}
	 */
	function getDataAttribute( element, attribute ) {
		if ( supportsDataset ) {
			return element.dataset[attribute];
		}
		else {
			return element.getAttribute( 'data-' + attribute );
		}
	}

	/**
	 * Get element by ID.
	 *
	 * Local alias for document.getElementById.
	 *
	 * @since 5.1.0
	 *
	 * @param {HTMLElement} The requested element.
	 */
	function getElementById( elementId ) {
		return document.getElementById( elementId );
	}

	/**
	 * Moves the reply form from its current position to the reply location.
	 *
	 * @since 2.7.0
	 *
	 * @memberOf addComment
	 *
	 * @param {string} addBelowId HTML ID of element the form follows.
	 * @param {string} commentId  Database ID of comment being replied to.
	 * @param {string} respondId  HTML ID of 'respond' element.
	 * @param {string} postId     Database ID of the post.
	 * @param {string} replyTo    Form heading content.
	 */
	function moveForm( addBelowId, commentId, respondId, postId, replyTo ) {
		// Get elements based on their IDs.
		var addBelowElement = getElementById( addBelowId );
		respondElement  = getElementById( respondId );

		// Get the hidden fields.
		var parentIdField   = getElementById( config.parentIdFieldId );
		var postIdField     = getElementById( config.postIdFieldId );
		var element, cssHidden, style;

		var replyHeading         = getElementById( config.commentReplyTitleId );
		var replyHeadingTextNode = replyHeading && replyHeading.firstChild;
		var replyLinkToParent    = replyHeadingTextNode && replyHeadingTextNode.nextSibling;

		if ( ! addBelowElement || ! respondElement || ! parentIdField ) {
			// Missing key elements, fail.
			return;
		}

		if ( 'undefined' === typeof replyTo ) {
			replyTo = replyHeadingTextNode && replyHeadingTextNode.textContent;
		}

		addPlaceHolder( respondElement );

		// Set the value of the post.
		if ( postId && postIdField ) {
			postIdField.value = postId;
		}

		parentIdField.value = commentId;

		cancelElement.style.display = '';
		addBelowElement.parentNode.insertBefore( respondElement, addBelowElement.nextSibling );

		if ( replyHeadingTextNode && replyHeadingTextNode.nodeType === Node.TEXT_NODE ) {
			if ( replyLinkToParent && 'A' === replyLinkToParent.nodeName && replyLinkToParent.id !== config.cancelReplyId ) {
				replyLinkToParent.style.display = 'none';
			}

			replyHeadingTextNode.textContent = replyTo;
		}

		/*
		 * This is for backward compatibility with third party commenting systems
		 * hooking into the event using older techniques.
		 */
		cancelElement.onclick = function() {
			return false;
		};

		// Focus on the first field in the comment form.
		try {
			for ( var i = 0; i < commentFormElement.elements.length; i++ ) {
				element = commentFormElement.elements[i];
				cssHidden = false;

				// Get elements computed style.
				if ( 'getComputedStyle' in window ) {
					// Modern browsers.
					style = window.getComputedStyle( element );
				} else if ( document.documentElement.currentStyle ) {
					// IE 8.
					style = element.currentStyle;
				}

				/*
				 * For display none, do the same thing jQuery does. For visibility,
				 * check the element computed style since browsers are already doing
				 * the job for us. In fact, the visibility computed style is the actual
				 * computed value and already takes into account the element ancestors.
				 */
				if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
					cssHidden = true;
				}

				// Skip form elements that are hidden or disabled.
				if ( 'hidden' === element.type || element.disabled || cssHidden ) {
					continue;
				}

				element.focus();
				// Stop after the first focusable element.
				break;
			}
		}
		catch(e) {

		}

		/*
		 * false is returned for backward compatibility with third party commenting systems
		 * hooking into this function.
		 */
		return false;
	}

	/**
	 * Add placeholder element.
	 *
	 * Places a place holder element above the #respond element for
	 * the form to be returned to if needs be.
	 *
	 * @since 2.7.0
	 *
	 * @param {HTMLelement} respondElement the #respond element holding comment form.
	 */
	function addPlaceHolder( respondElement ) {
		var temporaryFormId  = config.temporaryFormId;
		var temporaryElement = getElementById( temporaryFormId );
		var replyElement = getElementById( config.commentReplyTitleId );
		var initialHeadingText = replyElement ? replyElement.firstChild.textContent : '';

		if ( temporaryElement ) {
			// The element already exists, no need to recreate.
			return;
		}

		temporaryElement = document.createElement( 'div' );
		temporaryElement.id = temporaryFormId;
		temporaryElement.style.display = 'none';
		temporaryElement.textContent = initialHeadingText;
		respondElement.parentNode.insertBefore( temporaryElement, respondElement );
	}

	return {
		init: init,
		moveForm: moveForm
	};
})( window );


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
/*!*******************************************!*\
  !*** ./src/entries/entry-comment-form.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_components_comment_form_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/_components/_comment_form.scss */ "./src/scss/_components/_comment_form.scss");
/* harmony import */ var _js_components_comment_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/_components/_comment_form.js */ "./src/js/_components/_comment_form.js");
// Style


// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7VUMzYkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNnRDs7QUFFaEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvc2Nzcy9fY29tcG9uZW50cy9fY29tbWVudF9mb3JtLnNjc3M/OGUyNSIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2NvbXBvbmVudHMvX2NvbW1lbnRfZm9ybS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi4vLi4vLi4vd3AtaW5jbHVkZXMvanMvY29tbWVudC1yZXBseS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvZW50cnktY29tbWVudC1mb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vLi4vLi4vLi4vLi4vLi4vd3AtaW5jbHVkZXMvanMvY29tbWVudC1yZXBseS5qcyc7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgTWVzc2lhID0ge1xuXHRcdFx0c2VsZWN0UmF0aW5nIDogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdE1lc3NpYS5kb1JhdGluZyggJCh0aGlzKSwgZS5wYWdlWCApO1xuXHRcdFx0fSxcblx0XHRcdHNldFJhdGluZyA6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgbnVtYmVyID0gTWVzc2lhLmRvUmF0aW5nKCAkKHRoaXMpLCBlLnBhZ2VYICk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2ZpeGVkJykubmV4dCgnLnJhdGluZ19iYWxsJykuZmluZCgnLnBvaW50cycpLmNzcygnY29sb3InLCAnI2Q3MjAyMCcpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJyNjb21tZW50Zm9ybScpLmZpbmQoJy5mb3JtLXN1Ym1pdCBpbnB1dCNjb21tZW50X3JhdGluZycpLnZhbChudW1iZXIpO1xuXHRcdFx0fSxcblx0XHRcdHJlc2V0UmF0aW5nIDogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGlmKGUudHlwZSA9PSAnbW91c2VlbnRlcicpe1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJykubmV4dCgnLnJhdGluZ19iYWxsJykuZmluZCgnLnBvaW50cycpLmNzcygnY29sb3InLCAnJyk7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcjY29tbWVudGZvcm0nKS5maW5kKCcuZm9ybS1zdWJtaXQgaW5wdXQjY29tbWVudF9yYXRpbmcnKS52YWwobnVsbCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihlLnR5cGUgPT0gJ21vdXNlbGVhdmUnKXtcblx0XHRcdFx0XHRpZiggISQodGhpcykuaGFzQ2xhc3MoJ2ZpeGVkJykgKXtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnLmJnLWFjdGl2ZScpLmNzcygnd2lkdGgnLCAnMCUnKTtcblx0XHRcdFx0XHRcdCQodGhpcykucGFyZW50cygnLnJhdGluZycpLmZpbmQoJy5wb2ludHMnKS50ZXh0KCcwLjAwJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bW92ZUZvcm0gOiBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgcmVzcG9uZCA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBjb21tZW50X3BhcmVudCA9IHJlc3BvbmQuZmluZCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXSNjb21tZW50X3BhcmVudCcpLnZhbCgpO1xuXG5cdFx0XHRcdGlmKGNvbW1lbnRfcGFyZW50ID09PSAnMCcpe1xuXHRcdFx0XHRcdHJlc3BvbmQuZmluZCgnLmV2YWwnKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRyZXNwb25kLmZpbmQoJy5ldmFsJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRvUmF0aW5nIDogZnVuY3Rpb24odGFyZ2V0LCBwYWdlWCl7XG5cdFx0XHRcdFxuXHRcdFx0XHR2YXIgbGFnID0gLTI7IC8vINC/0L7Qu9C+0LbQuNGC0LXQu9GM0L3Ri9C5IC0g0L7RgtGB0YLQsNCy0LDQvdC40LUsINC+0YLRgNC40YbQsNGC0LXQu9GM0L3Ri9C5IC0g0L7Qv9C10YDQtdC20LXQvdC40LVcblx0XHRcdFx0dmFyIHN0ZXAgPSAxMDsgLy8gMTAgLSDQv9C+INC/0L7QuyDQsdCw0LvQu9CwLCAyMCAtINC/0L4g0L7QtNC90L7QvNGDXG5cdFx0XHRcdHZhciByZWxfcG9zaXRpb24gPSBwYWdlWCAtIHRhcmdldC5wYXJlbnQoKS5vZmZzZXQoKS5sZWZ0O1xuXG5cdFx0XHRcdC8vINCX0LLQtdC30LTQsCDQvtC60YDQsNGB0LjRgtGB0Y8g0L/QvtGB0LvQtSDQv9GA0L7RhdC+0LbQtNC10L3QuNGPINC10LUg0LrRg9GA0YHQvtGA0L7QvFxuXHRcdFx0XHQvLyB2YXIgcmF0aW5nX3BlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKCAoICggcmVsX3Bvc2l0aW9uICsgbGFnICkgLyB0YXJnZXQud2lkdGgoKSAqIDEwMCkgLyBzdGVwKSAqIHN0ZXA7XG5cblx0XHRcdFx0Ly8g0JfQstC10LfQtNCwINC+0LrRgNCw0YHQuNGC0YHRjyDQsiDQvNC+0LzQtdC90YIg0LLRhdC+0LbQtNC10L3QuNGPINCyINC90LXQtSDQutGD0YDRgdC+0YDQsFxuXHRcdFx0XHR2YXIgcmF0aW5nX3BlcmNlbnRhZ2UgPSBNYXRoLmNlaWwoICggKCByZWxfcG9zaXRpb24gKyBsYWcgKSAvIHRhcmdldC53aWR0aCgpICogMTAwKSAvIHN0ZXApICogc3RlcDtcblxuXHRcdFx0XHR2YXIgbnVtYmVyID0gcGFyc2VGbG9hdChyYXRpbmdfcGVyY2VudGFnZSAvIDIwKS50b0ZpeGVkKDIpO1xuXG5cdFx0XHRcdHRhcmdldC5maW5kKCcuYmctYWN0aXZlJykuY3NzKCd3aWR0aCcsIHJhdGluZ19wZXJjZW50YWdlICsgJyUnKTtcblxuXHRcdFx0XHR2YXIgcG9pbnRzID0gdGFyZ2V0LnBhcmVudHMoJy5yYXRpbmcnKS5maW5kKCcucG9pbnRzJyk7XG5cdFx0XHRcdGlmKHBvaW50cy5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRwb2ludHMudGV4dChudW1iZXIpO1xuXHRcdFx0XHRyZXR1cm4gbnVtYmVyO1xuXHRcdFx0fSxcblx0XHR9O1xuXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZWVudGVyJywgJy5yYXRpbmcgLnN0YXJzLmVkaXRhYmxlJywgTWVzc2lhLnJlc2V0UmF0aW5nKTtcblx0XHQkKCdib2R5Jykub24oJ21vdXNlbGVhdmUnLCAnLnJhdGluZyAuc3RhcnMuZWRpdGFibGUnLCBNZXNzaWEucmVzZXRSYXRpbmcpO1xuXHRcdCQoJ2JvZHknKS5vbignbW91c2Vtb3ZlJywgJy5yYXRpbmcgLnN0YXJzLmVkaXRhYmxlOm5vdCguZml4ZWQpJywgTWVzc2lhLnNlbGVjdFJhdGluZyk7XG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcucmF0aW5nIC5zdGFycy5lZGl0YWJsZScsIE1lc3NpYS5zZXRSYXRpbmcpO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ0RPTU5vZGVJbnNlcnRlZCcsICcjcmVzcG9uZC5jb21tZW50LXJlc3BvbmQnLCBNZXNzaWEubW92ZUZvcm0pO1xuXHR9KTtcbn0pKGpRdWVyeSk7XG5cbi8vIHJlY2FwdGNoYVxuaWYoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50Zm9ybScpICE9IG51bGwgJiYgdHlwZW9mIGdyZWNhcHRjaGEgIT0gJ3VuZGVmaW5lZCcgKXtcblx0XG5cdGdyZWNhcHRjaGEucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdFxuXHRcdHZhciBhY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXB0Y2hhQWN0aW9uJyk7XG5cdFx0XG5cdFx0aWYoYWN0aW9uID09IG51bGwpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUobWVzc2lhVmFycy5nQ2FwdGNoYVYzLCB7IGFjdGlvbjogYWN0aW9uLnZhbHVlIH0pLnRoZW4oZnVuY3Rpb24gKHRva2VuKSB7XG5cdFx0XHR2YXIgcmVjYXB0Y2hhUmVzcG9uc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXB0Y2hhUmVzcG9uc2UnKTtcblx0XHRcdHJlY2FwdGNoYVJlc3BvbnNlLnZhbHVlID0gdG9rZW47XG5cdFx0fSk7XG5cdH0pO1xufSIsIi8qKlxuICogSGFuZGxlcyB0aGUgYWRkaXRpb24gb2YgdGhlIGNvbW1lbnQgZm9ybS5cbiAqXG4gKiBAc2luY2UgMi43LjBcbiAqIEBvdXRwdXQgd3AtaW5jbHVkZXMvanMvY29tbWVudC1yZXBseS5qc1xuICpcbiAqIEBuYW1lc3BhY2UgYWRkQ29tbWVudFxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbndpbmRvdy5hZGRDb21tZW50ID0gKCBmdW5jdGlvbiggd2luZG93ICkge1xuXHQvLyBBdm9pZCBzY29wZSBsb29rdXBzIG9uIGNvbW1vbmx5IHVzZWQgdmFyaWFibGVzLlxuXHR2YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cblx0Ly8gU2V0dGluZ3MuXG5cdHZhciBjb25maWcgPSB7XG5cdFx0Y29tbWVudFJlcGx5Q2xhc3MgICA6ICdjb21tZW50LXJlcGx5LWxpbmsnLFxuXHRcdGNvbW1lbnRSZXBseVRpdGxlSWQgOiAncmVwbHktdGl0bGUnLFxuXHRcdGNhbmNlbFJlcGx5SWQgICAgICAgOiAnY2FuY2VsLWNvbW1lbnQtcmVwbHktbGluaycsXG5cdFx0Y29tbWVudEZvcm1JZCAgICAgICA6ICdjb21tZW50Zm9ybScsXG5cdFx0dGVtcG9yYXJ5Rm9ybUlkICAgICA6ICd3cC10ZW1wLWZvcm0tZGl2Jyxcblx0XHRwYXJlbnRJZEZpZWxkSWQgICAgIDogJ2NvbW1lbnRfcGFyZW50Jyxcblx0XHRwb3N0SWRGaWVsZElkICAgICAgIDogJ2NvbW1lbnRfcG9zdF9JRCdcblx0fTtcblxuXHQvLyBDcm9zcyBicm93c2VyIE11dGF0aW9uT2JzZXJ2ZXIuXG5cdHZhciBNdXRhdGlvbk9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYktpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXI7XG5cblx0Ly8gQ2hlY2sgYnJvd3NlciBjdXRzIHRoZSBtdXN0YXJkLlxuXHR2YXIgY3V0c1RoZU11c3RhcmQgPSAncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQgJiYgJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdztcblxuXHQvKlxuXHQgKiBDaGVjayBicm93c2VyIHN1cHBvcnRzIGRhdGFzZXQuXG5cdCAqICEhIHNldHMgdGhlIHZhcmlhYmxlIHRvIHRydWUgaWYgdGhlIHByb3BlcnR5IGV4aXN0cy5cblx0ICovXG5cdHZhciBzdXBwb3J0c0RhdGFzZXQgPSAhISBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldDtcblxuXHQvLyBGb3IgaG9sZGluZyB0aGUgY2FuY2VsIGVsZW1lbnQuXG5cdHZhciBjYW5jZWxFbGVtZW50O1xuXG5cdC8vIEZvciBob2xkaW5nIHRoZSBjb21tZW50IGZvcm0gZWxlbWVudC5cblx0dmFyIGNvbW1lbnRGb3JtRWxlbWVudDtcblxuXHQvLyBUaGUgcmVzcG9uZCBlbGVtZW50LlxuXHR2YXIgcmVzcG9uZEVsZW1lbnQ7XG5cblx0Ly8gVGhlIG11dGF0aW9uIG9ic2VydmVyLlxuXHR2YXIgb2JzZXJ2ZXI7XG5cblx0aWYgKCBjdXRzVGhlTXVzdGFyZCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycgKSB7XG5cdFx0cmVhZHkoKTtcblx0fSBlbHNlIGlmICggY3V0c1RoZU11c3RhcmQgKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgcmVhZHksIGZhbHNlICk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB1cCBvYmplY3QgdmFyaWFibGVzIGFmdGVyIHRoZSBET00gaXMgcmVhZHkuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMVxuXHQgKi9cblx0ZnVuY3Rpb24gcmVhZHkoKSB7XG5cdFx0Ly8gSW5pdGlhbGlzZSB0aGUgZXZlbnRzLlxuXHRcdGluaXQoKTtcblxuXHRcdC8vIFNldCB1cCBhIE11dGF0aW9uT2JzZXJ2ZXIgdG8gY2hlY2sgZm9yIGNvbW1lbnRzIGxvYWRlZCBsYXRlLlxuXHRcdG9ic2VydmVDaGFuZ2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGV2ZW50cyB0byBsaW5rcyBjbGFzc2VkIC5jb21tZW50LXJlcGx5LWxpbmsuXG5cdCAqXG5cdCAqIFNlYXJjaGVzIHRoZSBjb250ZXh0IGZvciByZXBseSBsaW5rcyBhbmQgYWRkcyB0aGUgSmF2YVNjcmlwdCBldmVudHNcblx0ICogcmVxdWlyZWQgdG8gbW92ZSB0aGUgY29tbWVudCBmb3JtLiBUbyBhbGxvdyBmb3IgbGF6eSBsb2FkaW5nIG9mXG5cdCAqIGNvbW1lbnRzIHRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgYXMgd2luZG93LmNvbW1lbnRSZXBseS5pbml0KCkuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKlxuXHQgKiBAbWVtYmVyT2YgYWRkQ29tbWVudFxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZXh0IFRoZSBwYXJlbnQgRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGZvciBsaW5rcy5cblx0ICovXG5cdGZ1bmN0aW9uIGluaXQoIGNvbnRleHQgKSB7XG5cdFx0aWYgKCAhIGN1dHNUaGVNdXN0YXJkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEdldCByZXF1aXJlZCBlbGVtZW50cy5cblx0XHRjYW5jZWxFbGVtZW50ID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5jYW5jZWxSZXBseUlkICk7XG5cdFx0Y29tbWVudEZvcm1FbGVtZW50ID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5jb21tZW50Rm9ybUlkICk7XG5cblx0XHQvLyBObyBjYW5jZWwgZWxlbWVudCwgbm8gcmVwbGllcy5cblx0XHRpZiAoICEgY2FuY2VsRWxlbWVudCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjYW5jZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgY2FuY2VsRXZlbnQgKTtcblx0XHRjYW5jZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICAgICAgY2FuY2VsRXZlbnQgKTtcblxuXHRcdC8vIFN1Ym1pdCB0aGUgY29tbWVudCBmb3JtIHdoZW4gdGhlIHVzZXIgdHlwZXMgW0N0cmxdIG9yIFtDbWRdICsgW0VudGVyXS5cblx0XHR2YXIgc3VibWl0Rm9ybUhhbmRsZXIgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdGlmICggKCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5ICkgJiYgZS5rZXlDb2RlID09PSAxMyApIHtcblx0XHRcdFx0Y29tbWVudEZvcm1FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgc3VibWl0Rm9ybUhhbmRsZXIgKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQvLyBUaGUgc3VibWl0IGJ1dHRvbiBJRCBpcyAnc3VibWl0JyBzbyB3ZSBjYW4ndCBjYWxsIGNvbW1lbnRGb3JtRWxlbWVudC5zdWJtaXQoKS4gQ2xpY2sgaXQgaW5zdGVhZC5cblx0XHRcdFx0Y29tbWVudEZvcm1FbGVtZW50LnN1Ym1pdC5jbGljaygpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmICggY29tbWVudEZvcm1FbGVtZW50ICkge1xuXHRcdFx0Y29tbWVudEZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgc3VibWl0Rm9ybUhhbmRsZXIgKTtcblx0XHR9XG5cblx0XHR2YXIgbGlua3MgPSByZXBseUxpbmtzKCBjb250ZXh0ICk7XG5cdFx0dmFyIGVsZW1lbnQ7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBsaW5rcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRlbGVtZW50ID0gbGlua3NbaV07XG5cblx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBjbGlja0V2ZW50ICk7XG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICAgICAgY2xpY2tFdmVudCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYWxsIGxpbmtzIGNsYXNzZWQgLmNvbW1lbnQtcmVwbHktbGluay5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRleHQgVGhlIHBhcmVudCBET00gZWxlbWVudCB0byBzZWFyY2ggZm9yIGxpbmtzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdHxBcnJheX1cblx0ICovXG5cdGZ1bmN0aW9uIHJlcGx5TGlua3MoIGNvbnRleHQgKSB7XG5cdFx0dmFyIHNlbGVjdG9yQ2xhc3MgPSBjb25maWcuY29tbWVudFJlcGx5Q2xhc3M7XG5cdFx0dmFyIGFsbFJlcGx5TGlua3M7XG5cblx0XHQvLyBjaGlsZE5vZGVzIGlzIGEgaGFuZHkgY2hlY2sgdG8gZW5zdXJlIHRoZSBjb250ZXh0IGlzIGEgSFRNTEVsZW1lbnQuXG5cdFx0aWYgKCAhIGNvbnRleHQgfHwgISBjb250ZXh0LmNoaWxkTm9kZXMgKSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXHRcdFx0Ly8gRmFzdGVzdC5cblx0XHRcdGFsbFJlcGx5TGlua3MgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIHNlbGVjdG9yQ2xhc3MgKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBGYXN0LlxuXHRcdFx0YWxsUmVwbHlMaW5rcyA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggJy4nICsgc2VsZWN0b3JDbGFzcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiBhbGxSZXBseUxpbmtzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbmNlbCBldmVudCBoYW5kbGVyLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4xLjBcblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGNhbGxpbmcgZXZlbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiBjYW5jZWxFdmVudCggZXZlbnQgKSB7XG5cdFx0dmFyIGNhbmNlbExpbmsgPSB0aGlzO1xuXHRcdHZhciB0ZW1wb3JhcnlGb3JtSWQgID0gY29uZmlnLnRlbXBvcmFyeUZvcm1JZDtcblx0XHR2YXIgdGVtcG9yYXJ5RWxlbWVudCA9IGdldEVsZW1lbnRCeUlkKCB0ZW1wb3JhcnlGb3JtSWQgKTtcblxuXHRcdGlmICggISB0ZW1wb3JhcnlFbGVtZW50IHx8ICEgcmVzcG9uZEVsZW1lbnQgKSB7XG5cdFx0XHQvLyBDb25kaXRpb25zIGZvciBjYW5jZWwgbGluayBmYWlsLlxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGdldEVsZW1lbnRCeUlkKCBjb25maWcucGFyZW50SWRGaWVsZElkICkudmFsdWUgPSAnMCc7XG5cblx0XHQvLyBNb3ZlIHRoZSByZXNwb25kIGZvcm0gYmFjayBpbiBwbGFjZSBvZiB0aGUgdGVtcG9yYXJ5IGVsZW1lbnQuXG5cdFx0dmFyIGhlYWRpbmdUZXh0ID0gdGVtcG9yYXJ5RWxlbWVudC50ZXh0Q29udGVudDtcblx0XHR0ZW1wb3JhcnlFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCByZXNwb25kRWxlbWVudCwgdGVtcG9yYXJ5RWxlbWVudCApO1xuXHRcdGNhbmNlbExpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdHZhciByZXBseUhlYWRpbmdFbGVtZW50ICA9IGdldEVsZW1lbnRCeUlkKCBjb25maWcuY29tbWVudFJlcGx5VGl0bGVJZCApO1xuXHRcdHZhciByZXBseUhlYWRpbmdUZXh0Tm9kZSA9IHJlcGx5SGVhZGluZ0VsZW1lbnQgJiYgcmVwbHlIZWFkaW5nRWxlbWVudC5maXJzdENoaWxkO1xuXHRcdHZhciByZXBseUxpbmtUb1BhcmVudCAgICA9IHJlcGx5SGVhZGluZ1RleHROb2RlICYmIHJlcGx5SGVhZGluZ1RleHROb2RlLm5leHRTaWJsaW5nO1xuXG5cdFx0aWYgKCByZXBseUhlYWRpbmdUZXh0Tm9kZSAmJiByZXBseUhlYWRpbmdUZXh0Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgJiYgaGVhZGluZ1RleHQgKSB7XG5cdFx0XHRpZiAoIHJlcGx5TGlua1RvUGFyZW50ICYmICdBJyA9PT0gcmVwbHlMaW5rVG9QYXJlbnQubm9kZU5hbWUgJiYgcmVwbHlMaW5rVG9QYXJlbnQuaWQgIT09IGNvbmZpZy5jYW5jZWxSZXBseUlkICkge1xuXHRcdFx0XHRyZXBseUxpbmtUb1BhcmVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdHJlcGx5SGVhZGluZ1RleHROb2RlLnRleHRDb250ZW50ID0gaGVhZGluZ1RleHQ7XG5cdFx0fVxuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbGljayBldmVudCBoYW5kbGVyLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4xLjBcblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGNhbGxpbmcgZXZlbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiBjbGlja0V2ZW50KCBldmVudCApIHtcblx0XHR2YXIgcmVwbHlOb2RlID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5jb21tZW50UmVwbHlUaXRsZUlkICk7XG5cdFx0dmFyIGRlZmF1bHRSZXBseUhlYWRpbmcgPSByZXBseU5vZGUgJiYgcmVwbHlOb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG5cdFx0dmFyIHJlcGx5TGluayA9IHRoaXMsXG5cdFx0XHRjb21tSWQgICAgPSBnZXREYXRhQXR0cmlidXRlKCByZXBseUxpbmssICdiZWxvd2VsZW1lbnQnICksXG5cdFx0XHRwYXJlbnRJZCAgPSBnZXREYXRhQXR0cmlidXRlKCByZXBseUxpbmssICdjb21tZW50aWQnICksXG5cdFx0XHRyZXNwb25kSWQgPSBnZXREYXRhQXR0cmlidXRlKCByZXBseUxpbmssICdyZXNwb25kZWxlbWVudCcgKSxcblx0XHRcdHBvc3RJZCAgICA9IGdldERhdGFBdHRyaWJ1dGUoIHJlcGx5TGluaywgJ3Bvc3RpZCcgKSxcblx0XHRcdHJlcGx5VG8gICA9IGdldERhdGFBdHRyaWJ1dGUoIHJlcGx5TGluaywgJ3JlcGx5dG8nICkgfHwgZGVmYXVsdFJlcGx5SGVhZGluZyxcblx0XHRcdGZvbGxvdztcblxuXHRcdGlmICggISBjb21tSWQgfHwgISBwYXJlbnRJZCB8fCAhIHJlc3BvbmRJZCB8fCAhIHBvc3RJZCApIHtcblx0XHRcdC8qXG5cdFx0XHQgKiBUaGVtZSBvciBwbHVnaW4gZGVmaW5lcyBvd24gbGluayB2aWEgY3VzdG9tIGB3cF9saXN0X2NvbW1lbnRzKClgIGNhbGxiYWNrXG5cdFx0XHQgKiBhbmQgY2FsbHMgYG1vdmVGb3JtKClgIGVpdGhlciBkaXJlY3RseSBvciB2aWEgYSBjdXN0b20gZXZlbnQgaG9vay5cblx0XHRcdCAqL1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogVGhpcmQgcGFydHkgY29tbWVudHMgc3lzdGVtcyBjYW4gaG9vayBpbnRvIHRoaXMgZnVuY3Rpb24gdmlhIHRoZSBnbG9iYWwgc2NvcGUsXG5cdFx0ICogdGhlcmVmb3JlIHRoZSBjbGljayBldmVudCBuZWVkcyB0byByZWZlcmVuY2UgdGhlIGdsb2JhbCBzY29wZS5cblx0XHQgKi9cblx0XHRmb2xsb3cgPSB3aW5kb3cuYWRkQ29tbWVudC5tb3ZlRm9ybSggY29tbUlkLCBwYXJlbnRJZCwgcmVzcG9uZElkLCBwb3N0SWQsIHJlcGx5VG8gKTtcblx0XHRpZiAoIGZhbHNlID09PSBmb2xsb3cgKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gY2hlY2sgZm9yIG5ld2x5IGluc2VydGVkIGNvbW1lbnRzLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4xLjBcblx0ICovXG5cdGZ1bmN0aW9uIG9ic2VydmVDaGFuZ2VzKCkge1xuXHRcdGlmICggISBNdXRhdGlvbk9ic2VydmVyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBvYnNlcnZlck9wdGlvbnMgPSB7XG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRzdWJ0cmVlOiB0cnVlXG5cdFx0fTtcblxuXHRcdG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoIGhhbmRsZUNoYW5nZXMgKTtcblx0XHRvYnNlcnZlci5vYnNlcnZlKCBkb2N1bWVudC5ib2R5LCBvYnNlcnZlck9wdGlvbnMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIERPTSBjaGFuZ2VzLCBjYWxsaW5nIGluaXQoKSBpZiBhbnkgbmV3IG5vZGVzIGFyZSBhZGRlZC5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG11dGF0aW9uUmVjb3JkcyBBcnJheSBvZiBNdXRhdGlvblJlY29yZCBvYmplY3RzLlxuXHQgKi9cblx0ZnVuY3Rpb24gaGFuZGxlQ2hhbmdlcyggbXV0YXRpb25SZWNvcmRzICkge1xuXHRcdHZhciBpID0gbXV0YXRpb25SZWNvcmRzLmxlbmd0aDtcblxuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0Ly8gQ2FsbCBpbml0KCkgb25jZSBpZiBhbnkgcmVjb3JkIGluIHRoaXMgc2V0IGFkZHMgbm9kZXMuXG5cdFx0XHRpZiAoIG11dGF0aW9uUmVjb3Jkc1sgaSBdLmFkZGVkTm9kZXMubGVuZ3RoICkge1xuXHRcdFx0XHRpbml0KCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQmFja3dhcmQgY29tcGF0aWJsZSBnZXR0ZXIgb2YgZGF0YS0qIGF0dHJpYnV0ZS5cblx0ICpcblx0ICogVXNlcyBlbGVtZW50LmRhdGFzZXQgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdXNlcyBnZXRBdHRyaWJ1dGUuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBFbGVtZW50IERPTSBlbGVtZW50IHdpdGggdGhlIGF0dHJpYnV0ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9ICAgICAgQXR0cmlidXRlIHRoZSBhdHRyaWJ1dGUgdG8gZ2V0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiBnZXREYXRhQXR0cmlidXRlKCBlbGVtZW50LCBhdHRyaWJ1dGUgKSB7XG5cdFx0aWYgKCBzdXBwb3J0c0RhdGFzZXQgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5kYXRhc2V0W2F0dHJpYnV0ZV07XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCAnZGF0YS0nICsgYXR0cmlidXRlICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBlbGVtZW50IGJ5IElELlxuXHQgKlxuXHQgKiBMb2NhbCBhbGlhcyBmb3IgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBUaGUgcmVxdWVzdGVkIGVsZW1lbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRFbGVtZW50QnlJZCggZWxlbWVudElkICkge1xuXHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggZWxlbWVudElkICk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIHJlcGx5IGZvcm0gZnJvbSBpdHMgY3VycmVudCBwb3NpdGlvbiB0byB0aGUgcmVwbHkgbG9jYXRpb24uXG5cdCAqXG5cdCAqIEBzaW5jZSAyLjcuMFxuXHQgKlxuXHQgKiBAbWVtYmVyT2YgYWRkQ29tbWVudFxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYWRkQmVsb3dJZCBIVE1MIElEIG9mIGVsZW1lbnQgdGhlIGZvcm0gZm9sbG93cy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZCAgRGF0YWJhc2UgSUQgb2YgY29tbWVudCBiZWluZyByZXBsaWVkIHRvLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uZElkICBIVE1MIElEIG9mICdyZXNwb25kJyBlbGVtZW50LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcG9zdElkICAgICBEYXRhYmFzZSBJRCBvZiB0aGUgcG9zdC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHJlcGx5VG8gICAgRm9ybSBoZWFkaW5nIGNvbnRlbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiBtb3ZlRm9ybSggYWRkQmVsb3dJZCwgY29tbWVudElkLCByZXNwb25kSWQsIHBvc3RJZCwgcmVwbHlUbyApIHtcblx0XHQvLyBHZXQgZWxlbWVudHMgYmFzZWQgb24gdGhlaXIgSURzLlxuXHRcdHZhciBhZGRCZWxvd0VsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCggYWRkQmVsb3dJZCApO1xuXHRcdHJlc3BvbmRFbGVtZW50ICA9IGdldEVsZW1lbnRCeUlkKCByZXNwb25kSWQgKTtcblxuXHRcdC8vIEdldCB0aGUgaGlkZGVuIGZpZWxkcy5cblx0XHR2YXIgcGFyZW50SWRGaWVsZCAgID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5wYXJlbnRJZEZpZWxkSWQgKTtcblx0XHR2YXIgcG9zdElkRmllbGQgICAgID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5wb3N0SWRGaWVsZElkICk7XG5cdFx0dmFyIGVsZW1lbnQsIGNzc0hpZGRlbiwgc3R5bGU7XG5cblx0XHR2YXIgcmVwbHlIZWFkaW5nICAgICAgICAgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLmNvbW1lbnRSZXBseVRpdGxlSWQgKTtcblx0XHR2YXIgcmVwbHlIZWFkaW5nVGV4dE5vZGUgPSByZXBseUhlYWRpbmcgJiYgcmVwbHlIZWFkaW5nLmZpcnN0Q2hpbGQ7XG5cdFx0dmFyIHJlcGx5TGlua1RvUGFyZW50ICAgID0gcmVwbHlIZWFkaW5nVGV4dE5vZGUgJiYgcmVwbHlIZWFkaW5nVGV4dE5vZGUubmV4dFNpYmxpbmc7XG5cblx0XHRpZiAoICEgYWRkQmVsb3dFbGVtZW50IHx8ICEgcmVzcG9uZEVsZW1lbnQgfHwgISBwYXJlbnRJZEZpZWxkICkge1xuXHRcdFx0Ly8gTWlzc2luZyBrZXkgZWxlbWVudHMsIGZhaWwuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHJlcGx5VG8gKSB7XG5cdFx0XHRyZXBseVRvID0gcmVwbHlIZWFkaW5nVGV4dE5vZGUgJiYgcmVwbHlIZWFkaW5nVGV4dE5vZGUudGV4dENvbnRlbnQ7XG5cdFx0fVxuXG5cdFx0YWRkUGxhY2VIb2xkZXIoIHJlc3BvbmRFbGVtZW50ICk7XG5cblx0XHQvLyBTZXQgdGhlIHZhbHVlIG9mIHRoZSBwb3N0LlxuXHRcdGlmICggcG9zdElkICYmIHBvc3RJZEZpZWxkICkge1xuXHRcdFx0cG9zdElkRmllbGQudmFsdWUgPSBwb3N0SWQ7XG5cdFx0fVxuXG5cdFx0cGFyZW50SWRGaWVsZC52YWx1ZSA9IGNvbW1lbnRJZDtcblxuXHRcdGNhbmNlbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXHRcdGFkZEJlbG93RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggcmVzcG9uZEVsZW1lbnQsIGFkZEJlbG93RWxlbWVudC5uZXh0U2libGluZyApO1xuXG5cdFx0aWYgKCByZXBseUhlYWRpbmdUZXh0Tm9kZSAmJiByZXBseUhlYWRpbmdUZXh0Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgKSB7XG5cdFx0XHRpZiAoIHJlcGx5TGlua1RvUGFyZW50ICYmICdBJyA9PT0gcmVwbHlMaW5rVG9QYXJlbnQubm9kZU5hbWUgJiYgcmVwbHlMaW5rVG9QYXJlbnQuaWQgIT09IGNvbmZpZy5jYW5jZWxSZXBseUlkICkge1xuXHRcdFx0XHRyZXBseUxpbmtUb1BhcmVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXBseUhlYWRpbmdUZXh0Tm9kZS50ZXh0Q29udGVudCA9IHJlcGx5VG87XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBUaGlzIGlzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggdGhpcmQgcGFydHkgY29tbWVudGluZyBzeXN0ZW1zXG5cdFx0ICogaG9va2luZyBpbnRvIHRoZSBldmVudCB1c2luZyBvbGRlciB0ZWNobmlxdWVzLlxuXHRcdCAqL1xuXHRcdGNhbmNlbEVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBGb2N1cyBvbiB0aGUgZmlyc3QgZmllbGQgaW4gdGhlIGNvbW1lbnQgZm9ybS5cblx0XHR0cnkge1xuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29tbWVudEZvcm1FbGVtZW50LmVsZW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRlbGVtZW50ID0gY29tbWVudEZvcm1FbGVtZW50LmVsZW1lbnRzW2ldO1xuXHRcdFx0XHRjc3NIaWRkZW4gPSBmYWxzZTtcblxuXHRcdFx0XHQvLyBHZXQgZWxlbWVudHMgY29tcHV0ZWQgc3R5bGUuXG5cdFx0XHRcdGlmICggJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdyApIHtcblx0XHRcdFx0XHQvLyBNb2Rlcm4gYnJvd3NlcnMuXG5cdFx0XHRcdFx0c3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbWVudCApO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY3VycmVudFN0eWxlICkge1xuXHRcdFx0XHRcdC8vIElFIDguXG5cdFx0XHRcdFx0c3R5bGUgPSBlbGVtZW50LmN1cnJlbnRTdHlsZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEZvciBkaXNwbGF5IG5vbmUsIGRvIHRoZSBzYW1lIHRoaW5nIGpRdWVyeSBkb2VzLiBGb3IgdmlzaWJpbGl0eSxcblx0XHRcdFx0ICogY2hlY2sgdGhlIGVsZW1lbnQgY29tcHV0ZWQgc3R5bGUgc2luY2UgYnJvd3NlcnMgYXJlIGFscmVhZHkgZG9pbmdcblx0XHRcdFx0ICogdGhlIGpvYiBmb3IgdXMuIEluIGZhY3QsIHRoZSB2aXNpYmlsaXR5IGNvbXB1dGVkIHN0eWxlIGlzIHRoZSBhY3R1YWxcblx0XHRcdFx0ICogY29tcHV0ZWQgdmFsdWUgYW5kIGFscmVhZHkgdGFrZXMgaW50byBhY2NvdW50IHRoZSBlbGVtZW50IGFuY2VzdG9ycy5cblx0XHRcdFx0ICovXG5cdFx0XHRcdGlmICggKCBlbGVtZW50Lm9mZnNldFdpZHRoIDw9IDAgJiYgZWxlbWVudC5vZmZzZXRIZWlnaHQgPD0gMCApIHx8IHN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nICkge1xuXHRcdFx0XHRcdGNzc0hpZGRlbiA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTa2lwIGZvcm0gZWxlbWVudHMgdGhhdCBhcmUgaGlkZGVuIG9yIGRpc2FibGVkLlxuXHRcdFx0XHRpZiAoICdoaWRkZW4nID09PSBlbGVtZW50LnR5cGUgfHwgZWxlbWVudC5kaXNhYmxlZCB8fCBjc3NIaWRkZW4gKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRcdC8vIFN0b3AgYWZ0ZXIgdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50LlxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBmYWxzZSBpcyByZXR1cm5lZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIHRoaXJkIHBhcnR5IGNvbW1lbnRpbmcgc3lzdGVtc1xuXHRcdCAqIGhvb2tpbmcgaW50byB0aGlzIGZ1bmN0aW9uLlxuXHRcdCAqL1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgcGxhY2Vob2xkZXIgZWxlbWVudC5cblx0ICpcblx0ICogUGxhY2VzIGEgcGxhY2UgaG9sZGVyIGVsZW1lbnQgYWJvdmUgdGhlICNyZXNwb25kIGVsZW1lbnQgZm9yXG5cdCAqIHRoZSBmb3JtIHRvIGJlIHJldHVybmVkIHRvIGlmIG5lZWRzIGJlLlxuXHQgKlxuXHQgKiBAc2luY2UgMi43LjBcblx0ICpcblx0ICogQHBhcmFtIHtIVE1MZWxlbWVudH0gcmVzcG9uZEVsZW1lbnQgdGhlICNyZXNwb25kIGVsZW1lbnQgaG9sZGluZyBjb21tZW50IGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGRQbGFjZUhvbGRlciggcmVzcG9uZEVsZW1lbnQgKSB7XG5cdFx0dmFyIHRlbXBvcmFyeUZvcm1JZCAgPSBjb25maWcudGVtcG9yYXJ5Rm9ybUlkO1xuXHRcdHZhciB0ZW1wb3JhcnlFbGVtZW50ID0gZ2V0RWxlbWVudEJ5SWQoIHRlbXBvcmFyeUZvcm1JZCApO1xuXHRcdHZhciByZXBseUVsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLmNvbW1lbnRSZXBseVRpdGxlSWQgKTtcblx0XHR2YXIgaW5pdGlhbEhlYWRpbmdUZXh0ID0gcmVwbHlFbGVtZW50ID8gcmVwbHlFbGVtZW50LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgOiAnJztcblxuXHRcdGlmICggdGVtcG9yYXJ5RWxlbWVudCApIHtcblx0XHRcdC8vIFRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBubyBuZWVkIHRvIHJlY3JlYXRlLlxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRlbXBvcmFyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdHRlbXBvcmFyeUVsZW1lbnQuaWQgPSB0ZW1wb3JhcnlGb3JtSWQ7XG5cdFx0dGVtcG9yYXJ5RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdHRlbXBvcmFyeUVsZW1lbnQudGV4dENvbnRlbnQgPSBpbml0aWFsSGVhZGluZ1RleHQ7XG5cdFx0cmVzcG9uZEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIHRlbXBvcmFyeUVsZW1lbnQsIHJlc3BvbmRFbGVtZW50ICk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXQsXG5cdFx0bW92ZUZvcm06IG1vdmVGb3JtXG5cdH07XG59KSggd2luZG93ICk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU3R5bGVcbmltcG9ydCBcIi4uL3Njc3MvX2NvbXBvbmVudHMvX2NvbW1lbnRfZm9ybS5zY3NzXCI7XG5cbi8vIFNjcmlwdHNcbmltcG9ydCBcIi4uL2pzL19jb21wb25lbnRzL19jb21tZW50X2Zvcm0uanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
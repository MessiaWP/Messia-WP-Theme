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

/***/ "./src/js/_components/_comment-reply.js":
/*!**********************************************!*\
  !*** ./src/js/_components/_comment-reply.js ***!
  \**********************************************/
/***/ (function() {

/**
 * This is a full copy of original includes/js/comment-reply.js
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


/***/ }),

/***/ "./src/js/_components/_comment_form.js":
/*!*********************************************!*\
  !*** ./src/js/_components/_comment_form.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment_reply_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_comment-reply.js */ "./src/js/_components/_comment-reply.js");
/* harmony import */ var _comment_reply_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_comment_reply_js__WEBPACK_IMPORTED_MODULE_0__);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7OztVQ3RGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2dEOztBQUVoRCIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9zY3NzL19jb21wb25lbnRzL19jb21tZW50X2Zvcm0uc2Nzcz84ZTI1Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy9fY29tcG9uZW50cy9fY29tbWVudC1yZXBseS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvLi9zcmMvanMvX2NvbXBvbmVudHMvX2NvbW1lbnRfZm9ybS5qcyIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzc2lhLy4vc3JjL2VudHJpZXMvZW50cnktY29tbWVudC1mb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogVGhpcyBpcyBhIGZ1bGwgY29weSBvZiBvcmlnaW5hbCBpbmNsdWRlcy9qcy9jb21tZW50LXJlcGx5LmpzXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xud2luZG93LmFkZENvbW1lbnQgPSAoIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cdC8vIEF2b2lkIHNjb3BlIGxvb2t1cHMgb24gY29tbW9ubHkgdXNlZCB2YXJpYWJsZXMuXG5cdHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuXHQvLyBTZXR0aW5ncy5cblx0dmFyIGNvbmZpZyA9IHtcblx0XHRjb21tZW50UmVwbHlDbGFzcyAgIDogJ2NvbW1lbnQtcmVwbHktbGluaycsXG5cdFx0Y29tbWVudFJlcGx5VGl0bGVJZCA6ICdyZXBseS10aXRsZScsXG5cdFx0Y2FuY2VsUmVwbHlJZCAgICAgICA6ICdjYW5jZWwtY29tbWVudC1yZXBseS1saW5rJyxcblx0XHRjb21tZW50Rm9ybUlkICAgICAgIDogJ2NvbW1lbnRmb3JtJyxcblx0XHR0ZW1wb3JhcnlGb3JtSWQgICAgIDogJ3dwLXRlbXAtZm9ybS1kaXYnLFxuXHRcdHBhcmVudElkRmllbGRJZCAgICAgOiAnY29tbWVudF9wYXJlbnQnLFxuXHRcdHBvc3RJZEZpZWxkSWQgICAgICAgOiAnY29tbWVudF9wb3N0X0lEJ1xuXHR9O1xuXG5cdC8vIENyb3NzIGJyb3dzZXIgTXV0YXRpb25PYnNlcnZlci5cblx0dmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cuV2ViS2l0TXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cuTW96TXV0YXRpb25PYnNlcnZlcjtcblxuXHQvLyBDaGVjayBicm93c2VyIGN1dHMgdGhlIG11c3RhcmQuXG5cdHZhciBjdXRzVGhlTXVzdGFyZCA9ICdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCAmJiAnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93O1xuXG5cdC8qXG5cdCAqIENoZWNrIGJyb3dzZXIgc3VwcG9ydHMgZGF0YXNldC5cblx0ICogISEgc2V0cyB0aGUgdmFyaWFibGUgdG8gdHJ1ZSBpZiB0aGUgcHJvcGVydHkgZXhpc3RzLlxuXHQgKi9cblx0dmFyIHN1cHBvcnRzRGF0YXNldCA9ICEhIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0O1xuXG5cdC8vIEZvciBob2xkaW5nIHRoZSBjYW5jZWwgZWxlbWVudC5cblx0dmFyIGNhbmNlbEVsZW1lbnQ7XG5cblx0Ly8gRm9yIGhvbGRpbmcgdGhlIGNvbW1lbnQgZm9ybSBlbGVtZW50LlxuXHR2YXIgY29tbWVudEZvcm1FbGVtZW50O1xuXG5cdC8vIFRoZSByZXNwb25kIGVsZW1lbnQuXG5cdHZhciByZXNwb25kRWxlbWVudDtcblxuXHQvLyBUaGUgbXV0YXRpb24gb2JzZXJ2ZXIuXG5cdHZhciBvYnNlcnZlcjtcblxuXHRpZiAoIGN1dHNUaGVNdXN0YXJkICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJyApIHtcblx0XHRyZWFkeSgpO1xuXHR9IGVsc2UgaWYgKCBjdXRzVGhlTXVzdGFyZCApIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCByZWFkeSwgZmFsc2UgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHVwIG9iamVjdCB2YXJpYWJsZXMgYWZ0ZXIgdGhlIERPTSBpcyByZWFkeS5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4xXG5cdCAqL1xuXHRmdW5jdGlvbiByZWFkeSgpIHtcblx0XHQvLyBJbml0aWFsaXNlIHRoZSBldmVudHMuXG5cdFx0aW5pdCgpO1xuXG5cdFx0Ly8gU2V0IHVwIGEgTXV0YXRpb25PYnNlcnZlciB0byBjaGVjayBmb3IgY29tbWVudHMgbG9hZGVkIGxhdGUuXG5cdFx0b2JzZXJ2ZUNoYW5nZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgZXZlbnRzIHRvIGxpbmtzIGNsYXNzZWQgLmNvbW1lbnQtcmVwbHktbGluay5cblx0ICpcblx0ICogU2VhcmNoZXMgdGhlIGNvbnRleHQgZm9yIHJlcGx5IGxpbmtzIGFuZCBhZGRzIHRoZSBKYXZhU2NyaXB0IGV2ZW50c1xuXHQgKiByZXF1aXJlZCB0byBtb3ZlIHRoZSBjb21tZW50IGZvcm0uIFRvIGFsbG93IGZvciBsYXp5IGxvYWRpbmcgb2Zcblx0ICogY29tbWVudHMgdGhpcyBtZXRob2QgaXMgZXhwb3NlZCBhcyB3aW5kb3cuY29tbWVudFJlcGx5LmluaXQoKS5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqXG5cdCAqIEBtZW1iZXJPZiBhZGRDb21tZW50XG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRleHQgVGhlIHBhcmVudCBET00gZWxlbWVudCB0byBzZWFyY2ggZm9yIGxpbmtzLlxuXHQgKi9cblx0ZnVuY3Rpb24gaW5pdCggY29udGV4dCApIHtcblx0XHRpZiAoICEgY3V0c1RoZU11c3RhcmQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHJlcXVpcmVkIGVsZW1lbnRzLlxuXHRcdGNhbmNlbEVsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLmNhbmNlbFJlcGx5SWQgKTtcblx0XHRjb21tZW50Rm9ybUVsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLmNvbW1lbnRGb3JtSWQgKTtcblxuXHRcdC8vIE5vIGNhbmNlbCBlbGVtZW50LCBubyByZXBsaWVzLlxuXHRcdGlmICggISBjYW5jZWxFbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNhbmNlbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBjYW5jZWxFdmVudCApO1xuXHRcdGNhbmNlbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgICAgICBjYW5jZWxFdmVudCApO1xuXG5cdFx0Ly8gU3VibWl0IHRoZSBjb21tZW50IGZvcm0gd2hlbiB0aGUgdXNlciB0eXBlcyBbQ3RybF0gb3IgW0NtZF0gKyBbRW50ZXJdLlxuXHRcdHZhciBzdWJtaXRGb3JtSGFuZGxlciA9IGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0aWYgKCAoIGUubWV0YUtleSB8fCBlLmN0cmxLZXkgKSAmJiBlLmtleUNvZGUgPT09IDEzICkge1xuXHRcdFx0XHRjb21tZW50Rm9ybUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBzdWJtaXRGb3JtSGFuZGxlciApO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdC8vIFRoZSBzdWJtaXQgYnV0dG9uIElEIGlzICdzdWJtaXQnIHNvIHdlIGNhbid0IGNhbGwgY29tbWVudEZvcm1FbGVtZW50LnN1Ym1pdCgpLiBDbGljayBpdCBpbnN0ZWFkLlxuXHRcdFx0XHRjb21tZW50Rm9ybUVsZW1lbnQuc3VibWl0LmNsaWNrKCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aWYgKCBjb21tZW50Rm9ybUVsZW1lbnQgKSB7XG5cdFx0XHRjb21tZW50Rm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBzdWJtaXRGb3JtSGFuZGxlciApO1xuXHRcdH1cblxuXHRcdHZhciBsaW5rcyA9IHJlcGx5TGlua3MoIGNvbnRleHQgKTtcblx0XHR2YXIgZWxlbWVudDtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgbCA9IGxpbmtzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGVsZW1lbnQgPSBsaW5rc1tpXTtcblxuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIGNsaWNrRXZlbnQgKTtcblx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgICAgICBjbGlja0V2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhbGwgbGlua3MgY2xhc3NlZCAuY29tbWVudC1yZXBseS1saW5rLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4xLjBcblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGV4dCBUaGUgcGFyZW50IERPTSBlbGVtZW50IHRvIHNlYXJjaCBmb3IgbGlua3MuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0hUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fEFycmF5fVxuXHQgKi9cblx0ZnVuY3Rpb24gcmVwbHlMaW5rcyggY29udGV4dCApIHtcblx0XHR2YXIgc2VsZWN0b3JDbGFzcyA9IGNvbmZpZy5jb21tZW50UmVwbHlDbGFzcztcblx0XHR2YXIgYWxsUmVwbHlMaW5rcztcblxuXHRcdC8vIGNoaWxkTm9kZXMgaXMgYSBoYW5keSBjaGVjayB0byBlbnN1cmUgdGhlIGNvbnRleHQgaXMgYSBIVE1MRWxlbWVudC5cblx0XHRpZiAoICEgY29udGV4dCB8fCAhIGNvbnRleHQuY2hpbGROb2RlcyApIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudDtcblx0XHR9XG5cblx0XHRpZiAoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cdFx0XHQvLyBGYXN0ZXN0LlxuXHRcdFx0YWxsUmVwbHlMaW5rcyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggc2VsZWN0b3JDbGFzcyApO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdC8vIEZhc3QuXG5cdFx0XHRhbGxSZXBseUxpbmtzID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCAnLicgKyBzZWxlY3RvckNsYXNzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFsbFJlcGx5TGlua3M7XG5cdH1cblxuXHQvKipcblx0ICogQ2FuY2VsIGV2ZW50IGhhbmRsZXIuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgY2FsbGluZyBldmVudC5cblx0ICovXG5cdGZ1bmN0aW9uIGNhbmNlbEV2ZW50KCBldmVudCApIHtcblx0XHR2YXIgY2FuY2VsTGluayA9IHRoaXM7XG5cdFx0dmFyIHRlbXBvcmFyeUZvcm1JZCAgPSBjb25maWcudGVtcG9yYXJ5Rm9ybUlkO1xuXHRcdHZhciB0ZW1wb3JhcnlFbGVtZW50ID0gZ2V0RWxlbWVudEJ5SWQoIHRlbXBvcmFyeUZvcm1JZCApO1xuXG5cdFx0aWYgKCAhIHRlbXBvcmFyeUVsZW1lbnQgfHwgISByZXNwb25kRWxlbWVudCApIHtcblx0XHRcdC8vIENvbmRpdGlvbnMgZm9yIGNhbmNlbCBsaW5rIGZhaWwuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Z2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5wYXJlbnRJZEZpZWxkSWQgKS52YWx1ZSA9ICcwJztcblxuXHRcdC8vIE1vdmUgdGhlIHJlc3BvbmQgZm9ybSBiYWNrIGluIHBsYWNlIG9mIHRoZSB0ZW1wb3JhcnkgZWxlbWVudC5cblx0XHR2YXIgaGVhZGluZ1RleHQgPSB0ZW1wb3JhcnlFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdHRlbXBvcmFyeUVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoIHJlc3BvbmRFbGVtZW50LCB0ZW1wb3JhcnlFbGVtZW50ICk7XG5cdFx0Y2FuY2VsTGluay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdFx0dmFyIHJlcGx5SGVhZGluZ0VsZW1lbnQgID0gZ2V0RWxlbWVudEJ5SWQoIGNvbmZpZy5jb21tZW50UmVwbHlUaXRsZUlkICk7XG5cdFx0dmFyIHJlcGx5SGVhZGluZ1RleHROb2RlID0gcmVwbHlIZWFkaW5nRWxlbWVudCAmJiByZXBseUhlYWRpbmdFbGVtZW50LmZpcnN0Q2hpbGQ7XG5cdFx0dmFyIHJlcGx5TGlua1RvUGFyZW50ICAgID0gcmVwbHlIZWFkaW5nVGV4dE5vZGUgJiYgcmVwbHlIZWFkaW5nVGV4dE5vZGUubmV4dFNpYmxpbmc7XG5cblx0XHRpZiAoIHJlcGx5SGVhZGluZ1RleHROb2RlICYmIHJlcGx5SGVhZGluZ1RleHROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBoZWFkaW5nVGV4dCApIHtcblx0XHRcdGlmICggcmVwbHlMaW5rVG9QYXJlbnQgJiYgJ0EnID09PSByZXBseUxpbmtUb1BhcmVudC5ub2RlTmFtZSAmJiByZXBseUxpbmtUb1BhcmVudC5pZCAhPT0gY29uZmlnLmNhbmNlbFJlcGx5SWQgKSB7XG5cdFx0XHRcdHJlcGx5TGlua1RvUGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0cmVwbHlIZWFkaW5nVGV4dE5vZGUudGV4dENvbnRlbnQgPSBoZWFkaW5nVGV4dDtcblx0XHR9XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsaWNrIGV2ZW50IGhhbmRsZXIuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgY2FsbGluZyBldmVudC5cblx0ICovXG5cdGZ1bmN0aW9uIGNsaWNrRXZlbnQoIGV2ZW50ICkge1xuXHRcdHZhciByZXBseU5vZGUgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLmNvbW1lbnRSZXBseVRpdGxlSWQgKTtcblx0XHR2YXIgZGVmYXVsdFJlcGx5SGVhZGluZyA9IHJlcGx5Tm9kZSAmJiByZXBseU5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcblx0XHR2YXIgcmVwbHlMaW5rID0gdGhpcyxcblx0XHRcdGNvbW1JZCAgICA9IGdldERhdGFBdHRyaWJ1dGUoIHJlcGx5TGluaywgJ2JlbG93ZWxlbWVudCcgKSxcblx0XHRcdHBhcmVudElkICA9IGdldERhdGFBdHRyaWJ1dGUoIHJlcGx5TGluaywgJ2NvbW1lbnRpZCcgKSxcblx0XHRcdHJlc3BvbmRJZCA9IGdldERhdGFBdHRyaWJ1dGUoIHJlcGx5TGluaywgJ3Jlc3BvbmRlbGVtZW50JyApLFxuXHRcdFx0cG9zdElkICAgID0gZ2V0RGF0YUF0dHJpYnV0ZSggcmVwbHlMaW5rLCAncG9zdGlkJyApLFxuXHRcdFx0cmVwbHlUbyAgID0gZ2V0RGF0YUF0dHJpYnV0ZSggcmVwbHlMaW5rLCAncmVwbHl0bycgKSB8fCBkZWZhdWx0UmVwbHlIZWFkaW5nLFxuXHRcdFx0Zm9sbG93O1xuXG5cdFx0aWYgKCAhIGNvbW1JZCB8fCAhIHBhcmVudElkIHx8ICEgcmVzcG9uZElkIHx8ICEgcG9zdElkICkge1xuXHRcdFx0Lypcblx0XHRcdCAqIFRoZW1lIG9yIHBsdWdpbiBkZWZpbmVzIG93biBsaW5rIHZpYSBjdXN0b20gYHdwX2xpc3RfY29tbWVudHMoKWAgY2FsbGJhY2tcblx0XHRcdCAqIGFuZCBjYWxscyBgbW92ZUZvcm0oKWAgZWl0aGVyIGRpcmVjdGx5IG9yIHZpYSBhIGN1c3RvbSBldmVudCBob29rLlxuXHRcdFx0ICovXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBUaGlyZCBwYXJ0eSBjb21tZW50cyBzeXN0ZW1zIGNhbiBob29rIGludG8gdGhpcyBmdW5jdGlvbiB2aWEgdGhlIGdsb2JhbCBzY29wZSxcblx0XHQgKiB0aGVyZWZvcmUgdGhlIGNsaWNrIGV2ZW50IG5lZWRzIHRvIHJlZmVyZW5jZSB0aGUgZ2xvYmFsIHNjb3BlLlxuXHRcdCAqL1xuXHRcdGZvbGxvdyA9IHdpbmRvdy5hZGRDb21tZW50Lm1vdmVGb3JtKCBjb21tSWQsIHBhcmVudElkLCByZXNwb25kSWQsIHBvc3RJZCwgcmVwbHlUbyApO1xuXHRcdGlmICggZmFsc2UgPT09IGZvbGxvdyApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBjaGVjayBmb3IgbmV3bHkgaW5zZXJ0ZWQgY29tbWVudHMuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKi9cblx0ZnVuY3Rpb24gb2JzZXJ2ZUNoYW5nZXMoKSB7XG5cdFx0aWYgKCAhIE11dGF0aW9uT2JzZXJ2ZXIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9ic2VydmVyT3B0aW9ucyA9IHtcblx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdHN1YnRyZWU6IHRydWVcblx0XHR9O1xuXG5cdFx0b2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlciggaGFuZGxlQ2hhbmdlcyApO1xuXHRcdG9ic2VydmVyLm9ic2VydmUoIGRvY3VtZW50LmJvZHksIG9ic2VydmVyT3B0aW9ucyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgRE9NIGNoYW5nZXMsIGNhbGxpbmcgaW5pdCgpIGlmIGFueSBuZXcgbm9kZXMgYXJlIGFkZGVkLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4xLjBcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gbXV0YXRpb25SZWNvcmRzIEFycmF5IG9mIE11dGF0aW9uUmVjb3JkIG9iamVjdHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBoYW5kbGVDaGFuZ2VzKCBtdXRhdGlvblJlY29yZHMgKSB7XG5cdFx0dmFyIGkgPSBtdXRhdGlvblJlY29yZHMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHQvLyBDYWxsIGluaXQoKSBvbmNlIGlmIGFueSByZWNvcmQgaW4gdGhpcyBzZXQgYWRkcyBub2Rlcy5cblx0XHRcdGlmICggbXV0YXRpb25SZWNvcmRzWyBpIF0uYWRkZWROb2Rlcy5sZW5ndGggKSB7XG5cdFx0XHRcdGluaXQoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBCYWNrd2FyZCBjb21wYXRpYmxlIGdldHRlciBvZiBkYXRhLSogYXR0cmlidXRlLlxuXHQgKlxuXHQgKiBVc2VzIGVsZW1lbnQuZGF0YXNldCBpZiBpdCBleGlzdHMsIG90aGVyd2lzZSB1c2VzIGdldEF0dHJpYnV0ZS5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IEVsZW1lbnQgRE9NIGVsZW1lbnQgd2l0aCB0aGUgYXR0cmlidXRlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gICAgICBBdHRyaWJ1dGUgdGhlIGF0dHJpYnV0ZSB0byBnZXQuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIGdldERhdGFBdHRyaWJ1dGUoIGVsZW1lbnQsIGF0dHJpYnV0ZSApIHtcblx0XHRpZiAoIHN1cHBvcnRzRGF0YXNldCApIHtcblx0XHRcdHJldHVybiBlbGVtZW50LmRhdGFzZXRbYXR0cmlidXRlXTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoICdkYXRhLScgKyBhdHRyaWJ1dGUgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGVsZW1lbnQgYnkgSUQuXG5cdCAqXG5cdCAqIExvY2FsIGFsaWFzIGZvciBkb2N1bWVudC5nZXRFbGVtZW50QnlJZC5cblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFRoZSByZXF1ZXN0ZWQgZWxlbWVudC5cblx0ICovXG5cdGZ1bmN0aW9uIGdldEVsZW1lbnRCeUlkKCBlbGVtZW50SWQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBlbGVtZW50SWQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgcmVwbHkgZm9ybSBmcm9tIGl0cyBjdXJyZW50IHBvc2l0aW9uIHRvIHRoZSByZXBseSBsb2NhdGlvbi5cblx0ICpcblx0ICogQHNpbmNlIDIuNy4wXG5cdCAqXG5cdCAqIEBtZW1iZXJPZiBhZGRDb21tZW50XG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhZGRCZWxvd0lkIEhUTUwgSUQgb2YgZWxlbWVudCB0aGUgZm9ybSBmb2xsb3dzLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkICBEYXRhYmFzZSBJRCBvZiBjb21tZW50IGJlaW5nIHJlcGxpZWQgdG8uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25kSWQgIEhUTUwgSUQgb2YgJ3Jlc3BvbmQnIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwb3N0SWQgICAgIERhdGFiYXNlIElEIG9mIHRoZSBwb3N0LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmVwbHlUbyAgICBGb3JtIGhlYWRpbmcgY29udGVudC5cblx0ICovXG5cdGZ1bmN0aW9uIG1vdmVGb3JtKCBhZGRCZWxvd0lkLCBjb21tZW50SWQsIHJlc3BvbmRJZCwgcG9zdElkLCByZXBseVRvICkge1xuXHRcdC8vIEdldCBlbGVtZW50cyBiYXNlZCBvbiB0aGVpciBJRHMuXG5cdFx0dmFyIGFkZEJlbG93RWxlbWVudCA9IGdldEVsZW1lbnRCeUlkKCBhZGRCZWxvd0lkICk7XG5cdFx0cmVzcG9uZEVsZW1lbnQgID0gZ2V0RWxlbWVudEJ5SWQoIHJlc3BvbmRJZCApO1xuXG5cdFx0Ly8gR2V0IHRoZSBoaWRkZW4gZmllbGRzLlxuXHRcdHZhciBwYXJlbnRJZEZpZWxkICAgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLnBhcmVudElkRmllbGRJZCApO1xuXHRcdHZhciBwb3N0SWRGaWVsZCAgICAgPSBnZXRFbGVtZW50QnlJZCggY29uZmlnLnBvc3RJZEZpZWxkSWQgKTtcblx0XHR2YXIgZWxlbWVudCwgY3NzSGlkZGVuLCBzdHlsZTtcblxuXHRcdHZhciByZXBseUhlYWRpbmcgICAgICAgICA9IGdldEVsZW1lbnRCeUlkKCBjb25maWcuY29tbWVudFJlcGx5VGl0bGVJZCApO1xuXHRcdHZhciByZXBseUhlYWRpbmdUZXh0Tm9kZSA9IHJlcGx5SGVhZGluZyAmJiByZXBseUhlYWRpbmcuZmlyc3RDaGlsZDtcblx0XHR2YXIgcmVwbHlMaW5rVG9QYXJlbnQgICAgPSByZXBseUhlYWRpbmdUZXh0Tm9kZSAmJiByZXBseUhlYWRpbmdUZXh0Tm9kZS5uZXh0U2libGluZztcblxuXHRcdGlmICggISBhZGRCZWxvd0VsZW1lbnQgfHwgISByZXNwb25kRWxlbWVudCB8fCAhIHBhcmVudElkRmllbGQgKSB7XG5cdFx0XHQvLyBNaXNzaW5nIGtleSBlbGVtZW50cywgZmFpbC5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgcmVwbHlUbyApIHtcblx0XHRcdHJlcGx5VG8gPSByZXBseUhlYWRpbmdUZXh0Tm9kZSAmJiByZXBseUhlYWRpbmdUZXh0Tm9kZS50ZXh0Q29udGVudDtcblx0XHR9XG5cblx0XHRhZGRQbGFjZUhvbGRlciggcmVzcG9uZEVsZW1lbnQgKTtcblxuXHRcdC8vIFNldCB0aGUgdmFsdWUgb2YgdGhlIHBvc3QuXG5cdFx0aWYgKCBwb3N0SWQgJiYgcG9zdElkRmllbGQgKSB7XG5cdFx0XHRwb3N0SWRGaWVsZC52YWx1ZSA9IHBvc3RJZDtcblx0XHR9XG5cblx0XHRwYXJlbnRJZEZpZWxkLnZhbHVlID0gY29tbWVudElkO1xuXG5cdFx0Y2FuY2VsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0YWRkQmVsb3dFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCByZXNwb25kRWxlbWVudCwgYWRkQmVsb3dFbGVtZW50Lm5leHRTaWJsaW5nICk7XG5cblx0XHRpZiAoIHJlcGx5SGVhZGluZ1RleHROb2RlICYmIHJlcGx5SGVhZGluZ1RleHROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSApIHtcblx0XHRcdGlmICggcmVwbHlMaW5rVG9QYXJlbnQgJiYgJ0EnID09PSByZXBseUxpbmtUb1BhcmVudC5ub2RlTmFtZSAmJiByZXBseUxpbmtUb1BhcmVudC5pZCAhPT0gY29uZmlnLmNhbmNlbFJlcGx5SWQgKSB7XG5cdFx0XHRcdHJlcGx5TGlua1RvUGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR9XG5cblx0XHRcdHJlcGx5SGVhZGluZ1RleHROb2RlLnRleHRDb250ZW50ID0gcmVwbHlUbztcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIFRoaXMgaXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCB0aGlyZCBwYXJ0eSBjb21tZW50aW5nIHN5c3RlbXNcblx0XHQgKiBob29raW5nIGludG8gdGhlIGV2ZW50IHVzaW5nIG9sZGVyIHRlY2huaXF1ZXMuXG5cdFx0ICovXG5cdFx0Y2FuY2VsRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8vIEZvY3VzIG9uIHRoZSBmaXJzdCBmaWVsZCBpbiB0aGUgY29tbWVudCBmb3JtLlxuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjb21tZW50Rm9ybUVsZW1lbnQuZWxlbWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGVsZW1lbnQgPSBjb21tZW50Rm9ybUVsZW1lbnQuZWxlbWVudHNbaV07XG5cdFx0XHRcdGNzc0hpZGRlbiA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIEdldCBlbGVtZW50cyBjb21wdXRlZCBzdHlsZS5cblx0XHRcdFx0aWYgKCAnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93ICkge1xuXHRcdFx0XHRcdC8vIE1vZGVybiBicm93c2Vycy5cblx0XHRcdFx0XHRzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtZW50ICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jdXJyZW50U3R5bGUgKSB7XG5cdFx0XHRcdFx0Ly8gSUUgOC5cblx0XHRcdFx0XHRzdHlsZSA9IGVsZW1lbnQuY3VycmVudFN0eWxlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Lypcblx0XHRcdFx0ICogRm9yIGRpc3BsYXkgbm9uZSwgZG8gdGhlIHNhbWUgdGhpbmcgalF1ZXJ5IGRvZXMuIEZvciB2aXNpYmlsaXR5LFxuXHRcdFx0XHQgKiBjaGVjayB0aGUgZWxlbWVudCBjb21wdXRlZCBzdHlsZSBzaW5jZSBicm93c2VycyBhcmUgYWxyZWFkeSBkb2luZ1xuXHRcdFx0XHQgKiB0aGUgam9iIGZvciB1cy4gSW4gZmFjdCwgdGhlIHZpc2liaWxpdHkgY29tcHV0ZWQgc3R5bGUgaXMgdGhlIGFjdHVhbFxuXHRcdFx0XHQgKiBjb21wdXRlZCB2YWx1ZSBhbmQgYWxyZWFkeSB0YWtlcyBpbnRvIGFjY291bnQgdGhlIGVsZW1lbnQgYW5jZXN0b3JzLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0aWYgKCAoIGVsZW1lbnQub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtZW50Lm9mZnNldEhlaWdodCA8PSAwICkgfHwgc3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicgKSB7XG5cdFx0XHRcdFx0Y3NzSGlkZGVuID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNraXAgZm9ybSBlbGVtZW50cyB0aGF0IGFyZSBoaWRkZW4gb3IgZGlzYWJsZWQuXG5cdFx0XHRcdGlmICggJ2hpZGRlbicgPT09IGVsZW1lbnQudHlwZSB8fCBlbGVtZW50LmRpc2FibGVkIHx8IGNzc0hpZGRlbiApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdFx0Ly8gU3RvcCBhZnRlciB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIGZhbHNlIGlzIHJldHVybmVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggdGhpcmQgcGFydHkgY29tbWVudGluZyBzeXN0ZW1zXG5cdFx0ICogaG9va2luZyBpbnRvIHRoaXMgZnVuY3Rpb24uXG5cdFx0ICovXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBwbGFjZWhvbGRlciBlbGVtZW50LlxuXHQgKlxuXHQgKiBQbGFjZXMgYSBwbGFjZSBob2xkZXIgZWxlbWVudCBhYm92ZSB0aGUgI3Jlc3BvbmQgZWxlbWVudCBmb3Jcblx0ICogdGhlIGZvcm0gdG8gYmUgcmV0dXJuZWQgdG8gaWYgbmVlZHMgYmUuXG5cdCAqXG5cdCAqIEBzaW5jZSAyLjcuMFxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxlbGVtZW50fSByZXNwb25kRWxlbWVudCB0aGUgI3Jlc3BvbmQgZWxlbWVudCBob2xkaW5nIGNvbW1lbnQgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGFkZFBsYWNlSG9sZGVyKCByZXNwb25kRWxlbWVudCApIHtcblx0XHR2YXIgdGVtcG9yYXJ5Rm9ybUlkICA9IGNvbmZpZy50ZW1wb3JhcnlGb3JtSWQ7XG5cdFx0dmFyIHRlbXBvcmFyeUVsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCggdGVtcG9yYXJ5Rm9ybUlkICk7XG5cdFx0dmFyIHJlcGx5RWxlbWVudCA9IGdldEVsZW1lbnRCeUlkKCBjb25maWcuY29tbWVudFJlcGx5VGl0bGVJZCApO1xuXHRcdHZhciBpbml0aWFsSGVhZGluZ1RleHQgPSByZXBseUVsZW1lbnQgPyByZXBseUVsZW1lbnQuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA6ICcnO1xuXG5cdFx0aWYgKCB0ZW1wb3JhcnlFbGVtZW50ICkge1xuXHRcdFx0Ly8gVGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHMsIG5vIG5lZWQgdG8gcmVjcmVhdGUuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGVtcG9yYXJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0dGVtcG9yYXJ5RWxlbWVudC5pZCA9IHRlbXBvcmFyeUZvcm1JZDtcblx0XHR0ZW1wb3JhcnlFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0dGVtcG9yYXJ5RWxlbWVudC50ZXh0Q29udGVudCA9IGluaXRpYWxIZWFkaW5nVGV4dDtcblx0XHRyZXNwb25kRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggdGVtcG9yYXJ5RWxlbWVudCwgcmVzcG9uZEVsZW1lbnQgKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdCxcblx0XHRtb3ZlRm9ybTogbW92ZUZvcm1cblx0fTtcbn0pKCB3aW5kb3cgKTtcbiIsImltcG9ydCAnLi9fY29tbWVudC1yZXBseS5qcyc7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgTWVzc2lhID0ge1xuXHRcdFx0c2VsZWN0UmF0aW5nIDogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdE1lc3NpYS5kb1JhdGluZyggJCh0aGlzKSwgZS5wYWdlWCApO1xuXHRcdFx0fSxcblx0XHRcdHNldFJhdGluZyA6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgbnVtYmVyID0gTWVzc2lhLmRvUmF0aW5nKCAkKHRoaXMpLCBlLnBhZ2VYICk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2ZpeGVkJykubmV4dCgnLnJhdGluZ19iYWxsJykuZmluZCgnLnBvaW50cycpLmNzcygnY29sb3InLCAnI2Q3MjAyMCcpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJyNjb21tZW50Zm9ybScpLmZpbmQoJy5mb3JtLXN1Ym1pdCBpbnB1dCNjb21tZW50X3JhdGluZycpLnZhbChudW1iZXIpO1xuXHRcdFx0fSxcblx0XHRcdHJlc2V0UmF0aW5nIDogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGlmKGUudHlwZSA9PSAnbW91c2VlbnRlcicpe1xuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJykubmV4dCgnLnJhdGluZ19iYWxsJykuZmluZCgnLnBvaW50cycpLmNzcygnY29sb3InLCAnJyk7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcjY29tbWVudGZvcm0nKS5maW5kKCcuZm9ybS1zdWJtaXQgaW5wdXQjY29tbWVudF9yYXRpbmcnKS52YWwobnVsbCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihlLnR5cGUgPT0gJ21vdXNlbGVhdmUnKXtcblx0XHRcdFx0XHRpZiggISQodGhpcykuaGFzQ2xhc3MoJ2ZpeGVkJykgKXtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnLmJnLWFjdGl2ZScpLmNzcygnd2lkdGgnLCAnMCUnKTtcblx0XHRcdFx0XHRcdCQodGhpcykucGFyZW50cygnLnJhdGluZycpLmZpbmQoJy5wb2ludHMnKS50ZXh0KCcwLjAwJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bW92ZUZvcm0gOiBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgcmVzcG9uZCA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBjb21tZW50X3BhcmVudCA9IHJlc3BvbmQuZmluZCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXSNjb21tZW50X3BhcmVudCcpLnZhbCgpO1xuXG5cdFx0XHRcdGlmKGNvbW1lbnRfcGFyZW50ID09PSAnMCcpe1xuXHRcdFx0XHRcdHJlc3BvbmQuZmluZCgnLmV2YWwnKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRyZXNwb25kLmZpbmQoJy5ldmFsJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRvUmF0aW5nIDogZnVuY3Rpb24odGFyZ2V0LCBwYWdlWCl7XG5cdFx0XHRcdFxuXHRcdFx0XHR2YXIgbGFnID0gLTI7IC8vINC/0L7Qu9C+0LbQuNGC0LXQu9GM0L3Ri9C5IC0g0L7RgtGB0YLQsNCy0LDQvdC40LUsINC+0YLRgNC40YbQsNGC0LXQu9GM0L3Ri9C5IC0g0L7Qv9C10YDQtdC20LXQvdC40LVcblx0XHRcdFx0dmFyIHN0ZXAgPSAxMDsgLy8gMTAgLSDQv9C+INC/0L7QuyDQsdCw0LvQu9CwLCAyMCAtINC/0L4g0L7QtNC90L7QvNGDXG5cdFx0XHRcdHZhciByZWxfcG9zaXRpb24gPSBwYWdlWCAtIHRhcmdldC5wYXJlbnQoKS5vZmZzZXQoKS5sZWZ0O1xuXG5cdFx0XHRcdC8vINCX0LLQtdC30LTQsCDQvtC60YDQsNGB0LjRgtGB0Y8g0L/QvtGB0LvQtSDQv9GA0L7RhdC+0LbQtNC10L3QuNGPINC10LUg0LrRg9GA0YHQvtGA0L7QvFxuXHRcdFx0XHQvLyB2YXIgcmF0aW5nX3BlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKCAoICggcmVsX3Bvc2l0aW9uICsgbGFnICkgLyB0YXJnZXQud2lkdGgoKSAqIDEwMCkgLyBzdGVwKSAqIHN0ZXA7XG5cblx0XHRcdFx0Ly8g0JfQstC10LfQtNCwINC+0LrRgNCw0YHQuNGC0YHRjyDQsiDQvNC+0LzQtdC90YIg0LLRhdC+0LbQtNC10L3QuNGPINCyINC90LXQtSDQutGD0YDRgdC+0YDQsFxuXHRcdFx0XHR2YXIgcmF0aW5nX3BlcmNlbnRhZ2UgPSBNYXRoLmNlaWwoICggKCByZWxfcG9zaXRpb24gKyBsYWcgKSAvIHRhcmdldC53aWR0aCgpICogMTAwKSAvIHN0ZXApICogc3RlcDtcblxuXHRcdFx0XHR2YXIgbnVtYmVyID0gcGFyc2VGbG9hdChyYXRpbmdfcGVyY2VudGFnZSAvIDIwKS50b0ZpeGVkKDIpO1xuXG5cdFx0XHRcdHRhcmdldC5maW5kKCcuYmctYWN0aXZlJykuY3NzKCd3aWR0aCcsIHJhdGluZ19wZXJjZW50YWdlICsgJyUnKTtcblxuXHRcdFx0XHR2YXIgcG9pbnRzID0gdGFyZ2V0LnBhcmVudHMoJy5yYXRpbmcnKS5maW5kKCcucG9pbnRzJyk7XG5cdFx0XHRcdGlmKHBvaW50cy5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRwb2ludHMudGV4dChudW1iZXIpO1xuXHRcdFx0XHRyZXR1cm4gbnVtYmVyO1xuXHRcdFx0fSxcblx0XHR9O1xuXG5cdFx0JCgnYm9keScpLm9uKCdtb3VzZWVudGVyJywgJy5yYXRpbmcgLnN0YXJzLmVkaXRhYmxlJywgTWVzc2lhLnJlc2V0UmF0aW5nKTtcblx0XHQkKCdib2R5Jykub24oJ21vdXNlbGVhdmUnLCAnLnJhdGluZyAuc3RhcnMuZWRpdGFibGUnLCBNZXNzaWEucmVzZXRSYXRpbmcpO1xuXHRcdCQoJ2JvZHknKS5vbignbW91c2Vtb3ZlJywgJy5yYXRpbmcgLnN0YXJzLmVkaXRhYmxlOm5vdCguZml4ZWQpJywgTWVzc2lhLnNlbGVjdFJhdGluZyk7XG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcucmF0aW5nIC5zdGFycy5lZGl0YWJsZScsIE1lc3NpYS5zZXRSYXRpbmcpO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ0RPTU5vZGVJbnNlcnRlZCcsICcjcmVzcG9uZC5jb21tZW50LXJlc3BvbmQnLCBNZXNzaWEubW92ZUZvcm0pO1xuXHR9KTtcbn0pKGpRdWVyeSk7XG5cbi8vIHJlY2FwdGNoYVxuaWYoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50Zm9ybScpICE9IG51bGwgJiYgdHlwZW9mIGdyZWNhcHRjaGEgIT0gJ3VuZGVmaW5lZCcgKXtcblx0XG5cdGdyZWNhcHRjaGEucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdFxuXHRcdHZhciBhY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXB0Y2hhQWN0aW9uJyk7XG5cdFx0XG5cdFx0aWYoYWN0aW9uID09IG51bGwpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUobWVzc2lhVmFycy5nQ2FwdGNoYVYzLCB7IGFjdGlvbjogYWN0aW9uLnZhbHVlIH0pLnRoZW4oZnVuY3Rpb24gKHRva2VuKSB7XG5cdFx0XHR2YXIgcmVjYXB0Y2hhUmVzcG9uc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXB0Y2hhUmVzcG9uc2UnKTtcblx0XHRcdHJlY2FwdGNoYVJlc3BvbnNlLnZhbHVlID0gdG9rZW47XG5cdFx0fSk7XG5cdH0pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTdHlsZVxuaW1wb3J0IFwiLi4vc2Nzcy9fY29tcG9uZW50cy9fY29tbWVudF9mb3JtLnNjc3NcIjtcblxuLy8gU2NyaXB0c1xuaW1wb3J0IFwiLi4vanMvX2NvbXBvbmVudHMvX2NvbW1lbnRfZm9ybS5qc1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
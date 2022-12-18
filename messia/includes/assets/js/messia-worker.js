/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/worker.js":
/*!**************************!*\
  !*** ./src/js/worker.js ***!
  \**************************/
/***/ (function() {

(function () {
	'use strict';

	/**
	 * Indexed DB name.
	 *
	 * @var string
	 */
	const DB_NAME = 'messia';

	/**
	 * Indexed DB varsion.
	 *
	 * @var number
	 */
	const DB_VERSION = 1;

	/**
	 * Whether cache storage supported.
	 *
	 * @var boolean
	 */
	const CACHE_AVAILABLE = 'caches' in self;

	/**
	 * Whether indexedDB supported.
	 *
	 * @var boolean
	 */
	const INDEXED_DB_AVAILABLE = 'indexedDB' in self;

	/**
	 * Curreny host.
	 *
	 * @var string
	 */
	const WORKER_HOST = self.location.host;

	/**
	 * Worker version.
	 *
	 * @var number
	 */
	const WORKER_CACHE_VERSION = 1;

	/**
	 * Cache keys.
	 * Will be populated dynamically.
	 *
	 * @var object
	 */
	const WORKER_CACHES = {};

	/**
	 * Total lifetime of hole cache, seconds.
	 *
	 * @var number
	 */
	const WORKER_CACHE_LIFETIME = 24 * 60 * 60;

	/**
	 * Lifetime for request destination type in cache, seconds.
	 * Will be used for resources without If-Modified-Since header
	 * in response.
	 *
	 * @var object
	 */
	const WORKER_CACHE_ITEM_LIFETIME = {
		audio: 5 * 60,
		audioworklet: 5 * 60,
		document: 5 * 60,
		embed: 5 * 60,
		font: 5 * 60,
		image: 5 * 60,
		manifest: 5 * 60,
		object: 5 * 60,
		paintworklet: 5 * 60,
		report: 5 * 60,
		script: 5 * 60,
		serviceworker: 5 * 60,
		sharedworker: 5 * 60,
		style: 5 * 60,
		track: 5 * 60,
		video: 5 * 60,
		worker: 5 * 60,
		xslt: 5 * 60,
	}

	/**
	 * Default lifetime for request destination type in cache, seconds.
	 *
	 * @var number
	 */
	const WORKER_CACHE_ITEM_LIFETIME_DEFAULT = 5 * 60;

	/**
	 * Request to these URLs will be ignored by cache.
	 * Regexp.
	 *
	 * @var array
	 */
	const RESTRICT_ROUTES = [
		/wp-json/,
		/wp-admin\/admin.php/,
		/wp-admin\/admin-ajax.php/,
	];

	/**
	 * Request from these URLs will be ignored by cache.
	 * Regexp.
	 *
	 * @var array
	 */
	const RESTRICT_REFERRERS = [
		/wp-admin\/admin.php/,
	];

	/**
	 * Worker installation event.
	 * Skip waiting to force update.
	 * Drop all cache of the worker.
	 *
	 * @param {Event} event Browser InstallEvent.
	 *
	 * @return void
	 * 
	 */
	const installCallback = (event) => {
		const pipeline = cacheClear();
		event.waitUntil(pipeline);
	};

	/**
	 * Worker activation event.
	 *
	 * @param {Event} event Browser ExtendableEvent.
	 *
	 * @return void
	 * 
	 */
	const activateCallback = (event) => {
		const pipeline = clients.claim()
			.then(async () => {
				const date = new Date();

				date.setSeconds(date.getSeconds() + WORKER_CACHE_LIFETIME);

				await initStorage();
				await dbPut('options', 'cache_rules', { next_purge: date.toGMTString() });

				return Promise.resolve();
			})
			.catch(async (error) => {
				const clients = await self.clients.matchAll();

				const promises = clients.map(client => {
					return messageClient(client.id, {
						type: 'logger',
						method: 'error',
						body: {
							message: 'There was an error operating with IndexedDB.',
							error: error,
						}
					});
				});

				return Promise.all(promises);
			});
		event.waitUntil(pipeline);
	}

	/**
	 * Creates and update DB schema.
	 *
	 * @return Promise
	 */
	const initStorage = async () => {

		try {
			const
				STORE = 'options',
				dBOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);

			return await new Promise((resolve, reject) => {
				dBOpenRequest.onupgradeneeded = (event) => {
					const
						db = event.target.result,
						objectStore = db.createObjectStore(STORE);

					objectStore.createIndex('next_purge', 'next_purge', { unique: true });
				};

				dBOpenRequest.onsuccess = (event) => {
					return resolve(event.target.result);
				};

				dBOpenRequest.onerror = (event) => {
					return reject(event);
				};
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Return connect to DB.
	 *
	 * @return Promise
	 */
	const getConnection = async () => {

		try {
			const dBOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);

			return await new Promise((resolve, reject) => {
				dBOpenRequest.onsuccess = (event) => {
					return resolve(event.target.result);
				};

				dBOpenRequest.onerror = (event) => {
					return reject(event);
				};
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Update DB entry.
	 *
	 * @param {string} storage The name of storage.
	 * @param {string} key     The storage key to use.
	 * @param {mixed}  value   What to store.
	 *
	 * @return Promise
	 */
	const dbPut = async (storage, key = false, value) => {

		try {
			const
				connection = await getConnection(),
				storageObject = connection.transaction([storage], 'readwrite').objectStore(storage),
				result = (key) ? storageObject.put(value, key) : storageObject.put(value);

			return await new Promise((resolve, reject) => {
				result.onsuccess = (event) => {
					if (event.target.result) {
						return resolve(event.target.result);
					} else {
						return reject(event.target);
					}
				};

				result.onerror = (event) => {
					return reject(event);
				};
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Getter for DB entry.
	 *
	 * @param {string} storage The name of storage.
	 * @param {string} key     The storage key to use.
	 *
	 * @return Promise
	 */
	const dbGet = async (storage, key) => {

		try {
			const
				connection = await getConnection(),
				storageObject = connection.transaction([storage], 'readwrite').objectStore(storage),
				result = storageObject.get(key);

			return await new Promise((resolve, reject) => {
				result.onsuccess = (event) => {
					return resolve(event.target.result);
				};

				result.onerror = (event) => {
					return reject(event);
				};
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Worker incoming message event handler.
	 *
	 * @param {Event} event Browser ExtendableEvent.
	 *
	 * @return void
	 */
	const messageCallback = (event) => {
		switch (event.data.command) {
			case 'messiaSkipWaiting':
				self.skipWaiting();
				break;

			case 'messiaUnregisterSelf':
				self.removeEventListener('fetch', fetchCallback);
				self.removeEventListener('install', installCallback);
				self.removeEventListener('activate', activateCallback);
				self.removeEventListener('message', messageCallback);

				const pipeline = Promise.allSettled([
					unregisterSelf(),
					cacheClear(),
				]);

				event.waitUntil(pipeline);

				pipeline
					.then((result) => {
						messageClient(event.source.id, {
							type: 'logger',
							method: 'log',
							body: [
								`Unregister worker report: ${objectJoin(result[0])}`,
								`Cache clear report: ${objectJoin(result[1])}`,
							],
						})
					})
					.catch((error) => {
						messageClient(event.source.id, {
							type: 'logger',
							method: 'error',
							body: {
								message: 'Something went wrong on worker unregistration.',
								error: error,
							}
						});
					});
				break;

			case 'messiaCacheDelete':
				const
					cacheDeleteAliases = event.data.types,
					cleared = Promise;

				cacheClear(cacheDeleteAliases)
					.then((result) => {
						// TODO - check that all keys in result has value 'true'.
						messageClient(event.source.id, {
							type: 'logger',
							method: 'log',
							body: {
								message: `Cache keys by alias(es) '${cacheDeleteAliases.join(', ')}' processed.`,
								result: result,
							}
						});
					})
					.catch((error) => {
						messageClient(event.source.id, {
							type: 'logger',
							method: 'error',
							body: {
								message: 'Something went wrong on cache deleting.',
								error: error,
							}
						});
					})
					.finally(() => {
						return cleared.resolve();
					});

				event.waitUntil(cleared);
				break;
		}
	};

	/**
	 * URL fetch event.
	 *
	 * @param {Event} event Browser FetchEvent.
	 *
	 * @return mixed Response|bool Bool if we do not proxy this request.
	 */
	const fetchCallback = function (event) {

		if (!event.request.url.startsWith(self.location.origin)) {
			return false;
		}

		const url = new URL(event.request.url);

		if (url.protocol !== 'https:') {

			messageClient(event.clientId, {
				type: 'logger',
				method: 'warn',
				body: {
					message: 'Non secure request ignores by worker.',
					URL: event.request.url,
				}
			});
			return false;
		}

		const cacheKey = getCachKeyForRequest(url);

		// No rules - no serving.
		if (!cacheKey) {
			return false;
		}

		const serveRequest = shouldServeRequest(event.request);

		// No rules - no serving.
		if (!serveRequest) {
			return false;
		}

		if (false === CACHE_AVAILABLE || false === INDEXED_DB_AVAILABLE) {
			event.respondWith(serveFrontendRequest(event, cacheKey));
			return;
		}

		const response = caches.match(event.request)
			.then((responseCached) => {
				// out of cache.
				if (typeof responseCached === 'undefined') {
					return serveFrontendRequest(event, cacheKey);
				}
				// from cache.
				else {
					updateResponseInCache(event.request, responseCached, cacheKey)
						.catch((error) => {
							messageClient(event.clientId, {
								type: 'logger',
								method: 'error',
								body: {
									message: `Fail to update cache for URL ${event.request.url}`,
									error: error,
								}
							});
						});

					cachePurge()
						.then((purged) => {
							if (purged) {
								messageClient(event.clientId, {
									type: 'logger',
									method: 'log',
									body: 'Worker cache became outdated and was completely purged.',
								});
							}
						})
						.catch((error) => {
							messageClient(event.clientId, {
								type: 'logger',
								method: 'error',
								body: {
									message: 'Error on cache purging.',
									error: error,
								}
							});
						})

					return responseCached;
				}
			});

		event.respondWith(response);
	};

	/**
	 * Fetch request and cache it.
	 *
	 * @param {Event}  event    Browser FetchEvent.
	 * @param {string} cacheKey Browser cache key value for request.
	 *
	 * @return Response.
	 */
	const serveFrontendRequest = async (event, cacheKey) => {

		try {
			const
				cache = await caches.open(cacheKey),
				responseFetched = await fetch(event.request);

			const
				responseClone = responseFetched.clone(),
				responsePromise = createResponse(
					responseClone,
					{
						'Last-Fetched-On': new Date().toGMTString(),
						'Fetch-Error': false,
					}
				);

			const
				responseEdit = await responsePromise,
				responseEditClone = responseEdit.clone();

			await cache.put(event.request, responseEditClone);
			return responseEdit;

		} catch (err) {
			messageClient(event.clientId, {
				type: 'logger',
				method: 'error',
				body: {
					message: 'Request fail',
					reasone: err,
				}
			});
		}
	}

	/**
	 * When the network call has been processed, the given response is sent here
	 * to иу updated if needed. This happens according to the following rules:
	 * 1. If original response contains the Last-Modified header, then it is a static
	 *    file. In this case, a new request is created as a copy of the original one and
	 *    header 'If-Modified-Since' = Last-Modified values being added to it.
	 * 2. Request executes.
	 * 3. If something went wrong catched an exeption and original request executed.
	 *    Once done to it's response added header Fetch-Error = true to prevent corresponding
	 *    request headers from modification in future.
	 * 4. Header Last-Fetched-On = now added to response.
	 * 5. Response being putted into cache.
	 *
	 * @param {Request}  request  Request object that was served from cache.
	 * @param {Response} response Response object that was served from cache.
	 * @param {string}   cacheKey Browser cache key value matched for request.
	 *
	 * @return void
	 */
	const updateResponseInCache = async (request, response, cacheKey) => {

		const
			cache = await caches.open(cacheKey),
			url = new URL(request.url),
			requestLastModified = (response.headers.get('Last-Modified')) || false,
			fetchError = response.headers.get('Fetch-Error'),
			exception = url.pathname.includes('fonts.gstatic.com');

		let updatedRequest = request.clone();

		// It is 99% static file on same origin.
		// The main here is that we can safely send If-Modified-Since header.
		if (requestLastModified && fetchError === false && exception === false) {
			switch (request.method) {
				case 'GET':
				case 'HEAD':
					updatedRequest = new Request(request, {
						mode: 'same-origin',
						headers: request.headers,
					});
					updatedRequest.headers.set('If-Modified-Since', requestLastModified);
					break;
			}
		} else {
			const update = shouldUpdateResponse(request, response);
			if (!update) return Promise.resolve('ok');
		}

		try {
			const
				responseFetched = await fetch(updatedRequest),
				responseClone = responseFetched.clone();

			if (200 === responseFetched.status) {
				const responsePromise = createResponse(
					responseClone,
					{
						'Last-Fetched-On': new Date().toGMTString(),
						'Fetch-Error': false,
					}
				);
				responsePromise.then((response) => cache.put(request, response));
			}
			return Promise.resolve('ok');

		} catch (error) {

			const
				responseFetched = await fetch(request),
				responseClone = responseFetched.clone(),
				responsePromise = createResponse(
					responseClone,
					{
						'Last-Fetched-On': new Date().toGMTString(),
						'Fetch-Error': true,
					}
				);

			responsePromise.then((response) => cache.put(request, response));
			return Promise.reject(error);
		}
	}

	/**
	 * Communicator with parent script.
	 *
	 * @param {string} clientId Worker starter.
	 * @param {object} msg      Message itself.
	 *
	 * @return void
	 */
	const messageClient = async (clientId, msg) => {
		const client = await clients.get(clientId);
		client.postMessage(msg);
	}

	/**
	 * Unregister the worker.
	 *
	 * @return {Promise}
	 */
	const unregisterSelf = async () => {
		return await self.registration.unregister();
	}

	/**
	 * Find and return propper cache key for request.
	 *
	 * @param {Request} request Network request.
	 *
	 * @return string|bool Key name or false if request does not match rules and should not be cached ever.
	 */
	const getCachKeyForRequest = (url) => {

		let
			cacheKey = false,
			cacheAlias = false;

		const
			isImage = url.pathname.match(/(?<=\.)(?:png|jpeg|gif|svg|webp)$/),
			isFont = url.pathname.match(/(?<=\.)(?:woff2)$/),
			isStyle = url.pathname.match(/(?<=\.)(?:css)$/),
			isScript = url.pathname.match(/(?<=\.)(?:js)$/);

		switch (true) {
			case isImage !== null:
				cacheAlias = `images/${isImage[0]}`;
				break;
			case isFont !== null:
				cacheAlias = `fonts/${isFont[0]}`;
				break;
			case isStyle !== null:
				cacheAlias = `styles/${isStyle[0]}`;
				break;
			case isScript !== null:
				cacheAlias = `scripts/${isScript[0]}`;
				break;
		}

		if (cacheAlias) {
			WORKER_CACHES[cacheAlias] = `${WORKER_HOST}/v${WORKER_CACHE_VERSION}/${cacheAlias}`;
			cacheKey = WORKER_CACHES[cacheAlias];
		}

		return cacheKey;
	}

	/**
	 * Delete cache entries.
	 *
	 * @param {array} cacheDeleteAliases Array of cache keys aliases to kill.
	 *                                   Empty array kills all caches entries.
	 *
	 * @return Promise
	 */
	const cacheClear = async (cacheDeleteAliases = []) => {
		const keyList = await getWorkerCacheKeysByALias(cacheDeleteAliases);

		if (keyList.length > 0) {
			const result = keyList.map(async (key) => {
				const removed = await caches.delete(key);
				return (removed) ? `Key ${key} succesfully deleted.` : `Fail to delete ${key}`;
			});

			return await Promise.all(result);
		} else {
			const
				aliases = (cacheDeleteAliases.length > 0) ? cacheDeleteAliases.join(', ') : 'All',
				result = [Promise.resolve(`No keys found to delete by given aliases: '${aliases}'`)];

			return await Promise.all(result);
		}
	}

	/**
	 * Clears the cache completely on a schedule
	 *
	 * @return Promise
	 */
	const cachePurge = async () => {

		try {
			const
				cacheRules = await dbGet('options', 'cache_rules'),
				now = new Date(),
				nextPurge = new Date(cacheRules.next_purge);

			return await new Promise((resolve, reject) => {

				if ((nextPurge - now) > 0) {
					return resolve(false);
				}

				return cacheClear()
					.then(async (result) => {
						const date = new Date();

						date.setSeconds(date.getSeconds() + WORKER_CACHE_LIFETIME);
						return await dbPut('options', 'cache_rules', { next_purge: date.toGMTString() });
					})
					.then((result) => {
						return resolve(true);
					})
					.catch((error) => reject(error));
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Search browser cache keys by given alias of WORKER_CACHES.
	 *
	 * @param {string[]} keyAlias As it said.
	 *
	 * @return array
	 */
	const getWorkerCacheKeysByALias = async (keyAlias = []) => {
		const keyList = await caches.keys();

		if (keyAlias.length > 0) {
			const keyListFiltered = keyList.filter((value) => {
				const cacheKeyAlias = getKeyByValue(WORKER_CACHES, value);
				return keyAlias.includes(cacheKeyAlias);
			});

			return keyListFiltered;
		}

		return keyList;
	}

	/**
	 * Creates a new response. An existing response can be sent.
	 *
	 * @param {Response} baseResponse Used as origin response if passed.
	 * @param {Object}   extraHeaders Headers to use in new response
	 *
	 * @return Promise.
	 */
	const createResponse = async (baseResponse = new Response(), extraHeaders = {}) => {

		const
			responseClone = baseResponse.clone(),
			headers = new Headers(responseClone.headers),
			body = await responseClone.blob();

		for (const [headerName, headerValue] of Object.entries(extraHeaders)) {
			headers.set(headerName, headerValue);
		}

		const response = new Response(body, {
			status: baseResponse.status,
			statusText: baseResponse.statusText,
			headers: headers
		});

		return response;
	}

	/**
	 * Filter URLs and referrer against cachable.
	 *
	 * @param {Request} request Requst.
	 *
	 * @return boolean
	 */
	const shouldServeRequest = (request) => {

		const
			referrerMatch = RESTRICT_REFERRERS.filter((pattern) => request.referrer.match(pattern)),
			urlMatch = RESTRICT_ROUTES.filter((pattern) => request.url.match(pattern));

		return referrerMatch.length === 0 && urlMatch.length === 0;
	};

	/**
	 * Detector whether response is outdated.
	 *
	 * @param {Request}  request  Request.
	 * @param {Response} response Response.
	 *
	 * @return boolean
	 */
	const shouldUpdateResponse = (request, response) => {

		const requestLastFetchedOn = (response.headers.get('Last-Fetched-On')) || false;

		if (requestLastFetchedOn) {
			const
				destination = request.destination,
				responseAgeSeconds = (new Date() - new Date(requestLastFetchedOn)) / 1000;

			return responseAgeSeconds > WORKER_CACHE_ITEM_LIFETIME[destination] || WORKER_CACHE_ITEM_LIFETIME_DEFAULT;
		}

		return true;
	}

	/**
	 * Join object's key and value.
	 *
	 * @param {object} What to join.
	 * @param {string} Key glue value
	 * @param {string} Key glue value separator
	 *
	 * @return string
	 */
	const objectJoin = function (object, glue = '-', separator = '; ') {
		return Object.keys(object).map((key) => {
			return [key, (typeof object[key] === 'array') ? object[key].join(', ') : object[key]].join(glue);
		}).join(separator);
	}

	const getKeyByValue = (object, value) => {
		return Object.keys(object).find(key => object[key] === value);
	}

	self.addEventListener('install', installCallback);
	self.addEventListener('activate', activateCallback);
	self.addEventListener('fetch', fetchCallback);
	self.addEventListener('message', messageCallback);
}());


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
/*!*************************************!*\
  !*** ./src/entries/entry-worker.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_worker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/worker.js */ "./src/js/worker.js");
/* harmony import */ var _js_worker_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_worker_js__WEBPACK_IMPORTED_MODULE_0__);
// Scripts

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQ3gwQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3NpYS8uL3NyYy9qcy93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vbWVzc2lhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZXNzaWEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3NpYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3NpYS8uL3NyYy9lbnRyaWVzL2VudHJ5LXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEluZGV4ZWQgREIgbmFtZS5cblx0ICpcblx0ICogQHZhciBzdHJpbmdcblx0ICovXG5cdGNvbnN0IERCX05BTUUgPSAnbWVzc2lhJztcblxuXHQvKipcblx0ICogSW5kZXhlZCBEQiB2YXJzaW9uLlxuXHQgKlxuXHQgKiBAdmFyIG51bWJlclxuXHQgKi9cblx0Y29uc3QgREJfVkVSU0lPTiA9IDE7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgY2FjaGUgc3RvcmFnZSBzdXBwb3J0ZWQuXG5cdCAqXG5cdCAqIEB2YXIgYm9vbGVhblxuXHQgKi9cblx0Y29uc3QgQ0FDSEVfQVZBSUxBQkxFID0gJ2NhY2hlcycgaW4gc2VsZjtcblxuXHQvKipcblx0ICogV2hldGhlciBpbmRleGVkREIgc3VwcG9ydGVkLlxuXHQgKlxuXHQgKiBAdmFyIGJvb2xlYW5cblx0ICovXG5cdGNvbnN0IElOREVYRURfREJfQVZBSUxBQkxFID0gJ2luZGV4ZWREQicgaW4gc2VsZjtcblxuXHQvKipcblx0ICogQ3VycmVueSBob3N0LlxuXHQgKlxuXHQgKiBAdmFyIHN0cmluZ1xuXHQgKi9cblx0Y29uc3QgV09SS0VSX0hPU1QgPSBzZWxmLmxvY2F0aW9uLmhvc3Q7XG5cblx0LyoqXG5cdCAqIFdvcmtlciB2ZXJzaW9uLlxuXHQgKlxuXHQgKiBAdmFyIG51bWJlclxuXHQgKi9cblx0Y29uc3QgV09SS0VSX0NBQ0hFX1ZFUlNJT04gPSAxO1xuXG5cdC8qKlxuXHQgKiBDYWNoZSBrZXlzLlxuXHQgKiBXaWxsIGJlIHBvcHVsYXRlZCBkeW5hbWljYWxseS5cblx0ICpcblx0ICogQHZhciBvYmplY3Rcblx0ICovXG5cdGNvbnN0IFdPUktFUl9DQUNIRVMgPSB7fTtcblxuXHQvKipcblx0ICogVG90YWwgbGlmZXRpbWUgb2YgaG9sZSBjYWNoZSwgc2Vjb25kcy5cblx0ICpcblx0ICogQHZhciBudW1iZXJcblx0ICovXG5cdGNvbnN0IFdPUktFUl9DQUNIRV9MSUZFVElNRSA9IDI0ICogNjAgKiA2MDtcblxuXHQvKipcblx0ICogTGlmZXRpbWUgZm9yIHJlcXVlc3QgZGVzdGluYXRpb24gdHlwZSBpbiBjYWNoZSwgc2Vjb25kcy5cblx0ICogV2lsbCBiZSB1c2VkIGZvciByZXNvdXJjZXMgd2l0aG91dCBJZi1Nb2RpZmllZC1TaW5jZSBoZWFkZXJcblx0ICogaW4gcmVzcG9uc2UuXG5cdCAqXG5cdCAqIEB2YXIgb2JqZWN0XG5cdCAqL1xuXHRjb25zdCBXT1JLRVJfQ0FDSEVfSVRFTV9MSUZFVElNRSA9IHtcblx0XHRhdWRpbzogNSAqIDYwLFxuXHRcdGF1ZGlvd29ya2xldDogNSAqIDYwLFxuXHRcdGRvY3VtZW50OiA1ICogNjAsXG5cdFx0ZW1iZWQ6IDUgKiA2MCxcblx0XHRmb250OiA1ICogNjAsXG5cdFx0aW1hZ2U6IDUgKiA2MCxcblx0XHRtYW5pZmVzdDogNSAqIDYwLFxuXHRcdG9iamVjdDogNSAqIDYwLFxuXHRcdHBhaW50d29ya2xldDogNSAqIDYwLFxuXHRcdHJlcG9ydDogNSAqIDYwLFxuXHRcdHNjcmlwdDogNSAqIDYwLFxuXHRcdHNlcnZpY2V3b3JrZXI6IDUgKiA2MCxcblx0XHRzaGFyZWR3b3JrZXI6IDUgKiA2MCxcblx0XHRzdHlsZTogNSAqIDYwLFxuXHRcdHRyYWNrOiA1ICogNjAsXG5cdFx0dmlkZW86IDUgKiA2MCxcblx0XHR3b3JrZXI6IDUgKiA2MCxcblx0XHR4c2x0OiA1ICogNjAsXG5cdH1cblxuXHQvKipcblx0ICogRGVmYXVsdCBsaWZldGltZSBmb3IgcmVxdWVzdCBkZXN0aW5hdGlvbiB0eXBlIGluIGNhY2hlLCBzZWNvbmRzLlxuXHQgKlxuXHQgKiBAdmFyIG51bWJlclxuXHQgKi9cblx0Y29uc3QgV09SS0VSX0NBQ0hFX0lURU1fTElGRVRJTUVfREVGQVVMVCA9IDUgKiA2MDtcblxuXHQvKipcblx0ICogUmVxdWVzdCB0byB0aGVzZSBVUkxzIHdpbGwgYmUgaWdub3JlZCBieSBjYWNoZS5cblx0ICogUmVnZXhwLlxuXHQgKlxuXHQgKiBAdmFyIGFycmF5XG5cdCAqL1xuXHRjb25zdCBSRVNUUklDVF9ST1VURVMgPSBbXG5cdFx0L3dwLWpzb24vLFxuXHRcdC93cC1hZG1pblxcL2FkbWluLnBocC8sXG5cdFx0L3dwLWFkbWluXFwvYWRtaW4tYWpheC5waHAvLFxuXHRdO1xuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IGZyb20gdGhlc2UgVVJMcyB3aWxsIGJlIGlnbm9yZWQgYnkgY2FjaGUuXG5cdCAqIFJlZ2V4cC5cblx0ICpcblx0ICogQHZhciBhcnJheVxuXHQgKi9cblx0Y29uc3QgUkVTVFJJQ1RfUkVGRVJSRVJTID0gW1xuXHRcdC93cC1hZG1pblxcL2FkbWluLnBocC8sXG5cdF07XG5cblx0LyoqXG5cdCAqIFdvcmtlciBpbnN0YWxsYXRpb24gZXZlbnQuXG5cdCAqIFNraXAgd2FpdGluZyB0byBmb3JjZSB1cGRhdGUuXG5cdCAqIERyb3AgYWxsIGNhY2hlIG9mIHRoZSB3b3JrZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEJyb3dzZXIgSW5zdGFsbEV2ZW50LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHZvaWRcblx0ICogXG5cdCAqL1xuXHRjb25zdCBpbnN0YWxsQ2FsbGJhY2sgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdCBwaXBlbGluZSA9IGNhY2hlQ2xlYXIoKTtcblx0XHRldmVudC53YWl0VW50aWwocGlwZWxpbmUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBXb3JrZXIgYWN0aXZhdGlvbiBldmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgQnJvd3NlciBFeHRlbmRhYmxlRXZlbnQuXG5cdCAqXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKiBcblx0ICovXG5cdGNvbnN0IGFjdGl2YXRlQ2FsbGJhY2sgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdCBwaXBlbGluZSA9IGNsaWVudHMuY2xhaW0oKVxuXHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcblxuXHRcdFx0XHRkYXRlLnNldFNlY29uZHMoZGF0ZS5nZXRTZWNvbmRzKCkgKyBXT1JLRVJfQ0FDSEVfTElGRVRJTUUpO1xuXG5cdFx0XHRcdGF3YWl0IGluaXRTdG9yYWdlKCk7XG5cdFx0XHRcdGF3YWl0IGRiUHV0KCdvcHRpb25zJywgJ2NhY2hlX3J1bGVzJywgeyBuZXh0X3B1cmdlOiBkYXRlLnRvR01UU3RyaW5nKCkgfSk7XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChhc3luYyAoZXJyb3IpID0+IHtcblx0XHRcdFx0Y29uc3QgY2xpZW50cyA9IGF3YWl0IHNlbGYuY2xpZW50cy5tYXRjaEFsbCgpO1xuXG5cdFx0XHRcdGNvbnN0IHByb21pc2VzID0gY2xpZW50cy5tYXAoY2xpZW50ID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWVzc2FnZUNsaWVudChjbGllbnQuaWQsIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdsb2dnZXInLFxuXHRcdFx0XHRcdFx0bWV0aG9kOiAnZXJyb3InLFxuXHRcdFx0XHRcdFx0Ym9keToge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlcmUgd2FzIGFuIGVycm9yIG9wZXJhdGluZyB3aXRoIEluZGV4ZWREQi4nLFxuXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyb3IsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0XHR9KTtcblx0XHRldmVudC53YWl0VW50aWwocGlwZWxpbmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW5kIHVwZGF0ZSBEQiBzY2hlbWEuXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0Y29uc3QgaW5pdFN0b3JhZ2UgPSBhc3luYyAoKSA9PiB7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0U1RPUkUgPSAnb3B0aW9ucycsXG5cdFx0XHRcdGRCT3BlblJlcXVlc3QgPSBpbmRleGVkREIub3BlbihEQl9OQU1FLCBEQl9WRVJTSU9OKTtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0ZEJPcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRjb25zdFxuXHRcdFx0XHRcdFx0ZGIgPSBldmVudC50YXJnZXQucmVzdWx0LFxuXHRcdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShTVE9SRSk7XG5cblx0XHRcdFx0XHRvYmplY3RTdG9yZS5jcmVhdGVJbmRleCgnbmV4dF9wdXJnZScsICduZXh0X3B1cmdlJywgeyB1bmlxdWU6IHRydWUgfSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0ZEJPcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRkQk9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogUmV0dXJuIGNvbm5lY3QgdG8gREIuXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0Y29uc3QgZ2V0Q29ubmVjdGlvbiA9IGFzeW5jICgpID0+IHtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBkQk9wZW5SZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oREJfTkFNRSwgREJfVkVSU0lPTik7XG5cblx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdGRCT3BlblJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0ZEJPcGVuUmVxdWVzdC5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChldmVudCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBEQiBlbnRyeS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0b3JhZ2UgVGhlIG5hbWUgb2Ygc3RvcmFnZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleSAgICAgVGhlIHN0b3JhZ2Uga2V5IHRvIHVzZS5cblx0ICogQHBhcmFtIHttaXhlZH0gIHZhbHVlICAgV2hhdCB0byBzdG9yZS5cblx0ICpcblx0ICogQHJldHVybiBQcm9taXNlXG5cdCAqL1xuXHRjb25zdCBkYlB1dCA9IGFzeW5jIChzdG9yYWdlLCBrZXkgPSBmYWxzZSwgdmFsdWUpID0+IHtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHRjb25uZWN0aW9uID0gYXdhaXQgZ2V0Q29ubmVjdGlvbigpLFxuXHRcdFx0XHRzdG9yYWdlT2JqZWN0ID0gY29ubmVjdGlvbi50cmFuc2FjdGlvbihbc3RvcmFnZV0sICdyZWFkd3JpdGUnKS5vYmplY3RTdG9yZShzdG9yYWdlKSxcblx0XHRcdFx0cmVzdWx0ID0gKGtleSkgPyBzdG9yYWdlT2JqZWN0LnB1dCh2YWx1ZSwga2V5KSA6IHN0b3JhZ2VPYmplY3QucHV0KHZhbHVlKTtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0cmVzdWx0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChldmVudC50YXJnZXQucmVzdWx0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChldmVudC50YXJnZXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXN1bHQub25lcnJvciA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZWplY3QoZXZlbnQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXR0ZXIgZm9yIERCIGVudHJ5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmFnZSBUaGUgbmFtZSBvZiBzdG9yYWdlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30ga2V5ICAgICBUaGUgc3RvcmFnZSBrZXkgdG8gdXNlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIFByb21pc2Vcblx0ICovXG5cdGNvbnN0IGRiR2V0ID0gYXN5bmMgKHN0b3JhZ2UsIGtleSkgPT4ge1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0XG5cdFx0XHRcdGNvbm5lY3Rpb24gPSBhd2FpdCBnZXRDb25uZWN0aW9uKCksXG5cdFx0XHRcdHN0b3JhZ2VPYmplY3QgPSBjb25uZWN0aW9uLnRyYW5zYWN0aW9uKFtzdG9yYWdlXSwgJ3JlYWR3cml0ZScpLm9iamVjdFN0b3JlKHN0b3JhZ2UpLFxuXHRcdFx0XHRyZXN1bHQgPSBzdG9yYWdlT2JqZWN0LmdldChrZXkpO1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQub25zdWNjZXNzID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVzdWx0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogV29ya2VyIGluY29taW5nIG1lc3NhZ2UgZXZlbnQgaGFuZGxlci5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgQnJvd3NlciBFeHRlbmRhYmxlRXZlbnQuXG5cdCAqXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0Y29uc3QgbWVzc2FnZUNhbGxiYWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0c3dpdGNoIChldmVudC5kYXRhLmNvbW1hbmQpIHtcblx0XHRcdGNhc2UgJ21lc3NpYVNraXBXYWl0aW5nJzpcblx0XHRcdFx0c2VsZi5za2lwV2FpdGluZygpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnbWVzc2lhVW5yZWdpc3RlclNlbGYnOlxuXHRcdFx0XHRzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZmV0Y2hDYWxsYmFjayk7XG5cdFx0XHRcdHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGluc3RhbGxDYWxsYmFjayk7XG5cdFx0XHRcdHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBhY3RpdmF0ZUNhbGxiYWNrKTtcblx0XHRcdFx0c2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbWVzc2FnZUNhbGxiYWNrKTtcblxuXHRcdFx0XHRjb25zdCBwaXBlbGluZSA9IFByb21pc2UuYWxsU2V0dGxlZChbXG5cdFx0XHRcdFx0dW5yZWdpc3RlclNlbGYoKSxcblx0XHRcdFx0XHRjYWNoZUNsZWFyKCksXG5cdFx0XHRcdF0pO1xuXG5cdFx0XHRcdGV2ZW50LndhaXRVbnRpbChwaXBlbGluZSk7XG5cblx0XHRcdFx0cGlwZWxpbmVcblx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlQ2xpZW50KGV2ZW50LnNvdXJjZS5pZCwge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnbG9nZ2VyJyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnbG9nJyxcblx0XHRcdFx0XHRcdFx0Ym9keTogW1xuXHRcdFx0XHRcdFx0XHRcdGBVbnJlZ2lzdGVyIHdvcmtlciByZXBvcnQ6ICR7b2JqZWN0Sm9pbihyZXN1bHRbMF0pfWAsXG5cdFx0XHRcdFx0XHRcdFx0YENhY2hlIGNsZWFyIHJlcG9ydDogJHtvYmplY3RKb2luKHJlc3VsdFsxXSl9YCxcblx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlQ2xpZW50KGV2ZW50LnNvdXJjZS5pZCwge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnbG9nZ2VyJyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnZXJyb3InLFxuXHRcdFx0XHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1NvbWV0aGluZyB3ZW50IHdyb25nIG9uIHdvcmtlciB1bnJlZ2lzdHJhdGlvbi4nLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJvcixcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdtZXNzaWFDYWNoZURlbGV0ZSc6XG5cdFx0XHRcdGNvbnN0XG5cdFx0XHRcdFx0Y2FjaGVEZWxldGVBbGlhc2VzID0gZXZlbnQuZGF0YS50eXBlcyxcblx0XHRcdFx0XHRjbGVhcmVkID0gUHJvbWlzZTtcblxuXHRcdFx0XHRjYWNoZUNsZWFyKGNhY2hlRGVsZXRlQWxpYXNlcylcblx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBUT0RPIC0gY2hlY2sgdGhhdCBhbGwga2V5cyBpbiByZXN1bHQgaGFzIHZhbHVlICd0cnVlJy5cblx0XHRcdFx0XHRcdG1lc3NhZ2VDbGllbnQoZXZlbnQuc291cmNlLmlkLCB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdsb2dnZXInLFxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdsb2cnLFxuXHRcdFx0XHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogYENhY2hlIGtleXMgYnkgYWxpYXMoZXMpICcke2NhY2hlRGVsZXRlQWxpYXNlcy5qb2luKCcsICcpfScgcHJvY2Vzc2VkLmAsXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0OiByZXN1bHQsXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0bWVzc2FnZUNsaWVudChldmVudC5zb3VyY2UuaWQsIHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ2xvZ2dlcicsXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ2Vycm9yJyxcblx0XHRcdFx0XHRcdFx0Ym9keToge1xuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdTb21ldGhpbmcgd2VudCB3cm9uZyBvbiBjYWNoZSBkZWxldGluZy4nLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJvcixcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuZmluYWxseSgoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xlYXJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0ZXZlbnQud2FpdFVudGlsKGNsZWFyZWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFVSTCBmZXRjaCBldmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgQnJvd3NlciBGZXRjaEV2ZW50LlxuXHQgKlxuXHQgKiBAcmV0dXJuIG1peGVkIFJlc3BvbnNlfGJvb2wgQm9vbCBpZiB3ZSBkbyBub3QgcHJveHkgdGhpcyByZXF1ZXN0LlxuXHQgKi9cblx0Y29uc3QgZmV0Y2hDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0aWYgKCFldmVudC5yZXF1ZXN0LnVybC5zdGFydHNXaXRoKHNlbGYubG9jYXRpb24ub3JpZ2luKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuXG5cdFx0aWYgKHVybC5wcm90b2NvbCAhPT0gJ2h0dHBzOicpIHtcblxuXHRcdFx0bWVzc2FnZUNsaWVudChldmVudC5jbGllbnRJZCwge1xuXHRcdFx0XHR0eXBlOiAnbG9nZ2VyJyxcblx0XHRcdFx0bWV0aG9kOiAnd2FybicsXG5cdFx0XHRcdGJvZHk6IHtcblx0XHRcdFx0XHRtZXNzYWdlOiAnTm9uIHNlY3VyZSByZXF1ZXN0IGlnbm9yZXMgYnkgd29ya2VyLicsXG5cdFx0XHRcdFx0VVJMOiBldmVudC5yZXF1ZXN0LnVybCxcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY2FjaGVLZXkgPSBnZXRDYWNoS2V5Rm9yUmVxdWVzdCh1cmwpO1xuXG5cdFx0Ly8gTm8gcnVsZXMgLSBubyBzZXJ2aW5nLlxuXHRcdGlmICghY2FjaGVLZXkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCBzZXJ2ZVJlcXVlc3QgPSBzaG91bGRTZXJ2ZVJlcXVlc3QoZXZlbnQucmVxdWVzdCk7XG5cblx0XHQvLyBObyBydWxlcyAtIG5vIHNlcnZpbmcuXG5cdFx0aWYgKCFzZXJ2ZVJlcXVlc3QpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZmFsc2UgPT09IENBQ0hFX0FWQUlMQUJMRSB8fCBmYWxzZSA9PT0gSU5ERVhFRF9EQl9BVkFJTEFCTEUpIHtcblx0XHRcdGV2ZW50LnJlc3BvbmRXaXRoKHNlcnZlRnJvbnRlbmRSZXF1ZXN0KGV2ZW50LCBjYWNoZUtleSkpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gY2FjaGVzLm1hdGNoKGV2ZW50LnJlcXVlc3QpXG5cdFx0XHQudGhlbigocmVzcG9uc2VDYWNoZWQpID0+IHtcblx0XHRcdFx0Ly8gb3V0IG9mIGNhY2hlLlxuXHRcdFx0XHRpZiAodHlwZW9mIHJlc3BvbnNlQ2FjaGVkID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHJldHVybiBzZXJ2ZUZyb250ZW5kUmVxdWVzdChldmVudCwgY2FjaGVLZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGZyb20gY2FjaGUuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHVwZGF0ZVJlc3BvbnNlSW5DYWNoZShldmVudC5yZXF1ZXN0LCByZXNwb25zZUNhY2hlZCwgY2FjaGVLZXkpXG5cdFx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2VDbGllbnQoZXZlbnQuY2xpZW50SWQsIHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAnbG9nZ2VyJyxcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdlcnJvcicsXG5cdFx0XHRcdFx0XHRcdFx0Ym9keToge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogYEZhaWwgdG8gdXBkYXRlIGNhY2hlIGZvciBVUkwgJHtldmVudC5yZXF1ZXN0LnVybH1gLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycm9yLFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGNhY2hlUHVyZ2UoKVxuXHRcdFx0XHRcdFx0LnRoZW4oKHB1cmdlZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAocHVyZ2VkKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZUNsaWVudChldmVudC5jbGllbnRJZCwge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogJ2xvZ2dlcicsXG5cdFx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdsb2cnLFxuXHRcdFx0XHRcdFx0XHRcdFx0Ym9keTogJ1dvcmtlciBjYWNoZSBiZWNhbWUgb3V0ZGF0ZWQgYW5kIHdhcyBjb21wbGV0ZWx5IHB1cmdlZC4nLFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlQ2xpZW50KGV2ZW50LmNsaWVudElkLCB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ2xvZ2dlcicsXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnZXJyb3InLFxuXHRcdFx0XHRcdFx0XHRcdGJvZHk6IHtcblx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdFcnJvciBvbiBjYWNoZSBwdXJnaW5nLicsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2VDYWNoZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0ZXZlbnQucmVzcG9uZFdpdGgocmVzcG9uc2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBGZXRjaCByZXF1ZXN0IGFuZCBjYWNoZSBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gIGV2ZW50ICAgIEJyb3dzZXIgRmV0Y2hFdmVudC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNhY2hlS2V5IEJyb3dzZXIgY2FjaGUga2V5IHZhbHVlIGZvciByZXF1ZXN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIFJlc3BvbnNlLlxuXHQgKi9cblx0Y29uc3Qgc2VydmVGcm9udGVuZFJlcXVlc3QgPSBhc3luYyAoZXZlbnQsIGNhY2hlS2V5KSA9PiB7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0Y2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihjYWNoZUtleSksXG5cdFx0XHRcdHJlc3BvbnNlRmV0Y2hlZCA9IGF3YWl0IGZldGNoKGV2ZW50LnJlcXVlc3QpO1xuXG5cdFx0XHRjb25zdFxuXHRcdFx0XHRyZXNwb25zZUNsb25lID0gcmVzcG9uc2VGZXRjaGVkLmNsb25lKCksXG5cdFx0XHRcdHJlc3BvbnNlUHJvbWlzZSA9IGNyZWF0ZVJlc3BvbnNlKFxuXHRcdFx0XHRcdHJlc3BvbnNlQ2xvbmUsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0J0xhc3QtRmV0Y2hlZC1Pbic6IG5ldyBEYXRlKCkudG9HTVRTdHJpbmcoKSxcblx0XHRcdFx0XHRcdCdGZXRjaC1FcnJvcic6IGZhbHNlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblxuXHRcdFx0Y29uc3Rcblx0XHRcdFx0cmVzcG9uc2VFZGl0ID0gYXdhaXQgcmVzcG9uc2VQcm9taXNlLFxuXHRcdFx0XHRyZXNwb25zZUVkaXRDbG9uZSA9IHJlc3BvbnNlRWRpdC5jbG9uZSgpO1xuXG5cdFx0XHRhd2FpdCBjYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2VFZGl0Q2xvbmUpO1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlRWRpdDtcblxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0bWVzc2FnZUNsaWVudChldmVudC5jbGllbnRJZCwge1xuXHRcdFx0XHR0eXBlOiAnbG9nZ2VyJyxcblx0XHRcdFx0bWV0aG9kOiAnZXJyb3InLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0bWVzc2FnZTogJ1JlcXVlc3QgZmFpbCcsXG5cdFx0XHRcdFx0cmVhc29uZTogZXJyLFxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiB0aGUgbmV0d29yayBjYWxsIGhhcyBiZWVuIHByb2Nlc3NlZCwgdGhlIGdpdmVuIHJlc3BvbnNlIGlzIHNlbnQgaGVyZVxuXHQgKiB0byDQuNGDIHVwZGF0ZWQgaWYgbmVlZGVkLiBUaGlzIGhhcHBlbnMgYWNjb3JkaW5nIHRvIHRoZSBmb2xsb3dpbmcgcnVsZXM6XG5cdCAqIDEuIElmIG9yaWdpbmFsIHJlc3BvbnNlIGNvbnRhaW5zIHRoZSBMYXN0LU1vZGlmaWVkIGhlYWRlciwgdGhlbiBpdCBpcyBhIHN0YXRpY1xuXHQgKiAgICBmaWxlLiBJbiB0aGlzIGNhc2UsIGEgbmV3IHJlcXVlc3QgaXMgY3JlYXRlZCBhcyBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIG9uZSBhbmRcblx0ICogICAgaGVhZGVyICdJZi1Nb2RpZmllZC1TaW5jZScgPSBMYXN0LU1vZGlmaWVkIHZhbHVlcyBiZWluZyBhZGRlZCB0byBpdC5cblx0ICogMi4gUmVxdWVzdCBleGVjdXRlcy5cblx0ICogMy4gSWYgc29tZXRoaW5nIHdlbnQgd3JvbmcgY2F0Y2hlZCBhbiBleGVwdGlvbiBhbmQgb3JpZ2luYWwgcmVxdWVzdCBleGVjdXRlZC5cblx0ICogICAgT25jZSBkb25lIHRvIGl0J3MgcmVzcG9uc2UgYWRkZWQgaGVhZGVyIEZldGNoLUVycm9yID0gdHJ1ZSB0byBwcmV2ZW50IGNvcnJlc3BvbmRpbmdcblx0ICogICAgcmVxdWVzdCBoZWFkZXJzIGZyb20gbW9kaWZpY2F0aW9uIGluIGZ1dHVyZS5cblx0ICogNC4gSGVhZGVyIExhc3QtRmV0Y2hlZC1PbiA9IG5vdyBhZGRlZCB0byByZXNwb25zZS5cblx0ICogNS4gUmVzcG9uc2UgYmVpbmcgcHV0dGVkIGludG8gY2FjaGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7UmVxdWVzdH0gIHJlcXVlc3QgIFJlcXVlc3Qgb2JqZWN0IHRoYXQgd2FzIHNlcnZlZCBmcm9tIGNhY2hlLlxuXHQgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgdGhhdCB3YXMgc2VydmVkIGZyb20gY2FjaGUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSAgIGNhY2hlS2V5IEJyb3dzZXIgY2FjaGUga2V5IHZhbHVlIG1hdGNoZWQgZm9yIHJlcXVlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0Y29uc3QgdXBkYXRlUmVzcG9uc2VJbkNhY2hlID0gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlLCBjYWNoZUtleSkgPT4ge1xuXG5cdFx0Y29uc3Rcblx0XHRcdGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oY2FjaGVLZXkpLFxuXHRcdFx0dXJsID0gbmV3IFVSTChyZXF1ZXN0LnVybCksXG5cdFx0XHRyZXF1ZXN0TGFzdE1vZGlmaWVkID0gKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdMYXN0LU1vZGlmaWVkJykpIHx8IGZhbHNlLFxuXHRcdFx0ZmV0Y2hFcnJvciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdGZXRjaC1FcnJvcicpLFxuXHRcdFx0ZXhjZXB0aW9uID0gdXJsLnBhdGhuYW1lLmluY2x1ZGVzKCdmb250cy5nc3RhdGljLmNvbScpO1xuXG5cdFx0bGV0IHVwZGF0ZWRSZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSgpO1xuXG5cdFx0Ly8gSXQgaXMgOTklIHN0YXRpYyBmaWxlIG9uIHNhbWUgb3JpZ2luLlxuXHRcdC8vIFRoZSBtYWluIGhlcmUgaXMgdGhhdCB3ZSBjYW4gc2FmZWx5IHNlbmQgSWYtTW9kaWZpZWQtU2luY2UgaGVhZGVyLlxuXHRcdGlmIChyZXF1ZXN0TGFzdE1vZGlmaWVkICYmIGZldGNoRXJyb3IgPT09IGZhbHNlICYmIGV4Y2VwdGlvbiA9PT0gZmFsc2UpIHtcblx0XHRcdHN3aXRjaCAocmVxdWVzdC5tZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAnR0VUJzpcblx0XHRcdFx0Y2FzZSAnSEVBRCc6XG5cdFx0XHRcdFx0dXBkYXRlZFJlcXVlc3QgPSBuZXcgUmVxdWVzdChyZXF1ZXN0LCB7XG5cdFx0XHRcdFx0XHRtb2RlOiAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0XHRcdFx0aGVhZGVyczogcmVxdWVzdC5oZWFkZXJzLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHVwZGF0ZWRSZXF1ZXN0LmhlYWRlcnMuc2V0KCdJZi1Nb2RpZmllZC1TaW5jZScsIHJlcXVlc3RMYXN0TW9kaWZpZWQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB1cGRhdGUgPSBzaG91bGRVcGRhdGVSZXNwb25zZShyZXF1ZXN0LCByZXNwb25zZSk7XG5cdFx0XHRpZiAoIXVwZGF0ZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnb2snKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0cmVzcG9uc2VGZXRjaGVkID0gYXdhaXQgZmV0Y2godXBkYXRlZFJlcXVlc3QpLFxuXHRcdFx0XHRyZXNwb25zZUNsb25lID0gcmVzcG9uc2VGZXRjaGVkLmNsb25lKCk7XG5cblx0XHRcdGlmICgyMDAgPT09IHJlc3BvbnNlRmV0Y2hlZC5zdGF0dXMpIHtcblx0XHRcdFx0Y29uc3QgcmVzcG9uc2VQcm9taXNlID0gY3JlYXRlUmVzcG9uc2UoXG5cdFx0XHRcdFx0cmVzcG9uc2VDbG9uZSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQnTGFzdC1GZXRjaGVkLU9uJzogbmV3IERhdGUoKS50b0dNVFN0cmluZygpLFxuXHRcdFx0XHRcdFx0J0ZldGNoLUVycm9yJzogZmFsc2UsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXNwb25zZVByb21pc2UudGhlbigocmVzcG9uc2UpID0+IGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwb25zZSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnb2snKTtcblxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cblx0XHRcdGNvbnN0XG5cdFx0XHRcdHJlc3BvbnNlRmV0Y2hlZCA9IGF3YWl0IGZldGNoKHJlcXVlc3QpLFxuXHRcdFx0XHRyZXNwb25zZUNsb25lID0gcmVzcG9uc2VGZXRjaGVkLmNsb25lKCksXG5cdFx0XHRcdHJlc3BvbnNlUHJvbWlzZSA9IGNyZWF0ZVJlc3BvbnNlKFxuXHRcdFx0XHRcdHJlc3BvbnNlQ2xvbmUsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0J0xhc3QtRmV0Y2hlZC1Pbic6IG5ldyBEYXRlKCkudG9HTVRTdHJpbmcoKSxcblx0XHRcdFx0XHRcdCdGZXRjaC1FcnJvcic6IHRydWUsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRyZXNwb25zZVByb21pc2UudGhlbigocmVzcG9uc2UpID0+IGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwb25zZSkpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29tbXVuaWNhdG9yIHdpdGggcGFyZW50IHNjcmlwdC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNsaWVudElkIFdvcmtlciBzdGFydGVyLlxuXHQgKiBAcGFyYW0ge29iamVjdH0gbXNnICAgICAgTWVzc2FnZSBpdHNlbGYuXG5cdCAqXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0Y29uc3QgbWVzc2FnZUNsaWVudCA9IGFzeW5jIChjbGllbnRJZCwgbXNnKSA9PiB7XG5cdFx0Y29uc3QgY2xpZW50ID0gYXdhaXQgY2xpZW50cy5nZXQoY2xpZW50SWQpO1xuXHRcdGNsaWVudC5wb3N0TWVzc2FnZShtc2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVucmVnaXN0ZXIgdGhlIHdvcmtlci5cblx0ICpcblx0ICogQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cdGNvbnN0IHVucmVnaXN0ZXJTZWxmID0gYXN5bmMgKCkgPT4ge1xuXHRcdHJldHVybiBhd2FpdCBzZWxmLnJlZ2lzdHJhdGlvbi51bnJlZ2lzdGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRmluZCBhbmQgcmV0dXJuIHByb3BwZXIgY2FjaGUga2V5IGZvciByZXF1ZXN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3QgTmV0d29yayByZXF1ZXN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHN0cmluZ3xib29sIEtleSBuYW1lIG9yIGZhbHNlIGlmIHJlcXVlc3QgZG9lcyBub3QgbWF0Y2ggcnVsZXMgYW5kIHNob3VsZCBub3QgYmUgY2FjaGVkIGV2ZXIuXG5cdCAqL1xuXHRjb25zdCBnZXRDYWNoS2V5Rm9yUmVxdWVzdCA9ICh1cmwpID0+IHtcblxuXHRcdGxldFxuXHRcdFx0Y2FjaGVLZXkgPSBmYWxzZSxcblx0XHRcdGNhY2hlQWxpYXMgPSBmYWxzZTtcblxuXHRcdGNvbnN0XG5cdFx0XHRpc0ltYWdlID0gdXJsLnBhdGhuYW1lLm1hdGNoKC8oPzw9XFwuKSg/OnBuZ3xqcGVnfGdpZnxzdmd8d2VicCkkLyksXG5cdFx0XHRpc0ZvbnQgPSB1cmwucGF0aG5hbWUubWF0Y2goLyg/PD1cXC4pKD86d29mZjIpJC8pLFxuXHRcdFx0aXNTdHlsZSA9IHVybC5wYXRobmFtZS5tYXRjaCgvKD88PVxcLikoPzpjc3MpJC8pLFxuXHRcdFx0aXNTY3JpcHQgPSB1cmwucGF0aG5hbWUubWF0Y2goLyg/PD1cXC4pKD86anMpJC8pO1xuXG5cdFx0c3dpdGNoICh0cnVlKSB7XG5cdFx0XHRjYXNlIGlzSW1hZ2UgIT09IG51bGw6XG5cdFx0XHRcdGNhY2hlQWxpYXMgPSBgaW1hZ2VzLyR7aXNJbWFnZVswXX1gO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgaXNGb250ICE9PSBudWxsOlxuXHRcdFx0XHRjYWNoZUFsaWFzID0gYGZvbnRzLyR7aXNGb250WzBdfWA7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBpc1N0eWxlICE9PSBudWxsOlxuXHRcdFx0XHRjYWNoZUFsaWFzID0gYHN0eWxlcy8ke2lzU3R5bGVbMF19YDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIGlzU2NyaXB0ICE9PSBudWxsOlxuXHRcdFx0XHRjYWNoZUFsaWFzID0gYHNjcmlwdHMvJHtpc1NjcmlwdFswXX1gO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRpZiAoY2FjaGVBbGlhcykge1xuXHRcdFx0V09SS0VSX0NBQ0hFU1tjYWNoZUFsaWFzXSA9IGAke1dPUktFUl9IT1NUfS92JHtXT1JLRVJfQ0FDSEVfVkVSU0lPTn0vJHtjYWNoZUFsaWFzfWA7XG5cdFx0XHRjYWNoZUtleSA9IFdPUktFUl9DQUNIRVNbY2FjaGVBbGlhc107XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhY2hlS2V5O1xuXHR9XG5cblx0LyoqXG5cdCAqIERlbGV0ZSBjYWNoZSBlbnRyaWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2FycmF5fSBjYWNoZURlbGV0ZUFsaWFzZXMgQXJyYXkgb2YgY2FjaGUga2V5cyBhbGlhc2VzIHRvIGtpbGwuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbXB0eSBhcnJheSBraWxscyBhbGwgY2FjaGVzIGVudHJpZXMuXG5cdCAqXG5cdCAqIEByZXR1cm4gUHJvbWlzZVxuXHQgKi9cblx0Y29uc3QgY2FjaGVDbGVhciA9IGFzeW5jIChjYWNoZURlbGV0ZUFsaWFzZXMgPSBbXSkgPT4ge1xuXHRcdGNvbnN0IGtleUxpc3QgPSBhd2FpdCBnZXRXb3JrZXJDYWNoZUtleXNCeUFMaWFzKGNhY2hlRGVsZXRlQWxpYXNlcyk7XG5cblx0XHRpZiAoa2V5TGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBrZXlMaXN0Lm1hcChhc3luYyAoa2V5KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHJlbW92ZWQgPSBhd2FpdCBjYWNoZXMuZGVsZXRlKGtleSk7XG5cdFx0XHRcdHJldHVybiAocmVtb3ZlZCkgPyBgS2V5ICR7a2V5fSBzdWNjZXNmdWxseSBkZWxldGVkLmAgOiBgRmFpbCB0byBkZWxldGUgJHtrZXl9YDtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocmVzdWx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0YWxpYXNlcyA9IChjYWNoZURlbGV0ZUFsaWFzZXMubGVuZ3RoID4gMCkgPyBjYWNoZURlbGV0ZUFsaWFzZXMuam9pbignLCAnKSA6ICdBbGwnLFxuXHRcdFx0XHRyZXN1bHQgPSBbUHJvbWlzZS5yZXNvbHZlKGBObyBrZXlzIGZvdW5kIHRvIGRlbGV0ZSBieSBnaXZlbiBhbGlhc2VzOiAnJHthbGlhc2VzfSdgKV07XG5cblx0XHRcdHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChyZXN1bHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhcnMgdGhlIGNhY2hlIGNvbXBsZXRlbHkgb24gYSBzY2hlZHVsZVxuXHQgKlxuXHQgKiBAcmV0dXJuIFByb21pc2Vcblx0ICovXG5cdGNvbnN0IGNhY2hlUHVyZ2UgPSBhc3luYyAoKSA9PiB7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Rcblx0XHRcdFx0Y2FjaGVSdWxlcyA9IGF3YWl0IGRiR2V0KCdvcHRpb25zJywgJ2NhY2hlX3J1bGVzJyksXG5cdFx0XHRcdG5vdyA9IG5ldyBEYXRlKCksXG5cdFx0XHRcdG5leHRQdXJnZSA9IG5ldyBEYXRlKGNhY2hlUnVsZXMubmV4dF9wdXJnZSk7XG5cblx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRcdFx0aWYgKChuZXh0UHVyZ2UgLSBub3cpID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjYWNoZUNsZWFyKClcblx0XHRcdFx0XHQudGhlbihhc3luYyAocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcblxuXHRcdFx0XHRcdFx0ZGF0ZS5zZXRTZWNvbmRzKGRhdGUuZ2V0U2Vjb25kcygpICsgV09SS0VSX0NBQ0hFX0xJRkVUSU1FKTtcblx0XHRcdFx0XHRcdHJldHVybiBhd2FpdCBkYlB1dCgnb3B0aW9ucycsICdjYWNoZV9ydWxlcycsIHsgbmV4dF9wdXJnZTogZGF0ZS50b0dNVFN0cmluZygpIH0pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogU2VhcmNoIGJyb3dzZXIgY2FjaGUga2V5cyBieSBnaXZlbiBhbGlhcyBvZiBXT1JLRVJfQ0FDSEVTLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ1tdfSBrZXlBbGlhcyBBcyBpdCBzYWlkLlxuXHQgKlxuXHQgKiBAcmV0dXJuIGFycmF5XG5cdCAqL1xuXHRjb25zdCBnZXRXb3JrZXJDYWNoZUtleXNCeUFMaWFzID0gYXN5bmMgKGtleUFsaWFzID0gW10pID0+IHtcblx0XHRjb25zdCBrZXlMaXN0ID0gYXdhaXQgY2FjaGVzLmtleXMoKTtcblxuXHRcdGlmIChrZXlBbGlhcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBrZXlMaXN0RmlsdGVyZWQgPSBrZXlMaXN0LmZpbHRlcigodmFsdWUpID0+IHtcblx0XHRcdFx0Y29uc3QgY2FjaGVLZXlBbGlhcyA9IGdldEtleUJ5VmFsdWUoV09SS0VSX0NBQ0hFUywgdmFsdWUpO1xuXHRcdFx0XHRyZXR1cm4ga2V5QWxpYXMuaW5jbHVkZXMoY2FjaGVLZXlBbGlhcyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGtleUxpc3RGaWx0ZXJlZDtcblx0XHR9XG5cblx0XHRyZXR1cm4ga2V5TGlzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IHJlc3BvbnNlLiBBbiBleGlzdGluZyByZXNwb25zZSBjYW4gYmUgc2VudC5cblx0ICpcblx0ICogQHBhcmFtIHtSZXNwb25zZX0gYmFzZVJlc3BvbnNlIFVzZWQgYXMgb3JpZ2luIHJlc3BvbnNlIGlmIHBhc3NlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9ICAgZXh0cmFIZWFkZXJzIEhlYWRlcnMgdG8gdXNlIGluIG5ldyByZXNwb25zZVxuXHQgKlxuXHQgKiBAcmV0dXJuIFByb21pc2UuXG5cdCAqL1xuXHRjb25zdCBjcmVhdGVSZXNwb25zZSA9IGFzeW5jIChiYXNlUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKSwgZXh0cmFIZWFkZXJzID0ge30pID0+IHtcblxuXHRcdGNvbnN0XG5cdFx0XHRyZXNwb25zZUNsb25lID0gYmFzZVJlc3BvbnNlLmNsb25lKCksXG5cdFx0XHRoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVzcG9uc2VDbG9uZS5oZWFkZXJzKSxcblx0XHRcdGJvZHkgPSBhd2FpdCByZXNwb25zZUNsb25lLmJsb2IoKTtcblxuXHRcdGZvciAoY29uc3QgW2hlYWRlck5hbWUsIGhlYWRlclZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhleHRyYUhlYWRlcnMpKSB7XG5cdFx0XHRoZWFkZXJzLnNldChoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwge1xuXHRcdFx0c3RhdHVzOiBiYXNlUmVzcG9uc2Uuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogYmFzZVJlc3BvbnNlLnN0YXR1c1RleHQsXG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHQvKipcblx0ICogRmlsdGVyIFVSTHMgYW5kIHJlZmVycmVyIGFnYWluc3QgY2FjaGFibGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdCBSZXF1c3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gYm9vbGVhblxuXHQgKi9cblx0Y29uc3Qgc2hvdWxkU2VydmVSZXF1ZXN0ID0gKHJlcXVlc3QpID0+IHtcblxuXHRcdGNvbnN0XG5cdFx0XHRyZWZlcnJlck1hdGNoID0gUkVTVFJJQ1RfUkVGRVJSRVJTLmZpbHRlcigocGF0dGVybikgPT4gcmVxdWVzdC5yZWZlcnJlci5tYXRjaChwYXR0ZXJuKSksXG5cdFx0XHR1cmxNYXRjaCA9IFJFU1RSSUNUX1JPVVRFUy5maWx0ZXIoKHBhdHRlcm4pID0+IHJlcXVlc3QudXJsLm1hdGNoKHBhdHRlcm4pKTtcblxuXHRcdHJldHVybiByZWZlcnJlck1hdGNoLmxlbmd0aCA9PT0gMCAmJiB1cmxNYXRjaC5sZW5ndGggPT09IDA7XG5cdH07XG5cblx0LyoqXG5cdCAqIERldGVjdG9yIHdoZXRoZXIgcmVzcG9uc2UgaXMgb3V0ZGF0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7UmVxdWVzdH0gIHJlcXVlc3QgIFJlcXVlc3QuXG5cdCAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIFJlc3BvbnNlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIGJvb2xlYW5cblx0ICovXG5cdGNvbnN0IHNob3VsZFVwZGF0ZVJlc3BvbnNlID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG5cblx0XHRjb25zdCByZXF1ZXN0TGFzdEZldGNoZWRPbiA9IChyZXNwb25zZS5oZWFkZXJzLmdldCgnTGFzdC1GZXRjaGVkLU9uJykpIHx8IGZhbHNlO1xuXG5cdFx0aWYgKHJlcXVlc3RMYXN0RmV0Y2hlZE9uKSB7XG5cdFx0XHRjb25zdFxuXHRcdFx0XHRkZXN0aW5hdGlvbiA9IHJlcXVlc3QuZGVzdGluYXRpb24sXG5cdFx0XHRcdHJlc3BvbnNlQWdlU2Vjb25kcyA9IChuZXcgRGF0ZSgpIC0gbmV3IERhdGUocmVxdWVzdExhc3RGZXRjaGVkT24pKSAvIDEwMDA7XG5cblx0XHRcdHJldHVybiByZXNwb25zZUFnZVNlY29uZHMgPiBXT1JLRVJfQ0FDSEVfSVRFTV9MSUZFVElNRVtkZXN0aW5hdGlvbl0gfHwgV09SS0VSX0NBQ0hFX0lURU1fTElGRVRJTUVfREVGQVVMVDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBKb2luIG9iamVjdCdzIGtleSBhbmQgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBXaGF0IHRvIGpvaW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBLZXkgZ2x1ZSB2YWx1ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gS2V5IGdsdWUgdmFsdWUgc2VwYXJhdG9yXG5cdCAqXG5cdCAqIEByZXR1cm4gc3RyaW5nXG5cdCAqL1xuXHRjb25zdCBvYmplY3RKb2luID0gZnVuY3Rpb24gKG9iamVjdCwgZ2x1ZSA9ICctJywgc2VwYXJhdG9yID0gJzsgJykge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRyZXR1cm4gW2tleSwgKHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ2FycmF5JykgPyBvYmplY3Rba2V5XS5qb2luKCcsICcpIDogb2JqZWN0W2tleV1dLmpvaW4oZ2x1ZSk7XG5cdFx0fSkuam9pbihzZXBhcmF0b3IpO1xuXHR9XG5cblx0Y29uc3QgZ2V0S2V5QnlWYWx1ZSA9IChvYmplY3QsIHZhbHVlKSA9PiB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCkuZmluZChrZXkgPT4gb2JqZWN0W2tleV0gPT09IHZhbHVlKTtcblx0fVxuXG5cdHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGluc3RhbGxDYWxsYmFjayk7XG5cdHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBhY3RpdmF0ZUNhbGxiYWNrKTtcblx0c2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGZldGNoQ2FsbGJhY2spO1xuXHRzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtZXNzYWdlQ2FsbGJhY2spO1xufSgpKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTY3JpcHRzXG5pbXBvcnQgXCIuLi9qcy93b3JrZXIuanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
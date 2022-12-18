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

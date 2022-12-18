/**
 * Register and start web workers.
 *
 * @return void.
 */
const workerDispatcher = (() => {
	if ('serviceWorker' in navigator) {

		navigator.serviceWorker.addEventListener('message', (message) => {
			const info = message.data;

			if (info.type === 'logger') {
				MessiaExt.logger[info.method](info.body);
			}
		});

		if (messiaVars.pwaEnable === 1) {

			const
				cacheAvailable = 'caches' in self,
				indexedDbAvailable = 'indexedDB' in self;

			const promptUpdate = (registration) => {
				const choice = window.confirm(messiaVars.messages.workerUpdate);

				if (choice) {
					navigator.serviceWorker.addEventListener('controllerchange', () => {
						// nothing for now.
					});
				}

				if (registration && registration.waiting) {
					registration.waiting.postMessage({ command: 'messiaSkipWaiting' });
				}
			};

			navigator
				.serviceWorker
				.register(messiaVars.workerUrl, { scope: '/' })
				.then((registration) => {
					MessiaExt.logger.log(`Worker registration succeeded. Scope is ${registration.scope}`);

					if (false === indexedDbAvailable) {
						MessiaExt.logger.warn('Worker will skip caching cause the browser does not support indexedDB.');
					} else if (false === cacheAvailable) {
						MessiaExt.logger.warn('Worker will skip caching cause the browser does not support cache storage.');
					}

					if (registration.waiting) {
						promptUpdate(registration);
					}
				})
				.catch((error) => {
					MessiaExt.logger.error('Worker registration failed with ' + error);
				});

		} else {
			navigator
				.serviceWorker
				.getRegistrations().then((registrations) => {

					if (registrations.length) {
						for (let registration of registrations) {
							registration.active.postMessage({ command: 'messiaUnregisterSelf' });
						}
					}
				});
		}
	}
})();

export default workerDispatcher;
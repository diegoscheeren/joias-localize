/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    ready() {
      // Service worker is active
    },
    registered() {
      // Service worker has been registered
    },
    cached() {
      // Content has been cached for offline use
    },
    updatefound() {
      // Update found service worker
    },
    updated(registration) {
      // Updated service worker
      const newWorker = registration.waiting || registration.installing;

      newWorker && window.$snackbar && window.$snackbar.show({
        title: 'Novo conteúdo disponível',
        duration: 30000,
        action: {
          title: 'Atualizar',
          onPress: () => newWorker.postMessage({ action: 'skipWaiting' }),
        },
      });
    },
    offline() {
      // No internet connection found. App is running in offline mode
    },
    error(error) {
      // Error during service worker registration
    },
  });

  // The event listener that is fired when the service worker updates
  // Here we reload the page
  if (navigator.serviceWorker) {
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
}

// const channel = new BroadcastChannel('sw');
// channel.addEventListener('message', event => {
//   console.log('Recebido do service-worker', event.data);
// });
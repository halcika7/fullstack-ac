/* eslint-disable no-console */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

async function registerValidSW(swUrl: string, config?: Config) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;
      installingWorker.onstatechange = () => {
        if (installingWorker.state !== 'installed') return;
        if (navigator.serviceWorker.controller && config?.onUpdate) {
          config.onUpdate(registration);
        } else if (config?.onSuccess) {
          config.onSuccess(registration);
        }
      };
    };
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

async function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const response = await fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    });
    const contentType = response.headers.get('content-type');

    if (
      response.status === 404 ||
      (contentType != null && contentType.indexOf('javascript') === -1)
    ) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  } catch {
    console.log(
      'No internet connection found. App is running in offline mode.'
    );
  }
}

export async function unregister() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
    } catch (error) {
      console.error((error as Error).message);
    }
  }
}

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        try {
          await navigator.serviceWorker.ready;
        } catch (error) {
          console.error(
            '🚀 ~ file: serviceWorkerRegistration.ts ~ line 141 ~ navigator.serviceWorker.ready.then ~ error',
            error
          );
        }
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

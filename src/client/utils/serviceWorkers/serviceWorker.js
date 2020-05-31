const publicKey = 'BIGpGEIxbW_928p-DVbSsti7ak6YY6bNU-_tukxMnIdz2Mt1i85TclZqCbkuMd3_wbjamopzZzd9hvL5Rj2yLwE';

const urlBase64ToUint8Array = (base64String) => {
  // eslint-disable-next-line no-mixed-operators
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

async function requestNotificationPermission() {
  const permission = await window.Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permission not granted for notification ');
  }
}

async function registerValidSW(swUrl) {
  return navigator.serviceWorker.register(swUrl);
}

export function register() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', async () => {
      const swUrl = `${window.location.origin || process.env.PUBLIC_URL}/sw.js`;
      requestNotificationPermission();
      const register = await registerValidSW(swUrl);

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch(`${process.env.API_URL}/${process.env.API_VERSION}/users/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch((err) => console.log(err));

    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

/* eslint-disable no-restricted-globals */

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log(data);
    self.registration.showNotification(data.title, {
      'body': data.message,
      'icon': 'https://kaizen-medical.s3.amazonaws.com/assets/kaizen-icon.png',
    });
  } else {
    console.log('Push event but no data');
  }
});

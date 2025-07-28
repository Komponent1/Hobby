import { useEffect } from 'react';

export const useNotification = () => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  function createNotification(title: string, options?: NotificationOptions) {
    return new Notification(title, options);
  }

  const notify = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      createNotification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  return {
    notify,
  };
};

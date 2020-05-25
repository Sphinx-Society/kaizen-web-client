import { useState, useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const [eventState, setEventState] = useState('offDocument');

  const onMouseDown = (event) => {
    if (ref.current) {
      const { target } = event;
      const alert = document.getElementById('feedback-alert-container');

      const condition = alert ? !ref.current.contains(target) && !alert.contains(target) : !ref.current.contains(target);

      if (condition) {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    setEventState('onDocument');
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      setEventState('offDocument');
    };
  }, []);

  return eventState;
};

export default useOutsideClick;

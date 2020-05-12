import { useState, useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const [eventState, setEventState] = useState('offDocument');
  const onMouseDown = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
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

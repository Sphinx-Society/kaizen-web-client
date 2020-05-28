import { useState } from 'react';

const useForm = (initialState, submitCallback) => {
  const [state, setState] = useState({ ...initialState });

  const handleOnChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setState({ ...state, [name]: val });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof submitCallback === 'function') {
      submitCallback(state);
    }
    setState(initialState);
  };

  return [state, handleOnChange, handleSubmit];

};

export default useForm;

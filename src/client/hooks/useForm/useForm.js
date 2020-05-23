import { useState } from 'react';

const useForm = (initialState, submitCallback) => {
  const [state, setState] = useState(initialState);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
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

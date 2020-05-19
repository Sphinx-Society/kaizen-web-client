import { useState } from 'react';

const useInputsChange = (action) => {
  const [inputsState, setInputsState] = useState({
    user: '',
    password: '',
  });
  const handleChangeInput = (e) => {
    setInputsState({ ...inputsState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    action(inputsState);
    setInputsState({
      user: '',
      password: '',
    });
  };

  return [inputsState, handleChangeInput, handleSubmitForm];

};

export default useInputsChange;

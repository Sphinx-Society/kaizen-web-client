import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import FormErrorMessage from '../../atoms/FormErrorMessage/FormErrorMessage';
import { login } from '../../../redux/user/user.actions.requests';
import useForm from '../../../hooks/useForm/useForm';

import Logo from '../../../assets/images/Logo.png';
import './LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();

  const { isLoading, feedback } = useSelector((state) => state.feedback);

  const isError = feedback.type === 'error';

  const submitCallback = (data) => dispatch(login(data));

  const initialFormState = { user: '', password: '' };
  const [state, handleOnChange, handleOnSubmit] = useForm(initialFormState, submitCallback);

  return (
    <div data-test='login-form-container' className='form-container'>
      <div className='login-logo'>
        <img data-test='login-form-logo' src={Logo} alt='brandLogo' />
        <h2>Kaizen</h2>
      </div>
      <form
        data-test='login-form'
        className='login-form'
        onSubmit={handleOnSubmit}
      >
        <div className='login-form__inputs-container'>
          <TextInput
            data-test='login-input-user'
            placeholder='Usuario'
            id='first'
            required={true}
            inputName='user'
            value={state.user}
            onChange={handleOnChange}
            disabled={isLoading}
          />
          <TextInput
            data-test='login-input-pass'
            placeholder='Contraseña'
            type='password'
            id='second'
            disabled={isLoading}
            required={true}
            inputName='password'
            value={state.password}
            onChange={handleOnChange}
          />
        </div>
        {isError && <FormErrorMessage>{feedback.message}</FormErrorMessage>}
        <Button
          data-test='login-form-button'
          disabled={isLoading}
          onClick={() => null}
          color='primary'
          type='submit'
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

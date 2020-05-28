import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import FormErrorMessage from '../../atoms/FormErrorMessage/FormErrorMessage';
import Logo from '../../../assets/images/Logo.png';

import useForm from '../../../hooks/useForm/useForm';
import { login } from '../../../redux/user/user.actions.requests';

import './LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();

  const { isLoading, feedback } = useSelector((state) => state.feedback);
  const [isError, setIsError] = React.useState(false);

  const initialFormState = { username: '', password: '' };
  const submitCallback = (data) => dispatch(login(data));
  const [state, handleOnChange, handleOnSubmit] = useForm(initialFormState, submitCallback);

  React.useEffect(() => {
    setIsError(Boolean(feedback.type));
  }, [feedback]);

  return (
    <div data-test='login-form-container' className='form-container'>
      <div className='login-logo'>
        <img data-test='login-form-logo' src={Logo} alt='brandLogo' />
        <h2>Kaizen</h2>
      </div>
      <form
        data-test='login-form'
        className='login-form'
      >
        <div className='login-form__inputs-container'>
          {isError && <FormErrorMessage>{feedback.message}</FormErrorMessage>}
          <TextInput
            data-test='login-input-user'
            placeholder='Usuario'
            id='username'
            required={true}
            inputName='username'
            value={state.username}
            onChange={handleOnChange}
            disabled={isLoading}
          />
          <TextInput
            data-test='login-input-pass'
            placeholder='Contraseña'
            type='password'
            id='current-password'
            disabled={isLoading}
            required={true}
            inputName='password'
            value={state.password}
            onChange={handleOnChange}
          />
        </div>
        <Button
          data-test='login-form-button'
          disabled={isLoading}
          onClick={handleOnSubmit}
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

import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Logo from '../../../assets/images/Logo.png';

import useForm from '../../../hooks/useForm/useForm';
import { login } from '../../../redux/user/user.actions.requests';
import { main } from '../../../routes/paths';

import './LoginForm.scss';

const LoginForm = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.feedback);

  const initialFormState = { username: '', password: '' };
  const submitCallback = (data) => {
    dispatch(login(data))
      .then(() => push(main()));
  };
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
      >
        <div className='login-form__inputs-container'>
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

export default withRouter(LoginForm);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as loginActions from '../../../redux/actions/loginActions';
import './LoginForm.scss';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import ErrorForm from '../../atoms/ErrorInput/ErrorForm';
import Logo from '../../../assets/images/Logo.png';
import useInputsChange from '../../../hooks/useLoginForm/useLoginForm';

const { onLoginSubmit } = loginActions;
const LoginForm = (props) => {
  const { onLoginSubmit, loading, error } = props;
  const [inputsState, handleInputChange, handleSubmitForm] = useInputsChange(onLoginSubmit);

  return (
    <div data-test='login-form-container' className='form-container'>
      <div className='login-logo'>
        <img data-test='login-form-logo' src={Logo} alt='brandLogo' />
        <h2>Kaizen</h2>
      </div>
      <form data-test='login-form' className='login-form' onSubmit={handleSubmitForm}>
        <div className='login-form__inputs-container'>
          <TextInput
            data-test='login-input-user'
            placeholder='Usuario'
            id='first'
            required={true}
            inputName='user'
            value={inputsState.user}
            onChange={handleInputChange}
            disabled={loading}
          />
          <TextInput
            data-test='login-input-pass'
            placeholder='Contraseña'
            type='password'
            id='second'
            disabled={loading}
            required={true}
            inputName='password'
            value={inputsState.password}
            onChange={handleInputChange}
          />
        </div>
        { error && <ErrorForm />}
        <Button
          data-test='login-form-button'
          disabled={loading}
          onClick={() => null}
          color='primary'
          type='submit'
        >
          {' '}
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = ({ loginReducers }) => {
  return { loginReducers };
};
const mapDispatchToProps = {
  onLoginSubmit,
};
LoginForm.propTypes = {
  /**
   * The form submit async action
   */
  onLoginSubmit: PropTypes.func,
  /**
   * The loading reducer state
   */
  loading: PropTypes.bool,
  /**
   * The error reducer state
   */
  error: PropTypes.string,
};
LoginForm.defaultProps = {
  loading: false,
  error: '',
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

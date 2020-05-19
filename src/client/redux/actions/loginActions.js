/* eslint-disable import/prefer-default-export */
import { LOADING, ERROR, LOGIN } from '../types/loginTypes';

export const onLoginSubmit = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const autenticate = await true;
    dispatch({
      type: LOGIN,
      payload: autenticate,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Usuario o contraseña invalida',
    });
  }

};


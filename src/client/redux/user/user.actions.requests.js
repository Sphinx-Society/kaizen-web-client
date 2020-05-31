import * as userActions from './user.actions';
import * as feedbackActions from '../feedback/feedback.actions';
import UserService from '../../services/User';

import { setIsLoading, setErrorFeedback } from '../feedback/feedback.utils';

export const login = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    await User.login(data);
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const listUsers = (page = 1, documentId, role) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const User = new UserService();

  try {
    const {
      totalPages,
      currentPage,
      totalUsers,
      users,
    } = await User.listUsers(page, documentId, role);
    dispatch(userActions.setUsers({
      users,
      totalPages,
      currentPage,
      totalUsers,
    }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const getUser = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  try {
    const user = await User.getUser(data);
    dispatch(userActions.setUser({ user }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const getProfile = (id) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  try {
    const user = await User.getProfile(id);
    dispatch(userActions.setUser({ user }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const createUser = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    await User.newUser(data);
    await dispatch(listUsers());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Usuario creado exitosamente',
        type: 'success',
      },
    }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const createUsers = (csv) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    const link = await User.createUsers(csv);
    if (!link) {
      dispatch(feedbackActions.setFeedback({
        feedback: {
          message: 'Usuario creado exitosamente',
          type: 'success',
        },
      }));
    } else {
      dispatch(feedbackActions.setFeedback({
        feedback: {
          message: 'Algunos usuarios no pudieron ser creados',
          type: 'warning',
        },
      }));
      dispatch(userActions.setFailedFilesLink({ failedFilesLink: link }));
    }
    dispatch(listUsers());
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const updateUser = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    await User.updateUser(data);
    await dispatch(listUsers());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Usuario actualizado exitosamente',
        type: 'success',
      },
    }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const deleUser = (id) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    await User.deleteUser(id);
    await dispatch(listUsers());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Usuario eliminado correctamente',
        type: 'success',
      },
    }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);

  try {
    await User.updateProfile(data);
    const userUpdate = await User.getUser(id);
    dispatch(userActions.setUser(userUpdate));
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Perfil actualizado',
        type: 'success',
      },
    }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
  } finally {
    setIsLoading(dispatch, false);
  }

};

export const downloadTests = (id, testIds) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const User = new UserService();

  try {
    const paths = await User.downloadTests(id, testIds);
    console.log(paths);
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const listTests = (user) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const User = new UserService();

  try {
    const tests = await User.listTests(user.id);
    dispatch(userActions.setPatientUser({ patientUser: { ...user, tests } }));
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const assingTest = (testName, testId, patientUser) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const User = new UserService();

  try {
    await User.assingTest(testName, testId, patientUser.id);
    dispatch(listTests(patientUser));
  } catch (error) {
    setErrorFeedback(dispatch, error);
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export default login;

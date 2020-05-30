import * as userActions from './user.actions';
import * as feedbackActions from '../feedback/feedback.actions';
import UserService from '../../services/User';

import { setIsLoading } from '../feedback/feedback.utils';

export const login = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  const cookieAge = 86400;
  try {
    const { jwt, id } = await User.login(data);
    document.cookie = `token=${jwt};max-age=${cookieAge};`;
    document.cookie = `uid=${id};max-age=${cookieAge};`;
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
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
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
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
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const createUser = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  const {
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    country,
    gender,
    role,
    email,
    documentId,
  } = data;
  const newUser = {
    profile: {
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      avatar: '',
      avatarMimeType: '',
      gender,
      country,
      documentId,
    },
    auth: {
      email,
      role,
    },
  };
  try {
    await User.newUser(newUser);
<<<<<<< HEAD
    await dispatch(listUsers());
=======
>>>>>>> bf006446a1340175c0747d91df6cc924c9d59df1
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Usuario creado exitosamente',
        type: 'success',
      },
    }));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const updateUser = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  const {
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    country,
    gender,
    email,
    id,
  } = data;
  const updatedUser = {
    profile: {
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      avatar: '',
      gender,
      country,
    },
    auth: {
      email,
    },
  };
  try {
    await User.updateUser(updatedUser, id);
    await dispatch(listUsers());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Usuario actualizado exitosamente',
        type: 'success',
      },
    }));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
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
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
  } finally {
    setIsLoading(dispatch, false);
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const User = new UserService();
  setIsLoading(dispatch, true);
  const {
    firstName,
    lastName,
    birthDate,
    phone,
    avatar,
    country,
    id,
    gender,
  } = data;

  const userProfile = {
    profile: {
      firstName,
      lastName,
      birthDate,
      phoneNumber: phone,
      avatar,
      gender,
      country,
    },
  };
  try {
    await User.updateProfile(userProfile, id);
    const userUdtated = await User.getUser(id);
    dispatch(userActions.setUserProfile(userUdtated));
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Perfil actualizado',
        type: 'success',
      },
    }));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
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
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
    throw error;
  } finally {
    setIsLoading(dispatch, false);
  }
};

export default login;

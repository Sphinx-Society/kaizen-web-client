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

import * as userActions from './user.actions';
import * as feedbackActions from '../feedback/feedback.actions';
import UserService from '../../services/User';

import { setIsLoading } from '../feedback/feedback.utils';

export const login = (data) => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  try {
    const authenticate = await true;
    dispatch(userActions.setUser(authenticate));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
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
    setIsLoading(dispatch, false);
    throw error;
  }
  setIsLoading(dispatch, false);
};

export const setUserProfile = (data) => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  try {
    console.log('done');
    dispatch(userActions.setUserProfile(data));

  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      message: error.message,
      type: 'error',
    }));
  }
};

export default login;

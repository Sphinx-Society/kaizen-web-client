import * as feedbackActions from '../feedback/feedback.actions';
import * as userActions from './user.actions';

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

export default login;

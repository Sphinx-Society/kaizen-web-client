import * as feedbackActions from './feedback.actions';

export const setIsLoading = (dispatch, isLoading) => dispatch(feedbackActions.setIsLoading({ isLoading }));

export const setErrorFeedback = (dispatch, error) => {
  dispatch(feedbackActions.setFeedback({
    feedback: {
      message: error.message,
      type: 'error',
    },
  }));
};

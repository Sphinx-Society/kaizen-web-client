import * as feedbackActions from './feedback.actions';

export const setIsLoading = (dispatch, isLoading) => dispatch(feedbackActions.setIsLoading({ isLoading }));

export default setIsLoading;

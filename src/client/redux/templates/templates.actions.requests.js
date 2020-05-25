import * as feedbackActions from '../feedback/feedback.actions';
import * as templateActions from './templates.actions';
import TemplateService from '../../services/Template';

export const listTemplates = () => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  const Template = new TemplateService();
  try {
    const templates = await Template.listTemplates();
    dispatch(templateActions.setTemplates(templates));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
    dispatch(feedbackActions.setIsLoading({ isLoading: false }));
  }
};

export default listTemplates;

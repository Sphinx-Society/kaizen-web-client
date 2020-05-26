import * as feedbackActions from '../feedback/feedback.actions';
import * as templateActions from './templates.actions';
import TemplateService from '../../services/Template';

export const listTemplates = (page = 1) => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  const Template = new TemplateService();
  try {
    const {
      templates,
      currentPage,
      totalTemplates,
      totalPages,
    } = await Template.listTemplates(page);
    dispatch(templateActions.setTemplates({
      templates,
      currentPage,
      totalTemplates,
      totalPages,
    }));
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
  }
  dispatch(feedbackActions.setIsLoading({ isLoading: false }));
};

export const createTemplate = (template) => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  const Template = new TemplateService();
  try {
    const data = await Template.createTemplate(template);
    console.log(data);
  } catch (error) {
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: error.message,
        type: 'error',
      },
    }));
  }
  dispatch(feedbackActions.setIsLoading({ isLoading: false }));
};

import * as feedbackActions from '../feedback/feedback.actions';
import * as templateActions from './templates.actions';
import * as userActions from '../user/user.actions';
import TemplateService from '../../services/Template';

import { setIsLoading } from '../feedback/feedback.utils';

export const listTemplates = (page = 1, query) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const Template = new TemplateService();
  try {
    const {
      templates,
      currentPage,
      totalTemplates,
      totalPages,
    } = await Template.listTemplates(page, query);
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
    setIsLoading(dispatch, false);
    throw error;
  }
  setIsLoading(dispatch, false);
};
export const getTemplate = (id) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const Template = new TemplateService();
  try {
    const template = await Template.getTemplate(id);
    dispatch(userActions.setEditingTest({
      template,
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

export const createTemplate = (template) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const Template = new TemplateService();
  try {
    await Template.createTemplate(template);
    await dispatch(listTemplates());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Plantilla generada',
        type: 'success',
      },
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

export const deleteTemplate = (id) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const Template = new TemplateService();
  try {
    await Template.deleteTemplate(id);
    await dispatch(listTemplates());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Plantilla eliminada',
        type: 'success',
      },
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

export const editTemplate = (template) => async (dispatch) => {
  setIsLoading(dispatch, true);
  const Template = new TemplateService();
  try {
    await Template.editTemplate(template);
    await dispatch(listTemplates());
    dispatch(feedbackActions.setFeedback({
      feedback: {
        message: 'Plantilla editada',
        type: 'success',
      },
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

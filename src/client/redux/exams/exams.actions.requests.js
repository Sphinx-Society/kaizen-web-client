import * as feedbackActions from '../feedback/feedback.actions';
import * as examsAcionts from './exams.actions';
import ExamService from '../../services/Exam';

export const listExams = () => async (dispatch) => {
  dispatch(feedbackActions.setIsLoading({ isLoading: true }));
  const Exam = new ExamService();
  try {
    const exams = await Exam.listExams();
    dispatch(examsAcionts.setExams(exams));
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

export default listExams;

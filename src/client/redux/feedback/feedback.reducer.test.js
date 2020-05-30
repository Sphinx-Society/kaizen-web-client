import reducer, { initialState } from './feedback.reducer';
import { setFeedback, setIsLoading } from './feedback.actions';

const feedbackMock = { feedback: { type: 'error', message: 'error message' } };

describe('Templates Reducer', () => {
  test('Should return default state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  test('FEEDBACK/SET_IS_LOADING', () => {
    const newState = reducer(initialState, setIsLoading({ isLoading: true }));
    expect(newState.isLoading).toBe(true);
  });

  test('FEEDBACK/SET_FEEDBACK', () => {
    const newState = reducer(initialState, setFeedback(feedbackMock));
    expect(newState.feedback).toEqual(feedbackMock.feedback);
  });

});

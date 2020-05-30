import reducer, { initialState } from './modalDialog.reducer';
import { setModalDialog } from './modalDialog.actions';

const modalMock = { modal: { type: 'type', message: 'message', mainFn: jest.fn() } };

describe('Templates Reducer', () => {
  test('Should return default state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  test('MODAL/SET_MODAL', () => {
    const newState = reducer(initialState, setModalDialog(modalMock));
    expect(newState.modal).toEqual(modalMock.modal);
  });
});

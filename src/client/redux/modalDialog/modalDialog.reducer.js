export const initialState = {
  modal: {
    type: '',
    message: '',
    mainFn: () => null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL/SET_MODAL': {
      return {
        ...state,
        modal: action.payload.modal,
      };
    }

    default: {
      return { ...state };
    }
  }
};

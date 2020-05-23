export const initialState = {
  modal: {
    message: '',
    type: '',
  },
  isLoading: false,
  feedback: {
    message: '',
    type: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FEEDBACK/SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case 'FEEDBACK/SET_MODAL': {
      return {
        ...state,
        modal: { ...action.payload.modal },
      };
    }
    case 'FEEDBACK/SET_FEEDBACK': {
      return {
        ...state,
        feedback: { ...action.payload.feedback },
      };
    }
    default: {
      return { ...state };
    }
  }
};

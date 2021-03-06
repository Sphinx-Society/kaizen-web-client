export const initialState = {
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
    case 'FEEDBACK/SET_FEEDBACK': {
      return {
        ...state,
        feedback: action.payload.feedback,
      };
    }
    default: {
      return { ...state };
    }
  }
};

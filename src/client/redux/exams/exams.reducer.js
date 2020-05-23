export const initialState = {
  exams: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EXAMS/SET_EXAMS': {
      return {
        ...state,
        exams: action.payload.exams,
      };
    }
    default: {
      return { ...state };
    }
  }
};

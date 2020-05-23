export const initialState = {
  exams: [
    {
      name: 'test',
      category: 'aasd',
      creationDate: 1456456121235,
    },
  ],
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

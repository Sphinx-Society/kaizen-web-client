export const initialState = {
  exams: [],
  isAddingField: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EXAMS/SET_EXAMS': {
      return {
        ...state,
        exams: action.payload.exams,
      };
    }
    case 'EXAMS/SET_IS_ADDING_FIELD': {
      console.log(state);
      return {
        ...state,
        isAddingField: action.payload.isAddingField,
      };
    }
    default: {
      return { ...state };
    }
  }
};

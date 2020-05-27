export const initialState = {
  exams: [
    {
      id: 0,
      name: 'test',
      creationDate: 1215464123,
      type: 'Laboratorio',
      state: 'Tomado',
    },
    {
      id: 1,
      name: 'test2',
      creationDate: 21215464123,
      type: 'Laboratorio',
      state: 'Tomado',
    },
  ],
  selectedExams: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EXAMS/SET_EXAMS': {
      return {
        ...state,
        exams: action.payload.exams,
      };
    }
    case 'EXAMS/SET_SELECTED_EXAMS': {
      return {
        ...state,
        selectedExams: action.payload.selectedExams,
      };
    }
    default: {
      return { ...state };
    }
  }
};

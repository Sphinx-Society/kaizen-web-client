export const initialState = {
  templates: [],
  isAddingField: false,
  editingField: null,
  editingTemplate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TEMPLATES/SET_TEMPLATES': {
      return {
        ...state,
        templates: action.payload.templates,
      };
    }
    case 'TEMPLATES/SET_IS_ADDING_FIELD': {
      return {
        ...state,
        isAddingField: action.payload.isAddingField,
      };
    }
    case 'TEMPLATES/SET_EDITING_FIELD': {
      return {
        ...state,
        editingField: action.payload.editingField,
      };
    }
    default: {
      return { ...state };
    }
  }
};

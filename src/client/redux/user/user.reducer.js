export const initialState = {
  user: null,
  users: [],
  currentPage: 1,
  totalUsers: 0,
  totalPages: 1,
  editingUser: null,
  patientUser: null,
  editingTest: null,
  selectedTests: [],
  failedFilesLink: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER/SET_USER': {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case 'USER/SET_USERS': {
      return {
        ...state,
        currentPage: action.payload.currentPage,
        users: [...action.payload.users],
        totalUsers: action.payload.totalUsers,
        totalPages: action.payload.totalPages,
      };
    }
    case 'USER/SET_EDITING_USER': {
      return {
        ...state,
        editingUser: action.payload.editingUser,
      };
    }
    case 'USER/SET_SELECTED_TESTS': {
      return {
        ...state,
        selectedTests: action.payload.selectedTests,
      };
    }
    case 'USER/SET_FAILED_FILES_LINK': {
      return {
        ...state,
        failedFilesLink: action.payload.failedFilesLink,
      };
    }
    case 'USER/SET_PATIENT_USER': {
      return {
        ...state,
        patientUser: action.payload.patientUser,
      };
    }
    case 'USER/SET_EDITING_TEST': {
      return {
        ...state,
        editingTest: action.payload.editingTest,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

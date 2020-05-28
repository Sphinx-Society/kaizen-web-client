export const initialState = {
  user: {
    '_id': '5ebb5ed9aeaa9713c11fc3d0',
    'profile': {
      'firstName': 'Alejandro Demetrio',
      'lastName': 'Cortez Álvarez',
      'birthDate': 684633600,
      'phoneNumber': '+525563584267',
      'avatar': '',
      'gender': 'Other',
      'country': 'MX',
      'documentId': '1234567899',
    },
    'auth': {
      'email': 'ziker@live.com.mx',
      'role': 'administrator',
      'username': 'alejandro.cortez.7890',
      'password': '$2b$10$hI6i09VU7UofrVATN17WP.v1PwfurgNx8a3NzQYpE/LGo9cJN3RYO',
      'active': true,
      'isConfirmed': false,
    },
    'InsertedAt': 1589337816980,
    'updatedAt': 1590337583007,
  },
  users: [],
  currentPage: 1,
  totalUsers: 0,
  totalPages: 1,
  editingUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER/SET_USER': {
      return {
        ...state,
        user: {
          ...action.payload.user },
      };
    }
    case 'USER/SET_USER_PROFILE': {
      return {
        ...state,
        user: { ...state.user,
          profile: { ...action.payload } },
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
    default: {
      return {
        ...state,
      };
    }
  }
};

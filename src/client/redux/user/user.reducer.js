export const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER/SET_USER': {
      return {
        ...state,
        user: { ...action.payload.user },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

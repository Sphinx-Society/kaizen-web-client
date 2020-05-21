import { LOADING, ERROR, LOGIN } from '../../types/loginTypes';

import initialState from '../../store/initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state,
        isAuth: action.payload,
        loading: false,
        error: '',

      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state,
        error: action.payload,
        loading: false,
      };
    default: return state;
  }
};

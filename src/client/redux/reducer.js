import { combineReducers } from 'redux';

import user from './user/user.reducer';
import feedback from './feedback/feedback.reducer';

export default combineReducers({
  user,
  feedback,
});

import { combineReducers } from 'redux';

import userReducers from './userReducers';
import signReducers from './signReducers';
import todosReducers from './todosReducers';

const reducer = combineReducers({
  user: userReducers,
  sign: signReducers,
  todo: todosReducers,
});

export default reducer;

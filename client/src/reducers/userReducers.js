import * as userActions from '../actions/userActions';

let user = localStorage.getItem('user');

user = user ? user : null;

//Initial state of user
const INITIAL_STATE = {
  user: JSON.parse(user),
  isAuthenticated: user ? true : false,
};

function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.SET_USER:
      return { ...state, user: action.payload, isAuthenticated: true };

    case userActions.REMOVE_USER:
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
}

export default userReducers;

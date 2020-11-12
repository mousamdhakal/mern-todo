import * as userActions from '../actions/userActions';

let token = localStorage.getItem('jwtToken');

//Initial state of user
const INITIAL_STATE = {
  isAuthenticated: token ? true : false,
};

function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.SET_USER:
      return { ...state, isAuthenticated: true };

    case userActions.REMOVE_USER:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}

export default userReducers;

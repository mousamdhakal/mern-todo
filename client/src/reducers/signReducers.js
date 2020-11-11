import * as signActions from '../actions/signActions';

//Initial state of todos
const INITIAL_STATE = {
  signInMessage: null,
  signUpMessage: null,
};

function signReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case signActions.SET_SIGN_IN:
      return { ...state, signInMessage: action.payload };

    case signActions.SET_SIGN_UP:
      return { ...state, signUpMessage: action.payload };

    default:
      return state;
  }
}

export default signReducers;

export const SET_SIGN_IN = 'SET_SIGN_IN';
export const SET_SIGN_UP = 'SET_SIGN_UP';

export const setSignIn = (message) => ({
  type: SET_SIGN_IN,
  payload: message,
});

export const setSignUp = (message) => ({
  type: SET_SIGN_UP,
  payload: message,
});

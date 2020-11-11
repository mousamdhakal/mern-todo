import * as todosActions from '../actions/todosActions';

//Initial state of todos
const INITIAL_STATE = {
  todos: [],
};

function todosReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case todosActions.SET_TODOS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}

export default todosReducer;

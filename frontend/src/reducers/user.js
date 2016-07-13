import { FETCH_USER } from '../actions/types.js';

const initialState = null;

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.user;

    default:
      return state
  }
}

import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/user.js';

const initialState = {
  isFetching: false,
  userData: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        isFetching: true,
        userData: null,
      };

    case FETCH_USER_SUCCESS:
    case FETCH_USER_FAILURE:
      return {
        isFetching: false,
        status: action.status,
        userData: action.userData,
      };

    default:
      return state;
  }
}

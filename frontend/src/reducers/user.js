import { USER_FETCH, USER_FETCH_SUCCESS, USER_FETCH_FAILURE } from '../actions/user.js';

const initialState = {
  isFetching: false,
  userData: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH:
      return {
        isFetching: true,
        userData: null,
      };

    case USER_FETCH_SUCCESS:
    case USER_FETCH_FAILURE:
      return {
        isFetching: false,
        status: action.status,
        userData: action.userData,
      };

    default:
      return state;
  }
}

import { UserConstants } from '../actions/user.js';

const initialState = {
  isFetching: false,
  status: 200,
  userData: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UserConstants.USER_LOGOUT:
      return {
        isFetching: false,
        status: 200,
        userData: null,
      };

    case UserConstants.USER_FETCH:
    case UserConstants.USER_LOGIN:
      return {
        isFetching: true,
        userData: null,
      };

    case UserConstants.USER_LOGIN_SUCCESS:
    case UserConstants.USER_LOGIN_FAILURE:
    case UserConstants.USER_FETCH_SUCCESS:
    case UserConstants.USER_FETCH_FAILURE:
      return {
        isFetching: false,
        status: action.status,
        userData: action.userData,
      };

    default:
      return state;
  }
}

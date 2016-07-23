import { UserConstants } from '../actions/user';

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
    case UserConstants.USER_CREATE:
      return {
        isFetching: true,
        userData: null,
      };

    case UserConstants.USER_LOGIN_SUCCESS:
    case UserConstants.USER_LOGIN_FAILURE:
    case UserConstants.USER_FETCH_SUCCESS:
    case UserConstants.USER_FETCH_FAILURE:
    case UserConstants.USER_CREATE_SUCCESS:
    case UserConstants.USER_CREATE_FAILURE:
      return {
        isFetching: false,
        status: action.status,
        userData: action.userData,
      };

    default:
      return state;
  }
}

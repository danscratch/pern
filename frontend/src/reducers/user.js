import { UserActionTypes } from '../actions/user';

const initialState = {
  isFetching: false,
  status: 200,
  userData: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.USER_LOGOUT:
      return {
        isFetching: false,
        status: 200,
        userData: null,
      };

    case UserActionTypes.USER_FETCH:
    case UserActionTypes.USER_LOGIN:
    case UserActionTypes.USER_CREATE:
      return {
        isFetching: true,
        userData: null,
      };

    case UserActionTypes.USER_LOGIN_SUCCESS:
    case UserActionTypes.USER_LOGIN_FAILURE:
    case UserActionTypes.USER_FETCH_SUCCESS:
    case UserActionTypes.USER_FETCH_FAILURE:
    case UserActionTypes.USER_CREATE_SUCCESS:
    case UserActionTypes.USER_CREATE_FAILURE:
      return {
        isFetching: false,
        status: action.status,
        userData: action.userData,
      };

    default:
      return state;
  }
}

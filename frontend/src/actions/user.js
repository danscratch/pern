
import { fetchUserByJwt, loginByUsernamePassword, createUser } from '../services/api';


export const UserActionTypes = {
  USER_FETCH: 'USER_FETCH',
  USER_FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
  USER_FETCH_FAILURE: 'USER_FETCH_FAILURE',

  USER_LOGOUT: 'USER_LOGOUT',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

  USER_CREATE: 'USER_CREATE',
  USER_CREATE_SUCCESS: 'USER_CREATE_SUCCESS',
  USER_CREATE_FAILURE: 'USER_CREATE_FAILURE',
};

export function fetchUser() {
  return (dispatch, getState) => {
    dispatch({
      type: UserActionTypes.USER_FETCH,
      status: 200,
      userData: null,
    });

    let statusText;

    return fetchUserByJwt()
      .then(res => {
        statusText = res.statusText;
        return res.json();
      })
      .then(userData => {
        dispatch({
          type: UserActionTypes.USER_FETCH_SUCCESS,
          status: statusText,
          userData,
        });
      })
      .catch(err => {
        dispatch({
          type: UserActionTypes.USER_FETCH_FAILURE,
          status: statusText,
          userData: null,
        });
      });
  };
}

export function logout() {
  return {
    type: UserActionTypes.USER_LOGOUT,
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    dispatch({
      type: UserActionTypes.USER_LOGIN,
      status: 200,
      userData: null,
    });

    let statusText;
    let status;

    return loginByUsernamePassword(username, password)
    .then(res => {
      statusText = res.statusText;
      status = res.status;
      if (status !== 200) {
        throw new Error();
      }
      return res.json();
    })
    .then(userData => {
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        status: statusText,
        userData,
      });
    })
    .catch(err => {
      dispatch({
        type: UserActionTypes.USER_LOGIN_FAILURE,
        status,
        userData: null,
      });
    });
  };
}

export function signup(userData) {
  return (dispatch, getState) => {
    dispatch({
      type: UserActionTypes.USER_CREATE,
      status: 200,
      userData: null,
    });

    let statusText;
    let status;

    return createUser(userData)
    .then(res => {
      statusText = res.statusText;
      status = res.status;
      if (status !== 200) {
        throw new Error();
      }
      return res.json();
    })
    .then(newUserData => {
      dispatch({
        type: UserActionTypes.USER_CREATE_SUCCESS,
        status: statusText,
        userData: newUserData,
      });
    })
    .catch(err => {
      dispatch({
        type: UserActionTypes.USER_CREATE_FAILURE,
        status,
        userData: null,
      });
    });
  };
}

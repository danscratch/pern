
import { fetchUserByJwt, loginByUsernamePassword } from '../services/api';
import { Auth } from '../services/auth';


export const UserConstants = {
  USER_FETCH: 'USER_FETCH',
  USER_FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
  USER_FETCH_FAILURE: 'USER_FETCH_FAILURE',

  USER_LOGOUT: 'USER_LOGOUT',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
};

export function fetchUser() {
  return (dispatch, getState) => {
    dispatch({
      type: UserConstants.USER_FETCH,
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
          type: UserConstants.USER_FETCH_SUCCESS,
          status: statusText,
          userData,
        });
      })
      .catch(err => {
        dispatch({
          type: UserConstants.USER_FETCH_FAILURE,
          status: statusText,
          userData: null,
        });
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    Auth.logout();
    dispatch({
      type: UserConstants.USER_LOGOUT,
    });
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    dispatch({
      type: UserConstants.USER_LOGIN,
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
        type: UserConstants.USER_LOGIN_SUCCESS,
        status: statusText,
        userData,
      });
    })
    .catch(err => {
      dispatch({
        type: UserConstants.USER_LOGIN_FAILURE,
        status,
        userData: null,
      });
    });
  };
}

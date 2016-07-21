
export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export function fetchUser(id) {
  return function(dispatch) {
    dispatch({
      type: USER_FETCH,
      status: 200,
      userData: null,
    });

    let statusText;

    return fetch(`/api/user/${id}`)
      .then(res => {
        statusText = res.statusText;
        return res.json();
      })
      .then(userData => {
        dispatch({
          type: USER_FETCH_SUCCESS,
          status: statusText,
          userData,
        });
      })
      .catch(err => {
        dispatch({
          type: USER_FETCH_FAILURE,
          status: statusText,
          userData: null,
        });
      });
  };
}

export function login(username, password) {
  return function(dispatch) {
    dispatch({
      type: USER_LOGIN,
      status: 200,
      userData: null,
    });

    let statusText;
    let status;

    return fetch('/api/user/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
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
        type: USER_LOGIN_SUCCESS,
        status: statusText,
        userData,
      });
    })
    .catch(err => {
      dispatch({
        type: USER_LOGIN_FAILURE,
        status,
        userData: null,
      });
    });
  };
}


import fetch from 'isomorphic-fetch';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUser(id) {
  return function(dispatch) {
    dispatch({
      type: FETCH_USER,
      status: 200,
      userData: null,
    });

    let statusText;

    return fetch(`/api/user/${id}`)
      .then(response => {
        statusText = response.statusText;
        return response.json();
      })
      .then(userData => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          status: statusText,
          userData,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_USER_FAILURE,
          status: statusText,
          userData: null,
        });
      });
  };
}

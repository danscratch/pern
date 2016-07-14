
import fetch from 'isomorphic-fetch';

export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

export function fetchUser(id) {
  return function(dispatch) {
    dispatch({
      type: USER_FETCH,
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

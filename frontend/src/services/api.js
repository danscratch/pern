
import 'whatwg-fetch';

const fetchDefaultParamsGET = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
};

const fetchDefaultParamsPOST = {
  credentials: 'same-origin',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
};

export function fetchUserById(userId) {
  return fetch(`/api/user/${userId}`, fetchDefaultParamsGET);
}

export function loginByUsernamePassword(username, password) {
  return fetch('/api/user/login', Object.assign({
    body: JSON.stringify({ username, password }),
  }, fetchDefaultParamsPOST));
}

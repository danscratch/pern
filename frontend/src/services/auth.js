
const Cookies = require('cookies-js');

const COOKIE_AUTH = 'auth';

export const Auth = {

  isLoggedIn: function() {
    return !!Cookies.get(COOKIE_AUTH);
  },

  logout: function() {
    Cookies.expire(COOKIE_AUTH);
  },

};

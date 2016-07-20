
module.exports = function(app) {
  /* eslint-disable global-require */
  require('./misc.js')(app);
  require('./user.js')(app);
  /* eslint-enable global-require */
};

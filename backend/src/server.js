/*
  server.js
*/

require('babel-core/register');
require('babel-polyfill');

const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./globals.js');
const logger = require('./logger.js');
const responseTime = require('response-time');
const uuid = require('uuid');

const UNLOGGED_URLS = {
  '/api/ping': true,
  '/api/server_status': true,
  '/admin/ping': true,
};

logger.init({
  level: 'debug',
  stackName: 'backend',
});

app.set('port', process.env.PORT || 3000);

// Read the request body and put it into req.body
app.use(bodyParser.json({limit: '8mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '8mb',
}));

// Read user cookies, and put into req.cookies
app.use(cookieParser());


// authenticate - this should come before the HTTP_REQUEST gets logged, so that the
// logging statement can include the userId
app.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    res.locals.user = !!user ? user : null;
    return next();
  })(req, res, next);
});


// make sure the sessionId is set
app.use((req, res, next) => {
  let sessionId = req.cookies[process.env.COOKIE_SESSIONID];
  if (!sessionId) {
    sessionId = uuid.v4();
    res.cookie(process.env.COOKIE_SESSIONID, sessionId, {
      expires: new Date(Date.now() + 60000 * 30),
      secure: req.protocol === 'https',
      path: '/',
    });
  }
  res.locals.sessionId = sessionId;
  next();
});


// store all global request variables in res.locals
app.use((req, res, next) => {
  let ip = req.headers['x-forwarded-for'];
  if (ip) {
    ip = ip.split(',')[0];
    res.locals.ip = ip;
  }

  res.locals.userAgent = req.headers['user-agent'];
  res.locals.referrer = req.get('Referrer');
  res.locals.uuid = uuid.v4();
  res.locals.browserId = req.cookies[process.env.COOKIE_BROWSERID];

  next();
});


// log the incoming request
app.use((req, res, next) => {
  if (!UNLOGGED_URLS[req.originalUrl]) {
    logger.verbose({
      category: 'HTTP_REQUEST',
      method: req.method,
      url: req.originalUrl,
      version: res.locals.version,
      ip: res.locals.ip,
      userAgent: res.locals.userAgent,
      referrer: res.locals.referrer,
      body: req.body,
    }, res);
  }

  next();
});


// log the time taken by the request on the way out
app.use(responseTime((req, res, time) => {
  if (!UNLOGGED_URLS[req.originalUrl]) {
    logger.verbose({
      category: 'TIMING',
      time: Math.ceil(time),
      statusCode: res.statusCode,
    }, res);
  }
}));


// ignore options request
app.options('*', (req, res) => res.sendStatus(200));


// set up api calls
require('./api')(app);


app.use((req, res) => {
  res.type('text/plain');
  res.status(404).send('404 - Not Found');
});

app.use((err, req, res, next) => {
  /* eslint-disable no-console */
  console.error(err.stack);
  /* eslint-enable no-console */
  res.type('text/plain');
  res.status(500).send(err.stack);
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
  /* eslint-enable no-console */
});

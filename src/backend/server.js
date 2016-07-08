/*
  index.js
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

app.set('port', process.env.PORT || 3000);

// Read the request body and put it into req.body
app.use(bodyParser.json({limit: '8mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '8mb',
}));

// Read user cookies, and put into req.cookies
app.use(cookieParser());


app.all('*', (req, res, next) => {
  let ip = req.headers['x-forwarded-for'];
  if (ip) {
    ip = ip.split(',')[0];
    res.locals.ip = ip;
  }

  res.locals.userAgent = req.headers['user-agent'];
  res.locals.referrer = req.get('Referrer');
  res.locals.uuid = uuid.v4();

  next();
});


app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('AAAAAAAAAA');
});

app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('BBBBBBBBBB');
});

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

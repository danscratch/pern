/*
  index.js
*/

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

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
  res.status(404);
  res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
  /* eslint-disable no-console */
  console.error(err.stack);
  /* eslint-enable no-console */
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
  /* eslint-enable no-console */
});

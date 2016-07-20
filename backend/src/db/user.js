const bcrypt = require('bcrypt');
const dbpool = require('./index.js');
// const logger = require('../logger.js');

const SALT_ROUNDS = 10;

function generatePassword(plaintextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintextPassword, SALT_ROUNDS, (err, hash) => {
      if (err) { return reject(err); }
      return resolve(hash);
    });
  });
}

function verifyPassword(plaintextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, this.password, (err, result) => {
      if (err) { return reject(err); }
      return resolve(result);
    });
  });
}

export function createUser(username, password, firstName, lastName, email) {
  let client;
  let passwordHash;
  return generatePassword()
  .then(_passwordHash => {
    passwordHash = _passwordHash;
    return dbpool.connect();
  })
  .then(_client => {
    client = _client;
    return client.query(
      'insert into t_user (username, password, firstName, lastName, email) values ($1, $2, $3, $4, $5) RETURNING id',
      [username, passwordHash, firstName, lastName, email]);
  })
  .then(rset => {
    client.release();
    return Promise.resolve(rset.rows.length === 0 ? 0 : rset.rows[0].id);
  })
  .catch(err => {
    client.release();
    return Promise.reject(err);
  });
}

export async function getUserById(userId) {
  const client = await dbpool.connect();
  try {
    const rset = await client.query('select * from t_user where id=$1', [userId]);
    if (rset.rows.length === 0) {
      return null;
    }
    return Object.assign({}, rset.rows[0], { verifyPassword });
  } finally {
    client.release();
  }
}

export async function getUserByUsername(username) {
  const client = await dbpool.connect();
  try {
    const rset = await client.query('select * from t_user where username=$1', [username]);
    if (rset.rows.length === 0) {
      return null;
    }
    return Object.assign({}, rset.rows[0], { verifyPassword });
  } finally {
    client.release();
  }
}

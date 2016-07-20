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

export function validateUser(username, plaintextPassword) {
  return new Promise((resolve, reject) => {
    let client;
    return dbpool.connect()
    .then(_client => {
      client = _client;
      return client.query('select * from t_user where username=$1', [username]);
    })
    .then(rset => {
      client.release();
      if (rset.rows.length === 0) {
        reject(null);
      }
      const userDAO = rset.rows[0];
      bcrypt.compare(plaintextPassword, userDAO.password, (err, result) => {
        if (err) { return reject(err); }
        if (!result) { return reject(false); }
        return resolve({
          id: userDAO.id,
          username: userDAO.username,
          firstName: userDAO.firstName,
          lastName: userDAO.lastName,
          email: userDAO.email,
        });
      });
    })
    .catch(err => {
      client.release();
      return reject(err);
    });
  });
}

export function createUser(username, password, firstName, lastName, email) {
  let client;
  let passwordHash;
  return generatePassword(password)
  .then(_passwordHash => {
    passwordHash = _passwordHash;
    return dbpool.connect();
  })
  .then(_client => {
    client = _client;
    return client.query(
      'insert into t_user (username, password, first_name, last_name, email) values ($1, $2, $3, $4, $5) RETURNING id',
      [username, passwordHash, firstName, lastName, email]);
  })
  .then(rset => {
    client.release();
    if (rset.rows.length === 0) return Promise.reject(null);
    return Promise.resolve({
      id: rset.rows[0].id,
      username,
      firstName,
      lastName,
      email,
    });
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
    return rset.rows[0];
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
    return rset.rows[0];
  } finally {
    client.release();
  }
}

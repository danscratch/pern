
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const logger = require('../logger.js');
import { createUser, getUserById, validateUser } from '../db/user.js';


module.exports = function(app) {
  app.use(passport.initialize());


  passport.use(new BasicStrategy((username, password, done) => {
    return validateUser(username, password)
      .then(user => done(null, user))
      .catch(err => {
        if (err) return done(err);
        return done(null, false);
      });
  }));


  app.get('/api/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await getUserById(userId);
      if (!user) {
        logger.error({category: 'USER', status: 'ERROR', msg: `user ${userId} not found`}, res);
        return res.sendStatus(400);
      }
      return res.status(200).send(user);
    } catch (err) {
      logger.error({category: 'USER', status: 'ERROR', msg: err.message}, res);
      return res.sendStatus(500);
    }
  });


  app.post('/api/user', async (req, res) =>
    createUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email)
    .then(user => res.status(200).send(user))
    .catch(err => {
      logger.warn({category: 'USER', cmd: 'create', status: 'FAILED', msg: `Failed to create user "${req.body.username}"`, error: err});
      return res.sendStatus(403);
    })
  );


  app.post('/api/user/login', (req, res) =>
    validateUser(req.body.username, req.body.password)
    .then(user => res.status(200).send(user))
    .catch(err => {
      logger.warn({category: 'USER', cmd: 'login', status: 'FAILED', msg: `Failed login attempt for user "${req.body.username}"`, error: err});
      return res.sendStatus(403);
    })
  );
};

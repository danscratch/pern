
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const logger = require('../logger.js');
import { getUserById, getUserByUsername } from '../db/user.js';


module.exports = function(app) {
  app.use(passport.initialize());


  passport.use(new BasicStrategy(
    async (username, password, done) => {
      try {
        const user = await getUserByUsername(username);
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));


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


  app.post('/api/user', async (req, res) => {
    res.sendStatus(200);
  });


  app.post('/api/user/login', async (req, res) => {
    res.sendStatus(200);
  });
};

/*
  logger.js
  a simple wrapper for the winston logging library
*/

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = {

  _metaData: null,

  init: (params) => {
    winston.remove(winston.transports.Console);
    if (params.filename) {
      this._metaData = {
        env: params.stackName,
      };

      winston.add(DailyRotateFile, {
        name: params.name,
        level: params.level ? params.level : 'debug',
        timestamp: true,
        filename: params.filename,
        dirname: params.dirname,
        datePattern: params.datePattern,
        logstash: false,
        showLevel: true,
        tailable: true,
        json: false,
        exitOnError: false,
      });
    } else {
      winston.add(winston.transports.Console, {
        level: params.level ? params.level : 'debug',
        timestamp: true,
        showLevel: true,
        exitOnError: false,
        json: false,
        prettyPrint: true,
      });
    }
  },

  formatMessage: (msg, res) => JSON.stringify(Object.assign({ uuid: res.locals.uuid }, msg, this._metaData)),

  debug: (msg, res) => {
    winston.debug(this.formatMessage(msg, res));
  },

  verbose: (msg, res) => {
    winston.verbose(this.formatMessage(msg, res));
  },

  info: (msg, res) => {
    winston.info(this.formatMessage(msg, res));
  },

  warn: (msg, res) => {
    winston.warn(this.formatMessage(msg, res));
  },

  error: (msg, res) => {
    winston.error(this.formatMessage(msg, res));
  },

};

module.exports = logger;

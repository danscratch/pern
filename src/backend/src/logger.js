/*
  logger.js
  a simple wrapper for the winston logging library
*/

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = {

  _metaData: null,

  init: function(params) {
    winston.remove(winston.transports.Console);
    if (params.filename) {
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

  formatMessage: function(msg, res) {
    const defaultParams = {};
    if (res && res.locals && res.locals.uuid) defaultParams.uuid = res.locals.uuid;
    return JSON.stringify(Object.assign(defaultParams, msg, this._metaData));
  },

  debug: function(msg, res) {
    winston.debug(this.formatMessage(msg, res));
  },

  verbose: function(msg, res) {
    winston.verbose(this.formatMessage(msg, res));
  },

  info: function(msg, res) {
    winston.info(this.formatMessage(msg, res));
  },

  warn: function(msg, res) {
    winston.warn(this.formatMessage(msg, res));
  },

  error: function(msg, res) {
    winston.error(this.formatMessage(msg, res));
  },

};

module.exports = logger;

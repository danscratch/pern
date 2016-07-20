process.env.NODE_ENV = 'production';
process.env.STACK_NAME = 'backend';

process.env.LOG_LEVEL = 'verbose';
process.env.LOG_DATE_PATTERN = '-YYYY-MM-DD-HH';

process.env.COOKIE_SESSIONID = 'SESSIONID';
process.env.COOKIE_BROWSERID = 'BROWSERID';
process.env.COOKIE_AUTH = 'auth';

process.env.DB_USER = 'admin';
process.env.DB_PASSWORD = 'foo';
process.env.DB_DATABASE = 'core';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_MAX_CLIENTS = '10';
process.env.DB_IDLE_TIMEOUT_MILLIS = '30000';

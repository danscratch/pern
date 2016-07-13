-- core.sql
-- schema definitions for the core database

DROP TABLE IF EXISTS t_user;
CREATE TABLE t_user (
  id SERIAL PRIMARY KEY,
  handle VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  facebook_id VARCHAR(255)
);
CREATE INDEX ON t_user (handle);
CREATE INDEX ON t_user (email);
CREATE INDEX ON t_user (facebook_id);

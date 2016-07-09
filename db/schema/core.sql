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

DROP TABLE IF EXISTS t_group;
CREATE TABLE t_group (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER NOT NULL
);
CREATE INDEX ON t_group (name);
CREATE INDEX ON t_group (owner_id);

DROP TABLE IF EXISTS t_group_user;
CREATE TABLE t_group_user (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  level INTEGER NOT NULL
);
CREATE INDEX ON t_group_user (user_id);
CREATE INDEX ON t_group_user (group_id);

DROP TABLE IF EXISTS t_user_public_key;
CREATE TABLE t_user_public_key (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  format VARCHAR(255) NOT NULL,
  public_key VARCHAR(10000) NOT NULL
);
CREATE INDEX ON t_user_public_key (user_id);

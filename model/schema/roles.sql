-- roles.sql
-- role definitions

-- this is, of course, terrible.
-- you should never do this in anything other than a dev environment
CREATE ROLE admin WITH SUPERUSER LOGIN PASSWORD 'foo';

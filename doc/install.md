SET UP

* install `node` and `npm`

 1. go to https://nodejs.org/en/
 1. download 6.3.0
 1. install


* install `eslint`

 ```
 npm install eslint -g
 ```

* install `nginx`

 ```
 brew install nginx
 cp src/backend/conf/nginx.conf /usr/local/etc/nginx
 sudo nginx
 ```

* install `nodemon`

 ```
 npm install nodemon -g
 ```

* install `postgres`

 ```
 brew update
 brew install postgres
 # To have launchd start postgresql now and restart at login:
 brew services start postgresql
 # create database:
 createdb core
 # log in
 psql -d core
 ```

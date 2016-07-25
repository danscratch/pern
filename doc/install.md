### SET UP

In order to get all this working, you'll need to set up some basic packages.

#### `node` and `npm`

The "N" of "PERN" is `node`, and we will need to install it in order to be able to run just about everything.

1. go to https://nodejs.org/en/
1. download 6.3.0
1. install

#### `nginx`

`nginx` is a "reverse proxy", which means that it allows you to manage incoming http requests in a variety of highly useful ways. In our case, we'll be running our backend server on port 3000, and will use `nginx` to redirect port 80 there (i.e., so that we can reference http://localhost instead of http://localhost:3000). The nice thing about `nginx` (particularly in comparison to `apache`) is that its configuration files are typically fairly straightforward.

```
brew update
brew install nginx
cp conf/nginx.conf /usr/local/etc/nginx
# NOTE: you will need to alter the "root" variable in nginx.conf to point to the right directory for your system
sudo nginx
```

#### `nodemon`

`nodemon` will manage our `node` process - restarting it when necessary, and watching for code changes.

```
npm install nodemon -g
```

#### `postgres`

Although normally you'd be running against a `postgres` instance on some other server, for the purposes of getting set up a dev environment, we're just going to set up a local postgres instance.

```
brew update
brew install postgres
# To have launchd start postgresql now and restart at login:
brew services start postgresql
# create database:
createdb core
# log in
psql -d core
# log out
<ctrl>-d
```

You'll also need to set up the (very simple) database schema.

```
psql -d core < model/schema/roles.sql
psql -d core < model/schema/core.sql
```

#### Atom

I personally use the [Atom](https://atom.io/) IDE, and have made sure that the various `eslint` configuration files play well with it. You're welcome to use it, or any other IDE, but if you *do* decide to use Atom, I'd *strongly* recommend also installing the `linter`, `linter-eslint`, and `react` packages.

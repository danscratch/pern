### Running the code

This framework is composed of the following pieces:
* `backend` server that responds to HTTP requests, and is primarily used for the API
* `frontend` code that runs on the user's browser

This section will describe how to build and run the code.

##### backend

First, you will need to install the various `npm` packages. To do this, open a terminal window, navigate to the code directory, and run the following command:
```
cd backend
npm install
```

The `backend` uses ES6 and ES7 extensions, so needs to be run through the `babel` transpiler in order to work correctly. You can set up a process to watch for any changes, and automatically re-compile to code into the `backend/build` directory. To do this, open a terminal window, navigate to the code directory, and run the following command:
```
cd backend
npm run build
```
Note that this command won't exit on its own - it will continue to watch the `src` directory for code changes until you terminate it with `ctrl-c`.

Once the code is being built, you will want to execute it using `node`. In dev mode, we use `nodemon` to watch for changes to the built code, and restart whenever the code changes. To do this, open a terminal window, navigate to the code directory, and use the following command:
```
cd backend
npm run dev
```
Note that these commands are defined in `package.json`, which has the following code:
```
"scripts": {
  "build": "babel -w src/ -d build/ -s",
  "dev": "nodemon --debug=5858 -w build build/server.js"
},
```
*Note:* Links to the `babel` and `nodemon` binaries are in the `backend/node_modules/.bin` directory, which normally wouldn't be in your path. However, by putting these commands into the `package.json` file, it knows where to look for them.

Once you have the backend running, you can test it by sending it a simple api call:
```
curl localhost/api/ping
OK
```

##### frontend

The `frontend` app is structured as a minimal `index.html` file (i.e., the minimum necessary to load a javascript file), and a combination javascript/css file that's been put together with `webpack`. As with the `backend`, the first step is to install the various `npm` modules:
```
cd frontend
npm install
```

At this point, you can generate all the necessary files (in the `frontend/build` directory) by running the following:
```
cd frontend
npm run dev
```

As with `babel` in the `backend`, `webpack` is set up to watch for changes in the source files, and will automatically rebuild the javascript file (`frontend/build/bundle.js`) any time you update a source file.

If you want to build a minified, optimized version of the `bundle.js` file, you can run with the `prod` keyword. Note that this will not watch for changes.
```
cd frontend
npm run prod
```

This is pretty much it - to test that this is working, just verify that `bundle.js` is being constructed correctly, that there aren't any errors, and then load http://localhost in your browser. You should be good to go.

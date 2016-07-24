### Directory structure

The stack is set up as a mono-repo for simplicity. However, there's no reason why it can't be broken into multiple repos, and if that's your thing, then this directory structure should hopefully make it easy.

##### Notes on the code base

The code uses `redux` in the `frontend` to manage state, which informs some of the directory structure choices (`actions`, `reducers`, etc.).

There is a strict division between components and containers - the former are all "pure" (only updated on props changes) or "static" (never updated), and are strictly presentational. The goal is to keep all significant logic in the containers. For a larger (i.e., real-world) project, you would likely have to subdivide each of these directories further, but that seemed like overkill here. In particular, there should likely be a `views` directory, either directly under `src` or inside `containers`, which would contain all the top level containers for the routes (i.e., web pages).

The codebase is kept strictly linted at all times using `eslint` and the airbnb style guide.

The code base uses ES6 and some ES7 extensions. These are managed using the babel transpiler.

CSS is written using Sass `.scss` files.

##### Directories

* `backend`
  * `build` - Generated files.
  * `src` - Source code. This is kept separate from `node_modules` and `build` so as to make searching and some configuration simpler. Some important `js` files are kept at the top level in here.
    * `api` - API commands.
    * `db` - Database commands.
* `conf` - Config files.
* `doc` - Project documentation
* `frontend`
  * `build` - Generated files.
  * `src` - Source code. This is kept separate from `node_modules` and `build` so as to make searching and some configuration simpler. Some important `js` files are kept at the top level in here.
    * `actions` - `redux` actions.
    * `components` - Pure/static React components.
    * `containers` - Components/pages that contain state, communicate with the api, have logic, etc.
    * `reducers` - `redux` reducers.
    * `store` - `redux` store file.
    * `styles` - Global CSS files.
* `model` - Files related to the data model. Could potentially include ETL scripts, configuration, etc.
  * `schema` - Files with DDL commands.

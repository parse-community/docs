# Development Guide

## Running Parse Server for development

Normally, when you run a standalone Parse Server, the [latest release that has been pushed to npm](https://www.npmjs.com/package/parse-server) will be used. This is great if you are interested in just running Parse Server, but if you are developing a new feature or fixing a bug you will want to use the latest code on your development environment.

First, you will need to clone this repo if you haven't done so yet.

```sh
git clone https://github.com/parse-community/parse-server.git
```

You can then link the parse-server module to the cloned repo and run `npm install`:

```sh
npm link parse-server path/to/cloned/repo
npm install
```

You can now start Parse Server using `npm start`:

```sh
npm start -- --appId APPLICATION_ID --masterKey MASTER_KEY --serverURL http://localhost:1337/parse
```

## Notable Files

The following is a breakdown of the various files you will find in the Parse Server source code. Click on a filename to learn more about the purpose behind each file.

* [index.js](https://github.com/parse-community/parse-server/wiki/index.js) - exposes the ParseServer constructor and mutates Parse.Cloud
* [analytics.js](https://github.com/parse-community/parse-server/wiki/analytics.js) - handle the /events routes
* [Auth.js](https://github.com/parse-community/parse-server/wiki/Auth.js) - Auth object, created to hold config/master/user information for requests
* [batch.js](https://github.com/parse-community/parse-server/wiki/batch.js) - batch handling implemented for PromiseRouter
* [cache.js](https://github.com/parse-community/parse-server/wiki/cache.js) - simple caching for the app and user sessions
* [classes.js](https://github.com/parse-community/parse-server/wiki/classes.js) - handle the /classes routes
* [Config.js](https://github.com/parse-community/parse-server/wiki/Config.js) - Config object, storage for the application configuration and some router information
* [crypto.js](https://github.com/parse-community/parse-server/wiki/crypto.js) - uses bcrypt for password hashing and comparison
* [DatabaseAdapter.js](https://github.com/parse-community/parse-server/wiki/DatabaseAdapter.js) - Interface for allowing the underlying database to be changed
* [ExportAdapter.js](https://github.com/parse-community/parse-server/wiki/ExportAdapter.js) - DatabaseAdapter for MongoDB (default)
* [facebook.js](https://github.com/parse-community/parse-server/wiki/facebook.js) - helper functions for accessing the Graph API
* [files.js](https://github.com/parse-community/parse-server/wiki/files.js) - handle the /files routes
* [FilesAdapter.js](https://github.com/parse-community/parse-server/wiki/FilesAdapter.js) - Interface for allowing the underlying file storage to be changed
* [FileLoggerAdapter.js](https://github.com/parse-community/parse-server/wiki/FileLoggerAdapter.js) - LoggerAdapter for logging info and error messages into local files (default)
* [functions.js](https://github.com/parse-community/parse-server/wiki/functions.js) - handle the /functions routes
* [GridStoreAdapter.js](https://github.com/parse-community/parse-server/wiki/GridStoreAdapter.js) - FilesAdapter for storing uploaded files in GridStore/MongoDB (default)
* [installations.js](https://github.com/parse-community/parse-server/wiki/installations.js) - handle the /installations routes
* [LoggerAdapter.js](https://github.com/parse-community/parse-server/wiki/LoggerAdapter.js) - Interface for allowing the underlying logging transport to be changed
* [middlewares.js](https://github.com/parse-community/parse-server/wiki/middlewares.js) - Express middleware used during request processing
* [PromiseRouter.js](https://github.com/parse-community/parse-server/wiki/PromiseRouter.js) - PromiseRouter uses promises instead of req/res/next middleware conventions
* [push.js](https://github.com/parse-community/parse-server/wiki/push.js) - handle the /push route
* [rest.js](https://github.com/parse-community/parse-server/wiki/rest.js) - main interface for REST operations
* [RestQuery.js](https://github.com/parse-community/parse-server/wiki/RestQuery.js) - RestQuery encapsulates everything needed for a 'find' operation from REST API format
* [RestWrite.js](https://github.com/parse-community/parse-server/wiki/RestWrite.js) - RestWrite encapsulates everything needed for 'create' and 'update' operations from REST API format
* [roles.js](https://github.com/parse-community/parse-server/wiki/roles.js) - handle the /roles routes
* [Schema.js](https://github.com/parse-community/parse-server/wiki/Schema.js) - Schema handles schema validation, persistence, and modification.
* [sessions.js](https://github.com/parse-community/parse-server/wiki/sessions.js) - handle the /sessions and /logout routes
* [testing-routes.js](https://github.com/parse-community/parse-server/wiki/testing-routes.js) - used by internal Parse integration tests
* [transform.js](https://github.com/parse-community/parse-server/wiki/transform.js) - transforms keys/values between Mongo and Rest API formats.
* [triggers.js](https://github.com/parse-community/parse-server/wiki/triggers.js) - cloud code methods for handling database trigger events
* [users.js](https://github.com/parse-community/parse-server/wiki/users.js) - handle the /users and /login routes

## Contributing

We really want Parse to be yours, to see it grow and thrive in the open source community. Please see the [Contributing to Parse Server notes](https://github.com/parse-community/parse-server/blob/master/CONTRIBUTING.md).

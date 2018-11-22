# Usage

Parse Server is meant to be mounted on an [Express](http://expressjs.com/) app. Express is a web framework for Node.js. The fastest way to get started is to clone the [Parse Server repo](https://github.com/parse-community/parse-server), which at its root contains a sample Express app with the Parse API mounted.

The constructor returns an API object that conforms to an [Express Middleware](http://expressjs.com/en/api.html#app.use). This object provides the REST endpoints for a Parse app. Create an instance like so:

```js
var api = new ParseServer({
  databaseURI: 'mongodb://your.mongo.uri',
  cloud: './cloud/main.js',
  appId: 'myAppId',
  fileKey: 'myFileKey',
  masterKey: 'mySecretMasterKey',
  push: { ... }, // See the Push wiki page
  filesAdapter: ...,
});
```

The parameters are as follows:

* `databaseURI`: Connection string URI for your MongoDB.
* `cloud`: Path to your app’s Cloud Code.
* `appId`: A unique identifier for your app.
* `fileKey`: A key that specifies a prefix used for file storage. For migrated apps, this is necessary to provide access to files already hosted on Parse.
* `masterKey`: A key that overrides all permissions. Keep this secret.
* `clientKey`: The client key for your app. (optional)
* `restAPIKey`: The REST API key for your app. (optional)
* `javascriptKey`: The JavaScript key for your app. (optional)
* `dotNetKey`: The .NET key for your app. (optional)
* `push`: An object containing push configuration. See [Push](#push-notifications)
* `filesAdapter`: An object that implements the [FilesAdapter](https://github.com/parse-community/parse-server/blob/master/src/Adapters/Files/FilesAdapter.js) interface. For example, [the S3 files adapter](#configuring-file-adapters)
* `auth`: Configure support for [3rd party authentication](#oauth-and-3rd-party-authentication).
* `maxUploadSize`: Maximum file upload size.

The Parse Server object was built to be passed directly into `app.use`, which will mount the Parse API at a specified path in your Express app:

```js
var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var app = express();
var api = new ParseServer({ ... });

// Serve the Parse API at /parse URL prefix
app.use('/parse', api);

var port = 1337;
app.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});
```

And with that, you will have a Parse Server running on port 1337, serving the Parse API at `/parse`.

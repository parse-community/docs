# Usage

Parse Server is meant to be mounted on an [Express](http://expressjs.com/) app. Express is a web framework for Node.js. The fastest way to get started is to clone the [Parse Server repo](https://github.com/ParsePlatform/parse-server), which at its root contains a sample Express app with the Parse API mounted.

The constructor returns an API object that conforms to an [Express Middleware](http://expressjs.com/en/api.html##app.use). This object provides the REST endpoints for a Parse app. Create an instance like so:

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
* `filesAdapter`: An object that implements the [FilesAdapter](https://github.com/ParsePlatform/parse-server/blob/master/src/Adapters/Files/FilesAdapter.js) interface. For example, [the S3 files adapter](#configuring-file-adapters)
* `oauth`: Configure support for [3rd party authentication](#oauth-and-3rd-party-authentication).

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

## Keys

Parse Server does not require the use of client-side keys. This includes the client key, JavaScript key, .NET key, and REST API key. The Application ID is sufficient to secure your app.

However, you have the option to specify any of these four keys upon initialization. Upon doing so, Parse Server will enforce that any clients passing a key matches. The behavior is consistent with hosted Parse.

## Using Parse SDKs with Parse Server

To use a Parse SDK with Parse Server, change the server URL to your Parse API URL (make sure you have the [latest version of the SDKs](https://parse.com/docs/downloads)). For example, if you have Parse Server running locally mounted at /parse:

**iOS / OS X / watchOS / tvOS**

_Swift_
```swift
let configuration = ParseClientConfiguration {
    $0.applicationId = "YOUR_APP_ID"
    $0.clientKey = ""
    $0.server = "http://localhost:1337/parse"
}
Parse.initializeWithConfiguration(configuration)
```

_Objective-C_
```objc
[Parse initializeWithConfiguration:[ParseClientConfiguration configurationWithBlock:^(id<ParseMutableClientConfiguration> configuration) {
   configuration.applicationId = @"YOUR_APP_ID";
   configuration.clientKey = @"";
   configuration.server = @"http://localhost:1337/parse";
}]];
```

**Android**

```java
Parse.initialize(new Parse.Configuration.Builder(myContext)
    .applicationId("YOUR_APP_ID")
    .clientKey(null)
    .server("http://localhost:1337/parse/") // The trailing slash is important.

    ...

    .build()
);
```

**JavaScript**

```js
Parse.initialize("YOUR_APP_ID");
Parse.serverURL = 'http://localhost:1337/parse'
```

**.NET**

```csharp
ParseClient.initialize(new ParseClient.Configuration {
    ApplicationId = "YOUR_APP_ID",
    Server = "http://localhost:1337/parse/"
});
```

**PHP**

```php
ParseClient::initialize('YOUR_APP_ID', 'YOUR_CLIENT_KEY', 'YOUR_MASTER_KEY');
ParseClient::setServerURL('http://localhost:1337/parse');
```

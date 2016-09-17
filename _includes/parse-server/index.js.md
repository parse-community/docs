##### index.js

---

Exposes the ParseServer constructor and mutates the Parse.Cloud namespace to support Cloud Code

---

```
// ParseServer works like a constructor of an express app.
// The args that we understand are:
// "databaseAdapter": a class like ExportAdapter providing create, find,
//                    update, and delete
// "filesAdapter": a class like GridStoreAdapter providing create, get,
//                 and delete
// "databaseURI": a uri like mongodb://localhost:27017/dbname to tell us
//          what database this Parse API connects to.
// "cloud": relative location to cloud code to require
// "appId": the application id to host
// "masterKey": the master key for requests to this app
// "collectionPrefix": optional prefix for database collection names
// "fileKey": optional key from Parse dashboard for supporting older files
//            hosted by Parse
// "clientKey": optional key from Parse dashboard
// "dotNetKey": optional key from Parse dashboard
// "restAPIKey": optional key from Parse dashboard
// "javascriptKey": optional key from Parse dashboard

var ParseServer = require('parse-server').ParseServer;

var api = new ParseServer({
	appId: 'my-app-id',
	masterKey: 'secret',
	cloud: './cloud/main.js'
});

myExpressApp.use('/parse', api);
```
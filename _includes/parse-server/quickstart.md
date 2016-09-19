# Getting Started

Parse Server is an open source version of the Parse backend that can be deployed to any infrastructure that can run Node.js. You can find the source on the [GitHub repo](/ParsePlatform/parse-server).

* Parse Server is not dependent on the hosted Parse backend.
* Parse Server uses MongoDB directly, and is not dependent on the Parse hosted database.
* You can migrate an existing app to your own infrastructure.
* You can develop and test your app locally using Node.

The fastest and easiest way to get started is to run MongoDB and Parse Server locally.

## Running Parse Server locally

```
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY
```

You can use any arbitrary string as your application id and master key. These will be used by your clients to authenticate with the Parse Server.

That's it! You are now running a standalone version of Parse Server on your machine.

**Using a remote MongoDB?** Pass the  `--databaseURI DATABASE_URI` parameter when starting `parse-server`. Learn more about configuring Parse Server [here](#configuration). For a full list of available options, run `parse-server --help`.

## Saving your first object

Now that you're running Parse Server, it is time to save your first object. We'll use the [REST API](https://parse.com/docs/rest/guide), but you can easily do the same using any of the [Parse SDKs](https://parseplatform.github.io/#sdks). Run the following:

```bash
curl -X POST \
-H "X-Parse-Application-Id: APPLICATION_ID" \
-H "Content-Type: application/json" \
-d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
http://localhost:1337/parse/classes/GameScore
```

You should get a response similar to this:

```js
{
  "objectId": "2ntvSpRGIK",
  "createdAt": "2016-03-11T23:51:48.050Z"
}
```

You can now retrieve this object directly (make sure to replace `2ntvSpRGIK` with the actual `objectId` you received when the object was created):

```bash
$ curl -X GET \
  -H "X-Parse-Application-Id: APPLICATION_ID" \
  http://localhost:1337/parse/classes/GameScore/2ntvSpRGIK
```
```json
// Response
{
  "objectId": "2ntvSpRGIK",
  "score": 1337,
  "playerName": "Sean Plott",
  "cheatMode": false,
  "updatedAt": "2016-03-11T23:51:48.050Z",
  "createdAt": "2016-03-11T23:51:48.050Z"
}
```

Keeping tracks of individual object ids is not ideal, however. In most cases you will want to run a query over the collection, like so:

```
$ curl -X GET \
  -H "X-Parse-Application-Id: APPLICATION_ID" \
  http://localhost:1337/parse/classes/GameScore
```
```json
// The response will provide all the matching objects within the `results` array:
{
  "results": [
    {
      "objectId": "2ntvSpRGIK",
      "score": 1337,
      "playerName": "Sean Plott",
      "cheatMode": false,
      "updatedAt": "2016-03-11T23:51:48.050Z",
      "createdAt": "2016-03-11T23:51:48.050Z"
    }
  ]
}

```

To learn more about using saving and querying objects on Parse Server, check out the [Parse documentation](https://parse.com/docs).

## Connect your app to Parse Server

Parse provides SDKs for all the major platforms. Refer to the Parse Server guide to [learn how to connect your app to Parse Server]({{ '/parse-server/guide' | prepend: site.baseurl }}#using-parse-sdks-with-parse-server).

# Getting Started

Parse Server is an open source version of the Parse backend that can be deployed to any infrastructure that can run Node.js. You can find the source on the [GitHub repo](https://github.com/parse-community/parse-server).

* Parse Server is not dependent on the hosted Parse backend.
* Parse Server uses MongoDB directly, and is not dependent on the Parse hosted database.
* You can migrate an existing app to your own infrastructure.
* You can develop and test your app locally using Node.

**Prerequisites**

* Node 4.3
* MongoDB version 2.6.X, 3.0.X or 3.2.X
* Python 2.x (For Windows users, 2.7.1 is the required version)
* For deployment, an infrastructure provider like Heroku or AWS

**Compatibility with hosted Parse**

There are a few areas where Parse Server does not provide compatibility with the Parse hosted backend. If you're migrating a hosted Parse.com app to Parse Server, please take some time to carefully read through the list of [compatibility issues](#compatibility-with-parsecom).

The fastest and easiest way to get started is to run MongoDB and Parse Server locally. Use the bootstrap script to set up Parse Server in the current directory.

```bash
$ sh <(curl -fsSL https://raw.githubusercontent.com/parse-community/parse-server/master/bootstrap.sh)
$ npm install -g mongodb-runner
$ mongodb-runner start
$ npm start
```

You can use any arbitrary string as your application id and master key. These will be used by your clients to authenticate with the Parse Server.

That's it! You are now running a standalone version of Parse Server on your machine.

## Saving your first object

Now that you're running Parse Server, it is time to save your first object. We'll use the [REST API]({{ site.baseUrl }}/rest/guide), but you can easily do the same using any of the [Parse SDKs]({{ site.baseUrl }}/). Run the following:

```bash
curl -X POST \
-H "X-Parse-Application-Id: APPLICATION_ID" \
-H "Content-Type: application/json" \
-d '{"score":123,"playerName":"Sean Plott","cheatMode":false}' \
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

```js
// Response
{
  "objectId": "2ntvSpRGIK",
  "score": 123,
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

```js
// The response will provide all the matching objects within the `results` array:
{
  "results": [
    {
      "objectId": "2ntvSpRGIK",
      "score": 123,
      "playerName": "Sean Plott",
      "cheatMode": false,
      "updatedAt": "2016-03-11T23:51:48.050Z",
      "createdAt": "2016-03-11T23:51:48.050Z"
    }
  ]
}

```

To learn more about using saving and querying objects on Parse Server, check out the [documentation]({{ site.baseUrl }}/) for the SDK you will be using in your app.

## Connect your app to Parse Server

Parse provides SDKs for all the major platforms. Refer to the rest of the Parse Server guide to [learn how to connect your app to Parse Server](#using-parse-sdks-with-parse-server).

## Running Parse Server elsewhere

Once you have a better understanding of how the project works, please refer to the [Deploying Parse Server section](#deploying-parse-server) to learn more about additional ways of running Parse Server.

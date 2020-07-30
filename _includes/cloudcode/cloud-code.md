# Cloud Functions

Let's look at a slightly more complex example where Cloud Code is useful. One reason to do computation in the cloud is so that you don't have to send a huge list of objects down to a device if you only want a little bit of information. For example, let's say you're writing an app that lets people review movies. A single `Review` object could look like:

```json
{
  "movie": "The Matrix",
  "stars": 5,
  "comment": "Too bad they never made any sequels."
}
```

If you wanted to find the average number of stars for The Matrix, you could query for all of the reviews, and average the stars on the device. However, this uses a lot of bandwidth when you only need a single number. With Cloud Code, we can just pass up the name of the movie, and return the average star rating.

Cloud functions accept a JSON parameters dictionary on the `request` object, so we can use that to pass up the movie name. The entire Parse JavaScript SDK is available in the cloud environment, so we can use that to query over `Review` objects. Together, the code to implement `averageStars` looks like:

```javascript
Parse.Cloud.define("averageStars", async (request) => {
  const query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
  const results = await query.find();
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i].get("stars");
  }
  return sum / results.length;
});
```

The only difference between using `averageStars` and `hello` is that we have to provide the parameter that will be accessed in `request.params.movie` when we call the Cloud function. Read on to learn more about how Cloud functions can be called.

Cloud functions can be called from any of the client SDKs, as well as through the REST API. For example, to call the Cloud function named `averageStars` with a parameter named `movie` from an Android app:

```java
HashMap<String, Object> params = new HashMap<String, Object>();
params.put("movie", "The Matrix");
ParseCloud.callFunctionInBackground("averageStars", params, new FunctionCallback<Float>() {
   void done(Float ratings, ParseException e) {
       if (e == null) {
          // ratings is 4.5
       }
   }
});
```

To call the same Cloud function from an iOS app:

```objective_c
// Objective-C
[PFCloud callFunctionInBackground:@"averageStars"
                   withParameters:@{@"movie": @"The Matrix"}
                            block:^(NSNumber *ratings, NSError *error) {
  if (!error) {
     // ratings is 4.5
  }
}];
```

```swift
// Swift
PFCloud.callFunction(inBackground: "averageRatings", withParameters: ["movie":"The Matrix"]) {
	(response, error) in
	let ratings = response as? Float
	// ratings is 4.5
}
```

This is how you would call the same Cloud function using PHP:

```php
$ratings = ParseCloud::run("averageRatings", ["movie" => "The Matrix"]);
// $ratings is 4.5
```

The following example shows how you can call the "averageRatings" Cloud function from a .NET C# app such as in the case of Windows 10, Unity, and Xamarin applications:

```cs
IDictionary<string, object> params = new Dictionary<string, object>
{
    { "movie", "The Matrix" }
};
ParseCloud.CallFunctionAsync<IDictionary<string, object>>("averageStars", params).ContinueWith(t => {
  var ratings = t.Result;
  // ratings is 4.5
});
```

You can also call Cloud functions using the REST API:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{ "movie": "The Matrix" }' \
  https://YOUR.PARSE-SERVER.HERE/parse/functions/averageStars
```

And finally, to call the same function from a JavaScript app:

```javascript
const params =  { movie: "The Matrix" };
const ratings = await Parse.Cloud.run("averageStars", params);
// ratings should be 4.5
```

In general, two arguments will be passed into cloud functions:

1.  **`request`** - The request object contains information about the request. The following fields are set:
  1.  **`params`** - The parameters object sent to the function by the client.
  2.  **`user`** - The `Parse.User` that is making the request.  This will not be set if there was no logged-in user.

If the function is successful, the response in the client looks like:

```json
{ "result": 4.8 }
```

If there is an error, the response in the client looks like:

```json
{
  "code": 141,
  "error": "movie lookup failed"
}
```

# Cloud Jobs

Sometimes you want to execute long running functions, and you don't want to wait for the response. Cloud Jobs are meant for just that.

## Define a Job

```javascript
    Parse.Cloud.job("myJob", (request) =>  {
      // params: passed in the job call
      // headers: from the request that triggered the job
      // log: the ParseServer logger passed in the request
      // message: a function to update the status message of the job object
      const { params, headers, log, message } = request;
      message("I just started");
      return doSomethingVeryLong(request);
    });
```

## Running a Job

Calling jobs is done via the REST API and is protected by the master key.

```sh
curl -X POST -H 'X-Parse-Application-Id: appId' -H 'X-Parse-Master-Key: masterKey' https://my-parse-server.com/parse/jobs/myJob
```

The response will consist of an empty body and contain the `X-Parse-Job-Status-Id: a1c3e5g7i9k` header. With the _JobStatus's objectId that has just been created.

You can pass some data alongside the call if you want to customize the job execution.

## Scheduling a Job

We don't support at the moment job scheduling and highly recommend to use a 3rd party system for scheduling your jobs.

- On [AWS Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html#worker-periodictasks)
- On [Google App Engine](https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml)
- On [Heroku](https://devcenter.heroku.com/articles/scheduler#scheduling-jobs)

## Viewing Jobs

Viewing jobs is supported on parse-dashboard starting version 1.0.19, but you can also query the _JobStatus class with a masterKey call to fetch your recent jobs.

# Save Triggers

## beforeSave

### Implementing validation

Another reason to run code in the cloud is to enforce a particular data format. For example, you might have both an Android and an iOS app, and you want to validate data for each of those. Rather than writing code once for each client environment, you can write it just once with Cloud Code.

Let's take a look at our movie review example. When you're choosing how many stars to give something, you can typically only give 1, 2, 3, 4, or 5 stars. You can't give -6 stars or 1337 stars in a review. If we want to reject reviews that are out of bounds, we can do this with the `beforeSave` method:

```javascript
Parse.Cloud.beforeSave("Review", (request) => {
  if (request.object.get("stars") < 1) {
    throw "you cannot give less than one star";
  }

  if (request.object.get("stars") > 5) {
    throw "you cannot give more than five stars";
  }
});

```

If the function throws, the `Review` object will not be saved, and the client will get an error. If nothing is thrown the object will be saved normally.

One useful tip is that even if your mobile app has many different versions, the same version of Cloud Code applies to all of them. Thus, if you launch an application that doesn't correctly check the validity of input data, you can still fix this problem by adding a validation with `beforeSave`.

### Modifying Objects on Save

In some cases, you don't want to throw out invalid data. You just want to tweak it a bit before saving it. `beforeSave` can handle this case, too. Any adjustment you make to request.object will be saved.

In our movie review example, we might want to ensure that comments aren't too long. A single long comment might be tricky to display. We can use `beforeSave` to truncate the `comment` field to 140 characters:

```javascript
Parse.Cloud.beforeSave("Review", (request) => {
  const comment = request.object.get("comment");
  if (comment.length > 140) {
    // Truncate and add a ...
    request.object.set("comment", comment.substring(0, 137) + "...");
  }
});
```

### Predefined Classes
If you want to use `beforeSave` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.beforeSave(Parse.User, async (request) => {
    // code here
})
```

## afterSave

In some cases, you may want to perform some action, such as a push, after an object has been saved. You can do this by registering a handler with the `afterSave` method. For example, suppose you want to keep track of the number of comments on a blog post. You can do that by writing a function like this:

```javascript
Parse.Cloud.afterSave("Comment", (request) => {
  const query = new Parse.Query("Post");
  query.get(request.object.get("post").id)
    .then(function(post) {
      post.increment("comments");
      return post.save();
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
});
```

### Async Behavior

In the example above, the client will receive a successful response before the promise in the handler completes, regardless of how the promise resolves. For instance, the client will receive a successful response even if the handler throws an exception. Any errors that occurred while running the handler can be found in the Cloud Code log.

You can use an `afterSave` handler to perform lengthy operations after sending a response back to the client.  In order to respond to the client before the `afterSave` handler completes, your handler may not return a promise and your `afterSave` handler may not use async/await.

### Predefined Classes

If you want to use `afterSave` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.afterSave(Parse.User, async (request) => {
    // code here
})
```

## Context

When saving a `Parse.Object` you may pass a `context` dictionary that is accessible in the Cloud Code Save Triggers. More info in the [JavaScript Guide]({{ site.baseUrl }}/js/guide/#cloud-code-context).

The context is also passed from a `beforeSave` handler to an `afterSave` handler.  The following example sends emails to users who are being added to a [Parse.Role's users relation](https://parseplatform.org/Parse-SDK-JS/api/2.1.0/Parse.Role.html#getUsers) asynchronously, so the client receives a response before the emails complete sending:

```javascript
const beforeSave = function beforeSave(request) {
  const { object: role } = request;
  // Get users that will be added to the users relation.
  const usersOp = role.op('users');
  if (usersOp && usersOp.relationsToAdd.length > 0) {
    // add the users being added to the request context
    request.context = { buyers: usersOp.relationsToAdd };
  }
};

const afterSave = function afterSave(request) {
  const { object: role, context } = request;
  if (context && context.buyers) {
    const purchasedItem = getItemFromRole(role);
    const promises = context.buyers.map(emailBuyer.bind(null, purchasedItem));
    item.increment('orderCount', context.buyers.length);
    promises.push(item.save(null, { useMasterKey: true }));
    Promise.all(promises).catch(request.log.error.bind(request.log));
  }
};

```
# Delete Triggers

## beforeDelete

You can run custom Cloud Code before an object is deleted. You can do this with the `beforeDelete` method. For instance, this can be used to implement a restricted delete policy that is more sophisticated than what can be expressed through  [ACLs]({{ site.apis.js }}/classes/Parse.ACL.html). For example, suppose you have a photo album app, where many photos are associated with each album, and you want to prevent the user from deleting an album if it still has a photo in it. You can do that by writing a function like this:

```javascript
Parse.Cloud.beforeDelete("Album", (request) => {
  const query = new Parse.Query("Photo");
  query.equalTo("album", request.object);
  query.count()
    .then((count) => {
      if (count > 0) {
        throw "Can't delete album if it still has photos.";
    })
    .catch((error) {
      throw "Error " + error.code + " : " + error.message + " when getting photo count.";
    });
});
```

If the function throws, the `Album` object will not be deleted, and the client will get an error. Otherwise,the object will be deleted normally.

### Predefined Classes
If you want to use `beforeDelete` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.beforeDelete(Parse.User, async (request) => {
    // code here
})
```

## afterDelete

In some cases, you may want to perform some action, such as a push, after an object has been deleted. You can do this by registering a handler with the `afterDelete` method. For example, suppose that after deleting a blog post, you also want to delete all associated comments. You can do that by writing a function like this:

```javascript
Parse.Cloud.afterDelete("Post", (request) => {
  const query = new Parse.Query("Comment");
  query.equalTo("post", request.object);
  query.find()
    .then(Parse.Object.destroyAll)
    .catch((error) => {
      console.error("Error finding related comments " + error.code + ": " + error.message);
    });
});
```

The `afterDelete` handler can access the object that was deleted through `request.object`. This object is fully fetched, but cannot be refetched or resaved.

The client will receive a successful response to the delete request after the handler terminates, regardless of how the `afterDelete` terminates. For instance, the client will receive a successful response even if the handler throws an exception. Any errors that occurred while running the handler can be found in the Cloud Code log.

### Predefined Classes
If you want to use `afterDelete` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.afterDelete(Parse.User, async (request) => {
    // code here
})
```

# File Triggers

## beforeSaveFile

With the `beforeSaveFile` method you can run custom Cloud Code before any file is saved. Returning a new `Parse.File` will save the new file instead of the one sent by the client.

### Examples

```javascript
// Changing the file name
Parse.Cloud.beforeSaveFile(async (request) => {
  const { file } = request;
  const fileData = await file.getData();
  const newFile = new Parse.File('a-new-file-name.txt', { base64: fileData });
  return newFile;
});

// Returning an already saved file
Parse.Cloud.beforeSaveFile((request) => {
  const { user } = request;
  const avatar = user.get('avatar'); // this is a Parse.File that is already saved to the user object
  return avatar;
});

// Saving a different file from uri
Parse.Cloud.beforeSaveFile((request) => {
  const newFile = new Parse.File('some-file-name.txt', { uri: 'www.somewhere.com/file.txt' });
  return newFile;
});
```

### Metadata and Tags

Adding Metadata and Tags to your files allows you to add additional bits of data to the files that are stored within your storage solution (i.e AWS S3). The `beforeSaveFile` hook is a great place to set the metadata and/or tags on your files.

Note: not all storage adapters support metadata and tags. Check the documentation for the storage adapter you're using for compatibility.

```javascript
// Adding metadata and tags
Parse.Cloud.beforeSaveFile((request) => {
  const { file, user } = request;
  file.addMetadata('createdById', user.id);
  file.addTag('groupId', user.get('groupId'));
});
```

## afterSaveFile

The `afterSaveFile` method is a great way to keep track of all of the files stored in your app. For example:

```javascript
Parse.Cloud.afterSaveFile(async (request) => {
  const { file, fileSize, user } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('file', file);
  fileObject.set('fileSize', fileSize);
  fileObject.set('createdBy', user);
  const token = { sessionToken: user.getSessionToken() };
  await fileObject.save(null, token);
});
```

## beforeDeleteFile

You can run custom Cloud Code before any file gets deleted. For example, lets say you want to add logic that only allows files to be deleted by the user who created it. You could use a combination of the `afterSaveFile` and the `beforeDeleteFile` methods as follows:

```javascript
Parse.Cloud.afterSaveFile(async (request) => {
  const { file, user } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('fileName', file.name());
  fileObject.set('createdBy', user);
  await fileObject.save(null, { useMasterKey: true );
});

Parse.Cloud.beforeDeleteFile(async (request) => {
  const { file, user } = request;
  const query = new Parse.Query('FileObject');
  query.equalTo('fileName', file.name());
  const fileObject = await query.first({ useMasterKey: true });
  if (fileObject.get('createdBy').id !== user.id) {
    throw 'You do not have permission to delete this file';
  }
});
```

## afterDeleteFile

In the above `beforeDeleteFile` example the `FileObject` collection is used to keep track of saved files in your app. The `afterDeleteFile` trigger is a good place to clean up these objects once a file has been successfully deleted.

```javascript
Parse.Cloud.afterDeleteFile(async (request) => {
  const { file } = request;
  const query = new Parse.Query('FileObject');
  query.equalTo('fileName', file.name());
  const fileObject = await query.first({ useMasterKey: true });
  await fileObject.destroy({ useMasterKey: true });
});
```

# Find Triggers

## beforeFind

*Available only on parse-server cloud code starting 2.2.20*

In some cases you may want to transform an incoming query, adding an additional limit or increasing the default limit, adding extra includes or restrict the results to a subset of keys. You can do so with the `beforeFind` trigger.

### Examples

```javascript
// Properties available
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query; // the Parse.Query
  let user = req.user; // the user
  let triggerName = req.triggerName; // beforeFind
  let isMaster = req.master; // if the query is run with masterKey
  let isCount = req.count; // if the query is a count operation (available on parse-server 2.4.0 or up)
  let logger = req.log; // the logger
  let installationId = req.installationId; // The installationId
});

// Selecting keys
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query; // the Parse.Query
  // Force the selection on some keys
  query.select(['key1', 'key2']);
});

// Asynchronous support
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query;
  return aPromise().then((results) => {
    // do something with the results
    query.containedIn('key', results);
  });
});

// Returning a different query
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query;
  let otherQuery = new Parse.Query('MyObject');
  otherQuery.equalTo('key', 'value');
  return Parse.Query.or(query, otherQuery);
});

// Rejecting a query
Parse.Cloud.beforeFind('MyObject', (req) =>  {
  // throw an error
  throw new Parse.Error(101, 'error');

  // rejecting promise
  return Promise.reject('error');
});

// Setting the read preference for a query
// -- as of Parse Server 2.5, Mongo Only
Parse.Cloud.beforeFind('MyObject2', (req) => {
  req.readPreference = 'SECONDARY_PREFERRED';
  req.subqueryReadPreference = 'SECONDARY';
  req.includeReadPreference = 'PRIMARY';
});

```

### Predefined Classes

If you want to use `beforeFind` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.beforeFind(Parse.User, async (request) => {
    // code here
})
```

## afterFind

*Available only on parse-server cloud code starting 2.2.25*

In some cases you may want to manipulate the results of a query before they are sent to the client. You can do so with the `afterFind` trigger.

```
Parse.Cloud.afterFind('MyCustomClass', async (request) => {
    // code here
})
```

### Predefined Classes

If you want to use `afterFind` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself, for example:

```javascript
Parse.Cloud.afterFind(Parse.User, async (request) => {
    // code here
})
```

# Session Triggers

## beforeLogin

*Available only on parse-server cloud code starting 3.3.0*

Sometimes you may want to run custom validation on a login request. The `beforeLogin` trigger can be used for blocking an account from logging in (for example, if they are banned), recording a login event for analytics, notifying user by email if a login occurred at an unusual IP address and more.

```javascript
Parse.Cloud.beforeLogin(async request => {
  const { object: user }  = request;
  if(user.get('isBanned')) {
   throw new Error('Access denied, you have been banned.')
  }
});
```

### Some considerations to be aware of

- It waits for any promises to resolve
- The user is not available on the request object - the user has not yet been provided a session until after beforeLogin is successfully completed
- Like `afterSave` on `Parse.User`, it will not save mutations to the user unless explicitly saved

#### The trigger will run...
- On username & password logins
- On `authProvider` logins

#### The trigger won't run...
- On sign up
- If the login credentials are incorrect

## afterLogout

*Available only on parse-server cloud code starting 3.10.0*

Sometimes you may want to run actions after a user logs out. For example, the `afterLogout` trigger can be used for clean-up actions after a user logs out. The triggers contains the session object that has been deleted on logout. From this session object you can determine the user who logged out to perform user-specific tasks.

```javascript
Parse.Cloud.afterLogout(async request => {
  const { object: session }  = request;
  const user = session.get('user');
  user.set('isOnline', false);
  user.save(null,{useMasterKey:true});
});
```

### Some considerations to be aware of
- Like with `afterDelete` triggers, the `_Session` object that is contained in the request has already been deleted.

#### The trigger will run...
- when the user logs out and a `_Session` object was deleted

### The trigger won't run...
- if a user logs out and no `_Session` object was found to delete
- if a `_Session` object is deleted without the user logging out by calling the logout method of an SDK

# LiveQuery Triggers

## beforeConnect

*Available only on parse-server cloud code starting 4.3.0*

You can run custom Cloud Code before a user attempts to connect to your LiveQuery server with the `beforeConnect` method. For instance, this can be used to only allow users that have logged in to connect to the LiveQuery server. 

```javascript
Parse.Cloud.beforeConnect(request => {
  if (!request.user) {
    throw "Please login before you attempt to connect."
  }
});
```

In most cases, the `connect` event called the first time the client calls `subscribe`. If this is your use case, you can listen for errors using this event.

```javascript
Parse.LiveQuery.on('error', (error) => {
  console.log(error);
});
```

## beforeSubscribe

*Available only on parse-server cloud code starting 4.3.0*

In some cases you may want to transform the incoming subscription query. Examples include adding an additional limit, increasing the default limit, adding extra includes or restricting the results to a subset of keys. You can do so with the `beforeSubscribe` trigger. 

```javascript
Parse.Cloud.beforeSubscribe('MyObject', request => {
    if (!request.user.get('Admin')) {
        throw new Parse.Error(101, 'You are not authorized to subscribe to MyObject.');
    }
    let query = request.query; // the Parse.Query
    query.select("name","year")
});
```

## onLiveQueryEvent

*Available only on parse-server cloud code starting 2.6.2*

Sometimes you may want to monitor Live Query Events to be used with a 3rd Party such as datadog. The `onLiveQueryEvent` trigger can log events triggered, number of clients connected, number of subscriptions and errors.

```javascript
Parse.Cloud.onLiveQueryEvent(({
  event,
  client,
  sessionToken,
  useMasterKey,
  installationId,
  clients,
  subscriptions,
  error
}) => {
  if (event !== 'ws_disconnect') {
    return;
  }
  // Do your magic
});
```
*client, sessionToken, useMasterKey and installationId are available on parse-server cloud code 3.8.0+*

To learn more, read the [Parse LiveQuery Protocol Specification](https://github.com/parse-community/parse-server/wiki/Parse-LiveQuery-Protocol-Specification)

## Events

* connect
* subscribe
* unsubscribe
* ws_connect
* ws_disconnect
* ws_disconnect_error

"connect" differs from "ws_connect", the former means that the client completed the connect procedure as defined by Parse Live Query protocol, where "ws_connect" just means that a new websocket was created.

# Using the Master Key in cloud code
Set `useMasterKey:true` in the requests that require master key.

## Examples:

```javascript
query.find({useMasterKey:true});
object.save(null,{useMasterKey:true});
Parse.Object.saveAll(objects,{useMasterKey:true});
```

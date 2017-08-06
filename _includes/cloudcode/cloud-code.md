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
Parse.Cloud.define("averageStars", function(request, response) {
  const query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
    .find()
    .then((results) => {
      let sum = 0;
      for (let i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success(sum / results.length);
    })
    .catch(() =>  {
      response.error("movie lookup failed");
    });
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

```objectivec
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
PFCloud.callFunctionInBackground("averageRatings", withParameters: ["movie":"The Matrix"]) {
  (response: AnyObject?, error: NSError?) -> Void in
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
  https://api.parse.com/1/functions/averageStars
```

And finally, to call the same function from a JavaScript app:

```javascript
Parse.Cloud.run('averageStars', { movie: 'The Matrix' }).then(function(ratings) {
  // ratings should be 4.5
});
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

Sometimes you want to execute long running functions, and you don't want to wait for the response. Cloud Jobs are just meant for that.

## Define a Job

```javascript
Parse.Cloud.job("myJob", function(request, status) {
  // the params passed through the start request
  const params = request.params;
  // Headers from the request that triggered the job
  const headers = request.headers;

  // get the parse-server logger
  const log = request.log;

  // Update the Job status message
  status.message("I just started");
  doSomethingVeryLong().then(function(result) {
    // Mark the job as successful
    // success and error only support string as parameters
    status.success("I just finished");
  })
  .catch(function(error) {
    // Mark the job as errored
    status.error("There was an error");
  });
});
```

Note that calling `status.success` or `status.error` won't prevent any further execution of the job.

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

# beforeSave Triggers

## Implementing validation

Another reason to run code in the cloud is to enforce a particular data format. For example, you might have both an Android and an iOS app, and you want to validate data for each of those. Rather than writing code once for each client environment, you can write it just once with Cloud Code.

Let's take a look at our movie review example. When you're choosing how many stars to give something, you can typically only give 1, 2, 3, 4, or 5 stars. You can't give -6 stars or 1337 stars in a review. If we want to reject reviews that are out of bounds, we can do this with the `beforeSave` method:

```javascript
Parse.Cloud.beforeSave("Review", function(request, response) {
  if (request.object.get("stars") < 1) {
    response.error("you cannot give less than one star");
  } else if (request.object.get("stars") > 5) {
    response.error("you cannot give more than five stars");
  } else {
    response.success();
  }
});
```

If `response.error` is called, the `Review` object will not be saved, and the client will get an error. If `response.success` is called, the object will be saved normally. Your code should call one of these two callbacks.

One useful tip is that even if your mobile app has many different versions, the same version of Cloud Code applies to all of them. Thus, if you launch an application that doesn't correctly check the validity of input data, you can still fix this problem by adding a validation with `beforeSave`.

If you want to use `beforeSave` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself:

```javascript
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("email")) {
    response.error("email is required for signup");
  } else {
    response.success();
  }
});
```

## Modifying Objects on Save

In some cases, you don't want to throw out invalid data. You just want to tweak it a bit before saving it. `beforeSave` can handle this case, too. You just call `response.success` on the altered object.

In our movie review example, we might want to ensure that comments aren't too long. A single long comment might be tricky to display. We can use `beforeSave` to truncate the `comment` field to 140 characters:

```javascript
Parse.Cloud.beforeSave("Review", function(request, response) {
  var comment = request.object.get("comment");
  if (comment.length > 140) {
    // Truncate and add a ...
    request.object.set("comment", comment.substring(0, 137) + "...");
  }
  response.success();
});
```

# afterSave Triggers

In some cases, you may want to perform some action, such as a push, after an object has been saved. You can do this by registering a handler with the `afterSave` method. For example, suppose you want to keep track of the number of comments on a blog post. You can do that by writing a function like this:

```javascript
Parse.Cloud.afterSave("Comment", function(request) {
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

The client will receive a successful response to the save request after the handler terminates, regardless of how it terminates. For instance, the client will receive a successful response even if the handler throws an exception. Any errors that occurred while running the handler can be found in the Cloud Code log.

If you want to use `afterSave` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself.

# beforeDelete Triggers

You can run custom Cloud Code before an object is deleted. You can do this with the `beforeDelete` method. For instance, this can be used to implement a restricted delete policy that is more sophisticated than what can be expressed through  [ACLs]({{ site.apis.js }}/classes/Parse.ACL.html). For example, suppose you have a photo album app, where many photos are associated with each album, and you want to prevent the user from deleting an album if it still has a photo in it. You can do that by writing a function like this:

```javascript
Parse.Cloud.beforeDelete("Album", function(request, response) {
  const query = new Parse.Query("Photo");
  query.equalTo("album", request.object);
  query.count()
    .then(function(count) {
      if (count > 0) {
        response.error("Can't delete album if it still has photos.");
      } else {
        response.success();
      }
    })
    .catch(function(error) {
      response.error("Error " + error.code + " : " + error.message + " when getting photo count.");
    });
});
```

If `response.error` is called, the `Album` object will not be deleted, and the client will get an error. If `response.success` is called, the object will be deleted normally. Your code should call one of these two callbacks.

If you want to use `beforeDelete` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself.


# afterDelete Triggers

In some cases, you may want to perform some action, such as a push, after an object has been deleted. You can do this by registering a handler with the `afterDelete` method. For example, suppose that after deleting a blog post, you also want to delete all associated comments. You can do that by writing a function like this:

```javascript
Parse.Cloud.afterDelete("Post", function(request) {
  const query = new Parse.Query("Comment");
  query.equalTo("post", request.object);
  query.find()
    .then(Parse.Object.destroyAll)
    .catch(function(error) {
      console.error("Error finding related comments " + error.code + ": " + error.message);
    });
});
```

The `afterDelete` handler can access the object that was deleted through `request.object`. This object is fully fetched, but cannot be refetched or resaved.

The client will receive a successful response to the delete request after the handler terminates, regardless of how it terminates. For instance, the client will receive a successful response even if the handler throws an exception. Any errors that occurred while running the handler can be found in the Cloud Code log.

If you want to use `afterDelete` for a predefined class in the Parse JavaScript SDK (e.g. [Parse.User]({{ site.apis.js }}classes/Parse.User.html)), you should not pass a String for the first argument. Instead, you should pass the class itself.

# beforeFind Triggers

*Available only on parse-server cloud code starting 2.2.20*

In some cases you may want to transform an incoming query, adding an additional limit or increasing the default limit, adding extra includes or restrict the results to a subset of keys. You can do so with the `beforeFind` trigger.


## Examples

```javascript
// Properties available
Parse.Cloud.beforeFind('MyObject', function(req) {
  let query = req.query; // the Parse.Query
  let user = req.user; // the user
  let triggerName = req.triggerName; // beforeFind
  let isMaster = req.master; // if the query is run with masterKey
  let isCount = req.count; // if the query is a count operation (available on parse-server 2.4.0 or up)
  let logger = req.log; // the logger
  let installationId = req.installationId; // The installationId
});

// Selecting keys
Parse.Cloud.beforeFind('MyObject', function(req) {
  let query = req.query; // the Parse.Query
  // Force the selection on some keys
  query.select(['key1', 'key2']);
});

// Asynchronous support
Parse.Cloud.beforeFind('MyObject', function(req) {
  let query = req.query;
  return aPromise().then((results) => {
    // do something with the results
    query.containedIn('key', results);
  });
});

// Returning a different query
Parse.Cloud.beforeFind('MyObject', function(req) {
  let query = req.query;
  let otherQuery = new Parse.Query('MyObject');
  otherQuery.equalTo('key', 'value');
  return Parse.Query.or(query, otherQuery);
});

// Rejecting a query
Parse.Cloud.beforeFind('MyObject', function(req) {
  // throw an error
  throw new Parse.Error(101, 'error');

  // rejecting promise
  return Promise.reject('error');
});
```

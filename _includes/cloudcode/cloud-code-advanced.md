# Advanced Cloud Code

## Networking

Cloud Code allows sending HTTP requests to any HTTP Server using [`Parse.Cloud.httpRequest`](/docs/js/api/classes/Parse.Cloud.html#methods_httpRequest).  This function takes an options object to configure the call.  There is a limit of 8 concurrent `httpRequest`s per Cloud Code request, and additional requests will be queued up.

A simple GET request would look like:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.parse.com/'
}).then(function(httpResponse) {
  // success
  console.log(httpResponse.text);
},function(httpResponse) {
  // error
  console.error('Request failed with response code ' + httpResponse.status);
});
```

`Parse.Cloud.httpRequest` returns a Promise that will be resolved on a successful http status code; otherwise the Promise will be rejected. In the above example, we use `then()` to handle both outcomes.

A GET request that specifies the port number would look like:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.parse.com:8080/'
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

Valid port numbers are 80, 443, and all numbers from 1025 through 65535.

### Query Parameters

You can specify query parameters to append to the end of the url by setting `params` on the options object.  You can either pass a JSON object of key value pairs like:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.google.com/search',
  params: {
    q : 'Sean Plott'
  }
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

or as a raw `String` like this:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.google.com/search',
  params: 'q=Sean Plott'
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

### Setting Headers

You can send HTTP Headers by setting the `header` attribute of the options object.  Let's say you want set the Content-Type of the request, you can do:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.example.com/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```


### Sending a POST Request

You can send a post request by setting the `method` attribute of the options object.  The body of the POST can be set using the `body`. A simple example would be:

```js
Parse.Cloud.httpRequest({
  method: 'POST',
  url: 'http://www.example.com/create_post',
  body: {
    title: 'Vote for Pedro',
    body: 'If you vote for Pedro, your wildest dreams will come true'
  }
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

This will send a post to `http://www.example.com/create_post` with body that is the url form encoded `body` attribute.  If you want the body to be JSON encoded, you can instead do:

```js
Parse.Cloud.httpRequest({
  method: 'POST',
  url: 'http://www.example.com/create_post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: {
    title: 'Vote for Pedro',
    body: 'If you vote for Pedro, your wildest dreams will come true'
  }
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

To ensure that your HTTP request body is encoded correctly, please always include the charset in your Content-Type header.


### Following Redirects

By default, `Parse.Cloud.httpRequest` does not follow redirects caused by HTTP 3xx response codes. You can use the `followRedirects` option to change this behavior to follow redirects:

```js
Parse.Cloud.httpRequest({
  url: 'http://www.example.com/',
  followRedirects: true
}).then(function(httpResponse) {
  console.log(httpResponse.text);
}, function(httpResponse) {
  console.error('Request failed with response code ' + httpResponse.status);
});
```

### The Response Object

The response object passed into the `success` and `error` will contain:

* **`status`** - The HTTP Response status.
* **`headers`** - The response headers
* **`buffer`** - The raw byte representation of the response body.
* **`text`** - The raw response body.
* **`data`** - The parsed response, if Cloud Code knows how to parse the content-type that was sent.
* **`cookies`** - The cookies sent by the server. They are [Parse.Cloud.Cookie](/docs/js/api/classes/Parse.Cloud.HTTPResponse.html) objects.

## Modules

<div class='tip info'><div>
  Cloud Code and Node.js are both built on the V8 JavaScript engine, but Cloud Code is not Node.js. [npm](https://www.npmjs.com) packages are not guaranteed to work out of the box on Cloud Code.
</div></div>

Cloud Code supports breaking up JavaScript code into modules. You can check out [this tutorial](/tutorials/integrating-with-third-party-services) for an in depth look at creating your own. In order to avoid unwanted side effects from loading modules, Cloud Code's modules work similarly to CommonJS modules. When a module is loaded, the JavaScript file is loaded, the source executed and the global `module.exports` object is returned. For example, if `cloud/name.js` has the following source:

```js
var coolNames = ['Ralph', 'Skippy', 'Chip', 'Ned', 'Scooter'];
module.exports.isACoolName = function(name) {
  return coolNames.indexOf(name) !== -1;
}
```

and `cloud/main.js` contains:

```js
var name = require('cloud/name.js');
name.isACoolName('Fred'); // returns false
name.isACoolName('Skippy'); // returns true;
name.coolNames; // undefined.
```

`name` contains a function called `isACoolName`.  The path used by `require` is relative to the root directory of your Parse project.  Only modules in the `cloud/` directory can be loaded.

## Cloud Code Webhooks

Webhooks allow you to write your server-side logic in your own environment with any tools you wish to use. This can be useful if you want to use a language other than JavaScript, host it yourself for improved testing capabilities, or if you require a specialized library or technology not available in Cloud Code. Webhooks are currently available for `beforeSave`, `afterSave`, `beforeDelete`, `afterDelete`, and Cloud functions. To specify a new webhook, you can use the Parse Dashboard in the Webhooks section located under Core.

We've written an example Cloud Code Webhooks server, in Express.js, which you can find on Github: [CloudCodeWebhooks-Express](https://github.com/ParsePlatform/CloudCodeWebhooks-Express).

Note: At the current time, custom webhooks cannot be set for the special classes _User and _Installation.

### Cloud Function Webhooks

A webhook request for a Cloud function will contain the following parameters:

*   **master**: True if the master key was used and false otherwise.
*   **user**: If set, this will contain the Parse User who made the request, in our REST API format. This is not set if the master key is used.
*   **installationId**: If available, the installationId which made the request.
*   **params**: A JSON object containing the parameters passed to the function. For example: `{ "foo": "bar" }`
*   **functionName**: The name of the Cloud function.

To respond to this request, send a JSON object with the key `error` or `success` set. In the case of `success`, send back any data your client will expect; or simply `true` if your client doesn't require any data. In the case of `error`, the value provided should be the error message you want to return.

To create a webhook for a Cloud function, start by writing the function's code on your own server. Here's the simple hello world function written in a Rails environment.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity. protect_from_forgery :except => :index

def index
  # Ensure the request is authorized. You can find this key on your app's settings page
  # and you should ALWAYS validate it in your request.
  if request.headers['X-Parse-Webhook-Key'] !== @webhook_key
    return render :json => { :error => "Request Unauthorized"}
  end

  # Check the function name and return a message if it's correct
  if params[:functionName] == "helloWorld"
    return render :json => { :success => "Hello World!" }
  end

  # Return an error if it's not the function we expected
  return render :json => { :error => "Unknown function"}
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": false,
  "user": {
    "createdAt": "2015-03-24T20:19:00.542Z",
    "objectId": "lValKpphWN",
    "sessionToken": "orU3ClA7sqMIN8g4KtmLe7eDM",
    "updatedAt": "2015-03-24T20:19:00.542Z",
    "username": "Matt"
  },
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "params": {},
  "functionName": "helloWorld"
}
```

This response would indicate a success in the webhook:

```json
// Returned from the webhook on success
{ "success": "Hello World!" }
```

This response would indicate an error in the webhook:

```json
// Returned from the webhook on error
{ "error": "Error message >:(" }
```

You can activate this webhook from the Dashboard UI.

![]({{ '/assets/images/new_webhook.png' | prepend: site.baseurl }})

Once the webhook is set, you can call it from any of our SDKs or from the REST API, the same way you would a normal Cloud function.

Here's a more complex example where we use a webhook to perform some task for our billing pipeline. We'll use the popular `resque` gem to enqueue a job that handles billing the given user. For this example, the function is named `chargeCustomer` and it should always be called with the master key.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity.
protect_from_forgery :except => :index

def index
  # Ensure the request is validated
  if request.headers['X-Parse-Webhook-Key'] !== @webhook_key
    return render :json => { :error => "Request Unauthorized"}
  end

  # Check the function name
  if params[:functionName] == "chargeCustomer" && params[:master] == true
    # extract the custom parameters sent with the function
    custom_params = params[:params]
    user_id = custom_params["userObjectId"]

    # enqueue a resque job to bill the user
    Resque.enqueue(BillingJob, user_id)

    # return a json object of this billing info
    return render :json => { :success => "User billed!" }
  end

  return render :json => { :error => "Unknown function"}
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": true,
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "params": { "userObjectId": "6eaI2sTgH6" },
  "functionName": "chargeCustomer"
}
```

This response would indicate a success in the webhook:

```json
// Returned from the webhook on success
{ "success": "User billed!" }
```

Set your webhook from the Dashboard UI. After that, it's available from all SDKs and the REST API the same way you would a normal Cloud function

Webhooks are great when you want to use a specialized technology not available on Parse's Cloud Code. In this case we made use of an open source library and integrated with a separate data source where our billing info might be stored for legacy reasons.

### beforeSave Webhooks

Let's write a `beforeSave` trigger to truncate movie review comments that are more than 140 characters long using our own Rails server and a webhook.

For triggers, the following parameters are sent to your webhook.

*   **master**: True if the master key was used and false otherwise.
*   **user**: If set, this will contain the Parse User who made the request, in our REST API format.
*   **installationId**: If available, the installationId which made the request.
*   **object**: For triggers, this will contain the Parse Object, in our REST API format. For example: `{ "className": "TestObject", "foo": "bar" }`.
*   **triggerName**: "beforeSave"

To respond to a `beforeSave` request, send a JSON object with the key `error` or `success` set. This is the same as for Cloud functions, but there's an extra capability with `beforeSave` triggers. By returning an error, you will cancel the save request and the object will not be stored on Parse. You can also return a JSON object in this following format to override the values that will be saved for the object:

```json
{
  "className": "AwesomeClass",
  "existingColumn": "sneakyChange",
  "newColumn": "sneakyAddition"
}
```

Let's [recreate our trigger](#cloud-code-beforesave-triggers) to truncate movie review comments that are longer than 140 characters.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity.
protect_from_forgery :except => :reviews

def reviews
  if request.headers['X-Parse-Webhook-Key'] != @webhook_key
    return render :json => { :error => "Request Unauthorized"}
  end

  review = params[:object]
  if params[:triggerName] == "beforeSave" && review["className"] == "Review"
    # truncate the object and return the new data
    if review["comment"].length > 140
      review["comment"] = review["comment"].truncate(140)
      return render :json => { :success => review }
    end

    # if the comment is ok we just return a success
    return render :json => { :success => true }
  end

  return render :json => { :error => "Unknown trigger"}
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": false,
  "user": {
    "createdAt": "2015-03-24T20:19:00.542Z",
    "objectId": "lValKpphWN",
    "sessionToken": "orU3ClA7sqMIN8g4KtmLe7eDM",
    "updatedAt": "2015-03-24T20:19:00.542Z",
    "username": "Matt"
  },
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "triggerName": "beforeSave",
  "object": {
    "className": "Comment",
    "comment": "A very long comment that will be truncated to be just 140 characters. I sure love using Parse, it's just so easy to get started :)! Hopefully that part doesn't get truncated :/"
  }
}
```

This response would indicate a success in the webhook:

```
// Returned from the webhook on success
{
  "success": {
    "className": "Comment",
    "comment": "A very long comment that will be truncated to be just 140 characters. I sure love using Parse, it's just so easy to get started :)! Hopef..."
  }
}
```

### afterSave Webhooks

Like we've seen in Cloud Code, it's also possible to run some code after an object has been saved using a webhook. The parameters sent to your webhook are the same as for `beforeSave` triggers but we'll repeat them here for clarity.

*   **master**: True if the master key was used and false otherwise.
*   **user**: If set, this will contain the Parse User who made the request, in our REST API format.
*   **installationId**: If available, the installationId which made the request.
*   **object**: For triggers, this will contain the Parse Object, in our REST API format. For example: `{ "className": "TestObject", "foo": "bar" }`.
*   **triggerName**: "afterSave"

No response is required for `afterSave` triggers.

Let's take the same example we created in Cloud Code [in the last chapter](#cloud-code-aftersave-triggers); keeping track of the number of comments on a blog post. But instead of storing the number in our Parse database, we'll store the count in a separate data source accessible by our Rails app. This could be useful if you're storing data that will be used to run custom analysics instead of being served to your users through a client.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity.
protect_from_forgery :except => :comments

def comments
  if request.headers['X-Parse-Webhook-Key'] != @webhook_key
    return render :nothing => true
  end

  comment = params[:object]
  if params[:triggerName] == "afterSave" && comment["className"] == "Comment"
    post = comment["post"]
    @post_model = Post.where("id = #{post["objectId"]}")
    @post_model.increment(:comments_count, 1)
    @post_model.save!
    return render :nothing => true
  end

  render :nothing => true
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": false,
  "user": {
    "createdAt": "2015-03-24T20:19:00.542Z",
    "objectId": "lValKpphWN",
    "sessionToken": "orU3ClA7sqMIN8g4KtmLe7eDM",
    "updatedAt": "2015-03-24T20:19:00.542Z",
    "username": "Matt"
  },
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "triggerName": "afterSave",
  "object": {
    "objectId": "zPnDyvj0vd",
    "className": "Comment",
    "createdAt": "2015-03-25T00:00:57.055Z",
    "updatedAt": "2015-03-25T00:00:57.055Z",
    "post": {
      "__type": "Pointer",
      "className": "Post",
      "objectId": "jsUd72Sd2l"
    }
  }
}
```

### beforeDelete Webhooks

You also use webhooks for `beforeDelete` triggers. The parameters sent to your webhook are the same as for `beforeSave` and  `afterSave` triggers but we'll repeat them here for clarity.

*   **master**: True if the master key was used and false otherwise.
*   **user**: If set, this will contain the Parse User who made the request, in our REST API format.
*   **installationId**: If available, the installationId which made the request.
*   **object**: For triggers, this will contain the Parse Object, in our REST API format. For example: `{ "className": "TestObject", "foo": "bar" }`.
*   **triggerName**: "beforeDelete"

Just like for Cloud functions, to respond to a `beforeDelete` request, send a JSON object with the key `error` or `success` set. Returning an error will cancel the delete and the object will remain in your database.

As an example, let's use this trigger to prohibit a user from deleting or creating a new blog posts if they haven't paid their bill. We'll assume the billing information is currently stored in a SQL database only accessible from our Rails server. We'll use both the `beforeDelete` and the `beforeSave` triggers to disable all modifications to this class.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity.
protect_from_forgery :except => :posts

def posts
  if request.headers['X-Parse-Webhook-Key'] != @webhook_key
    return render :json => { :error => "Request Unauthorized"}
  end

  post = params[:object]
  if (params[:triggerName] == "beforeDelete" || params[:triggerName] == "beforeSave") && post["className"] == "Post"
    @user = User.find(post['user'])
    if !@user.paid_up
      return render :json => { :error => "You have outstanding charges on your account. Please update your credit card information before proceeding." }
    end

    return render :json => { :success => true }
  end
  return render :json => { :error => "Unknown trigger"}
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": false,
  "user": {
    "createdAt": "2015-03-24T20:19:00.542Z",
    "objectId": "lValKpphWN",
    "sessionToken": "orU3ClA7sqMIN8g4KtmLe7eDM",
    "updatedAt": "2015-03-24T20:19:00.542Z",
    "username": "Matt"
  },
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "triggerName": "beforeDelete",
  "object": {
    "objectId": "jsUd72Sd2l",
    "className": "Post",
    "createdAt": "2015-03-25T00:00:57.055Z",
    "updatedAt": "2015-03-25T00:00:57.055Z"
  }
}
```

This response would indicate a success in the webhook:

```json
// Returned from the webhook on success
{ "success": true }
```

As with previous examples, for this example to work you would also need to set up the webhooks in the Dashboard for your app.

### afterDelete Webhooks

The `afterDelete` trigger is also accessible via webhooks. The parameters sent to your webhook are the same as for other triggers but we'll repeat them here for clarity.

*   **master**: True if the master key was used and false otherwise.
*   **user**: If set, this will contain the Parse User who made the request, in our REST API format.
*   **installationId**: If available, the installationId which made the request.
*   **object**: For triggers, this will contain the Parse Object, in our REST API format. For example: `{ "className": "TestObject", "foo": "bar" }`.
*   **triggerName**: "afterDelete"

No response is required for `afterDelete` triggers.

In our [webhooks example for the afterSave](#cloud-code-aftersave-triggers) trigger, we updated a count in our external SQL database to track the number of comments on a post. In this example, let's decrement this count when a comment is deleted.

```ruby
# We need to disable CSRF protection for webhooks to work. Instead we
# use the webhook key to prove authenticity.
protect_from_forgery :except => :comments

def comments
  if request.headers['X-Parse-Webhook-Key'] != @webhook_key
    return render :nothing => true
  end

  comment = params[:object]
  if params[:triggerName] == "afterDelete" && comment["className"] == "Comment"
    @post_model = Post.where("id = #{comment['post']}")
    @post_model.decrement(:comments_count, 1)
    @post_model.save!
    return render :nothing => true
  end

  render :nothing => true
end
```

Here's an example of the JSON data that would be sent in the request to this webhook:

```json
// Sent to webhook
{
  "master": false,
  "user": {
    "createdAt": "2015-03-24T20:19:00.542Z",
    "objectId": "lValKpphWN",
    "sessionToken": "orU3ClA7sqMIN8g4KtmLe7eDM",
    "updatedAt": "2015-03-24T20:19:00.542Z",
    "username": "Matt"
  },
  "installationId": "b3ab24c6-2282-69fa-eeea-c1b36ea497c2",
  "triggerName": "afterDelete",
  "object": {
    "objectId": "zPnDyvj0vd",
    "className": "Comment",
    "createdAt": "2015-03-25T00:00:57.055Z",
    "updatedAt": "2015-03-25T00:00:57.055Z",
    "post": {
      "__type": "Pointer",
      "className": "Post",
      "objectId": "jsUd72Sd2l"
    }
  }
}
```

After setting up your webhook in the Dashboard UI, you'll be acurately decrementing comment counts!

### Resource Limits

1.  All webhooks are limited to 30 seconds. Parse will time out the request after this time limit.
2.  All webhooks have to handle the request as a POST request.
3.  Cloud Code Webhooks require an HTTPS connection. Your server must have a valid SSL certificate. Self-signed certificates will not be accepted, for your security.
4.  In cases where you define a webhook for a function or a trigger that you've also implemented in Cloud Code, Parse will only call your defined webhook. Priority will always be given to your webhook over Cloud Code.
5.  In order to secure these requests and prevent others from executing this code on your server, we'll send a secret key known only to you and Parse in the `X-Parse-Webhook-Key` header. You should always check this value against your WebhookKey to authenticate that the webhook request is coming from Parse. You can find your Webhook key in the Keys section of your app dashboard.

## Background Jobs

Parse allows you to set up jobs that run in the background. Background Jobs are useful for long running tasks such as integrating with external sites where the response time could be slow, or sending out batched push notifications. If you commonly encounter timeout errors running Cloud functions then you should consider using a Background Job.

There are a few constraints that you need to keep in mind when using Background Jobs:

*   Jobs will be terminated after 15 minutes of run time.
*   Apps may have one job running concurrently per 20 req/s in their request limit.
*   Jobs that are initiated after the maximum concurrent limit has been reached will be terminated immediately.

### Writing a Background Job

Writing a Background Job is similar to writing a Cloud function. Say you want to run a user migration job after adding a `plan` field to the `Parse.User` object. Your code would look like this:

```js
Parse.Cloud.job("userMigration", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all users
  var query = new Parse.Query(Parse.User);
  query.each(function(user) {
      // Update to plan value passed in
      user.set("plan", request.params.plan);
      if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
      }
      counter += 1;
      return user.save();
  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});
```

As with other Cloud Functions, you should handle success and error conditions. For Background Jobs, you do this by calling either `status.success()` or `status.error()` when your function completes. Your job execution status will then be set to completed. If you don't call either of these methods, your job will time out in 15 minutes. You can optionally set a progress message while the job is executing by calling `status.message()`. If you call `status.message()` after `status.success()`, your progress message will be ignored.

Once you've deployed your code, you can test the job by running the following command, with your master key. Note that Background Jobs cannot be triggered from the client SDK. It is only available through the REST API.

```bash
curl -X POST \
  -H "X-Parse-Application-Id: $PARSE_APPLICATION_ID" \
  -H "X-Parse-Master-Key: $PARSE_MASTER_KEY" \
  -H "Content-Type: application/json;charset=utf-8" \
  -d '{"plan":"paid"}' \
  https://api.parse.com/1/jobs/userMigration
```

### Setting up a Schedule

Once you've deployed your Background Job code, it can be scheduled in the Dashboard under the Cloud Code tab. The Scheduled Jobs pane lists all currently scheduled jobs and allows you to schedule a new one. To add an entry to the job schedule, select a currently deployed job then specify a description, any required parameters, the start time, and the frequency. Once a job has been scheduled you can run it on demand by clicking Run Now. You may also delete an entry in the job schedule. The Job Status pane lists the results of your job executions. You can see when a job started, its most recent status message, and whether it has completed.

# Networking

## httpRequest

You can use your favorite npm module to make HTTP requests, such as [request](https://www.npmjs.com/package/request). Parse Server also supports `Parse.Cloud.httpRequest` for legacy reasons. It allows you to send HTTP requests to any HTTP Server. This function takes an options object to configure the call.

A simple GET request would look like:

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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
* **`cookies`** - The cookies sent by the server. They are [Parse.Cloud.Cookie]({{ site.apis.js }}/classes/Parse.Cloud.HTTPResponse.html) objects.

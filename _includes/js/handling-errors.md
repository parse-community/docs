# Error Handling

Most Parse JavaScript functions report their success or failure using an object with callbacks, similar to a Backbone "options" object.  The two primary callbacks used are `success` and `error`.  `success` is called whenever an operation completes without errors.  Generally, its parameter will be either the `Parse.Object` in the case of `save` or `get`, or an array of `Parse.Object` for `find`.

`error` is called for any kind of error that occurs when interacting with the Parse Cloud over the network. These errors are either related to problems connecting to the cloud or problems performing the requested operation. Let's take a look at another example.  In the code below, we try to fetch an object with a non-existent `objectId`. The Parse Cloud will return an error - so here's how to handle it properly in your callback:

```javascript
const query = new Parse.Query(Note);
query.get("aBcDeFgH").then((results) => {
  // This function will *not* be called.
  alert("Everything went fine!");
}, (error) => {
  // This will be called.
  // error is an instance of Parse.Error with details about the error.
  if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
    alert("Uh oh, we couldn't find the object!");
  }
});

// You can also use `.catch`

query.get("aBcDeFgH").then((results) => {
  // This function will *not* be called.
  alert("Everything went fine!");
}).catch((error) => {
  // This will be called.
  // error is an instance of Parse.Error with details about the error.
  if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
    alert("Uh oh, we couldn't find the object!");
  }
});
```

The query might also fail because the device couldn't connect to the Parse Cloud. Here's the same callback but with a bit of extra code to handle that scenario:

```javascript
const query = new Parse.Query(Note);
query.get("thisObjectIdDoesntExist")
.then((results) => {
  // This function will *not* be called.
  alert("Everything went fine!");
}, (error) => {
  // This will be called.
  // error is an instance of Parse.Error with details about the error.
  if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
    alert("Uh oh, we couldn't find the object!");
  } else if (error.code === Parse.Error.CONNECTION_FAILED) {
    alert("Uh oh, we couldn't even connect to the Parse Cloud!");
  }
});
```

For methods like `save` and `signUp` that affect a particular `Parse.Object`, the first argument to the error function will be the object itself, and the second will be the `Parse.Error` object.  This is for compatibility with Backbone-type frameworks.

For a list of all possible `Parse.Error` codes, scroll down to [Error Codes](#error-codes), or see the `Parse.Error` section of the  [JavaScript API `Parse.Error`]({{ site.apis.js }}/classes/Parse.Error.html).

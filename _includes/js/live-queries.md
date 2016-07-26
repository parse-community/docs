# Live Queries

## Standard API
As we discussed in our [LiveQuery protocol](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification), we maintain a WebSocket connection to communicate with the Parse LiveQuery server. When used server side we use the [`ws`](https://www.npmjs.com/package/ws) package and in the browser we use [`window.WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). We think in most cases it isn't necessary to deal with the WebSocket connection directly. Thus, we developed a simple API to let you focus on your own business logic.

Note: Live Queries is supported only in [Parse Server](https://github.com/ParsePlatform/parse-server) with [JS SDK ~1.8](https://github.com/ParsePlatform/Parse-SDK-JS).

## Create a subscription
<pre><code class="java">script
let query = new Parse.Query('Game');
let subscription = query.subscribe();
</code></pre>
The subscription you get is actually an event emitter. For more information on event emitter, check [here](https://nodejs.org/api/events.html). You'll get the LiveQuery events through this `subscription`. The first time you call subscribe, we'll try to open the WebSocket connection to the LiveQuery server for you.

## Event Handling
We define several types of events you'll get through a subscription object:
### Open event
<pre><code class="java">script
subscription.on('open', () => {
 console.log('subscription opened');
});
</code></pre>
When you call `query.subscribe()`, we send a subscribe request to the LiveQuery server. When we get the confirmation from the LiveQuery server, this event will be emitted.

When the client loses WebSocket connection to the LiveQuery server, we'll try to auto reconnect the LiveQuery server. If we reconnect the LiveQuery server and successfully resubscribe the `ParseQuery`, you'll also get this event.

<br/>

### Create event
<pre><code class="java">script
subscription.on('create', (object) => {
  console.log('object created');
});
</code></pre>
When a new `ParseObject` is created and it fulfills the `ParseQuery` you subscribe, you'll get this event. The `object` is the `ParseObject` which was created.

<br/>

### Update event
<pre><code class="java">script
subscription.on('update', (object) => {
  console.log('object updated');
});
</code></pre>
When an existing `ParseObject` which fulfills the `ParseQuery` you subscribe is updated (The `ParseObject` fulfills the `ParseQuery` before and after changes), you'll get this event. The `object` is the `ParseObject` which was updated. Its content is the latest value of the `ParseObject`.

<br/>

### Enter event
<pre><code class="java">script
subscription.on('enter', (object) => {
  console.log('object entered');
});
</code></pre>
When an existing `ParseObject`'s old value does not fulfill the `ParseQuery` but its new value fulfills the `ParseQuery`, you'll get this event. The `object` is the `ParseObject` which enters the `ParseQuery`. Its content is the latest value of the `ParseObject`.

<br/>

### Leave event
<pre><code class="java">script
subscription.on('leave', (object) => {
  console.log('object left');
});
</code></pre>
When an existing `ParseObject`'s old value fulfills the `ParseQuery` but its new value doesn't fulfill the `ParseQuery`, you'll get this event. The `object` is the `ParseObject` which leaves the `ParseQuery`. Its content is the latest value of the `ParseObject`.

<br/>

### Delete event
<pre><code class="java">script
subscription.on('delete', (object) => {
  console.log('object deleted');
});
</code></pre>
When an existing `ParseObject` which fulfills the `ParseQuery` is deleted, you'll get this event. The `object` is the `ParseObject` which is deleted.

<br/>

### Close event
<pre><code class="java">script
subscription.on('close', () => {
  console.log('subscription closed');
});
</code></pre>
When the client loses the WebSocket connection to the LiveQuery server and we can't get anymore events, you'll get this event.

<br/>

## Unsubscribe
<pre><code class="java">script
subscription.unsubscribe();
</code></pre>
If you would like to stop receiving events from a `ParseQuery`, you can just unsubscribe the `subscription`. After that, you won't get any events from the `subscription` object.


## Close
<pre><code class="java">script
Parse.LiveQuery.close();
</code></pre>
When you are done using LiveQuery, you can call `Parse.LiveQuery.close()`. This function will close the WebSocket connection to the LiveQuery server, cancel the auto reconnect, and unsubscribe all subscriptions based on it. If you call `query.subscribe()` after this, we will create a new WebSocket connection to the LiveQuery server.


## Setup server URL
<pre><code class="java">script
Parse.liveQueryServerURL = 'ws://XXXX'
</code></pre>
Most of the time you do not need to manually set this. If you have setup your `Parse.serverURL`, we will try to extract the hostname and use `ws://hostname` as the default `liveQueryServerURL`. However, if you want to define your own `liveQueryServerURL` or use a different protocol such as `wss`, you should set it by yourself.

## WebSocket Status
We expose three events to help you monitor the status of the WebSocket connection:
### Open event
<pre><code class="java">script
Parse.LiveQuery.on('open', () => {
  console.log('socket connection established');
});
</code></pre>
When we establish the WebSocket connection to the LiveQuery server, you'll get this event.

<br/>

### Close event
<pre><code class="java">script
Parse.LiveQuery.on('close', () => {
  console.log('socket connection closed');
});
</code></pre>
When we lose the WebSocket connection to the LiveQuery server, you'll get this event.

<br/>

### Error event
<pre><code class="java">script
Parse.LiveQuery.on('error', (error) => {
  console.log(error);
});
</code></pre>
When some network error or LiveQuery server error happens, you'll get this event.

<br/>

***
## Advanced API
In our standard API, we manage a global WebSocket connection for you, which is suitable for most cases. However, for some cases, like when you have multiple LiveQuery servers and want to connect to all of them, a single WebSocket connection isn't enough. We've exposed the `LiveQueryClient` for these scenarios.

## LiveQueryClient
A `LiveQueryClient` is a wrapper of a standard WebSocket client. We add several useful methods to help you connect/disconnect to LiveQueryServer and subscribe/unsubscribe a `ParseQuery` easily.
### Initialize
<pre><code class="java">script
let Parse = require('parse/node');
let LiveQueryClient = Parse.LiveQueryClient;
let client = new LiveQueryClient({
  applicationId: '',
  serverURL: '',
  javascriptKey: '',
  masterKey: ''
});

</code></pre> 
* `applicationId` is mandatory, it's the `applicationId` of your Parse app
* `liveQueryServerURL` is mandatory, it's the URL of your LiveQuery server
* `javascriptKey` and `masterKey` are optional, they are used for verifying the `LiveQueryClient` when it tries to connect to the LiveQuery server. If you set them, they should match your Parse app. You can check LiveQuery protocol [here](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification) for more details.

### Open
<pre><code class="java">script
client.open();
</code></pre>
After you call this, the `LiveQueryClient` will try to send a connect request to the LiveQuery server.

<br/>

### Subscribe
<pre><code class="java">script
let query = new Parse.Query('Game');
let subscription = client.subscribe(query, sessionToken); 
</code></pre>
* `query` is mandatory, it is the `ParseQuery` you want to subscribe
* `sessionToken` is optional, if you provide the `sessionToken`, when the LiveQuery server gets `ParseObject`'s updates from parse server, it'll try to check whether the `sessionToken` fulfills the `ParseObject`'s ACL. The LiveQuery server will only send updates to clients whose sessionToken is fit for the `ParseObject`'s ACL. You can check the LiveQuery protocol [here](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification) for more details.
The `subscription` you get is the same `subscription` you get from our Standard API. You can check our Standard API about how to use the `subscription` to get events.

### Unsubscribe
<pre><code class="java">script
client.unsubscribe(subscription); 
</code></pre>
* `subscription` is mandatory, it's the subscription you want to unsubscribe from.
After you call this, you won't get any events from the subscription object.

<br/>

### Close
<pre><code class="java">script
client.close();
</code></pre>
This function will close the WebSocket connection to this `LiveQueryClient`, cancel the auto reconnect, and unsubscribe all subscriptions based on it.

<br/>

## Event Handling
We expose three events to help you monitor the status of the `LiveQueryClient`.
### Open event
<pre><code class="java">script
client.on('open', () => {
  console.log('connection opened');
});
</code></pre>
When we establish the WebSocket connection to the LiveQuery server, you'll get this event.

<br/>

### Close event
<pre><code class="java">script
client.on('close', () => {
  console.log('connection closed');
});
</code></pre>
When we lose the WebSocket connection to the LiveQuery server, you'll get this event.

<br/>

### Error event
<pre><code class="java">script
client.on('error', (error) => {
  console.log('connection error');
});
</code></pre>
When some network error or LiveQuery server error happens, you'll get this event.

<br/>

***
## Reconnect
Since the whole LiveQuery feature relies on the WebSocket connection to the LiveQuery server, we always try to maintain an open WebSocket connection. Thus, when we find we lose the connection to the LiveQuery server, we will try to auto reconnect. We do exponential back off under the hood. However, if the WebSocket connection is closed due to `Parse.LiveQuery.close()` or `client.close()`, we'll cancel the auto reconnect.


***
## SessionToken
We send `sessionToken` to the LiveQuery server when you subscribe to a `ParseQuery`. For the standard API, we use the `sessionToken` of the current user by default. For the advanced API, you can use any `sessionToken` when you subscribe a `ParseQuery`. An important thing to be aware of is when you log out or the `sessionToken` you are using is invalid, you should unsubscribe the subscription and subscribe to the `ParseQuery` again. Otherwise you may face a security issue since you'll get events which shouldn't be sent to you.

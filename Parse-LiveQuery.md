# Overview
`ParseQuery` is one of the key concepts for Parse. It allows you to retrieve `ParseObject` with some conditions. By using `ParseQuery`, it is easy to build apps such as a dashboard, a todo list or even some strategy games. However, `ParseQuery` is based on a pull model. You have to query from the server to get the changes of the related `ParseObject`. This model does not suitable for apps which need real-time support. For example, suppose you are building an app which is similar to google doc. It allows multiple users to edit the same file at the same time. In this situation, `ParseQuery` is not an ideal tool since you can not know when to query from the server to get the updates. To solve this problem, we introduce Parse LiveQuery. This tool allows you to subscribe a `ParseQuery` you are interested in. After that, if some changes of a `ParseObject` make it fulfills this `ParseQuery`, the server will push the `ParseObject` to you in real-time.

# Usage
Parse LiveQuery contains two parts, the LiveQuery server and the LiveQuery clients. In order to use it, you need to setup both of them.
## Server Setup
The LiveQuery server should work with a parse server. The easiest way to setup the LiveQuery server is to make it run with the parse server in the same process. When you initialize the parse server, you need to define which `ParseObject` classes you want to enable LiveQuery like this
```javascript
let api = new ParseServer({
  ...,
  liveQuery: {
    classNames: ['Test', 'TestAgain']
  }
});
```
After that, you need to initialize a LiveQuery server like this
```javascript
// Initialize a LiveQuery server instance, app is the express app of your parse server
let httpServer = require('http').createServer(app);
httpServer.listen(port);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
```
The `ws` protocol URL of the LiveQuery server is the hostname and port of the `httpServer` which it is listening to. For example, if the `httpSever` is listening to `localhost:8080`, the `ws` protocol of the LiveQuery server is `ws://localhost:8080/`. We will add custome path of `ws` protocol later, currently it is fixed and you can not set path.

## Client Setup
We provide javascript and iOS LiveQuery Clients for now. Let's us javascript client as an example. In order to use LiveQuery, you need to initialize a `ParseQuery` object and subscribe to it.
```javascript
let query = new Parse.Query('People');
query.equalTo('name', 'Mengyan');
let subscription = query.subscribe();
```
After you get the `subscription`, you can use it to receive the updates of the related `ParseObject`. For example, if someone creates a `People` object whose `name` field is `Mengyan`, then you can get the `People` object like this:
```javascript
subscription.on('create', (people) => {
  console.log(people.get('name')); // This should output Mengyan
});
```
After that, if someone updates this `People` object like changing its score to 100, then you can get the `People` object like this:
```javascript
subscription.on('update', (people) => {
  console.log(people.get('score')); // This should output 100
});
```
If you are done with the LiveQuery, you can simply unsubscribe the `subscription` to finish receiving events
```javascript
subscription.unsubscribe();
```
We support `create`, `enter`, `update`, `leave`, `delete` five types of event. You can check the LiveQuery protocol [here](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification) for their meanings and choose which one to use.

For more details about the javascript LiveQuery Client SDK, check out the code in our open source repo [here](https://github.com/ParsePlatform/Parse-SDK-JS) and doc [here]().

For the iOS LiveQuery Client SDK, check out the code and doc in our open source repo [here]().

# LiveQuery Protocol
The LiveQuery Protocol is the key to the Parse LiveQuery. The clients and server communicate through WebSocket using this protocol. Clients can follow the protocol to connect to the LiveQuery server, subscribe/unsubscribe a `ParseQuery` and get updates from the LiveQuery server.

The LiveQuery protocol is a simple protocol that encapsulates messages in JSON strings and runs over a WebSocket connection. For the specification, check our wiki page [here](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification).

# LiveQuery Server
## Configuration
The full configuration of the LiveQuery server is
```javascript
{
  keyPairs: {
    "restAPIKey": "",
    "javascriptKey": "",
    "clientKey": "",
    "windowsKey": "",
    "masterKey": ""
  },
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'serverURL',
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000,
  logLevel: 'VERBOSE'
}
```
* The `keyPairs` field is a JSON object. It is optional. It is used for validating clients when they try to connect to the LiveQuery server. Check the following Security section and our protocol specification for details.
* The `appId` field is a string. It is mandatory. It is the same `appId` when you configure your parse server. If you deploy the LiveQuery server with the parse-server, the LiveQuery server will try to use the `appId` of when you config the parse-server.
* The `masterKey` field is a string. It is mandatory. It is the same `masterKey` when you configure your parse server. If you deploy the LiveQuery server with the parse-server, the LiveQuery server will try to use the `masterKey` of when you config the parse-server.
* The `serverURL` field is a string. It is mandatory. It is the same `serverURL` when you configure your parse server. If you deploy the LiveQuery server with the parse-server, the LiveQuery server will try to use the `serverURL` of when you config the parse-server.
* The `websocketTimeout` field is a number. Its unit is millisecond. It is optional. The WebSocket server sends ping/pong frame to the clients to keep the WebSocket alive. This value defines the interval of the ping/pong frame from the server to clients. The default value is 10 * 1000 ms.
* The `cacheTimeout` field is a number. Its unit is millisecond. It is optional. When clients provide the `sessionToken` to the LiveQuery server, the LiveQuery server will try to fetch its `ParseUser`'s objectId from parse server and store it in the cache. The value defines the duration of the cache. Check the following Security section and our protocol specification for details. The default value is 30 * 24 * 60 * 60 * 1000 ms.
* The `logLevel` field is a string. It is optional. This field defines the log level of the LiveQuery server. We support `VERBOSE`, `INFO`, `ERROR`, `NONE`. The default level is `INFO`.

## Basic Architecture
[[images/lq_local.png]]

The LiveQuery server is a separate server from parse server. As shown in the picture, it mainly contains four components at the runtime. 
* **The Publisher**. It is responsible for publishing the update of a `ParseObject`. When a `ParseObject` changes, it will publish a message to the subscribers. The message contains the original `ParseObject` and the new `ParseObject`. The Publisher is inside the parse server at the runtime.
* **The Subscriber**. It is responsible for receiving the messages which are sent from the Publisher. After it gets the messages, it can pass them to the LiveQuery component for processing.
* **The WebSocketServer**. It is responsible for maintaining the WebSocket connections with clients. It can pass the subscribe/unsubscribe messages from clients to the LiveQuery component. When the LiveQuery component finds a `ParseObject` fulfills a `ParseQuery`, it will get the event message from LiveQuery component and send it to the clients.
* **The LiveQuery**. It is the key component of the LiveQuery Server. It maintains the subscription status of clients. After it gets the `ParseObject` updates from the Subscriber, it can do the query matching and generate the event messages for clients.

## Scalability
Based on your usages, different components of the LiveQuery server may become the bottleneck. If you app has high throughput, the Publisher/Subscriber may have problems. If you subscribe lots of complex `ParseQuery`, the LiveQuery component may cause issues. If you need to maintain lots of clients, the WebSocketServer may be the bottleneck. Thus, we highly recommend you to do the load testing for your app if you want to use LiveQuery server in production.

In general, our suggestion to make the LiveQuery server scalable is to separate the parse server with the LiveQuery server and add more LiveQuery server instances based on your need. To help you do this, we use Redis to implement a Publisher and Subscriber. If you want to use that, the only thing you need to do is to provide the Redis server address when you initialize the parse server and LiveQuery server like this:
```javascript
let api = new ParseServer({
  ...,
  liveQuery: {
    classNames: ['Test', 'TestAgain'],
    redisURL: 'redis://localhost:6379'
  }
});
....
let httpServer = require('http').createServer(app);
httpServer.listen(port);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer,  {
  ...,
  redisURL: 'redis://localhost:6379'
});
```
The architecture of the whole LiveQuery system after you use redis should be like this:
[[images/lq_multiple.png]] 

For example, if you use Heroku to deploy your Live Query server, after you setup the Redis with the LiveQuery server, you can simply add more dynos to make your app more scalable like this:
[[images/lq_heroku.png]]

## Security
The LiveQuery server provides two ways to secure your app. The first one is key matching. If you provide key pairs when you initialize the LiveQuery server, when clients try to connect to LiveQuery server, they have to provide the necessary key pairs. Otherwise, the connection will be refused. The second one is ACL. For what is ACL, you can check the definition [here](http://blog.parse.com/learn/engineering/parse-security-iii-are-you-on-the-list/). When clients try to connect and subscribe to the LiveQuery server, they can provide their `sessionToekn`. If you give your `ParseObject` proper ACL, when the LiveQuery server get the updates of the `ParseObject`, it will try to match `ParseObject`'s ACL with the `sessionToken` of clients or their subscriptions. The event will be only sent to clients whose `sessionToekn` matches the `ParseObject`'s ACL.

# LiveQuery Client
We provide javascript and iOS client SDK for now. Android SDK will come soon.

For the javascript LiveQuery Client SDK, check our open source repo [here](https://github.com/ParsePlatform/Parse-SDK-JS).

For the iOS LiveQuery Client SDK, check our open source repo [here]().
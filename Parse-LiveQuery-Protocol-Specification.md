## Overview
Parse LiveQuery server has its own protocol. It is built on top of standard WebSocket connections. A client should follow this protocol to interact with the LiveQuery server. This protocol defines the messages to connect to the LiveQuery server, subscribe/unsubscribe a `ParseQuery` and get updates from the LiveQuery server. The clients and the server communicate with each other in messages. Each message is a compacted JSON object. 

## Connect message
The connect message is sent from a client to the LiveQuery server. It should be the first message sent from a client after the WebSocket connection is established. The connect message's format is:
```javascript
{
  "op": "connect",
  "restAPIKey": "",  // Optional 
  "javascriptKey": "", // Optional
  "clientKey": "", //Optional
  "windowsKey": "", //Optional
  "masterKey": "", // Optional
  "sessionToken": "" // Optional
}
```
* The `op` field must be `connect`.
* The key field is optional. When you initialize the LiveQuery server with key pairs, the LiveQuery server will try to match the key field in the connect message with the given key pairs. If no key pair is provided when the LiveQuery server is initialized, the key field will be ignored.
* The `sessionToken` field is optional. If you provide the `sessionToken`, when the LiveQuery get `ParseObject`'s updates from parse server, it will try to check whether the `sessionToken` fulfills the `ParseObject`'s ACL. The LiveQuery server will only send updates to clients whose `sessionToken` is fit for the `ParseObject`'s ACL.

If a client connects to the LiveQuery server successfully, it will receive a response like
```javascript
{
  "op": "connected"
}
```

## Subscribe message
After a client connects to the LiveQuery server, it can send a subscribe message to subscribe a `ParseQuery`. The message's format is: 
```javascript
{
  "op": "subscribe",
  "requestId": 1,
  "query": {
      "className": "Player",
      "where": {"name": "test"},
      "fields": ["name"] // Optional
  },
  "sessionToken": "" // Optional
}
```
* The `op` field must be `subscribe`.
* The `requestId` field is mandatory. It is a number which is unique for each LiveQuery subscription. The LiveQuery server will use this to distinguish between the different subscriptions from the same client.
* The `query.className` field is mandatory. It represents the className of the `ParseQuery` the client subscribes to.
* The `query.where` field is mandatory. It represents the condition of the `ParseQuery` the client subscribes to. The format of the where field is the same with `ParseQuery`'s REST API format. You can check the detail [here](https://parse.com/docs/rest/guide#queries-query-constraints). Right now we support `$lt`, `$lte`, `$gt`, `$gte`, `$ne`, `$in`, `$nin`, `$exists`, `$all`, `$regex`, `$nearSphere`, `$within` and normal equal condition. Any unsupported conditions will be ignored.
* The `query.fields` field is optional. It is an array of field names of a `ParseObject`. Suppose the `ParseObject` `Player` contains three fields `name`, `id` and `age`. If you are only interested in the change of the `name` field, you can set `query.fields` to `[name]`. In this situation, when the change of a `Player` `ParseObject` fulfills the subscription, only the `name` field will be sent to the clients instead of the full `Player` `ParseObject`. 
* The `sessionToken` field is optional. It is similar to the `sessionToken` field in the connect message. The `sessionToken` field in subscribe message has higher priority than the `sessionToken` field in connect message. This means the LiveQuery server will try to use the `sessionToken` in subscribe message to check a `ParseObject`'s ACL first.

If a client subscribes a `ParseQuery` to the LiveQuery server successfully, it will receive a response like:
```javascript
{
  "op": "subscribed",
  "requestId":1
}
```
Once a client get this response from the LiveQuery server, it will start to receive `ParseObject`s whose changes fulfill the `ParseQuery`.

## Event message
After a client subscribes to a `ParseQuery`, the LiveQuery server will send event messages to the client. We support 5 types of events. Suppose you subscribe to a `ParseQuery` like:
```javascript
{
  "op": "subscribe",
  "requestId": 1,
  "query": {
      "className": "Player",
      "where": {"name": "test"}
  }
}
```

### Create event
This event means a `ParseObject` is created and it fulfills the `ParseQuery` the client subscribes.
When a new `Player` `ParseObject` whose name is "test" is created, the LiveQuery server will send a `create` event message to the client. The `create` event message's format is:  
```javascript
{
  "op": "create",
  "requestId": 1,
  "object": {
    "className": "Player",
    "objectId": "",
    "createdAt": "",
    "updatedAt": "",
    ...
  }
}
```
* The `op` field is `create`.
* The `requestId` field is a numebr. It is same as the `requestId` when the client subscribes the `ParseQuery` to the LiveQuery server.
* The `object` is the `ParseObject` in JSON format. 

### Enter event
This event means a `ParseObject`'s old value does not fulfill the `ParseQuery` but its new value fulfills the `ParseQuery`. When an existing `Player` `ParseObject`'s name is changed from unknown to test, the LiveQuery server will send an `enter` event message to the client. The `enter` event message's format is:  
```javascript
{
  "op": "enter",
  "requestId": 1,
  "object": {
    "className": "Player",
    "objectId": "",
    "createdAt": "",
    "updatedAt": "",
    ...
  }
}
```

### Update event
This event means a `ParseObject`'s old value and its new value fulfill the `ParseQuery` at the same time. For an existing `Player` `ParseObject`' whose name is "test",  when its age changes from 20 to 21, the LiveQuery server will send an `update` event message to the client. The `update` event message's format is:  
```javascript
{
  "op": "update",
  "requestId": 1,
  "object": {
    "className": "Player",
    "objectId": "",
    "createdAt": "",
    "updatedAt": "",
    ...
  }
}
```

### Leave event
This event means a `ParseObject`'s old value fulfills the `ParseQuery` but its new value does not. When an existing `Player` `ParseObject`'s name is changed from test to unknown, the LiveQuery server will send a `leave` event message to the client. The `leave` event message's format is:  
```javascript
{
  "op": "leave",
  "requestId": 1,
  "object": {
    "className": "Player",
    "objectId": "",
    "createdAt": "",
    "updatedAt": "",
    ...
  }
}
```

### Delete event
This event means a `ParseObject`'s whose value fulfills the `ParseQuery` is deleted. When an existing `Player` `ParseObject`'s whose name is "test" is deleted, the LiveQuery server will send an `delete` event message to the client. The `delete` event message's format is:  
```javascript
{
  "op": "delete",
  "requestId": 1,
  "object": {
    "className": "Player",
    "objectId": "",
    "createdAt": "",
    "updatedAt": "",
    ...
  }
}
```

## Unsubscribe message
The unsubscribe message is sent from clients to the LiveQuery server. It should be sent after a client successfully unsubscribes some `ParseQuery`. The format of the unsubscribe message is:
```javascript
{
  "op": "unsubscribe",
  "requestId":1
}
```
* The `op` field is `unsubscribe`.
* The `requestId` field is mandatory. It is a number which is unique for each LiveQuery subscription. It is the same `requestId` when the client subscribes the `ParseQuery` to the LiveQuery server.

If a client unsubscribes a `ParseQuery` to the LiveQuery server successfully, it will receive a response like:
```javascript
{
  "op": "unsubscribed",
  "requestId":1
}
```

## Error message
When a client sends unknown or error messages to the LiveQuery server, the server will respond with an error message to the client. The format of the error message is:
```javascript
{
  "op": "error",
  "code": 1,
  "error": "",
  "reconnect": true
}
```
* The `op` field is `error`.
* The `code` field is a number which represents the type of the error.
* The `error` field is the error message.
* The `reconnect` field is a boolean which indicates whether a client can reconnect to the LiveQuery server after this error. Most of the cases it is `true`. But if the LiveQuery server has some internal errors, it can be `false`. If it is `false`, a client should not try to reconnect to the LiveQuery server.
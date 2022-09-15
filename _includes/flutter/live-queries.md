# Live Queries

## Standard API
As we discussed in our [LiveQuery protocol](https://github.com/parse-community/parse-server/wiki/Parse-LiveQuery-Protocol-Specification), we maintain a WebSocket connection to communicate with the Parse LiveQuery server. When used server side we use the [`ws`](https://www.npmjs.com/package/ws) package and in the browser we use [`window.WebSocket`](https://developer.mozilla.org/en-US{{ site.baseUrl }}/Web/API/WebSockets_API). We think in most cases it isn't necessary to deal with the WebSocket connection directly. Thus, we developed a simple API to let you focus on your own business logic.

## Create a subscription

```dart
final query = QueryBuilder(ParseObject('Game'));
final LiveQuery liveQuery = LiveQuery();
Subscription subscription = await liveQuery.client.subscribe(query);
```

The subscription you get is actually an event emitter. For more information on event emitter, check [here](https://nodejs.org/api/events.html). You'll get the LiveQuery events through this `subscription`. The first time you call subscribe, we'll try to open the WebSocket connection to the LiveQuery server for you.

## Event Handling
We define several types of events you'll get through a subscription object:

### Open event

Event not available on Flutter SDK.

### Create event

```dart
subscription.on(LiveQueryEvent.create, (value) {
    print('object created');
});
```

When a new `ParseObject` is created and it fulfills the `QueryBuilder` you subscribe, you'll get this event. The `object` is the `ParseObject` which was created.

### Update event

```dart
subscription.on(LiveQueryEvent.update, (value) {
    print('object updated');
});
```

When an existing `ParseObject` which fulfills the `QueryBuilder` you subscribe is updated (The `ParseObject` fulfills the `QueryBuilder` before and after changes), you'll get this event. The `object` is the `ParseObject` which was updated. Its content is the latest value of the `ParseObject`.

### Enter event

```dart
subscription.on(LiveQueryEvent.enter, (value) {
    print('object entered');
});
```

When an existing `ParseObject`'s old value does not fulfill the `QueryBuilder` but its new value fulfills the `QueryBuilder`, you'll get this event. The `object` is the `ParseObject` which enters the `QueryBuilder`. Its content is the latest value of the `ParseObject`.

### Leave event

```dart
subscription.on(LiveQueryEvent.leave, (value) {
    print('object left');
});
```

When an existing `ParseObject`'s old value fulfills the `QueryBuilder` but its new value doesn't fulfill the `QueryBuilder`, you'll get this event. The `object` is the `ParseObject` which leaves the `QueryBuilder`. Its content is the latest value of the `ParseObject`.

### Delete event

```dart
subscription.on(LiveQueryEvent.delete, (value) {
    print('object deleted');
});
```

When an existing `ParseObject` which fulfills the `QueryBuilder` is deleted, you'll get this event. The `object` is the `ParseObject` which is deleted.

### Close event

Function not available on Flutter SDK.

## Unsubscribe

```dart
liveQuery.client.unSubscribe(subscription);
```

If you would like to stop receiving events from a `QueryBuilder`, you can just unsubscribe the `subscription`. After that, you won't get any events from the `subscription` object.


## Close

Function not available on Flutter SDK.


## Setup server URL

```
Parse().initialize(
      keyApplicationId,
      keyParseServerUrl,
      clientKey: keyParseClientKey,
      debug: true,
      liveQueryUrl: keyLiveQueryUrl,
      autoSendSessionId: true);
```


### Error event

```dart
subscription.on(LiveQueryEvent.delete, (value) {
    print('object deleted');
});
```

When some network error or LiveQuery server error happens, you'll get this event.

***

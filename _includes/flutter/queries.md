# Queries

Once you have setup the project and initialised the instance, you can then retreive data from your server by calling:
```dart
var apiResponse = await ParseObject('ParseTableName').getAll();

if (apiResponse.success){
  for (var testObject in apiResponse.result) {
    print(ApplicationConstants.APP_NAME + ": " + testObject.toString());
  }
}
```
Or you can get an object by its objectId:

```dart
var dietPlan = await DietPlan().getObject('R5EonpUDWy');

if (dietPlan.success) {
  print(ApplicationConstants.keyAppName + ": " + (dietPlan.result as DietPlan).toString());
} else {
  print(ApplicationConstants.keyAppName + ": " + dietPlan.exception.message);
}
```

### Alternative Query Methods

The standard query method `query()` returns a `ParseResponse` that contains the result or the error. As an alternative, you can also use `Future<List<T>> find()` for receiving options.
This method returns an `Future` that either resolves in an error (equivalent of the error in the `ParseResponse`) or an `List` containing the queried objects. One difference, you should be aware of, is the fact, that `Future<List<T>> find()` will return an empty list instead of the 'No results' error you receive in case no object matches you query.

Choosing between `query()` and `find()` comes down to personal preference. Both methods can be used for querying a `ParseQuery`, just the output method differs.

Similar to `find()` the `QueryBuilder` also has a function called `Future<T?> first()`. Just like `find()` `first()` is just a convenience method that makes querying the first object satisfying the query simpler. `first()` returns an `Future`, that resoles in an error or the first object matching the query. In case no object satisfies the query, the result will be `null`.

## Complex Queries
You can create complex queries to really put your database to the test:

```dart
var queryBuilder = QueryBuilder<DietPlan>(DietPlan())
  ..startsWith(DietPlan.keyName, "Keto")
  ..greaterThan(DietPlan.keyFat, 64)
  ..lessThan(DietPlan.keyFat, 66)
  ..equals(DietPlan.keyCarbs, 5);

var response = await queryBuilder.query();

if (response.success) {
  print(ApplicationConstants.keyAppName + ": " + ((response.results as List<dynamic>).first as DietPlan).toString());
} else {
  print(ApplicationConstants.keyAppName + ": " + response.exception.message);
}
```

if you want to find objects that match one of several queries, you can use __QueryBuilder.or__ method to construct a query that is an OR of the queries passed in. For instance if you want to find players who either have a lot of wins or a few wins, you can do:
```dart
ParseObject playerObject = ParseObject("Player");

QueryBuilder<ParseObject> lotsOfWins =
    QueryBuilder<ParseObject>(playerObject))
      ..whereGreaterThan('wins', 50);

QueryBuilder<ParseObject> fewWins =
    QueryBuilder<ParseObject>(playerObject)
      ..whereLessThan('wins', 5);

QueryBuilder<ParseObject> mainQuery = QueryBuilder.or(
      playerObject,
      [lotsOfWins, fewWins],
    );

var apiResponse = await mainQuery.query();
```

To find objects that match several queries use __QueryBuilder.and__. To find objects that do not match any given query use __QueryBuilder.nor__.

The features available are:-
* Equals
* Contains
* LessThan
* LessThanOrEqualTo
* GreaterThan
* GreaterThanOrEqualTo
* NotEqualTo
* StartsWith
* EndsWith
* Exists
* Near
* WithinMiles
* WithinKilometers
* WithinRadians
* WithinGeoBox
* WithinPolygon
* MatchesQuery
* DoesNotMatchQuery
* MatchesKeyInQuery
* DoesNotMatchKeyInQuery
* Regex
* Order
* Limit
* Skip
* Ascending
* Descending
* Plenty more!

## Relational queries
If you want to retrieve objects where a field contains an object that matches another query, you can use the
__whereMatchesQuery__ condition.
For example, imagine you have Post class and a Comment class, where each Comment has a pointer to its parent Post.
You can find comments on posts with images by doing:

```dart
QueryBuilder<ParseObject> queryPost =
    QueryBuilder<ParseObject>(ParseObject('Post'))
      ..whereValueExists('image', true);

QueryBuilder<ParseObject> queryComment =
    QueryBuilder<ParseObject>(ParseObject('Comment'))
      ..whereMatchesQuery('post', queryPost);

var apiResponse = await queryComment.query();
```

If you want to retrieve objects where a field contains an object that does not match another query,  you can use the
__whereDoesNotMatchQuery__ condition.
Imagine you have Post class and a Comment class, where each Comment has a pointer to its parent Post.
You can find comments on posts without images by doing:

```dart
QueryBuilder<ParseObject> queryPost =
    QueryBuilder<ParseObject>(ParseObject('Post'))
      ..whereValueExists('image', true);

QueryBuilder<ParseObject> queryComment =
    QueryBuilder<ParseObject>(ParseObject('Comment'))
      ..whereDoesNotMatchQuery('post', queryPost);

var apiResponse = await queryComment.query();
```

You can use the __whereMatchesKeyInQuery__ method to get objects where a key matches the value of a key in a set of objects resulting from another query. For example, if you have a class containing sports teams and you store a user’s hometown in the user class, you can issue one query to find the list of users whose hometown teams have winning records. The query would look like::

```dart
QueryBuilder<ParseObject> teamQuery =
    QueryBuilder<ParseObject>(ParseObject('Team'))
      ..whereGreaterThan('winPct', 0.5);

QueryBuilder<ParseUser> userQuery =
    QueryBuilder<ParseUser>ParseUser.forQuery())
      ..whereMatchesKeyInQuery('hometown', 'city', teamQuery);

var apiResponse = await userQuery.query();
```

Conversely, to get objects where a key does not match the value of a key in a set of objects resulting from another query, use __whereDoesNotMatchKeyInQuery__. For example, to find users whose hometown teams have losing records:

```dart
QueryBuilder<ParseObject> teamQuery =
    QueryBuilder<ParseObject>(ParseObject('Team'))
      ..whereGreaterThan('winPct', 0.5);

QueryBuilder<ParseUser> losingUserQuery =
    QueryBuilder<ParseUser>ParseUser.forQuery())
      ..whereDoesNotMatchKeyInQuery('hometown', 'city', teamQuery);

var apiResponse = await losingUserQuery.query();
```

To filter rows based on objectId’s from pointers in a second table, you can use dot notation:
```dart
QueryBuilder<ParseObject> rolesOfTypeX =
    QueryBuilder<ParseObject>(ParseObject('Role'))
      ..whereEqualTo('type', 'x');

QueryBuilder<ParseObject> groupsWithRoleX =
    QueryBuilder<ParseObject>(ParseObject('Group')))
      ..whereMatchesKeyInQuery('objectId', 'belongsTo.objectId', rolesOfTypeX);

var apiResponse = await groupsWithRoleX.query();
```

## Counting objects
If you only care about the number of games played by a particular player:

```dart
QueryBuilder<ParseObject> queryPlayers =
    QueryBuilder<ParseObject>(ParseObject('GameScore'))
      ..whereEqualTo('playerName', 'Jonathan Walsh');
var apiResponse = await queryPlayers.count();
if (apiResponse.success && apiResponse.result != null) {
  int countGames = apiResponse.count;
}
```

## LiveQuery

This tool allows you to subscribe to a QueryBuilder you are interested in. Once subscribed, the server will notify clients
whenever a ParseObject that matches the QueryBuilder is created or updated, in real-time.

Parse LiveQuery contains two parts, the LiveQuery server and the LiveQuery clients. In order to use live queries, you need
to set up both of them.

The Parse Server configuration guide on the server is found here https://docs.parseplatform.org/parse-server/guide/#live-queries and is not part of this documentation.

Initialize the Parse Live Query by entering the parameter liveQueryUrl in Parse().initialize:
```dart
Parse().initialize(
      keyApplicationId,
      keyParseServerUrl,
      clientKey: keyParseClientKey,
      debug: true,
      liveQueryUrl: keyLiveQueryUrl,
      autoSendSessionId: true);
```

Declare LiveQuery:
```dart
final LiveQuery liveQuery = LiveQuery();
```

Set the QueryBuilder that will be monitored by LiveQuery:
```dart
QueryBuilder<ParseObject> query =
  QueryBuilder<ParseObject>(ParseObject('TestAPI'))
  ..whereEqualTo('intNumber', 1);
```
__Create a subscription__
You’ll get the LiveQuery events through this subscription.
The first time you call subscribe, we’ll try to open the WebSocket connection to the LiveQuery server for you.

```dart
Subscription subscription = await liveQuery.client.subscribe(query);
```

__Event Handling__
We define several types of events you’ll get through a subscription object:

__Create event__
When a new ParseObject is created and it fulfills the QueryBuilder you subscribe, you’ll get this event.
The object is the ParseObject which was created.
```dart
subscription.on(LiveQueryEvent.create, (value) {
    print('*** CREATE ***: ${DateTime.now().toString()}\n $value ');
    print((value as ParseObject).objectId);
    print((value as ParseObject).updatedAt);
    print((value as ParseObject).createdAt);
    print((value as ParseObject).get('objectId'));
    print((value as ParseObject).get('updatedAt'));
    print((value as ParseObject).get('createdAt'));
});
```

__Update event__
When an existing ParseObject which fulfills the QueryBuilder you subscribe is updated (The ParseObject fulfills the
QueryBuilder before and after changes), you’ll get this event.
The object is the ParseObject which was updated. Its content is the latest value of the ParseObject.
```dart
subscription.on(LiveQueryEvent.update, (value) {
    print('*** UPDATE ***: ${DateTime.now().toString()}\n $value ');
    print((value as ParseObject).objectId);
    print((value as ParseObject).updatedAt);
    print((value as ParseObject).createdAt);
    print((value as ParseObject).get('objectId'));
    print((value as ParseObject).get('updatedAt'));
    print((value as ParseObject).get('createdAt'));
});
```

__Enter event__
When an existing ParseObject’s old value does not fulfill the QueryBuilder but its new value fulfills the QueryBuilder,
you’ll get this event. The object is the ParseObject which enters the QueryBuilder.
Its content is the latest value of the ParseObject.
```dart
subscription.on(LiveQueryEvent.enter, (value) {
    print('*** ENTER ***: ${DateTime.now().toString()}\n $value ');
    print((value as ParseObject).objectId);
    print((value as ParseObject).updatedAt);
    print((value as ParseObject).createdAt);
    print((value as ParseObject).get('objectId'));
    print((value as ParseObject).get('updatedAt'));
    print((value as ParseObject).get('createdAt'));
});
```

__Leave event__
When an existing ParseObject’s old value fulfills the QueryBuilder but its new value doesn’t fulfill the QueryBuilder,
you’ll get this event. The object is the ParseObject which leaves the QueryBuilder.
Its content is the latest value of the ParseObject.
```dart
subscription.on(LiveQueryEvent.leave, (value) {
    print('*** LEAVE ***: ${DateTime.now().toString()}\n $value ');
    print((value as ParseObject).objectId);
    print((value as ParseObject).updatedAt);
    print((value as ParseObject).createdAt);
    print((value as ParseObject).get('objectId'));
    print((value as ParseObject).get('updatedAt'));
    print((value as ParseObject).get('createdAt'));
});
```

__Delete event__
When an existing ParseObject which fulfills the QueryBuilder is deleted, you’ll get this event.
The object is the ParseObject which is deleted
```dart
subscription.on(LiveQueryEvent.delete, (value) {
    print('*** DELETE ***: ${DateTime.now().toString()}\n $value ');
    print((value as ParseObject).objectId);
    print((value as ParseObject).updatedAt);
    print((value as ParseObject).createdAt);
    print((value as ParseObject).get('objectId'));
    print((value as ParseObject).get('updatedAt'));
    print((value as ParseObject).get('createdAt'));
});
```

__Unsubscribe__
If you would like to stop receiving events from a QueryBuilder, you can just unsubscribe the subscription.
After that, you won’t get any events from the subscription object and will close the WebSocket connection to the
LiveQuery server.

```dart
liveQuery.client.unSubscribe(subscription);
```

__Disconnection__
In case the client's connection to the server breaks,
LiveQuery will automatically try to reconnect.
LiveQuery will wait at increasing intervals between reconnection attempts.
By default, these intervals are set to `[0, 500, 1000, 2000, 5000, 10000]` for mobile and `[0, 500, 1000, 2000, 5000]` for web.
You can change these by providing a custom list using the `liveListRetryIntervals` parameter at `Parse.initialize()` ("-1" means "do not try to reconnect").

## ParseLiveList
ParseLiveList makes implementing a dynamic List as simple as possible.

### General Use
It ships with the ParseLiveList class itself, this class manages all elements of the list, sorts them,
keeps itself up to date and Notifies you on changes.

### Included Sub-Objects

By default, ParseLiveQuery will provide you with all the objects you included in your Query like this:
```dart
queryBuilder.includeObject(/*List of all the included sub-objects*/);
```
ParseLiveList will not listen for updates on this objects by default.
To activate listening for updates on all included objects, add `listenOnAllSubItems: true` to your ParseLiveListWidgets constructor.
If you want ParseLiveList to listen for updates on only some sub-objects, use `listeningIncludes: const <String>[/*all the included sub-objects*/]` instead.
Just as QueryBuilder, ParseLiveList supports nested sub-objects too.

**NOTE:** To use this features you have to enable [Live Queries](#live-queries) first.

## Relation

The SDK supports Relation.

To add relation to object:

```dart
dietPlan.addRelation('fruits', [ParseObject("Fruits")..set("objectId", "XGadzYxnac")]);
```

To remove relation to object:

```dart
dietPlan.removeRelation('fruits', [ParseObject("Fruits")..set("objectId", "XGadzYxnac")]);
```

To Retrive a relation instance for user, call:
```dart
final relation = dietPlan.getRelation('fruits');
```

and then you can add a relation to the passed in object:
```
relation.add(dietPlan);
final result = await user.save();
```

To retrieve objects that are members of Relation field of a parent object:
```dart
QueryBuilder<ParseObject> query =
    QueryBuilder<ParseObject>(ParseObject('Fruits'))
      ..whereRelatedTo('fruits', 'DietPlan', DietPlan.objectId);
```

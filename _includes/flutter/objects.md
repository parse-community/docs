# Objects

## ParseObject

Storing data on Parse is built around the ``ParseObject``. Each `ParseObject` contains key-value pairs of JSON-compatible data. This data is schemaless, which means that you don’t need to specify ahead of time what keys exist on each `ParseObject`. You simply set whatever key-value pairs you want, and our backend will store it.

For example, let’s say you’re tracking high scores for a game. A single `ParseObject` could contain:

```dart
score: 1337, playerName: 'Sean Plott', cheatMode: false
```

Keys must be alphanumeric strings. Values can be strings, numbers, booleans, or even arrays and dictionaries - anything that can be JSON-encoded.

Each `ParseObject` is an instance of a specific subclass with a class name that you can use to distinguish different sorts of data. For example, we could call the high score object a `GameScore`. We recommend that you NameYourClassesLikeThis and nameYourKeysLikeThis, just to keep your code looking pretty.


## Saving Objects

Let’s say you want to save the `GameScore` described above to your Parse Server. The interface is similar to a common class calling the method generic, passing the key and the value, including the `save` method:

```dart
var gameScore = ParseObject('GameScore')
	..set('score', 1337)
	..set('playerName', 'Sean Plott')
  ..set('cheatMode', false);
var response = await gameScore.save();
if (response.success) {
   // The object was saved successfully.
} else {
  // The save failed.
}
```

After this code runs, you will probably be wondering if anything happened. To make sure the data was saved, you can look at the Data Browser in your app on Parse. You should see something like this:

```json
objectId: "xWMyZ4YEGZ", score: 1337, playerName: "Sean Plott", cheatMode: false,
createdAt:"2011-06-10T18:33:42Z", updatedAt:"2011-06-10T18:33:42Z"
```

There are two things to note here. You didn't have to configure or set up a new Class called `GameScore` before running this code. Your Parse app lazily creates this Class for you when it first encounters it.

There are also a few fields you don't need to specify that are provided as a convenience. `objectId` is a unique identifier for each saved object. `createdAt` and `updatedAt` represent the time that each object was created and last modified in the cloud. Each of these fields is filled in by Parse, so they don't exist on a `ParseObject` until a save operation has been completed.


## Retrieving Objects

Saving data to the cloud is fun, but it's even more fun to get that data out again. If the `ParseObject` has been uploaded to the server, you can use the `objectId` to get it using a `ParseObject`:

```dart
var gameScoreResponse = await ParseObject('GameScore').getObject('xWMyZ4YEGZ');
if (gameScoreResponse.success) {
  // The object was retrieved successfully.
  var gameScore = gameScoreResponse.result;
} else {
  // The object was not retrieved successfully.
  // The error is in a property called exception of response with an error code and message.
}
```

To get the values out of the `ParseObject`, use the `get` method.

```dart
final score = gameScore.get<int>('score');
final playerName = gameScore.get<String>('playerName');
final cheatMode = gameScore.get<bool>('cheatMode');
```

The four special reserved values are provided as properties and cannot be retrieved using the 'get' method nor modified with the 'set' method:

```dart
final objectId = gameScore.objectId;
final updatedAt = gameScore.updatedAt;
final createdAt = gameScore.createdAt;
final acl = gameScore.getACL();
```

If you need to refresh an object you already have with the latest data that
    is in the Parse Cloud, you can call the `fetch` method like so:

```dart
await myObject.fetch();
```

## Updating Objects

Updating an object is simple. Just set some new data on it and call the save method. For example:

```dart
// Create the object.
var gameScore = ParseObject('DietPlan')
                    ..set('score', 1337)
                    ..set('playerName', 'Sean Plott')
                    ..set('cheatMode', false)
                    ..setAdd('skills', ['pwnage', 'flying']);
final gameScoreResponse = await gameScore.save();
gameScore = gameScoreResponse.result;

// Now let's update it with some new data. In this case, only cheatMode and score
// will get sent to the cloud. playerName hasn't changed.
gameScore.set('cheatMode', true);
gameScore.set('score', 1338);
await gameScore.save();
```

Parse automatically figures out which data has changed so only "dirty" fields will be sent to the Parse Cloud. You don't need to worry about squashing data that you didn't intend to update.

### Counters

The above example contains a common use case. The "score" field is a counter that we'll need to continually update with the player's latest score. Using the above method works but it's cumbersome and can lead to problems if you have multiple clients trying to update the same counter.

To help with storing counter-type data, Parse provides methods that atomically increment (or decrement) any number field. So, the same update can be rewritten as:

Retrieve it, call:
```dart
await gameScore.increment('score', 1);
```
or using with save function:

```dart
gameScore.setIncrement('score', 1);
var response = await gameScore.save()
```

### Arrays

To help with storing array data, three operations can be used to atomically change an array associated with a given key:

*   `setAdd` or `add` append the given object to the end of an array field.
*   `setAddUnique` or `addUnique` add the given object only if it isn't already contained in an array field. The position of the insert is not guaranteed.
*   `setRemove` or `remove` remove all instances of the given object from an array field.

For example, we can add items to the set-like "skills" field like so:

```dart
gameScore.setAddUnique('skills', ['flying', 'kungfu']);
await gameScore.save();
```
You can use directly without the method `save`:

```dart
await gameScore.addUnique('skills', ['flying', 'kungfu']);
```

Note that it is not currently possible to atomically add and remove items from an array in the same save. You will have to call `save` in between every different kind of array operation.

## Destroying Objects

To delete an object from the cloud:

```dart
await myObject.delete();
```

You can delete a single field from an object with the `unset` method:

```dart
// After this, the playerName field will be empty
await myObject.unset('playerName');

// If object is not saved remotely, set offlineOnly to true to avoid api calls.
myObject.unset('playerName', offlineOnly: true);
```

## Relational Data

Objects may have relationships with other objects. For example, in a blogging application, a `Post` object may have many `Comment` objects. Parse supports all kinds of relationships, including one-to-one, one-to-many, and many-to-many.

### One-to-One and One-to-Many Relationships

One-to-one and one-to-many relationships are modeled by saving a `ParseObject` as a value in the other object. For example, each `Comment` in a blogging app might correspond to one `Post`.

To create a new `Post` with a single `Comment`, you could write:

```dart
// Create the post
var myPost = ParseObject('Post')
	..set('title', 'I\'m Hungry')
	..set('content', 'Where should we go for lunch?');

// Create the comment
var myComment = ParseObject('Comment')
  ..set('content', 'Let\'s do Sushirrito.');

// Add the post as a value in the comment
myComment.set('parent', myPost);

// This will save both myPost and myComment
await myComment.save();
```

Internally, the Parse framework will store the referred-to object in just one place, to maintain consistency. You can also link objects using just their `objectId`s like so:

```dart
var post = ParseObject('Post')
	..objectId = '1zEcyElZ80';
myComment.set('parent', post);
```

By default, when fetching an object, related `ParseObject`s are not fetched.  These objects' values cannot be retrieved until they have been fetched like so:

```dart
final post = fetchedComment.get<ParseObject>('parent');
await post.fetch();
final title = post.get<String>('title');
```

### Many-to-Many Relationships

Many-to-many relationships are modeled using `ParseRelation`. This works similar to storing an array of `ParseObject`s in a key, except that you don't need to fetch all of the objects in a relation at once.  In addition, this allows `ParseRelation` to scale to many more objects than the array of `ParseObject` approach.  For example, a `User` may have many `Posts` that she might like. In this case, you can store the set of `Posts` that a `User` likes using `relation`.  To add a `Post` to the "likes" list of the `User`, you can do:

```dart
final user = ParseUser.currentUser();
final relation = user.getRelation('likes');
relation.add(post);
await user.save();
```

You can remove a post from a `ParseRelation`:

```dart
relation.remove(post);
user.save();
```

You can call `add` and `remove` multiple times before calling save:

```dart
relation.remove(post1);
relation.remove(post2);
await user.save();
```

You can also pass in an array of `ParseObject` to `add` and `remove`:

```dart
user.addRelation('likes', [post1, post2, post3]);
user.save();
```

By default, the list of objects in this relation is not downloaded.  You can get a list of the posts that a user likes by using the `QueryBuilder` returned by `query`.  The code looks like this:

```dart
await relation.getQuery().query();
```

If you want only a subset of the Posts, you can add extra constraints to the `QueryBuilder` returned by query like this:

```dart
final queryBuilder = relation.getQuery();
queryBuilder.whereEqualTo('title', 'I\'m Hungry');
var response = await queryBuilder.query();
```

For more details on `QueryBuilder`, please look at the query portion of this guide. A `ParseRelation` behaves similar to an array of `ParseObject` for querying purposes, so any query you can do on an array of objects, you can do on a `ParseRelation`.

## Data Types

So far we've used values with type `String`, `int`, and `ParseObject`. Parse also supports `DateTime` and `null`. You can nest `Map`s and `List` to store more structured data within a single `ParseObject`. Overall, the following types are allowed for each field in your object:

* String => `String`
* Number => `int, double`
* Bool => `bool`
* Array => `List`
* Object => `Map`
* Date => `DateTime`
* File => `ParseFile`
* Pointer => other `ParseObject`
* GeoPoint => `ParseGeoPoint`
* Relation => `ParseRelation`
* Null => `null`

Some examples:

```dart
final number = 42;
final boolean = false;
final stringExample = 'the number is ' + number;
final date = DateTime.now();
final array = [stringExample, number];
final object = { number: number, string: stringExample };
final pointer = ParseObject('MyClassName')
	..objectId = objectId;
final bigObject = ParseObject('BigObject')
                  ..set('myNumber', number);
                  ..set('myBool', boolean);
                  ..set('myString', stringExample);
                  ..set('myDate', date);
                  ..set('myArray', array);
                  ..set('myObject', object);
                  ..set('anyKey', null); // this value can only be saved to an existing key
                  ..set('myPointerKey', pointer); // shows up as Pointer &lt;MyClassName&gt; in the Data Browser
await bigObject.save();
```

We do not recommend storing large pieces of binary data like images or documents on `ParseObject`. We recommend you use `ParseFile`s to store images, documents, and other types of files. You can do so by instantiating a `ParseFile` object and setting it on a field. See [Files](#files) for more details.

For more information about how Parse handles data, check out our documentation on [Data](#data).

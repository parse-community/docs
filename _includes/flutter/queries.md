# Queries

We've already seen how a `ParseObject` with `getObject` can retrieve a single `ParseObject` from Parse. There are many other ways to retrieve data with `QueryBuilder` - you can retrieve many objects at once, put conditions on the objects you wish to retrieve, and more.

## Basic Queries

In many cases, `getObject` isn't powerful enough to specify which objects you want to retrieve. `QueryBuilder` offers different ways to retrieve a list of objects rather than just a single object.

The general pattern is to create a `QueryBuilder`, put conditions on it, and then retrieve an `List` of matching `ParseObject`s using `query`. For example, to retrieve the scores that have a particular `playerName`, use the `whereEqualTo` method to constrain the value for a key.

```dart
final gameScore = ParseObject('GameScore');
final query = QueryBuilder<ParseObject>(gameScore)
    ..whereEqualTo("playerName", "Dan Stemkoski");
final resultsFuture = await query.query();
final results = resultsFuture.results ?? [];
print("${"Successfully retrieved " + results.length} scores.");
// Do something with the returned Parse.Object values
for (int i = 0; i < results.length; i++) {
    ParseObject object = results[i];
    print('${object.objectId} - ${object.get<String>('playerName')}');
}
```

## Query Constraints
There are several ways to put constraints on the objects found by a `QueryBuilder`. You can filter out objects with a particular key-value pair with `whereNotEqualTo`:

```dart
query.whereNotEqualTo("playerName", "Michael Yabuti");
```

You can give multiple constraints, and objects will only be in the results if they match all of the constraints.  In other words, it's like an AND of constraints.

```dart
query.whereNotEqualTo("playerName", "Michael Yabuti");
query.whereGreaterThan("playerAge", 18);
```

You can limit the number of results by setting `setLimit`. By default, results are limited to 100. In the old Parse hosted backend, the maximum limit was 1,000, but Parse Server removed that constraint:

```dart
query.setLimit(10); // limit to at most 10 results
```

If you want exactly one result, a more convenient alternative may be to use `first` instead of using `find`.

```dart
final gameScore = ParseObject('GameScore');
final query = QueryBuilder<ParseObject>(gameScore);
query.whereEqualTo("playerEmail", "dstemkoski@example.com");
final resultObject = await query.first();
```

You can skip the first results by setting `setAmountToSkip`. In the old Parse hosted backend, the maximum skip value was 10,000, but Parse Server removed that constraint. This can be useful for pagination:

```dart
query.setAmountToSkip(10); // skip the first 10 results
```

For sortable types like numbers and strings, you can control the order in which results are returned:

```dart
// Sorts the results in ascending order by the score field
query.orderByAscending("score");

// Sorts the results in descending order by the score field
query.orderByDescending("score");
```

For sortable types, you can also use comparisons in queries:

```dart
// Restricts to wins < 50
query.whereLessThan("wins", 50);

// Restricts to wins <= 50
query.whereLessThanOrEqualTo("wins", 50);

// Restricts to wins > 50
query.whereGreaterThan("wins", 50);

// Restricts to wins >= 50
query.whereGreaterThanOrEqualsTo("wins", 50);
```

If you want to retrieve objects matching any of the values in a list of values, you can use `whereContainedIn`, providing an array of acceptable values. This is often useful to replace multiple queries with a single query. For example, if you want to retrieve scores made by any player in a particular list:

```dart
// Finds scores from any of Jonathan, Dario, or Shawn
query.whereContainedIn("playerName",
                  ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]);
```

If you want to retrieve objects that do not match any of  several values you can use `whereNotContainedIn`, providing an array of acceptable values.  For example if you want to retrieve scores from players besides those in a list:

```dart
// Finds scores from anyone who is neither Jonathan, Dario, nor Shawn
query.whereNotContainedIn("playerName",
                     ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]);
```

If you want to retrieve objects that have a particular key set, you can use `whereValueExists` with parameter boolean as true. Conversely, if you want to retrieve objects without a particular key set, you can use `whereValueExists` with parameter boolean as false.

```dart
// Finds objects that have the score set
query.whereValueExists("score", true);

// Finds objects that don't have the score set
query.whereValueExists("score", false);
```

You can use the `whereMatchesKeyInQuery` method to get objects where a key matches the value of a key in a set of objects resulting from another query.  For example, if you have a class containing sports teams and you store a user's hometown in the user class, you can issue one query to find the list of users whose hometown teams have winning records.  The query would look like:

```dart
final team = ParseObject('Team');
final teamQuery = QueryBuilder<ParseObject>(team);
teamQuery.whereGreaterThan("winPct", 0.5);
final userQuery = QueryBuilder<ParseUser>(ParseUser.forQuery());
userQuery.whereMatchesKeyInQuery("hometown", "city", teamQuery);
// results has the list of users with a hometown team with a winning record
final resultsFuture = await userQuery.find();
```

Conversely, to get objects where a key does not match the value of a key in a set of objects resulting from another query, use `whereDoesNotMatchKeyInQuery`. For example, to find users whose hometown teams have losing records:

```dart
final losingUserQuery = QueryBuilder<ParseUser>(ParseUser.forQuery());
losingUserQuery.whereDoesNotMatchKeyInQuery("hometown", "city", teamQuery);
// results has the list of users with a hometown team with a losing record
final resultsFuture = await losingUserQuery.find();
```

To filter rows based on `objectId`'s from pointers in a second table, you can use dot notation:

```dart
final rolesOfTypeX = QueryBuilder<ParseObject>(ParseObject('Role'));
rolesOfTypeX.whereEqualTo('type', 'x');

final groupsWithRoleX = QueryBuilder<ParseObject>(ParseObject('Group'));
groupsWithRoleX.whereMatchesKeyInQuery('objectId', 'belongsTo.objectId', rolesOfTypeX);
groupsWithRoleX.find().then((results) {
   // results has the list of groups with role x
});
```

You can restrict the fields returned by calling `keysToReturn` with a list of keys. To retrieve documents that contain only the `score` and `playerName` fields (and also special built-in fields such as `objectId`, `createdAt`, and `updatedAt`):

```dart
final query = QueryBuilder<ParseObject>(ParseObject("GameScore"));
query.keysToReturn(["score", "playerName"]);
query.find().then((results) {
  // each of results will only have the selected fields available.
});
```

Similarly, use `excludeKeys` to remove undesired fields while retrieving the rest:

```dart
final query = QueryBuilder<ParseObject>(ParseObject("GameScore"));
query.excludeKeys(["playerName"]);
query.find().then((results) {
  // Now each result will have all fields except `playerName`
});
```


The remaining fields can be fetched later by calling `fetch` on the returned objects:

```dart
query.first().then((result) {
  // only the selected fields of the object will now be available here.
  return result?.fetch();
}).then((result) {
  // all fields of the object will now be available here.
});
```
## Queries on Array Values

For keys with an array type, you can find objects where the key's array value contains 2 by:

```dart
// Find objects where the array in arrayKey contains 2.
query.whereEqualTo("arrayKey", 2);
```

You can also find objects where the key's array value contains each of the elements 2, 3, and 4 with the following:

```dart
// Find objects where the array in arrayKey contains all of the elements 2, 3, and 4.
query.whereArrayContainsAll("arrayKey", [2, 3, 4]);
```

## Queries on String Values

Use `whereStartsWith` to restrict to string values that start with a particular string. Similar to a MySQL LIKE operator, this is indexed so it is efficient for large datasets:

```dart
// Finds barbecue sauces that start with "Big Daddy's".
final query = QueryBuilder<ParseObject>(ParseObject("BarbecueSauce"));
query.whereStartsWith("name", "Big Daddy's");
```
To case-sensitive, pass a boolean in the third parameter.

```dart
// Finds barbecue sauces that start with "Big Daddy's".
var query = QueryBuilder<ParseObject>(ParseObject("BarbecueSauce"));
// Third parameter for case-sensitive
query.whereStartsWith("name", "Big Daddy's", caseSensitive: true);
```

The above example will match any `BarbecueSauce` objects where the value in the "name" String key starts with "Big Daddy's". For example, both "Big Daddy's" and "Big Daddy's BBQ" will match, but "big daddy's" or "BBQ Sauce: Big Daddy's" will not.

Queries that have regular expression constraints are very expensive, especially for classes with over 100,000 records. Parse restricts how many such operations can be run on a particular app at any given time.

## Relational Queries

There are several ways to issue queries for relational data. If you want to retrieve objects where a field matches a particular `ParseObject`, you can use `whereEqualTo` just like for other data types. For example, if each `Comment` has a `Post` object in its `post` field, you can fetch comments for a particular `Post`:

```dart
// Assume Parse.Object myPost was previously created.
final query = QueryBuilder<ParseObject>(ParseObject("Comment"))
    ..whereEqualTo("post", myPost);
// comments now contains the comments for myPost
var comments = await query.find();
```

If you want to retrieve objects where a field contains a `ParseObject` that matches a different query, you can use `whereMatchesQuery`. In order to find comments for posts containing images, you can do:

```dart
final innerQuery = QueryBuilder<ParseObject>(ParseObject("Post"));
innerQuery.whereValueExists("image", true);
final query = QueryBuilder<ParseObject>(ParseObject("Comment"));
query.whereMatchesQuery("post", innerQuery);
// comments now contains the comments for posts with images.
var comments = await query.find();
```

If you want to retrieve objects where a field contains a `Parse.Object` that does not match a different query, you can use `doesNotMatchQuery`.  In order to find comments for posts without images, you can do:

```dart
final innerQuery = QueryBuilder<ParseObject>(ParseObject("Post"));
innerQuery.whereValueExists("image", true);
final query = QueryBuilder<ParseObject>(ParseObject("Comment"));
query.whereDoesNotMatchQuery("post", innerQuery);
// comments now contains the comments for posts with images.
var comments = await query.find();
```

You can also do relational queries by `objectId`:

```dart
var post = ParseObject('Post');
post.objectId = '1zEcyElZ80';
query.whereEqualTo("post", post);
```

In some situations, you want to return multiple types of related objects in one query. You can do this with the `include` method. For example, let's say you are retrieving the last ten comments, and you want to retrieve their related posts at the same time:

```dart
final query = QueryBuilder<ParseObject>(ParseObject("Comment"));

// Retrieve the most recent ones
query.orderByDescending("createdAt");

// Only retrieve the last ten
query.setLimit(10);

// Include the post data with each comment
query.includeObject(["post"]);

// Comments now contains the last ten comments, and the "post" field
var comments = await query.find();

// has been populated. For example:
for (var i = 0; i < comments.length; i++) {
    // This does not require a network access.
    var post = comments[i].getObject("post");
}
```

You can also do multi level includes using dot notation.  If you wanted to include the post for a comment and the post's author as well you can do:

```dart
query.includeObject(['post.author']);
```

You can issue a query with multiple fields included by calling `includeObject` multiple times. This functionality also works with QueryBuilder helper like `first`.

## Counting Objects

Note: In the old Parse hosted backend, count queries were rate limited to a maximum of 160 requests per minute. They also returned inaccurate results for classes with more than 1,000 objects. But, Parse Server has removed both constraints and can count objects well above 1,000.

If you just need to count how many objects match a query, but you do not need to retrieve all the objects that match, you can use `count` instead of `find`. For example, to count how many games have been played by a particular player:

```dart
final query = QueryBuilder<ParseObject>(ParseObject("GameScore"));
query.whereEqualTo("playerName", "Sean Plott");
final countResponse = await query.count();
print("${"Sean has played " + countResponse.count.toString()} games");
```

## Compound Queries

For more complex queries you might need compound queries. A compound query is a logical combination (e. g. "and" or "or") of sub queries.

Note that we do not support GeoPoint or non-filtering constraints (e.g. `whereNear`, `whereWithinGeoBox`, `setLimit`, `setAmountToSkip`, `orderByAscending`/`orderByDescending`, `includeObject`) in the subqueries of the compound query.


### OR-ed query constraints

If you want to find objects that match one of several queries, you can use `Parse.Query.or` method to construct a query that is an OR of the queries passed in.  For instance if you want to find players who either have a lot of wins or a few wins, you can do:

```dart
final lotsOfWins = QueryBuilder<ParseObject>(ParseObject("Player"));
lotsOfWins.whereGreaterThan("wins", 150);

final fewWins = QueryBuilder<ParseObject>(ParseObject("Player"));
fewWins.whereLessThan("wins", 5);

final mainQuery = QueryBuilder.or(ParseObject("Player"), [lotsOfWins, fewWins]);
mainQuery.find().then((results) => {
    // results contains a list of players that either have won a lot of games or won only a few games.
}).catchError((error) {
    // There was an error.
});
```


### AND-ed query constraints
Function not available on Flutter SDK.

> Alternative is use Cloud Code

## Aggregate

Function not available on Flutter SDK.

> Alternative is use Cloud Code

## Distinct

Function not available on Flutter SDK.

> Alternative is use Cloud Code



## Read Preference

Function not available on Flutter SDK.

> Alternative is use Cloud Code

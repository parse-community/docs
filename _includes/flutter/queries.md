# Queries

We've already seen how a `ParseObject` with `getObject` can retrieve a single `ParseObject` from Parse. There are many other ways to retrieve data with `QueryBuilder` - you can retrieve many objects at once, put conditions on the objects you wish to retrieve, and more.

## Basic Queries

In many cases, `getObject` isn't powerful enough to specify which objects you want to retrieve. `QueryBuilder` offers different ways to retrieve a list of objects rather than just a single object.

The general pattern is to create a `QueryBuilder`, put conditions on it, and then retrieve an `List` of matching `ParseObject`s using `query`. For example, to retrieve the scores that have a particular `playerName`, use the `whereEqualTo` method to constrain the value for a key.

```dart
var gameScore = ParseObject('GameScore');
var queryBuilder = QueryBuilder<ParseObject>(gameScore);
  ..whereEqualTo("playerName", "Dan Stemkoski");
var resultsFuture = await queryBuilder.query();
var results = resultsFuture.result;
print("Successfully retrieved " + results.length + " scores.");
// Do something with the returned Parse.Object values
for (int i = 0; i < results.length; i++) {
  ParseObject object = results[i];
  print(object.objectId + ' - ' + object.get<String>('playerName'));
}
```

## Query Constraints
There are several ways to put constraints on the objects found by a `QueryBuilder`. You can filter out objects with a particular key-value pair with `whereNotEqualTo`:

```dart
queryBuilder.whereNotEqualTo("playerName", "Michael Yabuti");
```

You can give multiple constraints, and objects will only be in the results if they match all of the constraints.  In other words, it's like an AND of constraints.

```dart
queryBuilder.whereNotEqualTo("playerName", "Michael Yabuti");
queryBuilder.whereGreaterThan("playerAge", 18);
```

You can limit the number of results by setting `setLimit`. By default, results are limited to 100. In the old Parse hosted backend, the maximum limit was 1,000, but Parse Server removed that constraint:

```dart
queryBuilder.setLimit(10); // limit to at most 10 results
```

If you want exactly one result, a more convenient alternative may be to use `first` instead of using `find`.

```dart
var gameScore = ParseObject('GameScore');
var queryBuilder = QueryBuilder<ParseObject>(gameScore);
queryBuilder.whereEqualTo("playerEmail", "dstemkoski@example.com");
var resultObject = await queryBuilder.first();
```

You can skip the first results by setting `setAmountToSkip`. In the old Parse hosted backend, the maximum skip value was 10,000, but Parse Server removed that constraint. This can be useful for pagination:

```dart
query.setAmountToSkip(10); // skip the first 10 results
```

For sortable types like numbers and strings, you can control the order in which results are returned:

```dart
// Sorts the results in ascending order by the score field
queryBuilder.orderByAscending("score");

// Sorts the results in descending order by the score field
queryBuilder.orderByDescending("score");
```

For sortable types, you can also use comparisons in queries:

```dart
// Restricts to wins < 50
queryBuilder.whereLessThan("wins", 50);

// Restricts to wins <= 50
queryBuilder.whereLessThanOrEqualTo("wins", 50);

// Restricts to wins > 50
queryBuilder.whereGreaterThan("wins", 50);

// Restricts to wins >= 50
queryBuilder.whereGreaterThanOrEqualsTo("wins", 50);
```

If you want to retrieve objects matching any of the values in a list of values, you can use `whereContainedIn`, providing an array of acceptable values. This is often useful to replace multiple queries with a single query. For example, if you want to retrieve scores made by any player in a particular list:

```dart
// Finds scores from any of Jonathan, Dario, or Shawn
queryBuilder.whereContainedIn("playerName",
                  ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]);
```

If you want to retrieve objects that do not match any of  several values you can use `whereNotContainedIn`, providing an array of acceptable values.  For example if you want to retrieve scores from players besides those in a list:

```dart
// Finds scores from anyone who is neither Jonathan, Dario, nor Shawn
queryBuilder.whereNotContainedIn("playerName",
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
var team = ParseObject('Team');
var teamQuery = QueryBuilder<ParseObject>(team);
teamQuery.whereGreaterThan("winPct", 0.5);
var userQuery = QueryBuilder<ParseUser>(ParseUser.forQuery());
userQuery.whereMatchesKeyInQuery("hometown", "city", teamQuery);
// results has the list of users with a hometown team with a winning record
var resultsFuture = await userQuery.find();
```

Conversely, to get objects where a key does not match the value of a key in a set of objects resulting from another query, use `whereDoesNotMatchKeyInQuery`. For example, to find users whose hometown teams have losing records:

```dart
var losingUserQuery = QueryBuilder<ParseUser>(ParseUser.forQuery());
losingUserQuery.whereDoesNotMatchKeyInQuery("hometown", "city", teamQuery);
// results has the list of users with a hometown team with a losing record
var resultsFuture = await losingUserQuery.find();
```

To filter rows based on `objectId`'s from pointers in a second table, you can use dot notation:

```dart
var rolesOfTypeX = QueryBuilder<ParseObject>(ParseObject('Role'));
rolesOfTypeX.whereEqualTo('type', 'x');

var groupsWithRoleX = QueryBuilder<ParseObject>(ParseObject('Group'));
groupsWithRoleX.whereMatchesKeyInQuery('objectId', 'belongsTo.objectId', rolesOfTypeX);
groupsWithRoleX.find().then((results) {
   // results has the list of groups with role x
});
```

You can restrict the fields returned by calling `keysToReturn` with a list of keys. To retrieve documents that contain only the `score` and `playerName` fields (and also special built-in fields such as `objectId`, `createdAt`, and `updatedAt`):

```dart
var queryBuilder = QueryBuilder<ParseObject>(ParseObject("GameScore"));
queryBuilder.keysToReturn(["score", "playerName"]);
queryBuilder.find().then((results) {
  // each of results will only have the selected fields available.
});
```

Similarly, use `excludeKeys` to remove undesired fields while retrieving the rest:

```dart
var queryBuilder = QueryBuilder<ParseObject>(ParseObject("GameScore"));
query.excludeKeys(["playerName"]);
query.find().then((results) {
  // Now each result will have all fields except `playerName`
});
```


The remaining fields can be fetched later by calling `fetch` on the returned objects:

```dart
queryBuilder.first().then((result) {
  // only the selected fields of the object will now be available here.
  return result.fetch();
}).then((result) {
  // all fields of the object will now be available here.
});
```
## Queries on Array Values

For keys with an array type, you can find objects where the key's array value contains 2 by:

```dart
// Find objects where the array in arrayKey contains 2.
queryBuilder.whereEqualTo("arrayKey", 2);
```

You can also find objects where the key's array value contains each of the elements 2, 3, and 4 with the following:

```dart
// Find objects where the array in arrayKey contains all of the elements 2, 3, and 4.
queryBuilder.whereArrayContainsAll("arrayKey", [2, 3, 4]);
```

## Queries on String Values

Use `whereStartsWith` to restrict to string values that start with a particular string. Similar to a MySQL LIKE operator, this is indexed so it is efficient for large datasets:

```dart
// Finds barbecue sauces that start with "Big Daddy's".
var queryBuilder = QueryBuilder<ParseObject>(ParseObject("BarbecueSauce"));
queryBuilder.whereStartsWith("name", "Big Daddy's");
```
To case-sensitive, pass a boolean in the third parameter.

```dart
// Finds barbecue sauces that start with "Big Daddy's".
var queryBuilder = QueryBuilder<ParseObject>(ParseObject("BarbecueSauce"));
// Third parameter for case-sensitive
queryBuilder.whereStartsWith("name", "Big Daddy's", true);
```

The above example will match any `BarbecueSauce` objects where the value in the "name" String key starts with "Big Daddy's". For example, both "Big Daddy's" and "Big Daddy's BBQ" will match, but "big daddy's" or "BBQ Sauce: Big Daddy's" will not.

Queries that have regular expression constraints are very expensive, especially for classes with over 100,000 records. Parse restricts how many such operations can be run on a particular app at any given time.

## Relational Queries



## Counting Objects




## Compound Queries




### OR-ed query constraints




### AND-ed query constraints



## Aggregate



## Distinct



## Read Preference

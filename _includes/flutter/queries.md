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

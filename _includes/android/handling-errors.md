# Handling Errors

Many of the methods on `ParseObject`, including `save()`, `delete()`, and `get()` will throw a `ParseException` on an invalid request, such as deleting or editing an object that no longer exists in the cloud, or when there is a network failure preventing communication with the Parse Cloud. You will need to catch and deal with these exceptions.

For more details, look at the [Android API](https://parse.com/docs/android/api/).

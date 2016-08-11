# Handling Errors

The Parse PHP SDK throws `ParseException`s when errors are returned from the Parse API.  For other errors, the base `Exception` class will be thrown.  It is recommended to wrap your Parse calls in try/catch blocks to handle any errors which occur.

````php
$query = new ParseQuery("Note");
try {
  // This will throw a ParseException, the object is not found.
  $result = $query->get("aBcDeFgH")
} catch (ParseException $error) {
  // $error is an instance of ParseException with details about the error.
  echo $error->getCode();
  echo $error->getMessage();
}
````

For a list of all possible error codes, scroll down to [Error Codes](#errors).

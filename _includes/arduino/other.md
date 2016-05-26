# REST API

Because the Arduino SDK was designed to minimize memory footprint, it doesn't provide direct functions for all the Parse features that are present in the mobile SDKs. However, it does have the capability to call the REST API, which offers the full range of functionality.

For example, you could sign up a user from Arduino through a REST call:

```cpp
ParseResponse response = Parse.sendRequest("POST", "/1/users", "{\"username\":\"cooldude6\",\"password\":\"p_n7!-e8\"}", "");
```

In this case, the response will contain the objectId of the created user, assuming it was created successfully.

Head on over to the [REST API documentation]({{ '/rest' | prepend: site.baseurl }}) to discover what's possible. For each code sample, you can switch it to Arduino to see what the function call would look like.

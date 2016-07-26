# Requests

The main way you'll be interacting with Parse is through the `parseSendRequest` function, which sends a request to the REST API. For example, here's how to save an object with some data:

```cpp
char data[] = "{ \"temperature\": 165 }"; parseSendRequest(client, "POST", "/1/classes/Temperature", data, NULL);
```

For some requests you will be interested in data returned for the request. In such a case you need to setup a callback and pass it to `parseSendRequest`.

```cpp
void mySaveCallback(ParseClient client, int error, int httpStatus, const char* httpResponseBody) {
	if (error == 0 && httpResponseBody != NULL) {
		// httpResponseBody holds the response to the request
	}
}

parseSendRequest(client, "GET", "/1/classes/TestObject/gsMHOY3MAx", NULL, myCallback);
```

Using this function, you have full access to the REST API to create objects, delete objects, send analytics events, and more. Take a look at the [REST API Guide](/docs/rest) to find out all the details.

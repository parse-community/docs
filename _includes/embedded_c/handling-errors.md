# Handling Errors

There are two main ways an error from the SDK can be propagated to the caller - as a return result of the method call, or through the request and push callbacks.

All functions that return a result will return 0 on success and a non-zero value on error. The error value will be an OS-specific error (for example, socket errors).

The errors passed through callbacks are again OS-specific errors. The one exception is if there is an HTTP error status (4xx or 5xx) for a request, in which case, the HTTP status will be passed as separate parameters to the request callback.

In the case of an HTTP error status, you should also check the request body. If the request body contains a valid JSON document, the document will contain a Parse error code, as defined by the [REST API documentation](/docs/rest).

For a list of all possible error codes, scroll down to [Error Codes](#errors).

# Handling Errors

Parse has a few simple patterns for surfacing errors and handling them in your code.

There are two types of errors you may encounter. The first is those dealing with logic errors in the way you're using the SDK. These types of errors result in general `Exception` being raised. For an example take a look at the following code:

```cs
var user = new ParseUser();
user.SignUpAsync();
```

This will throw an `InvalidOperationException` because `SignUpAsync` was called without first setting the required properties (`Username` and `Password`).

The second type of error is one that occurs when interacting with the Parse Cloud over the network. These errors are either related to problems connecting to the cloud or problems performing the requested operation. For example, an error may result from an existing user trying to sign up. Here's how you could handle this error as well as the previous SDK logic errors:

```cs
try
{
    user.SignUpAsync().ContinueWith(t => {
        if (t.IsFaulted) {
            // Errors from Parse Cloud and network interactions
            using (IEnumerator<System.Exception> enumerator = t.Exception.InnerExceptions.GetEnumerator()) {
                if (enumerator.MoveNext()) {
                    ParseException error = (ParseException) enumerator.Current;
                    // error.Message will contain an error message
                    // error.Code will return "OtherCause"
                }
            }
        }
    });
}
catch (InvalidOperationException e)
{
    // Error from the SDK logic checks
    // e.Message will contain the specific error
    // ex: "Cannot sign up user with an empty name."
}
```

At the moment there are a couple of things to watch out for:

1.  Due to limitations with Unity's `WWW` class, error details from Parse Cloud interactions are not passed back to the SDK. The error message in these scenarios is of the form ''40x message'' for example, ''400 Bad Request'' or ''404 Not Found''. You can implement a generic error handler for those scenarios.
2.  If you want finer grained control over your error handling, you could look into using [Cloud Functions]({{ site.baseUrl }}/cloudcode/guide/#cloud-functions) to wrap your calls and send back the error information via the Cloud Code success path. Sending the error information through the success path ensures that they are passed back to the SDK.

Let's take a look at another error handling example:

```cs
ParseObject.GetQuery("Note").GetAsync("thisObjectIdDoesntExist");
```

In the above code, we try to fetch an object with a non-existent `ObjectId`. The Parse Cloud will return an error -- so here's how to handle it properly:

```cs
ParseObject.GetQuery("Note").GetAsync(someObjectId).ContinueWith(t =>
{
    if (t.IsFaulted)
    {
        // One or more errors occurred.
    }
    else
    {
        // Everything went fine!
    }
})
```

For a list of all possible `ErrorCode` types, scroll down to [Error Codes](#error-codes), or see the `ParseException.ErrorCode` section of the [.NET API]({{ site.apis.dotnet }}/html/T_Parse_ParseException_ErrorCode.htm).

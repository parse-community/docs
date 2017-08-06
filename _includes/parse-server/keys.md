# Keys

Parse Server does not require the use of client-side keys. This includes the client key, JavaScript key, .NET key, and REST API key. The Application ID is sufficient to secure your app.

However, you have the option to specify any of these four keys upon initialization. Upon doing so, Parse Server will enforce that any clients passing a key matches. The behavior is consistent with hosted Parse.

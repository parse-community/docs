Parse Server supports 3rd party authentication with

* Twitter
* Meetup
* LinkedIn
* Google
* Instagram
* Facebook

Configuration options for these 3rd-party modules is done with the `oauth` option passed to Parse Server:

```js
{
  oauth: {
   twitter: {
     consumer_key: "", // REQUIRED
     consumer_secret: "" // REQUIRED
   },
   facebook: {
     appIds: "FACEBOOK APP ID"
   }
  }
}
```

## Custom authentication

It is possible to leverage the OAuth support with any 3rd party authentication that you bring in.

```js
{

  oauth: {
   my_custom_auth: {
     module: "PATH_TO_MODULE" // OR object,
     option1: "",
     option2: "",
   }
  }
}
```

On this module, you need to implement and export those two functions `validateAuthData(authData, options) {} ` and `validateAppId(appIds, authData) {}`.

For more information about custom auth please see the examples:

- [Facebook OAuth](https://github.com/ParsePlatform/parse-server/blob/master/src/authDataManager/facebook.js)
- [Twitter OAuth](https://github.com/ParsePlatform/parse-server/blob/master/src/authDataManager/twitter.js)
- [Instagram OAuth](https://github.com/ParsePlatform/parse-server/blob/master/src/authDataManager/instagram.js)

# Usage

Parse Server is meant to be mounted on an [Express](http://expressjs.com/) app. Express is a web framework for Node.js. The fastest way to get started is to clone the [Parse Server repo](https://github.com/parse-community/parse-server), which at its root contains a sample Express app with the Parse API mounted.

The constructor returns an API object that conforms to an [Express Middleware](http://expressjs.com/en/api.html#app.use). This object provides the REST endpoints for a Parse app. Create an instance like so:

```js
const api = new ParseServer({
  databaseURI: 'mongodb://your.mongo.uri',
  cloud: './cloud/main.js',
  appId: 'myAppId',
  masterKey: 'mySecretMasterKey',
  serverURL: 'http://localhost:1337/parse'
});
```

## Basic Options

* `appId`: A unique identifier for your app.
* `databaseURI`: Connection string URI for your MongoDB.
* `cloud`: Path to your app’s Cloud Code.
* `masterKey`: A key that overrides all permissions. Keep this secret.
* `serverURL`: URL to your Parse Server (don't forget to specify http:// or https://). This URL will be used when making requests to Parse Server from Cloud Code.
* `port`: The default port is 1337, specify this parameter to use a different port.
* `push`: An object containing push configuration. See [Push](#push-notifications)
* `auth`: Configure support for [3rd party authentication](#oauth-and-3rd-party-authentication).

For the full list of available options, run `parse-server --help` or refer to [Parse Server Options](https://parseplatform.org/parse-server/api/master/ParseServerOptions.html) for a complete list of configuration options.

The Parse Server object was built to be passed directly into `app.use`, which will mount the Parse API at a specified path in your Express app:

```js
const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = express();
const api = new ParseServer({ ... });

// Serve the Parse API at /parse URL prefix
app.use('/parse', api);

var port = 1337;
app.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});
```

And with that, you will have a Parse Server running on port 1337, serving the Parse API at `/parse`.

## Configuration

Parse Server can be configured using the following options. You may pass these as parameters when running a standalone `parse-server`, or by loading a configuration file in JSON format using `parse-server path/to/configuration.json`. If you're using Parse Server on Express, you may also pass these to the `ParseServer` object as options.

For the full list of available options, run `parse-server --help` or take a look at [Parse Server Configurations](http://parseplatform.org/parse-server/api/master/ParseServerOptions.html).

## Additional Options

### Email verification and password reset

Verifying user email addresses and enabling password reset via email requires an email adapter.

You can also use email adapters contributed by the community such as:
- [parse-server-mailgun-adapter-template](https://www.npmjs.com/package/parse-server-mailgun-adapter-template)
- [parse-smtp-template (Multi Language and Multi Template)](https://www.npmjs.com/package/parse-smtp-template)
- [parse-server-postmark-adapter](https://www.npmjs.com/package/parse-server-postmark-adapter)
- [parse-server-sendgrid-adapter](https://www.npmjs.com/package/parse-server-sendgrid-adapter)
- [parse-server-mandrill-adapter](https://www.npmjs.com/package/parse-server-mandrill-adapter)
- [parse-server-simple-ses-adapter](https://www.npmjs.com/package/parse-server-simple-ses-adapter)
- [parse-server-sendinblue-adapter](https://www.npmjs.com/package/parse-server-sendinblue-adapter)
- [parse-server-mailjet-adapter](https://www.npmjs.com/package/parse-server-mailjet-adapter)
- [simple-parse-smtp-adapter](https://www.npmjs.com/package/simple-parse-smtp-adapter)
- [parse-server-generic-email-adapter](https://www.npmjs.com/package/parse-server-generic-email-adapter)

The Parse Server Configuration Options relating to email verifcation are:

* `verifyUserEmails`: whether the Parse Server should send mail on user signup
* `emailVerifyTokenValidityDuration`: how long the email verify tokens should be valid for
* `emailVerifyTokenReuseIfValid`: whether an existing token should be resent if the token is still valid
* `preventLoginWithUnverifiedEmail`: whether the Parse Server should prevent login until the user verifies their email
* `publicServerURL`: The public URL of your app. This will appear in the link that is used to verify email addresses and reset passwords.
* `appName`: Your apps name. This will appear in the subject and body of the emails that are sent.
* `emailAdapter`: The email adapter.

```js
const api = ParseServer({
  ...otherOptions,
  verifyUserEmails: true,
  emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)
  preventLoginWithUnverifiedEmail: false, // defaults to false
  publicServerURL: 'https://example.com/parse',
  appName: 'Parse App',
  emailAdapter: {
    module: '@parse/simple-mailgun-adapter',
    options: {
      fromAddress: 'parse@example.com',
      domain: 'example.com',
      apiKey: 'key-mykey',
    }
  },
});
```
Note:

* If `verifyUserEmails` is `true` and if `emailVerifyTokenValidityDuration` is `undefined` then email verify token never expires. Else, email verify token expires after `emailVerifyTokenValidityDuration`.

### Account Lockout

Account lockouts prevent login requests after a defined number of failed password attempts. The account lock prevents logging in for a period of time even if the correct password is entered.

If the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`.

After `duration` minutes of no login attempts, the application will allow the user to try login again.

*`accountLockout`: Object that contains account lockout rules
*`accountLockout.duration`: Determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
*`accountLockout.threshold`: Determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.

```js
const api = ParseServer({
  ...otherOptions,
  accountLockout: {
    duration: 5,
    threshold: 3
  }
});
```

### Password Policy

Password policy is a good way to enforce that users' passwords are secure.

Two optional settings can be used to enforce strong passwords. Either one or both can be specified.

If both are specified, both checks must pass to accept the password

1. `passwordPolicy.validatorPattern`: a RegExp object or a regex string representing the pattern to enforce
2. `passwordPolicy.validatorCallback`: a callback function to be invoked to validate the password

The full range of options for Password Policy are:

*`passwordPolicy` is an object that contains the following rules:
*`passwordPolicy.validationError`: optional error message to be sent instead of the default "Password does not meet the Password Policy requirements." message.
*`passwordPolicy.doNotAllowUsername`: optional setting to disallow username in passwords
*`passwordPolicy.maxPasswordAge`: optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset.
*`passwordPolicy.maxPasswordHistory`: optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
*`passwordPolicy.resetTokenValidityDuration`: optional setting to set a validity duration for password reset links (in seconds)
*`passwordPolicy.resetTokenReuseIfValid`: optional setting to resend current token if it's still valid

```js
const validatePassword = password => {
  if (!password) {
    return false;
  }
  if (password.includes('pass')) {
    return false;
  }
  return true;
}
const api = ParseServer({
  ...otherOptions,
  passwordPolicy: {
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
    validatorCallback: (password) => { return validatePassword(password) },
    validationError: 'Password must contain at least 1 digit.',
    doNotAllowUsername: true,
    maxPasswordAge: 90,
    maxPasswordHistory: 5,
    resetTokenValidityDuration: 24*60*60,
    resetTokenReuseIfValid: true
  }
});
```


### Custom Pages

It’s possible to change the default pages of the app and redirect the user to another path or domain.

```js
const api = ParseServer({
  ...otherOptions,
  customPages: {
    passwordResetSuccess: "http://yourapp.com/passwordResetSuccess",
    verifyEmailSuccess: "http://yourapp.com/verifyEmailSuccess",
    parseFrameURL: "http://yourapp.com/parseFrameURL",
    linkSendSuccess: "http://yourapp.com/linkSendSuccess",
    linkSendFail: "http://yourapp.com/linkSendFail",
    invalidLink: "http://yourapp.com/invalidLink",
    invalidVerificationLink: "http://yourapp.com/invalidVerificationLink",
    choosePassword: "http://yourapp.com/choosePassword"
  }
})
```

## Insecure Options

When deploying to be production, make sure:

* `allowClientClassCreation` is set to `false`
* `mountPlayground` is not set to `true`
* `masterKey` is set to a long and complex string
* `readOnlyMasterKey` if set, is set to a long and complex string
* That you have authentication required on your database, and, if you are using mongo, disable unauthenticated access to port 27017
* You have restricted `count` and `addField` operations via [Class Level Permissions](#class-level-permissions)
* You enforce ACL and data validation using [cloud code]({{site.baseURL}}/cloudcode/guide/)

## Using environment variables to configure Parse Server

You may configure the Parse Server using environment variables:

```bash
PORT
PARSE_SERVER_APPLICATION_ID
PARSE_SERVER_MASTER_KEY
PARSE_SERVER_DATABASE_URI
PARSE_SERVER_URL
PARSE_SERVER_CLOUD
```

The default port is 1337, to use a different port set the PORT environment variable:

```bash
$ PORT=8080 parse-server --appId APPLICATION_ID --masterKey MASTER_KEY
```

For the full list of configurable environment variables, run `parse-server --help` or take a look at [Parse Server Configuration](https://github.com/parse-community/parse-server/blob/master/src/Options/Definitions.js).

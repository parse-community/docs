# Compatibility with parse.com

There are a few areas where Parse Server does not provide compatibility with the original Parse.com hosted backend.

## Analytics

Parse Analytics is not supported. We recommend sending analytics to another similar service like Mixpanel or Google Analytics.

## Authentication

By default, only an application ID is needed to authenticate with Parse Server. The base configuration that comes with the one-click deploy options does not require authenticating with any other types of keys. Therefore, specifying client keys on Android or iOS is not needed.

## Client Class Creation

Hosted Parse applications can turn off client class creation in their settings. Client Class Creation can be disabled by a configuration flag on parse-server.

## Cloud Code

You will likely need to make several changes to your Cloud Code to port it to Parse Server.

### No current user

Each Cloud Code request is now handled by the same instance of Parse Server, therefore there is no longer a concept of a "current user" constrained to each Cloud Code request. If your code uses `Parse.User.current()`, you should use `request.user` instead. If your Cloud function relies on queries and other operations being performed within the scope of the user making the Cloud Code request, you will need to pass the user's `sessionToken` as a parameter to the operation in question.

Consider an messaging app where every `Message` object is set up with an ACL that only provides read-access to a limited set of users, say the author of the message and the recipient. To get all the messages sent to the current user you may have a Cloud function similar to this one:

```js
// Parse.com Cloud Code
Parse.Cloud.define('getMessagesForUser', function(request, response) {
  var user = Parse.User.current();

  var query = new Parse.Query('Messages');
  query.equalTo('recipient', user);
  query.find()
    .then(function(messages) {
      response.success(messages);
    });
});
```

If this function is ported over to Parse Server without any modifications, you will first notice that your function is failing to run because `Parse.User.current()` is not recognized. If you replace `Parse.User.current()` with `request.user`, the function will run successfully but you may still find that it is not returning any messages at all. That is because `query.find()` is no longer running within the scope of `request.user` and therefore it will only return publicly-readable objects.

To make queries and writes as a specific user within Cloud Code, you need to pass the user's `sessionToken` as an option. The session token for the authenticated user making the request is available in `request.user.getSessionToken()`.

The ported Cloud function would now look like this:

```js
// Parse Server Cloud Code
Parse.Cloud.define('getMessagesForUser', function(request, response) {
  var user = request.user; // request.user replaces Parse.User.current()
  var token = user.getSessionToken(); // get session token from request.user

  var query = new Parse.Query('Messages');
  query.equalTo('recipient', user);
  query.find({ sessionToken: token }) // pass the session token to find()
    .then(function(messages) {
      response.success(messages);
    });
});
```

### Master key must be passed explicitly

`Parse.Cloud.useMasterKey()` is not available in Parse Server Cloud Code. Instead, pass `useMasterKey: true` as an option to any operation that requires the use of the master key to bypass ACLs and/or CLPs.

Consider you want to write a Cloud function that returns the total count of messages sent by all of your users. Since the objects in our `Message` class are using ACLs to restrict read access, you will need to use the master key to get the total count:

```js
Parse.Cloud.define('getTotalMessageCount', function(request, response) {

  // Parse.Cloud.useMasterKey() <-- no longer available!

  var query = new Parse.Query('Messages');
  query.count({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
      response.success(count);
    });
});
```

### Minimum JavaScript SDK version

Parse Server also uses at least version [1.7.0](https://github.com/parse-community/Parse-SDK-JS/releases) of the Parse SDK, which has some breaking changes from the previous versions. If your Parse.com Cloud Code uses a previous version of the SDK, you may need to update your cloud code. You can look up which version of the JavaScript SDK your Parse.com Cloud Code is using by running the following command inside your Cloud Code folder:

```
$ parse jssdk
Current JavaScript SDK version is 1.7.0
```

### Network requests

As with Parse Cloud Code, you can use `Parse.Cloud.httpRequest` to make network requests on Parse Server. It's worth noting that in Parse Server you can use any npm module, therefore you may also install the ["request" module](https://www.npmjs.com/package/request) and use that directly instead.

### Cloud Modules

Native Cloud Code modules are not available in Parse Server, so you will need to use a replacement:

* **App Links**:
  Use the [applinks-metatag](https://github.com/parse-server-modules/applinks-metatag) module.

* **Buffer**:
  This is included natively with Node. Remove any `require('buffer')` calls.

* **Mailgun**:
  Use the official npm module: [mailgun-js](https://www.npmjs.com/package/mailgun-js).

* **Mandrill**:
  Use the official npm module, [mandrill-api](https://www.npmjs.com/package/mandrill-api).

* **Moment**:
  Use the official npm module, [moment](https://www.npmjs.com/package/moment).

* **Parse Image**:
  We recommend using another image manipulation library, like the [imagemagick wrapper module](https://www.npmjs.com/package/imagemagick). Alternatively, consider using a cloud-based image manipulation and management platform, such as [Cloudinary](https://www.npmjs.com/package/cloudinary).

* **SendGrid**:
  Use the official npm module, [sendgrid](https://www.npmjs.com/package/sendgrid).

* **Stripe**:
  Use the official npm module, [stripe](https://www.npmjs.com/package/stripe).

* **Twilio**:
  Use the official npm module, [twilio](https://www.npmjs.com/package/twilio).

* **Underscore**:
  Use the official npm module, [underscore](https://www.npmjs.com/package/underscore).

## Dashboard

Parse has provided a separate [Parse Dashboard project](http://blog.parse.com/announcements/introducing-the-parse-server-dashboard/) which can be used to manage all of your Parse Server applications.

### Parse Config

Parse Config is available in Parse Server and can be configured from your [Parse Dashboard](https://github.com/parse-community/parse-dashboard).

### Push Notification Console

You can now [send push notifications using Parse Dashboard](http://blog.parse.com/announcements/push-and-config-come-to-the-parse-dashboard/).

## Storing Files

Parse Files in hosted Parse applications were limited to 10 MB. The default storage layer in Parse Server, GridStore, can handle files up to 16 MB. To store larger files, we suggest using [Amazon's Simple Storage Service (S3)](#configuring-s3adapter).

## In-App Purchases

iOS in-app purchase verification through Parse is not supported.

## Jobs

There is no background job functionality in Parse Server. If you have scheduled jobs, port them over to a self-hosted solution using a wide variety of open source job queue projects. A popular one is [kue](https://github.com/Automattic/kue). Alternatively, if your jobs are simple, you could use a cron job.

## Parse IoT Devices

Push notification support for the Parse IoT SDKs is provided through the Parse Push Notification Service (PPNS). PPNS is a push notification service for Android and IoT devices maintained by Parse. This service will be retired on January 28, 2017. [This page](https://github.com/parse-community/parse-server/wiki/PPNS-Protocol-Specification) documents the PPNS protocol for users that wish to create their own PPNS-compatible server for use with their Parse IoT devices.

## Push Notifications Compatibility

### Client Push

Hosted Parse applications could disable a security setting in order to allow clients to send push notifications. Parse Server does not allow clients to send push notifications as the `masterKey` must be used. Use Cloud Code or the REST API to send push notifications.

## Schema

Schema validation is built in. Retrieving the schema via API is available.

## Session Features

Parse Server requires the use of [revocable sessions](http://blog.parse.com/announcements/announcing-new-enhanced-sessions/).

## Single app aware

Parse Server only supports single app instances. There is ongoing work to make Parse Server multi-app aware. However, if you intend to run many different apps with different datastores, you currently would need to instantiate separate instances.

## Social Login

Facebook, Twitter, and Anonymous logins are supported out of the box. Support for additional platforms may be configured via the [`oauth` configuration option](#oauth-and-3rd-party-authentication).

## Webhooks

[Cloud Code Webhooks](http://blog.parse.com/announcements/introducing-cloud-code-webhooks/) are not supported.

## Welcome Emails and Email Verification

Verifying user email addresses and enabling password reset via email requires an email adapter. As part of the `parse-server` package we provide an adapter for sending email through Mailgun. To use it, sign up for Mailgun, and add this to your initialization code:

```js
var server = ParseServer({
  ...otherOptions,
  // Enable email verification
  verifyUserEmails: true,

  // if `verifyUserEmails` is `true` and
  //     if `emailVerifyTokenValidityDuration` is `undefined` then
  //        email verify token never expires
  //     else
  //        email verify token expires after `emailVerifyTokenValidityDuration`
  //
  // `emailVerifyTokenValidityDuration` defaults to `undefined`
  //
  // email verify token below expires in 2 hours (= 2 * 60 * 60 == 7200 seconds)
  emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)

  // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
  // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
  preventLoginWithUnverifiedEmail: false, // defaults to false

  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  publicServerURL: 'https://example.com/parse',
  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: 'Parse App',
  // The email adapter
  emailAdapter: {
    module: '@parse/simple-mailgun-adapter',
    options: {
      // The address that your emails come from
      fromAddress: 'parse@example.com',
      // Your domain from mailgun.com
      domain: 'example.com',
      // Your API key from mailgun.com
      apiKey: 'key-mykey',
    }
  },

  // account lockout policy setting (OPTIONAL) - defaults to undefined
  // if the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`. After `duration` minutes of no login attempts, the application will allow the user to try login again.
  accountLockout: {
    duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
  },
  // optional settings to enforce password policies
  passwordPolicy: {
    // Two optional settings to enforce strong passwords. Either one or both can be specified. 
    // If both are specified, both checks must pass to accept the password
    // 1. a RegExp object or a regex string representing the pattern to enforce 
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
    // 2. a callback function to be invoked to validate the password  
    validatorCallback: (password) => { return validatePassword(password) }, 
    doNotAllowUsername: true, // optional setting to disallow username in passwords
    maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset. 
    maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
    //optional setting to set a validity duration for password reset links (in seconds)
    resetTokenValidityDuration: 24*60*60, // expire after 24 hours
  }
});
```

You can also use other email adapters contributed by the community such as:
- [parse-server-postmark-adapter](https://www.npmjs.com/package/parse-server-postmark-adapter)
- [parse-server-sendgrid-adapter](https://www.npmjs.com/package/parse-server-sendgrid-adapter)
- [parse-server-mandrill-adapter](https://www.npmjs.com/package/parse-server-mandrill-adapter)
- [parse-server-simple-ses-adapter](https://www.npmjs.com/package/parse-server-simple-ses-adapter)
- [parse-server-mailgun-adapter-template](https://www.npmjs.com/package/parse-server-mailgun-adapter-template)
- [parse-server-sendinblue-adapter](https://www.npmjs.com/package/parse-server-sendinblue-adapter)
- [parse-server-mailjet-adapter](https://www.npmjs.com/package/parse-server-mailjet-adapter)
- [simple-parse-smtp-adapter](https://www.npmjs.com/package/simple-parse-smtp-adapter)
- [parse-server-generic-email-adapter](https://www.npmjs.com/package/parse-server-generic-email-adapter)

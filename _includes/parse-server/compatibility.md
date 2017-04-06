# Compatibility with parse.com

There are a few areas where Parse Server does not provide compatibility with the original Parse.com hosted backend.

## Analytics

Parse Analytics is not supported. We recommend sending analytics to another similar service like Mixpanel or Google Analytics.

## Authentication

By default, only an application ID is needed to authenticate with Parse Server. The base configuration that comes with the one-click deploy options does not require authenticating with any other types of keys. Therefore, specifying client keys on Android or iOS is not needed.

## Client Class Creation

Hosted Parse applications can turn off client class creation in their settings. Automatic creation of classes by the client is always allowed in Parse Server.

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

### Class Level Permissions

Class-level permissions are supported in Parse Server, but they have always been configured using the dashboard on Parse.com. It is possible to modify these permissions without the dashboard. You'll see the format for class-level permissions in the SCHEMA collection when you migrate your database. There is also a `setPermissions` method on the `Schema` class, which you can see used in the unit-tests in `Schema.spec.js`.

### Parse Config

Parse Config is available in Parse Server and can be configured from your [Parse Dashboard](https://github.com/parse-community/parse-dashboard).

### Push Notification Console

You can now [send push notifications using Parse Dashboard](http://blog.parse.com/announcements/push-and-config-come-to-the-parse-dashboard/).

## Files

Parse Files in hosted Parse applications were limited to 10 MB. The default storage layer in Parse Server, GridStore, can handle files up to 16 MB. To store larger files, we suggest using [Amazon's Simple Storage Service (S3)](#configuring-S3Adapter).

## In-App Purchases

iOS in-app purchase verification through Parse is not supported.

## Jobs

There is no background job functionality in Parse Server. If you have scheduled jobs, port them over to a self-hosted solution using a wide variety of open source job queue projects. A popular one is [kue](https://github.com/Automattic/kue). Alternatively, if your jobs are simple, you could use a cron job.

## Push Notifications

Parse Server implements basic transactional pushes to iOS and Android devices using channels or queries. Check out the [Push Guide](#push-notifications) for the details.

### Client Push

Hosted Parse applications could disable a security setting in order to allow clients to send push notifications. Parse Server does not allow clients to send push notifications as the `masterKey` must be used. Use Cloud Code or the REST API to send push notifications.

### Android: Exporting GCM Registration IDs

Parse supports sending pushes to Android devices via Google Cloud Messaging (GCM). By default, the GCM registration IDs (stored in the `deviceToken` field) for your app are associated with Parse's GCM sender ID, which won't work after Parse is retired. You may want to take these actions to have your app register with a different GCM sender ID, which will make the registration IDs in the `deviceToken` field exportable to other push providers:

* Enable GCM for your Android project in the [Google Developer Console](https://console.developers.google.com). Take note of your project number (it should be a large integer like `123427208255`). This is also known as your GCM sender ID.
* Add the `com.parse.push.gcm_sender_id` metadata attribute to your app manifest so that Parse registers for push with your GCM sender ID. For instance, if your GCM sender ID is `123427208255`, then you should add a metadata attribute named `com.parse.push.gcm_sender_id` with the value `id:123427208255` (note that the "id:" prefix is required).  This attribute requires Android SDK 1.8.0 or higher. See our [Android push guide]({{ site.baseUrl }}/android/guide#push-notifications-setting-up-push) for more details on this attribute.
* Parse will now register for GCM with both its GCM sender ID and your GCM sender ID on app startup. You can use the resulting GCM registration IDs (stored in the `deviceToken` field of ParseInstallation) with other GCM push providers.

### Parse IoT Devices

Push notification support for the Parse IoT SDKs is provided through the Parse Push Notification Service (PPNS). PPNS is a push notification service for Android and IoT devices maintained by Parse. This service will be retired on January 28, 2017. [This page](https://github.com/parse-community/parse-server/wiki/PPNS-Protocol-Specification) documents the PPNS protocol for users that wish to create their own PPNS-compatible server for use with their Parse IoT devices.

## Schema

Schema validation is built in. Retrieving the schema via API is available.

## Session Features

Parse Server requires the use of [revocable sessions](http://blog.parse.com/announcements/announcing-new-enhanced-sessions/).

## Single app aware

Parse Server only supports single app instances. There is ongoing work to make Parse Server multi-app aware. However, if you intend to run many different apps with different datastores, you currently would need to instantiate separate instances.

## Social Login

Facebook, Twitter, and Anonymous logins are supported out of the box. Support for additional platforms may be configured via the [`oauth` configuration option](#oauth).

## Webhooks

[Cloud Code Webhooks](http://blog.parse.com/announcements/introducing-cloud-code-webhooks/) are not supported.

## Welcome Emails and Email Verification

This is not supported out of the box. But, you can use a `beforeSave` to send out emails using a provider like Mailgun and add logic for verification. [Subscribe to this issue](https://github.com/parse-community/parse-server/issues/275) to be notified if email verification support is added to Parse Server.

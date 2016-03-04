There are a few areas where Parse Server does not provide compatibility with the Parse hosted backend.

## Analytics

Parse Analytics is not supported. We recommend sending analytics to another similar service like Mixpanel or Google Analytics.

## Authentication

By default, only an application ID is needed to authenticate with Parse Server. The base configuration that comes with the one-click deploy options does not require authenticating with any other types of keys. Therefore, specifying client keys on Android or iOS is not needed.

## Client Class Creation

Hosted Parse applications can turn off client class creation in their settings. Automatic creation of classes by the client is always allowed in Parse Server.

## Cloud Code

There are two methods that are not directly supported in Cloud Code when using Parse Server:

* `Parse.User.current()`: Use `request.user` instead.
* `Parse.Cloud.useMasterKey()`: Pass `useMasterKey: true` as an option to each `Parse.Query`.

Parse Server also uses at least version [1.7.0](https://github.com/ParsePlatform/Parse-SDK-JS/releases) of the Parse SDK, which has some breaking changes from the previous versions. If your Parse.com Cloud Code uses a previous version of the SDK, you may need to update your cloud code.

To make queries and writes as a specific user within Cloud Code, you need to pass the user's `sessionToken` as an option. The session token for the authenticated user making the request is available in `request.user.getSessionToken()`.

## Config

Parse Config is not supported. You can create config variables in Node that can be changed and deployed. Or, it would be relatively straightforward to create a Node version of Parse Config with a dashboard to change these variables without a deployment.

## Dashboard

Parse has provided a separate [Parse Dashboard project](http://blog.parse.com/announcements/introducing-the-parse-server-dashboard/) which can be used to manage all of your Parse Server applications.

### Class Level Permissions

Class-level permissions are supported in Parse Server, but they have always been configured using the dashboard on Parse.com. It is possible to modify these permissions without the dashboard. You'll see the format for class-level permissions in the SCHEMA collection when you migrate your database. There is also a `setPermissions` method on the `Schema` class, which you can see used in the unit-tests in `Schema.spec.js`.

## Files

Parse Files in hosted Parse applications were limited to 10 MB. The default storage layer in Parse Server, GridStore, can handle files up to 16 MB. To store larger files, we suggest using [Amazon's Simple Storage Service (S3)](https://github.com/ParsePlatform/parse-server/wiki/Storing-Files-in-AWS-S3).

## In-App Purchases

iOS in-app purchase verification through Parse is not supported.

## Jobs

There is no background job functionality in Parse Server. If you have scheduled jobs, port them over to a self-hosted solution using a wide variety of open source job queue projects. A popular one is [kue](https://github.com/Automattic/kue). Alternatively, if your jobs are simple, you could use a cron job.

## Push Notifications

Parse Server implements basic transactional pushes to iOS and Android devices using channels or queries. Check out the [Push Guide](https://github.com/ParsePlatform/parse-server/wiki/Push) for the details.

### Client Push

Hosted Parse applications could disable a security setting in order to allow clients to send push notifications. Parse Server does not allow clients to send push notifications as the `masterKey` must be used. Use Cloud Code or the REST API to send push notifications.

### Push Dashboard

The Push dashboard in the hosted Parse service is mainly used to create push campaigns. Parse Server only supports transactional push. You can implement a similar feature as part of a separate admin-focused dashboard.

### Android: Exporting GCM Registration IDs

Parse supports sending pushes to Android devices via Google Cloud Messaging (GCM). By default, the GCM registration IDs (stored in the `deviceToken` field) for your app are associated with Parse's GCM sender ID, which won't work after Parse is retired. You may want to take these actions to have your app register with a different GCM sender ID, which will make the registration IDs in the `deviceToken` field exportable to other push providers:

* Enable GCM for your Android project in the [Google Developer Console](https://console.developers.google.com). Take note of your project number (it should be a large integer like `123427208255`). This is also known as your GCM sender ID.
* Add the `com.parse.push.gcm_sender_id` metadata attribute to your app manifest so that Parse registers for push with your GCM sender ID. For instance, if your GCM sender ID is `123427208255`, then you should add a metadata attribute named `com.parse.push.gcm_sender_id` with the value `id:123427208255` (note that the "id:" prefix is required).  This attribute requires Android SDK 1.8.0 or higher. See our [Android push guide](/docs/android/guide#push-notifications-setting-up-push) for more details on this attribute.
* Parse will now register for GCM with both its GCM sender ID and your GCM sender ID on app startup. You can use the resulting GCM registration IDs (stored in the `deviceToken` field of ParseInstallation) with other GCM push providers.

### Parse IoT Devices

Push notification support for the Parse IoT SDKs is provided through the Parse Push Notification Service (PPNS). PPNS is a push notification service for Android and IoT devices maintained by Parse. This service will be retired on January 28, 2017. [This page](https://github.com/ParsePlatform/parse-server/wiki/PPNS-Protocol-Specification) documents the PPNS protocol for users that wish to create their own PPNS-compatible server for use with their Parse IoT devices.

## Schema

Schema validation is built in. Retrieving the schema via API is available.

## Session Features

Parse Server requires the use of [revocable sessions](http://blog.parse.com/announcements/announcing-new-enhanced-sessions/). If your app is still using legacy sessions, follow this [migration guide](https://parse.com/tutorials/session-migration-tutorial).

Parse Server does not yet implement the option to expire inactive sessions and to revoke a session on password changes.

## Single app aware

Parse Server only supports single app instances. There is ongoing work to make Parse Server multi-app aware. However, if you intend to run many different apps with different datastores, you currently would need to instantiate separate instances.

## Social Login

Facebook, Twitter, and Anonymous logins are supported out of the box. Support for additional platforms may be configured via the [`oauth` configuration option](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#oauth).

## Webhooks

[Cloud Code Webhooks](http://blog.parse.com/announcements/introducing-cloud-code-webhooks/) are not supported.

## Welcome Emails and Email Verification

This is not supported out of the box. But, you can use a `beforeSave` to send out emails using a provider like Mailgun and add logic for verification. [Subscribe to this issue](https://github.com/ParsePlatform/parse-server/issues/275) to be notified if email verification support is added to Parse Server.

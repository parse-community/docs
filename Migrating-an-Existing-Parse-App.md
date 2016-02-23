**The Parse hosted service will be retired on January 28, 2017. If you are planning to migrate an app, you need to begin work as soon as possible.**

For most apps, the migration process is non-trivial, and will require dedicated development time. We recommend the following schedule:

* **April 28, 2016**: Data migrated to a self-hosted MongoDB (Step 1)
* **July 28, 2016**: Finish setting up your self-hosted Parse Server and release a new app pointing to it (Steps 2-12)

Following this schedule will give you time to develop your own Parse Server, as well as train your development team to maintain and scale the service. It will also give your users enough time to update to the new version of your app.

This migration guide assumes the use of Heroku and either MongoLab or ObjectRocket. These three services are easy to use, especially if you are new to deploying and managing your own backend stack. But, you can elect to use any infrastructure provider that supports Node.js environments.

After completion, you will have the following:

* Parse Server running on your computer, allowing you to develop locally.
* Parse Server running on Heroku.
* Your app’s data stored in MongoDB hosted on MongoLab or ObjectRocket.
* Your app’s client-side code updated to point to the Parse Server instance on Heroku, ready to be released.
* No dependency on api.parse.com for the new app client.

**We highly recommend that you first run through this guide with a development or test version of your app before working with a production app.**

Here is a visual overview of the migration steps. Follow the detailed instructions after the diagram to migrate your app.

![](https://parse.com/images/docs/server/migration.png)

## 1. Migrate Parse DB to Self-Hosted MongoDB

The first step is to migrate the data from your Parse hosted app to a self-hosted MongoDB. Set up a MongoDB instance that conforms to our [database specifications](#database). Due to data being compressed in the hosted Parse database, make sure to size your Mongo at least 10X the current amount of data storage you are using (you can find this information in your app's Analytics overview page).

Latency between the Parse hosted database and your self-hosted MongoDB should not exceed 20 ms. Both MongoLab and ObjectRocket provide the option to host your database in their datacenters in the US East geographic region. If you plan on hosting your production database in a different geographic region, you can do so after migrating your data to the self-hosted MongoDB in US East.

Once you have Mongo setup, take note of the Mongo connection URL. Use the database migration tool to transfer your data (found in the [new dashboard](https://dashboard.parse.com/apps) under *App Settings* &rarr; *General* &rarr; *Migrate to external database*). Ensure that the user in the connection string has [admin privileges](https://docs.mongodb.org/manual/tutorial/manage-users-and-roles/), as the migration tool will set some parameters automatically during the process.  

The tool first takes a snapshot of your existing data and transfers it to MongoDB. Next, it will pause to allow manual verification, while continuing to keep things in sync with writes that are coming in from your live app. While you are in this state, your app continues to read and write from your Parse hosted database.

Connect to your Mongo instance and browse through the collections in the newly created database. Check the collection counts and do a few spot checks to ensure that your data was migrated successfully.

Once you're satisfied, you can finalize the transfer in the migration UI and your app will be using the new MongoDB instance. At this point, your app is still hitting `api.parse.com`, but is using your MongoDB instance. You will need to administrate your database instance yourself, including maintaining indexes and scaling up.

Note that you can elect to skip migrating your data and test the functionality of your Parse Server hosted app with a blank database. You can always migrate your data later.

## 2. Set Up Local Parse Server

Follow the instructions in the [Parse Server Sample App](https://github.com/ParsePlatform/parse-server-example) and use the Mongo connection string from Step 1.

Go to the Security & Keys section of App Settings in your [Parse Dashboard](https://dashboard.parse.com) and take note of the File Key, Master Key, Client Key, JavaScript Key, and dotNETKey values. Pass that into the ParseServer constructor in `index.js`.

### Verification

Make sure saving an object and retrieving it via a query works:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore

curl -X GET \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-Master-Key: YOUR_APP_MASTER_KEY" \
  http://localhost:1337/parse/classes/GameScore
```

You now have a Parse Server running locally that is connected to the data in MongoDB from step 1.

## 3. Cloud Code

We will now migrate your existing Cloud Code to run in Parse Server. Copy your app’s Cloud Code to the parse-server/cloud directory, replacing the example main.js. You will need to replace any relative paths like ‘cloud/…’ to ‘./cloud’.

Native [Cloud Code modules](https://parse.com/docs/cloudcode/guide#cloud-code-modules) are not available in Parse Server, so you will need to use a replacement:

#### App Links

There is no direct replacement , but it is relatively easy to generate these tags yourself.

#### Buffer

This is included natively with Node. Remove any require('buffer') calls.

#### Mailgun

Use the official npm module: https://www.npmjs.com/package/mailgun-js

#### Mandrill

Use the official npm module: https://www.npmjs.com/package/mandrill-api

#### Moment

Use the official npm module: https://www.npmjs.com/package/moment

#### Parse Image

We recommend using another image manipulation library, like the [imagemagick wrapper module](https://www.npmjs.com/package/imagemagick). Alternatively, consider using a cloud-based image manipulation and management platform, such as [Cloudinary](https://www.npmjs.com/package/cloudinary).

#### SendGrid

Use the official npm module: https://www.npmjs.com/package/sendgrid

#### Stripe

Use the official npm module: https://www.npmjs.com/package/stripe

#### Twilio

Use the official npm module: https://www.npmjs.com/package/twilio

#### Underscore

Use the official npm module: https://www.npmjs.com/package/underscore

### Verification

Run Parse Server and make some calls to it to verify that your Cloud Code is running correctly. If you had tests setup for the Cloud Code in your Parse hosted backend, point them to your local Parse Server and run the test suite.

Because the Parse hosted Cloud Code isn’t running a full node environment, there may be subtle differences in how your Cloud Code runs in Parse Server. We recommend exercising all your critical code paths to ensure full functionality.

## 4. Hosting

If you are using Parse Hosting, you can migrate all these web endpoints to the same Express app that is serving Parse Server. For example, you could mount Parse Server under /parse and your website at the root, like so:

```js
var api = new ParseServer({ ... });
app.use('/parse', api);

// Web endpoints
app.get('/', homeController.index);
app.get('/about', aboutController.index);

// ...
```

## 5. App Settings

Go through your app settings panel and make sure to understand how these settings will be impacted by moving to Parse Server.

#### User Sessions

* Require revocable sessions - This is required by Parse Server.
* Expire inactive sessions - This is not yet available in Parse Server.
* Revoke session on password change - This is not yet available in Parse Server.

### User Authentication

* Enable new methods by default - This is hardcoded as true in Parse Server.
* Allow username and password-based authentication - This is currently not optional in Parse Server, username and password based accounts are always enabled.
* Allow anonymous users - This is currently not optional in Parse Server, anonymous users are always enabled.

### Social Login

* Allow FB auth - This is available in Parse Server if a Facebook App ID is configured.
* Add a Facebook app (list of apps) - The ability to restrict to one Facebook App is not available in Parse Server.

## 6. Point Client to Local Parse Server

Update your app with the latest version of the Parse SDK (at least version 1.12 for iOS, 1.13.0 for Android, 1.6.14 for JS, 1.7.0 for .NET), which will have the ability to change the server URL.

## 7. Checkpoint: Test Your App

Now, test your app locally. We recommend running a staging database using a snapshot of your production database, as there may be legacy data in your database that exercises code paths that wouldn't otherwise be exercised. Be very careful if your Parse Server is pointing to the same Mongo instance as your live app, as you could be mutating production data.

At this point, your app may be totally functional. Objects, queries, and users will work right out of the box.

## 8. Compatibility Issues

There are a few areas where Parse Server does not provide compatibility with the Parse hosted backend.

#### Analytics

This is not supported. We recommend sending analytics to another similar service like Mixpanel or Google Analytics.

#### Client Class Creation

Automatic creation of classes by the client is always allowed in Parse Server.

#### Cloud Code

There are two methods that are not directly supported in Cloud Code when using Parse Server:

* `Parse.User.current()`: Use `request.user` instead.
* `Parse.Cloud.useMasterKey()`: Pass `useMasterKey: true` as an option to each `Parse.Query`.

To make queries and writes as a specific user within Cloud Code, you need to pass the user's `sessionToken` as an option. The session token for the authenticated user making the request is available in `request.user.getSessionToken()`.

#### Config

This is not supported. You can create config variables in Node that can be changed and deployed. Or, it would be relatively straightforward to create a Node version of Parse Config with a dashboard to change these variables without a deployment.

#### Dashboard

Parse Server does not currently provide a self-hosted dashboard out of the box. It is possible to write your own dashboard using the JavaScript SDK and host it yourself, or, you can manage the data directly in Mongo. [You may subscribe to this issue](https://github.com/ParsePlatform/Parse-Server/issues/3) to be notified when a dashboard is added to Parse Server.

It is possible to keep using the Parse hosted dashboard, since it will be pointing to the same data in Mongo. However, you should not consider this a long term solution, as the hosted Parse state may diverge and mutate data in unpredictable ways (for example: if your Cloud Code gets out of sync with the Cloud Code in your Parse Server).

##### Class Level Permissions

Class-level permissions are supported in Parse Server, but they have always been configured using the dashboard on Parse.com. It is possible to modify these permissions without the dashboard. You'll see the format for class-level permissions in the SCHEMA collection when you migrate your database. There is also a `setPermissions` method on the `Schema` class, which you can see used in the unit-tests in `Schema.spec.js`.

#### In-App Purchases

iOS in-app purchase verification is not supported.

#### Jobs

There is no background job functionality in Parse Server. If you have scheduled jobs, port them over to a self-hosted solution using a wide variety of open source job queue projects. A popular one is [kue](https://github.com/Automattic/kue). Alternatively, if your jobs are simple, you could use a cron job.

#### Push Notifications

Parse Server implements basic transactional pushes to iOS and Android devices using channels or queries. Check out the [Push Guide](https://github.com/ParsePlatform/parse-server/wiki/Push) for the details.

##### Exporting GCM Registration IDs

Parse supports sending pushes to Android devices via Google Cloud Messaging (GCM). By default, the GCM registration IDs (stored in the `deviceToken` field) for your app are associated with Parse's GCM sender ID, which won't work after Parse is retired. You may want to take these actions to have your app register with a different GCM sender ID, which will make the registration IDs in the `deviceToken` field exportable to other push providers:

* Enable GCM for your Android project in the [Google Developer Console](https://console.developers.google.com). Take note of your project number (it should be a large integer like `123427208255`). This is also known as your GCM sender ID.
* Add the `com.parse.push.gcm_sender_id` metadata attribute to your app manifest so that Parse registers for push with your GCM sender ID. For instance, if your GCM sender ID is `123427208255`, then you should add a metadata attribute named `com.parse.push.gcm_sender_id` with the value `id:123427208255` (note that the "id:" prefix is required).  This attribute requires Android SDK 1.8.0 or higher. See our [Android push guide](/docs/android/guide#push-notifications-setting-up-push) for more details on this attribute.
* Parse will now register for GCM with both its GCM sender ID and your GCM sender ID on app startup. You can use the resulting GCM registration IDs (stored in the `deviceToken` field of ParseInstallation) with other GCM push providers.

##### Parse IoT Devices

Push notification support for the Parse IoT SDKs is provided through the Parse Push Notification Service (PPNS). PPNS is a push notification service for Android and IoT devices maintained by Parse. This service will be retired on January 28, 2017. [This page](https://github.com/ParsePlatform/parse-server/wiki/PPNS-Protocol-Specification) documents the PPNS protocol for users that wish to create their own PPNS-compatible server for use with their Parse IoT devices.

#### Schema

Schema validation is built in. Retrieving the schema via API is available.

#### Session Features

Parse Server requires the use of [revocable sessions](http://blog.parse.com/announcements/announcing-new-enhanced-sessions/). If your app is still using legacy sessions, follow this [migration guide](https://parse.com/tutorials/session-migration-tutorial).

Parse Server does not yet implement the option to expire inactive sessions and to revoke a session on password changes.

#### Social Login

Facebook, Twitter, and Anonymous logins are supported out of the box. Additional support may be configured via the `oauth` option

#### Webhooks

This is not supported.

#### Welcome Emails and Email Verification

This is not supported out of the box. But, you can use a `beforeSave` to send out emails using a provider like Mailgun and add logic for verification. [Subscribe to this issue](https://github.com/ParsePlatform/parse-server/issues/275) to be notified if email verification support is added to Parse Server.

## 9. Set Up Parse Server on Heroku

Follow the instructions for [deploying the server to Heroku](#deploying).

## 10. Point Client to Heroku Parse Server

Now, update your client to point to the location of the API that you deployed on Heroku.

## 11. Checkpoint: Test Your App

Test your app now that it uses the Heroku backend.

## 12. Publish Your App

You can now publish the new app, which will utilize your new backend. You should encourage users to update to the new version of your app. On January 28, 2017, any calls to the hosted Parse backend service will cease to function.

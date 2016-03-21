**The Parse hosted service will be retired on January 28, 2017. If you are planning to migrate an app, you need to begin work as soon as possible.**

For most apps, the migration process is non-trivial, and will require dedicated development time. We recommend the following schedule:

* **April 28, 2016**: Data migrated to a self-hosted MongoDB (Step 1)
* **July 28, 2016**: Finish setting up your self-hosted Parse Server and release a new app pointing to it (Steps 2-12)

Following this schedule will give you time to develop your own Parse Server, as well as train your development team to maintain and scale the service. It will also give your users enough time to update to the new version of your app.

Migrating the database can be done right away, and you can continue using the Parse.com dashboard to manage your app while you work on migrating your app to Parse Server.

**If you haven't migrated your database by April 28, we will assume your app is low priority, and we will de-prioritize its traffic to focus on production apps.**

This migration guide assumes the use of Heroku and either [mLab](http://docs.mlab.com/migrating-from-parse/) or [ObjectRocket](https://objectrocket.com/parse). These three services are easy to use, especially if you are new to deploying and managing your own backend stack. But, you can elect to use [any infrastructure provider](https://github.com/ParsePlatform/parse-server/wiki#community-links) that supports Node.js environments.

After completion, you will have the following:

* Parse Server running on your computer, allowing you to develop locally.
* Parse Server running on Heroku or another infrastructure provider.
* Your app’s data stored in MongoDB hosted on mLab or ObjectRocket.
* Your app’s client-side code updated to point to the Parse Server instance on Heroku, ready to be released.
* No dependency on api.parse.com for the new app client.

**We highly recommend that you first run through this guide with a development or test version of your app before working with a production app.**

There are a few areas where Parse Server does not provide compatibility with the Parse hosted backend. Carefully read through the list of [compatibility issues with hosted Parse](https://github.com/ParsePlatform/parse-server/wiki/Compatibility-with-Hosted-Parse) before proceeding.

# Visual Overview

Here is a visual overview of the migration steps. Follow the detailed instructions after the diagram to migrate your app.

![](https://parse.com/images/docs/server/migration.png)

# Migrating your Parse database

The first step is to migrate the data from your Parse hosted app to a self-hosted MongoDB. After this is done, your clients will continue talking to `api.parse.com`, and you may manage your app using the hosted Parse Dashboard.

## 1. Migrate Parse DB to Self-Hosted MongoDB

Set up a MongoDB instance that conforms to our [database specifications](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#database). If this is your first time setting up a production MongoDB instance, we recommend using either mLab or ObjectRocket. These are database-as-a-service companies which provide fully managed MongoDB instances, and can help you scale up as needed.

* **Make sure to size your Mongo at least 10x.** Due to data being compressed in the hosted Parse database, make sure to size your Mongo at least 10X the current amount of data storage you are using (you can find this information in your hosted Parse app's Analytics overview page).

* **Set failIndexKeyTooLong=false.** You can configure it back to `true` after the migration is completed. ([Why?](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#why-do-i-need-to-set-failindexkeytoolongfalse))

* **Latency between Parse and your self-hosted MongoDB should not exceed 20ms.** We recommend choosing either [mLab](http://docs.mLab.com/migrating-from-parse/) or [ObjectRocket](https://objectrocket.com/parse) for your hosted MongoDB as they both have datacenters in the US East geographic region.

If you plan on hosting your production database in a different geographic region, you can do so after first migrating your data out of Parse and into the self-hosted MongoDB in US East. You should also plan to host your Parse Server in the same geographic region to minimize latency.

Once you have Mongo set up, take note of the Mongo connection URL. Use the database migration tool to transfer your data (found in the [new Parse.com Dashboard](https://dashboard.parse.com/apps) under *App Settings* &rarr; *General* &rarr; *Migrate to external database*). Ensure that the user in the connection string has [admin privileges](https://docs.mongodb.org/manual/tutorial/manage-users-and-roles/), as the migration tool will set some parameters automatically during the process.

### Error Message
* **The destination database was not empty.** The database you are migrating to is not empty. Please clean up and retry.
* **The destination database was too small.** The database you are migrating to is too small to hold all of your data. Add more space to your host or buy more space if you are using db service such as mLab or ObjectRocket.
* **This migration was cancelled. You can try again from the app settings page.** The job was cancelled manually by the user.
* **This migration was not finalized in time.** When a migration job is ready to be finalized, we will keep the db sync for 24 hours. If user doesn't take action to finalize the job within 24 hours, the job will be cancelled automatically.
* **The mongo user provided is not authorized to do migration.** The user in the connection string doesn't have the necessary access to complete the migration. 
* **You must set failIndexKeyTooLong option.** You need to set the failIndexKeyTooLong setting of your mongo server to false.([Why?](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#why-do-i-need-to-set-failindexkeytoolongfalse))
* **The job failed too many times and reached the max retry limit.** The job failed several times and we gave up trying. One possible reason can be your hardware cannot handle the migration load. If you have large collections (containing more than 1 million objects), please consider upgrading your host hardware. During the migration the system throughput is much higher than normal, so it requires better hardware. You can resize your host after the migration is done

### What happens next?
![Database Migration Phases](https://github.com/ParsePlatform/parse-server/blob/master/.github/MigrationPhases.png?raw=true)

* **Copy Snapshot** The database migration tool first takes a snapshot of your existing data and transfers it to your Mongo database.
* **Sync** Next, it will pause to allow manual verification, while continuing to keep things in sync with writes that are coming in from your live app. While you are in this state, your app continues to read and write from your Parse hosted database.
* **Verify** Connect to your Mongo instance and browse through the collections in the newly created database. Check the collection counts and do a few spot checks to ensure that your data was migrated successfully.

You may stop the migration and try again as many times as you need (until you click on _Finalize_). The tool will keep things in sync for up to 24 hours after the migration started. Once you're satisfied with the database migration, you can finalize the transfer in the migration UI and your app will be using the new MongoDB instance.

 At this point, your app is still hitting `api.parse.com`, but is using your MongoDB instance. You will need to administrate your database instance yourself, including maintaining indexes and scaling up.

Note that you can elect to skip migrating your data and test the functionality of your Parse Server hosted app with a blank database. You can always migrate your data later.

# Setting up Parse Server

## 2. Set Up Local Parse Server

Follow the instructions in the [Parse Server Sample App](https://github.com/ParsePlatform/parse-server-example) and use the Mongo connection string from Step 1.

Go to the Security & Keys section of App Settings in your [Parse.com Dashboard](https://dashboard.parse.com) and take note of the File Key, Master Key, Client Key, JavaScript Key, and dotNETKey values. Pass that into the ParseServer constructor in `index.js`.

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

## 5. Files

When using Parse Server, any new file you create will be saved on [the data store you select through the files adapter](http://blog.parse.com/announcements/hosting-files-on-parse-server/) (MongoDB, S3, ...). However, when you migrate your application to your own MongoDB instance, your existing files are still in Parse's hosted service. As long as you specify the correct `fileKey`, Parse Server knows exactly how to access them, so they will keep working just fine.

Parse's S3 bucket will be turned down on January 28th, 2017, which means those files will need to be migrated before that date. We have [a plan](https://github.com/ParsePlatform/parse-server/wiki/Files-Migration) and we're currently working on a set of tooling to help you migrate all the existing files referenced by your application to your own backing store. Stay tuned!

## 6. App Settings

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

## 7. Point Client to Local Parse Server

Update your app with the latest version of the Parse SDK (at least version 1.12 for iOS, 1.13.0 for Android, 1.6.14 for JS, 1.7.0 for .NET), which [have the ability to change the server URL](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#using-parse-sdks-with-parse-server).

## 8. Checkpoint: Test Your App

Now, test your app locally. We recommend running a staging database using a snapshot of your production database, as there may be legacy data in your database that exercises code paths that wouldn't otherwise be exercised. Be very careful if your Parse Server is pointing to the same Mongo instance as your live app, as you could be mutating production data.

At this point, your app may be totally functional. Objects, queries, and users will work right out of the box.

# Deploying Parse Server

## 9. Set Up Parse Server on Heroku or another infrastructure provider.

Follow the instructions for [deploying the server to Heroku](https://github.com/ParsePlatform/parse-server/wiki/Deploying-Parse-Server#deploying-to-heroku-and-mLab), [NodeChef](https://nodechef.com/blog/post/6/migrate-from-parse-to-nodechef%E2%80%99s-managed-parse-server), [AWS](http://mobile.awsblog.com/post/TxCD57GZLM2JR/How-to-set-up-Parse-Server-on-AWS-using-AWS-Elastic-Beanstalk), [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-run-parse-server-on-ubuntu-14-04), [Google Cloud Platform](https://cloud.google.com/nodejs/resources/frameworks/parse-server), [Azure](https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/), or [any other infrastucture provider](https://github.com/ParsePlatform/parse-server/wiki#community-links).

## 10. Point Client to Parse Server

Now, update your client to point to the location of the API that you just deployed.

## 11. Checkpoint: Test Your App

Test your app now that it uses the Parse Server backend.

## 12. Publish Your App

You can now publish the new app, which will utilize your new backend. You should encourage users to update to the new version of your app. On January 28, 2017, any calls to the hosted Parse backend service (api.parse.com) will cease to function.

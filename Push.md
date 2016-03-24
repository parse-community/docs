# Push Overview

Parse Server provides basic push notification functionality for iOS and Android. With this feature, you can:

* Target installations by platform
* Target installations by a `ParseQuery`
* Send push notifications to Android devices through [Google Cloud Messaging (GCM)](https://developers.google.com/cloud-messaging/)
* Send push notifications to iOS devices through [Apple Push Notification Service (APNS)](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html)
* Use most of the sending options

However, there are a few caveats:

* Does not support super high throughput since it does not employ a job queue system
* Client push is not supported. You can only use `masterKey` to send push notifications
* Delivery reports are not supported
* Scheduled push is not supported

# API
We support most of the sending options similar to the hosted Parse.com service. Check the detailed doc [here](https://parse.com/docs/rest/guide#push-notifications-sending-options). Parse Server supports the following:

* `channels` to target installations by channels
* `where` to target installations by `ParseQuery`
* `alert` under `data` for notification message
*  number `badge` under `data` for iOS badge number
* `sound` under `data` for iOS sound
* `content-available` under `data` for iOS background job
* `category` under `data` for iOS category
* `title ` under `data` for Android notification title
* `uri ` under `data` for Android notification launched URI
* custom data under `data` for ios and Android

Here is the list of sending options we do not support yet:
* `push_time` for scheduled push
*  Increment `badge` under `data` for iOS badge number


# Quick Start

## 1. Prepare APNS and GCM Credentials

  You will need to obtain some credentials from GCM and APNS in order to send push notifications to iOS and Android devices.

### APNS (iOS)

  If you are setting up push notifications on iOS for the first time, follow the [Parse Push Notifications tutorial](https://github.com/ParsePlatform/PushTutorial/blob/master/iOS/README.md#1-creating-the-ssl-certificate) to obtain a production Apple Push Certificate.  Parse has always guided users to export a PFX (`.p12`) file from Keychain Access, and we support that format in Parse Server as well.  Optionally, the module supports accepting the push certificate and key in `.pem` format.

### GCM (Android)

  To get your GCM sender ID, enable GCM for your Android project in the [Google Developer Console](https://console.developers.google.com). Take note of your project number. It should be a large integer like 123427208255. This project number is your GCM sender ID.

  To get your GCM API key, go to the [Google developer credentials](https://console.developers.google.com/apis/credentials) page, and either create a new API key or reuse an existing one.

  By default, the hosted Parse service (parse.com) sends pushes to your Android app with its own GCM sender ID. With your Parse Server, this setup will no longer work. Instead, your Parse Server will send GCM pushes with its own GCM sender ID and API key.  You should register a GCM sender ID and update your app as soon as possible.  Until users update, you can continue sending push notifications through Parse.com.

## 2. Configure Parse Server

  When initializing Parse Server, you should pass an additional push configuration. For example
  ```js
  var server = new ParseServer({
    databaseURI: '...',
    cloud: '...',
    appId: '...',
    masterKey: '...',
    push: {
      android: {
        senderId: '...',
        apiKey: '...'
      },
      ios: {
        pfx: '/file/path/to/XXX.p12',
        bundleId: '',
        production: false
      }
    }
  });
  ```
  The configuration format is
  ```js
  push: {
    android: {
      senderId: '', // The Sender ID of GCM
      apiKey: '' // The Server API Key of GCM
    },
    ios: {
      pfx: '', // The filename of private key and certificate in PFX or PKCS12 format from disk  
      cert: '', // If not using the .p12 format, the path to the certificate PEM to load from disk
      key: '', // If not using the .p12 format, the path to the private key PEM to load from disk
      bundleId: '', // The bundle identifier associate with your app
      production: false // Specifies which environment to connect to: Production (if true) or Sandbox
    }
  }
  ```
  For iOS, if you need to support both the dev and prod certificates, you can provide an array of configurations like
  ```js
  push: {
    ios: [
      {
        pfx: '', // Dev PFX or P12
        bundleId: '',
        production: false // Dev
      },
      {
        pfx: '', // Prod PFX or P12
        bundleId: '',  
        production: true // Prod
      }
    ]
  }
  ```

  If you have a list of certificates, Parse Server's strategy on choosing them is trying to match `installations`' `appIdentifier` with `bundleId` first. If it can find some valid certificates, it will use those certificates to establish the connection to APNS and send notifications. If it can not find, it will try to send the notifications with all certificates. Prod certificates first, then dev certificates.

### 3. Configure Client Apps

Configure an app which connects to Parse Server. We have provided a detailed [list of steps for iOS and Android clients](https://github.com/ParsePlatform/Parse-Server/wiki/Push-Configuring-Clients).

### 4. Send Push Notifications

Currently Parse Server only supports sending push notifications by your `masterKey`. The easiest way to do that is to curl:

```curl
  curl -X POST \
    -H "X-Parse-Application-Id: you_app_id" \
    -H "X-Parse-Master-Key: your_master_key" \
    -H "Content-Type: application/json" \
    -d '{
          "where": {
            "deviceType": {
              "$in": [
                "ios",
                "android"
              ]
            }
          },
          "data": {
            "title": "The Shining",
            "alert": "All work and no play makes Jack a dull boy."
          }
        }'\   http://your_server_address/parse/push
  ```

Push notifications can also be sent from cloud code:

```js
Parse.Push.send({
  where: { ... },
  data: { ... }
}, { useMasterKey: true });
```

After sending this to your Parse Server, you should see the push notifications show up on your devices.

**Note:** The iOS simulator cannot receive push notifications. You must run iOS apps on an iOS device.

In your Parse Server logs, you can see something similar to

```json
GCM request and response {"request":{"params":{"priority":"normal","data":{"time":"2016-02-10T03:21:59.065Z","push_id":"NTDgWw7kp8","data":"{\"alert\":\"All work and no play makes Jack a dull boy.\"}"}}},"response":{"multicast_id":5318039027588186000,"success":1,"failure":0,"canonical_ids":0,"results":[{"registration_id":"APA91bEdLpZnXT76vpkvkD7uWXEAgfrZgkiH_ybkzXqhaNcRw1KHOY0s9GUKNgneGxe2PqJ5Swk1-Vf852kpHAP0Mhoj5wd1MVXpRsRr_3KTQo_dkNd_5wcQ__yWnWLxbeM3kg_JziJK","message_id":"0:1455074519347821%df0f8ea7f9fd7ecd"}]}}
```

```json
APNS Connected
APNS Notification transmitted to:7a7d2864598e1f65e6e02135245b7daf8ea510514e6376f072dc29d53facaa41
```

These logs mean that the GCM and APNS connections are working.

# Push Adapter

Parse Server provides a  `PushAdapter` which abstracts the way we actually send push notifications. The default implementation is `ParsePushAdapter`, which uses GCM for Android push and APNS for iOS push. However, if you want to use other push providers, you can implement your own `PushAdapter`. Your adapter needs to implement `send(data, installations)`, which is used for sending data to the installations. You can use `ParsePushAdapter` as a reference. After you implement your `PushAdapter`, you can pass that instance to Parse Server like this

```js
var server = new ParseServer({
  databaseURI: '...',
  cloud: '...',
  appId: '...',
  masterKey: '...',
  push: {
    adapter: your_adapter
  }
});
```

By doing this, after Parse Server decodes the push API request and runs the installation query, your `PushAdapter`'s `send(data, installations)` will be called and is responsible for sending the notifications. If you provide your custom `PushAdapter`, the default `ParsePushAdapter` will be ignored.

Currently included in Parse Server is a One Signal push adapter. If you wish to use One Signal for push, configure your server like this:

```
var OneSignalPushAdapter = require('parse-server/lib/Adapters/Push/OneSignalPushAdapter');
var oneSignalPushAdapter = new OneSignalPushAdapter({
  oneSignalAppId:"your-one-signal-app-id",
  oneSignalApiKey:"your-one-signal-api-key"
});

var api = new ParseServer({
  push: {
    adapter: oneSignalPushAdapter
  },
  ...otherOptions
});
```

# Future Improvements

The current solution provides a good starting point for push notifications. We have a lot of ideas to improve the feature:
* Support more platforms
* Support more sending options
* Support more push providers
* Support scheduled pushes
* Support delivery report and error handling
* Support job queue and benchmarking

If you're interested in any of these features, don't hesitate to jump in and send a PR to the repo. We would love to work with you!

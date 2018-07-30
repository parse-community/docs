#### FCM Push Setup

Add this in your root `build.gradle` file (**not** your module `build.gradle` file):

```gradle
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
```

Then, add the library to your project `build.gradle`
```gradle
dependencies {
    implementation "com.github.parse-community.Parse-SDK-Android:fcm:latest.version.here"
}
```
with the latest version being [![](https://jitpack.io/v/parse-community/Parse-SDK-Android.svg)](https://jitpack.io/#parse-community/Parse-SDK-Android)

Then, follow Google's docs for [setting up an Firebase app](https://firebase.google.com/docs/android/setup). Although the steps are different for setting up FCM with Parse, it is also a good idea to read over the [Firebase FCM Setup](https://firebase.google.com/docs/cloud-messaging/android/client).  You will need to do the following:
  - Add app to [Firebase console](https://console.firebase.google.com/).
  - Add the `com.google.gms.google-services` Gradle plugin (see [setup guide](https://firebase.google.com/docs/android/setup))
  - Download and add [google-services.json](https://support.google.com/firebase/answer/7015592) to your `app/` dir.   
  - Remove `GcmBroadcastReceiver`, `PushService`, `com.parse.push.gcm_sender_id` if upgrading from GCM.
  - Added ParseFirebaseInstanceIdService and ParseFirebaseMessagingService to your AndroidManifest.xml file (as shown below):

You will need to register some services in your manifest, specifically:
```xml
<service
    android:name="com.parse.fcm.ParseFirebaseInstanceIdService"
    android:exported="true">
    <intent-filter>
        <action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
    </intent-filter>
</service>
```
Additional, you will register:
```xml
<service
    android:name="com.parse.fcm.ParseFirebaseMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter>
</service>
```
After these services are registered in the Manifest, you then need to register the push broadcast receiver:
```xml
<receiver
    android:name="com.parse.ParsePushBroadcastReceiver"
    android:exported="false">
    <intent-filter>
        <action android:name="com.parse.push.intent.RECEIVE" />
        <action android:name="com.parse.push.intent.DELETE" />
        <action android:name="com.parse.push.intent.OPEN" />
    </intent-filter>
</receiver>
```

## Custom Notifications
If you need to customize the notification that is sent out from a push, you can do so by extending `ParsePushBroadcastReceiver` with your own class and registering it instead in the Manifest.

#### Register Device for Push Notifications

Create an `Installation` object by adding the following to the `onCreate` method of your `Application` class:

```java
// Native: Application.java
public void onCreate() {
  // ...
  ParseInstallation.getCurrentInstallation().saveInBackground();
}
```

```csharp
// Xamarin: Application.cs

// IMPORTANT: Change "parsexamarinpushsample" to match your namespace.
[Application(Name = "parsexamarinpushsample.ParseApplication")]
class ParseApplication : Application {
  // ...

  public override void OnCreate() {
    base.OnCreate();

    // ...

    ParsePush.ParsePushNotificationReceived += ParsePush.DefaultParsePushNotificationReceivedHandler;
  }
}
```

##### Compile and run!

If you configured your app correctly, installation objects will automatically be saved to Parse Server when you run your app. You can run this curl command to verify:

```curl
curl -X GET \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \
  http://your_parse_server:1337/parse/installations
```

##### Proceed to [Step 4](http://docs.parseplatform.org/parse-server/guide/#4-send-push-notifications).

Note that GCM push support is [deprecated](https://android-developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html) and FCM should be used instead, but instructions for GCM setup can be found [here](https://github.com/parse-community/Parse-SDK-Android/tree/master/gcm)

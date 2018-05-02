#### FCM Push Setup

Add dependency to the application level `build.gradle` file.

```groovy
dependencies {
    implementation 'com.parse:parse-android-fcm:latest.version.here'
}
```
Then, follow Google's docs for [setting up an Firebase app](https://firebase.google.com/docs/android/setup). Although the steps are different for setting up FCM with Parse, it is also a good idea to read over the [Firebase FCM Setup](https://firebase.google.com/docs/cloud-messaging/android/client).

You will then need to register some services in your manifest, specifically:
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

## Configuring your clients to receive Push Notifications

The following will guide you through the necessary steps to configure your [iOS](##ios-apps) and [Android](#android-apps) client apps to receive push notifications from Parse Server. If you haven't yet, you will first need to prepare your APNS and GCM credentials as documented in [Step 1](#prepare-apns-and-gcm-credentials) of the Push Notifications Quick Start.

### iOS Apps

First you will need to set up your app to use Parse Server. Go through the [Parse iOS QuickStart](https://parse.com/apps/quickstart##parse_data/mobile/ios) first and come back here once your app is connected to Parse Server.

#### Register Device for Push Notifications

Open up your `AppDelegate.swift`, `AppDelegate.m`, or `AppDelegate.cs` file and make your app register for remote notifications by adding the following in your `application:didFinishLaunchingWithOptions:` function:

```swift
// Swift
let types: UIUserNotificationType = [.Alert, .Badge, .Sound]
let settings = UIUserNotificationSettings(forTypes: types, categories: nil)
application.registerUserNotificationSettings(settings)
application.registerForRemoteNotifications()
```

```objc
// Objective-C
UIUserNotificationType userNotificationTypes = (UIUserNotificationTypeAlert |
                                                UIUserNotificationTypeBadge |
                                                UIUserNotificationTypeSound);
UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:userNotificationTypes
                                                                         categories:nil];
[application registerUserNotificationSettings:settings];
[application registerForRemoteNotifications];
```

```csharp
// Xamarin
UIUserNotificationType notificationTypes = (UIUserNotificationType.Alert |
                                            UIUserNotificationType.Badge |
                                            UIUserNotificationType.Sound);
var settings = UIUserNotificationSettings.GetSettingsForTypes(notificationTypes,
                                                              new NSSet(new string[] { }));
UIApplication.SharedApplication.RegisterUserNotificationSettings(settings);
UIApplication.SharedApplication.RegisterForRemoteNotifications();

// Handle Push Notifications
ParsePush.ParsePushNotificationReceived += (object sender, ParsePushNotificationEventArgs args) => {
  // Process Push Notification payload here.
};
```

Store the device token and handle the UI for notifications by adding the following to your main app delegate:

```swift
// Swift
func application(application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
    let installation = PFInstallation.currentInstallation()
    installation.setDeviceTokenFromData(deviceToken)
    installation.saveInBackground()
}

func application(application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: NSError) {
    if error.code == 3010 {
        print("Push notifications are not supported in the iOS Simulator.")
    } else {
        print("application:didFailToRegisterForRemoteNotificationsWithError: %@", error)
    }
}

func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
    PFPush.handlePush(userInfo)
}
```

```objc
// Objective-C
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  // Store the deviceToken in the current installation and save it to Parse.
  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
  [currentInstallation setDeviceTokenFromData:deviceToken];
  [currentInstallation saveInBackground];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [PFPush handlePush:userInfo];
}
```

```csharp
// Xamarin
public override void DidRegisterUserNotificationSettings(UIApplication application,
    UIUserNotificationSettings notificationSettings) {
  application.RegisterForRemoteNotifications();
}

public override void RegisteredForRemoteNotifications(UIApplication application,
    NSData deviceToken) {
  ParseInstallation installation = ParseInstallation.CurrentInstallation;
  installation.SetDeviceTokenFromData(deviceToken);

  installation.SaveAsync();
}

public override void ReceivedRemoteNotification(UIApplication application,
    NSDictionary userInfo) {
  // We need this to fire userInfo into ParsePushNotificationReceived.
  ParsePush.HandlePush(userInfo);
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

##### Proceed to [Step 4](https://github.com/parse-community/parse-server/wiki/Push#4-send-push-notifications).

### Android apps

First you will need to set up your app to use Parse Server. Go through the [Parse Android QuickStart](https://parse.com/apps/quickstart##parse_data/mobile/android) first and come back here once your app is connected to Parse Server.

#### Configure Broadcast Receiver and Permissions

Add the following service and broadcast receiver definitions to `AndroidManifest.xml` immediately before the *closing* `</application>` tag:

```xml
<service android:name="com.parse.PushService" />
<receiver android:name="com.parse.ParsePushBroadcastReceiver"
android:exported="false">
<intent-filter>
<action android:name="com.parse.push.intent.RECEIVE" />
<action android:name="com.parse.push.intent.DELETE" />
<action android:name="com.parse.push.intent.OPEN" />
</intent-filter>
</receiver>
<receiver android:name="com.parse.GcmBroadcastReceiver"
android:permission="com.google.android.c2dm.permission.SEND">
<intent-filter>
<action android:name="com.google.android.c2dm.intent.RECEIVE" />
<action android:name="com.google.android.c2dm.intent.REGISTRATION" />

<!--
IMPORTANT: Change "com.parse.starter" to match your app's package name.
-->
<category android:name="com.parse.starter" />
</intent-filter>
</receiver>

<!--
IMPORTANT: Change "YOUR_SENDER_ID" to your GCM Sender Id.
-->
<meta-data android:name="com.parse.push.gcm_sender_id"
  android:value="id:YOUR_SENDER_ID" />;
```

Change the `android:name` attribute of `<category>` element above to match your application's package name.

Change "YOUR_SENDER_ID" to the GCM Sender Id you obtained back in Step 1. See our [Android push guide](/docs/android/guide#push-notifications-setting-up-push) for more details on this attribute.

**Migrating a hosted Parse app?** Note that you cannot send GCM pushes to old versions of your app that do not contain the `com.parse.push.gcm_sender_id` attribute in your app manifest, since those versions of the app haven't registered for push using your GCM sender ID.

Also add the permissions below, typically immediately before the *opening* `<application>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<!--
GET_ACCOUNTS is only required for GCM on devices running Android lower than
4.0.4. You may leave out this permission if you are targetting 4.0.4+.
-->
<uses-permission android:name="android.permission.GET_ACCOUNTS" />

<!--
IMPORTANT: Change "com.parse.starter.permission.C2D_MESSAGE" in the lines below
to match your app's package name + ".permission.C2D_MESSAGE".
-->
<permission android:protectionLevel="signature"
  android:name="com.parse.starter.permission.C2D_MESSAGE" />
<uses-permission android:name="com.parse.starter.permission.C2D_MESSAGE" />
```

Change the `android:name` attribute in the last two lines of the snippet above to match your application's package name.

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

##### Proceed to [Step 4](https://github.com/parse-community/parse-server/wiki/Push#4-send-push-notifications).

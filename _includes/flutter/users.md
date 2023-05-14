# Users

You can create and control users just as normal using this SDK.

To register a user, first create one :
```dart
var user =  ParseUser().create("TestFlutter", "TestPassword123", "TestFlutterSDK@gmail.com");
```
Then have the user sign up:

```dart
var response = await user.signUp();
if (response.success) user = response.result;
```
You can also login with the user:
```dart
var response = await user.login();
if (response.success) user = response.result;
```
You can also logout with the user:
```dart
var response = await user.logout();
if (response.success) {
    print('User logout');
}
```
Also, once logged in you can manage sessions tokens. This feature can be called after Parse().init() on startup to check for a logged in user.
```dart
user = ParseUser.currentUser();
```

To add additional columns to the user:
```dart
var user = ParseUser("TestFlutter", "TestPassword123", "TestFlutterSDK@gmail.com")
            ..set("userLocation", "FlutterLand");
```

Other user features are:-
* Request Password Reset
* Verification Email Request
* Get all users
* Save
* Destroy user
* Queries

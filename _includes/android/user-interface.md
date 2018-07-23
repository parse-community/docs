# User Interface

At the end of the day, users of your application will be interacting with Android UI components. We provide several UI widgets to make working with Parse data easier.

## ParseLoginUI

If you are using Parse to manage users in your mobile app, you are already familiar with the `ParseUser`  class. At some point in your app, you might want to present a screen to log in your `ParseUser`.  Parse provides an open-source [ParseLoginUI](https://github.com/parse-community/ParseUI-Android) library that does exactly this.  Please note ParseLoginUI is not included with the Parse Android SDK; you need to import this library from maven or from our Git repository into your project. Check the README.md of the [ParseLoginUI](https://github.com/parse-community/ParseUI-Android) for detail steps.

This library contains an Android login activity that is ultra-customizable and easy to integrate with your app.  You can configure the look and feel of the login screens by either specifying XML configurations or constructing an Intent in code.  In this guide, we first provide several ways to integrate with the login library.  Then, we describe in detail how to customize the login screens.

![]({{ '/assets/images/all_screens.png' | prepend: site.baseurl }})

## Login Library API

### Basic Integration

The login library integration is simple.  Our library exposes an activity-level API that lets you launch the login library activity (`ParseLoginActivity`) to obtain a `ParseUser`.  `ParseLoginActivity` will guide the user through several screens to log in, sign up, or reset their password.  If the user resets their password by email, they are taken back to the login screen.
The user will also see helpful toast messages if they provide invalid input (e.g. logging in with an incorrect password or signing up with a username that's already taken).

To include `ParseLoginActivity` in your app, import the ParseLoginUI library project, and add the following into your `AndroidManifest.xml`:

```xml
<activity
    android:name="com.parse.ui.ParseLoginActivity"
    android:label="@string/app_name"
    android:launchMode="singleTop">
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.PARSE_LOGIN_ENABLED"
        android:value="true"/>
</activity>
```

Then, you can launch `ParseLoginActivity` from your own activity by calling:

```java
ParseLoginBuilder builder = new ParseLoginBuilder(MyActivity.this);
startActivityForResult(builder.build(), 0);
```

When `ParseLoginActivity` finishes, your caller activity will receive either:

*   `RESULT_OK`: The user successfully logged in. `ParseUser.getCurrentUser()` will be populated.
*   `RESULT_CANCELLED`: The user pressed the back button. If the user fails to log in or sign up, the only way to return to the previous screen is by pressing the back button.

We've provided a sample app, [ParseLoginSampleBasic](https://github.com/parse-community/ParseUI-Android) for this use case.  This sample app is a simple profile viewer.  If you are not logged in, `SampleProfileActivity` prompts you to log in.  Clicking on the login button in `SampleProfileActivity` launches the `ParseLoginActivity`, which prompts the user for login credentials.  If the user successfully logs in, `ParseLoginActivity` will automatically finish itself and return `RESULT_OK`.  Then, `SampleProfileActivity` will display the user's name and a logout button.

![]({{ '/assets/images/basic_login.png' | prepend: site.baseurl }})

This basic integration case works well if your caller activity is designed to function regardless of whether there is a valid current user.  For example, a restaurant reviews app may allow the user to browse restaurants even when the user is not logged in.  If the user does log in, the app could provide a more personalized experience on that same screen.

### Advanced Integration

If some parts or all of your app cannot function without a valid `ParseUser`, you can protect these parts of your app with a `ParseLoginDispatchActivity` (supplied in this library project).  This dispatch activity acts like a gatekeeper; it automatically launches `ParseLoginActivity` if no user is logged in, or launches the protected activity if a user is already logged in.  To use this, you subclass `ParseLoginDispatchActivity` and specify what protected activity to launch.

```java
public class SampleDispatchActivity extends ParseLoginDispatchActivity {
  @Override
  protected Class<?> getTargetClass() {
    return SampleProfileActivity.class;
  }
}
```

We've provided another sample app, [ParseLoginSampleWithDispatchActivity](https://github.com/parse-community/ParseUI-Android) for this use case.  The `SampleProfileActivity` in this app cannot function without a logged-in user, so it is protected by `SampleDispatchActivity`.

![]({{ '/assets/images/login_with_dispatch.png' | prepend: site.baseurl }})

The dispatch activity does not necessarily need to be the first activity at app launch.  You can launch the dispatch activity from any activity.  When your protected activity finishes, the dispatch activity will automatically forward the result code to your caller activity.

Let's revisit the restaurant reviews app again.  You might have a comment activity that requires a user.  You can protect this activity behind a dispatch activity.  The main restaurant listing activity (supports either user or no user), can launch the dispatch activity when the user presses the comment button.  If no user is logged in, the dispatch activity will start `ParseLoginActivity` to obtain a ParseUser.  If the user refuses to log in, they will be gracefully taken back to the restaurant listings activity.  In the restaurant listings activity, you can always call `ParseUser.getCurrentUser()` to determine whether the user logged in.

![]({{ '/assets/images/restaurants_app.png' | prepend: site.baseurl }})

## Customizing the Login Library

There are three ways to customize the login library:

*   Activity metadata in `AndroidManifest.xml` - This is most recommended because it allows you to customize the login experience without writing any code, and it makes the login experience consistent regardless which activity in your app launches `ParseLoginActivity`.
*   In code with `ParseLoginBuilder` - If you love writing code to do everything.
*   Overriding layout resource XMLs - This option is useful if you want to make significant changes to the look and feel of the login experience.

### Configure by Activity Metadata

We provide the following options for easily customizing the ParseLoginActivity in your app's `AndroidManifest.xml`:

*   `APP_LOGO`: `Drawable` resource for app logo.
*   `PARSE_LOGIN_ENABLED`: `Boolean` for whether to enable the Parse username/password login (default = false)
*   `PARSE_LOGIN_BUTTON_TEXT`: `String` to display on the login button (default = “Log in”)
*   `PARSE_SIGNUP_BUTTON_TEXT`: `String` to display on the signup button on the login screen (default = "Sign up")
*   `PARSE_LOGIN_HELP_TEXT`: `String` to display on the password-reset link (default =  "Forgotten password")
*   `PARSE_LOGIN_INVALID_CREDENTIALS_TEXT`: `String` to show on the toast when the user login fails (default = "The username and password you entered don't match")
*   `PARSE_LOGIN_EMAIL_AS_USERNAME`: `Boolean` for whether to prompt for the user's email as the username on the login and signup form (default = false)
*   `PARSE_SIGNUP_MIN_PASSWORD_LENGTH`: `Integer` for the minimum required password length on the signup form (default = 6)
*   `PARSE_SIGNUP_SUBMIT_BUTTON_TEXT`: `String` to display on the submit button on the signup screen (default = "Submit")
*   `FACEBOOK_LOGIN_ENABLED`: `Boolean` for whether to show the Facebook login button (default = false)
*   `FACEBOOK_LOGIN_BUTTON_TEXT`: `String` to display on the Facebook login button (default = "Log in with Facebook")
*   `FACEBOOK_LOGIN_PERMISSIONS`: `String` array resource containing requested Facebook permissions (default = empty)
*   `TWITTER_LOGIN_ENABLED`: `Boolean` for whether to show the Twitter login button (default = false)
*   `TWITTER_LOGIN_BUTTON_TEXT`: `String` to display on the Twitter login button (default = "Log in with Twitter")

Please note that `PARSE_LOGIN_ENABLED`, `FACEBOOK_LOGIN_ENABLED`, and `TWITTER_LOGIN_ENABLED` are all false by default.  You need to explicitly set them to true for those components to show up on the screen.  For `APP_LOGO` and `FACEBOOK_LOGIN_PERMISSIONS`, make sure you use `android:resource` instead of `android:value`.

Example configuration:

```xml
<activity
    android:name="com.parse.ui.ParseLoginActivity"
    android:label="@string/my_app_name"
    android:launchMode="singleTop">
    <!-- We reference a drawable resource here, so we must use android:resource -->
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.APP_LOGO"
        android:resource="@drawable/my_app_logo"/>
    <!-- For these non-resource options, use android:value -->
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.PARSE_LOGIN_ENABLED"
        android:value="true"/>
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.PARSE_LOGIN_EMAIL_AS_USERNAME"
        android:value="true"/>
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.PARSE_LOGIN_HELP_TEXT"
        android:value="@string/password_reset_text"/>
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.MIN_PASSWORD_LENGTH"
        android:value="8"/>
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.FACEBOOK_LOGIN_ENABLED"
        android:value="true"/>
    <!-- We reference a string-array resource here, so we must use android:resource -->
    <meta-data
        android:name="com.parse.ui.ParseLoginActivity.FACEBOOK_LOGIN_PERMISSIONS"
        android:resource="@array/my_facebook_permissions"/>
</activity>
```

For the Facebook permission array, you also need to have this in your `res/values/strings.xml`:

```xml
<resources>
    <string-array name="my_facebook_permissions">
        <item>public_profile</item>
        <item>user_friends</item>
    </string-array>
</resources>
```

### Configure by Code

You can configure the `ParseLoginActivity` by code using the ParseLoginBuilder.  You specify the options on the builder, and then call `build()` to generate an `Intent` that can be used to start the `ParseLoginActivity`.  We've provided a sample app, [ParseLoginSampleCodeCustomization](https://github.com/parse-community/ParseUI-Android) demonstrating this use case.  The options in `ParseLoginBuilder` are the same as those in activity metadata customization.  If you specify options in both code and activity metadata, the options in code take precedence.

```java
ParseLoginBuilder builder = new ParseLoginBuilder(ProfileActivity.this);
Intent parseLoginIntent = builder.setAppLogo(R.drawable.my_app_logo)
    .setParseLoginEnabled(true)
    .setParseLoginButtonText("Go")
    .setParseSignupButtonText("Register")
    .setParseLoginHelpText("Forgot password?")
    .setParseLoginInvalidCredentialsToastText("You email and/or password is not correct")
    .setParseLoginEmailAsUsername(true)
    .setParseSignupSubmitButtonText("Submit registration")
    .setFacebookLoginEnabled(true)
    .setFacebookLoginButtonText("Facebook")
    .setFacebookLoginPermissions(Arrays.asList("public_profile", "user_friends"))
    .setTwitterLoginEnabled(true)
    .setTwitterLoginButtontext("Twitter")
    .build();
startActivityForResult(parseLoginIntent, 0);
```

### Configure by Overriding Layout Resource Files

You can override any layout resources by having files with the same name as those in the ParseLoginUI library project.  This is useful if you want to add a background image, or reposition the login components on the screen.  The Android build process will automatically merge resource files with the same name, giving your app project's files precedence.   The top-level layout files are:

*   `com_parse_ui_parse_login_fragment.xml`: If you do not use certain login methods (username/password, Facebook, or Twitter), you can remove the corresponding UI elements from this layout.
*   `com_parse_ui_parse_signup_fragment.xml`: You can add additional input fields in the signup form here.  If you do, you also need add code to `ParseSignupFragment` to copy that data into the `ParseUser` object.
*   `com_parse_ui_parse_login_help_fragment.xml`: You can change the message for password reset.

We've provided another sample app, [ParseLoginSampleLayoutOverride](https://github.com/parse-community/ParseUI-Android) showing how to do this.  This sample app only has a Facebook login button in `com_parse_ui_parse_login_fragment.xml`, and adds a background image to the login screens.

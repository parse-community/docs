# User Interface

At the end of the day, users of your application will be interacting with Android UI components. We provide several UI widgets to make working with Parse data easier.

## ParseLoginUI

If you are using Parse to manage users in your mobile app, you are already familiar with the `ParseUser`  class. At some point in your app, you might want to present a screen to log in your `ParseUser`.  Parse provides an open-source [ParseLoginUI](https://github.com/parse-community/ParseUI-Android) library that does exactly this.  Please note ParseLoginUI is not included with the Parse Android SDK; you need to import this library from maven or from our Git repository into your project. Check the README.md of the [ParseLoginUI](https://github.com/parse-community/ParseUI-Android) for detail steps.

This library contains an Android login activity that is ultra-customizable and easy to integrate with your app.  You can configure the look and feel of the login screens by either specifying XML configurations or constructing an Intent in code.  In this guide, we first provide several ways to integrate with the login library.  Then, we describe in detail how to customize the login screens.

<img alt="" data-echo="{{ '/assets/images/all_screens.png' | prepend: site.baseurl }}"/>

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

<img alt="" data-echo="{{ '/assets/images/basic_login.png' | prepend: site.baseurl }}"/>

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

<img alt="" data-echo="{{ '/assets/images/login_with_dispatch.png' | prepend: site.baseurl }}"/>

The dispatch activity does not necessarily need to be the first activity at app launch.  You can launch the dispatch activity from any activity.  When your protected activity finishes, the dispatch activity will automatically forward the result code to your caller activity.

Let's revisit the restaurant reviews app again.  You might have a comment activity that requires a user.  You can protect this activity behind a dispatch activity.  The main restaurant listing activity (supports either user or no user), can launch the dispatch activity when the user presses the comment button.  If no user is logged in, the dispatch activity will start `ParseLoginActivity` to obtain a ParseUser.  If the user refuses to log in, they will be gracefully taken back to the restaurant listings activity.  In the restaurant listings activity, you can always call `ParseUser.getCurrentUser()` to determine whether the user logged in.

<img alt="" data-echo="{{ '/assets/images/restaurants_app.png' | prepend: site.baseurl }}"/>

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

## ParseQueryAdapter (Deprecated 0.0.4)

Since `RecyclerView` is now favorable over `ListView`, it is recommended to use a custom RecyclerView.Adapter instead of using `ParseQueryAdapter`.
 
To display collections of data, we provide an implementation of `Adapter` in the Parse Android SDK. Instead of using a basic `ListAdapter` backed by a static array of objects, our `ParseQueryAdapter` provides a layer of abstraction and allows you to easily display data from one of your Parse classes in your `AdapterView` of choice (e.g. `ListView` or `GridView`). 
 
To use a `ParseQueryAdapter` to display data in an `Activity`, follow the steps outlined below in your `Activity`'s `onCreate`: 
 
1.  Instantiate a `ParseQueryAdapter`. 
2. Customize it as necessary (see the below subsections for detailed instructions to display data from specific queries, change the UI of the `View`s to be displayed, and more). 
3.  Set your new `Adapter` on your `AdapterView` with `setAdapter()`. 
 
When the AdapterView is attached to the window, your `ParseQueryAdapter` will automatically fetch the first set of data. This subclass simplifies the code that would otherwise be involved with: 
 
1.  Pagination, with a row that can be tapped to load the next page. 
2.  Configurable downloading and displaying of remote images within rows. 
3.  Automatic loading and management of the Parse objects array. 
4.  Callbacks from major events in the data cycle. 
 
Consider the following code, which sets up a very simple `ParseQueryAdapter` to display data in a `ListView`. You can be up and running with a functional `ListView` full of data with very little configuration. 
 
```java 
// Inside an Activity 
public void onCreate(Bundle savedInstanceState) { 
  super.onCreate(savedInstanceState); 
  // Uses a layout with a ListView (id: "listview"), which uses our Adapter. 
  setContentView(R.layout.main); 
 
  ParseQueryAdapter<ParseObject> adapter = new ParseQueryAdapter<ParseObject>(this, "Instrument"); 
  adapter.setTextKey("name"); 
  adapter.setImageKey("photo"); 
 
  ListView listView = (ListView) findViewById(R.id.listview); 
  listView.setAdapter(adapter); 
} 
``` 
 
This view will display a list of Instruments by name. Notice all the code that we're not writing: we can skip the logic to fetch each consecutive page of results, to manually update and maintain the backing data array, to download images in the background and set the image data on UI widgets, and to handle touch events to trigger loading the next page of results. 
 
The `ParseQueryAdapter` can be configured to customize what data to use, how to display it, and what to do before and after it's been fetched. Read on to see what you can do, and how to tweak a `ParseQueryAdapter` to fit all of your needs. 
 
## Customizing the Query 
 
By default, the simplest `ParseQueryAdapter` constructor takes a `Context` and a Parse class name. All `ParseObject`s in that class are then fetched and displayed in order of their `createdAt` timestamps. 
 
To change this behavior, we drew from the functionality of an `ArrayAdapter`: but instead of taking in a vanilla array of objects to be displayed by the adapter, `ParseQueryAdapter` can also take a `QueryFactory` class which returns a `ParseQuery` you define. Pass that into the constructor, and the adapter will then use that query to determine which objects to fetch and display. 
 
See below for an example setting up a `ParseQueryAdapter` to display only punk and metal bands with four or more members, ordered by number of records sold: 
 
```java 
ParseQueryAdapter<ParseObject> adapter = 
  new ParseQueryAdapter<ParseObject>(this, new ParseQueryAdapter.QueryFactory<ParseObject>() { 
    public ParseQuery<ParseObject> create() { 
      // Here we can configure a ParseQuery to our heart's desire. 
      ParseQuery query = new ParseQuery("Band"); 
      query.whereContainedIn("genre", Arrays.asList({ "Punk", "Metal" })); 
      query.whereGreaterThanOrEqualTo("memberCount", 4); 
      query.orderByDescending("albumsSoldCount"); 
      return query; 
    } 
  }); 
``` 
 
## Customizing the Rows 
 
The default layout for the individual `View`s in your `AdapterView` is a simple `LinearLayout` with a `ParseImageView` and a `TextView`. If `setTextKey(String)` is used with the `ParseQueryAdapter`, its parameter will be used to select which key on your `ParseObject` is displayed in the `TextView`. Similarly, if `setImageKey(String)` is used, its parameter will be used to determine the image displayed in the ImageView. 
 
One way to customize the rows is to override `getItemView(ParseObject, View, ViewGroup)` or `getNextPageView(View, ViewGroup)` and call the superclass's implementation of the appropriate method to do the heavy lifting. If you provide your own layout to the superclass's implementation, note that `getItemView(ParseObject, View, ViewGroup)` and `getNextPageView(View, ViewGroup)` expect a `TextView` (id: `android.R.id.text1`) if the `textKey` is set and a `ParseImageView` (id: `android.R.id.icon`) if the `imageKey` is set. 
 
Here, we inflate and configure a layout of our own, with a `TextView`, a `ParseImageView`, and an extra "description" `TextView` (id: `R.id.description`): 
 
```java 
@Override 
public View getItemView(ParseObject object, View v, ViewGroup parent) { 
  if (v == null) { 
    v = View.inflate(getContext(), R.layout.adapter_item, null); 
  } 
 
  // Take advantage of ParseQueryAdapter's getItemView logic for 
  // populating the main TextView/ImageView. 
  // The IDs in your custom layout must match what ParseQueryAdapter expects 
  // if it will be populating a TextView or ImageView for you. 
  super.getItemView(object, v, parent); 
 
  // Do additional configuration before returning the View. 
  TextView descriptionView = (TextView) v.findViewById(R.id.description); 
  descriptionView.setText(object.getString("description")); 
  return v; 
} 
``` 
 
Another way to customize the rows is to have complete control over the look of the rows by overriding `ParseQueryAdapter`'s methods and ignoring the superclass's implementation entirely. In this example, our item views are simply rows where the color is defined by the `ParseObject`: 
 
```java 
@Override 
public View getItemView(ParseObject object, View v, ViewGroup parent) { 
  if (v == null) { 
    v = View.inflate(getContext(), R.layout.adapter_item, null); 
  } 
  v.setBackgroundColor(object.getInt("color")); 
  return v; 
} 
 
@Override 
public View getNextPageView(View v, ViewGroup parent) { 
  if (v == null) { 
    // R.layout.adapter_next_page contains an ImageView with a custom graphic 
    // and a TextView. 
    v = View.inflate(getContext(), R.layout.adapter_next_page, null); 
  } 
  TextView textView = (TextView) v.findViewById(R.id.nextPageTextViewId); 
  textView.setText("Loaded " + getCount() + " rows. Get more!"); 
  return v; 
} 
 
``` 
 
## Loading Remote Images in Rows 
 
`ParseQueryAdapter` makes it simple to display remote images. By calling `setImageKey(String)`, you can pass in a key name on your `ParseObject` which should contain a `ParseFile` containing an image to be fetched from Parse and loaded into the `ParseImageView` of the corresponding row. 
 
The image will download asynchronously, and the appropriate `ParseImageView` will be updated in the background. As the user scrolls and rows are recycled by the adapter, images will be fetched as rows become visible and assigned `ParseObject`s. 
 
You can define a placeholder image to be used when the image fetch has not yet completed. Call `setPlaceholder(Drawable)` on your `ParseQueryAdapter` to use the specified `Drawable` as a fallback image. 
 
## Lifecycle Methods 
 
We expose two hooks in the data lifecycle of the Adapter for you to execute custom logic &mdash; right before we query Parse for your data and right after the fetched objects have been loaded from the query. These methods are particularly useful for toggling some loading UI. 
 
An `OnQueryLoadListener` can be set via `setOnQueryLoadListener(OnQueryLoadListener)`, which provides `onLoading()` and `onLoaded(List<ParseObject>, Exception)` methods for implementation. 
 
## Pagination 
 
Pagination ensures that the table only gets one page of objects at a time. You can set the number of objects are in a page by calling `setObjectsPerPage(int)`. 
 
The query is automatically altered to apply pagination, and a pagination row appears at the bottom of the `AdapterView` to allow users to load the next page. 
 
Pagination is turned on by default. To turn it off, call `setPaginationEnabled(false)`. With pagination turned off, the `ParseQueryAdapter` will use the default `ParseQuery` limit of 100 items. 
 
## Auto-loading of Data 
 
When the `AdapterView` that your `ParseQueryAdapter` is set on is attached to a window, the `ParseQueryAdapter`'s `loadObjects()` method is automatically called, triggering the fetching of the first page of results. To disable this behavior (perhaps to delay the fetching of data, or run some custom logic ahead of time), just call `setAutoload(false)` and call `loadObjects()` manually if autoload is disabled. 

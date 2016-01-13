# Users

At the core of many apps, there is a notion of user accounts that lets users access their information in a secure manner. We provide a specialized user class called `%{ParseUser}` that automatically handles much of the functionality required for user account management.

With this class, you'll be able to add user account functionality in your app.

`%{ParseUser}` is a subclass of the `%{ParseObject}`, and has all the same features, such as flexible schema, automatic persistence, and a key value interface. All the methods that are on `%{ParseObject}` also exist in `%{ParseUser}`. The difference is that `%{ParseUser}` has some special additions specific to user accounts.

## Properties

`%{ParseUser}` has several properties that set it apart from `%{ParseObject}`:

*   username: The username for the user (required).
*   password: The password for the user (required on signup).
*   email: The email address for the user (optional).

We'll go through each of these in detail as we run through the various use cases for users. Keep in mind that if you set `username` and `email` using the setters, you do not need to set it using the `put` method.

## Signing Up

The first thing your app will do is probably ask the user to sign up. The following code illustrates a typical sign up:

```java
ParseUser user = new ParseUser();
user.setUsername("my name");
user.setPassword("my pass");
user.setEmail("email@example.com");

// other fields can be set just like with ParseObject
user.put("phone", "650-253-0000");

user.signUpInBackground(new SignUpCallback() {
  public void done(ParseException e) {
    if (e == null) {
      // Hooray! Let them use the app now.
    } else {
      // Sign up didn't succeed. Look at the ParseException
      // to figure out what went wrong
    }
  }
});
```

This call will asynchronously create a new user in your Parse App. Before it does this, it checks to make sure that both the username and email are unique. Also, it securely hashes the password in the cloud using bcrypt. We never store passwords in plaintext, nor will we ever transmit passwords back to the client in plaintext.

Note that we used the `signUpInBackground` method, not the `saveInBackground` method. New `%{ParseUser}`s should always be created using the `signUpInBackground` (or `signUp`) method. Subsequent updates to a user can be done by calling `save`.

The `signUpInBackground` method comes in various flavors, with the ability to pass back errors, and also synchronous versions. As usual, we highly recommend using the asynchronous versions when possible, so as not to block the UI in your app. You can read more about these specific methods in our [API docs](/docs/android/).

If a signup isn't successful, you should read the error object that is returned. The most likely case is that the username or email has already been taken by another user. You should clearly communicate this to your users, and ask them try a different username.

You are free to use an email address as the username. Simply ask your users to enter their email, but fill it in the username property &mdash; `%{ParseUser}` will work as normal. We'll go over how this is handled in the reset password section.

## Logging In

Of course, after you allow users to sign up, you need be able to let them log in to their account in the future. To do this, you can use the class method `logInInBackground`.

```java
ParseUser.logInInBackground("Jerry", "showmethemoney", new LogInCallback() {
  public void done(ParseUser user, ParseException e) {
    if (user != null) {
      // Hooray! The user is logged in.
    } else {
      // Signup failed. Look at the ParseException to see what happened.
    }
  }
});
```

## Verifying Emails

Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the `emailVerified` key to the `%{ParseUser}` object. When a `%{ParseUser}`'s `email` is set or modified, `emailVerified` is set to `false`. Parse then emails the user a link which will set `emailVerified` to `true`.

There are three `emailVerified` states to consider:

1.  `true` - the user confirmed his or her email address by clicking on the link Parse emailed them. `ParseUsers` can never have a `true` value when the user account is first created.
2.  `false` - at the time the `%{ParseUser}` object was last fetched, the user had not confirmed his or her email address. If `emailVerified` is `false`, consider calling `fetch()` on the `%{ParseUser}`.
3.  _missing_ - the `%{ParseUser}` was created when email verification was off or the `%{ParseUser}` does not have an `email`.

## Current User

It would be bothersome if the user had to log in every time they open your app. You can avoid this by using the cached `currentUser` object.

Whenever you use any signup or login methods, the user is cached on disk. You can treat this cache as a session, and automatically assume the user is logged in:

```java
ParseUser currentUser = ParseUser.getCurrentUser();
if (currentUser != null) {
  // do stuff with the user
} else {
  // show the signup or login screen
}
```

You can clear the current user by logging them out:

```java
ParseUser.logOut();
ParseUser currentUser = ParseUser.getCurrentUser(); // this will now be null
```

## Anonymous Users

Being able to associate data and objects with individual users is highly valuable, but sometimes you want to be able to do this without forcing a user to specify a username and password.

An anonymous user is a user that can be created without a username and password but still has all of the same capabilities as any other `%{ParseUser}`. After logging out, an anonymous user is abandoned, and its data is no longer accessible.

You can create an anonymous user using `ParseAnonymousUtils`:

```java
ParseAnonymousUtils.logIn(new LogInCallback() {
  @Override
  public void done(ParseUser user, ParseException e) {
    if (e != null) {
      Log.d("MyApp", "Anonymous login failed.");
    } else {
      Log.d("MyApp", "Anonymous user logged in.");
    }
  }
});
```

You can convert an anonymous user into a regular user by setting the username and password, then calling `signUp()`, or by logging in or linking with a service like [Facebook](#fbusers) or [Twitter](#twitterusers). The converted user will retain all of its data.  To determine whether the current user is an anonymous user, you can check `ParseAnonymousUtils.isLinked()`:

```java
if (ParseAnonymousUtils.isLinked(ParseUser.getCurrentUser())) {
  enableSignUpButton();
} else {
  enableLogOutButton();
}
```

Anonymous users can also be automatically created for you without requiring a network request, so that you can begin working with your user immediately when your application starts.  When you enable automatic anonymous user creation at application startup, `ParseUser.getCurrentUser()` will never be `null`. The user will automatically be created in the cloud the first time the user or any object with a relation to the user is saved.  Until that point, the user's object ID will be `null`.  Enabling automatic user creation makes associating data with your users painless.  For example, in your `Application.onCreate()` method, you might write:

```java
ParseUser.enableAutomaticUser();
ParseUser.getCurrentUser().increment("RunCount");
ParseUser.getCurrentUser().saveInBackground();
```

## Setting the Current User

If you’ve created your own authentication routines, or otherwise logged in a user on the server side, you can now pass the session token to the client and use the `become` method. This method will ensure the session token is valid before setting the current user.

```java
ParseUser.becomeInBackground("session-token-here", new LogInCallback() {
  public void done(ParseUser user, ParseException e) {
    if (user != null) {
      // The current user is now set to user.
    } else {
      // The token could not be validated.
    }
  }
});
```

## Security For User Objects

The `%{ParseUser}` class is secured by default. Data stored in a `%{ParseUser}` can only be modified by that user. By default, the data can still be read by any client. Thus, some `%{ParseUser}` objects are authenticated and can be modified, whereas others are read-only.

Specifically, you are not able to invoke any of the `save` or `delete` type methods unless the `%{ParseUser}` was obtained using an authenticated method, like `logIn` or `signUp`. This ensures that only the user can alter their own data.

The following illustrates this security policy:

```java
ParseUser user = ParseUser.logIn("my_username", "my_password");
user.setUsername("my_new_username"); // attempt to change username
user.saveInBackground(); // This succeeds, since the user was authenticated on the device

// Get the user from a non-authenticated manner
ParseQuery<ParseUser> query = ParseUser.getQuery();
query.getInBackground(user.getObjectId(), new GetCallback<ParseUser>() {
  public void done(ParseUser object, ParseException e) {
    object.setUsername("another_username");

    // This will throw an exception, since the ParseUser is not authenticated
    object.saveInBackground();
  }
});
```

The `%{ParseUser}` obtained from `getCurrentUser()` will always be authenticated.

If you need to check if a `%{ParseUser}` is authenticated, you can invoke the `isAuthenticated()` method. You do not need to check `isAuthenticated()` with `%{ParseUser}` objects that are obtained via an authenticated method.

## Security for Other Objects

The same security model that applies to the `%{ParseUser}` can be applied to other objects. For any object, you can specify which users are allowed to read the object, and which users are allowed to modify an object. To support this type of security, each object has an [access control list](http://en.wikipedia.org/wiki/Access_control_list), implemented by the `ParseACL` class.

The simplest way to use a `ParseACL` is to specify that an object may only be read or written by a single user. To create such an object, there must first be a logged in `%{ParseUser}`. Then, `new ParseACL(user)` generates a `ParseACL` that limits access to that user. An object's ACL is updated when the object is saved, like any other property. Thus, to create a private note that can only be accessed by the current user:

```java
ParseObject privateNote = new ParseObject("Note");
privateNote.put("content", "This note is private!");
privateNote.setACL(new ParseACL(ParseUser.getCurrentUser()));
privateNote.saveInBackground();
```

This note will then only be accessible to the current user, although it will be accessible to any device where that user is signed in. This functionality is useful for applications where you want to enable access to user data across multiple devices, like a personal todo list.

Permissions can also be granted on a per-user basis. You can add permissions individually to a `ParseACL` using `setReadAccess` and `setWriteAccess`. For example, let's say you have a message that will be sent to a group of several users, where each of them have the rights to read and delete that message:

```java
ParseObject groupMessage = new ParseObject("Message");
ParseACL groupACL = new ParseACL();

// userList is an Iterable<ParseUser> with the users we are sending this message to.
for (ParseUser user : userList) {
  groupACL.setReadAccess(user, true);
  groupACL.setWriteAccess(user, true);
}

groupMessage.setACL(groupACL);
groupMessage.saveInBackground();
```

You can also grant permissions to all users at once using `setPublicReadAccess` and `setPublicWriteAccess`. This allows patterns like posting comments on a message board. For example, to create a post that can only be edited by its author, but can be read by anyone:

```java
ParseObject publicPost = new ParseObject("Post");
ParseACL postACL = new ParseACL(ParseUser.getCurrentUser());
postACL.setPublicReadAccess(true);
publicPost.setACL(postACL);
publicPost.saveInBackground();
```

To help ensure that your users' data is secure by default, you can set a default ACL to be applied to all newly-created `ParseObjects`:

```java
ParseACL.setDefaultACL(defaultACL, true);
```

In the code above, the second parameter to setDefaultACL tells Parse to ensure that the default ACL assigned at the time of object creation allows read and write access to the current user at that time.  Without this setting, you would need to reset the defaultACL every time a user logs in or out so that the current user would be granted access appropriately.  With this setting, you can ignore changes to the current user until you explicitly need to grant different kinds of access.

Default ACLs make it easy to create apps that follow common access patterns. An application like Twitter, for example, where user content is generally visible to the world, might set a default ACL such as:

```java
ParseACL defaultACL = new ParseACL();
defaultACL.setPublicReadAccess(true);
ParseACL.setDefaultACL(defaultACL, true);
```

For an application like Dropbox, where a user's data is only accessible by the user itself unless explicit permission is given, you would provide a default ACL where only the current user is given access:

```java
ParseACL.setDefaultACL(new ParseACL(), true);
```

An application that logs data to Parse but doesn't provide any user access to that data would instead deny access to the current user while providing a restrictive ACL:

```java
ParseACL.setDefaultACL(new ParseACL(), false);
```

Operations that are forbidden, such as deleting an object that you do not have write access to, result in a `ParseException.OBJECT_NOT_FOUND` error code. For security purposes, this prevents clients from distinguishing which object ids exist but are secured, versus which object ids do not exist at all.

## Resetting Passwords

It's a fact that as soon as you introduce passwords into a system, users will forget them. In such cases, our library provides a way to let them securely reset their password.

To kick off the password reset flow, ask the user for their email address, and call:

```java
ParseUser.requestPasswordResetInBackground("myemail@example.com", new RequestPasswordResetCallback() {
  public void done(ParseException e) {
    if (e == null) {
      // An email was successfully sent with reset instructions.
    } else {
      // Something went wrong. Look at the ParseException to see what's up.
    }
  }
});
```

This will attempt to match the given email with the user's email or username field, and will send them a password reset email. By doing this, you can opt to have users use their email as their username, or you can collect it separately and store it in the email field.

The flow for password reset is as follows:

1.  User requests that their password be reset by typing in their email.
2.  Parse sends an email to their address, with a special password reset link.
3.  User clicks on the reset link, and is directed to a special Parse page that will allow them type in a new password.
4.  User types in a new password. Their password has now been reset to a value they specify.

Note that the messaging in this flow will reference your app by the name that you specified when you created this app on Parse.

## Querying

To query for users, you need to use the special user query:

```java
ParseQuery<ParseUser> query = ParseUser.getQuery();
query.whereEqualTo("gender", "female");
query.findInBackground(new FindCallback<ParseUser>() {
  public void done(List<ParseUser> objects, ParseException e) {
    if (e == null) {
        // The query was successful.
    } else {
        // Something went wrong.
    }
  }
});
```

In addition, you can use `get` to get a `%{ParseUser}` by id.

## Associations

Associations involving a `%{ParseUser}` work right of the box. For example, let's say you're making a blogging app. To store a new post for a user and retrieve all their posts:

```java
ParseUser user = ParseUser.getCurrentUser();

// Make a new post
ParseObject post = new ParseObject("Post");
post.put("title", "My New Post");
post.put("body", "This is some great content.");
post.put("user", user);
post.saveInBackground();

// Find all posts by the current user
ParseQuery<ParseObject> query = ParseQuery.getQuery("Post");
query.whereEqualTo("user", user);
query.findInBackground(new FindCallback<ParseObject>() { ... });
```

## Facebook Users

Parse provides an easy way to integrate Facebook with your application. The Facebook SDK can be used with our SDK, and is integrated with the `%{ParseUser}` class to make linking your users to their Facebook identities easy.

Using our Facebook integration, you can associate an authenticated Facebook user with a `%{ParseUser}`. With just a few lines of code, you'll be able to provide a "Log in with Facebook" option in your app, and be able to save their data to Parse.

**Note:** Parse is compatible with both Facebook SDK 3.x and 4.x for Android. These instructions are for Facebook SDK 4.x.

### Setup

To start using Facebook with Parse, you need to:

1.  [Set up a Facebook app](https://developers.facebook.com/apps), if you haven't already.
2.  Add your application's Facebook Application ID on your Parse application's settings page.
3.  Follow Facebook's instructions for [getting started with the Facebook SDK](https://developers.facebook.com/docs/android/getting-started) to create an app linked to the Facebook SDK.  Once you get to Step 6, stop after linking the Facebook SDK project and configuring the Facebook app ID. You can use our guide to attach your Parse users to Facebook accounts when logging in.
4.  Add `com.parse:parsefacebookutils-v4-android:1.10.3@aar` to your Gradle dependencies. This includes the contents of the `Parse-*.jar` and the `com.parse:parse-android:1.10.+` repository, so be sure to remove as needed to prevent duplicate dependencies, otherwise a `com.android.dex.DexException` will be thrown.
5.  Add the following where you initialize the Parse SDK in your `Application.onCreate()`:

  ```java
  ParseFacebookUtils.initialize(context);
  ```

Facebook's Android SDK provides an enhanced login experience on devices that have [Facebook's official Android app](https://market.android.com/details?id=com.facebook.katana) installed. This allows users of apps that support Facebook login to sign in directly through the Facebook app, using credentials that are already on the device. If the Facebook app is not installed, the default dialog-based authentication will be used. Facebook calls this feature "Single sign-on" (SSO), and requires you to override `onActivityResult()` in your calling `Activity`:

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  ParseFacebookUtils.onActivityResult(requestCode, resultCode, data);
}
```

If your `Activity` is already using `onActivityResult()`, you can avoid `requestCode` collisions by specifying your own request code offset when initializing `ParseFacebookUtils.initialize(context, callbackRequestCodeOffset)`. Otherwise, a sensible default `activityCode` will be used.

If you encounter any issues that are Facebook-related, a good resource is the [official Facebook SDK for Android page](https://developers.facebook.com/android/).

There are two main ways to use Facebook with your Parse users: (1) logging in as a Facebook user and creating a `%{ParseUser}`, or (2) linking Facebook to an existing `%{ParseUser}`.

<div class='tip info'><div>
  It is up to you to record any data that you need from the Facebook user after they authenticate. To accomplish this, you'll need to [do a graph query via Facebook's SDK](https://parse.com/questions/how-can-i-find-parse-users-that-are-facebook-friends-with-the-current-user).
</div></div>

### Login &amp; Signup

`ParseFacebookUtils` provides a way to allow your `%{ParseUser}`s to log in or sign up through Facebook. This is generally accomplished using the `logInWithReadPermissionsInBackground(String, Collection<String>)` method:

```java
ParseFacebookUtils.logInWithReadPermissionsInBackground(this, permissions, new LogInCallback() {
  @Override
  public void done(ParseUser user, ParseException err) {
    if (user == null) {
      Log.d("MyApp", "Uh oh. The user cancelled the Facebook login.");
    } else if (user.isNew()) {
      Log.d("MyApp", "User signed up and logged in through Facebook!");
    } else {
      Log.d("MyApp", "User logged in through Facebook!");
    }
  }
});
```

When this code is run, the following happens:

1.  The user is shown the Facebook login dialog or a prompt generated by the Facebook app.
2.  The user authenticates via Facebook, and your app receives a callback.
3.  Our SDK receives the user's Facebook access data and saves it to a `%{ParseUser}`. If no `%{ParseUser}` exists with the same Facebook ID, then a new `%{ParseUser}` is created.
4.  Your `LogInCallback` is called with the user.
5.  The current user reference will be updated to this user.

In order to display the Facebook login dialogs and activities, the current `Activity` must be provided (often, the current activity is `this` when calling `logInWithReadPermissionsInBackground()` from within the `Activity`) as we have done above.

`%{ParseUser}` integration doesn't require any permissions to work out of the box (i.e. `null` is perfectly acceptable). When logging in, you can only use read permissions. See our documentation below about [requesting additional permissions](#fbusers-permissions) (read or publish). [Read more about permissions on Facebook's developer guide.](https://developers.facebook.com/docs/reference/api/permissions/)

### Facebook Linking

If you want to associate an existing `%{ParseUser}` to a Facebook account, you can link it like so:

```java
if (!ParseFacebookUtils.isLinked(user)) {
  ParseFacebookUtils.linkWithReadPermissionsInBackground(user, this, permissions, new SaveCallback() {
    @Override
    public void done(ParseException ex) {
      if (ParseFacebookUtils.isLinked(user)) {
        Log.d("MyApp", "Woohoo, user logged in with Facebook!");
      }
    }
  });
}
```

The steps that happen when linking are very similar to log in. The difference is that on successful login, the existing `%{ParseUser}` is updated with the Facebook information. Future logins via Facebook will now log the user into their existing account.

If you want to unlink Facebook from a user, simply do this:

```java
ParseFacebookUtils.unlinkInBackground(user, new SaveCallback() {
  @Override
  public void done(ParseException ex) {
    if (ex == null) {
      Log.d("MyApp", "The user is no longer associated with their Facebook account.");
    }
  }
});
```

### Requesting Permissions

As of v3.0 of the Facebook SDK, read and publish permissions must be requested separately. To request additional permissions, you may call `ParseFacebookUtils.linkWithReadPermissionsInBackground()` or `ParseFacebookUtils.linkWithPublishPermissionsInBackground()`. For more information about requesting new permissions, please see [Facebook's API documentation for these functions](https://developers.facebook.com/docs/facebook-login/android/permissions).

After successfully retrieving new permissions, please call `ParseFacebookUtilities.linkInBackground(ParseUser, AccessToken)`, which will save any changes to the session token back to the `%{ParseUser}` and ensure that this session data follows the user wherever it logs in.

### Facebook SDK and Parse

The Facebook Android SDK provides a number of helper classes for interacting with Facebook's API. Generally, you will use the `GraphRequest` class to interact with Facebook on behalf of your logged-in user. [You can read more about the Facebook SDK here](https://developers.facebook.com/docs/reference/android/current).

To access the user's `AccessToken` you can simply call `AccessToken.getCurrentAccessToken()` to access the `AccessToken` instance, which can then be passed to `GraphRequest`s.


## Twitter Users

As with Facebook, Parse also provides an easy way to integrate Twitter authentication into your application. The Parse SDK provides a straightforward way to authorize and link a Twitter account to your `%{ParseUser}`s. With just a few lines of code, you'll be able to provide a "log in with Twitter" option in your app, and be able to save their data to Parse.

### Setup

To start using Twitter with Parse, you need to:

1.  [Set up a Twitter app](https://dev.twitter.com/apps), if you haven't already.
2.  Add your application's Twitter consumer key on your Parse application's settings page.
3.  When asked to specify a "Callback URL" for your Twitter app, please insert a valid URL. This value will not be used by your iOS or Android application, but is necessary in order to enable authentication through Twitter.
4.  Add `compile 'com.parse:parsetwitterutils-android:1.10.+'` to your Gradle dependencies. This includes the contents of the `Parse-*.jar` and the `com.parse:parse-android:1.10.+` repository, so be sure to remove as needed to prevent duplicate dependencies, otherwise a `com.android.dex.DexException` will be thrown.
5.  Add the following where you initialize the Parse SDK in your `Application.onCreate()`

```java
ParseTwitterUtils.initialize("YOUR CONSUMER KEY", "YOUR CONSUMER SECRET");
```

If you encounter any issues that are Twitter-related, a good resource is the [official Twitter documentation](https://dev.twitter.com/docs).

There are two main ways to use Twitter with your Parse users: (1) logging in as a Twitter user and creating a `%{ParseUser}`, or (2) linking Twitter to an existing `%{ParseUser}`.

### Login &amp; Signup

`ParseTwitterUtils` provides a way to allow your `%{ParseUser}`s to log in or sign up through Twitter. This is accomplished using the `logIn()` method:

```java
ParseTwitterUtils.logIn(this, new LogInCallback() {
  @Override
  public void done(ParseUser user, ParseException err) {
    if (user == null) {
      Log.d("MyApp", "Uh oh. The user cancelled the Twitter login.");
    } else if (user.isNew()) {
      Log.d("MyApp", "User signed up and logged in through Twitter!");
    } else {
      Log.d("MyApp", "User logged in through Twitter!");
    }
  }
});
```

When this code is run, the following happens:

1.  The user is shown the Twitter login dialog.
2.  The user authenticates via Twitter, and your app receives a callback.
3.  Our SDK receives the Twitter data and saves it to a `%{ParseUser}`. If it's a new user based on the Twitter handle, then that user is created.
4.  Your `LogInCallback` is called with the user.

In order to display the Twitter login dialogs and activities, the current `Context` must be provided (often, the current context is `this` when calling `logIn()` from within the `Activity`) as we have done above.

### Twitter Linking

If you want to associate an existing `%{ParseUser}` with a Twitter account, you can link it like so:

```java
if (!ParseTwitterUtils.isLinked(user)) {
  ParseTwitterUtils.link(user, this, new SaveCallback() {
    @Override
    public void done(ParseException ex) {
      if (ParseTwitterUtils.isLinked(user)) {
        Log.d("MyApp", "Woohoo, user logged in with Twitter!");
      }
    }
  });
}
```

The steps that happen when linking are very similar to log in. The difference is that on successful login, the existing `%{ParseUser}` is updated with the Twitter information. Future logins via Twitter will now log the user into their existing account.

If you want to unlink Twitter from a user, simply do this:

```java
ParseTwitterUtils.unlinkInBackground(user, new SaveCallback() {
  @Override
  public void done(ParseException ex) {
    if (ex == null) {
      Log.d("MyApp", "The user is no longer associated with their Twitter account.");
    }
  }
});
```

### Twitter API Calls

Our SDK provides a straightforward way to sign your API HTTP requests to the [Twitter REST API](https://dev.twitter.com/docs/api) when your app has a Twitter-linked `%{ParseUser}`.  To make a request through our API, you can use the `Twitter` singleton provided by `ParseTwitterUtils`:

```java
HttpClient client = new DefaultHttpClient();
HttpGet verifyGet = new HttpGet(
        "https://api.twitter.com/1.1/account/verify_credentials.json");
ParseTwitterUtils.getTwitter().signRequest(verifyGet);
HttpResponse response = client.execute(verifyGet);
```

# Users

At the core of many apps, there is a notion of user accounts that lets users access their information in a secure manner. We provide a specialized user class called `ParseUser` that automatically handles much of the functionality required for user account management.

With this class, you'll be able to add user account functionality in your app.

`ParseUser` is a subclass of `ParseObject`, and has all the same features, such as flexible schema, automatic persistence, and a key value interface. All the methods that are on `ParseObject` also exist in `ParseUser`. The difference is that `ParseUser` has some special additions specific to user accounts.

## `ParseUser` Properties

`ParseUser` has several values that set it apart from `ParseObject`:

*   username: The username for the user (required).
*   password: The password for the user (required on signup).
*   emailAddress: The email address for the user (optional).

We'll go through each of these in detail as we run through the various use cases for users.

## Signing Up

The first thing your app will do is probably ask the user to sign up. The following code illustrates a typical sign up:

```dart
var user =  ParseUser("my name", "my pass", "email@example.com");
// other fields can be set just like with Parse.Object
user.set('phone', '415-392-0202');
var result = await user.signUp();
if (result.success) {
    // success signup
} else {
    var code = result.error?.code.toString() ?? "";
    var message = result.error?.message ?? "";
    print("${"Error: $code"} $message");
}
```

This call will asynchronously create a new user in your Parse App. Before it does this, it also checks to make sure that both the username and email are unique. Also, it securely hashes the password in the cloud using bcrypt. We never store passwords in plaintext, nor will we ever transmit passwords back to the client in plaintext.

Note that we used the `signUp` method, not the `save` method. New `ParseUser`s should always be created using the `signUp` method. Subsequent updates to a user can be done by calling `save`.

If a signup isn't successful, you should read the error object that is returned. The most likely case is that the username or email has already been taken by another user. You should clearly communicate this to your users, and ask them try a different username.

You are free to use an email address as the username. Simply ask your users to enter their email, but fill it in the username property &mdash; `ParseUser` will work as normal. We'll go over how this is handled in the reset password section.

## Logging In

Of course, after you allow users to sign up, you need to let them log in to their account in the future. To do this, you can use the class method `login`.

```dart
final ParseUser user = ParseUser("myname", "mypass", "email@example.com");
var resultLogin = await user.login(doNotSendInstallationID: false);
if(resultLogin.success) {
    // Do stuff after successful login.
}
```

Set `doNotSendInstallationID` to `true` in order to prevent the SDK from sending the installationID to the Server.
This option is especially useful if you are running you application on web and you don't have permission to set `X-Parse-Installation-Id` as an allowed header on your parse-server.


## Verifying Emails

Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the `emailVerified` key to the `Parse.User` object. When a `Parse.User`'s `email` is set or modified, `emailVerified` is set to `false`. Parse then emails the user a link which will set `emailVerified` to `true`.

There are three `emailVerified` states to consider:

1.  `true` - the user confirmed his or her email address by clicking on the link Parse emailed them. `Parse.Users` can never have a `true` value when the user account is first created.
2.  `false` - at the time the `Parse.User` object was last refreshed, the user had not confirmed his or her email address. If `emailVerified` is `false`, consider calling `fetch` on the `ParseUser`.
3.  _missing_ - the `ParseUser` was created when email verification was off or the `ParseUser` does not have an `email`.

## Current User

It would be bothersome if the user had to log in every time they open your app. You can avoid this by using the cached current `ParseUser` object.

Whenever you use any signup or login methods, the user is cached in localStorage, or in any storage you configured via the `Parse.setAsyncStorage` method. You can treat this cache as a session, and automatically assume the user is logged in:

```dart
final ParseUser currentUser = await ParseUser.currentUser();
if (currentUser) {
    // do stuff with the user
} else {
    // show the signup or login page
}
```

You can clear the current user by logging them out:

```dart
final ParseUser user = await ParseUser.currentUser();
user.logout();
```

## Setting the Current User

If you’ve created your own authentication routines, or otherwise logged in a user on the server side, you can now pass the session token to the client and use the `getCurrentUserFromServer` method. This method will ensure the session token is valid before setting the current user.

```dart
ParseUser.getCurrentUserFromServer("session-token-here").then((response) {
// The current user is now set to user.
    final user = response?.result;
}).catchError((error) {
  // The token could not be validated.  
});
```

## Security For User Objects



## Encrypting Current User



## Security For Other Objects



## Resetting Passwords



## Querying



## Associations



## Facebook Users



### Setting up Facebook



### Login & Signup




### Linking



### Facebook SDK and Parse



## Linking Users


### Signing Up and Logging In



#### Linking un-authenticated users


### Custom Authentication Module


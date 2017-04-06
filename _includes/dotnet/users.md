# Users

At the core of many apps, there is a notion of user accounts that lets users access their information in a secure manner. We provide a specialized user class called `ParseUser` that automatically handles much of the functionality required for user account management.

With this class, you'll be able to add user account functionality in your app.

`ParseUser` is a subclass of `ParseObject` and has all the same features, such as flexible schema, automatic persistence, and a key value interface. All the methods that are on `ParseObject` also exist in `ParseUser`. The difference is that ParseUser has some special additions specific to user accounts.

## Properties

`ParseUser` has several properties that set it apart from `ParseObject`:

*   `Username`: The username for the user (required).
*   `Password`: The password for the user (required on signup).
*   `Email`: The email address for the user (optional).

We'll go through each of these in detail as we run through the various use cases for users. Keep in mind that if you set `Username` and `Email` through these properties, you do not need to set it using the indexer on `ParseObject` &mdash; this is set for you automatically.

## Signing Up

The first thing your app will do is probably ask the user to sign up. The following code illustrates a typical sign up:

```cs
public async void SignUpButton_Click(object sender, RoutedEventArgs e)
{
    var user = new ParseUser()
    {
        Username = "my name",
        Password = "my pass",
        Email = "email@example.com"
    };

    // other fields can be set just like with ParseObject
    user["phone"] = "415-392-0202";

    await user.SignUpAsync();
}
```

This call will asynchronously create a new user in your Parse App. Before it does this, it also checks to make sure that both the username and email are unique. Also, it securely hashes the password in the cloud using bcrypt. We never store passwords in plaintext, nor will we ever transmit passwords back to the client in plaintext.

Note that we used the `SignUpAsync` method, not the `SaveAsync` method. New `ParseUser`s should always be created using the `SignUpAsync` method. Subsequent updates to a user can be done by calling `SaveAsync`.

If a signup isn't successful, you should catch the exception thrown by the `SignUpAsync`. The most likely case is that the username or email has already been taken by another user. You should clearly communicate this to your users, and ask them try a different username.

You are free to use an email address as the username. Simply ask your users to enter their email, but fill it in both the `Username` and `Email` properties &mdash; `ParseObject` will work as normal. We'll go over how this is handled in the reset password section.

## Logging In

Of course, after you allow users to sign up, you need to let them log in to their account in the future. To do this, you can use the class method `LogInAsync`.

```cs
try
{
    await ParseUser.LogInAsync("myname", "mypass");
    // Login was successful.
}
catch (Exception e)
{
    // The login failed. Check the error to see why.
}
```

## Verifying Emails

Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the `emailVerified` key to the `ParseUser` object. When a `ParseUser`'s `Email` is set or modified, `emailVerified` is set to `false`. Parse then emails the user a link which will set `emailVerified` to `true`.

There are three `emailVerified` states to consider:

1.  `true` - the user confirmed his or her email address by clicking on the link Parse emailed them. `ParseUser`s can never have a `true` value when the user account is first created.
2.  `false` - at the time the `ParseUser` object was last refreshed, the user had not confirmed his or her email address. If `emailVerified` is `false`, consider calling `FetchAsync` on the `ParseUser`.
3.  _missing_ - the `ParseUser` was created when email verification was off or the `ParseUser` does not have an `email`.

## Current User

It would be bothersome if the user had to log in every time they open your app. You can avoid this by using the cached `ParseUser.CurrentUser` object.

Whenever you use any signup or login methods, the user is cached on disk. You can treat this cache as a session, and automatically assume the user is logged in:

```cs
if (ParseUser.CurrentUser != null)
{
    // do stuff with the user
}
else
{
    // show the signup or login screen
}
```

You can clear the current user by logging them out:

```cs
ParseUser.LogOut();
var currentUser = ParseUser.CurrentUser; // this will now be null
```

## Setting the Current User

If you’ve created your own authentication routines, or otherwise logged in a user on the server side, you can now pass the session token to the client and use the `become` method. This method will ensure the session token is valid before setting the current user.

```cs
try
{
  await ParseUser.becomeAsync("session-token-here");
  // The current user is now set to user.
}
catch (Exception e)
{
  // The token could not be validated.
}
```

## Security For User Objects

The `ParseUser` class is secured by default. Data stored in a `ParseUser` can only be modified by that user. By default, the data can still be read by any client. Thus, some `ParseUser` objects are authenticated and can be modified, whereas others are read-only.

Specifically, you are not able to invoke the `SaveAsync` or `DeleteAsync` methods unless the `ParseUser` was obtained using an authenticated method, like `LogInAsync` or `SignUpAsync`. This ensures that only the user can alter their own data.

The following illustrates this security policy:

```cs
var user = await ParseUser.LogInAsync("my_username", "my_password");
user.Username = "my_new_username"; // attempt to change username
await user.SaveAsync(); // This succeeds, since this user was
                        // authenticated on the device

ParseUser.LogOut();
// Get the user from a non-authenticated method
user = await ParseUser.Query.GetAsync(user.ObjectId);
user.Username = "another_username";

// This will throw an exception, since the ParseUser is not authenticated
await user.SaveAsync();
```

The `ParseUser` obtained from `Current` will always be authenticated.

If you need to check if a `ParseUser` is authenticated, you can check the `IsAuthenticated` property. You do not need to check `IsAuthenticated` with `ParseUser` objects that are obtained via an authenticated method.

## Security For Other Objects

The same security model that applies to the `ParseUser` can be applied to other objects. For any object, you can specify which users are allowed to read the object, and which users are allowed to modify an object. To support this type of security, each object has an [access control list](http://en.wikipedia.org/wiki/Access_control_list), implemented by the `ParseACL` class.

The simplest way to use a `ParseACL` is to specify that an object may only be read or written by a single user. To create such an object, there must first be a logged in `ParseUser`. Then, the `ParseACL` constructor generates a `ParseACL` that limits access to that user. An object's ACL is updated when the object is saved, like any other property. Thus, to create a private note that can only be accessed by the current user:

```cs
var privateNote = new ParseObject("Note");
privateNote["content"] = "This note is private!";
privateNote.ACL = new ParseACL(ParseUser.CurrentUser);
await privateNote.SaveAsync();
```

This note will then only be accessible to the current user, although it will be accessible to any device where that user is signed in. This functionality is useful for applications where you want to enable access to user data across multiple devices, like a personal todo list.

Permissions can also be granted on a per-user basis. You can add permissions individually to a `ParseACL` using `SetReadAccess` and `SetWriteAccess`. For example, let's say you have a message that will be sent to a group of several users, where each of them have the rights to read and delete that message:

```cs
var groupMessage = new ParseObject("Message");
var groupACL = new ParseACL();

// userList is an IEnumerable<ParseUser> with the users we are sending
// this message to.
foreach (var user in userList)
{
    groupACL.SetReadAccess(user, true);
    groupACL.SetWriteAccess(user, true);
}

groupMessage.ACL = groupACL;
await groupMessage.SaveAsync();
```

You can also grant permissions to all users at once using the `PublicReadAccess` and `PublicWriteAccess` properties. This allows patterns like posting comments on a message board. For example, to create a post that can only be edited by its author, but can be read by anyone:

```cs
var publicPost = new ParseObject("Post");
var postACL = new ParseACL(ParseUser.CurrentUser)
{
    PublicReadAccess = true,
    PublicWriteAccess = false
};
publicPost.ACL = postACL;
await publicPost.SaveAsync();
```

Operations that are forbidden, such as deleting an object that you do not have write access to, result in a `ParseException` with a `ObjectNotFound` error code. For security purposes, this prevents clients from distinguishing which object ids exist but are secured, versus which object ids do not exist at all.

## Resetting Passwords

As soon as you introduce passwords into a system, users will forget them. In such cases, our library provides a way to let them securely reset their password.

To kick off the password reset flow, ask the user for their email address, and call:

```cs
await ParseUser.RequestPasswordResetAsync("email@example.com");
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

```cs
var women = await (from user in ParseUser.Query
                   where user.Get<string>("gender") == "female"
                   select user).FindAsync();

// or using LINQ
var women = await ParseUser.Query
    .WhereEqualTo("gender", "female")
    .FindAsync();
```

In addition, you can use `GetAsync` to get a `ParseUser` by id.

## Associations

Associations involving a `ParseUser` work right out of the box. For example, let's say you're making a blogging app. To store a new post for a user and retrieve all their posts:

```cs
// Make a new post
var post = new ParseObject("Post")
{
    { "title", "My New Post" },
    { "body", "This is some great content." },
    { "user", ParseUser.CurrentUser }
};
await post.SaveAsync();

// Find all posts by the current user
var usersPosts = await (from post in ParseObject.GetQuery("Post")
                        where post.Get<ParseUser>("user") == ParseUser.CurrentUser
                        select post).FindAsync();

// or using LINQ
// Make a new post
var post = new ParseObject("Post")
{
    { "title", "My New Post" },
    { "body", "This is some great content." },
    { "user", ParseUser.CurrentUser }
};
await post.SaveAsync();

// Find all posts by the current user
var usersPosts = await ParseObject.GetQuery("Post")
    .WhereEqualTo("user", ParseUser.CurrentUser)
    .FindAsync();
```

## Facebook Users

Parse provides an easy way to integrate Facebook with your application. The `ParseFacebookUtils` class integrates with `ParseUser` to make linking your users to their Facebook identities easy.

Using our Facebook integration, you can associate an authenticated Facebook user with a `ParseUser`. With just a few lines of code, you'll be able to provide a "log in with Facebook" option in your app, and be able to save their data to Parse.

### Setup

To start using Facebook with Parse, you need to:

1.  [Set up a Facebook app](https://developers.facebook.com/apps), if you haven't already. In the "Advanced" tab of your app's settings page, Make sure that your app's "App Type" (in the "Authentication" section) is set to "Native/Desktop".
2.  Add your application's Facebook Application ID on your Parse application's settings page.
3.  In your `Application` constructor, call `ParseFacebookUtils.Initialize()` with your Facebook App ID:

```cs
public App()
{
    // App.xaml initialization
    ParseClient.Initialize("Your Application ID", "Your .NET Key");
    ParseFacebookUtils.Initialize("Your Facebook App Id");
    // Other initialization
}
```

There are two main ways to use Facebook with your Parse users: (1) logging in as a Facebook user and creating a `ParseUser`, or (2) linking Facebook to an existing `ParseUser`.

<div class='tip info'><div>
  It is up to you to record any data that you need from the Facebook user after they authenticate. To accomplish this, you can use the Facebook SDK.
</div></div>

### Login & Signup

`ParseFacebookUtils` provides a way to allow your `ParseUser`s to log in or sign up through Facebook. This is accomplished using the `LogInAsync()` method. To display Facebook's web browser OAuth flow to your users, you'll need to pass `LogInAsync` a web browser control (which you'll usually define in XAML) and dismiss it when you've completed login:

```cs
// Make your browser control visible
ParseUser user = await ParseFacebookUtils.LogInAsync(browser, null);
// Hide your browser control
```

When this code is run, the following happens:

1.  The user is shown the Facebook login dialog.
2.  The user authenticates via Facebook, and your app receives a callback.
3.  Our SDK receives the user's Facebook access data and saves it to a `ParseUser`. If no `ParseUser` exists with the same Facebook ID, then a new `ParseUser` is created.
4.  The awaited `Task` completes and your code continues executing.
5.  The current user reference will be updated to this user.

You may optionally provide a list of strings that specifies what [permissions](https://developers.facebook.com{{ site.baseUrl }}/authentication/permissions/) your app requires from the Facebook user.  For example:

```cs
// Make your browser control visible
try
{
    ParseUser user = await ParseFacebookUtils.LogInAsync(
        browser, new[] { "user_likes", "email" });
    // The user logged in with Facebook!
}
catch
{
    // User cancelled the Facebook login or did not fully authorize.
}
// Hide your browser control
```

`ParseUser` integration doesn't require any permissions to work out of the box (ie. `null` or specifying no permissions is perfectly acceptable). [Read more about permissions on Facebook's developer guide.](https://developers.facebook.com{{ site.baseUrl }}/reference/api/permissions/)

### Linking

If you want to associate an existing `ParseUser` with a Facebook account, you can link it like so:

```cs
if (!ParseFacebookUtils.IsLinked(user))
{
    // Make your browser control visible
    try
    {
        await ParseFacebookUtils.LinkAsync(user, browser, null);
        // The user logged in with Facebook!
    }
    catch
    {
        // User cancelled the Facebook login or did not fully authorize.
    }
    // Hide your browser control
}
```

The steps that happen when linking are very similar to log in. The difference is that on successful login, the existing `ParseUser` is updated with the Facebook information. Future logins via Facebook will now log the user into their existing account.

If you want to unlink a Facebook account from a user, simply do this:

```cs
await ParseFacebookUtils.UnlinkAsync(user);
```


### Single Sign-on for Windows 8

WinRT lets you implement single sign-on with Facebook using its `[WebAuthenticationBroker](http://msdn.microsoft.com/library/windows/apps/br227025)` API. This allows users to log into Facebook once and then share that login across all of their apps, so they don't have to re-enter their username and password for every app.

Parse supports single sign-on with Facebook using this mechanism. Adding it to your app requires just two steps:

* Add your app's Package Security Identifier to your Facebook App settings page under "Windows Store ID".  You can easily get this ID by calling:

```cs
WebAuthenticationBroker.GetCurrentApplicationCallbackUri().AbsoluteUri
```

    The identifier is everything after `"ms-app://"`.

* Instead of showing and hiding a browser control as described above, use the simpler `ParseFacebookUtils` APIs that take only a list of permissions:

```cs
// Log into Facebook using Single Sign-on
ParseUser user = await ParseFacebookUtils.LogInAsync(permissions);

    // Link the current user to Facebook using Single Sign-on
await ParseFacebookUtils.LinkAsync(ParseUser.CurrentUser, permissions);
```

### Single Sign-on for Windows Phone

The Facebook app for Windows Phone makes signing into apps with Facebook easy for users by providing a mechanism for single sign-on. Once a user has signed into the Facebook app on their device, when they sign into apps that use Facebook login, they will not need to re-enter their email address and password for each app. This works by temporarily navigating to the Facebook app in order to provide authorization for the app logging in.

Parse supports single sign-on using this mechanism. To add support to your app:

* You will need to locate your app's product ID. During development, you can find this in your app's WMAppManifest.xml. When you submit your app to the store for the first time, your app will be assigned a new product ID, which you'll need to add to your app as described below. Whenever you use your product ID while following this guide, you should remove any of the following characters: `'-'`, `'{'`, `'}'`.

* You will need to configure your WMAppManifest.xml file [as described here](http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj206987(v=vs.105).aspx#BKMK_URIassociations) to have your app handle URIs with the following protocol:

```cs
<Protocol Name="msft-{ProductId}"
          NavUriFragment="encodedLaunchUri=%s"
          TaskID="_default" />
```

* Add your product ID to your Facebook app settings page under "Windows Phone Store ID".

* Add the following code to your application's App.xaml.cs in the `InitializePhoneApplication()` method:

```cs
RootFrame.Navigating += async (sender, e) =>
{
    if (ParseFacebookUtils.IsLogInRedirect(e.Uri))
    {
        // This code is called when the Facebook app returns control to your app.
        // You must provide a landing page URI, which ParseFacebookUtils will
        // navigate to as it waits for the user to be created or logged into
        // your Parse app.
        var user = await ParseFacebookUtils.EndLogInAsync(sender,
            e, new Uri("/LandingPage.xaml", UriKind.Relative));

            // If you await the return value of this method, you can begin using the
        // new user once it becomes available or catch any errors.
    }
};
```

* To initiate Facebook a Facebook login (and switch to the Facebook app), add the following code:

```cs
ParseFacebookUtils.BeginLogin(permissions);
```

### Facebook SDK and Parse

Microsoft provides an open-source SDK for making Graph API requests to Facebook. The SDK is [available on NuGet](http://www.nuget.org/packages/facebook), and you can learn more about it from [their website](http://www.csharpsdk.org).

To use the Facebook SDK to fetch information about the current user, for example, you would install it using NuGet and then write code similar to this:

```cs
var fb = new FacebookClient();
fb.AccessToken = ParseFacebookUtils.AccessToken;
var me = await fb.GetTaskAsync("me");
```

With the `AccessToken` provided by `ParseFacebookUtils`, you should be able to use your choice of 3rd party Facebook SDKs to interact with Facebook on behalf of your user.

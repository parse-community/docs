# Users

At the core of many apps, there is a notion of user accounts that lets users access their information in a secure manner. We provide a specialized user class called `PFUser` that automatically handles much of the functionality required for user account management.

With this class, you'll be able to add user account functionality in your app.

`PFUser` is a subclass of `PFObject` and has all the same features, such as flexible schema, automatic persistence, and a key value interface. All the methods that are on `PFObject` also exist in `PFUser`. The difference is that PFUser has some special additions specific to user accounts.

## Properties

`PFUser` has several properties that set it apart from `PFObject`:

*   **username**: The username for the user (required).
*   **password**: The password for the user (required on signup).
*   **email**: The email address for the user (optional).

We'll go through each of these in detail as we run through the various use cases for users. Keep in mind that if you set `username` and `email` through these properties, you do not need to set it using the `setObject:forKey:` method &mdash; this is set for you automatically.


## Signing Up

The first thing your app will do is probably ask the user to sign up. The following code illustrates a typical sign up:

<pre><code class="objectivec">
- (void)myMethod {
    PFUser *user = [PFUser user];
    user.username = @"my name";
    user.password = @"my pass";
    user.email = @"email@example.com";

    // other fields can be set just like with PFObject
    user[@"phone"] = @"415-392-0202";

    [user signUpInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
      if (!error) {   // Hooray! Let them use the app now.
      } else {   NSString *errorString = [error userInfo][@"error"];   // Show the errorString somewhere and let the user try again.
      }
    }];
}
</code></pre>
<pre><code class="swift">
func myMethod() {
  var user = PFUser()
  user.username = "myUsername"
  user.password = "myPassword"
  user.email = "email@example.com"
  // other fields can be set just like with PFObject
  user["phone"] = "415-392-0202"

  user.signUpInBackgroundWithBlock {
    (succeeded: Bool, error: NSError?) -> Void in
    if let error = error {
      let errorString = error.userInfo["error"] as? NSString
      // Show the errorString somewhere and let the user try again.
    } else {
      // Hooray! Let them use the app now.
    }
  }
}
</code></pre>

This call will asynchronously create a new user in your Parse App. Before it does this, it also checks to make sure that both the username and email are unique. Also, it securely hashes the password in the cloud using bcrypt. We never store passwords in plaintext, nor will we ever transmit passwords back to the client in plaintext.

Note that we used the `signUp` method, not the `save` method. New `PFUser`s should always be created using the `signUp` method. Subsequent updates to a user can be done by calling `save`.

The `signUp` method comes in various flavors, with the ability to pass back errors, and also synchronous versions. As usual, we highly recommend using the asynchronous versions when possible, so as not to block the UI in your app. You can read more about these specific methods in our [API docs](/docs/ios/).

If a signup isn't successful, you should read the error object that is returned. The most likely case is that the username or email has already been taken by another user. You should clearly communicate this to your users, and ask them try a different username.

You are free to use an email address as the username. Simply ask your users to enter their email, but fill it in the username property &mdash; `PFUser` will work as normal. We'll go over how this is handled in the reset password section.

## Logging In

Of course, after you allow users to sign up, you need to let them log in to their account in the future. To do this, you can use the class method `logInWithUsernameInBackground:password:`.

<pre><code class="objectivec">
[PFUser logInWithUsernameInBackground:@"myname" password:@"mypass"
  block:^(PFUser *user, NSError *error) {
    if (user) {
      // Do stuff after successful login.
    } else {
      // The login failed. Check error to see why.
    }
}];
</code></pre>
<pre><code class="swift">
PFUser.logInWithUsernameInBackground("myname", password:"mypass") {
  (user: PFUser?, error: NSError?) -> Void in
  if user != nil {
    // Do stuff after successful login.
  } else {
    // The login failed. Check error to see why.
  }
}
</code></pre>

## Verifying Emails

Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the `emailVerified` key to the `PFUser` object. When a `PFUser`'s `email` is set or modified, `emailVerified` is set to `false`. Parse then emails the user a link which will set `emailVerified` to `true`.

There are three `emailVerified` states to consider:

1.  `true` - the user confirmed his or her email address by clicking on the link Parse emailed them. `PFUsers` can never have a `true` value when the user account is first created.
2.  `false` - at the time the `PFUser` object was last refreshed, the user had not confirmed his or her email address. If `emailVerified` is `false`, consider calling `refresh:` on the `PFUser`.
3.  **missing** - the `PFUser` was created when email verification was off or the `PFUser` does not have an `email`.


## Current User

It would be bothersome if the user had to log in every time they open your app. You can avoid this by using the cached `currentUser` object.

Whenever you use any signup or login methods, the user is cached on disk. You can treat this cache as a session, and automatically assume the user is logged in:

<pre><code class="objectivec">
PFUser *currentUser = [PFUser currentUser];
if (currentUser) {
    // do stuff with the user
} else {
    // show the signup or login screen
}
</code></pre>
<pre><code class="swift">
var currentUser = PFUser.currentUser()
if currentUser != nil {
  // Do stuff with the user
} else {
  // Show the signup or login screen
}
</code></pre>

You can clear the current user by logging them out:

<pre><code class="objectivec">
[PFUser logOut];
PFUser *currentUser = [PFUser currentUser]; // this will now be nil
</code></pre>
<pre><code class="swift">
PFUser.logOut()
var currentUser = PFUser.currentUser() // this will now be nil
</code></pre>

## Anonymous Users

Being able to associate data and objects with individual users is highly valuable, but sometimes you want to be able to do this without forcing a user to specify a username and password.

An anonymous user is a user that can be created without a username and password but still has all of the same capabilities as any other `PFUser`. After logging out, an anonymous user is abandoned, and its data is no longer accessible.

You can create an anonymous user using `PFAnonymousUtils`:

<pre><code class="objectivec">
[PFAnonymousUtils logInWithBlock:^(PFUser *user, NSError *error) {
    if (error) {
      NSLog(@"Anonymous login failed.");
    } else {
      NSLog(@"Anonymous user logged in.");
    }
}];
</code></pre>
<pre><code class="swift">
PFAnonymousUtils.logInWithBlock {
  (user: PFUser?, error: NSError?) -> Void in
  if error != nil || user == nil {
    print("Anonymous login failed.")
  } else {
    print("Anonymous user logged in.")
  }
}
</code></pre>

You can convert an anonymous user into a regular user by setting the username and password, then calling `signUp`, or by logging in or linking with a service like [Facebook](#fbusers) or [Twitter](#twitterusers). The converted user will retain all of its data.  To determine whether the current user is an anonymous user, you can check `PFAnonymousUtils isLinkedWithUser`:

<pre><code class="objectivec">
if ([PFAnonymousUtils isLinkedWithUser:[PFUser currentUser]]) {
    [self enableSignUpButton];
} else {
    [self enableLogOutButton];
}
</code></pre>
<pre><code class="swift">
if PFAnonymousUtils.isLinkedWithUser(PFUser.currentUser()) {
  self.enableSignUpButton()
} else {
  self.enableLogOutButton()
}
</code></pre>

Anonymous users can also be automatically created for you without requiring a network request, so that you can begin working with your user immediately when your application starts.  When you enable automatic anonymous user creation at application startup, `[PFUser currentUser]` will never be `nil`. The user will automatically be created in the cloud the first time the user or any object with a relation to the user is saved.  Until that point, the user's object ID will be `nil`.  Enabling automatic user creation makes associating data with your users painless.  For example, in your `application:didFinishLaunchingWithOptions:` function, you might write:

<pre><code class="objectivec">
[PFUser enableAutomaticUser];
[[PFUser currentUser] incrementKey:@"RunCount"];
[[PFUser currentUser] saveInBackground];
</code></pre>
<pre><code class="swift">
PFUser.enableAutomaticUser()
PFUser.currentUser().incrementKey("RunCount")
PFUser.currentUser().saveInBackground()
</code></pre>

## Setting the Current User

If you’ve created your own authentication routines, or otherwise logged in a user on the server side, you can now pass the session token to the client and use the `become` method. This method will ensure the session token is valid before setting the current user.

<pre><code class="objectivec">
[PFUser becomeInBackground:@"session-token-here" block:^(PFUser *user, NSError *error) {
  if (error) {
    // The token could not be validated.
  } else {
    // The current user is now set to user.
  }
}];
</code></pre>
<pre><code class="swift">
PFUser.becomeInBackground("session-token-here", {
  (user: PFUser?, error: NSError?) -> Void in
  if error != nil {
    // The token could not be validated.
  } else {
    // The current user is now set to user.
  }
})
</code></pre>

## Security For User Objects

The `PFUser` class is secured by default. Data stored in a `PFUser` can only be modified by that user. By default, the data can still be read by any client. Thus, some `PFUser` objects are authenticated and can be modified, whereas others are read-only.

Specifically, you are not able to invoke any of the `save` or `delete` methods unless the `PFUser` was obtained using an authenticated method, like `logIn` or `signUp`. This ensures that only the user can alter their own data.

The following illustrates this security policy:

<pre><code class="objectivec">
PFUser *user = [PFUser logInWithUsername:@"my_username" password:@"my_password"];
user.username = "my_new_username"; // attempt to change username
[user save]; // This succeeds, since the user was authenticated on the device

// Get the user from a non-authenticated method
PFQuery *query = [PFUser query];
PFUser *userAgain = (PFUser *)[query getObjectWithId:user.objectId];

userAgain.username = "another_username";

// This will throw an exception, since the PFUser is not authenticated
[userAgain save];
</code></pre>
<pre><code class="swift">
var user = PFUser.logInWithUsername("my_username", password:"my_password")
user.username = "my_new_username" // attempt to change username
user.save() // This succeeds, since the user was authenticated on the device

// Get the user from a non-authenticated method
var query = PFUser.query()
var userAgain = query.getObjectWithId(user.objectId) as PFUser

userAgain.username = "another_username"

// This will crash, since the PFUser is not authenticated
userAgain.save()
</code></pre>

The `PFUser` obtained from `currentUser` will always be authenticated.

If you need to check if a `PFUser` is authenticated, you can invoke the `isAuthenticated` method. You do not need to check `isAuthenticated` with `PFUser` objects that are obtained via an authenticated method.

## Security For Other Objects

The same security model that applies to the `PFUser` can be applied to other objects. For any object, you can specify which users are allowed to read the object, and which users are allowed to modify an object. To support this type of security, each object has an [access control list](http://en.wikipedia.org/wiki/Access_control_list), implemented by the `PFACL` class.

The simplest way to use a `PFACL` is to specify that an object may only be read or written by a single user. To create such an object, there must first be a logged in `PFUser`. Then, the `ACLWithUser` method generates a `PFACL` that limits access to that user. An object's ACL is updated when the object is saved, like any other property. Thus, to create a private note that can only be accessed by the current user:

<pre><code class="objectivec">
PFObject *privateNote = [PFObject objectWithClassName:@"Note"];
privateNote[@"content"] = @"This note is private!";
privateNote.ACL = [PFACL ACLWithUser:[PFUser currentUser]];
[privateNote saveInBackground];
</code></pre>
<pre><code class="swift">
var privateNote = PFObject(className:"Note")
privateNote["content"] = "This note is private!"
privateNote.ACL = PFACL.ACLWithUser(PFUser.currentUser())
privateNote.saveInBackground()
</code></pre>

This note will then only be accessible to the current user, although it will be accessible to any device where that user is signed in. This functionality is useful for applications where you want to enable access to user data across multiple devices, like a personal todo list.

Permissions can also be granted on a per-user basis. You can add permissions individually to a `PFACL` using `setReadAccess:forUser:` and `setWriteAccess:forUser:`. For example, let's say you have a message that will be sent to a group of several users, where each of them have the rights to read and delete that message:

<pre><code class="objectivec">
PFObject *groupMessage = [PFObject objectWithClassName:@"Message"];
PFACL *groupACL = [PFACL ACL];

// userList is an NSArray with the users we are sending this message to.
for (PFUser *user in userList) {
    [groupACL setReadAccess:YES forUser:user];
    [groupACL setWriteAccess:YES forUser:user];
}

groupMessage.ACL = groupACL;
[groupMessage saveInBackground];
</code></pre>
<pre><code class="swift">
var groupMessage = PFObject(className:"Message")
var groupACL = PFACL.ACL()

// userList is an NSArray with the users we are sending this message to.
for (user : PFUser in userList) {
    groupACL.setReadAccess(true, forUser:user)
    groupACL.setWriteAccess(true, forUser:user)
}

groupMessage.ACL = groupACL
groupMessage.saveInBackground()
</code></pre>

You can also grant permissions to all users at once using `setPublicReadAccess:` and `setPublicWriteAccess:`. This allows patterns like posting comments on a message board. For example, to create a post that can only be edited by its author, but can be read by anyone:

<pre><code class="objectivec">
PFObject *publicPost = [PFObject objectWithClassName:@"Post"];
PFACL *postACL = [PFACL ACLWithUser:[PFUser currentUser]];
[postACL setPublicReadAccess:YES];
publicPost.ACL = postACL;
[publicPost saveInBackground];
</code></pre>
<pre><code class="swift">
var publicPost = PFObject(className:"Post")
var postACL = PFACL.ACLWithUser(PFUser.currentUser())
postACL.setPublicReadAccess(true)
publicPost.ACL = postACL
publicPost.saveInBackground()
</code></pre>

To help ensure that your users' data is secure by default, you can set a default ACL to be applied to all newly-created `PFObjects`:

<pre><code class="objectivec">
[PFACL setDefaultACL:defaultACL withAccessForCurrentUser:YES];
</code></pre>
<pre><code class="swift">
PFACL.setDefaultACL(defaultACL, withAccessForCurrentUser:true)
</code></pre>

In the code above, the second parameter to setDefaultACL tells Parse to ensure that the default ACL assigned at the time of object creation allows read and write access to the current user at that time.  Without this setting, you would need to reset the defaultACL every time a user logs in or out so that the current user would be granted access appropriately.  With this setting, you can ignore changes to the current user until you explicitly need to grant different kinds of access.

Default ACLs make it easy to create apps that follow common access patterns. An application like Twitter, for example, where user content is generally visible to the world, might set a default ACL such as:

<pre><code class="objectivec">
PFACL *defaultACL = [PFACL ACL];
[defaultACL setPublicReadAccess:YES];
[PFACL setDefaultACL:defaultACL withAccessForCurrentUser:YES];
</code></pre>
<pre><code class="swift">
var defaultACL = PFACL.ACL()
defaultACL.setPublicReadAccess(true)
PFACL.setDefaultACL(defaultACL, withAccessForCurrentUser:true)
</code></pre>

For an app like Dropbox, where a user's data is only accessible by the user itself unless explicit permission is given, you would provide a default ACL where only the current user is given access:

<pre><code class="objectivec">
[PFACL setDefaultACL:[PFACL ACL] withAccessForCurrentUser:YES];
</code></pre>
<pre><code class="swift">
PFACL.setDefaultACL(PFACL.ACL(), withAccessForCurrentUser:true)
</code></pre>

For an application that logs data to Parse but doesn't provide any user access to that data, you would deny access to the current user while providing a restrictive ACL:

<pre><code class="objectivec">
[PFACL setDefaultACL:[PFACL ACL] withAccessForCurrentUser:NO];
</code></pre>
<pre><code class="swift">
PFACL.setDefaultACL(PFACL.ACL(), withAccessForCurrentUser:false)
</code></pre>

Operations that are forbidden, such as deleting an object that you do not have write access to, result in a `kPFErrorObjectNotFound` error code. For security purposes, this prevents clients from distinguishing which object ids exist but are secured, versus which object ids do not exist at all.

## Resetting Passwords

It's a fact that as soon as you introduce passwords into a system, users will forget them. In such cases, our library provides a way to let them securely reset their password.

To kick off the password reset flow, ask the user for their email address, and call:

<pre><code class="objectivec">
[PFUser requestPasswordResetForEmailInBackground:@"email@example.com"];
</code></pre>
<pre><code class="swift">
PFUser.requestPasswordResetForEmailInBackground("email@example.com")
</code></pre>

This will attempt to match the given email with the user's email or username field, and will send them a password reset email. By doing this, you can opt to have users use their email as their username, or you can collect it separately and store it in the email field.

The flow for password reset is as follows:

1.  User requests that their password be reset by typing in their email.
2.  Parse sends an email to their address, with a special password reset link.
3.  User clicks on the reset link, and is directed to a special Parse page that will allow them type in a new password.
4.  User types in a new password. Their password has now been reset to a value they specify.

Note that the messaging in this flow will reference your app by the name that you specified when you created this app on Parse.

## Querying

To query for users, you need to use the special user query:

<pre><code class="objectivec">
PFQuery *query = [PFUser query];
[query whereKey:@"gender" equalTo:@"female"]; // find all the women
NSArray *girls = [query findObjects];
</code></pre>
<pre><code class="swift">
var query = PFUser.query()
query.whereKey("gender", equalTo:"female")
var girls = query.findObjects()
</code></pre>

In addition, you can use `getUserObjectWithId:objectId` to get a `PFUser` by id.

## Associations

Associations involving a `PFUser` work right out of the box. For example, let's say you're making a blogging app. To store a new post for a user and retrieve all their posts:

<pre><code class="objectivec">
PFUser *user = [PFUser currentUser];

// Make a new post
PFObject *post = [PFObject objectWithClassName:@"Post"];
post[@"title"] = @"My New Post";
post[@"body"] = @"This is some great content.";
post[@"user"] = user;
[post save];

// Find all posts by the current user
PFQuery *query = [PFQuery queryWithClassName:@"Post"];
[query whereKey:@"user" equalTo:user];
NSArray *usersPosts = [query findObjects];
</code></pre>
<pre><code class="swift">
var user = PFUser.currentUser()

// Make a new post
var post = PFObject(className:"Post")
post["title"] = "My New Post"
post["body"] = "This is some great content."
post["user"] = user
post.save()
</code></pre>

## Facebook Users

Parse provides an easy way to integrate Facebook with your application. The Facebook SDK can be used with our SDK, and is integrated with the `PFUser` class to make linking your users to their Facebook identities easy.

Using our Facebook integration, you can associate an authenticated Facebook user with a `PFUser`. With just a few lines of code, you'll be able to provide a "log in with Facebook" option in your app, and be able to save the user's data to Parse.

**Note:** Parse SDK is compatible both with Facebook SDK 3.x and 4.x for iOS. These instructions are for Facebook SDK 4.x.

### Setup

To start using Facebook with Parse, you need to:

1.  [Set up a Facebook app](https://developers.facebook.com/apps), if you haven't already.
2.  Add your application's Facebook Application ID on your Parse application's settings page.
3.  Follow Facebook's instructions for [getting started with the Facebook SDK](https://developers.facebook.com/docs/ios/getting-started) to create an app linked to the Facebook SDK. Double-check that you have added FacebookAppID and URL Scheme values to your application's .plist file.
4.  Download and unzip [Parse iOS SDK](/downloads/ios/parse-library/latest), if you haven't already.
5.  Add `ParseFacebookUtils.framework` to your Xcode project, by dragging it into your project folder target.

There's also two code changes you'll need to make. First, add the following to your `application:didFinishLaunchingWithOptions:` method, after you've initialized the Parse SDK.

<pre><code class="objectivec">
// AppDelegate.m
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <ParseFacebookUtilsV4/PFFacebookUtils.h>

@implementation AppDelegate

- (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Parse setApplicationId:@"parseAppId" clientKey:@"parseClientKey"];
  [PFFacebookUtils initializeFacebookWithApplicationLaunchOptions:launchOptions];
}

</code></pre>
<pre><code class="swift">
import FBSDKCoreKit
import ParseFacebookUtilsV4

// AppDelegate.swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
  Parse.setApplicationId("parseAppId", clientKey:"parseClientKey")
  PFFacebookUtils.initializeFacebookWithApplicationLaunchOptions(launchOptions)
}
</code></pre>

Next, add the following handlers in your app delegate.

<pre><code class="objectivec">
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}
</code></pre>

<pre><code class="swift">
func application(application: UIApplication,
                 openURL url: NSURL,
                 sourceApplication: String?,
                 annotation: AnyObject?) -> Bool {
  return FBSDKApplicationDelegate.sharedInstance().application(application,
                                                             openURL: url,
                                                             sourceApplication: sourceApplication,
                                                             annotation: annotation)
}

//Make sure it isn't already declared in the app delegate (possible redefinition of func error)
func applicationDidBecomeActive(application: UIApplication) {
  FBSDKAppEvents.activateApp()
}
</code></pre>

There are two main ways to use Facebook with your Parse users: (1) to log in (or sign up) as a Facebook user and creating a `PFUser`, or (2) linking Facebook to an existing `PFUser`.

<div class='tip info'><div>
  It is up to you to record any data that you need from the Facebook user after they authenticate. To accomplish this, you'll need to do a graph query using the Facebook SDK.
</div></div>

### Log In & Sign Up

`PFUser` provides a way to allow your users to log in or sign up through Facebook. This is done by using the `logInInBackgroundWithReadPermissions` method like so:

<pre><code class="objectivec">
[PFFacebookUtils logInInBackgroundWithReadPermissions:permissions block:^(PFUser *user, NSError *error) {
  if (!user) {
    NSLog(@"Uh oh. The user cancelled the Facebook login.");
  } else if (user.isNew) {
    NSLog(@"User signed up and logged in through Facebook!");
  } else {
    NSLog(@"User logged in through Facebook!");
  }
}];
</code></pre>
<pre><code class="swift">
PFFacebookUtils.logInInBackground(withReadPermissions: permissions) {
  (user: PFUser?, error: Error?) in
  if let u = user {
    if u.isNew {
      print("User signed up and logged in through Facebook!")
    } else {
      print("User logged in through Facebook!")
    }
  } else {
    print("Uh oh. The user cancelled the Facebook login.")
  }
}
</code></pre>

When this code is run, the following happens:

1.  The user is shown the Facebook login dialog.
2.  The user authenticates via Facebook, and your app receives a callback using `handleOpenURL`.
3.  Our SDK receives the user's Facebook access data and saves it to a `PFUser`. If no `PFUser` exists with the same Facebook ID, then a new `PFUser` is created.
4.  Your code block is called with the user.
5.  The current user reference will be updated to this user.

The permissions argument is an array of strings that specifies what permissions your app requires from the Facebook user. These permissions must only include read permissions. The `PFUser` integration doesn't require any permissions to work out of the box. [Read more permissions on Facebook's developer guide.](https://developers.facebook.com/docs/reference/api/permissions/)

To acquire publishing permissions for a user so that your app can, for example, post status updates on their behalf, you must call `[PFFacebookUtils logInInBackgroundWithPublishPermissions:]`:

<pre><code class="objectivec">
[PFFacebookUtils logInInBackgroundWithPublishPermissions:@[ @"publish_actions" ] block:^(PFUser *user, NSError *error) {
  if (!user) {
    NSLog(@"Uh oh. The user cancelled the Facebook login.");
  } else {
    NSLog(@"User now has publish permissions!");
  }
}];
</code></pre>
<pre><code class="swift">
PFFacebookUtils.logInInBackgroundWithPublishPermissions(["publish_actions"], {
  (user: PFUser?, error: NSError?) -> Void in
  if user != nil {
    // Your app now has publishing permissions for the user
  }
})
</code></pre>

### Linking

If you want to associate an existing `PFUser` to a Facebook account, you can link it like so:

<pre><code class="objectivec">
if (![PFFacebookUtils isLinkedWithUser:user]) {
  [PFFacebookUtils linkUserInBackground:user withReadPermissions:nil block:^(BOOL succeeded, NSError *error) {
    if (succeeded) {
      NSLog(@"Woohoo, user is linked with Facebook!");
    }
  }];
}
</code></pre>
<pre><code class="swift">
if !PFFacebookUtils.isLinkedWithUser(user) {
  PFFacebookUtils.linkUserInBackground(user, withReadPermissions: nil, {
    (succeeded: Bool?, error: NSError?) -> Void in
    if succeeded {
      print("Woohoo, the user is linked with Facebook!")
    }
  })
}
</code></pre>

The steps that happen when linking are very similar to log in. The difference is that on successful login, the existing `PFUser` is updated with the Facebook information. Future logins via Facebook will now log in the user to their existing account.

If you want to unlink Facebook from a user, simply do this:

<pre><code class="objectivec">
[PFFacebookUtils unlinkUserInBackground:user block:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    NSLog(@"The user is no longer associated with their Facebook account.");
  }
}];
</code></pre>
<pre><code class="swift">
PFFacebookUtils.unlinkUserInBackground(user, {
  (succeeded: Bool?, error: NSError?) -> Void in
  if succeeded {
    print("The user is no longer associated with their Facebook account.")
  }
})
</code></pre>

### Log In / Link via Token

In the previous sections, you've seen how `PFFacebookUtils` can be used to log in with the Facebook SDK and create a `PFUser` or link with existing ones. If you have already integrated the Facebook SDK and have a `FBSDKAccessToken`, there is an option to directly log in or link the users like this:

<pre><code class="objectivec">
FBSDKAccessToken *accessToken = ...; // Use existing access token.

// Log In (create/update currentUser) with FBSDKAccessToken
[PFFacebookUtils logInInBackgroundWithAccessToken:accessToken
                                            block:^(PFUser *user, NSError *error) {
  if (!user) {
    NSLog(@"Uh oh. There was an error logging in.");
  } else {
    NSLog(@"User logged in through Facebook!");
  }
}];

//
// or
//

// Link PFUser with FBSDKAccessToken
[PFFacebookUtils linkUserInBackground:user
                      withAccessToken:accessToken
                                block:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    NSLog(@"Woohoo, the user is linked with Facebook!");
  }
}];
</code></pre>
<pre><code class="swift">
let accessToken: FBSDKAccessToken = ...; // Use existing access token.

// Log In (create/update currentUser) with FBSDKAccessToken
PFFacebookUtils.logInInBackgroundWithAccessToken(accessToken, {
  (user: PFUser?, error: NSError?) -> Void in
  if user != nil {
    print("User logged in through Facebook!")
  } else {
    print("Uh oh. There was an error logging in.")
  }
})

//
// or
//

// Link PFUser with FBSDKAccessToken
PFFacebookUtils.linkUserInBackground(user, withAccessToken: accessToken, {
  (succeeded: Bool?, error: NSError?) -> Void in
  if succeeded {
    print("Woohoo, the user is linked with Facebook!")
  }
})
</code></pre>

### Additional Permissions

Since Facebook SDK v4.0 - it is required to request **read** and **publish** permissions separately. With Parse SDK integration you can do that by logging in with read permissions first, and later, when the user wants to post to Facebook - linking a user with new set of publish permissions. This also works the other way around: logging in with publish permissions and linking with additional read permissions.

<pre><code class="objectivec">
// Log In with Read Permissions
[PFFacebookUtils logInInBackgroundWithReadPermissions:permissions block:^(PFUser *user, NSError *error) {
  if (!user) {
    NSLog(@"Uh oh. The user cancelled the Facebook login.");
  } else if (user.isNew) {
    NSLog(@"User signed up and logged in through Facebook!");
  } else {
    NSLog(@"User logged in through Facebook!");
  }
}];

// Request new Publish Permissions
[PFFacebookUtils linkUserInBackground:[PFUser currentUser]
                withPublishPermissions:@[ @"publish_actions"]
                                block:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    NSLog(@"User now has read and publish permissions!");
  }
}];
</code></pre>
<pre><code class="swift">
// Log In with Read Permissions
PFFacebookUtils.logInInBackgroundWithReadPermissions(permissions, {
  (user: PFUser?, error: NSError?) -> Void in
  if let user = user {
    if user.isNew {
      print("User signed up and logged in through Facebook!")
    } else {
      print("User logged in through Facebook!")
    }
  } else {
    print("Uh oh. The user cancelled the Facebook login.")
  }
})

// Request new Publish Permissions
PFFacebookUtils.linkUserInBackground(user, withPublishPermissions: ["publish_actions"], {
  (succeeded: Bool?, error: NSError?) -> Void in
  if succeeded {
    print("User now has read and publish permissions!")
  }
})
</code></pre>

### Facebook SDK and Parse

The Facebook iOS SDK provides a number of helper classes for interacting with Facebook's API. Generally, you will use the `FBSDKGraphRequest` class to interact with Facebook on behalf of your logged-in user. [You can read more about the Facebook SDK here](https://developers.facebook.com/docs/reference/ios/current).

To access the user's Facebook access token, you can simply call `[FBSDKAccessToken currentAccessToken]` to access the `FBSDKAccessToken` instance, which can be passed to `FBSDKGraphRequest`s.</p>

## Twitter Users

As with Facebook, Parse also provides an easy way to integrate Twitter authentication into your application. The Parse SDK provides a straightforward way to authorize and link a Twitter account to your `PFUser`s. With just a few lines of code, you'll be able to provide a "log in with Twitter" option in your app, and be able to save their data to Parse.

### Setup

To start using Twitter with Parse, you need to:

1.  [Set up a Twitter app](https://dev.twitter.com/apps), if you haven't already.
2.  Add your application's Twitter consumer key on your Parse application's settings page.
3.  When asked to specify a "Callback URL" for your Twitter app, please insert a valid URL. This value will not be used by your iOS or Android application, but is necessary in order to enable authentication through Twitter.
4.  Add the `Accounts.framework` and `Social.framework` libraries to your Xcode project.
5.  Add the following where you initialize the Parse SDK, such as in `application:didFinishLaunchingWithOptions:`.
<pre><code class="objectivec">
[PFTwitterUtils initializeWithConsumerKey:@"YOUR CONSUMER KEY"
                           consumerSecret:@"YOUR CONSUMER SECRET"];
</code></pre>
<pre><code class="swift">
PFTwitterUtils.initializeWithConsumerKey("YOUR CONSUMER KEY",  consumerSecret:"YOUR CONSUMER SECRET")
</code></pre>

If you encounter any issues that are Twitter-related, a good resource is the [official Twitter documentation](https://dev.twitter.com/docs).

There are two main ways to use Twitter with your Parse users: (1) logging in as a Twitter user and creating a `PFUser`, or (2) linking Twitter to an existing `PFUser`.

### Login & Signup

`PFTwitterUtils` provides a way to allow your `PFUser`s to log in or sign up through Twitter. This is accomplished using the `logInWithBlock` or `logInWithTarget` messages:

<pre><code class="objectivec">
[PFTwitterUtils logInWithBlock:^(PFUser *user, NSError *error) {
    if (!user) {
      NSLog(@"Uh oh. The user cancelled the Twitter login.");
      return;
    } else if (user.isNew) {
      NSLog(@"User signed up and logged in with Twitter!");
    } else {
      NSLog(@"User logged in with Twitter!");
    }
}];
</code></pre>
<pre><code class="swift">
PFTwitterUtils.logInWithBlock {
  (user: PFUser?, error: NSError?) -> Void in
  if let user = user {
    if user.isNew {
      print("User signed up and logged in with Twitter!")
    } else {
      print("User logged in with Twitter!")
    }
  } else {
    print("Uh oh. The user cancelled the Twitter login.")
  }
}
</code></pre>

When this code is run, the following happens:

1.  The user is shown the Twitter login dialog.
2.  The user authenticates via Twitter, and your app receives a callback.
3.  Our SDK receives the Twitter data and saves it to a `PFUser`. If it's a new user based on the Twitter handle, then that user is created.
4.  Your `block` is called with the user.

### Twitter Linking

If you want to associate an existing `PFUser` with a Twitter account, you can link it like so:

<pre><code class="objectivec">
if (![PFTwitterUtils isLinkedWithUser:user]) {
    [PFTwitterUtils linkUser:user block:^(BOOL succeeded, NSError *error) {
        if ([PFTwitterUtils isLinkedWithUser:user]) {
          NSLog(@"Woohoo, user logged in with Twitter!");
        }
    }];
}
</code></pre>
<pre><code class="swift">
if !PFTwitterUtils.isLinkedWithUser(user) {
  PFTwitterUtils.linkUser(user, {
    (succeeded: Bool?, error: NSError?) -> Void in
    if PFTwitterUtils.isLinkedWithUser(user) {
      print("Woohoo, user logged in with Twitter!")
    }
  })
}
</code></pre>

The steps that happen when linking are very similar to log in. The difference is that on successful login, the existing `PFUser` is updated with the Twitter information. Future logins via Twitter will now log the user into their existing account.

If you want to unlink Twitter from a user, simply do this:

<pre><code class="objectivec">
[PFTwitterUtils unlinkUserInBackground:user block:^(BOOL succeeded, NSError *error) {
    if (!error && succeeded) {
      NSLog(@"The user is no longer associated with their Twitter account.");
    }
}];
</code></pre>
<pre><code class="swift">
PFTwitterUtils.unlinkUserInBackground(user, {
  (succeeded: Bool?, error: NSError?) -> Void in
  if error == nil && succeeded {
    print("The user is no longer associated with their Twitter account.")
  }
})
</code></pre>

### Twitter API Calls

Our SDK provides a straightforward way to sign your API HTTP requests to the [Twitter REST API](https://dev.twitter.com/docs/api) when your app has a Twitter-linked `PFUser`.  To make a request through our API, you can use the `PF_Twitter` singleton provided by `PFTwitterUtils`:

<pre><code class="objectivec">
NSURL *verify = [NSURL URLWithString:@"https://api.twitter.com/1.1/account/verify_credentials.json"];
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:verify];
[[PFTwitterUtils twitter] signRequest:request];
NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request
                                                             completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
  // Check for error
  // Data will contain the response data
}];
[task resume];
</code></pre>
<pre><code class="swift">
let verify = NSURL(string: "https://api.twitter.com/1.1/account/verify_credentials.json")
var request = NSMutableURLRequest(URL: verify!)
PFTwitterUtils.twitter()!.signRequest(request)
let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
  // Check for error
  // Data will contain the response data
}
task.resume()
</code></pre>

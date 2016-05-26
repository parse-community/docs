# Security

As your app development progresses, you will want to use Parse's security features in order to safeguard data. This document explains the ways in which you can secure your apps.

If your app is compromised, it's not only you as the developer who suffers, but potentially the users of your app as well. Continue reading for our suggestions for sensible defaults and precautions to take before releasing your app into the wild.

## Client vs. Server

When an app first connects to Parse, it identifies itself with an Application ID and a Client key (or REST Key, or .NET Key, or JavaScript Key, depending on which platform you're using). These are not secret and by themselves they do not secure an app. These keys are shipped as a part of your app, and anyone can decompile your app or proxy network traffic from their device to find your client key. This exploit is even easier with JavaScript — one can simply "view source" in the browser and immediately find your client key.

This is why Parse has many other security features to help you secure your data. The client key is given out to your users, so anything that can be done with just the client key is doable by the general public, even malicious hackers.

The master key, on the other hand, is definitely a security mechanism. Using the master key allows you to bypass all of your app's security mechanisms, such as [class-level permissions](#security-class-level-permissions) and [ACLs](#security-object-level-access-control). Having the master key is like having root access to your app's servers, and you should guard your master key with the same zeal with which you would guard your production machines' root password.

The overall philosophy is to limit the power of your clients (using client keys), and to perform any sensitive actions requiring the master key in Cloud Code. You'll learn how to best wield this power in the section titled [Implementing Business Logic in Cloud Code](#security-implementing-business-logic-in-cloud-code).

A final note: All connections are made with HTTPS and SSL, and Parse will reject all non-HTTPS connections. As a result, you don't need to worry about man-in-the-middle attacks.

## Class-Level Permissions

The second level of security is at the schema and data level. Enforcing security measures at this level will restrict how and when client applications can access and create data on Parse. When you first begin developing your Parse application, all of the defaults are set so that you can be a more productive developer. For example:

*   A client application can create new classes on Parse
*   A client application can add fields to classes
*   A client application can modify or query for objects on Parse

You can configure any of these permissions to apply to everyone, no one, or to specific users or roles in your app. Roles are groups that contain users or other roles, which you can assign to an object to restrict its use. Any permission granted to a role is also granted to any of its children, whether they are users or other roles, enabling you to create an access hierarchy for your apps. Each of [the Parse guides](/docs) includes a detailed description of employing Roles in your apps.

Once you are confident that you have the right classes and relationships between classes in your app, you should begin to lock it down by doing the following:

Almost every class that you create should have these permissions tweaked to some degree. For classes where every object has the same permissions, class-level settings will be most effective. For example, one common use case entails having a class of static data that can be read by anyone but written by no one.

### Restricting class creation

As a start, you can configure your application so that clients cannot create new classes on Parse. This is done from the Settings tab on the Data Browser. Scroll down to the **App Permissions** section and turn off **Allow client class creation**. Once enabled, classes may only be created from the Data Browser. This will prevent attackers from filling your database with unlimited, arbitrary new classes.

![]({{ /assets/images/client_class_creation.png | prepend: site.baseurl }})

### Configuring Class-Level Permissions

Parse lets you specify what operations are allowed per class. This lets you restrict the ways in which clients can access or modify your classes. To change these settings, go to the Data Browser, select a class, and click the "Security" button.

You can configure the client's ability to perform each of the following operations for the selected class:

* **Read**:

  * **Get**: With Get permission, users can fetch objects in this table if they know their objectIds.

  * **Find**: Anyone with Find permission can query all of the objects in the table, even if they don’t know their objectIds. Any table with public Find permission will be completely readable by the public, unless you put an ACL on each object.

* **Write**:

  * **Update**: Anyone with Update permission can modify the fields of any object in the table that doesn't have an ACL. For publicly readable data, such as game levels or assets, you should disable this permission.

  * **Create**: Like Update, anyone with Create permission can create new objects of a class. As with the Update permission, you'll probably want to turn this off for publicly readable data.

  * **Delete**: With this permission, people can delete any object in the table that doesn't have an ACL. All they need is its objectId.

* **Add fields**: Parse classes have schemas that are inferred when objects are created. While you're developing your app, this is great, because you can add a new field to your object without having to make any changes on the backend. But once you ship your app, it's very rare to need to add new fields to your classes automatically. You should pretty much always turn off this permission for all of your classes when you submit your app to the public.

For each of the above actions, you can grant permission to all users (which is the default), or lock permissions down to a list of roles and users. For example, a class that should be available to all users would be set to read-only by only enabling get and find. A logging class could be set to write-only by only allowing creates. You could enable moderation of user-generated content by providing update and delete access to a particular set of users or roles.

## Object-Level Access Control

Once you've locked down your schema and class-level permissions, it's time to think about how data is accessed by your users. Object-level access control enables one user's data to be kept separate from another's, because sometimes different objects in a class need to be accessible by different people. For example, a user’s private personal data should be accessible only to them.

Parse also supports the notion of anonymous users for those apps that want to store and protect user-specific data without requiring explicit login.

When a user logs into an app, they initiate a session with Parse. Through this session they can add and modify their own data but are prevented from modifying other users' data.

### Access Control Lists

The easiest way to control who can access which data is through access control lists, commonly known as ACLs. The idea behind an ACL is that each object has a list of users and roles along with what permissions that user or role has. A user needs read permissions (or must belong to a role that has read permissions) in order to retrieve an object's data, and a user needs write permissions (or must belong to a role that has write permissions) in order to update or delete that object.

Once you have a User, you can start using ACLs. Remember: Users can be created through traditional username/password signup, through a third-party login system like Facebook or Twitter, or even by using Parse's [automatic anonymous users](/docs/ios/guide#users-anonymous-users) functionality. To set an ACL on the current user's data to not be publicly readable, all you have to do is:

```objc
PFUser *user = [PFUser currentUser];
user.ACL = [PFACL ACLWithUser:user];
```
{: .common-lang-block .objc }

```swift
if let user = PFUser.currentUser() {
    user.ACL = PFACL(user: user)
}
```
{: .common-lang-block .swift }

```java
ParseUser user = ParseUser.getCurrentUser();
user.setACL(new ParseACL(user));
```
{: .common-lang-block .java }

```js
var user = Parse.User.current();
user.setACL(new Parse.ACL(user));
```
{: .common-lang-block .js }

```csharp
var user = ParseUser.CurrentUser;
user.ACL = new ParseACL(user);
```
{: .common-lang-block .csharp }

```php
$user = ParseUser::getCurrentUser();
$user->setACL(new ParseACL($user))
```
{: .common-lang-block .php }

```bash
# No command line example
```
{: .common-lang-block .bash }

```cpp
// No C++ example
```
{: .common-lang-block .cpp }

Most apps should do this. If you store any sensitive user data, such as email addresses or phone numbers, you need to set an ACL like this so that the user's private information isn't visible to other users. If an object doesn't have an ACL, it's readable and writeable by everyone. The only exception is the `_User` class. We never allow users to write each other's data, but they can read it by default. (If you as the developer need to update other `_User` objects, remember that your master key can provide the power to do this.)

To make it super easy to create user-private ACLs for every object, we have a way to set a default ACL that will be used for every new object you create:

```objc
[PFACL setDefaultACL:[PFACL ACL] withAccessForCurrentUser:YES];
```
{: .common-lang-block .objc }

```swift
PFACL.setDefaultACL(PFACL(), withAccessForCurrentUser: true)
```
{: .common-lang-block .swift }

```java
ParseACL.setDefaultACL(new ParseACL(), true);
```
{: .common-lang-block .java }

```js
// not available in the JavaScript SDK
```
{: .common-lang-block .js }

```csharp
// not available in the .NET SDK
```
{: .common-lang-block .csharp }

```php
ParseACL::setDefaultACL(new ParseACL(), true);
```
{: .common-lang-block .php }

```bash
# No command line example
```
{: .common-lang-block .bash }

```cpp
// No C++ example
```
{: .common-lang-block .cpp }

If you want the user to have some data that is public and some that is private, it's best to have two separate objects. You can add a pointer to the private data from the public one.

```objc
PFObject *privateData = [PFObject objectWithClassName:@"PrivateUserData"];
privateData.ACL = [PFACL ACLWithUser:[PFUser currentUser]];
[privateData setObject:@"555-5309" forKey:@"phoneNumber"];

[[PFUser currentUser] setObject:privateData forKey:@"privateData"];
```
{: .common-lang-block .objc }

```swift
if let currentUser = PFUser.currentUser() {
    let privateData = PFObject(className: "PrivateUserData")
    privateData.ACL = PFACL(user: currentUser)
    privateData.setObject("555-5309", forKey: "phoneNumber")
    currentUser.setObject(privateData, forKey: "privateData")
}
```
{: .common-lang-block .swift }

```java
ParseObject privateData = new ParseObject("PrivateUserData");
privateData.setACL(new ParseACL(ParseUser.getCurrentUser()));
privateData.put("phoneNumber", "555-5309");

ParseUser.getCurrentUser().put("privateData", privateData);
```
{: .common-lang-block .java }

```js
var privateData = Parse.Object.extend("PrivateUserData");
privateData.setACL(new Parse.ACL(Parse.User.current()));
privateData.set("phoneNumber", "555-5309");

Parse.User.current().set("privateData", privateData);
```
{: .common-lang-block .js }

```csharp
var privateData = new ParseObject("PrivateUserData");
privateData.ACL = new ParseACL(ParseUser.CurrentUser);
privateData["phoneNumber"] = "555-5309";

ParseUser.CurrentUser["privateData"] =  privateData;
```
{: .common-lang-block .csharp }

```php
$privateData = ParseObject::create("PrivateUserData");
$privateData->setACL(new ParseACL(ParseUser::getCurrentUser()));
$privateData->set("phoneNumber", "555-5309");

ParseUser::getCurrentUser()->set("privateData", $privateData);
```
{: .common-lang-block .php }

```bash
# No command line example
```
{: .common-lang-block .bash }

```cpp
// No C++ example
```
{: .common-lang-block .cpp }

Of course, you can set different read and write permissions on an object. For example, this is how you would create an ACL for a public post by a user, where anyone can read it:

```objc
PFACL *acl = [PFACL ACL];
[acl setPublicReadAccess:true];
[acl setWriteAccess:true forUser:[PFUser currentUser]];
```
{: .common-lang-block .objc }

```swift
let acl = PFACL()
acl.setPublicReadAccess(true)
if let currentUser = PFUser.currentUser() {
    acl.setWriteAccess(true, forUser: currentUser)
}
```
{: .common-lang-block .swift }

```java
ParseACL acl = new ParseACL();
acl.setPublicReadAccess(true);
acl.setWriteAccess(ParseUser.getCurrentUser(), true);
```
{: .common-lang-block .java }

```js
var acl = new Parse.ACL();
acl.setPublicReadAccess(true);
acl.setWriteAccess(Parse.User.current().id, true);
```
{: .common-lang-block .js }

```csharp
var acl = new ParseACL();
acl.PublicReadAccess = true;
acl.SetRoleWriteAccess(ParseUser.CurrentUser.ObjectId, true);
```
{: .common-lang-block .csharp }

```php
$acl = new ParseACL();
$acl->setPublicReadAccess(true);
$acl->setWriteAccess(ParseUser::getCurrentUser(), true);
```
{: .common-lang-block .php }

```bash
# No command line example
```
{: .common-lang-block .bash }

```cpp
// No C++ example
```
{: .common-lang-block .cpp }

Sometimes it's inconvenient to manage permissions on a per-user basis, and you want to have groups of users who get treated the same (like a set of admins with special powers). Roles are are a special kind of object that let you create a group of users that can all be assigned to the ACL. The best thing about roles is that you can add and remove users from a role without having to update every single object that is restricted to that role. To create an object that is writeable only by admins:

```objc
// Assuming you've already created a role called "admins"...
PFACL *acl = [PFACL ACL];
[acl setPublicReadAccess:true];
[acl setWriteAccess:true forRoleWithName:@"admins"];
```
{: .common-lang-block .objc }

```swift
let acl = PFACL()
acl.setPublicReadAccess(true)
acl.setWriteAccess(true, forRoleWithName: "admins")
```
{: .common-lang-block .swift }

```java
// Assuming you've already created a role called "admins"...
ParseACL acl = new ParseACL();
acl.setPublicReadAccess(true);
acl.setRoleWriteAccess("admins", true);
```
{: .common-lang-block .java }

```js
var acl = new Parse.ACL();
acl.setPublicReadAccess(true);
acl.setRoleWriteAccess("admins", true);
```
{: .common-lang-block .js }

```csharp
var acl = new ParseACL();
acl.PublicReadAccess = true;
acl.SetRoleWriteAccess("admins", true);
```
{: .common-lang-block .csharp }

```php
$acl = new ParseACL();
$acl->setPublicReadAccess(true);
$acl->setRoleWriteAccessWithName("admins", true);
```
{: .common-lang-block .php }

```bash
# No command line example
```
{: .common-lang-block .bash }

```cpp
// No C++ example
```
{: .common-lang-block .cpp }

Of course, this snippet assumes you've already created a role named "admins". This is often reasonable when you have a small set of special roles set up while developing your app. Roles can also be created and updated on the fly — for example, adding new friends to a "friendOf___" role after each connection is made.

All this is just the beginning. Applications can enforce all sorts of complex access patterns through ACLs and class-level permissions. For example:

*   For private data, read and write access can be restricted to the owner.
*   For a post on a message board, the author and members of the "Moderators" role can have "write" access, and the general public can have "read" access.
*   For logging data that will only be accessed by the developer through the REST API using the master key, the ACL can deny all permissions.
*   Data created by a privileged group of users or the developer, like a global message of the day, can have public read access but restrict write access to an "Administrators" role.
*   A message sent from one user to another can give "read" and "write" access just to those users.

For the curious, here's the format for an ACL that restricts read and write permissions to the owner (whose `objectId` is identified by `"aSaMpLeUsErId"`) and enables other users to read the object:

```json
{
    "*": { "read":true },
    "aSaMpLeUsErId": { "read" :true, "write": true }
}
```

And here's another example of the format of an ACL that uses a Role:

```json
{
    "role:RoleName": { "read": true },
    "aSaMpLeUsErId": { "read": true, "write": true }
}
```

### Pointer Permissions

Pointer permissions are a special type of class-level permission that create a virtual ACL on every object in a class, based on users stored in pointer fields on those objects. For example, given a class with an `owner` field, setting a read pointer permission on `owner` will make each object in the class only readable by the user in that object's `owner` field. For a class with a `sender` and a `reciever` field, a read pointer permission on the `receiver` field and a read and write pointer permission on the `sender` field will make each object in the class readable by the user in the `sender` and `receiver` field, and writable only by the user in the `sender` field.

Given that objects often already have pointers to the user(s) that should have permissions on the object, pointer permissions provide a simple and fast solution for securing your app using data which is already there, that doesn't require writing any client code or cloud code.

Pointer permissions are like virtual ACLs. They don't appear in the ACL column, buf if you are familiar with how ACLs work, you can think of them like ACLs. In the above example with the `sender` and `receiver`, each object will act as if it has an ACL of:

```
{
    "<SENDER_USER_ID>": {
        "read": true,
        "write": true
    },
    "<RECEIVER_USER_ID>": {
        "read": true
    }
}
```

Note that this ACL is not actually created on each object. Any existing ACLs will not be modified when you add or remove pointer permissions, and any user attempting to interact with an object can only interact with the object if both the virtual ACL created by the pointer permissions, and the real ACL already on the object allow the interaction. For this reason, it can sometimes be confusing to combine pointer permissions and ACLs, so we recommend using pointer permissions for classes that don't have many ACLs set. Fortunately, it's easy to remove pointer permissions if you later decide to use Cloud Code or ACLs to secure your app.

### CLP and ACL interaction

Class-Level Permissions (CLPs) and Access Control Lists (ACLs) are both powerful tools for securing your app, but they don't always interact exactly how you might expect. They actually represent two separate layers of security that each request has to pass through to return the correct information or make the intended change. These layers, one at the class level, and one at the object level, are shown below. A request must pass through BOTH layers of checks in order to be authorized. Note that despite acting similarly to ACLs, [Pointer Permissions](#security-pointer-permissions) are a type of class level permission, so a request must pass the pointer permission check in order to pass the CLP check.

![]({{ /assets/images/clp_vs_acl_diagram.png || prepend: site.baseurl }})

As you can see, whether a user is authorized to make a request can become complicated when you use both CLPs and ACLs. Let's look at an example to get a better sense of how CLPs and ACLs can interact. Say we have a `Photo` class, with an object, `photoObject`. There are 2 users in our app, `user1` and `user2`. Now lets say we set a Get CLP on the `Photo` class, disabling public Get, but allowing `user1` to perform Get. Now let's also set an ACL on `photoObject` to allow Read - which includes GET - for only `user2`.

You may expect this will allow both `user1` and `user2` to Get `photoObject`, but because the CLP layer of authentication and the ACL layer are both in effect at all times, it actually makes it so *neither* `user1` nor `user2` can Get `photoObject`. If `user1` tries to Get `photoObject`, it will get through the CLP layer of authentication, but then will be rejected because it does not pass the ACL layer. In the same way, if `user2` tries to Get `photoObject`, it will also be rejected at the CLP layer of authentication.

Now lets look at example that uses Pointer Permissions. Say we have a `Post` class, with an object, `myPost`. There are 2 users in our app, `poster`, and `viewer`. Lets say we add a pointer permission that gives anyone in the `Creator` field of the `Post` class read and write access to the object, and for the `myPost` object, `poster` is the user in that field. There is also an ACL on the object that gives read access to `viewer`. You may expect that this will allow `poster` to read and edit `myPost`, and `viewer` to read it, but `viewer` will be rejected by the Pointer Permission, and `poster` will be rejected by the ACL, so again, neither user will be able to access the object.

Because of the complex interaction between CLPs, Pointer Permissions, and ACLs, we recommend being careful when using them together. Often it can be useful to use CLPs only to disable all permissions for a certain request type, and then using Pointer Permissions or ACLs for other request types. For example, you may want to disable Delete for a `Photo` class, but then put a Pointer Permission on `Photo` so the user who created it can edit it, just not delete it. Because of the especially complex way that Pointer Permissions and ACLs interact, we usually recommend only using one of those two types of security mechanisms.

### Security Edge Cases

There are some special classes in Parse that don't follow all of the same security rules as every other class. Not all classes follow [Class-Level Permissions (CLPs)](#security-classes) or [Access Control Lists (ACLs)](#security-objects) exactly how they are defined, and here those exceptions are documented. Here "normal behavior" refers to CLPs and ACLs working normally, while any other special behaviors are described in the footnotes.

||`_User`|`_Installation`|
| --- | --- |
|Get|normal behaviour [1, 2, 3]|ignores CLP, but not ACL|
|Find|normal behavior [3]|master key only [6]|
|Create|normal behavior [4]|ignores CLP|
|Update|normal behavior [5]|ignores CLP, but not ACL [7]|
|Delete|normal behavior [5]|master key only [7]|
|Add Field|normal behavior|normal behavior|

1. Logging in, or `/1/login` in the REST API, does not respect the Get CLP on the user class. Login works just based on username and password, and cannot be disabled using CLPs.

2. Retrieving the current user, or becoming a User based on a session token, which are both `/1/users/me` in the REST API, do not respect the Get CLP on the user class.

3. Read ACLs do not apply to the logged in user. For example, if all users have ACLs with Read disabled, then doing a find query over users will still return the logged in user. However, if the Find CLP is disabled, then trying to perform a find on users will still return an error.

4. Create CLPs also apply to signing up. So disabling Create CLPs on the user class also disables people from signing up without the master key.

5. Users can only Update and Delete themselves. Public CLPs for Update and Delete may still apply. For example, if you disable public Update for the user class, then users cannot edit themselves. But no matter what the write ACL on a user is, that user can still Update or Delete itself, and no other user can Update or Delete that user. As always, however, using the master key allows users to update other users, independent of CLPs or ACLs.

6. Get requests on installations follow ACLs normally. Find requests without master key is not allowed unless you supply the `installationId` as a constraint.

7. Update requests on installations do adhere to the ACL defined on the installation, but Delete requests are master-key-only. For more information about how installations work, check out the [installations section of the REST guide](/docs/rest#installations).

## Data Integrity in Cloud Code

For most apps, care around keys, class-level permissions, and object-level ACLs are all you need to keep your app and your users' data safe. Sometimes, though, you'll run into an edge case where they aren't quite enough. For everything else, there's [Cloud Code](https://parse.com/docs/cloudcode/guide#cloud-code).

Cloud Code allows you to upload JavaScript to Parse's servers, where we will run it for you. Unlike client code running on users' devices that may have been tampered with, Cloud Code is guaranteed to be the code that you've written, so it can be trusted with more responsibility.

One particularly common use case for Cloud Code is preventing invalid data from being stored. For this sort of situation, it's particularly important that a malicious client not be able to bypass the validation logic.

To create validation functions, Cloud Code allows you to implement a `beforeSave` trigger for your class. These triggers are run whenever an object is saved, and allow you to modify the object or completely reject a save. For example, this is how you create a [Cloud Code beforeSave trigger](https://parse.com/docs/cloudcode/guide#cloud-code-beforesave-triggers) to make sure every user has an email address set:

```js
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  var user = request.object;
  if (!user.get("email")) {
    response.error("Every user must have an email address.");
  } else {
    response.success();
  }
});
```

Our [Cloud Code guide](https://parse.com/docs/cloudcode/guide#cloud-code) provides instructions on how to upload this trigger to our servers.

Validations can lock down your app so that only certain values are acceptable. You can also use `afterSave` validations to normalize your data (e.g. formatting all phone numbers or currency identically). You get to retain most of the productivity benefits of accessing Parse data directly from your client applications, but you can also enforce certain invariants for your data on the fly.

Common scenarios that warrant validation include:

*   Making sure phone numbers have the right format
*   Sanitizing data so that its format is normalized
*   Making sure that an email address looks like a real email address
*   Requiring that every user specifies an age within a particular range
*   Not letting users directly change a calculated field
*   Not letting users delete specific objects unless certain conditions are met

## Implementing Business Logic in Cloud Code

While validation often makes sense in Cloud Code, there are likely certain actions that are particularly sensitive, and should be as carefully guarded as possible. In these cases, you can remove permissions or the logic from clients entirely and instead funnel all such operations to Cloud Code functions.

When a Cloud Code function is called, it can invoke the `useMasterKey` function to gain the ability to modify user data. With the master key, your Cloud Code function can override any ACLs and write data. This means that it'll bypass all the security mechanisms you've put in place in the previous sections.

Say you want to allow a user to "like" a `Post` object without giving them full write permissions on the object. You can do this by having the client call a Cloud Code function instead of modifying the Post itself:

The master key should be used carefully. When invoked, the master key is in effect for the duration of the Cloud Code function in which it is called:

```js
Parse.Cloud.define("like", function(request, response) {
  Parse.Cloud.useMasterKey();
  // Everything after this point will bypass ACLs and other security
  // even if I do things besides just updating a Post object.
});
```

A more prudent way to use the master key would be to pass it as a parameter on a per-function basis. For example, instead of the above, set `useMasterKey` to `true` in each individual API function:

```js
Parse.Cloud.define("like", function(request, response) {
  var post = new Parse.Object("Post");
  post.id = request.params.postId;
  post.increment("likes");
  post.save(null, { useMasterKey: true }).then(function() {
    // If I choose to do something else here, it won't be using
    // the master key and I'll be subject to ordinary security measures.
    response.success();
  }, function(error) {
    response.error(error);
  });
});
```

One very common use case for Cloud Code is sending push notifications to particular users. In general, clients can't be trusted to send push notifications directly, because they could modify the alert text, or push to people they shouldn't be able to. Your app's settings will allow you to set whether "client push" is enabled or not; we recommend that you make sure it's disabled. Instead, you should write Cloud Code functions that validate the data to be pushed and sent before sending a push.

## Parse Security Summary

Parse provides a number of ways for you to secure data in your app. As you build your app and evaluate the kinds of data you will be storing, you can make the decision about which implementation to choose.

It is worth repeating that that the Parse User object is readable by all other users by default. You will want to set the ACL on your User object accordingly if you wish to prevent data contained in the User object (for example, the user's email address) from being visible by other users.

Most classes in your app will fall into one of a couple of easy-to-secure categories. For fully public data, you can use class-level permissions to lock down the table to put publicly readable and writeable by no one. For fully private data, you can use ACLs to make sure that only the user who owns the data can read it. But occasionally, you'll run into situations where you don't want data that’s fully public or fully private. For example, you may have a social app, where you have data for a user that should be readable only to friends whom they’ve approved. For this you'll need to a combination of the techniques discussed in this guide to enable exactly the sharing rules you desire.

We hope that you'll use these tools to do everything you can   to keep your app's data and your users' data secure.   Together, we can make the web a safer place.

# Class Level Permissions

Class Level Permissions are a security feature from that allows one to restrict access on a broader way than the [ACL based permissions]({{ site.baseUrl }}/rest/guide/#security).

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

You can set permissions for class [per operation](#configure-clp-operations)  and/or per [group of operations](#grouped-pointer-permissions).

Allowed entries for operations are:

* `*`  -  [Public](#public-access)
* `objectId` - [User's ID](#users-roles)
* `role:role_name` - [Role](#users-roles)
* `requiredAuthentication` - [Authenticated Users](#requires-authentication-permission-requires-parse-server--230)
* `pointerFields` - [Pointer Permissions](#pointer-permissions)

And any combinations of the above:

```js
// PUT http://localhost:1337/schemas/:className
// Set the X-Parse-Application-Id and X-Parse-Master-Key header
// body:
{
  classLevelPermissions:
  {
    "get": {
      "*": true, // means Public access
      "s0meUs3r1d": true, // key must be an id of `_User`
      "role:admin": true, // key must be `role:${role_name}`
      "requiresAuthentication": true, // any authenticated users
      "pointerFields": ["onwer", "followers"] // pointer permissions
    },
    "find": {...},    // ... create, update, delete, addField
    "readUserFields": ["followers", "owner"], // grouped pointer permissions
    "writeUserFields": ["owner"], // grouped pointer permissions
    "protectedFields": {
      "*": ["password","email"],
       "userField:owner":[]
    }
  }
}
```

## Configure CLP Operations

### Public access

`*` - Allows anyone despite authentication status to execute operation.

```js
{
  classLevelPermissions:
  {
    "get": {
      "*": true, // Public access
    }
  }
}
```

### Users, Roles

This works exactly as ACL's

```js
{
  classLevelPermissions:
  {
    "find": {
      "s0meUs3r1d": true, // key must be an id of `_User`
      "role:admin": true, // key must be `role:${role_name}`
    }
  }
}
```

### Requires Authentication permission

Starting version 2.3.0, Parse Server introduces a new Class Level Permission called `requiresAuthentication`. This CLP prevents any non authenticated user from performing the action protected by the CLP.

If you want to restrict access to a full class to only authenticated users, you can use the `requiresAuthentication` Class Level Permission. For example, you want to allow your **authenticated users** to `find` and `get` objects from your application and your admin users to have all privileges, you would set the following CLP:

```js
{
  classLevelPermissions:
  { 
    "get": {
      "requiresAuthentication": true,
      "role:admin": true
    },
    "find": {
      "requiresAuthentication": true,
      "role:admin": true
    },
    "create": { "role:admin": true },
    "update": { "role:admin": true },
    "delete": { "role:admin": true },
  }
}
```

Effects:

* Non authenticated users won't be able to do anything.
* Authenticated users (any user with a valid sessionToken) will be able to read all the objects in that class
* Users belonging to the admin role, will be able to perform all operations.

⚠️ Note that this is in no way securing your content, if you allow anyone to log in to your server, any client will still be able to query this object.

## Pointer Permissions

While permissions discussed before let you explicitly target a user by id or a role,
Pointer Permissions let you dynamically enforce permissions without knowing the id or assigning roles in advance. Instead you define one or more field names of this class, and any users pointed by such fields of a particular object are granted the permission.

To use this feature, a field must:

* already exist in this collection's schema
* be of either `Pointer<_User>` or `Array` type

In case of `Array`, only items that are of `Pointer<_User>` type are evaluated, other items silently ignored.

You can think of it as a virtual ACL or a dynamic role defined per-object in its own field.

There are two ways you can set Pointer Permission in schema:

* [Using granular permissions](#granular-pointer-permissions) - `pointerFields` *requires Parse-Server v3.11 and above*
* [Using grouped permissions](#grouped-pointer-permissions) - `readUserFields`/`writeUserFields`

⚠️ `create` operation can't be allowed by pointer permissions, because there is literally no object to check it's field untill it is created;

⚠️ `addField`  grants permission to only update an object with a new field, but it is advised to set addField permission using other means (e.g. restrict to a role or particular admin user by id).

### Granular Pointer Permissions

Given an example setup:

```js
{
  "classLevelPermissions":
  {
    "get": {
      "pointerFields": ["owner", "subscribers"]
    },
    "find": {
      "pointerFields": ["owner", "subscribers"]
    },
    "create":{
      "*": true
    },
    "update": {
      "pointerFields": ["owner"]
    },
    "delete": {
      "pointerFields": ["owner"]
    }
  }
}
```

```js
// Two users:
let alice = ... // Parse.User
let bob = ... // Parse.User

// and two objects:
let feedA = {
  title: 'Posts by Alice',
  owner: alice,
  subscribers: [], // notice no subscribers here
};

let feedB = {
  title: 'Posts by Bob',
  owner: bob,
  subscribers: [alice], // notice Alice in subscribers
};
```

In the example above:

* anyone is allowed to `create` objects.
* `feed1` can be viewed (`get`,`find`) only by **Alice**. (pointed in owners field)
* `feed2` can be viewed (`get`,`find`) both by **Bob** and **Alice**. (Bob is pointed in `owners`. Alice is pointed in `subscribers`)
* only owners are allowed to `update` and `delete`.

### Grouped Pointer Permissions

These are similar to [`pointerFields`](#granular-pointer-permissions), but cover multiple operations at once:

**`readUserFields`**:

* `get`,
* `find`,
* `count`

**`writeUserFields`**:

* `update`,
* `delete`,
* `addField`

Same scheme as for previous example can be defined shorter:

```js
{
  ...,
  "classLevelPermissions":
  {
    "create":{
      "*": true
    },
    // notice these are root level properties:
    "readUserFields": ["owner", "subscribers"],
    "writeUserFields": ["owner"]
  },
}
```

### Pointer Permissions behavior

Given this permission setup for an operation:

```js
{
  "classLevelPermissions":{
    [operation]: {
      // default * Public removed
      pointerFields: ["editors"]
      // no other rules set
    }
  }
}
```

You can expect following behavior\*:

|Operation | User not in "editors" | User is in "editors" |
| - | - | - |
|get| 101: Object not found | ok |
|find| Limited results | ok |
|count| Limited count | ok |
|create| Permission denied | Permission denied |
|update| 101: Object not found | ok |
|delete| 101: Object not found | ok |
|addField| Permission denied | ok |

_\* Assuming default ACL is set on the object (public read and write)._

## CLP and ACL interaction

Class-Level Permissions (CLPs) and Access Control Lists (ACLs) are both powerful tools for securing your app, but they don't always interact exactly how you might expect. They actually represent two separate layers of security that each request has to pass through to return the correct information or make the intended change. These layers, one at the class level, and one at the object level, are shown below. A request must pass through BOTH layers of checks in order to be authorized. Note that despite acting similarly to ACLs, [Pointer Permissions](#pointer-permissions) are a type of class level permission, so a request must pass the pointer permission check in order to pass the CLP check.

<img alt="CLP vs ACL Diagram" data-echo="{{ '/assets/images/clp_vs_acl_diagram.png' | prepend: site.baseurl }}"/>

As you can see, whether a user is authorized to make a request can become complicated when you use both CLPs and ACLs. Let's look at an example to get a better sense of how CLPs and ACLs can interact. Say we have a `Photo` class, with an object, `photoObject`. There are 2 users in our app, `user1` and `user2`. Now lets say we set a Get CLP on the `Photo` class, disabling public Get, but allowing `user1` to perform Get. Now let's also set an ACL on `photoObject` to allow Read - which includes GET - for only `user2`.

You may expect this will allow both `user1` and `user2` to Get `photoObject`, but because the CLP layer of authentication and the ACL layer are both in effect at all times, it actually makes it so *neither* `user1` nor `user2` can Get `photoObject`. If `user1` tries to Get `photoObject`, it will get through the CLP layer of authentication, but then will be rejected because it does not pass the ACL layer. In the same way, if `user2` tries to Get `photoObject`, it will also be rejected at the CLP layer of authentication.

Now lets look at example that uses Pointer Permissions. Say we have a `Post` class, with an object, `myPost`. There are 2 users in our app, `poster`, and `viewer`. Lets say we add a pointer permission that gives anyone in the `Creator` field of the `Post` class read and write access to the object, and for the `myPost` object, `poster` is the user in that field. There is also an ACL on the object that gives read access to `viewer`. You may expect that this will allow `poster` to read and edit `myPost`, and `viewer` to read it, but `viewer` will be rejected by the Pointer Permission, and `poster` will be rejected by the ACL, so again, neither user will be able to access the object.

Because of the complex interaction between CLPs, Pointer Permissions, and ACLs, we recommend being careful when using them together. Often it can be useful to use CLPs only to disable all permissions for a certain request type, and then using Pointer Permissions or ACLs for other request types. For example, you may want to disable Delete for a `Photo` class, but then put a Pointer Permission on `Photo` so the user who created it can edit it, just not delete it. Because of the especially complex way that Pointer Permissions and ACLs interact, we usually recommend only using one of those two types of security mechanisms.

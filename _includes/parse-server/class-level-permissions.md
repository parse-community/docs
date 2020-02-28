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

`*` - Allows anyone regardless of authentication status to execute the operation.

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

This works exactly like ACL's.

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

Starting with version 2.3.0, Parse Server introduced a new Class Level Permission `requiresAuthentication`. It prevents any non authenticated user from performing the action protected by the CLP.

For example, if you want to allow your **authenticated users** to `find` and `get` objects from your application and your admin users to have all privileges, you could set the following CLP:

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
* Authenticated users (any user with a valid `sessionToken`) will be able to read all the objects in that class.
* Users belonging to the admin role, will be able to perform all operations.

⚠️ Note that this is in no way securing your content, if you allow anyone to login to your server, every client will still be able to query this object.

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

* Anyone is allowed to `create` objects.
* `feedA` can be viewed (`get`,`find`) only by **Alice** (pointed to in `owners` field).
* `feedB` can be viewed (`get`,`find`) both by **Bob** and **Alice** (Bob is pointed to in `owners`, Alice is pointed to in `subscribers`).
* Only owners are allowed to `update` and `delete`.

### Grouped Pointer Permissions

These are similar to [`pointerFields`](#granular-pointer-permissions), but cover multiple operations at once:

**`readUserFields`**:

* `get`
* `find`
* `count`

**`writeUserFields`**:

* `update`
* `delete`
* `addField`

The same scheme as for previous example can be defined in a more compact manner:

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

As you can see, whether a user is authorized to make a request can become complicated when you use both CLPs and ACLs. Let's look at an example to get a better sense of how CLPs and ACLs can interact.

```js

let object;              // Parse.Object
let user1, user2;        // Parse.User

...
{
 classLevelPermissions:{
   get: {
     [user1.id]: true     // only user1 can get via CLP 
   },
 }
}
...
// only user2 is allowed to get via ACL
object.ACL.setRead(user2.id, true); 
object.ACL.setPublicRead(false);
object.ACL.setPublicWrite(false);
```

You may expect this will allow both `user1` and `user2` to get `object`, but because the CLP layer of authentication and the ACL layer are both in effect at all times, it actually makes it so *neither* `user1` nor `user2` can get `object`:

* If `user1` tries to get `object`: request will pass CLP layer, but then will be rejected by ACL layer.
* If `user2` tries to get `object`: it will be rejected at the CLP layer.

Now lets look at example that uses Pointer Permissions:

```js
let post;                // Parse.Object
let poster, viewer;      // Parse.User

...
{
 classLevelPermissions:{
   get: {
     pointerFields: ["author"]
   },
   update: {
     pointerFields: ["author"]
   },
 }
}
...

// add poster's pointer in a field that allows get/update via CLP
post.author = poster;

// only viewer is allowed to get via ACL
post.ACL.setRead(viewer.id, true); 
post.ACL.setPublicRead(false);
post.ACL.setPublicWrite(false);
```

You may expect that this will allow `author` to read and edit `post`, and `viewer` to read it, but:

* `viewer` will be rejected by the Pointer Permissions
* `poster` will be rejected by the ACL

So again, neither user will be able to access the object.

Because of the complex interaction between CLPs, Pointer Permissions, and ACLs, we recommend being careful when using them together. Often it can be useful to use CLPs only to disable all permissions for a certain request type, and then using Pointer Permissions or ACLs for other request types. For example, you may want to disable Delete for a `Photo` class, but then put a Pointer Permission on `Photo` so the user who created it can edit it, just not delete it. Because of the especially complex way that Pointer Permissions and ACLs interact, we usually recommend only using one of those two types of security mechanisms.


## Protected Fields

Using `protectedFields` allows you to specify fields that will be removed server-side before response is returned to client.
This feature uses approach similar to permissions in the way you define users/roles that are subject to fields protection. You can target multiple users/roles each with different sets of fields to protect. 

It helps to achieve the behavior of `keys`/`excludedKeys` query options, by just modifying the scheme, thus giving you same flexibility without the need to modify request options on client or in cloud code. Moreover it provides extra security e.g. in case a malicious user tamperes with your client code (removes `keys` query option) or issues requests directly to server  - he still won't be able to read the fields he is not supposed to, because the fields will already be deleted from response before it is sent to client.

To do so, add a field `protectedFields` under `classLevelPermissions`. This should be an object, where the key defines a target audience and the value is an array of column names to protect.

Possible keys:

* `*` - Public access, applies to all requests.
* `authenticated` - applies to requests issued by logged in users.
* `role:role_name` - applies to users with a role.
* `s0meUs3rId` - targets user by id.
* `userField:column_name` - applies to user pointed to by field `column_name`.

Notes: 

* You can not protect default fields: `objectId`, `ACL`, `createdAt`, `updatedAt`.
* Protected fields are not enforced for requests signed with `masterKey`.

Let's say we have an object: 

```js
{
 "preview": "Lorem ipsum",
 "article": "Lorem ipsum dolor sit amet",
 "secret": "consectetur adipiscing elit",
 "views": "42",
 "ownerEmail": "email@example.com",
 "owner": {"__type": "Pointer", "objectId": "0wn3r1d"},
 ... // we'll omit default fields for brevity.
}

```

### `Public '*'`

Public affects all requests.

```js
// PUT http://localhost:1337/schemas/:className
// Set the X-Parse-Application-Id and X-Parse-Master-Key header
// body:
{
  classLevelPermissions:
  {
    "get": {
      "*": true
    },
    "protectedFields": {
      "*": ["ownerEmail", "secret"],
    }
  }
}
```

Here we define that fields `ownerEmail` and `secret` are protected for all (`*`) requests. These fields will be excluded from the object in reponse. It will only contain fields that are not listed as protected.

```js
// example response:
{
 "preview": "Lorem ipsum",
 "article": "Lorem ipsum dolor sit amet",
 "views": "42",
 "owner": {"__type": "Pointer", "objectId": "0wn3r1d"},
}
```

### `authenticated`
It is possible to distinguish logged in users using `authenticated` key. In the following example we will let non-authenticated users to see only a `preview` field, while users with valid session token could additionally see `article` and `views`:

```js
{
  classLevelPermissions:
  {
    "protectedFields": {
      "*": ["views", "secret", "ownerEmail", "owner", "article",],
      "authenticated": ["secret", "ownerEmail", "owner"]
    }
  }
}
```

```js
// example response for user without session token:
{
 "preview": "Lorem ipsum",
}

// example response for logged in user:
{
 "preview": "Lorem ipsum",
 "article": "Lorem ipsum dolor sit amet",
 "views": "42"
}
```

It is essential to understand the basic principle how server determines which fields to protect when user belongs to multiple groups with different rules defined. First, server finds all scopes with `protectedFields` the user belongs to. Then resulting set is determined as an intersection of all applicable sets.

In the above example, for logged in user:

1. Both `*` and `authenticated` are applicable scopes.
2. The result of intersection is `["secret", "ownerEmail", "owner"]` (the fields appear in both sets).
3. Object will have all keys except `secret`, `ownerEmail` and `owner`.


### `role:`

Let's say we want to allow users with `admin` role to see all fields, while protecting some fields from all other users:

```js
{
  classLevelPermissions:
  {
    "protectedFields": {
      "*": ["ownerEmail", "secret"],
      "role:admin": []
    }
  }
}
```

In the above example we explicitly set empty array `[]` to state that no fields should be protected for users with `admin` role. So for `admin`, according to the principle discussed earlier:

* Both `*` and `role:admin` scopes are applicable. 
* The intersection result is `[]` (since there is no field that is present in both sets) thus all fields will appear in response.

### Role hierarchy

Sometimes your roles are related and form a hierarchy, e.g. when `tester` is related to `moderator` - `tester` inherits all privileges of `moderator`. Hierarchy is also considered when protected fields are evaluated.

```js
let moderator = ... // Parse.Role
let tester = ...    // Parse.Role

moderator.getRelation('roles).add(tester);
``` 

Here is an example of a tricky setup that may lead to unexpected result, we'll explain why right after:

```js
{
  classLevelPermissions:
  {
    "protectedFields": {
      "role:moderator": ["secret"],
      "role:tester": ["ownerEmail"]
    }
  }
}
```

* When `moderator` fetches an object, `secret` is protected.
* When `tester` fetches same object - all fields appear to be visible, even though `tester` has `ownerEmail` set as protected.

This happens because of role hierarchy - when user has some role assigned directly, he also implicitly gets all the inherited roles. Then server intersects sets for all roles (both `tester` and inherited `moderator` in this case) and intersection of `["secret"]` vs `["ownerEmail"]` results in `[]` (sets have no fields in common).

### User ID

You can target users by id:

```js
{
  classLevelPermissions:
  {
    "protectedFields": {
      "*": ["article", "ownerEmail", "secret"],
      "authenticated": ["ownerEmail","secret"]
      "s0m3userId": ["ownerEmail", "views"],
      "r00tus3rId": []
    }
  }
}
```

The same rule apples here - user that is targeted by id is still subject to rules set for all broader scopes. So for `s0m3userId`:

* 3 sets of fields will be intersected: `*`, `authenticated` and `s0m3userId`.
* As a result only `["ownerEmail"]` ia protected. 
* `views` field (although being listed as protected) actually has no effect, because it is not protected (in other words allowed) for everyone `*`.

### `userField:` (pointers)

There is one more way to target user - by pointer field. The syntax is: `userField:column_name`. This uses similar concept as [#pointer-permissions](Pointer Permisssions). You use column name (of either `Pointer<_User>` or `Array` type) as a key. And fields will be protected for any users pointed to by this field.  For example:


```js
let user1, user2 = ... // Parse.User
let object = ...;      // Parse.Object

object.owner = user2;
```

```js
{
  classLevelPermissions:
  {
    "protectedFields": {
      "*": ["article", "owner", "ownerEmail", "secret"],
      "userField:owner": [] // 'owner' field is Pointer<_User>
    }
  }
}
```

```js
// response for user1:
{
 "preview": "Lorem ipsum",
 "views": "42",
}

// response for user2
{
 "preview": "Lorem ipsum",
 "article": "Lorem ipsum dolor sit amet",
 "secret": "consectetur adipiscing elit",
 "views": "42",
 "ownerEmail": "email@example.com",
 "owner": {"__type": "Pointer", "objectId": "0wn3r1d"},
}

```

In this example, server checks if the user issuing a request is pointed to in object's `owner` field. No fields will be protected for user who is set as `owner` of each particular object.

Note: You can not use `Relation` columns with `userField:`, if you need to target multiple users by pointer - use `Array` type with `Pointer<_User>` items.

The most important concept to avoid misconfiguration when designing protected fields is to always keep in mind that the decision will be made not by the single most precise scope, but rather based on rules for all scopes the user belongs to.

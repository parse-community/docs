# Class Level Permissions

Class level permissions are a security feature from that allows one to restrict access on a broader way than the [ACL based permissions]({{ site.baseUrl }}/rest/guide/#security).

## CRUD operations

You can set permissions per operation per class.

Operations:

- `get`
- `find`
- `count`
- `create`
- `update`
- `delete`
- `addField`


Allowed entities are:

- `*` (Public)
- `[objectId]` (User)
- `role:[role_name]` (Role)
- `requiredAuthentication` (Authenticated Users)
- `pointerFields`

And any combinations of the above.

The syntax is:

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
      "pointerFields": ["onwer", "followers"] // field names in this class referring to _User(s)
    }
    ...
  }
}
```

### `*` - Public access

Allows anyone despite authentication status to execute operation.

### Users, Roles

This works exactly as ACL's

### `requiresAuthentication`

If you want to restrict access to a full class to only authenticated users, you can use the `requiresAuthentication` class level permission. For example, you want to allow your **authenticated users** to `find` and `get` objects from your application and your admin users to have all privileges, you would set the CLP:

```js
// PUT http://localhost:1337/schemas/:className
// Set the X-Parse-Application-Id and X-Parse-Master-Key header
// body:
{
  classLevelPermissions:
  {
    "find": {
      "requiresAuthentication": true,
      "role:admin": true
    },
    "get": {
      "requiresAuthentication": true,
      "role:admin": true
    },
    "create": { "role:admin": true },
    "update": { "role:admin": true },
    "delete": { "role:admin": true },
  }
}
```

Note that this is in no way securing your content. If you allow anyone to log in to your server, any client will be able to query this object.

### `pointerFields`

This lets you dynamically enforce permissions based on particular object's fields value.
Must be an array of field names already existing in this class. Supports only fields of types: `Pointer<_User>` or  `Array` (containing Pointers to `_User`s). When evaluating the permission Parse Server will also assume user pointers stored in these fields and allow such users an operation. You can think of it as a virtual ACL or a dynamic role defined per-object in its own field.

```js
// Given some users
const author = await new Parse.User('author', 'password').save();
const friend = await new Parse.User('friend', 'password').save();
const buddy = await new Parse.User('buddy', 'password').save();
const editor = await new Parse.User('editor', 'password').save();

// and an object
const post = new Parse.Object('Post', {
    owner: author,
    followers: [ friend, buddy ],
    moderators: [ editor ]
    title: 'Hello World',
  });
```

Your CLP might look like:

```js
{
  ...,
  "classLevelPermissions":
  {
    "get": {
      "pointerFields": ["onwer", "followers", "moderators"]
    },
    "find": {
      "pointerFields": ["onwer", "followers", "moderators"]
    },
    "update": {
      "pointerFields": ["owner", "moderators"]
    },
    "delete": {
     "pointerFields": ["owner"]
    }
    ...
  }
}
```

### If CLP setup for an operation:

```js
{
  "classLevelPermissions":{
    [operation]: {
      pointerFields: [‘field’]
      // default * Public removed
      // no other rules set
    }
  }
}
```

|Operation | user not pointed by field | user is pointed by field |
| - | - | - |
|get| 101: Object not found | ok |
|find| Limited results | ok |
|count| Limited count | ok |
|create| Permission denied | Permission denied |
|update| 101: Object not found | ok |
|delete| 101: Object not found | ok |
|addField| Permission denied | ok |

### Given CLP setup for an operation:

```js
{
  "classLevelPermissions":{
    [operation]: {
      // default * Public removed
      // pointer fields not set
      // no other rules set
    }
   }
}
```

Expected result is:

|Operation | result|
| --- | ---|
|get| Permission denied |
|find| Permission denied |
|count| Permission denied |
|create |Permission denied |
|update |Permission denied |
|delete |Permission denied |
|addField |Permission denied |

## `readUserFields` / `writeUserFields`

These are similar to `pointerFields`, but cover multiple operations at once:

**`readUserFields`**:

- `get`,
- `find`,
- `count`

**`writeUserFields`**:

- `update`,
- `delete`,
- `addField`

```js
// And schema
{
  classLevelPermissions:
  {
    "update": {
      "pointerFields": ["moderators"],
    },
    "readUserFields": ["owner", "foollowers", "moderators"],
    "writeUserFields": ["owner"]
    ...
  }
}
```

Notes:

- `create` operation can't be allowed by pointer, because there is literally no object to check it's field before it is created);
- `addField` by pointer will only work when you update an object with a new field, but it is advised to control addField permission using other means instead (e.g. restrict to a role or particular admin user by id).

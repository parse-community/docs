# Class Level Permissions

Setting Class Level Permissions through Defined Schema is a good first step into security systems available on Parse Server.

## CLP Parameters

These CLP parameters are available:

- `find`: Control search permissions
- `get`: Control direct ID get permission
- `count`: Control counting objects permission
- `create`: Create permission
- `update`: Update permission
- `delete`: Delete permission
- `protectedFields`: Control get permission at field level

You can set each CLP parameter to add a first strong security layer. This security layer will be applied on the Parse Class and will cover all Parse Objects of the Parse Class.

Note: If you update CLP you do not need to update Parse Objects. CLP is a security layer at Class Level not Object Level. For Object Level permission you can take a look to ALCs. You can use CLPs combined to ACLs to deeply secure your Parse Server.

## CLP Parameter Options

Available options for CLP parameters:

- `role:MyRole`: If you have already created a Parse Role, you can use your created Parse Role (ie: `MyRole`) in CLP keys.
- `requiresAuthentication`: If true an authenticated user will have the permission.
- `*`: Everybody has the permission
- `{}`: if you set the CLP key with `{}` like `create: {}` only calls with your Parse Server Master Key will have the permission

## CLP Protected Fields Parameter

This CLP parameter allows you to restrict access to fields to specific Parse users.

We will take the Parse User Class as example.

```js
// className: '_User'
{
    protectedFields: {
      "*": ["authData", "emailVerified", "password", "username"],
    },
}
```

Listed keys under `*` will be protected from all users. By default, `authData`, `emailVerified`, `password` are protected.
But in the above example we protect `username` from all users. So a Parse User, even authenticated will not be able to get the `username` of a another Parse User.

`protectedFields` could be also combined as in the following example.

```js
{
    protectedFields: {
      "*": ["authData", "emailVerified", "password", "username", "phone", "score"],
      "role:Admin": ["password", "authData", "emailVerified"],
      "role:VerifiedUser": ["password", "authData", "emailVerified", "score"],
    },
}
```

In the example above, a Parse User member of the Parse Role `Admin` will be able to get the `phone` and `score` of another Parse User. A Parse User member of the Parse Role `VerifiedUser` can only get `phone`.
If a Parse User is member of `VerifiedUser` and `Admin`, he will have access to `phone` and `score`.

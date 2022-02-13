# Class Level Permissions

Setting Class level permissions through Defined Schema is a good first step into security systems available on Parse Server.

## CLP Keys

These CLP keys are available:

- `find`: Control search permissions
- `get`: Control direct ID get permission
- `count`: Control counting objects permission
- `create`: Create permission
- `update`: Update permission
- `delete`: Delete permission
- `protectedFields`: Control get permission at field level

You can set each CLP field with options to add a first strong security layer. This security layer will be applied on the Parse Class and all Parse Objects into this class.

Note: If you update CLP you do not need to update Parse Objects. CLP is a security layer at Class Level not Object Level. For Object Level permission you can take a look to ALCs. You can use CLPs combined to ACLs to deeply secure your Parse Server.

## CLP Key Options

Available options for CLP keys:

- `role:MyRole`: If you have already created a Parse Role, you can use your created Parse Role (ie: `MyRole`) in CLP keys.
- `requiresAuthentication`: If true an authenticated user will have the permission.
- `*`: Everybody has the permission
- `{}`: if you set the CLP key with `{}` like `create: {}` only calls with your Parse Server Master Key will have the permission

## CLP Protected Fields Key

This CLP key is powerful and need some additional explanation.
We will take the Parse User class as example.

```js
{
    protectedFields: {
      "*": ["authData", "emailVerified", "password", "username"],
    },
}
```

Listed keys under `*` will be protected from all users. Don't worry by default, `authData`, `emailVerified`, `password` are protected.
But here for example we protect `username` from all users. So user A, even authenticated will not be able to get the `username` of a user B.

But protected fields could be combined for example.

```js
{
    protectedFields: {
      "*": ["authData", "emailVerified", "password", "username", "phone", "score"],
      "role:Admin": ["password", "authData", "emailVerified"],
      "role:VerifiedUser": ["password", "authData", "emailVerified", "score"],
    },
}
```

In this case, a user member of the Parse Role `Admin` will be able to get the `phone` and `score` of another User. A user member of the Parse Role `VerifiedUser` can only get `phone`.
If a user is member of `VerifiedUser` and `Admin`, he will have access to `phone` and `score`.

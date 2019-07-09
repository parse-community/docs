# Users

In general, users have the same features as other objects, such as the flexible schema. The differences are that user objects must have a username and password, the password is automatically encrypted and stored securely, and Parse Server enforces the uniqueness of the username and email fields.

Therefore you can manage users objects using the `create_User`, `get_User`, `find_User`, `update_User`, `delete_User`, and the generic operations with `_User` in the `className` argument.

Additionally, you can use the `signUp`, `logIn`, and `logOut` operations, which will be presented in the following sections.

## Signing Up

Signing up a new user differs from creating another object in that the `username` and `password` fields are required. The `password` field is handled differently than the others; it is encrypted with bcrypt when stored in the database and never returned to any client request.

You can ask Parse Server to verify user email addresses in your application settings. With this setting enabled, all new user registrations with an email field will generate an email confirmation at that address. You can check whether the user has verified their email with the `emailVerified` field.

To sign up a new user, use the `signUp` mutation. For example:

```graphql
mutation SignUp {
  users {
    signUp(fields: {
      username: "somedude"
      password: "Parse_3.5_Rocks!"
    }) {
      objectId
      createdAt
      sessionToken
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "users": {
      "signUp": {
        "objectId": "nkGmXzlTnA",
        "createdAt": "2019-07-08T23:59:35.694Z",
        "sessionToken": "r:9cfef8ec8e77c4e01f6e1069d0a199d8"
      }
    }
  }
}
```

Note that, in addition to the regular `objectId`, and `createdAt` fields, it is returned a new field called `sessionToken`. This token can be used to authenticate subsequent requests as this user.

## Logging In

## Session Token

## Logging Out
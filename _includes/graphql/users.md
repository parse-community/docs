# Users

In general, users have the same features as other objects, such as the flexible schema. The differences are that user objects must have a username and password, the password is automatically encrypted and stored securely, and Parse Server enforces the uniqueness of the username and email fields.

Therefore you can manage users objects using the `create_User`, `get_User`, `find_User`, `update_User`, `delete_User`, and the generic operations with `_User` in the `className` argument.

Additionally, you can use the `signUp`, `logIn`, and `logOut` operations, which will be presented in the following sections.

## Signing Up

## Logging In

## Session Token

## Logging Out
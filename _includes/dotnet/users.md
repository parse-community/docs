# Users

Many apps require user accounts for secure data access. Parse provides the `ParseUser` class, a specialized subclass of `ParseObject`, to handle user account management.

`ParseUser` has all the features of `ParseObject` (flexible schema, automatic persistence, key-value interface) plus user-specific additions.

## `ParseUser` Properties

*   **`Username`:**  (Required) The user's username.
*   **`Password`:** (Required for signup) The user's password.
*   **`Email`:** (Optional) The user's email address.

Setting `Username` and `Email` through these properties automatically updates the underlying `ParseObject` data. You don't need to use the indexer (`user["username"] = ...`) if you use the properties.

## Signing Up

```csharp
public async Task SignUpUserAsync(string username, string password, string email)
{
    try
    {
        var user = new ParseUser()
        {
            Username = username,
            Password = password,
            Email = email
        };

        // Optional: Add other fields
        user["phone"] = "415-392-0202";


        ParseUser onlineUser = await ParseClient.Instance.SignUpWithAsync(user); // Use SignUpWithAsync, NOT SaveAsync, for new users.
        // Signup successful!
        Console.WriteLine("User signed up successfully!");
         // The current user reference will be updated to this user.
        // You can now use ParseClient.Instance.GetCurrentUser(); or onlineUser

    }
    catch (Exceptino ex)
    {
        // Handle signup errors (e.g., username taken, invalid email)
        Console.WriteLine($"Signup failed: {ex.Message}");
         // The most likely case is that the username or email has already been taken by another user.
         // You should clearly communicate this to your users.
    }
}
```

Key points:

*   `SignParseClient.Instance.SignUpWithAsync(ParseUser user,CancellationToken cancellationToken = default)` creates the user on the Parse Server.
*   There also exists `SignParseClient.Instance.SignUpWithAsync(string userName, string password,CancellationToken cancellationToken = default)`
*   Passwords are *securely hashed* (using bcrypt) on the server.  They are *never* stored or transmitted in plain text.
*   Use `SignUpWithAsync()` for *new* users.  Use `SaveAsync()` for *updates* to existing users.
*   **Error Handling:** Always catch `Exception` to handle signup failures (duplicate username/email, network issues, etc.).

## Logging In

```csharp
public async Task<ParseUser?> LoginUserAsync(string username, string password)
{
    try
    {
        ParseUser user = await ParseClient.Instance.LogInWithAsync(username, password);
        // Login successful!
        Console.WriteLine("User logged in successfully!");
        return user;
        // The current user reference will be updated to this user.
        // You can now use ParseClient.Instance.GetCurrentUser();
    }
    catch (Exception ex)
    {
        // Handle login errors (e.g., incorrect username/password)
        Console.WriteLine($"Login failed: {ex.Message}");
        return null;
    }
}
```

*   `LogInAsync()` authenticates the user.
*   **Error Handling:** Catch `Exception` for login failures.

## Verifying Emails

Enabling email verification (in your Parse Server settings) adds the `emailVerified` field to `ParseUser`.

*   **`emailVerified = true`:** User clicked the verification link in the email sent by Parse.
*   **`emailVerified = false`:**  User hasn't verified their email.  Consider calling `FetchAsync()` on the `ParseUser` to get the latest status.
*   **`emailVerified` missing:** Email verification is off, or the user has no email.

When a user sets or changes their email, `emailVerified` is set to `false`, and Parse sends a verification email.

## Current User

The SDK caches the logged-in user.  This acts like a session.

```csharp
ParseUser? currentUser = await ParseClient.Instance.GetCurrentUser(); // Use ParseClient.Instance
if (currentUser != null)
{
    // User is logged in.
    Console.WriteLine($"Current user: {currentUser.Username}");
}
else
{
    // User is NOT logged in. Show login/signup UI.
}
```

*   `ParseClient.Instance.GetCurrentUser()` returns the cached user, or `null` if no user is logged in.
* **Important:** Always check if is not null, as user might log out from another device.

Log out the current user:

```csharp
await ParseClient.Instance.LogOutAsync();
ParseUser? currentUser = await ParseClient.Instance.GetCurrentUser(); // This will now be null.
```

## Setting the Current User (`becomeAsync`)

If you have your own authentication system or authenticate users server-side, you can pass a session token to the client and use `becomeAsync`:

```csharp
try
{
  ParseUser user = await ParseClient.Instance.BecomeAsync("session-token-here");
  // Current user is now set.
   Console.WriteLine("BecomeAsync successful!");
}
catch (ParseException ex)
{
  // Invalid session token.
  Console.WriteLine($"BecomeAsync failed: {ex.Message}");
}
```

This validates the session token before setting the current user.

## Security for User Objects

`ParseUser` objects are secured by default:

*   Only the user can *modify* their own `ParseUser` data.
*   By default, any client can *read* `ParseUser` data.

You can only call `SaveAsync()` or `DeleteAsync()` on a `ParseUser` obtained through authenticated methods (`LogInAsync`, `SignUpAsync`, `BecomeAsync`, or `ParseClient.Instance.GetCurrentUser()`).

```csharp
// Get the current, authenticated user.
ParseUser? user = await ParseClient.Instance.GetCurrentUser();

if (user != null)
{
    user.Username = "my_new_username";
    await user.SaveAsync(); // This will SUCCEED.

    await ParseClient.Instance.LogOutAsync();

    // Get the user via a query (unauthenticated).
    ParseQuery<ParseUser> query = ParseClient.Instance.GetQuery<ParseUser>();
    ParseUser? queriedUser = await query.GetAsync(user.ObjectId); // Use the objectId from the *original* user object

    if (queriedUser != null)
    {
       queriedUser.Username = "another_username";
        try
        {
            await queriedUser.SaveAsync(); // This will FAIL with a ParseException.
        }
        catch (ParseException ex)
        {
            Console.WriteLine("Save failed (as expected): " + ex.Message);
        }
    }

}
```

The `ParseUser` from `ParseClient.Instance.GetCurrentUser()` is *always* authenticated.

Check `IsAuthenticated` to see if a `ParseUser` is authenticated (but you don't need to do this for users obtained through authenticated methods).  This property is now obsolete. You can check if the user has a session token instead, if needed.

## Security for Other Objects (ACLs)

You can apply the same security model to other objects using Access Control Lists (`ParseACL`).

**Single User Access:**

```csharp
// Assuming you have a current, logged-in user
var privateNote = new ParseObject("Note");
privateNote["content"] = "This note is private!";
privateNote.ACL = new ParseACL(await ParseClient.Instance.GetCurrentUser()); // Set ACL to the current user.
await privateNote.SaveAsync();
```

This note is only accessible to the current user.

**Per-User Permissions:**

```csharp
var groupMessage = new ParseObject("Message");
var groupACL = new ParseACL();

// userList is an IEnumerable<ParseUser>
foreach (var user in userList)
{
    groupACL.SetReadAccess(user, true);
    groupACL.SetWriteAccess(user, true);
}

groupMessage.ACL = groupACL;
await groupMessage.SaveAsync();
```

**Public Read Access:**

```csharp
var publicPost = new ParseObject("Post");
// Grant read access to the public, but only the current user can write.
var postACL = new ParseACL(await ParseClient.Instance.GetCurrentUser())
{
    PublicReadAccess = true
    // Do NOT set PublicWriteAccess = true unless you want anyone to be able to modify it!
};
publicPost.ACL = postACL;
await publicPost.SaveAsync();
```

Forbidden operations (e.g., deleting an object without write access) result in a `ParseException` with a `ObjectNotFound` error code (for security reasons, to avoid revealing whether an object ID exists).

## Resetting Passwords

```csharp
public async Task RequestPasswordResetAsync(string email)
{
    try
    {
        await ParseClient.Instance.RequestPasswordResetAsync(email);
        // Password reset email sent!
        Console.WriteLine("Password reset email sent.");
    }
    catch (ParseException ex)
    {
        // Handle errors (e.g., email not found)
        Console.WriteLine($"Password reset request failed: {ex.Message}");
    }
}
```

This sends a password reset email to the user's email address (or username, if the username is an email). The email contains a link to a Parse-hosted page where the user can set a new password.

## Querying

```csharp
// LINQ (Recommended)
var women = await (from user in ParseClient.Instance.GetQuery<ParseUser>() // Use ParseClient.Instance and ParseUser
                   where user.Get<string>("gender") == "female"
                   select user).FindAsync();

// Fluent Syntax
var women = await ParseClient.Instance.GetQuery<ParseUser>()  // Use ParseClient.Instance and ParseUser
    .WhereEqualTo("gender", "female")
    .FindAsync();

 //Get by Id:
var user = await ParseClient.Instance.GetQuery<ParseUser>().GetAsync(objectId);
```

Use `ParseClient.Instance.GetQuery<ParseUser>()` to query for users.

## Associations

Associations with `ParseUser` work like any other `ParseObject`.

```csharp
// Create a new post for the current user
var post = new ParseObject("Post")
{
    { "title", "My New Post" },
    { "body", "This is some great content." },
    { "user", await ParseClient.Instance.GetCurrentUser() } // Link to the current user
};
await post.SaveAsync();

// Find all posts by the current user
var usersPosts = await (from p in ParseClient.Instance.GetQuery<ParseObject>("Post")
                        where p.Get<ParseUser>("user") == await ParseClient.Instance.GetCurrentUser()
                        select p).FindAsync();

// Or, using the fluent syntax
var usersPostsFluent = await ParseClient.Instance.GetQuery<ParseObject>("Post")
    .WhereEqualTo("user", await ParseClient.Instance.GetCurrentUser())
    .FindAsync();

```

## Facebook Users (TBD...)

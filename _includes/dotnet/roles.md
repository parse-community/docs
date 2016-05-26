# Roles

As your app grows in scope and user-base, you may find yourself needing more coarse-grained control over access to pieces of your data than user-linked ACLs can provide. To address this requirement, Parse supports a form of [Role-based Access Control](http://en.wikipedia.org/wiki/Role-based_access_control). Roles provide a logical way of grouping users with common access privileges to your Parse data. Roles are named objects that contain users and other roles.  Any permission granted to a role is implicitly granted to its users as well as to the users of any roles that it contains.

For example, in your application with curated content, you may have a number of users that are considered "Moderators" and can modify and delete content created by other users.  You may also have a set of users that are "Administrators" and are allowed all of the same privileges as Moderators, but can also modify the global settings for the application. By adding users to these roles, you can ensure that new users can be made moderators or administrators, without having to manually grant permission to every resource for each user.

We provide a specialized class called `ParseRole` that represents these role objects in your client code.  `ParseRole` is a subclass of `ParseObject`, and has all of the same features, such as a flexible schema, automatic persistence, and a key value interface.  All the methods that are on `ParseObject` also exist on `ParseRole`.  The difference is that `ParseRole` has some additions specific to management of roles.


## Properties

`ParseRole` has several properties that set it apart from `ParseObject`:

*   name: The name for the role.  This value is required, must be unique, and can only be set once as a role is being created.  The name must consist of alphanumeric characters, spaces, -, or _.  This name will be used to identify the Role without needing its objectId.
*   users: A [relation](#objects-pointers) to the set of users that will inherit permissions granted to the containing role.
*   roles: A [relation](#objects-pointers) to the set of roles whose users and roles will inherit permissions granted to the containing role.


## Security for Role Objects

The `ParseRole` uses the same security scheme (ACLs) as all other objects on Parse, except that it requires an ACL to be set explicitly. Generally, only users with greatly elevated privileges (e.g. a master user or Administrator) should be able to create or modify a Role, so you should define its ACLs accordingly.  Remember, if you give write-access to a `ParseRole` to a user, that user can add other users to the role, or even delete the role altogether.

To create a new `ParseRole`, you would write:

```csharp
// By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
var roleACL = new ParseACL()
roleACL.PublicReadAccess = true;
var role = new ParseRole("Administrator", roleACL);
await role.SaveAsync();
```

You can add users and roles that should inherit your new role's permissions through the "users" and "roles" relations on `ParseRole`:

```csharp
var role = new ParseRole(roleName, roleACL);
foreach (ParseUser user in usersToAddToRole)
{
    role.Users.Add(user);
}
foreach (ParseRole childRole in rolesToAddToRole)
{
    role.Roles.Add(childRole);
}
await role.SaveAsync();
```

Take great care when assigning ACLs to your roles so that they can only be modified by those who should have permissions to modify them.


## Security for Other Objects

Now that you have created a set of roles for use in your application, you can use them with ACLs to define the privileges that their users will receive. Each `ParseObject` can specify a `ParseACL`, which provides an access control list that indicates which users and roles should be granted read or write access to the object.

Giving a role read or write permission to an object is straightforward.  You can either use the `ParseRole`:

```csharp
var moderators = await (from role in ParseRole.Query
                        where role.Name == "Moderators"
                        select role).FirstAsync();
var wallPost = new ParseObject("WallPost");
var postACL = new ParseACL();
postACL.SetRoleWriteAccess(moderators, true);
wallPost.ACL = postACL;
await wallPost.SaveAsync();
```

You can avoid querying for a role by specifying its name for the ACL:

```csharp
var wallPost = new ParseObject("WallPost");
var postACL = new ParseACL();
postACL.SetRoleWriteAccess("Moderators", true);
wallPost.ACL = postACL;
await wallPost.SaveAsync();
```


## Role Hierarchy

As described above, one role can contain another, establishing a parent-child relationship between the two roles. The consequence of this relationship is that any permission granted to the parent role is implicitly granted to all of its child roles.

These types of relationships are commonly found in applications with user-managed content, such as forums. Some small subset of users are "Administrators", with the highest level of access to tweaking the application's settings, creating new forums, setting global messages, and so on. Another set of users are "Moderators", who are responsible for ensuring that the content created by users remains appropriate. Any user with Administrator privileges should also be granted the permissions of any Moderator. To establish this relationship, you would make your "Administrators" role a child role of "Moderators", like this:

```csharp
ParseRole administrators = /* Your "Administrators" role */;
ParseRole moderators = /* Your "Moderators" role */;
moderators.Roles.Add(administrators);
await moderators.SaveAsync();
```

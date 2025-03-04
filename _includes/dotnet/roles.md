# Roles

As your app grows, you may need more granular control over data access than user-linked ACLs provide. Parse supports Role-Based Access Control (RBAC) using `ParseRole` objects. Roles group users with common access privileges. Permissions granted to a role are implicitly granted to its users and to users of any child roles (roles contained within the role).

Example:  A content curation app might have "Moderators" (who can modify/delete content) and "Administrators" (who have Moderator privileges plus the ability to change app settings).  Adding users to these roles simplifies permission management.

`ParseRole` is a subclass of `ParseObject` with the same features (flexible schema, persistence, key-value interface) plus role-specific additions.

## `ParseRole` Properties

*   **`Name`:** (Required, Unique, Immutable) The role's name.  Must be alphanumeric, spaces, `-`, or `_`.  Used to identify the role without its `objectId`.  Cannot be changed after creation.
*   **`Users`:** A `ParseRelation<ParseUser>` to the users who inherit the role's permissions.
*   **`Roles`:** A `ParseRelation<ParseRole>` to child roles whose users and roles inherit the parent role's permissions.

## Security for Role Objects

`ParseRole` uses the same ACL-based security as other Parse objects, but you *must* set an ACL explicitly when creating a `ParseRole`.  Typically, only highly privileged users (e.g., administrators) should create or modify roles.  Carefully define ACLs to restrict role modification.  A user with write access to a role can add other users to it or even delete it.

**Creating a `ParseRole`:**

```csharp
// Create an "Administrator" role with restricted access.
var roleACL = new ParseACL()
{
    PublicReadAccess = true, // Allow everyone to *read* the role (e.g., to check if a user is in it).
    // Do NOT set PublicWriteAccess = true!  Only authorized users should modify roles.
};

// Option 1: Using ParseRole constructor.
var adminRole = new ParseRole("Administrator", roleACL);
await adminRole.SaveAsync();

// Option 2:  Using ParseObject (less common, but valid)
var adminRoleObj = new ParseObject("Role");
adminRoleObj["name"] = "Administrator";
adminRoleObj.ACL = roleACL;
await adminRoleObj.SaveAsync();


// Option 3: Using ParseClient and subclasses (best for subclasses)
[ParseClassName("Role")]
public class Role: ParseRole
{
    public Role() : base() { }
}

//....
ParseClient.Instance.RegisterSubclass<Role>();
//....

    var adminRoleSubClass = ParseClient.Instance.CreateObjectWithData<Role>(new Dictionary<string, object>
    {
        {"name","Administrator" }
    });
adminRoleSubClass.ACL = roleACL;
await adminRoleSubClass.SaveAsync();
```

**Adding Users and Child Roles:**

```csharp
// Assuming adminRole is an existing ParseRole, and you have lists of users and roles.

//Get the users relation
ParseRelation<ParseUser> usersRelation = adminRole.GetRelation<ParseUser>("users");
foreach (ParseUser user in usersToAddToRole)
{
    usersRelation.Add(user);
}
//Get the roles relation
ParseRelation<ParseRole> rolesRelation = adminRole.GetRelation<ParseRole>("roles");
foreach (ParseRole childRole in rolesToAddToRole)
{
    rolesRelation.Add(childRole);
}

await adminRole.SaveAsync();

// Alternative, using the Users and Roles properties if you have a subclass:
// Assuming 'Role' subclass as defined above.
// adminRole.Users.Add(user); // If you have a 'Users' property of type ParseRelation<ParseUser>
// adminRole.Roles.Add(childRole); // If you have a 'Roles' property of type ParseRelation<ParseRole>
```

**Important:**  Be *extremely* careful with role ACLs to prevent unauthorized modification.

## Role-Based Security for Other Objects

Use roles with ACLs to define object-level permissions.

**Granting Access to a Role:**

```csharp
// Option 1: Using a queried ParseRole object:
//(Make sure you registered your custom class first)
var moderators = await ParseClient.Instance.GetQuery<ParseRole>()
    .WhereEqualTo("name", "Moderators")
    .FirstOrDefaultAsync(); // Or FirstAsync() if you're sure it exists

if (moderators != null)
{
    var wallPost = new ParseObject("WallPost");
    var postACL = new ParseACL();
    postACL.SetRoleWriteAccess(moderators, true); // Grant write access to the Moderators role.
    // Could also set postACL.SetRoleReadAccess(moderators, true);
    wallPost.ACL = postACL;
    await wallPost.SaveAsync();
}

// Option 2: Using the role name directly (more efficient, avoids a query):
var wallPost = new ParseObject("WallPost");
var postACL = new ParseACL();
postACL.SetRoleWriteAccess("Moderators", true); // Grant write access by role name.
wallPost.ACL = postACL;
await wallPost.SaveAsync();
```

Option 2 is generally preferred as it avoids an extra query to fetch the role object.

## Role Hierarchy

Roles can contain other roles, creating a parent-child relationship.  Permissions granted to a parent role are implicitly granted to all child roles (and their children, recursively).

Example:  "Administrators" have all "Moderator" permissions, plus more.

```csharp
// Assuming you have existing ParseRole objects for "Administrators" and "Moderators".
//(Make sure you registered your custom class first)
ParseRole? administrators = await ParseClient.Instance.GetQuery<ParseRole>()
    .WhereEqualTo("name", "Administrators").FirstOrDefaultAsync();
ParseRole? moderators = await ParseClient.Instance.GetQuery<ParseRole>()
    .WhereEqualTo("name", "Moderators").FirstOrDefaultAsync();

if (administrators != null && moderators != null)
{
    moderators.GetRelation<ParseRole>("roles").Add(administrators); // Add "Administrators" as a *child* of "Moderators".
    //Or
    //moderators.Roles.Add(administrators);
    await moderators.SaveAsync();
}
```

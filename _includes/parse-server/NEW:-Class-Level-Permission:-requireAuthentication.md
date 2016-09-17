# Class Level Permissions

Classe level permissions are a security feature from parse-server that allows one to restrict access on a broader way than the ACL based permissions, for more informations, visit the [security section](https://parse.com/docs/rest/guide#security)

## new on parse-server: `requireAuthentication`

If you want to restrict access to a full class to only authenticated users, you can now use the CLP `requireAuthentication`. For example, you want to allow your **authenticated users** to `find` and `get` Objects from your application and your admin users to have all privileged, you would set the CLP:

```
// POST http://localhost:1337/schemas/:className 
// Set the X-Parse-Application-Id and X-Parse-Master-Key header
// body: 
{
  classLevelPermissions: 
  {
    "find": {
      "requireAuthentication": true,
      "role:admin": true
    },
    "get": {
      "requireAuthentication": true,
      "role:admin": true
    },
    "create": { "role:admin": true },
    "update": { "role:admin": true },
    "delete": { "role:admin": true },
  }
}
```

## Important note
Note that this is in no way securing your content, if you allow anyone to login to your server, every client will still be able to query this object.
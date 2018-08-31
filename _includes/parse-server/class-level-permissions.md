# Class Level Permissions

Class level permissions are a security feature from that allows one to restrict access on a broader way than the [ACL based permissions]({{ site.baseUrl }}/rest/guide/#security).

## `requiresAuthentication`

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

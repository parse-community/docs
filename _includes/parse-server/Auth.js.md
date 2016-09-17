##### Auth.js

---

Auth object, created to hold config/master/user information for requests

Also has helper methods for getting a public or master Auth object, or from a session token

See [[Config.js|Config.js]]

---

```
var auth = new Auth(config, isMaster, userObject);

var nobody = Auth.nobody(config);
var master = Auth.master(config);

var sessionAuth = Auth.getAuthForSessionToken(config, sessionToken);
```
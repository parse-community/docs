##### cache.js

---

Simple caching for the app and user sessions

---

```
// during a request
var user = cache.getUser(sessionToken);
if (!user) { ... }

// during login/signup
cache.setUser(sessionToken, userObject);

// during logout
cache.clearUser(sessionToken);

```

Also has an unused statistics object which could be used to implement in-memory analytics storage.
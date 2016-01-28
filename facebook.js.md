##### facebook.js

---

Helper functions for accessing the Graph API

---

```
// Make sure the provided access token matches the provided user
facebook.validateUserId(userId, accessToken).then( ... );

// Make sure the provided access token matches the app
facebook.validateAppId(appId, accessToken).then( ... );
```
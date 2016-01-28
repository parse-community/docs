##### rest.js

---

This file contains helpers for running operations in REST format.  The goal is that handlers that explicitly handle an express route should just be shallow wrappers around things in this file, but these functions should not explicitly depend on the request object.

This means that one of these handlers can support multiple routes. That's useful for the routes that do really similar things.

---

```
// Returns a promise for an object with optional keys 'results' and 'count'.
rest.find(config, auth, className, restWhere, restOptions).then( ... );

// Returns a promise that doesn't resolve to any useful value.
rest.del(config, auth, className, objectId).then( ... );

// Returns a promise for a {response, status, location} object.
rest.create(config, auth, className, restObject).then( ... );

// Returns a promise that contains the fields of the update that the
// REST API is supposed to return.  Usually, this is just updatedAt.
rest.update(config, auth, className, objectId, restObject).then( ... );
```
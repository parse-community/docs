##### RestQuery.js

---

An object that encapsulates everything we need to run a 'find' operation, encoded in the REST API format.

---

```
var query = new RestQuery(config, auth, className, restWhere, restOptions);

// A convenient method to perform all the steps of processing a query
// in order.
// Returns a promise for the response - an object with optional keys
// 'results' and 'count'.
query.execute().then( ... );
```
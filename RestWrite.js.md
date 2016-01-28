##### RestWrite.js

---

A RestWrite encapsulates everything we need to run an operation that writes to the database. This could be either a "create" or an "update".

---

```
// query and data are both provided in REST API format. So data
// types are encoded by plain old objects.
// If query is null, this is a "create" and the data in data should be
// created.
// Otherwise this is an "update" - the object matching the query
// should get updated with data.
// RestWrite will handle objectId, createdAt, and updatedAt for
// everything. It also knows to use triggers and special modifications
// for the _User class.
var write = new RestWrite(config, auth, className, query, data, originalData);

// A convenient method to perform all the steps of processing the
// write, in order.
// Returns a promise for a {response, status, location} object.
// status and location are optional.
write.execute().then( ... );
```
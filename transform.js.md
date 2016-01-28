##### transform.js

---

Transforms keys/values between Mongo and REST API formats.

**TODO:** Turn this into a helper library for [[DatabaseAdapter.js|DatabaseAdapter.js]]

---

```
// Transforms a key used in the REST API format to its mongo format.
function transformKey(schema, className, key) {

// Main exposed method to help run queries.
// restWhere is the "where" clause in REST API form.
// Returns the mongo form of the query.
// Throws a Parse.Error if the input query is invalid.
function transformWhere(schema, className, restWhere) { ... }

// Main exposed method to create new objects.
// restCreate is the "create" clause in REST API form.
// Returns the mongo form of the object.
function transformCreate(schema, className, restCreate) { ... }

// Main exposed method to help update old objects.
function transformUpdate(schema, className, restUpdate) { ... }

// Converts from a mongo-format object to a REST-format object.
// Does not strip out anything based on a lack of authentication.
function untransformObject(schema, className, mongoObject) { ... }
```
##### DatabaseAdapter.js

---

Interface for allowing the underlying database to be changed

Adapter classes must implement the following methods:
* a constructor with signature (connectionString, optionsObject)
* connect()
* loadSchema()
* create(className, object)
* find(className, query, options)
* update(className, query, update, options)
* destroy(className, query, options)
* This list is incomplete and the database process is not fully modularized.

---

See [[ExportAdapter.js|ExportAdapter.js]] for the default adapter implementation using MongoDB.

See [[transform.js|transform.js]] for additional database specific transformation logic.
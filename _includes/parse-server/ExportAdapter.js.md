##### ExportAdapter.js

---

DatabaseAdapter for MongoDB (default)

See [[DatabaseAdapter.js|DatabaseAdapter.js]]

---

```
// Connects automatically
var db = new ExportAdapter('mongodb://...', { collectionPrefix: '' });

// Get the mongo collection object
db.collection('TestObject').then((collection) => { ... });

// Load a copy of the schema
db.loadSchema().then((schema) => { ... });

// Validate a REST API formatted object against the schema (can update the stored schema)
db.validateObject('TestObject', myObject).then(() => { ... });

// Transform a database object to REST API format
var obj = db.untransformObject(schema, isMaster, aclGroup, className, mongoObject);

// Update the database
db.update(className, query, update, options).then( ... );

// Handle relation operations, mutates the update
db.handleRelationUpdates(className, objectId, update).then( ... );

// Adds a relation
db.addRelation(key, fromClassName, fromId, toId).then( ... );

// Removes a relation
db.removeRelation(key, fromClassName, fromId, toId).then( ... );

// Delete objects matching the query
db.destroy(className, query, options).then( ... );

// Create an object
db.create(className, object, options).then( ... );

// Get related Ids given an owning Id
db.relatedIds(className, key, owningId).then( ... );

// Get owning Ids given a list of related Ids
db.owningIds(className, key, relatedIds).then( ... );

// Processes any $in constraints, mutates the query
db.reduceInRelation(className, query, schema).then( ... );

// Processes any $relatedTo constraints, mutates the query
db.reduceRelationKeys(className, query).then( ... );

// Does a find with "smart indexing"
// Currently just adds indexes for geo-point fields if not already set.
db.smartFind(collection, where, options).then( ... );

// Runs a find on the database
db.find(className, query, options).then( ... );

```
# Getting Started

## Introduction

For use cases in which a pre-defined schema is beneficial or required, you can define class fields, indexes, Class Level Permissions and more

## Quick Start

You can use Defined Schema as in the following example.

```js
const { ParseServer } = require("parse-server");

const UserSchema = {
  className: "_User",
  fields: {
    birthDate: { type: "Date" },
    firstname: { type: "String", required: true },
    lastname: { type: "String", required: true },
    tags: { type: "Array" },
    location: { type: "GeoPoint" },
    city: { type: "Pointer", targetClass: "City" },
    friends: { type: "Relation", targetClass: "_User" },
    zone: { type: "Polygon" },
  },
  indexes: {
    tagsIndex: { tags: 1 },
    // Special _p_ word to create indexes on pointer fields
    cityPointerIndex: { _p_city: 1 },
    tagAndCityIndex: { _p_city: 1, tags: 1 },
  },
  classLevelPermissions: {
    find: { requiresAuthentication: true },
    count: { "role:Admin": true },
    get: { requiresAuthentication: true },
    update: { requiresAuthentication: true },
    create: { "role:Admin": true },
    delete: { "role:Admin": true },
    protectedFields: {
      // These fields will be protected from all other users
      // authData, and password are already protected by default
      "*": ["authData", "emailVerified", "password", "username"],
    },
  },
};

const City = {
  className: "City",
  fields: {
    name: { type: "String", required: true },
    location: { type: "GeoPoint" },
    country: { type: "Pointer", targetClass: "Country" },
  },
  classLevelPermissions: {
    find: { requiresAuthentication: true },
    count: { requiresAuthentication: true },
    get: { requiresAuthentication: true },
    // Only a user linked into the Admin Parse Role
    // authorized to manage cities
    update: { "role:Admin": true },
    create: { "role:Admin": true },
    delete: { "role:Admin": true },
  },
};

const Country = {
  className: "Country",
  fields: {
    name: { type: "String", required: true },
  },
  classLevelPermissions: {
    find: { requiresAuthentication: true },
    count: { requiresAuthentication: true },
    get: { requiresAuthentication: true },
    // Empty object meas that only master key
    // is authorized to manage countries
    update: {},
    create: {},
    delete: {},
  },
};

ParseServer.start({
  databaseURI: "mongodb://your.mongo.uri",
  appId: "myAppId",
  masterKey: "mySecretMasterKey",
  serverURL: "http://localhost:1337/parse",
  port: 1337,
  publicServerURL: "http://localhost:1337/parse",
  // Then just register schemas into Parse Server
  schema: {
    definitions: [User, City, Country],
    // Parse Schema API will be disabled
    // If you need to update schemas Parse server
    // need to be updated and deployed (CI/CD strategy)
    lockSchemas: true,
    // If true, Parse Server will delete non defined Classes from
    // the database. (Core classes like Role, User are never deleted)
    strict: true,
    // If true, a field type change, the changed field is deleted
    // from the database (all data in this field will be deleted)
    // and then create the field with the new type
    recreateModifiedFields: false,
    // If true, Parse will delete non defined fields on a class. (Core fields are never deleted)
    deleteExtraFields: false,
  },
  serverStartComplete: () => {
    // Here your Parse Server is ready
    // with schemas up to date

    // Just a code example if you want to expose
    // an endpoint when parse is fully initialized
    parseServer.expressApp.get("/ready", (req: any, res: any) => {
      res.send("true");
    });
  },
});
```

# Schema

Schema is the structure representing classes in your app. You can use the schema
of an app to verify operations in a unit test, generate test data, generate test
classes and then clean up after tests. The schema API can also be used to create
custom views of your data. We use the schema API to display column names and
types in the databrowser.

This API allows you to access the schemas of your app.

* Parse Server 2.7.1+
* `MasterKey` is required.

Schema will return an object similar to the following:

```javascript
{
  className: 'MyClass',
  fields: {
    // Default fields
    ACL: {type: 'ACL'},
    createdAt: {type: 'Date'},
    updatedAt: {type: 'Date'},
    objectId: {type: 'String'},
    // Custom fields
    aNumber: {type: 'Number'},
    aString: {type: 'String'},
    aBool: {type: 'Boolean'},
    aDate: {type: 'Date'},
    aObject: {type: 'Object'},
    aArray: {type: 'Array'},
    aGeoPoint: {type: 'GeoPoint'},
    aPolygon: {type: 'Polygon'},
    aFile: {type: 'File'}
  },
  classLevelPermissions: {
    find: {
      '*': true
    },
    create: {
      '*': true
    },
    get: {
      '*': true
    },
    update: {
      '*': true
    },
    addField: {
      '*': true
    },
    delete: {
      '*': true
    }
  },
  indexes: {
    indexName: { aString: 1 },
  }
}
```

Direct manipulation of the classes that are on your server is possible through ParseSchema. Although fields and classes can be automatically generated (the latter assuming client class creation is enabled) ParseSchema gives you explicit control over these classes and their fields.

*With great power comes great responsibility. Altering the schema directly should be done with care, you can't go back to retrieve data if you remove a field and it's associated values.*

```javascript
// create an instance to manage your class
const mySchema = new Parse.Schema('MyClass');

// gets the current schema data
mySchema.get();

// returns schema for all classes
Parse.Schema.all()

// add any # of fields, without having to create any objects
mySchema
  .addString('stringField')
  .addNumber('numberField')
  .addBoolean('booleanField')
  .addDate('dateField')
  .addFile('fileField')
  .addGeoPoint('geoPointField')
  .addPolygon('polygonField')
  .addArray('arrayField')
  .addObject('objectField')
  .addPointer('pointerField', '_User')
  .addRelation('relationField', '_User');

// new types can be added as they are available
mySchema.addField('newField', 'ANewDataType')

// save/update this schema to persist your field changes
mySchema.save().then((result) => {
  // returns save new schema
});
// or
mySchema.update().then((result) => {
  // updates existing schema
});
```

Assuming you want to remove a field you can simply call `deleteField` and `save/update` to clear it out.

```javascript
mySchema.deleteField('stringField');
mySchema.save();
// or for an existing schema...
mySchema.update();
```

## Indexes

Indexes support efficient execution of queries from the database. Keep in mind that the `masterKey` is required for these operations, so be sure it's set in your initialization code before you use this feature.

```javascript
// To add an index, the field must exist before you create an index
mySchema.addString('stringField');
const index = {
  stringField: 1
};
mySchema.addIndex('stringFieldIndex', index);
mySchema.save().then((result) => {
  // returns schema including index stringFieldIndex and field stringField
});

// Delete an index
testSchema.deleteIndex('indexName');
mySchema.save().then((result) => {
  // returns schema without indexName index
});

// If indexes exist, you can retrieve them
mySchema.get().then((result) => {
  // result.indexes
});
```

## Purge

All objects can be purged from a schema (class) via purge. But *be careful*! This can be considered an irreversible action. Only do this if you really need to delete all objects from a class, such as when you need to delete the class (as in the code example above).

```javascript
// delete all objects in the schema
mySchema.purge();
```


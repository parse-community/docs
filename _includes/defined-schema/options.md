# Options

## definitions

You classes definitions stored in an `Array`.

## strict

You can set the `strict` option to `true` if you want parse-server to delete removed classes from your schemas from your database. Data stored in removed classes will be lost.

`strict` is default to `false`. If you often change your schemas be aware that you can have some stale classes in your database. You will need to delete these classes manually.

## deleteExtraFields

You can set the `deleteExtraFields` option to `true` if you parse-server to delete removed a class field from your database. Data stored in the removed field will be lost.

`deleteExtraFields` is default to `false`. Be aware that some stale fields could exists in your database. You will need to delete these fields manually.

## recreateModifiedFields

You can set the `recreateModifiedFields` option to `true` if you parse-server to clean field data before parse-server update the field type when you change the type of a field (ie: from `String` to `Number`). Data stored on the modified field will be lost.

`recreateModifiedFields` is default to `false`. Be aware that if you do not perform some data migration, you can result with data type inconsistency on modified field.

On production a good practice could be to create a new field with your new type, and then create a Parse Cloud Job to migrate old field data to the new created field.

## lockSchemas

You can set the `lockSchemas` option to `true` if you want to to prevent any `Parse.Schema` manipulation outside of the Defined Schema feature. If this options is `true` any create/update/delete request to `Parse.Schema` will be denied. You will not be able to manipulate `indexes`, `classLevelPermissions`, `fields`.

This option help to keep one source of truth. And prevent developers or custom code to interfere with your schema definitions and data structure, even with the master key.

## beforeMigration

A function called before parse-server performs schema updates based on the `definitions` option

## afterMigration

A function called after parse-server performed schema updates based on the `definitions` option

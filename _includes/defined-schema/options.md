# Options

## definitions

An array of your Defined Parse Classes.

## strict

You can set the `strict` option to `true` if you want Parse Server to delete all Parse Objects when you remove a Defined Parse Class from your `definitions`. Data stored in removed classes will be lost.

`strict` is default to `false`. If you often change your schemas be aware that you will have stale data classes in your database. You will need to delete these classes (collection for MongoDB, table for Postgres) manually, through your database CLI/UI.

## deleteExtraFields

You can set the `deleteExtraFields` option to `true` if you want Parse Server to delete a removed Defined Parse Class field from your database. Data stored in the removed field will be lost.

`deleteExtraFields` is default to `false`. Be aware that you will have stale data fields in your database since Parse Server will not delete field data automatically. You will need to delete these fields manually.

## recreateModifiedFields

You can set the `recreateModifiedFields` option to `true` if you want Parse Server to clean field data before Parse Server update the field type when you change the type of a field (ie: from `String` to `Number`). Data stored on the modified field will be lost.

`recreateModifiedFields` is default to `false`. Be aware that if you do not perform some data migration, you can result with data type inconsistency on modified field.

On production a good practice could be to create a new field with your new type, and then create a Parse Cloud Job to migrate old field data to the new created field.

## lockSchemas

You can set the `lockSchemas` option to `true` if you want to to prevent any `Parse.Schema` manipulation outside of the Defined Schema feature. If this options is `true` any create/update/delete request to `Parse.Schema` will be denied. You will not be able to manipulate `indexes`, `classLevelPermissions`, `fields`.

This option help to keep one source of truth. And prevent developers or custom code to interfere with your schema definitions and data structure, even with the master key.

## beforeMigration

A function called before parse-server performs schema updates based on the `definitions` option

## afterMigration

A function called after parse-server performed schema updates based on the `definitions` option

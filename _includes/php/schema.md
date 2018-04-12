# Schema

Direct manipulation of the classes that are on your server is possible through `ParseSchema`. Although fields and classes can be automatically generated (the latter assuming client class creation is enabled) ParseSchema gives you explicit control over these classes and their fields.

<pre><code class="php">
// create an instance to manage your class
$mySchema = new ParseSchema("MyClass");

// gets the current schema data as an associative array, for inspection
$data = $mySchema->get();

// add any # of fields, without having to create any objects
$mySchema->addString('string_field');
$mySchema->addNumber('num_field');
$mySchema->addBoolean('bool_field');
$mySchema->addDate('date_field');
$mySchema->addFile('file_field');
$mySchema->addGeoPoint('geopoint_field');
$mySchema->addPolygon('polygon_field');
$mySchema->addArray('array_field');
$mySchema->addObject('obj_field');
$mySchema->addPointer('pointer_field');

// you can even setup pointer/relation fields this way
$mySchema->addPointer('pointer_field', 'TargetClass');
$mySchema->addRelation('relation_field', 'TargetClass');

// new types can be added as they are available
$mySchema->addField('new_field', 'ANewDataType');

// save/update this schema to persist your field changes
$mySchema->save();
// or
$mySchema->update();
</code></pre>

Assuming you want to remove a field you can simply call `deleteField` and `save/update` to clear it out.

<pre><code class="php">
$mySchema->deleteField('string_field');
$mySchema->save():
// or for an existing schema...
$mySchema->update():
</code></pre>

## Indexes

Indexes support efficient execution of queries from the database. Keep in mind that the masterKey is required for these operations, so be sure it's set in your initialization code before you use this feature.

<pre><code class="php">
// To add an index, the field must exist before you create an index
$schema->addString('field');
$index = [ 'field' => 1 ];
$schema->addIndex('index_name', $index);
$schema->save();

// Delete an index
$schema->deleteIndex('index_name');
$schema->save();

// If indexes exist, you can retrieve them
$result = $schema->get();
$indexes = $result['indexes'];
</code></pre>

## Purge

All objects can be purged from a schema (class) via `purge`. But be careful! This can be considered an irreversible action. Only do this if you really need to delete all objects from a class, such as when you need to delete the class (as in the code example above).

<pre><code class="php">
// delete all objects in the schema
$mySchema->purge();
</code></pre>
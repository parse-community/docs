## Objects
You can create custom objects by calling:
```dart
var dietPlan = ParseObject('DietPlan')
	..set('Name', 'Ketogenic')
	..set('Fat', 65);
await dietPlan.save();
```
Verify that the object has been successfully saved using
```dart
var response = await dietPlan.save();
if (response.success) {
   dietPlan = response.results.first;
}
```
Types supported:
 * String
 * Double
 * Int
 * Boolean
 * DateTime
 * File
 * Geopoint
 * ParseObject/ParseUser (Pointer)
 * Map
 * List (all types supported)

You then have the ability to do the following with that object:
The features available are:-
 * Get
 * GetAll
 * Create
 * Save
 * Query - By object Id
 * Delete
 * Complex queries as shown above
 * Pin
 * Plenty more
 * Counters
 * Array Operators

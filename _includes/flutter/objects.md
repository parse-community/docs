# Objects

You can create custom objects by calling:
```dart
var dietPlan = ParseObject('DietPlan')
	..set('Name', 'Ketogenic')
	..set('Fat', 65);
await dietPlan.save();
```
Or update existing object by its objectId by calling:
```dart
var dietPlan = ParseObject('DietPlan')
	..objectId = 'R5EonpUDWy'
	..set('Fat', 70);
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

## Custom Objects
You can create your own `ParseObjects` or convert your existing objects into Parse Objects by doing the following:

```dart
class DietPlan extends ParseObject implements ParseCloneable {

  DietPlan() : super(_keyTableName);
  DietPlan.clone(): this();

  /// Looks strangely hacky but due to Flutter not using reflection, we have to
  /// mimic a clone
  @override clone(Map map) => DietPlan.clone()..fromJson(map);

  static const String _keyTableName = 'Diet_Plans';
  static const String keyName = 'Name';
  
  String get name => get<String>(keyName);
  set name(String name) => set<String>(keyName, name);
}
  
```

When receiving an `ParseObject` from the SDK, you can often provide an instance of your custom object as an copy object.
To always use your custom object class, you can register your subclass at the initialization of the SDK.
```dart
Parse().initialize(
   ...,
   registeredSubClassMap: <String, ParseObjectConstructor>{
     'Diet_Plans': () => DietPlan(),
   },
   parseUserConstructor: (username, password, emailAddress, {client, debug, sessionToken}) => CustomParseUser(username, password, emailAddress),
);
```
Additionally you can register `SubClasses` after the initialization of the SDK.
```dart
ParseCoreData().registerSubClass('Diet_Plans', () => DietPlan());
ParseCoreData().registerUserSubClass((username, password, emailAddress, {client, debug, sessionToken}) => CustomParseUser(username, password, emailAddress));
```
Providing a `ParseObject` as described above should still work, even if you have registered a different `SubClass`.

For custom file classes have a lock at [here](#File).

## Add New Values to Objects
To add a variable to an object call and retrieve it, call

```dart
dietPlan.set<int>('RandomInt', 8);
var randomInt = dietPlan.get<int>('RandomInt');
```

## Save Objects using Pins

You can now save an object by calling `.pin()` on an instance of an object

```dart
dietPlan.pin();
```

and to retrieve it

```dart
var dietPlan = DietPlan().fromPin('OBJECT ID OF OBJECT');
```

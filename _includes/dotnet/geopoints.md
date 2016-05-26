# GeoPoints

Parse allows you to associate real-world latitude and longitude coordinates with an object.  Adding a `ParseGeoPoint` to a `ParseObject` allows queries to take into account the proximity of an object to a reference point.  This allows you to easily do things like find out what user is closest to another user or which places are closest to a user.

## ParseGeoPoint

To associate a point with an object you first need to create a `ParseGeoPoint`.  For example, to create a point with latitude of 40.0 degrees and -30.0 degrees longitude:

```csharp
var point = new ParseGeoPoint(40.0, -30.0);
```

This point is then stored in the object as a regular field.

```csharp
placeObject["location"] = point;
```

Note: Currently only one key in a class may be a `ParseGeoPoint`.

## Geo Queries

Now that you have a bunch of objects with spatial coordinates, it would be nice to find out which objects are closest to a point.  This can be done by adding another restriction to a `ParseQuery` using `WhereNear`.  Getting a list of ten places that are closest to a user may look something like:

```csharp
// User's location
var userGeoPoint = ParseUser.CurrentUser.Get<ParseGeoPoint>("location");
// Create a query for places
var query = ParseObject.GetQuery("PlaceObject");
//Interested in locations near user.
query = query.WhereNear("location", userGeoPoint);
// Limit what could be a lot of points.
query = query.Limit(10);
// Final list of nearby places
var placeObjects = await query.FindAsync();
```

At this point `placesObjects` will be an `IEnumerable<ParseObject>` of `PlaceObject`s ordered by distance (nearest to farthest) from `userGeoPoint`.

To limit the results using distance check out `WhereWithinDistance`,.

It's also possible to query for the set of objects that are contained within a particular area.  To find the objects in a rectangular bounding box, add the `WhereWithinGeoBox` restriction to your `ParseQuery`.

```csharp
var swOfSF = new ParseGeoPoint(37.708813, -122.526398);
var neOfSF = new ParseGeoPoint(37.822802, -122.373962);
var query = ParseObject.GetQuery("PizzaPlaceObject")
    .WhereWithinGeoBox("location", swOfSF, neOfSF);
var pizzaPlacesInSF = await query.FindAsync();
```

## Geo Distances

Parse makes it easy to find the distance between two GeoPoints and query based upon that distance. For example, to get a distance in kilometers between two points, you can use the `DistanceTo` method:

```csharp
ParseGeoPoint p1 = /* Some location */;
ParseGeoPoint p2 = /* Some other location */;
double distanceInKm = p1.DistanceTo(p2).Kilometers;
```

You can also query for `ParseObject`s within a radius using a `ParseGeoDistance`. For example, to find all places within 5 miles of a user, you would use the `WhereWithinDistance` method:

```csharp
ParseGeoPoint userGeoPoint = ParseUser.CurrentUser.Get<ParseGeoPoint>("location");
ParseQuery<ParseObject> query = ParseObject.GetQuery("PlaceObject")
    .WhereWithinDistance("location", userGeoPoint, ParseGeoDistance.FromMiles(5));
IEnumerable<ParseObject> nearbyLocations = await query.FindAsync();
// nearbyLocations contains PlaceObjects within 5 miles of the user's location
```

At this point, `nearbyLocations` will be an array of objects ordered by distance (nearest to farthest) from `userGeoPoint`. Note that if an additional `OrderBy()` constraint is applied, it will take precedence over the distance ordering.

## Caveats

At the moment there are a couple of things to watch out for:

1.  Each ParseObject class may only have one key with a ParseGeoPoint object.
2.  Using the `whereNear` constraint will also limit results to within 100 miles.
3.  Points should not equal or exceed the extreme ends of the ranges.  Latitude should not be -90.0 or 90.0.  Longitude should not be -180.0 or 180.0.  Attempting to set latitude or longitude out of bounds will cause an error.

# GeoPoints

Parse allows you to associate real-world latitude and longitude coordinates with an object.  Adding a `Parse.GeoPoint` to a `%{ParseObject}` allows queries to take into account the proximity of an object to a reference point.  This allows you to easily do things like find out what user is closest to another user or which places are closest to a user.

## Parse.GeoPoint

To associate a point with an object you first need to create a `Parse.GeoPoint`.  For example, to create a point with latitude of 40.0 degrees and -30.0 degrees longitude:

```js
var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
```

This point is then stored in the object as a regular field.

```js
placeObject.set("location", point);
```

Note: Currently only one key in a class may be a `Parse.GeoPoint`.

## Geo Queries

Now that you have a bunch of objects with spatial coordinates, it would be nice to find out which objects are closest to a point.  This can be done by adding another restriction to `%{ParseQuery}` using `near`.  Getting a list of ten places that are closest to a user may look something like:

```js
// User's location
var userGeoPoint = userObject.get("location");
// Create a query for places
var query = new Parse.Query(PlaceObject);
// Interested in locations near user.
query.near("location", userGeoPoint);
// Limit what could be a lot of points.
query.limit(10);
// Final list of objects
query.find({
  success: function(placesObjects) {
  }
});
```

 At this point `placesObjects` will be an array of objects ordered by distance (nearest to farthest) from `userGeoPoint`. Note that if an additional `ascending()`/`descending()` order-by constraint is applied, it will take precedence over the distance ordering.

To limit the results using distance, check out `withinMiles`, `withinKilometers`, and `withinRadians`.

It's also possible to query for the set of objects that are contained within a particular area.  To find the objects in a rectangular bounding box, add the `withinGeoBox` restriction to your `%{ParseQuery}`.

```js
var southwestOfSF = new Parse.GeoPoint(37.708813, -122.526398);
var northeastOfSF = new Parse.GeoPoint(37.822802, -122.373962);

var query = new Parse.Query(PizzaPlaceObject);
query.withinGeoBox("location", southwestOfSF, northeastOfSF);
query.find({
  success: function(pizzaPlacesInSF) {
    ...
  }
});
```

## Caveats

At the moment there are a couple of things to watch out for:

1.  Each Parse.Object class may only have one key with a Parse.GeoPoint object.
2.  Using the `near` constraint will also limit results to within 100 miles.
3.  Points should not equal or exceed the extreme ends of the ranges.  Latitude should not be -90.0 or 90.0.  Longitude should not be -180.0 or 180.0.  Attempting to set latitude or longitude out of bounds will cause an error.

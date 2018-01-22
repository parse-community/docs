# GeoPoints

Parse allows you to associate real-world latitude and longitude coordinates with an object.  Adding a `ParseGeoPoint` to a `ParseObject` allows queries to take into account the proximity of an object to a reference point.  This allows you to easily do things like find out what user is closest to another user or which places are closest to a user.

## ParseGeoPoint

To associate a point with an object you first need to create a `ParseGeoPoint`.  For example, to create a point with latitude of 40.0 degrees and -30.0 degrees longitude:

```java
ParseGeoPoint point = new ParseGeoPoint(40.0, -30.0);
```

This point is then stored in the object as a regular field.

```java
placeObject.put("location", point);
```

To retrieve a `ParseGeoPoint` from an object.

```java
placeObject.getParseGeoPoint("location");
```

## ParsePolygon

Parse allows you to associate polygon coordinates with an object. Adding a `ParsePolygon` to a `ParseObject` allows queries to determine whether a `ParseGeoPoint` is within a `ParsePolygon` or if a `ParsePolygon` contains a `ParseGeoPoint` .

* `ParsePolygon` must contain at least three coordinates.

For example, to create a polygon with coordinates (0, 0), (0, 1), (1, 1), (1, 0).

```java
List<ParseGeoPoint> points = new ArrayList<ParseGeoPoint>();
points.add(new ParseGeoPoint(0,0));
points.add(new ParseGeoPoint(0,1));
points.add(new ParseGeoPoint(1,1));
points.add(new ParseGeoPoint(1,0));

ParsePolygon polygon = new ParsePolygon(points);
```

This point is then stored in the object as a regular field.

```java
placeObject.put("bounds", polygon);
```

To retrieve a `ParsePolygon` from an object.

```java
placeObject.getParsePolygon("bounds");
```

## Geo Queries

Now that you have a bunch of objects with spatial coordinates, it would be nice to find out which objects are closest to a point.  This can be done by adding another restriction to `ParseQuery` using `whereNear`.  Getting a list of ten places that are closest to a user may look something like:

```java
ParseGeoPoint userLocation = (ParseGeoPoint) userObject.get("location");
ParseQuery<ParseObject> query = ParseQuery.getQuery("PlaceObject");
query.whereNear("location", userLocation);
query.setLimit(10);
query.findInBackground(new FindCallback<ParseObject>() { ... });
```

At this point `nearPlaces` will be an array of objects ordered by distance (nearest to farthest) from `userLocation`. Note that if an additional `orderByAscending()`/`orderByDescending()` constraint is applied, it will take precedence over the distance ordering.

To limit the results using distance, check out `whereWithinKilometers`, `whereWithinMiles`, and `whereWithinRadians`.

It's also possible to query for the set of objects that are contained within a particular area.  To find the objects in a rectangular bounding box, add the `whereWithinGeoBox` restriction to your `ParseQuery`.

```java
ParseGeoPoint southwestOfSF = new ParseGeoPoint(37.708813, -122.526398);
ParseGeoPoint northeastOfSF = new ParseGeoPoint(37.822802, -122.373962);
ParseQuery<ParseObject> query = ParseQuery.getQuery("PizzaPlaceObject");
query.whereWithinGeoBox("location", southwestOfSF, northeastOfSF);
query.findInBackground(new FindCallback<ParseObject>() { ... });
```

You can query for whether an object lies within or on a polygon of `Parse.GeoPoint`.

```java
ParseGeoPoint point = new ParseGeoPoint(0.5, 0.5);
ParseQuery<ParseObject> query = ParseQuery.getQuery("PlaceObject");
query.wherePolygonContains("location", point);
```

You can also query for whether an object `Parse.Polygon` contains a `Parse.GeoPoint`.

```java
ParseGeoPoint point = new ParseGeoPoint(0.5, 0.5);
ParseQuery<ParseObject> query = ParseQuery.getQuery("PlaceObject");
query.wherePolygonContains("location", point);
```

To efficiently find if a `ParsePolygon` contains a `ParseGeoPoint` without querying use `containsPoint`.

```java
List<ParseGeoPoint> points = new ArrayList<ParseGeoPoint>();
points.add(new ParseGeoPoint(0, 0));
points.add(new ParseGeoPoint(0, 1));
points.add(new ParseGeoPoint(1, 1));
points.add(new ParseGeoPoint(1, 0));

ParseGeoPoint inside = new ParseGeoPoint(0.5, 0.5);
ParseGeoPoint outside = new ParseGeoPoint(10, 10);

ParsePolygon polygon = new ParsePolygon(points);

// Returns True
polygon.containsPoint(inside);

// Returns False
polygon.containsPoint(outside);
```

## Parcelable

As most public facing components of the SDK, `ParseGeoPoint` and `ParsePolygon` implements the `Parcelable` interface. This means you can retain a `ParseGeoPoint` and `ParsePolygon` during configuration changes, or pass it to other components of the app through `Bundles`. To achieve this, depending on the context, use either `Parcel#writeParcelable(Parcelable, int)` or `Bundle#putParcelable(String, Parcelable)`. For instance, in an Activity,

```java
private ParseGeoPoint point;

@Override
protected void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    outState.putParcelable("point", point);
}

@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
  if (savedInstanceState != null) {
    point = (ParseGeoPoint) savedInstanceState.getParcelable("point");
  }
}
```

```java
private ParsePolygon polygon;

@Override
protected void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    outState.putParcelable("polygon", polygon);
}

@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
  if (savedInstanceState != null) {
    polygon = (ParsePolygon) savedInstanceState.getParcelable("polygon");
  }
}
```

## Caveats

At the moment there are a couple of things to watch out for:

1.  Each ParseObject class may only have one key with a ParseGeoPoint object.
2.  Using the `whereNear` constraint will also limit results to within 100 miles.
3.  Points should not equal or exceed the extreme ends of the ranges.  Latitude should not be -90.0 or 90.0.  Longitude should not be -180.0 or 180.0.  Attempting to set latitude or longitude out of bounds will cause an error.

# GeoPoints

Parse allows you to associate real-world latitude and longitude coordinates with an object.  Adding a `GeoPoint` data type to a class allows queries to take into account the proximity of an object to a reference point.  This allows you to easily do things like find out what user is closest to another user or which places are closest to a user.

## GeoPoint

To associate a point with an object you will need to embed a `GeoPoint` data type into your object.  This is done by using a JSON object with `__type` set to the string `GeoPoint` and numeric values being set for the `latitude` and `longitude` keys.  For example, to create an object containing a point under the "location" key with a latitude of 40.0 degrees and -30.0 degrees longitude:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "location": {
          "__type": "GeoPoint",
          "latitude": 40.0,
          "longitude": -30.0
        }
      }' \
  https://api.parse.com/1/classes/PlaceObject
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/PlaceObject', json.dumps({
       "location": {
         "__type": "GeoPoint",
         "latitude": 40.0,
         "longitude": -30.0
       }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Geo Queries

Now that you have a bunch of objects with spatial coordinates, it would be nice to find out which objects are closest to a point.  This can be done by using a `GeoPoint` data type with query on the field using `$nearSphere`.  Getting a list of ten places that are closest to a user may look something like:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'limit=10' \
  --data-urlencode 'where={
        "location": {
          "$nearSphere": {
            "__type": "GeoPoint",
            "latitude": 30.0,
            "longitude": -20.0
          }
        }
      }' \
  https://api.parse.com/1/classes/PlaceObject
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"limit":10,"where":json.dumps({
       "location": {
         "$nearSphere": {
           "__type": "GeoPoint",
           "latitude": 30.0,
           "longitude": -20.0
         }
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/PlaceObject?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

This will return a list of results ordered by distance from 30.0 latitude and -20.0 longitude. The first result will be the nearest object. (Note that if an explicit `order` parameter is supplied, it will take precedence over the distance ordering.) For example, here are two results returned for the above query: 

<pre><code class="json">
{
  "results": [
    {
      "location": {
        "latitude": 40.0,
        "__type": "GeoPoint",
        "longitude": -30.0
      },
      "updatedAt": "2011-12-06T22:36:04.983Z",
      "createdAt": "2011-12-06T22:36:04.983Z",
      "objectId": "iFEPN5Gwoz"
    },
    {
      "location": {
        "latitude": 60.0,
        "__type": "GeoPoint",
        "longitude": -20.0
      },
      "updatedAt": "2011-12-06T22:36:26.143Z",
      "createdAt": "2011-12-06T22:36:26.143Z",
      "objectId": "LAyNKSNTHT"
    }
  ]
}
</code></pre>

To limit the search to a maximum distance add a `$maxDistanceInMiles` (for miles), `$maxDistanceInKilometers` (for kms), or `$maxDistanceInRadians` (for radian angle), term to the key constraint.  For example, the following limits the radius to 10 miles:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={
        "location": {
          "$nearSphere": {
            "__type": "GeoPoint",
            "latitude": 30.0,
            "longitude": -20.0
          },
          "$maxDistanceInMiles": 10.0
        }
      }' \
  https://api.parse.com/1/classes/PlaceObject
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "location": {
         "$nearSphere": {
           "__type": "GeoPoint",
           "latitude": 30.0,
           "longitude": -20.0
         },
         "$maxDistanceInMiles": 10.0
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/PlaceObject?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

It's also possible to query for the set of objects that are contained within a particular area.  To find the objects in a rectangular bounding box, add a clause to the key constraint with the format `{"$within": {"$box": {[southwestGeoPoint, northeastGeoPoint]}}}`.

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={
        "location": {
          "$within": {
            "$box": [
              {
                "__type": "GeoPoint",
                "latitude": 37.71,
                "longitude": -122.53
              },
              {
                "__type": "GeoPoint",
                "latitude": 30.82,
                "longitude": -122.37
              }
            ]
          }
        }
      }' \
  https://api.parse.com/1/classes/PizzaPlaceObject
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "location": {
         "$within": {
           "$box": [
             {
               "__type": "GeoPoint",
               "latitude": 37.71,
               "longitude": -122.53
             },
             {
               "__type": "GeoPoint",
               "latitude": 30.82,
               "longitude": -122.37
             }
           ]
         }
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/PizzaPlaceObject?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Caveats

At the moment there are a couple of things to watch out for:

1.  Each PFObject class may only have one key with a PFGeoPoint object.
2.  Using the `$nearSphere` constraint will also limit results to within 100 miles.
3.  Points should not equal or exceed the extreme ends of the ranges.  Latitude should not be -90.0 or 90.0.  Longitude should not be -180.0 or 180.0.  Attempting to use `GeoPoint`'s with latitude and/or longitude outside these ranges will cause an error.

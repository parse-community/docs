# Queries

## Basic Queries

You can retrieve multiple objects at once by sending a GET request to the class URL. Without any URL parameters, this simply lists objects in the class:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/classes/GameScore', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The return value is a JSON object that contains a `results` field with a JSON array that lists the objects.

<pre><code class="json">
{
  "results": [
    {
      "playerName": "Jang Min Chul",
      "updatedAt": "2011-08-19T02:24:17.787Z",
      "cheatMode": false,
      "createdAt": "2011-08-19T02:24:17.787Z",
      "objectId": "A22v5zRAgd",
      "score": 80075
    },
    {
      "playerName": "Sean Plott",
      "updatedAt": "2011-08-21T18:02:52.248Z",
      "cheatMode": false,
      "createdAt": "2011-08-20T02:06:57.931Z",
      "objectId": "Ed1nuqPvcm",
      "score": 73453
    }
  ]
}
</code></pre>


## Query Constraints

There are several ways to put constraints on the objects found, using the `where` URL parameter. The value of the `where` parameter should be encoded JSON. Thus, if you look at the actual URL requested, it would be JSON-encoded, then URL-encoded. The simplest use of the `where` parameter is constraining the value for keys. For example, if we wanted to retrieve Sean Plott's scores that were not in cheat mode, we could do:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"playerName":"Sean Plott","cheatMode":false}' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "playerName": "Sean Plott",
       "cheatMode": False
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The values of the `where` parameter also support comparisons besides exact matching. Instead of an exact value, provide a hash with keys corresponding to the comparisons to do. The `where` parameter supports these options:

| Key         | Operation                        |
|------------------------------------------------|
| $lt         | Less Than                        |
| $lte        | Less Than Or Equal To            |
| $gt         | Greater Than                     |
| $gte        | Greater Than Or Equal To         |
| $ne         | Not Equal To                     |
| $in         | Contained In                     |
| $nin        | Not Contained in                 |
| $exists     | A value is set for the key       |
| $select     | This matches a value for a key in the result of a different query |
| $dontSelect | Requires that a key's value not match a value for a key in the result of a different query |
| $all        | Contains all of the given values |
| $regex      | Requires that a key's value match a regular expression |

For example, to retrieve scores between 1000 and 3000, including the endpoints, we could issue:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"score":{"$gte":1000,"$lte":3000}}' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "score": {
         "$gte": 1000,
         "$lte": 3000
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To retrieve scores equal to an odd number below 10, we could issue:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"score":{"$in":[1,3,5,7,9]}}' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "score": {
         "$in": [
           1,
           3,
           5,
           7,
           9
         ]
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To retrieve scores not by a given list of players we could issue:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={
   "playerName": {
     "$nin": [
       "Jonathan Walsh",
       "Dario Wunsch",
       "Shawn Simon"
     ]
   }
  }' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "playerName": {
         "$nin": [
           "Jonathan Walsh",
           "Dario Wunsch",
           "Shawn Simon"
         ]
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To retrieve documents with the score set, we could issue:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"score":{"$exists":true}}' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "score": {
         "$exists": True
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To retrieve documents without the score set, we could issue:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"score":{"$exists":false}}' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "score": {
         "$exists": False
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

If you have a class containing sports teams and you store a user's hometown in the user class, you can issue one query to find the list of users whose hometown teams have winning records.  The query would look like:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"hometown":{"$select":{"query":{"className":"Team","where":{"winPct":{"$gt":0.5}}},"key":"city"}}}' \
  https://api.parse.com/1/classes/_User
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "hometown": {
         "$select": {
           "query": {
             "className": "Team",
             "where": {
               "winPct": {
                 "$gt": 0.5
               }
             }
           },
           "key": "city"
         }
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/_User?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

In addition to `where`, there are several parameters you can use to configure what types of results are returned by the query.

| Parameter   | Use                                               |
|-----------------------------------------------------------------|
| order       | Specify a field to sort by                        |
| limit       | Limit the number of objects returned by the query |
| skip        | Use with limit to paginate through results        |
| keys        | Restrict the fields returned by the query         |
| include     | Use on Pointer columns to return the full object  |

You can use the `order` parameter to specify a field to sort by. Prefixing with a negative sign reverses the order. Thus, to retrieve scores in ascending order:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'order=score' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"order":"score"})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

And to retrieve scores in descending order:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'order=-score' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"order":"-score"})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can sort by multiple fields by passing `order` a comma-separated list. To retrieve documents that are ordered by scores in ascending order and the names in descending order:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'order=score,-name' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"order":"score,-name"})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can use the `limit` and `skip` parameters for pagination. `limit` defaults to 100, but anything from 1 to 1000 is a valid limit. Thus, to retrieve 200 objects after skipping the first 400:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'limit=200' \
  --data-urlencode 'skip=400' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"limit":200,"skip":400})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can restrict the fields returned by passing `keys` a comma-separated list. To retrieve documents that contain only the `score` and `playerName` fields (and also special built-in fields such as `objectId`, `createdAt`, and `updatedAt`):

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'keys=score,playerName' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"keys":"score,playerName"})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

All of these parameters can be used in combination with each other. For example:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={
   "playerName": {
     "$nin": [
       "Jonathan Walsh",
       "Dario Wunsch",
       "Shawn Simon"
     ]
   }
  }' \
  --data-urlencode 'order=score,-name' \
  --data-urlencode 'limit=200' \
  --data-urlencode 'skip=400' \
  --data-urlencode 'keys=score,playerName' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({
    "where":json.dumps({
      "playerName": {
        "$nin": [
          "Jonathan Walsh",
          "Dario Wunsch",
          "Shawn Simon"
        ]
      }
    }),
    "order":"score,-name",
    "limit":200,
    "skip":400,
    "keys":"score,playerName"})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>


##  Queries on Array Values

For keys with an array type, you can find objects where the key's array value contains 2 by:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"arrayKey":2}' \
  https://api.parse.com/1/classes/RandomObject
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "arrayKey": 2
     })})
connection.connect()
connection.request('GET', '/1/classes/RandomObject?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can also use the `$all` operator to find objects with an array field which contains each of the values 2, 3, and 4 by:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"arrayKey":{"$all":[2,3,4]}}' \
  https://api.parse.com/1/classes/RandomObject
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "arrayKey": {
         "$all": [
           2,
           3,
           4
         ]
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/RandomObject?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Queries on String Values

<div class='tip info'><div>
 If you're trying to implement a generic search feature, we recommend taking a look at this blog post: <a href="http://blog.parse.com/learn/engineering/implementing-scalable-search-on-a-nosql-backend/">Implementing Scalable Search on a NoSQL Backend</a>.
</div></div>

Use the `$regex` operator to restrict to string values that match a regular expression. Most regular expression queries in Parse are heavily throttled due to performance considerations. Use case sensitive, anchored queries where possible. Similar to a MySQL LIKE operator, anchored queries are indexed so they are efficient for large datasets. For example:

<pre><code class="bash">
# Finds barbecue sauces that start with "Big Daddy"
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"name":{"$regex":"^Big Daddy"}}' \
  https://api.parse.com/1/classes/BarbecueSauce
</code></pre>
<pre><code class="python">
# Finds barbecue sauces that start with "Big Daddy"
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "name": {
         "$regex": "^Big Daddy"
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/BarbecueSauce?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The above example will match any `BarbecueSauce` objects where the value in the "name" String key starts with "Big Daddy". For example, both "Big Daddy" and "Big Daddy's" will match, but "big daddy" or "BBQ Sauce: Big Daddy's" will not.

Queries that have regular expression constraints are very expensive, especially for classes with over 100,000 records. Parse restricts how many such operations can be run on a particular app at any given time.


## Relational Queries

There are several ways to issue queries for relational data. If you want to retrieve objects where a field matches a particular object, you can use a `where` clause with a `Pointer` encoded with `__type` just like you would use other data types. For example, if each `Comment` has a `Post` object in its `post` field, you can fetch comments for a particular `Post`:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"post":{"__type":"Pointer","className":"Post","objectId":"8TOXdXf3tz"}}' \
  https://api.parse.com/1/classes/Comment
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "post": {
         "__type": "Pointer",
         "className": "Post",
         "objectId": "8TOXdXf3tz"
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/Comment?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

If you want to retrieve objects where a field contains an object that matches another query, you can use the `$inQuery` operator. Note that the default limit of 100 and maximum limit of 1000 apply to the inner query as well, so with large data sets you may need to construct queries carefully to get the desired behavior. For example, imagine you have Post class and a Comment class, where each Comment has a pointer to its parent Post. You can find comments on posts with images by doing:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"post":{"$inQuery":{"where":{"image":{"$exists":true}},"className":"Post"}}}' \
  https://api.parse.com/1/classes/Comment
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "post": {
         "$inQuery": {
           "where": {
             "image": {
               "$exists": True
             }
           },
           "className": "Post"
         }
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/Comment?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

If you want to retrieve objects where a field contains an object that does not match another query, you can use the `$notInQuery` operator.  Imagine you have Post class and a Comment class, where each Comment has a pointer to its parent Post.  You can find comments on posts without images by doing:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"post":{"$notInQuery":{"where":{"image":{"$exists":true}},"className":"Post"}}}' \
  https://api.parse.com/1/classes/Comment
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "post": {
         "$notInQuery": {
           "where": {
             "image": {
               "$exists": True
             }
           },
           "className": "Post"
         }
       }
     })})
connection.connect()
connection.request('GET', '/1/classes/Comment?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

If you want to retrieve objects that are members of `Relation` field of a parent object, you can use the `$relatedTo` operator.  Imagine you have a Post class and User class, where each Post can be liked by many users.  If the Users that liked a Post were stored in a `Relation` on the post under the key "likes", you can find the users that liked a particular post by:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"$relatedTo":{"object":{"__type":"Pointer","className":"Post","objectId":"8TOXdXf3tz"},"key":"likes"}}' \
  https://api.parse.com/1/users
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "$relatedTo": {
         "object": {
           "__type": "Pointer",
           "className": "Post",
           "objectId": "8TOXdXf3tz"
         },
         "key": "likes"
       }
     })})
connection.connect()
connection.request('GET', '/1/users?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

In some situations, you want to return multiple types of related objects in one query. You can do this by passing the field to include in the `include` parameter. For example, let's say you are retrieving the last ten comments, and you want to retrieve their related posts at the same time:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'order=-createdAt' \
  --data-urlencode 'limit=10' \
  --data-urlencode 'include=post' \
  https://api.parse.com/1/classes/Comment
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"order":"-createdAt","limit":10,"include":"post"})
connection.connect()
connection.request('GET', '/1/classes/Comment?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

Instead of being represented as a `Pointer`, the `post` field is now expanded into the whole object. `__type` is set to `Object` and `className` is provided as well. For example, a `Pointer` to a `Post` could be represented as:

<pre><code class="json">
{
  "__type": "Pointer",
  "className": "Post",
  "objectId": "8TOXdXf3tz"
}
</code></pre>

When the query is issued with an `include` parameter for the key holding this pointer, the pointer will be expanded to:

<pre><code class="json">
{
  "__type": "Object",
  "className": "Post",
  "objectId": "8TOXdXf3tz",
  "createdAt": "2011-12-06T20:59:34.428Z",
  "updatedAt": "2011-12-06T20:59:34.428Z",
  "otherFields": "willAlsoBeIncluded"
}
</code></pre>

You can also do multi level includes using dot notation.  If you wanted to include the post for a comment and the post's author as well you can do:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'order=-createdAt' \
  --data-urlencode 'limit=10' \
  --data-urlencode 'include=post.author' \
  https://api.parse.com/1/classes/Comment
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"order":"-createdAt","limit":10,"include":"post.author"})
connection.connect()
connection.request('GET', '/1/classes/Comment?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can issue a query with multiple fields included by passing a comma-separated list of keys as the `include` parameter.


## Counting Objects

Caveat: Count queries are rate limited to a maximum of 160 requests per minute.  They can also return inaccurate results for classes with more than 1,000 objects.  Thus, it is preferable to architect your application to avoid this sort of count operation (by using counters, for example.)

If you are limiting your query, or if there are a very large number of results, and you want to know how many total results there are without returning them all, you can use the `count` parameter. For example, if you only care about the number of games played by a particular player:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"playerName":"Jonathan Walsh"}' \
  --data-urlencode 'count=1' \
  --data-urlencode 'limit=0' \
  https://api.parse.com/1/classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "playerName": "Jonathan Walsh"
     }),"count":1,"limit":0})
connection.connect()
connection.request('GET', '/1/classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

Since this requests a count as well as limiting to zero results, there will be a count but no results in the response.

<pre><code class="json">
{
  "results": [],
  "count": 1337
}
</code></pre>

With a nonzero limit, that request would return results as well as the count.

## Compound Queries

 If you want to find objects that match one of several queries, you can use `$or` operator, with a JSONArray as its value.  For instance, if you want to find players with either have a lot of wins or a few wins, you can do:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"$or":[{"wins":{"$gt":150}},{"wins":{"$lt":5}}]}' \
  https://api.parse.com/1/classes/Player
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('api.parse.com', 443)
params = urllib.urlencode({"where":json.dumps({
       "$or": [
         {
           "wins": {
             "$gt": 150
           }
         },
         {
           "wins": {
             "$lt": 5
           }
         }
       ]
     })})
connection.connect()
connection.request('GET', '/1/classes/Player?%s' % params, '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

Any other constraints on the query are also applied to the object returned, so you can add other constraints to queries with `$or`.

Note that we do not, however, support GeoPoint or non-filtering constraints (e.g. nearSphere, within, limit, skip, sort, include) in the subqueries of the compound query.

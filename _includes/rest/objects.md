# Objects

## Object Format

Storing data through the Parse REST API is built around a JSON encoding of the object's data. This data is schemaless, which means that you don't need to specify ahead of time what keys exist on each object. You simply set whatever key-value pairs you want, and the backend will store it.

For example, let's say you're tracking high scores for a game. A single object could contain:

<pre><code class="json">
{
  "score": 1337,
  "playerName": "Sean Plott",
  "cheatMode": false
}
</code></pre>

Keys must be alphanumeric strings. Values can be anything that can be JSON-encoded.

Each object has a class name that you can use to distinguish different sorts of data. For example, we could call the high score object a `GameScore`. We recommend that you NameYourClassesLikeThis and nameYourKeysLikeThis, just to keep your code looking pretty.

When you retrieve objects from Parse, some fields are automatically added: `createdAt`, `updatedAt`, and `objectId`. These field names are reserved, so you cannot set them yourself. The object above could look like this when retrieved:

<pre><code class="json">
{
  "score": 1337,
  "playerName": "Sean Plott",
  "cheatMode": false,
  "createdAt": "2011-08-20T02:06:57.931Z",
  "updatedAt": "2011-08-20T02:06:57.931Z",
  "objectId": "Ed1nuqPvcm"
}
</code></pre>

`createdAt` and `updatedAt` are UTC timestamps stored in ISO 8601 format with millisecond precision: `YYYY-MM-DDTHH:MM:SS.MMMZ`. `objectId` is a string unique to this class that identifies this object.

In the REST API, the class-level operations operate on a resource based on just the class name. For example, if the class name is `GameScore`, the class URL is:

<pre><code class="javascript">
<span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore
</code></pre>

Users have a special class-level url:

<pre><code class="javascript">
<span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users
</code></pre>

The operations specific to a single object are available a nested URL. For example, operations specific to the `GameScore` above with `objectId` equal to `Ed1nuqPvcm` would use the object URL:

<pre><code class="javascript">
<span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>


## Creating Objects

To create a new object on Parse, send a POST request to the class URL containing the contents of the object. For example, to create the object described above:

<pre><code class="bash">
  curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore
</code></pre>

<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore', json.dumps({
       "score": 1337,
       "playerName": "Sean Plott",
       "cheatMode": False
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
results = json.loads(connection.getresponse().read())
print results
</code></pre>

When the creation is successful, the HTTP response is a `201 Created` and the `Location` header contains the object URL for the new object:

<pre><code class="javascript">
Status: 201 Created
Location: <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>

The response body is a JSON object containing the `objectId` and the `createdAt` timestamp of the newly-created object:

<pre><code class="json">
{
  "createdAt": "2011-08-20T02:06:57.931Z",
  "objectId": "Ed1nuqPvcm"
}
</code></pre>

## Retrieving Objects

Once you've created an object, you can retrieve its contents by sending a GET request to the object URL returned in the location header. For example, to retrieve the object we created above:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing all the user-provided fields, plus the `createdAt`, `updatedAt`, and `objectId` fields:

<pre><code class="json">
{
  "score": 1337,
  "playerName": "Sean Plott",
  "cheatMode": false,
  "skills": [
    "pwnage",
    "flying"
  ],
  "createdAt": "2011-08-20T02:06:57.931Z",
  "updatedAt": "2011-08-20T02:06:57.931Z",
  "objectId": "Ed1nuqPvcm"
}
</code></pre>

When retrieving objects that have pointers to children, you can fetch child objects by using the `include` option. For instance, to fetch the object pointed to by the "game" key:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'include=game' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
params = urllib.urlencode({"include":"game"})
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm?%s' % params, '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Updating Objects

To change the data on an object that already exists, send a PUT request to the object URL. Any keys you don't specify will remain unchanged, so you can update just a subset of the object's data. For example, if we wanted to change the score field of our object:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"score":73453}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "score": 73453
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing just an `updatedAt` field with the timestamp of the update.

<pre><code class="json">
{
  "updatedAt": "2011-08-21T18:02:52.248Z"
}
</code></pre>

### Counters

To help with storing counter-type data, Parse provides the ability to atomically increment (or decrement) any number field. So, we can increment the score field like so:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"score":{"__op":"Increment","amount":1}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "score": {
         "__op": "Increment",
         "amount": 1
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To decrement the counter, use the `Increment` operator with a negative number:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"score":{"__op":"Increment","amount":-1}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "score": {
         "__op": "Increment",
         "amount": -1
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

### Arrays

To help with storing array data, there are three operations that can be used to atomically change an array field:

*   `Add` appends the given array of objects to the end of an array field.
*   `AddUnique` adds only the given objects which aren't already contained in an array field to that field. The position of the insert is not guaranteed.
*   `Remove` removes all instances of each given object from an array field.

Each method takes an array of objects to add or remove in the "objects" key. For example, we can add items to the set-like "skills" field like so:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"skills":{"__op":"AddUnique","objects":["flying","kungfu"]}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "skills": {
         "__op": "AddUnique",
         "objects": [
           "flying",
           "kungfu"
         ]
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

### Relations

 In order to update `Relation` types, Parse provides special operators to atomically add and remove objects to a relation.  So, we can add an object to a relation like so:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"opponents":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Player","objectId":"Vx4nudeWn"}]}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "opponents": {
         "__op": "AddRelation",
         "objects": [
           {
             "__type": "Pointer",
             "className": "Player",
             "objectId": "Vx4nudeWn"
           }
         ]
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To remove an object from a relation, you can do:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"opponents":{"__op":"RemoveRelation","objects":[{"__type":"Pointer","className":"Player","objectId":"Vx4nudeWn"}]}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "opponents": {
         "__op": "RemoveRelation",
         "objects": [
           {
             "__type": "Pointer",
             "className": "Player",
             "objectId": "Vx4nudeWn"
           }
         ]
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Deleting Objects

To delete an object from the Parse Cloud, send a DELETE request to its object URL. For example:

<pre><code class="bash">
curl -X DELETE \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('DELETE', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

You can delete a single field from an object by using the `Delete` operation:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"opponents":{"__op":"Delete"}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm', json.dumps({
       "opponents": {
         "__op": "Delete"
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Batch Operations

To reduce the amount of time spent on network round trips, you can create, update, or delete up to 50 objects in one call, using the batch endpoint.

Each command in a batch has `method`, `path`, and `body` parameters that specify the HTTP command that would normally be used for that command. The commands are run in the order they are given. For example, to create a couple of `GameScore` objects:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "requests": [
          {
            "method": "POST",
            "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore",
            "body": {
              "score": 1337,
              "playerName": "Sean Plott"
            }
          },
          {
            "method": "POST",
            "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore",
            "body": {
              "score": 1338,
              "playerName": "ZeroCool"
            }
          }
        ]
      }' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>batch
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>batch', json.dumps({
       "requests": [
         {
           "method": "POST",
           "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore",
           "body": {
             "score": 1337,
             "playerName": "Sean Plott"
           }
         },
         {
           "method": "POST",
           "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore",
           "body": {
             "score": 1338,
             "playerName": "ZeroCool"
           }
         }
       ]
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response from batch will be a list with the same number of elements as the input list. Each item in the list with be a dictionary with either the `success` or `error` field set. The value of `success` will be the normal response to the equivalent REST command:

<pre><code class="json">
{
  "success": {
    "createdAt": "2012-06-15T16:59:11.276Z",
    "objectId": "YAfSAWwXbL"
  }
}
</code></pre>

The value of `error` will be an object with a numeric `code` and `error` string:

<pre><code class="json">
{
  "error": {
    "code": 101,
    "error": "object not found for delete"
  }
}
</code></pre>

Other commands that work in a batch are `update` and `delete`.

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "requests": [
          {
            "method": "PUT",
            "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm",
            "body": {
              "score": 999999
            }
          },
          {
            "method": "DELETE",
            "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Cpl9lrueY5"
          }
        ]
      }' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>batch
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>batch', json.dumps({
       "requests": [
         {
           "method": "PUT",
           "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Ed1nuqPvcm",
           "body": {
             "score": 999999
           }
         },
         {
           "method": "DELETE",
           "path": "<span class="custom-parse-server-mount">/parse/</span>classes/GameScore/Cpl9lrueY5"
         }
       ]
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

Note that N requests sent in a batch will still count toward your request limit as N requests.

## Data Types

So far we have only used values that can be encoded with standard JSON. The Parse mobile client libraries also support dates, geolocations, and relational data. In the REST API, these values are encoded as JSON hashes with the `__type` field set to indicate their type, so you can read or write these fields if you use the correct encoding. Overall, the following types are allowed for each field in your object:

* String
* Number
* Boolean
* Arrays
* JSON Objects
* DateTime
* File
* Pointer to another Parse Object
* Relation to another Parse Class
* Null

The `Date` type contains a field `iso` which contains a UTC timestamp stored in ISO 8601 format with millisecond precision: `YYYY-MM-DDTHH:MM:SS.MMMZ`.

<pre><code class="json">
{
  "__type": "Date",
  "iso": "2011-08-21T18:02:52.249Z"
}
</code></pre>

Dates are useful in combination with the built-in `createdAt` and `updatedAt` fields. For example, to retrieve objects created since a particular time, just encode a Date in a comparison query:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'where={"createdAt":{"$gte":{"__type":"Date","iso":"2011-08-21T18:02:52.249Z"}}}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>classes/GameScore
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
params = urllib.urlencode({"where":json.dumps({
       "createdAt": {
         "$gte": {
           "__type": "Date",
           "iso": "2011-08-21T18:02:52.249Z"
         }
       }
     })})
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>classes/GameScore?%s' % params, '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The `Pointer` type is used when mobile code sets another Parse `Object` as the value of another object. It contains the `className` and `objectId` of the referred-to value.

<pre><code class="json">
{
  "__type": "Pointer",
  "className": "GameScore",
  "objectId": "Ed1nuqPvc"
}
</code></pre>

Note that the built-in `User`, `Role`, and `Installation` classes are prefixed by an underscore. For example, pointers to user objects have a `className` of `_User`. Prefixing with an underscore is forbidden for developer-defined classes as it signifies the class is a special built-in.

The `Relation` type is used for many-to-many relations. It has a `className` that is the class name of the target objects.

<pre><code class="json">
{
  "__type": "Relation",
  "className": "GameScore"
}
</code></pre>

When querying, `Relation` objects behave like arrays of Pointers. Any operation that is valid for arrays of pointers (other than `include`) works for `Relation` objects.

We do not recommend storing large pieces of binary data like images or documents on a Parse object. Parse objects should not exceed 128 kilobytes in size. To store more, we recommend you use `File`. You may associate a [previously uploaded file](#files) using the `File` type.

<pre><code class="json">
{
  "__type": "File",
  "name": "...profile.png"
}
</code></pre>

When more data types are added, they will also be represented as hashes with a `__type` field set, so you may not use this field yourself on JSON objects. For more information about how Parse handles data, check out our documentation on [Data](#data).

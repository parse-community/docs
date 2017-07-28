# Schema

Schema is the structure representing classes in your app. You can use the schema
of an app to verify operations in a unit test, generate test data, generate test
classes and then clean up after tests. The schema API can also be used to create
custom views of your data. We use the schema API to display columns names and 
types in the databrowser.

This API allows you to access the schemas of your app.
Note: This API can be only accessed using the `master key`.

## Fetch the schema
To fetch the Schema for all the classes of your app, run:

Note: `createdAt` and `updatedAt` are of type `Date` but they are represented
as strings in object representation. This is a special case for the Parse API.

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('GET', '/parse/schemas', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is JSON containing all the schema information of the app.

<pre><code class="json">
{
  "results": [
    {
      "className": "Game",
      "fields": {
        "ACL": {
          "type": "ACL"
        },
        "createdAt": {
          "type": "Date"
        },
        "objectId": {
          "type": "String"
        },
        "name": {
          "type": "String"
        },
        "score": {
          "type": "Number"
        },
        "updatedAt": {
          "type": "Date"
        }
      }
    },
    ...
  ]
}
</code></pre>

To fetch schema of a single class, run:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas/Game
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('GET', '/parse/schemas/Game', "", {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Adding a schema 

When you add a new schema to your app, it creates an empty class with the provided
fields and some default fields applicable to the class. To add the schema, run:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d ' 
    {
      "className": "City",
      "fields": {
        "name": {
          "type": "String"
        }
      }
    }' \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas/City
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('POST', '/parse/schemas/Game', json.dumps({
       "className":"City","fields":{"name":{"type":"String"} }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Modifying the schema

You can add or delete columns to a schema. To do so, run:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '
    {
      "className": "City",
      "fields": {
        "population": {
          "type": "Number"
        }
      }
    }' \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas/City
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('PUT', '/parse/schemas/City', json.dumps(
       "className":"City","fields":{"population":{"type":"Number"} }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

To delete a particular field, you need to use `{"__op" : "Delete" }`

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '
    {
      "className": "City",
      "fields": {
        "population": {
          "__op": "Delete"
        }
      }
    }' \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas/City
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('PUT', '/parse/schemas/Game', json.dumps(
       "className":"City","fields":{"population":{"__op" : "Delete"} }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Removing a schema 

You can only remove a schema from your app if it is empty (has 0 objects). 
To do that, run:

<pre><code class="bash">
curl -X DELETE\
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://YOUR.PARSE-SERVER.HERE/parse/schemas/City
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('PUT', '/parse/schemas/City', "", {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

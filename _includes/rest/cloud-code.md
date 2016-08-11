# Cloud Code

## Cloud Functions

Cloud Functions can be called using the REST API. For example, to call the Cloud Function named `hello`:

````bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://api.parse.com/1/functions/hello
````
````python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/functions/hello', json.dumps({
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
````

##  Background Jobs

Similarly, you can trigger a background job from the REST API. For example, to trigger the job named `userMigration`:

<div class='tip info'><div>
  Take a look at the <a href="/docs/cloudcode/guide#cloud-code-cloud-functions">Cloud Code Guide</a> to learn more about Cloud Functions and Background Jobs.
</div></div>

````bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"plan":"paid"}' \
  https://api.parse.com/1/jobs/userMigration
````
````python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/jobs/userMigration', json.dumps({
       "plan": "paid"
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
````

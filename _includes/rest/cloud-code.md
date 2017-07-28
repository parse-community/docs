# Cloud Code

## Calling Cloud Functions

Cloud Functions can be called using the REST API. For example, to call the Cloud Function named `hello`:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://YOUR.PARSE-SERVER.HERE/parse/functions/hello
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('POST', '/parse/functions/hello', json.dumps({
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

##  Triggering Background Jobs

Similarly, you can trigger a background job from the REST API. For example, to trigger the job named `userMigration`:

<div class='tip info'><div>
  Take a look at the <a href="/cloudcode/guide/#cloud-functions">Cloud Code Guide</a> to learn more about Cloud Functions and Background Jobs.
</div></div>

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"plan":"paid"}' \
  https://YOUR.PARSE-SERVER.HERE/parse/jobs/userMigration
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('YOUR.PARSE-SERVER.HERE', 443)
connection.connect()
connection.request('POST', '/parse/jobs/userMigration', json.dumps({
       "plan": "paid"
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

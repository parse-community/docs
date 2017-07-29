# Config

`Parse Config` is a way to configure your applications remotely by storing a single configuration object on Parse. It enables you to add things like feature gating or a simple "Message of the day". To start using `Parse Config` you need to add a few key/value pairs (parameters) to your app on the Parse Config Dashboard.

![]({{ '/assets/images/config_editor.png' | prepend: site.baseurl }})

After that you will be able to fetch the config on the client by sending a `GET` request to config URL. Here is a simple example that will fetch the `Parse.Config`:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  https://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>config
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>config', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing all the configuration parameters in the `params` field.

<pre><code class="json">
{
  "params": {
    "welcomeMessage": "Welcome to The Internet!",
    "winningNumber": 42
  }
}
</code></pre>

You can also update the config by sending a `PUT` request to config URL. Here is a simple example that will update the `Parse.Config`:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -d "{\"params\":{\"winningNumber\":43}}"
  https://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>config
</code></pre>
<pre><code class="javascript">
var request = require('request');
return request({
  method: 'PUT',
  url: Parse.serverURL + '/config',
  headers: {
    'X-Parse-Application-Id': Parse.applicationId,
    'X-Parse-Master-Key': Parse.masterKey
  },
  json: true,
  body: {
    params: { winningNumber: 43 }
  }
})
</code></pre>

The response body is a JSON object containing a simple boolean value in the `result` field.

<pre><code class="json">
{
  "result": true
}
</code></pre>

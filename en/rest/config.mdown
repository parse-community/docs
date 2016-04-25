# Config

`Parse Config` is a way to configure your applications remotely by storing a single configuration object on Parse. It enables you to add things like feature gating or a simple "Message of the day". To start using `Parse Config` you need to add a few key/value pairs (parameters) to your app on the Parse Config Dashboard.

![](/images/docs/config_editor.png)

After that you will be able to fetch the config on the client by sending a `GET` request to config URL. Here is a simple example that will fetch the `Parse.Config`:

```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  https://api.parse.com/1/config
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/config', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
```

The response body is a JSON object containing all the configuration parameters in the `params` field.

```json
{
  "params": {
    "welcomeMessage": "Welcome to The Internet!",
    "winningNumber": 42
  }
}
```

You can also update the config by sending a `PUT` request to config URL. Here is a simple example that will update the `Parse.Config`:

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -d "{\"params\":{\"winningNumber\":43}}"
  https://api.parse.com/1/config
```
```js
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
```

The response body is a JSON object containing a simple boolean value in the `result` field.

```json
{
  "result": true
}
```

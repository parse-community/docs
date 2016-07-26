# Apps

You can view, create, and edit your Parse apps via the REST API, in addition
to through your parse.com dashboard. By authenticating with your Parse
account's email and password, you can fetch all the app keys for each of the
apps that you are a collaborator on, create a new app that you own, or update
the settings of an app that you are a collaborator on. This API can be used to
create test apps to run in automated tests, and in combination with the schema
API can be used to programmatically replicate your existing app into a test app.

Authentication for the apps endpoint is done a little differently than the rest
of the REST API. Instead of authenticating with one of your app's keys, you must use your account's login info.
The `X-Parse-Email` header identifies which account you are using,
and the `X-Parse-Password` header authenticates the endpoint.
If your account has no password set, because you used Facebook, GitHub, or Google
to log in, then go to [your account page](https://www.parse.com/account/edit) to
set a password.
Alternatively, you can also generate a Parse [account key](https://parse.com/docs/js/guide#command-line-account-keys)
and use the header `X-Parse-Account-Key` instead.

## Fetching apps
To fetch the keys and settings for all of the apps that you are a collaborator
on, run:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Email: <PARSE_ACCOUNT_EMAIL>" \
  -H "X-Parse-Password: <PARSE_ACCOUNT_PASSWORD>" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/apps
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/apps', '', {
       "X-Parse-Email": "<PARSE_ACCOUNT_EMAIL>",
       "X-Parse-Password": "<PARSE_ACCOUNT_PASSWORD>",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is JSON containing the keys and settings for your apps.

<pre><code class="json">
{
  "results": [
    {
      "appName": "<APPLICATION_NAME>",
      "applicationId": "<APPLICATION_ID>",
      "clientClassCreationEnabled": true,
      "clientPushEnabled": false,
      "dashboardURL": "https://www.parse.com/apps/yourapp",
      "javascriptKey": "<JAVASCRIPT_KEY>",
      "masterKey": "<MASTER_KEY>",
      "requireRevocableSessions": true,
      "restKey": "<REST_API_KEY>",
      "revokeSessionOnPasswordChange": true,
      "webhookKey": "<WEBHOOK_KEY>",
      "windowsKey": "<WINDOWS_KEY>"
    },
    ...
  ]
}
</code></pre>

To fetch the keys and settings of a single app, run:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Email: <PARSE_ACCOUNT_EMAIL>" \
  -H "X-Parse-Password: <PARSE_ACCOUNT_PASSWORD>" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/apps/${APPLICATION_ID}
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/apps/${APPLICATION_ID}', '', {
       "X-Parse-Email": "<PARSE_ACCOUNT_EMAIL>",
       "X-Parse-Password": "<PARSE_ACCOUNT_PASSWORD>",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Creating apps

By sending a POST request to the `/1/apps` endpoint you can create a new app,
that is owned by your account. The new app is initialized with a set of keys,
as well as some optional settings, which are all returned to you along with
the app's URL in your parse.com dashboard. The only required field for creating
an app is the app name.

The default values for the allowable settings are:

| App Setting                     | Default Value |
|---------------------------------|---------------|
| `clientClassCreationEnabled`    | true          |
| `clientPushEnabled`             | false         |
| `requireRevocableSessions`      | true          |
| `revokeSessionOnPasswordChange` | true          |

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Email: <PARSE_ACCOUNT_EMAIL>" \
  -H "X-Parse-Password: <PARSE_ACCOUNT_PASSWORD>" \
  -H "Content-Type: application/json" \
  -d '{"appName":"my new app","clientClassCreationEnabled":false}' \
  https://api.parse.com/1/apps
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/apps', json.dumps(
       "appName":"my new app","clientClassCreationEnabled":false
     }), {
       "X-Parse-Email": "<PARSE_ACCOUNT_EMAIL>",
       "X-Parse-Password": "<PARSE_ACCOUNT_PASSWORD>",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Updating apps

You can change your app's name, as well as change your app's settings, by sending a PUT request to `/1/apps`:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Email: ${PARSE_ACCOUNT_EMAIL}" \
  -H "X-Parse-Password: <PARSE_ACCOUNT_PASSWORD>" \
  -H "Content-Type: application/json" \
  -d '{"appName":"updated app name","clientClassCreationEnabled":true}' \
  https://api.parse.com/1/apps/${APPLICATION_ID}
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/apps/${APPLICATION_ID}', json.dumps(
       "appName":"updated app name","clientClassCreationEnabled":true
     }), {
       "X-Parse-Email": "<PARSE_ACCOUNT_EMAIL>",
       "X-Parse-Password": "<PARSE_ACCOUNT_PASSWORD>",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

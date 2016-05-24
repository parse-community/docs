# Hooks

You can create, update, list or delete all your cloud code webhooks via the Hooks API,
in addition to being able to do so through the parse website.

Hooks API requires the users to provide `Application-Id` and `Master-Key` in the request headers.

There are two kinds of cloud code webhooks: function webhooks and trigger webhooks.

Cloud functions are functions that run in the cloud and allow you to build functions
common to all platforms.
For more details please read [cloud code functions](https://parse.com/docs/js/guide#cloud-code-cloud-functions).

Cloud triggers are invoked whenever you save or delete a parse object.
Triggers are commonly used to validate your objects before saving them.
For more details please read [cloud code triggers](https://parse.com/docs/js/guide#cloud-code-beforesave-triggers).

Lets establish some basic terminology used throughout the rest of this section.

`Cloud Code Webhooks` consist of `function webhooks` and `trigger webhooks`. This is code that runs on your servers.

`Cloud Code` has `cloud code functions` and `cloud code triggers`. This is code that runs on the Parse servers.

These are the generic concepts encapsulating both use cases:

`Cloud Function` is either a `cloud code function` or a `function webhook`.
`Cloud Trigger` is either a `cloud code trigger` or a `trigger webhook`.

A function webhook has a name and a url. Hence, its JSON response looks like:
```json
{"functionName": "foo", "url": "https://api.example.com/foo"}
```

JSON reponse for a cloud code function just contains the function name.
```json
{"functionName": "foo"}
```

A trigger webhook belongs to a class, has a trigger name and a url. Hence, its JSON response looks like:
```json
{"className": "score", "triggerName": "beforeSave", "url": "https://api.example.com/score/beforeSave"}
```

JSON response for a cloud code trigger contains the class name and the trigger name.
```json
{"className": "score", "triggerName": "beforeSave"}
```
Note that trigger name can only be one of `beforeSave`, `afterSave`, `beforeDelete` and `afterDelete`.


## Fetch functions
To fetch the list of all cloud functions you deployed or created, use:

```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/hooks/functions
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/hooks/functions', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output is a json object with one key: "results" whose value is a list of cloud functions.
```json
{
  "results": [
    { "functionName": "sendMessage", "url": "https://api.example.com/sendMessage" },
    { "functionName": "sendMessage" },
    { "functionName": "foo", "url": "https://api.example.com/foo" },
    { "functionName": "bar" }
  ]
}
```

To fetch a single cloud function with a given name, use:

```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/hooks/functions/sendMessage
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/hooks/functions/sendMessage', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output is a json object with one key: "results" whose value is a list of cloud functions with the given name.

```json
{
  "results": [
    { "functionName": "sendMessage", "url": "https://api.example.com/sendMessage" },
    { "functionName": "sendMessage" }
  ]
}
```

## Fetch triggers
To fetch the list of all cloud triggers you deployed or created, use:
```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/hooks/triggers
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/hooks/triggers', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output is a json object with one key: "results" whose value is a list of cloud triggers.
```json
{
  "results": [
    { "className": "Scores", "triggerName": "beforeSave" },
    {
      "className": "Scores",
      "triggerName": "beforeSave",
      "url": "https://api.example.com/Scores/beforeSave"
    },
    {
      "className": "Game",
      "triggerName": "afterSave",
      "url": "https://api.example.com/Game/afterSave"
    },
    { "className": "Tournament", "triggerName": "beforeDelete" }
  ]
}
```

To fetch a single cloud trigger, use:
```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  https://api.parse.com/1/hooks/triggers/Scores/beforeSave
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/hooks/triggers/Scores/beforeSave', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The path looks like `/hooks/triggers/className/triggerName` where `triggerName`
can be one of `beforeSave`, `afterSave`, `beforeDelete`, `afterDelete`.

The output may look like this:
```json
{
  "results": [
    { "className": "Scores", "triggerName": "beforeSave" },
    {
      "className": "Scores",
      "triggerName": "beforeSave",
      "url": "https://api.example.com/Scores/beforeSave"
    }
  ]
}
```

The output is a json object with one key: "results" whose value is a list of all
cloud triggers with given name for a given class.

Note that POST, PUT and DELETE only work on function or trigger webhooks.
To create cloud code functions or cloud code triggers you can modify your cloud code javascript files
and perform a `parse deploy` the usual way.

## Create function webhook
To create a new function webhook post to `/1/hooks/functions` with payload in the format
```bash
{"functionName" : x, "url" : y}
```

Post example,

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"functionName":"baz","url":"https://api.example.com/baz"}' \
  https://api.parse.com/1/hooks/functions
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/hooks/functions', json.dumps(
       {"functionName":"baz","url":"https://api.example.com/baz"}
     ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{"functionName": "baz", "url": "https://api.example.com/baz"}'
```

It returns the function name and url of the created webhook.

If you try to create a function webhook and a cloud code function with the same name already exists, upon successful creation the response json has an additional `warning` field informing about the name conflict. Note that, function webhooks takes precedence over cloud code functions.

For example,
```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"functionName":"bar","url":"https://api.example.com/bar"}' \
  https://api.parse.com/1/hooks/functions
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/hooks/functions', json.dumps(
       {"functionName":"bar","url":"https://api.example.com/bar"}
     ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "functionName": "bar",
  "url": "https://api.example.com/bar",
  "warning": "a cloudcode function with name: bar already exists"
}
```

## Create trigger webhook
To create a new function webhook post to `/1/hooks/triggers` with payload in the format
```bash
{"className": x, "triggerName": y, "url": z}
```
```python
{"className": x, "triggerName": y, "url": z}
```

Post example,
```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"className": "Game", "triggerName": "beforeSave", "url": "https://api.example.com/Game/beforeSave"}' \
https://api.parse.com/1/hooks/triggers
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/hooks/triggers', json.dumps(
       {"className": "Game", "triggerName": "beforeSave", "url": "https://api.example.com/Game/beforeSave"}
     ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "className": "Game",
  "triggerName": "beforeSave",
  "url": "https://api.example.com/Game/beforeSave"
}
```

It returns the class name, trigger name and url of the created trigger webhook.

If you try to create a trigger webhook and a cloud code trigger with the same name already exists, upon successful creation the response json has an additional `warning` field informing about the name conflict. Note that, trigger webhooks takes precedence over cloud code triggers.

For example,
```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"className": "Tournament", "triggerName": "beforeDelete", "url": "https://api.example.com/Scores/beforeDelete"}' \
https://api.parse.com/1/hooks/triggers
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/hooks/triggers', json.dumps(
       {"className": "Tournament", "triggerName": "beforeDelete", "url": "https://api.example.com/Scores/beforeDelete"}
     ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "className": "Tournament",
  "triggerName": "beforeDelete",
  "url": "https://api.example.com/Tournament/beforeDelete",
  "warning": "beforeDelete trigger already defined for class Tournament in cloud code"
}
```

## Edit function webhook
To edit the url of a function webhook that was already created use the put method.

Put example,
```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://api.example.com/_baz"}' \
  https://api.parse.com/1/hooks/functions/baz
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/functions/baz', json.dumps(
    {"url":"https://api.example.com/_baz"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{"functionName": "baz", "url": "https://api.example.com/baz"}'
```

It returns the function name and url of the modified webhook.

If you try to update a function webhook and a cloud code function with the same name already exists, upon successful update the response json has an additional `warning` field informing about the name conflict. Note that, function webhooks takes precedence over cloud code functions.

For example,
```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://api.example.com/_bar"}' \
  https://api.parse.com/1/hooks/functions/bar
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/functions/bar', json.dumps(
      {"url":"https://api.example.com/_bar"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "functionName": "bar",
  "url": "https://api.example.com/_bar",
  "warning": "a cloudcode function with name: bar already exists"
}
```

## Edit trigger webhook
To edit the url of a trigger webhook that was already crated use the put method.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://api.example.com/Game/_beforeSave"}' \
https://api.parse.com/1/hooks/triggers/Game/beforeSave
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/triggers/Game/beforeSave', json.dumps(
      {"url": "https://api.example.com/Game/_beforeSave"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "className": "Game",
  "triggerName": "beforeSave",
  "url": "https://api.example.com/Game/_beforeSave"
}
```

It returns the class name, trigger name and url of the modified trigger webhook.

If you try to update a trigger webhook and a cloud code trigger with the same name already exists, upon successful update the response json has an additional `warning` field informing about the name conflict. Note that, trigger webhooks takes precedence over cloud code triggers.

For example,
```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://api.example.com/Scores/beforeDelete"}' \
https://api.parse.com/1/hooks/triggers/Tournament/beforeDelete
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/triggers/Tournament/beforeDelete', json.dumps(
      {"url": "https://api.example.com/Scores/beforeDelete"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "className": "Tournament",
  "triggerName": "beforeDelete",
  "url": "https://api.example.com/Tournament/beforeDelete",
  "warning": "beforeDelete trigger already defined for class Tournament in cloud code"
}
```

## Delete function webhook
To delete a function webhook use the put method.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"__op": "Delete"}' \
https://api.parse.com/1/hooks/functions/foo
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/functions/foo', json.dumps(
      {"__op": "Delete"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{}
```

If a cloud code function with the same name already exists then it is returned as the result.
Since the overriding webhook was just deleted, this cloud code function will be run the next time sendMessage is called.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{ "__op": "Delete" }' \
https://api.parse.com/1/hooks/functions/sendMessage
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/functions/sendMessage', json.dumps(
      {"__op": "Delete"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{ "functionName": "sendMessage" }
```

## Delete trigger webhook
To delete a trigger webhook use the put method.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{ "__op": "Delete" }' \
https://api.parse.com/1/hooks/triggers/Game/beforeSave
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/triggers/Game/beforeSave', json.dumps(
      {"__op": "Delete"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{}
```

If a cloud code trigger with the same name already exists then the it is returned as the result.
Since the overriding webhook was just deleted, this cloud code trigger will be run the next time a Tournament object is saved.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Master-Key: ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{ "__op": "Delete" }' \
https://api.parse.com/1/hooks/triggers/Tournament/beforeDelete
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/hooks/triggers/Tournament/beforeDelete', json.dumps(
      {"__op": "Delete"}
      ), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-Master-Key": "${MASTER_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

The output may look like this:
```json
{
  "className": "Tournament",
  "triggerName": "beforeDelete"
}
```

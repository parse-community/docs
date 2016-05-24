# Sessions

<div class='tip info'><div>
  Session APIs are only available in apps with revocable sessions enabled. Parse apps created after March 25, 2015 have this enabled by default ("Require Revocable Sessions" toggle in your Parse.com app settings page). If you have an existing app, you can upgrade to revocable sessions by following the [Session Migration Tutorial](https://www.parse.com/tutorials/session-migration-tutorial).
</div></div>

Sessions represent an instance of a user logged into a device. Sessions are automatically created when users log in or sign up. They are automatically deleted when users log out. There is one distinct `%{ParseSession}` object for each user-installation pair; if a user issues a login request from a device they're already logged into, that user's previous `%{ParseSession}` object for that Installation is automatically deleted. `%{ParseSession}` objects are stored on Parse in the Session class, and you can view them on the Parse.com Data Browser. We provide a set of APIs to manage `%{ParseSession}` objects in your app.

`%{ParseSession}` is a subclass of `%{ParseObject}`, so you can query, update, and delete sessions in the same way that you manipulate normal objects on Parse. Because the Parse Cloud automatically creates sessions when you log in or sign up users, you should not manually create `%{ParseSession}` objects unless you are building a "Parse for IoT" app (e.g. Arduino or Embedded C). Deleting a `%{ParseSession}` will log the user out of the device that is currently using this session's token.

Unlike other Parse objects, the `%{ParseSession}` class does not have Cloud Code triggers. So you cannot register a `beforeSave` or `afterSave` handler for the Session class.

## Properties

The `%{ParseSession}` object has these special fields:

* `sessionToken` (readonly): String token for authentication on Parse API requests. In the response of `%{ParseSession}` queries, only your current `%{ParseSession}` object will contain a session token.
* `user`: (readonly) Pointer to the `%{ParseUser}` object that this session is for.
* `createdWith` (readonly): Information about how this session was created (e.g. `{ "action": "login", "authProvider": "password"}`).
    * `action` could have values: `login`, `signup`, `create`, or `upgrade`. The `create` action is when the developer manually creates the session by saving a `%{ParseSession}` object.  The `upgrade` action is when the user is upgraded to revocable session from a legacy session token.
    * `authProvider` could have values: `password`, `anonymous`, `facebook`, or `twitter`.
* `restricted` (readonly): Boolean for whether this session is restricted.
    * Restricted sessions do not have write permissions on `%{ParseUser}`, `%{ParseSession}`, and `%{ParseRole}` classes on Parse. Restricted sessions also cannot read unrestricted sessions.
    * All sessions that the Parse Cloud automatically creates during user login/signup will be unrestricted. All sessions that the developer manually creates by saving a new `%{ParseSession}` object from the client (only needed for "Parse for IoT" apps) will be restricted.
* `expiresAt` (readonly): Approximate UTC date when this `%{ParseSession}` object will be automatically deleted. You can configure session expiration settings (either 1-year inactivity expiration or no expiration) in your app's Parse.com dashboard settings page.
* `installationId` (can be set only once): String referring to the `%{ParseInstallation}` where the session is logged in from. For the REST API, you can set this by passing the `X-Parse-Installation-Id` header on login and signup requests.
All special fields except `installationId` can only be set automatically by the Parse Cloud. You can add custom fields onto `%{ParseSession}` objects, but please keep in mind that any logged-in device (with session token) can read other sessions that belong to the same user (unless you disable Class-Level Permissions, see below).

## Handling Invalid Session Token Error

Apps created before March 25, 2015 use legacy session tokens until you migrate them to use the new revocable sessions. On API requests with legacy tokens, if the token is invalid (e.g. User object was deleted), then the request is executed as a non-logged in user and no error was returned. On API requests with revocable session tokens, an invalid session token will always fail with the "invalid session token" error. This new behavior lets you know when you need to ask the user to log in again.

With revocable sessions, your current session token could become invalid if its corresponding `%{ParseSession}` object is deleted from the Parse Cloud. This could happen if you implement a Session Manager UI that lets users log out of other devices, or if you manually delete the session via Cloud Code, REST API, or Data Browser. Sessions could also be deleted due to automatic expiration (if configured in app settings). When a device's session token no longer corresponds to a `%{ParseSession}` object on the Parse Cloud, all API requests from that device will fail with “Error 209: invalid session token”.

## Creating Sessions

For mobile apps and websites, you should not create `%{ParseSession}` objects manually. Instead, you should call `GET /1/login` and `POST /1/users` (signup), which will automatically generate a `%{ParseSession}` object in the Parse Cloud. The session token for this automatically-created session will be sent back on the login and signup response. Same for Facebook/Twitter login and signup requests.

In "Parse for IoT" apps (e.g. Arduino or Embedded C), you may want to programmatically create a restricted session that can be transferred to an IoT device. In order to do this, you must first log in normally to obtain an unrestricted session token. Then, you can create a restricted session by providing this unrestricted session token:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  -H "Content-Type: application/json" \
  -d '{"customField":"value"}' \
  https://api.parse.com/1/sessions
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/sessions', json.dumps({
       "customField": "value"
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

In the above code, `r:pnktnjyb996sj4p156gjtp4im` is the unrestricted session token from the original user login.

The response looks like:

```js
{
  "createdAt": "2015-03-25T18:21:52.883Z",
  "createdWith": {
    "action": "create"
  },
  "objectId": "pla1TY9co3",
  "restricted": true,
  "sessionToken": "r:aVrtljyb7E8xKo9256gfvp4n2"
}
```

At this point, you can pass the session token `r:aVrtljyb7E8xKo9256gfvp4n2` to an IoT device so that it can access the current user's data.

## Retrieving Sessions

If you have the session's objectId, you fetch the `%{ParseSession}` object as long as it belongs to the same user as your current session:
```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.parse.com/1/sessions/Axy98kq1B09
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/sessions/Axy98kq1B09', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```

If you only have the session's token (from previous login or session create), you can validate and fetch the corresponding session by:

```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.parse.com/1/sessions/me
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/sessions/me', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```

## Updating Sessions

Updating a session is analogous to updating a Parse object.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  -H "Content-Type: application/json" \
  -d '{"customField":"value"}' \
  https://api.parse.com/1/sessions/Axy98kq1B09
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/logout', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```

## Querying Sessions

Querying for `%{ParseSession}` objects will only return objects belonging to the same user as your current session (due to the Session ACL). You can also add a where clause to your query, just like normal Parse objects.

```bash
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.parse.com/1/sessions
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/sessions', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```



## Deleting Sessions

Deleting the Session object will revoke its session token and cause the user to be logged out on the device that's currently using this session token. When you have the session token, then you can delete its `%{ParseSession}` object by calling the logout endpoint:

```bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.parse.com/1/logout
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/logout', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```

If you want to delete another `%{ParseSession}` object for your user, and you have its `objectId`, you can delete it (but not log yourself out) by:

```bash
curl -X DELETE \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.parse.com/1/sessions/Axy98kq1B09
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('DELETE', '/1/sessions/Axy98kq1B09', '', {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
```

`X-Parse-Session-Token` authenticates the request as the user that also owns session `Axy98kq1B09`, which may have a different session token. You can only delete other sessions that belong to the same user.

## Pairing Session with Installation

For normal user login with the `/1/login` endpoint, the Parse Cloud will set the automatically-created `%{ParseSession}` object's `installationId` to the `X-Parse-Installation-Id` header passed on the login or signup request. Therefore, for these scenarios, you don't need to manually associate the `%{ParseSession}` object with an installation.

The following API is most useful for "Parse for IoT" apps (e.g. Arduino or Embedded C). During IoT device provisioning, the phone typically does not know the `installationId` of the IoT device. The provisioning process typically goes like this:

1. Phone creates a restricted session (with blank `installationId`) for the device.
2. IoT device acts as a Wi-Fi software access point. Phone passes this newly-created session's token, along with the Wi-Fi password, to the IoT device.
3. IoT device connects to Internet via Wi-Fi, saves its `%{ParseInstallation}` object.
4. IoT device calls the following endpoint to associate the its `installationId` with its session. This endpoint only works with session tokens from restricted sessions. Please note that REST API calls from an IoT device should use the Client Key, not the REST API Key.

```bash
curl -X PUT \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-Client-Key: ${CLIENT_KEY}" \
  -H "X-Parse-Session-Token: r:aVrtljyb7E8xKo9256gfvp4n2" \
  -H "X-Parse-Installation-Id: 2d3777a5-f5fc-4caf-80be-73c766235afb" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://api.parse.com/1/sessions/me
```
```python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/sessions/me', json.dumps({
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:aVrtljyb7E8xKo9256gfvp4n2",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
```

## Security

`%{ParseSession}` objects can only be accessed by the user specified in the user field. All `%{ParseSession}` objects have an ACL that is read and write by that user only. You cannot change this ACL. This means querying for sessions will only return objects that match the current logged-in user.

When you log in a user via `/1/login`, Parse will automatically create a new unrestricted `%{ParseSession}` object in the Parse Cloud. Same for signups and Facebook/Twitter logins.

Session objects manually created from `POST /1/sessions` are always restricted. You cannot manually create an unrestricted sessions using the object creation API.

Restricted sessions are prohibited from creating, modifying, or deleting any data in the `%{ParseUser}`, `%{ParseSession}`, and `%{ParseRole}` classes. Restricted session also cannot read unrestricted sessions. Restricted Sessions are useful for "Parse for IoT" devices (e.g Arduino or Embedded C) that may run in a less-trusted physical environment than mobile apps. However, please keep in mind that restricted sessions can still read data on `%{ParseUser}`, `%{ParseSession}`, and `%{ParseRole}` classes, and can read/write data in any other class just like a normal session. So it is still important for IoT devices to be in a safe physical environment and ideally use encrypted storage to store the session token.

If you want to prevent restricted Sessions from modifying classes other than `%{ParseUser}`, `%{ParseSession}`, or `%{ParseRole}`, you can write a Cloud Code `beforeSave` handler for that class:

```js
Parse.Cloud.beforeSave("MyClass", function(request, response) {
  Parse.Session.current().then(function(session) {
    if (session.get('restricted')) {
      response.error('write operation not allowed');
    }
    response.success();
  });
});
```
You can configure Class-Level Permissions (CLPs) for the Session class just like other classes on Parse. CLPs restrict reading/writing of sessions via the `/1/sessions` API, but do not restrict Parse Cloud's automatic session creation/deletion when users log in, sign up, and log out. We recommend that you disable all CLPs not needed by your app. Here are some common use cases for Session CLPs:

* **Find**, **Delete** — Useful for building a UI screen that allows users to see their active session on all devices, and log out of sessions on other devices. If your app does not have this feature, you should disable these permissions.
* **Create** — Useful for "Parse for IoT" apps (e.g. Arduino or Embedded C) that provision restricted user sessions for other devices from the phone app. You should disable this permission when building apps for mobile and web. For "Parse for IoT" apps, you should check whether your IoT device actually needs to access user-specific data. If not, then your IoT device does not need a user session, and you should disable this permission.
* **Get**, **Update**, **Add Field** — Unless you need these operations, you should disable these permissions.


# Users

Many apps have a unified login that works across the mobile app and other systems. Accessing user accounts through the REST API lets you build this functionality on top of Parse.

In general, users have the same features as other objects, such as the flexible schema. The differences are that user objects must have a username and password, the password is automatically encrypted and stored securely, and Parse enforces the uniqueness of the `username` and `email` fields.

## Signing Up

Signing up a new user differs from creating a generic object in that the `username` and `password` fields are required. The password field is handled differently than the others; it is encrypted with bcrypt when stored in the Parse Cloud and never returned to any client request.

You can ask Parse to verify user email addresses in your application settings page. With this setting enabled, all new user registrations with an `email` field will generate an email confirmation at that address. You can check whether the user has verified their `email` with the `emailVerified` field.

To sign up a new user, send a POST request to the users root. You may add any additional fields. For example, to create a user with a specific phone number:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Revocable-Session: 1" \
  -H "Content-Type: application/json" \
  -d '{"username":"cooldude6","password":"p_n7!-e8","phone":"415-392-0202"}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>users', json.dumps({
       "username": "cooldude6",
       "password": "p_n7!-e8",
       "phone": "415-392-0202"
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Revocable-Session": "1",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

When the creation is successful, the HTTP response is a `201 Created` and the `Location` header contains the URL for the new user:

<pre><code class="javascript">
Status: 201 Created
Location: <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O
</code></pre>

The response body is a JSON object containing the `objectId`, the `createdAt` timestamp of the newly-created object, and the `sessionToken` which can be used to authenticate subsequent requests as this user:

<pre><code class="json">
{
  "createdAt": "2011-11-07T20:58:34.448Z",
  "objectId": "g7y9tkhB7O",
  "sessionToken": "r:pnktnjyb996sj4p156gjtp4im"
}
</code></pre>

## Logging In

After you allow users to sign up, you need to let them log in to their account with a username and password in the future. To do this, send a GET request to the <code class="highlighter-rouge"><span class="custom-parse-server-mount">/parse/</span>login</code> endpoint with `username` and `password` as URL-encoded parameters:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Revocable-Session: 1" \
  -G \
  --data-urlencode 'username=cooldude6' \
  --data-urlencode 'password=p_n7!-e8' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>login
</code></pre>
<pre><code class="python">
import json,httplib,urllib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
params = urllib.urlencode({"username":"cooldude6","password":"p_n7!-e8"})
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>login?%s' % params, '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Revocable-Session": "1"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing all the user-provided fields except `password`. It also contains the `createdAt`, `updatedAt`, `objectId`, and `sessionToken` fields:

<pre><code class="json">
{
  "username": "cooldude6",
  "phone": "415-392-0202",
  "createdAt": "2011-11-07T20:58:34.448Z",
  "updatedAt": "2011-11-07T20:58:34.448Z",
  "objectId": "g7y9tkhB7O",
  "sessionToken": "r:pnktnjyb996sj4p156gjtp4im"
}
</code></pre>

## Verifying Emails

Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the `emailVerified` field to the `User` object. When a `User`'s `email` is set or modified, `emailVerified` is set to `false`. Parse then emails the user a link which will set `emailVerified` to `true`.

There are three `emailVerified` states to consider:

1.  `true` - the user confirmed his or her email address by clicking on the link Parse emailed them. `Users` can never have a `true` value when the user account is first created.
2.  `false` - at the time the `User` object was last refreshed, the user had not confirmed his or her email address. If `emailVerified` is `false`, consider refreshing the `User` object.
3.  _missing_ - the `User` was created when email verification was off or the `User` does not have an `email`.


## Requesting A Password Reset

You can initiate password resets for users who have emails associated with their account. To do this, send a POST request to <code class="highlighter-rouge"><span class="custom-parse-server-mount">/parse/</span>requestPasswordReset</code> endpoint with `email` in the body of the request:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"email":"coolguy@iloveapps.com"}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>requestPasswordReset
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>requestPasswordReset', json.dumps({
       "email": "coolguy@iloveapps.com"
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

If successful, the response body is an empty JSON object.


## Retrieving Users

You can also retrieve the contents of a user object by sending a GET request to the URL returned in the location header when it was created. For example, to retrieve the user created above:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing all the user-provided fields except `password`. It also contains the `createdAt`, `updatedAt`, and `objectId` fields:

<pre><code class="json">
{
  "username": "cooldude6",
  "phone": "415-392-0202",
  "createdAt": "2011-11-07T20:58:34.448Z",
  "updatedAt": "2011-11-07T20:58:34.448Z",
  "objectId": "g7y9tkhB7O"
}
</code></pre>

## Validating Session Tokens / Retrieving Current User

With a valid session token, you can send a GET request to the <code class="highlighter-rouge"><span class="custom-parse-server-mount">/parse/</span>users/me</code> endpoint to retrieve the user associated with that session token:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/me
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>users/me', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response matches the JSON object above for retrieving users.  If the session token is not valid, an error object is returned:

<pre><code class="json">
{
  "code": 209,
  "error": "invalid session token"
}
</code></pre>

## Updating Users

In normal usage, nobody except the user is allowed to modify their own data. To authenticate themselves, the user must add a `X-Parse-Session-Token` header to the request with the session token provided by the signup or login method.

To change the data on a user that already exists, send a PUT request to the user URL. Any keys you don't specify will remain unchanged, so you can update just a subset of the user's data. `username` and `password` may be changed, but the new username must not already be in use.

For example, if we wanted to change the phone number for `cooldude6`:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  -H "Content-Type: application/json" \
  -d '{"phone":"415-369-6201"}' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O', json.dumps({
       "phone": "415-369-6201"
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

The response body is a JSON object containing just an `updatedAt` field with the timestamp of the update.

<pre><code class="json">
{
  "updatedAt": "2011-11-07T21:25:10.623Z"
}
</code></pre>

## Querying

You can retrieve multiple users at once by sending a GET request to the root users URL. Without any URL parameters, this simply lists users:

<pre><code class="bash">
curl -X GET \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('GET', '<span class="custom-parse-server-mount">/parse/</span>users', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
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
      "username": "bigglesworth",
      "phone": "650-253-0000",
      "createdAt": "2011-11-07T20:58:06.445Z",
      "updatedAt": "2011-11-07T20:58:06.445Z",
      "objectId": "3KmCvT7Zsb"
    },
    {
      "username": "cooldude6",
      "phone": "415-369-6201",
      "createdAt": "2011-11-07T20:58:34.448Z",
      "updatedAt": "2011-11-07T21:25:10.623Z",
      "objectId": "g7y9tkhB7O"
    }
  ]
}
</code></pre>

All of the options for queries that work for regular objects also work for user objects, so check the section on [Querying Objects](#basic-queries) for more details.


## Deleting Users

To delete a user from the Parse Cloud, send a DELETE request to its URL. You must provide the `X-Parse-Session-Token` header to authenticate. For example:

<pre><code class="bash">
curl -X DELETE \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('DELETE', '<span class="custom-parse-server-mount">/parse/</span>users/g7y9tkhB7O', '', {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:pnktnjyb996sj4p156gjtp4im"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## Linking Users

Parse allows you to link your users with services like Twitter and Facebook, enabling your users to sign up or log into your application using their existing identities. This is accomplished through the sign-up and update REST endpoints by providing authentication data for the service you wish to link to a user in the `authData` field. Once your user is associated with a service, the `authData` for the service will be stored with the user and is retrievable by logging in.

`authData` is a JSON object with keys for each linked service containing the data below.  In each case, you are responsible for completing the authentication flow (e.g. OAuth 1.0a) to obtain the information the the service requires for linking.

### Facebook `authData`

<pre><code class="json">
{
  "facebook": {
    "id": "user's Facebook id number as a string",
    "access_token": "an authorized Facebook access token for the user",
    "expiration_date": "token expiration date of the format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  }
}
</code></pre>
Learn more about [Facebook login](https://developers.facebook.com/docs/authentication/).

### Twitter `authData`

<pre><code class="json">
{
  "twitter": {
    "id": "user's Twitter id number as a string",
    "screen_name": "user's Twitter screen name",
    "consumer_key": "your application's consumer key",
    "consumer_secret": "your application's consumer secret",
    "auth_token": "an authorized Twitter token for the user with your application",
    "auth_token_secret": "the secret associated with the auth_token"
  }
}
</code></pre>

Learn more about [Twitter login](https://dev.twitter.com/docs/auth/implementing-sign-twitter).

### Anonymous user `authData`

<pre><code class="json">
{
  "anonymous": {
    "id": "random UUID with lowercase hexadecimal digits"
  }
}
</code></pre>

### Signing Up and Logging In

Signing a user up with a linked service and logging them in with that service uses the same POST request, in which the `authData` for the user is specified.  For example, to sign up or log in with a user's Twitter account:

<pre><code class="bash">
curl -X POST \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Revocable-Session: 1" \
  -H "Content-Type: application/json" \
  -d '{
        "authData": {
          "twitter": {
            "id": "12345678",
            "screen_name": "ParseIt",
            "consumer_key": "SaMpLeId3X7eLjjLgWEw",
            "consumer_secret": "SaMpLew55QbMR0vTdtOACfPXa5UdO2THX1JrxZ9s3c",
            "auth_token": "12345678-SaMpLeTuo3m2avZxh5cjJmIrAfx4ZYyamdofM7IjU",
            "auth_token_secret": "SaMpLeEb13SpRzQ4DAIzutEkCE2LBIm2ZQDsP3WUU"
          }
        }
      }' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('POST', '<span class="custom-parse-server-mount">/parse/</span>users', json.dumps({
       "authData": {
         "twitter": {
           "id": "12345678",
           "screen_name": "ParseIt",
           "consumer_key": "SaMpLeId3X7eLjjLgWEw",
           "consumer_secret": "SaMpLew55QbMR0vTdtOACfPXa5UdO2THX1JrxZ9s3c",
           "auth_token": "12345678-SaMpLeTuo3m2avZxh5cjJmIrAfx4ZYyamdofM7IjU",
           "auth_token_secret": "SaMpLeEb13SpRzQ4DAIzutEkCE2LBIm2ZQDsP3WUU"
         }
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Revocable-Session": "1",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

Parse then verifies that the provided `authData` is valid and checks to see if a user is already associated with this data.  If so, it returns a status code of `200 OK` and the details (including a `sessionToken` for the user):

<pre><code class="javascript">
Status: 200 OK
Location: <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc
</code></pre>

With a response body like:

<pre><code class="json">
{
  "username": "Parse",
  "createdAt": "2012-02-28T23:49:36.353Z",
  "updatedAt": "2012-02-28T23:49:36.353Z",
  "objectId": "uMz0YZeAqc",
  "sessionToken": "r:samplei3l83eerhnln0ecxgy5",
  "authData": {
    "twitter": {
      "id": "12345678",
      "screen_name": "ParseIt",
      "consumer_key": "SaMpLeId3X7eLjjLgWEw",
      "consumer_secret": "SaMpLew55QbMR0vTdtOACfPXa5UdO2THX1JrxZ9s3c",
      "auth_token": "12345678-SaMpLeTuo3m2avZxh5cjJmIrAfx4ZYyamdofM7IjU",
      "auth_token_secret": "SaMpLeEb13SpRzQ4DAIzutEkCE2LBIm2ZQDsP3WUU"
    }
  }
}
</code></pre>

If the user has never been linked with this account, you will instead receive a status code of `201 Created`, indicating that a new user was created:

<pre><code class="javascript">
Status: 201 Created
Location: <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc
</code></pre>

The body of the response will contain the `objectId`, `createdAt`, `sessionToken`, and an automatically-generated unique `username`.  For example:

<pre><code class="json">
{
  "username": "iwz8sna7sug28v4eyu7t89fij",
  "createdAt": "2012-02-28T23:49:36.353Z",
  "objectId": "uMz0YZeAqc",
  "sessionToken": "r:samplei3l83eerhnln0ecxgy5"
}
</code></pre>

### Linking

Linking an existing user with a service like Facebook or Twitter uses a PUT request to associate `authData` with the user.  For example, linking a user with a Facebook account would use a request like this:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:samplei3l83eerhnln0ecxgy5" \
  -H "Content-Type: application/json" \
  -d '{
        "authData": {
          "facebook": {
            "id": "123456789",
            "access_token": "SaMpLeAAibS7Q55FSzcERWIEmzn6rosftAr7pmDME10008bWgyZAmv7mziwfacNOhWkgxDaBf8a2a2FCc9Hbk9wAsqLYZBLR995wxBvSGNoTrEaL",
            "expiration_date": "2012-02-28T23:49:36.353Z"
          }
        }
      }' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc', json.dumps({
       "authData": {
         "facebook": {
           "id": "123456789",
           "access_token": "SaMpLeAAibS7Q55FSzcERWIEmzn6rosftAr7pmDME10008bWgyZAmv7mziwfacNOhWkgxDaBf8a2a2FCc9Hbk9wAsqLYZBLR995wxBvSGNoTrEaL",
           "expiration_date": "2012-02-28T23:49:36.353Z"
         }
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:samplei3l83eerhnln0ecxgy5",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

After linking your user to a service, you can authenticate them using matching `authData`.

### Unlinking

Unlinking an existing user with a service also uses a PUT request to clear `authData` from the user by setting the `authData` for the service to `null`.  For example, unlinking a user with a Facebook account would use a request like this:

<pre><code class="bash">
curl -X PUT \
  -H "X-Parse-Application-Id: <span class="custom-parse-server-appid">${APPLICATION_ID}</span>" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "X-Parse-Session-Token: r:samplei3l83eerhnln0ecxgy5" \
  -H "Content-Type: application/json" \
  -d '{
        "authData": {
          "facebook": null
        }
      }' \
  <span class="custom-parse-server-protocol">https</span>://<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span><span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc
</code></pre>
<pre><code class="python">
import json,httplib
connection = httplib.HTTPSConnection('<span class="custom-parse-server-url">YOUR.PARSE-SERVER.HERE</span>', 443)
connection.connect()
connection.request('PUT', '<span class="custom-parse-server-mount">/parse/</span>users/uMz0YZeAqc', json.dumps({
       "authData": {
         "facebook": null
       }
     }), {
       "X-Parse-Application-Id": "<span class="custom-parse-server-appid">${APPLICATION_ID}</span>",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "X-Parse-Session-Token": "r:samplei3l83eerhnln0ecxgy5",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
</code></pre>

## `User` Security

When you access Parse via the REST API key, access can be restricted by ACL just like in the iOS and Android SDKs. You can still read and modify acls via the REST API, just by accessing the `"ACL"` key of an object.

The ACL is formatted as a JSON object where the keys are either object ids or the special key `"*"` to indicate public access permissions. The values of the ACL are "permission objects", JSON objects whose keys are the permission names and whose values are always `true`.

For example, if you want the user with id `"3KmCvT7Zsb"` to have read and write access to an object, plus the object should be publicly readable, that corresponds to an ACL of:

<pre><code class="json">{
	"ACL": {
		"3KmCvT7Zsb": {
			"read": true,
			"write": true
		},
		"*": {
			"read": true
		}
	}
}
</code></pre>

If you want to access your data ignoring all ACLs, you can use the master key provided on the Dashboard. Instead of the `X-Parse-REST-API-Key` header, set the `X-Parse-Master-Key` header. For backward compatibility, you can also do master-level authentication using HTTP Basic Auth, passing the application id as the username and the master key as the password. For security, the master key should not be distributed to end users, but if you are running code in a trusted environment, feel free to use the master key for authentication.

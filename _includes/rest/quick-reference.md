# Quick Reference

All API access is provided via the domain to your parse server instance. In cases where a domain is used to access the API we will reference `https://YOUR.PARSE-SERVER.HERE`, which should be replaced with your domain for your parse server instance. 

The relative path prefix `/parse/` is the default mount path for most installations. If you are using a different mount path be sure to change this to accommodate for your instance. If you are using a hosted service this may be something other than the expected `/parse/`, be sure to check before you proceed.

API access can be provided over **HTTPS** and **HTTP**. We recommend utilizing **HTTPS** for anything other than local development. If you are using a hosted service you will almost certainly be accessing your API exclusively over **HTTPS**.

## Objects API

| URL                                 | HTTP Verb | Functionality                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| `/parse/classes/<className>`            | POST      | [Creating Objects](#creating-objects)      |
| `/parse/classes/<className>/<objectId>` | GET       | [Retrieving Objects](#retrieving-objects)  |
| `/parse/classes/<className>/<objectId>` | PUT       | [Updating Objects](#updating-objects)      |
| `/parse/classes/<className>`            | GET       | [Queries](#queries)                                |
| `/parse/classes/<className>/<objectId>` | DELETE    | [Deleting Objects](#deleting-objects)      |
{: .docs_table}

## Users API

| URL                       | HTTP Verb | Functionality                                                      |
|---------------------------|-----------|--------------------------------------------------------------------|
| `/parse/users`                | POST      | [Signing Up](#signing-up) <br/>[Linking Users](#linking-users) |
| `/parse/login`                | GET       | [Logging In](#logging-in)                                    |
| `/parse/logout`               | POST      | [Logging Out](#deleting-sessions)                         |
| `/parse/users/<objectId>`     | GET       | [Retrieving Users](#retrieving-users)                        |
| `/parse/users/me`             | GET       | [Validating Session Tokens](#validating-session-tokens--retrieving-current-user) <br/>[Retrieving Current User](#retrieving-users)                                        |
| `/parse/users/<objectId>`     | PUT       | [Updating Users](#updating-users) <br/>[Linking Users](#linking-users) <br/>[Verifying Emails](#verifying-emails) |
| `/parse/users`                | GET       | [Querying Users](#querying)                                  |
| `/parse/users/<objectId>`     | DELETE    | [Deleting Users](#deleting-users)                            |
| `/parse/requestPasswordReset` | POST      | [Requesting A Password Reset](#requesting-a-password-reset)  |
{: .docs_table}

## Sessions API

| URL                       | HTTP Verb |Functionality                               |
|---------------------------|-----------|--------------------------------------------|
| `/parse/sessions`             | POST      | [Creating Restricted Sessions](#creating-sessions) |
| `/parse/sessions/<objectId>`  | GET       | [Retrieving Sessions](#retrieving-sessions) |
| `/parse/sessions/me`          | GET       | [Retrieving Current Session](#retrieving-sessions) |
| `/parse/sessions/<objectId>`  | PUT       | [Updating Sessions](#updating-sessions) |
| `/parse/sessions`             | GET       | [Querying Sessions](#querying-sessions) |
| `/parse/sessions/<objectId>`  | DELETE    | [Deleting Sessions](#deleting-sessions) |
| `/parse/sessions/me`          | PUT       | [Pairing with Installation](#pairing-session-with-installation) |
{: .docs_table}

## Roles API

| URL                   | HTTP Verb | Functionality                               |
|-----------------------|-----------|---------------------------------------------|
| `/parse/roles`            | POST      | [Creating Roles](#creating-roles)     |
| `/parse/roles/<objectId>` | GET       | [Retrieving Roles](#retrieving-roles) |
| `/parse/roles/<objectId>` | PUT       | [Updating Roles](#updating-roles)     |
| `/parse/roles/<objectId>` | DELETE    | [Deleting Roles](#deleting-roles)     |
{: .docs_table}

## Files API

| URL                   | HTTP Verb | Functionality                             |
|-----------------------|-----------|-------------------------------------------|
| `/parse/files/<fileName>` | POST      | [Uploading Files](#uploading-files) |
{: .docs_table}

## Analytics API

| URL                     | HTTP Verb | Functionality                                   |
|-------------------------|-----------|-------------------------------------------------|
| `/parse/events/AppOpened`   | POST      | [Analytics](#app-open-analytics)      |
| `/parse/events/<eventName>` | POST      | [Custom Analytics](#custom-analytics) |
{: .docs_table}

## Push Notifications API

| URL       | HTTP Verb | Functionality                |
|-----------|-----------|------------------------------|
| `/parse/push` | POST      | [Push Notifications](#push-notifications)  |
{: .docs_table}

## Installations API

| URL                           | HTTP Verb | Functionality                                            |
|-------------------------------|-----------|----------------------------------------------------------|
| `/parse/installations`            | POST      | [Uploading Installation Data](#uploading-installation-data)  |
| `/parse/installations/<objectId>` | GET       | [Retrieving Installations](#retrieving-installations)        |
| `/parse/installations/<objectId>` | PUT       | [Updating Installations](#updating-installations)        |
| `/parse/installations`            | GET       | [Querying Installations](#querying-installations)        |
| `/parse/installations/<objectId>` | DELETE    | [Deleting Installations](#deleting-installations)        |
{: .docs_table}

## Cloud Functions API

| URL                   | HTTP Verb | Functionality                                             |
|-----------------------|-----------|-----------------------------------------------------------|
| `/parse/functions/<name>` | POST      | [Calling Cloud Functions](#calling-cloud-functions)    |
| `/parse/jobs/<name>`      | POST      | [Triggering Background Jobs](#triggering-background-jobs) |
{: .docs_table}

## Schemas API

| URL                     | HTTP Verb | Functionality                                             |
|-------------------------|-----------|-----------------------------------------------------------|
| `/parse/schemas/`           | GET       | [Fetch All Schemas](#fetch-the-schema)             |
| `/parse/schemas/<className>`| GET       | [Fetch Schema](#fetch-the-schema)                  |
| `/parse/schemas/<className>`| POST      | [Create Schema](#adding-a-schema)                  |
| `/parse/schemas/<className>`| PUT       | [Modify Schema](#modifying-the-schema)             |
| `/parse/schemas/<className>`| DELETE    | [Delete Schema](#removing-a-schema)                |
{: .docs_table}

## Function Hooks API

| URL                                 | HTTP Verb | Functionality                                           |
|-------------------------------------|-----------|---------------------------------------------------------|
| `/parse/hooks/functions/<functionName>` | GET       | [Fetch Cloud Functions](#fetch-functions) |
| `/parse/hooks/functions/`               | POST      | [Create Cloud Function](#create-function-webhook) |
| `/parse/hooks/functions/<functionName>` | PUT       | [Edit Cloud Function](#edit-function-webhook)     |
| `/parse/hooks/functions/<functionName>` | DELETE    | [Delete Cloud Function](#delete-function-webhook) |
{: .docs_table}

## Trigger Hooks API

| URL                                           | HTTP Verb | Functionality                                           |
|-----------------------------------------------|-----------|---------------------------------------------------------|
| `/parse/hooks/triggers/<className>/<triggerName>` | GET       | [Fetch Cloud Trigger](#fetch-triggers)      |
| `/parse/hooks/triggers/`                          | POST      | [Create Cloud Trigger](#create-trigger-webhook)   |
| `/parse/hooks/triggers/<className>/<triggerName>` | PUT       | [Edit Cloud Trigger](#edit-trigger-webhook)       |
| `/parse/hooks/triggers/<className>/<triggerName>` | DELETE    | [Delete Cloud Trigger](#delete-trigger-webhook)   |
{: .docs_table}

## Request Format

For POST and PUT requests, the request body must be JSON, with the `Content-Type` header set to `application/json`.

Authentication is done via HTTP headers. The `X-Parse-Application-Id` header identifies which application you are accessing, and the `X-Parse-REST-API-Key` header authenticates the endpoint.

In the examples that follow, the keys for your app are included in the command. You can use the drop-down to construct example code for other apps.

You may also authenticate your REST API requests using basic HTTP authentication. For example, to retrieve an object you could set the URL using your Parse credentials in the following format:

<pre><code class="json">
https://myAppID:javascript-key=myJavaScriptKey@YOUR.PARSE-SERVER.HERE/parse/classes/GameScore/Ed1nuqPvcm
</code></pre>

For JavaScript usage, the Parse Cloud supports [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing), so that you can use these headers in conjunction with XMLHttpRequest.


## Response Format

The response format for all requests is a JSON object.

Whether a request succeeded is indicated by the HTTP status code. A 2xx status code indicates success, whereas a 4xx status code indicates failure. When a request fails, the response body is still JSON, but always contains the fields `code` and `error` which you can inspect to use for debugging. For example, trying to save an object with invalid keys will return the message:

<pre><code class="json">
{
  "code": 105,
  "error": "invalid field name: bl!ng"
}
</code></pre>

## Calling from Client Apps

You should not use the REST API Key in client apps (i.e. code you distribute to your customers). If the Parse SDK is available for your client platform, we recommend using our SDK instead of the REST API. If you must call the REST API directly from the client, you should use the corresponding client-side Parse key for that plaform (e.g. Client Key for iOS/Android, or .NET Key for Windows/Xamarin/Unity).

If there is no Parse SDK for your client platform, please use your app's Client Key to call the REST API. Requests made with the Client Key, JavaScript Key, or Windows Key are restricted by client-side app settings that you configure in your Parse.com app dashboard. These settings make your app more secure. For example, we recommend that all production apps turn off the "Client Push Enabled" setting to prevent push notifications from being sent from any device using the Client Key, JavaScript Key, or .NET Key, but not the REST API Key. Therefore, if you plan on registering installations to enable Push Notifications for your app, you should not distribute any app code with the REST API key embedded in it.

The JavaScript Key cannot be used to make requests directly against the REST API from JavaScript. The JavaScript Key is meant to be used with the Parse JavaScript SDK, which makes its posts through a Cross Origin-friendly format without HTTP headers.

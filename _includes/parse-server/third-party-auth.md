# OAuth and 3rd Party Authentication

To see the full list of supported 3rd party authentications, please refer to:
[https://github.com/parse-community/parse-server/tree/alpha/src/Adapters/Auth](https://github.com/parse-community/parse-server/tree/alpha/src/Adapters/Auth)
**You can find the documentation for each adapter in the code itself.**


## Example of Github OAuth config

Configuration options for Github modules is done with the `auth` option passed to Parse Server:

```js
{
  appId: "APP_ID",
  masterKey: "MASTER_KEY"
  serverURL: "SERVER_URL",
  databaseURI: "DATABASE_URI",
  enableInsecureAuthAdapters: "BOOLEAN",
  auth: {
    github: {
      appIds: "GITHUB_APP_ID",
      clientId: "GITHUB_CLIENT_ID",
      clientSecret: "GITHUB_CLIENT_SECRET"
      enableInsecureAuth: "BOOLEAN"
    }
  }
}
```

Below, you will find expected payload for logging in with Github in both secure and insecure ways.

### Insecure:

```js

 authData: {
   "id": "user's Github id (string)",
   "access_token": "an authorized Github access token for the user"
   }

```

### Secure:

```js
 authData: {
   "code": "code from Github",
}
```


# Migration from Insecure to Secure

If you are using the insecure way of authenticating with Github, you will need to migrate to the secure way. To do this, you will need to update your client code to use the new secure method. You will also need to update your Parse Server configuration to enable the secure method. You can do this by setting `enableInsecureAuthAdapters` to `false` in your Parse Server configuration and setting `enableInsecureAuth` to `false` in your 3rd party authentication configuration.

```js
{
  appId: "APP_ID",
  masterKey: "MASTER_KEY"
  serverURL: "SERVER_URL",
  databaseURI: "DATABASE_URI",
  enableInsecureAuthAdapters: false,
  auth: {
    github: {
      appIds: "GITHUB_APP_ID",
      clientId: "GITHUB_CLIENT_ID",
      clientSecret: "GITHUB_CLIENT_SECRET"
      enableInsecureAuth: "BOOLEAN"
    }
  }
}
```


# What is the difference between secure and insecure?

Secure authentication with GitHub involves using the OAuth flow, providing a robust method to authenticate users. This approach is highly recommended for its enhanced security measures.

Conversely, the less secure method involves using the user's GitHub ID and an access token. However, this practice poses significant security risks as it requires users to expose their access tokens to the client-side, potentially enabling unauthorized access.

In contrast, secure authentication with GitHub eliminates the need for users to disclose their access tokens to the client-side. Instead, the client-side redirects users to GitHub for authentication. Upon successful authentication, GitHub issues a unique code to the client-side, which is then forwarded to the server-side for validation. This method enhances security by safeguarding the access token, preventing its exposure to unauthorized parties.


# OAuth and 3rd Party Authentication

## Supported Authentication Services

Parse Server supports 3rd party authentication by using authentication adapters, to allow users to sign up and log in using 3rd party authentication providers.

You can find the full list of authentication adapters in the [/src/Adapters/Auth/](https://github.com/parse-community/parse-server/tree/release/src/Adapters/Auth) directory of Parse Server.

A detailed documentation for each authentication adapter can be found in the comment section at the top of each adapter file.

<div id="file-list"></div>

<script>
  async function fetchGitHubFiles() {
    const repoOwner = 'parse-community';
    const repoName = 'parse-server';
    const branch = 'release';
    const folderPath = 'src/Adapters/Auth';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?ref=${branch}`;

    // List of non-adapter files to exclude
    const excludeFiles = [
      'AuthAdapter.js',
      'httpsRequest.js',
      'index.js',
    ];

    try {
      const response = await fetch(apiUrl);
      const files = await response.json();

      if (Array.isArray(files)) {
        const fileListElement = document.getElementById('file-list');
        fileListElement.innerHTML = '';

        files
          .filter(file => !excludeFiles.includes(file.name))
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          .forEach(file => {
            const fileLink = document.createElement('a');
            fileLink.href = file.html_url;
            fileLink.textContent = file.name;
            const listItem = document.createElement('li');
            listItem.appendChild(fileLink);
            fileListElement.appendChild(listItem);
          });
      } else {
        console.error('Error: ', 'No adapters found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  fetchGitHubFiles();
</script>

## Example of GitHub Authentication Adapter

The following example shows how to configure Parse Server to enable the GitHub authentication adapter.

⚠️ This adapter, as some other adapters, can be configured to allow insecure authentication or require secure authentication. The insecure authentication is deprecated and we discourage from using it. More information can be found in [Secure and Insecure Authentication](#secure-and-insecure-authentication).

### Secure Authentication

An example of the Parse Server configuration:

```js
{
  appId: 'APP_ID',
  masterKey: 'MASTER_KEY',
  serverURL: 'SERVER_URL',
  databaseURI: 'DATABASE_URI',
  enableInsecureAuthAdapters: false,
  auth: {
    github: {
      appIds: 'GITHUB_APP_ID',
      clientId: 'GITHUB_CLIENT_ID',
      clientSecret: 'GITHUB_CLIENT_SECRET',
      enableInsecureAuth: false
    }
  }
}
```

An example of the authentication payload that Parse Server expects to receive from the client:

```js
authData: {
  "code": "GITHUB_AUTH_CODE"
}
```

### Insecure Authentication

An example of the Parse Server configuration:

```js
{
  appId: 'APP_ID',
  masterKey: 'MASTER_KEY',
  serverURL: 'SERVER_URL',
  databaseURI: 'DATABASE_URI',
  enableInsecureAuthAdapters: true,
  auth: {
    github: {
      appIds: 'GITHUB_APP_ID',
      clientId: 'GITHUB_CLIENT_ID',
      clientSecret: 'GITHUB_CLIENT_SECRET',
      enableInsecureAuth: true
    }
  }
}
```

An example of the authentication payload that Parse Server expects to receive from the client:

```js
authData: {
  "id": "GITHUB_USER_ID",
  "access_token": "GITHUB_ACCESS_TOKEN"
}
```

# Secure and Insecure Authentication

Some Parse Server authentication adapters can be configured to allow insecure authentication or require secure authentication. The insecure authentication is what Parse Server traditionally used. It's deprecated and we discourage from using it, as it requires the client to send sensitive authentication information to Parse Server which could be exploited. Secure authentication requires less sensitive authentication data to be sent from the client to Parse Server. This minimizes the exposure of sensitive data to Parse Server and reduces the risk of data exposure in case of a data leak.

For example, with secure authentication, the GitHub authentication adapter does not require a user to disclose their access token. Instead, the client redirects the user to GitHub for authentication. GitHub then issues an authentication code which the client forwards to Parse Server. This approach does not send the access token to Parse Server. It enhances security by safeguarding the access token and preventing its exposure to unauthorized parties.

## Migration of Existing Apps

If you are starting a new app, you would want to require secure authentication from the beginning. If you are migrating an existing app, you would first want to check which authentication adapters Parse Server is currently using.

There are 3 possible scenarios:

1. Parse Server is not configured to use any authentication adapters. Verify this by checking that the Parse Server `auth` option is missing or empty. In this case no action is required.

2. Parse Server is configured to use authentication adapters, but none of the adapters allow insecure authentication. Verify this by checking that none of the adapters set in the Parse Server `auth` option have an `enableInsecureAuth` option according to their documentation. To find the documentation for each adapter see [Supported Authentication Services](#supported-authentication-services). In this case no action is required.

3. Parse Server is configured to use authentication adapters, and at least one of the adapters allows insecure authentication. Verify this by checking that at least one of the adapters set in the Parse Server `auth` option has an insecure option according to its documentation. To find the documentation for each adapter see [Supported Authentication Services](#supported-authentication-services). In this case we recommend to migrate as soon as possible, see [Migration Process](#migration-process).

### Migration Process

The following describes the process to migrate an app with one or multiple adapters with insecure authentication to secure authentication. The migration can be done for all affected adapters simultaneously, or for each adapter individually on their own timeline.

1. Set the Parse Server option `enableInsecureAuthAdapters: true` to explicitly allow insecure authentication. This does not have any effect on your app as we assume that the Parse Server version you are currently using allows insecure authentication by default.
2. Set the authentication adapter option `enableInsecureAuth: true` of the adapter to migrate to explicitly allow insecure authentication for the specific adapter. This does not have any effect on your app as we assume that the adapter of the Parse Server version your are currently using allows insecure authentication by default.
3. Modify your client app code so that instead of sending the insecure authentication payload it sends the secure authentication payload for the adapters to migrate, see the adapter documentation for details about the payload.
4. Roll out the modified client. If the rollout takes place gradually, for example because you have to wait for your users to upgrade their client app, Parse Server will receive payloads for secure authentication from new clients, and payloads for insecure authentication from old clients.
5. Set the authentication adapter option `enableInsecureAuth: false`, once sufficient old clients have upgraded to new clients, depending on your client rollout strategy. This option can be set for each adapter individually, for example in case of multiple clients with different rollout speed.

   ⚠️ From now on, old clients that try to authenticate with insecure authentication payloads will receive an error as response from Parse Server. You may want to inform users of old clients that they need to upgrade.

6. Once all adapters that allow insecure authentication are set to `enableInsecureAuth: false`, set the general Parse Server option `enableInsecureAuthAdapters: false` to disable insecure authentication for all adapters. This does not have any effect on your app as we assume no authentication adapter is allowing insecure authentication at this point.

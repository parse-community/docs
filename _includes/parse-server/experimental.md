# Experimental

Experimental features may not be 'battle tested' and could have issues. They are likely to become full features at some point, but could be removed from the system if they are problematic.

These features may not be approprate for production, so use at your own risk.

## Direct Access

`directAccess` replaces the HTTP Interface when using the JS SDK in the current node runtime. This may improve performance, along with `enableSingleSchemaCache` set to `true`.

Configuration:
```js
const api = new ParseServer({
    //...other configuration
    directAccess: true
});
```

## Idempotency

This feature deduplicates identical requests that are received by Parse Server mutliple times, typically due to network issues or network adapter access restrictions on mobile operating systems.

Identical requests are identified by their request header `X-Parse-Request-Id`. Therefore a client request has to include this header for deduplication to be applied. Requests that do not contain this header cannot be deduplicated and are processed normally by Parse Server. This means rolling out this feature to clients is seamless as Parse Server still processes requests without this header when this feature is enabled.

This feature needs to be enabled on the client side to send the header and on the server to process the header. Refer to the specific Parse SDK docs to see whether the feature is supported yet.

Deduplication is only done for object creation and update (`POST` and `PUT` requests). Deduplication is not done for object finding and deletion (`GET` and `DELETE` requests), as these operations are already idempotent by definition.

Configutation:
```js
const api = new ParseServer({
  //...other configuration
    idempotencyOptions: {
        paths: [".*"],       // enforce for all requests
        ttl: 120             // keep request IDs for 120s
    }
});
```
Parameters:

* `idempotencyOptions` (`Object`): Setting this enables idempotency enforcement for the specified paths.
* `idempotencyOptions.paths`(`Array<String>`): An array of path patterns that have to match the request path for request deduplication to be enabled. 
* The mount path must not be included, for example to match the request path `/parse/functions/myFunction` specify the path pattern `functions/myFunction`. A trailing slash of the request path is ignored, for example the path pattern `functions/myFunction` matches both `/parse/functions/myFunction` and `/parse/functions/myFunction/`.

  Examples:

  * `.*`: all paths, includes the examples below
  * `functions/.*`: all functions
  * `jobs/.*`: all jobs
  * `classes/.*`: all classes
  * `functions/.*`: all functions
  * `users`: user creation / update
  * `installations`: installation creation / update

* `idempotencyOptions.ttl`: The duration in seconds after which a request record is discarded from the database. Duplicate requests due to network issues can be expected to arrive within milliseconds up to several seconds. This value must be greater than `0`.


| Parameter                  | Optional | Type            | Default value | Example values                                                                                                                                                                                                                                                              | Environment variable                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|----------------------------|----------|-----------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `idempotencyOptions`       | yes      | `Object`        | `undefined`   |                                                                                                                                                                                                                                                                             | PARSE_SERVER_EXPERIMENTAL_IDEMPOTENCY_OPTIONS | Setting this enables idempotency enforcement for the specified paths.                                                                                                                                                                                                                                                                                                                                                                                 |
| `idempotencyOptions.paths` | yes      | `Array<String>` | `[]`          | `.*` (all paths, includes the examples below), <br>`functions/.*` (all functions), <br>`jobs/.*` (all jobs), <br>`classes/.*` (all classes), <br>`functions/.*` (all functions), <br>`users` (user creation / update), <br>`installations` (installation creation / update) | PARSE_SERVER_EXPERIMENTAL_IDEMPOTENCY_PATHS   | An array of path patterns that have to match the request path for request deduplication to be enabled. The mount path must not be included, for example to match the request path `/parse/functions/myFunction` specifiy the path pattern `functions/myFunction`. A trailing slash of the request path is ignored, for example the path pattern `functions/myFunction` matches both `/parse/functions/myFunction` and `/parse/functions/myFunction/`. |
| `idempotencyOptions.ttl`   | yes      | `Integer`       | `300`         | `60` (60 seconds)                                                                                                                                                                                                                                                           | PARSE_SERVER_EXPERIMENTAL_IDEMPOTENCY_TTL     | The duration in seconds after which a request record is discarded from the database. Duplicate requests due to network issues can be expected to arrive within milliseconds up to several seconds. This value must be greater than `0`.                                                                                                                                                                                                               |



### Notes

- This feature is currently only available for MongoDB and not for Postgres.

## Localization

### Pages
**Caution, this is an experimental feature that may not be appropriate for production.**

Custom pages as well as feature pages (e.g. password reset, email verification) can be localized with the `pages` option in the Parse Server configuration:

```js
const api = new ParseServer({
  ...otherOptions,

  pages: {
    enableRouter: true, // Enables the experimental feature; required for localization
    enableLocalization: true,
  }
}
```

Localization is achieved by matching a request-supplied `locale` parameter with localized page content. The locale can be supplied in either the request query, body or header with the following keys:
- query: `locale`
- body: `locale`
- header: `x-parse-page-param-locale`

For example, a password reset link with the locale parameter in the query could look like this:
```
http://example.com/parse/apps/[appId]/request_password_reset?token=[token]&username=[username]&locale=de-AT
```

- Localization is only available for pages in the pages directory as set with `pages.pagesPath`.
- Localization for feature pages (e.g. password reset, email verification) is disabled if `pages.customUrls` are set, even if the custom URLs point to the pages within the pages path.
- Only `.html` files are considered for localization when localizing custom pages.

Pages can be localized in two ways:

#### Localization with Directory Structure

Pages are localized by using the corresponding file in the directory structure where the files are placed in subdirectories named after the locale or language. The file in the base directory is the default file.

**Example Directory Structure:**
```js
root/
├── public/                  // pages base path
│   ├── example.html         // default file
│   └── de/                  // de language folder
│   │   └── example.html     // de localized file
│   └── de-AT/               // de-AT locale folder
│   │   └── example.html     // de-AT localized file
```

Files are matched with the locale in the following order:
1. Locale match, e.g. locale `de-AT` matches file in folder `de-AT`.
1. Language match, e.g. locale `de-CH` matches file in folder `de`.
1. Default; file in base folder is returned.

**Configuration Example:**
```js
const api = new ParseServer({
  ...otherOptions,

  pages: {
    enableRouter: true, // Enables the experimental feature; required for localization
    enableLocalization: true,
    customUrls: {
      passwordReset: 'https://example.com/page.html'
    }
  }
}
```

Pros:
- All files are complete in their content and can be easily opened and previewed by viewing the file in a browser.

Cons:
- In most cases, a localized page differs only slighly from the default page, which could cause a lot of duplicate code that is difficult to maintain.

#### Localization with JSON Resource

Pages are localized by adding placeholders in the HTML files and providing a JSON resource that contains the translations to fill into the placeholders.

**Example Directory Structure:**
```js
root/
├── public/                  // pages base path
│   ├── example.html         // the page containg placeholders
├── private/                 // folder outside of public scope
│   └── translations.json    // JSON resource file
```

The JSON resource file loosely follows the [i18next](https://github.com/i18next/i18next) syntax, which is a syntax that is often supported by translation platforms, making it easy to manage translations, exporting them for use in Parse Server, and even to automate this workflow.

**Example JSON Content:**
```json
{
  "en": {               // resource for language `en` (English)
    "translation": {
      "greeting": "Hello!"
    }
  },
  "de": {               // resource for language `de` (German)
    "translation": {
      "greeting": "Hallo!"
    }
  }
  "de-AT": {            // resource for locale `de-AT` (Austrian German)
    "translation": {
      "greeting": "Servus!"
    }
  }
}
```

**Configuration Example:**
```js
const api = new ParseServer({
  ...otherOptions,

  pages: {
    enableRouter: true, // Enables the experimental feature; required for localization
    enableLocalization: true,
    localizationJsonPath: './private/localization.json',
    localizationFallbackLocale: 'en'
  }
}
```

Pros:
- There is only one HTML file to maintain that contains the placeholders that are filled with the translations according to the locale.

Cons:
- Files cannot be easily previewed by viewing the file in a browser because the content contains only placeholders and even HTML or CSS changes may be dynamically applied, e.g. when a localization requires a Right-To-Left layout direction.
- Style and other fundamental layout changes may be more difficult to apply.

#### Dynamic placeholders

In addition to feature related default parameters such as `appId` and the translations provided via JSON resource, it is possible to define custom dynamic placeholders as part of the router configuration. This works independently of localization and, also if `enableLocalization` is disabled.

**Configuration Example:**
```js
const api = new ParseServer({
  ...otherOptions,

  pages: {
    enableRouter: true, // Enables the experimental feature; required for localization
    placeholders: {
      exampleKey: 'exampleValue'
    }
  }
}
```
The placeholders can also be provided as function or as async function, with the `locale` and other feature related parameters passed through, to allow for dynamic placeholder values:

```js
const api = new ParseServer({
  ...otherOptions,

  pages: {
    enableRouter: true, // Enables the experimental feature; required for localization
    placeholders: async (params) => {
      const value = await doSomething(params.locale);
      return {
        exampleKey: value
      };
    }
  }
}
```

#### Reserved Keys

The following parameter and placeholder keys are reserved because they are used related to features such as password reset or email verification. They should not be used as translation keys in the JSON resource or as manually defined placeholder keys in the configuration: `appId`, `appName`, `email`, `error`, `locale`, `publicServerUrl`, `token`, `username`.

#### Parameters

| Parameter                                       | Optional | Type                                  | Default value                          | Example values                                       | Environment variable                                            | Description                                                                                                                                                                                                   |
|-------------------------------------------------|----------|---------------------------------------|----------------------------------------|------------------------------------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pages`                                         | yes      | `Object`                              | `undefined`                            | -                                                    | `PARSE_SERVER_PAGES`                                            | The options for pages such as password reset and email verification.                                                                                                                                          |
| `pages.enableRouter`                            | yes      | `Boolean`                             | `false`                                | -                                                    | `PARSE_SERVER_PAGES_ENABLE_ROUTER`                              | Is `true` if the pages router should be enabled; this is required for any of the pages options to take effect. **Caution, this is an experimental feature that may not be appropriate for production.**       |
| `pages.enableLocalization`                      | yes      | `Boolean`                             | `false`                                | -                                                    | `PARSE_SERVER_PAGES_ENABLE_LOCALIZATION`                        | Is true if pages should be localized; this has no effect on custom page redirects.                                                                                                                            |
| `pages.localizationJsonPath`                    | yes      | `String`                              | `undefined`                            | `./private/translations.json`                        | `PARSE_SERVER_PAGES_LOCALIZATION_JSON_PATH`                     | The path to the JSON file for localization; the translations will be used to fill template placeholders according to the locale.                                                                              |
| `pages.localizationFallbackLocale`              | yes      | `String`                              | `en`                                   | `en`, `en-GB`, `default`                             | `PARSE_SERVER_PAGES_LOCALIZATION_FALLBACK_LOCALE`               | The fallback locale for localization if no matching translation is provided for the given locale. This is only relevant when providing translation resources via JSON file.                                   |
| `pages.placeholders`                            | yes      | `Object`, `Function`, `AsyncFunction` | `undefined`                            | `{ exampleKey: 'exampleValue' }`                     | `PARSE_SERVER_PAGES_PLACEHOLDERS`                               | The placeholder keys and values which will be filled in pages; this can be a simple object or a callback function.                                                                                           |
| `pages.forceRedirect`                           | yes      | `Boolean`                             | `false`                                | -                                                    | `PARSE_SERVER_PAGES_FORCE_REDIRECT`                             | Is `true` if responses should always be redirects and never content, `false` if the response type should depend on the request type (`GET` request -> content response; `POST` request -> redirect response). |
| `pages.pagesPath`                               | yes      | `String`                              | `./public`                             | `./files/pages`, `../../pages`                       | `PARSE_SERVER_PAGES_PAGES_PATH`                                 | The path to the pages directory; this also defines where the static endpoint `/apps` points to.                                                                                                               |
| `pages.pagesEndpoint`                           | yes      | `String`                              | `apps`                                 | -                                                    | `PARSE_SERVER_PAGES_PAGES_ENDPOINT`                             | The API endpoint for the pages.                                                                                                                                                                               |
| `pages.customUrls`                              | yes      | `Object`                              | `{}`                                   | `{ passwordReset: 'https://example.com/page.html' }` | `PARSE_SERVER_PAGES_CUSTOM_URLS`                                | The URLs to the custom pages                                                                                                                                                                                  |
| `pages.customUrls.passwordReset`                | yes      | `String`                              | `password_reset.html`                  | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_PASSWORD_RESET`                  | The URL to the custom page for password reset.                                                                                                                                                                |
| `pages.customUrls.passwordResetSuccess`         | yes      | `String`                              | `password_reset_success.html`          | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_PASSWORD_RESET_SUCCESS`          | The URL to the custom page for password reset -> success.                                                                                                                                                     |
| `pages.customUrls.passwordResetLinkInvalid`     | yes      | `String`                              | `password_reset_link_invalid.html`     | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_PASSWORD_RESET_LINK_INVALID`     | The URL to the custom page for password reset -> link invalid.                                                                                                                                                |
| `pages.customUrls.emailVerificationSuccess`     | yes      | `String`                              | `email_verification_success.html`      | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_EMAIL_VERIFICATION_SUCCESS`      | The URL to the custom page for email verification -> success.                                                                                                                                                 |
| `pages.customUrls.emailVerificationSendFail`    | yes      | `String`                              | `email_verification_send_fail.html`    | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_EMAIL_VERIFICATION_SEND_FAIL`    | The URL to the custom page for email verification -> link send fail.                                                                                                                                          |
| `pages.customUrls.emailVerificationSendSuccess` | yes      | `String`                              | `email_verification_send_success.html` | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_EMAIL_VERIFICATION_SEND_SUCCESS` | The URL to the custom page for email verification -> resend link -> success.                                                                                                                                  |
| `pages.customUrls.emailVerificationLinkInvalid` | yes      | `String`                              | `email_verification_link_invalid.html` | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_EMAIL_VERIFICATION_LINK_INVALID` | The URL to the custom page for email verification -> link invalid.                                                                                                                                            |
| `pages.customUrls.emailVerificationLinkExpired` | yes      | `String`                              | `email_verification_link_expired.html` | -                                                    | `PARSE_SERVER_PAGES_CUSTOM_URL_EMAIL_VERIFICATION_LINK_EXPIRED` | The URL to the custom page for email verification -> link expired.                                                                                                                                            |

### Notes

- In combination with the [Parse Server API Mail Adapter](https://www.npmjs.com/package/parse-server-api-mail-adapter) Parse Server provides a fully localized flow (emails -> pages) for the user. The email adapter sends a localized email and adds a locale parameter to the password reset or email verification link, which is then used to respond with localized pages.
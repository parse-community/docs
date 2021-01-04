# Experimental

Experimental Features are items that you are either experimenting with that will eventually become full features of your application, or items that will be removed from the system if they are proven to not work well.

These features may not be approprate for production, so use at your own risk.

## Direct Access

* `directAccess`: Replaces HTTP Interface when using JS SDK in current node runtime. This may improve performance, along with `enableSingleSchemaCache` set to `true`.

## Idempotency

This feature deduplicates identical requests that are received by Parse Server mutliple times, typically due to network issues or network adapter access restrictions on mobile operating systems.

Identical requests are identified by their request header `X-Parse-Request-Id`. Therefore a client request has to include this header for deduplication to be applied. Requests that do not contain this header cannot be deduplicated and are processed normally by Parse Server. This means rolling out this feature to clients is seamless as Parse Server still processes request without this header when this feature is enbabled.

This feature needs to be enabled on the client side to send the header and on the server to process the header. Refer to the specific Parse SDK docs to see whether the feature is supported yet.

Deduplication is only done for object creation and update (`POST` and `PUT` requests). Deduplication is not done for object finding and deletion (`GET` and `DELETE` requests), as these operations are already idempotent by definition.

Configutation:
```js
let api = new ParseServer({
    idempotencyOptions: {
        paths: [".*"],       // enforce for all requests
        ttl: 120             // keep request IDs for 120s
    }
}
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

#### Notes

- This feature is currently only available for MongoDB and not for Postgres.
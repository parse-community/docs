# Logging

Parse Server will, by default, log:
* to the console
* daily rotating files as new line delimited JSON

Logs are also viewable in the Parse Dashboard.

**Want to log each request and response?** 

Set the `VERBOSE` environment variable when starting `parse-server`.

```
VERBOSE='1' parse-server --appId APPLICATION_ID --masterKey MASTER_KEY
```

**Want logs to be in placed in a different folder?** 

Pass the `PARSE_SERVER_LOGS_FOLDER` environment variable when starting `parse-server`.

```
PARSE_SERVER_LOGS_FOLDER='<path-to-logs-folder>' parse-server --appId APPLICATION_ID --masterKey MASTER_KEY
```

**Want to log specific levels?** 

Pass the `logLevel` parameter when starting `parse-server`.

```
parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --logLevel LOG_LEVEL
```

**Want new line delimited JSON error logs (for consumption by CloudWatch, Google Cloud Logging, etc)?** 

Pass the `JSON_LOGS` environment variable when starting `parse-server`.

```
JSON_LOGS='1' parse-server --appId APPLICATION_ID --masterKey MASTER_KEY
```

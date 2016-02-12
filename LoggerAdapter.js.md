##### LoggerAdapter.js

---

Interface for allowing the underlying file storage to be changed

**Adapter classes must implement the following functions:**
* info(string or array of string or object keys, function callback)
* error(string or array of string or object keys, function callback)
* query(options, function callback)

options:
*   `level` (optional) Level of logging you want to query for (info || error)
*   `from` (optional) Start time for the search. Defaults to 1 week ago.
*   `until` (optional) End time for the search. Defaults to current time.
*   `order` (optional) Direction of results returned, either “asc” or “desc”. Defaults to “desc”.
*   `size` (optional) Number of rows returned by search. Defaults to 10

See [[FileLoggerAdapter.js|FileLoggerAdapter.js]] for the default implementation

---

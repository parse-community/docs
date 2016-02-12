##### LoggerAdapter.js

---

Interface for allowing the underlying file storage to be changed

Adapter classes must implement the following functions:
* info(string or array of string or object keys, function callback)
* error(string or array of string or object keys, function callback)
* query(options, function callback)
See [[FileLoggerAdapter.js|FileLoggerAdapter.js]] for the default implementation

---

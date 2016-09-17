##### FileLoggerAdapter.js

---

LoggerAdapter for logging info and error messages into local files (default)

See [[LoggerAdapter.js|LoggerAdapter.js]]

---

```
fileLogger.info('info content', {} => {...});
fileLogger.info('error content', {} => {...});
fileLogger.query({
  level: 'error',
  size: 10,
  from: Date.now() - (30 * 24 * 60 * 60 * 1000),
  until: Date.now(),
  order: 'desc'
}, {} => {...})
```

# Configuring Cache Adapters

By default, parse-server provides an internal cache layer to speed up schema verifications, user, roles and sessions lookup.

In some cases, in distributed environment, you may want to use a distributed cache like Redis.

parse-server comes with an optional redis cache adapter.

Those cache adapters can be cleaned at anytime internally, you should not use them to cache data and you should let parse-server manage their data lifecycle.

## RedisCacheAdapter

```javascript

var RedisCacheAdapter = require('parse-server').RedisCacheAdapter;
var redisOptions = {url: 'YOUR REDIS URL HERE'}
var redisCache = new RedisCacheAdapter(redisOptions);

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: process.env.APP_ID || 'APPLICATION_ID',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY',
  ...
  cacheAdapter: redisCache,
  ...
});
```

The `redisOptions` are passed directly to the redis.createClient method. For more information refer to the [redis.createClient](https://www.npmjs.com/package/redis#rediscreateclient) documentation.

Note that at the moment, only passing a single argument is supported.

The cache adapter can flush the redis database at anytime. It is best to not use the same redis database for other services. A different redis database can be chosen by providing a different database number to `redisOptions`. By default redis has 16 databases (indexed from 0 to 15).

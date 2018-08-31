# Server Info

Any server version **2.1.4** or later supports access to detailed information about itself and it's capabilities. 

You can leverage `ParseServerInfo` (present in sdk version **1.4.0** and up) to check on the features and version of your server.

## Version

You can get the current version of the server you are connected to. Do keep in mind that server must be at version **2.1.4** or above for this to work.

```php
// get the current version of the server you are connected to (2.6.5, 2.5.4, etc.)
$version = ParseServerInfo::getVersion();
```

## Features

Check which features your server has and how they are configured in some cases.

```php
// get various features
$globalConfigFeatures = ParseServerInfo::getGlobalConfigFeatures();
/**
 * Returns json of the related features
 * {
 *    "create" : true,
 *    "read"   : true,
 *    "update" : true,
 *    "delete" : true
 * }
 */

 // you can always get all feature data
 $data = ParseServerInfo::getFeatures();
```

For your convenience we've added getters for the following features in particular:

```php
ParseServerInfo::getHooksFeatures();
ParseServerInfo::getCloudCodeFeatures();
ParseServerInfo::getLogsFeatures();
ParseServerInfo::getPushFeatures();
ParseServerInfo::getSchemasFeatures();

// additional features can be obtained manually using 'get'
$feature = ParseServerInfo::get('new-feature');
```
To install, either add to your pubspec.yaml
```yml
dependencies:  
    parse_server_sdk: ^1.0.24
```
or clone this repository and add to your project. As this is an early development with multiple contributors, it is probably best to download/clone and keep updating as an when a new feature is added.


Once you have the library added to your project, upon first call to your app (Similar to what your application class would be) add the following...

```dart
await Parse().initialize(
        keyApplicationId,
        keyParseServerUrl);
```

If you want to use secure storage or use the Flutter web/desktop SDK, please change to the below instance of CoreStorage as it has no dependencies on Flutter.
```dart

await Parse().initialize(
  	keyParseApplicationId, 
  	keyParseServerUrl,
    coreStore: await CoreStoreSembastImp.getInstance());
```
It's possible to add other parameters to work with your instance of Parse Server:- 

```dart
  await Parse().initialize(
        keyApplicationId,
        keyParseServerUrl,
        masterKey: keyParseMasterKey, // Required for Back4App and others
        clientKey: keyParseClientKey, // Required for some setups
        debug: true, // When enabled, prints logs to console
        liveQueryUrl: keyLiveQueryUrl, // Required if using LiveQuery 
        autoSendSessionId: true, // Required for authentication and ACL
        securityContext: securityContext, // Again, required for some setups
	coreStore: await CoreStoreSharedPrefsImp.getInstance()); // Local data storage method. Will use SharedPreferences instead of Sembast as an internal DB
```

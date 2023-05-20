# Config

The SDK supports [Parse Config](https://docs.parseplatform.org/cloudcode/guide/#config). A map of config parameters can be retrieved from Parse Server with:

```dart
var response = await ParseConfig().getConfigs();
```

and to add a config:
```dart
ParseConfig().addConfig('TestConfig', 'testing');
```
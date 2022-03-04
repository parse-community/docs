# Getting Started

To user the parse in your project flutter, start adding the dependecy in your project:

You can run flutter command directly in your terminal:

```bash
flutter pub add parse_server_sdk_flutter
```

Then this will add a line like this to your package's pubspec.yaml (and run an implicit `flutter pub get`):

```yaml
dependencies:
  parse_server_sdk_flutter: ^3.1.0

```
Alternatively, your editor might support `flutter pub get`. Check the docs for your editor to learn more.


## Initializing the Parse SDK

```dart
import 'package:parse_server_sdk_flutter/generated/i18n.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';
import 'dart:async';
import 'package:flutter/material.dart';

void main() async {
  final keyParseApplicationId = 'YOUR_APP_ID_HERE';
  final keyParseClientKey = 'YOUR_CLIENT_KEY_HERE';
  final keyParseServerUrl = 'http://YOUR_PARSE_SERVER:1337/parse';
  await Parse().initialize(keyParseApplicationId, keyParseServerUrl,
      clientKey: keyParseClientKey);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter using Parse SDK',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter using Parse SDK'),
        ),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```
Note that you must import the library `dart:async` to use o Parse.

⚠️ If you need to use the master key, note please note that the master key should only be used in safe environments and never on client side:

```dart
 await Parse().initialize(
     //...
     masterKey: 'YOUR_MASTERKEY');
```

## Web support

Due to Cross-origin resource sharing (CORS) restrictions, this requires adding `X-Parse-Installation-Id` as an allowed header to parse-server.
When running directly via docker, set the env var `PARSE_SERVER_ALLOW_HEADERS=X-Parse-Installation-Id`.
When running via express, set [ParseServerOptions](https://parseplatform.org/parse-server/api/master/ParseServerOptions.html) `allowHeaders: ['X-Parse-Installation-Id']`.

## Network client

By default, this SDK uses the `ParseHTTPClient`.
Another option is use `ParseDioClient`. This client supports the most features (for example a progress callback at the file upload), but a benchmark has shown, that dio is slower than http on web.

If you want to use the `ParseDioClient`, which uses the dio network library,
you can provide a custom `ParseClientCreator` at the initialization of the SDK.
```dart
await Parse().initialize(
  //...
  clientCreator: ({bool? sendSessionId, SecurityContext? securityContext}) => ParseDioClient(sendSessionId: sendSessionId, securityContext: securityContext),
);
```




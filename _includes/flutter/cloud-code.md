# Cloud Code

The SDK supports call Cloud Functions.

Executes a cloud function that returns a ParseObject type
```dart
final ParseCloudFunction function = ParseCloudFunction('hello');
final ParseResponse result =
    await function.executeObjectFunction<ParseObject>();
if (result.success) {
  if (result.result is ParseObject) {
    final ParseObject parseObject = result.result;
    print(parseObject.className);
  }
}
```

Executes a cloud function with parameters
```dart
final ParseCloudFunction function = ParseCloudFunction('hello');
final Map<String, String> params = <String, String>{'plan': 'paid'};
function.execute(parameters: params);
```

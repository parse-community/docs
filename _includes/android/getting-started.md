# Getting Started

Note that we support Android 2.3 and higher. You can also check out our [API Reference]({{ site.apis.android }}) for more detailed information about our SDK.

## Installation
**Step 1:** Download `Parse-SDK-Android`

Add dependency to the application level `build.gradle` file.

[![Bintray][bintray-svg]][bintray-link]

```groovy
dependencies {
  implementation 'com.parse:parse-android:latest.version.here'
}
```

**Step 2:** Setup Parse
Initialize Parse using your server configuration:
```java
import com.parse.Parse;
import android.app.Application;

public class App extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    Parse.initialize(new Parse.Configuration.Builder(this)
      .applicationId("YOUR_APP_ID")
      .clientKey("YOUR_CLIENT_KEY")
      .server("http://localhost:1337/parse/")
      .build()
    );
  }
}
```

 The custom `Application` class must be registered in `AndroidManifest.xml`:
 ```xml
 <application
   android:name=".App"
   ...>
   ...
 </application>
 ```

 [bintray-svg]: https://api.bintray.com/packages/parse/maven/com.parse:parse-android/images/download.svg
 [bintray-link]: https://bintray.com/parse/maven/com.parse:parse-android

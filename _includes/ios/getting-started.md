# Getting Started

To use parse, head on over to the [releases][releases] page, and download the latest build.
And you're off! Take a look at the public [documentation][docs] and start building.

**Other Installation Options**

 - **[CocoaPods](https://cocoapods.org)**
 
   Add the following line to your Podfile:
   ```ruby
   pod 'Parse'
   ```
   Run `pod install`, and you should now have the latest parse release.  CocoaPods will generate a .xcworkspace for you.  You must open the .xcworkspace in Xcode or you will get a linker error.
    
    
 - **[Carthage](https://github.com/carthage/carthage)**
 
   Add the following line to your Cartfile:
   ```
   github "parse-community/Parse-SDK-iOS-OSX"
   ```
   Run `carthage update`, and you should now have the latest version of Parse SDK in your Carthage folder.

 - **Compiling for yourself**

    If you want to manually compile the SDK, clone it locally, and run the following commands in the root directory of the repository:

        # To pull in extra dependencies (Bolts and OCMock)
        git submodule update --init --recursive

        # To install all the gems
        bundle install

        # Build & Package the Frameworks
        rake package:frameworks

    Compiled frameworks will be in 2 archives: `Parse-iOS.zip` and `Parse-OSX.zip` inside the `build/release` folder, and you can link them as you'd please.

 - **Using Parse as a sub-project**

    You can also include parse as a subproject inside of your application if you'd prefer, although we do not recommend this, as it will increase your indexing time significantly. To do so, just drag and drop the Parse.xcodeproj file into your workspace. Note that unit tests will be unavailable if you use Parse like this, as OCMock will be unable to be found.

**Initialise Parse SDK**

To initialize the Parse client, add the following to your AppDelegate.swift, in the application:didFinishLaunchingWithOptions: method.

```swift
// AppDelegate.swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        let parseConfig = ParseClientConfiguration {
            $0.applicationId = "parseAppId"
            $0.clientKey = "parseClientKey"
            $0.server = "parseServerUrlString"
        }
        Parse.initialize(with: parseConfig)
}
```
[releases]: https://github.com/parse-community/Parse-SDK-iOS-OSX/releases
[docs]: http://docs.parseplatform.org/ios/guide

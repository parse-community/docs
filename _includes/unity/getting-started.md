# Getting Started

If you're familiar with web frameworks like ASP.NET MVC we've taken many of the same principles and applied them to our platform. In particular, our SDK is ready to use out of the box with minimal configuration on your part.

The SDK is available for download on [NuGet package][nuget-link].

Note that our SDK requires Unity version 5.2.x or higher and targets Android apps and iOS apps. You can also check out our [API Reference]({{ site.apis.dotnet }}) for more detailed information about our SDK.

Parse's Unity SDK makes heavy use of a subset of the [Task-based Asynchronous Pattern](http://msdn.microsoft.com/en-us/library/hh873175.aspx) so that your apps remain responsive.


## Adding `link.xml`

Create a file and name it `link.xml` under your Assets folder and put the following code to make sure Parse Unity SDK works with Unity code optimization pipeline:

```xml
<linker>
  <assembly fullname="UnityEngine">
    <type fullname="UnityEngine.iOS.NotificationServices" preserve="all"/>
    <type fullname="UnityEngine.iOS.RemoteNotification" preserve="all"/>
    <type fullname="UnityEngine.AndroidJavaClass" preserve="all"/>
    <type fullname="UnityEngine.AndroidJavaObject" preserve="all"/>
  </assembly>

  <assembly fullname="Parse.Unity">
    <namespace fullname="Parse" preserve="all"/>
    <namespace fullname="Parse.Internal" preserve="all"/>
  </assembly>
</linker>
```

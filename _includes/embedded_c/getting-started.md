# Getting Started

The Parse platform provides a complete backend solution for your hardware device. Our goal is to totally eliminate the need for writing server code or maintaining servers. Using our C SDKs, all it takes is a few lines of code to save and retrieve data from the Parse Server.

We provide two open source reference implementations for embedded environments:

1.  Embedded C SDK - Targeted for Linux. This can be adapted to target OSes like Ubuntu, Debian, and others.
2.  Embedded RTOS C SDK - Targeted for Real Time OSes. This can be adapted for other embedded RTOS environments.

Both these SDKs provide a consistent interface to interact with the [Parse REST API]({{ site.baseurl }}/rest/guide), but with different underlying implementations.

On Parse, you create an App for each of your mobile and embedded applications. Each App has its own application ID and client key that you apply to your SDK install. Your account on Parse can accommodate multiple Apps. This is useful even if you have one application, since you can deploy different versions for test and production.

## Initialization

In order for Parse to know which app is associated with the connected device, simply specify the application ID and client key in the device code:

```cpp
ParseClient client = parseInitialize("${APPLICATION_ID}", "${CLIENT_KEY}");
```

After this, all calls to the Parse Server will use the specified app.

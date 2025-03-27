# Analytics

Parse provides tools to gain insights into your app's activity. You can track app launches, custom events, and more.  These analytics are available even if you primarily use Parse for data storage.  Your app's dashboard provides real-time graphs and breakdowns (by device type, class name, or REST verb) of API requests, and you can save graph filters.

## App-Open Analytics

Track application launches by calling `TrackAppOpenedAsync()` in your app's launch event handler. This provides data on when and how often your app is opened. Since MAUI does not have a single, clear "launching" event like some other platforms, the best place to put this call is in your `App.xaml.cs` constructor, *after* initializing the Parse client:

```csharp
// In App.xaml.cs
public App()
{
    InitializeComponent();

    MainPage = new AppShell();

    // Initialize Parse Client (See initialization documentation)
    if (!InitializeParseClient())
    {
        // Handle initialization failure
        Console.WriteLine("Failed to initialize Parse.");
    }
    else
    {
       // Track app open *after* successful Parse initialization.
       Task.Run(() => ParseClient.Instance.TrackLaunchAsync()); // Do not await in the constructor.
    }
}
```

**Important Considerations:**

*   **`Task.Run()`:** We use `Task.Run()` to call `TrackLaunchAsync()` *without* awaiting it in the `App` constructor.  This is crucial because the constructor should complete quickly to avoid delaying app startup.  `TrackLaunchAsync` will run in the background.  If Parse initialization fails, we *don't* track the app open.
*   **MAUI Lifecycle:** MAUI's lifecycle events are different from older platforms.  There isn't a single, universally appropriate "launching" event.  The `App` constructor is generally a good place, *provided* you initialize Parse first and handle potential initialization failures.  Other possible locations (depending on your specific needs) might include the `OnStart` method of your `App` class, or the first page's `OnAppearing` method. However, the constructor ensures it's tracked as early as possible.
* **Push Notifications:** If you are using Push Notifications, you'll likely need to handle tracking opens from push notifications separately, in the code that handles the push notification reception and user interaction.  This is *not* covered in this basic analytics section (see the Push Notifications documentation).

## Custom Analytics

Track custom events with `TrackAnalyticsEventAsync()`.  You can include a dictionary of `string` key-value pairs (dimensions) to segment your events.

Example: Tracking apartment search usage:

```csharp
public async Task TrackSearchEventAsync(string priceRange, string source, string dayType)
{
    var dimensions = new Dictionary<string, string>
    {
        { "priceRange", priceRange },
        { "source", source },
        { "dayType", dayType }
    };

    try
    {
        await ParseClient.Instance.TrackAnalyticsEventAsync("search", dimensions);
    }
    catch (Exception ex)
    {
        // Handle errors (e.g., network issues)
        Console.WriteLine($"Analytics tracking failed: {ex.Message}");
    }
}

// Example usage:
await TrackSearchEventAsync("1000-1500", "craigslist", "weekday");

```

You can use `TrackAnalyticsEventAsync` for lightweight error tracking:

```csharp
// Example: Tracking errors
public async Task TrackErrorEventAsync(int errorCode)
{
    var dimensions = new Dictionary<string, string>
    {
        { "code", errorCode.ToString() }
    };

    try
    {
        await ParseClient.Instance.TrackAnalyticsEventAsync("error", dimensions);
    }
    catch (Exception ex)
    {
        // It failed.. not much to do, is there?
        Console.WriteLine($"Analytics tracking failed: {ex.Message}");
    }
}

// Example usage (within a catch block):
catch (Exception ex)
{
    // ... other error handling ...
    await TrackErrorEventAsync(123); // Replace 123 with a meaningful error code.
}
```

**Limitations:**

*   Parse stores only the first eight dimension pairs per `TrackAnalyticsEventAsync()` call.

**API Changes and Usage (Key Points):**

*   **`ParseAnalytics.TrackAppOpenedAsync()` is now `ParseClient.Instance.TrackLaunchAsync()`:**  The methods are now extension methods on the `IServiceHub` interface, and you access them via `ParseClient.Instance`.
*   **`ParseAnalytics.TrackEventAsync()` is now `ParseClient.Instance.TrackAnalyticsEventAsync()`:** Similar to the above, this is now an extension method.
*   **Asynchronous Operations:**  All analytics methods are asynchronous (`async Task`).  Use `await` when calling them (except in specific cases like the `App` constructor, where you should use `Task.Run()` to avoid blocking).
* **Error Handling** Use `try-catch` and handle `Exception`.

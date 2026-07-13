# Analytics

Parse provides tools to gain insights into your app's activity. You can track app launches, custom events, and more. These analytics are available even if you primarily use Parse for data storage. Your app's dashboard provides real-time graphs and breakdowns (by device type, class name, or REST verb) of API requests, and you can save graph filters.

## App-Open Analytics

Track application launches by calling `TrackAppOpenedAsync()` in your app's launch event handler. This provides data on when and how often your app is opened. Since MAUI does not have a single, clear "launching" event like some other platforms, the best place to put this call is in your `App.xaml.cs` constructor, *after* initializing the Parse client:

```csharp
public App()
{
    InitializeComponent();
    MainPage = new AppShell();

    // Initialize Parse Client, see initialization documentation
    if (!InitializeParseClient())
    {
        // Handle initialization failure
        Console.WriteLine("Failed to initialize Parse.");
    }
    else
    {
        // Track app open after successful Parse initialization
        // Do not await in the constructor.
        Task.Run(() => ParseClient.Instance.TrackLaunchAsync());
    }
}
```

### Important Considerations

* We use `Task.Run()` to call `TrackLaunchAsync()` *without* awaiting it in the `App` constructor. This is crucial because the constructor should complete quickly to avoid delaying app startup. `TrackLaunchAsync` will run in the background. If Parse initialization fails, we *don't* track the app open.
* MAUI's lifecycle events are different from older platforms. There isn't a single, universally appropriate "launching" event. The `App` constructor is generally a good place, *provided* you initialize Parse first and handle potential initialization failures. Other possible locations (depending on your specific needs) might include the `OnStart` method of your `App` class, or the first page's `OnAppearing` method. However, the constructor ensures it's tracked as early as possible.
* If you are using push notifications, you'll likely need to handle tracking opening from push notifications separately, in the code that handles the push notification reception and user interaction. This is *not* covered in this basic analytics section, see the Push Notification documentation.

## Custom Analytics

Track custom events with `TrackAnalyticsEventAsync()`. You can include a dictionary of `string` key-value pairs (dimensions) to segment your events.

The following example shows tracking apartment searches:

```csharp
public async Task TrackSearchEventAsync(string price, string city, string date)
{
    var dimensions = new Dictionary<string, string>
    {
        { "price", priceRange },
        { "city", city },
        { "date", date }
    };

    try
    {
        await ParseClient.Instance.TrackAnalyticsEventAsync("search", dimensions);
    }
    catch (Exception ex)
    {
        // Handle errors like network issues
        Console.WriteLine($"Analytics tracking failed: {ex.Message}");
    }
}
```

You can use `TrackAnalyticsEventAsync` for lightweight error tracking:

```csharp
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
        Console.WriteLine($"Analytics tracking failed: {ex.Message}");
    }
}
```

For tracking within a catch block:

```csharp
catch (Exception ex)
{
    // Replace `123` with a meaningful error code
    await TrackErrorEventAsync(123);
}
```

### Limitations

* Parse stores only the first eight dimension pairs per `TrackAnalyticsEventAsync()` call.

### API Changes and Usage

* `ParseAnalytics.TrackAppOpenedAsync()` is now `ParseClient.Instance.TrackLaunchAsync()`. The methods are now extension methods on the `IServiceHub` interface, and you access them via `ParseClient.Instance`.
* `ParseAnalytics.TrackAppOpenedAsync()` is now `ParseClient.Instance.TrackLaunchAsync()`. The methods are now extension methods on the `IServiceHub` interface, and you access them via `ParseClient.Instance`.
* `ParseAnalytics.TrackEventAsync()` is now `ParseClient.Instance.TrackAnalyticsEventAsync()`. Similar to the above, this is now an extension method.
* All analytics methods are now asynchronous (`async Task`). Use `await` when calling them, except in specific cases like the `App` constructor, where you should use `Task.Run()` to avoid blocking.
* For error handling use `try-catch` and handle `Exception`.

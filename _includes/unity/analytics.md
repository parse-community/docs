# Analytics

Parse provides a number of hooks for you to get a glimpse into the ticking heart of your app. We understand that it's important to understand what your app is doing, how frequently, and when.

While this section will cover different ways to instrument your app to best take advantage of Parse's analytics backend, developers using Parse to store and retrieve data can already take advantage of metrics on Parse.

Without having to implement any client-side logic, you can view real-time graphs and breakdowns (by device type, Parse class name, or REST verb) of your API Requests in your app's dashboard and save these graph filters to quickly access just the data you're interested in.

## App-Open Analytics

Our initial analytics hook allows you to track your application being launched. By adding the following line to your Launching event handler, you'll be able to collect data on when and how often your application is opened.

```csharp
ParseAnalytics.TrackAppOpenedAsync();
```

Graphs and breakdowns of your statistics are accessible from your app's Dashboard.

## Custom Analytics

`ParseAnalytics` also allows you to track free-form events, with a handful of `string` keys and values. These extra dimensions allow segmentation of your custom events via your app's Dashboard.

Say your app offers search functionality for apartment listings, and you want to track how often the feature is used, with some additional metadata.

```csharp
var dimensions = new Dictionary<string, string> {
  // Define ranges to bucket data points into meaningful segments
  { "priceRange", "1000-1500" },
  // Did the user filter the query?
  { "source", "craigslist" },
  // Do searches happen more often on weekdays or weekends?
  { "dayType", "weekday" }
};
// Send the dimensions to Parse along with the 'search' event
ParseAnalytics.TrackEventAsync("search", dimensions);
```

`ParseAnalytics` can even be used as a lightweight error tracker &mdash; simply invoke the following and you'll have access to an overview of the rate and frequency of errors, broken down by error code, in your application:

```csharp
var errDimensions = new Dictionary<string, string> {
  { "code", Convert.ToString(error.Code) }
};
ParseAnalytics.TrackEventAsync("error", errDimensions );
```

Note that Parse currently only stores the first eight dimension pairs per call to `ParseAnalytics.TrackEventAsync()`.

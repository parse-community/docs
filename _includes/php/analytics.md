# Analytics

Parse provides a number of hooks for you to get a glimpse into the ticking heart of your app. We understand that it's important to understand what your app is doing, how frequently, and when.

While this section will cover different ways to instrument your app to best take advantage of Parse's analytics backend, developers using Parse to store and retrieve data can already take advantage of metrics on Parse.

## Custom Analytics

`ParseAnalytics` also allows you to track free-form events, with a handful of `string` keys and values. These extra dimensions allow segmentation of your custom events via your app's Dashboard.

Say your app offers search functionality for apartment listings, and you want to track how often the feature is used, with some additional metadata.

```php
// Define ranges to bucket data points into meaningful segments
$dimensions = [
  "priceRange" => '1000-1500', 
  "source" => 'craigslist', 
  "dayType": 'weekday'
];
// Send the dimensions to Parse along with the 'search' event
ParseAnalytics::track('search', $dimensions);
```

`ParseAnalytics` can even be used as a lightweight error tracker &mdash; simply invoke the following and you'll have access to an overview of the rate and frequency of errors, broken down by error code, in your application:

```php
$codeString = '' + $error->getCode();
ParseAnalytics::track('error', ["code" => codeString]);
```

Note that Parse currently only stores the first eight dimension pairs per call to `ParseAnalytics::track()`.

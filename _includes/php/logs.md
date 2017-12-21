# Logs

`ParseLogs` allows info and error logs to be retrieved from the server as JSON.
This is available in sdk versions **1.4.0** and up.

Using the same approach as that which is utilized in the [dashboard](https://github.com/parse-community/parse-dashboard) you can view your logs with specific ranges in time, type and order.
Note that this requires the correct masterKey to be set during your initialization for access.

<pre><code class="php">
// get last 100 info logs, sorted in descending order
$logs = ParseLogs::getInfoLogs();

// get last 100 info logs, sorted in descending order
$logs = ParseLogs::getErrorLogs();

// logs can be retrieved with further specificity
// get 10 logs from a date up to a date in ascending order
$logs = ParseLogs::getInfoLogs(10, $fromDate, $untilDate, 'asc');

// above can be done for 'getErrorLogs' as well
</code></pre>
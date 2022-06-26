# Cloud Code

Server side cloud code is a powerful component of parse server. 

You can read more about how to setup cloud code in the [cloud code guide](https://docs.parseplatform.org/cloudcode/guide/).

## Cloud Functions

Directly call server-side cloud code functions and get their results.

```php
$results = ParseCloud::run("aCloudFunction", array("from" => "php"));
```

## Cloud Jobs

Like cloud functions, cloud jobs allow you to run code server-side but in an asynchronous fashion.
Instead of waiting for execution to complete you are immediately returned an id for tracking the job's progress.
You can use this id to see the current information on a job and whether it has completed.

```php
// start job
$jobStatusId = ParseCloud::startJob('MyCloudJob', array("startedBy" => "me!"));

// get job status, a ParseObject!
$jobStatus = ParseCloud::getJobStatus($jobStatusId);
$status = $jobStatus->get('status'); // failed / succeeded when done
```
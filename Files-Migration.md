In order of priority and easiest to hardest, here's how we should allow files migration from Hosted Parse to Parse Server:

### In Flight

Parse Server knows how to access and read existing files in Hosted Parse S3. We should make so that whenever we have a request for a file still on Hosted Parse, Parse Server downloads the original, uploads it to your file store and updates the reference in Mongo. This should probably be an option, maybe not everyone wants to allow this?

* Pros: Easy to implement, seamless for users
* Cons: Small latency hit the first time we copy the file (although we could just redirect and defer the download), could potentially miss some never accessed files, how to deal with concurrency?

### Mongo Objects

Have a helper script in Parse Server that looks up the Schema places with known file objects, iterates over all those object and copies them to the new data store using the file adapter.

* Pros: guaranties that all referenced files are copied, would allow you to migrate from one file adapter to another
* Cons: can be costly and take a long time to iterate on all Mongo objects for large apps, what to do for file objects within objects/arrays?

### S3 Listing

We could have an API on Hosted Parse that once authenticated, returns the list of all the files an app has in S3 by doing a listing on the bucket.

* Pros: users control how they want to sync their files, ability to download all files even those deleted in Mongo
* Cons: need to implement some API on Hosted Parse for security, listing job can take a long time for apps with lots of files
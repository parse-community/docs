In order of priority and easiest to hardest, here's how we should allow files migration from Hosted Parse to Parse Server:

### In Flight

Parse Server knows how to access and read existing files in Hosted Parse S3. We should make so that whenever we have a request for a file still on Hosted Parse, Parse Server downloads the original, uploads it to your file store and updates the reference in Mongo. This should probably be an option, maybe not everyone wants to allow this?

* Pros: Easy to implement, seamless for users
* Cons: Small latency hit the first time we copy the file, could potentially miss some never accessed files, how to deal with concurrency?

### Mongo Objects

* Pros:
* Cons:

### S3 Listing

* Pros:
* Cons:
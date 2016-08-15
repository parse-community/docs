# Objects

## The PFObject

Storing data on Parse is built around the `PFObject`. Each `PFObject` contains key-value pairs of JSON-compatible data. This data is schemaless, which means that you don't need to specify ahead of time what keys exist on each `PFObject`. You simply set whatever key-value pairs you want, and our backend will store it.

For example, let's say you're tracking high scores for a game. A single `PFObject` could contain:

```js
score: 1337, playerName: "Sean Plott", cheatMode: false
```

Keys must be alphanumeric strings. Values can be strings, numbers, booleans, or even arrays and dictionaries - anything that can be JSON-encoded.

Each `PFObject` has a class name that you can use to distinguish different sorts of data. For example, we could call the high score object a `GameScore`. We recommend that you NameYourClassesLikeThis and nameYourKeysLikeThis, just to keep your code looking pretty.

## Saving Objects

Let's say you want to save the `GameScore` described above to the Parse Cloud. The interface is similar to a `NSMutableDictionary`, plus the `saveInBackground` method:

<pre><code class="objectivec">
PFObject *gameScore = [PFObject objectWithClassName:@"GameScore"];
gameScore[@"score"] = @1337;
gameScore[@"playerName"] = @"Sean Plott";
gameScore[@"cheatMode"] = @NO;
[gameScore saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    // The object has been saved.
  } else {
    // There was a problem, check error.description
  }
}];
</code></pre>

<pre><code class="swift">
var gameScore = PFObject(className:"GameScore")
gameScore["score"] = 1337
gameScore["playerName"] = "Sean Plott"
gameScore["cheatMode"] = false
gameScore.saveInBackgroundWithBlock {
  (success: Bool, error: NSError?) -> Void in
  if (success) {
    // The object has been saved.
  } else {
    // There was a problem, check error.description
  }
}
</code></pre>

After this code runs, you will probably be wondering if anything really happened. To make sure the data was saved, you can look at the Data Browser in your app on Parse. You should see something like this:

```js
objectId: "xWMyZ4YEGZ", score: 1337, playerName: "Sean Plott", cheatMode: false,
createdAt:"2011-06-10T18:33:42Z", updatedAt:"2011-06-10T18:33:42Z"
```

There are two things to note here. You didn't have to configure or set up a new Class called `GameScore` before running this code. Your Parse app lazily creates this Class for you when it first encounters it.

There are also a few fields you don't need to specify that are provided as a convenience. `objectId` is a unique identifier for each saved object. `createdAt` and `updatedAt` represent the time that each object was created and last modified in the Parse Cloud. Each of these fields is filled in by Parse, so they don't exist on a `PFObject` until a save operation has completed.

Note: You can use the `saveInBackgroundWithBlock` method to provide additional logic to run after the save completes.

## Retrieving Objects

Saving data to the cloud is fun, but it's even more fun to get that data out again. If you have the `objectId`, you can retrieve the whole `PFObject` using a `PFQuery`.  This is an asynchronous method, with variations for using either blocks or callback methods:

<pre><code class="objectivec">
PFQuery *query = [PFQuery queryWithClassName:@"GameScore"];
[query getObjectInBackgroundWithId:@"xWMyZ4YEGZ" block:^(PFObject *gameScore, NSError *error) {
    // Do something with the returned PFObject in the gameScore variable.
    NSLog(@"%@", gameScore);
}];
// The InBackground methods are asynchronous, so any code after this will run
// immediately.  Any code that depends on the query result should be moved
// inside the completion block above.
</code></pre>

<pre><code class="swift">
var query = PFQuery(className:"GameScore")
query.getObjectInBackgroundWithId("xWMyZEGZ") {
  (gameScore: PFObject?, error: NSError?) -> Void in
  if error == nil && gameScore != nil {
    print(gameScore)
  } else {
    print(error)
  }
}
</code></pre>

To get the values out of the `PFObject`, you can use either the `objectForKey:` method or the `[]` subscripting operator:

<pre><code class="objectivec">
int score = [[gameScore objectForKey:@"score"] intValue];
NSString *playerName = gameScore[@"playerName"];
BOOL cheatMode = [gameScore[@"cheatMode"] boolValue];
</code></pre>

<pre><code class="swift">
let score = gameScore["score"] as Int
let playerName = gameScore["playerName"] as String
let cheatMode = gameScore["cheatMode"] as Bool
</code></pre>

The three special values are provided as properties:

<pre><code class="objectivec">
NSString *objectId = gameScore.objectId;
NSDate *updatedAt = gameScore.updatedAt;
NSDate *createdAt = gameScore.createdAt;
</code></pre>

<pre><code class="swift">
let objectId = gameScore.objectId
let updatedAt = gameScore.updatedAt
let createdAt = gameScore.createdAt
</code></pre>

If you need to refresh an object you already have with the latest data that
    is in the Parse Cloud, you can call the `fetch` method like so:

<pre><code class="objectivec">
[myObject fetch];
</code></pre>

<pre><code class="swift">
myObject.fetch()
</code></pre>

Note: In a similar way to the `save` methods, you can use the `fetchInBackgroundWithBlock` or `fetchInBackgroundWithTarget:selector:` methods to provide additional logic which will run after fetching the object.

## The Local Datastore

Parse also lets you store objects in a [local datastore](#local-datastore) on the device itself. You can use this for data that doesn't need to be saved to the cloud, but this is especially useful for temporarily storing data so that it can be synced later. To enable the datastore, add `libsqlite3.dylib` and call `[Parse enableLocalDatastore]` in your `AppDelegate` `application:didFinishLaunchWithOptions:` before calling `[Parse setApplicationId:clientKey:]`. Once the local datastore is enabled, you can store an object by pinning it.

<pre><code class="objectivec">
PFObject *gameScore = [PFObject objectWithClassName:@"GameScore"];
gameScore[@"score"] = 1337;
gameScore[@"playerName"] = @"Sean Plott";
gameScore[@"cheatMode"] = @NO;
[gameScore pinInBackground];
</code></pre>

<pre><code class="swift">
let gameScore = PFObject(className:"GameScore")
gameScore["score"] = 1337
gameScore["playerName"] = "Sean Plott"
gameScore["cheatMode"] = false
gameScore.pinInBackground()
</code></pre>

As with saving, this recursively stores every object and file that `gameScore` points to, if it has been fetched from the cloud. Whenever you save changes to the object, or fetch new changes from Parse, the copy in the datastore will be automatically updated, so you don't have to worry about it.

### Retrieving Objects from the Local Datastore

Storing an object is only useful if you can get it back out. To get the data for a specific object, you can use a `PFQuery` just like you would while on the network, but using the `fromLocalDatastore` method to tell it where to get the data.

<pre><code class="objectivec">
PFQuery *query = [PFQuery queryWithClassName:@"GameScore"];
[query fromLocalDatastore];
[[query getObjectInBackgroundWithId:@"xWMyZ4YEGZ"] continueWithBlock:^id(BFTask *task) {
  if (task.error) {
    // something went wrong;
    return task;
  }

  // task.result will be your game score
  return task;
}];
</code></pre>

<pre><code class="swift">
let query = PFQuery(className:"GameScore")
query.fromLocalDatastore()
query.getObjectInBackgroundWithId("xWMyZ4YEGZ").continueWithBlock({
  (task: BFTask!) -> AnyObject! in
  if task.error != nil {
      // There was an error.
      return task
  }

  // task.result will be your game score
  return task
})
</code></pre>

If you already have an instance of the object, you can instead use the `fetchFromLocalDatastoreInBackground` method.

<pre><code class="objectivec">
PFObject *object = [PFObject objectWithoutDataWithClassName:@"GameScore" objectId:@"xWMyZ4YEGZ"];
[[object fetchFromLocalDatastoreInBackground] continueWithBlock:^id(BFTask *task) {
  if (task.error) {
    // something went wrong
    return task;
  }

  // task.result will be your game score
  return task;
}];
</code></pre>

<pre><code class="swift">
let object = PFObject(withoutDataWithClassName:"GameScore", objectId:"xWMyZ4YEGZ")
object.fetchFromLocalDatastoreInBackground().continueWithBlock({
  (task: BFTask!) -> AnyObject! in
  if task.error != nil {
      // There was an error.
      return task
  }

  // task.result will be your game score
  return task
})
</code></pre>

### Unpinning Objects

When you are done with the object and no longer need to keep it on the device, you can release it with `unpinInBackground`.

<pre><code class="objectivec">
[gameScore unpinInBackground];
</code></pre>

<pre><code class="swift">
gameScore.unpinInBackground()
</code></pre>

## Saving Objects Offline

Most save functions execute immediately, and inform your app when the save is complete. If you don't need to know when the save has finished, you can use `saveEventually` instead. The advantage is that if the user currently doesn't have a network connection, `saveEventually` will store the update on the device until a network connection is re-established. If your app is closed before the connection is back, Parse will try again the next time the app is opened. All calls to `saveEventually` (and `deleteEventually`) are executed in the order they are called, so it is safe to call `saveEventually` on an object multiple times.

<pre><code class="objectivec">
// Create the object.
PFObject *gameScore = [PFObject objectWithClassName:@"GameScore"];
gameScore[@"score"] = @1337;
gameScore[@"playerName"] = @"Sean Plott";
gameScore[@"cheatMode"] = @NO;
[gameScore saveEventually];
</code></pre>

<pre><code class="swift">
var gameScore = PFObject(className:"GameScore")
gameScore["score"] = 1337
gameScore["playerName"] = "Sean Plott"
gameScore["cheatMode"] = false
gameScore.saveEventually()
</code></pre>

## Updating Objects

Updating an object is simple. Just set some new data on it and call one of the save methods. Assuming you have saved the object and have the `objectId`, you can retrieve the `PFObject` using a `PFQuery` and update its data:

<pre><code class="objectivec">
PFQuery *query = [PFQuery queryWithClassName:@"GameScore"];

// Retrieve the object by id
[query getObjectInBackgroundWithId:@"xWMyZ4YEGZ"
                             block:^(PFObject *gameScore, NSError *error) {
    // Now let's update it with some new data. In this case, only cheatMode and score
    // will get sent to the cloud. playerName hasn't changed.
    gameScore[@"cheatMode"] = @YES;
    gameScore[@"score"] = @1338;
    [gameScore saveInBackground];
}];
</code></pre>

<pre><code class="swift">
var query = PFQuery(className:"GameScore")
query.getObjectInBackgroundWithId("xWMyZEGZ") {
  (gameScore: PFObject?, error: NSError?) -> Void in
  if error != nil {
    print(error)
  } else if let gameScore = gameScore {
    gameScore["cheatMode"] = true
    gameScore["score"] = 1338
    gameScore.saveInBackground()
  }
}
</code></pre>

The client automatically figures out which data has changed so only "dirty" fields will be sent to Parse. You don't need to worry about squashing data that you didn't intend to update.

### Counters

The above example contains a common use case. The "score" field is a counter that we'll need to continually update with the player's latest score. Using the above method works but it's cumbersome and can lead to problems if you have multiple clients trying to update the same counter.

To help with storing counter-type data, Parse provides methods that atomically increment (or decrement) any number field. So, the same update can be rewritten as:

<pre><code class="objectivec">
[gameScore incrementKey:@"score"];
[gameScore saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    // The score key has been incremented
  } else {
    // There was a problem, check error.description
  }
}];
</code></pre>

<pre><code class="swift">
gameScore.incrementKey("score")
gameScore.saveInBackgroundWithBlock {
  (success: Bool, error: NSError?) -> Void in
  if (success) {
    // The score key has been incremented
  } else {
    // There was a problem, check error.description
  }
}
</code></pre>

You can also increment by any amount using `incrementKey:byAmount:`.

### Arrays

To help with storing array data, there are three operations that can be used to atomically change an array field:

*   `addObject:forKey:` and `addObjectsFromArray:forKey:` append the given objects to the end of an array field.
*   `addUniqueObject:forKey:` and `addUniqueObjectsFromArray:forKey:` add only the given objects which aren't already contained in an array field to that field. The position of the insert is not guaranteed.
*   `removeObject:forKey:` and `removeObjectsInArray:forKey:` remove all instances of each given object from an array field.

For example, we can add items to the set-like "skills" field like so:

<pre><code class="objectivec">
[gameScore addUniqueObjectsFromArray:@[@"flying", @"kungfu"] forKey:@"skills"];
[gameScore saveInBackground];
</code></pre>

<pre><code class="swift">
gameScore.addUniqueObjectsFromArray(["flying", "kungfu"], forKey:"skills")
gameScore.saveInBackground()
</code></pre>

Note that it is not currently possible to atomically add and remove items from an array in the same save.
    You will have to call `save` in between every different kind of array operation.

## Deleting Objects

To delete an object from the cloud:

<pre><code class="objectivec">
[gameScore deleteInBackground];
</code></pre>

<pre><code class="swift">
gameScore.deleteInBackground()
</code></pre>

If you want to run a callback when the delete is confirmed, you can use the `deleteInBackgroundWithBlock:` or `deleteInBackgroundWithTarget:selector:` methods. If you want to block the calling thread, you can use the `delete` method.

You can delete a single field from an object with the `removeObjectForKey` method:

<pre><code class="objectivec">
// After this, the playerName field will be empty
[gameScore removeObjectForKey:@"playerName"];

// Saves the field deletion to the Parse Cloud
[gameScore saveInBackground];
</code></pre>

<pre><code class="swift">
// After this, the playerName field will be empty
gameScore.removeObjectForKey("playerName")

// Saves the field deletion to the Parse Cloud
gameScore.saveInBackground()
</code></pre>

## Relational Data

Objects can have relationships with other objects. To model this behavior, any `PFObject` can be used as a value in other `PFObject`s. Internally, the Parse framework will store the referred-to object in just one place, to maintain consistency.

For example, each `Comment` in a blogging app might correspond to one `Post`. To create a new `Post` with a single `Comment`, you could write:

<pre><code class="objectivec">
// Create the post
PFObject *myPost = [PFObject objectWithClassName:@"Post"];
myPost[@"title"] = @"I'm Hungry";
myPost[@"content"] = @"Where should we go for lunch?";

// Create the comment
PFObject *myComment = [PFObject objectWithClassName:@"Comment"];
myComment[@"content"] = @"Let's do Sushirrito.";

// Add a relation between the Post and Comment
myComment[@"parent"] = myPost;

// This will save both myPost and myComment
[myComment saveInBackground];
</code></pre>

<pre><code class="swift">
// Create the post
var myPost = PFObject(className:"Post")
myPost["title"] = "I'm Hungry"
myPost["content"] = "Where should we go for lunch?"

// Create the comment
var myComment = PFObject(className:"Comment")
myComment["content"] = "Let's do Sushirrito."

// Add a relation between the Post and Comment
myComment["parent"] = myPost

// This will save both myPost and myComment
myComment.saveInBackground()
</code></pre>

You can also link objects using just their `objectId`s like so:

<pre><code class="objectivec">
// Add a relation between the Post with objectId "1zEcyElZ80" and the comment
myComment[@"parent"] = [PFObject objectWithoutDataWithClassName:@"Post" objectId:@"1zEcyElZ80"];
</code></pre>

<pre><code class="swift">
// Add a relation between the Post with objectId "1zEcyElZ80" and the comment
myComment["parent"] = PFObject(withoutDataWithClassName:"Post", objectId:"1zEcyElZ80")
</code></pre>

By default, when fetching an object, related `PFObject`s are not fetched.  These objects' values cannot be retrieved until they have been fetched like so:

<pre><code class="objectivec">
PFObject *post = fetchedComment[@"parent"];
[post fetchIfNeededInBackgroundWithBlock:^(PFObject *post, NSError *error) {
  NSString *title = post[@"title"];
  // do something with your title variable
}];
</code></pre>

<pre><code class="swift">
var post = myComment["parent"] as PFObject
post.fetchIfNeededInBackgroundWithBlock {
  (post: PFObject?, error: NSError?) -> Void in
  let title = post?["title"] as? NSString
  // do something with your title variable
}
</code></pre>

You can also model a many-to-many relation using the `PFRelation` object.  This works similar to an `NSArray` of `PFObjects`, except that you don't need to download all the Objects in a relation at once.  This allows `PFRelation` to scale to many more objects than the `NSArray` of `PFObject` approach.  For example, a `User` may have many `Post`s that they might like.  In this case, you can store the set of `Post`s that a `User` likes using `relationForKey:`.  In order to add a post to the list, the code would look something like:

<pre><code class="objectivec">
PFUser *user = [PFUser currentUser];
PFRelation *relation = [user relationForKey:@"likes"];
[relation addObject:post];
[user saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
  if (succeeded) {
    // The post has been added to the user's likes relation.
  } else {
    // There was a problem, check error.description
  }
}];
</code></pre>

<pre><code class="swift">
var user = PFUser.currentUser()
var relation = user.relationForKey("likes")
relation.addObject(post)
user.saveInBackgroundWithBlock {
  (success: Bool, error: NSError?) -> Void in
  if (success) {
    // The post has been added to the user's likes relation.
  } else {
    // There was a problem, check error.description
  }
}
</code></pre>

You can remove a post from the `PFRelation` with something like:

<pre><code class="objectivec">
[relation removeObject:post];
</code></pre>

<pre><code class="swift">
relation.removeObject(post)
</code></pre>

By default, the list of objects in this relation are not downloaded.  You can get the list of `Post`s by using calling `findObjectsInBackgroundWithBlock:` on the `PFQuery` returned by `query`.  The code would look like:

<pre><code class="objectivec">
[[relation query] findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
  if (error) {
     // There was an error
  } else {
    // objects has all the Posts the current user liked.
  }
}];
</code></pre>

<pre><code class="swift">
relation.query().findObjectsInBackgroundWithBlock {
  (objects: [PFObject]?, error: NSError?) -> Void in
  if let error = error {
    // There was an error
  } else {
    // objects has all the Posts the current user liked.
  }
}
</code></pre>

If you want only a subset of the `Post`s you can add extra constraints to the `PFQuery` returned by `query` like this:

<pre><code class="objectivec">
PFQuery *query = [relation query];
// Add other query constraints.
</code></pre>

<pre><code class="swift">
var query = relation.query()
// Add other query constraints.
</code></pre>

For more details on `PFQuery` please look at the query portion of this guide.  A `PFRelation` behaves similar to an `NSArray` of `PFObject`, so any queries you can do on arrays of objects (other than `includeKey:`) you can do on `PFRelation`.

## Data Types

So far we've used values with type `NSString`, `NSNumber`, and `PFObject`. Parse also supports `NSDate`, `NSObject`, `NSArray`, and `NSNull`. You can nest `NSObject` and `NSArray` objects to store more structured data within a single `PFObject`. Overall, the following types are allowed for each field in your object:

* String => `NSString`
* Number => `NSNumber`
* Bool => `NSNumber`
* Array => `NSArray`
* Object => `NSObject`
* Date => `NSDate`
* File => `PFFile`
* Pointer => other `PFObject`
* Relation => `PFRelation`
* Null => `NSNull`

Some examples:

<pre><code class="objectivec">
NSNumber *number = @42;
NSNumber *bool = @NO;
NSString *string = [NSString stringWithFormat:@"the number is %@", number];
NSDate *date = [NSDate date];
NSArray *array = @[string, number];
NSDictionary *dictionary = @{@"number": number, @"string": string};
NSNull *null = [NSNull null];
PFObject *pointer = [PFObject objectWithoutDataWithClassName:@"MyClassName" objectId:@"xyz"];

PFObject *bigObject = [PFObject objectWithClassName:@"BigObject"];
bigObject[@"myNumberKey"] = number;
bigObject[@"myBoolKey"] = bool;
bigObject[@"myStringKey"] = string;
bigObject[@"myDateKey"] = date;
bigObject[@"myArrayKey"] = array;
bigObject[@"myObjectKey"] = dictionary; // shows up as 'object' in the Data Browser
bigObject[@"anyKey"] = null; // this value can only be saved to an existing key
bigObject[@"myPointerKey"] = pointer; // shows up as Pointer MyClassName in the Data Browser
[bigObject saveInBackground];
</code></pre>

<pre><code class="swift">
let number = 42
let bool = false
let string = "the number is \(number)"
let date = NSDate()
let array = [string, number]
let dictionary = ["number": number, "string": string]
let null = NSNull()
let pointer = PFObject(objectWithoutDataWithClassName:"MyClassName", objectId: "xyz")

var bigObject = PFObject(className:"BigObject")
bigObject["myNumberKey"] = number
bigObject["myBooleanKey"] = bool
bigObject["myStringKey"] = string
bigObject["myDateKey"] = date
bigObject["myArrayKey"] = array
bigObject["myObjectKey"] = dictionary // shows up as 'object' in the Data Browser
bigObject["anyKey"] = null // this value can only be saved to an existing key
bigObject["myPointerKey"] = pointer // shows up as Pointer MyClassName in the Data Browser
bigObject.saveInBackground()
</code></pre>

We do not recommend storing large pieces of binary data like images or documents on `PFObject`. `PFObject`s should not exceed 128 kilobytes in size. We recommend you use `PFFile`s to store images, documents, and other types of files. You can do so by instantiating a `PFFile` object and setting it on a field. See [Files](#files) for more details.

For more information about how Parse handles data, check out our documentation on [Data](#data).

## Subclasses

Parse is designed to get you up and running as quickly as possible. You can access all of your data using the `PFObject` class and access any field with `objectForKey:` or the `[]` subscripting operator. In mature codebases, subclasses have many advantages, including terseness, extensibility, and support for autocomplete. Subclassing is completely optional, but can transform this code:

<pre><code class="objectivec">
PFObject *shield = [PFObject objectWithClassName:@"Armor"];
shield[@"displayName"] = @"Wooden Shield";
shield[@"fireProof"] = @NO;
shield[@"rupees"] = @50;
</code></pre>

<pre><code class="swift">
var shield = PFObject(className:"Armor")
shield["displayName"] = "Wooden Shield"
shield["fireProof"] = false
shield["rupees"] = 50
</code></pre>

Into this:

<pre><code class="objectivec">
Armor *shield = [Armor object];
shield.displayName = @"Wooden Shield";
shield.fireProof = NO;
shield.rupees = 50;
</code></pre>

<pre><code class="swift">
var shield = Armor()
shield.displayName = "Wooden Shield"
shield.fireProof = false
shield.rupees = 50
</code></pre>

### Subclassing PFObject

To create a `PFObject` subclass:

1.  Declare a subclass which conforms to the `PFSubclassing` protocol.
2.  Implement the class method `parseClassName`. This is the string you would pass to `initWithClassName:` and makes all future class name references unnecessary.
3.  Import `PFObject+Subclass` in your .m file. This implements all methods in `PFSubclassing` beyond `parseClassName`.
4.  Call `[YourClass registerSubclass]` before Parse `setApplicationId:clientKey:`.

An easy way to do this is with your class' [+load](https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/classes/nsobject_class/reference/reference.html#//apple_ref/occ/clm/NSObject/load) (Obj-C only) or with [initialize](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSObject_Class/#//apple_ref/occ/clm/NSObject/initialize) (both Obj-C and Swift) methods.

Please note that the `initialize` method is not called until the class receives its first message, meaning that you need to call any instance or class method on your subclass before it will be registered with Parse SDK.

The following code successfully declares, implements, and registers the `Armor` subclass of `PFObject`:

<script src="https://gist.github.com/hramos/feb1cfc437f4da2c785b716d3a8f16be.js"></script>

### Properties & Methods

Adding custom properties and methods to your `PFObject` subclass helps encapsulate logic about the class. With `PFSubclassing`, you can keep all your logic about a subject in one place rather than using separate classes for business logic and storage/transmission logic.

`PFObject` supports dynamic synthesizers just like `NSManagedObject`. Declare a property as you normally would, but use `@dynamic` rather than `@synthesize` in your .m file. The following example creates a `displayName` property in the `Armor` class:

<script src="https://gist.github.com/hramos/198b6662312af19b3df32dab6eb75c3d.js"></script>

You can access the displayName property using `armor.displayName` or `[armor displayName]` and assign to it using `armor.displayName = @"Wooden Shield"` or `[armor setDisplayName:@"Wooden Sword"]`. Dynamic properties allow Xcode to provide autocomplete and catch typos.

`NSNumber` properties can be implemented either as `NSNumber`s or as their primitive counterparts. Consider the following example:

<pre><code class="objectivec">
@property BOOL fireProof;
@property int rupees;
</code></pre>

<pre><code class="swift">
@NSManaged var fireProof: Boolean
@NSManaged var rupees: Int
</code></pre>

In this case, `game[@"fireProof"]` will return an `NSNumber` which is accessed using `boolValue` and `game[@"rupees"]` will return an `NSNumber` which is accessed using `intValue`, but the `fireProof` property is an actual `BOOL` and the `rupees` property is an actual `int`. The dynamic getter will automatically extract the `BOOL` or `int` value and the dynamic setter will automatically wrap the value in an `NSNumber`. You are free to use either format. Primitive property types are easier to use but `NSNumber` property types support nil values more clearly.

If you need more complicated logic than simple property access, you can declare your own methods as well:

<pre><code class="objectivec">
@dynamic iconFile;

- (UIImageView *)iconView {
  PFImageView *view = [[PFImageView alloc] initWithImage:kPlaceholderImage];
  view.file = self.iconFile;
  [view loadInBackground];
  return view;
}
</code></pre>

<pre><code class="swift">
@NSManaged var iconFile: PFFile

func iconView() -> UIImageView {
  let view = PFImageView(imageView: PlaceholderImage)
  view.file = iconFile
  view.loadInBackground()
  return view
}
</code></pre>

### Initializing Subclasses

You should create new objects with the `object` class method. This constructs an autoreleased instance of your type and correctly handles further subclassing. To create a reference to an existing object, use `objectWithoutDataWithObjectId:`.

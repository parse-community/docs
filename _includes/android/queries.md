# Queries

We've already seen how a `ParseQuery` with `getInBackground` can retrieve a single `ParseObject` from Parse. There are many other ways to retrieve data with `ParseQuery` - you can retrieve many objects at once, put conditions on the objects you wish to retrieve, cache queries automatically to avoid writing that code yourself, and more.

## Basic Queries

In many cases, `getInBackground` isn't powerful enough to specify which objects you want to retrieve. The `ParseQuery` offers different ways to retrieve a list of objects rather than just a single object.

The general pattern is to create a `ParseQuery`, put conditions on it, and then retrieve a `List` of matching `ParseObject`s using the `findInBackground` method with a `FindCallback`. For example, to retrieve scores with a particular `playerName`, use the `whereEqualTo` method to constrain the value for a key:

<pre><code class="java">
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.whereEqualTo("playerName", "Dan Stemkoski");
query.findInBackground(new FindCallback<ParseObject>() {
    public void done(List<ParseObject> scoreList, ParseException e) {
        if (e == null) {
            Log.d("score", "Retrieved " + scoreList.size() + " scores");
        } else {
            Log.d("score", "Error: " + e.getMessage());
        }
    }
});
</code></pre>

`findInBackground` works similarly to `getInBackground` in that it assures the network request is done on a background thread, and runs its callback in the main thread.

## Query Constraints

There are several ways to put constraints on the objects found by a `ParseQuery`. You can filter out objects with a particular key-value pair with `whereNotEqualTo`:

<pre><code class="java">
query.whereNotEqualTo("playerName", "Michael Yabuti");
</code></pre>

You can give multiple constraints, and objects will only be in the results if they match all of the constraints.  In other words, it's like an AND of constraints.

<pre><code class="java">
query.whereNotEqualTo("playerName", "Michael Yabuti");
query.whereGreaterThan("playerAge", 18);
</code></pre>

You can limit the number of results with `setLimit`. By default, results are limited to 100, but anything from 1 to 1000 is a valid limit:

<pre><code class="java">
query.setLimit(10); // limit to at most 10 results
</code></pre>

If you want exactly one result, a more convenient alternative may be to use `getFirst` or `getFirstBackground` instead of using `find`.

<pre><code class="java">
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.whereEqualTo("playerEmail", "dstemkoski@example.com");
query.getFirstInBackground(new GetCallback<ParseObject>() {
  public void done(ParseObject object, ParseException e) {
    if (object == null) {
      Log.d("score", "The getFirst request failed.");
    } else {
      Log.d("score", "Retrieved the object.");
    }
  }
});
</code></pre>

You can skip the first results with `setSkip`. This can be useful for pagination:

<pre><code class="java">
query.setSkip(10); // skip the first 10 results
</code></pre>

For sortable types like numbers and strings, you can control the order in which results are returned:

<pre><code class="java">
// Sorts the results in ascending order by the score field
query.orderByAscending("score");

// Sorts the results in descending order by the score field
query.orderByDescending("score");
</code></pre>

You can add more sort keys to the query as follows:

<pre><code class="java">
// Sorts the results in ascending order by the score field if the previous sort keys are equal.
query.addAscendingOrder("score");

// Sorts the results in descending order by the score field if the previous sort keys are equal.
query.addDescendingOrder("score");
</code></pre>

For sortable types, you can also use comparisons in queries:

<pre><code class="java">
// Restricts to wins < 50
query.whereLessThan("wins", 50);

// Restricts to wins <= 50
query.whereLessThanOrEqualTo("wins", 50);

// Restricts to wins > 50
query.whereGreaterThan("wins", 50);

// Restricts to wins >= 50
query.whereGreaterThanOrEqualTo("wins", 50);
</code></pre>

If you want to retrieve objects matching several different values, you can use `whereContainedIn`, providing a collection of acceptable values. This is often useful to replace multiple queries with a single query. For example, if you want to retrieve scores made by any player in a particular list:

<pre><code class="java">
String[] names = {"Jonathan Walsh", "Dario Wunsch", "Shawn Simon"};
query.whereContainedIn("playerName", Arrays.asList(names));
</code></pre>

If you want to retrieve objects that do not match any of several values you can use `whereNotContainedIn`, providing an array of acceptable values.  For example, if you want to retrieve scores from players besides those in a list:

<pre><code class="java">
String[] names = {"Jonathan Walsh", "Dario Wunsch", "Shawn Simon"};
query.whereNotContainedIn("playerName", Arrays.asList(names));
</code></pre>

If you want to retrieve objects that have a particular key set, you can use `whereExists`. Conversely, if you want to retrieve objects without a particular key set, you can use `whereDoesNotExist`.

<pre><code class="java">
// Finds objects that have the score set
query.whereExists("score");

// Finds objects that don't have the score set
query.whereDoesNotExist("score");
</code></pre>

You can use the `whereMatchesKeyInQuery` method to get objects where a key matches the value of a key in a set of objects resulting from another query.  For example, if you have a class containing sports teams and you store a user's hometown in the user class, you can issue one query to find the list of users whose hometown teams have winning records.  The query would look like:

<pre><code class="java">
ParseQuery<ParseObject> teamQuery = ParseQuery.getQuery("Team");
teamQuery.whereGreaterThan("winPct", 0.5);
ParseQuery<ParseUser> userQuery = ParseUser.getQuery();
userQuery.whereMatchesKeyInQuery("hometown", "city", teamQuery);
userQuery.findInBackground(new FindCallback<ParseUser>() {
  void done(List<ParseUser> results, ParseException e) {
    // results has the list of users with a hometown team with a winning record
  }
});
</code></pre>

Conversely, to get objects where a key does not match the value of a key in a set of objects resulting from another query, use `whereDoesNotMatchKeyInQuery`. For example, to find users whose hometown teams have losing records:

<pre><code class="java">
ParseQuery<ParseUser> losingUserQuery = ParseUser.getQuery();
losingUserQuery.whereDoesNotMatchKeyInQuery("hometown", "city", teamQuery);
losingUserQuery.findInBackground(new FindCallback<ParseUser>() {
  void done(List<ParseUser> results, ParseException e) {
    // results has the list of users with a hometown team with a losing record
  }
});
</code></pre>

You can restrict the fields returned by calling `selectKeys` with a collection of keys. To retrieve documents that contain only the `score` and `playerName` fields (and also special built-in fields such as `objectId`, `createdAt`, and `updatedAt`):

<pre><code class="java">
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.selectKeys(Arrays.asList("playerName", "score"));;
List<ParseObject> results = query.find();
</code></pre>

The remaining fields can be fetched later by calling one of the `fetchIfNeeded` variants on the returned objects:

<pre><code class="java">
ParseObject object = results.get(0);
object.fetchIfNeededInBackground(new GetCallback<ParseObject>() {
  public void done(ParseObject object, ParseException e) {
    // all fields of the object will now be available here.
  }
});
</code></pre>

## Queries on Array Values

If a key contains an array value, you can search for objects where the key's array value contains 2 by:

<pre><code class="java">
// Find objects where the array in arrayKey contains the number 2.
query.whereEqualTo("arrayKey", 2);
</code></pre>

You can also search for objects where the key's array value contains each of the values 2, 3, and 4 with the following:

<pre><code class="java">
// Find objects where the array in arrayKey contains all of the numbers 2, 3, and 4.
ArrayList<Integer> numbers = new ArrayList<Integer>();
numbers.add(2);
numbers.add(3);
numbers.add(4);
query.whereContainsAll("arrayKey", numbers);
</code></pre>

## Queries on String Values

<div class='tip info'><div>
  If you're trying to implement a generic search feature, we recommend taking a look at this blog post: <a href='http://blog.parse.com/learn/engineering/implementing-scalable-search-on-a-nosql-backend/'>Implementing Scalable Search on a NoSQL Backend</a>.
</div></div>

Use `whereStartsWith` to restrict to string values that start with a particular string. Similar to a MySQL LIKE operator, this is indexed so it is efficient for large datasets:

<pre><code class="java">
// Finds barbecue sauces that start with 'Big Daddy's'.
ParseQuery<ParseObject> query = ParseQuery.getQuery("BarbecueSauce");
query.whereStartsWith("name", "Big Daddy's");
</code></pre>

The above example will match any `BarbecueSauce` objects where the value in the "name" String key starts with "Big Daddy's". For example, both "Big Daddy's" and "Big Daddy's BBQ" will match, but "big daddy's" or "BBQ Sauce: Big Daddy's" will not.

Queries that have regular expression constraints are very expensive. Refer to the [Performance Guide](#performance-regular-expressions) for more details.


## Relational Queries

There are several ways to issue queries for relational data. If you want to retrieve objects where a field matches a particular `ParseObject`, you can use `whereEqualTo` just like for other data types. For example, if each `Comment` has a `Post` object in its `post` field, you can fetch comments for a particular `Post`:

<pre><code class="java">
// Assume ParseObject myPost was previously created.
ParseQuery<ParseObject> query = ParseQuery.getQuery("Comment");
query.whereEqualTo("post", myPost);

query.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> commentList, ParseException e) {
    // commentList now has the comments for myPost
  }
});
</code></pre>

If you want to retrieve objects where a field contains a `ParseObject` that matches a different query, you can use `whereMatchesQuery`. Note that the default limit of 100 and maximum limit of 1000 apply to the inner query as well, so with large data sets you may need to construct queries carefully to get the desired behavior. In order to find comments for posts containing images, you can do:

<pre><code class="java">
ParseQuery<ParseObject> innerQuery = ParseQuery.getQuery("Post");
innerQuery.whereExists("image");
ParseQuery<ParseObject> query = ParseQuery.getQuery("Comment");
query.whereMatchesQuery("post", innerQuery);
query.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> commentList, ParseException e) {
    // comments now contains the comments for posts with images.
  }
});
</code></pre>

If you want to retrieve objects where a field contains a `ParseObject` that does not match a different query, you can use `whereDoesNotMatchQuery`. In order to find comments for posts without images, you can do:

<pre><code class="java">
ParseQuery<ParseObject> innerQuery = ParseQuery.getQuery("Post");
innerQuery.whereExists("image");
ParseQuery<ParseObject> query = ParseQuery.getQuery("Comment");
query.whereDoesNotMatchQuery("post", innerQuery);
query.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> commentList, ParseException e) {
    // comments now contains the comments for posts without images.
  }
});
</code></pre>

In some situations, you want to return multiple types of related objects in one query. You can do this with the `include` method. For example, let's say you are retrieving the last ten comments, and you want to retrieve their related posts at the same time:

<pre><code class="java">
ParseQuery<ParseObject> query = ParseQuery.getQuery("Comment");

// Retrieve the most recent ones
query.orderByDescending("createdAt");

// Only retrieve the last ten
query.setLimit(10);

// Include the post data with each comment
query.include("post");

query.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> commentList, ParseException e) {
    // commentList now contains the last ten comments, and the "post"
    // field has been populated. For example:
    for (ParseObject comment : commentList) {
      // This does not require a network access.
      ParseObject post = comment.getParseObject("post");
      Log.d("post", "retrieved a related post");
    }
  }
});
</code></pre>

You can also do multi level includes using dot notation.  If you wanted to include the post for a comment and the post's author as well you can do:

<pre><code class="java">
query.include("post.author");
</code></pre>

You can issue a query with multiple fields included by calling `include` multiple times. This functionality also works with ParseQuery helpers like `getFirst()` and `getInBackground()`.

## Querying the Local Datastore

If you have enabled the local datastore by calling `Parse.enableLocalDatastore()` before your call to `Parse.initialize()`, then you can also query against the objects stored locally on the device. To do this, call the `fromLocalDatastore` method on the query.

<pre><code class="java">
query.fromLocalDatastore();
query.findInBackground(new FindCallback<ParseObject>() {
  public void done(final List<ParseObject> scoreList, ParseException e) {
    if (e == null) {
      // Results were successfully found from the local datastore.
    } else {
      // There was an error.
    }
  }
});
</code></pre>

You can query from the local datastore using exactly the same kinds of queries you use over the network. The results will include every object that matches the query that's been pinned to your device. The query even takes into account any changes you've made to the object that haven't yet been saved to the cloud. For example, if you call `deleteEventually`, on an object, it will no longer be returned from these queries.

## Caching Queries

It's often useful to cache the result of a query on a device. This lets you show data when the user's device is offline, or when the app has just started and network requests have not yet had time to complete. The easiest way to do this is with the local datastore. When you pin objects, you can attach a label to the pin, which lets you manage a group of objects together. For example, to cache the results of the query above, you can call `pinAllInBackground` and give it a label.

<pre><code class="java">
final String TOP_SCORES_LABEL = "topScores";

// Query for the latest objects from Parse.
query.findInBackground(new FindCallback<ParseObject>() {
  public void done(final List<ParseObject> scoreList, ParseException e) {
    if (e != null) {
      // There was an error or the network wasn't available.
      return;
    }

    // Release any objects previously pinned for this query.
    ParseObject.unpinAllInBackground(TOP_SCORES_LABEL, scoreList, new DeleteCallback() {
      public void done(ParseException e) {
        if (e != null) {
          // There was some error.
          return;
        }

        // Add the latest results for this query to the cache.
        ParseObject.pinAllInBackground(TOP_SCORES_LABEL, scoreList);
      }
    });
  }
});
</code></pre>

Now when you do any query with `fromLocalDatastore`, these objects will be included in the results if they still match the query.

If you aren't using the local datastore, you can use the per-query cache for `ParseQuery` instead. The default query behavior doesn't use the cache, but you can enable caching with `setCachePolicy`. For example, to try the network and then fall back to cached data if the network is not available:

<pre><code class="java">
query.setCachePolicy(ParseQuery.CachePolicy.NETWORK_ELSE_CACHE);
query.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> scoreList, ParseException e) {
    if (e == null) {
      // Results were successfully found, looking first on the
      // network and then on disk.
    } else {
      // The network was inaccessible and we have no cached data
      // for this query.
    }
  }
});
</code></pre>

Parse provides several different cache policies:

*   `IGNORE_CACHE`: The query does not load from the cache or save results to the cache. `IGNORE_CACHE` is the default cache policy.
*   `CACHE_ONLY`: The query only loads from the cache, ignoring the network. If there are no cached results, that causes a `ParseException`.
*   `NETWORK_ONLY`: The query does not load from the cache, but it will save results to the cache.
*   `CACHE_ELSE_NETWORK`: The query first tries to load from the cache, but if that fails, it loads results from the network. If neither cache nor network succeed, there is a `ParseException`.
*   `NETWORK_ELSE_CACHE`: The query first tries to load from the network, but if that fails, it loads results from the cache. If neither network nor cache succeed, there is a `ParseException`.
*   `CACHE_THEN_NETWORK`: The query first loads from the cache, then loads from the network. In this case, the `FindCallback` will actually be called twice - first with the cached results, then with the network results. This cache policy can only be used asynchronously with `findInBackground`.

If you need to control the cache's behavior, you can use methods provided in ParseQuery to interact with the cache.  You can do the following operations on the cache:

*   Check to see if there is a cached result for the query with:
<pre><code class="java">
boolean isInCache = query.hasCachedResult();
</code></pre>
*   Remove any cached results for a query with:
<pre><code class="java">
query.clearCachedResult();
</code></pre>
*   Remove cached results for all queries with:
<pre><code class="java">
ParseQuery.clearAllCachedResults();
</code></pre>

Query caching also works with ParseQuery helpers including `getFirst()` and `getInBackground()`.

## Counting Objects

Caveat: Count queries are rate limited to a maximum of 160 requests per minute.  They can also return inaccurate results for classes with more than 1,000 objects.  Thus, it is preferable to architect your application to avoid this sort of count operation (by using counters, for example.)

If you just need to count how many objects match a query, but you do not need to retrieve all the objects that match, you can use `count` instead of `find`. For example, to count how many games have been played by a particular player:

<pre><code class="java">
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.whereEqualTo("playerName", "Sean Plott");
query.countInBackground(new CountCallback() {
  public void done(int count, ParseException e) {
    if (e == null) {
      // The count request succeeded. Log the count
      Log.d("score", "Sean has played " + count + " games");
    } else {
      // The request failed
    }
  }
});
</code></pre>

If you want to block the calling thread, you can also use the synchronous `query.count()` method.

## Compound Queries

If you want to find objects that match one of several queries, you can use `ParseQuery.or` method to construct a query that is an or of the queries passed in.  For instance if you want to find players who either have a lot of wins or a few wins, you can do:

<pre><code class="java">
ParseQuery<ParseObject> lotsOfWins = ParseQuery.getQuery("Player");
lotsOfWins.whereGreaterThan(150);

ParseQuery<ParseObject> fewWins = ParseQuery.getQuery("Player");
fewWins.whereLessThan(5);

List<ParseQuery<ParseObject>> queries = new ArrayList<ParseQuery<ParseObject>>();
queries.add(lotsOfWins);
queries.add(fewWins);

ParseQuery<ParseObject> mainQuery = ParseQuery.or(queries);
mainQuery.findInBackground(new FindCallback<ParseObject>() {
  public void done(List<ParseObject> results, ParseException e) {
    // results has the list of players that win a lot or haven't won much.
  }
});
</code></pre>

You can add additional constraints to the newly created `ParseQuery` that act as an 'and' operator.

Note that we do not, however, support GeoPoint or non-filtering constraints (e.g. `whereNear`, `withinGeoBox`, `setLimit`, `skip`, `orderBy...`, `include`) in the subqueries of the compound query.

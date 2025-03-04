# Queries

We've already seen how to use `ParseQuery<T>` with `GetAsync()` to retrieve a single `ParseObject` by its `objectId`.  `ParseQuery` offers much more powerful ways to retrieve data. You can retrieve multiple objects, filter results based on conditions, and more.

## Basic Queries

`GetAsync()` is limited (Well, "Simplified").  `ParseQuery<T>` lets you retrieve lists of objects based on criteria.

The general pattern is:

1.  Create a `ParseQuery<T>` (where `T` is `ParseObject` or your subclass).
2.  Add constraints (filters, limits, ordering).
3.  Retrieve matching objects using `FindAsync()`, which returns an `IEnumerable<T>`.

While `ParseQuery<T>` supports a method-based (fluent) syntax, we strongly recommend using LINQ for its expressiveness and type safety.

Example: Retrieve scores for a specific player:

```csharp
// Using LINQ (Recommended)
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore") // Use ParseClient.Instance
            where gameScore.Get<string>("playerName") == "Dan Stemkoski"
            select gameScore;
IEnumerable<ParseObject> results = await query.FindAsync();

// Using the fluent syntax (less recommended)
var query = ParseClient.Instance.GetQuery("GameScore") // Use ParseClient.Instance
    .WhereEqualTo("playerName", "Dan Stemkoski");
IEnumerable<ParseObject> results = await query.FindAsync();
```
If you use subclasses.
```csharp
//If you use subclasses
var query = from gameScore in ParseClient.Instance.GetQuery<GameScore>() // Use ParseClient.Instance
            where gameScore.PlayerName == "Dan Stemkoski"
            select gameScore;
IEnumerable<GameScore> results = await query.FindAsync();
```

## Query Constraints

You can add constraints to filter the objects returned.

**Filtering by Value:**

```csharp
// LINQ (Recommended)
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            where gameScore.Get<string>("playerName") != "Michael Yabuti"
            select gameScore;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereNotEqualTo("playerName", "Michael Yabuti");
```

**Multiple Constraints (AND):**

Multiple constraints act as an "AND" – objects must match *all* constraints.

```csharp
// LINQ (Recommended) - Equivalent ways to express the same query
var query1 = from gameScore in ParseClient.Instance.GetQuery("GameScore")
             where gameScore.Get<string>("playerName") != "Michael Yabuti"
             where gameScore.Get<int>("playerAge") > 18
             select gameScore;

var query2 = from gameScore in ParseClient.Instance.GetQuery("GameScore")
             where gameScore.Get<string>("playerName") != "Michael Yabuti"
                 && gameScore.Get<int>("playerAge") > 18
             select gameScore;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereNotEqualTo("playerName", "Michael Yabuti")
    .WhereGreaterThan("playerAge", 18);
```

**Limiting Results (`Limit`):**

```csharp
query = query.Limit(10); // Limit to at most 10 results.  Default is 100. No maximum.
```

**Getting a Single Result (`FirstAsync`, `FirstOrDefaultAsync`):**

For a single result, use `FirstAsync()` or `FirstOrDefaultAsync()` instead of `FindAsync()`:

```csharp
// LINQ
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            where gameScore.Get<string>("playerEmail") == "dstemkoski@example.com"
            select gameScore;
ParseObject obj = await query.FirstAsync(); // Throws if no results.
// Or:
ParseObject objOrNull = await query.FirstOrDefaultAsync(); // Returns null if no results.

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereEqualTo("playerEmail", "dstemkoski@example.com");
ParseObject obj = await query.FirstAsync(); // Throws if no results.
```

**Pagination (`Skip`):**

```csharp
query = query.Skip(10); // Skip the first 10 results.  No Maximum.
```

**Ordering Results (`OrderBy`, `OrderByDescending`, `ThenBy`, `ThenByDescending`):**

```csharp
// LINQ (Recommended)
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            orderby gameScore.Get<int>("score") ascending, gameScore.Get<string>("playerName") descending
            select gameScore;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .OrderBy("score")         // Ascending by score
    .ThenByDescending("playerName"); // Then descending by playerName
```

**Comparison Operators (`>`, `>=`, `<`, `<=`)**:

```csharp
// LINQ (Recommended)
query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
        where gameScore.Get<int>("wins") < 50
        select gameScore;

// Fluent Syntax
query = ParseClient.Instance.GetQuery("GameScore")
    .WhereLessThan("wins", 50); // Other methods: WhereLessThanOrEqualTo, WhereGreaterThan, WhereGreaterThanOrEqualTo
```

**Multiple Values (`WhereContainedIn`, `WhereNotContainedIn`, `Contains`, `!Contains`):**

```csharp
// LINQ (Recommended)
var names = new[] { "Jonathan Walsh", "Dario Wunsch", "Shawn Simon" };
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            where names.Contains(gameScore.Get<string>("playerName"))  // Contains
            select gameScore;

// Fluent Syntax
var names = new[] { "Jonathan Walsh", "Dario Wunsch", "Shawn Simon" };
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereContainedIn("playerName", names); // WhereContainedIn

// For NOT contained in:
var queryNotIn = from gameScore in ParseClient.Instance.GetQuery("GameScore")
                  where !names.Contains(gameScore.Get<string>("playerName")) // !Contains
                  select gameScore;

var queryNotInFluent = ParseClient.Instance.GetQuery("GameScore")
    .WhereNotContainedIn("playerName", names); //WhereNotContainedIn
```

**Checking for Key Existence (`ContainsKey`, `!ContainsKey`, `WhereExists`, `WhereDoesNotExist`):**

```csharp
// LINQ (Recommended)
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            where gameScore.ContainsKey("score") // Key exists
            select gameScore;

var queryNotExists = from gameScore in ParseClient.Instance.GetQuery("GameScore")
                    where !gameScore.ContainsKey("score") // Key does NOT exist
                    select gameScore;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereExists("score"); // Key exists

var queryNotExists = ParseClient.Instance.GetQuery("GameScore")
    .WhereDoesNotExist("score"); // Key does NOT exist
```

**Matching Keys in Related Queries (`WhereMatchesKeyInQuery`, `join`):**

Find users whose hometown teams have winning records:

```csharp
// LINQ (Recommended)
var teamQuery = from team in ParseClient.Instance.GetQuery("Team")
                where team.Get<double>("winPct") > 0.5
                select team;
var userQuery = from user in ParseClient.Instance.GetQuery<ParseUser>() // Use ParseUser.Query for users
                join team in teamQuery on user.Get<string>("hometown") equals team.Get<string>("city")
                select user;
IEnumerable<ParseUser> results = await userQuery.FindAsync();

// Fluent Syntax
var teamQuery = ParseClient.Instance.GetQuery("Team")
    .WhereGreaterThan("winPct", 0.5);
var userQuery = ParseClient.Instance.GetQuery<ParseUser>() // Use ParseUser.Query
    .WhereMatchesKeyInQuery("hometown", "city", teamQuery);
IEnumerable<ParseUser> results = await userQuery.FindAsync();
```

## Queries on List Values

To find objects where a list field contains a specific value:

```csharp
// LINQ
var query = from obj in ParseClient.Instance.GetQuery("MyClass")
            where obj.Get<IList<int>>("listKey").Contains(2)
            select obj;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("MyClass")
    .WhereEqualTo("listKey", 2); // Note: This works for *exact* element matching within the list.
```

## Queries on String Values

**`StartsWith` (Indexed, Efficient):**

```csharp
// LINQ (Recommended)
var query = from sauce in ParseClient.Instance.GetQuery("BarbecueSauce")
            where sauce.Get<string>("name").StartsWith("Big Daddy's")
            select sauce;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("BarbecueSauce")
    .WhereStartsWith("name", "Big Daddy's");
```

This matches "Big Daddy's" and "Big Daddy's BBQ" but *not* "big daddy's" (case-sensitive) or "BBQ Sauce: Big Daddy's".

**Regular Expressions (Expensive):**  Avoid regular expression queries if possible, as they are very slow. See the Performance Guide for details.

## Relational Queries

**Querying for Related Objects (`WhereEqualTo`, `==`):**

```csharp
// Assuming myPost is an existing ParseObject
// LINQ
var query = from comment in ParseClient.Instance.GetQuery("Comment")
            where comment.Get<ParseObject>("post") == myPost // Use Get<ParseObject> for pointers
            select comment;

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("Comment")
    .WhereEqualTo("post", myPost);

// Querying by objectId:
var queryById = from comment in ParseClient.Instance.GetQuery("Comment")
                where comment.Get<ParseObject>("post").ObjectId == "1zEcyElZ80" //compare objectId
                select comment;

// Fluent
 var queryByIdFluent = ParseClient.Instance.GetQuery("Comment")
     .WhereEqualTo("post", ParseClient.Instance.CreateWithoutData("Post", "1zEcyElZ80"));
```

**Matching a Subquery (`WhereMatchesQuery`, `join`):**

Find comments for posts that have images:

```csharp
// LINQ (Recommended)
var imagePosts = from post in ParseClient.Instance.GetQuery("Post")
                 where post.ContainsKey("image")
                 select post;
var query = from comment in ParseClient.Instance.GetQuery("Comment")
            join post in imagePosts on comment.Get<ParseObject>("post") equals post // Use Get<ParseObject>
            select comment;

// Fluent Syntax
var imagePosts = ParseClient.Instance.GetQuery("Post")
    .WhereExists("image");
var query = ParseClient.Instance.GetQuery("Comment")
    .WhereMatchesQuery("post", imagePosts);
```

**Not Matching a Subquery (`WhereDoesNotMatchQuery`):**

Find comments for posts *without* images:

```csharp
// Fluent Syntax (LINQ equivalent is more complex and less readable)
var imagePosts = ParseClient.Instance.GetQuery("Post")
    .WhereExists("image");
var query = ParseClient.Instance.GetQuery("Comment")
    .WhereDoesNotMatchQuery("post", imagePosts);
```

**Including Related Objects (`Include`):**

Retrieve comments and their related posts in a single query:

```csharp
// LINQ (Recommended)
var query = from comment in ParseClient.Instance.GetQuery("Comment")
            orderby comment.CreatedAt descending
            select comment;

query = query.Take(10);  // Limit to 10 results (Take is equivalent to Limit)
query = query.Include(x => x.Get<ParseObject>("post")); // Include the "post" object.

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("Comment")
    .OrderByDescending("createdAt")
    .Limit(10)
    .Include("post");

var comments = await query.FindAsync();

foreach (var comment in comments)
{
    // Access the related post without another network request:
    var post = comment.Get<ParseObject>("post");
    Console.WriteLine("Post title: " + post.Get<string>("title")); // Use Get<string>
}
```

**Multi-Level Include:**

```csharp
query = query.Include(x => x.Get<ParseObject>("post").Get<ParseUser>("author")); // Include post and post's author
//or
query = query.Include("post.author");
```

You can call `Include` multiple times to include multiple fields.

## Counting Objects (`CountAsync`)

To get the *number* of matching objects without retrieving the objects themselves:

```csharp
// LINQ
var query = from gameScore in ParseClient.Instance.GetQuery("GameScore")
            where gameScore.Get<string>("playerName") == "Sean Plott"
            select gameScore;
var count = await query.CountAsync();

// Fluent Syntax
var query = ParseClient.Instance.GetQuery("GameScore")
    .WhereEqualTo("playerName", "Sean Plott");
var count = await query.CountAsync();
```
`CountAsync` queries are no longer rate limited and do not have the 1,000 object limitation of the old Parse hosted backend.

## Compound Queries (`Or`)

Combine multiple queries with a logical OR:

```csharp
// LINQ (Recommended) -  More complex, fluent syntax is generally preferred for this.
var lotsOfWins = from player in ParseClient.Instance.GetQuery("Player")
                 where player.Get<int>("wins") > 150
                 select player;

var fewWins = from player in ParseClient.Instance.GetQuery("Player")
              where player.Get<int>("wins") < 5
              select player;

var combinedQuery = lotsOfWins.Or(fewWins);
var results = await combinedQuery.FindAsync(); // Players with many OR few wins

// Fluent Syntax (Generally preferred for compound queries)
var lotsOfWins = ParseClient.Instance.GetQuery("Player")
    .WhereGreaterThan("wins", 150);

var fewWins = ParseClient.Instance.GetQuery("Player")
    .WhereLessThan("wins", 5);

ParseQuery<ParseObject> query = lotsOfWins.Or(fewWins);
var results = await query.FindAsync();
```

**Limitations of Compound Queries:**

*   You *cannot* use GeoPoint or non-filtering constraints (`Near`, `WhereWithinGeoBox`, `Limit`, `Skip`, `OrderBy`, `Include`) in the subqueries of a compound `Or` query.
* The newly created `ParseQuery`, however, can have other constraints added.

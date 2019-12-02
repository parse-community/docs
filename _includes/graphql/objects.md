# Create your first Object

## Creating Objects

For each class of your application's schema, Parse Server **automatically** generates a custom mutation for creating this class' objects through the **GraphQL API**.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `createGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation createAGameScore {
  createGameScore(
    input: {
      clientMutationId: "anUniqueId"
      fields: { 
        playerName: "Sean Plott",
        score: 1337,
        cheatMode: false
      }
    }
  ) {
    clientMutationId
    gameScore {
      id
      updatedAt
      createdAt
      playerName
      score
      cheatMode
      ACL {
        public {
          write
          read
        }
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "createGameScore": {
      "clientMutationId": "anUniqueId",
      "gameScore": {
        "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
        "updatedAt": "2019-12-02T10:14:28.786Z",
        "createdAt": "2019-12-02T10:14:28.786Z",
        "playerName": "Sean Plott",
        "score": 1337,
        "cheatMode": false,
        "ACL": {
          "public": {
            "write": true,
            "read": true
          }
        }
      }
    }
  }
}
```

**Note:** The `id` is [Relay Global Object Identification](https://facebook.github.io/relay/graphql/objectidentification.htm), it's **NOT** a Parse `objectId`. Most of the time the `Relay Node Id` is a `Base64` of the `ParseClass` and the `objectId`.

## Getting an Object

For each class of your application's schema, Parse Server automatically generates a custom query for getting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query getAGameScore {
  gameScore(id: "R2FtZVNjb3JlOjZtdGlNcmtXNnY=") {
    id
    score
    playerName
    score
    cheatMode
    ACL {
      public {
        read
        write
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScore": {
      "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
      "score": 1337,
      "playerName": "Sean Plott",
      "cheatMode": false,
      "ACL": {
        "public": {
          "read": true,
          "write": true
        }
      }
    }
  }
}
```

## Getting an Object with Node Relay

With the **Relay** specification you have also the choice to use [GraphQL Fragments](https://graphql.org/learn/queries/#fragments) through the `node` GraphQL Query. For a `GameScore` object the following query will do the job.

```graphql
query getGameScoreWithNodeRelay {
  node(id: "R2FtZVNjb3JlOjZtdGlNcmtXNnY") {
    id
    __typename
    ... on GameScore {
      playerName
      score
      cheatMode
    }
  }
}
```

```json
{
  "data": {
    "node": {
      "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
      "__typename": "GameScore",
      "playerName": "Sean Plott",
      "score": 1337,
      "cheatMode": false
    }
  }
}
```

Here using `Node Relay` is useful for writing generic requests for your front end components. For example:
Assuming we already have a `User` with a `Relay Node Id: X1VzZXI6Q1lMeWJYMjFjcw==` and `username: "johndoe"`

```graphql
query genericGet {
  node(id: "X1VzZXI6Q1lMeWJYMjFjcw==") {
    id
    __typename
    ... on User {
      id
      username
    }
    ... on GameScore {
      playerName
      score
      cheatMode
    }
  }
}
```

```json
{
  "data": {
    "node": {
      "id": "X1VzZXI6Q1lMeWJYMjFjcw==",
      "__typename": "User",
      "username": "johndoe"
    }
  }
}
```
## Finding Objects

For each class of your application's schema, Parse Server automatically generates a custom query for finding this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScores`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query getSomeGameScores{
  gameScores {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    count
    edges {
      cursor
      node {
        id
        playerName
        score
        cheatMode
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScores": {
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
        "endCursor": "YXJyYXljb25uZWN0aW9uOjI="
      },
      "count": 3,
      "edges": [
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "node": {
            "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
            "playerName": "Sean Plott",
            "score": 1337,
            "cheatMode": false
          }
        },
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjE=",
          "node": {
            "id": "R2FtZVNjb3JlOnp2cHdTYXlmYnA=",
            "playerName": "John Doe",
            "score": 13,
            "cheatMode": true
          }
        },
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjI=",
          "node": {
            "id": "R2FtZVNjb3JlOjNmWjBoQVJDVU0=",
            "playerName": "Steve Jordan",
            "score": 134,
            "cheatMode": false
          }
        }
      ]
    }
  }
}
```

### Constraints

You can use the `where` argument to add constraints to a class find query. See the example below:

```graphql
query getSomeGameScores {
  gameScores(where: { score: { greaterThan: 158 } }) {
    count
    edges {
      cursor
      node {
        id
        playerName
        score
        cheatMode
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScores": {
      "count": 1,
      "edges": [
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "node": {
            "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
            "playerName": "Sean Plott",
            "score": 1337,
            "cheatMode": false
          }
        }
      ]
    }
  }
}
```

### Order

You can use the `order` argument to select in which order the results should show up in a class find query. See the example below:

```graphql
query getSomeGameScores {
  gameScores(where: { cheatMode: { equalTo: false } }, order: score_ASC) {
    count
    edges {
      cursor
      node {
        id
        playerName
        score
        cheatMode
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScores": {
      "count": 2,
      "edges": [
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "node": {
            "id": "R2FtZVNjb3JlOjNmWjBoQVJDVU0=",
            "playerName": "Steve Jordan",
            "score": 134,
            "cheatMode": false
          }
        },
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjE=",
          "node": {
            "id": "R2FtZVNjb3JlOjZtdGlNcmtXNnY=",
            "playerName": "Sean Plott",
            "score": 1337,
            "cheatMode": false
          }
        }
      ]
    }
  }
}
```

### Pagination: Cursor, Skip, First, Last, Before, After

[Relay Node Cursor](https://facebook.github.io/relay/graphql/connections.htm) provide a simple way to get an efficient and easy to use pagination into your app.

With Relay you can build flexible pagination based on cursors here it's the main effect of each argument:
* `skip`: A regular skip to exlude some results
* `first`: Similar as a `limit` parameter but ask server to start from first result, ex: `first: 10` retreive first 10 results
* `last`: Retrieve the last results, ex: `last: 10` retrieve the 10 last resutls
* `before`: Get objects before the provided `Cursor`, in combinatin with `after` it's allow you to build inverted pagination
* `after`: Get objects after the provided `Cursor`, in combination with `first` you get a classic pagination similar to `skip & limit`

You can combine multi parameters like: `before & last`, `after & first`

Assuming we have an old object with`cursor: YXJyYXljb25uZWN0aW9uOjE` (`cursor` is different of `id`, it's a temporary pagination Id for the query)

```graphql
query getSomeGameScores {
  gameScores(after: "YXJyYXljb25uZWN0aW9uOjE") {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    count
    edges {
      cursor
      node {
        id
        playerName
        score
        cheatMode
      }
    }
  }
}
```

```json
{
  "data": {
    "gameScores": {
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": true,
        "startCursor": "YXJyYXljb25uZWN0aW9uOjI=",
        "endCursor": "YXJyYXljb25uZWN0aW9uOjI="
      },
      "count": 3,
      "edges": [
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjI=",
          "node": {
            "id": "R2FtZVNjb3JlOjNmWjBoQVJDVU0=",
            "playerName": "Steve Jordan",
            "score": 134,
            "cheatMode": false
          }
        }
      ]
    }
  }
}
```

**Note**: `count` is a global count for available results. It's not the number of edges returned by the request.

## Updating an Object

For each class of your application's schema, Parse Server automatically generates a custom mutation for updating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `updateGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation UpdateGameScore {
  updateGameScore(
    id: "XN75D94OBD"
    fields: { score: 1400 }
  ) {
    id
    updatedAt
    createdAt
    playerName
    score
    cheatMode
    ACL
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "updateGameScore": {
      "id": "XN75D94OBD",
      "updatedAt": "2019-09-17T07:25:21.139Z",
      "createdAt": "2019-09-17T06:50:26.357Z",
      "playerName": "Sean Plott",
      "score": 1400,
      "cheatMode": false,
      "ACL": null
    }
  }
}
```

## Deleting an Object

For each class of your application's schema, Parse Server automatically generates a custom mutation for deleting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `deleteGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation DeleteGameScore {
  deleteGameScore(id: "a7ulpjjuji") {
    id
    updatedAt
    createdAt
    playerName
    score
    cheatMode
    ACL
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "deleteGameScore": {
      "id": "a7ulpjjuji",
      "updatedAt": "2019-09-17T07:11:28.869Z",
      "createdAt": "2019-09-17T07:11:28.869Z",
      "playerName": "Jang Min Chul",
      "score": 80075,
      "cheatMode": false,
      "ACL": null
    }
  }
}
```

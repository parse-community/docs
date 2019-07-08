# Objects

## Creating Objects

### Generic Mutation

Parse Server is schemaless in the sense that you don’t need to specify ahead of time what keys exist on each object. In fact, it generates a schema on the fly as you create objects.

For creating an object, you simply need to set whatever key-value pairs you want, and the backend will store it. This operation can be performed through the GraphQL API using the generic `create` mutation. For example:

```graphql
mutation CreateObject {
  objects {
    create(
      className: "GameScore"
      fields: {
        score: 1337
        playerName: "Sean Plott"
        cheatMode: false
      }
    ) {
      objectId
      createdAt
    }
  }
}
```

If you execute the code above in your GraphQL Playground, you should receive a response similar to this:

```json
{
  "data": {
    "objects": {
      "create": {
        "objectId": "MssDRE0I0s",
        "createdAt": "2019-07-08T21:23:21.275Z"
      }
    }
  }
}
```

In addition to creating the object, Parse Server automatically learns from it, keeps track of the application's schema, and generates custom operations for each class. For instance, after running the code above, you will notice a new `GameScore` class in the schema and a new set of `GameScore` CRUD operations in the GraphQL API.

### Class Mutation

For each class of your application's schema, Parse Server automatically generates a custom mutation for creating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `createGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation CreateGameScore {
  objects {
    createGameScore(fields: {
      score: 80075
      playerName: "Jang Min Chul"
      cheatMode: false
    }) {
      objectId
      createdAt
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "createGameScore": {
        "objectId": "sCR5LNkF0z",
        "createdAt": "2019-07-08T21:24:24.727Z"
      }
    }
  }
}
```

## Getting an Object

### Generic Query

You can get an existing object by its `className` and `objectId` using the `get` query. For example:

```graphql
query GetObject {
  objects {
    get(className: "GameScore" objectId: "MssDRE0I0s")
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "get": {
        "objectId": "MssDRE0I0s",
        "score": 1337,
        "playerName": "Sean Plott",
        "cheatMode": false,
        "createdAt": "2019-07-08T21:23:21.275Z",
        "updatedAt": "2019-07-08T21:23:21.275Z"
      }
    }
  }
}
```

### Class Query

For each class of your application's schema, Parse Server automatically generates a custom query for getting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `getGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query GetGameScore {
  objects {
    getGameScore(objectId: "MssDRE0I0s") {
      objectId
      playerName
      score
      cheatMode
      createdAt
      updatedAt
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "getGameScore": {
        "objectId": "MssDRE0I0s",
        "playerName": "Sean Plott",
        "score": 1337,
        "cheatMode": false,
        "createdAt": "2019-07-08T21:23:21.275Z",
        "updatedAt": "2019-07-08T21:23:21.275Z"
      }
    }
  }
}
```

## Finding Objects

### Generic Query

You can retrieve multiple objects at once using the `find` query. For example:

```graphql
query FindObjects {
  objects {
    find(className: "GameScore") {
      count
      results
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "find": {
        "count": 2,
        "results": [
          {
            "objectId": "MssDRE0I0s",
            "score": 1337,
            "playerName": "Sean Plott",
            "cheatMode": false,
            "createdAt": "2019-07-08T21:23:21.275Z",
            "updatedAt": "2019-07-08T21:23:21.275Z"
          },
          {
            "objectId": "sCR5LNkF0z",
            "playerName": "Jang Min Chul",
            "score": 80075,
            "cheatMode": false,
            "createdAt": "2019-07-08T21:24:24.727Z",
            "updatedAt": "2019-07-08T21:24:24.727Z"
          }
        ]
      }
    }
  }
}
```

### Class Query

For each class of your application's schema, Parse Server automatically generates a custom query for finding this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `findGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query FindGameScore {
  objects {
    findGameScore {
      count
      results {
        objectId
      	playerName
      	score
      	cheatMode
      	createdAt
      	updatedAt
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "findGameScore": {
        "count": 2,
        "results": [
          {
            "objectId": "MssDRE0I0s",
            "playerName": "Sean Plott",
            "score": 1337,
            "cheatMode": false,
            "createdAt": "2019-07-08T21:23:21.275Z",
            "updatedAt": "2019-07-08T21:23:21.275Z"
          },
          {
            "objectId": "sCR5LNkF0z",
            "playerName": "Jang Min Chul",
            "score": 80075,
            "cheatMode": false,
            "createdAt": "2019-07-08T21:24:24.727Z",
            "updatedAt": "2019-07-08T21:24:24.727Z"
          }
        ]
      }
    }
  }
}
```

### Constraints

You can use the `where` argument to add constraints to either a generic or a class find query. See the example below:

```graphql
query ConstraintsExamples {
  objects {
    genericExample: find(
      className: "GameScore"
      where: { score: { _lt: 1500 } }
    ) {
      count
    }
    classExample: findGameScore(
      where: { score: { _gt: 1500 } }
    ) {
      count
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "genericExample": {
        "count": 1
      },
      "classExample": {
        "count": 1
      }
    }
  }
}
```

### Order

You can use the `order` argument to select in which order the results should show up either in a generic or in a class find query. See the example below:

```graphql
query OrderExamples {
  objects {
    genericExample: find(
      className: "GameScore"
      where: { cheatMode: false }
      order: "-score"
    ) {
     results
    }
    classExample: findGameScore(
      where: { cheatMode: { _eq: false } }
      order: [score_ASC]
    ) {
      results {
      	playerName
      	score
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "genericExample": {
        "results": [
          {
            "objectId": "sCR5LNkF0z",
            "playerName": "Jang Min Chul",
            "score": 80075,
            "cheatMode": false,
            "createdAt": "2019-07-08T21:24:24.727Z",
            "updatedAt": "2019-07-08T21:24:24.727Z"
          },
          {
            "objectId": "MssDRE0I0s",
            "score": 1337,
            "playerName": "Sean Plott",
            "cheatMode": false,
            "createdAt": "2019-07-08T21:23:21.275Z",
            "updatedAt": "2019-07-08T21:23:21.275Z"
          }
        ]
      },
      "classExample": {
        "results": [
          {
            "playerName": "Sean Plott",
            "score": 1337
          },
          {
            "playerName": "Jang Min Chul",
            "score": 80075
          }
        ]
      }
    }
  }
}
```

### Pagination

You can use the `skip` and `limit` arguments to paginate the results either in a generic or in a class find query. See the example below:

```graphql
query PaginationExamples {
  objects {
    genericExample: find(
      className: "GameScore"
      where: { cheatMode: false }
      order: "-score"
      skip: 0
      limit: 1
    ) {
     results
    }
    classExample: findGameScore(
      where: { cheatMode: { _eq: false } }
      order: [score_DESC]
      skip: 1
      limit: 1
    ) {
      results {
      	playerName
      	score
      }
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "objects": {
      "genericExample": {
        "results": [
          {
            "objectId": "sCR5LNkF0z",
            "playerName": "Jang Min Chul",
            "score": 80075,
            "cheatMode": false,
            "createdAt": "2019-07-08T21:24:24.727Z",
            "updatedAt": "2019-07-08T21:24:24.727Z"
          }
        ]
      },
      "classExample": {
        "results": [
          {
            "playerName": "Sean Plott",
            "score": 1337
          }
        ]
      }
    }
  }
}
```
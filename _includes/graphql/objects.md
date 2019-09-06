# Objects

## Creating Objects

### Generic Mutation

Parse Server is schemaless in the sense that you don’t need to specify ahead of time what keys exist on each object. In fact, it generates a schema on the fly as you create objects.

For creating an object, you simply need to set whatever key-value pairs you want, and the backend will store it. This operation can be performed through the GraphQL API using the generic `create` mutation. For example:

```graphql
mutation CreateObject {
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
```

If you execute the code above in your GraphQL Playground, you should receive a response similar to this:

```json
{
  "data": {
    "create": {
      "objectId": "EGyoD3goxn",
      "createdAt": "2019-08-27T06:53:08.780Z"
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
  createGameScore(fields: {
    score: 80075
    playerName: "Jang Min Chul"
    cheatMode: false
  }) {
    objectId
    createdAt
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "createGameScore": {
      "objectId": "NNfsmFxMIv",
      "createdAt": "2019-08-27T06:57:18.452Z"
    }
  }
}
```

## Getting an Object

### Generic Query

You can get an existing object by its `className` and `objectId` using the `get` query. For example:

```graphql
query GetObject {
  get(className: "GameScore" objectId: "EGyoD3goxn")
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "get": {
      "objectId": "EGyoD3goxn",
      "score": 1337,
      "playerName": "Sean Plott",
      "cheatMode": false,
      "createdAt": "2019-08-27T06:53:08.780Z",
      "updatedAt": "2019-08-27T06:53:08.780Z"
    }
  }
}
```

### Class Query

For each class of your application's schema, Parse Server automatically generates a custom query for getting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query GameScore {
  gameScore(objectId: "EGyoD3goxn") {
    objectId
    playerName
    score
    cheatMode
    createdAt
    updatedAt
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScore": {
      "objectId": "EGyoD3goxn",
      "playerName": "Sean Plott",
      "score": 1337,
      "cheatMode": false,
      "createdAt": "2019-08-27T06:53:08.780Z",
      "updatedAt": "2019-08-27T06:53:08.780Z"
    }
  }
}
```

## Finding Objects

### Generic Query

You can retrieve multiple objects at once using the `find` query. For example:

```graphql
query FindObjects {
  find(className: "GameScore") {
    count
    results
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "find": {
      "count": 2,
      "results": [
        {
          "objectId": "EGyoD3goxn",
          "score": 1337,
          "playerName": "Sean Plott",
          "cheatMode": false,
          "createdAt": "2019-08-27T06:53:08.780Z",
          "updatedAt": "2019-08-27T06:53:08.780Z"
        },
        {
          "objectId": "NNfsmFxMIv",
          "playerName": "Jang Min Chul",
          "score": 80075,
          "cheatMode": false,
          "createdAt": "2019-08-27T06:57:18.452Z",
          "updatedAt": "2019-08-27T06:57:18.452Z"
        }
      ]
    }
  }
}
```

### Class Query

For each class of your application's schema, Parse Server automatically generates a custom query for finding this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScores`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query GameScores {
  gameScores {
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
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScores": {
      "count": 2,
      "results": [
        {
          "objectId": "EGyoD3goxn",
          "playerName": "Sean Plott",
          "score": 1337,
          "cheatMode": false,
          "createdAt": "2019-08-27T06:53:08.780Z",
          "updatedAt": "2019-08-27T06:53:08.780Z"
        },
        {
          "objectId": "NNfsmFxMIv",
          "playerName": "Jang Min Chul",
          "score": 80075,
          "cheatMode": false,
          "createdAt": "2019-08-27T06:57:18.452Z",
          "updatedAt": "2019-08-27T06:57:18.452Z"
        }
      ]
    }
  }
}
```

### Constraints

You can use the `where` argument to add constraints to either a generic or a class find query. See the example below:

```graphql
query ConstraintsExamples {
  genericExample: find(
    className: "GameScore"
    where: { score: { _lt: 1500 } }
  ) {
    count
  }
  classExample: gameScores(
    where: { score: { _gt: 1500 } }
  ) {
    count
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "genericExample": {
      "count": 1
    },
    "classExample": {
      "count": 1
    }
  }
}
```

### Order

You can use the `order` argument to select in which order the results should show up either in a generic or in a class find query. See the example below:

```graphql
query OrderExamples {
  genericExample: find(
    className: "GameScore"
    where: { cheatMode: false }
    order: "-score"
  ) {
   results
  }
  classExample: gameScores(
    where: { cheatMode: { _eq: false } }
    order: [score_ASC]
  ) {
    results {
      playerName
      score
    }
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "genericExample": {
      "results": [
        {
          "objectId": "NNfsmFxMIv",
          "playerName": "Jang Min Chul",
          "score": 80075,
          "cheatMode": false,
          "createdAt": "2019-08-27T06:57:18.452Z",
          "updatedAt": "2019-08-27T06:57:18.452Z"
        },
        {
          "objectId": "EGyoD3goxn",
          "score": 1337,
          "playerName": "Sean Plott",
          "cheatMode": false,
          "createdAt": "2019-08-27T06:53:08.780Z",
          "updatedAt": "2019-08-27T06:53:08.780Z"
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
```

### Pagination

You can use the `skip` and `limit` arguments to paginate the results either in a generic or in a class find query. See the example below:

```graphql
query PaginationExamples {
  genericExample: find(
    className: "GameScore"
    where: { cheatMode: false }
    order: "-score"
    skip: 0
    limit: 1
  ) {
   results
  }
  classExample: gameScores(
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
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "genericExample": {
      "results": [
        {
          "objectId": "NNfsmFxMIv",
          "playerName": "Jang Min Chul",
          "score": 80075,
          "cheatMode": false,
          "createdAt": "2019-08-27T06:57:18.452Z",
          "updatedAt": "2019-08-27T06:57:18.452Z"
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
```

## Updating an Object

### Generic Mutation

You can update an existing object using the `update` mutation. You simply need to send its `className`, `objectId`, and the fields that need to be updated. Parse Server will only change the received fields, and keep the others as they are. For example:

```graphql
mutation UpdateObject {
  update(
    className: "GameScore"
    objectId: "NNfsmFxMIv"
    fields: { ranking: 1 }
  ) {
    updatedAt
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "update": {
      "updatedAt": "2019-08-27T07:14:04.346Z"
    }
  }
}
```

### Class Mutation

For each class of your application's schema, Parse Server automatically generates a custom mutation for updating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `updateGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation UpdateGameScore {
  updateGameScore(
    objectId: "EGyoD3goxn"
    fields: { ranking: 2 }
  ) {
    updatedAt
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "updateGameScore": {
      "updatedAt": "2019-08-27T07:15:05.351Z"
    }
  }
}
```

## Deleting an Object

### Generic Mutation

You can delete an existing object using the `delete` mutation. You simply need to send its `className`, and `objectId`. For example:

```graphql
mutation DeleteObject {
  delete(className: "GameScore" objectId: "NNfsmFxMIv")
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "delete": true
  }
}
```

### Class Mutation

For each class of your application's schema, Parse Server automatically generates a custom mutation for deleting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `deleteGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation DeleteGameScore {
  deleteGameScore(objectId: "EGyoD3goxn") {
    objectId
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "deleteGameScore": {
      "objectId": "EGyoD3goxn"
    }
  }
}
```

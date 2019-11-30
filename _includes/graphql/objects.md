# Create your first Object

## Creating Objects

For each class of your application's schema, Parse Server **automatically** generates a custom mutation for creating this class' objects through the **GraphQL API**.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `createGameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
mutation createAGameScore {
  createGameScore(
    input: {
      clientMutationId: "anUniqueId",
        fields: {
        playerName: "Sean Plott"
        score: 1337
        cheatMode: false
      }
    }
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
    "createGameScore": {
      "id": "XN75D94OBD",
      "updatedAt": "2019-09-17T06:50:26.357Z",
      "createdAt": "2019-09-17T06:50:26.357Z",
      "playerName": "Sean Plott",
      "score": 1337,
      "cheatMode": false,
      "ACL": null
    }
  }
}
```

## Getting an Object

For each class of your application's schema, Parse Server automatically generates a custom query for getting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScore`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query GameScore {
  gameScore(id: "XN75D94OBD") {
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
    "gameScore": {
      "id": "XN75D94OBD",
      "updatedAt": "2019-09-17T06:50:26.357Z",
      "createdAt": "2019-09-17T06:50:26.357Z",
      "playerName": "Sean Plott",
      "score": 1337,
      "cheatMode": false,
      "ACL": null
    }
  }
}
```

## Finding Objects

For each class of your application's schema, Parse Server automatically generates a custom query for finding this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new query called `gameScores`, and you should be able to run the code below in your GraphQL Playground:

```graphql
query GameScores {
  gameScores {
    count
    results {
      id
      updatedAt
      createdAt
      playerName
      score
      cheatMode
      ACL
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
          "id": "XN75D94OBD",
          "updatedAt": "2019-09-17T06:50:26.357Z",
          "createdAt": "2019-09-17T06:50:26.357Z",
          "playerName": "Sean Plott",
          "score": 1337,
          "cheatMode": false,
          "ACL": null
        },
        {
          "id": "a7ulpjjuji",
          "updatedAt": "2019-09-17T07:11:28.869Z",
          "createdAt": "2019-09-17T07:11:28.869Z",
          "playerName": "Jang Min Chul",
          "score": 80075,
          "cheatMode": false,
          "ACL": null
        }
      ]
    }
  }
}
```

### Constraints

You can use the `where` argument to add constraints to a class find query. See the example below:

```graphql
query ConstraintsExamples {
  gameScores(
    where: { score: { greaterThan: 1500 } }
  ) {
    count
  }
}
```

The code above should resolve to something similar to this:

```json
{
  "data": {
    "gameScores": {
      "count": 1
    }
  }
}
```

### Order

You can use the `order` argument to select in which order the results should show up in a class find query. See the example below:

```graphql
query OrderExamples {
  gameScores(
    where: { cheatMode: { equalTo: false } }
    order: [score_DESC]
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
    "gameScores": {
      "results": [
        {
          "playerName": "Jang Min Chul",
          "score": 80075
        },
        {
          "playerName": "Sean Plott",
          "score": 1337
        }        
      ]
    }
  }
}
```

### Pagination

You can use the `skip` and `limit` arguments to paginate the results in a class find query. See the example below:

```graphql
query PaginationExamples {
  gameScores(
    where: { cheatMode: { equalTo: false } }
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
    "gameScores": {
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

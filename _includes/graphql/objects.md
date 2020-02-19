# Objects

## Create

For each class in your application's schema, Parse Server automatically generates a custom mutation for creating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `createGameScore`, and you should be able to run the code below in your GraphQL Playground:

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // optional
}
```

```graphql
# GraphQL
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
```js
// Response
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

**Note:** The `id` is a [Relay Global Object Identification](https://facebook.github.io/relay/graphql/objectidentification.htm), it's **not** a Parse `objectId`. Most of the time the `Relay Node Id` is a `Base64` of the `ParseClass` and the `objectId`.

## Update

For each class in your application's schema, Parse Server automatically generates a custom mutation for updating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `updateGameScore`.

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
# GraphQL
mutation updateAGameScore {
  updateGameScore(
    input: {
      id: "R2FtZVNjb3JlOmM3TVpDZEhQY2w="
      fields: { playerName: "Charles Francois" }
    }
  ) {
    gameScore {
      id
      playerName
    }
  }
}
```
```js
// Response
{
  "data": {
    "updateGameScore": {
      "gameScore": {
        "id": "R2FtZVNjb3JlOmM3TVpDZEhQY2w=",
        "playerName": "Charles Francois"
      }
    }
  }
}
```
**Note:** If you use [Apollo Client](https://www.apollographql.com/docs/react/) it's recommended to request the modified fields and `id` during the Mutation, then the [Apollo Client](https://www.apollographql.com/docs/react/) will automatically update its local store and push the new data across your app; i.e. If you update `playerName` you should request `playerName` and `id` like the code above.

## Delete

For each class in your application's schema, Parse Server automatically generates a custom mutation for deleting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `deleteGameScore`.

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```

```graphql
mutation deleteAGameScore {
  deleteGameScore(input: { id: "R2FtZVNjb3JlOmM3TVpDZEhQY2w=" }) {
    gameScore {
      id
      playerName
    }
  }
}
```

The code above should resolve to something similar to this:

```js
// Response
{
  "data": {
    "deleteGameScore": {
      "gameScore": {
        "id": "R2FtZVNjb3JlOmM3TVpDZEhQY2w=",
        "playerName": "Charles Francois"
      }
    }
  }
}
```

**Note:** The API returns the deleted object, which can allow you to show messages like "The player Charles François has been successfully removed" on the front end.

## Nested Mutation

The GraphQL API supports nested mutations (except for `File`), so you can create objects with complex relationships in one request. Assuming that we have classes `Country`, `City` and `Company`.

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
mutation aNestedMutation {
  createCountry(
    input: {
      fields: {
        name: "Mars"
        cities: {
          createAndAdd: [{ name: "Alpha",
            companies: {
              createAndAdd: [{
                name: "Motors"
              }]
            }
          }]
        }
      }
    }
  ) {
    country {
      name
      cities {
        edges {
          node {
            name
            companies {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```
```js
// Response
{
  "data": {
    "createCountry": {
      "country": {
        "name": "Mars",
        "cities": {
          "edges": [
            {
              "node": {
                "name": "Alpha",
                "companies": {
                  "edges": [
                    {
                      "node": {
                        "name": "Motors"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
}
```

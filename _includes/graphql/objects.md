# Objects

## Create

For each class of your application's schema, Parse Server **automatically** generates a custom mutation for creating this class' objects through the **GraphQL API**.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `createGameScore`, and you should be able to run the code below in your GraphQL Playground:

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
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

**Note:** The `id` is [Relay Global Object Identification](https://facebook.github.io/relay/graphql/objectidentification.htm), it's **NOT** a Parse `objectId`. Most of the time the `Relay Node Id` is a `Base64` of the `ParseClass` and the `objectId`.

## Update

For each class of your application's schema, Parse Server automatically generates a custom mutation for updating this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `updateGameScore`, and you should be able to run the code below in your GraphQL Playground:

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
**Note:** If you use [Apollo Client](https://www.apollographql.com/docs/react/) it's recommanded to ask to GraphQL the modified fields and `id` during the Mutation, then [Apollo Client](https://www.apollographql.com/docs/react/) will automatically update is local store and push the new data accross your app. ex: If you update `playerName` you should ask to GraphQL `playerName` and `id` like code above.

## Delete

For each class of your application's schema, Parse Server automatically generates a custom mutation for deleting this class' objects through the GraphQL API.

For example, if you have a class named `GameScore` in the schema, Parse Server automatically generates a new mutation called `deleteGameScore`, and you should be able to run the code below in your GraphQL Playground:

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

**Note:** The API return the deleted object, it helps front developers to show some messages like: "The player Charles François has been successfully removed."

## Nested Mutation

**Parse GraphQL Server** support nested mutations (exept for `File`), so you can create object with complex relation in one request. Assuming that we have classes `Country`, `City`, `Company`.

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
mutation aNestedMutaiton {
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

## Array Fragment





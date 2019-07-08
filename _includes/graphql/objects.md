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
        "objectId": "7jfBmbGgyF",
        "createdAt": "2019-06-20T23:50:50.825Z"
      }
    }
  }
}
```

In addition to creating the object, Parse Server automatically learns from it, keeps track of the application's schema, and generates custom operations for each class. For instance, after running the code above, you will notice a new `GameScore` class in the schema and a new set of `GameScore` CRUD operations in the GraphQL API.

### Custom Mutation


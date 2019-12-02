# Creating your first class

Since your application does not have any schema yet, you can use the `createClass` mutation to create your first class through the **GraphQL API**. Run the following:

```graphql
mutation createGameScoreClass {
  createClass(
    input: {
      clientMutationId: "anFrontId"
      name: "GameScore"
      schemaFields: {
        addStrings: [{ name: "playerName" }]
        addNumbers: [{ name: "score" }]
        addBooleans: [{ name: "cheatMode" }]
      }
    }
  ) {
    clientMutationId
    class {
      name
      schemaFields {
        name
        __typename
      }
    }
  }
}
```

You should receive the following response:

```json
{
  "data": {
    "createClass": {
      "clientMutationId": "anFrontId",
      "class": {
        "name": "GameScore",
        "schemaFields": [
          {
            "name": "objectId",
            "__typename": "SchemaStringField"
          },
          {
            "name": "updatedAt",
            "__typename": "SchemaDateField"
          },
          {
            "name": "createdAt",
            "__typename": "SchemaDateField"
          },
          {
            "name": "playerName",
            "__typename": "SchemaStringField"
          },
          {
            "name": "score",
            "__typename": "SchemaNumberField"
          },
          {
            "name": "cheatMode",
            "__typename": "SchemaBooleanField"
          },
          {
            "name": "ACL",
            "__typename": "SchemaACLField"
          }
        ]
      }
    }
  }
}
```

Parse Server learned from the first class that you created and now you have the `GameScore` class in your schema. You can now start using the automatically generated operations!
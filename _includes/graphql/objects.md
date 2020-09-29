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

**Note:** The `id` is a [Relay Global Object Identification](https://facebook.github.io/relay/graphql/objectidentification.htm); it's **not** a Parse `objectId`. Most of the time the `Relay Node Id` is a `Base64` of the `ParseClass` and the `objectId`.

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

The GraphQL API supports nested mutations, so you can create objects with complex relationships in one request. Assuming that we have classes `Country`, `City` and `Company`.

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

## Cloud Code Resolvers

If you need more control over how your mutations modify data than what Parse's auto-generated mutations can provide, Cloud Code functions can be used as custom resolvers.

For example, if you have classes named `Item` and `CartItem` in the schema, you can create an `addToCart` custom mutation that tests whether a specific item is already in the user's cart. If found, the cart item's quantity is incremented by one. If not, a new `CartItem` object is created.

The ability to branch your resolver logic in this way enables you to replicate functionality found in Parse's auto-generated `createCartItem` and `updateCartItem` mutations and combine those behaviors into a single custom resolver.

```sh
# schema.graphql
extend type Mutation {
  addToCart(id: ID!): CartItem! @resolve
}
```

```js
// main.js
Parse.Cloud.define("addToCart", async (req) => {
  const { user, params: { id } } = req;

  // Decode the incoming base64 id to an objectId for Cloud Code use.
  const decoded = Buffer.from(id, "base64").toString();
  const itemObjectId = decoded.split(":")[1];

  // Query the user's current cart.
  const itemQuery = new Parse.Query("Item");
  const item = await itemQuery.get(itemObjectId);
  const cartItemQuery = new Parse.Query("CartItem");
  cartItemQuery.equalTo("item", item);
  cartItemQuery.equalTo("user", user);
  const [existingCartItem] = await cartItemQuery.find();
  let savedCartItem;

  if (existingCartItem) {
    // The item is found in the user's cart; increment its quantity.
    const quantity = await existingCartItem.get("quantity");
    existingCartItem.set("quantity", quantity + 1);
    savedCartItem = await existingCartItem.save();
  } else {
    // The item has not yet been added; create a new cartItem object.
    const CartItem = Parse.Object.extend("CartItem");
    const cartItem = new CartItem();
    savedCartItem = await cartItem.save({ quantity: 1, item, user });
  }

  // Encode the Parse objectId to a Relay Global Object Identification
  // (a special use-case base64 id string) for Parse GraphQL use.
  const concatObjectId = `CartItem:${savedCartItem.id}`;
  const cartItemId = Buffer.from(concatObjectId).toString("base64");

  // Convert to a JSON object to handle adding the base64 id property.
  const cartItemJson = savedCartItem.toJSON();
  Object.assign(cartItemJson, { id: cartItemId });
  return cartItemJson;
});
```

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Session-Token": "r:b0dfad1eeafa4425d9508f1c0a15c3fa"
}
```

```graphql
mutation addItemToCart {
  addToCart(id: "SXRlbTpEbDVjZmFWclRI") {
    id
    quantity
  }
}
```

The code above should resolve to something similar to this:

```js
// Response
{
  "data": {
    "addToCart": {
      "id": "Q2FydEl0ZW06akVVTHlGZnVpQw==",
      "quantity": 1
    }
  }
}
```

**Note:** The `id` is a [Relay Global Object Identification](https://facebook.github.io/relay/graphql/objectidentification.htm); it's **not** a Parse `objectId`. Most of the time the `Relay Node Id` is a `Base64` of the `ParseClass` and the `objectId`. Cloud code does not recognize this type of `id`, so it must be converted to a Parse `objectId` for use in Cloud Code function queries.

Decoding and encoding these Relay Global Object Identifications in Cloud Code is needed in order to seamlessly interface with your client-side GraphQL mutations.

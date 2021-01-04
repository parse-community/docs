# GraphQL

[GraphQL](https://graphql.org/), developed by Facebook, is an open-source data query and manipulation language for APIs. In addition to the traditional REST API, Parse Server automatically generates a GraphQL API based on your current application schema. Parse Server also allows you to define your custom GraphQL queries and mutations, whose resolvers can be bound to your cloud code functions.

## Running

### Using the CLI

The easiest way to run the Parse GraphQL API is through the CLI:

```bash
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test --publicServerURL http://localhost:1337/parse --mountGraphQL --mountPlayground
```

After starting the server, you can visit http://localhost:1337/playground in your browser to start playing with your GraphQL API.

Note:

- Do **NOT** use --mountPlayground option in production. [Parse Dashboard](https://github.com/parse-community/parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps.

### Using Docker

You can also run the Parse GraphQL API inside a Docker container:

```bash
$ git clone https://github.com/parse-community/parse-server
$ cd parse-server
$ docker build --tag parse-server .
$ docker run --name my-mongo -d mongo
```

#### Running the Parse Server Image

```bash
$ docker run --name my-parse-server --link my-mongo:mongo -v config-vol:/parse-server/config -p 1337:1337 -d parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://mongo/test --publicServerURL http://localhost:1337/parse --mountGraphQL --mountPlayground
```

Note:

* If you want to use [Cloud Code]({{ site.baseUrl }}/cloudcode/guide/) feature, please add `-v cloud-code-vol:/parse-server/cloud --cloud /parse-server/cloud/main.js` to command above. Make sure the `main.js` file is available in the `cloud-code-vol` directory before run this command. Otherwise, an error will occur.

After starting the server, you can visit http://localhost:1337/playground in your browser to start playing with your GraphQL API.

### Using Express.js

You can also mount the GraphQL API in an Express.js application together with the REST API or solo. You first need to create a new project and install the required dependencies:

```bash
$ mkdir my-app
$ cd my-app
$ npm install parse-server express --save
```

Then, create an `index.js` file with the following content:

```js
const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();

const parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/test',
  appId: 'APPLICATION_ID',
  masterKey: 'MASTER_KEY',
  serverURL: 'http://localhost:1337/parse',
  publicServerURL: 'http://localhost:1337/parse'
});

const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    playgroundPath: '/playground'
  }
);

app.use('/parse', parseServer.app); // (Optional) Mounts the REST API
parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app); // (Optional) Mounts the GraphQL Playground - do NOT use in Production

app.listen(1337, function() {
  console.log('REST API running on http://localhost:1337/parse');
  console.log('GraphQL API running on http://localhost:1337/graphql');
  console.log('GraphQL Playground running on http://localhost:1337/playground');
});
```

And finally start your app:

```bash
$ npx mongodb-runner start
$ node index.js
```

After starting the app, you can visit http://localhost:1337/playground in your browser to start playing with your GraphQL API.

Note:

- Do **NOT** use --mountPlayground option in production. [Parse Dashboard](https://github.com/parse-community/parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps.

## Checking the API health

Run the following:

```graphql
query Health {
  health
}
```

You should receive the following response:

```json
{
  "data": {
    "health": true
  }
}
```

## Creating your first class

Since your application does not have any schema yet, you can use the `createClass` mutation to create your first class. Run the following:

```graphql
mutation CreateClass {
  createClass(
    name: "GameScore"
    schemaFields: {
      addStrings: [{ name: "playerName" }]
      addNumbers: [{ name: "score" }]
      addBooleans: [{ name: "cheatMode" }]
    }
  ) {
    name
    schemaFields {
      name
      __typename
    }
  }
}
```

You should receive the following response:

```json
{
  "data": {
    "createClass": {
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
```

## Using automatically generated operations

Parse Server learned from the first class that you created and now you have the `GameScore` class in your schema. You can now start using the automatically generated operations!

Run the following to create your first object:

```graphql
mutation CreateGameScore {
  createGameScore(
    fields: {
      playerName: "Sean Plott"
      score: 1337
      cheatMode: false
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

You should receive a response similar to this:

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

You can also run a query to this new class:

```graphql
query GameScores {
  gameScores {
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

You should receive a response similar to this:

```json
{
  "data": {
    "gameScores": {
      "results": [
        {
          "id": "XN75D94OBD",
          "updatedAt": "2019-09-17T06:50:26.357Z",
          "createdAt": "2019-09-17T06:50:26.357Z",
          "playerName": "Sean Plott",
          "score": 1337,
          "cheatMode": false,
          "ACL": null
        }
      ]
    }
  }
}
```

## Customizing your GraphQL Schema

Parse GraphQL Server allows you to create a custom GraphQL schema with own queries and mutations to be merged with the auto-generated ones. You can resolve these operations using your regular cloud code functions.

To start creating your custom schema, you need to code a `schema.graphql` file and initialize Parse Server with `--graphQLSchema` and `--cloud` options:

```bash
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test --publicServerURL http://localhost:1337/parse --cloud ./cloud/main.js --graphQLSchema ./cloud/schema.graphql --mountGraphQL --mountPlayground
```

### Creating your first custom query

Use the code below for your `schema.graphql` and `main.js` files. Then restart your Parse Server.

```graphql
# schema.graphql
extend type Query {
  hello: String! @resolve
}
```

```js
// main.js
Parse.Cloud.define('hello', async () => {
  return 'Hello world!';
});
```

You can now run your custom query using GraphQL Playground:

```graphql
query {
  hello
}
```

You should receive the response below:

```json
{
  "data": {
    "hello": "Hello world!"
  }
}
```

## Learning more

The [Parse GraphQL Guide]({{ site.baseUrl }}/graphql/guide/) is a very good source for learning how to use the Parse GraphQL API.

You also have a very powerful tool inside your GraphQL Playground. Please look at the right side of your GraphQL Playground. You will see the `DOCS` and `SCHEMA` menus. They are automatically generated by analyzing your application schema. Please refer to them and learn more about everything that you can do with your Parse GraphQL API.

Additionally, the [GraphQL Learn Section](https://graphql.org/learn/) is a very good source to learn more about the power of the GraphQL language.
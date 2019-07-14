# Getting Started

[GraphQL](https://graphql.org/), developed by Facebook, is an open-source data query and manipulation language for APIs. In addition to the traditional [REST API](/rest/guide/), Parse Server automatically generates a GraphQL API based on your current application schema.

The easiest way to run the Parse GraphQL Server is using the CLI:

```bash
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test --mountGraphQL --mountPlayground
```

Notes:
* Run `parse-server --help` or refer to [Parse Server Options](https://parseplatform.org/parse-server/api/master/ParseServerOptions.html) for a complete list of Parse Server configuration options.
* ⚠️ Please do not use `--mountPlayground` option in production as anyone could access your API Playground and read or change your application's data. [Parse Dashboard](#running-parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps.

After running the CLI command, you should have something like this in your terminal:

<img alt="Parse GraphQL Server" data-echo="{{ '/assets/images/graphql/parse-graphql-server.png' | prepend: site.baseurl }}"/>

Since you have already started your Parse GraphQL Server, you can now visit [http://localhost:1337/playground](http://localhost:1337/playground) in your web browser to start playing with your GraphQL API.

<img alt="GraphQL Playground" data-echo="{{ '/assets/images/graphql/graphql-playground.png' | prepend: site.baseurl }}"/>

## Using Docker

You can also run the Parse GraphQL API inside a Docker container:

```bash
$ git clone https://github.com/parse-community/parse-server
$ cd parse-server
$ docker build --tag parse-server .
$ docker run --name my-mongo -d mongo
$ docker run --name my-parse-server --link my-mongo:mongo -d parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://mongo/test --mountGraphQL --mountPlayground
```

After starting the server, you can visit [http://localhost:1337/playground](http://localhost:1337/playground) in your browser to start playing with your GraphQL API.

⚠️ Please do not use `--mountPlayground` option in production as anyone could access your API Playground and read or change your application's data. [Parse Dashboard](#running-parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps.

## Using Express.js

You can also mount the GraphQL API in an Express.js application together with the REST API or solo:

```js
const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();

const parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/test',
  appId: 'APPLICATION_ID',
  masterKey: 'MASTER_KEY',
  serverURL: 'http://localhost:1337/parse'
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

After starting the server, you can visit [http://localhost:1337/playground](http://localhost:1337/playground) in your browser to start playing with your GraphQL API.

⚠️ Please do not mount the GraphQL Playground in production as anyone could access your API Playground and read or change your application's data. [Parse Dashboard](#running-parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps.

## Running Parse Dashboard

[Parse Dashboard](https://github.com/parse-community/parse-dashboard) is a standalone dashboard for managing your Parse Server apps, including your objects' schema and data, logs, jobs, and push notifications. Parse Dashboard has also a built-in GraphQL Playground that you can use to play with your auto-generated Parse GraphQL API. It is the recommended option for production applications.

The easiest way to run the Parse Dashboard is through its CLI:

```bash
$ npm install -g parse-dashboard
$ parse-dashboard --dev --appId APPLICATION_ID --masterKey MASTER_KEY --serverURL "http://localhost:1337/parse" --graphQLServerURL "http://localhost:1337/graphql" --appName MyAppName
```

Note:
* To learn more about Parse Dashboard and its setup options, please visit [Parse Dashboard Repository](https://github.com/parse-community/parse-dashboard).

After starting the dashboard, you can visit [http://0.0.0.0:4040/apps/MyAppName/api_console/graphql](http://0.0.0.0:4040/apps/MyAppName/api_console/graphql) in your browser:

<img alt="Parse Dashboard GraphQL Playground" data-echo="{{ '/assets/images/graphql/dashboard-graphql-playground.png' | prepend: site.baseurl }}"/>
# Getting Started

[GraphQL](https://graphql.org/), developed by Facebook, is an open-source data query and manipulation language for APIs. In addition to the traditional [REST API](/rest/guide/), Parse Server automatically generates a GraphQL API based on your current application schema.

## Fast launch
The easiest way to run the Parse GraphQL Server is using the CLI:

```bash
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test --mountGraphQL --mountPlayground
```

Notes:
* Run `parse-server --help` or refer to [Parse Server Options](https://parseplatform.org/parse-server/api/master/ParseServerOptions.html) for a complete list of Parse Server configuration options.
* ⚠️ Please do not use `--mountPlayground` option in production as anyone could access your API Playground and read or change your application's data. [Parse Dashboard](#running-parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps. If you want to lock your API on **production** take a look to [Class Level Persmissions](/js/guide/#class-level-permissions)
* ⚠️ The Parse GraphQL ```beta``` implementation is fully functional but discussions are taking place on how to improve it. So new versions of Parse Server can bring breaking changes to the current API.

After running the CLI command, you should have something like this in your terminal:

```sh
...
[35071] parse-server running on http://localhost:1337/parse
[35071] GraphQL running on http://localhost:1337/graphql
[35071] Playground running on http://localhost:1337/playground
```

Since you have already started your Parse GraphQL Server, you can now visit [http://localhost:1337/playground](http://localhost:1337/playground) in your web browser to start playing with your GraphQL API.

<img alt="GraphQL Playground" data-echo="{{ '/assets/images/graphql/graphql-playground.png' | prepend: site.baseurl }}"/>

## Using Express.js

You can also mount the GraphQL API in an Express.js application together with the REST API or solo. You first need to create a new project and install the required dependencies:

```sh
$ mkdir my-app
$ cd my-app
$ npm init
$ npm install parse-server express --save
```

Then, create an `index.js` file with the following content:

```js
// index.js
const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

// Create express app
const app = express();

// Create a Parse Server Instance
const parseServer = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/test',
  appId: 'APPLICATION_ID',
  masterKey: 'MASTER_KEY',
  serverURL: 'http://localhost:1337/parse',
  publicServerURL: 'http://localhost:1337/parse'
});

// Create the GraphQL Server Instance
const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    playgroundPath: '/playground'
  }
);

// (Optional) Mounts the REST API
app.use('/parse', parseServer.app);
// Mounts the GraphQL API using graphQLPath: '/graphql'
parseGraphQLServer.applyGraphQL(app);
// (Optional) Mounts the GraphQL Playground - do NOT use in Production
parseGraphQLServer.applyPlayground(app);

// Start the server
app.listen(1337, function() {
  console.log('REST API running on http://localhost:1337/parse');
  console.log('GraphQL API running on http://localhost:1337/graphql');
  console.log('GraphQL Playground running on http://localhost:1337/playground');
});
```

And finally start your app:

```sh
$ npx mongodb-runner start
$ node index.js
```

After starting the app, you can visit [http://localhost:1337/playground](http://localhost:1337/playground) in your browser to start playing with your GraphQL API.

⚠️ Please do not mount the GraphQL Playground in production as anyone could access your API Playground and read or change your application's data. [Parse Dashboard](#running-parse-dashboard) has a built-in GraphQL Playground and it is the recommended option for production apps. If you want to secure your API in production take a look at [Class Level Permissions](/js/guide/#class-level-permissions).

## Running Parse Dashboard

[Parse Dashboard](https://github.com/parse-community/parse-dashboard) is a standalone dashboard for managing your Parse Server apps, including your objects' schema and data, logs, jobs, CLPs, and push notifications. Parse Dashboard also has a built-in GraphQL Playground that you can use to play around with your auto-generated Parse GraphQL API. It is the recommended option for **production** applications.

The easiest way to run the Parse Dashboard is through its CLI:

```sh
$ npm install -g parse-dashboard
$ parse-dashboard --dev --appId APPLICATION_ID --masterKey MASTER_KEY --serverURL "http://localhost:1337/parse" --graphQLServerURL "http://localhost:1337/graphql" --appName MyAppName
```

After starting the dashboard, you can visit [http://0.0.0.0:4040/apps/MyAppName/api_console/graphql](http://0.0.0.0:4040/apps/MyAppName/api_console/graphql) in your browser:

<img alt="Parse Dashboard GraphQL Playground" data-echo="{{ '/assets/images/graphql/dashboard-graphql-playground.png' | prepend: site.baseurl }}"/>

To learn more about Parse Dashboard and its setup options, please visit [Parse Dashboard Repository](https://github.com/parse-community/parse-dashboard).

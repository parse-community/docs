# Getting Started

[GraphQL](https://graphql.org/), developed by Facebook, is an open-source data query and manipulation language for APIs. In addition to the traditional [REST API](/rest/guide/), Parse Server automatically generates a GraphQL API based on your current application schema.

## Running

The easiest way to run the Parse GraphQL Server is using the CLI:

```bash
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId APPLICATION_ID --masterKey MASTER_KEY --databaseURI mongodb://localhost/test --mountGraphQL --mountPlayground
```

Run `parse-server --help` or refer to [Parse Server Options](https://parseplatform.org/parse-server/api/master/ParseServerOptions.html) for a complete list of Parse Server configuration options.

⚠️ Please do not use `--mountPlayground` option in production as anyone could access your API Playground and read or change your application's data.
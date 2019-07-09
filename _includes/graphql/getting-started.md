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
* ⚠️ Please do not use `--mountPlayground` option in production as anyone could access your API Playground and read or change your application's data.

After running the CLI command, you should have something like this in your terminal:

<img alt="Parse GraphQL Server" data-echo="{{ '/assets/images/graphql/parse-graphql-server.png' | prepend: site.baseurl }}"/>

Since you have already started your Parse GraphQL Server, you can now visit [http://localhost:1337/playground](http://localhost:1337/playground) in your web browser to start playing with your GraphQL API.

<img alt="GraphQL Playground" data-echo="{{ '/assets/images/graphql/graphql-playground.png' | prepend: site.baseurl }}"/>

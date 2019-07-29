# Customisation

Although we automtically generate a GraphQL schema based on your Parse Server database, we have provided a number of ways in which to configure and extend this schema.

## Configuration

Whilst it's great to simply plug GraphQL into your Parse setup and immediately query any of your existing classes, you may find that this level of exposure is not suitable to your project. We have therefore provided a flexible way to limit which types, queries mutations are exposed within your GraphQL schema.

### Configuration Options

By default, no configuration is needed to get GraphQL working with your Parse Server. All of the following settings are completely optional, and can be provided or omitted as desired. To configure your schema, you simply need to provide a valid JSON object with the expected properties as described below:

```typescript
// The properties with ? are optional

interface ParseGraphQLConfiguration {
  // All classes enabled by default
  // Provide an empty array to disable all classes
  enabledForClasses?: Array<string>;

  // Selectively disable specific classes
  disabledForClasses?: Array<string>;

  // Provide an array of per-class settings
  classConfigs?: Array<{

    // You must provide a className
    // Only provide one config object per class
    className: string;

    type?: {

      // By default, all fields can be sent for
      // a create or update mutation. Use this
      // setting to limit to specific fields.
      inputFields?: {
        create?: Array<string>;
        update?: Array<string>;
      };

      // By default, all fields can be resolved
      // on a get or find query. Use this to limit
      // which fields can be selected.
      outputFields?: Array<string>;

      // By default, all valid fields can be used
      // to filter a query. Use this to limit
      // which fields can be used to constrain a query.
      constraintFields?: Array<string>;

      // By default, all valid fields can be used
      // to sort the results of a query. Use this to
      // limit which fields can be used to sort a query
      // and which direction that sort can be set to.
      sortFields?: {
        field: string;
        asc: boolean;
        desc: boolean;
      }[];
    };

    // By default, a get and find query type is created
    // for all included classes. Use this to disable
    // the available query types for this class.
    query?: {
      get?: boolean;
      find?: boolean;
    };

    // By default, all write mutation types are 
    // exposed for all included classes. Use this to disable
    // the available mutation types for this class.
    mutation?: {
      create?: boolean;
      update?: boolean;
      destroy?: boolean;
    };
  }>
}
```

### Set or Update Configuration

We have provided a public API in ```ParseGraphQLServer``` which accepts the above JSON object for setting (and updating) your Parse GraphQL Configuration, ```setGraphQLConfig```:

```typescript
  const parseGraphQLServer = new ParseGraphQLServer(parseServer, {
    graphQLPath: parseServerConfig.graphQLPath,
    playgroundPath: parseServerConfig.playgroundPath
  });

  const config = {
    // ... ParseGraphQLConfiguration
  };

  await parseGraphQLServer.setGraphQLConfig(config);       
```

### Include or Exclude Classes

By default, all of your Parse classes, including the defaults such as ```Parse.User```, ```Parse.Session```, ```Parse.Role``` are added to the schema. You can restrict this using the ```enabledForClassess``` or ```disabledForClassess`` options, which accepts an array of Class names.

In the following example, we limit our GraphQL schema to only expose the default ```_User``` class, along with a few custom classes:

```javascript
{
  enabledForClasses: ["_User", "Book", "Review", "Comment"],
  disabledForClasses: null
}
```

In the following example, we limit our GraphQL schema by hiding some sensitive classes:

```javascript
{
  // undefined or null results in the default behaviour, i.e. include all classes
  enabledForClasses: undefined,
  // override the included classes by filtering out the following:
  disabledForClasses: [ "UserSensitiveData", "ProductOrder", "Invoice" ]
}
```

### Input Types

By default, we enrich the schema by generating a number of [Input Types](https://graphql.org/learn/schema/#input-types) for each class. This, as a healthy side-effect improves development experience by providing type-completion and docs, though the true purpose is to define exactly what fields are exposed and useable per operation type. You can provide a ```type``` setting for any or each of your classes to limit which fields are exposed:

In the following example, we have a custom class called ```Review``` where the fields ```rating``` and ```body``` are allowed on the ```create``` mutation, and the field ```numberOfLikes``` on the ```update``` mutation:

```json
{
  classConfigs: [
    {
      className: "Review",
      type: {
        inputFields: {
          create: ["rating", "body"],
          update: ["numberOfLikes"]
        }
      }
    }
  ]
}
```

You may decide to restrict which fields can be resolved when getting or finding records from a given class, for example, if you have a class called ```Video``` which includes a sensitive field ```dmcaFlags```, you can hide this field by explicitly stating the fields that can be resolved:

```json
{
  classConfigs: [
    {
      className: "Video",
      type: {
        outputFields: ["name", "author", "numberOfViews",   "comments", "cdnUrl"]
      }
    }
  ]
}
```

In production-grade environments where performance optimisation is critical, complete control over query filters and sortability is required to ensure that unindexed queries are not executed. For this reason, we provide a way to limit which fields can be used to constrain a query, and which fields (including the direction) can be used to sort that query.


In the following example, we set the fields ```name``` and ```age``` as the only two that can be used to filter the ```_User``` class, and defining the ```createdAt``` and ```age``` fields the only sortable field whilst disabling the ascending direction on the ```createdAt``` field:

```json
{
  classConfigs: [
    {
      className: "_User",
      constraintFields: ["name", "age"],
      type: {
          sortFields: [
            {
              field: "createdAt",
              desc: true,
              asc: false
            },
            {
              field: "age",
              desc: true,
              asc: true
            }
          ]
        }
      }
  ]
}
```

### Queries

By default, the schema exposes a ```get``` and ```find``` operation for each class, for example, ```get_User``` and ```find_User```. You can disable either of these for any class in your schema, like so:


```json
{
  classConfigs: [
    {
      className: "_User",
      query: {
        get: true,
        find: false
      }  
    },
    {
      className: "Review",
      query: {
        get: false,
        find: true
      }  
    }
  ]
}
```

### Mutations

By default, the schema exposes a ```create```, ```update``` and ```delete``` operation for each class, for example, ```create_User```, ```update_User``` and ```delete_User```. You can disable any of these mutations for any class in your schema, like so:


```json
{
  classConfigs: [
    {
      className: "_User",
      mutation: {
        create: true,
        update: true,
        destroy: true
      }  
    },
    {
      className: "Review",
      mutation: {
        create: true,
        update: false,
        destroy: true
      }  
    }
  ]
}
```

**Note**: the ```delete``` mutation setting key is named ```destroy``` to avoid issues due to ```delete``` being a javascript reserved word.

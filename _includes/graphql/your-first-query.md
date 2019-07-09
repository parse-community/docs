# Your First Query - Health Check

Now that you have set up your GraphQL environment, it is time to run your first query. Execute the following code in your GraphQL Playground to check your API's health:

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

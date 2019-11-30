# Your First Query - Health Check

Now that you have set up your GraphQL environment, it is time to run your first query. Execute the following code in your GraphQL Playground to check your API's health:

```graphql
query healthy {
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

Note: Following header was used for the query
```json
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY"
}
```

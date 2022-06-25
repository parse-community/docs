# Health Check

Now that you have set up your GraphQL environment, it is time to run your first query. Execute the following code in your GraphQL Playground to check your API's health:

```json5
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```

```graphql
# GraphQL
query healthy {
  health
}
```
```json5
// Response
{
  "data": {
    "health": true
  }
}
```

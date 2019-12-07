# Files

**Parse Server GraphQL** support file upload via [GraphQL Upload](https://github.com/jaydenseric/graphql-upload), to send `File` trough `GraphQL` it's recommended to use [Apollo Upload Client](https://github.com/jaydenseric/apollo-upload-client).

## Add a File field
First of all we will update our `GameScore` class with a `screenshot` field of type `File`

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY"
}
```
```graphql
# GraphQL
mutation updateGameScoreClass {
  updateClass(
    input: { 
      name: "GameScore",
      schemaFields: { 
        addFiles: [{ name: "screenshot" }]
      }
    }
  ) {
    class {
      name
    }
  }
}
```
```js
// Response
{
  "data": {
    "updateClass": {
      "class": {
        "name": "GameScore"
      }
    }
  }
}
```

## Create and add File

Currently the **Parse Server GraphQL API** do not support nested mutation for `File` type, so we need to send the file and then create/update the `GameScore` with the returned information.

```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
# GraphQL
# $file is a GraphQL Variable, see https://github.com/jaydenseric/apollo-upload-client
mutation createFile($file: Upload!) {
  createFile(input: { upload: $file }) {
    fileInfo {
      name
      url
    }
  }
}
```
```js
// Response
{
  "data": {
    "createFile": {
      "fileInfo": {
        "name": "6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png",
        "url": "http://localhost:1337/graphq/files/APPLICATION_ID/6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
      }
    }
  }
}
```

Then add the file to a new `GameScore` object.
```js
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
# GraphQL
mutation createGameScore {
  createGameScore(
    input: {
      fields: {
        playerName: "John"
        screenshot: {
          __type: "File",
          name: "6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
          url: "http://localhost:1337/graphq/files/APPLICATION_ID/6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
        }
      }
    }
  ) {
    gameScore {
      screenshot {
        name
        url
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
      "gameScore": {
        "screenshot": {
          "name": "6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png",
          "url": "http://localhost:1337/graphq/files/APPLICATION_ID/6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
        }
      }
    }
  }
}
```

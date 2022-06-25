# Files

The GraphQL API supports file upload via [GraphQL Upload](https://github.com/jaydenseric/graphql-upload), to send a `File` through `GraphQL` it's recommended to use the [Apollo Upload Client](https://github.com/jaydenseric/apollo-upload-client).

## Add a File field to a Class
First of all we will update our `GameScore` class with a `screenshot` field of type `File`.

```json5
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
```json5
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

## Create a File

The GraphQL API supports nested mutation for the `File` type, so you can send the file along with the Parse Object or just upload the file and get the returned information.

```json5
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
```json5
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

## Add an existing file

You can add an existing file to an object.

```json5
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
          file :{
            __type: "File",
            name: "6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
            url: "http://localhost:1337/graphq/files/APPLICATION_ID/6a4d43c3f0512bcb6bf05b6b0e7db47d_file.png"
          }
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
```json5
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

## Create and add a file
Lets create a new `GameScore` object and upload the file.
```json5
// Header
{
  "X-Parse-Application-Id": "APPLICATION_ID",
  "X-Parse-Master-Key": "MASTER_KEY" // (optional)
}
```
```graphql
# GraphQL
# $file is a GraphQL Variable, see https://github.com/jaydenseric/apollo-upload-client
mutation createGameScore($file: Upload! ) {
  createGameScore(
    input: {
      fields: {
        playerName: "John"
        screenshot: { 
          upload : $file
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
```json5
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

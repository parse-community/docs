# Objects

## The Parse Object

Storing data through the Parse REST API is built around a JSON encoding of the object's data. This data is schemaless, which means that you don't need to specify ahead of time what keys exist on each object. You simply set whatever key-value pairs you want, and the backend will store it.

For example, let's say you're tracking data for your smart toaster. A single Parse Object could contain:

```js
temperature: 175.0, leverDown: true
```

Keys must be alphanumeric strings. Values can be strings, numbers, booleans, or even arrays and dictionaries - anything that can be JSON-encoded.

Each object has a class name that you can use to distinguish different sorts of data. For example, we store the temperature data in a class called `Temperature`. We recommend that you NameYourClassesLikeThis and nameYourKeysLikeThis, just to keep your code looking pretty.

## Data Types

So far we've used values with type `double` and `bool`. The Parse REST API also supports strings, arrays, dates, and more. Read more about representing these and other types as JSON in the [REST API Guide](/docs/rest#objects-data-types).

# Indexes

To optimize you Parse Server database performance you can define indexes and compound indexes.

To define an index on a `Pointer` field you need to use a
special notation `_p_myFieldName`.
For example if you define `city: { type: "Pointer", targetClass: "City" }` in your `fields` you can define an index on this pointer with `cityIndexExample: { _p_city: true }`

Note: Currently Defined Schemas do not support indexes on special `_Join` classes used under the hood by the `Relation` type

Example:

```js
const UserSchema = {
  className: "_User",
  fields: {
    tags: { type: "Array" },
    city: { type: "Pointer", targetClass: "City" },
  },
  indexes: {
    tagsIndex: { tags: 1 },
    cityPointerIndex: { _p_city: 1 },
    tagAndCityIndex: { _p_city: 1, tags: 1 },
  },
};
```

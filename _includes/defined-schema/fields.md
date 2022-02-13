# Fields

You can find here all field types available on Parse

- `Number`: this type support `required` and `defaultValue`
- `String`: this type support `required` and `defaultValue`
- `Boolean`: this type support `required` and `defaultValue`
- `Date`: this type support `required` and `defaultValue`
- `Object`: this type support `required` and `defaultValue`
- `Array`: this type support `required` and `defaultValue`
- `GeoPoint`: this type support `required`
- `File`: this type support `required`
- `Bytes`: this type support `required`
- `Polygon`: this type support `required`
- `Relation`: You need to provide `targetClass`
- `Pointer`: You need to provide `targetClass`, this type support `required`

Example:

```js
const UserSchema = {
  className: "_User",
  fields: {
    birthDate: { type: "Date" },
    firstname: { type: "String", required: true },
    lastname: { type: "String", required: true },
    tags: { type: "Array" },
    location: { type: "GeoPoint" },
    city: { type: "Pointer", targetClass: "City" },
    friends: { type: "Relation", targetClass: "_User" },
    zone: { type: "Polygon" },
  },
};
```

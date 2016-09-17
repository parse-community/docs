##### PromiseRouter.js

---

A router that is based on promises rather than req/res/next.

This is intended to replace the use of express.Router to handle subsections of the API surface.

This will make it easier to have methods like 'batch' that themselves use our routing information, without disturbing express components that external developers may be modifying.

---
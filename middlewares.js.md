##### middlewares.js

---

Express middleware used during request processing

---

* handleParseHeaders - runs after body-parser, checks the request has a valid appId, checks user auth, mutates the request
* allowCrossDomain - sets Access-Control-Allow-* headers and catches OPTIONS requests
* allowMethodOverride - handles method overrides sent from javascript (i.e. a PUT sent as a POST)
* handleParseErrors - runs late in the chain, catches any propogated errors

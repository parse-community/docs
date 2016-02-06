##### The development wiki for the parse-server module.

---

Parse Server is a new project, separate from the hosted Parse API service.  Our intention is to provide and support the growth of an open-source API server, and allow new developers to benefit from the powerful Parse client SDKs regardless of where their application logic and data is stored.

See the [Parse Server Guide](/ParsePlatform/parse-server/wiki/Parse-Server-Guide) to learn more about using Parse-Server in your project.

---

# Files

* [[index.js|index.js]] - exposes the ParseServer constructor and mutates Parse.Cloud
* [[analytics.js|analytics.js]] - handle the /events routes
* [[Auth.js|Auth.js]] - Auth object, created to hold config/master/user information for requests
* [[batch.js|batch.js]] - batch handling implemented for PromiseRouter
* [[cache.js|cache.js]] - simple caching for the app and user sessions
* [[classes.js|classes.js]] - handle the /classes routes
* [[Config.js|Config.js]] - Config object, storage for the application configuration and some router information
* [[crypto.js|crypto.js]] - uses bcrypt for password hashing and comparison
* [[DatabaseAdapter.js|DatabaseAdapter.js]] - Interface for allowing the underlying database to be changed
* [[ExportAdapter.js|ExportAdapter.js]] - DatabaseAdapter for MongoDB (default)
* [[facebook.js|facebook.js]] - helper functions for accessing the Graph API
* [[files.js|files.js]] - handle the /files routes
* [[FilesAdapter.js|FilesAdapter.js]] - Interface for allowing the underlying file storage to be changed
* [[functions.js|functions.js]] - handle the /functions routes
* [[GridStoreAdapter.js|GridStoreAdapter.js]] - FilesAdapter for storing uploaded files in GridStore/MongoDB (default)
* [[installations.js|installations.js]] - handle the /installations routes
* [[middlewares.js|middlewares.js]] - Express middleware used during request processing
* [[PromiseRouter.js|PromiseRouter.js]] - PromiseRouter uses promises instead of req/res/next middleware conventions
* [[push.js|push.js]] - handle the /push route (not yet implemented)
* [[rest.js|rest.js]] - main interface for REST operations
* [[RestQuery.js|RestQuery.js]] - RestQuery encapsulates everything needed for a 'find' operation from REST API format
* [[RestWrite.js|RestWrite.js]] - RestWrite encapsulates everything needed for 'create' and 'update' operations from REST API format
* [[roles.js|roles.js]] - handle the /roles routes
* [[Schema.js|Schema.js]] - Schema handles schema validation, persistence, and modification.
* [[sessions.js|sessions.js]] - handle the /sessions and /logout routes
* [[testing-routes.js|testing-routes.js]] - used by internal Parse integration tests
* [[transform.js|transform.js]] - transforms keys/values between Mongo and Rest API formats.
* [[triggers.js|triggers.js]] - cloud code methods for handling database trigger events
* [[users.js|users.js]] - handle the /users and /login routes

---

### Community links:

* Heroku: https://github.com/ParsePlatform/parse-server/wiki/Deploying-Parse-Server#deploying-to-heroku-and-mongolab or use the Heroku Button @ https://github.com/ParsePlatform/parse-server-example
* AWS: http://mobile.awsblog.com/post/TxCD57GZLM2JR/How-to-set-up-Parse-Server-on-AWS-using-AWS-Elastic-Beanstalk
* Tutorial on deploying MongoDB to EC2: https://www.mongodb.com/migrate-from-parse-to-mongodb-cloud-manager-and-aws
* Digital Ocean tutorial: https://www.digitalocean.com/community/tutorials/how-to-run-parse-server-on-ubuntu-14-04
* Google App Engine: https://medium.com/@justinbeckwith/deploying-parse-server-to-google-app-engine-6bc0b7451d50
* Google Cloud Platform: https://cloud.google.com/nodejs/resources/frameworks/parse-server
* Microsoft Azure: https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/
* A docker image for running parse-server quickly:  https://hub.docker.com/r/instainer/parse-server
* IBM Bluemix + Compose: https://developer.ibm.com/clouddataservices/2016/01/29/parse-on-ibm-bluemix/
* Kontena: http://blog.kontena.io/how-to-install-and-run-private-parse-server-in-production/
* Pivotal Web Services: https://github.com/cf-platform-eng/pws-parse-server
* A module for emulating hosted cloud code behavior and modules: https://github.com/flovilmart/parse-anywhere
* Migration tool for Push Notifications to OneSignal: https://onesignal.com/parse
* (French) A guide for deploying on Docker: https://medium.com/@DidierFranc/parse-com-ferme-parse-s-ouvre-cd426118fbbd
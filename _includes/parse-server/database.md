# Database

Parse Server uses [MongoDB](https://www.mongodb.org/) as the database for your application. If you have not used MongoDB before, we highly recommend familiarizing yourself with it first before proceeding.

The Mongo requirements for Parse Server are:

* MongoDB version 2.6.X or 3.0.X
* The [failIndexKeyTooLong](https://docs.mongodb.org/manual/reference/parameters/##param.failIndexKeyTooLong) parameter must be set to `false`.
* An SSL connection is recommended (but not required).
* We strongly recommend that your MongoDB servers be hosted in the US-East region for minimal lantecy.

If this is your first time setting up a production MongoDB instance, we recommend using either [mLab](http://www.mLab.com) or [ObjectRocket](https://objectrocket.com/). These are database-as-a-service companies which provide fully managed MongoDB instances, and can help you scale up as needed.

If you are migrating an existing Parse app to a MongoDB instance that isn't backed by WiredTiger or RocksDB, a good rule of thumb is to assume you will need 10X the space you currently are using with Parse.

When using MongoDB with your Parse app, there are some differences with the hosted Parse database:

* You need to manage your indexes yourself. Hosted Parse automatically adds indexes based on the incoming query stream.
* You need to size up your database as your data grows.

If you are planning to run MongoDB on your own infrastructure, we highly recommend using the [RocksDB Storage Engine](https://github.com/ParsePlatform/parse-server/wiki/MongoRocks).


### Why do I need to set failIndexKeyTooLong=false?

MongoDB only allows index keys that are 1024 bytes or smaller. If a write operation attempts to store a value greater than 1024 bytes in size to a field that has been indexed, it will fail with an error. Due to how Parse dynamically indexes collections based on query traffic, we inevitably have indexed some fields with values larger than 1024 bytes. To avoid random write errors, we configured "failIndexKeyTooLong=false" on our databases, and accept the write even if the field is indexed. A side effect of this is that data with fields larger than 1024 bytes will appear to be "missing" depending on which index is selected by the MongoDB query planner.

Customers migrating their data only need to configure this parameter if they have indexed fields larger than 1024 bytes in size *and* they have collections larger than 1 million documents. For smaller apps, we will automatically clean up offending indexes during the migration. Larger apps should follow these steps as a best practice:

1. Configure `failIndexKeyTooLong=false` on the destination database
2. Migrate all data per the [migration](https://parse.com/migration) guide.
3. Evaluate all existing indexes and drop indexes for fields with data larger than 1024 bytes. The number of fields and indexes will depend entirely on the nature of your application and its data.
4. Configure `failIndexKeyTooLong=true` on the database

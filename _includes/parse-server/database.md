# Database

Parse Server let you use [MongoDB](https://www.mongodb.org/) or [Postgres](https://www.postgresql.org/) as a database.

The prefered database is MongoDB but Postgres is a great option if you're starting a new project and you expect to have a stable Schema.

## MongoDB

If you have not used MongoDB before, we highly recommend familiarizing yourself with it first before proceeding.

The Mongo requirements for Parse Server are:

* MongoDB version 2.6.X, 3.0.X, or 3.2.X
* An SSL connection is recommended (but not required).

If this is your first time setting up a production MongoDB instance, we recommend using either [mLab](http://www.mLab.com) or [ObjectRocket](https://objectrocket.com/). These are database-as-a-service companies which provide fully managed MongoDB instances, and can help you scale up as needed.

When using MongoDB with your Parse app, you need to manage your indexes yourself. You will also need to size up your database as your data grows.

If you are planning to run MongoDB on your own infrastructure, we highly recommend using the [RocksDB Storage Engine](#using-mongodb--rocksdb).

In order to allow for better scaling of your data layer, it is possible to direct queries to a mongodb secondary for read operations.  See: [Mongo Read Preference](#using-mongodb-read-preference).

## Postgres

The Posgres requirements for Parse Server are:

* Postgres version 9.5
* PostGIS extensions 2.3

The postgres database adapter will be automatically loaded when you pass a valid postgres URL, for example: `postgres://localhost:5432`.

### Caveats

* Join tables are resolved in memory, there is no performance improvements using Postgres over MongoDB for relations or pointers.
* Mutating the schema implies running ALTER TABLE, therefore we recommend you setup your schema when your tables are not full.
* Properly index your tables to maximize the performance.

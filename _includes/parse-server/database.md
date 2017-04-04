# Database

Parse Server uses [MongoDB](https://www.mongodb.org/) as the database for your application. If you have not used MongoDB before, we highly recommend familiarizing yourself with it first before proceeding.

The Mongo requirements for Parse Server are:

* MongoDB version 2.6.X, 3.0.X, or 3.2.X
* An SSL connection is recommended (but not required).

If this is your first time setting up a production MongoDB instance, we recommend using either [mLab](http://www.mLab.com) or [ObjectRocket](https://objectrocket.com/). These are database-as-a-service companies which provide fully managed MongoDB instances, and can help you scale up as needed.

When using MongoDB with your Parse app, you need to manage your indexes yourself. You will also need to size up your database as your data grows.

If you are planning to run MongoDB on your own infrastructure, we highly recommend using the [RocksDB Storage Engine](#using-mongodb--rocksdb).

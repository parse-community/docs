# Using MongoDB + RocksDB

## MongoRocks: What and Why?

**Quick Version**

Parse has been using MongoDB on RocksDB (MongoRocks) for application data since [April, 2015](http://blog.parse.com/announcements/mongodb-rocksdb-parse/). If you are migrating your Parse app(s) to your own MongoDB infrastructure, we recommend using MongoRocks to take advantage of the increased performance, greater efficiency, and powerful backup capabilities offered by the RocksDB storage engine.

**Long Version**

In version 3.0, MongoDB introduced the storage engine API to allow users an alternative to the default memory mapped (MMAP) storage engine used by earlier versions of MongoDB. In 2015, Facebook developed a RocksDB implementation of the storage engine API, MongoRocks, which is used by Parse for all customer data. RocksDB is an embeddable persistent key-value store developed by Facebook. It uses a [Log-structured Merge Tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree) (LSM) for storage and is designed for high write throughput and storage efficiency.

### Improved Performance and Efficiency

When Parse switched from MMAP to MongoRocks, we discovered the following benefits in our [benchmarking](http://blog.parse.com/learn/engineering/mongodb-rocksdb-writing-so-fast-it-makes-your-head-spin/):

- 50x increase in write performance
- 90% reduction in storage size
- significantly reduced latency on concurrent workloads due to reduced lock contention

### Simple and efficient hot backups

In addition to performance gains, a major advantage of MongoRocks (and RocksDB in general) is very efficient backups that do not require downtime. As detailed in this [blog post](http://blog.parse.com/learn/engineering/strata-open-source-library-for-efficient-mongodb-backups/), RocksDB backups can be taken on a live DB without interrupting service. RocksDB also supports incremental backups, reducing the I/O, network, and storage costs of doing backups and allowing backups to run more frequently. At Parse, we reduced DB infrastructure costs by more than 20% by using MongoRocks, the Strata backup tool, and Amazon S3 in place of MMAP and EBS Snapshots.

### Are there any reasons not to use MongoRocks?

Generally speaking, MongoRocks was suitable for running all app workloads at Parse. However, there are some workloads for which LSM are not ideal, and for which better performance may be achieved with other storage engines like MMAP or WiredTiger, such as:

- Applications with high number of in-place updates or deletes. For example, a very busy work queue or heap.
- Applications with queries that scan many documents *and* fit entirely in memory.

It's difficult to make precise statements about performance for any given workload without data. When in doubt, run your own benchmarks. You can use the [flashback](https://github.com/ParsePlatform/flashback) toolset to record and replay benchmarks based on live traffic.

## Installation

To use MongoRocks, you will need to use a special build of MongoDB that has the storage engine compiled in. For this, we recommend you use the Percona builds located [here](https://www.percona.com/downloads/percona-server-mongodb/LATEST/). These builds are 100% feature compatible with MongoDB, but have been compiled to include the RocksDB storage engine. Distributions of MongoDB 3.0 found on the MongoDB website do not have this by default.

### Ubuntu installation

```sh
$ curl -s -O https://www.percona.com/downloads/percona-server-mongodb/percona-server-mongodb-3.0.8-1.2/binary/debian/trusty/x86_64/percona-server-mongodb-3.0.8-1.2-r97f91ef-trusty-x86_64-bundle.tar
$ tar -xf percona-server-mongodb-3.0.8-1.2-r97f91ef-trusty-x86_64-bundle.tar
$ sudo dpkg -i percona-server-mongodb-*
```

### Configuration

Configuring MongoDB to use the RocksDB storage engine is a matter of setting a few flags in the mongodb.conf file. For complete documentation of all MongoDB configuration options, visit the MongoDB reference page for [Configuration File Options](https://docs.mongodb.org/v3.0/reference/configuration-options/).

First, set the storage engine parameter to instruct MongoDB to use the RocksDB storage engine.

```
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
  engine: rocksdb
```

Next, some additional parameters. 

```
# RockDB tuning parameters
# Yield if it's been at least this many milliseconds since we last yielded.
setParameter = internalQueryExecYieldPeriodMS=1000
# Yield after this many "should yield?" checks.
setParameter = internalQueryExecYieldIterations=100000
```

The adjustments to the internalQueryExecYield\* options reduce the frequency that MongoDB yields for writers. Since RocksDB has document level locking, frequent yielding is not necessary.

### Startup

When starting MongoRocks on a host for the very first time, your storage directory (e.g. /var/lib/mongodb) should be empty. If you have existing data from other storage engines (i.e. MMAP or WiredTiger), you should back up and remove those data files, as the storage formats are not compatible.

### Migrating existing data to MongoRocks

The data files used by MMAP, WiredTiger, and RocksDB are not compatible. In other words, you cannot start MongoRocks using existing MMAP data. To change storage formats, you must do one of the following:

1. Do a logical export and import using [mongodump](https://docs.mongodb.org/v3.0/reference/program/mongodump/) and [mongorestore](https://docs.mongodb.org/manual/reference/program/mongorestore/).
2. Perform an initial sync of data using replication

Option 2 is the easiest, as you can bring a new, empty node online and add it to the replica set without incurring downtime. To do so:

1. Provision a new node configured for RocksDB, following the above steps.
2. Add the node to your replica set using [rs.add()](https://docs.mongodb.org/v3.0/reference/method/rs.add/)
3. Wait for initial sync. Note that your data sync must complete before the oplog window expires. Depending on the size of your data, you may need to [resize your oplog](https://docs.mongodb.org/v3.0/tutorial/change-oplog-size/)

### Try before you buy

It can be useful to try out a new storage engine before committing to it entirely. Fortunately, MongoDB makes this very easy with replication and its backwards-compatible oplog. If you've already migrated your Parse app to a MongoDB replica set with MMAP, you can easily add MongoRocks nodes to your configuration and try them out without switching over completely. You can even temporarily elect your MongoRocks node as primary and revert back if you are unhappy with the results.

## Best Practices for Larger Parse Apps

* RocksDB is designed to take advantage of multiple cores and fast storage. We recommend running MongoRocks on I/O-oriented hardware with SSDs, such as the **i2.2xlarge** on Amazon AWS, or comparable hardware.
* For high availability, run with at least three replicas, or at least two replicas and an arbiter to break ties. For more information on elections, click [here](https://docs.mongodb.org/manual/core/replica-set-elections/#replica-set-elections).
* Configure backups using strata on at least one node in your replica set. Ideally, the backup runs on your secondary nodes but this can be done on a primary if I/O and CPU are not significantly constrained.

## Backups

### Installing strata

Strata is written in go. It requires go 1.4 or later to compile. You can use apt or yum to install go, but these packages are frequently out of date on common distributions. To install a more recent version of go:

```sh
$ curl https://storage.googleapis.com/golang/go1.5.3.linux-amd64.tar.gz | sudo tar xzf - -C /usr/local
$ sudo mkdir /go
$ sudo chmod 0777 /go
```

You will need to add go to your *PATH* environment variable and set GOPATH. On ubuntu, this is as simple as:

```sh
$ echo -e 'export PATH="/usr/local/go/bin:${PATH}:" \nexport GOPATH=/go' | sudo tee /etc/profile.d/gopath.sh
```

After logging in again, you can test that go is installed by running

```sh
$ go version
go version go1.5.3 linux/amd64
```

### Installing strata

With go installed, compiling and installing strata is simply a matter of using `go install`:

```sh
$ go get github.com/facebookgo/rocks-strata/strata/cmd/mongo/lreplica_s3storage_driver/strata
$ go install github.com/facebookgo/rocks-strata/strata/cmd/mongo/lreplica_s3storage_driver/strata
```

This installs the strata binary to `$GOPATH/bin/strata`

### Configuring backups

At Parse, we deployed strata using a simple distributed cron on all backup nodes. You can find a sample cron and and schedule [here](https://github.com/facebookgo/rocks-strata/blob/master/examples/backup/run.sh) in the rocks-strata repository.

At a high level, the three things you want to do regularly when running backups with strata are:

1. Run `strata backup` to create the actual backup. This stores the data files and backup metadata in S3, identified by a unique replica ID. Each host must have its own replica ID. For example, if your RS is named "mydata" and your host name is "db1", you might use "mydata-db1" as your replica ID.
2. Run `strata delete` to prune metadata for backups older than a certain date. The retention period that you specify is dependent on your needs.
3. Run `strata gc` to delete data files that are orphaned by `strata delete`.

### Displaying backups

You can view backup metadata at any time with `strata show backups`:

For example, to see all backups for node *db1* in replica set *mydb*, you would run something like this:

```sh
$ strata --bucket=mybucket --bucket-prefix=mongo-rocks show backups --replica-id=mydb-db1

ID   data                      num files   size (GB)   incremental files   incremental size   duration
0    2015-09-02 21:11:20 UTC   4           0.000005    4                   0.000005           187.929573ms
```

More documentation on strata, including how to restore backups, can be found [here](https://github.com/facebookgo/rocks-strata).
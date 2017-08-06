# Using MongoDB + RocksDB

### Provisioning

We recommend you run MongoDB in replica set mode, with at least three nodes for availablity. Each node should run in a separate Availability Zone.

### Configuring Storage

 - Formatting data volumes with the XFS filesystem is strongly recommended.

### Configuration

#### MongoDB 3.0

Configuring MongoDB to use the WireTiger storage engine is a matter of setting a few flags in the mongodb.conf file. For complete documentation of all MongoDB configuration options, visit the MongoDB reference page for [Configuration File Options](https://docs.mongodb.com/v3.0/reference/configuration-options/).

First, set the storage engine parameter to instruct MongoDB to use the WiredTiger storage engine.

```
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
  engine: wiredTiger
```

### Startup

When starting MongoDB with WiredTiger on a host for the very first time, your storage directory (e.g. /var/lib/mongodb) should be empty. If you have existing data from other storage engines (i.e. MMAP or MongoRocks), you should back up and remove those data files, as the storage formats are not compatible.

## Backups

If taking snapshots ensure that the journal lives on the same volume as the data files for WiredTiger.

From the MongoDB Manual:

 > Snapshotting with the journal is only possible if the journal resides on the same volume as the data files, so that one snapshot operation captures the journal state and data file state atomically.

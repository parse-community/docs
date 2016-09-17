# Audience

This guide is primarily targeted towards Parse IoT SDK users that want to understand how the PPNS protocol works so they can develop a compatible PPNS server. This guide is generally not useful for non-IoT Parse users.

# Overview

Parse Push Notification Service (PPNS) is a push notification service for Android and IoT devices maintained by Parse. This service will be [retired](http://blog.parse.com/announcements/moving-on/) on January 28, 2017 like other Parse services.

This page documents the PPNS protocol for users that wish to create their own PPNS-compatible server. This is primarily useful for users of the Parse IoT SDKs that want to create a PPNS-compatible server for their IoT devices.

Most current Parse Android apps use Google Cloud Messaging (GCM) for push, rather than PPNS, so this guide is not relevant to most Parse Android apps. For guidelines how how to migrate Android apps using GCM to another service, see our [push migration guide](https://github.com/ParsePlatform/parse-server/wiki/Push).

# Protocol

The PPNS protocol is a simple push protocol that encapsulates messages in newline-delimited JSON strings and runs over a TLS socket. The current server address used by PPNS clients is push.parse.com:443. PPNS users will have to update their clients to connect to a different address by the time PPNS is retired.

## Message Format

Both clients and servers communicate with each other in messages. Each message is a single line of compacted JSON. For instance, here is an example push message:

`{"data":{"alert":"demo push 1"},"push_id":"ZX1JVl5ael","time":"2016-02-16T22:00:00.000Z"}`

Messages are terminated with a newline character (`\n`).

## Message Types

There are three types of messages: handshake messages, push messages, and ping/pong messages.

### Handshake Message

The handshake message is always the first message sent on the socket. It is sent from the client to the server. The handshake message contains the following information:

```
{
  "oauth_key": PARSE_APP_ID,
  "v": SDK_VERSION,
  "installation_id": INSTALLATION_ID,
  "last": LAST_TIME_SEEN
}
```

* `PARSE_APP_ID` is the 40-character app ID string listed on your app's Security and Keys page.
* `SDK_VERSION` is the SDK version associated with this request. Android devices should use "a" followed by the version (like "a1.4.1") and IoT devices should use "e" followed by the IoT SDK version (like "e1.0.0").
* `INSTALLATION_ID` is the 36-character installation ID associated with app's current installation object (the `installationId` field in the current `ParseInstallation` object).
* `LAST_TIME_SEEN` is the timestamp of the last push seen by this device. If no pushes were seen in the past, then omit this field from the handshake.

### Push Message

Push messages are sent from the server to the client to indicate a push notification. A push message has these fields:

```
{
  "data": PUSH_DATA,
  "push_id": PUSH_ID,
  "time": TIMESTAMP
}
```

* `PUSH_DATA` is a JSON dictionary containing the push payload. For instance, this could be `{"alert": "hello world!"}`.
* `PUSH_ID` is a 10-character unique alphanumeric string identifier associated with this push notification. This can be used by client SDKs to de-deuplicate pushes.
* `TIMESTAMP` is a string signifying the time the push was sent with millisecond precision in ISO8601 format, like `"2016-02-16T22:00:00.000Z"`. The timestamp should be in the UTC time zone.

The client should persist the greatest `TIMESTAMP` seen and send that timestamp in the `last` field of the next handshake message to let the server know that all message associated with earlier timestamps have been seen by the client.

### Ping/Pong Messages

Ping/pong messages are keep-alive messages that are sent to determine whether the connection is still healthy. This is essential for mobile devices establishing long-lived connections since mobile devices generally connect to servers through a NAT device (whether a consumer router when connecting over WiFi, or a [CGN](https://en.wikipedia.org/wiki/Carrier-grade_NAT) when connecting over a cell network). NAT devices generally purge long-lived connections from their NAT tables after some period of inactivity, so sending periodic keep-alive messages is necessary to keep the long-lived connection alive in the NAT table.

A ping is an empty JSON dictionary `{}` sent from the client to the server.

When a server receives a ping, it responds with a pong, which is another empty JSON dictionary `{}`.

In the Android SDK, the client sends a ping message to the server every 15 minutes using a [coalesced timer](http://developer.android.com/reference/android/app/AlarmManager.html) that wakes the device from sleep if necessary.

## Data Flow

The flow of messages on a PPNS connection is as follows:

1. The client establishes a TLS connection over TCP to the PPNS server (currently push.parse.com:443).
2. The client sends a handshake message to the server.
3. The server examines the "installation_id" and "last" fields in the handshake messages. If any pushes for this installation_id occurred since the "last" timestamp in the handshake, the server sends those notifications to the client in separate push messages.
4. Whenever the server receives a push notification associated with this connection's installation id, it sends a push message encapsulating the notification to the server.
5. Periodically, the client sends a ping message to the server to test whether the connection is alive. If the server does not respond with a pong after some period of time, then the client tears down the connection and attempts to reconnect after some delay.

Reconnection to the PPNS server should occur after some random delay to avoid swamping the server with [stampeding herds](https://en.wikipedia.org/wiki/Thundering_herd_problem) of connection attempts. It is suggested that clients reconnect using [exponentially increasing delays](https://en.wikipedia.org/wiki/Exponential_backoff) (up to some maximum delay) and add some degree of randomization to the reconnect interval.

## Example Connection

Here is the transcript of an example PPNS connection. `<` signifies a line of JSON sent from client to server. `>` signifies a line of JSON sent from server to client.

```
(1) < {"installation_id":"7091d74b-9fd6-4af5-92d6-7064bb4df82a","oauth_key":"nfFNZULwvK2PJnkfeGE22hapc55LopZA7XFKrXPl","v":"e1.0.0","last":"2016-02-08T01:00:30.123Z"}
(2) > {"data":{"alert":"queued push 1"},"push_id":"HT4puYKYjU","time":"2016-02-07T22:00:00.000Z"}
(3) > {"data":{"alert":"push 2"},"push_id":"8RkhQGHCtd","time":"2016-02-10T03:00:00.000Z"}
(4) < {}
(5) > {}
(6) > {"data":{"alert":"push 3"},"push_id":"mz7VAt6YtS","time":"2016-02-10T22:10:30.000Z"}
(7) < {}
(8) No response from server. Client terminates connection and reconnects after some time interval.
```

Notes on the example:

1. This is an example handshake message.
2. The server has stored one push since the `last` time sent in the handshake, and sends it to the client after receiving and parsing the handshake.
3. After some period of time, the server receives a push event associated with this installation ID and forwards it to the client in another push message.
4. Periodically, the client tests the validity of the connection using a ping message.
5. If the connection is healthy, the server responds with a pong message in a timely manner.
6. After another period of time, the server receives a push event associated with this installation ID and forwards it to the client in another push message.
7. The client sends a ping again to test the validity of the connection.
8. Since the server doesn't respond to the ping in a timely manner, the client knows this connection is dead and reconnects after some time interval.

# Example Clients and Servers

The [parsepush](https://github.com/daaku/parsepush) repository contains an example PPNS client that implements most of the protocol outlined above.

There is currently no example server, but it should not be hard to create a server from the above description of the wire protocol.
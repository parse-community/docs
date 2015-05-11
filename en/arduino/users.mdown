# Users and Sessions

At the core of many apps, there is a notion of user accounts that lets users access their information in a secure manner. In our other SDKs, we provide a specialized user class that automatically handles much of the functionality required for user account management. Users are a special class of Parse Objects and has all the same features, such as flexible schema, automatic persistence, and a key value interface.

The Arduino SDK does not provide methods to directly sign in as a user. If you want to have the Arduino device act on behalf of a user, you will need to [create a Session through a companion app](/docs/ios#sessions) or another Parse SDK and pass a Restricted Session to the device. You can read more about users in our [REST API](/docs/rest#users) or one of our other [SDK guides](/docs).

## Setting a Session

Once you have created a Restricted Session via the companion app or through the REST API, you can send the Session Token to the Arduino using push notifications, BLE, or some other appropriate method. After that, you can set it:

```cpp
Parse.setSessionToken("r:olqZkbv8fefVFNjWegyIXIggd");
```

From then on, the device will act on behalf of the user.

## Security

Parse uses ACLs to make sure objects can be accessed by users who are authorized with access. When creating objects, you can set the ACL field of the object to restrict access to a set of users. Read about this and more in the [REST API documentation](/docs/rest#users-security).

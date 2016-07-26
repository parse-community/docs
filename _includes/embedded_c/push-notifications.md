# Push Notifications

Using Push Notifications, you'll be able to send realtime notifications to your device. This can be triggered by changes in your data, custom code in Cloud Code, a companion mobile app, and much more.

## Installations

Every Parse application installed on a device registered for push notifications has an associated Installation object. The Installation object is where you store all the data needed to target push notifications. For example, you could send a connected thermostat a push to change the desired temperature.

There are two ways to create an installation in conjunction with your hardware device. You can generate an installation ID (random lowercase UUID) elsewhere (e.g. phone), send that to your hardware device during initial provisioning, then set the installation ID on the hardward device:

```cpp
char data[] = "ab946c14-757a-4448-8b77-69704b01bb7b";
parseSetInstallationId(client, data);
```

The installation ID is a unique identifier for the device, so you should make sure to assign different installation IDs to different devices (i.e. your UUID generator has enough randomness). After you do the above, the device will automatically create an Installation object with this installation ID.

If you do not pass in an installation ID, the SDK will automatically generate an installation ID for you, and create an Installation object with it upon the first request sent to Parse. There are several events that will trigger this:`parseGetInstallationId`,`parseSetSessionToken`,`parseSendRequest`, and`parseStartPushService`.

You can retrieve your installation ID with the`parseGetInstallationId` function:

```cpp
char* installation_id = parseGetInstallationId(client);
```

The installation ID is persisted across reboots.

The Installation class has several special fields that help you manage and target devices. The relevant ones for embedded devices are:

*   `channels`: An array of the channels to which a device is currently subscribed.
*   `deviceType`: The type of device, "ios", "android", "winrt", "winphone", "dotnet", or “embedded” (readonly).
*   `installationId`: Universally Unique Identifier (UUID) for the device used by Parse. It must be unique across all of an app's installations.(readonly).
*   `appName`: The display name of the client application to which this installation belongs.
*   `appVersion`: The version string of the client application to which this installation belongs.
*   `parseVersion`: The version of the Parse SDK which this installation uses.

## Subscribing to Pushes

In order to subscribe to push notifications, you'll need to start the push service and define how your device will handle a push when it is received.

First, we define the push callback function:

```cpp
void myPushCallback(ParseClient client, int error, const char *buffer) {
	if (error == 0 && buffer != NULL) {
		printf("push: '%s'\n", buffer);
	}
}
```

Then, we set the callback and start the push service loop:

```cpp
parseSetPushCallback(client, myPushCallback);
parseStartPushService(client);
parseRunPushLoop(client);
```

In cases where there is already an explicit application loop, we can integrate push into it using a file handle obtained with the`parseGetPushSelectHandle` function. Then we call the`parseProcessNextPushEvent` function on each iteration of the loop (not only when there is data on the file descriptor). The`parseProcessNextPushEvent` function will call the push callback if there is a new push message.

To do this we must first include the respective libraries:

```cpp
#include <sys/time.h>
```

Then add the following logic to your method:

```cpp
// ...
parseSetPushCallback(client, myPushCallback);
parseStartPushService(client);
int socket = parseGetPushSocket(client);
while(1) {
	struct timeval tv;
	fd_set receive, send, error;

	// tv_sec defines the interval at which the method is executed.
	// The lower the value the more responsive it will be to notifications.

	tv.tv_sec = 10;
	tv.tv_usec= 0;
	FD_ZERO(&receive);
	FD_ZERO(&send);
	FD_ZERO(&error);
	FD_SET(socket, &error);
	FD_SET(socket, &receive);
	select(socket + 1, &receive, &send, &error, &tv);

	// ...

	parseProcessNextPushNotification(client);
}
```

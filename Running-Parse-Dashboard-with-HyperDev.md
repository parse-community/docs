This document will outline how to get Parse Dashboard up and running on HyperDev.

## Prerequisites

 - A publically-available Parse Server installation (see: [Running Parse Server with HyperDev and mLab](Running-Parse-Server-with-HyperDev-and-mLab.md))

## Step 1: Creating a parse-dashboard application on HyperDev

[HyperDev](https://hyperdev.com) provides a great way to instantly create and deploy Node.js applications for free.  We will use it to run a simple node app that uses the [parse-dashboard npm package](https://www.npmjs.com/package/parse-dashboard).

Access hyperdev.com and you'll be given a sandbox app with a random name (usually of the form ```noun-noun```).  Modify your server.js file and use the following code:


```
var express = require('express');
var ParseDashboard = require('parse-dashboard');
var http = require('http');

var dashboard = new ParseDashboard({
    apps: [
        {
            appId: process.env.APP_ID,
            masterKey: process.env.MASTER_KEY,
            serverURL: process.env.SERVER_URL,
            appName: process.env.APP_NAME,
        },
    ],
    users: [
        {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD
        }
    ]
}, true /* note: you seem to have to set allowInsecureHTTP=true, perhaps HyperDev sites are behind an HTTPS load balancer or proxy with early SSL termination? */);

var app = express();

// make the Parse Dashboard available at /
app.use('/', dashboard);

var port = process.env.PORT || 4040;
var httpServer = http.createServer(app);
httpServer.listen(port, function () {
    console.log('parse-dashboard running on port ' + port + '.');
});
```

## Step 2: Add the parse-dashboard dependency

In order to bring in the parse-dashboard npm package, modify your ```package.json``` file.  In the dependencies node, change it to look like the following (the express node should already exist):

```
...
	"dependencies": {
		"express": "^4.12.4",
		"parse-dashboard": "^1.0.0"
	}
...
```

## Step 3: Configuration

Modify your private ```.env``` file using the following template:

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

APP_ID=your_parse_server_installation_app_id
MASTER_KEY=your_parse_server_installation_master_key
SERVER_URL=your_parse_server_installation_server_url
APP_NAME=any_name_you_want
USER_NAME=username_for_accessing_dashboard
PASSWORD=password_for_accessing_dashboard

# note: .env is a shell file so there can't be spaces around '=

```

## Step 4: Testing

Once you're finished making your changes to your .env file, HyperDev will automatically build and deploy your application.  If you use the Logs feature within HyperDev (there's a Logs button), you should see this when your app is deployed:

```
Launching node server.js
parse-dashboard running on port 3000.
```

You should then be able to use the "Show" button to launch the application in the browser.  After entering in the credentials you specified in your ```.env``` file, you should be able to start exploring the Parse Dashboard and inspecting the data stored in Parse Server.
## Deploying to HyperDev and mLab

Before you start, you'll need:

 - GitHub account (for HyperDev import feature)
 - mLab account (for free MongoDB)

### Step 1: Creating your database on mLab

[mLab](https://mlab.com) provides a Database-as-a-Service for MongoDB.  They include a free tier for small sandbox databases.  Create an account on mLab and then use the Single-node, Sandbox plan to get a (free) database up and running.  Within the mLab wizard, you'll need to be sure to create a user that has access to connect to the new database.  Upon completion, you should be able to construct a Mongo DB connection string like the following:

```
mongodb://yourusername:yourpassword@yourmlabdatabaseaddress.mlab.com:yourdatabaseport/yourdatabasename
```

### Step 2: Running parse-server-example on HyperDev

[HyperDev](https://hyperdev.com) provides a great way to instantly create and deploy Node.js applications for free.  We will use it to run the [parse-server-example](https://github.com/parse-community/parse-server-example) application.

Access hyperdev.com and you'll be given a sandbox app with a random name (usually of the form ```noun-noun```).  Sign in to HyperDev using your GitHub account.   Then, use the "Advanced Options" menu to import code from GitHub.  When prompted for the repository to import, enter

```
parse-community/parse-server-example
```

Now that the import is complete, we'll need to configure the application to point to our mLab database.  Modify the ```.env``` file, which stores private environment variables.

Use the following template:

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

APP_ID=myAppId
MASTER_KEY=your_master_key_here
DATABASE_URI=mongodb://yourusername:yourpassword@yourmlabdatabaseaddress.mlab.com:yourdatabaseport/yourdatabasename

#your SERVER_URL will depend on whatever URL hyperdev/glitch gives you
SERVER_URL=https://noun-noun.glitch.me/parse

#hyperdev will only let you log to this folder
PARSE_SERVER_LOGS_FOLDER=/tmp

# note: .env is a shell file so there can't be spaces around '=
```

It is important, for this tutorial, to leave the ```APP_ID``` as ```myAppId``` as the "test" page hard-codes that and expects that value.

### Step 3: Testing

Once you're finished making your changes to your .env file, HyperDev will automatically build and deploy your application.  If you use the Logs feature within HyperDev (there's a Logs button), you should see this when your app is deployed:

```
Launching node index.js
parse-server-example running on port 3000.
```

You should then be able to use the "Show" button to launch the application in the browser and get to a page that urges you to star the parse-server GitHub repository.  To access the test harness page, add a trailing ```/test``` to your URL.  This should take you to a page that will allow you to exercise a few parts of the Parse Server Javascript SDK and create a dummy collection and record in your MongoDB.  If you're able to completes steps one through three on this test page, Parse Server is up and running.  Optionally, you can go back to mLab.com and take a look at the data that was stored by the test harness to get a feel for how Parse Server stores data in MongoDB.

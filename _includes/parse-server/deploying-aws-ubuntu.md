## Deploying on AWS EC2 Ubuntu using PostgreSQL

Here are the steps:

1. Log into your AWS account or create a new one [AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2. Go to AWS EC2 Dashboard
3. Launch Instances
4. On **Application and OS Images (Amazon Machine Image)** select `Ubuntu`
5. On **Instance Type** select `t2.micro` (is ok for testing and small projects which is Free tier eligible)
6. Create or select an existing `key pair`. (If you create a new one click `Download Key Pair`)
7. Click `Launch Instance`
8. On **EC2 Dashboard** select the new created instance and click `Security`
9. On **Security Groups**, click on the security group
10. On **Inbound Rules** tab, click `Edit Inbound Rules`
11. Click `Add rule` and select `PostgreSQL` from the dropdown menu and `Anywhere-IPv4`.
12. Click `Save rules`
13. On **EC2 Dashboard** select the new created instance and click `Connect`
14. Click `SSH Client` and follow the instructions

Once logged into the ec2 instance we perform the following tasks:

### Install Libraries and Dependencies
Update the local package manager `apt` 
```bash
sudo apt update
```
Install [NodeJS](https://nodejs.org)
```bash
sudo apt install nodejs
```
Check the install was ok, you should see the version installed.
```bash
node -v
```

Install [npm](https://www.npmjs.com)
```bash
sudo apt install npm
```

Install [yarn](https://yarnpkg.com)
```bash
sudo npm install yarn --location=global
```

### Install PostgreSQL Server

Install [PostgreSQL](https://www.postgresql.org)
```bash
sudo apt-get -y install postgresql
```
Once is installed, create a password for the user `postgres`

```bash
sudo su postgres
```

```bash
psql
```

```bash
ALTER USER postgres password 'myStrongPassword';
```

Quit psql typing `\q`

Exit postgres user typing `exit`

Navigate to main folder inside postgresql/version/
```bash
cd /etc/postgresql/14/main/
```
We need to edit two files, `pg_hba.conf` and `postgresql.conf`
```bash
sudo nano -w pg_hba.conf
```
Scroll down the file and Add `host, all, all, 0.0.0.0/0, md5`, has to be the first line before `local, all, postgres, , peer`

| TYPE | DATABASE | USER | ADDRESS | METHOD |
| ---- | -------- | ---- | ------- | ------ |
| host | all | all | 0.0.0.0/0 | md5 |
| local | all | postgres |  | peer |
{: .docs_table}

Close the file and save the changes with `Control+X` and `Y`

```bash
sudo nano -w postgresql.conf
```
Search for `#listen_addresses='localhost'`, uncomment the line and replace `localhost` for `*`

Close the file and save the changes with `Control+X` and `Y`

Restart the PostgreSQL server
```bash
sudo service postgresql restart
```

### Setup Parse Server

Create a folder called parse-server
```bash
cd ~ && mkdir parse-server && cd parse-server
```

Install Parse Server Locally
```bash
sudo yarn add parse-server
```

Edit the `package.json` file with your preferences, but do not change the start line inside the scripts.
```jsonc
{
  "name": "my-app",
  "description": "parse-server for my App",
  "scripts": {
    "start": "parse-server config.json"
  },
  "dependencies": {
    "parse-server": "^5.2.1"
  }
}

```
Close the file and save the changes with `Control+X` and `Y`

After that, we need to create a configuration file, use your own `appId`, `masterKey` and `clientKey`, use random strings or some generator tool to create secured keys.

```bash
sudo nano -w config.json
```

```jsonc
{
  "appId": "exampleAppId",
  "masterKey": "exampleMasterKey",
  "appName": "MyApp",
  "serverURL": "http://<IP_OR_DOMAIN>",
  "mountPath": "/parse",
  "publicServerURL": "http://<IP_OR_DOMAIN>",
  "databaseURI": "postgres://postgres:myStrongPassword@localhost:5432/postgres"
}
```
Close the file and save the changes with `Control+X` and `Y`

This are the basic options of the `config.json` file, for the full list you can type `parse-server --help` or refer to the [full options document](https://parseplatform.org/parse-server/api/5.2.0/ParseServerOptions.html) for more details.


Start Parse Server using the script command in the package.json
```bash
npm start
```

Check if Parse Server is running typing `http://<IP_OR_DOMAIN>:1337` in your browser's address bar, you should see `{"error":"unauthorized"}`, that means the server is running.

To daemonized parse-server to keep it running and alive all the time, you can use the package [PM2](https://pm2.keymetrics.io).

Shutdown Parse Server pressing `Control+C`.

Check if PM2 is installed
 ```bash
 npm list --depth 0 --location=global pm2
 ``` 
If the terminal shows `/usr/lib/(empty)`, means that PM2 is not installed, procced to install PM2 package globally
```bash
sudo npm install pm2 --location=global
```
Add Parse Server to PM2
 ```bash
pm2 start npm --name "parse-server" -- start
``` 
Save and syncronize this list
```bash
pm2 save
``` 

### Setup Parse Dashboard

Install Parse Dashboard globally
```bash
sudo npm install --location=global parse-dashboard
```

Once installed, you need to configure Parse Dashboard, go to `/usr/lib/node_modules/parse-dashboard/Parse-Dashboard/` and edit the file `parse-dashboard-config.json`
```bash
sudo nano -w parse-dashboard-config.json
```
This is an example of `parse-dashboard.config.json`.
```jsonc
{
	"apps": [{
		"serverURL": "http://example.com:1337/parse",
		"appId": "exampleAppId",
		"masterKey": "exampleMasterKey",
		"allowInsecureHTTP": "true",
		"appName": "MyApp"
	}],
	"users": [{
		"user": "admin",
		"pass": "password"
	}]
}
```

Start Parse Dashboard
```bash
parse-dashboard
```

Check if Parse Dashboard is running typing `http://<IP_OR_DOMAIN>:4040` in your browser's address bar, you should see the login form, use the `user` and `pass` that you set in the `parse-dashboard-config.json` file.

Shutdown Parse Dashboard pressing `Control+C`.

Add Parse Dashboard to the process manager PM2
```bash
pm2 start parse-dashboard
``` 
 Save and syncronize PM2 list
```bash
pm2 save
``` 

Adding Parse Server and Parse Dashboard to PM2, will ensure that if the server restarts or reboot for some reason, this two apps will be relaunched automatically.
PM2 stores the logs in a subfolder called `logs` where the apps are. To sneak peek the logs you can run `pm2 logs` in the terminal.

Note: if you are using a secure certificate in your host, be sure to modify the urls related to your configuration in the examples above from `http` to `https`.
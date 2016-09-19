# Overview

Parse Server is an open source version of the Parse backend that can be deployed to any infrastructure that can run Node.js. You can find the source on the [GitHub repo](https://github.com/ParsePlatform/parse-server).

* Parse Server is not dependent on the hosted Parse backend.
* Parse Server uses MongoDB directly, and is not dependent on the Parse hosted database.
* You can migrate an existing app to your own infrastructure.
* You can develop and test your app locally using Node.

## Prerequisites

* Node 4.3
* MongoDB version 2.6.X or 3.0.X
* Python 2.x (For Windows users, 2.7.1 is the required version)
* For deployment, an infrastructure provider like Heroku or AWS

## Compatibility with hosted Parse

There are a few areas where Parse Server does not provide compatibility with the Parse hosted backend. If you're migrating a hosted Parse.com app to Parse Server, please take some time to carefully review the [compatibility issues](#compatibility-with-parsecom) document.

# Getting Started

The fastest and easiest way to get started is to follow our [Quick Start guide](#quick-start) to run MongoDB and Parse Server locally.

## Installation

Start using Parse Server by grabbing the npm module:

```bash
npm install -g parse-server
```

Or, you can specify "parse-server" in your `packages.json` file.

## Installation from source

If you wish to run the latest version of Parse Server from `master`:

If your project is not under version control or not configured to use npm:

```bash
git init
npm init
```

Add the "parse-"server submodule and link.

```bash
# in your root folder of your project
git submodule add  git@github.com:ParsePlatform/parse-server.git
npm link parse-server ./parse-server
```

## Updating to latest version from source

```bash
cd parse-server
git checkout master
git pull
cd ..
git commit -am 'Updates parse-server to latest version'
```

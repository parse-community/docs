# Running Parse Server for development

Normally, when you run a standalone Parse Server, the [latest release that has been pushed to npm](https://www.npmjs.com/package/parse-server) will be used. This is great if you are interested in just running Parse Server, but if you are developing a new feature or fixing a bug you will want to use the latest code on your development environment.

First, you will need to clone this repo if you haven't done so yet.

```
git clone https://github.com/ParsePlatform/parse-server.git
```

You can then link the parse-server module to the cloned repo and run `npm install`:

```
npm link parse-server path/to/cloned/repo
npm install
```

You can now start Parse Server using `npm start`:

```
npm start -- --appId APPLICATION_ID --masterKey MASTER_KEY --serverURL http://localhost:1337/parse
```

# Contributing

We really want Parse to be yours, to see it grow and thrive in the open source community. Please see the [Contributing to Parse Server notes](https://github.com/ParsePlatform/parse-server/blob/master/CONTRIBUTING.md).

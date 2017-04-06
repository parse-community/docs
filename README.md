# Parse Docs

These are the markdown sources for all of the [Parse SDK guides](https://parse-community.github.io/#sdks). The content for the guides is stored in this repo, and we use Jekyll to generate a static site that is hosted on GitHub Pages.

## Repository Structure

The guides are organized by platform. Each platform directory contains a set of markdown files, one for each main section in the guide.

    .
    ├── {platform}
    │   └── {section}
    └── common
        └── {section}

For example, `/ios/` contains all of sections for the iOS guide. There is also a `common` folder that contains content that is shared amongst all of the guides. It helps us avoid duplicating content unnecessarily.

## Can I Access The Docs Offline?

This repository is public and all the files are in markdown. If you'd like to keep a copy locally, please do!

## How Do I Contribute?

If you have any fixes or suggestions, simply send us a pull request!

### Running The Site Locally

You will need Ruby, [Bundler](http://bundler.io/), and npm.

Clone this repository, then install Jekyll and node packages:

```
bundle install
npm install
```

Then run webpack and Jekyll:

```
npm start
```

Finally, open http://localhost:4000/docs/ in your web browser.

-----

As of April 5, 2017, Parse, LLC has transferred this code to the parse-community organization, and will no longer be contributing to or distributing this code. 

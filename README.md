# Parse Docs

These are the markdown sources for all of the [platform guides](https://parse.com/docs) of Parse. The content for the guides is stored in this repo, and we use a [Background Job](https://parse.com/docs/js/guide#cloud-code-advanced-background-jobs) to process the markdown and store it in a Parse app. The guides you see on our website are simply served from this Parse app!

## Repository Structure

The guides are organized first by language, then by platform. Each platform directory contains a set of markdown files, one for each main section in the guide.

    .
    ├── {language}
    │   └── {platform}
    │   │   └── {section}
    │   └── common
    │       └── {section}
    ├── .gitignore
    ├── tokens.json
    └── README.md

For example, `/en/ios/` contains all of sections for the iOS guide in English. You'll notice a `common` folder in each language. This folder contains content that is shared amongst all of the platforms. That helps us avoid duplicating content unnecessarily.

## How Do I Contribute?

If you have any fixes or suggestions, simply send us a pull request! Take a look at our [contribution guidelines](https://github.com/ParsePlatform/Docs/blob/master/CONTRIBUTING.md) to learn more. The [documentation](https://parse.com/docs) will be regenerated from master every Friday and as needed.

## Can I Access The Docs Offline?

This repository is public and all the files are in markdown. If you'd like to keep a copy locally, please do!

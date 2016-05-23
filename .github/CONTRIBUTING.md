# Contributing to Parse Docs

## Pull Requests Welcome!

We really want Parse to be yours, to see it grow and thrive in the open source community.

## Structure

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


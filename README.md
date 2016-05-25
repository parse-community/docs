# Parse Docs

A static site that serves Parse's documentation using Jekyll on GitHub Pages. Work in progress.

## Setup

Install Jekyll and node packages:

```
bundle install
npm install
```

## Development

Run webpack and Jekyll:

```
npm start
```

# TODO List

* Generate TOC automatically using JavaScript, as we did in original site using live_toc.js
* Autoexpand TOC as the user scrolls down, also implemented in original site.
* Implement HighlightJS for code syntax highlighting.
* Handle common lang blocks.

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

- [x] Generate TOC automatically using JavaScript, as we did in original site using live_toc.js
- [x] Autoexpand TOC as the user scrolls down, also implemented in original site.
- [ ] Can we split out `_app/main.js` into the original `core.js` and `live_toc.js` components?
- [ ] Implement HighlightJS for code syntax highlighting.
- [ ] Handle common lang blocks.
- [ ] Tokenize using tokens.json (replaces %{ParseFile} with PFFile when iOS guide is visible, ParseFile when Android file is visible )

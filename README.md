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

- [X] Generate TOC automatically using JavaScript, as we did in original site using live_toc.js
- [X] Autoexpand TOC as the user scrolls down, also implemented in original site.
- [X] Implement HighlightJS for code syntax highlighting.
- [X] Handle common lang blocks.
- [ ] Tokenize using tokens.json (replaces %{ParseFile} with PFFile when iOS guide is visible, ParseFile when Android file is visible )
- [ ] Can we split out `_app/main.js` into the original `core.js` and `live_toc.js` components?


Tokenize:
// sorta ghetto post processing to replace tokens
								Parse._.each(tokens, function(val, key) {
									var newValue = val[p];
									if (newValue === undefined) {
										newValue = val.default;
									}
									if (newValue === undefined) {
										newValue = key;
									}

									key = key.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
									var regex = new RegExp('\%\{' + key + '\}', 'g');
									processedContent = processedContent.replace(regex, newValue);
								});

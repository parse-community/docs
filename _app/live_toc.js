// https://github.com/hungrylabs/hungry/blob/master/parse/public/javascripts/pure/live_toc.js

// var UI = require('./core').UI

(function(UI, _) {
	if (!UI) {
		return;
	}

	var LiveTOC = UI.LiveTOC = function(options) {
		this.parent = options.parent;
		this.content = options.content;
		this.scrollContent = options.scrollContent || options.content;

		this.throttleInterval = options.throttleInterval || 300;
		this.alignment = options.alignment || 'center';
		this.onSelect = options.onSelect || null;

		this.currentItem = null;
		this._headerHeights = {};
		this._sortedHeights = [];

		this.render();
		if (options.parent) {
			this.attach(options.parent);
		}
		this.initializeEventHandlers();
	};

	LiveTOC.prototype = {
		initializeEventHandlers: function() {
			var throttled = _.throttle(this.handleScroll.bind(this), this.throttleInterval);

			if (this.scrollContent === document.getElementsByTagName('body')[0]) {
				document.addEventListener('scroll', throttled);
			} else {
				this.scrollContent.addEventListener('scroll', throttled);
			}
		},

		render: function() {
			// we really need this to calculate header heights
			this.scrollContent.style.position = "relative";

			// build a mapping of the table of content based on the
			// h1s and h2s in the content
			var toc = this.buildTOC();

			// add toc data
			this.node = UI.tag('ul', { className: 'ui_live_toc' }, toc);

			// calculate the cached heights of each header in the text
			$(document).ready(function(e) {
				this.updateHeights();
			}.bind(this));
		},

		// find all the h1s and h2s in the content and build the TOC elements
		buildTOC: function() {
			var headers = this.content.querySelectorAll('h1, h2, h3');
			var toc = [];
			var latestMajor, latestMinor;

			for (var i = 0; i < headers.length; i++) {
				var el = headers[i];
				var text = $(el).text();
				var anchor = el.getElementsByTagName('a')[0];
				if (anchor === undefined) {
					continue;
				}
				var name = anchor.name;

				// Build main table of contents list from h1 tags
				if (el.tagName === 'H1') {
					latestMajor = UI.tag('ul', { className: 'ui_live_toc_major_list' });
					toc.push(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_main' }, [
						UI.tag('a', { href: '#' + name }, text),
						latestMajor
					]));
					latestMinor = undefined;

				// Build collapsable sublist with h2 tags. We skip any H2s
				// that appear before the first H1.
				} else if (el.tagName === 'H2' && latestMajor !== undefined) {
					latestMinor = UI.tag('ul', { className: 'ui_live_toc_minor_list' });
					latestMajor.appendChild(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_major' }, [
							UI.tag('a', { href: '#' + name }, text),
							latestMinor
					]));

				// Build deeper collapsable sublist with h3 tags. We skip any
				// H3s that appear before the first H1 or directly after any H1
				} else if (el.tagName === 'H3' && latestMajor !== undefined && latestMinor !== undefined) {
					latestMinor.appendChild(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_minor' }, [
						UI.tag('a', { href: '#' + name }, text.toLowerCase())
					]));
				}
			}
			return toc;
		},

		// Update the internal tracking of header heights. Should be called when
		// the content changes in a way that will affect the height of headers
		updateHeights: function() {
			var headerHeights = {};
			var sortedHeights = [];
			var headers = this.content.querySelectorAll('h1, h2, h3');
			for (var i = 0; i < headers.length; i++) {
				var anchor = headers[i].getElementsByTagName('a')[0];
				var name = anchor.name;
				headerHeights[headers[i].offsetTop] = name;
				sortedHeights.push(headers[i].offsetTop);
			}
			this._headerHeights = headerHeights;
			this._sortedHeights = sortedHeights.sort(function(a,b) { return a - b; });
		},

		// find out what item to highlight in the TOC and what section
		// to collapse/expand
		handleScroll: function() {
			var fromTop = this.scrollContent.scrollTop;
			// firefox doesn't like this so we fallback to window
			if (fromTop === 0) {
				fromTop = $(window).scrollTop();
			}
			var renderedHeight = this.scrollContent.offsetHeight;

			var cur;
			if (this.alignment === 'top') {
				cur = fromTop;
			} else if (this.alignment === 'bottom') {
				cur = renderedHeight + fromTop;
			} else { // fallback to center line
				cur = renderedHeight / 2 + fromTop;
			}

			// find closest header above the current location
			var bestHeight = this._sortedHeights[0];
			for (var i = 0; i < this._sortedHeights.length; i++) {
				if (this._sortedHeights[i] > cur) {
					break; // break once we've passed current
				}
				bestHeight = this._sortedHeights[i];
			}

			var best = this._headerHeights[bestHeight];

			// only render if nothing is selected or selection has changed
			if (this.currentItem === null || this.currentItem.getAttribute('data-name') !== best) {
				// if we have a new item selected, remove current selection
				var listItems = this.node.getElementsByTagName('li');
				for (var j = 0; j < listItems.length; j++) {
					UI.removeClass(listItems[j], 'selected');
				}

				// set newly selected item and add the class
				this.currentItem = this.node.querySelector('[data-name="' + best + '"]');
				UI.addClass(this.currentItem, 'selected');

				// if the item was a minor header, also select parent (major header)
				if (UI.hasClass(this.currentItem, 'ui_live_toc_minor')) {
					UI.addClass(this.currentMajorSection(), 'selected');
				}

				// if the item was a major header or minor header, also select parent (main header)
				if (UI.hasClass(this.currentItem, 'ui_live_toc_major') ||
					UI.hasClass(this.currentItem, 'ui_live_toc_minor'))
				{
					UI.addClass(this.currentMainSection(), 'selected');
				}
			}
		},

		/* Utility functions about the state of the content & location */

		// find the current main section expanded (this is tied to H1s)
		currentMainSection: function() {
			var cur = this.currentItem;
			while (cur && !UI.hasClass(cur, 'ui_live_toc_main')) {
				cur = cur.parentElement;
			}
			return cur;
		},

		// find the current major section expanded (this is tied to H2s)
		currentMajorSection: function() {
			if (UI.hasClass(this.currentItem, 'ui_live_toc_main')) {
				return false;
			}

			var cur = this.currentItem;
			while (!UI.hasClass(cur, 'ui_live_toc_major')) {
				cur = cur.parentElement;
			}
			return cur;
		}
	};

	_.extend(LiveTOC.prototype, UI.ComponentProto);

})(UI, _);

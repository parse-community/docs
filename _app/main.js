// Sticky TOC
(function() {
  window.onscroll = window.onresize = function() {
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    var windowWidth = window.innerWidth || document.body.clientWidth;
    var toc = document.getElementById('toc');
    if (scrollPos > 250) {
      if (windowWidth > 1104) {
        toc.style.position = 'fixed';
        toc.style.left = document.getElementById('getting-started').getBoundingClientRect().left - 230 + 'px';
      } else if (windowWidth > 760) {
        toc.style.position = 'fixed';
        toc.style.left = document.getElementById('getting-started').getBoundingClientRect().left - 210 + 'px';
      }
    } else {
      toc.style.position = 'absolute';
      toc.style.left = '0';
    }
  }
})();

// core.js
(function() {

  var svgNamespace = 'http://www.w3.org/2000/svg';

  // Wrapped to provide tag vs svgTag methods
  var createElement = function(name, attr, children, svg) {
    var tag;
    if (svg) {
      tag = document.createElementNS(svgNamespace, name);
    } else {
      tag = document.createElement(name);
    }
    // We apply attributes after children so that we can set the value of
    // a select tag at render time
    if (children) {
      if (!Array.isArray(children)) {
        children = [ children ];
      }
      for (var i = 0; i < children.length; i++) {
        var node = children[i];
        if (typeof node === 'string' || typeof node === 'number') {
          node = document.createTextNode(node);
        }
        if (node) {
          // Allow falsy entries to be ignored
          tag.appendChild(node);
        }
      }
    }
    if (attr) {
      for (var a in attr) {
        if (a === 'style') {
          for (var s in attr[a]) {
            tag.style[s] = attr[a][s];
          }
        } else if (a.indexOf('data-') === 0 || svg) {
          tag.setAttribute(a, attr[a]);
        } else {
          tag[a] = attr[a];
        }
      }
    }
    return tag;
  };

  var UI = window.UI = {
    // DOM construction methods
    tag: function(name, attr, children) {
      return createElement(name, attr, children, false);
    },

    svgTag: function(name, attr, children) {
      return createElement(name, attr, children, true);
    },

    createIcon: function(icon) {
      var i = document.createElement('i');
      i.className = 'icon_' + icon;
      return i;
    },

    createTooltip: function(text, options) {
      var className = 'tooltip_wrap';
      switch (options.direction) {
        case 'left':
          className += ' to_left';
          break;
        case 'top-left':
          className += ' to_top_left';
          break;
        case 'top-right':
          className += ' to_top_right';
          break;
      }
      return UI.tag('span', { className: className }, [
        UI.tag('span', { className: 'tip' }, text)
      ]);
    },

    // DOM property methods
    hasAncestor: function(node, ancestor) {
      var cur = node.parentNode;
      while (cur) {
        if (cur === ancestor) {
          return true;
        }
        cur = cur.parentNode;
      }
      return false;
    },

    addClass: function(node, className) {
      var re = new RegExp('\\b' + className + '\\b');
      if (!node.className.match(re)) {
        node.className += ' ' + className;
      }
    },

    removeClass: function(node, className) {
      var re = new RegExp('\\s*\\b' + className + '\\b', 'g');
      node.className = node.className.replace(re, '');
    },

    toggleClass: function(node, className, add) {
      if (add === undefined) {
        add = !UI.hasClass(node, className);
      }

      if (add) {
        UI.addClass(node, className);
      } else {
        UI.removeClass(node, className);
      }
    },

    hasClass: function(node, className) {
      var re = new RegExp('\\b' + className + '\\b');
      return !!node.className.match(re);
    },

    getStyle: function(node, prop) {
      if (node.currentStyle)
        return node.currentStyle[styleProp];
      if (window.getComputedStyle)
        return document.defaultView.getComputedStyle(node, null).getPropertyValue(prop);
      return '';
    },

    documentPosition: function(node) {
      var pos = { x: 0, y: 0 };
      var cur = node;
      while (cur) {
        pos.x += cur.offsetLeft;
        pos.y += cur.offsetTop;
        cur = cur.offsetParent;
      }
      return pos;
    },

    windowPosition: function(node) {
      var pos = UI.documentPosition(node);
      pos.x -= window.scrollX;
      pos.y -= window.scrollY;
      return pos;
    },

    // DOM event methods
    delegate: function(event, parent, selector, cb) {
      if (event === 'focus' || event === 'blur') {
        // Focus and blur don't bubble
        throw 'Focus and blur delegation are not yet supported';
      }
      var matches = function() { return false; };
      if (typeof selector === 'string') {
        selector = selector.toUpperCase();
        matches = function(el) {
          return el.tagName === selector;
        };
      } else {
        if (selector.className) {
          var re = new RegExp('\\b' + selector.className + '\\b');
          matches = function(el) {
            return el.className.match(re);
          };
        } else if (selector.id) {
          matches = function(el) {
            return el.id === selector.id;
          };
        }
      }
      parent.addEventListener(event, function(e) {
        var node = e.target;
        while (node && node !== document) {
          if (matches(node)) {
            cb.call(node, e);
          }
          node = node.parentNode;
        }
      });
    },

    // formatting methods
    prettyNumber: function(num) {
      var pre;
      var places = Math.ceil(Math.log(Math.abs(num) + 1) / Math.LN10);
      if (places > 6 && places < 10) {
        pre = (num / 1e6);
        if ((pre|0) === pre || Math.round(num % 1e6 / 1e5) === 0) {
          return (pre|0) + 'M';
        } else {
          return (pre|0) + '.' + Math.round(num % 1e6 / 1e5) + 'M';
        }
      } else if (places > 5) {
        pre = (num / 1000);
        if ((pre|0) === pre || Math.round(num % 1000 / 100) === 0) {
          return (pre|0) + 'K';
        } else {
          return (pre|0) + '.' + Math.round(num % 1000 / 100) + 'K';
        }
      } else if (places > 3) {
        var post = ((num % 1000)|0);
        if (post < 10) {
          post = '00' + post;
        } else if (post < 100) {
          post = '0' + post;
        }
        return ((num / 1000)|0) + ',' + post;
      } else {
        return (num|0) + '';
      }
    },

    // animation methods
    Animate: {
      // The show and hide functions require a "transition: 'opacity' delay"
      // CSS class to be present on the element
      show: function(el, delay) {
        if (delay === 'undefined') {
          delay = 0;
        }
        el.style.display = 'block';
        el.style.opacity = 0;
        setTimeout(function() {
          el.style.opacity = 1;
        }, delay);
      },

      hide: function(el, delay) {
        if (window.getComputedStyle(el).opacity > 0) {
          if (typeof delay === 'undefined') {
            delay = 500;
          }
          el.style.opacity = 0;
          setTimeout(function() {
            el.style.display = 'none';
          }, delay);
        }
      }
    },

    // Methods inherited by components
    ComponentProto: {
      attach: function(parent) {
        if (this.node) {
          parent.appendChild(this.node);
          return this;
        }
        return null;
      },

      remove: function() {
        if (this.node && this.node.parentNode) {
          this.node.parentNode.removeChild(this.node);
          return this;
        }
        return null;
      }
    }
  };

})();

// live_toc.js
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
				// var anchor = el.getElementsByTagName('a')[0];
				// if (anchor === undefined) {
				// 	continue;
				// }
				// var name = anchor.name;
        var name = el.id;

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
				// var anchor = headers[i].getElementsByTagName('a')[0];
				// var name = anchor.name;
        var name = headers[i].id;

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

var scrollContent = document.getElementsByTagName('body')[0];

new UI.LiveTOC({
    parent: document.getElementById('toc'),
    scrollContent: scrollContent,
    content: document.getElementsByClassName('guide_content')[0]
});

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

// application.js
// Setup empty objects for organizational purposes.
// These objects will be common to both the website and the mobile website.
var App = {};
App.Models = {};
App.Models.Docs = {};
App.Models.Apps = {};
App.Collections = {};
App.Views = {};

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
			this.node = UI.tag('ul', { className: 'ui_live_toc' }, [toc]);

			// calculate the cached heights of each header in the text
			$(document).ready(function(e) {
				this.updateHeights();
			}.bind(this));
		},

		// find all the h1s and h2s in the content and build the TOC elements
		buildTOC: function() {
			var headers = this.content.querySelectorAll('h1, h2, h3');
			var latestMajor, latestMinor;
      var toc = document.createDocumentFragment();

			for (var i = 0; i < headers.length; i++) {
				var el = headers[i];
				var text = $(el).text();
        var name = el.id;

				// Build main table of contents list from h1 tags
				if (el.tagName === 'H1') {
          latestMajor = UI.tag('ul', { className: 'ui_live_toc_major_list' });
          toc.appendChild(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_main' }, [
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
				if (this.currentItem === null) {
					return;
				}
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

// docs_toggle.js
(function(UI, _) {
	if (!UI) {
		return;
	}

	if (!App.Views.Docs) {
		App.Views.Docs = {};
	}

	var Toggle = App.Views.Docs.Toggle = function(options) {
		this.parent = options.parent;
		this.opt1 = options.opt1;
		this.opt2 = options.opt2;
		this.label1 = options.label1;
		this.label2 = options.label2;
		this.onChange = options.onChange;
		this.render();
	};

	Toggle.prototype = {
		render: function() {
      var opt1 = this.opt1;
      var self = this;
      $('.language-toggle').each(function(i, block) {
        $(block.children).each(function(i, node) {
          // manually rendered 
          var isOpt1 = false;
          var isOpt2 = false;
          var toggleTarget;
          if (node.tagName === 'PRE') {
            isOpt1 = node.firstChild.className.indexOf(self.opt1) >= 0;
            isOpt2 = node.firstChild.className.indexOf(self.opt2) >= 0;
            if (isOpt1) {
              $(node).addClass(`language-${self.opt1}`);
            }
            if (isOpt2) {
              $(node).addClass(`language-${self.opt2}`);
            }
            toggleTarget = node;
          } else {
            // pre-rendered through markdown
            isOpt1 = node.className.indexOf(self.opt1) >= 0
            isOpt2 = node.className.indexOf(self.opt2) >= 0
            toggleTarget = $(node).find('pre.highlight').first();
          }

          if (isOpt1) {
            toggleTarget.append(self.renderToggle(true));
          } else if (isOpt2) {
            toggleTarget.append(self.renderToggle(false));
          }
          UI.addClass(node, 'has_toggles');
        });
      });
			$('.' + this.opt2 + '-toggle').on('click', this.showOpt2.bind(this));
			$('.' + this.opt1 + '-toggle').on('click', this.showOpt1.bind(this));
			this.toggleOpt(true);
		},

		renderToggle: function(selectOpt1) {
			var toggle = UI.tag('div', { className: 'toggles' }, [
				UI.tag('div', { className: 'toggle-item' }, [
					UI.tag('a', { className: this.opt1 + '-toggle', href: '#' }, this.label1)
				]),
				UI.tag('div', { className: 'toggle-item' }, [
					UI.tag('a', { className: this.opt2 + '-toggle', href: '#' }, this.label2)
				]),
			]);

			if (selectOpt1 === true) {
				UI.addClass(toggle.childNodes[0], 'selected');
			} else {
				UI.addClass(toggle.childNodes[1], 'selected');
			}

			return toggle;
		},

		showOpt1: function(e) {
			e && e.preventDefault();

      $(`.language-toggle .language-${this.opt2}`).hide();
      $(`.language-toggle .language-${this.opt1}`).show();
		},

		showOpt2: function(e) {
			e && e.preventDefault();

      $(`.language-toggle .language-${this.opt2}`).show();
      $(`.language-toggle .language-${this.opt1}`).hide();
		},

		toggleOpt: function(showOpt1) {
			if (showOpt1 === true) {
        $(`.language-toggle .language-${this.opt2}`).hide();
        $(`.language-toggle .language-${this.opt1}`).show();
			} else {
        $(`.language-toggle .language-${this.opt2}`).show();
        $(`.language-toggle .language-${this.opt1}`).hide();
			}
			this.onChange();
		}
	};

	_.extend(Toggle.prototype, UI.ComponentProto);

})(UI, _);

// docs.js
(function(UI, _) {
	if (!UI) {
		return;
	}

	if (!App.Views.Docs) {
		App.Views.Docs = {};
	}

	var Docs = App.Views.Docs.Main = function(options) {
		this.platform = options.platform;
		this.language = options.language;
		this.render();
	};

	Docs.prototype = {
		render: function() {
			// create the TOC
			this.scrollContent = document.getElementsByTagName('body')[0];
			this.toc = new UI.LiveTOC({
				parent: document.getElementById('toc'),
				scrollContent: this.scrollContent,
				content: document.getElementsByClassName('guide_content')[0]
			});

      process.nextTick(() => {
        // deal with common-lang-blocks
			  this.toggleCommonLangBlocks();
      });

      // setup the server/mount path editor
      this.setupServerFieldCustomization();

			// add toggles to code blocks if necessary
			if (this.platform === "ios" || this.platform === "osx" || this.platform === "macos") {
				new App.Views.Docs.Toggle({
					parent: this.scrollContent,
					opt1: 'objective_c',
					opt2: 'swift',
					label1: 'Objective-C',
					label2: 'Swift',
					onChange: this.handleToggleChange.bind(this)
				});
			} else if (this.platform === "rest") {
				new App.Views.Docs.Toggle({
					parent: this.scrollContent,
					opt1: 'bash',
					opt2: 'python',
					label1: 'cURL',
					label2: 'Python',
					onChange: this.handleToggleChange.bind(this)
				});
			}

			this.mobileToc = document.getElementById('mobile_toc').getElementsByTagName('select')[0];
			this.renderMobileTOC();

			// move the TOC with the content. Since it's fixed, we can't just do it in css :(
			$(window).on('resize', _.throttle(this.handleWindowResize.bind(this), 300));
			this.handleWindowResize();
			// calculate final position of headers for the TOC once
			// the DOM is loaded (including images)
			$(window).on('load', function() {
				this.toc.updateHeights();
			}.bind(this));
		},

		renderMobileTOC: function() {
      var h1s = this.scrollContent.getElementsByTagName('h1');
      var fragment = document.createDocumentFragment();
			for (var i = 0; i < h1s.length; i++) {
        // var anchor = h1s[i].getElementsByTagName('a')[0];
        var optionElement = UI.tag('option', { 'data-anchor': "#"+h1s[i].id }, [ h1s[i].textContent ]);
        fragment.appendChild(optionElement);
      }
      this.mobileToc.appendChild(fragment);
			this.mobileToc.addEventListener('change', this.handleSelectChange.bind(this));
			this.mobileToc.getElementsByTagName('option')[0].setAttribute('selected', true);
		},

		// in "common" sections, there's a code block for every platform,
		// this hides all but the current one
		toggleCommonLangBlocks: function() {
			$('.common-lang-block').hide();
			switch (this.platform) {
				case 'ios':
        case 'osx':
        case 'macos':
					$('.common-lang-block.objectivec').show();
					$('.common-lang-block.swift').show();
					break;
				case 'android':
					$('.common-lang-block.java').show();
					break;
				case 'dotnet':
        case 'unity':
					$('.common-lang-block.cs').show();
					break;
				case 'php':
					$('.common-lang-block.php').show();
					break;
				case 'rest':
					$('.common-lang-block.bash').show();
					$('.common-lang-block.python').show();
					break;
				case 'arduino':
					$('.common-lang-block.cpp').show();
					break;
        case 'cloudcode':
				case 'js':
				default:
					$('.common-lang-block.js').show();
			}
		},

    setupServerFieldCustomization: function setupServerFieldCustomization() {

		  if(!document.getElementById('parse-server-custom-url')) {
		    // no customization available on this page
		    return;
      }

      if (typeof(Storage) !== "undefined") {
        // apply previous values from local storage
        const _url        = localStorage.getItem('parse-server-custom-url');
        const _mount      = localStorage.getItem('parse-server-custom-mount');
        const _protocol   = localStorage.getItem('parse-server-custom-protocol');
        const _appId      = localStorage.getItem('parse-server-custom-appid');
        const _clientKey  = localStorage.getItem('parse-server-custom-clientkey');

        // set existing entries
        if (_url) {
          $(".custom-parse-server-url").html(_url);
          $("#parse-server-custom-url").val(_url);
        }
        if (_mount) {
          $(".custom-parse-server-mount").html(_mount);
          $("#parse-server-custom-mount").val(_mount);
        }
        if (_protocol) {
          $(".custom-parse-server-protocol").html(_protocol);
          $("#parse-server-custom-protocol").val(_protocol);
        }
        if (_appId) {
          $(".custom-parse-server-appid").html(_appId);
          $("#parse-server-custom-appid").val(_appId);
        }
        if (_clientKey) {
          $(".custom-parse-server-clientkey").html(_clientKey);
          $("#parse-server-custom-clientkey").val(_clientKey);
        }
      }

      // set url listener
      $('#parse-server-custom-url').keyup(function() {
        const url = $('#parse-server-custom-url').val();
        if(!url.match(/^[-_a-z0-9\.]+(?::[0-9]+)?$/i)) {
          // not a valid url
          return;
        }
        $(".custom-parse-server-url").html(url);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('parse-server-custom-url', url);
        }
      });

      // set mount listener
      $('#parse-server-custom-mount').keyup(function() {
        var mount = $('#parse-server-custom-mount').val();
        if(!mount.match(/^[-_a-z0-9\/]+$/i) && mount !== '') {
          // not a valid mount path, and not empty
          return;
        }
        if(!mount.match(/^\//)) {
          // add leading slash
          mount = '/'+mount;
        }
        if(!mount.match(/\/$/)) {
          // add trailing slash
          mount = mount+'/';
        }
        $(".custom-parse-server-mount").html(mount);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('parse-server-custom-mount', mount);
        }
      });

      // set protocol listener
      $('#parse-server-custom-protocol').change(function() {
        const protocol = $('#parse-server-custom-protocol').val();
        if(!protocol.match(/^[a-z]+$/)) {
          // not a valid protocol
          return;
        }
        $(".custom-parse-server-protocol").html(protocol);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('parse-server-custom-protocol', protocol);
        }
      });

      // set appId listener
      $('#parse-server-custom-appid').keyup(function() {
        var appId = $('#parse-server-custom-appid').val();
        if(!appId.match(/^[^\s]+$/i)) {
          // not a valid appId
          return;
        }
        // encode any html
        appId = appId.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        $(".custom-parse-server-appid").html(appId);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('parse-server-custom-appid', appId);
        }
      });

      // set clientKey listener
      $('#parse-server-custom-clientkey').keyup(function() {
        var clientKey = $('#parse-server-custom-clientkey').val();
        if(!clientKey.match(/^[^\s]+$/i)) {
          // not a valid appId
          return;
        }
        // encode any html
        clientKey = clientKey.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        $(".custom-parse-server-clientkey").html(clientKey);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('parse-server-custom-clientkey', clientKey);
        }
      });

      // set reset button
      $('#parse-server-custom-values-reset').click(function() {
        // reset defaults
        let _default = $("#parse-server-custom-url").attr('defaultval');
        $(".custom-parse-server-url").html(_default);
        $("#parse-server-custom-url").val(_default);
        localStorage.setItem('parse-server-custom-url', _default);

        _default = $("#parse-server-custom-mount").attr('defaultval');
        $(".custom-parse-server-mount").html("/"+_default+"/");
        $("#parse-server-custom-mount").val(_default);
        localStorage.setItem('parse-server-custom-mount', "/"+_default+"/");

        _default = $("#parse-server-custom-protocol").attr('defaultval');
        $(".custom-parse-server-protocol").html(_default);
        $("#parse-server-custom-protocol").val(_default);
        localStorage.setItem('parse-server-custom-protocol', _default);

        _default = $("#parse-server-custom-appid").attr('defaultval');
        $(".custom-parse-server-appid").html(_default);
        $("#parse-server-custom-appid").val(_default);
        localStorage.setItem('parse-server-custom-appid', _default);

        _default = $("#parse-server-custom-clientkey").attr('defaultval');
        $(".custom-parse-server-clientkey").html(_default);
        $("#parse-server-custom-clientkey").val(_default);
        localStorage.setItem('parse-server-custom-clientkey', _default);


      });

    },

		// we recalculate the header heights for the TOC
		// highlighting when the height of the content changes
		handleToggleChange: function() {
			this.toc.updateHeights();
		},

		handleSelectChange: function(e) {
			location.href = this.mobileToc.selectedOptions[0].getAttribute('data-anchor');
		},

		handleWindowResize: function(e) {
			this.toc.updateHeights();
		}
	};

	_.extend(Docs.prototype, UI.ComponentProto);

})(UI, _);

$(function() {
  var platform = window.location.pathname.split('/')[1];
  if (platform) {
    new App.Views.Docs.Main({
      language: 'en',
      platform: platform
    });
  }
});


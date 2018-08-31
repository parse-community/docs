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

var UI = {
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

module.exports = UI;

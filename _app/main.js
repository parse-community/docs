// Sticky TOC
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

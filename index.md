---
title: Docs | Parse
permalink: index.html
layout: docs

---

<script type="text/javascript">
  var DIGITAL_CLIMATE_STRIKE_OPTIONS = {
    /**
     * Specify view cookie expiration. After initial view, widget will not be
     * displayed to a user again until after this cookie expires. Defaults to
     * one day.
     */
    cookieExpirationDays: 1, // @type {number}

    /**
     * Set the language of the widget. We currently support:
     * 'en': English
     * 'de': German
     * 'es': Spanish
     * 'cs': Czech
     * 'fr': French
     * 'nl': Dutch
     * Defaults to null, which will obey the nagivator.language setting of the
     * viewer's browser.
     */
     language: null, // @type {string}

    /**
     * Allow you to override the iFrame hostname. Defaults to https://assets.digitalclimatestrike.net
     */
    iframeHost: 'https://assets.digitalclimatestrike.net', // @type {string}

    /**
     * Prevents the widget iframe from loading Google Analytics. Defaults to
     * false. (Google Analytics will also be disabled if doNotTrack is set on
     * the user's browser.)
     */
    disableGoogleAnalytics: true, // @type {boolean}

    /**
     * Always show the widget, even when someone has closed the widget and set the cookie on their device.
     * Useful for testing. Defaults to false.
     */
    alwaysShowWidget: false, // @type {boolean}

    /**
     * Automatically makes the widget full page. Defaults to false.
     */
    forceFullPageWidget: false, // @type {boolean}

    /**
    * For the full page widget, shows a close button "x" and hides the message about the site being
    * available tomorrow. Defaults to false.
    */
    showCloseButtonOnFullPageWidget: true, // @type {boolean}

    /**
     * The date when the sticky footer widget should start showing on your web site.
     * Note: the month is one integer less than the number of the month. E.g. 8 is September, not August.
     * Defaults to new Date(2019, 7, 1) (August 1st, 2019).
     */
    footerDisplayStartDate: new Date(), //@ type {Date object}

    /**
     * The date when the full page widget should showing on your web site for 24 hours.
     * Note: the month is one integer less than the number of the month. E.g. 8 is September, not August.
     * Defaults to new Date(2019, 8, 20) (September 20th, 2019)
     */
    fullPageDisplayStartDate: new Date(2019, 8, 20), //@ type {Date object}
  };
</script>
<script src="https://assets.digitalclimatestrike.net/widget.js" async></script>

<div class="container padding-top-40 padding-bottom-50" data-nav-waypoint>
  <div class="copy-block">
      <h3 class="h3 h3--blue margin-bottom-10">The more you know.</h3>
      <p class="margin-top-10">We’ve got comprehensive guides for each platform that should help out with anything you need. You can also take a look at the detailed API references and tutorials for a better idea of how it all comes together.</p>
  <p class="margin-top-10">You can set up your own <a href="https://github.com/parse-community/parse-server">Parse server</a> and <a href="https://github.com/parse-community/parse-dashboard">dashboard</a> or use a service that hosts Parse for you.</p>
  </div>

  <div class="docs-platforms">
    <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Parse Server</span>
              <svg class="icon icon-infinity"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#infinity"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="parse-server/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.parse-server }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://npmjs.com/package/parse-server" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>
      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">iOS</span>
              <svg class="icon icon-apple"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#apple"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="ios/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.osx }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-iOS-OSX/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Android</span>
              <svg class="icon icon-android"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#android"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="android/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.android }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-Android/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">JavaScript</span>
              <svg class="icon icon-js"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#javascript"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="js/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.js }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-JS/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">.NET + Xamarin</span>
              <svg class="icon icon-dotnet"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#dotnet"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="dotnet/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.dotnet }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-dotNET/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">macOS</span>
              <svg class="icon icon-osx"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#apple"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="macos/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.osx }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-iOS-OSX/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Unity</span>
              <svg class="icon icon-unity"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#unity"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="unity/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.dotnet }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-dotNET/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">PHP</span>
              <svg class="icon icon-php"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#php"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="php/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="{{ site.apis.php }}">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/parse-php-sdk/releases" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Arduino</span>
              <svg class="icon icon-arduino"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#arduino"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="arduino/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="https://parse-community.github.io/Parse-SDK-Arduino/api/">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/Parse-SDK-Arduino/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Embedded C</span>
              <svg class="icon icon-embedded_c"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#embedded_c"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="embedded_c/guide/">Guide</a></li>
              <li class="docs-platform__links"><a href="https://parse-community.github.io/parse-embedded-sdks/api/">API Reference</a></li>
          </ul>
          <footer class="docs-platform__footer">
              <a href="https://github.com/parse-community/parse-embedded-sdks/releases/latest" class="btn btn--outline">Latest Downloads</a>
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">Cloud Code</span>
              <svg class="icon icon-cloudcode"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#cloudcode"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="cloudcode/guide/">Guide</a></li>
              <li class="docs-platform__links"><div>&nbsp;</div></li>
          </ul>
          <footer class="docs-platform__footer">
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">REST API</span>
              <svg class="icon icon-rest"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#rest"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="rest/guide/">Guide</a></li>
              <li class="docs-platform__links"><div>&nbsp;</div></li>
          </ul>
          <footer class="docs-platform__footer">
          </footer>
      </div>

      <div class="docs-platform">
          <header class="docs-platform__header">
              <span class="docs-platform__name">GraphQL API</span>
              <svg class="icon icon-graphql"><use xlink:href="{{ site.baseurl }}/assets/symbols.svg#graphql"></use></svg>
          </header>
          <ul class="docs-platform__links">
              <li class="docs-platform__links"><a href="graphql/guide/">Guide</a></li>
              <li class="docs-platform__links"><div>&nbsp;</div></li>
          </ul>
          <footer class="docs-platform__footer">
          </footer>
      </div>
  </div><!-- .docs-platforms -->
</div><!-- end .container -->

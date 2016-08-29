# Getting Started

If you haven't set up your project yet, please [head over to the QuickStart guide]({{ page.quickstart }}#js/native/blank) to get up and running. You can also check out our [API Reference](/Parse-SDK-JS/api/) for more detailed information about our SDK.

The Parse platform provides a complete backend solution for your mobile application. Our goal is to totally eliminate the need for writing server code or maintaining servers.</p>

<div class='tip info'><div>
  If you're looking to build a React application with Parse, we provide a special library for that. All of the documentation is available at the <a href="https://github.com/ParsePlatform/ParseReact">GitHub repo</a>.
</div></div>

Our JavaScript SDK is originally based on the popular [Backbone.js](http://backbonejs.org/) framework, but it provides flexible APIs that allow it to be paired with your favorite JS libraries. Our goal is to minimize configuration and let you quickly start building your JavaScript and HTML5 app on Parse.

Our SDK supports Firefox 23+, Chrome 17+, Safari 5+, and IE 10. IE 9 is supported only for apps that are hosted with HTTPS.

To initialize your own Parse-Server with Javascript, you should replace your current initialization code with this
<pre><code class="javascript">
Parse.initialize("YOUR_APP_ID");
Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse'
</code></pre>

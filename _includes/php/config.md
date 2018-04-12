# Config

**ParseConfig** allows you to access the global **Config** object for your parse server setup.


You can get, set and update simple values much like you would on an instance of **ParseObject**. Through this all your SDKs and applications can have access to global settings, options, and more.
What you choose to put in your config is purely up to you however.

<pre><code class="php">
// get existing application-wide config
$config = new ParseConfig();

// check a config value of yours
$allowed = $config->get('feature_allowed');

// add a simple config value
$config->set('feature_allowed', true);

// save this global config
$config->save();
</code></pre>
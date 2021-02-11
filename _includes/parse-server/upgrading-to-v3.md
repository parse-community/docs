# Upgrading Parse Server to version 3.0.0

Starting 3.0.0, Parse Server uses the JS SDK version 2.0. In short, Parse SDK v2.0 removes the backbone style callbacks as well as the `Parse.Promise` object in favor of native promises. All the Cloud Code interfaces also have been updated to reflect those changes, and all backbone style response objects are removed and replaced by Promise style resolution.

We have written up a [migration guide](https://github.com/parse-community/parse-server/blob/master/3.0.0.md), hoping this will help you transition to the next major release.

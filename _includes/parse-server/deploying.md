# Deploying Parse Server

The fastest and easiest way to start using Parse Server is to run MongoDB and Parse Server locally. Once you have a better understanding of how the project works, read on to learn how to deploy Parse Server to major infrastructure providers. If your provider is not listed here, please take a look at the [list of articles from the community](https://github.com/ParsePlatform/parse-server/wiki##community-links) as someone may have already written a guide for it.

## Deploying to Heroku and mLab

Heroku and mLab provide an easy way to deploy Parse Server, especially if you're new to managing your own backend infrastructure.

Here are the steps:

1. Create a repo for your Express app with the Parse Server middleware mounted (you can use our [sample project](https://github.com/ParsePlatform/parse-server-example), or start your own).
2. Create a Heroku account (if you don’t have one already) and use the Heroku Toolbelt to log in and prepare a new app in the same directory as your Express app. Take a look at Heroku's [Getting Started with Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs##introduction) for more details.
3. Use the mLab addon: `heroku addons:create mongolab:sandbox` (or, you can create a Mongo instance yourself, either directly with mLab or your own box)
4. Use heroku config and note the URI provided by mLab under the var MONGOLAB_URI
5. Copy this URI and set it as a new config variable: heroku config:set `DATABASE_URI=mongodb://...`
6. Deploy it: `git push heroku master`

You may also refer to the Heroku Dev Center article on [Deploying a Parse Server to Heroku](https://devcenter.heroku.com/articles/deploying-a-parse-server-to-heroku).

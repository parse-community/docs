# Contributing to Parse Docs
We want to make contributing to this project as easy and transparent as possible.

## Code of Conduct
Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.facebook.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

## Our Documentation Process
Most of our work will be done in public directly on GitHub. There may be changes done through our internal source control, but it will be rare and only as needed.

### Pull Requests
We actively welcome your pull requests. We'll need to get a core member to sign off on the changes and then merge the pull request. We'll do our best to provide updates and feedback throughout the process.

- Use a [single commit per pull request](#creating-a-single-commit-per-pull-request).
- If your pull request adds a new code sample, it must include snippets in each of the supported languages. For example, always submit Swift and iOS samples when updating the iOS Guide.
- Follow the [Documentation Style Guide](#style-guide).
- End files with a newline.
- If you haven't already, complete the Contributor License Agreement ("CLA").

### Contributor License Agreement ("CLA")
In order to accept your pull request, we need you to submit a CLA. You only need to do this once to work on any of Facebook's open source projects.

Complete your CLA here: <https://developers.facebook.com/opensource/cla>

### Known Issues
We use GitHub issues to track public documentation issues. Before filing a new issue, try to make sure your issue doesn't already exist.

### Reporting New Issues

Details are key. The more information you provide us the easier it'll be for us to debug and the faster you'll receive a fix. Some examples of useful tidbits:

- You can create an issue [here][new-github-issue]. Please include as many details as possible with your report.
- Include the name of the platform where the issue is located. For example, the iOS Guide and the .NET Guide would be under 'ios' and 'dotnet', respectively.
- If you are reporting a discrepancy in what the documentation states against the actual behavior of the SDK, please make sure to explain the steps you've taken to reproduce the issue. A link to a bug report marked as valid or list of repro steps can help.
- Perform a [cursory search][issue-search] to see if a similar issue has already been submitted.
- Please setup a [profile picture][profile-picture] to make yourself recognizable and so we can all get to know each other.

## Style Guide

- Use [Markdown][markdown]. The parser uses [marked][marked]'s lexer.
- Use [tokens][tokens] when referring to the core Parse classes. For example, use %{ParseObject} when referring to `PFObject` or `ParseObject`. The renderer will substitute these tokens for the appropriate class name for the current platform.

 [google-group]: https://groups.google.com/forum/#!forum/parse-developers
 [stack-overflow]: http://stackoverflow.com/tags/parse.com
 [bug-reports]: https://www.parse.com/help#report
 [markdown]: https://daringfireball.net/projects/markdown
 [marked]: https://github.com/chjj/marked
 [tokens]: https://github.com/ParsePlatform/Docs/blob/master/tokens.json
 [new-github-issue]: https://github.com/ParsePlatform/Docs/issues/new
 [issue-search]: https://github.com/issues?q=+is%3Aissue+user%3AParsePlatform
 [profile-picture]: https://help.github.com/articles/how-do-i-set-up-my-profile-picture

# Contributing to Parse Docs

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to Parse's Documentation. These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

## Submitting Issues

- You can create an issue [here](https://github.com/ParsePlatform/Docs/issues/new), but before doing that please read the notes below on submitting issues, and include as many details as possible with your report.
- Include the name of the platform where the issue is located. For example, the iOS Guide and the .NET Guide would be under 'ios' and 'dotnet', respectively.
- If you are reporting a discrepancy in what the documentation states against the actual behavior of the SDK, please make sure to explain the steps you've taken to reproduce the issue. A link to a bug report marked as valid or list of repro steps can help.
- Perform a [cursory search](https://github.com/issues?q=+is%3Aissue+user%3AParsePlatform) to see if a similar issue has already been submitted.
- Please setup a [profile picture](https://help.github.com/articles/how-do-i-set-up-my-profile-picture) to make yourself recognizable and so we can all get to know each other.

## Pull Requests

- Use a [single commit per pull request](#creating-a-single-commit-per-pull-request).
- If your pull request adds a new code sample, it must include snippets in each of the supported languages. For example, always submit Swift and iOS samples when updating the iOS Guide.
- Follow the [Documentation Styleguide](#documentation-styleguide).
- End files with a newline.

### Creating a single commit per pull request

In order to keep the git commit history readable, we ask that you squash your commits down to a single commit before submitting a pull request.

You can use `git rebase`. To squash three commits into one, do the following:

    $ git rebase -i HEAD~3

Running this command gives you a list of commits in your text editor. Replace "pick" with "squash" next to the commits you want to squash into the commit before it. You will then be able to edit the message for the resulting commit.

If you've already pushed commits to GitHub, and then squashed them locally, you will have to force the push to your branch.

    $ git push origin branch-name --force

If you only want to modify your last commit message, it's very simple:

    $ git commit --amend

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Limit the first line to 72 characters or less
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues and pull requests liberally

### See also:
[Git Book Chapter 7.6: Git Tools - Rewriting History](http://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

## Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown). The parser uses [marked](https://github.com/chjj/marked)'s lexer.
- Use [tokens](https://github.com/ParsePlatform/Docs/blob/master/tokens.json) when referring to the core Parse classes. For example, use %{ParseObject} when referring to `PFObject` or `ParseObject`. The renderer will substitute these tokens for the appropriate class name for the current platform.

---
til-tags: ["ruby", "rails"]
title: "Using Pronto for CI on a Rails project without cluttery comments"
social_description: "a gift to myself and my team in the New Year"
date: 2024-01-03
---

On many Ruby on Rails projects I've worked on, [Pronto](https://github.com/prontolabs/pronto) is in use to run linting rules as part of CI on every pull request. Pronto was chosen because linting was introduced after the codebase had been established for a while, and there were many rules already broken when the new rules were decided upon. Pronto only lints the files (or parts of files) you've changed in your PR. 

The behavior that had been set up initially was that Pronto would post a comment to the PR for every line that had some linting error. On big PRs, especially if the developers hadn't run Pronto locally yet, there may be quite a lot of comments made by Pronto when the PR was first open. Pronto does not (as far as we know) have a way to update the comments it's already made itself - so the developer has to resolve or delete all of Pronto's comments manually when they have fixed the linting issues, if they want to clean up the comments on their PR. Cleaning up these comments is useful because many comments can make it hard for reviewers to find the conversations they are interested in having about the code, and hard for the pull request openers to know if all feedback has been addressed. 

Our team had a `bin` file that did some setup (mainly of the Github connection variables) and then ran Pronto. It was listed in our CI runner on CircleCI. 

Pronto can also make a status check on your PR - that section at the bottom that gives you a green checkmark or a red X if a particular test runner passed or failed.

To use Pronto, and **get a status check _and_ the comments on each individual line**, you might do this in a binfile: 

```rb
#!/usr/bin/env ruby
# imagine some setup code here...
`bundle exec pronto run -f github_status github_pr -c origin/main`
```

One thing you may note here is that you will not see the full output from Pronto (all the lines that have warnings or errors) in your task output in CircleCI for the Pronto task. If you are going to take away the PR comments (by removing the `github_pr` formatter), you will want that full output! 

I had to learn [some gotchas about using backticks for shell commands in Ruby](https://mattbrictson.com/blog/run-shell-commands-in-ruby#the-gotchas-of-using-backticks), namely, how output is handled. I needed to use `puts` to make sure the full output showed up in CircleCI's task output, and add the `text` formatter to make sure each linter actually output its results.

This is what I ended up with, to have Pronto give me **a status check on my PR, and report the full warnings & error logs of all the linters, with no line-by-line comments**:

```rb
#!/usr/bin/env ruby
# imagine some setup code here...
puts `bundle exec pronto run -f github_status text -c origin/main`
```

This was a bit tricky to track down; hope it helps if you have landed here!


## Using a Github Action instead?

You might have a section that looks like this in your Github Action config if you want **status checks on the PR, text you can read, but no comments on individual lines**. 

Note here we're adding the `--exit-code` flag to make sure we get a nice red X telling us to check our Pronto output before merge. 

```yml
- name: Run Pronto
  run: bundle exec pronto run -f github_status text -c origin/${{ github.base_ref }} --exit-code
  env:
    PRONTO_PULL_REQUEST_ID: ${{ github.event.pull_request.number }}
    PRONTO_GITHUB_ACCESS_TOKEN: "${{ github.token }}"
```

{% img "raw_img/til/pronto-github-action.png", "A Github Action status output line showing the Pronto runner has failed", 450, "center-block" %}


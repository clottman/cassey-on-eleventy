---
layout: post
title: Settings in My Shell Profile that Just Make Sense
tags: ['posts', 'tech-resources', 'code']
description: 'a variety of useful snippets'
date: 2024-07-11T16:33:00-05:00
---

Here are some useful settings in my Zsh profile and a few other dotfiles. 

See also: [some useful snippets for programming, and keyboard shortcuts I like](/snippets/) and [all my other tech resources posts](/blog/tags/tech-resources/).

## Docker stuff
If you have an M-series (Intel) Mac, put this in your .zshrc right now to avoid bad times later on with docker stuff

```bash
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

## Aliases
I work for a consulting agency, and have many different projects on my machine for many different clients. So I made aliases to change directories to where I might want to go. 

```bash
# aliases for fast switching
# To use these, have a code folder that includes 3 folders: clients, internal, and personal
# clients with multiple repos should go in their own folder inside clients/
alias clients="cd ~/code/clients/"
alias personal="cd ~/code/personal"
alias internal="cd ~/code/internal"

alias a-cool-client-app="cd ~/code/clients/my-cool-client-app"

alias my-client-with-10-apps="cd ~/code/clients/this-client"
alias another-client-app="cd ~/code/clients/this-client/another-client-app"
```

## SSH
Make sure my ssh keys are always available in my terminal session. You may need to add the keychain option to ssh-agent if you set up ssh-agent to use a password from your keychain.

```bash
# make sure ssh keys are added
eval `ssh-agent`
ssh-add
```

## Ruby & Rails stuff

Suppress warnings & deprecations; use at your own risk!
```bash
# suppress warnings & deprecations from Ruby
export RUBYOPT='-W0'
```

Working on a Ruby version that requires OpenSSL 1.1? You'll want this. Swap in OpenSSL 3.0 as needed... See my friend John's [blog post explaining the OpenSSL error situation with Ruby](https://johnskinnerportfolio.com/blog/ruby_330_error.html), an explanation I have been wanting and not finding for _years_ now of dealing with these errors and only finding obscure Q&A posts with out of date or incredibly wrong/risky info on what to do about the issue. 

Make sure this line goes above your `rbenv init` lines, if using. 

```bash
export RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)"
```

Stick these in & uncomment as needed... See the above re: OpenSSL! 
```bash
# export LDFLAGS="-L/opt/homebrew/opt/openssl@1.1/lib"
# export CPPFLAGS="-I/opt/homebrew/opt/openssl@1.1/include"
# export LDFLAGS="-L/opt/homebrew/opt/libpq/lib:$LDFLAGS"
# export CPPFLAGS="-I/opt/homebrew/opt/libpq/include:$CPPFLAGS"
```

## ASDF configs
If you're using ASDF for tool version management, but working on legacy projects or projects where others are not, set `legacy_version_file = yes` in `$HOME/.asdfrc` to make sure if your project already has a `.ruby-version` or `.nvmrc` or `.node-version`, ASDF will use it automatically. 

## Git Configs
Here are things I like in my `$HOME/.gitconfig`: 

Note the editor part is opening up VS Code, and saving when the file is closed in VS Code. You'll need to make sure you have the VS Code command line tools installed first. I like those because then I can do `code .` in any given folder to see that folder in my editor.

`autoSetupRemote` is nice; it lets me skip `git push --set-upstream origin myBranchName` and just `git push` even if the branch isn't on the remote yet. 

The `main` alias is great if you work in repos where some of them are using `main` as the primary branch, and some still have `master` as the primary branch, and it's out of your control to fix this right now and never think about it again. It lets you do `git main` and it takes you to whichever branch exists.

```bash
[pull]
	rebase = false
[pager]
	log = less
[core]
	pager = cat
	autocrlf = input
	editor = code --wait
	excludesfile = ~/.gitignore_global
[alias]
	main = "!bash -c 'git switch $(git rev-parse origin/main >/dev/null 2>&1 && echo main || echo master)'"
[push]
	autoSetupRemote = true
```

## Global Gitignores
```bash
.vscode/
.DS_Store
```

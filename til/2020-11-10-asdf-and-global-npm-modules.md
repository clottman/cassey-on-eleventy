---
tilTags: ["tools"]
title: "How to make asdf recognize globally installed npm modules"
description: ""
date: 2020-11-10
---

After installing a global module with npm (`npm install -g my-cool-module`), when using asdf, you might then get `command not found: my-cool-module` when you try to use it. The solution is to run `asdf reshim nodejs`. After that, you should be able to use your cool new module. 

See: [this github issue where it's discussed](https://github.com/asdf-vm/asdf-nodejs/issues/20). 
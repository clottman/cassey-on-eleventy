---
tilTags: ["tools"]
title: "What is that percent sign doing in my `cat` output?"
description: "The answer is: it's zsh, not cat"
date: 2020-11-09
---

On my mac, I did a quick `cat` of a file in the terminal, and saw an extra `%` at the end of the text. I turned on 'show whitespace' in VS Code and opened the same file - VS Code didn't show it as a whitespace character, nor as anything else. 

I learned in [this stack exchange question](https://unix.stackexchange.com/questions/167582/why-zsh-ends-a-line-with-a-highlighted-percent-symbol) that the percent sign actually comes from zsh and means that the file didn't end with a newline, but zsh is showing one anyways to make your terminal output more clear & consistent.

[User geekq adds](https://unix.stackexchange.com/questions/167582/why-zsh-ends-a-line-with-a-highlighted-percent-symbol#comment822112_167600): 

> I've now put PROMPT_EOL_MARK='' into my .zshrc to hide the difference between trailing newline or not on command output. 

I'm not doing that for now because it seems kinda useful to know if the file ends with a newline or not, but it's good to know I could. 

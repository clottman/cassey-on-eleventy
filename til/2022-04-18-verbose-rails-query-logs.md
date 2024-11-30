---
tilTags: ["ruby", "rails"]
title: "Verbose Active Record query logs for Rails"
date: 2022-04-18
---

Today I was testing some code in the Rails console and kept seeing the same database call over and over, but I couldn't figure out where it was coming from. I found that I could make Rails output the line number for each ActiveRecord query it runs using this code in the Rails console: 

```
ActiveRecord::Base.verbose_query_logs = true
```

[The docs on this](https://edgeguides.rubyonrails.org/debugging_rails_applications.html#verbose-query-logs) say verbose query logs are on by default in Rails versions after 5.2.

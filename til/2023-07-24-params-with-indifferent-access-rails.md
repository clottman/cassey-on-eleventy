---
tilTags: ["ruby", "rails"]
title: "Rails controller params can be accessed by string or symbol (with indifferent access!)"
social_description: "so when you're writing controller tests, use hash with_indifferent_access"
date: 2023-07-24
---

The other day I was writing a Rails controller test on a controller that was using a hash of the parameters. My controller tests were failing when they shouldn't have been and I was so confused. Eventually, I realized that's because my test setup was defining the params hash with the keys as strings, but my controller was accessing the key it needed with a symbol. Ahh! 

Then I learned that in the actual controller when the program is running, it didn't actually matter if I accessed the key with a symbol or a string, because controller parameters in Rails act like a [Hash With Indifferent Access](https://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html) (and in fact, if you call [`to_h`](https://api.rubyonrails.org/classes/ActionController/Parameters.html#method-i-to_h) on a params object, you'll get a hash with indifferent access back).

So, if I want the same behavior in my test, where I am mocking the parameters I need as a hash instead of a real parameters object, I should be sure to call `with_indifferent_access` on the hash so that it doesn't matter whether my controller uses a symbol or string for the key.

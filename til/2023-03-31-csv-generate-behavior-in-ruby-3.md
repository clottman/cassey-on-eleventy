---
tilTags: ["ruby", "rails"]
title: "CSV.generate behavior change in Ruby 3 vs Ruby 2.7"
social_description: "because of changes in StringIO's init method"
date: 2023-03-31
---

Today I was working on some code that generated some CSV reports like this: 

```ruby
  def self.my_cool_report(options = {})
    CSV.generate(options) do |csv|    
```

The codebase was recently updated from Ruby 2.7.6 to Ruby 3.2.1. The reports were failing to generate with a weird error - "no implicit conversion of Hash into String". 

I set bindings inside the generate method, because I was in the process of changing some other things, and figured the error must be related. But my binding was never hit. 

I started digging into [the code for `CSV.generate`](https://github.com/ruby/ruby/blob/ruby_3_2/lib/csv.rb#L1397-L1411). The full method looks like this, as of Ruby 3.2: 

```ruby
def generate(str=nil, **options)
  encoding = options[:encoding]
  # add a default empty String, if none was given
  if str
    str = StringIO.new(str)
    str.seek(0, IO::SEEK_END)
    str.set_encoding(encoding) if encoding
  else
    str = +""
    str.force_encoding(encoding) if encoding
  end
  csv = new(str, **options) # wrap
  yield csv         # yield for appending
  csv.string        # return final String
end
```

What I found is that the `generate` method is treating what the original author of my team's code thought they were passing in as options as the string for the CSV to start writing to. It's calling `StringIO.new` on that empty options hash we gave it. 

I looked back at the 2.7 version of the CSV library - and it too called `StringIO.new` in the same way. That made me curious if StringIO had changed. 

I did a quick experiment, switching the version of Ruby I used and calling `StringIO.new` with an empty hash. Lo and behold, the results were very different!

```bash
>   rbenv local 2.7.6
>   irb
irb(main):001:0> require 'stringio'
=> true
irb(main):002:0> StringIO.new({}) 
=> #<StringIO:0x00007fa0fa185a68>
irb(main):003:0> exit
>   rbenv local 3.2.1
>   irb                         
irb(main):001:0> require 'stringio'
=> true
irb(main):002:0> StringIO.new({}) 
(irb):2:in `initialize': no implicit conversion of Hash into String (TypeError) from (irb):2:in `new' from (irb):2:in `<main>' from /.rbenv/versions/3.2.1/lib/ruby/gems/3.2.0/gems/irb-1.6.2/exe/irb:11:in `<top (required)>' from /.rbenv/versions/3.2.1/bin/irb:25:in `load' from /.rbenv/versions/3.2.1/bin/irb:25:in `<main>'
```

In Ruby 2.7.6, `StringIO.new` was happy to be instantiated with an empty hash, while in Ruby 3.2.1, `StringIO.new` threw an error if you tried to instantiate it that way -- that no implicit conversion error I was seeing when trying to pass an empty hash to `CSV.generate`.

I updated all the report methods to default options to nil if no options were provided instead of an empty hash, and now my code works again. 

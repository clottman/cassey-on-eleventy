---
tilTags: ["ruby", "rails"]
title: "Getting all the records of a model created today in Rails"
description: "Time.current.all_day ftw"
date: 2022-04-12
---

My favorite thing I've learned recently is something I learned when needing to remove a bunch of records that had just been created in a Rails app.

If you want to get all the records of model `Post` created on the current day, you can do: 

```
Post.where(created_at: Time.current.all_day)
```

An alternative is 
```
Post.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
```
but the `Time.current.all_day` version is so simple! 

Thanks to [this StackOverflow post](https://stackoverflow.com/questions/2919720/how-to-get-record-created-today-by-rails-activerecord) for the solution! 

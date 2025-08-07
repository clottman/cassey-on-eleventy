---
title: Fixing Charset and Collation of a Mysql Database Out of Sync with Teammates
description: no more noisy noisy diffs in schema.rb
date: 2025-08-07T09:08:00-05:00
tilTags:
  - rails
  - databases
  - docker
---
Recently I returned to a Ruby on Rails project I hadn't worked in for a while, and found that every time I ran the migrations, I would get a bunch of unrelated changes in the schema.rb file for tables that weren't changed by the migrations I just ran. The changes were usually on the line defining the table, and contained different values for text encoding related keywords like `char set` and `collate`. 

To fix this, I ended up needing to update the database-level collation and charset - the mysql server-level settings were correct, but not the settings at the database level. 

Here's what I did. In this case mysql was running in Docker, so I'm including the commands for getting in to the mysql instance in the Docker container as a reference for my future self if I ever need to do this again. 

```sh
# get into the docker container running mysql
$ docker exec -it my-mysql bash -l

# open a mysql console inside that server
$ mysql -h localhost -p --database my_database_name

# don't know your db name? do this:
$ mysql -h localhost -p
```
```sql
# in the sql console now
SHOW DATABASES;
```

In the SQL console for the specific database you are looking at,
```sql
-- check the variable settings
SHOW VARIABLES LIKE '%character_set%';
SHOW VARIABLES LIKE '%collate%';

-- if your database setting needs to change, do this:
ALTER DATABASE my_db_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
```

Using the character set and collate values you are wanting to change to, of course. 
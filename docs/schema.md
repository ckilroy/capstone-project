# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

#I'd like to discuss the best way to associate user/workspaces or
#user/projects, as they are many-to-many associations. Is it better to use #has_many_and_belongs to or has_many through a join table?

## workspaces
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | text      |
workspace_id| integer   | not null, foreign key
(references workspaces)

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | text      |
due_date    | datetime  |
completed   | boolean   | not null (default to false)
comp_date   | datetime  |
last_modified| datetime | not null
priority    | string    |
creator_id  | integer   | not null, foreign key (references users)
assignee_id | integer   | not null, foreign key (references users) (default to creator)
project_id  | integer   | foreign key (references projects)


## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
task_id     | integer   | not null, foreign key (references tasks)
follower_id | integer   | not null, foreign key (references users)

## inbox_messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   |not null, primary key
message     | text      |not null
recipient_id| integer   |not null

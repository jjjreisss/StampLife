# Schema Information

## drawings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key, indexed
caption     | text      | not null, default: ""
archived    | boolean   | not null, default: false
image_url   | string    | not null


##likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
drawing_id  | integer   | not null, foreign key, indexed
user_id     | integer   | not null, foreign key, indexed

##taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
drawing_id  | integer   | not null, foreign key, indexed
tag_id      | integer   | not null, foreign key, indexed

##tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

##comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
drawing_id  | integer   | not null, foreign key, indexed
user_id     | integer   | not null, foreign key, indexed

##follow
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key, indexed
following_id| integer   | not null, foreign key, indexed

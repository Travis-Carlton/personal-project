create table perusers
(id serial primary key,
username text not null,
password text not null,
first_name text,
last_name text,
bio text,
profile_pic text)

create table perposts
(id serial primary key,
likes int,
dates text,
image text,
user_id int references perusers (id),
book_id int references perbooks (id))

create table percomments
(id serial primary key,
user_id int references perusers (id),
post_id int references perposts (id),
comment text,
likes int
)

create table perbooks
(id serial primary key,
name text not null,
user_id int references perusers (id)
)
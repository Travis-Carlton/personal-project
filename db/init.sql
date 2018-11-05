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




-- drop table if exists perusers cascade;
-- drop table if exists perposts cascade;
-- drop table if exists perbooks cascade;

-- create table perusers
-- (id serial primary key,
-- username text not null,
-- password text not null,
-- first_name text not null,
-- last_name text not null,
-- bio text not null,
-- profile_pic text)

-- create table perposts
-- (id serial primary key,
-- likes int,
-- dates text,
-- image text,
-- user_id int references perusers (id),
-- book_id int references perbooks (id))

-- create table percomments
-- (id serial primary key,
-- user_id int references perusers (id),
-- post_id int references perposts (id),
-- comment text,
-- likes int
-- )

-- create table perbooks
-- (id serial primary key,
-- name text not null,
-- image text not null,
-- user_id int references perusers (id)
-- )

-- delete from perusers where id = 52;
-- delete from perbooks where id = 2;

-- delete from perbooks where id = 7;

-- alter table perusers drop profile_pic;

-- alter table perusers add profile_pic text default ('https://d28sdlh8venwby.cloudfront.net/assets/missing-profile-326c4759d9ad53fa5bc720276bfe604c25a0c53c37b314eeef1bfa2cc1c5c514.png');

-- insert into perbooks
-- (name,image)
-- values
-- ('travis','https://www.w3schools.com/w3css/img_lights.jpg');

-- UPDATE perbooks
-- SET name = 'new 3'
-- WHERE id = 3;

-- select * from perusers;
-- select * from perposts;
-- select * from percomments;
-- select * from perbooks;

-- select * from perbooks order by id asc

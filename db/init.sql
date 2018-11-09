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
pimage text,
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





-- 

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

-- ALTER TABLE perusers ADD CONSTRAINT uneek UNIQUE (username);
-- CREATE UNIQUE INDEX user_unique ON perusers (username);

-- create table perposts
-- (id serial primary key,
-- likes int,
-- dates text,
-- image text,
-- user_id int references perusers (id),
-- book_id int references perbooks (id))

-- insert into perposts
-- (likes,dates,image,user_id,book_id)
-- values
-- (1,101018,'https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg',53,29);

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

-- delete from perusers where id = 70;
-- delete from perbooks where id = 60;

-- delete from perposts where book_id = 29;

-- alter table perusers drop profile_pic;

-- alter table perusers add profile_pic text default ('https://d28sdlh8venwby.cloudfront.net/assets/missing-profile-326c4759d9ad53fa5bc720276bfe604c25a0c53c37b314eeef1bfa2cc1c5c514.png');

-- insert into perbooks
-- (name,image)
-- values
-- ('travis','https://www.w3schools.com/w3css/img_lights.jpg');

-- UPDATE perbooks
-- SET name = 'new 3'
-- WHERE id = 3;

-- UPDATE perbooks
-- SET user_id = 1
-- WHERE id = 9;

-- ALTER TABLE perposts
-- RENAME COLUMN image TO pimage;

-- select * from perusers order by id asc;
-- select * from perposts order by id asc;
-- select * from percomments order by id asc;
-- select * from perbooks order by id asc;

-- select username from perbooks join perposts on perbooks.id = perposts.book_id join perusers on perposts.user_id = perusers.id where book_id = 29;

-- select perusers.username,perbooks.name,perbooks.image,perbooks.user_id,perposts.* from perbooks 
-- join perposts on perbooks.id = perposts.book_id 
-- join perusers on perposts.user_id = perusers.id 
-- where book_id = 29;

-- select * from perposts where book_id = 29;

-- select * from perbooks join perposts on perbooks.id = perposts.book_id;

-- insert into perusers
-- (username, password,
-- first_name, last_name,
-- bio, profile_pic)
-- values
-- ('Freeps','63gr2','McGreeps','Yeep','I lik bios','https://example')
-- returning *;

-- select * from perbooks order by id asc
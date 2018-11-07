insert into perposts
(likes,dates,pimage,user_id,book_id)
values
($1,$2,$3,$4,$5);
select * from perusers where id = $4
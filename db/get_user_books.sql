-- select perbooks.*,perposts.* 
-- from perbooks 
-- join perposts 
-- on perbooks.id = perposts.book_id 
-- join perusers 
-- on perusers.id = perbooks.user_id 
-- where perusers.id = $1;
select * from perbooks where user_id = $1
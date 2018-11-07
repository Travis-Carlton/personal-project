-- select * from perbooks join perposts on perbooks.id = perposts.book_id;

select perusers.username,perbooks.name,perbooks.image,perbooks.user_id,perposts.* from perbooks 
join perposts on perbooks.id = perposts.book_id 
join perusers on perposts.user_id = perusers.id 
where book_id = $1;


-- select * from perposts where book_id = $1
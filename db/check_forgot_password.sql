select count(id) from perusers 
where username = $1 
and user_email = $2;
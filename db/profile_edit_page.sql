update perusers
set first_name = $2,
    last_name = $3,
    bio = $4,
    profile_pic = $5,
    user_email = $6
where id = $1;
select * from perusers where id = $1
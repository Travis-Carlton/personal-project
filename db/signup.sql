insert into perusers
(username, password,
first_name, last_name,
bio, profile_pic,
user_email)
values
($1,$2,$3,$4,$5,$6,$7)
returning *
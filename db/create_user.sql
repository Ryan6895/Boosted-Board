INSERT INTO users(firstname, lastname, apiid, profilepic)
values ($1, $2, $3, $4)
RETURNING *;

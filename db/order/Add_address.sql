UPDATE orders
SET address = $1 ,email = $2
WHERE id = $3;

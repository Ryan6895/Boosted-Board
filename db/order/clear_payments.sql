UPDATE payments
SET active = false
WHERE userid = $1 AND active = true;

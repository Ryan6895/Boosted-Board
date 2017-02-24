SELECT SUM(amount)
FROM payments
WHERE userid = $1
AND active = 'true';

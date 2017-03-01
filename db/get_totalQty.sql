SELECT SUM (qty)
FROM products_in_order
WHERE order_id = $1;

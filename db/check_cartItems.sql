SELECT id
FROM products_in_order
WHERE order_id = $2 AND product_id = $1;

UPDATE products_in_order
SET qty = $2
WHERE product_id = $1

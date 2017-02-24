UPDATE products_in_order
SET qty = qty + 1
WHERE product_id = $1

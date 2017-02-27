SELECT products_in_order.product_id, products_in_order.order_id, products_in_order.qty, items.itemname, items.itemid, items.image, items.price
FROM products_in_order
LEFT JOIN items
ON products_in_order.product_id = items.itemid
LEFT JOIN orders
ON orders.id = products_in_order.order_id
AND orders.user_id = ($1)
WHERE orders.id = $2;

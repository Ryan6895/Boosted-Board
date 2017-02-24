SELECT products_in_order.product_id, products_in_order.order_id, products_in_order.qty, items.itemname, items.itemid, items.price
FROM products_in_order
LEFT JOIN items
ON products_in_order.product_id = items.itemid
AND products_in_order.order_id = ($1)

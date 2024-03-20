CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

-- INSERT INTO products(quantity, order_id, product_id) VALUES(2, 1, 2);
-- INSERT INTO products(quantity, order_id, product_id) VALUES(3, 2, 2);
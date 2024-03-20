CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
);

-- INSERT INTO products(name, price) VALUES('milk', 10);
-- INSERT INTO products(name, price) VALUES('bread', 20);
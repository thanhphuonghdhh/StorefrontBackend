# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index GET: http://localhost:3000/products
- Show GET: http://localhost:3000/product/:id
- Create [token required]: POST http://localhost:3000/product

#### Users
- Index [token required] GET: http://localhost:3000/users
- Show [token required] GET: http://localhost:3000/user/:id
- Create N[token required] POST: http://localhost:3000/user

#### Orders
- Current Order by user (args: user id)[token required] GET: http://localhost:3000/orders/:userId
- [OPTIONAL] Completed Orders by user (args: user id)[token required] GET: http://localhost:3000/completed-orders/:userId

## Data Shapes
#### Product
- id
- name
- price

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
);

#### User
- id
- firstName
- lastName
- password

CREATE TABLE users(
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    id SERIAL PRIMARY KEY
)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

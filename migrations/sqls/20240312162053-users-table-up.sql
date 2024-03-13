CREATE TABLE users(
    username VARCHAR(100) NOT NULL, 
    password_digest VARCHAR NOT NULL,
    id SERIAL PRIMARY KEY
)
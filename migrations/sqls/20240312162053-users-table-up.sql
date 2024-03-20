CREATE TABLE users(
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    id SERIAL PRIMARY KEY
);
-- INSERT INTO users(firstname, lastname, username, password) VALUES('phuong','vuong','pv','1');
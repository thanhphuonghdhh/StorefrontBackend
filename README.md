# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.
### NOTE:
After run npm install, PLEASE RUN `install npm i --save-dev @types/pg@8.11.2` because it may have an error when version of types/pg > 8.11.2.

## Steps to Completion

### 1. Plan to Meet Requirements
- Please read my note on REQUIREMENTS.md

### 2.  DB Creation and Migrations
- Create and conect to databse: Go to SQL Shell using admin user postgres, and then entering these commands
    CREATE DATABASE storefront_db_dev;
    CREATE DATABASE storefront_db_test;
- Migrate database: Run this command: npm run migrate
- Database will run on port 5432

# ENV data:
POSTGRES_HOST=localhost  
POSTGRES_DB=storefront_db_dev  
POSTGRES_TEST_DB=storefront_db_test  
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=1  
ENV=dev  
BCRYPT_PASSWORD=thanhphuonghdhh  
SALT_ROUNDS=10  
TOKEN_SECRET=supersecrettoken  

# Scripts to run this project
start: npm start
test: npm test
build: npm build

# Changes after review
1. The project fails to build correctly: Please run `install npm i --save-dev @types/pg@8.11.2` as I noted before.
2. The value of the spec_dir must be the build folder and the spec files tested should be the test specs within the build folder: fixed

# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.

## Required Technologiesa
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

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
#!/bin/bash
set -e
# Create Schema
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE application;
EOSQL

# Create Table
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "application" <<-EOSQL
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
	    name VARCHAR ( 50 ) UNIQUE NOT NULL,
	    email VARCHAR ( 255 ) UNIQUE NOT NULL,
	    created_on TIMESTAMP NOT NULL
    );
EOSQL

# Add Users
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "application" <<-EOSQL
INSERT INTO users (name, email, created_on) VALUES ('user1','user1@example.com',(SELECT NOW()));
INSERT INTO users (name, email, created_on) VALUES ('user2','user2@example.com',(SELECT NOW()));
EOSQL


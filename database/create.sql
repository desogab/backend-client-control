-- CREATE OR REPLACE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON *
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp();
CREATE EXTENSION pgcrypto;
-- function to encrypt password on database
-- INSERT INTO users (email, password) VALUES (
--   'johndoe@mail.com',
--   crypt('johnspassword', gen_salt('bf'))
-- );

CREATE TABLE "professional_user" (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE "professional_info"(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	surname VARCHAR(100) NOT NULL,
	birthdate DATE NOT NULL,
	cpf char(14) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	phone VARCHAR(15) UNIQUE NOT NULL,
  profession PROFESSION NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
);

CREATE TABLE "client"(
  id SERIAL PRIMARY KEY NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  sponsor BOOLEAN,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL,
  cpf char(14) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  consultation_price MONEY NOT NULL,
  created_at DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "consultation_info" (
  id SERIAL PRIMARY KEY NOT NULL,
  date_visit DATE NOT NULL,
  hours_visit TIME NOT NULL,
);

CREATE TABLE "client_sponsor"(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  created_at DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "client_emergency"(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  created_at DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE "client_address"(
  id SERIAL PRIMARY KEY NOT NULL,
  street VARCHAR(100) NOT NULL,
  district VARCHAR (50) NOT NULL,
  number SMALLINT NOT NULL,
  city VARCHAR(50) NOT NULL,
  complement VARCHAR(25) NOT NULL,
  state char(2) NOT NULL,
  zipcode VARCHAR(25) NOT NULL,
  created_at DEFAULT CURRENT_TIMESTAMP 
);

CREATE TYPE PROFESSION AS ENUM(
  'PSICÓLOGO',
  'PSICÓLOGA',
  'DENTISTA',
  'NUTRICIONISTA'
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "professional_user" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE "professional_info"(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  profession VARCHAR(50) NOT NULL,
  professional_document VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3),
  user_id INTEGER UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "professional_user"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "client"(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  sponsor BOOLEAN,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  consultation_price MONEY NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3),
  professional_id INTEGER NOT NULL,
  FOREIGN KEY (professional_id) REFERENCES "professional_user"(id)
);

CREATE TABLE "consultation_info" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY PRIMARY KEY,
  date_visit DATE NOT NULL,
  hours_visit TIME NOT NULL,
  model VARCHAR(15),
  professional_id INTEGER UNIQUE NOT NULL,
  client_id INTEGER UNIQUE NOT NULL,
  FOREIGN KEY (professional_id) REFERENCES "professional_user"(id), ON UPDATE CASCADE ON DELETE CASCADE
  FOREIGN KEY (client_id) REFERENCES "client"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "client_sponsor"(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3),
  client_id INTEGER UNIQUE,
  FOREIGN KEY (client_id) REFERENCES "client"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "client_emergency"(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3),
  client_id INTEGER UNIQUE NOT NULL,
  FOREIGN KEY (client_id) REFERENCES "client"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "client_address"(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  street VARCHAR(100) NOT NULL,
  district VARCHAR (50) NOT NULL,
  number SMALLINT NOT NULL,
  city VARCHAR(50) NOT NULL,
  complement VARCHAR(25) NOT NULL,
  state char(2) NOT NULL,
  zipcode VARCHAR(25) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3),
  client_id INTEGER NOT NULL,
  FOREIGN KEY (client_id) REFERENCES "client"(id) ON UPDATE CASCADE ON DELETE CASCADE
);
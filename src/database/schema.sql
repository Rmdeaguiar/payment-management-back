CREATE TABLE IF NOT EXISTS users (
 	id SERIAL PRIMARY KEY,
  	name varchar(60) NOT NULL,
  	email varchar(60) NOT NULL UNIQUE,
  	password TEXT NOT NULL,
  	cpf varchar(11) DEFAULT NULL,
  	phone varchar(11) DEFAULT NULL

CREATE TABLE IF NOT EXISTS clients (
 	id SERIAL PRIMARY KEY,
  	name varchar(50) NOT NULL,
  	email varchar(50) NOT NULL UNIQUE,
  	cpf varchar(11) NOT NULL,
  	phone varchar(11) NOT NULL,
  	cep varchar(8),
  	publicplace TEXT,
  	complement TEXT,
  	district TEXT,
  	city TEXT,
  	state TEXT,
  	status varchar(20) default 'Inadimplente'
);

CREATE TABLE IF NOT EXISTS charges (
	id SERIAL PRIMARY KEY,
  	client_id INTEGER NOT NULL REFERENCES clients(id),
  	nameclient TEXT NOT NULL,
  	description TEXT NOT NULL,
  	statuscharge TEXT NOT NULL,
  	value TEXT NOT NULL,
  	due_date TIMESTAMP NOT NULL
)
CREATE TABLE Author (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100)
);

CREATE TABLE Book (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	author_id INT,
	isbn VARCHAR(50),
	barcode VARCHAR(50),
	FOREIGN KEY (author_id) REFERENCES Author(id)
);

CREATE TABLE Account (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100),
	password VARCHAR(100)
);

CREATE TABLE Loans (
	book_id INT,
	account_id INT,
	due_date DATE,
	FOREIGN KEY (book_id) REFERENCES Book(id),
	FOREIGN KEY (account_id) REFERENCES Account(id)
);
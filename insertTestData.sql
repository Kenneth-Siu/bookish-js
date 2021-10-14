INSERT INTO Author (id, name)
VALUES
	(1, 'J. K. Rowling'),
	(2, 'Iain M. Banks');
	
INSERT INTO Book (name, author_id, isbn, barcode)
VALUES
	('Harry Potter and the Philosopher''s Stone', 1, 'isbn1', 'barcode1'),
	('Harry Potter and the Chamber of Secrets', 1, 'isbn2', 'barcode2'),
	('Harry Potter and the Prisoner of Azkaban', 1, 'isbn3', 'barcode3'),
	('The Hydrogen Sonata', 2, 'isbn4', 'barcode4');

INSERT INTO Account (username, password)
VALUES
	('kenny', 'abadpassword');
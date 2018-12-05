DROP TABLE IF EXISTS books;
CREATE TABLE books (
   id SERIAL PRIMARY KEY,
   author VARCHAR(255),
   title VARCHAR(255),
   isbn VARCHAR(255),
   image_url VARCHAR(255),
   description VARCHAR(10000),
   bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES('Tyler Hood', 'The Great Code', '15646831645', 'https://placeholder.pics/svg/300', 'blah blah blah blah blah balh balh blah blah balha balhab balhb blah blah blah blah blah blah blah', 'bullshit');

INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES('Robin Hood', 'The Greatest Code', '78976546468', 'https://placeholder.pics/svg/300', 'blah blah blah blah blah balh balh blah blah balha balhab balhb blah blah blah blah blah blah blah', 'bullshit');

INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES('Hood', 'The Greatish Code', '05135138464', 'https://placeholder.pics/svg/300', 'blah blah blah blah blah balh balh blah blah balha balhab balhb blah blah blah blah blah blah blah', 'bullshit');
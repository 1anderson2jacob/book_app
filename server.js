'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
//const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for templating
app.set('view engine', 'ejs');

//showing app where to find resources
app.use(express.static('./public'));
app.use(express.urlencoded( {extended: true} ));
// ++++++++++++ ROUTES ++++++++++++++++

//route for home view
app.get('/', getBooks);

app.get('/books/:book_id', getOneBook);
app.get('/search', getSearch);

//handler for POST request to /searches
app.post('/searches', createSearch);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// ++++++++++++ MODELS ++++++++++++++++
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.volumeInfo.title || 'No title available';
  this.isbn = info.volumeInfo.industryIdentifiers[0].identifier || info.volumeInfo.industryIdentifiers[1].identifier || 'No ISBN available';
  this.image_url = info.volumeInfo.imageLinks.smallThumbnail|| placeholderImage;
  this.author = info.volumeInfo.authors || 'No author available';
  this.description = info.volumeInfo.description || 'No description available';
}
// ++++++++++++ HELPERS ++++++++++++++++

function getBooks(request, response) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => response.render('pages/index', { results: results.rows }))
    .catch(error => handleError(error, response));
}

function getOneBook(request, response) {
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [request.params.book_id];

  return client.query(SQL, values)
    .then(result => {
      return response.render('pages/searches/detail-view', { book: result.rows[0] });
    })
    .catch(err => handleError(err, response));
}

function getSearch(request, response) {
  response.render('pages/search.ejs');
}

// ++++++++++++ HANDLERS ++++++++++++++++

// Error handler
function handleError(err, res) {
  console.error(err);
  res.render('pages/error.ejs', {error: 'Uh Oh'});
}

// No API key required
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.searchRadio === 'title') { url += `+intitle:${request.body.searchTerm}&maxResults=40`; }
  if (request.body.searchRadio === 'author') { url += `+inauthor:${request.body.searchTerm}&maxResults=40`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(results => response.render('pages/searches/search-results', {searchResults: results}))
    .catch(error => handleError(error, response));
}

'use strict';

console.log('Proof of life');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require(/models/books.js)
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
//-----ENDPOINTS-----//
app.get('/test', (request, response) => {
  response.status(200).send('test request received')
})

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let allBooks = await books.find({});

    response.status(200).send(allBooks);
  } catch {
    console.log(error.Message);
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});

app.use((error, request, response, next) => {
  response.status(500).send(Error.Message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

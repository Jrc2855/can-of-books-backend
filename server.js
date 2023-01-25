'use strict';

console.log('Proof of life');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/books.js');
const app = express();
app.use(cors());
app.use(express.json()); // ! This is important
const PORT = process.env.PORT || 3002;



mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});



//-----ENDPOINTS-----//
app.get('/', (request, response) => {
  response.status(200).send('Backend Successfully Running')
})

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  
  try {
    let allBooks = await Book.find({});
    response.status(200).send(allBooks);

  } catch(error) {
    console.log(error.message);
    next(error);
  }
}

// ***** This Endpoint Creates a new book *****
app.post('/books', postBook);
async function postBook(request, response, next) {
  try{
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch(error) {
    console.log(error.message);
    next(error);
  }
}

// ****** This Endpoint deletes a book ******
app.delete('/books/:bookId', deleteBook);
async function deleteBook(request, response, next) {
  try {
    let id = request.params.bookId;
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book Deleted');
  } catch(error){
    console.log(error.message);
    next(error);
  } 
}






app.get('*', (request, response) => {
  response.status(404).send('Error 404');
});

app.use((error, request, response, next) => {
  response.status(500).send(Error.Message);
});

//-----ENDPOINT TO DELETE-----//
app.delete('/cats/:catID', deleteCats);

async function deleteCats(request,response,next){
  try {
    let id = request.params.catID;

    await MODELNAME.findByIdAndDelete(id);

    response.status(200).send('Cat Deleted');
  } catch(error) {
    console.log(error.message);
    next(error);
  }
}

//-----ENDPOINT TO CREATE-----//
app.post('/cats', postCat);

async function postCat(request, response, next){
  try{
    let createdCat = await Cat.create(request.body);

    response.status(200).send(createdCat);


  } catch(error) {
    console.log(error.message);
    next(error);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

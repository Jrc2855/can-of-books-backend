'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function seed() {
  await Book.create({
    title: 'The Hobbit',
    description: 'They have taken the hobbits to Isenguard',
    status: 'available',
    image: 'bookIMG.jpg'
  });

  console.log('The Hobbit was created!');

  await Book.create({
    title: 'The Alchemist',
    description: 'Maktub',
    status: 'available',
    image: 'bookIMG.jpg'

  });

  console.log('The Alchemist was created');

  await Book.create({
    title: 'Romeo and Juliet',
    description: 'Romeo and Juliet are deceased',
    status: 'unavailable',
    image: 'bookIMG.jpg'

  });

  console.log('Romeo and Juliet was created');

  mongoose.disconnect();
}

seed();
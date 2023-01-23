'use strict';

console.log('Proof of life');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//-----ENDPOINTS-----//
app.get('/test', (request, response) => {
  response.status(200).send('test request received')
})

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('*', (request,response)=> {
  response.status(404).send('Not Available');
});

app.use((error, request, response, next) =>{
  response.status(500).send(Error.Message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

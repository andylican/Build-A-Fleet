//Populates the database with starship data from swapi
//DO NOT RUN IT MORE THAN ONCE
var express = require('express');
var fetch = require("node-fetch");
var app = express();
require('dotenv').config();
var starships;
var db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('process.env.MONGO_URI',{
  useUnifiedTopology: true})
  .then(client =>{
    db = client.db('star-wars');
    starships = db.collection('starships');
   for(var i=0; i<=100; i++) {
     let response = fetch('https://swapi.dev/api/starships/'+i+'/')
     .then(response => response.json())
     .then(data => {
       if(data.detail == null) {
         starships.insertOne(data);
       }



     });
   }




  console.log('Connected to Database');


});

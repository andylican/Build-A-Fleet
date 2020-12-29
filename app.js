var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var app = express();
var starships;
var db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGO_URI,{
  useUnifiedTopology: true})
  .then(client =>{

  console.log('Connected to Database');
   db = client.db('star-wars');
  starships = db.collection('starships');

});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  //res.send("AWDDWADAWADW");


    res.sendfile('index.html');



  // ...
})
app.post('/starshipsFirst', (req,res) => {
  db.createCollection("owned");
  db.collection('owned').remove();
  db.collection('starships').find().forEach( function (x) {
     x.cost_in_credits = parseInt(x.cost_in_credits);
     db.collection('starships').save(x);
});
db.collection('starships').find({cost_in_credits: {$lt: parseInt(req.body.credits)}}).toArray()

  .then (results => {
    console.log(req.body.credits)
    console.log(results.length)
    res.render("index.ejs",{ships: results,creditsLeft: req.body.credits,owned: {}});


  })

})
app.post('/starships', (req,res) => {
  db.collection('starships').find().forEach( function (x) {
     x.cost_in_credits = parseInt(x.cost_in_credits);
     db.collection('starships').save(x);
});
db.collection('starships').find({cost_in_credits: {$lt: parseInt(req.body.credits)}}).toArray()

  .then (results => {
    //console.log(req.body.credits)
    //console.log(results.length)
    db.collection('owned').update({name: req.body.owned},
      {$inc: {count: 1},
       $set: {name: req.body.owned}
     }, {upsert: true}).then (data => {
    db.collection('owned').find().toArray()
    .then(results2 => {
    //  console.log(results2);

//      console.log("Array: "+results2);
    //  console.log("Length: "+results2.length);

       res.render("index.ejs",{ships: results,creditsLeft: req.body.credits,owned: results2});
    })
}  )

  })


  //.catch(error => console.error(error))
  //res.send("RECIEVED");
  /*
  db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs',{quotes: results})
    })
    .catch(error => console.error(error))
    */
})


//app.use(bodyParser.json());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

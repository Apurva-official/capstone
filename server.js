

// jshint vscode es6
const path = require('path')
const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql');
// const xhbs = require('express-handlebars')

const app = express();

const port = process.env.PORT || 5000





// mysql 
const db = mysql.createConnection({
  /* here data has been used as it is and not in ".env" because this is a task given for a examine purpose.*/
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'task2_nodejs'
})



const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');

// db connection
db.connect( (error) => {
  if(error){
    console.log(error)
  } 
  else{
    console.log("MySQL Connected...")
  }
} ) 

//Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))


// listening on port
app.listen(port, function(req, res){
  console.log(`Listening on port ${port}`)
})



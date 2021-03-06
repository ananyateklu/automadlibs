// Shout-out to https://developer.okta.com/blog/2019/08/16/angular-mysql-express

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('./events');
//const credentials = require('../credentials.json');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if(err){
      throw err;
  }
  console.log('Mysql connected...');
});

const port = process.env.PORT || 8080;

// create an Express server and configure a router (located in events.js)
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
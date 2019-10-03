const mysql = require('mysql');
const dotenv  = require('dotenv') // Enviroment Variable

dotenv.config();
database = mysql.createConnection({
    host: 'localhost',
    // Getting User Name From .env
    user: process.env.user,
    // Getting Password from .env
    password: process.env.password,
    database: 'books',
    multipleStatements:true
  });
  database.connect((err) => {
    if(err){
      console.log('Error connecting to Db',err);
      return;
    }
    console.log('Database Connection established');
  });

  module.exports = database;
  
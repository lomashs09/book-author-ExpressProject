const express = require('express');
const path = require('path');
const app = express();
const port =5000;
const data = require('./data');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const joi = require('joi')

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/api/books', require('./api/getRequestApi.js')); 
app.use('/api/update' ,require('./api/putRequestApi'));
app.use('/api',require('./api/deleteRequestApi'));
app.use('/api/add', require('./api/postRequestApi'));

app.get('/',(req,res)=>{
    return res.redirect("home");
})
// app.post('/submit', (req,res)=>{
//     var sql = "insert into User values('"+req.body.+"')"
// })
app.listen(port, () => console.log(`app listening on port ${port}!`));



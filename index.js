const express = require('express');
const app = express();
const port =5000;
const exphbs = require('express-handlebars');
const jwt = require("jsonwebtoken");
const exjwt = require('express-jwt');
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});





app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Registration Page for User
app.use('', require('./api/registration'));  
// Books API EndPoints
app.use('/api/', require('./api/booksApi')); 
//Authors API EndPoints
app.use('/api/' ,require('./api/authorApi'));



app.listen(port, () => console.log(`app listening on port ${port}!`));
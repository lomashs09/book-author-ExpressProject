const express = require('express');
const app = express();
const port =4000;
const exphbs = require('express-handlebars');
const checkToken = require("./middleware/verifyToken").checkToken;
const authenticateUser = require('./middleware/verifyToken').authenticateUser;

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// First Get the Token Send in Header
app.use(checkToken); 
// Using the Token Authenticate the User
app.use(authenticateUser);

// Registration Page for User
app.use('', require('./api/registration'));  
// Books API EndPoints
app.use('/api/', require('./api/booksApi')); 
//Authors API EndPoints
app.use('/api/' ,require('./api/authorApi'));

app.listen(port, () => console.log(`app listening on port ${port}!`));
const express = require('express');
const app = express();
const port =6000;
const exphbs = require('express-handlebars');

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Registration Page for User
app.use('', require('./api/registration'));  
// Books API EndPoints
app.use('/api/', require('./api/booksApi')); 
//Authors API EndPoints
app.use('/api/' ,require('./api/authorApi'));



app.listen(port, () => console.log(`app listening on port ${port}!`));
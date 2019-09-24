const express = require('express');
const app = express();
const port =5000;
const exphbs = require('express-handlebars');


app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Registration Page for User
app.use('', require('./registration'));  
// Get API EndPoints
app.use('/api/get', require('./api/getRequestApi.js')); 
//PUT Request EndPoints
app.use('/api/update' ,require('./api/putRequestApi'));
//DELETE Request EndPoints
app.use('/api',require('./api/deleteRequestApi'));
// PUT Request EndPoints
app.use('/api/add', require('./api/postRequestApi'));



app.listen(port, () => console.log(`app listening on port ${port}!`));


const express = require('express');
const path = require('path');
const app = express();
const port = 1343;
const data = require('./data');
const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('', require('./api/apimembers.js'));

app.listen(port, () => console.log(`app listening on port ${port}!`));



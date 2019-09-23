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
    return res.render("home");
})
app.post('/submit', (req,res)=>{
    // const schema = joi.object().keys({
    //     name:joi.string().alphanum().min(2).max(30).required(),
    //     email:joi.string().trim().email().required(),
    //     password:joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
    // });
    // joi.validate(req.body,schema,(err,result)=>{
    //     if(err){
    //         res.send('an Error has Occured, Please fill Properly Again');
    //     }
    //     else("posted success")
    // })
    var sql = "insert into User values('"+req.body.name+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.password+"');"
    database.query(sql,(err,rows,fields)=>{
        if(err){
            throw err;
        } else{
            res.render("formSubmit",{title: "You are Registered Succesfully"})
        }
    })
})
app.listen(port, () => console.log(`app listening on port ${port}!`));


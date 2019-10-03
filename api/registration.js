const express = require("express");
const router = express.Router();
const addUser = require('../db/query').addUser;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const validateUser = require('../validators').validateUser;
let saltRounds  = 10; 
router.get('/', (req, res) => {
  return res.render("home");
});
router.post('/submit', (req, res) => {
  let {error} = validateUser(req);
  if(!error){
  hashPassword(req.body.password).then((hashedPassword)=> 
  addUser(req,hashedPassword)
  .then(()=>createJwtSign(req,res))
  .catch((err)=>res.status(400).send(err.code))
  );
  
  }else{
      res.status(400).send(error.details[0].message);
      }
});

function createJwtSign(req,res){
  const User = {
    username: req.body.name,
    email: req.body.email
  };
    jwt.sign({ User }, "secretkey", (err, token) => {
      if(err){
        res.send("An Error Ocurred");
        throw err;
      }
      res.render("formSubmit",{title: "You are Registered Succesfully", token})
    });
}

function hashPassword(password){
  var hashedValue;
  return new Promise((resolve,reject)=>{
    bcrypt.hash(password, saltRounds, function(err, hash) {
     if(err){
       reject(err);
     }
     else{
       resolve(hash);
     }
  });

})
}
module.exports = router;

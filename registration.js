const express = require("express");
const router = express.Router();
const database = require("./config.js");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

router.get('/', (req, res) => {
  return res.render("home");
});

router.post('/submit', (req, res) => {
  const schema = joi.object({
      name:joi.string().alphanum().min(2).max(30).required(),
      email:joi.string().trim().email().required(),
      password:joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
      phone:joi.string().alphanum().min(5).max(11).required()
  });
  let newObj = {name:req.body.name, email:req.body.email, phone:req.body.phone,password:req.body.password}
  let {error} = schema.validate(newObj)
  if(!error){
  var sql =
    "insert into User values('" +
    req.body.name +
    "','" +
    req.body.email +
    "','" +
    req.body.phone +
    "','" +
    req.body.password +
    "');";
  database.query(sql, (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      const User = {
        username: req.body.name,
        email: req.body.email
      };
      jwt.sign({ User }, "secretkey", (err, token) => {
        // res.render("formSubmit",{title: "You are Registered Succesfully", token})
        res.json({ token });
      });
    }
  });
}
else{
  res.status(400).send(error.details[0].message);
}
});
// Verifying Token
function verifyToken(req, res, next) {
  // GET Auth Value
  requestHeader = req.headers["authorization"]; // User <token>
  // Check if not Undefined
  if (typeof requestHeader !== "undefined") {
    // split at space
    const tokenArray = requestHeader.split(' ');
    //Get TOKEN from array
    const UserToken = tokenArray[1];
    // Set Token
    req.token = UserToken;
    // Next Middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
module.exports.verifyToken = verifyToken;
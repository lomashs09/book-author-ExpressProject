
const jwt = require("jsonwebtoken");

// Verifying Token
function checkToken(req, res, next) {
  // Allowing Get request and form Submit
  if (req.method == "GET" || req.path == "/submit") {
    next();
  }else{
  // GET Auth Value
  requestHeader = req.headers["authorization"]; // User <token>
  // Check if not Undefined
  if (typeof requestHeader !== "undefined") {
    // split at space
    const tokenArray = requestHeader.split(" ");
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
}

function authenticateUser(req, res, next) {
  //Allowing GET request and Form Submit
  if (req.method == "GET" || req.path == "/submit") {
    next()
  } else {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  }
}


module.exports.checkToken = checkToken;
module.exports.authenticateUser = authenticateUser;

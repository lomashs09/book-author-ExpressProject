


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

  function authenticateUser(req,res){
    return new Promise((resolve,reject)=>{
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          reject(res);
        }
        else{
          resolve();
        }
      })
    })
  }
  

  module.exports.verifyToken = verifyToken;
  module.exports.authenticateUser = authenticateUser;
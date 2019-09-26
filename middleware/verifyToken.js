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

  module.exports = verifyToken;
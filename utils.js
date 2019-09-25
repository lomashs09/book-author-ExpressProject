const joi = require("@hapi/joi");

// Validate Books Details Send in Request
function validateBookDetails(bookDetail) {
  const schema = joi.object({
    author_id: joi
      .number()
      .integer()
      .min(1)
      .max(1000),
    title: joi.string().required(),
    GENRE: joi
      .string()
      .min(1)
      .max(20),
    book_id: joi
      .number()
      .integer()
      .min(4)
      .required()
  });
  return schema.validate(bookDetail);
}
// Validate Author Details Send in Request
function validateAuthorDetail(authorDetail) {
  const schema = joi.object({
    author_id: joi.string().pattern(/^[0-9]*$/),
    name: joi
      .string()
      .pattern(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate(authorDetail);
}

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

module.exports.validateBookDetails = validateBookDetails;
module.exports.validateAuthorDetail = validateAuthorDetail;
module.exports.verifyToken = verifyToken;

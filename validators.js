const joi = require("@hapi/joi");

// Validate Books Details Send in Request
function validateBook(req) {
  let bookDetail = {
    title: req.body.title,
    book_id: req.body.book_id,
    GENRE:req.body.GENRE,
    author_id:req.body.author_id
  };
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
function validateAuthor(req) {
  let authorParams = { author_id: req.body.author_id, name: req.body.name };  
  const schema = joi.object({
    author_id: joi.string().pattern(/^[0-9]*$/),
    name: joi
      .string()
      .pattern(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate(authorParams);
}


module.exports.validateBook = validateBook;
module.exports.validateAuthor = validateAuthor;


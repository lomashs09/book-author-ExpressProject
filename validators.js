const joi = require("@hapi/joi");

// Validate Books Details Send in Request
function validateBook(bookDetail) {
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
function validateAuthor(authorDetail) {
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


module.exports.validateBook = validateBook;
module.exports.validateAuthor = validateAuthor;


const express = require("express");
const router = express.Router();
const database = require("../config.js");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const verifyToken = require("../registration").verifyToken;
router.use(express.json());

router.post("/books", verifyToken, (req, res) => {
  let bookDetail = {
    author_id: req.body.author_id,
    title: req.body.title,
    GENRE: req.body.GENRE,
    book_id: req.body.book_id
  };
  let { error } = validateBookDetails(bookDetail);
  if (!error) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var sql =
          "INSERT INTO books VALUES('" +
          req.body.author_id +
          "' , '" +
          req.body.title +
          "','" +
          req.body.GENRE +
          "'," +
          req.body.book_id +
          ")";
        database.query(sql, (err, rows) => {
          if (!err) {
            res.send(rows);
          } else {
            res
              .status(400)
              .send(
                `Error Either Book Id ${req.body.book_id} already Exist or Author Id donot exist in Author Table`
              );
          }
        });
      }
    });
  } else {
    res.status(400).send(error.details[0].message);
  }
});

function validateBookDetails(bookDetail) {
  const schema = joi.object({
    author_id: joi
      .number()
      .integer()
      .min(1)
      .max(1000)
      .required(),
    title: joi.string().required(),
    GENRE: joi
      .string()
      .min(1)
      .max(20)
      .required(),
    book_id: joi
      .number()
      .integer()
      .min(4)
      .required()
  });
  return schema.validate(bookDetail);
}

router.post("/authors", verifyToken, (req, res) => {
  // Author Detail for Validation using JOI
  let authorDetail = { name: req.body.name };
  let { error } = validateAuthorDetail(authorDetail);
  if (!error) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var sql = "INSERT INTO author VALUES(null,'" + req.body.name + "')";
        database.query(sql, (err, rows, fields) => {
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            res.status(400).send(`Check the author name again`);
          }
        });
      }
    });
  } else {
    res.status(400).send(error.details[0].message);
  }
});

function validateAuthorDetail(authorDetail) {
  const schema = joi.object({
    name: joi
      .string().pattern(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate(authorDetail);
}

module.exports = router;

const express = require("express");
const router = express.Router();
const database = require("../config.js");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const verifyToken = require("../registration").verifyToken;

router.put("/book",verifyToken, (req, res) => {
  let bookDetail = {
    title: req.body.title,
    book_id: req.body.book_id
  };
  let { error } = validateBookDetails(bookDetail);
  if (!error) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let sql = `UPDATE books SET title = "${req.body.title}" where book_id = ${req.body.book_id};`;
      console.log(sql);
      database.query(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
      });
    }
  });
}
});

router.put("/author",verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let sql = `UPDATE author SET name = "${req.body.name}" where author_id = ${req.body.author_id};`;
      database.query(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
      });
    }
  });
});

module.exports = router;

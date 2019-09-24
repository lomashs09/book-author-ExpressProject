const express = require("express");
const router = express.Router();
const database = require("../config.js");
const jwt = require("jsonwebtoken");
const verifyToken = require("../registration").verifyToken;

router.delete("books/:id",verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let sql = `DELETE FROM books WHERE book_id =` + [req.params.id];
      database.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {
          res.send("Successfuly deleted");
        }
      });
    }
  });
});

router.delete("/authors/:id",verifyToken,(req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let sql = `DELETE FROM author WHERE author_id =` + [req.params.id];
      database.query(sql, (err, results) => {
        if (err) {
          throw err;
        } else {
          res.send("Successfuly deleted");
        }
      });
    }
  });
});


module.exports = router;

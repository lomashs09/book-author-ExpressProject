const express = require("express");
const router = express.Router();
const database = require("../db/config.js");
const jwt = require("jsonwebtoken");
const validateBook = require('../validators').validateBook;
const verifyToken = require('../middleware/verifyToken');
router.use(express.json());


// GET METHOD

router.get("/get/books", (req, res) => {
    let sql = "SELECT * FROM books";
    database.query(sql,(err, results) => {
      if (err) {
        throw err;
      } else {
        if (req.headers["content-type"] == "application/json") {
          //if jsonObj is requested
          return res.json(results);
        } else {
          return res.render("index", { title: "Books and Authors", results }); //else html will be rendere
        }
      }
    });
  });
  
  router.get("/get/books/:id",(req, res) => {
    let sql = `SELECT title FROM books where book_id =` + req.params.id;
    database.query(sql, (err, results) => {
      if (err) {
        throw err;
      } else {
        if (req.headers["content-type"] == "application/json") {
          //if jsonObj is requested
          return res.json(results);
        } else {
          return res.render("bookId", {
            title: "Books for the Required Id",
            results
          }); //else html will be rendere
        }
      }
    });
  });

  // PUT METHOD
  router.put("/update/book",verifyToken, (req, res) => {
    let bookDetail = {
      title: req.body.title,
      book_id: req.body.book_id
    };
    let { error } = validateBook(bookDetail);
    if (!error) {
    // Verify JWT Token 
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        let sql = `UPDATE books SET title = "${req.body.title}" where book_id = ${req.body.book_id};`;
        database.query(sql, (err, rows) => {
          if (err) {
            throw err;
          } else {
            res.send(rows.message);
          }
        });
      }
    });
  }else{
    res.status(400).send(error.details[0].message);
  }
  });


  // POST METHOD

  router.post("/add/book", verifyToken, (req, res) => {
    // Books Detail for Validation using JOI
      let bookDetail = {
          author_id: req.body.author_id,
          title: req.body.title,
          GENRE: req.body.GENRE,
          book_id: req.body.book_id
        };
    // Validate using JOI
    let { error } = validateBook(bookDetail);
  
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
                .status(400)  //Bad Request
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

//   DELETE Method

router.delete("/delete/book/:id",verifyToken, (req, res) => {
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

  module.exports = router;
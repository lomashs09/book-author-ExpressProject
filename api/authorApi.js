const express = require("express");
const router = express.Router();
const database = require("../db/config.js");
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/verifyToken');
const validateAuthor = require('../validators').validateAuthor;
router.use(express.json());

// GET Method

router.get("/get/authors", (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT * FROM author order by author_id ASC`;
  database.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      if (req.headers["content-type"] == "application/json") {
        //if jsonObj is requested
        return res.json(results);
      } else {
        return res.render("author", {
          title: "Name Of All Authors",
          results
        }); //else html will be rendere
      }
    }
  });
});

router.get("/get/authors/:id", (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT name FROM author where author_id =` + req.params.id;
  database.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      if (req.headers["content-type"] == "application/json") {
        //if jsonObj is requested
        return res.json(results);
      } else {
        return res.render("authorId", {
          title: "Author for the id:" + req.params.id,
          results
        }); //else html will be rendere
      }
    }
  });
});

// PUT Method

router.put("/update/author", verifyToken, (req, res) => {
  // Validate Recieved Details
  let authorDetail = { author_id: req.body.author_id, name: req.body.name };
  let { error } = validateAuthor(authorDetail);
  if (!error) {
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
  } else {
    res.status(400).send(error.details[0].message);
  }
});

// POST Method

router.post("/add/author", verifyToken, (req, res) => {
  // Author Detail for Validation using JOI
  let authorDetail = { name: req.body.name };
  // Validate using JOI
  let { error } = validateAuthor(authorDetail);
  if (!error) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        //Forbidden
        res.sendStatus(403);
      } else {
        var sql = "INSERT INTO author VALUES(null,'" + req.body.name + "')";
        database.query(sql, (err, rows, fields) => {
          if (!err) {
            res.send({msg: "Added Successfully", rows});
          } else {
            // Bad Request
            res.status(400).send(`Check the author name again`);
          }
        });
      }
    });
  } else {
    res.status(400).send(error.details[0].message);
  }
});

// DELETE Method

router.delete("/delete/author/:id", verifyToken, (req, res) => {
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

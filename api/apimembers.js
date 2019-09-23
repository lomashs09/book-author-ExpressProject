
const express = require('express');
const router  = express.Router();
const database = require('../config.js')

// First you need to create a connection to the db

const con = database;
router.get("/books", (req, res) => {
  let sql = "SELECT * FROM books";
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      if (req.headers["content-type"] == "routerlication/json") {
        //if jsonObj is requested
        return res.json(results);
      } else {
        return res.render("index", { title: "Books and Authors", results }); //else html will be rendere
      }
    }
  });
});

router.get("/books/:id", (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT title FROM books where book_id =` + req.params.id;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      if (req.headers["content-type"] == "routerlication/json") {
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


router.get("/authors", (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT * FROM author order by author_id ASC`;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      if (req.headers["content-type"] == "routerlication/json") {
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

router.get("/authors/:id", (req, res) => {
    console.log(req.params.id);
    let sql = `SELECT name FROM author where author_id =` + req.params.id;
    con.query(sql, (err, results) => {
      if (err) {
        throw err;
      } else {
        if (req.headers["content-type"] == "routerlication/json") {
          //if jsonObj is requested
          return res.json(results);
        } else {
          return res.render("authorId", {
            title: "Author for the id:"+ req.params.id,
            results
          }); //else html will be rendere
        }
      }
    });
  });


// router.get('/',(req,res) => {
// if(req.headers["content-type"] == "application/json"){  //if jsonObj is requested
//     return res.json(data)
// }
// else{
// return res.render('index',{title:'Books and Authors',data})   //else html will be rendered
// }
// });

module.exports = router;
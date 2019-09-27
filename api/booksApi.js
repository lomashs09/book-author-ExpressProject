const express = require("express");
const router = express.Router();
const validateBook = require('../validators').validateBook;
const verifyToken = require('../middleware/verifyToken').verifyToken;
router.use(express.json());
const query = require('../db/query')
// GET METHOD

router.get("/get/books", (req, res) => {
       query.getEntityFromTable("books")
      .then(results => renderBooks(req,res,results))
      // .catch(console.log(err));
      });

function renderBooks(req,res,results){
  if (req.headers["content-type"] == "application/json") {
    //if jsonObj is requested
    return res.json(results);
    } else {
    return res.render("index", { title: "Books and Authors", results }); //else html will be rendere
  }
}

  router.get("/get/books/:id",(req, res) => {
     query.getBookById(req)
    .then(results=> renderBoookById(req,res,results))
    });
  
  function renderBoookById(req,res,results){
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

  // PUT METHOD
  router.put("/update/book",verifyToken, (req, res) => {
    let { error } = validateBook(req);
    if (!error) {
    query.updateBook()
    .then((rows)=>{res.send(rows)})
        .catch((err => {throw err}))
      } else {
        res.status(400).send(error.details[0].message);
      }
    });

  // POST METHOD

  router.post("/add/book", verifyToken, (req, res) => {
    // Validate using JOI
    let { error } = validateBook(req); 
    if (!error)
    query.addBook(req)
    .then(results=>{res.send({ msg: "Added Successfully", results });
    })
    .catch(()=>{
      res.status(400).send(`Check the author name again`);
    })
    });

//   DELETE Method

router.delete("/delete/book/:id",verifyToken, (req, res) => {
  query.deleteBook()
  .then((result)=>{
    res.send({msg: "Deleted Successfully", result})
  })
  .catch(( )=>{
    send.status(400).send("Please check the Id provided for delete")
  })
  });

  module.exports = router;
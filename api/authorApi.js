const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken").verifyToken;
const authenticateUser = require('../middleware/verifyToken').authenticateUser;
const validateAuthor = require("../validators").validateAuthor;
const query = require("../db/query")

// GET Method
router.get("/get/authors", (req, res) => {
  query.getEntityFromTable("author").then(results =>
    renderAuthors(req, res, results)
  );
});

function renderAuthors(req, res, results) {
  if (req.headers["content-type"] == "application/json") {
    //if jsonObj is requested
    return res.json(results);
  } else {
    return res.render("author", { title: "Authors", results }); //else html will be rendere
  }
}

router.get("/get/authors/:id", (req, res) => {
  query.getAuthorByAuthorId(req).then(results => {
    renderAuthorId(req, res, results);
  });
});

function renderAuthorId(req, res, results) {
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

// PUT Method

router.put("/update/author", verifyToken, (req, res) => {
       authenticateUser(req,res)
      .then(()=>{
        let { error } = validateAuthor(req);
        if (!error) {
          query.updateAuthor(req).then((rows)=>{res.send(rows)})
          .catch((err => {throw err}))
        } else {
          res.status(400).send(error.details[0].message);
        }
      })
      .catch((req)=> res.sendStatus(403));
      // Validate Recieved Details
    })

// POST Method

router.post("/add/author", verifyToken, (req, res) => {
  // Validate using JOI
  let { error } = validateAuthor(authorDetail);
  
  if (!error) {
      query.addAuthor(req,res).then((results)=>{
        res.send({ msg: "Added Successfully", results });
      })
      .catch(()=>{// Bad Request
        res.status(400).send(`Check the author name again`);
      })
      } else {
    res.status(400).send(error.details[0].message);
  }
});

// DELETE Method

router.delete("/delete/author/:id", verifyToken, (req, res) => {
    query.deleteAuthor(req,res).then((result)=>{
      res.send({msg: "Deleted Successfully", result})
    })
    .catch(( )=>{
      send.status(400).send("Please check the Id provided for delete")
    })
});
module.exports = router;

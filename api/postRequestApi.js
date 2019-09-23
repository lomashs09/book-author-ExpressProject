const express = require('express');
const router  = express.Router();
const database = require('../config.js');

router.use(express.json());

router.post('/books',(req,res)=>{
    console.log(req.body);
    var sql ="INSERT INTO books VALUES('"+req.body.author_id+ "' , '"+req.body.title+"','"+req.body.GENRE+"',"+req.body.book_id+")"
    database.query(sql,(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send("Error in adding",err)
        }
    })
})

router.post('/authors',(req,res)=>{
    console.log(req.body);
    var sql ="INSERT INTO author VALUES(null,'"+req.body.name+"')"
    database.query(sql,(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows)
        }
        else{
            throw err;
            
        }
    })
})
module.exports = router;
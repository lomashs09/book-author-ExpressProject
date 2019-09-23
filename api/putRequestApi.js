const express = require('express');
const router  = express.Router();
const database = require('../config.js');


router.put('/book',(req,res)=>{
    let sql = `UPDATE books SET title = "${req.body.title}" where book_id = ${req.body.book_id};`;
    console.log(sql);
    database.query(sql,(err,rows)=>{
        if(err){
            throw err;
        } else{
            res.send(rows)
        }
    })
})

router.put('/author',(req,res)=>{
    let sql = `UPDATE author SET name = "${req.body.name}" where author_id = ${req.body.author_id};`;
    console.log(sql);
    database.query(sql,(err,rows)=>{
        if(err){
            throw err;
        } else{
            res.send(rows)
        }
    })
})

module.exports = router;
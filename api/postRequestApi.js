const express = require('express');
const router  = express.Router();
const database = require('../config.js');


router.post('/books',(req,res)=>{
    let book = req.body;
    var sql ="SET @author_id = ?; SET @title = ?; SET @GENRE = ?; SET book_id =?; \
    CALL books(@author_id, @title,@WebGLRenderbuffer,@book_id);"
    database.query(sql,[book.author_id,book.title,book.GENRE,book.book_id],[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

module.exports = router;
const express = require('express');
const router  = express.Router();
const database = require('../config.js');

router.delete("books/:id",(req,res)=>{
    let sql = `DELETE FROM books WHERE book_id =`+[req.params.id]
    database.query(sql, (err,results)=>{
        if(err){
            throw err;
        }
        else{   
            res.send("Successfuly deleted");
            }
    })

});

router.delete("/authors/:id",(req,res)=>{
    let sql = `DELETE FROM author WHERE author_id =`+[req.params.id]
    database.query(sql, (err,results)=>{
        if(err){
            throw err;
        }

        else{   
            res.send("Successfuly deleted");
            }
    })
});
module.exports = router;
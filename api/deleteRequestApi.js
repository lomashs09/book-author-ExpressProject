const express = require('express');
const router  = express.Router();
const database = require('../config.js');

router.delete("/:id",(req,res)=>{
    let sql = `DELETE FROM books WHERE book_id =`+[req.params.id]
    console.log(sql)
    database.query(sql, (err,results)=>{
        if(err){
            throw err;
        }
        else{
                successMsg(req);
            }
    })
    res.redirect('/');

});
function successMsg(res){
    res.send("Successfuly deleted");
}
module.exports = router;
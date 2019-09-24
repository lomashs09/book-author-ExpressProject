const express = require('express');
const router  = express.Router();
const database = require('../config.js');
const jwt = require("jsonwebtoken");
const verifyToken= (require('../registration')).verifyToken
router.use(express.json());

router.post('/books',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403)    
        }
        else{
            var sql ="INSERT INTO books VALUES('"+req.body.author_id+ "' , '"+req.body.title+"','"+req.body.GENRE+"',"+req.body.book_id+")"
            database.query(sql,(err,rows)=>{
                if(!err){
                    res.send(rows);
                }
                else{
                    res.sendStatus(400);
                    throw err;
                }
            })
        }
    });

})
router.post('/authors',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
    if(err){
        res.sendStatus(403);
    }
    else{
    var sql ="INSERT INTO author VALUES(null,'"+req.body.name+"')"
    database.query(sql,(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows)
        }
        else{
            throw err;
        }
    });
}
});
});
module.exports = router;
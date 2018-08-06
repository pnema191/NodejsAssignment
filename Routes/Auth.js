const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.get("/auth",(req,res)=>{
    var token = req.query.token;
    if(typeof token !== 'undefined'){
        jwt.verify(token,'secretKey',(err, authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                res.json({
                    message:"Verified authentication"
                })
            }
        });
    }
});
module.exports = router;
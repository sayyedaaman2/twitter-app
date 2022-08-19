const db = require('../model');
const User = db.user;

const ValidLoginBody = (req, res , next) =>{
    if(!req.body.username){
        res.status(400).send({
            message : "please Provide username"
        })
        return;
    }
   
    if(!req.body.password){
        res.status(400).send({
            message : "please Provide password"
        })
        return;
    }
    next();
}

const ValidSignBody = (req, res , next) =>{
    if(!req.body.username){
        res.status(400).send({
            message : "please Provide username"
        })
        return;
    }
    if(!req.body.email){
        res.status(400).send({
            message : "please Provide email"
        })
        return;
    }
    if(!req.body.password){
        res.status(400).send({
            message : "please Provide password"
        })
        return;
    }
    next();
}

const checkDuplicateUsernameOrEmail = (req, res, next) =>{
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user =>{
        if(user){
            res.status(400).send({
                message : "UserName already exists"
            })
            return;
        }

        User.findOne({
            where : {
                email : req.body.email
            }
        }).then(user =>{
            if(user){
                res.status(400).send({
                    message : "email already exists"
                })
                return;
            }
            next();
        })
    })
}

const verifySignUp = { checkDuplicateUsernameOrEmail , ValidSignBody , ValidLoginBody}
module.exports = verifySignUp;
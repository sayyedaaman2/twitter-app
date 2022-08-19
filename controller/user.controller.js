const db = require('../model');
const User = db.user;
const Follower = db.follower;
const Following = db.following;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.signUp = (req, res)=>{
    const userObj = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    }

    User.create(userObj).then(user=>{
        console.log("User registered SuccessFully ");
        res.status(200).send({
            message : " User registered SuccessFully "
        });
    }).catch(err=>{
        console.log('Some while creating user', err);
        res.status(500).send({
            message : "Some internal Error"
        })
    })
}

exports.signIn = (req, res)=>{

    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(async user=>{
        if(!user){
            return res.status(404).send({message : "User not Found"});
        }

        var isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({
                message : "Invalid Password"
            })
        }

        var token = jwt.sign({ id : user.id }, authConfig.secret, {
            expiresIn : 6400
        })
        var follower  
        var following

        await Follower.count({
            where : {
                followerId : user.id
            }
        }).then(data=>{
            follower = data;

        })
        await Following.count({
            where : {
                followingId : user.id
            }
        }).then(data=>{
            following = data;

        })
        console.log('---------------------')
        res.status(200).send({
            id : user.id,
            username : user.username,
            email : user.email,
            Follower : follower,
            Following : following,
            accessToken : token
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
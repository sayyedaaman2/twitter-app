const db = require('../model');
const User = db.user;
const Follower = db.follower;
const Following = db.following;

exports.follow = (req, res) =>{
    
    let username = req.query.username;
    let toFollow;
    let From;

    User.findOne({
        where : {
            username : username
        }
    }).then( async user=>{
        if(!user) return res.status(404).send({message : "User not found"});
        if(user.id == req.userId) return res.status(400).send({message : "You Can't follow itself !"})
        From = req.userId;
        toFollow = user.id; 
        let follower = {
            followerId : toFollow,
            userId : From,
            followingId: From     
        }
        let following = {
            followingId : From,
            userId : toFollow ,
            followerId : toFollow
        }
        await Follower.create(follower).then(data=>{
            console.log('Successfully create follower')
        })
        await Following.create(following).then(data=>{
            console.log('Successfully create following')
        })
        res.status(200).send({
            message : `Following ${username}`
        })

    }).catch(err=>{
        console.log('Some internal error',err.message);
        res.status(500).send({
            message: "Some internal error occured while following the user"
        })
    })



}

exports.unfollow = (req, res) =>{
    
    let username = req.query.username;
    let followerId;
    let followingId;

    User.findOne({
        where : {
            username : username
        }
    }).then( async user=>{
        if(!user) return res.status(404).send({message : "User not found"});
        followerId = req.userId;
        followingId = user.id 
        
        await Follower.destroy({
            where : {
                followerId : followerId   
            }
        }).then(data=>{
            console.log('Successfully destroy follower')
        })
        await Following.destroy({
            where : {
                followingId : followingId  
            }
        }).then(data=>{
            console.log('Successfully destroy following')
        })
        res.status(200).send({
            message : `Unfollow ${username}`
        })

    }).catch(err=>{
        console.log('Some internal error',err.message);
        res.status(500).send({
            message: "Some internal error occured while Unfollowing the user"
        })
    })



}

exports.GetAllFollowings = async (req, res) =>{

    let userId = req.userId;
    await Following.findAll({
        // attributes: ["userId"],
        where : {followingId : userId},
        include :[
            {
                model: User,
                attributes: ["username", "email"]
            }
        ]
    }).then(data=>{
        let followers = [];
        data.forEach(data =>{
            followers.push(data.user);
        })
        // console.log(followers);
        res.status(200).send({
            followers : followers.length,
            content : followers
        });
    }).catch(err=>{
        console.log("Some Error while fetching all the followers", err.message);
        res.status(500).send({
            message : "Some interanal error"
        })
    })
}

exports.GetAllFollowers = async (req, res) =>{

    let userId = req.userId;
    await Follower.findAll({
        // attributes: ["userId"],
        where : {followerId : userId},
        include :[
            {
                model: User,
                attributes: ["username", "email"]
            }
        ]
    }).then(data=>{
        let followers = [];
        data.forEach(data =>{
            followers.push(data.user);
        })
        // console.log(followers);
        res.status(200).send({
            followers : followers.length,
            content : followers
        });
    }).catch(err=>{
        console.log("Some Error while fetching all the followwing", err.message);
        res.status(500).send({
            message : "Some interanal error"
        })
    })
}
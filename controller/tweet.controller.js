const { Op } = require('sequelize');
const { sequelize } = require('../model');
const db = require('../model');
const Tweet = db.tweet;
const User = db.user;
const Like = db.like;
const Comment = db.comment;
exports.post = async (req, res) =>{
    
    var username;
    await User.findOne({
        where : {
            id : req.userId
        }
    }).then(user=>{
        username = user.username
    })

    TweetObj = {
        content : req.body.content,
        username : username,
        userId : req.userId
    }
    // console.log(TweetObj);
    Tweet.create(TweetObj).then(data=>{
        console.log(data);
        console.log('Successfully post the tweet');
        res.status(201).send({
            message : "Successfully Post",
            id : data.id,
            content : data.content,
            sentOn : data.sentOn
        })
    }).catch(err=>{
        console.log('Some error while posting tweet',err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    })
}
exports.Tweets = async (req, res) =>{
    
    const Tweets = sequelize.query(`SELECT twitterapp.tweets.id, twitterapp.tweets.username, twitterapp.tweets.content,
    (select count(*) from twitterapp.like where twitterapp.like.tweetId=twitterapp.tweets.id) as "like"
    from twitterapp.tweets
    where twitterapp.tweets.userId=${req.userId}`)

    Tweets.then(data=>{
        console.log(data[0]);
        res.status(200).send(data[0])
    }).catch(err=>{
        console.log("Some Error while fetching the Tweets", err.message);
        res.status(500).send({
            message : "Some internal Error"
        })
    })

    // Tweet.findAll({
    //     where : {userId : req.userId},
    // }).then(data=>{
    //     // console.log(data);
    //     console.log('Successfully  Fetch all tweets');
    //     res.status(201).send(data)
    // }).catch(err=>{
    //     console.log('Some error while posting tweet',err.message);
    //     res.status(500).send({
    //         message : "Some Internal Error"
    //     })
    // })
}

exports.feed = (req, res) =>{
    //Users.findAll({ order: [['updatedAt', 'DESC']]}); // or ASC
    const Feed = sequelize.query(`SELECT twitterapp.tweets.id, twitterapp.tweets.username, twitterapp.tweets.content,
    (select count(*) from twitterapp.like where twitterapp.like.tweetId=twitterapp.tweets.id) as "like"
    from twitterapp.tweets;`)

    Feed.then(data=>{
        console.log(data[0]);
        res.status(200).send(data[0])
    }).catch(err=>{
        console.log("Some Error while fetching the Feed", err.message);
        res.status(500).send({
            message : "Some internal Error"
        })
    })




    // Tweet.findAll({  order : [['SentOn', 'ASC']]}).then(data=>{
    //     console.log(data);
    //     res.status(200).send(data);
    // }).catch(err=>{
    //     console.log("Some Error while fetching the Feed", err.message);
    //     res.status(500).send({
    //         message : "Some internal Error"
    //     })
    // })
}

exports.like = async (req, res) =>{
    
    let username;
    await User.findByPk(req.userId).then(user=>{
        username = user.username;
    })
    LikeObj = {
        username : username,
        tweetId : req.params.id,
        userId : req.userId
    }
    // console.log(LikeObj);
    Tweet.findOne({
        where : {
            id : req.params.id
        }
    }).then((tweet)=>{
        console.log(tweet);
        if(tweet == null){
            res.status(400).send({
                message : "Tweet is not present"
            });
            return;
        }else{
            Like.findOne({
                where : {
                    [Op.and] : [
                        { tweetId : req.params.id },
                        {userId : req.userId }
                    ]
                }
            }).then(async data=>{
                console.log(data);
                if(data != null){
                    res.status(400).send({
                        message : "You are already Liked"
                    });
                    return;
                }else{
                    await Like.create(LikeObj).then(data=>{
                        console.log(data);
                        res.status(201).send({
                            message : `${username} liked tweet No ${req.params.id}`
                        })
                    })
                }
            })
        }
        
    }).catch(err=>{
        console.log('Some error while like the tweet',err.message);
        res.status(500).send({
            message : "Some internal Error"
        })
    })
}
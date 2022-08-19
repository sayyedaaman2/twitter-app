const db = require('../model');
const Tweet = db.tweet;
const User = db.user;

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
    
    Tweet.findAll({
        include : [{
            model : User,
            where : {
                id : req.userId
            }
        }]
    }).then(data=>{
        console.log(data);
        console.log('Successfully  Fetch all tweets');
        res.status(201).send(data)
    }).catch(err=>{
        console.log('Some error while posting tweet',err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    })
}
const { sequelize } = require("./model");
const model = require("./model");
const Tweet = model.tweet;
const Like = model.like;

// Model.findAll({
//     attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
//   });

// SELECT count(twitterapp.like.id) 
// FROM twitterapp.tweets 
// inner join 
// twitterapp.like 
// on 
// twitterapp.tweets.id=twitterapp.like.tweetId
// where (twitterapp.tweets.id=2);
let userId = 1;
let sql = `SELECT twitterapp.user.username, twitterapp.tweets.id as "TweetNo", twitterapp.tweets.content ,  twitterapp.like.tweetId from 
twitterapp.user inner join twitterapp.tweets on twitterapp.user.id = twitterapp.tweets.userId
inner join twitterapp.like on twitterapp.like.tweetId=twitterapp.tweets.id`;
const data = ()=>{
    return sequelize.query(sql)
}
data().then(data=>{
    console.log(data);
    // console.log('output',data[0]);
}).catch(err=>{
    console.log("error",err);
})


// `SELECT distinct tweets.id , tweets.content, tweets.username , tweets.sentOn ,
//     (select count(id) from twitterapp.like where twitterapp.tweets.id=twitterapp.like.tweetId ) as "like"
//      FROM twitterapp.tweets inner join twitterapp.like on twitterapp.tweets.id=twitterapp.like.tweetId;`)

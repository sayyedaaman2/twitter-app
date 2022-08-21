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

const data = ()=>{
    return sequelize.query(`SELECT distinct tweets.id , tweets.content, tweets.username , tweets.sentOn ,
    (select count(id) from twitterapp.like where twitterapp.tweets.id=twitterapp.like.tweetId ) as "like"
     FROM twitterapp.tweets inner join twitterapp.like on twitterapp.tweets.id=twitterapp.like.tweetId;`)

}
data().then(data=>{
    console.log('output',data[0]);
})
// {include : [
//     {
//         model : Like,
//         where : {
//             tweetId : 1
//         }
//     }
// ]}


 // const posts = await Posts.findAll({
 //     include: [{
 //         model: Answers,
 //         include: [{
 //           attributes: { 
 //               include: [
 //   [Sequelize.literal("(SELECT COUNT(*) FROM Votes WHERE answerId=answer.id AND Votes.voteType=true)"), "upVote"],
// [Sequelize.literal("(SELECT COUNT(*) FROM Votes WHERE answerId=answer.id AND Votes.voteType=false)"), "downVote"]
//           ] 
//           }
 //         }]
//     }]
// });
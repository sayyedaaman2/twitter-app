const { sequelize } = require("./model");
const model = require("./model");
const Tweet = model.tweet;
const Like = model.like;

// Model.findAll({
//     attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
//   });
Tweet.findAll({
    // attributes : [],
    include :[
        {
            model : Like,
            // where : { tweetId : 1 }
            // attributes: [
            //     [sequelize.fn("COUNT", sequelize.col("id")), "n_devEmployees"],
            // ],
            attributes: [
                [sequelize.fn("COUNT",sequelize.col("id")),"count"],
            ],
        }
    ]
}).then(data=>{
    console.log("-----------",data);
    console.log("data",data[0].likes);
    console.log('length',data[0].likes.length);
}).catch(err=>{
    console.log('err', err.message);
})
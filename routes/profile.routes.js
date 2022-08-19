const profileController = require('../controller/profile.controller');
const tweetController = require('../controller/tweet.controller');

const {authJwt} = require('../middleware');

module.exports = (app)=>{
    
    app.post("/twitter/api/v1/follow", [authJwt.verifyToken], profileController.follow);

    app.delete("/twitter/api/v1/unfollow", [authJwt.verifyToken], profileController.unfollow);

    app.get("/twitter/api/v1/followers", [authJwt.verifyToken], profileController.GetAllFollowers);

    app.get("/twitter/api/v1/following", [authJwt.verifyToken], profileController.GetAllFollowings);

    app.post("/twitter/api/v1/tweet/post", [authJwt.verifyToken], tweetController.post);

    app.get("/twitter/api/v1/tweets", [authJwt.verifyToken], tweetController.Tweets);


}
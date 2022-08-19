const followController = require('../controller/following.controller');
const {authJwt} = require('../middleware');

module.exports = (app)=>{
    
    app.post("/twitter/api/v1/follow", [authJwt.verifyToken], followController.follow);

    app.delete("/twitter/api/v1/unfollow", [authJwt.verifyToken], followController.unfollow);

    app.get("/twitter/api/v1/followers", [authJwt.verifyToken], followController.GetAllFollowers);


}
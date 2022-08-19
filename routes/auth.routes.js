const userController = require('../controller/user.controller');
const { authJwt } = require('../middleware');
module.exports = (app)=>{
    
    app.post("/twitter/api/v1/signup",[authJwt.verifySignup], userController.signUp);

    app.post("/twitter/api/v1/signin", userController.signIn);

}
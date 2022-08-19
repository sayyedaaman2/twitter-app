const userController = require('../controller/user.controller');
const { authJwt , verifySignUp} = require('../middleware');
module.exports = (app)=>{
    
    app.post("/twitter/api/v1/signup",[verifySignUp.ValidSignBody,verifySignUp.checkDuplicateUsernameOrEmail], userController.signUp);

    app.post("/twitter/api/v1/signin", [verifySignUp.ValidLoginBody],userController.signIn);

}
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const db = require("../model");
const User = db.user;

verifySignup = async (req, res, next) => {
  if (!req.body.username) {
    return res.status(404).send({
      message: "provide username",
    });
  }
  await User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        return res.status(404).send({
          message: "Username is already taken !",
        });
      }
    })
    if(!req.body.email){
        res.status(404).send({
            message : "Please provide the email"
        })
    }

    await User.findOne({email : req.body.email}).then(user=>{
        if(user.email){
            return res.status(404).send({
                message : "email is already taken"
            })
            
        }
        
    })
    if(!req.body.password){
        return res.status.send({
            message : "Pls provide the password"
        })
    }
    if(!req.body.password){
        return res.status.send({
            message : "Pls provide the password"
        })
    }
    next();
    // .catch((err) => {
    //   console.log(
    //     "Some error while the checking the user is present or not !",
    //     err.message
    //   );
    //   res.status(500).send({
    //     message: "Some internal Error",
    //   });
    // });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken, verifySignup };
module.exports = authJwt;

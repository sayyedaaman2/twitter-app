const express = require('express');
const bodyParser = require('body-parser');
const db = require('./model');
const app = express();
const serverConfig = require('./config/server.config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//testing the api
app.get('/',(req, res)=>{
    res.send('Hello World');
})
function init(){
    var userData = [
        {
            email: "test1@gmail.com",
            username: "test1",
            password: "test1234"
        },
        {
            email: "test2@gmail.com",
            username: "test2",
            password: "test1234"
        },
    ]
    var tweetData = [
        {
            content: "Hi this is my first tweet",
            username: "test2",
            userId : 2
        },
        {
            content: "Hi this is my second tweet",
            username: "test1",
            userId : 1

        }
    ]
    db.user.bulkCreate(userData).then(()=>{
        console.log('User table initialised');

    }).catch((err)=>{
        console.log('Error while intialising user data',err);
    })
    db.tweet.bulkCreate(tweetData).then(()=>{
        console.log("tweet table initialised");
    }).catch((err)=>{
        console.log("Error while initialising data",err);
    })
}

db.sequelize.sync({force : false}).then(()=>{
    console.log('Table dropped and recreted');
    init();
})
require('./routes/auth.routes')(app);
require('./routes/following.routes')(app);
app.listen(serverConfig.PORT(), ()=>{
    console.log(`Server is Running on ${serverConfig.PORT()}`);
})
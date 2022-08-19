const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');

const env = "delvelopment";
const dbSettings = dbConfig[env];
const sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.username,
    dbSettings.password,
    dbSettings.dialectInformation
);
sequelize.authenticate().then(()=>{
    console.log('Connection established successfully.')

}).catch(err =>{
    console.error('Unable to connect to the database :',err);
})

const db = {Sequelize, sequelize};
db.user = require('./user.model')(sequelize, Sequelize);
db.follower = require('./follower.model')(sequelize, Sequelize);
db.following = require('./following.model')(sequelize,Sequelize);
db.tweet = require('./tweet.model')(sequelize, Sequelize);
db.like = require('./like.model')(sequelize,Sequelize);
db.comment = require('./comment.model')(sequelize,Sequelize);

db.user.hasMany(db.follower);
db.user.hasMany(db.following);
db.user.hasMany(db.tweet);
db.tweet.hasMany(db.like);
db.tweet.hasMany(db.comment);
//User.hasOne(models.Portfolio, { foreignKey: "userId" })
db.tweet.hasOne(db.like, {foreignKey : "tweetId"})
db.tweet.hasOne(db.comment, {foreignKey : "tweetId"})

db.follower.belongsTo(db.user,{
    foreignKey : "userId"
});
db.following.belongsTo(db.user,{
    foreignKey : "userId"
})
db.tweet.belongsTo(db.user, {
    foreignKey : "userId"
})

module.exports = db;
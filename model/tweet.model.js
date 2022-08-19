module.exports = (sequelize , Sequelize) =>{
    const Tweet = sequelize.define('tweet', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        }, 
        content : {
            type : Sequelize.STRING,
            allowNull : false
        },
        username : {
            type : Sequelize.STRING
        }
    },{
        tableName : "tweet"
    });
    return Tweet;
}

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
            type : Sequelize.STRING,
            allowNull : false
        },
        sentOn : {
            type : Sequelize.DATE,
            defaultValue : Sequelize.NOW
        }
    },
    { timestamps: false },
    {
        tableName : "tweet"
    });
    return Tweet;
}
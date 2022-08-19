
module.exports = (sequelize , Sequelize) =>{
    const User = sequelize.define("user", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : Sequelize.STRING,
            unique : true,
            allowNull : false
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type : Sequelize.STRING,
            allowNull : false
        }
    },{
        tableName : 'user'
    });
    return User;

}
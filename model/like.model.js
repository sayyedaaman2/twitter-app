module.exports = (sequelize , Sequelize) =>{
    const Like = sequelize.define("like", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : Sequelize.STRING
        }
    },{
        tableName : 'like'
    });
    return Like;
}
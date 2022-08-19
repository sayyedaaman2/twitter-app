module.exports = (sequelize , Sequelize) =>{
    const Comment = sequelize.define("comment", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : Sequelize.STRING
        },
        content : {
            type : Sequelize.STRING
        }
    },{
        tableName : 'comment'
    });
    return Comment;
}
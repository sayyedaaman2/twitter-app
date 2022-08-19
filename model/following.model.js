module.exports = (sequelize, Sequelize) => {
    const Following = sequelize.define("following", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement : true
        },
        followingId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'following'
    });
    return Following;
}
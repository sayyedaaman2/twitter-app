module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define("follower", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement : true
        },
        followerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'follower'
    });
    return Follower;
}
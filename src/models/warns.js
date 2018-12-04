module.exports = (sequelize, DataTypes) => {
    const Warns = sequelize.define('warns', {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        moderator: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, { timestamps: false });
	
    Warns.warn = (user, moderator, reason) => Warns.build({ user, moderator, reason }).save();

    Warns.clear = () => Warns.destroy();

    Warns.get = user => Warns.findAll({ where: { user } });

    return Warns;
};
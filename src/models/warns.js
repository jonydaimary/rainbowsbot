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
        },
        timestamp: DataTypes.DATE
    }, { timestamps: false });
	
    Warns.warn = (user, moderator, reason, timestamp) => Warns.build(
        { user, moderator, reason, timestamp }
    ).save();

    Warns.clear = () => Warns.destroy({ where: {}, truncate: true });

    Warns.get = user => Warns.findAll({ where: { user } });

    return Warns;
};
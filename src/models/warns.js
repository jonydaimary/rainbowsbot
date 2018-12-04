module.exports = (sequelize, DataTypes) => {
    const Warns = sequelize.define('warns', {
        id: {
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
	
    Warns.warn = (id, moderator, reason) => Warns.build({ id, moderator, reason }).save();

    Warns.clear = () => Warns.destroy();

    Warns.get = id => Warns.findAll({ where: { id } });

    return Warns;
};
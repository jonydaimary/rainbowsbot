const nextLevelXp = require('./../utils/next-level-xp');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, { timestamps: false });

    Users.xp = async (id, value, add) => {
        const [user] = await Users.findOrCreate({ where: { id }, defaults: { id } });
        if (!value)
            return user.xp;
        user.xp = value + (add ? user.xp : 0);
        let nextLevel = nextLevelXp(user.level);
        while (user.xp >= nextLevel) {
            user.level++;
            user.xp -= nextLevel;
            nextLevel = nextLevelXp(user.level);
        }
        await user.save();
        return { level: user.level, xp: user.xp, nextLevelXp: nextLevel };
    };

    return Users;
};
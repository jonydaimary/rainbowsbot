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
        }
    }, { timestamps: false });

    Users.xp = async (id, value, add) => {
        const [user] = await Users.findOrCreate({ where: { id }, defaults: { id } });
        if (!value)
            return user.xp;
        user.xp = value + (add ? user.xp : 0);
        await user.save();
        return user.xp;
    };

    return Users;
};
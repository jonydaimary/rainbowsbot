module.exports = (sequelize, DataTypes) => {
    const TempMutes = sequelize.define('tempmutes', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        timestamp: DataTypes.INTEGER,
        time: DataTypes.INTEGER
    }, { timestamps: false });
	
    TempMutes.register = (id, timestamp, time) => TempMutes
        .build({ id, timestamp, time }).save();
    
    TempMutes.remove = id => TempMutes.destroy({ where: { id }, truncate: true });

    return TempMutes;
};
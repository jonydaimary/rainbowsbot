const Sequelize = require('sequelize');

module.exports = async () => {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
    });

    await sequelize.import('./models/users');

    console.log('Models loaded.');

    await sequelize.sync();

    console.log('Database synced.');

    return sequelize;
};
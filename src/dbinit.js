const Sequelize = require('sequelize');

module.exports = async () => {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
    });

    await sequelize.import('./models/users');
    await sequelize.import('./models/warns');
    await sequelize.import('./models/tempmutes');

    console.log('Models loaded.');

    await sequelize.sync();

    console.log('Database synced.');

    return sequelize;
};
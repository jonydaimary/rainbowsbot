const {
    schedule: { experienceReset: rule }
} = require('./../../json/config.json');

module.exports = {
    name: 'reset-xp', rule,
    async callback(client) {
        const Users = client.sequelize.model('users');
        const users = await Users.findAll({ order: [['level', 'desc'], ['xp', 'desc']] });
        users.forEach((user, index) => user.update({ activity: index + 1 }));
        Users.update({ xp: 0, level: 0 }, { where: {} });    
    }
};
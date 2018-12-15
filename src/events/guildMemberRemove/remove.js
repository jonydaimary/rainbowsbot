module.exports = (client, { user: { id } }) => {
    client.sequelize.model('users').destroy({ where: { id } });
    client.sequelize.model('warns').destroy({ where: { member: id } });
    client.sequelize.model('tempmutes').destroy({ where: { id } });
};
const random = require('./../../utils/random');

const config = require('./../../../config');

module.exports = async (client, message) => {
    if (message.author.bot
        || message.channel.type == 'dm'
        || !config.xpChannels.includes(message.channel.id))
        return;
    const Users = client.sequelize.model('users');
    const data = await Users.xp(message.author.id, random(1, 5), true);
    if (data.levelUp)
        client.emit('memberLevelUp', message, data);
};
const config = require('./../../../config');

module.exports = async (client, message) => {
    if (message.author.bot
        || message.channel.type == 'dm'
        || !config.xpChannels.includes(message.channel.id))
        return;
    const random = require('./utils/random');
    const Xp = client.sequelize.model('xp');
    const data = await Xp.xp(message.author.id, random(1, 5), true);
    if (data.levelUp)
        client.emit('memberLevelUp', message, data);
};
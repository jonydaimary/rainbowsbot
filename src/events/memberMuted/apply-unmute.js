const unmuteCallback = require('../../utils/unmute-callback');

module.exports = async (client, member, time) => {
    if (!time)
        return;
    const TempMutes = client.sequelize.model('tempmutes');
    const tempMute = await TempMutes.findByPk(member.user.id);
    unmuteCallback(member, tempMute.timestamp, time);
};
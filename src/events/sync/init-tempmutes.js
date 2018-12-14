const unmuteCallback = require('../../utils/unmute-callback');

module.exports = async client => {
    const TempMutes = client.sequelize.model('tempmutes');
    const tempMutes = await TempMutes.findAll();
    tempMutes.forEach(tempMute => {
        const member = client.guild().member(tempMute.id);
        unmuteCallback(member, tempMute.timestamp, tempMute.time);
    });
};
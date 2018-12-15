const ms = require('ms');

const { channels: { staffchat } } = require('../../../json/config.json');

module.exports = (client, member, time) => {
    client.guild().channels.get(staffchat)
        .send(`Пользователь ${member.user.tag} был размучен${time ? ` по истечении ${ms(time, { long: true })}.` : '.'}`);
};
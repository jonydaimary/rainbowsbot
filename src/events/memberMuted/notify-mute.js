const ms = require('ms');

const { channels: { staffchat } } = require('../../../json/config.json');

module.exports = async (client, member, time) => {
    client.guild().channels.get(staffchat)
        .send(`Пользователь ${member.tag} замучен${time ? ` на ${ms(time, { long: true })}.` : '.'}`);
};
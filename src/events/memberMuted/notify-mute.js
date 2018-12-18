const { RichEmbed } = require('discord.js');
const ms = require('ms');

const { channels: { staffchat }, embed: { color } } = require('../../../json/config.json');

module.exports = async (client, member, time) => {
    const embed = new RichEmbed()
        .setTitle('Пользователь замучен')
        .addField('Пользователь', `${member} (\`${member.user.tag}\`)`, true)
        .setColor(color.red);
    if (time)
        embed.addField('Время', ms(time, { long: true }));
    client.guild().channels.get(staffchat).send(embed);
    client.guild().owner.send(embed);
};
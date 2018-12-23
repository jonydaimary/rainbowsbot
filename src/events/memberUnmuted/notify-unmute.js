const { RichEmbed } = require('discord.js');
const ms = require('ms');

const { channels: { staff }, embed: { color } } = require('../../../json/config.json');

module.exports = (client, member, time) => {
    const embed = new RichEmbed()
        .setTitle('Пользователь размучен')
        .addField('Пользователь', `${member} (\`${member.user.tag}\`)`, true)
        .setColor(color.green);
    if (time)
        embed.addField('Время', ms(time, { long: true }));
    client.guild().channels.get(staff).send(embed);
};
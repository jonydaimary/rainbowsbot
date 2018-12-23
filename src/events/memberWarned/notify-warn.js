const { RichEmbed } = require('discord.js');

const {
    channels: { staff },
    embed: { color }
} = require('../../../json/config.json');

module.exports = (client, { member, moderator, reason, id, timestamp }) => {
    member = client.guild().member(member);
    moderator = client.guild().member(moderator);
    const embed = new RichEmbed()
        .setTitle(`Предупреждение [${id}]`)
        .addField('Пользователь', `${member} (\`${member.user.tag}\`)`, true)
        .addField('Модератор', `${moderator} (\`${moderator.user.tag}\`)`, true)
        .addField('Причина', reason)
        .setFooter('Rainbow`s Warnings')
        .setColor(color.red)
        .setTimestamp(timestamp || new Date());
    client.guild().channels.get(staff).send(embed);
};
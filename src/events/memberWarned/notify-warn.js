const { RichEmbed } = require('discord.js');

const {
    channels: { staffchat },
    embed: { color }
} = require('../../../json/config.json');

module.exports = (client, { member, moderator, reason, id, timestamp }) => {
    member = client.guild().member(member);
    moderator = client.guild().member(moderator);
    client.guild().channels.get(staffchat).send(new RichEmbed()
        .setTitle(`Предупреждение [${id}]`)
        .addField('Пользователь', `${member} (\`${member.user.tag}\`)`, true)
        .addField('Модератор', `${moderator} (\`${moderator.user.tag}\`)`, true)
        .addField('Причина', reason)
        .setFooter('Rainbow`s Warnings')
        .setColor(color.red)
        .setTimestamp(timestamp || new Date())
    );
};
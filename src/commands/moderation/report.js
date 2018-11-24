const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parseMember = require('./../../utils/parse-member');

const config = require('./../../../config');

module.exports = new Command.Builder('report', 'Moderation')
    .guildOnly()
    .format('<пользователь> <причина>')
    .description('Пожаловаться на пользователя')
    .validate((message, [member, reason]) => {
        if (!member)
            return 'Пользователь не указан';
        if (!reason)
            return 'Причина не указана';
        member = parseMember(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        return true;
    })
    .run((message, [member, reason]) => {
        member = parseMember(message.guild, member);
        message.guild.channels.get(config.channels.staffchat).send(new RichEmbed()
            .setDescription('Жалобы')
            .setColor(config.embed.color.guild)
            .addField('Нарушитель', `${member}, ID: ${member.id}`)
            .addField('Жалоба отправлена', `${message.author}, ID: ${message.author.id}`)
            .addField('Канал', message.channel)
            .setTimestamp(message.createdAt)
            .addField('Причина:', reason)
        );
        message.channel.send(new RichEmbed()
            .setDescription('Жалоба отправлена')
            .setColor('#800080')
            .addField('Нарушитель', `${member}, ID: ${member.id}`)
            .addField('Причина:', reason)
        );
    })
    .build();
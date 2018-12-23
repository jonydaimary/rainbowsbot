const { RichEmbed } = require('discord.js');

const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = new Command.Builder('report', 'Moderation')
    .guildOnly()
    .format('<пользователь> <причина>')
    .description('Пожаловаться на пользователя')
    .validate((message, [member, reason]) => {
        if (!member)
            return 'Пользователь не указан';
        if (!reason)
            return 'Причина не указана';
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        return true;
    })
    .run((message, [member, reason]) => {
        member = parse.member(message.guild, member);
        message.guild.channels.get(config.channels.staff).send(new RichEmbed()
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
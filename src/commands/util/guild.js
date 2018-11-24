const { RichEmbed } = require('discord.js');

const Command = require('../../command-processing/command');

const config = require('./../../../config');

module.exports = new Command.Builder('guild', 'Util')
    .guildOnly()
    .description('Отображает информацию о сервере')
    .run(message => {
        const embed = new RichEmbed()
            .setTitle('Информация о сервере:')
            .addField('ID', message.guild.id, true)
            .addField('Имя', message.guild.name, true)
            .addField('Регион', message.guild.region, true)
            .addField('Кол-во пользователей', message.guild.memberCount, true)
            .addField('АФК-таймаут', message.guild.afkTimeout, true)
            .addField('АФК-канал', message.guild.afkChannelID ? message.guild.channels.get(message.guild.afkChannelID) : 'нет', true)
            .addField('Уровень верификации', message.guild.verificationLevel, true)
            .addField('Фильтр откровенного контента', message.guild.explicitContentFilter, true)
            .addField('Дата входа', new Date(message.guild.joinedTimestamp), true)
            .addField('Уведомления по-умолчанию', message.guild.defaultMessageNotifications, true)
            .addField('Владелец', message.guild.member(message.guild.ownerID), true)
            .setColor(config.embed.color.guild);
        message.channel.send(embed);
    })
    .build();
const { RichEmbed } = require('discord.js');
const ms = require('ms');

const Command = require('./../../command-processing/command');
const parse = require('./../../utils/parse');

const config = require('./../../../config');

module.exports = new Command.Builder('mute', 'Moderation')
    .guildOnly()
    .format('<пользователь> [время]')
    .description('Замутить пользователя')
    .hasPermissions(member => member.hasPermission('MANAGE_MESSAGES'))
    .validate((message, [member, time]) => {
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (member.roles.has(config.roles.muted))
            return 'Пользователь уже замучен';
        if (time) {
            time = ms(time);
            if (!time || typeof time == 'string' || time < 1)
                return 'Неверный формат времени';
        }
        return true;
    })
    .run((message, [member, time]) => {
        member = parse.member(message.guild, member);
        time = time ? ms(time) : time;
        member.addRole(config.roles.muted);
        if (time) {
            setTimeout(() => {
                if (member.roles.has(config.roles.muted)) {
                    member.removeRole(config.roles.muted);
                    message.guild.channels.get(config.channels.staffchat)
                        .send(`Пользователь ${member.user.tag} автоматически размучен по истечении ${ms(time, { long: true })}.`);
                }
            }, time);
        }
        const embed = new RichEmbed()
            .setTitle('Пользователь замучен')
            .setColor(config.embed.color.guild)
            .addField('Модератор', message.author)
            .addField('Нарушитель', member);
        if (time)
            embed.addField('Время', ms(time, { long: true }));
        message.channel.send(embed);
    })
    .build();
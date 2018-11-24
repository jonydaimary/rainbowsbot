const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parse = require('./../../utils/parse');

const config = require('./../../../config');

module.exports = class WarnCommand extends Command {
    constructor() {
        super({
            name: 'warn',
            group: 'Moderation',
            format: '<пользователь> [причина]',
            description: 'Выдаёт пользователю предупреждение',
            guildOnly: true
        });
    }

    checkPermissions(member) {
        const roles = ['Главный Администратор', 'Администратор', 'Главный Модератор', 'Модератор'];
        return member.roles.some(role => roles.includes(role.name))
            ? true
            : 'У вас нет прав для выполнения этой команды';
    }

    validate(message, [member]) {
        if (!member)
            return 'Пользователь не указан';
        if (!parse.member(message.guild, member))
            return 'Пользователь не найден';
        return true;
    }

    run(message, [member, reason]) {
        member = parse.member(message.guild, member);
        const embed = new RichEmbed()
            .setTitle('Предупреждение')
            .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
            .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
            .addField('Причина', reason ? reason : 'Причина не указана')
            .setFooter('Rainbow`s Warnings')
            .setColor(config.embed.color.guild)
            .setTimestamp(message.createdAt);

        message.guild.channels
            .get(config.channels.staffchat)
            .send(embed);
    }
};
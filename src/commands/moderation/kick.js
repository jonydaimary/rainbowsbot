const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parseMember = require('./../../utils/parse-member');

const config = require('./../../../config');

module.exports = class KickCommand extends Command {
    constructor() {
        super({
            name: 'kick',
            group: 'moderation',
            format: '<пользователь> [причина]',
            description: 'Выгоняет пользователя',
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
        member = parseMember(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (!member.kickable)
            return 'Этого пользователя нельзя кикнуть';
        return true;
    }

    async run(message, [member, reason]) {
        reason = reason ? reason : 'Причина не указана';

        await parseMember(message.guild, member).kick(reason);

        const embed = new RichEmbed()
            .setTitle('Пользователь кикнут')
            .addField('Пользователь:', member)
            .setColor(config.embed.color.guild)
            .addField('Модератор:', message.author)
            .addField('Причина:', reason);

        message.guild.channels
            .get(config.channels.staffchat)
            .send(embed);
    }
};
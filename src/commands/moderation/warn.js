const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

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

    hasPermissions(member) {
        const roles = ['Главный Администратор', 'Администратор', 'Главный Модератор', 'Модератор'];
        return member.roles.some(role => roles.includes(role.name));
    }

    validate(message, [member, reason]) {
        if (!member)
            return 'Пользователь не указан';
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (!reason)
            return 'Причина не указана';
        if (member.user.id == message.guild.owner.id)
            return 'Вы не можете выдать предупреждение создателю сервера.';
        return true;
    }

    async run(message, [member, reason]) {
        member = parse.member(message.guild, member);
        await this.client.warn(
            member,
            message.member,
            reason,
            message.createdAt
        );
    }
};
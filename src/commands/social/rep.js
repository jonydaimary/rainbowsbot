const Command = require('../../processing/commands/command');
const parse = require('../../utils/parse');

const PERMITTED_ROLES = ['Главный Администратор', 'Администратор', 'Главный Модератор', 'Модератор'];

module.exports = class RepCommand extends Command {
    constructor() {
        super({
            name: 'rep',
            group: 'Social',
            format: '[пользователь] [значение]',
            description: 'Изменяет репутацию пользователя',
            guildOnly: true
        });
    }

    hasPermissions(member) {
        return member.roles.some(role => PERMITTED_ROLES.includes(role.name));
    }

    validate(message, [user, value]) {
        user = parse.user(this.client, user);
        if (!user)
            return 'Пользователь не найден';
        if (!value)
            return 'Значение репутации не указано';
        if (isNaN(parseInt(value)))
            return 'Неверный формат числа';
        return true;
    }

    async run(message, [user, value]) {
        user = parse.user(this.client, user);
        value = parseInt(value);

        const rep = await this.client.sequelize.model('users').rep(user.id, value, true);

        return `Репутация пользователя ${user.tag} изменена: **${rep}**`;
    }
};
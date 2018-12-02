const { stripIndents } = require('common-tags');

const MessageFormatter = require('./../../utils/message-formatter');
const nextLevelXp = require('./../../utils/next-level-xp');

const Command = require('../../command-processing/command');

module.exports = class TopCommand extends Command {
    constructor() {
        super({
            name: 'top',
            group: 'Experience',
            format: '[кол-во пользователей от 1 до 10]',
            description: 'Отображает топ пользователей по уровням'
        });
    }

    validate(message, [count]) {
        count = count ? parseInt(count) : 10;
        if (isNaN(count))
            return 'Неверный формат чила';
        if (count < 1 || count > 10)
            return 'Кол-во пользователей должно быть числом между 1 и 10';
        return true;
    }

    async run(message, [count]) {
        count = count ? parseInt(count) : 10;
        const Users = this.client.sequelize.model('users');
        const result = Users.findAll({ limit: count, order: 'level desc, xp desc' });
        const response = new MessageFormatter();
        result.forEach((r, i) => {
            response.line(stripIndents`
                [${i + 1}]\t> ${this.client.users.get(r.id).tag}
                \t\tУровень: ${r.level} [${r.xp}/${nextLevelXp(r.level)}]
            `);
        });
        message.reply(`Топ ${count} пользователей по уровням:${response.toCode('pl')}`);
    }
};
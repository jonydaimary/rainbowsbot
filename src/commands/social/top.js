const { stripIndent, stripIndents } = require('common-tags');

const MessageFormatter = require('./../../utils/message-formatter');
const nextLevelXp = require('./../../utils/next-level-xp');

const Command = require('../../processing/commands/command');

module.exports = class TopCommand extends Command {
    constructor() {
        super({
            name: 'top',
            group: 'Social',
            format: '[rep] [кол-во пользователей от 1 до 10]',
            description: 'Отображает топ пользователей по уровням или репутации',
            details: stripIndents`
                \`top [кол-во пользователей от 1 до 10]\`
                Отображает топ пользователей по уровням.
                \`top rep [кол-во пользователей от 1 до 10]\`
                Отображает топ пользователей по репутации.
            `
        });
    }

    validate(message, [rep, count]) {
        rep = rep == 'rep';
        count = rep ? count : rep;
        count = count ? parseInt(count) : 10;
        if (isNaN(count))
            return 'Неверный формат чила';
        if (count < 1 || count > 10)
            return 'Кол-во пользователей должно быть числом между 1 и 10';
        return true;
    }

    async run(message, [rep, count]) {
        rep = rep == 'rep';
        count = rep ? count : rep;
        count = count ? parseInt(count) : 10;
        const Users = this.client.sequelize.model('users');
        const result = await Users.findAll({ limit: count, order: rep
            ? [['reputation', 'desc']]
            : [['level', 'desc'], ['xp', 'desc']] 
        });
        const response = new MessageFormatter();
        result.forEach((r, i) => {
            const scoreLine = rep
                ? `\t\tРепутация: ${r.reputation}`
                : `\t\tУровень: ${r.level} [${r.xp}/${nextLevelXp(r.level)}]`;
            response.line(stripIndent`
                [${i + 1}]   ${i == 9 ? '' : ' '}> #${this.client.users.get(r.id).tag}
                ${scoreLine}
            `);
        });
        message.reply(`Топ ${count} пользователей по ${rep ? 'репутации' : 'уровням'}:${response.toCode('pl')}`);
    }
};
const Command = require('../../command-processing/command');
const parse = require('./../../utils/parse');

module.exports = class LevelCommand extends Command {
    constructor() {
        super({
            name: 'level',
            group: 'Experience',
            format: '[пользователь]',
        });
    }

    validate(message, [user]) {
        user = user ? parse.user(this.client, user) : message.author;
        if (!user)
            return 'Пользователь не найден';
        return true;
    }

    async run(message, [user]) {
        user = user ? parse.user(this.client, user) : message.author;
        const data = await (this.client.sequelize.model('users')).xp(user.id);
        return (user.id == message.author.id
            ? 'Ваш текущий уровень: '
            : `Текущий уровень пользователя ${user}: `)
            + `**${data.level}** ${data.xp}/${data.nextLevelXp}`;
    }
};
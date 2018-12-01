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
    }

    async run(message, [user]) {
        user = user ? parse.user(this.client, user) : message.author;
<<<<<<< HEAD
        const data = await (this.client.sequelize.model('users')).xp(user.id);
=======
        const data = await this.client.sequelize.model('users').xp(user.id);
>>>>>>> 8e0d88d34ae38ac0f5114aab8b9558a5bc52375b
        const response = (user.id == message.author.id
            ? 'Ваш текущий уровень: '
            : `Текущий уровень пользователя ${user}: `)
            + `**${data.level}** *${data.xp}/${data.nextLevelXp}*`;
        console.log(response);
        return response;
    }
};
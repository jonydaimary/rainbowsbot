const { RichEmbed } = require('discord.js');

const Command = require('../../command-processing/command');
const parse = require('./../../utils/parse');

const config = require('./../../../config');

module.exports = class LevelCommand extends Command {
    constructor() {
        super({
            name: 'level',
            group: 'Experience',
            format: '[пользователь]',
            description: 'Отображает уровень пользователя'
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
        message.channel.send(new RichEmbed()
            .setTitle('Статистика пользователя')
            .setColor(config.embed.color.guild)
            .addField('Пользователь', user, true)
            .addField('Уровень', data.level, true)
            .addField('Опыт', `${data.xp}/${data.nextLevelXp}`, true)
            .setFooter(message.author.tag, message.author.avatarURL)
        );
    }
};
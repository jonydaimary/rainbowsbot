const { RichEmbed } = require('discord.js');

const Command = require('../../processing/commands/command');
const parse = require('../../utils/parse');

const config = require('./../../../json/config');

module.exports = class ProfileCommand extends Command {
    constructor() {
        super({
            name: 'profile',
            group: 'Social',
            format: '[пользователь]',
            description: 'Отображает профиль пользователя'
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

        const Users = this.client.sequelize.model('users');

        const data = await Users.xp(user.id);
        data.rep = await Users.rep(user.id);

        message.channel.send(new RichEmbed()
            .setTitle('Статистика пользователя')
            .setColor(config.embed.color.guild)
            .addField('Пользователь', user, true)
            .addField('Уровень', data.level, true)
            .addField('Опыт', `${data.xp}/${data.nextLevelXp}`, true)
            .addField('Репутация', data.rep, true)
            .setFooter(message.author.tag, message.author.avatarURL)
        );
    }
};
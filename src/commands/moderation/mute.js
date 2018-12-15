const ms = require('ms');

const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = new Command.Builder('mute', 'Moderation')
    .guildOnly()
    .format('<пользователь> [время]')
    .description('Мутит пользователя')
    .hasPermissions(member => member.hasPermission('MANAGE_MESSAGES'))
    .validate((message, [member, time]) => {
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (member.roles.has(config.roles.muted))
            return 'Пользователь уже замучен';
        if (time) {
            time = ms(time);
            if (!time || typeof time == 'string' || time < 1)
                return 'Неверный формат времени';
        }
        return true;
    })
    .run((message, [member, time]) => {
        member = parse.member(message.guild, member);
        time = time ? ms(time) : time;
        message.client.mute(member, time);
    })
    .build();
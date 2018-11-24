const Command = require('./../../command-processing/command');
const parse = require('./../../utils/parse');

const config = require('./../../../config');

module.exports = new Command.Builder('mute', 'Moderation')
    .guildOnly()
    .format('<пользователь>')
    .description('Замутить пользователя')
    .checkPermissions(member => member.hasPermission('MANAGE_MESSAGES'))
    .validate((message, [member]) => {
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (member.roles.has(config.roles.muted))
            return 'Пользователь уже замучен';
        return true;
    })
    .run((message, [member]) => {
        member = parse.member(message.guild, member);
        member.addRole(config.roles.muted);
        return `Пользователь ${member.user.tag} успешно замучен.`;
    })
    .build();
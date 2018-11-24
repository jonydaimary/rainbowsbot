const Command = require('./../../command-processing/command');
const parseMember = require('./../../utils/parse-member');

const config = require('./../../../config');

module.exports = new Command.Builder('unmute', 'Moderation')
    .guildOnly()
    .format('<пользователь>')
    .description('Размутить пользователя')
    .checkPermissions(member => member.hasPermission('MANAGE_MESSAGES'))
    .validate((message, [member]) => {
        member = parseMember(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (!member.roles.has(config.roles.muted))
            return 'Пользователь не замучен';
        return true;
    })
    .run((message, [member]) => {
        member = parseMember(message.guild, member);
        member.removeRole(config.roles.muted);
        return `Пользователь ${member.user.tag} успешно размучен.`;
    })
    .build();
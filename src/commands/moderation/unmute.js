const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = new Command.Builder('unmute', 'Moderation')
    .guildOnly()
    .format('<пользователь>')
    .description('Размутить пользователя')
    .hasPermissions(member => member.hasPermission('MANAGE_MESSAGES'))
    .validate((message, [member]) => {
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (!member.roles.has(config.roles.muted))
            return 'Пользователь не замучен';
        return true;
    })
    .run((message, [member]) => {
        member = parse.member(message.guild, member);
        member.removeRole(config.roles.muted);
        message.client.sequelize.model('tempmutes').remove(member.user.id);
        message.client.emit('memberUnmuted', member);
    })
    .build();
const Command = require('./../../processing/commands/command');

const PERMITTED_ROLES = ['Модератор', 'Главный Модератор', 'Администратор', 'Главный Администратор'];

module.exports = new Command.Builder('say', 'Util')
    .guildOnly()
    .format('[сообщение]')
    .description('Отправляет сообщение от имени бота')
    .parseArgs(rest => rest)
    .hasPermissions(member => member.roles.some(role => PERMITTED_ROLES.includes(role.name)))
    .run((message, content) => {
        message.delete();
        return content ? message.channel.send(content) : undefined;
    })
    .build();
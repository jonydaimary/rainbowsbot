const Command = require('./../../processing/commands/command');

const PERMITTED_ROLES = ['Модератор', 'Главный Модератор', 'Администратор', 'Главный Администратор'];

module.exports = new Command.Builder('purge', 'Util')
    .guildOnly()
    .description('Удаляет указанное кол-во сообщений в канале')
    .format('<число между 2 и 100>')
    .hasPermissions(member => member.roles.some(role => PERMITTED_ROLES.includes(role.name)))
    .validate((message, [count]) => {
        count = parseInt(count);
        if (isNaN(count))
            return 'Неверный формат числа';
        if (count < 2 || count > 100)
            return 'Кол-во сообщений должно быть числом между 2 и 100';
        return true;
    })
    .run(async (message, [count]) => {
        count = parseInt(count);
        message.channel.bulkDelete(count);
    })
    .build();
const { stripIndents } = require('common-tags');

const Command = require('./../../processing/commands/command');

const PERMITTED_ROLES = ['Модератор', 'Главный Модератор', 'Администратор', 'Главный Администратор'];

module.exports = new Command.Builder('auth', 'Util')
    .guildOnly()
    .format('[on/off]')
    .description('Позволяет включить/выключить авторизацию на сервере или проверить её состояние')
    .details(stripIndents`
        Использование без аргументов отобразит текущее состояние авторизации.
        Чтобы изменить его следует использовать команду с аргументом on или off.
    `)
    .hasPermissions(member => member.roles.some(role => PERMITTED_ROLES.includes(role.name)))
    .run((message, [state]) => {
        state = state == 'on' ? true : state == 'off' ? false : undefined;
        if (state === undefined)
            return `Авторизация ${message.client.authState ? 'включена' : 'отключена'}`;
        message.client.authState = state;
        return `Авторизация теперь ${state ? 'включена' : 'отключена'}`;
    })
    .build();
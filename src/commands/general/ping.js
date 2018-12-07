const Command = require('../../processing/commands/command');

// Short (using builder)
module.exports = new Command.Builder('ping').run(() => 'pong!');

// Long (using inheritance)
module.exports = class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            description: 'Отображает текущую задежку'
        });
    }

    async run(message) {
        const pingMsg = await message.channel.send('Вычисление . . . ');
        const ping = pingMsg.createdTimestamp - message.createdTimestamp;
        const api = this.client.ping;
        pingMsg.edit(`Понг! Задержка составила: *${ping}мс*\nЗадержка API: *${api}мс*`);
    }
};
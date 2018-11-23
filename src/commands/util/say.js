const Command = require('./../../command-processing/command');

module.exports = new Command.Builder('say', 'util')
    .format('[сообщение]')
    .description('Отправляет сообщение от имени бота')
    .parseArgs(rest => rest)
    .run((message, content) => content ? message.channel.send(content) : undefined)
    .build();
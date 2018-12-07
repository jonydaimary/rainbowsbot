module.exports = (client, message, { level }) => message.channel
    .send(`Поздравляю ${message.author}, ты получил **${level}** уровень!`);
const { oneLine } = require('common-tags');

const authors = [];
const messageLog = [];

const ANTI_SPAM_INTERVAL = 1000;

module.exports = (client, message) => {
    if (message.author.bot || !message.guild)
        return;

    if (message.author.id == message.guild.owner.id)
        return;

    const { author: { id: author }, content } = message;

    const now = Date.now();
    authors.push({ time: now, author });
    messageLog.push({ message: content, author });

    let duplicateCount = messageLog
        .filter(record => record.message == content && record.author == author)
        .length;

    if (duplicateCount == 3)
        message.reply(oneLine`
            Вы отправили несколько дублирующихся сообщений подряд.
            При следующей отправке вы будете замучены на 1 минуту.
        `);

    if (duplicateCount >= 4) {
        client.mute(message.member, 60000);
        message.reply(oneLine`
            Вы были замучены на 1 минуту за отправку дублирующихся сообщений
        `);
    }

    authors.forEach((record, index) => {
        if (record.time < now - ANTI_SPAM_INTERVAL)
            authors.splice(index);
        if (messageLog.length > 300)
            messageLog.shift();
    });
};
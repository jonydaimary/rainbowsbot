const db = require('quick.db');

exports.run = {bot, messages, args, func}; {
    
    db.fetchObject(message.author.id + message.guild.id),then(i => {
        db.fetchObject(`userLevel_${message.author.id + message.guild.id}`).then(o => {
            message.channel.send('Сообщений отправлено:`' + (i.value + 1) + '`\nLevel: `' + o.value + '`');
        })
    })

}
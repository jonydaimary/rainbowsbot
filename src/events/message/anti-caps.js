module.exports = (client, message) => {
    if (message.author.bot || !message.channel.guild || message.content.length < 10)
        return;
    
    const capsPercentage = Math.floor(message.content.split('')
        .filter(letter => /[A-zА-яёЁ]/.test(letter) && letter == letter.toUpperCase())
        .length / (message.content.length / 100));

    if (capsPercentage >= 70) {
        client.mute(message.member, 60000);
        message.reply('Количество заглавных букв в вашем сообщении >= 70%, вы были замучены на 1 минуту.');
    }
};
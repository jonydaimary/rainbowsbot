const { stripIndents } = require('common-tags');

const config = require('./../../../config');

module.exports = async (client, member) => {
    if (!client.authState) {
        client.emit('guildMemberAuthorized', member);
        return;
    }

    const generateMathProblem = require('./utils/generate-math-problem');

    member.addRole(config.roles.unauthorized);

    const dm = await member.createDM();

    let problem = generateMathProblem();
    dm.send(stripIndents`
        Для авторизации на сервере пожалуйста решите математическе выражениe:
        \`${problem.expression} = ?\`
        **Форма отправки ответа:** !ответ
        **Пример:**
        \`2 + 2 = ?\`
        !4
        Если вы хотите получить новое выражение просто отправьте неправильный ответ.
    `);

    const collector = dm.createMessageCollector(msg => msg.content.startsWith('!'));
    collector.on('collect', message => {
        const answer = message.content.substring(1);
        if (answer == problem.answer) {
            dm.send('Вы были успешно авторизованы!');
            member.removeRole(config.roles.unauthorized);
            member.addRole(config.roles.novice);
            collector.stop();
            client.emit('guildMemberAuthorized', member);
        } else {
            problem = generateMathProblem();
            dm.send(`Неверный ответ.\nНовое выражение: \`${problem.expression} = ?\``);
        }
    });
};
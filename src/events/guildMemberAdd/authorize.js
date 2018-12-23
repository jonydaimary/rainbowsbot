const { stripIndents } = require('common-tags');

const generateMathProblem = require('./../../utils/generate-math-problem');

const { roles: { unauthorized } } = require('./../../../json/config');

module.exports = async (client, member) => {
    if (!client.authState) {
        client.emit('guildMemberAuthorized', member);
        return;
    }

    member.addRole(unauthorized);

    const dm = await member.createDM();

    let problem = generateMathProblem();
    dm.send(stripIndents`
        Для авторизации на сервере пожалуйста решите математическое выражениe:
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
            member.removeRole(unauthorized);
            collector.stop();
            client.emit('guildMemberAuthorized', member);
        } else {
            problem = generateMathProblem();
            dm.send(`Неверный ответ.\nНовое выражение: \`${problem.expression} = ?\``);
        }
    });
};
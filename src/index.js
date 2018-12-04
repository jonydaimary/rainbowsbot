const { Client, RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const schedule = require('node-schedule');

const handleCommand = require('./command-processing/handle-command');
const loadCommands = require('./command-processing/load-commands');

const config = require('./../config');

const client = new Client();
client.authState = true;

client.commands = loadCommands(__dirname + '/commands');
client.on('message', handleCommand);

client.once('ready', async () => {
    client.sequelize = await require('./dbinit')();
});

client.on('message', async message => {
    if (message.author.bot
        || message.channel.type == 'dm'
        || !config.xpChannels.includes(message.channel.id))
        return;
    const random = require('./utils/random');
    const Users = client.sequelize.model('users');
    const data = await Users.xp(message.author.id, random(1, 5), true);
    if (data.levelUp)
        client.emit('memberLevelUp', message, data);
});

client.on('memberLevelUp', (message, { level }) => {
    message.channel.send(`Поздравляю ${message.author}, ты получил **${level}** уровень!`);
});

client.on('memberLevelUp', (message, { level }) => {
    const roles = config.levelRoles.filter(([l]) => l == level).map(([, role]) => role);
    roles.forEach(role => message.member.addRole(role));
});

client.on('ready', () => {
    console.log('Client ready.');
    const setActivity = status => client.user.setActivity(status, {
        type: 'STREAMING',
        url: 'https://twitch.tv/romanvoyoutube'
    }).catch(console.error);
    let index = 0;
    const setStatus = () => {
        const status = [
            `${config.prefix}help`,
            'Rainbow`s Server',
            `${client.users.array().length} users`
        ][index];
        index = index == 2 ? 0 : index + 1;
        setActivity(status);
    };
    setStatus();
    setInterval(() => setStatus(), 180000);
});

client.on('guildCreate', guild => console.log(`Guild joind: ${guild.name}(${guild.id})[${guild.memberCount}]`));

client.on('guildDelete', guild => console.log(`Guild left: ${guild.name}(${guild.id})`));

client.on('guildMemberAuthorized', async member => {
    const owner = await client.fetchUser(config.owner);
    const embed = new RichEmbed()
        .setAuthor(owner.tag, owner.avatarURL)
        .setTitle(`Добро пожаловать на ${member.guild.name}!`)
        .setDescription(`Привет! Это сообщение пишу вам я, собственный бот сервера. Для получения информации или основных команд введите \`${config.prefix}help\``)
        .addField('Информация о сервере', stripIndents`
            Rainbow's Server — это стремительно развивающийся сервер Discord. Основной тематикой сервера является программирование. Здесь всегда можно попросить помощи у опытных и начинающих программистов.
            Обязательно прочитай <#${config.channels.rules}>.
            **Мы рады, что ты зашел к нам**
            По вопросам обращайся к Главному администратору.
            
            Человек на сервере: **${member.guild.memberCount}**
        `)
        .setColor(config.embed.color.direct)
        .setFooter('Rainbow`s server 🌈 Welcome!');

    member.send(embed);
});

client.on('guildMemberAdd', member => {
    const embed = new RichEmbed()
        .setTitle('Новый участник сервера')
        .setDescription(`К серверу присоединился ${member.user.tag}`)
        .setColor(config.embed.color.guild)
        .setFooter('Rainbow\'s server 🌈 Welcome!');

    client.channels.get(config.channels.general).send(embed);
    client.channels.get(config.channels.staffchat).send({ embed });
});

client.on('guildMemberRemove', member => {
    const embed = new RichEmbed()
        .setTitle('Участник покинул сервер')
        .setDescription(`С сервера ушел ${member.user.tag}`)
        .setColor(config.embed.color.guild)
        .setFooter('Rainbow\'s server 🌈 Goodbye!');

    client.channels.get(config.channels.staffchat).send(embed);
});

client.on('guildMemberAdd', async member => {
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
});

client.on('guildMemberUpdate', async (before, after) => {
    const matchingRole = '469612245744091181';
    const achievment = '470625504035078154';

    if (!before.roles.has(matchingRole) && after.roles.has(matchingRole))
        await after.addRole(achievment);
});

client.on('guildMemberUpdate', async (before, after) => {
    const colorRoles = [
        '470625212111650817',
        '470625105521934357',
        '470625422141292554',
        '470625297885298709',
        '470625938485542933',
        '470626317747093524',
        '470626430687117322',
        '470626794521886721',
        '470626943168151553',
        '470627037384540183',
        '470627142464569355',
        '470627245464223745',
        '470627342323023894',
        '470627475416809472',
        '470627587622830092'
    ];
    const achievment = '510493493936914449';

    if (!colorRoles.every(id => before.roles.has(id)) && colorRoles.every(id => after.roles.has(id)))
        await after.addRole(achievment);
});

schedule.scheduleJob(config.authorization.from, () => {
    client.authState = true;
    client.channels.get(config.channels.staffchat)
        .send('Авторизация включена по расписанию.');
});

schedule.scheduleJob(config.authorization.to, () => {
    client.authState = false;
    client.channels.get(config.channels.staffchat)
        .send('Авторизация отключена по расписанию.');
});

schedule.scheduleJob(config.warnExpirationDate, () => {
    client.sequelize.model('warns').clear();
});

client.login(process.env.TOKEN);
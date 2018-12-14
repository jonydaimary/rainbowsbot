const { Client } = require('discord.js');
const schedule = require('node-schedule');

const handleCommand = require('./processing/commands/handle-command');
const loadCommands = require('./processing/commands/load-commands');

const loadEvents = require('./processing/events/load-events');

const loadFunction = require('./processing/functions/load-functions');

const config = require('./../json/config');

const client = new Client();
client.authState = true;

loadEvents(client, `${__dirname}/events`);
loadFunction(client, `${__dirname}/functions`);

client.commands = loadCommands(`${__dirname}/commands`);
client.on('message', handleCommand);

client.once('ready', async () => {
    client.sequelize = await require('./dbinit')();
    client.emit('sync');
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

schedule.scheduleJob(config.experienceResetDate, async () => {
    const Users = client.sequelize.model('users');
    const users = await Users.findAll({ order: [['level', 'desc'], ['xp', 'desc']] });
    users.forEach((user, index) => user.update({ activity: index + 1 }));
    Users.update({ xp: 0, level: 0 }, { where: {} });
});

client.login(process.env.TOKEN).catch(console.error);
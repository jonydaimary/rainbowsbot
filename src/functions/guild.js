const { guild } = require('../../json/config.json');

module.exports = client => client.guilds.get(guild);
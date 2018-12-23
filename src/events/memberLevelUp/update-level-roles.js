const config = require('./../../../json/config');

module.exports = (client, message, { level }) => {
    config.levelRoles
        .filter(([l]) => l == level)
        .map(([, role]) => role)
        .forEach(role => message.member.addRole(role));
};
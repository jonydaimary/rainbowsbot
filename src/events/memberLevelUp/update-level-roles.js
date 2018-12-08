const config = require('./../../../json/config');

module.exports = (client, message, { level }) => {
    const roles = config.levelRoles.filter(([l]) => l == level).map(([, role]) => role);
    roles.forEach(role => message.member.addRole(role));
};
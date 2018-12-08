const achievments = require('./../../../json/achievments');

module.exports = (client, before, after) => {
	after.roles
		.filter(role => !before.roles.has(role.id))
		.map(role => achievments[role.id])
		.filter(role => role)
		.forEach(role => {
			client.sequelize.model('users').rep(after.id, role, true);
		});
};
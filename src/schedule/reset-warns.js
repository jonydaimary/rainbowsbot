const {
    schedule: { warnExpiration: rule }
} = require('./../../json/config.json');

module.exports = {
    name: 'reset-warns', rule,
    callback: client => client.sequelize.model('warns').clear()
};